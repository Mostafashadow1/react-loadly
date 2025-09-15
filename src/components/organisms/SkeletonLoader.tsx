import React, { type CSSProperties, FC } from "react";
import { getSizeValue, mergeProps } from "@/utils";
import { ISkeletonLoaderProps } from "@/@types/interfaces/ISkeletonLoaderProps";
import { classNameGen } from "@/utils/classNameGen";

const defaultProps: Partial<ISkeletonLoaderProps> = {
  size: 40,
  speed: 1,
  loading: true,
  lines: 1,
  variant: "card",
  shimmer: true,
  color: "#e2e8f0",
  highlightColor: "#f1f5f9",
  shimmerColor: "rgba(255, 255, 255, 0.6)",
  borderRadius: "4px",
  spacing: "8px",
  waveWidth: "200px",
  waveDirection: "left-to-right",
  "aria-label": "Loading content...",
};

export const SkeletonLoader: FC<ISkeletonLoaderProps> = (userProps) => {
  const props = mergeProps(defaultProps, userProps);
  const {
    size,
    width,
    height,
    speed,
    loading,
    className = "",
    style = {},
    lines = 1,
    variant,
    borderRadius,
    spacing,
    shimmer,
    color,
    highlightColor,
    shimmerColor,
    waveWidth,
    waveDirection,
    showText,
    loadingText = "Loading content...",
    "aria-label": ariaLabel,
    "data-testid": dataTestId,
    fullscreen,
    screenWidth,
    screenHeight,
    loaderCenter,
    screenBackground,
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

  const getSkeletonDimensions = () => {
    switch (variant) {
      case "avatar":
        return {
          width: width || size || "40px",
          height: height || size || "40px",
          borderRadius: borderRadius || "50%",
        };
      case "card":
        return {
          width: width || size || "300px",
          height: height || size || "200px",
          borderRadius: borderRadius || "8px",
        };
      case "text":
        return {
          width: width || size || "100%",
          height: height || size || "16px",
          borderRadius: borderRadius || "4px",
        };
      default:
        return {
          width: width || size || "100%",
          height: height || size || "16px",
          borderRadius: borderRadius || "4px",
        };
    }
  };

  const skeletonDimensions = getSkeletonDimensions();
  const spacingValue = getSizeValue(spacing, "8px");
  const waveWidthValue = getSizeValue(waveWidth, "200px");

  const getShimmerGradient = () => {
    const gradientDirection =
      waveDirection === "left-to-right"
        ? "90deg"
        : waveDirection === "right-to-left"
        ? "270deg"
        : waveDirection === "top-to-bottom"
        ? "180deg"
        : "0deg";

    return `linear-gradient(${gradientDirection}, ${color} 0%, ${highlightColor} 50%, ${color} 100%)`;
  };

  const skeletonBaseStyle: CSSProperties = {
    width: getSizeValue(skeletonDimensions.width),
    height: getSizeValue(skeletonDimensions.height),
    backgroundColor: color,
    borderRadius: getSizeValue(skeletonDimensions.borderRadius),
    position: "relative",
    overflow: "hidden",
  };

  const skeletonStyle: CSSProperties = {
    ...skeletonBaseStyle,
    ...(shimmer && {
      background: getShimmerGradient(),
      backgroundSize: `${waveWidthValue} 100%`,
      animation: `react-loadly-shimmer ${1.5 / (speed || 1)}s ease-in-out infinite`,
    }),
  };

  const renderSkeletonLines = () => {
    // keep special behavior for card & avatar like the previous version
    if (variant === "card") {
      return (
        <div style={skeletonStyle} data-testid={dataTestId ? `${dataTestId}-skeleton` : undefined}>
          {shimmer && (
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: `linear-gradient(90deg, transparent, ${shimmerColor}, transparent)`,
                animation: `react-loadly-shimmer-overlay ${1.5 / (speed || 1)}s ease-in-out infinite`,
              }}
            />
          )}
        </div>
      );
    }

    if (variant === "avatar") {
      return (
        <div style={skeletonStyle} data-testid={dataTestId ? `${dataTestId}-skeleton` : undefined}>
          {shimmer && (
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                borderRadius: "50%",
                background: `linear-gradient(90deg, transparent, ${shimmerColor}, transparent)`,
                animation: `react-loadly-shimmer-overlay ${1.5 / (speed || 1)}s ease-in-out infinite`,
              }}
            />
          )}
        </div>
      );
    }

    // default: render multiple lines (line/text variants)
    return Array.from({ length: lines }, (_, index) => {
      const isLastLine = index === lines - 1;
      const lineWidth = isLastLine && lines > 1 ? "60%" : "100%";

      return (
        <div
          key={index}
          style={{
            ...skeletonStyle,
            width: lineWidth, // for text/line variants we intentionally override width so lines look like text
            marginBottom: index < lines - 1 ? spacingValue : 0,
          }}
          data-testid={dataTestId ? `${dataTestId}-skeleton-${index}` : undefined}
        >
          {shimmer && (
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: `linear-gradient(90deg, transparent, ${shimmerColor}, transparent)`,
                animation: `react-loadly-shimmer-overlay ${1.5 / (speed || 1)}s ease-in-out infinite`,
                animationDelay: `${index * 0.1}s`,
              }}
            />
          )}
        </div>
      );
    });
  };

  return (
    <div
      className={classNameGen("react-loadly react-loadly-skeleton", className)}
      style={containerStyle}
      role="status"
      aria-label={ariaLabel}
      aria-live="polite"
      aria-busy={loading}
      data-testid={dataTestId}
      {...restProps}
    >
      <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>{renderSkeletonLines()}</div>
      {showText && (
        <div className="react-loadly-text" aria-live="polite">
          {loadingText}
        </div>
      )}
      <span className="react-loadly-sr-only">{ariaLabel}</span>
    </div>
  );
};
