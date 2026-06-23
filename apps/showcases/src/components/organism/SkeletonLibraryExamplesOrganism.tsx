import { useState, type ReactNode } from "react";
import { SkeletonLoader, SkeletonGroupLoader } from "react-loadly";
import type { AnimationVariant } from "react-loadly";
import {
  ArrowRight,
  Boxes,
  GalleryVerticalEnd,
  Layers3,
  Moon,
  Sparkles,
} from "lucide-react";

const space = {
  xs: 4,
  sm: 6,
  md: 8,
  lg: 12,
  xl: 16,
  xxl: 24,
} as const;

function ExampleShell({
  title,
  eyebrow,
  children,
}: {
  title: string;
  eyebrow: string;
  children: ReactNode;
}) {
  return (
    <article className="flex h-fit flex-col rounded-lg border border-zinc-800/80 bg-zinc-950/50 p-5 shadow-lg shadow-black/10">
      <div className="mb-5">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-indigo-300">
          {eyebrow}
        </p>
        <h3 className="mt-1 truncate text-base font-semibold text-zinc-100">{title}</h3>
      </div>
      <div className="rounded-lg border border-zinc-800/70 bg-zinc-950/60 p-4">
        {children}
      </div>
    </article>
  );
}

function BasicLinesExample() {
  return (
    <SkeletonGroupLoader>
      <SkeletonLoader style={{ marginBottom: space.sm }} />
      <SkeletonLoader style={{ marginBottom: space.sm }} />
      <SkeletonLoader width="83%" style={{ marginBottom: space.sm }} />
      <SkeletonLoader width="60%" />
    </SkeletonGroupLoader>
  );
}

function AvatarRowExample() {
  return (
    <SkeletonGroupLoader>
      <div style={{ display: "flex", alignItems: "center", gap: space.lg }}>
        <SkeletonLoader variant="circular" width={48} height={48} />
        <div style={{ flex: 1 }}>
          <SkeletonLoader width="55%" style={{ marginBottom: space.sm }} />
          <SkeletonLoader width="35%" height="0.85em" />
        </div>
      </div>
    </SkeletonGroupLoader>
  );
}

function ProfileCardExample() {
  return (
    <SkeletonGroupLoader>
      <div style={{ display: "flex", alignItems: "center", gap: space.lg, marginBottom: space.xl }}>
        <SkeletonLoader variant="circular" width={48} height={48} />
        <div style={{ flex: 1 }}>
          <SkeletonLoader width="55%" style={{ marginBottom: space.sm }} />
          <SkeletonLoader width="35%" height="0.85em" />
        </div>
      </div>
      <SkeletonLoader style={{ marginBottom: space.sm }} />
      <SkeletonLoader style={{ marginBottom: space.sm }} />
      <SkeletonLoader width="70%" style={{ marginBottom: space.xl }} />
      <div style={{ display: "flex", gap: space.md, marginBottom: space.xl }}>
        <SkeletonLoader variant="rounded" width={72} height={28} />
        <SkeletonLoader variant="rounded" width={88} height={28} />
        <SkeletonLoader variant="rounded" width={64} height={28} />
      </div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <SkeletonLoader variant="rounded" width={120} height={36} />
        <SkeletonLoader variant="rounded" width={120} height={36} />
      </div>
    </SkeletonGroupLoader>
  );
}

function ProductCardExample() {
  return (
    <SkeletonGroupLoader>
      <SkeletonLoader variant="rectangular" height={160} borderRadius={space.md} style={{ marginBottom: space.lg }} />
      <SkeletonLoader width="85%" style={{ marginBottom: space.md }} />
      <SkeletonLoader width="55%" height="0.85em" style={{ marginBottom: space.lg }} />
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: space.xl }}>
        <SkeletonLoader variant="rounded" width={80} height={28} />
        <SkeletonLoader variant="rounded" width={64} height={28} />
      </div>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <SkeletonLoader variant="rounded" width={140} height={36} />
      </div>
    </SkeletonGroupLoader>
  );
}

