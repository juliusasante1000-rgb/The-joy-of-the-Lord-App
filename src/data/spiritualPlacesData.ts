import { SpiritualPlace, PlaceScripture } from "../types";
import { ADDITIONAL_50_SPIRITUAL_PLACES } from "./additionalSpiritualPlaces";
import { ADDITIONAL_SPIRITUAL_PLACES_PART2 } from "./additionalSpiritualPlacesPart2";
import { generate400ScripturalPlaces } from "./spiritualPlacesExpandedCatalog";
import { MASTER_500_SPIRITUAL_PLACES } from "./spiritualPlaces500Catalog";

const DEFAULT_SPIRITUAL_PLACES_BASE: SpiritualPlace[] = [
  {
    id: "brook-cherith",
    name: "Brook Cherith",
    subtitle: "A Place of Rest, Provision & Renewal",
    icon: "🌿",
    spiritualMeaning: "A secluded sanctuary where God provides, sustains, hides, and prepares His servants in secret before public ministry.",
    description: "When the land was stricken with drought, God directed Elijah to the quiet brook of Cherith, commanding ravens to feed him bread and meat morning and evening, and the brook to quench his thirst, teaching us that in seasons of drought, hiddenness, and transition, God's supernatural supply never fails those who follow His voice.",
    biblicalReference: "1 Kings 17:2–6",
    themes: ["Rest", "Renewal", "God's Provision", "Trusting God", "Waiting", "Solitude", "Quiet Seasons", "Dependence on God"],
    scriptureCountDisplay: "500+ Scriptures",
    isPublished: true,
    isFeatured: true,
    displayOrder: 1,
    colorGradient: "from-emerald-800 via-teal-900 to-slate-900",
    badgeText: "Rest & Provision",
    historicalContext: "The Wadi al-Yabis (east of the Jordan River), a secluded ravine providing hidden sanctuary and sustenance during a severe national drought."
  },
  {
    id: "upper-room",
    name: "Upper Room",
    subtitle: "Place of Prayer, Unity & Holy Spirit Encounter",
    icon: "🔥",
    spiritualMeaning: "A consecrated sanctuary of persistent intercession, corporate unity, and celestial empowerment through the Holy Ghost.",
    description: "The disciples, together with the women and Mary the mother of Jesus, continued with one accord in persistent prayer and unity until the Day of Pentecost was fully come, releasing the sound of a rushing mighty wind, tongues of holy fire, and divine power to evangelize the nations.",
    biblicalReference: "Acts 1:13–14; Acts 2:1–4",
    themes: ["Holy Spirit", "Prayer", "Waiting on God", "Spiritual Empowerment", "Unity", "Worship", "Pentecost", "Spiritual Gifts", "Divine Presence"],
    scriptureCountDisplay: "500+ Scriptures",
    isPublished: true,
    isFeatured: true,
    displayOrder: 2,
    colorGradient: "from-amber-700 via-rose-900 to-[#16235A]",
    badgeText: "Pentecost & Power",
    historicalContext: "An elevated second-story chamber in Jerusalem where Jesus washed disciples' feet, instituted the Lord's Supper, and where the early Church tarried for the Promise of the Father."
  },
  {
    id: "peniel",
    name: "Peniel",
    subtitle: "Place of Encounter & Transformation",
    icon: "✨",
    spiritualMeaning: "The wrestling ground where human striving surrenders, face-to-face communion with God occurs, and one's destiny and name are forever transformed.",
    description: "Jacob wrestled with the angel of the Lord until the breaking of day, refusing to let go until he was blessed. There his striving surrendered to grace, his name was changed from Jacob (Supplanter) to Israel (Prince with God), and he declared, 'I have seen God face to face, and my life is preserved.'",
    biblicalReference: "Genesis 32:24–30",
    themes: ["Encounter with God", "Transformation", "Wrestling in Faith", "Breakthrough", "Surrender", "Identity", "Personal Deliverance", "Seeking God's Face"],
    scriptureCountDisplay: "500+ Scriptures",
    isPublished: true,
    isFeatured: true,
    displayOrder: 3,
    colorGradient: "from-purple-900 via-indigo-950 to-slate-900",
    badgeText: "Face to Face",
    historicalContext: "East of the Jordan River near the Jabbok stream, where Jacob had a nocturnal encounter with God and named the site Peniel ('Face of God')."
  },
  {
    id: "cave-of-adullam",
    name: "Cave of Adullam",
    subtitle: "Place of Preparation & Making of Mighty Men",
    icon: "🛡️",
    spiritualMeaning: "A rugged refuge where broken, distressed, and indebted souls are forged through hardship, brotherhood, and discipline into victorious spiritual leaders.",
    description: "David fled to the cave of Adullam while pursued by Saul; everyone in distress, in debt, and discontented gathered unto him. In that subterranean refuge, God forged them from outcasts into mighty warriors who conquered giants and established the Kingdom.",
    biblicalReference: "1 Samuel 22:1–2; 2 Samuel 23:13–17",
    themes: ["Preparation", "Leadership", "Character", "Courage", "Discipleship", "Trials", "Brotherhood", "God Using the Broken", "Kingdom Greatness"],
    scriptureCountDisplay: "500+ Scriptures",
    isPublished: true,
    isFeatured: true,
    displayOrder: 4,
    colorGradient: "from-amber-900 via-stone-900 to-slate-950",
    badgeText: "Mighty Men",
    historicalContext: "A network of subterranean limestone caves in the Shephelah lowlands of Judah, providing David tactical hiding and a forge for future rulers of Israel."
  },
  {
    id: "fair-havens",
    name: "Fair Havens",
    subtitle: "A Place of Passage, Direction & Trusting God",
    icon: "🌊",
    spiritualMeaning: "A devotional picture of waiting in transition, making spirit-led decisions, and anchoring your faith when contrary winds delay your voyage.",
    description: "A sheltered harbor on the southern coast of Crete where Paul and the ship's crew sought refuge from tempestuous headwinds. It stands as a timeless reminder that when the storms of life delay our voyage, God remains our steadfast anchor and provides divine direction for the next step.",
    biblicalReference: "Acts 27:8–10",
    themes: ["Transition", "Journey", "Direction", "Decisions", "God's Guidance", "Waiting", "Uncertainty", "Trusting God's Timing", "Perseverance"],
    scriptureCountDisplay: "500+ Scriptures",
    isPublished: true,
    isFeatured: true,
    displayOrder: 5,
    colorGradient: "from-cyan-900 via-blue-950 to-slate-900",
    badgeText: "Journey & Guidance",
    historicalContext: "A small, protected bay (modern Kaloi Limenes) along the southern shore of Crete that offered temporary refuge from northwesterly Mediterranean gales."
  },
  {
    id: "wilderness",
    name: "The Wilderness",
    subtitle: "Place of Testing, Dependence & Preparation",
    icon: "🏜️",
    spiritualMeaning: "The arid proving ground where God strips away human crutches, humbles the soul, reveals His supernatural manna, and strengthens spiritual authority.",
    description: "From Moses tending sheep in Midian, to Israel traveling forty years under the pillar of cloud and fire, to Jesus fasting forty days in the Judean desert before starting His ministry, the wilderness is the divine school where God proves our hearts and imparts spiritual authority.",
    biblicalReference: "Deuteronomy 8:2–3; Matthew 4:1–11",
    themes: ["Testing", "Trials", "Dependence on God", "Preparation", "Obedience", "Supernatural Provision", "Spiritual Growth", "Overcoming Temptation"],
    scriptureCountDisplay: "500+ Scriptures",
    isPublished: true,
    isFeatured: true,
    displayOrder: 6,
    colorGradient: "from-amber-950 via-yellow-950 to-stone-950",
    badgeText: "Testing & Faith",
    historicalContext: "The vast arid stretches between Egypt, Sinai, and the Jordan where God led Israel with a pillar of cloud and fire for forty years."
  },
  {
    id: "mount-carmel",
    name: "Mount Carmel",
    subtitle: "Place of Decision, Faith & Demonstration of God's Power",
    icon: "⚡",
    spiritualMeaning: "The mountaintop where false idols are exposed, compromises are rejected, and the consuming fire of the Living God answers earnest, bold prayer.",
    description: "Elijah stood alone before the 450 prophets of Baal, rebuilt the ruined altar of the Lord with twelve stones, and prayed with unwavering faith until the fire of the Lord fell from heaven, consumed the sacrifice, and turned the heart of the nation back to God.",
    biblicalReference: "1 Kings 18:20–39",
    themes: ["Faith", "Decision", "Spiritual Boldness", "God's Power", "Standing for Truth", "Consuming Fire", "Rejecting Compromise", "Revival"],
    scriptureCountDisplay: "500+ Scriptures",
    isPublished: true,
    isFeatured: true,
    displayOrder: 7,
    colorGradient: "from-rose-950 via-orange-950 to-[#16235A]",
    badgeText: "Fire & Decision",
    historicalContext: "A coastal mountain range overlooking the Mediterranean and the Jezreel Valley, long renowned for lush vegetation and historic prophetic showdowns."
  },
  {
    id: "gethsemane",
    name: "Gethsemane",
    subtitle: "Place of Surrender, Prayer & Obedience",
    icon: "🙏",
    spiritualMeaning: "The oil press of deep agony where self-will is surrendered to the Father's sovereign purpose: 'Not my will, but Thine, be done.'",
    description: "In the shadow of the ancient olive trees, Jesus knelt in deep anguish of soul, sweating drops like great drops of blood, and willingly yielded His human will to the Father's eternal plan of redemption, demonstrating that ultimate victory begins on our knees in surrender.",
    biblicalReference: "Matthew 26:36–46; Luke 22:39–46",
    themes: ["Surrender", "Prayer", "Obedience", "God's Will", "Sacrifice", "Strength in Suffering", "Submission", "Spiritual Victory"],
    scriptureCountDisplay: "500+ Scriptures",
    isPublished: true,
    isFeatured: true,
    displayOrder: 8,
    colorGradient: "from-emerald-950 via-slate-900 to-[#16235A]",
    badgeText: "Surrender & Will",
    historicalContext: "An olive garden at the base of the Mount of Olives across the Kidron Valley, whose name literally translates to 'oil press'."
  },
  {
    id: "bethlehem",
    name: "Bethlehem",
    subtitle: "Place of Promise, Birth & New Beginnings",
    icon: "🌅",
    spiritualMeaning: "The humble birthplace where ancient prophetic promises materialize into physical reality, proving that God exalts the lowly and keeps every covenant.",
    description: "Though small and overlooked among the clans of Judah, Bethlehem became the cradle of history where the Bread of Life was born in a manger, fulfilling centuries of prophecy and proving that God chooses what is humble to bring forth His greatest works.",
    biblicalReference: "Micah 5:2; Luke 2:1–20",
    themes: ["New Beginnings", "Promise", "God's Faithfulness", "Humility", "Prophecy Fulfilled", "Hope", "Incarnation", "Unexpected Favor"],
    scriptureCountDisplay: "500+ Scriptures",
    isPublished: true,
    isFeatured: true,
    displayOrder: 9,
    colorGradient: "from-amber-600 via-indigo-950 to-[#16235A]",
    badgeText: "Promise & Birth",
    historicalContext: "A pastoral town six miles south of Jerusalem, the ancestral home of King David and birthplace of our Lord Jesus Christ ('House of Bread')."
  },
  {
    id: "jericho",
    name: "Jericho",
    subtitle: "Place of Breakthrough & Victory",
    icon: "🏆",
    spiritualMeaning: "The place where towering, impenetrable obstacles collapse not through carnal weapons, but through joyful praise, patient obedience, and the shout of faith.",
    description: "When the children of Israel faced the impenetrable double walls of Jericho, they marched in obedience for seven days behind the Ark of the Covenant; at the blast of the rams' horns and the united shout of faith, the mighty walls crashed down flat before them.",
    biblicalReference: "Joshua 6:1–20; Hebrews 11:30",
    themes: ["Victory", "Breakthrough", "Faith", "Obedience", "Persistence", "Walls Falling", "God's Power", "The Shout of Praise"],
    scriptureCountDisplay: "500+ Scriptures",
    isPublished: true,
    isFeatured: true,
    displayOrder: 10,
    colorGradient: "from-yellow-700 via-amber-900 to-stone-950",
    badgeText: "Walls Falling",
    historicalContext: "One of the oldest continuously inhabited fortified cities in the Jordan Valley, guarded by double stone walls deemed humanly unassailable."
  },
  {
    id: "bethany",
    name: "Bethany",
    subtitle: "Place of Friendship, Fellowship & God's Presence",
    icon: "❤️",
    spiritualMeaning: "A welcoming sanctuary of intimate communion, unrestrained worship, sacrificial anointing, and resurrection life at Jesus' feet.",
    description: "In the welcoming home of Mary, Martha, and Lazarus, Jesus found genuine rest and fellowship; here Mary broke her costly alabaster flask to anoint His feet, and from this town Jesus spoke the words of life that raised Lazarus from four days in the tomb.",
    biblicalReference: "Luke 10:38–42; John 11:1–44; John 12:1–3",
    themes: ["Friendship", "Fellowship", "Hospitality", "Intimacy with Christ", "Worship", "Family", "Resurrection Hope", "Service"],
    scriptureCountDisplay: "500+ Scriptures",
    isPublished: true,
    isFeatured: false,
    displayOrder: 11,
    colorGradient: "from-rose-900 via-purple-950 to-[#16235A]",
    badgeText: "Fellowship & Love",
    historicalContext: "A tranquil village on the eastern slope of the Mount of Olives, just under two miles from Jerusalem, serving as Jesus' beloved resting place."
  },
  {
    id: "mount-zion",
    name: "Mount Zion",
    subtitle: "Place of God's Presence, Worship & Hope",
    icon: "🏔️",
    spiritualMeaning: "The unshakable mountain of God's sovereign dwelling, holiness, perpetual praise, and the eternal security of the redeemed.",
    description: "Mount Zion stands as the unshakable dwelling place of the Living God, representing heavenly joy, continuous praise, and the eternal security of believers who can never be moved because the Lord surrounds His people as the mountains surround Jerusalem.",
    biblicalReference: "Psalm 125:1–2; Hebrews 12:22–24",
    themes: ["God's Presence", "Worship", "Holiness", "Kingdom Security", "Hope", "Praise", "Eternal Kingdom", "Heavenly Jerusalem"],
    scriptureCountDisplay: "500+ Scriptures",
    isPublished: true,
    isFeatured: false,
    displayOrder: 12,
    colorGradient: "from-blue-900 via-indigo-950 to-[#16235A]",
    badgeText: "Unshakeable Zion",
    historicalContext: "The historic hill in Jerusalem where David placed the Ark of the Covenant, later symbolizing the eternal throne of God and the New Jerusalem."
  },
  {
    id: "the-valley",
    name: "The Valley",
    subtitle: "Place of God's Presence in Difficult Seasons",
    icon: "🌿",
    spiritualMeaning: "The low, shadowed season where fear is conquered by the Shepherd's rod and staff, and dry bones are quickened into an exceeding great army.",
    description: "Though the valley feels dark, lonely, and shrouded in shadows of uncertainty, the Good Shepherd walks alongside us with His comforting rod and staff, assuring us that valleys are never our final resting place but the pathway to tables of overflowing blessing.",
    biblicalReference: "Psalm 23:4; Ezekiel 37:1–10",
    themes: ["Difficult Circumstances", "Conquering Fear", "God's Protection", "Comfort in Shadows", "Restoration", "Deliverance", "Resurrection Power"],
    scriptureCountDisplay: "500+ Scriptures",
    isPublished: true,
    isFeatured: false,
    displayOrder: 13,
    colorGradient: "from-emerald-950 via-slate-900 to-stone-900",
    badgeText: "Shadow to Light",
    historicalContext: "The deep, steep ravines of the Judean wilderness where wandering sheep faced predators and flash floods, relying wholly on their shepherd's guidance."
  },
  {
    id: "house-of-prayer",
    name: "House of Prayer",
    subtitle: "Place of Intercession & Communion with God",
    icon: "🏛️",
    spiritualMeaning: "A consecrated house for all nations where petitions ascend like sweet incense, chains are broken, and the heart of the Father is unveiled.",
    description: "Dedicated by Solomon in reverence and reaffirmed by Christ in holiness, the House of Prayer is a sanctuary where humble believers align their hearts with Heaven, intercede for nations, and see generational breakthroughs released through earnest petition.",
    biblicalReference: "Isaiah 56:7; Matthew 21:13",
    themes: ["Prayer", "Intercession", "Thanksgiving", "Worship", "Petition", "Seeking God", "Spiritual Communion", "Persistent Faith"],
    scriptureCountDisplay: "500+ Scriptures",
    isPublished: true,
    isFeatured: false,
    displayOrder: 14,
    colorGradient: "from-purple-950 via-indigo-900 to-[#16235A]",
    badgeText: "Intercession",
    historicalContext: "The courts of the Lord's Temple in Jerusalem, ordained as an open threshold of divine communion for all nations and tribes."
  },
  {
    id: "emmaus",
    name: "Emmaus",
    subtitle: "Place of Revelation & Understanding",
    icon: "📖",
    spiritualMeaning: "The journey where discouragement is transformed by the living Word, eyes of understanding are opened, and hearts burn with holy fire.",
    description: "While two heavy-hearted disciples walked seven miles discussing their sorrow, the Risen Christ drew near, unlocked the Scriptures concerning Himself, and as He broke bread, their spiritual eyes were opened and their hearts burned with renewed passion and faith.",
    biblicalReference: "Luke 24:13–35",
    themes: ["Understanding Scripture", "Divine Revelation", "Recognizing Christ", "Spiritual Illumination", "Hope Restored", "Burning Hearts", "Word of God"],
    scriptureCountDisplay: "500+ Scriptures",
    isPublished: true,
    isFeatured: false,
    displayOrder: 15,
    colorGradient: "from-amber-900 via-rose-950 to-[#16235A]",
    badgeText: "Burning Hearts",
    historicalContext: "A village seven miles northwest of Jerusalem along a pastoral highway where the Risen Jesus conducted history's greatest Bible exposition."
  },
  {
    id: "bethel",
    name: "Bethel",
    subtitle: "Place of Encounter, Worship & Remembering God's Faithfulness",
    icon: "🪜",
    spiritualMeaning: "The gate of heaven where God reveals His covenant promises, angels ascend and descend, and stones of trial become pillars of thanksgiving.",
    description: "As Jacob slept with his head on a stone in a lonely field, the heavens opened above him in a dream of angels ascending and descending; awaking in awe, he anointed the stone with oil, declared it the House of God, and received the unbroken covenant of Abraham.",
    biblicalReference: "Genesis 28:10–22; Genesis 35:1–15",
    themes: ["Encounter", "Worship", "God's Promises", "Gate of Heaven", "Remembering God's Faithfulness", "Covenants", "Milestones", "Returning to God"],
    scriptureCountDisplay: "500+ Scriptures",
    isPublished: true,
    isFeatured: false,
    displayOrder: 16,
    colorGradient: "from-sky-950 via-indigo-950 to-[#16235A]",
    badgeText: "Gate of Heaven",
    historicalContext: "Originally Luz, an ancient sanctuary town north of Jerusalem where both Abraham and Jacob erected altars to worship the Almighty."
  },
  {
    id: "nazareth",
    name: "Nazareth",
    subtitle: "Place of Quiet Preparation & Hidden Growth",
    icon: "🔨",
    spiritualMeaning: "The hidden years where character is forged in quiet obedience, manual labor, and favor with God and man before the public season.",
    description: "In the quiet hills of Nazareth, Jesus spent nearly thirty years in humble craftsmanship, growing in wisdom, stature, and favor with God and man, demonstrating that uncelebrated seasons of private faithfulness lay the bedrock for public kingdom authority.",
    biblicalReference: "Luke 2:51–52; Luke 4:16",
    themes: ["Hidden Preparation", "Obedience", "Humility", "Quiet Faithfulness", "Daily Labor", "Spiritual Growth", "Favor with God"],
    scriptureCountDisplay: "500+ Scriptures",
    isPublished: true,
    isFeatured: false,
    displayOrder: 17,
    colorGradient: "from-stone-900 via-amber-950 to-slate-900",
    badgeText: "Quiet Preparation",
    historicalContext: "A small hill town in lower Galilee where Jesus spent nearly thirty years of His earthly life in quiet craftsmanship before His public baptism."
  },
  {
    id: "galilee",
    name: "Galilee",
    subtitle: "Place of Calling, Commission & Ministry",
    icon: "⛵",
    spiritualMeaning: "The shoreline where ordinary fishermen are summoned to become fishers of men, miracles abound, and the Great Commission is delivered.",
    description: "Along the shores of the Sea of Galilee, Jesus called ordinary fishermen to leave their nets and follow Him, walked on stormy waters, healed multitudes of sick, and after His resurrection commissioned His disciples to carry the gospel to the ends of the earth.",
    biblicalReference: "Matthew 4:18–22; Matthew 28:16–20",
    themes: ["Calling", "Commission", "Miracles", "Evangelism", "Discipleship", "Authority", "Walking on Water", "Great Commission"],
    scriptureCountDisplay: "500+ Scriptures",
    isPublished: true,
    isFeatured: false,
    displayOrder: 18,
    colorGradient: "from-blue-950 via-teal-950 to-slate-900",
    badgeText: "Calling & Power",
    historicalContext: "A freshwater lake in northern Israel surrounded by green hills, the central hub of Jesus' miraculous preaching and disciple training."
  },
  {
    id: "mount-of-olives",
    name: "Mount of Olives",
    subtitle: "Place of Prayer, Ascension & Blessed Hope",
    icon: "🕊️",
    spiritualMeaning: "The summit of constant intercession, prophetic revelation, ascension into glory, and the blessed promise of Christ's return.",
    description: "The sacred ridge overlooking Jerusalem where Jesus wept over the holy city, taught the mysteries of the end times, ascended bodily into heaven amidst clouds of glory, and where Scripture promises His feet will stand when He returns in triumph.",
    biblicalReference: "Acts 1:9–12; Luke 24:50–53; Zechariah 14:4",
    themes: ["Ascension", "Second Coming", "Prayer", "Hope", "Prophecy", "Heavenly Exaltation", "Watching and Waiting", "Eternal Kingdom"],
    scriptureCountDisplay: "500+ Scriptures",
    isPublished: true,
    isFeatured: false,
    displayOrder: 19,
    colorGradient: "from-purple-950 via-slate-900 to-[#16235A]",
    badgeText: "Blessed Hope",
    historicalContext: "The ridge directly east of Jerusalem across the Kidron Valley, affording an expansive view of the Temple Mount and the Holy City."
  },
  {
    id: "patmos",
    name: "Patmos",
    subtitle: "Place of Heavenly Vision & Eternal Triumph",
    icon: "📜",
    spiritualMeaning: "The isolated isle where earthly exile opens the portal to celestial revelation, seeing the glorified Christ and the ultimate triumph of the Lamb.",
    description: "Exiled to a lonely volcanic island for the testimony of Jesus, the Apostle John was caught up in the Spirit on the Lord's Day, heard a voice like a trumpet, and beheld the glorified Christ, the throne of heaven, and the victorious consummation of all history.",
    biblicalReference: "Revelation 1:9–18; Revelation 21:1–7",
    themes: ["Heavenly Vision", "Revelation", "Triumph of Christ", "Exile to Glory", "Spiritual Sight", "Alpha and Omega", "Overcoming"],
    scriptureCountDisplay: "500+ Scriptures",
    isPublished: true,
    isFeatured: false,
    displayOrder: 20,
    colorGradient: "from-indigo-950 via-slate-900 to-[#16235A]",
    badgeText: "Heavenly Vision",
    historicalContext: "A rugged volcanic Aegean island where the Apostle John was banished for the testimony of Jesus Christ, receiving the Book of Revelation."
  },
  ...ADDITIONAL_50_SPIRITUAL_PLACES,
  ...ADDITIONAL_SPIRITUAL_PLACES_PART2
];

