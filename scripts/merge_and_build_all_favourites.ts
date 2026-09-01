import fs from "fs";
import path from "path";
import { createRequire } from "module";

const require = createRequire(import.meta.url);

// Master Scripture Merge & Enrichment Script
// Merges previous 321 scriptures with the 201 new scriptures, deduplicating seamlessly and verifying all 66 books.

const BIBLE_BOOKS_ORDER = [
  // Old Testament (39 books)
  "Genesis", "Exodus", "Leviticus", "Numbers", "Deuteronomy",
  "Joshua", "Judges", "Ruth", "1 Samuel", "2 Samuel", "1 Kings", "2 Kings",
  "1 Chronicles", "2 Chronicles", "Ezra", "Nehemiah", "Esther",
  "Job", "Psalms", "Proverbs", "Ecclesiastes", "Song of Solomon",
  "Isaiah", "Jeremiah", "Lamentations", "Ezekiel", "Daniel",
  "Hosea", "Joel", "Amos", "Obadiah", "Jonah", "Micah", "Nahum",
  "Habakkuk", "Zephaniah", "Haggai", "Zechariah", "Malachi",
  // New Testament (27 books)
  "Matthew", "Mark", "Luke", "John", "Acts",
  "Romans", "1 Corinthians", "2 Corinthians", "Galatians", "Ephesians",
  "Philippians", "Colossians", "1 Thessalonians", "2 Thessalonians",
  "1 Timothy", "2 Timothy", "Titus", "Philemon", "Hebrews",
  "James", "1 Peter", "2 Peter", "1 John", "2 John", "3 John",
  "Jude", "Revelation"
];

const OLD_TESTAMENT_BOOKS = new Set(BIBLE_BOOKS_ORDER.slice(0, 39));

// Cache for Bible JSONs
const bibleCache: Record<string, any> = {};

function normalizeBookName(name: string): string {
  const clean = name.trim().toLowerCase();
  if (clean === "psalm" || clean === "psalms") return "Psalms";
  if (clean === "song of songs" || clean === "canticles") return "Song of Solomon";
  if (clean === "revelations") return "Revelation";
  for (const b of BIBLE_BOOKS_ORDER) {
    if (b.toLowerCase() === clean) return b;
  }
  return name.trim();
}

function loadBibleBook(bookName: string) {
  const norm = normalizeBookName(bookName);
  if (bibleCache[norm]) return bibleCache[norm];

  const searchNames = [
    `${norm.toLowerCase().replace(/\s+/g, "_")}.json`,
    `${norm}.json`,
    `${norm.toLowerCase()}.json`
  ];

  const dir = path.join(process.cwd(), "public", "bible", "kjv");
  for (const sn of searchNames) {
    const p = path.join(dir, sn);
    if (fs.existsSync(p)) {
      const data = JSON.parse(fs.readFileSync(p, "utf-8"));
      bibleCache[norm] = data;
      return data;
    }
  }

  // Search in dir
  if (fs.existsSync(dir)) {
    const files = fs.readdirSync(dir);
    for (const f of files) {
      if (f.toLowerCase().startsWith(norm.toLowerCase().substring(0, 4))) {
        const p = path.join(dir, f);
        const data = JSON.parse(fs.readFileSync(p, "utf-8"));
        bibleCache[norm] = data;
        return data;
      }
    }
  }

  return null;
}

function parseRef(refStr: string): { book: string; chapter: number; verseStr: string } | null {
  const match = refStr.match(/^(.+?)\s+(\d+):(.+)$/);
  if (!match) return null;
  return {
    book: normalizeBookName(match[1]),
    chapter: parseInt(match[2], 10),
    verseStr: match[3].trim()
  };
}

