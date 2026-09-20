import fs from "fs";
import path from "path";
import { PRE_GENERATED_CHAPTER_SUMMARIES } from "../src/data/bibleChapterSummaries";

interface ChapterSummary {
  book: string;
  chapter: number;
  summary: string;
  key_verses: string[];
  theme: string;
  lesson: string;
  questions: string[];
}

// Full outline definitions for Pentateuch (Genesis, Exodus, Leviticus, Numbers, Deuteronomy = 187 chapters)
export const OT_LAW_DATA: Record<string, { theme: string; summary: string; lesson: string; key_verses: string[]; questions: string[] }> = {
  // GENESIS 1-50
  "Genesis_1": {
    theme: "Creation & Divine Order",
    summary: "God created the heavens, the earth, and everything in them in six days by the power of His spoken word. He formed light, the sky, the land, vegetation, sun, moon, stars, and sea and land creatures. On the sixth day, God created mankind in His own image and gave them authority to be fruitful and steward the earth. God looked at all He made and declared it was very good.",
    lesson: "God is intentional, and your life has divine purpose because He created you in His own image.",
    key_verses: ["Genesis 1:1", "Genesis 1:27", "Genesis 1:31"],
    questions: ["What did God create on the sixth day?", "How did God bring everything in the universe into existence?"]
  },
  "Genesis_2": {
    theme: "The Garden of Eden and the First Marriage",
    summary: "God rested on the seventh day and sanctified it after completing His creation work. He formed Adam from the dust of the ground, breathed life into him, and placed him in the Garden of Eden with the command not to eat from the tree of the knowledge of good and evil. Seeing that man was alone, God brought all animals for Adam to name and then created Eve from his rib as a suitable helper, establishing holy marriage.",
    lesson: "God intimately provides for your soul, establishes meaningful work, and ordains covenant relationships.",
    key_verses: ["Genesis 2:7", "Genesis 2:18", "Genesis 2:24"],
    questions: ["From what material did God form Adam?", "How did God create the first woman Eve?"]
  },
  "Genesis_3": {
    theme: "The Fall of Man and the First Promise of Redemption",
    summary: "The serpent deceived Eve into doubting God's command and eating the forbidden fruit, and Adam ate with her. Immediately their eyes were opened, they felt shame over their nakedness, and they hid from God's presence among the trees of the garden. When God questioned them, Adam blamed Eve and Eve blamed the serpent, leading to curses on the serpent, woman, and ground, while God promised the Seed of the woman would crush the serpent's head.",
    lesson: "Disobedience separates us from God, but His mercy immediately provided a promise of redemption through Christ.",
    key_verses: ["Genesis 3:6", "Genesis 3:15", "Genesis 3:21"],
    questions: ["What tactic did the serpent use to deceive Eve?", "What did God promise in Genesis 3:15 concerning the Seed of the woman?"]
  },
  "Genesis_4": {
    theme: "Cain and Abel",
    summary: "Eve gave birth to Cain the farmer and Abel the shepherd; God accepted Abel's faithful sacrifice of his flock but rejected Cain's offering. Overcome with jealousy and despite God's warning to master sin, Cain murdered his brother Abel in the field. God confronted Cain, cursed him to be a restless wanderer, and placed a protective mark on him, after which Seth was born to continue the godly lineage.",
    lesson: "Guard your heart against jealousy and anger before it leads to destructive disobedience.",
    key_verses: ["Genesis 4:4", "Genesis 4:7", "Genesis 4:9"],
    questions: ["Why was Abel's sacrifice accepted by God?", "What solemn warning did God give Cain before he attacked Abel?"]
  },
  "Genesis_5": {
    theme: "Genealogy of Faith from Adam to Noah",
    summary: "Moses records the generations of Adam through Seth down to Noah, highlighting that each patriarch lived and died. Amid the repeated rhythm of death, Enoch walked faithfully with God for three hundred years and did not experience death because God took him. Lamech fathered Noah, prophesying that he would bring comfort from the cursed ground.",
    lesson: "Walking closely with God transcends mortality and leaves a legacy of divine righteousness across generations.",
    key_verses: ["Genesis 5:24", "Genesis 5:29"],
    questions: ["What exceptional testimony is recorded about Enoch?", "What prophetic comfort did Lamech say Noah would bring?"]
  },
  "Genesis_6": {
    theme: "Human Wickedness and the Call of Noah",
    summary: "Human wickedness multiplied greatly on the earth until every inclination of the human heart was only evil continually, grieving the Lord. God decided to wipe out humanity and animals through a flood, but Noah found grace in the eyes of the Lord because he was a righteous and blameless man. God instructed Noah to construct a massive three-deck ark of gopher wood and pitched inside and out to preserve his family and pairs of every living creature.",
    lesson: "Even when the culture around you turns away from God, you can stand blameless and find grace in His eyes.",
    key_verses: ["Genesis 6:5", "Genesis 6:8", "Genesis 6:22"],
    questions: ["Why was God grieved with the condition of humanity?", "What made Noah stand out before God?"]
  },
  "Genesis_7": {
    theme: "The Great Flood Waters",
    summary: "Noah, his wife, his three sons, and their wives entered the ark along with clean animals by sevens and unclean animals by pairs as God commanded. The Lord shut the door of the ark behind them, and all the springs of the great deep burst open while the floodgates of heaven poured rain for forty days and forty nights. The waters rose high above the highest mountains, destroying all land creatures, while the ark floated safely.",
    lesson: "When God shuts you into His refuge of salvation, you are secure no matter what storm rages outside.",
    key_verses: ["Genesis 7:16", "Genesis 7:23"],
    questions: ["Who shut the door of the ark behind Noah?", "How long did rain pour down upon the earth?"]
  },
  "Genesis_8": {
    theme: "The Waters Recede and Noah's Altar",
    summary: "God remembered Noah and sent a wind to cause the waters to recede, and the ark came to rest on the mountains of Ararat. Noah sent out a raven and then a dove, which eventually returned with a freshly plucked olive leaf, and later flew away when the land was dry. God commanded Noah and his family to leave the ark, and Noah's very first act was building an altar of worship to sacrifice burnt offerings that pleased the Lord.",
    lesson: "Make thanksgiving and worship your first response whenever God delivers you from a trial.",
    key_verses: ["Genesis 8:1", "Genesis 8:11", "Genesis 8:20-22"],
    questions: ["What did the dove bring back to show the waters had subsided?", "What was Noah's first action after leaving the ark?"]
  },
  "Genesis_9": {
    theme: "The Rainbow Covenant",
    summary: "God blessed Noah and his sons, instructing them to be fruitful, multiply, and fill the earth, while establishing the sanctity of human life. God made an everlasting covenant with Noah and all living creatures never again to destroy the earth with a flood, placing the rainbow in the clouds as the sign of His promise. Later, Noah planted a vineyard, became drunk, and Ham dishonored his nakedness while Shem and Japheth covered him respectfully.",
    lesson: "God's covenant faithfulness is unfailing, and He calls us to honor others and walk in moral vigilance.",
    key_verses: ["Genesis 9:6", "Genesis 9:13", "Genesis 9:16"],
    questions: ["What is the divine token of God's covenant with Noah?", "How did Shem and Japheth respond to their father's vulnerability?"]
  },
  "Genesis_10": {
    theme: "The Table of Nations",
    summary: "The chapter details the descendants of Noah's sons Japheth, Ham, and Shem, from whom all the nations of the ancient world spread across the earth. It highlights Nimrod, a mighty hunter before the Lord who founded great cities including Babel, Nineveh, and Calah. These genealogical lines record how peoples dispersed according to their clans, languages, territories, and nations after the Flood.",
    lesson: "God is the sovereign ruler over all peoples, ethnicities, and boundaries of the earth.",
    key_verses: ["Genesis 10:8-9", "Genesis 10:32"],
    questions: ["Who was Nimrod and what did he accomplish?", "From whose three sons did all the post-flood nations descend?"]
  },
  "Genesis_11": {
    theme: "The Tower of Babel and the Lineage of Abram",
    summary: "The whole earth had one language, and people settled in the plain of Shinar and conspired to build a city and a tower reaching heaven to make a name for themselves. The Lord came down, saw their pride, confused their languages so they could not understand one another, and scattered them across the face of the earth. The chapter concludes with the genealogy from Shem to Terah, who moved his family including Abram and Sarai toward Canaan and settled in Haran.",
    lesson: "Human pride and self-exaltation always lead to confusion, while humble obedience aligns with God's purpose.",
    key_verses: ["Genesis 11:4", "Genesis 11:7-8"],
    questions: ["Why did the people want to build the Tower of Babel?", "How did God intervene to stop their proud project?"]
  },
  "Genesis_12": {
    theme: "The Call of Abram",
    summary: "God commanded Abram to leave his homeland, his kindred, and his father's house to travel to an unknown land that God would show him. The Lord promised to make him a great nation, bless him, and bless all the families of the earth through his lineage. Abram obeyed in faith, built altars at Shechem and Bethel, and later journeyed to Egypt during a famine where God preserved Sarai from Pharaoh.",
    lesson: "When God calls you to step forward in faith, His eternal promises will always outlast your fears.",
    key_verses: ["Genesis 12:1-3", "Genesis 12:7"],
    questions: ["What three things did God promise Abram when He called him?", "Where did Abram build his first altars to worship the Lord?"]
  },
  "Genesis_13": {
    theme: "Abram and Lot Separate",
    summary: "Abram returned from Egypt to Bethel with vast wealth in livestock, silver, and gold, alongside his nephew Lot. Quarreling broke out between Abram's herdsmen and Lot's herdsmen because the land could not support both of their large flocks together. Abram graciously offered Lot first choice of land to maintain peace; Lot chose the well-watered plain of the Jordan toward Sodom, after which God reaffirmed His vast territorial promise to Abram.",
    lesson: "Pursuing peace and generosity over selfish gain invites God's greater blessings upon your life.",
    key_verses: ["Genesis 13:8-9", "Genesis 13:14-17"],
    questions: ["Why did conflict arise between the herdsmen of Abram and Lot?", "What land did Lot choose for himself?"]
  },
  "Genesis_14": {
    theme: "Abram Rescues Lot and Meets Melchizedek",
    summary: "Four eastern kings led by Chedorlaomer defeated the five kings of Sodom and Gomorrah, looting the cities and capturing Lot and his possessions. When word reached Abram, he armed 318 trained men born in his household, pursued the raiders to Dan, routed them by night, and recovered all people and property. Upon his return, Melchizedek the king of Salem and priest of the Most High God brought out bread and wine, blessed Abram, and Abram gave him a tenth of everything.",
    lesson: "God gives supernatural victory to rescue the vulnerable, and all praise and tithes belong to the Most High God.",
    key_verses: ["Genesis 14:14", "Genesis 14:18-20"],
    questions: ["How many trained men did Abram take to rescue Lot?", "Who was Melchizedek and what did he bring out to bless Abram?"]
  },
  "Genesis_15": {
    theme: "God's Covenant of Faith with Abram",
    summary: "The word of the Lord came to Abram in a vision saying, 'Do not be afraid, Abram; I am your shield, your exceedingly great reward.' Abram expressed grief over having no heir, but God brought him outside to look at the stars and promised his descendants would be just as countless, and Abram believed the Lord, who credited it to him as righteousness. God sealed this covenant through a smoking furnace and burning lamp passing between the severed sacrificial pieces, prophesying the Exodus.",
    lesson: "Righteousness is received by faith in God's promises, and His covenant rests upon His unconditional faithfulness.",
    key_verses: ["Genesis 15:1", "Genesis 15:6", "Genesis 15:18"],
    questions: ["What did God ask Abram to count in the night sky?", "How did Abram respond to God's promise in Genesis 15:6?"]
  },
  "Genesis_16": {
    theme: "Hagar and the Birth of Ishmael",
    summary: "Sarai remained childless after ten years in Canaan, so she persuaded Abram to sleep with her Egyptian maidservant Hagar to obtain children through her. When Hagar conceived, she began to despise Sarai, resulting in harsh mistreatment that prompted Hagar to flee into the desert. The angel of the Lord met Hagar by a spring of water, commanded her to return, promised to multiply her descendants, and Hagar called God 'El Roi' (the God who sees me).",
    lesson: "When human impatience creates sorrow, God sees your affliction and meets you right where you are.",
    key_verses: ["Genesis 16:11", "Genesis 16:13"],
    questions: ["Why did Hagar flee into the wilderness?", "What name did Hagar give to God after the angel met her?"]
  },
  "Genesis_17": {
    theme: "The Covenant of Circumcision",
    summary: "When Abram was ninety-nine years old, the Lord appeared to him and declared, 'I am God Almighty (El Shaddai); walk before Me and be blameless.' God changed Abram's name to Abraham, meaning father of many nations, and changed Sarai's name to Sarah, promising kings and nations would descend from her. God instituted circumcision as the covenant sign for every male in Abraham's household and promised that Sarah would give birth to Isaac the following year.",
    lesson: "God transforms your identity and invites you into an everlasting covenant relationship marked by devotion.",
    key_verses: ["Genesis 17:1", "Genesis 17:5", "Genesis 17:19"],
    questions: ["What new name did God give Abram and what does it mean?", "What physical sign did God establish for His covenant?"]
  },
  "Genesis_18": {
    theme: "Three Heavenly Visitors and Abraham's Intercession",
    summary: "The Lord appeared to Abraham near the great trees of Mamre in the form of three men, and Abraham ran to welcome them with lavish hospitality. The Lord reaffirmed that Sarah would have a son by that time next year, causing Sarah to laugh within herself until the Lord asked, 'Is anything too hard for the Lord?' As the visitors turned toward Sodom, the Lord revealed His planned judgment, and Abraham boldly interceded for the city if even ten righteous people were found.",
    lesson: "Nothing is too hard for the Lord, and fervent, compassionate intercession can stand in the gap for others.",
    key_verses: ["Genesis 18:14", "Genesis 18:25", "Genesis 18:32"],
    questions: ["What question did the Lord ask when Sarah laughed?", "Down to what number of righteous people did Abraham intercede for Sodom?"]
  },
  "Genesis_19": {
    theme: "The Destruction of Sodom and Rescue of Lot",
    summary: "Two angels arrived at Sodom in the evening and were welcomed into Lot's house, where the wicked men of the city surrounded the home demanding to abuse them. The angels struck the attackers with blindness, warned Lot of impending destruction, and led Lot, his wife, and two daughters out of the city by the hand. The Lord rained burning sulfur upon Sodom and Gomorrah, Lot's wife looked back and became a pillar of salt, and Lot escaped to the mountains.",
    lesson: "Flee from sin without looking back, trusting in God's power to deliver the righteous from judgment.",
    key_verses: ["Genesis 19:16", "Genesis 19:24-26"],
    questions: ["How did the angels protect Lot's home from the mob?", "What happened to Lot's wife when she looked back at Sodom?"]
  },
  "Genesis_20": {
    theme: "Abraham, Sarah, and Abimelech at Gerar",
    summary: "Abraham moved to the Negev and stayed in Gerar, where he once again claimed that Sarah was his sister out of fear for his life, and King Abimelech sent for her. God came to Abimelech in a dream by night, warning him that he was a dead man because Sarah was married, but acknowledged Abimelech's integrity of heart. Abimelech returned Sarah with gifts of sheep, cattle, and silver, rebuked Abraham, and Abraham prayed to God, who healed Abimelech's household.",
    lesson: "Even when fear causes us to falter, God's protective grace guards His promises and hears our prayers.",
    key_verses: ["Genesis 20:6", "Genesis 20:17"],
    questions: ["How did God prevent Abimelech from touching Sarah?", "What did Abraham do to bring healing to Abimelech's household?"]
  },
  "Genesis_21": {
    theme: "The Birth of Isaac and Hagar's Protection",
    summary: "The Lord was gracious to Sarah as He had promised, and she gave birth to Isaac in Abraham's old age, bringing immense joy and laughter to their home. When Isaac was weaned, Ishmael mocked him, leading Sarah to insist that Hagar and her son be sent away, which God told a distressed Abraham to do. In the desert of Beersheba when their water was gone, God heard the boy crying, opened Hagar's eyes to see a well of water, and promised to make Ishmael a great nation.",
    lesson: "God always keeps His promises at the appointed time and hears the cry of those in desperate distress.",
    key_verses: ["Genesis 21:1-2", "Genesis 21:6", "Genesis 21:17"],
    questions: ["What name was given to the promised son born to Abraham and Sarah?", "How did God provide for Hagar and Ishmael in the desert?"]
  },
  "Genesis_22": {
    theme: "The Sacrifice of Isaac and Jehovah Jireh",
    summary: "God tested Abraham's faith by commanding him to take his beloved only son Isaac to Mount Moriah and offer him as a burnt sacrifice. Abraham obeyed early the next morning, journeyed three days, built an altar, bound Isaac, and raised the knife in complete trust that God could raise the dead. The angel of the Lord stopped him, praising his reverence, and Abraham looked up to see a ram caught in a thicket, naming the place Jehovah Jireh (The Lord Will Provide).",
    lesson: "When you put God first and surrender what you hold most dear, God always provides the substitute sacrifice.",
    key_verses: ["Genesis 22:8", "Genesis 22:12", "Genesis 22:14"],
    questions: ["What question did Isaac ask on the way up the mountain?", "What substitute did God provide in place of Isaac?"]
  },
  "Genesis_23": {
    theme: "Sarah's Death and the Burial at Machpelah",
    summary: "Sarah died at Kiriath Arba (Hebron) at the age of 127 years, and Abraham wept and mourned for his beloved wife. Abraham approached the Hittites as a resident alien and purchased the cave of Machpelah from Ephron for four hundred shekels of silver with legal transparency. Abraham buried Sarah in the cave, marking the first piece of property owned by the patriarchs in the Promised Land.",
    lesson: "Honor the memories of the righteous and hold onto God's promises even when you hold only a small down payment.",
    key_verses: ["Genesis 23:1-2", "Genesis 23:19-20"],
    questions: ["How old was Sarah when she passed away in Hebron?", "What plot of land did Abraham purchase to bury Sarah?"]
  },
  "Genesis_24": {
    theme: "A Wife for Isaac",
    summary: "Aged Abraham charged his senior servant Eliezer with a solemn oath to travel to his homeland and find a godly wife for Isaac among his relatives. The servant reached the town of Nahor in Mesopotamia and prayed at the well for a specific confirmation: the maiden who offered to water his camels would be the one. Rebekah came out immediately, drew water for him and his ten camels, and after hearing the story, her family blessed her to go and become Isaac's wife.",
    lesson: "Pray with precision, trust God's providential guidance, and watch Him orchestrate your steps.",
    key_verses: ["Genesis 24:12", "Genesis 24:26-27", "Genesis 24:67"],
    questions: ["What specific sign did Abraham's servant pray for at the well?", "How did Isaac react when Rebekah arrived at his tent?"]
  },
  "Genesis_25": {
    theme: "Abraham's Death, Birth of Jacob and Esau",
    summary: "Abraham married Keturah, fathered more sons, gave gifts to his concubines' sons, and died at a ripe old age of 175, buried beside Sarah by Isaac and Ishmael. Rebekah was barren, but Isaac prayed to the Lord and she conceived twin boys who struggled within her womb, where God revealed that the older would serve the younger. Esau was born red and hairy, Jacob born grasping his heel; later, a famished Esau sold his birthright to Jacob for a bowl of red lentil stew.",
    lesson: "Value eternal spiritual heritage over fleeting physical cravings, for what you despise can never be bought back.",
    key_verses: ["Genesis 25:21", "Genesis 25:23", "Genesis 25:34"],
    questions: ["What prophecy did God give Rebekah about the twins in her womb?", "What did Esau trade away for a single bowl of stew?"]
  },
  "Genesis_26": {
    theme: "Isaac in Gerar and the Wells of Peace",
    summary: "A famine struck the land and Isaac moved to Gerar, where God appeared to him, confirmed the Abrahamic oath, and commanded him not to go down to Egypt. Isaac claimed Rebekah was his sister out of fear, but King Abimelech discovered the truth, protected them, and Isaac sowed crops and reaped a hundredfold harvest because the Lord blessed him. When jealous Philistines stopped up Abraham's wells, Isaac repeatedly moved on without strife until he dug Rehoboth, where God gave room to flourish.",
    lesson: "Do not fight in the flesh; let peace prevail and watch God open a room of abundance (Rehoboth) for you.",
    key_verses: ["Genesis 26:12", "Genesis 26:22", "Genesis 26:24"],
    questions: ["What did God promise Isaac when he obeyed by staying in Gerar?", "What name did Isaac give to the well where the Philistines no longer quarreled?"]
  },
  "Genesis_27": {
    theme: "Jacob Obtains the Firstborn Blessing",
    summary: "Aged Isaac whose eyes were dim called Esau to hunt wild game and prepare delicious food so he could bestow his patriarchal blessing before he died. Rebekah overheard, instructed Jacob to disguise himself in Esau's garments and goatskins on his hands, and served Isaac savory meat first. Jacob deceived his father into giving him the blessing of dew of heaven and dominion, prompting Esau to weep bitterly and plot Jacob's murder, forcing Jacob to flee to Laban.",
    lesson: "Human deceit brings bitter family strife; trust God's sovereign timing rather than manipulating outcomes.",
    key_verses: ["Genesis 27:28-29", "Genesis 27:34", "Genesis 27:41"],
    questions: ["How did Rebekah and Jacob deceive Isaac to receive the blessing?", "What was Esau's reaction upon discovering Jacob had received the blessing?"]
  },
  "Genesis_28": {
    theme: "Jacob's Ladder at Bethel",
    summary: "Isaac blessed Jacob and sent him away to Paddan Aram to find a wife from the household of Laban, warning him not to marry a Canaanite woman. On his journey at sunset, Jacob used a stone for a pillow and dreamed of a stairway resting on the earth with its top reaching to heaven, with angels ascending and descending upon it. The Lord stood above it, promised him the land and divine presence, and Jacob woke in awe, calling the place Bethel (House of God) and vowing his tithe.",
    lesson: "God meets you in lonely places, opens the portals of heaven, and pledges His presence wherever you go.",
    key_verses: ["Genesis 28:12", "Genesis 28:15", "Genesis 28:16-17"],
    questions: ["What did Jacob see in his dream while sleeping on a stone pillow?", "What did Jacob call the place where he had this heavenly vision?"]
  },
  "Genesis_29": {
    theme: "Jacob Marries Leah and Rachel",
    summary: "Jacob arrived in the east, met his cousin Rachel at the well as she watered her father's sheep, wept with joy, and rolled away the heavy well-stone. Jacob agreed to serve Laban for seven years for Rachel's hand in marriage, and they seemed like only a few days because of his love for her. On the wedding night, Laban deceived Jacob by substituting his elder daughter Leah, requiring Jacob to serve another seven years for Rachel, after which Leah bore Reuben, Simeon, Levi, and Judah.",
    lesson: "God sees the unloved and neglected, giving honor and purpose to Leah while teaching Jacob patience through trials.",
    key_verses: ["Genesis 29:20", "Genesis 29:31", "Genesis 29:35"],
    questions: ["How long did Jacob serve Laban before discovering Leah had been given to him?", "Why did Leah praise the Lord when her fourth son Judah was born?"]
  },
  "Genesis_30": {
    theme: "The Children of Jacob and the Spotted Flocks",
    summary: "Rachel, distressed by her barrenness, gave her maidservant Bilhah to Jacob, who bore Dan and Naphtali, while Leah gave her servant Zilpah, who bore Gad and Asher. Leah later gave birth to Issachar, Zebulun, and Dinah, and finally God remembered Rachel, who conceived and bore Joseph. Jacob then asked to return home, and through shrewd breeding using peeled poplar and almond branches, Jacob multiplied speckled and spotted sheep and goats, growing extremely wealthy.",
    lesson: "God remembers the cries of the longing heart and blesses your labor despite unfair treatment from employers.",
    key_verses: ["Genesis 30:22", "Genesis 30:43"],
    questions: ["What did Rachel say when God finally answered her prayer with the birth of Joseph?", "How did God prosper Jacob's livestock despite Laban's changing wages?"]
  },
  "Genesis_31": {
    theme: "Jacob Flees from Laban",
    summary: "Hearing Laban's sons accuse him of taking their father's wealth, and noticing Laban's attitude change, God commanded Jacob to return to the land of his fathers. Jacob conferred with Rachel and Leah, gathered all his wives, children, and livestock, and fled secretly across the Euphrates while Laban was away shearing sheep. Laban pursued Jacob for seven days but was warned by God in a dream not to harm him, culminating in a peace covenant marked by a pillar at Mizpah.",
    lesson: "When God says it is time to move, step out in faith; He will defend you against those who pursue you.",
    key_verses: ["Genesis 31:3", "Genesis 31:24", "Genesis 31:49"],
    questions: ["What did God tell Laban in a dream when he pursued Jacob?", "What name was given to the heap of stones where Jacob and Laban made peace?"]
  },
  "Genesis_32": {
    theme: "Jacob Wrestles with God at Peniel",
    summary: "Jacob continued his journey and was met by angels of God at Mahanaim, but grew fearful upon hearing that Esau was coming to meet him with four hundred men. Jacob divided his camp, prayed fervently to the God of Abraham, and sent successive waves of generous gifts across the river Jabbok to appease Esau. Left alone in the dark, Jacob wrestled with a divine man until daybreak, refused to let go without a blessing, had his hip dislocated, and was renamed Israel.",
    lesson: "Spiritual transformation happens when you cling to God in surrender, exchanging your striving for His blessing.",
    key_verses: ["Genesis 32:9-10", "Genesis 32:26", "Genesis 32:28"],
    questions: ["What new name did the divine wrestler bestow upon Jacob?", "Why did Jacob call the place where he wrestled Peniel?"]
  },
  "Genesis_33": {
    theme: "Jacob and Esau Reconcile",
    summary: "Jacob looked up and saw Esau approaching with four hundred men, so he arranged his family with the handmaids first, Leah next, and Rachel and Joseph last. Jacob went on ahead, bowing down to the ground seven times until he reached his brother, but Esau ran to meet him, threw his arms around his neck, kissed him, and they wept together. Esau graciously accepted Jacob's generous gifts, offered an escort, and Jacob settled peacefully in Succoth and Shechem.",
    lesson: "Forgiveness and humility can dismantle years of bitterness, turning dread into tearful reconciliation.",
    key_verses: ["Genesis 33:4", "Genesis 33:10", "Genesis 33:20"],
    questions: ["How did Esau greet Jacob when they finally met face to face?", "What altar did Jacob erect outside the city of Shechem?"]
  },
  "Genesis_34": {
    theme: "The Defilement of Dinah and the Vengeance of Levi and Simeon",
    summary: "Dinah, the daughter of Jacob and Leah, went out to visit the women of the land and was defiled by Shechem, prince of the Hivite country, who fell in love with her and wanted her as his wife. When Jacob's sons heard of this outrage in Israel, they deceitfully agreed to an intermarriage treaty on the condition that all men in the city be circumcised. On the third day while the men were in pain, Simeon and Levi took their swords, slaughtered the males, plundered the city, and brought grief to Jacob.",
    lesson: "Uncontrolled vengeance and deceit dishonor God's name and bring collateral sorrow rather than true justice.",
    key_verses: ["Genesis 34:7", "Genesis 34:25", "Genesis 34:30"],
    questions: ["Who were the two brothers that led the violent raid on Shechem?", "How did Jacob respond to his sons' actions at Shechem?"]
  },
  "Genesis_35": {
    theme: "Jacob Returns to Bethel and the Birth of Benjamin",
    summary: "God told Jacob to go up to Bethel and live there, so Jacob commanded his household to put away foreign idols, purify themselves, and change their garments. They traveled safely because a terror from God fell upon surrounding cities, and Jacob built an altar at Bethel where God reaffirmed his name as Israel and renewed the covenant of kings. On the way to Ephrath, Rachel died giving birth to Benjamin, Isaac died at 180 years old, and Esau and Jacob buried him.",
    lesson: "Purify your life, cast away idols, and return to your spiritual altars where God first met you.",
    key_verses: ["Genesis 35:2-3", "Genesis 35:9-11", "Genesis 35:18"],
    questions: ["What did Jacob tell his household to do before traveling to Bethel?", "What child did Rachel give birth to before she died near Bethlehem?"]
  },
  "Genesis_36": {
    theme: "The Descendants and Kings of Esau",
    summary: "Moses records the family records of Esau (Edom), who took his Canaanite wives, sons, daughters, and entire wealth away from Jacob to settle in the hill country of Seir. The chapter catalogs the chiefs and clans of Edom, the Horite inhabitants of the land, and the kings who reigned in Edom before any king reigned over the Israelites. It demonstrates that God fulfilled His promise to multiply Esau's descendants into a significant regional power.",
    lesson: "God remains faithful to His words even concerning worldly nations, fulfilling His promises to all families.",
    key_verses: ["Genesis 36:1", "Genesis 36:8", "Genesis 36:31"],
    questions: ["What hill country became the home and territory of Esau's family?", "What notable fact is recorded about the kings of Edom in verse 31?"]
  },
  "Genesis_37": {
    theme: "Joseph's Dreams and Betrayal by His Brothers",
    summary: "Jacob favored seventeen-year-old Joseph above his other sons and gifted him a richly ornamented coat of many colors, causing his brothers to hate him. Joseph shared two prophetic dreams showing his brothers' sheaves and the sun, moon, and eleven stars bowing down to him, which intensified their jealousy. When sent to check on his brothers in Dothan, they conspired against him, threw him into a cistern, sold him to Midianite traders for twenty pieces of silver, and deceived Jacob with Joseph's blood-soaked tunic.",
    lesson: "Human jealousy cannot thwart God's sovereign destiny; even in the pit, God's plan is unfolding.",
    key_verses: ["Genesis 37:3-4", "Genesis 37:9", "Genesis 37:28"],
    questions: ["What two dreams did Joseph share with his family?", "For how much silver did the brothers sell Joseph to the Midianite traders?"]
  },
  "Genesis_38": {
    theme: "Judah, Tamar, and the Lineage of Perez",
    summary: "Judah separated from his brothers, married a Canaanite woman, and fathered Er, Onan, and Shelah. Er and Onan died because of their wickedness before the Lord, leaving Tamar widowed, yet Judah failed to give her his third son Shelah as promised. Tamar disguised herself as a veiled woman and conceived twin sons, Perez and Zerah, through Judah, exposing Judah's unfaithfulness. Judah confessed that Tamar was more righteous than he, and God sovereignly preserved the royal lineage of Judah leading to Christ.",
    lesson: "God in His sovereign grace can take broken, complex human situations and weave them into His divine plan of redemption.",
    key_verses: ["Genesis 38:26", "Genesis 38:29"],
    questions: ["Why did Judah confess that Tamar had been more righteous than he?", "How does the birth of Perez show God's providence in preserving the ancestral line of Jesus?"]
  },
  "Genesis_39": {
    theme: "Joseph in Potiphar's House and Prison",
    summary: "Joseph was brought down to Egypt and purchased by Potiphar, Pharaoh's captain of the guard, where the Lord was with Joseph so that he prospered and was put in charge of everything. Potiphar's wife repeatedly attempted to seduce Joseph, but he refused, declaring, 'How then could I do such a wicked thing and sin against God?' When she caught his garment and falsely accused him of assault, Joseph was thrown into the royal prison, but the Lord showed him unfailing kindness and gave him favor with the warden.",
    lesson: "Purity and integrity before God matter more than human applause, and God's presence remains with you even in prison.",
    key_verses: ["Genesis 39:2-3", "Genesis 39:9", "Genesis 39:21"],
    questions: ["How did Joseph respond to the persistent temptation of Potiphar's wife?", "What was the chief reason Joseph prospered even in an Egyptian dungeon?"]
  },
  "Genesis_40": {
    theme: "Joseph Interprets the Prisoners' Dreams",
    summary: "Pharaoh became angry with his chief cupbearer and chief baker and placed them in the custody of the prison where Joseph was confined. Both men had troubling dreams on the same night, and Joseph explained that interpretations belong to God and revealed their meanings. Joseph predicted the cupbearer would be restored to his office in three days while the baker would be executed, asking the cupbearer to remember him to Pharaoh, though the cupbearer forgot Joseph.",
    lesson: "Honor God with your gifts even in seasons of obscurity, knowing that God never forgets your plight.",
    key_verses: ["Genesis 40:8", "Genesis 40:14", "Genesis 40:23"],
    questions: ["To whom did Joseph say all dream interpretations belong?", "What did Joseph request of the chief cupbearer after interpreting his dream?"]
  },
  "Genesis_41": {
    theme: "Pharaoh's Dreams and Joseph's Exaltation",
    summary: "Two full years later, Pharaoh had two disturbing dreams of seven fat cows eaten by seven lean cows, and seven plump heads of grain swallowed by seven withered heads. The chief cupbearer remembered Joseph, who was shaved, dressed, and brought before Pharaoh, declaring that God would give Pharaoh an answer of peace. Joseph revealed seven years of abundance followed by seven years of severe famine, proposed a wise storage plan, and was instantly appointed governor over all Egypt at age thirty.",
    lesson: "God's timing is perfect; a single day under divine favor can lift you from a prison cell to the palace.",
    key_verses: ["Genesis 41:16", "Genesis 41:39-40", "Genesis 41:51-52"],
    questions: ["What did Pharaoh's dreams of fat and lean cows signify?", "What position did Pharaoh bestow upon Joseph after hearing his counsel?"]
  },
  "Genesis_42": {
    theme: "Joseph's Brothers Come to Egypt",
    summary: "When Jacob learned there was grain in Egypt, he sent ten of his sons to buy food, keeping youngest son Benjamin at home for fear of harm. The brothers arrived and bowed down with their faces to the ground before Joseph, who recognized them but disguised himself and spoke harshly, accusing them of being spies. Joseph imprisoned them for three days, retained Simeon as a hostage, sent the rest back with grain, and secretly returned each man's silver in his sack, causing them fear.",
    lesson: "God uses conviction and difficult circumstances to awaken conscience and bring hidden sins to the surface.",
    key_verses: ["Genesis 42:6", "Genesis 42:21", "Genesis 42:28"],
    questions: ["What prophecy was fulfilled when the brothers bowed before Joseph?", "Which brother was detained in Egypt as security for Benjamin's return?"]
  },
  "Genesis_43": {
    theme: "The Brothers Return to Egypt with Benjamin",
    summary: "As famine pressed heavily and the grain was consumed, Judah pledged his own life to convince Jacob to let Benjamin travel with them to Egypt. The brothers brought double the silver, gifts of honey, nuts, and spices, and Benjamin, and were brought into Joseph's private house where the steward reassured them and released Simeon. When Joseph saw his full brother Benjamin, his heart yearned so deeply that he wept in his private room before serving them a feast where Benjamin's portion was five times larger.",
    lesson: "God's heart is full of tender mercy toward those He is restoring, even before His full love is revealed.",
    key_verses: ["Genesis 43:9", "Genesis 43:29-30", "Genesis 43:34"],
    questions: ["Which brother stood surety for Benjamin's safety?", "How much larger was Benjamin's portion at Joseph's feast compared to the others?"]
  },
  "Genesis_44": {
    theme: "The Silver Cup and Judah's Intercession",
    summary: "Joseph instructed his house steward to fill the brothers' sacks with grain and place his personal silver cup into Benjamin's sack before sending them on their way. Soon after departure, Joseph's steward overtook them, searched their sacks starting from the eldest to the youngest, and discovered the cup in Benjamin's bag, causing them to tear their clothes and return in anguish. Before Joseph, Judah delivered an impassioned plea, recounting their father's grief and offering to become a permanent slave in place of Benjamin.",
    lesson: "True repentance is demonstrated when you sacrifice yourself to protect the very brother you once envied.",
    key_verses: ["Genesis 44:12", "Genesis 44:16", "Genesis 44:33-34"],
    questions: ["In whose sack was Joseph's silver cup discovered?", "What did Judah offer to do to ensure Benjamin returned safely to his father?"]
  },
  "Genesis_45": {
    theme: "Joseph Reveals His Identity",
    summary: "Overwhelmed by Judah's plea, Joseph could no longer control himself and commanded all Egyptian attendants to leave, weeping so loudly that all Egypt heard him. Joseph revealed his identity: 'I am Joseph! Is my father still living?' and comforted his terrified brothers, explaining that God had sent him ahead to preserve a remnant and save many lives. Pharaoh welcomed the news, provided carts and provisions, and the brothers returned to Canaan, where Jacob's spirit revived upon hearing Joseph was alive.",
    lesson: "God's providential hand weaves every trial into a grand design to bring salvation and preserve life.",
    key_verses: ["Genesis 45:3", "Genesis 45:5", "Genesis 45:7-8"],
    questions: ["How did Joseph explain the spiritual reason behind being sold into Egypt?", "How did Jacob react when he learned Joseph was ruler over all Egypt?"]
  },
  "Genesis_46": {
    theme: "Jacob's Journey to Egypt and Reunion",
    summary: "Israel set out with all he had and offered sacrifices to the God of his father Isaac at Beersheba, where God spoke in visions of the night: 'Do not be afraid to go down to Egypt, for I will make you into a great nation there.' Jacob journeyed to Egypt with his seventy direct descendants, livestock, and goods, sending Judah ahead to get directions to Goshen. When Joseph rode out in his chariot to meet his father, he embraced him and wept on his neck for a long time.",
    lesson: "Do not fear new seasons or journeys when God promises His presence will go with you and bring you through.",
    key_verses: ["Genesis 46:3-4", "Genesis 46:29-30"],
    questions: ["What assurance did God give Jacob at Beersheba before moving to Egypt?", "What did Jacob say to Joseph when they embraced after twenty-two years?"]
  },
  "Genesis_47": {
    theme: "Jacob in Goshen and Joseph's Administration",
    summary: "Joseph presented five of his brothers and his aged father Jacob before Pharaoh, and Jacob blessed Pharaoh, describing his 130 years as a pilgrimage. The Israelites settled in the fertile region of Goshen (Rameses) where they acquired property, were provided with food, and multiplied exceedingly. As famine worsened, Joseph gathered all the money, livestock, and land of Egypt for Pharaoh in exchange for bread, while Jacob made Joseph swear to bury him in the tomb of his fathers in Canaan.",
    lesson: "God sustains His people in times of economic famine, giving them favor and peace in foreign lands.",
    key_verses: ["Genesis 47:7", "Genesis 47:27", "Genesis 47:29-30"],
    questions: ["How old was Jacob when he blessed Pharaoh?", "What solemn promise did Jacob demand from Joseph regarding his burial?"]
  },
  "Genesis_48": {
    theme: "Jacob Blesses Ephraim and Manasseh",
    summary: "When Joseph was told his father was ill, he brought his two sons Manasseh and Ephraim to Jacob, who sat up on his bed and adopted them as his own sons on par with Reuben and Simeon. Joseph positioned Manasseh at Jacob's right hand and Ephraim at his left, but Jacob deliberately crossed his hands, placing his right hand upon the younger Ephraim. Despite Joseph's attempt to correct him, Jacob prophetically declared that Ephraim would be greater and become a multitude of nations.",
    lesson: "Spiritual blessings operate by God's sovereign choice and grace, not merely by natural human birth order.",
    key_verses: ["Genesis 48:14", "Genesis 48:19", "Genesis 48:21"],
    questions: ["Why did Jacob cross his hands when blessing Joseph's two sons?", "What did Jacob prophesy concerning the younger son Ephraim?"]
  },
  "Genesis_49": {
    theme: "Jacob's Prophecy over the Twelve Tribes",
    summary: "Jacob called his twelve sons together to hear prophetic declarations concerning what would happen to them in days to come. He rebuked Reuben for instability and Simeon and Levi for violence, but spoke majestic words over Judah: 'The sceptre shall not depart from Judah... until Shiloh come; and unto him shall the gathering of the people be.' After blessing Joseph as a fruitful bough and outlining the destinies of all twelve tribes, Jacob commanded them to bury him at Machpelah and breathed his last.",
    lesson: "God's prophetic word establishes the eternal reign of Christ (the Lion of Judah) who holds the eternal sceptre.",
    key_verses: ["Genesis 49:8-10", "Genesis 49:22", "Genesis 49:33"],
    questions: ["What eternal messianic promise was given to the tribe of Judah?", "Where did Jacob instruct all his sons to bury his body?"]
  },
  "Genesis_50": {
    theme: "Jacob's Burial and Joseph's Forgiveness",
    summary: "Joseph wept over his father, had Egyptian physicians embalm him for forty days, and led a massive funeral procession of chariots and elders up to Canaan to bury Jacob in the cave of Machpelah. After their father's death, Joseph's brothers feared he would finally take revenge, but Joseph wept and reassured them: 'You intended to harm me, but God intended it for good to accomplish what is now being done.' Joseph lived to see his great-grandchildren and died at 110 years old, prophesying the Exodus.",
    lesson: "What people intend for evil, God sovereignly turns into great good for the preservation of many souls.",
    key_verses: ["Genesis 50:19-20", "Genesis 50:24-25"],
    questions: ["What famous declaration did Joseph make to comfort his brothers?", "What dying command did Joseph give regarding his bones?"]
  }
};
