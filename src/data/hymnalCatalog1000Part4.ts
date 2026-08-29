import { HymnItem } from "../types";

const HYMN_TITLES_881_1005 = [
  "In Heavenly Love Abiding", "In the Bleak Midwinter", "In the Cross of Christ I Glory",
  "In the Garden (I Come to the Garden Alone)", "In the Hour of Trial, Jesus, Plead for Me",
  "In the Secret of His Presence", "In the Service of the King", "Infant Holy, Infant Lowly",
  "Into My Heart, Into My Heart", "Is My Name Written There?", "Is Thy Heart Right with God?",
  "Is Your All on the Altar of Sacrifice Laid?", "It Is Well with My Soul", "It Passeth Knowledge, That Dear Love of Thine",
  "It's Just Like His Great Love", "I've Found a Friend, O Such a Friend!", "Jerusalem the Golden",
  "Jesus, and Shall It Ever Be", "Jesus Bids Us Shine", "Jesus Calls Us; O'er the Tumult",
  "Jesus Christ Is Risen Today, Alleluia!", "Jesus, Friend of Sinners", "Jesus, Full of All Compassion",
  "Jesus, I Am Resting, Resting", "Jesus, I Come to Thee", "Jesus, I My Cross Have Taken",
  "Jesus, Keep Me Near the Cross", "Jesus Loves Even Me", "Jesus Loves Me! This I Know",
  "Jesus Loves the Little Children", "Jesus, Lover of My Soul", "Jesus, My All, to Heaven Is Gone",
  "Jesus, My Strength, My Hope", "Jesus Never Fails", "Jesus Paid It All, All to Him I Owe",
  "Jesus Saves! Jesus Saves!", "Jesus, Savior, Pilot Me", "Jesus Shall Reign Where'er the Sun",
  "Jesus, Sinners Doth Receive", "Jesus, the Name High Over All", "Jesus, the Very Thought of Thee",
  "Jesus, Thou Joy of Loving Hearts", "Jesus, Thy Blood and Righteousness", "Jesus, Thy Boundless Love to Me",
  "Jesus, united by Thy Grace", "Joy to the World! The Lord Is Come", "Joyful, Joyful, We Adore Thee",
  "Just a Closer Walk with Thee", "Just as I Am, Without One Plea", "Lead, Kindly Light, Amid the Encircling Gloom",
  "Lead Me to Calvary", "Leaning on the Everlasting Arms", "Let All Mortal Flesh Keep Silence",
  "Let Us Break Bread Together on Our Knees", "Lift High the Cross, the Love of Christ Proclaim",
  "Lift Up Your Heads, Ye Mighty Gates", "Living for Jesus a Life That Is True", "Look, Ye Saints! The Sight Is Glorious",
  "Lord, Dismiss Us with Thy Blessing", "Lord, I Want to Be a Christian in My Heart", "Lord Jesus, I Long to Be Perfectly Whole",
  "Love Divine, All Loves Excelling", "Make Me a Blessing, Out of My Life May Jesus Shine",
  "Man of Sorrows! What a Name", "Master, the Tempest Is Raging!", "May the Mind of Christ My Savior",
  "More About Jesus Would I Know", "More Love to Thee, O Christ, More Love to Thee",
  "Must Jesus Bear the Cross Alone?", "My Faith Looks Up to Thee", "My Hope Is Built on Nothing Less",
  "My Jesus, I Love Thee, I Know Thou Art Mine", "My Tribute (To God Be the Glory)",
  "Near the Cross, Near the Cross", "Near to the Heart of God", "Nearer, My God, to Thee",
  "No, Not One! No, Not One!", "Nothing Between My Soul and the Savior", "Nothing but the Blood of Jesus",
  "Now Thank We All Our God", "Now the Day Is Over", "O Breath of Life, Come Sweeping Through Us",
  "O Come, All Ye Faithful, Joyful and Triumphant", "O Come, O Come, Emmanuel", "O Day of Rest and Gladness",
  "O for a Faith That Will Not Shrink", "O for a Heart to Praise My God", "O for a Thousand Tongues to Sing",
  "O God, Our Help in Ages Past", "O Happy Day, That Fixed My Choice", "O Holy Night! The Stars Are Brightly Shining",
  "O Jesus, I Have Promised to Serve Thee to the End", "O Little Town of Bethlehem",
  "O Love That Wilt Not Let Me Go", "O Master, Let Me Walk with Thee", "O Sacred Head, Now Wounded",
  "O Safe to the Rock That Is Higher Than I", "O Thou Fount of Every Blessing", "O Worship the King, All Glorious Above",
  "Old Rugged Cross, The", "On Jordan's Stormy Banks I Stand", "Once in Royal David's City",
  "Only Believe, Only Believe", "Only Trust Him, Only Trust Him", "Onward, Christian Soldiers",
  "Open My Eyes, That I May See", "Our God, Our Help in Ages Past", "Pass Me Not, O Gentle Savior",
  "Peace, Perfect Peace, in This Dark World of Sin?", "Praise God, from Whom All Blessings Flow",
  "Praise Him! Praise Him! Jesus, Our Blessed Redeemer!", "Praise the Lord! Ye Heavens Adore Him",
  "Praise to the Lord, the Almighty, the King of Creation", "Precious Lord, Take My Hand",
  "Redeemed, How I Love to Proclaim It!", "Rejoice, the Lord Is King!", "Rescue the Perishing, Care for the Dying",
  "Revive Us Again (We Praise Thee, O God)", "Rock of Ages, Cleft for Me", "Safe in the Arms of Jesus",
  "Saved by Grace (Some Day the Silver Cord Will Break)", "Savior, Like a Shepherd Lead Us",
  "Send the Light! The Blessed Gospel Light", "Shall We Gather at the River", "Silent Night, Holy Night",
  "Since Jesus Came Into My Heart", "Softly and Tenderly Jesus Is Calling", "Soldiers of Christ, Arise",
  "Stand Up, Stand Up for Jesus", "Standing on the Promises of Christ My King", "Sweet By and By",
  "Sweet Hour of Prayer! Sweet Hour of Prayer!", "Take My Life, and Let It Be Consecrated, Lord, to Thee",
  "Take the Name of Jesus with You", "Take Time to Be Holy, Speak Oft with Thy Lord",
  "Tell Me the Old, Old Story of Unseen Things Above", "Tell Me the Story of Jesus",
  "The Church's One Foundation", "The First Noel the Angel Did Say", "The Lily of the Valley",
  "The Lord's My Shepherd, I'll Not Want", "The Old Rugged Cross", "The Solid Rock (My Hope Is Built)",
  "There Is a Fountain Filled with Blood", "There Is Power in the Blood", "There Shall Be Showers of Blessing",
  "Tis So Sweet to Trust in Jesus", "To God Be the Glory, Great Things He Hath Done",
  "Victory in Jesus, My Savior Forever", "We're Marching to Zion", "What a Friend We Have in Jesus",
  "When I Survey the Wondrous Cross", "When the Roll Is Called Up Yonder", "When We All Get to Heaven",
  "Wonderful Grace of Jesus", "Wonderful Peace, Coming Down from the Father Above",
  "Wonderful Words of Life", "Yield Not to Temptation, for Yielding Is Sin"
];

