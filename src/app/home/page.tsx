import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function HomeFeedPage() {
  const posts = await prisma.post.findMany({
    where: { status: "PUBLISHED" },
    orderBy: { publishedAt: "desc" },
    take: 10,
    select: { id: true, title: true, slug: true, excerpt: true, publishedAt: true },
  });

  return (
    <main className="mx-auto max-w-4xl px-4 py-12">
      {/* Header Section */}
      <div className="mb-12 text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-400 bg-clip-text text-transparent">
          Latest Posts & Updates
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Stay updated with my latest projects, assignments, tutorials, and insights from the world of 
          programming and engineering.
        </p>
      </div>

      {/* Posts Grid */}
      {posts.length > 0 ? (
        <div className="space-y-6">
          {posts.map((post: { id: string; slug: string; title: string; excerpt: string | null; publishedAt: Date | string | null }) => (
            <article 
              key={post.id} 
              className="group border-2 border-gray-200 dark:border-gray-800 rounded-xl p-6 hover:border-gray-400 dark:hover:border-gray-600 transition-all duration-300 hover:shadow-lg bg-white dark:bg-gray-900"
            >
              <Link href={`/post/${post.slug}`} className="block space-y-3">
                <div className="flex items-start justify-between gap-4">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200 flex-1">
                    {post.title}
                  </h2>
                  <svg 
                    className="w-6 h-6 text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-all duration-200 group-hover:translate-x-1 flex-shrink-0" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
                {post.excerpt && (
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed line-clamp-2">
                    {post.excerpt}
                  </p>
                )}
                <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-500">
                  {post.publishedAt && (
                    <time className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {new Date(post.publishedAt).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </time>
                  )}
                  <span className="flex items-center gap-1 text-blue-600 dark:text-blue-400 font-medium">
                    Read more
                  </span>
                </div>
              </Link>
            </article>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 space-y-4">
          <div className="w-16 h-16 mx-auto bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">No posts yet</h3>
          <p className="text-gray-600 dark:text-gray-400">
            Check back soon for new content and updates!
          </p>
        </div>
      )}
    </main>
  );
}


