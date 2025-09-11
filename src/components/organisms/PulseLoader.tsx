import { IGeometricLoaderProps } from "@/@types";
import { generateId, getSizeValue, mergeProps } from "@/utils";
import React, { type CSSProperties, FC, useMemo } from "react";
import { DotCluster } from "../molecules";

const defaultProps: Partial<IGeometricLoaderProps> = {
  size: 40,
  color: "var(--react-loadly-color)",
  speed: 1,
  loading: true,
  count: 3,
  "aria-label": "Loading...",
};

export const PulseLoader: FC<IGeometricLoaderProps> = (userProps) => {
  const props = mergeProps(defaultProps, userProps);
  const {
    size,
    color,
    secondaryColor,
    speed,
    loading,
    count,
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

  const id = useMemo(() => generateId("pulse-loader"), []);
  const dotSize = useMemo(() => {
    const sizeNum = typeof size === "number" ? size : parseInt(getSizeValue(size));
    return Math.max(sizeNum / 5, 6); // Ensure minimum dot size
  }, [size]);

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

  return (
    <div
      className={`react-loadly react-loadly-pulse  ${className}`.trim()}
      style={containerStyle}
      role="status"
      aria-label={ariaLabel}
      aria-live="polite"
      aria-busy={loading}
      data-testid={dataTestId}
      {...restProps}
    >
      <DotCluster
        count={count}
        dotSize={dotSize}
        color={color}
        secondaryColor={secondaryColor}
        speed={speed}
        arrangement="linear"
        animationType="pulse"
        spacing={dotSize / 2}
        data-testid={dataTestId ? `${dataTestId}-dots` : undefined}
      />
      {showText && (
        <div className="react-loadly-text" id={`${id}-text`} aria-live="polite">
          {loadingText}
        </div>
      )}
      <span className="react-loadly-sr-only">{ariaLabel}</span>
    </div>
  );
};