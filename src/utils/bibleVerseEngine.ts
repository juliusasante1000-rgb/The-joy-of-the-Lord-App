import { BibleBook, BibleVerse, BibleVersionCode } from "../types";
import { BIBLE_BOOKS_CATALOG } from "../data/bibleData";
import { getTranslatedVerseText } from "../data/bibleTranslationsData";
import { getRegisteredFullChapter, CANONICAL_BIBLE_STRUCTURE } from "../data/fullBibleChaptersData";
import { getOfflineBook, saveOfflineBook } from "./offlineBibleManager";

// Local in-memory and persistent cache for loaded chapters
const chapterCache: Record<string, BibleVerse[]> = {};
const bookDatasetCache: Record<string, { book: string; chapters: { chapter: number; verses: { verse: number; text: string }[] }[] }> = {};

// Load saved offline cache from localStorage if available
try {
  const savedCache = localStorage.getItem("joy_offline_bible_cache_v4");
  if (savedCache) {
    const parsed = JSON.parse(savedCache);
    // Purge any non-KJV keys that might have been mistakenly cached with KJV text
    for (const key of Object.keys(parsed)) {
      if (!key.endsWith("-kjv")) {
        delete parsed[key];
      }
    }
    Object.assign(chapterCache, parsed);
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
 * Fetch and cache entire book JSON dataset from local offline storage or static assets
 */
async function fetchLocalBookDataset(bookName: string) {
  const normalized = bookName.trim();
  if (bookDatasetCache[normalized]) {
    return bookDatasetCache[normalized];
  }

  // 1. Check offline IndexedDB storage (instant, 100% offline)
  try {
    const offlineBook = await getOfflineBook(normalized);
    if (offlineBook && Array.isArray(offlineBook.chapters) && offlineBook.chapters.length > 0) {
      bookDatasetCache[normalized] = offlineBook;
      return offlineBook;
    }
  } catch {
    // Continue to network fetch
  }

  // 2. Fetch from static local assets
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
          // Persist asynchronously into offline IndexedDB storage
          saveOfflineBook(normalized, data).catch(() => {});
          return data;
        }
      }
    } catch {
      // Continue to next candidate
    }
  }

  return null;
}

const VERSION_TO_BOLLS: Record<string, string> = {
  "KJV": "KJV",
  "NKJV": "NKJV",
  "NIV": "NIV",
  "ESV": "ESV",
  "NLT": "NLT",
  "AMP": "AMP",
  "NASB": "NASB",
  "CSB": "CSB17",
  "MSG": "MSG",
  "BSB": "BSB",
  "ASV": "ASV",
  "YLT": "YLT",
  "WEB": "WEB",
  "NET": "NET",
  "CEV": "CEVD",
  "TPT": "TPT"
};

/**
 * Clean scripture text from raw HTML, footnote links, and circular character markers
 */
function cleanVerseText(raw: string): string {
  if (!raw) return "";
  let text = raw;
  // Strip headings and tags
  text = text.replace(/<h\d+>[^<]*<\/h\d+>/gi, " ");
  text = text.replace(/<sup[^>]*>.*?<\/sup>/gi, " ");
  text = text.replace(/<[^>]+>/g, " ");
  // Strip footnote circles ⓐ ⓑ ⓜ and brackets [1]
  text = text.replace(/[\u2460-\u2473\u24B6-\u24E9\u2776-\u277F]/g, "");
  text = text.replace(/\[\d+\]/g, "");
  return text.replace(/\s+/g, " ").trim();
}

