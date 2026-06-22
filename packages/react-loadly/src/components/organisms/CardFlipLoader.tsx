import React, { type CSSProperties, FC } from "react";
import { ICardFlipLoaderProps } from "@/@types/interfaces/ICardFlipLoaderProps";
import { useFullscreen } from "@/hooks/useFullscreen";
import { getOptimizedAnimationSettings, getSizeValue, mergeProps } from "@/utils";
import { classNameGen } from "@/utils/classNameGen";

const defaultProps: Partial<ICardFlipLoaderProps> = {
  size: 52,
  color: "var(--react-loadly-color)",
  secondaryColor: "var(--react-loadly-secondary-color)",
  speed: 1,
  loading: true,
  borderRadius: 8,
  "aria-label": "Loading card...",
};

export const CardFlipLoader: FC<ICardFlipLoaderProps> = (userProps) => {
  const props = mergeProps(defaultProps, userProps);
  const {
    size,
    color,
    secondaryColor,
    speed,
    loading,
    borderRadius = 8,
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

  const sizeValue = getSizeValue(size);
  const numericSize = typeof size === "number" ? size : parseFloat(sizeValue) || 52;
  const animationSettings = getOptimizedAnimationSettings(speed);
  const containerStyle = useFullscreen({ fullscreen, screenWidth, screenHeight, loaderCenter, screenBackground, style });

  if (!loading) return null;

  const cardStyle: CSSProperties = {
    width: sizeValue,
    height: numericSize * 0.72,
    borderRadius,
    background: `linear-gradient(135deg, ${color}, ${secondaryColor})`,
    animation: `react-loadly-card-flip ${animationSettings.duration} ease-in-out infinite`,
    animationPlayState: animationSettings.playState,
    boxShadow: `0 8px 24px rgba(0, 0, 0, 0.12)`,
    transformStyle: "preserve-3d",
  };

  return (
    <div
      className={classNameGen("react-loadly react-loadly-card-flip", className)}
      style={{ perspective: 240, ...containerStyle }}
      role="status"
      aria-label={ariaLabel}
      aria-live="polite"
      aria-busy={loading}
      data-testid={dataTestId}
      {...restProps}
    >
      <div style={cardStyle} data-testid={dataTestId ? `${dataTestId}-card` : undefined} />
      {showText && <div className="react-loadly-text">{loadingText}</div>}
      <span className="react-loadly-sr-only">{ariaLabel}</span>
    </div>
  );
};

CardFlipLoader.displayName = "CardFlipLoader";
