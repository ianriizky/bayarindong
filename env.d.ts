import { z } from "zod";
import { envSchema } from "./next.config.mjs";

declare global {
  namespace NodeJS {
    interface ProcessEnv extends Readonly<z.infer<typeof envSchema>> {
      //
    }
  }
}
