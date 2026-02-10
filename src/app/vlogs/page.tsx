import Link from "next/link";
import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { buildMetadata } from "@/lib/seo";
import { AdBanner468x60, AdBanner320x50, AdBannerContainer } from "@/components/Ads";

export const metadata: Metadata = buildMetadata({
  title: "Kivy Studio Sample Vlogs",
  description:
    "Watch Kivy Studio sample project vlogs with downloads for 2048, KivyBird, Calculator, TensorFlow Lite demos, and more – all built with Python and Kivy.",
  canonical: `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/vlogs`,
  image: "/file.svg",
}) as Metadata;

const truncate = (text: string, length = 100) =>
  text.length > length ? text.slice(0, length) + "…" : text;

export default async function VlogsLandingPage() {
  const posts = await prisma.post.findMany({
    where: {
      status: "PUBLISHED",
      category: {
        slug: "vlogs",
      },
    },
    orderBy: { publishedAt: "desc" },
    select: {
      id: true,
      title: true,
      slug: true,
      excerpt: true,
      publishedAt: true,
      readingTimeMin: true,
      image: true, // Make sure your posts table has an image column
    },
  });

  const deriveSampleSlug = (slug: string) => {
    if (slug.startsWith("vlog-") && slug.endsWith("-sample")) {
      return slug.slice(5, -7);
    }
    return slug;
  };

  return (
    <main className="w-full px-4 py-12">
      <div className="flex max-w-7xl mx-auto gap-6">
        {/* Left Sidebar for Ads */}
        <aside className="hidden lg:block w-64 flex-shrink-0">
          <div className="top-24 space-y-4">
          <AdBannerContainer/>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1 min-w-0 space-y-10">
          {/* Hero */}
          <section className="text-center space-y-6">
            <span className="inline-flex items-center rounded-full border border-purple-200 bg-purple-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-purple-700 dark:border-purple-500/40 dark:bg-purple-900/40 dark:text-purple-200">
              Video Tutorials • Kivy Studio Samples
            </span>
            <h1 className="text-3xl md:text-5xl font-extrabold leading-tight bg-gradient-to-r from-gray-900 via-purple-700 to-indigo-600 dark:from-gray-50 dark:via-purple-300 dark:to-indigo-300 bg-clip-text text-transparent">
              Kivy Studio Sample Project Vlogs
            </h1>
            <p className="text-base md:text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
              Dive into step-by-step video walkthroughs for Kivy Studio sample projects – including
              games like 2048 and KivyBird, utility apps like Calculator and DrawingApp, and advanced
              Camera4Kivy + TensorFlow Lite demos. Each vlog is paired with a downloadable project so
              you can follow along in Kivy Studio.
            </p>
          </section>

          {/* Features Grid */}
          <section className="grid gap-4 md:grid-cols-3 text-sm">
            <div className="rounded-xl border border-gray-200 bg-white/80 p-4 shadow-sm dark:border-gray-700 dark:bg-gray-900/70">
              <h2 className="mb-1 text-sm font-semibold text-gray-900 dark:text-gray-50">
                Learn by Doing
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Watch the vlog, download the Kivy Studio sample, and experiment with the code on your
                own device.
              </p>
            </div>
            <div className="rounded-xl border border-gray-200 bg-white/80 p-4 shadow-sm dark:border-gray-700 dark:bg-gray-900/70">
              <h2 className="mb-1 text-sm font-semibold text-gray-900 dark:text-gray-50">
                Focused Topics
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Each sample focuses on a concept: UI layouts, game loops, ads, camera access, or
                on-device ML with TensorFlow Lite.
              </p>
            </div>
            <div className="rounded-xl border border-gray-200 bg-white/80 p-4 shadow-sm dark:border-gray-700 dark:bg-gray-900/70">
              <h2 className="mb-1 text-sm font-semibold text-gray-900 dark:text-gray-50">
                Built for Beginners & Teachers
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Perfect for self‑study or classroom demos – just open the sample in Kivy Studio and
                follow the video.
              </p>
            </div>
          </section>

          {/* Vlogs Grid */}
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-50">
                Latest Kivy Studio Vlogs
              </h2>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Showing {posts.length} vlog{posts.length === 1 ? "" : "s"}
              </p>
            </div>

            {posts.length === 0 ? (
              <div className="text-center py-16 space-y-3">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  No vlogs published yet
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 max-w-md mx-auto">
                  Once vlog posts are seeded into the Vlogs category, they&apos;ll appear here with
                  links to their dedicated video pages.
                </p>
              </div>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {posts.map((post) => {
                  const sampleSlug = deriveSampleSlug(post.slug);
                  return (
                    <article
                      key={post.id}
                      className="group flex flex-col rounded-xl border border-gray-200 bg-white/80 p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg dark:border-gray-800 dark:bg-gray-900/80"
                    >
                      {post.image && (
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-full h-40 object-cover rounded-md mb-3"
                        />
                      )}
                      <div className="mb-3 flex items-center justify-between gap-2">
                        <span className="inline-flex items-center rounded-full bg-purple-100 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-purple-700 dark:bg-purple-900/40 dark:text-purple-200">
                          Sample Vlog
                        </span>
                        {post.publishedAt && (
                          <time className="text-[11px] text-gray-500 dark:text-gray-400">
                            {new Date(post.publishedAt).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            })}
                          </time>
                        )}
                      </div>
                      <h3 className="mb-2 text-lg font-semibold text-gray-900 group-hover:text-purple-700 dark:text-gray-50 dark:group-hover:text-purple-300">
                        {post.title}
                      </h3>
                      {post.excerpt && (
                        <p className="mb-4 text-sm text-gray-600 dark:text-gray-400 line-clamp-3">
                          {truncate(post.excerpt, 120)}
                        </p>
                      )}
                      <div className="mt-auto flex flex-col gap-2 text-xs">
                        <div className="flex flex-wrap gap-2">
                          <Link
                            href={`/vlogs/${sampleSlug}`}
                            className="inline-flex items-center justify-center rounded-full bg-purple-600 px-3 py-1.5 text-[11px] font-semibold text-white shadow-sm transition group-hover:bg-purple-700"
                          >
                            Watch Vlog & Download Sample
                          </Link>
                          <Link
                            href={`/post/${post.slug}`}
                            className="inline-flex items-center justify-center rounded-full border border-gray-300 px-3 py-1.5 text-[11px] font-semibold text-gray-800 transition hover:bg-gray-50 dark:border-gray-600 dark:text-gray-100 dark:hover:bg-gray-800"
                          >
                            Read Blog Summary
                          </Link>
                        </div>
                        {post.readingTimeMin && (
                          <span className="text-[11px] text-gray-500 dark:text-gray-400">
                            Approx. {post.readingTimeMin} min read
                          </span>
                        )}
                      </div>
                    </article>
                  );
                })}
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}
