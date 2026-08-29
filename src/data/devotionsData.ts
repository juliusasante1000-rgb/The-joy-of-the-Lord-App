import { Devotion, DailyScripture, DevotionEdition } from "../types";

export const DAILY_SCRIPTURES_POOL: DailyScripture[] = [
  {
    id: "ds-1",
    reference: "Nehemiah 8:10",
    text: "Then he said unto them, Go your way, eat the fat, and drink the sweet, and send portions unto them for whom nothing is prepared: for this day is holy unto our Lord: neither be ye sorry; for the joy of the Lord is your strength.",
    version: "KJV",
    theme: "Divine Strength & Holy Joy",
    reflection: "When the demands of daily life press upon our souls, our natural tendency is to search within ourselves for endurance. But Nehemiah delivers a divine revelation: true spiritual power is not self-generated resilience, but the supernatural joy that flows from God's holy presence and sovereign grace. Today at noon, receive His unshakeable joy as your fortress.",
    guidedPrayer: "Almighty God, I thank You that my strength is anchored in Your joy and not in my fleeting circumstances. As the sun reaches its height today, illuminate my heart with Your gladness, and let Your peace reign in every decision I make. In Jesus' name, Amen.",
    meditationQuestions: [
      "Where have I been relying on my own stamina instead of drawing from the joy of the Lord?",
      "How can I share portions of God's kindness and joy with someone who is weary today?"
    ],
    refreshedAt: "12:00 PM Daily"
  },
  {
    id: "ds-2",
    reference: "Isaiah 40:31",
    text: "But they that wait upon the Lord shall renew their strength; they shall mount up with wings as eagles; they shall run, and not be weary; and they shall walk, and not faint.",
    version: "KJV",
    theme: "Renewed Strength in Waiting",
    reflection: "To wait upon the Lord is not passive inactivity, but eager, confident expectation rooted in His covenant promises. When we align our heartbeat with His timing, our depleted human energy is exchanged for divine vitality. You were made to soar above turbulence, not be crushed by it.",
    guidedPrayer: "Lord Jehovah, I silence my anxious striving and wait upon You. Renew my mind, refresh my spirit, and lift me on wings of faith above every obstacle. In Jesus' mighty name, Amen.",
    meditationQuestions: [
      "What hurried anxiety do I need to lay down at the feet of Jesus right now?",
      "How does trusting God's timing change my perspective on today's pressures?"
    ],
    refreshedAt: "12:00 PM Daily"
  },
  {
    id: "ds-3",
    reference: "Psalm 23:1-3",
    text: "The Lord is my shepherd; I shall not want. He maketh me to lie down in green pastures: he leadeth me beside the still waters. He restoreth my soul: he leadeth me in the paths of righteousness for his name's sake.",
    version: "KJV",
    theme: "Divine Rest & Restoration",
    reflection: "In a world of relentless noise and hustle, the Good Shepherd invites us to restorative waters. He does not merely patch up our exhaustion; He restores our soul from the inside out. Under His shepherd care, lack is abolished and righteous direction is guaranteed.",
    guidedPrayer: "Good Shepherd, I yield the steering of my life to Your gentle and sovereign hand. Restore my soul today with Your quiet presence, and lead me in paths of righteousness for Your name's sake. Amen.",
    meditationQuestions: [
      "Am I allowing the Good Shepherd to lead me, or am I running ahead into exhaustion?",
      "What 'still waters' of communion with God can I drink from today?"
    ],
    refreshedAt: "12:00 PM Daily"
  },
  {
    id: "ds-4",
    reference: "Romans 8:31-32",
    text: "What shall we then say to these things? If God be for us, who can be against us? He that spared not his own Son, but delivered him up for us all, how shall he not with him also freely give us all things?",
    version: "KJV",
    theme: "The Incomparable Favor of God",
    reflection: "If God did not withhold His most precious treasure—His only begotten Son—on the cross of Calvary, there is no good thing He will withhold from those who walk in Christ. When opposition threatens or doubt whispers, look at the cross and remember who is on your side.",
    guidedPrayer: "Father, thank You for the ultimate demonstration of Your love in Christ Jesus. Because You are for me, I cast out all fear and intimidation. Thank You for Your generous grace that supplies all my need. In Jesus' name, Amen.",
    meditationQuestions: [
      "What challenge today seems intimidating, and how does 'God is for me' dismantle that fear?",
      "How does meditating on the gift of Jesus Christ anchor my trust for my daily provisions?"
    ],
    refreshedAt: "12:00 PM Daily"
  },
  {
    id: "ds-5",
    reference: "Philippians 4:6-7",
    text: "Be careful for nothing; but in every thing by prayer and supplication with thanksgiving let your requests be made known unto God. And the peace of God, which passeth all understanding, shall keep your hearts and minds through Christ Jesus.",
    version: "KJV",
    theme: "The Supernatural Peace of Christ",
    reflection: "God offers us a supernatural transaction: bring your worries to Him wrapped in thanksgiving, and He will replace them with a peace that transcends human logic. This peace acts as a divine garrison guarding both your emotional heart and your mental thoughts.",
    guidedPrayer: "Lord, I trade my worries for Your peace. I release every burden that has weighed down my thoughts. Guard my mind with the certainty of Your goodness and protection today. Amen.",
    meditationQuestions: [
      "What specific worry can I convert into a prayer of thanksgiving right now?",
      "Have I experienced God's peace that defies circumstance recently?"
    ],
    refreshedAt: "12:00 PM Daily"
  },
  {
    id: "ds-6",
    reference: "Lamentations 3:22-23",
    text: "It is of the Lord's mercies that we are not consumed, because his compassions fail not. They are new every morning: great is thy faithfulness.",
    version: "KJV",
    theme: "Unfailing Morning Mercies",
    reflection: "Yesterday's failures and setbacks have no jurisdiction over today. Every morning, God opens a fresh reservoir of mercy, compassion, and divine grace tailored precisely for the day's journey. Great is His unchanging faithfulness.",
    guidedPrayer: "Faithful God, thank You for the fresh mercies of this new day. Forgive my past missteps, cleanse my heart, and let Your faithfulness be my constant song. In Jesus' name, Amen.",
    meditationQuestions: [
      "What guilt from yesterday do I need to release in light of God's brand-new morning mercies?",
      "How has God's faithfulness sustained my life through past seasons?"
    ],
    refreshedAt: "12:00 PM Daily"
  },
  {
    id: "ds-7",
    reference: "Proverbs 3:5-6",
    text: "Trust in the Lord with all thine heart; and lean not unto thine own understanding. In all thy ways acknowledge him, and he shall direct thy paths.",
    version: "KJV",
    theme: "Wholehearted Trust & Divine Direction",
    reflection: "Human intellect, though a gift from God, is limited and easily deceived by temporal appearances. When we surrender our finite understanding and acknowledge God in every decision—large and small—He promises to make our paths straight and clear.",
    guidedPrayer: "Lord, I surrender my calculations and opinions into Your hands. I choose to trust Your infinite wisdom. Direct my steps, open the right doors, and close every path that is not of You. Amen.",
    meditationQuestions: [
      "Is there a decision where I have been relying on human logic rather than seeking God's counsel?",
      "What does acknowledging Him in all my ways look like in practical terms today?"
    ],
    refreshedAt: "12:00 PM Daily"
  }
];

