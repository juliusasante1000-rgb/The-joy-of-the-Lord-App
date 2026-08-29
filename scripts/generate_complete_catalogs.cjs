const fs = require('fs');
const path = require('path');
const RAW_SCRIPTURES = require('./raw_scriptures_list.cjs');
const SCRIPTURE_TEXTS = require('./scripture_texts_map.cjs');

console.log(`Starting generator with ${RAW_SCRIPTURES.length} author scriptures...`);

// Helper to sanitize strings for TS template literals or JSON
function cleanStr(str) {
  if (!str) return "";
  return str.replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\n/g, "\\n");
}

function parseBook(ref) {
  const parts = ref.split(/\s(?=\d)/);
  return parts[0] || "Scripture";
}

function parseChapter(ref) {
  const match = ref.match(/\s(\d+):/);
  return match ? parseInt(match[1], 10) : 1;
}

const OT_BOOKS = new Set([
  "Genesis", "Exodus", "Leviticus", "Numbers", "Deuteronomy",
  "Joshua", "Judges", "Ruth", "1 Samuel", "2 Samuel", "1 Kings", "2 Kings",
  "1 Chronicles", "2 Chronicles", "Ezra", "Nehemiah", "Esther", "Job",
  "Psalms", "Psalm", "Proverbs", "Ecclesiastes", "Song of Solomon",
  "Isaiah", "Jeremiah", "Lamentations", "Ezekiel", "Daniel",
  "Hosea", "Joel", "Amos", "Obadiah", "Jonah", "Micah", "Nahum",
  "Habakkuk", "Zephaniah", "Haggai", "Zechariah", "Malachi"
]);

function getTestament(book) {
  return OT_BOOKS.has(book) ? "Old Testament" : "New Testament";
}

// 1. GENERATE authorFavouriteScriptures.ts
const authorScripturesList = RAW_SCRIPTURES.map(s => {
  const text = SCRIPTURE_TEXTS[s.ref] || "";
  const book = parseBook(s.ref);
  const chapter = parseChapter(s.ref);
  const testament = s.testament || getTestament(book);
  return {
    num: s.num,
    testament: testament,
    reference: s.ref,
    ref: s.ref,
    book: book,
    chapter: chapter,
    theme: s.theme,
    text: text,
    isNew: !!s.isNew,
    rhemaId: `rhema-fav-${String(s.num).padStart(3, '0')}`,
    joyId: `joy-fav-${String(s.num).padStart(3, '0')}`
  };
});

const authorScripturesFileContent = `// Author's 307 Favourite Scriptures
// Personally curated by Bismark Twum as foundational pillars of faith, joy, and spiritual victory.

export interface AuthorFavouriteScripture {
  num: number;
  testament: "Old Testament" | "New Testament";
  reference: string;
  ref?: string;
  book: string;
  chapter: number;
  theme: string;
  text: string;
  isNew: boolean;
  rhemaId: string;
  joyId: string;
}

export const AUTHOR_FAVOURITE_SCRIPTURES: AuthorFavouriteScripture[] = ${JSON.stringify(authorScripturesList, null, 2)};

export const AUTHOR_FAVOURITES_COUNT = ${authorScripturesList.length};
export const OT_FAVOURITES_COUNT = ${authorScripturesList.filter(s => s.testament === "Old Testament").length};
export const NT_FAVOURITES_COUNT = ${authorScripturesList.filter(s => s.testament === "New Testament").length};

export function getAuthorScriptureByNum(num: number): AuthorFavouriteScripture | undefined {
  return AUTHOR_FAVOURITE_SCRIPTURES.find(s => s.num === num);
}

export function getAuthorScriptureByRef(ref: string): AuthorFavouriteScripture | undefined {
  const normalized = ref.trim().toLowerCase();
  return AUTHOR_FAVOURITE_SCRIPTURES.find(s => s.reference.toLowerCase() === normalized);
}
`;

fs.writeFileSync(path.join(__dirname, '../src/data/authorFavouriteScriptures.ts'), authorScripturesFileContent, 'utf8');
console.log("Successfully wrote src/data/authorFavouriteScriptures.ts");

