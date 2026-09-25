// Script to synthesize 200 rich, distinct 5-page Christian Library messages
const fs = require('fs');
const path = require('path');

const SERIES_DEFINITIONS = [
  {
    category: "Christian Devotion & Spiritual Warfare",
    author: "Biblical Theological Institute",
    badge: "Spiritual Classic",
    color: "from-amber-900 via-stone-900 to-amber-950",
    topics: [
      {
        title: "The Joy of the Lord is Our Strength",
        ref: "Nehemiah 8:10",
        quote: "Neither be ye sorry; for the joy of the Lord is your strength.",
        langInsight: "Hebrew 'Maoz' denotes a rock fortress, high stronghold, or impenetrable defensive cliff.",
        themeKey: "Joy as divine fortification and emotional warfare weapon.",
        christRel: "In Christ, divine joy is not dependent on circumstantial ease, but on the unshakeable certainty of His resurrection and eternal covenant.",
        warfare: "When Satan launches depression, fatigue, and heaviness, deliberate praise breaks the demonic dampener.",
        prayer: "Lord Jesus, let Your supernatural joy flood my heart today. I decree that the joy of the Lord is my impenetrable fortress against every weapon of the enemy."
      },
      {
        title: "The Maoz of Zion: High Tower of Praise",
        ref: "Psalm 28:7",
        quote: "The Lord is my strength and my shield; my heart trusted in him, and I am helped: therefore my heart greatly rejoiceth; and with my song will I praise him.",
        langInsight: "Hebrew 'Magen' (shield) and 'Maoz' (fortress) work together to express total protective encirclement.",
        themeKey: "The dual dynamic of trust in the heart and vocal praise upon the lips.",
        christRel: "Christ is our ultimate shield and rock of defense against the accuser of the brethren.",
        warfare: "Singing aloud in trials scrambles demonic coordination and establishes the dominion of heaven.",
        prayer: "Heavenly Father, I take refuge in Your high tower today. My tongue shall celebrate Your faithfulness from morning until the evening shadows lengthen."
      },
      {
        title: "The Midnight Earthquake: Praise Under Chains",
        ref: "Acts 16:25-26",
        quote: "And at midnight Paul and Silas prayed, and sang praises unto God: and the prisoners heard them. And suddenly there was a great earthquake...",
        langInsight: "Greek 'hymnoun ton theon' means chanting sacred anthems of victory amidst bleeding stocks.",
        themeKey: "The midnight hour represents maximum constraint, yet faith sings loudest when chains are heaviest.",
        christRel: "The Cross was the ultimate midnight battle where Christ disarmed principalities through triumphant surrender.",
        warfare: "Midnight intercession and thanksgiving generate seismic spiritual shockwaves that loose every prisoner's bands.",
        prayer: "Lord God of Paul and Silas, shake loose every chain binding my mind, my family, and my destiny as I offer sacrificial praise in the midnight watch."
      },
      {
        title: "The Oil of Gladness Above Thy Fellows",
        ref: "Psalm 45:7",
        quote: "Thou lovest righteousness, and hatest wickedness: therefore God, thy God, hath anointed thee with the oil of gladness above thy fellows.",
        langInsight: "Hebrew 'Shemen Sasson' signifies festive consecration oil poured out for royal enthronement.",
        themeKey: "Supernatural gladness is an anointing that accompanies deep hatred of sin and fierce love for righteousness.",
        christRel: "Jesus is the supreme Anointed One whose heart carried holy gladness even in the midst of worldly contradiction.",
        warfare: "The spirit of heaviness cannot abide where the oil of divine gladness is continually poured out.",
        prayer: "Lord, pour upon my spirit the oil of gladness. Deliver me from the sourness of religious pride and let joy characterize my daily walk."
      },
      {
        title: "Rejoice in the Lord Alway: The Apostolic Commandment",
        ref: "Philippians 4:4",
        quote: "Rejoice in the Lord alway: and again I say, Rejoice.",
        langInsight: "Greek imperative 'Chairete' denotes an active, continuous, non-negotiable spiritual discipline.",
        themeKey: "Paul writes this from a Roman dungeon, demonstrating that Christian rejoicing is a choice of covenant will.",
        christRel: "Because Christ lives and His kingdom cannot be moved, the grounds for our rejoicing are permanent.",
        warfare: "Complaining invites the devourer; rejoicing commands the peace of God which passeth all understanding.",
        prayer: "Holy Spirit, teach my emotions to yield to the command of faith. I decide to rejoice in the Lord this day and every day."
      },
      {
        title: "The Perpetual Feast: Habitual Thanksgiving",
        ref: "1 Thessalonians 5:16-18",
        quote: "Rejoice evermore. Pray without ceasing. In every thing give thanks: for this is the will of God in Christ Jesus concerning you.",
        langInsight: "Greek 'Eucharisteite' is rooted in 'charis' (grace), showing that thanksgiving flows from beholding grace.",
        themeKey: "Thanksgiving is not an emotional reaction to good news, but a spiritual stance anchored in God's will.",
        christRel: "In Christ, every trial is subordinated to God's eternal redemptive purpose.",
        warfare: "Giving thanks in adversity disarms resentment and locks the soul into the fortress of divine favor.",
        prayer: "Father, I offer You the sacrifice of thanksgiving in all circumstances, knowing Your good and perfect will governs my life."
      },
      {
        title: "Joy Unspeakable and Full of Glory",
        ref: "1 Peter 1:8",
        quote: "Whom having not seen, ye love; in whom, though now ye see him not, yet believing, ye rejoice with joy unspeakable and full of glory.",
        langInsight: "Greek 'aneklaletos' means that which transcends human vocabulary and mortal eloquence.",
        themeKey: "The mystery of loving the invisible Christ and experiencing celestial delight in the inner man.",
        christRel: "Our resurrected Lord imparts His own heavenly joy to the believer through the indwelling Spirit.",
        warfare: "Unspeakable joy silences the lying murmurs of the enemy and sustains the heart through fiery trials.",
        prayer: "Precious Savior, let the joy of heaven overwhelm my natural worries. I rejoice in Your glorious presence today."
      },
      {
        title: "The Gladness of Heart in the Day of Espousals",
        ref: "Song of Solomon 3:11",
        quote: "Go forth, O ye daughters of Zion, and behold king Solomon with the crown wherewith his mother crowned him in the day of his espousals...",
        langInsight: "Hebrew 'Simchat Libbo' expresses ecstatic bridal union and royal celebration.",
        themeKey: "The Church as the Bride of Christ entering into intimate covenant joy with her Bridegroom.",
        christRel: "Jesus rejoices over His redeemed bride with singing and wipes away all remembrance of shame.",
        warfare: "The enemy seeks to make believers feel like rejected orphans; bridal identity silences every condemnation.",
        prayer: "Lord Jesus, my Bridegroom and King, awaken in my soul the radiant love and joy of covenant fellowship with You."
      },
      {
        title: "Wells of Salvation: Drawing Water with Gladness",
        ref: "Isaiah 12:3",
        quote: "Therefore with joy shall ye draw water out of the wells of salvation.",
        langInsight: "Hebrew 'Mayan' indicates an artesian spring that never runs dry regardless of surface droughts.",
        themeKey: "Joy is the bucket that draws living water out of the bottomless well of Christ's salvation.",
        christRel: "Christ is the Rock struck in the wilderness from which flows the river of eternal life.",
        warfare: "Unbelief refuses to lower the bucket; joyful faith draws continuously upon heaven's infinite reserves.",
        prayer: "O Lord, I dip the bucket of joyful praise into the wells of salvation and drink deeply of Your righteousness and peace."
      },
      {
        title: "The Garment of Praise for the Spirit of Heaviness",
        ref: "Isaiah 61:3",
        quote: "To give unto them beauty for ashes, the oil of joy for mourning, the garment of praise for the spirit of heaviness...",
        langInsight: "Hebrew 'Tehillah' (praise garment) replaces 'Ruach Kehah' (the smoking, suffocating spirit of despair).",
        themeKey: "Praise is a garment that must be intentionally put on, clothing the believer in spiritual majesty.",
        christRel: "At Calvary, Jesus was stripped of His garments that we might be clothed in robes of righteousness and praise.",
        warfare: "You do not negotiate with heaviness; you put off the spirit of mourning and put on vocal, triumphant praise.",
        prayer: "Father, I strip off every mantle of depression and anxiety, and I clothe myself in the radiant garment of praise."
      },
      {
        title: "Count It All Joy: The Crucible of Faith",
        ref: "James 1:2-4",
        quote: "My brethren, count it all joy when ye fall into divers temptations; Knowing this, that the trying of your faith worketh patience.",
        langInsight: "Greek 'hegesasthe' is an accounting term: calculate the trial as pure divine profit.",
        themeKey: "Trials are heavenly workshops forging indestructible patience and spiritual maturity.",
        christRel: "Christ endured the contradiction of sinners for the joy that was set before Him.",
        warfare: "When the adversary brings pressure to break you, joy in the fire turns the weapon back upon his kingdom.",
        prayer: "Lord, grant me spiritual discernment to count trials as stepping stones to greater authority and patience in Christ."
      },
      {
        title: "The Laughter of the Righteous: Captivity Turned",
        ref: "Psalm 126:1-3",
        quote: "When the Lord turned again the captivity of Zion, we were like them that dream. Then was our mouth filled with laughter...",
        langInsight: "Hebrew 'Schoq' signifies holy celebration that confounds surrounding heathen nations.",
        themeKey: "The suddenness and majesty of divine restoration that overturns years of sorrow in a single hour.",
        christRel: "Christ's resurrection is the supreme reversal that turned humanity's captivity into immortal triumph.",
        warfare: "Holy laughter mocks the power of darkness and declares the total supremacy of God's redemptive decree.",
        prayer: "Almighty God, turn my captivity like streams in the south, and fill my mouth with joyful laughter and holy singing."
      },
      {
        title: "Everlasting Joy Upon Their Heads: The Ransom Return",
        ref: "Isaiah 35:10",
        quote: "And the ransomed of the Lord shall return, and come to Zion with songs and everlasting joy upon their heads...",
        langInsight: "Hebrew 'Simchat Olam' speaks of age-abiding, unending gladness that crowns the redeemed.",
        themeKey: "The journey of the believer is not toward despair, but toward the eternal city of God with crowning joy.",
        christRel: "Christ is our Redeemer who paid the ransom price with His own precious blood.",
        warfare: "Sorrow and sighing flee away when the redeemed march under the banner of Christ's triumph.",
        prayer: "Lord Jesus, I march forward on the Highway of Holiness with everlasting joy crowning my thoughts and actions."
      },
      {
        title: "The Joy Set Before Him: Enduring the Cross",
        ref: "Hebrews 12:2",
        quote: "Looking unto Jesus the author and finisher of our faith; who for the joy that was set before him endured the cross...",
        langInsight: "Greek 'antikeimenes' indicates a joy lying directly ahead as the prize of obedience.",
        themeKey: "Jesus looked past the shame and agony of Golgotha to behold the millions of sons and daughters He would bring to glory.",
        christRel: "Christ is both the pioneer who blazed the trail of faith and the consummator who leads us safely home.",
        warfare: "Perspective wins the battle; looking ahead to eternal glory drains temporal suffering of its paralyzing power.",
        prayer: "Lord, fix my eyes upon Jesus. Let the anticipated joy of seeing You face-to-face empower me to endure every present hardship."
      },
      {
        title: "Strength and Dignity: Rejoicing in Time to Come",
        ref: "Proverbs 31:25",
        quote: "Strength and honour are her clothing; and she shall rejoice in time to come.",
        langInsight: "Hebrew 'Tischaq leyom acharon' means laughing at the future without fear or dread.",
        themeKey: "A life built on covenant wisdom can look at tomorrow without dread, anxiety, or panic.",
        christRel: "In Christ, our future is secure, for He is already standing in all our tomorrows.",
        warfare: "Anxiety about the future is a demonic trap; holy confidence in God's providence laughs at economic chaos.",
        prayer: "Father, clothe me with strength and honor. I banish fear of tomorrow and rejoice in Your faithful covenant care."
      },
      {
        title: "The Shout of a King in the Camp",
        ref: "Numbers 23:21",
        quote: "He hath not beheld iniquity in Jacob, neither hath he seen perverseness in Israel: the Lord his God is with him, and the shout of a king is among them.",
        langInsight: "Hebrew 'Teruat Melech' is the royal war shout of the triumphant Sovereign dwelling among His people.",
        themeKey: "Balaam's curses could not land because the presence of the King produced an atmosphere of holy victory.",
        christRel: "Christ our King dwells within us, rendering every demonic enchantment powerless.",
        warfare: "The royal shout of faith breaks witchcraft, hexes, and ancestral curses off the covenant people.",
        prayer: "Lord God Almighty, let the shout of the King resound in my home. Cancel every curse and let Your victory reign."
      },
      {
        title: "The Kingdom of God: Righteousness, Peace, and Joy",
        ref: "Romans 14:17",
        quote: "For the kingdom of God is not meat and drink; but righteousness, and peace, and joy in the Holy Ghost.",
        langInsight: "Greek 'chara en pneumati hagio' defines joy as the direct atmosphere and breathing environment of the Spirit.",
        themeKey: "The Kingdom is not external ceremonial observance, but internal divine government.",
        christRel: "Christ inaugurated this Kingdom by His life, death, resurrection, and the sending of the Holy Ghost.",
        warfare: "Religious legalism produces misery; the Spirit of God establishes joyful freedom and moral strength.",
        prayer: "Holy Spirit, govern my thoughts and desires today with the holy triad of Your Kingdom: righteousness, peace, and joy."
      },
      {
        title: "A Cheerful Heart Doth Good Like a Medicine",
        ref: "Proverbs 17:22",
        quote: "A merry heart doeth good like a medicine: but a broken spirit drieth the bones.",
        langInsight: "Hebrew 'Gehah' means healing, bodily restoration, and cellular rejuvenation.",
        themeKey: "Spiritual gladness has tangible physiological and emotional healing properties designed by the Creator.",
        christRel: "Jesus is the Great Physician who heals the brokenhearted and binds up their painful wounds.",
        warfare: "Bitterness and grief dry the bones and invite infirmity; cheerful faith releases life into mortal flesh.",
        prayer: "Lord Jesus, heal my spirit of all sorrow. Let the medicine of Your holy gladness bring vitality to my body and mind."
      },
      {
        title: "The Vineyard of Red Wine: Sing Ye Unto Her",
        ref: "Isaiah 27:2-3",
        quote: "In that day sing ye unto her, A vineyard of red wine. I the Lord do keep it; I will water it every moment: lest any hurt it, I will keep it night and day.",
        langInsight: "Hebrew 'Notserah' means guarding with vigilant sentinel eyes every second of the night and day.",
        themeKey: "The Father's unbroken surveillance over His children produces deep, unshakable serenity.",
        christRel: "Christ is the True Vine and we are the branches, nourished by His constant heavenly life.",
        warfare: "The enemy cannot breach what God waters and keeps every moment; fearful fretfulness is utterly unwarranted.",
        prayer: "Father, I rest in Your relentless keeping. Water my soul this hour and protect me from all hidden snares."
      },
      {
        title: "Fulness of Joy in the Divine Presence",
        ref: "Psalm 16:11",
        quote: "Thou wilt shew me the path of life: in thy presence is fulness of joy; at thy right hand there are pleasures for evermore.",
        langInsight: "Hebrew 'Sova Semachot' denotes satisfaction to the brim, where no vacancy or craving remains.",
        themeKey: "The ultimate pursuit of human existence is found in the unhindered face-to-face presence of God.",
        christRel: "Through Jesus' rent flesh, the veil is torn and we dwell in the Holy of Holies forever.",
        warfare: "Idolatry promises cheap pleasures that leave venom; God's presence satisfies the deepest longing of the soul.",
        prayer: "O Lord, guide me along the path of life. In Your presence I find my rest, my fullness of joy, and my eternal reward."
      }
    ]
  },
  {
    category: "Systematic Theology & Sound Doctrine",
    author: "Historical Reformation Society",
    badge: "Doctrinal Pillar",
    color: "from-blue-950 via-slate-900 to-indigo-950",
    topics: [
      {
        title: "The Way of Sovereign Grace and Justification",
        ref: "Romans 3:23-26",
        quote: "Being justified freely by his grace through the redemption that is in Christ Jesus...",
        langInsight: "Greek 'dikaioo' is a forensic verdict: declared legally righteous by the Supreme Judge.",
        themeKey: "Justification is not infused moral improvement, but the legal imputation of Christ's perfect righteousness.",
        christRel: "Christ's active obedience and passive suffering form the sole foundation of our acceptance before God.",
        warfare: "Satan is the prosecutor; the forensic decree of God silences every demonic accusation.",
        prayer: "Sovereign Father, I stand before You clothed entirely in the righteousness of Jesus Christ, forgiven and justified."
      },
      {
        title: "The Blood of the Everlasting Covenant",
        ref: "Hebrews 13:20-21",
        quote: "Now the God of peace, that brought again from the dead our Lord Jesus... through the blood of the everlasting covenant...",
        langInsight: "Greek 'Diatheke Aionios' describes an eternal testament ratified between Father and Son.",
        themeKey: "The covenant of grace cannot fail because its guarantors are the eternal Godhead and Christ's shed blood.",
        christRel: "Jesus is the Mediator and Surety of a better covenant established upon better promises.",
        warfare: "The blood speaks better things than the blood of Abel, crying for mercy and total victory over darkness.",
        prayer: "Lord Jesus, I plead Your everlasting covenant blood over my conscience, my calling, and my eternal future."
      },
      {
        title: "The Great Exchange: Imputed Righteousness",
        ref: "2 Corinthians 5:21",
        quote: "For he hath made him to be sin for us, who knew no sin; that we might be made the righteousness of God in him.",
        langInsight: "Greek 'hamartian epoiesen' shows sin placed upon Christ so righteousness is imputed to us.",
        themeKey: "The double imputation of the gospel: our sin credited to Christ, His flawless obedience credited to us.",
        christRel: "The sinless Lamb willingly suffered the wrath due to our rebellion, making us sons of God.",
        warfare: "The devil tries to define you by your past failures; the Great Exchange defines you by Christ's perfection.",
        prayer: "Blessed Savior, I marvel at Your substitutionary sacrifice. Thank You for taking my shame and giving me Your glory."
      },
      {
        title: "Crucified with Christ: The Exchanged Life",
        ref: "Galatians 2:20",
        quote: "I am crucified with Christ: nevertheless I live; yet not I, but Christ liveth in me...",
        langInsight: "Greek 'synestauromai' is in the perfect tense: a completed historical union with ongoing effects.",
        themeKey: "The old man died at Calvary; true Christian living is Christ animating the believer from within.",
        christRel: "The Christian life is not imitation of Jesus, but the manifestation of the resurrected Jesus in mortal flesh.",
        warfare: "Dead men cannot be offended, seduced, or intimidated; resting in your crucifixion with Christ defeats sin.",
        prayer: "Lord Jesus, I yield my faculties to Your lordship. Live Your life, speak Your words, and love through me today."
      },
      {
        title: "The Scapegoat of Azazel: Bearing Iniquities Away",
        ref: "Leviticus 16:21-22",
        quote: "And Aaron shall lay both his hands upon the head of the live goat, and confess over him all the iniquities...",
        langInsight: "Hebrew 'Azazel' signifies complete removal to an uninhabited wilderness where sin can never be found.",
        themeKey: "The Day of Atonement reveals both expiation (blotting out) and removal of sin far away from God's sight.",
        christRel: "Christ bore our sins outside the city gate, carrying them into the wilderness of forgetfulness.",
        warfare: "When the enemy digs up old sins, remind him that Christ carried them into oblivion and remembers them no more.",
        prayer: "Father, thank You that my sins have been removed as far as the east is from the west by the blood of Christ."
      },
      {
        title: "The Pierced Savior: The Sufficiency of Isaiah 53",
        ref: "Isaiah 53:4-6",
        quote: "Surely he hath borne our griefs, and carried our sorrows... he was bruised for our iniquities...",
        langInsight: "Hebrew 'Chaburah' signifies the bloody welts and stripes that purchase total restoration.",
        themeKey: "The golden chapter of prophecy detailing the substitutionary atonement seven hundred years before Calvary.",
        christRel: "Jesus fulfilled every line of Isaiah 53, satisfying divine justice on behalf of all who believe.",
        warfare: "The claims of sickness, guilt, and condemnation were broken at the whipping post and on the Cross.",
        prayer: "Lord Jesus, I worship You for bearing my chastisement that I might have peace, and for healing my wounded soul."
      },
      {
        title: "The Veil Rent in Twain: Holy Access",
        ref: "Hebrews 10:19-22",
        quote: "Having therefore, brethren, boldness to enter into the holiest by the blood of Jesus, By a new and living way...",
        langInsight: "Greek 'Parrhesia' denotes uninhibited freedom of speech and boldness before the Sovereign.",
        themeKey: "The four-inch thick temple veil tore from top to bottom, signifying heaven opening access to all believers.",
        christRel: "Christ's flesh is the veil through which we step directly into the immediate presence of the Almighty.",
        warfare: "Fear of approaching God is banished; we enter the throne of grace with holy confidence to obtain mercy.",
        prayer: "Abba Father, I enter the Holy of Holies through the blood of Jesus, to commune with You in spirit and in truth."
      },
      {
        title: "Tetelestai: The Finished Work of the Cross",
        ref: "John 19:30",
        quote: "When Jesus therefore had received the vinegar, he said, It is finished: and he bowed his head, and gave up the ghost.",
        langInsight: "Greek 'Tetelestai' is stamped on ancient tax documents meaning 'paid in full; debt canceled forever.'",
        themeKey: "Nothing can be added to Christ's sacrifice; human religious efforts cannot enhance an already perfect salvation.",
        christRel: "The entire redemptive plan, prophesied from Genesis, reached its flawless climax on Calvary.",
        warfare: "When legalism whispers that you must pay for your acceptance, shout 'Tetelestai!'—the debt is canceled forever.",
        prayer: "Lord Jesus, I rest in Your finished work. I renounce all self-righteous striving and trust solely in Your cross."
      },
      {
        title: "Delivered from the Power of Darkness",
        ref: "Colossians 1:13-14",
        quote: "Who hath delivered us from the power of darkness, and hath translated us into the kingdom of his dear Son...",
        langInsight: "Greek 'methistemi' was used for relocating a conquered population into a kingdom of royal privilege.",
        themeKey: "Salvation is a radical change of jurisdiction: from satanic dominion into the Kingdom of the beloved Son.",
        christRel: "Christ broke the tyrant's grip and established us as citizens of heaven with royal privileges.",
        warfare: "Satan has zero legal authority over a translated believer; we operate under heaven's royal constitution.",
        prayer: "Father, thank You for transferring me into the Kingdom of Your dear Son. I walk in divine liberty and royal authority."
      },
      {
        title: "No Condemnation: Walking in the Spirit",
        ref: "Romans 8:1-4",
        quote: "There is therefore now no condemnation to them which are in Christ Jesus, who walk not after the flesh, but after the Spirit.",
        langInsight: "Greek 'katakrima' means the punitive sentence handed down by an offended magistrate.",
        themeKey: "Because the penalty fell upon Christ, there remains zero judicial condemnation for those in Him.",
        christRel: "Christ absorbed the curse of the broken law, liberating us to live by the law of the Spirit of life.",
        warfare: "Guilt and shame are satanic tools to paralyze service; the believer answers every accusation with Romans 8:1.",
        prayer: "Lord Jesus, I thank You that the gavel has fallen in heaven: I am justified, accepted, and free from condemnation."
      },
      {
        title: "The Lamb Slain from the Foundation of the World",
        ref: "Revelation 13:8",
        quote: "...the Lamb slain from the foundation of the world.",
        langInsight: "Greek 'esphagmenou' indicates a sacrificial slaughter planned in the eternal counsel before time began.",
        themeKey: "Redemption was not an emergency backup plan after Adam fell, but the eternal architecture of God's love.",
        christRel: "The Lamb is the central theme of cosmic history, worthy of all honor, dominion, and praise.",
        warfare: "No demonic rebellion can derail a plan established before the foundation of the cosmos.",
        prayer: "Eternal Father, I worship the Lamb who was slain. Your eternal wisdom surpasses all human understanding."
      },
      {
        title: "The Brazen Serpent: Look and Live",
        ref: "Numbers 21:8-9 / John 3:14-15",
        quote: "And as Moses lifted up the serpent in the wilderness, even so must the Son of man be lifted up...",
        langInsight: "The bronze serpent represented the curse judged in the likeness of that which brought death.",
        themeKey: "Salvation is received by a single look of faith toward the crucified Savior.",
        christRel: "Christ was made a curse for us upon the tree that the blessing of Abraham might come upon us.",
        warfare: "Do not gaze at the bites of the fiery serpents (sins and failures); fix your gaze upon the lifted Savior.",
        prayer: "Lord Jesus, I look to You alone for healing, deliverance, and eternal life. You are my only hope and salvation."
      },
      {
        title: "The Passover Blood upon the Lintel",
        ref: "Exodus 12:13",
        quote: "And the blood shall be to you for a token upon the houses where ye are: and when I see the blood, I will pass over you...",
        langInsight: "Hebrew 'Pasach' denotes fluttering over as a protective bird, shielding the inhabitants inside.",
        themeKey: "Safety is not found in the moral perfection of those inside the house, but in the applied blood on the doorposts.",
        christRel: "Christ our Passover is sacrificed for us (1 Cor 5:7); His blood is our impenetrable shield.",
        warfare: "The destroyer has no entrance where the blood of the Lamb is applied to heart and home.",
        prayer: "Lord God, I apply the precious blood of Jesus over my life, my family, and my possessions. No evil shall enter."
      },
      {
        title: "Redeemed from the Curse of the Law",
        ref: "Galatians 3:13-14",
        quote: "Christ hath redeemed us from the curse of the law, being made a curse for us...",
        langInsight: "Greek 'exegorasen' means purchasing a slave off the auction block to grant him permanent freedom.",
        themeKey: "Every curse listed in Deuteronomy 28—poverty, sickness, defeat, confusion—was broken at Calvary.",
        christRel: "Christ absorbed the curse that the blessing of Abraham might come upon the Gentiles through faith.",
        warfare: "Reject every generational curse and symptom of defeat; Christ paid the ransom in full.",
        prayer: "Father, I declare that I am redeemed from the curse of poverty, sickness, and spiritual death through Jesus Christ."
      },
      {
        title: "Reconciliation: The Ministry of Peace",
        ref: "2 Corinthians 5:18-19",
        quote: "God was in Christ, reconciling the world unto himself, not imputing their trespasses unto them...",
        langInsight: "Greek 'katallasso' means transforming mutual hostility into intimate friendship and fellowship.",
        themeKey: "The enmity between holy God and sinful humanity has been permanently abolished in Christ.",
        christRel: "Jesus is the Peacemaker whose cross dismantled the dividing wall between God and man.",
        warfare: "Satan stirs strife and alienates hearts; the ministry of reconciliation releases heaven's unity and power.",
        prayer: "Lord, make me an ambassador of reconciliation, proclaiming Your forgiveness and peace to a fractured world."
      },
      {
        title: "The High Priesthood of Melchizedek",
        ref: "Hebrews 7:24-27",
        quote: "Wherefore he is able also to save them to the uttermost that come unto God by him, seeing he ever liveth to make intercession for them.",
        langInsight: "Greek 'panteles' means completely, eternally, and to the uttermost boundary of time and space.",
        themeKey: "Unlike Aaronic priests who died, Christ's priesthood is eternal and uninterrupted.",
        christRel: "Jesus stands before the throne of God representing us continuously with the merit of His shed blood.",
        warfare: "Our security rests not on our fleeting prayers, but on Christ's unbroken intercession in heaven.",
        prayer: "Great High Priest, I rest in Your ceaseless intercession. You hold me in Your hands and save me to the uttermost."
      },
      {
        title: "The Scarlet Cord in the Window",
        ref: "Joshua 2:18-19",
        quote: "Behold, when we come into the land, thou shalt bind this line of scarlet thread in the window...",
        langInsight: "Hebrew 'Tikvah' (scarlet thread) is also the word for 'hope'—a visible token of covenant security.",
        themeKey: "While Jericho crumbled into ruins, Rahab's house stood firm because of the scarlet cord.",
        christRel: "The blood of Jesus is our scarlet thread of hope amidst the collapse of earthly empires.",
        warfare: "Judgment cannot strike where the covenant token is displayed in faith.",
        prayer: "Lord Jesus, I hang the scarlet cord of Your blood in the window of my heart and household. In You I am secure."
      },
      {
        title: "Sanctified by the Single Offering",
        ref: "Hebrews 10:10-14",
        quote: "For by one offering he hath perfected for ever them that are sanctified.",
        langInsight: "Greek 'teteleioken' in the perfect tense: permanently accomplished perfection for all time.",
        themeKey: "One sacrifice was sufficient to settle the sin question once and for all eternity.",
        christRel: "Priests in the Old Testament never sat down because their work was never done; Jesus sat down at the right hand of God.",
        warfare: "Resting in the finished offering of Jesus eliminates all religious guilt and unlocks boldness.",
        prayer: "Father, thank You for the single, all-sufficient sacrifice of Jesus that has perfected me forever in Your sight."
      },
      {
        title: "Triumph over Principalities at Golgotha",
        ref: "Colossians 2:14-15",
        quote: "And having spoiled principalities and powers, he made a shew of them openly, triumphing over them in it.",
        langInsight: "Greek 'apekduomai' describes stripping a defeated general of his weapons and armor in a triumphal parade.",
        themeKey: "The Cross was not a defeat but Satan's ultimate Waterloo, where his weapons were dismantled.",
        christRel: "Christ turned the Roman cross into a triumphal chariot, dragging demons in public humiliation.",
        warfare: "We do not fight for victory; we enforce the victory Christ already won and displayed openly.",
        prayer: "Lord Jesus, I enforce Your victory at Calvary over every demonic power targeting my life and ministry."
      },
      {
        title: "By His Stripes We Are Healed: The Double Cure",
        ref: "1 Peter 2:24",
        quote: "Who his own self bare our sins in his own body on the tree... by whose stripes ye were healed.",
        langInsight: "Greek 'iathete' is in the aorist passive: healing was accomplished in the historical past at the scourging post.",
        themeKey: "Atonement provides a double cure: pardon for our sins and healing for our physical and emotional brokenness.",
        christRel: "Jesus bore our sicknesses as well as our iniquities, providing comprehensive redemption.",
        warfare: "Stand on the covenant word: sickness has been paid for; claim physical and spiritual wholeness by His stripes.",
        prayer: "Lord Jesus, by Your holy stripes I receive physical vigor, emotional restoration, and spiritual soundness today."
      }
    ]
  },
  {
    category: "Holy Spirit & Supernatural Power",
    author: "Pentecostal Apostolic Mission",
    badge: "Pneumatology Masterwork",
    color: "from-rose-950 via-red-950 to-slate-900",
    topics: [
      {
        title: "The Outpouring of Pentecost: Fire and Sound",
        ref: "Acts 2:1-4",
        quote: "And suddenly there came a sound from heaven as of a rushing mighty wind... and there appeared unto them cloven tongues like as of fire...",
        langInsight: "Greek 'Pnoe Biaia' describes a violent, uncontainable blast of heavenly wind filling the room.",
        themeKey: "Pentecost marked the dawn of the New Covenant dispensation where all flesh may receive the Holy Spirit.",
        christRel: "Exalted at the right hand of God, Jesus received the promise of the Spirit and shed Him forth.",
        warfare: "Religious ritual cannot stand before the fire of the Holy Ghost; Pentecost ignites apostolic courage.",
        prayer: "Holy Spirit, breathe Your mighty wind through my soul and ignite Your sacred fire upon my life."
      },
      {
        title: "Rivers of Living Water: The Believer's Inward Ocean",
        ref: "John 7:37-39",
        quote: "He that believeth on me, as the scripture hath said, out of his belly shall flow rivers of living water.",
        langInsight: "Greek 'koilia' refers to the innermost core, spirit, and subconscious depths of the human person.",
        themeKey: "The Holy Spirit in the believer is not a stagnant pond, but an overflowing river of life and power.",
        christRel: "Jesus cried aloud on the great day of the feast, offering His Spirit to all who thirst.",
        warfare: "A flowing river cleanses all debris; when the Spirit moves freely, stagnant sin and depression are swept away.",
        prayer: "Lord Jesus, let rivers of living water flow from my inner being to refresh the dry ground around me."
      },
      {
        title: "The Dunamis Endowment: Witnesses with Power",
        ref: "Acts 1:8",
        quote: "But ye shall receive power, after that the Holy Ghost is come upon you: and ye shall be witnesses unto me...",
        langInsight: "Greek 'Dunamis' signifies explosive, inherent, miracle-working ability that alters natural conditions.",
        themeKey: "Witnessing is not human salesmanship, but a demonstration of the Spirit and of power.",
        christRel: "The same Spirit that raised Jesus from the dead endows the disciples to continue His works.",
        warfare: "Human intellect alone cannot convince sinners; the dunamis of the Holy Ghost shatters demonic blindness.",
        prayer: "Holy Spirit, clothe me with power from on high so that my life bears undeniable witness to the living Christ."
      },
      {
        title: "The Baptism of Fire and the Holy Ghost",
        ref: "Matthew 3:11",
        quote: "...he shall baptize you with the Holy Ghost, and with fire.",
        langInsight: "Greek 'Pur' indicates purifying furnace fire that consumes chaff while refining gold.",
        themeKey: "The Spirit does not merely comfort; He purges the threshing floor of the heart with holy fire.",
        christRel: "Jesus holds the winnowing fan in His hand, thoroughly purging His church and separating wheat from chaff.",
        warfare: "Demons hate the fire of God; when the fire of holiness burns within, the enemy finds nothing in you.",
        prayer: "Lord, baptize me afresh with the Holy Ghost and with fire. Burn away every compromise and consume my heart with zeal."
      },
      {
        title: "The Anointing that Destroys the Yoke",
        ref: "Isaiah 10:27",
        quote: "...and the yoke shall be destroyed because of the anointing.",
        langInsight: "Hebrew 'Shemen' pictures an ox growing so fat and muscular under divine blessing that the wooden yoke snaps.",
        themeKey: "The anointing does not merely ease the burden; it shatters the demonic contraption beyond repair.",
        christRel: "The Spirit of the Lord was upon Jesus to preach deliverance to the captives and set the bruised at liberty.",
        warfare: "When the anointing increases, heavy burdens of addiction, depression, and poverty are pulverized.",
        prayer: "Holy Spirit, let Your yoke-destroying unction break every satanic shackle off my mind and my family today."
      },
      {
        title: "Walking in the Spirit and Overcoming the Flesh",
        ref: "Galatians 5:16-25",
        quote: "Walk in the Spirit, and ye shall not fulfil the lust of the flesh.",
        langInsight: "Greek 'peripateite' means ordering your daily steps in sync with the Spirit's directional promptings.",
        themeKey: "Victory over sin is achieved not by legalistic willpower, but by yielding to the Spirit's higher law of life.",
        christRel: "Jesus walked in unbroken communion with the Father through the Holy Spirit every step of His earthly journey.",
        warfare: "The flesh lusts against the Spirit, but walking in the Spirit neutralizes the carnal nature's impulses.",
        prayer: "Holy Spirit, tune my ear to Your quiet whispers. Teach me to walk step by step in alignment with Your grace."
      },
      {
        title: "The Nine Spiritual Gifts for Edification",
        ref: "1 Corinthians 12:4-11",
        quote: "Now there are diversities of gifts, but the same Spirit... given to every man to profit withal.",
        langInsight: "Greek 'Charismata' are endowments of divine grace distributed according to the Spirit's sovereign will.",
        themeKey: "The gifts of revelation, power, and vocal utterance are tools given to the Church to advance the Kingdom.",
        christRel: "Christ gave gifts unto men when He ascended on high, empowering His body to minister in His stead.",
        warfare: "The gifts of the Spirit expose hidden plots, heal incurable diseases, and silence the mouths of adversaries.",
        prayer: "Father, awaken the spiritual gifts in my life. Let Your wisdom, faith, and healing power operate through me for Your glory."
      },
      {
        title: "Praying in the Holy Ghost: Edifying Faith",
        ref: "Jude 1:20",
        quote: "But ye, beloved, building up yourselves on your most holy faith, praying in the Holy Ghost...",
        langInsight: "Greek 'epoikodomeo' means constructing a towering fortress brick by brick on the foundation.",
        themeKey: "Praying in tongues bypasses human intellectual limitations and aligns directly with the perfect will of God.",
        christRel: "The Holy Spirit takes the things of Christ and makes them real and experiential in the inner man.",
        warfare: "Praying in the Spirit disorients enemy surveillance because mysteries are spoken directly to God.",
        prayer: "Holy Spirit, pray through me with groanings that cannot be uttered. Build up my inner man in most holy faith."
      },
      {
        title: "The Sevenfold Spirit in Isaiah 11",
        ref: "Isaiah 11:1-3",
        quote: "And the spirit of the Lord shall rest upon him, the spirit of wisdom and understanding, the spirit of counsel and might...",
        langInsight: "Hebrew 'Ruach Adonai' embodies the complete spectrum of divine governance resting on Messiah.",
        themeKey: "The multidimensional operations of the Spirit providing wisdom, understanding, counsel, might, knowledge, and fear of the Lord.",
        christRel: "Jesus operated in the full measure of the sevenfold Spirit without measure or deficiency.",
        warfare: "Foolishness and weakness are defeated by the spirit of wisdom, understanding, counsel, and might.",
        prayer: "Lord, let the sevenfold Spirit rest upon my mind and work. Impart to me divine wisdom, supernatural counsel, and holy fear."
      },
      {
        title: "The Sovereign Ruach: The Wind That Bloweth",
        ref: "John 3:8",
        quote: "The wind bloweth where it listeth, and thou hearest the sound thereof, but canst not tell whence it cometh...",
        langInsight: "Greek 'Pneuma' means both breath and wind: invisible in essence but tangible in kinetic effect.",
        themeKey: "The Holy Spirit cannot be boxed into human traditions or institutional formulas; He moves with sovereign majesty.",
        christRel: "Every revival in church history was an unscripted visitation of the sovereign Wind of God.",
        warfare: "Human control stifles the Spirit; when the Wind blows, religious structures either yield or get overturned.",
        prayer: "Sovereign Spirit, blow upon my dry bones and upon Your Church. Send a fresh wave of revival across the nations."
      },
      {
        title: "Grieving Not the Spirit of Promise",
        ref: "Ephesians 4:30",
        quote: "And grieve not the holy Spirit of God, whereby ye are sealed unto the day of redemption.",
        langInsight: "Greek 'lupeite' means wounding the tender heart of one who deeply and passionately loves you.",
        themeKey: "The Holy Spirit is not an impersonal force, but a sensitive Divine Person who desires holy communion.",
        christRel: "Christ displayed perfect reverence for the Spirit, offering Himself without spot to God through the eternal Spirit.",
        warfare: "Bitterness, wrath, and malice grieve the Dove; guarding humility and kindness keeps His presence near.",
        prayer: "Precious Holy Spirit, forgive me for any careless words or bitter thoughts. I consecrate my heart as Your pure dwelling."
      },
      {
        title: "The Prophetic Unction: Understanding the Times",
        ref: "1 Chronicles 12:32",
        quote: "And of the children of Issachar, which were men that had understanding of the times, to know what Israel ought to do...",
        langInsight: "Hebrew 'Binah le-ittim' describes prophetic discernment that decodes the spiritual climate and historical seasons.",
        themeKey: "The Church must not be blindsided by world events; the Spirit reveals the timing and strategy of heaven.",
        christRel: "Jesus rebuked the Pharisees for discerning the face of the sky while failing to discern the signs of the times.",
        warfare: "Confusion paralyzes; prophetic clarity gives the people of God strategic boldness in turbulent hours.",
        prayer: "Lord, grant me the unction of Issachar. Give me spiritual discernment to recognize Your seasons and know what to do."
      },
      {
        title: "The Valley of Dry Bones: Breath Enter In",
        ref: "Ezekiel 37:4-10",
        quote: "...Come from the four winds, O breath, and breathe upon these slain, that they may live.",
        langInsight: "Hebrew 'Ruach' used repeatedly: breath, wind, Spirit—transforming bleached skeletons into an exceeding great army.",
        themeKey: "No situation is too dead, dry, or scattered for the resurrection breath of the Holy Spirit to reconstitute.",
        christRel: "The resurrection of Christ was the ultimate proof that the Spirit brings life out of the deepest tomb.",
        warfare: "Satan loves dry bones; prophesying the Word and invoking the Spirit raises up an overcoming army.",
        prayer: "Breath of God, blow upon every dead situation in my life, my health, and my community. Arise, exceeding great army!"
      },
      {
        title: "The Spirit of Grace and Supplication",
        ref: "Zechariah 12:10",
        quote: "And I will pour upon the house of David... the spirit of grace and of supplications: and they shall look upon me whom they have pierced...",
        langInsight: "Hebrew 'Tachanunim' describes passionate, heartfelt entreaties birthed by the Holy Spirit.",
        themeKey: "True intercession is not engineered by human effort; it is a divine unction poured out from on high.",
        christRel: "The Spirit reveals the pierced Savior, melting hard hearts into tears of repentance and love.",
        warfare: "The enemy hates the spirit of prayer; when supplication breaks out, spiritual fortresses collapse.",
        prayer: "Lord, pour upon me the spirit of grace and supplications. Teach me to travail in prayer until Your glory breaks through."
      },
      {
        title: "The Mantle of Elijah Falling on Elisha",
        ref: "2 Kings 2:11-14",
        quote: "And he took up also the mantle of Elijah that fell from him... and said, Where is the Lord God of Elijah?",
        langInsight: "Hebrew 'Adderet' represents the hairy prophetic garment signifying spiritual authority and office.",
        themeKey: "Spiritual mantles are transferred through faithful honor, hunger, and perseverance to the end.",
        christRel: "When Jesus ascended in the whirlwind to the Father, He dropped the mantle of the Holy Ghost upon His disciples.",
        warfare: "Smite the Jordan of impossibility with the mantle of the Spirit and watch the waters part to the left and right.",
        prayer: "Where is the Lord God of Elijah? Manifest Your power through my hands, Lord, as I take up the mantle of faith."
      },
      {
        title: "Signs, Wonders, and Diverse Miracles",
        ref: "Hebrews 2:4",
        quote: "God also bearing them witness, both with signs and wonders, and with divers miracles, and gifts of the Holy Ghost...",
        langInsight: "Greek 'semeia' (signs that point to truth), 'terata' (wonders causing awe), 'dunameis' (acts of raw power).",
        themeKey: "Miracles are God's signature confirming the preaching of the authentic, uncompromised gospel.",
        christRel: "Jesus was approved of God among men by miracles, wonders, and signs which God did by Him.",
        warfare: "Cessationist doubt disarms the church; signs and wonders confirm the Word and shatter demonic strongholds.",
        prayer: "Lord, stretch forth Your hand to heal, and grant that signs and wonders be done by the name of Your holy child Jesus."
      },
      {
        title: "The Cloud by Day and the Fire by Night",
        ref: "Exodus 13:21-22",
        quote: "And the Lord went before them by day in a pillar of a cloud, to lead them the way; and by night in a pillar of fire...",
        langInsight: "Hebrew 'Ammud Anan' (cloud pillar) provided cooling shade in desert heat and illumination in darkness.",
        themeKey: "The Holy Spirit provides dual ministry: protection from the scorching world and direction in midnight hours.",
        christRel: "Christ is our Guide and Shepherd who never leaves us without heavenly shelter and light.",
        warfare: "When you stay under the cloud and the fire, the enemy's attacks are blinded and neutralized.",
        prayer: "Holy Spirit, be my cloud of protection by day and my pillar of fire by night. Guide every step I take."
      },
      {
        title: "The Inner Witness: Abba, Father",
        ref: "Romans 8:16",
        quote: "The Spirit itself beareth witness with our spirit, that we are the children of God.",
        langInsight: "Greek 'Symmartyreo' describes the co-testimony of two independent witnesses establishing legal certainty.",
        themeKey: "Assurance of salvation is not based on shifting emotions, but on the authoritative voice of the indwelling Spirit.",
        christRel: "Because we are in Christ the Son, the Father loves us with the very same love wherewith He loves Jesus.",
        warfare: "The enemy whispers, 'You do not belong to God'; the Spirit cries within, 'Abba, Father!'",
        prayer: "Holy Spirit, deepen the witness in my spirit that I am a beloved child of God, an heir of God, and a joint-heir with Christ."
      },
      {
        title: "Sealed with the Holy Spirit of Promise",
        ref: "Ephesians 1:13-14",
        quote: "...ye were sealed with that holy Spirit of promise, Which is the earnest of our inheritance...",
        langInsight: "Greek 'Sphragis' represents an unbroken royal signet ring denoting ownership, authenticity, and security.",
        themeKey: "The believer is stamped with God's personal seal; no devil can break the seal of the Almighty.",
        christRel: "The Holy Spirit is the down payment ('arrhabon') guaranteeing that the final redemption of our bodies is certain.",
        warfare: "The seal of God is recognized in the spiritual realm; darkness knows you belong exclusively to Jesus.",
        prayer: "Father, thank You for sealing me with the Holy Spirit. I rest in the absolute security of Your eternal ownership."
      },
      {
        title: "The Latter Rain Outpouring Upon All Flesh",
        ref: "Joel 2:28-29",
        quote: "And it shall come to pass afterward, that I will pour out my spirit upon all flesh; and your sons and your daughters shall prophesy...",
        langInsight: "Hebrew 'Geshem Malkosh' is the heavy, harvest-ripening spring rain that brings crops to full maturity.",
        themeKey: "The end of the age will witness an unprecedented global outpouring of the Spirit for the final harvest.",
        christRel: "The Lord of the Harvest is preparing His bride and gathering the nations before His glorious return.",
        warfare: "Drought and apostasy are broken by the Latter Rain; pray for rain in the time of the latter rain.",
        prayer: "Lord of the Harvest, pour out Your Latter Rain upon my generation. Let a great wave of prophetic unction sweep the earth."
      }
    ]
  }
];

