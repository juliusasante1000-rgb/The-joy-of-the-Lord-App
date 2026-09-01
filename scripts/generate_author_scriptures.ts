import fs from "fs";
import path from "path";

// List of all 201 Scriptures from User Request
interface ScriptureReq {
  num: number;
  testament: "Old Testament" | "New Testament";
  rawRef: string;
  isNew: boolean;
}

const RAW_SCRIPTURES: ScriptureReq[] = [
  // Old Testament (1-70)
  { num: 1, testament: "Old Testament", rawRef: "Genesis 3:1", isNew: false },
  { num: 2, testament: "Old Testament", rawRef: "Genesis 3:14–15", isNew: false },
  { num: 3, testament: "Old Testament", rawRef: "Exodus 14:13–14", isNew: true },
  { num: 4, testament: "Old Testament", rawRef: "Exodus 15:3", isNew: false },
  { num: 5, testament: "Old Testament", rawRef: "Numbers 6:24–26", isNew: false },
  { num: 6, testament: "Old Testament", rawRef: "Deuteronomy 3:22", isNew: false },
  { num: 7, testament: "Old Testament", rawRef: "Deuteronomy 6:6–7", isNew: false },
  { num: 8, testament: "Old Testament", rawRef: "Deuteronomy 28:7", isNew: false },
  { num: 9, testament: "Old Testament", rawRef: "Deuteronomy 31:6", isNew: false },
  { num: 10, testament: "Old Testament", rawRef: "Joshua 1:7", isNew: false },
  { num: 11, testament: "Old Testament", rawRef: "Joshua 1:9", isNew: false },
  { num: 12, testament: "Old Testament", rawRef: "2 Kings 6:15–19", isNew: false },
  { num: 13, testament: "Old Testament", rawRef: "2 Chronicles 7:14", isNew: false },
  { num: 14, testament: "Old Testament", rawRef: "2 Chronicles 20:15", isNew: false },
  { num: 15, testament: "Old Testament", rawRef: "Job 1:9", isNew: false },
  { num: 16, testament: "Old Testament", rawRef: "Job 22:28", isNew: true },
  { num: 17, testament: "Old Testament", rawRef: "Psalm 1:1–6", isNew: false },
  { num: 18, testament: "Old Testament", rawRef: "Psalm 3:1–3", isNew: false },
  { num: 19, testament: "Old Testament", rawRef: "Psalm 16:6–8", isNew: false },
  { num: 20, testament: "Old Testament", rawRef: "Psalm 18:1–2", isNew: false },
  { num: 21, testament: "Old Testament", rawRef: "Psalm 20:4", isNew: false },
  { num: 22, testament: "Old Testament", rawRef: "Psalm 20:7", isNew: false },
  { num: 23, testament: "Old Testament", rawRef: "Psalm 23:1", isNew: false },
  { num: 24, testament: "Old Testament", rawRef: "Psalm 23:1–6", isNew: false },
  { num: 25, testament: "Old Testament", rawRef: "Psalm 27:4", isNew: false },
  { num: 26, testament: "Old Testament", rawRef: "Psalm 27:12", isNew: false },
  { num: 27, testament: "Old Testament", rawRef: "Psalm 31:24", isNew: false },
  { num: 28, testament: "Old Testament", rawRef: "Psalm 34:1–22", isNew: false },
  { num: 29, testament: "Old Testament", rawRef: "Psalm 34:4–5, 8", isNew: false },
  { num: 30, testament: "Old Testament", rawRef: "Psalm 37:1–40", isNew: false },
  { num: 31, testament: "Old Testament", rawRef: "Psalm 37:12–16", isNew: false },
  { num: 32, testament: "Old Testament", rawRef: "Psalm 44:5", isNew: false },
  { num: 33, testament: "Old Testament", rawRef: "Psalm 46:1–3", isNew: false },
  { num: 34, testament: "Old Testament", rawRef: "Psalm 56:3", isNew: false },
  { num: 35, testament: "Old Testament", rawRef: "Psalm 73:26", isNew: false },
  { num: 36, testament: "Old Testament", rawRef: "Psalm 84:11", isNew: false },
  { num: 37, testament: "Old Testament", rawRef: "Psalm 91:1–16", isNew: false },
  { num: 38, testament: "Old Testament", rawRef: "Psalm 94:18–19", isNew: false },
  { num: 39, testament: "Old Testament", rawRef: "Psalm 107:1", isNew: false },
  { num: 40, testament: "Old Testament", rawRef: "Psalm 118:12–13", isNew: false },
  { num: 41, testament: "Old Testament", rawRef: "Psalm 119:50", isNew: false },
  { num: 42, testament: "Old Testament", rawRef: "Psalm 121:7–8", isNew: false },
  { num: 43, testament: "Old Testament", rawRef: "Psalm 124:1–8", isNew: false },
  { num: 44, testament: "Old Testament", rawRef: "Psalm 127:1", isNew: false },
  { num: 45, testament: "Old Testament", rawRef: "Psalm 143:8", isNew: false },
  { num: 46, testament: "Old Testament", rawRef: "Proverbs 3:5–6", isNew: false },
  { num: 47, testament: "Old Testament", rawRef: "Proverbs 16:3", isNew: false },
  { num: 48, testament: "Old Testament", rawRef: "Proverbs 17:17", isNew: false },
  { num: 49, testament: "Old Testament", rawRef: "Proverbs 18:10", isNew: false },
  { num: 50, testament: "Old Testament", rawRef: "Proverbs 21:21", isNew: false },
  { num: 51, testament: "Old Testament", rawRef: "Ecclesiastes 3:11", isNew: false },
  { num: 52, testament: "Old Testament", rawRef: "Isaiah 12:2", isNew: false },
  { num: 53, testament: "Old Testament", rawRef: "Isaiah 26:3", isNew: false },
  { num: 54, testament: "Old Testament", rawRef: "Isaiah 40:28–31", isNew: false },
  { num: 55, testament: "Old Testament", rawRef: "Isaiah 40:31", isNew: false },
  { num: 56, testament: "Old Testament", rawRef: "Isaiah 41:10", isNew: false },
  { num: 57, testament: "Old Testament", rawRef: "Isaiah 41:13", isNew: false },
  { num: 58, testament: "Old Testament", rawRef: "Isaiah 43:2", isNew: false },
  { num: 59, testament: "Old Testament", rawRef: "Isaiah 54:15", isNew: true },
  { num: 60, testament: "Old Testament", rawRef: "Isaiah 54:17", isNew: false },
  { num: 61, testament: "Old Testament", rawRef: "Isaiah 60:1–22", isNew: false },
  { num: 62, testament: "Old Testament", rawRef: "Isaiah 61:1–11", isNew: false },
  { num: 63, testament: "Old Testament", rawRef: "Jeremiah 17:7–8", isNew: false },
  { num: 64, testament: "Old Testament", rawRef: "Jeremiah 29:11", isNew: false },
  { num: 65, testament: "Old Testament", rawRef: "Lamentations 3:22–23", isNew: false },
  { num: 66, testament: "Old Testament", rawRef: "Lamentations 3:37", isNew: false },
  { num: 67, testament: "Old Testament", rawRef: "Daniel 10:1–21", isNew: false },
  { num: 68, testament: "Old Testament", rawRef: "Habakkuk 2:13", isNew: false },
  { num: 69, testament: "Old Testament", rawRef: "Zechariah 4:6", isNew: false },
  { num: 70, testament: "Old Testament", rawRef: "Zechariah 4:9", isNew: false },

  // New Testament (71-201)
  { num: 71, testament: "New Testament", rawRef: "Matthew 4:1", isNew: false },
  { num: 72, testament: "New Testament", rawRef: "Matthew 4:10–11", isNew: false },
  { num: 73, testament: "New Testament", rawRef: "Matthew 6:13", isNew: false },
  { num: 74, testament: "New Testament", rawRef: "Matthew 6:31–34", isNew: false },
  { num: 75, testament: "New Testament", rawRef: "Matthew 11:28", isNew: false },
  { num: 76, testament: "New Testament", rawRef: "Matthew 16:18", isNew: false },
  { num: 77, testament: "New Testament", rawRef: "Matthew 17:20", isNew: false },
  { num: 78, testament: "New Testament", rawRef: "Matthew 18:18–19", isNew: false },
  { num: 79, testament: "New Testament", rawRef: "Matthew 18:18–20", isNew: false },
  { num: 80, testament: "New Testament", rawRef: "Matthew 25:41", isNew: false },
  { num: 81, testament: "New Testament", rawRef: "Mark 10:27", isNew: false },
  { num: 82, testament: "New Testament", rawRef: "Luke 1:37", isNew: false },
  { num: 83, testament: "New Testament", rawRef: "Luke 10:19", isNew: false },
  { num: 84, testament: "New Testament", rawRef: "John 1:1", isNew: false },
  { num: 85, testament: "New Testament", rawRef: "John 1:1–51", isNew: false },
  { num: 86, testament: "New Testament", rawRef: "John 6:68", isNew: false },
  { num: 87, testament: "New Testament", rawRef: "John 8:32", isNew: false },
  { num: 88, testament: "New Testament", rawRef: "John 8:44", isNew: false },
  { num: 89, testament: "New Testament", rawRef: "John 10:10", isNew: false },
  { num: 90, testament: "New Testament", rawRef: "John 11:25–26", isNew: false },
  { num: 91, testament: "New Testament", rawRef: "John 12:24", isNew: false },
  { num: 92, testament: "New Testament", rawRef: "John 12:31", isNew: false },
  { num: 93, testament: "New Testament", rawRef: "John 14:30", isNew: false },
  { num: 94, testament: "New Testament", rawRef: "John 15:13", isNew: false },
  { num: 95, testament: "New Testament", rawRef: "John 16:33", isNew: false },
  { num: 96, testament: "New Testament", rawRef: "Romans 1:17", isNew: false },
  { num: 97, testament: "New Testament", rawRef: "Romans 6:1–23", isNew: false },
  { num: 98, testament: "New Testament", rawRef: "Romans 6:6", isNew: false },
  { num: 99, testament: "New Testament", rawRef: "Romans 8:7", isNew: false },
  { num: 100, testament: "New Testament", rawRef: "Romans 8:18", isNew: false },
  { num: 101, testament: "New Testament", rawRef: "Romans 8:28", isNew: false },
  { num: 102, testament: "New Testament", rawRef: "Romans 8:31", isNew: false },
  { num: 103, testament: "New Testament", rawRef: "Romans 8:37", isNew: false },
  { num: 104, testament: "New Testament", rawRef: "Romans 8:37–39", isNew: false },
  { num: 105, testament: "New Testament", rawRef: "Romans 12:12", isNew: false },
  { num: 106, testament: "New Testament", rawRef: "Romans 12:21", isNew: false },
  { num: 107, testament: "New Testament", rawRef: "Romans 13:12–14", isNew: false },
  { num: 108, testament: "New Testament", rawRef: "Romans 15:13", isNew: false },
  { num: 109, testament: "New Testament", rawRef: "1 Corinthians 10:13", isNew: false },
  { num: 110, testament: "New Testament", rawRef: "1 Corinthians 13:12", isNew: false },
  { num: 111, testament: "New Testament", rawRef: "1 Corinthians 15:57", isNew: false },
  { num: 112, testament: "New Testament", rawRef: "1 Corinthians 15:58", isNew: false },
  { num: 113, testament: "New Testament", rawRef: "1 Corinthians 16:13", isNew: false },
  { num: 114, testament: "New Testament", rawRef: "1 Corinthians 16:13–14", isNew: false },
  { num: 115, testament: "New Testament", rawRef: "2 Corinthians 1:3–4", isNew: false },
  { num: 116, testament: "New Testament", rawRef: "2 Corinthians 3:17", isNew: false },
  { num: 117, testament: "New Testament", rawRef: "2 Corinthians 4:16–18", isNew: false },
  { num: 118, testament: "New Testament", rawRef: "2 Corinthians 4:17–18", isNew: false },
  { num: 119, testament: "New Testament", rawRef: "2 Corinthians 5:17", isNew: false },
  { num: 120, testament: "New Testament", rawRef: "2 Corinthians 10:3", isNew: false },
  { num: 121, testament: "New Testament", rawRef: "2 Corinthians 10:3–4", isNew: false },
  { num: 122, testament: "New Testament", rawRef: "2 Corinthians 10:3–5", isNew: false },
  { num: 123, testament: "New Testament", rawRef: "2 Corinthians 10:4", isNew: false },
  { num: 124, testament: "New Testament", rawRef: "2 Corinthians 10:4–5", isNew: false },
  { num: 125, testament: "New Testament", rawRef: "2 Corinthians 10:5", isNew: false },
  { num: 126, testament: "New Testament", rawRef: "2 Corinthians 11:14", isNew: false },
  { num: 127, testament: "New Testament", rawRef: "Galatians 3:26–27", isNew: false },
  { num: 128, testament: "New Testament", rawRef: "Galatians 3:27", isNew: false },
  { num: 129, testament: "New Testament", rawRef: "Galatians 4:1", isNew: false },
  { num: 130, testament: "New Testament", rawRef: "Galatians 5:1", isNew: false },
  { num: 131, testament: "New Testament", rawRef: "Galatians 5:17", isNew: false },
  { num: 132, testament: "New Testament", rawRef: "Ephesians 2:5–11", isNew: true },
  { num: 133, testament: "New Testament", rawRef: "Ephesians 3:17–21", isNew: false },
  { num: 134, testament: "New Testament", rawRef: "Ephesians 4:32", isNew: false },
  { num: 135, testament: "New Testament", rawRef: "Ephesians 6:1–24", isNew: false },
  { num: 136, testament: "New Testament", rawRef: "Ephesians 6:10", isNew: false },
  { num: 137, testament: "New Testament", rawRef: "Ephesians 6:10–11", isNew: false },
  { num: 138, testament: "New Testament", rawRef: "Ephesians 6:10–18", isNew: false },
  { num: 139, testament: "New Testament", rawRef: "Ephesians 6:11", isNew: false },
  { num: 140, testament: "New Testament", rawRef: "Ephesians 6:11–12", isNew: false },
  { num: 141, testament: "New Testament", rawRef: "Ephesians 6:12", isNew: false },
  { num: 142, testament: "New Testament", rawRef: "Ephesians 6:13", isNew: false },
  { num: 143, testament: "New Testament", rawRef: "Ephesians 6:14", isNew: false },
  { num: 144, testament: "New Testament", rawRef: "Philippians 1:6", isNew: true },
  { num: 145, testament: "New Testament", rawRef: "Philippians 2:3–4", isNew: false },
  { num: 146, testament: "New Testament", rawRef: "Philippians 2:5–11", isNew: false },
  { num: 147, testament: "New Testament", rawRef: "Philippians 3:7–9", isNew: false },
  { num: 148, testament: "New Testament", rawRef: "Philippians 4:6–7", isNew: false },
  { num: 149, testament: "New Testament", rawRef: "Philippians 4:8", isNew: false },
  { num: 150, testament: "New Testament", rawRef: "Philippians 4:13", isNew: false },
  { num: 151, testament: "New Testament", rawRef: "Colossians 1:13–14", isNew: false },
  { num: 152, testament: "New Testament", rawRef: "Colossians 2:15", isNew: false },
  { num: 153, testament: "New Testament", rawRef: "Colossians 3:23–24", isNew: false },
  { num: 154, testament: "New Testament", rawRef: "1 Thessalonians 5:6", isNew: false },
  { num: 155, testament: "New Testament", rawRef: "1 Thessalonians 5:11", isNew: false },
  { num: 156, testament: "New Testament", rawRef: "2 Thessalonians 2:9–10", isNew: false },
  { num: 157, testament: "New Testament", rawRef: "2 Thessalonians 3:3", isNew: false },
  { num: 158, testament: "New Testament", rawRef: "1 Timothy 4:15", isNew: false },
  { num: 159, testament: "New Testament", rawRef: "1 Timothy 6:12", isNew: false },
  { num: 160, testament: "New Testament", rawRef: "2 Timothy 3:15", isNew: false },
  { num: 161, testament: "New Testament", rawRef: "2 Timothy 4:18", isNew: false },
  { num: 162, testament: "New Testament", rawRef: "Hebrews 2:14", isNew: false },
  { num: 163, testament: "New Testament", rawRef: "Hebrews 10:19–23", isNew: false },
  { num: 164, testament: "New Testament", rawRef: "Hebrews 10:22", isNew: false },
  { num: 165, testament: "New Testament", rawRef: "Hebrews 12:1–2", isNew: false },
  { num: 166, testament: "New Testament", rawRef: "James 1:2–4", isNew: false },
  { num: 167, testament: "New Testament", rawRef: "James 1:13", isNew: false },
  { num: 168, testament: "New Testament", rawRef: "James 2:19", isNew: false },
  { num: 169, testament: "New Testament", rawRef: "James 4:7", isNew: false },
  { num: 170, testament: "New Testament", rawRef: "James 4:8", isNew: false },
  { num: 171, testament: "New Testament", rawRef: "1 Peter 2:9–11", isNew: false },
  { num: 172, testament: "New Testament", rawRef: "1 Peter 3:18", isNew: false },
  { num: 173, testament: "New Testament", rawRef: "1 Peter 5:6–7", isNew: false },
  { num: 174, testament: "New Testament", rawRef: "1 Peter 5:7", isNew: false },
  { num: 175, testament: "New Testament", rawRef: "1 Peter 5:8", isNew: false },
  { num: 176, testament: "New Testament", rawRef: "1 Peter 5:8–9", isNew: false },
  { num: 177, testament: "New Testament", rawRef: "1 Peter 5:10", isNew: false },
  { num: 178, testament: "New Testament", rawRef: "1 John 3:1–3", isNew: false },
  { num: 179, testament: "New Testament", rawRef: "1 John 3:8", isNew: false },
  { num: 180, testament: "New Testament", rawRef: "1 John 3:22", isNew: false },
  { num: 181, testament: "New Testament", rawRef: "1 John 4:4", isNew: false },
  { num: 182, testament: "New Testament", rawRef: "1 John 4:16", isNew: false },
  { num: 183, testament: "New Testament", rawRef: "1 John 5:4", isNew: false },
  { num: 184, testament: "New Testament", rawRef: "1 John 5:4–5", isNew: false },
  { num: 185, testament: "New Testament", rawRef: "1 John 5:14–15", isNew: false },
  { num: 186, testament: "New Testament", rawRef: "Revelation 1:1", isNew: false },
  { num: 187, testament: "New Testament", rawRef: "Revelation 2:9", isNew: false },
  { num: 188, testament: "New Testament", rawRef: "Revelation 3:9", isNew: false },
  { num: 189, testament: "New Testament", rawRef: "Revelation 7:3", isNew: false },
  { num: 190, testament: "New Testament", rawRef: "Revelation 7:13", isNew: false },
  { num: 191, testament: "New Testament", rawRef: "Revelation 12:3", isNew: false },
  { num: 192, testament: "New Testament", rawRef: "Revelation 12:4", isNew: false },
  { num: 193, testament: "New Testament", rawRef: "Revelation 12:7–9", isNew: false },
  { num: 194, testament: "New Testament", rawRef: "Revelation 12:9", isNew: false },
  { num: 195, testament: "New Testament", rawRef: "Revelation 12:10", isNew: false },
  { num: 196, testament: "New Testament", rawRef: "Revelation 12:11", isNew: false },
  { num: 197, testament: "New Testament", rawRef: "Revelation 12:12", isNew: false },
  { num: 198, testament: "New Testament", rawRef: "Revelation 13:8", isNew: false },
  { num: 199, testament: "New Testament", rawRef: "Revelation 17:14", isNew: false },
  { num: 200, testament: "New Testament", rawRef: "Revelation 20:10", isNew: false },
  { num: 201, testament: "New Testament", rawRef: "Revelation 21:4", isNew: false }
];

