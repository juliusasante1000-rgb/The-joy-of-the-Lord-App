import fs from "fs";
import path from "path";
import { CANONICAL_BIBLE_STRUCTURE } from "../src/data/fullBibleChaptersData";
import { PRE_GENERATED_CHAPTER_SUMMARIES } from "../src/data/bibleChapterSummaries";
import { ADDITIONAL_CHAPTER_RESERVOIR } from "../src/data/gospelAndEpistleReservoir";
import { OT_LAW_DATA } from "./otLawData";
import { LAW_OUTLINES } from "./lawOutlinesPart1";

interface ChapterSummary {
  book: string;
  chapter: number;
  summary: string;
  key_verses: string[];
  theme: string;
  lesson: string;
  questions: string[];
}

function loadBook(bookName: string): { book: string; chapters: { chapter: number; verses: { verse: number; text: string }[] }[] } {
  let file = path.join("public/bible/kjv", `${bookName}.json`);
  if (!fs.existsSync(file)) {
    file = path.join("public/bible/kjv", `${bookName.toLowerCase().replace(/[^a-z0-9]/g, "_")}.json`);
  }
  return JSON.parse(fs.readFileSync(file, "utf-8"));
}

console.log("Master generator test initialized");