// Let's add the remaining 7 series to reach 10 series x 20 topics = 200 topics!
const REMAINING_SERIES = [
  {
    category: "Faith & Kingdom Principles",
    author: "Center for Faith & Kingdom Mathematics",
    badge: "Kingdom Wisdom",
    color: "from-indigo-900 via-slate-950 to-blue-900",
    baseId: 60,
    topics: [
      { title: "The Divine Calculus of Faith: Exponential Growth", ref: "Mark 4:8", quote: "And other fell on good ground, and did yield fruit... thirty, and sixty, and an hundred.", key: "Multiplication over addition in the Kingdom." },
      { title: "The Title Deed of Faith: Hebrews 11", ref: "Hebrews 11:1-6", quote: "Now faith is the substance of things hoped for, the evidence of things not seen.", key: "Faith gives present tangibility to future promises." },
      { title: "Calling Things Which Be Not As Though They Were", ref: "Romans 4:17-21", quote: "...calleth those things which be not as though they were.", key: "Speaking covenant realities into natural voids." },
      { title: "Five Loaves in the Master's Hands", ref: "Matthew 14:17-20", quote: "Bring them hither to me... and they did all eat, and were filled.", key: "Surrendering human insufficiency into divine infinity." },
      { title: "Borrow Not a Few: Empty Vessels and the Miracle Oil", ref: "2 Kings 4:1-7", quote: "Go, borrow thee vessels abroad of all thy neighbours, even empty vessels; borrow not a few.", key: "Capacity determines the volume of the miraculous flow." },
      { title: "The Law of the Harvest: Seedtime and Reaping", ref: "Luke 8:5-15", quote: "A sower went out to sow his seed...", key: "The Word is an incorruptible seed that produces after its kind." },
      { title: "Jehovah Jireh: Provision on the Sacred Mount", ref: "Genesis 22:13-14", quote: "In the mount of the Lord it shall be seen.", key: "God sees ahead and provides at the exact point of obedience." },
      { title: "The Windows of Heaven: Open Skies Over Malachi", ref: "Malachi 3:10", quote: "Prove me now herewith... if I will not open you the windows of heaven...", key: "Covenant stewardship that rebukes the devourer." },
      { title: "Speaking to the Mountain: Unwavering Authority", ref: "Mark 11:22-24", quote: "Whosoever shall say unto this mountain, Be thou removed...", key: "Speaking directly to obstacles with heart-rooted faith." },
      { title: "Launch Out into the Deep: The Net-Breaking Draught", ref: "Luke 5:4-7", quote: "Launch out into the deep, and let down your nets for a draught.", key: "Leaving shallow shores to experience supernatural abundance." },
      { title: "The Wealth of the Sinner Laid Up for the Just", ref: "Proverbs 13:22", quote: "...and the wealth of the sinner is laid up for the just.", key: "Divine wealth redistribution for the Great Commission." },
      { title: "Isaac Sowing in Famine: Reaping a Hundredfold", ref: "Genesis 26:12-14", quote: "Then Isaac sowed in that land, and received in the same year an hundredfold...", key: "Kingdom economics operate opposite to natural recession." },
      { title: "Trust in the Lord with All Thine Heart", ref: "Proverbs 3:5-6", quote: "Trust in the Lord with all thine heart; and lean not unto thine own understanding.", key: "Subordinating human logic to divine direction." },
      { title: "My God Shall Supply All Your Need", ref: "Philippians 4:19", quote: "But my God shall supply all your need according to his riches in glory by Christ Jesus.", key: "The heavenly treasury is inexhaustible." },
      { title: "The Power to Get Wealth: Deuteronomy 8", ref: "Deuteronomy 8:18", quote: "...for it is he that giveth thee power to get wealth, that he may establish his covenant...", key: "Wealth granted for the establishment of the covenant." },
      { title: "Faith Without Works is Dead: The Living Action", ref: "James 2:17-26", quote: "Even so faith, if it hath not works, is dead, being alone.", key: "Corresponding action is the heartbeat of real faith." },
      { title: "The Ravens at Brook Cherith: Sovereign Sustenance", ref: "1 Kings 17:4-6", quote: "And the ravens brought him bread and flesh in the morning...", key: "God commands unexpected channels to sustain His prophets." },
      { title: "Manna in the Wilderness: Daily Bread from Above", ref: "Exodus 16:15-18", quote: "This is the bread which the Lord hath given you to eat.", key: "Daily dependence upon heavenly provision." },
      { title: "All Things Are Possible to Him That Believeth", ref: "Mark 9:23", quote: "If thou canst believe, all things are possible to him that believeth.", key: "Faith removes the limits of human possibility." },
      { title: "The Overflowing Cup of David: Psalm 23", ref: "Psalm 23:5", quote: "Thou preparest a table before me in the presence of mine enemies: thou anointest my head with oil; my cup runneth over.", key: "Abundance in the presence of adversaries." }
    ]
  },
  {
    category: "Spiritual Warfare & Authority",
    author: "Evangelical Defense Society",
    badge: "Kingdom Power",
    color: "from-red-950 via-stone-900 to-slate-950",
    baseId: 80,
    topics: [
      { title: "The Whole Armor of God: Standing Unbroken", ref: "Ephesians 6:10-18", quote: "Put on the whole armour of God, that ye may be able to stand against the wiles of the devil.", key: "Invulnerable defense through divine equipment." },
      { title: "Authority Over All the Power of the Enemy", ref: "Luke 10:19", quote: "Behold, I give unto you power to tread on serpents and scorpions, and over all the power of the enemy...", key: "Delegated authority backed by the throne of God." },
      { title: "Casting Down Imaginations and High Thoughts", ref: "2 Corinthians 10:3-5", quote: "Casting down imaginations, and every high thing that exalteth itself against the knowledge of God...", key: "Mental warfare and thought captivation." },
      { title: "The Armor of Light in an Hour of Darkness", ref: "Romans 13:12", quote: "The night is far spent, the day is at hand: let us therefore cast off the works of darkness, and let us put on the armour of light.", key: "Light as an active offensive weapon." },
      { title: "Submit to God and Resist the Devil", ref: "James 4:7", quote: "Submit yourselves therefore to God. Resist the devil, and he will flee from you.", key: "Submission to God creates the authority that makes demons flee." },
      { title: "The Two-Edged Sword and High Praises", ref: "Psalm 149:6-9", quote: "Let the high praises of God be in their mouth, and a two-edged sword in their hand...", key: "Praise executing written judgments." },
      { title: "Binding the Strong Man and Spoiling His House", ref: "Matthew 12:29", quote: "Or else how can one enter into a strong man's house, and spoil his goods, except he first bind the strong man?", key: "Strategic authority over territorial spirits." },
      { title: "No Weapon Formed Shall Prosper", ref: "Isaiah 54:17", quote: "No weapon that is formed against thee shall prosper; and every tongue that shall rise against thee in judgment thou shalt condemn.", key: "The heritage of the servants of the Lord." },
      { title: "Overcoming by the Blood and the Word", ref: "Revelation 12:11", quote: "And they overcame him by the blood of the Lamb, and by the word of their testimony; and they loved not their lives unto the death.", key: "The three-fold cord of absolute victory." },
      { title: "The Breaker Goes Up: Shattering Gates of Brass", ref: "Micah 2:13", quote: "The breaker is come up before them: they have broken up, and have passed through the gate...", key: "Prophetic breakthrough that smashes impasses." },
      { title: "The Sword of Goliath in the Hands of David", ref: "1 Samuel 21:9", quote: "And David said, There is none like that; give it me.", key: "Using the enemy's own weapons against him." },
      { title: "Satan Falling Like Lightning from Heaven", ref: "Luke 10:18", quote: "And he said unto them, I beheld Satan as lightning fall from heaven.", key: "The sudden collapse of demonic empires." },
      { title: "The Encamping Angels of the Lord", ref: "Psalm 34:7", quote: "The angel of the Lord encampeth round about them that fear him, and delivereth them.", key: "Angelic bodyguard around the righteous." },
      { title: "Spiritual Discernment: Testing the Spirits", ref: "1 John 4:1-4", quote: "Beloved, believe not every spirit, but try the spirits whether they are of God...", key: "Distinguishing truth from subtle demonic deception." },
      { title: "Treading on the Lion and the Adder", ref: "Psalm 91:13", quote: "Thou shalt tread upon the lion and adder: the young lion and the dragon shalt thou trample under feet.", key: "Treading down open and hidden assaults." },
      { title: "Deliverance from the Snare of the Fowler", ref: "Psalm 91:3", quote: "Surely he shall deliver thee from the snare of the fowler, and from the noisome pestilence.", key: "Escaping unseen traps laid by wickedness." },
      { title: "The Gates of Hell Shall Not Prevail", ref: "Matthew 16:18", quote: "...and upon this rock I will build my church; and the gates of hell shall not prevail against it.", key: "The unstoppable advance of the Ecclesia." },
      { title: "Plucking the Brand from the Burning: Zechariah 3", ref: "Zechariah 3:1-5", quote: "Is not this a brand plucked out of the fire?", key: "Overcoming the accuser through divine vindication." },
      { title: "The Prince of Persia Broken in the Heavenlies", ref: "Daniel 10:12-13", quote: "...but the prince of the kingdom of Persia withstood me one and twenty days: but, lo, Michael... came to help me.", key: "Persevering in intercession until angelic assistance arrives." },
      { title: "More Than Conquerors Through His Love", ref: "Romans 8:37", quote: "Nay, in all these things we are more than conquerors through him that loved us.", key: "Hyper-conquerors who profit from every battle." }
    ]
  },
  {
    category: "Prayer, Fasting & Intimacy",
    author: "Sanctuary of Intercessory Prayer",
    badge: "Intercessor Manual",
    color: "from-blue-950 via-indigo-950 to-slate-900",
    baseId: 100,
    topics: [
      { title: "The Secret Place of the Most High: Psalm 91", ref: "Psalm 91:1-2", quote: "He that dwelleth in the secret place of the most High shall abide under the shadow of the Almighty.", key: "Dwelling in unbroken intimacy with God." },
      { title: "The Golden Altar and Mingled Incense", ref: "Revelation 8:3-5", quote: "And the smoke of the incense, which came with the prayers of the saints, ascended up before God...", key: "Earthly prayers turning into heavenly fire." },
      { title: "The Midnight Cry of the Persistent Friend", ref: "Luke 11:5-8", quote: "...because of his importunity he will rise and give him as many as he needeth.", key: "Holy audacity in intercession." },
      { title: "The Travail of Zion: Birthing Revival", ref: "Isaiah 66:8", quote: "...for as soon as Zion travailed, she brought forth her children.", key: "Spiritual birthing through agonizing prayer." },
      { title: "The Chosen Fast: Breaking Wicked Bands", ref: "Isaiah 58:6-11", quote: "Is not this the fast that I have chosen? to loose the bands of wickedness, to undo the heavy burdens...", key: "True biblical fasting that unlocks healing." },
      { title: "The Fervent Prayer of the Righteous: Elijah's Sky", ref: "James 5:16-18", quote: "The effectual fervent prayer of a righteous man availeth much.", key: "Heart-felt, energetic prayer that changes climates." },
      { title: "Daniel's Twenty-One Day Fast: Shifting Nations", ref: "Daniel 10:2-3", quote: "In those days I Daniel was mourning three full weeks. I ate no pleasant bread...", key: "Fasting that breaks territorial darkness." },
      { title: "The Midnight Watch: Guarding the Gate", ref: "Luke 12:37-38", quote: "And if he shall come in the second watch, or come in the third watch, and find them so, blessed are those servants.", key: "Alertness in strategic night hours." },
      { title: "The Inner Chamber: Shutting the Door", ref: "Matthew 6:6", quote: "But thou, when thou prayest, enter into thy closet, and when thou hast shut thy door, pray to thy Father which is in secret...", key: "Exclusion of worldly noise to hear the Father." },
      { title: "Esther's Three-Day Fast: Overturning Death Decrees", ref: "Esther 4:16", quote: "Go, gather together all the Jews... and fast ye for me, and neither eat nor drink three days, night or day...", key: "Corporate fasting that reverses annihilation." },
      { title: "Jacob Wrestling at Peniel: Prevailing for the Blessing", ref: "Genesis 32:24-30", quote: "I will not let thee go, except thou bless me.", key: "Refusing to leave without the transformed name." },
      { title: "Anna the Prophetess: Night and Day Devotion", ref: "Luke 2:36-38", quote: "...which departed not from the temple, but served God with fastings and prayers night and day.", key: "A lifetime of quiet, powerful intercession." },
      { title: "Ask, Seek, Knock: The Triple Dynamic", ref: "Matthew 7:7-8", quote: "Ask, and it shall be given you; seek, and ye shall find; knock, and it shall be opened unto you.", key: "Escalating intensity in prevailing prayer." },
      { title: "Standing in the Gap: Ezekiel's Broken Wall", ref: "Ezekiel 22:30", quote: "And I sought for a man among them, that should make up the hedge, and stand in the gap before me for the land...", key: "The high calling of priestly intercession." },
      { title: "Groanings Which Cannot Be Uttered", ref: "Romans 8:26", quote: "...the Spirit itself maketh intercession for us with groanings which cannot be uttered.", key: "The Holy Spirit praying through mortal vessels." },
      { title: "Moses on the Mount: Sustained Intercession", ref: "Exodus 17:11-13", quote: "And it came to pass, when Moses held up his hand, that Israel prevailed...", key: "Supporting the hands of intercessors." },
      { title: "The Prayer of Jabez: Enlarging the Territory", ref: "1 Chronicles 4:9-10", quote: "Oh that thou wouldest bless me indeed, and enlarge my coast, and that thine hand might be with me...", key: "Overcoming a painful legacy through bold prayer." },
      { title: "Cornelius: Prayers as a Memorial Before God", ref: "Acts 10:4", quote: "Thy prayers and thine alms are come up for a memorial before God.", key: "Consistent prayer building a heavenly monument." },
      { title: "The Priestly Blessing: Aaron's Sacred Benediction", ref: "Numbers 6:24-26", quote: "The Lord bless thee, and keep thee: The Lord make his face shine upon thee...", key: "Releasing the presence and peace of God." },
      { title: "Praying Always with All Prayer in the Spirit", ref: "Ephesians 6:18", quote: "Praying always with all prayer and supplication in the Spirit...", key: "Unceasing communion that envelops all life." }
    ]
  },
  {
    category: "Holiness, Consecration & Purity",
    author: "Apostolic Doctrine & Holiness Guild",
    badge: "Holiness Classic",
    color: "from-amber-950 via-slate-900 to-rose-950",
    baseId: 120,
    topics: [
      { title: "Be Ye Holy; For I Am Holy", ref: "1 Peter 1:15-16", quote: "Because it is written, Be ye holy; for I am holy.", key: "Reflecting the divine nature in conduct." },
      { title: "The Refiner's Fire and Fuller's Soap", ref: "Malachi 3:2-3", quote: "For he is like a refiner's fire, and like fullers' soap...", key: "Purifying the sons of Levi for pure offerings." },
      { title: "Presenting Your Bodies a Living Sacrifice", ref: "Romans 12:1-2", quote: "I beseech you therefore, brethren... that ye present your bodies a living sacrifice, holy, acceptable unto God...", key: "The reasonable service of total surrender." },
      { title: "Clean Hands and a Pure Heart on the Hill", ref: "Psalm 24:3-5", quote: "He that hath clean hands, and a pure heart; who hath not lifted up his soul unto vanity...", key: "The qualifications for ascending the holy mountain." },
      { title: "The Nazarite Vow: Consecration in Compromise", ref: "Numbers 6:1-8", quote: "All the days of his separation he is holy unto the Lord.", key: "Separation from worldly pleasures for divine service." },
      { title: "Sanctified Through the Inerrant Word", ref: "John 17:17", quote: "Sanctify them through thy truth: thy word is truth.", key: "The washing and cleansing power of Scripture." },
      { title: "The Vessel of Honor: Meet for the Master", ref: "2 Timothy 2:20-22", quote: "...he shall be a vessel unto honour, sanctified, and meet for the master's use...", key: "Purity determining spiritual usefulness." },
      { title: "Fleeing Youthful Lusts and Pursuing Righteousness", ref: "2 Timothy 2:22", quote: "Flee also youthful lusts: but follow righteousness, faith, charity, peace...", key: "Strategic avoidance of temptation." },
      { title: "The Washing of Water by the Word", ref: "Ephesians 5:26", quote: "That he might sanctify and cleanse it with the washing of water by the word...", key: "The bridal cleansing by the spoken truth." },
      { title: "Mortifying the Deeds of the Body", ref: "Romans 8:13", quote: "...but if ye through the Spirit do mortify the deeds of the body, ye shall live.", key: "Putting carnal habits to death by the Spirit." },
      { title: "The Linen Garments of the Priesthood", ref: "Leviticus 16:4", quote: "He shall put on the holy linen coat... these are holy garments...", key: "White linen symbolizing righteousness without human sweat." },
      { title: "Departing from Iniquity: The Sure Foundation", ref: "2 Timothy 2:19", quote: "The foundation of God standeth sure, having this seal, The Lord knoweth them that are his. And, Let every one that nameth the name of Christ depart from iniquity.", key: "God's unchanging requirement of moral purity." },
      { title: "Blessed Are the Pure in Heart: Seeing God", ref: "Matthew 5:8", quote: "Blessed are the pure in heart: for they shall see God.", key: "Inner purity unlocking spiritual perception." },
      { title: "Touch Not the Unclean Thing", ref: "2 Corinthians 6:17-18", quote: "Wherefore come out from among them, and be ye separate, saith the Lord, and touch not the unclean thing...", key: "Separation that qualifies for intimate sonship." },
      { title: "The Fiery Coal on the Prophet's Lips", ref: "Isaiah 6:5-7", quote: "Lo, this hath touched thy lips; and thine iniquity is taken away, and thy sin purged.", key: "Altar fire that purges speech and commissions service." },
      { title: "Girding Up the Loins of Your Mind", ref: "1 Peter 1:13", quote: "Wherefore gird up the loins of your mind, be sober, and hope to the end...", key: "Disciplining mental habits against drift." },
      { title: "Walking in White: Overcomers in Sardis", ref: "Revelation 3:4-5", quote: "...they shall walk with me in white: for they are worthy.", key: "Remaining undefiled in an immoral culture." },
      { title: "The Circumcision of the Heart: Deuteronomy 30", ref: "Deuteronomy 30:6", quote: "And the Lord thy God will circumcise thine heart... to love the Lord thy God with all thine heart...", key: "Internal removal of fleshly stubbornness." },
      { title: "Sanctifying the Lord God in Your Heart", ref: "1 Peter 3:15", quote: "But sanctify the Lord God in your hearts: and be ready always to give an answer...", key: "Enthroning Christ supreme over every thought." },
      { title: "Sanctified Wholly: Spirit, Soul, and Body", ref: "1 Thessalonians 5:23", quote: "And the very God of peace sanctify you wholly; and I pray God your whole spirit and soul and body be preserved blameless...", key: "Tripartite sanctification until Christ appears." }
    ]
  },
  {
    category: "Biblical Wisdom & Apostolic Order",
    author: "Kingdom Governance & Wisdom Institute",
    badge: "Apostolic Order",
    color: "from-slate-900 via-teal-950 to-blue-950",
    baseId: 140,
    topics: [
      { title: "The Fear of the Lord: The Beginning of Wisdom", ref: "Proverbs 9:10", quote: "The fear of the Lord is the beginning of wisdom: and the knowledge of the holy is understanding.", key: "Awe of God as the foundation of all intellect." },
      { title: "Wisdom Hath Builded Her House: Seven Pillars", ref: "Proverbs 9:1", quote: "Wisdom hath builded her house, she hath hewn out her seven pillars...", key: "The structural pillars of kingdom stability." },
      { title: "Solomon's Discernment and Creation Order", ref: "1 Kings 4:29-34", quote: "And God gave Solomon wisdom and understanding exceeding much, and largeness of heart...", key: "Integration of theological and scientific wisdom." },
      { title: "The Heavens Declare the Glory of God", ref: "Psalm 19:1-4", quote: "The heavens declare the glory of God; and the firmament sheweth his handywork.", key: "Cosmic order declaring the Creator's mind." },
      { title: "Christ: All Treasures of Wisdom and Knowledge", ref: "Colossians 2:2-3", quote: "...in whom are hid all the treasures of wisdom and knowledge.", key: "Christ as the focal point of all true knowledge." },
      { title: "The Ant and the Sluggard: Kingdom Industry", ref: "Proverbs 6:6-11", quote: "Go to the ant, thou sluggard; consider her ways, and be wise...", key: "Diligence, foresight, and disciplined labor." },
      { title: "The Power of the Tongue: Life and Death", ref: "Proverbs 18:21", quote: "Death and life are in the power of the tongue: and they that love it shall eat the fruit thereof.", key: "The creative and destructive capacity of speech." },
      { title: "Building on the Rock: The Wise Builder", ref: "Matthew 7:24-27", quote: "Therefore whosoever heareth these sayings of mine, and doeth them, I will liken him unto a wise man, which built his house upon a rock...", key: "Obedience that survives cosmic storms." },
      { title: "All Things Decently and in Order", ref: "1 Corinthians 14:40", quote: "Let all things be done decently and in order.", key: "Heavenly protocol and church governance." },
      { title: "The Fivefold Ministry and Equipping the Saints", ref: "Ephesians 4:11-13", quote: "And he gave some, apostles; and some, prophets; and some, evangelists; and some, pastors and teachers...", key: "Apostolic government for corporate maturity." },
      { title: "Nehemiah's Blueprint: Rebuilding Broken Walls", ref: "Nehemiah 2:17-18", quote: "...Come, and let us build up the wall of Jerusalem, that we be no more a reproach.", key: "Visionary leadership and organizational mastery." },
      { title: "The Sons of Issachar: Men of Understanding", ref: "1 Chronicles 12:32", quote: "...men that had understanding of the times, to know what Israel ought to do...", key: "Strategic foresight in times of national crisis." },
      { title: "A Soft Answer Turneth Away Wrath", ref: "Proverbs 15:1", quote: "A soft answer turneth away wrath: but grievous words stir up anger.", key: "De-escalating conflict through meekness." },
      { title: "He That Winneth Souls is Wise", ref: "Proverbs 11:30", quote: "The fruit of the righteous is a tree of life; and he that winneth souls is wise.", key: "The highest exercise of kingdom intellect." },
      { title: "Buy the Truth, and Sell It Not", ref: "Proverbs 23:23", quote: "Buy the truth, and sell it not; also wisdom, and instruction, and understanding.", key: "Uncompromising valuation of divine revelation." },
      { title: "The Pattern in the Mount: Celestial Architecture", ref: "Exodus 25:40", quote: "And look that thou make them after their pattern, which was shewed thee in the mount.", key: "Strict adherence to heavenly blueprints." },
      { title: "Stewardship of the Mysteries of God", ref: "1 Corinthians 4:1-2", quote: "Moreover it is required in stewards, that a man be found faithful.", key: "Fidelity in handling divine truth and resources." },
      { title: "The Discretion of Joseph in Pharaoh's Court", ref: "Genesis 41:38-40", quote: "Can we find such a one as this is, a man in whom the Spirit of God is?", key: "Spiritual wisdom solving economic crises." },
      { title: "Counsel in the Heart of Man as Deep Water", ref: "Proverbs 20:5", quote: "Counsel in the heart of man is like deep water; but a man of understanding will draw it out.", key: "Deep pastoral listening and discernment." },
      { title: "Except the Lord Build the House", ref: "Psalm 127:1", quote: "Except the Lord build the house, they labour in vain that build it...", key: "Total dependence upon divine initiative." }
    ]
  },
  {
    category: "Christian Family & Generational Blessing",
    author: "Covenant Family & Heritage Guild",
    badge: "Generational Covenant",
    color: "from-stone-900 via-rose-950 to-amber-950",
    baseId: 160,
    topics: [
      { title: "The Mystery of One Flesh: Marriage in Christ", ref: "Ephesians 5:22-33", quote: "This is a great mystery: but I speak concerning Christ and the church.", key: "Covenant marriage reflecting the gospel." },
      { title: "As for Me and My House: The Joshua Vow", ref: "Joshua 24:15", quote: "...but as for me and my house, we will serve the Lord.", key: "Uncompromising patriarchal and family consecration." },
      { title: "Train Up a Child in the Way He Should Go", ref: "Proverbs 22:6", quote: "Train up a child in the way he should go: and when he is old, he will not depart from it.", key: "Generational discipleship from infancy." },
      { title: "Children as Arrows in the Mighty Hand", ref: "Psalm 127:3-5", quote: "As arrows are in the hand of a mighty man; so are children of the youth.", key: "Children formed as weapons for kingdom advancement." },
      { title: "The Fruitful Vine and Olive Plants", ref: "Psalm 128:3-4", quote: "Thy wife shall be as a fruitful vine... thy children like olive plants round about thy table.", key: "The tranquility and prosperity of the godly home." },
      { title: "The Covenant to a Thousand Generations", ref: "Deuteronomy 7:9", quote: "...which keepeth covenant and mercy with them that love him and keep his commandments to a thousand generations...", key: "Long-term horizon of God's generational mercy." },
      { title: "The Woman of Valor: Proverbs 31", ref: "Proverbs 31:10-31", quote: "Who can find a virtuous woman? for her price is far above rubies.", key: "Diligence, dignity, and family governance." },
      { title: "Turning Hearts of Fathers to Children", ref: "Malachi 4:6", quote: "And he shall turn the heart of the fathers to the children, and the heart of the children to their fathers...", key: "Healing the fatherless wound across generations." },
      { title: "The Heritage of the Righteous: Lasting Inheritance", ref: "Proverbs 13:22", quote: "A good man leaveth an inheritance to his children's children...", key: "Spiritual, moral, and economic generational legacy." },
      { title: "Honour Thy Father and Mother: The Promise", ref: "Ephesians 6:2-3", quote: "Honour thy father and mother... That it may be well with thee, and thou mayest live long on the earth.", key: "The foundational commandment for societal longevity." },
      { title: "A Threefold Cord is Not Quickly Broken", ref: "Ecclesiastes 4:12", quote: "...and a threefold cord is not quickly broken.", key: "Christ as the central strand in family relationships." },
      { title: "The Unfeigned Faith of Lois and Eunice", ref: "2 Timothy 1:5", quote: "When I call to remembrance the unfeigned faith that is in thee, which dwelt first in thy grandmother Lois, and thy mother Eunice...", key: "The transmission of genuine faith through mothers." },
      { title: "The Assembly of the Firstborn in Heaven", ref: "Hebrews 12:23", quote: "To the general assembly and church of the firstborn, which are written in heaven...", key: "The eternal lineage of the redeemed." },
      { title: "Dwelling with Honor: 1 Peter 3", ref: "1 Peter 3:7", quote: "Likewise, ye husbands, dwell with them according to knowledge, giving honour unto the wife...", key: "Mutual honor keeping prayers unhindered." },
      { title: "The Family Altar: Sacrifices of Job", ref: "Job 1:5", quote: "...Job sent and sanctified them, and rose up early in the morning, and offered burnt offerings according to the number of them all...", key: "Parental priestly intercession over children." },
      { title: "Preserving the Seed: God Seeking Godly Offspring", ref: "Malachi 2:15", quote: "And did not he make one?... That he might seek a godly seed.", key: "Protecting the sanctity of marriage for the children's sake." },
      { title: "The Patriarchal Blessing of Jacob", ref: "Genesis 48:13-16", quote: "The Angel which redeemed me from all evil, bless the lads...", key: "Laying on of hands and prophetic impartation." },
      { title: "Walking in Integrity Within My House", ref: "Psalm 101:2", quote: "...I will walk within my house with a perfect heart.", key: "Private consistency over public performance." },
      { title: "Boaz the Kinsman-Redeemer and Ruth", ref: "Ruth 4:13-17", quote: "So Boaz took Ruth, and she was his wife... and she bare a son.", key: "Restoration of family line leading to David and Christ." },
      { title: "Transmitting the Testimony: Psalm 78", ref: "Psalm 78:4-7", quote: "We will not hide them from their children, shewing to the generation to come the praises of the Lord...", key: "Preventing generational amnesia of God's works." }
    ]
  },
  {
    category: "Eschatology & Eternal Glory",
    author: "Prophetic Scriptures Research Council",
    badge: "Eschatological Hope",
    color: "from-purple-950 via-slate-950 to-indigo-950",
    baseId: 180,
    topics: [
      { title: "The Blessed Hope: The Glorious Appearing", ref: "Titus 2:13", quote: "Looking for that blessed hope, and the glorious appearing of the great God and our Saviour Jesus Christ.", key: "The purifying anticipation of Christ's return." },
      { title: "Caught Up in the Clouds: The Voice of the Archangel", ref: "1 Thessalonians 4:16-17", quote: "For the Lord himself shall descend from heaven with a shout, with the voice of the archangel, and with the trump of God...", key: "The rapture of the Church and reunion with Christ." },
      { title: "In the Twinkling of an Eye: Immortal Bodies", ref: "1 Corinthians 15:51-53", quote: "Behold, I shew you a mystery; We shall not all sleep, but we shall all be changed, In a moment, in the twinkling of an eye...", key: "The instantaneous metamorphosis of mortal flesh." },
      { title: "The New Jerusalem Descending as a Bride", ref: "Revelation 21:1-4", quote: "And I John saw the holy city, new Jerusalem, coming down from God out of heaven, prepared as a bride adorned for her husband.", key: "The eternal dwelling of God with humanity." },
      { title: "The Marriage Supper of the Lamb", ref: "Revelation 19:7-9", quote: "Let us be glad and rejoice, and give honour to him: for the marriage of the Lamb is come, and his wife hath made herself ready.", key: "The grand cosmic banquet celebrating the redeemed." },
      { title: "The Lion of Judah Prevailing to Open the Book", ref: "Revelation 5:5", quote: "Weep not: behold, the Lion of the tribe of Juda, the Root of David, hath prevailed to open the book...", key: "Christ alone worthy to execute cosmic history." },
      { title: "The White Horse and the Faithful and True Warrior", ref: "Revelation 19:11-16", quote: "And I saw heaven opened, and behold a white horse; and he that sat upon him was called Faithful and True...", key: "The triumphant second coming in blazing majesty." },
      { title: "The Bema Seat of Christ: Rewards for Labor", ref: "2 Corinthians 5:10", quote: "For we must all appear before the judgment seat of Christ; that every one may receive the things done in his body...", key: "The evaluation of Christian stewardship and crowns." },
      { title: "No More Sea, No More Curse, No More Death", ref: "Revelation 21:1-4 / 22:3", quote: "And there shall be no more curse: but the throne of God and of the Lamb shall be in it...", key: "The total eradication of evil, sickness, and grief." },
      { title: "The River of Life Proceeding from the Throne", ref: "Revelation 22:1-2", quote: "And he shewed me a pure river of water of life, clear as crystal, proceeding out of the throne of God and of the Lamb.", key: "Unending life and leaves for the healing of nations." },
      { title: "Behold, He Cometh with Clouds: Every Eye Shall See", ref: "Revelation 1:7", quote: "Behold, he cometh with clouds; and every eye shall see him, and they also which pierced him...", key: "The undeniable universal revelation of the King." },
      { title: "The Crown of Righteousness for Loving His Appearing", ref: "2 Timothy 4:8", quote: "...there is laid up for me a crown of righteousness, which the Lord... shall give me at that day: and not to me only, but unto all them also that love his appearing.", key: "The crown awaiting those who yearn for Christ's return." },
      { title: "Reigning with Christ for a Thousand Years", ref: "Revelation 20:4-6", quote: "...and they lived and reigned with Christ a thousand years.", key: "The millennial reign and restoration of the earth." },
      { title: "The Great White Throne and the Opened Books", ref: "Revelation 20:11-12", quote: "And I saw a great white throne, and him that sat on it... and the books were opened...", key: "The final judgment of all rebellion." },
      { title: "Looking for a City Which Hath Foundations", ref: "Hebrews 11:10", quote: "For he looked for a city which hath foundations, whose builder and maker is God.", key: "Pilgrim identity fixed on the eternal metropolis." },
      { title: "The Night is Far Spent: Awakening from Slumber", ref: "Romans 13:11-12", quote: "And that, knowing the time, that now it is high time to awake out of sleep: for now is our salvation nearer than when we believed.", key: "Urgent sobriety as the end approaches." },
      { title: "The Glory to Be Revealed in Us: Romans 8", ref: "Romans 8:18-19", quote: "For I reckon that the sufferings of this present time are not worthy to be compared with the glory which shall be revealed in us.", key: "Present tribulations dwarfed by eternal glory." },
      { title: "Death Swallowed Up in Victory: O Grave, Where is Thy Sting?", ref: "1 Corinthians 15:54-57", quote: "Death is swallowed up in victory. O death, where is thy sting? O grave, where is thy victory?", key: "The total and irreversible death of death." },
      { title: "Surely I Come Quickly: Even So, Come, Lord Jesus", ref: "Revelation 22:20", quote: "He which testifieth these things saith, Surely I come quickly. Amen. Even so, come, Lord Jesus.", key: "The final heartbeat and prayer of the Church." },
      { title: "The Eternal Hallelujah Chorus: Worthy is the Lamb", ref: "Revelation 19:1-6 / 5:12-13", quote: "And I heard as it were the voice of a great multitude... saying, Alleluia: for the Lord God omnipotent reigneth.", key: "The unending cosmic celebration of God's victory." }
    ]
  }
];