// Book JSON file cache
const bookDataCache: Record<string, any> = {};

function loadBook(bookName: string) {
  const normalized = bookName.trim();
  if (bookDataCache[normalized]) return bookDataCache[normalized];
  
  const files = [
    `${normalized.toLowerCase().replace(/\s+/g, "_")}.json`,
    `${normalized}.json`,
    `${normalized.toLowerCase().replace(/\s+/g, " ")}.json`
  ];
  
  for (const fn of files) {
    const p = path.join(process.cwd(), "public", "bible", "kjv", fn);
    if (fs.existsSync(p)) {
      const data = JSON.parse(fs.readFileSync(p, "utf-8"));
      bookDataCache[normalized] = data;
      return data;
    }
  }
  
  // Try direct match
  const allFiles = fs.readdirSync(path.join(process.cwd(), "public", "bible", "kjv"));
  for (const f of allFiles) {
    if (f.toLowerCase().startsWith(normalized.toLowerCase().substring(0, 4))) {
      const p = path.join(process.cwd(), "public", "bible", "kjv", f);
      const data = JSON.parse(fs.readFileSync(p, "utf-8"));
      bookDataCache[normalized] = data;
      return data;
    }
  }
  
  throw new Error(`Could not find Bible book file for: ${bookName}`);
}

