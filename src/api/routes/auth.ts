import { BadRequestError, NotFoundError, UnauthorizedError } from "@/api/error";
import { modelX } from "@/api/model";
import * as hash from "@/lib/hash";
import { Elysia, t } from "elysia";

export default new Elysia()
  .post(
    "/login",
    async ({ body }) => {
      const user = await modelX.user.findUnique({
        where: { email: body.email },
        include: { role: true },
      });

      if (!user) {
        throw new NotFoundError("User not found.");
      }

      if (!(await hash.check(body.password, user.password))) {
        throw new UnauthorizedError("Invalid credentials.");
      }

      return {
        message: "Login successfully.",
        data: {
          name: user.name,
          email: user.email,
          token: user.token,
          role: user.role.name,
        },
      };
    },
    {
      body: t.Object({
        email: t.String({ format: "email" }),
        password: t.String({ minLength: 6 }),
      }),
      response: t.Object({
        message: t.String(),
        data: t.Object({
          name: t.String(),
          email: t.String(),
          token: t.String(),
          role: t.String(),
        }),
      }),
      detail: {
        tags: ["Authentication"],
        summary: "login",
        description: "Login using credentials.",
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                example: {
                  email: "member@mail.com",
                  password: "member12345",
                },
              },
            },
          },
        },
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
                    "accept, accept-encoding, accept-language, connection, content-length, content-type, cookie, dnt, host, origin, referer, sec-ch-ua, sec-ch-ua-mobile, sec-ch-ua-platform, sec-fetch-dest, sec-fetch-mode, sec-fetch-site, user-agent, x-forwarded-for, x-forwarded-host, x-forwarded-port, x-forwarded-proto,",
                },
              },
              "Access-Control-Allow-Methods": {
                schema: {
                  type: "string",
                  example: "POST",
                },
              },
              "Access-Control-Allow-Origin": {
                schema: {
                  type: "string",
                  example: "https://localhost:3000",
                },
              },
              "Access-Control-Expose-Headers": {
                schema: {
                  type: "string",
                  example:
                    "accept, accept-encoding, accept-language, connection, content-length, content-type, cookie, dnt, host, origin, referer, sec-ch-ua, sec-ch-ua-mobile, sec-ch-ua-platform, sec-fetch-dest, sec-fetch-mode, sec-fetch-site, user-agent, x-forwarded-for, x-forwarded-host, x-forwarded-port, x-forwarded-proto,",
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
                    message: "Login successfully.",
                    data: {
                      name: "Member",
                      email: "member@mail.com",
                      token: "abcdef",
                      role: "member",
                    },
                  },
                },
              },
            },
          },
          "404": {
            description: "Not Found",
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
                  example: "application/json",
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
              vary: {
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
                    message: "User not found.",
                  },
                },
              },
            },
          },
          "401": {
            description: "Unauthorized",
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
                  example: "application/json",
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
              vary: {
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
                    message: "Invalid credentials.",
                  },
                },
              },
            },
          },
          "422": {
            description: "Unprocessable Content",
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
              vary: {
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
                    type: "validation",
                    on: "body",
                    summary: "Property 'email' should be email",
                    property: "/email",
                    message: "Expected string to match 'email' format",
                    expected: {
                      type: "Could not create expected value",
                      message:
                        "String types with formats must specify a default value",
                      error: {
                        schema: {
                          format: "email",
                          type: "string",
                        },
                      },
                    },
                    found: {
                      email: "",
                      password: "",
                    },
                    errors: [
                      {
                        type: 50,
                        schema: {
                          format: "email",
                          type: "string",
                        },
                        path: "/email",
                        value: "",
                        message: "Expected string to match 'email' format",
                        summary: "Property 'email' should be email",
                      },
                      {
                        summary: "Expected string length greater or equal to 6",
                        type: 52,
                        schema: {
                          minLength: 6,
                          type: "string",
                        },
                        path: "/password",
                        value: "",
                        message: "Expected string length greater or equal to 6",
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
    "/register",
    async ({ body, set }) => {
      if (!body.terms) {
        throw new BadRequestError(
          "Please accept terms and conditions before continue."
        );
      }

      const user = await modelX.user.create({
        data: {
          name: body.name,
          email: body.email,
          password: body.password,
          role: { connect: { name: "member" } },
        },
        include: { role: true },
      });

      set.status = 201;

      return {
        message: "User registered successfully.",
        data: {
          name: user.name,
          email: user.email,
          token: user.token,
          role: user.role.name,
        },
      };
    },
    {
      body: t.Object({
        name: t.String({ minLength: 4, maxLength: 255 }),
        email: t.String({ format: "email" }),
        password: t.String({ minLength: 6, maxLength: 25 }),
        terms: t.Boolean(),
      }),
      response: t.Object({
        message: t.String(),
        data: t.Object({
          name: t.String(),
          email: t.String(),
          token: t.String(),
          role: t.String(),
        }),
      }),
      detail: {
        tags: ["Authentication"],
        summary: "register",
        description: "Create a new user data.",
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                example: {
                  name: "Member",
                  email: "member@mail.com",
                  password: "member12345",
                  terms: true,
                },
              },
            },
          },
        },
        responses: {
          "201": {
            description: "Created",
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
                    "accept, accept-encoding, accept-language, connection, content-length, content-type, cookie, dnt, host, origin, referer, sec-ch-ua, sec-ch-ua-mobile, sec-ch-ua-platform, sec-fetch-dest, sec-fetch-mode, sec-fetch-site, user-agent, x-forwarded-for, x-forwarded-host, x-forwarded-port, x-forwarded-proto,",
                },
              },
              "Access-Control-Allow-Methods": {
                schema: {
                  type: "string",
                  example: "POST",
                },
              },
              "Access-Control-Allow-Origin": {
                schema: {
                  type: "string",
                  example: "https://localhost:3000",
                },
              },
              "Access-Control-Expose-Headers": {
                schema: {
                  type: "string",
                  example:
                    "accept, accept-encoding, accept-language, connection, content-length, content-type, cookie, dnt, host, origin, referer, sec-ch-ua, sec-ch-ua-mobile, sec-ch-ua-platform, sec-fetch-dest, sec-fetch-mode, sec-fetch-site, user-agent, x-forwarded-for, x-forwarded-host, x-forwarded-port, x-forwarded-proto,",
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
                    message: "User registered successfully.",
                    data: {
                      name: "Member",
                      email: "member@mail.com",
                      token: "abcdef",
                      role: "member",
                    },
                  },
                },
              },
            },
          },
          "400": {
            description: "Bad Request",
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
                  example: "application/json",
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
                    message:
                      "\nInvalid `prisma.user.create()` invocation:\n\n\nUnique constraint failed on the fields: (`name`)",
                  },
                },
              },
            },
          },
          "422": {
            description: "Unprocessable Content",
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
                    type: "validation",
                    on: "body",
                    summary: "Expected string length greater or equal to 4",
                    property: "/name",
                    message: "Expected string length greater or equal to 4",
                    expected: {
                      type: "Could not create expected value",
                      message:
                        "String types with formats must specify a default value",
                      error: {
                        schema: {
                          format: "email",
                          type: "string",
                        },
                      },
                    },
                    found: {
                      name: "",
                      email: "",
                      password: "",
                      terms: true,
                    },
                    errors: [
                      {
                        summary: "Expected string length greater or equal to 4",
                        type: 52,
                        schema: {
                          minLength: 4,
                          maxLength: 255,
                          type: "string",
                        },
                        path: "/name",
                        value: "",
                        message: "Expected string length greater or equal to 4",
                      },
                      {
                        type: 50,
                        schema: {
                          format: "email",
                          type: "string",
                        },
                        path: "/email",
                        value: "",
                        message: "Expected string to match 'email' format",
                        summary: "Property 'email' should be email",
                      },
                      {
                        summary: "Expected string length greater or equal to 6",
                        type: 52,
                        schema: {
                          minLength: 6,
                          maxLength: 25,
                          type: "string",
                        },
                        path: "/password",
                        value: "",
                        message: "Expected string length greater or equal to 6",
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
