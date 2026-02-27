import { prisma } from "./prisma";

export async function trackPageView(
  path: string,
  request: Request
) {
  try {
    const userAgent = request.headers.get("user-agent") || undefined;
    const referrer = request.headers.get("referer") || undefined;
    const ipAddress = request.headers.get("x-forwarded-for")?.split(",")[0] || 
                      request.headers.get("x-real-ip") || undefined;

    await prisma.pageView.create({
      data: {
        path,
        referrer,
        userAgent,
        ipAddress,
        // Basic parsing - you can enhance this with a library like ua-parser-js
        device: userAgent?.includes("Mobile") ? "mobile" : "desktop",
        browser: extractBrowser(userAgent),
        os: extractOS(userAgent),
      },
    });
  } catch (error) {
    console.error("Error tracking page view:", error);
  }
}

export async function trackUserAction(
  action: string,
  target?: string,
  metadata?: Record<string, unknown>,
  request?: Request
) {
  try {
    const userAgent = request?.headers.get("user-agent") || undefined;
    const ipAddress = request?.headers.get("x-forwarded-for")?.split(",")[0] || 
                      request?.headers.get("x-real-ip") || undefined;

    await prisma.userAction.create({
      data: {
        action,
        target,
        metadata: metadata ? JSON.stringify(metadata) : undefined,
        userAgent,
        ipAddress,
      },
    });
  } catch (error) {
    console.error("Error tracking user action:", error);
  }
}

export async function createAuditLog(
  action: string,
  entity: string,
  entityId?: string,
  details?: string,
  request?: Request
) {
  try {
    const userAgent = request?.headers.get("user-agent") || undefined;
    const ipAddress = request?.headers.get("x-forwarded-for")?.split(",")[0] || 
                      request?.headers.get("x-real-ip") || undefined;

    await prisma.auditLog.create({
      data: {
        action,
        entity,
        entityId,
        details,
        userAgent,
        ipAddress,
      },
    });
  } catch (error) {
    console.error("Error creating audit log:", error);
  }
}

function extractBrowser(userAgent?: string): string | undefined {
  if (!userAgent) return undefined;
  if (userAgent.includes("Chrome")) return "Chrome";
  if (userAgent.includes("Firefox")) return "Firefox";
  if (userAgent.includes("Safari")) return "Safari";
  if (userAgent.includes("Edge")) return "Edge";
  return "Other";
}

function extractOS(userAgent?: string): string | undefined {
  if (!userAgent) return undefined;
  if (userAgent.includes("Windows")) return "Windows";
  if (userAgent.includes("Mac")) return "macOS";
  if (userAgent.includes("Linux")) return "Linux";
  if (userAgent.includes("Android")) return "Android";
  if (userAgent.includes("iOS")) return "iOS";
  return "Other";
}

