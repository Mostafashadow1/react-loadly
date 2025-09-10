import { CSSProperties, FC } from 'react';
import * as react_jsx_runtime from 'react/jsx-runtime';
import { IFallbackLoaderProps } from '@types';

interface DotProps {
    size?: number | string;
    color?: string;
    opacity?: number;
    className?: string;
    style?: CSSProperties;
    animation?: string;
    animationDuration?: string;
    animationDelay?: string;
    glowIntensity?: number;
    "data-testid"?: string;
}
declare const Dot: React.FC<DotProps>;

interface LineProps {
    /** Width of the line */
    width?: number | string;
    /** Height/thickness of the line */
    height?: number | string;
    /** Color of the line */
    color?: string;
    /** Opacity */
    opacity?: number;
    /** Border radius for rounded lines */
    borderRadius?: number | string;
    /** Custom CSS class */
    className?: string;
    /** Custom styles */
    style?: CSSProperties;
    /** Animation name if any */
    animation?: string;
    /** Animation duration */
    animationDuration?: string;
    /** Animation delay */
    animationDelay?: string;
    /** Orientation of the line */
    orientation?: "horizontal" | "vertical";
    /** Data test id */
    "data-testid"?: string;
}
declare const Line: React.FC<LineProps>;

interface RectangleProps {
    /** Width of the rectangle */
    width?: number | string;
    /** Height of the rectangle */
    height?: number | string;
    /** Fill color */
    color?: string;
    /** Border color */
    borderColor?: string;
    /** Border width */
    borderWidth?: number | string;
    /** Border radius */
    borderRadius?: number | string;
    /** Opacity */
    opacity?: number;
    /** Custom CSS class */
    className?: string;
    /** Custom styles */
    style?: React.CSSProperties;
    /** Animation name if any */
    animation?: string;
    /** Animation duration */
    animationDuration?: string;
    /** Animation delay */
    animationDelay?: string;
    /** Data test id */
    "data-testid"?: string;
}
declare const Rectangle: React.FC<RectangleProps>;

interface CircleProps {
    size?: number | string;
    color?: string;
    borderColor?: string;
    borderWidth?: number | string;
    opacity?: number;
    className?: string;
    style?: React.CSSProperties;
    animation?: string;
    animationDuration?: string;
    animationDelay?: string;
    "data-testid"?: string;
}
declare const Circle: ({ size, color, borderColor, borderWidth, opacity, className, style, animation, animationDuration, animationDelay, "data-testid": dataTestId, ...props }: CircleProps) => react_jsx_runtime.JSX.Element;

interface DotClusterProps {
    /** Number of dots in the cluster */
    count?: number;
    /** Size of each dot */
    dotSize?: number | string;
    /** Color of the dots */
    color?: string;
    /** Secondary color for alternating dots */
    secondaryColor?: string;
    /** Spacing between dots */
    spacing?: number | string;
    /** Animation speed multiplier */
    speed?: number;
    /** Cluster arrangement */
    arrangement?: "linear" | "circular" | "grid";
    /** Custom CSS class */
    className?: string;
    /** Custom styles */
    style?: React.CSSProperties;
    /** Animation type */
    animationType?: "wave" | "pulse" | "fade" | "bounce";
    /** Data test id */
    "data-testid"?: string;
}
declare const DotCluster: React.FC<DotClusterProps>;

interface LineGroupProps {
    /** Number of lines in the group */
    count?: number;
    /** Width of each line */
    lineWidth?: number | string;
    /** Height/thickness of each line */
    lineHeight?: number | string;
    /** Color of the lines */
    color?: string;
    /** Secondary color for alternating lines */
    secondaryColor?: string;
    /** Spacing between lines */
    spacing?: number | string;
    /** Animation speed multiplier */
    speed?: number;
    /** Group arrangement */
    arrangement?: "parallel" | "radial" | "staggered";
    /** Orientation of lines */
    orientation?: "horizontal" | "vertical";
    /** Custom CSS class */
    className?: string;
    /** Custom styles */
    style?: React.CSSProperties;
    /** Animation type */
    animationType?: "wave" | "pulse" | "scale" | "rotate";
    /** Data test id */
    "data-testid"?: string;
}
declare const LineGroup: React.FC<LineGroupProps>;

