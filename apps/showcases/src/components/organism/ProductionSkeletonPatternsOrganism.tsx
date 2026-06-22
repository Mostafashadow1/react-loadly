import { SkeletonGroup, SkeletonLoader } from "react-loadly";
import type { CSSProperties, ReactNode } from "react";

type SkeletonSize = string | number;

function Line({
  width = "100%",
  height = 12,
  style,
}: {
  width?: SkeletonSize;
  height?: SkeletonSize;
  style?: CSSProperties;
}) {
  return <SkeletonLoader variant="text" width={width} height={height} style={style} />;
}

function Surface({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`rounded-lg border border-zinc-800 bg-zinc-950/60 p-5 ${className}`}>
      {children}
    </div>
  );
}

function ProfileCardSkeleton() {
  return (
    <Surface>
      <div className="flex items-center gap-4">
        <SkeletonGroup shimmerSync stagger={0.05}>
          <SkeletonLoader variant="avatar" size={64} />
        </SkeletonGroup>
        <div className="min-w-0 flex-1 pt-1">
          <SkeletonGroup shimmerSync stagger={0.05}>
            <Line width="62%" height={18} />
            <Line width="42%" height={12} />
          </SkeletonGroup>
        </div>
      </div>

      <div className="mt-6 space-y-3">
        <SkeletonGroup shimmerSync stagger={0.05}>
          <Line width="100%" height={12} />
          <Line width="92%" height={12} />
          <Line width="68%" height={12} />
        </SkeletonGroup>
      </div>

      <div className="mt-6 grid grid-cols-3 gap-3">
        <SkeletonGroup shimmerSync stagger={0.05}>
          <SkeletonLoader variant="card" width="100%" height={44} borderRadius={20} />
          <SkeletonLoader variant="card" width="100%" height={44} borderRadius={20} />
          <SkeletonLoader variant="card" width="100%" height={44} borderRadius={20} />
        </SkeletonGroup>
      </div>

      <div className="mt-6 flex items-center justify-between gap-4">
        <SkeletonGroup shimmerSync stagger={0.05}>
          <SkeletonLoader variant="card" width={116} height={36} borderRadius={8} />
          <SkeletonLoader variant="card" width={92} height={36} borderRadius={8} />
        </SkeletonGroup>
      </div>
    </Surface>
  );
}

function ProductCardSkeleton() {
  return (
    <Surface className="overflow-hidden p-0">
      <div className="relative p-4 pb-0">
        <SkeletonGroup shimmerSync stagger={0.05}>
          <SkeletonLoader variant="card" width="100%" height={150} borderRadius={8} />
        </SkeletonGroup>
        <div className="absolute right-7 top-7">
          <SkeletonGroup shimmerSync stagger={0.05}>
            <SkeletonLoader variant="card" width={58} height={22} borderRadius={999} />
          </SkeletonGroup>
        </div>
      </div>

      <div className="p-5">
        <div className="space-y-2">
          <SkeletonGroup shimmerSync stagger={0.05}>
            <Line width="72%" height={18} />
            <Line width="100%" height={12} />
            <Line width="86%" height={12} />
            <Line width="54%" height={12} />
          </SkeletonGroup>
        </div>

        <div className="mt-5 flex items-center justify-between">
          <SkeletonGroup shimmerSync stagger={0.05}>
            <SkeletonLoader variant="card" width={80} height={28} borderRadius={999} />
            <SkeletonLoader variant="card" width={120} height={28} borderRadius={999} />
          </SkeletonGroup>
        </div>

        <div className="mt-5 flex justify-end">
          <SkeletonGroup shimmerSync stagger={0.05}>
            <SkeletonLoader variant="card" width={140} height={36} borderRadius={8} />
          </SkeletonGroup>
        </div>
      </div>
    </Surface>
  );
}

