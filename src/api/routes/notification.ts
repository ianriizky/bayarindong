import { modelX } from "@/api/model";
import {
  dummyNotificationIndexResponse,
  notificationIndexResponse,
} from "@/typebox/notification";
import { getUserFromToken } from "@/utils/resolve";
import { bearer } from "@elysiajs/bearer";
import { Elysia, t } from "elysia";

export default new Elysia()
  .use(bearer())
  .resolve(getUserFromToken)
  .get(
    "/notification",
    async ({ userFromToken }) => ({
      data: await modelX.notification.findMany({
        where: { user: { id: userFromToken.id } },
      }),
    }),
    {
      response: t.Object({
        data: notificationIndexResponse,
      }),
      detail: {
        tags: ["Notification"],
        summary: "index",
        description: "Get list of all notification.",
        responses: {
          "200": {
            description: "OK",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  example: {
                    data: dummyNotificationIndexResponse,
                  },
                },
              },
            },
          },
        },
      },
    }
  );
