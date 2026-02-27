import { NextResponse, NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  // Keep this route for API-style redirects if needed,
  // but the main /vlogs UI is handled by page.tsx.
  const url = new URL("/vlogs", request.url);
  return NextResponse.redirect(url);
}


