import { AudioLines, Languages, Mic, type LucideIcon } from "lucide-react";
import type { CategoryKey } from "@/types/leaderboard";

export type Accent = "violet" | "teal" | "ember";

export const CATEGORY_PRESENTATION: Record<CategoryKey, { icon: LucideIcon; accent: Accent }> = {
  tts: { icon: AudioLines, accent: "violet" },
  asr: { icon: Mic, accent: "teal" },
  mt: { icon: Languages, accent: "ember" },
};
