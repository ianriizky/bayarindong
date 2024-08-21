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
  NEXTAUTH_SESSION_MAXAGE: z.string().transform((value) => value || "1800"),
  BCRYPT_ROUNDS: z.string().transform((value) => value || "10"),
  ADMIN_NAME: z.string().min(4).max(255),
  ADMIN_EMAIL: z.string().email(),
  ADMIN_PASSWORD: z.string().min(6).max(25),
  DB_URL: z.string(),
  DB_URL_NON_POOLING: z.string(),
  FIREBASE_ADMIN_TYPE: z
    .string()
    .transform((value) => value || "service_account"),
  FIREBASE_ADMIN_PROJECT_ID: z.string(),
  FIREBASE_ADMIN_PRIVATE_KEY_ID: z.string(),
  FIREBASE_ADMIN_PRIVATE_KEY: z.string(),
  FIREBASE_ADMIN_CLIENT_EMAIL: z.string(),
  FIREBASE_ADMIN_CLIENT_ID: z.string(),
  FIREBASE_ADMIN_AUTH_URI: z
    .string()
    .transform((value) => value || "https://accounts.google.com/o/oauth2/auth"),
  FIREBASE_ADMIN_TOKEN_URI: z
    .string()
    .transform((value) => value || "https://oauth2.googleapis.com/token"),
  FIREBASE_ADMIN_AUTH_PROVIDER_X509_CERT_URL: z
    .string()
    .transform(
      (value) => value || "https://www.googleapis.com/oauth2/v1/certs"
    ),
  FIREBASE_ADMIN_CLIENT_X509_CERT_URL: z.string(),
  FIREBASE_ADMIN_UNIVERSE_DOMAIN: z
    .string()
    .transform((value) => value || "googleapis.com"),
  NEXT_PUBLIC_FIREBASE_API_KEY: z.string(),
  NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: z.string(),
  NEXT_PUBLIC_FIREBASE_PROJECT_ID: z.string(),
  NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET: z.string(),
  NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID: z.string(),
  NEXT_PUBLIC_FIREBASE_APP_ID: z.string(),
  NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID: z.string(),
  NEXT_PUBLIC_FIREBASE_FCM_VAPID_KEY: z.string(),
  NEXT_PUBLIC_GOOGLE_ANALYTICS_ID: z.string(),
  DISABLE_TELEMETRY: z
    .enum(["true", "false"])
    .transform((value) => value || "true"),
});

const { NODE_ENV, ...env } = envSchema.parse(process.env);

export default env;
