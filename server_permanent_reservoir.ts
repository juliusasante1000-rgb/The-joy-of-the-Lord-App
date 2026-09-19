/**
 * Server-Side Permanent Content Reservoir
 * 
 * Persistent JSON file-backed repository for multi-devotion libraries
 * (Jeremiah 29:11: Devotion A, B, C, D, E; Psalm 23:1: Devotion A, B, C, D, E)
 * Serves canonical and generated devotions even when Gemini API is rate-limited (429) or offline.
 */

import fs from "fs";
import path from "path";
import {
  PRE_SEEDED_PRAYERS,
  PRE_SEEDED_PRAYER_POINTS,
  PRE_SEEDED_EXPOSITIONS,
  PRE_SEEDED_JOY_REVELATIONS,
  PRE_SEEDED_RHEMA,
  PRE_SEEDED_MATHEMASERMONS,
  PRE_SEEDED_HISTORY,
  PRE_SEEDED_DOCTRINES
} from "./src/data/universalReservoirData";

export interface ServerReservoirDevotion {
  id: string;
  reference: string;
  label: string; // "Devotion A", "Devotion B", "Devotion C", etc.
  title: string;
  keyScripture: string;
  passageText: string;
  reflection: string;
  practicalApplication: string;
  guidedPrayer: string;
  actionStep: string;
  apostolicDecree?: string;
  hopeAndEncouragementConclusion?: string;
  theme?: string;
  category?: string;
  source: "canonical_reservoir" | "ai_generated_reservoir";
  savedAt?: string;
}

const RESERVOIR_FILE_PATH = path.join(process.cwd(), "data", "permanent_devotions_reservoir.json");

