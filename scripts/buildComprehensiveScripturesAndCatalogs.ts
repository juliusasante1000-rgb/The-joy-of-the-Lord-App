import fs from "fs";
import path from "path";
import { AuthorFavouriteScripture, AUTHOR_FAVOURITE_SCRIPTURES } from "../src/data/authorFavouriteScriptures";
import { JoyOvercomingChallenge, RhemaWordItem } from "../src/types";

// 1. Define the 14 new scriptures requested by user
const NEW_FAVOURITE_SCRIPTURES_DATA: Array<Omit<AuthorFavouriteScripture, "id" | "num" | "rhemaId" | "joyId">> = [
  {
    testament: "Old Testament",
    reference: "Psalms 3:1",
    ref: "Psalms 3:1",
    book: "Psalms",
    chapter: 3,
    theme: "Facing Multiplied Opposition with Unshakable Faith",
    text: "LORD, how are they increased that trouble me! many are they that rise up against me.",
    category: "Grit & Endurance",
    authorReflection: "When troubles multiply and adversaries arise on every side, faith does not panic. David began his prayer by laying his honest reality before God, knowing that the greatest battles become the platform for God's greatest deliverance.",
    keyDeclaration: "Though troubles increase around me, my trust in the Lord is unshakeable; God is my defender and deliverer!",
    tags: ["Deliverance", "Courage", "Spiritual Warfare", "Protection"],
    isNew: true
  },
  {
    testament: "Old Testament",
    reference: "Psalms 3:2",
    ref: "Psalms 3:2",
    book: "Psalms",
    chapter: 3,
    theme: "Silencing the Voice of Despair & Slander",
    text: "Many there be which say of my soul, There is no help for him in God. Selah.",
    category: "Mindset & Growth",
    authorReflection: "The enemy's ultimate weapon is to convince you that God has abandoned you. When men say 'there is no help for him in God,' pause and reflect (Selah)—for heaven's rescue is already in motion.",
    keyDeclaration: "I silence every voice of despair; my help comes from the Lord, the Maker of heaven and earth!",
    tags: ["Faith Over Fear", "Victory Over Doubt", "Selah", "Assurance"],
    isNew: true
  },
  {
    testament: "Old Testament",
    reference: "Psalms 3:3",
    ref: "Psalms 3:3",
    book: "Psalms",
    chapter: 3,
    theme: "The Lord: My Shield, My Glory, and Lifter of My Head",
    text: "But thou, O LORD, art a shield for me; my glory, and the lifter up of mine head.",
    category: "Divine Favor & Joy",
    authorReflection: "God does not merely give you a shield; He IS your shield. He covers every vulnerability, wraps you in His glory, and personally lifts up your bowed head in supernatural victory.",
    keyDeclaration: "The Lord is my shield on every side; He restores my dignity, crowns me with glory, and lifts up my head!",
    tags: ["Shield", "Lifter of Head", "Glory", "Divine Defense"],
    isNew: true
  },
  {
    testament: "New Testament",
    reference: "2 Corinthians 4:17",
    ref: "2 Corinthians 4:17",
    book: "2 Corinthians",
    chapter: 4,
    theme: "Light Afflictions Producing an Eternal Weight of Glory",
    text: "For our light affliction, which is but for a moment, worketh for us a far more exceeding and eternal weight of glory;",
    category: "Grit & Endurance",
    authorReflection: "Your present trials are neither permanent nor purposeless. In the divine economy, every momentary pressure is actively forging an eternal, heavy, unassailable weight of glory in your spirit.",
    keyDeclaration: "My current afflictions are momentary and light; they are producing for me a far more exceeding and eternal weight of glory!",
    tags: ["Eternal Perspective", "Endurance", "Glory", "Triumph Over Pain"],
    isNew: true
  },
  {
    testament: "New Testament",
    reference: "2 Corinthians 4:18",
    ref: "2 Corinthians 4:18",
    book: "2 Corinthians",
    chapter: 4,
    theme: "Fixing Eyes on the Eternal Unseen Realities",
    text: "While we look not at the things which are seen, but at the things which are not seen: for the things which are seen are temporal; but the things which are not seen are eternal.",
    category: "Mindset & Growth",
    authorReflection: "What is visible to physical eyes is temporary and subject to change; what is promised in the unseen realm of God's Word is eternal and unshakeable. Fix your spiritual gaze on the eternal promises of God.",
    keyDeclaration: "I refuse to be swayed by temporal circumstances; I fix my eyes on the eternal, unfailing Word of God!",
    tags: ["Spiritual Sight", "Eternal Realities", "Faith Vision", "Unseen Realm"],
    isNew: true
  },
  {
    testament: "New Testament",
    reference: "Romans 8:18",
    ref: "Romans 8:18",
    book: "Romans",
    chapter: 8,
    theme: "Present Sufferings Outweighed by Revealed Glory",
    text: "For I reckon that the sufferings of this present time are not worthy to be compared with the glory which shall be revealed in us.",
    category: "Destiny & Decisions",
    authorReflection: "The apostle Paul carried out a holy spiritual calculation: the sufferings of today cannot even be mentioned in the same equation as the breathtaking glory God is about to reveal in and through your life.",
    keyDeclaration: "I reckon with holy certainty that my present hardships are nothing compared to the magnificent glory about to be revealed in me!",
    tags: ["Future Glory", "Hope", "Spiritual Calculation", "Destiny"],
    isNew: true
  },
  {
    testament: "New Testament",
    reference: "1 Peter 5:10",
    ref: "1 Peter 5:10",
    book: "1 Peter",
    chapter: 5,
    theme: "The God of All Grace: Perfecting, Establishing, Strengthening, and Settling You",
    text: "But the God of all grace, who hath called us unto his eternal glory by Christ Jesus, after that ye have suffered a while, make you perfect, stablish, strengthen, settle you.",
    category: "Purpose & Calling",
    authorReflection: "After the season of testing comes the divine establishment. The God of all grace steps in personally to mature, establish, strengthen, and permanently settle you upon an immovable foundation.",
    keyDeclaration: "The God of all grace is perfecting, establishing, strengthening, and permanently settling my life in Christ Jesus!",
    tags: ["All Grace", "Settled Faith", "Strength", "Spiritual Maturity"],
    isNew: true
  },
  {
    testament: "New Testament",
    reference: "1 John 5:14",
    ref: "1 John 5:14",
    book: "1 John",
    chapter: 5,
    theme: "Unshakeable Confidence in Answered Prayer",
    text: "And this is the confidence that we have in him, that, if we ask any thing according to his will, he heareth us:",
    category: "Wisdom & Relationships",
    authorReflection: "True prayer is not a gamble or a desperate wish; it is entering the presence of God with bold confidence knowing that when we align our petitions with His revealed will, heaven listens attentively.",
    keyDeclaration: "I approach the throne of grace with bold confidence; because I ask according to God's will, I know He hears me!",
    tags: ["Prayer Confidence", "God's Will", "Audible Heaven", "Intercession"],
    isNew: true
  },
  {
    testament: "New Testament",
    reference: "1 John 5:15",
    ref: "1 John 5:15",
    book: "1 John",
    chapter: 5,
    theme: "Possessing Desired Petitions by Faith",
    text: "And if we know that he hear us, whatsoever we ask, we know that we have the petitions that we desired of him.",
    category: "Divine Favor & Joy",
    authorReflection: "Knowing that God hears you guarantees the reality of your answer before physical manifestation appears. Faith celebrates the granted petition in the spiritual realm immediately upon asking.",
    keyDeclaration: "Because God hears my prayer, I know with absolute certainty that I have the petitions I asked of Him!",
    tags: ["Answered Prayer", "Possession", "Faith Certainty", "Praise"],
    isNew: true
  },
  {
    testament: "New Testament",
    reference: "2 Timothy 3:15",
    ref: "2 Timothy 3:15",
    book: "2 Timothy",
    chapter: 3,
    theme: "The Holy Scriptures: Wisdom unto Salvation & Life Mastery",
    text: "And that from a child thou hast known the holy scriptures, which are able to make thee wise unto salvation through faith which is in Christ Jesus.",
    category: "Wisdom & Relationships",
    authorReflection: "The Holy Scriptures are not dry letters; they are impregnated with divine wisdom capable of transforming human weakness into eternal salvation, clarity, and mastery through faith in Christ Jesus.",
    keyDeclaration: "The Word of God fills my spirit with supernatural wisdom, illuminating my path and anchoring my salvation in Jesus Christ!",
    tags: ["Scripture Wisdom", "Salvation", "Spiritual Foundations", "Childlike Faith"],
    isNew: true
  },
  {
    testament: "New Testament",
    reference: "1 Timothy 4:15",
    ref: "1 Timothy 4:15",
    book: "1 Timothy",
    chapter: 4,
    theme: "Wholehearted Meditation and Evident Spiritual Profiting",
    text: "Meditate upon these things; give thyself wholly to them; that thy profiting may appear to all.",
    category: "Mindset & Growth",
    authorReflection: "Spiritual mastery requires wholehearted immersion. When you saturate your mind with God's truth and give yourself entirely to your calling, your growth, success, and profiting become undeniably visible to all.",
    keyDeclaration: "I give myself wholly to God's Word and calling; my spiritual profiting, wisdom, and excellence shall be evident to all!",
    tags: ["Meditation", "Total Devotion", "Evident Progress", "Excellence"],
    isNew: true
  },
  {
    testament: "New Testament",
    reference: "James 1:2",
    ref: "James 1:2",
    book: "James",
    chapter: 1,
    theme: "Counting Trials as Pure Joy in the Furnace of Growth",
    text: "My brethren, count it all joy when ye fall into divers temptations;",
    category: "Divine Favor & Joy",
    authorReflection: "Joy in the midst of trials is not emotional denial—it is spiritual warfare. Counting it all joy disarms the adversary and positions you to receive the supernatural fruit of spiritual maturity.",
    keyDeclaration: "I count every trial as pure joy, knowing that God is using every circumstance to elevate my spiritual stamina and character!",
    tags: ["Pure Joy", "Triumph in Trials", "Kingdom Attitude", "Overcoming"],
    isNew: true
  },
  {
    testament: "New Testament",
    reference: "James 1:3",
    ref: "James 1:3",
    book: "James",
    chapter: 1,
    theme: "The Testing of Faith Producing Supernatural Patience",
    text: "Knowing this, that the trying of your faith worketh patience.",
    category: "Grit & Endurance",
    authorReflection: "Faith that cannot be tested is faith that cannot be trusted. The friction of life's tests is designed by God to forge unbreakable endurance, patience, and kingdom authority within your spirit.",
    keyDeclaration: "The testing of my faith is forging unshakable patience and spiritual endurance within my soul!",
    tags: ["Endurance", "Faith Tested", "Patience", "Inner Strength"],
    isNew: true
  },
  {
    testament: "New Testament",
    reference: "James 1:4",
    ref: "James 1:4",
    book: "James",
    chapter: 1,
    theme: "Patience Perfecting Character: Mature, Complete, and Lacking Nothing",
    text: "But let patience have her perfect work, that ye may be perfect and entire, wanting nothing.",
    category: "Purpose & Calling",
    authorReflection: "Do not abort the process of spiritual development prematurely. When you allow patience to complete its deep inner work, you emerge spiritually mature, thoroughly equipped, whole, and lacking nothing.",
    keyDeclaration: "I allow patience to finish its perfect work in me; I am mature, complete, spiritually whole, and lacking nothing!",
    tags: ["Perfection", "Lacking Nothing", "Spiritual Maturity", "Wholeness"],
    isNew: true
  }
];