function ArticleCardSkeleton() {
  return (
    <Surface>
      <div className="grid grid-cols-[120px_1fr] items-start gap-4">
        <SkeletonGroup shimmerSync stagger={0.05}>
          <SkeletonLoader variant="card" width={120} height={90} borderRadius={6} />
        </SkeletonGroup>

        <div className="min-w-0">
          <SkeletonGroup shimmerSync stagger={0.05}>
            <Line width="34%" height={10} />
            <Line width="92%" height={18} />
            <Line width="76%" height={18} />
          </SkeletonGroup>
        </div>
      </div>

      <div className="mt-5 space-y-3">
        <SkeletonGroup shimmerSync stagger={0.05}>
          <Line width="100%" height={12} />
          <Line width="96%" height={12} />
          <Line width="74%" height={12} />
        </SkeletonGroup>
      </div>

      <div className="mt-5 flex items-center justify-between border-t border-zinc-800 pt-4">
        <div className="flex items-center gap-2">
          <SkeletonGroup shimmerSync stagger={0.05}>
            <SkeletonLoader variant="avatar" size={24} />
            <Line width={92} height={11} />
          </SkeletonGroup>
        </div>
        <SkeletonGroup shimmerSync stagger={0.05}>
          <Line width={72} height={11} />
        </SkeletonGroup>
      </div>
    </Surface>
  );
}

function DashboardCardSkeleton() {
  return (
    <Surface>
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <SkeletonGroup shimmerSync stagger={0.05}>
            <Line width="42%" height={12} />
            <Line width="58%" height={32} />
          </SkeletonGroup>
        </div>
        <SkeletonGroup shimmerSync stagger={0.05}>
          <SkeletonLoader variant="card" width={76} height={26} borderRadius={999} />
        </SkeletonGroup>
      </div>

      <div className="mt-6 flex h-28 items-end gap-2 rounded-lg border border-zinc-800/80 bg-zinc-950/50 p-4">
        <SkeletonGroup shimmerSync stagger={false}>
          {[46, 72, 54, 88, 64, 104, 78, 92].map((height, index) => (
            <SkeletonLoader
              key={index}
              variant="card"
              width={18}
              height={height}
              borderRadius={5}
            />
          ))}
        </SkeletonGroup>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <SkeletonGroup shimmerSync stagger={0.05}>
          <Line width={96} height={11} />
          <Line width={118} height={11} />
        </SkeletonGroup>
      </div>
    </Surface>
  );
}

function SidebarSkeleton() {
  const navWidths = ["72%", "88%", "64%", "78%", "58%", "70%"];

  return (
    <Surface className="min-h-[360px]">
      <div className="flex items-center gap-3 border-b border-zinc-800 pb-4">
        <SkeletonGroup shimmerSync stagger={0.05}>
          <SkeletonLoader variant="avatar" size={40} borderRadius={8} />
          <Line width={112} height={16} />
        </SkeletonGroup>
      </div>

      <div className="mt-5 space-y-3">
        {navWidths.map((width, index) => (
          <div key={index} className="flex items-center gap-3 rounded-lg">
            <SkeletonGroup shimmerSync stagger={0.04}>
              <SkeletonLoader variant="card" width={18} height={18} borderRadius={5} />
              <Line width={width} height={13} />
            </SkeletonGroup>
          </div>
        ))}
      </div>

      <div className="mt-8 border-t border-zinc-800 pt-4">
        <div className="flex items-center gap-3">
          <SkeletonGroup shimmerSync stagger={0.05}>
            <SkeletonLoader variant="avatar" size={34} />
            <Line width={118} height={13} />
            <SkeletonLoader variant="card" width={28} height={18} borderRadius={999} />
          </SkeletonGroup>
        </div>
      </div>
    </Surface>
  );
}

function TodoListSkeleton() {
  return (
    <Surface>
      <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
        <SkeletonGroup shimmerSync stagger={0.05}>
          <Line width={116} height={18} />
          <SkeletonLoader variant="card" width={68} height={26} borderRadius={999} />
        </SkeletonGroup>
      </div>

      <div className="mt-5 space-y-4">
        {["86%", "72%", "94%", "64%", "80%"].map((width, index) => (
          <div key={index} className="flex items-start gap-3">
            <SkeletonGroup shimmerSync stagger={0.04}>
              <SkeletonLoader variant="card" width={20} height={20} borderRadius={5} />
            </SkeletonGroup>
            <div className="flex-1 space-y-2">
              <SkeletonGroup shimmerSync stagger={0.04}>
                <Line width={width} height={13} />
                {index % 2 === 0 && <Line width="48%" height={10} />}
              </SkeletonGroup>
            </div>
          </div>
        ))}
      </div>
    </Surface>
  );
}

