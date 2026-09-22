/**
 * Permanent Content Reservoir for The Joy of the Lord
 * 
 * Multi-Tiered Stored Devotions Architecture:
 * - Maintains a library of rich, authentic devotions per Scripture reference
 *   (e.g., Jeremiah 29:11: Devotion A, B, C, D, E; Psalm 23:1: Devotion A, B, C, D, E)
 * - Two-Way Growth:
 *   1. Pre-seeded with canonical apostolic devotions.
 *   2. When AI is available: generates fresh devotions and automatically saves them
 *      into the permanent reservoir under that Scripture reference.
 *   3. When AI is unavailable: retrieves an appropriate stored devotion and displays it normally.
 *   4. When no stored devotion exists for that specific Scripture: displays a graceful
 *      temporary-unavailable message with direct links to explore stored devotions.
 */

import {
  ReservoirOutlet,
  UniversalReservoirItem,
  UniversalReservoirSelection,
  UniversalReservoirCatalogEntry
} from "./universalReservoirTypes";
import {
  PRE_SEEDED_PRAYERS,
  PRE_SEEDED_PRAYER_POINTS,
  PRE_SEEDED_EXPOSITIONS,
  PRE_SEEDED_JOY_REVELATIONS,
  PRE_SEEDED_RHEMA,
  PRE_SEEDED_MATHEMASERMONS,
  PRE_SEEDED_HISTORY,
  PRE_SEEDED_DOCTRINES
} from "./universalReservoirData";

export * from "./universalReservoirTypes";

export interface ReservoirDevotion {
  id: string;
  reference: string;
  label: string; // e.g. "Devotion A", "Devotion B", "Devotion C"
  title: string;
  keyScripture: string;
  passageText: string;
  reflection: string;
  practicalApplication: string;
  guidedPrayer: string;
  actionStep: string;
  apostolicDecree?: string;
  hopeAndEncouragementConclusion?: string;
  theme?: string;
  category?: string;
  editionLabel?: string;
  source: "canonical_reservoir" | "ai_generated_reservoir";
  savedAt?: string;
}

