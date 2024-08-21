import { Value } from "@sinclair/typebox/value";
import { Static, t } from "elysia";

export const notification = t.Object({
  title: t.String({ minLength: 4, maxLength: 255 }),
  message: t.String({ minLength: 4, maxLength: 255 }),
  is_read: t.Boolean(),
});
export const dummyNotification = {
  title: "Create Deposit Success",
  message: "Your deposit has been added successfully.",
  is_read: false,
};

export type Notification = Static<typeof notification>;

export const notificationIndexResponse = t.Array(notification);
export const dummyNotificationIndexResponse = Value.Default(
  notificationIndexResponse,
  [dummyNotification]
);
