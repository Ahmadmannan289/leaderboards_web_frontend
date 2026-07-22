# Signal — AI Benchmark Leaderboard

A leaderboard for comparing AI models across three benchmark categories: **Text to Speech**, **Automatic Speech Recognition**, and **Machine Translation**.

The project has two parts:

- **`frontend/`** — a Next.js/React app that renders the page and fetches leaderboard data over HTTP.
- **`backend/`** — a small Flask API that reads `data/benchmark_results.json` and serves it as JSON.

```
leaderboard_webpage/
├── frontend/           # Next.js app (React, Tailwind)
├── backend/            # Flask API
│   ├── app.py
│   ├── api/            # route handlers
│   └── database/       # data-access layer (currently reads the JSON file)
├── data/
│   └── benchmark_results.json   # the actual leaderboard data — edit this to update results
└── docker-compose.yml
```

## Requirements

- [Node.js](https://nodejs.org) 20+ (`node -v`, `npm -v`)
- [Python](https://python.org) 3.10+ (`python3 -V`)
- Optionally, [Docker](https://docker.com) if you'd rather run both services with one command.

## Running it locally (two terminals)

**Terminal 1 — backend:**

```bash
cd backend
python3 -m venv venv
source venv/bin/activate      # Windows: venv\Scripts\activate
pip install -r requirements.txt
python app.py
```

The API is now running at [http://localhost:8000](http://localhost:8000). Check it with:

```bash
curl http://localhost:8000/api/health
```

**Terminal 2 — frontend:**

```bash
cd frontend
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). By default the frontend talks to `http://localhost:8000/api`; to point it somewhere else, copy `frontend/.env.example` to `frontend/.env.local` and change `NEXT_PUBLIC_API_URL`.

## Running it with Docker Compose (one command)

```bash
docker compose up --build
```

This builds and starts both services — frontend on `:3000`, backend on `:8000` — wired together automatically.

## Updating the leaderboard data

Edit `data/benchmark_results.json`. It has two top-level keys:

- `categories` — the three category cards (label, description, etc.)
- `results` — an array of model entries per category (`tts`, `asr`, `mt`), each shaped like:

```json
{
  "rank": 1,
  "model": "Sonic Turbo v3",
  "organization": "Cartesia",
  "score": 96.8,
  "accuracy": 98.1,
  "latency": 82,
  "license": "Proprietary",
  "parameters": "1.2B",
  "lastUpdated": "2026-07-01"
}
```

The backend re-reads this file on every request, so changes show up on a page refresh — no restart needed. The frontend never needs to change when you add, remove, or edit models.

## Useful commands

```bash
# frontend/
npm run dev     # start the dev server
npm run build   # production build (good sanity check before deploying)
npm run start   # serve the production build, after npm run build
npm run lint    # run ESLint

# backend/ (with venv activated)
python app.py   # start the API (defaults to port 8000, override with PORT=...)
```

## Deploying

**Backend:** deploy `backend/` to any Python host (Render, Railway, Fly.io, a VPS, etc.) as a standard Flask app. Make sure `data/benchmark_results.json` is available to it — either deployed alongside it, or point the `DATA_FILE` env var at wherever you host it.

**Frontend on Vercel:**

1. Push this repo to GitHub (see below if you haven't done that yet).
2. Go to [vercel.com/new](https://vercel.com/new), sign in with GitHub, and import this repository.
3. Because the Next.js app lives in `frontend/`, set **Root Directory** to `frontend` in the project's settings (Vercel asks for this during import).
4. Add an environment variable `NEXT_PUBLIC_API_URL` pointing at your deployed backend's URL (e.g. `https://your-backend.onrender.com/api`).
5. Click **Deploy**. Every future push to your main branch redeploys automatically.

## Pushing to GitHub (if you're new to this)

```bash
git init                                  # only if this folder isn't already a git repo
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin <your-empty-github-repo-url>
git push -u origin main
```

`.gitignore` already excludes what you shouldn't commit — `frontend/node_modules/`, `frontend/.next/`, the Python `backend/venv/`, and local env files. You never need to add those manually.
