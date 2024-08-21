import { Value } from "@sinclair/typebox/value";
import { Static, t } from "elysia";

export const fcm = t.Object({
  token: t.String(),
});
export const dummyFcm = {
  token: "qwertyuiopasdfghjklzxcvbnm",
};

export type Fcm = Static<typeof fcm>;

export const fcmStoreResponse = fcm;
export const dummyFcmStoreResponse = Value.Default(fcmStoreResponse, dummyFcm);
