import React, { type CSSProperties, FC } from "react";
import { ISignalLoaderProps } from "@/@types/interfaces/ISignalLoaderProps";
import { useFullscreen } from "@/hooks/useFullscreen";
import { getOptimizedAnimationSettings, getSizeValue, mergeProps } from "@/utils";
import { classNameGen } from "@/utils/classNameGen";

const defaultProps: Partial<ISignalLoaderProps> = {
  size: 48,
  color: "var(--react-loadly-color)",
  secondaryColor: "var(--react-loadly-secondary-color)",
  speed: 1,
  loading: true,
  count: 4,
  "aria-label": "Loading signal...",
};

export const SignalLoader: FC<ISignalLoaderProps> = (userProps) => {
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
  const numericSize = typeof size === "number" ? size : parseFloat(sizeValue) || 48;
  const animationSettings = getOptimizedAnimationSettings(speed);
  const containerStyle = useFullscreen({ fullscreen, screenWidth, screenHeight, loaderCenter, screenBackground, style });

  if (!loading) return null;

  const bars = Array.from({ length: count }).map((_, index) => {
    const height = numericSize * (0.35 + (index / Math.max(count - 1, 1)) * 0.65);
    const barStyle: CSSProperties = {
      width: Math.max(4, numericSize / 10),
      height,
      borderRadius: 999,
      backgroundColor: index === count - 1 && secondaryColor ? secondaryColor : color,
      animation: `react-loadly-signal ${animationSettings.duration} ease-in-out infinite`,
      animationDelay: `${index * 0.12}s`,
      animationPlayState: animationSettings.playState,
      transformOrigin: "bottom",
    };
    return <div key={index} style={barStyle} data-testid={dataTestId ? `${dataTestId}-bar-${index}` : undefined} />;
  });

  return (
    <div
      className={classNameGen("react-loadly react-loadly-signal", className)}
      style={containerStyle}
      role="status"
      aria-label={ariaLabel}
      aria-live="polite"
      aria-busy={loading}
      data-testid={dataTestId}
      {...restProps}
    >
      <div style={{ display: "flex", alignItems: "flex-end", gap: Math.max(3, numericSize / 12), height: sizeValue }}>{bars}</div>
      {showText && <div className="react-loadly-text">{loadingText}</div>}
      <span className="react-loadly-sr-only">{ariaLabel}</span>
    </div>
  );
};

SignalLoader.displayName = "SignalLoader";
