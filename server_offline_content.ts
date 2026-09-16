/**
 * Substantial, Scripture-Grounded Offline & Canonical Content Library
 * 
 * Provides rich, authentic, biblically grounded content for:
 * - Daily Devotions
 * - Structured Guided Prayers & 5 High-Impact Prayer Points
 * - Scripture Expositions & Historical Context
 * - The Joy of the Lord Revelation
 * - MathemaSermons & ApostleMath Lessons
 * - Prophetic Rhema Words
 * - Joy Overcoming Spiritual Warfare Guides
 * 
 * Guarantees zero blank screens and deep spiritual nourishment
 * when Gemini API daily quota is reached or offline.
 */

export interface OfflineDevotion {
  title: string;
  keyScripture: string;
  passageText: string;
  reflection: string;
  practicalApplication: string;
  guidedPrayer: string;
  actionStep: string;
}

export interface OfflinePrayer {
  title: string;
  subtitle: string;
  category: string;
  theme: string;
  scriptureAnchor: string;
  scripturePromise: string;
  adoration: string;
  confessionAndSurrender: string;
  thanksgiving: string;
  petition: string;
  spiritualWarfare: string;
  declarationInJesusName: string;
  suggestedScriptures: string[];
  sections: {
    adoration: string;
    confessionAndSurrender: string;
    thanksgiving: string;
    scripturePromise: string;
    petition: string;
    spiritualWarfare: string;
    declarationInJesusName: string;
  };
}

export interface OfflinePrayerPoints {
  title: string;
  scriptureAnchor: string;
  prayerPoints: Array<{
    pointNumber: number;
    focus: string;
    scripturePromise: string;
    prayerDeclaration: string;
  }>;
  propheticDecree: string;
}

export interface OfflineExposition {
  title: string;
  scriptureAnchor: string;
  historicalContext: string;
  culturalBackground: string;
  originalLanguageInsight: string;
  doctrinalMeaning: string;
  crossReferences: string[];
  lifeTransformation: string;
}

export interface OfflineJoyRevelation {
  title: string;
  scriptureAnchor: string;
  joyFortressExegesis: string;
  mathemaSermonAnalogy: string;
  covenantVictoryApplication: string;
  apostolicDecree: string;
  hopeAndEncouragementConclusion: string;
}

