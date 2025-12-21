import { NextRequest, NextResponse } from "next/server";
import { trackPageView, trackUserAction } from "@/lib/tracking";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { type, path, action, target, metadata } = body;

    if (type === "pageview" && path) {
      await trackPageView(path, request);
    } else if (type === "action" && action) {
      await trackUserAction(action, target, metadata, request);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Tracking error:", error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}

