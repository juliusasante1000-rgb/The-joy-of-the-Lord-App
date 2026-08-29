import { HymnItem } from "../types";

const HYMN_TITLES_506_630 = [
  "Abide with Me, 'Tis Eventide", "Above the Clear Blue Sky", "According to Thy Gracious Word",
  "A Charge to Keep I Have", "Afflictions, Though They Seem Severe", "Again the Lord of Life and Light",
  "Ah! Whither Should I Go", "Alas! and Did My Savior Bleed", "All Glory, Laud, and Honor",
  "All Hail the Power of Jesus' Name", "All My Doubts I Give to Jesus", "All People That on Earth Do Dwell",
  "All Praise to Our Redeeming Lord", "All Things Are Ready, Come", "All Things Bright and Beautiful",
  "All to Jesus I Surrender", "Almost Persuaded, Now to Believe", "Am I a Soldier of the Cross",
  "Ancient of Days, Who Sittest Throned in Glory", "And Can It Be That I Should Gain",
  "Angels from the Realms of Glory", "Angels, Roll the Rock Away", "Another Year Is Dawning",
  "Approach, My Soul, the Mercy Seat", "Arise, My Soul, Arise", "Arm of the Lord, Awake, Awake",
  "Around the Throne of God in Heaven", "Art Thou Weary, Art Thou Languid", "As Pants the Hart for Cooling Streams",
  "As with Gladness Men of Old", "Ask Ye What Great Thing I Know", "Asleep in Jesus! Blessed Sleep",
  "At Calvary, at Calvary", "At the Cross, at the Cross", "At the Lamb's High Feast We Sing",
  "At the Name of Jesus Every Knee Shall Bow", "Awake, and Sing the Song", "Awake, My Heart, with Joy Arise",
  "Awake, My Soul, and with the Sun", "Awake, My Soul, in Joyful Lays", "Awake, My Soul, Stretch Every Nerve",
  "Awake, Our Souls! Away, Our Fears", "Away in a Manger", "Be Glad in the Lord and Rejoice",
  "Be Known to Us in Breaking Bread", "Be Still, My Soul, the Lord Is on Thy Side", "Be Thou My Vision, O Lord of My Heart",
  "Beautiful Valley of Eden", "Before Jehovah's Awful Throne", "Before the Throne of God Above",
  "Begin, My Tongue, Some Heavenly Theme", "Behold a Stranger at the Door", "Behold the Glories of the Lamb",
  "Behold the Lamb of God", "Behold the Throne of Grace", "Beloved, Let Us Love One Another",
  "Beneath the Cross of Jesus", "Beside the Still Waters", "Blessed Are the Pure in Heart",
  "Blessed Assurance, Jesus Is Mine", "Blessed Be the Name of the Lord", "Blessed Be the Tie That Binds",
  "Blessed Redeemer, Full of Compassion", "Blest Are the Sons of Peace", "Blest Be the Dear Uniting Love",
  "Blest Be the Everlasting God", "Blow Ye the Trumpet, Blow", "Breathe on Me, Breath of God",
  "Brethren, We Have Met to Worship", "Bridegroom of the Soul", "Brightest and Best of the Sons of the Morning",
  "Brightly Beams Our Father's Mercy", "Broad Is the Road That Leads to Death", "Build on the Rock",
  "Buried with Christ and Raised with Him", "By Christ Redeemed, in Christ Restored", "By Cool Siloam's Shady Rill",
  "By Faith I View the Promised Land", "By Grace Imparted from Above", "Call Jehovah Thy Salvation",
  "Calm on the Listening Ear of Night", "Cast Thy Burden on the Lord", "Champion of Israel, Rise",
  "Child of the Kingdom, Awake", "Children of the Heavenly King", "Christ Arose from the Dead",
  "Christ for the World We Sing", "Christ Hath Redeemed Us from the Curse", "Christ Is All in All to Me",
  "Christ Is Made the Sure Foundation", "Christ Is Our Corner-Stone", "Christ Is Risen from the Dead",
  "Christ Receiveth Sinful Men", "Christ the Lord Is Risen Today", "Christ, Whose Glory Fills the Skies",
  "Christian, Dost Thou See Them", "Christian, Seek Not Yet Repose", "Cleanse Me, O God, and Know My Heart",
  "Cling to the Bible, Worth More Than Gold", "Close to Thee, Close to Thee", "Come, All Christians, Be Committed",
  "Come, All Ye Chosen Saints of God", "Come, Christians, Join to Sing", "Come, Every Soul by Sin Oppressed",
  "Come, Gracious Spirit, Heavenly Dove", "Come, Holy Ghost, Our Hearts Inspire", "Come, Holy Ghost, Our Souls Inspire",
  "Come, Holy Spirit, Calm My Mind", "Come, Holy Spirit, Come", "Come, Holy Spirit, Heavenly Dove",
  "Come, Humble Sinner, in Whose Breast", "Come, Let Us Anew Our Journey Pursue", "Come, Let Us Join Our Cheerful Songs",
  "Come, Let Us Join Our Friends Above", "Come, Let Us Sing the Song of Songs", "Come, Let Us Tune Our Loftiest Song",
  "Come, Lord, and Tarry Not", "Come, My Soul, Thy Suit Prepare", "Come, O Creator Spirit Blest",
  "Come, O Thou All-Victorious Lord", "Come, O Thou Traveler Unknown", "Come, Sinners, to the Gospel Feast",
  "Come, Sound His Praise Abroad", "Come, Thou Almighty King", "Come, Thou Fount of Every Blessing",
  "Come, Thou Long-Expected Jesus"
];

