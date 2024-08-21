import { modelX } from "@/api/model";
import { dummyFcmStoreResponse, fcmStoreResponse } from "@/typebox/fcm";
import { getUserFromToken } from "@/utils/resolve";
import { bearer } from "@elysiajs/bearer";
import { Elysia, t } from "elysia";

export default new Elysia()
  .use(bearer())
  .resolve(getUserFromToken)
  .post(
    "/fcm",
    async ({ body, userFromToken, set }) => {
      const firebaseCloudMessaging = await modelX.firebaseCloudMessaging.create(
        {
          data: {
            token: body.token,
            user: { connect: { id: userFromToken.id } },
          },
        }
      );

      set.status = "Created";

      return {
        message: "Firebase cloud messaging token created successfully",
        data: firebaseCloudMessaging,
      };
    },
    {
      body: t.Object({
        token: t.String(),
      }),
      response: t.Object({
        message: t.String(),
        data: fcmStoreResponse,
      }),
      detail: {
        tags: ["Firebase Cloud Messaging"],
        summary: "store",
        description: "Create a new firebase cloud messaging data.",
        responses: {
          "200": {
            description: "OK",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  example: {
                    message:
                      "Firebase cloud messaging token created successfully",
                    data: dummyFcmStoreResponse,
                  },
                },
              },
            },
          },
        },
      },
    }
  );
