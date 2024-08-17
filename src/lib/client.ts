import { createClient, createFetch } from "@/api";
import env from "@/utils/env";

export const client = createClient(env.API_URL);
export const fetch = createFetch(env.API_URL);