interface ShapeGroupProps {
    /** Number of shapes in the group */
    count?: number;
    /** Size of each shape */
    shapeSize?: number | string;
    /** Color of the shapes */
    color?: string;
    /** Secondary color for alternating shapes */
    secondaryColor?: string;
    /** Spacing between shapes */
    spacing?: number | string;
    /** Animation speed multiplier */
    speed?: number;
    /** Group arrangement */
    arrangement?: "linear" | "circular" | "spiral";
    /** Shape types to use */
    shapeTypes?: ("circle" | "rectangle")[];
    /** Custom CSS class */
    className?: string;
    /** Custom styles */
    style?: React.CSSProperties;
    /** Animation type */
    animationType?: "pulse" | "rotate" | "scale" | "bounce";
    /** Border width for outlined shapes */
    borderWidth?: number;
    /** Data test id */
    "data-testid"?: string;
}
declare const ShapeGroup: React.FC<ShapeGroupProps>;

interface IBaseLoaderProps$1 {
  /** Custom CSS class name */
  className?: string;
  /** Custom inline styles */
  style?: CSSProperties;
  /** Size of the loader (can be overridden by width/height) */
  size?: number | string;
  /** Width of the loader */
  width?: number | string;
  /** Height of the loader */
  height?: number | string;
  /** Primary color of the loader */
  color?: string;
  /** Secondary color for multi-color loaders */
  secondaryColor?: string;
  /** Animation speed multiplier (1 = normal, 2 = double speed, 0.5 = half speed) */
  speed?: number;
  /** Whether the loader is currently loading */
  loading?: boolean;
  /** Accessibility label for screen readers */
  "aria-label"?: string;
  /** Whether to show loading text */
  showText?: boolean;
  /** Custom loading text */
  loadingText?: string;

  /** Data test id for testing */
  "data-testid"?: string;
}

interface IFluidLoaderProps extends IBaseLoaderProps$1 {
  /** Fluidity/viscosity of the animation */
  fluidity?: number;
  /** Wave amplitude for wave-based loaders */
  amplitude?: number;
}

interface IGeometricLoaderProps$1 extends IBaseLoaderProps$1 {
  /** Number of elements in geometric patterns */
  count?: number;
  /** Border width for outlined shapes */
  borderWidth?: number;
}

interface ILoaderCSSVariables$1 {
  "--loader-color"?: string;
  "--loader-secondary-color"?: string;
  "--loader-size"?: string;
  "--loader-speed"?: string;
  "--loader-background"?: string;
  "--loader-text-color"?: string;
  "--loader-border-width"?: string;
  "--loader-glow-intensity"?: string;
}

interface ILogoLoaderProps extends IBaseLoaderProps$1 {
  /** Logo source (image URL or SVG) */
  src?: string;
  /** Logo alt text */
  alt?: string;
  /** Animation type for logo */
  animationType?: "spin" | "pulse" | "glow" | "bounce" | "flip";
  /** Glow intensity (0-1) */
  glowIntensity?: number;
}

interface ITextLoaderProps extends IBaseLoaderProps$1 {
  /** Text to animate */
  text?: string;
  /** Font family for text loaders */
  fontFamily?: string;
  /** Font weight */
  fontWeight?: number | string;
  /** Character animation delay */
  charDelay?: number;
}

declare const BlobLoader: FC<IFluidLoaderProps>;

declare const FallbackLoader: FC<IFallbackLoaderProps>;

declare const FlowLoader: FC<IFluidLoaderProps>;

declare const GridLoader: FC<IGeometricLoaderProps$1>;

declare const LiquidLoader: FC<IFluidLoaderProps>;

declare const LogoSpinLoader: FC<ILogoLoaderProps>;

declare const PulseLoader: FC<IGeometricLoaderProps$1>;

declare const SpinLoader: FC<IGeometricLoaderProps$1>;

declare const TypingLoader: FC<ITextLoaderProps>;