// 2. GENERATE rhemaCatalog1000.ts
const RHEMA_SEASONS = [
  "Kingdom Dominion",
  "Divine Favor",
  "Unshakeable Faith",
  "Supernatural Peace",
  "Healing & Health",
  "Joy & Strength",
  "Covenant Prosperity",
  "Spiritual Authority",
  "Guidance & Wisdom",
  "Resurrection Power",
  "Prayer & Intercession",
  "Holiness & Consecration",
  "Deliverance & Breakthrough",
  "Fruit of the Spirit",
  "Hope & Consolation",
  "Purpose & Calling"
];

function assignRhemaSeason(theme) {
  const t = theme.toLowerCase();
  if (t.includes("dominion") || t.includes("fruitfulness") || t.includes("multiply")) return "Kingdom Dominion";
  if (t.includes("favor") || t.includes("blessing") || t.includes("mercy") || t.includes("goodness")) return "Divine Favor";
  if (t.includes("faith") || t.includes("trust") || t.includes("believe") || t.includes("confidence")) return "Unshakeable Faith";
  if (t.includes("peace") || t.includes("rest") || t.includes("comfort") || t.includes("safety")) return "Supernatural Peace";
  if (t.includes("heal") || t.includes("health") || t.includes("restore") || t.includes("stripe")) return "Healing & Health";
  if (t.includes("joy") || t.includes("strength") || t.includes("rejoice") || t.includes("mighty")) return "Joy & Strength";
  if (t.includes("prosper") || t.includes("success") || t.includes("heritage") || t.includes("portion")) return "Covenant Prosperity";
  if (t.includes("authority") || t.includes("power") || t.includes("weapon") || t.includes("stronghold") || t.includes("spirit")) return "Spiritual Authority";
  if (t.includes("wisdom") || t.includes("light") || t.includes("counsel") || t.includes("understanding") || t.includes("word")) return "Guidance & Wisdom";
  if (t.includes("resurrection") || t.includes("life") || t.includes("redeem") || t.includes("overcome")) return "Resurrection Power";
  if (t.includes("pray") || t.includes("ask") || t.includes("seek") || t.includes("supplication")) return "Prayer & Intercession";
  if (t.includes("holy") || t.includes("pure") || t.includes("cleanse") || t.includes("sanctif")) return "Holiness & Consecration";
  if (t.includes("deliver") || t.includes("breakthrough") || t.includes("recover") || t.includes("escape")) return "Deliverance & Breakthrough";
  return "Purpose & Calling";
}

const rhemaWords1000 = [];

// (A) First 307: Based directly on Author's Favourite Scriptures
authorScripturesList.forEach((s) => {
  const season = assignRhemaSeason(s.theme);
  rhemaWords1000.push({
    id: s.rhemaId,
    title: `${s.theme}`,
    seasonCategory: season,
    propheticDeclaration: `By the eternal decree of ${s.ref}, I declare that God's promise of ${s.theme.toLowerCase()} is actively establishing my path, overthrowing every contrary circumstance, and bearing fruit abundantly in my life today!`,
    nowWordText: `The Holy Ghost is speaking directly into your present season through ${s.ref}: "${s.text}". This is not a distant history; it is a living, sharp, and active now-word. No matter what opposition or delay has spoken to your soul, God's sovereign covenant stands immutable. You are stepping out of strivings into divine alignment, where God's favor guides, His wisdom preserves, and His joy sustains your spirit.`,
    scriptureAnchor: {
      reference: s.ref,
      text: s.text
    },
    actionCommandment: `Arise this hour: speak ${s.ref} aloud over your home and work, refuse every voice of fear or discouragement, and take immediate faith action in the direction God has commanded you.`,
    propheticDecree: `In the mighty name of Jesus Christ, I decree and declare that every word of ${s.ref} is fulfilled in my life; no weapon formed against me shall prosper, and the joy of the Lord is my impenetrable strength!`,
    dailyActivationGuide: [
      `Morning Meditation: Recite ${s.ref} 3 times upon waking, letting its truth anchor your thoughts.`,
      `Midday Confession: Release a decree of thanksgiving that God is watching over His word to perform it.`,
      `Evening Consecration: Cast every care at the feet of Jesus and rest in His supernatural shalom.`
    ],
    spiritualAtmosphere: "Charged with holy confidence, divine rest, and covenant victory.",
    isAuthorFavourite: true
  });
});

