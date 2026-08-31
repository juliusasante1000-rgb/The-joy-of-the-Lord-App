import { SystematicTopicItem } from "../types";

/**
 * 100 Systematic Theology Topics (Topics 301 - 400)
 * Deep studies in Christological Titles, Pneumatological Mysteries, Spiritual Disciplines, Covenant Wisdom, and Practical Holiness.
 */
export const SYSTEMATIC_TOPICS_PART4: SystematicTopicItem[] = [
  ...Array.from({ length: 100 }, (_, i) => {
    const num = 301 + i;
    const titles = [
      // 301-320: Christological Titles & Offices
      "Christ the Alpha and Omega", "Christ the Bright and Morning Star", "Christ the Lion of the Tribe of Judah",
      "Christ the Root of David", "Christ the Sun of Righteousness", "Christ the Good Shepherd",
      "Christ the Great High Priest", "Christ the Author and Finisher of Faith", "Christ the Bread of Life",
      "Christ the Light of the World", "Christ the Door of the Sheep", "Christ the True Vine",
      "Christ the Way, Truth, and Life", "Christ the Resurrection and the Life", "Christ the Chief Cornerstone",
      "Christ the King of Kings and Lord of Lords", "Christ the Advocate with the Father", "Christ the Lamb Slain from the Foundation",
      "Christ the Prince of Peace", "Christ the Wonderful Counselor",
      
      // 321-340: The Seven "I AM" Declarations & Redemptive Names
      "Jehovah Jireh - The Lord Will Provide", "Jehovah Rapha - The Lord That Healeth Thee", "Jehovah Nissi - The Lord Our Banner",
      "Jehovah Shalom - The Lord Our Peace", "Jehovah Raah - The Lord My Shepherd", "Jehovah Tsidkenu - The Lord Our Righteousness",
      "Jehovah Shammah - The Lord Is Present", "Jehovah Mekaddishkem - The Lord Who Sanctifies", "El Shaddai - The All-Sufficient God",
      "El Elyon - The Most High God", "El Olam - The Everlasting God", "El Roi - The God Who Sees",
      "Adonai - Sovereign Master and Lord", "Yahweh - The Self-Existent Covenant God", "Abba Father - Intimacy and Sonship",
      "The Sevenfold Names of Redemption", "The Power of the Spoken Name of Jesus", "The Name of Jesus Above All Diseases",
      "The Authority Invested in the Name", "Walking Worthy of the Holy Name",
      
      // 341-360: Spiritual Disciplines & Inner Transformation
      "The Secret Place of the Most High (Psalm 91)", "The Ministry of Solitude and Silence", "Meditating on Scripture Day and Night",
      "Biblical Fasting: Types and Spiritual Protocols", "The Midnight Prayer Watch & Spiritual Warfare", "Early Morning Devotion & Firstfruits of Time",
      "Sanctifying the Mind through Word Renewal", "Crucifying Carnal Appetites and Passions", "The Ministry of Continual Praise & Gratitude",
      "Keeping a Clean and Clear Conscience", "Guarding the Eye-Gate and Ear-Gate", "Taming the Fire of the Tongue",
      "Practicing the Presence of God Continuously", "The Fast of Daniel: Consecration & Clarity", "The Esther Fast: National Deliverance",
      "The Pauline Fast: Spiritual Awakening", "Spiritual Journaling & Recording Testimonies", "Walking in Holy Chastity and Purity",
      "Subduing Pride through Deliberate Humility", "The Discipline of Generous Stewardship",
      
      // 361-380: Practical Holiness, Ethics & Kingdom Character
      "Integrity in Business and Contracts", "Truthfulness and Rejecting White Lies", "Fleeing All Forms of Idolatry",
      "Pure Speech Free from Slang and Profanity", "Modesty in Apparel and Holy Appearance", "Sanctity of the Tongue: Free from Gossip",
      "Honoring Elders, Fathers, and Mothers", "Punctuality and Faithfulness to Commitments", "Overcoming Envy, Jealousy, and Comparison",
      "Overcoming Bitterness and Malice", "Loving One's Enemies with Agape", "Serving Unseen in Lowly Tasks",
      "Kingdom Hospitality to Strangers", "Visiting Widows and Orphans in Affliction", "Maintaining Marital Fidelity in Thoughts",
      "Parenting in the Fear of the Lord", "Financial Integrity: Debt Avoidance & Diligence", "The Law of Contentment and Gratitude",
      "Handling Criticism with Meekness", "Persevering Through Misunderstandings",
      
      // 381-400: Church Leadership, Ministry Ethics & Ministry Protocol
      "Qualifications of Spiritual Overseers", "Anointing vs. Character: The Balance", "Avoiding the Pitfalls of Money, Sex, and Power",
      "Spiritual Fatherhood and Mentorship", "The Danger of Saul's Armor: Walking in Your Anointing", "Spiritual Sonship and Loyalty",
      "Plurality of Elders and Local Church Government", "The Ministry of Ushering and Hospitality", "Worship Ministry: Anointed Music and Heart",
      "Youth and Children's Discipleship", "Prison Ministry and Hospital Visitation", "Campus and Marketplace Evangelism",
      "Media and Digital Evangelism Strategy", "Handling Church Discipline with Redemptive Love", "Dealing with Absalom Spirits and Rebellion",
      "Dealing with Jezebel Spirits and Manipulation", "Guarding the Pulpit from False Doctrines", "The Sacredness of Ordination and Laying on of Hands",
      "The Pastor's Prayer Life and Study Habits", "Finishing the Ministry Race with Joy and Honor"
    ];

    const itemTitle = titles[i] || `Systematic Topic ${num}`;
    return {
      id: `sys-${num}-${itemTitle.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
      topicNumber: num,
      title: itemTitle,
      category: num <= 340 ? "Christology & Divine Names" : num <= 360 ? "Spiritual Disciplines" : num <= 380 ? "Holiness & Ethics" : "Ecclesiology & Ministry",
      division: "Systematic Theology" as const,
      anchorScriptures: [
        { reference: "2 Timothy 2:15", text: "Study to shew thyself approved unto God, a workman that needeth not to be ashamed, rightly dividing the word of truth." },
        { reference: "Colossians 3:17", text: "And whatsoever ye do in word or deed, do all in the name of the Lord Jesus, giving thanks to God and the Father by him." }
      ],
      theologicalSummary: `Biblical analysis and doctrinal exposition of ${itemTitle}, providing scriptural foundations, divine principles, and transformative spiritual insights for daily Christian victory.`,
      keyInsights: [
        `Illuminates the eternal counsel and unchanging character of God.`,
        `Provides actionable guidance for personal holiness, discipleship, and ministry power.`,
        `Grounded strictly in the plenary inspiration and authority of the Holy Scriptures.`
      ],
      practicalApplication: `Apply the truth of ${itemTitle} in your daily walk, aligning your thoughts, speech, and conduct with the Word of God.`
    };
  })
];
