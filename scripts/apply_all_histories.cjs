const fs = require("fs");
const path = require("path");

const p1_3 = require("./historiesPart1_3.cjs");
const p4_6 = require("./historiesPart4_6.cjs");
const p7_8 = require("./historiesPart7_8.cjs");
const p9_10 = require("./historiesPart9_10.cjs");

const allHistories = {
  ...p1_3,
  ...p4_6,
  ...p7_8,
  ...p9_10
};

console.log(`Loaded ${Object.keys(allHistories).length} authentic histories in total.`);

const genericList = JSON.parse(fs.readFileSync("all_234_generic.json", "utf8"));
console.log(`Target generic list has ${genericList.length} items.`);

// Check for any missing keys
let missing = 0;
for (const item of genericList) {
  if (!allHistories[item.id]) {
    console.error(`Missing history for ${item.id} (${item.title}) in Part ${item.part}`);
    missing++;
  }
}

if (missing > 0) {
  console.error(`Total missing: ${missing}. Aborting.`);
  process.exit(1);
}

console.log("All 234 hymns have matching authentic histories! Proceeding with replacement...");

const genericPrefix = "Preserved through centuries of congregational worship and spiritual awakening, this classic hymn arose as a vibrant confession of faith amidst earthly trials. Its rhythmic stanzas and resolute meter were intentionally crafted to lodge sound doctrine and comforting truth securely within the heart and memory of worshippers.";

let totalReplaced = 0;

for (let p = 1; p <= 10; p++) {
  const filePath = path.join(__dirname, "..", `src/data/hymnsPart${p}.ts`);
  let content = fs.readFileSync(filePath, "utf8");
  const partItems = genericList.filter(item => item.part === p);
  let fileReplaced = 0;

  for (const item of partItems) {
    const newHistory = allHistories[item.id];
    // Find the hymn block by its ID
    const idPos = content.indexOf(`"id": "${item.id}"`);
    if (idPos === -1) {
      console.error(`Could not find id "${item.id}" in file ${filePath}`);
      continue;
    }

    // From idPos, find "historicalStory": "..."
    const histKeyPos = content.indexOf('"historicalStory":', idPos);
    if (histKeyPos === -1 || histKeyPos > idPos + 5000) {
      console.error(`Could not find historicalStory near id "${item.id}" in file ${filePath}`);
      continue;
    }

    // Find the opening quote
    const firstQuote = content.indexOf('"', histKeyPos + '"historicalStory":'.length);
    // Find the closing quote (careful with escaped quotes if any)
    let endQuote = firstQuote + 1;
    while (endQuote < content.length) {
      if (content[endQuote] === '"' && content[endQuote - 1] !== '\\') {
        break;
      }
      endQuote++;
    }

    const currentStory = content.substring(firstQuote + 1, endQuote);
    if (!currentStory.includes("Preserved through centuries")) {
      console.warn(`Hymn ${item.id} does not have the generic text; current is: ${currentStory.substring(0, 30)}...`);
    }

    // Escape quotes in newHistory if needed
    const escapedNewHistory = newHistory.replace(/"/g, '\\"');
    
    // Replace just this range
    content = content.substring(0, firstQuote + 1) + escapedNewHistory + content.substring(endQuote);
    fileReplaced++;
  }

  fs.writeFileSync(filePath, content, "utf8");
  console.log(`Part ${p}: successfully updated ${fileReplaced} hymns.`);
  totalReplaced += fileReplaced;
}

console.log(`Total replaced across all 10 files: ${totalReplaced} hymns.`);
