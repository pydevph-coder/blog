import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-12">
      {/* Hero Section */}
      <section className="text-center mb-16 space-y-6">
        <div className="w-32 h-32 mx-auto bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
          <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-400 bg-clip-text text-transparent">
          About Me
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Passionate developer, engineer, and lifelong learner sharing knowledge through projects,
          assignments, and insights.
        </p>
      </section>

      {/* Main Content */}
      <section className="space-y-8 mb-12">
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">Who I Am</h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
            Welcome to my digital portfolio! I&apos;m a dedicated programmer and engineer with a passion for
            creating innovative solutions and sharing knowledge. This platform serves as a comprehensive
            collection of my work, including detailed projects, academic assignments, and educational vlogs
            that document my journey through the ever-evolving world of technology.
          </p>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
            My approach to development and engineering is rooted in clean code principles, thorough
            documentation, and practical problem-solving. I believe in making complex concepts accessible
            through clear explanations, reproducible steps, and real-world applications that others can
            learn from and build upon.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 my-8">
          <div className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-xl border border-blue-200 dark:border-blue-800">
            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3 flex items-center gap-2">
              <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                />
              </svg>
              My Focus Areas
            </h3>
            <ul className="space-y-2 text-gray-700 dark:text-gray-300">
              <li className="flex items-start gap-2">
                <span className="text-blue-600 dark:text-blue-400 mt-1">•</span>
                <span>Web Development & Full-Stack Engineering</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 dark:text-blue-400 mt-1">•</span>
                <span>Software Architecture & Design Patterns</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 dark:text-blue-400 mt-1">•</span>
                <span>Problem Solving & Algorithm Design</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 dark:text-blue-400 mt-1">•</span>
                <span>Technical Documentation & Knowledge Sharing</span>
              </li>
            </ul>
          </div>

          <div className="p-6 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-xl border border-purple-200 dark:border-purple-800">
            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3 flex items-center gap-2">
              <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
              What You&apos;ll Find Here
            </h3>
            <ul className="space-y-2 text-gray-700 dark:text-gray-300">
              <li className="flex items-start gap-2">
                <span className="text-purple-600 dark:text-purple-400 mt-1">•</span>
                <span>In-depth project walkthroughs with code examples</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-600 dark:text-purple-400 mt-1">•</span>
                <span>Academic assignments with detailed explanations</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-600 dark:text-purple-400 mt-1">•</span>
                <span>Video tutorials and technical vlogs</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-600 dark:text-purple-400 mt-1">•</span>
                <span>Best practices and lessons learned</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="prose prose-lg dark:prose-invert max-w-none">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">My Philosophy</h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
            I believe that the best way to learn is by doing, and the best way to teach is by sharing.
            Every project, assignment, and tutorial on this site is crafted with attention to detail,
            ensuring that readers and viewers can not only understand the concepts but also implement
            them in their own work.
          </p>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            Whether you&apos;re a fellow developer looking for inspiration, a student seeking guidance, or
            someone interested in collaborating on exciting projects, I hope you find value in the
            content shared here. Feel free to explore, learn, and don&apos;t hesitate to reach out if you
            have questions or ideas for collaboration!
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="mt-12 p-8 bg-gradient-to-r from-gray-900 to-gray-800 dark:from-gray-800 dark:to-gray-700 rounded-xl text-center space-y-4">
        <h2 className="text-2xl font-bold text-white">Let&apos;s Connect</h2>
        <p className="text-gray-300 max-w-2xl mx-auto">
          Interested in collaborating, have questions about my work, or want to discuss a project?
          I&apos;d love to hear from you!
        </p>
        <Link
          href="/contact"
          className="inline-block px-8 py-3 bg-white text-gray-900 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
        >
          Get In Touch
        </Link>
      </section>
    </main>
  );
}