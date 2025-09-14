import { IGeometricLoaderProps } from "@/@types";
import { generateId, getOptimizedAnimationSettings, getSizeValue, mergeProps } from "@/utils";
import { classNameGen } from "@/utils/classNameGen";
import React, { type CSSProperties, FC, useMemo } from "react";

const defaultProps: Partial<IGeometricLoaderProps> = {
  size: 15,
  color: "var(--react-loadly-color)",
  speed: 1,
  loading: true,
  count: 2,
  "aria-label": "Loading...",
};

export const RotateLoader: FC<IGeometricLoaderProps> = (userProps) => {
  const props = mergeProps(defaultProps, userProps);
  const {
    size,
    color,
    speed,
    loading,
    className = "",
    style = {},
    count = 2,
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

  const id = useMemo(() => generateId("rotate-loader"), []);
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

  const rotateContainerStyle: CSSProperties = {
    position: "relative",
    width: sizeValue,
    height: sizeValue,
  };

  const rotateElementStyle: CSSProperties = {
    position: "absolute",
    width: sizeValue,
    height: sizeValue,
    border: "2px solid transparent",
    borderTopColor: color,
    borderBottomColor: color,
    borderRadius: "50%",
    animation: `react-loadly-ring ${animationSettings.duration} cubic-bezier(0.5, 0, 0.5, 1) infinite`,
    animationPlayState: animationSettings.playState,
    transform: "rotate(0deg)",
  };

  // Create rotating elements
  const elements = Array.from({ length: count }).map((_, index) => {
    const sizeFactor = 1 - index * 0.2;
    const borderWidth = 2 + index;
    const delay = `${index * -0.15}s`;
    return (
      <div
        key={index}
        style={{
          ...rotateElementStyle,
          width: `${parseFloat(sizeValue) * sizeFactor}px`,
          height: `${parseFloat(sizeValue) * sizeFactor}px`,
          borderWidth: `${borderWidth}px`,
          animationDuration: `${parseFloat(animationSettings.duration) * (1 + index * 0.5)}ms`,
          animationDelay: delay,
        }}
        data-testid={dataTestId ? `${dataTestId}-element-${index}` : undefined}
      />
    );
  });

  return (
    <div
      className={classNameGen("react-loadly react-loadly-rotate", className)}
      style={containerStyle}
      role="status"
      aria-label={ariaLabel}
      aria-live="polite"
      aria-busy={loading}
      data-testid={dataTestId}
      {...restProps}
    >
      <div style={rotateContainerStyle}>{elements}</div>
      {showText && (
        <div className="react-loadly-text" id={`${id}-text`} aria-live="polite">
          {loadingText}
        </div>
      )}
      <span className="react-loadly-sr-only">{ariaLabel}</span>
    </div>
  );
};
