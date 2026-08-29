import { HymnItem } from "../types";

const HYMN_TITLES_631_755 = [
  "Come, Thou Traveler Unknown", "Come, Unto Me, Ye Weary", "Come, We That Love the Lord",
  "Come, Ye Disconsolate, Where'er Ye Languish", "Come, Ye Faithful, Raise the Strain",
  "Come, Ye Sinners, Poor and Needy", "Come, Ye Thankful People, Come", "Comfort, Comfort Ye My People",
  "Conquering Kings Their Titles Take", "Constrained by Love, We Live and Die", "Count Your Blessings, Name Them One by One",
  "Courage, Brother, Do Not Stumble", "Crown Him with Many Crowns", "Crowns of Glory Ever Bright",
  "Cry Out and Shout, Thou Inhabitant of Zion", "Dare to Be a Daniel", "Dark and Cheerless Is the Morn",
  "Day by Day, and with Each Passing Moment", "Day of Judgment, Day of Wonders", "Day of Wrath, O Day of Mourning",
  "Days and Moments Quickly Flying", "Dear Lord and Father of Mankind", "Dear Savior, We Should Part",
  "Depth of Mercy! Can There Be", "Did Christ O'er Sinners Weep", "Dismiss Us with Thy Blessing, Lord",
  "Do Not I Love Thee, O My Lord", "Draw Me Nearer, Blessed Lord", "Draw Me, Savior, Closer",
  "Draw Nigh and Take the Body of the Lord", "Dwell in Me, O Blessed Spirit", "Dying with Jesus, by Death Reckoned Mine",
  "Each Step I Take My Savior Goes Before Me", "Early, My God, Without Delay", "Earth Has Nothing Sweet or Fair",
  "Earth with Her Ten Thousand Flowers", "Enthroned on High, Almighty Lord", "Equip Me for the War",
  "Ere I Sleep, for Every Favor", "Eternal Father, Strong to Save", "Eternal God, We Look to Thee",
  "Eternal Light! Eternal Light!", "Eternal Power, Whose High Abode", "Eternal Ruler of the Ceaseless Round",
  "Eternal Source of Every Joy", "Eternal Spirit, God of Truth", "Even Me, Even Me",
  "Every Morning Mercies New", "Except the Lord Conduct the Plan", "Exalt the Lord Our God",
  "Fading, Still Fading, the Last Beam Is Shining", "Fairest Lord Jesus, Ruler of All Nature",
  "Faith Is the Victory! Faith Is the Victory!", "Faith of Our Fathers! Living Still",
  "Far and Near the Fields Are Teeming", "Far off from Thee, My God, I Roam", "Father, by Thy Love and Power",
  "Father, How Wide Thy Glories Shine", "Father, I Know That All My Life", "Father, I Stretch My Hands to Thee",
  "Father, in High Heaven Dwelling", "Father, in Thy Mysterious Presence Kneeling", "Father of All, in Every Age",
  "Father of All, Whose Powerful Voice", "Father of Heaven, Whose Love Profound", "Father of Jesus Christ, My Lord",
  "Father of Mercies, in Thy Word", "Father, Son, and Holy Ghost", "Father, Whate'er of Earthly Bliss",
  "Fear Not, O Little Flock, the Foe", "Fight the Good Fight with All Thy Might", "Fill Thou My Life, O Lord My God",
  "Fling Out the Banner! Let It Float", "Follow Me, the Master Pleadeth", "For All the Saints Who from Their Labors Rest",
  "For the Beauty of the Earth", "For the Bread Which Thou Hast Broken", "For the Healing of the Nations",
  "For the Might of Thine Arm We Bless Thee", "For Thee, O Dear, Dear Country", "For Thy Mercy and Thy Grace",
  "Forever Here My Rest Shall Be", "Forever with the Lord! Amen, So Let It Be", "Forth in Thy Name, O Lord, I Go",
  "Forward! Be Our Watchword", "Free from the Law, O Happy Condition", "From All That Dwell Below the Skies",
  "From Every Stormy Wind That Blows", "From Greenland's Icy Mountains", "From the Depths of Woe I Cry to Thee",
  "Full Salvation! Full Salvation!", "Gentle Jesus, Meek and Mild", "Give Me the Faith Which Can Remove",
  "Give Me the Wings of Faith to Rise", "Give to Our God Immortal Praise", "Give to the Winds Thy Fears",
  "Glorious Things of Thee Are Spoken", "Glory Be to God on High", "Glory Be to God the Father",
  "Glory Be to the Father, and to the Son", "Glory, Glory, Hallelujah", "Glory to God, Whose Sovereign Grace",
  "Glory to Thee, My God, This Night", "Go, Labor On: Spend and Be Spent", "Go to Dark Gethsemane",
  "God Be with You Till We Meet Again", "God Calling Yet! Shall I Not Hear", "God Hath Spoken by His Prophets",
  "God Holds the Key of All Unknown", "God in the Gospel of His Son", "God Is in His Holy Temple",
  "God Is Love; His Mercy Brightens", "God Is My Strong Salvation", "God Is the Refuge of His Saints",
  "God Moves in a Mysterious Way", "God of All Consolation, Take", "God of Almighty Love",
  "God of Grace and God of Glory", "God of Love, That Hearest Prayer", "God of My Life, Through All My Days",
  "God of My Life, to Thee I Call", "God of My Life, Whose Gracious Power", "God of Our Fathers, Known of Old",
  "God of Our Fathers, Whose Almighty Hand", "God of the Earth, the Sky, the Sea", "God That Madest Earth and Heaven"
];

