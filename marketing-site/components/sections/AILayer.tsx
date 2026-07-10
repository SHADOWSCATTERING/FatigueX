"use client";

import GlassPanel from "../ui/GlassPanel";

export default function AILayer() {
  return (
    <section className="relative min-h-[120vh] flex items-center">
      <div className="max-w-7xl mx-auto px-6 w-full flex justify-start">
        <div className="w-full md:w-1/2 max-w-xl">
          <GlassPanel direction="left" withEdge>
            <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight text-white mb-6 leading-tight">
              AI that explains the &quot;why,&quot; not just the &quot;what.&quot;
            </h2>
            <div className="space-y-6 text-lg text-muted">
              <p>
                A rule engine can flag a violation. Fatigue X goes further — combining the deterministic checks with an AI layer that explains <em>why</em> a schedule is risky and recommends a safer alternative, in plain English a manager can act on immediately.
              </p>
            </div>
          </GlassPanel>
        </div>
      </div>
    </section>
  );
}