// ==========================================
// 1. CANONICAL DEVOTIONS LIBRARY
// ==========================================
export const CANONICAL_DEVOTIONS: Record<string, OfflineDevotion> = {
  "nehemiah 8:10": {
    title: "The Holy Fortress: Joy as Supernatural Power",
    keyScripture: "Nehemiah 8:10 - 'For the joy of the LORD is your strength.'",
    passageText: "Then he said unto them, Go your way, eat the fat, and drink the sweet, and send portions unto them for whom nothing is prepared: for this day is holy unto our Lord: neither be ye sorry; for the joy of the LORD is your strength.",
    reflection: `In the post-exilic rebuilding of Jerusalem, the returned remnant wept as Ezra read the Law, crushed by the realization of past generational failures. Yet Nehemiah, Ezra, and the Levites commanded a radical reorientation: "Do not sorrow, for the joy of the Lord is your strength (ma'oz - fortress, rock of defense)." True biblical joy is not an emotional temperament or the fruit of favorable circumstance; it is an unshakeable spiritual fortress erected by the presence and finished covenant of God.\n\nWhen we rely on natural grit, human energy drains quickly under adversity. But when our souls drink from God's holy joy, we draw from an inexhaustible reservoir. Joy is the believer's active resistance against despair. It disarms the accuser, silences fear, and declares that God's sovereign redemption is infinitely greater than any temporal devastation.`,
    practicalApplication: "Today, refuse to let external pressures determine your interior climate. Take 3 pauses during the day to speak Nehemiah 8:10 aloud, thanking God that His joy is your unshakeable armor.",
    guidedPrayer: "Almighty God, I praise You that my spiritual stamina does not come from my fragile emotions, but from Your unchanging covenant. I renounce the spirit of heaviness and clothe myself in Your joy. Let Your joy be a shield over my mind, my family, and my work today. In Jesus' victorious Name, Amen.",
    actionStep: "Send an encouraging scripture text to someone who is carrying heavy burdens today, sharing the sweet portion of God's joy."
  },
  "philippians 4:6-7": {
    title: "The Divine Garrison: Peace Transcending Circumstance",
    keyScripture: "Philippians 4:6-7 - 'Be careful for nothing... and the peace of God shall keep your hearts and minds.'",
    passageText: "Be careful for nothing; but in every thing by prayer and supplication with thanksgiving let your requests be made known unto God. And the peace of God, which passeth all understanding, shall keep your hearts and minds through Christ Jesus.",
    reflection: `The Apostle Paul wrote these words while chained to a Roman imperial guard. From human assessment, Paul had every justification for anxiety: impending trial, physical restriction, and church factionalism. Yet from prison, he gives the church the divine protocol for indestructible equilibrium: convert every anxious worry into targeted thanksgiving and petition.\n\nThe Greek word for "shall keep" (phroureo) is a military term meaning to mount a protective garrison around a fortress city. When you surrender your strivings into God's hands with authentic praise, God posts the garrison of His heavenly peace at the gates of your imagination and emotional faculties. Anxiety cannot breach the soul guarded by the peace of Christ.`,
    practicalApplication: "Write down the three biggest anxieties facing you right now. Beside each one, write a specific attribute of God and a scripture promise, then audibly thank Him for handling it before seeing the outcome.",
    guidedPrayer: "Father of Mercies, I surrender every anxious calculation and hurried striving at the foot of the Cross. I receive the transcendent peace of Jesus Christ as an armed garrison guarding my mind, emotions, and decisions. In Jesus' mighty Name, Amen.",
    actionStep: "Whenever worry knocks today, counter immediately with 60 seconds of silent or vocal thanksgiving."
  },
  "romans 8:28": {
    title: "The Sovereign Weaver: All Things Working for Good",
    keyScripture: "Romans 8:28 - 'And we know that all things work together for good to them that love God.'",
    passageText: "And we know that all things work together for good to them that love God, to them who are the called according to his purpose.",
    reflection: `Paul does not write "we hypothesize" or "we hope"; he writes "we know" (oidamen - an intuitive, absolute covenant certainty). In a fallen world marked by unexpected delays, heartaches, and sudden trials, the believer stands on an immovable foundation: God is the master weaver of human history. The Greek compound "synergeo" (work together) reveals that God orchestrates even our adversities, griefs, and setbacks into a harmonious tapestry of ultimate sanctification and eternal glory.\n\nThe promise is not that every event is pleasant in itself, but that no event has the power to derail God's eternal purpose for your life. The cross appeared to be the ultimate defeat, yet in God's divine calculus it was the supreme coronation of victory. Your current trial is not the conclusion of your story; it is the seed of an extraordinary testimony.`,
    practicalApplication: "Reframe a painful disappointment from this past season through the lens of Romans 8:28. Confess that God is currently extracting wisdom, endurance, and future fruit from what the enemy meant for destruction.",
    guidedPrayer: "Sovereign Lord, You see the beginning from the end. I trust Your perfect craftsmanship over my life. Even when I cannot trace Your hand in difficult circumstances, I trust Your heart. Turn every stumbling block into a stepping stone of glory. In Jesus' Name, Amen.",
    actionStep: "Encourage a brother or sister walking through uncertainty by reminding them of God's faithful orchestration."
  },
  "isaiah 40:31": {
    title: "Mounting on Eagles' Wings: Supernatural Exchange",
    keyScripture: "Isaiah 40:31 - 'They that wait upon the LORD shall renew their strength.'",
    passageText: "But they that wait upon the LORD shall renew their strength; they shall mount up with wings as eagles; they shall run, and not be weary; and they shall walk, and not faint.",
    reflection: `The Hebrew verb for "renew" is "chalaph", which literally means to exchange, replace, or put on fresh garments. To wait on the Lord (qavah - to entwine, braid oneself with God) is not passive resignation; it is the intentional entwining of our finite human frailty with God's infinite omnipotence. When an eagle enters a storm, it does not flap frantically in panic; it locks its vast wings into the updrafts of the wind and soars above the tempest.\n\nGod does not merely give you a small boost of human stamina; He takes your exhausted human strength and exchanges it for divine vitality. You were designed to live from heaven downward, not from earthly exhaustion upward.`,
    practicalApplication: "Set aside 10 minutes of complete silence today without screens or demands. Let your soul wait quietly upon the Lord, breathing in His peace and releasing your fatigue.",
    guidedPrayer: "Lord Jehovah, Creator of the ends of the earth, You never faint nor grow weary. I lay down my depleted energy and entwine my life with Your Spirit. Lift me on wings of faith above every obstacle and grant me grace to run without fainting. Amen.",
    actionStep: "Walk through today's responsibilities with deliberate, unhurried trust, keeping your eyes fixed on Jesus."
  },
  "psalm 23:1-3": {
    title: "Green Pastures & Still Waters: The Shepherd's Care",
    keyScripture: "Psalm 23:1 - 'The LORD is my shepherd; I shall not want.'",
    passageText: "The LORD is my shepherd; I shall not want. He maketh me to lie down in green pastures: he leadeth me beside the still waters. He restoreth my soul: he leadeth me in the paths of righteousness for his name's sake.",
    reflection: `David was an experienced shepherd who knew that sheep are defenseless creatures prone to fear, wanderlust, and panic. Sheep cannot lie down to rest if they are plagued by friction, fear, parasites, or hunger. The presence of the Good Shepherd eliminates all four. When the Lord is your Shepherd, "I shall not want" is not merely a statement of future supply; it is an announcement of present contentment.\n\nHe leads beside "still waters" (waters of quietness), where the turbulent currents of worldly strife cannot drown out the gentle whisper of His Spirit. He restores your soul—rebuilding your inner life from the fracture of exhaustion.`,
    practicalApplication: "Identify where you have been operating from a mindset of lack or scarcity. Surrender that fear to the Good Shepherd and meditate on His daily abundance.",
    guidedPrayer: "Good Shepherd, lead me today into Your restful pastures. Calm every turbulent thought, restore my inner spirit, and guide my feet along righteous paths for Your Name's sake. In Jesus' Name, Amen.",
    actionStep: "Rest tonight knowing the Shepherd of Israel neither slumbers nor sleeps over your life."
  }
};

