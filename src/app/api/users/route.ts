import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Register or update user (login)
export async function POST(request: NextRequest) {
  try {
    console.log("[API] POST /api/users - Starting request");
    const body = await request.json();
    console.log("[API] Request body:", body);
    const { deviceId, deviceModel, androidVersion } = body;

    if (!deviceId) {
      console.log("[API] Error: deviceId is missing");
      return NextResponse.json({ error: "deviceId is required" }, { status: 400 });
    }

    console.log("[API] Checking if user exists with deviceId:", deviceId);
    // Check if user exists
    let user = await prisma.user.findUnique({
      where: { deviceId },
    });
    console.log("[API] User lookup result:", user ? "Found" : "Not found");

    if (user) {
      console.log("[API] Updating existing user");
      // Update last login and device info
      user = await prisma.user.update({
        where: { deviceId },
        data: {
          lastLogin: new Date(),
          deviceModel: deviceModel || user.deviceModel,
          androidVersion: androidVersion || user.androidVersion,
        },
      });
      console.log("[API] User updated successfully");
    } else {
      console.log("[API] Creating new user");
      // Create new user
      user = await prisma.user.create({
        data: {
          deviceId,
          deviceModel,
          androidVersion,
          lastLogin: new Date(),
        },
      });
      console.log("[API] User created successfully:", user.id);
    }

    console.log("[API] Returning success response");
    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        deviceId: user.deviceId,
        installedDate: user.installedDate,
        lastLogin: user.lastLogin,
        deviceModel: user.deviceModel,
        androidVersion: user.androidVersion,
      },
    });
  } catch (error: any) {
    console.error("[API] User registration error - Full error:", error);
    console.error("[API] Error name:", error?.name);
    console.error("[API] Error message:", error?.message);
    console.error("[API] Error stack:", error?.stack);
    
    // Check for specific Prisma errors
    if (error?.code === "P2002") {
      console.error("[API] Prisma unique constraint violation");
      return NextResponse.json(
        { error: "Device ID already exists" },
        { status: 409 }
      );
    }
    
    if (error?.code === "P2025") {
      console.error("[API] Prisma record not found");
      return NextResponse.json(
        { error: "Record not found" },
        { status: 404 }
      );
    }
    
    // Check if it's a database connection error
    if (error?.message?.includes("Can't reach database") || error?.code === "P1001") {
      console.error("[API] Database connection error");
      return NextResponse.json(
        { 
          error: "Database connection failed",
          details: process.env.NODE_ENV === "development" ? error.message : undefined
        },
        { status: 503 }
      );
    }
    
    // Check if table doesn't exist
    if (error?.message?.includes("does not exist") || error?.message?.includes("Unknown table")) {
      console.error("[API] Table does not exist - migration needed");
      return NextResponse.json(
        { 
          error: "Database tables not found. Please run: npx prisma migrate dev",
          details: process.env.NODE_ENV === "development" ? error.message : undefined
        },
        { status: 500 }
      );
    }
    
    // Provide more detailed error information in development
    const errorMessage = process.env.NODE_ENV === "development" 
      ? error?.message || "Failed to register user"
      : "Failed to register user";
    return NextResponse.json(
      { 
        error: errorMessage,
        details: process.env.NODE_ENV === "development" ? String(error) : undefined,
        code: error?.code
      }, 
      { status: 500 }
    );
  }
}

// Get user by deviceId
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const deviceId = searchParams.get("deviceId");

    if (!deviceId) {
      return NextResponse.json({ error: "deviceId is required" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { deviceId },
      include: {
        reports: {
          orderBy: { date: "desc" },
          take: 10, // Get last 10 reports
        },
      },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        deviceId: user.deviceId,
        installedDate: user.installedDate,
        lastLogin: user.lastLogin,
        deviceModel: user.deviceModel,
        androidVersion: user.androidVersion,
        reports: user.reports,
      },
    });
  } catch (error: any) {
    console.error("Get user error:", error);
    const errorMessage = process.env.NODE_ENV === "development" 
      ? error?.message || "Failed to get user"
      : "Failed to get user";
    return NextResponse.json(
      { 
        error: errorMessage,
        details: process.env.NODE_ENV === "development" ? String(error) : undefined
      }, 
      { status: 500 }
    );
  }
}

