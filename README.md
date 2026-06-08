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

## Deploy to Netlify

The repo is on GitHub. To get a shareable URL for family in India:

1. Create a free account at [netlify.com](https://www.netlify.com) (email, Google, or GitHub sign-up all work)
2. Click **Add new site → Import an existing project**
3. Choose **GitHub** and authorize Netlify
4. Select the **yadus-dots** repository
5. Netlify reads `netlify.toml` automatically. Confirm:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
6. Click **Deploy site**

Netlify assigns a URL like `https://yadus-dots.netlify.app`. Share that link — it works in any modern browser in India, no install needed.

Every push to `main` auto-redeploys.

### CLI alternative

```bash
npx netlify login
npx netlify init
npx netlify deploy --prod
```

## Grown-up settings

Tap **Grown-up** (top-right) to toggle sound, Buddy, dot count (10 vs 20), calm mode, and reset the current puzzle.

## Tech stack

- React + TypeScript + Vite
- Tailwind CSS v4
- Framer Motion
- Storybook
