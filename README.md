# ⚛️ React Loadly

A professional, high-performance, and accessible collection of **React loader components**. Built with **TypeScript** and optimized for a great user and developer experience.

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

---

## 🚀 Getting Started

### Installation

Install the package using your preferred package manager.

```bash
npm install react-loadly
# or
yarn add react-loadly
# or
pnpm add react-loadly
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

| Component     | Description                                      |
| ------------- | ------------------------------------------------ |
| `SpinLoader`  | A classic spinner with a minimalist design.      |
| `PulseLoader` | A dynamic animation of pulsing dots.             |
| `WaveLoader`  | A series of bars creating a wave-like effect.    |
| `GridLoader`  | A grid of squares that animate in sequence.      |
| `RingLoader`  | A sophisticated ring spinner with dual rotation. |

---

### Organic & Text-Based Loaders

| Component      | Preview | Description                                         |
| -------------- | ------- | --------------------------------------------------- |
| `BlobLoader`   |         | A liquid-like loader with a smooth, organic feel.   |
| `TypingLoader` |         | A loader that simulates typing or processing text.  |
| `DotsLoader`   |         | The familiar three-dot animation, perfect for text. |

### Flexible Loaders

| Component       | Description                                               |
| --------------- | --------------------------------------------------------- |
| `ElementLoader` | A flexible loader that can display any React element with various animation effects. |

---

## 🧩 ElementLoader Component

The `ElementLoader` is a versatile component that can wrap any React element and apply various loading animations to it. Unlike other loaders that are pre-designed with specific visuals, the ElementLoader allows you to use your own elements (icons, divs, images, etc.) as the loading indicator.

### Basic Usage

```jsx
import { ElementLoader } from "react-loadly";

function App() {
  return (
    <ElementLoader>
      <div style={{ width: '40px', height: '40px', backgroundColor: 'blue' }} />
    </ElementLoader>
  );
}
```

### Animation Types

The ElementLoader supports multiple animation types:

```jsx
// Spin animation (default)
<ElementLoader animationType="spin">
  <YourIconComponent />
</ElementLoader>

// Pulse animation
<ElementLoader animationType="pulse">
  <YourIconComponent />
</ElementLoader>

// Glow animation
<ElementLoader animationType="glow">
  <YourIconComponent />
</ElementLoader>

// Bounce animation
<ElementLoader animationType="bounce">
  <YourIconComponent />
</ElementLoader>

// Flip animation
<ElementLoader animationType="flip">
  <YourIconComponent />
</ElementLoader>
```

### Customization Options

```jsx
<ElementLoader
  size={80}
  color="#ff6b6b"
  speed={1.5}
  glowIntensity={0.5}
  showText
  loadingText="Loading..."
>
  <YourCustomElement />
</ElementLoader>
```

### Fullscreen Mode

Like other loaders, ElementLoader supports fullscreen mode:

```jsx
<ElementLoader
  fullscreen
  loaderCenter
  screenBackground="rgba(0, 0, 0, 0.5)"
>
  <YourIconComponent />
</ElementLoader>
```

### Props

| Prop            | Type                            | Default     | Description                                         |
| --------------- | ------------------------------- | ----------- | --------------------------------------------------- |
| `children`      | ReactNode                       | undefined   | The React element to apply loading animation to     |
| `animationType` | "spin" \| "pulse" \| "glow" \| "bounce" \| "flip" | "spin"      | Type of animation to apply                          |
| `glowIntensity` | number (0-1)                    | 0.3         | Intensity of the glow effect                        |
| `size`          | number \| string                | 60          | Size of the loader                                  |
| `width`         | number \| string                | undefined   | Width of the loader (overrides size)                |
| `height`        | number \| string                | undefined   | Height of the loader (overrides size)               |
| `color`         | string                          | "var(--react-loadly-color)" | Primary color of the loader         |
| `speed`         | number                          | 1           | Animation speed multiplier                          |
| `loading`       | boolean                         | true        | Whether the loader is active                        |
| `className`     | string                          | undefined   | Custom CSS class name                               |
| `style`         | CSSProperties                   | undefined   | Custom inline styles                                |
| `aria-label`    | string                          | "Loading..."| Accessibility label for screen readers              |
| `showText`      | boolean                         | false       | Whether to show loading text                        |
| `loadingText`   | string                          | undefined   | Custom loading text                                 |
| `fullscreen`    | boolean                         | false       | Enable fullscreen mode                              |
| `screenWidth`   | number \| string                | undefined   | Screen width for fullscreen mode                    |
| `screenHeight`  | number \| string                | undefined   | Screen height for fullscreen mode                   |
| `loaderCenter`  | boolean                         | false       | Center the loader in fullscreen mode                |
| `screenBackground` | string                       | undefined   | Background color for fullscreen mode                |

---

## ♿ Accessibility

Accessibility is a core feature, not an afterthought. All loaders include:

- **ARIA attributes** (`role="status"`, `aria-label`) for screen readers.
- Support for **Reduced Motion**.
- **High contrast** and semantic HTML.

<!-- end list -->

```jsx
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

### `FallbackLoader` Component

A component to gracefully handle and display errors, timeouts, or network issues.

```jsx
import { FallbackLoader } from "react-loadly";

function ErrorBoundary({ error, retry }) {
```
