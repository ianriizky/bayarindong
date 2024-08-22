import { modelX } from "@/api/model";
import {
  dummerOrderIndexResponse,
  dummerOrderShowResponse,
  dummerOrderStoreRequestBody,
  orderIndexResponse,
  orderStoreRequestBody,
} from "@/typebox/order";
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
      const data = await modelX.order.findMany({
        include: { user: { include: { role: true } } },
        where:
          userFromToken.role.name !== "admin"
            ? {
                user: { id: userFromToken.id },
              }
            : {},
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
    // @ts-ignore
    async ({ body, userFromToken }) => {
      await modelX.order.create({
        data: {
          id: body.order_id,
          type: "deposit",
          amount: body.amount,
          status: "success",
          timestamp: body.timestamp,
          user: { connect: { id: userFromToken.id } },
        },
      });

      return {
        message: "Deposit created successfully.",
      };
    },
    {
      body: orderStoreRequestBody,
      response: t.Object({
        message: t.String(),
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
                example: dummerOrderStoreRequestBody,
              },
            },
          },
        },
        responses: {
          "200": {
            description: "OK",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  example: {
                    data: dummerOrderShowResponse,
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
                    summary: "Property 'timestamp' should be date-time",
                    property: "/timestamp",
                    message: "Expected string to match 'date-time' format",
                    expected: {
                      type: "Could not create expected value",
                      message:
                        "String types with formats must specify a default value",
                      error: {
                        schema: {
                          format: "date-time",
                          type: "string",
                        },
                      },
                    },
                    found: {
                      amount: 1,
                      timestamp: "",
                    },
                    errors: [
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
      await modelX.order.create({
        data: {
          id: body.order_id,
          type: "withdraw",
          amount: body.amount,
          status: "success",
          timestamp: body.timestamp,
          user: { connect: { id: userFromToken.id } },
        },
      });

      return {
        message: "Withdraw created successfully.",
      };
    },
    {
      body: orderStoreRequestBody,
      response: t.Object({
        message: t.String(),
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
                example: dummerOrderStoreRequestBody,
              },
            },
          },
        },
        responses: {
          "200": {
            description: "OK",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  example: {
                    data: dummerOrderShowResponse,
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
                    summary: "Property 'timestamp' should be date-time",
                    property: "/timestamp",
                    message: "Expected string to match 'date-time' format",
                    expected: {
                      type: "Could not create expected value",
                      message:
                        "String types with formats must specify a default value",
                      error: {
                        schema: {
                          format: "date-time",
                          type: "string",
                        },
                      },
                    },
                    found: {
                      amount: 1,
                      timestamp: "",
                    },
                    errors: [
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
