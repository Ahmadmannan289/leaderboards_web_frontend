"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { LoaderCircle, TriangleAlert } from "lucide-react";
import Hero from "@/components/Hero";
import SearchBar from "@/components/SearchBar";
import CategoryTabs from "@/components/CategoryTabs";
import LeaderboardTable from "@/components/LeaderboardTable";
import { fetchLeaderboardData } from "@/lib/api";
import type { CategoryKey, CategoryWithEntries } from "@/types/leaderboard";

type LoadState = "loading" | "ready" | "error";

export default function Home() {
  const [categories, setCategories] = useState<CategoryWithEntries[]>([]);
  const [activeKey, setActiveKey] = useState<CategoryKey | null>(null);
  const [query, setQuery] = useState("");
  const [loadState, setLoadState] = useState<LoadState>("loading");
  const [attempt, setAttempt] = useState(0);

  const retry = useCallback(() => {
    setLoadState("loading");
    setAttempt((n) => n + 1);
  }, []);

  useEffect(() => {
    let cancelled = false;

    fetchLeaderboardData()
      .then((data) => {
        if (cancelled) return;
        setCategories(data);
        setActiveKey((current) => current ?? data[0]?.key ?? null);
        setLoadState("ready");
      })
      .catch(() => {
        if (!cancelled) setLoadState("error");
      });

    return () => {
      cancelled = true;
    };
  }, [attempt]);

  const activeCategory = useMemo(
    () => categories.find((category) => category.key === activeKey) ?? null,
    [categories, activeKey],
  );

  const filteredEntries = useMemo(() => {
    if (!activeCategory) return [];
    const normalized = query.trim().toLowerCase();
    if (!normalized) return activeCategory.entries;
    return activeCategory.entries.filter(
      (entry) =>
        entry.model.toLowerCase().includes(normalized) ||
        entry.organization.toLowerCase().includes(normalized),
    );
  }, [activeCategory, query]);

  return (
    <main id="top" className="relative z-10 flex-1">
      <Hero />

      <section className="mx-auto max-w-6xl px-5 pb-10 sm:px-8">
        <SearchBar
          value={query}
          onChange={setQuery}
          resultCount={filteredEntries.length}
          totalCount={activeCategory?.entries.length ?? 0}
        />
      </section>

      {loadState === "error" ? (
        <section className="mx-auto max-w-6xl px-5 pb-24 sm:px-8">
          <div className="flex flex-col items-center gap-3 rounded-2xl border border-border bg-surface/60 px-5 py-16 text-center shadow-elevated">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-surface-elevated text-ember-400">
              <TriangleAlert className="h-5 w-5" strokeWidth={2} />
            </span>
            <p className="text-sm text-text-secondary">
              Couldn&apos;t reach the benchmark API. Is the backend running at{" "}
              <code className="font-mono text-text-primary">
                {process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000/api"}
              </code>
              ?
            </p>
            <button
              type="button"
              onClick={retry}
              className="mt-1 inline-flex h-9 items-center rounded-full bg-text-primary px-4 text-sm font-medium text-base transition-[transform,box-shadow] duration-200 hover:shadow-elevated active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember-400/60"
            >
              Retry
            </button>
          </div>
        </section>
      ) : !activeCategory ? (
        <section className="mx-auto max-w-6xl px-5 pb-24 sm:px-8">
          <div className="flex items-center justify-center gap-2.5 rounded-2xl border border-border bg-surface/60 px-5 py-16 text-text-muted shadow-elevated">
            <LoaderCircle className="h-4 w-4 animate-spin" strokeWidth={2} />
            <span className="text-sm">Loading benchmark data…</span>
          </div>
        </section>
      ) : (
        <>
          <section className="mx-auto max-w-6xl px-5 pb-6 sm:px-8">
            <CategoryTabs categories={categories} active={activeCategory.key} onSelect={setActiveKey} />
          </section>

          <section className="mx-auto max-w-6xl px-5 pb-24 sm:px-8">
            <LeaderboardTable category={activeCategory} entries={filteredEntries} />
          </section>
        </>
      )}

      <footer className="border-t border-border-subtle px-5 py-8 sm:px-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 text-xs text-text-muted sm:flex-row">
          <p>&copy; 2026 Signal. Benchmarks are illustrative and updated for demonstration.</p>
          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="transition-colors duration-200 hover:text-text-secondary"
          >
            View methodology on GitHub
          </a>
        </div>
      </footer>
    </main>
  );
}
