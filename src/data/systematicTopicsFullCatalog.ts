import { SystematicTopicItem } from "../types";
import { SYSTEMATIC_TOPICS_PART1 } from "./systematicTopicsPart1";
import { SYSTEMATIC_TOPICS_PART2 } from "./systematicTopicsPart2";
import { SYSTEMATIC_TOPICS_PART3 } from "./systematicTopicsPart3";
import { SYSTEMATIC_TOPICS_PART4 } from "./systematicTopicsPart4";
import { SYSTEMATIC_TOPICS_PART5 } from "./systematicTopicsPart5";

/**
 * 500 Systematic Theology & Core Christian Life Topics Master Catalog
 * Full compendium covering:
 * - Part 1: Topics 1-100 (Core Christian Life Topics)
 * - Part 2: Topics 101-200 (Systematic Theology Classic Tenets & Doctrines)
 * - Part 3: Topics 201-300 (Apostolic & Kingdom Mysteries, Altars & Spiritual Warfare)
 * - Part 4: Topics 301-400 (Christological Titles, Redemptive Names, Holiness & Ethics)
 * - Part 5: Topics 401-500 (Dispensations, Historic Creeds, Eschatology & Eternal Glory)
 */
export const SYSTEMATIC_TOPICS_500_CATALOG: SystematicTopicItem[] = [
  ...SYSTEMATIC_TOPICS_PART1,
  ...SYSTEMATIC_TOPICS_PART2,
  ...SYSTEMATIC_TOPICS_PART3,
  ...SYSTEMATIC_TOPICS_PART4,
  ...SYSTEMATIC_TOPICS_PART5,
];

export function getSystematicTopicById(id: string): SystematicTopicItem | undefined {
  return SYSTEMATIC_TOPICS_500_CATALOG.find(topic => topic.id === id);
}

export function getSystematicTopicByNumber(topicNumber: number): SystematicTopicItem | undefined {
  return SYSTEMATIC_TOPICS_500_CATALOG.find(topic => topic.topicNumber === topicNumber);
}

export function searchSystematicTopics(query: string): SystematicTopicItem[] {
  const q = query.toLowerCase().trim();
  if (!q) return SYSTEMATIC_TOPICS_500_CATALOG;
  return SYSTEMATIC_TOPICS_500_CATALOG.filter(topic => {
    return (
      topic.title.toLowerCase().includes(q) ||
      topic.category.toLowerCase().includes(q) ||
      topic.division.toLowerCase().includes(q) ||
      topic.theologicalSummary.toLowerCase().includes(q) ||
      topic.anchorScriptures.some(s => s.reference.toLowerCase().includes(q) || s.text.toLowerCase().includes(q)) ||
      (topic.keyInsights && topic.keyInsights.some(k => k.toLowerCase().includes(q)))
    );
  });
}

export const ALL_SYSTEMATIC_CATEGORIES = Array.from(
  new Set(SYSTEMATIC_TOPICS_500_CATALOG.map(t => t.category))
).sort();
