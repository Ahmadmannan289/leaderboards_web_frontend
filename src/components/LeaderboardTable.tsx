"use client";

import { SearchX } from "lucide-react";
import type { Category, License, ModelEntry } from "@/data/leaderboard-data";

const ACCENT_BAR = {
  violet: "bg-gradient-to-r from-violet-500 to-violet-300",
  teal: "bg-gradient-to-r from-teal-500 to-teal-300",
  ember: "bg-gradient-to-r from-ember-500 to-ember-300",
} as const;

const ACCENT_TEXT = {
  violet: "text-violet-300",
  teal: "text-teal-300",
  ember: "text-ember-300",
} as const;

const LICENSE_STYLES: Record<License, string> = {
  Open: "border-positive/30 bg-positive/10 text-positive",
  MIT: "border-positive/30 bg-positive/10 text-positive",
  "Apache 2.0": "border-positive/30 bg-positive/10 text-positive",
  "Research Only": "border-violet-400/30 bg-violet-400/10 text-violet-300",
  Proprietary: "border-border text-text-secondary",
};

const MEDAL_STYLES: Record<number, string> = {
  1: "bg-gradient-to-br from-gold to-[#e0a52c] text-base",
  2: "bg-gradient-to-br from-silver to-[#a3a8b0] text-base",
  3: "bg-gradient-to-br from-bronze to-[#b96f45] text-base",
};

function RankBadge({ rank }: { rank: number }) {
  if (rank <= 3) {
    return (
      <span
        className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold shadow-elevated ${MEDAL_STYLES[rank]}`}
      >
        {rank}
      </span>
    );
  }
  return (
    <span className="flex h-7 w-7 items-center justify-center font-mono text-sm tabular-num text-text-muted">
      {rank}
    </span>
  );
}

function OrgAvatar({ organization }: { organization: string }) {
  const initial = organization.charAt(0);
  return (
    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-border-subtle bg-surface-elevated text-[0.65rem] font-semibold text-text-secondary">
      {initial}
    </span>
  );
}

function formatDate(iso: string) {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}

type LeaderboardTableProps = {
  category: Category;
  entries: ModelEntry[];
};

export default function LeaderboardTable({ category, entries }: LeaderboardTableProps) {
  const maxScore = Math.max(...category.entries.map((e) => e.score));

  return (
    <div className="animate-fade-up relative overflow-hidden rounded-2xl border border-border bg-surface/60 shadow-elevated">
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-surface to-transparent lg:hidden" />
      <div className="no-scrollbar overflow-x-auto">
        <table className="w-full min-w-[880px] border-collapse text-left">
          <thead>
            <tr className="border-b border-border-subtle">
              <th className="w-14 px-5 py-3.5 text-xs font-medium uppercase tracking-wide text-text-muted">
                Rank
              </th>
              <th className="px-3 py-3.5 text-xs font-medium uppercase tracking-wide text-text-muted">
                Model
              </th>
              <th className="px-3 py-3.5 text-xs font-medium uppercase tracking-wide text-text-muted">
                Organization
              </th>
              <th className="px-3 py-3.5 text-xs font-medium uppercase tracking-wide text-text-muted">
                Score
              </th>
              <th className="px-3 py-3.5 text-xs font-medium uppercase tracking-wide text-text-muted">
                {category.accuracyLabel}
              </th>
              <th className="px-3 py-3.5 text-xs font-medium uppercase tracking-wide text-text-muted">
                Latency
              </th>
              <th className="px-3 py-3.5 text-xs font-medium uppercase tracking-wide text-text-muted">
                License
              </th>
              <th className="px-3 py-3.5 text-xs font-medium uppercase tracking-wide text-text-muted">
                Parameters
              </th>
              <th className="px-5 py-3.5 text-xs font-medium uppercase tracking-wide text-text-muted">
                Last Updated
              </th>
            </tr>
          </thead>
          <tbody>
            {entries.map((entry) => (
              <tr
                key={`${category.key}-${entry.model}`}
                className="group border-b border-border-subtle transition-colors duration-150 last:border-b-0 hover:bg-surface-elevated/70"
              >
                <td className="px-5 py-3.5">
                  <RankBadge rank={entry.rank} />
                </td>
                <td className="px-3 py-3.5">
                  <span className="font-medium text-text-primary">{entry.model}</span>
                </td>
                <td className="px-3 py-3.5">
                  <span className="flex items-center gap-2 text-text-secondary">
                    <OrgAvatar organization={entry.organization} />
                    {entry.organization}
                  </span>
                </td>
                <td className="px-3 py-3.5">
                  <div className="flex flex-col gap-1.5">
                    <span
                      className={`font-mono text-sm font-medium tabular-num ${ACCENT_TEXT[category.accent]}`}
                    >
                      {entry.score.toFixed(1)}
                    </span>
                    <span className="h-1 w-16 overflow-hidden rounded-full bg-surface-elevated">
                      <span
                        className={`block h-full rounded-full ${ACCENT_BAR[category.accent]}`}
                        style={{ width: `${(entry.score / maxScore) * 100}%` }}
                      />
                    </span>
                  </div>
                </td>
                <td className="px-3 py-3.5 font-mono text-sm tabular-num text-text-secondary">
                  {entry.accuracy.toFixed(1)}%
                </td>
                <td className="px-3 py-3.5 font-mono text-sm tabular-num text-text-secondary">
                  {entry.latency} ms
                </td>
                <td className="px-3 py-3.5">
                  <span
                    className={`inline-flex items-center rounded-full border px-2.5 py-1 text-[0.7rem] font-medium ${LICENSE_STYLES[entry.license]}`}
                  >
                    {entry.license}
                  </span>
                </td>
                <td className="px-3 py-3.5 font-mono text-sm tabular-num text-text-secondary">
                  {entry.parameters}
                </td>
                <td className="px-5 py-3.5 text-sm text-text-muted">
                  {formatDate(entry.lastUpdated)}
                </td>
              </tr>
            ))}

            {entries.length === 0 ? (
              <tr>
                <td colSpan={9} className="px-5 py-16">
                  <div className="flex flex-col items-center gap-3 text-center">
                    <span className="flex h-11 w-11 items-center justify-center rounded-full bg-surface-elevated text-text-muted">
                      <SearchX className="h-5 w-5" strokeWidth={2} />
                    </span>
                    <p className="text-sm text-text-secondary">
                      No models match your search in {category.label}.
                    </p>
                  </div>
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </div>
  );
}
