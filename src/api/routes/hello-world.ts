import { Elysia, t } from "elysia";

export default new Elysia().get(
  "/hello-world",
  () => ({ message: "Hello World" as const }),
  {
    response: t.Object({
      message: t.Literal("Hello World"),
    }),
    detail: {
      tags: ["Homepage"],
      summary: "Hello world",
      description: "A simple hello world response.",
      responses: {
        "200": {
          description: "OK",
          content: {
            "application/json": {
              schema: {
                type: "object",
                example: {
                  message: "Hello World",
                },
              },
            },
          },
        },
      },
    },
  }
);
