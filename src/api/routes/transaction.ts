import { UnauthorizedError } from "@/api/error";
import { modelX } from "@/api/model";
import { dummerOrderIndexResponse, orderIndexResponse } from "@/typebox/order";
import { getUserFromToken } from "@/utils/resolve";
import { bearer } from "@elysiajs/bearer";
import { Elysia, t } from "elysia";

export default new Elysia()
  .use(bearer())
  .resolve(getUserFromToken)
  .get(
    "/order",
    // @ts-ignore
    async ({ userFromToken }) => {
      if (userFromToken.role.name !== "admin") {
        throw new UnauthorizedError(
          "You are not permitted to access this route."
        );
      }

      const data = await modelX.order.findMany({
        include: { user: { include: { role: true } } },
      });

      return {
        data: data.map((order) => {
          // @ts-ignore
          order.user.role_name = order.user.role.name;

          return order;
        }),
      };
    },
    {
      response: t.Object({
        data: orderIndexResponse,
      }),
      detail: {
        tags: ["Transaction"],
        summary: "index",
        description: "Get list of all transaction.",
        security: [{ bearerAuth: [] }],
        responses: {
          "200": {
            description: "OK",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  example: {
                    data: dummerOrderIndexResponse,
                  },
                },
              },
            },
          },
        },
      },
    }
  )
  .post(
    "/deposit",
    async ({ body, userFromToken }) => {
      const order = await modelX.order.create({
        data: {
          id: body.order_id,
          user: { connect: { id: userFromToken.id } },
          amount: body.amount,
          timestamp: body.timestamp,
          type: "deposit",
          status: "success",
        },
      });

      return {
        order_id: order.id,
        amount: order.amount.toNumber(),
        status: order.status_code,
      };
    },
    {
      body: t.Object({
        order_id: t.String({ format: "uuid" }),
        amount: t.Number({ exclusiveMinimum: 0 }),
        timestamp: t.String({ format: "date-time" }),
      }),
      response: t.Object({
        order_id: t.String({ format: "uuid" }),
        amount: t.Number(),
        status: t.Number({ minimum: 0, maximum: 2 }),
      }),
      detail: {
        tags: ["Transaction"],
        summary: "deposit",
        description: "Create a new deposit data.",
        security: [{ bearerAuth: [] }],
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                example: {
                  order_id: "560a782c-2100-4801-82ff-6068797e9a0b",
                  amount: 100000,
                  timestamp: "2024-08-17T00:00:00Z",
                },
              },
            },
          },
        },
        responses: {
          "200": {
            description: "OK",
            headers: {
              "access-control-allow-credentials": {
                schema: {
                  type: "boolean",
                  example: true,
                },
              },
              "access-control-allow-headers": {
                schema: {
                  type: "string",
                  example:
                    "accept, accept-encoding, accept-language, connection, content-length, content-type, cookie, dnt, host, origin, referer, sec-ch-ua, sec-ch-ua-mobile, sec-ch-ua-platform, sec-fetch-dest, sec-fetch-mode, sec-fetch-site, user-agent, x-forwarded-for, x-forwarded-host, x-forwarded-port, x-forwarded-proto,",
                },
              },
              "access-control-allow-methods": {
                schema: {
                  type: "string",
                  example: "POST",
                },
              },
              "access-control-allow-origin": {
                schema: {
                  type: "string",
                  example: "https://localhost:3000",
                },
              },
              "access-control-expose-headers": {
                schema: {
                  type: "string",
                  example:
                    "accept, accept-encoding, accept-language, connection, content-length, content-type, cookie, dnt, host, origin, referer, sec-ch-ua, sec-ch-ua-mobile, sec-ch-ua-platform, sec-fetch-dest, sec-fetch-mode, sec-fetch-site, user-agent, x-forwarded-for, x-forwarded-host, x-forwarded-port, x-forwarded-proto,",
                },
              },
              connection: {
                schema: {
                  type: "string",
                  example: "keep-alive",
                },
              },
              "content-type": {
                schema: {
                  type: "string",
                  example: "application/json;charset=utf-8",
                },
              },
              date: {
                schema: {
                  type: "string",
                  example: "Sat, 17 Aug 2024 00:00:00 GMT",
                },
              },
              "keep-alive": {
                schema: {
                  type: "string",
                  example: "timeout=5",
                },
              },
              "transfer-encoding": {
                schema: {
                  type: "string",
                  example: "chunked",
                },
              },
              Vary: {
                schema: {
                  type: "string",
                  example:
                    "RSC, Next-Router-State-Tree, Next-Router-Prefetch, *",
                },
              },
            },
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  example: {
                    order_id: "560a782c-2100-4801-82ff-6068797e9a0b",
                    amount: 100000,
                    status: 1,
                  },
                },
              },
            },
          },
          "401": {
            $ref: "#/components/responses/UnauthorizedError",
          },
          "422": {
            description: "Unprocessable Content",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  example: {
                    type: "validation",
                    on: "body",
                    summary: "Property 'order_id' should be uuid",
                    property: "/order_id",
                    message: "Expected string to match 'uuid' format",
                    expected: {
                      type: "Could not create expected value",
                      message:
                        "String types with formats must specify a default value",
                      error: {
                        schema: {
                          format: "uuid",
                          type: "string",
                        },
                      },
                    },
                    found: {
                      order_id: "",
                      amount: 1,
                      timestamp: "",
                    },
                    errors: [
                      {
                        type: 50,
                        schema: {
                          format: "uuid",
                          type: "string",
                        },
                        path: "/order_id",
                        value: "",
                        message: "Expected string to match 'uuid' format",
                        summary: "Property 'order_id' should be uuid",
                      },
                      {
                        type: 50,
                        schema: {
                          format: "date-time",
                          type: "string",
                        },
                        path: "/timestamp",
                        value: "",
                        message: "Expected string to match 'date-time' format",
                        summary: "Property 'timestamp' should be date-time",
                      },
                    ],
                  },
                },
              },
            },
          },
        },
      },
    }
  )
  .post(
    "/withdraw",
    async ({ body, userFromToken }) => {
      const order = await modelX.order.create({
        data: {
          id: body.order_id,
          user: { connect: { id: userFromToken.id } },
          amount: body.amount,
          timestamp: body.timestamp,
          type: "withdraw",
          status: "success",
        },
      });

      return {
        order_id: order.id,
        amount: order.amount.toNumber(),
        status: order.status_code,
      };
    },
    {
      body: t.Object({
        order_id: t.String({ format: "uuid" }),
        amount: t.Number({ exclusiveMinimum: 0 }),
        timestamp: t.String({ format: "date-time" }),
      }),
      response: t.Object({
        order_id: t.String({ format: "uuid" }),
        amount: t.Number(),
        status: t.Number({ minimum: 0, maximum: 2 }),
      }),
      detail: {
        tags: ["Transaction"],
        summary: "withdraw",
        description: "Create a new withdraw data.",
        security: [{ bearerAuth: [] }],
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                example: {
                  order_id: "560a782c-2100-4801-82ff-6068797e9a0b",
                  amount: 100000,
                  timestamp: "2024-08-17T00:00:00Z",
                },
              },
            },
          },
        },
        responses: {
          "200": {
            description: "OK",
            headers: {
              "access-control-allow-credentials": {
                schema: {
                  type: "boolean",
                  example: true,
                },
              },
              "access-control-allow-headers": {
                schema: {
                  type: "string",
                  example:
                    "accept, accept-encoding, accept-language, connection, content-length, content-type, cookie, dnt, host, origin, referer, sec-ch-ua, sec-ch-ua-mobile, sec-ch-ua-platform, sec-fetch-dest, sec-fetch-mode, sec-fetch-site, user-agent, x-forwarded-for, x-forwarded-host, x-forwarded-port, x-forwarded-proto,",
                },
              },
              "access-control-allow-methods": {
                schema: {
                  type: "string",
                  example: "POST",
                },
              },
              "access-control-allow-origin": {
                schema: {
                  type: "string",
                  example: "https://localhost:3000",
                },
              },
              "access-control-expose-headers": {
                schema: {
                  type: "string",
                  example:
                    "accept, accept-encoding, accept-language, connection, content-length, content-type, cookie, dnt, host, origin, referer, sec-ch-ua, sec-ch-ua-mobile, sec-ch-ua-platform, sec-fetch-dest, sec-fetch-mode, sec-fetch-site, user-agent, x-forwarded-for, x-forwarded-host, x-forwarded-port, x-forwarded-proto,",
                },
              },
              connection: {
                schema: {
                  type: "string",
                  example: "keep-alive",
                },
              },
              "content-type": {
                schema: {
                  type: "string",
                  example: "application/json;charset=utf-8",
                },
              },
              date: {
                schema: {
                  type: "string",
                  example: "Sat, 17 Aug 2024 00:00:00 GMT",
                },
              },
              "keep-alive": {
                schema: {
                  type: "string",
                  example: "timeout=5",
                },
              },
              "transfer-encoding": {
                schema: {
                  type: "string",
                  example: "chunked",
                },
              },
              Vary: {
                schema: {
                  type: "string",
                  example:
                    "RSC, Next-Router-State-Tree, Next-Router-Prefetch, *",
                },
              },
            },
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  example: {
                    order_id: "560a782c-2100-4801-82ff-6068797e9a0b",
                    amount: 100000,
                    status: 1,
                  },
                },
              },
            },
          },
          "401": {
            $ref: "#/components/responses/UnauthorizedError",
          },
          "422": {
            description: "Unprocessable Content",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  example: {
                    type: "validation",
                    on: "body",
                    summary: "Property 'order_id' should be uuid",
                    property: "/order_id",
                    message: "Expected string to match 'uuid' format",
                    expected: {
                      type: "Could not create expected value",
                      message:
                        "String types with formats must specify a default value",
                      error: {
                        schema: {
                          format: "uuid",
                          type: "string",
                        },
                      },
                    },
                    found: {
                      order_id: "",
                      amount: 1,
                      timestamp: "",
                    },
                    errors: [
                      {
                        type: 50,
                        schema: {
                          format: "uuid",
                          type: "string",
                        },
                        path: "/order_id",
                        value: "",
                        message: "Expected string to match 'uuid' format",
                        summary: "Property 'order_id' should be uuid",
                      },
                      {
                        type: 50,
                        schema: {
                          format: "date-time",
                          type: "string",
                        },
                        path: "/timestamp",
                        value: "",
                        message: "Expected string to match 'date-time' format",
                        summary: "Property 'timestamp' should be date-time",
                      },
                    ],
                  },
                },
              },
            },
          },
        },
      },
    }
  );