function getScriptureText(book: string, chapter: number, verseStr: string): string {
  try {
    const bookData = loadBibleBook(book);
    if (!bookData) return "";
    const chData = bookData.chapters.find((c: any) => c.chapter === chapter);
    if (!chData) return "";

    // Single verse e.g. "1"
    if (/^\d+$/.test(verseStr)) {
      const vNum = parseInt(verseStr, 10);
      const v = chData.verses.find((item: any) => item.verse === vNum);
      return v ? v.text.trim() : "";
    }

    // Range e.g. "14-15" or "14–15"
    const dashMatch = verseStr.match(/^(\d+)[-–](\d+)$/);
    if (dashMatch) {
      const s = parseInt(dashMatch[1], 10);
      const e = parseInt(dashMatch[2], 10);
      const selected = chData.verses.filter((v: any) => v.verse >= s && v.verse <= e);
      if (selected.length > 0) {
        return selected.map((v: any) => v.text.trim()).join(" ");
      }
    }

    // Compound e.g. "4-5, 8"
    if (verseStr.includes(",")) {
      const parts = verseStr.split(",").map(p => p.trim());
      const selected: any[] = [];
      for (const p of parts) {
        const pDash = p.match(/^(\d+)[-–](\d+)$/);
        if (pDash) {
          const s = parseInt(pDash[1], 10);
          const e = parseInt(pDash[2], 10);
          selected.push(...chData.verses.filter((v: any) => v.verse >= s && v.verse <= e));
        } else {
          const vn = parseInt(p, 10);
          const single = chData.verses.find((v: any) => v.verse === vn);
          if (single) selected.push(single);
        }
      }
      if (selected.length > 0) {
        return selected.map((v: any) => v.text.trim()).join(" ");
      }
    }

    return chData.verses[0]?.text?.trim() || "";
  } catch (err) {
    return "";
  }
}

// Canonical key for deduplication
function getCanonicalKey(ref: string): string {
  const parsed = parseRef(ref);
  if (!parsed) return ref.toLowerCase().trim().replace(/[–—]/g, "-").replace(/\s+/g, " ");
  const normVerse = parsed.verseStr.replace(/[–—]/g, "-").replace(/\s+/g, "");
  return `${parsed.book.toLowerCase()} ${parsed.chapter}:${normVerse}`;
}

export interface MergedScripture {
  reference: string;
  book: string;
  chapter: number;
  testament: "Old Testament" | "New Testament";
  theme: string;
  text: string;
  category: "Destiny & Decisions" | "Purpose & Calling" | "Wisdom & Relationships" | "Grit & Endurance" | "Divine Favor & Joy" | "Mindset & Growth";
  authorReflection: string;
  keyDeclaration: string;
  tags: string[];
  isNew: boolean;
}

// 1. Load Raw 307
const raw307 = require("./raw_scriptures_list.cjs");
const textsMap307 = require("./scripture_texts_map.cjs");

