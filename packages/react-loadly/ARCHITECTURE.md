# React Loadly Architecture v3.0.1

## Project Structure

```
react-loadly/
├── scripts/
│   └── generate-css-string.js  # Build-time CSS parser and ESM string generator
├── src/
│   ├── @types/                 # TypeScript type definitions
│   │   ├── interfaces/         # Interface definitions (IAutoSkeletonProps, etc.)
│   │   ├── types/              # Type definitions
│   │   └── index.ts
│   ├── components/
│   │   ├── atoms/              # Basic building blocks (Circle, Dot, Line, Rectangle)
│   │   │   └── LoadlyProvider.tsx  # Global configuration and CSS auto-injection provider
│   │   ├── molecules/          # Combinations of atoms (DotCluster, LineGroup)
│   │   ├── organisms/          # Complete loader components (30+ variations)
│   │   │   ├── AutoSkeletonLoader.tsx  # The flagship VDOM traversal engine with WeakMap cache
│   │   │   ├── OrbitLoader.tsx
│   │   │   ├── PlaneLoader.tsx
│   │   │   ├── RippleLoader.tsx
│   │   │   ├── SkeletonGroup.tsx   # Coordinating multi-skeleton shimmer syncing & stagger
│   │   │   ├── SkeletonLoader.tsx  # Manual skeleton component
│   │   │   └── ... (and 25+ more)
│   │   └── index.ts
│   ├── hooks/                  # Custom React hooks (useLoaderState, useSkeletonState, etc.)
│   │   ├── index.ts            # Hooks subpath entrypoint
│   │   ├── useAsyncLoader.ts
│   │   ├── useFullscreen.ts    # Centralized hooks-safe fullscreen styling utility
│   │   ├── useLoaderState.ts
│   │   ├── useMultipleLoaderStates.ts
│   │   └── useSkeletonState.ts  # Orchestrator hook with minDisplayTime stabilizer
│   ├── loaders/
│   │   └── index.ts            # Loaders subpath entrypoint
│   ├── skeleton/
│   │   └── index.ts            # Skeleton subpath entrypoint
│   ├── styles/                 # Base CSS and GPU-accelerated animations
│   │   ├── base.css            # Base stylesheet with targeted will-change & containment
│   │   └── cssString.ts        # Automatically generated ESM CSS string
│   ├── utils/                  # Utility functions (classNameGen, mergeProps)
│   ├── __tests__/              # Comprehensive test suite
│   └── index.ts                # Main package export entry point
├── dist/                       # Optimized build artifacts (ESM, CJS, subpaths)
└── package.json
```

## Design Principles

### 1. Atomic UI Composition

We follow a strict hierarchy where **Organisms** are built using **Molecules** and **Atoms**. This ensures that even complex loaders like `AutoSkeletonLoader` maintain consistent styling and animation logic by reusing atomic blocks.

### 2. Zero-Configuration Philosophy

The library is designed to work out-of-the-box. The `LoadlyProvider` handles dynamic runtime CSS auto-injection, eliminating import friction for developers. The `AutoSkeletonLoader` generates complex loading states dynamically without requiring manual design.

### 3. Hooks-Resilient Rendering

The core engine complies strictly with React's Rules of Hooks. Hooks such as `useFullscreen` are evaluated before any conditional early returns. Hooks like `useMultipleLoaderStates` enforce input key stability, throwing errors during development if key lists change size dynamically.

---

## 🦾 Advanced Engine: AutoSkeletonLoader (v3.0.1)

The `AutoSkeletonLoader` is a sophisticated **VDOM Traversal Engine** that mirrors your actual UI structure at runtime.

### 1. Three-Tier Static Shape Strategy

To adhere to the **Rules of Hooks** without executing functional components at runtime, `AutoSkeletonLoader` uses a tree-traversal matching strategy:

- **Tier 1: Static Children Walk** — If a component has `props.children` passed directly in JSX, the engine recursively walks them.
- **Tier 2: Registered Shape Hints** — If a component has a static `.skeletonShape` property defined, the engine uses this shape descriptor (width, height, borderRadius, margin) directly.
- **Tier 3: Name Heuristics Fallback** — Uses naming clues (e.g. contains "Button", "Badge", "Avatar", "Photo", "Card") and tag mappings to estimate dimensions.

### 2. WeakMap Descriptor Caching

To eliminate repeated analysis overhead for large lists (e.g., `<UserCard />[]`), `AutoSkeletonLoader` implements a module-level `WeakMap` cache. Component types map to their resolved shape descriptors on the first pass, bypassing name heuristics and shape calculations on subsequent renders.

### 3. Stable Key Algorithm (Animation Continuity)

To prevent the "flickering" effect common in skeleton loaders, the engine implements a **Stable Keying Algorithm**. Keys are generated based on the element's position and type index within the traversal, ensuring that the CSS shimmer animation remains continuous even if the component re-renders.

---

## Component Architecture

### Global State & Context: LoadlyProvider

`LoadlyProvider` manages library configuration dynamically using React Context:

- **CSS Auto-injection**: Injects the global styles string into the document head automatically if `injectStyles` is true.
- **Theme Support**: Seamless `"light"` | `"dark"` modes with automatic theme-based color adjustments.
- **Heuristics Overrides**: Allows customizing default color mappings, custom centering helpers, and base colors globally.

### Multi-Skeleton Coordination: SkeletonGroup

`SkeletonGroup` coordinates multiple skeleton child components:

- **Phase Synchronization**: Leverages CSS custom variables (`--react-loadly-index` and `--react-loadly-stagger`) to coordinate stagger timelines, ensuring a synchronized and phase-locked shimmer animation.

### Layout Utility: useFullscreen

The `useFullscreen` custom hook centralizes fullscreen sizing, positioning, background styling, and alignment. It replaces duplicate logic across all loader components in a hooks-compliant manner.

---

## Performance & Optimization

### CSS Containment

To optimize rendering performance during active shimmer animations, base skeleton classes (`.react-loadly-skeleton`, `.react-loadly-auto-skeleton`, and `.react-loadly-skeleton-group`) utilize:

```css
contain: layout style paint;
```

This restricts the scope of layout and style recalculations to the skeleton element boundaries, improving frame rates on pages with complex layouts.

### GPU Acceleration

All components use targeted CSS `will-change` hints on elements that undergo active animations. CSS animations employ hardware-accelerated transforms (`transform: translateX()`, `rotate()`) rather than layout-triggering properties (`left`, `width`, `background-position`).

### Tree-Shakeable Subpath Exports

React Loadly v3.0.1 ships with dedicated subpath exports built via Rollup to support tree-shaking:

- `react-loadly/hooks`: Re-exports custom hooks (`useLoaderState`, `useSkeletonState`, `useAsyncLoader`, etc.).
- `react-loadly/skeleton`: Re-exports skeleton-specific loaders (`SkeletonLoader`, `AutoSkeletonLoader`, `SkeletonGroup`).
- `react-loadly/loaders`: Re-exports the 27 standard design loaders.