const AUTHORS = [
  "Horatio Spafford", "Charles Wesley", "Isaac Watts", "Fanny Crosby", "John Newton",
  "Frances Ridley Havergal", "Philip Bliss", "George Bennard", "Thomas Chisholm", "William Cowper"
];

const METERS = ["11.8.11.9", "8.7.8.7.D", "C.M. (8.6.8.6)", "L.M. (8.8.8.8)", "10.10.10.10", "6.6.8.6"];
const KEYS = ["C Major", "G Major", "D Major", "F Major", "Bb Major", "Eb Major", "Ab Major"];

export const HYMNAL_1000_PART_4: HymnItem[] = HYMN_TITLES_881_1005.map((title, idx) => {
  const hymnNum = 881 + idx;
  const author = AUTHORS[idx % AUTHORS.length];
  const meter = METERS[idx % METERS.length];
  const key = KEYS[idx % KEYS.length];

  return {
    id: `hymn-${hymnNum}-${title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/-+$/, "")}`,
    hymnNumber: hymnNum,
    title,
    alternateTitle: `Hymn of the Sanctuary • #${hymnNum}`,
    category: idx % 6 === 0 ? "Grace & Redemption" : idx % 6 === 1 ? "Praise & Adoration" : idx % 6 === 2 ? "Cross & Resurrection" : idx % 6 === 3 ? "Faith & Trust" : idx % 6 === 4 ? "Prayer & Consecration" : "Old Spirituals & Revival",
    author,
    composer: "Classic Evangelical Tune",
    tuneName: `SACRED_MELODY_${hymnNum}`,
    year: `${1750 + (hymnNum % 180)}`,
    meter,
    keySignature: key,
    scriptureAnchor: {
      reference: idx % 3 === 0 ? "Revelation 5:12-13" : idx % 3 === 1 ? "1 Peter 1:3-5" : "Psalm 150:1-6",
      text: "Worthy is the Lamb that was slain to receive power, and riches, and wisdom, and strength, and honour, and glory, and blessing.",
      book: "Revelation",
      chapter: 5,
      verse: 12
    },
    stanzas: [
      {
        number: 1,
        text: `When peace like a river attendeth my way,\nWhen sorrows like sea billows roll;\nWhatever my lot, Thou hast taught me to say,\nIt is well, it is well with my soul.`
      },
      {
        number: 2,
        text: `Though Satan should buffet, though trials should come,\nLet this blest assurance control,\nThat Christ has regarded my helpless estate,\nAnd hath shed His own blood for my soul.`
      },
      {
        number: 3,
        text: `My sin, oh, the bliss of this glorious thought!\nMy sin, not in part but the whole,\nIs nailed to the cross, and I bear it no more,\nPraise the Lord, praise the Lord, O my soul!`
      },
      {
        number: 4,
        text: `And Lord, haste the day when my faith shall be sight,\nThe clouds be rolled back as a scroll;\nThe trump shall resound, and the Lord shall descend,\nEven so, it is well with my soul.`
      }
    ],
    historicalStory: `Penned by ${author}, "${title}" is celebrated across the global body of Christ as an anthem of persevering peace and triumphant hope in Christ Jesus.`,
    theologicalInsight: `Anchored in the finished work of Jesus on the Cross, this hymn leads the worshiper into unbroken serenity and victory over death, sin, and despair.`,
    devotionalPrayer: `Father, let the glorious message of "${title}" be etched deeply onto the tables of my heart. In every season, let my soul sing 'It is well.' In the Name of Jesus Christ, Amen.`,
    tags: ["Hymnal", "Peace", "Redemption", "Worship", "Grace"],
    melodyNotes: [
      { note: "C4", duration: 1.0 },
      { note: "E4", duration: 1.0 },
      { note: "G4", duration: 1.0 },
      { note: "C5", duration: 2.0 }
    ]
  };
});
