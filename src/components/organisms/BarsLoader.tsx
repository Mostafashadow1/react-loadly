import { IGeometricLoaderProps } from "@/@types";
import { generateId, getOptimizedAnimationSettings, getSizeValue, mergeProps } from "@/utils";
import React, { type CSSProperties, FC, useMemo } from "react";

const defaultProps: Partial<IGeometricLoaderProps> = {
  size: 20,
  color: "var(--react-loadly-color)",
  speed: 1,
  loading: true,
  count: 5,
  "aria-label": "Loading...",
};

export const BarsLoader: FC<IGeometricLoaderProps> = (userProps) => {
  const props = mergeProps(defaultProps, userProps);
  const {
    size,
    color,
    speed,
    loading,
    className = "",
    style = {},
    count = 5,
    showText,
    loadingText = "Loading...",
    "aria-label": ariaLabel,
    "data-testid": dataTestId,
    fullscreen,
    screenWidth,
    screenHeight,
    loaderCenter,
    screenBackground,
    ...restProps
  } = props;

  const id = useMemo(() => generateId("bars-loader"), []);
  const sizeValue = getSizeValue(size);
  const animationSettings = getOptimizedAnimationSettings(speed);

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

  const barsContainerStyle: CSSProperties = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "4px",
  };

  const barStyle: CSSProperties = {
    width: "4px",
    height: sizeValue,
    backgroundColor: color,
    borderRadius: "2px",
    animation: `react-loadly-bars ${animationSettings.duration} ease-in-out infinite`,
    animationPlayState: animationSettings.playState,
  };

  // Create bars with different animation delays
  const bars = Array.from({ length: count }).map((_, index) => {
    const delay = `${index * 0.1}s`;
    const heightFactor = 0.5 + (index % 3) * 0.25; // Vary heights for visual interest
    return (
      <div
        key={index}
        style={{
          ...barStyle,
          animationDelay: delay,
          height: `${parseFloat(sizeValue) * heightFactor}px`,
        }}
        data-testid={dataTestId ? `${dataTestId}-bar-${index}` : undefined}
      />
    );
  });

  return (
    <div
      className={`react-loadly react-loadly-bars  ${className}`.trim()}
      style={containerStyle}
      role="status"
      aria-label={ariaLabel}
      aria-live="polite"
      aria-busy={loading}
      data-testid={dataTestId}
      {...restProps}
    >
      <div style={barsContainerStyle}>{bars}</div>
      {showText && (
        <div className="react-loadly-text" id={`${id}-text`} aria-live="polite">
          {loadingText}
        </div>
      )}
      <span className="react-loadly-sr-only">{ariaLabel}</span>
    </div>
  );
};