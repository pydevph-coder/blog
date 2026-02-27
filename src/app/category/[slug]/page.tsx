import Link from "next/link";
import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { buildMetadata } from "@/lib/seo";

type PageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = await prisma.category.findUnique({ where: { slug } });
  const title = category ? category.name : slug.replace(/[-_]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  const description = category?.description || undefined;
  return buildMetadata({ title, description }) as Metadata;
}

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params;
  let category = await prisma.category.findUnique({ where: { slug } });
  if (!category) {
    const name = slug.replace(/[-_]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
    // Auto-create the category if it doesn't exist
    category = await prisma.category.create({ data: { slug, name, description: `${name} posts` } });
  }
  const categoryWithPosts = await prisma.category.findUnique({
    where: { slug },
    include: { posts: { where: { status: "PUBLISHED" }, orderBy: { publishedAt: "desc" } } },
  });
  if (!categoryWithPosts) return <div className="py-16">Category not found.</div>;

  return (
    <main className="mx-auto max-w-3xl px-4 py-10 space-y-6">
      <h1 className="text-3xl font-bold">{categoryWithPosts.name}</h1>
      {categoryWithPosts.description && <p className="text-gray-600">{categoryWithPosts.description}</p>}
      <ul className="space-y-4">
        {categoryWithPosts.posts.map((p: { id: string; slug: string; title: string }) => (
          <li key={p.id} className="border-b pb-3">
            <Link href={`/post/${p.slug}`} className="font-semibold hover:underline">{p.title}</Link>
          </li>
        ))}
      </ul>
    </main>
  );
}

export const revalidate = 3600;


