(function () {
  const data = window.ScripturePathData;
  const storage = window.ScripturePathStorage;
  const PROFILE_STORAGE_KEY = "scripture-path-profile";
  const FRIENDS_STORAGE_KEY = "scripture-path-friends";
  const USERS_STORAGE_KEY = "scripture-path-users";

  const state = {
    currentScreen: "homeScreen",
    currentBook: "Genesis",
    currentChapterIndex: 0,
    readingBook: "Genesis",
    readingChapterIndex: 0,
    practiceMode: "verse",
    versePracticeFilter: "All",
    booksLearningMode: "learn",
    booksCategoryFilter: "All Categories",
    progress: storage.loadProgress(),
    studyStepState: {},
    activeLessonQuiz: null,
    versePracticeQuestion: null,
    practiceCardRevealed: false,
    currentPracticeCard: null,
    timerMinutes: 15,
    timerRemainingSeconds: 900,
    timerRunning: false,
    timerIntervalId: null,
    userProfile: loadUserProfile(),
    registeredUsers: loadRegisteredUsers(),
    friends: loadFriends(),
    friendSearch: ""
  };

  const versePracticePool = [
    {
      prompt: '"Now after the death of Joshua it came to pass, that the children of Israel asked the Lord, saying, Who shall go up for us against the Canaanites first, to fight against them?"',
      answer: "Judges 1:1",
      label: "Judges Chapter 1: The Incomplete Conquest"
    },
    {
      prompt: '"And the Lord said, Judah shall go up: behold, I have delivered the land into his hand."',
      answer: "Judges 1:2",
      label: "Judges Chapter 1: The Incomplete Conquest"
    },
    {
      prompt: '"And Caleb said, He that smiteth Kirjathsepher, and taketh it, to him will I give Achsah my daughter to wife."',
      answer: "Judges 1:12",
      label: "Judges Chapter 1: The Incomplete Conquest"
    },
    {
      prompt: '"And the children of Benjamin did not drive out the Jebusites that inhabited Jerusalem..."',
      answer: "Judges 1:21",
      label: "Judges Chapter 1: The Incomplete Conquest"
    },
    {
      prompt: '"And an angel of the Lord came up from Gilgal to Bochim, and said, I made you to go up out of Egypt..."',
      answer: "Judges 2:1",
      label: "Judges Chapter 2: The Angel at Bochim & The Cycle"
    },
    {
      prompt: '"And they called the name of that place Bochim: and they sacrificed there unto the Lord."',
      answer: "Judges 2:5",
      label: "Judges Chapter 2: The Angel at Bochim & The Cycle"
    },
    {
      prompt: '"And the children of Israel did evil in the sight of the Lord, and served Baalim:"',
      answer: "Judges 2:11",
      label: "Judges Chapter 2: The Angel at Bochim & The Cycle"
    },
    {
      prompt: '"Nevertheless the Lord raised up judges, which delivered them out of the hand of those that spoiled them."',
      answer: "Judges 2:16",
      label: "Judges Chapter 2: The Angel at Bochim & The Cycle"
    },
    {
      prompt: '"And the Spirit of the Lord came upon him, and he judged Israel, and went out to war..."',
      answer: "Judges 3:10",
      label: "Judges Chapter 3: Othniel, Ehud, and Shamgar"
    },
    {
      prompt: '"But when the children of Israel cried unto the Lord, the Lord raised them up a deliverer, Ehud the son of Gera, a Benjamite, a man lefthanded..."',
      answer: "Judges 3:15",
      label: "Judges Chapter 3: Othniel, Ehud, and Shamgar"
    },
    {
      prompt: '"And Ehud said, I have a message from God unto thee. And he arose out of his seat."',
      answer: "Judges 3:20",
      label: "Judges Chapter 3: Othniel, Ehud, and Shamgar"
    },
    {
      prompt: '"And after him was Shamgar the son of Anath, which slew of the Philistines six hundred men with an ox goad: and he also delivered Israel."',
      answer: "Judges 3:31",
      label: "Judges Chapter 3: Othniel, Ehud, and Shamgar"
    },
    {
      prompt: '"And Deborah, a prophetess, the wife of Lapidoth, she judged Israel at that time."',
      answer: "Judges 4:4",
      label: "Judges Chapter 4: Deborah, Barak, and Jael"
    },
    {
      prompt: '"And Barak said unto her, If thou wilt go with me, then I will go: but if thou wilt not go with me, then I will not go."',
      answer: "Judges 4:8",
      label: "Judges Chapter 4: Deborah, Barak, and Jael"
    },
    {
      prompt: '"And Deborah said unto Barak, Up; for this is the day in which the Lord hath delivered Sisera into thine hand: is not the Lord gone out before thee?"',
      answer: "Judges 4:14",
      label: "Judges Chapter 4: Deborah, Barak, and Jael"
    },
    {
      prompt: '"Then Jael Heber\'s wife took a nail of the tent, and took an hammer in her hand, and went softly unto him, and smote the nail into his temples..."',
      answer: "Judges 4:21",
      label: "Judges Chapter 4: Deborah, Barak, and Jael"
    },
    {
      prompt: '"Then sang Deborah and Barak the son of Abinoam on that day, saying,"',
      answer: "Judges 5:1",
      label: "Judges Chapter 5: The Song of Deborah"
    },
    {
      prompt: '"The inhabitants of the villages ceased, they ceased in Israel, until that I Deborah arose, that I arose a mother in Israel."',
      answer: "Judges 5:7",
      label: "Judges Chapter 5: The Song of Deborah"
    },
    {
      prompt: '"They fought from heaven; the stars in their courses fought against Sisera."',
      answer: "Judges 5:20",
      label: "Judges Chapter 5: The Song of Deborah"
    },
    {
      prompt: '"So let all thine enemies perish, O Lord: but let them that love him be as the sun when he goeth forth in his might."',
      answer: "Judges 5:31",
      label: "Judges Chapter 5: The Song of Deborah",
      book: "Judges"
    },
    {
      prompt: '"And she was in bitterness of soul, and prayed unto the Lord, and wept sore."',
      answer: "1 Samuel 1:10",
      label: "1 Samuel Part 1: The Life of Samuel",
      book: "1 Samuel"
    },
    {
      prompt: '"Wherefore it came to pass, when the time was come about after Hannah had conceived, that she bare a son, and called his name Samuel, saying, Because I have asked him of the Lord."',
      answer: "1 Samuel 1:20",
      label: "1 Samuel Part 1: The Life of Samuel",
      book: "1 Samuel"
    },
    {
      prompt: '"For this child I prayed; and the Lord hath given me my petition which I asked of him:"',
      answer: "1 Samuel 1:27",
      label: "1 Samuel Part 1: The Life of Samuel",
      book: "1 Samuel"
    },
    {
      prompt: '"There is none holy as the Lord: for there is none beside thee: neither is there any rock like our God."',
      answer: "1 Samuel 2:2",
      label: "1 Samuel Part 1: The Life of Samuel",
      book: "1 Samuel"
    },
    {
      prompt: '"Now the sons of Eli were sons of Belial; they knew not the Lord."',
      answer: "1 Samuel 2:12",
      label: "1 Samuel Part 1: The Life of Samuel",
      book: "1 Samuel"
    },
    {
      prompt: '"But Samuel ministered before the Lord, being a child, girded with a linen ephod."',
      answer: "1 Samuel 2:18",
      label: "1 Samuel Part 1: The Life of Samuel",
      book: "1 Samuel"
    },
    {
      prompt: '"And the word of the Lord was precious in those days; there was no open vision."',
      answer: "1 Samuel 3:1",
      label: "1 Samuel Part 1: The Life of Samuel",
      book: "1 Samuel"
    },
    {
      prompt: '"And the Lord came, and stood, and called as at other times, Samuel, Samuel. Then Samuel answered, Speak; for thy servant heareth."',
      answer: "1 Samuel 3:10",
      label: "1 Samuel Part 1: The Life of Samuel",
      book: "1 Samuel"
    },
    {
      prompt: '"And she named the child Ichabod, saying, The glory is departed from Israel: because the ark of God was taken..."',
      answer: "1 Samuel 4:21",
      label: "1 Samuel Part 1: The Life of Samuel",
      book: "1 Samuel"
    },
    {
      prompt: '"And when they of Ashdod arose early on the morrow, behold, Dagon was fallen upon his face to the earth before the ark of the Lord."',
      answer: "1 Samuel 5:3",
      label: "1 Samuel Part 1: The Life of Samuel",
      book: "1 Samuel"
    },
    {
      prompt: '"Then Samuel took a stone, and set it between Mizpeh and Shen, and called the name of it Ebenezer, saying, Hitherto hath the Lord helped us."',
      answer: "1 Samuel 7:12",
      label: "1 Samuel Part 1: The Life of Samuel",
      book: "1 Samuel"
    },
    {
      prompt: '"And the Lord said unto Samuel, Hearken unto the voice of the people... for they have not rejected thee, but they have rejected me, that I should not reign over them."',
      answer: "1 Samuel 8:7",
      label: "1 Samuel Part 2: The Rise and Reign of Saul",
      book: "1 Samuel"
    },
    {
      prompt: '"Then Samuel took a vial of oil, and poured it upon his head, and kissed him, and said, Is it not because the Lord hath anointed thee to be captain over his inheritance?"',
      answer: "1 Samuel 10:1",
      label: "1 Samuel Part 2: The Rise and Reign of Saul",
      book: "1 Samuel"
    },
    {
      prompt: '"And it was so, that when he had turned his back to go from Samuel, God gave him another heart..."',
      answer: "1 Samuel 10:9",
      label: "1 Samuel Part 2: The Rise and Reign of Saul",
      book: "1 Samuel"
    },
    {
      prompt: '"Only fear the Lord, and serve him in truth with all your heart: for consider how great things he hath done for you."',
      answer: "1 Samuel 12:24",
      label: "1 Samuel Part 2: The Rise and Reign of Saul",
      book: "1 Samuel"
    },
    {
      prompt: '"And Samuel said to Saul, Thou hast done foolishly: thou hast not kept the commandment of the Lord thy God... for now would the Lord have established thy kingdom upon Israel for ever."',
      answer: "1 Samuel 13:13",
      label: "1 Samuel Part 2: The Rise and Reign of Saul",
      book: "1 Samuel"
    },
    {
      prompt: '"But now thy kingdom shall not continue: the Lord hath sought him a man after his own heart..."',
      answer: "1 Samuel 13:14",
      label: "1 Samuel Part 2: The Rise and Reign of Saul",
      book: "1 Samuel"
    },
    {
      prompt: '"And Jonathan said to the young man that bare his armour, Come, and let us go over unto the garrison of these uncircumcised... for there is no restraint to the Lord to save by many or by few."',
      answer: "1 Samuel 14:6",
      label: "1 Samuel Part 2: The Rise and Reign of Saul",
      book: "1 Samuel"
    },
    {
      prompt: '"And Samuel said, Hath the Lord as great delight in burnt offerings and sacrifices, as in obeying the voice of the Lord? Behold, to obey is better than sacrifice, and to hearken than the fat of rams."',
      answer: "1 Samuel 15:22",
      label: "1 Samuel Part 2: The Rise and Reign of Saul",
      book: "1 Samuel"
    },
    {
      prompt: '"For rebellion is as the sin of witchcraft, and stubbornness is as iniquity and idolatry. Because thou hast rejected the word of the Lord, he hath also rejected thee from being king."',
      answer: "1 Samuel 15:23",
      label: "1 Samuel Part 2: The Rise and Reign of Saul",
      book: "1 Samuel"
    },
    {
      prompt: '"But the Lord said unto Samuel, Look not on his countenance, or on the height of his stature; because I have refused him: for the Lord seeth not as man seeth; for man looketh on the outward appearance, but the Lord looketh on the heart."',
      answer: "1 Samuel 16:7",
      label: "1 Samuel Part 3: David and Goliath",
      book: "1 Samuel"
    },
    {
      prompt: '"Then Samuel took the horn of oil, and anointed him in the midst of his brethren: and the Spirit of the Lord came upon David from that day forward."',
      answer: "1 Samuel 16:13",
      label: "1 Samuel Part 3: David and Goliath",
      book: "1 Samuel"
    },
    {
      prompt: '"And it came to pass, when the evil spirit from God was upon Saul, that David took an harp, and played with his hand: so Saul was refreshed, and was well..."',
      answer: "1 Samuel 16:23",
      label: "1 Samuel Part 3: David and Goliath",
      book: "1 Samuel"
    },
    {
      prompt: '"And there went out a champion out of the camp of the Philistines, named Goliath, of Gath, whose height was six cubits and a span."',
      answer: "1 Samuel 17:4",
      label: "1 Samuel Part 3: David and Goliath",
      book: "1 Samuel"
    },
    {
      prompt: '"And David said to Saul, Let no man\'s heart fail because of him; thy servant will go and fight with this Philistine."',
      answer: "1 Samuel 17:32",
      label: "1 Samuel Part 3: David and Goliath",
      book: "1 Samuel"
    },
    {
      prompt: '"David said moreover, The Lord that delivered me out of the paw of the lion, and out of the paw of the bear, he will deliver me out of the hand of this Philistine."',
      answer: "1 Samuel 17:37",
      label: "1 Samuel Part 3: David and Goliath",
      book: "1 Samuel"
    },
    {
      prompt: '"Then said David to the Philistine, Thou comest to me with a sword, and with a spear, and with a shield: but I come to thee in the name of the Lord of hosts..."',
      answer: "1 Samuel 17:45",
      label: "1 Samuel Part 3: David and Goliath",
      book: "1 Samuel"
    },
    {
      prompt: '"And all this assembly shall know that the Lord saveth not with sword and spear: for the battle is the Lord\'s, and he will give you into our hands."',
      answer: "1 Samuel 17:47",
      label: "1 Samuel Part 3: David and Goliath",
      book: "1 Samuel"
    },
    {
      prompt: '"And it came to pass... that the soul of Jonathan was knit with the soul of David, and Jonathan loved him as his own soul."',
      answer: "1 Samuel 18:1",
      label: "1 Samuel Part 4: David, Jonathan, and Saul's Jealousy",
      book: "1 Samuel"
    },
    {
      prompt: '"And the women answered one another as they played, and said, Saul hath slain his thousands, and David his ten thousands."',
      answer: "1 Samuel 18:7",
      label: "1 Samuel Part 4: David, Jonathan, and Saul's Jealousy",
      book: "1 Samuel"
    },
    {
      prompt: '"And David behaved himself wisely in all his ways; and the Lord was with him."',
      answer: "1 Samuel 18:14",
      label: "1 Samuel Part 4: David, Jonathan, and Saul's Jealousy",
      book: "1 Samuel"
    },
    {
      prompt: '"And David said, What have I done? what is mine iniquity? and what is my sin before thy father, that he seeketh my life?"',
      answer: "1 Samuel 20:1",
      label: "1 Samuel Part 4: David, Jonathan, and Saul's Jealousy",
      book: "1 Samuel"
    },
    {
      prompt: '"Then said Jonathan unto David, Whatsoever thy soul desireth, I will even do it for thee."',
      answer: "1 Samuel 20:4",
      label: "1 Samuel Part 4: David, Jonathan, and Saul's Jealousy",
      book: "1 Samuel"
    },
    {
      prompt: '"And every one that was in distress, and every one that was in debt, and every one that was discontented, gathered themselves unto him; and he became a captain over them:"',
      answer: "1 Samuel 22:2",
      label: "1 Samuel Part 4: David, Jonathan, and Saul's Jealousy",
      book: "1 Samuel"
    },
    {
      prompt: '"And Jonathan Saul\'s son arose, and went to David into the wood, and strengthened his hand in God."',
      answer: "1 Samuel 23:16",
      label: "1 Samuel Part 4: David, Jonathan, and Saul's Jealousy",
      book: "1 Samuel"
    },
    {
      prompt: '"And he said unto his men, The Lord forbid that I should do this thing unto my master, the Lord\'s anointed, to stretch forth mine hand against him, seeing he is the anointed of the Lord."',
      answer: "1 Samuel 24:6",
      label: "1 Samuel Part 4: David, Jonathan, and Saul's Jealousy",
      book: "1 Samuel"
    },
    {
      prompt: '"Now the name of the man was Nabal; and the name of his wife Abigail: and she was a woman of good understanding, and of a beautiful countenance: but the man was churlish and evil in his doings;"',
      answer: "1 Samuel 25:3",
      label: "1 Samuel Part 4: David, Jonathan, and Saul's Jealousy",
      book: "1 Samuel"
    },
    {
      prompt: '"Then David said to Abishai, Destroy him not: for who can stretch forth his hand against the Lord\'s anointed, and be guiltless?"',
      answer: "1 Samuel 26:9",
      label: "1 Samuel Part 4: David, Jonathan, and Saul's Jealousy",
      book: "1 Samuel"
    },
    {
      prompt: '"Then said Saul unto his servants, Seek me a woman that hath a familiar spirit, that I may go to her, and enquire of her."',
      answer: "1 Samuel 28:7",
      label: "1 Samuel Part 4: David, Jonathan, and Saul's Jealousy",
      book: "1 Samuel"
    },
    {
      prompt: '"And Samuel said to Saul, Why hast thou disquieted me, to bring me up?"',
      answer: "1 Samuel 28:15",
      label: "1 Samuel Part 4: David, Jonathan, and Saul's Jealousy",
      book: "1 Samuel"
    },
    {
      prompt: '"But David encouraged himself in the Lord his God."',
      answer: "1 Samuel 30:6",
      label: "1 Samuel Part 4: David, Jonathan, and Saul's Jealousy",
      book: "1 Samuel"
    },
    {
      prompt: '"Therefore Saul took a sword, and fell upon it."',
      answer: "1 Samuel 31:4",
      label: "1 Samuel Part 4: David, Jonathan, and Saul's Jealousy",
      book: "1 Samuel"
    }
  ];
  const quickReviewPool = [
    { section: "1 Samuel Part 1: Hannah and the Early Years of Samuel", question: 'Who wept and was in "bitterness of soul" while praying for a son? (1:10)', answer: "Hannah." },
    { section: "1 Samuel Part 1: Hannah and the Early Years of Samuel", question: "What did Hannah vow to give her child to if granted a son? (1:11)", answer: "She vowed to give him to the Lord all the days of his life." },
    { section: "1 Samuel Part 1: Hannah and the Early Years of Samuel", question: "Who thought Hannah was drunken because only her lips moved while praying? (1:13)", answer: "Eli." },
    { section: "1 Samuel Part 1: Hannah and the Early Years of Samuel", question: '"How long wilt thou be drunken?" Who said this to Hannah? (1:14)', answer: "Eli said it to Hannah." },
    { section: "1 Samuel Part 1: Hannah and the Early Years of Samuel", question: "How did Hannah describe her own spirit to Eli? (1:15)", answer: "As a woman of a sorrowful spirit." },
    { section: "1 Samuel Part 1: Hannah and the Early Years of Samuel", question: "What was Eli’s final blessing to Hannah before she left? (1:17)", answer: "Go in peace: and the God of Israel grant thee thy petition that thou hast asked of him." },
    { section: "1 Samuel Part 1: Hannah and the Early Years of Samuel", question: 'What does the name "Samuel" mean according to Hannah? (1:20)', answer: '"Because I have asked him of the Lord."' },
    { section: "1 Samuel Part 1: Hannah and the Early Years of Samuel", question: '"For this child I prayed." Where is this statement found? (1:27)', answer: "1 Samuel 1:27." },
    { section: "1 Samuel Part 1: Hannah and the Early Years of Samuel", question: 'How long did Hannah say Samuel would be "lent to the Lord"? (1:28)', answer: "As long as he liveth." },
    { section: "1 Samuel Part 1: Hannah and the Early Years of Samuel", question: '"My heart rejoiceth in the Lord." Who began their prayer with these words? (2:1)', answer: "Hannah." },
    { section: "1 Samuel Part 1: Hannah and the Early Years of Samuel", question: 'Who is described as the only one who is "holy as the Lord"? (2:2)', answer: "The Lord." },
    { section: "1 Samuel Part 1: Hannah and the Early Years of Samuel", question: 'In Hannah\'s song, by whom are "actions weighed"? (2:3)', answer: "By the Lord." },
    { section: "1 Samuel Part 1: Hannah and the Early Years of Samuel", question: 'According to 2:6, who "killeth, and maketh alive"? (2:6)', answer: "The Lord." },
    { section: "1 Samuel Part 1: Hannah and the Early Years of Samuel", question: "From where does the Lord lift the beggar to set them among princes? (2:8)", answer: "Out of the dunghill." },
    { section: "1 Samuel Part 1: Hannah and the Early Years of Samuel", question: 'Eli’s sons were described as "sons of" what? (2:12)', answer: "Sons of Belial." },
    { section: "1 Samuel Part 1: Hannah and the Early Years of Samuel", question: "What was Samuel wearing while ministering as a child? (2:18)", answer: "A linen ephod." },
    { section: "1 Samuel Part 1: Hannah and the Early Years of Samuel", question: "Whom did the child Samuel grow in favor with? (2:26)", answer: "With the Lord and also with men." },
    { section: "1 Samuel Part 1: Hannah and the Early Years of Samuel", question: 'How is the "word of the Lord" described during Samuel\'s childhood? (3:1)', answer: "It was precious in those days; there was no open vision." },
    { section: "1 Samuel Part 1: Hannah and the Early Years of Samuel", question: "What was Samuel's first response when the Lord called him? (3:4)", answer: '"Here am I."' },
    { section: "1 Samuel Part 1: Hannah and the Early Years of Samuel", question: '"Speak; for thy servant heareth." Who said this? (3:10)', answer: "Samuel." },
    { section: "1 Samuel Part 1: Hannah and the Early Years of Samuel", question: "What were the geographical borders of Israel that knew Samuel was a prophet? (3:20)", answer: "From Dan even to Beersheba." },
    { section: "1 Samuel Part 1: Hannah and the Early Years of Samuel", question: "Which two sons of Eli were slain when the ark was taken? (4:11)", answer: "Hophni and Phinehas." },
    { section: "1 Samuel Part 1: Hannah and the Early Years of Samuel", question: "How did Eli die after hearing the ark was taken? (4:18)", answer: "He fell backward from off the seat, his neck brake, and he died." },
    { section: "1 Samuel Part 1: Hannah and the Early Years of Samuel", question: 'What name means "The glory is departed from Israel"? (4:21)', answer: "Ichabod." },
    { section: "1 Samuel Part 1: Hannah and the Early Years of Samuel", question: "Which Philistine god fell on its face before the ark of the Lord? (5:3)", answer: "Dagon." },
    { section: "1 Samuel Part 1: Hannah and the Early Years of Samuel", question: "Samuel told Israel to put away which gods to return to the Lord? (7:3)", answer: "The strange gods and Ashtaroth." },
    { section: "1 Samuel Part 1: Hannah and the Early Years of Samuel", question: 'What name did Samuel give the stone that meant "Hitherto hath the Lord helped us"? (7:12)', answer: "Ebenezer." },
    { section: "1 Samuel Part 2: The Transition to Kingship and King Saul", question: "Why did the elders of Israel ask for a king? (8:5)", answer: "Because Samuel was old and his sons did not walk in his ways, and they wanted a king like all the nations." },
    { section: "1 Samuel Part 2: The Transition to Kingship and King Saul", question: "The Lord told Samuel the people had not rejected him, but whom? (8:7)", answer: "The Lord." },
    { section: "1 Samuel Part 2: The Transition to Kingship and King Saul", question: "How is Saul described physically in 1 Samuel 9:2? (9:2)", answer: "A choice young man and a goodly; there was not a goodlier person among Israel, and from his shoulders upward he was higher than any of the people." },
    { section: "1 Samuel Part 2: The Transition to Kingship and King Saul", question: "What did Samuel pour on Saul’s head to anoint him? (10:1)", answer: "A vial of oil." },
    { section: "1 Samuel Part 2: The Transition to Kingship and King Saul", question: "What did God give Saul after he turned his back to leave Samuel? (10:9)", answer: "Another heart." },
    { section: "1 Samuel Part 2: The Transition to Kingship and King Saul", question: "What happened to Saul when he met a company of prophets? (10:10)", answer: "The Spirit of God came upon him, and he prophesied among them." },
    { section: "1 Samuel Part 2: The Transition to Kingship and King Saul", question: '"God save the king." When was this first shouted by Israel? (10:24)', answer: "When Samuel presented Saul to the people as the one the Lord had chosen." },
    { section: "1 Samuel Part 2: The Transition to Kingship and King Saul", question: 'Samuel told the people to "fear the Lord" and consider what? (12:24)', answer: "How great things he hath done for you." },
    { section: "1 Samuel Part 2: The Transition to Kingship and King Saul", question: 'Why did Samuel tell Saul he had "done foolishly" in chapter 13? (13:13)', answer: "Because Saul had not kept the commandment of the Lord." },
    { section: "1 Samuel Part 2: The Transition to Kingship and King Saul", question: "The Lord sought a man after what to replace Saul? (13:14)", answer: "His own heart." },
    { section: "1 Samuel Part 2: The Transition to Kingship and King Saul", question: '"There is no restraint to the Lord to save by many or by few." Who said this? (14:6)', answer: "Jonathan." },
    { section: "1 Samuel Part 2: The Transition to Kingship and King Saul", question: 'Which nation was Saul commanded to "utterly destroy"? (15:3)', answer: "Amalek." },
    { section: "1 Samuel Part 2: The Transition to Kingship and King Saul", question: "Whom did Saul and the people spare against God's command? (15:9)", answer: "Agag, and the best of the sheep, oxen, fatlings, lambs, and all that was good." },
    { section: "1 Samuel Part 2: The Transition to Kingship and King Saul", question: 'The Lord said, "It repenteth me that I have set up" whom? (15:11)', answer: "Saul." },
    { section: "1 Samuel Part 2: The Transition to Kingship and King Saul", question: "When was Saul made the head of the tribes? (15:17)", answer: "When he was little in his own sight." },
    { section: "1 Samuel Part 2: The Transition to Kingship and King Saul", question: 'What is "better than sacrifice" according to Samuel? (15:22)', answer: "To obey." },
    { section: "1 Samuel Part 2: The Transition to Kingship and King Saul", question: "Rebellion is compared to what sin in 15:23? (15:23)", answer: "The sin of witchcraft." },
    { section: "1 Samuel Part 2: The Transition to Kingship and King Saul", question: "What was rent as Samuel turned to leave Saul? (15:27)", answer: "The skirt of Samuel's mantle." },
    { section: "1 Samuel Part 2: The Transition to Kingship and King Saul", question: "What did the rent mantle symbolize for Saul's kingdom? (15:28)", answer: "That the Lord had rent the kingdom of Israel from Saul and given it to a better neighbor." },
    { section: "1 Samuel Part 2: The Transition to Kingship and King Saul", question: 'Who is described as the "Strength of Israel" who will not lie? (15:29)', answer: "The Lord, the Strength of Israel." },
    { section: "1 Samuel Part 3: David, the Anointed Shepherd", question: "Where did the Lord send Samuel to find the next king? (16:1)", answer: "To Jesse the Bethlehemite." },
    { section: "1 Samuel Part 3: David, the Anointed Shepherd", question: "Man looks at the outward appearance, but what does the Lord look at? (16:7)", answer: "The heart." },
    { section: "1 Samuel Part 3: David, the Anointed Shepherd", question: "What was David doing when Samuel arrived to see Jesse's sons? (16:11)", answer: "He was keeping the sheep." },
    { section: "1 Samuel Part 3: David, the Anointed Shepherd", question: "What came upon David from the day he was anointed? (16:13)", answer: "The Spirit of the Lord." },
    { section: "1 Samuel Part 3: David, the Anointed Shepherd", question: "What departed from Saul when the Spirit of the Lord left? (16:14)", answer: "The Spirit of the Lord departed from Saul." },
    { section: "1 Samuel Part 3: David, the Anointed Shepherd", question: "What instrument did David play to refresh Saul? (16:23)", answer: "A harp." },
    { section: "1 Samuel Part 3: David, the Anointed Shepherd", question: "What was the height of the champion Goliath? (17:4)", answer: "Six cubits and a span." },
    { section: "1 Samuel Part 3: David, the Anointed Shepherd", question: '"Give me a man, that we may fight together." Who said this? (17:10)', answer: "Goliath the Philistine." },
    { section: "1 Samuel Part 3: David, the Anointed Shepherd", question: 'Who told Saul, "Let no man\'s heart fail because of him"? (17:32)', answer: "David." },
    { section: "1 Samuel Part 3: David, the Anointed Shepherd", question: "Which two animals did David say he had already slain? (17:36)", answer: "The lion and the bear." },
    { section: "1 Samuel Part 3: David, the Anointed Shepherd", question: "Who did David credit for delivering him from the lion? (17:37)", answer: "The Lord." },
    { section: "1 Samuel Part 3: David, the Anointed Shepherd", question: "How many smooth stones did David choose from the brook? (17:40)", answer: "Five smooth stones." },
    { section: "1 Samuel Part 3: David, the Anointed Shepherd", question: '"Am I a dog, that thou comest to me with staves?" Who said this? (17:43)', answer: "The Philistine, Goliath." },
    { section: "1 Samuel Part 3: David, the Anointed Shepherd", question: "In what name did David come against Goliath? (17:45)", answer: "In the name of the Lord of hosts." },
    { section: "1 Samuel Part 3: David, the Anointed Shepherd", question: "To whom does the battle belong? (17:47)", answer: "The battle is the Lord's." },
    { section: "1 Samuel Part 3: David, the Anointed Shepherd", question: "Where did David’s stone strike the Philistine? (17:49)", answer: "In his forehead." },
    { section: "1 Samuel Part 4: Exile and Conflict", question: 'Whose soul was "knit with the soul of David"? (18:1)', answer: "Jonathan's." },
    { section: "1 Samuel Part 4: Exile and Conflict", question: "Why did Jonathan and David make a covenant? (18:3)", answer: "Because Jonathan loved David as his own soul." },
    { section: "1 Samuel Part 4: Exile and Conflict", question: 'Who did the women say had slain his "ten thousands"? (18:7)', answer: "David." },
    { section: "1 Samuel Part 4: Exile and Conflict", question: "How did Saul react to the women’s song? (18:8-9)", answer: "He was very wroth and eyed David from that day forward." },
    { section: "1 Samuel Part 4: Exile and Conflict", question: '"David behaved himself wisely." What was the result? (18:14)', answer: "The Lord was with him." },
    { section: "1 Samuel Part 4: Exile and Conflict", question: "Which daughter of Saul loved David? (18:20)", answer: "Michal." },
    { section: "1 Samuel Part 4: Exile and Conflict", question: "Whom did Saul command to kill David in 19:1? (19:1)", answer: "Jonathan his son and all his servants." },
    { section: "1 Samuel Part 4: Exile and Conflict", question: "Who delighted much in David and warned him of Saul? (19:2)", answer: "Jonathan." },
    { section: "1 Samuel Part 4: Exile and Conflict", question: "To whom did David flee in Ramah? (19:18)", answer: "To Samuel." },
    { section: "1 Samuel Part 4: Exile and Conflict", question: '"What have I done? what is mine iniquity?" David asked whom? (20:1)', answer: "Jonathan." },
    { section: "1 Samuel Part 4: Exile and Conflict", question: "What did Jonathan promise to do for David’s soul? (20:4)", answer: "Whatsoever David desired, Jonathan would do it for him." },
    { section: "1 Samuel Part 4: Exile and Conflict", question: "How did Jonathan promise to show David his father's intent? (20:9)", answer: "He promised that if he knew evil was determined by his father, he would tell David." },
    { section: "1 Samuel Part 4: Exile and Conflict", question: "How did David and Jonathan say goodbye in 20:41? (20:41)", answer: "They kissed one another and wept one with another." },
    { section: "1 Samuel Part 4: Exile and Conflict", question: "In whose name had David and Jonathan sworn? (20:42)", answer: "In the name of the Lord." },
    { section: "1 Samuel Part 4: Exile and Conflict", question: "Who was the priest at Nob that David visited? (21:1)", answer: "Ahimelech the priest." },
    { section: "1 Samuel Part 4: Exile and Conflict", question: "To which cave did David escape? (22:1)", answer: "The cave Adullam." },
    { section: "1 Samuel Part 4: Exile and Conflict", question: "What kind of men gathered themselves unto David at the cave? (22:2)", answer: "Those in distress, in debt, and discontented." },
    { section: "1 Samuel Part 4: Exile and Conflict", question: "Who did Saul command his footmen to slay? (22:17)", answer: "The priests of the Lord." },
    { section: "1 Samuel Part 4: Exile and Conflict", question: "In which wilderness was David in a wood? (23:15)", answer: "The wilderness of Ziph." },
    { section: "1 Samuel Part 4: Exile and Conflict", question: "How did Jonathan strengthen David’s hand? (23:16)", answer: "He strengthened his hand in God." },
    { section: "1 Samuel Part 4: Exile and Conflict", question: "In which wilderness did Saul seek David after the Philistines? (24:1)", answer: "The wilderness of Engedi." },
    { section: "1 Samuel Part 4: Exile and Conflict", question: "What did David’s men think the Lord was delivering to David? (24:4)", answer: "His enemy into his hand." },
    { section: "1 Samuel Part 4: Exile and Conflict", question: "Why did David refuse to stretch forth his hand against Saul? (24:6)", answer: "Because Saul was the Lord's anointed." },
    { section: "1 Samuel Part 4: Exile and Conflict", question: "Where was Samuel buried? (25:1)", answer: "In his house at Ramah." },
    { section: "1 Samuel Part 4: Exile and Conflict", question: "How is Abigail described in 25:3? (25:3)", answer: "A woman of good understanding and a beautiful countenance." },
    { section: "1 Samuel Part 4: Exile and Conflict", question: "Who did David stop from destroying Saul in 26:9? (26:9)", answer: "Abishai." },
    { section: "1 Samuel Part 4: Exile and Conflict", question: "What two items did David take from Saul's bolster? (26:12)", answer: "The spear and the cruse of water." },
    { section: "1 Samuel Part 4: Exile and Conflict", question: "What was Saul's final blessing to David? (26:25)", answer: '"Blessed be thou, my son David: thou shalt both do great things, and also shalt still prevail."' },
    { section: "1 Samuel Part 4: Exile and Conflict", question: "Whom did Saul seek out in Endor? (28:7)", answer: "A woman that had a familiar spirit." },
    { section: "1 Samuel Part 4: Exile and Conflict", question: "Whom did Saul ask the woman to bring up? (28:11)", answer: "Samuel." },
    { section: "1 Samuel Part 4: Exile and Conflict", question: 'What did Samuel ask Saul upon being "brought up"? (28:15)', answer: '"Why hast thou disquieted me, to bring me up?"' },
    { section: "1 Samuel Part 4: Exile and Conflict", question: 'Where did Samuel say Saul and his sons would be "to morrow"? (28:19)', answer: "With Samuel." },
    { section: "1 Samuel Part 4: Exile and Conflict", question: "When did David and his people weep until they had no more power? (30:4)", answer: "When they came to Ziklag and found the city burned and their families taken." },
    { section: "1 Samuel Part 4: Exile and Conflict", question: "In whom did David encourage himself? (30:6)", answer: "In the Lord his God." },
    { section: "1 Samuel Part 4: Exile and Conflict", question: "Where did the men of Israel fall down slain before the Philistines? (31:1)", answer: "In mount Gilboa." },
    { section: "1 Samuel Part 4: Exile and Conflict", question: "Who sore wounded Saul during the final battle? (31:3)", answer: "The archers." },
    { section: "1 Samuel Part 4: Exile and Conflict", question: "How did King Saul die? (31:4)", answer: "He took a sword and fell upon it." }
  ];

  const elements = {
    dailyVerseText: document.getElementById("dailyVerseText"),
    dailyVerseRef: document.getElementById("dailyVerseRef"),
    homeProgressLabel: document.getElementById("homeProgressLabel"),
    homeProgressFill: document.getElementById("homeProgressFill"),
    homeProgressText: document.getElementById("homeProgressText"),
    headerLoginLabel: document.getElementById("headerLoginLabel"),
    studyBookSelect: document.getElementById("studyBookSelect"),
    bookProgressTitle: document.getElementById("bookProgressTitle"),
    bookProgressCount: document.getElementById("bookProgressCount"),
    bookProgressFill: document.getElementById("bookProgressFill"),
    chapterGrid: document.getElementById("chapterGrid"),
    booksCategoryFilter: document.getElementById("booksCategoryFilter"),
    booksLearningPanel: document.getElementById("booksLearningPanel"),
    chapterDetailTag: document.getElementById("chapterDetailTag"),
    chapterTitle: document.getElementById("chapterTitle"),
    chapterSummary: document.getElementById("chapterSummary"),
    chapterStatus: document.getElementById("chapterStatus"),
    lessonCheckpointBar: document.getElementById("lessonCheckpointBar"),
    activityBox: document.getElementById("activityBox"),
    learnBtn: document.getElementById("learnBtn"),
    practiceBtn: document.getElementById("practiceBtn"),
    quizBtn: document.getElementById("quizBtn"),
    startTodayBtn: document.getElementById("startTodayBtn"),
    readingBookSelect: document.getElementById("readingBookSelect"),
    readingChapterSelect: document.getElementById("readingChapterSelect"),
    readingTitle: document.getElementById("readingTitle"),
    readingSummary: document.getElementById("readingSummary"),
    studyMinutesInput: document.getElementById("studyMinutesInput"),
    studyTimerDisplay: document.getElementById("studyTimerDisplay"),
    studyTimerStatus: document.getElementById("studyTimerStatus"),
    studyTimerStart: document.getElementById("studyTimerStart"),
    studyTimerPause: document.getElementById("studyTimerPause"),
    studyTimerReset: document.getElementById("studyTimerReset"),
    readingGuide: document.getElementById("readingGuide"),
    practicePanel: document.getElementById("practicePanel"),
    homeShortcut: document.getElementById("homeShortcut"),
    socialShortcut: document.getElementById("socialShortcut"),
    authPanel: document.getElementById("authPanel"),
    authStateBadge: document.getElementById("authStateBadge"),
    friendsPanel: document.getElementById("friendsPanel"),
    friendsCountBadge: document.getElementById("friendsCountBadge")
  };

  function loadUserProfile() {
    try {
      const parsed = JSON.parse(localStorage.getItem(PROFILE_STORAGE_KEY));
      return parsed && parsed.displayName && parsed.handle ? parsed : null;
    } catch (error) {
      return null;
    }
  }

  function loadRegisteredUsers() {
    try {
      const parsed = JSON.parse(localStorage.getItem(USERS_STORAGE_KEY));
      return Array.isArray(parsed) ? parsed : [];
    } catch (error) {
      return [];
    }
  }

  function saveRegisteredUsers() {
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(state.registeredUsers));
  }

  function upsertRegisteredUser(profile) {
    const existingIndex = state.registeredUsers.findIndex(function (user) {
      return user.handle.toLowerCase() === profile.handle.toLowerCase();
    });

    const publicProfile = {
      id: profile.handle.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""),
      displayName: profile.displayName,
      handle: profile.handle
    };

    if (existingIndex >= 0) {
      state.registeredUsers[existingIndex] = publicProfile;
    } else {
      state.registeredUsers.push(publicProfile);
    }

    saveRegisteredUsers();
  }

  function saveUserProfile(profile) {
    state.userProfile = profile;
    localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(profile));
    upsertRegisteredUser(profile);
  }

  function clearUserProfile() {
    state.userProfile = null;
    localStorage.removeItem(PROFILE_STORAGE_KEY);
  }

  function loadFriends() {
    try {
      const parsed = JSON.parse(localStorage.getItem(FRIENDS_STORAGE_KEY));
      return Array.isArray(parsed) ? parsed : [];
    } catch (error) {
      return [];
    }
  }

  function saveFriends() {
    localStorage.setItem(FRIENDS_STORAGE_KEY, JSON.stringify(state.friends));
  }

  function getBooks() {
    return Object.keys(data.books);
  }

  function getFilteredCommunityUsers() {
    const query = state.friendSearch.toLowerCase().trim();
    return state.registeredUsers.filter(function (user) {
      const isFriend = state.friends.some(function (friend) {
        return friend.id === user.id;
      });
      const isSelf = state.userProfile && state.userProfile.handle.toLowerCase() === user.handle.toLowerCase();
      const matchesQuery = !query ||
        user.displayName.toLowerCase().indexOf(query) !== -1 ||
        user.handle.toLowerCase().indexOf(query) !== -1;
      return !isFriend && !isSelf && matchesQuery;
    });
  }

  function getReadableBooks() {
    return getBookMetadataList().map(function (book) {
      return book.name;
    });
  }

  function getChapters(book) {
    return data.books[book] || [];
  }

  function getBookMetaByName(bookName) {
    return getBookMetadataList().find(function (book) {
      return book.name === bookName;
    }) || null;
  }

  function getCurrentChapter() {
    return getChapters(state.currentBook)[state.currentChapterIndex];
  }

  function getNextUnlockedLesson() {
    const lessonBooks = getBooks();

    for (let bookIndex = 0; bookIndex < lessonBooks.length; bookIndex += 1) {
      const book = lessonBooks[bookIndex];
      const chapters = getChapters(book);

      for (let chapterIndex = 0; chapterIndex < chapters.length; chapterIndex += 1) {
        if (isChapterUnlocked(book, chapterIndex) && !isChapterCompleted(book, chapterIndex)) {
          return {
            book: book,
            chapterIndex: chapterIndex
          };
        }
      }
    }

    return {
      book: "Genesis",
      chapterIndex: 0
    };
  }

  function getBookMetadataList() {
    return data.bibleBooks.slice().sort(function (a, b) {
      return a.order - b.order;
    });
  }

  function getBookCategories() {
    const categories = [];

    getBookMetadataList().forEach(function (book) {
      if (categories.indexOf(book.category) === -1) {
        categories.push(book.category);
      }
    });

    return categories;
  }

  function getFilteredBibleBooks() {
    return getBookMetadataList().filter(function (book) {
      return state.booksCategoryFilter === "All Categories" || book.category === state.booksCategoryFilter;
    });
  }

  function getGroupedBibleBooks() {
    const filtered = getFilteredBibleBooks();

    return {
      "Old Testament": filtered.filter(function (book) {
        return book.testament === "Old Testament";
      }),
      "New Testament": filtered.filter(function (book) {
        return book.testament === "New Testament";
      })
    };
  }

  function getStepState(book, chapterIndex) {
    const key = book + ":" + chapterIndex;

    if (!state.studyStepState[key]) {
      state.studyStepState[key] = {
        learned: false,
        practiced: false
      };
    }

    return state.studyStepState[key];
  }

  function normalizeAnswer(value) {
    return String(value || "")
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s]/g, "")
      .replace(/\s+/g, " ");
  }

  function isChapterCompleted(book, chapterIndex) {
    return state.progress[book].indexOf(chapterIndex) !== -1;
  }

  function isChapterUnlocked(book, chapterIndex) {
    if (chapterIndex === 0) {
      return true;
    }

    return isChapterCompleted(book, chapterIndex - 1);
  }

  function getBookProgress(book) {
    const total = getChapters(book).length;
    const completed = state.progress[book].length;

    return {
      total: total,
      completed: completed,
      percent: total ? Math.round((completed / total) * 100) : 0
    };
  }

  function getOverallProgress() {
    return getBooks().reduce(function (accumulator, book) {
      const total = getChapters(book).length;
      accumulator.total += total;
      accumulator.completed += state.progress[book].length;
      accumulator.percent = accumulator.total ? Math.round((accumulator.completed / accumulator.total) * 100) : 0;
      return accumulator;
    }, { total: 0, completed: 0, percent: 0 });
  }

  function completeChapter(book, chapterIndex) {
    if (!isChapterCompleted(book, chapterIndex)) {
      state.progress[book].push(chapterIndex);
      state.progress[book].sort(function (a, b) {
        return a - b;
      });
      storage.saveProgress(state.progress);
    }
  }

  function setDailyVerse() {
    const today = new Date();
    const index = (today.getFullYear() * 1000 + today.getMonth() * 100 + today.getDate()) % data.dailyVerses.length;
    elements.dailyVerseText.textContent = data.dailyVerses[index].text;
    elements.dailyVerseRef.textContent = data.dailyVerses[index].ref;
  }

  function populateSelect(select, items) {
    select.innerHTML = items.map(function (item) {
      return '<option value="' + item.value + '">' + item.label + "</option>";
    }).join("");
  }

  function initializeSelects() {
    const lessonBookOptions = getBooks().map(function (book) {
      return { value: book, label: book };
    });
    const readableBookOptions = getReadableBooks().map(function (book) {
      return { value: book, label: book };
    });
    const categoryOptions = [{ value: "All Categories", label: "All Categories" }].concat(
      getBookCategories().map(function (category) {
        return { value: category, label: category };
      })
    );

    populateSelect(elements.studyBookSelect, lessonBookOptions);
    populateSelect(elements.readingBookSelect, readableBookOptions);
    populateSelect(elements.booksCategoryFilter, categoryOptions);

    elements.studyBookSelect.value = state.currentBook;
    elements.readingBookSelect.value = state.readingBook;
    elements.booksCategoryFilter.value = state.booksCategoryFilter;

    renderReadingChapterOptions();
  }

  function renderHomeProgress() {
    const progress = getOverallProgress();
    elements.homeProgressFill.style.width = progress.percent + "%";
    elements.homeProgressLabel.textContent = progress.percent + "% complete";
    elements.homeProgressText.textContent = progress.completed + " of " + progress.total + " chapters completed";
  }

  function renderProfileSummary() {
    if (state.userProfile) {
      elements.headerLoginLabel.textContent = state.userProfile.handle;
      return;
    }

    elements.headerLoginLabel.textContent = "Login";
  }

  function renderAuthPanel() {
    if (state.userProfile) {
      elements.authStateBadge.textContent = "Signed in";
      elements.authPanel.innerHTML =
        '<div class="social-profile-card">' +
          "<h4>" + state.userProfile.displayName + "</h4>" +
          "<p>" + state.userProfile.handle + "</p>" +
          "<p>Password is stored only on this device for this prototype.</p>" +
          '<button id="signOutBtn" class="lesson-submit" type="button">Sign Out</button>' +
        "</div>";

      document.getElementById("signOutBtn").addEventListener("click", function () {
        clearUserProfile();
        state.friends = [];
        saveFriends();
        renderProfileSummary();
        renderSocialScreen();
      });
      return;
    }

    elements.authStateBadge.textContent = "Not signed in";
    elements.authPanel.innerHTML =
      '<div class="social-form">' +
        '<label class="lesson-label" for="displayNameInput">Display Name</label>' +
        '<input id="displayNameInput" class="lesson-input" type="text" placeholder="Enter your name" />' +
        '<label class="lesson-label" for="handleInput">Handle</label>' +
        '<input id="handleInput" class="lesson-input" type="text" placeholder="@yourhandle" />' +
        '<label class="lesson-label" for="passwordInput">Password</label>' +
        '<input id="passwordInput" class="lesson-input" type="password" placeholder="Create a simple password" />' +
        '<button id="signInBtn" class="lesson-submit" type="button">Create Profile / Sign In</button>' +
        '<div id="authFeedback" class="practice-feedback"></div>' +
      "</div>";

    document.getElementById("signInBtn").addEventListener("click", function () {
      const displayName = document.getElementById("displayNameInput").value.trim();
      const rawHandle = document.getElementById("handleInput").value.trim();
      const password = document.getElementById("passwordInput").value.trim();
      const feedback = document.getElementById("authFeedback");
      const handle = rawHandle.charAt(0) === "@" ? rawHandle : "@" + rawHandle;

      if (!displayName || !rawHandle || !password) {
        feedback.textContent = "Please fill in your name, handle, and password.";
        return;
      }

      saveUserProfile({
        displayName: displayName,
        handle: handle,
        password: password
      });

      renderProfileSummary();
      renderSocialScreen();
    });
  }

  function renderFriendsPanel() {
    const suggestions = getFilteredCommunityUsers();
    elements.friendsCountBadge.textContent = state.friends.length + (state.friends.length === 1 ? " friend" : " friends");

    if (!state.userProfile) {
      elements.friendsPanel.innerHTML =
        '<p class="screen-subtitle">Sign in first to search for friends and build a study circle.</p>';
      return;
    }

    elements.friendsPanel.innerHTML =
      '<div class="social-form">' +
        '<label class="lesson-label" for="friendSearchInput">Find Friends</label>' +
        '<input id="friendSearchInput" class="lesson-input" type="text" placeholder="Search by name or handle" value="' + state.friendSearch + '" />' +
      '</div>' +
      '<div class="friends-columns">' +
        '<div class="friends-column">' +
          '<h4>Your Friends</h4>' +
          (state.friends.length
            ? state.friends.map(function (friend) {
                return (
                  '<div class="friend-card">' +
                    '<div><strong>' + friend.displayName + '</strong><p>' + friend.handle + "</p></div>" +
                    '<button class="timer-btn remove-friend-btn" type="button" data-remove-friend="' + friend.id + '">Remove</button>' +
                  "</div>"
                );
              }).join("")
            : '<p class="muted">No friends added yet.</p>') +
        "</div>" +
        '<div class="friends-column">' +
          "<h4>People Signed In On This App</h4>" +
          (suggestions.length
            ? suggestions.map(function (user) {
                return (
                  '<div class="friend-card">' +
                    '<div><strong>' + user.displayName + '</strong><p>' + user.handle + "</p></div>" +
                    '<button class="timer-btn add-friend-btn" type="button" data-add-friend="' + user.id + '">Add</button>' +
                  "</div>"
                );
              }).join("")
            : '<p class="muted">No other signed-in users match your search yet.</p>') +
        "</div>" +
      "</div>";

    document.getElementById("friendSearchInput").addEventListener("input", function (event) {
      state.friendSearch = event.target.value;
      renderFriendsPanel();
    });

    elements.friendsPanel.querySelectorAll("[data-add-friend]").forEach(function (button) {
      button.addEventListener("click", function () {
        const match = state.registeredUsers.find(function (user) {
          return user.id === button.getAttribute("data-add-friend");
        });
        if (match) {
          state.friends.push(match);
          saveFriends();
          renderProfileSummary();
          renderFriendsPanel();
        }
      });
    });

    elements.friendsPanel.querySelectorAll("[data-remove-friend]").forEach(function (button) {
      button.addEventListener("click", function () {
        const friendId = button.getAttribute("data-remove-friend");
        state.friends = state.friends.filter(function (friend) {
          return friend.id !== friendId;
        });
        saveFriends();
        renderProfileSummary();
        renderFriendsPanel();
      });
    });
  }

  function renderSocialScreen() {
    renderAuthPanel();
    renderFriendsPanel();
  }

  function renderStudyPath() {
    const chapters = getChapters(state.currentBook);
    const progress = getBookProgress(state.currentBook);

    elements.studyBookSelect.value = state.currentBook;
    elements.bookProgressTitle.textContent = state.currentBook + " Progress";
    elements.bookProgressCount.textContent = progress.completed + " / " + progress.total + " complete";
    elements.bookProgressFill.style.width = progress.percent + "%";

    elements.chapterGrid.innerHTML = "";

    chapters.forEach(function (chapter, index) {
      const completed = isChapterCompleted(state.currentBook, index);
      const unlocked = isChapterUnlocked(state.currentBook, index);
      const button = document.createElement("button");
      const icon = completed ? "✅" : unlocked ? "🔓" : "🔒";
      const status = completed ? "Completed" : unlocked ? "Unlocked" : "Locked";

      button.type = "button";
      button.className = "chapter-chip " + (completed ? "completed" : unlocked ? "unlocked" : "locked");
      button.disabled = !unlocked;
      button.innerHTML =
        "<strong>" + icon + " " + chapter.title + "</strong>" +
        "<span>" + status + "</span>";

      button.addEventListener("click", function () {
        state.currentChapterIndex = index;
        showScreen("chapterDetailScreen");
      });

      elements.chapterGrid.appendChild(button);
    });

    renderBooksLearning();
  }

  function renderChapterDetail() {
    const chapter = getCurrentChapter();
    const stepState = getStepState(state.currentBook, state.currentChapterIndex);
    const completed = isChapterCompleted(state.currentBook, state.currentChapterIndex);

    elements.chapterDetailTag.textContent = state.currentBook;
    elements.chapterTitle.textContent = chapter.title;
    elements.chapterSummary.textContent = chapter.summary;

    elements.learnBtn.classList.add("is-hidden");
    elements.practiceBtn.classList.add("is-hidden");
    elements.quizBtn.classList.add("is-hidden");
    elements.learnBtn.disabled = true;
    elements.practiceBtn.disabled = true;
    elements.quizBtn.disabled = true;

    if (completed) {
      elements.chapterStatus.textContent = "✅ Completed. The next chapter is now open.";
    } else if (stepState.learned && stepState.practiced) {
      elements.chapterStatus.textContent = "🟡 Practice is complete. Take the quiz when you are ready.";
      elements.quizBtn.textContent = "Take Quiz";
      elements.quizBtn.classList.remove("is-hidden");
      elements.quizBtn.disabled = false;
    } else if (stepState.learned) {
      elements.chapterStatus.textContent = "📝 Work through the practice and checkpoints before moving on.";
    } else {
      elements.chapterStatus.textContent = "📘 Read the lesson, follow the checkpoints, and move forward when you are ready.";
      elements.practiceBtn.textContent = "I am ready to practice";
      elements.practiceBtn.classList.remove("is-hidden");
      elements.practiceBtn.disabled = false;
    }
    elements.lessonCheckpointBar.innerHTML =
      '<div class="checkpoint-chip ' + (stepState.learned || completed ? "done" : "pending") + '">1. Learn</div>' +
      '<div class="checkpoint-chip ' + (stepState.practiced || completed ? "done" : "pending") + '">2. Practice</div>' +
      '<div class="checkpoint-chip ' + (completed ? "done" : "pending") + '">3. Quiz</div>';

    if (completed) {
      if (chapter.quiz && typeof chapter.quiz === "object") {
        elements.activityBox.innerHTML = "<p>Quiz passed. This chapter is complete.</p>";
      } else {
        elements.activityBox.innerHTML = "<p>" + chapter.quiz + "</p>";
      }
    } else if (!stepState.learned) {
      renderLearnContent(chapter);
    } else if (!stepState.practiced) {
      renderPracticeStage(chapter);
    } else {
      renderQuizReadyState(chapter);
    }
  }

  function renderReadingChapterOptions() {
    const lessonChapters = getChapters(state.readingBook);
    const bookMeta = getBookMetaByName(state.readingBook);
    const chapterCount = bookMeta ? bookMeta.chaptersCount : lessonChapters.length;
    const chapterOptions = Array.from({ length: chapterCount }, function (_, index) {
      return {
        value: String(index),
        label: state.readingBook + " " + (index + 1)
      };
    });

    if (state.readingChapterIndex >= chapterOptions.length) {
      state.readingChapterIndex = 0;
    }

    populateSelect(elements.readingChapterSelect, chapterOptions);
    elements.readingChapterSelect.value = String(state.readingChapterIndex);
    renderBibleReading();
  }

  function renderBibleReading() {
    const lessonChapters = getChapters(state.readingBook);
    const chapter = lessonChapters[state.readingChapterIndex];
    const bookMeta = getBookMetaByName(state.readingBook);

    elements.readingBookSelect.value = state.readingBook;
    elements.readingChapterSelect.value = String(state.readingChapterIndex);

    if (chapter) {
      elements.readingTitle.textContent = chapter.title;
      elements.readingSummary.textContent = chapter.readerText;
      renderBibleStudyGuide(chapter, bookMeta, state.readingChapterIndex + 1);
      return;
    }

    elements.readingTitle.textContent = state.readingBook + " " + (state.readingChapterIndex + 1);
    elements.readingSummary.textContent =
      (bookMeta ? bookMeta.shortDescription + " " : "") +
      "This chapter is available in Bible Reading mode as part of the app's full 66-book structure, even if a guided lesson has not been added yet.";
    renderBibleStudyGuide(null, bookMeta, state.readingChapterIndex + 1);
  }

  function formatTimer(seconds) {
    const safeSeconds = Math.max(0, seconds);
    const minutes = Math.floor(safeSeconds / 60);
    const remainingSeconds = safeSeconds % 60;
    return String(minutes).padStart(2, "0") + ":" + String(remainingSeconds).padStart(2, "0");
  }

  function updateTimerDisplay() {
    elements.studyMinutesInput.value = String(state.timerMinutes);
    elements.studyTimerDisplay.textContent = formatTimer(state.timerRemainingSeconds);

    if (state.timerRunning) {
      elements.studyTimerStatus.textContent = "Study timer is running. Stay focused and keep reading.";
    } else if (state.timerRemainingSeconds === 0) {
      elements.studyTimerStatus.textContent = "Time is up. Finish your thought, pray, or start another session.";
    } else if (state.timerRemainingSeconds !== state.timerMinutes * 60) {
      elements.studyTimerStatus.textContent = "Timer paused. Resume when you're ready to continue.";
    } else {
      elements.studyTimerStatus.textContent = "Choose a time and begin your study session.";
    }
  }

  function stopStudyTimer() {
    if (state.timerIntervalId) {
      clearInterval(state.timerIntervalId);
      state.timerIntervalId = null;
    }
    state.timerRunning = false;
  }

  function startStudyTimer() {
    stopStudyTimer();
    state.timerRunning = true;
    updateTimerDisplay();

    state.timerIntervalId = setInterval(function () {
      if (state.timerRemainingSeconds > 0) {
        state.timerRemainingSeconds -= 1;
        updateTimerDisplay();
        return;
      }

      stopStudyTimer();
      updateTimerDisplay();
    }, 1000);
  }

  function resetStudyTimer() {
    stopStudyTimer();
    state.timerRemainingSeconds = state.timerMinutes * 60;
    updateTimerDisplay();
  }

  function renderBibleStudyGuide(chapter, bookMeta, chapterNumber) {
    const bookName = state.readingBook;
    const chapterLabel = bookName + " " + chapterNumber;
    const lessonPoints = chapter && Array.isArray(chapter.learn)
      ? chapter.learn.map(function (section) {
          return (
            '<div class="guide-section">' +
              "<h4>" + section.heading + "</h4>" +
              '<ul class="guide-bullets">' +
              section.bullets.map(function (bullet) {
                return "<li>" + bullet + "</li>";
              }).join("") +
              "</ul>" +
            "</div>"
          );
        }).join("")
      : "";

    const focusedPrompt = chapter && chapter.practice && typeof chapter.practice === "object"
      ? chapter.practice.reflectionPrompt
      : "What does this chapter show you about God's character, His people, or His purposes?";

    const observationPrompt = chapter && chapter.summary
      ? "What image, phrase, event, or repeated idea stands out most from " + chapterLabel + "?"
      : "What stands out first as you read " + chapterLabel + "?";

    const applicationPrompt = chapter && chapter.practice && typeof chapter.practice === "object"
      ? chapter.practice.observationPrompt
      : "How could one truth from this chapter shape your prayers, choices, or attitude today?";

    elements.readingGuide.innerHTML =
      '<div class="guide-section">' +
        "<h4>Observe</h4>" +
        "<p>" + observationPrompt + "</p>" +
        '<div class="guide-tip">Use a highlighter or sticky note to mark the phrase, event, or image that stands out most.</div>' +
      "</div>" +
      '<div class="guide-section">' +
        "<h4>Understand</h4>" +
        "<p>" + focusedPrompt + "</p>" +
        '<div class="guide-tip">Write your thoughts in a notebook or Bible journal instead of answering inside the app.</div>' +
      "</div>" +
      '<div class="guide-section">' +
        "<h4>Apply</h4>" +
        "<p>" + applicationPrompt + "</p>" +
        '<div class="guide-tip">Add one personal takeaway to a sticky note, margin note, or study notebook.</div>' +
      "</div>" +
      (lessonPoints
        ? '<div class="guide-section">' +
            "<h4>Lesson Notes</h4>" +
            lessonPoints +
          "</div>"
        : '<div class="guide-section">' +
            "<h4>Guide Question</h4>" +
            "<p>" + chapterLabel + " belongs to <strong>" + (bookMeta ? bookMeta.category : "this part of Scripture") + "</strong>. How does that help frame what you are reading?</p>" +
          "</div>");
  }

  function pickVersePracticeQuestion() {
    const availablePool = versePracticePool.filter(function (item) {
      return state.versePracticeFilter === "All" || item.book === state.versePracticeFilter;
    });
    const usedAnswers = {};
    const sourcePool = availablePool.length ? availablePool : versePracticePool;
    const promptIndex = Math.floor(Math.random() * sourcePool.length);
    const question = sourcePool[promptIndex];
    const options = [question.answer];

    usedAnswers[question.answer] = true;

    while (options.length < 4 && options.length < sourcePool.length) {
      const randomItem = sourcePool[Math.floor(Math.random() * sourcePool.length)];

      if (!usedAnswers[randomItem.answer]) {
        usedAnswers[randomItem.answer] = true;
        options.push(randomItem.answer);
      }
    }

    for (let index = options.length - 1; index > 0; index -= 1) {
      const swapIndex = Math.floor(Math.random() * (index + 1));
      const temp = options[index];
      options[index] = options[swapIndex];
      options[swapIndex] = temp;
    }

    return {
      prompt: question.prompt,
      correct: question.answer,
      options: options,
      label: question.label
    };
  }

  function attachChoiceHandlers(container, selector, correctValue, successText, errorText, attributeName) {
    container.querySelectorAll(selector).forEach(function (button) {
      button.addEventListener("click", function () {
        const result = container.querySelector(".practice-result");

        container.querySelectorAll(selector).forEach(function (item) {
          item.classList.remove("correct", "incorrect");
          if (item.getAttribute(attributeName) === correctValue) {
            item.classList.add("correct");
          }
        });

        if (button.getAttribute(attributeName) !== correctValue) {
          button.classList.add("incorrect");
        }

        result.textContent = button.getAttribute(attributeName) === correctValue ? successText : errorText;
      });
    });
  }

  function buildOrderPracticeCard() {
    const allBooks = getBookMetadataList();
    const startIndex = Math.floor(Math.random() * Math.max(1, allBooks.length - 4));
    const slice = allBooks.slice(startIndex, startIndex + 4);
    const ordered = slice.slice().sort(function (a, b) {
      return a.order - b.order;
    });

    return {
      title: "Book Order Quiz",
      prompt: "Which book comes first in this set?",
      frontMeta: slice.map(function (book) {
        return book.name;
      }).join(" • "),
      answerTitle: ordered[0].name,
      answerBody: ordered[0].name + " comes first in Bible order. The set in order is: " + ordered.map(function (book) {
        return book.name;
      }).join(", ") + "."
    };
  }

  function buildQuickReviewCard() {
    const card = quickReviewPool[Math.floor(Math.random() * quickReviewPool.length)];

    return {
      title: "Quick Review",
      prompt: "Read the question, answer it aloud or in your notebook, then flip the card to check yourself.",
      frontMeta: card.section,
      frontBody: card.question,
      answerTitle: "Answer",
      answerBody: card.answer
    };
  }

  function buildVersePracticeCard() {
    if (!state.versePracticeQuestion) {
      state.versePracticeQuestion = pickVersePracticeQuestion();
    }

    return {
      title: "Which Verse Is This?",
      prompt: "Read the verse and identify the reference.",
      frontMeta: state.versePracticeQuestion.label,
      frontBody: state.versePracticeQuestion.prompt,
      answerTitle: state.versePracticeQuestion.correct,
      answerBody: "This verse comes from " + state.versePracticeQuestion.correct + ". Use the label above to place it in the bigger story."
    };
  }

  function getCurrentPracticeCard() {
    if (state.currentPracticeCard && state.currentPracticeCard.mode === state.practiceMode) {
      return state.currentPracticeCard;
    }

    let card;

    if (state.practiceMode === "verse") {
      card = buildVersePracticeCard();
    } else if (state.practiceMode === "order") {
      card = buildOrderPracticeCard();
    } else {
      card = buildQuickReviewCard();
    }

    state.currentPracticeCard = {
      mode: state.practiceMode,
      card: card
    };

    return state.currentPracticeCard;
  }

  function advancePracticeCard() {
    state.practiceCardRevealed = false;

    if (state.practiceMode === "verse") {
      state.versePracticeQuestion = pickVersePracticeQuestion();
    }

    state.currentPracticeCard = null;
    renderPracticeMode();
  }

  function renderVersePractice() {
    const question = getCurrentPracticeCard().card;

    elements.practicePanel.innerHTML =
      '<div class="practice-filter-row">' +
        '<button type="button" class="tab-btn practice-filter-btn ' + (state.versePracticeFilter === "All" ? "active" : "") + '" data-verse-filter="All">All</button>' +
        '<button type="button" class="tab-btn practice-filter-btn ' + (state.versePracticeFilter === "Judges" ? "active" : "") + '" data-verse-filter="Judges">Judges</button>' +
        '<button type="button" class="tab-btn practice-filter-btn ' + (state.versePracticeFilter === "1 Samuel" ? "active" : "") + '" data-verse-filter="1 Samuel">1 Samuel</button>' +
      '</div>' +
      '<div class="flashcard-shell">' +
      '<div class="flashcard-face">' +
      '<p class="practice-question">' + question.title + "</p>" +
      "<p>" + question.prompt + "</p>" +
      '<div class="practice-filter-row">' +
      '<div class="flashcard-meta">' + question.frontMeta + '</div>' +
      '<div class="flashcard-content">' + question.frontBody + '</div>' +
      (state.practiceCardRevealed
        ? '<div class="flashcard-answer"><strong>' + question.answerTitle + '</strong><p>' + question.answerBody + "</p></div>"
        : '<div class="guide-tip">Think it through first, then reveal the answer when you are ready.</div>') +
      '<div class="flashcard-actions">' +
      '<button id="revealPracticeCardBtn" class="lesson-submit" type="button">' + (state.practiceCardRevealed ? "Hide Answer" : "Reveal Answer") + "</button>" +
      '<button id="nextPracticeCardBtn" class="timer-btn flashcard-next-btn" type="button">Next Flashcard</button>' +
      '</div>' +
      '</div>' +
      '</div>';

    document.getElementById("revealPracticeCardBtn").addEventListener("click", function () {
      state.practiceCardRevealed = !state.practiceCardRevealed;
      renderVersePractice();
    });

    document.getElementById("nextPracticeCardBtn").addEventListener("click", function () {
      advancePracticeCard();
    });

    elements.practicePanel.querySelectorAll("[data-verse-filter]").forEach(function (button) {
      button.addEventListener("click", function () {
        state.versePracticeFilter = button.getAttribute("data-verse-filter");
        state.practiceCardRevealed = false;
        state.versePracticeQuestion = pickVersePracticeQuestion();
        state.currentPracticeCard = null;
        renderVersePractice();
      });
    });
  }

  function renderOrderPractice() {
    const card = getCurrentPracticeCard().card;

    elements.practicePanel.innerHTML =
      '<div class="flashcard-shell">' +
        '<div class="flashcard-face">' +
          '<p class="practice-question">' + card.title + "</p>" +
          "<p>" + card.prompt + "</p>" +
          '<div class="flashcard-meta">' + card.frontMeta + '</div>' +
          (state.practiceCardRevealed
            ? '<div class="flashcard-answer"><strong>' + card.answerTitle + '</strong><p>' + card.answerBody + "</p></div>"
            : '<div class="guide-tip">Look carefully at the set first, then flip the card to check yourself.</div>') +
          '<div class="flashcard-actions">' +
            '<button id="revealPracticeCardBtn" class="lesson-submit" type="button">' + (state.practiceCardRevealed ? "Hide Answer" : "Reveal Answer") + "</button>" +
            '<button id="nextPracticeCardBtn" class="timer-btn flashcard-next-btn" type="button">Next Flashcard</button>' +
          '</div>' +
        "</div>" +
      "</div>";

    document.getElementById("revealPracticeCardBtn").addEventListener("click", function () {
      state.practiceCardRevealed = !state.practiceCardRevealed;
      renderOrderPractice();
    });

    document.getElementById("nextPracticeCardBtn").addEventListener("click", function () {
      advancePracticeCard();
    });
  }

  function renderQuickReview() {
    const card = getCurrentPracticeCard().card;

    elements.practicePanel.innerHTML =
      '<div class="flashcard-shell">' +
        '<div class="flashcard-face">' +
          '<p class="practice-question">' + card.title + "</p>" +
          "<p>" + card.prompt + "</p>" +
          '<div class="flashcard-meta">' + card.frontMeta + '</div>' +
          '<div class="flashcard-content">' + card.frontBody + '</div>' +
          (state.practiceCardRevealed
            ? '<div class="flashcard-answer"><strong>' + card.answerTitle + '</strong><p>' + card.answerBody + "</p></div>"
            : '<div class="guide-tip">Say the lesson idea out loud or explain it to someone before revealing the back of the card.</div>') +
          '<div class="flashcard-actions">' +
            '<button id="revealPracticeCardBtn" class="lesson-submit" type="button">' + (state.practiceCardRevealed ? "Hide Answer" : "Reveal Answer") + "</button>" +
            '<button id="nextPracticeCardBtn" class="timer-btn flashcard-next-btn" type="button">Next Flashcard</button>' +
          '</div>' +
        "</div>" +
      "</div>";

    document.getElementById("revealPracticeCardBtn").addEventListener("click", function () {
      state.practiceCardRevealed = !state.practiceCardRevealed;
      renderQuickReview();
    });

    document.getElementById("nextPracticeCardBtn").addEventListener("click", function () {
      advancePracticeCard();
    });
  }

  function renderPracticeMode() {
    document.querySelectorAll("[data-practice]").forEach(function (button) {
      button.classList.toggle("active", button.dataset.practice === state.practiceMode);
    });

    if (state.practiceMode === "verse") {
      renderVersePractice();
      return;
    }

    if (state.practiceMode === "order") {
      renderOrderPractice();
      return;
    }

    renderQuickReview();
  }

  function renderBooksLearnMode() {
    const grouped = getGroupedBibleBooks();
    const markup = Object.keys(grouped).map(function (testament) {
      const books = grouped[testament];

      return (
        '<section class="books-group">' +
          "<h4>" + testament + "</h4>" +
          '<div class="books-grid">' +
          books.map(function (book) {
            return (
              '<div class="books-card">' +
                '<div class="books-card-head">' + book.order + ". " + book.name + "</div>" +
                '<p><strong>' + book.category + "</strong> • " + book.chaptersCount + " chapters</p>" +
                "<p>" + book.shortDescription + "</p>" +
              "</div>"
            );
          }).join("") +
          "</div>" +
        "</section>"
      );
    }).join("");

    elements.booksLearningPanel.innerHTML = markup;
  }

  function renderBooksTestamentMode() {
    const promptBook = data.bibleBooks[45];
    const options = ["Old Testament", "New Testament"];

    elements.booksLearningPanel.innerHTML =
      '<p class="practice-question">Which Testament?</p>' +
      "<p><strong>" + promptBook.name + "</strong> belongs to which Testament?</p>" +
      '<div class="choice-list">' +
      options.map(function (option) {
        return '<button type="button" class="choice-btn" data-testament-choice="' + option + '">' + option + "</button>";
      }).join("") +
      '</div><div class="practice-result">Choose the correct Testament.</div>';

    attachChoiceHandlers(
      elements.booksLearningPanel,
      "[data-testament-choice]",
      promptBook.testament,
      "Correct. " + promptBook.name + " belongs to the " + promptBook.testament + ".",
      "Not quite. " + promptBook.name + " belongs to the " + promptBook.testament + ".",
      "data-testament-choice"
    );
  }

  function renderBooksCategoryMode() {
    const promptBook = data.bibleBooks[42];
    const options = ["Law", "Gospels", "History", "Prophecy"];

    elements.booksLearningPanel.innerHTML =
      '<p class="practice-question">Which Category?</p>' +
      "<p><strong>" + promptBook.name + "</strong> belongs to which category?</p>" +
      '<div class="choice-list">' +
      options.map(function (option) {
        return '<button type="button" class="choice-btn" data-category-choice="' + option + '">' + option + "</button>";
      }).join("") +
      '</div><div class="practice-result">Choose the best category.</div>';

    attachChoiceHandlers(
      elements.booksLearningPanel,
      "[data-category-choice]",
      promptBook.category,
      "Correct. " + promptBook.name + " belongs to the " + promptBook.category + " category.",
      "Not quite. " + promptBook.name + " belongs to the " + promptBook.category + " category.",
      "data-category-choice"
    );
  }

  function renderBooksOrderMode() {
    const options = ["Exodus", "Genesis", "Leviticus", "Numbers"];

    elements.booksLearningPanel.innerHTML =
      '<p class="practice-question">Book Order Quiz</p>' +
      "<p>Which book comes first in KJV order?</p>" +
      '<div class="choice-list">' +
      options.map(function (option) {
        return '<button type="button" class="choice-btn" data-order-choice="' + option + '">' + option + "</button>";
      }).join("") +
      '</div><div class="practice-result">Choose the earliest book in the list.</div>';

    attachChoiceHandlers(
      elements.booksLearningPanel,
      "[data-order-choice]",
      "Genesis",
      "Correct. Genesis is first in the Bible.",
      "Not quite. Genesis comes first, followed by Exodus, Leviticus, and Numbers.",
      "data-order-choice"
    );
  }

  function renderBooksLearning() {
    document.querySelectorAll("[data-books-mode]").forEach(function (button) {
      button.classList.toggle("active", button.dataset.booksMode === state.booksLearningMode);
    });

    elements.booksCategoryFilter.value = state.booksCategoryFilter;

    if (state.booksLearningMode === "learn") {
      renderBooksLearnMode();
      return;
    }

    if (state.booksLearningMode === "testament") {
      renderBooksTestamentMode();
      return;
    }

    if (state.booksLearningMode === "category") {
      renderBooksCategoryMode();
      return;
    }

    renderBooksOrderMode();
  }

  function showScreen(screenId) {
    document.querySelectorAll(".screen").forEach(function (screen) {
      screen.classList.toggle("active", screen.id === screenId);
    });

    state.currentScreen = screenId;

    if (screenId === "studyPathScreen") {
      renderStudyPath();
    } else if (screenId === "chapterDetailScreen") {
      renderChapterDetail();
    } else if (screenId === "bibleScreen") {
      renderBibleReading();
    } else if (screenId === "socialScreen") {
      renderSocialScreen();
    } else if (screenId === "practiceModeScreen") {
      renderPracticeMode();
    }
  }

  function renderLearnContent(chapter) {
    if (Array.isArray(chapter.learn)) {
      elements.activityBox.innerHTML = chapter.learn.map(function (section) {
        return (
          '<div class="lesson-section">' +
            "<h3>" + section.heading + "</h3>" +
            '<ul class="lesson-bullets">' +
            section.bullets.map(function (bullet) {
              return "<li>" + bullet + "</li>";
            }).join("") +
            "</ul>" +
          "</div>"
        );
      }).join("");
      return;
    }

    elements.activityBox.innerHTML = "<p>" + chapter.learn + "</p>";
  }

  function renderPracticeSuccess(message) {
    renderChapterDetail();
    elements.activityBox.innerHTML =
      '<div class="practice-feedback success">' +
        "<p>" + message + "</p>" +
      "</div>" +
      elements.activityBox.innerHTML;
  }

  function renderSimplePractice(chapter) {
    elements.activityBox.innerHTML =
      '<div class="lesson-section">' +
        "<h3>Practice</h3>" +
        "<p>" + chapter.practice + "</p>" +
      "</div>" +
      '<button id="completePracticeBtn" class="lesson-submit" type="button">I finished this practice</button>';

    document.getElementById("completePracticeBtn").addEventListener("click", function () {
      getStepState(state.currentBook, state.currentChapterIndex).practiced = true;
      renderChapterDetail();
    });
  }

  function renderPracticeStage(chapter) {
    if (chapter.practice && typeof chapter.practice === "object") {
      renderInteractivePractice(chapter);
      return;
    }

    renderSimplePractice(chapter);
  }

  function renderQuizReadyState(chapter) {
    const totalQuestions = chapter.quiz && typeof chapter.quiz === "object" && Array.isArray(chapter.quiz.questions)
      ? chapter.quiz.questions.length
      : null;

    elements.activityBox.innerHTML =
      '<div class="lesson-section">' +
        "<h3>Quiz Ready</h3>" +
        "<p>You completed the practice for " + chapter.title + ". When you feel ready, use the button below to begin the quiz.</p>" +
        (totalQuestions
          ? "<p>This quiz has " + totalQuestions + " question" + (totalQuestions === 1 ? "" : "s") + ".</p>"
          : "") +
      "</div>";
  }

  function renderInteractivePractice(chapter) {
    elements.activityBox.innerHTML =
      '<div class="lesson-section">' +
        "<p>" + chapter.practice.intro + "</p>" +
      "</div>" +
      '<div class="lesson-section">' +
        "<label class=\"lesson-label\" for=\"practiceObservation\">Observation</label>" +
        "<p>" + chapter.practice.observationPrompt + "</p>" +
        '<input id="practiceObservation" class="lesson-input" type="text" placeholder="Write a short observation" />' +
      "</div>" +
      '<div class="lesson-section">' +
        "<label class=\"lesson-label\" for=\"practiceReflection\">Reflection</label>" +
        "<p>" + chapter.practice.reflectionPrompt + "</p>" +
        '<textarea id="practiceReflection" class="lesson-textarea" rows="4" placeholder="Write your reflection"></textarea>' +
      "</div>" +
      '<div class="lesson-section">' +
        "<label class=\"lesson-label\" for=\"practiceFillBlank\">Fill In The Blank</label>" +
        "<p>" + chapter.practice.fillBlank.prompt + "</p>" +
        '<input id="practiceFillBlank" class="lesson-input" type="text" placeholder="Type your answer" />' +
      "</div>" +
      '<button id="practiceSubmitBtn" class="lesson-submit" type="button">Mark Practice Complete</button>' +
      '<div id="practiceFeedback" class="practice-feedback"></div>';

    document.getElementById("practiceSubmitBtn").addEventListener("click", function () {
      const observation = document.getElementById("practiceObservation").value.trim();
      const reflection = document.getElementById("practiceReflection").value.trim();
      const fillBlank = document.getElementById("practiceFillBlank").value.trim();
      const feedback = document.getElementById("practiceFeedback");
      const acceptedAnswers = chapter.practice.fillBlank.acceptableAnswers.map(normalizeAnswer);

      if (!observation || !reflection) {
        feedback.innerHTML = "<p>Please complete the observation and reflection before continuing.</p>";
        return;
      }

      if (acceptedAnswers.indexOf(normalizeAnswer(fillBlank)) === -1) {
        feedback.innerHTML = "<p>Try the fill-in-the-blank again. Read the vision details carefully.</p>";
        return;
      }

      getStepState(state.currentBook, state.currentChapterIndex).practiced = true;
      renderPracticeSuccess(chapter.practice.successMessage);
    });
  }

  function renderQuizSummary(chapter, quizState) {
    const total = chapter.quiz.questions.length;
    const passed = quizState.score >= chapter.quiz.passingScore;

    if (passed) {
      completeChapter(state.currentBook, state.currentChapterIndex);
      renderHomeProgress();
      renderStudyPath();
      renderChapterDetail();
    } else {
      renderChapterDetail();
    }

    elements.activityBox.innerHTML =
      '<div class="lesson-section">' +
        "<h3>Quiz Complete</h3>" +
        "<p>Your score: " + quizState.score + " / " + total + "</p>" +
        "<p>Passing score: " + chapter.quiz.passingScore + " / " + total + "</p>" +
        "<p>" + (passed
          ? "You passed and unlocked the next chapter."
          : "You did not pass yet. Review the lesson and try again.") + "</p>" +
      "</div>" +
      '<button id="retryQuizBtn" class="lesson-submit" type="button">' + (passed ? "Review Quiz Again" : "Retry Quiz") + "</button>";

    document.getElementById("retryQuizBtn").addEventListener("click", function () {
      startInteractiveQuiz(chapter);
    });
  }

  function renderQuizQuestion(chapter) {
    const quizState = state.activeLessonQuiz;
    const question = chapter.quiz.questions[quizState.currentIndex];

    elements.activityBox.innerHTML =
      '<div class="quiz-header">' +
        "<div class=\"status-pill\">Question " + (quizState.currentIndex + 1) + " of " + chapter.quiz.questions.length + "</div>" +
        "<div class=\"status-pill\">Score: " + quizState.score + "</div>" +
      "</div>" +
      '<div class="lesson-section">' +
        "<h3>" + question.question + "</h3>" +
      "</div>" +
      '<div class="choice-list quiz-choices">' +
      question.options.map(function (option, index) {
        return '<button type="button" class="choice-btn quiz-choice" data-quiz-option="' + index + '">' + option + "</button>";
      }).join("") +
      '</div>' +
      '<div id="quizFeedback" class="practice-feedback"></div>';

    elements.activityBox.querySelectorAll("[data-quiz-option]").forEach(function (button) {
      button.addEventListener("click", function () {
        if (quizState.answered) {
          return;
        }

        const selectedIndex = Number(button.getAttribute("data-quiz-option"));
        const isCorrect = selectedIndex === question.answerIndex;
        const feedback = document.getElementById("quizFeedback");

        quizState.answered = true;

        if (isCorrect) {
          quizState.score += 1;
        }

        elements.activityBox.querySelectorAll("[data-quiz-option]").forEach(function (item) {
          const optionIndex = Number(item.getAttribute("data-quiz-option"));
          item.classList.remove("correct", "incorrect");

          if (optionIndex === question.answerIndex) {
            item.classList.add("correct");
          } else if (optionIndex === selectedIndex && !isCorrect) {
            item.classList.add("incorrect");
          }
        });

        feedback.innerHTML =
          "<p>" + (isCorrect ? "Correct." : "Not quite.") + " " + question.explanation + "</p>" +
          '<button id="quizNextBtn" class="lesson-submit" type="button">' +
          (quizState.currentIndex === chapter.quiz.questions.length - 1 ? "Finish Quiz" : "Next Question") +
          "</button>";

        document.getElementById("quizNextBtn").addEventListener("click", function () {
          quizState.currentIndex += 1;
          quizState.answered = false;

          if (quizState.currentIndex >= chapter.quiz.questions.length) {
            renderQuizSummary(chapter, quizState);
            return;
          }

          renderQuizQuestion(chapter);
        });
      });
    });
  }

  function startInteractiveQuiz(chapter) {
    state.activeLessonQuiz = {
      book: state.currentBook,
      chapterIndex: state.currentChapterIndex,
      currentIndex: 0,
      score: 0,
      answered: false
    };

    renderQuizQuestion(chapter);
  }

  function handleLearn() {
    const stepState = getStepState(state.currentBook, state.currentChapterIndex);
    stepState.learned = true;
    renderChapterDetail();
  }

  function handlePractice() {
    handleLearn();
  }

  function handleQuiz() {
    const chapter = getCurrentChapter();

    if (chapter.quiz && typeof chapter.quiz === "object" && Array.isArray(chapter.quiz.questions)) {
      startInteractiveQuiz(chapter);
      return;
    }

    completeChapter(state.currentBook, state.currentChapterIndex);
    renderHomeProgress();
    renderStudyPath();
    renderChapterDetail();
    elements.activityBox.innerHTML = "<p>" + chapter.quiz + "</p>";
  }

  function bindEvents() {
    document.querySelectorAll("[data-route]").forEach(function (button) {
      button.addEventListener("click", function () {
        showScreen(button.dataset.route);
      });
    });

    document.querySelectorAll("[data-practice]").forEach(function (button) {
      button.addEventListener("click", function () {
        state.practiceMode = button.dataset.practice;
        state.practiceCardRevealed = false;
        state.currentPracticeCard = null;
        if (state.practiceMode === "verse") {
          state.versePracticeQuestion = pickVersePracticeQuestion();
        }
        renderPracticeMode();
      });
    });

    document.querySelectorAll("[data-books-mode]").forEach(function (button) {
      button.addEventListener("click", function () {
        state.booksLearningMode = button.dataset.booksMode;
        renderBooksLearning();
      });
    });

    elements.studyBookSelect.addEventListener("change", function (event) {
      state.currentBook = event.target.value;
      renderStudyPath();
    });

    elements.booksCategoryFilter.addEventListener("change", function (event) {
      state.booksCategoryFilter = event.target.value;
      renderBooksLearning();
    });

    elements.readingBookSelect.addEventListener("change", function (event) {
      state.readingBook = event.target.value;
      state.readingChapterIndex = 0;
      renderReadingChapterOptions();
    });

    elements.readingChapterSelect.addEventListener("change", function (event) {
      state.readingChapterIndex = Number(event.target.value);
      renderBibleReading();
    });

    elements.studyMinutesInput.addEventListener("change", function (event) {
      const parsedMinutes = Number(event.target.value);
      const clampedMinutes = Math.min(180, Math.max(1, Number.isFinite(parsedMinutes) ? parsedMinutes : 15));
      state.timerMinutes = clampedMinutes;
      state.timerRemainingSeconds = clampedMinutes * 60;
      stopStudyTimer();
      updateTimerDisplay();
    });

    elements.studyTimerStart.addEventListener("click", function () {
      if (state.timerRemainingSeconds <= 0) {
        state.timerRemainingSeconds = state.timerMinutes * 60;
      }
      startStudyTimer();
    });

    elements.studyTimerPause.addEventListener("click", function () {
      stopStudyTimer();
      updateTimerDisplay();
    });

    elements.studyTimerReset.addEventListener("click", function () {
      resetStudyTimer();
    });

    elements.learnBtn.addEventListener("click", handleLearn);
    elements.practiceBtn.addEventListener("click", handlePractice);
    elements.quizBtn.addEventListener("click", handleQuiz);
    elements.startTodayBtn.addEventListener("click", function () {
      const nextLesson = getNextUnlockedLesson();
      state.currentBook = nextLesson.book;
      state.currentChapterIndex = nextLesson.chapterIndex;
      showScreen("chapterDetailScreen");
    });
    elements.homeShortcut.addEventListener("click", function () {
      showScreen("homeScreen");
    });
    elements.socialShortcut.addEventListener("click", function () {
      showScreen("socialScreen");
    });
  }

  function init() {
    setDailyVerse();
    initializeSelects();
    renderHomeProgress();
    renderProfileSummary();
    renderStudyPath();
    renderBibleReading();
    updateTimerDisplay();
    renderPracticeMode();
    bindEvents();
  }

  init();
}());
