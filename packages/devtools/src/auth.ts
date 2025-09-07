import type { DefaultSession } from "next-auth"
import NextAuth from "next-auth"
import "next-auth/jwt"
import GoogleProvider from "next-auth/providers/google"

export const { handlers, auth, signIn, signOut } = NextAuth({
  debug: !!process.env.AUTH_DEBUG,
  pages: {
    signIn: process.env.NEXTAUTH_URL + "/signin"
  },
  cookies: {
    sessionToken: {
      name: `next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: process.env.ENABLE_SSO === 'true' ? 'none' : 'lax',
        path: '/',
        domain: process.env.ENABLE_SSO === 'true' && process.env.AUTH_COOKIE_DOMAIN ? process.env.AUTH_COOKIE_DOMAIN : undefined,
        secure: process.env.ENABLE_SSO === 'true'
      }
    },
    callbackUrl: {
      name: `next-auth.callback-url`,
      options: {
        sameSite: process.env.ENABLE_SSO === 'true' ? 'none' : 'lax',
        path: '/',
        domain: process.env.ENABLE_SSO === 'true' && process.env.AUTH_COOKIE_DOMAIN ? process.env.AUTH_COOKIE_DOMAIN : undefined,
        secure: process.env.ENABLE_SSO === 'true' // SSO时必须为true
      }
    },
    csrfToken: {
      name: `next-auth.csrf-token`,
      options: {
        httpOnly: true,
        sameSite: process.env.ENABLE_SSO === 'true' ? 'none' : 'lax',
        path: '/',
        domain: process.env.ENABLE_SSO === 'true' && process.env.AUTH_COOKIE_DOMAIN ? process.env.AUTH_COOKIE_DOMAIN : undefined,
        secure: process.env.ENABLE_SSO === 'true' // SSO时必须为true
      }
    }
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    })
  ],
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, trigger, session, user }) {
      if (trigger === "update") {
        token.name = session.user.name
      } else if (trigger === "signIn") {
        // handle user sign in
      } else if (trigger === "signUp") {
        // handle new user sign up
      }

      if (user) {
        token.userId = user?.id
      }

      return token
    },

    async session({ session, user, token }) {
      let userId = user?.id
      if (token && token.userId) {
        userId = token.userId
      }
      return {
        ...session,
        user: {
          ...session.user,
          id: userId
        },
      }
    },
    async redirect({ url, baseUrl }) {
      if (url.startsWith("/")) {
        return `${baseUrl}${url}`;
      }
      else if (url.startsWith(baseUrl)) {
        return url;
      }
      return `${baseUrl}/`;
    }
  }
})

declare module "next-auth/jwt" {
  interface JWT {
    userId?: string
  }
}

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
    } & DefaultSession["user"]
  }
}