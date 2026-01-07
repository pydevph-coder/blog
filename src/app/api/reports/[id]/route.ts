import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Update report (mark as solved)
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await request.json();
    const { solved } = body;

    const report = await prisma.report.update({
      where: { id },
      data: {
        solved: solved ?? false,
        dateSolved: solved ? new Date() : null,
      },
    });

    return NextResponse.json({
      success: true,
      report,
    });
  } catch (error) {
    console.error("Update report error:", error);
    return NextResponse.json({ error: "Failed to update report" }, { status: 500 });
  }
}

// Get single report
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    const report = await prisma.report.findUnique({
      where: { id },
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
    });

    if (!report) {
      return NextResponse.json({ error: "Report not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      report,
    });
  } catch (error) {
    console.error("Get report error:", error);
    return NextResponse.json({ error: "Failed to get report" }, { status: 500 });
  }
}


