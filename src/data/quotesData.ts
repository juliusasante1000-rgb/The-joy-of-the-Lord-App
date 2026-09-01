export interface PersonalQuote {
  id: string;
  quote: string;
  category: "Destiny & Decisions" | "Purpose & Calling" | "Wisdom & Relationships" | "Grit & Endurance" | "Divine Favor & Joy" | "Mindset & Growth";
  biblicalAnchor?: string;
  keyPrinciple: string;
  reflectionNote?: string;
  tags: string[];
}

export const PERSONAL_QUOTES: PersonalQuote[] = [
  {
    id: "quote-1",
    quote: "In the face of desperation, any option is worth considering; however, one must be patient so as not to make wrong decisions out of desperation.",
    category: "Destiny & Decisions",
    biblicalAnchor: "Isaiah 28:16 — 'He that believeth shall not make haste.'",
    keyPrinciple: "Patience in Adversity",
    reflectionNote: "When pressures mount, human impulse rushes toward quick fixes. Godly patience protects your destiny from panic-driven regrets.",
    tags: ["Patience", "Decisions", "Wisdom", "Peace"]
  },
  {
    id: "quote-2",
    quote: "Do you know that those convincing you to make wrong decisions concerning your life will not be around to help you bear the consequences?",
    category: "Destiny & Decisions",
    biblicalAnchor: "Galatians 6:5 — 'For every man shall bear his own burden.'",
    keyPrinciple: "Personal Accountability",
    reflectionNote: "Unwise advisors vanish when the fallout arrives. Guard your counsel diligently and consult God's Word first.",
    tags: ["Counsel", "Accountability", "Discernment"]
  },
  {
    id: "quote-3",
    quote: "Yesterday is jealous, always wanting to reproduce itself in your life today/tomorrow if you don’t make bold decisions to end certain things.",
    category: "Destiny & Decisions",
    biblicalAnchor: "Philippians 3:13-14 — 'Forgetting those things which are behind, and reaching forth unto those things which are before.'",
    keyPrinciple: "Bold Severance of the Past",
    reflectionNote: "Old habits, past failures, and toxic cycles will dominate your tomorrow unless you draw a firm line in the present.",
    tags: ["Breakthrough", "Courage", "New Beginning"]
  },
  {
    id: "quote-4",
    quote: "Decisions decide destiny.",
    category: "Destiny & Decisions",
    biblicalAnchor: "Deuteronomy 30:19 — 'I have set before you life and death... therefore choose life.'",
    keyPrinciple: "The Power of Choice",
    reflectionNote: "Your life today is the harvest of yesterday's choices. Make choices governed by the Spirit to secure a fruitful tomorrow.",
    tags: ["Destiny", "Choices", "Leadership"]
  },
  {
    id: "quote-5",
    quote: "Our decisions in life are based on these three: Discernment * reasoning * emotions. Learn to blend them well to make a good decision in life.",
    category: "Destiny & Decisions",
    biblicalAnchor: "Proverbs 3:5-6 — 'Trust in the Lord with all thine heart; and lean not unto thine own understanding.'",
    keyPrinciple: "Harmonious Decision-Making",
    reflectionNote: "Spiritual discernment provides divine direction, sanctified reasoning verifies truth, and regulated emotions supply passion without steering the ship.",
    tags: ["Discernment", "Reasoning", "Emotional Intelligence"]
  },
  {
    id: "quote-6",
    quote: "Never make permanent decisions because of temporary feelings.",
    category: "Destiny & Decisions",
    biblicalAnchor: "Proverbs 14:29 — 'He that is slow to wrath is of great understanding.'",
    keyPrinciple: "Emotional Stability",
    reflectionNote: "Feelings are weather; covenants and commitments are bedrock. Never burn a bridge over a passing storm.",
    tags: ["Emotions", "Self-Control", "Wisdom"]
  },
  {
    id: "quote-7",
    quote: "Tomorrow is a gift to remedy the problems of yesterday.",
    category: "Mindset & Growth",
    biblicalAnchor: "Lamentations 3:22-23 — 'His compassions fail not. They are new every morning: great is thy faithfulness.'",
    keyPrinciple: "Daily Grace & Renewal",
    reflectionNote: "Each sunrise offers fresh mercy, new perspective, and an opportunity to rectify past mistakes with godly wisdom.",
    tags: ["Hope", "Mercy", "Renewal", "Grace"]
  },
  {
    id: "quote-8",
    quote: "Yesterday’s excellence is today’s mediocrity.",
    category: "Mindset & Growth",
    biblicalAnchor: "Proverbs 4:18 — 'The path of the just is as the shining light, that shineth more and more unto the perfect day.'",
    keyPrinciple: "Continuous Striving for Excellence",
    reflectionNote: "Resting on past laurels leads to stagnation. God's call demands continuous growth, sharper mastery, and deeper consecration.",
    tags: ["Excellence", "Growth", "Mastery"]
  },
  {
    id: "quote-9",
    quote: "Whatever you give your time to has taken a portion of your destiny because the unit of destiny is time.",
    category: "Purpose & Calling",
    biblicalAnchor: "Ephesians 5:15-16 — 'Redeeming the time, because the days are evil.'",
    keyPrinciple: "Time Stewardship as Destiny",
    reflectionNote: "Time is not merely clock ticks; it is the currency with which your eternal purpose is purchased. Invest it wisely.",
    tags: ["Time Management", "Stewardship", "Destiny"]
  },
  {
    id: "quote-10",
    quote: "Society has indoctrinated us to believe that serving the Lord is a disadvantage.",
    category: "Divine Favor & Joy",
    biblicalAnchor: "Psalm 84:10 — 'For a day in thy courts is better than a thousand. I had rather be a doorkeeper in the house of my God.'",
    keyPrinciple: "The High Privilege of Kingdom Service",
    reflectionNote: "Worldly systems mock consecration, yet walking with God brings transcendent joy, divine protection, and eternal reward.",
    tags: ["Service", "Faith", "Consecration"]
  },
  {
    id: "quote-11",
    quote: "Four expressions that can open any door:\n• God bless you\n• I am sorry\n• Thank you\n• Please",
    category: "Wisdom & Relationships",
    biblicalAnchor: "Colossians 4:6 — 'Let your speech be alway with grace, seasoned with salt.'",
    keyPrinciple: "The Power of Gracious Words",
    reflectionNote: "Humility, genuine gratitude, polite respect, and pronouncing divine blessings disarm conflict and open closed hearts.",
    tags: ["Kindness", "Humility", "Communication", "Relationships"]
  },
  {
    id: "quote-12",
    quote: "No one outgrows the need to be guided in life.",
    category: "Wisdom & Relationships",
    biblicalAnchor: "Proverbs 11:14 — 'Where no counsel is, the people fall: but in the multitude of counsellors there is safety.'",
    keyPrinciple: "Lifelong Teachability",
    reflectionNote: "The mark of true maturity is not self-sufficiency, but an unceasing hunger for godly wisdom, mentors, and the Holy Spirit's whisper.",
    tags: ["Mentorship", "Guidance", "Humility"]
  },
  {
    id: "quote-13",
    quote: "It is unprofitable to recall the past if it does no good to the present or the future.",
    category: "Mindset & Growth",
    biblicalAnchor: "Isaiah 43:18-19 — 'Remember ye not the former things, neither consider the things of old. Behold, I will do a new thing.'",
    keyPrinciple: "Productive Focus",
    reflectionNote: "Rehashing old offenses or mourning lost chances only paralyzes your forward momentum. Learn the lesson and press onward.",
    tags: ["Focus", "Freedom", "Healing"]
  },
  {
    id: "quote-14",
    quote: "GRIT – the persistence where you have a bad day and you get up the next day, still committed to your goal.",
    category: "Grit & Endurance",
    biblicalAnchor: "Proverbs 24:16 — 'For a just man falleth seven times, and riseth up again.'",
    keyPrinciple: "Unrelenting Resilience",
    reflectionNote: "Champions are not exempt from difficult days; they simply refuse to stay down when setbacks strike.",
    tags: ["Grit", "Resilience", "Persistence", "Strength"]
  },
  {
    id: "quote-15",
    quote: "Pay the price to maintain a good relationship even if it's ego-stinging.",
    category: "Wisdom & Relationships",
    biblicalAnchor: "Romans 12:18 — 'If it be possible, as much as lieth in you, live peaceably with all men.'",
    keyPrinciple: "Value of Covenant Peace",
    reflectionNote: "Pride loves to win arguments, but wisdom preserves precious souls. Sacrificing your ego to protect love is heavenly strength.",
    tags: ["Relationships", "Peace", "Love", "Humility"]
  },
  {
    id: "quote-16",
    quote: "Be tolerant: create room for the inefficiencies of men. Be accommodating: not everyone can be perfect like you. Avoid offence: the ease with which you get angry, irritated, or agitated.",
    category: "Wisdom & Relationships",
    biblicalAnchor: "Ephesians 4:2 — 'With all lowliness and meekness, with longsuffering, forbearing one another in love.'",
    keyPrinciple: "Longsuffering Grace",
    reflectionNote: "A broad heart accommodates human flaws without bitterness, recognizing how much patience God continually extends to us.",
    tags: ["Patience", "Tolerance", "Grace", "Maturity"]
  },
  {
    id: "quote-17",
    quote: "Avoid competitive jealousy, a weakness in men.",
    category: "Wisdom & Relationships",
    biblicalAnchor: "James 3:16 — 'For where envying and strife is, there is confusion and every evil work.'",
    keyPrinciple: "Deliverance from Envy",
    reflectionNote: "Your race is uniquely assigned by God. Celebrating another person's promotion never diminishes your own destiny.",
    tags: ["Contentment", "Integrity", "Brotherhood"]
  },
  {
    id: "quote-18",
    quote: "Your gentleness has made me great.",
    category: "Divine Favor & Joy",
    biblicalAnchor: "Psalm 18:35 — 'Thy gentleness hath made me great.'",
    keyPrinciple: "The Elevating Gentleness of God",
    reflectionNote: "It is not harshness or brute force that builds true greatness, but God's tender, patient mercy nurturing our souls.",
    tags: ["Gentleness", "Grace", "Greatness"]
  },
  {
    id: "quote-19",
    quote: "When you feel like giving up on God, remember that moving backwards in a train or vehicle is still a forward movement.",
    category: "Grit & Endurance",
    biblicalAnchor: "Romans 8:28 — 'All things work together for good to them that love God.'",
    keyPrinciple: "God's Sovereign Vehicle",
    reflectionNote: "Even when your personal steps feel regressive, if you are aboard God's vessel, His overall direction for your life remains onward and upward.",
    tags: ["Faith", "Endurance", "Perspective", "Hope"]
  },
  {
    id: "quote-20",
    quote: "Any weakness unaddressed can bring a man down.",
    category: "Wisdom & Relationships",
    biblicalAnchor: "Song of Solomon 2:15 — 'Take us the foxes, the little foxes, that spoil the vines.'",
    keyPrinciple: "Vigilant Character Building",
    reflectionNote: "Secret compromises and unaddressed character flaws do not cure themselves over time. Confront them at the Cross with honest repentance.",
    tags: ["Character", "Integrity", "Self-Examination"]
  },
  {
    id: "quote-21",
    quote: "Purpose is what gives credence to an activity.",
    category: "Purpose & Calling",
    biblicalAnchor: "1 Corinthians 9:26 — 'I therefore so run, not as uncertainly; so fight I, not as one that beateth the air.'",
    keyPrinciple: "Clarity of Divine Intent",
    reflectionNote: "Activity without purpose is merely exhausting noise. When tied to God-ordained purpose, every labor carries eternal weight.",
    tags: ["Purpose", "Focus", "Effectiveness"]
  },
  {
    id: "quote-22",
    quote: "The enemy of your next success is the last one you had. It can keep you satisfied and grounded.",
    category: "Mindset & Growth",
    biblicalAnchor: "Philippians 3:12 — 'Not as though I had already attained, either were already perfect: but I follow after.'",
    keyPrinciple: "Overcoming Complacency",
    reflectionNote: "Comfortable satisfaction with past triumphs blinds us to the greater territories God desires to conquer through us.",
    tags: ["Vision", "Growth", "Humility"]
  },
  {
    id: "quote-23",
    quote: "The same energy it takes to move back is the same energy required for a forward movement, so why not a forward movement?",
    category: "Grit & Endurance",
    biblicalAnchor: "Exodus 14:15 — 'Speak unto the children of Israel, that they go forward.'",
    keyPrinciple: "Directing Energy into Progress",
    reflectionNote: "Worry, retreat, and self-pity consume immense psychological fuel. Channel that exact same vitality into bold forward action.",
    tags: ["Courage", "Action", "Energy", "Momentum"]
  },
  {
    id: "quote-24",
    quote: "It is only as hard as ignorance has made it.",
    category: "Mindset & Growth",
    biblicalAnchor: "Hosea 4:6 — 'My people are destroyed for lack of knowledge.'",
    keyPrinciple: "Illumination Dispels Difficulty",
    reflectionNote: "Many life burdens appear insurmountable only because the relevant insight, skill, or spiritual revelation has not yet been unlocked.",
    tags: ["Knowledge", "Wisdom", "Understanding"]
  },
  {
    id: "quote-25",
    quote: "The greatest tragedy in life is not death but life without a purpose.",
    category: "Purpose & Calling",
    biblicalAnchor: "Jeremiah 1:5 — 'Before I formed thee in the belly I knew thee; and before thou camest forth... I ordained thee.'",
    keyPrinciple: "The Sacredness of Purpose",
    reflectionNote: "To breathe, work, and die without discovering why God authored your existence is the deepest tragedy. Seek His purpose above all.",
    tags: ["Purpose", "Calling", "Destiny", "Life"]
  },
  {
    id: "quote-26",
    quote: "You have to come to a point in your life where nothing discourages you anymore.",
    category: "Grit & Endurance",
    biblicalAnchor: "1 Samuel 30:6 — 'And David was greatly distressed... but David encouraged himself in the Lord his God.'",
    keyPrinciple: "Unshakeable Spiritual Fortitude",
    reflectionNote: "When your anchor is cast firmly into the immutable character of God, earthly storms lose their power to dismantle your peace.",
    tags: ["Fortitude", "Courage", "Joy", "Strength"]
  },
  {
    id: "quote-27",
    quote: "Our greatest fear should not be of failure, but succeeding at something that wasn’t worth the toil.",
    category: "Purpose & Calling",
    biblicalAnchor: "Mark 8:36 — 'For what shall it profit a man, if he shall gain the whole world, and lose his own soul?'",
    keyPrinciple: "Eternal Alignment of Ambition",
    reflectionNote: "Reaching the pinnacle of an earthly ladder is worthless if that ladder was leaning against the wrong wall. Pursue eternal treasures.",
    tags: ["Priority", "Destiny", "Wisdom", "Values"]
  },
  {
    id: "quote-28",
    quote: "The preparation for the next level of your life starts right after attaining the previously sought one.",
    category: "Mindset & Growth",
    biblicalAnchor: "2 Timothy 4:2 — 'Preach the word; be instant in season, out of season.'",
    keyPrinciple: "Perpetual Readiness",
    reflectionNote: "Arrival at a milestone is simply the threshold of a new arena. Maintain the discipline and spiritual posture of a student.",
    tags: ["Preparation", "Growth", "Discipline"]
  },
  {
    id: "quote-29",
    quote: "Every man’s need is also his point of contact.",
    category: "Wisdom & Relationships",
    biblicalAnchor: "Philippians 4:19 — 'But my God shall supply all your need according to his riches in glory by Christ Jesus.'",
    keyPrinciple: "Need as an Invitation for Divine Power",
    reflectionNote: "Human weakness and felt need are not dead ends; they are the divine doorway where God's supernatural supply enters human reality.",
    tags: ["Faith", "Ministry", "Connection", "Miracles"]
  },
  {
    id: "quote-30",
    quote: "Your value is measured against these three:\n• The demand for what you do.\n• The difficulty in replacing you.\n• Your proficiency in doing what you do.",
    category: "Purpose & Calling",
    biblicalAnchor: "Proverbs 22:29 — 'Seest thou a man diligent in his business? he shall stand before kings.'",
    keyPrinciple: "The Law of Value and Proficiency",
    reflectionNote: "Deepen your expertise, cultivate rare character, and serve with consummate diligence to become indispensable in your calling.",
    tags: ["Excellence", "Value", "Skill", "Diligence"]
  },
  {
    id: "quote-31",
    quote: "Whatever you are not doing right, when you see somebody doing it, it judges you.",
    category: "Mindset & Growth",
    biblicalAnchor: "James 1:23-24 — 'He is like unto a man beholding his natural face in a glass.'",
    keyPrinciple: "The Conviction of Excellence",
    reflectionNote: "Instead of harboring defensiveness when observing others excel, allow their faithfulness to ignite godly conviction in your own habits.",
    tags: ["Humility", "Excellence", "Conviction"]
  },
  {
    id: "quote-32",
    quote: "Stop hating yourself, you are perfect and fit for purpose.",
    category: "Divine Favor & Joy",
    biblicalAnchor: "Psalm 139:14 — 'I will praise thee; for I am fearfully and wonderfully made.'",
    keyPrinciple: "Embracing Divine Design",
    reflectionNote: "God crafted your personality, timing, and gifts with intentional precision. Self-condemnation insults the Master Craftsman.",
    tags: ["Identity", "Self-Worth", "Joy", "Grace"]
  },
  {
    id: "quote-33",
    quote: "The people who change the world are those who have taken 'impossible' out of their vocabulary.",
    category: "Grit & Endurance",
    biblicalAnchor: "Luke 1:37 — 'For with God nothing shall be impossible.'",
    keyPrinciple: "Kingdom Possibility Thinking",
    reflectionNote: "When faith connects with the Almighty, natural limitations surrender. Dare to believe God for generational breakthroughs.",
    tags: ["Faith", "Vision", "Possibility", "Courage"]
  },
  {
    id: "quote-34",
    quote: "Do not look at people’s greatness and trivialize what the Lord has done for you.",
    category: "Divine Favor & Joy",
    biblicalAnchor: "1 Thessalonians 5:18 — 'In every thing give thanks: for this is the will of God in Christ Jesus concerning you.'",
    keyPrinciple: "Grateful Contentment",
    reflectionNote: "Comparison is the thief of joy. Celebrate God's unique hand upon your journey with overflowing thanksgiving.",
    tags: ["Gratitude", "Thanksgiving", "Contentment"]
  },
  {
    id: "quote-35",
    quote: "Although I am not where I want to be, I am also not where I used to be. Great gains made.",
    category: "Divine Favor & Joy",
    biblicalAnchor: "Zechariah 4:10 — 'For who hath despised the day of small things?'",
    keyPrinciple: "Acknowledging Progressive Victory",
    reflectionNote: "Take a moment to look back and marvel at how far the Lord has carried you through trials that once threatened to consume you.",
    tags: ["Progress", "Victory", "Testimony", "Joy"]
  },
  {
    id: "quote-36",
    quote: "There is a way God can handpick a man and walk him through the vicissitudes of life as if challenges do not exist.",
    category: "Divine Favor & Joy",
    biblicalAnchor: "Isaiah 43:2 — 'When thou passest through the waters, I will be with thee; and through the rivers, they shall not overflow thee.'",
    keyPrinciple: "The Supernatural Shield of Divine Favor",
    reflectionNote: "When God's presence envelops a consecrated soul, the fiercest furnace becomes a walk of miraculous peace and invulnerable triumph.",
    tags: ["Divine Favor", "Protection", "Miracles", "Joy"]
  },
  {
    id: "quote-37",
    quote: "The joy of the Lord is my strength.",
    category: "Divine Favor & Joy",
    biblicalAnchor: "Nehemiah 8:10 — 'Neither be ye sorry; for the joy of the Lord is your strength.'",
    keyPrinciple: "The Foundation of Spiritual Power",
    reflectionNote: "Our supernatural fortress is not muscle or money, but the holy gladness of being known, redeemed, and upheld by the Living God.",
    tags: ["Joy", "Strength", "Victory", "Praise"]
  },
  {
    id: "quote-38",
    quote: "To God be the glory.",
    category: "Divine Favor & Joy",
    biblicalAnchor: "1 Corinthians 10:31 — 'Whether therefore ye eat, or drink, or whatsoever ye do, do all to the glory of God.'",
    keyPrinciple: "The Ultimate End of All Things",
    reflectionNote: "Every breath, insight, victory, and answered prayer returns in pure adoration to the Throne of the Sovereign King.",
    tags: ["Glory", "Worship", "Adoration"]
  }
];

