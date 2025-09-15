import React$1, { CSSProperties, ReactNode, FC, HTMLAttributes } from 'react';

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
declare const Dot: React$1.FC<DotProps>;

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
declare const Line: React$1.FC<LineProps>;

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
    style?: React$1.CSSProperties;
    /** Animation name if any */
    animation?: string;
    /** Animation duration */
    animationDuration?: string;
    /** Animation delay */
    animationDelay?: string;
    /** Data test id */
    "data-testid"?: string;
}
declare const Rectangle: React$1.FC<RectangleProps>;

interface CircleProps {
    size?: number | string;
    color?: string;
    borderColor?: string;
    borderWidth?: number | string;
    opacity?: number;
    className?: string;
    style?: React$1.CSSProperties;
    animation?: string;
    animationDuration?: string;
    animationDelay?: string;
    "data-testid"?: string;
}
declare const Circle: ({ size, color, borderColor, borderWidth, opacity, className, style, animation, animationDuration, animationDelay, "data-testid": dataTestId, ...props }: CircleProps) => React$1.JSX.Element;

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
    style?: React$1.CSSProperties;
    /** Animation type */
    animationType?: "wave" | "pulse" | "fade" | "bounce";
    /** Data test id */
    "data-testid"?: string;
}
declare const DotCluster: React$1.FC<DotClusterProps>;

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
    style?: React$1.CSSProperties;
    /** Animation type */
    animationType?: "wave" | "pulse" | "scale" | "rotate";
    /** Data test id */
    "data-testid"?: string;
}
declare const LineGroup: React$1.FC<LineGroupProps>;

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
    style?: React$1.CSSProperties;
    /** Animation type */
    animationType?: "pulse" | "rotate" | "scale" | "bounce";
    /** Border width for outlined shapes */
    borderWidth?: number;
    /** Data test id */
    "data-testid"?: string;
}
declare const ShapeGroup: React$1.FC<ShapeGroupProps>;

/**
 * Base props interface for all loader components
 * Provides common functionality across all loader types
 */
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
  /** Enable fullscreen mode */
  fullscreen?: boolean;
  /** Screen width for fullscreen mode */
  screenWidth?: number | string;
  /** Screen height for fullscreen mode */
  screenHeight?: number | string;
  /** Center the loader in fullscreen mode */
  loaderCenter?: boolean;
  /** Background color for fullscreen mode */
  screenBackground?: string;
}

interface IElementLoaderProps extends IBaseLoaderProps$1 {
  /** Animation type for logo */
  animationType?: "spin" | "pulse" | "glow" | "bounce" | "flip";
  /** Glow intensity (0-1) */
  glowIntensity?: number;
  /** React element to display (icon, div, paragraph, etc.) */
  children?: ReactNode;
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

interface ILogoLoaderProps extends IBaseLoaderProps$1 {
  /** Logo source (image URL or SVG) */
  src: string;
  /** Logo alt text */
  alt?: string;
  /** Animation type for logo */
  animationType?: "spin" | "pulse" | "glow" | "bounce" | "flip";
  /** Glow intensity (0-1) */
  glowIntensity?: number;
}

interface ITextLoaderProps extends Exclude<IBaseLoaderProps$1, "showText"> {
  /** Font family for text loaders */
  fontFamily?: string;
  /** Font weight */
  fontWeight?: number | string;
  /** Character animation delay */
  charDelay?: number;
  loop?: boolean;
}

interface ISkeletonLoaderProps extends IBaseLoaderProps$1 {
  /** Number of skeleton lines to display */
  lines?: number;
  /** Variant of skeleton (line, card, avatar, text) */
  variant?: "line" | "card" | "avatar" | "text" | "custom";
  /** Width of skeleton elements */
  width?: number | string;
  /** Height of skeleton elements */
  height?: number | string;
  /** Border radius of skeleton elements */
  borderRadius?: number | string;
  /** Spacing between skeleton lines */
  spacing?: number | string;
  /** Whether to show shimmer animation */
  shimmer?: boolean;
  /** Shimmer color */
  shimmerColor?: string;
  /** Highlight color for shimmer effect */
  highlightColor?: string;
  /** Shimmer wave width */
  waveWidth?: number | string;