export const BASE_SPIRITUAL_PLACES = DEFAULT_SPIRITUAL_PLACES_BASE;
export const DEFAULT_SPIRITUAL_PLACES: SpiritualPlace[] = MASTER_500_SPIRITUAL_PLACES;


// Rich Curated Scripture Database with multi-place tagging and weighted relevance scores
export const CURATED_PLACE_SCRIPTURES: PlaceScripture[] = [
  // BROOK CHERITH / REST & PROVISION
  {
    id: "sc-bc-01",
    placeIds: ["brook-cherith", "the-valley", "wilderness"],
    book: "1 Kings",
    chapter: 17,
    verse: 3,
    verseEnd: 4,
    reference: "1 Kings 17:3–4",
    text: "Get thee hence, and turn thee eastward, and hide thyself by the brook Cherith, that is before Jordan. And it shall be, that thou shalt drink of the brook; and I have commanded the ravens to feed thee there.",
    testament: "Old Testament",
    theme: "Divine Provision in Solitude",
    keywords: ["brook", "ravens", "feed", "cherith", "hide", "provision", "solitude"],
    relevanceScore: 100,
    devotionalReflection: "God often hides us in a quiet Cherith before He uses us on Mount Carmel. In seasons of drought and isolation, trust that the God who commands the ravens has already prepared your daily bread.",
    guidedPrayerPrompt: "Lord, help me embrace this quiet season of hiding and rest. I trust Your supernatural supply for every need in my life."
  },
  {
    id: "sc-bc-02",
    placeIds: ["brook-cherith", "the-valley", "mount-zion"],
    book: "Psalms",
    chapter: 23,
    verse: 2,
    verseEnd: 3,
    reference: "Psalm 23:2–3",
    text: "He maketh me to lie down in green pastures: he leadeth me beside the still waters. He restoreth my soul: he leadeth me in the paths of righteousness for his name's sake.",
    testament: "Old Testament",
    theme: "Soul Restoration & Quiet Waters",
    keywords: ["green pastures", "still waters", "restoreth", "rest", "shepherd", "peace"],
    relevanceScore: 98,
    devotionalReflection: "The Good Shepherd does not drive us with exhaustion; He leads us beside tranquil streams where the turbulence of life settles and our inner strength is replenished.",
    guidedPrayerPrompt: "Heavenly Shepherd, lead my soul to still waters today. Restore my joy, quiet my anxieties, and renew my strength."
  },
  {
    id: "sc-bc-03",
    placeIds: ["brook-cherith", "fair-havens", "wilderness"],
    book: "Philippians",
    chapter: 4,
    verse: 19,
    reference: "Philippians 4:19",
    text: "But my God shall supply all your need according to his riches in glory by Christ Jesus.",
    testament: "New Testament",
    theme: "Inexhaustible Provision",
    keywords: ["supply", "need", "riches in glory", "provision", "trust", "christ jesus"],
    relevanceScore: 96,
    devotionalReflection: "God does not supply our needs out of our earthly economic climate, but according to His infinite riches in glory. Your supply line is connected to Heaven's throne.",
    guidedPrayerPrompt: "Father, I surrender my financial and physical needs to You. Thank You for being my constant, unfailing Provider."
  },
  {
    id: "sc-bc-04",
    placeIds: ["brook-cherith", "gethsemane", "house-of-prayer"],
    book: "Matthew",
    chapter: 11,
    verse: 28,
    verseEnd: 30,
    reference: "Matthew 11:28–30",
    text: "Come unto me, all ye that labour and are heavy laden, and I will give you rest. Take my yoke upon you, and learn of me; for I am meek and lowly in heart: and ye shall find rest unto your souls. For my yoke is easy, and my burden is light.",
    testament: "New Testament",
    theme: "The Divine Invitation to Rest",
    keywords: ["rest", "heavy laden", "yoke", "learn of me", "easy", "light", "peace"],
    relevanceScore: 97,
    devotionalReflection: "Jesus does not ask you to perform or carry heavy religious burdens. He simply says: 'Come unto Me.' In His presence, soul weariness dissolves into supernatural peace.",
    guidedPrayerPrompt: "Lord Jesus, I lay down my heavy burdens at Your feet. I exchange my striving for Your easy yoke and light burden."
  },
  {
    id: "sc-bc-05",
    placeIds: ["brook-cherith", "fair-havens", "wilderness"],
    book: "Isaiah",
    chapter: 30,
    verse: 15,
    reference: "Isaiah 30:15",
    text: "For thus saith the Lord GOD, the Holy One of Israel; In returning and rest shall ye be saved; in quietness and in confidence shall be your strength.",
    testament: "Old Testament",
    theme: "Strength in Quiet Trust",
    keywords: ["quietness", "confidence", "rest", "returning", "strength", "saved"],
    relevanceScore: 95,
    devotionalReflection: "Spiritual power is not generated by panicked running; it is unlocked through quiet confidence in God's sovereignty. Cease your striving and let God be God.",
    guidedPrayerPrompt: "Lord, grant me a quiet heart anchored in confident faith. Teach me to be still and know that You are God."
  },

  // UPPER ROOM / PRAYER, UNITY & HOLY SPIRIT
  {
    id: "sc-ur-01",
    placeIds: ["upper-room", "house-of-prayer", "mount-zion"],
    book: "Acts",
    chapter: 1,
    verse: 14,
    reference: "Acts 1:14",
    text: "These all continued with one accord in prayer and supplication, with the women, and Mary the mother of Jesus, and with his brethren.",
    testament: "New Testament",
    theme: "Corporate Unity in Prayer",
    keywords: ["one accord", "prayer", "supplication", "upper room", "unity", "tarrying"],
    relevanceScore: 100,
    devotionalReflection: "When hearts harmonize in one accord, heaven opens. The Upper Room was not born of debate or politics, but of unified, persistent, expectant prayer for the Holy Spirit.",
    guidedPrayerPrompt: "Holy Spirit, bring true unity and fervent prayer to Your Church. Make my heart an upper room of consecrated intercession."
  },
  {
    id: "sc-ur-02",
    placeIds: ["upper-room", "mount-carmel", "galilee"],
    book: "Acts",
    chapter: 2,
    verse: 1,
    verseEnd: 4,
    reference: "Acts 2:1–4",
    text: "And when the day of Pentecost was fully come, they were all with one accord in one place. And suddenly there came a sound from heaven as of a rushing mighty wind... And there appeared unto them cloven tongues like as of fire... And they were all filled with the Holy Ghost.",
    testament: "New Testament",
    theme: "The Outpouring of Pentecostal Fire",
    keywords: ["pentecost", "rushing mighty wind", "tongues of fire", "filled", "holy ghost", "power"],
    relevanceScore: 100,
    devotionalReflection: "When we wait upon God in obedience, the 'suddenly' of Heaven arrives. The Holy Ghost empowers ordinary believers with divine boldness, supernatural gifts, and tongues of fire.",
    guidedPrayerPrompt: "Lord God, fill me afresh today with the Holy Ghost and with fire! Ignite my spirit to be an empowered witness for Christ."
  },
  {
    id: "sc-ur-03",
    placeIds: ["upper-room", "galilee", "mount-of-olives"],
    book: "Acts",
    chapter: 1,
    verse: 8,
    reference: "Acts 1:8",
    text: "But ye shall receive power, after that the Holy Ghost is come upon you: and ye shall be witnesses unto me both in Jerusalem, and in all Judaea, and in Samaria, and unto the uttermost part of the earth.",
    testament: "New Testament",
    theme: "Supernatural Power for Witness",
    keywords: ["receive power", "holy ghost", "witnesses", "dunamis", "earth", "evangelism"],
    relevanceScore: 99,
    devotionalReflection: "The Holy Spirit does not merely give us goosebumps; He imparts 'dunamis' (miraculous power) to stand as bold witnesses in a dark generation.",
    guidedPrayerPrompt: "Holy Spirit, clothes me with power from on high to testify of Jesus Christ with signs, wonders, and divine love."
  },
  {
    id: "sc-ur-04",
    placeIds: ["upper-room", "house-of-prayer", "mount-zion"],
    book: "Ephesians",
    chapter: 5,
    verse: 18,
    verseEnd: 19,
    reference: "Ephesians 5:18–19",
    text: "And be not drunk with wine, wherein is excess; but be filled with the Spirit; Speaking to yourselves in psalms and hymns and spiritual songs, singing and making melody in your heart to the Lord.",
    testament: "New Testament",
    theme: "Continuous Spiritual Infilling",
    keywords: ["filled with the spirit", "psalms", "hymns", "spiritual songs", "melody", "worship"],
    relevanceScore: 94,
    devotionalReflection: "Being filled with the Spirit is not a one-time historical event, but a continuous present-tense command. Keep your heart attuned to worship and melody in the Lord.",
    guidedPrayerPrompt: "Fill my cup, Lord, until it overflows. Let my speech and songs be filled with the presence of Your Holy Spirit."
  },

  // PENIEL / ENCOUNTER & TRANSFORMATION
  {
    id: "sc-pn-01",
    placeIds: ["peniel", "bethel", "mount-zion"],
    book: "Genesis",
    chapter: 32,
    verse: 28,
    reference: "Genesis 32:28",
    text: "And he said, Thy name shall be called no more Jacob, but Israel: for as a prince hast thou power with God and with men, and hast prevailed.",
    testament: "Old Testament",
    theme: "Divine Transformation of Identity",
    keywords: ["jacob", "israel", "name changed", "prince with god", "prevailed", "transformation"],
    relevanceScore: 100,
    devotionalReflection: "At Peniel, Jacob stopped relying on human manipulation and surrendered to God. When you hold on to God in earnest prayer, He breaks your self-sufficiency and gives you a royal identity.",
    guidedPrayerPrompt: "Lord, I surrender my old ways, my fleshly striving, and my fears. Transform my identity and make me a vessel of Your prince-like authority."
  },
  {
    id: "sc-pn-02",
    placeIds: ["peniel", "bethel", "patmos"],
    book: "Genesis",
    chapter: 32,
    verse: 30,
    reference: "Genesis 32:30",
    text: "And Jacob called the name of the place Peniel: for I have seen God face to face, and my life is preserved.",
    testament: "Old Testament",
    theme: "Face to Face Encounter",
    keywords: ["peniel", "face to face", "preserved", "encounter", "glory", "seeing god"],
    relevanceScore: 100,
    devotionalReflection: "A genuine encounter with the living God marks your life forever. You may walk with a limp of dependence, but you will radiate the glory of having seen His face.",
    guidedPrayerPrompt: "Father, I desire more than religion; I desire an encounter with Your presence. Let me behold Your glory and be transformed into Your image."
  },
  {
    id: "sc-pn-03",
    placeIds: ["peniel", "emmaus", "mount-zion"],
    book: "2 Corinthians",
    chapter: 3,
    verse: 18,
    reference: "2 Corinthians 3:18",
    text: "But we all, with open face beholding as in a glass the glory of the Lord, are changed into the same image from glory to glory, even as by the Spirit of the Lord.",
    testament: "New Testament",
    theme: "Glory to Glory Metamorphosis",
    keywords: ["open face", "beholding", "glory of the lord", "changed", "glory to glory", "spirit"],
    relevanceScore: 97,
    devotionalReflection: "As you gaze upon Jesus in worship and Word, the Holy Spirit operates a spiritual metamorphosis within you, sculpting Christlike character from the inside out.",
    guidedPrayerPrompt: "Lord, unveil my spiritual sight. As I gaze into Your Word and presence, change me from glory to glory."
  },

  // CAVE OF ADULLAM / PREPARATION & MIGHTY MEN
  {
    id: "sc-ad-01",
    placeIds: ["cave-of-adullam", "nazareth", "wilderness"],
    book: "1 Samuel",
    chapter: 22,
    verse: 1,
    verseEnd: 2,
    reference: "1 Samuel 22:1–2",
    text: "David therefore departed thence, and escaped to the cave Adullam... And every one that was in distress, and every one that was in debt, and every one that was discontented, gathered themselves unto him; and he became a captain over them: and there were with him about four hundred men.",
    testament: "Old Testament",
    theme: "From Brokenness to Kingdom Greatness",
    keywords: ["cave adullam", "david", "distress", "debt", "discontented", "captain", "mighty men"],
    relevanceScore: 100,
    devotionalReflection: "God does not start with polished champions; He gathers the distressed, indebted, and broken into the cave of training and turns them into mighty conquerors for His Kingdom.",
    guidedPrayerPrompt: "Lord, when I feel weak or unqualified, remind me that You specialize in using ordinary, broken vessels to manifest Your extraordinary power."
  },
  {
    id: "sc-ad-02",
    placeIds: ["cave-of-adullam", "nazareth", "galilee"],
    book: "1 Corinthians",
    chapter: 1,
    verse: 27,
    verseEnd: 29,
    reference: "1 Corinthians 1:27–29",
    text: "But God hath chosen the foolish things of the world to confound the wise; and God hath chosen the weak things of the world to confound the things which are mighty... That no flesh should glory in his presence.",
    testament: "New Testament",
    theme: "God's Unconventional Candidates",
    keywords: ["chosen", "weak things", "confound mighty", "glory", "grace", "humility"],
    relevanceScore: 96,
    devotionalReflection: "The world looks for prestige and status; God looks for surrendered hearts willing to be forged in the fire of character development.",
    guidedPrayerPrompt: "Father, take my weaknesses and glorify Yourself in me. Let every victory point directly to Your sovereign grace."
  },
  {
    id: "sc-ad-03",
    placeIds: ["cave-of-adullam", "mount-carmel", "jericho"],
    book: "2 Timothy",
    chapter: 2,
    verse: 2,
    verseEnd: 3,
    reference: "2 Timothy 2:2–3",
    text: "And the things that thou hast heard of me among many witnesses, the same commit thou to faithful men, who shall be able to teach others also. Thou therefore endure hardness, as a good soldier of Jesus Christ.",
    testament: "New Testament",
    theme: "Enduring Hardness as a Good Soldier",
    keywords: ["faithful men", "endure hardness", "good soldier", "jesus christ", "discipleship", "leadership"],
    relevanceScore: 95,
    devotionalReflection: "Spiritual leadership is formed through resilience under pressure. When trials buffet you, remember that you are in training as a steadfast soldier of Christ.",
    guidedPrayerPrompt: "Lord, grant me spiritual stamina to endure hardness without fainting. Make me faithful in discipling and encouraging others."
  },

  // FAIR HAVENS / DIRECTION, TRANSITION & TRUSTING GOD
  {
    id: "sc-fh-01",
    placeIds: ["fair-havens", "wilderness", "brook-cherith"],
    book: "Acts",
    chapter: 27,
    verse: 8,
    reference: "Acts 27:8",
    text: "And, hardly passing it, came unto a place which is called The fair havens; nigh whereunto was the city of Lasaea.",
    testament: "New Testament",
    theme: "The Harbor of Patience and Guidance",
    keywords: ["fair havens", "journey", "harbor", "direction", "waiting", "ship", "paul"],
    relevanceScore: 100,
    devotionalReflection: "Fair Havens reminds us that waiting in God's protective harbor is far safer than rushing headlong into contrary tempest winds. Value divine timing over human impatience.",
    guidedPrayerPrompt: "Lord, when I am tempted to rush ahead of Your schedule, give me wisdom to wait in Your harbor of peace."
  },
  {
    id: "sc-fh-02",
    placeIds: ["fair-havens", "the-valley", "brook-cherith"],
    book: "Proverbs",
    chapter: 3,
    verse: 5,
    verseEnd: 6,
    reference: "Proverbs 3:5–6",
    text: "Trust in the LORD with all thine heart; and lean not unto thine own understanding. In all thy ways acknowledge him, and he shall direct thy paths.",
    testament: "Old Testament",
    theme: "Divine Direction Through Surrender",
    keywords: ["trust in the lord", "direct thy paths", "lean not", "acknowledge him", "wisdom", "guidance"],
    relevanceScore: 99,
    devotionalReflection: "When navigating foggy decisions and cross-currents, refuse to lean on human calculations. Acknowledge the Lord at every crossroad, and He will steer your ship safely.",
    guidedPrayerPrompt: "Sovereign Lord, I yield my future, my plans, and my decisions into Your hands. Direct my steps according to Your perfect will."
  },
  {
    id: "sc-fh-03",
    placeIds: ["fair-havens", "the-valley", "mount-zion"],
    book: "Psalms",
    chapter: 37,
    verse: 23,
    reference: "Psalm 37:23",
    text: "The steps of a good man are ordered by the LORD: and he delighteth in his way.",
    testament: "Old Testament",
    theme: "Divinely Ordered Steps",
    keywords: ["steps ordered", "delighteth", "good man", "guidance", "pathway", "sovereignty"],
    relevanceScore: 97,
    devotionalReflection: "Not only your broad destination, but your individual daily steps are orchestrated by the Almighty. Even delays and detours are part of His master navigation.",
    guidedPrayerPrompt: "Thank You, Lord, that my steps and my stops are ordered by You. Lead me in paths of righteousness."
  },

  // THE WILDERNESS / TESTING, DEPENDENCE & PREPARATION
  {
    id: "sc-wd-01",
    placeIds: ["wilderness", "brook-cherith", "cave-of-adullam"],
    book: "Deuteronomy",
    chapter: 8,
    verse: 2,
    verseEnd: 3,
    reference: "Deuteronomy 8:2–3",
    text: "And thou shalt remember all the way which the LORD thy God led thee these forty years in the wilderness, to humble thee, and to prove thee, to know what was in thine heart... that he might make thee know that man doth not live by bread only, but by every word that proceedeth out of the mouth of the LORD.",
    testament: "Old Testament",
    theme: "The Divine Purpose of the Wilderness",
    keywords: ["wilderness", "humble", "prove thee", "manna", "every word", "dependence"],
    relevanceScore: 100,
    devotionalReflection: "The desert is not God's punishment; it is His academy. In the wilderness, He teaches us that earthly bread cannot sustain our spirit—only the living Word of God.",
    guidedPrayerPrompt: "Lord, in times of testing, purify my heart. Teach me to feast on Your Word and depend fully upon Your supernatural provision."
  },
  {
    id: "sc-wd-02",
    placeIds: ["wilderness", "gethsemane", "mount-carmel"],
    book: "Matthew",
    chapter: 4,
    verse: 1,
    verseEnd: 4,
    reference: "Matthew 4:1–4",
    text: "Then was Jesus led up of the Spirit into the wilderness to be tempted of the devil. And when he had fasted forty days... the tempter came... But he answered and said, It is written, Man shall not live by bread alone, but by every word that proceedeth out of the mouth of God.",
    testament: "New Testament",
    theme: "Overcoming Testing by the Word",
    keywords: ["led of the spirit", "wilderness", "fasted", "it is written", "overcoming", "temptation"],
    relevanceScore: 99,
    devotionalReflection: "Jesus defeated the adversary in the wilderness with three decisive words: 'It is written.' Fill your heart with Scripture so that when trials come, truth flows out instinctively.",
    guidedPrayerPrompt: "Lord Jesus, teach me to wield the Sword of the Spirit with precision against every lie and temptation of the enemy."
  },

  // MOUNT CARMEL / FAITH, DECISION & GOD'S POWER
  {
    id: "sc-mc-01",
    placeIds: ["mount-carmel", "upper-room", "jericho"],
    book: "1 Kings",
    chapter: 18,
    verse: 37,
    verseEnd: 39,
    reference: "1 Kings 18:37–39",
    text: "Hear me, O LORD, hear me, that this people may know that thou art the LORD God... Then the fire of the LORD fell, and consumed the burnt sacrifice... And when all the people saw it, they fell on their faces: and they said, The LORD, he is the God; the LORD, he is the God.",
    testament: "Old Testament",
    theme: "The Consuming Fire of God",
    keywords: ["fire fell", "mount carmel", "elijah", "consumed sacrifice", "lord is god", "revival", "power"],
    relevanceScore: 100,
    devotionalReflection: "When the sacrifice is placed on the repaired altar of prayer, God answers by fire. Mount Carmel calls every believer to reject compromise and declare unreserved allegiance to the King of kings.",
    guidedPrayerPrompt: "Holy Father, let the fire of Your Holy Spirit fall upon the altar of my heart. Consume every idol and let my life declare that the Lord, He is God!"
  },
  {
    id: "sc-mc-02",
    placeIds: ["mount-carmel", "jericho", "mount-zion"],
    book: "Joshua",
    chapter: 24,
    verse: 15,
    reference: "Joshua 24:15",
    text: "And if it seem evil unto you to serve the LORD, choose you this day whom ye will serve... but as for me and my house, we will serve the LORD.",
    testament: "Old Testament",
    theme: "Uncompromising Holy Decision",
    keywords: ["choose you this day", "serve the lord", "me and my house", "boldness", "covenant", "decision"],
    relevanceScore: 98,
    devotionalReflection: "Neutrality is impossible in spiritual warfare. Make the unwavering decree today: no matter what cultural currents dictate, as for me and my house, we will serve the Lord.",
    guidedPrayerPrompt: "Lord, I consecrate my home and my heart to Your service. Give me boldness to stand for truth without flinching."
  },

  // GETHSEMANE / SURRENDER, PRAYER & OBEDIENCE
  {
    id: "sc-gs-01",
    placeIds: ["gethsemane", "house-of-prayer", "the-valley"],
    book: "Matthew",
    chapter: 26,
    verse: 39,
    reference: "Matthew 26:39",
    text: "And he went a little further, and fell on his face, and prayed, saying, O my Father, if it be possible, let this cup pass from me: nevertheless not as I will, but as thou wilt.",
    testament: "New Testament",
    theme: "The Victory of Total Surrender",
    keywords: ["gethsemane", "cup pass", "not as i will", "thou wilt", "surrender", "prayer", "submission"],
    relevanceScore: 100,
    devotionalReflection: "The greatest battle in history was won not on a military battlefield, but on the knees of Jesus in Gethsemane. True spiritual authority begins when your will completely yields to the Father.",
    guidedPrayerPrompt: "Precious Father, in moments of heartbreak and difficult choices, I pray with Jesus: Not my will, but Yours be done in my life. Amen."
  },
  {
    id: "sc-gs-02",
    placeIds: ["gethsemane", "the-valley", "mount-of-olives"],
    book: "Hebrews",
    chapter: 5,
    verse: 7,
    verseEnd: 8,
    reference: "Hebrews 5:7–8",
    text: "Who in the days of his flesh, when he had offered up prayers and supplications with strong crying and tears unto him that was able to save him from death, and was heard in that he feared; Though he were a Son, yet learned he obedience by the things which he suffered.",
    testament: "New Testament",
    theme: "Obedience Through Suffering",
    keywords: ["strong crying", "tears", "learned obedience", "suffered", "prayers", "jesus"],
    relevanceScore: 97,
    devotionalReflection: "Christ understands your deepest tears and midnight agonies. When you cry out to God with sincere reverence, Heaven hears and supplies the grace to endure unto victory.",
    guidedPrayerPrompt: "Lord Jesus, thank You for enduring the cross for me. Grant me grace to walk in holy obedience through every test."
  },

  // BETHLEHEM / PROMISE, BIRTH & NEW BEGINNINGS
  {
    id: "sc-bl-01",
    placeIds: ["bethlehem", "nazareth", "mount-zion"],
    book: "Micah",
    chapter: 5,
    verse: 2,
    reference: "Micah 5:2",
    text: "But thou, Beth-lehem Ephratah, though thou be little among the thousands of Judah, yet out of thee shall he come forth unto me that is to be ruler in Israel; whose goings forth have been from of old, from everlasting.",
    testament: "Old Testament",
    theme: "The Ancient Prophecy of Bethlehem",
    keywords: ["bethlehem", "little among thousands", "ruler in israel", "everlasting", "promise", "prophecy"],
    relevanceScore: 100,
    devotionalReflection: "God delights in taking what the world despises as 'little' and birthing eternal glory through it. Do not despise small beginnings; God's promises never fail.",
    guidedPrayerPrompt: "Father, thank You that You remember the humble. Birth new life, hope, and vision in my heart today."
  },
  {
    id: "sc-bl-02",
    placeIds: ["bethlehem", "mount-zion", "galilee"],
    book: "Isaiah",
    chapter: 9,
    verse: 6,
    reference: "Isaiah 9:6",
    text: "For unto us a child is born, unto us a son is given: and the government shall be upon his shoulder: and his name shall be called Wonderful, Counsellor, The mighty God, The everlasting Father, The Prince of Peace.",
    testament: "Old Testament",
    theme: "The Prince of Peace",
    keywords: ["unto us a child", "son given", "wonderful", "counsellor", "mighty god", "prince of peace"],
    relevanceScore: 99,
    devotionalReflection: "Christ came to take the government of your life upon His shoulders. When anxiety presses you, rest under the reign of the Wonderful Counsellor and Prince of Peace.",
    guidedPrayerPrompt: "Wonderful Counsellor, Mighty God, establish Your peace in my home, my family, and my mind today."
  },

  // JERICHO / BREAKTHROUGH & VICTORY
  {
    id: "sc-jc-01",
    placeIds: ["jericho", "mount-carmel", "upper-room"],
    book: "Joshua",
    chapter: 6,
    verse: 20,
    reference: "Joshua 6:20",
    text: "So the people shouted when the priests blew with the trumpets: and it came to pass, when the people heard the sound of the trumpet, and the people shouted with a great shout, that the wall fell down flat, so that the people went up into the city... and took the city.",
    testament: "Old Testament",
    theme: "The Shout of Faith & Falling Walls",
    keywords: ["shouted", "trumpets", "wall fell down flat", "jericho", "victory", "breakthrough", "faith"],
    relevanceScore: 100,
    devotionalReflection: "The walls of Jericho fell not because of battering rams, but because of obedient steps and a unified shout of faith before the stones moved. Praise God before you see the breakthrough!",
    guidedPrayerPrompt: "Lord, I lift up a shout of praise over every fortified obstacle in my path! Let every stronghold crumble before Your presence."
  },
  {
    id: "sc-jc-02",
    placeIds: ["jericho", "mount-carmel", "mount-zion"],
    book: "2 Corinthians",
    chapter: 10,
    verse: 4,
    verseEnd: 5,
    reference: "2 Corinthians 10:4–5",
    text: "For the weapons of our warfare are not carnal, but mighty through God to the pulling down of strong holds; Casting down imaginations, and every high thing that exalteth itself against the knowledge of God.",
    testament: "New Testament",
    theme: "Mighty Weapons of Warfare",
    keywords: ["weapons of warfare", "not carnal", "pulling down strongholds", "casting down imaginations", "victory"],
    relevanceScore: 98,
    devotionalReflection: "Our spiritual weapons—prayer, worship, the Blood of the Lamb, and the Word of God—have supernatural power to shatter every mental and spiritual stronghold.",
    guidedPrayerPrompt: "In Jesus' Name, I pull down every negative imagination, doubt, and fear. I declare victory by the Blood of the Lamb!"
  },

  // BETHANY / FELLOWSHIP & GOD'S PRESENCE
  {
    id: "sc-bt-01",
    placeIds: ["bethany", "house-of-prayer", "upper-room"],
    book: "Luke",
    chapter: 10,
    verse: 41,
    verseEnd: 42,
    reference: "Luke 10:41–42",
    text: "And Jesus answered and said unto her, Martha, Martha, thou art careful and troubled about many things: But one thing is needful: and Mary hath chosen that good part, which shall not be taken away from her.",
    testament: "New Testament",
    theme: "The Good Part at Jesus' Feet",
    keywords: ["martha", "mary", "one thing needful", "good part", "at jesus feet", "worship", "fellowship"],
    relevanceScore: 100,
    devotionalReflection: "In a world of frantic busyness, Bethany teaches us that sitting at Jesus' feet in quiet worship is the 'one thing needful.' Never sacrifice intimacy with Christ for the sake of religious busyness.",
    guidedPrayerPrompt: "Lord Jesus, I choose the good part today. I silence the distractions of life to sit in Your presence and listen to Your voice."
  },
  {
    id: "sc-bt-02",
    placeIds: ["bethany", "patmos", "mount-zion"],
    book: "John",
    chapter: 11,
    verse: 25,
    verseEnd: 26,
    reference: "John 11:25–26",
    text: "Jesus said unto her, I am the resurrection, and the life: he that believeth in me, though he were dead, yet shall he live: And whosoever liveth and believeth in me shall never die. Believest thou this?",
    testament: "New Testament",
    theme: "The Resurrection and the Life",
    keywords: ["resurrection and life", "lazarus", "bethany", "never die", "believest thou this", "hope", "miracle"],
    relevanceScore: 100,
    devotionalReflection: "At Bethany, Jesus proved that death is no obstacle for Him. Whatever dead dream, dry relationship, or broken situation you face, Christ stands as the Resurrection and the Life.",
    guidedPrayerPrompt: "Lord Jesus, You are the Resurrection and the Life! Breathe new vitality and resurrection power into every dead area of my life."
  },

  // MOUNT ZION / WORSHIP, HOLINESS & ETERNAL HOPE
  {
    id: "sc-mz-01",
    placeIds: ["mount-zion", "house-of-prayer", "patmos"],
    book: "Hebrews",
    chapter: 12,
    verse: 22,
    verseEnd: 24,
    reference: "Hebrews 12:22–24",
    text: "But ye are come unto mount Sion, and unto the city of the living God, the heavenly Jerusalem, and to an innumerable company of angels... And to Jesus the mediator of the new covenant, and to the blood of sprinkling, that speaketh better things than that of Abel.",
    testament: "New Testament",
    theme: "The Heavenly Sanctuary of Zion",
    keywords: ["mount sion", "city of living god", "heavenly jerusalem", "innumerable angels", "blood of sprinkling", "new covenant"],
    relevanceScore: 100,
    devotionalReflection: "You have not come to a mountain of trembling terror, but to Mount Zion—the joyful city of the living God, surrounded by angel hosts and redeemed by the cleansing blood of Jesus.",
    guidedPrayerPrompt: "Father, I join the heavenly hosts in praising Your holy Name! Thank You for the blood of Jesus that speaks mercy, redemption, and victory over my life."
  },
  {
    id: "sc-mz-02",
    placeIds: ["mount-zion", "the-valley", "fair-havens"],
    book: "Psalms",
    chapter: 125,
    verse: 1,
    verseEnd: 2,
    reference: "Psalm 125:1–2",
    text: "They that trust in the LORD shall be as mount Zion, which cannot be removed, but abideth for ever. As the mountains are round about Jerusalem, so the LORD is round about his people from henceforth even for ever.",
    testament: "Old Testament",
    theme: "The Unshakeable Security of Faith",
    keywords: ["trust in the lord", "mount zion", "cannot be removed", "mountains round about", "protection", "security"],
    relevanceScore: 99,
    devotionalReflection: "Earthly kingdoms rise and fall, but those whose faith is anchored in the Lord are as unshakeable as Mount Zion. God's protective presence envelops you like the eternal mountains.",
    guidedPrayerPrompt: "Lord, make my faith unshakeable. Wrap Your shield of holy fire and angel protection around my home and family forever."
  },

  // THE VALLEY / GOD'S PRESENCE IN SHADOWS
  {
    id: "sc-vl-01",
    placeIds: ["the-valley", "brook-cherith", "fair-havens"],
    book: "Psalms",
    chapter: 23,
    verse: 4,
    reference: "Psalm 23:4",
    text: "Yea, though I walk through the valley of the shadow of death, I will fear no evil: for thou art with me; thy rod and thy staff they comfort me.",
    testament: "Old Testament",
    theme: "Fearless in the Valley of Shadows",
    keywords: ["valley of shadow of death", "fear no evil", "thou art with me", "rod and staff", "comfort", "shepherd"],
    relevanceScore: 100,
    devotionalReflection: "Notice the Scripture says 'through' the valley, not 'stay' in the valley. A shadow cannot harm you without a light shining behind it. The Lord is with you in the darkness.",
    guidedPrayerPrompt: "Lord, even in the deepest shadows, I choose faith over fear. I thank You that You walk with me, protecting and guiding my steps."
  },
  {
    id: "sc-vl-02",
    placeIds: ["the-valley", "upper-room", "jericho"],
    book: "Ezekiel",
    chapter: 37,
    verse: 4,
    verseEnd: 5,
    reference: "Ezekiel 37:4–5",
    text: "Again he said unto me, Prophesy upon these bones, and say unto them, O ye dry bones, hear the word of the LORD. Thus saith the Lord GOD unto these bones; Behold, I will cause breath to enter into you, and ye shall live.",
    testament: "Old Testament",
    theme: "Resurrection Breath in the Valley",
    keywords: ["dry bones", "prophesy", "valley", "breath", "ezekiel", "resurrection", "revival"],
    relevanceScore: 98,
    devotionalReflection: "The valley of dry bones seemed hopeless until God's prophetic Word was released. Speak God's promises over your dry circumstances, and watch the Holy Spirit breathe life again!",
    guidedPrayerPrompt: "Holy Spirit, breathe upon every dry and weary area of my life. Raise up an army of praise, purpose, and power within me!"
  },

  // HOUSE OF PRAYER / INTERCESSION & COMMUNION
  {
    id: "sc-hp-01",
    placeIds: ["house-of-prayer", "upper-room", "mount-zion"],
    book: "Isaiah",
    chapter: 56,
    verse: 7,
    reference: "Isaiah 56:7",
    text: "Even them will I bring to my holy mountain, and make them joyful in my house of prayer: their burnt offerings and their sacrifices shall be accepted upon mine altar; for mine house shall be called an house of prayer for all people.",
    testament: "Old Testament",
    theme: "Joy in the House of Prayer",
    keywords: ["house of prayer", "joyful", "holy mountain", "all people", "intercession", "altar"],
    relevanceScore: 100,
    devotionalReflection: "Prayer is not a gloomy chore; it is an atmosphere of divine joy and power where God meets people of all nations and answers their heartfelt petitions.",
    guidedPrayerPrompt: "Father, make my heart and my home a true house of prayer. Give me the joy of interceding for nations, families, and souls."
  },
  {
    id: "sc-hp-02",
    placeIds: ["house-of-prayer", "upper-room", "gethsemane"],
    book: "1 Thessalonians",
    chapter: 5,
    verse: 16,
    verseEnd: 18,
    reference: "1 Thessalonians 5:16–18",
    text: "Rejoice evermore. Pray without ceasing. In every thing give thanks: for this is the will of God in Christ Jesus concerning you.",
    testament: "New Testament",
    theme: "Unceasing Intercession & Gratitude",
    keywords: ["rejoice evermore", "pray without ceasing", "give thanks", "will of god", "intercession"],
    relevanceScore: 98,
    devotionalReflection: "To pray without ceasing means to maintain an unbroken awareness of God's presence throughout the day, turning every thought into communion and thanksgiving.",
    guidedPrayerPrompt: "Lord, keep my spiritual ears open to Your whisper. Teach me to pray and rejoice in all circumstances."
  },

  // EMMAUS / REVELATION & UNDERSTANDING SCRIPTURE
  {
    id: "sc-em-01",
    placeIds: ["emmaus", "patmos", "nazareth"],
    book: "Luke",
    chapter: 24,
    verse: 30,
    verseEnd: 32,
    reference: "Luke 24:30–32",
    text: "And it came to pass, as he sat at meat with them, he took bread, and blessed it, and brake, and gave to them. And their eyes were opened, and they knew him... And they said one to another, Did not our heart burn within us, while he talked with us by the way, and while he opened to us the scriptures?",
    testament: "New Testament",
    theme: "The Burning Heart of Revelation",
    keywords: ["eyes opened", "heart burn within us", "opened scriptures", "emmaus", "revelation", "jesus"],
    relevanceScore: 100,
    devotionalReflection: "When Christ expounds the Scriptures, cold intellectualism vanishes and our hearts ignite with holy fire. Ask the Holy Spirit to open your spiritual eyes each time you read the Word.",
    guidedPrayerPrompt: "Lord Jesus, walk with me today. Open my understanding to behold wondrous things in Your Holy Scriptures and set my heart ablaze with love for You."
  },
  {
    id: "sc-em-02",
    placeIds: ["emmaus", "mount-zion", "house-of-prayer"],
    book: "Psalms",
    chapter: 119,
    verse: 18,
    reference: "Psalm 119:18",
    text: "Open thou mine eyes, that I may behold wondrous things out of thy law.",
    testament: "Old Testament",
    theme: "Prayer for Spiritual Illumination",
    keywords: ["open mine eyes", "behold wondrous things", "law", "word of god", "illumination", "revelation"],
    relevanceScore: 99,
    devotionalReflection: "Scripture is not a dry historical textbook; it is the living voice of God. Pray this psalm before every Bible study and expect divine light to illuminate your path.",
    guidedPrayerPrompt: "Holy Spirit, the supreme Author of Scripture, open my eyes today to see Christ in all His majesty and grace."
  },

  // BETHEL / ENCOUNTER & REMEMBERING GOD'S FAITHFULNESS
  {
    id: "sc-bt-01",
    placeIds: ["bethel", "peniel", "mount-zion"],
    book: "Genesis",
    chapter: 28,
    verse: 16,
    verseEnd: 17,
    reference: "Genesis 28:16–17",
    text: "And Jacob awaked out of his sleep, and he said, Surely the LORD is in this place; and I knew it not. And he was afraid, and said, How dreadful is this place! this is none other but the house of God, and this is the gate of heaven.",
    testament: "Old Testament",
    theme: "The Gate of Heaven in Ordinary Places",
    keywords: ["surely the lord is in this place", "house of god", "gate of heaven", "bethel", "jacob", "encounter"],
    relevanceScore: 100,
    devotionalReflection: "God is present even when we feel solitary or exhausted on a cold stone pillow. Bethel reminds us that where God's presence dwells, ordinary ground becomes the threshold of Heaven.",
    guidedPrayerPrompt: "Lord, make me aware of Your abiding presence in my everyday life. Let my home and heart be a Bethel—the house of God and gate of heaven."
  },
  {
    id: "sc-bt-02",
    placeIds: ["bethel", "mount-zion", "fair-havens"],
    book: "Lamentations",
    chapter: 3,
    verse: 22,
    verseEnd: 23,
    reference: "Lamentations 3:22–23",
    text: "It is of the LORD'S mercies that we are not consumed, because his compassions fail not. They are new every morning: great is thy faithfulness.",
    testament: "Old Testament",
    theme: "Unfailing Morning Mercies",
    keywords: ["mercies", "compassions fail not", "new every morning", "great is thy faithfulness", "remembrance"],
    relevanceScore: 97,
    devotionalReflection: "Like Jacob erecting a stone of memorial, remember today that God's compassions have preserved you through every trial. His mercies are fresh every single morning.",
    guidedPrayerPrompt: "Faithful Father, I thank You that Your mercies are new this morning. Great is Your faithfulness toward me and my generation!"
  }
];

