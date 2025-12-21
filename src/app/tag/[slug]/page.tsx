import Link from "next/link";
import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { buildMetadata } from "@/lib/seo";

type PageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const tag = await prisma.tag.findUnique({ where: { slug } });
  if (!tag) return buildMetadata({ title: "Tag" }) as Metadata;
  return buildMetadata({ title: `#${tag.name}` }) as Metadata;
}

export default async function TagPage({ params }: PageProps) {
  const { slug } = await params;
  const tag = await prisma.tag.findUnique({
    where: { slug },
    include: { posts: { include: { post: true } } },
  });
  if (!tag) return <div className="py-16">Tag not found.</div>;

  const posts = tag.posts
    .map((pt: { post: { id: string; slug: string; title: string; status: string; publishedAt: Date | null } }) => pt.post)
    .filter((p: { status: string }) => p.status === "PUBLISHED")
    .sort((a: { publishedAt: Date | null }, b: { publishedAt: Date | null }) => (a.publishedAt && b.publishedAt ? b.publishedAt.getTime() - a.publishedAt.getTime() : 0));

  return (
    <main className="mx-auto max-w-3xl px-4 py-10 space-y-6">
      <h1 className="text-3xl font-bold">#{tag.name}</h1>
      <ul className="space-y-4">
        {posts.map((p: { id: string; slug: string; title: string }) => (
          <li key={p.id} className="border-b pb-3">
            <Link href={`/post/${p.slug}`} className="font-semibold hover:underline">{p.title}</Link>
          </li>
        ))}
      </ul>
    </main>
  );
}

export const revalidate = 3600;


