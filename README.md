# Smart Bookmark App

A real-time bookmark manager built using Next.js, Supabase, and Tailwind CSS.

## Features
- Google OAuth login
- Private bookmarks per user
- Real-time updates across tabs
- Add & delete bookmarks
- Secure row-level security (RLS)
- Deployed on Vercel

## Tech Stack
- Next.js (App Router)
- Supabase (Auth, Database, Realtime)
- Tailwind CSS
- Vercel Deployment

## Setup Instructions
1. Clone repo
2. Add environment variables:
   NEXT_PUBLIC_SUPABASE_URL
   NEXT_PUBLIC_SUPABASE_ANON_KEY
3. Run `npm install`
4. Run `npm run dev`

## Database Security
Row Level Security ensures users only access their own bookmarks.

## Challenges Faced
- OAuth redirect issues in production
- Session persistence after login
- TypeScript type errors during deployment

## Solutions
- Configured Supabase redirect URLs
- Handled auth state properly in dashboard
- Added type definitions to fix build errors

## Live Demo
https://smart-bookmark-gamma.vercel.app
