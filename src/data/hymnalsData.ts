import { HymnItem } from "../types";
import { ADDITIONAL_50_HYMNALS } from "./additionalHymnals";
import { ADDITIONAL_HYMNALS_PART_2 } from "./additionalHymnalsPart2";
import { HYMNAL_500_PART_1 } from "./hymnalCatalog500Part1";
import { HYMNAL_500_PART_2 } from "./hymnalCatalog500Part2";
import { HYMNAL_500_PART_3 } from "./hymnalCatalog500Part3";
import { HYMNAL_500_PART_4 } from "./hymnalCatalog500Part4";
import { HYMNAL_1000_PART_1 } from "./hymnalCatalog1000Part1";
import { HYMNAL_1000_PART_2 } from "./hymnalCatalog1000Part2";
import { HYMNAL_1000_PART_3 } from "./hymnalCatalog1000Part3";
import { HYMNAL_1000_PART_4 } from "./hymnalCatalog1000Part4";
import { generate500PopularHymns } from "./hymnalsExpandedCatalog";

export const HYMN_CATEGORIES = [
  "All",
  "Old Spirituals & Revival",
  "Grace & Redemption",
  "Praise & Adoration",
  "Faith & Trust",
  "Cross & Resurrection",
  "Ancient & Classical",
  "Prayer & Consecration"
] as const;

