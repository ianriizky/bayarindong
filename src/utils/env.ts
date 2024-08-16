import { z } from "zod";

export default z
  .object({
    NODE_ENV: z.enum(["development", "production"]).default("development"),
    API_URL: z.string().default("https://localhost:3001"),
  })
  .parse(process.env);
