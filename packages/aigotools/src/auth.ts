import type { DefaultSession } from "next-auth"
import NextAuth from "next-auth"
import "next-auth/jwt"
import GoogleProvider from "next-auth/providers/google"

export const { handlers, auth, signIn, signOut } = NextAuth({
  debug: !!process.env.AUTH_DEBUG,
  pages: {
    signIn: "/signin"
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