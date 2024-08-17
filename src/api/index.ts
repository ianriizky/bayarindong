import routes from "@/api/routes";
import { cors } from "@elysiajs/cors";
import { edenFetch, treaty } from "@elysiajs/eden";
import { swagger } from "@elysiajs/swagger";
import { Elysia } from "elysia";

export const app = new Elysia({ prefix: "/api" })
  .use(cors())
  .use(
    swagger({
      path: "/doc",
      documentation: {
        info: {
          title: "Bayarindong Payment Gateway API",
          version: "1.0.0",
          license: {
            name: "MIT",
            url: "https://github.com/ianriizky/bayarindong-api/blob/main/LICENSE.md",
          },
        },
        tags: [
          {
            name: "Homepage",
            description: "Homepage API.",
          },
          {
            name: "Deposit",
            description: "Deposit API.",
          },
        ],
        components: {
          securitySchemes: {
            bearerAuth: {
              type: "http",
              scheme: "bearer",
              bearerFormat: "base64",
            },
          },
          responses: {
            UnauthorizedError: {
              description: "401 Unauthorized",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    example: {
                      message: "Unauthorized",
                    },
                  },
                },
              },
            },
          },
        },
      },
      exclude: ["/api/doc", "/api/doc/json"],
    })
  )
  .use(routes);

export type App = typeof app;
export const createClient = treaty<App>;
export const createFetch = edenFetch<App>;
