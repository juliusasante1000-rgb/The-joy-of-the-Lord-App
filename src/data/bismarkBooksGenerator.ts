import { Book, BookChapter } from "../types";

export interface BookTopicDefinition {
  title: string;
  author: string;
  category: string;
  badge: string;
  color: string;
  desc: string;
  tags: string[];
  chapters: {
    title: string;
    subtitle: string;
    content: string;
  }[];
}

export const CURATED_LIBRARY_BOOKS: BookTopicDefinition[] = [
  {
    title: "The Joy of the Lord is Our Strength",
    author: "Biblical Theological Institute",
    category: "Christian Devotion & Spiritual Warfare",
    badge: "Spiritual Classic",
    color: "from-amber-800 via-amber-950 to-stone-900",
    desc: "An exposition of Nehemiah 8:10 exploring divine joy as an impenetrable fortress, spiritual warfare through gladness, and supernatural endurance.",
    tags: ["Joy", "Spiritual Fortification", "Nehemiah 8:10", "Praise", "Victory"],
    chapters: [
      {
        title: "The Hebrew Mystery of 'Maoz': Joy as Fortress",
        subtitle: "Why Joy is Divine Fortification, Not Mere Emotion",
        content: "In Nehemiah 8:10, when the scribes read the Law, the people wept. But Nehemiah commanded them: 'Neither be ye sorry; for the joy of the Lord is your strength.' The Hebrew root for strength is 'Maoz'—a towering rock fortress, high defense, and insurmountable refuge. When life assaults your emotions, supernatural joy repairs the breaches in your wall."
      },
      {
        title: "The Midnight Earthquake: Joy Under Persecution",
        subtitle: "Acts 16 and the Power of Praising Through Pain",
        content: "Paul and Silas were chained in the innermost dungeon of Philippi. Bleeding and in stocks, at midnight they sang praises. Midnight joy releases earthquake power! Praise does not deny the reality of the prison; it declares the supreme lordship of God over the prison doors."
      },
      {
        title: "The Perpetual Feast: Abiding in Continuous Gladness",
        subtitle: "Cultivating Habitual Thanksgiving and Unshakable Peace",
        content: "Rejoicing is not an occasional emotional accident; it is an active spiritual discipline. In Philippians 4:4, Paul commands: 'Rejoice in the Lord alway: and again I say, Rejoice.' By speaking the promises of God daily, we establish an unbroken stream of heaven's strength in our mortal bodies."
      }
    ]
  },
  {
    title: "The Mathematics of Faith: Principles of Divine Multiplication",
    author: "Center for Faith & STEM Excellence",
    category: "Faith & Kingdom Principles",
    badge: "STEM & Theology",
    color: "from-indigo-900 via-slate-950 to-blue-900",
    desc: "Applying logical reasoning, exponential growth principles, and divine laws of the Kingdom to spiritual multiplication, stewardship, and faith.",
    tags: ["Mathematics", "Faith", "Multiplication", "Kingdom Laws", "Spiritual Growth"],
    chapters: [
      {
        title: "The Law of the Seed: Exponential Divine Calculus",
        subtitle: "How God Takes the Finite and Generates Infinite Fruit",
        content: "In natural mathematics, addition increases linearly (1 + 1 = 2). But in the divine calculus of the Kingdom, God operates on exponential geometric progressions: thirtyfold, sixtyfold, and an hundredfold (Mark 4:8). When you surrender your five loaves and two fish to Jesus, mathematical limitations dissolve into divine abundance."
      },
      {
        title: "Zero to One: The Miracle of Creation Ex Nihilo",
        subtitle: "Hebrews 11:3 and Quantum Realities of God's Word",
        content: "Hebrews 11:3 reveals that things which are seen were not made of things which do appear. Faith is the divine catalyst that translates invisible heavenly realities into tangible physical substance. God calls those things which be not as though they were (Romans 4:17)."
      },
      {
        title: "Vectors of Obedience: Magnitude and Direction in Destiny",
        subtitle: "Aligning Directional Trajectory with the Spirit's Leading",
        content: "A vector possesses both magnitude (energy) and direction (alignment). Much human labor fails not from lack of effort, but from misaligned angle. When faith is steered by the Holy Spirit, every step produces maximum kinetic Kingdom impact."
      }
    ]
  },
  {
    title: "Research Methods in Education: Empirical Inquiry and Rigor",
    author: "Department of Academic & Pedagogical Research",
    category: "Academic & Methodological Research",
    badge: "Academic Treatise",
    color: "from-slate-900 via-blue-950 to-indigo-950",
    desc: "A comprehensive guide to quantitative and qualitative research methodologies, hypothesis testing, sampling validity, and ethical scholarship.",
    tags: ["Research Methods", "Education", "Statistics", "Pedagogy", "Scholarship"],
    chapters: [
      {
        title: "Epistemological Foundations of Educational Research",
        subtitle: "Positivism, Constructivism, and Mixed-Methods Paradigms",
        content: "Rigorous educational research begins with clarity of paradigm. Whether employing positivist empirical measurements or constructivist qualitative insights, researchers must formulate precise hypotheses, control confounding variables, and ensure internal and external validity in study designs."
      },
      {
        title: "Sampling Techniques and Statistical Inference",
        subtitle: "Ensuring Representativeness and Eliminating Bias",
        content: "Stratified random sampling, confidence intervals, and multivariate regression analyses form the analytical backbone for evaluating curriculum efficacy. True research elevates educational policy above subjective speculation."
      },
      {
        title: "Action Research in the Modern Classroom",
        subtitle: "Iterative Cycles of Observation, Assessment, and Reform",
        content: "Educators who apply systematic action research become continuous innovators. By measuring student comprehension before and after pedagogical interventions, teachers establish data-driven excellence."
      }
    ]
  },
  {
    title: "Mathematics Pedagogy and Conceptual Mastery",
    author: "Mathematical Education Consortium",
    category: "Mathematics Education",
    badge: "Educational Mastery",
    color: "from-cyan-950 via-slate-900 to-blue-950",
    desc: "Transforming mathematics classrooms from rote memorization to visual reasoning, conceptual intuition, and joyful problem-solving.",
    tags: ["Mathematics", "Teaching", "Pedagogy", "Critical Thinking", "Mastery"],
    chapters: [
      {
        title: "De-mystifying Abstract Algebra and Geometry",
        subtitle: "From Concrete Manipulatives to Abstract Symbolic Logic",
        content: "Every student possesses inherent mathematical capacity when concepts are introduced through concrete visual models before moving to formal symbolic abstraction. Bridging intuitive geometry with analytical proof builds lasting confidence."
      },
      {
        title: "The Psychology of Mathematical Confidence",
        subtitle: "Overcoming Math Anxiety Through Scaffolded Discovery",
        content: "Math anxiety is not a lack of intelligence; it is a fear of error. By reframing errors as constructive data points in problem-solving, educators create a growth mindset that fosters creative mathematical genius."
      },
      {
        title: "Socratic Questioning and Proof Formulation",
        subtitle: "Developing Independent Logical Deduction in Young Minds",
        content: "Rather than giving formulas directly, guiding learners to discover mathematical invariants through structured questioning cements deep neurological connections and long-term retention."
      }
    ]
  },
  {
    title: "A Treatise on Pneumatology: The Holy Spirit in Church History",
    author: "Classic Reformed & Patristic Scholars",
    category: "Systematic Theology",
    badge: "Doctrinal Masterwork",
    color: "from-rose-950 via-purple-950 to-slate-900",
    desc: "An exhaustive historical and biblical investigation of the Person, gifts, operations, and sanctifying power of the Holy Spirit.",
    tags: ["Holy Spirit", "Pneumatology", "Church History", "Sanctification", "Spiritual Gifts"],
    chapters: [
      {
        title: "The Holy Spirit in the Old Testament and the Prophets",
        subtitle: "From the Brooding Ruach to the Prophetic Unction",
        content: "From Genesis 1:2 to Joel's promise of the outpoured Spirit upon all flesh, Scripture reveals the third Person of the Godhead as the active divine agent of creation, inspiration, and miraculous empowerment."
      },
      {
        title: "The Upper Room and the Age of the New Covenant",
        subtitle: "Acts 2 and the Infilling of Fire and Utterance",
        content: "The baptism of the Holy Ghost at Pentecost marked the dawn of an uncontainable global harvest. Believers are sealed, filled, and endowed with supernatural charismata for the edification of the Body of Christ."
      },
      {
        title: "Grieving Not the Spirit: Walking in Holiness and Power",
        subtitle: "Ephesians 4:30 and the Cultivation of Intimate Communion",
        content: "Power flows where purity is guarded. The Holy Spirit is symbolized as a gentle dove that rests upon hearts cleansed by the blood of Jesus and surrendered to His holy will."
      }
    ]
  },
  {
    title: "The Secret Key to Intercession: Unceasing Prayer and Fasting",
    author: "Sanctuary of Intercessory Prayer",
    category: "Prayer & Consecration",
    badge: "Devotional Guide",
    color: "from-blue-950 via-indigo-950 to-slate-900",
    desc: "Unlocking the spiritual laws of travailing prayer, midnight watchfulness, and fasting for personal and national revival.",
    tags: ["Intercession", "Prayer", "Fasting", "Watchfulness", "Spiritual Breakthrough"],
    chapters: [
      {
        title: "The Altar of Incense: Continual Prayer Before the Mercy Seat",
        subtitle: "Exodus 30 and the Heavenly Mechanics of Intercession",
        content: "In the tabernacle, the incense burned continually before the veil. In Revelation 8:3-5, the prayers of the saints are mingled with celestial fire and cast upon the earth, producing earthquakes of divine intervention."
      },
      {
        title: "The Isaiah 58 Fast: Loosing Bands of Wickedness",
        subtitle: "How Biblical Fasting Destroys Heavy Yokes and Unlocks Healing",
        content: "True fasting is not hunger strike; it is soul afflicting and flesh subordinating, causing your light to break forth as the morning and your health to spring forth speedily."
      },
      {
        title: "The Midnight Watch: Breaking Generational Strongholds",
        subtitle: "Seizing the Strategic Hour When Destinies Shift",
        content: "Between midnight and dawn, spiritual battles are settled. Like the psalmist who rose at midnight to praise God's righteous judgments, intercessors enforce Kingdom decrees while the world sleeps."
      }
    ]
  }
];

