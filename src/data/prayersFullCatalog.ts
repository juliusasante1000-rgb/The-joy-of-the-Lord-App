import { StructuredPrayer } from "../types";

const PRAYER_THEMES = [
  { cat: "Spiritual Warfare", theme: "Breaking Strongholds & Demonic Chains", title: "Covenant Warfare for Total Deliverance", sub: "Pulling down high things and executing judgment against demonic oppression.", refs: ["2 Corinthians 10:4-5", "Ephesians 6:12", "Isaiah 54:17"] },
  { cat: "Healing & Wholeness", theme: "Supernatural Healing & Bodily Restoration", title: "The Great Physician's Healing Decree", sub: "Releasing virtue for cellular healing, renewal of vitality, and total sound health.", refs: ["1 Peter 2:24", "Isaiah 53:5", "Psalm 103:2-3"] },
  { cat: "Financial & Kingdom Prosperity", theme: "Supernatural Debt Cancellation & Kingdom Wealth", title: "Open Heavens for Financial Breakthrough", sub: "Breaking the curse of lack and unlocking divine wisdom for kingdom stewardship.", refs: ["Deuteronomy 28:12", "Philippians 4:19", "2 Corinthians 9:8"] },
  { cat: "Family & Children", theme: "Generational Blessings & Household Salvation", title: "Covenant Wall of Fire over the Family", sub: "Anointing children, blessing marriages, and securing generational destiny.", refs: ["Joshua 24:15", "Acts 16:31", "Psalm 127:3-5"] },
  { cat: "Divine Direction & Guidance", theme: "Discerning God's Perfect Will & Open Paths", title: "Illumination of Paths and Clear Prophetic Light", sub: "Silencing confusion and hearing the clear voice of the Holy Shepherd.", refs: ["Psalm 119:105", "Proverbs 3:5-6", "Isaiah 30:21"] },
  { cat: "Holy Spirit & Power", theme: "Fresh Anointing & Celestial Fire", title: "Upper Room Infilling and Spiritual Power", sub: "Tarrying for fresh oil, spiritual gifts, and bold prophetic witness.", refs: ["Acts 1:8", "Acts 2:1-4", "Luke 24:49"] },
  { cat: "Emotional Peace & Joy", theme: "Overcoming Anxiety, Grief, and Heaviness", title: "Exchange of Ashes for the Garment of Praise", sub: "Dispelling depressive clouds and putting on the joy that is our strength.", refs: ["Isaiah 61:3", "Philippians 4:6-7", "Nehemiah 8:10"] },
  { cat: "National & Global Revival", theme: "Awakening in Nations and Righteous Government", title: "Intercession for Nations and Kingdom Harvest", sub: "Praying for kings, leaders, and the unreached global harvest fields.", refs: ["1 Timothy 2:1-2", "2 Chronicles 7:14", "Psalm 2:8"] },
  { cat: "Consecration & Purity", theme: "Holy Living & Radical Surrender to Christ", title: "Altar Fire of Holiness and Clean Hands", sub: "Purging the vessel to be meet for the Master's use in this end-time hour.", refs: ["Romans 12:1-2", "2 Timothy 2:21", "Psalm 24:3-4"] },
  { cat: "Favor & Destiny Acceleration", theme: "Royal Favor Before Kings and Open Doors", title: "The Joseph Anointing for Strategic Elevation", sub: "Walking into divine opportunities and possessing gates of influence.", refs: ["Psalm 5:12", "Genesis 39:2-4", "Esther 2:17"] },
  { cat: "Midnight Watch", theme: "Midnight Deliverance & Breaking Prison Gates", title: "Paul and Silas Midnight Breakthrough Intercession", sub: "Shaking foundations, loosening stocks, and entering glorious liberty at midnight.", refs: ["Acts 16:25-26", "Psalm 119:62", "Job 34:20"] },
  { cat: "Wisdom & Academic Excellence", theme: "Solomonic Insight and Scholarly Discernment", title: "Ten Times Better Wisdom & Divine Understanding", sub: "Unlocking intellectual clarity, revelation in sciences, and pedagogical mastery.", refs: ["Daniel 1:17-20", "James 1:5", "Proverbs 2:6-7"] },
  { cat: "Marriage & Covenant Harmony", theme: "Cord of Three Strands & Marital Joy", title: "Healing and Fortifying the Marriage Covenant", sub: "Restoring tender affection, Christlike communication, and peace in the home.", refs: ["Ecclesiastes 4:12", "Ephesians 5:25-33", "Colossians 3:18-19"] },
  { cat: "Marketplace & Business Impact", theme: "Kingdom Commerce and Righteous Influence", title: "Blessing the Work of Hands in the Marketplace", sub: "Innovating with divine integrity, creating jobs, and honoring God in trade.", refs: ["Deuteronomy 8:18", "Proverbs 16:3", "Psalm 90:17"] },
  { cat: "Protection & Angelic Defense", theme: "Secret Place of the Most High & Shield of Truth", title: "Psalm 91 Inviolable Canopy of Divine Protection", sub: "No pestilence or terror near thy dwelling; command over holy angelic guards.", refs: ["Psalm 91:1-16", "Psalm 34:7", "Hebrews 1:14"] }
];

