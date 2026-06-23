import React from "react";
import { SkeletonLoader, SkeletonLoaderProps } from "../SkeletonLoader";

export interface SkeletonPatternLoaderProps extends Omit<SkeletonLoaderProps, "variant" | "count" | "animation" | "as"> {
  "data-testid"?: string;
  lines?: number;
  variant?: "line" | "card" | "avatar" | "text" | "custom";
  size?: number | string;
  loading?: boolean;
  spacing?: number | string;
  shimmer?: boolean;
  shimmerColor?: string;
  waveWidth?: number | string;
  waveDirection?: "left" | "right" | "left-to-right" | "right-to-left" | "top-to-bottom" | "bottom-to-top";
}

const toCssSize = (value: number | string | undefined): string | undefined =>
  typeof value === "number" ? `${value}px` : value;

const getDefaults = (variant: SkeletonPatternLoaderProps["variant"]) => {
  switch (variant) {
    case "card":
      return { width: 300, height: 200, radius: 8, skeletonVariant: "rectangular" as const };
    case "avatar":
      return { width: 48, height: 48, radius: "50%", skeletonVariant: "circular" as const };
    case "line":
    case "text":
      return { width: "100%", height: 16, radius: 4, skeletonVariant: "text" as const };
    case "custom":
    default:
      return { width: "100%", height: 20, radius: 4, skeletonVariant: "rounded" as const };
  }
};

export function SkeletonPatternLoader({
  lines = 1,
  variant = "custom",
  size,
  loading = true,
  width,
  height,
  borderRadius,
  spacing = 8,
  shimmer = true,
  shimmerColor,
  highlightColor,
  style,
  baseColor,
  color,
  className,
  "data-testid": dataTestId,
  ...rest
}: SkeletonPatternLoaderProps) {
  if (!loading) return null;

  const defaults = getDefaults(variant);
  const resolvedWidth = width ?? size ?? defaults.width;
  const resolvedHeight = height ?? size ?? defaults.height;
  const testId = dataTestId;
  const count = variant === "line" || variant === "text" ? Math.max(1, lines) : 1;

  const skeleton = (index?: number) => (
    <SkeletonLoader
      as="div"
      key={index ?? "skeleton"}
      data-testid={
        testId
          ? `${testId}-skeleton${count > 1 || variant === "line" || variant === "text" ? `-${index ?? 0}` : ""}`
          : undefined
      }
      variant={defaults.skeletonVariant}
      animation={shimmer ? "shimmer" : "none"}
      width={resolvedWidth}
      height={resolvedHeight}
      borderRadius={borderRadius ?? defaults.radius}
      baseColor={baseColor ?? color ?? shimmerColor}
      highlightColor={highlightColor}
      style={{ marginBottom: index !== undefined && index < count - 1 ? spacing : undefined }}
    />
  );

  return (
    <div
      {...rest}
      data-testid={dataTestId}
      className={className}
      style={{
        width: toCssSize(resolvedWidth),
        ...style,
      }}
    >
      {count === 1 && variant !== "line" && variant !== "text"
        ? skeleton()
        : Array.from({ length: count }).map((_, index) => skeleton(index))}
    </div>
  );
}

export default SkeletonPatternLoader;
