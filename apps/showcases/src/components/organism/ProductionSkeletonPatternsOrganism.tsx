import { SkeletonLoader, SkeletonGroupLoader } from "react-loadly";
import type { ReactNode } from "react";

const space = {
  xs: 4,
  sm: 6,
  md: 8,
  lg: 12,
  xl: 16,
  xxl: 24,
} as const;

function Surface({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-lg border border-zinc-800 bg-zinc-950/60 p-5">
      {children}
    </div>
  );
}

function ProfileCardSkeleton() {
  return (
    <Surface>
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
    </Surface>
  );
}

function ProductCardSkeleton() {
  return (
    <Surface>
      <SkeletonGroupLoader>
        <SkeletonLoader variant="rectangular" height={200} borderRadius={space.md} style={{ marginBottom: space.lg }} />
        <SkeletonLoader width="85%" style={{ marginBottom: space.md }} />
        <SkeletonLoader width="55%" height="0.85em" style={{ marginBottom: space.lg }} />

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: space.xl,
          }}
        >
          <SkeletonLoader variant="rounded" width={80} height={28} />
          <SkeletonLoader variant="rounded" width={64} height={28} />
        </div>

        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <SkeletonLoader variant="rounded" width={140} height={36} />
        </div>
      </SkeletonGroupLoader>
    </Surface>
  );
}

function ArticleCardSkeleton() {
  return (
    <Surface>
      <SkeletonGroupLoader>
        <div
          style={{
            display: "flex",
            gap: space.lg,
            alignItems: "flex-start",
            marginBottom: space.xl,
          }}
        >
          <SkeletonLoader
            variant="rectangular"
            width={120}
            height={90}
            borderRadius={space.sm}
            style={{ flexShrink: 0 }}
          />
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
    </Surface>
  );
}

function DashboardCardSkeleton() {
  const barHeights = [60, 80, 50, 90, 70, 85, 65, 75];

  return (
    <Surface>
      <SkeletonGroupLoader>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: space.xl,
          }}
        >
          <SkeletonLoader width={140} height={18} />
          <SkeletonLoader variant="rounded" width={80} height={28} />
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            gap: space.sm,
            height: 100,
            marginBottom: space.xl,
          }}
        >
          {barHeights.map((height, index) => (
            <SkeletonLoader
              key={index}
              variant="rectangular"
              width={24}
              height={height}
              borderRadius={space.xs}
              style={{ flex: 1 }}
            />
          ))}
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <SkeletonLoader width={100} height="0.85em" />
          <SkeletonLoader width={80} height="0.85em" />
        </div>
      </SkeletonGroupLoader>
    </Surface>
  );
}

export function ProductionSkeletonPatterns() {
  const patterns = [
    { title: "ProfileCardSkeletonLoader", component: <ProfileCardSkeleton /> },
    { title: "ProductCardSkeletonLoader", component: <ProductCardSkeleton /> },
    { title: "ArticleCardSkeletonLoader", component: <ArticleCardSkeleton /> },
    { title: "DashboardCardSkeletonLoader", component: <DashboardCardSkeleton /> },
  ];

  return (
    <section id="patterns" className="relative border-t border-border/20 bg-background py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-14 max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-wider text-indigo-300">
            Production SkeletonLoader Patterns
          </p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
            SkeletonLoader states that look like real application screens
          </h2>
          <p className="mt-4 text-muted-foreground">
            Each pattern keeps the familiar SkeletonLoader naming while using
            the core primitives internally, with explicit spacing between every
            stacked placeholder.
          </p>
        </div>

        <div className="grid grid-cols-1 items-start gap-5 lg:grid-cols-2">
          {patterns.map((pattern) => (
            <article key={pattern.title} className="h-fit rounded-lg border border-zinc-800/80 bg-card/40 p-4">
              <h3 className="mb-4 text-sm font-semibold text-zinc-300">{pattern.title}</h3>
              {pattern.component}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
