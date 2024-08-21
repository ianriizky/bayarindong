import { getToken } from "next-auth/jwt";
import { NextResponse, type NextRequest } from "next/server";

export { default } from "next-auth/middleware";

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });

  const { pathname } = request.nextUrl;

  if (
    (token && ["/login", "/register"].includes(pathname)) ||
    (token &&
      token?.role_name !== "admin" &&
      ["/dashboard/order"].includes(pathname))
  ) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (!token && pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

/**
 * @see https://nextjs.org/docs/app/building-your-application/routing/middleware#matching-paths
 */
export const config = {
  matcher: ["/login", "/register", "/dashboard/:path*"],
};
