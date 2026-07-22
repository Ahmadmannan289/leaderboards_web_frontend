# Signal — AI Benchmark Leaderboard

A one-page leaderboard for comparing AI models across three benchmark categories: **Text to Speech**, **Automatic Speech Recognition**, and **Machine Translation**. Built with Next.js, React, and Tailwind CSS. All data is mocked client-side — there is no backend or database.

## Requirements

- [Node.js](https://nodejs.org) 20 or later (includes `npm`)

Check what you have installed:

```bash
node -v
npm -v
```

If you don't have Node installed, download it from [nodejs.org](https://nodejs.org) (or on macOS, run `brew install node`).

## Running it locally

Clone the repo, install dependencies, and start the dev server:

```bash
git clone <your-repo-url>
cd leaderboard_webpage
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000) in your browser. The page hot-reloads as you edit files.

Other useful commands:

```bash
npm run build   # production build (also a good sanity check before deploying)
npm run start   # serve the production build locally, after `npm run build`
npm run lint    # run ESLint
```

## Project structure

```
src/
  app/
    layout.tsx      # fonts, global <head>, page shell
    page.tsx         # assembles the page, holds search + category state
    globals.css      # theme tokens (colors, fonts, shadows) and global styles
  components/
    Navbar.tsx
    Hero.tsx
    SearchBar.tsx
    CategoryTabs.tsx        # the three TTS / ASR / MT buttons
    LeaderboardTable.tsx
  data/
    leaderboard-data.ts     # mock model data for all three categories — edit this to change the data
```

To change what's on the leaderboard, edit the arrays in `src/data/leaderboard-data.ts` — no other file needs to change.

## Deploying to Vercel

The easiest path (no command line needed after this):

1. Push this repo to GitHub (see below if you haven't done that yet).
2. Go to [vercel.com/new](https://vercel.com/new) and sign in with your GitHub account.
3. Select this repository and click **Deploy**. Vercel auto-detects Next.js, so the default settings work as-is.
4. Every future push to your main branch redeploys automatically.

Alternatively, from the command line:

```bash
npx vercel
```

and follow the prompts (first run will ask you to log in and link the project).

## Pushing to GitHub (if you're new to this)

```bash
git init                                  # only if this folder isn't already a git repo
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin <your-empty-github-repo-url>
git push -u origin main
```

`.gitignore` already excludes the things you shouldn't commit — `node_modules/`, the `.next/` build output, and local env files. You never need to add those manually.
