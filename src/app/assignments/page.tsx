import Link from "next/link";
import { prisma } from "@/lib/prisma";
import SearchAndFilters from "@/components/SearchAndFilters";
import { AdBanner468x60, AdBanner320x50, AdBannerContainer } from "@/components/Ads";

export default async function AssignmentsPage() {
  // Get assignments category posts with tags
  const assignments = await prisma.post.findMany({
    where: { 
      status: "PUBLISHED",
      category: {
        slug: "assignments"
      }
    },
    orderBy: { publishedAt: "desc" },
    select: { 
      id: true, 
      title: true, 
      cat : true,
      slug: true, 
      excerpt: true, 
      publishedAt: true,
      readingTimeMin: true,
      tags: {
        select: {
          tag: {
            select: {
              id: true,
              name: true,
              slug: true
            }
          }
        }
      }
    },
  });

  // Get all unique tags for filtering
  const allTags = await prisma.tag.findMany({
    where: {
      posts: {
        some: {
          post: {
            status: "PUBLISHED",
            category: {
              slug: "assignments"
            }
          }
        }
      }
    },
    select: {
      id: true,
      name: true,
      slug: true
    },
    orderBy: {
      name: "asc"
    }
  });

  // Transform assignments to match component expectations
  const transformedAssignments = assignments.map(assignment => ({
    ...assignment,
    tags: assignment.tags.map(pt => ({ tag: pt.tag }))
  }));

  return (
    <main className="w-full px-4 py-12">
      <div className="flex gap-6 max-w-7xl mx-auto">
        {/* Left Sidebar for Ads */}
        <aside className="hidden lg:block w-64 flex-shrink-0">
          <div className="sticky top-24 space-y-4">
            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 min-h-[250px] flex items-center justify-center border border-gray-200 dark:border-gray-700">
              <AdBanner468x60 />
            </div>
            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 min-h-[70px] flex items-center justify-center border border-gray-200 dark:border-gray-700">
              <AdBanner320x50 />
            </div>
            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 min-h-[70px] flex items-center justify-center border border-gray-200 dark:border-gray-700">
              <AdBanner320x50 />
            </div>
            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 min-h-[70px] flex items-center justify-center border border-gray-200 dark:border-gray-700">
              <AdBanner320x50 />
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1 min-w-0">
      {/* Header Section */}
      <section className="text-center mb-16 space-y-6">
        <div className="w-20 h-20 mx-auto bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center shadow-lg">
          <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-400 bg-clip-text text-transparent">
          Academic Assignments
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
          Explore my collection of academic and professional assignments that demonstrate analytical thinking, 
          research capabilities, and practical application of theoretical knowledge. Each assignment includes 
          detailed explanations, methodologies, and key takeaways.
        </p>
      </section>

      {/* Info Section */}
      <section className="mb-12 p-8 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl border border-green-200 dark:border-green-800">
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">
              {assignments.length}+
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Assignments</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">
              Multiple
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Subjects Covered</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">
              Detailed
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Documentation</div>
          </div>
        </div>
      </section>

      {/* Search and Filters with Assignments List */}
      {assignments.length > 0 ? (
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">All Assignments</h2>
          <SearchAndFilters posts={transformedAssignments} allTags={allTags} type="assignments" />
        </section>
      ) : (
        <section className="text-center py-16 space-y-4">
          <div className="w-16 h-16 mx-auto bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">No assignments yet</h3>
          <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
            Assignments will appear here once they&apos;re published. Check back soon for detailed academic 
            and professional work!
          </p>
        </section>
      )}

      {/* CTA Section */}
      <section className="mt-16 p-8 bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl text-center space-y-4">
        <h2 className="text-2xl font-bold text-white">Interested in My Work?</h2>
        <p className="text-green-100 max-w-2xl mx-auto">
          Have questions about any assignment or want to discuss academic projects? 
          Feel free to reach out!
        </p>
        <Link 
          href="/contact" 
          className="inline-block px-8 py-3 bg-white text-green-600 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
        >
          Contact Me
        </Link>
      </section>
        </div>
      </div>
    </main>
  );
}

