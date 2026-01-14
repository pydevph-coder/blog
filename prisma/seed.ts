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
  };

  console.log("✅ Tags created/updated");

  // Default ad servers
  const defaultServers = [
    "https://otieu.com/4/10326113",
    "https://otieu.com/4/10327806",
    "https://otieu.com/4/10326128",
    "https://otieu.com/4/10327851",
    "https://www.effectivegatecpm.com/a90jv3etre?key=e644e762868a63ddcf4939b61cd20d9b",
    "https://www.effectivegatecpm.com/drbexi54g?key=f7f515b2ca2ab9bee1c1b469367de2a0",
    "https://www.effectivegatecpm.com/z04nrvaw?key=39c23a972c317985c075edee44d76833",
  ];

  console.log("🌐 Creating default ad servers...");
  for (const url of defaultServers) {
    // Skip commented-out URLs if any are left as comments in the array
    if (!url || url.trim().startsWith("#")) continue;

    await prisma.server.upsert({
      where: { url },
      update: {},
      create: { url },
    });
    console.log(`  ✅ Server: ${url}`);
  }

  // Sample Projects
  const projects = [
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

