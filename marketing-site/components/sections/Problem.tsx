"use client";

import GlassPanel from "../ui/GlassPanel";

export default function Problem() {
  return (
    <section id="how-it-works" className="relative min-h-screen flex items-center">
      <div className="max-w-7xl mx-auto px-6 w-full flex justify-start">
        <div className="w-full md:w-1/2 max-w-xl">
          <GlassPanel direction="left" withEdge>
            <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight text-white mb-6 leading-tight">
              Every schedule hides a risk you can&apos;t see.
            </h2>
            <div className="space-y-6 text-lg text-muted">
              <p>
                Shift managers in hospitals, factories, warehouses, and security teams routinely assign shifts without visibility into fatigue territory.
              </p>
              <p>
                Too little rest, too many consecutive days, too many nights, or an accidental double-booking can create critical safety risks that are invisible on a traditional spreadsheet.
              </p>
            </div>
          </GlassPanel>
        </div>
      </div>
    </section>
  );
}
