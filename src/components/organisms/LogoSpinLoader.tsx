import { ILogoLoaderProps } from "@/@types/interfaces/ILogoLoaderProps";
import { getAnimationDuration, mergeProps } from "@/utils";
import { classNameGen } from "@/utils/classNameGen";
import React, { type CSSProperties, FC } from "react";

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

  const logoStyle: CSSProperties = {
    width: typeof size === "number" ? `${size}px` : size,
    height: typeof size === "number" ? `${size}px` : size,
    animation: `react-loadly-${animationType} ${getAnimationDuration(2000, speed)} infinite`,
    filter: (glowIntensity ?? 0) > 0 ? `drop-shadow(0 0 ${(glowIntensity ?? 0) * 20}px ${color})` : undefined,
  };

  return (
    <div
      className={classNameGen("`react-loadly react-loadly-logo-spin", className)}
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
