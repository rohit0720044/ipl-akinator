import { readFile, writeFile } from "node:fs/promises";

const squads = {
  csk: {
    captain: "Ruturaj Gaikwad",
    players: [
      ["Ruturaj Gaikwad", "Batsman"],
      ["MS Dhoni", "Wicketkeeper-Batsman"],
      ["Sanju Samson", "Wicketkeeper-Batsman"],
      ["Dewald Brevis", "Batsman"],
      ["Kartik Sharma", "Wicketkeeper-Batsman"],
      ["Sarfaraz Khan", "Batsman"],
      ["Urvil Patel", "Wicketkeeper-Batsman"],
      ["Jamie Overton", "All-Rounder"],
      ["Ramakrishna Ghosh", "All-Rounder"],
      ["Prashant Veer", "All-Rounder"],
      ["Matthew William Short", "All-Rounder"],
      ["Aman Khan", "All-Rounder"],
      ["Zak Foulkes", "All-Rounder"],
      ["Shivam Dube", "All-Rounder"],
      ["Khaleel Ahmed", "Bowler"],
      ["Noor Ahmad", "Bowler"],
      ["Anshul Kamboj", "Bowler"],
      ["Mukesh Choudhary", "Bowler"],
      ["Shreyas Gopal", "Bowler"],
      ["Gurjapneet Singh", "Bowler"],
      ["Akeal Hosein", "Bowler"],
      ["Matt Henry", "Bowler"],
      ["Rahul Chahar", "Bowler"],
      ["Spencer Johnson", "Bowler"],
      ["Akash Madhwal", "Bowler"]
    ]
  },
  rcb: {
    captain: "Rajat Patidar",
    players: [
      ["Rajat Patidar", "Batsman"],
      ["Devdutt Padikkal", "Batsman"],
      ["Virat Kohli", "Batsman"],
      ["Phil Salt", "Wicketkeeper-Batsman"],
      ["Jitesh Sharma", "Wicketkeeper-Batsman"],
      ["Jordan Cox", "Wicketkeeper-Batsman"],
      ["Krunal Pandya", "All-Rounder"],
      ["Swapnil Singh", "All-Rounder"],
      ["Tim David", "All-Rounder"],
      ["Romario Shepherd", "All-Rounder"],
      ["Jacob Bethell", "All-Rounder"],
      ["Venkatesh Iyer", "All-Rounder"],
      ["Satvik Deswal", "All-Rounder"],
      ["Mangesh Yadav", "All-Rounder"],
      ["Vicky Ostwal", "All-Rounder"],
      ["Vihaan Malhotra", "All-Rounder"],
      ["Kanishk Chouhan", "All-Rounder"],
      ["Josh Hazlewood", "Bowler"],
      ["Rasikh Dar", "Bowler"],
      ["Suyash Sharma", "Bowler"],
      ["Bhuvneshwar Kumar", "Bowler"],
      ["Nuwan Thushara", "Bowler"],
      ["Abhinandan Singh", "Bowler"],
      ["Jacob Duffy", "Bowler"],
      ["Yash Dayal", "Bowler"]
    ]
  },
  mi: {
    captain: "Hardik Pandya",
    players: [
      ["Rohit Sharma", "Batsman"],
      ["Surya Kumar Yadav", "Batsman"],
      ["Robin Minz", "Wicketkeeper-Batsman"],
      ["Sherfane Rutherford", "Batsman"],
      ["Ryan Rickelton", "Wicketkeeper-Batsman"],
      ["Quinton de Kock", "Wicketkeeper-Batsman"],
      ["Danish Malewar", "Batsman"],
      ["N. Tilak Varma", "Batsman"],
      ["Hardik Pandya", "All-Rounder"],
      ["Naman Dhir", "All-Rounder"],
      ["Raj Angad Bawa", "All-Rounder"],
      ["Mayank Rawat", "All-Rounder"],
      ["Krish Bhagat", "All-Rounder"],
      ["Corbin Bosch", "All-Rounder"],
      ["Will Jacks", "All-Rounder"],
      ["Shardul Thakur", "All-Rounder"],
      ["Trent Boult", "Bowler"],
      ["Mayank Markande", "Bowler"],
      ["Deepak Chahar", "Bowler"],
      ["Ashwani Kumar", "Bowler"],
      ["Raghu Sharma", "Bowler"],
      ["Mohammad Izhar", "Bowler"],
      ["Keshav Maharaj", "Bowler"],
      ["Allah Ghazanfar", "Bowler"],
      ["Jasprit Bumrah", "Bowler"]
    ]
  },
  gt: {
    captain: "Shubman Gill",
    players: [
      ["Shubman Gill", "Batsman"],
      ["Jos Buttler", "Wicketkeeper-Batsman"],
      ["Kumar Kushagra", "Wicketkeeper-Batsman"],
      ["Anuj Rawat", "Wicketkeeper-Batsman"],
      ["Connor Esterhuizen", "Batsman"],
      ["Glenn Phillips", "Batsman"],
      ["Sai Sudharsan", "Batsman"],
      ["Nishant Sindhu", "All-Rounder"],
      ["Washington Sundar", "All-Rounder"],
      ["Mohd. Arshad Khan", "All-Rounder"],
      ["Sai Kishore", "All-Rounder"],
      ["Jayant Yadav", "All-Rounder"],
      ["Jason Holder", "All-Rounder"],
      ["Rahul Tewatia", "All-Rounder"],
      ["Shahrukh Khan", "All-Rounder"],
      ["Kagiso Rabada", "Bowler"],
      ["Mohammed Siraj", "Bowler"],
      ["Prasidh Krishna", "Bowler"],
      ["Manav Suthar", "Bowler"],
      ["Gurnoor Singh Brar", "Bowler"],
      ["Ishant Sharma", "Bowler"],
      ["Ashok Sharma", "Bowler"],
      ["Luke Wood", "Bowler"],
      ["Kulwant Khejroliya", "Bowler"],
      ["Rashid Khan", "Bowler"]
    ]
  },
  kkr: {
    captain: "Ajinkya Rahane",
    players: [
      ["Ajinkya Rahane", "Batsman"],
      ["Rinku Singh", "Batsman"],
      ["Angkrish Raghuvanshi", "Batsman"],
      ["Manish Pandey", "Batsman"],
      ["Finn Allen", "Wicketkeeper-Batsman"],
      ["Tejasvi Singh", "Wicketkeeper-Batsman"],
      ["Rahul Tripathi", "Batsman"],
      ["Tim Seifert", "Wicketkeeper-Batsman"],
      ["Rovman Powell", "Batsman"],
      ["Anukul Roy", "All-Rounder"],
      ["Cameron Green", "All-Rounder"],
      ["Sarthak Ranjan", "All-Rounder"],
      ["Daksh Kamra", "All-Rounder"],
      ["Rachin Ravindra", "All-Rounder"],
      ["Ramandeep Singh", "All-Rounder"],
      ["Sunil Narine", "All-Rounder"],
      ["Blessing Muzarabani", "Bowler"],
      ["Vaibhav Arora", "Bowler"],
      ["Matheesha Pathirana", "Bowler"],
      ["Kartik Tyagi", "Bowler"],
      ["Prashant Solanki", "Bowler"],
      ["Saurabh Dubey", "Bowler"],
      ["Navdeep Saini", "Bowler"],
      ["Umran Malik", "Bowler"],
      ["Varun Chakaravarthy", "Bowler"]
    ]
  },
  srh: {
    captain: "Pat Cummins",
    players: [
      ["Ishan Kishan", "Wicketkeeper-Batsman"],
      ["Aniket Verma", "Batsman"],
      ["Smaran Ravichandran", "Batsman"],
      ["Salil Arora", "Wicketkeeper-Batsman"],
      ["Heinrich Klaasen", "Wicketkeeper-Batsman"],
      ["Travis Head", "Batsman"],
      ["Harshal Patel", "All-Rounder"],
      ["Kamindu Mendis", "All-Rounder"],
      ["Harsh Dubey", "All-Rounder"],
      ["Shivang Kumar", "All-Rounder"],
      ["Krains Fuletra", "All-Rounder"],
      ["Liam Livingstone", "All-Rounder"],
      ["R.S Ambrish", "All-Rounder"],
      ["Abhishek Sharma", "All-Rounder"],
      ["Nitish Kumar Reddy", "All-Rounder"],
      ["Pat Cummins", "Bowler"],
      ["Zeeshan Ansari", "Bowler"],
      ["Jaydev Unadkat", "Bowler"],
      ["Eshan Malinga", "Bowler"],
      ["Sakib Hussain", "Bowler"],
      ["Onkar Tarmale", "Bowler"],
      ["Amit Kumar", "Bowler"],
      ["Praful Hinge", "Bowler"],
      ["Dilshan Madushanka", "Bowler"],
      ["Gerald Coetzee", "Bowler"]
    ]
  },
  rr: {
    captain: "Riyan Parag",
    players: [
      ["Shubham Dubey", "Batsman"],
      ["Vaibhav Sooryavanshi", "Batsman"],
      ["Donovan Ferreira", "Wicketkeeper-Batsman"],
      ["Lhuan-dre Pretorious", "Wicketkeeper-Batsman"],
      ["Ravi Singh", "Wicketkeeper-Batsman"],
      ["Aman Rao Perala", "Batsman"],
      ["Shimron Hetmyer", "Batsman"],
      ["Yashasvi Jaiswal", "Batsman"],
      ["Dhruv Jurel", "Wicketkeeper-Batsman"],
      ["Riyan Parag", "All-Rounder"],
      ["Yudhvir Singh Charak", "All-Rounder"],
      ["Ravindra Jadeja", "All-Rounder"],
      ["Dasun Shanaka", "All-Rounder"],
      ["Jofra Archer", "Bowler"],
      ["Tushar Deshpande", "Bowler"],
      ["Kwena Maphaka", "Bowler"],
      ["Ravi Bishnoi", "Bowler"],
      ["Sushant Mishra", "Bowler"],
      ["Yash Raj Punja", "Bowler"],
      ["Vignesh Puthur", "Bowler"],
      ["Brijesh Sharma", "Bowler"],
      ["Adam Milne", "Bowler"],
      ["Kuldeep Sen", "Bowler"],
      ["Sandeep Sharma", "Bowler"],
      ["Nandre Burger", "Bowler"]
    ]
  },
  pbks: {
    captain: "Shreyas Iyer",
    players: [
      ["Shreyas Iyer", "Batsman"],
      ["Nehal Wadhera", "Batsman"],
      ["Vishnu Vinod", "Wicketkeeper-Batsman"],
      ["Harnoor Pannu", "Batsman"],
      ["Pyla Avinash", "Batsman"],
      ["Prabhsimran Singh", "Wicketkeeper-Batsman"],
      ["Shashank Singh", "Batsman"],
      ["Marcus Stoinis", "All-Rounder"],
      ["Harpreet Brar", "All-Rounder"],
      ["Marco Jansen", "All-Rounder"],
      ["Azmatullah Omarzai", "All-Rounder"],
      ["Priyansh Arya", "All-Rounder"],
      ["Musheer Khan", "All-Rounder"],
      ["Suryansh Shedge", "All-Rounder"],
      ["Mitch Owen", "All-Rounder"],
      ["Cooper Connolly", "All-Rounder"],
      ["Ben Dwarshuis", "All-Rounder"],
      ["Arshdeep Singh", "Bowler"],
      ["Yuzvendra Chahal", "Bowler"],
      ["Vyshak Vijaykumar", "Bowler"],
      ["Yash Thakur", "Bowler"],
      ["Xavier Bartlett", "Bowler"],
      ["Pravin Dubey", "Bowler"],
      ["Vishal Nishad", "Bowler"],
      ["Lockie Ferguson", "Bowler"]
    ]
  },
  lsg: {
    captain: "Rishabh Pant",
    players: [
      ["Rishabh Pant", "Wicketkeeper-Batsman"],
      ["Aiden Markram", "Batsman"],
      ["Himmat Singh", "Batsman"],
      ["Matthew Breetzke", "Batsman"],
      ["Mukul Choudhary", "Wicketkeeper-Batsman"],
      ["Akshat Raghuwanshi", "Batsman"],
      ["Josh Inglis", "Wicketkeeper-Batsman"],
      ["Nicholas Pooran", "Wicketkeeper-Batsman"],
      ["Mitchell Marsh", "All-Rounder"],
      ["Abdul Samad", "All-Rounder"],
      ["Shahbaz Ahamad", "All-Rounder"],
      ["Arshin Kulkarni", "All-Rounder"],
      ["Ayush Badoni", "All-Rounder"],
      ["Mohammad Shami", "Bowler"],
      ["Avesh Khan", "Bowler"],
      ["M. Siddharth", "Bowler"],
      ["Digvesh Singh", "Bowler"],
      ["Akash Singh", "Bowler"],
      ["Prince Yadav", "Bowler"],
      ["Arjun Tendulkar", "Bowler"],
      ["Anrich Nortje", "Bowler"],
      ["Naman Tiwari", "Bowler"],
      ["George Linde", "Bowler"],
      ["Mayank Yadav", "Bowler"],
      ["Mohsin Khan", "Bowler"]
    ]
  },
  dc: {
    captain: "Axar Patel",
    players: [
      ["KL Rahul", "Wicketkeeper-Batsman"],
      ["Karun Nair", "Batsman"],
      ["David Miller", "Batsman"],
      ["Pathum Nissanka", "Batsman"],
      ["Sahil Parakh", "Batsman"],
      ["Prithvi Shaw", "Batsman"],
      ["Abishek Porel", "Wicketkeeper-Batsman"],
      ["Tristan Stubbs", "Wicketkeeper-Batsman"],
      ["Axar Patel", "All-Rounder"],
      ["Sameer Rizvi", "All-Rounder"],
      ["Ashutosh Sharma", "All-Rounder"],
      ["Vipraj Nigam", "All-Rounder"],
      ["Ajay Mandal", "All-Rounder"],
      ["Tripurana Vijay", "All-Rounder"],
      ["Madhav Tiwari", "All-Rounder"],
      ["Nitish Rana", "All-Rounder"],
      ["Mitchell Starc", "Bowler"],
      ["T. Natarajan", "Bowler"],
      ["Mukesh Kumar", "Bowler"],
      ["Dushmantha Chameera", "Bowler"],
      ["Auqib Nabi", "Bowler"],
      ["Lungisani Ngidi", "Bowler"],
      ["Kyle Jamieson", "Bowler"],
      ["Rehan Ahmed", "Bowler"],
      ["Kuldeep Yadav", "Bowler"]
    ]
  }
};

