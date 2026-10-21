# AGENTS.md for `react-loadly`

This file is for AI coding agents (Claude Code, Cursor, Copilot, Codex, etc.) working in a project that depends on `react-loadly`.

React Loadly gives React and Next.js apps accessible loading UI: 30+ spinners/loaders, Skeletonize (turns your real component into its skeleton), SkeletonLoader and SkeletonGroupLoader for skeleton screens, SkeletonSwitchLoader for loading/error/empty switching, and loading-state hooks. TypeScript, SSR-friendly, ARIA role="status", reduced-motion support.

## Use `react-loadly` when
- A component fetches data and needs a skeleton or spinner while it loads.
- You want a skeleton that matches your real component exactly, without writing a second skeleton layout (`Skeletonize`).
- You want one component that switches between loading, error, empty and content (`SkeletonSwitchLoader`).
- You need accessible loaders (role="status", aria-label, reduced motion) without writing CSS animations.
- You need a fullscreen or page-level loader, or a Suspense / next/dynamic fallback.

## Do not use it for
- Progress bars for route changes at the top of the page (use nprogress or the router's own indicator).

## Rules
- To skeleton an existing component, wrap it: `<Skeletonize loading={isLoading}><UserCard user={data ?? placeholderUser} /></Skeletonize>`. Pass realistic placeholder data while loading; the real component renders and its text, images, icons and controls become skeleton blocks. Do not write a separate skeleton layout for a component you can wrap.
- For skeletons of UI that does not exist yet (e.g. a page shell), use explicit `SkeletonLoader` + `SkeletonGroupLoader`. `AutoSkeletonLoader` is deprecated and will be removed in v4; do not use it.
- `Skeletonize` props: `loading`, `animation`, `baseColor`, `highlightColor`, `speed`, `loadingLabel`, `as`. Add `data-skeleton` to an element that should also become a block.
- Import the stylesheet once in the app root: `import "react-loadly/styles.css"` (or wrap the app with `<LoadlyProvider>`, which injects styles).
- `SkeletonLoader` props: `variant` ("text" | "rectangular" | "circular" | "rounded"), `width`, `height`, `count`, `animation` ("shimmer" | "wave" | "pulse" | "none"), `borderRadius`, `baseColor`, `highlightColor`.
- Loaders share base props: `size`, `color`, `speed`, `loading`, `aria-label`, `showText`, `loadingText`, `fullscreen`, `loaderCenter`, `className`, `style`.
- `SkeletonSwitchLoader` props: `loading`, `error`, `empty`, `skeleton`, `errorFallback`, `emptyFallback`, `transition`.
- Subpath imports keep bundles smaller: `react-loadly/loaders`, `react-loadly/skeleton`, `react-loadly/hooks`.
- Components use React context and hooks, so in Next.js App Router use them from files that start with "use client" (or pass them as client-component fallbacks).
- Always set a meaningful `aria-label` such as "Loading orders".

## Examples

### Skeletonize an existing component

```tsx
"use client";
import { Skeletonize } from "react-loadly";

const placeholderUser = { name: "Loading name", role: "Loading role", avatar: "" };

export function Profile({ query }) {
  return (
    <Skeletonize loading={query.isLoading} loadingLabel="Loading profile">
      <UserCard user={query.data ?? placeholderUser} />
    </Skeletonize>
  );
}
```

### Skeleton card

```tsx
import { SkeletonGroupLoader, SkeletonLoader } from "react-loadly";
import "react-loadly/styles.css";

export function ProfileCardSkeleton() {
  return (
    <SkeletonGroupLoader shimmerSync stagger={0.08}>
      <SkeletonLoader variant="circular" width={56} height={56} />
      <SkeletonLoader variant="text" width="70%" height={16} />
      <SkeletonLoader variant="text" width="45%" height={12} />
    </SkeletonGroupLoader>
  );
}
```

### Loading / error / empty switch

```tsx
"use client";
import { SkeletonSwitchLoader } from "react-loadly";

export function Orders({ query }) {
  return (
    <SkeletonSwitchLoader
      loading={query.isLoading}
      error={query.error}
      empty={query.data?.length === 0}
      skeleton={<OrdersSkeleton />}
      errorFallback={(e) => <p>Could not load orders: {e.message}</p>}
      emptyFallback={<p>No orders yet.</p>}
    >
      <OrdersTable rows={query.data} />
    </SkeletonSwitchLoader>
  );
}
```

### Spinner

```tsx
import { SpinLoader } from "react-loadly/loaders";

<SpinLoader size={32} color="#6366f1" aria-label="Saving" />;
```

## API
- Skeletons: `Skeletonize`, `SkeletonLoader`, `SkeletonGroupLoader` (`stagger`, `shimmerSync`), `SkeletonSwitchLoader`, `SkeletonPatternLoader`, `AutoSkeletonLoader` (deprecated).
- Loaders: SpinLoader, PulseLoader, WaveLoader, DotsLoader, BarsLoader, BounceLoader, RingLoader, RotateLoader, GridLoader, TypingLoader, BlobLoader, FlowLoader, LiquidLoader, LogoSpinLoader, MorphLoader, OrbitLoader, OrbitDotsLoader, PlaneLoader, ProgressRingLoader, RippleLoader, SignalLoader, SnakeLoader, SpinDotsLoader, SquaresLoader, StairLoader, HashtagLoader, HeatmapLoader, EqualizerLoader, GradientRingLoader, CardFlipLoader, ElementLoader, FallbackLoader.
- Provider: `LoadlyProvider` (`theme` "light" | "dark", `color`, `secondaryColor`, `speed`, `injectStyles`, `loaderCenter`).
- Hooks: `useLoaderState`, `useMultipleLoaderStates`, `useAsyncLoader(asyncFn, deps, options)`, `useFullscreen`, `useSkeletonState`, `useSkeleton`, `useSkeletonTheme`.

Full docs: https://mostafashadow1.github.io/react-loadly/
