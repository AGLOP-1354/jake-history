import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || "your-secret-key");
export const GUEST_TOKEN_KEY = "guest_token";

export interface TokenPayload {
  id: string;
  type: "guest";
  iat?: number;
  exp?: number;
}

export async function createGuestToken(): Promise<string> {
  const id = crypto.randomUUID();

  return new SignJWT({ id, type: "guest" })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("30d")
    .sign(JWT_SECRET);
}

export const verifyGuestToken = async (token: string): Promise<TokenPayload | null> => {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload as unknown as TokenPayload;
  } catch (error) {
    console.error("verifyGuestToken error", error);
    return null;
  }
};

export const getGuestToken = () => {
  const cookieStore = cookies();
  return cookieStore.get(GUEST_TOKEN_KEY)?.value;
};

export const getCookieOptions = () => ({
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  maxAge: 30 * 24 * 60 * 60,
  path: "/",
});