// Canonical Pre-Seeded Permanent Reservoir Library
export const PRE_SEEDED_RESERVOIR: Record<string, ReservoirDevotion[]> = {
  "jeremiah 29:11": [
    {
      id: "res-jer2911-a",
      reference: "Jeremiah 29:11",
      label: "Devotion A",
      title: "The Architect of Shalom: Sovereign Thoughts of Peace",
      keyScripture: "Jeremiah 29:11 (KJV) - 'For I know the thoughts that I think toward you, saith the Lord, thoughts of peace, and not of evil, to give you an expected end.'",
      passageText: "For I know the thoughts that I think toward you, saith the Lord, thoughts of peace, and not of evil, to give you an expected end. Then shall ye call upon me, and ye shall go and pray unto me, and I will hearken unto you.",
      reflection: `In Jeremiah 29, God's people were exiled in Babylon—uprooted from their ancestral homes, stripped of their temple, and mourning beneath foreign skies. False prophets urged them to anticipate a hasty, two-year escape. Yet God sent Jeremiah with a counter-intuitive decree: build houses, plant vineyards, pray for the peace of Babylon, and prepare for a seventy-year refining season.

Right in the epicenter of their displacement, the Lord declared: "For I know the thoughts (machashavah - intentional plans, architectural blueprints, sovereign decrees) that I think toward you." God's plans are not emergency improvisations triggered by our human crises; they are eternal intentions established before the foundation of the world. 

The Hebrew word 'shalom' denotes far more than the mere absence of conflict; it signifies total wholeness, divine completeness, prosperity of spirit, and covenant reconciliation. Even when your visible circumstances resemble Babylonian exile, God's inner posture toward you is relentless, covenant peace. He is actively weaving your delays into an eternal coronation of grace.`,
      practicalApplication: "Write down the single greatest uncertainty currently pressing on your heart. Directly beside it, write: 'God's thoughts toward me are shalom, not calamity.' Speak this aloud as an act of spiritual authority.",
      guidedPrayer: "Sovereign Father, Maker of Heaven and Earth, I rest my heart in Your eternal counsel. Forgive me for measuring Your love by my temporary discomfort. I thank You that You are weaving every delay and disappointment into an expected end of righteousness and joy. Guard my mind from hurry and anxiety. In Jesus' mighty Name, Amen.",
      actionStep: "Spend 5 uninterrupted minutes in quiet thanksgiving, surrendering your personal timeline to the perfect timing of God.",
      apostolicDecree: "I decree that God's sovereign thoughts of shalom are actively governing my life, my family, and my future. No earthly Babylon can overturn the expected end that God has ordained for me!",
      hopeAndEncouragementConclusion: "Anchor your soul in this immutable truth: God has never once lost control of your life. The Lord who began a good work in you will faithfully bring it to complete perfection in Christ Jesus!",
      theme: "Sovereign Shalom & Divine Purpose",
      category: "Covenant Providence",
      source: "canonical_reservoir"
    },
    {
      id: "res-jer2911-b",
      reference: "Jeremiah 29:11",
      label: "Devotion B",
      title: "The Unfolding Future: Hope in the Midst of Captivity",
      keyScripture: "Jeremiah 29:11 (KJV) - '...to give you an expected end.'",
      passageText: "For I know the thoughts that I think toward you, saith the Lord, thoughts of peace, and not of evil, to give you an expected end.",
      reflection: `The phrase translated "expected end" in the King James Version is rendered in the Hebrew as 'acharit ve-tiqvah'—literally, "a future and a hope." God does not promise an effortless journey free from obstacles, but He promises a guaranteed arrival.

The exile was grueling, the waiting tested their patience, and their grief was deep. Yet God forbade His people from sinking into cynical despair. When God promises a future, He plants an anchor within the human soul that prevents us from drifting off course during heavy gales. Biblical hope (tiqvah - cord, attachment, confident expectation) is not wishful thinking; it is the immovable cable binding our heart to the throne of God.

Your present chapter of testing is not the finale of your story. It is the sacred corridor through which God is purifying your character so that you can steward the weight of glory He has prepared for you.`,
      practicalApplication: "Identify any area where cynicism or defeatism has crept into your vocabulary. Replace each complaint with a direct declaration of God's promised future.",
      guidedPrayer: "Lord God of Covenant Hope, thank You that my story does not end in defeat or confusion. You have inscribed a future and an expected end upon my destiny. Lift up my head today. Fill me afresh with the joy of the Holy Spirit so that I may walk with buoyant faith. In Jesus' Name, Amen.",
      actionStep: "Send an encouraging text message with a Scripture promise to someone who is enduring a heavy season of waiting today.",
      apostolicDecree: "I decree that hopelessness is broken off my life and atmosphere. My tomorrow is secured in the victorious hands of the Risen Christ, and I shall see the goodness of the Lord in the land of the living!",
      hopeAndEncouragementConclusion: "Lift up your eyes from the dust! The Joy of the Lord is your fortress, and the future God has designed for you is radiant with covenant blessings.",
      theme: "Supernatural Hope & Destiny",
      category: "Faith & Perseverance",
      source: "canonical_reservoir"
    },
    {
      id: "res-jer2911-c",
      reference: "Jeremiah 29:11",
      label: "Devotion C",
      title: "Beyond the Detour: God's Inevitable Triumph",
      keyScripture: "Jeremiah 29:11 (KJV) - 'Thoughts of peace, and not of evil...'",
      passageText: "For I know the thoughts that I think toward you, saith the Lord, thoughts of peace, and not of evil, to give you an expected end.",
      reflection: `When prayers seem unanswered or circumstances turn unexpectedly difficult, the adversary whispers that God has abandoned us or holds malicious intent. The exiles in Babylon cried, "Has God forgotten to be gracious?" 

Jeremiah 29:11 stands as God's decisive refutation of our doubts: "Thoughts of peace, and NOT of evil (ra' - harm, ruin, destruction)." God does not author your destruction; He is the author of your salvation. Even the adversarial traps of the enemy are seized by God's sovereign wisdom and redirected for kingdom victory (Genesis 50:20).

The detour through Babylon was never wasted in God's divine calculus; it became the crucible that burned out Israel's generational idolatry. You will look back on this current valley not as the place of defeat, but as the birthplace of an unshakeable faith.`,
      practicalApplication: "Reframe your current battle: instead of asking 'Why is this happening to me?', ask: 'Lord, what eternal fruit of character are You forging in me through this season?'",
      guidedPrayer: "Heavenly Father, I praise You that You never harbor thoughts of malice or destruction toward Your blood-bought children. Silence every accusation of the enemy. Infuse my inner man with peace that transcends understanding, and let me rest in Your goodness today. In Jesus' Name, Amen.",
      actionStep: "Recall a past trial that God turned into a testimony, and write a brief prayer of thanksgiving for His past deliverance.",
      apostolicDecree: "I declare that every weapon formed against my soul shall fail. God's thoughts toward me are life, peace, and eternal triumph through Jesus Christ!",
      hopeAndEncouragementConclusion: "Rejoice in your Redeemer! What the enemy designed to swallow you up will become the very platform upon which God displays His miraculous power.",
      theme: "Redemptive Overcoming & Protection",
      category: "Spiritual Warfare",
      source: "canonical_reservoir"
    },
    {
      id: "res-jer2911-d",
      reference: "Jeremiah 29:11",
      label: "Devotion D",
      title: "The Covenant Blueprint: Resting in Divine Omniscience",
      keyScripture: "Jeremiah 29:11 (KJV) - 'For I know the thoughts that I think toward you, saith the Lord...'",
      passageText: "For I know the thoughts that I think toward you, saith the Lord, thoughts of peace, and not of evil, to give you an expected end.",
      reflection: `Notice the majesty of the opening declaration: "For I know." We do not know what tomorrow will bring. Our vision is bounded by our finite senses and our natural understanding. But God's gaze encompasses eternity from the beginning to the end.

While we fret over microscopic obstacles, the Lord sits upon the circle of the earth with absolute sovereign composure. To walk by faith is to entrust our unknown future to the God who knows all things. When anxiety tempts you to calculate every permutation of how things might go wrong, remember that you are held by the Omniscient King.

He does not slumber. He does not overlook your tears. He does not make mistakes. Relax into the loving hands of the One whose knowledge holds the cosmos together.`,
      practicalApplication: "Whenever you feel the urge to micromanage outcomes today, pause, take a deep breath of grace, and whisper: 'The Lord knows, and His knowledge is my peace.'",
      guidedPrayer: "Abba Father, I surrender my exhausting attempts to figure out every variable of my future. You alone are all-knowing and all-powerful. I place my family, my health, my calling, and my work into Your capable hands, choosing holy rest over frantic worry. In Jesus' Name, Amen.",
      actionStep: "Write down 3 times when God guided your steps when you could not see the way forward.",
      apostolicDecree: "I decree that divine wisdom orders my steps. I am not governed by fear of the unknown, for my life is hidden with Christ in God!",
      hopeAndEncouragementConclusion: "You can sleep in peace tonight. The One who created the stars has numbered the hairs of your head and ordered every step of your path.",
      theme: "Divine Omniscience & Surrender",
      category: "Rest & Peace",
      source: "canonical_reservoir"
    },
    {
      id: "res-jer2911-e",
      reference: "Jeremiah 29:11",
      label: "Devotion E",
      title: "Living with Holy Expectation: The Pathway of Prayer",
      keyScripture: "Jeremiah 29:11-12 (KJV) - 'Then shall ye call upon me, and ye shall go and pray unto me, and I will hearken unto you.'",
      passageText: "For I know the thoughts that I think toward you, saith the Lord, thoughts of peace, and not of evil, to give you an expected end. Then shall ye call upon me, and ye shall go and pray unto me, and I will hearken unto you.",
      reflection: `The promise of Jeremiah 29:11 does not lead to passive complacency; it leads directly into the dynamic posture of prayer in verse 12: "Then shall ye call upon me, and ye shall go and pray unto me, and I will hearken unto you."

When we realize that God's heart toward us is peace and an expected end, prayer ceases to be a dreary chore or desperate bargaining. It transforms into joyful communion with a Father who is eager to answer. We do not pray to convince a reluctant God to be kind; we pray to align ourselves with a generous God who has already prepared our deliverance.

God declares: "I will hearken (shama - actively listen, attend with favor, and answer) unto you." The courtroom of heaven is open to your petitions today through the blood of Jesus.`,
      practicalApplication: "Set aside 10 minutes of bold, expectant prayer today. Instead of merely listing problems, rehearse God's promises back to Him with heartfelt thanksgiving.",
      guidedPrayer: "Gracious Lord, thank You that my prayers are not lost in the wind. You incline Your ear to hear my cry. Give me faith to pray with boldness and perseverance, knowing that You are able to do exceeding abundantly above all that I ask or think. In Jesus' Name, Amen.",
      actionStep: "Keep a written record of a specific petition you are bringing before God today, ready to date it when the answer manifests.",
      apostolicDecree: "I decree that the heavens are open over my life! My prayers are heard in the throne room of grace, and the joy of answered prayer shall overflow in my house!",
      hopeAndEncouragementConclusion: "Rejoice and be glad! The God who hears prayer has not turned away His ear from your cry. Walk forward with courage and expectant gladness!",
      theme: "Prevailing Prayer & Communion",
      category: "Prayer & Intercession",
      source: "canonical_reservoir"
    }
  ],

  "psalm 23:1": [
    {
      id: "res-ps231-a",
      reference: "Psalm 23:1",
      label: "Devotion A",
      title: "The All-Sufficient Shepherd: The Abolition of Lack",
      keyScripture: "Psalm 23:1 (KJV) - 'The Lord is my shepherd; I shall not want.'",
      passageText: "The Lord is my shepherd; I shall not want. He maketh me to lie down in green pastures: he leadeth me beside the still waters. He restoreth my soul: he leadeth me in the paths of righteousness for his name's sake.",
      reflection: `David spoke with the authoritative insight of a seasoned shepherd who understood the intrinsic vulnerability of sheep. Sheep are utterly defenseless animals lacking fangs, claws, or speed. They cannot survive without a diligent shepherd to guide, protect, and feed them.

When David proclaims "The Lord is my shepherd; I shall not want," he is making a bold theological declaration: under the covenant care of Jehovah-Raah, lack is abolished. "I shall not want" is not merely a prediction of future material supply; it is a profound confession of present-tense contentment and spiritual sufficiency.

When the Lord is your Shepherd, you do not need to scramble in anxiety or compromise your integrity out of fear of scarcity. The Shepherd who owns the cattle on a thousand hills is personally responsible for your pasture. Rest in His unshakeable provision today.`,
      practicalApplication: "Identify any area where a scarcity mentality has caused you anxiety. Renounce fear of lack and declare aloud: 'The Lord is my Shepherd; I shall not want!'",
      guidedPrayer: "Good Shepherd of my soul, I thank You that under Your watchful eye I lack no good thing. Forgive me for wandering into self-reliance and worry. Lead me today into Your pastures of grace and quiet waters of peace. In Jesus' Name, Amen.",
      actionStep: "Give generously to someone in need today as a physical demonstration that you trust God as your Shepherd.",
      apostolicDecree: "I decree that the spirit of poverty and lack is broken from my life. The Lord is my Shepherd, and His abundant goodness satisfies my soul!",
      hopeAndEncouragementConclusion: "The Shepherd of Israel neither slumbers nor sleeps over your life. You are guarded, guided, and lavishly provided for by the King of Kings.",
      theme: "Covenant Sufficiency & Contentment",
      category: "Provision & Trust",
      source: "canonical_reservoir"
    },
    {
      id: "res-ps231-b",
      reference: "Psalm 23:1",
      label: "Devotion B",
      title: "Beside Still Waters: Restoring the Exhausted Soul",
      keyScripture: "Psalm 23:1-3 (KJV) - 'He restoreth my soul: he leadeth me in the paths of righteousness for his name's sake.'",
      passageText: "The Lord is my shepherd; I shall not want. He maketh me to lie down in green pastures: he leadeth me beside the still waters. He restoreth my soul: he leadeth me in the paths of righteousness for his name's sake.",
      reflection: `Sheep will never lie down to rest if they are plagued by friction from the flock, tormented by flies and parasites, or terrified of predators. Only the physical presence of the shepherd removes their fears and allows them to lie down in peace.

When Psalm 23 says, "He maketh me to lie down in green pastures," it reveals God's tender intervention when we are too hurried or exhausted to stop. He leads us beside "still waters" (waters of quietness), where the turbulent roaring of worldly demands cannot drown out the still, small voice of His Spirit.

"He restoreth my soul" (shuv - to revive, return from wandering, breathe new life into). God does not merely patch up our exhaustion; He resurrects our inner man from spiritual fatigue. Step into the holy quietness of His presence right now.`,
      practicalApplication: "Take a 10-minute digital sabbath today: turn off all screens and notifications, sit quietly before the Lord, and allow His peace to recalibrate your nervous system.",
      guidedPrayer: "Lord Jesus, Good Shepherd, I pause in the middle of this day to drink from Your living waters. Quiet the noise in my thoughts. Restore my exhausted emotions, heal my weariness, and guide my footsteps in paths of righteousness for Your Name's sake. Amen.",
      actionStep: "Recite Psalm 23 slowly three times during the day, meditating on the reality of God walking beside you.",
      apostolicDecree: "I decree divine restoration over my spirit, soul, and body. Fatigue is replaced by resurrection vitality, and the peace of God guards my heart!",
      hopeAndEncouragementConclusion: "Drink deeply from the fountain of living waters. The Lord is restoring your soul right now, and His joy will be your strength for every step ahead.",
      theme: "Soul Restoration & Quietness",
      category: "Rest & Renewal",
      source: "canonical_reservoir"
    },
    {
      id: "res-ps231-c",
      reference: "Psalm 23:1",
      label: "Devotion C",
      title: "The Valley of Shadows: Courage in the Shepherd's Rod",
      keyScripture: "Psalm 23:4 (KJV) - 'Yea, though I walk through the valley of the shadow of death, I will fear no evil: for thou art with me; thy rod and thy staff they comfort me.'",
      passageText: "Yea, though I walk through the valley of the shadow of death, I will fear no evil: for thou art with me; thy rod and thy staff they comfort me.",
      reflection: `Notice the dramatic grammatical shift in Psalm 23: in the green pastures, David speaks about God in the third person ("He maketh me... He leadeth me..."). But when he enters the dark valley of the shadow, the language shifts to intimate second person: "for THOU art with me; THY rod and THY staff they comfort me."

Suffering and valleys have a way of stripping away religious formalities and drawing us into immediate, intimate communion with the living God. Notice also that David says "though I walk THROUGH the valley." The valley is not a permanent residence; it is a passage to higher ground.

A shadow cannot harm you; it is merely proof that there is light shining from above. The Shepherd's rod defends against wolves, and His gentle staff pulls you back from dangerous cliffs. You are not alone in the dark.`,
      practicalApplication: "If you are walking through a valley of grief, sickness, or uncertainty, declare aloud: 'This valley is not my ending; I am walking through to God's victory!'",
      guidedPrayer: "Mighty Shepherd, thank You that You walk with me through every dark shadow. I cast out all fear of evil, for Your rod defends me and Your staff upholds me. Let Your tangible presence be my comfort and fortress today. In Jesus' Name, Amen.",
      actionStep: "Reach out to someone walking through a valley of illness or grief and comfort them with the comfort you have received from God.",
      apostolicDecree: "I declare that fear has no dominion over my life! The Valley of Shadows cannot consume me, for the King of Glory walks with me, leading me into triumph!",
      hopeAndEncouragementConclusion: "No shadow has the power to extinguish the light of Christ within you. Hold the Shepherd's hand and walk forward in bold confidence!",
      theme: "Courage in Adversity & Divine Protection",
      category: "Spiritual Warfare",
      source: "canonical_reservoir"
    },
    {
      id: "res-ps231-d",
      reference: "Psalm 23:1",
      label: "Devotion D",
      title: "The Anointed Table: Feasting in the Presence of Foes",
      keyScripture: "Psalm 23:5 (KJV) - 'Thou preparest a table before me in the presence of mine enemies: thou anointest my head with oil; my cup runneth over.'",
      passageText: "Thou preparest a table before me in the presence of mine enemies: thou anointest my head with oil; my cup runneth over.",
      reflection: `God does not wait for all your enemies to be eradicated before He blesses you; He prepares a royal banquet right in their full view. In the ancient Near East, anointing a guest's head with fragrant olive oil was a supreme gesture of royal honor and hospitality.

The enemies—criticism, demonic opposition, financial pressure, or betrayal—are forced to stand at the perimeter as powerless spectators while God lavishly honors His child. "My cup runneth over" speaks of superabundant grace that cannot be contained within human vessels.

You do not need to waste energy defending your reputation or fighting petty skirmishes. Sit at the table of worship, feast on God's Word, and let Him handle your adversaries.`,
      practicalApplication: "Refuse to engage in retaliatory arguments or bitterness today. Let God prepare your table while you maintain a posture of praise and love.",
      guidedPrayer: "Gracious Father, I thank You for anointing my head with the oil of the Holy Spirit. You prepare a feast of joy, peace, and favor in my life. Let my cup overflow with Your goodness so that others may taste and see that the Lord is good. In Jesus' Name, Amen.",
      actionStep: "Bless someone who has spoken unkindly to you or treated you unfairly, returning good for evil.",
      apostolicDecree: "I decree that God's royal anointing rest upon my mind, home, and calling! My cup overflows with supernatural peace and the enemies of my soul are disarmed!",
      hopeAndEncouragementConclusion: "You are seated with Christ in heavenly places! Feast at His table of grace today, for His favor surrounds you as a shield.",
      theme: "Royal Anointing & Overflowing Favor",
      category: "Victory & Favor",
      source: "canonical_reservoir"
    },
    {
      id: "res-ps231-e",
      reference: "Psalm 23:1",
      label: "Devotion E",
      title: "Goodness and Mercy: The Twin Escorts of Covenant Grace",
      keyScripture: "Psalm 23:6 (KJV) - 'Surely goodness and mercy shall follow me all the days of my life: and I will dwell in the house of the Lord for ever.'",
      passageText: "Surely goodness and mercy shall follow me all the days of my life: and I will dwell in the house of the Lord for ever.",
      reflection: `Psalm 23 concludes with a triumphant word: "Surely" (akh - without question, undeniably, of a covenant certainty). David did not say goodness and mercy might follow him if he performed well enough; he declared they SHALL follow him.

The Hebrew word for "follow" is 'radaph', which is an active, aggressive term meaning to pursue, hunt down, or chase after. In David's military life, enemies had chased him across deserts. But in God's kingdom, the twin escorts of God's 'tov' (goodness) and 'chesed' (steadfast covenant mercy) are hunting down the believer every single day.

Every step you take is shadowed not by condemnation or guilt, but by the relentless mercy and goodness of God. And the ultimate destination is an eternity dwelling in the presence of the Lord.`,
      practicalApplication: "Look back over the past week and trace at least 3 ways God's goodness and mercy pursued you even when you were unaware.",
      guidedPrayer: "Faithful God, thank You that Your goodness and mercy pursue me every day of my life. Forgive me for dwelling on past failures. I receive Your unfailing covenant love today and dedicate my heart to dwelling in Your presence forever. In Jesus' Name, Amen.",
      actionStep: "Share this glorious truth of Psalm 23:6 with a loved one, reminding them of God's relentless goodness.",
      apostolicDecree: "I decree that the goodness and steadfast love of God are pursuing me and my household today! I shall dwell in the secret place of His presence forever!",
      hopeAndEncouragementConclusion: "Rest in the unbreakable covenant of God. Goodness goes before you, mercy follows behind you, and the Joy of the Lord is your daily fortress!",
      theme: "Relentless Mercy & Eternal Security",
      category: "Grace & Assurance",
      source: "canonical_reservoir"
    }
  ],

  "romans 8:28": [
    {
      id: "res-rom828-a",
      reference: "Romans 8:28",
      label: "Devotion A",
      title: "The Master Weaver: Redemptive Synchronization",
      keyScripture: "Romans 8:28 (KJV) - 'And we know that all things work together for good to them that love God, to them who are the called according to his purpose.'",
      passageText: "And we know that all things work together for good to them that love God, to them who are the called according to his purpose.",
      reflection: `Paul does not write "we guess" or "we cross our fingers and hope"; he writes "we know" (oidamen - an absolute, intuitive covenant certainty rooted in divine revelation). 

The Greek compound verb "synergeo" (work together) is the origin of our English word 'synergy'. On the underside of an oriental tapestry, you see tangled threads, frayed knots, and jarring dark colors that appear chaotic. But when the master weaver turns the tapestry right-side up, every dark thread was essential to produce the masterpiece.

God does not say all things in themselves are pleasant; evil, sickness, and bereavement are real sorrows in a fallen world. But God's sovereign wisdom is so boundless that He forces even our adversities, griefs, and setbacks to collaborate for our ultimate sanctification and His eternal glory.`,
      practicalApplication: "Take a past heartache or painful delay and surrender it into the hands of the Master Weaver, confessing that He is orchestrating it for eternal good.",
      guidedPrayer: "Sovereign Father, Maker of Heaven and Earth, You see the end from the beginning. Even when I cannot trace Your hand in my circumstances, I trust Your heart. Turn every stumbling block into a stepping stone of glory. In Jesus' Name, Amen.",
      actionStep: "Write down Romans 8:28 on an index card and read it whenever frustration arises today.",
      apostolicDecree: "I decree that all things are working together for my good in Christ Jesus! No setback can derail God's sovereign purpose over my destiny!",
      hopeAndEncouragementConclusion: "Rest in the sovereign craftsmanship of God. What was meant for evil is being redirected into a glorious testimony of grace.",
      theme: "Sovereign Providence & Eternal Good",
      category: "Trust & Sovereignty",
      source: "canonical_reservoir"
    },
    {
      id: "res-rom828-b",
      reference: "Romans 8:28",
      label: "Devotion B",
      title: "Called According to Purpose: An Unbreakable Covenant",
      keyScripture: "Romans 8:28 (KJV) - '...to them who are the called according to his purpose.'",
      passageText: "And we know that all things work together for good to them that love God, to them who are the called according to his purpose.",
      reflection: `The foundation of our security in Romans 8:28 is not our fragile human strength, but the fact that we are "called according to HIS purpose." The Greek word for purpose is 'prothesis'—a predetermined, deliberate royal intention.

Your life is not an accidental biological phenomenon drifting aimlessly across the currents of fate. You were hand-picked by God before the foundation of the world. Because the calling originates in God's eternal heart, no earthly crisis, economic collapse, or human opposition has the legal jurisdiction to void your divine calling.

When you know you are called according to His purpose, you can walk through temporary storms with supernatural peace. The storm is not an interruption to your purpose; it is the very environment in which God's power is revealed in you.`,
      practicalApplication: "Re-anchor your self-worth today in your divine calling rather than your performance, job title, or social status.",
      guidedPrayer: "Heavenly Father, thank You for calling me out of darkness into Your marvelous light. I anchor my identity in Your eternal purpose. Strengthen my hands to do Your will with joy and perseverance. In Jesus' Name, Amen.",
      actionStep: "Pray a prayer of dedication over your gifts, talents, and career, submitting them afresh to Christ's kingdom purposes.",
      apostolicDecree: "I decree that I am called according to God's eternal purpose! My identity is sealed in Christ, and no weapon formed against my calling shall prosper!",
      hopeAndEncouragementConclusion: "Walk with your head held high today. You are a royal ambassador of heaven, called and equipped by the Almighty King.",
      theme: "Divine Calling & Unshakeable Identity",
      category: "Purpose & Destiny",
      source: "canonical_reservoir"
    },
    {
      id: "res-rom828-c",
      reference: "Romans 8:28",
      label: "Devotion C",
      title: "From Tragedy to Triumph: The Divine Alchemy of Grace",
      keyScripture: "Romans 8:28 (KJV) - '...all things work together for good...'",
      passageText: "And we know that all things work together for good to them that love God, to them who are the called according to his purpose.",
      reflection: `Consider the supreme biblical illustration of Romans 8:28: the cross of Calvary. From a human perspective, the cross appeared to be the ultimate triumph of corrupt political power, demonic hatred, and tragic injustice. The Son of God was betrayed, mocked, and crucified.

Yet in the sovereign calculus of the Almighty, that which seemed the darkest tragedy in history became the supreme coronation of divine redemption. God took the worst thing that fallen humanity could inflict and transformed it into the salvation of the world.

If God could take the cross and turn it into the resurrection, there is no failure, delay, or heartache in your life that He cannot redeem. He specializes in bringing beauty from ashes and triumphant gladness out of mourning.`,
      practicalApplication: "Bring your greatest present heartache before the cross. Reaffirm that the resurrection power of Christ is greater than any grave.",
      guidedPrayer: "Lord Jesus, I worship You as the Victorious Lamb who turned the cross into eternal triumph. I surrender my wounds, disappointments, and losses into Your hands. Manifest Your resurrection power in my life and bring forth divine good. Amen.",
      actionStep: "Encourage someone who has suffered a painful loss by reminding them of God's redeeming resurrection power.",
      apostolicDecree: "I declare that resurrection life is at work in every dead situation in my life! Mourning is turned to dancing, and the Joy of the Lord is my strength!",
      hopeAndEncouragementConclusion: "The cross is empty and the tomb is vacant! He who conquered death will conquer every obstacle standing in your path.",
      theme: "Redemption & Resurrection Power",
      category: "Victory & Hope",
      source: "canonical_reservoir"
    },
    {
      id: "res-rom828-d",
      reference: "Romans 8:28",
      label: "Devotion D",
      title: "The Symphony of Providence: Harmony Out of Discord",
      keyScripture: "Romans 8:28 (KJV) - 'And we know that all things work together...'",
      passageText: "And we know that all things work together for good to them that love God, to them who are the called according to his purpose.",
      reflection: `In a grand orchestral symphony, individual instruments played in isolation may produce sharp dissonances or deep, sorrowful minor notes. A single discordant note might sound unsettling. But when conducted by a master maestro, that minor chord provides the necessary dramatic tension that makes the resolving major crescendo so magnificent.

God is the Maestro of human history. The minor keys of grief, waiting, and testing are not the end of the score. They are being conducted toward the resolving chord of eternal righteousness, peace, and joy in the Holy Ghost.

Do not judge the symphony by the midway movement. Trust the Maestro who holds the baton. The finale will be glorious beyond all description.`,
      practicalApplication: "When experiencing tension or discord today, picture God conducting the score of your life. Yield to His rhythm with peace.",
      guidedPrayer: "Master Maestro of my life, I praise You for Your perfect timing and orchestration. Teach me to trust You through the minor keys and trials of this journey. Let the melody of praise never leave my lips. In Jesus' Name, Amen.",
      actionStep: "Listen to a hymn or worship song of praise today, lifting your heart in adoration of God's providence.",
      apostolicDecree: "I decree that divine harmony reigns over my spirit, home, and circumstances! The Maestro of Heaven is leading me into a crescendo of victory!",
      hopeAndEncouragementConclusion: "The Joy of the Lord is your fortress! The music of heaven is playing over your life, and His faithfulness endures forever.",
      theme: "Divine Symphony & Faith",
      category: "Praise & Providence",
      source: "canonical_reservoir"
    }
  ],

  "isaiah 40:31": [
    {
      id: "res-isa4031-a",
      reference: "Isaiah 40:31",
      label: "Devotion A",
      title: "The Divine Exchange: Swapping Frailty for Omnipotence",
      keyScripture: "Isaiah 40:31 (KJV) - 'But they that wait upon the Lord shall renew their strength; they shall mount up with wings as eagles; they shall run, and not be weary; and they shall walk, and not faint.'",
      passageText: "But they that wait upon the Lord shall renew their strength; they shall mount up with wings as eagles; they shall run, and not be weary; and they shall walk, and not faint.",
      reflection: `The Hebrew verb for "renew" in Isaiah 40:31 is "chalaph", which literally means to exchange, replace, or put on fresh garments. God does not merely inject a tiny burst of human adrenaline into your tired body; He offers a divine trade.

You give Him your depleted human frailty, your exhausted mental energy, and your emotional fatigue; in exchange, He imparts His unwearied omnipotence into your inner man. Isaiah reminds us in the preceding verse that even energetic youths faint and grow weary. Natural grit always runs dry.

To wait on the Lord (qavah - to entwine, braid oneself with God like threads forming an unbreakable rope) is the holy secret of endurance. When you entwine your weakness with God's strength, you cannot be broken.`,
      practicalApplication: "Sit quietly for 5 minutes right now. Visually and spiritually hand over your weariness to Jesus, declaring: 'Lord, I exchange my exhaustion for Your omnipotence.'",
      guidedPrayer: "Lord Jehovah, Creator of the ends of the earth, You never faint nor grow weary. I lay down my depleted energy and entwine my soul with Your Holy Spirit. Fill me with divine vigor, clarity, and peace today. In Jesus' Name, Amen.",
      actionStep: "Take deep, unhurried breaths while praying, releasing tension and receiving God's peace.",
      apostolicDecree: "I decree a supernatural divine exchange over my life! My weakness is exchanged for Christ's resurrection power, and I shall run without fainting!",
      hopeAndEncouragementConclusion: "The Almighty God is your strength! You were created to live from heaven downward, empowered by His infinite grace.",
      theme: "Supernatural Strength & Divine Exchange",
      category: "Strength & Fortitude",
      source: "canonical_reservoir"
    },
    {
      id: "res-isa4031-b",
      reference: "Isaiah 40:31",
      label: "Devotion B",
      title: "Wings of Eagles: Riding the Updrafts of Faith",
      keyScripture: "Isaiah 40:31 (KJV) - '...they shall mount up with wings as eagles...'",
      passageText: "But they that wait upon the Lord shall renew their strength; they shall mount up with wings as eagles; they shall run, and not be weary; and they shall walk, and not faint.",
      reflection: `When a severe storm approaches, small birds fly in panic into bushes and rocky crevices. But the eagle behaves completely differently: it positions itself at the edge of a crag, sets its broad wings into the oncoming gale, and uses the updraft of the tempest to soar thousands of feet above the turbulence.

Above the storm clouds, the sun is shining with unclouded brilliance. This is the biblical metaphor for the life of faith: you were not created to flap frantically in self-effort or hide in fear of earthly crises.

By setting your faith in the covenant promises of God, you lock into the thermal updrafts of the Holy Spirit and soar above the anxiety, bitterness, and limitations of this world.`,
      practicalApplication: "When pressure hits today, refuse to react in fleshly panic. Lift your eyes heavenward and set your wings of faith into God's Word.",
      guidedPrayer: "Heavenly Father, lift me above the storms of fear and distraction today. Teach me to mount up with wings as eagles. Let me see my challenges from Your heavenly perspective, seated with Christ in victory. Amen.",
      actionStep: "Memorize Isaiah 40:31 and recite it aloud whenever fatigue threatens your peace today.",
      apostolicDecree: "I decree that I am soaring above the turbulence of this world! The wind of the Holy Spirit lifts me into heavenly places of peace and joy!",
      hopeAndEncouragementConclusion: "Rise on wings of faith! The storm will pass, but the word of our God endures forever.",
      theme: "Soaring Faith & Victory",
      category: "Faith & Elevation",
      source: "canonical_reservoir"
    },
    {
      id: "res-isa4031-c",
      reference: "Isaiah 40:31",
      label: "Devotion C",
      title: "Running Without Weariness: Grace for the Long Obedience",
      keyScripture: "Isaiah 40:31 (KJV) - '...they shall run, and not be weary; and they shall walk, and not faint.'",
      passageText: "But they that wait upon the Lord shall renew their strength; they shall mount up with wings as eagles; they shall run, and not be weary; and they shall walk, and not faint.",
      reflection: `Notice the descending progression of verbs in Isaiah 40:31: soaring like eagles, running without weariness, and walking without fainting. While soaring is exhilarating and running is impressive, the greatest miracle of Christian discipleship is often the grace to keep walking faithfully day after day without fainting.

The mundane routines, daily chores, parenting duties, and workplace responsibilities require steadfast endurance. It is easy to start a race with excitement; it takes supernatural grace to maintain faithfulness when the novelty wears off.

God promises that those who wait on Him will possess steady, durable stamina. You will finish your assignment because Christ in you is the finisher of your faith.`,
      practicalApplication: "Celebrate the quiet faithfulness of your daily walk today. Acknowledge that your routine acts of obedience are deeply pleasing to God.",
      guidedPrayer: "Lord Jesus, grant me grace for the daily walk. When the routine feels heavy or progress seems slow, infuse my inner man with unshakeable perseverance. Keep my feet steadfast in Your truth. In Jesus' Name, Amen.",
      actionStep: "Complete an unfinished task or responsibility today with cheerful diligence as unto the Lord.",
      apostolicDecree: "I decree supernatural endurance over my spiritual walk! I shall not grow weary in well-doing, for in due season I shall reap a harvest of glory!",
      hopeAndEncouragementConclusion: "Keep putting one faithful foot in front of the other! The Lord is holding your right hand and directing every step with tender love.",
      theme: "Perseverance & Long Obedience",
      category: "Character & Endurance",
      source: "canonical_reservoir"
    },
    {
      id: "res-isa4031-d",
      reference: "Isaiah 40:31",
      label: "Devotion D",
      title: "The Sacred Wait: Entwined with the Almighty",
      keyScripture: "Isaiah 40:31 (KJV) - 'They that wait upon the Lord...'",
      passageText: "But they that wait upon the Lord shall renew their strength; they shall mount up with wings as eagles; they shall run, and not be weary; and they shall walk, and not faint.",
      reflection: `In our modern world of instant gratification and rapid answers, waiting is often viewed as wasted time. But in the Kingdom of God, waiting upon the Lord is the most spiritually productive activity possible.

Biblical waiting is not lazy passivity or idle thumb-twiddling; it is eager, alert, and loving attentiveness toward the Master. It is like a waiter in a royal court standing with eyes fixed on the King, ready to move at the slightest nod.

When we wait on the Lord in worship, our fragmented thoughts are quieted, our misplaced priorities are corrected, and our souls are infused with the eternal majesty of God. Do not rush out of His presence today; linger until His peace saturates your soul.`,
      practicalApplication: "Before jumping into your to-do list, spend 7 minutes in silent adoration of God, asking for nothing other than to behold His beauty.",
      guidedPrayer: "Sovereign King, I silence my hurried heart to wait upon You. You are worth every minute of holy lingering. Calibrate my thoughts to the rhythm of Your Spirit and let Your joy be my strength today. In Jesus' Name, Amen.",
      actionStep: "Pause for 60 seconds before each major meeting or task today to silently invite the Holy Spirit's guidance.",
      apostolicDecree: "I declare that my soul waits upon God alone! From Him comes my salvation, my defense, and my unassailable victory!",
      hopeAndEncouragementConclusion: "Those who wait on the Lord will never be put to shame. His answers are on the way, and His timing is always perfect.",
      theme: "Quiet Communion & Sovereign Timing",
      category: "Prayer & Presence",
      source: "canonical_reservoir"
    }
  ],

  "philippians 4:6-7": [
    {
      id: "res-phil467-a",
      reference: "Philippians 4:6-7",
      label: "Devotion A",
      title: "The Transcendent Garrison: Peace Above Understanding",
      keyScripture: "Philippians 4:6-7 (KJV) - 'Be careful for nothing; but in every thing by prayer and supplication with thanksgiving let your requests be made known unto God. And the peace of God, which passeth all understanding, shall keep your hearts and minds through Christ Jesus.'",
      passageText: "Be careful for nothing; but in every thing by prayer and supplication with thanksgiving let your requests be made known unto God. And the peace of God, which passeth all understanding, shall keep your hearts and minds through Christ Jesus.",
      reflection: `Paul penned these immortal words while chained to a Roman imperial soldier in prison. From human reckoning, Paul had every reason for anxiety: impending trial before Nero, church conflicts, and restricted freedom. Yet from that prison cell, he issues the apostolic protocol for unshakable peace.

"Be careful for nothing" (merimnao - literally, to be pulled apart in different directions by anxious worry). Worry divides the mind and fractures the soul. God offers a divine transaction: bring your worries to Him wrapped in thanksgiving, and He will replace them with a peace that surpasses all human logic.

The Greek term for "shall keep" (phroureo) is a military term describing a heavily armed imperial garrison guarding a fortress city. When you surrender your strivings with praise, God posts the garrison of His heavenly peace at the gates of your imagination and emotional faculties.`,
      practicalApplication: "Take your 3 heaviest anxieties right now. Write them on a sheet of paper. Then beside each one, write a thanksgiving statement for how God is already handling it.",
      guidedPrayer: "Father of Mercies, I surrender all hurried anxiety at the foot of the cross. I bring my petitions wrapped in thanksgiving. Let the garrison of Your supernatural peace guard my heart and mind through Christ Jesus today. Amen.",
      actionStep: "Whenever worry tries to knock on your mind today, respond immediately with 60 seconds of audible praise.",
      apostolicDecree: "I decree that the supernatural peace of God guards my heart, thoughts, and emotions! Anxiety is evicted in the mighty Name of Jesus Christ!",
      hopeAndEncouragementConclusion: "You are heavily guarded by heaven's peace. No weapon of anxiety formed against you shall prosper!",
      theme: "Supernatural Peace & Spiritual Garrison",
      category: "Peace & Overcoming",
      source: "canonical_reservoir"
    },
    {
      id: "res-phil467-b",
      reference: "Philippians 4:6-7",
      label: "Devotion B",
      title: "The Protocol of Thanksgiving: Trading Anxiety for Worship",
      keyScripture: "Philippians 4:6 (KJV) - '...in every thing by prayer and supplication with thanksgiving...'",
      passageText: "Be careful for nothing; but in every thing by prayer and supplication with thanksgiving let your requests be made known unto God.",
      reflection: `Notice the indispensable ingredient in Paul's prayer formula: "WITH THANKSGIVING." Anyone can pray out of desperation or panic. But thanksgiving before the answer appears is the highest expression of authentic faith.

When we thank God before seeing the physical manifestation, we confess that His covenant character is trustworthy and His promises are secure. Thanksgiving shifts our spiritual perspective from the magnitude of the problem to the greatness of the Problem-Solver.

Thanksgiving disarms cynicism, silences complaining, and releases the atmosphere of heaven into earthly environments. Trade your panic for praise today!`,
      practicalApplication: "Begin your prayers today with at least 3 minutes of pure thanksgiving for God's attributes before making any request.",
      guidedPrayer: "Lord God Almighty, I worship You with a grateful heart. Thank You for breath, for salvation, for Christ's finished work, and for Your daily mercies. I choose thanksgiving over complaining today. In Jesus' Name, Amen.",
      actionStep: "Express vocal appreciation to at least two people in your life today for their kindness and support.",
      apostolicDecree: "I declare that the garment of praise replaces the spirit of heaviness in my life! Thanksgiving unlocks the gates of heaven over my house!",
      hopeAndEncouragementConclusion: "Rejoice in the Lord always! The Joy of the Lord is your supernatural shield and everlasting fortress.",
      theme: "Thanksgiving & Transforming Worship",
      category: "Worship & Praise",
      source: "canonical_reservoir"
    },
    {
      id: "res-phil467-c",
      reference: "Philippians 4:6-7",
      label: "Devotion C",
      title: "Guarded in Christ: Shielding Heart and Mind",
      keyScripture: "Philippians 4:7 (KJV) - 'And the peace of God... shall keep your hearts and minds through Christ Jesus.'",
      passageText: "And the peace of God, which passeth all understanding, shall keep your hearts and minds through Christ Jesus.",
      reflection: `Notice the two specific arenas protected by the peace of God: the HEART (our emotional center, desires, and passions) and the MIND (our thoughts, reasoning, and imaginations).

The enemy's primary battlefield is the human mind. He hurls fiery darts of catastrophic 'what-ifs', irrational fears, and replay of past failures to stir up emotional turmoil in the heart. But the peace of God acts as a two-fold shield: it calms the trembling heart and stabilizes the racing mind.

This protection is "through Christ Jesus." In Christ, you have a safe sanctuary where the arrows of despair cannot penetrate. Rest in His fortress today.`,
      practicalApplication: "Take every negative or catastrophic imagination captive today. When a fearful thought enters, declare: 'My mind is guarded by Christ Jesus!'",
      guidedPrayer: "Lord Jesus, I invite You to govern my thoughts and emotions. Silence every lie of the accuser. Anchor my imagination on things that are true, honorable, just, pure, and lovely. In Your Name, Amen.",
      actionStep: "Read Philippians 4:8 and focus your thoughts on one lovely, praiseworthy virtue today.",
      apostolicDecree: "I decree divine sound-mindedness over my brain, thoughts, and emotions! The mind of Christ governs every decision I make today!",
      hopeAndEncouragementConclusion: "Your mind is protected by the blood of Christ. Walk in holy confidence, clarity, and unshakeable joy!",
      theme: "Mental Soundness & Emotional Shielding",
      category: "Spiritual Health",
      source: "canonical_reservoir"
    },
    {
      id: "res-phil467-d",
      reference: "Philippians 4:6-7",
      label: "Devotion D",
      title: "Casting the Heavy Care: Freedom from Hurried Panic",
      keyScripture: "Philippians 4:6 (KJV) - 'In every thing by prayer and supplication...'",
      passageText: "Be careful for nothing; but in every thing by prayer and supplication with thanksgiving let your requests be made known unto God.",
      reflection: `Notice the comprehensiveness of the divine invitation: "in EVERY THING." Nothing in your life is too large for God to handle, and nothing is too small for Him to care about.

Too often we reserve prayer for monumental crises and try to manage the daily friction of life in our own strength. But when we neglect to bring small daily concerns to God, they accumulate like heavy weights, producing chronic irritation and fatigue.

The Father invites you to bring every minor irritation, every financial detail, and every relationship struggle to His throne. Unburden your soul into the hands of the One who cares for you.`,
      practicalApplication: "Whenever a minor annoyance arises today (traffic, unexpected emails, delays), turn it instantly into a one-sentence prayer of surrender.",
      guidedPrayer: "Covenant Father, thank You that You care about every detail of my life. I cast my cares upon You right now, refusing to carry burdens You never designed me to bear. Fill me with Your peace. In Jesus' Name, Amen.",
      actionStep: "Write down a list of burdens you have been carrying alone and pray over each one, releasing them into God's hands.",
      apostolicDecree: "I declare that I am free from hurried panic and chronic worry! I cast my care upon the Lord, for He sustains me!",
      hopeAndEncouragementConclusion: "The Joy of the Lord is your unshakeable portion! Walk lightly today, knowing the Father carries your load.",
      theme: "Total Surrender & Carefree Trust",
      category: "Rest & Freedom",
      source: "canonical_reservoir"
    }
  ],

  "nehemiah 8:10": [
    {
      id: "res-neh810-a",
      reference: "Nehemiah 8:10",
      label: "Devotion A",
      title: "The Holy Fortress: Joy as Supernatural Power",
      keyScripture: "Nehemiah 8:10 (KJV) - 'For the joy of the Lord is your strength.'",
      passageText: "Then he said unto them, Go your way, eat the fat, and drink the sweet, and send portions unto them for whom nothing is prepared: for this day is holy unto our Lord: neither be ye sorry; for the joy of the Lord is your strength.",
      reflection: `In the post-exilic restoration of Jerusalem, the returned remnant stood before Ezra the scribe as he opened the Book of the Law. As the people heard the holy commandments, they wept aloud, overwhelmed by their past generational failures and disobedience.

Yet Nehemiah, Ezra, and the Levites commanded a radical reorientation: "Do not weep, for this day is holy unto our Lord; neither be ye sorry; for the JOY OF THE LORD IS YOUR STRENGTH (ma'oz - fortress, stronghold, refuge)."

Biblical joy is not natural buoyancy or an easygoing personality. It is a supernatural fortress erected by the Holy Spirit within the believer's inner man. Joy is the believer's active resistance against the spirit of heaviness. When you operate in God's joy, the enemy cannot wear you down.`,
      practicalApplication: "Whenever heaviness or remorse attempts to weigh down your spirit today, speak Nehemiah 8:10 aloud three times, smiling in the presence of God.",
      guidedPrayer: "Almighty God, I praise You that my spiritual stamina is anchored in Your joy and not in my fleeting circumstances. I renounce the spirit of heaviness and clothe myself in Your holy gladness. Let Your joy be my fortress today. In Jesus' Name, Amen.",
      actionStep: "Share a joyful, uplifting Scripture with a colleague or family member who looks discouraged.",
      apostolicDecree: "I decree that the Joy of the Lord is my impenetrable fortress! Despair, sorrow, and exhaustion have no legal right to dwell in my atmosphere!",
      hopeAndEncouragementConclusion: "Rejoice! Your sins are forgiven, your redemption is sealed, and the Joy of the Lord is your eternal strength!",
      theme: "Supernatural Joy & Holy Fortification",
      category: "The Joy of the Lord",
      source: "canonical_reservoir"
    },
    {
      id: "res-neh810-b",
      reference: "Nehemiah 8:10",
      label: "Devotion B",
      title: "Sacred Celebration: Eating the Fat and Drinking the Sweet",
      keyScripture: "Nehemiah 8:10 (KJV) - 'Go your way, eat the fat, and drink the sweet...'",
      passageText: "Then he said unto them, Go your way, eat the fat, and drink the sweet, and send portions unto them for whom nothing is prepared: for this day is holy unto our Lord.",
      reflection: `Notice the sacred command given to God's covenant people: celebration is not an unspiritual distraction from holiness; it is the very expression of it! "For this day is HOLY unto our Lord: neither be ye sorry."

A somber, guilt-ridden demeanor is not a mark of advanced spirituality. When we recognize the lavish forgiveness and mercy of God, our response should be festive gladness, joyful fellowship, and generous feasting.

God delights in the joy of His children. When you smile, laugh with your family, and celebrate the goodness of God over a meal, you testify to a watching world that God is a good Father whose covenant brings abundant life.`,
      practicalApplication: "Celebrate today: prepare or enjoy a special treat with your family, thanking God intentionally for His bountiful provision.",
      guidedPrayer: "Heavenly Father, thank You for the sweet gift of life and the richness of Your grace. Deliver me from legalistic gloom. Let my home be filled with laughter, holy celebration, and songs of deliverance. In Jesus' Name, Amen.",
      actionStep: "Play uplifting praise music in your home or car today and sing along with wholehearted joy.",
      apostolicDecree: "I declare that my household is an altar of holy celebration! The joy of salvation overflows in our midst!",
      hopeAndEncouragementConclusion: "Feast on the goodness of the Lord! Taste and see that He is good, and His mercy endures forever!",
      theme: "Holy Celebration & Gladness",
      category: "Celebration & Joy",
      source: "canonical_reservoir"
    },
    {
      id: "res-neh810-c",
      reference: "Nehemiah 8:10",
      label: "Devotion C",
      title: "Sending Portions: Multiplying Joy Through Generosity",
      keyScripture: "Nehemiah 8:10 (KJV) - '...and send portions unto them for whom nothing is prepared...'",
      passageText: "Then he said unto them, Go your way, eat the fat, and drink the sweet, and send portions unto them for whom nothing is prepared: for this day is holy unto our Lord: neither be ye sorry; for the joy of the Lord is your strength.",
      reflection: `True biblical joy is never selfishly hoarded; it is centrifugal—it radiates outward. Nehemiah instructed the people: "Send portions unto them for whom nothing is prepared."

Joy multiplies when it is shared. When we step outside our own needs to bless the widow, the orphan, the struggling student, or the weary worker, we participate in the generous heart of Christ. Generosity breaks the chokehold of greed and scarcity.

If you ever feel dry or spiritually sluggish, the fastest way to ignite the joy of the Lord is to become a conduit of blessing to someone who cannot repay you.`,
      practicalApplication: "Identify someone in your community or church who is experiencing hardship and send them an anonymous blessing or meal today.",
      guidedPrayer: "Lord Jesus, You gave Your all for me. Expand my heart with divine generosity. Make me a channel of Your living water and sweet portions to the weary and broken today. Amen.",
      actionStep: "Give an unexpected tip, gift, or blessing to someone serving in your community today.",
      apostolicDecree: "I decree that I am blessed to be a blessing! My life is a fountain of covenant generosity and kingdom joy!",
      hopeAndEncouragementConclusion: "Your generosity will return to you in a harvest of joy! Give with gladness, for God loves a cheerful giver.",
      theme: "Covenant Generosity & Shared Gladness",
      category: "Service & Love",
      source: "canonical_reservoir"
    },
    {
      id: "res-neh810-d",
      reference: "Nehemiah 8:10",
      label: "Devotion D",
      title: "Joy vs. Heaviness: The Believer's Active Resistance",
      keyScripture: "Nehemiah 8:10 (KJV) - 'Neither be ye sorry; for the joy of the Lord is your strength.'",
      passageText: "Then he said unto them, Go your way, eat the fat, and drink the sweet, and send portions unto them for whom nothing is prepared: for this day is holy unto our Lord: neither be ye sorry; for the joy of the Lord is your strength.",
      reflection: `Notice the active imperative: "Neither be ye sorry." Grief and self-pity often feel like involuntary emotions that overcome us, but Scripture reminds us that we have authority over the atmosphere of our souls.

When demonic depression or worldly sorrow attempts to drape a mantle of darkness over your spirit, you have the right and command to reject it in the Name of Jesus. Clothe yourself in the garment of praise.

Joy is not the absence of suffering; it is the presence of the Savior in the midst of the battle. When Paul and Silas sang hymns at midnight in the Philippian dungeon, their joy shook the prison foundations. Your joy will shake loose every chain!`,
      practicalApplication: "When negative emotions attempt to take control today, speak directly to your soul like David: 'Why art thou cast down, O my soul? Hope thou in God!'",
      guidedPrayer: "Lord God of hosts, I cast off all discouragement, defeat, and heavy sorrow. Clothe me in the garment of praise and let the joy of the Lord be my shield. I stand firm on Your promises today. In Jesus' Name, Amen.",
      actionStep: "Spend 3 minutes praising God audibly for His victories before tackling today's most difficult task.",
      apostolicDecree: "I declare that the spirit of heaviness is bound and cast out! The Joy of the Lord is my unshakeable fortress and supernatural victory!",
      hopeAndEncouragementConclusion: "Sing unto the Lord a new song! The battle belongs to the Lord, and His joy makes you an overcomer!",
      theme: "Spiritual Victory & Warfare of Joy",
      category: "Spiritual Warfare",
      source: "canonical_reservoir"
    }
  ]
};

