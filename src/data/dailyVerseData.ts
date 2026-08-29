import { DailyScripture } from "../types";

export interface ScheduledVerse {
  dateKey: string; // YYYY-MM-DD
  reference: string;
  book: string;
  chapter: number;
  verse: number;
  text: string;
  version: string;
  theme: string;
  reflection: string;
  guidedPrayer: string;
  mathemaSermonConnection?: string;
  apostleMathConnection?: string;
  joyAnchor?: string;
}

export const ANNUAL_DAILY_VERSES: ScheduledVerse[] = [
  {
    dateKey: "2026-08-18",
    reference: "Romans 8:28",
    book: "Romans",
    chapter: 8,
    verse: 28,
    text: "And we know that all things work together for good to them that love God, to them who are the called according to his purpose.",
    version: "KJV",
    theme: "God's Sovereign Purpose",
    reflection: "No circumstance in your life is wasted. Even the hardest trials, unexpected setbacks, and confusing delays are being simultaneously orchestrated by God's master equation for your eternal good and His eternal glory.",
    guidedPrayer: "Lord God Almighty, I thank You that You hold every detail of my life. When I cannot understand the immediate pieces, I trust Your sovereign hand. Align my heart with Your divine purpose today. In Jesus' name, Amen.",
    mathemaSermonConnection: "Simultaneous Equations: Multiple conflicting variables harmoniously solved together by one Sovereign Mind.",
    apostleMathConnection: "The Complex System of Circumstances yielding a unified Positive Vector in Christ.",
    joyAnchor: "The joy of knowing that God's purpose cannot be defeated by temporary hardship."
  },
  {
    dateKey: "2026-08-17",
    reference: "Nehemiah 8:10",
    book: "Nehemiah",
    chapter: 8,
    verse: 10,
    text: "Then he said unto them, Go your way, eat the fat, and drink the sweet, and send portions unto them for whom nothing is prepared: for this day is holy unto our Lord: neither be ye sorry; for the joy of the LORD is your strength.",
    version: "KJV",
    theme: "The Joy of the Lord as Divine Fortress",
    reflection: "Spiritual joy is not mere fleeting happiness dependent on favorable circumstances; it is the supernatural fortress of God's presence anchoring your soul in times of trial and victory alike.",
    guidedPrayer: "Father, let Your divine joy flood my spirit today. When exhaustion knocks, let Your joy be my unshakeable fortress. May I also share this grace with someone in need today. Amen.",
    mathemaSermonConnection: "Constant Invariant: The joy of the Lord is a constant term (c > 0) that stabilizes the entire equation.",
    apostleMathConnection: "Magnitude of the Inner Spirit overcoming external friction.",
    joyAnchor: "The unassailable stronghold of God's abiding delight."
  },
  {
    dateKey: "2026-08-19",
    reference: "John 3:16",
    book: "John",
    chapter: 3,
    verse: 16,
    text: "For God so loved the world, that he gave his only begotten Son, that whosoever believeth in him should not perish, but have everlasting life.",
    version: "KJV",
    theme: "The Supreme Measure of Divine Love",
    reflection: "In this single verse lies the heart of the Gospel: infinite love expressed through the supreme sacrifice of Jesus Christ, granting eternal life to anyone who places their trust in Him.",
    guidedPrayer: "Lord Jesus, thank You for Your unmatched sacrifice upon the Cross. I receive Your forgiveness, Your love, and Your gift of everlasting life anew today. Amen.",
    mathemaSermonConnection: "Infinite Quantity: Love with boundless magnitude approaching infinity (lim Love -> ∞).",
    apostleMathConnection: "The Universal Domain: 'Whosoever' includes every soul willing to enter the subset of grace.",
    joyAnchor: "Everlasting salvation guaranteed by Christ's finished work."
  },
  {
    dateKey: "2026-08-20",
    reference: "Philippians 4:13",
    book: "Philippians",
    chapter: 4,
    verse: 13,
    text: "I can do all things through Christ which strengtheneth me.",
    version: "KJV",
    theme: "Supernatural Strength in Christ",
    reflection: "Your human capacity has limits, but Christ in you is limitless. When facing academic challenges, professional demands, or spiritual warfare, lean into His divine enablement.",
    guidedPrayer: "Lord, when my strength is depleted, grant me Your supernatural energy and wisdom. I declare that through Christ, I am empowered to overcome every obstacle before me. Amen.",
    mathemaSermonConnection: "Scalar Multiplication: Natural capability multiplied by divine grace coefficient.",
    apostleMathConnection: "Resultant Vector with unlimited heavenly power.",
    joyAnchor: "Triumphant confidence in Christ's indwelling power."
  },
  {
    dateKey: "2026-08-21",
    reference: "Proverbs 3:5-6",
    book: "Proverbs",
    chapter: 3,
    verse: 5,
    text: "Trust in the LORD with all thine heart; and lean not unto thine own understanding. In all thy ways acknowledge him, and he shall direct thy paths.",
    version: "KJV",
    theme: "Divine Direction & Wholehearted Trust",
    reflection: "Human logic sees only what is directly in front of it. God sees the entire map of eternity. Surrender your plans to Him, and He will straighten every crooked path before you.",
    guidedPrayer: "Lord, I surrender my understanding and my plans into Your hands. Direct my steps, open the right doors, and keep me centered in Your perfect will today. Amen.",
    mathemaSermonConnection: "Vector Navigation: Letting the Master Surveyor set your heading and coordinates.",
    apostleMathConnection: "Eliminating human error terms through divine calibration.",
    joyAnchor: "Peace in following an infallible Heavenly Guide."
  },
  {
    dateKey: "2026-08-22",
    reference: "Isaiah 40:31",
    book: "Isaiah",
    chapter: 40,
    verse: 31,
    text: "But they that wait upon the LORD shall renew their strength; they shall mount up with wings as eagles; they shall run, and not be weary; and they shall walk, and not faint.",
    version: "KJV",
    theme: "Renewed Strength & Eagle Soaring",
    reflection: "Waiting on the Lord is not idle passivity; it is active spiritual realignment with the Source of all life. In waiting, God exchanges your human weakness for His inexhaustible power.",
    guidedPrayer: "Father, I wait upon You in quiet stillness. Breathe fresh fire and renewal into my body, mind, and spirit today. Let me soar above life's storms on the wings of faith. Amen.",
    mathemaSermonConnection: "Asymptotic Convergence: Approaching divine infinity through patient waiting.",
    apostleMathConnection: "Regenerative Power Cycle in the Kingdom of God.",
    joyAnchor: "The joy of soaring above earthbound limitations."
  },
  {
    dateKey: "2026-08-23",
    reference: "Matthew 19:26",
    book: "Matthew",
    chapter: 19,
    verse: 26,
    text: "But Jesus beheld them, and said unto them, With men this is impossible; but with God all things are possible.",
    version: "KJV",
    theme: "The God of the Impossible",
    reflection: "When human calculations declare a problem unsolvable, God steps in. What appears impossible in the natural realm is the exact threshold where divine miracles begin.",
    guidedPrayer: "Almighty God, I bring my insurmountable challenges to You. I reject doubt and despair, declaring that with You, all things are possible in my life and family. Amen.",
    mathemaSermonConnection: "Quadratic Solutions: Where human factoring fails, the divine formula always yields the true roots.",
    apostleMathConnection: "Overcoming zero-solution singularities with divine omnipotence.",
    joyAnchor: "Unshakable expectation of God's miraculous intervention."
  },
  {
    dateKey: "2026-08-24",
    reference: "2 Peter 3:18",
    book: "2 Peter",
    chapter: 3,
    verse: 18,
    text: "But grow in grace, and in the knowledge of our Lord and Saviour Jesus Christ. To him be glory both now and for ever. Amen.",
    version: "KJV",
    theme: "Continuous Spiritual Growth",
    reflection: "Every day is an opportunity to cultivate a higher gradient in your spiritual life. Never settle for stagnant faith; press deeper into Christ's grace and profound knowledge.",
    guidedPrayer: "Lord Jesus, let my spiritual gradient continually rise. Increase my desire to study Your Word, my devotion in prayer, and my conformity to Your likeness. Amen.",
    mathemaSermonConnection: "Positive Gradient (m > 0): Continuous upward trajectory of sanctification.",
    apostleMathConnection: "Rate of spiritual change accelerating toward Christlikeness.",
    joyAnchor: "The joy of continuous transformation in the Holy Ghost."
  },
  {
    dateKey: "2026-08-25",
    reference: "Psalm 23:1",
    book: "Psalms",
    chapter: 23,
    verse: 1,
    text: "The LORD is my shepherd; I shall not want.",
    version: "KJV",
    theme: "The Good Shepherd's Provision",
    reflection: "Because the Lord is your Shepherd, your lack is eliminated. He leads you beside still waters, restores your soul, and prepares a table of honor in the presence of your adversaries.",
    guidedPrayer: "My Shepherd and King, thank You for Your gentle guidance and abundant provision. I rest securely in Your care, knowing that goodness and mercy follow me all my days. Amen.",
    mathemaSermonConnection: "Null Deficit (Want = 0): Complete fullness in the Divine Set.",
    apostleMathConnection: "Optimal Supply function governed by the Good Shepherd.",
    joyAnchor: "Total rest in God's pastoral care and abundant supply."
  },
  {
    dateKey: "2026-08-26",
    reference: "2 Corinthians 5:7",
    book: "2 Corinthians",
    chapter: 5,
    verse: 7,
    text: "For we walk by faith, not by sight.",
    version: "KJV",
    theme: "Walking by Faith",
    reflection: "Sight is limited to the physical realm; faith accesses the eternal reality of God's Word. When the path ahead is obscured, keep stepping forward in faith.",
    guidedPrayer: "Lord, give me eyes of faith to see beyond physical circumstances. Help me trust Your promises above what my natural senses perceive. In Jesus' name, Amen.",
    mathemaSermonConnection: "Simultaneous Unknowns resolved by walking in obedience to divine axioms.",
    apostleMathConnection: "Faith as the non-zero operator unlocking unseen dimensions.",
    joyAnchor: "Confidence in the unseen eternal realities of God."
  },
  {
    dateKey: "2026-08-27",
    reference: "Matthew 7:24",
    book: "Matthew",
    chapter: 7,
    verse: 24,
    text: "Therefore whosoever heareth these sayings of mine, and doeth them, I will liken him unto a wise man, which built his house upon a rock:",
    version: "KJV",
    theme: "The Unshakeable Rock Foundation",
    reflection: "Storms of life test every structure. When your life is built upon obedience to the teachings of Jesus Christ, no flood, wind, or crisis can tear down your foundation.",
    guidedPrayer: "Lord Jesus, I build my life, family, and future upon the unshakeable rock of Your Word. Grant me the grace not only to hear Your commandments, but to put them into daily practice. Amen.",
    mathemaSermonConnection: "Geometric Foundations: Rigid structural stability resisting dynamic environmental forces.",
    apostleMathConnection: "The solid origin coordinate (0,0,0) anchoring all dimensional construction.",
    joyAnchor: "Security in an unshakeable eternal foundation."
  }
];

export function getTodayDateKey(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function getScheduledVerseForDate(dateKey: string): ScheduledVerse {
  // Check exact date match
  const found = ANNUAL_DAILY_VERSES.find((v) => v.dateKey === dateKey);
  if (found) return found;

  // Stable deterministic hash for any other calendar date so 1000 users see the exact same verse
  let hash = 0;
  for (let i = 0; i < dateKey.length; i++) {
    hash = (hash << 5) - hash + dateKey.charCodeAt(i);
    hash |= 0;
  }
  const index = Math.abs(hash) % ANNUAL_DAILY_VERSES.length;
  return ANNUAL_DAILY_VERSES[index];
}

export function getPreviousVersesHistory(daysCount: number = 7): { dateKey: string; formattedDate: string; verse: ScheduledVerse }[] {
  const list: { dateKey: string; formattedDate: string; verse: ScheduledVerse }[] = [];
  const today = new Date();

  for (let i = 1; i <= daysCount; i++) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    const key = `${year}-${month}-${day}`;

    const formattedDate = d.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric"
    });

    list.push({
      dateKey: key,
      formattedDate,
      verse: getScheduledVerseForDate(key)
    });
  }

  return list;
}
