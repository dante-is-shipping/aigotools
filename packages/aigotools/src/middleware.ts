import createMiddleware from "next-intl/middleware";
import { auth } from "@/auth";

import { localePrefix, locales } from "./navigation";
import { AvailableLocales } from "./lib/locales";
import { AppConfig } from "./lib/config";

const intlMiddleware = createMiddleware({
  locales: locales,
  defaultLocale: AvailableLocales[0],
  localePrefix: localePrefix,
});

export default auth((req) => {
  const nextPathname = req.nextUrl.pathname;
  // Skip auth for API routes
  if (/^\/(api|trpc|sitemap)/.test(nextPathname)) {
    return;
  }

  // Check if user route requires authentication
  if (nextPathname.includes('/submit')) {
    if (!req.auth) {
      const signInUrl = new URL('/signin', req.url);
      signInUrl.searchParams.set('callbackUrl', req.url);
      return Response.redirect(signInUrl);
    }
  }

  // Check if dashboard route requires admin access
  if (nextPathname.includes('/dashboard')) {
    if (!req.auth) {
      const signInUrl = new URL('/signin', req.url);
      return Response.redirect(signInUrl);
    }

    const userId = req.auth.user?.id;
    if (!userId || !AppConfig.manageUsers.includes(userId)) {
      return Response.redirect(new URL('/', req.url));
    }
  }
  return intlMiddleware(req);
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
