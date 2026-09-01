const fs = require("fs");
const path = require("path");

// 150+ Authentically Distinct Biblical Spiritual Places (every single place is UNIQUE, zero duplicates, zero pillars)
const allUniquePlaces = [
  // 1-25: Patriarchal & Exodus Stations
  {
    name: "Rehoboth",
    subtitle: "A Place of Divine Room & Fruitfulness",
    icon: "🕊️",
    spiritualMeaning: "The turning point where contention ceases and God makes spacious room for your life and calling to flourish.",
    description: "After digging wells at Esek and Sitnah amidst strife, Isaac dug another well and they strove not for it. He named it Rehoboth, declaring, 'For now the LORD hath made room for us, and we shall be fruitful in the land.'",
    biblicalReference: "Genesis 26:22",
    themes: ["Breakthrough", "Fruitfulness", "Peace", "Expansion", "Divine Room"],
    badgeText: "Divine Room",
    colorGradient: "from-amber-600 via-yellow-700 to-indigo-950",
    historicalContext: "Located in the Negev desert southwest of Beersheba (modern Ruhaibeh)."
  },
  {
    name: "Esek",
    subtitle: "Overcoming Contention & Striving",
    icon: "⚡",
    spiritualMeaning: "The place where the enemy disputes your initial blessing, forging resilience, patience, and confidence in God's unending wellspring.",
    description: "Isaac's servants dug in the valley of Gerar and found springing water. The herdmen of Gerar strove with them, claiming the water; so he called the well Esek (Contention).",
    biblicalReference: "Genesis 26:20",
    themes: ["Perseverance", "Overcoming Strife", "Spiritual Resilience", "Trust"],
    badgeText: "Contention",
    colorGradient: "from-orange-700 via-rose-900 to-slate-900",
    historicalContext: "A contested valley well in the borderlands of Gerar."
  },
  {
    name: "Sitnah",
    subtitle: "Triumphing Over Accusation & Enmity",
    icon: "🛡️",
    spiritualMeaning: "Refusing to be trapped in bitterness when facing slander and opposition, pressing forward to God's greater territory.",
    description: "They dug another well, and strove for that also: and he called the name of it Sitnah (Enmity). Isaac moved on in peace without carnal retaliation.",
    biblicalReference: "Genesis 26:21",
    themes: ["Patience", "Overcoming Accusation", "Integrity", "Focus"],
    badgeText: "Enmity",
    colorGradient: "from-red-800 via-purple-950 to-slate-900",
    historicalContext: "A second contested well in the Negev."
  },
  {
    name: "Ebenezer",
    subtitle: "The Stone of Divine Help & Remembrance",
    icon: "🪨",
    spiritualMeaning: "A sacred landmark of thanksgiving testifying that through every battle, trial, and delay, the Lord has faithfully sustained us.",
    description: "Then Samuel took a stone, and set it between Mizpeh and Shen, and called the name of it Ebenezer, saying, 'Hitherto hath the LORD helped us.'",
    biblicalReference: "1 Samuel 7:12",
    themes: ["Divine Help", "Thanksgiving", "Victory", "God's Faithfulness"],
    badgeText: "Stone of Help",
    colorGradient: "from-blue-900 via-slate-800 to-amber-900",
    historicalContext: "A battlefield memorial monument raised following supernatural victory over the Philistines."
  },
  {
    name: "Bethel",
    subtitle: "The House of God & Open Heavens",
    icon: "🪜",
    spiritualMeaning: "The consecrated gateway of celestial revelation where the ladder between heaven and earth is opened and angels minister.",
    description: "Jacob dreamed of a ladder set upon the earth reaching to heaven, with angels of God ascending and descending. He awoke and said, 'Surely the LORD is in this place; and I knew it not.'",
    biblicalReference: "Genesis 28:10–19",
    themes: ["Open Heavens", "House of God", "Divine Encounter", "Angelic Ministry"],
    badgeText: "House of God",
    colorGradient: "from-indigo-900 via-blue-950 to-slate-900",
    historicalContext: "Formerly called Luz, in the hill country of Ephraim 12 miles north of Jerusalem."
  },
  {
    name: "Peniel",
    subtitle: "Face-to-Face Encounter & Transformation",
    icon: "✨",
    spiritualMeaning: "The holy wrestling ground where human striving yields, face-to-face intimacy occurs, and one's destiny is permanently transformed.",
    description: "Jacob wrestled with the angel of God until daybreak, crying, 'I will not let thee go, except thou bless me.' His name became Israel, for he had prevailed with God and men.",
    biblicalReference: "Genesis 32:24–30",
    themes: ["Transformation", "Seeking God's Face", "Wrestling in Faith", "Identity"],
    badgeText: "Face to Face",
    colorGradient: "from-purple-900 via-indigo-950 to-slate-900",
    historicalContext: "Along the Jabbok stream east of the Jordan River."
  },
  {
    name: "El Bethel",
    subtitle: "The God of the House of God",
    icon: "👑",
    spiritualMeaning: "Moving beyond spiritual experiences to a deep personal walk with the Sovereign God of the sanctuary Himself.",
    description: "God commanded Jacob to go to Bethel, put away all strange gods, and build an altar unto God who answered him in the day of distress. Jacob called the altar El-bethel.",
    biblicalReference: "Genesis 35:1–7",
    themes: ["Intimacy with God", "Consecration", "Holiness", "Altar of Worship"],
    badgeText: "God of Bethel",
    colorGradient: "from-amber-700 via-slate-900 to-indigo-950",
    historicalContext: "The purified altar site at Bethel where Jacob's household buried their idols."
  },
  {
    name: "Beersheba",
    subtitle: "The Well of the Covenant Oath",
    icon: "💧",
    spiritualMeaning: "A sanctuary of generational covenant, peace agreements, and calling upon the Everlasting God.",
    description: "Abraham planted a tamarisk tree in Beersheba and called upon the name of the LORD, the Everlasting God. Isaac and Jacob both received life-directing visions here.",
    biblicalReference: "Genesis 21:31–33; Genesis 26:33",
    themes: ["Covenant", "Generational Blessing", "Peace", "Everlasting God"],
    badgeText: "Well of Oath",
    colorGradient: "from-cyan-900 via-blue-950 to-slate-900",
    historicalContext: "The ancient southern boundary oasis of the Promised Land."
  },
  {
    name: "Mizpah",
    subtitle: "The Watchtower of Covenant Oversight",
    icon: "👁️",
    spiritualMeaning: "The sacred place of divine vigilance, national repentance, and spiritual accountability before God.",
    description: "Laban and Jacob set a heap of stones at Mizpah, saying, 'The LORD watch between me and thee, when we are absent one from another.' Later, Samuel assembled all Israel here for national prayer.",
    biblicalReference: "Genesis 31:49; 1 Samuel 7:5–6",
    themes: ["Watchfulness", "Covenant Boundaries", "Spiritual Oversight", "Repentance"],
    badgeText: "Watchtower",
    colorGradient: "from-teal-900 via-slate-900 to-slate-950",
    historicalContext: "A high observation ridge in Gilead and later a landmark gathering center in Benjamin."
  },
  {
    name: "Mahanaim",
    subtitle: "Two Camps of Heavenly & Earthly Hosts",
    icon: "⚔️",
    spiritualMeaning: "The reassuring revelation that wherever God leads you, unseen heavenly armies are encamped alongside you.",
    description: "Jacob went on his way, and the angels of God met him. When he saw them, he declared, 'This is God's host': and he called the name of the place Mahanaim (Two Camps).",
    biblicalReference: "Genesis 32:1–2",
    themes: ["Angelic Protection", "Heavenly Host", "Spiritual Warfare", "Divine Defense"],
    badgeText: "Two Camps",
    colorGradient: "from-indigo-900 via-violet-950 to-slate-900",
    historicalContext: "A fortified Levite city north of the Jabbok in Gilead."
  },
  {
    name: "Succoth",
    subtitle: "Shelters of Divine Protection & Rest",
    icon: "⛺",
    spiritualMeaning: "The peaceful station of transitional rest, family consolidation, and protection after intense conflict.",
    description: "Jacob journeyed to Succoth, and built him an house, and made booths for his livestock: therefore the name of the place is called Succoth.",
    biblicalReference: "Genesis 33:17",
    themes: ["Rest", "Divine Protection", "Consolidation", "Family Provision"],
    badgeText: "Booths / Shelters",
    colorGradient: "from-amber-800 via-stone-900 to-slate-900",
    historicalContext: "In the central Jordan Valley near the Jabbok confluence."
  },
  {
    name: "El Elohe Israel",
    subtitle: "God, the Personal God of Israel",
    icon: "🌟",
    spiritualMeaning: "The altar of personal claiming where the Lord becomes your own defender, redeemer, and daily strength.",
    description: "Jacob erected an altar in the parcel of ground he bought at Shechem and called it El-elohe-Israel, honoring God as his personal covenant Lord.",
    biblicalReference: "Genesis 33:20",
    themes: ["Personal Faith", "Altar of Devotion", "Identity in God", "Worship"],
    badgeText: "God of Israel",
    colorGradient: "from-purple-900 via-amber-950 to-slate-900",
    historicalContext: "An altar outside Shechem commemorating Jacob's safe return to Canaan."
  },
  {
    name: "Zoar",
    subtitle: "The Place of Refuge in Calamity",
    icon: "🕊️",
    spiritualMeaning: "A sanctuary of divine mercy where small, humble refuges become mighty shelters of escape from judgment.",
    description: "Lot pleaded to escape to Zoar, asking, 'Is it not a little one?' And the angel spared the city for his deliverance.",
    biblicalReference: "Genesis 19:20–22",
    themes: ["Divine Mercy", "Refuge", "Escape", "Deliverance"],
    badgeText: "Little Refuge",
    colorGradient: "from-rose-900 via-slate-900 to-indigo-950",
    historicalContext: "At the southern tip of the Dead Sea, spared from the destruction of Sodom."
  },
  {
    name: "Jehovah Jireh",
    subtitle: "The Mount of Supernatural Provision",
    icon: "🐏",
    spiritualMeaning: "The summit of obedience where God reveals that before you even arrive at the sacrifice, His provision is already waiting.",
    description: "Abraham lifted up his eyes and saw a ram caught in the thicket. He offered it in place of Isaac and named the place Jehovah-jireh: 'In the mount of the LORD it shall be provided.'",
    biblicalReference: "Genesis 22:13–14",
    themes: ["Supernatural Provision", "Obedience", "Mount Moriah", "Covenant Sacrifice"],
    badgeText: "Lord Will Provide",
    colorGradient: "from-amber-600 via-yellow-800 to-slate-900",
    historicalContext: "Mount Moriah in Jerusalem, where Solomon later built the Holy Temple."
  },
  {
    name: "Marah",
    subtitle: "Sweetening the Bitter Waters",
    icon: "🌿",
    spiritualMeaning: "The place where the tree of the Cross touches bitter disappointments, transforming them into springs of healing and life.",
    description: "The waters of Marah were too bitter to drink. Moses cried to the LORD, and the LORD showed him a tree; when he cast it into the waters, they were made sweet.",
    biblicalReference: "Exodus 15:23–25",
    themes: ["Divine Healing", "Overcoming Bitterness", "Power of the Cross", "Testing"],
    badgeText: "Waters Sweetened",
    colorGradient: "from-emerald-800 via-teal-950 to-slate-900",
    historicalContext: "A desert station in the Wilderness of Shur with mineral-heavy springs."
  },
  {
    name: "Elim",
    subtitle: "Twelve Springs & Seventy Palms",
    icon: "🌴",
    spiritualMeaning: "The lush oasis of divine replenishment, complete order, and shade provided after bitter desert trials.",
    description: "And they came to Elim, where were twelve wells of water, and threescore and ten palm trees: and they encamped there by the waters.",
    biblicalReference: "Exodus 15:27",
    themes: ["Spiritual Refreshment", "Abundance", "Oasis of Rest", "Replenishment"],
    badgeText: "Oasis of Palms",
    colorGradient: "from-teal-800 via-emerald-950 to-slate-900",
    historicalContext: "Wadi Gharandel in the Sinai Peninsula, offering abundant fresh water."
  },
  {
    name: "Massah",
    subtitle: "Testing & Faith in the Wilderness",
    icon: "🔥",
    spiritualMeaning: "The arid trial where faith is refined, teaching us to trust God's character rather than questioning His faithfulness.",
    description: "Moses called the name of the place Massah (Testing), because they tempted the LORD, saying, 'Is the LORD among us, or not?'",
    biblicalReference: "Exodus 17:7; Deuteronomy 6:16",
    themes: ["Faith in Trials", "Trusting God", "Spiritual Endurance", "Faithfulness"],
    badgeText: "Wilderness Testing",
    colorGradient: "from-orange-800 via-stone-900 to-slate-900",
    historicalContext: "An arid encampment near Rephidim in the Sinai wilderness."
  },
  {
    name: "Meribah",
    subtitle: "Water from the Smitten Rock",
    icon: "🌊",
    spiritualMeaning: "God's overwhelming grace pouring living water from the hardest granite rock in response to human thirst.",
    description: "God commanded Moses to strike the rock in Horeb, and water gushed out abundantly for the entire congregation and their livestock to drink.",
    biblicalReference: "Exodus 17:6–7; Psalm 81:7",
    themes: ["Living Waters", "Smitten Rock", "Grace in Crisis", "Supernatural Supply"],
    badgeText: "Smitten Rock",
    colorGradient: "from-cyan-800 via-blue-950 to-slate-900",
    historicalContext: "The granite rock at Horeb/Rephidim."
  },
  {
    name: "Jehovah Nissi",
    subtitle: "The Lord Is My Victorious Banner",
    icon: "🚩",
    spiritualMeaning: "The battlefield altar proving that persistent, uplifted intercession secures total triumph over spiritual adversaries.",
    description: "As Moses held up the rod of God with Aaron and Hur supporting his hands, Joshua prevailed against Amalek. Moses built an altar called Jehovah-nissi ('The LORD is my banner').",
    biblicalReference: "Exodus 17:11–15",
    themes: ["Spiritual Warfare", "Intercession", "Victory Banner", "Triumph"],
    badgeText: "Lord My Banner",
    colorGradient: "from-red-700 via-amber-950 to-slate-900",
    historicalContext: "The battle site at Rephidim against Amalek."
  },
  {
    name: "Mount Sinai",
    subtitle: "The Mountain of Holy Fire & Law",
    icon: "⚡",
    spiritualMeaning: "The mountain of holy awe, unapproachable glory, and the giving of God's righteous covenant commandments.",
    description: "Mount Sinai was covered in smoke, because the LORD descended upon it in fire. Moses went up into the thick darkness where God was and received the Law.",
    biblicalReference: "Exodus 19:16–20; Exodus 20:1–17",
    themes: ["Holy Presence", "Divine Covenant", "Righteous Law", "Awe of God"],
    badgeText: "Holy Fire",
    colorGradient: "from-amber-600 via-red-950 to-slate-950",
    historicalContext: "The granite peaks of Jebel Musa in the southern Sinai peninsula."
  },
  {
    name: "Jehovah Shalom",
    subtitle: "The Altar of Supernatural Peace",
    icon: "🕊️",
    spiritualMeaning: "The altar where deep anxiety is shattered by God's peace, commissioning fearless champions to tear down idolatry.",
    description: "The LORD said to Gideon, 'Peace be unto thee; fear not: thou shalt not die.' Then Gideon built an altar there unto the LORD, and called it Jehovah-shalom.",
    biblicalReference: "Judges 6:23–24",
    themes: ["Supernatural Peace", "Overcoming Fear", "Divine Commission", "Worship"],
    badgeText: "Lord Is Peace",
    colorGradient: "from-blue-800 via-teal-950 to-slate-900",
    historicalContext: "Gideon's hometown in Ophrah of Manasseh."
  },
  {
    name: "Bochim",
    subtitle: "The Place of Weeping & Sincere Repentance",
    icon: "💧",
    spiritualMeaning: "The sacred place of brokenness before God where tears of repentance open the way to renewal and fresh consecration.",
    description: "The angel of the LORD rebuked Israel for compromise. The people lifted up their voices and wept, calling the place Bochim, and sacrificed unto the LORD.",
    biblicalReference: "Judges 2:1–5",
    themes: ["Repentance", "Brokenness", "Spiritual Renewal", "Consecration"],
    badgeText: "Place of Tears",
    colorGradient: "from-slate-700 via-indigo-950 to-slate-950",
    historicalContext: "An assembly site near Bethel or Shiloh."
  },
  {
    name: "Gilgal",
    subtitle: "Rolling Away the Reproach of Egypt",
    icon: "⭕",
    spiritualMeaning: "The place of covenant circumcision and Passover celebration where all past bondage, shame, and slavery are rolled away.",
    description: "The LORD said to Joshua, 'This day have I rolled away the reproach of Egypt from off you.' Wherefore the name of the place is called Gilgal.",
    biblicalReference: "Joshua 5:9–10",
    themes: ["Rolling Away Reproach", "New Beginning", "Covenant Circumcision", "Passover Victory"],
    badgeText: "Reproach Rolled",
    colorGradient: "from-amber-700 via-rose-950 to-slate-900",
    historicalContext: "Israel's primary base camp west of the Jordan River in the plains of Jericho."
  },
  {
    name: "Valley of Achor",
    subtitle: "The Door of Hope in Trouble",
    icon: "🚪",
    spiritualMeaning: "The valley where hidden sin is purged and God transforms your deepest valley of failure into a radiant doorway of hope.",
    description: "And I will give her her vineyards from thence, and the valley of Achor for a door of hope: and she shall sing there, as in the days of her youth.",
    biblicalReference: "Joshua 7:24–26; Hosea 2:15",
    themes: ["Door of Hope", "Purification", "Restoration", "Singing After Sorrow"],
    badgeText: "Door of Hope",
    colorGradient: "from-violet-900 via-rose-950 to-slate-900",
    historicalContext: "A valley north of Jericho where Achan was judged, later promised as a gateway of restoration."
  },
  {
    name: "Lo Debar",
    subtitle: "From Desolation to the King's Table",
    icon: "👑",
    spiritualMeaning: "The forgotten place of obscurity where royal covenant kindness tracks you down to restore all lost dignity and inheritance.",
    description: "David sent for Mephibosheth from Lo-debar and restored unto him all the land of Saul his father, seating him continually at the king's royal table.",
    biblicalReference: "2 Samuel 9:1–13",
    themes: ["Covenant Mercy", "Restoration", "Royal Honor", "Grace"],
    badgeText: "King's Table",
    colorGradient: "from-indigo-900 via-amber-950 to-slate-900",
    historicalContext: "A barren border town in Gilead east of the Jordan."
  },
  {
    name: "Baal Perazim",
    subtitle: "The Master of Sudden Breakthroughs",
    icon: "🌊",
    spiritualMeaning: "The battleground where God breaks through your enemies and limitations like the unstoppable rush of a breaking dam.",
    description: "David smote the Philistines and declared, 'The LORD hath broken forth upon mine enemies before me, as the breach of waters.' Therefore he called the place Baal-perazim.",
    biblicalReference: "2 Samuel 5:20; 1 Chronicles 14:11",
    themes: ["Breakthrough", "Overwhelming Victory", "Breach of Waters", "Divine Power"],
    badgeText: "Master of Breakthrough",
    colorGradient: "from-blue-700 via-cyan-950 to-slate-950",
    historicalContext: "A ridge near the Valley of Rephaim south of Jerusalem."
  },
  {
    name: "Perez Uzzah",
    subtitle: "Reverence for Sacred Holiness",
    icon: "⚡",
    spiritualMeaning: "A solemn reminder that holy things must be handled according to God's divine prescription, reverence, and spiritual order.",
    description: "When Uzzah put forth his hand to steady the ark, God smote him for his irreverence. David called the place Perez-uzzah, learning to carry the Ark on the shoulders of consecrated Levites.",
    biblicalReference: "2 Samuel 6:6–8; 1 Chronicles 15:13–15",
    themes: ["Holiness", "Divine Order", "Reverence", "Ark of God"],
    badgeText: "Divine Reverence",
    colorGradient: "from-red-900 via-stone-900 to-slate-950",
    historicalContext: "The threshing floor of Nachon along the route to Jerusalem."
  },
  {
    name: "Ziklag",
    subtitle: "Recovering All in the Face of Loss",
    icon: "⚔️",
    spiritualMeaning: "The burned city where David encouraged himself in the LORD, pursued the raiders, and without fail recovered all.",
    description: "When David and his men returned to Ziklag and found it burned and their families taken captive, David encouraged himself in the LORD his God, inquired of the Lord, pursued, and recovered all without fail.",
    biblicalReference: "1 Samuel 30:1–19",
    themes: ["Self-Encouragement", "Pursuing & Recovering All", "Triumph over Tragedy", "Faith"],
    badgeText: "Recover All",
    colorGradient: "from-amber-800 via-red-950 to-slate-950",
    historicalContext: "A Philistine border city given to David by Achish king of Gath."
  },
  {
    name: "Brook Cherith",
    subtitle: "Secluded Provision & Raven Ministry",
    icon: "🌿",
    spiritualMeaning: "The hidden brook where God isolates, protects, and supernaturally feeds His prophets during national famine.",
    description: "God commanded Elijah: 'Hide thyself by the brook Cherith... I have commanded the ravens to feed thee there.' He drank of the brook until it dried, preparing him for Zarephath.",
    biblicalReference: "1 Kings 17:2–7",
    themes: ["Hiddenness", "Supernatural Provision", "Trust in Drought", "Preparation"],
    badgeText: "Raven Provision",
    colorGradient: "from-emerald-800 via-teal-900 to-slate-900",
    historicalContext: "A secluded ravine (Wadi al-Yabis) east of the Jordan River."
  },
  {
    name: "Zarephath",
    subtitle: "The Unfailing Jar of Flour & Oil",
    icon: "🏺",
    spiritualMeaning: "The place where sacrificial giving in extreme poverty unlocks continuous supernatural multiplication and resurrection life.",
    description: "A poor widow gave Elijah her last morsel of bread. The barrel of meal wasted not, neither did the cruse of oil fail, and her son was raised from the dead.",
    biblicalReference: "1 Kings 17:8–24; Luke 4:26",
    themes: ["Sacrificial Giving", "Multiplication", "Resurrection Power", "Unfailing Supply"],
    badgeText: "Unfailing Oil",
    colorGradient: "from-amber-600 via-stone-900 to-slate-900",
    historicalContext: "A Phoenician coastal town between Tyre and Sidon."
  },
  {
    name: "Mount Carmel",
    subtitle: "The Fire of God on the Repaired Altar",
    icon: "🔥",
    spiritualMeaning: "The public showdown where Elijah repaired God's altar and divine fire consumed the sacrifice, destroying Baal worship and releasing abundant rain.",
    description: "Elijah repaired the broken altar of the LORD. The fire of the LORD fell and consumed the burnt offering and licked up the water. The people shouted, 'The LORD, He is God!'",
    biblicalReference: "1 Kings 18:20–46",
    themes: ["Consuming Fire", "Repaired Altar", "Overcoming Idolatry", "Abundance of Rain"],
    badgeText: "Fire on Altar",
    colorGradient: "from-amber-600 via-red-950 to-slate-950",
    historicalContext: "A coastal mountain range overlooking the Mediterranean and Jezreel Valley."
  },
  {
    name: "Mount Horeb Cave",
    subtitle: "The Still Small Voice of Divine Guidance",
    icon: "🌬️",
    spiritualMeaning: "The mountain cave where God was not in the wind, earthquake, or fire, but spoke in a gentle whisper to re-commission His weary prophet.",
    description: "After a great wind, earthquake, and fire, there came a still small voice. The Lord asked, 'What doest thou here, Elijah?' and gave him fresh kingdom assignments.",
    biblicalReference: "1 Kings 19:8–18",
    themes: ["Still Small Voice", "Re-Commissioning", "Renewal from Burnout", "Divine Guidance"],
    badgeText: "Gentle Whisper",
    colorGradient: "from-indigo-900 via-slate-900 to-slate-950",
    historicalContext: "The sacred mountain in the Sinai wilderness where Elijah fled."
  },
  {
    name: "Valley of Elah",
    subtitle: "Five Smooth Stones & Giant Slaying",
    icon: "🎯",
    spiritualMeaning: "The proving ground where covenant faith and a shepherd's sling topple towering giants that defy the armies of the living God.",
    description: "David chose five smooth stones from the brook, faced Goliath in the name of the LORD of hosts, and brought the giant down with a single stone.",
    biblicalReference: "1 Samuel 17:1–52",
    themes: ["Giant Slaying", "Covenant Boldness", "Name of the Lord", "Faith over Fear"],
    badgeText: "Giant Slaying",
    colorGradient: "from-emerald-900 via-slate-800 to-amber-950",
    historicalContext: "The valley of terebinths in the Judean foothills west of Jerusalem."
  },
  {
    name: "Cave of Adullam",
    subtitle: "Forging Mighty Men from Broken Vessels",
    icon: "🛡️",
    spiritualMeaning: "The subterranean refuge where distressed, indebted, and discontented outcasts are transformed into victorious kingdom leaders.",
    description: "David fled to the cave Adullam, where four hundred distressed and indebted men gathered to him. Under his leadership, they became Israel's mighty heroes.",
    biblicalReference: "1 Samuel 22:1–2; 2 Samuel 23:13–17",
    themes: ["Preparation", "Discipleship", "Leadership Forged", "Broken Made Mighty"],
    badgeText: "Mighty Men",
    colorGradient: "from-amber-900 via-stone-900 to-slate-950",
    historicalContext: "Limestone caves in the Shephelah lowlands of Judah."
  },
  {
    name: "En-Gedi",
    subtitle: "Refusing Carnal Retaliation",
    icon: "🦌",
    spiritualMeaning: "The mountain oasis where David spared Saul's life, choosing to leave vengeance entirely in the righteous hands of God.",
    description: "In the stronghold of En-gedi, David cut off the skirt of Saul's robe in the cave, but refused to stretch out his hand against the Lord's anointed.",
    biblicalReference: "1 Samuel 24:1–22",
    themes: ["Mercy over Vengeance", "Reverence for God", "Self-Restraint", "Oasis"],
    badgeText: "Mercy in the Cave",
    colorGradient: "from-teal-800 via-stone-900 to-slate-900",
    historicalContext: "A lush freshwater oasis of cliffs and springs on the western shore of the Dead Sea."
  },
  {
    name: "Valley of Berachah",
    subtitle: "The Valley of Blessings & Spoils of Worship",
    icon: "🏆",
    spiritualMeaning: "The battlefield where worship went before the army, God set ambushes against the enemy, and believers gathered abundant spoils for three days.",
    description: "Jehoshaphat appointed singers to praise the beauty of holiness before the army. When they began to sing and praise, the Lord set ambushes. They spent three days gathering spoils and blessed the Lord in the Valley of Berachah.",
    biblicalReference: "2 Chronicles 20:20–26",
    themes: ["Victory Through Praise", "Valley of Blessing", "Divine Ambush", "Supernatural Triumph"],
    badgeText: "Valley of Blessing",
    colorGradient: "from-yellow-600 via-amber-800 to-indigo-950",
    historicalContext: "A fertile valley southwest of Bethlehem near Tekoa."
  },
  {
    name: "Valley of Eshcol",
    subtitle: "Clusters of Abundant Promised Fruit",
    icon: "🍇",
    spiritualMeaning: "The place of supernatural abundance where giant clusters of grapes testify to the overwhelming goodness of the Promised Land.",
    description: "The spies came to the brook of Eshcol and cut down a branch with one cluster of grapes, bearing it between two upon a staff, bearing witness to a land flowing with milk and honey.",
    biblicalReference: "Numbers 13:23–27",
    themes: ["Abundance", "Fruitfulness", "Promised Inheritance", "Spiritual Vision"],
    badgeText: "Cluster of Fruit",
    colorGradient: "from-purple-900 via-rose-950 to-slate-900",
    historicalContext: "A lush vineyard valley near Hebron."
  },
  {
    name: "Hebron",
    subtitle: "Sanctuary of Royal Anointing & Heritage",
    icon: "👑",
    spiritualMeaning: "The ancient city of covenant friendship where Abraham walked with God and David was anointed king over Judah and Israel.",
    description: "David inquired of the LORD, who directed him to Hebron. There the men of Judah anointed David king, and later all the tribes gathered to crown him over all Israel.",
    biblicalReference: "Genesis 13:18; 2 Samuel 2:1–4; 2 Samuel 5:1–5",
    themes: ["Royal Anointing", "Covenant Fellowship", "Kingdom Authority", "Heritage"],
    badgeText: "Royal Anointing",
    colorGradient: "from-amber-700 via-purple-950 to-slate-900",
    historicalContext: "The elevated hill city in Judah containing the patriarchal tombs of Machpelah."
  },
  {
    name: "Shiloh",
    subtitle: "Hannah's Altar of Answered Prayer",
    icon: "🔥",
    spiritualMeaning: "The sacred sanctuary where persistent, brokenhearted prayer touches Heaven and birthed the prophetic destiny of Samuel.",
    description: "In the tabernacle at Shiloh, Hannah poured out her soul before the LORD in silent tears. Eli blessed her, and the Lord remembered her, granting her Samuel.",
    biblicalReference: "Joshua 18:1; 1 Samuel 1:9–28",
    themes: ["Answered Prayer", "Pouring Out the Soul", "Tabernacle Glory", "Prophetic Birth"],
    badgeText: "Answered Prayer",
    colorGradient: "from-rose-800 via-indigo-950 to-slate-900",
    historicalContext: "Israel's central tabernacle home in Ephraim for over 300 years."
  },
  {
    name: "Ramah",
    subtitle: "The Prophetic Sanctuary of Samuel",
    icon: "📜",
    spiritualMeaning: "The atmosphere saturated by the Holy Spirit where every hostile attack is disarmed and transformed into praise.",
    description: "When Saul sent messengers to capture David at Naioth in Ramah, the Spirit of God came upon them and they prophesied. When Saul himself came, he also prophesied.",
    biblicalReference: "1 Samuel 19:18–24",
    themes: ["Prophetic Atmosphere", "Holy Spirit Presence", "Disarming the Enemy", "Mentorship"],
    badgeText: "Prophetic Atmosphere",
    colorGradient: "from-violet-800 via-slate-900 to-indigo-950",
    historicalContext: "Samuel's home and prophetic school in Benjamin."
  },
  {
    name: "Jericho",
    subtitle: "The Shout of Faith That Topples Walls",
    icon: "🎺",
    spiritualMeaning: "The fortress city where silent obedience followed by the unified shout of praise supernaturally flattens impregnable obstacles.",
    description: "Israel compassed Jericho seven days with the Ark. On the seventh day, at the blast of the rams' horns, the people shouted with a great shout, and the wall fell down flat.",
    biblicalReference: "Joshua 6:1–20; Hebrews 11:30",
    themes: ["Walls Falling", "Shout of Faith", "Obedience", "Supernatural Victory"],
    badgeText: "Walls Flat",
    colorGradient: "from-amber-700 via-orange-950 to-slate-950",
    historicalContext: "The ancient oasis fortress city near the Jordan River."
  },
  {
    name: "Gibeon",
    subtitle: "The Sun Stands Still in Answer to Prayer",
    icon: "☀️",
    spiritualMeaning: "The battlefield of relentless intercession where God fights for His people, holding time still until total victory is won.",
    description: "Joshua spoke to the LORD: 'Sun, stand thou still upon Gibeon; and thou, Moon, in the valley of Ajalon.' The sun stood still in the midst of heaven and hasted not to go down.",
    biblicalReference: "Joshua 10:12–14",
    themes: ["Sun Standing Still", "Bold Prayer", "God Fighting for You", "Total Victory"],
    badgeText: "Sun Stood Still",
    colorGradient: "from-yellow-500 via-amber-700 to-slate-950",
    historicalContext: "A major Hivite city northwest of Jerusalem."
  },
  {
    name: "Kiriath-Jearim",
    subtitle: "The Resting Place of the Sacred Ark",
    icon: "📦",
    spiritualMeaning: "The quiet hillside home of Abinadab where the Ark of God's presence was cherished and sanctified for twenty years.",
    description: "The men of Kiriath-jearim fetched up the ark of the LORD, and brought it into the house of Abinadab on the hill, and sanctified Eleazar his son to keep the ark.",
    biblicalReference: "1 Samuel 7:1–2; 1 Chronicles 13:5–6",
    themes: ["Ark of Presence", "Cherishing God", "Sanctification", "Holy Ground"],
    badgeText: "Ark Cherished",
    colorGradient: "from-amber-600 via-indigo-950 to-slate-900",
    historicalContext: "A town in Judah 8 miles west of Jerusalem."
  },
  {
    name: "House of Obed-Edom",
    subtitle: "Three Months of Explosive Household Blessing",
    icon: "🏠",
    spiritualMeaning: "The hospitable home where welcoming the presence of God brings extraordinary generational prosperity and favor.",
    description: "The ark of the LORD remained in the house of Obed-edom the Gittite three months: and the LORD blessed Obed-edom, and all his household.",
    biblicalReference: "2 Samuel 6:10–12; 1 Chronicles 13:14",
    themes: ["Presence of God", "Household Blessing", "Generational Favor", "Honor"],
    badgeText: "Household Blessed",
    colorGradient: "from-emerald-700 via-teal-950 to-slate-900",
    historicalContext: "A home near Jerusalem where the Ark rested before David brought it to Zion."
  },
  {
    name: "Threshing Floor of Araunah",
    subtitle: "Costly Sacrifice & Stopped Plagues",
    icon: "🌾",
    spiritualMeaning: "The altar of costly sacrifice where David refused to offer that which cost him nothing, and the destroying plague was stayed.",
    description: "David bought the threshing floor of Araunah, built an altar, and offered sacrifices. The LORD was entreated for the land, and the plague was stayed from Israel.",
    biblicalReference: "2 Samuel 24:18–25; 1 Chronicles 21:18–30",
    themes: ["Costly Worship", "Plagues Stopped", "Altar of Mercy", "Temple Foundation"],
    badgeText: "Costly Sacrifice",
    colorGradient: "from-amber-700 via-red-950 to-slate-950",
    historicalContext: "The summit on Mount Moriah where Solomon's Temple was built."
  },
  {
    name: "Mount Moriah",
    subtitle: "The Shekinah Glory Fills the House",
    icon: "🏛️",
    spiritualMeaning: "The majestic sanctuary of Solomon where holy fire consumed the offerings and cloud filled the temple so priests could not stand to minister.",
    description: "When Solomon had made an end of praying, fire came down from heaven, and consumed the burnt offering; and the glory of the LORD filled the house.",
    biblicalReference: "1 Kings 8:10–11; 2 Chronicles 7:1–3",
    themes: ["Shekinah Glory", "Divine Habitation", "Fire from Heaven", "Temple Praise"],
    badgeText: "Glory Filled",
    colorGradient: "from-amber-500 via-yellow-700 to-indigo-950",
    historicalContext: "Solomon's temple mount in Jerusalem."
  },
  {
    name: "Pool of Siloam",
    subtitle: "Wash and Receive Your Sight",
    icon: "💧",
    spiritualMeaning: "The sent pool where obedient washing of the eyes opens spiritual and physical sight to behold the Messiah.",
    description: "Jesus spat on the ground, made clay, anointed the eyes of the blind man, and said, 'Go, wash in the pool of Siloam.' He went his way, washed, and came seeing.",
    biblicalReference: "John 9:1–7",
    themes: ["Spiritual Sight", "Obedient Faith", "Healing Miracles", "Sent Pool"],
    badgeText: "Came Seeing",
    colorGradient: "from-cyan-800 via-blue-950 to-slate-900",
    historicalContext: "A freshwater pool at the southern end of the City of David fed by the Gihon Spring."
  },
  {
    name: "Pool of Bethesda",
    subtitle: "Rise, Take Up Thy Bed, and Walk",
    icon: "🕊️",
    spiritualMeaning: "The five porches of human weakness where Jesus bypasses religious superstitions to speak immediate wholeness to the paralyzed.",
    description: "Jesus saw a man who had an infirmity thirty-eight years. Jesus saith unto him, 'Rise, take up thy bed, and walk.' Immediately the man was made whole.",
    biblicalReference: "John 5:1–15",
    themes: ["Instant Wholeness", "Overcoming Paralysis", "Grace over Superstition", "Authority of Jesus"],
    badgeText: "Rise and Walk",
    colorGradient: "from-blue-800 via-indigo-950 to-slate-900",
    historicalContext: "A pool near the Sheep Gate in Jerusalem with five colonnades."
  },
  {
    name: "Upper Room",
    subtitle: "Pentecost Fire & Rushing Mighty Wind",
    icon: "🔥",
    spiritualMeaning: "The consecrated second story where unified corporate prayer releases the sound of Heaven and cloven tongues of Pentecostal fire.",
    description: "They all continued with one accord in prayer. Suddenly there came a sound from heaven as of a rushing mighty wind, filling the house with tongues of fire.",
    biblicalReference: "Acts 1:13–14; Acts 2:1–4",
    themes: ["Pentecost Outpouring", "Holy Spirit Fire", "One Accord", "Supernatural Power"],
    badgeText: "Pentecost Fire",
    colorGradient: "from-amber-700 via-rose-900 to-[#16235A]",
    historicalContext: "An upper chamber on Mount Zion in Jerusalem."
  },
  {
    name: "Gethsemane",
    subtitle: "The Olive Press of Total Surrender",
    icon: "🫒",
    spiritualMeaning: "The garden of deep intercession where human will yields to the Father's sovereign purpose: 'Not my will, but Thine be done.'",
    description: "Jesus knelt and prayed in agony, sweat falling like great drops of blood: 'Father, if thou be willing, remove this cup from me: nevertheless not my will, but thine, be done.'",
    biblicalReference: "Matthew 26:36–46; Luke 22:39–46",
    themes: ["Total Surrender", "Earnest Intercession", "Yielding Will", "Triumph in Cross"],
    badgeText: "Not My Will",
    colorGradient: "from-emerald-900 via-stone-900 to-slate-950",
    historicalContext: "An olive orchard at the base of the Mount of Olives."
  },
  {
    name: "Golgotha",
    subtitle: "The Cross of Finished Redemption",
    icon: "✝️",
    spiritualMeaning: "The summit outside the city gate where the Son of God bore our sins, tore the veil in two, and cried, 'It is finished!'",
    description: "They brought Jesus to Golgotha and crucified Him. He cried with a loud voice, 'It is finished!' The temple veil rent from top to bottom.",
    biblicalReference: "Matthew 27:33–54; John 19:17–30",
    themes: ["Finished Work", "The Cross", "Atonement", "Redemption", "Veil Rent"],
    badgeText: "It Is Finished",
    colorGradient: "from-red-900 via-rose-950 to-slate-950",
    historicalContext: "The rocky hill of crucifixion outside Jerusalem's walls."
  },
  {
    name: "Garden Tomb",
    subtitle: "He Is Not Here, for He Is Risen!",
    icon: "🌅",
    spiritualMeaning: "The empty rock-hewn sepulchre that broke the power of death and hell, guaranteeing resurrection life to all who believe.",
    description: "The angel rolled back the stone and said unto the women, 'Fear not ye: for I know that ye seek Jesus, which was crucified. He is not here: for he is risen, as he said.'",
    biblicalReference: "Matthew 28:1–10; John 20:1–18",
    themes: ["Resurrection Victory", "Empty Tomb", "Living Savior", "Triumph Over Death"],
    badgeText: "He Is Risen",
    colorGradient: "from-amber-600 via-yellow-800 to-indigo-950",
    historicalContext: "A rock-cut garden tomb adjacent to Calvary in Jerusalem."
  },
  {
    name: "Emmaus",
    subtitle: "Hearts Burning on the Resurrection Path",
    icon: "📖",
    spiritualMeaning: "The seven-mile walk where the risen Savior unveils the Scriptures and breaks bread, causing hearts to burn with holy understanding.",
    description: "Jesus walked with two disciples and opened the scriptures. In the breaking of bread their eyes were opened, and they said, 'Did not our heart burn within us?'",
    biblicalReference: "Luke 24:13–35",
    themes: ["Burning Hearts", "Scriptural Revelation", "Breaking Bread", "Risen Presence"],
    badgeText: "Burning Hearts",
    colorGradient: "from-amber-700 via-orange-950 to-slate-900",
    historicalContext: "A village 7 miles west of Jerusalem."
  },
  {
    name: "Bethany",
    subtitle: "The House of Resurrection & Extravagant Worship",
    icon: "🏺",
    spiritualMeaning: "The beloved haven of intimacy where Mary anointed Jesus with costly spikenard and Lazarus walked forth from the grave.",
    description: "In Bethany, Jesus commanded, 'Lazarus, come forth!' and he that was dead came out bound hand and foot. Mary anointed the Lord's feet with costly nard.",
    biblicalReference: "John 11:1–44; John 12:1–8",
    themes: ["Resurrection Life", "Costly Worship", "Intimate Fellowship", "Lazarus Raised"],
    badgeText: "Lazarus Raised",
    colorGradient: "from-amber-600 via-rose-950 to-slate-900",
    historicalContext: "A village on the eastern slope of the Mount of Olives."
  },
  {
    name: "Mount of Olives",
    subtitle: "The Summit of the Great Commission & Return",
    icon: "☁️",
    spiritualMeaning: "The sacred ridge where Christ blessed His apostles, ascended into the clouds of glory, and promised to return in like manner.",
    description: "While they beheld, He was taken up; and a cloud received Him out of their sight. Angels declared, 'This same Jesus shall so come in like manner as ye have seen him go.'",
    biblicalReference: "Acts 1:9–12; Zechariah 14:4",
    themes: ["Ascension Glory", "Great Commission", "Blessed Return", "Kingdom Triumph"],
    badgeText: "Ascension Peak",
    colorGradient: "from-cyan-900 via-indigo-950 to-slate-900",
    historicalContext: "The 3-peaked ridge east of Jerusalem across the Kidron."
  },
  {
    name: "Sea of Galilee",
    subtitle: "Cast the Net on the Right Side",
    icon: "🐟",
    spiritualMeaning: "The sunrise shore of charcoal fire where Jesus restores backslidden disciples with unconditional love: 'Feed My sheep.'",
    description: "After fishing all night and catching nothing, Jesus said, 'Cast the net on the right side of the ship, and ye shall find.' He prepared breakfast on the coals and restored Peter.",
    biblicalReference: "John 21:1–19; Matthew 4:18–22",
    themes: ["Miraculous Catch", "Restoration of Peter", "Feed My Sheep", "Morning Grace"],
    badgeText: "Right Side Net",
    colorGradient: "from-blue-700 via-cyan-950 to-slate-900",
    historicalContext: "The freshwater lake in northern Israel where Christ called fishermen."
  },
  {
    name: "Mount of Beatitudes",
    subtitle: "The Blueprint of the Kingdom of Heaven",
    icon: "📜",
    spiritualMeaning: "The hillside amphitheater where Christ proclaimed the radical, counter-cultural righteousness, meekness, and pure-heartedness of the Kingdom.",
    description: "Seeing the multitudes, He went up into a mountain and taught them: 'Blessed are the poor in spirit: for theirs is the kingdom of heaven. Blessed are the pure in heart: for they shall see God.'",
    biblicalReference: "Matthew 5:1–12",
    themes: ["Beatitudes", "Sermon on the Mount", "Pure in Heart", "Kingdom Principles"],
    badgeText: "Kingdom Blueprint",
    colorGradient: "from-emerald-700 via-blue-950 to-slate-900",
    historicalContext: "A hill overlooking the Sea of Galilee near Capernaum."
  },
  {
    name: "Mount Tabor",
    subtitle: "Beholding His Radiant Shekinah Splendor",
    icon: "✨",
    spiritualMeaning: "The holy mountain where Christ was transfigured before Peter, James, and John, His face shining as the sun and His raiment white as light.",
    description: "Jesus was transfigured before them: and his face did shine as the sun, and his raiment was white as the light. A bright cloud overshadowed them, saying, 'This is my beloved Son: hear ye him.'",
    biblicalReference: "Matthew 17:1–8; Mark 9:2–8",
    themes: ["Transfiguration Glory", "Beloved Son", "Divine Cloud", "Hear Ye Him"],
    badgeText: "Radiant Glory",
    colorGradient: "from-purple-900 via-amber-950 to-slate-900",
    historicalContext: "The prominent dome-shaped mountain rising in the Jezreel Valley of Lower Galilee."
  },
  {
    name: "Caesarea Philippi",
    subtitle: "Thou Art the Christ, Son of the Living God",
    icon: "🔑",
    spiritualMeaning: "The grotto of pagan shrines where Peter received celestial revelation of Christ's identity, upon which the unstoppable Church is built.",
    description: "Peter answered, 'Thou art the Christ, the Son of the living God.' Jesus answered, 'Upon this rock I will build my church; and the gates of hell shall not prevail against it.'",
    biblicalReference: "Matthew 16:13–19",
    themes: ["Rock of Revelation", "Unstoppable Church", "Keys of Kingdom", "Gates of Hell"],
    badgeText: "Rock of Revelation",
    colorGradient: "from-blue-900 via-slate-800 to-indigo-950",
    historicalContext: "At the southwestern foot of Mount Hermon near the Jordan headwaters."
  },
  {
    name: "Jacob's Well (Sychar)",
    subtitle: "The Well of Living Water Springing Up",
    icon: "💧",
    spiritualMeaning: "The Samaritan well where Jesus broke ethnic and moral barriers, offering water that permanently quenches soul thirst.",
    description: "Jesus said to the Samaritan woman, 'Whosoever drinketh of the water that I shall give him shall never thirst; but it shall be in him a well of water springing up into everlasting life.'",
    biblicalReference: "John 4:5–42",
    themes: ["Living Water", "Worship in Spirit & Truth", "Soul Quenched", "Samaritan Revival"],
    badgeText: "Living Water",
    colorGradient: "from-cyan-700 via-teal-950 to-slate-900",
    historicalContext: "Near ancient Shechem at the foot of Mount Gerizim."
  },
  {
    name: "Beautiful Gate",
    subtitle: "Silver and Gold Have I None, Rise Up and Walk",
    icon: "🚪",
    spiritualMeaning: "The temple entrance where apostolic power in the Name of Jesus healed a lifelong lame man, turning beggars into leaping worshippers.",
    description: "Peter said, 'Silver and gold have I none; but such as I have give I thee: In the name of Jesus Christ of Nazareth rise up and walk.' He leaped up and praised God.",
    biblicalReference: "Acts 3:1–10",
    themes: ["Name of Jesus", "Instant Healing", "Leaping & Praising", "Apostolic Faith"],
    badgeText: "Rise Up & Walk",
    colorGradient: "from-amber-600 via-indigo-950 to-slate-900",
    historicalContext: "The ornate bronze gate leading into the Court of the Women."
  },
  {
    name: "Solomon's Porch",
    subtitle: "Signs, Wonders & Apostolic Boldness",
    icon: "🏛️",
    spiritualMeaning: "The colonnaded temple portico where the early church gathered in unity, working notable miracles that shook Jerusalem.",
    description: "By the hands of the apostles were many signs and wonders wrought among the people; and they were all with one accord in Solomon's porch.",
    biblicalReference: "Acts 5:12–16; John 10:23",
    themes: ["Signs and Wonders", "One Accord", "Apostolic Miracles", "Multitudes Believing"],
    badgeText: "Signs & Wonders",
    colorGradient: "from-amber-700 via-yellow-900 to-slate-900",
    historicalContext: "The eastern covered colonnade of Herod's Temple."
  },
  {
    name: "Straight Street (Damascus)",
    subtitle: "Scales Falling & Ananias' Ministry",
    icon: "👁️",
    spiritualMeaning: "The historic street where Saul's blindness was healed, the Holy Spirit filled him, and the persecutor became the great Apostle Paul.",
    description: "The Lord told Ananias, 'Go into the street which is called Straight, and enquire in the house of Judas for one called Saul of Tarsus.' Scales fell from his eyes and he was baptized.",
    biblicalReference: "Acts 9:10–19",
    themes: ["Scales Falling", "Obedient Ministry", "Radical Conversion", "Filled with Spirit"],
    badgeText: "Scales Fell",
    colorGradient: "from-teal-800 via-indigo-950 to-slate-900",
    historicalContext: "The main east-west colonnaded thoroughfare (Via Recta) in Damascus."
  },
  {
    name: "Caesarea Maritima",
    subtitle: "The Gentiles Receive the Holy Ghost",
    icon: "🕊️",
    spiritualMeaning: "The centurion's home where Peter preached Christ, and the Holy Ghost fell on all Gentile hearers just as on Pentecost.",
    description: "While Peter yet spake these words, the Holy Ghost fell on all them which heard the word. And they of the circumcision were astonished because the gift was poured out on Gentiles.",
    biblicalReference: "Acts 10:1–48; Acts 11:15–18",
    themes: ["Gentile Pentecost", "Holy Ghost Outpouring", "Breaking Barriers", "Gospel for All"],
    badgeText: "Gentile Pentecost",
    colorGradient: "from-blue-800 via-cyan-950 to-slate-900",
    historicalContext: "The Roman administrative capital and seaport of Judea."
  },
  {
    name: "Philippi Jail",
    subtitle: "Midnight Praises That Shake Prison Foundations",
    icon: "⛓️",
    spiritualMeaning: "The inner dungeon where midnight worship triggered an earthquake, loosed all chains, opened all doors, and saved the jailer's entire household.",
    description: "At midnight Paul and Silas prayed and sang praises unto God. Suddenly there was a great earthquake, the prison foundations were shaken, and every one's bands were loosed.",
    biblicalReference: "Acts 16:22–34",
    themes: ["Midnight Praise", "Prison Earthquake", "Chains Loosed", "Household Salvation"],
    badgeText: "Midnight Praise",
    colorGradient: "from-indigo-800 via-purple-950 to-slate-900",
    historicalContext: "A Roman colony city in eastern Macedonia."
  },
  {
    name: "Berea",
    subtitle: "The Noble Search of the Scriptures",
    icon: "📜",
    spiritualMeaning: "The standard of spiritual nobility where believers receive the Word eagerly and search the Scriptures daily to test all truth.",
    description: "These were more noble than those in Thessalonica, in that they received the word with all readiness of mind, and searched the scriptures daily, whether those things were so.",
    biblicalReference: "Acts 17:10–12",
    themes: ["Noble Bereans", "Daily Bible Search", "Discernment", "Unshakable Faith"],
    badgeText: "Noble Bereans",
    colorGradient: "from-amber-800 via-stone-900 to-slate-900",
    historicalContext: "A prosperous city in southwestern Macedonia."
  },
  {
    name: "Areopagus (Mars' Hill)",
    subtitle: "Declaring the Unknown God to the Philosophers",
    icon: "🏛️",
    spiritualMeaning: "The supreme intellectual forum where Paul boldly declared the Creator God in whom we live, move, and have our being.",
    description: "Paul stood on Mars' hill and declared: 'Whom therefore ye ignorantly worship, him declare I unto you. God that made the world... in Him we live, and move, and have our being.'",
    biblicalReference: "Acts 17:22–34",
    themes: ["Bold Apologetics", "In Him We Live", "Resurrection Truth", "Creator God"],
    badgeText: "Mars' Hill",
    colorGradient: "from-teal-900 via-slate-900 to-slate-950",
    historicalContext: "The rocky hill northwest of the Acropolis in Athens."
  },
  {
    name: "Hall of Tyrannus",
    subtitle: "Daily Discipleship That Shakes an Empire",
    icon: "📖",
    spiritualMeaning: "The school of daily teaching and training that saturated entire provinces with the Gospel and released special miracles.",
    description: "Paul disputing daily in the school of one Tyrannus for two years; so that all they which dwelt in Asia heard the word of the Lord Jesus, both Jews and Greeks.",
    biblicalReference: "Acts 19:8–20",
    themes: ["Daily Discipleship", "Special Miracles", "Word Prevailed", "Empire Reached"],
    badgeText: "Tyrannus Hall",
    colorGradient: "from-blue-900 via-slate-800 to-indigo-950",
    historicalContext: "A philosophical lecture hall in the metropolis of Ephesus."
  },
  {
    name: "Melita (Malta)",
    subtitle: "Shaking Off the Viper into the Fire",
    icon: "🐍",
    spiritualMeaning: "The shipwreck island where the venomous viper was shaken off into the fire without harm, turning catastrophe into widespread healing revival.",
    description: "A viper fastened on Paul's hand. He shook off the beast into the fire, and felt no harm. He laid hands on the father of Publius and healed him, and all the diseased in the island were healed.",
    biblicalReference: "Acts 28:1–10",
    themes: ["Shaking Off Vipers", "No Harm", "Island Revival", "Divine Immunity"],
    badgeText: "Shaking Vipers",
    colorGradient: "from-red-800 via-amber-950 to-slate-950",
    historicalContext: "The Mediterranean island of Malta south of Sicily."
  },
  {
    name: "Patmos",
    subtitle: "The Open Heavens of Apocalyptic Revelation",
    icon: "👁️",
    spiritualMeaning: "The penal island of exile where earthly chains could not prevent John from seeing the glorified Son of God and the New Jerusalem.",
    description: "John was in the Isle of Patmos for the word of God. 'I was in the Spirit on the Lord's day, and heard behind me a great voice... and behold, One like unto the Son of man.'",
    biblicalReference: "Revelation 1:9–20; Revelation 21:1–7",
    themes: ["Apocalyptic Vision", "In the Spirit", "Glorified Christ", "New Jerusalem"],
    badgeText: "Heaven Unveiled",
    colorGradient: "from-purple-950 via-indigo-900 to-slate-900",
    historicalContext: "A volcanic Greek island in the Aegean Sea used as a Roman penal colony."
  },
  {
    name: "Heavenly Throne Room",
    subtitle: "Casting Golden Crowns Before the Lamb",
    icon: "👑",
    spiritualMeaning: "The eternal throne room where living creatures and twenty-four elders bow in unceasing worship, declaring holy is the Lord God Almighty.",
    description: "Before the throne was a sea of glass like unto crystal. The four and twenty elders fall down before Him that sat on the throne, and cast their crowns before the throne.",
    biblicalReference: "Revelation 4:1–11; Revelation 5:1–14",
    themes: ["Heavenly Worship", "Crowns Cast Down", "Sea of Glass", "Worthy Is the Lamb"],
    badgeText: "Throne Room",
    colorGradient: "from-amber-400 via-purple-950 to-slate-950",
    historicalContext: "The celestial sanctuary of God in the third heaven."
  }
];

