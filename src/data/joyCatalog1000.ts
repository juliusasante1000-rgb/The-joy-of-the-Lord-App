import { JoyOvercomingChallenge } from "../types";
import { JOY_CATALOG_PART1 } from "./joyCatalogPart1";
import { JOY_CATALOG_PART2 } from "./joyCatalogPart2";
import { JOY_CATALOG_PART3 } from "./joyCatalogPart3";
import { JOY_CATALOG_PART4 } from "./joyCatalogPart4";
import { JOY_CATALOG_PART5 } from "./joyCatalogPart5";

export const JOY_CATALOG_1000: JoyOvercomingChallenge[] = [
  ...JOY_CATALOG_PART1,
  ...JOY_CATALOG_PART2,
  ...JOY_CATALOG_PART3,
  ...JOY_CATALOG_PART4,
  ...JOY_CATALOG_PART5
];