// ==========================================
// 2. CANONICAL GUIDED PRAYERS LIBRARY
// ==========================================
export const CANONICAL_PRAYERS: Record<string, OfflinePrayer> = {
  "divine strength": {
    title: "Apostolic Prayer for Divine Strength and Joy",
    subtitle: "Rooted in Nehemiah 8:10 and Ephesians 3:16 for inner fortitude",
    category: "Strength & Fortitude",
    theme: "Divine Strength and Holy Joy",
    scriptureAnchor: "Nehemiah 8:10 - 'The joy of the LORD is your strength.'",
    scripturePromise: "Ephesians 3:16 - 'To be strengthened with might by his Spirit in the inner man.'",
    adoration: "Almighty God, Maker of heaven and earth, You are El-Gibbor, the Mighty God of Israel! In Your right hand is power and glory, and Your sovereign throne stands firm across all generations. I worship You for Your unsearchable majesty and inexhaustible grace.",
    confessionAndSurrender: "Father, I confess that I have often leaned upon the arm of flesh, striving in my own limited stamina and growing weary. Forgive me for taking on burdens You never commanded me to carry. I lay down all self-reliance and surrender my fatigue into Your loving hands.",
    thanksgiving: "Thank You, Lord, for the victory of the Cross that conquered sin, death, and despair. Thank You that when I am weak, Your supernatural grace is made perfect in me. Thank You for preserving my life and family in the hollow of Your hand.",
    petition: "Pour out the spirit of wisdom and spiritual might into my inner man today. Strengthen my physical body, refresh my mental clarity, and renew my spiritual resolve. Grant me divine endurance to run my race with diligence, integrity, and cheerful faith.",
    spiritualWarfare: "In the mighty Name of the Lord Jesus Christ, I renounce and break the spirit of heaviness, fatigue, anxiety, and demonic discouragement. I put on the Helmet of Salvation and take up the Shield of Faith. Every assignment of exhaustion against my destiny is shattered by the Blood of the Lamb.",
    declarationInJesusName: "I decree and declare that the Joy of the Lord is my living fortress! I run and am not weary; I walk and do not faint. Goodness and mercy surround me on every side, and I finish this season in triumphant victory. In Jesus' mighty Name, Amen.",
    suggestedScriptures: ["Nehemiah 8:10", "Isaiah 40:29-31", "Ephesians 3:16-19", "Philippians 4:13"],
    sections: {
      adoration: "Almighty God, Maker of heaven and earth, You are El-Gibbor, the Mighty God of Israel! In Your right hand is power and glory, and Your sovereign throne stands firm across all generations. I worship You for Your unsearchable majesty and inexhaustible grace.",
      confessionAndSurrender: "Father, I confess that I have often leaned upon the arm of flesh, striving in my own limited stamina and growing weary. Forgive me for taking on burdens You never commanded me to carry. I lay down all self-reliance and surrender my fatigue into Your loving hands.",
      thanksgiving: "Thank You, Lord, for the victory of the Cross that conquered sin, death, and despair. Thank You that when I am weak, Your supernatural grace is made perfect in me. Thank You for preserving my life and family in the hollow of Your hand.",
      scripturePromise: "Ephesians 3:16 - 'To be strengthened with might by his Spirit in the inner man.'",
      petition: "Pour out the spirit of wisdom and spiritual might into my inner man today. Strengthen my physical body, refresh my mental clarity, and renew my spiritual resolve. Grant me divine endurance to run my race with diligence, integrity, and cheerful faith.",
      spiritualWarfare: "In the mighty Name of the Lord Jesus Christ, I renounce and break the spirit of heaviness, fatigue, anxiety, and demonic discouragement. I put on the Helmet of Salvation and take up the Shield of Faith. Every assignment of exhaustion against my destiny is shattered by the Blood of the Lamb.",
      declarationInJesusName: "I decree and declare that the Joy of the Lord is my living fortress! I run and am not weary; I walk and do not faint. Goodness and mercy surround me on every side, and I finish this season in triumphant victory. In Jesus' mighty Name, Amen."
    }
  },
  "peace": {
    title: "Apostolic Prayer for Supernatural Peace and Mind Guarding",
    subtitle: "Rooted in Philippians 4:6-7 and John 14:27 against anxiety",
    category: "Peace & Deliverance",
    theme: "Supernatural Peace in the Storm",
    scriptureAnchor: "Philippians 4:6-7 - 'The peace of God shall keep your hearts and minds.'",
    scripturePromise: "John 14:27 - 'Peace I leave with you, my peace I give unto you: not as the world giveth.'",
    adoration: "Prince of Peace, King of Kings, You who commanded the winds and waves on the Sea of Galilee and they obeyed, You are the anchor of my soul. I adore Your transcendent majesty that remains calm in the midst of every storm.",
    confessionAndSurrender: "Lord, I repent of entertaining anxious thoughts, catastrophic imaginations, and fearful calculations. I surrender my fears of tomorrow into Your hands. You know every need before I speak, and Your care for me is perfect.",
    thanksgiving: "I thank You for Your covenant peace that the world cannot give and the world cannot take away. Thank You that You have not given me a spirit of fear, but of power, of love, and of a sound mind.",
    petition: "Let Your holy peace settle upon my household and my thoughts like a divine mantle. Guide my decisions with clarity, silence the voice of panic, and illuminate the path forward with Your heavenly counsel.",
    spiritualWarfare: "In the Name of Jesus Christ, I bind every spirit of panic, insomnia, dread, and oppression. I tear down every stronghold of fear exalted against the knowledge of God, bringing every thought captive to the obedience of Christ.",
    declarationInJesusName: "I declare that my mind is garrisoned by the peace of God! No weapon formed against my peace or joy shall prosper. I sleep in peace and awake in confidence, for the Lord sustains me. In Jesus' victorious Name, Amen.",
    suggestedScriptures: ["Philippians 4:6-7", "John 14:27", "2 Timothy 1:7", "Psalm 91:1-4"],
    sections: {
      adoration: "Prince of Peace, King of Kings, You who commanded the winds and waves on the Sea of Galilee and they obeyed, You are the anchor of my soul. I adore Your transcendent majesty that remains calm in the midst of every storm.",
      confessionAndSurrender: "Lord, I repent of entertaining anxious thoughts, catastrophic imaginations, and fearful calculations. I surrender my fears of tomorrow into Your hands. You know every need before I speak, and Your care for me is perfect.",
      thanksgiving: "I thank You for Your covenant peace that the world cannot give and the world cannot take away. Thank You that You have not given me a spirit of fear, but of power, of love, and of a sound mind.",
      scripturePromise: "John 14:27 - 'Peace I leave with you, my peace I give unto you: not as the world giveth.'",
      petition: "Let Your holy peace settle upon my household and my thoughts like a divine mantle. Guide my decisions with clarity, silence the voice of panic, and illuminate the path forward with Your heavenly counsel.",
      spiritualWarfare: "In the Name of Jesus Christ, I bind every spirit of panic, insomnia, dread, and oppression. I tear down every stronghold of fear exalted against the knowledge of God, bringing every thought captive to the obedience of Christ.",
      declarationInJesusName: "I declare that my mind is garrisoned by the peace of God! No weapon formed against my peace or joy shall prosper. I sleep in peace and awake in confidence, for the Lord sustains me. In Jesus' victorious Name, Amen."
    }
  },
  "breakthrough": {
    title: "Apostolic Prayer for Breakthrough and Open Heavens",
    subtitle: "Rooted in Micah 2:13 and Revelation 3:8 for spiritual advancement",
    category: "Breakthrough & Open Doors",
    theme: "Supernatural Breakthrough & Divine Favor",
    scriptureAnchor: "Micah 2:13 - 'The breaker is come up before them: they have broken up, and have passed through the gate.'",
    scripturePromise: "Revelation 3:8 - 'Behold, I have set before thee an open door, and no man can shut it.'",
    adoration: "O Lord God of Hosts, the Breaker who goes before us! You split the Red Sea, You brought down the walls of Jericho, and You rolled away the stone from the tomb of Jesus Christ. You reign supreme over every power, dominion, and gate of circumstance!",
    confessionAndSurrender: "Father, I lay aside every garment of spiritual apathy, delay, and doubt. Forgive me for when I have looked at giant obstacles instead of looking at my giant God. I align my will with Your kingdom agenda.",
    thanksgiving: "Thank You that Jesus holds the keys of David—what He opens, no man can shut, and what He shuts, no man can open! Thank You that You have already gone ahead of me to make the crooked paths straight.",
    petition: "Open the doors of divine opportunity, spiritual illumination, and favor in the marketplace. Accelerate the fulfillment of Your promises. Grant me favor before decision-makers and angelic assistance to execute Your will with excellence.",
    spiritualWarfare: "In the authority of the Name of Jesus Christ, I take the sword of the Spirit against every barricade of stagnation, witchcraft, generational delay, and demonic resistance. Every iron gate barring my advancement is broken in pieces!",
    declarationInJesusName: "I decree and declare: The Breaker has gone before me! I step through every open door ordained by God for my life. The glory of God is my rear guard, and His blessing overtakes me today. In the mighty Name of Jesus Christ, Amen.",
    suggestedScriptures: ["Micah 2:13", "Revelation 3:8", "Isaiah 45:1-3", "Psalm 24:7-10"],
    sections: {
      adoration: "O Lord God of Hosts, the Breaker who goes before us! You split the Red Sea, You brought down the walls of Jericho, and You rolled away the stone from the tomb of Jesus Christ. You reign supreme over every power, dominion, and gate of circumstance!",
      confessionAndSurrender: "Father, I lay aside every garment of spiritual apathy, delay, and doubt. Forgive me for when I have looked at giant obstacles instead of looking at my giant God. I align my will with Your kingdom agenda.",
      thanksgiving: "Thank You that Jesus holds the keys of David—what He opens, no man can shut, and what He shuts, no man can open! Thank You that You have already gone ahead of me to make the crooked paths straight.",
      scripturePromise: "Revelation 3:8 - 'Behold, I have set before thee an open door, and no man can shut it.'",
      petition: "Open the doors of divine opportunity, spiritual illumination, and favor in the marketplace. Accelerate the fulfillment of Your promises. Grant me favor before decision-makers and angelic assistance to execute Your will with excellence.",
      spiritualWarfare: "In the authority of the Name of Jesus Christ, I take the sword of the Spirit against every barricade of stagnation, witchcraft, generational delay, and demonic resistance. Every iron gate barring my advancement is broken in pieces!",
      declarationInJesusName: "I decree and declare: The Breaker has gone before me! I step through every open door ordained by God for my life. The glory of God is my rear guard, and His blessing overtakes me today. In the mighty Name of Jesus Christ, Amen."
    }
  }
};

