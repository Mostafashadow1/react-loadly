import { ILogoLoaderProps } from "@/@types/interfaces/ILogoLoaderProps";
import { getAnimationDuration, mergeProps } from "@/utils";
import { classNameGen } from "@/utils/classNameGen";
import React, { type CSSProperties, FC } from "react";
import { useFullscreen } from "@/hooks/useFullscreen";

const defaultProps: Partial<ILogoLoaderProps> = {
  size: 60,
  speed: 1,
  loading: true,
  animationType: "spin",
  glowIntensity: 0.3,
  "aria-label": "Loading...",
  alt: "Loading",
};

export const LogoSpinLoader: FC<ILogoLoaderProps> = (userProps) => {
  const props = mergeProps(defaultProps, userProps);
  const {
    src,
    alt,
    size,
    speed,
    loading,
    animationType,
    glowIntensity,
    className = "",
    style = {},
    color = "var(--react-loadly-color)",
    "aria-label": ariaLabel,
    loadingText,
    showText,
    "data-testid": dataTestId,
    fullscreen,
    screenWidth,
    screenHeight,
    loaderCenter,
    screenBackground,
    ...restProps
  } = props;

  const containerStyle = useFullscreen({
    fullscreen,
    screenWidth,
    screenHeight,
    loaderCenter,
    screenBackground,
    style,
  });

  if (!loading) return null;

  const logoStyle: CSSProperties = {
    width: typeof size === "number" ? `${size}px` : size,
    height: typeof size === "number" ? `${size}px` : size,
    animation: `react-loadly-${animationType} ${getAnimationDuration(2000, speed)} infinite`,
    filter: (glowIntensity ?? 0) > 0 ? `drop-shadow(0 0 ${(glowIntensity ?? 0) * 20}px ${color})` : undefined,
  };

  return (
    <div
      className={classNameGen("react-loadly react-loadly-logo-spin", className)}
      style={containerStyle}
      role="status"
      aria-label={ariaLabel}
      aria-live="polite"
      aria-busy={loading}
      data-testid={dataTestId}
      {...restProps}
    >
      <img src={src} alt={alt} style={logoStyle} className="react-loadly-logo" data-testid={dataTestId ? `${dataTestId}-logo` : undefined} />
      {showText && (
        <div className="react-loadly-text" aria-live="polite">
          {loadingText || ariaLabel}
        </div>
      )}
      <span className="react-loadly-sr-only">{ariaLabel}</span>
    </div>
  );
};

LogoSpinLoader.displayName = "LogoSpinLoader";
export default LogoSpinLoader;