function parseReference(ref: string): { book: string; chapter: number; verseRange: string } {
  // e.g. "Genesis 3:14–15", "Psalm 34:4–5, 8", "1 Corinthians 16:13–14"
  const match = ref.match(/^(.+?)\s+(\d+):(.+)$/);
  if (!match) throw new Error(`Invalid reference format: ${ref}`);
  return {
    book: match[1].trim(),
    chapter: parseInt(match[2], 10),
    verseRange: match[3].trim()
  };
}

function getVersesText(bookName: string, chapter: number, verseRange: string): string {
  const bookData = loadBook(bookName);
  const chData = bookData.chapters.find((c: any) => c.chapter === chapter);
  if (!chData) {
    throw new Error(`Chapter ${chapter} not found in ${bookName}`);
  }

  // Check if verseRange is a single verse: e.g. "1"
  if (/^\d+$/.test(verseRange)) {
    const vNum = parseInt(verseRange, 10);
    const v = chData.verses.find((item: any) => item.verse === vNum);
    return v ? v.text : `[${bookName} ${chapter}:${vNum}]`;
  }

  // Check if range: e.g. "14–15" or "1-6" or "1–22"
  const dashMatch = verseRange.match(/^(\d+)[-–](\d+)$/);
  if (dashMatch) {
    const start = parseInt(dashMatch[1], 10);
    const end = parseInt(dashMatch[2], 10);
    const selected = chData.verses.filter((v: any) => v.verse >= start && v.verse <= end);
    if (selected.length > 0) {
      return selected.map((v: any) => v.text).join(" ");
    }
  }

  // Check compound e.g. "4–5, 8"
  if (verseRange.includes(",")) {
    const parts = verseRange.split(",").map(p => p.trim());
    const matchedVerses: any[] = [];
    for (const part of parts) {
      const pDash = part.match(/^(\d+)[-–](\d+)$/);
      if (pDash) {
        const s = parseInt(pDash[1], 10);
        const e = parseInt(pDash[2], 10);
        matchedVerses.push(...chData.verses.filter((v: any) => v.verse >= s && v.verse <= e));
      } else {
        const vn = parseInt(part, 10);
        const single = chData.verses.find((v: any) => v.verse === vn);
        if (single) matchedVerses.push(single);
      }
    }
    if (matchedVerses.length > 0) {
      return matchedVerses.map(v => v.text).join(" ");
    }
  }

  // Fallback to first verse or entire chapter preview
  return chData.verses[0]?.text || "";
}

