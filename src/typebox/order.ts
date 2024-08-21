import { prisma } from "@/api/model";
import { Value } from "@sinclair/typebox/value";
import { type Static, t } from "elysia";
import { dummyUser, user } from "./user";

export const orderTypes = [...Object.values(prisma.OrderType)] as const;
export const orderType = t.Union(
  orderTypes.map((orderType) => t.Literal(orderType))
);
export type OrderType = Static<typeof orderType>;

export const orderStatuses = [...Object.values(prisma.OrderStatus)] as const;
export const orderStatus = t.Union(
  orderStatuses.map((orderStatus) => t.Literal(orderStatus))
);
export type OrderStatus = Static<typeof orderStatus>;

export const userOrder = t.Omit(user, ["password", "access_token"]);
export const order = t.Object({
  type: orderType,
  status: orderStatus,
  status_code: t.Union([t.Literal(0), t.Literal(1), t.Literal(2)]),
  parsed_amount: t.Number(),
  deposit_parsed_amount: t.Number(),
  withdraw_parsed_amount: t.Number(),
  timestamp: t.Date(),
  created_at: t.Date(),
  updated_at: t.Date(),
  user: userOrder,
});
export const dummyOrder = {
  type: "deposit",
  status: "success",
  status_code: 2,
  parsed_amount: 100000,
  timestamp: "2024-08-17T00:00:00.000Z",
  created_at: "2024-08-17T00:00:00.000Z",
  updated_at: "2024-08-17T00:00:00.000Z",
  user: Value.Default(userOrder, dummyUser),
};

export const orderIndexResponse = t.Array(order);
export const dummerOrderIndexResponse = Value.Default(orderIndexResponse, [
  dummyOrder,
]);
