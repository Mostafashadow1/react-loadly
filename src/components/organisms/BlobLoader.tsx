import { IFluidLoaderProps } from "@/@types";
import { generateId, getAnimationDuration, getSizeValue, mergeProps } from "@/utils";
import { FC, useMemo, type CSSProperties } from "react";

const defaultProps: Partial<IFluidLoaderProps> = {
  size: 60,
  color: "var(--react-loadly-color)",
  speed: 1,
  loading: true,
  fluidity: 1,
  amplitude: 1,
  "aria-label": "Loading...",
};

export const BlobLoader: FC<IFluidLoaderProps> = (userProps) => {
  const props = mergeProps(defaultProps, userProps);
  const {
    size,
    color,
    secondaryColor,
    speed,
    loading,
    fluidity,
    amplitude,
    className = "",
    style = {},
    showText,
    loadingText = "Loading...",
    "aria-label": ariaLabel,
    "data-testid": dataTestId,
    ...restProps
  } = props;

  const id = useMemo(() => generateId("blob-loader"), []);
  const sizeValue = getSizeValue(size);
  const animationDuration = getAnimationDuration(2500, speed);

  if (!loading) return null;

  const containerStyle: CSSProperties = {
    display: "inline-flex",
    flexDirection: "column",
    alignItems: "center",
    ...style,
  };

  const blobStyle: CSSProperties = {
    width: sizeValue,
    height: sizeValue,
    background: `linear-gradient(45deg, ${color}, ${secondaryColor || color})`,
    borderRadius: "30% 70% 70% 30% / 30% 30% 70% 70%",
    animation: `blob-morph ${animationDuration} ease-in-out infinite`,
    filter: "blur(1px)",
    position: "relative",
  };

  const innerBlobStyle: CSSProperties = {
    position: "absolute",
    top: "20%",
    left: "20%",
    width: "60%",
    height: "60%",
    background: `radial-gradient(circle, ${secondaryColor || color}, transparent)`,
    borderRadius: "40% 60% 60% 40% / 40% 40% 60% 60%",
    animation: `blob-inner ${animationDuration} ease-in-out infinite reverse`,
    opacity: 0.7,
  };

  return (
    <>
      <style>{`
        @keyframes blob-morph {
          0%, 100% {
            border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
            transform: scale(1) rotate(0deg);
          }
          25% {
            border-radius: 58% 42% 75% 25% / 76% 46% 54% 24%;
            transform: scale(${1 + (amplitude ?? 1) * 0.1}) rotate(90deg);
          }
          50% {
            border-radius: 50% 50% 33% 67% / 55% 27% 73% 45%;
            transform: scale(${1 - (amplitude ?? 1) * 0.05}) rotate(180deg);
          }
          75% {
            border-radius: 33% 67% 58% 42% / 63% 68% 32% 37%;
            transform: scale(${1 + (amplitude ?? 1) * 0.08}) rotate(270deg);
          }
        }
        
        @keyframes blob-inner {
          0%, 100% {
            border-radius: 40% 60% 60% 40% / 40% 40% 60% 60%;
            transform: scale(1) rotate(0deg);
          }
          33% {
            border-radius: 70% 30% 50% 50% / 30% 70% 30% 70%;
            transform: scale(${1.1 + (fluidity ?? 1) * 0.1}) rotate(-120deg);
          }
          66% {
            border-radius: 30% 70% 40% 60% / 70% 30% 70% 30%;
            transform: scale(${0.9 + (fluidity ?? 1) * 0.05}) rotate(-240deg);
          }
        }
      `}</style>
      <div
        className={`react-loadly react-loadly-blob  ${className}`.trim()}
        style={containerStyle}
        role="status"
        aria-label={ariaLabel}
        aria-live="polite"
        aria-busy={loading}
        data-testid={dataTestId}
        {...restProps}
      >
        <div style={blobStyle} data-testid={dataTestId ? `${dataTestId}-blob` : undefined}>
          <div style={innerBlobStyle} />
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
