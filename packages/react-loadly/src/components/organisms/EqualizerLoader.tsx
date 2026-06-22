import React, { type CSSProperties, FC } from "react";
import { IEqualizerLoaderProps } from "@/@types/interfaces/IEqualizerLoaderProps";
import { useFullscreen } from "@/hooks/useFullscreen";
import { getOptimizedAnimationSettings, getSizeValue, mergeProps } from "@/utils";
import { classNameGen } from "@/utils/classNameGen";

const defaultProps: Partial<IEqualizerLoaderProps> = {
  size: 48,
  color: "var(--react-loadly-color)",
  secondaryColor: "var(--react-loadly-secondary-color)",
  speed: 1,
  loading: true,
  count: 5,
  "aria-label": "Loading equalizer...",
};

export const EqualizerLoader: FC<IEqualizerLoaderProps> = (userProps) => {
  const props = mergeProps(defaultProps, userProps);
  const {
    size,
    color,
    secondaryColor,
    speed,
    loading,
    count = 5,
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
  const containerStyle = useFullscreen({
    fullscreen,
    screenWidth,
    screenHeight,
    loaderCenter,
    screenBackground,
    style,
  });

  if (!loading) return null;

  const barCount = Math.max(3, count);
  const barWidth = Math.max(4, numericSize / (barCount * 2.6));
  const gap = Math.max(3, numericSize / 12);

  const equalizerStyle: CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap,
    height: sizeValue,
    minWidth: numericSize,
  };

  const bars = Array.from({ length: barCount }).map((_, index) => {
    const barColor = secondaryColor && index % 2 === 1 ? secondaryColor : color;

    return (
      <div
        key={index}
        style={{
          width: barWidth,
          height: numericSize,
          borderRadius: 999,
          backgroundColor: barColor,
          transformOrigin: "center",
          animation: `react-loadly-equalizer ${animationSettings.duration} ease-in-out infinite`,
          animationDelay: `${index * 0.09}s`,
          animationPlayState: animationSettings.playState,
        }}
        data-testid={dataTestId ? `${dataTestId}-bar-${index}` : undefined}
      />
    );
  });

  return (
    <div
      className={classNameGen("react-loadly react-loadly-equalizer", className)}
      style={containerStyle}
      role="status"
      aria-label={ariaLabel}
      aria-live="polite"
      aria-busy={loading}
      data-testid={dataTestId}
      {...restProps}
    >
      <div style={equalizerStyle}>{bars}</div>
      {showText && <div className="react-loadly-text">{loadingText}</div>}
      <span className="react-loadly-sr-only">{ariaLabel}</span>
    </div>
  );
};

EqualizerLoader.displayName = "EqualizerLoader";
