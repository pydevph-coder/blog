import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ platform: string }> }
) {
  console.log("==== DOWNLOAD API CALLED ====");

  // ✅ unwrap the promise
  const { platform } = await params;

  console.log("platform =", platform);

  let path = "";

  if (platform === "android") path = "honest.jpg";
  else if (platform === "windows") path = "windows/kivystudio.exe";
  else {
    console.log("❌ invalid platform");
    return new Response("Not found", { status: 404 });
  }

  console.log("file path =", path);

  const supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  console.log("creating signed url...");
  const { data: list } = await supabase.storage
  .from("kivystudio")
  .list();

console.log("FILES =", list);


  const { data, error } = await supabase.storage
    .from("kivystudio")
    .createSignedUrl(path, 60 * 5);


  if (error) {
    console.log("❌ signed url error =", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  console.log("✅ signed url created");

  return NextResponse.json({ url: data?.signedUrl });
}
