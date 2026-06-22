import React from "react";
import { getDefaultColors } from "../utils/motionPreference";

export type SkeletonAnimation = "shimmer" | "wave" | "pulse" | "none";
export type SkeletonVariant = "text" | "rectangular" | "circular" | "rounded";
export type SkeletonDirection = "ltr" | "rtl";

export interface SkeletonTheme {
  animation?: SkeletonAnimation;
  speed?: number;
  baseColor?: string;
  highlightColor?: string;
  direction?: SkeletonDirection;
}

const defaultColors = getDefaultColors();

export const defaultSkeletonTheme: Required<SkeletonTheme> = {
  animation: "shimmer",
  speed: 1.5,
  baseColor: defaultColors.baseColor,
  highlightColor: defaultColors.highlightColor,
  direction: "ltr",
};

export const SkeletonGroupContext = React.createContext<SkeletonTheme>({});
