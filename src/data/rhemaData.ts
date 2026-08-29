import { RhemaWordItem } from "../types";
import { generateAll400RhemaWords } from "./rhemaFullCatalog";

const BASE_RHEMA_CATALOG: RhemaWordItem[] = [
  {
    id: "rhema-01-the-door-of-sudden-turnaround",
    title: "The Hour of Sudden Supernatural Turnaround",
    seasonCategory: "Breakthrough",
    propheticDeclaration: "What took years to scatter is coming together in days under the breath of the Almighty.",
    nowWordText: "Hear the living Rhema of the Lord for this hour: The season of protracted waiting has collided with the appointed time of favor (Psalm 102:13). The Lord is breaking the brass gates of resistance that have held your testimony in captivity. You shall not leave this season empty-handed.",
    scriptureAnchor: {
      reference: "Isaiah 43:18-19 (AMP)",
      text: "Do not remember the former things, or ponder the things of the past. Listen carefully, I am about to do a new thing, now it will spring forth; will you not be aware of it? I will even put a road in the wilderness, rivers in the desert."
    },
    actionCommandment: "Release all mental records of past disappointment. Wash your face, anoint your head with the oil of joy, and begin preparing for capacity expansion.",
    propheticDecree: "I decree and declare that every closed door of destiny is swinging wide open before me. By the blood of Jesus, no demonic barricade can withstand my advancement!",
    dailyActivationGuide: [
      "Fast from negative speaking for the next 24 hours.",
      "Speak the Name of Jesus over the exact area where you have felt delayed.",
      "Take one tangible step of preparation as an act of aggressive faith."
    ],
    spiritualAtmosphere: "Atmosphere of Swift Deliverance & Divine Favor"
  },
  {
    id: "rhema-02-the-mantle-of-divine-acceleration",
    title: "The Mantle of Divine Acceleration (Elijah's Girdle)",
    seasonCategory: "Divine Acceleration",
    propheticDeclaration: "The hand of the Lord is upon your feet to outrun the chariots of Ahab.",
    nowWordText: "The Spirit of God says to you: You will no longer measure progress by human calendar increments. Where you have lagged behind, the Holy Ghost is placing an acceleration factor upon your spirit. You are being propelled into God's original divine timeline.",
    scriptureAnchor: {
      reference: "1 Kings 18:46 (KJV)",
      text: "And the hand of the LORD was on Elijah; and he girded up his loins, and ran before Ahab to the entrance of Jezreel."
    },
    actionCommandment: "Gird up the loins of your mind (1 Peter 1:13). Cut off time-wasting distractions and align your daily schedule with your heavenly assignment.",
    propheticDecree: "The hand of the Lord is upon my life. I outrun every delay, every setback, and every limitation of the flesh in Jesus' mighty Name!",
    dailyActivationGuide: [
      "Wake up early and spend 15 focused minutes in the secret place with God.",
      "Pray in the Holy Ghost to build your spiritual stamina.",
      "Declare divine speed over your career, ministry, and family."
    ],
    spiritualAtmosphere: "Supernatural Momentum & Prophetic Speed"
  },
  {
    id: "rhema-03-the-unshakable-peace-in-the-storm",
    title: "Supernatural Peace That Surpasses Natural Logic",
    seasonCategory: "Supernatural Peace",
    propheticDeclaration: "The storm does not determine your destination; the Master in your boat does.",
    nowWordText: "Thus saith the Lord: Cease your striving and quiet your soul before My presence. The raging tempest around you is but noise on the surface of the waters, but deep within your spirit, My peace reigns as an immovable anchor. Speak to the wind: 'Peace, be still!'",
    scriptureAnchor: {
      reference: "Mark 4:39 (NKJV)",
      text: "Then He arose and rebuked the wind, and said to the sea, 'Peace, be still!' And the wind ceased and there was a great calm."
    },
    actionCommandment: "Refuse to engage in panic or anxious overthinking. When anxious thoughts arise, immediately exchange them for thanksgiving.",
    propheticDecree: "I have the peace of God which passes all understanding. My mind is steadfast, my heart is guarded in Christ Jesus, and no panic shall overwhelm me!",
    dailyActivationGuide: [
      "Breathe deeply and whisper the Name 'Jesus' ten times in quiet adoration.",
      "Turn off alarming news or media that feeds fear.",
      "Meditate on Psalm 91 before retiring to sleep tonight."
    ],
    spiritualAtmosphere: "Still Waters & Divine Serenity"
  },
  {
    id: "rhema-04-demolishing-the-siege-of-the-enemy",
    title: "Breaking the Siege and Overthrowing Spiritual Resistance",
    seasonCategory: "Spiritual Warfare",
    propheticDeclaration: "The weapons of your warfare are not carnal, but mighty through God to the pulling down of strong holds.",
    nowWordText: "Hear this Word from the Throne: The invisible barricades that have hindered your breakthrough are collapsing today. Every accusation of the enemy has been answered by the blood of the Lamb. Put on the whole armor of God, take the sword of the Spirit, and assert your legal authority in Christ!",
    scriptureAnchor: {
      reference: "2 Corinthians 10:4-5 (KJV)",
      text: "(For the weapons of our warfare are not carnal, but mighty through God to the pulling down of strong holds;) Casting down imaginations, and every high thing that exalteth itself against the knowledge of God."
    },
    actionCommandment: "Identify negative internal thoughts that contradict God's Word and verbally rebuke them in the Name of Jesus.",
    propheticDecree: "Every altar of darkness raised against my lineage is dismantled. I stand clothed in Christ's righteousness, victorious over all principalities and powers!",
    dailyActivationGuide: [
      "Anoint your home and doorway while praying Psalm 24.",
      "Play anointed instrumental worship music in your living space.",
      "Speak blessings over those who have opposed you."
    ],
    spiritualAtmosphere: "Triumphant Dominion & Victorious Authority"
  },
  {
    id: "rhema-05-the-divine-shift-into-new-territory",
    title: "The Divine Shift: Stepping into Your New Dimension",
    seasonCategory: "Transition",
    propheticDeclaration: "You cannot enter your new season with your old luggage.",
    nowWordText: "The Lord says: I am shifting the coordinates of your life. Do not fear the discomfort of transition, for the winepress is making way for the fresh wine of My anointing. Let go of what has passed, for what lies ahead is far greater than what was behind.",
    scriptureAnchor: {
      reference: "Haggai 2:9 (KJV)",
      text: "The glory of this latter house shall be greater than of the former, saith the LORD of hosts: and in this place will I give peace, saith the LORD of hosts."
    },
    actionCommandment: "Declutter your physical and spiritual space. Forgive anyone who hurt you in the previous season and step forward with clean hands.",
    propheticDecree: "I am stepping boldly into my new season. The glory of my latter days shall exceed my former days, and God's purpose for my life will be fulfilled!",
    dailyActivationGuide: [
      "Write down 3 things you are releasing to God in full surrender.",
      "Set your vision for the next quarter in written faith statements.",
      "Sow a seed of praise for future breakthroughs."
    ],
    spiritualAtmosphere: "Pioneering Grace & Fresh Anointing"
  },
  {
    id: "rhema-06-the-fountain-of-living-health",
    title: "The Fountain of Divine Health and Total Restoration",
    seasonCategory: "Healing & Restoration",
    propheticDeclaration: "By His stripes you were healed, and by His Spirit you are made whole.",
    nowWordText: "The Great Physician speaks to your body today: I am the LORD that healeth thee (Exodus 15:26). Every cell, every organ, every nerve, and every tissue in your mortal body is subject to the law of the Spirit of life in Christ Jesus. Sickness has no legal right to dwell in God's temple!",
    scriptureAnchor: {
      reference: "1 Peter 2:24 (NKJV)",
      text: "who Himself bore our sins in His own body on the tree, that we, having died to sins, might live for righteousness—by whose stripes you were healed."
    },
    actionCommandment: "Place your hand over any area of pain or discomfort and command it to come into alignment with the healing blood of Jesus.",
    propheticDecree: "Divine health is my inheritance. No affliction shall reside in my body. The resurrection life of Christ is revitalizing my strength daily!",
    dailyActivationGuide: [
      "Partake of the Holy Communion at home with reverent faith.",
      "Confess Psalm 103:1-5 aloud three times today.",
      "Drink clean water and speak words of life over your body."
    ],
    spiritualAtmosphere: "Miraculous Healing & Vitality"
  },
  {
    id: "rhema-07-the-gate-of-supernatural-provision",
    title: "The Open Gate of Supernatural Provision",
    seasonCategory: "Covenant Abundance",
    propheticDeclaration: "God does not supply from your employer or the economy; He supplies according to His riches in glory.",
    nowWordText: "Hear the Word of the Lord: Stop measuring your future by your bank balance. The windows of heaven are unlocked over your life. When the brook dried up for Elijah, God commanded the ravens and a widow in Zarephath. God has already commanded resources from unexpected quarters to locate your obedience!",
    scriptureAnchor: {
      reference: "Philippians 4:19 (KJV)",
      text: "But my God shall supply all your need according to his riches in glory by Christ Jesus."
    },
    actionCommandment: "Break the spirit of poverty and scarcity by giving a generous offering and giving thanks for provision before you see it in the natural.",
    propheticDecree: "Lack has been severed from my house! God is opening supernatural doors of favor, wisdom, and resourcefulness. I am a distributor of Kingdom wealth!",
    dailyActivationGuide: [
      "Dedicate your financial plans and tithes to the Lord in prayer.",
      "Speak blessing over your workplace, business ideas, and hands.",
      "Give a blessing to someone in need secretly."
    ],
    spiritualAtmosphere: "Supernatural Multiplication & Open Heavens"
  },
  {
    id: "rhema-08-the-mantle-of-unshakable-peace",
    title: "The Mantle of Unshakable Peace in the Midst of the Storm",
    seasonCategory: "Supernatural Peace",
    propheticDeclaration: "The peace of God is not the absence of trouble; it is the presence of the Prince of Peace.",
    nowWordText: "Jesus speaks to the wind and the waves in your soul: 'Peace, be still!' When the world is overwhelmed by anxiety, depression, and panic, your heart is insulated by the shalom of God which surpasses all human understanding. You will sleep in the storm and rise in triumph!",
    scriptureAnchor: {
      reference: "Philippians 4:6-7 (KJV)",
      text: "Be careful for nothing; but in every thing by prayer and supplication with thanksgiving let your requests be made known unto God. And the peace of God, which passeth all understanding, shall keep your hearts and minds through Christ Jesus."
    },
    actionCommandment: "Turn off worldly panic broadcasts. Cast every anxious thought on Jesus and refuse to engage in fearful speculation.",
    propheticDecree: "I walk in perfect shalom. The Prince of Peace guards my mind and my home. No weapon of anxiety formed against me shall prosper!",
    dailyActivationGuide: [
      "Spend 15 minutes in silent gratitude, meditating on Psalm 91.",
      "Breathe deeply while whispering the Name of Jesus.",
      "Anoint your forehead with oil, declaring a sound mind (2 Tim 1:7)."
    ],
    spiritualAtmosphere: "Celestial Stillness & Unclouded Serenity"
  },
  {
    id: "rhema-09-the-resurrection-of-dormant-dreams",
    title: "The Resurrection of Dormant Dreams and Callings",
    seasonCategory: "Divine Awakening",
    propheticDeclaration: "What died in the natural was only sleeping until the appointed divine hour.",
    nowWordText: "The Spirit of the Lord says: Speak to the dry bones in your valley! The visions you buried because of disappointment, delay, or betrayal are receiving the breath of the Holy Ghost. God's gifts and calling are without repentance. Rise up and take your place in this generational awakening!",
    scriptureAnchor: {
      reference: "Ezekiel 37:4-5 (KJV)",
      text: "Again he said unto me, Prophesy upon these bones, and say unto them, O ye dry bones, hear the word of the LORD. Thus saith the Lord GOD unto these bones; Behold, I will cause breath to enter into you, and ye shall live."
    },
    actionCommandment: "Retrieve your old journals and vision notebooks. Strike through words of doubt and write 'Resurrected in Christ' beside each God-given vision.",
    propheticDecree: "Every dormant seed of destiny in my spirit is springing to life! I shall fulfill the entire book written concerning me in heaven!",
    dailyActivationGuide: [
      "Take 10 minutes to prophesy life over your family, gifts, and ministry.",
      "Write down the first practical step for a project you set aside.",
      "Give God a radical shout of praise for resurrection power."
    ],
    spiritualAtmosphere: "Resurrection Fire & Divine Acceleration"
  },
  {
    id: "rhema-10-the-garment-of-holy-purity-and-consecration",
    title: "The Garment of Holy Purity & Uncompromising Consecration",
    seasonCategory: "Holiness & Consecration",
    propheticDeclaration: "Power flows where purity is guarded; holiness is the beauty of God's sanctuary.",
    nowWordText: "The Lord of Hosts declares: I am calling My people out of compromise. The world has blurred the lines, but My standard of righteousness remains crystal clear. Walk in the light as I am in the light. When you are consecrated unto Me, the enemy cannot find a single foothold in your life!",
    scriptureAnchor: {
      reference: "1 Peter 1:15-16 (KJV)",
      text: "But as he which hath called you is holy, so be ye holy in all manner of conversation; Because it is written, Be ye holy; for I am holy."
    },
    actionCommandment: "Conduct a holy audit of your eyes, ears, and speech. Delete apps, subscriptions, or habits that grieve the Holy Spirit.",
    propheticDecree: "I am washed in the pure blood of the Lamb. My body is the holy temple of God. I choose purity, integrity, and righteousness above worldly compromise!",
    dailyActivationGuide: [
      "Pray Psalm 51:10: 'Create in me a clean heart, O God.'",
      "Fast a meal today and dedicate that hour to reading the Gospels.",
      "Set a filter on your media intake and guard your thought gate."
    ],
    spiritualAtmosphere: "Heavenly Radiance & Piercing Holiness"
  },
  {
    id: "rhema-11-the-covenant-of-family-deliverance",
    title: "The Covenant of Family Deliverance & Generational Blessing",
    seasonCategory: "Family Restoration",
    propheticDeclaration: "As for me and my house, we shall serve the Lord with undivided devotion.",
    nowWordText: "The Father of Compassion says: I have heard your silent tears for your children, your spouse, your parents, and your siblings. Generational curses of addiction, divorce, poverty, and premature death are broken at the Cross. A new generational lineage of righteousness begins with your obedience!",
    scriptureAnchor: {
      reference: "Acts 16:31 (KJV)",
      text: "And they said, Believe on the Lord Jesus Christ, and thou shalt be saved, and thy house."
    },
    actionCommandment: "Call out the names of your family members in your prayer closet, claiming them for the Kingdom of God with unshakeable authority.",
    propheticDecree: "My entire household is covered under the blood of Jesus! My children shall be taught of the Lord, and great shall be their peace (Isaiah 54:13)!",
    dailyActivationGuide: [
      "Gather your family or loved ones for a 5-minute blessing prayer.",
      "Send an encouraging Scripture text to an unsaved or drifting relative.",
      "Plant seeds of kindness and patience in your home interactions."
    ],
    spiritualAtmosphere: "Generational Jubilee & Household Salvation"
  },
  {
    id: "rhema-12-the-horn-of-prophetic-clarity",
    title: "The Horn of Prophetic Clarity and Divine Strategy",
    seasonCategory: "Wisdom & Discernment",
    propheticDeclaration: "God is replacing confusion with laser-focused prophetic discernment.",
    nowWordText: "The Holy Spirit reveals: The fog of worldly misinformation and emotional confusion is lifting. I am sharpening your spiritual intuition. You will hear a voice behind you saying, 'This is the way, walk ye in it' (Isaiah 30:21). The strategies of heaven will outmaneuver every ambush of the adversary!",
    scriptureAnchor: {
      reference: "James 1:5 (KJV)",
      text: "If any of you lack wisdom, let him ask of God, that giveth to all men liberally, and upbraideth not; and it shall be given him."
    },
    actionCommandment: "Before making any major decision this week, spend 30 minutes in tongues and Scripture meditation to receive heaven's blueprint.",
    propheticDecree: "I have the mind of Christ! Divine wisdom guides my thoughts, investments, relationships, and leadership. I walk in precision and clarity!",
    dailyActivationGuide: [
      "Read one chapter of Proverbs matching today's calendar date.",
      "Keep a notepad by your bedside to capture dreams and nocturnal revelations.",
      "Speak words of wisdom and life into every meeting."
    ],
    spiritualAtmosphere: "Illuminating Truth & Divine Counsel"
  },
  {
    id: "rhema-13-the-shield-of-uncompromising-boldness",
    title: "The Shield of Uncompromising Holy Boldness",
    seasonCategory: "Spiritual Warfare",
    propheticDeclaration: "The righteous are as bold as a lion; cowardice has no place in the army of Christ.",
    nowWordText: "The Captain of the Lord's Host roars: Fear of man brings a snare, but whoever puts trust in the Lord shall be safe. You have not been given a spirit of fear, but of power, love, and a sound mind! Stand up in your school, your workplace, your community, and declare the uncompromised Gospel of Jesus Christ!",
    scriptureAnchor: {
      reference: "Proverbs 28:1 (KJV)",
      text: "The wicked flee when no man pursueth: but the righteous are bold as a lion."
    },
    actionCommandment: "Share your testimony or the Gospel with at least one person today without hesitation or apology.",
    propheticDecree: "I am filled with the boldness of the Holy Ghost! I do not shrink back in fear or compromise. I stand as an unashamed ambassador of Jesus Christ!",
    dailyActivationGuide: [
      "Pray Acts 4:29-30 for supernatural boldness and signs following.",
      "Speak truth with love in conversations where compromise is encouraged.",
      "Encourage a fellow believer who is facing intimidation."
    ],
    spiritualAtmosphere: "Lionhearted Courage & Holy Fire"
  },
  {
    id: "rhema-14-the-crown-of-perseverance-and-eternal-hope",
    title: "The Crown of Perseverance and Eternal Hope",
    seasonCategory: "Eternal Reward",
    propheticDeclaration: "Your labor in the Lord is never in vain; the crown of righteousness awaits the faithful.",
    nowWordText: "The Faithful and True Witness whispers to the weary warrior: Do not throw away your confidence, for it has great recompense of reward. You need endurance so that after doing the will of God, you may receive the promise. A little while longer, and He who is coming will come and will not delay!",
    scriptureAnchor: {
      reference: "Galatians 6:9 (KJV)",
      text: "And let us not be weary in well doing: for in due season we shall reap, if we faint not."
    },
    actionCommandment: "Refuse to quit on the verge of your breakthrough. Re-anchor your soul in the anticipation of Christ's glorious return.",
    propheticDecree: "I will not faint! I will not quit! My eyes are fixed on Jesus, the author and finisher of my faith. My due season of harvest is here!",
    dailyActivationGuide: [
      "Sing an anthem of praise celebrating Christ's eternal victory.",
      "Review your spiritual milestones and give God thanks for keeping you.",
      "Pray for persecuted believers across the globe."
    ],
    spiritualAtmosphere: "Unshakable Hope & Triumphant Endurance"
  },
  {
    id: "rhema-15-the-overflow-of-rejoicing-in-the-lord",
    title: "The Overflow of Rejoicing in the Lord Always",
    seasonCategory: "Unspeakable Joy",
    propheticDeclaration: "Joy is not a luxury; it is your ultimate spiritual weapon and defensive armor.",
    nowWordText: "The Joy of the Lord is your strength! Rejoice in the Lord always: and again I say, Rejoice! When you laugh in the face of the enemy's intimidation, confusion enters the camp of the adversary. Your praise is turning your battlefield into a valley of blessing (Berachah)!",
    scriptureAnchor: {
      reference: "Nehemiah 8:10 (KJV)",
      text: "Then he said unto them, Go your way, eat the fat, and drink the sweet, and send portions unto them for whom nothing is prepared: for this day is holy unto our Lord: neither be ye sorry; for the joy of the LORD is your strength."
    },
    actionCommandment: "Take 5 minutes right now to put on the garment of praise and dance or shout for the victory of the Lord!",
    propheticDecree: "The joy of the Lord is my unshakeable fortress! Heavy spirits are broken off my shoulders. I overflow with rivers of living water and supernatural rejoicing!",
    dailyActivationGuide: [
      "Smile and laugh in thanksgiving for God's goodness.",
      "Listen to an uplifting hymn or worship track at top volume.",
      "Encourage 3 people today with words of joy and hope."
    ],
    spiritualAtmosphere: "Unspeakable Joy & Victorious Celebration"
  },
  {
    id: "rhema-16-the-anointing-for-kingdom-dominion",
    title: "The Anointing for Kingdom Dominion and Societal Impact",
    seasonCategory: "Kingdom Dominion",
    propheticDeclaration: "You are the salt of the earth and the light of the world; arise and shine!",
    nowWordText: "The King of Kings commissions you: You are called to occupy until I come. In government, education, business, science, media, family, and church, you are heaven's salt and light. The wisdom of Joseph and Daniel is being poured into your mind to provide divine solutions for earthly crises!",
    scriptureAnchor: {
      reference: "Matthew 5:14, 16 (KJV)",
      text: "Ye are the light of the world. A city that is set on an hill cannot be hid... Let your light so shine before men, that they may see your good works, and glorify your Father which is in heaven."
    },
    actionCommandment: "Deliver excellent, honorable, Christ-centered quality in your professional and academic work today.",
    propheticDecree: "I am an agent of God's Kingdom on earth! My work brings glory to Jesus, solves problems, and extends the dominion of righteousness in society!",
    dailyActivationGuide: [
      "Pray for wisdom over your workplace projects and colleagues.",
      "Demonstrate Christlike integrity, punctuality, and generosity in your sphere.",
      "Mentor or support an aspiring younger believer in their calling."
    ],
    spiritualAtmosphere: "Kingdom Authority & Transformational Impact"
  },
  {
    id: "rhema-17-the-wellspring-of-covenant-abundance",
    title: "Sowing in Famine: The Hundredfold Covenant Harvest",
    seasonCategory: "Covenant Abundance",
    propheticDeclaration: "Your supply does not depend on earthly economies; it flows from the inexhaustible treasury of heaven.",
    nowWordText: "Thus saith the Lord: Even in seasons when the world speaks of recession and lack, you shall flourish like Isaac in the valley of Gerar. The covenant of Abraham is upon your hands. As you release your seeds of obedience, faith, and generosity, I will open the windows of heaven and rebuke the devourer for your sake!",
    scriptureAnchor: {
      reference: "Genesis 26:12 (KJV)",
      text: "Then Isaac sowed in that land, and received in the same year an hundredfold: and the LORD blessed him."
    },
    actionCommandment: "Refuse fear-based withholding. Honor the Lord with your firstfruits and look expectantly for supernatural harvest.",
    propheticDecree: "I am connected to the inexhaustible economy of heaven! In times of famine, I shall be satisfied. The Lord commands His blessing upon my storehouses!",
    dailyActivationGuide: [
      "Sow a sacrificial seed into God's kingdom work or to someone in need.",
      "Declare Philippians 4:19 over your bank accounts and financial commitments.",
      "Thank God for supernatural multiplication in your career and business."
    ],
    spiritualAtmosphere: "Covenant Overflow & Supernatural Multiplication"
  },
  {
    id: "rhema-18-the-consuming-fire-of-holiness",
    title: "The Refiner's Flame of Consecration and Power",
    seasonCategory: "Holiness & Consecration",
    propheticDeclaration: "Purity is not a burden; it is the secret chamber of supernatural authority and intimacy with God.",
    nowWordText: "Hear the voice of the Holy Spirit: I am setting a divine separation between the holy and the profane. Draw near to My fire and let every chaff of compromise be consumed. When you walk in holiness, you carry an atmosphere that demons cannot tolerate and that angels delight to protect!",
    scriptureAnchor: {
      reference: "Hebrews 12:14 (KJV)",
      text: "Follow peace with all men, and holiness, without which no man shall see the Lord."
    },
    actionCommandment: "Examine your digital devices, media habits, and private conversations. Consecrate every gate of your body and mind to the Lord.",
    propheticDecree: "I am a vessel of honor, sanctified and meet for the Master's use! The fire of the Holy Ghost cleanses my heart, and I walk in unbroken fellowship with Jesus!",
    dailyActivationGuide: [
      "Spend 10 minutes in quiet confession and surrender before God's throne.",
      "Remove any media, entertainment, or association that grieves the Holy Spirit.",
      "Pray Psalm 51:10: 'Create in me a clean heart, O God.'"
    ],
    spiritualAtmosphere: "Awakening of Holy Reverence & Sacred Fire"
  },
  {
    id: "rhema-19-the-restoration-of-the-family-altar",
    title: "The Healing and Salvation of Your Entire Household",
    seasonCategory: "Family Restoration",
    propheticDeclaration: "Not one child, not one spouse, not one loved one shall be left behind in the kingdom of darkness.",
    nowWordText: "The Lord of Hosts declares: I have heard your midnight tears and prayers for your family members. The spirit of division and rebellion is broken off your home! I am turning the hearts of parents to children and children to parents. The blood of the Lamb is painted upon your doorposts, and salvation is entering your household!",
    scriptureAnchor: {
      reference: "Acts 16:31 (KJV)",
      text: "Believe on the Lord Jesus Christ, and thou shalt be saved, and thy house."
    },
    actionCommandment: "Call out the names of your family members in prayer, pleading the Blood of Jesus over each one with unwavering faith.",
    propheticDecree: "As for me and my house, we shall serve the Lord! No demon of addiction, divorce, or rebellion can remain in my family in Jesus' mighty Name!",
    dailyActivationGuide: [
      "Send a message of unconditional love to a distant or struggling relative.",
      "Speak blessings over your children, parents, and spouse before sleeping.",
      "Gather your household for prayer and Scripture reading."
    ],
    spiritualAtmosphere: "Family Reconciliation & Generational Salvation"
  },
  {
    id: "rhema-20-the-spirit-of-wisdom-and-revelation",
    title: "The Eyes of Your Understanding Being Enlightened",
    seasonCategory: "Wisdom & Discernment",
    propheticDeclaration: "You will no longer walk in confusion; divine strategy and prophetic insight are unlocking your next step.",
    nowWordText: "Thus saith the Spirit of Wisdom: I am opening the eyes of your understanding to perceive what eye hath not seen and ear hath not heard. Where worldly experts are perplexed, I am downloading divine blueprints into your spirit. Ask of Me, and I will show you great and mighty things which thou knowest not!",
    scriptureAnchor: {
      reference: "Ephesians 1:17-18 (KJV)",
      text: "That the God of our Lord Jesus Christ, the Father of glory, may give unto you the spirit of wisdom and revelation in the knowledge of him: The eyes of your understanding being enlightened."
    },
    actionCommandment: "Before making any major decision, spend 10 minutes waiting in silent contemplation for the Holy Spirit's quiet inner witness.",
    propheticDecree: "I have the mind of Christ! I possess supernatural wisdom, sound discernment, and prophetic clarity in every decision I make!",
    dailyActivationGuide: [
      "Read one chapter of Proverbs along with today's meditation.",
      "Write down the creative ideas and impressions the Holy Spirit gives you in prayer.",
      "Ask God specifically for solutions to complex problems at work or school."
    ],
    spiritualAtmosphere: "Prophetic Insight & Supernatural Clarity"
  },
  {
    id: "rhema-21-the-sound-of-an-abundance-of-rain",
    title: "The Cloud Like a Man's Hand: The Outpouring of Revival",
    seasonCategory: "Divine Awakening",
    propheticDeclaration: "The dry drought is over; the heavens are gathering black with clouds of holy outpouring.",
    nowWordText: "The Lord of the Harvest speaks: Lift up your eyes to the spiritual horizon! Though the sign appears small—like a man's hand rising out of the sea—it carries the weight of a torrential downpour of My Spirit. Prepare your barrels, dig your ditches in the valley, for the desert shall blossom as a rose!",
    scriptureAnchor: {
      reference: "1 Kings 18:41, 44 (KJV)",
      text: "And Elijah said unto Ahab, Get thee up, eat and drink; for there is a sound of abundance of rain... Behold, there ariseth a little cloud out of the sea, like a man's hand."
    },
    actionCommandment: "Expect revival! Stop speaking drought and start preparing your heart, church, and community for a mighty harvest of souls.",
    propheticDecree: "I hear the sound of the abundance of rain! The drought is broken, and rivers of revival are pouring into my soul, my church, and my nation!",
    dailyActivationGuide: [
      "Intercede for a great spiritual awakening in your local city and nation.",
      "Share the gospel message with at least one person this week.",
      "Sing songs of spiritual revival and holy hunger in your home."
    ],
    spiritualAtmosphere: "Holy Ghost Revival & Abundant Outpouring"
  },
  {
    id: "rhema-22-the-iron-gate-opening-of-its-own-accord",
    title: "The Iron Gate Opening of Its Own Accord",
    seasonCategory: "Open Doors",
    propheticDeclaration: "The heavy barriers of resistance will not require human crowbars; they shall open of their own accord by the breath of God.",
    nowWordText: "The Almighty says: When Peter was bound between two soldiers in the inner prison, prayer was made without ceasing by the church. As they walked toward the iron gate leading into the city, it opened to them of its own accord! The insurmountable gate blocking your promotion, visa, health, or breakthrough is swinging open right now!",
    scriptureAnchor: {
      reference: "Acts 12:10 (KJV)",
      text: "When they were past the first and the second ward, they came unto the iron gate that leadeth unto the city; which opened to them of his own accord: and they went out."
    },
    actionCommandment: "Walk forward with confidence. Do not stop at the first obstacle; step boldly up to the iron gate expecting divine intervention.",
    propheticDecree: "Every iron gate of limitation, poverty, sickness, and stagnation is opening of its own accord before me! The Lord goes before me to make crooked paths straight!",
    dailyActivationGuide: [
      "Praise God in advance for resolving complicated legal, career, or bureaucratic hurdles.",
      "Walk with your head high, knowing angels are clearing the pathway before you.",
      "Encourage someone facing an impossible barrier with this Scripture."
    ],
    spiritualAtmosphere: "Supernatural Breakthrough & Angelic Assistance"
  },
  {
    id: "rhema-23-the-stripes-that-healed-your-body",
    title: "By His Stripes You Were Healed: Divine Health Released",
    seasonCategory: "Healing & Restoration",
    propheticDeclaration: "Sickness has no legal jurisdiction over the purchased temple of the Holy Ghost.",
    nowWordText: "Thus saith the Lord your Healer (Jehovah Rapha): The punishment that brought your peace was upon Jesus, and with His stripes you are healed. I command every infirmity, pain, inflammation, cancer, virus, and disease to bow to the Name of Jesus. Life, vitality, and cellular renewal are flooding your mortal body!",
    scriptureAnchor: {
      reference: "1 Peter 2:24 (KJV)",
      text: "Who his own self bare our sins in his own body on the tree, that we, being dead to sins, should live unto righteousness: by whose stripes ye were healed."
    },
    actionCommandment: "Lay your hand upon the afflicted area of your body, speak the Name of Jesus, and command all sickness to depart immediately.",
    propheticDecree: "I am healed by the precious blood and stripes of Jesus Christ! No weapon of disease or infirmity formed against my body shall prosper!",
    dailyActivationGuide: [
      "Partake of the Holy Communion with thanksgiving for Christ's broken body and shed blood.",
      "Speak healing Scriptures aloud 3 times throughout the day.",
      "Take practical steps of health: hydrate, rest, and nourish your temple properly."
    ],
    spiritualAtmosphere: "Healing Anointing & Miraculous Wholeness"
  },
  {
    id: "rhema-24-the-armor-of-light-against-the-darkness",
    title: "Putting on the Armor of Light: Triumph Over Demonic Schemes",
    seasonCategory: "Spiritual Warfare",
    propheticDeclaration: "Greater is He that is in you than he that is in the world; every demonic trap is dismantled.",
    nowWordText: "The Captain of the Armies of Heaven says: Fear not the arrows that fly by day nor the pestilence that walks in darkness. I have given you authority to tread upon serpents and scorpions, and over all the power of the enemy, and nothing shall by any means hurt you. Put on the whole armor of God and stand victorious!",
    scriptureAnchor: {
      reference: "Romans 13:12 & Luke 10:19 (KJV)",
      text: "Let us therefore cast off the works of darkness, and let us put on the armour of light... Behold, I give unto you power to tread on serpents and scorpions."
    },
    actionCommandment: "Engage in vocal warfare prayer today. Plead the Blood of Jesus, bind the spirits of fear and infirmity, and loose heaven's peace.",
    propheticDecree: "I am clad in the armor of light! No demonic assignment against my destiny, my family, or my mind can stand. I am more than a conqueror through Christ!",
    dailyActivationGuide: [
      "Vocalize the Full Armor of God from Ephesians 6:10-18 over yourself.",
      "Anoint your residence with prayer and worship music.",
      "Refuse all fear, knowing 10,000 angels surround the righteous."
    ],
    spiritualAtmosphere: "Spiritual Warfare Mastery & Divine Protection"
  },
  {
    id: "rhema-25-the-birth-of-new-spiritual-dimensions",
    title: "Zion Bringing Forth: The Birthing of Your Prophetic Mandate",
    seasonCategory: "Transition",
    propheticDeclaration: "The labor pains of transition are ending; the glory of the new dimension is being birthed.",
    nowWordText: "The Lord of New Beginnings proclaims: Do not say 'I am only a youth' or 'it is too late for me.' Before Zion travailed, she brought forth; before her pain came, she was delivered of a man child! You are crossing over from preparation to manifestation. Step into your mantle with boldness, for I am with you always!",
    scriptureAnchor: {
      reference: "Isaiah 66:8 (KJV)",
      text: "Who hath heard such a thing? who hath seen such things? Shall the earth be made to bring forth in one day? or shall a nation be born at once? for as soon as Zion travailed, she brought forth her children."
    },
    actionCommandment: "Leave behind the garments of the old season. Step courageously into your new leadership or ministry calling.",
    propheticDecree: "I am stepping into the fullness of my prophetic assignment! The old season has passed, and all things have become new by the power of Jesus Christ!",
    dailyActivationGuide: [
      "Write down your vision and goals for the new season clearly (Habakkuk 2:2).",
      "Cut away old habits and comfort zones that held you back.",
      "Pray for the courage of Joshua and the wisdom of Solomon."
    ],
    spiritualAtmosphere: "Prophetic Transition & New Dimensional Elevation"
  },
  {
    id: "rhema-26-the-joy-that-swallows-all-affliction",
    title: "Joy Unspeakable: Swallowing the Valley of Weeping in Glory",
    seasonCategory: "Unspeakable Joy",
    propheticDeclaration: "Weeping may endure for a night, but joy comes in the morning—and your morning has dawned!",
    nowWordText: "The Prince of Peace says to you: Look up, for your redemption draweth nigh! The enemy intended for your joy to be extinguished, but I have planted within your spirit an incorruptible fountain of living rejoicing. Your laughter is returning, your song is being renewed, and your praise will shake the gates of hell!",
    scriptureAnchor: {
      reference: "1 Peter 1:8 (KJV)",
      text: "Whom having not seen, ye love; in whom, though now ye see him not, yet believing, ye rejoice with joy unspeakable and full of glory."
    },
    actionCommandment: "Burst into unashamed laughter and praise right now in the face of what was troubling you!",
    propheticDecree: "My joy cannot be stolen, corrupted, or dimmed! The joy of the Lord is my strength, my song, and my eternal victory!",
    dailyActivationGuide: [
      "Spend 5 minutes laughing in faith and praising Jesus for His finished work.",
      "Share an encouraging Scripture of rejoicing with a friend or colleague.",
      "Sing a new song of praise to the Lord."
    ],
    spiritualAtmosphere: "Unspeakable Joy & Radiant Glory"
  }
];

import { RHEMA_CATALOG_1000 } from "./rhemaCatalog1000";

// Comprehensive Catalog of 1,000 Prophetic Rhema Now Words for everyday spiritual victory,
// featuring the Author's 321 Favourite Scriptures with golden badges!
export const RHEMA_CATALOG: RhemaWordItem[] = RHEMA_CATALOG_1000;

// Dynamically compute seasons and counts from the catalog
export const RHEMA_SEASONS = [
  { id: "All", label: `All ${RHEMA_CATALOG.length} Revelations`, count: RHEMA_CATALOG.length },
  { id: "Author Favourites", label: `Author's Favourites (${RHEMA_CATALOG.filter((w) => w.isAuthorFavourite).length})`, count: RHEMA_CATALOG.filter((w) => w.isAuthorFavourite).length },
  ...Array.from(new Set(RHEMA_CATALOG.map((item) => item.seasonCategory))).map((season) => ({
    id: season,
    label: season,
    count: RHEMA_CATALOG.filter((item) => item.seasonCategory === season).length
  }))
];