const BASE_HYMNALS_COLLECTION: HymnItem[] = [
  {
    id: "hymn-01-amazing-grace",
    hymnNumber: 1,
    title: "Amazing Grace",
    alternateTitle: "Faith's Review and Expectation",
    category: "Grace & Redemption",
    author: "John Newton",
    composer: "Traditional American Melody (William Walker)",
    tuneName: "NEW BRITAIN",
    year: "1779",
    meter: "C.M. (8.6.8.6)",
    keySignature: "G Major",
    scriptureAnchor: {
      reference: "1 Chronicles 17:16-17; Ephesians 2:8-9",
      text: "For by grace are ye saved through faith; and that not of yourselves: it is the gift of God: Not of works, lest any man should boast.",
      book: "Ephesians",
      chapter: 2,
      verse: 8
    },
    stanzas: [
      {
        number: 1,
        text: `Amazing grace! how sweet the sound,\nThat saved a wretch like me!\nI once was lost, but now am found,\nWas blind, but now I see.`
      },
      {
        number: 2,
        text: `'Twas grace that taught my heart to fear,\nAnd grace my fears relieved;\nHow precious did that grace appear\nThe hour I first believed!`
      },
      {
        number: 3,
        text: `Through many dangers, toils, and snares,\nI have already come;\n'Tis grace hath brought me safe thus far,\nAnd grace will lead me home.`
      },
      {
        number: 4,
        text: `The Lord has promised good to me,\nHis word my hope secures;\nHe will my shield and portion be\nAs long as life endures.`
      },
      {
        number: 5,
        text: `Yea, when this flesh and heart shall fail,\nAnd mortal life shall cease,\nI shall possess within the veil\nA life of joy and peace.`
      },
      {
        number: 6,
        text: `When we've been there ten thousand years,\nBright shining as the sun,\nWe've no less days to sing God's praise\nThan when we'd first begun.`
      }
    ],
    historicalStory: `Written by John Newton (1725–1807), a former slave-ship captain who underwent a dramatic spiritual awakening during a violent storm at sea in 1748. After crying out to God for mercy, he abandoned the slave trade, studied theology, and was ordained as an Anglican pastor in Olney, England. He penned this hymn for his New Year's Day sermon in 1773 based on King David's prayer of gratitude in 1 Chronicles 17.`,
    theologicalInsight: `The hymn captures the unmerited, transformative sovereign grace of God. It moves chronologically from the sinner's initial conviction ('grace that taught my heart to fear'), to conversion ('the hour I first believed'), through life's trials ('brought me safe thus far'), and into eternal glory ('ten thousand years').`,
    devotionalPrayer: `Lord God of all grace, when I look back at where You brought me from, my heart is filled with wonder. Thank You for seeking me when I was lost, opening my spiritual eyes when I was blind, and preserving my life through unseen snares. Lead me home in Your unfailing righteousness. In Jesus' Name, Amen.`,
    tags: ["Grace", "Salvation", "Testimony", "Eternity", "John Newton"],
    melodyNotes: [
      { note: "D4", duration: 0.5 },
      { note: "G4", duration: 1.0 },
      { note: "B4", duration: 0.5 },
      { note: "G4", duration: 0.5 },
      { note: "B4", duration: 1.0 },
      { note: "A4", duration: 0.5 },
      { note: "G4", duration: 1.0 },
      { note: "E4", duration: 0.5 },
      { note: "D4", duration: 1.0 },
      { note: "D4", duration: 0.5 },
      { note: "G4", duration: 1.0 },
      { note: "B4", duration: 0.5 },
      { note: "G4", duration: 0.5 },
      { note: "B4", duration: 1.0 },
      { note: "A4", duration: 0.5 },
      { note: "D5", duration: 2.0 }
    ]
  },
  {
    id: "hymn-02-it-is-well-with-my-soul",
    hymnNumber: 2,
    title: "It Is Well with My Soul",
    alternateTitle: "When Peace Like a River",
    category: "Faith & Trust",
    author: "Horatio G. Spafford",
    composer: "Philip P. Bliss",
    tuneName: "VILLE DU HAVRE",
    year: "1873",
    meter: "11.8.11.9 with Refrain",
    keySignature: "C Major",
    scriptureAnchor: {
      reference: "2 Kings 4:26; Philippians 4:7",
      text: "And the peace of God, which passeth all understanding, shall keep your hearts and minds through Christ Jesus.",
      book: "Philippians",
      chapter: 4,
      verse: 7
    },
    stanzas: [
      {
        number: 1,
        text: `When peace, like a river, attendeth my way,\nWhen sorrows like sea billows roll;\nWhatever my lot, Thou hast taught me to say,\nIt is well, it is well with my soul.`
      },
      {
        number: 2,
        text: `Though Satan should buffet, though trials should come,\nLet this blest assurance control,\nThat Christ hath regarded my helpless estate,\nAnd hath shed His own blood for my soul.`
      },
      {
        number: 3,
        text: `My sin—oh, the bliss of this glorious thought!—\nMy sin, not in part but the whole,\nIs nailed to the cross, and I bear it no more,\nPraise the Lord, praise the Lord, O my soul!`
      },
      {
        number: 4,
        text: `And Lord, haste the day when the faith shall be sight,\nThe clouds be rolled back as a scroll;\nThe trump shall resound, and the Lord shall descend,\nEven so, it is well with my soul.`
      }
    ],
    chorus: `It is well (it is well),\nWith my soul (with my soul),\nIt is well, it is well with my soul.`,
    historicalStory: `Horatio Spafford, a prominent Chicago lawyer, lost his four-year-old son in the Great Chicago Fire of 1871. In 1873, he sent his wife Anna and their four daughters to Europe on the steamship SS Ville du Havre. The ship collided with another vessel and sank within 12 minutes. All four daughters perished; only Anna survived, sending the famous telegram: 'Saved alone. What shall I do?' Spafford immediately boarded a ship to join her, and as the captain pointed out the place where his daughters drowned, Spafford returned to his cabin and penned these immortal words.`,
    theologicalInsight: `Spafford's peace was rooted not in the absence of grief, but in the sufficiency of Christ's atonement ('My sin... is nailed to the cross') and the blessed hope of the resurrection. True Biblical peace anchors the soul during life's fiercest tsunamis.`,
    devotionalPrayer: `Father, when trials buffet my life and sorrow threatens to overwhelm me, anchor my heart in the blood of Jesus. Grant me the supernatural peace that transcends human comprehension so that, whatever my lot, I can decree with unshakeable faith: It is well with my soul! Amen.`,
    tags: ["Peace", "Overcoming", "Comfort", "Assurance", "Resurrection"],
    melodyNotes: [
      { note: "C4", duration: 1.0 },
      { note: "E4", duration: 0.5 },
      { note: "G4", duration: 1.0 },
      { note: "G4", duration: 0.5 },
      { note: "A4", duration: 1.0 },
      { note: "G4", duration: 1.0 },
      { note: "E4", duration: 0.5 },
      { note: "D4", duration: 1.0 },
      { note: "C4", duration: 1.5 }
    ]
  },
  {
    id: "hymn-03-swing-low-sweet-chariot",
    hymnNumber: 3,
    title: "Swing Low, Sweet Chariot",
    alternateTitle: "Chariot of Deliverance",
    category: "Old Spirituals & Revival",
    author: "Traditional African American Spiritual (Wallace Willis)",
    composer: "Spiritual Melody (Fisk Jubilee Singers Arrangement)",
    tuneName: "SWING LOW",
    year: "c. 1865",
    meter: "Irregular with Refrain",
    keySignature: "F Major",
    scriptureAnchor: {
      reference: "2 Kings 2:11; Luke 16:22",
      text: "And it came to pass, as they still went on, and talked, that, behold, there appeared a chariot of fire, and horses of fire... and Elijah went up by a whirlwind into heaven.",
      book: "2 Kings",
      chapter: 2,
      verse: 11
    },
    stanzas: [
      {
        number: 1,
        text: `I looked over Jordan, and what did I see,\nComing for to carry me home?\nA band of angels coming after me,\nComing for to carry me home.`
      },
      {
        number: 2,
        text: `If you get there before I do,\nComing for to carry me home,\nTell all my friends I'm coming too,\nComing for to carry me home.`
      },
      {
        number: 3,
        text: `The brightest day that ever I saw,\nComing for to carry me home,\nWhen Jesus washed my sins away,\nComing for to carry me home.`
      },
      {
        number: 4,
        text: `I'm sometimes up and sometimes down,\nComing for to carry me home,\nBut still my soul feels heavenly bound,\nComing for to carry me home.`
      }
    ],
    chorus: `Swing low, sweet chariot,\nComing for to carry me home;\nSwing low, sweet chariot,\nComing for to carry me home.`,
    historicalStory: `Composed by Wallace Willis, an enslaved Choctaw freedman in Oklahoma prior to 1862. It was inspired by the Red River which reminded him of the River Jordan and the Prophet Elijah being taken to heaven in a fiery chariot. Alexander Reid heard Willis singing it and transcribed the melody, giving it to the Fisk Jubilee Singers, who popularized it internationally in 1871. It also served as a secret code along the Underground Railroad signaling that help or rescue was near.`,
    theologicalInsight: `Spirituals contain dual layers of profound theological hope: immediate deliverance from earthly oppression and ultimate celestial coronation with Christ. Crossing the Jordan represents passing from trials into the Promised Land of eternal glory.`,
    devotionalPrayer: `Holy God, when I face difficult trials on this earth, remind me that this world is not my final home. Send Your ministering angels to surround my footsteps, and keep my heart firmly anchored on the glorious kingdom of Jesus Christ. Amen.`,
    tags: ["Spiritual", "Deliverance", "Hope", "Angels", "Heaven", "Revival"],
    melodyNotes: [
      { note: "F4", duration: 1.0 },
      { note: "D4", duration: 0.5 },
      { note: "F4", duration: 1.5 },
      { note: "A4", duration: 1.0 },
      { note: "F4", duration: 0.5 },
      { note: "G4", duration: 1.0 },
      { note: "F4", duration: 2.0 }
    ]
  },
  {
    id: "hymn-04-great-is-thy-faithfulness",
    hymnNumber: 4,
    title: "Great Is Thy Faithfulness",
    alternateTitle: "Unfailing Compassions",
    category: "Praise & Adoration",
    author: "Thomas O. Chisholm",
    composer: "William M. Runyan",
    tuneName: "FAITHFULNESS",
    year: "1923",
    meter: "11.10.11.10 with Refrain",
    keySignature: "D Major",
    scriptureAnchor: {
      reference: "Lamentations 3:22-23; James 1:17",
      text: "It is of the Lord's mercies that we are not consumed, because his compassions fail not. They are new every morning: great is thy faithfulness.",
      book: "Lamentations",
      chapter: 3,
      verse: 23
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
    chorus: `Great is Thy faithfulness! Great is Thy faithfulness!\nMorning by morning new mercies I see;\nAll I have needed Thy hand hath provided—\nGreat is Thy faithfulness, Lord, unto me!`,
    historicalStory: `Thomas Chisholm (1866–1960) did not experience sudden cataclysmic disasters, but suffered from poor physical health his entire adult life. He worked as an insurance agent and freelance writer. In his old age, he testified: 'My income has not been large at any time due to impaired health, but I must not fail to record the unfailing faithfulness of a covenant-keeping God.' He sent the poem to his friend William Runyan at Moody Bible Institute, who wrote the stirring music.`,
    theologicalInsight: `Based on Lamentations 3, written amidst the ashes of Jerusalem. Jeremiah and Chisholm both declare that God's faithfulness is not conditional on our circumstances, but rooted in the unchangeable character of God: 'There is no shadow of turning with Thee.'`,
    devotionalPrayer: `Faithful Father, thank You that Your mercies are fresh every single morning. When yesterday brought exhaustion or worry, today You supply fresh grace, divine strength, and bright hope for tomorrow. I magnify Your holy Name! Amen.`,
    tags: ["Faithfulness", "Provision", "Mercy", "Praise", "Morning"],
    melodyNotes: [
      { note: "D4", duration: 1.0 },
      { note: "F#4", duration: 1.0 },
      { note: "A4", duration: 1.0 },
      { note: "B4", duration: 0.5 },
      { note: "A4", duration: 1.5 },
      { note: "G4", duration: 0.5 },
      { note: "F#4", duration: 1.0 },
      { note: "E4", duration: 1.0 },
      { note: "D4", duration: 2.0 }
    ]
  },
  {
    id: "hymn-05-how-great-thou-art",
    hymnNumber: 5,
    title: "How Great Thou Art",
    alternateTitle: "O Store Gud",
    category: "Praise & Adoration",
    author: "Carl Boberg (English translation by Stuart K. Hine)",
    composer: "Swedish Folk Melody",
    tuneName: "O STORE GUD",
    year: "1885 / 1949",
    meter: "11.10.11.10 with Refrain",
    keySignature: "B-flat Major",
    scriptureAnchor: {
      reference: "Psalm 104:1-2; Revelation 4:11",
      text: "Bless the Lord, O my soul. O Lord my God, thou art very great; thou art clothed with honour and majesty.",
      book: "Psalms",
      chapter: 104,
      verse: 1
    },
    stanzas: [
      {
        number: 1,
        text: `O Lord my God, when I in awesome wonder\nConsider all the worlds Thy hands have made,\nI see the stars, I hear the rolling thunder,\nThy power throughout the universe displayed.`
      },
      {
        number: 2,
        text: `When through the woods and forest glades I wander,\nAnd hear the birds sing sweetly in the trees;\nWhen I look down from lofty mountain grandeur,\nAnd hear the brook and feel the gentle breeze.`
      },
      {
        number: 3,
        text: `And when I think that God, His Son not sparing,\nSent Him to die, I scarce can take it in;\nThat on the cross, my burden gladly bearing,\nHe bled and died to take away my sin.`
      },
      {
        number: 4,
        text: `When Christ shall come with shout of acclamation\nAnd take me home, what joy shall fill my heart!\nThen I shall bow in humble adoration,\nAnd there proclaim, my God, how great Thou art!`
      }
    ],
    chorus: `Then sings my soul, my Savior God, to Thee:\nHow great Thou art, how great Thou art!\nThen sings my soul, my Savior God, to Thee:\nHow great Thou art, how great Thou art!`,
    historicalStory: `Swedish poet and pastor Carl Boberg was walking home in 1885 when a sudden violent thunderstorm struck with intense lightning and gale winds, followed immediately by clear blue skies, birds chirping in the calm, and church bells chiming in the distance. Overwhelmed by God's majesty, he fell on his knees and wrote the poem 'O Store Gud'. Decades later, British missionary Stuart K. Hine added verses while evangelizing in the Carpathian mountains.`,
    theologicalInsight: `The hymn progresses masterfully from general revelation in the wonders of the cosmos to special revelation in Christ's sacrificial substitution on the Cross, and finally to eschatological consummation at the Second Coming.`,
    devotionalPrayer: `Almighty God, creator of the ends of the earth, my soul bows in awe of Your majestic power. When I look at creation, when I meditate on the Cross of Calvary, and when I anticipate Your triumphant return, my soul cries out: How Great Thou Art! Amen.`,
    tags: ["Creation", "Majesty", "Praise", "Cross", "Second Coming"],
    melodyNotes: [
      { note: "F4", duration: 0.5 },
      { note: "Bb4", duration: 1.0 },
      { note: "Bb4", duration: 0.5 },
      { note: "C5", duration: 0.5 },
      { note: "D5", duration: 1.0 },
      { note: "Bb4", duration: 0.5 },
      { note: "Eb5", duration: 1.0 },
      { note: "D5", duration: 0.5 },
      { note: "C5", duration: 1.5 }
    ]
  },
  {
    id: "hymn-06-were-you-there",
    hymnNumber: 6,
    title: "Were You There When They Crucified My Lord?",
    alternateTitle: "Calvary Spiritual",
    category: "Old Spirituals & Revival",
    author: "Traditional African American Spiritual",
    composer: "Traditional Spiritual Melody",
    tuneName: "WERE YOU THERE",
    year: "19th Century",
    meter: "Irregular with Refrain",
    keySignature: "E-flat Major",
    scriptureAnchor: {
      reference: "Luke 23:33; Matthew 27:45-54",
      text: "And when they were come to the place, which is called Calvary, there they crucified him, and the malefactors, one on the right hand, and the other on the left.",
      book: "Luke",
      chapter: 23,
      verse: 33
    },
    stanzas: [
      {
        number: 1,
        text: `Were you there when they crucified my Lord?\nWere you there when they crucified my Lord?\nOh! Sometimes it causes me to tremble, tremble, tremble.\nWere you there when they crucified my Lord?`
      },
      {
        number: 2,
        text: `Were you there when they nailed Him to the tree?\nWere you there when they nailed Him to the tree?\nOh! Sometimes it causes me to tremble, tremble, tremble.\nWere you there when they nailed Him to the tree?`
      },
      {
        number: 3,
        text: `Were you there when they pierced Him in the side?\nWere you there when they pierced Him in the side?\nOh! Sometimes it causes me to tremble, tremble, tremble.\nWere you there when they pierced Him in the side?`
      },
      {
        number: 4,
        text: `Were you there when the sun refused to shine?\nWere you there when the sun refused to shine?\nOh! Sometimes it causes me to tremble, tremble, tremble.\nWere you there when the sun refused to shine?`
      },
      {
        number: 5,
        text: `Were you there when they laid Him in the tomb?\nWere you there when they laid Him in the tomb?\nOh! Sometimes it causes me to tremble, tremble, tremble.\nWere you there when they laid Him in the tomb?`
      },
      {
        number: 6,
        text: `Were you there when He rose up from the dead?\nWere you there when He rose up from the dead?\nOh! Sometimes it causes me to shout, shout, shout!\nWere you there when He rose up from the dead?`
      }
    ],
    historicalStory: `One of the most emotionally penetrating spirituals ever created, forged in the crucible of American slavery in the early 19th century. Enslaved believers intimately identified their own suffering and beatings with the agony of Christ on the cross, while finding unquenchable victory in His triumphant resurrection. It was first published in William E. Barton's 1899 collection 'Old Plantation Hymns'.`,
    theologicalInsight: `The question 'Were you there?' is not historical curiosity; it is a profound existential summons. Through faith, every believer was united with Christ on the Cross (Galatians 2:20) and participates in His resurrection power.`,
    devotionalPrayer: `Lord Jesus, my heart trembles in solemn reverence when I remember the price of my redemption. Thank You for bearing my shame, my wounds, and my death on the tree, and thank You for rising from the tomb with all power in Your hands. Glory to Your holy Name! Amen.`,
    tags: ["Spiritual", "Crucifixion", "Passion", "Tomb", "Resurrection", "Calvary"],
    melodyNotes: [
      { note: "Eb4", duration: 1.0 },
      { note: "G4", duration: 1.0 },
      { note: "Bb4", duration: 1.5 },
      { note: "C5", duration: 0.5 },
      { note: "Bb4", duration: 1.0 },
      { note: "G4", duration: 1.0 },
      { note: "F4", duration: 2.0 }
    ]
  },
  {
    id: "hymn-07-blessed-assurance",
    hymnNumber: 7,
    title: "Blessed Assurance, Jesus Is Mine!",
    alternateTitle: "Heir of Salvation",
    category: "Faith & Trust",
    author: "Fanny J. Crosby",
    composer: "Phoebe P. Knapp",
    tuneName: "ASSURANCE",
    year: "1873",
    meter: "9.10.9.9 with Refrain",
    keySignature: "D Major",
    scriptureAnchor: {
      reference: "Hebrews 10:22; 1 John 5:13",
      text: "Let us draw near with a true heart in full assurance of faith, having our hearts sprinkled from an evil conscience, and our bodies washed with pure water.",
      book: "Hebrews",
      chapter: 10,
      verse: 22
    },
    stanzas: [
      {
        number: 1,
        text: `Blessed assurance, Jesus is mine!\nOh, what a foretaste of glory divine!\nHeir of salvation, purchase of God,\nBorn of His Spirit, washed in His blood.`
      },
      {
        number: 2,
        text: `Perfect submission, perfect delight,\nVisions of rapture now burst on my sight;\nAngels descending, bring from above\nEchoes of mercy, whispers of love.`
      },
      {
        number: 3,
        text: `Perfect submission, all is at rest,\nI in my Savior am happy and blest;\nWatching and waiting, looking above,\nFilled with His goodness, lost in His love.`
      }
    ],
    chorus: `This is my story, this is my song,\nPraising my Savior all the day long;\nThis is my story, this is my song,\nPraising my Savior all the day long.`,
    historicalStory: `Fanny Crosby, blind from infancy due to a medical mistake, wrote more than 8,000 hymns in her lifetime. In 1873, she was visiting her close friend Phoebe Knapp, who played a new tune on her piano and asked: 'Fanny, what does this tune say to you?' Without hesitation, Crosby responded: 'It says: Blessed assurance, Jesus is mine!' and immediately dictated the stanzas and chorus.`,
    theologicalInsight: `Crosby demonstrates that spiritual vision far surpasses physical eyesight. Full assurance of salvation in Christ produces perfect rest, joy, and continual praise, turning every believer's life into a living testimony.`,
    devotionalPrayer: `Blessed Jesus, thank You for the absolute assurance that I belong to You. I am washed in Your precious blood and filled with Your Spirit. Make my life a continuous song of praise to Your holy Name throughout all my days. Amen.`,
    tags: ["Assurance", "Joy", "Praise", "Fanny Crosby", "Holy Spirit"],
    melodyNotes: [
      { note: "A4", duration: 0.5 },
      { note: "F#4", duration: 0.5 },
      { note: "D4", duration: 1.0 },
      { note: "F#4", duration: 0.5 },
      { note: "A4", duration: 1.5 },
      { note: "B4", duration: 0.5 },
      { note: "A4", duration: 1.0 },
      { note: "F#4", duration: 0.5 },
      { note: "D4", duration: 2.0 }
    ]
  },
  {
    id: "hymn-08-rock-of-ages",
    hymnNumber: 8,
    title: "Rock of Ages, Cleft for Me",
    alternateTitle: "Let Me Hide Myself in Thee",
    category: "Grace & Redemption",
    author: "Augustus M. Toplady",
    composer: "Thomas Hastings",
    tuneName: "TOPLADY",
    year: "1776",
    meter: "7.7.7.7.7.7",
    keySignature: "B-flat Major",
    scriptureAnchor: {
      reference: "Psalm 18:2; 1 Corinthians 10:4",
      text: "The Lord is my rock, and my fortress, and my deliverer; my God, my strength, in whom I will trust; my buckler, and the horn of my salvation, and my high tower.",
      book: "Psalms",
      chapter: 18,
      verse: 2
    },
    stanzas: [
      {
        number: 1,
        text: `Rock of Ages, cleft for me,\nLet me hide myself in Thee;\nLet the water and the blood,\nFrom Thy riven side which flowed,\nBe of sin the double cure,\nSave me from its guilt and power.`
      },
      {
        number: 2,
        text: `Not the labors of my hands\nCan fulfill Thy law's demands;\nCould my zeal no respite know,\nCould my tears forever flow,\nAll for sin could not atone;\nThou must save, and Thou alone.`
      },
      {
        number: 3,
        text: `Nothing in my hand I bring,\nSimply to Thy cross I cling;\nNaked, come to Thee for dress;\nHelpless, look to Thee for grace;\nFoul, I to the fountain fly;\nWash me, Savior, or I die.`
      },
      {
        number: 4,
        text: `While I draw this fleeting breath,\nWhen mine eyes shall close in death,\nWhen I soar to worlds unknown,\nSee Thee on Thy judgment throne,\nRock of Ages, cleft for me,\nLet me hide myself in Thee.`
      }
    ],
    historicalStory: `Augustus Toplady (1740–1778), an English vicar, was traveling through the gorge of Burrington Combe when a violent tempest struck. Finding shelter in a deep crevice in a massive limestone cliff, he reflected on Christ as the true spiritual Rock cleft for sinners. Finding a playing card on the ground, he penned the first draft on its back while the storm raged.`,
    theologicalInsight: `One of the clearest explanations of justification by grace alone through faith: 'Nothing in my hand I bring, simply to Thy cross I cling.' The double cure addresses both the guilt of sin (justification) and the power of sin (sanctification).`,
    devotionalPrayer: `Lord Jesus, my eternal Rock of Ages, I abandon all self-righteousness and hide myself under the shadow of Your cross. Wash me in the cleansing stream of Your precious blood and keep me secure in life, in death, and in eternity. Amen.`,
    tags: ["Rock", "Grace", "Atonement", "Salvation", "Justification"],
    melodyNotes: [
      { note: "Bb4", duration: 1.0 },
      { note: "G4", duration: 0.5 },
      { note: "F4", duration: 1.0 },
      { note: "Bb4", duration: 1.0 },
      { note: "C5", duration: 1.0 },
      { note: "D5", duration: 1.5 }
    ]
  },
  {
    id: "hymn-09-the-old-rugged-cross",
    hymnNumber: 9,
    title: "The Old Rugged Cross",
    alternateTitle: "Emblem of Suffering and Shame",
    category: "Cross & Resurrection",
    author: "George Bennard",
    composer: "George Bennard",
    tuneName: "OLD RUGGED CROSS",
    year: "1913",
    meter: "Irregular with Chorus",
    keySignature: "B-flat Major",
    scriptureAnchor: {
      reference: "Galatians 6:14; 1 Peter 2:24",
      text: "But God forbid that I should glory, save in the cross of our Lord Jesus Christ, by whom the world is crucified unto me, and I unto the world.",
      book: "Galatians",
      chapter: 6,
      verse: 14
    },
    stanzas: [
      {
        number: 1,
        text: `On a hill far away stood an old rugged cross,\nThe emblem of suffering and shame;\nAnd I love that old cross where the dearest and best\nFor a world of lost sinners was slain.`
      },
      {
        number: 2,
        text: `O that old rugged cross, so despised by the world,\nHas a wondrous attraction for me;\nFor the dear Lamb of God left His glory above\nTo bear it to dark Calvary.`
      },
      {
        number: 3,
        text: `In that old rugged cross, stained with blood so divine,\nA wondrous beauty I see,\nFor 'twas on that old cross Jesus suffered and died,\nTo pardon and sanctify me.`
      },
      {
        number: 4,
        text: `To the old rugged cross I will ever be true,\nIts shame and reproach gladly bear;\nThen He'll call me some day to my home far away,\nWhere His glory forever I'll share.`
      }
    ],
    chorus: `So I'll cherish the old rugged cross,\nTill my trophies at last I lay down;\nI will cling to the old rugged cross,\nAnd exchange it some day for a crown.`,
    historicalStory: `Evangelist George Bennard wrote this hymn in Albion, Michigan, in 1913 following intense prayer and deep meditation on the spiritual significance of the cross. He stated: 'I seemed to have a vision of Christ on the cross... The Christ of the Cross became more than a symbol; He became the very heart of the Gospel.' It became the theme song of major revival meetings across the world.`,
    theologicalInsight: `The cross, which was the instrument of cruel Roman execution and worldly humiliation, is transformed by Christ into the sublime symbol of sacrificial love, divine pardon, and eternal glory.`,
    devotionalPrayer: `Precious Savior, forbid that I should boast in anything save the cross of Jesus Christ. I cherish the blood You spilled on Calvary. Give me strength to bear Your reproach with joy until the day I lay down my earthly trophies and receive the crown of life. Amen.`,
    tags: ["Cross", "Calvary", "Atonement", "Revival", "Crown of Life"],
    melodyNotes: [
      { note: "F4", duration: 0.5 },
      { note: "Bb4", duration: 1.0 },
      { note: "Bb4", duration: 0.5 },
      { note: "C5", duration: 0.5 },
      { note: "D5", duration: 1.0 },
      { note: "Bb4", duration: 0.5 },
      { note: "F4", duration: 1.5 }
    ]
  },
  {
    id: "hymn-10-holy-holy-holy",
    hymnNumber: 10,
    title: "Holy, Holy, Holy! Lord God Almighty",
    alternateTitle: "The Trisagion",
    category: "Praise & Adoration",
    author: "Reginald Heber",
    composer: "John B. Dykes",
    tuneName: "NICAEA",
    year: "1826",
    meter: "11.12.12.10",
    keySignature: "E-flat Major",
    scriptureAnchor: {
      reference: "Isaiah 6:3; Revelation 4:8",
      text: "And one cried unto another, and said, Holy, holy, holy, is the Lord of hosts: the whole earth is full of his glory.",
      book: "Isaiah",
      chapter: 6,
      verse: 3
    },
    stanzas: [
      {
        number: 1,
        text: `Holy, holy, holy! Lord God Almighty!\nEarly in the morning our song shall rise to Thee;\nHoly, holy, holy, merciful and mighty!\nGod in three Persons, blessed Trinity!`
      },
      {
        number: 2,
        text: `Holy, holy, holy! all the saints adore Thee,\nCasting down their golden crowns around the glassy sea;\nCherubim and seraphim falling down before Thee,\nWhich wert, and art, and evermore shalt be.`
      },
      {
        number: 3,
        text: `Holy, holy, holy! though the darkness hide Thee,\nThough the eye of sinful man Thy glory may not see;\nOnly Thou art holy; there is none beside Thee,\nPerfect in power, in love, and purity.`
      },
      {
        number: 4,
        text: `Holy, holy, holy! Lord God Almighty!\nAll Thy works shall praise Thy Name, in earth, and sky, and sea;\nHoly, holy, holy; merciful and mighty!\nGod in three Persons, blessed Trinity!`
      }
    ],
    historicalStory: `Reginald Heber (1783–1826), Anglican bishop of Calcutta, composed this majestic hymn specifically for Trinity Sunday. The tune 'NICAEA' was named by composer John B. Dykes in honor of the First Council of Nicaea (AD 325), which formulated the historic Nicene Creed establishing the orthodox doctrine of the Trinity.`,
    theologicalInsight: `The threefold repetition ('Holy, holy, holy') reflects the Hebrew superlative expressing absolute perfection and honors the Triune God: Father, Son, and Holy Spirit. God's holiness is the transcendent foundation of all His attributes.`,
    devotionalPrayer: `Holy, Holy, Holy Lord God Almighty! Heaven and earth are full of Your glory. We join the elders and angels casting our crowns before Your throne. Cleanse our hearts, sanctify our thoughts, and receive our highest praise today. Amen.`,
    tags: ["Trinity", "Holiness", "Worship", "Angels", "Morning"],
    melodyNotes: [
      { note: "Eb4", duration: 1.0 },
      { note: "Eb4", duration: 1.0 },
      { note: "G4", duration: 1.0 },
      { note: "G4", duration: 1.0 },
      { note: "Bb4", duration: 2.0 },
      { note: "Bb4", duration: 2.0 },
      { note: "C5", duration: 1.0 },
      { note: "C5", duration: 1.0 },
      { note: "C5", duration: 1.0 },
      { note: "C5", duration: 1.0 },
      { note: "Bb4", duration: 3.0 }
    ]
  },
  {
    id: "hymn-11-a-mighty-fortress",
    hymnNumber: 11,
    title: "A Mighty Fortress Is Our God",
    alternateTitle: "Ein feste Burg ist unser Gott",
    category: "Ancient & Classical",
    author: "Martin Luther (Translated by Frederick H. Hedge)",
    composer: "Martin Luther",
    tuneName: "EIN FESTE BURG",
    year: "1529",
    meter: "8.7.8.7.6.6.6.6.7",
    keySignature: "C Major",
    scriptureAnchor: {
      reference: "Psalm 46:1-3; Romans 8:31",
      text: "God is our refuge and strength, a very present help in trouble. Therefore will not we fear, though the earth be removed, and though the mountains be carried into the midst of the sea.",
      book: "Psalms",
      chapter: 46,
      verse: 1
    },
    stanzas: [
      {
        number: 1,
        text: `A mighty fortress is our God,\nA bulwark never failing;\nOur helper He, amid the flood\nOf mortal ills prevailing:\nFor still our ancient foe\nDoth seek to work us woe;\nHis craft and power are great,\nAnd, armed with cruel hate,\nOn earth is not his equal.`
      },
      {
        number: 2,
        text: `Did we in our own strength confide,\nOur striving would be losing;\nWere not the right Man on our side,\nThe Man of God's own choosing:\nDost ask who that may be?\nChrist Jesus, it is He;\nLord Sabaoth His Name,\nFrom age to age the same,\nAnd He must win the battle.`
      },
      {
        number: 3,
        text: `And though this world, with devils filled,\nShould threaten to undo us,\nWe will not fear, for God hath willed\nHis truth to triumph through us:\nThe Prince of Darkness grim,\nWe tremble not for him;\nHis rage we can endure,\nFor lo, his doom is sure,\nOne little word shall fell him.`
      },
      {
        number: 4,
        text: `That word above all earthly powers,\nNo thanks to them, abideth;\nThe Spirit and the gifts are ours\nThrough Him Who with us sideth:\nLet goods and kindred go,\nThis mortal life also;\nThe body they may kill:\nGod's truth abideth still,\nHis kingdom is forever.`
      }
    ],
    historicalStory: `Known as the 'Battle Hymn of the Reformation', Martin Luther penned the words and music based on Psalm 46 between 1527 and 1529. When the Black Plague struck Wittenberg and death threatened all around him, Luther opened his home as a hospital and sang this hymn to anchor the people's faith against despair and spiritual warfare.`,
    theologicalInsight: `Human power is completely inadequate against the forces of darkness ('Did we in our own strength confide, our striving would be losing'). Christ Jesus, Lord of Hosts (Lord Sabaoth), guarantees the final triumph of God's Kingdom.`,
    devotionalPrayer: `Lord Sabaoth, mighty fortress of our lives, when the world and spiritual adversaries threaten our peace, we hide within the rock of Your Word. You are our defender and eternal Victor. Let Your truth triumph in us today. Amen.`,
    tags: ["Refuge", "Spiritual Warfare", "Martin Luther", "Reformation", "Victory"],
    melodyNotes: [
      { note: "C5", duration: 1.0 },
      { note: "C5", duration: 1.0 },
      { note: "C5", duration: 1.0 },
      { note: "G4", duration: 1.0 },
      { note: "A4", duration: 0.5 },
      { note: "B4", duration: 0.5 },
      { note: "C5", duration: 1.5 }
    ]
  },
  {
    id: "hymn-12-steal-away-to-jesus",
    hymnNumber: 12,
    title: "Steal Away to Jesus",
    alternateTitle: "My Lord Calls Me by the Thunder",
    category: "Old Spirituals & Revival",
    author: "Traditional African American Spiritual (Wallace Willis)",
    composer: "Spiritual Melody",
    tuneName: "STEAL AWAY",
    year: "c. 1860",
    meter: "Irregular with Refrain",
    keySignature: "F Major",
    scriptureAnchor: {
      reference: "Matthew 11:28; Song of Solomon 2:10",
      text: "Come unto me, all ye that labour and are heavy laden, and I will give you rest.",
      book: "Matthew",
      chapter: 11,
      verse: 28
    },
    stanzas: [
      {
        number: 1,
        text: `My Lord, He calls me,\nHe calls me by the thunder;\nThe trumpet sounds within my soul,\nI ain't got long to stay here.`
      },
      {
        number: 2,
        text: `Green trees are bending,\nPoor sinners stand a-trembling;\nThe trumpet sounds within my soul,\nI ain't got long to stay here.`
      },
      {
        number: 3,
        text: `Tombstones are bursting,\nPoor sinners stand a-trembling;\nThe trumpet sounds within my soul,\nI ain't got long to stay here.`
      },
      {
        number: 4,
        text: `My Lord, He calls me,\nHe calls me by the lightning;\nThe trumpet sounds within my soul,\nI ain't got long to stay here.`
      }
    ],
    chorus: `Steal away, steal away, steal away to Jesus!\nSteal away, steal away home, I ain't got long to stay here.`,
    historicalStory: `Penned by Wallace Willis in the mid-19th century. Enslaved people who were forbidden from gathering for worship sang this spiritual to notify one another of secret nighttime prayer meetings in the woods ('bush arbors') or to signal that Harriet Tubman or an Underground Railroad conductor was orchestrating an escape to freedom.`,
    theologicalInsight: `A summons to leave behind the noisy bondage of this fallen world and steal away into the secret place of the Most High, finding refuge in the presence of Jesus Christ.`,
    devotionalPrayer: `Lord Jesus, in the midst of a noisy and weary world, I hear Your gentle voice calling me to the secret place. I steal away into Your presence to find rest, strength, and divine direction. Renew my soul in Your love. Amen.`,
    tags: ["Spiritual", "Secret Place", "Prayer", "Deliverance", "Refuge"],
    melodyNotes: [
      { note: "F4", duration: 1.0 },
      { note: "A4", duration: 1.0 },
      { note: "C5", duration: 1.5 },
      { note: "D5", duration: 0.5 },
      { note: "C5", duration: 1.0 },
      { note: "A4", duration: 1.0 },
      { note: "F4", duration: 2.0 }
    ]
  },
  {
    id: "hymn-13-what-a-friend-we-have-in-jesus",
    hymnNumber: 13,
    title: "What a Friend We Have in Jesus",
    alternateTitle: "Pray Without Ceasing",
    category: "Prayer & Consecration",
    author: "Joseph M. Scriven",
    composer: "Charles C. Converse",
    tuneName: "CONVERSE",
    year: "1855",
    meter: "8.7.8.7.D",
    keySignature: "F Major",
    scriptureAnchor: {
      reference: "John 15:13-15; Philippians 4:6",
      text: "Be careful for nothing; but in every thing by prayer and supplication with thanksgiving let your requests be made known unto God.",
      book: "Philippians",
      chapter: 4,
      verse: 6
    },
    stanzas: [
      {
        number: 1,
        text: `What a Friend we have in Jesus,\nAll our sins and griefs to bear!\nWhat a privilege to carry\nEverything to God in prayer!\nO what peace we often forfeit,\nO what needless pain we bear,\nAll because we do not carry\nEverything to God in prayer!`
      },
      {
        number: 2,
        text: `Have we trials and temptations?\nIs there trouble anywhere?\nWe should never be discouraged;\nTake it to the Lord in prayer.\nCan we find a friend so faithful,\nWho will all our sorrows share?\nJesus knows our every weakness;\nTake it to the Lord in prayer.`
      },
      {
        number: 3,
        text: `Are we weak and heavy laden,\nCumbered with a load of care?\nPrecious Savior, still our refuge;\nTake it to the Lord in prayer.\nDo thy friends despise, forsake thee?\nTake it to the Lord in prayer;\nIn His arms He'll take and shield thee,\nThou wilt find a solace there.`
      }
    ],
    historicalStory: `Joseph Scriven (1819–1886), born in Ireland, suffered tragedy on the eve of his wedding when his bride accidentally drowned. He migrated to Canada and dedicated his life to serving the poor, sawing wood for widows and sick neighbors for free. When his mother fell gravely ill back in Ireland, he was too poor to visit her, so he wrote this poem to comfort her soul with the promise of prayer.`,
    theologicalInsight: `Christ is the ultimate faithful Friend and High Priest who bears our sins and weaknesses. Prayer is not a burdensome ritual, but the royal privilege of bringing our burdens to the Throne of Grace.`,
    devotionalPrayer: `Precious Lord Jesus, my truest Friend, forgive me for carrying burdens in my own strength and forfeiting peace. Today I bring my anxieties, my family, and my needs before You in prayer, knowing You hear and answer. Amen.`,
    tags: ["Prayer", "Friendship with Jesus", "Comfort", "Peace", "Burden Bearing"],
    melodyNotes: [
      { note: "A4", duration: 1.0 },
      { note: "A4", duration: 0.5 },
      { note: "Bb4", duration: 0.5 },
      { note: "C5", duration: 1.0 },
      { note: "A4", duration: 1.0 },
      { note: "F4", duration: 1.0 },
      { note: "G4", duration: 0.5 },
      { note: "F4", duration: 0.5 },
      { note: "D4", duration: 2.0 }
    ]
  },
  {
    id: "hymn-14-be-thou-my-vision",
    hymnNumber: 14,
    title: "Be Thou My Vision",
    alternateTitle: "Rop tú mo Baile",
    category: "Ancient & Classical",
    author: "Ancient Irish Hymn (Attributed to St. Dallán Forgaill, 8th Century)",
    composer: "Traditional Irish Melody (Arranged by David Evans)",
    tuneName: "SLANE",
    year: "8th Century / 1912",
    meter: "10.10.10.10",
    keySignature: "E-flat Major",
    scriptureAnchor: {
      reference: "Psalm 27:1; Proverbs 3:5-6",
      text: "The Lord is my light and my salvation; whom shall I fear? the Lord is the strength of my life; of whom shall I be afraid?",
      book: "Psalms",
      chapter: 27,
      verse: 1
    },
    stanzas: [
      {
        number: 1,
        text: `Be Thou my Vision, O Lord of my heart;\nNaught be all else to me, save that Thou art.\nThou my best thought, by day or by night,\nWaking or sleeping, Thy presence my light.`
      },
      {
        number: 2,
        text: `Be Thou my Wisdom, and Thou my true Word;\nI ever with Thee and Thou with me, Lord;\nThou my great Father, I Thy true son;\nThou in me dwelling, and I with Thee one.`
      },
      {
        number: 3,
        text: `Riches I heed not, nor man's empty praise,\nThou mine Inheritance, now and always:\nThou and Thou only, first in my heart,\nHigh King of Heaven, my Treasure Thou art.`
      },
      {
        number: 4,
        text: `High King of Heaven, my victory won,\nMay I reach Heaven's joys, O bright Heaven's Sun!\nHeart of my own heart, whatever befall,\nStill be my Vision, O Ruler of all.`
      }
    ],
    historicalStory: `One of the oldest surviving Christian hymns, written in Old Irish by Dallán Forgaill in the 8th century. It was inspired by Saint Patrick, who in AD 433 defied the pagan High King Logaire on Easter Eve by lighting a blazing fire on the Hill of Slane to declare Christ as the eternal Light of Ireland. Translated to English by Mary E. Byrne in 1905 and versified by Eleanor Hull in 1912.`,
    theologicalInsight: `Focuses on single-minded devotion to Christ as our ultimate Vision, Wisdom, Shield, and eternal Inheritance, rejecting worldly riches and empty human praise in favor of the High King of Heaven.`,
    devotionalPrayer: `High King of Heaven, be the supreme Vision of my soul today. Purify my motives, be my wisdom in every decision, and let Your presence be my light by day and by night. In Jesus' Name, Amen.`,
    tags: ["Ancient", "Vision", "Wisdom", "St Patrick", "Kingship", "Devotion"],
    melodyNotes: [
      { note: "Eb4", duration: 1.0 },
      { note: "F4", duration: 0.5 },
      { note: "G4", duration: 1.0 },
      { note: "Bb4", duration: 1.0 },
      { note: "G4", duration: 1.5 },
      { note: "F4", duration: 0.5 },
      { note: "Eb4", duration: 1.5 }
    ]
  },
  {
    id: "hymn-15-pass-me-not-o-gentle-savior",
    hymnNumber: 15,
    title: "Pass Me Not, O Gentle Savior",
    alternateTitle: "Hear My Humble Cry",
    category: "Prayer & Consecration",
    author: "Fanny J. Crosby",
    composer: "William H. Doane",
    tuneName: "PASS ME NOT",
    year: "1868",
    meter: "8.5.8.5 with Refrain",
    keySignature: "G Major",
    scriptureAnchor: {
      reference: "Mark 10:47; Luke 18:38-39",
      text: "And when he heard that it was Jesus of Nazareth, he began to cry out, and say, Jesus, thou son of David, have mercy on me.",
      book: "Mark",
      chapter: 10,
      verse: 47
    },
    stanzas: [
      {
        number: 1,
        text: `Pass me not, O gentle Savior,\nHear my humble cry;\nWhile on others Thou art smiling,\nDo not pass me by.`
      },
      {
        number: 2,
        text: `Let me at a throne of mercy\nFind a sweet relief,\nKneeling there in deep contrition;\nHelp my unbelief.`
      },
      {
        number: 3,
        text: `Trusting only in Thy merit,\nWould I seek Thy face;\nHeal my wounded, broken spirit,\nSave me by Thy grace.`
      },
      {
        number: 4,
        text: `Thou the Spring of all my comfort,\nMore than life to me,\nWhom have I on earth beside Thee?\nWhom in Heav'n but Thee?`
      }
    ],
    chorus: `Savior, Savior, hear my humble cry;\nWhile on others Thou art calling,\nDo not pass me by.`,
    historicalStory: `In the spring of 1868, Fanny Crosby was ministering at a Manhattan prison. During her devotional address, she heard an incarcerated young man earnestly plead: 'O Lord, please do not pass me by!' The desperate cry touched her heart so deeply that when she returned home that evening, she penned this world-renowned petition hymn.`,
    theologicalInsight: `Echoes the desperate faith of blind Bartimaeus on the Jericho road and the Canaanite woman who refused to let Jesus walk away without extending mercy. God delights to stop and answer the humble cry of the broken-hearted.`,
    devotionalPrayer: `Gentle Savior, hear my humble prayer today. While You are moving in revival and blessing others across the nations, stop by my home, heal my wounded spirit, and fill my life with Your saving grace. Amen.`,
    tags: ["Mercy", "Cry of Faith", "Fanny Crosby", "Bartimaeus", "Revival"],
    melodyNotes: [
      { note: "B4", duration: 1.0 },
      { note: "A4", duration: 0.5 },
      { note: "G4", duration: 1.0 },
      { note: "E4", duration: 0.5 },
      { note: "D4", duration: 1.5 },
      { note: "G4", duration: 1.0 },
      { note: "B4", duration: 1.0 },
      { note: "A4", duration: 2.0 }
    ]
  },
  {
    id: "hymn-16-there-is-power-in-the-blood",
    hymnNumber: 16,
    title: "There Is Power in the Blood",
    alternateTitle: "Would You Be Free from the Burden of Sin?",
    category: "Cross & Resurrection",
    author: "Lewis E. Jones",
    composer: "Lewis E. Jones",
    tuneName: "POWER IN THE BLOOD",
    year: "1899",
    meter: "10.8.10.8 with Refrain",
    keySignature: "B-flat Major",
    scriptureAnchor: {
      reference: "Revelation 12:11; 1 John 1:7",
      text: "And they overcame him by the blood of the Lamb, and by the word of their testimony; and they loved not their lives unto the death.",
      book: "Revelation",
      chapter: 12,
      verse: 11
    },
    stanzas: [
      {
        number: 1,
        text: `Would you be free from the burden of sin?\nThere's power in the blood, power in the blood;\nWould you o'er evil a victory win?\nThere's wonderful power in the blood.`
      },
      {
        number: 2,
        text: `Would you be free from your passion and pride?\nThere's power in the blood, power in the blood;\nCome for a cleansing to Calvary's tide;\nThere's wonderful power in the blood.`
      },
      {
        number: 3,
        text: `Would you be whiter, much whiter than snow?\nThere's power in the blood, power in the blood;\nSin-stains are lost in its life-giving flow;\nThere's wonderful power in the blood.`
      },
      {
        number: 4,
        text: `Would you do service for Jesus your King?\nThere's power in the blood, power in the blood;\nWould you live daily His praises to sing?\nThere's wonderful power in the blood.`
      }
    ],
    chorus: `There is power, power, wonder-working power\nIn the blood of the Lamb;\nThere is power, power, wonder-working power\nIn the precious blood of the Lamb.`,
    historicalStory: `Lewis Edgar Jones (1865–1936), a graduate of Moody Bible Institute who served with the YMCA in Texas, wrote this revival anthem while attending a Christian camp meeting in Mountain Lake Park, Maryland, in 1899. It quickly swept the world as one of the most powerful spiritual warfare and salvation hymns.`,
    theologicalInsight: `Proclaims the active, overcoming authority in the Blood of the Lamb to break generational bondages, cleanse guilt, conquer demonic oppression, and empower consecrated kingdom service.`,
    devotionalPrayer: `Lord Jesus, I plead the wonder-working power of Your blood over my mind, my home, my family, and my destiny. Cleanse me from all unrighteousness and break every yoke of darkness in my life. Amen.`,
    tags: ["Blood of Jesus", "Spiritual Warfare", "Victory", "Cleansing", "Overcoming"],
    melodyNotes: [
      { note: "F4", duration: 0.5 },
      { note: "Bb4", duration: 1.0 },
      { note: "Bb4", duration: 0.5 },
      { note: "C5", duration: 0.5 },
      { note: "D5", duration: 1.0 },
      { note: "Bb4", duration: 0.5 },
      { note: "F4", duration: 1.5 }
    ]
  },
  {
    id: "hymn-17-come-thou-fount",
    hymnNumber: 17,
    title: "Come, Thou Fount of Every Blessing",
    alternateTitle: "Here I Raise My Ebenezer",
    category: "Grace & Redemption",
    author: "Robert Robinson",
    composer: "Asahel Nettleton / John Wyeth",
    tuneName: "NETTLETON",
    year: "1758",
    meter: "8.7.8.7.D",
    keySignature: "D Major",
    scriptureAnchor: {
      reference: "1 Samuel 7:12; Psalm 103:1-5",
      text: "Then Samuel took a stone, and set it between Mizpeh and Shen, and called the name of it Ebenezer, saying, Hitherto hath the Lord helped us.",
      book: "1 Samuel",
      chapter: 7,
      verse: 12
    },
    stanzas: [
      {
        number: 1,
        text: `Come, Thou Fount of every blessing,\nTune my heart to sing Thy grace;\nStreams of mercy, never ceasing,\nCall for songs of loudest praise.\nTeach me some melodious sonnet,\nSung by flaming tongues above;\nPraise the mount! I'm fixed upon it,\nMount of Thy redeeming love.`
      },
      {
        number: 2,
        text: `Here I raise my Ebenezer;\nHither by Thy help I'm come;\nAnd I hope, by Thy good pleasure,\nSafely to arrive at home.\nJesus sought me when a stranger,\nWandering from the fold of God;\nHe, to rescue me from danger,\nInterposed His precious blood.`
      },
      {
        number: 3,
        text: `O to grace how great a debtor\nDaily I'm constrained to be!\nLet Thy goodness, like a fetter,\nBind my wandering heart to Thee.\nProne to wander, Lord, I feel it,\nProne to leave the God I love;\nHere's my heart, O take and seal it,\nSeal it for Thy courts above.`
      }
    ],
    historicalStory: `Robert Robinson (1735–1790) was a rebellious youth in London who ran with a notorious gang. At age 17, he attended a sermon by George Whitefield to mock the evangelist, but Whitefield's preaching on Matthew 3:7 pierced his conscience. Robinson surrendered to Christ and became a Baptist pastor, writing this hymn at age 22 for Pentecost Sunday in 1758.`,
    theologicalInsight: `'Ebenezer' is Hebrew for 'Stone of Help' (1 Samuel 7:12), a monument declaring 'Thus far the Lord has helped us.' The final verse acknowledges our human propensity to wander and asks God to seal our hearts with His eternal Spirit.`,
    devotionalPrayer: `Lord God, Fount of every blessing, tune my heart to sing Your praise today. I raise my Ebenezer and testify that by Your help alone I have come this far. Take my heart and seal it forever for Your heavenly courts. Amen.`,
    tags: ["Ebenezer", "Grace", "Praise", "Wandering Heart", "Holy Spirit"],
    melodyNotes: [
      { note: "D4", duration: 1.0 },
      { note: "F#4", duration: 1.0 },
      { note: "A4", duration: 1.0 },
      { note: "F#4", duration: 1.0 },
      { note: "E4", duration: 1.0 },
      { note: "D4", duration: 2.0 }
    ]
  },
  {
    id: "hymn-18-leaning-on-the-everlasting-arms",
    hymnNumber: 18,
    title: "Leaning on the Everlasting Arms",
    alternateTitle: "What a Fellowship, What a Joy Divine",
    category: "Faith & Trust",
    author: "Elisha A. Hoffman & Anthony J. Showalter",
    composer: "Anthony J. Showalter",
    tuneName: "SHOWALTER",
    year: "1887",
    meter: "10.9.10.9 with Refrain",
    keySignature: "A-flat Major",
    scriptureAnchor: {
      reference: "Deuteronomy 33:27; Psalm 91:1-4",
      text: "The eternal God is thy refuge, and underneath are the everlasting arms: and he shall thrust out the enemy from before thee; and shall say, Destroy them.",
      book: "Deuteronomy",
      chapter: 33,
      verse: 27
    },
    stanzas: [
      {
        number: 1,
        text: `What a fellowship, what a joy divine,\nLeaning on the everlasting arms;\nWhat a blessedness, what a peace is mine,\nLeaning on the everlasting arms.`
      },
      {
        number: 2,
        text: `O how sweet to walk in this pilgrim way,\nLeaning on the everlasting arms;\nO how bright the path grows from day to day,\nLeaning on the everlasting arms.`
      },
      {
        number: 3,
        text: `What have I to dread, what have I to fear,\nLeaning on the everlasting arms?\nI have blessed peace with my Lord so near,\nLeaning on the everlasting arms.`
      }
    ],
    chorus: `Leaning, leaning, safe and secure from all alarms;\nLeaning, leaning, leaning on the everlasting arms.`,
    historicalStory: `Anthony Showalter, a music teacher in Alabama, received letters on the same day from two former students who had both suffered the tragic loss of their wives. Grieved in spirit, he wrote letters of comfort to both men, quoting Deuteronomy 33:27: 'Underneath are the everlasting arms.' Inspired by the passage, he wrote the chorus and music, then asked Presbyterian pastor Elisha Hoffman to complete the stanzas.`,
    theologicalInsight: `Provides unshakeable security against fear, anxiety, and dread. When human strength collapses, the omnipotent arms of the Eternal God hold us securely above the abyss.`,
    devotionalPrayer: `Eternal God, my sure refuge, I rest all my anxieties and fears in Your everlasting arms. Thank You that I am safe and secure from all alarms. Guide my steps in peace today. Amen.`,
    tags: ["Everlasting Arms", "Peace", "Comfort", "No Fear", "Security"],
    melodyNotes: [
      { note: "Ab4", duration: 1.0 },
      { note: "C5", duration: 1.0 },
      { note: "Eb5", duration: 1.0 },
      { note: "C5", duration: 0.5 },
      { note: "Ab4", duration: 1.5 }
    ]
  },
  {
    id: "hymn-19-down-by-the-riverside",
    hymnNumber: 19,
    title: "Down by the Riverside",
    alternateTitle: "Ain't Gonna Study War No More",
    category: "Old Spirituals & Revival",
    author: "Traditional African American Spiritual",
    composer: "Traditional Spiritual Melody",
    tuneName: "WAR NO MORE",
    year: "c. 1865",
    meter: "Irregular with Refrain",
    keySignature: "F Major",
    scriptureAnchor: {
      reference: "Isaiah 2:4; Micah 4:3",
      text: "And he shall judge among the nations, and shall rebuke many people: and they shall beat their swords into plowshares, and their spears into pruninghooks: nation shall not lift up sword against nation, neither shall they learn war any more.",
      book: "Isaiah",
      chapter: 2,
      verse: 4
    },
    stanzas: [
      {
        number: 1,
        text: `Gonna lay down my burden,\nDown by the riverside,\nDown by the riverside,\nDown by the riverside.\nGonna lay down my burden,\nDown by the riverside,\nDown by the riverside.`
      },
      {
        number: 2,
        text: `Gonna lay down my sword and shield,\nDown by the riverside,\nDown by the riverside,\nDown by the riverside.\nGonna lay down my sword and shield,\nDown by the riverside,\nDown by the riverside.`
      },
      {
        number: 3,
        text: `Gonna put on my long white robe,\nDown by the riverside,\nDown by the riverside,\nDown by the riverside.\nGonna put on my long white robe,\nDown by the riverside,\nDown by the riverside.`
      },
      {
        number: 4,
        text: `Gonna put on my starry crown,\nDown by the riverside,\nDown by the riverside,\nDown by the riverside.\nGonna put on my starry crown,\nDown by the riverside,\nDown by the riverside.`
      }
    ],
    chorus: `Ain't gonna study war no more,\nAin't gonna study war no more,\nAin't gonna study war no more.\nAin't gonna study war no more,\nAin't gonna study war no more,\nAin't gonna study war no more.`,
    historicalStory: `Originating before the American Civil War and widely sung during emancipation celebrations. It echoes the prophetic vision of Isaiah 2:4 where weapons of war are transformed into tools of harvest. The 'riverside' symbolizes the waters of Christian baptism, spiritual cleansing, and the River of Life in the New Jerusalem.`,
    theologicalInsight: `Spiritual warfare is won not by carnal hostility, but by laying down our weapons of strife at the feet of Jesus, receiving robes of righteousness, and walking in heavenly peace.`,
    devotionalPrayer: `Lord of Peace, I lay down all anger, strife, and anxious burdens at Your river of living water. Clothe me in the righteousness of Christ and grant me Your supernatural peace that surpasses all understanding. Amen.`,
    tags: ["Spiritual", "Peace", "Riverside", "Deliverance", "Isaiah", "Freedom"],
    melodyNotes: [
      { note: "F4", duration: 0.5 },
      { note: "A4", duration: 0.5 },
      { note: "C5", duration: 1.0 },
      { note: "C5", duration: 0.5 },
      { note: "D5", duration: 0.5 },
      { note: "C5", duration: 1.0 }
    ]
  },
  {
    id: "hymn-20-when-i-survey-the-wondrous-cross",
    hymnNumber: 20,
    title: "When I Survey the Wondrous Cross",
    alternateTitle: "Crucifixion to the World",
    category: "Cross & Resurrection",
    author: "Isaac Watts",
    composer: "Lowell Mason (HAMBURG) / Edward Miller (ROCKINGHAM)",
    tuneName: "HAMBURG",
    year: "1707",
    meter: "L.M. (8.8.8.8)",
    keySignature: "F Major",
    scriptureAnchor: {
      reference: "Galatians 6:14; Philippians 3:7-8",
      text: "But what things were gain to me, those I counted loss for Christ. Yea doubtless, and I count all things but loss for the excellency of the knowledge of Christ Jesus my Lord.",
      book: "Philippians",
      chapter: 3,
      verse: 7
    },
    stanzas: [
      {
        number: 1,
        text: `When I survey the wondrous cross\nOn which the Prince of glory died,\nMy richest gain I count but loss,\nAnd pour contempt on all my pride.`
      },
      {
        number: 2,
        text: `Forbid it, Lord, that I should boast,\nSave in the death of Christ my God!\nAll the vain things that charm me most,\nI sacrifice them to His blood.`
      },
      {
        number: 3,
        text: `See from His head, His hands, His feet,\nSorrow and love flow mingled down!\nDid e'er such love and sorrow meet,\nOr thorns compose so rich a crown?`
      },
      {
        number: 4,
        text: `Were the whole realm of nature mine,\nThat were a present far too small;\nLove so amazing, so divine,\nDemands my soul, my life, my all.`
      }
    ],
    historicalStory: `Isaac Watts (1674–1748), known as the 'Father of English Hymnody', wrote this hymn for a Lord's Supper service in 1707. Regarded by Matthew Arnold and Charles Spurgeon as the greatest hymn in the English language, it revolutionized church music by replacing strict Psalm versifications with deeply personal, Christ-centered adoration.`,
    theologicalInsight: `The hymn contemplates the infinite love and sacrifice of Christ on Calvary. In light of the cross, all earthly status and selfish ambition lose their value, demanding total consecration: 'my soul, my life, my all.'`,
    devotionalPrayer: `Prince of Glory, as I contemplate the wondrous cross upon which You gave Your life for me, I pour contempt on all human pride. You gave Your all for my redemption; take my life, my heart, and my hands for Your service today. Amen.`,
    tags: ["Cross", "Isaac Watts", "Consecration", "Calvary", "Sacrifice"],
    melodyNotes: [
      { note: "F4", duration: 1.0 },
      { note: "F4", duration: 1.0 },
      { note: "G4", duration: 1.0 },
      { note: "A4", duration: 1.0 },
      { note: "Bb4", duration: 1.0 },
      { note: "A4", duration: 1.0 },
      { note: "G4", duration: 2.0 }
    ]
  },
  ...ADDITIONAL_50_HYMNALS,
  ...ADDITIONAL_HYMNALS_PART_2,
  ...HYMNAL_500_PART_1,
  ...HYMNAL_500_PART_2,
  ...HYMNAL_500_PART_3,
  ...HYMNAL_500_PART_4,
  ...HYMNAL_1000_PART_1,
  ...HYMNAL_1000_PART_2,
  ...HYMNAL_1000_PART_3,
  ...HYMNAL_1000_PART_4
];

export const HYMNALS_COLLECTION: HymnItem[] = generate500PopularHymns(BASE_HYMNALS_COLLECTION);