export function generateAll400StructuredPrayers(basePrayers: StructuredPrayer[]): StructuredPrayer[] {
  const catalog: StructuredPrayer[] = [...basePrayers];
  const currentCount = catalog.length;
  const targetCount = 1000;

  for (let i = currentCount + 1; i <= targetCount; i++) {
    const p = PRAYER_THEMES[(i - 1) % PRAYER_THEMES.length];
    const cycle = Math.floor((i - 1) / PRAYER_THEMES.length) + 1;

    catalog.push({
      id: `prayer-${i.toString().padStart(3, "0")}-${p.cat.toLowerCase().replace(/[^a-z0-9]/g, "-")}`,
      category: p.cat,
      theme: `${p.theme} (Dimension ${cycle})`,
      title: `Prayer ${i}: ${p.title}`,
      subtitle: p.sub,
      suggestedScriptures: p.refs,
      sections: {
        adoration: `O Sovereign Lord God of Abraham, Isaac, and Jacob! You are El-Shaddai, the All-Sufficient One. Heaven is Your throne and earth is Your footstool. You reign with absolute majesty and unsearchable power forever and ever.`,
        confessionAndSurrender: `Father, I come to Your throne of grace. I lay aside every weight, every secret anxiety, and all self-reliance. Wash me thoroughly in the precious blood of the Lamb, and renew a right and steadfast spirit within me.`,
        thanksgiving: `I praise You, Lord, for the completed victory at the Cross of Calvary! Thank You that every promise in Jesus Christ is Yes and Amen. Thank You that You always lead us in triumph in Christ Jesus.`,
        scripturePromise: `${p.refs[0]} - Anchored in this living word, I stand upon the rock of Your covenant promises which can never fail.`,
        petition: `I present my petition before Your throne: Let Your divine ${p.cat.toLowerCase()} manifest in full power in my life today. Break every barrier, establish Your peace, and order my steps in Your righteousness.`,
        spiritualWarfare: `In the mighty and matchless Name of Jesus Christ, I bind every demonic spirit of delay, affliction, distraction, and fear. I take the Shield of Faith and quench every fiery dart of the enemy. The blood of Jesus speaks better things for me!`,
        declarationInJesusName: `I decree and declare that I am more than a conqueror through Christ who loves me! The Joy of the Lord is my permanent fortress and unshakeable strength. In Jesus' mighty Name, Amen!`
      }
    });
  }

  return catalog;
}

// Backward compatibility exports
export const generateAll500StructuredPrayers = generateAll400StructuredPrayers;
export const generateAll200StructuredPrayers = generateAll400StructuredPrayers;
export const generateAll100StructuredPrayers = generateAll400StructuredPrayers;
