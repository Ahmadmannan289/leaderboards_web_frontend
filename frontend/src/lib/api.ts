import type { CategoryMeta, CategoryWithEntries, ModelEntry } from "@/types/leaderboard";

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000/api";

async function getJSON<T>(path: string): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`);
  if (!res.ok) {
    throw new Error(`Request to ${path} failed with status ${res.status}`);
  }
  return res.json();
}

export async function fetchLeaderboardData(): Promise<CategoryWithEntries[]> {
  const [categories, results] = await Promise.all([
    getJSON<CategoryMeta[]>("/categories"),
    getJSON<Record<string, ModelEntry[]>>("/leaderboard"),
  ]);

  return categories.map((category) => ({
    ...category,
    entries: results[category.key] ?? [],
  }));
}
