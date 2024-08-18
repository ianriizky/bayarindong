import { client } from "@/lib/client";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  pages: {
    signIn: "/login",
  },
  session: {
    maxAge: 5,
  },
  providers: [
    CredentialsProvider({
      name: "Email",
      credentials: {
        email: {
          label: "E-mail",
          type: "email",
          placeholder: "your@email.com",
        },
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
        };
      },
    }),
  ],
});

export const GET = handler;
export const POST = handler;
export const PUT = handler;
export const PATCH = handler;
export const DELETE = handler;
export const HEAD = handler;
export const OPTIONS = handler;
