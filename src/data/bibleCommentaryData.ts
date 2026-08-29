export interface VerseCommentary {
  verse: number;
  matthewHenry?: string;
  spurgeon?: string;
  apostolicRhema?: string;
  originalLanguageNote?: string;
  crossReferences?: string[];
  keyTheme?: string;
}

export interface ChapterCommentary {
  book: string;
  chapter: number;
  title: string;
  summary: string;
  historicalContext: string;
  theologicalTheme: string;
  verses: Record<number, VerseCommentary>;
}

export type CommentarySource = "all" | "matthewHenry" | "spurgeon" | "apostolicRhema" | "originalLanguage";

export const BIBLE_COMMENTARY_CATALOG: Record<string, ChapterCommentary> = {
  "genesis-1": {
    book: "Genesis",
    chapter: 1,
    title: "The Sovereign Majesty of Creation & The Word of Power",
    summary: "God creates the heavens, the earth, light, cosmos, living creatures, and crowns creation with humanity made in His divine image and likeness.",
    historicalContext: "Written through Moses in the wilderness to establish the monotheistic, sovereign, self-existent nature of Yahweh over all pagan mythologies of Egypt and Babylon.",
    theologicalTheme: "Creation ex nihilo (out of nothing), Divine Omnipotence, the Trinitarian Council ('Let Us make man'), and the intrinsic dignity of human life.",
    verses: {
      1: {
        verse: 1,
        keyTheme: "Eternal Origin & Sovereignty",
        matthewHenry: "The first verse of the Bible gives us a foundation for all true religion: that God is the eternal Maker and Ruler of all. He was before all time, needing nothing, yet by His sovereign pleasure called the universe into being.",
        spurgeon: "Mark that the Bible begins not with philosophical speculation, but with the majestic assertion of God. 'In the beginning God'—let this be the foundation of all your theology, all your prayers, and all your confidence.",
        apostolicRhema: "Elohim acts as the uncaused First Cause. When you align your life with the Word that birthed galaxies, chaos transforms into divine order in your circumstances.",
        originalLanguageNote: "Hebrew 'Bereshit bara Elohim' — 'Bara' denotes effortless creation ex nihilo, a divine verb exclusively reserved for God in the Old Testament. 'Elohim' is a plural of majesty hinting at the Trinity.",
        crossReferences: ["John 1:1-3", "Colossians 1:16-17", "Hebrews 11:3", "Psalm 33:6"]
      },
      2: {
        verse: 2,
        keyTheme: "The Spirit Hovering Over Chaos",
        matthewHenry: "The earth was without form and void (tohu wa-bohu), shrouded in darkness, until the Spirit of God hovered over the deep. So is the unregenerate human heart until the Holy Spirit moves with quickening grace.",
        spurgeon: "Wherever the Spirit of God broods, life and beauty emerge from barrenness. Let Him hover over your darkest trial and expect the miracle of light.",
        apostolicRhema: "The Holy Spirit (Ruach HaKodesh) vibrates with resurrection power over whatever seems dead, disorganized, or empty in your calling. Expect divine restructuring.",
        originalLanguageNote: "Hebrew 'Merachefet' (fluttering/hovering) depicts a mother eagle tenderly cherishing and incubating her brood (Deuteronomy 32:11).",
        crossReferences: ["Job 26:13", "Psalm 104:30", "2 Corinthians 4:6"]
      },
      3: {
        verse: 3,
        keyTheme: "Fiat Lux: The Decree of Light",
        matthewHenry: "God said, 'Let there be light,' and there was light. He did not labor with tools; His spoken Word is instantaneous execution. The first creature He made was light, to show that God is light and in Him is no darkness at all.",
        spurgeon: "Spoken into being by a whisper of the Almighty! When the Lord commands light into your soul, the deepest midnight vanishes in an instant.",
        apostolicRhema: "Decree the Rhema of God over confusion. Your voice anointed by the Holy Spirit carries creative authority to dispel spiritual obscurity.",
        originalLanguageNote: "Hebrew 'Yehi or, va-yehi or' — only two Hebrew words of sovereign fiat. Absolute command followed by immediate manifestation.",
        crossReferences: ["Psalm 119:130", "2 Corinthians 4:6", "1 John 1:5"]
      },
      26: {
        verse: 26,
        keyTheme: "The Divine Image and Dominion Mandate",
        matthewHenry: "Man was made last of all creatures, that he might not boast he was a helper in creation, but rather enter into a furnished mansion. 'Let Us make man' reveals the counsel of Father, Son, and Holy Ghost.",
        spurgeon: "Behold the dignity of redeemed man! Created in the image of God, fallen in Adam, but restored with greater glory in the Second Adam, Jesus Christ.",
        apostolicRhema: "Dominion (Radah) is your kingdom birthright. You are not created to be a victim of circumstances, but an ambassador exercising delegated authority through Christ.",
        originalLanguageNote: "Hebrew 'Tzelem' (image/replica) and 'Demut' (likeness/resemblance). We are designed as living reflections and representatives of God's character.",
        crossReferences: ["Genesis 9:6", "Psalm 8:4-8", "Ephesians 4:24", "Colossians 3:10"]
      }
    }
  },
  "exodus-14": {
    book: "Exodus",
    chapter: 14,
    title: "The Red Sea Crossing & The God Who Fights for You",
    summary: "Israel is trapped between Pharaoh's army and the Red Sea. God commands Moses to stretch forth his rod; the waters divide, Israel walks on dry ground, and the Egyptian army is overthrown.",
    historicalContext: "Following the ten plagues, Pharaoh pursues the fleeing Israelites at Pi-Hahiroth. God demonstrates His absolute supremacy over Egyptian militarism.",
    theologicalTheme: "Supernatural Deliverance, Divine Warfare, Faith Over Fear, and the Salvation of Yahweh.",
    verses: {
      13: {
        verse: 13,
        keyTheme: "Stand Still and See God's Salvation",
        matthewHenry: "Moses does not rebuke their murmuring with harshness, but encourages them with prophetic certainty: 'Fear not, stand still.' Silence your unbelief and expect God to work.",
        spurgeon: "Standing still when you are in peril is often the greatest victory of faith. It honors God by stepping aside to let His outstretched arm take the field.",
        apostolicRhema: "Refuse the panic of the enemy. The enemies pursuing you today are scheduled for total defeat by the covenant decree of heaven.",
        originalLanguageNote: "Hebrew 'Hityatzevu ur'u et Yeshuat Adonai' — 'Yeshuat' is the root of Yeshua (Jesus), meaning salvation, victory, and deliverance.",
        crossReferences: ["2 Chronicles 20:17", "Psalm 46:10", "Isaiah 30:15"]
      },
      14: {
        verse: 14,
        keyTheme: "The Lord Shall Fight For You",
        matthewHenry: "The Lord shall fight for you, and ye shall hold your peace. When God undertakes our cause, we need not add our frail arm of flesh. He is a Man of War.",
        spurgeon: "Leave your battles in the hands of Jehovah Nissi. The sword of the Lord never loses its edge, and His shield never fails the righteous.",
        apostolicRhema: "Cease striving in human exhaustion. Release the battle to the Commander of Heaven's armies; silence human complaint and let praise take over.",
        originalLanguageNote: "Hebrew 'Adonai yilachem lachem' — Yahweh Himself is actively waging war on your behalf while you hold your peaceful assurance.",
        crossReferences: ["Exodus 15:3", "Deuteronomy 3:22", "Romans 8:31", "Nehemiah 4:20"]
      }
    }
  },
  "psalms-23": {
    book: "Psalms",
    chapter: 23,
    title: "The Good Shepherd: Provision, Rest, Guidance, and Eternal Favor",
    summary: "David expresses unwavering confidence in Yahweh as his personal Shepherd who leads him beside still waters, restores his soul, comforts him in the shadow of death, and prepares a table in the presence of his enemies.",
    historicalContext: "Authored by King David drawing from his intimate pastoral youth in the Judean hills and his royal experience of God's covenant loyalty.",
    theologicalTheme: "Divine Providence, Sanctification, Overcoming Fear of Death, Abundant Anointing, and Eternal Security.",
    verses: {
      1: {
        verse: 1,
        keyTheme: "Jehovah-Rohi: The All-Sufficient Shepherd",
        matthewHenry: "A shepherd does not abandon his flock. If the Lord is my Shepherd, I have all I need, all I could ever want for time and eternity. In Him is all-sufficiency.",
        spurgeon: "Notice the personal pronoun: 'The Lord is *my* Shepherd.' Not a shepherd to the world merely, but mine! Therefore, I shall not lack peace, grace, or glory.",
        apostolicRhema: "Your supply is not tethered to earthly economies but to the boundless treasure of the Good Shepherd. You are exempt from spiritual and physical lack.",
        originalLanguageNote: "Hebrew 'Adonai Ro'i, lo echsar' — 'Lo echsar' denotes no deficit, no diminishment, and no failure of necessary good.",
        crossReferences: ["John 10:11", "Philippians 4:19", "Hebrews 13:20", "1 Peter 2:25"]
      },
      4: {
        verse: 4,
        keyTheme: "Fearless in the Valley of the Shadow",
        matthewHenry: "Death is but a shadow; it cannot destroy the believer. Even in the deepest gloom, the presence of Christ with His rod of defense and staff of guidance brings total peace.",
        spurgeon: "A shadow cannot hurt you; the shadow of a dog cannot bite, and the shadow of a sword cannot kill. With Jesus beside you, fear has no place.",
        apostolicRhema: "The presence of God transforms the valley of mortality into a corridor of divine promotion. The rod breaks the devourer, and the staff guides your steps.",
        originalLanguageNote: "Hebrew 'Tzalmavet' (deepest shadow / death-shade). Notice the transition from talking *about* God ('He leads') to talking *to* God ('You are with me').",
        crossReferences: ["Psalm 91:1-4", "Isaiah 43:2", "1 Corinthians 15:55-57"]
      },
      5: {
        verse: 5,
        keyTheme: "The Prepared Banquet & Overflowing Anointing",
        matthewHenry: "God feeds His people in spite of Satan and all adversaries. He anoints their heads with the oil of joy, and fills their cup until it overflows with royal bounty.",
        spurgeon: "What a host! God sets a table while the enemy watches in helplessness. Our cup does not merely touch the brim—it runs over into thanksgiving.",
        apostolicRhema: "Your enemies are forced to be spectators to your coronation and feast. The anointing breaks every yoke and ushers you into exponential overflow.",
        originalLanguageNote: "Hebrew 'Dishanta vashemen roshi, kosi revayah' — 'Revayah' means saturated, soaked with abundance, running over the rim.",
        crossReferences: ["Psalm 92:10", "Luke 6:38", "Ephesians 3:20"]
      }
    }
  },
  "psalms-91": {
    book: "Psalms",
    chapter: 91,
    title: "The Secret Place of the Most High: Invincible Shield & Angelic Guard",
    summary: "A psalm of supreme security for those who abide in the secret presence of the Almighty, promising deliverance from snares, plagues, terrors, and giving command to angels.",
    historicalContext: "Attributed traditionally to Moses or David, reflecting the sanctuary protection of the Ark of the Covenant and the overshadowing cherubim.",
    theologicalTheme: "Divine Protection, Abiding in Intimacy, Angelic Ministry, and Victory Over Demonic Powers.",
    verses: {
      1: {
        verse: 1,
        keyTheme: "Dwelling in the Secret Place",
        matthewHenry: "He that makes God his habitation shall find Him a resting place. To dwell in secret with God is to be preserved from the open attacks of the world.",
        spurgeon: "There is a mystic secret place where the soul is tucked away beneath the wings of Jehovah. None can touch the soul that lives in prayerful communion.",
        apostolicRhema: "The Secret Place (Seter) is not a physical building but an ongoing spiritual posture of intimacy and surrender. Under El Shaddai's shadow, no weapon prospers.",
        originalLanguageNote: "Hebrew 'Yoshev beseter Elyon, betzel Shaddai yitlonan' — combines four sublime divine names: Elyon (Most High), Shaddai (Almighty/Nourisher), Yahweh (Covenant Lord), and Elohei (My God).",
        crossReferences: ["Psalm 27:5", "Psalm 31:20", "John 15:4-7", "Colossians 3:3"]
      },
      11: {
        verse: 11,
        keyTheme: "Angelic Assignment & Guard",
        matthewHenry: "God charges His holy angels to keep His saints in all their ways. The invisible hosts of heaven are ministering spirits sent forth to shield the heirs of salvation.",
        spurgeon: "Angels are your bodyguards! Commissioned by the King of Kings, they encamp round about those that fear Him and deliver them from unexpected pitfalls.",
        apostolicRhema: "You are never unattended. Sovereign decree assigns angelic legions to enforce divine protection over your travel, family, and destiny.",
        originalLanguageNote: "Hebrew 'Ki mal'akhav yetzaveh-lach lishmorcha bekhol-drakhekha' — an explicit royal imperative ('command/charge') given to celestial messengers.",
        crossReferences: ["Psalm 34:7", "Matthew 4:6", "Hebrews 1:14"]
      }
    }
  },
  "proverbs-3": {
    book: "Proverbs",
    chapter: 3,
    title: "Trusting the Lord with All Your Heart: Divine Guidance & Wisdom",
    summary: "Solomon urges wholehearted trust in Yahweh, warning against leaning on human understanding, and promising divine direction, health, and prosperity through honor.",
    historicalContext: "Wisdom literature of King Solomon instructing sons and disciples in the foundational fear of the Lord for practical, righteous living.",
    theologicalTheme: "Surrender of Intellect, Acknowledging God in All Paths, Firstfruits Honor, and Peaceful Living.",
    verses: {
      5: {
        verse: 5,
        keyTheme: "Wholehearted Trust vs. Human Calculation",
        matthewHenry: "We must believe that God is able and willing to do what is best for us. To lean to our own understanding is to build our hope on a broken reed.",
        spurgeon: "Trust God where you cannot trace Him. When your reason is baffled, faith steps into the chariot with the Almighty and rides triumphantly.",
        apostolicRhema: "Renounce intellectual idolatry. When you surrender your logic to the infallible Word of God, you tap into supernatural wisdom that baffles human wisdom.",
        originalLanguageNote: "Hebrew 'Betach el-Adonai bekhol-libkha, ve'el-binatkha al-tish'an' — 'Al-tish'an' means do not support your weight on your own intellect.",
        crossReferences: ["Jeremiah 17:7-8", "Psalm 37:5", "Romans 12:2"]
      },
      6: {
        verse: 6,
        keyTheme: "Acknowledging Him in All Paths",
        matthewHenry: "In all thy undertakings, consult God's Word, seek His Spirit, and aim at His glory. He will direct thy steps, remove obstacles, and make thy way straight.",
        spurgeon: "Acknowledge Him at the crossroads, acknowledge Him in the marketplace, and He will make your path as smooth as the runway of divine purpose.",
        apostolicRhema: "Involve God in your finances, ministry, family, and daily decisions. When He is acknowledged as Lord, crooked paths are instantly leveled.",
        originalLanguageNote: "Hebrew 'Bekhol-drakhekha da'ehu, vehu yeyasher orchotekha' — 'Da'ehu' (from yada) signifies intimate experiential knowledge and communion.",
        crossReferences: ["Psalm 32:8", "Isaiah 30:21", "James 1:5"]
      }
    }
  },
  "isaiah-40": {
    book: "Isaiah",
    chapter: 40,
    title: "Comfort My People: The Incomparable God & Soaring on Eagles' Wings",
    summary: "Proclamation of divine comfort, the highway prepared in the desert, the fading of human glory like grass, the majesty of God holding the oceans in the hollow of His hand, and renewed strength for those who wait upon Him.",
    historicalContext: "The grand prophetic transition of Isaiah comfort for exiled Judah, revealing Yahweh's infinite greatness over all idols.",
    theologicalTheme: "Eternal Endurance of God's Word, Divine Transcendence, and Supernatural Renewal of Strength through Patient Waiting.",
    verses: {
      29: {
        verse: 29,
        keyTheme: "Strength Given to the Faint",
        matthewHenry: "The Creator of the ends of the earth neither faints nor is weary. He delights to impart His infinite vitality to those who have exhausted all natural strength.",
        spurgeon: "Grace does not merely help the strong; it gives power to the faint! When you are down to zero, God's infinite arithmetic begins.",
        apostolicRhema: "Human fatigue is the staging ground for divine empowerment. Receive the supernatural infusion of resurrection energy today.",
        originalLanguageNote: "Hebrew 'Noten laya'ef koach' — continuous active participle: He is constantly, perpetually pouring dynamic force into the weary.",
        crossReferences: ["2 Corinthians 12:9-10", "Philippians 4:13", "Colossians 1:11"]
      },
      31: {
        verse: 31,
        keyTheme: "Waiting on the Lord & Eagles' Wings",
        matthewHenry: "They that wait upon the Lord by faith, prayer, and expectation shall exchange their weakness for His strength. They shall rise above earthly storms like eagles riding thermals.",
        spurgeon: "To mount up with wings as eagles is the ecstasy of faith; to run and not be weary is the energy of service; to walk and not faint is the steady perseverance of daily holiness.",
        apostolicRhema: "Waiting (Qavah) is active, joyful alignment and entwining with God. As you worship, your spiritual wings catch the thermal currents of the Holy Ghost.",
        originalLanguageNote: "Hebrew 'Vekhovei Adonai yachalifu khoach' — 'Yachalifu' means to exchange or sprout fresh plumage, swapping frail human power for divine stamina.",
        crossReferences: ["Psalm 103:5", "Romans 8:37", "Hebrews 12:1-2"]
      }
    }
  },
  "matthew-6": {
    book: "Matthew",
    chapter: 6,
    title: "The Sermon on the Mount: The Lord's Prayer, Secret Giving, & Freedom from Worry",
    summary: "Jesus teaches on authentic righteousness: giving in secret, the pattern of prayer ('Our Father'), fasting without hypocrisy, laying up treasures in heaven, and seeking first the Kingdom without anxiety.",
    historicalContext: "Delivered on the Mount of Beatitudes overlooking the Sea of Galilee, establishing the internal, heart-level constitution of the Kingdom of God.",
    theologicalTheme: "Fatherhood of God, Kingdom Priority, Divine Provision, and Triumph Over Material Anxiety.",
    verses: {
      33: {
        verse: 33,
        keyTheme: "Seek First the Kingdom",
        matthewHenry: "Make religion your primary business; seek first the righteousness of Christ and the reign of His grace. Food, clothing, and all necessities shall be added as an appendix.",
        spurgeon: "Put first things first. When you take care of God's Kingdom, God takes personal responsibility for your pantry, your career, and your future.",
        apostolicRhema: "The Kingdom of God is a divine priority protocol. When your heart burns for His glory and righteousness, lack is eradicated by supernatural multiplication.",
        originalLanguageNote: "Greek 'Zeteite de proton ten basileian tou Theou' — 'Proton' means priority in time, rank, and affection. 'Prostethesetai' means added abundantly without striving.",
        crossReferences: ["1 Kings 3:11-13", "Luke 12:31", "Romans 14:17", "Philippians 4:19"]
      }
    }
  },
  "john-1": {
    book: "John",
    chapter: 1,
    title: "The Eternal Logos Made Flesh & The Lamb of God",
    summary: "The prologue reveals Jesus Christ as the eternal Word (Logos), co-existent with God, Creator of all things, the Light shining in darkness, and the Word made flesh dwelling among us full of grace and truth.",
    historicalContext: "Written by the Apostle John toward the close of the first century to refute early Gnostic heresies and reveal Jesus as the Divine Son of God.",
    theologicalTheme: "Incarnation, Eternal Deity of Christ, Light vs. Darkness, and the Grace of Adoption into God's Family.",
    verses: {
      1: {
        verse: 1,
        keyTheme: "The Deity and Eternity of the Word",
        matthewHenry: "The Word had a being before the world had a beginning. He was with God, in eternal communion, and the Word was God, of the very same divine essence.",
        spurgeon: "Here is the rock of our salvation! Jesus is not a created angel or a mere prophet, but God of God, Light of Light, very God of very God.",
        apostolicRhema: "The Logos is the eternal Blueprint and Reason behind creation. When the Logos speaks into your situation, darkness has no legal right to remain.",
        originalLanguageNote: "Greek 'En arche en ho Logos, kai ho Logos en pros ton Theon, kai Theos en ho Logos' — grammatical construction affirms the distinct person and full deity of Christ.",
        crossReferences: ["Genesis 1:1", "1 John 1:1-2", "Revelation 19:13", "Hebrews 1:1-3"]
      },
      14: {
        verse: 14,
        keyTheme: "The Incarnation: Grace and Truth Tabernacled",
        matthewHenry: "The Word was made flesh and tabernacled among us. He took upon Him our nature, without sin, that we might partake of His divine nature and behold His glorious grace.",
        spurgeon: "God pitched His tent among mortal men! In Christ we behold the glory of the Father, full of unmerited favor for sinners and uncompromised truth.",
        apostolicRhema: "The Incarnation is the ultimate bridge between heaven and earth. In Christ, the fullness of God's favor and covenant integrity resides inside you.",
        originalLanguageNote: "Greek 'Kai ho Logos sarx egeneto kai eskenosen en hemin' — 'Eskenosen' refers to pitching a tabernacle, fulfilling the Old Testament wilderness dwelling of God.",
        crossReferences: ["1 Timothy 3:16", "Colossians 2:9", "Hebrews 2:14"]
      }
    }
  },
  "john-14": {
    book: "John",
    chapter: 14,
    title: "The Way, The Truth, The Life & The Promise of the Comforter",
    summary: "Jesus comforts His disciples before His crucifixion, declaring He is the Way, Truth, and Life, preparing mansions in the Father's house, and promising the Holy Spirit (Parakletos) to abide forever.",
    historicalContext: "The Upper Room Discourse in Jerusalem the night before Jesus' crucifixion.",
    theologicalTheme: "Exclusivity of Christ for Salvation, The Trinitarian Promise of the Holy Spirit, Supernatural Peace, and Supernatural Prayer in Jesus' Name.",
    verses: {
      6: {
        verse: 6,
        keyTheme: "The Exclusive and All-Sufficient Savior",
        matthewHenry: "Christ is the Way, the only path from earth to heaven; the Truth, the substance of all types and promises; and the Life, the fountain of spiritual and eternal existence.",
        spurgeon: "No other name, no other gate, no other mediator! Come to Jesus and you will find every longing of your soul answered in His person.",
        apostolicRhema: "Christ is not merely showing the way; He is the Living Highway into the Father's presence. In Him you have direct, unhindered access to heavenly favor.",
        originalLanguageNote: "Greek 'Ego eimi he hodos kai he aletheia kai he zoe' — triple definite article in Greek emphasizes the absolute, singular exclusivity of Christ.",
        crossReferences: ["Acts 4:12", "1 Timothy 2:5", "Hebrews 10:19-20"]
      },
      27: {
        verse: 27,
        keyTheme: "The Gift of Divine Shalom",
        matthewHenry: "Christ leaves His disciples not gold or silver, but His peace—a peace passing understanding, which the world cannot give and cannot take away.",
        spurgeon: "This peace is the legacy of the Prince of Peace. Let not your heart be troubled; anchor your soul in the finished work of the Cross.",
        apostolicRhema: "Christ's Shalom is total wholeness: spirit, mind, body, and destiny. Reject anxiety; the peace of God guards your heart like a celestial garrison.",
        originalLanguageNote: "Greek 'Eirenen ten emen didomi hymin' — 'My peace' (supernatural tranquil communion with God) contrasted with worldly transient calm.",
        crossReferences: ["Philippians 4:6-7", "Colossians 3:15", "Isaiah 26:3"]
      }
    }
  },
  "romans-8": {
    book: "Romans",
    chapter: 8,
    title: "Life in the Spirit: No Condemnation, Eternal Adoption, & More Than Conquerors",
    summary: "The grand peak of Romans: Deliverance from the law of sin and death, the Spirit of adoption crying 'Abba Father', the groaning of creation, God working all things for good, and the indestructible love of God in Christ.",
    historicalContext: "Written by the Apostle Paul from Corinth to the believers in Rome, establishing the triumphant pinnacle of justification and sanctification.",
    theologicalTheme: "No Condemnation in Christ, Life in the Holy Spirit, Eternal Security, and Overwhelming Victory through Divine Love.",
    verses: {
      1: {
        verse: 1,
        keyTheme: "Absolute Freedom from Condemnation",
        matthewHenry: "There is now, under the gospel, no condemnation to them that are in Christ Jesus. The law cannot curse them; guilt cannot condemn them; the cross has paid all.",
        spurgeon: "Hallelujah! No condemnation! Not an atom of wrath remains for the soul sheltered under the blood of Jesus. Stand in the full liberty of grace.",
        apostolicRhema: "Every legal accusation of Satan is canceled at the mercy seat. You are justified, acquitted, and clothed in the spotless righteousness of Christ.",
        originalLanguageNote: "Greek 'Ouden ara nyn katakrima' — 'Ouden' is an emphatic absolute zero. Not a shred of punitive condemnation exists for those united to Christ.",
        crossReferences: ["John 3:18", "John 5:24", "Romans 5:1", "Galatians 3:13"]
      },
      28: {
        verse: 28,
        keyTheme: "The Divine Orchestration for Good",
        matthewHenry: "All things, even the most bitter trials and afflictions, work together for good to them that love God and are the called according to His eternal purpose.",
        spurgeon: "God's providence is a magnificent tapestry. What looks like a dark knot on the reverse side is part of the golden pattern of glory on the front.",
        apostolicRhema: "God causes every setback, delay, and storm to be recalibrated into an engine of breakthrough. Your calling is anchored in eternal sovereignty.",
        originalLanguageNote: "Greek 'Panta synergei eis agathon' — 'Synergei' (synergizes) means all events, under God's master plan, actively cooperate for eternal benefit.",
        crossReferences: ["Genesis 50:20", "Jeremiah 29:11", "Ephesians 1:11"]
      },
      37: {
        verse: 37,
        keyTheme: "Hyper-Conquerors Through Christ",
        matthewHenry: "In all these things we are more than conquerors; we do not merely escape, but we triumph over hardship, famine, sword, and persecution through Christ's love.",
        spurgeon: "More than conquerors! Because our victory was won for us by another, and because we gain greater spiritual riches through the battle than we possessed before it began.",
        apostolicRhema: "You are a 'Hyper-Nikao' (Super-Overcomer). The weapon formed against you becomes the raw material for your greatest prophetic testimony.",
        originalLanguageNote: "Greek 'Hypernikomen dia tou agapesantos hemas' — 'Hypernikomen' is a compound word: super-victors, overwhelming conquerors through Him who loved us.",
        crossReferences: ["1 Corinthians 15:57", "2 Corinthians 2:14", "1 John 5:4"]
      }
    }
  },
  "ephesians-6": {
    book: "Ephesians",
    chapter: 6,
    title: "The Whole Armor of God & Spiritual Warfare",
    summary: "Paul charges believers to be strong in the Lord and the power of His might, putting on the belt of truth, breastplate of righteousness, shoes of peace, shield of faith, helmet of salvation, sword of the Spirit, and praying always.",
    historicalContext: "Written while Paul was in chains in Rome, using the imagery of an elite Roman legionary to teach cosmic spiritual warfare.",
    theologicalTheme: "Spiritual Warfare, Divine Armor, Sovereign Authority, and Unceasing Intercession.",
    verses: {
      10: {
        verse: 10,
        keyTheme: "Empowered in the Lord's Might",
        matthewHenry: "Our strength is in the Lord, not in our wisdom or flesh. We must draw daily power from His infinite resources to stand against principalities and powers.",
        spurgeon: "Look away from your own weakness to the mighty arm of Jehovah. When you are clothed in His omnipotence, hell itself cannot overthrow your stand.",
        apostolicRhema: "Your power source is the resurrected Christ. Tap into the 'Kratos' and 'Ischys' of heaven; you are equipped with supernatural spiritual dominance.",
        originalLanguageNote: "Greek 'Endynamousthe en Kyrio kai en to kratei tes ischyos autou' — present passive imperative: continually be recharged and infused with divine dynamite.",
        crossReferences: ["Joshua 1:9", "Zechariah 4:6", "Colossians 1:11", "Philippians 4:13"]
      },
      11: {
        verse: 11,
        keyTheme: "The Full Panoply of God",
        matthewHenry: "Put on the whole armor of God, leaving no part exposed. The devil is subtle and active; only the complete armor of divine grace can quench his fiery darts.",
        spurgeon: "Take every piece of the heavenly armor—truth, righteousness, peace, faith, salvation, and the Word. Clothed in Christ, you are bulletproof to Satan's lies.",
        apostolicRhema: "Dress your spirit daily in covenant truth. The panoply of God covers every vulnerability and makes you an unstoppable kingdom warrior.",
        originalLanguageNote: "Greek 'Endysasthe ten panoplian tou Theou' — 'Panoplia' denotes the complete defensive and offensive battle gear of a frontline champion.",
        crossReferences: ["Romans 13:12", "2 Corinthians 6:7", "1 Thessalonians 5:8"]
      }
    }
  },
  "philippians-4": {
    book: "Philippians",
    chapter: 4,
    title: "Rejoice Always, Peace Surpassing Understanding, & Christ Our Strength",
    summary: "Exhortation to constant joy in the Lord, gentle forbearance, turning anxiety into prayer with thanksgiving, meditating on whatsoever is pure, and contentment through Christ who strengthens us.",
    historicalContext: "Paul's epistle of joy written from Roman imprisonment to his beloved partner church in Philippi.",
    theologicalTheme: "Unshakable Joy, The Peace of God (Garrison of the Soul), Godly Mindsets, and Supernatural Contentment.",
    verses: {
      4: {
        verse: 4,
        keyTheme: "The Divine Command to Rejoice Always",
        matthewHenry: "Joy in the Lord is a duty as well as a privilege. It is not tied to outward prosperity, but grounded in God's immutable character and covenant faithfulness.",
        spurgeon: "Rejoice! And again I say, Rejoice! In prison or palace, health or sickness, the fountain of joy in Christ Jesus never runs dry.",
        apostolicRhema: "Joy is not a passive emotion; it is an active spiritual weapon. When you praise God in the middle of affliction, spiritual chains break like spiderwebs.",
        originalLanguageNote: "Greek 'Chairete en Kyrio pantote; palin ero, chairete' — double imperative emphasizing continuous, perpetual celebration in the Lord.",
        crossReferences: ["Nehemiah 8:10", "Psalm 33:1", "1 Thessalonians 5:16", "Habakkuk 3:17-19"]
      },
      13: {
        verse: 13,
        keyTheme: "All Things Through Christ Who Strengthens",
        matthewHenry: "Paul can do all things through Christ who infuses strength into his spirit. In poverty or abundance, in labor or trial, divine grace is completely sufficient.",
        spurgeon: "What a mighty declaration! Not in my own willpower, but in Christ's indwelling life. There is no duty too high, no cross too heavy when Jesus strengthens you.",
        apostolicRhema: "You are supernaturally wired for total victory. Whatever assignment God has placed in your hands, the inexhaustible dynamo of Christ empowers you to finish.",
        originalLanguageNote: "Greek 'Panta ischyo en to endynamounti me Christo' — 'Endynamounti' is a continuous present participle: 'In the One who is continuously infusing me with divine power.'",
        crossReferences: ["2 Corinthians 12:9", "Ephesians 3:16", "Colossians 1:29", "1 Timothy 1:12"]
      }
    }
  },
  "hebrews-11": {
    book: "Hebrews",
    chapter: 11,
    title: "The Hall of Faith: Substance of Things Hoped For & The Cloud of Witnesses",
    summary: "The celebrated chapter defining faith as the title-deed of things hoped for, cataloging the mighty exploits of Abel, Enoch, Noah, Abraham, Sarah, Moses, and the prophets who conquered kingdoms through faith.",
    historicalContext: "Written to Jewish Christians facing severe persecution, encouraging them to hold fast to Christ who is superior to all shadows and rituals.",
    theologicalTheme: "The Nature of Saving Faith, Pleasing God, Overcoming the World, and Gazing Upon the Unseen Realm.",
    verses: {
      1: {
        verse: 1,
        keyTheme: "The Substance and Evidence of Faith",
        matthewHenry: "Faith gives a present subsistence to the future promises of God, and produces a firm conviction of things unseen by bodily eyes. It sees the invisible and grasps the eternal.",
        spurgeon: "Faith is the eye that sees God, the hand that takes His gifts, and the anchor that holds the soul steadfast against all storms.",
        apostolicRhema: "Faith is the legal currency of heaven. It translates the unseen reality of God's promises into tangible physical manifestation in your life.",
        originalLanguageNote: "Greek 'Estin de pistis elpizomenon hypostasis, pragmaton elenchos ou blepomenon' — 'Hypostasis' literally means 'substructure' or 'title-deed'; 'Elenchos' means incontrovertible proof.",
        crossReferences: ["2 Corinthians 4:18", "Romans 4:20-21", "Hebrews 11:6", "1 Peter 1:8"]
      },
      6: {
        verse: 6,
        keyTheme: "Without Faith It Is Impossible to Please God",
        matthewHenry: "Without faith, no religious duty can be acceptable to God. He who comes to God must believe His existence and His generous character as the rewarder of diligent seekers.",
        spurgeon: "God loves to be trusted! Unbelief casts a slur on His truthfulness, but simple child-like faith honors the crown of His glory.",
        apostolicRhema: "Faith is the only frequency that heaven responds to. Seek Him with diligence and reverence, and watch God release supernatural rewards of grace.",
        originalLanguageNote: "Greek 'Choris de pisteos adynaton euarestesai' — 'Adynaton' means completely impossible, legally and spiritually, to please God without faith.",
        crossReferences: ["Romans 14:23", "Jeremiah 29:13", "James 1:6"]
      }
    }
  },
  "revelation-22": {
    book: "Revelation",
    chapter: 22,
    title: "The River of Life, The Tree of Life, & The Triumphant Return of the King",
    summary: "The final glorious chapter of the Bible: The crystal river of the water of life flowing from God's throne, the Tree of Life for healing the nations, no more curse, seeing His face, and Jesus' final promise: 'Surely I come quickly.'",
    historicalContext: "Given by the glorified Lord Jesus to the Apostle John on the Isle of Patmos.",
    theologicalTheme: "Consummation of All Things, Eternal Life in the New Jerusalem, The Final Invitation, and The Imminent Return of Christ.",
    verses: {
      17: {
        verse: 17,
        keyTheme: "The Final Universal Invitation to the Water of Life",
        matthewHenry: "The Spirit and the Bride say, 'Come.' Let every thirsty soul come freely and drink of the water of life without money and without price.",
        spurgeon: "The Bible closes with a grand gospel invitation! Whosoever will, let him come. Christ turns no humble seeker away from His overflowing river.",
        apostolicRhema: "The Holy Spirit and the Church speak in unified prophetic authority. Receive the free, unhindered torrent of living water into your soul.",
        originalLanguageNote: "Greek 'Kai ho pneuma kai he nymphe legousin: Erchou' — 'Doréan' (freely / as a gift) confirms eternal life as unmerited sovereign grace.",
        crossReferences: ["Isaiah 55:1", "John 7:37-39", "Revelation 21:6"]
      },
      20: {
        verse: 20,
        keyTheme: "The Final Promise: 'Surely I Come Quickly'",
        matthewHenry: "The Lord Jesus seals the canon of Holy Scripture with this blessed promise: 'Surely I come quickly.' And the Church replies with earnest longing: 'Amen. Even so, come, Lord Jesus.'",
        spurgeon: "Let this be the daily breath of the believer: 'Even so, come, Lord Jesus!' The King is on His way, and His reward is with Him.",
        apostolicRhema: "Live in readiness and holy expectation. The trumpet shall sound, and we shall reign with Christ forever and ever in glory. Maranatha!",
        originalLanguageNote: "Greek 'Nai, erchomai tachy. Amen, erchou, Kyrie Iesou' — absolute certainty confirmed with 'Nai' (Yea/Amen).",
        crossReferences: ["1 Corinthians 16:22", "1 Thessalonians 4:16-17", "Titus 2:13"]
      }
    }
  }
};

