<p align="center">
  <img
    src="https://raw.githubusercontent.com/Mostafashadow1/react-loadly/master/packages/react-loadly/public/images/react-loadly-banner.png"
    alt="React Loadly"
    width="900"
  />
</p>

<h1 align="center">React Loadly</h1>

<p align="center">
  Reliable React Loading Experience Toolkit
</p>

<p align="center">
  Modern Loaders • Skeletons • Loading Hooks • Accessibility • SSR Support
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/react-loadly" target="_blank">📦 NPM</a>
  •
  <a href="https://mostafashadow1.github.io/react-loadly/" target="_blank">🌐 Showcase</a>
  •
  <a href="https://github.com/Mostafashadow1/react-loadly/blob/master/packages/react-loadly/README.md" target="_blank">📖 Documentation</a>
  •
  <a href="https://github.com/Mostafashadow1/react-loadly/issues" target="_blank">🐛 Issues</a>
</p>

---

> Looking for installation guides, examples, loaders, skeleton patterns, and documentation?
>
> Visit the official showcase:
>
> **https://mostafashadow1.github.io/react-loadly/**

---

## About

React Loadly is a modern loading experience toolkit for React applications.

It provides:

- Production-ready loaders
- SkeletonLoader
- SkeletonGroupLoader
- Loading state hooks
- Accessibility support
- Reduced motion support
- SSR compatibility
- React 17 / 18 / 19 support
- Next.js 14 / 15 / 16 support

Designed for dashboards, SaaS products, admin panels, forms, data-heavy applications, and modern user interfaces.

---

## Quick Start

Install React Loadly:

```bash
npm install react-loadly
```

```bash
pnpm add react-loadly
```

```bash
yarn add react-loadly
```

Import the styles:

```tsx
import "react-loadly/styles.css";
```

Example:

```tsx
import { PulseLoader } from "react-loadly";
import "react-loadly/styles.css";

export default function App() {
  return <PulseLoader />;
}
```

---

## Monorepo Structure

This repository uses a pnpm monorepo architecture.

```txt
react-loadly
├── packages
│   └── react-loadly
│
└── apps
    └── showcases
```

### Packages

| Package                 | Description                                        |
| ----------------------- | -------------------------------------------------- |
| `packages/react-loadly` | Published npm package                              |
| `apps/showcases`        | Documentation, examples, and GitHub Pages showcase |

---

## Project Links

### 📦 NPM Package

https://www.npmjs.com/package/react-loadly

### 🌐 Showcase & Documentation

https://mostafashadow1.github.io/react-loadly/

### 📖 Package Source

https://github.com/Mostafashadow1/react-loadly/tree/master/packages/react-loadly

### 🐛 Report Issues

https://github.com/Mostafashadow1/react-loadly/issues

### 🤝 Pull Requests

https://github.com/Mostafashadow1/react-loadly/pulls

---

## For Contributors

React Loadly follows a simple rule:

Whenever a loader, skeleton, hook, prop, or feature changes inside:

```txt
packages/react-loadly
```

the showcase must be updated as well:

```txt
apps/showcases
```

The showcase is considered the source of truth for:

- Documentation
- Examples
- Usage patterns
- New feature demonstrations

---

## Local Development

Install dependencies:

```bash
pnpm install
```

Run showcase:

```bash
pnpm dev
```

Build everything:

```bash
pnpm build
```

Type checking:

```bash
pnpm type-check
```

Run tests:

```bash
pnpm test
```

---

## Documentation

For full documentation, component APIs, examples, skeleton patterns, hooks, and production guides, visit:

### 🌐 https://mostafashadow1.github.io/react-loadly/

Or browse the package documentation directly:

### 📖 https://github.com/Mostafashadow1/react-loadly/tree/master/packages/react-loadly

---

## License

MIT License

---

<p align="center">
  Built with ❤️ by Shadow Coding
</p>
