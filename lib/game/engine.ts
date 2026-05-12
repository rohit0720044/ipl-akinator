import { CandidateScore, GameAnswer, Player, QuestionDefinition, QuestionRule, TeamId } from "@/types";

const ANSWER_WEIGHTS = {
  yes: 1,
  probably: 0.8,
  dont_know: 0.5,
  probably_not: 0.2,
  no: 0
} as const;

const ADVANCED_IPL_QUESTIONS: QuestionDefinition[] = [
  {
    id: "stats-ipl-veteran-100-matches",
    prompt: "Has your player played more than 100 IPL matches?",
    description: "Uses IPL experience to separate veterans from newer stars.",
    category: "stats",
    priority: 4,
    rule: {
      field: "stats.matches",
      operator: "gt",
      value: 100
    }
  },
  {
    id: "stats-ipl-elite-runs",
    prompt: "Has your player scored more than 3000 IPL runs?",
    description: "Targets established IPL run-scorers and famous top-order names.",
    category: "stats",
    priority: 4,
    rule: {
      field: "stats.runs",
      operator: "gt",
      value: 3000
    }
  },
  {
    id: "stats-ipl-elite-wickets",
    prompt: "Has your player taken more than 100 IPL wickets?",
    description: "Targets proven wicket-taking bowlers and bowling all-rounders.",
    category: "stats",
    priority: 4,
    rule: {
      field: "stats.wickets",
      operator: "gt",
      value: 100
    }
  },
  {
    id: "stats-ipl-high-strike-rate",
    prompt: "Does your player have an IPL strike rate above 145?",
    description: "Finds explosive hitters and high-impact finishers.",
    category: "stats",
    priority: 3,
    rule: {
      field: "stats.strikeRate",
      operator: "gt",
      value: 145
    }
  },
  {
    id: "stats-ipl-strong-average",
    prompt: "Does your player average above 35 with the bat in IPL?",
    description: "Highlights reliable run-makers and consistent anchors.",
    category: "stats",
    priority: 3,
    rule: {
      field: "stats.battingAverage",
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

  if (answers.length === 0) {
    return unanswered.find((question) => question.id === "identity-indian-or-international") ?? unanswered[0] ?? null;
  }

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

export function buildAdvancedQuestionBank(players: Player[], baseQuestions: QuestionDefinition[]) {
  const questions = new Map<string, QuestionDefinition>();

  for (const question of [...baseQuestions, ...ADVANCED_IPL_QUESTIONS]) {
    questions.set(question.id, question);
  }

  for (const jerseyNumber of new Set(players.map((player) => player.jerseyNumber).filter(Boolean))) {
    questions.set(`ai-jersey-${jerseyNumber}`, {
      id: `ai-jersey-${jerseyNumber}`,
      prompt: `Does your player wear jersey number ${jerseyNumber}?`,
      description: "A high-signal jersey-number clue generated from the current IPL player database.",
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
    questions.set(`ai-player-${player.id}`, {
      id: `ai-player-${player.id}`,
      prompt: `Are you thinking of ${player.name}?`,
      description: `Direct identity check generated after the AI shortlist points toward ${player.name}.`,
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
      questions.set(`ai-achievement-${player.id}`, {
        id: `ai-achievement-${player.id}`,
        prompt: `Is your player linked with ${signatureAchievement.toLowerCase()}?`,
        description: "A player-profile clue generated from achievements in the IPL database.",
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
