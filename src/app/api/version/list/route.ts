import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Get all versions for an app (or all apps)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const app = searchParams.get("app");
    const limit = parseInt(searchParams.get("limit") || "50");

    const where: any = {};
    if (app) {
      where.app = app;
    }

    const versions = await prisma.versionControl.findMany({
      where,
      orderBy: { buildDate: "desc" },
      take: limit,
    });

    return NextResponse.json({
      success: true,
      versions,
      count: versions.length,
    });
  } catch (error) {
    console.error("Get versions error:", error);
    return NextResponse.json({ error: "Failed to get versions" }, { status: 500 });
  }
}


