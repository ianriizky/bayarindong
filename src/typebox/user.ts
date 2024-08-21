import { Static, t } from "elysia";
import { Role } from ".";

const user = t.Object({
  name: t.String({ minLength: 4, maxLength: 255 }),
  email: t.String({ format: "email" }),
  password: t.String({ minLength: 6, maxLength: 25 }),
  gravatar_image: t.String({ format: "uri" }),
  access_token: t.String(),
  role_name: Role.name,
});
export type User = Static<typeof user>;

export const dummy = {
  name: "Member",
  email: "member@mail.comsss",
  gravatar_image: "https://www.gravatar.com/avatars",
  access_token: "abcdef",
  role_name: "member",
};

export const loginRequest = t.Pick(user, ["email", "password"]);
export const registerRequest = t.Composite([
  t.Pick(user, ["name", "email", "password"]),
  t.Object({
    terms: t.Boolean(),
  }),
]);
export const response = t.Omit(user, ["password"]);