export function getDailyQuote(date: Date = new Date()): PersonalQuote {
  // Rotate smoothly through the collection based on day of year
  const startOfYear = new Date(date.getFullYear(), 0, 0);
  const diff = date.getTime() - startOfYear.getTime();
  const oneDay = 1000 * 60 * 60 * 24;
  const dayOfYear = Math.floor(diff / oneDay);
  const index = Math.abs(dayOfYear) % PERSONAL_QUOTES.length;
  return PERSONAL_QUOTES[index];
}

export function getRandomQuote(): PersonalQuote {
  const index = Math.floor(Math.random() * PERSONAL_QUOTES.length);
  return PERSONAL_QUOTES[index];
}

export {
  AUTHOR_FAVOURITE_SCRIPTURES,
  AUTHOR_FAVOURITES_COUNT,
  AUTHOR_FAVOURITES_OT_COUNT as OT_FAVOURITES_COUNT,
  AUTHOR_FAVOURITES_NT_COUNT as NT_FAVOURITES_COUNT,
  getAuthorScriptureByNum,
  getAuthorScriptureByReference as getAuthorScriptureByRef,
  getAuthorScriptureByReference
} from "./authorFavouriteScriptures";
export type { AuthorFavouriteScripture } from "./authorFavouriteScriptures";

