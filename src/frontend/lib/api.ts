// API utility functions for mobile app frontend

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "/api";

export interface User {
  id: string;
  deviceId: string;
  installedDate: string;
  lastLogin: string | null;
  deviceModel: string | null;
  androidVersion: string | null;
}

export interface Report {
  id: string;
  userId: string;
  message: string;
  date: string;
  solved: boolean;
  dateSolved: string | null;
}

export interface Version {
  id: string;
  app: string;
  version: string;
  buildDate: string;
  updateMessage: string | null;
  notification: string | null;
}

// User API
export async function registerUser(
  deviceId: string,
  deviceModel?: string,
  androidVersion?: string
): Promise<{ success: boolean; user?: User; error?: string }> {
  try {
    const response = await fetch(`${API_BASE_URL}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        deviceId,
        deviceModel,
        androidVersion,
      }),
    });

    const data = await response.json();
    if (!response.ok) {
      return { success: false, error: data.error || "Failed to register user" };
    }
    return { success: true, user: data.user };
  } catch {
    return { success: false, error: "Network error" };
  }
}

export async function getUser(deviceId: string): Promise<{ success: boolean; user?: User; error?: string }> {
  try {
    const response = await fetch(`${API_BASE_URL}/users?deviceId=${encodeURIComponent(deviceId)}`);
    const data = await response.json();
    if (!response.ok) {
      return { success: false, error: data.error || "Failed to get user" };
    }
    return { success: true, user: data.user };
  } catch {
    return { success: false, error: "Network error" };
  }
}

// Report API
export async function createReport(
  userId: string,
  message: string
): Promise<{ success: boolean; report?: Report; error?: string }> {
  try {
    const response = await fetch(`${API_BASE_URL}/reports`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId,
        message,
      }),
    });

    const data = await response.json();
    if (!response.ok) {
      return { success: false, error: data.error || "Failed to create report" };
    }
    return { success: true, report: data.report };
  } catch {
    return { success: false, error: "Network error" };
  }
}

export async function getUserReports(userId: string): Promise<{ success: boolean; reports?: Report[]; error?: string }> {
  try {
    const response = await fetch(`${API_BASE_URL}/reports?userId=${encodeURIComponent(userId)}`);
    const data = await response.json();
    if (!response.ok) {
      return { success: false, error: data.error || "Failed to get reports" };
    }
    return { success: true, reports: data.reports };
  } catch {
    return { success: false, error: "Network error" };
  }
}

// Version API
export async function getLatestVersion(app: string): Promise<{ success: boolean; version?: Version; error?: string }> {
  try {
    const response = await fetch(`${API_BASE_URL}/version?app=${encodeURIComponent(app)}`);
    const data = await response.json();
    if (!response.ok) {
      return { success: false, error: data.error || "Failed to get version" };
    }
    return { success: true, version: data.version };
  } catch {
    return { success: false, error: "Network error" };
  }
}

// Device ID generation (for demo purposes)
export function generateDeviceId(): string {
  // In a real app, you'd use a proper device identifier
  // For web demo, we'll use localStorage
  if (typeof window !== "undefined") {
    let deviceId = localStorage.getItem("deviceId");
    if (!deviceId) {
      deviceId = `web-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      localStorage.setItem("deviceId", deviceId);
    }
    return deviceId;
  }
  return `temp-${Date.now()}`;
}






