import { ChurchTenet, DoctrineCategory, DoctrineArticle } from "../types";

/**
 * The Official Core Tenets of Faith of the Church (Articles of Faith)
 * Formulated with sound biblical theology, exact scriptural proofs, and zero duplication.
 */
export const CHURCH_TENETS: ChurchTenet[] = [
  {
    id: "tenet-1-scripture",
    number: 1,
    title: "The Divine Inspiration & Supreme Authority of the Holy Scriptures",
    category: "The Word of God and God",
    statement: "The Holy Scriptures of the Old and New Testaments are the inspired, infallible, and supreme written authority for faith and life. Given by verbal plenary inspiration of the Holy Ghost, the Bible is inerrant in its original revelation, completely sufficient for salvation, and the ultimate rule for all Christian doctrine and conduct.",
    scripturalReferences: [
      { reference: "2 Timothy 3:16-17", text: "All scripture is given by inspiration of God, and is profitable for doctrine, for reproof, for correction, for instruction in righteousness: That the man of God may be perfect, throughly furnished unto all good works." },
      { reference: "2 Peter 1:20-21", text: "Knowing this first, that no prophecy of the scripture is of any private interpretation. For the prophecy came not in old time by the will of man: but holy men of God spake as they were moved by the Holy Ghost." },
      { reference: "Psalm 119:105", text: "Thy word is a lamp unto my feet, and a light unto my path." },
      { reference: "Hebrews 4:12", text: "For the word of God is quick, and powerful, and sharper than any twoedged sword, piercing even to the dividing asunder of soul and spirit." }
    ],
    theologicalBreakdown: [
      "Verbal Plenary Inspiration: Every word of Scripture is breathed out by God (theopneustos) through holy human instruments.",
      "Infallibility & Inerrancy: The Bible is entirely true and trustworthy in all matters of history, doctrine, and salvation.",
      "Supreme Written Authority: Sola Scriptura—God's written Word judges every human tradition, philosophy, and personal experience."
    ],
    practicalApplication: "Submit daily to the instruction, reproof, and comfort of the Holy Bible through regular study, meditation, and unwavering obedience."
  },
  {
    id: "tenet-2-trinity",
    number: 2,
    title: "The Unity of the Godhead & The Holy Trinity",
    category: "The Word of God and God",
    statement: "The Unity of the Godhead and the Trinity of the Persons therein: God is one eternal, self-existent Being existing in three distinct, co-equal, and co-eternal Persons: Father, Son, and Holy Spirit. They share one divine essence, equal in power, majesty, and glory, harmoniously united in the work of creation, providence, and redemption.",
    scripturalReferences: [
      { reference: "Matthew 28:19", text: "Go ye therefore, and teach all nations, baptizing them in the name of the Father, and of the Son, and of the Holy Ghost." },
      { reference: "2 Corinthians 13:14", text: "The grace of the Lord Jesus Christ, and the love of God, and the communion of the Holy Ghost, be with you all. Amen." },
      { reference: "Deuteronomy 6:4", text: "Hear, O Israel: The Lord our God is one Lord." },
      { reference: "1 John 5:7", text: "For there are three that bear record in heaven, the Father, the Word, and the Holy Ghost: and these three are one." },
      { reference: "John 10:30", text: "I and my Father are one." }
    ],
    theologicalBreakdown: [
      "Monotheism & Tri-Unity: One God in essence, three distinct Persons (Hypostases) without confusion or division.",
      "Co-Equality & Co-Eternity: Neither Person was created; all three are equally divine and deserve equal adoration and worship.",
      "Relational Harmony: The Father initiates, the Son redeems through His blood, and the Holy Spirit regenerates and sanctifies."
    ],
    practicalApplication: "Worship the Triune God in spirit and in truth, approaching the Father through the mediation of the Son by the empowering presence of the Holy Spirit."
  },
  {
    id: "tenet-3-creation-sovereignty",
    number: 3,
    title: "The Sovereignty, Creation & Eternal Attributes of God",
    category: "The Word of God and God",
    statement: "God is the absolute Sovereign Ruler of the universe who executes His divine will and providential care over all creation. God created the entire universe out of nothing (creatio ex nihilo) by His spoken Word and declared it good. He possesses eternal divine attributes: He is omnipotent (all-powerful), omnipresent (everywhere present), omniscient (all-knowing), holy, immutable, just, and merciful.",
    scripturalReferences: [
      { reference: "Genesis 1:1,31", text: "In the beginning God created the heaven and the earth... And God saw every thing that he had made, and, behold, it was very good." },
      { reference: "Psalm 139:7-10", text: "Whither shall I go from thy spirit? or whither shall I flee from thy presence? If I ascend up into heaven, thou art there..." },
      { reference: "Isaiah 40:28", text: "Hast thou not known? hast thou not heard, that the everlasting God, the Lord, the Creator of the ends of the earth, fainteth not, neither is weary? there is no searching of his understanding." },
      { reference: "1 Timothy 6:15-16", text: "Who is the blessed and only Potentate, the King of kings, and Lord of lords; Who only hath immortality, dwelling in the light which no man can approach unto." },
      { reference: "Revelation 4:11", text: "Thou art worthy, O Lord, to receive glory and honour and power: for thou hast created all things, and for thy pleasure they are and were created." }
    ],
    theologicalBreakdown: [
      "Absolute Sovereignty: God governs history, nature, and kingdoms according to His sovereign purpose and righteous counsel.",
      "Creation Ex Nihilo: The universe is neither eternal nor accidental; it is the purposeful artistic masterpiece of the Almighty.",
      "Divine Perfections: God's power is limitless, His knowledge is all-comprehensive, His presence fills all things, and His holiness is absolute."
    ],
    practicalApplication: "Rest in the unshakeable peace that God is in complete control of your life and circumstances, trusting His wisdom in all seasons."
  },
  {
    id: "tenet-4-humanity-depravity-perseverance",
    number: 4,
    title: "The Image of God, Utter Depravity of Human Nature, The Possibility of Falling from Grace & The Call to Persevere",
    category: "Humanity and Sin",
    statement: "Humans were created in the image and likeness of God (Imago Dei) with inherent dignity, moral agency, and purpose to glorify their Creator. Through the disobedience and Fall of Adam, all humanity inherited a corrupted, sinful nature, becoming spiritually dead, utterly depraved, and alienated from God. Actual sin is the transgression of God's moral law, demanding repentance and regeneration through divine grace alone; the finally impenitent face eternal condemnation. While believers are kept and preserved by the power of God through faith, Scripture gives solemn warnings against willful apostasy and backsliding: a believer can depart from the living God through persistent unfaithfulness and hardening of heart unless they heed the call to persevere and abide steadfastly in Christ to the end.",
    scripturalReferences: [
      { reference: "Genesis 1:26-27", text: "And God said, Let us make man in our image, after our likeness... So God created man in his own image." },
      { reference: "Romans 3:10,23", text: "As it is written, There is none righteous, no, not one... For all have sinned, and come short of the glory of God." },
      { reference: "Romans 5:12", text: "Wherefore, as by one man sin entered into the world, and death by sin; and so death passed upon all men, for that all have sinned." },
      { reference: "Ephesians 2:1-3", text: "And you hath he quickened, who were dead in trespasses and sins... and were by nature the children of wrath, even as others." },
      { reference: "Galatians 5:4", text: "Christ is become of no effect unto you, whosoever of you are justified by the law; ye are fallen from grace." },
      { reference: "Hebrews 3:12-14", text: "Take heed, brethren, lest there be in any of you an evil heart of unbelief, in departing from the living God. But exhort one another daily... For we are made partakers of Christ, if we hold the beginning of our confidence stedfast unto the end." },
      { reference: "Hebrews 6:4-6", text: "For it is impossible for those who were once enlightened, and have tasted of the heavenly gift... If they shall fall away, to renew them again unto repentance." },
      { reference: "Hebrews 10:26,29", text: "For if we sin wilfully after that we have received the knowledge of the truth, there remaineth no more sacrifice for sins... who hath trodden under foot the Son of God." },
      { reference: "1 Corinthians 10:12", text: "Wherefore let him that thinketh he standeth take heed lest he fall." },
      { reference: "2 Peter 2:20-21", text: "For if after they have escaped the pollutions of the world through the knowledge of the Lord and Saviour Jesus Christ, they are again entangled therein, and overcome, the latter end is worse with them than the beginning." }
    ],
    theologicalBreakdown: [
      "Inherent Dignity & The Fall: Humanity was created in God's sacred image (Imago Dei) but plunged into spiritual death and total depravity through Adam's rebellion.",
      "Urgent Necessity of Sovereign Grace: Sin renders humanity morally bankrupt and utterly unable to save itself apart from the regenerating grace of God.",
      "Covenant Responsibility & Holy Perseverance: Believers are preserved by the power of God through enduring faith, called to watchfulness and perseverance against the deceitfulness of sin."
    ],
    practicalApplication: "Acknowledge personal moral bankruptcy apart from Christ, examine yourself daily to remain steadfast in the faith, and encourage the brethren to finish the race with holy diligence."
  },
  {
    id: "tenet-5-christ-finished-work-salvation",
    number: 5,
    title: "The Person and Finished Work of Christ, Justification & Sanctification by Grace Through Faith",
    category: "Jesus Christ & Salvation",
    statement: "The Virgin Birth, Sinless Life, Substitutionary Atoning Death, Triumphant Bodily Resurrection, Ascension, and Abiding Intercession of our Lord Jesus Christ, and His finished work on Calvary. Salvation is initiated purely by God's sovereign grace (Sola Gratia). Believers are justified—declared legally righteous before God—solely through faith in Jesus Christ (Sola Fide) and not by human merit or works. In regeneration (the New Birth), the Holy Spirit imparts spiritual life, making the believer a new creation. Sanctification is the continuous work of God's grace wherein believers grow in personal holiness, moral purity, and Christlikeness through the indwelling Holy Spirit.",
    scripturalReferences: [
      { reference: "John 1:1,14", text: "In the beginning was the Word, and the Word was with God, and the Word was God... And the Word was made flesh, and dwelt among us." },
      { reference: "Luke 1:34-35", text: "The Holy Ghost shall come upon thee, and the power of the Highest shall overshadow thee: therefore also that holy thing which shall be born of thee shall be called the Son of God." },
      { reference: "1 Peter 2:24", text: "Who his own self bare our sins in his own body on the tree, that we, being dead to sins, should live unto righteousness: by whose stripes ye were healed." },
      { reference: "1 Corinthians 15:3-4", text: "For I delivered unto you first of all that which I also received, how that Christ died for our sins according to the scriptures; And that he was buried, and that he rose again the third day." },
      { reference: "Hebrews 7:25", text: "Wherefore he is able also to save them to the uttermost that come unto God by him, seeing he ever liveth to make intercession for them." },
      { reference: "Ephesians 2:8-9", text: "For by grace are ye saved through faith; and that not of yourselves: it is the gift of God: Not of works, lest any man should boast." },
      { reference: "Romans 5:1", text: "Therefore being justified by faith, we have peace with God through our Lord Jesus Christ." },
      { reference: "Titus 3:5", text: "Not by works of righteousness which we have done, but according to his mercy he saved us, by the washing of regeneration, and renewing of the Holy Ghost." },
      { reference: "2 Corinthians 5:17", text: "Therefore if any man be in Christ, he is a new creature: old things are passed away; behold, all things are become new." },
      { reference: "Hebrews 12:14", text: "Follow peace with all men, and holiness, without which no man shall see the Lord." }
    ],
    theologicalBreakdown: [
      "Incarnation & Hypostatic Union: Truly God and truly man, Christ lived a sinless life and died as our substitutionary atonement on the Cross.",
      "Triumphant Resurrection & Session: Christ bodily conquered death, ascended into heaven, and perpetually intercedes as our eternal High Priest.",
      "Justification by Faith Alone (Sola Fide): Imputation of Christ's perfect righteousness to all who believe, without human boast.",
      "Regeneration & Progressive Sanctification: Impartation of a new nature by the Holy Spirit and continuous daily growth in holiness and love."
    ],
    practicalApplication: "Rest securely in the finished work of Jesus Christ, and passionately pursue personal holiness and joyful obedience in the power of the Holy Spirit."
  },
  {
    id: "tenet-6-holy-ghost-baptism-gifts",
    number: 6,
    title: "The Baptism of the Holy Ghost with Signs Following & The Operation of Spiritual Gifts",
    category: "The Holy Spirit and Spiritual Gifts",
    statement: "The Baptism of the Holy Ghost for believers with signs following. This is a distinct spiritual experience subsequent to the New Birth, wherein the resurrected Lord Jesus immerses the believer in the Holy Spirit, endowing them with supernatural power for holy living, bold Christian witness, and ministry, with initial physical evidence and signs following (including speaking with other tongues as the Spirit gives utterance). Furthermore, the Holy Spirit distributes the Nine Supernatural Gifts (Revelation Gifts: Word of Wisdom, Word of Knowledge, Discerning of Spirits; Power Gifts: Faith, Gifts of Healing, Working of Miracles; and Utterance Gifts: Prophecy, Divers Kinds of Tongues, Interpretation of Tongues) for the edification, exhortation, and comfort of the Body of Christ, operating in divine love, decency, and biblical order.",
    scripturalReferences: [
      { reference: "Acts 1:8", text: "But ye shall receive power, after that the Holy Ghost is come upon you: and ye shall be witnesses unto me both in Jerusalem, and in all Judaea, and in Samaria, and unto the uttermost part of the earth." },
      { reference: "Acts 2:1-4", text: "And they were all filled with the Holy Ghost, and began to speak with other tongues, as the Spirit gave them utterance." },
      { reference: "Acts 10:44-46", text: "While Peter yet spake these words, the Holy Ghost fell on all them which heard the word... For they heard them speak with tongues, and magnify God." },
      { reference: "Acts 19:6", text: "And when Paul had laid his hands upon them, the Holy Ghost came on them; and they spake with tongues, and prophesied." },
      { reference: "Mark 16:17", text: "And these signs shall follow them that believe; In my name shall they cast out devils; they shall speak with new tongues." },
      { reference: "1 Corinthians 12:4,7-11", text: "Now there are diversities of gifts, but the same Spirit... For to one is given by the Spirit the word of wisdom; to another the word of knowledge... To another faith... to another the gifts of healing... To another the working of miracles; to another prophecy; to another discerning of spirits; to another divers kinds of tongues; to another the interpretation of tongues." },
      { reference: "1 Corinthians 14:3,12", text: "But he that prophesieth speaketh unto men to edification, and exhortation, and comfort... seek that ye may excel to the edifying of the church." }
    ],
    theologicalBreakdown: [
      "Subsequent Immersion in Power: A distinctive endowment of divine authority and power for global evangelism and holy witness.",
      "Signs Following: Supernatural manifestations, including speaking in tongues, that confirm the Gospel and authenticate the Spirit's presence.",
      "Ninefold Spiritual Gifts: Divine abilities distributed sovereignly by the Spirit to build up, comfort, and strengthen the Church in agape love."
    ],
    practicalApplication: "Seek with a clean and expectant heart the full baptism of the Holy Ghost, welcome His spiritual gifts with humility, and minister with supernatural boldness to edify the brethren."
  },
  {
    id: "tenet-7-church-sacraments-tithes-offerings",
    number: 7,
    title: "The Church, The Sacraments of Baptism & The Lord's Supper, and The Obligatory Nature of Tithes & Offerings",
    category: "The Church and Covenant Worship",
    statement: "The Church is the universal Body and Bride of Christ composed of all true believers, unified in worship, fellowship, and the sacraments. The Church observes two sacred Sacraments/Ordinances instituted by Christ: Water Baptism by Immersion (in the name of the Father, Son, and Holy Ghost as an outward declaration of dying and rising with Christ) and the Lord’s Supper (Holy Communion as a holy remembrance and proclamation of Christ's broken body and shed blood until He returns). Furthermore, tithing (returning the first tenth of all increase to God's storehouse) and giving freewill offerings are continuous biblical obligations and covenant acts of worship, instituted before the Law of Moses, affirmed by Jesus in the Gospels, acknowledging God's absolute ownership, supporting the ministry of the Church, funding Gospel missions, and unlocking God's providential blessing upon His people.",
    scripturalReferences: [
      { reference: "Matthew 28:19", text: "Go ye therefore, and teach all nations, baptizing them in the name of the Father, and of the Son, and of the Holy Ghost." },
      { reference: "Romans 6:3-4", text: "Know ye not, that so many of us as were baptized into Jesus Christ were baptized into his death? Therefore we are buried with him by baptism into death: that like as Christ was raised up from the dead by the glory of the Father, even so we also should walk in newness of life." },
      { reference: "1 Corinthians 11:23-26", text: "For I have received of the Lord that which also I delivered unto you, That the Lord Jesus the same night in which he was betrayed took bread... For as often as ye eat this bread, and drink this cup, ye do shew the Lord's death till he come." },
      { reference: "Malachi 3:10", text: "Bring ye all the tithes into the storehouse, that there may be meat in mine house, and prove me now herewith, saith the Lord of hosts, if I will not open you the windows of heaven, and pour you out a blessing, that there shall not be room enough to receive it." },
      { reference: "Matthew 23:23", text: "Woe unto you, scribes and Pharisees, hypocrites! for ye pay tithe of mint and anise and cummin, and have omitted the weightier matters of the law, judgment, mercy, and faith: these ought ye to have done, and not to leave the other undone." },
      { reference: "Genesis 14:20", text: "And blessed be the most high God, which hath delivered thine enemies into thy hand. And he gave him tithes of all." },
      { reference: "Genesis 28:22", text: "And of all that thou shalt give me I will surely give the tenth unto thee." },
      { reference: "Hebrews 7:8", text: "And here men that die receive tithes; but there he receiveth them, of whom it is witnessed that he liveth." },
      { reference: "2 Corinthians 9:6-7", text: "He which soweth sparingly shall reap also sparingly; and he which soweth bountifully shall reap also bountifully. Every man according as he purposeth in his heart, so let him give; not grudgingly, or of necessity: for God loveth a cheerful giver." }
    ],
    theologicalBreakdown: [
      "The Body & Bride of Christ: The company of all regenerated believers unified in holy fellowship, mission, and worship.",
      "Sacrament of Baptism by Immersion: Outward symbolic burial of the old nature and joyous resurrection to walk in newness of life in Christ.",
      "Sacrament of the Lord's Supper: Sacred spiritual communion with Christ, reverently remembering His atoning sacrifice until His glorious return.",
      "Eternal Covenant Stewardship: Returning tithes and giving generous offerings acknowledges God as owner of all and faithfully resources His Kingdom."
    ],
    practicalApplication: "Be baptized in water by immersion, partake reverently of the Lord's Table with self-examination, and faithfully return the first tenth of your income to the house of God with cheerful, generous offerings."
  },
  {
    id: "tenet-8-second-coming-eschatology",
    number: 8,
    title: "The Second Coming of Christ, Millennial Reign & Final Judgment",
    category: "The Church and Future Things",
    statement: "The Second Coming of Jesus Christ is the blessed hope of the Church. Jesus Christ will return physically, visibly, and triumphantly in glory to gather His elect, judge the living and the dead, execute His Millennial Reign of peace upon the earth, and consummate His eternal Kingdom. The dead shall be raised—the righteous to the resurrection of eternal life in the New Heavens and New Earth, and the unrepentant wicked to the resurrection of damnation and eternal punishment.",
    scripturalReferences: [
      { reference: "Acts 1:11", text: "This same Jesus, which is taken up from you into heaven, shall so come in like manner as ye have seen him go into heaven." },
      { reference: "Titus 2:13", text: "Looking for that blessed hope, and the glorious appearing of the great God and our Saviour Jesus Christ." },
      { reference: "1 Thessalonians 4:16-17", text: "For the Lord himself shall descend from heaven with a shout, with the voice of the archangel, and with the trump of God: and the dead in Christ shall rise first: Then we which are alive and remain shall be caught up together with them in the clouds, to meet the Lord in the air." },
      { reference: "Revelation 19:11,16", text: "And I saw heaven opened, and behold a white horse; and he that sat upon him was called Faithful and True... And he hath on his vesture and on his thigh a name written, KING OF KINGS, AND LORD OF LORDS." },
      { reference: "Revelation 21:1-4", text: "And I saw a new heaven and a new earth: for the first heaven and the first earth were passed away... And God shall wipe away all tears from their eyes; and there shall be no more death, neither sorrow, nor crying." }
    ],
    theologicalBreakdown: [
      "Physical, Visible & Triumphant Return: Christ will return personally in majesty and unclouded glory.",
      "Resurrection of All Humanity: Glorified incorruptible bodies for believers; final reckoning for the wicked.",
      "The Consummation of All Things: Eradication of sin, disease, and death, establishing the eternal New Jerusalem."
    ],
    practicalApplication: "Live in holy anticipation, purify your heart, and tirelessly win souls while it is day, for the King is coming soon."
  },
  {
    id: "tenet-9-spiritual-warfare-healing",
    number: 9,
    title: "Spiritual Warfare, Divine Authority & Divine Healing",
    category: "Spiritual Warfare & Divine Healing",
    statement: "Angels, Satan, Demons, Spiritual Warfare, Armor of God, Divine Healing & Miraculous Provision: Holy angels are ministering spirits sent to serve the heirs of salvation and execute God's purposes. Satan fell through pride and now operates with his demons to deceive, oppress, and afflict humanity. Divine healing and health were secured in the Atonement and are received through believing prayer and faith in Jesus' name.",
    scripturalReferences: [
      { reference: "Hebrews 1:14", text: "Are they not all ministering spirits, sent forth to minister for them who shall be heirs of salvation?" },
      { reference: "Ephesians 6:10-12", text: "Finally, my brethren, be strong in the Lord, and in the power of his might. Put on the whole armour of God, that ye may be able to stand against the wiles of the devil. For we wrestle not against flesh and blood, but against principalities, against powers, against the rulers of the darkness of this world, against spiritual wickedness in high places." },
      { reference: "Isaiah 53:4-5", text: "Surely he hath borne our griefs, and carried our sorrows: yet we did esteem him stricken, smitten of God, and afflicted. But he was wounded for our transgressions, he was bruised for our iniquities: the chastisement of our peace was upon him; and with his stripes we are healed." },
      { reference: "James 5:14-15", text: "Is any sick among you? let him call for the elders of the church; and let them pray over him, anointing him with oil in the name of the Lord: And the prayer of faith shall save the sick, and the Lord shall raise him up; and if he have committed sins, they shall be forgiven him." }
    ],
    theologicalBreakdown: [
      "Holy angels are ministering spirits sent to serve the heirs of salvation and execute God's purposes.",
      "Satan fell through pride and now operates with his demons to deceive, oppress, and afflict humanity.",
      "Divine healing and health were secured in the Atonement and are received through believing prayer and faith in Jesus' name."
    ],
    practicalApplication: "Put on the whole armor of God daily, exercise divine authority in Jesus' Name over demonic oppression, minister healing to the sick through the prayer of faith, and rest in angelic watchcare."
  },
  {
    id: "tenet-10-holy-matrimony-family-life",
    number: 10,
    title: "Holy Matrimony, Family, Life & Christian Responsibility",
    category: "Holy Matrimony, Family & Life",
    statement: "The Institution of Marriage, Family, Human Sexuality, Sanctity of Human Life, Civil Government, Divine Providence & Social Responsibility: God ordained marriage as a lifelong covenant between one man and one woman and the foundation of the family. All human life from conception is sacred, bearing the Imago Dei, and must be defended and valued. Civil government is ordained by God for order and justice, and believers must live as law-abiding, prayerful citizens.",
    scripturalReferences: [
      { reference: "Genesis 2:24", text: "Therefore shall a man leave his father and his mother, and shall cleave unto his wife: and they shall be one flesh." },
      { reference: "Matthew 19:4-6", text: "And he answered and said unto them, Have ye not read, that he which made them at the beginning made them male and female, And said, For this cause shall a man leave father and mother, and shall cleave to his wife: and they twain shall be one flesh? Wherefore they are no more twain, but one flesh. What therefore God hath joined together, let not man put asunder." },
      { reference: "Psalm 139:13-16", text: "For thou hast possessed my reins: thou hast covered me in my mother's womb. I will praise thee; for I am fearfully and wonderfully made: marvellous are thy works; and that my soul knoweth right well... Thine eyes did see my substance, yet being unperfect; and in thy book all my members were written." },
      { reference: "Romans 13:1-4", text: "Let every soul be subject unto the higher powers. For there is no power but of God: the powers that be are ordained of God... For he is the minister of God to thee for good." }
    ],
    theologicalBreakdown: [
      "God ordained marriage as a lifelong covenant between one man and one woman and the foundation of the family.",
      "All human life from conception is sacred, bearing the Imago Dei, and must be defended and valued.",
      "Civil government is ordained by God for order and justice, and believers must live as law-abiding, prayerful citizens."
    ],
    practicalApplication: "Honor the holy covenant of marriage, protect and cherish human life at all stages from conception, pray for governing authorities, and shine as light in society through integrity and social responsibility."
  },
  {
    id: "tenet-11-mission-repentance-destiny",
    number: 11,
    title: "The Mission, Repentance & Eternal Destiny",
    category: "The Mission, Repentance & Destiny",
    statement: "The Great Commission, Evangelism, Priesthood of All Believers, True Repentance, Restitution, Intermediate State & Conscious Existence After Death: The supreme mission of every believer and the Church is to evangelize the world and make disciples of all nations. True repentance is godly sorrow that turns from sin unto God and bears fruit in restitution where possible. At death, the righteous are present with the Lord in conscious joy while the wicked are reserved in Hades for judgment.",
    scripturalReferences: [
      { reference: "Matthew 28:19-20", text: "Go ye therefore, and teach all nations, baptizing them in the name of the Father, and of the Son, and of the Holy Ghost: Teaching them to observe all things whatsoever I have commanded you: and, lo, I am with you alway, even unto the end of the world. Amen." },
      { reference: "Luke 19:8-9", text: "And Zacchaeus stood, and said unto the Lord; Behold, Lord, the half of my goods I give to the poor; and if I have taken any thing from any man by false accusation, I restore him fourfold. And Jesus said unto him, This day is salvation come to this house." },
      { reference: "Luke 23:43", text: "And Jesus said unto him, Verily I say unto thee, To day shalt thou be with me in paradise." },
      { reference: "2 Corinthians 5:8", text: "We are confident, I say, and willing rather to be absent from the body, and to be present with the Lord." }
    ],
    theologicalBreakdown: [
      "The supreme mission of every believer and the Church is to evangelize the world and make disciples of all nations.",
      "True repentance is godly sorrow that turns from sin unto God and bears fruit in restitution where possible.",
      "At death, the righteous are present with the Lord in conscious joy while the wicked are reserved in Hades for judgment."
    ],
    practicalApplication: "Commit wholeheartedly to personal and corporate evangelism, walk in continuous repentance and make restitution where needed, and live with eternal perspective knowing our conscious presence with the Lord awaits."
  }
];

