import type { CSSProperties } from "react";
export interface IBaseLoaderProps {
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