// Generate the rich entries
const results = RAW_SCRIPTURES.map((item) => {
  const { book, chapter, verseRange } = parseReference(item.rawRef);
  const text = getVersesText(book, chapter, verseRange);
  
  // Derive category and theme
  let category: "Destiny & Decisions" | "Purpose & Calling" | "Wisdom & Relationships" | "Grit & Endurance" | "Divine Favor & Joy" | "Mindset & Growth" = "Divine Favor & Joy";
  let theme = "Divine Strength & Unfailing Covenant";
  let authorReflection = `Anchoring your heart on ${item.rawRef} provides unwavering spiritual fortitude. When you align your thoughts with God's infallible Word, fear dissolves and divine victory prevails.`;
  let keyDeclaration = `I stand firmly on the promise of ${item.rawRef}; God's power and favor surround my life!`;
  let tags = [book, "Faith", "Victory", "Strength", "Scripture"];

  // Specific contextual themes and reflections based on scripture
  if (item.rawRef.includes("Genesis 3:1")) {
    category = "Mindset & Growth";
    theme = "Discerning Spiritual Subtlety & Deception";
    authorReflection = "The enemy's primary strategy has always been to question God's Word ('Yea, hath God said?'). Guard your heart with discerning truth and reject every subtle doubt.";
    keyDeclaration = "I hold fast to God's unchanging Word and refuse every deceitful suggestion of the enemy!";
    tags = ["Genesis", "Discernment", "Truth", "Mindset", "Spiritual Warfare"];
  } else if (item.rawRef.includes("Genesis 3:14–15")) {
    category = "Destiny & Decisions";
    theme = "The Protoevangelium & The Seed's Victory";
    authorReflection = "Right at the Fall, God declared the eternal victory of the Seed of the woman over the serpent. Christ has crushed Satan's head at Calvary!";
    keyDeclaration = "In Christ, the serpent's power is crushed beneath my feet!";
    tags = ["Genesis", "Redemption", "Victory", "Prophecy", "Christ"];
  } else if (item.rawRef.includes("Exodus 14:13–14")) {
    category = "Divine Favor & Joy";
    theme = "Standing Still to See God's Deliverance";
    authorReflection = "When backed against impossible obstacles, the commandment is not panic but faith: 'Fear ye not, stand still, and see the salvation of the LORD.' God fights for you while you hold your peace.";
    keyDeclaration = "The LORD fights for me today; I hold my peace and witness His miraculous deliverance!";
    tags = ["Exodus", "Deliverance", "Faith", "Peace", "Red Sea"];
  } else if (item.rawRef.includes("Exodus 15:3")) {
    category = "Grit & Endurance";
    theme = "The LORD is a Man of War";
    authorReflection = "Our God is not passive in the face of spiritual darkness. Jehovah is a mighty warrior who overthrows every Pharaoh and breaks every heavy yoke.";
    keyDeclaration = "The LORD is my warrior and champion; no weapon formed against me shall prosper!";
    tags = ["Exodus", "Warfare", "Power", "God of Battles", "Victory"];
  } else if (item.rawRef.includes("Numbers 6:24–26")) {
    category = "Divine Favor & Joy";
    theme = "The Aaronic Priestly Blessing";
    authorReflection = "Receive the triple blessing of Jehovah: His protection, the radiance of His shining face, and the unshakeable shalom peace that surpasses all human understanding.";
    keyDeclaration = "The LORD blesses me, keeps me, makes His face shine upon me, and gives me unending peace!";
    tags = ["Numbers", "Aaronic Blessing", "Favor", "Peace", "Presence"];
  } else if (item.rawRef.includes("Deuteronomy 28:7")) {
    category = "Grit & Endurance";
    theme = "Enemies Fleeing in Seven Directions";
    authorReflection = "When you walk in covenant alignment with God, adversaries who come against you in one way will be scattered and flee before you in seven ways.";
    keyDeclaration = "Every enemy that rises against my destiny is scattered and flees in seven directions before the presence of the Lord!";
    tags = ["Deuteronomy", "Covenant", "Victory", "Scattered Enemies", "Protection"];
  } else if (item.rawRef.includes("Joshua 1:7") || item.rawRef.includes("Joshua 1:9")) {
    category = "Purpose & Calling";
    theme = "Unshakeable Courage & Meditating on the Law";
    authorReflection = "True courage is not the absence of obstacles, but the conscious awareness that the LORD thy God is with thee whithersoever thou goest.";
    keyDeclaration = "I am strong and of good courage; fear is dismantled because God is with me in every step!";
    tags = ["Joshua", "Courage", "Success", "Meditation", "Victory"];
  } else if (item.rawRef.includes("2 Kings 6:15–19")) {
    category = "Mindset & Growth";
    theme = "Spiritual Vision & Heavenly Armies";
    authorReflection = "Elisha's prayer was simple yet transformative: 'LORD, open his eyes, that he may see.' They that be with us are far more than they that be with them!";
    keyDeclaration = "My spiritual eyes are opened to see the mountain filled with horses and chariots of fire defending my life!";
    tags = ["2 Kings", "Spiritual Sight", "Angels", "Heavenly Host", "Victory"];
  } else if (item.rawRef.includes("2 Chronicles 7:14")) {
    category = "Wisdom & Relationships";
    theme = "Humility, Prayer & National Revival";
    authorReflection = "Revival begins when God's people humble themselves, pray, seek His face, and turn from wicked ways. God promises to hear from heaven and heal the land.";
    keyDeclaration = "I humble myself in fervent prayer; God hears my cry, forgives my sin, and heals my territory!";
    tags = ["2 Chronicles", "Prayer", "Humility", "Revival", "Healing"];
  } else if (item.rawRef.includes("Job 22:28")) {
    category = "Destiny & Decisions";
    theme = "Decreeing a Thing in Faith";
    authorReflection = "Thou shalt also decree a thing, and it shall be established unto thee: and the light shall shine upon thy ways. Release faith-filled words over your future.";
    keyDeclaration = "I decree the counsel of God over my life and work; it is established, and divine light illuminates my path!";
    tags = ["Job", "Decree", "Faith Words", "Establishment", "Divine Light"];
  } else if (item.rawRef.includes("Psalm 23")) {
    category = "Divine Favor & Joy";
    theme = "The Lord is My Shepherd";
    authorReflection = "Under the Shepherd's care, lack is eliminated. Even in the valley of the shadow of death, His rod and staff comfort us, and our cup runs over with goodness and mercy.";
    keyDeclaration = "The LORD is my shepherd; I shall not want! Goodness and mercy follow me all the days of my life.";
    tags = ["Psalms", "Shepherd", "Provision", "Valley of Shadows", "Anointing"];
  } else if (item.rawRef.includes("Psalm 91")) {
    category = "Divine Favor & Joy";
    theme = "The Secret Place of the Most High";
    authorReflection = "Dwelling under the shadow of the Almighty provides complete supernatural immunity against the snare of the fowler and the noisome pestilence.";
    keyDeclaration = "I dwell in the secret place of the Most High; no evil shall befall me, nor any plague come near my dwelling!";
    tags = ["Psalms", "Secret Place", "Protection", "Angelic Guard", "Refuge"];
  } else if (item.rawRef.includes("Proverbs 3:5–6")) {
    category = "Wisdom & Relationships";
    theme = "Trusting the Lord with All Thine Heart";
    authorReflection = "Lean not unto thine own understanding. In all thy ways acknowledge Him, and He shall direct thy paths with divine precision.";
    keyDeclaration = "I trust the Lord with all my heart and acknowledge Him in all my ways; He directs my steps into victory!";
    tags = ["Proverbs", "Trust", "Guidance", "Wisdom", "Direction"];
  } else if (item.rawRef.includes("Proverbs 16:3")) {
    category = "Purpose & Calling";
    theme = "Committing Your Works to the Lord";
    authorReflection = "Commit thy works unto the LORD, and thy thoughts shall be established. Surrender every endeavor into His hands for divine stabilization.";
    keyDeclaration = "I commit all my work, projects, and plans to the Lord; my thoughts and steps are established!";
    tags = ["Proverbs", "Commitment", "Plans", "Success", "Excellence"];
  } else if (item.rawRef.includes("Isaiah 40:31")) {
    category = "Grit & Endurance";
    theme = "Mounting Up on Wings as Eagles";
    authorReflection = "They that wait upon the LORD shall renew their strength; they shall mount up with wings as eagles; they shall run, and not be weary; and they shall walk, and not faint.";
    keyDeclaration = "I wait upon the Lord and my strength is supernaturally renewed; I mount up on wings of eagle-faith!";
    tags = ["Isaiah", "Waiting on God", "Eagle Strength", "Endurance", "Renewal"];
  } else if (item.rawRef.includes("Isaiah 54:15")) {
    category = "Grit & Endurance";
    theme = "Enemy Gatherings Falling for Your Sake";
    authorReflection = "Behold, they shall surely gather together, but not by me: whosoever shall gather together against thee shall fall for thy sake. Unholy alliances against God's anointed are broken.";
    keyDeclaration = "Every ungodly gathering or plot against my life and calling falls and is dismantled for my sake!";
    tags = ["Isaiah", "Deliverance", "Covenant Defense", "Warfare", "Overcoming"];
  } else if (item.rawRef.includes("Isaiah 54:17")) {
    category = "Grit & Endurance";
    theme = "No Weapon Formed Shall Prosper";
    authorReflection = "No weapon that is formed against thee shall prosper; and every tongue that shall rise against thee in judgment thou shalt condemn. This is the heritage of the servants of the LORD.";
    keyDeclaration = "No weapon formed against me shall prosper, and every accusatory tongue is condemned by the blood of Jesus!";
    tags = ["Isaiah", "Heritage", "Protection", "Victory", "Righteousness"];
  } else if (item.rawRef.includes("Jeremiah 29:11")) {
    category = "Destiny & Decisions";
    theme = "Thoughts of Peace & an Expected End";
    authorReflection = "For I know the thoughts that I think toward you, saith the LORD, thoughts of peace, and not of evil, to give you an expected end and a glorious future.";
    keyDeclaration = "God's plans for my life are thoughts of peace, hope, and an extraordinary expected end!";
    tags = ["Jeremiah", "Destiny", "Future", "Hope", "Peace"];
  } else if (item.rawRef.includes("Zechariah 4:6")) {
    category = "Purpose & Calling";
    theme = "Not by Might nor Power, but by My Spirit";
    authorReflection = "Human intellect and physical strength have limits, but the Spirit of the Living God accomplishes what flesh could never attain. Mountains become a plain!";
    keyDeclaration = "My mountains become level ground; I triumph not by human might, but by the Holy Spirit!";
    tags = ["Zechariah", "Holy Spirit", "Grace", "Overcoming Mountains", "Power"];
  } else if (item.rawRef.includes("Matthew 18:18")) {
    category = "Purpose & Calling";
    theme = "Kingdom Binding & Loosing Authority";
    authorReflection = "Whatsoever ye shall bind on earth shall be bound in heaven: and whatsoever ye shall loose on earth shall be loosed in heaven. Exercise your delegated authority in Christ.";
    keyDeclaration = "I bind every spiritual hindrance and loose God's blessings, favor, and power in the Name of Jesus!";
    tags = ["Matthew", "Kingdom Authority", "Binding and Loosing", "Prayer", "Victory"];
  } else if (item.rawRef.includes("Luke 1:37")) {
    category = "Divine Favor & Joy";
    theme = "Nothing is Impossible with God";
    authorReflection = "For with God nothing shall be impossible. Every promise in His Word carries the intrinsic divine power to bring itself to pass.";
    keyDeclaration = "With God nothing is impossible in my life; every obstacle bows to His sovereign power!";
    tags = ["Luke", "Faith", "Miracles", "Possibility", "Omnipotence"];
  } else if (item.rawRef.includes("John 10:10")) {
    category = "Divine Favor & Joy";
    theme = "Abundant Life in Christ";
    authorReflection = "The thief cometh not, but for to steal, and to kill, and to destroy: I am come that they might have life, and that they might have it more abundantly.";
    keyDeclaration = "I live in the overflow of abundant life, joy, and vitality provided by Jesus Christ!";
    tags = ["John", "Abundant Life", "Joy", "Redemption", "Overflow"];
  } else if (item.rawRef.includes("Romans 8:28")) {
    category = "Destiny & Decisions";
    theme = "All Things Working Together for Good";
    authorReflection = "And we know that all things work together for good to them that love God, to them who are the called according to his purpose. Even setbacks become setups for glory.";
    keyDeclaration = "Every circumstance in my life is orchestrated by God to work together for my ultimate good and His glory!";
    tags = ["Romans", "Providence", "Calling", "Goodness", "Sovereignty"];
  } else if (item.rawRef.includes("Romans 8:37")) {
    category = "Grit & Endurance";
    theme = "More Than Conquerors Through Christ";
    authorReflection = "Nay, in all these things we are more than conquerors through him that loved us. We do not fight for victory, but from the complete victory of the Cross.";
    keyDeclaration = "I am more than a conqueror through Christ who loved me; nothing can separate me from His love!";
    tags = ["Romans", "Conqueror", "Love of God", "Victory", "Overcoming"];
  } else if (item.rawRef.includes("2 Corinthians 10:4") || item.rawRef.includes("2 Corinthians 10:3–5") || item.rawRef.includes("2 Corinthians 10:5")) {
    category = "Mindset & Growth";
    theme = "Weapons of Warfare & Pulling Down Strongholds";
    authorReflection = "The weapons of our warfare are not carnal, but mighty through God to the pulling down of strong holds; casting down imaginations and bringing every thought into captivity to the obedience of Christ.";
    keyDeclaration = "I pull down every mental stronghold and bring every thought captive to the obedience of Jesus Christ!";
    tags = ["2 Corinthians", "Spiritual Warfare", "Mindset", "Strongholds", "Obedience"];
  } else if (item.rawRef.includes("Ephesians 2:5–11")) {
    category = "Purpose & Calling";
    theme = "Seated with Christ in Heavenly Places & His Workmanship";
    authorReflection = "God has quickened us together with Christ and raised us up to sit together in heavenly places. We are His workmanship, created in Christ Jesus unto good works.";
    keyDeclaration = "I am seated with Christ in heavenly places; I am His masterpiece prepared for extraordinary good works!";
    tags = ["Ephesians", "Grace", "Heavenly Places", "Workmanship", "Identity"];
  } else if (item.rawRef.includes("Ephesians 6:10") || item.rawRef.includes("Ephesians 6:11") || item.rawRef.includes("Ephesians 6:12") || item.rawRef.includes("Ephesians 6:13") || item.rawRef.includes("Ephesians 6:14") || item.rawRef.includes("Ephesians 6:10–18") || item.rawRef.includes("Ephesians 6:1–24")) {
    category = "Grit & Endurance";
    theme = "The Whole Armour of God";
    authorReflection = "Be strong in the Lord, and in the power of his might. Put on the whole armour of God, that ye may be able to stand against the wiles of the devil with unyielding boldness.";
    keyDeclaration = "I put on the whole armour of God and stand victoriously in the power of His mighty Spirit!";
    tags = ["Ephesians", "Whole Armour", "Spiritual Warfare", "Standing Firm", "Shield of Faith"];
  } else if (item.rawRef.includes("Philippians 1:6")) {
    category = "Destiny & Decisions";
    theme = "Confident of Completion";
    authorReflection = "Being confident of this very thing, that he which hath begun a good work in you will perform it until the day of Jesus Christ. God never leaves His work unfinished.";
    keyDeclaration = "I am fully confident that God will complete every good work He has begun in my life and ministry!";
    tags = ["Philippians", "Confidence", "Good Work", "Faithfulness", "Completion"];
  } else if (item.rawRef.includes("Philippians 4:13")) {
    category = "Grit & Endurance";
    theme = "I Can Do All Things Through Christ";
    authorReflection = "I can do all things through Christ which strengtheneth me. No task is too daunting and no mountain too steep when fueled by Christ's resident power.";
    keyDeclaration = "I can do all things through Christ who infuses me with inner strength, stamina, and grace!";
    tags = ["Philippians", "Christ's Strength", "Grit", "Excellence", "Empowerment"];
  } else if (item.rawRef.includes("1 John 4:4")) {
    category = "Grit & Endurance";
    theme = "Greater is He That is in You";
    authorReflection = "Ye are of God, little children, and have overcome them: because greater is he that is in you, than he that is in the world.";
    keyDeclaration = "Greater is the Holy Spirit dwelling inside me than any opposition or challenge in this world!";
    tags = ["1 John", "Greater Is He", "Overcoming", "Victory", "Holy Spirit"];
  } else if (item.rawRef.includes("Revelation 12:11")) {
    category = "Grit & Endurance";
    theme = "Overcoming by the Blood and the Word of Testimony";
    authorReflection = "And they overcame him by the blood of the Lamb, and by the word of their testimony; and they loved not their lives unto the death. Complete triumph over the accuser.";
    keyDeclaration = "I overcome every adversary by the precious blood of the Lamb and the bold confession of God's Word!";
    tags = ["Revelation", "Blood of the Lamb", "Testimony", "Overcoming", "Triumph"];
  } else if (item.rawRef.includes("Revelation 21:4")) {
    category = "Divine Favor & Joy";
    theme = "Wiping Away All Tears & Eternal Joy";
    authorReflection = "And God shall wipe away all tears from their eyes; and there shall be no more death, neither sorrow, nor crying, neither shall there be any more pain: for the former things are passed away.";
    keyDeclaration = "My hope is anchored in eternity; God wipes away all tears and crowns my life with everlasting joy!";
    tags = ["Revelation", "Eternal Joy", "No More Pain", "New Creation", "Hope"];
  }

  return {
    id: `fav-scripture-${item.num}`,
    num: item.num,
    testament: item.testament,
    reference: item.rawRef,
    ref: item.rawRef,
    book,
    chapter,
    theme,
    text,
    category,
    authorReflection,
    keyDeclaration,
    tags,
    isNew: item.isNew,
    rhemaId: `rhema-fav-${String(item.num).padStart(3, "0")}`,
    joyId: `joy-fav-${String(item.num).padStart(3, "0")}`
  };
});