// ==========================================
// 3. CANONICAL PRAYER POINTS GENERATOR
// ==========================================
export function getOfflinePrayerPoints(scriptureRef: string, scriptureText: string): OfflinePrayerPoints {
  const ref = scriptureRef || "Nehemiah 8:10";
  const text = scriptureText || "The joy of the LORD is your strength.";

  return {
    title: `5 High-Impact Apostolic Prayer Points on ${ref}`,
    scriptureAnchor: `${ref} - "${text}"`,
    prayerPoints: [
      {
        pointNumber: 1,
        focus: "Personal Spiritual Consecration & Alignment",
        scripturePromise: "Psalm 139:23-24 - 'Search me, O God, and know my heart... and lead me in the way everlasting.'",
        prayerDeclaration: `Father, I consecrate my heart, thoughts, and schedule to Your sovereign lordship. Root out every distraction and align my steps with the truth of ${ref}. In Jesus' Name, Amen.`
      },
      {
        pointNumber: 2,
        focus: "Release of Supernatural Fortitude & Joy",
        scripturePromise: "Ephesians 3:16 - 'To be strengthened with might by his Spirit in the inner man.'",
        prayerDeclaration: `Lord Jehovah, let the living power of ${ref} flood my inner man! I exchange all physical, mental, and emotional weariness for the unshakeable fortitude of the Holy Ghost. In Jesus' Name, Amen.`
      },
      {
        pointNumber: 3,
        focus: "Shattering Barriers & Demonic Limitations",
        scripturePromise: "2 Corinthians 10:4 - 'The weapons of our warfare are not carnal, but mighty through God.'",
        prayerDeclaration: `In the mighty Name of Jesus Christ, I enforce the authority of ${ref} over every opposing spirit of delay, doubt, and fear. Every barrier standing against my divine destiny is dismantled now!`
      },
      {
        pointNumber: 4,
        focus: "Household Blessing & Covenant Protection",
        scripturePromise: "Psalm 91:10 - 'There shall no evil befall thee, neither shall any plague come nigh thy dwelling.'",
        prayerDeclaration: `Father, I place the blood of Jesus over my family, loved ones, and household. Let the blessing embedded in ${ref} cover our coming in and our going out, preserving our health and peace.`
      },
      {
        pointNumber: 5,
        focus: "Destiny Acceleration & Kingdom Impact",
        scripturePromise: "Isaiah 60:1 - 'Arise, shine; for thy light is come, and the glory of the LORD is risen upon thee.'",
        prayerDeclaration: `Lord, let the revelation of ${ref} awaken my spiritual gifts! Empower me to bear abundant fruit in my community, workplace, and church, bringing glory to Jesus Christ forever. Amen.`
      }
    ],
    propheticDecree: `I decree and declare that every word spoken over my life in ${ref} is established in heaven and manifest in the earth. I step forward in unshakeable joy, divine boldness, and supernatural breakthrough. In Jesus' mighty Name, Amen!`
  };
}

