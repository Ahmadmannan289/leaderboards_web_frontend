"use client";

import { useMemo, useState } from "react";
import Hero from "@/components/Hero";
import SearchBar from "@/components/SearchBar";
import CategoryTabs from "@/components/CategoryTabs";
import LeaderboardTable from "@/components/LeaderboardTable";
import { categories, type CategoryKey } from "@/data/leaderboard-data";

export default function Home() {
  const [activeKey, setActiveKey] = useState<CategoryKey>("tts");
  const [query, setQuery] = useState("");

  const activeCategory = useMemo(
    () => categories.find((category) => category.key === activeKey)!,
    [activeKey],
  );

  const filteredEntries = useMemo(() => {
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
          totalCount={activeCategory.entries.length}
        />
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-6 sm:px-8">
        <CategoryTabs categories={categories} active={activeKey} onSelect={setActiveKey} />
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-24 sm:px-8">
        <LeaderboardTable category={activeCategory} entries={filteredEntries} />
      </section>

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
