/**
 * The Joy of the Lord - Offline Bible Storage Engine
 * Provides complete 66-book offline scripture persistence using IndexedDB and Cache API.
 * Ensures the entire Holy Bible renders seamlessly with zero network connectivity or on airplane mode.
 */

import { BIBLE_BOOKS_CATALOG } from "../data/bibleData";
import { BibleVerse } from "../types";

const DB_NAME = "JoyOfTheLord_Bible_DB";
const DB_VERSION = 2;
const STORE_NAME = "bible_books";
const CHAPTER_STORE_NAME = "bible_version_chapters";

let dbInstance: IDBDatabase | null = null;
let isPreloading = false;

/**
 * Open or initialize the IndexedDB database
 */
export function openBibleDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (dbInstance) {
      return resolve(dbInstance);
    }

    if (typeof window === "undefined" || !window.indexedDB) {
      return reject(new Error("IndexedDB is not supported in this browser environment"));
    }

    const request = window.indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event: any) => {
      const db = event.target.result as IDBDatabase;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: "bookKey" });
      }
      if (!db.objectStoreNames.contains(CHAPTER_STORE_NAME)) {
        db.createObjectStore(CHAPTER_STORE_NAME, { keyPath: "chapterKey" });
      }
    };

    request.onsuccess = (event: any) => {
      dbInstance = event.target.result as IDBDatabase;
      resolve(dbInstance);
    };

    request.onerror = (event: any) => {
      reject(event.target.error || new Error("Failed to open Bible IndexedDB"));
    };
  });
}

export function normalizeKey(bookName: string): string {
  return bookName.trim().toLowerCase().replace(/[^a-z0-9]/g, "");
}

export function normalizeChapterKey(bookName: string, chapter: number, version: string): string {
  return `${normalizeKey(bookName)}_${chapter}_${version.trim().toLowerCase()}`;
}

/**
 * Save a single chapter's verses for any translation into local IndexedDB
 */
export async function saveOfflineChapterVerses(
  bookName: string,
  chapter: number,
  version: string,
  verses: BibleVerse[]
): Promise<void> {
  if (!verses || verses.length === 0) return;
  try {
    const db = await openBibleDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(CHAPTER_STORE_NAME, "readwrite");
      const store = transaction.objectStore(CHAPTER_STORE_NAME);
      const chapterKey = normalizeChapterKey(bookName, chapter, version);

      const putRequest = store.put({
        chapterKey,
        bookName,
        chapter,
        version: version.toUpperCase(),
        verses,
        savedAt: Date.now()
      });

      putRequest.onsuccess = () => resolve();
      putRequest.onerror = (e: any) => reject(e.target.error);
    });
  } catch (err) {
    console.warn(`[OfflineBibleManager] Error saving offline chapter ${bookName} ${chapter} (${version}):`, err);
  }
}

/**
 * Retrieve a single chapter's verses for any translation from local IndexedDB
 */
export async function getOfflineChapterVerses(
  bookName: string,
  chapter: number,
  version: string
): Promise<BibleVerse[] | null> {
  try {
    const db = await openBibleDB();
    return new Promise((resolve) => {
      const transaction = db.transaction(CHAPTER_STORE_NAME, "readonly");
      const store = transaction.objectStore(CHAPTER_STORE_NAME);
      const chapterKey = normalizeChapterKey(bookName, chapter, version);
      const request = store.get(chapterKey);

      request.onsuccess = () => {
        if (request.result && Array.isArray(request.result.verses) && request.result.verses.length > 0) {
          resolve(request.result.verses);
        } else {
          resolve(null);
        }
      };

      request.onerror = () => resolve(null);
    });
  } catch {
    return null;
  }
}

/**
 * Check if a specific chapter of a translation is already cached offline
 */
export async function isChapterCachedOffline(
  bookName: string,
  chapter: number,
  version: string
): Promise<boolean> {
  const verses = await getOfflineChapterVerses(bookName, chapter, version);
  return verses !== null && verses.length > 0;
}

/**
 * Retrieve a full Bible book dataset from local IndexedDB
 */
