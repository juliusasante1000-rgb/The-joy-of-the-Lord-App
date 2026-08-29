import { FamousChristianQuote, GODS_GENERALS_QUOTES_PART_1 } from "./godsGeneralsQuotesPart1";
import { GODS_GENERALS_QUOTES_PART_2 } from "./godsGeneralsQuotesPart2";
import { GODS_GENERALS_QUOTES_PART_3 } from "./godsGeneralsQuotesPart3";
import { GODS_GENERALS_QUOTES_PART_4 } from "./godsGeneralsQuotesPart4";
import { GODS_GENERALS_QUOTES_PART_5 } from "./godsGeneralsQuotesPart5";
import { GODS_GENERALS_QUOTES_PART_6 } from "./godsGeneralsQuotesPart6";
import { GODS_GENERALS_QUOTES_PART_7 } from "./godsGeneralsQuotesPart7";
import { GODS_GENERALS_QUOTES_PART_8 } from "./godsGeneralsQuotesPart8";

export type { FamousChristianQuote };

export const GODS_GENERALS_QUOTES: FamousChristianQuote[] = [
  ...GODS_GENERALS_QUOTES_PART_1,
  ...GODS_GENERALS_QUOTES_PART_2,
  ...GODS_GENERALS_QUOTES_PART_3,
  ...GODS_GENERALS_QUOTES_PART_4,
  ...GODS_GENERALS_QUOTES_PART_5,
  ...GODS_GENERALS_QUOTES_PART_6,
  ...GODS_GENERALS_QUOTES_PART_7,
  ...GODS_GENERALS_QUOTES_PART_8
];

export const FAMOUS_AUTHORS_LIST: string[] = Array.from(
  new Set(GODS_GENERALS_QUOTES.map((q) => q.author))
).sort();

export const FAMOUS_CATEGORIES_LIST: string[] = Array.from(
  new Set(GODS_GENERALS_QUOTES.map((q) => q.category))
).sort();
