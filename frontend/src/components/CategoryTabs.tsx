"use client";

import { CATEGORY_PRESENTATION } from "@/lib/category-presentation";
import type { CategoryKey, CategoryMeta } from "@/types/leaderboard";

const ACCENT_STYLES = {
  violet: {
    active:
      "border-violet-500/50 bg-gradient-to-b from-violet-500/12 to-violet-500/[0.03] shadow-violet-glow",
    iconActive: "bg-gradient-to-br from-violet-400 to-violet-600 text-base",
    iconInactive: "bg-surface-elevated text-violet-300 group-hover:text-violet-300",
    ring: "focus-visible:ring-violet-400/60",
  },
  teal: {
    active:
      "border-teal-500/50 bg-gradient-to-b from-teal-500/12 to-teal-500/[0.03] shadow-teal-glow",
    iconActive: "bg-gradient-to-br from-teal-400 to-teal-600 text-base",
    iconInactive: "bg-surface-elevated text-teal-300 group-hover:text-teal-300",
    ring: "focus-visible:ring-teal-400/60",
  },
  ember: {
    active:
      "border-ember-500/50 bg-gradient-to-b from-ember-500/12 to-ember-500/[0.03] shadow-ember-glow",
    iconActive: "bg-gradient-to-br from-ember-400 to-ember-600 text-base",
    iconInactive: "bg-surface-elevated text-ember-300 group-hover:text-ember-300",
    ring: "focus-visible:ring-ember-400/60",
  },
} as const;

type CategoryTabsProps = {
  categories: CategoryMeta[];
  active: CategoryKey;
  onSelect: (key: CategoryKey) => void;
};

export default function CategoryTabs({ categories, active, onSelect }: CategoryTabsProps) {
  return (
    <div
      role="tablist"
      aria-label="Benchmark category"
      className="animate-fade-up mx-auto grid max-w-4xl grid-cols-1 gap-3 sm:grid-cols-3"
      style={{ animationDelay: "300ms" }}
    >
      {categories.map((category) => {
        const { icon: Icon, accent } = CATEGORY_PRESENTATION[category.key];
        const isActive = category.key === active;
        const styles = ACCENT_STYLES[accent];

        return (
          <button
            key={category.key}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onSelect(category.key)}
            className={`group relative flex items-center gap-3.5 rounded-2xl border px-4 py-4 text-left transition-[transform,box-shadow,border-color,background-color] duration-300 focus-visible:outline-none focus-visible:ring-2 ${styles.ring} active:scale-[0.98] ${
              isActive
                ? `${styles.active} translate-y-[-1px]`
                : "border-border-subtle bg-surface/50 hover:border-border hover:bg-surface"
            }`}
          >
            <span
              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-colors duration-300 ${
                isActive ? styles.iconActive : styles.iconInactive
              }`}
            >
              <Icon className="h-5 w-5" strokeWidth={2} />
            </span>
            <span className="min-w-0">
              <span className="block font-display text-[0.95rem] font-semibold tracking-[-0.01em] text-text-primary">
                {category.label}
              </span>
              <span className="mt-0.5 block text-xs leading-snug text-text-muted">
                {category.description}
              </span>
            </span>
          </button>
        );
      })}
    </div>
  );
}
