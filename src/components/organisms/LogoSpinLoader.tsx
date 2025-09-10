import { ILogoLoaderProps } from "@/@types";
import { getAnimationDuration, mergeProps } from "@/utils";
import { type CSSProperties, FC } from "react";

const defaultProps: Partial<ILogoLoaderProps> = {
  size: 60,
  speed: 1,
  loading: true,
  animationType: "spin",
  glowIntensity: 0.3,
  "aria-label": "Loading...",
};

export const LogoSpinLoader: FC<ILogoLoaderProps> = (userProps) => {
  const props = mergeProps(defaultProps, userProps);
  const {
    src,
    alt = "Loading",
    size,
    speed,
    loading,
    animationType,
    glowIntensity,
    className = "",
    style = {},
    color = "var(--react-loadly-color)",
    "aria-label": ariaLabel,
    "data-testid": dataTestId,
    ...restProps
  } = props;

  if (!loading) return null;

  const containerStyle: CSSProperties = {
    display: "inline-flex",
    flexDirection: "column",
    alignItems: "center",
    ...style,
  };

  const logoStyle: CSSProperties = {
    width: typeof size === "number" ? `${size}px` : size,
    height: typeof size === "number" ? `${size}px` : size,
    animation: `react-loadly-${animationType} ${getAnimationDuration(2000, speed)} infinite`,
    filter: (glowIntensity ?? 0) > 0 ? `drop-shadow(0 0 ${(glowIntensity ?? 0) * 20}px ${color})` : undefined,
  };

  // If no src provided, show a default loading circle
  if (!src) {
    return (
      <div
        className={`react-loadly react-loadly-logo  ${className}`.trim()}
        style={containerStyle}
        role="status"
        aria-label={ariaLabel}
        aria-live="polite"
        aria-busy={loading}
        data-testid={dataTestId}
        {...restProps}
      >
        <div
          style={{
            ...logoStyle,
            borderRadius: "50%",
            backgroundColor: color,
            opacity: 0.8,
          }}
          data-testid={dataTestId ? `${dataTestId}-default` : undefined}
        />
        <span className="react-loadly-sr-only">{ariaLabel}</span>
      </div>
    );
  }

  return (
    <div
      className={`react-loadly react-loadly-logo  ${className}`.trim()}
      style={containerStyle}
      role="status"
      aria-label={ariaLabel}
      aria-live="polite"
      aria-busy={loading}
      data-testid={dataTestId}
      {...restProps}
    >
      <img src={src} alt={alt} style={logoStyle} data-testid={dataTestId ? `${dataTestId}-image` : undefined} />
      <span className="react-loadly-sr-only">{ariaLabel}</span>
    </div>
  );
};
