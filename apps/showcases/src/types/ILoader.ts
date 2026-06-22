import type { ComponentType } from "react";

import type { ILogoLoaderProps } from "react-loadly";
// Base props that most loaders support
export interface BaseLoaderProps {
  size?: number;
  color?: string;
  speed?: number;
  loadingText?: string;
  style?: React.CSSProperties;
}

// Props for loaders that support count
export interface CountLoaderProps extends BaseLoaderProps {
  count?: number;
}

// Props for loaders that support text (typing loader)
export interface TextLoaderProps extends BaseLoaderProps {
  text?: string;
}

// Props for loaders that support secondary color
export interface SecondaryColorLoaderProps extends BaseLoaderProps {
  secondaryColor?: string;
}

// Props for skeleton loader (doesn't extend BaseLoaderProps)
export interface SkeletonLoaderProps {
  width?: number | string;
  height?: number | string;
  borderRadius?: number;
  animation?: "pulse" | "wave" | "none";
  variant: string;
}

// Props for shimmer loader (doesn't extend BaseLoaderProps)
export interface ShimmerLoaderProps {
  width?: number | string;
  height?: number | string;
  borderRadius?: number;
  shimmerColor?: string;
  variant: string;
}

// Props for element loader
export interface ElementLoaderProps extends BaseLoaderProps {
  element?: string;
  count?: number;
  secondaryColor?: string;
}

// Union type for all possible loader props
export type LoaderProps =
  | BaseLoaderProps
  | CountLoaderProps
  | TextLoaderProps
  | SecondaryColorLoaderProps
  | SkeletonLoaderProps
  | ILogoLoaderProps
  | ElementLoaderProps;

export interface ILoader {
  name: string;
  component: ComponentType<LoaderProps>;
  title: string;
}
