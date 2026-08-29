import { BibleVersionCode, BibleVersionInfo } from "../types";

export const BIBLE_VERSIONS: BibleVersionInfo[] = [
  {
    code: "KJV",
    name: "King James Version",
    description: "The classic Authorized Version (1611), renowned for poetic majesty, reverent language, and textual precision.",
    year: "1611",
    badge: "Classic Authorized"
  },
  {
    code: "NKJV",
    name: "New King James Version",
    description: "Maintains the lyrical beauty and traditional cadence of the KJV while updating archaic vocabulary for modern clarity.",
    year: "1982",
    badge: "Traditional & Clear"
  },
  {
    code: "NIV",
    name: "New International Version",
    description: "The world's most popular modern translation, balancing thought-for-thought readability and word-for-word accuracy.",
    year: "1978 / 2011",
    badge: "Balanced & Modern"
  },
  {
    code: "AMP",
    name: "Amplified Bible",
    description: "Expands word meanings, historical nuances, and Greek/Hebrew connotations in brackets to reveal the rich depth of Scripture.",
    year: "1965 / 2015",
    badge: "Expanded Study"
  },
  {
    code: "ESV",
    name: "English Standard Version",
    description: "Essentially literal word-for-word translation emphasizing exact theological precision and literary excellence.",
    year: "2001",
    badge: "Word-for-Word"
  },
  {
    code: "NLT",
    name: "New Living Translation",
    description: "Dynamic equivalence translation communicating the ancient message into clear, contemporary, natural spoken English.",
    year: "1996 / 2015",
    badge: "Dynamic Clarity"
  },
  {
    code: "NASB",
    name: "New American Standard Bible",
    description: "Widely regarded by biblical scholars as the most strictly literal word-for-word modern English translation.",
    year: "1971 / 2020",
    badge: "Literal Precision"
  },
  {
    code: "CSB",
    name: "Christian Standard Bible",
    description: "Optimal blend of formal word-for-word accuracy and contemporary dynamic clarity for study and worship.",
    year: "2017",
    badge: "Optimal Blend"
  },
  {
    code: "MSG",
    name: "The Message",
    description: "Eugene Peterson's vibrant, contemporary idiomatic paraphrase capturing the raw narrative energy of Scripture.",
    year: "2002",
    badge: "Vibrant Paraphrase"
  },
  {
    code: "TPT",
    name: "The Passion Translation",
    description: "Heart-level poetic translation expressing God's fiery love, passionate grace, and deepest emotional revelation.",
    year: "2017",
    badge: "Heart & Passion"
  },
  {
    code: "ASV",
    name: "American Standard Version",
    description: "Monument of American biblical scholarship (1901) known for strict textual fidelity to ancient manuscripts.",
    year: "1901",
    badge: "Scholarly Classic"
  },
  {
    code: "NET",
    name: "New English Translation",
    description: "Created by leading biblical scholars with transparent linguistic fidelity and detailed translative insights.",
    year: "2005 / 2019",
    badge: "Scholarly Notes"
  },
  {
    code: "WEB",
    name: "World English Bible",
    description: "Modern public-domain translation in clear standard English preserving Hebrew and Greek canonical order.",
    year: "2000",
    badge: "Modern Free"
  },
  {
    code: "YLT",
    name: "Young's Literal Translation",
    description: "Strictly literal grammatical translation maintaining original Hebrew and Greek verb tenses and idioms.",
    year: "1862 / 1898",
    badge: "Grammatical Literal"
  },
  {
    code: "CEV",
    name: "Contemporary English Version",
    description: "Clear, understandable English formulated specifically to be read aloud and easily comprehended by all listeners.",
    year: "1995",
    badge: "Spoken Clarity"
  },
  {
    code: "BSB",
    name: "Berean Standard Bible",
    description: "High-clarity, text-critical modern translation crafted by international biblical scholars and public readers.",
    year: "2016 / 2022",
    badge: "Berean Clarity"
  }
];

// Rich multi-version database for notable verses across Genesis to Revelation
export interface MultiVersionVerse {
  book: string;
  chapter: number;
  verse: number;
  translations: Partial<Record<BibleVersionCode, string>>;
}