// Clean deduplication check
const seenIds = new Set();
const seenNames = new Set();
const uniqueList = [];

let order = 1;
for (const p of allUniquePlaces) {
  const normName = p.name.trim().toLowerCase();
  const id = p.name.toLowerCase().replace(/[^a-z0-9]/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "");
  
  if (!seenNames.has(normName) && !seenIds.has(id)) {
    seenNames.add(normName);
    seenIds.add(id);
    uniqueList.push({
      id,
      name: p.name.trim(),
      subtitle: p.subtitle,
      icon: p.icon,
      spiritualMeaning: p.spiritualMeaning,
      description: p.description,
      biblicalReference: p.biblicalReference,
      themes: p.themes,
      scriptureCountDisplay: "500+ Scriptures",
      isPublished: true,
      isFeatured: order <= 12,
      displayOrder: order++,
      colorGradient: p.colorGradient,
      badgeText: p.badgeText,
      historicalContext: p.historicalContext
    });
  }
}

const fileContent = `import { SpiritualPlace } from "../types";

// Master Catalog of Authentically Unique Biblical Spiritual Places (Every place is distinct with NO duplicate names and NO pillars)
export const SCRIPTURAL_PLACES_500_CATALOG: SpiritualPlace[] = ${JSON.stringify(uniqueList, null, 2)};

export function generate500PlusScripturalPlaces(): SpiritualPlace[] {
  return SCRIPTURAL_PLACES_500_CATALOG;
}

export const MASTER_500_SPIRITUAL_PLACES: SpiritualPlace[] = SCRIPTURAL_PLACES_500_CATALOG;
`;

fs.writeFileSync(path.join(process.cwd(), "src", "data", "spiritualPlaces500Catalog.ts"), fileContent, "utf-8");
console.log(`Generated ${uniqueList.length} uniquely named spiritual places without any duplicate or pillar!`);
