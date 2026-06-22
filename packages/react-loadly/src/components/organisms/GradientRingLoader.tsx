import React, { type CSSProperties, FC } from "react";
import { IGradientRingLoaderProps } from "@/@types/interfaces/IGradientRingLoaderProps";
import { useFullscreen } from "@/hooks/useFullscreen";
import { getOptimizedAnimationSettings, getSizeValue, mergeProps } from "@/utils";
import { classNameGen } from "@/utils/classNameGen";

const defaultProps: Partial<IGradientRingLoaderProps> = {
  size: 48,
  color: "var(--react-loadly-color)",
  secondaryColor: "var(--react-loadly-secondary-color)",
  speed: 1,
  loading: true,
  thickness: 4,
  "aria-label": "Loading...",
};

export const GradientRingLoader: FC<IGradientRingLoaderProps> = (userProps) => {
  const props = mergeProps(defaultProps, userProps);
  const {
    size,
    color,
    secondaryColor,
    speed,
    loading,
    thickness = 4,
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
  const animationSettings = getOptimizedAnimationSettings(speed);
  const containerStyle = useFullscreen({ fullscreen, screenWidth, screenHeight, loaderCenter, screenBackground, style });

  if (!loading) return null;

  const ringStyle: CSSProperties = {
    width: sizeValue,
    height: sizeValue,
    borderRadius: "50%",
    padding: thickness,
    background: `conic-gradient(from 0deg, ${color}, ${secondaryColor}, transparent 72%)`,
    animation: `react-loadly-spin ${animationSettings.duration} linear infinite`,
    animationPlayState: animationSettings.playState,
    boxSizing: "border-box",
  };

  const innerStyle: CSSProperties = {
    width: "100%",
    height: "100%",
    borderRadius: "50%",
    background: "var(--react-loadly-background, transparent)",
  };

  return (
    <div
      className={classNameGen("react-loadly react-loadly-gradient-ring", className)}
      style={containerStyle}
      role="status"
      aria-label={ariaLabel}
      aria-live="polite"
      aria-busy={loading}
      data-testid={dataTestId}
      {...restProps}
    >
      <div style={ringStyle} data-testid={dataTestId ? `${dataTestId}-ring` : undefined}>
        <div style={innerStyle} />
      </div>
      {showText && <div className="react-loadly-text">{loadingText}</div>}
      <span className="react-loadly-sr-only">{ariaLabel}</span>
    </div>
  );
};

GradientRingLoader.displayName = "GradientRingLoader";
