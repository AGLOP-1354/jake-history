import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { GUEST_TOKEN_KEY, createGuestToken, verifyGuestToken, getCookieOptions } from "./lib/utils/token";
import { getIpAddress } from "./lib/utils/getLogInfo";
import { CREATABLE_IP_ADDRESS } from "./lib/constants/creatableIpAdress";
const CHECK_IP_ADDRESS_PATHNAME = ["/history/create", "/history/edit"];

export async function middleware(request: NextRequest) {
  const guestToken = request.cookies.get(GUEST_TOKEN_KEY);

  if (CHECK_IP_ADDRESS_PATHNAME.includes(request.nextUrl.pathname)) {
    const ipAddress = getIpAddress();
    if (!CREATABLE_IP_ADDRESS.includes(ipAddress || "")) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  if (guestToken && (await verifyGuestToken(guestToken.value))) {
    const response = NextResponse.next();
    response.cookies.set(GUEST_TOKEN_KEY, guestToken.value, getCookieOptions());
    return response;
  }

  const newToken = await createGuestToken();
  const response = NextResponse.next();
  response.cookies.set(GUEST_TOKEN_KEY, newToken, getCookieOptions());
  return response;
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
