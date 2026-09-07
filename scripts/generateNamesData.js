// Script to generate:
// 1. src/data/shemotGeulahNamesData.ts (500 Redemptive Names God Calls You)
// 2. src/data/unpopularBiblicalNamesData.ts (500 Unpopular Real Biblical Figures with Names of Blessing)

import fs from "fs";
import path from "path";

// --- PART 1: 500 SHEMOT GEULAH (Redemptive Names) ---
console.log("Generating 500 Shemot Geulah and 500 Unpopular Names...");

// Seed array of initial 50 provided by user
const initialShemot50 = [
  { name: "Hephzibah", hebrew: "חֶפְצִי־בָהּ", transliteration: "Cheftsi-bah", meaning: "My delight is in her", ref: "Isaiah 62:4", cat: "New Identity" },
  { name: "Beulah", hebrew: "בְּעוּלָה", transliteration: "Be'ulah", meaning: "Married / Espoused", ref: "Isaiah 62:4", cat: "New Identity" },
  { name: "Derushah", hebrew: "דְּרוּשָׁה", transliteration: "Derushah", meaning: "Sought after / Greatly desired", ref: "Isaiah 62:12", cat: "New Identity" },
  { name: "Ir Lo Ne'ezavah", hebrew: "עִיר לֹא נֶעֱזָבָה", transliteration: "Ir Lo Ne'ezavah", meaning: "City not forsaken / Never abandoned", ref: "Isaiah 62:12", cat: "New Identity" },
  { name: "Shem Chadash", hebrew: "שֵׁם חָדָשׁ", transliteration: "Shem Chadash", meaning: "A new prophetic name", ref: "Isaiah 62:2", cat: "New Identity" },
  { name: "Ateret Tiferet", hebrew: "עֲטֶרֶת תִּפְאֶרֶת", transliteration: "Ateret Tiferet", meaning: "Crown of glory in the Lord's hand", ref: "Isaiah 62:3", cat: "Royal Garment & Glory" },
  { name: "Tsenif Melukhah", hebrew: "צְנִיף מְלוּכָה", transliteration: "Tsenif Melukhah", meaning: "Royal diadem / Kingly turban", ref: "Isaiah 62:3", cat: "Royal Garment & Glory" },
  { name: "Am HaKodesh", hebrew: "עַם־הַקֹּדֶשׁ", transliteration: "Am HaKodesh", meaning: "The Holy People", ref: "Isaiah 62:12", cat: "Covenant & Treasured" },
  { name: "Ge'ulah", hebrew: "גְּאוּלָה", transliteration: "Ge'ulah", meaning: "Redeemed / Bought with a price", ref: "Isaiah 62:12", cat: "Redemption & Grace" },
  { name: "Ammi", hebrew: "עַמִּי", transliteration: "Ammi", meaning: "My people / Belonging to God", ref: "Hosea 2:1, 2:23", cat: "Grace & Belonging" },
  { name: "Ruhamah", hebrew: "רֻחָמָה", transliteration: "Ruhamah", meaning: "You have obtained mercy / Tenderly loved", ref: "Hosea 2:1, 2:23", cat: "Grace & Belonging" },
  { name: "Yizre'el", hebrew: "יִזְרְעֶאל", transliteration: "Yizre'el", meaning: "God will sow / Plant you fruitful again", ref: "Hosea 2:22-23", cat: "Breakthrough & Restoration" },
  { name: "Kohanei Adonai", hebrew: "כֹּהֲנֵי יְהוָה", transliteration: "Kohanei Adonai", meaning: "Priests of the Lord", ref: "Isaiah 61:6", cat: "Royal Calling & Priesthood" },
  { name: "Mesharetei Eloheinu", hebrew: "מְשָׁרְתֵי אֱלֹהֵינוּ", transliteration: "Mesharetei Eloheinu", meaning: "Ministers of our God", ref: "Isaiah 61:6", cat: "Royal Calling & Priesthood" },
  { name: "Mishneh", hebrew: "מִשְׁנֶה", transliteration: "Mishneh", meaning: "Double portion of honor for former shame", ref: "Isaiah 61:7", cat: "Breakthrough & Restoration" },
  { name: "Simchat Olam", hebrew: "שִׂמְחַת עוֹלָם", transliteration: "Simchat Olam", meaning: "Everlasting joy upon your head", ref: "Isaiah 61:7", cat: "Everlasting Joy & Peace" },
  { name: "Zera Berakh Adonai", hebrew: "זֶרַע בֵּרַךְ יְהוָה", transliteration: "Zera Berakh Adonai", meaning: "Offspring whom the Lord has blessed", ref: "Isaiah 61:9", cat: "Covenant & Treasured" },
  { name: "Ma'ateh Tehillah", hebrew: "מַעֲטֵה תְהִלָּה", transliteration: "Ma'ateh Tehillah", meaning: "Garment of praise for spirit of heaviness", ref: "Isaiah 61:3", cat: "Royal Garment & Glory" },
  { name: "Levush Tsedakah", hebrew: "לְבוּשׁ צְדָקָה", transliteration: "Levush Tsedakah", meaning: "Clothed with the robe of righteousness", ref: "Isaiah 61:10", cat: "Royal Garment & Glory" },
  { name: "Eilei HaTsedek", hebrew: "אֵילֵי הַצֶּדֶק", transliteration: "Eilei HaTsedek", meaning: "Oaks of righteousness / Planting of the Lord", ref: "Isaiah 61:3", cat: "Spiritual Strength" },
  { name: "Boney Choravot", hebrew: "בּוֹנֵי חֳרָבוֹת", transliteration: "Boney Choravot", meaning: "Rebuilders of ancient ruins", ref: "Isaiah 61:4", cat: "Breakthrough & Restoration" },
  { name: "Segulah", hebrew: "סְגֻלָּה", transliteration: "Segulah", meaning: "Treasured personal possession of Yahweh", ref: "Exodus 19:5", cat: "Covenant & Treasured" },
  { name: "Chemla", hebrew: "חֶמְלָה", transliteration: "Chemla", meaning: "Spared / Object of divine compassion", ref: "Isaiah 63:9", cat: "Redemption & Grace" },
  { name: "Cheftsa", hebrew: "חֶפְצָה", transliteration: "Cheftsa", meaning: "Delightsome land and soul", ref: "Malachi 3:12", cat: "New Identity" },
  { name: "Yedid Adonai", hebrew: "יְדִיד יְהוָה", transliteration: "Yedid Adonai", meaning: "Beloved friend of the Lord", ref: "Deuteronomy 33:12", cat: "Beloved & Intimacy" },
  { name: "Berukhah", hebrew: "בְּרוּכָה", transliteration: "Berukhah", meaning: "Blessed woman above women", ref: "Judges 5:24", cat: "Blessing & Favor" },
  { name: "Berukh", hebrew: "בָּרוּךְ", transliteration: "Barukh", meaning: "Blessed man planted by living waters", ref: "Jeremiah 17:7", cat: "Blessing & Favor" },
  { name: "Shalva", hebrew: "שַׁלְוָה", transliteration: "Shalva", meaning: "Peaceful, secure and quiet tranquil soul", ref: "Psalm 122:7", cat: "Everlasting Joy & Peace" },
  { name: "Menuchah", hebrew: "מְנוּחָה", transliteration: "Menuchah", meaning: "Resting place of divine glory", ref: "Psalm 132:14", cat: "Everlasting Joy & Peace" },
  { name: "Nachalat Adonai", hebrew: "נַחֲלַת יְהוָה", transliteration: "Nachalat Adonai", meaning: "Inheritance and heritage of the Lord", ref: "Psalm 33:12", cat: "Covenant & Treasured" },
  { name: "Peretz", hebrew: "פֶּרֶץ", transliteration: "Peretz", meaning: "Breakthrough that bursts all barriers", ref: "Micah 2:13", cat: "Breakthrough & Restoration" },
  { name: "Rechavah", hebrew: "רְחָבָה", transliteration: "Rechavah", meaning: "Enlarged room / Made fruitful in the land", ref: "Genesis 26:22", cat: "Breakthrough & Restoration" },
  { name: "Merachefet", hebrew: "מְרַחֶפֶת", transliteration: "Merachefet", meaning: "Carried on eagle's wings of the Spirit", ref: "Deuteronomy 32:11", cat: "Spiritual Strength" },
  { name: "Natzar Elohim", hebrew: "נֵצֶר אֱלֹהִים", transliteration: "Natzar Elohim", meaning: "Branch of God's fruitful planting", ref: "Isaiah 60:21", cat: "New Identity" },
  { name: "Ma'aseh Yadai", hebrew: "מַעֲשֵׂה יָדַי", transliteration: "Ma'aseh Yadai", meaning: "Masterpiece work of My own hands", ref: "Isaiah 60:21", cat: "New Identity" },
  { name: "Or Adonai", hebrew: "אוֹר יְהוָה", transliteration: "Or Adonai", meaning: "Light of the Lord arisen upon you", ref: "Isaiah 60:1", cat: "Royal Garment & Glory" },
  { name: "Chosson Chazon", hebrew: "חוֹזֶה חָזוֹן", transliteration: "Chozeh Chazon", meaning: "Seer of divine prophetic vision", ref: "Habakkuk 2:2", cat: "Royal Calling & Priesthood" },
  { name: "Tiferet", hebrew: "תִּפְאֶרֶת", transliteration: "Tiferet", meaning: "Divine beauty, splendor and honor", ref: "Isaiah 62:3", cat: "Royal Garment & Glory" },
  { name: "Kavod", hebrew: "כָּבוֹד", transliteration: "Kavod", meaning: "Weighty glory restored and multiplied", ref: "Haggai 2:9", cat: "Royal Garment & Glory" },
  { name: "Chayil", hebrew: "חַיִל", transliteration: "Chayil", meaning: "Valor, supernatural strength and virtue", ref: "Proverbs 31:10", cat: "Spiritual Strength" },
  { name: "Shalom Shalem", hebrew: "שָׁלוֹם שָׁלֵם", transliteration: "Shalom Shalem", meaning: "Perfect, complete and unshakeable peace", ref: "Isaiah 26:3", cat: "Everlasting Joy & Peace" },
  { name: "Chanan", hebrew: "חַנָּן", transliteration: "Chanan", meaning: "Lavishly graced and favored", ref: "Psalm 112:4", cat: "Redemption & Grace" },
  { name: "Matzui Chen", hebrew: "מָצוּא חֵן", transliteration: "Matzui Chen", meaning: "One who found high favor in God's eyes", ref: "Genesis 6:8", cat: "Blessing & Favor" },
  { name: "Bat Tzion", hebrew: "בַּת־צִיּוֹן", transliteration: "Bat Tzion", meaning: "Daughter of Zion, radiant in praise", ref: "Zechariah 9:9", cat: "Beloved & Intimacy" },
  { name: "Ben Zakkai", hebrew: "בֶּן־זַכַּאי", transliteration: "Ben Zakkai", meaning: "Son of purity, clean hands and innocent heart", ref: "Ezra 2:9", cat: "Spiritual Strength" },
  { name: "Yeshua", hebrew: "יְשׁוּעָה", transliteration: "Yeshuah", meaning: "Living salvation and rescue delivered", ref: "Isaiah 62:11", cat: "Redemption & Grace" },
  { name: "Or Gadol", hebrew: "אוֹר גָּדוֹל", transliteration: "Or Gadol", meaning: "Great radiant light shining over darkness", ref: "Isaiah 9:2", cat: "New Identity" },
  { name: "Peduim", hebrew: "פְּדוּיִם", transliteration: "Peduim", meaning: "Ransomed of the Lord returning with singing", ref: "Isaiah 35:10", cat: "Redemption & Grace" },
  { name: "Shoshana", hebrew: "שׁוֹשַׁנָּה", transliteration: "Shoshanah", meaning: "Lily blooming pure among desert thorns", ref: "Song of Songs 2:2", cat: "Beloved & Intimacy" },
  { name: "Re'ah", hebrew: "רֵעַ", transliteration: "Re'ah", meaning: "Covenant friend who speaks face to face with God", ref: "Exodus 33:11", cat: "Beloved & Intimacy" }
];

console.log("Seed 50 redemptive names loaded.");