function TableSkeleton() {
  const rows = Array.from({ length: 5 });

  return (
    <Surface>
      <div className="grid grid-cols-[1.4fr_1fr_0.8fr_0.8fr] gap-4 border-b border-zinc-800 pb-3">
        <SkeletonGroup shimmerSync stagger={0.04}>
          <Line width="60%" height={11} />
          <Line width="50%" height={11} />
          <Line width="54%" height={11} />
          <Line width="44%" height={11} />
        </SkeletonGroup>
      </div>

      <div className="divide-y divide-zinc-800/80">
        {rows.map((_, row) => (
          <div key={row} className="grid grid-cols-[1.4fr_1fr_0.8fr_0.8fr] items-center gap-4 py-4">
            <div className="flex items-center gap-3">
              <SkeletonGroup shimmerSync stagger={0.04}>
                <SkeletonLoader variant="avatar" size={28} borderRadius={6} />
                <Line width={row % 2 === 0 ? 108 : 86} height={12} />
              </SkeletonGroup>
            </div>
            <SkeletonGroup shimmerSync stagger={0.04}>
              <Line width={row % 2 === 0 ? "78%" : "62%"} height={12} />
              <SkeletonLoader variant="card" width={58} height={22} borderRadius={999} />
              <Line width="68%" height={12} />
            </SkeletonGroup>
          </div>
        ))}
      </div>
    </Surface>
  );
}

function SettingsFormSkeleton() {
  return (
    <Surface>
      <SkeletonGroup shimmerSync stagger={0.05}>
        <Line width="42%" height={18} />
        <Line width="68%" height={12} />
      </SkeletonGroup>

      <div className="mt-6 space-y-5">
        {[0, 1].map((item) => (
          <div key={item} className="space-y-2">
            <SkeletonGroup shimmerSync stagger={0.05}>
              <Line width={item === 0 ? 74 : 96} height={11} />
              <SkeletonLoader variant="card" width="100%" height={40} borderRadius={8} />
            </SkeletonGroup>
          </div>
        ))}

        {[0, 1].map((item) => (
          <div key={item} className="flex items-center justify-between rounded-lg border border-zinc-800 p-3">
            <SkeletonGroup shimmerSync stagger={0.05}>
              <Line width={item === 0 ? 132 : 108} height={13} />
              <SkeletonLoader variant="card" width={44} height={24} borderRadius={999} />
            </SkeletonGroup>
          </div>
        ))}

        <div className="flex justify-end gap-3 pt-2">
          <SkeletonGroup shimmerSync stagger={0.05}>
            <SkeletonLoader variant="card" width={86} height={36} borderRadius={8} />
            <SkeletonLoader variant="card" width={112} height={36} borderRadius={8} />
          </SkeletonGroup>
        </div>
      </div>
    </Surface>
  );
}

export function ProductionSkeletonPatterns() {
  const patterns = [
    { title: "ProfileCardSkeleton", component: <ProfileCardSkeleton /> },
    { title: "ProductCardSkeleton", component: <ProductCardSkeleton /> },
    { title: "ArticleCardSkeleton", component: <ArticleCardSkeleton /> },
    { title: "DashboardCardSkeleton", component: <DashboardCardSkeleton /> },
    { title: "SidebarSkeleton", component: <SidebarSkeleton /> },
    { title: "TodoListSkeleton", component: <TodoListSkeleton /> },
    { title: "TableSkeleton", component: <TableSkeleton /> },
    { title: "SettingsFormSkeleton", component: <SettingsFormSkeleton /> },
  ];

  return (
    <section id="patterns" className="relative border-t border-border/20 bg-background py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-14 max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-wider text-indigo-300">
            Production Skeleton Patterns
          </p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
            Skeletons that look like real application states
          </h2>
          <p className="mt-4 text-muted-foreground">
            For production-critical screens, build intentional placeholders with
            SkeletonLoader and SkeletonGroup. These patterns are predictable, accessible,
            and easy to adapt to your UI.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          {patterns.map((pattern) => (
            <article key={pattern.title} className="rounded-lg border border-zinc-800/80 bg-card/40 p-4">
              <h3 className="mb-4 text-sm font-semibold text-zinc-300">{pattern.title}</h3>
              {pattern.component}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
