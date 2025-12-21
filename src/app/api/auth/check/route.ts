import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const cookieStore = await cookies();
  const adminCookie = cookieStore.get("admin");

  const isAuthenticated = !!adminCookie && adminCookie.value === "1";

  return NextResponse.json({ isAuthenticated });
}





