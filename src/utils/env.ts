import { z } from "zod";

export default z
  .object({
    NODE_ENV: z.enum(["development", "production"]).default("development"),
    API_URL: z.string().default("https://localhost:3000/api"),
    DB_URL: z.string(),
    DB_URL_NON_POOLING: z.string(),
  })
  .parse(process.env);
