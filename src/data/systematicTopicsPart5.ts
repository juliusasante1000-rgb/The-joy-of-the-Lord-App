import { SystematicTopicItem } from "../types";

/**
 * 100 Systematic Theology Topics (Topics 401 - 500)
 * Deep studies in Eschatology, Dispensations, Biblical Creeds, Spiritual Geography, Heavens, and Consummation.
 */
export const SYSTEMATIC_TOPICS_PART5: SystematicTopicItem[] = [
  ...Array.from({ length: 100 }, (_, i) => {
    const num = 401 + i;
    const titles萃 = [
      // 401-420: Dispensations & Biblical Covenants
      "The Dispensation of Innocence (Eden)", "The Dispensation of Conscience (Fall to Flood)", "The Dispensation of Human Government (Noah)",
      "The Dispensation of Promise (Abraham)", "The Dispensation of the Law (Moses to Christ)", "The Dispensation of Grace (The Church Age)",
      "The Dispensation of the Kingdom (Millennium)", "The Harmony of the Old and New Testaments", "Typology of Joseph: The Suffering and Exalted Savior",
      "Typology of David: The Anointed Warrior-King", "Typology of Solomon: The King of Peace and Wisdom", "Typology of Isaac: The Submissive Son on the Altar",
      "Typology of Moses: The Deliverer and Lawgiver", "Typology of Joshua: The Captain Leading into Inheritance", "Typology of Boaz: The Kinsman-Redeemer",
      "The Mystery of the Scapegoat on Azazel", "The Kinsman-Redeemer (Goel) and Ruth", "The Cities of Refuge & Shelter from Judgment",
      "The Year of Jubilee: Proclaiming Liberty", "The Brazen Altar: The Necessity of Blood Sacrifice",
      
      // 421-440: Historical Creeds & Confessions of the Faith
      "The Apostles' Creed: Core Apostolic Trinitarian Faith", "The Nicene Creed (325 AD): Affirming the Full Deity of Christ", "The Council of Chalcedon (451 AD): Two Natures in One Person",
      "The Athanasian Creed: The Triune Mystery", "The Five Solas of the Protestant Reformation", "Sola Scriptura: Scripture Alone as Final Authority",
      "Sola Fide: Justification by Faith Alone", "Sola Gratia: Salvation by Grace Alone", "Solus Christus: Christ Alone as Sole Mediator",
      "Soli Deo Gloria: To the Glory of God Alone", "The Westminster Confession on Scripture & Providence", "The Heidelberg Catechism: Comfort in Life and Death",
      "The Anabaptist Legacy of Believer's Baptism", "The Great Awakening & Jonathan Edwards", "The Methodist Revival & John Wesley's Holiness",
      "The Welsh Revival of 1904 & Intercession", "The Azusa Street Revival of 1906 & Pentecostal Power", "The Hebrides Revival & The Sovereignty of God",
      "The Charismatic Renewal & Spiritual Gifts", "The Global Missions Movement & William Carey",
      
      // 441-460: Eschatological Timelines & Prophetic Unfoldings
      "The 70 Weeks of Daniel & Prophetic Timeline", "The Abomination of Desolation in Daniel and Matthew", "The Seven Churches of Asia Minor (Rev 2-3)",
      "The Church of Ephesus: Returning to First Love", "The Church of Smyrna: Faithfulness Under Persecution", "The Church of Pergamos: Resisting Balaam & Compromise",
      "The Church of Thyatira: Overcoming Jezebel's Deception", "The Church of Sardis: Awakening from Spiritual Deadness", "The Church of Philadelphia: The Open Door & Divine Favor",
      "The Church of Laodicea: Rejecting Lukewarmness", "The Seals of the Apocalypse: Four Horsemen", "The Sixth Seal: Cosmic Upheaval and Great Day of Wrath",
      "The 144,000 Sealed Servants of God", "The Innumerable Multitude in White Robes", "The Seven Trumpet Judgments & Planetary Plague",
      "The Two Witnesses in Jerusalem: Power and Martyrdom", "The Woman Clothed with the Sun & The Man Child", "The Dragon Cast Down to Earth",
      "The Beast Out of the Sea (The Antichrist)", "The Beast Out of the Earth (The False Prophet)",
      
      // 461-480: Final Consummation, Heaven & The Unseen Realm
      "The Mark of the Beast (666) & Economic Subjugation", "The Three Angelic Messages of Revelation 14", "The Seven Last Plagues & Vials of Wrath",
      "The Fall of Mystery Babylon the Great", "The Alleluia Chorus of Heaven at the Judgment of Babylon", "The Marriage Supper of the Lamb in Glory",
      "The King of Kings on the White Horse", "The Battle of Armageddon & Overthrow of the Beast", "The Binding of Satan for a Thousand Years",
      "The First Resurrection & Reign of the Saints", "The Release of Satan, Final Rebellion & Fire from Heaven", "The Devil Cast into the Lake of Fire Forever",
      "The Great White Throne: Final Judgments of the Wicked", "The Death and Hell Cast into the Lake of Fire", "The Passing Away of the First Heaven and Earth",
      "The New Heaven and New Earth Emerging", "The Holy City, New Jerusalem Descending", "The Architecture and Foundations of the New Jerusalem",
      "The Twelve Gates of Pearl & Names of the Apostles", "The Street of Pure Gold Like Transparent Glass",
      
      // 481-500: The Eternal State, Glory & The Final Amen
      "The River of Water of Life Proceeding from the Throne", "The Tree of Life on Either Side of the River", "The Healing of the Nations in the Eternal State",
      "No More Curse: The Absolute Eradication of Sin", "Seeing the Face of God (The Beatific Vision)", "The Lord God Giving Light to the Eternal City",
      "Reigning with Christ for Ever and Ever", "The Seal of God on the Foreheads of the Saints", "The Incorruptible Crown of the Victor",
      "The Crown of Righteousness Laid Up in Heaven", "The Crown of Life for the Faithful Under Trial", "The Crown of Glory for Faithful Under-Shepherds",
      "The Crown of Rejoicing: The Soul-Winner's Crown", "The Unsearchable Riches of Christ in Eternity", "The Everlasting Kingdom of Our Lord Jesus Christ",
      "The Universal Doxology of Every Creature (Rev 5:13)", "The Holy Spirit and the Bride Saying 'Come!'", "The Warning Against Adding or Taking Away from the Book",
      "The Final Promise: 'Surely I Come Quickly'", "The Final Benediction: 'The Grace of Our Lord Jesus Christ Be With You All. Amen.'"
    ];

    const itemTitle = titles萃[i] || `Systematic Topic ${num}`;
    return {
      id: `sys-${num}-${itemTitle.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
      topicNumber: num,
      title: itemTitle,
      category: num <= 420 ? "Dispensations & Typology" : num <= 440 ? "Historic Creeds & Revivals" : num <= 460 ? "Eschatology & Prophecy" : num <= 480 ? "The Apocalypse & Final Things" : "The Eternal State & Glory",
      division: "Systematic Theology" as const,
      anchorScriptures: [
        { reference: "Revelation 22:13", text: "I am Alpha and Omega, the beginning and the end, the first and the last." },
        { reference: "2 Peter 3:13", text: "Nevertheless we, according to his promise, look for new heavens and a new earth, wherein dwelleth righteousness." }
      ],
      theologicalSummary: `Doctrinal exposition of ${itemTitle}, presenting sound biblical theology, dispensational clarity, historical confessions, and the eternal triumph of Jesus Christ.`,
      keyInsights: [
        `Harmonizes prophetic scriptures across the Old and New Testaments.`,
        `Strengthens the believer's eschatological hope and holy preparation for the Lord's return.`,
        `Affirms the absolute triumph of the Kingdom of God and the Lamb.`
      ],
      practicalApplication: `Live in perpetual readiness and holy anticipation of the coming of the King, anchoring your hope in ${itemTitle}.`
    };
  })
];
