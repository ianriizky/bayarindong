import type { App } from "@/api";
import { edenFetch, treaty } from "@elysiajs/eden";

export const client = treaty<App>(process.env.APP_URL);
export const fetch = edenFetch<App>(process.env.API_URL);