/**
 * Systematic Doctrine Categories
 * Grouped into comprehensive, non-overlapping pillars covering all biblical and church doctrines.
 */
export const DOCTRINE_CATEGORIES: DoctrineCategory[] = [
  {
    id: "word-of-god-and-god",
    title: "The Word of God & God",
    slug: "word-of-god-and-god",
    icon: "BookOpen",
    shortDesc: "Inspiration and supreme authority of Scripture, the Holy Trinity, Sovereignty, Creation out of nothing, and divine Attributes.",
    doctrinalFocus: "Bibliology, Theology Proper, Trinitarian Orthodoxy",
    keyScriptures: [
      { reference: "2 Timothy 3:16-17", text: "All scripture is given by inspiration of God, and is profitable for doctrine, for reproof, for correction, for instruction in righteousness." },
      { reference: "Matthew 28:19", text: "Go ye therefore, and teach all nations, baptizing them in the name of the Father, and of the Son, and of the Holy Ghost." },
      { reference: "Genesis 1:1", text: "In the beginning God created the heaven and the earth." },
      { reference: "Psalm 139:7-10", text: "Whither shall I go from thy spirit? or whither shall I flee from thy presence? If I ascend up into heaven, thou art there." }
    ],
    theologicalSummary: "The Bible is the inspired, inerrant, and supreme written authority for faith and life. God is one eternal Being existing in three distinct persons: Father, Son, and Holy Spirit. He is the sovereign Creator who made the universe ex nihilo and rules with infinite power (omnipotent), omnipresence, omniscience, and spotless holiness.",
    foundationalDocumentInsights: [
      "The Unity of the Godhead and Trinity of Persons is the foundation of all Christian worship and prayer.",
      "God's Word was breathed out by the Holy Spirit and stands forever settled in heaven without error.",
      "God's sovereignty ensures that no purpose of His can be thwarted, yet humans are morally accountable before Him."
    ]
  },
  {
    id: "humanity-and-sin",
    title: "Humanity & Sin",
    slug: "humanity-and-sin",
    icon: "Shield",
    shortDesc: "Imago Dei dignity, the Fall and utter depravity of human nature, actual sin, and the eternal doom of the impenitent.",
    doctrinalFocus: "Anthropology, Hamartiology, Human Depravity",
    keyScriptures: [
      { reference: "Genesis 1:27", text: "So God created man in his own image, in the image of God created he him; male and female created he them." },
      { reference: "Romans 3:23", text: "For all have sinned, and come short of the glory of God." },
      { reference: "Romans 5:12", text: "Wherefore, as by one man sin entered into the world, and death by sin; and so death passed upon all men, for that all have sinned." },
      { reference: "Revelation 20:15", text: "And whosoever was not found written in the book of life was cast into the lake of fire." }
    ],
    theologicalSummary: "Humans were created in the image and likeness of God with inherent dignity, sanctity, and divine purpose. Through Adam's transgression, all humans inherited a fallen, sinful nature and are spiritually dead apart from grace. Actual sin is the transgression of God's holy law. Without repentance and regeneration through Christ, the finally impenitent face eternal condemnation.",
    foundationalDocumentInsights: [
      "Every human life possesses infinite worth because of the Imago Dei stamped upon our nature.",
      "Total depravity means sin has infected every part of man's nature, making self-salvation impossible.",
      "Sin is cosmic rebellion against a holy Creator, demanding either the Cross of Christ or eternal judgment."
    ]
  },
  {
    id: "jesus-christ",
    title: "Jesus Christ: Person & Work",
    slug: "jesus-christ",
    icon: "Cross",
    shortDesc: "Virgin birth, full deity and humanity, sinlessness, substitutionary atonement, bodily resurrection, ascension, and intercession.",
    doctrinalFocus: "Christology, Incarnation, Finished Work",
    keyScriptures: [
      { reference: "Luke 1:35", text: "The Holy Ghost shall come upon thee, and the power of the Highest shall overshadow thee: therefore also that holy thing which shall be born of thee shall be called the Son of God." },
      { reference: "John 1:1,14", text: "In the beginning was the Word... and the Word was God... And the Word was made flesh, and dwelt among us." },
      { reference: "1 Peter 2:22,24", text: "Who did no sin, neither was guile found in his mouth: Who his own self bare our sins in his own body on the tree." },
      { reference: "1 Corinthians 15:3-4", text: "Christ died for our sins according to the scriptures; And that he was buried, and that he rose again the third day according to the scriptures." },
      { reference: "Hebrews 7:25", text: "Wherefore he is able also to save them to the uttermost that come unto God by him, seeing he ever liveth to make intercession for them." }
    ],
    theologicalSummary: "Jesus Christ is the eternal Son of God, fully God and fully man in one divine Person. Miraculously conceived by the Holy Spirit and born of the virgin Mary, He lived a completely sinless life, died as a substitutionary sacrifice for human sin on the Cross, physically rose on the third day, ascended into heaven, and continually intercedes for believers at the right hand of the Father.",
    foundationalDocumentInsights: [
      "Jesus had to be fully human to represent us and fully God to bear the infinite penalty of sin.",
      "His bodily resurrection is the historical rock of Christian hope and guarantee of our immortality.",
      "Christ's ongoing intercession in heaven guarantees our final salvation as we draw near to God through Him."
    ]
  },
  {
    id: "salvation-christian-life",
    title: "Salvation & The Christian Life",
    slug: "salvation-christian-life",
    icon: "HeartHandshake",
    shortDesc: "Grace alone, justification by faith, regeneration (the New Birth), progressive sanctification, and holy living.",
    doctrinalFocus: "Soteriology, Justification, Sanctification",
    keyScriptures: [
      { reference: "Ephesians 2:8-9", text: "For by grace are ye saved through faith; and that not of yourselves: it is the gift of God: Not of works, lest any man should boast." },
      { reference: "Romans 5:1", text: "Therefore being justified by faith, we have peace with God through our Lord Jesus Christ." },
      { reference: "Titus 3:5", text: "Not by works of righteousness which we have done, but according to his mercy he saved us, by the washing of regeneration, and renewing of the Holy Ghost." },
      { reference: "1 Peter 1:15-16", text: "But as he which hath called you is holy, so be ye holy in all manner of conversation; Because it is written, Be ye holy; for I am holy." }
    ],
    theologicalSummary: "Salvation is an unearned gift initiated and accomplished purely by God's grace. Believers are justified—declared righteous before God solely through faith in Christ and His finished work, not by works. The Holy Spirit imparts new spiritual life in regeneration (the New Birth), and progressively sanctifies believers in holiness, moral purity, and obedience.",
    foundationalDocumentInsights: [
      "Justification is a permanent legal declaration of righteousness based entirely on Christ's imputed merits.",
      "Regeneration imparts a new divine nature that loves God's law and hates sin.",
      "Sanctification is not optional for the believer; it is the inevitable fruit and evidence of true faith."
    ]
  },
  {
    id: "falling-from-grace",
    title: "Perseverance & Falling from Grace",
    slug: "falling-from-grace",
    icon: "Shield",
    shortDesc: "Scriptural warnings against apostasy, the reality of falling from grace through persistent unbelief, and the call to endure.",
    doctrinalFocus: "Perseverance, Warning Passages, Covenant Fidelity",
    keyScriptures: [
      { reference: "Galatians 5:4", text: "Christ is become of no effect unto you, whosoever of you are justified by the law; ye are fallen from grace." },
      { reference: "Hebrews 3:12-14", text: "Take heed, brethren, lest there be in any of you an evil heart of unbelief, in departing from the living God. But exhort one another daily... For we are made partakers of Christ, if we hold the beginning of our confidence stedfast unto the end." },
      { reference: "Hebrews 10:26,29", text: "For if we sin wilfully after that we have received the knowledge of the truth, there remaineth no more sacrifice for sins... who hath trodden under foot the Son of God." },
      { reference: "2 Peter 2:20-21", text: "For if after they have escaped the pollutions of the world... they are again entangled therein, and overcome, the latter end is worse with them than the beginning." }
    ],
    theologicalSummary: "While believers are securely kept by God's power through living faith, Holy Scripture explicitly warns of the possibility of falling from grace through willful disobedience, hardened unbelief, and turning back to the world. Believers are called to abide continually in Christ, endure trials with steadfast faith, and finish their race with vigilance.",
    foundationalDocumentInsights: [
      "Grace is not a license for carnality; it is the power to overcome sin and walk in holy fellowship with Jesus.",
      "Apostasy begins with neglected prayer and unconfessed compromises that gradually harden the conscience.",
      "Spiritual vigilance and daily mutual encouragement in the Church preserve believers from the deceitfulness of sin."
    ]
  },
  {
    id: "holy-spirit-and-gifts",
    title: "The Holy Spirit & Spiritual Gifts",
    slug: "holy-spirit-and-gifts",
    icon: "Flame",
    shortDesc: "The Baptism of the Holy Ghost with signs following, and the Nine Gifts of the Spirit for edification, exhortation, and comfort.",
    doctrinalFocus: "Pneumatology, Spirit Baptism, 9 Spiritual Gifts",
    keyScriptures: [
      { reference: "Acts 1:8", text: "But ye shall receive power, after that the Holy Ghost is come upon you: and ye shall be witnesses unto me." },
      { reference: "Acts 2:4", text: "And they were all filled with the Holy Ghost, and began to speak with other tongues, as the Spirit gave them utterance." },
      { reference: "1 Corinthians 12:7-11", text: "But the manifestation of the Spirit is given to every man to profit withal... dividing to every man severally as he will." },
      { reference: "1 Corinthians 14:3", text: "But he that prophesieth speaketh unto men to edification, and exhortation, and comfort." }
    ],
    theologicalSummary: "The Baptism of the Holy Ghost is a distinct endowment of supernatural power for believers, with signs following (including speaking with tongues). The Nine Gifts of the Holy Ghost (Wisdom, Knowledge, Faith, Healings, Miracles, Prophecy, Discerning of Spirits, Tongues, Interpretation) are imparted for the edification, exhortation, and comfort of the Church.",
    foundationalDocumentInsights: [
      "The Baptism of the Holy Ghost provides boldness and supernatural empowerment for global evangelism.",
      "The Nine Gifts are manifestations of the Spirit's power to meet practical human needs and exalt Christ.",
      "Spiritual gifts must always be exercised in order, humility, and the supreme bond of agape love."
    ]
  },
  {
    id: "church-sacraments-government",
    title: "The Church, Sacraments, Government & Tithes",
    slug: "church-sacraments-government",
    icon: "Crown",
    shortDesc: "The Body of Christ, Baptism by Immersion, The Lord's Supper, Church Government by Fivefold Ministry/Elders/Deacons, and Tithes & Offerings.",
    doctrinalFocus: "Ecclesiology, Sacraments, Church Offices, Stewardship",
    keyScriptures: [
      { reference: "Matthew 28:19", text: "Go ye therefore, and teach all nations, baptizing them in the name of the Father, and of the Son, and of the Holy Ghost." },
      { reference: "1 Corinthians 11:26", text: "For as often as ye eat this bread, and drink this cup, ye do shew the Lord's death till he come." },
      { reference: "Ephesians 4:11-12", text: "And he gave some, apostles; and some, prophets; and some, evangelists; and some, pastors and teachers; For the perfecting of the saints, for the work of the ministry." },
      { reference: "Malachi 3:10", text: "Bring ye all the tithes into the storehouse, that there may be meat in mine house, and prove me now herewith, saith the Lord of hosts." },
      { reference: "Matthew 23:23", text: "These ought ye to have done, and not to leave the other undone." }
    ],
    theologicalSummary: "The Church is the universal body of Christ. It celebrates two Sacraments: Water Baptism by Immersion and the Lord's Supper. Church Government is ordered biblically by Apostles, Prophets, Evangelists, Pastors, Teachers, Elders, Deacons, and Deaconesses for perfecting the saints. The obligatory nature of Tithes and Offerings is honored as a vital spiritual covenant to support ministry and advance God's Kingdom.",
    foundationalDocumentInsights: [
      "Water baptism by immersion visibly portrays our union with Christ in His death, burial, and resurrection.",
      "The Lord's Table is a holy remembrance of Calvary and a communion of spiritual nourishment and covenant renewal.",
      "Biblical tithing returns to God the first tenth as an act of worship, ensuring the storehouse of God's house is filled."
    ]
  },
  {
    id: "eschatology-future-things",
    title: "The Second Coming & Future Things",
    slug: "eschatology-future-things",
    icon: "Sun",
    shortDesc: "The bodily Second Coming of Christ, His Millennial Reign, the resurrection of the dead, final judgment, and eternal glory.",
    doctrinalFocus: "Eschatology, Millennial Reign, Eternal States",
    keyScriptures: [
      { reference: "Acts 1:11", text: "This same Jesus, which is taken up from you into heaven, shall so come in like manner as ye have seen him go into heaven." },
      { reference: "Revelation 20:4-6", text: "And they lived and reigned with Christ a thousand years... on such the second death hath no power." },
      { reference: "1 Thessalonians 4:16-17", text: "For the Lord himself shall descend from heaven with a shout... and the dead in Christ shall rise first." },
      { reference: "Revelation 21:3-4", text: "And God shall wipe away all tears from their eyes; and there shall be no more death, neither sorrow, nor crying." }
    ],
    theologicalSummary: "Jesus Christ will return physically, visibly, and triumphantly to earth to judge the living and the dead and consummate His Kingdom. He will establish His Millennial Reign upon the earth. The dead shall be raised—the righteous to eternal life in the New Heavens and Earth, and the wicked to the resurrection of judgment and eternal doom.",
    foundationalDocumentInsights: [
      "The Second Coming is the ultimate blessed hope of the Church, motivating holy living and zealous mission.",
      "Christ's literal Millennial Reign will fulfill all Old Testament promises of cosmic justice and earthly peace.",
      "Eternity with God will be an endless journey of joy, unbroken fellowship, and creative worship in His presence."
    ]
  },
  {
    id: "prayer-fasting-faith",
    title: "Prayer, Fasting & Victorious Faith",
    slug: "prayer-fasting-faith",
    icon: "Sparkles",
    shortDesc: "Intimate communion with the Father, biblical fasting, prevailing intercession, and unshakeable faith in God's promises.",
    doctrinalFocus: "Spiritual Disciplines, Intercession, Faith",
    keyScriptures: [
      { reference: "Hebrews 11:1,6", text: "Now faith is the substance of things hoped for, the evidence of things not seen... without faith it is impossible to please him." },
      { reference: "Matthew 6:6", text: "But thou, when thou prayest, enter into thy closet, and when thou hast shut thy door, pray to thy Father which is in secret." },
      { reference: "Philippians 4:6-7", text: "Be careful for nothing; but in every thing by prayer and supplication with thanksgiving let your requests be made known unto God." }
    ],
    theologicalSummary: "Prayer is intimate conversation and covenant alignment with our Heavenly Father. Fasting is the voluntary abstaining from food to humble the soul, sharpen spiritual perception, and break fleshly appetites. Faith is the supernatural conviction that God is faithful to every promise He has spoken in His Word.",
    foundationalDocumentInsights: [
      "Prayer does not change God's character; it aligns human hearts with His sovereign will.",
      "Biblical fasting intensifies spiritual focus and releases supernatural breakthrough in crises.",
      "Living faith acts on God's Word before seeing physical manifestation."
    ]
  },
  {
    id: "spiritual-warfare-healing",
    title: "Spiritual Warfare, Divine Authority & Divine Healing",
    slug: "spiritual-warfare-healing",
    icon: "Shield",
    shortDesc: "Angels, Satan, Demons, Spiritual Warfare, Armor of God, Divine Healing & Miraculous Provision.",
    doctrinalFocus: "Angelology, Demonology, Spiritual Authority, Divine Healing & Provision",
    keyScriptures: [
      { reference: "Hebrews 1:14", text: "Are they not all ministering spirits, sent forth to minister for them who shall be heirs of salvation?" },
      { reference: "Ephesians 6:10-12", text: "Finally, my brethren, be strong in the Lord, and in the power of his might. Put on the whole armour of God, that ye may be able to stand against the wiles of the devil. For we wrestle not against flesh and blood, but against principalities, against powers, against the rulers of the darkness of this world, against spiritual wickedness in high places." },
      { reference: "Isaiah 53:4-5", text: "Surely he hath borne our griefs, and carried our sorrows: yet we did esteem him stricken, smitten of God, and afflicted. But he was wounded for our transgressions, he was bruised for our iniquities: the chastisement of our peace was upon him; and with his stripes we are healed." },
      { reference: "James 5:14-15", text: "Is any sick among you? let him call for the elders of the church; and let them pray over him, anointing him with oil in the name of the Lord: And the prayer of faith shall save the sick, and the Lord shall raise him up; and if he have committed sins, they shall be forgiven him." }
    ],
    theologicalSummary: "Holy angels are ministering spirits sent to serve the heirs of salvation and execute God's purposes. Satan fell through pride and now operates with his demons to deceive, oppress, and afflict humanity. Divine healing and health were secured in the Atonement and are received through believing prayer and faith in Jesus' name.",
    foundationalDocumentInsights: [
      "Holy angels are ministering spirits sent to serve the heirs of salvation and execute God's purposes.",
      "Satan fell through pride and now operates with his demons to deceive, oppress, and afflict humanity.",
      "Divine healing and health were secured in the Atonement and are received through believing prayer and faith in Jesus' name."
    ]
  },
  {
    id: "holy-matrimony-family-life",
    title: "Holy Matrimony, Family, Life & Christian Responsibility",
    slug: "holy-matrimony-family-life",
    icon: "HeartHandshake",
    shortDesc: "The Institution of Marriage, Family, Human Sexuality, Sanctity of Human Life, Civil Government, Divine Providence & Social Responsibility.",
    doctrinalFocus: "Holy Matrimony, Sanctity of Life, Family & Civil Governance",
    keyScriptures: [
      { reference: "Genesis 2:24", text: "Therefore shall a man leave his father and his mother, and shall cleave unto his wife: and they shall be one flesh." },
      { reference: "Matthew 19:4-6", text: "And he answered and said unto them, Have ye not read, that he which made them at the beginning made them male and female, And said, For this cause shall a man leave father and mother, and shall cleave to his wife: and they twain shall be one flesh? Wherefore they are no more twain, but one flesh. What therefore God hath joined together, let not man put asunder." },
      { reference: "Psalm 139:13-16", text: "For thou hast possessed my reins: thou hast covered me in my mother's womb. I will praise thee; for I am fearfully and wonderfully made: marvellous are thy works; and that my soul knoweth right well... Thine eyes did see my substance, yet being unperfect; and in thy book all my members were written." },
      { reference: "Romans 13:1-4", text: "Let every soul be subject unto the higher powers. For there is no power but of God: the powers that be are ordained of God... For he is the minister of God to thee for good." }
    ],
    theologicalSummary: "God ordained marriage as a lifelong covenant between one man and one woman and the foundation of the family. All human life from conception is sacred, bearing the Imago Dei, and must be defended and valued. Civil government is ordained by God for order and justice, and believers must live as law-abiding, prayerful citizens.",
    foundationalDocumentInsights: [
      "God ordained marriage as a lifelong covenant between one man and one woman and the foundation of the family.",
      "All human life from conception is sacred, bearing the Imago Dei, and must be defended and valued.",
      "Civil government is ordained by God for order and justice, and believers must live as law-abiding, prayerful citizens."
    ]
  },
  {
    id: "mission-repentance-destiny",
    title: "The Mission, Repentance & Eternal Destiny",
    slug: "mission-repentance-destiny",
    icon: "Crown",
    shortDesc: "The Great Commission, Evangelism, Priesthood of All Believers, True Repentance, Restitution, Intermediate State & Conscious Existence After Death.",
    doctrinalFocus: "The Great Commission, Biblical Repentance, Restitution & Eternal Destiny",
    keyScriptures: [
      { reference: "Matthew 28:19-20", text: "Go ye therefore, and teach all nations, baptizing them in the name of the Father, and of the Son, and of the Holy Ghost: Teaching them to observe all things whatsoever I have commanded you: and, lo, I am with you alway, even unto the end of the world. Amen." },
      { reference: "Luke 19:8-9", text: "And Zacchaeus stood, and said unto the Lord; Behold, Lord, the half of my goods I give to the poor; and if I have taken any thing from any man by false accusation, I restore him fourfold. And Jesus said unto him, This day is salvation come to this house." },
      { reference: "Luke 23:43", text: "And Jesus said unto him, Verily I say unto thee, To day shalt thou be with me in paradise." },
      { reference: "2 Corinthians 5:8", text: "We are confident, I say, and willing rather to be absent from the body, and to be present with the Lord." }
    ],
    theologicalSummary: "The supreme mission of every believer and the Church is to evangelize the world and make disciples of all nations. True repentance is godly sorrow that turns from sin unto God and bears fruit in restitution where possible. At death, the righteous are present with the Lord in conscious joy while the wicked are reserved in Hades for judgment.",
    foundationalDocumentInsights: [
      "The supreme mission of every believer and the Church is to evangelize the world and make disciples of all nations.",
      "True repentance is godly sorrow that turns from sin unto God and bears fruit in restitution where possible.",
      "At death, the righteous are present with the Lord in conscious joy while the wicked are reserved in Hades for judgment."
    ]
  },
  {
    id: "joy-of-the-lord",
    title: "The Joy of the Lord & Victorious Living",
    slug: "joy-of-the-lord",
    icon: "Sun",
    shortDesc: "Supernatural gladness that transcends earthly circumstances, resilient hope, and daily triumph in Christ.",
    doctrinalFocus: "Christian Joy, Spiritual Resilience, Kingdom Dominion",
    keyScriptures: [
      { reference: "Nehemiah 8:10", text: "The joy of the Lord is your strength." },
      { reference: "Romans 8:37", text: "Nay, in all these things we are more than conquerors through him that loved us." },
      { reference: "Psalm 16:11", text: "In thy presence is fulness of joy; at thy right hand there are pleasures for evermore." }
    ],
    theologicalSummary: "The joy of the Lord is an unshakeable spiritual strength rooted in the immutable love and promises of God. Unlike worldly happiness, biblical joy thrives even during trials and persecutions because Christ is seated on the throne and our eternal victory is secured.",
    foundationalDocumentInsights: [
      "Joy is a defensive fortress that disarms anxiety and dispels demonic despair.",
      "Rejoicing in God is an act of spiritual warfare that releases supernatural strength.",
      "Abiding in Christ produces a steady overflow of grateful, infectious joy."
    ]
  }
];

