import { IFluidLoaderProps } from "@/@types";
import { generateId, getAnimationDuration, getSizeValue, mergeProps } from "@/utils";
import { CSSProperties, FC, useMemo } from "react";

const defaultProps: Partial<IFluidLoaderProps> = {
  size: 60,
  color: "var(--react-loadly-color)",
  speed: 1,
  loading: true,
  fluidity: 1,
  amplitude: 1,
  "aria-label": "Loading...",
};

export const LiquidLoader: FC<IFluidLoaderProps> = (userProps) => {
  const props = mergeProps(defaultProps, userProps);
  const {
    size,
    color,
    secondaryColor,
    speed,
    loading,
    amplitude,
    className = "",
    style = {},
    showText,
    loadingText = "Loading...",
    "aria-label": ariaLabel,
    "data-testid": dataTestId,
    ...restProps
  } = props;

  const id = useMemo(() => generateId("liquid-loader"), []);
  const sizeValue = getSizeValue(size);
  const animationDuration = getAnimationDuration(2000, speed);

  if (!loading) return null;

  const containerStyle: CSSProperties = {
    display: "inline-flex",
    flexDirection: "column",
    alignItems: "center",
    ...style,
  };

  const liquidStyle: CSSProperties = {
    width: sizeValue,
    height: sizeValue,
    position: "relative",
    overflow: "hidden",
    borderRadius: "50%",
    backgroundColor: "rgba(0, 0, 0, 0.1)",
  };

  // Calculate the translateY value based on amplitude
  const translateY = 50 - (amplitude ?? 1) * 10;

  const waveStyle: CSSProperties = {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "200%",
    height: "200%",
    background: `linear-gradient(180deg, ${color} 0%, ${secondaryColor || color} 100%)`,
    borderRadius: "40%",
    animation: `react-loadly-liquid-wave ${animationDuration} ease-in-out infinite`,
    transform: "translate(-25%, 50%) rotate(0deg)",
    animationTimingFunction: `cubic-bezier(0.36, 0.45, 0.63, 0.53)`,
  };

  const wave2Style: CSSProperties = {
    ...waveStyle,
    background: `linear-gradient(180deg, ${secondaryColor || color} 0%, ${color} 100%)`,
    animation: `react-loadly-liquid-wave ${animationDuration} ease-in-out infinite reverse`,
    animationDelay: `${-0.5 / (speed ?? 1)}s`,
    opacity: 0.8,
  };

  return (
    <>
      <style>{`
        @keyframes react-loadly-liquid-wave {
          0%, 100% {
            transform: translate(-25%, 50%) rotate(0deg);
          }
          50% {
            transform: translate(-25%, ${translateY}%) rotate(180deg);
          }
        }
      `}</style>
      <div
        className={`react-loadly react-loadly-liquid  ${className}`.trim()}
        style={containerStyle}
        role="status"
        aria-label={ariaLabel}
        aria-live="polite"
        aria-busy={loading}
        data-testid={dataTestId}
        {...restProps}
      >
        <div style={liquidStyle} data-testid={dataTestId ? `${dataTestId}-container` : undefined}>
          <div style={waveStyle} />
          <div style={wave2Style} />
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
