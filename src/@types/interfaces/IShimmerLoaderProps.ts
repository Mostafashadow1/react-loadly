import { IBaseLoaderProps } from "./IBaseLoaderProps";

export interface IShimmerLoaderProps extends IBaseLoaderProps {
  /** Number of shimmer lines to display */
  lines?: number;
  /** Variant of shimmer (line, card, avatar, text, wave) */
  variant?: "line" | "card" | "avatar" | "text" | "wave" | "custom";
  /** Border radius of shimmer elements */
  borderRadius?: number | string;
  /** Spacing between shimmer lines */
  spacing?: number | string;
  /** Shimmer wave width */
  waveWidth?: number | string;
  /** Shimmer color */
  shimmerColor?: string;
  /** Highlight color for shimmer effect */
  highlightColor?: string;
  /** Wave direction */
  waveDirection?: "left-to-right" | "right-to-left" | "top-to-bottom" | "bottom-to-top";
}