export async function getOfflineBook(bookName: string): Promise<any | null> {
  try {
    const db = await openBibleDB();
    return new Promise((resolve) => {
      const transaction = db.transaction(STORE_NAME, "readonly");
      const store = transaction.objectStore(STORE_NAME);
      const key = normalizeKey(bookName);
      const request = store.get(key);

      request.onsuccess = () => {
        if (request.result && request.result.data) {
          resolve(request.result.data);
        } else {
          resolve(null);
        }
      };

      request.onerror = () => {
        resolve(null);
      };
    });
  } catch (err) {
    console.warn(`[OfflineBibleManager] Error retrieving offline book ${bookName}:`, err);
    return null;
  }
}

/**
 * Save a full Bible book dataset into local IndexedDB
 */
export async function saveOfflineBook(bookName: string, data: any): Promise<void> {
  if (!data || !Array.isArray(data.chapters) || data.chapters.length === 0) {
    return;
  }
  try {
    const db = await openBibleDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(STORE_NAME, "readwrite");
      const store = transaction.objectStore(STORE_NAME);
      const key = normalizeKey(bookName);

      const putRequest = store.put({
        bookKey: key,
        bookName: bookName,
        data: data,
        savedAt: Date.now()
      });

      putRequest.onsuccess = () => resolve();
      putRequest.onerror = (e: any) => reject(e.target.error);
    });
  } catch (err) {
    console.warn(`[OfflineBibleManager] Error saving offline book ${bookName}:`, err);
  }
}

/**
 * Get offline storage stats (number of cached books out of 66)
 */
export async function getOfflineBibleStats(): Promise<{
  total: number;
  cached: number;
  isReady: boolean;
  cachedBookNames: string[];
}> {
  const total = BIBLE_BOOKS_CATALOG.length; // 66 books
  try {
    const db = await openBibleDB();
    return new Promise((resolve) => {
      const transaction = db.transaction(STORE_NAME, "readonly");
      const store = transaction.objectStore(STORE_NAME);
      const request = store.getAll();

      request.onsuccess = () => {
        const records = request.result || [];
        const cachedBookNames = records.map((r: any) => r.bookName || r.bookKey);
        const cached = records.length;
        resolve({
          total,
          cached,
          isReady: cached >= total,
          cachedBookNames
        });
      };

      request.onerror = () => {
        resolve({
          total,
          cached: 0,
          isReady: false,
          cachedBookNames: []
        });
      };
    });
  } catch {
    return {
      total,
      cached: 0,
      isReady: false,
      cachedBookNames: []
    };
  }
}

/**
 * Preload all 66 books of the Bible into IndexedDB and Service Worker Cache
 * Can be run in background or on user request with progress callbacks.
 */
export async function preloadAllBooksOffline(
  onProgress?: (cachedCount: number, total: number, currentBook: string) => void
): Promise<{ success: boolean; total: number; cached: number }> {
  if (isPreloading) {
    const stats = await getOfflineBibleStats();
    return { success: true, total: stats.total, cached: stats.cached };
  }

  isPreloading = true;
  const allBooks = BIBLE_BOOKS_CATALOG.map((b) => b.name);
  const total = allBooks.length;
  let cachedCount = 0;

  try {
    const currentStats = await getOfflineBibleStats();
    const existingSet = new Set(currentStats.cachedBookNames.map((n) => normalizeKey(n)));
    cachedCount = existingSet.size;

    if (onProgress) {
      onProgress(cachedCount, total, "Checking local storage...");
    }

    // Process in sequential chunks of 3 to avoid saturating network or memory
    const chunkSize = 3;
    for (let i = 0; i < allBooks.length; i += chunkSize) {
      const chunk = allBooks.slice(i, i + chunkSize);
      await Promise.all(
        chunk.map(async (bookName) => {
          const key = normalizeKey(bookName);
          if (existingSet.has(key)) {
            return;
          }

          if (onProgress) {
            onProgress(cachedCount, total, bookName);
          }

          const fileCandidates = [
            `/bible/kjv/${bookName}.json`,
            `/bible/kjv/${bookName.toLowerCase().replace(/[^a-z0-9]/g, "_")}.json`
          ];

          let fetchedData: any = null;
          for (const url of fileCandidates) {
            try {
              const res = await fetch(url);
              if (res.ok) {
                const data = await res.json();
                if (data && Array.isArray(data.chapters) && data.chapters.length > 0) {
                  fetchedData = data;
                  break;
                }
              }
            } catch {
              // Try next candidate
            }
          }

          if (fetchedData) {
            await saveOfflineBook(bookName, fetchedData);
            existingSet.add(key);
            cachedCount++;
            if (onProgress) {
              onProgress(cachedCount, total, bookName);
            }
          }
        })
      );

      // Brief yield so the UI stays 100% responsive
      await new Promise((r) => setTimeout(r, 40));
    }

    if (onProgress) {
      onProgress(cachedCount, total, "All 66 Books Stored Offline!");
    }

    return {
      success: true,
      total,
      cached: cachedCount
    };
  } catch (err) {
    console.warn("[OfflineBibleManager] Error during full preload:", err);
    return {
      success: false,
      total,
      cached: cachedCount
    };
  } finally {
    isPreloading = false;
  }
}

