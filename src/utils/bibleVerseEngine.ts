import { BibleBook, BibleVerse, BibleVersionCode } from "../types";
import { BIBLE_BOOKS_CATALOG } from "../data/bibleData";
import { getTranslatedVerseText } from "../data/bibleTranslationsData";
import { getRegisteredFullChapter, CANONICAL_BIBLE_STRUCTURE } from "../data/fullBibleChaptersData";

// Local in-memory and persistent cache for loaded chapters
const chapterCache: Record<string, BibleVerse[]> = {};
const bookDatasetCache: Record<string, { book: string; chapters: { chapter: number; verses: { verse: number; text: string }[] }[] }> = {};

// Load saved offline cache from localStorage if available
try {
  const savedCache = localStorage.getItem("joy_offline_bible_cache_v4");
  if (savedCache) {
    Object.assign(chapterCache, JSON.parse(savedCache));
  }
} catch {
  // ignore
}

function persistCache() {
  try {
    localStorage.setItem("joy_offline_bible_cache_v4", JSON.stringify(chapterCache));
  } catch {
    // ignore quota
  }
}

/**
 * Data validation function: Throws an error if invalid, empty, or two consecutive verses have identical text.
 * Prevents repeating verse bugs.
 */
export function validateBibleVerses(
  verses: BibleVerse[],
  bookName: string,
  chapter: number
): void {
  if (!Array.isArray(verses) || verses.length === 0) {
    throw new Error(`[Bible Validation Error] No verses found for ${bookName} chapter ${chapter}`);
  }

  for (let i = 0; i < verses.length; i++) {
    const v = verses[i];
    if (!v.text || v.text.trim().length === 0) {
      throw new Error(`[Bible Validation Error] Empty text in verse ${v.verse} of ${bookName} ${chapter}`);
    }

    if (i > 0) {
      const prev = verses[i - 1];
      // Check for exact duplicate consecutive text (except Psalms where repeated choral refrains like Psalm 136 exist)
      if (
        v.text.trim().toLowerCase() === prev.text.trim().toLowerCase() &&
        !bookName.toLowerCase().startsWith("psalm")
      ) {
        throw new Error(
          `[Bible Validation Error] Consecutive duplicate verse detected in ${bookName} ${chapter}:${prev.verse} and ${v.verse} ("${v.text}")`
        );
      }
    }
  }
}

/**
 * Returns exact canonical verse counts per chapter for all 66 books in the Bible
 */
export function getStandardVerseCount(bookName: string, chapter: number): number {
  const normalized = bookName.trim();
  const bookMeta = CANONICAL_BIBLE_STRUCTURE[normalized];
  if (bookMeta && bookMeta.chapters && bookMeta.chapters[chapter - 1]) {
    return bookMeta.chapters[chapter - 1];
  }

  // Check aliases like "Psalm" -> "Psalms"
  if (normalized.toLowerCase() === "psalm") {
    const pMeta = CANONICAL_BIBLE_STRUCTURE["Psalms"];
    if (pMeta && pMeta.chapters[chapter - 1]) return pMeta.chapters[chapter - 1];
  }

  return 25;
}

