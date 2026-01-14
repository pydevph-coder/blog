import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";

// Public endpoint: list all ad servers that the client app can use
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get("limit") || "50", 10);

    const servers = await prisma.server.findMany({
      orderBy: { createdAt: "desc" },
      take: Number.isNaN(limit) ? 50 : limit,
    });

    return NextResponse.json({
      success: true,
      servers: servers.map((s) => ({
        id: s.id,
        url: s.url,
      })),
    });
  } catch (error: unknown) {
    console.error("Get servers error:", error);
    const message =
      process.env.NODE_ENV === "development" && error instanceof Error
        ? error.message
        : "Failed to get servers";

    return NextResponse.json(
      { success: false, error: message },
      { status: 500 },
    );
  }
}

// Admin-only: add a new ad server
export async function POST(request: NextRequest) {
  try {
    // Admin auth via cookie (same as other admin APIs)
    const cookieStore = await cookies();
    const adminCookie = cookieStore.get("admin");
    const isAuthenticated = !!adminCookie && adminCookie.value === "1";

    if (!isAuthenticated) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { url } = body as { url?: string };

    if (!url || typeof url !== "string") {
      return NextResponse.json(
        { error: "url is required" },
        { status: 400 },
      );
    }

    const server = await prisma.server.create({
      data: { url },
    });

    return NextResponse.json(
      {
        success: true,
        server: {
          id: server.id,
          url: server.url,
        },
      },
      { status: 201 },
    );
  } catch (error: unknown) {
    console.error("Create server error:", error);

    // Handle unique constraint violation on url
    if (
      error &&
      typeof error === "object" &&
      "code" in error &&
      (error as { code?: string }).code === "P2002"
    ) {
      return NextResponse.json(
        { error: "Server URL already exists" },
        { status: 409 },
      );
    }

    const message =
      process.env.NODE_ENV === "development" && error instanceof Error
        ? error.message
        : "Failed to create server";

    return NextResponse.json(
      { success: false, error: message },
      { status: 500 },
    );
  }
}