// (B) Read baseline Rhema words if possible, or build rich distinct items
// Let's create additional inspired items up to exactly 1000!
const PROMISE_TOPICS = [
  { topic: "The Wellspring of Living Water", season: "Supernatural Peace", ref: "John 4:14", text: "Whosoever drinketh of the water that I shall give him shall never thirst; but the water that I shall give him shall be in him a well of water springing up into everlasting life." },
  { topic: "Angelic Encampment & Shield", season: "Deliverance & Breakthrough", ref: "Psalm 34:7", text: "The angel of the LORD encampeth round about them that fear him, and delivereth them." },
  { topic: "Tasting the Goodness of the Lord", season: "Divine Favor", ref: "Psalm 34:8", text: "O taste and see that the LORD is good: blessed is the man that trusteth in him." },
  { topic: "No Lack to Them That Fear Him", season: "Covenant Prosperity", ref: "Psalm 34:9–10", text: "The young lions do lack, and suffer hunger: but they that seek the LORD shall not want any good thing." },
  { topic: "Nearness to the Brokenhearted", season: "Hope & Consolation", ref: "Psalm 34:18", text: "The LORD is nigh unto them that are of a broken heart; and saveth such as be of a contrite spirit." },
  { topic: "Delivered Out of All Afflictions", season: "Deliverance & Breakthrough", ref: "Psalm 34:19", text: "Many are the afflictions of the righteous: but the LORD delivereth him out of them all." },
  { topic: "The Secret Place of the Most High", season: "Supernatural Peace", ref: "Psalm 91:1–2", text: "He that dwelleth in the secret place of the most High shall abide under the shadow of the Almighty. I will say of the LORD, He is my refuge and my fortress: my God; in him will I trust." },
  { topic: "Delivered From the Snare of the Fowler", season: "Deliverance & Breakthrough", ref: "Psalm 91:3", text: "Surely he shall deliver thee from the snare of the fowler, and from the noisome pestilence." },
  { topic: "No Evil Shall Befall Thee", season: "Divine Favor", ref: "Psalm 91:10", text: "There shall no evil befall thee, neither shall any plague come nigh thy dwelling." },
  { topic: "Charge Over Thee in All Thy Ways", season: "Guidance & Wisdom", ref: "Psalm 91:11–12", text: "For he shall give his angels charge over thee, to keep thee in all thy ways. They shall bear thee up in their hands, lest thou dash thy foot against a stone." },
  { topic: "Treading on the Lion and Adder", season: "Spiritual Authority", ref: "Psalm 91:13", text: "Thou shalt tread upon the lion and adder: the young lion and the dragon shalt thou trample under feet." },
  { topic: "Long Life and Full Salvation", season: "Covenant Prosperity", ref: "Psalm 91:16", text: "With long life will I satisfy him, and shew him my salvation." },
  { topic: "The Good Shepherd Restoring the Soul", season: "Supernatural Peace", ref: "Psalm 23:1–3", text: "The LORD is my shepherd; I shall not want. He maketh me to lie down in green pastures: he leadeth me beside the still waters. He restoreth my soul." },
  { topic: "No Fear in the Valley of Shadow", season: "Unshakeable Faith", ref: "Psalm 23:4", text: "Yea, though I walk through the valley of the shadow of death, I will fear no evil: for thou art with me; thy rod and thy staff they comfort me." },
  { topic: "Table Prepared in the Presence of Enemies", season: "Divine Favor", ref: "Psalm 23:5", text: "Thou preparest a table before me in the presence of mine enemies: thou anointest my head with oil; my cup runneth over." },
  { topic: "Goodness & Mercy Pursuing All Days", season: "Divine Favor", ref: "Psalm 23:6", text: "Surely goodness and mercy shall follow me all the days of my life: and I will dwell in the house of the LORD for ever." },
  { topic: "Strong Tower of Safety", season: "Unshakeable Faith", ref: "Proverbs 18:10", text: "The name of the LORD is a strong tower: the righteous runneth into it, and is safe." },
  { topic: "Plans to Prosper and Not to Harm", season: "Purpose & Calling", ref: "Jeremiah 29:11", text: "For I know the thoughts that I think toward you, saith the LORD, thoughts of peace, and not of evil, to give you an expected end." },
  { topic: "Call Unto Me and I Will Answer", season: "Prayer & Intercession", ref: "Jeremiah 33:3", text: "Call unto me, and I will answer thee, and shew thee great and mighty things, which thou knowest not." },
  { topic: "Restoring the Years of the Locust", season: "Deliverance & Breakthrough", ref: "Joel 2:25", text: "And I will restore to you the years that the locust hath eaten, the cankerworm, and the caterpiller, and the palmerworm, my great army which I sent among you." },
  { topic: "Pouring Out My Spirit Upon All Flesh", season: "Resurrection Power", ref: "Joel 2:28", text: "And it shall come to pass afterward, that I will pour out my spirit upon all flesh; and your sons and your daughters shall prophesy." },
  { topic: "The Gates of Hell Shall Not Prevail", season: "Spiritual Authority", ref: "Matthew 16:18", text: "And I say also unto thee, That thou art Peter, and upon this rock I will build my church; and the gates of hell shall not prevail against it." },
  { topic: "Keys of the Kingdom of Heaven", season: "Spiritual Authority", ref: "Matthew 16:19", text: "And I will give unto thee the keys of the kingdom of heaven: and whatsoever thou shalt bind on earth shall be bound in heaven: and whatsoever thou shalt loose on earth shall be loosed in heaven." },
  { topic: "All Things Possible to Him That Believeth", season: "Unshakeable Faith", ref: "Mark 9:23", text: "Jesus said unto him, If thou canst believe, all things are possible to him that believeth." },
  { topic: "Rivers of Living Water Flowing", season: "Resurrection Power", ref: "John 7:38", text: "He that believeth on me, as the scripture hath said, out of his belly shall flow rivers of living water." },
  { topic: "Life in Abundance and Overcoming", season: "Kingdom Dominion", ref: "John 10:10", text: "The thief cometh not, but for to steal, and to kill, and to destroy: I am come that they might have life, and that they might have it more abundantly." },
  { topic: "Resurrection and Life Eternal", season: "Resurrection Power", ref: "John 11:25", text: "Jesus said unto her, I am the resurrection, and the life: he that believeth in me, though he were dead, yet shall he live." },
  { topic: "Greater Works Than These Shall Ye Do", season: "Spiritual Authority", ref: "John 14:12", text: "Verily, verily, I say unto you, He that believeth on me, the works that I do shall he do also; and greater works than these shall he do; because I go unto my Father." },
  { topic: "The Comforter Teaching All Things", season: "Guidance & Wisdom", ref: "John 14:26", text: "But the Comforter, which is the Holy Ghost, whom the Father will send in my name, he shall teach you all things, and bring all things to your remembrance, whatsoever I have said unto you." },
  { topic: "Peace That the World Cannot Give", season: "Supernatural Peace", ref: "John 14:27", text: "Peace I leave with you, my peace I give unto you: not as the world giveth, give I unto you. Let not your heart be troubled, neither let it be afraid." },
  { topic: "Power When the Holy Ghost Comes", season: "Resurrection Power", ref: "Acts 1:8", text: "But ye shall receive power, after that the Holy Ghost is come upon you: and ye shall be witnesses unto me both in Jerusalem, and in all Judaea, and in Samaria, and unto the uttermost part of the earth." },
  { topic: "Seasons of Refreshing from the Presence", season: "Supernatural Peace", ref: "Acts 3:19", text: "Repent ye therefore, and be converted, that your sins may be blotted out, when the times of refreshing shall come from the presence of the Lord." },
  { topic: "Healing All Oppressed of the Devil", season: "Healing & Health", ref: "Acts 10:38", text: "How God anointed Jesus of Nazareth with the Holy Ghost and with power: who went about doing good, and healing all that were oppressed of the devil; for God was with him." },
  { topic: "All Things Working Together for Good", season: "Divine Favor", ref: "Romans 8:28", text: "And we know that all things work together for good to them that love God, to them who are the called according to his purpose." },
  { topic: "If God Be for Us Who Can Be Against Us", season: "Unshakeable Faith", ref: "Romans 8:31", text: "What shall we then say to these things? If God be for us, who can be against us?" },
  { topic: "Freely Giving Us All Things", season: "Covenant Prosperity", ref: "Romans 8:32", text: "He that spared not his own Son, but delivered him up for us all, how shall he not with him also freely give us all things?" },
  { topic: "More Than Conquerors Through Christ", season: "Kingdom Dominion", ref: "Romans 8:37", text: "Nay, in all these things we are more than conquerors through him that loved us." },
  { topic: "Nothing Able to Separate Us from His Love", season: "Supernatural Peace", ref: "Romans 8:38–39", text: "For I am persuaded, that neither death, nor life, nor angels, nor principalities, nor powers... shall be able to separate us from the love of God, which is in Christ Jesus our Lord." },
  { topic: "Faith Cometh by Hearing the Word", season: "Unshakeable Faith", ref: "Romans 10:17", text: "So then faith cometh by hearing, and hearing by the word of God." },
  { topic: "Living Sacrifice Holy and Acceptable", season: "Holiness & Consecration", ref: "Romans 12:1", text: "I beseech you therefore, brethren, by the mercies of God, that ye present your bodies a living sacrifice, holy, acceptable unto God, which is your reasonable service." },
  { topic: "Temple of the Living Holy Spirit", season: "Holiness & Consecration", ref: "1 Corinthians 6:19–20", text: "What? know ye not that your body is the temple of the Holy Ghost which is in you... For ye are bought with a price: therefore glorify God in your body, and in your spirit, which are God's." },
  { topic: "All Promises of God in Him Yea and Amen", season: "Divine Favor", ref: "2 Corinthians 1:20", text: "For all the promises of God in him are yea, and in him Amen, unto the glory of God by us." },
  { topic: "Always Causing Us to Triumph", season: "Spiritual Authority", ref: "2 Corinthians 2:14", text: "Now thanks be unto God, which always causeth us to triumph in Christ, and maketh manifest the savour of his knowledge by us in every place." },
  { topic: "Transformed from Glory to Glory", season: "Resurrection Power", ref: "2 Corinthians 3:18", text: "But we all, with open face beholding as in a glass the glory of the Lord, are changed into the same image from glory to glory, even as by the Spirit of the Lord." },
  { topic: "Walking by Faith and Not by Sight", season: "Unshakeable Faith", ref: "2 Corinthians 5:7", text: "For we walk by faith, not by sight." },
  { topic: "Crucified with Christ Yet Living", season: "Holiness & Consecration", ref: "Galatians 2:20", text: "I am crucified with Christ: nevertheless I live; yet not I, but Christ liveth in me: and the life which I now live in the flesh I live by the faith of the Son of God, who loved me, and gave himself for me." },
  { topic: "Heirs According to the Promise", season: "Covenant Prosperity", ref: "Galatians 3:29", text: "And if ye be Christ's, then are ye Abraham's seed, and heirs according to the promise." },
  { topic: "Blessed with All Spiritual Blessings", season: "Divine Favor", ref: "Ephesians 1:3", text: "Blessed be the God and Father of our Lord Jesus Christ, who hath blessed us with all spiritual blessings in heavenly places in Christ." },
  { topic: "Sealed with the Holy Spirit of Promise", season: "Supernatural Peace", ref: "Ephesians 1:13", text: "In whom also after that ye believed, ye were sealed with that holy Spirit of promise." },
  { topic: "Raised Up and Seated in Heavenly Places", season: "Spiritual Authority", ref: "Ephesians 2:6", text: "And hath raised us up together, and made us sit together in heavenly places in Christ Jesus." }
];

