import { IBaseLoaderProps } from "./IBaseLoaderProps";

export interface IHeatmapLoaderProps extends IBaseLoaderProps {
  /** Number of rows in the heatmap */
  rows?: number;
  /** Number of columns in the heatmap */
  cols?: number;
}
