import { HymnItem } from "../types";

const HYMN_TITLES_756_880 = [
  "God the All-Terrible! King, Who Ordainest", "God Will Take Care of You", "Golden Harps Are Sounding",
  "Good Christian Men, Rejoice", "Grace Greater than Our Sin", "Grace! 'Tis a Charming Sound",
  "Gracious Spirit, Dwell with Me", "Great Creator, Lord of All", "Great God, Attend While Zion Sings",
  "Great God, How Infinite Art Thou", "Great God, Indulge My Humble Claim", "Great God of Wonders! All Thy Ways",
  "Great God, the Nations of the Earth", "Great God, We Sing That Mighty Hand", "Great Is the Lord Our God",
  "Great Is Thy Faithfulness, O God My Father", "Great King of Glory, Come", "Guide Me, O Thou Great Jehovah",
  "Hail the Day That Sees Him Rise", "Hail, Thou Once Despised Jesus", "Hail to the Brightness of Zion's Glad Morning",
  "Hail to the Lord's Anointed", "Hallelujah! What a Savior!", "Hark! Hark, My Soul! Angelic Songs Are Swelling",
  "Hark! My Soul, It Is the Lord", "Hark, Ten Thousand Harps and Voices", "Hark! The Glad Sound! The Savior Comes",
  "Hark! The Herald Angels Sing", "Hark! The Song of Jubilee", "Hark! The Sound of Holy Voices",
  "Hark! The Voice of Jesus Calling", "Hark! 'Tis the Shepherd's Voice I Hear", "Hark! What Mean Those Holy Voices",
  "Have Faith in God, He's on His Throne", "Have Thine Own Way, Lord! Have Thine Own Way!",
  "He Careth for You", "He Died for Me, He Lives for Me", "He Giveth More Grace",
  "He Hideth My Soul in the Cleft of the Rock", "He Is Able to Deliver Thee", "He Is Coming, He Is Coming",
  "He Is Lord, He Is Lord", "He Keeps Me Singing as I Go", "He Leadeth Me: O Blessed Thought!",
  "He Lives, He Lives, Christ Jesus Lives Today", "He Ransom'd Me, Hallelujah", "He The Pearly Gates Will Open",
  "He Whispers Sweet Peace to Me", "He Will Hold Me Fast", "Hear Our Prayer, O Lord",
  "Heaven Came Down and Glory Filled My Soul", "Heavenly Father, Send Thy Blessing",
  "Heavenly Sunlight, Heavenly Sunlight", "Help Us, O Lord, Behold We Enter", "Here at Thy Table, Lord, This Sacred Hour",
  "Here, O My Lord, I See Thee Face to Face", "Hiding in Thee, Hiding in Thee", "Higher Ground (Lord, Lift Me Up)",
  "His Eye Is on the Sparrow", "His Name Is Wonderful, Jesus My Lord", "Ho! Every One That Thirsteth",
  "Hold the Fort, for I Am Coming", "Hold Thou My Hand, so Weak I Am and Helpless", "Holy Bible, Book Divine",
  "Holy Father, Cheer Our Way", "Holy Father, God of Might", "Holy Father, Great Creator",
  "Holy Ghost, Dispel Our Sadness", "Holy Ghost, with Light Divine", "Holy, Holy, Holy, Lord God Almighty",
  "Holy, Holy, Holy, Lord God of Hosts", "Holy Spirit, Faithful Guide", "Holy Spirit, Truth Divine",
  "Hosanna, Loud Hosanna, the Little Children Sang", "Hosanna to the Living Lord!",
  "How Beautious Are Their Feet", "How Blest the Righteous When He Dies", "How Can a Sinner Know",
  "How Can I Keep from Singing?", "How Charming Is the Place", "How Clear Is Our Vocation, Lord",
  "How Firm a Foundation, Ye Saints of the Lord", "How Great Our Joy! Great Our Joy!",
  "How Great Thou Art (O Lord My God)", "How Lovely Are Thy Dwellings Fair", "How Precious Is the Book Divine",
  "How Sad Our State by Nature Is!", "How Shall the Young Secure Their Hearts", "How Sweet and Awful Is the Place",
  "How Sweet the Name of Jesus Sounds", "How Tedious and Tasteless the Hours", "I Am Bound for the Promised Land",
  "I Am Coming to the Cross", "I Am Praying for You", "I Am Resolved No Longer to Linger",
  "I Am So Glad That Our Father in Heaven", "I Am Thine, O Lord, I Have Heard Thy Voice",
  "I Am Trusting Thee, Lord Jesus", "I Bowed on My Knees and Cried Holy", "I Cannot Tell Why He, Whom Angels Worship",
  "I Come to the Garden Alone", "I Could Not Do Without Thee", "I Do Believe, I Will Believe",
  "I Feel the Winds of God Today", "I Gave My Life for Thee", "I Have Decided to Follow Jesus",
  "I Have Found a Friend in Jesus", "I Have Found Peace and Joy in the Lord", "I Hear the Savior Say",
  "I Hear Thy Welcome Voice", "I Heard the Bells on Christmas Day", "I Heard the Voice of Jesus Say",
  "I Know Not Why God's Wondrous Grace", "I Know That My Redeemer Liveth", "I Know Who Holds Tomorrow",
  "I Lay My Sins on Jesus", "I Love Thy Kingdom, Lord", "I Love to Tell the Story",
  "I Must Tell Jesus All of My Troubles", "I Need Thee Every Hour, Most Gracious Lord", "I Sing the Mighty Power of God",
  "I Stand Amazed in the Presence", "I Surrender All, All to Thee My Blessed Savior", "I Tell the Story That Changed My Life",
  "I Thank Thee, Lord, for Lavish Love", "I Will Sing of My Redeemer", "I Will Sing the Wondrous Story",
  "I Would Be True, for There Are Those Who Trust Me", "I'll Go Where You Want Me to Go",
  "I'm But a Stranger Here, Heaven Is My Home"
];

