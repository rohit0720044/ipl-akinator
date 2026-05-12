import Link from "next/link";
import { ArrowLeft, BrainCircuit, Mic2 } from "lucide-react";
import { notFound } from "next/navigation";

import { PageShell } from "@/components/layout/page-shell";
import { RosterGrid } from "@/components/player/roster-grid";
import { GlassPanel } from "@/components/ui/glass-panel";
import { NeonButton } from "@/components/ui/neon-button";
import { TEAM_MAP } from "@/lib/data/teams";
import { getPlayers } from "@/lib/server/store";

export const dynamic = "force-dynamic";

interface TeamPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function TeamPage({ params }: TeamPageProps) {
  const { slug } = await params;
  const team = TEAM_MAP[slug];

  if (!team) {
    notFound();
  }

  const players = (await getPlayers()).filter((player) => player.teamId === team.id);
  const activePlayers = players.filter((player) => !player.traits.includes("retired"));
  const retiredPlayers = players.filter((player) => player.traits.includes("retired"));

  return (
    <PageShell>
      <section className="space-y-6">
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-white/70 transition hover:text-white">
          <ArrowLeft className="h-4 w-4" />
          Back to team selection
        </Link>

        <GlassPanel className="overflow-hidden p-6 sm:p-8">
          <div className={`absolute inset-0 bg-gradient-to-br ${team.glow} opacity-80`} />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.28),transparent_30%)]" />

          <div className="relative grid gap-6 lg:grid-cols-[1.15fr,0.85fr]">
            <div>
              <p className="font-accent text-xs uppercase tracking-[0.32em] text-amber-100/70">{team.stadium}</p>
              <h1 className="mt-4 font-display text-4xl uppercase tracking-[0.14em] sm:text-6xl">{team.name}</h1>
              <p className="mt-4 max-w-2xl text-base leading-7 text-white/78">{team.strapline}</p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link href={`/play?team=${team.id}`}>
                  <NeonButton>
                    <BrainCircuit className="mr-2 inline h-4 w-4" />
                    Start {team.shortName} Guessing
                  </NeonButton>
                </Link>
                <div className="rounded-full border border-white/10 bg-black/20 px-4 py-3 text-sm text-white/75">
                  <Mic2 className="mr-2 inline h-4 w-4 text-amber-100" />
                  Tap a player card to trigger voice intro
                </div>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-[28px] border border-white/10 bg-black/20 p-5">
                <p className="font-accent text-xs uppercase tracking-[0.28em] text-white/60">Active Profiles</p>
                <p className="mt-3 font-display text-4xl">{activePlayers.length}</p>
              </div>
              <div className="rounded-[28px] border border-white/10 bg-black/20 p-5">
                <p className="font-accent text-xs uppercase tracking-[0.28em] text-white/60">Retired Legends</p>
                <p className="mt-3 font-display text-4xl">{retiredPlayers.length}</p>
              </div>
              <div className="rounded-[28px] border border-white/10 bg-black/20 p-5 sm:col-span-2">
                <p className="font-accent text-xs uppercase tracking-[0.28em] text-white/60">Home City</p>
                <p className="mt-3 font-display text-4xl">{team.city}</p>
              </div>
            </div>
          </div>
        </GlassPanel>

        <section className="space-y-4">
          <div>
            <p className="font-accent text-xs uppercase tracking-[0.32em] text-amber-100/70">Current Team Picks</p>
            <h2 className="mt-3 font-display text-3xl uppercase tracking-[0.14em]">Active Players</h2>
          </div>
          <RosterGrid players={activePlayers} />
        </section>

        <section className="space-y-4 border-t border-white/10 pt-8">
          <div>
            <p className="font-accent text-xs uppercase tracking-[0.32em] text-amber-100/70">Classic Dugout</p>
            <h2 className="mt-3 font-display text-3xl uppercase tracking-[0.14em]">Retired Players</h2>
          </div>
          {retiredPlayers.length > 0 ? (
            <RosterGrid players={retiredPlayers} />
          ) : (
            <GlassPanel className="p-6">
              <p className="font-accent text-sm uppercase tracking-[0.24em] text-white/70">
                Retired players will appear here once added for {team.shortName}.
              </p>
            </GlassPanel>
          )}
        </section>
      </section>
    </PageShell>
  );
}
