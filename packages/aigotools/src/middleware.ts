import createMiddleware from "next-intl/middleware";
import { auth } from "@/auth";
import { NextRequest, NextResponse } from "next/server";

import { localePrefix, locales } from "./navigation";
import { AvailableLocales } from "./lib/locales";
import { AppConfig } from "./lib/config";

const intlMiddleware = createMiddleware({
  locales: locales,
  defaultLocale: AvailableLocales[0],
  localePrefix: localePrefix,
});

export default async function middleware(req: NextRequest) {
  const nextPathname = req.nextUrl.pathname;
  console.log("nextPathname: ", nextPathname);
  
  // Skip auth for API routes
  if (/^\/(api|trpc|sitemap)/.test(nextPathname)) {
    return NextResponse.next();
  }

  // First, handle internationalization for all routes
  const intlResponse = intlMiddleware(req);
  
  // For routes that don't require authentication, return the intl response directly
  if (!nextPathname.includes('/submit') && !nextPathname.includes('/dashboard')) {
    return intlResponse;
  }

  // For protected routes, we need to check authentication
  const session = await auth();
  
  // Check if user route requires authentication
  if (nextPathname.includes('/submit')) {
    if (!session) {
      const signInUrl = new URL('/signin', req.url);
      signInUrl.searchParams.set('callbackUrl', req.url);
      return Response.redirect(signInUrl);
    }
  }
  
  console.log("userId: ", session?.user?.id);
  console.log("AppConfig.manageUsers: ", AppConfig.manageUsers);
  
  // Check if dashboard route requires admin access
  if (nextPathname.includes('/dashboard')) {
    if (!session) {
      const signInUrl = new URL('/signin', req.url);
      return Response.redirect(signInUrl);
    }

    const userId = session.user?.id;
    if (!userId || !AppConfig.manageUsers.includes(userId)) {
      return Response.redirect(new URL('/', req.url));
    }
  }
  
  return intlResponse;
}

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