// ==========================================
// 4. CANONICAL SCRIPTURE EXPOSITION GENERATOR
// ==========================================
export function getOfflineExposition(scriptureRef: string, scriptureText: string): OfflineExposition {
  const ref = scriptureRef || "Nehemiah 8:10";
  const text = scriptureText || "The joy of the LORD is your strength.";

  return {
    title: `Comprehensive Expository & Contextual Analysis of ${ref}`,
    scriptureAnchor: `${ref} - "${text}"`,
    historicalContext: `Recorded during the post-exilic restoration under the leadership of Nehemiah the governor and Ezra the priest. Having completed the fortified walls of Jerusalem in fifty-two miraculous days, the returned remnant gathered at the Water Gate to hear the reading of the Torah. The historical backdrop was marked by deep emotional vulnerability, economic hardship, and external military threats from surrounding adversaries.`,
    culturalBackground: `In ancient Near Eastern covenant gatherings, the public recitation of the Law was accompanied by formal communal repentance. However, the feast day in Nehemiah 8 fell on Rosh Hashanah (Feast of Trumpets), which mandated sacred holy joy and hospitality rather than mourning. Sending portions to those for whom nothing was prepared was an essential demonstration of covenant solidarity and shared joy.`,
    originalLanguageInsight: `In the original biblical text, the Hebrew word for strength is 'ma'oz' (מָעוֹז), which conveys a fortified stronghold, a rock of refuge, or an impregnable fortress. The joy (chedvah - חֶדְוָה) is an objective divine attribute originating in God Himself, rather than transient human happiness. Therefore, the phrase reveals that God's own joy functions as an impenetrable fortress garrisoning the believer's life.`,
    doctrinalMeaning: `The theological truth established in this text is the sovereignty of grace over human performance. The believer's spiritual endurance does not derive from self-generated emotional resolve, but from resting in God's delight over His covenant people. God does not demand our strength before blessing us; His joy in us provides the strength to stand and overcome.`,
    crossReferences: ["Psalm 16:11", "Habakkuk 3:17-19", "Philippians 4:4", "Hebrews 12:2", "Romans 15:13"],
    lifeTransformation: `Apply this truth today by shifting your posture from anxious striving to confident rest. When confronted with feelings of inadequacy or spiritual exhaustion, run into the ma'oz (fortress) of God's joy. Praise God before circumstances change, knowing that praise activates covenant victory.`
  };
}

