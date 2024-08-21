import { type Static, t } from "elysia";

export const roleNames = ["admin", "member"] as const;
export const roleName = t.Union(
  roleNames.map((roleName) => t.Literal(roleName))
);
export type RoleName = Static<typeof roleName>;