/**
 * Retrieve verses for any book and chapter across the entire 66 books of the Bible.
 * For non-KJV translations, dynamically retrieves authentic translation text.
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

  const bookNum = BOOK_ORDER_INDEX[bookName] || BOOK_ORDER_INDEX[bookName.replace(/s$/, "")] || 1;
  const isKjv = version === "KJV";

  // For non-KJV versions, prioritize authentic translation APIs
  if (!isKjv) {
    // 1. Try local server translation API with generous timeout
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 8000);
      const res = await fetch(
        `/api/bible/chapter?version=${encodeURIComponent(version)}&book=${encodeURIComponent(bookName)}&chapter=${chapter}`,
        {
          signal: controller.signal,
          headers: { "Cache-Control": "no-store" }
        }
      );
      clearTimeout(timeoutId);

      if (res.ok) {
        const data = await res.json();
        // Ensure the returned version is the requested one, not a KJV fallback
        if (data && Array.isArray(data.verses) && data.verses.length > 0 && data.version === version) {
          const verses: BibleVerse[] = data.verses.map((v: any) => ({
            verse: Number(v.verse),
            text: cleanVerseText(v.text),
            isRedLetter: false
          }));
          validateBibleVerses(verses, bookName, chapter);
          chapterCache[cacheKey] = verses;
          persistCache();
          return verses;
        }
      }
    } catch {
      // Continue to direct Bolls CDN
    }

    // 2. Direct Bolls Life Open API with specific translation code
    try {
      const bollsCode = VERSION_TO_BOLLS[version] || version;
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 8000);
      const bollsRes = await fetch(`https://bolls.life/get-chapter/${bollsCode}/${bookNum}/${chapter}/`, {
        headers: { "Accept": "application/json", "User-Agent": "ChristianScriptureEngine/1.0" },
        signal: controller.signal
      });
      clearTimeout(timeoutId);

      if (bollsRes.ok) {
        const bollsData = await bollsRes.json();
        if (Array.isArray(bollsData) && bollsData.length > 0) {
          const formatted: BibleVerse[] = bollsData.map((item: any, idx: number) => ({
            verse: Number(item.verse || idx + 1),
            text: cleanVerseText(item.text || ""),
            isRedLetter: false
          }));
          if (formatted.length > 0) {
            validateBibleVerses(formatted, bookName, chapter);
            chapterCache[cacheKey] = formatted;
            persistCache();
            return formatted;
          }
        }
      }
    } catch {}

    // 3. Try bible-api.com for public domain / modern translations supported there
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);
      const bibleApiRes = await fetch(
        `https://bible-api.com/${encodeURIComponent(bookName)}%20${chapter}?translation=${encodeURIComponent(version.toLowerCase())}`,
        { signal: controller.signal }
      );
      clearTimeout(timeoutId);

      if (bibleApiRes.ok) {
        const bData = await bibleApiRes.json();
        if (bData && Array.isArray(bData.verses) && bData.verses.length > 0) {
          const formatted: BibleVerse[] = bData.verses.map((item: any) => ({
            verse: Number(item.verse),
            text: cleanVerseText(item.text || ""),
            isRedLetter: false
          }));
          validateBibleVerses(formatted, bookName, chapter);
          chapterCache[cacheKey] = formatted;
          persistCache();
          return formatted;
        }
      }
    } catch {}
  }

  // 1. For KJV or as fallback for non-KJV: Check local static verified canonical KJV dataset (instant, 100% offline)
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
            text: isKjv ? v.text : getTranslatedVerseText(v.text, bookName, chapter, vNum, version),
            isRedLetter: isRed
          };
        });

        validateBibleVerses(verses, bookName, chapter);
        // Only persist to cache if it's actually KJV so we don't poison non-KJV version keys
        if (isKjv) {
          chapterCache[cacheKey] = verses;
          persistCache();
        }
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
      text: isKjv ? v.text : getTranslatedVerseText(v.text, bookName, chapter, v.verse, version),
      isRedLetter: v.isRedLetter
    }));
    validateBibleVerses(translated, bookName, chapter);
    chapterCache[cacheKey] = translated;
    persistCache();
    return translated;
  }

  // 3. For KJV only: check local BIBLE_BOOKS_CATALOG for instant offline response
  const book = BIBLE_BOOKS_CATALOG.find(
    (b) => b.name.toLowerCase() === bookName.toLowerCase() || b.abbreviation.toLowerCase() === bookName.toLowerCase()
  );
  const exactCount = getStandardVerseCount(bookName, chapter);

  if (isKjv && book && book.chapters && book.chapters[chapter] && book.chapters[chapter].length >= exactCount) {
    const rawVerses = book.chapters[chapter];
    const translated = rawVerses.map((v) => ({
      verse: v.verse,
      text: v.text,
      isRedLetter: v.isRedLetter
    }));
    validateBibleVerses(translated, bookName, chapter);
    chapterCache[cacheKey] = translated;
    persistCache();
    return translated;
  }

  // 4. For non-KJV (or missing KJV): Fetch from backend Bible API (/api/bible/chapter)
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4000);
    const res = await fetch(
      `/api/bible/chapter?book=${encodeURIComponent(bookName)}&chapter=${chapter}&version=${encodeURIComponent(version)}`,
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

  // 5. Try Bolls Life Open Bible API CDN directly
  try {
    const bollsTrans = VERSION_TO_BOLLS[version] || (isKjv ? "KJV" : "WEB");
    const bollsRes = await fetch(`https://bolls.life/get-chapter/${bollsTrans}/${bookNum}/${chapter}/`, {
      headers: { "Accept": "application/json" }
    });
    if (bollsRes.ok) {
      const bollsData = await bollsRes.json();
      if (Array.isArray(bollsData) && bollsData.length > 0) {
        const formatted = bollsData.map((item: any, idx: number) => {
          const cleanText = cleanVerseText(item.text || "");
          return {
            verse: Number(item.verse || idx + 1),
            text: cleanText,
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
    const trans = isKjv ? "kjv" : version === "WEB" ? "web" : "kjv";
    const directRes = await fetch(
      `https://bible-api.com/${encodeURIComponent(bookName)}+${chapter}?translation=${trans}`
    );
    if (directRes.ok) {
      const directData = (await directRes.json()) as any;
      if (directData && Array.isArray(directData.verses) && directData.verses.length > 0) {
        const formatted = directData.verses.map((v: any) => ({
          verse: Number(v.verse),
          text: (v.text || "").replace(/\s+/g, " ").trim(),
          isRedLetter: false
        }));
        validateBibleVerses(formatted, bookName, chapter);
        chapterCache[cacheKey] = formatted;
        persistCache();
        return formatted;
      }
    }
  } catch {}

  // 7. Fallback to local catalog if network is unavailable
  if (book && book.chapters && book.chapters[chapter] && book.chapters[chapter].length >= exactCount) {
    const rawVerses = book.chapters[chapter];
    const translated = rawVerses.map((v) => ({
      verse: v.verse,
      text: isKjv ? v.text : getTranslatedVerseText(v.text, book.name, chapter, v.verse, version),
      isRedLetter: v.isRedLetter
    }));
    validateBibleVerses(translated, bookName, chapter);
    if (isKjv) {
      chapterCache[cacheKey] = translated;
      persistCache();
    }
    return translated;
  }

  return [];
}

/**
 * Fetch a single verse authentic text in any requested translation (e.g. NIV, ESV, NKJV, NLT, AMP)
 */
