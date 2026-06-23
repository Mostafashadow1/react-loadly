import React from "react";
import { getDefaultColors } from "../utils/motionPreference";

export type SkeletonLoaderAnimation = "shimmer" | "wave" | "pulse" | "none";
export type SkeletonLoaderVariant = "text" | "rectangular" | "circular" | "rounded";
export type SkeletonLoaderDirection = "ltr" | "rtl";

export interface SkeletonLoaderTheme {
  animation?: SkeletonLoaderAnimation;
  speed?: number;
  baseColor?: string;
  highlightColor?: string;
  direction?: SkeletonLoaderDirection;
}

const defaultColors = getDefaultColors();

export const defaultSkeletonLoaderTheme: Required<SkeletonLoaderTheme> = {
  animation: "shimmer",
  speed: 1.5,
  baseColor: defaultColors.baseColor,
  highlightColor: defaultColors.highlightColor,
  direction: "ltr",
};

export const SkeletonGroupLoaderContext = React.createContext<SkeletonLoaderTheme>({});
