import { IDotsLoaderProps } from "@/@types/interfaces/IDotsLoaderProps";
import { generateId, getOptimizedAnimationSettings, getSizeValue, mergeProps } from "@/utils";
import { classNameGen } from "@/utils/classNameGen";
import React, { type CSSProperties, FC, useMemo } from "react";

const defaultProps: Partial<IDotsLoaderProps> = {
  size: 12,
  color: "var(--react-loadly-color)",
  speed: 1,
  loading: true,
  count: 3,
  "aria-label": "Loading...",
};

export const DotsLoader: FC<IDotsLoaderProps> = (userProps) => {
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
    ...restProps
  } = props;

  const id = useMemo(() => generateId("dots-loader"), []);
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

  const dotsContainerStyle: CSSProperties = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "6px",
  };

  const dotStyle: CSSProperties = {
    width: sizeValue,
    height: sizeValue,
    borderRadius: "50%",
    backgroundColor: color,
    animation: `react-loadly-dots ${animationSettings.duration} ease-in-out infinite`,
    animationPlayState: animationSettings.playState,
  };

  // Create dots with different animation delays and colors
  const dots = Array.from({ length: count }).map((_, index) => {
    const delay = `${index * 0.2}s`;
    const dotColor = secondaryColor && index % 2 === 1 ? secondaryColor : color;
    return (
      <div
        key={index}
        style={{
          ...dotStyle,
          animationDelay: delay,
          backgroundColor: dotColor,
        }}
        data-testid={dataTestId ? `${dataTestId}-dot-${index}` : undefined}
      />
    );
  });

  return (
    <div
      className={classNameGen("react-loadly react-loadly-dots", className)}
      style={containerStyle}
      role="status"
      aria-label={ariaLabel}
      aria-live="polite"
      aria-busy={loading}
      data-testid={dataTestId}
      {...restProps}
    >
      <div style={dotsContainerStyle}>{dots}</div>
      {showText && (
        <div className="react-loadly-text" id={`${id}-text`} aria-live="polite">
          {loadingText}
        </div>
      )}
      <span className="react-loadly-sr-only">{ariaLabel}</span>
    </div>
  );
};