// LocalStorage Persistence Key for User & AI Generated Reservoir Items
const RESERVOIR_STORAGE_KEY = "joy_permanent_devotions_reservoir";

/**
 * Normalizes scripture references into canonical keys
 * Handles variations like:
 * "Jeremiah 29:11", "Jer 29:11", "jer 29:11-14", "Jeremiah 29"
 * "Psalm 23:1", "Ps 23:1", "Psalms 23:1", "psalm 23"
 * "Romans 8:28", "Rom 8:28"
 */
export function normalizeScriptureReference(rawRef: string): string {
  if (!rawRef || typeof rawRef !== "string") return "";
  let clean = rawRef.trim().toLowerCase();

  // Remove surrounding quotes, punctuation, brackets
  clean = clean.replace(/^[(\["']+|[)\]"']+$/g, "").trim();

  // Replace common book abbreviations with full names
  clean = clean
    .replace(/^jer\b/i, "jeremiah")
    .replace(/^ps\b|^psa\b|^psalms\b/i, "psalm")
    .replace(/^rom\b/i, "romans")
    .replace(/^isa\b/i, "isaiah")
    .replace(/^phil\b|^php\b/i, "philippians")
    .replace(/^neh\b/i, "nehemiah")
    .replace(/^jn\b|^jhn\b/i, "john")
    .replace(/^prov\b|^prv\b/i, "proverbs")
    .replace(/^matt\b|^mt\b/i, "matthew")
    .replace(/^josh\b/i, "joshua")
    .replace(/^2\s*tim\b|^ii\s*tim\b/i, "2 timothy")
    .replace(/^1\s*cor\b|^i\s*cor\b/i, "1 corinthians")
    .replace(/^heb\b/i, "hebrews")
    .replace(/^gal\b/i, "galatians")
    .replace(/^col\b/i, "colossians");

  // Normalize spaces around colon
  clean = clean.replace(/\s*:\s*/g, ":");

  return clean;
}

/**
 * Retrieves all stored devotions for a given scripture reference
 * Combines Pre-seeded Canonical devotions + any AI-generated saved devotions
 */
export function getStoredDevotionsForVerse(reference: string): ReservoirDevotion[] {
  const normRef = normalizeScriptureReference(reference);
  if (!normRef) return [];

  const results: ReservoirDevotion[] = [];

  // 1. Check pre-seeded canonical reservoir
  for (const [key, devotions] of Object.entries(PRE_SEEDED_RESERVOIR)) {
    const normKey = normalizeScriptureReference(key);
    // Direct match, prefix match, or chapter match
    if (normRef === normKey || normRef.startsWith(normKey) || normKey.startsWith(normRef)) {
      results.push(...devotions);
      break;
    }
  }

  // 2. Check client-side persistent localStorage reservoir
  if (typeof window !== "undefined" && window.localStorage) {
    try {
      const storedJson = localStorage.getItem(RESERVOIR_STORAGE_KEY);
      if (storedJson) {
        const storedMap: Record<string, ReservoirDevotion[]> = JSON.parse(storedJson);
        for (const [key, devotions] of Object.entries(storedMap)) {
          const normKey = normalizeScriptureReference(key);
          if (normRef === normKey || normRef.startsWith(normKey) || normKey.startsWith(normRef)) {
            // Avoid duplicate IDs
            const existingIds = new Set(results.map((r) => r.id));
            for (const d of devotions) {
              if (!existingIds.has(d.id)) {
                results.push(d);
              }
            }
          }
        }
      }
    } catch (e) {
      console.warn("[RESERVOIR] Error reading local reservoir:", e);
    }
  }

  return results;
}

/**
 * Selects an appropriate stored devotion when AI is unavailable.
 * Rotates systematically through Devotion A, Devotion B, Devotion C, etc.
 * so the user experiences varied, deep spiritual nourishment.
 */
export function selectAppropriateReservoirDevotion(
  reference: string
): { devotion: ReservoirDevotion; totalStored: number; index: number; label: string } | null {
  const devotions = getStoredDevotionsForVerse(reference);
  if (!devotions || devotions.length === 0) {
    return null;
  }

  // Pick index based on day-of-year or session rotation so subsequent visits cycle naturally
  const now = new Date();
  const dayOfYear = Math.floor((now.getTime() - new Date(now.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24));
  const hour = now.getHours();
  
  // Track last viewed index in sessionStorage to cycle on every click
  let cycleOffset = 0;
  if (typeof window !== "undefined" && window.sessionStorage) {
    try {
      const norm = normalizeScriptureReference(reference);
      const lastIdxKey = `reservoir_last_idx_${norm}`;
      const lastIdx = Number(sessionStorage.getItem(lastIdxKey) || 0);
      cycleOffset = (lastIdx + 1) % devotions.length;
      sessionStorage.setItem(lastIdxKey, String(cycleOffset));
    } catch {}
  } else {
    cycleOffset = (dayOfYear + hour) % devotions.length;
  }

  const selectedIndex = cycleOffset % devotions.length;
  const devotion = devotions[selectedIndex];

  return {
    devotion,
    totalStored: devotions.length,
    index: selectedIndex,
    label: devotion.label || `Devotion ${String.fromCharCode(65 + selectedIndex)}`
  };
}

/**
 * Saves a newly generated AI devotion into the Permanent Content Reservoir!
 * AI available -> generate -> save it!
 */
export function saveDevotionToPermanentReservoir(
  reference: string,
  devotionData: any
): ReservoirDevotion {
  const normRef = normalizeScriptureReference(reference) || "scripture";
  const existing = getStoredDevotionsForVerse(normRef);
  const nextLetter = String.fromCharCode(65 + Math.min(25, existing.length)); // Devotion A, B, C, D...

  const dev = devotionData?.devotion || devotionData || {};
  const title = dev.title || `Devotion on ${reference}`;
  const reflection = dev.reflection || dev.theologicalExposition || dev.content || "";
  const practicalApplication = dev.practicalApplication || dev.application || "";
  const guidedPrayer = dev.guidedPrayer || dev.prayer || "";
  const actionStep = dev.actionStep || `Meditate on ${reference} and share its truth today.`;
  const apostolicDecree = dev.apostolicDecree || "";
  const hopeAndEncouragementConclusion = dev.hopeAndEncouragementConclusion || dev.hopeEncouragementConclusion || "";

  const newDevotion: ReservoirDevotion = {
    id: `res-gen-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    reference,
    label: `Devotion ${nextLetter}`,
    title,
    keyScripture: dev.keyScripture || `${reference} - "${dev.passageText || ""}"`,
    passageText: dev.passageText || "",
    reflection,
    practicalApplication,
    guidedPrayer,
    actionStep,
    apostolicDecree,
    hopeAndEncouragementConclusion,
    theme: dev.theme || "Covenant Faith",
    category: dev.category || "The Joy of the Lord",
    source: "ai_generated_reservoir",
    savedAt: new Date().toISOString()
  };

  // Save to client localStorage
  if (typeof window !== "undefined" && window.localStorage) {
    try {
      const storedJson = localStorage.getItem(RESERVOIR_STORAGE_KEY);
      const storeMap: Record<string, ReservoirDevotion[]> = storedJson ? JSON.parse(storedJson) : {};
      if (!storeMap[normRef]) {
        storeMap[normRef] = [];
      }
      // Cap at 15 devotions per scripture
      storeMap[normRef] = [newDevotion, ...storeMap[normRef].slice(0, 14)];
      localStorage.setItem(RESERVOIR_STORAGE_KEY, JSON.stringify(storeMap));
      console.log(`[PERMANENT RESERVOIR] 🏛️ Successfully archived "${newDevotion.label}" for ${reference}!`);
    } catch (err) {
      console.warn("[RESERVOIR] Error saving devotion to localStorage:", err);
    }
  }

  // Also notify server in background if endpoint exists
  try {
    fetch("/api/reservoir/devotions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ reference, devotion: newDevotion })
    }).catch(() => {});
  } catch {}

  return newDevotion;
}

/**
 * Checks if a scripture has at least one devotion archived in the permanent reservoir
 */
export function isScriptureInReservoir(reference: string): boolean {
  const devotions = getStoredDevotionsForVerse(reference);
  return devotions.length > 0;
}

/**
 * Returns all distinct scriptures currently maintained in the reservoir
 */
export function getAllReservoirScriptures(): Array<{
  reference: string;
  count: number;
  sampleTitle: string;
  devotions: ReservoirDevotion[];
}> {
  const catalog: Record<string, ReservoirDevotion[]> = {};

  // Add pre-seeded
  for (const [ref, list] of Object.entries(PRE_SEEDED_RESERVOIR)) {
    catalog[ref] = [...list];
  }

  // Add client saved
  if (typeof window !== "undefined" && window.localStorage) {
    try {
      const stored = localStorage.getItem(RESERVOIR_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        for (const [ref, list] of Object.entries(parsed)) {
          if (!catalog[ref]) {
            catalog[ref] = [];
          }
          const ids = new Set(catalog[ref].map((d) => d.id));
          for (const d of (list as ReservoirDevotion[])) {
            if (!ids.has(d.id)) {
              catalog[ref].push(d);
            }
          }
        }
      }
    } catch {}
  }

  return Object.entries(catalog).map(([ref, list]) => ({
    reference: list[0]?.reference || ref,
    count: list.length,
    sampleTitle: list[0]?.title || `Devotions on ${ref}`,
    devotions: list
  }));
}

/**
 * Formats a reservoir devotion into clean display markdown
 */
export function formatReservoirDevotionForDisplay(devotion: ReservoirDevotion): string {
  const lines: string[] = [
    `✨ ${devotion.title}`,
    `*(Permanent Covenant Reservoir • ${devotion.label})*\n`,
    `SCRIPTURE ANCHOR:\n${devotion.keyScripture || devotion.reference}\n`,
    `THEOLOGICAL REFLECTION:\n${devotion.reflection}\n`,
    `PRACTICAL APPLICATION:\n${devotion.practicalApplication}\n`,
    `ACTION STEP FOR TODAY:\n${devotion.actionStep}\n`,
    `GUIDED PRAYER:\n${devotion.guidedPrayer}`
  ];

  if (devotion.apostolicDecree) {
    lines.push(`\nAPOSTOLIC DECREE:\n${devotion.apostolicDecree}`);
  }

  if (devotion.hopeAndEncouragementConclusion) {
    lines.push(`\n🌟 CONCLUSION — UNSHAKEABLE HOPE & ENCOURAGEMENT:\n${devotion.hopeAndEncouragementConclusion}`);
  }

  return lines.join("\n\n");
}

/**
 * Graceful message when AI is unavailable AND no stored devotion exists for that specific verse
 */
export function getGracefulReservoirUnavailableMessage(reference: string): string {
  return (
    `A stored devotion is not yet archived in the Covenant Reservoir for "${reference}".\n\n` +
    `Our live AI generation is currently resting due to Google AI capacity limits. ` +
    `Once the daily quota refreshes, fresh generations will automatically resume and enrich your reservoir.\n\n` +
    `In the meantime, you can explore our rich library of stored devotions for key scriptures such as ` +
    `Jeremiah 29:11 (Devotions A–E), Psalm 23:1 (Devotions A–E), Romans 8:28 (Devotions A–D), ` +
    `Isaiah 40:31 (Devotions A–D), Philippians 4:6-7 (Devotions A–D), and Nehemiah 8:10 (Devotions A–D).`
  );
}

// =========================================================================
// UNIVERSAL MULTI-OUTLET PERMANENT RESERVOIR IMPLEMENTATION
// Covers all AI outlets: Devotions, Prayers, Prayer Points, Explain Verse,
// Joy of the Lord, Rhema, MathemaSermons, ApostleMath, History, Doctrine.
// =========================================================================

/**
 * Normalizes any actionType, endpoint, or category into a canonical ReservoirOutlet
 */
export function normalizeOutlet(
  actionType?: string,
  endpoint?: string,
  category?: string
): ReservoirOutlet {
  const act = (actionType || "").toLowerCase().trim();
  const ep = (endpoint || "").toLowerCase().trim();
  const cat = (category || "").toLowerCase().trim();

  // 1. Prayer Points
  if (
    act.includes("point") ||
    act === "5 high-impact prayer points" ||
    act === "prayer_points" ||
    act === "generate 5 prayer points"
  ) {
    return "prayer_points";
  }

  // 2. Guided Prayers
  if (
    act.includes("prayer") ||
    ep.includes("prayer") ||
    cat.includes("prayer") ||
    act === "apostolic prayer" ||
    act === "intercession"
  ) {
    return "prayer";
  }

  // 3. MathemaSermons
  if (act.includes("mathemasermon") || ep.includes("mathemasermon")) {
    return "mathemasermon";
  }

  // 4. ApostleMath
  if (act.includes("apostlemath") || ep.includes("apostlemath") || (act.includes("math") && !act.includes("sermon"))) {
    return "apostlemath";
  }

  // 5. The Joy of the Lord Fortress & Battle Revelations
  if (
    act.includes("joy") ||
    ep.includes("joy") ||
    cat.includes("joy") ||
    act === "the joy of the lord" ||
    act === "joy_battle"
  ) {
    return "joy_of_the_lord";
  }

  // 6. Prophetic Rhema
  if (act.includes("rhema") || ep.includes("rhema") || cat.includes("rhema") || act.includes("now-word")) {
    return "rhema";
  }

  // 7. Historical Context & Archaeology
  if (
    act.includes("history") ||
    act.includes("historical") ||
    ep.includes("history") ||
    act.includes("archaeology") ||
    ep.includes("scriptural-place-history")
  ) {
    return "historical_context";
  }

  // 8. Chapter Summary
  if (act.includes("chapter") || ep.includes("chapter") || act === "chapter summary") {
    return "chapter_summary";
  }

  // 9. Christian Doctrines & Bible Q&A
  if (
    act.includes("doctrine") ||
    ep.includes("doctrine") ||
    cat.includes("doctrine") ||
    act.includes("theology") ||
    ep.includes("ask-doctrine")
  ) {
    return "doctrine";
  }

  // 10. Explain Verse & Exegesis
  if (
    act.includes("explain") ||
    act.includes("exposition") ||
    act.includes("commentary") ||
    ep.includes("verse-action") ||
    act.includes("exegesis")
  ) {
    return "explain_verse";
  }

  // Default outlet
  return "devotion";
}

/**
 * Human-friendly outlet display labels
 */
export function getOutletDisplayLabel(outlet: ReservoirOutlet): string {
  switch (outlet) {
    case "devotion":
      return "Daily Devotion";
    case "prayer":
      return "Apostolic Prayer";
    case "prayer_points":
      return "Targeted Prayer Points";
    case "explain_verse":
      return "Verse Expository Analysis";
    case "joy_of_the_lord":
      return "Joy of the Lord Revelation";
    case "rhema":
      return "Prophetic Rhema Word";
    case "mathemasermon":
      return "MathemaSermon";
    case "apostlemath":
      return "ApostleMath Lesson";
    case "historical_context":
      return "Historical & Archaeological Record";
    case "doctrine":
      return "Systematic Doctrine Exposition";
    case "chapter_summary":
      return "Chapter Summary & Revelation";
    default:
      return "Biblical Insight";
  }
}

/**
 * Extracts a normalized indexing key from options
 */
export function extractReservoirKey(options: {
  scriptureReference?: string;
  reference?: string;
  biblicalReference?: string;
  subject?: string;
  topic?: string;
  mathematicalConcept?: string;
  need?: string;
  placeName?: string;
  question?: string;
  category?: string;
  prompt?: string;
}): string {
  const raw =
    options.scriptureReference ||
    options.reference ||
    options.biblicalReference ||
    options.placeName ||
    options.mathematicalConcept ||
    options.topic ||
    options.subject ||
    options.question ||
    options.need ||
    "scripture";

  const norm = normalizeScriptureReference(raw);
  if (norm) return norm;
  return raw.trim().toLowerCase().replace(/^[(\["']+|[)\]"']+$/g, "").trim();
}

/**
 * Universal pre-seeded catalog mapping outlet -> canonical key -> items
 */
function getPreSeededCatalog(outlet: ReservoirOutlet): Record<string, UniversalReservoirItem[]> {
  switch (outlet) {
    case "devotion": {
      const devCatalog: Record<string, UniversalReservoirItem[]> = {};
      for (const [ref, list] of Object.entries(PRE_SEEDED_RESERVOIR)) {
        devCatalog[ref] = list.map((d) => ({
          id: d.id,
          outlet: "devotion",
          reference: d.reference,
          label: d.label,
          title: d.title,
          keyScripture: d.keyScripture,
          passageText: d.passageText,
          theme: d.theme,
          category: d.category,
          source: d.source,
          savedAt: d.savedAt || "2026-01-01T00:00:00.000Z",
          data: {
            devotion: {
              title: d.title,
              keyScripture: d.keyScripture,
              passageText: d.passageText,
              reflection: d.reflection,
              practicalApplication: d.practicalApplication,
              guidedPrayer: d.guidedPrayer,
              actionStep: d.actionStep,
              apostolicDecree: d.apostolicDecree,
              hopeAndEncouragementConclusion: d.hopeAndEncouragementConclusion,
              theme: d.theme,
              category: d.category
            }
          },
          formattedText: formatReservoirDevotionForDisplay(d)
        }));
      }
      return devCatalog;
    }
    case "prayer":
      return PRE_SEEDED_PRAYERS;
    case "prayer_points":
      return PRE_SEEDED_PRAYER_POINTS;
    case "explain_verse":
      return PRE_SEEDED_EXPOSITIONS;
    case "joy_of_the_lord":
      return PRE_SEEDED_JOY_REVELATIONS;
    case "rhema":
      return PRE_SEEDED_RHEMA;
    case "mathemasermon":
      return PRE_SEEDED_MATHEMASERMONS;
    case "historical_context":
      return PRE_SEEDED_HISTORY;
    case "doctrine":
      return PRE_SEEDED_DOCTRINES;
    default:
      return {};
  }
}

/**
 * Retrieve all items stored for a specific outlet and key (merging canonical + client localStorage)
 */
export function getStoredUniversalItems(
  outlet: ReservoirOutlet,
  rawKey: string
): UniversalReservoirItem[] {
  const normKey = extractReservoirKey({ scriptureReference: rawKey });
  if (!normKey) return [];

  const items: UniversalReservoirItem[] = [];
  const seenIds = new Set<string>();

  // 1. Check Pre-seeded Canonical Library
  const preSeededMap = getPreSeededCatalog(outlet);
  for (const [key, list] of Object.entries(preSeededMap)) {
    const normEntryKey = normalizeScriptureReference(key) || key.toLowerCase();
    const isScripture = !!normalizeScriptureReference(rawKey) || !!normalizeScriptureReference(key);
    const isMatch = outlet === "doctrine"
      ? normKey === normEntryKey
      : normKey === normEntryKey || (isScripture && (normKey.startsWith(normEntryKey) || normEntryKey.startsWith(normKey)));
    if (isMatch) {
      for (const item of list) {
        if (!seenIds.has(item.id)) {
          seenIds.add(item.id);
          items.push(item);
        }
      }
    }
  }

  // 2. Check localStorage on client
  if (typeof window !== "undefined" && window.localStorage) {
    try {
      const storageKey = `covenant_reservoir_${outlet}_${normKey}`;
      const raw = localStorage.getItem(storageKey);
      if (raw) {
        const storedList: UniversalReservoirItem[] = JSON.parse(raw);
        if (Array.isArray(storedList)) {
          for (const item of storedList) {
            if (!seenIds.has(item.id)) {
              seenIds.add(item.id);
              items.push(item);
            }
          }
        }
      }
    } catch (e) {
      console.warn(`[UNIVERSAL RESERVOIR] Error reading localStorage for ${outlet}:`, e);
    }
  }

  return items;
}

/**
 * Select an appropriate stored item from the reservoir across ANY outlet
 * (Prayer A, Prayer B, Exposition A, Joy Revelation A, etc.)
 */
export function selectUniversalReservoirItem(
  outlet: ReservoirOutlet,
  rawKey: string
): UniversalReservoirSelection | null {
  const items = getStoredUniversalItems(outlet, rawKey);
  if (!items || items.length === 0) {
    return null;
  }

  const now = new Date();
  const normKey = extractReservoirKey({ scriptureReference: rawKey });
  const cycleKey = `reservoir_cycle_${outlet}_${normKey}`;

  let cycleOffset = 0;
  if (typeof window !== "undefined" && window.sessionStorage) {
    try {
      const last = Number(sessionStorage.getItem(cycleKey) || 0);
      cycleOffset = (last + 1) % items.length;
      sessionStorage.setItem(cycleKey, String(cycleOffset));
    } catch {
      cycleOffset = (now.getMinutes() + now.getSeconds()) % items.length;
    }
  } else {
    cycleOffset = (now.getMinutes() + now.getSeconds()) % items.length;
  }

  const selectedIndex = cycleOffset % items.length;
  const item = items[selectedIndex];

  return {
    item,
    totalStored: items.length,
    index: selectedIndex,
    label: item.label || `Edition ${String.fromCharCode(65 + selectedIndex)}`,
    outlet
  };
}

/**
 * Formats any UniversalReservoirItem for display in text or streaming mode
 */
export function formatUniversalReservoirItemForDisplay(item: UniversalReservoirItem): string {
  if (item.formattedText && item.formattedText.trim().length > 0) {
    return item.formattedText;
  }

  const outletLabel = getOutletDisplayLabel(item.outlet);
  const data = item.data || {};

  // If it's a devotion
  if (item.outlet === "devotion") {
    const dev = data.devotion || data;
    return formatReservoirDevotionForDisplay({
      id: item.id,
      reference: item.reference,
      label: item.label,
      title: item.title,
      keyScripture: item.keyScripture || item.reference,
      passageText: item.passageText || "",
      reflection: dev.reflection || dev.theologicalExposition || "",
      practicalApplication: dev.practicalApplication || "",
      guidedPrayer: dev.guidedPrayer || dev.prayer || "",
      actionStep: dev.actionStep || "",
      apostolicDecree: dev.apostolicDecree,
      hopeAndEncouragementConclusion: dev.hopeAndEncouragementConclusion,
      source: item.source
    });
  }

  // Format generic structured item
  const lines: string[] = [
    `✨ ${item.title}`,
    `*(Permanent Covenant Reservoir • ${item.label} • ${outletLabel})*\n`
  ];

  if (item.keyScripture) {
    lines.push(`SCRIPTURE ANCHOR:\n${item.keyScripture}\n`);
  }

  if (data.adoration) {
    lines.push(`ADORATION:\n${data.adoration}\n`);
  }
  if (data.confessionAndSurrender) {
    lines.push(`CONFESSION & SURRENDER:\n${data.confessionAndSurrender}\n`);
  }
  if (data.thanksgiving) {
    lines.push(`THANKSGIVING:\n${data.thanksgiving}\n`);
  }
  if (data.petition) {
    lines.push(`PETITION:\n${data.petition}\n`);
  }
  if (data.spiritualWarfare) {
    lines.push(`SPIRITUAL WARFARE:\n${data.spiritualWarfare}\n`);
  }
  if (data.declarationInJesusName) {
    lines.push(`DECLARATION IN JESUS' NAME:\n${data.declarationInJesusName}\n`);
  }

  if (data.prayerPoints && Array.isArray(data.prayerPoints)) {
    lines.push(`PRAYER POINTS:`);
    data.prayerPoints.forEach((p: any, idx: number) => {
      lines.push(`${idx + 1}. ${p.focus || p.title || "Prayer Target"}\nPromise: ${p.scripturePromise || ""}\nDeclaration: ${p.prayerDeclaration || p.prayer || ""}`);
    });
    lines.push("");
  }

  if (data.historicalContext) {
    lines.push(`HISTORICAL CONTEXT:\n${data.historicalContext}\n`);
  }
  if (data.originalLanguageInsight || data.originalLanguageJoyInsight) {
    lines.push(`ORIGINAL LANGUAGE INSIGHT:\n${data.originalLanguageInsight || data.originalLanguageJoyInsight}\n`);
  }
  if (data.expositoryBreakdown || data.theologicalJoyExposition || data.theologicalExposition) {
    lines.push(`THEOLOGICAL EXPOSITION:\n${data.expositoryBreakdown || data.theologicalJoyExposition || data.theologicalExposition}\n`);
  }
  if (data.lifeTransformation) {
    lines.push(`LIFE TRANSFORMATION:\n${data.lifeTransformation}\n`);
  }
  if (data.apostolicBlessing) {
    lines.push(`APOSTOLIC BLESSING:\n${data.apostolicBlessing}\n`);
  }
  if (data.hopeAndEncouragementConclusion) {
    lines.push(`🌟 CONCLUSION — UNSHAKEABLE HOPE & ENCOURAGEMENT:\n${data.hopeAndEncouragementConclusion}\n`);
  }

  return lines.join("\n");
}

/**
 * Saves ANY generated AI content to the Permanent Content Reservoir!
 * AI available -> generate -> save it!
 */
export function saveContentToUniversalReservoir(
  outlet: ReservoirOutlet,
  rawKey: string,
  data: any,
  rawText?: string
): UniversalReservoirItem {
  const normKey = extractReservoirKey({ scriptureReference: rawKey }) || "covenant_item";
  const existing = getStoredUniversalItems(outlet, normKey);
  const nextLetter = String.fromCharCode(65 + Math.min(25, existing.length)); // Edition A, B, C, D...

  const outletPrefix =
    outlet === "prayer"
      ? "Prayer"
      : outlet === "prayer_points"
      ? "Prayer Points"
      : outlet === "explain_verse"
      ? "Exposition"
      : outlet === "joy_of_the_lord"
      ? "Joy Revelation"
      : outlet === "rhema"
      ? "Rhema Word"
      : outlet === "mathemasermon"
      ? "MathemaSermon"
      : outlet === "apostlemath"
      ? "ApostleMath"
      : outlet === "historical_context"
      ? "Historical Record"
      : outlet === "doctrine"
      ? "Doctrine Exposition"
      : outlet === "chapter_summary"
      ? "Chapter Summary"
      : "Devotion";

  const resolvedTitle =
    data?.title ||
    data?.devotion?.title ||
    data?.prayerTitle ||
    `${outletPrefix} on ${rawKey}`;

  const newItem: UniversalReservoirItem = {
    id: `res-uni-${outlet.substring(0, 3)}-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    outlet,
    reference: rawKey,
    label: `${outletPrefix} ${nextLetter}`,
    title: resolvedTitle,
    subtitle: data?.subtitle,
    keyScripture: data?.scriptureAnchor || data?.keyScripture || rawKey,
    passageText: data?.passageText || "",
    data,
    formattedText: rawText || "",
    theme: data?.theme || data?.category || "Covenant Word",
    category: data?.category || outlet,
    source: "ai_generated_reservoir",
    savedAt: new Date().toISOString()
  };

  if (!newItem.formattedText) {
    newItem.formattedText = formatUniversalReservoirItemForDisplay(newItem);
  }

  // 1. Save to client localStorage
  if (typeof window !== "undefined" && window.localStorage) {
    try {
      const storageKey = `covenant_reservoir_${outlet}_${normKey}`;
      const rawStored = localStorage.getItem(storageKey);
      let list: UniversalReservoirItem[] = [];
      if (rawStored) {
        try {
          list = JSON.parse(rawStored);
        } catch {}
      }
      list = [newItem, ...list.filter((x) => x.id !== newItem.id).slice(0, 19)];
      localStorage.setItem(storageKey, JSON.stringify(list));
      console.log(
        `[UNIVERSAL RESERVOIR] 🏛️ Stored ${newItem.label} for "${rawKey}" in outlet "${outlet}" (Total: ${list.length})`
      );
    } catch (err) {
      console.warn(`[UNIVERSAL RESERVOIR] LocalStorage error:`, err);
    }
  }

  // 2. Also send to server reservoir asynchronously in background
  if (typeof window !== "undefined" && window.fetch) {
    fetch("/api/reservoir/content", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        outlet,
        reference: rawKey,
        key: normKey,
        item: newItem
      })
    }).catch(() => {
      // Non-blocking
    });
  }

  return newItem;
}

/**
 * Universal Graceful unavailable message when AI quota is reached AND no stored item is yet archived
 */
export function getGracefulUniversalReservoirMessage(
  outlet: ReservoirOutlet,
  rawKey: string
): string {
  const outletLabel = getOutletDisplayLabel(outlet);

  return (
    `A stored ${outletLabel} is not yet archived in the Covenant Reservoir for "${rawKey}".\n\n` +
    `Our live AI generation is currently resting due to Google AI capacity limits. ` +
    `Once the daily quota refreshes, fresh generations will automatically resume and enrich your reservoir with new ${outletLabel} editions.\n\n` +
    `In the meantime, you can explore our rich library of stored ${outletLabel}s for foundational Scriptures such as ` +
    `Jeremiah 29:11, Psalm 23:1, Romans 8:28, Isaiah 40:31, Philippians 4:6-7, and Nehemiah 8:10.`
  );
}

/**
 * Catalog inspection of all stored items across all outlets
 */
export function getAllUniversalReservoirCatalog(): UniversalReservoirCatalogEntry[] {
  const entries: UniversalReservoirCatalogEntry[] = [];
  const outlets: ReservoirOutlet[] = [
    "devotion",
    "prayer",
    "prayer_points",
    "explain_verse",
    "joy_of_the_lord",
    "rhema",
    "mathemasermon",
    "historical_context",
    "doctrine"
  ];

  for (const out of outlets) {
    const catalog = getPreSeededCatalog(out);
    for (const [ref, list] of Object.entries(catalog)) {
      entries.push({
        reference: ref,
        outlet: out,
        count: list.length,
        sampleTitle: list[0]?.title || `${ref}`,
        labels: list.map((x) => x.label)
      });
    }
  }

  return entries;
}
