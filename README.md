# Yadu's Dots

A fun connect-the-dots web app for Yadu, guided by Buddy the puppy mascot.

## Quick start

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

## Storybook

```bash
npm run storybook
```

Open [http://localhost:6006](http://localhost:6006)

## Build

```bash
npm run build
npm run preview
```

## Deploy to Vercel

1. Push this repo to GitHub
2. Sign in at [vercel.com](https://vercel.com) with your GitHub account
3. **Add New → Project** → import `yadus-dots`
4. Vercel auto-detects Vite. Confirm:
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
5. Click **Deploy** — share the URL (e.g. `https://yadus-dots.vercel.app`)

Every push to `main` auto-redeploys.

## Grown-up settings

Tap **Grown-up** (top-right) to toggle sound, Buddy, dot count (10 vs 20), calm mode, and reset the current puzzle.

## Tech stack

- React + TypeScript + Vite
- Tailwind CSS v4
- Framer Motion
- Storybook
