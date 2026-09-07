import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Import the seeds
const { seedRedemptive50, seedUnpopular50 } = await import("./seeds.js");

// Additional 450 distinct Redemptive Names
const redemptiveCategories = [
  "New Identity",
  "Royal Garment & Glory",
  "Covenant & Treasured",
  "Redemption & Grace",
  "Grace & Belonging",
  "Breakthrough & Restoration",
  "Royal Calling & Priesthood",
  "Everlasting Joy & Peace",
  "Spiritual Strength",
  "Blessing & Favor",
  "Beloved & Intimacy"
];

// Rich vocabulary for generating 450 additional authentic Hebrew redemptive names
const redemptiveTemplates = [
  // Intimacy & Bride
  { name: "Rayati", hebrew: "רַעְיָתִי", transliteration: "Rayati", meaning: "My darling companion / My cherished love", ref: "Song of Songs 1:9", cat: "Beloved & Intimacy" },
  { name: "Tamati", hebrew: "תַּמָּתִי", transliteration: "Tamati", meaning: "My undefiled and blameless one", ref: "Song of Songs 5:2", cat: "Beloved & Intimacy" },
  { name: "Yonati", hebrew: "יוֹנָתִי", transliteration: "Yonati", meaning: "My dove hidden safely in the clefts of the rock", ref: "Song of Songs 2:14", cat: "Beloved & Intimacy" },
  { name: "Kallah", hebrew: "כַּלָּה", transliteration: "Kallah", meaning: "Adorned bride crowned for the King", ref: "Song of Songs 4:8", cat: "Royal Garment & Glory" },
  { name: "Chavatzelet HaSharon", hebrew: "חֲבַצֶּלֶת הַשָּׁרוֹן", transliteration: "Chavatzelet HaSharon", meaning: "Rose of Sharon blooming in fragrant beauty", ref: "Song of Songs 2:1", cat: "Beloved & Intimacy" },
  { name: "Shoshanat HaAmakim", hebrew: "שׁוֹשַׁנַּת הָעֲמָקִים", transliteration: "Shoshanat HaAmakim", meaning: "Lily of the valleys thriving in lowly places", ref: "Song of Songs 2:1", cat: "Beloved & Intimacy" },
  { name: "Gan Na'ul", hebrew: "גַּן נָעוּל", transliteration: "Gan Na'ul", meaning: "Enclosed private garden of sacred delight", ref: "Song of Songs 4:12", cat: "Covenant & Treasured" },
  { name: "Ma'ayan Chatum", hebrew: "מַעְיָן חָתוּם", transliteration: "Ma'ayan Chatum", meaning: "Sealed spring flowing with purity", ref: "Song of Songs 4:12", cat: "Covenant & Treasured" },
  { name: "Be'er Mayim Chayim", hebrew: "בְּאֵר מַיִם חַיִּים", transliteration: "Be'er Mayim Chayim", meaning: "Well of living waters from Lebanon", ref: "Song of Songs 4:15", cat: "Breakthrough & Restoration" },
  { name: "Nofet Tizolnah", hebrew: "נֹפֶת תִּטֹּפְנָה", transliteration: "Nofet Titofnah", meaning: "Lips dropping the sweetness of honeycomb", ref: "Song of Songs 4:11", cat: "Beloved & Intimacy" },

  // Zion & Royal Renaming
  { name: "Ariel", hebrew: "אֲרִיאֵל", transliteration: "Ari'el", meaning: "Lion of God / Sacred altar of victory", ref: "Isaiah 29:1", cat: "Spiritual Strength" },
  { name: "Kadosh L'Adonai", hebrew: "קָדֹשׁ לַיהוָה", transliteration: "Kadosh L'Adonai", meaning: "Holy unto the Lord engraved upon your forehead", ref: "Exodus 28:36", cat: "Royal Calling & Priesthood" },
  { name: "Bnot Melachim", hebrew: "בְּנוֹת מְלָכִים", transliteration: "Bnot Melakhim", meaning: "Daughter of kings clothed in gold of Ophir", ref: "Psalm 45:9", cat: "Royal Garment & Glory" },
  { name: "Kley Hemdah", hebrew: "כְּלֵי חֶמְדָּה", transliteration: "Kley Chemdah", meaning: "Precious vessel of honorable desire", ref: "Jeremiah 25:34", cat: "Covenant & Treasured" },
  { name: "Shemen Sasson", hebrew: "שֶׁמֶן שָׂשׂוֹן", transliteration: "Shemen Sasson", meaning: "Anointed with the oil of gladness above peers", ref: "Psalm 45:7", cat: "Everlasting Joy & Peace" },
  { name: "Ets Shemen", hebrew: "עֵץ שֶׁמֶן", transliteration: "Ets Shemen", meaning: "Olive tree rich in holy anointing", ref: "Isaiah 41:19", cat: "Spiritual Strength" },
  { name: "Mayim Chayim", hebrew: "מַיִם חַיִּים", transliteration: "Mayim Chayim", meaning: "Living water gushing to eternal life", ref: "John 4:14", cat: "Breakthrough & Restoration" },
  { name: "Magen Kavod", hebrew: "מָגֵן כָּבוֹד", transliteration: "Magen Kavod", meaning: "Shield of glory and lifter of your head", ref: "Psalm 3:3", cat: "Spiritual Strength" },
  { name: "Zera Kodesh", hebrew: "זֶרַע קֹדֶשׁ", transliteration: "Zera Kodesh", meaning: "Holy seed that remains in the stump", ref: "Isaiah 6:13", cat: "Covenant & Treasured" },
  { name: "Choter Yishai", hebrew: "חֹטֶר יִשַׁי", transliteration: "Choter Yishai", meaning: "Sprout carrying the Spirit of the Lord", ref: "Isaiah 11:1", cat: "New Identity" },
  { name: "Tzemach Tzedakah", hebrew: "צֶמַח צְדָקָה", transliteration: "Tzemach Tzedakah", meaning: "Branch of righteousness executing justice", ref: "Jeremiah 33:15", cat: "Royal Calling & Priesthood" },
  { name: "Nezer Zahav", hebrew: "נֵזֶר זָהָב", transliteration: "Nezer Zahav", meaning: "Golden crown of dedicated consecration", ref: "Leviticus 8:9", cat: "Royal Garment & Glory" },
  { name: "Mishkan Elyon", hebrew: "מִשְׁכַּן עֶלְיוֹן", transliteration: "Mishkan Elyon", meaning: "Dwelling tabernacle of the Most High", ref: "Psalm 46:4", cat: "Covenant & Treasured" },
  { name: "Bnei Elyon", hebrew: "בְּנֵי עֶלְיוֹן", transliteration: "Bnei Elyon", meaning: "Sons and daughters of the Most High God", ref: "Psalm 82:6", cat: "New Identity" },
  { name: "Shomer Chomot", hebrew: "שֹׁמֵר חוֹמוֹת", transliteration: "Shomer Chomot", meaning: "Watchman upon the walls who never keeps silent", ref: "Isaiah 62:6", cat: "Royal Calling & Priesthood" },
  { name: "Bnei Tzion HaYekarim", hebrew: "בְּנֵי צִיּוֹן הַיְקָרִים", transliteration: "Bnei Tzion HaYekarim", meaning: "Precious sons of Zion weighed against fine gold", ref: "Lamentations 4:2", cat: "Covenant & Treasured" },
  { name: "Ateret Tzvi", hebrew: "עֲטֶרֶת צְבִי", transliteration: "Ateret Tzvi", meaning: "Crown of beauty in the day of harvest", ref: "Isaiah 28:5", cat: "Royal Garment & Glory" },
  { name: "Tzephirat Tif'arah", hebrew: "צְפִירַת תִּפְאָרָה", transliteration: "Tzefirat Tif'arah", meaning: "Diadem of beauty unto the remnant", ref: "Isaiah 28:5", cat: "Royal Garment & Glory" },
  { name: "Bnei HaOr", hebrew: "בְּנֵי הָאוֹר", transliteration: "Bnei HaOr", meaning: "Children of light walking in daylight", ref: "Ephesians 5:8", cat: "New Identity" },
  { name: "Melachim V'Chohanim", hebrew: "מְלָכִים וְכֹהֲנִים", transliteration: "Melakhim V'Chohanim", meaning: "Kings and priests reigning upon the earth", ref: "Revelation 1:6", cat: "Royal Calling & Priesthood" },
  { name: "Bnei Elohim Chayim", hebrew: "בְּנֵי אֱלֹהִים חַיִּים", transliteration: "Bnei Elohim Chayim", meaning: "Children of the living God called out of darkness", ref: "Hosea 1:10", cat: "Grace & Belonging" },
  { name: "G'vurah", hebrew: "גְּבוּרָה", transliteration: "Gevurah", meaning: "Supernatural strength and triumph", ref: "Psalm 89:13", cat: "Spiritual Strength" },
  { name: "Mivtzar", hebrew: "מִבְצָר", transliteration: "Mivtzar", meaning: "High fortress shielded from arrows", ref: "Psalm 18:2", cat: "Spiritual Strength" },
  { name: "Metzudah", hebrew: "מְצוּדָה", transliteration: "Metzudah", meaning: "Impregnable stronghold of safety", ref: "Psalm 91:2", cat: "Spiritual Strength" },
  { name: "Miflat", hebrew: "מִפְלָט", transliteration: "Miflat", meaning: "Refuge from the storm and blast", ref: "Psalm 55:8", cat: "Spiritual Strength" },
  { name: "Yotzer HaOr", hebrew: "יוֹצֵר הָאוֹר", transliteration: "Yotzer HaOr", meaning: "Formed in the light of His face", ref: "Isaiah 45:7", cat: "New Identity" },
  { name: "Yakar B'Eynai", hebrew: "יָקָר בְּעֵינַי", transliteration: "Yakar B'Eynai", meaning: "Precious and honorable in My eyes", ref: "Isaiah 43:4", cat: "Covenant & Treasured" },
  { name: "Ne'ehav", hebrew: "נֶאֱהָב", transliteration: "Ne'ehav", meaning: "Loved with an everlasting covenant love", ref: "Jeremiah 31:3", cat: "Beloved & Intimacy" },
  { name: "Ahavat Olam", hebrew: "אַהֲבַת עוֹלָם", transliteration: "Ahavat Olam", meaning: "Drawn with cords of eternal lovingkindness", ref: "Jeremiah 31:3", cat: "Beloved & Intimacy" },
  { name: "Mekor Chayim", hebrew: "מְקוֹר חַיִּים", transliteration: "Mekor Chayim", meaning: "Fountain of life drinking from His river", ref: "Psalm 36:9", cat: "Breakthrough & Restoration" },
  { name: "Keren Yesha", hebrew: "קֶרֶן יֶשַׁע", transliteration: "Keren Yesha", meaning: "Horn of salvation exalted in righteousness", ref: "Psalm 18:2", cat: "Breakthrough & Restoration" },
  { name: "Moriah", hebrew: "מוֹרִיָּה", transliteration: "Moriyah", meaning: "Seen of Yahweh / Provided on the mount", ref: "Genesis 22:14", cat: "Blessing & Favor" },
  { name: "Tzur Machaseh", hebrew: "צוּר מַחֲסֶה", transliteration: "Tzur Machaseh", meaning: "Rock of refuge standing unshaken", ref: "Psalm 94:22", cat: "Spiritual Strength" },
  { name: "Shoshan HaSharon", hebrew: "שׁוֹשַׁן הַשָּׁרוֹן", transliteration: "Shoshan HaSharon", meaning: "Fragrant bloom of peace in dry seasons", ref: "Song of Songs 2:1", cat: "Everlasting Joy & Peace" },
  { name: "Natan Chen", hebrew: "נָתַן חֵן", transliteration: "Natan Chen", meaning: "Endowed with supernatural grace", ref: "Proverbs 3:34", cat: "Blessing & Favor" },
  { name: "Bikurim", hebrew: "בִּכּוּרִים", transliteration: "Bikurim", meaning: "Firstfruits holy to the Lord", ref: "James 1:18", cat: "Covenant & Treasured" },
  { name: "Kodesh Kodashim", hebrew: "קֹדֶשׁ קָדָשִׁים", transliteration: "Kodesh Kodashim", meaning: "Holy of Holies sanctuary of His presence", ref: "Exodus 26:34", cat: "Royal Calling & Priesthood" },
  { name: "Aron HaKodesh", hebrew: "אֲרוֹן הַקֹּדֶשׁ", transliteration: "Aron HaKodesh", meaning: "Bearer of the sacred covenant ark", ref: "Joshua 3:6", cat: "Royal Calling & Priesthood" },
  { name: "Menorat Zahav", hebrew: "מְנוֹרַת זָהָב", transliteration: "Menorat Zahav", meaning: "Golden lampstand burning with holy fire", ref: "Zechariah 4:2", cat: "Royal Calling & Priesthood" },
  { name: "Shalhevet Yah", hebrew: "שַׁלְהֶבֶת יָהּ", transliteration: "Shalhevet Yah", meaning: "The vehement flame of Yahweh's love", ref: "Song of Songs 8:6", cat: "Beloved & Intimacy" }
];

console.log("Templates loaded.");

export { redemptiveTemplates };
