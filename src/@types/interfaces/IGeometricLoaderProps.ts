import { IBaseLoaderProps } from "./IBaseLoaderProps";

export interface IGeometricLoaderProps extends IBaseLoaderProps {
  /** Number of elements in geometric patterns */
  count?: number;
  /** Border width for outlined shapes */
  borderWidth?: number;
  /** Secondary color for multi-color loaders */
  secondaryColor?: string;
}