/**
 * In-Depth Systematic Doctrinal Articles
 */
export const DOCTRINE_ARTICLES: DoctrineArticle[] = [
  {
    id: "art-word-god-1",
    categoryId: "word-of-god-and-god",
    categoryTitle: "The Word of God & God",
    title: "The Divine Inspiration, Trinity & Sovereignty of God",
    subtitle: "Understanding the Infallible Word, the Triune Godhead, Creation Ex Nihilo, and Divine Attributes",
    theologicalOverview: "Christian orthodoxy begins with the living God who has made Himself known. The Holy Scriptures of the Old and New Testaments are the inspired, infallible, and supreme written authority for all faith and practice. God is one eternal essence existing in three distinct Persons: Father, Son, and Holy Spirit. As sovereign Creator, He spoke the universe into existence out of nothing and declared it good, governing all creation with omnipotence, omnipresence, omniscience, and perfect holiness.",
    keyScriptures: [
      { ref: "2 Timothy 3:16-17", text: "All scripture is given by inspiration of God, and is profitable for doctrine, for reproof, for correction, for instruction in righteousness.", context: "Paul affirms verbal plenary inspiration as the ground for spiritual maturity and sound doctrine." },
      { ref: "Matthew 28:19", text: "Go ye therefore, and teach all nations, baptizing them in the name of the Father, and of the Son, and of the Holy Ghost.", context: "The singular 'name' of the Triune God reveals the essential unity of three divine Persons." },
      { ref: "Genesis 1:1,31", text: "In the beginning God created the heaven and the earth... And God saw every thing that he had made, and, behold, it was very good.", context: "The historical ex nihilo creation of the cosmos by the sovereign decree of the Almighty." },
      { ref: "Psalm 139:1-10", text: "O Lord, thou hast searched me, and known me... Whither shall I go from thy spirit? or whither shall I flee from thy presence?", context: "David's contemplation of God's omniscience and omnipresent watchcare." }
    ],
    doctrinalPillars: [
      { title: "Verbal Plenary Inspiration & Inerrancy", explanation: "Every word of the original biblical text was breathed out by the Holy Spirit, making Scripture the sole infallible rule of faith.", scripture: "2 Peter 1:21" },
      { title: "The Unity of the Godhead in Trinity", explanation: "One divine Being in three co-equal and co-eternal Persons—Father, Son, and Holy Spirit.", scripture: "2 Corinthians 13:14" },
      { title: "Creatio Ex Nihilo & Absolute Sovereignty", explanation: "God created all matter from nothing and exercises righteous providence over history, nature, and humanity.", scripture: "Colossians 1:16-17" },
      { title: "Infinite Divine Attributes", explanation: "God is omnipotent (all-powerful), omnipresent (everywhere), omniscient (all-knowing), and eternally holy.", scripture: "Isaiah 6:3, 40:28" }
    ],
    practicalApplication: [
      "Submit your mind and life wholly to Scripture: Measure every cultural trend, opinion, and feeling against God's written Word.",
      "Worship the Triune God: Pray to the Father, through the Son, in the fellowship and power of the Holy Spirit.",
      "Trust God's sovereign wisdom: In times of uncertainty, rest in the knowledge that God knows all things and works all things for His glory."
    ],
    historicalAndConfessionalBasis: "Affirmed across all historic ecumenical creeds (Nicene Creed 325 AD, Athanasian Creed, Chalcedon 451 AD) and the Chicago Statement on Biblical Inerrancy.",
    guidedReflection: "Almighty God, Father, Son, and Holy Spirit, I bow before Your sovereign majesty. Thank You for the infallible lamp of Your holy Word. Fill my heart with reverent awe for Your attributes and teach me to walk in truth every day of my life."
  },
  {
    id: "art-humanity-sin-1",
    categoryId: "humanity-and-sin",
    categoryTitle: "Humanity & Sin",
    title: "Imago Dei, The Fall & The Necessity of Repentance",
    subtitle: "From Inherent Dignity to Total Depravity and the Reality of Eternal Judgment",
    theologicalOverview: "Humanity was created in the image and likeness of God (Imago Dei), endowed with inherent dignity, moral capacity, and a sacred mandate to walk in fellowship with the Creator. Through Adam's willful rebellion, sin entered the world, resulting in the utter depravity of human nature. All human beings inherited a corrupted nature, becoming spiritually dead and alienated from God. Actual sin is the transgression of God's moral law. Apart from the supernatural grace of repentance and regeneration in Christ, fallen humanity faces the tragic reality of the eternal doom of the finally impenitent.",
    keyScriptures: [
      { ref: "Genesis 1:26-27", text: "And God said, Let us make man in our image, after our likeness... So God created man in his own image.", context: "The foundational revelation of human dignity, sanctity of life, and purpose." },
      { ref: "Romans 5:12,19", text: "Wherefore, as by one man sin entered into the world, and death by sin; and so death passed upon all men... by one man's disobedience many were made sinners.", context: "The universal transmission of the fallen nature through Adam." },
      { ref: "Ephesians 2:1-3", text: "And you hath he quickened, who were dead in trespasses and sins... and were by nature the children of wrath, even as others.", context: "The total spiritual inability of fallen humanity without divine grace." },
      { ref: "Revelation 20:11-15", text: "And I saw the dead, small and great, stand before God... And whosoever was not found written in the book of life was cast into the lake of fire.", context: "The sobering reality of the Great White Throne Judgment for the finally impenitent." }
    ],
    doctrinalPillars: [
      { title: "The Imago Dei & Sanctity of Life", explanation: "Every human possesses sacred value from conception because we are stamped with God's image and likeness.", scripture: "James 3:9" },
      { title: "Total Depravity & Spiritual Inability", explanation: "Sin has corrupted human intellect, affections, and will, leaving mankind incapable of self-redemption.", scripture: "Romans 3:10-18" },
      { title: "Actual Sin as Law-Breaking", explanation: "Sin is cosmic rebellion against God's moral law, producing spiritual death and separation.", scripture: "1 John 3:4" },
      { title: "Eternal Doom of the Impenitent", explanation: "God's holy justice requires the eternal separation and punishment of those who reject His mercy in Christ.", scripture: "Matthew 25:41,46" }
    ],
    practicalApplication: [
      "Treat every human being with honor: Respect life at every stage because of the Imago Dei.",
      "Cultivate deep humility and repentance: Renounce all self-righteous boasting, knowing our righteousness is filthy rags apart from Christ.",
      "Engage in urgent evangelism: Warn the lost with tears and love about the reality of eternal judgment and point them to Jesus."
    ],
    historicalAndConfessionalBasis: "Rooted in Augustine's doctrine of Original Sin, the Protestant Reformers' defense of human inability, and the historical consensus of the early Church.",
    guidedReflection: "Holy Father, I acknowledge my utter unworthiness and moral poverty apart from Your grace. Thank You for rescuing me from spiritual death and eternal doom through the blood of Your Son. Keep my heart broken for the lost and passionate for holiness."
  },
  {
    id: "art-jesus-christ-1",
    categoryId: "jesus-christ",
    categoryTitle: "Jesus Christ: Person & Work",
    title: "The Virgin Birth, Substitutionary Atonement & Eternal Kingship",
    subtitle: "The Incarnation, Sinless Obedience, Resurrection, Ascension, and Intercession of our Lord",
    theologicalOverview: "Jesus Christ is the centerpiece of divine history. Conceived miraculously by the Holy Spirit and born of the virgin Mary, He is truly God and truly man—two distinct natures in one undivided divine Person. He lived a life of spotless sinlessness, fulfilling all righteousness. On Calvary, He died as our substitutionary penal sacrifice, bearing the full wrath of God against our sins. On the third day, He physically and triumphantly rose from the dead, ascended to the right hand of the Father where He continually intercedes for believers, and shall return bodily to reign as King of Kings.",
    keyScriptures: [
      { ref: "Luke 1:35", text: "The Holy Ghost shall come upon thee, and the power of the Highest shall overshadow thee: therefore also that holy thing which shall be born of thee shall be called the Son of God.", context: "The miraculous conception safeguarding Christ's sinless deity and true humanity." },
      { ref: "2 Corinthians 5:21", text: "For he hath made him to be sin for us, who knew no sin; that we might be made the righteousness of God in him.", context: "The great substitutionary exchange on the Cross." },
      { ref: "1 Corinthians 15:20", text: "But now is Christ risen from the dead, and become the firstfruits of them that slept.", context: "The historical reality and guarantee of Christ's physical resurrection." },
      { ref: "Hebrews 7:25", text: "Wherefore he is able also to save them to the uttermost that come unto God by him, seeing he ever liveth to make intercession for them.", context: "Christ's perpetual High Priestly advocacy in heaven." }
    ],
    doctrinalPillars: [
      { title: "Virgin Birth & Hypostatic Union", explanation: "Conceived of the Holy Spirit and born of Mary, Christ is fully divine and fully human without contradiction.", scripture: "John 1:14, Luke 1:34-35" },
      { title: "Sinless Life & Active Obedience", explanation: "Jesus lived in spotless obedience to the Law, providing the perfect righteousness imputed to believers.", scripture: "Hebrews 4:15, 1 Peter 2:22" },
      { title: "Substitutionary Penal Atonement", explanation: "Christ died in our place on the Cross, satisfying divine justice and extinguishing God's holy wrath.", scripture: "Isaiah 53:5-6, Romans 3:25" },
      { title: "Bodily Resurrection & Session", explanation: "Christ rose physically from the grave, ascended to heaven, and rules at the Father's right hand.", scripture: "Acts 2:32-36, Ephesians 1:20-22" }
    ],
    practicalApplication: [
      "Anchor your conscience on Christ's finished work: Whenever guilt or condemnation accuses you, point to the Blood of Jesus.",
      "Rejoice in Christ's ongoing intercession: When you face temptation or weakness, remember that Jesus is praying for you right now.",
      "Bow to His Lordship in all things: Submit your career, family, finances, and desires to King Jesus."
    ],
    historicalAndConfessionalBasis: "Defined in the Chalcedonian Definition (451 AD), Apostles' Creed, and historic Protestant Confessions of Faith.",
    guidedReflection: "Lord Jesus, Lamb of God and King of Kings, I worship You for Your miraculous incarnation, Your sinless sacrifice on the Cross, and Your triumphant resurrection. I place my entire trust in Your finished work and yield my life to Your glorious Lordship."
  },
  {
    id: "art-salvation-grace-1",
    categoryId: "salvation-christian-life",
    categoryTitle: "Salvation & The Christian Life",
    title: "Grace Alone, Justification by Faith, Regeneration & Sanctification",
    subtitle: "How God Rescues Sinners, Renews the Heart, and Transforms the Believer into Christ's Likeness",
    theologicalOverview: "Salvation is entirely the sovereign, merciful work of the Triune God, received by grace alone (Sola Gratia) through faith alone (Sola Fide) in Christ alone (Solus Christus). In justification, God legally pardons the sinner and credits Christ's perfect righteousness to their account. In regeneration (the New Birth), the Holy Spirit sovereignly breathes new spiritual life into the dead soul, imparting a new heart and divine nature. Sanctification is the ongoing supernatural process wherein the believer grows in holiness, mortifies the flesh, and is conformed daily into the image of Jesus Christ.",
    keyScriptures: [
      { ref: "Ephesians 2:8-9", text: "For by grace are ye saved through faith; and that not of yourselves: it is the gift of God: Not of works, lest any man should boast.", context: "The foundational bedrock of unearned salvation purely by divine grace." },
      { ref: "Romans 5:1-2", text: "Therefore being justified by faith, we have peace with God through our Lord Jesus Christ: By whom also we have access by faith into this grace wherein we stand.", context: "The legal pardon and permanent peace established by justification." },
      { ref: "Titus 3:5", text: "Not by works of righteousness which we have done, but according to his mercy he saved us, by the washing of regeneration, and renewing of the Holy Ghost.", context: "Regeneration as the internal cleansing and life-giving work of the Spirit." },
      { ref: "2 Corinthians 3:18", text: "But we all, with open face beholding as in a glass the glory of the Lord, are changed into the same image from glory to glory, even as by the Spirit of the Lord.", context: "Progressive transformation through beholding Christ and yielding to the Spirit." }
    ],
    doctrinalPillars: [
      { title: "Sola Gratia & Sola Fide", explanation: "Salvation is initiated entirely by God's free favor and received solely through trusting in Christ's merit.", scripture: "Romans 3:24-28" },
      { title: "Regeneration (The New Birth)", explanation: "The Holy Spirit imparts a new heart, making the believer a new creation with new desires.", scripture: "Ezekiel 36:26, John 3:3-5" },
      { title: "Positional & Progressive Sanctification", explanation: "Set apart as holy in Christ at conversion, and continually growing in practical purity day by day.", scripture: "1 Thessalonians 5:23, Hebrews 10:14" },
      { title: "Holy Living & Moral Purity", explanation: "Genuine faith produces good works, moral integrity, sexual purity, and agape love.", scripture: "James 2:17-18, Galatians 5:22-24" }
    ],
    practicalApplication: [
      "Rest from legalistic striving: Live in the joyful confidence that you are fully accepted in Christ.",
      "Pursue intentional holiness: Flee youthful lusts, guard your eyes, and fill your mind with Scripture.",
      "Walk in daily surrender: Ask the Holy Spirit every morning to produce the fruit of love, joy, and peace in your words and deeds."
    ],
    historicalAndConfessionalBasis: "The central rallying cry of the Protestant Reformation and the universal heritage of historic evangelical orthodoxy.",
    guidedReflection: "Gracious Father, thank You for the unsearchable riches of Your grace. You took a heart of stone and gave me a heart of flesh. Sanctify me wholly by Your truth, and let my life radiate the beauty of holiness in everything I do."
  },
  {
    id: "art-falling-from-grace-1",
    categoryId: "falling-from-grace",
    categoryTitle: "Perseverance & Falling from Grace",
    title: "Standing Fast in the Faith: The Solemn Warning of Falling from Grace",
    subtitle: "Covenant Responsibility, Guarding against Apostasy, and Enduring Faith to the End",
    theologicalOverview: "Holy Scripture balances the glorious comfort of God's keeping power with solemn, sober warnings against spiritual presumption and apostasy. To fall from grace is to abandon the pathway of living faith in Jesus Christ, turning back to worldly corruption or dead legalism. The Apostle Paul warned the Galatians: 'ye are fallen from grace' (Galatians 5:4), and the Epistle to the Hebrews warns against developing an 'evil heart of unbelief in departing from the living God' (Hebrews 3:12). True salvation involves an abiding, persevering relationship with the Vine; believers are urged to hold fast their confidence steadfast unto the end.",
    keyScriptures: [
      { ref: "Galatians 5:4", text: "Christ is become of no effect unto you, whosoever of you are justified by the law; ye are fallen from grace.", context: "Paul warns that substituting human legalism for Christ's grace severs one's vital connection to the Gospel." },
      { ref: "Hebrews 3:12-14", text: "Take heed, brethren, lest there be in any of you an evil heart of unbelief, in departing from the living God... For we are made partakers of Christ, if we hold the beginning of our confidence stedfast unto the end.", context: "A direct apostolic warning to believers to guard against hardening of heart." },
      { ref: "Hebrews 10:26,29", text: "For if we sin wilfully after that we have received the knowledge of the truth, there remaineth no more sacrifice for sins... who hath trodden under foot the Son of God.", context: "The peril of willful, unrepentant apostasy against the blood of the covenant." },
      { ref: "1 Corinthians 10:12", text: "Wherefore let him that thinketh he standeth take heed lest he fall.", context: "Paul's admonition to maintain holy vigilance and avoid self-confident carelessness." }
    ],
    doctrinalPillars: [
      { title: "Living & Abiding Faith", explanation: "Salvation is maintained in a dynamic, abiding union with Jesus Christ (John 15:1-6).", scripture: "John 15:6" },
      { title: "The Deceitfulness of Sin", explanation: "Sin hardens the human heart gradually when left unconfessed, eventually leading to spiritual apostasy.", scripture: "Hebrews 3:13" },
      { title: "The Call to Persevere", explanation: "Scripture promises eternal reward to those who overcome and endure to the end.", scripture: "Matthew 24:13, Revelation 2:10" }
    ],
    practicalApplication: [
      "Keep short accounts with God: Confess and forsake every known sin immediately upon conviction.",
      "Stay active in Christian fellowship: Allow godly pastors and mature brethren to speak truth and correction into your life.",
      "Feed on the Word daily: Keep your spiritual appetite burning with prayer, worship, and Scripture intake."
    ],
    historicalAndConfessionalBasis: "Rooted in the historic teachings of the Early Church Fathers, the Arminian-Wesleyan tradition, and the sober apostolic epistles.",
    guidedReflection: "Lord Jesus, keep me abiding in You. Deliver me from lukewarmness, secret compromise, and pride. Hold me by Your righteous right hand, and grant me the perseverance to finish my earthly race with unshakeable joy."
  },
  {
    id: "art-holy-spirit-gifts-1",
    categoryId: "holy-spirit-and-gifts",
    categoryTitle: "The Holy Spirit & Spiritual Gifts",
    title: "The Baptism of the Holy Ghost & The Operation of the Nine Spiritual Gifts",
    subtitle: "Supernatural Power for Believers, Signs Following, and the Equipping of the Body of Christ",
    theologicalOverview: "The Holy Spirit is the third Person of the Trinity who empowers the Church for global mission and victorious living. The Baptism of the Holy Ghost is a distinct experience subsequent to regeneration, wherein the believer is immersed into the power of the Spirit with initial physical evidence and signs following (including speaking with other tongues). Furthermore, the Holy Spirit distributes Nine Supernatural Gifts (Wisdom, Knowledge, Faith, Healings, Miracles, Prophecy, Discerning of Spirits, Tongues, Interpretation) for the edification, exhortation, and comfort of the Church.",
    keyScriptures: [
      { ref: "Acts 1:8", text: "But ye shall receive power, after that the Holy Ghost is come upon you: and ye shall be witnesses unto me both in Jerusalem, and in all Judaea, and in Samaria, and unto the uttermost part of the earth.", context: "Jesus' promise of divine enduement of power for evangelism." },
      { ref: "Acts 2:1-4", text: "And when the day of Pentecost was fully come... they were all filled with the Holy Ghost, and began to speak with other tongues, as the Spirit gave them utterance.", context: "The historical outpouring and normative pattern of Spirit baptism." },
      { ref: "1 Corinthians 12:7-11", text: "But the manifestation of the Spirit is given to every man to profit withal... dividing to every man severally as he will.", context: "Paul's comprehensive exposition of the nine spiritual gifts." },
      { ref: "1 Corinthians 14:3,12", text: "He that prophesieth speaketh unto men to edification, and exhortation, and comfort... seek that ye may excel to the edifying of the church.", context: "The paramount purpose of spiritual gifts: building up the Body of Christ." }
    ],
    doctrinalPillars: [
      { title: "The Baptism of the Holy Ghost", explanation: "An endowment of heavenly power distinct from salvation, enabling bold witness and holy living.", scripture: "Luke 24:49, Acts 19:6" },
      { title: "Signs Following & Tongues", explanation: "Supernatural signs, including speaking with other tongues, follow the baptism as the Spirit gives utterance.", scripture: "Mark 16:17, Acts 10:45-46" },
      { title: "The Ninefold Gifts of the Spirit", explanation: "Revelation gifts (Wisdom, Knowledge, Discernment), Power gifts (Faith, Healing, Miracles), and Utterance gifts (Prophecy, Tongues, Interpretation).", scripture: "1 Corinthians 12:4-11" },
      { title: "Edification & Divine Order", explanation: "Gifts must be governed by biblical order, decency, and supreme agape love.", scripture: "1 Corinthians 13:1-3, 14:40" }
    ],
    practicalApplication: [
      "Ask in faith for the Baptism of the Holy Ghost: Approach the Father with hunger, expecting the promised enduement of power.",
      "Pray in the Spirit regularly: Build up your inner man and release divine mysteries in prayer (1 Cor 14:2, Jude 1:20).",
      "Step out in spiritual boldness: Pray for the sick, speak words of encouragement and wisdom, and serve the Church with humility."
    ],
    historicalAndConfessionalBasis: "Rooted in the Day of Pentecost, the historic Apostolic Church, the Azusa Street Revival, and the global Pentecostal-Charismatic movement.",
    guidedReflection: "Holy Spirit, flood my life with Your supernatural fire. Baptize me afresh with power from on high. Awaken Your spiritual gifts within me, and make me a bold, loving, and effective instrument to touch lives in Jesus' Name."
  },
  {
    id: "art-church-sacraments-government-1",
    categoryId: "church-sacraments-government",
    categoryTitle: "The Church, Sacraments, Government & Tithes",
    title: "The Body of Christ, Sacred Ordinances, Fivefold Ministry & Covenant Tithing",
    subtitle: "Understanding Baptism by Immersion, The Lord's Supper, Apostolic Leadership, and Biblical Tithing",
    theologicalOverview: "The Church is the living Body and Bride of Christ, composed of all born-again believers. The Church celebrates two holy Sacraments: Water Baptism by Immersion (an outward public declaration of dying and rising with Christ) and the Lord's Supper (Holy Communion in remembrance of Christ's atoning death). The Church is governed biblically by the Ascension Fivefold Ministry (Apostles, Prophets, Evangelists, Pastors, Teachers) alongside Elders, Deacons, and Deaconesses for spiritual oversight and equipping the saints. Furthermore, Scripture mandates the obligatory nature of Tithes and Offerings as a vital act of worship and kingdom stewardship.",
    keyScriptures: [
      { ref: "Matthew 28:19", text: "Go ye therefore, and teach all nations, baptizing them in the name of the Father, and of the Son, and of the Holy Ghost.", context: "The Great Commission mandate for believer's baptism." },
      { ref: "1 Corinthians 11:23-26", text: "For as often as ye eat this bread, and drink this cup, ye do shew the Lord's death till he come.", context: "Paul's transmission of the sacred institution of Holy Communion." },
      { ref: "Ephesians 4:11-13", text: "And he gave some, apostles; and some, prophets; and some, evangelists; and some, pastors and teachers; For the perfecting of the saints, for the work of the ministry.", context: "The divine governmental order for church maturity and alignment." },
      { ref: "Malachi 3:10", text: "Bring ye all the tithes into the storehouse, that there may be meat in mine house, and prove me now herewith, saith the Lord of hosts, if I will not open you the windows of heaven.", context: "The unchanging covenant promise and obligation of returning the tithe to God's storehouse." },
      { ref: "Matthew 23:23", text: "These ought ye to have done, and not to leave the other undone.", context: "Jesus Christ affirming the ongoing validity of tithing alongside justice and faith." }
    ],
    doctrinalPillars: [
      { title: "The Universal & Local Church", explanation: "The Church is the pillar and ground of the truth, visibly gathered in local assemblies for worship and discipleship.", scripture: "1 Timothy 3:15, Hebrews 10:25" },
      { title: "Sacraments of Baptism & Lord's Supper", explanation: "Water immersion signifies death to sin and resurrection to life; Communion proclaims Christ's death till He comes.", scripture: "Romans 6:3-5, 1 Corinthians 10:16" },
      { title: "Apostolic Church Government", explanation: "Fivefold ministry gifts, elders, deacons, and deaconesses functioning in holy order for the perfecting of the saints.", scripture: "1 Timothy 3:1-13, Titus 1:5, Romans 16:1" },
      { title: "Obligatory Tithes & Cheerful Offerings", explanation: "Returning the first tenth of all income to the local church storehouse supports ministry and releases kingdom blessing.", scripture: "Genesis 14:20, 2 Corinthians 9:6-8" }
    ],
    practicalApplication: [
      "Follow Christ in water baptism: If you are born again, be immersed in water as a public testimony of your faith.",
      "Partake reverently of Communion: Examine your heart, forgive others, and feast in faith on Christ's broken body and shed blood.",
      "Faithfully tithe to your local church: Honor God with the firstfruits of all your income, trusting His covenant promises to supply all your needs."
    ],
    historicalAndConfessionalBasis: "Rooted in the Apostolic New Testament epistles, the historic practice of the Early Church, and historic orthodox church constitutions.",
    guidedReflection: "Lord Jesus, Head of the Church, thank You for placing me in Your living Body. I commit to honoring Your ordinances, submitting to godly spiritual leadership, and faithfully returning my tithes and offerings to build Your Kingdom on earth."
  },
  {
    id: "art-eschatology-1",
    categoryId: "eschatology-future-things",
    categoryTitle: "The Second Coming & Future Things",
    title: "The Glorious Return of Christ, The Millennial Reign & Eternal Consummation",
    subtitle: "The Physical Second Coming, Resurrection of the Dead, and the New Heavens and New Earth",
    theologicalOverview: "Eschatology is the crown of biblical prophecy. The Lord Jesus Christ will return physically, bodily, and visibly in power and great glory. The dead in Christ shall rise first, and living believers will be transformed. Christ will judge the nations, execute His literal Millennial Reign upon the earth, and banish Satan forever. Following the Great White Throne Judgment, God will eradicate sin, sorrow, and death, inaugurating the New Heavens and New Earth where the redeemed shall dwell in everlasting joy and radiant fellowship with God.",
    keyScriptures: [
      { ref: "Acts 1:11", text: "This same Jesus, which is taken up from you into heaven, shall so come in like manner as ye have seen him go into heaven.", context: "The angelic promise of Christ's literal, bodily return." },
      { ref: "1 Thessalonians 4:16-17", text: "For the Lord himself shall descend from heaven with a shout... and the dead in Christ shall rise first: Then we which are alive and remain shall be caught up together with them.", context: "The blessed hope and triumphant gathering of the saints." },
      { ref: "Revelation 20:4-6", text: "And they lived and reigned with Christ a thousand years... on such the second death hath no power.", context: "The literal Millennial Reign of Christ upon the earth." },
      { ref: "Revelation 21:1-4", text: "And I saw a new heaven and a new earth... And God shall wipe away all tears from their eyes; and there shall be no more death, neither sorrow, nor crying.", context: "The eternal state of unbroken communion, joy, and peace in the New Jerusalem." }
    ],
    doctrinalPillars: [
      { title: "The Bodily & Visible Second Coming", explanation: "Jesus Christ will return personally and visibly in glory as King of Kings and Lord of Lords.", scripture: "Revelation 19:11-16, Matthew 24:30" },
      { title: "Resurrection & Glorification", explanation: "Believers will receive glorified, immortal bodies fashion like unto Christ's glorious body.", scripture: "Philippians 3:20-21, 1 Corinthians 15:51-54" },
      { title: "The Millennial Reign & Final Judgment", explanation: "Christ will reign on earth for 1,000 years of righteousness, followed by the final judgment of all wickedness.", scripture: "Isaiah 11:1-9, Revelation 20:11-15" },
      { title: "The New Heavens & New Earth", explanation: "God will dwell forever with His redeemed people in spotless righteousness, perfect joy, and eternal worship.", scripture: "Revelation 21-22" }
    ],
    practicalApplication: [
      "Live with eternity in view: Purify yourself in anticipation of seeing Christ face to face (1 John 3:2-3).",
      "Do not grow weary in trials: Remember that present afflictions are working a far more exceeding and eternal weight of glory.",
      "Proclaim the Gospel urgently: Every person will face eternity in either heaven or hell; share Christ with boldness."
    ],
    historicalAndConfessionalBasis: "Affirmed in the Nicene Creed ('He shall come again with glory to judge both the quick and the dead'), the Apostles' Creed, and the historic hope of all Christian saints.",
    guidedReflection: "Even so, come, Lord Jesus! My heart longs for Your glorious appearing. Keep me watchful, holy, and faithful until that glorious day when every knee shall bow and every tongue confess that Jesus Christ is Lord."
  },
  {
    id: "art-prayer-fasting-faith-1",
    categoryId: "prayer-fasting-faith",
    categoryTitle: "Prayer, Fasting & Victorious Faith",
    title: "Prevailing Intercession, Spiritual Fasting & Mountain-Moving Faith",
    subtitle: "Cultivating Intimacy with God, Breaking Demonic Strongholds, and Operating in Unshakeable Faith",
    theologicalOverview: "Prayer is the vital breath of the regenerate soul—an ongoing communion of worship, petition, and spiritual warfare with the living God. Fasting is a biblical discipline ordained to humble the flesh, intensify spiritual alertness, and release breakthroughs in difficult seasons. Biblical faith is not positive thinking or emotional optimism, but a supernatural confidence in the veracity of God's Word that acts with unwavering expectation.",
    keyScriptures: [
      { ref: "Hebrews 11:1,6", text: "Now faith is the substance of things hoped for, the evidence of things not seen... But without faith it is impossible to please him: for he that cometh to God must believe that he is, and that he is a rewarder of them that diligently seek him.", context: "The divine definition of faith and the prerequisite for communion with God." },
      { ref: "Matthew 6:6,17-18", text: "When thou prayest, enter into thy closet... But thou, when thou fastest, anoint thine head, and wash thy face; That thou appear not unto men to fast, but unto thy Father which is in secret.", context: "Jesus teaching the private, authentic posture of kingdom spiritual disciplines." },
      { ref: "James 5:16", text: "The effectual fervent prayer of a righteous man availeth much.", context: "The dynamic power of passionate, aligned righteous prayer." },
      { ref: "Mark 11:23-24", text: "Whosoever shall say unto this mountain, Be thou removed... he shall have whatsoever he saith.", context: "The authority of authoritative faith spoken in agreement with God's will." }
    ],
    doctrinalPillars: [
      { title: "Intimacy & Priesthood in Prayer", explanation: "Believers approach the throne of grace boldly as royal priests through the blood of Jesus.", scripture: "Hebrews 4:16, 1 Peter 2:9" },
      { title: "Biblical Fasting for Breakthrough", explanation: "Fasting crucifies carnal appetites, aligns spiritual desires, and unleashes power against entrenched spiritual resistance.", scripture: "Isaiah 58:6, Matthew 17:21" },
      { title: "Unshakeable Word-Based Faith", explanation: "True faith comes by hearing the Word of God and refuses to waver in the face of contrary circumstances.", scripture: "Romans 10:17, James 1:6-7" }
    ],
    practicalApplication: [
      "Establish a daily secret place of prayer: Set aside consecrated morning and evening time for undistracted fellowship with the Father.",
      "Incorporate regular fasting: Dedicate specific days to abstain from food and saturate your spirit in scripture and worship.",
      "Speak the promises of God aloud: When faced with sickness, fear, or financial pressure, declare what God has written."
    ],
    historicalAndConfessionalBasis: "Practiced continuously throughout church history from the Apostolic Fathers, desert monastic fathers, the Reformers, and modern revival movements.",
    guidedReflection: "Father in heaven, ignite my heart with the spirit of grace and supplication. Teach my hands to war and my fingers to fight in prayer. Increase my faith to move every mountain standing against Your purpose in my life."
  },
  {
    id: "art-spiritual-warfare-healing-1",
    categoryId: "spiritual-warfare-healing",
    categoryTitle: "Spiritual Warfare, Divine Authority & Divine Healing",
    title: "Angelic Ministry, Spiritual Authority over Darkness & Divine Healing in the Atonement",
    subtitle: "Wielding the Whole Armor of God, Exercising Christ's Authority, and Ministering Miraculous Healing",
    theologicalOverview: "Believers live in a supernatural cosmos where the unseen realm actively impacts the visible world. Holy angels are ministering spirits sent by God to serve the heirs of salvation. Satan and fallen demonic principalities operate to deceive, afflict, and oppress humanity, but they were decisively disarmed and defeated at the Cross of Calvary. Believers are seated with Christ in heavenly places and authorized to tread upon serpents and scorpions. Furthermore, divine healing was purchased and secured in the substitutionary Atonement of Jesus Christ ('with his stripes we are healed'), and is imparted today through the prayer of faith, the laying on of hands, and the power of the Holy Spirit.",
    keyScriptures: [
      { ref: "Hebrews 1:14", text: "Are they not all ministering spirits, sent forth to minister for them who shall be heirs of salvation?", context: "The active ministry and protection of holy angels for God's redeemed people." },
      { ref: "Ephesians 6:10-12", text: "Finally, my brethren, be strong in the Lord, and in the power of his might. Put on the whole armour of God, that ye may be able to stand against the wiles of the devil. For we wrestle not against flesh and blood, but against principalities, against powers, against the rulers of the darkness of this world, against spiritual wickedness in high places.", context: "The spiritual nature of our wrestling and the imperative of putting on divine armor." },
      { ref: "Isaiah 53:4-5", text: "Surely he hath borne our griefs, and carried our sorrows: yet we did esteem him stricken, smitten of God, and afflicted. But he was wounded for our transgressions, he was bruised for our iniquities: the chastisement of our peace was upon him; and with his stripes we are healed.", context: "The prophetic bedrock revealing that physical healing was purchased in the Atonement." },
      { ref: "James 5:14-15", text: "Is any sick among you? let him call for the elders of the church; and let them pray over him, anointing him with oil in the name of the Lord: And the prayer of faith shall save the sick, and the Lord shall raise him up; and if he have committed sins, they shall be forgiven him.", context: "The ongoing ordinance and ministry of healing in the local church." },
      { ref: "Luke 10:19", text: "Behold, I give unto you power to tread on serpents and scorpions, and over all the power of the enemy: and nothing shall by any means hurt you.", context: "Christ delegating supernatural authority over demonic forces to His disciples." }
    ],
    doctrinalPillars: [
      { title: "Ministering Angels of God", explanation: "God dispatches holy angels to protect, guide, deliver, and strengthen His people according to His sovereign command.", scripture: "Psalm 91:11-12, Hebrews 1:14" },
      { title: "Satan's Defeat & The Believer's Authority", explanation: "Christ spoiled principalities and made a public spectacle of them; believers enforce this victory in Jesus' Name.", scripture: "Colossians 2:15, Mark 16:17" },
      { title: "The Full Armor of God", explanation: "Daily girding ourselves with Truth, Righteousness, the Gospel of Peace, Faith, Salvation, and the Sword of the Spirit.", scripture: "Ephesians 6:13-18" },
      { title: "Divine Healing in the Atonement", explanation: "Christ took our infirmities and bore our sicknesses; healing is a covenant right received through believing prayer.", scripture: "Matthew 8:16-17, 1 Peter 2:24" }
    ],
    practicalApplication: [
      "Put on the armor of God every morning: Consciously dress your soul with truth, righteousness, faith, and the Word of God.",
      "Exercise spiritual authority over sickness and demonic oppression: Rebuke fear, depression, and infirmity directly in the Name of Jesus.",
      "Pray the prayer of faith over the sick: Lay hands on the afflicted, anoint with oil, and expect God's healing virtue to flow.",
      "Rest in angelic guardianship: Do not fear demonic threats, knowing those that are with us are greater than those in the world."
    ],
    historicalAndConfessionalBasis: "Rooted in the Apostolic Gospel ministry of Jesus and the Apostles, the historic testimony of the Early Church Fathers, and the global Pentecostal/Charismatic healing revival movements.",
    guidedReflection: "Lord Jesus, I praise You for Your decisive triumph over Satan and all the powers of darkness on Calvary. You were wounded for my transgressions and by Your stripes I am healed! I put on the whole armor of God, take up the shield of faith and the sword of the Spirit, and step forth in Your supernatural authority and love."
  },
  {
    id: "art-holy-matrimony-family-1",
    categoryId: "holy-matrimony-family-life",
    categoryTitle: "Holy Matrimony, Family, Life & Christian Responsibility",
    title: "The Sacred Covenant of Marriage, Sanctity of Human Life & Kingdom Citizenship",
    subtitle: "Upholding God's Design for Marriage, Defending the Unborn, and Living as Salt and Light in Society",
    theologicalOverview: "Marriage is a sacred, divine institution established by God at Creation as an exclusive, lifelong covenant union between one biological man and one biological woman. It represents the profound mystery of Christ's love for His Church. Human life at every stage—from fertilization/conception to natural death—is sacred and inviolable, created in the image of God (Imago Dei). Furthermore, civil government is an ordinance of God designed to maintain public order and justice, and believers are called to be prayerful, law-abiding citizens who practice social righteousness and shine as moral lights in the world.",
    keyScriptures: [
      { ref: "Genesis 2:24", text: "Therefore shall a man leave his father and his mother, and shall cleave unto his wife: and they shall be one flesh.", context: "The creation ordinance establishing heterosexual monogamous marriage as God's eternal pattern." },
      { ref: "Matthew 19:4-6", text: "And he answered and said unto them, Have ye not read, that he which made them at the beginning made them male and female, And said, For this cause shall a man leave father and mother, and shall cleave to his wife: and they twain shall be one flesh? Wherefore they are no more twain, but one flesh. What therefore God hath joined together, let not man put asunder.", context: "Jesus affirming the permanence and divine origin of marriage." },
      { ref: "Psalm 139:13-16", text: "For thou hast possessed my reins: thou hast covered me in my mother's womb. I will praise thee; for I am fearfully and wonderfully made... Thine eyes did see my substance, yet being unperfect; and in thy book all my members were written.", context: "David's revelation of God's sovereign intimacy and purpose in prenatal life." },
      { ref: "Romans 13:1-4", text: "Let every soul be subject unto the higher powers. For there is no power but of God: the powers that be are ordained of God... For he is the minister of God to thee for good.", context: "Paul outlining the Christian's civic duty and the divine mandate for civil order." }
    ],
    doctrinalPillars: [
      { title: "Holy Matrimony as Covenant", explanation: "A lifelong, holy covenant between one man and one woman reflecting Christ and His Bride.", scripture: "Ephesians 5:22-33, Malachi 2:14-15" },
      { title: "Sanctity of Human Life (Imago Dei)", explanation: "Human life begins at conception and carries divine dignity; abortion, euthanasia, and unjust taking of life are forbidden.", scripture: "Jeremiah 1:5, Exodus 20:13" },
      { title: "Family & Nurture in the Lord", explanation: "Parents are tasked by God with the discipleship, instruction, and loving nurture of children.", scripture: "Deuteronomy 6:6-7, Ephesians 6:4" },
      { title: "Civil Government & Social Responsibility", explanation: "Believers pray for leaders, pay taxes, uphold righteousness, and minister compassion to the poor and vulnerable.", scripture: "1 Timothy 2:1-3, Micah 6:8" }
    ],
    practicalApplication: [
      "Guard the sanctity of your marriage: Cultivate fidelity, selfless love, mutual honor, and forgiveness daily.",
      "Champion and protect the vulnerable: Defend the unborn, care for orphans and widows, and stand for human dignity.",
      "Pray faithfully for governing authorities: Intercede for national leaders, magistrates, and peace in society.",
      "Live as ethical witnesses: Conduct your business, career, and daily interactions with spotless Christian integrity."
    ],
    historicalAndConfessionalBasis: "Unbroken orthodox Christian consensus across two millennia, rooted in Genesis creation ordinances and apostolic epistles.",
    guidedReflection: "Lord God Creator, thank You for the sacred gift of life and the divine covenant of marriage. Bless our families and homes. Give us courage to stand for life and truth in our culture, and use our lives to bring justice, compassion, and the light of Christ to a broken world."
  },
  {
    id: "art-mission-repentance-destiny-1",
    categoryId: "mission-repentance-destiny",
    categoryTitle: "The Mission, Repentance & Eternal Destiny",
    title: "The Great Commission, The Fruit of True Repentance & The Intermediate State",
    subtitle: "Global Evangelism, Restitution, the Priesthood of All Believers, and Conscious Life After Death",
    theologicalOverview: "The supreme mission of the Lord Jesus Christ to His Church is the Great Commission: proclaiming the Gospel to all nations, baptizing disciples, and teaching them to observe all His commands. Genuine conversion is evidenced by biblical repentance—a deep, godly sorrow that renounces sin, turns wholeheartedly to God, and seeks to make restitution where wrong has been done. Furthermore, Scripture teaches the conscious existence of the soul after physical death: the righteous depart to be immediately with Christ in paradise and joy, while the unregenerate await final judgment.",
    keyScriptures: [
      { ref: "Matthew 28:19-20", text: "Go ye therefore, and teach all nations, baptizing them in the name of the Father, and of the Son, and of the Holy Ghost: Teaching them to observe all things whatsoever I have commanded you: and, lo, I am with you alway, even unto the end of the world. Amen.", context: "The supreme mandate and apostolic marching orders for the Church." },
      { ref: "Luke 19:8-9", text: "And Zacchaeus stood, and said unto the Lord; Behold, Lord, the half of my goods I give to the poor; and if I have taken any thing from any man by false accusation, I restore him fourfold. And Jesus said unto him, This day is salvation come to this house.", context: "The tangible fruit of true repentance demonstrated through practical restitution." },
      { ref: "Luke 23:43", text: "And Jesus said unto him, Verily I say unto thee, To day shalt thou be with me in paradise.", context: "Christ's promise of immediate conscious presence in paradise at physical death." },
      { ref: "2 Corinthians 5:8", text: "We are confident, I say, and willing rather to be absent from the body, and to be present with the Lord.", context: "Paul's assurance of instantaneous fellowship with Christ upon passing from this life." }
    ],
    doctrinalPillars: [
      { title: "The Great Commission Mandate", explanation: "Evangelism and disciple-making are the non-negotiable priority of every Christian believer.", scripture: "Mark 16:15, Acts 1:8" },
      { title: "True Repentance & Practical Restitution", explanation: "Repentance involves an internal change of mind that bears outward fruit in righteousness and restitution.", scripture: "2 Corinthians 7:10, Acts 26:20" },
      { title: "Priesthood of All Believers", explanation: "Every born-again believer has direct access to God and is called to minister His reconciliation in the world.", scripture: "1 Peter 2:5,9, Revelation 1:6" },
      { title: "The Intermediate State & Eternal Destiny", explanation: "Conscious existence continues after death; the believer goes immediately to be with the Lord in bliss, awaiting resurrection.", scripture: "Philippians 1:21-23, Luke 16:19-31" }
    ],
    practicalApplication: [
      "Share your testimony and the Gospel weekly: Be an active ambassador for Christ in your workplace, neighborhood, and family.",
      "Practice swift repentance and restitution: If you have defrauded or wronged anyone, apologize sincerely and make amends where possible.",
      "Live with eternity in your eyes: Remember that this life is a vapor; invest your time, talents, and treasures into what will last forever."
    ],
    historicalAndConfessionalBasis: "Rooted in apostolic preaching in the Book of Acts, the Reformation principle of the Priesthood of all Believers, and historic orthodox eschatology.",
    guidedReflection: "Lord Jesus, make me a passionate, unashamed witness of Your Gospel. Purify my heart with true repentance and integrity. Fill me with urgent compassion for dying souls, and keep my gaze fixed on the glorious eternal prize awaiting me in Your presence."
  },
  {
    id: "art-joy-of-the-lord-1",
    categoryId: "joy-of-the-lord",
    categoryTitle: "The Joy of the Lord & Victorious Living",
    title: "The Fortress of Divine Joy, Overcoming Despair & Walking in Daily Victory",
    subtitle: "How Supernatural Joy Serves as an Impenetrable Shield and Fountain of Spiritual Power",
    theologicalOverview: "The Joy of the Lord is not fleeting emotional happiness dependent on favorable circumstances; it is an unshakeable, supernatural fortress anchored in the unchanging love, grace, and victory of Jesus Christ. As Nehemiah proclaimed, 'The joy of the Lord is your strength' (Nehemiah 8:10). Joy operates as a mighty spiritual weapon that breaks depression, dismantles demonic gloom, and fuels enduring victory in the midst of fiery trials.",
    keyScriptures: [
      { ref: "Nehemiah 8:10", text: "The joy of the Lord is your strength.", context: "God's people exhorted to feast and rejoice in the covenant goodness of God." },
      { ref: "Romans 8:37", text: "Nay, in all these things we are more than conquerors through him that loved us.", context: "The unstoppable triumphant position of believers in Christ." },
      { ref: "Psalm 16:11", text: "Thou wilt shew me the path of life: in thy presence is fulness of joy; at thy right hand there are pleasures for evermore.", context: "David discovering the source of inexhaustible divine joy in God's presence." },
      { ref: "Philippians 4:4", text: "Rejoice in the Lord alway: and again I say, Rejoice.", context: "Paul's apostolic command to maintain continuous spiritual rejoicing regardless of chains or trials." }
    ],
    doctrinalPillars: [
      { title: "Joy as a Supernatural Fruit", explanation: "Joy is generated by the Holy Spirit within the abiding believer, unaffected by outer storms.", scripture: "Galatians 5:22, John 15:11" },
      { title: "Joy as Spiritual Warfare", explanation: "Praising and rejoicing in trials confuses the enemy and releases God's supernatural deliverance.", scripture: "2 Chronicles 20:21-22, Acts 16:25-26" },
      { title: "More Than Conquerors", explanation: "Believers live from victory, not for victory, knowing nothing can separate us from Christ's love.", scripture: "Romans 8:35-39" }
    ],
    practicalApplication: [
      "Begin every day with thanksgiving and praise: Enter His gates with thanksgiving before bringing any petitions.",
      "Refuse to let circumstances dictate your worship: Sing and praise the Lord especially when facing adversity.",
      "Spread kingdom joy to others: Encourage the downcast, share words of hope, and radiate Christ's gladness."
    ],
    historicalAndConfessionalBasis: "Celebrated in the psalms of David, the early Christian martyrs' hymns in Roman arenas, and the joyous testimonies of the saints throughout all ages.",
    guidedReflection: "Heavenly Father, I praise You that in Your presence is fullness of joy. I cast off all spirit of heaviness and put on the garment of praise. Your joy is my strength, my shield, and my song today and forevermore. Amen!"
  }
];
