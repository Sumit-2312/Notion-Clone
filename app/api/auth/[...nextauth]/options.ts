import { users } from "@/models/databaseSchema/db";
import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import type { NextAuthOptions } from "next-auth";
import type { User as NextAuthUser, Session } from "next-auth";
import type { JWT } from "next-auth/jwt";
import bcrypt from 'bcrypt';
import connect from "@/lib/dbConnect";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        password: { label: "Password", type: "password" },
        email: { label: "Email", type: "email" },
      },
      async authorize(credentials) {
        try{
            const email = credentials?.email;
            if (!email){
              throw new Error("Email is mandatory");
            };

            const connection = await connect();
            if(!connection) {
              throw new Error("Database connection error");
            }

            const user = await users.findOne({ email });
            if (!user){
              throw new Error("You are not signed up");
            };

            const isHashedPass = await bcrypt.compare(credentials.password,user.password);
            if(!isHashedPass){
              throw new Error("Incorrect password");
            };

            // Must include `id` because NextAuth expects it
            return {
              id: user.userId.toString(),
              username: user.username,
              email: user.email,
            } as NextAuthUser;
        }
        catch (error) {
          // if error is already an Error object, use its message
          if (error instanceof Error) {
            throw new Error(error.message);
          } else {
            // fallback: convert to string
            throw new Error(String(error));
          }
        }

      },
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }: { token: JWT; user?: NextAuthUser }) {
      if (user) {
        // Add custom user data to the token
        token.userId = user.id;
        token.username = user.username as string;
        token.email = user.email as string;
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      if (token) {
        // Add custom data from token to session
        session.userId = token.userId as string;
        session.username = token.username as string;
        session.email = token.email as string;
      }
      return session;
    },
  },
};


// session, user and jwt types are extended in next-auth.d.ts file
