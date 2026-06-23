import { ArrowDown, FlaskConical } from "lucide-react";

export function AutoSkeletonRoadmapSection() {
  const stages = [
    "Experimental",
    "Compiler Research",
    "Prototype",
    "Public Beta",
    "Stable",
  ];
  const goals = [
    "Better accuracy",
    "Better React compatibility",
    "Better Next.js support",
    "Better Vite support",
    "Better performance",
    "Better support for complex component trees",
    "No runtime Hooks issues",
  ];

  return (
    <section
      id="roadmap"
      className="relative border-t border-border/20 bg-background pb-20"
    >
      <div className="absolute inset-0 dot-grid-bg opacity-20 pointer-events-none" />
      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-5">
        <div className="grid gap-10 lg:grid-cols-[1fr_0.8fr] lg:items-start">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-amber-300">
              <FlaskConical className="size-3.5" />
              AutoSkeleton Compiler
            </div>
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">
              AutoSkeleton Compiler (In Progress)
            </h2>
            <p className="mt-4 text-muted-foreground">
              We are actively building a next-generation compiler-assisted
              AutoSkeleton engine. Instead of relying on runtime component
              introspection, the new architecture will leverage compile-time
              analysis to generate more accurate skeleton structures.
            </p>
            <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {goals.map((goal) => (
                <div
                  key={goal}
                  className="rounded-lg border border-zinc-800 bg-zinc-950/40 px-4 py-3 text-sm text-zinc-300"
                >
                  {goal}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-lg border border-zinc-800 bg-zinc-950/50 p-5">
            <p className="mb-5 text-sm font-semibold text-zinc-300">Roadmap</p>
            <div className="flex flex-col items-center gap-3">
              {stages.map((stage, index) => (
                <div
                  key={stage}
                  className="flex w-full flex-col items-center gap-3"
                >
                  <div
                    className={`w-full rounded-lg border px-4 py-3 text-center text-sm font-semibold ${
                      index === 0
                        ? "border-amber-500/30 bg-amber-500/10 text-amber-200"
                        : "border-zinc-800 bg-zinc-900/70 text-zinc-300"
                    }`}
                  >
                    {stage}
                  </div>
                  {index < stages.length - 1 && (
                    <ArrowDown className="size-4 text-zinc-600" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
