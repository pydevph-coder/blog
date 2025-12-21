import { NextResponse, NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const url = new URL("/category/vlogs", request.url);
  return NextResponse.redirect(url);
}