const overseasCountries = {
  "Akeal Hosein": "West Indies",
  "Aiden Markram": "South Africa",
  "Adam Milne": "New Zealand",
  "Allah Ghazanfar": "Afghanistan",
  "Andre Russell": "West Indies",
  "Anrich Nortje": "South Africa",
  "Azmatullah Omarzai": "Afghanistan",
  "Ben Dwarshuis": "Australia",
  "Blessing Muzarabani": "Zimbabwe",
  "Cameron Green": "Australia",
  "Connor Esterhuizen": "South Africa",
  "Cooper Connolly": "Australia",
  "Corbin Bosch": "South Africa",
  "Dasun Shanaka": "Sri Lanka",
  "David Miller": "South Africa",
  "David Warner": "Australia",
  "Dewald Brevis": "South Africa",
  "Dilshan Madushanka": "Sri Lanka",
  "Donovan Ferreira": "South Africa",
  "Dushmantha Chameera": "Sri Lanka",
  "Eshan Malinga": "Sri Lanka",
  "Faf du Plessis": "South Africa",
  "Finn Allen": "New Zealand",
  "George Linde": "South Africa",
  "Gerald Coetzee": "South Africa",
  "Glenn Maxwell": "Australia",
  "Glenn Phillips": "New Zealand",
  "Heinrich Klaasen": "South Africa",
  "Jacob Bethell": "England",
  "Jacob Duffy": "New Zealand",
  "Jamie Overton": "England",
  "Jason Holder": "West Indies",
  "Jofra Archer": "England",
  "Jonny Bairstow": "England",
  "Jordan Cox": "England",
  "Josh Hazlewood": "Australia",
  "Josh Inglis": "Australia",
  "Jos Buttler": "England",
  "Kagiso Rabada": "South Africa",
  "Kamindu Mendis": "Sri Lanka",
  "Keshav Maharaj": "South Africa",
  "Kwena Maphaka": "South Africa",
  "Lhuan-dre Pretorious": "South Africa",
  "Liam Livingstone": "England",
  "Lockie Ferguson": "New Zealand",
  "Luke Wood": "England",
  "Lungisani Ngidi": "South Africa",
  "Marco Jansen": "South Africa",
  "Marcus Stoinis": "Australia",
  "Matheesha Pathirana": "Sri Lanka",
  "Matt Henry": "New Zealand",
  "Matthew Breetzke": "South Africa",
  "Matthew William Short": "Australia",
  "Mitchell Marsh": "Australia",
  "Mitchell Starc": "Australia",
  "Mitch Owen": "Australia",
  "Nandre Burger": "South Africa",
  "Nicholas Pooran": "West Indies",
  "Noor Ahmad": "Afghanistan",
  "Nuwan Thushara": "Sri Lanka",
  "Pat Cummins": "Australia",
  "Pathum Nissanka": "Sri Lanka",
  "Phil Salt": "England",
  "Quinton de Kock": "South Africa",
  "Rachin Ravindra": "New Zealand",
  "Rashid Khan": "Afghanistan",
  "Rehan Ahmed": "England",
  "Romario Shepherd": "West Indies",
  "Rovman Powell": "West Indies",
  "Ryan Rickelton": "South Africa",
  "Sam Curran": "England",
  "Sherfane Rutherford": "West Indies",
  "Shimron Hetmyer": "West Indies",
  "Spencer Johnson": "Australia",
  "Sunil Narine": "West Indies",
  "Tim David": "Australia",
  "Tim Seifert": "New Zealand",
  "Travis Head": "Australia",
  "Trent Boult": "New Zealand",
  "Tristan Stubbs": "South Africa",
  "Will Jacks": "England",
  "Xavier Bartlett": "Australia",
  "Kyle Jamieson": "New Zealand",
  "Zak Foulkes": "New Zealand"
};