declare const WaveLoader: FC<IGeometricLoaderProps$1>;

declare const BarsLoader: FC<IGeometricLoaderProps$1>;

declare const BounceLoader: FC<IGeometricLoaderProps$1>;

declare const DotsLoader: FC<IGeometricLoaderProps$1>;

interface IBaseLoaderProps {
    /** Custom CSS class name */
    className?: string;
    /** Custom inline styles */
    style?: CSSProperties;
    /** Size of the loader (can be overridden by width/height) */
    size?: number | string;
    /** Width of the loader */
    width?: number | string;
    /** Height of the loader */
    height?: number | string;
    /** Primary color of the loader */
    color?: string;
    /** Secondary color for multi-color loaders */
    secondaryColor?: string;
    /** Animation speed multiplier (1 = normal, 2 = double speed, 0.5 = half speed) */
    speed?: number;
    /** Whether the loader is currently loading */
    loading?: boolean;
    /** Accessibility label for screen readers */
    "aria-label"?: string;
    /** Whether to show loading text */
    showText?: boolean;
    /** Custom loading text */
    loadingText?: string;
    /** Data test id for testing */
    "data-testid"?: string;
}

interface IGeometricLoaderProps extends IBaseLoaderProps {
    /** Number of elements in geometric patterns */
    count?: number;
    /** Border width for outlined shapes */
    borderWidth?: number;
}

interface ILoaderCSSVariables {
    "--loader-color"?: string;
    "--loader-secondary-color"?: string;
    "--loader-size"?: string;
    "--loader-speed"?: string;
    "--loader-background"?: string;
    "--loader-text-color"?: string;
    "--loader-border-width"?: string;
    "--loader-glow-intensity"?: string;
}

interface ILoaderState {
    isLoading: boolean;
    progress?: number;
    error?: string | null;
    retryCount?: number;
}

interface IUseLoaderStateOptions {
    initialLoading?: boolean;
    timeout?: number;
    maxRetries?: number;
    onLoadingChange?: (isLoading: boolean) => void;
    onError?: (error: string) => void;
    onProgress?: (progress: number) => void;
}

interface IUseLoaderStateReturn {
    state: ILoaderState;
    setLoading: (loading: boolean) => void;
    setProgress: (progress: number) => void;
    setError: (error: string | null) => void;
    retry: () => void;
    reset: () => void;
}

interface ILoaderTheme {
    name: string;
    colors: {
        primary: string;
        secondary: string;
        background: string;
        text: string;
        accent: string;
    };
    animation: {
        duration: string;
        easing: string;
    };
    typography: {
        fontFamily: string;
        fontSize: string;
        fontWeight: number;
    };
}

type AnimationDirectionType = "normal" | "reverse" | "alternate" | "alternate-reverse";

type AnimationEasingType = "linear" | "ease" | "ease-in" | "ease-out" | "ease-in-out" | "cubic-bezier(number, number, number, number)";

type AnimationFillModeType = "none" | "forwards" | "backwards" | "both";

declare const RingLoader: FC<IGeometricLoaderProps>;

declare const RotateLoader: FC<IGeometricLoaderProps$1>;

/**
 * Custom React hook for managing loader state with advanced features
 * Provides centralized loading state management with timeout, retry, and progress tracking
 *
 * @param options - Configuration options for the loader state
 * @returns Object containing state and methods to control the loader
 */
declare const useLoaderState: (options?: IUseLoaderStateOptions) => IUseLoaderStateReturn;

/**
 * Hook for managing multiple loader states with shared options
 * Useful when you need to control multiple loaders with the same configuration
 *
 * @param keys - Array of string keys representing each loader state
 * @param options - Shared configuration options for all loader states
 * @returns Record mapping each key to its corresponding loader state methods
 */
declare const useMultipleLoaderStates: (keys: string[], options?: IUseLoaderStateOptions) => Record<string, IUseLoaderStateReturn>;

/**
 * Hook for tracking async operations with automatic loading state management
 * Automatically handles loading states during async operations and provides error handling
 *
 * @param asyncFn - Async function to execute and track
 * @param dependencies - Dependency array to trigger re-execution (similar to useEffect)
 * @param options - Configuration options for the loader state
 * @returns Object containing loader state, data result, and execution method
 */
