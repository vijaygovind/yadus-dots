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

## GitHub

Source repo: [github.com/vijaygovind/yadus-dots](https://github.com/vijaygovind/yadus-dots)

## Deploy to Vercel

The repo is on GitHub. To get a shareable URL for family in India:

1. Sign in at [vercel.com](https://vercel.com) with your **GitHub account** (same account: `vijaygovind`)
2. Click **Add New → Project**
3. Import **yadus-dots** from your GitHub repos
4. Confirm settings (Vercel auto-detects Vite):
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
   - **Install Command:** `npm install`
5. Click **Deploy**

Vercel will assign a URL like `https://yadus-dots.vercel.app`. Share that link — it works in any modern browser, no install needed.

Every push to `main` auto-redeploys.

### CLI alternative

```bash
npx vercel login
npx vercel --prod
```

## Grown-up settings

Tap **Grown-up** (top-right) to toggle sound, Buddy, dot count (10 vs 20), calm mode, and reset the current puzzle.

## Tech stack

- React + TypeScript + Vite
- Tailwind CSS v4
- Framer Motion
- Storybook