function ArticleCardExample() {
  return (
    <SkeletonGroupLoader>
      <div style={{ display: "flex", gap: space.lg, alignItems: "flex-start", marginBottom: space.xl }}>
        <SkeletonLoader variant="rectangular" width={120} height={90} borderRadius={space.sm} style={{ flexShrink: 0 }} />
        <div style={{ flex: 1 }}>
          <SkeletonLoader width="80%" style={{ marginBottom: space.sm }} />
          <SkeletonLoader width="60%" height="0.85em" style={{ marginBottom: space.sm }} />
          <SkeletonLoader width="40%" height="0.85em" />
        </div>
      </div>
      <SkeletonLoader style={{ marginBottom: space.sm }} />
      <SkeletonLoader style={{ marginBottom: space.sm }} />
      <SkeletonLoader width="75%" style={{ marginBottom: space.xl }} />
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: space.md }}>
          <SkeletonLoader variant="circular" width={24} height={24} />
          <SkeletonLoader width={100} height="0.85em" />
        </div>
        <SkeletonLoader variant="rounded" width={96} height={32} />
      </div>
    </SkeletonGroupLoader>
  );
}

function DashboardCardExample() {
  const barHeights = [60, 80, 50, 90, 70, 85, 65, 75];

  return (
    <SkeletonGroupLoader>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: space.xl }}>
        <SkeletonLoader width={140} height={18} />
        <SkeletonLoader variant="rounded" width={80} height={28} />
      </div>
      <div style={{ display: "flex", alignItems: "flex-end", gap: space.sm, height: 100, marginBottom: space.xl }}>
        {barHeights.map((height, index) => (
          <SkeletonLoader key={index} variant="rectangular" width={24} height={height} borderRadius={space.xs} style={{ flex: 1 }} />
        ))}
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <SkeletonLoader width={100} height="0.85em" />
        <SkeletonLoader width={80} height="0.85em" />
      </div>
    </SkeletonGroupLoader>
  );
}

function ThemeOverrideExample() {
  return (
    <SkeletonGroupLoader animation="wave" baseColor="#1e293b" highlightColor="#334155">
      <SkeletonLoader variant="rectangular" height={96} borderRadius={space.md} style={{ marginBottom: space.lg }} />
      <SkeletonLoader style={{ marginBottom: space.sm }} />
      <SkeletonLoader width="70%" />
    </SkeletonGroupLoader>
  );
}

function StaggerFeedExample() {
  const cards = [0, 1, 2];

  return (
    <SkeletonGroupLoader stagger={0.12}>
      {cards.map((item) => (
        <div key={item} style={{ marginBottom: item === cards.length - 1 ? 0 : space.lg }}>
          <SkeletonLoader variant="rounded" height={64} borderRadius={space.md} />
        </div>
      ))}
    </SkeletonGroupLoader>
  );
}

function RtlExample() {
  return (
    <SkeletonGroupLoader direction="rtl">
      <SkeletonLoader style={{ marginBottom: space.sm }} />
      <SkeletonLoader width="75%" style={{ marginBottom: space.sm }} />
      <SkeletonLoader width="50%" />
    </SkeletonGroupLoader>
  );
}

function AnimationDemo() {
  const [animation, setAnimation] = useState<AnimationVariant>("shimmer");
  const options = ["shimmer", "wave", "pulse", "none"] as const;

  return (
    <div>
      <div style={{ display: "flex", gap: space.md, marginBottom: space.xl }}>
        {options.map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => setAnimation(option)}
            className={`rounded-md border px-3 py-1.5 text-xs font-semibold transition ${
              animation === option
                ? "border-indigo-400 bg-indigo-500/20 text-indigo-100"
                : "border-zinc-700 text-zinc-400 hover:border-zinc-500 hover:text-zinc-100"
            }`}
          >
            {option}
          </button>
        ))}
      </div>
      <SkeletonGroupLoader animation={animation}>
        <SkeletonLoader style={{ marginBottom: space.sm }} />
        <SkeletonLoader width="80%" style={{ marginBottom: space.sm }} />
        <SkeletonLoader width="60%" />
      </SkeletonGroupLoader>
    </div>
  );
}

