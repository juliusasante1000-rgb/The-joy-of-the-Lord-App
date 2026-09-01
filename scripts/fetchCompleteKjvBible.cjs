const fs = require("fs");
const path = require("path");

const BOOK_MAP = [
  { name: "Genesis", file: "Genesis.json" },
  { name: "Exodus", file: "Exodus.json" },
  { name: "Leviticus", file: "Leviticus.json" },
  { name: "Numbers", file: "Numbers.json" },
  { name: "Deuteronomy", file: "Deuteronomy.json" },
  { name: "Joshua", file: "Joshua.json" },
  { name: "Judges", file: "Judges.json" },
  { name: "Ruth", file: "Ruth.json" },
  { name: "1 Samuel", file: "1Samuel.json" },
  { name: "2 Samuel", file: "2Samuel.json" },
  { name: "1 Kings", file: "1Kings.json" },
  { name: "2 Kings", file: "2Kings.json" },
  { name: "1 Chronicles", file: "1Chronicles.json" },
  { name: "2 Chronicles", file: "2Chronicles.json" },
  { name: "Ezra", file: "Ezra.json" },
  { name: "Nehemiah", file: "Nehemiah.json" },
  { name: "Esther", file: "Esther.json" },
  { name: "Job", file: "Job.json" },
  { name: "Psalms", file: "Psalms.json" },
  { name: "Proverbs", file: "Proverbs.json" },
  { name: "Ecclesiastes", file: "Ecclesiastes.json" },
  { name: "Song of Solomon", file: "SongofSolomon.json" },
  { name: "Isaiah", file: "Isaiah.json" },
  { name: "Jeremiah", file: "Jeremiah.json" },
  { name: "Lamentations", file: "Lamentations.json" },
  { name: "Ezekiel", file: "Ezekiel.json" },
  { name: "Daniel", file: "Daniel.json" },
  { name: "Hosea", file: "Hosea.json" },
  { name: "Joel", file: "Joel.json" },
  { name: "Amos", file: "Amos.json" },
  { name: "Obadiah", file: "Obadiah.json" },
  { name: "Jonah", file: "Jonah.json" },
  { name: "Micah", file: "Micah.json" },
  { name: "Nahum", file: "Nahum.json" },
  { name: "Habakkuk", file: "Habakkuk.json" },
  { name: "Zephaniah", file: "Zephaniah.json" },
  { name: "Haggai", file: "Haggai.json" },
  { name: "Zechariah", file: "Zechariah.json" },
  { name: "Malachi", file: "Malachi.json" },
  { name: "Matthew", file: "Matthew.json" },
  { name: "Mark", file: "Mark.json" },
  { name: "Luke", file: "Luke.json" },
  { name: "John", file: "John.json" },
  { name: "Acts", file: "Acts.json" },
  { name: "Romans", file: "Romans.json" },
  { name: "1 Corinthians", file: "1Corinthians.json" },
  { name: "2 Corinthians", file: "2Corinthians.json" },
  { name: "Galatians", file: "Galatians.json" },
  { name: "Ephesians", file: "Ephesians.json" },
  { name: "Philippians", file: "Philippians.json" },
  { name: "Colossians", file: "Colossians.json" },
  { name: "1 Thessalonians", file: "1Thessalonians.json" },
  { name: "2 Thessalonians", file: "2Thessalonians.json" },
  { name: "1 Timothy", file: "1Timothy.json" },
  { name: "2 Timothy", file: "2Timothy.json" },
  { name: "Titus", file: "Titus.json" },
  { name: "Philemon", file: "Philemon.json" },
  { name: "Hebrews", file: "Hebrews.json" },
  { name: "James", file: "James.json" },
  { name: "1 Peter", file: "1Peter.json" },
  { name: "2 Peter", file: "2Peter.json" },
  { name: "1 John", file: "1John.json" },
  { name: "2 John", file: "2John.json" },
  { name: "3 John", file: "3John.json" },
  { name: "Jude", file: "Jude.json" },
  { name: "Revelation", file: "Revelation.json" }
];

const targetDir = path.join(__dirname, "..", "public", "bible", "kjv");
const serverTargetDir = path.join(__dirname, "..", "server_data", "bible_kjv");