let counter = 308;
while (rhemaWords1000.length < 1000) {
  const p = PROMISE_TOPICS[(counter - 308) % PROMISE_TOPICS.length];
  const cycle = Math.floor((counter - 308) / PROMISE_TOPICS.length) + 1;
  const wordNumStr = String(counter).padStart(4, '0');
  const title = cycle === 1 ? p.topic : `${p.topic} — Manifestation ${cycle}`;
  
  rhemaWords1000.push({
    id: `rhema-${wordNumStr}`,
    title: title,
    seasonCategory: p.season,
    propheticDeclaration: `I boldly declare that according to ${p.ref}, the supernatural power of ${p.topic.toLowerCase()} is breaking forth in my circumstances, shattering every barrier and releasing heaven's abundance!`,
    nowWordText: `The Lord declares concerning your present hour from ${p.ref}: "${p.text}". Walk boldly into this revelation; heaven is backing every step you take in obedience. No obstacle of the enemy can hinder what God has ordained.`,
    scriptureAnchor: {
      reference: p.ref,
      text: p.text
    },
    actionCommandment: `Fasten your eyes on ${p.ref} today. Open your mouth in high praise, refuse doubt, and step forward with absolute certainty of victory.`,
    propheticDecree: `In Jesus' name, I decree that the promise of ${p.ref} is established in my life, household, and calling. I walk in unbroken fellowship with the King of Glory!`,
    dailyActivationGuide: [
      `Morning: Read ${p.ref} slowly and meditate on God's character.`,
      `Afternoon: Affirm your spiritual authority and speak life over your daily tasks.`,
      `Evening: Offer a sacrifice of thanksgiving for what God has accomplished.`
    ],
    spiritualAtmosphere: "Radiant with divine power, unshakable faith, and kingdom authority.",
    isAuthorFavourite: false
  });
  counter++;
}

