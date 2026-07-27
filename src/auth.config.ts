import type { NextAuthConfig } from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";

export default {
  providers: [Google, GitHub],
  pages: {
    signIn: "/sign-in",
  },
  callbacks: {
    async signIn() {
      return true; // hook for blocking sign-in later if needed
    },
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.id = user.id;
        token.isPro = user.isPro;
      }

      if (trigger === "update" && typeof session?.user?.isPro === "boolean") {
        token.isPro = session.user.isPro;
      }

      return token;
    },
    async session({ session, token }) {
      try {
        if (token?.id) {
          session.user.id = token.id as string;
          session.user.isPro = Boolean(token.isPro);
        }
        return session;
      } catch (error) {
        console.error("Session callback error:", error);
        return session;
      }
    },
  },
} satisfies NextAuthConfig;
