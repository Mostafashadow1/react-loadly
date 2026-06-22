import React, { useMemo } from "react";
import { IMorphLoaderProps } from "@/@types/interfaces/IMorphLoaderProps";
import { mergeProps } from "@/utils";
import { LIB_DEFAULTS } from "@/constants/defaults";
import { classNameGen } from "@/utils/classNameGen";
import { getOptimizedAnimationSettings, getSizeValue } from "@/utils";
import { useFullscreen } from "@/hooks/useFullscreen";

const DEFAULT_PROPS: Partial<IMorphLoaderProps> = {
  variant: "blob",
  speed: 1,
};

export const MorphLoader: React.FC<IMorphLoaderProps> = (props) => {
  const mergedProps = mergeProps({ ...LIB_DEFAULTS, ...DEFAULT_PROPS }, props);
  const {
    variant = "blob",
    speed = 1,
    size = 40,
    color = "var(--react-loadly-color)",
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
  } = mergedProps;

  const testId = dataTestId || "morph-loader";

  const animationSettings = getOptimizedAnimationSettings(speed);
  const sizeValue = getSizeValue(size);

  // Generate SVG path based on variant
  const generatePath = useMemo(() => {
    const numSize = typeof size === "number" ? size : parseInt(getSizeValue(size));
    const center = numSize / 2;
    const radius = numSize / 2 - 4;

    switch (variant) {
      case "soft":
        return `M ${center},${center - radius} 
                C ${center + radius * 0.8},${center - radius} ${center + radius},${center - radius * 0.8} ${center + radius},${center}
                C ${center + radius},${center + radius * 0.8} ${center + radius * 0.8},${center + radius} ${center},${center + radius}
                C ${center - radius * 0.8},${center + radius} ${center - radius},${center + radius * 0.8} ${center - radius},${center}
                C ${center - radius},${center - radius * 0.8} ${center - radius * 0.8},${center - radius} ${center},${center - radius}
                Z`;
      case "sharp":
        return `M ${center},${center - radius} 
                L ${center + radius * 0.7},${center - radius * 0.7}
                L ${center + radius},${center}
                L ${center + radius * 0.7},${center + radius * 0.7}
                L ${center},${center + radius}
                L ${center - radius * 0.7},${center + radius * 0.7}
                L ${center - radius},${center}
                L ${center - radius * 0.7},${center - radius * 0.7}
                Z`;
      case "blob":
      default:
        return `M ${center},${center - radius} 
                C ${center + radius * 0.5},${center - radius} ${center + radius},${center - radius * 0.5} ${center + radius},${center}
                C ${center + radius},${center + radius * 0.5} ${center + radius * 0.5},${center + radius} ${center},${center + radius}
                C ${center - radius * 0.5},${center + radius} ${center - radius},${center + radius * 0.5} ${center - radius},${center}
                C ${center - radius},${center - radius * 0.5} ${center - radius * 0.5},${center - radius} ${center},${center - radius}
                Z`;
    }
  }, [variant, size]);

  const containerStyle = useFullscreen({
    fullscreen,
    screenWidth,
    screenHeight,
    loaderCenter,
    screenBackground,
    style,
  });

  if (!loading) return null;

  const svgStyle: React.CSSProperties = {
    width: sizeValue,
    height: sizeValue,
    willChange: "transform",
  };

  const shapeStyle: React.CSSProperties = {
    transformOrigin: "center",
    willChange: "transform",
    animation: `react-loadly-morph ${animationSettings.duration} ease-in-out infinite`,
    animationPlayState: animationSettings.playState,
  };

  return (
    <div
      className={classNameGen("react-loadly react-loadly-morph", className)}
      style={containerStyle}
      role="status"
      aria-label={ariaLabel}
      aria-live="polite"
      aria-busy={loading}
      data-testid={dataTestId}
      {...restProps}
    >
      <svg style={svgStyle} viewBox={`0 0 ${sizeValue} ${sizeValue}`} data-testid={testId ? `${testId}-svg` : undefined}>
        <path d={generatePath} fill={color} style={shapeStyle} data-testid={testId ? `${testId}-shape` : undefined} />
      </svg>

      {showText && (
        <div className="react-loadly-text" aria-live="polite" data-testid={testId ? `${testId}-text` : undefined}>
          {loadingText}
        </div>
      )}

      <span className="react-loadly-sr-only">{ariaLabel}</span>
    </div>
  );
};

MorphLoader.displayName = "MorphLoader";