const rhemaFileContent = `import { RhemaWordItem } from "../types";

// Comprehensive Catalog of 1,000 Prophetic Rhema Word Revelations
// First 307 words are directly anchored on the Author's (Bismark Twum) Favourite Scriptures!
export const RHEMA_CATALOG_1000: RhemaWordItem[] = ${JSON.stringify(rhemaWords1000, null, 2)};
`;

fs.writeFileSync(path.join(__dirname, '../src/data/rhemaCatalog1000.ts'), rhemaFileContent, 'utf8');
console.log(`Successfully wrote src/data/rhemaCatalog1000.ts with ${rhemaWords1000.length} items!`);

// 3. GENERATE joyCatalog1000.ts
const JOY_CATEGORIES = [
  "Grief & Sorrow",
  "Anxiety & Fear",
  "Financial Strain",
  "Depression & Heaviness",
  "Spiritual Warfare",
  "Marital & Family Storms",
  "Physical Sickness & Fatigue",
  "Delay & Discouragement",
  "Emotional Battles",
  "Addiction & Deliverance",
  "Spiritual Formation",
  "Destiny & Career",
  "Self-Worth & Calling",
  "Workplace & Society",
  "Heart Healing"
];

function assignJoyCategory(theme) {
  const t = theme.toLowerCase();
  if (t.includes("grief") || t.includes("sorrow") || t.includes("tears") || t.includes("weep")) return "Grief & Sorrow";
  if (t.includes("fear") || t.includes("anxiety") || t.includes("peace") || t.includes("care")) return "Anxiety & Fear";
  if (t.includes("prosper") || t.includes("treasure") || t.includes("portion") || t.includes("supply")) return "Financial Strain";
  if (t.includes("heaviness") || t.includes("comfort") || t.includes("joy") || t.includes("strength")) return "Depression & Heaviness";
  if (t.includes("warfare") || t.includes("weapon") || t.includes("stronghold") || t.includes("authority") || t.includes("power")) return "Spiritual Warfare";
  if (t.includes("heal") || t.includes("health") || t.includes("stripes") || t.includes("wings")) return "Physical Sickness & Fatigue";
  if (t.includes("delay") || t.includes("wait") || t.includes("tarry") || t.includes("patience")) return "Delay & Discouragement";
  if (t.includes("heart") || t.includes("cleanse") || t.includes("forgive") || t.includes("mercy")) return "Heart Healing";
  if (t.includes("career") || t.includes("work") || t.includes("success") || t.includes("diligence")) return "Destiny & Career";
  if (t.includes("calling") || t.includes("chosen") || t.includes("peculiar") || t.includes("image")) return "Self-Worth & Calling";
  return "Spiritual Formation";
}