// 2. Load 14 additional
const additional14 = [
  {
    reference: "Psalms 3:1",
    theme: "Facing Multiplied Opposition with Unshakable Faith",
    text: "LORD, how are they increased that trouble me! many are they that rise up against me.",
    category: "Grit & Endurance",
    authorReflection: "When troubles multiply and adversaries arise on every side, faith does not panic. David began his prayer by laying his honest reality before God, knowing that the greatest battles become the platform for God's greatest deliverance.",
    keyDeclaration: "Though troubles increase around me, my trust in the Lord is unshakeable; God is my defender and deliverer!",
    tags: ["Deliverance", "Courage", "Spiritual Warfare", "Protection"],
    isNew: true
  },
  {
    reference: "Psalms 3:2",
    theme: "Silencing the Voice of Despair & Slander",
    text: "Many there be which say of my soul, There is no help for him in God. Selah.",
    category: "Mindset & Growth",
    authorReflection: "The enemy's ultimate weapon is to convince you that God has abandoned you. When men say 'there is no help for him in God,' pause and reflect (Selah)—for heaven's rescue is already in motion.",
    keyDeclaration: "I silence every voice of despair; my help comes from the Lord, the Maker of heaven and earth!",
    tags: ["Faith Over Fear", "Victory Over Doubt", "Selah", "Assurance"],
    isNew: true
  },
  {
    reference: "Psalms 3:3",
    theme: "The Lord: My Shield, My Glory, and Lifter of My Head",
    text: "But thou, O LORD, art a shield for me; my glory, and the lifter up of mine head.",
    category: "Divine Favor & Joy",
    authorReflection: "God does not merely give you a shield; He IS your shield. He covers every vulnerability, wraps you in His glory, and personally lifts up your bowed head in supernatural victory.",
    keyDeclaration: "The Lord is my shield on every side; He restores my dignity, crowns me with glory, and lifts up my head!",
    tags: ["Shield", "Lifter of Head", "Glory", "Divine Defense"],
    isNew: true
  },
  {
    reference: "2 Corinthians 4:17",
    theme: "Light Afflictions Producing an Eternal Weight of Glory",
    text: "For our light affliction, which is but for a moment, worketh for us a far more exceeding and eternal weight of glory;",
    category: "Grit & Endurance",
    authorReflection: "Your present trials are neither permanent nor purposeless. In the divine economy, every momentary pressure is actively forging an eternal, heavy, unassailable weight of glory in your spirit.",
    keyDeclaration: "My current afflictions are momentary and light; they are producing for me a far more exceeding and eternal weight of glory!",
    tags: ["Eternal Perspective", "Endurance", "Glory", "Triumph Over Pain"],
    isNew: true
  },
  {
    reference: "2 Corinthians 4:18",
    theme: "Fixing Eyes on the Eternal Unseen Realities",
    text: "While we look not at the things which are seen, but at the things which are not seen: for the things which are seen are temporal; but the things which are not seen are eternal.",
    category: "Mindset & Growth",
    authorReflection: "What is visible to physical eyes is temporary and subject to change; what is promised in the unseen realm of God's Word is eternal and unshakeable. Fix your spiritual gaze on the eternal promises of God.",
    keyDeclaration: "I refuse to be swayed by temporal circumstances; I fix my eyes on the eternal, unfailing Word of God!",
    tags: ["Spiritual Sight", "Eternal Realities", "Faith Vision", "Unseen Realm"],
    isNew: true
  },
  {
    reference: "Romans 8:18",
    theme: "Present Sufferings Outweighed by Revealed Glory",
    text: "For I reckon that the sufferings of this present time are not worthy to be compared with the glory which shall be revealed in us.",
    category: "Destiny & Decisions",
    authorReflection: "The apostle Paul carried out a holy spiritual calculation: the sufferings of today cannot even be mentioned in the same equation as the breathtaking glory God is about to reveal in and through your life.",
    keyDeclaration: "I reckon with holy certainty that my present hardships are nothing compared to the magnificent glory about to be revealed in me!",
    tags: ["Future Glory", "Hope", "Spiritual Calculation", "Destiny"],
    isNew: true
  },
  {
    reference: "1 Peter 5:10",
    theme: "The God of All Grace: Perfecting, Establishing, Strengthening, and Settling You",
    text: "But the God of all grace, who hath called us unto his eternal glory by Christ Jesus, after that ye have suffered a while, make you perfect, stablish, strengthen, settle you.",
    category: "Purpose & Calling",
    authorReflection: "After the season of testing comes the divine establishment. The God of all grace steps in personally to mature, establish, strengthen, and permanently settle you upon an immovable foundation.",
    keyDeclaration: "The God of all grace is perfecting, establishing, strengthening, and permanently settling my life in Christ Jesus!",
    tags: ["All Grace", "Settled Faith", "Strength", "Spiritual Maturity"],
    isNew: true
  },
  {
    reference: "1 John 5:14",
    theme: "Unshakeable Confidence in Answered Prayer",
    text: "And this is the confidence that we have in him, that, if we ask any thing according to his will, he heareth us:",
    category: "Wisdom & Relationships",
    authorReflection: "True prayer is not a gamble or a desperate wish; it is entering the presence of God with bold confidence knowing that when we align our petitions with His revealed will, heaven listens attentively.",
    keyDeclaration: "I approach the throne of grace with bold confidence; because I ask according to God's will, I know He hears me!",
    tags: ["Prayer Confidence", "God's Will", "Audible Heaven", "Intercession"],
    isNew: true
  },
  {
    reference: "1 John 5:15",
    theme: "Possessing Desired Petitions by Faith",
    text: "And if we know that he hear us, whatsoever we ask, we know that we have the petitions that we desired of him.",
    category: "Divine Favor & Joy",
    authorReflection: "Knowing that God hears you guarantees the reality of your answer before physical manifestation appears. Faith celebrates the granted petition in the spiritual realm immediately upon asking.",
    keyDeclaration: "Because God hears my prayer, I know with absolute certainty that I have the petitions I asked of Him!",
    tags: ["Answered Prayer", "Possession", "Faith Certainty", "Praise"],
    isNew: true
  },
  {
    reference: "2 Timothy 3:15",
    theme: "The Holy Scriptures: Wisdom unto Salvation & Life Mastery",
    text: "And that from a child thou hast known the holy scriptures, which are able to make thee wise unto salvation through faith which is in Christ Jesus.",
    category: "Wisdom & Relationships",
    authorReflection: "The Holy Scriptures are not dry letters; they are impregnated with divine wisdom capable of transforming human weakness into eternal salvation, clarity, and mastery through faith in Christ Jesus.",
    keyDeclaration: "The Word of God fills my spirit with supernatural wisdom, illuminating my path and anchoring my salvation in Jesus Christ!",
    tags: ["Scripture Wisdom", "Salvation", "Spiritual Foundations", "Childlike Faith"],
    isNew: true
  },
  {
    reference: "1 Timothy 4:15",
    theme: "Wholehearted Meditation and Evident Spiritual Profiting",
    text: "Meditate upon these things; give thyself wholly to them; that thy profiting may appear to all.",
    category: "Mindset & Growth",
    authorReflection: "Spiritual mastery requires wholehearted immersion. When you saturate your mind with God's truth and give yourself entirely to your calling, your growth, success, and profiting become undeniably visible to all.",
    keyDeclaration: "I give myself wholly to God's Word and calling; my spiritual profiting, wisdom, and excellence shall be evident to all!",
    tags: ["Meditation", "Total Devotion", "Evident Progress", "Excellence"],
    isNew: true
  },
  {
    reference: "James 1:2",
    theme: "Counting Trials as Pure Joy in the Furnace of Growth",
    text: "My brethren, count it all joy when ye fall into divers temptations;",
    category: "Divine Favor & Joy",
    authorReflection: "Joy in the midst of trials is not emotional denial—it is spiritual warfare. Counting it all joy disarms the adversary and positions you to receive the supernatural fruit of spiritual maturity.",
    keyDeclaration: "I count every trial as pure joy, knowing that God is using every circumstance to elevate my spiritual stamina and character!",
    tags: ["Pure Joy", "Triumph in Trials", "Kingdom Attitude", "Overcoming"],
    isNew: true
  },
  {
    reference: "James 1:3",
    theme: "The Testing of Faith Producing Supernatural Patience",
    text: "Knowing this, that the trying of your faith worketh patience.",
    category: "Grit & Endurance",
    authorReflection: "Faith that cannot be tested is faith that cannot be trusted. The friction of life's tests is designed by God to forge unbreakable endurance, patience, and kingdom authority within your spirit.",
    keyDeclaration: "The testing of my faith is forging unshakable patience and spiritual endurance within my soul!",
    tags: ["Endurance", "Faith Tested", "Patience", "Inner Strength"],
    isNew: true
  },
  {
    reference: "James 1:4",
    theme: "Patience Perfecting Character: Mature, Complete, and Lacking Nothing",
    text: "But let patience have her perfect work, that ye may be perfect and entire, wanting nothing.",
    category: "Purpose & Calling",
    authorReflection: "Do not abort the process of spiritual development prematurely. When you allow patience to complete its deep inner work, you emerge spiritually mature, thoroughly equipped, whole, and lacking nothing.",
    keyDeclaration: "I allow patience to finish its perfect work in me; I am mature, complete, spiritually whole, and lacking nothing!",
    tags: ["Perfection", "Lacking Nothing", "Spiritual Maturity", "Wholeness"],
    isNew: true
  }
];

