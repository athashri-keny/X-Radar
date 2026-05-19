# X-Radar Architecture

## What it does
AI-powered Twitter lead generation SaaS for freelancers.
Users enter a niche → get scored leads from Twitter.

## Tech Stack
- Frontend: Next.js, TypeScript, Tailwind, Framer Motion
- Backend: Next.js API routes, Node.js
- DB: MongoDB + Mongoose
- AI: LangGraph + GPT-4o-mini
- Scraper: Apify
- Queue: QStash
- Email: Resend
- Payments: DodoPayments
- Deploy: Vercel

## Core Flow
1. User enters niche → /api/search triggered
2. Apify scrapes tweets → returns run ID immediately (fire-and-poll)
3. Frontend polls /api/poll every 3s using run ID
4. Raw tweets → filtered (remove mocks, empty fields, strip unused fields)
5. Filtered tweets → LangGraph → GPT-4o-mini scores each lead 1-10
6. Scored leads → stored in MongoDB (6hr TTL)
7. QStash sends email notification via Resend

## Free vs Pro Differences
- Free: tweets from 7 days ago to 2 days ago
- Pro: within_time:24h (latest tweets)