const joyChallenges1000 = [];

// (A) First 307: Based directly on Author's Favourite Scriptures
authorScripturesList.forEach((s) => {
  const cat = assignJoyCategory(s.theme);
  joyChallenges1000.push({
    id: s.joyId,
    challengeTitle: `Overcoming Defeat Through ${s.theme}`,
    category: cat,
    rootDeception: `The enemy whispers that your situation is permanent, that God has abandoned your cause, and that ${s.theme.toLowerCase()} will never be realized in your life.`,
    scripturalTruth: `God's eternal Word in ${s.ref} stands forever settled in heaven: "${s.text}". No trial can cancel God's sovereign covenant.`,
    anchorVerses: [
      {
        reference: s.ref,
        text: s.text,
        version: "KJV"
      }
    ],
    joyStrategySteps: [
      `Expose the Lie: Renounce every mental deception contradicting ${s.ref}.`,
      `Engage Holy Praise: Sing praises to God for the victory promised before visible manifestation.`,
      `Declare the Scripture: Speak ${s.ref} with unwavering conviction directly into your atmosphere.`,
      `Stand in Covenant Joy: Refuse heaviness; let Nehemiah 8:10 fortress-strength anchor your heart.`
    ],
    fortressDeclaration: `I am more than a conqueror through Jesus Christ! The truth of ${s.ref} is my shield and buckler. The joy of the Lord is my unshakeable fortress!`,
    deliverancePrayer: `Heavenly Father, in the name of Jesus, I anchor my soul in ${s.ref}. Dispel every cloud of discouragement, tear down every satanic stronghold, and fill my heart with unspeakable joy and full assurance of faith. Amen.`,
    praisePrescription: `Offer 15 minutes of uninterrupted, high-octane praise thanking God specifically for fulfilling ${s.ref}.`,
    testimonyOfVictory: `By standing firmly on ${s.ref}, counting trials as joy, the snare was shattered, supernatural breakthrough manifested, and God's name was glorified.`,
    isAuthorFavourite: true
  });
});