// Existing base 307
const base307 = AUTHOR_FAVOURITE_SCRIPTURES.slice(0, 307);

const all321Scriptures: AuthorFavouriteScripture[] = [
  ...base307,
  ...NEW_FAVOURITE_SCRIPTURES_DATA.map((item, idx) => {
    const num = 308 + idx;
    return {
      id: `fav-scripture-${num}`,
      num,
      testament: item.testament,
      reference: item.reference,
      ref: item.ref,
      book: item.book,
      chapter: item.chapter,
      theme: item.theme,
      text: item.text,
      category: item.category,
      authorReflection: item.authorReflection,
      keyDeclaration: item.keyDeclaration,
      tags: item.tags,
      isNew: true,
      rhemaId: `rhema-fav-${String(num).padStart(3, "0")}`,
      joyId: `joy-fav-${String(num).padStart(3, "0")}`
    };
  })
];

const otCount = all321Scriptures.filter(s => s.testament === "Old Testament").length;
const ntCount = all321Scriptures.filter(s => s.testament === "New Testament").length;

console.log(`Updated Author Favourite Scriptures total: ${all321Scriptures.length} (OT: ${otCount}, NT: ${ntCount})`);

// Write authorFavouriteScriptures.ts
const authorScripturesTsContent = `export interface AuthorFavouriteScripture {
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

export const AUTHOR_FAVOURITE_SCRIPTURES: AuthorFavouriteScripture[] = ${JSON.stringify(all321Scriptures, null, 2)};

export const AUTHOR_FAVOURITES_COUNT = ${all321Scriptures.length};
export const OT_FAVOURITES_COUNT = ${otCount};
export const NT_FAVOURITES_COUNT = ${ntCount};

export function getAuthorScriptureByNum(num: number): AuthorFavouriteScripture | undefined {
  return AUTHOR_FAVOURITE_SCRIPTURES.find(s => s.num === num);
}

export function getAuthorScriptureByRef(ref: string): AuthorFavouriteScripture | undefined {
  const normalized = ref.trim().toLowerCase().replace(/[\s\-\–]+/g, " ");
  return AUTHOR_FAVOURITE_SCRIPTURES.find(s => {
    const sNorm = s.reference.toLowerCase().replace(/[\s\-\–]+/g, " ");
    const sRefNorm = (s.ref || "").toLowerCase().replace(/[\s\-\–]+/g, " ");
    return sNorm === normalized || sRefNorm === normalized || sNorm.includes(normalized) || normalized.includes(sNorm);
  });
}
`;

fs.writeFileSync(path.join(process.cwd(), "src/data/authorFavouriteScriptures.ts"), authorScripturesTsContent);
console.log("Wrote src/data/authorFavouriteScriptures.ts successfully!");

// ==========================================
// 2. BUILD 1,000 JOY OF THE LORD OVERCOMING MESSAGES
// ==========================================

function mapJoyCategory(cat: string, theme: string): string {
  const t = theme.toLowerCase();
  if (t.includes("grief") || t.includes("sorrow") || t.includes("weeping") || t.includes("mourning") || t.includes("tears") || t.includes("comfort")) return "Grief & Sorrow";
  if (t.includes("fear") || t.includes("anxiety") || t.includes("terror") || t.includes("panic") || t.includes("worry") || t.includes("peace")) return "Anxiety & Fear";
  if (t.includes("heaviness") || t.includes("depression") || t.includes("despair") || t.includes("faint") || t.includes("weary")) return "Depression & Heaviness";
  if (t.includes("wealth") || t.includes("provision") || t.includes("debt") || t.includes("treasure") || t.includes("tithe") || t.includes("poverty") || t.includes("abundance")) return "Financial Strain";
  if (t.includes("family") || t.includes("marriage") || t.includes("children") || t.includes("brother") || t.includes("household") || t.includes("love") || t.includes("relationship")) return "Marital & Family Storms";
  if (t.includes("heal") || t.includes("sick") || t.includes("strength") || t.includes("flesh") || t.includes("vitality") || t.includes("body") || t.includes("health")) return "Physical Sickness & Fatigue";
  if (t.includes("delay") || t.includes("wait") || t.includes("patience") || t.includes("season") || t.includes("timing") || t.includes("endurance")) return "Delay & Discouragement";
  if (t.includes("warfare") || t.includes("enemy") || t.includes("devil") || t.includes("shield") || t.includes("deliverance") || t.includes("battle") || t.includes("armor")) return "Spiritual Warfare";
  if (t.includes("mind") || t.includes("thought") || t.includes("deceit") || t.includes("doubt") || t.includes("wisdom") || t.includes("knowledge") || t.includes("meditation")) return "Mind Battles";
  if (t.includes("guilt") || t.includes("shame") || t.includes("sin") || t.includes("condemnation") || t.includes("purity") || t.includes("holiness") || t.includes("forgiveness")) return "Guilt & Shame";
  if (t.includes("calling") || t.includes("ministry") || t.includes("servant") || t.includes("gospel") || t.includes("preach") || t.includes("church")) return "Ministry & Calling";
  if (t.includes("destiny") || t.includes("purpose") || t.includes("dominion") || t.includes("vocation") || t.includes("work") || t.includes("fruitfulness")) return "Career & Purpose";
  if (t.includes("addiction") || t.includes("snare") || t.includes("bondage") || t.includes("yoke") || t.includes("freedom") || t.includes("liberty")) return "Addictions & Strongholds";
  
  if (cat === "Destiny & Decisions") return "Career & Purpose";
  if (cat === "Purpose & Calling") return "Ministry & Calling";
  if (cat === "Wisdom & Relationships") return "Mind Battles";
  if (cat === "Grit & Endurance") return "Delay & Discouragement";
  if (cat === "Divine Favor & Joy") return "Spiritual Formation";
  if (cat === "Mindset & Growth") return "Mind Battles";
  return "Spiritual Formation";
}

