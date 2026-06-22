import React, { type CSSProperties, FC } from "react";
import { IOrbitDotsLoaderProps } from "@/@types/interfaces/IOrbitDotsLoaderProps";
import { useFullscreen } from "@/hooks/useFullscreen";
import { getOptimizedAnimationSettings, getSizeValue, mergeProps } from "@/utils";
import { classNameGen } from "@/utils/classNameGen";

const defaultProps: Partial<IOrbitDotsLoaderProps> = {
  size: 56,
  color: "var(--react-loadly-color)",
  secondaryColor: "var(--react-loadly-secondary-color)",
  speed: 1,
  loading: true,
  count: 4,
  "aria-label": "Loading orbit dots...",
};

export const OrbitDotsLoader: FC<IOrbitDotsLoaderProps> = (userProps) => {
  const props = mergeProps(defaultProps, userProps);
  const {
    size,
    color,
    secondaryColor,
    speed,
    loading,
    count = 4,
    className = "",
    style = {},
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

  const sizeValue = getSizeValue(size);
  const numericSize = typeof size === "number" ? size : parseFloat(sizeValue) || 56;
  const animationSettings = getOptimizedAnimationSettings(speed);
  const containerStyle = useFullscreen({
    fullscreen,
    screenWidth,
    screenHeight,
    loaderCenter,
    screenBackground,
    style,
  });

  if (!loading) return null;

  const dotCount = Math.max(2, count);
  const dotSize = Math.max(5, numericSize * 0.12);
  const orbitSize = numericSize - dotSize;

  const orbitStyle: CSSProperties = {
    position: "relative",
    width: sizeValue,
    height: sizeValue,
    animation: `react-loadly-orbit-dots ${animationSettings.duration} linear infinite`,
    animationPlayState: animationSettings.playState,
  };

  const dots = Array.from({ length: dotCount }).map((_, index) => {
    const angle = (360 / dotCount) * index;
    const dotColor = secondaryColor && index % 2 === 1 ? secondaryColor : color;

    return (
      <div
        key={index}
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: dotSize,
          height: dotSize,
          borderRadius: "50%",
          backgroundColor: dotColor,
          boxShadow: `0 0 ${Math.max(8, dotSize * 1.8)}px ${dotColor}`,
          transform: `rotate(${angle}deg) translate(${orbitSize / 2}px) rotate(-${angle}deg)`,
          transformOrigin: "0 0",
          animation: `react-loadly-orbit-dot-pulse ${animationSettings.duration} ease-in-out infinite`,
          animationDelay: `${index * 0.12}s`,
          animationPlayState: animationSettings.playState,
        }}
        data-testid={dataTestId ? `${dataTestId}-dot-${index}` : undefined}
      />
    );
  });

  return (
    <div
      className={classNameGen("react-loadly react-loadly-orbit-dots", className)}
      style={containerStyle}
      role="status"
      aria-label={ariaLabel}
      aria-live="polite"
      aria-busy={loading}
      data-testid={dataTestId}
      {...restProps}
    >
      <div style={orbitStyle}>{dots}</div>
      {showText && <div className="react-loadly-text">{loadingText}</div>}
      <span className="react-loadly-sr-only">{ariaLabel}</span>
    </div>
  );
};

OrbitDotsLoader.displayName = "OrbitDotsLoader";
