import { Elysia, t } from "elysia";

export default new Elysia().get(
  "/hello-world",
  () => ({ message: "Hello Elysia" }),
  {
    response: t.Object({
      message: t.String(),
    }),
    detail: {
      tags: ["Homepage"],
      summary: "Hello world",
      description: "A simple hello world response.",
      responses: {
        "200": {
          description: "OK",
          headers: {
            "Access-Control-Allow-Credentials": {
              schema: {
                type: "boolean",
                example: true,
              },
            },
            "Access-Control-Allow-Headers": {
              schema: {
                type: "string",
                example:
                  "accept, accept-encoding, accept-language, connection, cookie, dnt, host, referer, sec-ch-ua, sec-ch-ua-mobile, sec-ch-ua-platform, sec-fetch-dest, sec-fetch-mode, sec-fetch-site, user-agent, x-forwarded-for, x-forwarded-host, x-forwarded-port, x-forwarded-proto,",
              },
            },
            "Access-Control-Allow-Methods": {
              schema: {
                type: "string",
                example: "GET",
              },
            },
            "Access-Control-Allow-Origin": {
              schema: {
                type: "string",
                example: "*",
              },
            },
            "Access-Control-Expose-Headers": {
              schema: {
                type: "string",
                example:
                  "accept, accept-encoding, accept-language, connection, cookie, dnt, host, referer, sec-ch-ua, sec-ch-ua-mobile, sec-ch-ua-platform, sec-fetch-dest, sec-fetch-mode, sec-fetch-site, user-agent, x-forwarded-for, x-forwarded-host, x-forwarded-port, x-forwarded-proto,",
              },
            },
            Connection: {
              schema: {
                type: "string",
                example: "keep-alive",
              },
            },
            "Content-Type": {
              schema: {
                type: "string",
                example: "application/json",
              },
            },
            Date: {
              schema: {
                type: "string",
                example: "Sat, 17 Aug 2024 00:00:00 GMT",
              },
            },
            "Keep-Alive": {
              schema: {
                type: "string",
                example: "timeout=5",
              },
            },
            "Transfer-Encoding": {
              schema: {
                type: "string",
                example: "chunked",
              },
            },
            Vary: {
              schema: {
                type: "string",
                example: "RSC, Next-Router-State-Tree, Next-Router-Prefetch, *",
              },
            },
          },
          content: {
            "application/json": {
              schema: {
                type: "object",
                example: {
                  message: "Hello Elysia",
                },
              },
            },
          },
        },
      },
    },
  }
);
