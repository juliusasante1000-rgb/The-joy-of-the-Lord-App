import { HymnItem } from "../types";
import { HYMNS_PART_1 } from "./hymnsPart1";
import { HYMNS_PART_2 } from "./hymnsPart2";
import { HYMNS_PART_3 } from "./hymnsPart3";
import { HYMNS_PART_4 } from "./hymnsPart4";
import { HYMNS_PART_5 } from "./hymnsPart5";
import { HYMNS_PART_6 } from "./hymnsPart6";
import { HYMNS_PART_7 } from "./hymnsPart7";
import { HYMNS_PART_8 } from "./hymnsPart8";
import { HYMNS_PART_9 } from "./hymnsPart9";
import { HYMNS_PART_10 } from "./hymnsPart10";

export const HYMN_CATEGORIES = [
  "All",
  "Old Spirituals & Revival",
  "Grace & Redemption",
  "Praise & Adoration",
  "Faith & Trust",
  "Cross & Resurrection",
  "Ancient & Classical",
  "Prayer & Consecration"
] as const;

/**
 * 1,000 Authentic, Unique Christian Hymnals:
 * 1,000 completely non-repetitive hymns across Church history with distinct lyrics,
 * full stanzas, rich historical narrative backgrounds, theological expositions,
 * scripture anchors, and melody notes.
 */
export const HYMNALS_COLLECTION: HymnItem[] = [
  ...HYMNS_PART_1,
  ...HYMNS_PART_2,
  ...HYMNS_PART_3,
  ...HYMNS_PART_4,
  ...HYMNS_PART_5,
  ...HYMNS_PART_6,
  ...HYMNS_PART_7,
  ...HYMNS_PART_8,
  ...HYMNS_PART_9,
  ...HYMNS_PART_10
];
