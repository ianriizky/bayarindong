import { Value } from "@sinclair/typebox/value";
import { Static, t } from "elysia";
import { roleName } from "./role";

export const user = t.Object({
  name: t.String({ minLength: 4, maxLength: 255 }),
  email: t.String({ format: "email" }),
  password: t.String({ minLength: 6, maxLength: 25 }),
  gravatar_image: t.String({ format: "uri" }),
  access_token: t.String(),
  role_name: roleName,
});
export const dummyUser = {
  name: "Member",
  email: "member@mail.comsss",
  gravatar_image: "https://www.gravatar.com/avatars",
  access_token: "abcdef",
  role_name: "member",
};

export type User = Static<typeof user>;

export const userLoginRequest = t.Pick(user, ["email", "password"]);
export const dummyUserLoginRequest = Value.Default(userLoginRequest, dummyUser);

export const userRegisterRequest = t.Composite([
  t.Pick(user, ["name", "email", "password"]),
  t.Object({
    terms: t.Boolean(),
  }),
]);
export const dummyUserRegisterRequest = Value.Default(
  userRegisterRequest,
  dummyUser
);

export const userResponse = t.Omit(user, ["password"]);
export const dummyUserResponse = Value.Default(userResponse, dummyUser);