function generateJoyDeception(theme: string, scriptureRef: string): string {
  const variations = [
    `The deceptive spirit of despair whispers that your current season of limitation is your final destination, tempting you to doubt the promise of ${scriptureRef}.`,
    `A subtle lie tries to persuade you that God has forgotten your labor of love and that the breakthrough promised in ${scriptureRef} will never manifest for your household.`,
    `The enemy seeks to paralyze your confidence by projecting past failures onto your future, blinding you to the living power of ${scriptureRef}.`,
    `Carnal reason suggests that natural circumstances have the final say, enticing you to accept defeat instead of standing on ${scriptureRef}.`,
    `The adversary plants feelings of inadequacy and unworthiness, arguing that God's grace revealed in ${scriptureRef} is insufficient to elevate your life.`,
    `Worry and emotional exhaustion attempt to convince you that you must carry every burden alone, obscuring the supernatural truth of ${scriptureRef}.`,
    `The snare of spiritual inertia urges you to remain passive and complacent, claiming that taking bold steps in ${scriptureRef} will only lead to disappointment.`,
    `Intimidation tries to magnify the strength of your opposition while minimizing the almighty covenant power released in ${scriptureRef}.`
  ];
  const hash = theme.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0);
  return variations[hash % variations.length];
}

function generateJoyTruth(theme: string, scriptureRef: string, text: string, reflection: string): string {
  return `The eternal decree of God in ${scriptureRef} declares: "${text}". ${reflection} Heavenly authority supersedes every temporal trial, unlocking undeniable joy, peace, and divine victory.`;
}

function generateJoySteps(theme: string, scriptureRef: string): string[] {
  return [
    `Silence the Voice of Doubt: Reject every internal monologue that contradicts the sovereign promise of ${scriptureRef}.`,
    `Activate High Praise: Worship God with intentional gladness before physical sight catches up to your faith.`,
    `Confess the Decree: Speak the revelation of ${theme} boldly over your family, work, and spiritual atmosphere.`,
    `Step Forward in Dominion: Execute your daily responsibilities with excellence, expecting supernatural favor to accompany you.`
  ];
}

function generateJoyPrayer(theme: string, scriptureRef: string): string {
  return `Lord God of Glory, I anchor my heart in the immutable truth of ${scriptureRef}. Strip away all anxiety, heaviness, and distraction. Settle my soul in Your holy presence, ignite a fresh fire of joy within me, and let the fruit of ${theme} overflow in my daily life. In Jesus' mighty Name, Amen!`;
}

function generateJoyPraise(theme: string, scriptureRef: string): string {
  const praisePrompts = [
    `Spend 10 minutes singing songs of covenant thanksgiving, lifting your hands in joyful adoration of God's faithfulness in ${scriptureRef}.`,
    `Engage in a 12-minute session of vocal praise, declaring Psalm 103 and thanking God for establishing the victory of ${scriptureRef}.`,
    `Turn off all distractions and play your favorite uplifting worship anthem, shouting with the voice of triumph in honor of ${scriptureRef}.`,
    `Walk around your room or workspace offering heartfelt gratitude to Jesus, rejoicing in the breakthrough sealed by ${scriptureRef}.`,
    `Sing a new song of praise to the Lord, celebrating His unfailing goodness and dancing in the freedom of ${scriptureRef}.`
  ];
  const hash = (theme + scriptureRef).split("").reduce((acc, c) => acc + c.charCodeAt(0), 0);
  return praisePrompts[hash % praisePrompts.length];
}

function generateJoyTestimony(theme: string, scriptureRef: string): string {
  const stories = [
    `A believer facing immense pressure anchored their morning prayer in ${scriptureRef}; within days, unexpected favor unlocked closed doors and restored deep peace.`,
    `Standing in relentless praise on ${scriptureRef} during a severe health challenge, a saint witnessed miraculous rejuvenation and the vanishing of all chronic symptoms.`,
    `After months of career stagnation, a worker meditated on ${scriptureRef} and experienced supernatural promotion beyond their natural qualifications.`,
    `A family torn by relational strife held fast to the joy of ${scriptureRef}; God healed their communication and restored unconditional love to their home.`,
    `In a time of intense spiritual warfare, declaring ${scriptureRef} broke every demonic chain of fear and released a season of continuous joy and abundance.`
  ];
  const hash = scriptureRef.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0);
  return stories[hash % stories.length];
}

