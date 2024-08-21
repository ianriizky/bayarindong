import { client } from "@/lib/client";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  pages: {
    signIn: "/login",
  },

  session: {
    maxAge: +process.env.NEXTAUTH_SESSION_MAXAGE,
  },

  providers: [
    CredentialsProvider({
      name: "Email",

      credentials: {
        email: { label: "E-mail", type: "email" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const response = await client.api.login.post({
          email: credentials?.email,
          password: credentials?.password,
        });

        if (response.status !== 200 || !response.data?.data.email) {
          return null;
        }

        return {
          id: response.data.data.email,
          name: response.data.data.name,
          email: response.data.data.email,
          image: response.data.data.gravatar_image,
          access_token: response.data.data.access_token,
          role_name: response.data.data.role_name,
        };
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user && user.role_name) {
        token.access_token = user.access_token;
        token.role_name = user.role_name;
      }

      return token;
    },

    async session({ session, token }) {
      if (session.user && token.access_token) {
        session.user.access_token = token.access_token;
      }

      if (session.user && token.role_name) {
        session.user.role_name = token.role_name;
      }

      return session;
    },
  },
});

export const GET = handler;
export const POST = handler;
export const PUT = handler;
export const PATCH = handler;
export const DELETE = handler;
export const HEAD = handler;
export const OPTIONS = handler;
