# React Loadly Architecture v2.4.0

## Project Structure

```
react-loadly/
├── src/
│   ├── @types/                 # TypeScript type definitions
│   │   ├── interfaces/         # Interface definitions (IAutoSkeletonProps, etc.)
│   │   ├── types/              # Type definitions
│   │   └── index.ts
│   ├── components/
│   │   ├── atoms/              # Basic building blocks (Circle, Dot, Line, Rectangle)
│   │   ├── molecules/          # Combinations of atoms (DotCluster, LineGroup)
│   │   ├── organisms/          # Complete loader components (30+ variations)
│   │   │   ├── AutoSkeletonLoader.tsx  # The flagship VDOM traversal engine
│   │   │   ├── OrbitLoader.tsx
│   │   │   ├── PlaneLoader.tsx
│   │   │   ├── RippleLoader.tsx
│   │   │   ├── SkeletonLoader.tsx      # Manual skeleton component
│   │   │   └── ... (and 25+ more)
│   │   └── index.ts
│   ├── hooks/                  # Custom React hooks (useLoaderState, etc.)
│   ├── styles/                 # Base CSS and GPU-accelerated animations
│   ├── utils/                  # Utility functions (classNameGen, mergeProps)
│   ├── __tests__/              # Comprehensive test suite
│   └── index.ts                # Main export entry point
├── dist/                       # Optimized build artifacts (ESM, CJS, UMD)
└── package.json
```

## Design Principles

### 1. Atomic UI Composition
We follow a strict hierarchy where **Organisms** are built using **Molecules** and **Atoms**. This ensures that even complex loaders like `AutoSkeletonLoader` maintain consistent styling and animation logic by reusing atomic blocks.

### 2. Zero-Configuration Philosophy
The library is designed to work out-of-the-box. The `AutoSkeletonLoader` exemplifies this by requiring only a `component` prop to generate complex loading states without any manual design work.

### 3. Hooks-Resilient Rendering
The core engine is built to handle the complexities of modern React. It supports components wrapped in `React.memo` or `forwardRef` and gracefully handles hooks usage during the skeleton analysis phase.

---

## 🦾 Advanced Engine: AutoSkeletonLoader (v2.4.0)

The `AutoSkeletonLoader` is not a simple placeholder; it is a sophisticated **VDOM Traversal Engine** that mirrors your actual UI structure at runtime.

### 1. Dynamic Runtime VDOM Traversal
Unlike static skeleton libraries, `AutoSkeletonLoader` recursively scans the JSX tree of the provided component. It distinguishes between:
- **Container Tags**: (`div`, `section`, `ul`) which are mirrored to maintain layout structure.
- **Content Tags**: (`h1`, `p`, `img`, `button`) which are converted into animated skeleton blocks.
- **React Components**: Analyzed via static extraction of `children` and identity recognition.

### 2. Zero-Execution "Static Extraction"
To strictly follow the **Rules of Hooks**, the engine explicitly avoids executing functional components. Instead, it uses a **Static Extraction Strategy**:
- **Children Discovery**: If a component has `props.children` passed in JSX, they are traversed directly.
- **Identity Recognition**: Uses `displayName` or `name` (unwrapped from `memo`/`forwardRef`) to identify common atoms.
- **Pulse of Heuristics**: If a component is a "Black Box" (defines its UI internally), the engine uses smart fallback dimensions based on its type and naming.

### 3. Heuristic Dimension Estimation
When a component's exact dimensions aren't available during the loading phase, the engine uses a heuristic scoring system:
- **Component Naming**: Components containing "Button", "Badge", or "Avatar" receive tailored atom dimensions.
- **Molecule Fallback**: Complex "Black Box" components default to a generic molecule placeholder (typically 100% width, 150px height).
- **Text Analysis**: For static text children, it estimates width based on string length.
- **Tag Mapping**: Default dimensions are assigned to standard HTML tags.

### 4. Stable Key Algorithm (Animation Continuity)
To prevent the "flickering" effect common in skeleton loaders, the engine implements a **Stable Keying Algorithm**. Keys are generated based on the element's position and type index within the traversal, ensuring that the CSS shimmer animation remains continuous even if the component re-renders.

---

## Component Architecture

### Base Props Pattern
All components extend `IBaseLoaderProps` via `mergeProps` utility, ensuring consistent defaults for speed, color, and accessibility across the entire suite.

### Animation System
- **GPU Acceleration**: Uses `transform: translateX()` for shimmer effects instead of `background-position` to avoid layout repaints.
- **Sync Shimmer**: Shimmer gradients use a global timing function so that multiple loaders on a page always animate in perfect synchronization.

### Smart Memoization
The VDOM traversal is an intensive operation. `AutoSkeletonLoader` uses `useMemo` with a deep-dependency array (including `component.type` and `styless`) to ensure the analysis only happens when the UI structure actually changes.

## Performance Characteristics

### Runtime Performance
- **Traverse Speed**: < 2ms for average component trees.
- **FPS**: Consistent 60fps using CSS hardware acceleration.
- **Memory**: Minimal footprint; skeleton blocks are lightweight `div` elements with shared keyframes.

## Extensibility

### Custom Dimension Overrides
Developers can provide a `styless` mapping to override the engine's heuristics:
```typescript
<AutoSkeletonLoader 
  styless={{ 
    h1: { width: "40%", height: "2em" },
    ".custom-card": { borderRadius: "20px" } 
  }} 
/>
```

This architecture ensures that `react-loadly` remains the most technologically advanced loading solution for React, balancing ease-of-use with extreme technical depth.
