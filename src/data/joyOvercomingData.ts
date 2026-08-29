import { JoyOvercomingChallenge } from "../types";
import { AUTHOR_FAVOURITES_COUNT } from "./authorFavouriteScriptures";
import { JOY_OVERCOMING_PART2 } from "./joyOvercomingDataPart2";
import { JOY_OVERCOMING_PART3 } from "./joyOvercomingDataPart3";
import { JOY_OVERCOMING_PART4 } from "./joyOvercomingDataPart4";

export const JOY_CHALLENGES_CATEGORIES = [
  { id: "All", label: "All Battlegrounds" },
  { id: "Author Favourites", label: `Author's Favourites (${AUTHOR_FAVOURITES_COUNT})` },
  { id: "Grief & Sorrow", label: "Grief & Sorrow" },
  { id: "Anxiety & Fear", label: "Anxiety & Panic" },
  { id: "Depression & Heaviness", label: "Depression & Heaviness" },
  { id: "Financial Strain", label: "Financial Adversity" },
  { id: "Marital & Family Storms", label: "Family & Relationships" },
  { id: "Physical Sickness & Fatigue", label: "Health & Vitality" },
  { id: "Delay & Discouragement", label: "Delay & Discouragement" },
  { id: "Spiritual Warfare", label: "Spiritual Warfare" },
  { id: "Mind Battles", label: "Mind Battles" },
  { id: "Guilt & Shame", label: "Guilt & Shame" },
  { id: "Career & Purpose", label: "Career & Purpose" },
  { id: "Ministry & Calling", label: "Ministry & Calling" },
  { id: "Addictions & Strongholds", label: "Addictions & Strongholds" }
];