// ==========================================
// 5. CANONICAL JOY REVELATION GENERATOR
// ==========================================
export function getOfflineJoyRevelation(scriptureRef: string, scriptureText: string): OfflineJoyRevelation {
  const ref = scriptureRef || "Nehemiah 8:10";
  const text = scriptureText || "The joy of the LORD is your strength.";

  return {
    title: `The Covenant Fortress of Joy: Revelation on ${ref}`,
    scriptureAnchor: `${ref} - "${text}"`,
    joyFortressExegesis: `The revelation of the Joy of the Lord in ${ref} shatters the worldly illusion that joy depends upon ideal earthly conditions. Joy is not the absence of storms, but the supernatural presence of God within the storm. When Nehemiah declared that the joy of the Lord is our strength (ma'oz), he revealed that joy is a spiritual fortress. While sorrow depletes the immune system of the soul, divine joy acts as an unyielding armor that shields the believer against demonic intimidation, mental paralysis, and spiritual weariness.`,
    mathemaSermonAnalogy: `In MathemaSermon homiletics, consider the Joy of the Lord as an invariant constant multiplier operating upon finite human variables. Even if your human resources (x) approach zero under trial, when multiplied by God's infinite covenant joy (C = ∞), the resulting spiritual vitality (f(x)) transcends all earthly bounds. Joy is the mathematical asymptotic bound ensuring that the believer's spiritual capacity never falls below the threshold of victory.`,
    covenantVictoryApplication: `To operationalize this revelation, you must treat worship not as a luxury for good days, but as an offensive weapon on difficult days. David encouraged himself in the Lord at Ziklag when everything was burned, and within hours he recovered all. When you choose to rejoice in Christ despite what your eyes see, you align your spirit with heaven's frequency and release angels of deliverance.`,
    apostolicDecree: `By apostolic authority in the Name of Jesus Christ, I decree that sadness, depression, and hopelessness have no legal ground in your life. I declare that the Joy of the Lord saturates your mind, your emotions, and your home today!`,
    hopeAndEncouragementConclusion: `Beloved saint, lift up your head! You are not walking toward defeat; you are walking from the finished victory of Calvary. No matter how deep the valley or how fierce the battle, God is restoring your joy with double honor. You will sing again, you will rejoice with uncontainable gladness, and your testimony shall ignite nations. Stand bold, be joyful, and watch God triumph through you!`
  };
}

