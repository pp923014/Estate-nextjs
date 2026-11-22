import { NextResponse } from "next/server";
export function jsonError(error) {
  const status = error.status || 400;
  return NextResponse.json({ success: false, message: status === 401 ? "Please sign in as admin." : error.message || "Something went wrong." }, { status });
}
export function jsonOk(data, status = 200) {
  return NextResponse.json({ success: true, ...data }, { status });
}
