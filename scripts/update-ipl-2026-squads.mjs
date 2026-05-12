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
  "Dewald Brevis": "South Africa",
  "Dilshan Madushanka": "Sri Lanka",
  "Donovan Ferreira": "South Africa",
  "Dushmantha Chameera": "Sri Lanka",
  "Eshan Malinga": "Sri Lanka",
  "Finn Allen": "New Zealand",
  "George Linde": "South Africa",
  "Gerald Coetzee": "South Africa",
  "Glenn Phillips": "New Zealand",
  "Heinrich Klaasen": "South Africa",
  "Jacob Bethell": "England",
  "Jacob Duffy": "New Zealand",
  "Jamie Overton": "England",
  "Jason Holder": "West Indies",
  "Jofra Archer": "England",
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

const notablePlayers = {
  csk: [
    "Ruturaj Gaikwad",
    "MS Dhoni",
    "Sanju Samson",
    "Dewald Brevis",
    "Sarfaraz Khan",
    "Shivam Dube",
    "Khaleel Ahmed",
    "Noor Ahmad",
    "Matt Henry",
    "Rahul Chahar"
  ],
  rcb: [
    "Rajat Patidar",
    "Devdutt Padikkal",
    "Virat Kohli",
    "Phil Salt",
    "Jitesh Sharma",
    "Krunal Pandya",
    "Tim David",
    "Romario Shepherd",
    "Venkatesh Iyer",
    "Josh Hazlewood",
    "Bhuvneshwar Kumar",
    "Yash Dayal"
  ],
  mi: [
    "Rohit Sharma",
    "Surya Kumar Yadav",
    "Quinton de Kock",
    "N. Tilak Varma",
    "Hardik Pandya",
    "Naman Dhir",
    "Will Jacks",
    "Shardul Thakur",
    "Trent Boult",
    "Deepak Chahar",
    "Keshav Maharaj",
    "Jasprit Bumrah"
  ],
  gt: [
    "Shubman Gill",
    "Jos Buttler",
    "Glenn Phillips",
    "Sai Sudharsan",
    "Washington Sundar",
    "Sai Kishore",
    "Jason Holder",
    "Rahul Tewatia",
    "Shahrukh Khan",
    "Kagiso Rabada",
    "Mohammed Siraj",
    "Prasidh Krishna",
    "Ishant Sharma",
    "Rashid Khan"
  ],
  kkr: [
    "Ajinkya Rahane",
    "Rinku Singh",
    "Manish Pandey",
    "Finn Allen",
    "Rahul Tripathi",
    "Rovman Powell",
    "Cameron Green",
    "Rachin Ravindra",
    "Ramandeep Singh",
    "Sunil Narine",
    "Matheesha Pathirana",
    "Umran Malik",
    "Varun Chakaravarthy"
  ],
  srh: [
    "Ishan Kishan",
    "Heinrich Klaasen",
    "Travis Head",
    "Harshal Patel",
    "Kamindu Mendis",
    "Liam Livingstone",
    "Abhishek Sharma",
    "Nitish Kumar Reddy",
    "Pat Cummins",
    "Jaydev Unadkat",
    "Dilshan Madushanka",
    "Gerald Coetzee"
  ],
  rr: [
    "Shubham Dubey",
    "Vaibhav Sooryavanshi",
    "Shimron Hetmyer",
    "Yashasvi Jaiswal",
    "Dhruv Jurel",
    "Riyan Parag",
    "Ravindra Jadeja",
    "Dasun Shanaka",
    "Jofra Archer",
    "Tushar Deshpande",
    "Ravi Bishnoi",
    "Adam Milne",
    "Sandeep Sharma",
    "Nandre Burger"
  ],
  pbks: [
    "Shreyas Iyer",
    "Nehal Wadhera",
    "Vishnu Vinod",
    "Prabhsimran Singh",
    "Shashank Singh",
    "Marcus Stoinis",
    "Harpreet Brar",
    "Marco Jansen",
    "Azmatullah Omarzai",
    "Priyansh Arya",
    "Arshdeep Singh",
    "Yuzvendra Chahal",
    "Yash Thakur",
    "Lockie Ferguson"
  ],
  lsg: [
    "Rishabh Pant",
    "Aiden Markram",
    "Matthew Breetzke",
    "Josh Inglis",
    "Nicholas Pooran",
    "Mitchell Marsh",
    "Abdul Samad",
    "Shahbaz Ahamad",
    "Ayush Badoni",
    "Mohammad Shami",
    "Avesh Khan",
    "Anrich Nortje",
    "Mayank Yadav",
    "Mohsin Khan"
  ],
  dc: [
    "KL Rahul",
    "Karun Nair",
    "David Miller",
    "Pathum Nissanka",
    "Prithvi Shaw",
    "Abishek Porel",
    "Tristan Stubbs",
    "Axar Patel",
    "Sameer Rizvi",
    "Ashutosh Sharma",
    "Nitish Rana",
    "Mitchell Starc",
    "T. Natarajan",
    "Mukesh Kumar",
    "Dushmantha Chameera",
    "Kuldeep Yadav"
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
  if (captain === name) return `Current ${team} captain in the official IPL 2026 squad.`;
  if (role === "Wicketkeeper-Batsman") return `Wicketkeeper-batter in the official ${team} IPL 2026 squad.`;
  if (role === "All-Rounder") return `All-rounder in the official ${team} IPL 2026 squad.`;
  if (role === "Bowler") return `Bowler in the official ${team} IPL 2026 squad.`;
  return `Batter in the official ${team} IPL 2026 squad.`;
}

const existingPlayers = JSON.parse(await readFile("data/runtime/players.json", "utf8"));
const existingByName = new Map(existingPlayers.map((player) => [normalize(player.name), player]));

const players = Object.entries(squads).flatMap(([teamId, squad]) =>
  squad.players.filter(([name]) => notablePlayers[teamId].includes(name)).map(([name, role], index) => {
    const previous = existingByName.get(normalize(name));
    const id = slugify(`${teamId}-${name}`);
    const traits = defaultTraits(name, role, squad.captain);
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
      bio: playerDescription(name, role, teamId, squad.captain),
      achievements: previous?.achievements ?? ["Official IPL 2026 squad member"],
      introTag:
        squad.captain === name
          ? "the current captain"
          : role === "Wicketkeeper-Batsman"
            ? "the wicketkeeper-batter"
            : role === "All-Rounder"
              ? "the all-round option"
              : role === "Bowler"
                ? "the bowling option"
                : "the batting option",
      voiceIntro: `Hey, I'm ${name}, ${squad.captain === name ? "the current captain" : "an official 2026 squad member"} for ${teamNames[teamId]}.`,
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

const counts = Object.entries(squads).map(([teamId, squad]) => `${teamId.toUpperCase()}: ${squad.players.length}`);
const selectedCounts = Object.fromEntries(
  Object.entries(notablePlayers).map(([teamId, names]) => [teamId.toUpperCase(), names.length])
);
console.log(`Updated ${players.length} notable 2026 players (${JSON.stringify(selectedCounts)}). Official squad sizes: ${counts.join(", ")}.`);