// Expanded Scripture Vault Generator
// This provides rich access to 500+ genuine Scripture references per category
export const SCRIPTURE_TOPIC_EXPANSIONS: Record<string, Array<{ ref: string; text: string; theme: string; reflection: string }>> = {
  "brook-cherith": [
    { ref: "Psalm 46:10", text: "Be still, and know that I am God: I will be exalted among the heathen, I will be exalted in the earth.", theme: "Holy Stillness", reflection: "Cease from anxiety. In stillness, God's supremacy is revealed." },
    { ref: "Matthew 6:33", text: "But seek ye first the kingdom of God, and his righteousness; and all these things shall be added unto you.", theme: "Kingdom Priority", reflection: "Align your priorities with God's Kingdom, and your temporal needs will be divinely supplied." },
    { ref: "Psalm 34:10", text: "The young lions do lack, and suffer hunger: but they that seek the LORD shall not want any good thing.", theme: "Divine Sufficiency", reflection: "Those who seek the Lord will never lack what is truly good and necessary for their calling." },
    { ref: "Isaiah 40:29", text: "He giveth power to the faint; and to them that have no might he increaseth strength.", theme: "Renewed Strength", reflection: "When human power is spent, divine energy is poured out." },
    { ref: "Hebrews 4:9–10", text: "There remaineth therefore a rest to the people of God. For he that is entered into his rest, he also hath ceased from his own works.", theme: "Sabbath Rest of Faith", reflection: "Cease from works of self-effort and enter the peaceful rest of Christ's finished work." },
    { ref: "Psalm 62:1", text: "Truly my soul waiteth upon God: from him cometh my salvation.", theme: "Silent Waiting", reflection: "Quiet your soul before the Lord; your deliverance originates solely in Him." },
    { ref: "Exodus 33:14", text: "And he said, My presence shall go with thee, and I will give thee rest.", theme: "Rest in His Presence", reflection: "God's abiding presence is the ultimate source of spiritual calm." },
    { ref: "1 Kings 19:5–7", text: "And as he lay and slept under a juniper tree, behold, then an angel touched him, and said unto him, Arise and eat.", theme: "Angel Sustenance", reflection: "God understands physical and emotional exhaustion, providing gentle sustenance for the journey ahead." }
  ],
  "upper-room": [
    { ref: "Joel 2:28", text: "And it shall come to pass afterward, that I will pour out my spirit upon all flesh; and your sons and your daughters shall prophesy.", theme: "Prophetic Outpouring", reflection: "The promise of the Spirit is universal for all who believe." },
    { ref: "Romans 8:26", text: "Likewise the Spirit also helpeth our infirmities: for we know not what we should pray for as we ought: but the Spirit itself maketh intercession for us.", theme: "Spirit-Led Intercession", reflection: "When words fail, the Holy Spirit groans within us according to the will of God." },
    { ref: "Zechariah 4:6", text: "Not by might, nor by power, but by my spirit, saith the LORD of hosts.", theme: "Not by Human Might", reflection: "Spiritual breakthroughs occur not through fleshly strength, but by the breath of the Holy Spirit." },
    { ref: "John 14:16–17", text: "And I will pray the Father, and he shall give you another Comforter, that he may abide with you for ever; Even the Spirit of truth.", theme: "The Abiding Comforter", reflection: "The Holy Spirit walks alongside us as our eternal Advocate, Guide, and Counselor." },
    { ref: "1 Corinthians 12:7", text: "But the manifestation of the Spirit is given to every man to profit withal.", theme: "Spiritual Gifts", reflection: "Every believer is endowed with gifts of the Spirit for the edification of the Body." },
    { ref: "Acts 4:31", text: "And when they had prayed, the place was shaken where they were assembled together; and they were all filled with the Holy Ghost, and they spake the word of God with boldness.", theme: "Shaking Power", reflection: "Earnest corporate prayer releases fresh waves of holy boldness." }
  ],
  "peniel": [
    { ref: "Genesis 32:26", text: "And he said, Let me go, for the day breaketh. And he said, I will not let thee go, except thou bless me.", theme: "Holy Tenacity in Prayer", reflection: "Refuse to surrender in prayer until God's blessing and purpose are sealed in your spirit." },
    { ref: "Hosea 12:4", text: "Yea, he had power over the angel, and prevailed: he wept, and made supplication unto him.", theme: "Prevailing in Supplication", reflection: "Tears of surrender and brokenness are the true currency of spiritual prevailing." },
    { ref: "Ephesians 4:22–24", text: "That ye put off concerning the former conversation the old man... And be renewed in the spirit of your mind; And that ye put on the new man.", theme: "Putting on the New Man", reflection: "Peniel represents stripping off the old fleshly nature and donning the new creation in Christ." },
    { ref: "Galatians 2:20", text: "I am crucified with Christ: nevertheless I live; yet not I, but Christ liveth in me.", theme: "Crucified and Reborn", reflection: "When self-will dies, the supernatural life of Christ bursts forth." }
  ],
  "cave-of-adullam": [
    { ref: "Psalm 142:1–7", text: "I cried unto the LORD with my voice... Bring my soul out of prison, that I may praise thy name: the righteous shall compass me about.", theme: "David's Prayer in the Cave", reflection: "Poured out in the dark cave of Adullam, this psalm shows how honest lament turns into triumphant praise." },
    { ref: "Psalm 57:1", text: "Be merciful unto me, O God, be merciful unto me: for my soul trusteth in thee: yea, in the shadow of thy wings will I make my refuge, until these calamities be overpast.", theme: "Refuge in Calamity", reflection: "When surrounded by adversaries, make the shadow of God's wings your impenetrable fortress." },
    { ref: "1 Samuel 22:4", text: "And he brought them before the king of Moab: and they dwelt with him all the while that David was in the hold.", theme: "Honoring Family in Crisis", reflection: "Even in times of personal danger, David prioritized caring for his parents and brethren." },
    { ref: "James 1:2–4", text: "My brethren, count it all joy when ye fall into divers temptations; Knowing this, that the trying of your faith worketh patience.", theme: "Character Forged in Fire", reflection: "Adullam's trials are the workshop of spiritual maturity and patience." }
  ],
  "fair-havens": [
    { ref: "Psalm 32:8", text: "I will instruct thee and teach thee in the way which thou shalt go: I will guide thee with mine eye.", theme: "Guided by His Eye", reflection: "Keep your gaze fixed on Jesus, and He will gently direct your footsteps." },
    { ref: "Isaiah 58:11", text: "And the LORD shall guide thee continually, and satisfy thy soul in drought, and make fat thy bones.", theme: "Continual Divine Guidance", reflection: "God does not guide sporadically; He leads His children continually through every dry terrain." },
    { ref: "Jeremiah 29:11", text: "For I know the thoughts that I think toward you, saith the LORD, thoughts of peace, and not of evil, to give you an expected end.", theme: "God's Future for You", reflection: "Even during temporary layovers and confusing detours, God's destination for you is good and secure." },
    { ref: "Acts 27:23–24", text: "For there stood by me this night the angel of God, whose I am, and whom I serve, Saying, Fear not, Paul; thou must be brought before Caesar.", theme: "Angelic Assurance in the Storm", reflection: "God's assignment for your life is storm-proof. You will fulfill your divine destiny." }
  ],
  "wilderness": [
    { ref: "Exodus 16:4", text: "Then said the LORD unto Moses, Behold, I will rain bread from heaven for you; and the people shall go out and gather a certain rate every day.", theme: "Daily Heavenly Manna", reflection: "God teaches us to live on daily grace. Do not hoard tomorrow's anxiety; receive today's manna." },
    { ref: "Hosea 2:14", text: "Therefore, behold, I will allure her, and bring her into the wilderness, and speak comfortably unto her.", theme: "Wooed into Intimacy", reflection: "God sometimes leads us into quiet wilderness seasons so He can whisper His deepest love to our hearts." },
    { ref: "Isaiah 43:19", text: "Behold, I will do a new thing; now it shall spring forth; shall ye not know it? I will even make a way in the wilderness, and rivers in the desert.", theme: "Rivers in the Desert", reflection: "God can turn your barren desert into a flourishing oasis of revival." },
    { ref: "Psalm 78:19", text: "Yea, they spake against God; they said, Can God furnish a table in the wilderness?", theme: "A Table in the Wilderness", reflection: "Yes, God can prepare a banquet of spiritual abundance in the most desolate circumstances." }
  ],
  "mount-carmel": [
    { ref: "1 Kings 18:21", text: "And Elijah came unto all the people, and said, How long halt ye between two opinions? if the LORD be God, follow him: but if Baal, then follow him.", theme: "Rejecting Double-Mindedness", reflection: "A divided heart cannot experience God's fullness. Stand firmly on the side of truth." },
    { ref: "Jeremiah 20:9", text: "Then I said, I will not make mention of him, nor speak any more in his name. But his word was in mine heart as a burning fire shut up in my bones.", theme: "Fire in the Bones", reflection: "God's Word is an unquenchable flame that burns away compromise and timidity." },
    { ref: "Hebrews 12:29", text: "For our God is a consuming fire.", theme: "Our Consuming God", reflection: "God consumes our sin, our fears, and our idols, purifying our lives for His glory." },
    { ref: "1 Kings 18:41", text: "And Elijah said unto Ahab, Get thee up, eat and drink; for there is a sound of abundance of rain.", theme: "Sound of Abundance of Rain", reflection: "After the fire falls, the rain of revival follows. Hear by faith what God is about to pour out." }
  ],
  "gethsemane": [
    { ref: "Luke 22:42", text: "Saying, Father, if thou be willing, remove this cup from me: nevertheless not my will, but thine, be done.", theme: "Absolute Submission", reflection: "Surrender is not weakness; it is the ultimate expression of faith and love toward the Father." },
    { ref: "Philippians 2:8", text: "And being found in fashion as a man, he humbled himself, and became obedient unto death, even the death of the cross.", theme: "The Humility of the Cross", reflection: "Christ's obedience is our supreme pattern of humble self-giving." },
    { ref: "1 Peter 5:7", text: "Casting all your care upon him; for he careth for you.", theme: "Casting Every Care", reflection: "Throw the weight of your soul onto Jesus, who carried the agony of Gethsemane on your behalf." },
    { ref: "Romans 12:1", text: "I beseech you therefore, brethren, by the mercies of God, that ye present your bodies a living sacrifice, holy, acceptable unto God.", theme: "Living Sacrifice", reflection: "Lay your life on the altar of daily obedience as a pleasing spiritual offering." }
  ],
  "bethlehem": [
    { ref: "Luke 2:10–11", text: "And the angel said unto them, Fear not: for, behold, I bring you good tidings of great joy, which shall be to all people. For unto you is born this day in the city of David a Saviour, which is Christ the Lord.", theme: "Good Tidings of Great Joy", reflection: "The Gospel is not bad news of condemnation, but good tidings of unquenchable joy." },
    { ref: "John 1:14", text: "And the Word was made flesh, and dwelt among us, (and we beheld his glory, the glory as of the only begotten of the Father,) full of grace and truth.", theme: "The Word Made Flesh", reflection: "God came near, clothed in human form, bringing infinite grace and unwavering truth." },
    { ref: "Zechariah 4:10", text: "For who hath despised the day of small things?", theme: "Honoring Small Beginnings", reflection: "A humble manger in Bethlehem conquered world empires. Never doubt small, holy beginnings." }
  ],
  "jericho": [
    { ref: "Hebrews 11:30", text: "By faith the walls of Jericho fell down, after they were compassed about seven days.", theme: "Faith that Topples Walls", reflection: "Persistent faith marches in obedience even when walls look impregnable on day one, two, and six." },
    { ref: "Psalm 47:1", text: "O clap your hands, all ye people; shout unto God with the voice of triumph.", theme: "The Voice of Triumph", reflection: "Shout with the voice of victory before the final outcome manifests physically." },
    { ref: "Romans 8:37", text: "Nay, in all these things we are more than conquerors through him that loved us.", theme: "More than Conquerors", reflection: "You do not fight for victory; you fight from the accomplished victory of Jesus Christ." }
  ],
  "bethany": [
    { ref: "John 12:3", text: "Then took Mary a pound of ointment of spikenard, very costly, and anointed the feet of Jesus, and wiped his feet with her hair: and the house was filled with the odour of the ointment.", theme: "Extravagant Worship", reflection: "True love holds nothing back. Pour out your costliest praise at the feet of the Master." },
    { ref: "John 15:15", text: "Henceforth I call you not servants; for the servant knoweth not what his lord doeth: but I have called you friends.", theme: "Friends of the King", reflection: "Jesus invites you into holy friendship and confidential communion with Himself." },
    { ref: "Psalm 133:1", text: "Behold, how good and how pleasant it is for brethren to dwell together in unity!", theme: "The Blessing of Unity", reflection: "Where believers dwell in harmony and love, the Lord commands His blessing." }
  ],
  "mount-zion": [
    { ref: "Psalm 48:1–2", text: "Great is the LORD, and greatly to be praised in the city of our God, in the mountain of his holiness. Beautiful for situation, the joy of the whole earth, is mount Zion.", theme: "The Joy of the Whole Earth", reflection: "Zion represents the dwelling place of holiness, beauty, and eternal praise." },
    { ref: "Revelation 14:1", text: "And I looked, and, lo, a Lamb stood on the mount Sion, and with him an hundred forty and four thousand, having his Father's name written in their foreheads.", theme: "The Triumphant Lamb", reflection: "Christ stands victorious on Mount Zion, sealing His redeemed with His holy Name." },
    { ref: "Psalm 132:13–14", text: "For the LORD hath chosen Zion; he hath desired it for his habitation. This is my rest for ever: here will I dwell; for I have desired it.", theme: "God's Chosen Habitation", reflection: "God chooses the humble worshipper as His eternal dwelling place." }
  ],
  "the-valley": [
    { ref: "Psalm 84:6", text: "Who passing through the valley of Baca make it a well; the rain also filleth the pools.", theme: "From Weeping to Wells", reflection: "Even in the Valley of Weeping (Baca), God gives you grace to dig wells of living water for others." },
    { ref: "Hosea 2:15", text: "And I will give her her vineyards from thence, and the valley of Achor for a door of hope.", theme: "A Door of Hope in Trouble", reflection: "The Valley of Trouble (Achor) is transformed by grace into an open door of hope and deliverance." },
    { ref: "Romans 8:38–39", text: "For I am persuaded, that neither death, nor life... nor any other creature, shall be able to separate us from the love of God, which is in Christ Jesus our Lord.", theme: "Inseparable Love", reflection: "No valley, no shadow, and no distress can ever sever you from the love of God in Christ Jesus." }
  ],
  "house-of-prayer": [
    { ref: "Matthew 7:7–8", text: "Ask, and it shall be given you; seek, and ye shall find; knock, and it shall be opened unto you: For every one that asketh receiveth.", theme: "Ask, Seek, Knock", reflection: "Persistence in prayer opens the treasure rooms of Heaven." },
    { ref: "Philippians 4:6–7", text: "Be careful for nothing; but in every thing by prayer and supplication with thanksgiving let your requests be made known unto God. And the peace of God... shall keep your hearts and minds.", theme: "Anxiety Exchanged for Peace", reflection: "Bring every anxious concern to God in prayer, and His peace will guard your heart like a garrison." },
    { ref: "James 5:16", text: "The effectual fervent prayer of a righteous man availeth much.", theme: "Effectual Fervent Prayer", reflection: "Heartfelt, righteous prayer releases dynamic, world-changing spiritual power." }
  ],
  "emmaus": [
    { ref: "Luke 24:45", text: "Then opened he their understanding, that they might understand the scriptures.", theme: "Understanding Opened", reflection: "Ask Jesus to open your mind to understand the deep mysteries of His Word." },
    { ref: "John 5:39", text: "Search the scriptures; for in them ye think ye have eternal life: and they are they which testify of me.", theme: "Scriptures Testify of Christ", reflection: "Every page of Scripture points to the glory, sacrifice, and victory of Jesus Christ." },
    { ref: "Psalm 119:105", text: "Thy word is a lamp unto my feet, and a light unto my path.", theme: "Lamp to Our Feet", reflection: "God's Word provides practical illumination for every step of your journey." }
  ],
  "bethel": [
    { ref: "Genesis 35:3", text: "And let us arise, and go up to Beth-el; and I will make there an altar unto God, who answered me in the day of my distress, and was with me in the way which I went.", theme: "Returning to Bethel", reflection: "Return to the place of your first love and remember the God who heard your cry in the day of distress." },
    { ref: "Psalm 103:2", text: "Bless the LORD, O my soul, and forget not all his benefits.", theme: "Remembering All His Benefits", reflection: "Keep an active ledger of God's deliverances and answered prayers." },
    { ref: "1 Samuel 7:12", text: "Then Samuel took a stone, and set it between Mizpeh and Shen, and called the name of it Ebenezer, saying, Hitherto hath the LORD helped us.", theme: "The Ebenezer Stone", reflection: "Erect your Ebenezer today: 'Hitherto hath the Lord helped us, and He will finish what He started.'" }
  ]
};

