import { PrismaClient } from "@prisma/client";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";

const prisma = new PrismaClient();

async function markdownToHtml(markdown: string): Promise<string> {
  const file = await unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypeSlug)
    .use(rehypeAutolinkHeadings, { behavior: "wrap" })
    .use(rehypeStringify)
    .process(markdown);

  return String(file);
}

async function main() {
  console.log("🌱 Starting seed...");

  // Create or get categories
  const projectsCategory = await prisma.category.upsert({
    where: { slug: "projects" },
    update: {},
    create: {
      name: "Projects",
      slug: "projects",
      description: "Showcase of my development projects and applications",
    },
  });

  const assignmentsCategory = await prisma.category.upsert({
    where: { slug: "assignments" },
    update: {},
    create: {
      name: "Assignments",
      slug: "assignments",
      description: "Academic and professional assignments",
    },
  });

  const vlogsCategory = await prisma.category.upsert({
    where: { slug: "vlogs" },
    update: {},
    create: {
      name: "Vlogs",
      slug: "vlogs",
      description:
        "Video walkthroughs and deep dives for Kivy Studio sample projects and tutorials",
    },
  });

  console.log("✅ Categories created/updated");

  // Create or get tags
  const tags = {
    react: await prisma.tag.upsert({
      where: { slug: "react" },
      update: {},
      create: { name: "React", slug: "react" },
    }),
    nextjs: await prisma.tag.upsert({
      where: { slug: "nextjs" },
      update: {},
      create: { name: "Next.js", slug: "nextjs" },
    }),
    typescript: await prisma.tag.upsert({
      where: { slug: "typescript" },
      update: {},
      create: { name: "TypeScript", slug: "typescript" },
    }),
    nodejs: await prisma.tag.upsert({
      where: { slug: "nodejs" },
      update: {},
      create: { name: "Node.js", slug: "nodejs" },
    }),
    prisma: await prisma.tag.upsert({
      where: { slug: "prisma" },
      update: {},
      create: { name: "Prisma", slug: "prisma" },
    }),
    tailwind: await prisma.tag.upsert({
      where: { slug: "tailwind" },
      update: {},
      create: { name: "Tailwind CSS", slug: "tailwind" },
    }),
    database: await prisma.tag.upsert({
      where: { slug: "database" },
      update: {},
      create: { name: "Database", slug: "database" },
    }),
    api: await prisma.tag.upsert({
      where: { slug: "api" },
      update: {},
      create: { name: "API", slug: "api" },
    }),
    webdev: await prisma.tag.upsert({
      where: { slug: "webdev" },
      update: {},
      create: { name: "Web Development", slug: "webdev" },
    }),
    fullstack: await prisma.tag.upsert({
      where: { slug: "fullstack" },
      update: {},
      create: { name: "Full Stack", slug: "fullstack" },
    }),
    python: await prisma.tag.upsert({
      where: { slug: "python" },
      update: {},
      create: { name: "Python", slug: "python" },
    }),
    kivy: await prisma.tag.upsert({
      where: { slug: "kivy" },
      update: {},
      create: { name: "Kivy", slug: "kivy" },
    }),
    android: await prisma.tag.upsert({
      where: { slug: "android" },
      update: {},
      create: { name: "Android", slug: "android" },
    }),
    mobiledev: await prisma.tag.upsert({
      where: { slug: "mobile-development" },
      update: {},
      create: { name: "Mobile Development", slug: "mobile-development" },
    }),
  };

  console.log("✅ Tags created/updated");

 

  // Sample Projects
  const projects = [
    {
      title: "Kivy Studio – Expo Go for Kivy/Python Android Development",
      slug: "kivy-studio-python-kivy-android-dev",
      excerpt:
        "Kivy Studio is an Expo Go–style Android environment for Python and Kivy that lets you build and test apps in real time without Android Studio or manual APK builds.",
      contentMarkdown: `<div style="max-width: 900px; margin: 0 auto; padding: 2rem; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.7; color: #0f172a;">
  <style>
    .kivy-hero { background: radial-gradient(circle at top left, #1d4ed8 0%, #0f172a 55%, #020617 100%); padding: 2.8rem 2rem; border-radius: 18px; color: #e5e7eb; margin-bottom: 2.2rem; position: relative; overflow: hidden; }
    .kivy-hero h1 { margin: 0; font-size: 2.2rem; font-weight: 800; letter-spacing: -0.04em; }
    .kivy-hero p { margin: 1rem 0 0; max-width: 640px; font-size: 1rem; opacity: 0.9; }
    .kivy-pill { display: inline-flex; align-items: center; gap: 0.35rem; padding: 0.35rem 0.85rem; border-radius: 999px; background: rgba(15,23,42,0.85); border: 1px solid rgba(148,163,184,0.4); font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.08em; color: #e5e7eb; margin-bottom: 0.9rem; }
    .kivy-section { margin: 2.1rem 0; }
    .kivy-section h2 { font-size: 1.4rem; margin-bottom: 0.75rem; color: #0f172a; border-bottom: 2px solid #2563eb; display: inline-block; padding-bottom: 0.25rem; }
    .kivy-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 1.3rem; margin-top: 1rem; }
    .kivy-card { background: #f9fafb; border-radius: 12px; padding: 1.2rem 1.3rem; border: 1px solid #e5e7eb; box-shadow: 0 10px 25px rgba(15,23,42,0.04); }
    .kivy-card h3 { margin: 0 0 0.45rem; font-size: 1rem; color: #111827; }
    .kivy-tag { display: inline-block; padding: 0.28rem 0.75rem; border-radius: 999px; font-size: 0.8rem; font-weight: 600; background: #e0f2fe; color: #0369a1; margin: 0.2rem 0.25rem 0 0; }
    .kivy-beta { background: linear-gradient(135deg, #f97316 0%, #ea580c 40%, #c2410c 100%); color: #fff7ed; border-radius: 14px; padding: 1.6rem 1.9rem; margin: 2.1rem 0; box-shadow: 0 16px 40px rgba(194,65,12,0.35); }
    .kivy-beta h2 { margin: 0 0 0.6rem; font-size: 1.35rem; color: #fffbeb; border: none; padding: 0; }
    .kivy-beta p { margin: 0.35rem 0; font-size: 0.95rem; }
    .kivy-links { display: flex; flex-wrap: wrap; gap: 0.75rem; margin-top: 1.3rem; }
    .kivy-link-primary { display: inline-flex; align-items: center; justify-content: center; padding: 0.55rem 1.2rem; border-radius: 999px; background: #2563eb; color: white; font-weight: 600; font-size: 0.9rem; text-decoration: none; box-shadow: 0 10px 30px rgba(37,99,235,0.5); }
    .kivy-link-secondary { display: inline-flex; align-items: center; justify-content: center; padding: 0.5rem 1.1rem; border-radius: 999px; border: 1px solid #9ca3af; color: #111827; font-weight: 500; font-size: 0.85rem; text-decoration: none; background: rgba(248,250,252,0.85); }
  </style>

  <div class="kivy-hero">
    <div class="kivy-pill">
      <span>🚀 Project</span>
      <span>Python • Kivy • Android</span>
    </div>
    <h1>Kivy Studio – Expo Go for Kivy/Python Android Development</h1>
    <p>
      Kivy Studio gives Python developers an Expo Go–style experience for Android: write Kivy apps on
      your desktop and see them update instantly on your phone – without touching Android Studio,
      Gradle, or complex build pipelines.
    </p>
  </div>

  <div class="kivy-section">
    <h2>✨ What Makes Kivy Studio Different?</h2>
    <p>
      Instead of forcing you through heavy Java/Kotlin and Gradle tooling, Kivy Studio focuses entirely on
      <strong>Python + Kivy</strong>. It&apos;s fast to set up, light on resources, and feels familiar if
      you&apos;ve ever used Expo Go in the React Native world.
    </p>
    <div class="kivy-grid">
      <div class="kivy-card">
        <h3>⚡ Real-time Android Preview</h3>
        <p>Save your Python files on Windows and watch Kivy Studio instantly reload the UX on your Android device.</p>
      </div>
      <div class="kivy-card">
        <h3>🚫 No Android Studio Required</h3>
        <p>Skip Gradle configs, long builds, and heavy IDEs. Everything runs through a lightweight bridge.</p>
      </div>
      <div class="kivy-card">
        <h3>🎓 Made for Learning</h3>
        <p>Preloaded sample apps, clean project structure, and instant feedback make it perfect for students and self‑taught devs.</p>
      </div>
      <div class="kivy-card">
        <h3>🤖 AI, ML & Computer Vision Ready</h3>
        <p>TensorFlow Lite, OpenCV, Camera4Kivy, NumPy and more are integrated for on-device ML experiments.</p>
      </div>
    </div>
  </div>

  <div class="kivy-section">
    <h2>🧱 Tech Stack & Libraries</h2>
    <p>
      Kivy Studio bundles a rich Python ecosystem so you can go from simple UI demos to serious AI/ML prototypes
      without leaving your comfort zone.
    </p>
    <div>
      <span class="kivy-tag">Python 3.8+</span>
      <span class="kivy-tag">Kivy 2.3.1</span>
      <span class="kivy-tag">KivyMD</span>
      <span class="kivy-tag">TensorFlow Lite</span>
      <span class="kivy-tag">OpenCV</span>
      <span class="kivy-tag">Camera4Kivy</span>
      <span class="kivy-tag">NumPy</span>
      <span class="kivy-tag">SQLAlchemy</span>
    </div>
  </div>

  <div class="kivy-beta">
    <h2>⚠️ Beta Release – Frequent Updates Recommended</h2>
    <p>
      The current Kivy Studio APK is a <strong>beta build</strong>. Features may change, some rough edges
      are expected, and I actively ship new versions as I add capabilities and improve stability.
    </p>
    <p>
      If you install this beta, plan to <strong>check back for future updates</strong> so you always have
      the best development experience and latest bug fixes.
    </p>
  </div>

  <div class="kivy-section">
    <h2>🔗 Explore the Live Project & Download</h2>
    <p>
      Want to dive deeper into how it works, or grab the APK and try it on your device? Use the links below
      to visit the dedicated project and download pages on this site.
    </p>
    <div class="kivy-links">
      <a href="/projects/kivy-studio" class="kivy-link-primary">View Kivy Studio Project Page</a>
      <a href="/downloads/kivy-studio" class="kivy-link-secondary">Go to Kivy Studio Download Flow</a>
    </div>
  </div>
</div>`,
      tags: [tags.python, tags.kivy, tags.android, tags.mobiledev],
    },
    {
      title: "KivyStudioBridge – Windows Companion for Kivy Studio Android",
      slug: "kivystudiobridge-windows-companion",
      excerpt:
        "KivyStudioBridge is the Windows desktop companion for Kivy Studio. It watches your Python/Kivy project and syncs changes in real time to the Kivy Studio Android app.",
      contentMarkdown: `<div style="max-width: 900px; margin: 0 auto; padding: 2rem; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.7; color: #0f172a;">
  <style>
    .bridge-hero { background: radial-gradient(circle at top left, #4f46e5 0%, #0f172a 55%, #020617 100%); padding: 2.8rem 2rem; border-radius: 18px; color: #e5e7eb; margin-bottom: 2.2rem; position: relative; overflow: hidden; }
    .bridge-hero h1 { margin: 0; font-size: 2.2rem; font-weight: 800; letter-spacing: -0.04em; }
    .bridge-hero p { margin: 1rem 0 0; max-width: 640px; font-size: 1rem; opacity: 0.9; }
    .bridge-pill { display: inline-flex; align-items: center; gap: 0.35rem; padding: 0.35rem 0.85rem; border-radius: 999px; background: rgba(15,23,42,0.9); border: 1px solid rgba(129,140,248,0.5); font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.08em; color: #e5e7eb; margin-bottom: 0.9rem; }
    .bridge-section { margin: 2.1rem 0; }
    .bridge-section h2 { font-size: 1.4rem; margin-bottom: 0.75rem; color: #0f172a; border-bottom: 2px solid #4f46e5; display: inline-block; padding-bottom: 0.25rem; }
    .bridge-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 1.3rem; margin-top: 1rem; }
    .bridge-card { background: #f9fafb; border-radius: 12px; padding: 1.2rem 1.3rem; border: 1px solid #e5e7eb; box-shadow: 0 10px 25px rgba(15,23,42,0.04); }
    .bridge-card h3 { margin: 0 0 0.45rem; font-size: 1rem; color: #111827; }
    .bridge-tag { display: inline-block; padding: 0.28rem 0.75rem; border-radius: 999px; font-size: 0.8rem; font-weight: 600; background: #e0e7ff; color: #3730a3; margin: 0.2rem 0.25rem 0 0; }
    .bridge-beta { background: linear-gradient(135deg, #f97316 0%, #ea580c 40%, #c2410c 100%); color: #fff7ed; border-radius: 14px; padding: 1.6rem 1.9rem; margin: 2.1rem 0; box-shadow: 0 16px 40px rgba(194,65,12,0.35); }
    .bridge-beta h2 { margin: 0 0 0.6rem; font-size: 1.35rem; color: #fffbeb; border: none; padding: 0; }
    .bridge-beta p { margin: 0.35rem 0; font-size: 0.95rem; }
    .bridge-links { display: flex; flex-wrap: wrap; gap: 0.75rem; margin-top: 1.3rem; }
    .bridge-link-primary { display: inline-flex; align-items: center; justify-content: center; padding: 0.55rem 1.2rem; border-radius: 999px; background: #4f46e5; color: white; font-weight: 600; font-size: 0.9rem; text-decoration: none; box-shadow: 0 10px 30px rgba(79,70,229,0.5); }
    .bridge-link-secondary { display: inline-flex; align-items: center; justify-content: center; padding: 0.5rem 1.1rem; border-radius: 999px; border: 1px solid #9ca3af; color: #111827; font-weight: 500; font-size: 0.85rem; text-decoration: none; background: rgba(248,250,252,0.9); }
  </style>

  <div class="bridge-hero">
    <div class="bridge-pill">
      <span>🔗 Project</span>
      <span>Windows • Desktop Bridge</span>
    </div>
    <h1>KivyStudioBridge – Windows Companion for Kivy Studio Android</h1>
    <p>
      KivyStudioBridge is a Windows desktop application that connects your code editor to the Kivy Studio
      Android app. It watches your Python/Kivy project and syncs changes to your device so Kivy Studio
      can reload your app in real time.
    </p>
  </div>

  <div class="bridge-section">
    <h2>⚙️ What Problem Does KivyStudioBridge Solve?</h2>
    <p>
      Without the bridge, you&apos;d have to manually copy files between your PC and Android device, or rely
      on slow, error‑prone workflows. KivyStudioBridge automates everything: it monitors your project folder,
      packages the right files, and sends them over the network or USB to Kivy Studio on Android.
    </p>
    <div class="bridge-grid">
      <div class="bridge-card">
        <h3>🖥️ Desktop–Device Bridge</h3>
        <p>Connects your Windows machine and Android device so you can code in comfort on your PC and preview on your phone.</p>
      </div>
      <div class="bridge-card">
        <h3>📁 Smart File Watching</h3>
        <p>Watches Python, KV, and asset files and only sends what changed, keeping the feedback loop fast and efficient.</p>
      </div>
      <div class="bridge-card">
        <h3>🧰 PyQt5 Interface</h3>
        <p>Clean, modern PyQt5 UI with tabs, logging, and connection status so you can see exactly what the bridge is doing.</p>
      </div>
    </div>
  </div>

  <div class="bridge-section">
    <h2>🧱 Tech Stack & Architecture</h2>
    <p>
      KivyStudioBridge is implemented in <strong>Python</strong> and uses <strong>PyQt5</strong> for its GUI,
      plus sockets and background threads for safe, responsive communication with the Kivy Studio app.
    </p>
    <div>
      <span class="bridge-tag">Python 3.8+</span>
      <span class="bridge-tag">PyQt5</span>
      <span class="bridge-tag">Socket Networking</span>
      <span class="bridge-tag">File Watcher</span>
      <span class="bridge-tag">Windows Desktop</span>
    </div>
  </div>

  <div class="bridge-beta">
    <h2>⚠️ Beta Release – Update Frequently</h2>
    <p>
      The current KivyStudioBridge build is a <strong>beta version</strong>. Features, UI details, and even
      connection strategies may evolve quickly as the project matures.
    </p>
    <p>
      For the smoothest experience, plan to <strong>download newer releases regularly</strong>, especially when
      you update the Kivy Studio Android app.
    </p>
  </div>

  <div class="bridge-section">
    <h2>🔗 Explore Project & Download</h2>
    <p>
      To learn more about how KivyStudioBridge fits into the whole ecosystem, or to grab the latest Windows
      build, use the links below to visit the dedicated pages on this site.
    </p>
    <div class="bridge-links">
      <a href="/projects/kivy-studiobridge" class="bridge-link-primary">View KivyStudioBridge Project Page</a>
      <a href="/downloads/kivy-studiobridge" class="bridge-link-secondary">Go to KivyStudioBridge Download Flow</a>
    </div>
  </div>
</div>`,
      tags: [tags.python],
    },
    {
      title: "Modern Blog Platform",
      slug: "modern-blog-platform",
      excerpt: "A full-stack blog platform built with Next.js, TypeScript, and Prisma. Features include SEO optimization, admin dashboard, and markdown support.",
      contentMarkdown: `<div style="max-width: 900px; margin: 0 auto; padding: 2rem; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333;">
  <style>
    .project-header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 3rem 2rem; border-radius: 12px; color: white; margin-bottom: 2rem; text-align: center; }
    .project-header h1 { margin: 0; font-size: 2.5rem; font-weight: 700; }
    .project-header p { margin: 1rem 0 0; opacity: 0.9; font-size: 1.1rem; }
    .section { margin: 2.5rem 0; }
    .section h2 { color: #667eea; font-size: 1.8rem; margin-bottom: 1rem; border-bottom: 2px solid #667eea; padding-bottom: 0.5rem; }
    .feature-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1.5rem; margin: 1.5rem 0; }
    .feature-card { background: #f8f9fa; padding: 1.5rem; border-radius: 8px; border-left: 4px solid #667eea; transition: transform 0.2s; }
    .feature-card:hover { transform: translateY(-2px); box-shadow: 0 4px 12px rgba(102, 126, 234, 0.15); }
    .feature-card h3 { margin: 0 0 0.5rem; color: #667eea; font-size: 1.1rem; }
    .tech-badge { display: inline-block; background: #667eea; color: white; padding: 0.4rem 1rem; border-radius: 20px; margin: 0.3rem; font-size: 0.9rem; font-weight: 500; }
    .highlight-box { background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%); padding: 2rem; border-radius: 8px; margin: 2rem 0; border-left: 5px solid #667eea; }
  </style>
  
  <div class="project-header">
    <h1>🚀 Modern Blog Platform</h1>
    <p>A comprehensive blog platform built with cutting-edge web technologies</p>
  </div>

  <div class="section">
    <h2>✨ Key Features</h2>
    <div class="feature-grid">
      <div class="feature-card">
        <h3>⚡ Next.js 15</h3>
        <p>App Router for optimal performance and server-side rendering</p>
      </div>
      <div class="feature-card">
        <h3>🔒 TypeScript</h3>
        <p>Full type safety for robust and maintainable code</p>
      </div>
      <div class="feature-card">
        <h3>🗄️ Prisma ORM</h3>
        <p>Type-safe database access with PostgreSQL</p>
      </div>
      <div class="feature-card">
        <h3>🎨 Tailwind CSS</h3>
        <p>Utility-first CSS framework for rapid UI development</p>
      </div>
      <div class="feature-card">
        <h3>🔍 SEO Optimized</h3>
        <p>Metadata, sitemap, and RSS feed for better discoverability</p>
      </div>
      <div class="feature-card">
        <h3>👨‍💼 Admin Dashboard</h3>
        <p>Full-featured content management system</p>
      </div>
    </div>
  </div>

  <div class="section">
    <h2>🛠️ Tech Stack</h2>
    <div style="margin: 1rem 0;">
      <span class="tech-badge">Next.js</span>
      <span class="tech-badge">TypeScript</span>
      <span class="tech-badge">Prisma</span>
      <span class="tech-badge">PostgreSQL</span>
      <span class="tech-badge">Tailwind CSS</span>
      <span class="tech-badge">React</span>
    </div>
  </div>

  <div class="highlight-box">
    <h3 style="margin-top: 0; color: #667eea;">💡 Project Highlights</h3>
    <p>This project demonstrates modern full-stack development practices, including server-side rendering, API routes, database integration, and a complete admin interface. Built with performance and developer experience in mind.</p>
  </div>
</div>`,
      tags: [tags.nextjs, tags.typescript, tags.prisma, tags.tailwind, tags.fullstack],
    },
    {
      title: "E-Commerce API",
      slug: "ecommerce-api",
      excerpt: "RESTful API for an e-commerce platform with user authentication, product management, and order processing.",
      contentMarkdown: `<div style="max-width: 900px; margin: 0 auto; padding: 2rem; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333;">
  <style>
    .api-header { background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); padding: 3rem 2rem; border-radius: 12px; color: white; margin-bottom: 2rem; text-align: center; }
    .api-header h1 { margin: 0; font-size: 2.5rem; font-weight: 700; }
    .section { margin: 2.5rem 0; }
    .section h2 { color: #f5576c; font-size: 1.8rem; margin-bottom: 1rem; border-bottom: 2px solid #f5576c; padding-bottom: 0.5rem; }
    .feature-list { list-style: none; padding: 0; }
    .feature-list li { background: #fff5f7; padding: 1rem; margin: 0.8rem 0; border-radius: 8px; border-left: 4px solid #f5576c; }
    .endpoint-card { background: #1a1a1a; color: #00ff88; padding: 1.5rem; border-radius: 8px; margin: 1rem 0; font-family: 'Courier New', monospace; }
    .endpoint-card .method { color: #00d4ff; font-weight: bold; }
    .tech-badge { display: inline-block; background: #f5576c; color: white; padding: 0.4rem 1rem; border-radius: 20px; margin: 0.3rem; font-size: 0.9rem; font-weight: 500; }
  </style>
  
  <div class="api-header">
    <h1>🛒 E-Commerce API</h1>
    <p>Robust RESTful API for managing a complete e-commerce platform</p>
  </div>

  <div class="section">
    <h2>🔐 Core Features</h2>
    <ul class="feature-list">
      <li>🔑 User authentication and authorization with JWT</li>
      <li>📦 Product catalog management with categories</li>
      <li>🛍️ Shopping cart functionality</li>
      <li>📋 Order processing and tracking</li>
      <li>💳 Payment integration (Stripe/PayPal)</li>
      <li>👨‍💼 Admin dashboard for inventory management</li>
    </ul>
  </div>

  <div class="section">
    <h2>🛠️ Tech Stack</h2>
    <div style="margin: 1rem 0;">
      <span class="tech-badge">Node.js</span>
      <span class="tech-badge">Express.js</span>
      <span class="tech-badge">PostgreSQL</span>
      <span class="tech-badge">JWT</span>
      <span class="tech-badge">TypeScript</span>
    </div>
  </div>

  <div class="section">
    <h2>🌐 API Endpoints</h2>
    <div class="endpoint-card">
      <div><span class="method">POST</span> /api/auth/login - User authentication</div>
      <div><span class="method">GET</span> /api/products - Get all products</div>
      <div><span class="method">POST</span> /api/products - Create product (Admin)</div>
      <div><span class="method">POST</span> /api/cart - Add to cart</div>
      <div><span class="method">POST</span> /api/orders - Create order</div>
      <div><span class="method">GET</span> /api/users - User management (Admin)</div>
    </div>
  </div>
</div>`,
      tags: [tags.nodejs, tags.api, tags.database, tags.typescript],
    },
    {
      title: "Task Management Dashboard",
      slug: "task-management-dashboard",
      excerpt: "A collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.",
      contentMarkdown: `<div style="max-width: 900px; margin: 0 auto; padding: 2rem; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333;">
  <style>
    .dashboard-header { background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); padding: 3rem 2rem; border-radius: 12px; color: white; margin-bottom: 2rem; text-align: center; }
    .dashboard-header h1 { margin: 0; font-size: 2.5rem; font-weight: 700; }
    .section { margin: 2.5rem 0; }
    .section h2 { color: #4facfe; font-size: 1.8rem; margin-bottom: 1rem; border-bottom: 2px solid #4facfe; padding-bottom: 0.5rem; }
    .feature-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1.5rem; margin: 1.5rem 0; }
    .feature-item { background: linear-gradient(135deg, #e0f2fe 0%, #bae6fd 100%); padding: 1.5rem; border-radius: 8px; text-align: center; }
    .feature-item .icon { font-size: 2rem; margin-bottom: 0.5rem; }
    .feature-item h3 { margin: 0.5rem 0; color: #0369a1; }
    .tech-badge { display: inline-block; background: #4facfe; color: white; padding: 0.4rem 1rem; border-radius: 20px; margin: 0.3rem; font-size: 0.9rem; font-weight: 500; }
  </style>
  
  <div class="dashboard-header">
    <h1>📋 Task Management Dashboard</h1>
    <p>Modern collaborative task management for productive teams</p>
  </div>

  <div class="section">
    <h2>⚡ Key Features</h2>
    <div class="feature-grid">
      <div class="feature-item">
        <div class="icon">⚡</div>
        <h3>Real-time Sync</h3>
        <p>Instant updates across all team members</p>
      </div>
      <div class="feature-item">
        <div class="icon">🎯</div>
        <h3>Drag & Drop</h3>
        <p>Intuitive task organization</p>
      </div>
      <div class="feature-item">
        <div class="icon">👥</div>
        <h3>Team Workspaces</h3>
        <p>Collaborative project spaces</p>
      </div>
      <div class="feature-item">
        <div class="icon">📅</div>
        <h3>Due Dates</h3>
        <p>Task scheduling and reminders</p>
      </div>
      <div class="feature-item">
        <div class="icon">📊</div>
        <h3>Progress Tracking</h3>
        <p>Visual progress indicators</p>
      </div>
      <div class="feature-item">
        <div class="icon">📎</div>
        <h3>File Attachments</h3>
        <p>Attach documents and images</p>
      </div>
    </div>
  </div>

  <div class="section">
    <h2>🛠️ Tech Stack</h2>
    <div style="margin: 1rem 0;">
      <span class="tech-badge">React</span>
      <span class="tech-badge">Node.js</span>
      <span class="tech-badge">WebSocket</span>
      <span class="tech-badge">PostgreSQL</span>
      <span class="tech-badge">TypeScript</span>
    </div>
  </div>
</div>`,
      tags: [tags.react, tags.nodejs, tags.database, tags.webdev],
    },
    {
      title: "Weather App",
      slug: "weather-app",
      excerpt: "A responsive weather application that displays current conditions and forecasts using a weather API.",
      contentMarkdown: `<div style="max-width: 900px; margin: 0 auto; padding: 2rem; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333;">
  <style>
    .weather-header { background: linear-gradient(135deg, #fa709a 0%, #fee140 100%); padding: 3rem 2rem; border-radius: 12px; color: white; margin-bottom: 2rem; text-align: center; }
    .weather-header h1 { margin: 0; font-size: 2.5rem; font-weight: 700; }
    .section { margin: 2.5rem 0; }
    .section h2 { color: #fa709a; font-size: 1.8rem; margin-bottom: 1rem; border-bottom: 2px solid #fa709a; padding-bottom: 0.5rem; }
    .feature-card { background: linear-gradient(135deg, #fff5f7 0%, #ffeef2 100%); padding: 1.5rem; border-radius: 8px; margin: 1rem 0; border-left: 4px solid #fa709a; }
    .tech-badge { display: inline-block; background: #fa709a; color: white; padding: 0.4rem 1rem; border-radius: 20px; margin: 0.3rem; font-size: 0.9rem; font-weight: 500; }
    .highlight { background: linear-gradient(135deg, #ffeef2 0%, #fff5f7 100%); padding: 2rem; border-radius: 8px; margin: 2rem 0; }
  </style>
  
  <div class="weather-header">
    <h1>🌤️ Weather App</h1>
    <p>Beautiful weather application with accurate forecasts</p>
  </div>

  <div class="section">
    <h2>✨ Features</h2>
    <div class="feature-card">
      <h3 style="margin-top: 0; color: #fa709a;">🌡️ Current Conditions</h3>
      <p>Real-time weather data with temperature, humidity, and wind speed</p>
    </div>
    <div class="feature-card">
      <h3 style="margin-top: 0; color: #fa709a;">📅 7-Day Forecast</h3>
      <p>Extended weather predictions with detailed hourly breakdowns</p>
    </div>
    <div class="feature-card">
      <h3 style="margin-top: 0; color: #fa709a;">📍 Location-Based</h3>
      <p>Automatic location detection with manual search option</p>
    </div>
    <div class="feature-card">
      <h3 style="margin-top: 0; color: #fa709a;">📱 Responsive Design</h3>
      <p>Beautiful UI that works perfectly on all devices</p>
    </div>
  </div>

  <div class="section">
    <h2>🛠️ Tech Stack</h2>
    <div style="margin: 1rem 0;">
      <span class="tech-badge">React</span>
      <span class="tech-badge">Weather API</span>
      <span class="tech-badge">Tailwind CSS</span>
      <span class="tech-badge">TypeScript</span>
    </div>
  </div>

  <div class="highlight">
    <h3 style="margin-top: 0; color: #fa709a;">💡 Highlights</h3>
    <p>Clean, modern interface with accurate weather data and smooth animations. Features beautiful gradient backgrounds that change based on weather conditions.</p>
  </div>
</div>`,
      tags: [tags.react, tags.api, tags.tailwind],
    },
  ];

  // Sample Assignments
  const assignments = [
    {
      title: "Database Design Project",
      slug: "database-design-project",
      excerpt: "A comprehensive database design project for a library management system, including ER diagrams, normalization, and SQL implementation.",
      contentMarkdown: `<div style="max-width: 900px; margin: 0 auto; padding: 2rem; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333;">
  <style>
    .assignment-header { background: linear-gradient(135deg, #10b981 0%, #059669 100%); padding: 3rem 2rem; border-radius: 12px; color: white; margin-bottom: 2rem; text-align: center; }
    .assignment-header h1 { margin: 0; font-size: 2.5rem; font-weight: 700; }
    .section { margin: 2.5rem 0; }
    .section h2 { color: #10b981; font-size: 1.8rem; margin-bottom: 1rem; border-bottom: 2px solid #10b981; padding-bottom: 0.5rem; }
    .requirement-card { background: #ecfdf5; padding: 1.5rem; border-radius: 8px; margin: 1rem 0; border-left: 4px solid #10b981; }
    .schema-table { background: #1a1a1a; color: #10b981; padding: 1.5rem; border-radius: 8px; margin: 1rem 0; font-family: 'Courier New', monospace; }
    .schema-table .table-name { color: #34d399; font-weight: bold; }
    .learning-item { background: #d1fae5; padding: 1rem; margin: 0.8rem 0; border-radius: 8px; }
  </style>
  
  <div class="assignment-header">
    <h1>📚 Database Design Project</h1>
    <p>Complete database design for a library management system</p>
  </div>

  <div class="section">
    <h2>📋 Project Requirements</h2>
    <div class="requirement-card">
      <h3 style="margin-top: 0; color: #10b981;">📊 ER Diagram Design</h3>
      <p>Create comprehensive Entity-Relationship diagrams showing all entities, attributes, and relationships</p>
    </div>
    <div class="requirement-card">
      <h3 style="margin-top: 0; color: #10b981;">🔧 Schema Normalization</h3>
      <p>Normalize database schema to 3NF (Third Normal Form) to eliminate redundancy</p>
    </div>
    <div class="requirement-card">
      <h3 style="margin-top: 0; color: #10b981;">💾 SQL Implementation</h3>
      <p>Implement complete SQL schema with CREATE TABLE statements and constraints</p>
    </div>
    <div class="requirement-card">
      <h3 style="margin-top: 0; color: #10b981;">⚡ Performance Optimization</h3>
      <p>Create appropriate indexes for query optimization and performance</p>
    </div>
  </div>

  <div class="section">
    <h2>🗄️ Database Schema</h2>
    <div class="schema-table">
      <div><span class="table-name">Books</span> - id, title, isbn, author_id, category_id, published_date</div>
      <div><span class="table-name">Authors</span> - id, name, email, bio</div>
      <div><span class="table-name">Members</span> - id, name, email, phone, membership_date</div>
      <div><span class="table-name">Loans</span> - id, book_id, member_id, loan_date, return_date, status</div>
      <div><span class="table-name">Reservations</span> - id, book_id, member_id, reservation_date, status</div>
    </div>
  </div>

  <div class="section">
    <h2>🎓 Key Learnings</h2>
    <div class="learning-item">✅ Database normalization techniques (1NF, 2NF, 3NF)</div>
    <div class="learning-item">✅ Query optimization strategies</div>
    <div class="learning-item">✅ Index design for performance</div>
    <div class="learning-item">✅ Data integrity constraints (PK, FK, CHECK)</div>
    <div class="learning-item">✅ ER modeling best practices</div>
  </div>
</div>`,
      tags: [tags.database, tags.prisma],
    },
    {
      title: "Web Development Assignment",
      slug: "web-development-assignment",
      excerpt: "Building a responsive website using HTML, CSS, and JavaScript with modern design principles and accessibility features.",
      contentMarkdown: `<div style="max-width: 900px; margin: 0 auto; padding: 2rem; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333;">
  <style>
    .web-header { background: linear-gradient(135deg, #8b5cf6 0%, #a78bfa 100%); padding: 3rem 2rem; border-radius: 12px; color: white; margin-bottom: 2rem; text-align: center; }
    .web-header h1 { margin: 0; font-size: 2.5rem; font-weight: 700; }
    .section { margin: 2.5rem 0; }
    .section h2 { color: #8b5cf6; font-size: 1.8rem; margin-bottom: 1rem; border-bottom: 2px solid #8b5cf6; padding-bottom: 0.5rem; }
    .req-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1.5rem; margin: 1.5rem 0; }
    .req-item { background: #f5f3ff; padding: 1.5rem; border-radius: 8px; text-align: center; border: 2px solid #c4b5fd; }
    .req-item .icon { font-size: 2.5rem; margin-bottom: 0.5rem; }
    .req-item h3 { margin: 0.5rem 0; color: #8b5cf6; }
    .feature-list { list-style: none; padding: 0; }
    .feature-list li { background: #f5f3ff; padding: 1rem; margin: 0.8rem 0; border-radius: 8px; border-left: 4px solid #8b5cf6; }
    .tech-badge { display: inline-block; background: #8b5cf6; color: white; padding: 0.4rem 1rem; border-radius: 20px; margin: 0.3rem; font-size: 0.9rem; font-weight: 500; }
  </style>
  
  <div class="web-header">
    <h1>🌐 Web Development Assignment</h1>
    <p>Responsive website demonstrating modern web development practices</p>
  </div>

  <div class="section">
    <h2>📋 Requirements</h2>
    <div class="req-grid">
      <div class="req-item">
        <div class="icon">📱</div>
        <h3>Responsive Design</h3>
        <p>Works on all screen sizes</p>
      </div>
      <div class="req-item">
        <div class="icon">♿</div>
        <h3>Accessibility</h3>
        <p>WCAG 2.1 compliant</p>
      </div>
      <div class="req-item">
        <div class="icon">🏗️</div>
        <h3>Semantic HTML</h3>
        <p>Proper HTML structure</p>
      </div>
      <div class="req-item">
        <div class="icon">📐</div>
        <h3>CSS Grid/Flexbox</h3>
        <p>Modern layout techniques</p>
      </div>
      <div class="req-item">
        <div class="icon">⚡</div>
        <h3>JavaScript</h3>
        <p>Interactive functionality</p>
      </div>
    </div>
  </div>

  <div class="section">
    <h2>✨ Features Implemented</h2>
    <ul class="feature-list">
      <li>📱 Mobile-first responsive design approach</li>
      <li>♿ WCAG 2.1 Level AA accessibility standards</li>
      <li>🎨 Smooth CSS animations and transitions</li>
      <li>🖱️ Interactive elements with JavaScript</li>
      <li>🌐 Cross-browser compatibility testing</li>
      <li>⚡ Performance optimization techniques</li>
    </ul>
  </div>

  <div class="section">
    <h2>🛠️ Technologies Used</h2>
    <div style="margin: 1rem 0;">
      <span class="tech-badge">HTML5</span>
      <span class="tech-badge">CSS3</span>
      <span class="tech-badge">JavaScript ES6+</span>
      <span class="tech-badge">CSS Grid</span>
      <span class="tech-badge">Flexbox</span>
    </div>
  </div>
</div>`,
      tags: [tags.webdev, tags.tailwind],
    },
    {
      title: "API Integration Project",
      slug: "api-integration-project",
      excerpt: "A project demonstrating RESTful API integration, error handling, and data visualization using multiple third-party APIs.",
      contentMarkdown: `<div style="max-width: 900px; margin: 0 auto; padding: 2rem; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333;">
  <style>
    .api-header { background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); padding: 3rem 2rem; border-radius: 12px; color: white; margin-bottom: 2rem; text-align: center; }
    .api-header h1 { margin: 0; font-size: 2.5rem; font-weight: 700; }
    .section { margin: 2.5rem 0; }
    .section h2 { color: #f59e0b; font-size: 1.8rem; margin-bottom: 1rem; border-bottom: 2px solid #f59e0b; padding-bottom: 0.5rem; }
    .api-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1.5rem; margin: 1.5rem 0; }
    .api-card { background: #fffbeb; padding: 1.5rem; border-radius: 8px; text-align: center; border: 2px solid #fde68a; }
    .api-card .icon { font-size: 2.5rem; margin-bottom: 0.5rem; }
    .api-card h3 { margin: 0.5rem 0; color: #d97706; }
    .feature-box { background: #fef3c7; padding: 1.5rem; border-radius: 8px; margin: 1rem 0; border-left: 4px solid #f59e0b; }
    .tech-badge { display: inline-block; background: #f59e0b; color: white; padding: 0.4rem 1rem; border-radius: 20px; margin: 0.3rem; font-size: 0.9rem; font-weight: 500; }
  </style>
  
  <div class="api-header">
    <h1>🔌 API Integration Project</h1>
    <p>Data visualization dashboard using multiple third-party APIs</p>
  </div>

  <div class="section">
    <h2>🌐 APIs Integrated</h2>
    <div class="api-grid">
      <div class="api-card">
        <div class="icon">🌤️</div>
        <h3>Weather API</h3>
        <p>Real-time weather data</p>
      </div>
      <div class="api-card">
        <div class="icon">📰</div>
        <h3>News API</h3>
        <p>Latest news articles</p>
      </div>
      <div class="api-card">
        <div class="icon">🗺️</div>
        <h3>Maps API</h3>
        <p>Geographic data</p>
      </div>
      <div class="api-card">
        <div class="icon">📊</div>
        <h3>Analytics API</h3>
        <p>Data analytics</p>
      </div>
    </div>
  </div>

  <div class="section">
    <h2>✨ Key Features</h2>
    <div class="feature-box">
      <h3 style="margin-top: 0; color: #d97706;">📥 Data Fetching & Caching</h3>
      <p>Efficient API calls with response caching to reduce load times</p>
    </div>
    <div class="feature-box">
      <h3 style="margin-top: 0; color: #d97706;">⚠️ Error Handling</h3>
      <p>Comprehensive error boundaries and fallback UI for failed requests</p>
    </div>
    <div class="feature-box">
      <h3 style="margin-top: 0; color: #d97706;">📈 Data Visualization</h3>
      <p>Interactive charts and graphs using Chart.js and D3.js</p>
    </div>
    <div class="feature-box">
      <h3 style="margin-top: 0; color: #d97706;">⚡ Real-time Updates</h3>
      <p>Live data refresh with WebSocket connections</p>
    </div>
  </div>

  <div class="section">
    <h2>🛠️ Implementation Details</h2>
    <ul style="list-style: none; padding: 0;">
      <li style="background: #fffbeb; padding: 1rem; margin: 0.8rem 0; border-radius: 8px; border-left: 4px solid #f59e0b;">✅ RESTful API calls with fetch and axios</li>
      <li style="background: #fffbeb; padding: 1rem; margin: 0.8rem 0; border-radius: 8px; border-left: 4px solid #f59e0b;">✅ Async/await patterns for clean asynchronous code</li>
      <li style="background: #fffbeb; padding: 1rem; margin: 0.8rem 0; border-radius: 8px; border-left: 4px solid #f59e0b;">✅ Error boundaries for graceful error handling</li>
      <li style="background: #fffbeb; padding: 1rem; margin: 0.8rem 0; border-radius: 8px; border-left: 4px solid #f59e0b;">✅ Loading states and skeleton screens</li>
      <li style="background: #fffbeb; padding: 1rem; margin: 0.8rem 0; border-radius: 8px; border-left: 4px solid #f59e0b;">✅ Data transformation and normalization</li>
    </ul>
  </div>

  <div class="section">
    <h2>🛠️ Tech Stack</h2>
    <div style="margin: 1rem 0;">
      <span class="tech-badge">React</span>
      <span class="tech-badge">TypeScript</span>
      <span class="tech-badge">Axios</span>
      <span class="tech-badge">Chart.js</span>
    </div>
  </div>
</div>`,
      tags: [tags.api, tags.react, tags.typescript],
    },
    {
      title: "Full Stack Application",
      slug: "full-stack-application",
      excerpt: "A complete full-stack application with frontend, backend, and database integration, demonstrating end-to-end development skills.",
      contentMarkdown: `<div style="max-width: 900px; margin: 0 auto; padding: 2rem; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333;">
  <style>
    .fullstack-header { background: linear-gradient(135deg, #06b6d4 0%, #0891b2 100%); padding: 3rem 2rem; border-radius: 12px; color: white; margin-bottom: 2rem; text-align: center; }
    .fullstack-header h1 { margin: 0; font-size: 2.5rem; font-weight: 700; }
    .section { margin: 2.5rem 0; }
    .section h2 { color: #06b6d4; font-size: 1.8rem; margin-bottom: 1rem; border-bottom: 2px solid #06b6d4; padding-bottom: 0.5rem; }
    .arch-diagram { background: #ecfeff; padding: 2rem; border-radius: 8px; margin: 1.5rem 0; }
    .arch-layer { background: white; padding: 1.5rem; margin: 1rem 0; border-radius: 8px; border-left: 4px solid #06b6d4; }
    .arch-layer h3 { margin-top: 0; color: #0891b2; }
    .feature-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1.5rem; margin: 1.5rem 0; }
    .feature-item { background: #ecfeff; padding: 1.5rem; border-radius: 8px; text-align: center; }
    .feature-item .icon { font-size: 2rem; margin-bottom: 0.5rem; }
    .process-step { background: #cffafe; padding: 1rem; margin: 0.8rem 0; border-radius: 8px; border-left: 4px solid #06b6d4; }
    .process-step::before { content: counter(step-counter); counter-increment: step-counter; background: #06b6d4; color: white; width: 2rem; height: 2rem; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; margin-right: 1rem; font-weight: bold; }
    .process-list { counter-reset: step-counter; list-style: none; padding: 0; }
    .tech-badge { display: inline-block; background: #06b6d4; color: white; padding: 0.4rem 1rem; border-radius: 20px; margin: 0.3rem; font-size: 0.9rem; font-weight: 500; }
  </style>
  
  <div class="fullstack-header">
    <h1>🚀 Full Stack Application</h1>
    <p>Complete end-to-end application development</p>
  </div>

  <div class="section">
    <h2>🏗️ Architecture</h2>
    <div class="arch-diagram">
      <div class="arch-layer">
        <h3>🎨 Frontend Layer</h3>
        <p>React with TypeScript - Modern UI with component-based architecture</p>
      </div>
      <div class="arch-layer">
        <h3>⚙️ Backend Layer</h3>
        <p>Node.js with Express - RESTful API server with middleware</p>
      </div>
      <div class="arch-layer">
        <h3>🗄️ Database Layer</h3>
        <p>PostgreSQL - Relational database with Prisma ORM</p>
      </div>
      <div class="arch-layer">
        <h3>🔐 Authentication</h3>
        <p>JWT tokens - Secure user authentication and authorization</p>
      </div>
    </div>
  </div>

  <div class="section">
    <h2>✨ Core Features</h2>
    <div class="feature-grid">
      <div class="feature-item">
        <div class="icon">🔐</div>
        <h3>Authentication</h3>
        <p>User login & registration</p>
      </div>
      <div class="feature-item">
        <div class="icon">📝</div>
        <h3>CRUD Operations</h3>
        <p>Create, read, update, delete</p>
      </div>
      <div class="feature-item">
        <div class="icon">📤</div>
        <h3>File Uploads</h3>
        <p>Image & document handling</p>
      </div>
      <div class="feature-item">
        <div class="icon">🔔</div>
        <h3>Notifications</h3>
        <p>Real-time updates</p>
      </div>
      <div class="feature-item">
        <div class="icon">👨‍💼</div>
        <h3>Admin Panel</h3>
        <p>Management dashboard</p>
      </div>
    </div>
  </div>

  <div class="section">
    <h2>📋 Development Process</h2>
    <ol class="process-list">
      <li class="process-step">Database schema design and migration setup</li>
      <li class="process-step">Backend API development with Express routes</li>
      <li class="process-step">Frontend implementation with React components</li>
      <li class="process-step">Integration testing and bug fixes</li>
      <li class="process-step">Deployment and production optimization</li>
    </ol>
  </div>

  <div class="section">
    <h2>🛠️ Key Technologies</h2>
    <div style="margin: 1rem 0;">
      <span class="tech-badge">React</span>
      <span class="tech-badge">Node.js</span>
      <span class="tech-badge">PostgreSQL</span>
      <span class="tech-badge">TypeScript</span>
      <span class="tech-badge">Express</span>
      <span class="tech-badge">JWT</span>
    </div>
  </div>
</div>`,
      tags: [tags.fullstack, tags.react, tags.nodejs, tags.database, tags.typescript],
    },
  ];

  // Create projects
  console.log("📝 Creating projects...");
  for (const project of projects) {
    // contentMarkdown already contains HTML, use it directly as contentHtml
    const contentHtml = project.contentMarkdown; // Already HTML, not markdown
    const publishedAt = new Date();
    publishedAt.setDate(publishedAt.getDate() - Math.floor(Math.random() * 30));
    
    // Calculate reading time from HTML text content (strip tags)
    const textContent = contentHtml.replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();
    const readingTimeMin = Math.ceil(textContent.split(/\s+/).length / 200);

    const post = await prisma.post.upsert({
      where: { slug: project.slug },
      update: {
        title: project.title,
        excerpt: project.excerpt,
        contentMarkdown: "", // Projects use HTML only
        contentHtml: contentHtml,
        status: "PUBLISHED",
        publishedAt: publishedAt,
        categoryId: projectsCategory.id,
        readingTimeMin: readingTimeMin,
      },
      create: {
        title: project.title,
        slug: project.slug,
        excerpt: project.excerpt,
        contentMarkdown: "", // Projects use HTML only
        contentHtml: contentHtml,
        status: "PUBLISHED",
        publishedAt: publishedAt,
        categoryId: projectsCategory.id,
        readingTimeMin: readingTimeMin,
      },
    });

    // Link tags
    for (const tag of project.tags) {
      await prisma.postTag.upsert({
        where: {
          postId_tagId: {
            postId: post.id,
            tagId: tag.id,
          },
        },
        update: {},
        create: {
          postId: post.id,
          tagId: tag.id,
        },
      });
    }

    console.log(`  ✅ Created project: ${project.title}`);
  }

  // Create assignments
  console.log("📝 Creating assignments...");
  for (const assignment of assignments) {
    // contentMarkdown already contains HTML, use it directly as contentHtml
    const contentHtml = assignment.contentMarkdown; // Already HTML, not markdown
    const publishedAt = new Date();
    publishedAt.setDate(publishedAt.getDate() - Math.floor(Math.random() * 30));
    
    // Calculate reading time from HTML text content (strip tags)
    const textContent = contentHtml.replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();
    const readingTimeMin = Math.ceil(textContent.split(/\s+/).length / 200);

    const post = await prisma.post.upsert({
      where: { slug: assignment.slug },
      update: {
        title: assignment.title,
        excerpt: assignment.excerpt,
        contentMarkdown: "", // Assignments use HTML only
        contentHtml: contentHtml,
        status: "PUBLISHED",
        publishedAt: publishedAt,
        categoryId: assignmentsCategory.id,
        readingTimeMin: readingTimeMin,
      },
      create: {
        title: assignment.title,
        slug: assignment.slug,
        excerpt: assignment.excerpt,
        contentMarkdown: "", // Assignments use HTML only
        contentHtml: contentHtml,
        status: "PUBLISHED",
        publishedAt: publishedAt,
        categoryId: assignmentsCategory.id,
        readingTimeMin: readingTimeMin,
      },
    });

    // Link tags
    for (const tag of assignment.tags) {
      await prisma.postTag.upsert({
        where: {
          postId_tagId: {
            postId: post.id,
            tagId: tag.id,
          },
        },
        update: {},
        create: {
          postId: post.id,
          tagId: tag.id,
        },
      });
    }

    console.log(`  ✅ Created assignment: ${assignment.title}`);
  }

  // Sample Vlogs – map to Kivy Studio sample projects
  const vlogs = [
    {
      title: "2048 Puzzle – Kivy Studio Sample Vlog",
      slug: "vlog-2048-sample",
      excerpt:
        "Video walkthrough of the 2048 puzzle sample project in Kivy Studio, covering grid layouts, tile movement, and game logic.",
      sampleSlug: "2048",
    },
    {
      title: "Calculator App – Kivy Studio Sample Vlog",
      slug: "vlog-calculator-sample",
      excerpt:
        "Step-by-step vlog explaining the Calculator sample in Kivy Studio: button handling, layout design, and state management.",
      sampleSlug: "calculator",
    },
    {
      title: "Digital Clock – Kivy Studio Sample Vlog",
      slug: "vlog-clock-sample",
      excerpt:
        "Learn how the Digital Clock sample works in Kivy Studio, including real-time updates, fonts, and timing logic.",
      sampleSlug: "clock",
    },
    {
      title: "Drawing App – Kivy Studio Sample Vlog",
      slug: "vlog-drawingapp-sample",
      excerpt:
        "Vlog walkthrough of the Drawing App Kivy Studio sample, focusing on touch input, brush tools, and saving drawings.",
      sampleSlug: "drawingapp",
    },
    {
      title: "Gradient Demo – Kivy Studio Sample Vlog",
      slug: "vlog-gradientdemo-sample",
      excerpt:
        "A vlog demonstrating the Gradient Demo Kivy Studio sample, showing custom backgrounds, color transitions, and visual polish.",
      sampleSlug: "gradientdemo",
    },
    {
      title: "KivyBird Game – Kivy Studio Sample Vlog",
      slug: "vlog-kivybird-sample",
      excerpt:
        "Flappy Bird-style KivyBird sample explained: sprites, collision detection, and basic game loops in Kivy Studio.",
      sampleSlug: "kivybird",
    },
    {
      title: "Space Game – Kivy Studio Sample Vlog",
      slug: "vlog-spacegame-sample",
      excerpt:
        "An arcade-style space game vlog explaining movement, shooting mechanics, and basic game physics using Kivy.",
      sampleSlug: "spacegame",
    },
    {
      title: "AdMob Integration – Kivy Studio Sample Vlog",
      slug: "vlog-admob-sample",
      excerpt:
        "Learn how to integrate AdMob ads in Kivy apps through this Kivy Studio sample vlog, covering banner and interstitial ads.",
      sampleSlug: "admob",
    },
    {
      title: "TensorFlow Lite Object Detection – Kivy Studio Sample Vlog",
      slug: "vlog-c4k-tflite-sample",
      excerpt:
        "Hands-on vlog with the Camera4Kivy + TensorFlow Lite object detection sample running inside Kivy Studio.",
      sampleSlug: "c4k-tflite",
    },
    {
      title: "TensorFlow Lite Example (Camera4Kivy) – Kivy Studio Sample Vlog",
      slug: "vlog-c4k-tflite-example-sample",
      excerpt:
        "A full TensorFlow Lite example project vlog using Camera4Kivy and Kivy Studio, perfect for learning ML on Android with Python.",
      sampleSlug: "c4k-tflite-example",
    },
    {
      title: "QR Code Scanner – Kivy Studio Sample Vlog",
      slug: "vlog-c4k-qr-example-sample",
      excerpt:
        "Vlog walkthrough of the Camera4Kivy QR Code Scanner sample, teaching camera access and real-time frame processing in Kivy Studio.",
      sampleSlug: "c4k-qr-example",
    },
    {
      title: "Camera Photo App – Kivy Studio Sample Vlog",
      slug: "vlog-c4k-photo-sample",
      excerpt:
        "Vlog showing the Camera Photo App sample in Kivy Studio: capturing, saving, and navigating between screens in a mobile app.",
      sampleSlug: "c4k-photo",
    },
    {
      title: "Scanatomy – Kivy Studio Medical Imaging Sample Vlog",
      slug: "vlog-scanatomy-sample",
      excerpt:
        "A vlog walkthrough of Scanatomy, a complex medical imaging Kivy Studio sample demonstrating images, navigation, and interactivity.",
      sampleSlug: "scanatomy",
    },
    {
      title: "Map Sample – Kivy Studio Mapping Project Vlog",
      slug: "vlog-mapsample-sample",
      excerpt:
        "Vlog covering the Map Sample Kivy Studio project, showing maps integration, location-based content, and HTML views inside Kivy apps.",
      sampleSlug: "mapsample",
    },
  ];
  
  // Create vlogs (for /category/vlogs listing, linking to /vlogs/[slug])
  console.log("🎥 Creating vlogs...");
  for (const vlog of vlogs) {
    const contentHtml = `<div style="max-width: 900px; margin: 0 auto; padding: 2rem; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.7; color: #111827;">
  <style>
    .vlog-header { background: linear-gradient(135deg, #7c3aed 0%, #4f46e5 50%, #0f172a 100%); padding: 2.5rem 2rem; border-radius: 18px; color: #e5e7eb; margin-bottom: 2rem; }
    .vlog-header h1 { margin: 0; font-size: 2.1rem; font-weight: 800; letter-spacing: -0.04em; }
    .vlog-header p { margin-top: 0.75rem; max-width: 640px; font-size: 0.98rem; opacity: 0.9; }
    .vlog-pill { display: inline-flex; align-items: center; gap: 0.35rem; padding: 0.35rem 0.85rem; border-radius: 999px; background: rgba(15,23,42,0.9); border: 1px solid rgba(196,181,253,0.6); font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.08em; color: #e5e7eb; margin-bottom: 0.9rem; }
    .vlog-section { margin: 2rem 0; }
    .vlog-section h2 { font-size: 1.35rem; margin-bottom: 0.6rem; color: #111827; border-bottom: 2px solid #7c3aed; display: inline-block; padding-bottom: 0.25rem; }
    .vlog-link { display: inline-flex; align-items: center; justify-content: center; padding: 0.55rem 1.2rem; border-radius: 999px; background: #7c3aed; color: white; font-weight: 600; font-size: 0.9rem; text-decoration: none; box-shadow: 0 10px 30px rgba(124,58,237,0.4); }
  </style>

  <div class="vlog-header">
    <div class="vlog-pill">🎥 Kivy Studio Sample Vlog</div>
    <h1>${vlog.title}</h1>
    <p>${vlog.excerpt}</p>
  </div>

  <div class="vlog-section">
    <h2>📺 Watch the Full Vlog</h2>
    <p>
      This blog entry is a companion to the full video vlog for this Kivy Studio sample project.
      Visit the dedicated vlog page to watch the video, see screenshots, and grab the downloadable
      project files.
    </p>
    <p style="margin-top: 1rem;">
      <a class="vlog-link" href="/vlogs/${vlog.sampleSlug}">Open Vlog Page for This Sample</a>
    </p>
  </div>
</div>`;

    const publishedAt = new Date();
    publishedAt.setDate(publishedAt.getDate() - Math.floor(Math.random() * 30));

    const textContent = contentHtml.replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();
    const readingTimeMin = Math.ceil(textContent.split(/\s+/).length / 200);

    await prisma.post.upsert({
      where: { slug: vlog.slug },
      update: {
        title: vlog.title,
        excerpt: vlog.excerpt,
        contentMarkdown: "",
        contentHtml,
        status: "PUBLISHED",
        publishedAt,
        categoryId: vlogsCategory.id,
        readingTimeMin,
      },
      create: {
        title: vlog.title,
        slug: vlog.slug,
        excerpt: vlog.excerpt,
        contentMarkdown: "",
        contentHtml,
        status: "PUBLISHED",
        publishedAt,
        categoryId: vlogsCategory.id,
        readingTimeMin,
      },
    });

    console.log(`  🎥 Created vlog entry: ${vlog.title}`);
  }

  console.log("🎉 Seed completed successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Error seeding database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