const EXTRA_SCRIPTURES = [
  { ref: "Psalm 1:1-3", text: "Blessed is the man that walketh not in the counsel of the ungodly... He shall be like a tree planted by the rivers of water.", theme: "Unwithering Prosperity & Spiritual Rootedness", cat: "Mindset & Growth" },
  { ref: "Psalm 23:1-6", text: "The LORD is my shepherd; I shall not want. He maketh me to lie down in green pastures.", theme: "Absolute Provision & Divine Shepherdship", cat: "Divine Favor & Joy" },
  { ref: "Psalm 27:1-3", text: "The LORD is my light and my salvation; whom shall I fear? the LORD is the strength of my life; of whom shall I be afraid?", theme: "Fearless Boldness in the Face of Adversity", cat: "Anxiety & Fear" },
  { ref: "Psalm 34:1-4", text: "I will bless the LORD at all times: his praise shall continually be in my mouth... I sought the LORD, and he heard me, and delivered me from all my fears.", theme: "Continuous Praise as Weapon of Deliverance", cat: "Spiritual Formation" },
  { ref: "Psalm 37:4-5", text: "Delight thyself also in the LORD; and he shall give thee the desires of thine heart. Commit thy way unto the LORD; trust also in him.", theme: "Delighting in God to Inherit Heart Desires", cat: "Purpose & Calling" },
  { ref: "Psalm 46:1-3", text: "God is our refuge and strength, a very present help in trouble. Therefore will not we fear, though the earth be removed.", theme: "An Immovable Refuge in Times of Upheaval", cat: "Grit & Endurance" },
  { ref: "Psalm 68:1-3", text: "Let God arise, let his enemies be scattered: let them also that hate him flee before him.", theme: "Supernatural Scattering of Demonic Strongholds", cat: "Spiritual Warfare" },
  { ref: "Psalm 84:11", text: "For the LORD God is a sun and shield: the LORD will give grace and glory: no good thing will he withhold from them that walk uprightly.", theme: "Unfailing Grace, Glory, and Covenant Provision", cat: "Divine Favor & Joy" },
  { ref: "Psalm 91:1-4", text: "He that dwelleth in the secret place of the most High shall abide under the shadow of the Almighty.", theme: "Invulnerable Protection in the Secret Place", cat: "Spiritual Warfare" },
  { ref: "Psalm 100:1-5", text: "Make a joyful noise unto the LORD, all ye lands. Serve the LORD with gladness: come before his presence with singing.", theme: "Joyful Access to the Courts of the King", cat: "Spiritual Formation" },
  { ref: "Psalm 103:1-5", text: "Bless the LORD, O my soul: and all that is within me, bless his holy name. Who forgiveth all thine iniquities; who healeth all thy diseases.", theme: "Comprehensive Redemption, Healing, and Youthful Renewal", cat: "Physical Sickness & Fatigue" },
  { ref: "Psalm 112:1-3", text: "Blessed is the man that feareth the LORD, that delighteth greatly in his commandments. His seed shall be mighty upon earth.", theme: "Generational Blessings and Wealth in the Righteous House", cat: "Financial Strain" },
  { ref: "Psalm 118:24", text: "This is the day which the LORD hath made; we will rejoice and be glad in it.", theme: "Seizing Today with Conscious Joy and Gratitude", cat: "Divine Favor & Joy" },
  { ref: "Psalm 121:1-8", text: "I will lift up mine eyes unto the hills, from whence cometh my help. My help cometh from the LORD, which made heaven and earth.", theme: "Unsleeping Help from the Maker of Heaven and Earth", cat: "Grit & Endurance" },
  { ref: "Psalm 126:1-3", text: "When the LORD turned again the captivity of Zion, we were like them that dream. Then was our mouth filled with laughter.", theme: "Supernatural Restoration and Laughter After Captivity", cat: "Grief & Sorrow" },
  { ref: "Psalm 138:8", text: "The LORD will perfect that which concerneth me: thy mercy, O LORD, endureth for ever.", theme: "Divine Perfection of Every Personal Concern", cat: "Destiny & Decisions" },
  { ref: "Psalm 139:13-16", text: "I will praise thee; for I am fearfully and wonderfully made: marvellous are thy works.", theme: "Sacred Identity and Divine Craftsmanship", cat: "Mindset & Growth" },
  { ref: "Psalm 144:1-2", text: "Blessed be the LORD my strength which teacheth my hands to war, and my fingers to fight: My goodness, and my fortress.", theme: "Spiritual Skill and Victorious Warfare Training", cat: "Spiritual Warfare" },
  { ref: "Proverbs 3:5-6", text: "Trust in the LORD with all thine heart; and lean not unto thine own understanding. In all thy ways acknowledge him, and he shall direct thy paths.", theme: "Surrendering Self-Reliance for Divine Navigation", cat: "Destiny & Decisions" },
  { ref: "Proverbs 4:18", text: "The path of the just is as the shining light, that shineth more and more unto the perfect day.", theme: "Ever-Increasing Radiance and Spiritual Expansion", cat: "Mindset & Growth" },
  { ref: "Proverbs 10:22", text: "The blessing of the LORD, it maketh rich, and he addeth no sorrow with it.", theme: "Sorrow-Free Prosperity from the Hand of God", cat: "Financial Strain" },
  { ref: "Proverbs 18:10", text: "The name of the LORD is a strong tower: the righteous runneth into it, and is safe.", theme: "Running into the Safe Haven of God's Name", cat: "Spiritual Warfare" },
  { ref: "Proverbs 24:16", text: "For a just man falleth seven times, and riseth up again: but the wicked shall fall into mischief.", theme: "Relentless Resilience and Sevenfold Rising Power", cat: "Grit & Endurance" },
  { ref: "Isaiah 26:3", text: "Thou wilt keep him in perfect peace, whose mind is stayed on thee: because he trusteth in thee.", theme: "Guarding Perfect Peace in a Turbulent Mind", cat: "Mind Battles" },
  { ref: "Isaiah 40:29-31", text: "He giveth power to the faint; and to them that have no might he increaseth strength... They that wait upon the LORD shall renew their strength; they shall mount up with wings as eagles.", theme: "Eagle Soaring Power for the Exhausted Soul", cat: "Physical Sickness & Fatigue" },
  { ref: "Isaiah 41:10", text: "Fear thou not; for I am with thee: be not dismayed; for I am thy God: I will strengthen thee; yea, I will help thee; yea, I will uphold thee with the right hand of my righteousness.", theme: "The Right Hand of God Upholding Your Steps", cat: "Anxiety & Fear" },
  { ref: "Isaiah 43:1-2", text: "When thou passest through the waters, I will be with thee; and through the rivers, they shall not overflow thee: when thou walkest through the fire, thou shalt not be burned.", theme: "Immunity in the Flood and Fire of Life", cat: "Grit & Endurance" },
  { ref: "Isaiah 53:5", text: "But he was wounded for our transgressions, he was bruised for our iniquities: the chastisement of our peace was upon him; and with his stripes we are healed.", theme: "Complete Physical and Emotional Healing in the Atonement", cat: "Physical Sickness & Fatigue" },
  { ref: "Isaiah 54:17", text: "No weapon that is formed against thee shall prosper; and every tongue that shall rise against thee in judgment thou shalt condemn.", theme: "Total Neutralization of Every Satanic Weapon", cat: "Spiritual Warfare" },
  { ref: "Isaiah 55:10-11", text: "So shall my word be that goeth forth out of my mouth: it shall not return unto me void, but it shall accomplish that which I please.", theme: "The Unfailing Harvest of God's Spoken Word", cat: "Purpose & Calling" },
  { ref: "Isaiah 60:1-3", text: "Arise, shine; for thy light is come, and the glory of the LORD is risen upon thee.", theme: "Supernatural Illumination and Global Attraction", cat: "Divine Favor & Joy" },
  { ref: "Isaiah 61:1-3", text: "The Spirit of the Lord GOD is upon me; because the LORD hath anointed me to preach good tidings unto the meek... to give unto them beauty for ashes.", theme: "Exchange of Ashes for Crown of Supernatural Beauty", cat: "Grief & Sorrow" },
  { ref: "Jeremiah 29:11", text: "For I know the thoughts that I think toward you, saith the LORD, thoughts of peace, and not of evil, to give you an expected end.", theme: "An Expected End of Peace and Sovereign Hope", cat: "Destiny & Decisions" },
  { ref: "Jeremiah 33:3", text: "Call unto me, and I will answer thee, and shew thee great and mighty things, which thou knowest not.", theme: "Unveiling Hidden Mysteries Through Urgent Prayer", cat: "Spiritual Formation" },
  { ref: "Lamentations 3:22-23", text: "It is of the LORD's mercies that we are not consumed, because his compassions fail not. They are new every morning: great is thy faithfulness.", theme: "Morning Mercies and Greatness of Divine Faithfulness", cat: "Divine Favor & Joy" },
  { ref: "Joel 2:25-26", text: "And I will restore to you the years that the locust hath eaten, the cankerworm, and the caterpiller, and the palmerworm.", theme: "Supernatural Restoration of Lost Years and Seasons", cat: "Delay & Discouragement" },
  { ref: "Habakkuk 3:17-19", text: "Although the fig tree shall not blossom, neither shall fruit be in the vines... Yet I will rejoice in the LORD, I will joy in the God of my salvation.", theme: "Unconditional Joy That Climbs High Mountains", cat: "Divine Favor & Joy" },
  { ref: "Zechariah 4:6-7", text: "Not by might, nor by power, but by my spirit, saith the LORD of hosts. Who art thou, O great mountain? before Zerubbabel thou shalt become a plain.", theme: "Flattening Impossible Mountains by the Holy Spirit", cat: "Spiritual Warfare" },
  { ref: "Malachi 3:10", text: "Bring ye all the tithes into the storehouse... and prove me now herewith, saith the LORD of hosts, if I will not open you the windows of heaven.", theme: "Open Windows of Heaven and Rebuking the Devourer", cat: "Financial Strain" },
  { ref: "Matthew 6:33", text: "But seek ye first the kingdom of God, and his righteousness; and all these things shall be added unto you.", theme: "Prioritizing the Kingdom for Supernatural Addition", cat: "Purpose & Calling" },
  { ref: "Matthew 11:28-30", text: "Come unto me, all ye that labour and are heavy laden, and I will give you rest. Take my yoke upon you, and learn of me.", theme: "Trading Heavy Yokes for Christ's Easy Burden", cat: "Depression & Heaviness" },
  { ref: "Matthew 17:20", text: "If ye have faith as a grain of mustard seed, ye shall say unto this mountain, Remove hence to yonder place; and it shall remove.", theme: "Mustard Seed Faith That Shifts Mountainous Obstacles", cat: "Grit & Endurance" },
  { ref: "Mark 9:23", text: "Jesus said unto him, If thou canst believe, all things are possible to him that believeth.", theme: "Unlimited Possibility for the Believing Heart", cat: "Mindset & Growth" },
  { ref: "Mark 11:24", text: "Therefore I say unto you, What things soever ye desire, when ye pray, believe that ye receive them, and ye shall have them.", theme: "Praying with the Joy of Immediate Reception", cat: "Spiritual Formation" },
  { ref: "Luke 1:37", text: "For with God nothing shall be impossible.", theme: "Walking in Zero Impossibility with God", cat: "Mindset & Growth" },
  { ref: "Luke 10:19", text: "Behold, I give unto you power to tread on serpents and scorpions, and over all the power of the enemy: and nothing shall by any means hurt you.", theme: "Unchallengeable Authority Over All Demonic Force", cat: "Spiritual Warfare" },
  { ref: "John 10:10", text: "The thief cometh not, but for to steal, and to kill, and to destroy: I am come that they might have life, and that they might have it more abundantly.", theme: "Stepping into Christ's Overflowing Abundant Life", cat: "Divine Favor & Joy" },
  { ref: "John 14:27", text: "Peace I leave with you, my peace I give unto you: not as the world giveth, give I unto you. Let not your heart be troubled, neither let it be afraid.", theme: "Supernatural Peace That the World Cannot Plunder", cat: "Anxiety & Fear" },
  { ref: "John 15:5-7", text: "I am the vine, ye are the branches: He that abideth in me, and I in him, the same bringeth forth much fruit.", theme: "Branching from the True Vine for Maximum Fruitfulness", cat: "Purpose & Calling" },
  { ref: "John 16:33", text: "These things I have spoken unto you, that in me ye might have peace. In the world ye shall have tribulation: but be of good cheer; I have overcome the world.", theme: "Overcoming Tribulation with Victorious Good Cheer", cat: "Divine Favor & Joy" },
  { ref: "Romans 8:28", text: "And we know that all things work together for good to them that love God, to them who are the called according to his purpose.", theme: "Master Orchestration of All Circumstances for Good", cat: "Destiny & Decisions" },
  { ref: "Romans 8:31-32", text: "What shall we then say to these things? If God be for us, who can be against us? He that spared not his own Son... how shall he not with him also freely give us all things?", theme: "Sovereign Vindication: God Is Unreservedly For You", cat: "Divine Favor & Joy" },
  { ref: "Romans 8:37", text: "Nay, in all these things we are more than conquerors through him that loved us.", theme: "More Than a Conqueror Through Inseparable Love", cat: "Grit & Endurance" },
  { ref: "Romans 12:1-2", text: "I beseech you therefore, brethren, by the mercies of God, that ye present your bodies a living sacrifice... And be not conformed to this world: but be ye transformed by the renewing of your mind.", theme: "Mind Transformation and Living Consecration", cat: "Mind Battles" },
  { ref: "1 Corinthians 2:9", text: "Eye hath not seen, nor ear heard, neither have entered into the heart of man, the things which God hath prepared for them that love him.", theme: "Unfathomable Blessings Prepared for God-Lovers", cat: "Divine Favor & Joy" },
  { ref: "1 Corinthians 10:13", text: "There hath no temptation taken you but such as is common to man: but God is faithful, who will not suffer you to be tempted above that ye are able; but will with the temptation also make a way to escape.", theme: "Faithful Escape and Victory in Every Trial", cat: "Grit & Endurance" },
  { ref: "1 Corinthians 15:57-58", text: "But thanks be to God, which giveth us the victory through our Lord Jesus Christ. Therefore, my beloved brethren, be ye stedfast, unmoveable, always abounding in the work of the Lord.", theme: "Steadfast Labors Anchored in Guaranteed Victory", cat: "Ministry & Calling" },
  { ref: "2 Corinthians 1:3-4", text: "Blessed be God... the God of all comfort; Who comforteth us in all our tribulation, that we may be able to comfort them which are in any trouble.", theme: "Turning Personal Pain into a Ministry of Comfort", cat: "Grief & Sorrow" },
  { ref: "2 Corinthians 4:17-18", text: "For our light affliction, which is but for a moment, worketh for us a far more exceeding and eternal weight of glory; While we look not at the things which are seen, but at the things which are not seen.", theme: "Eternal Weight of Glory Outweighing Light Afflictions", cat: "Delay & Discouragement" },
  { ref: "2 Corinthians 5:17", text: "Therefore if any man be in Christ, he is a new creature: old things are passed away; behold, all things are become new.", theme: "New Creation Identity: Erasing Past Condemnation", cat: "Guilt & Shame" },
  { ref: "2 Corinthians 9:8", text: "And God is able to make all grace abound toward you; that ye, always having all sufficiency in all things, may abound to every good work.", theme: "All Grace Abounding for All Sufficiency in All Things", cat: "Financial Strain" },
  { ref: "2 Corinthians 12:9-10", text: "My grace is sufficient for thee: for my strength is made perfect in weakness. Most gladly therefore will I rather glory in my infirmities, that the power of Christ may rest upon me.", theme: "Perfected Strength in Human Weakness", cat: "Physical Sickness & Fatigue" },
  { ref: "Galatians 2:20", text: "I am crucified with Christ: nevertheless I live; yet not I, but Christ liveth in me: and the life which I now live in the flesh I live by the faith of the Son of God.", theme: "Crucified with Christ, Powered by Inward Life", cat: "Spiritual Formation" },
  { ref: "Galatians 6:9", text: "And let us not be weary in well doing: for in due season we shall reap, if we faint not.", theme: "Reaping in Due Season Without Fainting", cat: "Grit & Endurance" },
  { ref: "Ephesians 1:3-4", text: "Blessed be the God and Father of our Lord Jesus Christ, who hath blessed us with all spiritual blessings in heavenly places in Christ.", theme: "Possessing Every Spiritual Blessing in Heavenly Realms", cat: "Divine Favor & Joy" },
  { ref: "Ephesians 2:10", text: "For we are his workmanship, created in Christ Jesus unto good works, which God hath before ordained that we should walk in them.", theme: "God's Masterpiece Prepared for Preordained Good Works", cat: "Purpose & Calling" },
  { ref: "Ephesians 3:20-21", text: "Now unto him that is able to do exceeding abundantly above all that we ask or think, according to the power that worketh in us.", theme: "Exceeding Abundantly Above All We Can Ask or Imagine", cat: "Divine Favor & Joy" },
  { ref: "Ephesians 6:10-18", text: "Finally, my brethren, be strong in the Lord, and in the power of his might. Put on the whole armour of God, that ye may be able to stand against the wiles of the devil.", theme: "Standing Invincible in the Whole Armor of God", cat: "Spiritual Warfare" },
  { ref: "Philippians 1:6", text: "Being confident of this very thing, that he which hath begun a good work in you will perform it until the day of Jesus Christ.", theme: "Unyielding Confidence in God's Unfinished Work", cat: "Mindset & Growth" },
  { ref: "Philippians 4:6-7", text: "Be careful for nothing; but in every thing by prayer and supplication with thanksgiving let your requests be made known unto God. And the peace of God, which passeth all understanding, shall keep your hearts.", theme: "Exchanging Anxious Cares for Guarding Peace", cat: "Anxiety & Fear" },
  { ref: "Philippians 4:13", text: "I can do all things through Christ which strengtheneth me.", theme: "Unlimited Capacity Through Inward Christ-Strength", cat: "Grit & Endurance" },
  { ref: "Philippians 4:19", text: "But my God shall supply all your need according to his riches in glory by Christ Jesus.", theme: "Supply According to the Riches of Heavenly Glory", cat: "Financial Strain" },
  { ref: "Colossians 3:1-3", text: "If ye then be risen with Christ, seek those things which are above... Set your affection on things above, not on things on the earth. For ye are dead, and your life is hid with Christ in God.", theme: "Hid with Christ in God: Ascended Perspective", cat: "Spiritual Formation" },
  { ref: "1 Thessalonians 5:16-18", text: "Rejoice evermore. Pray without ceasing. In every thing give thanks: for this is the will of God in Christ Jesus concerning you.", theme: "The Triad of Power: Rejoicing, Praying, and Giving Thanks", cat: "Divine Favor & Joy" },
  { ref: "2 Timothy 1:7", text: "For God hath not given us the spirit of fear; but of power, and of love, and of a sound mind.", theme: "Sound Mind, Bold Power, and Perfect Love Over Fear", cat: "Anxiety & Fear" },
  { ref: "Hebrews 4:16", text: "Let us therefore come boldly unto the throne of grace, that we may obtain mercy, and find grace to help in time of need.", theme: "Bold Approach to the Throne of Timely Grace", cat: "Spiritual Formation" },
  { ref: "Hebrews 11:1", text: "Now faith is the substance of things hoped for, the evidence of things not seen.", theme: "Tangible Substance of Unseen Supernatural Realities", cat: "Mindset & Growth" },
  { ref: "Hebrews 12:1-2", text: "Wherefore seeing we also are compassed about with so great a cloud of witnesses, let us lay aside every weight... Looking unto Jesus the author and finisher of our faith.", theme: "Running Your Race with Eyes Fixed on Jesus", cat: "Grit & Endurance" },
  { ref: "Hebrews 13:5-6", text: "Let your conversation be without covetousness; and be content with such things as ye have: for he hath said, I will never leave thee, nor forsake thee.", theme: "Contentment in God's Inseparable Companionship", cat: "Financial Strain" },
  { ref: "James 1:2-4", text: "My brethren, count it all joy when ye fall into divers temptations; Knowing this, that the trying of your faith worketh patience. But let patience have her perfect work, that ye may be perfect and entire, wanting nothing.", theme: "Counting Trials as Joy to Complete Spiritual Maturity", cat: "Grit & Endurance" },
  { ref: "James 1:5-6", text: "If any of you lack wisdom, let him ask of God, that giveth to all men liberally, and upbraideth not; and it shall be given him.", theme: "Asking for Generous, Unreproaching Wisdom from Above", cat: "Mind Battles" },
  { ref: "James 4:7-8", text: "Submit yourselves therefore to God. Resist the devil, and he will flee from you. Draw nigh to God, and he will draw nigh to you.", theme: "Submitting to God, Resisting the Devil, and Intimate Closeness", cat: "Spiritual Warfare" },
  { ref: "1 Peter 5:7", text: "Casting all your care upon him; for he careth for you.", theme: "Casting Every Heavy Burden into God's Gentle Hands", cat: "Anxiety & Fear" },
  { ref: "1 Peter 5:10", text: "But the God of all grace, who hath called us unto his eternal glory by Christ Jesus, after that ye have suffered a while, make you perfect, stablish, strengthen, settle you.", theme: "Established, Strengthened, and Settled by All Grace", cat: "Delay & Discouragement" },
  { ref: "1 John 4:4", text: "Ye are of God, little children, and have overcome them: because greater is he that is in you, than he that is in the world.", theme: "The Greater One Inside Overcoming All External Powers", cat: "Spiritual Warfare" },
  { ref: "1 John 5:4", text: "For whatsoever is born of God overcometh the world: and this is the victory that overcometh the world, even our faith.", theme: "World-Overcoming Faith Born of Almighty God", cat: "Mindset & Growth" },
  { ref: "Revelation 1:17-18", text: "Fear not; I am the first and the last: I am he that liveth, and was dead; and, behold, I am alive for evermore, Amen; and have the keys of hell and of death.", theme: "The Living Christ Holding the Keys of Life and Death", cat: "Spiritual Formation" },
  { ref: "Revelation 12:11", text: "And they overcame him by the blood of the Lamb, and by the word of their testimony; and they loved not their lives unto the death.", theme: "Overcoming by the Blood and the Word of Testimony", cat: "Spiritual Warfare" },
  { ref: "Revelation 21:3-5", text: "And God shall wipe away all tears from their eyes; and there shall be no more death, neither sorrow, nor crying... Behold, I make all things new.", theme: "All Tears Wiped Away: The Promise of All Things Made New", cat: "Grief & Sorrow" },
  { ref: "Revelation 22:17", text: "And the Spirit and the bride say, Come. And let him that heareth say, Come. And let him that is athirst come. And whosoever will, let him take the water of life freely.", theme: "Drinking Freely from the Fountain of the Water of Life", cat: "Divine Favor & Joy" }
];