if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}
if (!fs.existsSync(serverTargetDir)) {
  fs.mkdirSync(serverTargetDir, { recursive: true });
}

// Data validation function that throws an error if data is invalid or consecutive verses are identical
function validateBibleBookData(bookName, data) {
  if (!data || !Array.isArray(data.chapters) || data.chapters.length === 0) {
    throw new Error(`[Bible Validation Error] Book ${bookName} has no chapters`);
  }

  for (const ch of data.chapters) {
    const chNum = ch.chapter;
    if (!Array.isArray(ch.verses) || ch.verses.length === 0) {
      throw new Error(`[Bible Validation Error] ${bookName} Chapter ${chNum} has no verses`);
    }

    for (let i = 0; i < ch.verses.length; i++) {
      const current = ch.verses[i];
      const vNum = Number(current.verse);
      if (!current.text || current.text.trim().length === 0) {
        throw new Error(`[Bible Validation Error] Empty verse text at ${bookName} ${chNum}:${vNum}`);
      }

      if (i > 0) {
        const prev = ch.verses[i - 1];
        // Psalm 136 has repeating choral refrain ("for his mercy endureth for ever"), other books must not have identical consecutive verses
        if (current.text.trim().toLowerCase() === prev.text.trim().toLowerCase() && bookName !== "Psalms") {
          throw new Error(`[Bible Validation Error] Consecutive duplicate verse detected in ${bookName} ${chNum}:${prev.verse} and ${vNum}: "${current.text}"`);
        }
      }
    }
  }
}

async function fetchBookWithRetry(item) {
  const urls = [
    `https://cdn.jsdelivr.net/gh/aruljohn/Bible-kjv@master/${item.file}`,
    `https://raw.githubusercontent.com/aruljohn/Bible-kjv/master/${item.file}`
  ];

  for (const url of urls) {
    try {
      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        // Normalize schema
        const normalized = {
          book: item.name,
          chapters: data.chapters.map((c) => ({
            chapter: Number(c.chapter),
            verses: c.verses.map((v) => ({
              verse: Number(v.verse),
              text: String(v.text).replace(/\s+/g, " ").trim()
            }))
          }))
        };

        validateBibleBookData(item.name, normalized);
        return normalized;
      }
    } catch (err) {
      console.warn(`Retry failed for ${item.name} on ${url}:`, err.message);
    }
  }

  throw new Error(`Failed to fetch complete book ${item.name} (${item.file}) from all sources.`);
}

async function main() {
  console.log(`Starting download and verification of all ${BOOK_MAP.length} books of the Holy Bible...`);
  let successCount = 0;
  let totalVersesAll = 0;

  for (const item of BOOK_MAP) {
    try {
      const data = await fetchBookWithRetry(item);
      const safeFileName = item.name.toLowerCase().replace(/[^a-z0-9]/g, "_") + ".json";
      
      // Save under both normalized name and standard filename
      const filePath = path.join(targetDir, `${item.name}.json`);
      const serverFilePath = path.join(serverTargetDir, `${item.name}.json`);
      const safePath = path.join(targetDir, safeFileName);
      const safeServerPath = path.join(serverTargetDir, safeFileName);
      
      const jsonStr = JSON.stringify(data);
      fs.writeFileSync(filePath, jsonStr, "utf-8");
      fs.writeFileSync(serverFilePath, jsonStr, "utf-8");
      fs.writeFileSync(safePath, jsonStr, "utf-8");
      fs.writeFileSync(safeServerPath, jsonStr, "utf-8");

      successCount++;
      const totalVerses = data.chapters.reduce((acc, c) => acc + c.verses.length, 0);
      totalVersesAll += totalVerses;
      console.log(`✓ [${successCount}/${BOOK_MAP.length}] ${item.name}: ${data.chapters.length} chapters, ${totalVerses} verses saved and verified.`);
    } catch (err) {
      console.error(`✗ Error processing ${item.name}:`, err.message);
      process.exit(1);
    }
  }

  console.log(`\n🎉 Successfully verified and saved ALL ${successCount} books of the Holy Bible (${totalVersesAll} total verses)!`);
}

main();
