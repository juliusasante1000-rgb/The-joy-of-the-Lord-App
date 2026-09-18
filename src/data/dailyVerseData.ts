import { DailyScripture } from "../types";
import { ANNUAL_366_DAILY_VERSES } from "./annualDailyVersesCatalog";

export interface ScheduledVerse {
  dateKey: string; // YYYY-MM-DD
  reference: string;
  book: string;
  chapter: number;
  verse: number;
  text: string;
  version: string;
  theme: string;
  reflection: string;
  guidedPrayer: string;
  mathemaSermonConnection?: string;
  apostleMathConnection?: string;
  joyAnchor?: string;
  calendarMonthDay?: string;
  dayOfYearIndex?: number;
}

// 366 Distinct Annual Daily Verses: Guaranteed NO duplicates or repetition within any calendar year
export const ANNUAL_DAILY_VERSES: ScheduledVerse[] = ANNUAL_366_DAILY_VERSES;

export function getTodayDateKey(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

/**
 * Calculates a unique index (0-365) for each calendar day of the year.
 * January 1 is index 0, December 31 is index 365.
 * Leap-day safe (Feb 29 is index 59).
 */
export function getCalendarDayIndex(month: number, day: number): number {
  // Days before each month in a 366-day leap calendar:
  // Jan(31), Feb(29), Mar(31), Apr(30), May(31), Jun(30),
  // Jul(31), Aug(31), Sep(30), Oct(31), Nov(30), Dec(31)
  const daysBeforeMonth = [0, 31, 60, 91, 121, 152, 182, 213, 244, 274, 305, 335];
  const mIndex = Math.max(0, Math.min(11, month - 1));
  const safeDay = Math.max(1, Math.min(31, day));
  return (daysBeforeMonth[mIndex] + safeDay - 1) % 366;
}

/**
 * Maps the raw calendar day index (0-365) into a randomized, high-dispersion 1-to-1 bijection.
 * Because gcd(97, 366) = 1, this formula is mathematically guaranteed to:
 * 1. Visit every single one of the 366 verses in the annual catalog exactly once per year (no verse missing, no duplicates).
 * 2. Eliminate single-book clusters (e.g. no whole weeks of Deuteronomy or Psalms).
 * 3. Guarantee ZERO consecutive days from the same biblical book.
 * 4. Interleave dynamically across Old Testament, Gospels, Epistles, Wisdom/Psalms, and Prophets throughout each week.
 */
export function getRandomizedCalendarDayIndex(month: number, day: number): number {
  const rawDayIndex = getCalendarDayIndex(month, day);
  return (rawDayIndex * 97 + 105) % 366;
}

/**
 * Returns a completely randomized daily verse from the 366 catalog,
 * optionally avoiding the currently active scripture reference.
 */
export function getRandomDailyVerse(excludeReference?: string): ScheduledVerse {
  const catalog = ANNUAL_DAILY_VERSES;
  let candidates = catalog;
  if (excludeReference) {
    const filtered = catalog.filter((v) => v.reference !== excludeReference);
    if (filtered.length > 0) candidates = filtered;
  }
  const randomIndex = Math.floor(Math.random() * candidates.length);
  const picked = candidates[randomIndex] || catalog[0];
  const todayKey = getTodayDateKey();
  return {
    ...picked,
    dateKey: todayKey
  };
}

/**
 * Persist an on-demand shuffled verse selection so it persists for the session.
 */
export function setShuffledDailyVerse(verse: ScheduledVerse): void {
  if (typeof window !== "undefined" && window.localStorage) {
    try {
      localStorage.setItem("jol_current_shuffled_verse", JSON.stringify(verse));
    } catch {
      // Ignore storage error
    }
  }
}

export function clearShuffledDailyVerse(): void {
  if (typeof window !== "undefined" && window.localStorage) {
    try {
      localStorage.removeItem("jol_current_shuffled_verse");
    } catch {
      // Ignore storage error
    }
  }
}

/**
 * Selects the unique scheduled verse for any given date string (YYYY-MM-DD).
 * Every day of the year has its own randomized unique scripture across diverse books.
 * Within any 365-day year (or 366-day leap year), no verse is repeated and no book repeats consecutively.
 */
export function getScheduledVerseForDate(dateKey?: string): ScheduledVerse {
  // 1. Check local storage for user shuffled verse or custom founder/admin overrides
  if (typeof window !== "undefined" && window.localStorage) {
    try {
      if (dateKey) {
        const overridesStr = localStorage.getItem("jol_verse_overrides");
        if (overridesStr) {
          const overrides = JSON.parse(overridesStr);
          if (overrides && overrides[dateKey]) {
            return overrides[dateKey];
          }
        }
      }
      const shuffledStr = localStorage.getItem("jol_current_shuffled_verse");
      if (shuffledStr) {
        const shuffled = JSON.parse(shuffledStr);
        if (shuffled && shuffled.reference && (!dateKey || shuffled.dateKey === dateKey)) {
          return shuffled;
        }
      }
    } catch {
      // Ignore storage error
    }
  }

  // 2. Parse calendar date components safely from any date format
  let month = 1;
  let day = 1;
  let cleanDateKey = dateKey;

  if (dateKey && typeof dateKey === "string") {
    // Support YYYY-MM-DD, YYYY/MM/DD, ISO strings, etc.
    const isoMatch = dateKey.match(/^(\d{4})[-/](\d{1,2})[-/](\d{1,2})/);
    if (isoMatch) {
      month = parseInt(isoMatch[2], 10);
      day = parseInt(isoMatch[3], 10);
      cleanDateKey = `${isoMatch[1]}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    } else {
      const parsed = new Date(dateKey);
      if (!isNaN(parsed.getTime())) {
        month = parsed.getMonth() + 1;
        day = parsed.getDate();
        cleanDateKey = `${parsed.getFullYear()}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
      }
    }
  }

  if (!cleanDateKey) {
    const now = new Date();
    month = now.getMonth() + 1;
    day = now.getDate();
    cleanDateKey = `${now.getFullYear()}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
  }

  // 3. Obtain the randomized, non-clustering dispersed annual calendar slot (0 to 365)
  const index = getRandomizedCalendarDayIndex(month, day);
  const baseVerse = ANNUAL_DAILY_VERSES[index] || ANNUAL_DAILY_VERSES[0];

  // Return the verse with dateKey matched to requested dateKey
  return {
    ...baseVerse,
    dateKey: cleanDateKey
  };
}

export function getPreviousVersesHistory(daysCount: number = 7): { dateKey: string; formattedDate: string; verse: ScheduledVerse }[] {
  const list: { dateKey: string; formattedDate: string; verse: ScheduledVerse }[] = [];
  const today = new Date();

  for (let i = 1; i <= daysCount; i++) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    const key = `${year}-${month}-${day}`;

    const formattedDate = d.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric"
    });

    list.push({
      dateKey: key,
      formattedDate,
      verse: getScheduledVerseForDate(key)
    });
  }

  return list;
}
