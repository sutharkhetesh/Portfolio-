# Frontend Portfolio

A modern Next.js App Router portfolio for a frontend developer specializing in React, Next.js, TypeScript, and ERP product interfaces.

## Setup

Install Node.js 20+ and npm, then run:

```bash
npm install
npm run dev
```

Open `http://localhost:3000` in a browser.

## Contact Form Database

The contact form stores submissions in Supabase PostgreSQL through a server-only API route. Copy `.env.example` to `.env.local` and set `DATABASE_URL` to your rotated Supabase connection string. Never expose this value with a `NEXT_PUBLIC_` prefix or commit `.env.local`.

The Prisma model is defined in `prisma/schema.prisma`. Run `npm run db:push` to sync it to Supabase and `npm run db:generate` after changing the model. The contact form writes submissions through Prisma, and `/api/database-check` checks database connectivity. Restart the dev server after changing environment variables.

Prisma Client uses the schema in `prisma/schema.prisma`. Regenerate it after changing the schema:

```bash
npx prisma generate
```

The contact form writes submissions with Prisma to `contact_messages`; check the connection at `/api/database-check` while the app is running. Apply `supabase/schema.sql` once in the Supabase SQL Editor to create the table. The portfolio content remains in `data/portfolio.ts`.

## Customization

Update `data/portfolio.ts` to change your name, links, experience, skills, and project details. Replace all bracketed placeholder values before publishing.

## Checks

```bash
npm run lint
npm run build
```

# Portfolio-
