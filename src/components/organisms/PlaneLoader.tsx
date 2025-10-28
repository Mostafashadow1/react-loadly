import { IPlaneLoaderProps } from "@/@types/interfaces/IPlaneLoaderProps";
import { generateId, getOptimizedAnimationSettings, getSizeValue, mergeProps } from "@/utils";
import { classNameGen } from "@/utils/classNameGen";
import React, { type CSSProperties, FC, useMemo } from "react";

const defaultProps: Partial<IPlaneLoaderProps> = {
  size: 50,
  color: "var(--react-loadly-color)",
  speed: 1,
  loading: true,
  "aria-label": "Loading...",
};

export const PlaneLoader: FC<IPlaneLoaderProps> = (userProps) => {
  const props = mergeProps(defaultProps, userProps);
  const {
    size,
    color,
    secondaryColor,
    speed,
    loading,
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

  const id = useMemo(() => generateId("plane-loader"), []);
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

  const planeContainerStyle: CSSProperties = {
    perspective: "200px",
    display: "inline-flex",
    justifyContent: "center",
    alignItems: "center",
    width: sizeValue,
    height: sizeValue,
  };

  const planeStyle: CSSProperties = {
    width: sizeValue,
    height: sizeValue,
    position: "relative",
    transformStyle: "preserve-3d",
    animation: `react-loadly-plane-rotate ${animationSettings.duration} ease-in-out infinite`,
    animationPlayState: animationSettings.playState,
  };

  const faceStyle: CSSProperties = {
    position: "absolute",
    width: "100%",
    height: "100%",
    borderRadius: "8px",
    border: `2px solid ${color}`,
    backgroundColor: secondaryColor || "transparent",
  };

  return (
    <div
      className={classNameGen("react-loadly react-loadly-plane", className)}
      style={containerStyle}
      role="status"
      aria-label={ariaLabel}
      aria-live="polite"
      aria-busy={loading}
      data-testid={dataTestId}
      {...restProps}
    >
      <div style={planeContainerStyle}>
        <div style={planeStyle}>
          {/* Front face */}
          <div
            style={{
              ...faceStyle,
              transform: "rotateY(0deg) translateZ(10px)",
            }}
          />
          {/* Back face */}
          <div
            style={{
              ...faceStyle,
              transform: "rotateY(180deg) translateZ(10px)",
            }}
          />
          {/* Right face */}
          <div
            style={{
              ...faceStyle,
              transform: "rotateY(90deg) translateZ(10px)",
            }}
          />
          {/* Left face */}
          <div
            style={{
              ...faceStyle,
              transform: "rotateY(-90deg) translateZ(10px)",
            }}
          />
          {/* Top face */}
          <div
            style={{
              ...faceStyle,
              transform: "rotateX(90deg) translateZ(10px)",
            }}
          />
          {/* Bottom face */}
          <div
            style={{
              ...faceStyle,
              transform: "rotateX(-90deg) translateZ(10px)",
            }}
          />
        </div>
      </div>
      {showText && (
        <div className="react-loadly-text" id={`${id}-text`} aria-live="polite">
          {loadingText}
        </div>
      )}
      <span className="react-loadly-sr-only">{ariaLabel}</span>
    </div>
  );
};