export const DEVOTIONS_COLLECTION: Record<DevotionEdition, Devotion[]> = {
  morning: [
    {
      id: "dev-m-1",
      edition: "morning",
      editionLabel: "Morning Devotion (12:00 AM – 12:00 PM)",
      title: "Awakening to Grace: Clothed in Christ's Righteousness",
      keyScripture: "Psalm 5:3 - 'My voice shalt thou hear in the morning, O Lord; in the morning will I direct my prayer unto thee, and will look up.'",
      passageText: "My voice shalt thou hear in the morning, O Lord; in the morning will I direct my prayer unto thee, and will look up. For thou art not a God that hath pleasure in wickedness: neither shall evil dwell with thee.",
      reflection: `As dawn breaks and the world begins its clamor, the Christian's first priority is to anchor their soul in the sanctuary of God's presence. David did not begin his morning by assessing his royal battles, political enemies, or administrative duties; he began by directing his voice heavenward and looking up with expectancy.

When you direct your morning prayer to God, you establish a spiritual alignment for the entire day. You remind yourself that you walk not in your own fragile strength or human merit, but covered in the spotless righteousness of Jesus Christ. The grace that woke you up is the exact same grace that will sustain every step, shield you from every temptation, and guide your conversations.

Commit the firstfruits of your mind to the Lord. Before reading notifications or worldly headlines, let the living Word of God saturate your thoughts. When the foundation of the day is built upon worship, no storm can shake your peace.`,
      practicalApplication: "Before you check your phone or begin daily tasks, spend 5 uninterrupted minutes in quiet praise. Acknowledge God as the Lord over your schedule, health, and family today.",
      guidedPrayer: "Heavenly Father, I consecrate this morning to Your glory. Thank You for the gift of life and the breath in my lungs. Clothe me in the Armor of God, grant me wisdom for every decision, and let the beauty of Jesus be seen in everything I do today. In the precious name of Jesus Christ, Amen.",
      actionStep: "Write down 3 specific things you are thanking God for this morning and carry Psalm 5:3 in your heart.",
      theme: "Morning Firstfruits & Spiritual Alignment",
      category: "Salvation & Grace",
      readTimeMinutes: 3
    },
    {
      id: "dev-m-2",
      edition: "morning",
      editionLabel: "Morning Devotion (12:00 AM – 12:00 PM)",
      title: "The Armor of Light: Prepared for Daily Spiritual Triumph",
      keyScripture: "Romans 13:12 - 'The night is far spent, the day is at hand: let us therefore cast off the works of darkness, and let us put on the armour of light.'",
      passageText: "The night is far spent, the day is at hand: let us therefore cast off the works of darkness, and let us put on the armour of light. Let us walk honestly, as in the day; not in rioting and drunkenness, not in chambering and wantonness, not in strife and envying.",
      reflection: `Every morning presents a spiritual crossroads. The world invites us into self-centered striving, anxiety, and compromise, but the Apostle Paul calls believers to awaken and put on the Armor of Light. 

Spiritual warfare is not fought with physical weapons; it begins with the mindset you put on when you wake up. Putting on the armor of light means actively choosing truth over deception, love over resentment, humility over pride, and purity over the flesh.

Because Christ has disarmed every demonic principality through His triumphant resurrection (Colossians 2:15), you step into this day not fighting for victory, but living out of Christ's finished victory. Walk with head held high as an ambassador of the Kingdom of Heaven.`,
      practicalApplication: "Identify any lingering negative thoughts or resentments from yesterday. Consciously cast them off and declare: 'I am clothed in Christ's love and truth today.'",
      guidedPrayer: "Lord Jesus, I cast off all spiritual slumber and put on Your Armor of Light. Gird my waist with truth, guard my heart with righteousness, and let my steps be guided by the gospel of peace. I take the shield of faith to extinguish every fiery dart of the enemy. Amen.",
      actionStep: "Speak a blessing over your household and place of work before stepping out today.",
      theme: "Spiritual Victory & Holiness",
      category: "Spiritual Warfare",
      readTimeMinutes: 4
    }
  ],
  afternoon: [
    {
      id: "dev-a-1",
      edition: "afternoon",
      editionLabel: "Afternoon Devotion (12:00 PM – 5:00 PM)",
      title: "Midday Renewal: Drinking from the Living Fountain",
      keyScripture: "Psalm 55:17 - 'Evening, and morning, and at noon, will I pray, and cry aloud: and he shall hear my voice.'",
      passageText: "Evening, and morning, and at noon, will I pray, and cry aloud: and he shall hear my voice. He hath delivered my soul in peace from the battle that was against me: for there were many with me.",
      reflection: `By midday, the pressures of the day often accumulate. Energy begins to flag, unexpected interruptions test our patience, and the demands of work or family can threaten our inner calm. David understood the vital rhythm of midday renewal. He did not wait for the day to finish before seeking the Lord; at noon, he paused to recalibrate his soul.

The noon hour is God's invitation to step into the spiritual oasis of His presence. In John 4, it was around the sixth hour (noon) that Jesus met the Samaritan woman at Jacob's well and offered her Living Water—water that causes the soul to never thirst again.

Take a sacred pause right now. Take a deep breath of God's grace. Whatever stress or frustration has emerged in the morning hours, release it into the capable hands of Jesus. His strength is made perfect in your weakness.`,
      practicalApplication: "Pause for 2 minutes right now away from screens. Close your eyes, repeat the name of Jesus, and drink from His peace.",
      guidedPrayer: "O Lord, at this noon hour, I pause to acknowledge Your sovereignty over my day. When fatigue or frustration knocks at my door, fill me afresh with Your Holy Spirit. Be my Living Water and my midday shield. In Jesus' mighty name, Amen.",
      actionStep: "Take a 5-minute walk of thanksgiving during your lunch break and praise God for sustaining your life.",
      theme: "Midday Refreshing & Sovereign Peace",
      category: "Prayer & Faith",
      readTimeMinutes: 3
    },
    {
      id: "dev-a-2",
      edition: "afternoon",
      editionLabel: "Afternoon Devotion (12:00 PM – 5:00 PM)",
      title: "Steadfast Midday Faith: Standing Firm in the Heat of the Day",
      keyScripture: "Galatians 6:9 - 'And let us not be weary in well doing: for in due season we shall reap, if we faint not.'",
      passageText: "And let us not be weary in well doing: for in due season we shall reap, if we faint not. As we have therefore opportunity, let us do good unto all men, especially unto them who are of the household of faith.",
      reflection: `The middle of the day is often when weariness tempts us to lower our spiritual standards or give up on doing good. It is easy to start the morning with high ideals, but when fatigue sets in, cynicism and impatience can try to take root.

Paul reminds the church in Galatia that sowing seeds of righteousness, love, kindness, and patience is never in vain. There is an appointed 'due season'—a divine harvest guaranteed by God's faithfulness—if we refuse to faint.

Every act of integrity, every gentle answer that turns away wrath, every hidden prayer for a difficult colleague, is an eternal seed planted in the Kingdom of God. Keep your hands on the plow with joy!`,
      practicalApplication: "Show deliberate kindness to someone you encounter this afternoon—a colleague, cashier, or family member.",
      guidedPrayer: "Father, strengthen my hands for good work this afternoon. Guard my tongue from complaint or gossip. Fill me with the supernatural perseverance of Christ so I may finish this day with integrity and love. Amen.",
      actionStep: "Send an encouraging text message or scripture to a brother or sister in Christ.",
      theme: "Perseverance & Christian Integrity",
      category: "Holy Living & Character",
      readTimeMinutes: 3
    }
  ],
  evening: [
    {
      id: "dev-e-1",
      edition: "evening",
      editionLabel: "Evening Prayer & Devotion (5:00 PM – 12:00 AM)",
      title: "Nightfall in the Father's Arms: Rest, Reflection & Peace",
      keyScripture: "Psalm 4:8 - 'I will both lay me down in peace, and sleep: for thou, Lord, only makest me dwell in safety.'",
      passageText: "Hear me when I call, O God of my righteousness: thou hast enlarged me when I was in distress; have mercy upon me, and hear my prayer... I will both lay me down in peace, and sleep: for thou, Lord, only makest me dwell in safety.",
      reflection: `As shadows lengthen and night falls, the work of the day is brought to a close. For the believer, bedtime is not merely biological necessity, but a profound theological act of trust. To sleep is to confess: 'God is in control, and I am not. He does not slumber nor sleep, so I can rest peacefully in His care.'

Review your day in the presence of the Lord with honesty and gratitude. If you made mistakes or fell short of His glory, confess them freely; the blood of Jesus cleanses from all unrighteousness. If you experienced victories or blessings, return all praise to Him.

Leave the unresolved problems of tomorrow in God's hands. He will work while you rest. Lie down tonight knowing that you are surrounded by holy angels, covered by the blood of Christ, and held in the eternal grip of Fatherly love.`,
      practicalApplication: "Turn off screens 30 minutes before sleep. Read a calming Psalm (like Psalm 91 or Psalm 121) and meditate on God's protection.",
      guidedPrayer: "Abba Father, as this day closes, I return to You with thanksgiving. I repent of any word, thought, or deed that grieved Your Spirit, and I receive Your cleansing grace. Watch over my family and home tonight. Grant us restorative sleep and wake us with joy. In Jesus' precious name, Amen.",
      actionStep: "Recite Psalm 4:8 three times as you lay your head upon your pillow.",
      theme: "Night Rest, Forgiveness & Divine Protection",
      category: "The Joy of the Lord",
      readTimeMinutes: 4
    },
    {
      id: "dev-e-2",
      edition: "evening",
      editionLabel: "Evening Prayer & Devotion (5:00 PM – 12:00 AM)",
      title: "The Fortress of Peace: Psalm 91 Nighttime Shield",
      keyScripture: "Psalm 91:1-2 - 'He that dwelleth in the secret place of the most High shall abide under the shadow of the Almighty.'",
      passageText: "He that dwelleth in the secret place of the most High shall abide under the shadow of the Almighty. I will say of the Lord, He is my refuge and my fortress: my God; in him will I trust. Surely he shall deliver thee from the snare of the fowler, and from the noisome pestilence.",
      reflection: `The darkness of night can often bring anxiety, regrets, or fear of the unknown. Yet Psalm 91 provides an impenetrable spiritual pavilion for those who dwell in the secret place of the Most High.

The 'shadow of the Almighty' is a place of absolute safety where the enemy's arrows cannot pierce and terrors of the night cannot penetrate. God commands His holy angels concerning you to guard you in all your ways.

Close your eyes tonight knowing that your life is hidden with Christ in God. No weapon formed against your destiny will prosper. Rest in the joy of His sovereign shelter.`,
      practicalApplication: "Pray a hedge of protection around your loved ones, blessing each by name.",
      guidedPrayer: "Almighty God, my Refuge and Fortress, I shelter beneath Your wings tonight. I command all fear, nightmares, and anxiety to flee in Jesus' name. Send Your ministering angels to guard this home. I rest in Your unshakeable peace. Amen.",
      actionStep: "Write down 1 verse from Psalm 91 on a note by your bed.",
      theme: "Angelic Ministry & Divine Protection",
      category: "Spiritual Warfare",
      readTimeMinutes: 3
    }
  ]
};

// Date-seeded selector for synchronized daily scripture and devotions
export function getDailyScriptureForDate(dateStr: string): DailyScripture {
  // Hash the date string to get an index
  let hash = 0;
  for (let i = 0; i < dateStr.length; i++) {
    hash = (hash << 5) - hash + dateStr.charCodeAt(i);
    hash |= 0;
  }
  const index = Math.abs(hash) % DAILY_SCRIPTURES_POOL.length;
  return DAILY_SCRIPTURES_POOL[index];
}

export function getDevotionForDateAndEdition(dateStr: string, edition: DevotionEdition): Devotion {
  const pool = DEVOTIONS_COLLECTION[edition];
  let hash = 0;
  for (let i = 0; i < dateStr.length; i++) {
    hash = (hash << 5) - hash + dateStr.charCodeAt(i);
    hash |= 0;
  }
  const index = Math.abs(hash) % pool.length;
  return pool[index];
}
