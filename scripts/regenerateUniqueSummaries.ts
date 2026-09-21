import fs from "fs";
import path from "path";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

interface ChapterSummary {
  book: string;
  chapter: number;
  summary: string;
  key_verses: string[];
  theme: string;
  lesson: string;
  questions: string[];
}

const SECTION_FILES: Record<string, string> = {
  otLaw: "src/data/chapterSummaries/otLaw.ts",
  otHistory: "src/data/chapterSummaries/otHistory.ts",
  otPoetry: "src/data/chapterSummaries/otPoetry.ts",
  otProphets: "src/data/chapterSummaries/otProphets.ts",
  ntGospelsActs: "src/data/chapterSummaries/ntGospelsActs.ts",
  ntEpistlesRev: "src/data/chapterSummaries/ntEpistlesRev.ts"
};

const SECTION_VARIABLE_NAMES: Record<string, string> = {
  otLaw: "OT_LAW_SUMMARIES",
  otHistory: "OT_HISTORY_SUMMARIES",
  otPoetry: "OT_POETRY_SUMMARIES",
  otProphets: "OT_PROPHETS_SUMMARIES",
  ntGospelsActs: "NT_GOSPELS_ACTS_SUMMARIES",
  ntEpistlesRev: "NT_EPISTLES_REV_SUMMARIES"
};

function isGeneric(item: ChapterSummary): boolean {
  if (!item || !item.summary) return true;
  const s = item.summary;
  if (s.includes("the narrative records how")) return true;
  if (s.includes("The chapter opens with the declaration that")) return true;
  if (s.includes("As the chapter unfolds, key events reveal")) return true;
  if (s.includes("The passage concludes with the solemn truth that")) return true;
  if (s.includes("Brother Bismark Twum")) return true;
  if (s.startsWith(`In ${item.book} ${item.chapter},`)) return true;
  if (item.theme && item.theme.includes(`Chapter ${item.chapter}:`)) return true;
  return false;
}

function cleanSignOff(text: string): string {
  let cleaned = text.trim();
  cleaned = cleaned.replace(/[—\-]\s*Brother\s+Bismark\s+Twum/gi, "");
  cleaned = cleaned.replace(/[—\-]\s*Bismark\s+Twum/gi, "");
  cleaned = cleaned.trim();
  return `${cleaned}\n\n— Bismark Twum`;
}

async function fetchUniqueBatch(book: string, chapters: number[]): Promise<ChapterSummary[]> {
  const prompt = `You are an expert biblical scholar and Christian educator.
Generate authentic, chapter-specific data for ${book} chapters ${chapters.join(", ")}.
Return a JSON array of ${chapters.length} objects with this schema:
[
  {
    "chapter": number,
    "theme": string (specific chapter title/theme, NOT containing "${book} Chapter X:"),
    "summary": string (3-4 concise, vivid sentences in plain English detailing the exact people, actions, and events that occur in that chapter. FORBIDDEN: generic phrases like "In ${book}...", "the narrative records how", "The chapter opens with", "As the chapter unfolds". Start directly with what happens in that chapter.),
    "lesson": string (one clear, practical spiritual takeaway for Christian believers),
    "key_verses": string[] (2-3 authentic scripture references for that chapter, e.g. ["${book} ${chapters[0]}:1"]),
    "questions": string[] (2 thoughtful reflection questions on the specific chapter events or teachings)
  }
]`;

  for (let attempt = 1; attempt <= 10; attempt++) {
    try {
      const res = await ai.models.generateContent({
        model: "gemini-3.5-flash-lite",
        contents: prompt,
        config: { responseMimeType: "application/json" }
      });
      const text = res.text?.trim() || "[]";
      const parsed = JSON.parse(text);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed.map((item: any) => ({
          book,
          chapter: Number(item.chapter),
          theme: item.theme || `${book} ${item.chapter}`,
          summary: cleanSignOff(item.summary),
          lesson: item.lesson || `Walk in obedience and faith as taught in ${book} ${item.chapter}.`,
          key_verses: Array.isArray(item.key_verses) && item.key_verses.length > 0
            ? item.key_verses
            : [`${book} ${item.chapter}:1`],
          questions: Array.isArray(item.questions) && item.questions.length >= 2
            ? item.questions.slice(0, 2)
            : [
                `What major event or spiritual instruction stands out to you in ${book} ${item.chapter}?`,
                `How can you apply the spiritual lesson of this chapter to your daily walk with Christ?`
              ]
        }));
      }
    } catch (err: any) {
      const isQuota = err?.status === 429 || /429|quota|exhausted|rate/i.test(err?.message || "");
      if (isQuota) {
        console.warn(`[Quota 429] Pacing limit reached. Pausing 25s before retry (attempt ${attempt}/10)...`);
        await new Promise((r) => setTimeout(r, 25000));
        continue;
      }
      console.warn(`[Batch Warning] ${book} [${chapters.join(",")}] attempt ${attempt}/10 failed: ${err.message}`);
      await new Promise((r) => setTimeout(r, 4000 * attempt));
    }
  }
  throw new Error(`Failed to generate batch for ${book} chapters ${chapters.join(", ")}`);
}

