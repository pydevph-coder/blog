import Link from "next/link";
import { prisma } from "@/lib/prisma";
import SearchAndFilters from "@/components/SearchAndFilters";
import { AdBanner468x60, AdBanner320x50, AdBannerContainer } from "@/components/Ads";

export default async function ProjectsPage() {
  // Get projects category posts with tags
  const projects = await prisma.post.findMany({
    where: { 
      status: "PUBLISHED",
      category: {
        slug: "projects"
      }
    },
    orderBy: { publishedAt: "desc" },
    select: { 
      id: true, 
      title: true, 
      slug: true, 
      cat : true,
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
              slug: "projects"
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

  // Transform posts to match component expectations
  const transformedProjects = projects.map(project => ({
    ...project,
    tags: project.tags.map(pt => ({ tag: pt.tag }))
  }));

  return (
    <main className="w-full px-4 py-12">
      <div className="flex gap-6 max-w-7xl mx-auto">
        {/* Left Sidebar for Ads */}
        <aside className="hidden lg:block w-64 flex-shrink-0">
          <div className=" top-24 space-y-4">
              <AdBannerContainer/>
           
         </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1 min-w-0">
      {/* Header Section */}
      <section className="text-center mb-16 space-y-6">
        <div className="w-20 h-20 mx-auto bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center shadow-lg">
          <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-400 bg-clip-text text-transparent">
          Kivy Studio Projects
        </h1>
        {/* <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
          Discover my innovative projects spanning web development, software engineering, and cutting-edge technologies. 
          Each project showcases problem-solving skills, technical expertise, and a passion for creating meaningful solutions. 
          Explore detailed walkthroughs, code examples, and lessons learned.
        </p> */}
      </section>

      {/* Features Grid */}
      {/* <section className="grid md:grid-cols-3 gap-6 mb-12">
        <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
          <div className="w-12 h-12 bg-blue-600 dark:bg-blue-500 rounded-lg flex items-center justify-center mb-4">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
          </div>
          <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-2">Full-Stack Development</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            End-to-end web applications with modern frameworks and best practices
          </p>
        </div>

        <div className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl border border-purple-200 dark:border-purple-800">
          <div className="w-12 h-12 bg-purple-600 dark:bg-purple-500 rounded-lg flex items-center justify-center mb-4">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-2">Innovation & Problem Solving</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Creative solutions to complex challenges with clean architecture
          </p>
        </div>

        <div className="p-6 bg-gradient-to-br from-green-50 to-teal-50 dark:from-green-900/20 dark:to-teal-900/20 rounded-xl border border-green-200 dark:border-green-800">
          <div className="w-12 h-12 bg-green-600 dark:bg-green-500 rounded-lg flex items-center justify-center mb-4">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-2">Open Source & Learning</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Sharing knowledge through detailed documentation and tutorials
          </p>
        </div>
      </section> */}

      {/* Search and Filters with Projects List */}
      {projects.length > 0 ? (
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">Featured Projects</h2>
          <SearchAndFilters posts={transformedProjects} allTags={allTags} type="projects" />
        </section>
      ) : (
        <section className="text-center py-16 space-y-4">
          <div className="w-16 h-16 mx-auto bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
            <img src="/studio/icon.png" alt="No Projects" width={64} height={64} />
            {/* <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg> */}
          </div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">No projects yet</h3>
          <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
            Projects will appear here once they&apos;re published. Check back soon for exciting new developments 
            and innovative solutions!
          </p>
        </section>
      )}

      {/* CTA Section */}
      <section className="mt-16 p-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl text-center space-y-4">
        <h2 className="text-2xl font-bold text-white">Want to Collaborate?</h2>
        <p className="text-blue-100 max-w-2xl mx-auto">
          Have a project idea or want to work together on something exciting? 
          I&apos;m always open to discussing new opportunities and collaborations!
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            href="/contact" 
            className="inline-block px-8 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            Get In Touch
          </Link>
          <Link 
            href="/home" 
            className="inline-block px-8 py-3 border-2 border-white text-white rounded-lg font-semibold hover:bg-white/10 transition-all duration-200"
          >
            View All Posts
          </Link>
        </div>
      </section>
        </div>
      </div>
    </main>
  );
}

