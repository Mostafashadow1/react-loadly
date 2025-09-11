/**
 * ElementLoader Component
 *
 * A flexible loader component that can display any React element with various animation effects.
 *
 * @example
 * ```tsx
 * // Basic usage with a div element
 * <ElementLoader>
 *   <div style={{ width: '100%', height: '100%', backgroundColor: 'blue' }} />
 * </ElementLoader>
 *
 * // With different animation types
 * <ElementLoader animationType="pulse">
 *   <div>Your custom element here</div>
 * </ElementLoader>
 *
 * // With loading text
 * <ElementLoader showText loadingText="Loading...">
 *   <YourIconComponent />
 * </ElementLoader>
 * ```
 */
import { IElementLoaderProps } from "@/@types/interfaces/IElementLoaderProps";
import { getAnimationDuration, mergeProps } from "@/utils";
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

  if (!loading) return null;

  const containerStyle: CSSProperties = {
    display: "inline-flex",
    flexDirection: "column",
    alignItems: "center",
    ...style,
    ...(fullscreen && {
      position: "fixed",
      top: 0,
      left: 0,
      width: screenWidth || "100vw",
      height: screenHeight || "100vh",
      backgroundColor: screenBackground || "var(--react-loadly-background)",
      zIndex: 9999,
      justifyContent: loaderCenter ? "center" : style.justifyContent,
    }),
  };

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
  };

  // Add additional animated elements for enhanced visual effect
  const innerElementStyle: CSSProperties = {
    position: "absolute",
    top: "50%",
    left: "50%",
    width: "60%",
    height: "60%",
    borderRadius: "50%",
    backgroundColor: color,
    opacity: 0.3,
    transform: "translate(-50%, -50%)",
    animation: `react-loadly-pulse ${getAnimationDuration(1500, speed * 1.5)} infinite`,
    zIndex: -1,
  };

  const outerElementStyle: CSSProperties = {
    position: "absolute",
    top: "50%",
    left: "50%",
    width: "120%",
    height: "120%",
    borderRadius: "50%",
    border: `2px solid ${color}`,
    opacity: 0.2,
    transform: "translate(-50%, -50%)",
    animation: `react-loadly-spin ${getAnimationDuration(3000, speed * 0.8)} infinite reverse`,
    zIndex: -2,
  };

  return (
    <div
      className={`react-loadly react-loadly-element-loader ${className}`.trim()}
      style={containerStyle}
      role="status"
      aria-label={ariaLabel}
      aria-live="polite"
      aria-busy={loading}
      data-testid={dataTestId}
      {...restProps}
    >
      <div style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={outerElementStyle} />
        <div style={innerElementStyle} />
        <div style={elementStyle} className="react-loadly-element" data-testid={dataTestId ? `${dataTestId}-element` : undefined}>
          {children}
        </div>
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
