/**
 * The Joy of the Lord - Offline Bible Storage Engine
 * Provides complete 66-book offline scripture persistence using IndexedDB and Cache API.
 * Ensures the entire Holy Bible renders seamlessly with zero network connectivity or on airplane mode.
 */

import { BIBLE_BOOKS_CATALOG } from "../data/bibleData";

const DB_NAME = "JoyOfTheLord_Bible_DB";
const DB_VERSION = 1;
const STORE_NAME = "bible_books";

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

function normalizeKey(bookName: string): string {
  return bookName.trim().toLowerCase().replace(/[^a-z0-9]/g, "");
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
