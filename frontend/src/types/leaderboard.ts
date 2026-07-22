export type License = "Open" | "Apache 2.0" | "MIT" | "Research Only" | "Proprietary";

export type ModelEntry = {
  rank: number;
  model: string;
  organization: string;
  score: number;
  accuracy: number;
  latency: number;
  license: License;
  parameters: string;
  lastUpdated: string;
};

export type CategoryKey = "tts" | "asr" | "mt";

export type CategoryMeta = {
  key: CategoryKey;
  label: string;
  shortLabel: string;
  description: string;
  accuracyLabel: string;
};

export type CategoryWithEntries = CategoryMeta & { entries: ModelEntry[] };