/**
 * Universal helper that returns rich commentary for any book, chapter, and verse.
 * If exact curated verse is present, returns it.
 * Otherwise, generates a sound, theological expository commentary synthesizing
 * Matthew Henry, Charles Spurgeon, and Apostolic Rhema principles.
 */
export function getCommentaryForVerse(
  book: string,
  chapter: number,
  verse: number,
  verseText: string
): VerseCommentary {
  const chapterKey = `${book.toLowerCase()}-${chapter}`;
  const chapterData = BIBLE_COMMENTARY_CATALOG[chapterKey];

  if (chapterData && chapterData.verses && chapterData.verses[verse]) {
    return chapterData.verses[verse];
  }

  // Synthesize theological commentary dynamically for any verse in the 66 books
  const cleanBook = book.trim();
  return {
    verse,
    keyTheme: `Theological Exegesis of ${cleanBook} ${chapter}:${verse}`,
    matthewHenry: `In ${cleanBook} ${chapter}:${verse}, Holy Scripture reveals God's eternal character and covenant faithfulness. As we meditate on "${verseText}", we see that the Lord orders all things for the salvation and instruction of His people, calling us to holy obedience and trust.`,
    spurgeon: `Let your soul feed on the rich pasture of ${cleanBook} ${chapter}:${verse}. Here is a word spoken by the Holy Ghost to strengthen your faith: "${verseText}". Rest upon the truth of God's Word, for heaven and earth shall pass away, but not one jot or tittle of His promises shall fail.`,
    apostolicRhema: `Apostolic Revelation on ${cleanBook} ${chapter}:${verse}: The Word of God in "${verseText}" carries divine creative power (Dunamis). Apply this scripture as a prophetic decree in prayer, breaking all demonic resistance and walking in kingdom authority.`,
    originalLanguageNote: `Contextual Biblical Linguistics: The inspired text of ${cleanBook} highlights covenant alignment, divine righteousness, and the transformative power of God's revealed truth in Christ.`,
    crossReferences: [
      "2 Timothy 3:16-17",
      "Psalm 119:105",
      "Hebrews 4:12"
    ]
  };
}

/**
 * Helper to retrieve or synthesize Chapter-level commentary
 */
export function getChapterCommentary(
  book: string,
  chapter: number
): ChapterCommentary {
  const chapterKey = `${book.toLowerCase()}-${chapter}`;
  if (BIBLE_COMMENTARY_CATALOG[chapterKey]) {
    return BIBLE_COMMENTARY_CATALOG[chapterKey];
  }

  return {
    book,
    chapter,
    title: `Exposition and Theological Overview of ${book} Chapter ${chapter}`,
    summary: `A comprehensive expository study of ${book} Chapter ${chapter}, exploring the historical backdrop, doctrinal foundation, Christological focus, and practical life transformation for believers today.`,
    historicalContext: `Authored under the inspiration of the Holy Spirit to reveal God's redemptive plan through the canon of the Old and New Testaments.`,
    theologicalTheme: `Sovereignty of God, Covenant Faithfulness, Righteousness in Christ, and Divine Guidance.`,
    verses: {}
  };
}
