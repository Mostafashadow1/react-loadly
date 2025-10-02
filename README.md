# ⚛️ React Loadly — React Loader, Spinner & Loading Indicator Components for React

**React Loadly** is a modern, high-performance library of **React loaders, spinners, and loading indicators**.  
It’s built with **TypeScript**, optimized for **Next.js / SSR**, and designed with **accessibility** and **developer experience** in mind.

Perfect for building **React apps, dashboards, forms, and data-driven UIs** where you need smooth, customizable loading states. Includes **AutoSkeletonLoader** for automatically generating skeleton loaders based on your component structure.

🏠 **Home Page**: [https://Mostafashadow1.github.io/react-loadly-showCases/](https://Mostafashadow1.github.io/react-loadly-showCases/)

[![NPM Version](https://img.shields.io/npm/v/react-loadly.svg)](https://www.npmjs.com/package/react-loadly)  
[![Bundle Size](https://img.shields.io/bundlephobia/minzip/react-loadly.svg)](https://bundlephobia.com/result?p=react-loadly)  
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://github.com/Mostafashadow1/react-loadly/blob/main/LICENSE)

## ✨ Key Features

- **High Performance**: Uses hardware-accelerated CSS transforms and animations.
- **Accessibility First**: Full **ARIA support**, screen reader compatibility, and keyboard navigation.
- **TypeScript Ready**: Comprehensive type definitions for a seamless dev experience.
- **Highly Customizable**: Adjust appearance with CSS variables or component props.
- **Tree-Shakable**: Supports modern bundlers to only include what you use.
- **Reduced Motion**: Respects the user's `prefers-reduced-motion` settings.
- **SSR Compatible**: Works out-of-the-box with frameworks like **Next.js**.
- **Fullscreen Support**: Display loaders in fullscreen mode with customizable backgrounds.
- **AutoSkeletonLoader Support**: Automatically generates skeleton loaders based on your component structure.

---

## 🚀 Getting Started

### Installation

Install the package using your preferred package manager.

```bash
npm install react-loadly
# or
yarn add react-loadly
# or
pnpm i react-loadly
```

### Bundle Optimization

React Loadly is optimized for minimal bundle size and supports tree shaking:

- **Zero Side Effects**: Set `"sideEffects": false` in your bundler config for optimal tree shaking
- **Individual Imports**: Import only the components you need
- **Separate CSS**: Import styles separately to avoid bundling unused styles

```jsx
// ✅ Recommended: Import only what you need
import { SpinLoader } from "react-loadly";
import "react-loadly/styles.css";

// ✅ Alternative: Import from specific paths (if supported by your bundler)
import { SpinLoader } from "react-loadly/components";
import { useLoaderState } from "react-loadly/hooks";
```

### Quick Usage

Import the components you need along with the base styles, then use them in your React application.

```jsx
import { SpinLoader, PulseLoader } from "react-loadly";
import "react-loadly/styles.css"; // Essential for base styles

function App() {
  return (
    <div>
      {/* Simple spinning loader */}
      <SpinLoader />

      {/* A customized loader */}
      <PulseLoader color="#ff6b6b" size={60} />
    </div>
  );
}
```

---

## 🎨 Component Showcase

### Geometric Loaders

| Component      | Description                                      |
| -------------- | ------------------------------------------------ |
| `SpinLoader`   | A classic spinner with a minimalist design.      |
| `PulseLoader`  | A dynamic animation of pulsing dots.             |
| `WaveLoader`   | A series of bars creating a wave-like effect.    |
| `GridLoader`   | A grid of squares that animate in sequence.      |
| `RingLoader`   | A sophisticated ring spinner with dual rotation. |
| `BarsLoader`   | Animated bars with staggered timing.             |
| `BounceLoader` | Bouncing dots with elastic animation.            |
| `RotateLoader` | 3D rotating elements with depth.                 |

---

### Modern Content Loaders

| Component            | Description                                                                                    |
| -------------------- | ---------------------------------------------------------------------------------------------- |
| `SkeletonLoader`     | Modern skeleton placeholders with shimmer effects. with Sophisticated shimmer wave animations. |
| `AutoSkeletonLoader` | Automatically generates skeleton loaders based on your component structure.                    |

### Organic & Text-Based Loaders

| Component      | Description                                         |
| -------------- | --------------------------------------------------- |
| `BlobLoader`   | A liquid-like loader with a smooth, organic feel.   |
| `TypingLoader` | A loader that simulates typing or processing text.  |
| `DotsLoader`   | The familiar three-dot animation, perfect for text. |
| `LiquidLoader` | Fluid, morphing shapes with organic movement.       |
| `FlowLoader`   | Flowing particles with smooth transitions.          |

### Flexible Loaders

| Component            | Description                                                                          |
| -------------------- | ------------------------------------------------------------------------------------ | --- |
| `ElementLoader`      | A flexible loader that can display any React element with various animation effects. |
| `FallbackLoader`     | Error handling and retry functionality with customizable UI.                         |
| `LogoSpinLoader`     | Specialized loader for logos and brand elements.                                     |
| `ProgressRingLoader` | Accessible progress ring with optional determinate mode.                             |
| `MorphLoader`        | Smooth morphing SVG shapes that interpolate between paths.                           |
| `SpinDotsLoader`     | Circular orbit of dots; perfect for inline text.                                     |
| `HeatmapLoader`      | Grid of pulses with staggered timing; useful for dashboards.                         |     |

### ProgressRingLoader Component

The `ProgressRingLoader` is an accessible progress ring component that supports both determinate and indeterminate modes. In determinate mode, it shows the exact progress percentage, while in indeterminate mode, it provides a continuous spinning animation.

#### Basic Usage

```jsx
import { ProgressRingLoader } from "react-loadly";

function App() {
  return (
    <div>
      {/* Indeterminate mode (default) */}
      <ProgressRingLoader />

      {/* Determinate mode */}
      <ProgressRingLoader progress={75} />

      {/* Custom size and color */}
      <ProgressRingLoader size={60} color="#10b981" thickness={6} />
    </div>
  );
}
```

#### ProgressRingLoader Props

| Prop        | Type             | Default   | Description                                      |
| ----------- | ---------------- | --------- | ------------------------------------------------ |
| `progress`  | number \| null   | null      | Progress value (0-100) or null for indeterminate |
| `thickness` | number           | 4         | Thickness of the ring                            |
| `size`      | number \| string | 40        | Size of the loader                               |
| `color`     | string           | "#6366f1" | Color of the progress ring                       |

All other props are inherited from `IBaseLoaderProps`.

---

### MorphLoader Component

The `MorphLoader` creates smooth morphing SVG shapes that interpolate between different paths. It supports three variants: blob, soft, and sharp.

#### Basic Usage

```jsx
import { MorphLoader } from "react-loadly";

function App() {
  return (
    <div>
      {/* Default blob variant */}
      <MorphLoader />

      {/* Soft variant */}
      <MorphLoader variant="soft" />

      {/* Sharp variant */}
      <MorphLoader variant="sharp" />

      {/* Custom size and color */}
      <MorphLoader size={60} color="#10b981" />
    </div>
  );
}
```

#### MorphLoader Props

| Prop      | Type                        | Default   | Description                 |
| --------- | --------------------------- | --------- | --------------------------- |
| `variant` | "blob" \| "soft" \| "sharp" | "blob"    | Morph variant type          |
| `speed`   | number                      | 1         | Animation speed multiplier  |
| `size`    | number \| string            | 40        | Size of the loader          |
| `color`   | string                      | "#6366f1" | Color of the morphing shape |

All other props are inherited from `IBaseLoaderProps`.

---

### SpinDotsLoader Component

The `SpinDotsLoader` creates a circular orbit of dots, perfect for inline text loading indicators.

#### Basic Usage

```jsx
import { SpinDotsLoader } from "react-loadly";

function App() {
  return (
    <div>
      {/* Default 3 dots */}
      <SpinDotsLoader />

      {/* Custom number of dots */}
      <SpinDotsLoader dots={5} />

      {/* Custom size and color */}
      <SpinDotsLoader size={50} color="#10b981" />
    </div>
  );
}
```

#### SpinDotsLoader Props

| Prop    | Type             | Default   | Description                |
| ------- | ---------------- | --------- | -------------------------- |
| `dots`  | number           | 3         | Number of dots in orbit    |
| `gap`   | number           | 8         | Gap between dots           |
| `size`  | number \| string | 40        | Size of the loader         |
| `color` | string           | "#6366f1" | Color of the dots          |
| `speed` | number           | 1         | Animation speed multiplier |

All other props are inherited from `IBaseLoaderProps`.

---

### HeatmapLoader Component

The `HeatmapLoader` displays a grid of pulses with staggered timing, useful for dashboard data placeholders.

#### Basic Usage

```jsx
import { HeatmapLoader } from "react-loadly";

function App() {
  return (
    <div>
      {/* Default 3x5 grid */}
      <HeatmapLoader />

      {/* Custom grid size */}
      <HeatmapLoader rows={4} cols={6} />

      {/* Custom size and color */}
      <HeatmapLoader size={60} color="#10b981" />
    </div>
  );
}
```

#### HeatmapLoader Props

| Prop    | Type             | Default   | Description                |
| ------- | ---------------- | --------- | -------------------------- |
| `rows`  | number           | 3         | Number of rows in grid     |
| `cols`  | number           | 5         | Number of columns in grid  |
| `size`  | number \| string | 40        | Size of the loader         |
| `color` | string           | "#6366f1" | Color of the cells         |
| `speed` | number           | 1         | Animation speed multiplier |

All other props are inherited from `IBaseLoaderProps`.

---

### ClockLoader Component

The `ClockLoader` animates like a traditional clock with hour, minute, and second hands.

#### Basic Usage

```jsx
import { ClockLoader } from "react-loadly";

function App() {
  return (
    <div>
      {/* Default clock */}
      <ClockLoader />

      {/* Custom size */}
      <ClockLoader size={60} />

      {/* Custom tick speed */}
      <ClockLoader tickSpeed={2} />
    </div>
  );
}
```

#### ClockLoader Props

| Prop        | Type             | Default   | Description              |
| ----------- | ---------------- | --------- | ------------------------ |
| `size`      | number \| string | 40        | Size of the clock        |
| `tickSpeed` | number           | 1         | Speed of clock animation |
| `color`     | string           | "#6366f1" | Color of the clock hands |

All other props are inherited from `IBaseLoaderProps`.

---

### NeumorphicLoader Component

The `NeumorphicLoader` creates a soft neumorphic pill/dots loader for modern UI designs.

#### Basic Usage

```jsx
import { NeumorphicLoader } from "react-loadly";

function App() {
  return (
    <div>
      {/* Default elevation */}
      <NeumorphicLoader />

      {/* Custom elevation */}
      <NeumorphicLoader elevation={8} />

      {/* Custom size and color */}
      <NeumorphicLoader size={50} color="#10b981" />
    </div>
  );
}
```

#### NeumorphicLoader Props

| Prop        | Type             | Default   | Description                |
| ----------- | ---------------- | --------- | -------------------------- |
| `elevation` | number           | 5         | Elevation level (1-10)     |
| `size`      | number \| string | 40        | Size of the loader         |
| `color`     | string           | "#6366f1" | Color of the loader        |
| `speed`     | number           | 1         | Animation speed multiplier |

All other props are inherited from `IBaseLoaderProps`.

---

## 🦴 SkeletonLoader Component

The `SkeletonLoader` is perfect for modern loading states, creating placeholder content that mimics the actual content structure.

### Basic Usage

```jsx
import { SkeletonLoader } from "react-loadly";

function App() {
  return (
    <div>
      {/* Basic skeleton line */}
      <SkeletonLoader />

      {/* Multiple skeleton lines */}
      <SkeletonLoader lines={3} />

      {/* Card skeleton */}
      <SkeletonLoader variant="card" width={300} height={200} />

      {/* Avatar skeleton */}
      <SkeletonLoader variant="avatar" size={60} />
    </div>
  );
}
```

### Skeleton Variants

The SkeletonLoader supports multiple variants to match different content types:

```jsx
// Line skeleton (default) - for text content
<SkeletonLoader variant="line" lines={3} />

// Card skeleton - for image cards or content blocks
<SkeletonLoader variant="card" width={300} height={200} />

// Avatar skeleton - for profile images
<SkeletonLoader variant="avatar" size={60} />

// Text skeleton - for single line text
<SkeletonLoader variant="text" width="100%" height={16} />

// Custom skeleton - for any custom shape
<SkeletonLoader
  variant="custom"
  width={200}
  height={100}
  borderRadius="8px"
/>
```

### Variant Details

| Variant  | Use Case                           | Default Dimensions          | Default Border Radius |
| -------- | ---------------------------------- | --------------------------- | --------------------- |
| `line`   | Paragraphs, lists, general content | width: 100%, height: 16px   | 4px                   |
| `card`   | Images, cards, content blocks      | width: 300px, height: 200px | 8px                   |
| `avatar` | Profile pictures, user icons       | width: 40px, height: 40px   | 50% (circular)        |
| `text`   | Single line text elements          | width: 100%, height: 16px   | 4px                   |
| `custom` | Any custom shape or element        | width: 100%, height: 16px   | 4px (customizable)    |

### Customization Options

```jsx
<SkeletonLoader
  lines={3}
  color="#f0f0f0"
  highlightColor="#e0e0e0"
  shimmerColor="rgba(255, 255, 255, 0.6)"
  spacing="12px"
  shimmer={true}
  waveWidth="200px"
  waveDirection="left-to-right"
  speed={1.5}
/>
```

### SkeletonLoader Props

| Prop             | Type                                                                     | Default                 | Description                         |
| ---------------- | ------------------------------------------------------------------------ | ----------------------- | ----------------------------------- |
| `lines`          | number                                                                   | 1                       | Number of skeleton lines to display |
| `variant`        | "line" \| "card" \| "avatar" \| "text" \| "custom"                       | "line"                  | Variant of skeleton to display      |
| `width`          | number \| string                                                         | varies by variant       | Width of skeleton elements          |
| `height`         | number \| string                                                         | varies by variant       | Height of skeleton elements         |
| `borderRadius`   | number \| string                                                         | varies by variant       | Border radius of skeleton elements  |
| `spacing`        | number \| string                                                         | "8px"                   | Spacing between skeleton lines      |
| `shimmer`        | boolean                                                                  | true                    | Whether to show shimmer animation   |
| `shimmerColor`   | string                                                                   | "rgba(255,255,255,0.6)" | Shimmer effect color                |
| `highlightColor` | string                                                                   | "#f1f5f9"               | Highlight color for shimmer effect  |
| `waveWidth`      | number \| string                                                         | "200px"                 | Shimmer wave width                  |
| `waveDirection`  | "left-to-right" \| "right-to-left" \| "top-to-bottom" \| "bottom-to-top" | "left-to-right"         | Direction of shimmer animation      |

---

## 🤖 AutoSkeletonLoader Component

The `AutoSkeletonLoader` is an advanced component that automatically generates skeleton loaders based on the structure of your actual components. It analyzes your component's JSX tree and creates matching skeleton placeholders.

### Key Features

- **Automatic Generation**: Scans the JSX tree of your component and replaces each element with a matching skeleton placeholder
- **Smart Dimension Estimation**: Automatically estimates skeleton dimensions based on element types and content
- **Style Inheritance**: Optionally inherits inline styles and props directly from the original element
- **Customizable Class Names**: Override styles per element type for fine-grained control
- **Variant Support**: Automatically selects appropriate skeleton variants (rect, circle, text) based on element type
- **Consistent Animations**: Shimmer effect support that's consistent with SkeletonLoader
- **Smooth Transitions**: Built-in fade-in/out animations between skeleton and real component
- **Accessibility**: Full ARIA support and screen reader compatibility
- **Performance Optimized**: Uses React.memo and useMemo for optimal re-rendering

### Basic Usage

```jsx
import { AutoSkeletonLoader } from "react-loadly";

function UserProfile({ user, loading }) {
  return <AutoSkeletonLoader loading={loading} component={<UserProfileCard user={user} />} />;
}

function UserProfileCard({ user }) {
  return (
    <div>
      <img src={user.avatar} alt={user.name} width="100" height="100" />
      <h3>{user.name}</h3>
      <p>{user.bio}</p>
      <button>Follow</button>
    </div>
  );
}
```

### Advanced Usage Examples

#### Style Inheritance

```jsx
// Inherits styles from original elements for more accurate skeletons
<AutoSkeletonLoader loading={loading} component={<UserProfileCard user={user} />} inheritStyles={true} />
```

#### Custom Class Names

```jsx
// Customize skeleton appearance per element type
<AutoSkeleton
  loading={loading}
  component={<Card data={data} />}
  styless={{
    p: { height: "0.8em", width: "80%" },
    h3: { height: "1.2em", width: "60%", borderRadius: "8px" },
    img: { borderRadius: "12px" },
    button: { width: "150px", height: "50px" },
  }}
/>
```

#### With Shimmer Effects

```jsx
// Enable shimmer animations for a more polished look
<AutoSkeleton
  loading={loading}
  component={<ProductCard product={product} />}
  shimmer={true}
  shimmerColor="rgba(255, 255, 255, 0.8)"
  highlightColor="#f8fafc"
/>
```

#### Complex Component Example

```jsx
function DashboardCard({ title, metrics, loading }) {
  return (
    <AutoSkeletonLoader
      loading={loading}
      component={
        <div className="dashboard-card">
          <h2>{title}</h2>
          <div className="metrics">
            {metrics.map((metric, index) => (
              <div key={index} className="metric">
                <span className="value">{metric.value}</span>
                <span className="label">{metric.label}</span>
              </div>
            ))}
          </div>
        </div>
      }
      inheritStyles={true}
      shimmer={true}
    />
  );
}
```

### AutoSkeleton Props

| Prop             | Type                                                                     | Default                 | Description                                      |
| ---------------- | ------------------------------------------------------------------------ | ----------------------- | ------------------------------------------------ |
| `component`      | ReactElement                                                             | -                       | The component to render or analyze for skeletons |
| `inheritStyles`  | boolean                                                                  | false                   | Whether to inherit styles from original elements |
| `styless`        | object                                                                   | {}                      | Custom styles for different element types        |
| `shimmer`        | boolean                                                                  | true                    | Whether to show shimmer animation                |
| `shimmerColor`   | string                                                                   | "rgba(255,255,255,0.6)" | Shimmer effect color                             |
| `highlightColor` | string                                                                   | "#f1f5f9"               | Highlight color for shimmer effect               |
| `waveWidth`      | number \| string                                                         | "200px"                 | Shimmer wave width                               |
| `waveDirection`  | "left-to-right" \| "right-to-left" \| "top-to-bottom" \| "bottom-to-top" | "left-to-right"         | Direction of shimmer animation                   |

All other props are inherited from `IBaseLoaderProps`.

---

## ⚡ Performance & Best Practices

### Performance Optimization

React Loadly is built with performance in mind:

- **Hardware Acceleration**: All animations use CSS transforms and `will-change` for optimal performance
- **Reduced Motion Support**: Automatically respects user's motion preferences
- **Tree Shaking**: Import only the components you need
- **Memoization**: Components use React.memo and useMemo for optimal re-rendering
- **CSS-in-JS**: Minimal runtime overhead with CSS variables

### Best Practices

```jsx
// ✅ Good: Import only what you need
import { SpinLoader, SkeletonLoader } from "react-loadly";

// ❌ Avoid: Importing everything
import \* as Loaders from "react-loadly";

// ✅ Good: Use appropriate loader for context
function UserProfile({ user, loading }) {
  if (loading) {
    return (
      <div>
        <SkeletonLoader variant="avatar" size={60} />
        <SkeletonLoader lines={2} />
      </div>
    );
  }
  return <div>{/_ User content _/}</div>;
}

// ✅ Good: Conditional rendering
function DataComponent({ data, loading }) {
  return <div>{loading ? <SpinLoader /> : <div>{data}</div>}</div>;
}

// ✅ Good: Use fullscreen for page-level loading
function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div>
      {isLoading && <SpinLoader fullscreen loaderCenter screenBackground="rgba(255, 255, 255, 0.9)" />}
      {/_ App content _/}
    </div>
  );
}

```

### Bundle Size Optimization

``jsx
// ✅ Tree-shakable imports
import { SpinLoader } from "react-loadly";

// ✅ CSS imports (only import what you need)
import "react-loadly/styles.css";

// ✅ For Next.js, use dynamic imports for code splitting
import dynamic from "next/dynamic";

const SkeletonLoader = dynamic(() => import("react-loadly").then((mod) => ({ default: mod.SkeletonLoader })));

```

---

## ♿ Accessibility

Accessibility is a core feature, not an afterthought. All loaders include:

- **ARIA attributes** (`role="status"`, `aria-label`) for screen readers.
- Support for **Reduced Motion**.
- **High contrast** and semantic HTML.

<!-- end list -->

``jsx
// Accessible by default
<SpinLoader aria-label="Loading content" />

// Custom accessible text
<PulseLoader showText loadingText="Processing your request..." />
```

---

## 🛠️ Customization

### CSS Variables

Customize the entire loader library globally with CSS variables.

```css
:root {
  --loader-color: #3b82f6;
  --loader-size: 40px;
  --loader-speed: 1s;
  --loader-text-color: #6b7280;
}
```

### Component Props

Each loader component accepts a common set of props for fine-grained control.

```typescript
interface BaseLoaderProps {
  size?: number | string;
  color?: string;
  speed?: number;
  loading?: boolean;
  className?: string;
  style?: React.CSSProperties;
  showText?: boolean;
  loadingText?: string;
  // Fullscreen props
  fullscreen?: boolean;
  screenWidth?: number | string;
  screenHeight?: number | string;
  loaderCenter?: boolean;
  screenBackground?: string;
}
```

### TypeScript Integration

React Loadly provides comprehensive TypeScript definitions for all components and hooks. You can import types and interfaces directly from the library:

``tsx
// ✅ Correct way to import shared interfaces
import type { IBaseLoaderProps, ISkeletonLoaderProps } from "react-loadly";

// For component-specific props
import type { CircleProps } from "react-loadly/components";

// For hook return types
import type { IUseLoaderStateReturn } from "react-loadly/hooks";

// For animation types
import type { AnimationDirectionType } from "react-loadly";

````

All types are properly exported and can be used in your TypeScript projects for better type safety and autocompletion.

Avoid importing directly from internal paths like `react-loadly/types` or `react-loadly/interfaces` as these are not part of the public API and may change.

### Fullscreen Mode

Display any loader in fullscreen mode with customizable dimensions and background:

```jsx
// Fullscreen loader covering entire viewport
<SpinLoader
  fullscreen={true}
  loaderCenter={true}
  screenBackground="#f0f0f0"
/>

// Fullscreen loader with custom dimensions
<PulseLoader
  fullscreen={true}
  screenWidth={800}
  screenHeight={600}
  loaderCenter={true}
  screenBackground="rgba(0, 0, 0, 0.5)"
/>
```

---

## 🎯 Real-World Examples

### Loading States for Different Content Types

``jsx
import { SkeletonLoader, SpinLoader, PulseLoader } from "react-loadly";

function ContentLoader() {
  return (

<div>
{/_ Blog post loading Dashboard loading _/}
<div className="blog-post">
<SkeletonLoader variant="avatar" size={40} />
<SkeletonLoader lines={3} spacing="8px" />
<SkeletonLoader variant="card" width="100%" height={200} />
</div>

      {/* Button loading */}
      <button disabled>
        <SpinLoader size={16} />
        Processing...
      </button>

      {/* Inline loading */}
      <div>
        Loading data <PulseLoader size={12} />
      </div>
    </div>

  );
}

```

### Form Loading States

``jsx
function FormWithLoading() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Name" />
      <input type="email" placeholder="Email" />

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            <SpinLoader size={16} />
            Submitting...
          </>
        ) : (
          "Submit"
        )}
      </button>
    </form>
  );
}
```

### Data Table Loading

``jsx
function DataTable({ data, loading }) {
  if (loading) {
    return (

<div className="data-table">
{/_ Header skeleton _/}
<div className="table-header">
{Array.from({ length: 5 }).map((\_, i) => (
<SkeletonLoader key={i} width={120} height={20} />
))}
</div>

        {/* Row skeletons */}
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={i} className="table-row">
            {Array.from({ length: 5 }).map((_, j) => (
              <SkeletonLoader key={j} width={100} height={16} />
            ))}
          </div>
        ))}
      </div>
    );

  }

  return <div className="data-table">{/_ Actual table content _/}</div>;
}

```

### Image Gallery Loading

``jsx
function ImageGallery({ images, loading }) {
  if (loading) {
    return (
      <div className="image-gallery">
        {Array.from({ length: 6 }).map((_, i) => (
          <SkeletonLoader
            key={i}
            variant="card"
            width={200}
            height={200}
            borderRadius="8px"
            shimmer
            shimmerColor="#f0f0f0"
            waveDirection="left-to-right"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="image-gallery">
      {images.map((image, i) => (
        <img key={i} src={image.url} alt={image.alt} />
      ))}
    </div>
  );
}
```

---

## 🧩 Advanced Usage

### `useLoaderState` Hook

Manage loading, error, and retry states for your data fetching with this convenient hook.

```jsx
import { useLoaderState, SpinLoader } from "react-loadly";

function DataComponent() {
  const { state, setLoading, setError, retry } = useLoaderState({
    timeout: 10000,
    maxRetries: 3,
  });

  const loadData = async () => {
    setLoading(true);
    try {
      await fetch("/api/data");
      setLoading(false);
    } catch (error) {
      setError(error.message);
    }
  };

  if (state.error) {
    return (
      <div>
        Error: {state.error}
        <button onClick={retry}>Retry</button>
      </div>
    );
  }

  return (
    <div>
      <SpinLoader loading={state.isLoading} />
      <button onClick={loadData} disabled={state.isLoading}>
        Load Data
      </button>
    </div>
  );
}
```

---

## 🤝 Contributing

We welcome contributions from the community! Whether you're fixing bugs, adding new features, or improving documentation, your contributions help make React Loadly better for everyone.

### How to Contribute

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/your-username/react-loadly.git
   cd react-loadly
   ```
3. **Create a new branch** for your changes:
   ```bash
   git checkout -b feature/your-feature-name
   ```
4. **Install dependencies**:
   ```bash
   pnpm install
   ```
5. **Make your changes** and ensure tests pass:
   ```bash
   pnpm test
   pnpm build
   ```
6. **Commit your changes**:
   ```bash
   git commit -m "feat: add your awesome feature"
   ```
7. **Push to your fork**:
   ```bash
   git push origin feature/your-feature-name
   ```
8. **Open a Pull Request** with a clear description of your changes

### What You Can Contribute

- 🐛 **Bug fixes** - Help us squash bugs
- ✨ **New loader components** - Add new loading animations
- 📚 **Documentation** - Improve examples and guides
- 🎨 **Design improvements** - Enhance existing components
- 🧪 **Tests** - Add test coverage
- 🌐 **Internationalization** - Help with translations
- 📦 **Build improvements** - Optimize bundle size and build process

### Development Guidelines

- Follow the existing code style and patterns
- Add tests for new features
- Update documentation for API changes
- Ensure accessibility standards are met
- Keep bundle size impact minimal

### Need Help?

- 💬 **Join our discussions** in GitHub Discussions
- 🐛 **Report bugs** in GitHub Issues
- 💡 **Suggest features** in GitHub Issues
- 📖 **Read our contributing guide** for detailed information

---

## 👥 Contributors

Thank you to all the amazing people who have contributed to React Loadly:

<!-- Contributors will be automatically updated by GitHub Actions -->
<!--
<a href="https://github.com/Mostafashadow1/react-loadly/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=Mostafashadow1/react-loadly" />
</a>
-->

### Hall of Fame

- **[@Mostafashadow1](https://github.com/Mostafashadow1)** - Creator and maintainer
- _Your name could be here!_ - [Contribute today](#-contributing)

### Recognition

We recognize contributors in several ways:

- 🏆 **Contributor badges** in pull requests
- 📝 **Contributor recognition** in release notes
- 🌟 **Hall of fame** in this README
- 🎉 **Special thanks** in our changelog

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- Thanks to the React community for inspiration and feedback
- Special thanks to all contributors who help make this project better
- Built with ❤️ for developers who value great UX

---

**Made with ❤️ by the React Loadly community**
````
