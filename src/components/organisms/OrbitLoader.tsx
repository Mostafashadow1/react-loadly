import { IOrbitLoaderProps } from "@/@types/interfaces/IOrbitLoaderProps";
import { generateId, getOptimizedAnimationSettings, getSizeValue, mergeProps } from "@/utils";
import { classNameGen } from "@/utils/classNameGen";
import React, { type CSSProperties, FC, useMemo } from "react";

const defaultProps: Partial<IOrbitLoaderProps> = {
  size: 60,
  color: "var(--react-loadly-color)",
  speed: 1,
  loading: true,
  count: 3,
  "aria-label": "Loading...",
};

export const OrbitLoader: FC<IOrbitLoaderProps> = (userProps) => {
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

  const id = useMemo(() => generateId("orbit-loader"), []);
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

  const orbitContainerStyle: CSSProperties = {
    position: "relative",
    display: "inline-flex",
    justifyContent: "center",
    alignItems: "center",
    width: sizeValue,
    height: sizeValue,
  };

  const centerDotStyle: CSSProperties = {
    position: "absolute",
    width: "10px",
    height: "10px",
    borderRadius: "50%",
    backgroundColor: color,
    zIndex: 10,
    boxShadow: `0 0 8px ${color}`,
  };

  // Create orbiting elements
  const orbitElements = Array.from({ length: count }).map((_, index) => {
    const orbitRadius = parseFloat(sizeValue) * 0.25;
    const planetSize = 8 + index * 2;
    const planetColor = secondaryColor && index % 2 === 1 ? secondaryColor : color;
    const initialAngle = (360 / count) * index;

    return (
      <div
        key={index}
        style={{
          position: "absolute",
          width: `${orbitRadius * 2}px`,
          height: `${orbitRadius * 2}px`,
          top: `calc(50% - ${orbitRadius}px)`,
          left: `calc(50% - ${orbitRadius}px)`,
          animation: `react-loadly-spin ${animationSettings.duration} linear infinite`,
          animationDelay: `${index * 0.2}s`,
          animationPlayState: animationSettings.playState,
          transform: `rotate(${initialAngle}deg)`,
        }}
        data-testid={dataTestId ? `${dataTestId}-orbit-${index}` : undefined}
      >
        <div
          style={{
            position: "absolute",
            width: `${planetSize}px`,
            height: `${planetSize}px`,
            borderRadius: "50%",
            backgroundColor: planetColor,
            top: 0,
            left: "50%",
            marginLeft: `-${planetSize / 2}px`,
            boxShadow: `0 0 6px ${planetColor}`,
          }}
        />
      </div>
    );
  });

  return (
    <div
      className={classNameGen("react-loadly react-loadly-orbit", className)}
      style={containerStyle}
      role="status"
      aria-label={ariaLabel}
      aria-live="polite"
      aria-busy={loading}
      data-testid={dataTestId}
      {...restProps}
    >
      <div style={orbitContainerStyle}>
        <div style={centerDotStyle}></div>
        {orbitElements}
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
