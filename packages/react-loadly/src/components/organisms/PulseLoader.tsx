import { IGeometricLoaderProps } from "@/@types";
import { generateId, getSizeValue, mergeProps } from "@/utils";
import React, { FC, useMemo } from "react";
import { DotCluster } from "../molecules";
import { classNameGen } from "@/utils/classNameGen";
import { useFullscreen } from "@/hooks/useFullscreen";

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

  const containerStyle = useFullscreen({
    fullscreen,
    screenWidth,
    screenHeight,
    loaderCenter,
    screenBackground,
    style,
  });

  if (!loading) return null;

  return (
    <div
      className={classNameGen("react-loadly react-loadly-pulse", className)}
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

PulseLoader.displayName = "PulseLoader";
