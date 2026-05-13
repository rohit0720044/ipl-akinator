import { CandidateScore, GameAnswer, Player, QuestionDefinition, TeamId } from "@/types";

const GEMINI_API_BASE = "https://generativelanguage.googleapis.com/v1beta/models";
const DEFAULT_GEMINI_MODEL = "gemini-2.5-flash";

interface GeminiTextPayload {
  candidates?: Array<{
    content?: {
      parts?: Array<{
        text?: string;
      }>;
    };
  }>;
}

interface GeminiDecision {
  action: "question" | "guess";
  questionId?: string | null;
  guessPlayerId?: string | null;
  humanPrompt?: string | null;
  confidence: number;
  reason: string;
}

interface GeminiMoveInput {
  ranked: CandidateScore[];
  questions: QuestionDefinition[];
  answers: GameAnswer[];
  teamId?: TeamId;
  localQuestion?: QuestionDefinition | null;
}

const decisionSchema = {
  type: "object",
  properties: {
    action: {
      type: "string",
      enum: ["question", "guess"],
      description: "Choose question when more information is needed, or guess when the evidence is strong."
    },
    questionId: {
      type: ["string", "null"],
      description: "One exact id from the provided question options when action is question."
    },
    guessPlayerId: {
      type: ["string", "null"],
      description: "One exact id from the shortlisted players when action is guess."
    },
    humanPrompt: {
      type: ["string", "null"],
      description: "A short natural IPL guessing question under 18 words, only for question actions."
    },
    confidence: {
      type: "number",
      description: "Decision confidence from 0 to 1."
    },
    reason: {
      type: "string",
      description: "Brief private-quality explanation for debugging, without chain-of-thought."
    }
  },
  required: ["action", "confidence", "reason"]
};

const textSchema = {
  type: "object",
  properties: {
    text: {
      type: "string",
      description: "The final short text."
    }
  },
  required: ["text"]
};

function getGeminiApiKey() {
  return process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;
}

function getGeminiModel() {
  return process.env.GEMINI_MODEL ?? DEFAULT_GEMINI_MODEL;
}

function getThinkingConfig(model: string) {
  if (model.startsWith("gemini-3")) {
    return {
      thinkingLevel: "low"
    };
  }

  return {
    thinkingBudget: -1
  };
}

function extractText(payload: GeminiTextPayload) {
  return payload.candidates?.[0]?.content?.parts?.map((part) => part.text ?? "").join("").trim() ?? "";
}

async function generateGeminiJson<T>(systemInstruction: string, prompt: unknown, schema: object) {
  const apiKey = getGeminiApiKey();

  if (!apiKey) {
    return null;
  }

  const model = getGeminiModel();

  try {
    const response = await fetch(`${GEMINI_API_BASE}/${model}:generateContent`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": apiKey
      },
      body: JSON.stringify({
        system_instruction: {
          parts: [
            {
              text: systemInstruction
            }
          ]
        },
        contents: [
          {
            parts: [
              {
                text: typeof prompt === "string" ? prompt : JSON.stringify(prompt)
              }
            ]
          }
        ],
        generationConfig: {
          responseMimeType: "application/json",
          responseJsonSchema: schema,
          temperature: 0.2,
          thinkingConfig: getThinkingConfig(model)
        }
      })
    });

    if (!response.ok) {
      return null;
    }

    const payload = (await response.json()) as GeminiTextPayload;
    const text = extractText(payload);

    if (!text) {
      return null;
    }

    return JSON.parse(text) as T;
  } catch {
    return null;
  }
}

function getAnswerHistory(questions: QuestionDefinition[], answers: GameAnswer[]) {
  const questionMap = new Map(questions.map((question) => [question.id, question]));

  return answers.map((answer, index) => {
    const question = questionMap.get(answer.questionId);

    return {
      number: index + 1,
      questionId: answer.questionId,
      question: question?.prompt ?? answer.questionId,
      answer: answer.answer,
      rule: question?.rule
    };
  });
}