const curatedPlayers = {
  csk: [
    ["MS Dhoni", "Wicketkeeper-Batsman"],
    ["Suresh Raina", "Batsman"],
    ["Ravindra Jadeja", "All-Rounder"],
    ["Ruturaj Gaikwad", "Batsman"],
    ["Ravichandran Ashwin", "All-Rounder"],
    ["Sam Curran", "All-Rounder"],
    ["Shivam Dube", "All-Rounder"],
    ["Devon Conway", "Wicketkeeper-Batsman"]
  ],
  rcb: [
    ["Tim David", "All-Rounder"],
    ["Krunal Pandya", "All-Rounder"],
    ["Virat Kohli", "Batsman"],
    ["Rajat Patidar", "Batsman"],
    ["Josh Hazlewood", "Bowler"],
    ["Phil Salt", "Wicketkeeper-Batsman"],
    ["Cameron Green", "All-Rounder"],
    ["Bhuvneshwar Kumar", "Bowler"]
  ],
  mi: [
    ["Deepak Chahar", "Bowler"],
    ["Rohit Sharma", "Batsman"],
    ["Hardik Pandya", "All-Rounder"],
    ["Jasprit Bumrah", "Bowler"],
    ["Suryakumar Yadav", "Batsman"],
    ["Tilak Varma", "Batsman"],
    ["Ryan Rickelton", "Wicketkeeper-Batsman"],
    ["Trent Boult", "Bowler"]
  ],
  gt: [
    ["Mohammed Siraj", "Bowler"],
    ["Jos Buttler", "Wicketkeeper-Batsman"],
    ["Shubman Gill", "Batsman"],
    ["Rashid Khan", "Bowler"],
    ["Sai Sudharsan", "Batsman"],
    ["Kagiso Rabada", "Bowler"],
    ["Rahul Tewatia", "All-Rounder"]
  ],
  kkr: [
    ["Quinton de Kock", "Wicketkeeper-Batsman"],
    ["Andre Russell", "All-Rounder"],
    ["Sunil Narine", "All-Rounder"],
    ["Rinku Singh", "Batsman"],
    ["Varun Chakravarthy", "Bowler"],
    ["Ajinkya Rahane", "Batsman"]
  ],
  srh: [
    ["Ishan Kishan", "Wicketkeeper-Batsman"],
    ["Pat Cummins", "Bowler"],
    ["Travis Head", "Batsman"],
    ["Heinrich Klaasen", "Wicketkeeper-Batsman"],
    ["Abhishek Sharma", "All-Rounder"],
    ["Mohammed Shami", "Bowler"]
  ],
  rr: [
    ["Trent Boult", "Bowler"],
    ["Nitish Rana", "Batsman"],
    ["Sanju Samson", "Wicketkeeper-Batsman"],
    ["Jofra Archer", "Bowler"],
    ["Riyan Parag", "All-Rounder"],
    ["Yashasvi Jaiswal", "Batsman"]
  ],
  pbks: [
    ["Shreyas Iyer", "Batsman"],
    ["Glenn Maxwell", "All-Rounder"],
    ["Yuzvendra Chahal", "Bowler"],
    ["Arshdeep Singh", "Bowler"],
    ["Marcus Stoinis", "All-Rounder"],
    ["Jonny Bairstow", "Wicketkeeper-Batsman"]
  ],
  lsg: [
    ["Rishabh Pant", "Wicketkeeper-Batsman"],
    ["David Miller", "Batsman"],
    ["Nicholas Pooran", "Wicketkeeper-Batsman"],
    ["Ravi Bishnoi", "Bowler"],
    ["Mayank Yadav", "Bowler"],
    ["Aiden Markram", "Batsman"]
  ],
  dc: [
    ["Faf du Plessis", "Batsman"],
    ["David Warner", "Batsman"],
    ["KL Rahul", "Wicketkeeper-Batsman"],
    ["Mitchell Starc", "Bowler"],
    ["Axar Patel", "All-Rounder"],
    ["Prithvi Shaw", "Batsman"]
  ]
};

