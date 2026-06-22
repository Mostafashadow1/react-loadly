import { IBounceLoaderProps } from "@/@types/interfaces/IBounceLoaderProps";
import { useFullscreen } from "@/hooks/useFullscreen";
import { generateId, getOptimizedAnimationSettings, getSizeValue, mergeProps } from "@/utils";
import { classNameGen } from "@/utils/classNameGen";
import React, { type CSSProperties, FC, useMemo } from "react";

const defaultProps: Partial<IBounceLoaderProps> = {
  size: 15,
  color: "var(--react-loadly-color)",
  speed: 1,
  loading: true,
  count: 3,
  "aria-label": "Loading...",
};

export const BounceLoader: FC<IBounceLoaderProps> = (userProps) => {
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

  const id = useMemo(() => generateId("bounce-loader"), []);
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

  const bounceContainerStyle: CSSProperties = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "8px",
  };

  const bounceBallStyle: CSSProperties = {
    width: sizeValue,
    height: sizeValue,
    borderRadius: "50%",
    backgroundColor: color,
    animation: `react-loadly-bounce ${animationSettings.duration} ease-in-out infinite`,
    animationPlayState: animationSettings.playState,
  };

  // Create bounce animation delays for each ball with alternating colors
  const balls = Array.from({ length: count }).map((_, index) => {
    const delay = `${index * 0.1}s`;
    const ballColor = secondaryColor && index % 2 === 1 ? secondaryColor : color;
    return (
      <div
        key={index}
        style={{
          ...bounceBallStyle,
          animationDelay: delay,
          backgroundColor: ballColor,
        }}
        data-testid={dataTestId ? `${dataTestId}-ball-${index}` : undefined}
      />
    );
  });

  return (
    <div
      className={classNameGen("react-loadly react-loadly-bounce", className)}
      style={containerStyle}
      role="status"
      aria-label={ariaLabel}
      aria-live="polite"
      aria-busy={loading}
      data-testid={dataTestId}
      {...restProps}
    >
      <div style={bounceContainerStyle}>{balls}</div>
      {showText && (
        <div className="react-loadly-text" id={`${id}-text`} aria-live="polite">
          {loadingText}
        </div>
      )}
      <span className="react-loadly-sr-only">{ariaLabel}</span>
    </div>
  );
};

BounceLoader.displayName = "BounceLoader";

