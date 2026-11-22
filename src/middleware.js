import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

const COOKIE_NAME = "estate_admin_session";

export async function middleware(request) {
  const { pathname } = request.nextUrl;
  if (pathname === "/admin/login" || pathname.startsWith("/api/admin/login")) {
    return NextResponse.next();
  }

  const token = request.cookies.get(COOKIE_NAME)?.value;
  if (!token) {
    const url = new URL("/admin/login", request.url);
    url.searchParams.set("next", pathname);
    return pathname.startsWith("/api/")
      ? NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 })
      : NextResponse.redirect(url);
  }

  try {
    const key = new TextEncoder().encode(process.env.SESSION_SECRET);
    if (!process.env.SESSION_SECRET || process.env.SESSION_SECRET.length < 32) {
      throw new Error("Invalid session configuration");
    }
    const { payload } = await jwtVerify(token, key);
    if (payload.role !== "admin") throw new Error("Invalid role");
    return NextResponse.next();
  } catch {
    const response = pathname.startsWith("/api/")
      ? NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 })
      : NextResponse.redirect(new URL("/admin/login", request.url));
    response.cookies.delete(COOKIE_NAME);
    return response;
  }
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"]
};