const all1000Joy: JoyOvercomingChallenge[] = [];

// 1-321: Author's 321 Favourite Scriptures
all321Scriptures.forEach((s) => {
  const joyCat = mapJoyCategory(s.category, s.theme);
  const challengeTitle = `Triumphing in ${s.theme}: Overcoming Through ${s.reference}`;
  all1000Joy.push({
    id: `joy-fav-${String(s.num).padStart(3, "0")}`,
    challengeTitle,
    category: joyCat,
    rootDeception: generateJoyDeception(s.theme, s.reference),
    scripturalTruth: generateJoyTruth(s.theme, s.reference, s.text, s.authorReflection),
    anchorVerses: [
      {
        reference: s.reference,
        text: s.text,
        version: "KJV"
      }
    ],
    joyStrategySteps: generateJoySteps(s.theme, s.reference),
    fortressDeclaration: `${s.keyDeclaration} The joy of the Lord is my unshakeable fortress!`,
    deliverancePrayer: generateJoyPrayer(s.theme, s.reference),
    praisePrescription: generateJoyPraise(s.theme, s.reference),
    testimonyOfVictory: generateJoyTestimony(s.theme, s.reference),
    isAuthorFavourite: true
  });
});

// 322-1000: Remaining items
for (let i = 322; i <= 1000; i++) {
  const itemIndex = (i - 322) % EXTRA_SCRIPTURES.length;
  const script = EXTRA_SCRIPTURES[itemIndex];
  const iteration = Math.floor((i - 322) / EXTRA_SCRIPTURES.length) + 1;
  const joyCat = script.cat;
  const challengeTitle = `Victory Blueprint #${i}: ${script.theme} (${script.ref}${iteration > 1 ? ` - Dimension ${iteration}` : ""})`;
  
  const deceptions = [
    `The enemy attempts to blind you to the reality of ${script.ref}, insisting that your current struggles will outlast God's mercy and promise.`,
    `A subtle spirit of discouragement suggests that prayer on ${script.ref} has no tangible effect, seeking to weaken your faith in God's timing.`,
    `The voice of fear tries to magnify natural impossibilities above the spiritual authority revealed in ${script.ref}.`,
    `Feelings of weariness and burnout tempt you to abandon the divine pace established in ${script.ref} for fleshly striving.`,
    `The adversary whispers that you are disqualified from experiencing the full harvest promised in ${script.ref}.`,
    `Cynicism and past delays try to erect a wall of emotional numbness, preventing you from embracing the joyful breakthrough of ${script.ref}.`,
    `A deceptive sense of isolation argues that nobody sees your trials, obscuring the living comfort of ${script.ref}.`,
    `Intimidation tries to silence your testimony, hoping you forget the covenant deliverance guaranteed in ${script.ref}.`
  ];
  const deception = deceptions[(i + itemIndex) % deceptions.length];
  
  const truths = [
    `God's Word in ${script.ref} establishes that "${script.text}". You are deeply anchored in His sovereign care, empowered to conquer every storm through kingdom joy.`,
    `According to ${script.ref}, "${script.text}". Nothing in heaven or earth can revoke God's covenant blessing when you walk in obedience and praise.`,
    `Scripture announces in ${script.ref}: "${script.text}". Your life is enveloped in divine favor, and every weapon formed against your destiny is dismantled.`,
    `The living truth of ${script.ref} proves that "${script.text}". God is actively perfecting everything that concerns you, transforming trials into stepping stones of glory.`
  ];
  const scripturalTruth = truths[(i + iteration) % truths.length];
  
  const steps = [
    `Break Mental Strongholds: Proclaim ${script.ref} aloud to demolish every negative or fearful thought pattern.`,
    `Unleash Targeted Praise: Thank God in advance for fulfilling ${script.theme} in your life, home, and health.`,
    `Stand in Covenant Authority: Refuse to negotiate with doubt; let the joy of the Lord be your unassailable fortress.`,
    `Walk in Supernatural Peace: Take practical, confident steps forward knowing heaven is actively fighting your battles.`
  ];
  
  const fortressDeclaration = `I declare that ${script.ref} is my spiritual reality! No weapon formed against me shall prosper. The joy of the Lord is my strength and my everlasting shield!`;
  
  const prayers = [
    `Heavenly Father, I receive the living promise of ${script.ref}. Fill my heart with Your supernatural joy, drive away all fear and depression, and let Your peace reign over my soul. In Jesus' Name, Amen!`,
    `Lord Jesus, You are my Rock and Deliverer. I anchor my life in ${script.ref}. Strengthen my inner man, elevate my vision, and let Your mighty hand perform wonders for Your glory. Amen!`,
    `Father of Mercies, thank You that ${script.ref} is settled forever in heaven. Dispel every shadow of doubt, grant me relentless faith, and make my life a fountain of Your joy. In Jesus' Name, Amen!`
  ];
  const deliverancePrayer = prayers[i % prayers.length];
  
  const praise = `Dedicate 10 minutes to uninterrupted, heartfelt praise and worship, declaring the triumph of ${script.ref} over every area of your life.`;
  
  const testimonies = [
    `A brother overwhelmed by career uncertainty declared ${script.ref} daily; within a month, he received an unexpected open door with double the salary and peace of mind.`,
    `Facing chronic worry, a believer turned to continuous praise based on ${script.ref}; immediate supernatural calm replaced panic, leading to sound sleep and vibrant health.`,
    `A sister believing God for family healing held fast to ${script.ref}; God moved miraculously, softening hardened hearts and restoring joyous unity.`,
    `Standing on ${script.ref} during a fierce financial squeeze, a family experienced miraculous debt cancellation and sudden overflow of kingdom provision.`
  ];
  const testimony = testimonies[i % testimonies.length];
  
  all1000Joy.push({
    id: `joy-catalog-${String(i).padStart(4, "0")}`,
    challengeTitle,
    category: joyCat,
    rootDeception: deception,
    scripturalTruth,
    anchorVerses: [
      {
        reference: script.ref,
        text: script.text,
        version: "KJV"
      }
    ],
    joyStrategySteps: steps,
    fortressDeclaration,
    deliverancePrayer,
    praisePrescription: praise,
    testimonyOfVictory: testimony,
    isAuthorFavourite: false
  });
}

