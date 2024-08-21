import { UnauthorizedError } from "@/api/error";
import { modelX } from "@/api/model";

export async function getUserFromToken({ bearer }: { bearer?: string }) {
  if (!bearer) {
    throw new UnauthorizedError("Bearer token is not provided.");
  }

  const userFromToken = await modelX.user.findFirstByAccessToken(bearer);

  if (!userFromToken) {
    throw new UnauthorizedError("Bearer token is invalid.");
  }

  return { userFromToken };
}