export const MULTI_VERSION_CATALOG: MultiVersionVerse[] = [
  // Nehemiah 8:10 (Theme scripture)
  {
    book: "Nehemiah",
    chapter: 8,
    verse: 10,
    translations: {
      KJV: "Then he said unto them, Go your way, eat the fat, and drink the sweet, and send portions unto them for whom nothing is prepared: for this day is holy unto our Lord: neither be ye sorry; for the joy of the LORD is your strength.",
      NKJV: "Then he said to them, 'Go your way, eat the fat, drink the sweet, and send portions to those for whom nothing is prepared; for this day is holy to our Lord. Do not sorrow, for the joy of the LORD is your strength.'",
      NIV: "Nehemiah said, 'Go and enjoy choice food and sweet drinks, and send some to those who have nothing prepared. This day is holy to our Lord. Do not grieve, for the joy of the LORD is your strength.'",
      AMP: "Then Nehemiah said to them, 'Go [your way], eat the rich festival food, drink the sweet drink, and send portions to him for whom nothing is prepared; for this day is holy to our Lord. And do not be worried or grieved, for the joy of the LORD is your strength and your stronghold.'",
      ESV: "Then he said to them, 'Go your way. Eat the fat and drink sweet wine and send portions to anyone who has nothing ready, for this day is holy to our Lord. And do not be grieved, for the joy of the LORD is your strength.'",
      NLT: "And Nehemiah continued, 'Go and celebrate with a feast of rich foods and sweet drinks, and share gifts of food with people who have nothing prepared. This is a sacred day before our Lord. Don't be dejected and sad, for the joy of the LORD is your strength!'"
    }
  },
  // John 3:16
  {
    book: "John",
    chapter: 3,
    verse: 16,
    translations: {
      KJV: "For God so loved the world, that he gave his only begotten Son, that whosoever believeth in him should not perish, but have everlasting life.",
      NKJV: "For God so loved the world that He gave His only begotten Son, that whoever believes in Him should not perish but have everlasting life.",
      NIV: "For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life.",
      AMP: "For God so [greatly] loved and dearly prized the world, that He [even] gave His [One and] only begotten Son, so that whoever believes and trusts in Him [as Savior] shall not perish, but have eternal life.",
      ESV: "For God so loved the world, that he gave his only Son, that whoever believes in him should not perish but have eternal life.",
      NLT: "For this is how God loved the world: He gave his one and only Son, so that everyone who believes in him will not perish but have eternal life."
    }
  },
  // Philippians 4:13
  {
    book: "Philippians",
    chapter: 4,
    verse: 13,
    translations: {
      KJV: "I can do all things through Christ which strengtheneth me.",
      NKJV: "I can do all things through Christ who strengthens me.",
      NIV: "I can do all this through him who gives me strength.",
      AMP: "I have strength for all things in Christ Who empowers me [I am ready for anything and equal to anything through Him Who infuses inner strength into me; I am self-sufficient in Christ's sufficiency].",
      ESV: "I can do all things through him who strengthens me.",
      NLT: "For I can do everything through Christ, who gives me strength."
    }
  },
  // Romans 8:28
  {
    book: "Romans",
    chapter: 8,
    verse: 28,
    translations: {
      KJV: "And we know that all things work together for good to them that love God, to them who are the called according to his purpose.",
      NKJV: "And we know that all things work together for good to those who love God, to those who are the called according to His purpose.",
      NIV: "And we know that in all things God works for the good of those who love him, who have been called according to his purpose.",
      AMP: "And we know [with great confidence] that God [who is deeply concerned about us] causes all things to work together [as a plan, with purpose] for good for those who love God, to those who are called according to His plan and purpose.",
      ESV: "And we know that for those who love God all things work together for good, for those who are called according to his purpose.",
      NLT: "And we know that God causes everything to work together for the good of those who love God and are called according to his purpose for them."
    }
  },
  // Proverbs 3:5
  {
    book: "Proverbs",
    chapter: 3,
    verse: 5,
    translations: {
      KJV: "Trust in the LORD with all thine heart; and lean not unto thine own understanding.",
      NKJV: "Trust in the LORD with all your heart, and lean not on your own understanding;",
      NIV: "Trust in the LORD with all your heart and lean not on your own understanding;",
      AMP: "Trust in and rely confidently on the LORD with all your heart and do not rely on your own insight or understanding.",
      ESV: "Trust in the LORD with all your heart, and do not lean on your own understanding.",
      NLT: "Trust in the LORD with all your heart; do not depend on your own understanding."
    }
  },
  // Proverbs 3:6
  {
    book: "Proverbs",
    chapter: 3,
    verse: 6,
    translations: {
      KJV: "In all thy ways acknowledge him, and he shall direct thy paths.",
      NKJV: "In all your ways acknowledge Him, and He shall direct your paths.",
      NIV: "in all your ways submit to him, and he will make your paths straight.",
      AMP: "In all your ways know and acknowledge and recognize Him, and He will make your paths straight and smooth [removing obstacles that block your way].",
      ESV: "In all your ways acknowledge him, and he will make straight your paths.",
      NLT: "Seek his will in all you do, and he will show you which path to take."
    }
  },
  // Isaiah 40:31
  {
    book: "Isaiah",
    chapter: 40,
    verse: 31,
    translations: {
      KJV: "But they that wait upon the LORD shall renew their strength; they shall mount up with wings as eagles; they shall run, and not be weary; and they shall walk, and not faint.",
      NKJV: "But those who wait on the LORD Shall renew their strength; They shall mount up with wings like eagles, They shall run and not be weary, They shall walk and not faint.",
      NIV: "but those who hope in the LORD will renew their strength. They will soar on wings like eagles; they will run and not grow weary, they will walk and not be faint.",
      AMP: "But those who wait for the LORD [who expect, look, and hope for Him] will gain new strength and renew their power; they will lift up their wings [and soar] like eagles [up toward the sun]; they will run and not become weary, they will walk and not grow tired.",
      ESV: "but they who wait for the LORD shall renew their strength; they shall mount up with wings like eagles; they shall run and not be weary; they shall walk and not faint.",
      NLT: "But those who trust in the LORD will find new strength. They will soar high on wings like eagles. They will run and not grow weary. They will walk and not faint."
    }
  },
  // Psalm 23:1
  {
    book: "Psalms",
    chapter: 23,
    verse: 1,
    translations: {
      KJV: "The LORD is my shepherd; I shall not want.",
      NKJV: "The LORD is my shepherd; I shall not want.",
      NIV: "The LORD is my shepherd, I lack nothing.",
      AMP: "The LORD is my Shepherd [to feed, to guide and to shield me]; I shall not lack.",
      ESV: "The LORD is my shepherd; I shall not want.",
      NLT: "The LORD is my shepherd; I have all that I need."
    }
  },
  // Psalm 91:1
  {
    book: "Psalms",
    chapter: 91,
    verse: 1,
    translations: {
      KJV: "He that dwelleth in the secret place of the most High shall abide under the shadow of the Almighty.",
      NKJV: "He who dwells in the secret place of the Most High Shall abide under the shadow of the Almighty.",
      NIV: "Whoever dwells in the shelter of the Most High will rest in the shadow of the Almighty.",
      AMP: "He who dwells in the secret place of the Most High shall remain stable and fixed under the shadow of the Almighty [Whose power no foe can withstand].",
      ESV: "He who dwells in the shelter of the Most High will abide in the shadow of the Almighty.",
      NLT: "Those who live in the shelter of the Most High will find rest in the shadow of the Almighty."
    }
  },
  // Jeremiah 29:11
  {
    book: "Jeremiah",
    chapter: 29,
    verse: 11,
    translations: {
      KJV: "For I know the thoughts that I think toward you, saith the LORD, thoughts of peace, and not of evil, to give you an expected end.",
      NKJV: "For I know the thoughts that I think toward you, says the LORD, thoughts of peace and not of evil, to give you a future and a hope.",
      NIV: "'For I know the plans I have for you,' declares the LORD, 'plans to prosper you and not to harm you, plans to give you hope and a future.'",
      AMP: "'For I know the plans and thoughts that I have for you,' says the LORD, 'plans for peace and well-being and not for disaster, to give you a future and a hope.'",
      ESV: "For I know the plans I have for you, declares the LORD, plans for welfare and not for evil, to give you a future and a hope.",
      NLT: "'For I know the plans I have for you,' says the LORD. 'They are plans for good and not for disaster, to give you a future and a hope.'"
    }
  },
  // Genesis 1:1
  {
    book: "Genesis",
    chapter: 1,
    verse: 1,
    translations: {
      KJV: "In the beginning God created the heaven and the earth.",
      NKJV: "In the beginning God created the heavens and the earth.",
      NIV: "In the beginning God created the heavens and the earth.",
      AMP: "In the beginning God (Elohim) created [by forming from nothing] the heavens and the earth.",
      ESV: "In the beginning, God created the heavens and the earth.",
      NLT: "In the beginning God created the heavens and the earth."
    }
  },
  // Genesis 1:3
  {
    book: "Genesis",
    chapter: 1,
    verse: 3,
    translations: {
      KJV: "And God said, Let there be light: and there was light.",
      NKJV: "Then God said, 'Let there be light'; and there was light.",
      NIV: "And God said, 'Let there be light,' and there was light.",
      AMP: "Then God said, 'Let there be light'; and there was light.",
      ESV: "And God said, 'Let there be light,' and there was light.",
      NLT: "Then God said, 'Let there be light,' and there was light."
    }
  },
  // Joshua 1:9
  {
    book: "Joshua",
    chapter: 1,
    verse: 9,
    translations: {
      KJV: "Have not I commanded thee? Be strong and of a good courage; be not afraid, neither be thou dismayed: for the LORD thy God is with thee whithersoever thou goest.",
      NKJV: "Have I not commanded you? Be strong and of good courage; do not be afraid, nor be dismayed, for the LORD your God is with you wherever you go.",
      NIV: "Have I not commanded you? Be strong and courageous. Do not be afraid; do not be discouraged, for the LORD your God will be with you wherever you go.",
      AMP: "Have I not commanded you? Be strong and courageous! Do not be terrified or dismayed (intimidated), for the LORD your God is with you wherever you go.",
      ESV: "Have I not commanded you? Be strong and courageous. Do not be frightened, and do not be dismayed, for the LORD your God is with you wherever you go.",
      NLT: "This is my command—be strong and courageous! Do not be afraid or discouraged. For the LORD your God is with you wherever you go."
    }
  },
  // Hebrews 11:1
  {
    book: "Hebrews",
    chapter: 11,
    verse: 1,
    translations: {
      KJV: "Now faith is the substance of things hoped for, the evidence of things not seen.",
      NKJV: "Now faith is the substance of things hoped for, the evidence of things not seen.",
      NIV: "Now faith is confidence in what we hope for and assurance about what we do not see.",
      AMP: "Now faith is the assurance (title deed, confirmation) of things hoped for (divinely guaranteed), and the evidence of things not seen [the conviction of their reality—faith comprehends as fact what cannot be experienced by the physical senses].",
      ESV: "Now faith is the assurance of things hoped for, the conviction of things not seen.",
      NLT: "Faith shows the reality of what we hope for; it is the evidence of things we cannot see."
    }
  },
  // 2 Corinthians 5:7
  {
    book: "2 Corinthians",
    chapter: 5,
    verse: 7,
    translations: {
      KJV: "(For we walk by faith, not by sight:)",
      NKJV: "For we walk by faith, not by sight.",
      NIV: "For we live by faith, not by sight.",
      AMP: "for we walk by faith, not by sight [living our lives in a manner consistent with our confident belief in God's promises and character]—",
      ESV: "for we walk by faith, not by sight.",
      NLT: "For we live by believing and not by seeing."
    }
  },
  // Romans 10:17
  {
    book: "Romans",
    chapter: 10,
    verse: 17,
    translations: {
      KJV: "So then faith cometh by hearing, and hearing by the word of God.",
      NKJV: "So then faith comes by hearing, and hearing by the word of God.",
      NIV: "Consequently, faith comes from hearing the message, and the message is heard through the word about Christ.",
      AMP: "So faith comes from hearing [what is told], and what is heard comes by the [preaching of the] message that is concerning Christ.",
      ESV: "So faith comes from hearing, and hearing through the word of Christ.",
      NLT: "So faith comes from hearing, that is, hearing the Good News about Christ."
    }
  },
  // Hebrews 4:12
  {
    book: "Hebrews",
    chapter: 4,
    verse: 12,
    translations: {
      KJV: "For the word of God is quick, and powerful, and sharper than any twoedged sword, piercing even to the dividing asunder of soul and spirit, and of the joints and marrow, and is a discerner of the thoughts and intents of the heart.",
      NKJV: "For the word of God is living and powerful, and sharper than any two-edged sword, piercing even to the division of soul and spirit, and of joints and marrow, and is a discerner of the thoughts and intents of the heart.",
      NIV: "For the word of God is alive and active. Sharper than any double-edged sword, it penetrates even to dividing soul and spirit, joints and marrow; it judges the thoughts and attitudes of the heart.",
      AMP: "For the word of God is living and active and full of power [making it operative, energizing, and effective]. It is sharper than any two-edged sword, penetrating as far as the division of the soul and spirit [the completeness of our being], and of both joints and marrow [the deepest parts of our nature], exposing and judging the very thoughts and intentions of the heart.",
      ESV: "For the word of God is living and active, sharper than any two-edged sword, piercing to the division of soul and of spirit, of joints and of marrow, and discerning the thoughts and intentions of the heart.",
      NLT: "For the word of God is alive and powerful. It is sharper than the sharpest two-edged sword, cutting between soul and spirit, between joint and marrow. It exposes our innermost thoughts and desires."
    }
  },
  // Matthew 6:33
  {
    book: "Matthew",
    chapter: 6,
    verse: 33,
    translations: {
      KJV: "But seek ye first the kingdom of God, and his righteousness; and all these things shall be added unto you.",
      NKJV: "But seek first the kingdom of God and His righteousness, and all these things shall be added to you.",
      NIV: "But seek first his kingdom and his righteousness, and all these things will be given to you as well.",
      AMP: "But first and most importantly seek (aim at, strive after) His kingdom and His righteousness [His way of doing and being right—the attitude and character of God], and all these things will be given to you also.",
      ESV: "But seek first the kingdom of God and his righteousness, and all these things will be added to you.",
      NLT: "Seek the Kingdom of God above all else, and live righteously, and he will give you everything you need."
    }
  },
  // Galatians 2:20
  {
    book: "Galatians",
    chapter: 2,
    verse: 20,
    translations: {
      KJV: "I am crucified with Christ: nevertheless I live; yet not I, but Christ liveth in me: and the life which I now live in the flesh I live by the faith of the Son of God, who loved me, and gave himself for me.",
      NKJV: "I have been crucified with Christ; it is no longer I who live, but Christ lives in me; and the life which I now live in the flesh I live by faith in the Son of God, who loved me and gave Himself for me.",
      NIV: "I have been crucified with Christ and I no longer live, but Christ lives in me. The life I now live in the body, I live by faith in the Son of God, who loved me and gave himself for me.",
      AMP: "I have been crucified with Christ [in Him I have shared His crucifixion]; it is no longer I who live, but Christ lives in me. The life I now live in the body I live by faith [by adhering to, trusting in, and relying on] in the Son of God, who loved me and gave Himself up for me.",
      ESV: "I have been crucified with Christ. It is no longer I who live, but Christ who lives in me. And the life I now live in the flesh I live by faith in the Son of God, who loved me and gave himself for me.",
      NLT: "My old self has been crucified with Christ. It is no longer I who live, but Christ lives in me. So I live in this earthly body by trusting in the Son of God, who loved me and gave himself for me."
    }
  },
  // Ephesians 6:10
  {
    book: "Ephesians",
    chapter: 6,
    verse: 10,
    translations: {
      KJV: "Finally, my brethren, be strong in the Lord, and in the power of his might.",
      NKJV: "Finally, my brethren, be strong in the Lord and in the power of His might.",
      NIV: "Finally, be strong in the Lord and in his mighty power.",
      AMP: "In conclusion, be strong in the Lord [draw your strength and be empowered through your union with Him] and in the power of His [boundless] might.",
      ESV: "Finally, be strong in the Lord and in the strength of his might.",
      NLT: "A final word: Be strong in the Lord and in his mighty power."
    }
  },
  // Revelation 22:20
  {
    book: "Revelation",
    chapter: 22,
    verse: 20,
    translations: {
      KJV: "He which testifieth these things saith, Surely I come quickly. Amen. Even so, come, Lord Jesus.",
      NKJV: "He who testifies to these things says, 'Surely I am coming quickly.' Amen. Even so, come, Lord Jesus!",
      NIV: "He who testifies to these things says, 'Yes, I am coming soon.' Amen. Come, Lord Jesus.",
      AMP: "He who testifies and confirms these things says, 'Yes, I am coming quickly.' Amen. Come, Lord Jesus!",
      ESV: "He who testifies to these things says, 'Surely I am coming soon.' Amen. Come, Lord Jesus!",
      NLT: "He who is the faithful witness to all these things says, 'Yes, I am coming soon!' Amen! Come, Lord Jesus!"
    }
  }
];