console.log(`Generated 1,000 Joy messages. Total: ${all1000Joy.length}`);

// Split Joy into 4 parts
const srcDir = path.join(process.cwd(), "src/data");

fs.writeFileSync(
  path.join(srcDir, "joyCatalogPart1.ts"),
  `import { JoyOvercomingChallenge } from "../types";\n\nexport const JOY_CATALOG_PART1: JoyOvercomingChallenge[] = ${JSON.stringify(all1000Joy.slice(0, 250), null, 2)};\n`
);
fs.writeFileSync(
  path.join(srcDir, "joyCatalogPart2.ts"),
  `import { JoyOvercomingChallenge } from "../types";\n\nexport const JOY_CATALOG_PART2: JoyOvercomingChallenge[] = ${JSON.stringify(all1000Joy.slice(250, 500), null, 2)};\n`
);
fs.writeFileSync(
  path.join(srcDir, "joyCatalogPart3.ts"),
  `import { JoyOvercomingChallenge } from "../types";\n\nexport const JOY_CATALOG_PART3: JoyOvercomingChallenge[] = ${JSON.stringify(all1000Joy.slice(500, 750), null, 2)};\n`
);
fs.writeFileSync(
  path.join(srcDir, "joyCatalogPart4.ts"),
  `import { JoyOvercomingChallenge } from "../types";\n\nexport const JOY_CATALOG_PART4: JoyOvercomingChallenge[] = ${JSON.stringify(all1000Joy.slice(750, 1000), null, 2)};\n`
);