// Canonical Book Index for Bolls Life & public scripture CDNs (1 to 66)
const BOOK_ORDER_INDEX: Record<string, number> = {
  "Genesis": 1, "Exodus": 2, "Leviticus": 3, "Numbers": 4, "Deuteronomy": 5,
  "Joshua": 6, "Judges": 7, "Ruth": 8, "1 Samuel": 9, "2 Samuel": 10,
  "1 Kings": 11, "2 Kings": 12, "1 Chronicles": 13, "2 Chronicles": 14,
  "Ezra": 15, "Nehemiah": 16, "Esther": 17, "Job": 18, "Psalms": 19, "Psalm": 19,
  "Proverbs": 20, "Ecclesiastes": 21, "Song of Solomon": 22, "Isaiah": 23,
  "Jeremiah": 24, "Lamentations": 25, "Ezekiel": 26, "Daniel": 27, "Hosea": 28,
  "Joel": 29, "Amos": 30, "Obadiah": 31, "Jonah": 32, "Micah": 33,
  "Nahum": 34, "Habakkuk": 35, "Zephaniah": 36, "Haggai": 37, "Zechariah": 38,
  "Malachi": 39, "Matthew": 40, "Mark": 41, "Luke": 42, "John": 43,
  "Acts": 44, "Romans": 45, "1 Corinthians": 46, "2 Corinthians": 47,
  "Galatians": 48, "Ephesians": 49, "Philippians": 50, "Colossians": 51,
  "1 Thessalonians": 52, "2 Thessalonians": 53, "1 Timothy": 54, "2 Timothy": 55,
  "Titus": 56, "Philemon": 57, "Hebrews": 58, "James": 59, "1 Peter": 60,
  "2 Peter": 61, "1 John": 62, "2 John": 63, "3 John": 64, "Jude": 65,
  "Revelation": 66
};

/**
 * Fetch and cache entire book JSON dataset from local static assets
 */
async function fetchLocalBookDataset(bookName: string) {
  const normalized = bookName.trim();
  if (bookDatasetCache[normalized]) {
    return bookDatasetCache[normalized];
  }

  const fileNames = [
    `${normalized}.json`,
    `${normalized.toLowerCase().replace(/[^a-z0-9]/g, "_")}.json`
  ];

  for (const fn of fileNames) {
    try {
      const res = await fetch(`/bible/kjv/${fn}`);
      if (res.ok) {
        const data = await res.json();
        if (data && Array.isArray(data.chapters) && data.chapters.length > 0) {
          bookDatasetCache[normalized] = data;
          return data;
        }
      }
    } catch {
      // Continue to next candidate
    }
  }

  return null;
}

/**
 * Retrieve verses for any book and chapter across the entire 66 books of the Bible.
 * First checks local verified KJV canonical files, then registered chapters, then backend API.
 */
