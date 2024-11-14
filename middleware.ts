import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // 미들웨어 로직
  return NextResponse.next();
}

// 미들웨어를 적용할 경로 설정 (선택사항)
export const config = {
  matcher: "/api/:path*",
};