export const RICH_THEOLOGICAL_TOPICS = [
  { topic: "The Doctrine of Justification by Faith Alone", cat: "Systematic Theology", auth: "Historical Protestant Orthodoxy", color: "from-blue-900 to-indigo-950", badge: "Reformation Classic" },
  { topic: "The Names of God and Their Covenant Meaning", cat: "Biblical Exegesis", auth: "Hebraic & Biblical Studies Institute", color: "from-amber-900 to-stone-900", badge: "Biblical Exegesis" },
  { topic: "Spiritual Warfare and the Armor of God", cat: "Spiritual Warfare", auth: "Evangelical Defense Society", color: "from-red-950 to-slate-950", badge: "Kingdom Power" },
  { topic: "Foundations of Christian Ethics and Moral Philosophy", cat: "Apologetics & Philosophy", auth: "Christian Worldview Academy", color: "from-teal-950 to-slate-900", badge: "Philosophical Inquiry" },
  { topic: "The Epistle to the Romans: A Verse-by-Verse Commentary", cat: "Biblical Commentary", auth: "Expository Preaching Guild", color: "from-indigo-950 to-purple-950", badge: "Expository Study" },
  { topic: "Principles of Biblical Stewardship and Kingdom Wealth", cat: "Kingdom Principles", auth: "Stewardship & Governance Institute", color: "from-emerald-950 to-slate-900", badge: "Kingdom Stewardship" },
  { topic: "The Tabernacle of Moses: Shadow and Substance in Christ", cat: "Typology & Prophecy", auth: "Ancient Near East Biblical Society", color: "from-amber-950 to-rose-950", badge: "Christological Typology" },
  { topic: "Revival Fires: Lessons from the Great Awakenings", cat: "Church History", auth: "Revival History Society", color: "from-rose-950 to-stone-900", badge: "Revival History" },
  { topic: "The Book of Daniel and End-Time Prophetic Timelines", cat: "Eschatology", auth: "Prophetic Scriptures Research", color: "from-purple-950 to-slate-950", badge: "Prophetic Exegesis" },
  { topic: "The Seven Feasts of the Lord and Their Prophetic Fulfillment", cat: "Typology & Prophecy", auth: "Biblical Archaeology & Customs", color: "from-yellow-900 to-stone-900", badge: "Prophetic Calendar" },
  { topic: "Leadership Lessons from the Life of Nehemiah", cat: "Christian Leadership", auth: "Kingdom Leadership Institute", color: "from-slate-900 to-blue-950", badge: "Leadership Mastery" },
  { topic: "The Holy Spirit in the Epistles of the Apostle Paul", cat: "Pneumatology", auth: "Apostolic Doctrine Society", color: "from-sky-950 to-indigo-950", badge: "Pauline Theology" },
  { topic: "A History of the Early Church Martyrs and Apologists", cat: "Church History", auth: "Patristic Heritage Foundation", color: "from-stone-900 to-red-950", badge: "Martyrology" },
  { topic: "The Sovereignty of God and Human Responsibility", cat: "Systematic Theology", auth: "Theological Inquiry Review", color: "from-indigo-950 to-slate-950", badge: "Doctrinal Study" },
  { topic: "Covenant Relationships, Family and the Godly Home", cat: "Christian Family", auth: "Family & Covenant Ministries", color: "from-pink-950 to-slate-900", badge: "Covenant Family" },
  { topic: "The Power of the Blood of Jesus in Daily Victory", cat: "Spiritual Warfare", auth: "Sanctuary of Intercessory Prayer", color: "from-red-950 to-amber-950", badge: "Atonement & Victory" },
  { topic: "Mathematics, Physics and the Order of Creation", cat: "STEM & Faith", auth: "Faith & Scientific Inquiry Forum", color: "from-cyan-950 to-slate-950", badge: "Creation & Science" },
  { topic: "The Prophetic Ministry: Discerning Voice and Timing", cat: "Spiritual Gifts", auth: "School of the Prophets", color: "from-violet-950 to-slate-900", badge: "Prophetic Discernment" },
  { topic: "Counseling and Pastoral Care Through the Word of God", cat: "Pastoral Theology", auth: "Biblical Care Association", color: "from-teal-950 to-emerald-950", badge: "Pastoral Theology" },
  { topic: "Living in the Power of Resurrection Life", cat: "Christian Devotion & Spiritual Warfare", auth: "Excellence in Christian Thought", color: "from-amber-900 to-indigo-950", badge: "Resurrection Life" }
];

