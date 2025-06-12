import { DefaultUser } from "next-auth";

declare module "next-auth" {
  interface User extends DefaultUser {
    userId: string;
    username: string;
  }

  interface Session {
    user: {
      userId: string;
      username: string;
      email: string;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    userId: string;
    username: string;
    email: string;
  }
}
