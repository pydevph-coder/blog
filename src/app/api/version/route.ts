import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";

// Get latest version for an app
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const app = searchParams.get("app");

    if (!app) {
      return NextResponse.json({ error: "app parameter is required" }, { status: 400 });
    }

    const version = await prisma.versionControl.findFirst({
      where: { app },
      orderBy: { buildDate: "desc" },
    });

    if (!version) {
      return NextResponse.json({ error: "No version found for this app" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      version: {
        id: version.id,
        app: version.app,
        version: version.version,
        buildDate: version.buildDate,
        updateMessage: version.updateMessage,
        notification: version.notification,
      },
    });
  } catch (error) {
    console.error("Get version error:", error);
    return NextResponse.json({ error: "Failed to get version" }, { status: 500 });
  }
}

// Create new version (admin only)
export async function POST(request: NextRequest) {
  try {
    // Check admin authentication
    const cookieStore = await cookies();
    const adminCookie = cookieStore.get("admin");
    const isAuthenticated = !!adminCookie && adminCookie.value === "1";

    if (!isAuthenticated) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { app, version, buildDate, updateMessage, notification } = body;

    if (!app || !version || !buildDate) {
      return NextResponse.json(
        { error: "app, version, and buildDate are required" },
        { status: 400 }
      );
    }

    const newVersion = await prisma.versionControl.create({
      data: {
        app,
        version,
        buildDate: new Date(buildDate),
        updateMessage,
        notification,
      },
    });

    return NextResponse.json({
      success: true,
      version: newVersion,
    });
  } catch (error: unknown) {
    console.error("Create version error:", error);
    
    // Type guard for Prisma errors
    if (error && typeof error === "object" && "code" in error && error.code === "P2002") {
      return NextResponse.json(
        { error: "Version already exists for this app" },
        { status: 409 }
      );
    }
    
    return NextResponse.json({ error: "Failed to create version" }, { status: 500 });
  }
}






