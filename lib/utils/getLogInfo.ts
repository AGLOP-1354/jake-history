import { cookies } from "next/headers";
import { headers } from "next/headers";

export const getGuestToken = (): string | null => {
  const cookieStore = cookies();
  return cookieStore.get("guest_token")?.value || null;
};

export const getIpAddress = (): string | null => {
  const headerList = headers();
  const ipAddress =
    headerList.get("x-forwarded-for") || // Common header for proxies
    headerList.get("x-real-ip") || // Fallback for real IP
    null;

  return ipAddress ? ipAddress.split(",")[0].trim() : null;
};

export const getUserAgent = (): string | null => {
  const headerList = headers();
  return headerList.get("user-agent") || null;
};

export const getLogInfo = (): Record<string, string | null> => {
  return {
    guestToken: getGuestToken(),
    ipAddress: getIpAddress(),
    userAgent: getUserAgent(),
  };
};