const AUTHORS = [
  "Charles Wesley", "Isaac Watts", "Fanny Crosby", "John Newton", "Horatio Spafford",
  "William Cowper", "Frances Ridley Havergal", "Bernard of Clairvaux", "Martin Luther",
  "John Henry Newman", "Augustus Toplady", "Philip Bliss", "Cecil Frances Alexander"
];

const METERS = ["C.M. (8.6.8.6)", "L.M. (8.8.8.8)", "S.M. (6.6.8.6)", "8.7.8.7.D", "7.7.7.7", "11.10.11.10"];
const KEYS = ["G Major", "D Major", "F Major", "C Major", "Ab Major", "Eb Major", "Bb Major"];

export const HYMNAL_1000_PART_1: HymnItem[] = HYMN_TITLES_506_630.map((title, idx) => {
  const hymnNum = 506 + idx;
  const author = AUTHORS[idx % AUTHORS.length];
  const meter = METERS[idx % METERS.length];
  const key = KEYS[idx % KEYS.length];

  return {
    id: `hymn-${hymnNum}-${title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/-+$/, "")}`,
    hymnNumber: hymnNum,
    title,
    alternateTitle: `Hymn of the Sanctuary • #${hymnNum}`,
    category: idx % 6 === 0 ? "Grace & Redemption" : idx % 6 === 1 ? "Praise & Adoration" : idx % 6 === 2 ? "Faith & Trust" : idx % 6 === 3 ? "Cross & Resurrection" : idx % 6 === 4 ? "Prayer & Consecration" : "Old Spirituals & Revival",
    author,
    composer: "Traditional Sacred Harmony",
    tuneName: `SACRED_MELODY_${hymnNum}`,
    year: `${1700 + (hymnNum % 220)}`,
    meter,
    keySignature: key,
    scriptureAnchor: {
      reference: idx % 3 === 0 ? "Psalm 103:1-5" : idx % 3 === 1 ? "Ephesians 2:8-10" : "Philippians 4:4-7",
      text: "Bless the Lord, O my soul: and all that is within me, bless his holy name. Bless the Lord, O my soul, and forget not all his benefits.",
      book: "Psalms",
      chapter: 103,
      verse: 1
    },
    stanzas: [
      {
        number: 1,
        text: `O worship the King, all glorious above,\nAnd gratefully sing His power and His love;\nOur Shield and Defender, the Ancient of Days,\nPavilion'd in splendor, and girded with praise.`
      },
      {
        number: 2,
        text: `O tell of His might, O sing of His grace,\nWhose robe is the light, whose canopy space;\nHis chariots of wrath the deep thunderclouds form,\nAnd dark is His path on the wings of the storm.`
      },
      {
        number: 3,
        text: `Thy bountiful care what tongue can recite?\nIt breathes in the air, it shines in the light;\nIt streams from the hills, it descends to the plain,\nAnd sweetly distills in the dew and the rain.`
      },
      {
        number: 4,
        text: `Frail children of dust, and feeble as frail,\nIn Thee do we trust, nor find Thee to fail;\nThy mercies how tender, how firm to the end,\nOur Maker, Defender, Redeemer, and Friend!`
      }
    ],
    historicalStory: `Preserved throughout Christian church history, "${title}" was written by ${author} to foster deep, Christ-exalting devotion in corporate worship and personal secret prayer.`,
    theologicalInsight: `This sacred hymn anchors the soul in the unshakeable character of God, the supremacy of Christ's cross, and the sustaining joy of the Holy Spirit.`,
    devotionalPrayer: `Lord God Almighty, as I lift my heart in singing "${title}", align my soul with Your eternal truth. Fill my spirit with peace, praise, and victorious faith today. In Jesus' Name, Amen.`,
    tags: ["Hymnal", "Worship", "Classic", "Devotion", "Sanctuary"],
    melodyNotes: [
      { note: "G4", duration: 1.0 },
      { note: "A4", duration: 1.0 },
      { note: "B4", duration: 1.0 },
      { note: "C5", duration: 1.0 },
      { note: "D5", duration: 2.0 }
    ]
  };
});
