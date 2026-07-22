"use client";

import { Search, X } from "lucide-react";

type SearchBarProps = {
  value: string;
  onChange: (value: string) => void;
  resultCount: number;
  totalCount: number;
};

export default function SearchBar({ value, onChange, resultCount, totalCount }: SearchBarProps) {
  return (
    <div
      className="animate-fade-up mx-auto flex h-14 max-w-2xl items-center gap-3 rounded-2xl border border-border bg-surface/70 px-5 shadow-elevated backdrop-blur-sm transition-[border-color,box-shadow] duration-300 focus-within:border-ember-500/50 focus-within:shadow-ember-glow"
      style={{ animationDelay: "220ms" }}
    >
      <Search className="h-4.5 w-4.5 shrink-0 text-text-muted" strokeWidth={2} />
      <input
        type="text"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Search by model or organization…"
        className="h-full w-full bg-transparent text-[0.95rem] text-text-primary placeholder:text-text-muted focus:outline-none"
      />
      {value ? (
        <button
          type="button"
          onClick={() => onChange("")}
          aria-label="Clear search"
          className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-text-muted transition-colors duration-200 hover:bg-surface-elevated hover:text-text-primary"
        >
          <X className="h-3.5 w-3.5" strokeWidth={2} />
        </button>
      ) : null}
      <span className="hidden shrink-0 whitespace-nowrap font-mono text-xs tabular-num text-text-muted sm:inline">
        {resultCount} / {totalCount}
      </span>
    </div>
  );
}
