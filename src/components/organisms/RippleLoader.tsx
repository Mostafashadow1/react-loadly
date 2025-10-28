import { IRippleLoaderProps } from "@/@types/interfaces/IRippleLoaderProps";
import { generateId, getOptimizedAnimationSettings, getSizeValue, mergeProps } from "@/utils";
import { classNameGen } from "@/utils/classNameGen";
import React, { type CSSProperties, FC, useMemo } from "react";

const defaultProps: Partial<IRippleLoaderProps> = {
  size: 50,
  color: "var(--react-loadly-color)",
  speed: 1,
  loading: true,
  count: 3,
  "aria-label": "Loading...",
};

export const RippleLoader: FC<IRippleLoaderProps> = (userProps) => {
  const props = mergeProps(defaultProps, userProps);
  const {
    size,
    color,
    secondaryColor,
    speed,
    loading,
    className = "",
    style = {},
    count = 3,
    showText,
    loadingText = "Loading...",
    "aria-label": ariaLabel,
    "data-testid": dataTestId,
    fullscreen,
    screenWidth,
    screenHeight,
    loaderCenter,
    screenBackground,
    borderWidth = 2,
    ...restProps
  } = props;

  const id = useMemo(() => generateId("ripple-loader"), []);
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

  const rippleContainerStyle: CSSProperties = {
    position: "relative",
    display: "inline-flex",
    justifyContent: "center",
    alignItems: "center",
    width: sizeValue,
    height: sizeValue,
  };

  const centerDotStyle: CSSProperties = {
    position: "absolute",
    width: "8px",
    height: "8px",
    borderRadius: "50%",
    backgroundColor: color,
    zIndex: 10,
  };

  // Create ripple rings
  const ripples = Array.from({ length: count }).map((_, index) => {
    const delay = `${index * 0.2}s`;
    const borderColor = secondaryColor && index % 2 === 1 ? secondaryColor : color;
    return (
      <div
        key={index}
        style={{
          position: "absolute",
          width: sizeValue,
          height: sizeValue,
          border: `${borderWidth}px solid ${borderColor}`,
          borderRadius: "50%",
          animation: `react-loadly-ripple ${animationSettings.duration} ease-out infinite`,
          animationDelay: delay,
          animationPlayState: animationSettings.playState,
        }}
        data-testid={dataTestId ? `${dataTestId}-ripple-${index}` : undefined}
      />
    );
  });

  return (
    <div
      className={classNameGen("react-loadly react-loadly-ripple", className)}
      style={containerStyle}
      role="status"
      aria-label={ariaLabel}
      aria-live="polite"
      aria-busy={loading}
      data-testid={dataTestId}
      {...restProps}
    >
      <div style={rippleContainerStyle}>
        <div style={centerDotStyle}></div>
        {ripples}
      </div>
      {showText && (
        <div className="react-loadly-text" id={`${id}-text`} aria-live="polite">
          {loadingText}
        </div>
      )}
      <span className="react-loadly-sr-only">{ariaLabel}</span>
    </div>
  );
};
