import { prisma } from "@/api/model";
import type { User as UserTypebox } from "@/typebox/user";
import { DefaultSession, DefaultUser } from "next-auth";
import { DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: DefaultSession["user"] &
      Partial<{
        name: UserTypebox["name"];
        email: UserTypebox["email"];
        image: UserTypebox["gravatar_image"];
        access_token: UserTypebox["access_token"];
        role_name: UserTypebox["role_name"];
      }>;
  }

  interface User extends DefaultUser {
    id: prisma.User["id"];
    name?: UserTypebox["name"] | null;
    email?: UserTypebox["email"] | null;
    image?: UserTypebox["gravatar_image"] | null;
    access_token?: UserTypebox["access_token"] | null;
    role_name?: UserTypebox["role_name"] | null;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends Record<string, unknown>, DefaultJWT {
    access_token?: UserTypebox["access_token"] | null;
    role_name?: UserTypebox["role_name"] | null;
  }
}
