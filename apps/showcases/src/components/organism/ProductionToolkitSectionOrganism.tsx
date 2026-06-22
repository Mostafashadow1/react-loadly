import {
  Accessibility,
  Blocks,
  Code2,
  MonitorCheck,
  Moon,
  Server,
} from "lucide-react";
import {
  SkeletonGroup,
  SkeletonLoader,
  SignalLoader,
  useSkeletonState,
} from "react-loadly";

const codeExamples = {
  skeleton: `<SkeletonLoader variant="text" lines={3} width="100%" />`,
  group: `<SkeletonGroup shimmerSync stagger={0.08}>
  <SkeletonLoader variant="avatar" size={48} />
  <SkeletonLoader variant="text" lines={2} width="100%" />
</SkeletonGroup>`,
  hooks: `const { loading, data, retry } = useSkeletonState({
  fetch: getUser,
  minDisplayTime: 400,
});`,
  accessibility: `<SignalLoader
  aria-label="Loading notifications"
  color="#22c55e"
/>`,
  ssr: `import { SkeletonGroup } from "react-loadly/skeleton";
import "react-loadly/styles.css";`,
  motion: `@media (prefers-reduced-motion: reduce) {
  React Loadly animations pause gracefully.
}`,
};

function CodeBlock({ code }: { code: string }) {
  return (
    <pre className="mt-4 overflow-x-auto rounded-lg border border-zinc-800 bg-zinc-950/90 p-4 text-left text-xs leading-relaxed text-zinc-300">
      <code>{code}</code>
    </pre>
  );
}

function HookDemo() {
  const { loading, retry } = useSkeletonState({
    fetch: () => Promise.resolve({ name: "Revenue API" }),
    minDisplayTime: 900,
  });

  return (
    <div className="rounded-lg border border-zinc-800/8  p-4">
      {loading ? (
        <SkeletonGroup
          shimmerSync
          stagger={0.08}
          baseColor="#e5e7eb"
          highlightColor="#f8fafc"
        >
          <div className="space-y-2">
            <SkeletonLoader variant="text" width="70%" height={14} />
            <SkeletonLoader variant="text" width="100%" height={28} />
            <SkeletonLoader variant="text" width="45%" height={12} />
          </div>
        </SkeletonGroup>
      ) : (
        <div>
          <p className="text-xs text-zinc-500">Status</p>
          <p className="mt-1 text-lg font-bold text-emerald-700">Data loaded</p>
          <button
            onClick={retry}
            className="mt-3 rounded-md border border-zinc-300 px-3 py-1 text-xs text-zinc-700 hover:bg-zinc-100"
          >
            Replay
          </button>
        </div>
      )}
    </div>
  );
}

export function ProductionToolkitSection() {
  const features = [
    {
      icon: Blocks,
      title: "SkeletonLoader",
      desc: "Composable primitives for text, cards, avatars, and content placeholders.",
      code: codeExamples.skeleton,
      live: (
        <SkeletonGroup
          shimmerSync
          stagger={0.08}
          baseColor="#e5e7eb"
          highlightColor="#f8fafc"
        >
          <div className="space-y-2">
            <SkeletonLoader variant="text" width="80%" height={16} />
            <SkeletonLoader variant="text" width="100%" height={16} />
            <SkeletonLoader variant="text" width="55%" height={16} />
          </div>
        </SkeletonGroup>
      ),
    },
    {
      icon: Code2,
      title: "SkeletonGroup",
      desc: "Coordinate multiple placeholders with synchronized shimmer and staggered timing.",
      code: codeExamples.group,
      live: (
        <div className="flex items-center gap-4">
          <SkeletonGroup
            shimmerSync
            stagger={0.08}
            baseColor="#e5e7eb"
            highlightColor="#f8fafc"
          >
            <SkeletonLoader variant="avatar" size={48} />
            <div className="space-y-2">
              <SkeletonLoader variant="text" width={180} height={14} />
              <SkeletonLoader variant="text" width={120} height={12} />
            </div>
          </SkeletonGroup>
        </div>
      ),
    },
    {
      icon: MonitorCheck,
      title: "Loading Hooks",
      desc: "Manage loading, data, error, retry, and minimum display timing without UI flicker.",
      code: codeExamples.hooks,
      live: <HookDemo />,
    },
    {
      icon: Accessibility,
      title: "Accessibility",
      desc: "Loaders include status roles, busy state, labels, and screen-reader text.",
      code: codeExamples.accessibility,
      live: (
        <SignalLoader
          size={44}
          color="#22c55e"
          secondaryColor="#a3e635"
          aria-label="Loading notifications"
        />
      ),
    },
    {
      icon: Server,
      title: "SSR Support",
      desc: "Works in SSR-oriented apps by using CSS animations and predictable markup.",
      code: codeExamples.ssr,
      live: (
        <div className="grid grid-cols-3 gap-2">
          {["React", "Next.js", "Vite"].map((item) => (
            <span
              key={item}
              className="rounded-md border border-zinc-800 bg-zinc-950/50 px-3 py-2 text-center text-xs text-zinc-300"
            >
              {item}
            </span>
          ))}
        </div>
      ),
    },
    {
      icon: Moon,
      title: "Reduced Motion",
      desc: "Respects reduced-motion preferences so loading states stay comfortable.",
      code: codeExamples.motion,
      live: (
        <div className="flex items-center gap-3 rounded-lg border border-zinc-800 bg-zinc-950/50 p-4">
          <div className="size-8 rounded-full bg-indigo-500/30" />
          <div className="space-y-2 flex-1">
            <div className="h-2 rounded bg-zinc-800" />
            <div className="h-2 w-2/3 rounded bg-zinc-800" />
          </div>
        </div>
      ),
    },
  ];

  return (
    <section
      id="production"
      className="relative border-t border-border/20 bg-background py-24"
    >
      <div className="absolute inset-0 dot-grid-bg opacity-30 pointer-events-none" />
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
            Production Toolkit
          </p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
            Reliable loading patterns for real React apps
          </h2>
          <p className="mt-4 text-muted-foreground">
            React Loadly now centers on production-ready loaders, skeleton
            primitives, loading hooks, accessibility, SSR, and predictable
            behavior across React 17, 18, and 19.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          {features.map((feature) => (
            <article
              key={feature.title}
              className="h-fit rounded-lg border border-zinc-800/80 bg-card/40 p-5 shadow-lg shadow-black/10"
            >
              <div className="flex items-start gap-4">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-300">
                  <feature.icon className="size-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-foreground">
                    {feature.title}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    {feature.desc}
                  </p>
                </div>
              </div>
              <div className="mt-5 rounded-lg border border-zinc-800/8 p-5 text-zinc-950">
                {feature.live}
              </div>
              <CodeBlock code={feature.code} />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
