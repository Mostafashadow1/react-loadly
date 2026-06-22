import { IStairLoaderProps } from "@/@types/interfaces/IStairLoaderProps";
import { generateId, getOptimizedAnimationSettings, getSizeValue, mergeProps } from "@/utils";
import { classNameGen } from "@/utils/classNameGen";
import React, { type CSSProperties, FC, useMemo } from "react";
import { useFullscreen } from "@/hooks/useFullscreen";

const defaultProps: Partial<IStairLoaderProps> = {
  size: 35,
  color: "var(--react-loadly-color)",
  speed: 1,
  loading: true,
  count: 5,
  "aria-label": "Loading...",
};

export const StairLoader: FC<IStairLoaderProps> = (userProps) => {
  const props = mergeProps(defaultProps, userProps);
  const {
    size,
    color,
    secondaryColor,
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

  const id = useMemo(() => generateId("stair-loader"), []);
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

  // Calculate size-based scaling factors (based on default size of 35)
  const sizeNum = parseFloat(sizeValue);
  const baseWidth = sizeNum * 0.57; // 20px at default size 35
  const widthIncrement = sizeNum * 0.23; // 8px at default size 35
  const stepHeight = sizeNum * 0.17; // 6px at default size 35
  const gapSize = sizeNum * 0.11; // 4px at default size 35

  const stairContainerStyle: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    gap: `${gapSize}px`,
  };

  // Create stair steps with cascade effect
  const steps = Array.from({ length: count }).map((_, index) => {
    const delay = `${index * 0.1}s`;
    const width = `${baseWidth + index * widthIncrement}px`;
    const stepColor = secondaryColor && index % 2 === 1 ? secondaryColor : color;
    return (
      <div
        key={index}
        style={{
          width,
          height: `${stepHeight}px`,
          backgroundColor: stepColor,
          borderRadius: "4px",
          animation: `react-loadly-stair-cascade ${animationSettings.duration} ease-in-out infinite`,
          animationDelay: delay,
          animationPlayState: animationSettings.playState,
        }}
        data-testid={dataTestId ? `${dataTestId}-step-${index}` : undefined}
      />
    );
  });

  return (
    <div
      className={classNameGen("react-loadly react-loadly-stair", className)}
      style={containerStyle}
      role="status"
      aria-label={ariaLabel}
      aria-live="polite"
      aria-busy={loading}
      data-testid={dataTestId}
      {...restProps}
    >
      <div style={stairContainerStyle}>{steps}</div>
      {showText && (
        <div className="react-loadly-text" id={`${id}-text`} aria-live="polite">
          {loadingText}
        </div>
      )}
      <span className="react-loadly-sr-only">{ariaLabel}</span>
    </div>
  );
};

StairLoader.displayName = "StairLoader";