  /** Wave direction */
  waveDirection?: "left-to-right" | "right-to-left" | "top-to-bottom" | "bottom-to-top";
}

interface ILoaderState$1 {
  isLoading: boolean;
  progress?: number;
  error?: string | null;
  retryCount?: number;
}

interface IUseLoaderStateOptions$1 {
  initialLoading?: boolean;
  timeout?: number;
  maxRetries?: number;
  onLoadingChange?: (isLoading: boolean) => void;
  onError?: (error: string) => void;
  onProgress?: (progress: number) => void;
}

interface IUseLoaderStateReturn$1 {
  state: ILoaderState$1;
  setLoading: (loading: boolean) => void;
  setProgress: (progress: number) => void;
  setError: (error: string | null) => void;
  retry: () => void;
  reset: () => void;
}

interface IFallbackLoaderProps extends IBaseLoaderProps$1 {
  /** Error message to display */
  error?: string;
  /** Retry function */
  onRetry?: () => void;
  /** Show retry button */
  showRetry?: boolean;
  /** Custom fallback content */
  children?: ReactNode;
  /** Fallback type */
  type?: "error" | "timeout" | "network";
}

type AnimationDirectionType =
  | "normal"
  | "reverse"
  | "alternate"
  | "alternate-reverse";

type AnimationEasingType =
  | "linear"
  | "ease"
  | "ease-in"
  | "ease-out"
  | "ease-in-out"
  | "cubic-bezier(number, number, number, number)";

type AnimationFillModeType = "none" | "forwards" | "backwards" | "both";

declare const BarsLoader: FC<IGeometricLoaderProps$1>;

declare const BlobLoader: FC<IFluidLoaderProps>;

declare const BounceLoader: FC<IGeometricLoaderProps$1>;

declare const DotsLoader: FC<IGeometricLoaderProps$1>;

declare const ElementLoader: FC<IElementLoaderProps>;

declare const FallbackLoader: FC<IFallbackLoaderProps>;

declare const FlowLoader: FC<IFluidLoaderProps>;

declare const GridLoader: FC<IGeometricLoaderProps$1>;

declare const LiquidLoader: FC<IFluidLoaderProps>;

declare const LogoSpinLoader: FC<ILogoLoaderProps>;

declare const PulseLoader: FC<IGeometricLoaderProps$1>;

/**
 * Base props interface for all loader components
 * Provides common functionality across all loader types
 */
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
    /** Enable fullscreen mode */
    fullscreen?: boolean;
    /** Screen width for fullscreen mode */
    screenWidth?: number | string;
    /** Screen height for fullscreen mode */
    screenHeight?: number | string;
    /** Center the loader in fullscreen mode */
    loaderCenter?: boolean;
    /** Background color for fullscreen mode */
    screenBackground?: string;
}

interface IGeometricLoaderProps extends IBaseLoaderProps {
    /** Number of elements in geometric patterns */
    count?: number;
    /** Border width for outlined shapes */
    borderWidth?: number;
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

declare const RingLoader: FC<IGeometricLoaderProps>;

declare const RotateLoader: FC<IGeometricLoaderProps$1>;

declare const SkeletonLoader: FC<ISkeletonLoaderProps>;

declare const SpinLoader: FC<IGeometricLoaderProps$1>;

declare const TypingLoader: FC<ITextLoaderProps>;

declare const WaveLoader: FC<IGeometricLoaderProps$1>;

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
declare function generateCSSVariables(variables: ILoaderCSSVariables): React.CSSProperties;

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
 * @param respectReducedMotion - Whether to respect reduced motion preference (default: true)
 * @returns Object with optimized animation settings
 */
declare function getOptimizedAnimationSettings(speed?: number, respectReducedMotion?: boolean): {
    duration: string;
    playState: string;
    iterationCount: string | number;
};
/**
 * Get animation direction CSS value
 * @param direction - The animation direction
 * @returns CSS direction value
 */
declare function getAnimationDirection(direction?: "normal" | "reverse" | "alternate" | "alternate-reverse"): string;
/**
 * Get animation easing CSS value
 * @param easing - The animation easing function
 * @returns CSS easing value
 */
declare function getAnimationEasing(easing?: "linear" | "ease" | "ease-in" | "ease-out" | "ease-in-out" | "cubic-bezier"): string;
/**
 * Create a complete animation string
 * @param name - The animation name
 * @param duration - The animation duration
 * @param easing - The animation easing
 * @param direction - The animation direction
 * @param iterationCount - The iteration count
 * @returns Complete animation string
 */
declare function createAnimationString(name: string, duration: string, easing?: string, direction?: string, iterationCount?: string | number): string;

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

declare function classNameGen<T, C>(...props: T[]): HTMLAttributes<C>["className"];

export { BarsLoader, BlobLoader, BounceLoader, Circle, Dot, DotCluster, DotsLoader, ElementLoader, FallbackLoader, FlowLoader, GridLoader, Line, LineGroup, LiquidLoader, LogoSpinLoader, PulseLoader, Rectangle, RingLoader, RotateLoader, ShapeGroup, SkeletonLoader, SpinLoader, TypingLoader, WaveLoader, clamp, classNameGen, createAnimationName, createAnimationString, generateCSSVariables, generateId, getAnimationDirection, getAnimationDuration, getAnimationEasing, getOptimizedAnimationSettings, getSizeValue, hexToRgb, mergeProps, prefersReducedMotion, rgba, sanitizeCSSValue, useAsyncLoader, useLoaderState, useMultipleLoaderStates };
export type { AnimationDirectionType, AnimationEasingType, AnimationFillModeType, CircleProps, DotClusterProps, DotProps, IBaseLoaderProps$1 as IBaseLoaderProps, IElementLoaderProps, IFallbackLoaderProps, IFluidLoaderProps, IGeometricLoaderProps$1 as IGeometricLoaderProps, ILoaderCSSVariables, ILoaderState$1 as ILoaderState, ILogoLoaderProps, ISkeletonLoaderProps, ITextLoaderProps, IUseLoaderStateOptions$1 as IUseLoaderStateOptions, IUseLoaderStateReturn$1 as IUseLoaderStateReturn, LineGroupProps, LineProps, RectangleProps, ShapeGroupProps };
