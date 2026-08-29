import { StructuredPrayer } from "../types";

const BASE_STRUCTURED_PRAYERS: StructuredPrayer[] = [
  {
    id: "pray-morning-blessing",
    category: "Daily Hours",
    edition: "morning",
    theme: "Morning Firstfruits & Consecration",
    title: "Morning Covenant Prayer of Consecration",
    subtitle: "Firstfruits of praise, laying down anxious strivings, and putting on the Armor of Light.",
    suggestedScriptures: ["Psalm 143:8", "Lamentations 3:22-23", "Romans 13:12"],
    sections: {
      adoration: "Eternal and sovereign Father, Creator of the dawn and sustainer of all life, You are holy, righteous, and full of infinite lovingkindness. I adore You for Your faithfulness that is new every morning.",
      confessionAndSurrender: "Lord, I lay down all self-reliance and confess my total dependence upon You. Forgive me for every anxious thought, and cleanse my heart from anything that does not honor Your holy name.",
      thanksgiving: "Thank You for the gift of this new day, for the breath in my lungs, and for the finished work of Jesus Christ on the cross that guarantees my eternal salvation and present peace.",
      scripturePromise: "Psalm 143:8 - Cause me to hear thy lovingkindness in the morning; for in thee do I trust: cause me to know the way wherein I should walk; for I lift up my soul unto thee.",
      petition: "Grant me divine wisdom for every conversation today, discernment for every decision, and supernatural protection over my coming and going. Order my steps according to Your holy Word.",
      spiritualWarfare: "In the mighty name of Jesus Christ, I renounce every scheme of the adversary. I put on the Helmet of Salvation and the Breastplate of Righteousness. No weapon formed against me or my household shall prosper.",
      declarationInJesusName: "I step into this day knowing that the Joy of the Lord is my strength and unshakeable fortress. For Thine is the kingdom, the power, and the glory forever. In Jesus' holy name, Amen."
    }
  },
  {
    id: "pray-afternoon-strength",
    category: "Daily Hours",
    edition: "afternoon",
    theme: "Midday Renewal & Perseverance",
    title: "Noontime Prayer for Supernatural Strength",
    subtitle: "Re-centering your heart at high noon, renewing physical and spiritual vitality, and finishing the day strong.",
    suggestedScriptures: ["Isaiah 40:29-31", "Galatians 6:9", "Psalm 55:17"],
    sections: {
      adoration: "O Lord God Almighty, You never faint nor grow weary. Your understanding is unsearchable, and Your grace is inexhaustible across all generations.",
      confessionAndSurrender: "Where mental weariness, irritation, or hurried impatience has crept into my soul this day, I ask for Your forgiveness and surrender my fatigue into Your hands.",
      thanksgiving: "I praise You for carrying me through the morning hours and providing for every need according to Your riches in glory by Christ Jesus.",
      scripturePromise: "Isaiah 40:29 - He giveth power to the faint; and to them that have no might he increaseth strength.",
      petition: "Pour fresh oil and renewed vitality into my mind, body, and spirit right now. Let the peace of Christ rule in my heart so I can finish today's tasks with joy and excellence.",
      spiritualWarfare: "I resist the spirit of sloth, distraction, and frustration in Jesus' authority. My mind is alert, guarded by the peace of God which surpasses all understanding.",
      declarationInJesusName: "They that wait upon the Lord shall renew their strength! I soar on wings like eagles this afternoon. In the name of Jesus Christ, Amen."
    }
  },
  {
    id: "pray-evening-peace",
    category: "Daily Hours",
    edition: "evening",
    theme: "Nightfall Rest & Angelic Protection",
    title: "Evening Prayer of Rest & Divine Shelter",
    subtitle: "Casting the burdens of the day at the Cross, invoking Psalm 91 protection, and resting in peace.",
    suggestedScriptures: ["Psalm 91:1-4", "Psalm 4:8", "Proverbs 3:24"],
    sections: {
      adoration: "Heavenly Father, You are my dwelling place and my refuge. Day unto day utters speech, and night unto night shows knowledge of Your glorious majesty.",
      confessionAndSurrender: "I bring to You all the unfinished business, stresses, and shortcomings of this day. I release them into Your hands, knowing You are sovereign over tomorrow.",
      thanksgiving: "Thank You for shielding my life, for the meals provided, the work accomplished, and the lovingkindness that surrounded me at every turn today.",
      scripturePromise: "Psalm 91:4 - He shall cover thee with his feathers, and under his wings shalt thou trust: his truth shall be thy shield and buckler.",
      petition: "Grant peaceful, restorative sleep to me and my family tonight. Free our minds from all night terrors, troublesome dreams, or anxious thoughts.",
      spiritualWarfare: "By the blood of Jesus, I seal the doors of my home and mind. I thank You that Your holy angels encamp around those who fear You to deliver and protect them.",
      declarationInJesusName: "I will both lay me down in peace and sleep, for You alone, Lord, make me dwell in safety. In the matchless name of Jesus, Amen."
    }
  },
  {
    id: "pray-spiritual-warfare",
    category: "Spiritual Warfare",
    theme: "Victory in Christ & Pulling Down Strongholds",
    title: "Targeted Spiritual Warfare & Armor of God Prayer",
    subtitle: "Taking up the full Armor of God and standing in the authority of Christ's Resurrection against darkness.",
    suggestedScriptures: ["Ephesians 6:10-18", "2 Corinthians 10:4-5", "Luke 10:19"],
    sections: {
      adoration: "Lord God of Hosts, King of kings and Lord of lords! Jesus Christ, You have triumphed over all principalities and powers, disarming them openly through Your holy Cross and Resurrection.",
      confessionAndSurrender: "I humble myself before Your mighty hand. I renounce all agreements with the adversary, all bitterness, pride, and compromise in my thoughts.",
      thanksgiving: "I thank You that greater is He who is in me than he who is in the world! You have given me authority to trample on serpents and scorpions, and over all the power of the enemy.",
      scripturePromise: "Ephesians 6:11 - Put on the whole armour of God, that ye may be able to stand against the wiles of the devil.",
      petition: "Clothe me right now with the Belt of Truth, the Breastplate of Righteousness, the Gospel of Peace, the Shield of Faith, the Helmet of Salvation, and the Sword of the Spirit.",
      spiritualWarfare: "In the mighty name of Jesus Christ, I pull down every demonic stronghold of fear, anxiety, sickness, division, and doubt. Every assignment of darkness against my destiny is cancelled by the Blood of the Lamb.",
      declarationInJesusName: "I am more than a conqueror through Christ who loved me! The Lord is my light and my salvation, whom shall I fear? In Jesus' victorious name, Amen."
    }
  },
  {
    id: "pray-healing-health",
    category: "Healing & Health",
    theme: "Divine Health & Restorative Wholeness",
    title: "Prayer for Healing and Wholeness in Christ",
    subtitle: "Laying claim to Christ's atonement for physical, emotional, and spiritual healing and renewal.",
    suggestedScriptures: ["1 Peter 2:24", "Isaiah 53:5", "Psalm 103:2-3"],
    sections: {
      adoration: "Jehovah Rapha, the Lord who heals me! You are the Great Physician who formed my body and knows every cell, bone, and breath of my being.",
      confessionAndSurrender: "Lord, I surrender my physical weakness and health concerns into Your healing hands. Forgive my stress and help me honor my body as the temple of the Holy Spirit.",
      thanksgiving: "I thank You that Jesus carried my griefs and bore my sicknesses on the cross of Calvary, and by His stripes healing is made available to me.",
      scripturePromise: "1 Peter 2:24 - Who his own self bare our sins in his own body on the tree... by whose stripes ye were healed.",
      petition: "Send forth Your healing Word and heal every affliction in my body, mind, and emotions. Restore vitality, renew cellular health, and strengthen my immune system.",
      spiritualWarfare: "I rebuke every spirit of infirmity, chronic pain, and disease in the name of Jesus Christ. I command every cell in my body to align with the divine order of God.",
      declarationInJesusName: "The Spirit of Him who raised Jesus from the dead dwells in me, giving life to my mortal body! I walk in divine health and strength. Amen."
    }
  },
  {
    id: "pray-peace-anxiety",
    category: "Peace & Anxiety",
    theme: "Casting Cares & Divine Peace",
    title: "Prayer for Breaking Anxiety and Receiving Christ's Peace",
    subtitle: "Overcoming panic, dread, and sleeplessness by fixing your mind on God's perfect peace.",
    suggestedScriptures: ["Philippians 4:6-7", "2 Timothy 1:7", "Isaiah 26:3"],
    sections: {
      adoration: "Prince of Peace, King of Glory, Your presence calms every raging tempest and quiets the restless waves of my heart.",
      confessionAndSurrender: "I confess that I have allowed worry, overthinking, and fear of the future to rob my peace. I cast every burden and anxious thought at the foot of Your Cross.",
      thanksgiving: "Thank You that You care affectionately and watchfully over me. Thank You that my future is securely held in Your sovereign hands.",
      scripturePromise: "Philippians 4:6-7 - Be careful for nothing; but in every thing by prayer and supplication with thanksgiving let your requests be made known unto God.",
      petition: "Fill the rooms of my mind with Your supernatural tranquility. Let Your peace, which surpasses all human comprehension, stand guard over my heart and mind.",
      spiritualWarfare: "I break the power of panic, dread, and spirit of fear in Jesus' name. God has not given me a spirit of fear, but of power, love, and a sound mind.",
      declarationInJesusName: "Thou wilt keep him in perfect peace, whose mind is stayed on thee: because he trusteth in thee. I rest in Your perfect love. Amen."
    }
  },
  {
    id: "pray-family-guidance",
    category: "Family & Guidance",
    theme: "Generational Covenant & Family Salvation",
    title: "Covenant Prayer for Family Salvation & Unity",
    subtitle: "Declaring Joshua 24:15 over your children, spouse, relatives, and generations to come.",
    suggestedScriptures: ["Joshua 24:15", "Acts 16:31", "Colossians 3:12-14"],
    sections: {
      adoration: "O Lord God of Abraham, Isaac, and Jacob, You are the God of generational covenants whose mercy endures to a thousand generations.",
      confessionAndSurrender: "Forgive us for every harsh word spoken in our home, every misunderstanding, and every lack of love. We invite Your Holy Spirit to rule over our family.",
      thanksgiving: "Thank You for the gift of family, for the loved ones You have entrusted to me, and for the promise that all my children shall be taught of the Lord.",
      scripturePromise: "Joshua 24:15 - As for me and my house, we will serve the Lord.",
      petition: "Draw every unsaved family member to repentance and faith in Jesus Christ. Soften hard hearts, heal broken relationships, and unite us in Christ-centered love.",
      spiritualWarfare: "I break the curse of division, strife, addiction, and spiritual blindness over my family lineage. Our home is consecrated as a sanctuary of prayer and peace.",
      declarationInJesusName: "Believe on the Lord Jesus Christ, and thou shalt be saved, and thy house! Our home belongs to the Lord. In Jesus' name, Amen."
    }
  }
];

import { generateAll400StructuredPrayers } from "./prayersFullCatalog";

// 400 Unique Structured Prayers for Prayer Studio & Daily Intercession
export const STRUCTURED_PRAYERS_CATALOG: StructuredPrayer[] = generateAll400StructuredPrayers(BASE_STRUCTURED_PRAYERS);

export const STRUCTURED_PRAYERS = STRUCTURED_PRAYERS_CATALOG;

