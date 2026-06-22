import { IElementLoaderProps } from "@/@types/interfaces/IElementLoaderProps";
import { useFullscreen } from "@/hooks/useFullscreen";
import { getAnimationDuration, mergeProps } from "@/utils";
import { classNameGen } from "@/utils/classNameGen";
import React, { type CSSProperties, FC } from "react";

const defaultProps: Partial<IElementLoaderProps> = {
  size: 60,
  speed: 1,
  loading: true,
  animationType: "spin",
  glowIntensity: 0.3,
  "aria-label": "Loading...",
};

export const ElementLoader: FC<IElementLoaderProps> = (userProps) => {
  const props = mergeProps(defaultProps, userProps);
  const {
    size,
    width,
    height,
    speed = 1,
    loading,
    animationType,
    glowIntensity,
    className = "",
    style = {},
    color = "var(--react-loadly-color)",
    "aria-label": ariaLabel,
    loadingText,
    showText,
    "data-testid": dataTestId,
    fullscreen,
    screenWidth,
    screenHeight,
    loaderCenter,
    screenBackground,
    children,
    ...restProps
  } = props;

  const containerStyle = useFullscreen({
    fullscreen,
    screenWidth,
    screenHeight,
    loaderCenter,
    screenBackground,
    style,
  });

  if (!loading) return null;

  // Enhanced animation variants for ElementLoader
  const getAnimation = () => {
    switch (animationType) {
      case "pulse":
        return `react-loadly-pulse ${getAnimationDuration(2000, speed)} infinite`;
      case "glow":
        return `react-loadly-glow ${getAnimationDuration(2000, speed)} infinite`;
      case "bounce":
        return `react-loadly-bounce ${getAnimationDuration(2000, speed)} infinite`;
      case "flip":
        return `react-loadly-flip ${getAnimationDuration(2000, speed)} infinite`;
      case "spin":
      default:
        return `react-loadly-spin ${getAnimationDuration(2000, speed)} infinite`;
    }
  };

  // Calculate dimensions, prioritizing width/height props over size
  const elementWidth = width || size;
  const elementHeight = height || size;

  const elementStyle: CSSProperties = {
    width: typeof elementWidth === "number" ? `${elementWidth}px` : elementWidth,
    height: typeof elementHeight === "number" ? `${elementHeight}px` : elementHeight,
    animation: getAnimation(),
    filter: (glowIntensity ?? 0) > 0 ? `drop-shadow(0 0 ${(glowIntensity ?? 0) * 20}px ${color})` : undefined,
    transformStyle: "preserve-3d",
    willChange: "transform",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transformOrigin: "center center",
  };

  return (
    <div
      className={classNameGen("react-loadly react-loadly-element-loader", className)}
      style={containerStyle}
      role="status"
      aria-label={ariaLabel}
      aria-live="polite"
      aria-busy={loading}
      data-testid={dataTestId}
      {...restProps}
    >
      <div style={elementStyle} className="react-loadly-element" data-testid={dataTestId ? `${dataTestId}-element` : undefined}>
        {children}
      </div>
      {showText && (
        <div className="react-loadly-text" aria-live="polite">
          {loadingText || ariaLabel}
        </div>
      )}
      <span className="react-loadly-sr-only">{ariaLabel}</span>
    </div>
  );
};

ElementLoader.displayName = "ElementLoader";

