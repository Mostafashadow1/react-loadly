import { IBaseLoaderProps } from "./IBaseLoaderProps";
import { ReactNode } from "react";

export interface IElementLoaderProps extends IBaseLoaderProps {
  /** Animation type for logo */
  animationType?: "spin" | "pulse" | "glow" | "bounce" | "flip";
  /** Glow intensity (0-1) */
  glowIntensity?: number;
  /** React element to display (icon, div, paragraph, etc.) */
  children?: ReactNode;
}
