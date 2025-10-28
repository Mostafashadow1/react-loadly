import React, { useMemo } from "react";
import { IProgressRingLoaderProps } from "@/@types/interfaces/IProgressRingLoaderProps";
import { LIB_DEFAULTS } from "@/constants/defaults";
import { classNameGen } from "@/utils/classNameGen";
import { getOptimizedAnimationSettings, getSizeValue, mergeProps } from "@/utils";

const DEFAULT_PROPS: Partial<IProgressRingLoaderProps> = {
  progress: null,
  thickness: 4,
};

export const ProgressRingLoader: React.FC<IProgressRingLoaderProps> = (props) => {
  const mergedProps = mergeProps(LIB_DEFAULTS, props);
  const {
    progress = 1,
    thickness = 4,
    size = 40,
    color = "var(--react-loadly-color)",
    secondaryColor,
    speed = 1,
    loading = true,
    className = "",
    style = {},
    showText,
    loadingText = "Loading...",
    "aria-label": ariaLabel = "Loading...",
    "data-testid": dataTestId,
    fullscreen,
    screenWidth,
    screenHeight,
    loaderCenter,
    screenBackground,
    ...restProps
  } = mergeProps(DEFAULT_PROPS, mergedProps);

  const animationSettings = getOptimizedAnimationSettings(speed);
  const sizeValue = getSizeValue(size);
  const numSize = useMemo(() => {
    if (typeof size === "number") return size;
    const parsed = parseFloat(sizeValue);
    return isNaN(parsed) ? 40 : parsed;
  }, [size, sizeValue]);

  const radius = useMemo(() => {
    return (numSize - thickness) / 2;
  }, [numSize, thickness]);

  const circumference = useMemo(() => 2 * Math.PI * radius, [radius]);

  const strokeDashoffset = useMemo(() => {
    if (progress === null || progress === undefined) return circumference;
    // Ensure progress is between 0 and 100
    const clampedProgress = Math.max(0, Math.min(100, progress));
    return circumference - (clampedProgress / 100) * circumference;
  }, [progress, circumference]);

  if (!loading) return null;

  const containerStyle: React.CSSProperties = {
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

  const svgStyle: React.CSSProperties = {
    width: sizeValue,
    height: sizeValue,
    transform: "rotate(-90deg)",
    willChange: "transform",
  };

  const circleStyle: React.CSSProperties = {
    fill: "none",
    stroke: color,
    strokeWidth: thickness,
    strokeLinecap: "round",
    transformOrigin: "center",
    willChange: "transform, opacity",
  };

  const backgroundCircleStyle: React.CSSProperties = {
    ...circleStyle,
    stroke: secondaryColor || "var(--react-loadly-secondary-color, rgba(0,0,0,0.1))",
    opacity: 0.2,
  };

  const progressCircleStyle: React.CSSProperties = {
    ...circleStyle,
    strokeDasharray: circumference,
    strokeDashoffset: strokeDashoffset || 0,
    transition: progress !== null ? "stroke-dashoffset 0.3s ease" : undefined,
    animationPlayState: animationSettings.playState,
  };

  return (
    <div
      className={classNameGen("react-loadly react-loadly-progress-ring", className)}
      style={containerStyle}
      role="status"
      aria-label={ariaLabel}
      aria-live="polite"
      aria-busy={loading}
      aria-valuemin={progress !== null ? 0 : undefined}
      aria-valuemax={progress !== null ? 100 : undefined}
      aria-valuenow={progress !== null ? progress : undefined}
      data-testid={dataTestId}
      {...restProps}
    >
      <svg
        style={svgStyle}
        viewBox={`0 0 ${numSize} ${numSize}`}
        data-testid={dataTestId ? `${dataTestId}-svg` : undefined}
        className="react-loadly-progress-ring-svg"
      >
        {/* Background circle */}
        <circle
          cx={numSize / 2}
          cy={numSize / 2}
          r={radius}
          style={backgroundCircleStyle}
          data-testid={dataTestId ? `${dataTestId}-background-circle` : undefined}
          className="react-loadly-progress-ring-background"
        />

        {/* Progress circle */}
        <circle
          cx={numSize / 2}
          cy={numSize / 2}
          r={radius}
          style={progressCircleStyle}
          data-testid={dataTestId ? `${dataTestId}-progress-circle` : undefined}
          className="react-loadly-progress-ring-progress"
        />
      </svg>

      {showText && (
        <div className="react-loadly-text" aria-live="polite" data-testid={dataTestId ? `${dataTestId}-text` : undefined}>
          {loadingText}
        </div>
      )}

      <span className="react-loadly-sr-only">{ariaLabel}</span>
    </div>
  );
};
