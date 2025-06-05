import NextAuth, { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface Session {
    userId?: string;
    username?: string;
    email?: string;
  }

  interface User extends DefaultUser {
    userId?: string;
    username?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    userId?: string;
    username?: string;
    email?: string;
  }
}
