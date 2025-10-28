import { IHashtagLoaderProps } from "@/@types/interfaces/IHashtagLoaderProps";
import { generateId, getOptimizedAnimationSettings, getSizeValue, mergeProps } from "@/utils";
import { classNameGen } from "@/utils/classNameGen";
import React, { type CSSProperties, FC, useMemo } from "react";

const defaultProps: Partial<IHashtagLoaderProps> = {
  size: 50,
  color: "var(--react-loadly-color)",
  speed: 1,
  loading: true,
  "aria-label": "Loading...",
};

export const HashtagLoader: FC<IHashtagLoaderProps> = (userProps) => {
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

  const id = useMemo(() => generateId("hashtag-loader"), []);
  const sizeValue = getSizeValue(size);
  const animationSettings = getOptimizedAnimationSettings(speed);

  const hashtagSize = parseFloat(sizeValue);
  const strokeWidth = Math.max(hashtagSize / 10, 3);

  // SVG path for hashtag drawn progressively
  const hashtagPath = useMemo(() => {
    const size = hashtagSize * 0.8;
    // Draw: left vertical, top horizontal, right vertical, bottom horizontal
    return [
      { d: `M ${size / 3} 0 L ${size / 3} ${size}`, dashArray: size, dashOffset: size * 2 }, // Left vertical
      { d: `M 0 ${size / 3} L ${size} ${size / 3}`, dashArray: size, dashOffset: size * 2 }, // Top horizontal
      { d: `M ${(size * 2) / 3} 0 L ${(size * 2) / 3} ${size}`, dashArray: size, dashOffset: size * 2 }, // Right vertical
      { d: `M 0 ${(size * 2) / 3} L ${size} ${(size * 2) / 3}`, dashArray: size, dashOffset: size * 2 }, // Bottom horizontal
    ];
  }, [hashtagSize]);

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

  const hashtagContainerStyle: CSSProperties = {
    position: "relative",
    display: "inline-flex",
    justifyContent: "center",
    alignItems: "center",
    width: sizeValue,
    height: sizeValue,
  };

  return (
    <>
      <style>{`
        @keyframes react-loadly-hashtag-draw-${id} {
          0% {
            stroke-dashoffset: ${hashtagSize * 2}px;
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            stroke-dashoffset: 0;
            opacity: 0.7;
          }
        }
      `}</style>
      <div
        className={classNameGen("react-loadly react-loadly-hashtag", className)}
        style={containerStyle}
        role="status"
        aria-label={ariaLabel}
        aria-live="polite"
        aria-busy={loading}
        data-testid={dataTestId}
        {...restProps}
      >
        <div style={hashtagContainerStyle}>
          <svg width={hashtagSize} height={hashtagSize} viewBox={`0 0 ${hashtagSize} ${hashtagSize}`}>
            {hashtagPath.map((path, index) => (
              <path
                key={index}
                d={path.d}
                stroke={secondaryColor && index % 2 === 1 ? secondaryColor : color}
                strokeWidth={strokeWidth}
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                style={{
                  strokeDasharray: path.dashArray,
                  strokeDashoffset: path.dashOffset,
                  animation: `react-loadly-hashtag-draw-${id} ${animationSettings.duration} ease-in-out infinite`,
                  animationDelay: `${index * 0.2}s`,
                  animationPlayState: animationSettings.playState,
                }}
                data-testid={dataTestId ? `${dataTestId}-path-${index}` : undefined}
              />
            ))}
          </svg>
        </div>
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