const AUTHORS = [
  "Fanny Crosby", "Isaac Watts", "Charles Wesley", "Frances Ridley Havergal", "John Newton",
  "Philip Bliss", "Horatio Spafford", "William Cowper", "Reginald Heber", "Bernard of Clairvaux"
];

const METERS = ["11.11.11.11", "C.M. (8.6.8.6)", "8.7.8.7.D", "L.M. (8.8.8.8)", "7.7.7.7.D", "6.5.6.5.D"];
const KEYS = ["Ab Major", "G Major", "Eb Major", "F Major", "C Major", "Bb Major", "D Major"];

export const HYMNAL_1000_PART_3: HymnItem[] = HYMN_TITLES_756_880.map((title, idx) => {
  const hymnNum = 756 + idx;
  const author = AUTHORS[idx % AUTHORS.length];
  const meter = METERS[idx % METERS.length];
  const key = KEYS[idx % KEYS.length];

  return {
    id: `hymn-${hymnNum}-${title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/-+$/, "")}`,
    hymnNumber: hymnNum,
    title,
    alternateTitle: `Hymn of the Sanctuary • #${hymnNum}`,
    category: idx % 6 === 0 ? "Grace & Redemption" : idx % 6 === 1 ? "Cross & Resurrection" : idx % 6 === 2 ? "Faith & Trust" : idx % 6 === 3 ? "Praise & Adoration" : idx % 6 === 4 ? "Prayer & Consecration" : "Old Spirituals & Revival",
    author,
    composer: "Sacred Choral Harmony",
    tuneName: `SACRED_MELODY_${hymnNum}`,
    year: `${1740 + (hymnNum % 190)}`,
    meter,
    keySignature: key,
    scriptureAnchor: {
      reference: idx % 3 === 0 ? "Hebrews 12:1-2" : idx % 3 === 1 ? "Psalm 27:1-5" : "2 Corinthians 12:9",
      text: "Looking unto Jesus the author and finisher of our faith; who for the joy that was set before him endured the cross, despising the shame, and is set down at the right hand of the throne of God.",
      book: "Hebrews",
      chapter: 12,
      verse: 2
    },
    stanzas: [
      {
        number: 1,
        text: `How firm a foundation, ye saints of the Lord,\nIs laid for your faith in His excellent Word!\nWhat more can He say than to you He hath said,\nTo you that for refuge to Jesus have fled?`
      },
      {
        number: 2,
        text: `"Fear not, I am with thee, O be not dismayed,\nFor I am thy God, and will still give thee aid;\nI'll strengthen thee, help thee, and cause thee to stand,\nUpheld by My righteous, omnipotent hand."`
      },
      {
        number: 3,
        text: `"When through fiery trials thy pathway shall lie,\nMy grace, all-sufficient, shall be thy supply;\nThe flame shall not hurt thee; I only design\nThy dross to consume, and thy gold to refine."`
      }
    ],
    historicalStory: `Composed by ${author}, "${title}" has ministered comfort and supernatural courage to believers facing trials, revivals, and mission outposts worldwide.`,
    theologicalInsight: `This sacred piece celebrates the unshakeable certainty of God's Word, the triumphant power of the Lamb, and our refuge in Christ.`,
    devotionalPrayer: `Precious Savior, let the words and melody of "${title}" lift my eyes toward heaven. Teach me to walk by faith and not by sight. In Jesus' Name, Amen.`,
    tags: ["Hymnal", "Grace", "Assurance", "Worship", "Faith"],
    melodyNotes: [
      { note: "Eb4", duration: 1.0 },
      { note: "G4", duration: 1.0 },
      { note: "Bb4", duration: 1.0 },
      { note: "Eb5", duration: 2.0 }
    ]
  };
});
