import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { markdownToHtml } from "@/lib/markdown";
import { buildMetadata } from "@/lib/seo";
import Link from "next/link";
import { unstable_noStore as noStore } from "next/cache";

type PageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;

  const post = await prisma.post.findUnique({
    where: { slug },
  });

  if (!post) {
    return buildMetadata({ title: "Not found" }) as Metadata;
  }

  return buildMetadata({
    title: post.metaTitle || post.title,
    description: post.metaDescription || post.excerpt || undefined,
    canonical: `${
      process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
    }/post/${post.slug}`,
    image: post.ogImageUrl || undefined,
  }) as Metadata;
}

export default async function PostPage({ params }: PageProps) {
  noStore();

  const { slug } = await params;

  const post = await prisma.post.findUnique({
    where: { slug },
    include: { category: true },
  });

  if (!post) {
    return <div className="py-16">Post not found.</div>;
  }

  // Increment view count
  if (post.status === "PUBLISHED") {
    await prisma.post.update({
      where: { id: post.id },
      data: { views: { increment: 1 } },
    });
  }

  // Resolve content HTML
  let html = post.contentHtml;
  if (!html && post.contentMarkdown) {
    html = await markdownToHtml(post.contentMarkdown);
  }

  // Safe category handling
  const categorySlug = post.category?.slug;
  const isProjectOrAssignment =
    categorySlug === "projects" || categorySlug === "assignments";

  const site = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const canonical = `${site}/post/${post.slug}`;
  const ogImage = post.ogImageUrl || undefined;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.metaTitle || post.title,
    description: post.metaDescription || post.excerpt || undefined,
    datePublished: post.publishedAt
      ? new Date(post.publishedAt).toISOString()
      : undefined,
    dateModified: post.updatedAt
      ? new Date(post.updatedAt).toISOString()
      : undefined,
    mainEntityOfPage: canonical,
    url: canonical,
    image: ogImage ? [ogImage] : undefined,
  };

  return (
    <>
      <link rel="canonical" href={canonical} />
      <meta property="og:type" content="article" />
      <meta property="og:title" content={post.metaTitle || post.title} />
      {post.metaDescription && (
        <meta property="og:description" content={post.metaDescription} />
      )}
      <meta property="og:url" content={canonical} />
      {ogImage && <meta property="og:image" content={ogImage} />}
      <meta
        name="twitter:card"
        content={ogImage ? "summary_large_image" : "summary"}
      />
      <meta
        name="twitter:title"
        content={post.metaTitle || post.title}
      />
      {post.metaDescription && (
        <meta
          name="twitter:description"
          content={post.metaDescription}
        />
      )}
      {ogImage && <meta name="twitter:image" content={ogImage} />}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Back Button */}
      {isProjectOrAssignment && (
        <div className="mb-6">
          <Link
            href={`/${categorySlug}`}
            className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            <span className="font-medium">
              Back to {categorySlug === "projects" ? "Projects" : "Assignments"}
            </span>
          </Link>
        </div>
      )}

      <article
        className={
          isProjectOrAssignment
            ? "max-w-none"
            : "prose dark:prose-invert max-w-none"
        }
      >
        {!isProjectOrAssignment && (
          <>
            <h1>{post.title}</h1>
            {post.publishedAt && (
              <p className="text-sm text-gray-500">
                {new Date(post.publishedAt).toLocaleDateString()}
              </p>
            )}
          </>
        )}

        {html ? (
          <div
            dangerouslySetInnerHTML={{ __html: html }}
            className={isProjectOrAssignment ? "w-full [&_*]:!max-w-none" : ""}
            suppressHydrationWarning
          />
        ) : (
          <div className="text-center py-8 text-gray-500">
            <p>No content available.</p>
            {process.env.NODE_ENV === "development" && (
              <p className="text-xs mt-2">
                Debug: contentHtml={post.contentHtml ? "exists" : "null"},
                contentMarkdown={post.contentMarkdown ? "exists" : "null"}
              </p>
            )}
          </div>
        )}
      </article>
    </>
  );
}

export const revalidate = 0;
