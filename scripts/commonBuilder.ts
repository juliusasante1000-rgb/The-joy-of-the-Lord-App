import fs from "fs";
import path from "path";
import { CANONICAL_BIBLE_STRUCTURE } from "../src/data/fullBibleChaptersData";
import { PRE_GENERATED_CHAPTER_SUMMARIES } from "../src/data/bibleChapterSummaries";

interface ChapterSummary {
  book: string;
  chapter: number;
  summary: string;
  key_verses: string[];
  theme: string;
  lesson: string;
  questions: string[];
}

// Load KJV book data helper
function loadBookVerses(bookName: string): any {
  let file = path.join("public/bible/kjv", `${bookName}.json`);
  if (!fs.existsSync(file)) {
    file = path.join("public/bible/kjv", `${bookName.toLowerCase().replace(/[^a-z0-9]/g, "_")}.json`);
  }
  return JSON.parse(fs.readFileSync(file, "utf-8"));
}

export function cleanText(t: string): string {
  return t.replace(/\s+/g, " ").trim();
}
