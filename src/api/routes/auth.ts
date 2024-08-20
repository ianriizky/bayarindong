import { BadRequestError, NotFoundError, UnauthorizedError } from "@/api/error";
import { modelX } from "@/api/model";
import * as hash from "@/lib/hash";
import { Elysia, t } from "elysia";

export default new Elysia()
  .model({
    "auth.response.body": t.Object({
      message: t.String(),
      data: t.Object({
        name: t.String(),
        email: t.String(),
        gravatar_image: t.String(),
        access_token: t.String(),
        role: t.String(),
      }),
    }),
  })
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
          gravatar_image: user.gravatar_image,
          access_token: user.access_token,
          role: user.role.name,
        },
      };
    },
    {
      body: t.Object({
        email: t.String({ format: "email" }),
        password: t.String({ minLength: 6 }),
      }),
      response: "auth.response.body",
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
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  example: {
                    message: "Login successfully.",
                    data: {
                      name: "Member",
                      email: "member@mail.com",
                      gravatar_image: "https://www.gravatar.com/avatar",
                      access_token: "abcdef",
                      role: "member",
                    },
                  },
                },
              },
            },
          },
          "404": {
            description: "Not Found",
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
          gravatar_image: user.gravatar_image,
          access_token: user.access_token,
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
      response: "auth.response.body",
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
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  example: {
                    message: "User registered successfully.",
                    data: {
                      name: "Member",
                      email: "member@mail.com",
                      gravatar_image: "https://www.gravatar.com/avatar",
                      access_token: "abcdef",
                      role: "member",
                    },
                  },
                },
              },
            },
          },
          "400": {
            description: "Bad Request",
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
