import { WaveDirectionType } from "../types/WaveDirectionType";
import { IBaseLoaderProps } from "./IBaseLoaderProps";
import { CSSProperties, ReactElement } from "react";

export interface IAutoSkeletonProps extends IBaseLoaderProps {
  /** The component to render when not loading, or to analyze for skeleton generation when loading */
  component: ReactElement;
  /** Whether to inherit styles from the original elements */
  inheritStyles?: boolean;
  /** Custom  styles for different element types */
  styless?: {
    [key: string]: CSSProperties;
  };
  /** Whether to show shimmer animation */
  shimmer?: boolean;
  /** Shimmer color */
  shimmerColor?: string;
  /** Highlight color for shimmer effect */
  highlightColor?: string;
  /** Shimmer wave width */
  waveWidthValue?: number | string;
  /** Wave direction */
  waveDirection?: WaveDirectionType;
}
