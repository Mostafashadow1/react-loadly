# React Loadly

Reliable React Loading Experience Toolkit.

This repository is a pnpm monorepo for the `react-loadly` npm package and its private showcase app.

## Structure

```txt
packages/react-loadly   # npm package, published as react-loadly
apps/showcases          # private Vite showcase app for GitHub Pages
```

## Development

```bash
pnpm install
pnpm dev
```

## Builds

```bash
pnpm build:lib
pnpm build:showcases
```

The showcase app deploys to GitHub Pages from `apps/showcases/dist` and keeps the existing `/react-loadly-showCases` base path.

## AI And Developer Workflow

Whenever a component, hook, loader, prop, or feature is added or changed in `packages/react-loadly`, the AI/developer must also update `apps/showcases` with at least one real example demonstrating it.

Whenever a new loader, hook, skeleton pattern, or feature is added:

1. Update library exports.
2. Update `packages/react-loadly/README.md`.
3. Update showcase examples.
4. Update showcase documentation.

The showcase is the source of truth for examples. Do not create examples inside `packages/react-loadly/examples`, `packages/react-loadly/demo`, or `packages/react-loadly/playground`.
