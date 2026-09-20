import { ChapterSummary } from "../bibleChapterSummaries";
import { OT_LAW_SUMMARIES } from "./otLaw";
import { OT_HISTORY_SUMMARIES } from "./otHistory";
import { OT_POETRY_SUMMARIES } from "./otPoetry";
import { OT_PROPHETS_SUMMARIES } from "./otProphets";
import { NT_GOSPELS_ACTS_SUMMARIES } from "./ntGospelsActs";
import { NT_EPISTLES_REV_SUMMARIES } from "./ntEpistlesRev";

/**
 * Complete, verified canonical chapter summaries for all 1,189 chapters of the 66 books of the Holy Bible.
 * Ensures 100% offline availability with 0ms lookup.
 */
export const ALL_CANONICAL_CHAPTER_SUMMARIES: Record<string, ChapterSummary> = {
  ...OT_LAW_SUMMARIES,
  ...OT_HISTORY_SUMMARIES,
  ...OT_POETRY_SUMMARIES,
  ...OT_PROPHETS_SUMMARIES,
  ...NT_GOSPELS_ACTS_SUMMARIES,
  ...NT_EPISTLES_REV_SUMMARIES
};

export function getCanonicalChapterSummary(book: string, chapter: number): ChapterSummary | null {
  const cleanBook = (book || "").trim();
  const key = `${cleanBook}_${chapter}`;
  const compactKey = `${cleanBook.replace(/\s+/g, "")}_${chapter}`;
  const underscoredKey = `${cleanBook.replace(/\s+/g, "_")}_${chapter}`;

  return (
    ALL_CANONICAL_CHAPTER_SUMMARIES[key] ||
    ALL_CANONICAL_CHAPTER_SUMMARIES[compactKey] ||
    ALL_CANONICAL_CHAPTER_SUMMARIES[underscoredKey] ||
    null
  );
}