fs.writeFileSync(
  path.join(srcDir, "joyCatalog1000.ts"),
  `import { JoyOvercomingChallenge } from "../types";
import { JOY_CATALOG_PART1 } from "./joyCatalogPart1";
import { JOY_CATALOG_PART2 } from "./joyCatalogPart2";
import { JOY_CATALOG_PART3 } from "./joyCatalogPart3";
import { JOY_CATALOG_PART4 } from "./joyCatalogPart4";

export const JOY_CATALOG_1000: JoyOvercomingChallenge[] = [
  ...JOY_CATALOG_PART1,
  ...JOY_CATALOG_PART2,
  ...JOY_CATALOG_PART3,
  ...JOY_CATALOG_PART4
];

export const JOY_OVERCOMING_COUNT = JOY_CATALOG_1000.length;
`
);

// ==========================================
// 3. BUILD 1,000 PROPHETIC RHEMA NOW WORD MESSAGES
// ==========================================

function mapRhemaSeason(cat: string, theme: string): string {
  const t = theme.toLowerCase();
  if (t.includes("speed") || t.includes("run") || t.includes("accelerat") || t.includes("swift") || t.includes("quick") || t.includes("leap")) return "Divine Acceleration";
  if (t.includes("peace") || t.includes("still") || t.includes("rest") || t.includes("quiet") || t.includes("seren") || t.includes("calm")) return "Supernatural Peace";
  if (t.includes("war") || t.includes("battle") || t.includes("shield") || t.includes("sword") || t.includes("conquer") || t.includes("weapon") || t.includes("enemy") || t.includes("devil") || t.includes("demoni") || t.includes("armour") || t.includes("armor")) return "Spiritual Warfare";
  if (t.includes("shift") || t.includes("season") || t.includes("door") || t.includes("transition") || t.includes("cross") || t.includes("new thing")) return "Transition";
  if (t.includes("wealth") || t.includes("provision") || t.includes("money") || t.includes("gold") || t.includes("silver") || t.includes("debt") || t.includes("storehouse") || t.includes("harvest") || t.includes("tithe") || t.includes("blessing") || t.includes("rich")) return "Wealth & Supernatural Provision";
  if (t.includes("heal") || t.includes("health") || t.includes("sick") || t.includes("cure") || t.includes("stripe") || t.includes("vitality") || t.includes("renew") || t.includes("youth")) return "Divine Health & Vitality";
  if (t.includes("promote") || t.includes("elevat") || t.includes("lift") || t.includes("exalt") || t.includes("throne") || t.includes("glory") || t.includes("head") || t.includes("honour") || t.includes("crown")) return "Elevation & Promotion";
  if (t.includes("holiness") || t.includes("pure") || t.includes("consecrat") || t.includes("secret place") || t.includes("altar") || t.includes("intimacy") || t.includes("abide") || t.includes("fellowship")) return "Intimacy & Holiness";
  if (t.includes("destiny") || t.includes("purpose") || t.includes("ordain") || t.includes("calling") || t.includes("vocation") || t.includes("workmanship") || t.includes("decree")) return "Destiny Fulfillment";
  if (t.includes("joy") || t.includes("glad") || t.includes("rejoice") || t.includes("laugh") || t.includes("sing") || t.includes("praise") || t.includes("shout")) return "Unspeakable Joy";
  if (t.includes("wisdom") || t.includes("knowledge") || t.includes("discern") || t.includes("understand") || t.includes("counsel") || t.includes("mind") || t.includes("meditat")) return "Wisdom & Discernment";
  if (t.includes("covenant") || t.includes("promise") || t.includes("oath") || t.includes("sure mercies") || t.includes("faithfulness")) return "Covenant Blessing";
  if (t.includes("restore") || t.includes("double") || t.includes("recover") || t.includes("repay") || t.includes("return")) return "Restoration & Double Honor";
  
  if (cat === "Destiny & Decisions") return "Destiny Fulfillment";
  if (cat === "Purpose & Calling") return "Kingdom Dominion";
  if (cat === "Wisdom & Relationships") return "Wisdom & Discernment";
  if (cat === "Grit & Endurance") return "Breakthrough";
  if (cat === "Divine Favor & Joy") return "Elevation & Promotion";
  if (cat === "Mindset & Growth") return "Breakthrough";
  return "Breakthrough";
}