// Canonical Seed Devotions
const SERVER_PRE_SEEDED: Record<string, ServerReservoirDevotion[]> = {
  "jeremiah 29:11": [
    {
      id: "srv-jer2911-a",
      reference: "Jeremiah 29:11",
      label: "Devotion A",
      title: "The Architect of Shalom: Sovereign Thoughts of Peace",
      keyScripture: "Jeremiah 29:11 (KJV) - 'For I know the thoughts that I think toward you, saith the Lord, thoughts of peace, and not of evil, to give you an expected end.'",
      passageText: "For I know the thoughts that I think toward you, saith the Lord, thoughts of peace, and not of evil, to give you an expected end. Then shall ye call upon me, and ye shall go and pray unto me, and I will hearken unto you.",
      reflection: `In Jeremiah 29, God's people were exiled in Babylon—uprooted from their homes and temple. False prophets urged them to anticipate a hasty escape, but God decreed: settle down, build houses, pray for the peace of Babylon, and prepare for seventy years of refining.

Right in their displacement, the Lord declared: "For I know the thoughts (machashavah - intentional plans, architectural blueprints) that I think toward you." God's plans are not emergency improvisations; they are eternal intentions established before the foundation of the world.

The Hebrew word 'shalom' signifies total wholeness, divine completeness, and covenant reconciliation. Even in exile, God's inner posture toward you is relentless, covenant peace. He is weaving your delays into an eternal coronation of grace.`,
      practicalApplication: "Write down your greatest uncertainty. Beside it, write: 'God's thoughts toward me are shalom, not calamity.' Speak this aloud with conviction.",
      guidedPrayer: "Sovereign Father, I rest my heart in Your eternal counsel. Forgive me for measuring Your love by temporary discomfort. Weave every delay into an expected end of righteousness and joy. In Jesus' mighty Name, Amen.",
      actionStep: "Spend 5 uninterrupted minutes in quiet thanksgiving, surrendering your personal timeline to God.",
      apostolicDecree: "I decree that God's sovereign thoughts of shalom are actively governing my life, family, and future. No earthly Babylon can overturn the expected end that God has ordained for me!",
      hopeAndEncouragementConclusion: "God has never once lost control of your life. The Lord who began a good work in you will bring it to completion in Christ Jesus!",
      theme: "Sovereign Shalom & Divine Purpose",
      category: "Covenant Providence",
      source: "canonical_reservoir"
    },
    {
      id: "srv-jer2911-b",
      reference: "Jeremiah 29:11",
      label: "Devotion B",
      title: "The Unfolding Future: Hope in the Midst of Captivity",
      keyScripture: "Jeremiah 29:11 (KJV) - '...to give you an expected end.'",
      passageText: "For I know the thoughts that I think toward you, saith the Lord, thoughts of peace, and not of evil, to give you an expected end.",
      reflection: `The phrase translated "expected end" in Hebrew is 'acharit ve-tiqvah'—literally, "a future and a hope." God does not promise an effortless journey, but He promises a guaranteed arrival.

The exile was grueling and the waiting tested their patience. Yet God forbade His people from sinking into cynical despair. Biblical hope (tiqvah - cord, attachment, confident expectation) is not wishful thinking; it is the immovable cable binding our heart to the throne of God.

Your present chapter of testing is not the end of your story. It is the corridor through which God is purifying your character to steward the weight of glory He has prepared for you.`,
      practicalApplication: "Identify where cynicism has crept in, and replace each complaint with a direct declaration of God's promised future.",
      guidedPrayer: "Lord God of Covenant Hope, thank You that my story does not terminate in defeat or confusion. You have inscribed a future and an expected end upon my destiny. In Jesus' Name, Amen.",
      actionStep: "Send an encouraging scripture text to someone enduring a heavy season of waiting.",
      apostolicDecree: "I decree that hopelessness is broken off my life. My tomorrow is secured in the hands of the Risen Christ!",
      hopeAndEncouragementConclusion: "The Joy of the Lord is your fortress, and the future God has designed for you is radiant with covenant blessings.",
      theme: "Supernatural Hope & Destiny",
      category: "Faith & Perseverance",
      source: "canonical_reservoir"
    },
    {
      id: "srv-jer2911-c",
      reference: "Jeremiah 29:11",
      label: "Devotion C",
      title: "Beyond the Detour: God's Inevitable Triumph",
      keyScripture: "Jeremiah 29:11 (KJV) - 'Thoughts of peace, and not of evil...'",
      passageText: "For I know the thoughts that I think toward you, saith the Lord, thoughts of peace, and not of evil, to give you an expected end.",
      reflection: `When prayers seem unanswered, the adversary whispers that God has abandoned us. Jeremiah 29:11 stands as God's decisive refutation: "Thoughts of peace, and NOT of evil (ra' - harm, ruin)." God does not author your destruction; He is the author of your redemption.

Even the adversary's traps are seized by God's sovereign wisdom and redirected for kingdom victory (Genesis 50:20). The detour through Babylon burned out Israel's generational idolatry. You will look back on this valley not as the place of defeat, but as the birthplace of an unshakeable faith.`,
      practicalApplication: "Reframe your current battle: ask 'Lord, what eternal fruit of character are You forging in me through this season?'",
      guidedPrayer: "Heavenly Father, I praise You that You never harbor thoughts of malice toward Your children. Silence the enemy's accusations and infuse me with Your peace. In Jesus' Name, Amen.",
      actionStep: "Recall a past trial that God turned into a testimony and thank Him for His faithfulness.",
      apostolicDecree: "I declare that every weapon formed against my soul shall fail. God's thoughts toward me are life, peace, and eternal triumph!",
      hopeAndEncouragementConclusion: "What the enemy designed to swallow you up will become the platform upon which God displays His miraculous power.",
      theme: "Redemptive Overcoming",
      category: "Spiritual Warfare",
      source: "canonical_reservoir"
    },
    {
      id: "srv-jer2911-d",
      reference: "Jeremiah 29:11",
      label: "Devotion D",
      title: "The Covenant Blueprint: Resting in Divine Omniscience",
      keyScripture: "Jeremiah 29:11 (KJV) - 'For I know the thoughts that I think toward you, saith the Lord...'",
      passageText: "For I know the thoughts that I think toward you, saith the Lord, thoughts of peace, and not of evil, to give you an expected end.",
      reflection: `Notice the majesty of the opening declaration: "For I know." We do not know what tomorrow brings, but God's gaze encompasses eternity from the beginning to the end.

While we fret over microscopic obstacles, the Lord sits upon the circle of the earth with absolute sovereign composure. To walk by faith is to entrust our unknown future to the God who knows all things. He does not slumber; He does not overlook your tears. Relax into the loving hands of the One whose knowledge holds the cosmos together.`,
      practicalApplication: "Whenever feeling overwhelmed by tomorrow, whisper: 'The Lord knows, and His knowledge is my peace.'",
      guidedPrayer: "Abba Father, I surrender my attempts to figure out every variable. I place my family, health, and calling into Your capable hands, choosing holy rest over worry. In Jesus' Name, Amen.",
      actionStep: "Write down 3 times when God guided your steps when you could not see the way forward.",
      apostolicDecree: "I decree that divine wisdom orders my steps. I am not governed by fear of the unknown, for my life is hidden with Christ in God!",
      hopeAndEncouragementConclusion: "The One who created the stars has numbered the hairs of your head and ordered every step of your path.",
      theme: "Divine Omniscience & Surrender",
      category: "Rest & Peace",
      source: "canonical_reservoir"
    },
    {
      id: "srv-jer2911-e",
      reference: "Jeremiah 29:11",
      label: "Devotion E",
      title: "Living with Holy Expectation: The Pathway of Prayer",
      keyScripture: "Jeremiah 29:11-12 (KJV) - 'Then shall ye call upon me, and ye shall go and pray unto me, and I will hearken unto you.'",
      passageText: "For I know the thoughts that I think toward you, saith the Lord, thoughts of peace, and not of evil, to give you an expected end. Then shall ye call upon me, and ye shall go and pray unto me, and I will hearken unto you.",
      reflection: `The promise of Jeremiah 29:11 leads directly into prayer in verse 12: "Then shall ye call upon me, and ye shall go and pray unto me, and I will hearken unto you."

When we realize that God's heart toward us is peace, prayer ceases to be a dreary duty or desperate bargaining. It transforms into joyful communion with a Father who is eager to answer. God declares: "I will hearken (shama - actively listen, attend with favor, and answer) unto you." The courtroom of heaven is open to your petitions today through the blood of Jesus.`,
      practicalApplication: "Set aside 10 minutes of bold, expectant prayer, rehearsing God's promises back to Him with heartfelt thanksgiving.",
      guidedPrayer: "Gracious Lord, thank You that my prayers are not lost in the wind. You incline Your ear to hear my cry. Give me faith to pray with boldness and perseverance. In Jesus' Name, Amen.",
      actionStep: "Keep a written record of a specific petition you are bringing before God today.",
      apostolicDecree: "I decree that heaven is open over my life! My prayers are heard in the throne room of grace, and answered prayer shall overflow in my house!",
      hopeAndEncouragementConclusion: "The God who hears prayer has not turned away His ear from your cry. Walk forward with courage and expectant gladness!",
      theme: "Prevailing Prayer & Communion",
      category: "Prayer & Intercession",
      source: "canonical_reservoir"
    }
  ],

  "psalm 23:1": [
    {
      id: "srv-ps231-a",
      reference: "Psalm 23:1",
      label: "Devotion A",
      title: "The All-Sufficient Shepherd: The Abolition of Lack",
      keyScripture: "Psalm 23:1 (KJV) - 'The Lord is my shepherd; I shall not want.'",
      passageText: "The Lord is my shepherd; I shall not want. He maketh me to lie down in green pastures: he leadeth me beside the still waters. He restoreth my soul.",
      reflection: `David spoke with the insight of a seasoned shepherd. Sheep cannot survive without a diligent shepherd to guide, protect, and feed them.

When David proclaims "The Lord is my shepherd; I shall not want," he is making a bold theological declaration: under the covenant care of Jehovah-Raah, lack is abolished. "I shall not want" is a confession of present-tense contentment and spiritual sufficiency. The Shepherd who owns the cattle on a thousand hills is personally responsible for your pasture. Rest in His unshakeable provision today.`,
      practicalApplication: "Renounce all fear of lack and declare aloud: 'The Lord is my Shepherd; I shall not want!'",
      guidedPrayer: "Good Shepherd of my soul, thank You that under Your watchful eye I lack no good thing. Lead me into Your pastures of grace and quiet waters of peace. In Jesus' Name, Amen.",
      actionStep: "Give generously to someone in need today as an act of trust in God's provision.",
      apostolicDecree: "I decree that the spirit of poverty and lack is broken from my life. The Lord is my Shepherd, and His abundant goodness satisfies my soul!",
      hopeAndEncouragementConclusion: "The Shepherd of Israel neither slumbers nor sleeps over your life. You are guarded, guided, and lavishly provided for by the King of Kings.",
      theme: "Covenant Sufficiency & Contentment",
      category: "Provision & Trust",
      source: "canonical_reservoir"
    },
    {
      id: "srv-ps231-b",
      reference: "Psalm 23:1",
      label: "Devotion B",
      title: "Beside Still Waters: Restoring the Exhausted Soul",
      keyScripture: "Psalm 23:1-3 (KJV) - 'He restoreth my soul...'",
      passageText: "The Lord is my shepherd; I shall not want. He maketh me to lie down in green pastures: he leadeth me beside the still waters. He restoreth my soul.",
      reflection: `Sheep will never lie down if plagued by friction or terrified of predators. Only the presence of the shepherd removes their fears.

"He restoreth my soul" (shuv - to revive, return from wandering, breathe new life into). God does not merely patch up our exhaustion; He resurrects our inner man from spiritual fatigue beside quiet waters. Step into the holy quietness of His presence right now.`,
      practicalApplication: "Take 10 minutes of quiet prayer today away from screens and noise, allowing God's peace to restore your inner man.",
      guidedPrayer: "Lord Jesus, Good Shepherd, I pause to drink from Your living waters. Quiet the noise in my thoughts. Restore my exhausted emotions and guide my steps. Amen.",
      actionStep: "Recite Psalm 23 slowly three times during the day.",
      apostolicDecree: "I decree divine restoration over my spirit, soul, and body. Fatigue is replaced by resurrection vitality!",
      hopeAndEncouragementConclusion: "The Lord is restoring your soul right now, and His joy will be your strength for every step ahead.",
      theme: "Soul Restoration & Quietness",
      category: "Rest & Renewal",
      source: "canonical_reservoir"
    },
    {
      id: "srv-ps231-c",
      reference: "Psalm 23:1",
      label: "Devotion C",
      title: "The Valley of Shadows: Courage in the Shepherd's Rod",
      keyScripture: "Psalm 23:4 (KJV) - 'Yea, though I walk through the valley of the shadow of death, I will fear no evil: for thou art with me...'",
      passageText: "Yea, though I walk through the valley of the shadow of death, I will fear no evil: for thou art with me; thy rod and thy staff they comfort me.",
      reflection: `In the valley of the shadow, David's language shifts from talking about God to speaking directly to Him: "for THOU art with me." The valley is not a permanent residence; it is a passage to higher ground.

A shadow cannot harm you; it is merely proof that light is shining from above. The Shepherd's rod defends against predators, and His gentle staff pulls you back from dangerous cliffs. You are not alone in the dark.`,
      practicalApplication: "Declare aloud in any area of fear: 'This valley is not my ending; I am walking through to God's victory!'",
      guidedPrayer: "Mighty Shepherd, thank You that You walk with me through every dark shadow. I cast out all fear, for Your rod defends me and Your staff upholds me. In Jesus' Name, Amen.",
      actionStep: "Reach out to someone walking through illness or grief and comfort them with God's Word.",
      apostolicDecree: "I declare that fear has no dominion over my life! The Valley of Shadows cannot consume me, for the King of Glory walks with me!",
      hopeAndEncouragementConclusion: "No shadow has the power to extinguish the light of Christ within you. Hold the Shepherd's hand and walk in bold confidence!",
      theme: "Courage in Adversity & Divine Protection",
      category: "Spiritual Warfare",
      source: "canonical_reservoir"
    },
    {
      id: "srv-ps231-d",
      reference: "Psalm 23:1",
      label: "Devotion D",
      title: "The Anointed Table: Feasting in the Presence of Foes",
      keyScripture: "Psalm 23:5 (KJV) - 'Thou preparest a table before me in the presence of mine enemies...'",
      passageText: "Thou preparest a table before me in the presence of mine enemies: thou anointest my head with oil; my cup runneth over.",
      reflection: `God does not wait for all your enemies to be eradicated before He blesses you; He prepares a royal banquet right in their full view. In the ancient Near East, anointing a guest's head with oil was a supreme gesture of royal honor.

Enemies are forced to stand as powerless spectators while God lavishly honors His child. "My cup runneth over" speaks of superabundant grace. Sit at the table of worship and let God handle your adversaries.`,
      practicalApplication: "Refuse to engage in retaliatory arguments or bitterness today. Let God prepare your table while you maintain praise.",
      guidedPrayer: "Gracious Father, thank You for anointing my head with the oil of the Holy Spirit. Let my cup overflow with Your goodness. In Jesus' Name, Amen.",
      actionStep: "Bless someone who has spoken unkindly to you, returning good for evil.",
      apostolicDecree: "I decree that God's royal anointing rests upon my mind, home, and calling! My cup overflows with supernatural peace!",
      hopeAndEncouragementConclusion: "You are seated with Christ in heavenly places! Feast at His table of grace today.",
      theme: "Royal Anointing & Overflowing Favor",
      category: "Victory & Favor",
      source: "canonical_reservoir"
    },
    {
      id: "srv-ps231-e",
      reference: "Psalm 23:1",
      label: "Devotion E",
      title: "Goodness and Mercy: The Twin Escorts of Covenant Grace",
      keyScripture: "Psalm 23:6 (KJV) - 'Surely goodness and mercy shall follow me all the days of my life...'",
      passageText: "Surely goodness and mercy shall follow me all the days of my life: and I will dwell in the house of the Lord for ever.",
      reflection: `The Hebrew word for "follow" is 'radaph'—to pursue, chase after, or hunt down. In God's kingdom, the twin escorts of His 'tov' (goodness) and 'chesed' (steadfast covenant mercy) are hunting down the believer every single day.

Every step you take is shadowed not by condemnation or guilt, but by the relentless mercy and goodness of God. And the destination is an eternity dwelling in the presence of the Lord.`,
      practicalApplication: "Trace at least 3 ways God's goodness and mercy pursued you this week even when you were unaware.",
      guidedPrayer: "Faithful God, thank You that Your goodness and mercy pursue me every day of my life. I dedicate my heart to dwelling in Your presence forever. In Jesus' Name, Amen.",
      actionStep: "Share this truth with a family member, reminding them of God's relentless goodness.",
      apostolicDecree: "I decree that the goodness and steadfast love of God are pursuing me today! I shall dwell in His presence forever!",
      hopeAndEncouragementConclusion: "Goodness goes before you, mercy follows behind you, and the Joy of the Lord is your daily fortress!",
      theme: "Relentless Mercy & Eternal Security",
      category: "Grace & Assurance",
      source: "canonical_reservoir"
    }
  ],

  "romans 8:28": [
    {
      id: "srv-rom828-a",
      reference: "Romans 8:28",
      label: "Devotion A",
      title: "The Master Weaver: Redemptive Synchronization",
      keyScripture: "Romans 8:28 (KJV) - 'And we know that all things work together for good to them that love God, to them who are the called according to his purpose.'",
      passageText: "And we know that all things work together for good to them that love God, to them who are the called according to his purpose.",
      reflection: `Paul writes "we know" (oidamen - an absolute covenant certainty). The Greek verb "synergeo" (work together) is the root of 'synergy'. On the underside of a tapestry, threads appear tangled and chaotic, but right-side up, every dark thread was essential for the masterpiece.

God forces even our adversities, griefs, and delays to collaborate for our ultimate sanctification and His eternal glory.`,
      practicalApplication: "Surrender a painful delay into the hands of the Master Weaver, confessing that He is orchestrating it for good.",
      guidedPrayer: "Sovereign Father, Maker of Heaven and Earth, even when I cannot trace Your hand, I trust Your heart. Turn every stumbling block into a stepping stone of glory. In Jesus' Name, Amen.",
      actionStep: "Read Romans 8:28 whenever frustration arises today.",
      apostolicDecree: "I decree that all things are working together for my good in Christ Jesus!",
      hopeAndEncouragementConclusion: "What was meant for evil is being redirected into a glorious testimony of grace.",
      theme: "Sovereign Providence",
      category: "Trust & Sovereignty",
      source: "canonical_reservoir"
    },
    {
      id: "srv-rom828-b",
      reference: "Romans 8:28",
      label: "Devotion B",
      title: "Called According to Purpose: An Unbreakable Covenant",
      keyScripture: "Romans 8:28 (KJV) - '...to them who are the called according to his purpose.'",
      passageText: "And we know that all things work together for good to them that love God, to them who are the called according to his purpose.",
      reflection: `The Greek word for purpose is 'prothesis'—a predetermined royal intention. Your life is not an accident; you were hand-picked by God before the foundation of the world. Because the calling originates in God's eternal heart, no earthly crisis has the jurisdiction to void your destiny.`,
      practicalApplication: "Re-anchor your self-worth today in your divine calling rather than job title or performance.",
      guidedPrayer: "Heavenly Father, I anchor my identity in Your eternal purpose. Strengthen my hands to do Your will with joy. In Jesus' Name, Amen.",
      actionStep: "Dedicate your gifts and work afresh to Christ's kingdom purposes.",
      apostolicDecree: "I decree that I am called according to God's eternal purpose! My identity is sealed in Christ!",
      hopeAndEncouragementConclusion: "You are a royal ambassador of heaven, called and equipped by the Almighty King.",
      theme: "Divine Calling & Identity",
      category: "Purpose & Destiny",
      source: "canonical_reservoir"
    }
  ],

  "nehemiah 8:10": [
    {
      id: "srv-neh810-a",
      reference: "Nehemiah 8:10",
      label: "Devotion A",
      title: "The Holy Fortress: Joy as Supernatural Power",
      keyScripture: "Nehemiah 8:10 (KJV) - 'For the joy of the Lord is your strength.'",
      passageText: "Then he said unto them, Go your way, eat the fat, and drink the sweet, and send portions unto them for whom nothing is prepared: for this day is holy unto our Lord: neither be ye sorry; for the joy of the Lord is your strength.",
      reflection: `Nehemiah proclaimed to a weeping remnant: "Do not weep, for this day is holy unto our Lord; neither be ye sorry; for the JOY OF THE LORD IS YOUR STRENGTH (ma'oz - fortress, stronghold, refuge)."

Biblical joy is not natural buoyancy; it is a supernatural fortress erected by the Holy Spirit. Joy is the believer's active resistance against heaviness. When you operate in God's joy, the enemy cannot wear you down.`,
      practicalApplication: "Whenever heaviness attempts to weigh down your spirit, speak Nehemiah 8:10 aloud three times.",
      guidedPrayer: "Almighty God, I praise You that my spiritual stamina is anchored in Your joy. I clothe myself in Your holy gladness. Let Your joy be my fortress today. Amen.",
      actionStep: "Share a joyful Scripture with someone who looks discouraged.",
      apostolicDecree: "I decree that the Joy of the Lord is my impenetrable fortress! Despair has no legal right to dwell in my atmosphere!",
      hopeAndEncouragementConclusion: "Your sins are forgiven, your redemption is sealed, and the Joy of the Lord is your eternal strength!",
      theme: "Supernatural Joy & Fortification",
      category: "The Joy of the Lord",
      source: "canonical_reservoir"
    },
    {
      id: "srv-neh810-b",
      reference: "Nehemiah 8:10",
      label: "Devotion B",
      title: "Sacred Celebration: Eating the Fat and Drinking the Sweet",
      keyScripture: "Nehemiah 8:10 (KJV) - 'Go your way, eat the fat, and drink the sweet...'",
      passageText: "Then he said unto them, Go your way, eat the fat, and drink the sweet, and send portions unto them for whom nothing is prepared: for this day is holy unto our Lord.",
      reflection: `Celebration is not an unspiritual distraction from holiness; it is the very expression of it! God delights in the joy of His children. When you celebrate the goodness of God over a meal with your family, you testify to a watching world that God is a good Father whose covenant brings abundant life.`,
      practicalApplication: "Celebrate today by enjoying a special treat with family, thanking God intentionally for His bountiful provision.",
      guidedPrayer: "Heavenly Father, deliver me from legalistic gloom. Let my home be filled with holy celebration and songs of deliverance. In Jesus' Name, Amen.",
      actionStep: "Play uplifting praise music and sing along with wholehearted joy.",
      apostolicDecree: "I declare that my household is an altar of holy celebration! The joy of salvation overflows!",
      hopeAndEncouragementConclusion: "Feast on the goodness of the Lord! His mercy endures forever.",
      theme: "Holy Celebration & Gladness",
      category: "Celebration & Joy",
      source: "canonical_reservoir"
    }
  ]
};

