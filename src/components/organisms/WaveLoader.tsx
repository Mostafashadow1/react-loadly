import { IGeometricLoaderProps } from "@/@types";
import { generateId, getSizeValue, mergeProps } from "@/utils";
import React, { type CSSProperties, FC, useMemo } from "react";
import { LineGroup } from "../molecules";

const defaultProps: Partial<IGeometricLoaderProps> = {
  size: 40,
  color: "var(--react-loadly-color)",
  speed: 1,
  loading: true,
  count: 5,
  "aria-label": "Loading...",
};

export const WaveLoader: FC<IGeometricLoaderProps> = (userProps) => {
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

  const id = useMemo(() => generateId("wave-loader"), []);
  const lineSpecs = useMemo(() => {
    const sizeNum = typeof size === "number" ? size : parseInt(getSizeValue(size));
    return {
      width: Math.max(sizeNum / 10, 3), // Line thickness
      height: sizeNum, // Line height
      spacing: Math.max(sizeNum / 8, 4), // Spacing between lines
    };
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
      className={`react-loadly react-loadly-wave  ${className}`.trim()}
      style={containerStyle}
      role="status"
      aria-label={ariaLabel}
      aria-live="polite"
      aria-busy={loading}
      data-testid={dataTestId}
      {...restProps}
    >
      <LineGroup
        count={count}
        lineWidth={lineSpecs.width}
        lineHeight={lineSpecs.height}
        color={color}
        secondaryColor={secondaryColor}
        speed={speed}
        arrangement="staggered"
        orientation="vertical"
        animationType="wave"
        spacing={lineSpecs.spacing}
        data-testid={dataTestId ? `${dataTestId}-lines` : undefined}
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