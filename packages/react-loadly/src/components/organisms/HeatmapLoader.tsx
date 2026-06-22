import React, { useMemo } from "react";
import { IHeatmapLoaderProps } from "@/@types/interfaces/IHeatmapLoaderProps";
import { LIB_DEFAULTS } from "@/constants/defaults";
import { classNameGen } from "@/utils/classNameGen";
import { getOptimizedAnimationSettings, getSizeValue, mergeProps } from "@/utils";
import { useFullscreen } from "@/hooks/useFullscreen";

const DEFAULT_PROPS: Partial<IHeatmapLoaderProps> = {
  rows: 3,
  cols: 5,
};

export const HeatmapLoader: React.FC<IHeatmapLoaderProps> = (props) => {
  const mergedProps = mergeProps(LIB_DEFAULTS, props);
  const {
    rows = 3,
    cols = 5,
    size = 40,
    color = "var(--react-loadly-color)",
    speed = 1,
    loading = true,
    className = "",
    style = {},
    showText,
    loadingText = "Loading...",
    "aria-label": ariaLabel = "Loading...",
    "data-testid": dataTestId,
    fullscreen,
    screenWidth,
    screenHeight,
    loaderCenter,
    screenBackground,
    ...restProps
  } = mergeProps(DEFAULT_PROPS, mergedProps);

  const animationSettings = getOptimizedAnimationSettings(speed);
  const sizeValue = getSizeValue(size);

  // Calculate cell dimensions
  const cellWidth = useMemo(() => {
    const numSize = typeof size === "number" ? size : parseInt(getSizeValue(size));
    return Math.max(numSize / cols - 2, 8);
  }, [size, cols]);

  const cellHeight = useMemo(() => {
    const numSize = typeof size === "number" ? size : parseInt(getSizeValue(size));
    return Math.max(numSize / rows - 2, 8);
  }, [size, rows]);

  const testId = dataTestId || "heatmap-loader";

  // Generate grid cells with staggered animations
  const cells = useMemo(() => {
    return Array.from({ length: rows * cols }).map((_, index) => {
      const row = Math.floor(index / cols);
      const col = index % cols;

      const cellStyle: React.CSSProperties = {
        width: `${cellWidth}px`,
        height: `${cellHeight}px`,
        backgroundColor: color,
        margin: "1px",
        opacity: 0.3,
        willChange: "opacity",
        animation: `react-loadly-pulse ${animationSettings.duration} ease-in-out infinite`,
        animationDelay: `${((row + col) * 0.1) / speed}s`,
        animationPlayState: animationSettings.playState,
      };

      return <div key={index} style={cellStyle} data-testid={testId ? `${testId}-cell-${index}` : undefined} />;
    });
  }, [rows, cols, cellWidth, cellHeight, color, animationSettings, speed, testId]);

  const containerStyle = useFullscreen({
    fullscreen,
    screenWidth,
    screenHeight,
    loaderCenter,
    screenBackground,
    style,
  });

  if (!loading) return null;

  const gridStyle: React.CSSProperties = {
    display: "grid",
    gridTemplateColumns: `repeat(${cols}, 1fr)`,
    gap: "2px",
    width: sizeValue,
    height: sizeValue,
    willChange: "transform",
  };

  return (
    <div
      className={classNameGen("react-loadly react-loadly-heatmap", className)}
      style={containerStyle}
      role="status"
      aria-label={ariaLabel}
      aria-live="polite"
      aria-busy={loading}
      data-testid={dataTestId}
      {...restProps}
    >
      <div style={gridStyle} data-testid={testId ? `${testId}-grid` : undefined}>
        {cells}
      </div>

      {showText && (
        <div className="react-loadly-text" aria-live="polite" data-testid={testId ? `${testId}-text` : undefined}>
          {loadingText}
        </div>
      )}

      <span className="react-loadly-sr-only">{ariaLabel}</span>
    </div>
  );
};

HeatmapLoader.displayName = "HeatmapLoader";
