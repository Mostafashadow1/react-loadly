# React Loadly

Reliable React loading experience toolkit for loaders, spinners, skeletons, loading-state hooks, and production-ready loading patterns.

React Loadly is maintained as a pnpm monorepo with the published `react-loadly` package and a private Vite showcase app.

## Workspace

```txt
packages/react-loadly   # npm package published as react-loadly
apps/showcases          # private Vite showcase app for GitHub Pages
```

## Quick Start

```bash
pnpm install
pnpm dev
```

Useful checks:

```bash
pnpm type-check
pnpm test
pnpm build
```

## AutoSkeletonLoader Update

`AutoSkeletonLoader` is still experimental, but its guarded inference is safer now:

- `React.memo`, `React.forwardRef`, and nested wrappers are unwrapped before introspection.
- Components are no longer permanently blacklisted after one failed introspection attempt.
- Custom hooks are detected with the React hook naming convention, so hook-heavy components safely fall back instead of being executed directly.
- Fallback preset names prefer wrapper `displayName`, which improves memo and forwardRef examples.

The showcase includes examples for plain components, memo components, forwardRef components, nested wrappers, custom hooks, class components, arbitrary unmatched names, and memoized arbitrary names.

## Package Usage

```tsx
import { SkeletonLoader, SkeletonGroupLoader } from "react-loadly";
import "react-loadly/styles.css";

export function ProfileSkeleton() {
  return (
    <SkeletonGroupLoader shimmerSync stagger={0.08}>
      <SkeletonLoader variant="circular" width={56} height={56} />
      <SkeletonLoader variant="text" width="70%" height={16} />
      <SkeletonLoader variant="text" width="45%" height={12} />
    </SkeletonGroupLoader>
  );
}
```

Use explicit skeletons for production-critical UI. Use `AutoSkeletonLoader` when you want best-effort structural inference for presentational components.

## Showcase

The showcase app deploys to GitHub Pages from `apps/showcases/dist` and keeps the `/react-loadly-showCases` base path.

```bash
pnpm build:showcases
```

## AI And Developer Workflow

Whenever a component, hook, loader, prop, or feature changes in `packages/react-loadly`, update `apps/showcases` with at least one real example demonstrating it.

When adding a loader, hook, skeleton pattern, or feature:

1. Update library exports.
2. Update `packages/react-loadly/README.md`.
3. Update showcase examples.
4. Update showcase documentation.

The showcase is the source of truth for examples. Do not create examples inside `packages/react-loadly/examples`, `packages/react-loadly/demo`, or `packages/react-loadly/playground`.
