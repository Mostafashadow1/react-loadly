import { IGeometricLoaderProps } from "@/@types";
import { generateId, getOptimizedAnimationSettings, getSizeValue, mergeProps } from "@/utils";
import { classNameGen } from "@/utils/classNameGen";
import React, { type CSSProperties, FC, useRef } from "react";
import { useFullscreen } from "@/hooks/useFullscreen";

const defaultProps: Partial<IGeometricLoaderProps> = {
  size: 40,
  color: "var(--react-loadly-color)",
  speed: 1,
  loading: true,
  borderWidth: 4,
  "aria-label": "Loading...",
};

export const SpinLoader: FC<IGeometricLoaderProps> = (userProps) => {
  const props = mergeProps(defaultProps, userProps);
  const {
    size,
    color,
    speed,
    loading,
    className = "",
    style = {},
    borderWidth,
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

  // Use useRef instead of useMemo for better compatibility
  const idRef = useRef<string>(generateId("spin-loader"));
  const sizeValue = getSizeValue(size);
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

  const spinnerStyle: CSSProperties = {
    width: sizeValue,
    height: sizeValue,
    border: `${borderWidth}px solid transparent`,
    borderTop: `${borderWidth}px solid ${color}`,
    borderRadius: "50%",
    animation: `react-loadly-spin ${animationSettings.duration} linear infinite`,
    animationPlayState: animationSettings.playState,
  };

  return (
    <div
      className={classNameGen("react-loadly react-loadly-spin", className)}
      style={containerStyle}
      role="status"
      aria-label={ariaLabel}
      aria-live="polite"
      aria-busy={loading}
      data-testid={dataTestId}
      {...restProps}
    >
      <div style={spinnerStyle} data-testid={dataTestId ? `${dataTestId}-spinner` : undefined} />
      {showText && (
        <div className="react-loadly-text" id={`${idRef.current}-text`} aria-live="polite">
          {loadingText}
        </div>
      )}
      <span className="react-loadly-sr-only">{ariaLabel}</span>
    </div>
  );
};

SpinLoader.displayName = "SpinLoader";