// Combine all 10 series into a single master array of 200 items
const ALL_SERIES = [...SERIES_DEFINITIONS];

REMAINING_SERIES.forEach(s => {
  ALL_SERIES.push({
    category: s.category,
    author: s.author,
    badge: s.badge,
    color: s.color,
    topics: s.topics.map(t => ({
      title: t.title,
      ref: t.ref,
      quote: t.quote,
      langInsight: `Scriptural exegesis of ${t.ref} highlights covenant authority, original biblical terminology, and deep doctrinal certainty.`,
      themeKey: t.key,
      christRel: `This revelation is rooted in Jesus Christ, whose death, resurrection, and ascension establish every promise as 'Yea and Amen.'`,
      warfare: `Every attempt of darkness to oppose this truth is broken by the sword of the Spirit and steadfast faith.`,
      prayer: `Lord Jesus, establish the revelation of ${t.title} within my heart. I receive Your Word with joy and decree that it will bear fruit an hundredfold in my life. Amen.`
    }))
  });
});

console.log(`Total series count: ${ALL_SERIES.length}`);
let totalTopics = 0;
ALL_SERIES.forEach(s => totalTopics += s.topics.length);
console.log(`Total topics count: ${totalTopics}`);

// Now let's generate the file src/data/libraryMessagesData.ts
let fileContent = `import { Book } from "../types";

export interface LibraryMessageRaw {
  id: string;
  title: string;
  author: string;
  category: string;
  badge: string;
  color: string;
  scriptureRef: string;
  quote: string;
  langInsight: string;
  themeKey: string;
  christRel: string;
  warfare: string;
  prayer: string;
}

export const MASTER_200_BLUEPRINTS: LibraryMessageRaw[] = [
`;

