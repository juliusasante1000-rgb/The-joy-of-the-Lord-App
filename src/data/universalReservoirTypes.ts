/**
 * Universal Permanent Content Reservoir Types
 * 
 * Defines schema for multi-outlet permanent content archiving across:
 * - Daily Devotions
 * - Guided Apostolic Prayers
 * - 5 Targeted Prayer Points
 * - Theological Exegesis / Explain Verse
 * - The Joy of the Lord Revelations
 * - Prophetic Rhema Words
 * - MathemaSermons
 * - ApostleMath Proofs & Lessons
 * - Historical Context & Archaeology
 * - Christian Systematic Doctrines
 * - Chapter Summaries
 */

export type ReservoirOutlet =
  | "devotion"
  | "prayer"
  | "prayer_points"
  | "explain_verse"
  | "joy_of_the_lord"
  | "rhema"
  | "mathemasermon"
  | "apostlemath"
  | "historical_context"
  | "doctrine"
  | "chapter_summary";

export interface UniversalReservoirItem {
  id: string;
  outlet: ReservoirOutlet;
  reference: string; // Scripture reference or topic key
  label: string;     // e.g. "Prayer A", "Prayer B", "Exposition A", "Devotion A", etc.
  title: string;
  subtitle?: string;
  keyScripture?: string;
  passageText?: string;
  data: any;         // Structured JSON representation for structured UI components
  formattedText: string; // Markdown text presentation
  source: "canonical_reservoir" | "ai_generated_reservoir";
  savedAt: string;
  theme?: string;
  category?: string;
}

export interface UniversalReservoirSelection {
  item: UniversalReservoirItem;
  totalStored: number;
  index: number;
  label: string;
  outlet: ReservoirOutlet;
}

export interface UniversalReservoirCatalogEntry {
  reference: string;
  outlet: ReservoirOutlet;
  count: number;
  sampleTitle: string;
  labels: string[];
}
