import { ShemotGeulahName, Devotion } from "../types";

export interface RedemptiveNameFullProfile {
  name: ShemotGeulahName;
  hebrewRoot: string;
  rootMeaning: string;
  transliterationGuide: string;
  theologicalExposition: string;
  covenantEra: string;
  historicalContext: string;
  keyBiblicalFigures: string[];
  practicalApplication: string;
  propheticDeclaration: string;
  scriptureVault: Array<{
    reference: string;
    text: string;
    theme: string;
    reflection: string;
  }>;
  apostolicPrayer: {
    adoration: string;
    confessionAndSurrender: string;
    thanksgiving: string;
    petition: string;
    warfareDeclaration: string;
    propheticSeal: string;
  };
  syntheticDevotion: Devotion;
}

/**
 * Generates a deeply varied, publication-grade theological exposition and sanctuary profile
 * for any of the 500 Redemptive Names (Shemot Geulah).
 */
export function getRedemptiveNameFullProfile(item: ShemotGeulahName): RedemptiveNameFullProfile {
  const id = item.id;
  const name = item.name;
  const hebrew = item.hebrew;
  const translit = item.transliteration;
  const meaning = item.meaning;
  const ref = item.scriptureReference;
  const cat = item.category || "Redemptive Identity";

  // Deterministic variety seeds based on ID and category
  const eraOptions = [
    "Patriarchal Genesis Covenant & The Abrahamic Promise",
    "Mosaic Tabernacle Era & The Wilderness Sanctification",
    "Davidic Kingdom Era & Zion Throne Worship",
    "Major Prophetic Restoration & Isaiah's New Covenant Vision",
    "Messianic New Covenant Era & Christ's Finished Work on Golgotha",
    "Post-Exilic Temple Reconstruction under Zerubbabel & Ezra",
    "Apostolic Pentecostal Outpouring & The Epistles of Grace"
  ];
  const covenantEra = eraOptions[(id * 7 + cat.length) % eraOptions.length];

  const figuresPool = [
    ["Abraham", "Sarah", "Melchizedek"],
    ["Moses", "Aaron", "Joshua"],
    ["King David", "Asaph", "Nathan the Prophet"],
    ["Isaiah", "Hezekiah", "Jeremiah"],
    ["The Apostle Paul", "Peter", "John the Beloved"],
    ["Ruth", "Boaz", "Hannah"],
    ["Esther", "Mordecai", "Nehemiah"]
  ];
  const keyBiblicalFigures = figuresPool[(id * 3) % figuresPool.length];

  // Tailored, varied multi-paragraph theological exposition
  let expositionPara1 = "";
  let expositionPara2 = "";
  let expositionPara3 = "";

  if (cat.includes("New Identity") || cat.includes("Royal Garment") || cat.includes("Royal Calling")) {
    expositionPara1 = `In the Hebrew biblical tradition, names are not superficial designations; they are prophetic decrees of spiritual essence, ontology, and divine ordination. To receive the Redemptive Name '${name}' (${hebrew}, ${translit})—signifying "${meaning}"—is to step out of the fallen, earthly coordinates of natural lineage and into the celestial registry of the Kingdom of God. According to ${ref}, God strips away the rags of human striving and clothes the believer in the immaculate garments of divine righteousness and priesthood.`;
    expositionPara2 = `The root etymology anchors our identity directly to Christ Jesus, the eternal High Priest and King of Glory. Where natural circumstances and past spiritual condemnation pronounced weakness or defeat, this redemptive name releases the fragrance of royal favor. In ${covenantEra}, God established that those who bear His covenant seals cannot be disenfranchised by demonic accusations or temporal setbacks. Your calling is consecrated, set apart, and guarded by the sovereign seal of the Holy Spirit.`;
    expositionPara3 = `As you walk through your daily responsibilities, let '${name}' govern your mindset and spiritual posture. You are not begging for acceptance; you are operating from the fullness of Christ's finished triumph. Speak with the dignity of a royal ambassador, govern your thoughts with holy discernment, and release the atmosphere of heaven wherever you step today.`;
  } else if (cat.includes("Breakthrough") || cat.includes("Strength") || cat.includes("Restoration")) {
    expositionPara1 = `The revelation of '${name}' (${hebrew})—meaning "${meaning}"—reveals the militant, covenantal faithfulness of God on behalf of His saints. As proclaimed in ${ref}, this name represents the divine hammer that shatters spiritual stagnation, generational delay, and demonic resistance. In the original language, the vocalization '${translit}' invokes the unstoppable momentum of Yahweh Tzebaoth (the Lord of Hosts), who dispatches angelic assistance to clear every path for His elect.`;
    expositionPara2 = `Theological reflection upon this altar reminds us that true spiritual resilience does not stem from human resolve or natural grit. It is birthed from the 'Chedvah' (supernatural joy) and 'Ma'oz' (impregnable fortress) of the Almighty. When God introduces you into the realm of '${name}', He is signaling that the era of sorrow and weariness has come to its divine conclusion. Every valley of weeping is being transformed into a well of living waters, and the ruins of yesterday are being reframed into a monument of His resurrection glory.`;
    expositionPara3 = `Take your stand upon the living promise of ${ref}. When confronting obstacles, financial challenges, or relational conflicts today, declare that '${name}' is your covenant covering. Refuse to negotiate with intimidation; the same God who conquered the grave is fighting for you, guaranteeing that your outcome is total breakthrough and eternal victory.`;
  } else if (cat.includes("Beloved") || cat.includes("Grace") || cat.includes("Peace") || cat.includes("Joy")) {
    expositionPara1 = `To be designated as '${name}' (${hebrew})—meaning "${meaning}"—is to be welcomed into the innermost sanctuary of divine affection and intimacy. Grounded in the eternal truth of ${ref}, this redemptive title strips away all legalistic performance and religious anxiety. The Hebrew vocabulary of '${translit}' pulsates with 'Hesed'—the relentless, unfailing, covenant-keeping love of the Father that pursues the soul across every wilderness season.`;
    expositionPara2 = `At the Cross of Calvary, Jesus Christ absorbed every ounce of rejection, shame, and estrangement so that we might forever abide in the warmth of this holy designation. Through the indwelling Holy Spirit, you are sealed as the treasured possession of God. This is not a fragile emotion; it is an immovable anchor for the soul that outlasts economic upheavals, health challenges, and shifting cultural tides. Peace that surpasses all human comprehension is your birthright in Christ.`;
    expositionPara3 = `Today, let the gentle whisper of '${name}' silence every inner accusation and voice of inadequacy. Rest deeply in the knowledge that you are unconditionally loved, fiercely defended, and eternally held in the palm of God's hand. Let this peace radiate into your home, your relationships, and your workplace.`;
  } else {
    // General Covenant, Blessing & Favor
    expositionPara1 = `Standing before the living altar of '${name}' (${hebrew}, ${translit})—meaning "${meaning}"—we encounter the boundless treasury of God's covenant promises. Rooted in ${ref}, this redemptive name serves as a divine compass for the soul, aligning our earthly journey with the eternal counsel of heaven. Every letter and vowel point in the sacred script bears witness to God's immutable faithfulness across biblical generations.`;
    expositionPara2 = `In ${covenantEra}, God demonstrated that His blessing is not contingent upon earthly stability or human perfection, but upon His sovereign grace. When Christ shed His blood on the tree, He inaugurated the New Covenant, writing '${name}' upon our hearts. We are no longer strangers to the covenant of promise; we are fellow citizens with the saints and members of the household of God, endowed with spiritual authority and heavenly favor.`;
    expositionPara3 = `Embrace this sacred revelation with radical thanksgiving today. Let the certainty of '${meaning}' inspire courageous faith, generosity, and worship. Because the Lord is your shepherd and shield, goodness and mercy shall follow you all the days of your life.`;
  }

  const fullExposition = `${expositionPara1}\n\n${expositionPara2}\n\n${expositionPara3}`;

  // Practical Application
  const practicalApplication = item.biblicalContext
    ? `${item.biblicalContext} Today, embody the reality of '${name}' by deliberately rejecting fear, speaking words of life over your circumstances, and treating others through the lens of God's redemptive grace.`
    : `Activate the power of '${name}' today: When facing decisions or pressure, remind yourself that you are "${meaning}" in Christ Jesus. Take three specific moments to pause, pray in faith, and declare ${ref} over your household and calling.`;

  // Prophetic Declaration
  const propheticDeclaration = item.propheticDeclaration ||
    `I boldly decree and declare that I am ${name} (${hebrew})—"${meaning}"! According to ${ref}, God's covenant blessing, resurrection power, and supernatural peace surround me as a shield. I will not stumble, I will not be put to shame, and the joy of the Lord is my unshakeable fortress today and forever!`;

  // Scripture Vault (Primary Anchor + 3 Cross-References)
  const vaultPool = [
    {
      reference: "Isaiah 62:2-4",
      text: "And the Gentiles shall see thy righteousness, and all kings thy glory: and thou shalt be called by a new name, which the mouth of the LORD shall name.",
      theme: "The New Prophetic Name of Glory",
      reflection: "God Himself rejoices over you with singing, erasing the old labels of desolation and conferring royal dignity."
    },
    {
      reference: "Revelation 2:17",
      text: "To him that overcometh will I give to eat of the hidden manna, and will give him a white stone, and in the stone a new name written, which no man knoweth saving he that receiveth it.",
      theme: "The White Stone of Divine Acquittal & Intimacy",
      reflection: "The new name is an intimate covenant between Christ and the believer, securing eternal fellowship."
    },
    {
      reference: "1 Peter 2:9",
      text: "But ye are a chosen generation, a royal priesthood, an holy nation, a peculiar people; that ye should shew forth the praises of him who hath called you out of darkness into his marvellous light.",
      theme: "Royal Priesthood & Chosen Inheritance",
      reflection: "Our redemptive names align us with the royal priesthood of Jesus Christ to declare His wonders in the earth."
    },
    {
      reference: "Ephesians 1:3-6",
      text: "Blessed be the God and Father of our Lord Jesus Christ, who hath blessed us with all spiritual blessings in heavenly places in Christ... to the praise of the glory of his grace, wherein he hath made us accepted in the beloved.",
      theme: "Accepted in the Beloved by Sovereign Grace",
      reflection: "Every redemptive name points to our irrevocable acceptance in Christ Jesus before the foundation of the world."
    },
    {
      reference: "Psalm 84:11",
      text: "For the LORD God is a sun and shield: the LORD will give grace and glory: no good thing will he withhold from them that walk uprightly.",
      theme: "Sun & Shield of Unfailing Favor",
      reflection: "Walking in our redemptive identity invites the unrestrained overflow of God's protection, grace, and glory."
    },
    {
      reference: "Romans 8:31-37",
      text: "What shall we then say to these things? If God be for us, who can be against us?... Nay, in all these things we are more than conquerors through him that loved us.",
      theme: "More Than Conquerors Through Sovereign Love",
      reflection: "No earthly tribulation, sword, or demonic power can separate the believer from the triumph encoded in their redemptive name."
    }
  ];

  const scriptureVault = [
    {
      reference: ref,
      text: `Scripture Anchor for ${name}: Revealed in the sacred canon as "${meaning}".`,
      theme: `${name} • Primary Covenant Anchor`,
      reflection: `This foundational scripture establishes the immutable reality that God names His people according to His redemptive purpose, not natural limitations.`
    },
    vaultPool[(id * 2) % vaultPool.length],
    vaultPool[(id * 2 + 1) % vaultPool.length],
    vaultPool[(id * 2 + 2) % vaultPool.length]
  ];

  // Apostolic Prayer tailored to this name
  const apostolicPrayer = {
    adoration: `O Sovereign Lord God of Abraham, Isaac, and Jacob, You who call the stars by name and declare the end from the beginning, we magnify Your holy majesty! We worship You for revealing Yourself through ${name} (${hebrew}). You alone are righteous, holy, and faithful across all generations!`,
    confessionAndSurrender: `Lord Jesus, as I stand upon the truth of ${ref}, I repent of every agreement I have ever made with the lies of the enemy, the labels of human rejection, or the limitations of my past. I renounce all fear, shame, and self-condemnation, and I surrender my whole spirit, soul, and body into Your hands.`,
    thanksgiving: `Father, with overflowing gratitude, I praise You that You have called me '${name}'—"${meaning}"! Thank You for the Blood of Jesus that purchased my eternal redemption, for the Holy Spirit who seals my identity, and for Your unshakeable favor that goes before me.`,
    petition: `In the mighty Name of Jesus Christ, I pray that the living power and atmosphere of '${name}' be made visible in my daily walk. Empower me with supernatural wisdom in my decisions, holiness in my conduct, courage in my calling, and divine health in my body. Let Your grace overflow from my life to touch everyone I meet.`,
    warfareDeclaration: `By the all-conquering authority of Jesus Christ, I break and dismantle every spiritual chain, every demonic assault, and every obstacle rising against the fulfillment of my redemptive calling! According to ${ref}, I am established in victory, surrounded by favor, and more than a conqueror through Him who loved me!`,
    propheticSeal: `I seal this prophetic prayer in the throne room of heaven. I decree that the joy of the Lord is my strength and that '${name}' is my eternal portion in Christ. In Jesus' mighty and victorious Name, Amen!`
  };

  // Synthetic Devotion for opening in devotion viewer
  const syntheticDevotion: Devotion = {
    id: `dev-shemot-${id}`,
    edition: "morning",
    editionLabel: `SHEMOT GEULAH • REDEMPTIVE NAME #${id}`,
    title: `${name} (${hebrew}): ${meaning}`,
    keyScripture: ref,
    passageText: `Redemptive Identity: "${name}" — ${meaning} (${hebrew} / ${translit}). Prophetic Scripture Anchor: ${ref}.`,
    reflection: `SACRED EXPOSITION & DEVOTIONAL REFLECTION:\n${fullExposition}`,
    practicalApplication,
    guidedPrayer: `${apostolicPrayer.adoration}\n\n${apostolicPrayer.petition}\n\n${apostolicPrayer.warfareDeclaration}`,
    actionStep: `Prophetic Decree for Today: "${propheticDeclaration}"`,
    theme: `${name} • ${cat}`,
    category: "Shemot Geulah (Redemptive Names)",
    readTimeMinutes: 4
  };

  return {
    name: item,
    hebrewRoot: hebrew,
    rootMeaning: meaning,
    transliterationGuide: translit,
    theologicalExposition: fullExposition,
    covenantEra,
    historicalContext: `Revealed in the historical setting of ${covenantEra}. In this era, God revealed His covenant character and restored His people to their royal inheritance.`,
    keyBiblicalFigures,
    practicalApplication,
    propheticDeclaration,
    scriptureVault,
    apostolicPrayer,
    syntheticDevotion
  };
}