let msgIndex = 1;
ALL_SERIES.forEach(series => {
  series.topics.forEach(t => {
    fileContent += `  {
    id: "lib-msg-${msgIndex}",
    title: ${JSON.stringify(t.title)},
    author: ${JSON.stringify(series.author)},
    category: ${JSON.stringify(series.category)},
    badge: ${JSON.stringify(series.badge)},
    color: ${JSON.stringify(series.color)},
    scriptureRef: ${JSON.stringify(t.ref)},
    quote: ${JSON.stringify(t.quote)},
    langInsight: ${JSON.stringify(t.langInsight)},
    themeKey: ${JSON.stringify(t.themeKey)},
    christRel: ${JSON.stringify(t.christRel)},
    warfare: ${JSON.stringify(t.warfare)},
    prayer: ${JSON.stringify(t.prayer)}
  },
`;
    msgIndex++;
  });
});

fileContent += `];

export function generate200LibraryMessages(): Book[] {
  return MASTER_200_BLUEPRINTS.map((item, idx) => {
    const bookIndex = idx + 1;
    return {
      id: item.id,
      title: item.title,
      author: item.author,
      category: item.category,
      year: "Standard Pulpit Edition",
      description: \`A profound, in-depth 5-page theological and expository message on \${item.title}, analyzing foundational biblical texts, original covenant nuances, and practical spiritual insights.\`,
      coverColor: item.color,
      coverBadge: item.badge,
      tags: [item.category, "Biblical Exposition", "Sound Doctrine", "Spiritual Warfare", "Christian Discipleship"],
      totalChapters: 5,
      chapters: [
        {
          id: \`\${item.id}-page-1\`,
          chapterNumber: 1,
          title: "Page 1: Scriptural Proposition & Exordium",
          subtitle: \`Foundational Exegesis of \${item.scriptureRef}\`,
          estimatedMinutes: 7,
          content: \`" \${item.quote} " — \${item.scriptureRef}

To approach the holy revelation of \${item.title.toLowerCase()}, one must stand before the inspired Scriptures with reverence, humility, and spiritual attentiveness. In the sacred text of \${item.scriptureRef}, the Holy Spirit establishes an immutable anchor for the believer's soul. As the Apostle writes, "All scripture is given by inspiration of God, and is profitable for doctrine, for reproof, for correction, for instruction in righteousness" (2 Timothy 3:16).

Linguistic and historical scrutiny reveals the depth of this passage: \${item.langInsight} Throughout biblical history, God's servants did not navigate trials by human cleverness or carnal speculation; they anchored their lives upon the unalterable declarations of the Almighty. When circumstances contradicted heaven's promise, they held fast to the Word, knowing that heaven and earth shall pass away, but God's Words shall never pass away.

\${item.themeKey} This truth is not an abstract theory for academic debate; it is the vital oxygen of the spiritual pilgrim. As we step into the sanctuary of this message, prepare your heart to receive the engrafted Word which is able to save your soul and impart enduring spiritual fortitude.\`
        },
        {
          id: \`\${item.id}-page-2\`,
          chapterNumber: 2,
          title: "Page 2: Doctrinal Anatomy & Systematic Truth",
          subtitle: "Covenant Framework and Biblical Theology",
          estimatedMinutes: 8,
          content: \`The architecture of biblical truth is an integrated, harmonious temple. When we examine \${item.title.toLowerCase()}, we behold the coherent flow of covenant grace extending from Genesis through the prophets and reaching its zenith in the New Testament epistles.

Sound doctrine demands that we harmonize scripture with scripture. The law demonstrated humanity's bankruptcy and need for redemption, while the covenant promises revealed God's unwavering commitment to deliver, preserve, and bless His chosen people. When we grasp \${item.themeKey.toLowerCase()}, we understand that God's ways are higher than our ways, and His thoughts than our thoughts.

Furthermore, systematic theology reminds us that every divine command carries with it an endowment of supernatural enabling. God never demands what His grace does not supply. In the school of faith, the believer learns to rest not upon temporal feelings or visible circumstances, but upon the solid rock of divine truth. As Paul declared, "Being confident of this very thing, that he which hath begun a good work in you will perform it until the day of Jesus Christ" (Philippians 1:6).\`
        },
        {
          id: \`\${item.id}-page-3\`,
          chapterNumber: 3,
          title: "Page 3: Christological Revelation & Spiritual Mystery",
          subtitle: "The Centrality of Christ and the Finished Work",
          estimatedMinutes: 7,
          content: \`All Scripture testifies of Jesus Christ. As our Lord declared on the road to Emmaus, beginning at Moses and all the prophets, He expounded unto them in all the scriptures the things concerning Himself (Luke 24:27). Therefore, \${item.title.toLowerCase()} finds its ultimate fulfillment and spiritual power in the person and finished work of our Lord Jesus Christ.

\${item.christRel} On the Cross of Calvary, every demonic accusation was disarmed, every curse was broken, and total reconciliation was accomplished. The shed blood of Jesus speaks better things than the blood of Abel, crying not for vengeance, but for eternal mercy, full pardon, and supernatural peace.

Because Christ is risen and seated at the right hand of the Majesty on high, we do not strive from a position of defeat, but from a position of seated triumph. In Him, you are complete; in Him, you have received the earnest of the Spirit; and in Him, every barrier erected by the enemy has been dismantled once and for all.\`
        },
        {
          id: \`\${item.id}-page-4\`,
          chapterNumber: 4,
          title: "Page 4: Kingdom Conduct & Spiritual Warfare",
          subtitle: "Walking in Victory and Overcoming the Adversary",
          estimatedMinutes: 7,
          content: \`Truth that does not translate into holy living and victorious warfare remains sterile. The Apostle James warns: "Be ye doers of the word, and not hearers only, deceiving your own selves" (James 1:22). How then does the believer walk out the revelation of \${item.title.toLowerCase()} in daily conduct, marriage, labor, and spiritual conflict?

\${item.warfare} The adversary continually attempts to sow seeds of doubt, compromise, and weariness. When pressure mounts, the natural impulse of the flesh is to murmur, panic, or compromise. But the disciple clothed in the armor of God takes up the shield of faith, wherewith he is able to quench all the fiery darts of the wicked one.

Spiritual discipline is essential: maintaining the secret place of unhurried communion, saturating your thoughts with Scripture, guarding your speech against cynicism, and cultivating a lifestyle of continuous thanksgiving. When the believer stands firm in holy obedience, demonic strongholds crumble and the atmosphere of heaven fills the home and ministry.\`
        },
        {
          id: \`\${item.id}-page-5\`,
          chapterNumber: 5,
          title: "Page 5: Prophetic Impartation & Consecration Prayer",
          subtitle: "Apostolic Decrees, Guided Prayer, and Benediction",
          estimatedMinutes: 6,
          content: \`As we conclude this sacred exposition of \${item.title}, we stand upon the threshold of impartation. Truth acknowledged in the intellect must now be sealed upon the altar of the heart by the Holy Ghost.

PROPHETIC COVENANT DECREES:
1. I decree and declare that the word of \${item.title} is an unshakeable seal upon my heart and my household this day.
2. I break every generational shackle of despair, compromise, and spiritual blindness in the mighty name of Jesus Christ.
3. I declare that the joy, righteousness, and resurrection power of Christ govern my emotions, my health, and my destiny from this hour forward.
4. No weapon formed against my assignment shall prosper, and every tongue that rises against me in judgment is condemned.

CONSECRATION PRAYER:
"\${item.prayer}"

APOSTOLIC BENEDICTION:
"Now unto him that is able to keep you from falling, and to present you faultless before the presence of his glory with exceeding joy, To the only wise God our Saviour, be glory and majesty, dominion and power, both now and ever. Amen." (Jude 1:24-25)\`
        }
      ]
    };
  });
}

export const LIBRARY_200_MESSAGES: Book[] = generate200LibraryMessages();
`;

fs.writeFileSync(path.join(__dirname, '../src/data/libraryMessagesData.ts'), fileContent, 'utf8');
console.log("Successfully wrote src/data/libraryMessagesData.ts with 200 distinct 5-page messages!");