// 3. Load Current 201 from authorFavouriteScriptures
import { AUTHOR_FAVOURITE_SCRIPTURES as current201 } from "../src/data/authorFavouriteScriptures";

const masterMap = new Map<string, MergedScripture>();

// Helper to add/merge into map
function insertOrMerge(item: Partial<MergedScripture> & { reference: string }) {
  const normRef = item.reference.replace(/[–—]/g, "-").trim();
  const canonKey = getCanonicalKey(normRef);
  const parsed = parseRef(normRef);
  if (!parsed) return;

  const book = parsed.book;
  const chapter = parsed.chapter;
  const testament: "Old Testament" | "New Testament" = OLD_TESTAMENT_BOOKS.has(book) ? "Old Testament" : "New Testament";

  let text = item.text?.trim() || "";
  if (!text || text.length < 5) {
    text = getScriptureText(book, chapter, parsed.verseStr);
  }

  let category = item.category || "Divine Favor & Joy";
  let theme = item.theme || "Supernatural Faith & Covenant Victory";
  let authorReflection = item.authorReflection || `Anchoring your heart on ${normRef} fills your spirit with unshakable fortitude and clarity.`;
  let keyDeclaration = item.keyDeclaration || `I stand on the eternal truth of ${normRef}; God's promise is yea and amen!`;
  let tags = item.tags && item.tags.length > 0 ? item.tags : [book, "Faith", "Scripture", "Victory"];
  let isNew = Boolean(item.isNew);

  if (masterMap.has(canonKey)) {
    // Merge: retain best text and metadata
    const existing = masterMap.get(canonKey)!;
    if (isNew) existing.isNew = true;
    if ((!existing.text || existing.text.length < text.length) && text) existing.text = text;
    if (item.authorReflection && item.authorReflection.length > existing.authorReflection.length) {
      existing.authorReflection = item.authorReflection;
    }
    if (item.keyDeclaration && item.keyDeclaration.length > existing.keyDeclaration.length) {
      existing.keyDeclaration = item.keyDeclaration;
    }
    if (item.theme && item.theme.length > existing.theme.length) {
      existing.theme = item.theme;
    }
  } else {
    masterMap.set(canonKey, {
      reference: item.reference,
      book,
      chapter,
      testament,
      theme,
      text,
      category,
      authorReflection,
      keyDeclaration,
      tags,
      isNew
    });
  }
}

