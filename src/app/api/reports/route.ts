import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

// Create a new report
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, message } = body;

    if (!userId || !message) {
      return NextResponse.json(
        { error: "userId and message are required" },
        { status: 400 }
      );
    }

    // Verify user exists
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const report = await prisma.report.create({
      data: {
        userId,
        message,
        date: new Date(),
        solved: false,
      },
    });

    return NextResponse.json({
      success: true,
      report: {
        id: report.id,
        userId: report.userId,
        message: report.message,
        date: report.date,
        solved: report.solved,
      },
    });
  } catch (error: unknown) {
    console.error("Create report error:", error);
    const errorMessage = process.env.NODE_ENV === "development" 
      ? (error instanceof Error ? error.message : "Failed to create report")
      : "Failed to create report";
    return NextResponse.json(
      { 
        error: errorMessage,
        details: process.env.NODE_ENV === "development" ? String(error) : undefined
      }, 
      { status: 500 }
    );
  }
}

// Get reports (with optional filters)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");
    const solved = searchParams.get("solved");
    const limit = parseInt(searchParams.get("limit") || "50");
    const offset = parseInt(searchParams.get("offset") || "0");

    const where: Prisma.ReportWhereInput = {};
    if (userId) {
      where.userId = userId;
    }
    if (solved !== null) {
      where.solved = solved === "true";
    }

    const [reports, total] = await Promise.all([
      prisma.report.findMany({
        where,
        include: {
          user: {
            select: {
              id: true,
              deviceId: true,
              deviceModel: true,
              androidVersion: true,
            },
          },
        },
        orderBy: { date: "desc" },
        take: limit,
        skip: offset,
      }),
      prisma.report.count({ where }),
    ]);

    return NextResponse.json({
      success: true,
      reports,
      total,
      limit,
      offset,
    });
  } catch (error: unknown) {
    console.error("Get reports error:", error);
    const errorMessage = process.env.NODE_ENV === "development" 
      ? (error instanceof Error ? error.message : "Failed to get reports")
      : "Failed to get reports";
    return NextResponse.json(
      { 
        error: errorMessage,
        details: process.env.NODE_ENV === "development" ? String(error) : undefined
      }, 
      { status: 500 }
    );
  }
}

