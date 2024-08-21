import { type Static, t } from "elysia";

export const names = ["admin", "member"] as const;
export const name = t.Union(names.map((name) => t.Literal(name)));
export type Name = Static<typeof name>;