const teamNames = {
  csk: "CSK",
  rcb: "RCB",
  mi: "MI",
  gt: "GT",
  kkr: "KKR",
  srh: "SRH",
  rr: "RR",
  pbks: "PBKS",
  lsg: "LSG",
  dc: "DC"
};

function slugify(value) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

function normalize(value) {
  return slugify(value).replace(/-/g, "");
}

function defaultTraits(name, role, captain) {
  const traits = [];
  if (role === "Wicketkeeper-Batsman") traits.push("wicketkeeper");
  if (role === "All-Rounder") traits.push("all-rounder");
  if (role === "Bowler") traits.push("pace");
  if (captain === name) traits.push("captain");
  if (overseasCountries[name]) traits.push("foreign");
  if (["Batsman", "Wicketkeeper-Batsman"].includes(role)) traits.push("middle-order");
  if (traits.length < 2) traits.push("match-winner");
  return [...new Set(traits)];
}

function defaultStats(role) {
  return {
    matches: 0,
    runs: 0,
    wickets: 0,
    strikeRate: role === "Bowler" ? 0 : 120,
    battingAverage: 0,
    bestPerformance: "2026 squad member"
  };
}

function playerDescription(name, role, teamId, captain) {
  const team = teamNames[teamId];
  if (captain === name) return `Captain and headline player in the curated ${team} 2026 famous-player roster.`;
  if (role === "Wicketkeeper-Batsman") return `Wicketkeeper-batter in the curated ${team} 2026 famous-player roster.`;
  if (role === "All-Rounder") return `All-rounder in the curated ${team} 2026 famous-player roster.`;
  if (role === "Bowler") return `Bowler in the curated ${team} 2026 famous-player roster.`;
  return `Batter in the curated ${team} 2026 famous-player roster.`;
}

