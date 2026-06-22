import React from "react";
import { SkeletonGroupContext, SkeletonTheme } from "../context/SkeletonGroupContext";

export interface SkeletonGroupProps extends SkeletonTheme {
  stagger?: boolean | number;
  shimmerSync?: boolean;
  children?: React.ReactNode;
}

export function SkeletonGroup({
  animation,
  speed,
  baseColor,
  highlightColor,
  direction,
  stagger = false,
  shimmerSync: _shimmerSync,
  children,
}: SkeletonGroupProps) {
  const parentTheme = React.useContext(SkeletonGroupContext);
  const value = React.useMemo<SkeletonTheme>(
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

  return <SkeletonGroupContext.Provider value={value}>{staggeredChildren}</SkeletonGroupContext.Provider>;
}

export default SkeletonGroup;
