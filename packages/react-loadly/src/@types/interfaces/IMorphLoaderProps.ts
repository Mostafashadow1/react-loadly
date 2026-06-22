import { IBaseLoaderProps } from "./IBaseLoaderProps";

export interface IMorphLoaderProps extends IBaseLoaderProps {
  /** Morph variant type */
  variant?: "blob" | "soft" | "sharp";
  /** Animation speed multiplier */
  speed?: number;
}