// (B) Additional inspired overcoming blueprints up to exactly 1000
const JOY_THEMATIC_BLUEPRINTS = [
  { title: "Shattering Financial Dread with Jehovah-Jireh", cat: "Financial Strain", ref: "Philippians 4:19", text: "But my God shall supply all your need according to his riches in glory by Christ Jesus." },
  { title: "Conquering Insomnia & Night Terrors", cat: "Anxiety & Fear", ref: "Psalm 4:8", text: "I will both lay me down in peace, and sleep: for thou, LORD, only makest me dwell in safety." },
  { title: "Breaking Chronic Rejection & Identity Wounds", cat: "Self-Worth & Calling", ref: "Ephesians 1:6", text: "To the praise of the glory of his grace, wherein he hath made us accepted in the beloved." },
  { title: "Uprooting Bitterness & Family Strife", cat: "Marital & Family Storms", ref: "Ephesians 4:31–32", text: "Let all bitterness, and wrath, and anger, and clamour, and evil speaking, be put away from you, with all malice: And be ye kind one to another, tenderhearted, forgiving one another." },
  { title: "Extinguishing Panic Attacks & Racing Thoughts", cat: "Anxiety & Fear", ref: "2 Timothy 1:7", text: "For God hath not given us the spirit of fear; but of power, and of love, and of a sound mind." },
  { title: "Triumphing Over Chronic Illness & Pain", cat: "Physical Sickness & Fatigue", ref: "Exodus 23:25", text: "And ye shall serve the LORD your God, and he shall bless thy bread, and thy water; and I will take sickness away from the midst of thee." },
  { title: "Overcoming Hopelessness in Protracted Waiting", cat: "Delay & Discouragement", ref: "Galatians 6:9", text: "And let us not be weary in well doing: for in due season we shall reap, if we faint not." },
  { title: "Silence the Accuser's Condemnation & Guilt", cat: "Heart Healing", ref: "Romans 8:1", text: "There is therefore now no condemnation to them which are in Christ Jesus, who walk not after the flesh, but after the Spirit." },
  { title: "Pulling Down Generational Addictive Cycles", cat: "Addiction & Deliverance", ref: "John 8:36", text: "If the Son therefore shall make you free, ye shall be free indeed." },
  { title: "Overcoming Workplace Hostility & Persecution", cat: "Workplace & Society", ref: "Isaiah 54:17", text: "No weapon that is formed against thee shall prosper; and every tongue that shall rise against thee in judgment thou shalt condemn." },
  { title: "Rising Out of Burnout & Spiritual Exhaustion", cat: "Depression & Heaviness", ref: "Matthew 11:28", text: "Come unto me, all ye that labour and are heavy laden, and I will give you rest." },
  { title: "Navigating Sudden Grief & Tragic Loss", cat: "Grief & Sorrow", ref: "Psalm 23:4", text: "Yea, though I walk through the valley of the shadow of death, I will fear no evil: for thou art with me; thy rod and thy staff they comfort me." },
  { title: "Dismantling Occult Oppression & Witchcraft", cat: "Spiritual Warfare", ref: "Luke 10:19", text: "Behold, I give unto you power to tread on serpents and scorpions, and over all the power of the enemy: and nothing shall by any means hurt you." },
  { title: "Breaking Stagnation in Career & Academic Pursuits", cat: "Destiny & Career", ref: "Deuteronomy 28:13", text: "And the LORD shall make thee the head, and not the tail; and thou shalt be above only, and thou shalt not be beneath." },
  { title: "Healing a Crushed & Broken Spirit", cat: "Heart Healing", ref: "Psalm 147:3", text: "He healeth the broken in heart, and bindeth up their wounds." },
  { title: "Overcoming Loneliness in Barren Seasons", cat: "Emotional Battles", ref: "Hebrews 13:5", text: "I will never leave thee, nor forsake thee." },
  { title: "Victory Over Suicidal Thoughts & Severe Darkness", cat: "Depression & Heaviness", ref: "Psalm 118:17", text: "I shall not die, but live, and declare the works of the LORD." },
  { title: "Restoring Stolen Inheritance & Opportunities", cat: "Spiritual Warfare", ref: "Joel 2:25", text: "And I will restore to you the years that the locust hath eaten." },
  { title: "Overcoming Imposter Syndrome in Leadership", cat: "Self-Worth & Calling", ref: "Philippians 4:13", text: "I can do all things through Christ which strengtheneth me." },
  { title: "Walking in Victory Over Comparison & Envy", cat: "Spiritual Formation", ref: "James 3:17", text: "The wisdom that is from above is first pure, then peaceable, gentle, and easy to be intreated, full of mercy and good fruits." }
];