/**
 * Normalizes scripture references into canonical keys
 */
export function normalizeServerScriptureRef(rawRef: string): string {
  if (!rawRef || typeof rawRef !== "string") return "";
  let clean = rawRef.trim().toLowerCase();
  clean = clean.replace(/^[(\["']+|[)\]"']+$/g, "").trim();

  clean = clean
    .replace(/^jer\b/i, "jeremiah")
    .replace(/^ps\b|^psa\b|^psalms\b/i, "psalm")
    .replace(/^rom\b/i, "romans")
    .replace(/^isa\b/i, "isaiah")
    .replace(/^phil\b|^php\b/i, "philippians")
    .replace(/^neh\b/i, "nehemiah")
    .replace(/^jn\b|^jhn\b/i, "john")
    .replace(/^prov\b|^prv\b/i, "proverbs")
    .replace(/^matt\b|^mt\b/i, "matthew")
    .replace(/^josh\b/i, "joshua")
    .replace(/^2\s*tim\b|^ii\s*tim\b/i, "2 timothy");

  clean = clean.replace(/\s*:\s*/g, ":");
  return clean;
}

// In-memory cache synced with disk
let SERVER_RESERVOIR_CACHE: Record<string, ServerReservoirDevotion[]> | null = null;

function loadServerReservoir(): Record<string, ServerReservoirDevotion[]> {
  if (SERVER_RESERVOIR_CACHE) return SERVER_RESERVOIR_CACHE;

  const result: Record<string, ServerReservoirDevotion[]> = {};

  // 1. Pre-seed canonical devotions
  for (const [key, list] of Object.entries(SERVER_PRE_SEEDED)) {
    result[key] = [...list];
  }

  // 2. Load disk file if present
  try {
    if (fs.existsSync(RESERVOIR_FILE_PATH)) {
      const raw = fs.readFileSync(RESERVOIR_FILE_PATH, "utf-8");
      const diskData: Record<string, ServerReservoirDevotion[]> = JSON.parse(raw);
      for (const [key, list] of Object.entries(diskData)) {
        if (!result[key]) {
          result[key] = [];
        }
        const existingIds = new Set(result[key].map((d) => d.id));
        for (const item of list) {
          if (!existingIds.has(item.id)) {
            result[key].push(item);
          }
        }
      }
    }
  } catch (e) {
    console.warn("[SERVER RESERVOIR] Notice: Could not read disk reservoir file:", e);
  }

  SERVER_RESERVOIR_CACHE = result;
  return result;
}

function persistServerReservoir(): void {
  if (!SERVER_RESERVOIR_CACHE) return;
  try {
    const dir = path.dirname(RESERVOIR_FILE_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(RESERVOIR_FILE_PATH, JSON.stringify(SERVER_RESERVOIR_CACHE, null, 2), "utf-8");
  } catch (err) {
    console.warn("[SERVER RESERVOIR] Could not persist to disk:", err);
  }
}

/**
 * Get all stored devotions for a verse on the server
 */
export function getServerReservoirDevotions(reference: string): ServerReservoirDevotion[] {
  const norm = normalizeServerScriptureRef(reference);
  if (!norm) return [];

  const reservoir = loadServerReservoir();
  for (const [key, list] of Object.entries(reservoir)) {
    const normKey = normalizeServerScriptureRef(key);
    if (norm === normKey || norm.startsWith(normKey) || normKey.startsWith(norm)) {
      return list;
    }
  }

  return [];
}

/**
 * Select an appropriate stored devotion from the server reservoir (Devotion A, B, C, etc.)
 */
export function selectServerReservoirDevotion(
  reference: string
): { devotion: ServerReservoirDevotion; totalStored: number; index: number; label: string } | null {
  const devotions = getServerReservoirDevotions(reference);
  if (!devotions || devotions.length === 0) return null;

  // Use current time/rotation to select devotion
  const now = new Date();
  const selectedIndex = (now.getMinutes() + now.getSeconds()) % devotions.length;
  const devotion = devotions[selectedIndex];

  return {
    devotion,
    totalStored: devotions.length,
    index: selectedIndex,
    label: devotion.label || `Devotion ${String.fromCharCode(65 + selectedIndex)}`
  };
}

/**
 * Saves a newly generated devotion to the server reservoir
 */
export function saveDevotionToServerReservoir(
  reference: string,
  devotionData: any
): ServerReservoirDevotion {
  const norm = normalizeServerScriptureRef(reference) || "scripture";
  const reservoir = loadServerReservoir();
  const existing = getServerReservoirDevotions(norm);
  const nextLetter = String.fromCharCode(65 + Math.min(25, existing.length));

  const dev = devotionData?.devotion || devotionData || {};
  const newDev: ServerReservoirDevotion = {
    id: `srv-gen-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    reference,
    label: `Devotion ${nextLetter}`,
    title: dev.title || `Devotion on ${reference}`,
    keyScripture: dev.keyScripture || reference,
    passageText: dev.passageText || "",
    reflection: dev.reflection || dev.theologicalExposition || dev.content || "",
    practicalApplication: dev.practicalApplication || dev.application || "",
    guidedPrayer: dev.guidedPrayer || dev.prayer || "",
    actionStep: dev.actionStep || `Meditate on ${reference} today.`,
    apostolicDecree: dev.apostolicDecree || "",
    hopeAndEncouragementConclusion: dev.hopeAndEncouragementConclusion || dev.hopeEncouragementConclusion || "",
    theme: dev.theme || "Covenant Faith",
    category: dev.category || "The Joy of the Lord",
    source: "ai_generated_reservoir",
    savedAt: new Date().toISOString()
  };

  if (!reservoir[norm]) {
    reservoir[norm] = [];
  }
  reservoir[norm] = [newDev, ...reservoir[norm].slice(0, 19)];
  SERVER_RESERVOIR_CACHE = reservoir;
  persistServerReservoir();

  console.log(`[SERVER RESERVOIR] 🏛️ Stored ${newDev.label} for ${reference}`);
  return newDev;
}

/**
 * Returns all scriptures in the server reservoir
 */
export function getAllServerReservoirScriptures(): Array<{
  reference: string;
  count: number;
  sampleTitle: string;
}> {
  const reservoir = loadServerReservoir();
  return Object.entries(reservoir).map(([key, list]) => ({
    reference: list[0]?.reference || key,
    count: list.length,
    sampleTitle: list[0]?.title || `Devotion on ${key}`
  }));
}

/**
 * Formats a server reservoir devotion for display
 */
export function formatServerReservoirDevotion(devotion: ServerReservoirDevotion): string {
  const lines: string[] = [
    `✨ ${devotion.title}`,
    `*(Permanent Covenant Reservoir • ${devotion.label})*\n`,
    `SCRIPTURE ANCHOR:\n${devotion.keyScripture || devotion.reference}\n`,
    `THEOLOGICAL REFLECTION:\n${devotion.reflection}\n`,
    `PRACTICAL APPLICATION:\n${devotion.practicalApplication}\n`,
    `ACTION STEP FOR TODAY:\n${devotion.actionStep}\n`,
    `GUIDED PRAYER:\n${devotion.guidedPrayer}`
  ];

  if (devotion.apostolicDecree) {
    lines.push(`\nAPOSTOLIC DECREE:\n${devotion.apostolicDecree}`);
  }
  if (devotion.hopeAndEncouragementConclusion) {
    lines.push(`\n🌟 CONCLUSION — UNSHAKEABLE HOPE & ENCOURAGEMENT:\n${devotion.hopeAndEncouragementConclusion}`);
  }

  return lines.join("\n\n");
}

// =========================================================================
// UNIVERSAL MULTI-OUTLET SERVER RESERVOIR
// Covers Prayers, Expositions, 5 Prayer Points, Joy of the Lord,
// Prophetic Rhema, MathemaSermons, Historical Context, Doctrines.
// =========================================================================

export type ServerReservoirOutlet =
  | "devotion"
  | "prayer"
  | "prayer_points"
  | "explain_verse"
  | "joy_of_the_lord"
  | "rhema"
  | "mathemasermon"
  | "apostlemath"
  | "historical_context"
  | "doctrine"
  | "chapter_summary";

export interface ServerUniversalItem {
  id: string;
  outlet: ServerReservoirOutlet;
  reference: string;
  label: string;
  title: string;
  subtitle?: string;
  keyScripture?: string;
  passageText?: string;
  data: any;
  formattedText: string;
  source: "canonical_reservoir" | "ai_generated_reservoir";
  savedAt: string;
  theme?: string;
  category?: string;
}

const UNIVERSAL_RESERVOIR_FILE_PATH = path.join(process.cwd(), "data", "permanent_universal_reservoir.json");
let SERVER_UNIVERSAL_CACHE: Record<string, ServerUniversalItem[]> | null = null;

export function normalizeServerOutlet(
  actionType?: string,
  endpoint?: string,
  category?: string
): ServerReservoirOutlet {
  const act = (actionType || "").toLowerCase().trim();
  const ep = (endpoint || "").toLowerCase().trim();
  const cat = (category || "").toLowerCase().trim();

  if (act.includes("point") || act === "5 high-impact prayer points" || act === "prayer_points") {
    return "prayer_points";
  }
  if (act.includes("prayer") || ep.includes("prayer") || cat.includes("prayer")) {
    return "prayer";
  }
  if (act.includes("mathemasermon") || ep.includes("mathemasermon")) {
    return "mathemasermon";
  }
  if (act.includes("apostlemath") || ep.includes("apostlemath") || (act.includes("math") && !act.includes("sermon"))) {
    return "apostlemath";
  }
  if (act.includes("joy") || ep.includes("joy") || cat.includes("joy")) {
    return "joy_of_the_lord";
  }
  if (act.includes("rhema") || ep.includes("rhema") || cat.includes("rhema")) {
    return "rhema";
  }
  if (act.includes("history") || act.includes("historical") || ep.includes("history") || act.includes("archaeology")) {
    return "historical_context";
  }
  if (act.includes("chapter") || ep.includes("chapter")) {
    return "chapter_summary";
  }
  if (act.includes("doctrine") || ep.includes("doctrine") || cat.includes("doctrine") || act.includes("theology")) {
    return "doctrine";
  }
  if (act.includes("explain") || act.includes("exposition") || act.includes("commentary") || ep.includes("verse-action")) {
    return "explain_verse";
  }
  return "devotion";
}

function loadServerUniversalReservoir(): Record<string, ServerUniversalItem[]> {
  if (SERVER_UNIVERSAL_CACHE) return SERVER_UNIVERSAL_CACHE;

  const result: Record<string, ServerUniversalItem[]> = {};

  // Seed devotions from devotions reservoir
  const devReservoir = loadServerReservoir();
  for (const [key, list] of Object.entries(devReservoir)) {
    const outletKey = `devotion::${key}`;
    result[outletKey] = list.map((d) => ({
      id: d.id,
      outlet: "devotion",
      reference: d.reference,
      label: d.label,
      title: d.title,
      keyScripture: d.keyScripture,
      passageText: d.passageText,
      theme: d.theme,
      category: d.category,
      source: d.source,
      savedAt: d.savedAt || "2026-01-01T00:00:00.000Z",
      data: {
        devotion: {
          title: d.title,
          keyScripture: d.keyScripture,
          passageText: d.passageText,
          reflection: d.reflection,
          practicalApplication: d.practicalApplication,
          guidedPrayer: d.guidedPrayer,
          actionStep: d.actionStep,
          apostolicDecree: d.apostolicDecree,
          hopeAndEncouragementConclusion: d.hopeAndEncouragementConclusion,
          theme: d.theme,
          category: d.category
        }
      },
      formattedText: formatServerReservoirDevotion(d)
    }));
  }

  // Pre-seed universal items across all outlets (prayers, prayer points, expositions, joy revelations, rhema, mathemasermons, history, doctrines)
  const preSeededCollections: Record<string, any>[] = [
    PRE_SEEDED_PRAYERS,
    PRE_SEEDED_PRAYER_POINTS,
    PRE_SEEDED_EXPOSITIONS,
    PRE_SEEDED_JOY_REVELATIONS,
    PRE_SEEDED_RHEMA,
    PRE_SEEDED_MATHEMASERMONS,
    PRE_SEEDED_HISTORY,
    PRE_SEEDED_DOCTRINES
  ];

  for (const collection of preSeededCollections) {
    for (const [refKey, list] of Object.entries(collection)) {
      for (const item of (list as any[])) {
        const normK = normalizeServerScriptureRef(refKey) || refKey.trim().toLowerCase();
        const outletKey = `${item.outlet}::${normK}`;
        if (!result[outletKey]) {
          result[outletKey] = [];
        }
        if (!result[outletKey].some((x) => x.id === item.id)) {
          result[outletKey].push(item);
        }
      }
    }
  }

  // Load from disk if file exists
  try {
    if (fs.existsSync(UNIVERSAL_RESERVOIR_FILE_PATH)) {
      const raw = fs.readFileSync(UNIVERSAL_RESERVOIR_FILE_PATH, "utf-8");
      const diskData: Record<string, ServerUniversalItem[]> = JSON.parse(raw);
      for (const [key, list] of Object.entries(diskData)) {
        if (!result[key]) {
          result[key] = [];
        }
        const existingIds = new Set(result[key].map((x) => x.id));
        for (const item of list) {
          if (!existingIds.has(item.id)) {
            result[key].push(item);
          }
        }
      }
    }
  } catch (err) {
    console.warn("[SERVER UNIVERSAL RESERVOIR] Notice: Could not read disk file:", err);
  }

  SERVER_UNIVERSAL_CACHE = result;
  return result;
}

function persistServerUniversalReservoir(): void {
  if (!SERVER_UNIVERSAL_CACHE) return;
  try {
    const dir = path.dirname(UNIVERSAL_RESERVOIR_FILE_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(UNIVERSAL_RESERVOIR_FILE_PATH, JSON.stringify(SERVER_UNIVERSAL_CACHE, null, 2), "utf-8");
  } catch (err) {
    console.warn("[SERVER UNIVERSAL RESERVOIR] Error persisting to disk:", err);
  }
}

/**
 * Get all stored items for a specific outlet and reference on the server
 */
export function getServerUniversalReservoirItems(
  outlet: ServerReservoirOutlet,
  reference: string
): ServerUniversalItem[] {
  const normRef = normalizeServerScriptureRef(reference) || reference.trim().toLowerCase();
  if (!normRef) return [];

  const catalog = loadServerUniversalReservoir();
  const searchPrefix = `${outlet}::`;

  for (const [fullKey, list] of Object.entries(catalog)) {
    if (fullKey.startsWith(searchPrefix)) {
      const refPart = fullKey.substring(searchPrefix.length);
      const normPart = normalizeServerScriptureRef(refPart) || refPart.toLowerCase();
      if (normRef === normPart || normRef.startsWith(normPart) || normPart.startsWith(normRef)) {
        return list;
      }
    }
  }

  return [];
}

/**
 * Select a stored item from the server universal reservoir
 */
export function selectServerUniversalReservoirItem(
  outlet: ServerReservoirOutlet,
  reference: string
): { item: ServerUniversalItem; totalStored: number; index: number; label: string } | null {
  const items = getServerUniversalReservoirItems(outlet, reference);
  if (!items || items.length === 0) return null;

  const now = new Date();
  const selectedIndex = (now.getMinutes() + now.getSeconds()) % items.length;
  const item = items[selectedIndex];

  return {
    item,
    totalStored: items.length,
    index: selectedIndex,
    label: item.label || `Edition ${String.fromCharCode(65 + selectedIndex)}`
  };
}

/**
 * Save newly generated content to the server universal reservoir
 */
export function saveContentToServerUniversalReservoir(
  outlet: ServerReservoirOutlet,
  reference: string,
  data: any,
  rawText?: string
): ServerUniversalItem {
  const normRef = normalizeServerScriptureRef(reference) || reference.trim().toLowerCase() || "item";
  const catalog = loadServerUniversalReservoir();
  const existing = getServerUniversalReservoirItems(outlet, normRef);
  const nextLetter = String.fromCharCode(65 + Math.min(25, existing.length));

  const outletPrefix =
    outlet === "prayer"
      ? "Prayer"
      : outlet === "prayer_points"
      ? "Prayer Points"
      : outlet === "explain_verse"
      ? "Exposition"
      : outlet === "joy_of_the_lord"
      ? "Joy Revelation"
      : outlet === "rhema"
      ? "Rhema Word"
      : outlet === "mathemasermon"
      ? "MathemaSermon"
      : outlet === "historical_context"
      ? "Historical Record"
      : outlet === "doctrine"
      ? "Doctrine Exposition"
      : "Devotion";

  const resolvedTitle =
    data?.title ||
    data?.devotion?.title ||
    data?.prayerTitle ||
    `${outletPrefix} on ${reference}`;

  const newItem: ServerUniversalItem = {
    id: `srv-uni-${outlet.substring(0, 3)}-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    outlet,
    reference,
    label: `${outletPrefix} ${nextLetter}`,
    title: resolvedTitle,
    subtitle: data?.subtitle,
    keyScripture: data?.scriptureAnchor || data?.keyScripture || reference,
    passageText: data?.passageText || "",
    data,
    formattedText: rawText || "",
    source: "ai_generated_reservoir",
    savedAt: new Date().toISOString(),
    theme: data?.theme || data?.category || "Covenant Word",
    category: data?.category || outlet
  };

  const catalogKey = `${outlet}::${normRef}`;
  if (!catalog[catalogKey]) {
    catalog[catalogKey] = [];
  }
  catalog[catalogKey] = [newItem, ...catalog[catalogKey].slice(0, 19)];
  SERVER_UNIVERSAL_CACHE = catalog;
  persistServerUniversalReservoir();

  console.log(`[SERVER UNIVERSAL RESERVOIR] 🏛️ Archived ${newItem.label} for "${reference}" in outlet "${outlet}"`);
  return newItem;
}

export function getGracefulServerUniversalMessage(
  outlet: ServerReservoirOutlet,
  reference: string
): string {
  return (
    `A stored edition is not yet archived in the Covenant Reservoir for "${reference}" in outlet "${outlet}".\n\n` +
    `Our live AI generation is currently resting due to Google AI capacity limits. ` +
    `Once the daily quota refreshes, fresh generations will automatically resume and enrich your reservoir.\n\n` +
    `In the meantime, you can explore our pre-archived libraries for key Scriptures including ` +
    `Jeremiah 29:11, Psalm 23:1, Romans 8:28, Isaiah 40:31, Philippians 4:6-7, and Nehemiah 8:10.`
  );
}


export function getGracefulServerReservoirMessage(reference: string): string {
  return (
    `A stored devotion is not yet archived in the Covenant Reservoir for "${reference}".\n\n` +
    `Our live AI generation is currently resting due to Google AI capacity limits. ` +
    `Once the daily quota refreshes, fresh generations will resume and enrich your reservoir.\n\n` +
    `In the meantime, you can explore our rich library of stored devotions for key scriptures such as ` +
    `Jeremiah 29:11 (Devotions A–E), Psalm 23:1 (Devotions A–E), Romans 8:28 (Devotions A–D), ` +
    `Isaiah 40:31 (Devotions A–D), Philippians 4:6-7 (Devotions A–D), and Nehemiah 8:10 (Devotions A–D).`
  );
}

export function getAllServerUniversalReservoirCatalog(): {
  outlet: ServerReservoirOutlet;
  reference: string;
  count: number;
  sampleTitle: string;
  labels: string[];
}[] {
  const catalog = loadServerUniversalReservoir();
  const entries: {
    outlet: ServerReservoirOutlet;
    reference: string;
    count: number;
    sampleTitle: string;
    labels: string[];
  }[] = [];

  for (const [key, list] of Object.entries(catalog)) {
    const parts = key.split("::");
    const outlet = (parts[0] || "devotion") as ServerReservoirOutlet;
    const reference = parts[1] || "";
    if (list && list.length > 0) {
      entries.push({
        outlet,
        reference: list[0]?.reference || reference,
        count: list.length,
        sampleTitle: list[0]?.title || reference,
        labels: list.map((x) => x.label)
      });
    }
  }

  return entries;
}