export const JOY_OVERCOMING_PART1: JoyOvercomingChallenge[] = [
  {
    id: "joy-01-overcoming-grief-and-sorrow",
    challengeTitle: "Triumphing Over Grief, Loss, and Shattered Hearts",
    category: "Grief & Sorrow",
    rootDeception: "The lie that your life is permanently defined by the loss and that joy will never return.",
    scripturalTruth: "The Holy Spirit is the Comforter who gathers every tear in His bottle and promises that your mourning will be turned into dancing.",
    anchorVerses: [
      {
        reference: "Psalm 30:5 (KJV)",
        text: "For his anger endureth but a moment; in his favour is life: weeping may endure for a night, but joy cometh in the morning.",
        version: "KJV"
      },
      {
        reference: "Isaiah 61:3 (NKJV)",
        text: "To console those who mourn in Zion, to give them beauty for ashes, the oil of joy for mourning, the garment of praise for the spirit of heaviness.",
        version: "NKJV"
      },
      {
        reference: "Nehemiah 8:10 (KJV)",
        text: "Neither be ye sorry; for the joy of the LORD is your strength.",
        version: "KJV"
      }
    ],
    joyStrategySteps: [
      "Acknowledge the pain honestly before God without hiding tears (Jesus wept at Lazarus' tomb).",
      "Put on the 'Garment of Praise' intentionally: praise is not an emotional feeling, it is a spiritual weapon against heaviness.",
      "Anchor your thoughts in the promise of eternity and resurrection hope.",
      "Release yesterday into God's sovereign hands and allow Him to author new chapters of purpose."
    ],
    fortressDeclaration: "I put off the spirit of heaviness and I put on the garment of praise! The Lord is turning my mourning into dancing. His joy is my fortress and my unending strength!",
    deliverancePrayer: "Father in Heaven, I bring my broken heart to Your altar. You are close to the brokenhearted and You save those who are crushed in spirit. Holy Spirit, pour the oil of joy over my soul. Uproot every root of bitter sorrow and fill every void with Your radiant glory. In Jesus' mighty Name, Amen!",
    praisePrescription: "Sing Psalm 100 aloud in your room for 7 continuous minutes, lifting your hands above your head as an act of surrender and triumph.",
    testimonyOfVictory: "A sister who lost her job and sibling in the same month began singing praises at midnight; within 3 weeks, God restored her emotional peace, provided a miraculous job, and filled her home with divine comfort."
  },
  {
    id: "joy-02-defeating-anxiety-and-fear",
    challengeTitle: "Demolishing Anxiety, Panic Attacks, and Fear of the Future",
    category: "Anxiety & Fear",
    rootDeception: "The lie that God is not in control and that you must micromanage every catastrophic possibility.",
    scripturalTruth: "God has not given you a spirit of fear, but of power, love, and a sound mind (2 Timothy 1:7).",
    anchorVerses: [
      {
        reference: "Philippians 4:6-7 (AMP)",
        text: "Do not be anxious or worried about anything, but in everything [every circumstance and situation] by prayer and petition with thanksgiving, continue to make your [specific] requests known to God. And the peace of God which transcends all understanding shall guard your hearts and your minds in Christ Jesus.",
        version: "AMP"
      },
      {
        reference: "1 Peter 5:7 (NKJV)",
        text: "casting all your care upon Him, for He cares for you.",
        version: "NKJV"
      },
      {
        reference: "Isaiah 26:3 (KJV)",
        text: "Thou wilt keep him in perfect peace, whose mind is stayed on thee: because he trusteth in thee.",
        version: "KJV"
      }
    ],
    joyStrategySteps: [
      "The 'Cast and Keep' Principle: Verbally name every worry and cast it across into Jesus' hands.",
      "Engage the breath of the Spirit: Inhale the peace of Christ, exhale every toxic fear and panic thought.",
      "Replace 'What If' scenarios with 'Even If' faith: God's presence will carry you through every fire.",
      "Feed on scriptures of divine protection daily (Psalm 91, Psalm 23, Isaiah 41:10)."
    ],
    fortressDeclaration: "I refuse to be terrorized by fear. The peace of God reigns supreme in my mind. God is my refuge, my shield, and my strong tower!",
    deliverancePrayer: "Lord Jesus, Prince of Peace, I rebuke every spirit of panic, torment, and anxious dread in Your Name. You purchased my peace with Your blood. I cast every financial, physical, and familial anxiety upon You right now. Let Your supernatural peace flood my mind. Amen!",
    praisePrescription: "Play anointed worship music softly during sleep and speak Philippians 4:13 whenever you feel a palpitation of worry.",
    testimonyOfVictory: "A young professional suffering from debilitating night panic attacks began decreeing Isaiah 26:3 daily; within 10 days, all panic ceased and deep restorative sleep was restored."
  },
  {
    id: "joy-03-conquering-depression-and-heaviness",
    challengeTitle: "Lifting the Cloak of Depression, Burnout, and Hopelessness",
    category: "Depression & Heaviness",
    rootDeception: "The dark whisper that tomorrow holds no meaning and that your existence makes no difference.",
    scripturalTruth: "You are God's workmanship created in Christ Jesus for good works planned before time began (Ephesians 2:10). Your life is deeply valuable to Heaven.",
    anchorVerses: [
      {
        reference: "Psalm 42:11 (KJV)",
        text: "Why art thou cast down, O my soul? and why art thou disquieted within me? hope thou in God: for I shall yet praise him, who is the health of my countenance, and my God.",
        version: "KJV"
      },
      {
        reference: "Romans 15:13 (NIV)",
        text: "May the God of hope fill you with all joy and peace as you trust in him, so that you may overflow with hope by the power of the Holy Spirit.",
        version: "NIV"
      },
      {
        reference: "Psalm 34:18 (NKJV)",
        text: "The LORD is near to those who have a broken heart, and saves such as have a contrite spirit.",
        version: "NKJV"
      }
    ],
    joyStrategySteps: [
      "Talk to your soul instead of listening to your depression (David in Psalm 42: 'Hope thou in God!').",
      "Step into sunlight and take a purposeful walk while praying in the Spirit.",
      "Reach out to an anointed brother or sister in Christ; isolation is the enemy's incubator.",
      "Write down 5 concrete things God did for you in the past and thank Him aloud."
    ],
    fortressDeclaration: "Depression has no legal dominion over my life! The joy of the Lord is my vital energy and strength. I am clothed with light, purpose, and eternal destiny!",
    deliverancePrayer: "Heavenly Father, break the oppressive dark cloud hanging over my mind. Send the light of Your countenance into the deep crevices of my soul. I receive the joy of the Holy Ghost, fresh fire in my bones, and divine motivation to run my race with vigor. In Jesus' Name, Amen!",
    praisePrescription: "Declare Psalm 103 aloud every morning before getting out of bed, commanding your soul to bless the Lord.",
    testimonyOfVictory: "A student immobilized by chronic burnout applied the 'Praise First' routine each dawn; in two weeks, their appetite for scripture returned, anxiety dissolved, and academic success was achieved."
  },
  {
    id: "joy-04-triumph-over-financial-trials",
    challengeTitle: "Breaking Through Financial Adversity, Debt, and Lack",
    category: "Financial Strain",
    rootDeception: "The lie that the economy of this world dictates your provision and that God cannot provide in the wilderness.",
    scripturalTruth: "My God shall supply all your need according to his riches in glory by Christ Jesus (Philippians 4:19).",
    anchorVerses: [
      {
        reference: "Philippians 4:19 (KJV)",
        text: "But my God shall supply all your need according to his riches in glory by Christ Jesus.",
        version: "KJV"
      },
      {
        reference: "Psalm 37:25 (NKJV)",
        text: "I have been young, and now am old; yet I have not seen the righteous forsaken, nor his descendants begging bread.",
        version: "NKJV"
      },
      {
        reference: "2 Corinthians 9:8 (AMP)",
        text: "And God is able to make all grace [every favor and earthly blessing] come in abundance to you, so that you may always [under all circumstances, regardless of the need] have complete sufficiency in everything.",
        version: "AMP"
      }
    ],
    joyStrategySteps: [
      "Maintain the posture of a cheerful giver even in scarcity (The Widow of Zarephath).",
      "Repent of financial fear and break agreements with the spirit of poverty.",
      "Practice Kingdom budgeting, honest diligence, and creative innovation inspired by the Holy Spirit.",
      "Thank God in advance for supernatural debt cancellation and divine open doors."
    ],
    fortressDeclaration: "I am plugged into the unlimited economy of Heaven! Scarcity is broken over my household. Divine ideas, wealth creation, and supernatural provision are flowing toward me!",
    deliverancePrayer: "Jehovah Jireh, Great Provider, I thank You that You open the windows of Heaven. Rebuke the devourer for my sake. Grant me wisdom to manage wealth, creative ideas to produce value, and generous hands to bless Your Kingdom. In Jesus' Name, Amen!",
    praisePrescription: "Give thanks specifically for 3 unexpected ways God provided for you in the past, and praise Him for 10 minutes.",
    testimonyOfVictory: "A businessman facing bankruptcy chose to maintain faithful tithes and praise during the lawsuit; an unlooked-for international contract was awarded that wiped out all debt within 60 days."
  },
  {
    id: "joy-05-overcoming-family-and-marital-storms",
    challengeTitle: "Restoring Peace, Healing Hurt, and Rebuilding Marital/Family Harmony",
    category: "Marital & Family Storms",
    rootDeception: "The lie that relationships are beyond repair and that unforgiveness is your only defense.",
    scripturalTruth: "Love never fails (1 Corinthians 13:8). The Lord is able to heal relational breaches and restore unity.",
    anchorVerses: [
      {
        reference: "Colossians 3:12-14 (NKJV)",
        text: "Therefore, as the elect of God, holy and beloved, put on tender mercies, kindness, humility, meekness, longsuffering; bearing with one another, and forgiving one another... But above all these things put on love, which is the bond of perfection.",
        version: "NKJV"
      },
      {
        reference: "Proverbs 15:1 (KJV)",
        text: "A soft answer turneth away wrath: but grievous words stir up anger.",
        version: "KJV"
      },
      {
        reference: "Joshua 24:15 (KJV)",
        text: "As for me and my house, we will serve the LORD.",
        version: "KJV"
      }
    ],
    joyStrategySteps: [
      "Choose unconditional forgiveness: release the offender into God's courtroom.",
      "Guard your tongue: refuse to retaliate with sharp, wounding words.",
      "Create an atmosphere of prayer in the home; pray for your family members in secret.",
      "Sow seeds of honor, appreciation, and selfless service without demanding immediate applause."
    ],
    fortressDeclaration: "My home is a sanctuary of peace, love, and divine unity. Every scheme of discord is broken by the love of Christ!",
    deliverancePrayer: "Lord God, heal the broken places in my family. Remove every wall of pride, resentment, and misunderstanding. Teach us to love with the agape love of Christ. Make our household an altar of praise. In Jesus' Name, Amen!",
    praisePrescription: "Bless each member of your household by name in prayer, speaking life and peace over their destiny.",
    testimonyOfVictory: "A fractured marriage on the brink of divorce experienced complete restoration after both spouses committed to 30 days of silent prayer and intentional acts of kindness."
  },
  {
    id: "joy-06-conquering-loneliness-and-isolation",
    challengeTitle: "Conquering the Valley of Loneliness, Rejection, and Isolation",
    category: "Emotional Battles",
    rootDeception: "The lie that nobody cares, that you are forgotten by God and man, and that you are doomed to walk alone.",
    scripturalTruth: "God sets the solitary in families (Psalm 68:6) and Jesus promises: 'I will never leave thee, nor forsake thee' (Hebrews 13:5).",
    anchorVerses: [
      {
        reference: "Hebrews 13:5 (KJV)",
        text: "I will never leave thee, nor forsake thee.",
        version: "KJV"
      },
      {
        reference: "Psalm 27:10 (NKJV)",
        text: "When my father and my mother forsake me, then the LORD will take care of me.",
        version: "NKJV"
      },
      {
        reference: "Isaiah 41:10 (KJV)",
        text: "Fear thou not; for I am with thee: be not dismayed; for I am thy God: I will strengthen thee; yea, I will help thee; yea, I will uphold thee with the right hand of my righteousness.",
        version: "KJV"
      }
    ],
    joyStrategySteps: [
      "Realize that solitude with Jesus is an invitation into sacred intimacy, not a prison sentence.",
      "Break the spirit of self-pity by volunteering to encourage someone else in need.",
      "Join a local Bible-believing fellowship or small group; open your heart to godly community.",
      "Speak aloud: 'I am never alone, for the Father is always with me!'"
    ],
    fortressDeclaration: "I am never forsaken! The Lord Jesus Christ is my constant companion, friend, and shepherd. God is connecting me to genuine, covenant relationships in His family!",
    deliverancePrayer: "Precious Lord Jesus, thank You for Your unending companionship. Wrap Your arms of love around my wounded heart. Dissolve the icy grip of loneliness and connect me with brothers and sisters who will sharpen and encourage me in the faith. Amen!",
    praisePrescription: "Sing 'What a Friend We Have in Jesus' with eyes lifted to heaven, thanking Him for being your closest friend.",
    testimonyOfVictory: "A widow overwhelmed by grief and isolation began hosting a weekly home prayer circle; over 15 people found Christ and deep lifelong friendships were birthed."
  },
  {
    id: "joy-07-triumph-over-grief-and-shattered-losses",
    challengeTitle: "Healing from Crushing Grief, Sudden Bereavement, and Loss",
    category: "Grief & Bereavement",
    rootDeception: "The lie that your joy is permanently extinguished and that life will never have beauty or meaning again.",
    scripturalTruth: "To give unto them beauty for ashes, the oil of joy for mourning, the garment of praise for the spirit of heaviness (Isaiah 61:3).",
    anchorVerses: [
      {
        reference: "Isaiah 61:3 (KJV)",
        text: "To give unto them beauty for ashes, the oil of joy for mourning, the garment of praise for the spirit of heaviness.",
        version: "KJV"
      },
      {
        reference: "Psalm 30:5 (KJV)",
        text: "Weeping may endure for a night, but joy cometh in the morning.",
        version: "KJV"
      },
      {
        reference: "Revelation 21:4 (KJV)",
        text: "And God shall wipe away all tears from their eyes; and there shall be no more death, neither sorrow, nor crying, neither shall there be any more pain.",
        version: "KJV"
      }
    ],
    joyStrategySteps: [
      "Permit yourself to weep before the Lord—Jesus wept at Lazarus' tomb (John 11:35).",
      "Refuse the enemy's temptation to become bitter toward God in the midst of heartbreak.",
      "Anchor your expectation in the blessed hope of resurrection and eternal reunion in Christ.",
      "Wear the garment of praise intentionally, even when tears stream down your face."
    ],
    fortressDeclaration: "My mourning is being turned into holy joy! God is exchanging my ashes for supernatural beauty. My story does not end in tragedy; it culminates in eternal resurrection glory!",
    deliverancePrayer: "Father of all comfort, hold my aching heart in Your gentle hands. Pour the oil of gladness where sorrow has wounded me. Give me strength to take one breath at a time, trusting that morning is dawning. In Jesus' Name, Amen!",
    praisePrescription: "Whisper the Name of Jesus for 5 minutes and thank Him that your loved one's memory and your future are held in His eternal care.",
    testimonyOfVictory: "A father who lost his son in a tragic accident experienced miraculous peace after surrendering his anger; he now leads a grief recovery ministry that has comforted hundreds of families."
  },
  {
    id: "joy-08-dismantling-guilt-and-toxic-condemnation",
    challengeTitle: "Silencing the Voice of Accusation, Toxic Shame, and Guilt",
    category: "Spiritual Warfare",
    rootDeception: "The lie that God is disgusted with you, that your past sins are unforgivable, and that you must punish yourself to be clean.",
    scripturalTruth: "There is therefore now no condemnation to them which are in Christ Jesus, who walk not after the flesh, but after the Spirit (Romans 8:1).",
    anchorVerses: [
      {
        reference: "Romans 8:1 (KJV)",
        text: "There is therefore now no condemnation to them which are in Christ Jesus.",
        version: "KJV"
      },
      {
        reference: "1 John 1:9 (KJV)",
        text: "If we confess our sins, he is faithful and just to forgive us our sins, and to cleanse us from all unrighteousness.",
        version: "KJV"
      },
      {
        reference: "Micah 7:19 (KJV)",
        text: "He will turn again, he will have compassion upon us; he will subdue our iniquities; and thou wilt cast all their sins into the depths of the sea.",
        version: "KJV"
      }
    ],
    joyStrategySteps: [
      "Distinguish between Holy Spirit conviction (which leads to life and restoration) and Satanic condemnation (which drives into self-hatred).",
      "Declare aloud: 'The blood of Jesus cleanses me from ALL unrighteousness!'",
      "Refuse to re-dredge up what God has already buried in the sea of His forgetfulness.",
      "Stand tall as the righteousness of God in Christ Jesus (2 Corinthians 5:21)."
    ],
    fortressDeclaration: "I am not guilty! The debt has been paid in full by the blood of the Lamb. Satan, the accuser of the brethren, is cast down! I am free, justified, and righteous!",
    deliverancePrayer: "Lord Jesus, I silence every lying accusation of the enemy against my conscience. I receive the full washing of Your precious blood. I forgive myself for past failures and receive Your clean robe of righteousness today. Amen!",
    praisePrescription: "Stand before a mirror and declare 2 Corinthians 5:21 three times: 'I am the righteousness of God in Christ Jesus!'",
    testimonyOfVictory: "A believer tormented for 12 years by the memory of a past moral failure experienced instant liberation during communion after meditating on Micah 7:19."
  },
  {
    id: "joy-09-conquering-addiction-and-compulsive-cycles",
    challengeTitle: "Breaking Free from Addictions, Vices, and Destructive Habits",
    category: "Addiction & Deliverance",
    rootDeception: "The lie that you are powerless against your cravings and that temporary chemical or sensual pleasure can fill your spiritual void.",
    scripturalTruth: "If the Son therefore shall make you free, ye shall be free indeed (John 8:36).",
    anchorVerses: [
      {
        reference: "John 8:36 (KJV)",
        text: "If the Son therefore shall make you free, ye shall be free indeed.",
        version: "KJV"
      },
      {
        reference: "1 Corinthians 10:13 (KJV)",
        text: "There hath no temptation taken you but such as is common to man: but God is faithful, who will not suffer you to be tempted above that ye are able; but will with the temptation also make a way to escape.",
        version: "KJV"
      },
      {
        reference: "Galatians 5:1 (KJV)",
        text: "Stand fast therefore in the liberty wherewith Christ hath made us free, and be not entangled again with the yoke of bondage.",
        version: "KJV"
      }
    ],
    joyStrategySteps: [
      "Bring the secret habit into the light with a trusted pastor or mature mentor; secrecy fuels addiction.",
      "Remove access triggers and environmental pathways that lead into compromise.",
      "Whenever a craving hits, engage in high-intensity praise or physical exercise for 10 minutes.",
      "Feed on the Word of God; truth displaces demonic compulsion."
    ],
    fortressDeclaration: "Every chain of addiction is broken off my life by the power of Jesus' blood! My body is the temple of the Holy Spirit. I walk in self-control, freedom, and victory!",
    deliverancePrayer: "Almighty God, sever every soul-tie, habit, and chemical addiction binding my will. Shatter the yoke of the oppressor. Baptize me with the fire of the Holy Ghost and fill the longing in my soul with Your presence. In Jesus' Name, Amen!",
    praisePrescription: "Shout 'Hallelujah, the chains are broken!' ten times whenever tempted, releasing praise into the spiritual realm.",
    testimonyOfVictory: "A young professional addicted to substance abuse for seven years cried out to God in his bedroom; the craving vanished instantaneously and he has been clean for eight years."
  },
  {
    id: "joy-10-overcoming-spiritual-dryness-and-wilderness",
    challengeTitle: "Navigating Spiritual Dryness, Wilderness, and Apparent Silence",
    category: "Spiritual Formation",
    rootDeception: "The lie that God has withdrawn His presence because you cannot 'feel' goosebumps or emotional highs.",
    scripturalTruth: "I will even make a way in the wilderness, and rivers in the desert (Isaiah 43:19). Faith walks by conviction, not sensory feelings.",
    anchorVerses: [
      {
        reference: "Isaiah 43:19 (KJV)",
        text: "Behold, I will do a new thing; now it shall spring forth; shall ye not know it? I will even make a way in the wilderness, and rivers in the desert.",
        version: "KJV"
      },
      {
        reference: "Psalm 63:1 (KJV)",
        text: "O God, thou art my God; early will I seek thee: my soul thirsteth for thee, my flesh longeth for thee in a dry and thirsty land, where no water is.",
        version: "KJV"
      },
      {
        reference: "Habakkuk 3:17-18 (KJV)",
        text: "Although the fig tree shall not blossom, neither shall fruit be in the vines... Yet I will rejoice in the LORD, I will joy in the God of my salvation.",
        version: "KJV"
      }
    ],
    joyStrategySteps: [
      "Shift your foundation from emotional feelings to the immutable Word of God.",
      "Dig spiritual wells in your dry valley through fasting, scripture memorization, and secret prayer.",
      "Remember that the wilderness was the birthplace of Israel's manna, water from the rock, and the pillar of cloud.",
      "Offer the 'sacrifice of praise'—praising God when you feel nothing is the highest form of worship."
    ],
    fortressDeclaration: "My desert is turning into an oasis! God is cultivating spiritual depth, endurance, and authority within me. Living water flows from my innermost being!",
    deliverancePrayer: "Lord, even when the heavens seem silent, I trust Your heart. Rain down Your Holy Spirit upon the dry soil of my life. Awaken fresh hunger and unquenchable thirst for Your presence. In Jesus' Name, Amen!",
    praisePrescription: "Fast one meal and spend that time reading Psalm 63 and worshiping without instruments.",
    testimonyOfVictory: "A missionary facing an 18-month spiritual dry season persevered in daily scripture reading; a sudden revival broke out in their village with over 300 conversions."
  },
  {
    id: "joy-11-triumph-over-fear-of-the-future-and-destiny-delay",
    challengeTitle: "Conquering Fear of Tomorrow, Career Uncertainty, and Destiny Delay",
    category: "Destiny & Career",
    rootDeception: "The lie that you are running out of time, that your best years have been wasted, and that God has forgotten His promises to you.",
    scripturalTruth: "For I know the thoughts that I think toward you, saith the LORD, thoughts of peace, and not of evil, to give you an expected end (Jeremiah 29:11).",
    anchorVerses: [
      {
        reference: "Jeremiah 29:11 (KJV)",
        text: "For I know the thoughts that I think toward you, saith the LORD, thoughts of peace, and not of evil, to give you an expected end.",
        version: "KJV"
      },
      {
        reference: "Joel 2:25 (KJV)",
        text: "And I will restore to you the years that the locust hath eaten, the cankerworm, and the caterpiller, and the palmerworm.",
        version: "KJV"
      },
      {
        reference: "Psalm 31:15 (KJV)",
        text: "My times are in thy hand: deliver me from the hand of mine enemies, and from them that persecute me.",
        version: "KJV"
      }
    ],
    joyStrategySteps: [
      "Trust God's divine timetable; Joseph was in prison until the exact day Pharaoh had the dream.",
      "Stop comparing your chapter 4 with someone else's chapter 20.",
      "Diligently build your character, skills, and faith in hidden obscurity.",
      "Praise God for redeeming and restoring wasted years with supernatural acceleration."
    ],
    fortressDeclaration: "My times are in God's hands! The locust has no authority over my destiny. God is restoring every lost season, and my future is bright, secure, and crowned with glory!",
    deliverancePrayer: "Heavenly Father, I cast all anxiety about my future, career, and marriage at Your feet. I trust Your sovereign timing. Accelerate Your promises and fulfill every word spoken over my life. In Jesus' Name, Amen!",
    praisePrescription: "Write down your top 3 dreams and lay your hands on the paper while thanking God for their fulfillment.",
    testimonyOfVictory: "A woman unemployed for 2 years used her waiting season to write a curriculum; she was later hired as director of a major non-profit to implement that exact curriculum."
  },
  {
    id: "joy-12-breaking-imposter-syndrome-and-inferiority",
    challengeTitle: "Overcoming Imposter Syndrome, Inadequacy, and Self-Doubt",
    category: "Self-Worth & Calling",
    rootDeception: "The lie that you are a fraud, unqualified, and that your flaws will soon be exposed to your utter humiliation.",
    scripturalTruth: "Not that we are sufficient of ourselves to think any thing as of ourselves; but our sufficiency is of God (2 Corinthians 3:5).",
    anchorVerses: [
      {
        reference: "2 Corinthians 3:5 (KJV)",
        text: "Not that we are sufficient of ourselves to think any thing as of ourselves; but our sufficiency is of God.",
        version: "KJV"
      },
      {
        reference: "Judges 6:12, 14 (KJV)",
        text: "The LORD is with thee, thou mighty man of valour... Go in this thy might, and thou shalt save Israel: have not I sent thee?",
        version: "KJV"
      },
      {
        reference: "Philippians 4:13 (KJV)",
        text: "I can do all things through Christ which strengtheneth me.",
        version: "KJV"
      }
    ],
    joyStrategySteps: [
      "Shift your reliance from self-confidence (flesh) to Christ-confidence (Spirit).",
      "Remember that God deliberately chooses the weak things of the world to confound the mighty (1 Cor 1:27).",
      "Step boldly into rooms and assignments knowing you are an ambassador sent by the King of Kings.",
      "Focus on serving the people in front of you rather than evaluating your own performance."
    ],
    fortressDeclaration: "My sufficiency is in God! I am not an imposter; I am a chosen vessel anointed by the Holy Spirit. I can do all things through Christ who strengthens me!",
    deliverancePrayer: "Lord Jesus, uproot every root of insecurity, timidity, and self-doubt. Fill me with the holy boldness of the Holy Spirit. Let Your strength be made perfect in my weakness. Amen!",
    praisePrescription: "Declare Philippians 4:13 aloud five times before stepping into meetings, classes, or interviews.",
    testimonyOfVictory: "A timid young teacher struggling with debilitating self-doubt meditated on Gideon's story; within a year, she was voted teacher of the year and appointed department head."
  },
  {
    id: "joy-13-triumph-over-workplace-persecution-and-hostility",
    challengeTitle: "Standing Strong Against Workplace Hostility, Slander, and Toxic Environments",
    category: "Workplace & Society",
    rootDeception: "The lie that you must compromise your faith to survive professionally and that vindication must come through political backstabbing.",
    scripturalTruth: "Promotion cometh neither from the east, nor from the west, nor from the south. But God is the judge: he putteth down one, and setteth up another (Psalm 75:6-7).",
    anchorVerses: [
      {
        reference: "Psalm 75:6-7 (KJV)",
        text: "For promotion cometh neither from the east, nor from the west, nor from the south. But God is the judge.",
        version: "KJV"
      },
      {
        reference: "Matthew 5:11-12 (KJV)",
        text: "Blessed are ye, when men shall revile you, and persecute you, and shall say all manner of evil against you falsely, for my sake. Rejoice, and be exceeding glad.",
        version: "KJV"
      },
      {
        reference: "Daniel 6:3 (KJV)",
        text: "Then this Daniel was preferred above the presidents and princes, because an excellent spirit was in him.",
        version: "KJV"
      }
    ],
    joyStrategySteps: [
      "Cultivate an excellent spirit in your daily deliverables, exceeding worldly expectations.",
      "Pray blessings over difficult supervisors and colleagues (Luke 6:28).",
      "Do not gossip, complain, or enter office conspiracies; keep your hands clean and your tongue pure.",
      "Trust God to fight your battles; He is your divine advocate and promoter."
    ],
    fortressDeclaration: "God is my shield, my glory, and the lifter of my head! No conspiracy or false slander can derail God's promotion over my career. I walk in Daniel's anointing of excellence and favor!",
    deliverancePrayer: "Father, protect my reputation and peace in the workplace. Grant me supernatural wisdom, uncompromised integrity, and an excellent spirit. Use my life as a beacon of light in this environment. In Jesus' Name, Amen!",
    praisePrescription: "Pray for your supervisor by name, thanking God that He has given you favor in their eyes.",
    testimonyOfVictory: "An employee targeted by an envious manager refused to retaliate; when an audit was conducted, the employee's integrity was revealed and they were promoted to manage the entire division."
  },
  {
    id: "joy-14-overcoming-chronic-physical-pain-and-affliction",
    challengeTitle: "Victorious Joy and Healing in the Midst of Chronic Pain and Affliction",
    category: "Physical Affliction",
    rootDeception: "The lie that pain has defeated your purpose and that you will never experience strength or vital living again.",
    scripturalTruth: "He sent his word, and healed them, and delivered them from their destructions (Psalm 107:20).",
    anchorVerses: [
      {
        reference: "Psalm 107:20 (KJV)",
        text: "He sent his word, and healed them, and delivered them from their destructions.",
        version: "KJV"
      },
      {
        reference: "Isaiah 53:5 (KJV)",
        text: "But he was wounded for our transgressions, he was bruised for our iniquities: the chastisement of our peace was upon him; and with his stripes we are healed.",
        version: "KJV"
      },
      {
        reference: "Psalm 103:2-3 (KJV)",
        text: "Bless the LORD, O my soul, and forget not all his benefits: Who forgiveth all thine iniquities; who healeth all thy diseases.",
        version: "KJV"
      }
    ],
    joyStrategySteps: [
      "Immerse your mind in healing scriptures and listen to audio recordings of God's promises.",
      "Take communion daily with holy reverence, receiving the broken body and poured-out blood of Jesus for physical healing.",
      "Praise God for healing before symptoms completely disappear; praise releases resurrection power.",
      "Speak words of health, vitality, and renewal to every joint, muscle, and organ."
    ],
    fortressDeclaration: "By the stripes of Jesus I am healed! Sickness, infirmity, and chronic pain have no dominion over my mortal body. The life of Christ revitalizes my youth like the eagle's!",
    deliverancePrayer: "Great Physician, stretch forth Your healing hand over my body. Rebuke every spirit of infirmity and inflammation. Restore perfect health, sound sleep, and energetic strength to my limbs. In Jesus' Mighty Name, Amen!",
    praisePrescription: "Declare Isaiah 53:5 while placing your hand on the area of physical discomfort, praising Jesus for His stripes.",
    testimonyOfVictory: "A patient diagnosed with incurable chronic nerve pain began a daily routine of healing scripture confession and praise; medical scans 6 months later showed total cellular regeneration."
  },
  {
    id: "joy-15-conquering-bitterness-and-the-poison-of-offense",
    challengeTitle: "Uprooting the Root of Bitterness, Resentment, and Unforgiveness",
    category: "Heart Healing",
    rootDeception: "The lie that holding onto anger protects you from future betrayal, whereas bitterness is actually drinking poison and expecting the other person to die.",
    scripturalTruth: "Looking diligently lest any man fail of the grace of God; lest any root of bitterness springing up trouble you, and thereby many be defiled (Hebrews 12:15).",
    anchorVerses: [
      {
        reference: "Hebrews 12:15 (KJV)",
        text: "Looking diligently lest any man fail of the grace of God; lest any root of bitterness springing up trouble you, and thereby many be defiled.",
        version: "KJV"
      },
      {
        reference: "Ephesians 4:31-32 (KJV)",
        text: "Let all bitterness, and wrath, and anger, and clamour, and evil speaking, be put away from you, with all malice: And be ye kind one to another, tenderhearted, forgiving one another, even as God for Christ's sake hath forgiven you.",
        version: "KJV"
      },
      {
        reference: "Mark 11:25 (KJV)",
        text: "And when ye stand praying, forgive, if ye have ought against any: that your Father also which is in heaven may forgive you your trespasses.",
        version: "KJV"
      }
    ],
    joyStrategySteps: [
      "Understand that forgiveness is a decisive choice of the will, not an emotion.",
      "Hand over the offender's debt to God's Supreme Court; His justice is perfect.",
      "Pray for the salvation, repentance, and blessing of those who spitefully used you (Matthew 5:44).",
      "Guard your heart with all diligence (Proverbs 4:23), refusing to rehearse offenses in your mind."
    ],
    fortressDeclaration: "My heart is free from the toxic poison of bitterness! I choose supernatural forgiveness. The love of God overflows within me, driving out all resentment, hatred, and malice!",
    deliverancePrayer: "Father, by the power of the Holy Spirit, I release every person who has wronged, betrayed, or wounded me. I forgive them unconditionally just as You forgave me in Christ. Wash my heart clean and fill me with Your divine peace. Amen!",
    praisePrescription: "Name the person who hurt you aloud in prayer, speak a sincere blessing over their life, and thank God for setting your heart free.",
    testimonyOfVictory: "A woman tormented by anger toward an abusive relative made the decision to forgive; an unexplained chronic migraine condition vanished that very afternoon."
  },
  {
    id: "joy-16-overcoming-loneliness-and-isolation",
    challengeTitle: "Conquering Loneliness, Abandonment, and Feeling Forgotten",
    category: "Emotional Battles",
    rootDeception: "The lie that you are completely alone, unloved, and that nobody truly understands or cares for you.",
    scripturalTruth: "Jesus promised: 'I will never leave thee, nor forsake thee' (Hebrews 13:5). You are enveloped by the loving presence of the Trinity.",
    anchorVerses: [
      {
        reference: "Hebrews 13:5 (KJV)",
        text: "For he hath said, I will never leave thee, nor forsake thee.",
        version: "KJV"
      },
      {
        reference: "Psalm 27:10 (KJV)",
        text: "When my father and my mother forsake me, then the LORD will take me up.",
        version: "KJV"
      },
      {
        reference: "Psalm 68:6 (KJV)",
        text: "God setteth the solitary in families: he bringeth out those which are bound with chains.",
        version: "KJV"
      }
    ],
    joyStrategySteps: [
      "Turn your solitude into a sacred sanctuary of divine communion with the Holy Spirit.",
      "Recognize that the feeling of isolation is a demonic attempt to cut you off from Christian fellowship.",
      "Take initiative to connect with a healthy local church small group or volunteer ministry.",
      "Reach out to someone who is hurting; ministering to others breaks the self-focused cycle of loneliness."
    ],
    fortressDeclaration: "I am never alone! The Lord of Hosts walks beside me, dwells within me, and surrounds me with His lovingkindness. Loneliness has no dominion over my spirit!",
    deliverancePrayer: "Lord Jesus, You know the pain of being abandoned by friends in Gethsemane. I cast the heavy shroud of loneliness at Your feet. Fill my heart with Your sweet presence, and lead me to godly brothers and sisters who will sharpen and encourage my faith. Amen!",
    praisePrescription: "Play a quiet worship anthem and spend 10 minutes thanking Jesus simply for being your closest, most faithful Friend.",
    testimonyOfVictory: "A young man living far from home experienced severe isolation; after dedicating his evenings to worship and joining a church outreach team, he formed deep, lifelong kingdom friendships."
  },
  {
    id: "joy-17-breaking-spiritual-burnout-and-dryness",
    challengeTitle: "Restoring Holy Fire After Severe Spiritual Burnout and Exhaustion",
    category: "Spiritual Formation",
    rootDeception: "The lie that you must sustain the Kingdom of God by your own fleshly energy, leading to spiritual depletion.",
    scripturalTruth: "He giveth power to the faint; and to them that have no might he increaseth strength (Isaiah 40:29).",
    anchorVerses: [
      {
        reference: "Isaiah 40:29, 31 (KJV)",
        text: "He giveth power to the faint; and to them that have no might he increaseth strength... But they that wait upon the LORD shall renew their strength; they shall mount up with wings as eagles.",
        version: "KJV"
      },
      {
        reference: "Matthew 11:28-30 (KJV)",
        text: "Come unto me, all ye that labour and are heavy laden, and I will give you rest. Take my yoke upon you, and learn of me... For my yoke is easy, and my burden is light.",
        version: "KJV"
      },
      {
        reference: "Psalm 23:2-3 (KJV)",
        text: "He maketh me to lie down in green pastures: he leadeth me beside the still waters. He restoreth my soul.",
        version: "KJV"
      }
    ],
    joyStrategySteps: [
      "Distinguish between ministering FOR God and abiding WITH God in intimate rest.",
      "Implement a strict weekly Sabbath: cease from striving, unplug from digital noise, and rest physically and mentally.",
      "Drink deeply from the fountain of God's Word without the pressure of preparing notes or sermons for others.",
      "Repent of self-reliance and ask the Holy Spirit to be the sole engine of your ministry work."
    ],
    fortressDeclaration: "I do not run on empty! My soul is refreshed in the green pastures of God's grace. The Holy Spirit renews my stamina, and my spiritual fire burns with pure heavenly oil!",
    deliverancePrayer: "Precious Holy Spirit, breathe upon the dying embers of my soul. I lay down every self-imposed yoke of human performance. Restore unto me the joy of my salvation and teach me to rest in Your finished work. In Jesus' Name, Amen!",
    praisePrescription: "Sit in silence before God for 15 minutes without any agenda, whispering: 'The Lord is my Shepherd, I lack nothing.'",
    testimonyOfVictory: "A veteran pastor contemplating resignation due to utter exhaustion took a dedicated silent retreat of prayer; God rekindled his calling and sparked an extraordinary revival in his church."
  },
  {
    id: "joy-18-demolishing-imposter-syndrome-and-inadequacy",
    challengeTitle: "Demolishing Inadequacy, Shame, and Imposter Syndrome",
    category: "Self-Worth & Calling",
    rootDeception: "The lie that you are a fraud, unqualified, and that sooner or later everyone will discover you do not belong.",
    scripturalTruth: "Not that we are sufficient of ourselves to think any thing as of ourselves; but our sufficiency is of God (2 Corinthians 3:5).",
    anchorVerses: [
      {
        reference: "2 Corinthians 3:5 (KJV)",
        text: "Not that we are sufficient of ourselves to think any thing as of ourselves; but our sufficiency is of God.",
        version: "KJV"
      },
      {
        reference: "1 Corinthians 1:27 (KJV)",
        text: "God hath chosen the foolish things of the world to confound the wise; and God hath chosen the weak things of the world to confound the things which are mighty.",
        version: "KJV"
      },
      {
        reference: "Exodus 4:11-12 (KJV)",
        text: "And the LORD said unto him, Who hath made man's mouth?... Now therefore go, and I will be with thy mouth, and teach thee what thou shalt say.",
        version: "KJV"
      }
    ],
    joyStrategySteps: [
      "Shift the spotlight from your limited credentials to God's limitless qualification of the called.",
      "Renounce the spirit of comparison; your assignment is tailored uniquely by the Sovereign Potter.",
      "Embrace holy dependence: when you are weak, then Christ in you is exceedingly strong.",
      "Walk into every meeting and platform with the boldness of an ambassador sent by the King of Kings."
    ],
    fortressDeclaration: "I am who God says I am! I am anointed, equipped, and qualified by the Blood of Jesus. My competence and sufficiency come from the Almighty God!",
    deliverancePrayer: "Father, I dismantle every voice of self-doubt and demonic intimidation in my mind. You called me before the foundation of the world. Anoint my tongue and hands to perform Your will with supernatural excellence. Amen!",
    praisePrescription: "Stand before a mirror and read aloud Psalm 139:14: 'I will praise thee; for I am fearfully and wonderfully made!'",
    testimonyOfVictory: "A young engineer paralyzed by fear of inadequacy in a high-stakes leadership role consecrated her work to Jesus; within a year she was awarded national innovation honors."
  },
  {
    id: "joy-19-overcoming-workplace-persecution-and-toxic-cultures",
    challengeTitle: "Thriving with Joy in Hostile Workplaces and Toxic Cultures",
    category: "Workplace & Society",
    rootDeception: "The lie that toxic colleagues or an unfair boss have the power to destroy your future and derail God's plan.",
    scripturalTruth: "Promotion cometh neither from the east, nor from the west, nor from the south: but God is the judge (Psalm 75:6-7).",
    anchorVerses: [
      {
        reference: "Psalm 75:6-7 (KJV)",
        text: "For promotion cometh neither from the east, nor from the west, nor from the south. But God is the judge: he putteth down one, and setteth up another.",
        version: "KJV"
      },
      {
        reference: "Daniel 6:3 (KJV)",
        text: "Then this Daniel was preferred above the presidents and princes, because an excellent spirit was in him; and the king thought to set him over the whole realm.",
        version: "KJV"
      },
      {
        reference: "Colossians 3:23-24 (KJV)",
        text: "And whatsoever ye do, do it heartily, as to the Lord, and not unto men; knowing that of the Lord ye shall receive the reward of the inheritance: for ye serve the Lord Christ.",
        version: "KJV"
      }
    ],
    joyStrategySteps: [
      "Carry an 'Excellent Spirit' like Daniel: never let workplace gossip, cynicism, or laziness touch your character.",
      "View your workplace as a mission field; pray silently for the peace and salvation of toxic coworkers.",
      "Keep your identity rooted in Christ's approval rather than human praise or office politics.",
      "Document your work diligently while trusting God to protect your reputation and promote you in due season."
    ],
    fortressDeclaration: "No weapon formed against my career, promotion, or workplace integrity shall prosper! I carry an excellent spirit, and God prepares a table before me in the presence of my enemies!",
    deliverancePrayer: "Lord Jesus, I work as unto You and not unto men. Grant me supernatural wisdom, patience, and discretion in my office. Let my light shine so brightly that even the harshest critics see Your glory. Amen!",
    praisePrescription: "Praise God for 5 minutes during your morning commute, declaring that you are carrying heaven's peace into your workplace.",
    testimonyOfVictory: "A believer endured years of unfair treatment from a hostile supervisor; instead of retaliating, she prayed for him. Months later, upper management discovered her exceptional work and promoted her over the entire department."
  },
  {
    id: "joy-20-breaking-generational-addictions-and-chains",
    challengeTitle: "Demolishing Generational Addictions and Compulsive Chains",
    category: "Addiction & Deliverance",
    rootDeception: "The lie that because addiction ran in your parents or grandparents, you are doomed to suffer the same bondage forever.",
    scripturalTruth: "If the Son therefore shall make you free, ye shall be free indeed (John 8:36). The power of the Blood of Jesus breaks every generational curse.",
    anchorVerses: [
      {
        reference: "John 8:36 (KJV)",
        text: "If the Son therefore shall make you free, ye shall be free indeed.",
        version: "KJV"
      },
      {
        reference: "Galatians 3:13 (KJV)",
        text: "Christ hath redeemed us from the curse of the law, being made a curse for us: for it is written, Cursed is every one that hangeth on a tree.",
        version: "KJV"
      },
      {
        reference: "2 Corinthians 10:4 (KJV)",
        text: "For the weapons of our warfare are not carnal, but mighty through God to the pulling down of strong holds.",
        version: "KJV"
      }
    ],
    joyStrategySteps: [
      "Confess the addiction honestly without excuses or hiding in darkness (James 5:16).",
      "Establish radical accountability: eliminate triggers, block access, and invite trusted mentors into your journey.",
      "Plead the Blood of Jesus over your bloodline and renounce all generational covenants with darkness.",
      "Fill the empty void with the presence of the Holy Spirit, worship, and Scripture memorization."
    ],
    fortressDeclaration: "The generational chain is broken at my generation! I am redeemed by the Blood of the Lamb. Addiction, lust, alcoholism, and compulsion have zero power over my redeemed soul!",
    deliverancePrayer: "Mighty Deliverer, by the authority of Jesus' Name and the power of His Blood, I break every generational chain of addiction. I command every demonic spirit of compulsion to leave my life right now. Holy Spirit, take total possession of my desires! Amen!",
    praisePrescription: "Shout aloud the Name of Jesus 12 times with holy aggression, celebrating your eternal freedom in Christ!",
    testimonyOfVictory: "A brother bound by a 15-year drug addiction broke the curse through radical surrender and deliverance prayer; today he runs a thriving rehabilitation ministry helping hundreds find Christ."
  },
  {
    id: "joy-21-triumphing-over-midlife-crisis-and-destiny-confusion",
    challengeTitle: "Navigating Destiny Transitions and Midlife Turbulence with Joy",
    category: "Destiny & Career",
    rootDeception: "The lie that your best years are behind you and that you have missed your golden opportunity to fulfill God's purpose.",
    scripturalTruth: "The righteous shall flourish like the palm tree... They shall still bring forth fruit in old age; they shall be fat and flourishing (Psalm 92:12, 14).",
    anchorVerses: [
      {
        reference: "Psalm 92:12, 14 (KJV)",
        text: "The righteous shall flourish like the palm tree: he shall grow like a cedar in Lebanon... They shall still bring forth fruit in old age; they shall be fat and flourishing.",
        version: "KJV"
      },
      {
        reference: "Jeremiah 29:11 (KJV)",
        text: "For I know the thoughts that I think toward you, saith the LORD, thoughts of peace, and not of evil, to give you an expected end.",
        version: "KJV"
      },
      {
        reference: "Joshua 14:10-11 (KJV)",
        text: "And now, behold, the LORD hath kept me alive, as he said, these forty and five years... As yet I am as strong this day as I was in the day that Moses sent me: as my strength was then, even so is my strength now.",
        version: "KJV"
      }
    ],
    joyStrategySteps: [
      "Understand that God's greatest leaders (Moses at 80, Caleb at 85, Abraham at 75) began their signature assignments in maturity.",
      "Audit your life's wisdom, scars, and lessons; realize that your past experiences are raw fuel for your next chapter.",
      "Release regret over paths not taken and focus your energy on the open doors of today.",
      "Invest in mentoring the rising generation while pursuing bold new spiritual frontiers."
    ],
    fortressDeclaration: "My latter days shall be greater than my beginning! I bring forth fruit in maturity. My youth is renewed like the eagle's, and my life's greatest impact is unfolding now!",
    deliverancePrayer: "Lord God of Abraham, Isaac, and Jacob, You are the Master of every season. I cast away the panic of the passing clock. Anoint my second half with greater fire, sharper wisdom, and exponential spiritual fruitfulness. In Jesus' Name, Amen!",
    praisePrescription: "Read Joshua 14:12 ('Give me this mountain!') aloud and praise God for the new mountains He is assigning you to conquer.",
    testimonyOfVictory: "A 52-year-old woman feeling purposeless after her children left home launched a community literacy ministry that has led over 300 families to Christ."
  },
  {
    id: "joy-22-overcoming-parental-heartache-and-prodigal-pain",
    challengeTitle: "Peace and Unshakable Faith for Parents of Prodigal Children",
    category: "Marital & Family Storms",
    rootDeception: "The lie that your child's rebellion is irreversible and that your parenting failures have doomed their eternal destiny.",
    scripturalTruth: "Refrain thy voice from weeping, and thine eyes from tears: for thy work shall be rewarded, saith the LORD; and they shall come again from the land of the enemy (Jeremiah 31:16).",
    anchorVerses: [
      {
        reference: "Jeremiah 31:16-17 (KJV)",
        text: "Refrain thy voice from weeping, and thine eyes from tears: for thy work shall be rewarded, saith the LORD; and they shall come again from the land of the enemy. And there is hope in thine end, saith the LORD, that thy children shall come again to their own border.",
        version: "KJV"
      },
      {
        reference: "Luke 15:20 (KJV)",
        text: "And he arose, and came to his father. But when he was yet a great way off, his father saw him, and had compassion, and ran, and fell on his neck, and kissed him.",
        version: "KJV"
      },
      {
        reference: "Isaiah 54:13 (KJV)",
        text: "And all thy children shall be taught of the LORD; and great shall be the peace of thy children.",
        version: "KJV"
      }
    ],
    joyStrategySteps: [
      "Stop lecturing in the flesh and start travailing in the Spirit: prayer reaches places human words cannot penetrate.",
      "Release guilt and condemnation; the Cross covers all parental shortcomings.",
      "Keep the porch light of love on: emulate the prodigal's father with unconditional love and holy expectation.",
      "Speak prophetic destiny over your children daily, calling them saved, sanctified, and mighty in the earth."
    ],
    fortressDeclaration: "My children are a heritage from the Lord! They shall not perish in the wilderness of the world. The Holy Spirit is drawing them home, and they will serve Jesus with all their hearts!",
    deliverancePrayer: "Heavenly Father, I place my children into Your hands. Send conviction, send angels, and orchestrate divine encounters that will awaken their hearts to Your love. Bring every prodigal home to the cross! Amen!",
    praisePrescription: "Hold up a photo or write your child's name in your Bible over Jeremiah 31:16, thanking God with tears of faith for their return.",
    testimonyOfVictory: "A mother prayed for 11 years for her addicted son who had severed all contact; one Sunday morning he walked into church weeping and surrendered his life to Christ."
  },
  {
    id: "joy-23-overcoming-chronic-insomnia-and-night-terrors",
    challengeTitle: "Supernatural Rest, Sweet Sleep, and Deliverance from Night Terrors",
    category: "Anxiety & Fear",
    rootDeception: "The lie that nighttime is a realm of torment and that peaceful sleep is impossible for you.",
    scripturalTruth: "When thou liest down, thou shalt not be afraid: yea, thou shalt lie down, and thy sleep shall be sweet (Proverbs 3:24).",
    anchorVerses: [
      {
        reference: "Proverbs 3:24 (KJV)",
        text: "When thou liest down, thou shalt not be afraid: yea, thou shalt lie down, and thy sleep shall be sweet.",
        version: "KJV"
      },
      {
        reference: "Psalm 4:8 (KJV)",
        text: "I will both lay me down in peace, and sleep: for thou, LORD, only makest me dwell in safety.",
        version: "KJV"
      },
      {
        reference: "Psalm 127:2 (KJV)",
        text: "It is vain for you to rise up early, to sit up late, to eat the bread of sorrows: for so he giveth his beloved sleep.",
        version: "KJV"
      }
    ],
    joyStrategySteps: [
      "Establish a holy bedtime altar: turn off stimulating screens 45 minutes before sleep and read Psalms.",
      "Anoint your bedroom and bed with prayer, commanding all demonic nightmares and anxiety to flee.",
      "Practice deep rhythmic breathing while meditating on God's omnipresent protection.",
      "Cast the cares of the day onto Jesus before your head touches the pillow."
    ],
    fortressDeclaration: "The Lord giveth His beloved sleep! I lie down in safety and peace. No tormenting nightmares or nocturnal panic can enter my sanctuary. My sleep is sweet and restorative!",
    deliverancePrayer: "Prince of Peace, surround my bed with Your warring angels. Quiet my racing thoughts with Your love. I receive sound, uninterrupted, peaceful sleep tonight. In Jesus' mighty Name, Amen!",
    praisePrescription: "Whisper Psalm 91 in bed with your eyes closed until you drift into peaceful, heavenly sleep.",
    testimonyOfVictory: "A woman suffering from severe 5-year chronic insomnia began reciting Psalm 4:8 each night; her sleep was completely restored without medication."
  },
  {
    id: "joy-24-overcoming-financial-betrayal-and-debt-crises",
    challengeTitle: "Supernatural Recovery from Financial Betrayal and Unmanageable Debt",
    category: "Financial Strain",
    rootDeception: "The lie that a bad investment, business fraud, or towering debt has permanently bankrupted your future.",
    scripturalTruth: "And I will restore to you the years that the locust hath eaten... And ye shall eat in plenty, and be satisfied, and praise the name of the LORD (Joel 2:25-26).",
    anchorVerses: [
      {
        reference: "Joel 2:25-26 (KJV)",
        text: "And I will restore to you the years that the locust hath eaten... And ye shall eat in plenty, and be satisfied, and praise the name of the LORD your God, that hath dealt wondrously with you.",
        version: "KJV"
      },
      {
        reference: "Deuteronomy 28:12 (KJV)",
        text: "The LORD shall open unto thee his good treasure, the heaven to give the rain unto thy land in his season... and thou shalt lend unto many nations, and thou shalt not borrow.",
        version: "KJV"
      },
      {
        reference: "Philippians 4:19 (KJV)",
        text: "But my God shall supply all your need according to his riches in glory by Christ Jesus.",
        version: "KJV"
      }
    ],
    joyStrategySteps: [
      "Refuse bitter resentment toward those who defrauded or took advantage of you; forgive so your financial channels stay open.",
      "Create a disciplined, prayer-backed debt payoff plan while maintaining your tithes and offerings.",
      "Pray for divine ideas, new revenue streams, and creative supernatural strategies (Proverbs 8:12).",
      "Trust God as your True Source; earthly employers and investments are merely secondary channels."
    ],
    fortressDeclaration: "God is my Provider and Restorer! The devourer is rebuked from my finances. My debts are being supernaturally cancelled, and the wealth of the Kingdom is unlocked for my life!",
    deliverancePrayer: "Lord of the Harvest, I bring my financial burdens to Your throne. You made water come from the rock and multiplied loaves and fishes. Grant me financial wisdom, cancel every debt, and release a season of supernatural abundance! Amen!",
    praisePrescription: "Write down your debt total, write 'PAID IN FULL BY FAITH' across it, and praise God for 7 minutes for His supernatural provision.",
    testimonyOfVictory: "A couple defrauded of their retirement savings maintained their tithe and praise; within 18 months, an unexpected property inheritance restored 3 times what was lost."
  },
  {
    id: "joy-25-overcoming-rejection-and-unrequited-love",
    challengeTitle: "Healing from Broken Engagements, Unrequited Love, and Romantic Rejection",
    category: "Heart Healing",
    rootDeception: "The lie that because a person rejected you, you are unlovable, broken, and destined to be forever alone.",
    scripturalTruth: "The LORD hath appeared of old unto me, saying, Yea, I have loved thee with an everlasting love: therefore with lovingkindness have I drawn thee (Jeremiah 31:3).",
    anchorVerses: [
      {
        reference: "Jeremiah 31:3 (KJV)",
        text: "The LORD hath appeared of old unto me, saying, Yea, I have loved thee with an everlasting love: therefore with lovingkindness have I drawn thee.",
        version: "KJV"
      },
      {
        reference: "Psalm 147:3 (KJV)",
        text: "He healeth the broken in heart, and bindeth up their wounds.",
        version: "KJV"
      },
      {
        reference: "Isaiah 54:5 (KJV)",
        text: "For thy Maker is thine husband; the LORD of hosts is his name; and thy Redeemer the Holy One of Israel.",
        version: "KJV"
      }
    ],
    joyStrategySteps: [
      "Recognize that what feels like devastating rejection is often God's supernatural protection and redirection.",
      "Allow the Holy Spirit to heal your heart without rushing into unhealthy rebound relationships.",
      "Find your supreme validation and identity in the unconditional, everlasting love of Jesus Christ.",
      "Trust that God's ultimate plan for your relational destiny is far greater than what was lost."
    ],
    fortressDeclaration: "I am deeply loved, cherished, and valued by the Creator of the universe! Rejection cannot diminish my worth. God is writing a glorious story of joy and restoration for my future!",
    deliverancePrayer: "Loving Father, bind up the wounds of my broken heart. Uproot all feelings of worthlessness and abandonment. Wrap me in the mantle of Your everlasting love and prepare me for the divine destiny You have planned. In Jesus' Name, Amen!",
    praisePrescription: "Listen to a tender love song to Jesus, thanking Him for loving you before the foundation of the world.",
    testimonyOfVictory: "A sister devastated by a cancelled wedding consecrated her heart to the Lord; 2 years later she married a godly pastor who honors and loves her with deep Christlike devotion."
  }
];

import { JOY_CATALOG_1000 } from "./joyCatalog1000";

export const FULL_JOY_OVERCOMING_LIST: JoyOvercomingChallenge[] = [
  ...JOY_OVERCOMING_PART1,
  ...JOY_OVERCOMING_PART2,
  ...JOY_OVERCOMING_PART3,
  ...JOY_OVERCOMING_PART4,
  ...JOY_CATALOG_1000
];


export const JOY_OVERCOMING_CATALOG: JoyOvercomingChallenge[] = FULL_JOY_OVERCOMING_LIST;


