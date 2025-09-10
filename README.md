# ⚛️ React Loadly

A professional, high-performance, and accessible collection of **React loader components**. Built with **TypeScript** and optimized for a great user and developer experience.

[](https://www.npmjs.com/package/react-loadly)
[](https://www.npmjs.com/package/react-loadly)
[](https://bundlephobia.com/result?p=react-loadly)
[](https://github.com/react-loaders/react-loaders/blob/main/LICENSE)

---

## ✨ Key Features

- **High Performance**: Uses hardware-accelerated CSS transforms and animations.
- **Accessibility First**: Full **ARIA support**, screen reader compatibility, and keyboard navigation.
- **TypeScript Ready**: Comprehensive type definitions for a seamless dev experience.
- **Highly Customizable**: Adjust appearance with CSS variables or component props.
- **Tree-Shakable**: Supports modern bundlers to only include what you use.
- **Reduced Motion**: Respects the user's `prefers-reduced-motion` settings.
- **SSR Compatible**: Works out-of-the-box with frameworks like **Next.js**.

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

### `FallbackLoader` Component

A component to gracefully handle and display errors, timeouts, or network issues.

```jsx
import { FallbackLoader } from "react-loadly";

function ErrorBoundary({ error, retry }) {
  return (
    <FallbackLoader
      error={error.message}
      onRetry={retry}
      type="error" // 'error' | 'network' | 'timeout'
    />
  );
}
```

---

## 🤝 Contributing

Contributions are welcome\! Please see our [CONTRIBUTING.md](https://www.google.com/search?q=CONTRIBUTING.md) guide for details.

1.  Fork the repository.
2.  Create your feature branch (`git checkout -b feature/my-new-feature`).
3.  Commit your changes (`git commit -m 'feat: add a new loader component'`).
4.  Push to the branch (`git push origin feature/my-new-feature`).
5.  Open a pull request.

---

## 📄 License

This project is licensed under the **MIT License**.

\<p align="center"\>Made with ❤️ by the React community.\</p\>