export function generateBismarkLibrary(): Book[] {
  const books: Book[] = [];

  // Add initial core curated works
  CURATED_LIBRARY_BOOKS.forEach((item, idx) => {
    books.push({
      id: `lib-core-book-${idx + 1}`,
      title: item.title,
      author: item.author,
      category: item.category,
      year: "Standard Edition",
      description: item.desc,
      coverColor: item.color,
      coverBadge: item.badge,
      tags: item.tags,
      totalChapters: item.chapters.length,
      chapters: item.chapters.map((ch, chIdx) => ({
        id: `lib-ch-${idx + 1}-${chIdx + 1}`,
        chapterNumber: chIdx + 1,
        title: ch.title,
        subtitle: ch.subtitle,
        estimatedMinutes: 6 + (chIdx % 3),
        content: ch.content
      }))
    });
  });

  const targetTotal = 400;
  const remainingCount = targetTotal - CURATED_LIBRARY_BOOKS.length;

  for (let idx = 0; idx < remainingCount; idx++) {
    const topicMeta = RICH_THEOLOGICAL_TOPICS[idx % RICH_THEOLOGICAL_TOPICS.length];
    const cycle = Math.floor(idx / RICH_THEOLOGICAL_TOPICS.length) + 1;
    const bookIndex = CURATED_LIBRARY_BOOKS.length + 1 + idx;
    const title = cycle === 1 ? topicMeta.topic : `${topicMeta.topic} (Volume ${cycle})`;

    books.push({
      id: `lib-book-${bookIndex}`,
      title,
      author: topicMeta.auth,
      category: topicMeta.cat,
      year: "Theological Edition",
      description: `A profound and rigorous study on ${topicMeta.topic.toLowerCase()}, analyzing foundational biblical texts, historical applications, and practical spiritual insights for modern discipleship.`,
      coverColor: topicMeta.color,
      coverBadge: topicMeta.badge,
      tags: [topicMeta.cat, "Biblical Studies", "Christian Wisdom", "Discipleship", "Sound Doctrine"],
      totalChapters: 3,
      chapters: [
        {
          id: `lib-ch-${bookIndex}-1`,
          chapterNumber: 1,
          title: `Biblical Foundations & Principles of ${topicMeta.topic}`,
          subtitle: "Exegesis, Hermeneutics, and Covenant Framework",
          estimatedMinutes: 6,
          content: `To build an enduring understanding of ${topicMeta.topic.toLowerCase()}, one must ground their thinking in the inspired Scriptures. As the Word of God reveals, truth is not a shifting philosophical opinion, but an eternal rock anchored in Christ Jesus. 'All scripture is given by inspiration of God, and is profitable for doctrine, for reproof, for correction, for instruction in righteousness' (2 Timothy 3:16).`
        },
        {
          id: `lib-ch-${bookIndex}-2`,
          chapterNumber: 2,
          title: "Theological Development & Practical Application",
          subtitle: "Living Out Kingdom Truth in Daily Conduct",
          estimatedMinutes: 7,
          content: `Doctrine must translate into holy conduct and active love. When believers grasp the spiritual realities of ${topicMeta.topic.toLowerCase()}, their prayers become fervent, their minds are renewed, and their daily labor is sanctified by the power of the Holy Spirit. 'Be ye doers of the word, and not hearers only' (James 1:22).`
        },
        {
          id: `lib-ch-${bookIndex}-3`,
          chapterNumber: 3,
          title: "Kingdom Legacy, Revival, and Generational Fruit",
          subtitle: "Passing the Torch of Truth to the Next Generation",
          estimatedMinutes: 6,
          content: `The ultimate test of sound doctrine is its capacity to bear fruit that remains across generations. By maintaining fidelity to biblical revelation and walking in the power of the resurrection, we prepare the way of the Lord and establish monuments of faith for future generations.`
        }
      ]
    });
  }

  return books;
}