const captains = {
  csk: "Ruturaj Gaikwad",
  rcb: "Rajat Patidar",
  mi: "Hardik Pandya",
  gt: "Shubman Gill",
  kkr: "Ajinkya Rahane",
  srh: "Pat Cummins",
  rr: "Sanju Samson",
  pbks: "Shreyas Iyer",
  lsg: "Rishabh Pant",
  dc: "Axar Patel"
};

const aliases = {
  "Suryakumar Yadav": ["Surya Kumar Yadav"],
  "Tilak Varma": ["N. Tilak Varma"],
  "Varun Chakravarthy": ["Varun Chakaravarthy"]
};

const profileFiles = [
  "data/player-profile-overrides.json",
  "data/additional-players.json",
  "data/runtime/players.json",
  "data/ipl-2026-players.json"
];
const existingPlayers = (
  await Promise.all(profileFiles.map(async (file) => JSON.parse(await readFile(file, "utf8"))))
).flat();
const existingByName = new Map();
for (const player of existingPlayers) {
  const key = normalize(player.name);
  if (!existingByName.has(key)) existingByName.set(key, player);
}

function findPreviousPlayer(name) {
  const names = [name, ...(aliases[name] ?? [])];
  for (const candidate of names) {
    const player = existingByName.get(normalize(candidate));
    if (player) return player;
  }
  return undefined;
}

