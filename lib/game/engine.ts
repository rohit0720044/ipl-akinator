import { CandidateScore, GameAnswer, Player, QuestionDefinition, QuestionRule, TeamId } from "@/types";

const ANSWER_WEIGHTS = {
  yes: 1,
  probably: 0.8,
  dont_know: 0.5,
  probably_not: 0.2,
  no: 0
} as const;

const GEMINI_BASE_QUESTION_TEMPLATES: QuestionDefinition[] = [
  {
    id: "gemini-role-batsman",
    prompt: "Is your player mainly known as a batsman?",
    description: "Gemini can use this broad role clue to split batters from bowlers and all-rounders.",
    category: "role",
    priority: 5,
    rule: {
      field: "role",
      operator: "equals",
      value: "Batsman"
    }
  },
  {
    id: "gemini-role-bowler",
    prompt: "Is your player primarily a bowler?",
    description: "Gemini can use this broad role clue to isolate bowling specialists.",
    category: "role",
    priority: 5,
    rule: {
      field: "role",
      operator: "equals",
      value: "Bowler"
    }
  },
  {
    id: "gemini-role-keeper",
    prompt: "Does your player keep wickets?",
    description: "Gemini can use this clue to identify wicketkeeper-batters.",
    category: "role",
    priority: 5,
    rule: {
      field: "traits",
      operator: "includes",
      value: "wicketkeeper"
    }
  },
  {
    id: "gemini-role-allrounder",
    prompt: "Is your player a genuine all-rounder?",
    description: "Gemini can use this clue to separate multi-skill IPL players.",
    category: "role",
    priority: 5,
    rule: {
      field: "traits",
      operator: "includes",
      value: "all-rounder"
    }
  },
  {
    id: "gemini-identity-indian",
    prompt: "Is your player Indian or international?",
    description: "Gemini can use this broad nationality clue to start narrowing the pool.",
    category: "identity",
    priority: 6,
    rule: {
      field: "country",
      operator: "equals",
      value: "India"
    }
  },
  {
    id: "gemini-identity-overseas",
    prompt: "Is your player an overseas cricketer?",
    description: "Gemini can use this broad overseas-player clue early in the game.",
    category: "identity",
    priority: 5,
    rule: {
      field: "traits",
      operator: "includes",
      value: "foreign"
    }
  },
  {
    id: "gemini-career-active",
    prompt: "Is your player active or retired?",
    description: "Gemini can use this career-status clue to split current players from legends.",
    category: "career",
    priority: 5,
    rule: {
      field: "traits",
      operator: "includes",
      value: "active"
    }
  },
  {
    id: "gemini-career-current-captain",
    prompt: "Is your player currently an IPL captain?",
    description: "Gemini can use this leadership clue for current captain profiles.",
    category: "career",
    priority: 5,
    rule: {
      field: "traits",
      operator: "includes",
      value: "current-captain"
    }
  },
  {
    id: "gemini-career-captain",
    prompt: "Has your player captained an IPL side?",
    description: "Gemini can use this leadership clue for current and former captains.",
    category: "career",
    priority: 4,
    rule: {
      field: "traits",
      operator: "includes",
      value: "captain"
    }
  },
  {
    id: "gemini-career-legend",
    prompt: "Is your player considered an IPL legend?",
    description: "Gemini can use this legacy clue for iconic IPL names.",
    category: "career",
    priority: 4,
    rule: {
      field: "traits",
      operator: "includes",
      value: "legend"
    }
  },
  {
    id: "gemini-style-lefty",
    prompt: "Is your player left-handed with the bat?",
    description: "Gemini can use this batting-style clue to split common player profiles.",
    category: "style",
    priority: 4,
    rule: {
      field: "battingStyle",
      operator: "contains",
      value: "Left-hand"
    }
  },
  {
    id: "gemini-style-opener",
    prompt: "Does your player usually bat near the top of the order?",
    description: "Gemini can use this batting-position clue for openers and top-order players.",
    category: "style",
    priority: 4,
    rule: {
      field: "traits",
      operator: "includes",
      value: "opener"
    }
  },
  {
    id: "gemini-style-finisher",
    prompt: "Is your player famous for finishing innings?",
    description: "Gemini can use this role clue for death-over hitters and finishers.",
    category: "style",
    priority: 4,
    rule: {
      field: "traits",
      operator: "includes",
      value: "finisher"
    }
  },
  {
    id: "gemini-style-aggressive",
    prompt: "Is your player known for aggressive batting?",
    description: "Gemini can use this intent clue for attacking batters.",
    category: "style",
    priority: 3,
    rule: {
      field: "traits",
      operator: "includes",
      value: "aggressive"
    }
  },
  {
    id: "gemini-style-anchor",
    prompt: "Is your player more of a calm anchor batter?",
    description: "Gemini can use this clue for consistent run accumulators.",
    category: "style",
    priority: 3,
    rule: {
      field: "traits",
      operator: "includes",
      value: "anchor"
    }
  },
  {
    id: "gemini-style-pace",
    prompt: "Is your player known for pace bowling?",
    description: "Gemini can use this clue to identify fast bowlers and seam all-rounders.",
    category: "style",
    priority: 4,
    rule: {
      field: "traits",
      operator: "includes",
      value: "pace"
    }
  },
  {
    id: "gemini-style-spin",
    prompt: "Is your player known for spin bowling?",
    description: "Gemini can use this clue to identify spinners and spin all-rounders.",
    category: "style",
    priority: 4,
    rule: {
      field: "traits",
      operator: "includes",
      value: "spin"
    }
  },
  {
    id: "gemini-bowling-death",
    prompt: "Would fans associate your player with death-over bowling?",
    description: "Gemini can use this specialist bowling clue once bowlers are likely.",
    category: "style",
    priority: 4,
    rule: {
      field: "traits",
      operator: "includes",
      value: "death-bowler"
    }
  },
  {
    id: "gemini-stats-ipl-veteran-100-matches",
    prompt: "Has your player played more than 100 IPL matches?",
    description: "Gemini can use IPL experience to separate veterans from newer stars.",
    category: "stats",
    priority: 4,
    rule: {
      field: "stats.matches",
      operator: "gt",
      value: 100
    }
  },
  {
    id: "gemini-stats-ipl-elite-runs",
    prompt: "Has your player scored more than 3000 IPL runs?",
    description: "Gemini can target established IPL run-scorers and famous top-order names.",
    category: "stats",
    priority: 4,
    rule: {
      field: "stats.runs",
      operator: "gt",
      value: 3000
    }
  },
  {
    id: "gemini-stats-ipl-elite-wickets",
    prompt: "Has your player taken more than 100 IPL wickets?",
    description: "Gemini can target proven wicket-taking bowlers and bowling all-rounders.",
    category: "stats",
    priority: 4,
    rule: {
      field: "stats.wickets",
      operator: "gt",
      value: 100
    }
  },
  {
    id: "gemini-stats-ipl-high-strike-rate",
    prompt: "Does your player have an IPL strike rate above 145?",
    description: "Gemini can find explosive hitters and high-impact finishers.",
    category: "stats",
    priority: 3,
    rule: {
      field: "stats.strikeRate",
      operator: "gt",
      value: 145
    }
  },
  {
    id: "gemini-stats-ipl-strong-average",
    prompt: "Does your player average above 35 with the bat in IPL?",
    description: "Gemini can highlight reliable run-makers and consistent anchors.",
    category: "stats",
    priority: 3,
    rule: {
      field: "stats.battingAverage",
      operator: "gt",
      value: 35
    }
  },
  {
    id: "gemini-age-under-30",
    prompt: "Is your player under 30 years old?",
    description: "Gemini can use this age clue to separate rising stars from veterans.",
    category: "identity",
    priority: 3,
    rule: {
      field: "age",
      operator: "lt",
      value: 30
    }
  },
  {
    id: "gemini-age-over-35",
    prompt: "Is your player older than 35?",
    description: "Gemini can use this age clue for senior stars and retired legends.",
    category: "identity",
    priority: 3,
    rule: {
      field: "age",
      operator: "gt",
      value: 35
    }
  }
];

