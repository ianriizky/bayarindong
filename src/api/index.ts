import * as ErrorClass from "@/api/error";
import routes from "@/api/routes";
import { cors } from "@elysiajs/cors";
import { swagger } from "@elysiajs/swagger";
import { Elysia } from "elysia";
import { ElysiaErrors } from "elysia/error";

export const app = new Elysia({ prefix: "/api" })
  .use(cors())
  .error(ErrorClass)
  .onError(({ code, error, set }) => {
    set.headers["content-type"] = "application/json";

    if (Object.keys(ErrorClass).includes(code)) {
      set.status = (error as ElysiaErrors)?.status;

      return { message: error.message };
    }

    /** @see https://www.prisma.io/docs/orm/reference/error-reference */
    const prismaErrors = new Map([
      ["PrismaClientKnownRequestError", 400],
      ["PrismaClientValidationError", 400],
      ["PrismaClientUnknownRequestError", 500],
      ["PrismaClientRustPanicError", 500],
      ["PrismaClientInitializationError", 500],
    ]);

    if (prismaErrors.has(error.name)) {
      set.status = prismaErrors.get(error.name);
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
          {
            name: "Transaction",
            description: "Transaction API",
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