// Storage Key for Creator Custom/Edited Places
const STORAGE_PLACES_KEY = "founder_spiritual_places_v1";
const STORAGE_CUSTOM_SCRIPTURES_KEY = "founder_places_custom_scriptures_v1";

export function getAllSpiritualPlaces(): SpiritualPlace[] {
  let list: SpiritualPlace[] = DEFAULT_SPIRITUAL_PLACES;
  try {
    const raw = localStorage.getItem(STORAGE_PLACES_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        list = parsed;
      }
    }
  } catch (e) {
    console.warn("Error reading spiritual places from storage:", e);
  }

  // Deduplicate items strictly by unique id
  const seenIds = new Set<string>();
  const uniqueList: SpiritualPlace[] = [];
  for (const place of list) {
    if (place && place.id && !seenIds.has(place.id)) {
      seenIds.add(place.id);
      uniqueList.push(place);
    }
  }

  return uniqueList.sort((a, b) => a.displayOrder - b.displayOrder);
}

export function saveSpiritualPlaces(places: SpiritualPlace[]): void {
  try {
    localStorage.setItem(STORAGE_PLACES_KEY, JSON.stringify(places));
  } catch (e) {
    console.warn("Error saving spiritual places:", e);
  }
}

export function getAllPlaceScriptures(): PlaceScripture[] {
  let list = [...CURATED_PLACE_SCRIPTURES];
  try {
    const rawCustom = localStorage.getItem(STORAGE_CUSTOM_SCRIPTURES_KEY);
    if (rawCustom) {
      const parsed = JSON.parse(rawCustom);
      if (Array.isArray(parsed)) {
        list = [...list, ...parsed];
      }
    }
  } catch (e) {
    console.warn("Error reading custom place scriptures:", e);
  }
  return list;
}

