import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnLoginPage = nextUrl.pathname.startsWith("/login");
      const isOnSignupPage = nextUrl.pathname.startsWith("/signup");

      // Allow access to login and signup pages
      if (isOnLoginPage || isOnSignupPage) {
        if (isLoggedIn) {
          return Response.redirect(new URL("/", nextUrl));
        }
        return true;
      }

      // Protect all other routes
      if (isLoggedIn) return true;

      return false; // Redirect to login
    },
  },
  providers: [],
} satisfies NextAuthConfig;
