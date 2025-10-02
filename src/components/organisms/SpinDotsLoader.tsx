import React, { useMemo } from "react";
import { ISpinDotsLoaderProps } from "@/@types/interfaces/ISpinDotsLoaderProps";
import { LIB_DEFAULTS } from "@/constants/defaults";
import { classNameGen } from "@/utils/classNameGen";
import { getOptimizedAnimationSettings, getSizeValue, mergeProps } from "@/utils";

const DEFAULT_PROPS: Partial<ISpinDotsLoaderProps> = {
  dots: 3,
  gap: 8,
};

export const SpinDotsLoader: React.FC<ISpinDotsLoaderProps> = (props) => {
  const mergedProps = mergeProps(LIB_DEFAULTS, props);
  const {
    dots = 3,
    gap = 8,
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
  const dotSize = useMemo(() => {
    const numSize = typeof size === "number" ? size : parseInt(getSizeValue(size));
    // Calculate dot size based on container size and gap
    return Math.max((numSize - (dots - 1) * gap) / dots, 4);
  }, [size, dots, gap]);

  // Generate dots with their positions and animations
  const dotsElements = useMemo(() => {
    return Array.from({ length: dots }).map((_, index) => {
      const angle = (index / dots) * 2 * Math.PI;
      const radius = (parseInt(sizeValue) - dotSize) / 2;
      const x = radius * Math.cos(angle);
      const y = radius * Math.sin(angle);

      const dotStyle: React.CSSProperties = {
        position: "absolute",
        width: `${dotSize}px`,
        height: `${dotSize}px`,
        backgroundColor: color,
        borderRadius: "50%",
        willChange: "transform, opacity",
        transform: "translateZ(0)", // Hardware acceleration
        left: `calc(50% + ${x}px - ${dotSize / 2}px)`,
        top: `calc(50% + ${y}px - ${dotSize / 2}px)`,
        animation: `react-loadly-dots ${animationSettings.duration} ease-in-out infinite`,
        animationDelay: `${(index * 0.2) / speed}s`,
        animationPlayState: animationSettings.playState,
      };

      return <div key={index} style={dotStyle} data-testid={dataTestId ? `${dataTestId}-dot-${index}` : undefined} />;
    });
  }, [dots, sizeValue, dotSize, color, animationSettings, speed, dataTestId]);

  if (!loading) return null;

  const containerStyle: React.CSSProperties = {
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

  const spinnerStyle: React.CSSProperties = {
    position: "relative",
    width: sizeValue,
    height: sizeValue,
    willChange: "transform",
  };

  return (
    <div
      className={classNameGen("react-loadly react-loadly-spin-dots", className)}
      style={containerStyle}
      role="status"
      aria-label={ariaLabel}
      aria-live="polite"
      aria-busy={loading}
      data-testid={dataTestId}
      {...restProps}
    >
      <div style={spinnerStyle} data-testid={dataTestId ? `${dataTestId}-spinner` : undefined}>
        {dotsElements}
      </div>

      {showText && (
        <div className="react-loadly-text" aria-live="polite" data-testid={dataTestId ? `${dataTestId}-text` : undefined}>
          {loadingText}
        </div>
      )}

      <span className="react-loadly-sr-only">{ariaLabel}</span>
    </div>
  );
};