export function saveCustomPlaceScripture(scripture: PlaceScripture): void {
  try {
    const raw = localStorage.getItem(STORAGE_CUSTOM_SCRIPTURES_KEY);
    const existing: PlaceScripture[] = raw ? JSON.parse(raw) : [];
    const updated = [scripture, ...existing.filter((s) => s.id !== scripture.id)];
    localStorage.setItem(STORAGE_CUSTOM_SCRIPTURES_KEY, JSON.stringify(updated));
  } catch (e) {
    console.warn("Error saving custom place scripture:", e);
  }
}

// Get all matching scriptures for a given Spiritual Place ID
export function getScripturesForPlace(placeId: string): PlaceScripture[] {
  const allScriptures = getAllPlaceScriptures();
  const directMatches = allScriptures.filter((s) => s.placeIds.includes(placeId));

  // If there are specific topic expansions in our database, merge them dynamically
  const expansions = SCRIPTURE_TOPIC_EXPANSIONS[placeId] || [];
  const expandedMatches: PlaceScripture[] = expansions.map((exp, idx) => {
    const parts = exp.ref.split(" ");
    const book = parts.slice(0, -1).join(" ") || parts[0];
    const chVer = parts[parts.length - 1]?.split(":") || ["1", "1"];
    const ch = parseInt(chVer[0], 10) || 1;
    const v = parseInt(chVer[1]?.split("–")[0] || "1", 10) || 1;

    return {
      id: `exp-${placeId}-${idx}`,
      placeIds: [placeId],
      book,
      chapter: ch,
      verse: v,
      reference: exp.ref,
      text: exp.text,
      testament: ["Matthew", "Mark", "Luke", "John", "Acts", "Romans", "Corinthians", "Galatians", "Ephesians", "Philippians", "Colossians", "Thessalonians", "Timothy", "Titus", "Philemon", "Hebrews", "James", "Peter", "John", "Jude", "Revelation"].some(b => book.includes(b)) ? "New Testament" : "Old Testament",
      theme: exp.theme,
      keywords: [placeId, ...exp.theme.toLowerCase().split(" ")],
      relevanceScore: 92 - idx,
      devotionalReflection: exp.reflection,
      guidedPrayerPrompt: `Lord, let Your truth in ${exp.ref} illuminate my path and strengthen my soul today.`
    };
  });

  const combined = [...directMatches, ...expandedMatches];

  // If no direct or expanded match exists for this place ID, find matching thematic scriptures from the catalog
  if (combined.length === 0) {
    const place = DEFAULT_SPIRITUAL_PLACES.find((p) => p.id === placeId);
    if (place) {
      const thematicMatches = allScriptures.filter((s) =>
        place.themes.some((t) => s.theme.toLowerCase().includes(t.toLowerCase()) || s.keywords.some((k) => t.toLowerCase().includes(k.toLowerCase())))
      );

      if (thematicMatches.length > 0) {
        return thematicMatches.slice(0, 10);
      }

      // Generate a primary scripture from the place's own biblical reference
      return [
        {
          id: `place-canon-${place.id}`,
          placeIds: [place.id],
          book: place.biblicalReference.split(" ")[0] || "Psalms",
          chapter: 1,
          verse: 1,
          reference: place.biblicalReference,
          text: place.description,
          testament: place.biblicalReference.includes("Acts") || place.biblicalReference.includes("Matthew") || place.biblicalReference.includes("John") || place.biblicalReference.includes("Luke") || place.biblicalReference.includes("Revelation") || place.biblicalReference.includes("Corinthians") || place.biblicalReference.includes("Hebrews") ? "New Testament" : "Old Testament",
          theme: place.badgeText || "Faith & Provision",
          keywords: [place.id, ...place.themes.map((t) => t.toLowerCase())],
          relevanceScore: 95,
          devotionalReflection: `Walk in the spiritual reality of ${place.name}. ${place.spiritualMeaning} Meditate on God's enduring faithfulness and allow His Word to renew your heart.`,
          guidedPrayerPrompt: `Heavenly Father, as I reflect on ${place.name}, anchor my faith in Your promises and guide my steps according to Your perfect will. In Jesus' Name, Amen.`
        }
      ];
    }
  }

  // Sort by relevance score descending
  return combined.sort((a, b) => b.relevanceScore - a.relevanceScore);
}


// Weighted random selector ensuring non-repetition in active session
export function getRandomScriptureForPlace(
  placeId: string,
  excludedIds: string[] = []
): PlaceScripture {
  const list = getScripturesForPlace(placeId);
  if (list.length === 0) {
    return CURATED_PLACE_SCRIPTURES[0];
  }

  // Filter out recent excluded IDs if possible
  const eligible = list.filter((s) => !excludedIds.includes(s.id));
  const pool = eligible.length > 0 ? eligible : list;

  // Weighted random favoring higher relevance scores
  // Compute total weights
  const totalWeight = pool.reduce((acc, curr) => acc + Math.max(10, curr.relevanceScore), 0);
  let randomVal = Math.random() * totalWeight;

  for (const item of pool) {
    const weight = Math.max(10, item.relevanceScore);
    if (randomVal <= weight) {
      return item;
    }
    randomVal -= weight;
  }

  return pool[Math.floor(Math.random() * pool.length)];
}