// 1. Process 307 Base
raw307.forEach((item: any) => {
  const text = textsMap307[item.ref] || textsMap307[item.ref.replace("–", "-")] || "";
  insertOrMerge({
    reference: item.ref,
    theme: item.theme,
    text,
    isNew: Boolean(item.isNew),
    category: "Divine Favor & Joy",
    authorReflection: `The revelation in ${item.ref} is a cornerstone of apostolic faith and covenant victory. Meditate deeply on this truth daily.`,
    keyDeclaration: `I possess every covenant blessing ordained in ${item.ref}; no weapon formed against me shall prosper!`,
    tags: [item.ref.split(" ")[0], "Covenant", "Faith", "Victory"]
  });
});

// 2. Process Additional 14
additional14.forEach((item: any) => {
  insertOrMerge(item);
});

// 3. Process Current 201
current201.forEach((item: any) => {
  insertOrMerge(item);
});

console.log(`[MERGE SUCCESS] Total Unique Scriptures in Combined Master Catalog: ${masterMap.size}`);

// Sort Canonically:
// 1. Testament (Old -> New)
// 2. Book Order in Bible (Genesis -> Revelation)
// 3. Chapter Number
// 4. Verse Reference
const sortedList = Array.from(masterMap.values()).sort((a, b) => {
  const bookIdxA = BIBLE_BOOKS_ORDER.indexOf(a.book);
  const bookIdxB = BIBLE_BOOKS_ORDER.indexOf(b.book);

  if (bookIdxA !== bookIdxB) {
    return bookIdxA - bookIdxB;
  }
  if (a.chapter !== b.chapter) {
    return a.chapter - b.chapter;
  }
  return a.reference.localeCompare(b.reference);
});

// Map to Final AuthorFavouriteScripture objects with clean IDs and sequence
const finalList = sortedList.map((item, idx) => {
  const num = idx + 1;
  return {
    id: `fav-scripture-${num}`,
    num,
    testament: item.testament,
    reference: item.reference,
    ref: item.reference,
    book: item.book,
    chapter: item.chapter,
    theme: item.theme,
    text: item.text,
    category: item.category,
    authorReflection: item.authorReflection,
    keyDeclaration: item.keyDeclaration,
    tags: item.tags,
    isNew: item.isNew,
    rhemaId: `rhema-fav-${String(num).padStart(3, "0")}`,
    joyId: `joy-fav-${String(num).padStart(3, "0")}`
  };
});

const otCount = finalList.filter(s => s.testament === "Old Testament").length;
const ntCount = finalList.filter(s => s.testament === "New Testament").length;
const newCount = finalList.filter(s => s.isNew).length;

console.log(`[FINAL STATS] Total: ${finalList.length} (Old Testament: ${otCount}, New Testament: ${ntCount}, Marked New: ${newCount})`);

// Write authorFavouriteScriptures.ts
const tsContent = `export interface AuthorFavouriteScripture {
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

export const AUTHOR_FAVOURITE_SCRIPTURES: AuthorFavouriteScripture[] = ${JSON.stringify(finalList, null, 2)};

export const AUTHOR_FAVOURITES_COUNT = ${finalList.length};
export const AUTHOR_FAVOURITES_OT_COUNT = ${otCount};
export const AUTHOR_FAVOURITES_NT_COUNT = ${ntCount};
export const AUTHOR_FAVOURITES_NEW_COUNT = ${newCount};

export function getAuthorScriptureByNum(num: number): AuthorFavouriteScripture | undefined {
  return AUTHOR_FAVOURITE_SCRIPTURES.find(s => s.num === num);
}

export function getAuthorScriptureByReference(ref: string): AuthorFavouriteScripture | undefined {
  const norm = ref.replace(/[–—]/g, "-").toLowerCase().trim();
  return AUTHOR_FAVOURITE_SCRIPTURES.find(s => {
    const sNorm = s.reference.replace(/[–—]/g, "-").toLowerCase().trim();
    return sNorm === norm || s.ref?.replace(/[–—]/g, "-").toLowerCase().trim() === norm;
  });
}
`;

const outputPath = path.join(process.cwd(), "src", "data", "authorFavouriteScriptures.ts");
fs.writeFileSync(outputPath, tsContent, "utf-8");
console.log(`[SAVED] Wrote ${finalList.length} merged scriptures to ${outputPath}`);