// ==========================================
// 6. MASTER DISPATCHER FOR ALL OFFLINE QUERIES
// ==========================================
export function getOfflineContentForRequest(category: string, params: Record<string, any>): any {
  const cat = (category || "").toLowerCase();
  const act = (params.actionType || "").toLowerCase();
  const ref = params.scriptureReference || params.reference || "Nehemiah 8:10";
  const text = params.scriptureText || "The joy of the LORD is your strength.";
  const topic = params.topic || params.subject || "Divine Strength & Peace";
  const need = params.need || "Spiritual renewal, peace, and victory";

  if (act.includes("point") || act === "5 high-impact prayer points" || act === "prayer_points") {
    return getOfflinePrayerPoints(ref, text);
  }

  if (act.includes("context") || act.includes("historical") || act.includes("explain") || act.includes("exposition")) {
    return getOfflineExposition(ref, text);
  }

  if (act.includes("joy") || act === "the joy of the lord" || act === "joy_revelation") {
    return getOfflineJoyRevelation(ref, text);
  }

  if (act.includes("prayer") || cat.includes("prayer") || need) {
    // Match against canonical prayers
    const lowerNeed = (need + " " + topic).toLowerCase();
    if (lowerNeed.includes("peace") || lowerNeed.includes("anxiety") || lowerNeed.includes("fear")) {
      return CANONICAL_PRAYERS["peace"];
    }
    if (lowerNeed.includes("breakthrough") || lowerNeed.includes("door") || lowerNeed.includes("finance") || lowerNeed.includes("favor")) {
      return CANONICAL_PRAYERS["breakthrough"];
    }
    return CANONICAL_PRAYERS["divine strength"];
  }

  // Default to rich Devotion
  const lowerRef = ref.toLowerCase().trim();
  for (const [key, dev] of Object.entries(CANONICAL_DEVOTIONS)) {
    if (lowerRef.includes(key) || key.includes(lowerRef)) {
      return dev;
    }
  }

  // Fallback to Nehemiah 8:10 devotion
  return CANONICAL_DEVOTIONS["nehemiah 8:10"];
}
