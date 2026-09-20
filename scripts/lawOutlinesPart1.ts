import fs from "fs";
import path from "path";
import { OT_LAW_DATA } from "./otLawData";
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

function loadBook(bookName: string) {
  let file = path.join("public/bible/kjv", `${bookName}.json`);
  if (!fs.existsSync(file)) {
    file = path.join("public/bible/kjv", `${bookName.toLowerCase().replace(/[^a-z0-9]/g, "_")}.json`);
  }
  return JSON.parse(fs.readFileSync(file, "utf-8"));
}

// Canonical outline catalog for Exodus 1-40, Leviticus 1-27, Numbers 1-36, Deuteronomy 1-34
export const LAW_OUTLINES: Record<string, { theme: string; summary: string; lesson: string; verses: number[]; q1: string; q2: string }> = {
  // EXODUS 1-40
  "Exodus_1": {
    theme: "Affliction of Israel and Faith of the Midwives",
    summary: "A new Pharaoh arose over Egypt who did not know Joseph and feared the multiplying Israelites, subjecting them to ruthless slave labor with mortar and brick. Pharaoh commanded Hebrew midwives Shiphrah and Puah to kill all newborn boys, but they feared God more than the king and let the boys live, for which God established their households. Pharaoh then commanded his entire nation to cast every newborn Hebrew boy into the Nile River.",
    lesson: "When civil authorities demand what contradicts God's righteousness, fear God rather than man and trust His protection.",
    verses: [12, 17, 20],
    q1: "Why did the Hebrew midwives disobey Pharaoh's command to kill baby boys?",
    q2: "How did God reward the faith of the midwives?"
  },
  "Exodus_2": {
    theme: "Birth of Moses and Flight to Midian",
    summary: "A Levite woman named Jochebed hid her infant son for three months and then placed him in a papyrus basket among the reeds along the bank of the Nile. Pharaoh's daughter discovered the weeping child, had compassion on him, and hired his own mother to nurse him before adopting him as Moses. Growing up, Moses killed an Egyptian beating a Hebrew, was rejected by his brethren, fled from Pharaoh to Midian, and married Zipporah after defending Jethro's daughters.",
    lesson: "God sovereignly preserves your life in dangerous seasons and prepares you in the wilderness for your future calling.",
    verses: [2, 10, 24],
    q1: "How did Pharaoh's daughter end up adopting Moses as her son?",
    q2: "Why did Moses flee from Egypt to Midian?"
  },
  "Exodus_3": {
    theme: "The Burning Bush and the Holy Name I AM",
    summary: "Moses was tending the flock of his father-in-law Jethro at Mount Horeb when the angel of the Lord appeared to him in flames of fire from within a bush that burned without being consumed. God called Moses by name, commanded him to remove his sandals on holy ground, and declared He had seen the affliction of His people and was sending Moses to Pharaoh. When Moses asked for God's name, the Lord revealed His eternal covenant name: 'I AM WHO I AM.'",
    lesson: "Holy encounters with God require reverent surrender, and the eternal 'I AM' empowers you to fulfill His divine mission.",
    verses: [5, 7, 14],
    q1: "Why did God tell Moses to take off his sandals at the burning bush?",
    q2: "What eternal name did God reveal to Moses to give to the children of Israel?"
  },
  "Exodus_4": {
    theme: "Miraculous Signs and Moses Returns to Egypt",
    summary: "Moses questioned whether the people would believe him, so God gave him three signs: his staff turning into a serpent, his hand becoming leprous and restored, and water turning to blood. When Moses pleaded that he was slow of speech, the Lord became angry at his hesitation but appointed his brother Aaron to serve as his spokesman. Moses took his wife and sons, returned to Egypt with the staff of God in his hand, and the elders of Israel believed and bowed down in worship.",
    lesson: "Stop focusing on your inadequacies; God equips whoever He calls and demonstrates His power through surrendered vessels.",
    verses: [2, 11-12, 31],
    q1: "What three signs did God give Moses to prove his divine calling?",
    q2: "Who was appointed to assist Moses as his spokesman before the people?"
  },
  "Exodus_5": {
    theme: "Bricks Without Straw and Israel's Increased Burden",
    summary: "Moses and Aaron appeared before Pharaoh demanding, 'This is what the Lord says: Let My people go,' but Pharaoh defiantly replied, 'Who is the Lord that I should obey Him?' Pharaoh increased Israel's daily quota of bricks while requiring them to gather their own straw from the fields, beating the Hebrew foremen when quotas were not met. The discouraged foremen blamed Moses and Aaron, causing Moses to return to the Lord and ask why He had brought such trouble upon the people.",
    lesson: "Circumstances often appear to worsen before God's mighty deliverance breaks through; do not lose faith in the wait.",
    verses: [2, 7, 22-23],
    q1: "What was Pharaoh's defiant response when Moses and Aaron commanded him to release Israel?",
    q2: "How did Pharaoh increase the hardship of the Hebrew slaves?"
  },
  "Exodus_6": {
    theme: "God Renews the Covenant of Deliverance",
    summary: "The Lord told Moses, 'Now you will see what I will do to Pharaoh,' and reminded him of His covenant name Jehovah, which Abraham, Isaac, and Jacob had not known in its full redemptive expression. God promised seven great 'I will' statements: to bring them out, rescue them, redeem them with an outstretched arm, take them as His people, be their God, bring them into the land, and give it to them as an inheritance. Moses spoke this to the Israelites, but they did not listen due to their broken spirit.",
    lesson: "God's redemptive promises are anchored in His unchanging character, not in the fluctuating feelings of people.",
    verses: [2-3, 6-8],
    q1: "What seven promises did God declare to Israel in Exodus 6:6-8?",
    q2: "Why were the children of Israel unable to listen to Moses at this time?"
  },
  "Exodus_7": {
    theme: "Aaron's Staff and the Plague of Blood",
    summary: "The Lord made Moses like God to Pharaoh and Aaron his prophet, warning that Pharaoh's heart would be hardened to multiply divine wonders in Egypt. Aaron cast down his staff before Pharaoh and it became a serpent, and when Egyptian magicians replicated it with their secret arts, Aaron's staff swallowed up their staffs. Moses and Aaron struck the waters of the Nile with the staff in Pharaoh's sight, turning all rivers, streams, and ponds into blood, killing the fish and leaving no water to drink.",
    lesson: "God's supremacy swallows up every counterfeit power of darkness and brings judgment on false gods.",
    verses: [10, 12, 20],
    q1: "What happened when Aaron's staff turned into a serpent before Pharaoh?",
    q2: "What was the first plague poured out upon Egypt?"
  },
  "Exodus_8": {
    theme: "Plagues of Frogs, Gnats, and Flies",
    summary: "Pharaoh refused to let Israel go, so God sent swarms of frogs that covered houses, bedrooms, beds, and ovens until Pharaoh pleaded for prayer, yet hardened his heart as soon as relief came. Next, Aaron struck the dust of the earth and it became gnats on man and beast, which the magicians could not duplicate, confessing, 'This is the finger of God.' God then sent dense swarms of flies throughout Egypt while completely sparing the land of Goshen, demonstrating His distinction between His people and the Egyptians.",
    lesson: "God puts a divine boundary of protection around His people even when judgment falls on the surrounding land.",
    verses: [10, 19, 22-23],
    q1: "What did the Egyptian magicians confess when they could not replicate the plague of gnats?",
    q2: "How did God make a distinction between Egypt and Goshen during the plague of flies?"
  },
  "Exodus_9": {
    theme: "Plagues on Livestock, Boils, and Hail",
    summary: "The Lord struck Egypt's horses, donkeys, camels, cattle, and sheep with a severe pestilence while not a single animal belonging to Israel died. Moses and Aaron then threw soot from a furnace into the air, producing festering boils on Egyptians and their beasts, leaving the magicians unable to stand before Moses. Finally, God sent catastrophic hail mingled with flashing fire that destroyed every person, animal, and crop left in the open fields, while no hail fell in Goshen.",
    lesson: "Pride and stubbornness bring devastating destruction; those who revere God's warnings find shelter from the storm.",
    verses: [6, 16, 26],
    q1: "What difference occurred between Egyptian livestock and Israelite livestock?",
    q2: "What unique weather phenomenon took place during the plague of hail?"
  },
  "Exodus_10": {
    theme: "Plagues of Locusts and Thick Darkness",
    summary: "Pharaoh's officials begged him to let the Hebrews go before Egypt was ruined, but Pharaoh offered only compromise, allowing only the men to leave. God brought an east wind that carried swarms of locusts that devoured every green tree and leaf remaining after the hail, covering the face of the ground. Next, Moses stretched out his hand toward heaven and total, palpable darkness covered all Egypt for three days so that no one could move, while all the Israelites had light in their dwellings.",
    lesson: "Do not compromise with the enemy; serve the Lord with your whole household and walk in divine light amid worldly darkness.",
    verses: [14-15, 22-23, 28-29],
    q1: "How dense and prolonged was the plague of darkness over Egypt?",
    q2: "What compromise did Pharaoh propose that Moses steadfastly rejected?"
  },
  "Exodus_11": {
    theme: "Warning of the Final Plague on the Firstborn",
    summary: "The Lord informed Moses that one final plague would fall upon Pharaoh and Egypt, after which Pharaoh would drive the Israelites out completely. God instructed the people to ask their Egyptian neighbors for articles of silver and gold, and the Lord gave the Hebrews great favor in the eyes of the Egyptians, who respected Moses highly. Moses warned Pharaoh that about midnight the Lord would pass through Egypt, and every firstborn from Pharaoh's heir to the captive in the dungeon and the cattle would die.",
    lesson: "God's ultimate judgment on unrepentant wickedness vindicates His afflicted people and commands solemn reverence.",
    verses: [3, 5, 7],
    q1: "What final plague did Moses announce to Pharaoh?",
    q2: "What favor did God grant the Israelites among their Egyptian neighbors?"
  },
  "Exodus_12": {
    theme: "The First Passover and the Midnight Deliverance",
    summary: "God instituted the Passover as the beginning of months for Israel, commanding every household to take a spotless lamb, slaughter it at twilight, and apply its blood to their doorposts and lintel. The people roasted the lamb, ate it with unleavened bread and bitter herbs with sandals on and staff in hand, and when the Lord struck the firstborn of Egypt at midnight, He passed over the blood-marked houses. Pharaoh arose in the night, urged Israel to leave immediately, and 600,000 men on foot journeyed out after 430 years.",
    lesson: "The blood of the Lamb is your divine shield of redemption and safety from judgment; when God sees the blood, He passes over.",
    verses: [13, 23, 29-31],
    q1: "What instructions were given for applying the lamb's blood to the houses?",
    q2: "What happened throughout Egypt at midnight on the night of the Passover?"
  },
  "Exodus_13": {
    theme: "Consecration of the Firstborn and Pillars of Cloud and Fire",
    summary: "The Lord commanded Moses to consecrate every firstborn male of man and beast to Him as a perpetual reminder of how His mighty hand brought them out of Egyptian slavery. God did not lead the Israelites along the direct route through Philistine territory lest they face war and return to Egypt, but led them by the desert road toward the Red Sea. Moses carried the bones of Joseph according to his ancient oath, and the Lord went before them in a pillar of cloud by day and a pillar of fire by night.",
    lesson: "Consecrate your first and best to God, and follow His supernatural guidance step by step day and night.",
    verses: [2, 19, 21-22],
    q1: "Why did God lead Israel along the desert route rather than through Philistine territory?",
    q2: "How did the Lord guide Israel on their journey day and night?"
  },
  "Exodus_14": {
    theme: "Parting of the Red Sea",
    summary: "Pharaoh realized the slaves were gone, mobilized six hundred choice chariots and all his army, and trapped the trembling Israelites against the shores of the Red Sea. Moses urged the terrified people, 'Fear not, stand still, and see the salvation of the Lord... The Lord will fight for you, and you shall hold your peace.' God told Moses to lift his rod, sent a strong east wind that divided the sea into walls of water on their right and left, and allowed Israel to cross on dry ground while drowning Pharaoh's army.",
    lesson: "When you are backed into a corner with no way out, stand still in faith and watch God part your Red Sea.",
    verses: [13-14, 21-22, 30-31],
    q1: "What famous encouragement did Moses give the terrified Israelites at the Red Sea?",
    q2: "How did God use Moses' staff and an east wind to deliver His people?"
  },
  "Exodus_15": {
    theme: "The Song of Moses and Bitter Waters Made Sweet",
    summary: "Moses and the children of Israel sang a majestic hymn of praise to the Lord, rejoicing, 'The Lord is my strength and my song, and He has become my salvation.' Miriam the prophetess took a tambourine and led all the women in dancing and singing of Pharaoh's chariots cast into the depths. Three days later in the desert of Shur they reached Marah but could not drink its bitter waters, so Moses cried out to God, who showed him a tree to throw into the water to make it sweet, revealing Himself as Jehovah Rapha.",
    lesson: "God heals the bitter seasons of life and reveals Himself as the Lord your Healer when you follow His voice.",
    verses: [2, 11, 25-26],
    q1: "Who led the women in singing and dancing with tambourines by the sea?",
    q2: "What covenant name of divine healing did God reveal at Marah?"
  },
  "Exodus_16": {
    theme: "Bread from Heaven (Manna) and Quail",
    summary: "The Israelites entered the Wilderness of Sin and grumbled against Moses and Aaron, longing for the meat-pots and abundance of bread in Egypt. The Lord said to Moses, 'Behold, I will rain bread from heaven for you,' sending quails in the evening to cover the camp and white flaky manna like coriander seed on the ground every morning. The people gathered daily what was needed, rested on the holy Sabbath with a double portion collected on the sixth day, and kept a pot of manna as a memorial.",
    lesson: "God provides daily bread for all your needs, training your heart to walk in trust and honor His holy Sabbath.",
    verses: [4, 15, 31-33],
    q1: "What did the Israelites call the bread that fell from heaven each morning?",
    q2: "How did God provide for the Sabbath day without manna falling?"
  },
  "Exodus_17": {
    theme: "Water from the Rock and Victory over Amalek",
    summary: "At Rephidim the people found no water to drink and quarreled with Moses, prompting him to cry out to God, who commanded him to strike the rock at Horeb before the elders to bring forth streams of water. Then Amalek came and attacked Israel at Rephidim, so Joshua led the warriors into battle while Moses, Aaron, and Hur stood on top of the hill. As long as Moses held up his hands with God's staff Israel prevailed, and Aaron and Hur supported his hands until sunset, where Moses built an altar called Jehovah Nissi.",
    lesson: "In spiritual warfare, supportive intercession holds up weary hands until the Lord gives full victory as our Banner.",
    verses: [6, 11-12, 15],
    q1: "How did Aaron and Hur assist Moses during the battle against Amalek?",
    q2: "What name did Moses give to the altar of victory at Rephidim?"
  },
  "Exodus_18": {
    theme: "Jethro's Wise Counsel on Delegation",
    summary: "Jethro the priest of Midian brought Moses' wife Zipporah and his two sons Gershom and Eliezer back to Moses in the wilderness, rejoicing over all the Lord had done in delivering Israel from Egypt. Jethro observed Moses sitting from morning till evening judging all the people's disputes alone, and warned him that he and the people would wear themselves out. Jethro advised Moses to remain the people's advocate before God but appoint capable, God-fearing, trustworthy leaders over thousands, hundreds, fifties, and tens to share the burden.",
    lesson: "Wise delegation and shared leadership prevent burnout and empower the entire community to thrive in peace.",
    verses: [9, 17-18, 21-22],
    q1: "What did Jethro notice Moses doing that caused him to offer practical counsel?",
    q2: "What qualifications did Jethro outline for leaders appointed over thousands and hundreds?"
  },
  "Exodus_19": {
    theme: "The Lord's Descent on Mount Sinai",
    summary: "Three months after leaving Egypt, Israel camped in the desert in front of Mount Sinai, where God invited them to be His treasured possession, a kingdom of priests, and a holy nation if they obeyed His covenant. The people consecrated themselves, washed their clothes, and set boundaries around the mountain because whoever touched it would surely die. On the third day, thunder, lightning, a thick cloud, and a blast of a ram's horn sounded as Mount Sinai was wrapped in smoke because the Lord descended in fire.",
    lesson: "God calls you into a holy covenant relationship; approach His majesty with consecration, awe, and reverence.",
    verses: [5-6, 16, 18-19],
    q1: "What special identity did God promise Israel if they kept His covenant?",
    q2: "What physical signs accompanied the Lord's descent upon Mount Sinai?"
  },
  "Exodus_20": {
    theme: "The Ten Commandments Given at Sinai",
    summary: "God spoke the Ten Commandments directly from the mountain: no other gods, no graven images, no taking God's name in vain, remembering the Sabbath day to keep it holy, honoring father and mother, and prohibitions against murder, adultery, stealing, bearing false witness, and coveting. The people trembled at the thunder, lightning, sound of the trumpet, and smoking mountain, asking Moses to speak to them rather than God directly lest they die. Moses reassured them that God had come to test them so the fear of God would keep them from sinning.",
    lesson: "God's moral law reflects His holy character and provides the timeless foundation for loving God and loving your neighbor.",
    verses: [2-3, 12, 18-20],
    q1: "What is the first commandment given by God in Exodus 20?",
    q2: "Why were the people afraid when they heard God speaking from Mount Sinai?"
  }
};