declare const useAsyncLoader: <T>(asyncFn: () => Promise<T>, dependencies?: React.DependencyList, options?: IUseLoaderStateOptions) => IUseLoaderStateReturn & {
    data: T | null;
    execute: () => Promise<T | null>;
};

/**
 * Merges default props with user props, handling undefined values gracefully
 * @param defaultProps - The default props to merge
 * @param userProps - The user provided props
 * @returns Merged props object
 */
declare function mergeProps<T extends object, U extends object>(defaultProps: T, userProps: U): T & U;
/**
 * Converts size prop to CSS value
 * @param size - The size value (number or string)
 * @param fallback - The fallback value if size is undefined
 * @returns CSS size value as string
 */
declare function getSizeValue(size: number | string | undefined, fallback?: string): string;
/**
 * Generates CSS custom properties object from loader variables
 * @param variables - The loader CSS variables object
 * @returns React CSS properties object
 */
declare function generateCSSVariables(variables: ILoaderCSSVariables$1): React.CSSProperties;

/**
 * Calculates animation duration based on speed multiplier
 * @param baseMs - The base duration in milliseconds
 * @param speed - The speed multiplier (default: 1)
 * @returns Formatted duration string
 */
declare function getAnimationDuration(baseMs: number, speed?: number): string;
/**
 * Creates a CSS animation name with prefix
 * @param name - The base name for the animation
 * @returns Prefixed animation name
 */
declare function createAnimationName(name: string): string;
/**
 * Check if reduced motion is preferred
 * @returns Boolean indicating if reduced motion is preferred
 */
declare function prefersReducedMotion(): boolean;
/**
 * Get optimized animation settings based on user preferences
 * @param speed - The animation speed multiplier (default: 1)
 * @returns Object with optimized animation settings
 */
declare function getOptimizedAnimationSettings(speed?: number): {
    duration: string;
    playState: string;
    iterationCount: string | number;
};

/**
 * Converts hex color to RGB values
 * @param hex - The hex color string
 * @returns Object with r, g, b values or null if invalid
 */
declare function hexToRgb(hex: string): {
    r: number;
    g: number;
    b: number;
} | null;
/**
 * Generates rgba color with opacity
 * @param color - The hex color string
 * @param opacity - The opacity value (0-1)
 * @returns RGBA color string
 */
declare function rgba(color: string, opacity: number): string;

/**
 * Clamps a value between min and max
 * @param value - The value to clamp
 * @param min - The minimum value
 * @param max - The maximum value
 * @returns The clamped value
 */
declare function clamp(value: number, min: number, max: number): number;

/**
 * Generates unique IDs for accessibility
 * @param prefix - The prefix for the ID (default: "loader")
 * @returns A unique ID string
 */
declare function generateId(prefix?: string): string;
/**
 * Validates and sanitizes CSS values
 * @param value - The CSS value to sanitize
 * @returns Sanitized CSS value or undefined
 */
declare function sanitizeCSSValue(value: string | number | undefined): string | undefined;

export { BarsLoader, BlobLoader, BounceLoader, Circle, Dot, DotCluster, DotsLoader, FallbackLoader, FlowLoader, GridLoader, Line, LineGroup, LiquidLoader, LogoSpinLoader, PulseLoader, Rectangle, RingLoader, RotateLoader, ShapeGroup, SpinLoader, TypingLoader, WaveLoader, clamp, createAnimationName, generateCSSVariables, generateId, getAnimationDuration, getOptimizedAnimationSettings, getSizeValue, hexToRgb, mergeProps, prefersReducedMotion, rgba, sanitizeCSSValue, useAsyncLoader, useLoaderState, useMultipleLoaderStates };
export type { AnimationDirectionType, AnimationEasingType, AnimationFillModeType, CircleProps, DotClusterProps, DotProps, IBaseLoaderProps, ILoaderCSSVariables, ILoaderTheme, LineGroupProps, LineProps, RectangleProps, ShapeGroupProps };
