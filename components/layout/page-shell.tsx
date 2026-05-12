import { ReactNode } from "react";

import { TopNav } from "@/components/layout/top-nav";
import { ParticleField } from "@/components/scene/particle-field";

interface PageShellProps {
  children: ReactNode;
}

export function PageShell({ children }: PageShellProps) {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="professional-background" aria-hidden="true" />
      <ParticleField />
      <TopNav />
      <main className="relative z-10 mx-auto max-w-7xl px-4 pb-20 pt-10 sm:px-6 lg:px-8">{children}</main>
    </div>
  );
}