export async function processSection(sectionKey: string) {
  const filePath = SECTION_FILES[sectionKey];
  const varName = SECTION_VARIABLE_NAMES[sectionKey];
  if (!filePath || !varName) {
    throw new Error(`Unknown section: ${sectionKey}`);
  }

  console.log(`\n========================================`);
  console.log(`Processing section: ${sectionKey} (${filePath})`);
  console.log(`========================================`);

  // Dynamically import the existing map
  const modulePath = path.resolve(filePath);
  const rawFile = fs.readFileSync(modulePath, "utf8");
  
  // Extract JSON object from file content
  const startIdx = rawFile.indexOf("export const " + varName + ": Record<string, ChapterSummary> = {");
  if (startIdx === -1) {
    throw new Error(`Cannot find variable ${varName} in ${filePath}`);
  }
  
  // Parse existing data via tsx execution or require
  const dataModule = await import(modulePath);
  const dataMap: Record<string, ChapterSummary> = { ...dataModule[varName] };

  // Identify all keys that need regeneration
  const genericEntries: { key: string; book: string; chapter: number }[] = [];
  for (const [key, item] of Object.entries(dataMap)) {
    if (isGeneric(item)) {
      genericEntries.push({ key, book: item.book, chapter: item.chapter });
    }
  }

  console.log(`Total chapters in section: ${Object.keys(dataMap).length}`);
  console.log(`Generic chapters needing rewrite: ${genericEntries.length}`);

  if (genericEntries.length === 0) {
    console.log(`No generic summaries in ${sectionKey}! All chapters are already unique.`);
    return;
  }

  // Group by book
  const byBook: Record<string, number[]> = {};
  for (const entry of genericEntries) {
    if (!byBook[entry.book]) byBook[entry.book] = [];
    byBook[entry.book].push(entry.chapter);
  }

  for (const [book, chapters] of Object.entries(byBook)) {
    chapters.sort((a, b) => a - b);
    console.log(`\nProcessing book: ${book} (${chapters.length} chapters to regenerate)`);
    
    // Split into batches of up to 6 chapters for maximum detail and optimal rate limit efficiency
    const batchSize = 6;
    const batches: number[][] = [];
    for (let i = 0; i < chapters.length; i += batchSize) {
      batches.push(chapters.slice(i, i + batchSize));
    }

    // Process batches sequentially with 4.5s delay (keeps requests under 13 RPM safely below the 15 RPM cap)
    for (const batch of batches) {
      console.log(`  -> Generating ${book} chapters: ${batch.join(", ")}...`);
      const results = await fetchUniqueBatch(book, batch);
      for (const res of results) {
        const key = `${res.book}_${res.chapter}`;
        dataMap[key] = res;
      }
      // Save progress immediately after each batch
      saveSectionFile(filePath, varName, dataMap);
      console.log(`  ✓ Saved ${book} [${batch.join(",")}] to disk`);
      await new Promise((r) => setTimeout(r, 5000));
    }
  }

  console.log(`\n✓ Successfully completed section: ${sectionKey}! All chapters now unique.`);
}

function saveSectionFile(filePath: string, varName: string, dataMap: Record<string, ChapterSummary>) {
  const header = `import { ChapterSummary } from "../../types";

/**
 * Authentic, Chapter-Specific Summaries for ${varName}
 * Every chapter is uniquely crafted with specific names, events, themes, and lessons.
 * Signed off with "— Bismark Twum".
 */
export const ${varName}: Record<string, ChapterSummary> = `;

  const jsonStr = JSON.stringify(dataMap, null, 2);
  const fullContent = `${header}${jsonStr};\n`;
  fs.writeFileSync(filePath, fullContent, "utf8");
}

async function main() {
  const targetSection = process.argv[2];
  if (targetSection && SECTION_FILES[targetSection]) {
    await processSection(targetSection);
  } else {
    // Process all sections in order
    const sections = ["ntGospelsActs", "ntEpistlesRev", "otLaw", "otHistory", "otPoetry", "otProphets"];
    for (const sec of sections) {
      await processSection(sec);
    }
  }
  console.log("\n=======================================================");
  console.log("ALL 1,189 CHAPTER SUMMARIES HAVE BEEN UNIQUELY CRAFTED!");
  console.log("=======================================================");
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
