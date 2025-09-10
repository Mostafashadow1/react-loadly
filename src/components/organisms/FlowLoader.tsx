import { IFluidLoaderProps } from "@/@types";
import { generateId, getAnimationDuration, getSizeValue, mergeProps } from "@/utils";
import { type CSSProperties, FC, useMemo } from "react";

const defaultProps: Partial<IFluidLoaderProps> = {
  size: 60,
  color: "var(--react-loadly-color)",
  speed: 1,
  loading: true,
  fluidity: 1,
  amplitude: 1,
  "aria-label": "Loading...",
};

export const FlowLoader: FC<IFluidLoaderProps> = (userProps) => {
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

  const id = useMemo(() => generateId("flow-loader"), []);
  const sizeValue = getSizeValue(size);
  const numericSize = parseInt(sizeValue);
  const containerHeight = Math.max(numericSize * 0.4, 10); // Minimum height of 10px
  const animationDuration = getAnimationDuration(1500, speed);

  if (!loading) return null;

  const containerStyle: CSSProperties = {
    display: "inline-flex",
    flexDirection: "column",
    alignItems: "center",
    ...style,
  };

  const flowContainerStyle: CSSProperties = {
    width: sizeValue,
    height: `${containerHeight}px`,
    position: "relative",
    overflow: "hidden",
    borderRadius: `${Math.max(numericSize * 0.2, 4)}px`, // Minimum radius of 4px
    backgroundColor: "rgba(0, 0, 0, 0.1)",
  };

  // Ensure minimum particle count even for small sizes
  const particleCount = Math.max(Math.floor(numericSize / 15), 3);

  const createParticle = (index: number) => {
    const delay = (index * 0.2) / (speed ?? 1);
    const duration = parseFloat(animationDuration) + index * 100;

    // Scale particle size based on container size
    const minParticleSize = Math.max(numericSize / 10, 4); // Minimum 4px
    const particleSize = minParticleSize + (index % 3) * (minParticleSize / 2);

    return (
      <div
        key={index}
        style={{
          position: "absolute",
          width: `${particleSize}px`,
          height: `${particleSize}px`,
          borderRadius: "50%",
          background: index % 2 === 0 ? color : secondaryColor || color,
          animation: `flow-particle-${id} ${duration}ms ease-in-out infinite`,
          animationDelay: `${delay}s`,
          opacity: 0.8 - index * 0.1,
          left: "0px", // Start at the beginning of the container
          top: `${(containerHeight - particleSize) / 2 + (index % 3) * (containerHeight / (particleCount + 1))}px`, // Distribute vertically
        }}
        data-testid={dataTestId ? `${dataTestId}-particle-${index}` : undefined}
      />
    );
  };

  return (
    <>
      <style>{`
        @keyframes flow-particle-${id} {
          0% {
            transform: translateX(0) translateY(0) scale(0);
            opacity: 0;
          }
          10% {
            transform: translateX(${Math.min(numericSize * 0.1, 10)}px) translateY(${
        Math.sin(0.1) * (amplitude ?? Math.min(5, containerHeight / 4))
      }px) scale(1);
            opacity: 0.8;
          }
          50% {
            transform: translateX(${Math.min(numericSize * 0.5, numericSize * 0.7)}px) translateY(${
        Math.sin(0.5) * (amplitude ?? Math.min(5, containerHeight / 4))
      }px) scale(1);
            opacity: 0.8;
          }
          90% {
            transform: translateX(${Math.min(numericSize * 0.9, numericSize - 10)}px) translateY(${
        Math.sin(0.9) * (amplitude ?? Math.min(5, containerHeight / 4))
      }px) scale(1);
            opacity: 0.8;
          }
          100% {
            transform: translateX(${numericSize}px) translateY(${Math.sin(1) * (amplitude ?? Math.min(5, containerHeight / 4))}px) scale(0);
            opacity: 0;
          }
        }
      `}</style>
      <div
        className={`react-loadly react-loadly-flow  ${className}`.trim()}
        style={containerStyle}
        role="status"
        aria-label={ariaLabel}
        aria-live="polite"
        aria-busy={loading}
        data-testid={dataTestId}
        {...restProps}
      >
        <div style={flowContainerStyle} data-testid={dataTestId ? `${dataTestId}-container` : undefined}>
          {Array.from({ length: particleCount }, (_, index) => createParticle(index))}
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
