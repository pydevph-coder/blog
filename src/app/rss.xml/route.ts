import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const site = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const title = process.env.NEXT_PUBLIC_SITE_NAME || "My Blog";
  const description = process.env.NEXT_PUBLIC_SITE_DESCRIPTION || "";
  const posts = await prisma.post.findMany({
    where: { status: "PUBLISHED" },
    orderBy: { publishedAt: "desc" },
    take: 50,
    select: { title: true, slug: true, excerpt: true, publishedAt: true },
  });

  const items = posts
    .map((p: { title: string; slug: string; excerpt: string | null; publishedAt: Date | string | null }) => `
      <item>
        <title><![CDATA[${p.title}]]></title>
        <link>${site}/post/${p.slug}</link>
        <description><![CDATA[${p.excerpt ?? ""}]]></description>
        ${p.publishedAt ? `<pubDate>${new Date(p.publishedAt).toUTCString()}</pubDate>` : ""}
        <guid>${site}/post/${p.slug}</guid>
      </item>`)
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8" ?>
  <rss version="2.0">
    <channel>
      <title><![CDATA[${title}]]></title>
      <link>${site}</link>
      <description><![CDATA[${description}]]></description>
      ${items}
    </channel>
  </rss>`;

  return new NextResponse(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } });
}


