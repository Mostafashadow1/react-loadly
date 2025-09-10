import { IBaseLoaderProps } from "./IBaseLoaderProps";

export interface ILogoLoaderProps extends IBaseLoaderProps {
  /** Logo source (image URL or SVG) */
  src?: string;
  /** Logo alt text */
  alt?: string;
  /** Animation type for logo */
  animationType?: "spin" | "pulse" | "glow" | "bounce" | "flip";
  /** Glow intensity (0-1) */
  glowIntensity?: number;
}
