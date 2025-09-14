import { IBaseLoaderProps } from "./IBaseLoaderProps";

export interface ISkeletonLoaderProps extends IBaseLoaderProps {
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
}
