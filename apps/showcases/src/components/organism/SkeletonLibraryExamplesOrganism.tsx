import {
  ArticleSkeleton,
  CardSkeleton,
  DashboardSkeleton,
  ListSkeleton,
  ProductCardSkeleton,
  ProfileSkeleton,
  Skeleton,
  SkeletonGroup,
  SkeletonSwitch,
  TableSkeleton,
} from "react-loadly";
import { ArrowRight, Boxes, GalleryVerticalEnd, Layers3, Moon, Sparkles } from "lucide-react";
import type { ReactNode } from "react";

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
      <div className="mb-5 flex items-center justify-between gap-3">
        <div className="min-w-0">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-indigo-300">
            {eyebrow}
          </p>
          <h3 className="mt-1 truncate text-base font-semibold text-zinc-100">{title}</h3>
        </div>
      </div>
      <div className="flex-1 rounded-lg border border-zinc-800/70 bg-zinc-950/60 p-4">
        {children}
      </div>
    </article>
  );
}

function PrimitiveExample() {
  return (
    <SkeletonGroup animation="shimmer" speed={1.25} stagger={0.08} baseColor="#e5e7eb" highlightColor="#f8fafc">
      <div className="flex items-center gap-4">
        <Skeleton variant="circular" width={56} height={56} />
        <div className="min-w-0 flex-1">
          <Skeleton width="44%" height={18} style={{ marginBottom: 10 }} />
          <Skeleton width="72%" height={12} style={{ marginBottom: 8 }} />
          <Skeleton width="58%" height={12} />
        </div>
      </div>
      <div className="mt-5 grid grid-cols-3 gap-3">
        <Skeleton variant="rounded" height={48} />
        <Skeleton variant="rounded" height={48} />
        <Skeleton variant="rounded" height={48} />
      </div>
    </SkeletonGroup>
  );
}

function LightDashboardExample() {
  return (
    <div className="rounded-lg bg-zinc-950/70 p-4">
      <SkeletonGroup
        animation="wave"
        speed={1.8}
        baseColor="#e5e7eb"
        highlightColor="#f8fafc"
        direction="rtl"
        stagger={0.06}
      >
        <DashboardSkeleton statCards={3} hasChart chartHeight={124} tableRows={3} tableColumns={3} />
      </SkeletonGroup>
    </div>
  );
}

function SwitchExample() {
  return (
    <SkeletonSwitch
      loading
      transition="fade"
      skeleton={
        <SkeletonGroup baseColor="#e5e7eb" highlightColor="#f8fafc">
          <CardSkeleton hasMedia mediaHeight={130} lines={2} hasActions={false} />
        </SkeletonGroup>
      }
    >
      <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-5">
        <p className="text-sm font-semibold text-emerald-900">Loaded account</p>
        <p className="mt-2 text-sm text-emerald-700">Content fades in without changing layout.</p>
      </div>
    </SkeletonSwitch>
  );
}

function PresetGalleryExample() {
  return (
    <div className="grid grid-cols-1 gap-3 xl:grid-cols-2">
      <div className="rounded-lg bg-zinc-950/70 p-4">
        <ProfileSkeleton avatarSize={64} bioLines={2} statsCount={3} />
      </div>
      <div className="rounded-lg bg-zinc-950/70 p-4">
        <ProductCardSkeleton imageHeight={140} hasRating hasPrice hasCTA />
      </div>
      <div className="rounded-lg bg-zinc-950/70 p-4 xl:col-span-2">
        <ArticleSkeleton hasHero heroHeight={120} titleLines={1} paragraphs={1} linesPerParagraph={3} />
      </div>
      <div className="rounded-lg bg-zinc-950/70 p-4">
        <ListSkeleton rows={2} avatarSize={32} lineWidths={["76%", "52%"]} />
      </div>
      <div className="rounded-lg bg-zinc-950/70 p-4">
        <TableSkeleton rows={2} columns={3} rowHeight={28} headerHeight={32} />
      </div>
    </div>
  );
}

const featureTiles = [
  {
    icon: Boxes,
    title: "Base primitive",
    text: "One component covers text, rectangular, circular, and rounded shapes.",
  },
  {
    icon: Layers3,
    title: "Context themes",
    text: "SkeletonGroup passes animation, color, speed, direction, and stagger settings down.",
  },
  {
    icon: GalleryVerticalEnd,
    title: "Preset layouts",
    text: "Cards, lists, tables, profiles, articles, dashboards, and product states are built from Skeleton.",
  },
  {
    icon: Moon,
    title: "Motion aware",
    text: "CSS handles reduced-motion fallback without SSR-time browser access.",
  },
] as const;

export function SkeletonLibraryExamples() {
  return (
    <section id="skeleton-library" className="relative border-t border-border/20 bg-background py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-indigo-400/20 bg-indigo-400/10 px-3 py-1 text-xs font-semibold text-indigo-200">
              <Sparkles className="size-3.5" />
              New skeleton API
            </div>
            <h2 className="mt-5 text-3xl font-extrabold tracking-tight sm:text-4xl">
              Production skeleton examples, now built from composable primitives
            </h2>
          </div>
          <p className="text-sm leading-7 text-muted-foreground sm:text-base">
            The new library surface adds a polymorphic Skeleton primitive, themed groups,
            lifecycle switching, and ready-made presets for common product screens.
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
          <ExampleShell eyebrow="Skeleton" title="Primitive composition">
            <PrimitiveExample />
          </ExampleShell>

          <ExampleShell eyebrow="SkeletonGroup" title="Light themed dashboard">
            <LightDashboardExample />
          </ExampleShell>

          <ExampleShell eyebrow="SkeletonSwitch" title="Loading lifecycle">
            <SwitchExample />
          </ExampleShell>

          <ExampleShell eyebrow="Presets" title="Ready-made layouts">
            <PresetGalleryExample />
          </ExampleShell>
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