const players = Object.entries(curatedPlayers).flatMap(([teamId, roster]) =>
  roster.map(([name, role], index) => {
    const previous = findPreviousPlayer(name);
    const id = slugify(`${teamId}-${name}`);
    const captain = captains[teamId];
    const traits = defaultTraits(name, role, captain);
    const country = overseasCountries[name] ?? previous?.country ?? "India";
    return {
      ...(previous ?? {}),
      id,
      name,
      teamId,
      role,
      jerseyNumber: previous?.jerseyNumber ?? index + 1,
      country,
      age: previous?.age ?? 25,
      battingStyle: previous?.battingStyle ?? "Right-hand bat",
      bowlingStyle:
        previous?.bowlingStyle ??
        (role === "Bowler" ? "Right-arm fast" : role === "All-Rounder" ? "Right-arm medium" : "Right-arm off break"),
      traits: [...new Set([...(previous?.traits ?? []).filter((trait) => trait !== "captain"), ...traits])],
      bio: previous?.bio ?? playerDescription(name, role, teamId, captain),
      achievements: previous?.achievements ?? ["Curated IPL 2026 famous-player roster member"],
      introTag:
        captain === name
          ? "the current captain"
          : role === "Wicketkeeper-Batsman"
            ? "the wicketkeeper-batter"
            : role === "All-Rounder"
              ? "the all-round option"
              : role === "Bowler"
                ? "the bowling option"
                : "the batting option",
      voiceIntro: `Hey, I'm ${name}, ${captain === name ? "the current captain" : "a featured 2026 famous-player pick"} for ${teamNames[teamId]}.`,
      imageUrl: previous?.imageUrl,
      stats: previous?.stats ?? defaultStats(role)
    };
  })
);

await writeFile("data/ipl-2026-players.json", `${JSON.stringify(players, null, 2)}\n`, "utf8");
await writeFile("data/runtime/players.json", `${JSON.stringify(players, null, 2)}\n`, "utf8");

const seedPath = "lib/data/seed.ts";
const seed = await readFile(seedPath, "utf8");
const marker = "export const SEED_QUESTIONS";
const markerIndex = seed.indexOf(marker);
if (markerIndex === -1) throw new Error("Could not find SEED_QUESTIONS marker");

const replacement = `import CURRENT_2026_PLAYERS from "@/data/ipl-2026-players.json";\nimport { Player, QuestionDefinition } from "@/types";\n\nexport const SEED_PLAYERS = CURRENT_2026_PLAYERS as Player[];\n\n`;
await writeFile(seedPath, replacement + seed.slice(markerIndex), "utf8");

const selectedCounts = Object.fromEntries(
  Object.entries(curatedPlayers).map(([teamId, roster]) => [teamId.toUpperCase(), roster.length])
);
console.log(`Updated ${players.length} curated famous 2026 players (${JSON.stringify(selectedCounts)}).`);
