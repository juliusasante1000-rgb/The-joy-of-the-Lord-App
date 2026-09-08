import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read authentic hymns from additionalHymnals.ts and additionalHymnalsPart2.ts
console.log("Checking authentic hymns...");
