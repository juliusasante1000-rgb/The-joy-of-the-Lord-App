/**
 * Comprehensive Canonical Bible Chapter Summaries Generator
 * Generates verified, event-focused offline chapter summaries for all 1,189 chapters of the Holy Bible.
 * Ensures that no chapter ever displays "Summary not available offline".
 */

import fs from "fs";
import path from "path";
import { CANONICAL_BIBLE_STRUCTURE } from "../src/data/fullBibleChaptersData";
import { PRE_GENERATED_CHAPTER_SUMMARIES } from "../src/data/bibleChapterSummaries";
import { ADDITIONAL_CHAPTER_RESERVOIR } from "../src/data/gospelAndEpistleReservoir";

interface ChapterSummary {
  book: string;
  chapter: number;
  summary: string;
  key_verses: string[];
  theme: string;
  lesson: string;
  questions: string[];
}

// Read book JSON
function getBookData(bookName: string): { book: string; chapters: { chapter: number; verses: { verse: number; text: string }[] }[] } {
  let file = path.join("public/bible/kjv", `${bookName}.json`);
  if (!fs.existsSync(file)) {
    file = path.join("public/bible/kjv", `${bookName.toLowerCase().replace(/[^a-z0-9]/g, "_")}.json`);
  }
  return JSON.parse(fs.readFileSync(file, "utf-8"));
}

export function cleanText(t: string): string {
  return t.replace(/\s+/g, " ").trim();
}

console.log("Bible Structure Loaded:", Object.keys(CANONICAL_BIBLE_STRUCTURE).length, "books");
