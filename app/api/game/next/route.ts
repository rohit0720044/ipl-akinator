import { NextRequest, NextResponse } from "next/server";

import {
  buildAdvancedQuestionBank,
  buildGuessStory,
  pickBestQuestion,
  rankCandidates,
  shouldMakeGuess
} from "@/lib/game/engine";
import { humanizeQuestion, dramaticReveal } from "@/lib/server/openai";
import { getPlayers, getQuestions } from "@/lib/server/store";
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
  const [players, questions] = await Promise.all([getPlayers(), getQuestions()]);
  const advancedQuestions = buildAdvancedQuestionBank(players, questions);

  const ranked = rankCandidates(players, advancedQuestions, answers, payload.teamId);

  if (ranked.length === 0) {
    return NextResponse.json(
      {
        message: "No player profiles matched the current filter."
      },
      { status: 404 }
    );
  }

  if (shouldMakeGuess(ranked, answers.length)) {
    const guess = ranked[0].player;

    return NextResponse.json({
      mode: "guess" as const,
      guess,
      dramaticLine: await dramaticReveal(guess),
      story: buildGuessStory(guess),
      confidence: ranked[0].confidence,
      candidates: ranked.slice(0, 5).map((candidate) => candidate.player),
      questionBankSize: advancedQuestions.length
    });
  }

  const question = pickBestQuestion(players, advancedQuestions, answers, payload.teamId) ?? advancedQuestions[0];
  const humanPrompt =
    question.id === "identity-indian-or-international"
      ? question.prompt
      : await humanizeQuestion(
          question,
          ranked.slice(0, 5).map((candidate) => candidate.player),
          answers
        );

  return NextResponse.json({
    mode: "question" as const,
    question,
    humanPrompt,
    candidates: ranked.slice(0, 5).map((candidate) => candidate.player),
    remaining: ranked.length,
    confidence: ranked[0].confidence,
    questionBankSize: advancedQuestions.length
  });
}