export async function getChapterVerses(
  bookName: string,
  chapter: number,
  version: BibleVersionCode = "KJV"
): Promise<BibleVerse[]> {
  const cacheKey = `${bookName}-${chapter}-${version}`.toLowerCase();
  if (chapterCache[cacheKey] && chapterCache[cacheKey].length > 0) {
    return chapterCache[cacheKey];
  }

  // 1. Check local static verified canonical KJV dataset (instant, 100% offline)
  try {
    const bookData = await fetchLocalBookDataset(bookName);
    if (bookData && Array.isArray(bookData.chapters)) {
      const chObj = bookData.chapters.find((c) => Number(c.chapter) === Number(chapter));
      if (chObj && Array.isArray(chObj.verses) && chObj.verses.length > 0) {
        const verses: BibleVerse[] = chObj.verses.map((v) => {
          const vNum = Number(v.verse);
          let isRed = false;
          if (["Matthew", "Mark", "Luke", "John"].includes(bookName)) {
            if (bookName === "John" && chapter === 3 && vNum >= 10 && vNum <= 21) isRed = true;
            else if (bookName === "Matthew" && ((chapter >= 5 && chapter <= 7) || chapter === 28)) isRed = true;
          }
          return {
            verse: vNum,
            text: getTranslatedVerseText(v.text, bookName, chapter, vNum, version),
            isRedLetter: isRed
          };
        });

        validateBibleVerses(verses, bookName, chapter);
        chapterCache[cacheKey] = verses;
        persistCache();
        return verses;
      }
    }
  } catch (e) {
    console.warn(`Local book dataset fetch failed for ${bookName} ch ${chapter}:`, e);
  }

  // 2. Check if this is a registered full chapter
  const registered = getRegisteredFullChapter(bookName, chapter);
  if (registered && registered.length > 0) {
    const translated = registered.map((v) => ({
      verse: v.verse,
      text: getTranslatedVerseText(v.text, bookName, chapter, v.verse, version),
      isRedLetter: v.isRedLetter
    }));
    validateBibleVerses(translated, bookName, chapter);
    chapterCache[cacheKey] = translated;
    persistCache();
    return translated;
  }

  // 3. Check if local BIBLE_BOOKS_CATALOG has curated verses
  const book = BIBLE_BOOKS_CATALOG.find(
    (b) => b.name.toLowerCase() === bookName.toLowerCase() || b.abbreviation.toLowerCase() === bookName.toLowerCase()
  );
  const exactCount = getStandardVerseCount(bookName, chapter);
  if (book && book.chapters && book.chapters[chapter] && book.chapters[chapter].length >= exactCount) {
    const rawVerses = book.chapters[chapter];
    const translated = rawVerses.map((v) => ({
      verse: v.verse,
      text: getTranslatedVerseText(v.text, book.name, chapter, v.verse, version),
      isRedLetter: v.isRedLetter
    }));
    validateBibleVerses(translated, bookName, chapter);
    chapterCache[cacheKey] = translated;
    persistCache();
    return translated;
  }

  // 4. Fetch from backend Bible API (/api/bible-chapter)
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4000);
    const res = await fetch(
      `/api/bible-chapter?book=${encodeURIComponent(bookName)}&chapter=${chapter}&version=${encodeURIComponent(version)}`,
      { signal: controller.signal }
    );
    clearTimeout(timeoutId);

    if (res.ok) {
      const data = await res.json();
      if (data.verses && Array.isArray(data.verses) && data.verses.length > 0) {
        validateBibleVerses(data.verses, bookName, chapter);
        chapterCache[cacheKey] = data.verses;
        persistCache();
        return data.verses;
      }
    }
  } catch (err) {
    // ignore
  }

  // 5. Try Bolls Life Open Bible API CDN
  try {
    const bookNum = BOOK_ORDER_INDEX[bookName] || BOOK_ORDER_INDEX[bookName.replace(/s$/, "")] || 1;
    const bollsTrans = version === "WEB" ? "WEB" : version === "YLT" ? "YLT" : "KJV";
    const bollsRes = await fetch(`https://bolls.life/get-chapter/${bollsTrans}/${bookNum}/${chapter}/`, {
      headers: { "Accept": "application/json" }
    });
    if (bollsRes.ok) {
      const bollsData = await bollsRes.json();
      if (Array.isArray(bollsData) && bollsData.length > 0) {
        const formatted = bollsData.map((item: any, idx: number) => {
          const rawText = (item.text || "").replace(/<[^>]*>?/gm, "").replace(/\s+/g, " ").trim();
          return {
            verse: Number(item.verse || idx + 1),
            text: getTranslatedVerseText(rawText, bookName, chapter, Number(item.verse || idx + 1), version),
            isRedLetter: false
          };
        });
        if (formatted.length > 0) {
          validateBibleVerses(formatted, bookName, chapter);
          chapterCache[cacheKey] = formatted;
          persistCache();
          return formatted;
        }
      }
    }
  } catch {}

  // 6. Try Bible-API.com
  try {
    const trans = version === "KJV" ? "kjv" : version === "WEB" ? "web" : "kjv";
    const directRes = await fetch(
      `https://bible-api.com/${encodeURIComponent(bookName)}+${chapter}?translation=${trans}`
    );
    if (directRes.ok) {
      const directData = (await directRes.json()) as any;
      if (directData && Array.isArray(directData.verses) && directData.verses.length > 0) {
        const formatted = directData.verses.map((v: any) => ({
          verse: Number(v.verse),
          text: getTranslatedVerseText((v.text || "").replace(/\s+/g, " ").trim(), bookName, chapter, Number(v.verse), version),
          isRedLetter: false
        }));
        validateBibleVerses(formatted, bookName, chapter);
        chapterCache[cacheKey] = formatted;
        persistCache();
        return formatted;
      }
    }
  } catch {}

  return [];
}
