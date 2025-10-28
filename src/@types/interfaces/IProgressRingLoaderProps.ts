import { IBaseLoaderProps } from "./IBaseLoaderProps";

export interface IProgressRingLoaderProps extends IBaseLoaderProps {
  /** Progress value (0-100) or null for indeterminate */
  progress?: number | null;
  /** Thickness of the ring */
  thickness?: number;
  /** Secondary color for multi-color loaders */
  secondaryColor?: string;
}
