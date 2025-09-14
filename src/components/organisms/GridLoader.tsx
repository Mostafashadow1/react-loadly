import { IGeometricLoaderProps } from "@/@types";
import { generateId, getSizeValue, mergeProps } from "@/utils";
import { classNameGen } from "@/utils/classNameGen";
import React, { CSSProperties, FC, useMemo } from "react";

const defaultProps: Partial<IGeometricLoaderProps> = {
  size: 40,
  color: "var(--react-loadly-color)",
  speed: 1,
  loading: true,
  count: 4,
  "aria-label": "Loading...",
};

export const GridLoader: FC<IGeometricLoaderProps> = (userProps) => {
  const props = mergeProps(defaultProps, userProps);
  const {
    size,
    color,
    secondaryColor,
    speed = 1,
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

  const id = useMemo(() => generateId("grid-loader"), []);
  const shapeSize = useMemo(() => {
    const sizeNum = typeof size === "number" ? size : parseInt(getSizeValue(size));
    const gridSize = Math.ceil(Math.sqrt(count || 4));
    return Math.max(sizeNum / (gridSize * 1.5), 8);
  }, [size, count]);

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
      className={classNameGen("react-loadly react-loadly-grid", className)}
      style={containerStyle}
      role="status"
      aria-label={ariaLabel}
      aria-live="polite"
      aria-busy={loading}
      data-testid={dataTestId}
      {...restProps}
    >
      <div
        className="react-loadly-grid-container"
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${Math.ceil(Math.sqrt(count || 4))}, 1fr)`,
          gap: `${shapeSize / 3}px`,
        }}
        data-testid={dataTestId ? `${dataTestId}-grid` : undefined}
      >
        {Array.from({ length: count || 4 }).map((_, index) => (
          <div
            key={index}
            className="react-loadly-grid-item"
            style={{
              width: `${shapeSize}px`,
              height: `${shapeSize}px`,
              backgroundColor: index % 2 === 0 ? color : secondaryColor || color,
              borderRadius: "20%",
              animation: `react-loadly-scale ${1.2 / (speed || 1)}s ease-in-out infinite`,
              animationDelay: `${(index * 0.1) / (speed || 1)}s`,
            }}
          />
        ))}
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
