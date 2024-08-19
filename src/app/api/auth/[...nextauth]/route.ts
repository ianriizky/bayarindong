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

      async authorize(credentials, req) {
        const response = await client.api.login.post({
          // @ts-ignore
          email: credentials?.email,
          // @ts-ignore
          password: credentials?.password,
        });

        if (response.status !== 200 || !response.data?.data.email) {
          return null;
        }

        return {
          id: response.data?.data.email,
          name: response.data?.data.name,
          email: response.data?.data.email,
          image: response.data?.data.gravatar_image,
          access_token: response.data?.data.token,
          role: response.data?.data.role,
        };
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      // @ts-ignore
      if (user && user?.role) {
        // @ts-ignore
        token.access_token = user.access_token;
        // @ts-ignore
        token.role = user.role;
      }

      return token;
    },

    async session({ session, token }) {
      if (session?.user && token?.role) {
        // @ts-ignore
        session.user.access_token = token?.access_token;
        // @ts-ignore
        session.user.role = token?.role;
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
