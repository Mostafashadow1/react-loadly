import { ISquaresLoaderProps } from "@/@types/interfaces/ISquaresLoaderProps";
import { generateId, getOptimizedAnimationSettings, getSizeValue, mergeProps } from "@/utils";
import { classNameGen } from "@/utils/classNameGen";
import React, { type CSSProperties, FC, useMemo } from "react";
import { useFullscreen } from "@/hooks/useFullscreen";

const defaultProps: Partial<ISquaresLoaderProps> = {
  size: 40,
  color: "var(--react-loadly-color)",
  speed: 1,
  loading: true,
  count: 4,
  "aria-label": "Loading...",
};

export const SquaresLoader: FC<ISquaresLoaderProps> = (userProps) => {
  const props = mergeProps(defaultProps, userProps);
  const {
    size,
    color,
    secondaryColor,
    speed,
    loading,
    className = "",
    style = {},
    count = 4,
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

  const id = useMemo(() => generateId("squares-loader"), []);
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

  const squaresContainerStyle: CSSProperties = {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    gap: "6px",
    width: `${parseFloat(sizeValue) * Math.ceil(Math.sqrt(count))}px`,
    height: `${parseFloat(sizeValue) * Math.ceil(Math.sqrt(count))}px`,
  };

  const squareStyle: CSSProperties = {
    width: sizeValue,
    height: sizeValue,
    backgroundColor: color,
    borderRadius: "8px",
    animation: `react-loadly-squares-rotate ${animationSettings.duration} ease-in-out infinite`,
    animationPlayState: animationSettings.playState,
  };

  // Create squares with different delays and colors
  const squares = Array.from({ length: count }).map((_, index) => {
    const delay = `${index * 0.15}s`;
    const scale = 0.7 + (index % 3) * 0.15;
    const squareColor = secondaryColor && index % 2 === 1 ? secondaryColor : color;
    return (
      <div
        key={index}
        style={{
          ...squareStyle,
          animationDelay: delay,
          backgroundColor: squareColor,
          transform: `scale(${scale})`,
        }}
        data-testid={dataTestId ? `${dataTestId}-square-${index}` : undefined}
      />
    );
  });

  return (
    <div
      className={classNameGen("react-loadly react-loadly-squares", className)}
      style={containerStyle}
      role="status"
      aria-label={ariaLabel}
      aria-live="polite"
      aria-busy={loading}
      data-testid={dataTestId}
      {...restProps}
    >
      <div style={squaresContainerStyle}>{squares}</div>
      {showText && (
        <div className="react-loadly-text" id={`${id}-text`} aria-live="polite">
          {loadingText}
        </div>
      )}
      <span className="react-loadly-sr-only">{ariaLabel}</span>
    </div>
  );
};

SquaresLoader.displayName = "SquaresLoader";
