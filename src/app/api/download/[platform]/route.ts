import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ platform: string }> }
) {
  const { platform } = await params;

  let url = "";

  if (platform === "android") {
    url = "https://firebasestorage.googleapis.com/v0/b/kivystudio.firebasestorage.app/o/kivystudio.apk?alt=media&token=0aba0469-f254-434e-8280-1060c72d623d";
  } else if (platform === "windows") {
    url = "https://firebasestorage.googleapis.com/v0/b/kivystudio.firebasestorage.app/o/KivyStudioBridge.exe?alt=media&token=be31c5b1-9c10-4aca-a574-d2de1e5a5273"; // replace later
  } else {
    return new Response("Not found", { status: 404 });
  }

  // 🔥 Redirect to download
  return NextResponse.redirect(url);
}