export async function fetchAuthenticVerseText(
  referenceOrBook: string,
  chapter?: number,
  verse?: number,
  version: string = "KJV"
): Promise<{ text: string; version: string }> {
  const reqVersion = String(version || "KJV").toUpperCase();
  let ref = referenceOrBook;
  if (chapter !== undefined && verse !== undefined) {
    ref = `${referenceOrBook} ${chapter}:${verse}`;
  }

  // 1. Try local server API
  try {
    const res = await fetch(`/api/bible/verse?reference=${encodeURIComponent(ref)}&version=${encodeURIComponent(reqVersion)}`, {
      headers: { "Cache-Control": "no-store" }
    });
    if (res.ok) {
      const data = await res.json();
      if (data && data.verseText && typeof data.verseText === "string" && data.verseText.trim().length > 0) {
        return { text: data.verseText, version: data.version || reqVersion };
      }
    }
  } catch {}

  // 2. Try direct Bolls if book chapter verse is parsed
  const parsed = parseScriptureRef(ref);
  if (parsed) {
    const bollsCode = VERSION_TO_BOLLS[reqVersion] || reqVersion;
    try {
      const bollsRes = await fetch(`https://bolls.life/get-verse/${bollsCode}/${parsed.bookNum}/${parsed.chapter}/${parsed.verse}/`);
      if (bollsRes.ok) {
        const bollsData = await bollsRes.json();
        if (bollsData && bollsData.text) {
          return { text: cleanVerseText(bollsData.text), version: reqVersion };
        }
      }
    } catch {}
  }

  return { text: "", version: "KJV" };
}

function parseScriptureRef(ref: string): { bookNum: number; chapter: number; verse: number } | null {
  const match = ref.match(/^([\d\s\w]+?)\s+(\d+)[:\.](\d+)/i);
  if (!match) return null;
  const bookName = match[1].trim();
  const chapter = parseInt(match[2], 10);
  const verse = parseInt(match[3], 10);
  const bookNum = BOOK_NAME_TO_NUMBER[bookName.toLowerCase()] || 1;
  return { bookNum, chapter, verse };
}

const BOOK_NAME_TO_NUMBER: Record<string, number> = {
  "genesis": 1, "exodus": 2, "leviticus": 3, "numbers": 4, "deuteronomy": 5,
  "joshua": 6, "judges": 7, "ruth": 8, "1 samuel": 9, "2 samuel": 10,
  "1 kings": 11, "2 kings": 12, "1 chronicles": 13, "2 chronicles": 14,
  "ezra": 15, "nehemiah": 16, "esther": 17, "job": 18, "psalm": 19, "psalms": 19,
  "proverbs": 20, "ecclesiastes": 21, "song of solomon": 22, "isaiah": 23,
  "jeremiah": 24, "lamentations": 25, "ezekiel": 26, "daniel": 27,
  "hosea": 28, "joel": 29, "amos": 30, "obadiah": 31, "jonah": 32,
  "micah": 33, "nahum": 34, "habakkuk": 35, "zephaniah": 36, "haggai": 37,
  "zechariah": 38, "malachi": 39, "matthew": 40, "mark": 41, "luke": 42,
  "john": 43, "acts": 44, "romans": 45, "1 corinthians": 46, "2 corinthians": 47,
  "galatians": 48, "ephesians": 49, "philippians": 50, "colossians": 51,
  "1 thessalonians": 52, "2 thessalonians": 53, "1 timothy": 54, "2 timothy": 55,
  "titus": 56, "philemon": 57, "hebrews": 58, "james": 59, "1 peter": 60,
  "2 peter": 61, "1 john": 62, "2 john": 63, "3 john": 64, "jude": 65,
  "revelation": 66
};
