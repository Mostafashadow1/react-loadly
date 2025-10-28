import { ISnakeLoaderProps } from "@/@types/interfaces/ISnakeLoaderProps";
import { generateId, getOptimizedAnimationSettings, getSizeValue, mergeProps } from "@/utils";
import { classNameGen } from "@/utils/classNameGen";
import React, { type CSSProperties, FC, useMemo } from "react";

const defaultProps: Partial<ISnakeLoaderProps> = {
  size: 60,
  color: "var(--react-loadly-color)",
  speed: 1,
  loading: true,
  count: 6,
  "aria-label": "Loading...",
};

export const SnakeLoader: FC<ISnakeLoaderProps> = (userProps) => {
  const props = mergeProps(defaultProps, userProps);
  const {
    size,
    color,
    secondaryColor,
    speed,
    loading,
    className = "",
    style = {},
    count = 6,
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

  const id = useMemo(() => generateId("snake-loader"), []);
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

  const snakeContainerStyle: CSSProperties = {
    position: "relative",
    display: "inline-flex",
    justifyContent: "center",
    alignItems: "center",
    width: sizeValue,
    height: sizeValue,
  };

  const segmentSize = parseFloat(sizeValue) * 0.15;
  const pathLength = parseFloat(sizeValue) * 0.7;

  const segments = Array.from({ length: count }).map((_, index) => {
    const delay = (index * 0.1) / (speed ?? 1);
    const segmentColor = secondaryColor && index % 2 === 1 ? secondaryColor : color;

    return (
      <div
        key={index}
        style={{
          position: "absolute",
          width: `${segmentSize}px`,
          height: `${segmentSize}px`,
          borderRadius: "50%",
          backgroundColor: segmentColor,
          boxShadow: `0 0 ${segmentSize / 2}px ${segmentColor}`,
          left: "50%",
          top: "50%",
          animation: `react-loadly-snake-slither-${id} ${animationSettings.duration} ease-in-out infinite`,
          animationDelay: `${delay}s`,
          animationPlayState: animationSettings.playState,
          transform: "translate(-50%, -50%)",
        }}
        data-testid={dataTestId ? `${dataTestId}-segment-${index}` : undefined}
      />
    );
  });

  return (
    <>
      <style>{`
        @keyframes react-loadly-snake-slither-${id} {
          0% {
            transform: translate(-50%, -50%) translateX(${-pathLength}px) translateY(${Math.sin(0 * Math.PI * 4) * 20}px);
            opacity: 0.3;
          }
          25% {
            transform: translate(-50%, -50%) translateX(${-pathLength * 0.5}px) translateY(${Math.sin(0.25 * Math.PI * 4) * 20}px);
            opacity: 0.7;
          }
          50% {
            transform: translate(-50%, -50%) translateX(0px) translateY(${Math.sin(0.5 * Math.PI * 4) * 20}px);
            opacity: 1;
          }
          75% {
            transform: translate(-50%, -50%) translateX(${pathLength * 0.5}px) translateY(${Math.sin(0.75 * Math.PI * 4) * 20}px);
            opacity: 0.7;
          }
          100% {
            transform: translate(-50%, -50%) translateX(${pathLength}px) translateY(${Math.sin(1 * Math.PI * 4) * 20}px);
            opacity: 0.3;
          }
        }
      `}</style>
      <div
        className={classNameGen("react-loadly react-loadly-snake", className)}
        style={containerStyle}
        role="status"
        aria-label={ariaLabel}
        aria-live="polite"
        aria-busy={loading}
        data-testid={dataTestId}
        {...restProps}
      >
        <div style={snakeContainerStyle}>{segments}</div>
        {showText && (
          <div className="react-loadly-text" id={`${id}-text`} aria-live="polite">
            {loadingText}
          </div>
        )}
        <span className="react-loadly-sr-only">{ariaLabel}</span>
      </div>
    </>
  );
};