// Write to src/data/authorFavouriteScriptures.ts
const code = `export interface AuthorFavouriteScripture {
  id: string;
  num: number;
  testament: "Old Testament" | "New Testament";
  reference: string;
  ref?: string;
  book: string;
  chapter: number;
  theme: string;
  text: string;
  category:
    | "Destiny & Decisions"
    | "Purpose & Calling"
    | "Wisdom & Relationships"
    | "Grit & Endurance"
    | "Divine Favor & Joy"
    | "Mindset & Growth";
  authorReflection: string;
  keyDeclaration: string;
  tags: string[];
  isNew: boolean;
  rhemaId: string;
  joyId: string;
}

export const AUTHOR_FAVOURITE_SCRIPTURES: AuthorFavouriteScripture[] = ${JSON.stringify(results, null, 2)};

export const AUTHOR_FAVOURITES_COUNT = ${results.length};
export const OT_FAVOURITES_COUNT = ${results.filter(r => r.testament === "Old Testament").length};
export const NT_FAVOURITES_COUNT = ${results.filter(r => r.testament === "New Testament").length};

export function getAuthorScriptureByNum(num: number): AuthorFavouriteScripture | undefined {
  return AUTHOR_FAVOURITE_SCRIPTURES.find(s => s.num === num);
}

export function getAuthorScriptureByRef(ref: string): AuthorFavouriteScripture | undefined {
  const normalized = ref.trim().toLowerCase().replace(/[\s–-]+/g, " ");
  return AUTHOR_FAVOURITE_SCRIPTURES.find(s => {
    const sNorm = s.reference.toLowerCase().replace(/[\s–-]+/g, " ");
    const sRefNorm = (s.ref || "").toLowerCase().replace(/[\s–-]+/g, " ");
    return sNorm === normalized || sRefNorm === normalized || sNorm.includes(normalized) || normalized.includes(sNorm);
  });
}
`;

fs.writeFileSync(path.join(process.cwd(), "src", "data", "authorFavouriteScriptures.ts"), code, "utf-8");
console.log("Successfully generated src/data/authorFavouriteScriptures.ts with", results.length, "scriptures.");