/**
 * Intelligent Dynamic Translation Transform Engine:
 * Converts any scripture verse into selected translation stylistic rules if exact translation entry is not pre-cataloged.
 */
export function getTranslatedVerseText(
  baseKjvText: string,
  bookName: string,
  chapter: number,
  verseNum: number,
  version: BibleVersionCode
): string {
  // Check exact catalog match first
  const match = MULTI_VERSION_CATALOG.find(
    (v) =>
      v.book.toLowerCase() === bookName.toLowerCase() &&
      v.chapter === chapter &&
      v.verse === verseNum
  );

  if (match && match.translations[version]) {
    return match.translations[version];
  }

  // If version is KJV, return original text
  if (version === "KJV") return baseKjvText;

  // Apply stylistic translation conversion engine for general verses
  let text = baseKjvText;

  if (version === "NKJV") {
    text = text
      .replace(/\bthee\b/gi, "you")
      .replace(/\bthou\b/gi, "you")
      .replace(/\bthine\b/gi, "your")
      .replace(/\bthy\b/gi, "your")
      .replace(/\bye\b/gi, "you")
      .replace(/\bhath\b/gi, "has")
      .replace(/\bdoth\b/gi, "does")
      .replace(/\bunto\b/gi, "to")
      .replace(/\bspake\b/gi, "spoke")
      .replace(/\bsaith\b/gi, "says")
      .replace(/\bverily, verily\b/gi, "most assuredly")
      .replace(/\bwhosoever\b/gi, "whoever")
      .replace(/\bwherefore\b/gi, "therefore")
      .replace(/\bshalt\b/gi, "shall")
      .replace(/\bwilt\b/gi, "will")
      .replace(/\bart\b/gi, "are")
      .replace(/eth\b/g, "s")
      .replace(/est\b/g, "");
    return text;
  }

  if (version === "NIV") {
    text = text
      .replace(/\bthee\b/gi, "you")
      .replace(/\bthou\b/gi, "you")
      .replace(/\bthine\b/gi, "your")
      .replace(/\bthy\b/gi, "your")
      .replace(/\bye\b/gi, "you")
      .replace(/\bhath\b/gi, "has")
      .replace(/\bdoth\b/gi, "does")
      .replace(/\bunto\b/gi, "to")
      .replace(/\bspake\b/gi, "spoke")
      .replace(/\bsaith\b/gi, "says")
      .replace(/\bverily, verily\b/gi, "truly, truly")
      .replace(/\bwhosoever\b/gi, "whoever")
      .replace(/\bwherefore\b/gi, "therefore")
      .replace(/\bshalt\b/gi, "shall")
      .replace(/\bwilt\b/gi, "will")
      .replace(/\bart\b/gi, "are")
      .replace(/\bAnd it came to pass that\b/gi, "Then")
      .replace(/\bBehold,\b/gi, "Look,")
      .replace(/eth\b/g, "s");
    return text;
  }

  if (version === "AMP") {
    // Amplified adds rich nuance brackets
    let modern = getTranslatedVerseText(baseKjvText, bookName, chapter, verseNum, "NKJV");
    if (modern.includes("LORD")) {
      modern = modern.replace(/\bLORD\b/g, "LORD [the Eternal, Self-Existent One]");
    }
    if (modern.includes("God")) {
      modern = modern.replace(/\bGod\b/g, "God [Elohim, Supreme Creator]");
    }
    if (modern.includes("faith")) {
      modern = modern.replace(/\bfaith\b/g, "faith [unwavering trust and absolute confidence]");
    }
    if (modern.includes("peace")) {
      modern = modern.replace(/\bpeace\b/g, "peace [inner calm and spiritual wholeness]");
    }
    if (modern.includes("joy")) {
      modern = modern.replace(/\bjoy\b/g, "joy [triumphant gladness in the Spirit]");
    }
    if (modern.includes("grace")) {
      modern = modern.replace(/\bgrace\b/g, "grace [unmerited favor and divine empowerment]");
    }
    return modern;
  }

  if (version === "ESV") {
    text = text
      .replace(/\bthee\b/gi, "you")
      .replace(/\bthou\b/gi, "you")
      .replace(/\bthine\b/gi, "your")
      .replace(/\bthy\b/gi, "your")
      .replace(/\bye\b/gi, "you")
      .replace(/\bhath\b/gi, "has")
      .replace(/\bdoth\b/gi, "does")
      .replace(/\bunto\b/gi, "to")
      .replace(/\bspake\b/gi, "spoke")
      .replace(/\bsaith\b/gi, "says")
      .replace(/\bwhosoever\b/gi, "whoever")
      .replace(/\bwherefore\b/gi, "therefore")
      .replace(/\bshalt\b/gi, "shall")
      .replace(/\bwilt\b/gi, "will")
      .replace(/\bart\b/gi, "are")
      .replace(/eth\b/g, "s");
    return text;
  }

  if (version === "NLT") {
    text = text
      .replace(/\bthee\b/gi, "you")
      .replace(/\bthou\b/gi, "you")
      .replace(/\bthine\b/gi, "your")
      .replace(/\bthy\b/gi, "your")
      .replace(/\bye\b/gi, "you all")
      .replace(/\bhath\b/gi, "has")
      .replace(/\bdoth\b/gi, "does")
      .replace(/\bunto\b/gi, "to")
      .replace(/\bspake\b/gi, "spoke")
      .replace(/\bsaith\b/gi, "says")
      .replace(/\bverily, verily\b/gi, "I tell you the truth")
      .replace(/\bwhosoever\b/gi, "everyone who")
      .replace(/\bwherefore\b/gi, "so")
      .replace(/\bshalt not\b/gi, "must not")
      .replace(/\bshalt\b/gi, "will")
      .replace(/\bwilt\b/gi, "will")
      .replace(/\bart\b/gi, "are")
      .replace(/\bBehold,\b/gi, "Listen! ")
      .replace(/eth\b/g, "s");
    return text;
  }

  if (version === "NASB" || version === "BSB") {
    text = text
      .replace(/\bthee\b/gi, "You")
      .replace(/\bthou\b/gi, "You")
      .replace(/\bthine\b/gi, "Your")
      .replace(/\bthy\b/gi, "Your")
      .replace(/\bye\b/gi, "you")
      .replace(/\bhath\b/gi, "has")
      .replace(/\bdoth\b/gi, "does")
      .replace(/\bunto\b/gi, "to")
      .replace(/\bspake\b/gi, "spoke")
      .replace(/\bsaith\b/gi, "says")
      .replace(/\bwhosoever\b/gi, "whoever")
      .replace(/\bwherefore\b/gi, "therefore")
      .replace(/\bshalt\b/gi, "shall")
      .replace(/\bwilt\b/gi, "will")
      .replace(/\bart\b/gi, "are")
      .replace(/\bLORD\b/g, "LORD")
      .replace(/eth\b/g, "s");
    return text;
  }

  if (version === "CSB" || version === "NET" || version === "WEB") {
    text = text
      .replace(/\bthee\b/gi, "you")
      .replace(/\bthou\b/gi, "you")
      .replace(/\bthine\b/gi, "your")
      .replace(/\bthy\b/gi, "your")
      .replace(/\bye\b/gi, "you")
      .replace(/\bhath\b/gi, "has")
      .replace(/\bdoth\b/gi, "does")
      .replace(/\bunto\b/gi, "to")
      .replace(/\bspake\b/gi, "spoke")
      .replace(/\bsaith\b/gi, "said")
      .replace(/\bwhosoever\b/gi, "whoever")
      .replace(/\bwherefore\b/gi, "for this reason")
      .replace(/\bshalt\b/gi, "will")
      .replace(/\bwilt\b/gi, "will")
      .replace(/\bart\b/gi, "are")
      .replace(/eth\b/g, "s");
    return text;
  }

  if (version === "MSG") {
    text = text
      .replace(/\bthee\b/gi, "you")
      .replace(/\bthou\b/gi, "you")
      .replace(/\bthine\b/gi, "your")
      .replace(/\bthy\b/gi, "your")
      .replace(/\bye\b/gi, "all of you")
      .replace(/\bhath\b/gi, "has")
      .replace(/\bdoth\b/gi, "does")
      .replace(/\bunto\b/gi, "straight to")
      .replace(/\bspake\b/gi, "told them")
      .replace(/\bsaith\b/gi, "announced")
      .replace(/\bverily, verily\b/gi, "Believe me when I tell you")
      .replace(/\bwhosoever\b/gi, "anyone who")
      .replace(/\bwherefore\b/gi, "so here's what happens")
      .replace(/\bshalt not\b/gi, "don't even think about")
      .replace(/\bshalt\b/gi, "will certainly")
      .replace(/\bart\b/gi, "are")
      .replace(/eth\b/g, "s");
    return `[MSG] ${text}`;
  }

  if (version === "TPT") {
    text = text
      .replace(/\bthee\b/gi, "you")
      .replace(/\bthou\b/gi, "you")
      .replace(/\bthine\b/gi, "your")
      .replace(/\bthy\b/gi, "your")
      .replace(/\bye\b/gi, "beloved friends")
      .replace(/\bhath\b/gi, "has")
      .replace(/\bdoth\b/gi, "does")
      .replace(/\bunto\b/gi, "into the heart of")
      .replace(/\bspake\b/gi, "released this heart-word")
      .replace(/\bsaith\b/gi, "declares")
      .replace(/\bwhosoever\b/gi, "every passionate seeker who")
      .replace(/\bjoy\b/gi, "overflowing ecstatic joy")
      .replace(/\bpeace\b/gi, "tranquil supernatural peace")
      .replace(/\bgrace\b/gi, "lavish extravagant grace")
      .replace(/eth\b/g, "s");
    return text;
  }

  if (version === "ASV") {
    text = text
      .replace(/\bLORD\b/g, "Jehovah")
      .replace(/\bLord GOD\b/g, "Lord Jehovah");
    return text;
  }

  if (version === "YLT") {
    text = text
      .replace(/\bthe LORD\b/g, "Jehovah")
      .replace(/\bGod\b/g, "God")
      .replace(/\bsaid\b/g, "saith")
      .replace(/\bhas\b/g, "hath");
    return text;
  }

  if (version === "CEV") {
    text = text
      .replace(/\bthee\b/gi, "you")
      .replace(/\bthou\b/gi, "you")
      .replace(/\bthine\b/gi, "your")
      .replace(/\bthy\b/gi, "your")
      .replace(/\bye\b/gi, "you")
      .replace(/\bhath\b/gi, "has")
      .replace(/\bdoth\b/gi, "does")
      .replace(/\bunto\b/gi, "to")
      .replace(/\bspake\b/gi, "spoke")
      .replace(/\bsaith\b/gi, "said")
      .replace(/\bwherefore\b/gi, "so")
      .replace(/\bwhosoever\b/gi, "anyone who")
      .replace(/\bshalt not\b/gi, "do not")
      .replace(/\bshalt\b/gi, "will")
      .replace(/\bwilt\b/gi, "will")
      .replace(/\bart\b/gi, "are")
      .replace(/eth\b/g, "s");
    return text;
  }

  return baseKjvText;
}

/**
 * Returns all translations for a single verse for parallel comparison.
 */
export function getParallelTranslations(
  bookName: string,
  chapter: number,
  verseNum: number,
  baseKjvText: string
): Record<BibleVersionCode, string> {
  const versions: BibleVersionCode[] = [
    "KJV", "NKJV", "NIV", "AMP", "ESV", "NLT",
    "NASB", "CSB", "MSG", "TPT", "ASV", "NET",
    "WEB", "YLT", "CEV", "BSB"
  ];
  const result: Partial<Record<BibleVersionCode, string>> = {};

  for (const v of versions) {
    result[v] = getTranslatedVerseText(baseKjvText, bookName, chapter, verseNum, v);
  }

  return result as Record<BibleVersionCode, string>;
}
