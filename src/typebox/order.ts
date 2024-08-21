import { prisma } from "@/api/model";
import { type Static, t } from "elysia";

export const types = [...Object.values(prisma.OrderType)] as const;
export const type = t.Union(types.map((type) => t.Literal(type)));
export type Type = Static<typeof type>;

export const statuses = [...Object.values(prisma.OrderStatus)] as const;
export const status = t.Union(statuses.map((status) => t.Literal(status)));
export type Status = Static<typeof status>;
