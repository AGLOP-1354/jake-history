import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { GUEST_TOKEN_KEY, createGuestToken, verifyGuestToken, getCookieOptions } from "./lib/utils/token";

export async function middleware(request: NextRequest) {
  const guestToken = request.cookies.get(GUEST_TOKEN_KEY);

  if (guestToken && (await verifyGuestToken(guestToken.value))) {
    return NextResponse.next();
  }

  const newToken = await createGuestToken();
  const response = NextResponse.next();
  response.cookies.set(GUEST_TOKEN_KEY, newToken, getCookieOptions());
  return response;
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
