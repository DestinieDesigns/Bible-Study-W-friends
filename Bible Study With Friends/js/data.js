(function () {
  const bibleBooks = [
    {
      id: "genesis",
      name: "Genesis",
      testament: "Old Testament",
      category: "Law",
      order: 1,
      chaptersCount: 50,
      shortDescription: "The book of beginnings: creation, the fall, the flood, and God's covenant promises."
    },
    {
      id: "exodus",
      name: "Exodus",
      testament: "Old Testament",
      category: "Law",
      order: 2,
      chaptersCount: 40,
      shortDescription: "Israel is delivered from Egypt and brought into covenant with God."
    },
    {
      id: "leviticus",
      name: "Leviticus",
      testament: "Old Testament",
      category: "Law",
      order: 3,
      chaptersCount: 27,
      shortDescription: "Instructions for holiness, worship, sacrifice, and priestly service."
    },
    {
      id: "numbers",
      name: "Numbers",
      testament: "Old Testament",
      category: "Law",
      order: 4,
      chaptersCount: 36,
      shortDescription: "Israel's wilderness journey, testing, and preparation for the promised land."
    },
    {
      id: "deuteronomy",
      name: "Deuteronomy",
      testament: "Old Testament",
      category: "Law",
      order: 5,
      chaptersCount: 34,
      shortDescription: "Moses reviews God's law and calls Israel to covenant faithfulness."
    },
    {
      id: "joshua",
      name: "Joshua",
      testament: "Old Testament",
      category: "History",
      order: 6,
      chaptersCount: 24,
      shortDescription: "Israel enters and settles the promised land under Joshua's leadership."
    },
    {
      id: "judges",
      name: "Judges",
      testament: "Old Testament",
      category: "History",
      order: 7,
      chaptersCount: 21,
      shortDescription: "Cycles of rebellion, rescue, and spiritual decline in Israel."
    },
    {
      id: "ruth",
      name: "Ruth",
      testament: "Old Testament",
      category: "History",
      order: 8,
      chaptersCount: 4,
      shortDescription: "A story of loyalty, redemption, and God's providence in ordinary life."
    },
    {
      id: "1-samuel",
      name: "1 Samuel",
      testament: "Old Testament",
      category: "History",
      order: 9,
      chaptersCount: 31,
      shortDescription: "The transition from judges to kings, including Samuel, Saul, and David."
    },
    {
      id: "2-samuel",
      name: "2 Samuel",
      testament: "Old Testament",
      category: "History",
      order: 10,
      chaptersCount: 24,
      shortDescription: "David's reign, victories, failures, and covenant promise."
    },
    {
      id: "1-kings",
      name: "1 Kings",
      testament: "Old Testament",
      category: "History",
      order: 11,
      chaptersCount: 22,
      shortDescription: "Solomon's reign, the temple, and the kingdom's division."
    },
    {
      id: "2-kings",
      name: "2 Kings",
      testament: "Old Testament",
      category: "History",
      order: 12,
      chaptersCount: 25,
      shortDescription: "The decline of Israel and Judah leading to exile."
    },
    {
      id: "1-chronicles",
      name: "1 Chronicles",
      testament: "Old Testament",
      category: "History",
      order: 13,
      chaptersCount: 29,
      shortDescription: "Genealogies and David's reign with emphasis on worship and temple preparation."
    },
    {
      id: "2-chronicles",
      name: "2 Chronicles",
      testament: "Old Testament",
      category: "History",
      order: 14,
      chaptersCount: 36,
      shortDescription: "The history of Judah, the temple, reform, and exile."
    },
    {
      id: "ezra",
      name: "Ezra",
      testament: "Old Testament",
      category: "History",
      order: 15,
      chaptersCount: 10,
      shortDescription: "The return from exile and the rebuilding of the temple."
    },
    {
      id: "nehemiah",
      name: "Nehemiah",
      testament: "Old Testament",
      category: "History",
      order: 16,
      chaptersCount: 13,
      shortDescription: "Jerusalem's walls are rebuilt with prayer, courage, and reform."
    },
    {
      id: "esther",
      name: "Esther",
      testament: "Old Testament",
      category: "History",
      order: 17,
      chaptersCount: 10,
      shortDescription: "God's providence preserves His people through Queen Esther's courage."
    },
    {
      id: "job",
      name: "Job",
      testament: "Old Testament",
      category: "Poetry & Wisdom",
      order: 18,
      chaptersCount: 42,
      shortDescription: "A profound exploration of suffering, faith, and God's wisdom."
    },
    {
      id: "psalms",
      name: "Psalms",
      testament: "Old Testament",
      category: "Poetry & Wisdom",
      order: 19,
      chaptersCount: 150,
      shortDescription: "Songs and prayers of worship, lament, trust, and praise."
    },
    {
      id: "proverbs",
      name: "Proverbs",
      testament: "Old Testament",
      category: "Poetry & Wisdom",
      order: 20,
      chaptersCount: 31,
      shortDescription: "Practical wisdom for godly living, speech, relationships, and work."
    },
    {
      id: "ecclesiastes",
      name: "Ecclesiastes",
      testament: "Old Testament",
      category: "Poetry & Wisdom",
      order: 21,
      chaptersCount: 12,
      shortDescription: "A search for meaning that leads back to fearing God."
    },
    {
      id: "song-of-solomon",
      name: "Song of Solomon",
      testament: "Old Testament",
      category: "Poetry & Wisdom",
      order: 22,
      chaptersCount: 8,
      shortDescription: "Poetry celebrating love, beauty, and covenant affection."
    },
    {
      id: "isaiah",
      name: "Isaiah",
      testament: "Old Testament",
      category: "Major Prophets",
      order: 23,
      chaptersCount: 66,
      shortDescription: "Prophecy of judgment, holiness, comfort, and the coming Messiah."
    },
    {
      id: "jeremiah",
      name: "Jeremiah",
      testament: "Old Testament",
      category: "Major Prophets",
      order: 24,
      chaptersCount: 52,
      shortDescription: "Warnings to Judah, calls to repentance, and hope for a new covenant."
    },
    {
      id: "lamentations",
      name: "Lamentations",
      testament: "Old Testament",
      category: "Major Prophets",
      order: 25,
      chaptersCount: 5,
      shortDescription: "Poetic grief over Jerusalem's destruction, marked by sorrow and hope."
    },
    {
      id: "ezekiel",
      name: "Ezekiel",
      testament: "Old Testament",
      category: "Major Prophets",
      order: 26,
      chaptersCount: 48,
      shortDescription: "Visions of judgment, God's glory, restoration, and renewed worship."
    },
    {
      id: "daniel",
      name: "Daniel",
      testament: "Old Testament",
      category: "Major Prophets",
      order: 27,
      chaptersCount: 12,
      shortDescription: "Faithful witness in exile and powerful visions of future kingdoms."
    },
    {
      id: "hosea",
      name: "Hosea",
      testament: "Old Testament",
      category: "Minor Prophets",
      order: 28,
      chaptersCount: 14,
      shortDescription: "God's steadfast love is pictured through Hosea's difficult marriage."
    },
    {
      id: "joel",
      name: "Joel",
      testament: "Old Testament",
      category: "Minor Prophets",
      order: 29,
      chaptersCount: 3,
      shortDescription: "A call to repentance and a promise of God's Spirit."
    },
    {
      id: "amos",
      name: "Amos",
      testament: "Old Testament",
      category: "Minor Prophets",
      order: 30,
      chaptersCount: 9,
      shortDescription: "Justice, righteousness, and God's warning against empty religion."
    },
    {
      id: "obadiah",
      name: "Obadiah",
      testament: "Old Testament",
      category: "Minor Prophets",
      order: 31,
      chaptersCount: 1,
      shortDescription: "A brief prophecy against Edom and a promise of the Lord's kingdom."
    },
    {
      id: "jonah",
      name: "Jonah",
      testament: "Old Testament",
      category: "Minor Prophets",
      order: 32,
      chaptersCount: 4,
      shortDescription: "God's mercy reaches even enemies through Jonah's reluctant mission."
    },
    {
      id: "micah",
      name: "Micah",
      testament: "Old Testament",
      category: "Minor Prophets",
      order: 33,
      chaptersCount: 7,
      shortDescription: "Judgment, justice, and the hope of a coming ruler from Bethlehem."
    },
    {
      id: "nahum",
      name: "Nahum",
      testament: "Old Testament",
      category: "Minor Prophets",
      order: 34,
      chaptersCount: 3,
      shortDescription: "Judgment against Nineveh and assurance of God's justice."
    },
    {
      id: "habakkuk",
      name: "Habakkuk",
      testament: "Old Testament",
      category: "Minor Prophets",
      order: 35,
      chaptersCount: 3,
      shortDescription: "A prophet wrestles with evil and learns to live by faith."
    },
    {
      id: "zephaniah",
      name: "Zephaniah",
      testament: "Old Testament",
      category: "Minor Prophets",
      order: 36,
      chaptersCount: 3,
      shortDescription: "The day of the Lord brings judgment and hope for the humble."
    },
    {
      id: "haggai",
      name: "Haggai",
      testament: "Old Testament",
      category: "Minor Prophets",
      order: 37,
      chaptersCount: 2,
      shortDescription: "The people are urged to rebuild the temple and honor God first."
    },
    {
      id: "zechariah",
      name: "Zechariah",
      testament: "Old Testament",
      category: "Minor Prophets",
      order: 38,
      chaptersCount: 14,
      shortDescription: "Visions of restoration, cleansing, and the coming King."
    },
    {
      id: "malachi",
      name: "Malachi",
      testament: "Old Testament",
      category: "Minor Prophets",
      order: 39,
      chaptersCount: 4,
      shortDescription: "A final prophetic call to covenant faithfulness before the New Testament."
    },
    {
      id: "matthew",
      name: "Matthew",
      testament: "New Testament",
      category: "Gospels",
      order: 40,
      chaptersCount: 28,
      shortDescription: "Jesus is presented as the promised King and fulfillment of Scripture."
    },
    {
      id: "mark",
      name: "Mark",
      testament: "New Testament",
      category: "Gospels",
      order: 41,
      chaptersCount: 16,
      shortDescription: "A fast-moving account of Jesus' actions, authority, and sacrifice."
    },
    {
      id: "luke",
      name: "Luke",
      testament: "New Testament",
      category: "Gospels",
      order: 42,
      chaptersCount: 24,
      shortDescription: "An orderly account of Jesus' life, compassion, and saving mission."
    },
    {
      id: "john",
      name: "John",
      testament: "New Testament",
      category: "Gospels",
      order: 43,
      chaptersCount: 21,
      shortDescription: "Jesus is revealed as the Son of God so readers may believe and have life."
    },
    {
      id: "acts",
      name: "Acts",
      testament: "New Testament",
      category: "Church History",
      order: 44,
      chaptersCount: 28,
      shortDescription: "The early church spreads the gospel through the power of the Holy Spirit."
    },
    {
      id: "romans",
      name: "Romans",
      testament: "New Testament",
      category: "Pauline Epistles",
      order: 45,
      chaptersCount: 16,
      shortDescription: "A deep explanation of the gospel, salvation, grace, and Christian living."
    },
    {
      id: "1-corinthians",
      name: "1 Corinthians",
      testament: "New Testament",
      category: "Pauline Epistles",
      order: 46,
      chaptersCount: 16,
      shortDescription: "Paul addresses church problems, worship, unity, and resurrection hope."
    },
    {
      id: "2-corinthians",
      name: "2 Corinthians",
      testament: "New Testament",
      category: "Pauline Epistles",
      order: 47,
      chaptersCount: 13,
      shortDescription: "Paul defends his ministry and points to God's strength in weakness."
    },
    {
      id: "galatians",
      name: "Galatians",
      testament: "New Testament",
      category: "Pauline Epistles",
      order: 48,
      chaptersCount: 6,
      shortDescription: "Freedom in Christ is defended against legalism and false teaching."
    },
    {
      id: "ephesians",
      name: "Ephesians",
      testament: "New Testament",
      category: "Pauline Epistles",
      order: 49,
      chaptersCount: 6,
      shortDescription: "The believer's identity, unity, and spiritual strength in Christ."
    },
    {
      id: "philippians",
      name: "Philippians",
      testament: "New Testament",
      category: "Pauline Epistles",
      order: 50,
      chaptersCount: 4,
      shortDescription: "A joyful letter about Christlike humility, faithfulness, and peace."
    },
    {
      id: "colossians",
      name: "Colossians",
      testament: "New Testament",
      category: "Pauline Epistles",
      order: 51,
      chaptersCount: 4,
      shortDescription: "The supremacy of Christ is central for doctrine and daily life."
    },
    {
      id: "1-thessalonians",
      name: "1 Thessalonians",
      testament: "New Testament",
      category: "Pauline Epistles",
      order: 52,
      chaptersCount: 5,
      shortDescription: "Encouragement in holy living, hope, and Christ's return."
    },
    {
      id: "2-thessalonians",
      name: "2 Thessalonians",
      testament: "New Testament",
      category: "Pauline Epistles",
      order: 53,
      chaptersCount: 3,
      shortDescription: "Correction about the day of the Lord and a call to steady faithfulness."
    },
    {
      id: "1-timothy",
      name: "1 Timothy",
      testament: "New Testament",
      category: "Pauline Epistles",
      order: 54,
      chaptersCount: 6,
      shortDescription: "Guidance for church leadership, doctrine, and godly conduct."
    },
    {
      id: "2-timothy",
      name: "2 Timothy",
      testament: "New Testament",
      category: "Pauline Epistles",
      order: 55,
      chaptersCount: 4,
      shortDescription: "Paul's final charge to remain faithful, courageous, and grounded in Scripture."
    },
    {
      id: "titus",
      name: "Titus",
      testament: "New Testament",
      category: "Pauline Epistles",
      order: 56,
      chaptersCount: 3,
      shortDescription: "Instruction for sound doctrine, leadership, and good works."
    },
    {
      id: "philemon",
      name: "Philemon",
      testament: "New Testament",
      category: "Pauline Epistles",
      order: 57,
      chaptersCount: 1,
      shortDescription: "A personal appeal that displays forgiveness, reconciliation, and Christian love."
    },
    {
      id: "hebrews",
      name: "Hebrews",
      testament: "New Testament",
      category: "General Epistles",
      order: 58,
      chaptersCount: 13,
      shortDescription: "Jesus is shown as greater than all, the perfect priest and sacrifice."
    },
    {
      id: "james",
      name: "James",
      testament: "New Testament",
      category: "General Epistles",
      order: 59,
      chaptersCount: 5,
      shortDescription: "Practical wisdom that connects real faith with everyday obedience."
    },
    {
      id: "1-peter",
      name: "1 Peter",
      testament: "New Testament",
      category: "General Epistles",
      order: 60,
      chaptersCount: 5,
      shortDescription: "Hope and perseverance for believers facing suffering."
    },
    {
      id: "2-peter",
      name: "2 Peter",
      testament: "New Testament",
      category: "General Epistles",
      order: 61,
      chaptersCount: 3,
      shortDescription: "A call to spiritual growth and vigilance against false teachers."
    },
    {
      id: "1-john",
      name: "1 John",
      testament: "New Testament",
      category: "General Epistles",
      order: 62,
      chaptersCount: 5,
      shortDescription: "Assurance, truth, and love mark those who walk with God."
    },
    {
      id: "2-john",
      name: "2 John",
      testament: "New Testament",
      category: "General Epistles",
      order: 63,
      chaptersCount: 1,
      shortDescription: "A short encouragement to continue in truth and love."
    },
    {
      id: "3-john",
      name: "3 John",
      testament: "New Testament",
      category: "General Epistles",
      order: 64,
      chaptersCount: 1,
      shortDescription: "A personal letter about hospitality, faithfulness, and good example."
    },
    {
      id: "jude",
      name: "Jude",
      testament: "New Testament",
      category: "General Epistles",
      order: 65,
      chaptersCount: 1,
      shortDescription: "A brief warning to contend for the faith against false teaching."
    },
    {
      id: "revelation",
      name: "Revelation",
      testament: "New Testament",
      category: "Prophecy",
      order: 66,
      chaptersCount: 22,
      shortDescription: "A vision of Christ's victory, final judgment, and the new creation."
    }
  ];

  window.ScripturePathData = {
    storageKey: "scripture-path-progress",
    bibleBooks: bibleBooks,
    dailyVerses: [
      {
        text: "Trust in the Lord with all thine heart; and lean not unto thine own understanding.",
        ref: "– Proverbs 3:5 (KJV)"
      },
      {
        text: "Thy word is a lamp unto my feet, and a light unto my path.",
        ref: "– Psalm 119:105 (KJV)"
      },
      {
        text: "I can do all things through Christ which strengtheneth me.",
        ref: "– Philippians 4:13 (KJV)"
      },
      {
        text: "Be strong and of a good courage; be not afraid, neither be thou dismayed: for the Lord thy God is with thee.",
        ref: "– Joshua 1:9 (KJV)"
      }
    ],
    books: {
      Genesis: [
        {
          title: "Genesis 1",
          summary: "God creates the heavens and the earth, forming light, land, living creatures, and humanity with purpose and order.",
          learn: [
            {
              heading: "God Begins With Purpose",
              bullets: [
                "Genesis 1 opens by declaring that God created the heavens and the earth.",
                "Creation is not random or accidental; it comes from God's intentional word.",
                "The chapter teaches that God is the true source of life, order, and meaning."
              ]
            },
            {
              heading: "God Brings Order",
              bullets: [
                "God separates light from darkness, waters from land, and fills creation step by step.",
                "Each day shows wisdom, structure, and design instead of chaos.",
                "The repeated phrase that creation was good reminds us that God's work is trustworthy."
              ]
            },
            {
              heading: "People Bear God's Image",
              bullets: [
                "Human beings are created in the image of God, which gives every person value and dignity.",
                "People are called to represent God well in the world and care for creation.",
                "Genesis 1 invites us to worship the Creator and live with gratitude and purpose."
              ]
            }
          ],
          practice: {
            intro: "Work through these checkpoints to slow down and notice what Genesis 1 reveals about God, creation, and your own purpose.",
            observationPrompt: "What repeated pattern or phrase do you notice in Genesis 1?",
            reflectionPrompt: "How does knowing that you were created by God with purpose shape the way you see your life today?",
            fillBlank: {
              prompt: "Fill in the blank: And God saw every thing that he had made, and, behold, it was very ____.",
              answer: "good",
              acceptableAnswers: ["good", "very good"]
            },
            successMessage: "Practice complete. You observed the chapter carefully, reflected personally, and finished the key fill-in checkpoint."
          },
          quiz: {
            passingScore: 3,
            questions: [
              {
                question: "What does Genesis 1 say God created in the beginning?",
                options: ["Only the earth", "The heavens and the earth", "Only the light", "The garden of Eden"],
                answerIndex: 1,
                explanation: "Genesis 1 begins by saying that God created the heavens and the earth."
              },
              {
                question: "What is repeated throughout Genesis 1 after God's creative work?",
                options: ["That people were confused", "That creation was good", "That the nations gathered", "That the temple was built"],
                answerIndex: 1,
                explanation: "The chapter repeatedly emphasizes that what God made was good."
              },
              {
                question: "What special truth is said about humanity in Genesis 1?",
                options: ["People were created in the image of God", "People were created before light", "People are equal to God", "People do not need creation"],
                answerIndex: 0,
                explanation: "Genesis 1 teaches that humanity was created in the image of God."
              }
            ]
          },
          readerText: "In the beginning, God creates light, sky, land, seas, plants, stars, animals, and people. The chapter emphasizes God's authority, goodness, and intentional design."
        },
        {
          title: "Genesis 2",
          summary: "God forms Adam, places him in the garden, gives responsibility, and creates Eve as a fitting companion.",
          learn: "Genesis 2 slows down to show relationship, calling, and care. People are made for communion with God, meaningful work, and one another.",
          practice: "Practice: Reflect on one responsibility God has given you and one relationship that needs patient care.",
          quiz: "Quiz complete: You recognized that Genesis 2 highlights purpose, companionship, and God's personal care.",
          readerText: "Genesis 2 focuses on the garden, Adam's calling, and God's provision of Eve. It presents work, worship, and companionship as gifts from God."
        },
        {
          title: "Genesis 3",
          summary: "The fall introduces temptation, disobedience, shame, and separation, yet God still responds with truth and mercy.",
          learn: "Genesis 3 explains why brokenness exists. It also shows that even after sin, God moves toward people instead of abandoning them.",
          practice: "Practice: Identify one area where you need honesty, repentance, or renewed trust in God today.",
          quiz: "Quiz complete: You traced how temptation led to sin and how God still met humanity with justice and mercy.",
          readerText: "Genesis 3 describes temptation, disobedience, blame, and the consequences of sin. Even in judgment, God speaks and acts with mercy."
        }
      ],
      John: [
        {
          title: "John 1",
          summary: "Jesus is introduced as the eternal Word, full of grace and truth, bringing light into the world.",
          learn: "John 1 presents Jesus as more than a teacher. He is the living Word through whom life and light come to humanity.",
          practice: "Practice: Write one phrase from John 1 that helps you understand who Jesus is and why that matters.",
          quiz: "Quiz complete: You identified Jesus as the Word, the Light, and the One who reveals God's grace and truth.",
          readerText: "John 1 introduces Jesus as the eternal Word. It shows that life and light are found in Him and that He makes the Father known."
        },
        {
          title: "John 2",
          summary: "Jesus turns water into wine and cleanses the temple, revealing both His glory and His authority.",
          learn: "John 2 shows that Jesus transforms what is empty and also confronts what is false. His signs reveal His identity and invite belief.",
          practice: "Practice: Think about one area of life Jesus needs to restore and one area He may need to cleanse.",
          quiz: "Quiz complete: You saw that Jesus reveals His glory through both compassion and holy authority.",
          readerText: "John 2 contains the wedding at Cana and the temple cleansing. The chapter highlights Jesus' glory, compassion, and rightful authority."
        },
        {
          title: "John 3",
          summary: "Jesus teaches Nicodemus about new birth and reveals God's love for the world through salvation in Him.",
          learn: "John 3 centers on spiritual rebirth and God's saving love. Transformation begins not with effort alone, but with the work of God's Spirit.",
          practice: "Practice: Reflect on what it means to be spiritually renewed and how God's love changes your response to Him.",
          quiz: "Quiz complete: You connected new birth, faith, and God's love as the center of John 3.",
          readerText: "John 3 features Jesus' conversation with Nicodemus and the message of new birth. It also centers on God's love and the call to believe."
        }
      ],
      Ezekiel: [
        {
          title: "Ezekiel 1",
          summary: "Ezekiel receives a dramatic vision of God's glory by the river Chebar, with living creatures, wheels full of eyes, and the radiant likeness above the throne.",
          learn: [
            {
              heading: "Setting Of The Vision",
              bullets: [
                "Ezekiel receives this vision while living among the captives by the river Chebar.",
                "The chapter begins with heaven opening and God giving Ezekiel a prophetic vision.",
                "This reminds readers that God still speaks even in exile and disruption."
              ]
            },
            {
              heading: "What Ezekiel Saw",
              bullets: [
                "A stormy cloud, flashing fire, and bright brightness introduce the majesty of God's presence.",
                "Four living creatures appear, each with multiple faces and powerful movement.",
                "Wheels beside the creatures move in perfect harmony, showing order, power, and divine direction."
              ]
            },
            {
              heading: "Main Meaning",
              bullets: [
                "God's glory is not limited to Jerusalem; He is present and sovereign even in Babylon.",
                "The vision prepares Ezekiel for a difficult prophetic calling.",
                "The chapter invites awe, humility, and trust in God's rule."
              ]
            }
          ],
          practice: {
            intro: "Work through these short activities to notice what stands out in the vision and how it speaks to your own trust in God.",
            observationPrompt: "What is one image from Ezekiel 1 that feels powerful or surprising to you?",
            reflectionPrompt: "How does this vision challenge the idea that God is absent during confusion or exile?",
            fillBlank: {
              prompt: "Fill in the blank: Ezekiel saw wheels full of ____.",
              answer: "eyes",
              acceptableAnswers: ["eyes"]
            },
            successMessage: "Practice complete. You noticed the imagery, reflected on God's presence, and filled in the key detail correctly."
          },
          quiz: {
            passingScore: 3,
            questions: [
              {
                question: "Where was Ezekiel when he received the vision in chapter 1?",
                options: ["At the temple in Jerusalem", "By the river Chebar", "On Mount Carmel", "In the wilderness"],
                answerIndex: 1,
                explanation: "Ezekiel says he was among the captives by the river Chebar when the heavens were opened."
              },
              {
                question: "What detail is specifically said about the wheels in Ezekiel's vision?",
                options: ["They were made of gold", "They were standing still", "They were full of eyes", "They were broken"],
                answerIndex: 2,
                explanation: "The wheels are described as full of eyes, emphasizing awareness and divine perception."
              },
              {
                question: "What does Ezekiel 1 mainly reveal about God?",
                options: ["God only rules in Jerusalem", "God's glory is distant and hidden", "God is present and sovereign even in exile", "God no longer speaks to His people"],
                answerIndex: 2,
                explanation: "The vision shows that God's glory and rule extend beyond the land of Judah."
              }
            ]
          },
          readerText: "Ezekiel 1 records the prophet's first great vision: storm, fire, living creatures, wheels full of eyes, and the radiant likeness above the throne. The chapter establishes God's glory, mobility, and sovereignty even in exile."
        },
        {
          title: "Ezekiel 2",
          summary: "God commissions Ezekiel to speak to a rebellious people and gives him the scroll of lamentation, mourning, and woe.",
          learn: "Ezekiel 2 continues the prophet's calling and shows that obedience matters even when people resist the message.",
          practice: "Practice: Think about one place where faithfulness matters even if others do not respond well.",
          quiz: "Quiz complete: You followed Ezekiel from vision into calling and saw that obedience comes before visible results.",
          readerText: "Ezekiel 2 shifts from vision to commission. God tells Ezekiel to stand, listen, and speak faithfully to a rebellious house."
        }
      ]
    }
  };
}());