function normalizeText(value: unknown): string {
  if (Array.isArray(value)) {
    return value.map(normalizeText).join(" ");
  }

  return String(value ?? "")
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function resolveRuleSource(player: Player, field: QuestionRule["field"]) {
  if (field.startsWith("stats.")) {
    const statKey = field.replace("stats.", "") as keyof Player["stats"];
    return player.stats[statKey];
  }

  return player[field as keyof Player];
}

export function evaluateRule(player: Player, rule: QuestionRule) {
  const source = resolveRuleSource(player, rule.field);

  switch (rule.operator) {
    case "equals":
      return normalizeText(source) === normalizeText(rule.value) ? 1 : 0;
    case "contains":
      return normalizeText(source).includes(normalizeText(rule.value)) ? 1 : 0;
    case "includes":
      return Array.isArray(source) && source.map(normalizeText).includes(normalizeText(rule.value)) ? 1 : 0;
    case "gt":
      return Number(source) > Number(rule.value) ? 1 : 0;
    case "lt":
      return Number(source) < Number(rule.value) ? 1 : 0;
    default:
      return 0.5;
  }
}

export function rankCandidates(
  players: Player[],
  questions: QuestionDefinition[],
  answers: GameAnswer[],
  teamId?: TeamId
) {
  const filteredPlayers = teamId ? players.filter((player) => player.teamId === teamId) : players;
  const questionMap = new Map(questions.map((question) => [question.id, question]));

  const ranked = filteredPlayers
    .map((player) => {
      let score = 1;

      for (const answer of answers) {
        const question = questionMap.get(answer.questionId);

        if (!question) {
          continue;
        }

        const fit = evaluateRule(player, question.rule);
        const target = ANSWER_WEIGHTS[answer.answer];
        const closeness = answer.answer === "dont_know" ? 0.95 : Math.max(0.08, 1 - Math.abs(target - fit));
        score *= closeness * (1 + question.priority * 0.03);
      }

      return { player, score };
    })
    .sort((left, right) => right.score - left.score);

  const total = ranked.reduce((sum, candidate) => sum + candidate.score, 0) || 1;

  return ranked.map((candidate) => ({
    ...candidate,
    confidence: candidate.score / total
  })) satisfies CandidateScore[];
}

export function pickBestQuestion(
  players: Player[],
  questions: QuestionDefinition[],
  answers: GameAnswer[],
  teamId?: TeamId
) {
  const ranked = rankCandidates(players, questions, answers, teamId);
  const unanswered = questions.filter((question) => !answers.some((answer) => answer.questionId === question.id));

  const candidatePool = ranked.slice(0, Math.max(8, Math.ceil(ranked.length * 0.55)));
  const topConfidence = ranked[0]?.confidence ?? 0;

  const scoredQuestions = unanswered
    .filter((question) => !(teamId && question.rule.field === "teamId"))
    .filter((question) => {
      if (question.category !== "player") {
        return true;
      }

      if (question.rule.field === "name") {
        return answers.length >= 5 || topConfidence > 0.24;
      }

      return answers.length >= 3 || topConfidence > 0.18;
    })
    .map((question) => {
      const yesProbability = candidatePool.reduce(
        (sum, candidate) => sum + evaluateRule(candidate.player, question.rule) * candidate.confidence,
        0
      );
      const balance = 1 - Math.abs(0.5 - yesProbability) * 2;
      const topCandidateFit = ranked[0] ? evaluateRule(ranked[0].player, question.rule) : 0;
      const leadBoost = topCandidateFit === 1 && topConfidence > 0.16 ? topConfidence * 0.45 : 0;
      const weightedBalance = balance * (1 + question.priority * 0.12) + leadBoost;

      return { question, score: weightedBalance };
    })
    .sort((left, right) => right.score - left.score);

  return scoredQuestions[0]?.question ?? null;
}

export function shouldMakeGuess(candidates: CandidateScore[], askedCount: number) {
  if (candidates.length === 0) {
    return false;
  }

  const [first, second] = candidates;
  const gap = first.confidence - (second?.confidence ?? 0);

  return first.confidence > 0.42 || gap > 0.18 || askedCount >= 8;
}

export function buildGeminiQuestionBank(players: Player[]) {
  const questions = new Map<string, QuestionDefinition>();

  for (const question of GEMINI_BASE_QUESTION_TEMPLATES) {
    questions.set(question.id, question);
  }

  for (const teamId of new Set(players.map((player) => player.teamId))) {
    questions.set(`gemini-team-${teamId}`, {
      id: `gemini-team-${teamId}`,
      prompt: `Does your player represent ${teamId.toUpperCase()}?`,
      description: "Gemini can use this generated team clue when franchise identity becomes useful.",
      category: "team",
      priority: 4,
      rule: {
        field: "teamId",
        operator: "equals",
        value: teamId
      }
    });
  }

  for (const country of new Set(players.map((player) => player.country).filter(Boolean))) {
    const countryKey = normalizeText(country).replace(/\s+/g, "-");

    questions.set(`gemini-country-${countryKey}`, {
      id: `gemini-country-${countryKey}`,
      prompt: `Is your player from ${country}?`,
      description: "Gemini can use this generated country clue for Akinator-style narrowing.",
      category: "identity",
      priority: country === "India" ? 5 : 4,
      rule: {
        field: "country",
        operator: "equals",
        value: country
      }
    });
  }

  for (const jerseyNumber of new Set(players.map((player) => player.jerseyNumber).filter(Boolean))) {
    questions.set(`gemini-jersey-${jerseyNumber}`, {
      id: `gemini-jersey-${jerseyNumber}`,
      prompt: `Does your player wear jersey number ${jerseyNumber}?`,
      description: "Gemini can use this high-signal jersey-number clue from the player database.",
      category: "player",
      priority: 4,
      rule: {
        field: "jerseyNumber",
        operator: "equals",
        value: jerseyNumber
      }
    });
  }

  for (const player of players) {
    questions.set(`gemini-player-${player.id}`, {
      id: `gemini-player-${player.id}`,
      prompt: `Are you thinking of ${player.name}?`,
      description: `Gemini can use this direct identity check only after narrowing toward ${player.name}.`,
      category: "player",
      priority: 2,
      rule: {
        field: "name",
        operator: "equals",
        value: player.name
      }
    });

    const signatureAchievement = player.achievements[0];

    if (signatureAchievement) {
      questions.set(`gemini-achievement-${player.id}`, {
        id: `gemini-achievement-${player.id}`,
        prompt: `Is your player linked with ${signatureAchievement.toLowerCase()}?`,
        description: "Gemini can use this generated achievement clue from the IPL player profile.",
        category: "player",
        priority: 3,
        rule: {
          field: "achievements",
          operator: "contains",
          value: signatureAchievement
        }
      });
    }
  }

  return [...questions.values()];
}

export function buildGuessStory(player: Player) {
  const flavour = [
    `${player.name} feels like the strongest fit.`,
    `${player.role} from ${player.country}.`,
    `${player.battingStyle} with ${player.bowlingStyle.toLowerCase()}.`
  ];

  if (player.traits.includes("captain")) {
    flavour.push("Leadership clues pushed the signal higher.");
  }

  if (player.traits.includes("aggressive")) {
    flavour.push("The aggressive batting profile was a major giveaway.");
  }

  if (player.traits.includes("death-bowler")) {
    flavour.push("Death-overs clues narrowed it down fast.");
  }

  return flavour.join(" ");
}

export function getDailyPlayer(players: Player[]) {
  const dayKey = new Date().toISOString().slice(0, 10);
  const hash = [...dayKey].reduce((sum, char) => sum + char.charCodeAt(0), 0);
  return players[hash % players.length];
}
