import * as ErrorClass from "@/api/error";
import routes from "@/api/routes";
import { cors } from "@elysiajs/cors";
import { swagger } from "@elysiajs/swagger";
import { Elysia } from "elysia";

export const app = new Elysia({ prefix: "/api" })
  .use(cors())
  .error(ErrorClass)
  .onError(({ code, error, set }) => {
    set.headers["content-type"] = "application/json;charset=utf-8";

    if (Object.keys(ErrorClass).includes(code)) {
      // @ts-ignore
      set.status = error?.status;

      return { message: error.message };
    }

    if (
      ["PrismaClientKnownRequestError", "PrismaClientValidationError"].includes(
        error.name
      )
    ) {
      set.status = 400;
      console.error(error);

      return { message: error.message };
    }

    if (
      [
        "PrismaClientUnknownRequestError",
        "PrismaClientRustPanicError",
        "PrismaClientInitializationError",
      ].includes(error.name)
    ) {
      set.status = 500;
      console.error(error);

      return { message: error.message };
    }
  })
  .use(
    swagger({
      path: "/doc",
      documentation: {
        info: {
          title: `${process.env.NEXT_PUBLIC_APP_NAME} Payment Gateway API`,
          version: process.env.NEXT_PUBLIC_VERSION,
          description:
            "A simple payment gateway service using Next.js and ElysiaJS made for learning purpose.",
          license: {
            name: "MIT",
            url: "https://github.com/ianriizky/bayarindong-api/blob/main/LICENSE.md",
          },
        },
        tags: [
          {
            name: "Homepage",
            description: "Homepage API",
          },
          {
            name: "Authentication",
            description: "Authentication API",
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
