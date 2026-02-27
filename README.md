This is a modern Next.js blog (App Router + TypeScript + Tailwind) with Prisma + PostgreSQL, SEO (metadata, robots, sitemap, RSS), a contact API (Gmail), and a minimal admin publishing flow.

## Local setup

1) Copy `.env.example` to `.env.local` and fill values. Required:
- DATABASE_URL
- NEXT_PUBLIC_SITE_URL, NEXT_PUBLIC_SITE_NAME
- GMAIL_USER, GMAIL_APP_PASSWORD, CONTACT_TO_EMAIL
- ADMIN_CREATE_TOKEN

2) Generate Prisma client and run dev:
```bash
cd F:\MYFILES\Blog\web; Get-Content prisma\create_blog_tables.sql | npx prisma db execute --stdin --schema prisma\schema.prisma
npx prisma generate
npx prisma migrate dev --name init
npx prisma db push --accept-data-loss
npm run dev
```

## Data model
- Post, Category, Tag with SEO fields and relations (see `prisma/schema.prisma`).

## Core routes
- `/` latest posts
- `/post/[slug]` post page (markdown rendered to HTML)
- `/category/[slug]`, `/tag/[slug]`
- `/contact` form → `/api/contact` (Gmail)
- `/sitemap.xml`, `/robots.txt`, `/rss.xml`

## Admin access & publishing
- Set `ADMIN_PASSWORD` in `.env.local` and in Vercel envs.
- Visit `/admin/login` to sign in. This sets a secure cookie.
- Admin area:
  - `/admin` dashboard
  - `/admin/new-post` create post
  - `/admin/logout` sign out

## Deploy on Vercel
1) Push this folder to GitHub. Create a Vercel project selecting `web/` as root.
2) Set Environment Variables in Vercel (same as `.env.local`).
3) Add Vercel Postgres and paste the connection `DATABASE_URL`.
4) After first deploy, run Prisma migrations locally or via CI, then redeploy.
