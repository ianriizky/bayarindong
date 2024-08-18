import fs from "fs";
import { z } from "zod";

export const envSchema = z.object({
  NODE_ENV: z
    .enum(["development", "production"])
    .transform((value) => value || "development"),
  NEXT_PUBLIC_APP_NAME: z.string().transform((value) => value || "Bayarindong"),
  NEXT_PUBLIC_VERSION: z
    .string()
    .transform(
      (value) =>
        value ||
        JSON.parse(fs.readFileSync("./package.json").toString()).version
    ),
  APP_URL: z.string().transform((value) => value || "https://localhost:3000"),
  API_URL: z.string().transform((value) => value || "https://localhost:3000"),
  NEXTAUTH_URL: z
    .string()
    .transform((value) => value || "https://localhost:3000"),
  NEXTAUTH_SECRET: z.string().length(32),
  BCRYPT_ROUNDS: z.string().transform((value) => value || "10"),
  ADMIN_NAME: z.string().min(4).max(255),
  ADMIN_EMAIL: z.string().email(),
  ADMIN_PASSWORD: z.string().min(6).max(25),
  DB_URL: z.string(),
  DB_URL_NON_POOLING: z.string(),
});

const { NODE_ENV, ...env } = envSchema.parse(process.env);

export default env;