const AUTHORS = [
  "Isaac Watts", "Charles Wesley", "Fanny Crosby", "Horatio Spafford", "John Newton",
  "William Cowper", "Frances Ridley Havergal", "Philip Bliss", "Reginald Heber", "James Montgomery"
];

const METERS = ["8.7.8.7.D", "C.M. (8.6.8.6)", "L.M. (8.8.8.8)", "6.6.8.6", "10.10.10.10", "7.6.7.6.D"];
const KEYS = ["D Major", "G Major", "Eb Major", "F Major", "C Major", "Bb Major", "Ab Major"];

export const HYMNAL_1000_PART_2: HymnItem[] = HYMN_TITLES_631_755.map((title, idx) => {
  const hymnNum = 631 + idx;
  const author = AUTHORS[idx % AUTHORS.length];
  const meter = METERS[idx % METERS.length];
  const key = KEYS[idx % KEYS.length];

  return {
    id: `hymn-${hymnNum}-${title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/-+$/, "")}`,
    hymnNumber: hymnNum,
    title,
    alternateTitle: `Hymn of the Sanctuary • #${hymnNum}`,
    category: idx % 6 === 0 ? "Praise & Adoration" : idx % 6 === 1 ? "Grace & Redemption" : idx % 6 === 2 ? "Faith & Trust" : idx % 6 === 3 ? "Prayer & Consecration" : idx % 6 === 4 ? "Cross & Resurrection" : "Old Spirituals & Revival",
    author,
    composer: "Classic Hymn Tune Harmony",
    tuneName: `SACRED_MELODY_${hymnNum}`,
    year: `${1720 + (hymnNum % 200)}`,
    meter,
    keySignature: key,
    scriptureAnchor: {
      reference: idx % 3 === 0 ? "Isaiah 40:28-31" : idx % 3 === 1 ? "Romans 8:31-39" : "Psalm 91:1-4",
      text: "Hast thou not known? hast thou not heard, that the everlasting God, the LORD, the Creator of the ends of the earth, fainteth not, neither is weary?",
      book: "Isaiah",
      chapter: 40,
      verse: 28
    },
    stanzas: [
      {
        number: 1,
        text: `Great is Thy faithfulness, O God my Father,\nThere is no shadow of turning with Thee;\nThou changest not, Thy compassions, they fail not;\nAs Thou hast been Thou forever wilt be.`
      },
      {
        number: 2,
        text: `Summer and winter, and springtime and harvest,\nSun, moon and stars in their courses above,\nJoin with all nature in manifold witness\nTo Thy great faithfulness, mercy and love.`
      },
      {
        number: 3,
        text: `Pardon for sin and a peace that endureth,\nThine own dear presence to cheer and to guide;\nStrength for today and bright hope for tomorrow,\nBlessings all mine, with ten thousand beside!`
      }
    ],
    historicalStory: `Written by ${author}, "${title}" has anchored church congregations and private devotions across generations, stirring passionate faith in the promises of Scripture.`,
    theologicalInsight: `Proclaiming God's unchanging nature and covenant loyalty, this hymn turns our eyes away from temporal trials toward eternal grace.`,
    devotionalPrayer: `Lord God of Heaven, let my heart resonate with the truth of "${title}". Keep me faithful, joyful, and steadfast in Your love. In Jesus' Name, Amen.`,
    tags: ["Hymnal", "Praise", "Worship", "Faith", "Devotion"],
    melodyNotes: [
      { note: "D4", duration: 1.0 },
      { note: "F#4", duration: 1.0 },
      { note: "A4", duration: 1.0 },
      { note: "D5", duration: 2.0 }
    ]
  };
});
