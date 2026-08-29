import { BibleBook } from "../types";

export const BIBLE_BOOKS_CATALOG: BibleBook[] = [
  // ==================== OLD TESTAMENT (39 BOOKS) ====================
  // 1. Pentateuch / Law (5 Books)
  {
    name: "Genesis",
    abbreviation: "Gen",
    testament: "Old Testament",
    group: "Law & Pentateuch",
    chapterCount: 50,
    summary: "The book of beginnings: Creation, the Fall, the Flood, God's covenant with Abraham, Isaac, Jacob, and Joseph in Egypt.",
    chapters: {
      1: [
        { verse: 1, text: "In the beginning God created the heaven and the earth." },
        { verse: 2, text: "And the earth was without form, and void; and darkness was upon the face of the deep. And the Spirit of God moved upon the face of the waters." },
        { verse: 3, text: "And God said, Let there be light: and there was light." },
        { verse: 26, text: "And God said, Let us make man in our image, after our likeness: and let them have dominion over the fish of the sea, and over the fowl of the air, and over the cattle, and over all the earth." },
        { verse: 27, text: "So God created man in his own image, in the image of God created he him; male and female created he them." },
        { verse: 31, text: "And God saw every thing that he had made, and, behold, it was very good." }
      ],
      12: [
        { verse: 1, text: "Now the LORD had said unto Abram, Get thee out of thy country, and from thy kindred, and from thy father's house, unto a land that I will shew thee:" },
        { verse: 2, text: "And I will make of thee a great nation, and I will bless thee, and make thy name great; and thou shalt be a blessing:" },
        { verse: 3, text: "And I will bless them that bless thee, and curse him that curseth thee: and in thee shall all families of the earth be blessed." }
      ]
    }
  },
  {
    name: "Exodus",
    abbreviation: "Exo",
    testament: "Old Testament",
    group: "Law & Pentateuch",
    chapterCount: 40,
    summary: "Deliverance from Egyptian bondage under Moses, the Passover, crossing the Red Sea, the Ten Commandments at Mount Sinai, and the Tabernacle.",
    chapters: {
      3: [
        { verse: 14, text: "And God said unto Moses, I AM THAT I AM: and he said, Thus shalt thou say unto the children of Israel, I AM hath sent me unto you." }
      ],
      14: [
        { verse: 13, text: "And Moses said unto the people, Fear ye not, stand still, and see the salvation of the LORD, which he will shew to you to day: for the Egyptians whom ye have seen to day, ye shall see them again no more for ever." },
        { verse: 14, text: "The LORD shall fight for you, and ye shall hold your peace." }
      ],
      20: [
        { verse: 1, text: "And God spake all these words, saying," },
        { verse: 2, text: "I am the LORD thy God, which have brought thee out of the land of Egypt, out of the house of bondage." },
        { verse: 3, text: "Thou shalt have no other gods before me." }
      ]
    }
  },
  {
    name: "Leviticus",
    abbreviation: "Lev",
    testament: "Old Testament",
    group: "Law & Pentateuch",
    chapterCount: 27,
    summary: "God's manual of holiness, sacrificial offerings, the Levitical priesthood, and the Day of Atonement.",
    chapters: {
      19: [
        { verse: 2, text: "Speak unto all the congregation of the children of Israel, and say unto them, Ye shall be holy: for I the LORD your God am holy." },
        { verse: 18, text: "Thou shalt not avenge, nor bear any grudge against the children of thy people, but thou shalt love thy neighbour as thyself: I am the LORD." }
      ]
    }
  },
  {
    name: "Numbers",
    abbreviation: "Num",
    testament: "Old Testament",
    group: "Law & Pentateuch",
    chapterCount: 36,
    summary: "The census and forty-year wilderness wanderings of Israel, testing their obedience and demonstrating God's sovereign preservation.",
    chapters: {
      6: [
        { verse: 24, text: "The LORD bless thee, and keep thee:" },
        { verse: 25, text: "The LORD make his face shine upon thee, and be gracious unto thee:" },
        { verse: 26, text: "The LORD lift up his countenance upon thee, and give thee peace." }
      ]
    }
  },
  {
    name: "Deuteronomy",
    abbreviation: "Deu",
    testament: "Old Testament",
    group: "Law & Pentateuch",
    chapterCount: 34,
    summary: "Moses' farewell discourses repeating the Law, challenging Israel to love God with all their heart, and choosing life and blessing.",
    chapters: {
      6: [
        { verse: 4, text: "Hear, O Israel: The LORD our God is one LORD:" },
        { verse: 5, text: "And thou shalt love the LORD thy God with all thine heart, and with all thy soul, and with all thy might." }
      ],
      28: [
        { verse: 1, text: "And it shall come to pass, if thou shalt hearken diligently unto the voice of the LORD thy God, to observe and to do all his commandments which I command thee this day, that the LORD thy God will set thee on high above all nations of the earth:" },
        { verse: 2, text: "And all these blessings shall come on thee, and overtake thee, if thou shalt hearken unto the voice of the LORD thy God." }
      ],
      31: [
        { verse: 6, text: "Be strong and of a good courage, fear not, nor be afraid of them: for the LORD thy God, he it is that doth go with thee; he will not fail thee, nor forsake thee." }
      ]
    }
  },

  // 2. Historical Books (12 Books)
  {
    name: "Joshua",
    abbreviation: "Jos",
    testament: "Old Testament",
    group: "Historical",
    chapterCount: 24,
    summary: "Joshua's leadership in crossing the Jordan, the conquest of Canaan, the fall of Jericho, and the allotment of the Promised Land.",
    chapters: {
      1: [
        { verse: 8, text: "This book of the law shall not depart out of thy mouth; but thou shalt meditate therein day and night, that thou mayest observe to do according to all that is written therein: for then thou shalt make thy way prosperous, and then thou shalt have good success." },
        { verse: 9, text: "Have not I commanded thee? Be strong and of a good courage; be not afraid, neither be thou dismayed: for the LORD thy God is with thee whithersoever thou goest." }
      ],
      24: [
        { verse: 15, text: "And if it seem evil unto you to serve the LORD, choose you this day whom ye will serve; whether the gods which your fathers served that were on the other side of the flood, or the gods of the Amorites, in whose land ye dwell: but as for me and my house, we will serve the LORD." }
      ]
    }
  },
  {
    name: "Judges",
    abbreviation: "Jdg",
    testament: "Old Testament",
    group: "Historical",
    chapterCount: 21,
    summary: "Cycles of apostasy, oppression, repentance, and divine deliverance through heroic judges like Deborah, Gideon, and Samson.",
    chapters: {
      6: [
        { verse: 12, text: "And the angel of the LORD appeared unto him, and said unto him, The LORD is with thee, thou mighty man of valour." }
      ]
    }
  },
  {
    name: "Ruth",
    abbreviation: "Rut",
    testament: "Old Testament",
    group: "Historical",
    chapterCount: 4,
    summary: "A beautiful story of loyalty, covenant redemption through Boaz, and God's providence in the lineage of King David and Jesus Christ.",
    chapters: {
      1: [
        { verse: 16, text: "And Ruth said, Intreat me not to leave thee, or to return from following after thee: for whither thou goest, I will go; and where thou lodgest, I will lodge: thy people shall be my people, and thy God my God." }
      ]
    }
  },
  {
    name: "1 Samuel",
    abbreviation: "1Sa",
    testament: "Old Testament",
    group: "Historical",
    chapterCount: 31,
    summary: "The transition from judges to kings: Samuel the prophet, the rise and fall of King Saul, and the anointing of David.",
    chapters: {
      16: [
        { verse: 7, text: "But the LORD said unto Samuel, Look not on his countenance, or on the height of his stature; because I have refused him: for the LORD seeth not as man seeth; for man looketh on the outward appearance, but the LORD looketh on the heart." }
      ],
      17: [
        { verse: 45, text: "Then said David to the Philistine, Thou comest to me with a sword, and with a spear, and with a shield: but I come to thee in the name of the LORD of hosts, the God of the armies of Israel, whom thou hast defied." },
        { verse: 47, text: "And all this assembly shall know that the LORD saveth not with sword and spear: for the battle is the LORD's, and he will give you into our hands." }
      ]
    }
  },
  {
    name: "2 Samuel",
    abbreviation: "2Sa",
    testament: "Old Testament",
    group: "Historical",
    chapterCount: 24,
    summary: "The reign of King David over all Israel, the Davidic covenant, Jerusalem as capital, and God's restorative grace.",
    chapters: {
      7: [
        { verse: 16, text: "And thine house and thy kingdom shall be established for ever before thee: thy throne shall be established for ever." }
      ],
      22: [
        { verse: 2, text: "And he said, The LORD is my rock, and my fortress, and my deliverer;" },
        { verse: 3, text: "The God of my rock; in him will I trust: he is my shield, and the horn of my salvation, my high tower, and my refuge, my saviour; thou savest me from violence." }
      ]
    }
  },
  {
    name: "1 Kings",
    abbreviation: "1Ki",
    testament: "Old Testament",
    group: "Historical",
    chapterCount: 22,
    summary: "The golden reign and wisdom of Solomon, construction of the Temple, kingdom division into Judah and Israel, and Elijah's ministry.",
    chapters: {
      3: [
        { verse: 9, text: "Give therefore thy servant an understanding heart to judge thy people, that I may discern between good and bad: for who is able to judge this thy so great a people?" }
      ],
      18: [
        { verse: 39, text: "And when all the people saw it, they fell on their faces: and they said, The LORD, he is the God; the LORD, he is the God." }
      ]
    }
  },
  {
    name: "2 Kings",
    abbreviation: "2Ki",
    testament: "Old Testament",
    group: "Historical",
    chapterCount: 25,
    summary: "Elisha's miracle ministry, the decline of both kingdoms, the Assyrian captivity of Israel, and Babylonian exile of Judah.",
    chapters: {
      2: [
        { verse: 9, text: "And it came to pass, when they were gone over, that Elijah said unto Elisha, Ask what I shall do for thee, before I be taken away from thee. And Elisha said, I pray thee, let a double portion of thy spirit be upon me." }
      ],
      6: [
        { verse: 16, text: "And he answered, Fear not: for they that be with us are more than they that be with them." },
        { verse: 17, text: "And Elisha prayed, and said, LORD, I pray thee, open his eyes, that he may see. And the LORD opened the eyes of the young man; and he saw: and, behold, the mountain was full of horses and chariots of fire round about Elisha." }
      ]
    }
  },
  {
    name: "1 Chronicles",
    abbreviation: "1Ch",
    testament: "Old Testament",
    group: "Historical",
    chapterCount: 29,
    summary: "Genealogies of Israel, David's ascension, preparations for the Temple, and heartfelt worship before God.",
    chapters: {
      4: [
        { verse: 10, text: "And Jabez called on the God of Israel, saying, Oh that thou wouldest bless me indeed, and enlarge my coast, and that thine hand might be with me, and that thou wouldest keep me from evil, that it may not grieve me! And God granted him that which he requested." }
      ],
      16: [
        { verse: 11, text: "Seek the LORD and his strength, seek his face continually." },
        { verse: 29, text: "Give unto the LORD the glory due unto his name: bring an offering, and come before him: worship the LORD in the beauty of holiness." }
      ]
    }
  },
  {
    name: "2 Chronicles",
    abbreviation: "2Ch",
    testament: "Old Testament",
    group: "Historical",
    chapterCount: 36,
    summary: "Solomon's temple dedication, spiritual revivals under Asa, Jehoshaphat, Hezekiah, and Josiah, and the proclamation of Cyrus.",
    chapters: {
      7: [
        { verse: 14, text: "If my people, which are called by my name, shall humble themselves, and pray, and seek my face, and turn from their wicked ways; then will I hear from heaven, and will forgive their sin, and will heal their land." }
      ],
      20: [
        { verse: 15, text: "And he said, Hearken ye, all Judah, and ye inhabitants of Jerusalem, and thou king Jehoshaphat, Thus saith the LORD unto you, Be not afraid nor dismayed by reason of this great multitude; for the battle is not yours, but God's." },
        { verse: 20, text: "Believe in the LORD your God, so shall ye be established; believe his prophets, so shall ye prosper." },
        { verse: 22, text: "And when they began to sing and to praise, the LORD set ambushments against the children of Ammon, Moab, and mount Seir, which were come against Judah; and they were smitten." }
      ]
    }
  },
  {
    name: "Ezra",
    abbreviation: "Ezr",
    testament: "Old Testament",
    group: "Historical",
    chapterCount: 10,
    summary: "The return of Jewish exiles from Babylon, rebuilding the Second Temple in Jerusalem, and Ezra's spiritual revival of the Law.",
    chapters: {
      7: [
        { verse: 10, text: "For Ezra had prepared his heart to seek the law of the LORD, and to do it, and to teach in Israel statutes and judgments." }
      ]
    }
  },
  {
    name: "Nehemiah",
    abbreviation: "Neh",
    testament: "Old Testament",
    group: "Historical",
    chapterCount: 13,
    summary: "Rebuilding the walls of Jerusalem under Nehemiah, enduring opposition, renewing the covenant, and discovering that the Joy of the Lord is our strength.",
    chapters: {
      8: [
        { verse: 10, text: "Then he said unto them, Go your way, eat the fat, and drink the sweet, and send portions unto them for whom nothing is prepared: for this day is holy unto our Lord: neither be ye sorry; for the joy of the LORD is your strength." }
      ]
    }
  },
  {
    name: "Esther",
    abbreviation: "Est",
    testament: "Old Testament",
    group: "Historical",
    chapterCount: 10,
    summary: "God's providential deliverance of the Jewish people from genocide in Persia through Queen Esther and Mordecai.",
    chapters: {
      4: [
        { verse: 14, text: "For if thou altogether holdest thy peace at this time, then shall there enlargement and deliverance arise to the Jews from another place; but thou and thy father's house shall be destroyed: and who knoweth whether thou art come to the kingdom for such a time as this?" }
      ]
    }
  },

  // 3. Wisdom & Poetry (5 Books)
  {
    name: "Job",
    abbreviation: "Job",
    testament: "Old Testament",
    group: "Poetry & Wisdom",
    chapterCount: 42,
    summary: "The enduring sovereignty of God, suffering and steadfast faith, concluding with God's majestic revelation and double restoration.",
    chapters: {
      19: [
        { verse: 25, text: "For I know that my redeemer liveth, and that he shall stand at the latter day upon the earth:" }
      ],
      42: [
        { verse: 10, text: "And the LORD turned the captivity of Job, when he prayed for his friends: also the LORD gave Job twice as much as he had before." }
      ]
    }
  },
  {
    name: "Psalms",
    abbreviation: "Ps",
    testament: "Old Testament",
    group: "Poetry & Wisdom",
    chapterCount: 150,
    summary: "The inspired prayer and praise hymnbook of ancient Israel, revealing deep intimacy with God in sorrow, celebration, and spiritual victory.",
    chapters: {
      1: [
        { verse: 1, text: "Blessed is the man that walketh not in the counsel of the ungodly, nor standeth in the way of sinners, nor sitteth in the seat of the scornful." },
        { verse: 2, text: "But his delight is in the law of the LORD; and in his law doth he meditate day and night." },
        { verse: 3, text: "And he shall be like a tree planted by the rivers of water, that bringeth forth his fruit in his season; his leaf also shall not wither; and whatsoever he doeth shall prosper." }
      ],
      23: [
        { verse: 1, text: "The LORD is my shepherd; I shall not want." },
        { verse: 2, text: "He maketh me to lie down in green pastures: he leadeth me beside the still waters." },
        { verse: 3, text: "He restoreth my soul: he leadeth me in the paths of righteousness for his name's sake." },
        { verse: 4, text: "Yea, though I walk through the valley of the shadow of death, I will fear no evil: for thou art with me; thy rod and thy staff they comfort me." },
        { verse: 5, text: "Thou preparest a table before me in the presence of mine enemies: thou anointest my head with oil; my cup runneth over." },
        { verse: 6, text: "Surely goodness and mercy shall follow me all the days of my life: and I will dwell in the house of the LORD for ever." }
      ],
      91: [
        { verse: 1, text: "He that dwelleth in the secret place of the most High shall abide under the shadow of the Almighty." },
        { verse: 2, text: "I will say of the LORD, He is my refuge and my fortress: my God; in him will I trust." },
        { verse: 11, text: "For he shall give his angels charge over thee, to keep thee in all thy ways." }
      ],
      100: [
        { verse: 1, text: "Make a joyful noise unto the LORD, all ye lands." },
        { verse: 2, text: "Serve the LORD with gladness: come before his presence with singing." },
        { verse: 4, text: "Enter into his gates with thanksgiving, and into his courts with praise: be thankful unto him, and bless his name." }
      ]
    }
  },
  {
    name: "Proverbs",
    abbreviation: "Pro",
    testament: "Old Testament",
    group: "Poetry & Wisdom",
    chapterCount: 31,
    summary: "Godly wisdom, moral discernment, practical righteousness, diligence, and the fear of the Lord as the foundation of knowledge.",
    chapters: {
      3: [
        { verse: 5, text: "Trust in the LORD with all thine heart; and lean not unto thine own understanding." },
        { verse: 6, text: "In all thy ways acknowledge him, and he shall direct thy paths." }
      ],
      4: [
        { verse: 23, text: "Keep thy heart with all diligence; for out of it are the issues of life." }
      ],
      16: [
        { verse: 3, text: "Commit thy works unto the LORD, and thy thoughts shall be established." }
      ],
      22: [
        { verse: 29, text: "Seest thou a man diligent in his business? he shall stand before kings; he shall not stand before mean men." }
      ]
    }
  },
  {
    name: "Ecclesiastes",
    abbreviation: "Ecc",
    testament: "Old Testament",
    group: "Poetry & Wisdom",
    chapterCount: 12,
    summary: "The vanity of life under the sun apart from God, culminating in the supreme truth: fear God and keep His commandments.",
    chapters: {
      3: [
        { verse: 1, text: "To every thing there is a season, and a time to every purpose under the heaven:" },
        { verse: 11, text: "He hath made every thing beautiful in his time." }
      ],
      12: [
        { verse: 13, text: "Let us hear the conclusion of the whole matter: Fear God, and keep his commandments: for this is the whole duty of man." }
      ]
    }
  },
  {
    name: "Song of Solomon",
    abbreviation: "Son",
    testament: "Old Testament",
    group: "Poetry & Wisdom",
    chapterCount: 8,
    summary: "A poetic celebration of marital love, fidelity, and an allegory of Christ's unfailing love for His bride, the Church.",
    chapters: {
      2: [
        { verse: 4, text: "He brought me to the banqueting house, and his banner over me was love." }
      ],
      8: [
        { verse: 7, text: "Many waters cannot quench love, neither can the floods drown it." }
      ]
    }
  },

  // 4. Major Prophets (5 Books)
  {
    name: "Isaiah",
    abbreviation: "Isa",
    testament: "Old Testament",
    group: "Major Prophets",
    chapterCount: 66,
    summary: "The Evangelical Prophet: prophecies of judgment, the Suffering Servant (Christ), redemption, comfort, and the New Creation.",
    chapters: {
      9: [
        { verse: 6, text: "For unto us a child is born, unto us a son is given: and the government shall be upon his shoulder: and his name shall be called Wonderful, Counsellor, The mighty God, The everlasting Father, The Prince of Peace." }
      ],
      40: [
        { verse: 31, text: "But they that wait upon the LORD shall renew their strength; they shall mount up with wings as eagles; they shall run, and not be weary; and they shall walk, and not faint." }
      ],
      53: [
        { verse: 5, text: "But he was wounded for our transgressions, he was bruised for our iniquities: the chastisement of our peace was upon him; and with his stripes we are healed." }
      ],
      54: [
        { verse: 17, text: "No weapon that is formed against thee shall prosper; and every tongue that shall rise against thee in judgment thou shalt condemn. This is the heritage of the servants of the LORD, and their righteousness is of me, saith the LORD." }
      ]
    }
  },
  {
    name: "Jeremiah",
    abbreviation: "Jer",
    testament: "Old Testament",
    group: "Major Prophets",
    chapterCount: 52,
    summary: "The Weeping Prophet: calling Judah to repentance, warning of Babylonian captivity, and prophesying the New Covenant.",
    chapters: {
      29: [
        { verse: 11, text: "For I know the thoughts that I think toward you, saith the LORD, thoughts of peace, and not of evil, to give you an expected end." },
        { verse: 12, text: "Then shall ye call upon me, and ye shall go and pray unto me, and I will hearken unto you." },
        { verse: 13, text: "And ye shall seek me, and find me, when ye shall search for me with all your heart." }
      ],
      33: [
        { verse: 3, text: "Call unto me, and I will answer thee, and shew thee great and mighty things, which thou knowest not." }
      ]
    }
  },
  {
    name: "Lamentations",
    abbreviation: "Lam",
    testament: "Old Testament",
    group: "Major Prophets",
    chapterCount: 5,
    summary: "Jeremiah's poetic laments over the destruction of Jerusalem and the Temple, anchored in God's unending morning mercies.",
    chapters: {
      3: [
        { verse: 22, text: "It is of the LORD's mercies that we are not consumed, because his compassions fail not." },
        { verse: 23, text: "They are new every morning: great is thy faithfulness." },
        { verse: 24, text: "The LORD is my portion, saith my soul; therefore will I hope in him." }
      ]
    }
  },
  {
    name: "Ezekiel",
    abbreviation: "Eze",
    testament: "Old Testament",
    group: "Major Prophets",
    chapterCount: 48,
    summary: "Visions of God's glory among the exiles in Babylon, the valley of dry bones brought to life, and the new temple of the Spirit.",
    chapters: {
      36: [
        { verse: 26, text: "A new heart also will I give you, and a new spirit will I put within you: and I will take away the stony heart out of your flesh, and I will give you an heart of flesh." }
      ],
      37: [
        { verse: 4, text: "Again he said unto me, Prophesy upon these bones, and say unto them, O ye dry bones, hear the word of the LORD." },
        { verse: 5, text: "Thus saith the Lord GOD unto these bones; Behold, I will cause breath to enter into you, and ye shall live:" }
      ]
    }
  },
  {
    name: "Daniel",
    abbreviation: "Dan",
    testament: "Old Testament",
    group: "Major Prophets",
    chapterCount: 12,
    summary: "Faithful courage in pagan Babylon: fiery furnace, lion's den, dream interpretations, and apocalyptic visions of God's eternal Kingdom.",
    chapters: {
      3: [
        { verse: 17, text: "If it be so, our God whom we serve is able to deliver us from the burning fiery furnace, and he will deliver us out of thine hand, O king." }
      ],
      6: [
        { verse: 22, text: "My God hath sent his angel, and hath shut the lions' mouths, that they have not hurt me:" }
      ],
      11: [
        { verse: 32, text: "The people that do know their God shall be strong, and do exploits." }
      ]
    }
  },

  // 5. Minor Prophets (12 Books)
  {
    name: "Hosea",
    abbreviation: "Hos",
    testament: "Old Testament",
    group: "Minor Prophets",
    chapterCount: 14,
    summary: "God's unconditional, redeeming love for unfaithful Israel illustrated through the prophet's marriage to Gomer.",
    chapters: {
      4: [
        { verse: 6, text: "My people are destroyed for lack of knowledge." }
      ],
      6: [
        { verse: 3, text: "Then shall we know, if we follow on to know the LORD: his going forth is prepared as the morning; and he shall come unto us as the rain, as the latter and former rain unto the earth." }
      ]
    }
  },
  {
    name: "Joel",
    abbreviation: "Joe",
    testament: "Old Testament",
    group: "Minor Prophets",
    chapterCount: 3,
    summary: "The locust plague, the Day of the Lord, repentance, and the glorious promise of the outpouring of the Holy Spirit upon all flesh.",
    chapters: {
      2: [
        { verse: 25, text: "And I will restore to you the years that the locust hath eaten, the cankerworm, and the caterpiller, and the palmerworm, my great army which I sent among you." },
        { verse: 28, text: "And it shall come to pass afterward, that I will pour out my spirit upon all flesh; and your sons and your daughters shall prophesy, your old men shall dream dreams, your young men shall see visions:" }
      ]
    }
  },
  {
    name: "Amos",
    abbreviation: "Amo",
    testament: "Old Testament",
    group: "Minor Prophets",
    chapterCount: 9,
    summary: "A herdsman prophet proclaiming divine justice, condemning hypocrisy and social oppression, and calling for righteousness to roll like a river.",
    chapters: {
      5: [
        { verse: 24, text: "But let judgment run down as waters, and righteousness as a mighty stream." }
      ]
    }
  },
  {
    name: "Obadiah",
    abbreviation: "Oba",
    testament: "Old Testament",
    group: "Minor Prophets",
    chapterCount: 1,
    summary: "Divine judgment on Edom for their pride and mistreatment of Judah, and the future restoration of Mount Zion.",
    chapters: {
      1: [
        { verse: 17, text: "But upon mount Zion shall be deliverance, and there shall be holiness; and the house of Jacob shall possess their possessions." }
      ]
    }
  },
  {
    name: "Jonah",
    abbreviation: "Jon",
    testament: "Old Testament",
    group: "Minor Prophets",
    chapterCount: 4,
    summary: "The reluctant prophet fleeing to Tarshish, swallowed by a great fish, preaching repentance to Nineveh, and God's wide compassion.",
    chapters: {
      2: [
        { verse: 9, text: "Salvation is of the LORD." }
      ]
    }
  },
  {
    name: "Micah",
    abbreviation: "Mic",
    testament: "Old Testament",
    group: "Minor Prophets",
    chapterCount: 7,
    summary: "Prophecies of judgment against corrupt leaders, the Bethlehem birthplace of the Messiah, and the requirement to do justly, love mercy, and walk humbly.",
    chapters: {
      5: [
        { verse: 2, text: "But thou, Beth-lehem Ephratah, though thou be little among the thousands of Judah, yet out of thee shall he come forth unto me that is to be ruler in Israel; whose goings forth have been from of old, from everlasting." }
      ],
      6: [
        { verse: 8, text: "He hath shewed thee, O man, what is good; and what doth the LORD require of thee, but to do justly, and to love mercy, and to walk humbly with thy God?" }
      ]
    }
  },
  {
    name: "Nahum",
    abbreviation: "Nah",
    testament: "Old Testament",
    group: "Minor Prophets",
    chapterCount: 3,
    summary: "The certainty of judgment and destruction upon the cruel Assyrian empire of Nineveh, declaring God as a refuge for those who trust Him.",
    chapters: {
      1: [
        { verse: 7, text: "The LORD is good, a strong hold in the day of trouble; and he knoweth them that trust in him." }
      ]
    }
  },
  {
    name: "Habakkuk",
    abbreviation: "Hab",
    testament: "Old Testament",
    group: "Minor Prophets",
    chapterCount: 3,
    summary: "A dialogue with God over injustice, concluding in triumphant faith: 'the just shall live by his faith' and rejoicing in the God of our salvation.",
    chapters: {
      2: [
        { verse: 4, text: "Behold, his soul which is lifted up is not upright in him: but the just shall live by his faith." },
        { verse: 14, text: "For the earth shall be filled with the knowledge of the glory of the LORD, as the waters cover the sea." }
      ],
      3: [
        { verse: 17, text: "Although the fig tree shall not blossom, neither shall fruit be in the vines; the labour of the olive shall fail, and the fields shall yield no meat; the flock shall be cut off from the fold, and there shall be no herd in the stalls:" },
        { verse: 18, text: "Yet I will rejoice in the LORD, I will joy in the God of my salvation." },
        { verse: 19, text: "The LORD God is my strength, and he will make my feet like hinds' feet, and he will make me to walk upon mine high places." }
      ]
    }
  },
  {
    name: "Zephaniah",
    abbreviation: "Zep",
    testament: "Old Testament",
    group: "Minor Prophets",
    chapterCount: 3,
    summary: "The coming Day of the Lord, calling the humble to seek righteousness, with promises of God rejoicing over His people with singing.",
    chapters: {
      3: [
        { verse: 17, text: "The LORD thy God in the midst of thee is mighty; he will save, he will rejoice over thee with joy; he will rest in his love, he will joy over thee with singing." }
      ]
    }
  },
  {
    name: "Haggai",
    abbreviation: "Hag",
    testament: "Old Testament",
    group: "Minor Prophets",
    chapterCount: 2,
    summary: "Urging the returned exiles to prioritize rebuilding God's house rather than their paneled homes, promising that the glory of the latter house shall be greater.",
    chapters: {
      2: [
        { verse: 9, text: "The glory of this latter house shall be greater than of the former, saith the LORD of hosts: and in this place will I give peace, saith the LORD of hosts." }
      ]
    }
  },
  {
    name: "Zechariah",
    abbreviation: "Zec",
    testament: "Old Testament",
    group: "Minor Prophets",
    chapterCount: 14,
    summary: "Visions encouraging the rebuilding of Jerusalem, prophecies of Messiah entering on a donkey, pierced for our transgressions, and reigning as King.",
    chapters: {
      4: [
        { verse: 6, text: "Then he answered and spake unto me, saying, This is the word of the LORD unto Zerubbabel, saying, Not by might, nor by power, but by my spirit, saith the LORD of hosts." }
      ],
      9: [
        { verse: 9, text: "Rejoice greatly, O daughter of Zion; shout, O daughter of Jerusalem: behold, thy King cometh unto thee: he is just, and having salvation; lowly, and riding upon an ass, and upon a colt the foal of an ass." }
      ]
    }
  },
  {
    name: "Malachi",
    abbreviation: "Mal",
    testament: "Old Testament",
    group: "Minor Prophets",
    chapterCount: 4,
    summary: "The final Old Testament message rebuking spiritual lethargy, tithe robbings, and prophesying the Sun of Righteousness and Elijah before Christ.",
    chapters: {
      3: [
        { verse: 10, text: "Bring ye all the tithes into the storehouse, that there may be meat in mine house, and prove me now herewith, saith the LORD of hosts, if I will not open you the windows of heaven, and pour you out a blessing, that there shall not be room enough to receive it." }
      ],
      4: [
        { verse: 2, text: "But unto you that fear my name shall the Sun of righteousness arise with healing in his wings; and ye shall go forth, and grow up as calves of the stall." }
      ]
    }
  },

  // ==================== NEW TESTAMENT (27 BOOKS) ====================
  // 1. Gospels (4 Books)
  {
    name: "Matthew",
    abbreviation: "Mat",
    testament: "New Testament",
    group: "Gospels",
    chapterCount: 28,
    summary: "Jesus Christ presented as the King of the Jews, the promised Messiah of Old Testament prophecy, the Sermon on the Mount, and the Great Commission.",
    chapters: {
      5: [
        { verse: 3, text: "Blessed are the poor in spirit: for theirs is the kingdom of heaven." },
        { verse: 14, text: "Ye are the light of the world. A city that is set on an hill cannot be hid." },
        { verse: 16, text: "Let your light so shine before men, that they may see your good works, and glorify your Father which is in heaven." }
      ],
      6: [
        { verse: 33, text: "But seek ye first the kingdom of God, and his righteousness; and all these things shall be added unto you." }
      ],
      28: [
        { verse: 18, text: "And Jesus came and spake unto them, saying, All power is given unto me in heaven and in earth." },
        { verse: 19, text: "Go ye therefore, and teach all nations, baptizing them in the name of the Father, and of the Son, and of the Holy Ghost:" },
        { verse: 20, text: "Teaching them to observe all things whatsoever I have commanded you: and, lo, I am with you alway, even unto the end of the world. Amen." }
      ]
    }
  },
  {
    name: "Mark",
    abbreviation: "Mrk",
    testament: "New Testament",
    group: "Gospels",
    chapterCount: 16,
    summary: "The action-packed gospel presenting Jesus Christ as the suffering Servant and miracle-working Son of God.",
    chapters: {
      10: [
        { verse: 45, text: "For even the Son of man came not to be ministered unto, but to minister, and to give his life a ransom for many." }
      ],
      11: [
        { verse: 24, text: "Therefore I say unto you, What things soever ye desire, when ye pray, believe that ye receive them, and ye shall have them." }
      ],
      16: [
        { verse: 17, text: "And these signs shall follow them that believe; In my name shall they cast out devils; they shall speak with new tongues;" },
        { verse: 18, text: "They shall take up serpents; and if they drink any deadly thing, it shall not hurt them; they shall lay hands on the sick, and they shall recover." }
      ]
    }
  },
  {
    name: "Luke",
    abbreviation: "Luk",
    testament: "New Testament",
    group: "Gospels",
    chapterCount: 24,
    summary: "The compassionate physician presenting Jesus as the Son of Man who came to seek and to save that which was lost.",
    chapters: {
      1: [
        { verse: 37, text: "For with God nothing shall be impossible." }
      ],
      10: [
        { verse: 19, text: "Behold, I give unto you power to tread on serpents and scorpions, and over all the power of the enemy: and nothing shall by any means hurt you." }
      ]
    }
  },
  {
    name: "John",
    abbreviation: "Jhn",
    testament: "New Testament",
    group: "Gospels",
    chapterCount: 21,
    summary: "The Gospel of belief presenting Jesus as the Eternal Word made flesh, the seven 'I AM' declarations, and the way to everlasting life.",
    chapters: {
      1: [
        { verse: 1, text: "In the beginning was the Word, and the Word was with God, and the Word was God." },
        { verse: 12, text: "But as many as received him, to them gave he power to become the sons of God, even to them that believe on his name:" },
        { verse: 14, text: "And the Word was made flesh, and dwelt among us, (and we beheld his glory, the glory as of the only begotten of the Father,) full of grace and truth." }
      ],
      3: [
        { verse: 16, text: "For God so loved the world, that he gave his only begotten Son, that whosoever believeth in him should not perish, but have everlasting life." }
      ],
      14: [
        { verse: 6, text: "Jesus saith unto him, I am the way, the truth, and the life: no man cometh unto the Father, but by me." },
        { verse: 27, text: "Peace I leave with you, my peace I give unto you: not as the world giveth, give I unto you. Let not your heart be troubled, neither let it be afraid." }
      ],
      15: [
        { verse: 5, text: "I am the vine, ye are the branches: He that abideth in me, and I in him, the same bringeth forth much fruit: for without me ye can do nothing." },
        { verse: 11, text: "These things have I spoken unto you, that my joy might remain in you, and that your joy might be full." }
      ]
    }
  },

  // 2. History (1 Book)
  {
    name: "Acts",
    abbreviation: "Act",
    testament: "New Testament",
    group: "History",
    chapterCount: 28,
    summary: "The descent of the Holy Spirit on Pentecost, the birth and missionary expansion of the early church, and Paul's apostolic journeys.",
    chapters: {
      1: [
        { verse: 8, text: "But ye shall receive power, after that the Holy Ghost is come upon you: and ye shall be witnesses unto me both in Jerusalem, and in all Judaea, and in Samaria, and unto the uttermost part of the earth." }
      ],
      2: [
        { verse: 1, text: "And when the day of Pentecost was fully come, they were all with one accord in one place." },
        { verse: 4, text: "And they were all filled with the Holy Ghost, and began to speak with other tongues, as the Spirit gave them utterance." }
      ],
      16: [
        { verse: 25, text: "And at midnight Paul and Silas prayed, and sang praises unto God: and the prisoners heard them." },
        { verse: 26, text: "And suddenly there was a great earthquake, so that the foundations of the prison were shaken: and immediately all the doors were opened, and every one's bands were loosed." }
      ]
    }
  },

  // 3. Pauline Epistles (14 Books including Hebrews)
  {
    name: "Romans",
    abbreviation: "Rom",
    testament: "New Testament",
    group: "Pauline Epistles",
    chapterCount: 16,
    summary: "The grand doctrinal masterwork on justification by faith in Christ alone, sanctification, sovereign grace, and Christian consecration.",
    chapters: {
      1: [
        { verse: 16, text: "For I am not ashamed of the gospel of Christ: for it is the power of God unto salvation to every one that believeth; to the Jew first, and also to the Greek." }
      ],
      8: [
        { verse: 1, text: "There is therefore now no condemnation to them which are in Christ Jesus, who walk not after the flesh, but after the Spirit." },
        { verse: 28, text: "And we know that all things work together for good to them that love God, to them who are the called according to his purpose." },
        { verse: 37, text: "Nay, in all these things we are more than conquerors through him that loved us." },
        { verse: 38, text: "For I am persuaded, that neither death, nor life, nor angels, nor principalities, nor powers, nor things present, nor things to come," },
        { verse: 39, text: "Nor height, nor depth, nor any other creature, shall be able to separate us from the love of God, which is in Christ Jesus our Lord." }
      ],
      12: [
        { verse: 1, text: "I beseech you therefore, brethren, by the mercies of God, that ye present your bodies a living sacrifice, holy, acceptable unto God, which is your reasonable service." },
        { verse: 2, text: "And be not conformed to this world: but be ye transformed by the renewing of your mind, that ye may prove what is that good, and acceptable, and perfect, will of God." }
      ]
    }
  },
  {
    name: "1 Corinthians",
    abbreviation: "1Co",
    testament: "New Testament",
    group: "Pauline Epistles",
    chapterCount: 16,
    summary: "Church order, holy living, the spiritual gifts of the Holy Spirit, the primacy of love, and the bodily resurrection of Christ.",
    chapters: {
      13: [
        { verse: 4, text: "Charity suffereth long, and is kind; charity envieth not; charity vaunteth not itself, is not puffed up," },
        { verse: 13, text: "And now abideth faith, hope, charity, these three; but the greatest of these is charity." }
      ],
      15: [
        { verse: 57, text: "But thanks be to God, which giveth us the victory through our Lord Jesus Christ." },
        { verse: 58, text: "Therefore, my beloved brethren, be ye stedfast, unmoveable, always abounding in the work of the Lord, forasmuch as ye know that your labour is not in vain in the Lord." }
      ]
    }
  },
  {
    name: "2 Corinthians",
    abbreviation: "2Co",
    testament: "New Testament",
    group: "Pauline Epistles",
    chapterCount: 13,
    summary: "Apostolic ministry, comfort in affliction, new creation in Christ, generous giving, and strength made perfect in human weakness.",
    chapters: {
      5: [
        { verse: 17, text: "Therefore if any man be in Christ, he is a new creature: old things are passed away; behold, all things are become new." }
      ],
      12: [
        { verse: 9, text: "And he said unto me, My grace is sufficient for thee: for my strength is made perfect in weakness. Most gladly therefore will I rather glory in my infirmities, that the power of Christ may rest upon me." }
      ]
    }
  },
  {
    name: "Galatians",
    abbreviation: "Gal",
    testament: "New Testament",
    group: "Pauline Epistles",
    chapterCount: 6,
    summary: "Christian freedom through the Gospel of grace versus legalism, walking in the Holy Spirit, and the Fruit of the Spirit.",
    chapters: {
      2: [
        { verse: 20, text: "I am crucified with Christ: nevertheless I live; yet not I, but Christ liveth in me: and the life which I now live in the flesh I live by the faith of the Son of God, who loved me, and gave himself for me." }
      ],
      5: [
        { verse: 22, text: "But the fruit of the Spirit is love, joy, peace, longsuffering, gentleness, goodness, faith," },
        { verse: 23, text: "Meekness, temperance: against such there is no law." }
      ]
    }
  },
  {
    name: "Ephesians",
    abbreviation: "Eph",
    testament: "New Testament",
    group: "Pauline Epistles",
    chapterCount: 6,
    summary: "The believer's spiritual blessings in heavenly places, the mystery of the Church, holy conduct in relationships, and the Whole Armor of God.",
    chapters: {
      2: [
        { verse: 8, text: "For by grace are ye saved through faith; and that not of yourselves: it is the gift of God:" },
        { verse: 9, text: "Not of works, lest any man should boast." },
        { verse: 10, text: "For we are his workmanship, created in Christ Jesus unto good works, which God hath before ordained that we should walk in them." }
      ],
      6: [
        { verse: 10, text: "Finally, my brethren, be strong in the Lord, and in the power of his might." },
        { verse: 11, text: "Put on the whole armour of God, that ye may be able to stand against the wiles of the devil." },
        { verse: 12, text: "For we wrestle not against flesh and blood, but against principalities, against powers, against the rulers of the darkness of this world, against spiritual wickedness in high places." }
      ]
    }
  },
  {
    name: "Philippians",
    abbreviation: "Php",
    testament: "New Testament",
    group: "Pauline Epistles",
    chapterCount: 4,
    summary: "The epistle of transcendent Christian joy written from prison: rejoicing in Christ, humility, pressing toward the prize, and God's supernatural peace.",
    chapters: {
      4: [
        { verse: 4, text: "Rejoice in the Lord alway: and again I say, Rejoice." },
        { verse: 6, text: "Be careful for nothing; but in every thing by prayer and supplication with thanksgiving let your requests be made known unto God." },
        { verse: 7, text: "And the peace of God, which passeth all understanding, shall keep your hearts and minds through Christ Jesus." },
        { verse: 13, text: "I can do all things through Christ which strengtheneth me." },
        { verse: 19, text: "But my God shall supply all your need according to his riches in glory by Christ Jesus." }
      ]
    }
  },
  {
    name: "Colossians",
    abbreviation: "Col",
    testament: "New Testament",
    group: "Pauline Epistles",
    chapterCount: 4,
    summary: "The absolute supremacy, preeminence, and sufficiency of Jesus Christ as Creator, Head of the Church, and source of all wisdom.",
    chapters: {
      1: [
        { verse: 16, text: "For by him were all things created, that are in heaven, and that are in earth, visible and invisible, whether they be thrones, or dominions, or principalities, or powers: all things were created by him, and for him:" },
        { verse: 27, text: "To whom God would make known what is the riches of the glory of this mystery among the Gentiles; which is Christ in you, the hope of glory:" }
      ],
      3: [
        { verse: 2, text: "Set your affection on things above, not on things on the earth." }
      ]
    }
  },
  {
    name: "1 Thessalonians",
    abbreviation: "1Th",
    testament: "New Testament",
    group: "Pauline Epistles",
    chapterCount: 5,
    summary: "Encouragement under persecution, living sanctified lives, joyful thanksgiving, and the Blessed Hope of Christ's return.",
    chapters: {
      5: [
        { verse: 16, text: "Rejoice evermore." },
        { verse: 17, text: "Pray without ceasing." },
        { verse: 18, text: "In every thing give thanks: for this is the will of God in Christ Jesus concerning you." }
      ]
    }
  },
  {
    name: "2 Thessalonians",
    abbreviation: "2Th",
    testament: "New Testament",
    group: "Pauline Epistles",
    chapterCount: 3,
    summary: "Clarifications regarding the Day of the Lord, perseverance in trials, resisting deception, and steadfast work.",
    chapters: {
      3: [
        { verse: 3, text: "But the Lord is faithful, who shall stablish you, and keep you from evil." }
      ]
    }
  },
  {
    name: "1 Timothy",
    abbreviation: "1Ti",
    testament: "New Testament",
    group: "Pauline Epistles",
    chapterCount: 6,
    summary: "Pastoral instructions on church leadership qualifications, sound doctrine, fighting the good fight of faith, and godliness with contentment.",
    chapters: {
      6: [
        { verse: 6, text: "But godliness with contentment is great gain." },
        { verse: 12, text: "Fight the good fight of faith, lay hold on eternal life, whereunto thou art also called, and hast professed a good profession before many witnesses." }
      ]
    }
  },
  {
    name: "2 Timothy",
    abbreviation: "2Ti",
    testament: "New Testament",
    group: "Pauline Epistles",
    chapterCount: 4,
    summary: "Paul's final poignant farewell: charging Timothy to be unashamed of the Gospel, enduring hardship, preaching the Word, and finishing the race.",
    chapters: {
      1: [
        { verse: 7, text: "For God hath not given us the spirit of fear; but of power, and of love, and of a sound mind." }
      ],
      3: [
        { verse: 16, text: "All scripture is given by inspiration of God, and is profitable for doctrine, for reproof, for correction, for instruction in righteousness:" }
      ],
      4: [
        { verse: 7, text: "I have fought a good fight, I have finished my course, I have kept the faith:" }
      ]
    }
  },
  {
    name: "Titus",
    abbreviation: "Tit",
    testament: "New Testament",
    group: "Pauline Epistles",
    chapterCount: 3,
    summary: "Pastoral guidance for ordering churches in Crete, appointing elders, sound teaching across generations, and grace training us to live godly lives.",
    chapters: {
      2: [
        { verse: 11, text: "For the grace of God that bringeth salvation hath appeared to all men," },
        { verse: 12, text: "Teaching us that, denying ungodliness and worldly lusts, we should live soberly, righteously, and godly, in this present world;" }
      ]
    }
  },
  {
    name: "Philemon",
    abbreviation: "Phm",
    testament: "New Testament",
    group: "Pauline Epistles",
    chapterCount: 1,
    summary: "A personal letter on Christian forgiveness, reconciliation, and receiving the runaway slave Onesimus back as a beloved brother in Christ.",
    chapters: {
      1: [
        { verse: 6, text: "That the communication of thy faith may become effectual by the acknowledging of every good thing which is in you in Christ Jesus." }
      ]
    }
  },
  {
    name: "Hebrews",
    abbreviation: "Heb",
    testament: "New Testament",
    group: "Pauline Epistles",
    chapterCount: 13,
    summary: "The surpassing superiority of Jesus Christ over angels, Moses, Aaron, and the Old Covenant, the great cloud of witnesses, and enduring faith.",
    chapters: {
      4: [
        { verse: 12, text: "For the word of God is quick, and powerful, and sharper than any twoedged sword, piercing even to the dividing asunder of soul and spirit, and of the joints and marrow, and is a discerner of the thoughts and intents of the heart." },
        { verse: 16, text: "Let us therefore come boldly unto the throne of grace, that we may obtain mercy, and find grace to help in time of need." }
      ],
      11: [
        { verse: 1, text: "Now faith is the substance of things hoped for, the evidence of things not seen." },
        { verse: 6, text: "But without faith it is impossible to please him: for he that cometh to God must believe that he is, and that he is a rewarder of them that diligently seek him." }
      ],
      12: [
        { verse: 1, text: "Wherefore seeing we also are compassed about with so great a cloud of witnesses, let us lay aside every weight, and the sin which doth so easily beset us, and let us run with patience the race that is set before us," },
        { verse: 2, text: "Looking unto Jesus the author and finisher of our faith; who for the joy that was set before him endured the cross, despising the shame, and is set down at the right hand of the throne of God." }
      ]
    }
  },

  // 4. General Epistles (7 Books)
  {
    name: "James",
    abbreviation: "Jas",
    testament: "New Testament",
    group: "General Epistles",
    chapterCount: 5,
    summary: "Practical faith demonstrated through deeds: counting trials joy, bridling the tongue, heavenly wisdom, and fervent effectual prayer.",
    chapters: {
      1: [
        { verse: 2, text: "My brethren, count it all joy when ye fall into divers temptations;" },
        { verse: 5, text: "If any of you lack wisdom, let him ask of God, that giveth to all men liberally, and upbraideth not; and it shall be given him." },
        { verse: 22, text: "But be ye doers of the word, and not hearers only, deceiving your own selves." }
      ],
      5: [
        { verse: 16, text: "The effectual fervent prayer of a righteous man availeth much." }
      ]
    }
  },
  {
    name: "1 Peter",
    abbreviation: "1Pe",
    testament: "New Testament",
    group: "General Epistles",
    chapterCount: 5,
    summary: "Living hope amidst fiery trials, holy living as a royal priesthood, casting all cares on God, and standing firm in grace.",
    chapters: {
      2: [
        { verse: 9, text: "But ye are a chosen generation, a royal priesthood, an holy nation, a peculiar people; that ye should shew forth the praises of him who hath called you out of darkness into his marvellous light:" }
      ],
      5: [
        { verse: 7, text: "Casting all your care upon him; for he careth for you." },
        { verse: 8, text: "Be sober, be vigilant; because your adversary the devil, as a roaring lion, walketh about, seeking whom he may devour:" }
      ]
    }
  },
  {
    name: "2 Peter",
    abbreviation: "2Pe",
    testament: "New Testament",
    group: "General Epistles",
    chapterCount: 3,
    summary: "Growing in spiritual grace and knowledge, divine promises, warning against false teachers, and the Day of the Lord.",
    chapters: {
      1: [
        { verse: 3, text: "According as his divine power hath given unto us all things that pertain unto life and godliness, through the knowledge of him that hath called us to glory and virtue:" }
      ],
      3: [
        { verse: 9, text: "The Lord is not slack concerning his promise, as some men count slackness; but is longsuffering to us-ward, not willing that any should perish, but that all should come to repentance." }
      ]
    }
  },
  {
    name: "1 John",
    abbreviation: "1Jn",
    testament: "New Testament",
    group: "General Epistles",
    chapterCount: 5,
    summary: "Walking in the light, fellowship with God, loving the brethren, knowing that we have eternal life, and overcoming the world.",
    chapters: {
      1: [
        { verse: 9, text: "If we confess our sins, he is faithful and just to forgive us our sins, and to cleanse us from all unrighteousness." }
      ],
      4: [
        { verse: 4, text: "Ye are of God, little children, and have overcome them: because greater is he that is in you, than he that is in the world." },
        { verse: 8, text: "He that loveth not knoweth not God; for God is love." }
      ],
      5: [
        { verse: 4, text: "For whatsoever is born of God overcometh the world: and this is the victory that overcometh the world, even our faith." }
      ]
    }
  },
  {
    name: "2 John",
    abbreviation: "2Jn",
    testament: "New Testament",
    group: "General Epistles",
    chapterCount: 1,
    summary: "Walking in truth and Christian love while guarding against deceivers and holding fast to the doctrine of Christ.",
    chapters: {
      1: [
        { verse: 6, text: "And this is love, that we walk after his commandments. This is the commandment, That, as ye have heard from the beginning, ye should walk in it." }
      ]
    }
  },
  {
    name: "3 John",
    abbreviation: "3Jn",
    testament: "New Testament",
    group: "General Epistles",
    chapterCount: 1,
    summary: "Commending hospitality and supporting Christian workers in truth, with the apostolic prayer for health and soul prosperity.",
    chapters: {
      1: [
        { verse: 2, text: "Beloved, I wish above all things that thou mayest prosper and be in health, even as thy soul prospereth." }
      ]
    }
  },
  {
    name: "Jude",
    abbreviation: "Jud",
    testament: "New Testament",
    group: "General Epistles",
    chapterCount: 1,
    summary: "Contending earnestly for the faith once delivered unto the saints, building up yourselves in the most holy faith, and God's power to keep us from falling.",
    chapters: {
      1: [
        { verse: 24, text: "Now unto him that is able to keep you from falling, and to present you faultless before the presence of his glory with exceeding joy," },
        { verse: 25, text: "To the only wise God our Saviour, be glory and majesty, dominion and power, both now and ever. Amen." }
      ]
    }
  },

  // 5. Prophecy (1 Book)
  {
    name: "Revelation",
    abbreviation: "Rev",
    testament: "New Testament",
    group: "Prophecy",
    chapterCount: 22,
    summary: "The apocalypse of Jesus Christ: the final cosmic victory of the Lamb, the defeat of Satan, the New Jerusalem, and the eternal New Creation.",
    chapters: {
      1: [
        { verse: 8, text: "I am Alpha and Omega, the beginning and the ending, saith the Lord, which is, and which was, and which is to come, the Almighty." },
        { verse: 18, text: "I am he that liveth, and was dead; and, behold, I am alive for evermore, Amen; and have the keys of hell and of death." }
      ],
      21: [
        { verse: 4, text: "And God shall wipe away all tears from their eyes; and there shall be no more death, neither sorrow, nor crying, neither shall there be any more pain: for the former things are passed away." },
        { verse: 5, text: "And he that sat upon the throne said, Behold, I make all things new." }
      ],
      22: [
        { verse: 20, text: "He which testifieth these things saith, Surely I come quickly. Amen. Even so, come, Lord Jesus." },
        { verse: 21, text: "The grace of our Lord Jesus Christ be with you all. Amen." }
      ]
    }
  }
];

export interface SearchResultVerse {
  book: string;
  chapter: number;
  verse: number;
  text: string;
}

export function searchBibleVerses(query: string): SearchResultVerse[] {
  if (!query || !query.trim()) return [];
  const clean = query.trim().toLowerCase();
  const results: SearchResultVerse[] = [];

  for (const book of BIBLE_BOOKS_CATALOG) {
    for (const [chStr, verses] of Object.entries(book.chapters)) {
      const chNum = parseInt(chStr, 10);
      for (const v of verses) {
        if (
          v.text.toLowerCase().includes(clean) ||
          book.name.toLowerCase().includes(clean) ||
          `${book.name.toLowerCase()} ${chNum}`.includes(clean) ||
          `${book.name.toLowerCase()} ${chNum}:${v.verse}`.includes(clean)
        ) {
          results.push({
            book: book.name,
            chapter: chNum,
            verse: v.verse,
            text: v.text
          });
        }
      }
    }
  }

  return results;
}
