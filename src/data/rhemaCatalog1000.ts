import { RhemaWordItem } from "../types";
import { RHEMA_CATALOG_PART1 } from "./rhemaCatalogPart1";
import { RHEMA_CATALOG_PART2 } from "./rhemaCatalogPart2";
import { RHEMA_CATALOG_PART3 } from "./rhemaCatalogPart3";
import { RHEMA_CATALOG_PART4 } from "./rhemaCatalogPart4";

export const RHEMA_CATALOG_1000: RhemaWordItem[] = [
  ...RHEMA_CATALOG_PART1,
  ...RHEMA_CATALOG_PART2,
  ...RHEMA_CATALOG_PART3,
  ...RHEMA_CATALOG_PART4
];
