import { NextRequest, NextResponse } from "next/server";

import {
  buildGeminiQuestionBank,
  buildGuessStory,
  pickBestQuestion,
  rankCandidates,
  shouldMakeGuess
} from "@/lib/game/engine";
import { chooseGeminiMove, dramaticRevealWithGemini, humanizeQuestionWithGemini } from "@/lib/server/gemini";
import { getPlayers } from "@/lib/server/store";
import { GameAnswer, TeamId } from "@/types";

export const dynamic = "force-dynamic";

interface RequestPayload {
  answers?: GameAnswer[];
  teamId?: TeamId;
  mode?: string;
}

export async function POST(request: NextRequest) {
  const payload = (await request.json()) as RequestPayload;
  const answers = payload.answers ?? [];
  const players = await getPlayers();
  const geminiQuestions = buildGeminiQuestionBank(players);

  const ranked = rankCandidates(players, geminiQuestions, answers, payload.teamId);

  if (ranked.length === 0) {
    return NextResponse.json(
      {
        message: "No player profiles matched the current filter."
      },
      { status: 404 }
    );
  }

  const localQuestion = pickBestQuestion(players, geminiQuestions, answers, payload.teamId) ?? geminiQuestions[0];
  const localShouldGuess = shouldMakeGuess(ranked, answers.length);
  const geminiMove = await chooseGeminiMove({
    ranked,
    questions: geminiQuestions,
    answers,
    teamId: payload.teamId,
    localQuestion
  });

  const geminiGuess =
    geminiMove?.mode === "guess" && (localShouldGuess || answers.length >= 4) ? geminiMove.player : null;

  if (geminiGuess || localShouldGuess) {
    const guess = geminiGuess ?? ranked[0].player;

    return NextResponse.json({
      mode: "guess" as const,
      guess,
      dramaticLine:
        (await dramaticRevealWithGemini(guess)) ??
        `I can feel it now. The player in your mind is ${guess.name}.`,
      story: buildGuessStory(guess),
      confidence: ranked[0].confidence,
      candidates: ranked.slice(0, 5).map((candidate) => candidate.player),
      questionBankSize: geminiQuestions.length
    });
  }

  const geminiQuestion =
    geminiMove?.mode === "question"
      ? geminiQuestions.find((questionOption) => questionOption.id === geminiMove.questionId)
      : null;
  const question = geminiQuestion ?? localQuestion;
  const humanPrompt =
    geminiQuestion && geminiMove?.mode === "question" && geminiMove.humanPrompt
      ? geminiMove.humanPrompt
      : (await humanizeQuestionWithGemini(
          question,
          ranked.slice(0, 5).map((candidate) => candidate.player),
          answers
        )) ?? question.prompt;

  return NextResponse.json({
    mode: "question" as const,
    question,
    humanPrompt,
    candidates: ranked.slice(0, 5).map((candidate) => candidate.player),
    remaining: ranked.length,
    confidence: ranked[0].confidence,
    questionBankSize: geminiQuestions.length
  });
}
