import React, { type CSSProperties, FC } from "react";
import { getSizeValue, mergeProps } from "@/utils";
import { IShimmerLoaderProps } from "@/@types/interfaces/IShimmerLoaderProps";

/**
 * ShimmerLoader Component
 *
 * A sophisticated shimmer effect loader that creates a wave-like animation.
 * Perfect for loading states in modern UIs and content areas.
 *
 * @example
 * ```tsx
 * // Basic shimmer
 * <ShimmerLoader />
 *
 * // Custom shimmer with specific dimensions
 * <ShimmerLoader width={300} height={100} />
 *
 * // Multiple shimmer lines
 * <ShimmerLoader lines={3} />
 *
 * // Card shimmer
 * <ShimmerLoader variant="card" />
 * ```
 */

const defaultProps: Partial<IShimmerLoaderProps> = {
  size: 40,
  speed: 1,
  loading: true,
  lines: 1,
  variant: "card",
  color: "#f1f5f9",
  highlightColor: "#e2e8f0",
  shimmerColor: "rgba(255, 255, 255, 0.8)",
  borderRadius: "4px",
  spacing: "8px",
  waveWidth: "200px",
  waveDirection: "left-to-right",
  "aria-label": "Loading content...",
};

export const ShimmerLoader: FC<IShimmerLoaderProps> = (userProps) => {
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
    waveWidth,
    color,
    highlightColor,
    shimmerColor,
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

  const getShimmerDimensions = () => {
    switch (variant) {
      case "avatar":
        return {
          width: width || size || "40px",
          height: height || size || "40px",
          borderRadius: borderRadius || "50%",
        };
      case "card":
        return {
          width: width || "300px",
          height: height || "200px",
          borderRadius: borderRadius || "8px",
        };
      case "text":
        return {
          width: width || "100%",
          height: height || "16px",
          borderRadius: borderRadius || "4px",
        };
      case "wave":
        return {
          width: width || "100%",
          height: height || "20px",
          borderRadius: borderRadius || "10px",
        };
      default:
        return {
          width: width || size || "100%",
          height: height || "16px",
          borderRadius: borderRadius || "4px",
        };
    }
  };

  const shimmerDimensions = getShimmerDimensions();
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

  const shimmerStyle: CSSProperties = {
    width: getSizeValue(shimmerDimensions.width),
    height: getSizeValue(shimmerDimensions.height),
    background: getShimmerGradient(),
    backgroundSize: `${waveWidthValue} 100%`,
    borderRadius: getSizeValue(shimmerDimensions.borderRadius),
    position: "relative",
    overflow: "hidden",
    animation: `react-loadly-shimmer-wave ${2 / (speed || 1)}s ease-in-out infinite`,
  };

  const renderShimmerLines = () => {
    if (variant === "card") {
      return (
        <div style={shimmerStyle} data-testid={dataTestId ? `${dataTestId}-shimmer` : undefined}>
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: `linear-gradient(90deg, transparent, ${shimmerColor}, transparent)`,
              animation: `react-loadly-shimmer-overlay ${2 / (speed || 1)}s ease-in-out infinite`,
            }}
          />
        </div>
      );
    }

    if (variant === "avatar") {
      return (
        <div style={shimmerStyle} data-testid={dataTestId ? `${dataTestId}-shimmer` : undefined}>
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              borderRadius: "50%",
              background: `linear-gradient(90deg, transparent, ${shimmerColor}, transparent)`,
              animation: `react-loadly-shimmer-overlay ${2 / (speed || 1)}s ease-in-out infinite`,
            }}
          />
        </div>
      );
    }

    if (variant === "wave") {
      return (
        <div style={shimmerStyle} data-testid={dataTestId ? `${dataTestId}-shimmer` : undefined}>
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: `linear-gradient(90deg, transparent, ${shimmerColor}, transparent)`,
              animation: `react-loadly-shimmer-wave-overlay ${2 / (speed || 1)}s ease-in-out infinite`,
            }}
          />
        </div>
      );
    }

    return Array.from({ length: lines }, (_, index) => {
      const isLastLine = index === lines - 1;
      const lineWidth = isLastLine && lines > 1 ? "60%" : "100%";

      return (
        <div
          key={index}
          style={{
            ...shimmerStyle,
            width: lineWidth,
            marginBottom: index < lines - 1 ? spacingValue : 0,
          }}
          data-testid={dataTestId ? `${dataTestId}-shimmer-${index}` : undefined}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: `linear-gradient(90deg, transparent, ${shimmerColor}, transparent)`,
              animation: `react-loadly-shimmer-overlay ${2 / (speed || 1)}s ease-in-out infinite`,
              animationDelay: `${index * 0.1}s`,
            }}
          />
        </div>
      );
    });
  };

  return (
    <div
      className={`react-loadly react-loadly-shimmer ${className}`.trim()}
      style={containerStyle}
      role="status"
      aria-label={ariaLabel}
      aria-live="polite"
      aria-busy={loading}
      data-testid={dataTestId}
      {...restProps}
    >
      <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>{renderShimmerLines()}</div>
      {showText && (
        <div className="react-loadly-text" aria-live="polite">
          {loadingText}
        </div>
      )}
      <span className="react-loadly-sr-only">{ariaLabel}</span>
    </div>
  );
};
