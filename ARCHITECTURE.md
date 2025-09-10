# React Loader Kit Architecture

## Project Structure

```
react-loadly/
├── src/
│   ├── @types/                 # TypeScript type definitions
│   │   ├── interfaces/         # Interface definitions
│   │   ├── types/              # Type definitions
│   │   └── index.ts
│   ├── components/
│   │   ├── atoms/              # Basic building blocks
│   │   │   ├── Circle.tsx
│   │   │   ├── Dot.tsx
│   │   │   ├── Line.tsx
│   │   │   ├── Rectangle.tsx
│   │   │   └── index.ts
│   │   ├── molecules/          # Combinations of atoms
│   │   │   ├── DotCluster.tsx
│   │   │   ├── LineGroup.tsx
│   │   │   ├── ShapeGroup.tsx
│   │   │   └── index.ts
│   │   ├── organisms/          # Complete loader components
│   │   │   ├── BarsLoader.tsx
│   │   │   ├── BlobLoader.tsx
│   │   │   ├── BounceLoader.tsx
│   │   │   ├── DotsLoader.tsx
│   │   │   ├── FallbackLoader.tsx
│   │   │   ├── FlowLoader.tsx
│   │   │   ├── GridLoader.tsx
│   │   │   ├── LiquidLoader.tsx
│   │   │   ├── LogoSpinLoader.tsx
│   │   │   ├── PulseLoader.tsx
│   │   │   ├── RingLoader.tsx
│   │   │   ├── RotateLoader.tsx
│   │   │   ├── SpinLoader.tsx
│   │   │   ├── TypingLoader.tsx
│   │   │   ├── WaveLoader.tsx
│   │   │   └── index.ts
│   │   └── index.ts
│   ├── hooks/                  # Custom React hooks
│   │   ├── useLoaderState.ts
│   │   ├── useMultipleLoaderStates.ts
│   │   ├── useAsyncLoader.ts
│   │   └── index.ts
│   ├── styles/                 # Base CSS and animations
│   │   └── base.css
│   ├── utils/                  # Utility functions
│   │   ├── animationUtils.ts
│   │   ├── colorUtils.ts
│   │   ├── domUtils.ts
│   │   ├── mathUtils.ts
│   │   ├── propUtils.ts
│   │   └── index.ts
│   ├── __tests__/              # Test files
│   │   ├── BarsLoader.test.tsx
│   │   ├── BounceLoader.test.tsx
│   │   ├── Circle.test.tsx
│   │   ├── DotsLoader.test.tsx
│   │   ├── FluidLoaders.test.tsx
│   │   ├── React19Compatibility.test.tsx
│   │   ├── RingLoader.test.tsx
│   │   ├── RotateLoader.test.tsx
│   │   └── SpinLoader.test.tsx
│   └── index.ts                # Main export file
├── dist/                       # Built files (generated)
└── package.json
```

## Design Principles

### 1. Atomic Design Methodology

- **Atoms**: Basic UI elements (Circle, Dot, Line, Rectangle)
- **Molecules**: Simple combinations of atoms (DotCluster, LineGroup, ShapeGroup)
- **Organisms**: Complete, functional loader components (SpinLoader, PulseLoader, WaveLoader, etc.)

### 2. Performance Optimization

- Tree-shaking support for minimal bundle size
- CSS transforms for hardware acceleration
- `will-change` property for optimized animations
- Reduced motion support for accessibility

### 3. Accessibility First

- ARIA labels and live regions
- Screen reader support
- Keyboard navigation where applicable
- High contrast mode support

### 4. TypeScript Integration

- Full type safety with comprehensive interfaces
- Prop validation and IntelliSense support
- Generic types for extensibility

## Component Architecture

### Base Props Pattern

All components extend `IBaseLoaderProps` for consistency:

```typescript
interface IBaseLoaderProps {
  className?: string;
  style?: CSSProperties;
  size?: number | string;
  color?: string;
  speed?: number;
  loading?: boolean;
  "aria-label"?: string;
}
```

### Animation System

- CSS keyframes for smooth animations
- Speed multiplier for customizable timing
- Reduced motion detection and handling
- Hardware-accelerated transforms

### Theme System

- CSS custom properties for easy customization
- Runtime theme switching support
- Consistent design language across components

### State Management

- Custom [useLoaderState](file:///Users/mac/shadow-loaders/src/hooks/useLoaderState.ts#L25-L101) hook for managing loading states
- [useMultipleLoaderStates](file:///Users/mac/shadow-loaders/src/hooks/useMultipleLoaderStates.ts#L14-L52) hook for managing multiple loaders
- [useAsyncLoader](file:///Users/mac/shadow-loaders/src/hooks/useAsyncLoader.ts#L31-L79) hook for async operations with loading states

## Bundle Structure

### ESM (ES Modules)

```javascript
// Tree-shakable imports
import { SpinLoader } from "react-loadly";
```

### CommonJS

```javascript
// Traditional require syntax
const { SpinLoader } = require("react-loadly");
```

### CSS

```css
/* Separate CSS bundle */
import 'react-loadly/styles.css';
```

## Performance Characteristics

### Bundle Size (estimated)

- Minimal import (single loader): ~2-3KB gzipped
- Full package: ~15-20KB gzipped
- CSS: ~3-5KB gzipped

### Runtime Performance

- 60fps animations with CSS transforms
- Minimal layout thrashing
- Optimized for mobile devices
- Memory efficient with component cleanup

## Browser Support

### Modern Browsers

- Chrome 60+
- Firefox 60+
- Safari 12+
- Edge 79+

### Fallbacks

- Graceful degradation for older browsers
- Reduced motion support
- CSS feature detection

## Development Workflow

### Build Process

1. TypeScript compilation
2. Rollup bundling (ESM + CJS)
3. CSS extraction and minification
4. Type declaration generation

### Testing Strategy

- Unit tests with Jest + React Testing Library
- Accessibility testing
- Performance testing
- React 19 compatibility testing

### Quality Assurance

- ESLint for code quality
- TypeScript for type safety
- Prettier for code formatting
- Husky for pre-commit hooks

## Extensibility

### Custom Loaders

```typescript
import { IBaseLoaderProps } from "react-loadly";

interface CustomLoaderProps extends IBaseLoaderProps {
  customProp?: string;
}

const CustomLoader: React.FC<CustomLoaderProps> = (props) => {
  // Implementation using atoms and molecules
};
```

### Customization

```css
:root {
  --react-loadly-color: #3b82f6;
  --react-loadly-size: 40px;
  --react-loadly-speed: 1;
}
```

This architecture ensures scalability, maintainability, and excellent developer experience while maintaining high performance and accessibility standards.