let joyCounter = 308;
while (joyChallenges1000.length < 1000) {
  const b = JOY_THEMATIC_BLUEPRINTS[(joyCounter - 308) % JOY_THEMATIC_BLUEPRINTS.length];
  const cycle = Math.floor((joyCounter - 308) / JOY_THEMATIC_BLUEPRINTS.length) + 1;
  const numStr = String(joyCounter).padStart(4, '0');
  const title = cycle === 1 ? b.title : `${b.title} (Strategy ${cycle})`;

  joyChallenges1000.push({
    id: `joy-${numStr}`,
    challengeTitle: title,
    category: b.cat,
    rootDeception: `The enemy attempts to convince you that this battle will defeat you and that God's deliverance will come too late.`,
    scripturalTruth: `God's Word in ${b.ref} promises: "${b.text}". The Lord is faithful to His covenant and cannot lie.`,
    anchorVerses: [
      {
        reference: b.ref,
        text: b.text,
        version: "KJV"
      }
    ],
    joyStrategySteps: [
      `Reject the Accusation: Cast down every vain imagination that elevates itself against the knowledge of God.`,
      `Apply the Blood: Plead the finished work of Jesus Christ over your life and circumstances.`,
      `Release Warfare Praise: Laugh at the enemy through the joy of the Lord and vocal thanksgiving.`,
      `Advance in Faith: Take the next practical step forward under the guidance of the Holy Spirit.`
    ],
    fortressDeclaration: `The Lord is my rock, my fortress, and my deliverer! In Jesus' name, I walk in supernatural triumph and unspeakable joy!`,
    deliverancePrayer: `Lord God Almighty, I bring this battle into Your throne room of grace. I stand on ${b.ref}. Let Your light pierce this darkness and grant me total breakthrough. Amen.`,
    praisePrescription: `Engage in 20 minutes of high praise and thanksgiving for the victory that is already established in heaven.`,
    testimonyOfVictory: `By anchoring the soul in ${b.ref} and refusing discouragement, divine victory manifested, bringing praise and honour to God.`,
    isAuthorFavourite: false
  });
  joyCounter++;
}

const joyFileContent = `import { JoyOvercomingChallenge } from "../types";

// Comprehensive Catalog of 1,000 Life Battles & Victory Blueprints
// First 307 playbooks are directly anchored on the Author's (Bismark Twum) Favourite Scriptures!
export const JOY_CATALOG_1000: JoyOvercomingChallenge[] = ${JSON.stringify(joyChallenges1000, null, 2)};
`;

fs.writeFileSync(path.join(__dirname, '../src/data/joyCatalog1000.ts'), joyFileContent, 'utf8');
console.log(`Successfully wrote src/data/joyCatalog1000.ts with ${joyChallenges1000.length} items!`);

console.log("All catalogs successfully generated!");