function getQuestionOptions(
  questions: QuestionDefinition[],
  answers: GameAnswer[],
  teamId?: TeamId,
  localQuestion?: QuestionDefinition | null
) {
  const answeredIds = new Set(answers.map((answer) => answer.questionId));
  const options = questions.filter((question) => {
    if (answeredIds.has(question.id)) {
      return false;
    }

    if (teamId && question.rule.field === "teamId") {
      return false;
    }

    if (question.category !== "player") {
      return true;
    }

    if (question.rule.field === "name") {
      return answers.length >= 5;
    }

    return answers.length >= 3;
  });

  const orderedOptions = localQuestion
    ? [localQuestion, ...options.filter((question) => question.id !== localQuestion.id)]
    : options;

  return orderedOptions.slice(0, 45).map((question) => ({
    id: question.id,
    prompt: question.prompt,
    description: question.description,
    category: question.category,
    priority: question.priority,
    rule: question.rule
  }));
}

function getCandidateSnapshot(ranked: CandidateScore[]) {
  return ranked.slice(0, 10).map((candidate) => ({
    id: candidate.player.id,
    name: candidate.player.name,
    teamId: candidate.player.teamId,
    role: candidate.player.role,
    country: candidate.player.country,
    age: candidate.player.age,
    battingStyle: candidate.player.battingStyle,
    bowlingStyle: candidate.player.bowlingStyle,
    traits: candidate.player.traits,
    achievements: candidate.player.achievements.slice(0, 3),
    stats: candidate.player.stats,
    localConfidence: Number(candidate.confidence.toFixed(4))
  }));
}

export async function chooseGeminiMove({
  ranked,
  questions,
  answers,
  teamId,
  localQuestion
}: GeminiMoveInput) {
  if (!getGeminiApiKey()) {
    return null;
  }

  const questionOptions = getQuestionOptions(questions, answers, teamId, localQuestion);

  if (questionOptions.length === 0 && ranked.length === 0) {
    return null;
  }

  const decision = await generateGeminiJson<GeminiDecision>(
    [
      "You are the hidden reasoning engine for an IPL Akinator game.",
      "The user never types the player name; infer only from yes/probably/dont_know/probably_not/no answers.",
      "Choose the next highest-information IPL question from the provided ids, or guess one shortlisted player.",
      "Ask broad identity, role, team, style, and stats questions before direct player-name questions.",
      "Do not phrase questions with 'rather than'; use natural 'or' wording instead.",
      "For the first turn, ask a broad category question and do not guess.",
      "Guess only when the answer history strongly supports a shortlist player.",
      "Never invent question ids or player ids. Return JSON only."
    ].join(" "),
    {
      teamId,
      answersAsked: answers.length,
      answerHistory: getAnswerHistory(questions, answers),
      shortlistedPlayers: getCandidateSnapshot(ranked),
      questionOptions
    },
    decisionSchema
  );

  if (!decision) {
    return null;
  }

  const question = questionOptions.find((option) => option.id === decision.questionId);
  const guess = ranked.find((candidate) => candidate.player.id === decision.guessPlayerId)?.player;

  if (decision.action === "guess" && guess) {
    return {
      mode: "guess" as const,
      player: guess,
      confidence: Math.max(0, Math.min(1, decision.confidence))
    };
  }

  if (decision.action === "question" && question) {
    return {
      mode: "question" as const,
      questionId: question.id,
      humanPrompt: decision.humanPrompt?.trim() || question.prompt,
      confidence: Math.max(0, Math.min(1, decision.confidence))
    };
  }

  return null;
}

export async function humanizeQuestionWithGemini(
  baseQuestion: QuestionDefinition,
  candidates: Player[],
  answers: GameAnswer[]
) {
  if (!getGeminiApiKey()) {
    return null;
  }

  const result = await generateGeminiJson<{ text: string }>(
    "Rewrite IPL Akinator questions. Keep the meaning identical, natural, energetic, and under 18 words. Do not use 'rather than'; use 'or' wording. Return JSON only.",
    {
      baseQuestion: baseQuestion.prompt,
      shortlistedPlayers: candidates.slice(0, 5).map((player) => ({
        name: player.name,
        teamId: player.teamId,
        role: player.role,
        country: player.country
      })),
      answerHistory: answers
    },
    textSchema
  );

  return result?.text?.trim() || null;
}

export async function dramaticRevealWithGemini(player: Player) {
  if (!getGeminiApiKey()) {
    return null;
  }

  const result = await generateGeminiJson<{ text: string }>(
    "Write one dramatic reveal line for an IPL Akinator game. Keep it to one sentence and name the player.",
    {
      player: {
        name: player.name,
        teamId: player.teamId,
        role: player.role,
        country: player.country,
        traits: player.traits
      }
    },
    textSchema
  );

  return result?.text?.trim() || null;
}