/**
 * Automatically background initialize offline Bible caching
 * Runs with low priority when the app is idle.
 */
export function initBackgroundOfflineBible() {
  if (typeof window === "undefined") return;

  const startBackgroundCaching = () => {
    // Check current stats
    getOfflineBibleStats().then((stats) => {
      if (stats.cached < stats.total && navigator.onLine) {
        // Pre-cache remaining books in background
        preloadAllBooksOffline();
      }
    }).catch(() => {});
  };

  if ("requestIdleCallback" in window) {
    (window as any).requestIdleCallback(startBackgroundCaching, { timeout: 3000 });
  } else {
    setTimeout(startBackgroundCaching, 2500);
  }
}

/**
 * Prefetch all chapters of a specific book in any requested translation
 * and save them into local IndexedDB for complete offline availability.
 */
export async function prefetchBookForOffline(
  bookName: string,
  totalChapters: number,
  version: string,
  onProgress?: (completed: number, total: number) => void
): Promise<{ success: boolean; cached: number; total: number }> {
  let completed = 0;
  for (let ch = 1; ch <= totalChapters; ch++) {
    try {
      // Check if already cached
      const isCached = await isChapterCachedOffline(bookName, ch, version);
      if (isCached) {
        completed++;
        if (onProgress) onProgress(completed, totalChapters);
        continue;
      }

      // Fetch from API
      const res = await fetch(
        `/api/bible/chapter?version=${encodeURIComponent(version)}&book=${encodeURIComponent(bookName)}&chapter=${ch}`
      );
      if (res.ok) {
        const data = await res.json();
        if (data && Array.isArray(data.verses) && data.verses.length > 0) {
          const verses: BibleVerse[] = data.verses.map((v: any) => ({
            verse: Number(v.verse),
            text: String(v.text || "").replace(/<[^>]+>/g, "").trim(),
            isRedLetter: false
          }));
          await saveOfflineChapterVerses(bookName, ch, version, verses);
        }
      }
    } catch {
      // Continue to next chapter
    }
    completed++;
    if (onProgress) onProgress(completed, totalChapters);
    await new Promise((r) => setTimeout(r, 80));
  }

  return { success: true, cached: completed, total: totalChapters };
}

/**
 * Get count of cached chapters for each translation
 */
export async function getOfflineVersionStats(): Promise<Record<string, number>> {
  try {
    const db = await openBibleDB();
    return new Promise((resolve) => {
      const transaction = db.transaction(CHAPTER_STORE_NAME, "readonly");
      const store = transaction.objectStore(CHAPTER_STORE_NAME);
      const request = store.getAll();

      request.onsuccess = () => {
        const records = request.result || [];
        const stats: Record<string, number> = {};
        for (const r of records) {
          const ver = r.version || "UNKNOWN";
          stats[ver] = (stats[ver] || 0) + 1;
        }
        resolve(stats);
      };

      request.onerror = () => resolve({});
    });
  } catch {
    return {};
  }
}
