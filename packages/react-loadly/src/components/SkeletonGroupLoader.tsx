import React from "react";
import { SkeletonGroupLoaderContext, SkeletonLoaderTheme } from "../context/SkeletonGroupLoaderContext";

export interface SkeletonGroupLoaderProps extends SkeletonLoaderTheme {
  stagger?: boolean | number;
  shimmerSync?: boolean;
  children?: React.ReactNode;
}

export function SkeletonGroupLoader({
  animation,
  speed,
  baseColor,
  highlightColor,
  direction,
  stagger = false,
  shimmerSync: _shimmerSync,
  children,
}: SkeletonGroupLoaderProps) {
  const parentTheme = React.useContext(SkeletonGroupLoaderContext);
  const value = React.useMemo<SkeletonLoaderTheme>(
    () => ({
      ...parentTheme,
      animation: animation ?? parentTheme.animation,
      speed: speed ?? parentTheme.speed,
      baseColor: baseColor ?? parentTheme.baseColor,
      highlightColor: highlightColor ?? parentTheme.highlightColor,
      direction: direction ?? parentTheme.direction,
    }),
    [animation, baseColor, direction, highlightColor, parentTheme, speed]
  );

  const staggeredChildren = React.useMemo(() => {
    if (stagger === false) return children;
    const offset = stagger === true ? 0.15 : stagger;

    return React.Children.map(children, (child, index) => {
      if (!React.isValidElement<{ style?: React.CSSProperties }>(child)) return child;
      return React.cloneElement(child, {
        style: {
          animationDelay: `${index * offset}s`,
          ...child.props.style,
        },
      });
    });
  }, [children, stagger]);

  return <SkeletonGroupLoaderContext.Provider value={value}>{staggeredChildren}</SkeletonGroupLoaderContext.Provider>;
}

export default SkeletonGroupLoader;