function generateRhemaNowWord(s: { reference: string; text: string; theme: string; authorReflection?: string }): {
  propheticDeclaration: string;
  nowWordText: string;
  actionCommandment: string;
  propheticDecree: string;
  dailyActivationGuide: string[];
  spiritualAtmosphere: string;
} {
  const ref = s.reference;
  const text = s.text;
  const theme = s.theme;
  const refText = s.authorReflection || `When we stand immovable upon God's promise, heaven's resources back our steps.`;

  const propheticDeclaration = `By the apostolic decree of ${ref}, every limitation opposing your ${theme.toLowerCase()} is shattered; God's sovereign covenant is accelerating your life into undeniable victory!`;

  const nowWordText = `Hear the living voice of the Spirit for this very hour: ${ref} declares, "${text}". God is not merely giving you advice; He is releasing a spiritual impartation that dismantles past stagnation. ${refText} Look beyond the natural storm and fix your spirit on the finished work of Christ. The appointed hour of your lifting has arrived.`;

  const actionCommandments = [
    `Speak ${ref} boldly three times aloud over your atmosphere, reject every lingering doubt, and execute your daily assignments with apostolic boldness.`,
    `Refuse to confer with flesh and blood; take a deliberate step of faith today toward the realization of ${theme}.`,
    `Anoint your workspace and home with prayer, releasing thanksgiving for the immediate fulfillment of ${ref}.`,
    `Cast down every negative memory or lie of delay; align your speech with the high voltage of ${ref}.`
  ];
  const hash = (ref + theme).split("").reduce((acc, c) => acc + c.charCodeAt(0), 0);
  const actionCommandment = actionCommandments[hash % actionCommandments.length];

  const propheticDecree = `In the Name of Jesus Christ, I decree that ${ref} is established in my life! I walk in supernatural authority, divine favor surrounds me as a shield, and no weapon formed against my destiny shall prosper!`;

  const guides = [
    [
      `Morning Meditation: Recite ${ref} upon waking, anchoring your spirit in its holy promises.`,
      `Midday Victory Declaration: Speak the decree of ${theme} over your career and family.`,
      `Evening Consecration: Thank God for His unseen angels working on your behalf.`
    ],
    [
      `Morning Flame: Pray in the Holy Ghost for 10 minutes, releasing spiritual momentum.`,
      `Midday Focus: Reject any anxious thought by quoting ${ref} with loud conviction.`,
      `Night Shalom: Sleep in the deep peace of God knowing your breakthrough is sealed.`
    ],
    [
      `Morning Alignment: Write ${ref} in your prayer journal as today's cornerstone word.`,
      `Afternoon Dominion: Take one tangible, aggressive action toward your God-given goals.`,
      `Evening Praise: Sing a hymn of thanksgiving for God's unbroken covenant faithfulness.`
    ]
  ];
  const dailyActivationGuide = guides[hash % guides.length];

  const atmospheres = [
    `Atmosphere of Swift Deliverance & Divine Favor`,
    `Supernatural Momentum & Prophetic Speed`,
    `Still Waters & Divine Serenity`,
    `Triumphant Dominion & Victorious Authority`,
    `Pioneering Grace & Fresh Anointing`,
    `Supernatural Abundance & Open Heavens`,
    `Miraculous Rejuvenation & Divine Health`,
    `Royal Honor & Generational Blessing`
  ];
  const spiritualAtmosphere = atmospheres[hash % atmospheres.length];

  return {
    propheticDeclaration,
    nowWordText,
    actionCommandment,
    propheticDecree,
    dailyActivationGuide,
    spiritualAtmosphere
  };
}

const all1000Rhema: RhemaWordItem[] = [];

// 1-321: Author's 321 Favourite Scriptures
all321Scriptures.forEach((s) => {
  const seasonCat = mapRhemaSeason(s.category, s.theme);
  const title = `The Rhema of ${s.theme} (${s.reference})`;
  const generated = generateRhemaNowWord(s);
  
  all1000Rhema.push({
    id: `rhema-fav-${String(s.num).padStart(3, "0")}`,
    title,
    seasonCategory: seasonCat,
    propheticDeclaration: generated.propheticDeclaration,
    nowWordText: generated.nowWordText,
    scriptureAnchor: {
      reference: s.reference,
      text: s.text
    },
    actionCommandment: generated.actionCommandment,
    propheticDecree: generated.propheticDecree,
    dailyActivationGuide: generated.dailyActivationGuide,
    spiritualAtmosphere: generated.spiritualAtmosphere,
    isAuthorFavourite: true
  });
});

// 322-1000: Biblical Vault
for (let i = 322; i <= 1000; i++) {
  const itemIndex = (i - 322) % EXTRA_SCRIPTURES.length;
  const script = EXTRA_SCRIPTURES[itemIndex];
  const iteration = Math.floor((i - 322) / EXTRA_SCRIPTURES.length) + 1;
  const seasonCat = mapRhemaSeason(script.cat, script.theme);
  const title = `Prophetic Now Word #${i}: ${script.theme} (${script.ref}${iteration > 1 ? ` - Phase ${iteration}` : ""})`;
  const generated = generateRhemaNowWord({
    reference: script.ref,
    text: script.text,
    theme: script.theme
  });

  all1000Rhema.push({
    id: `rhema-catalog-${String(i).padStart(4, "0")}`,
    title,
    seasonCategory: seasonCat,
    propheticDeclaration: generated.propheticDeclaration,
    nowWordText: generated.nowWordText,
    scriptureAnchor: {
      reference: script.ref,
      text: script.text
    },
    actionCommandment: generated.actionCommandment,
    propheticDecree: generated.propheticDecree,
    dailyActivationGuide: generated.dailyActivationGuide,
    spiritualAtmosphere: generated.spiritualAtmosphere,
    isAuthorFavourite: false
  });
}

console.log(`Generated 1,000 Rhema messages. Total: ${all1000Rhema.length}`);

// Split Rhema into 4 parts
fs.writeFileSync(
  path.join(srcDir, "rhemaCatalogPart1.ts"),
  `import { RhemaWordItem } from "../types";\n\nexport const RHEMA_CATALOG_PART1: RhemaWordItem[] = ${JSON.stringify(all1000Rhema.slice(0, 250), null, 2)};\n`
);
fs.writeFileSync(
  path.join(srcDir, "rhemaCatalogPart2.ts"),
  `import { RhemaWordItem } from "../types";\n\nexport const RHEMA_CATALOG_PART2: RhemaWordItem[] = ${JSON.stringify(all1000Rhema.slice(250, 500), null, 2)};\n`
);
fs.writeFileSync(
  path.join(srcDir, "rhemaCatalogPart3.ts"),
  `import { RhemaWordItem } from "../types";\n\nexport const RHEMA_CATALOG_PART3: RhemaWordItem[] = ${JSON.stringify(all1000Rhema.slice(500, 750), null, 2)};\n`
);
fs.writeFileSync(
  path.join(srcDir, "rhemaCatalogPart4.ts"),
  `import { RhemaWordItem } from "../types";\n\nexport const RHEMA_CATALOG_PART4: RhemaWordItem[] = ${JSON.stringify(all1000Rhema.slice(750, 1000), null, 2)};\n`
);

fs.writeFileSync(
  path.join(srcDir, "rhemaCatalog1000.ts"),
  `import { RhemaWordItem } from "../types";
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

export const RHEMA_CATALOG_COUNT = RHEMA_CATALOG_1000.length;
`
);

console.log("All catalogs successfully written!");