const featureTiles = [
  {
    icon: Boxes,
    title: "SkeletonLoader primitive",
    text: "One component covers text, rectangular, circular, and rounded shapes.",
  },
  {
    icon: Layers3,
    title: "SkeletonLoader themes",
    text: "SkeletonGroupLoader passes animation, color, speed, direction, and stagger settings down.",
  },
  {
    icon: GalleryVerticalEnd,
    title: "SkeletonLoader patterns",
    text: "Cards, articles, products, dashboards, and feeds are built from SkeletonLoader.",
  },
  {
    icon: Moon,
    title: "Motion aware",
    text: "Reduced-motion users automatically get a calmer animation fallback.",
  },
] as const;

export function SkeletonLibraryExamples() {
  const examples = [
    { eyebrow: "SkeletonLoader", title: "Basic text lines", component: <BasicLinesExample /> },
    { eyebrow: "SkeletonLoader", title: "Avatar and name row", component: <AvatarRowExample /> },
    { eyebrow: "SkeletonLoader", title: "Profile card", component: <ProfileCardExample /> },
    { eyebrow: "SkeletonLoader", title: "Product card", component: <ProductCardExample /> },
    { eyebrow: "SkeletonLoader", title: "Article card", component: <ArticleCardExample /> },
    { eyebrow: "SkeletonLoader", title: "Dashboard card", component: <DashboardCardExample /> },
    { eyebrow: "SkeletonGroupLoader", title: "Theme override", component: <ThemeOverrideExample /> },
    { eyebrow: "SkeletonGroupLoader", title: "Staggered feed", component: <StaggerFeedExample /> },
    { eyebrow: "SkeletonGroupLoader", title: "RTL direction", component: <RtlExample /> },
    { eyebrow: "Animation", title: "Click to switch animation", component: <AnimationDemo /> },
  ];

  return (
    <section id="skeleton-library" className="relative border-t border-border/20 bg-background py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-indigo-400/20 bg-indigo-400/10 px-3 py-1 text-xs font-semibold text-indigo-200">
              <Sparkles className="size-3.5" />
              SkeletonLoader API
            </div>
            <h2 className="mt-5 text-3xl font-extrabold tracking-tight sm:text-4xl">
              Production SkeletonLoader examples, built from composable primitives
            </h2>
          </div>
          <p className="text-sm leading-7 text-muted-foreground sm:text-base">
            These SkeletonLoader examples use the SkeletonLoader and SkeletonGroupLoader
            primitives internally. Layout is plain HTML/CSS, while every
            placeholder shape comes from the same loading system.
          </p>
        </div>

        <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          {featureTiles.map(({ icon: Icon, title, text }) => (
            <div key={title} className="rounded-lg border border-zinc-800/80 bg-card/40 p-4 shadow-lg shadow-black/10">
              <div className="mb-3 flex size-9 items-center justify-center rounded-lg bg-zinc-800/80 text-indigo-200">
                <Icon className="size-4" />
              </div>
              <h3 className="text-sm font-semibold text-zinc-100">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{text}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 items-start gap-5 lg:grid-cols-2">
          {examples.map((example) => (
            <ExampleShell key={example.title} eyebrow={example.eyebrow} title={example.title}>
              {example.component}
            </ExampleShell>
          ))}
        </div>

        <div className="mt-5 rounded-lg border border-indigo-400/20 bg-indigo-400/10 p-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm font-medium text-indigo-100">
              Imports work from the root package and the tree-shakeable skeleton subpath.
            </p>
            <div className="flex items-center gap-2 text-xs font-semibold text-indigo-200">
              react-loadly/skeleton
              <ArrowRight className="size-4" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
