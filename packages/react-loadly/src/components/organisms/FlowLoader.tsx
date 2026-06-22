import { IFluidLoaderProps } from "@/@types";
import { getAnimationDuration, getSizeValue, mergeProps } from "@/utils";
import { classNameGen } from "@/utils/classNameGen";
import React, { type CSSProperties, FC } from "react";
import { useFullscreen } from "@/hooks/useFullscreen";

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
    fullscreen,
    screenWidth,
    screenHeight,
    loaderCenter,
    screenBackground,
    ...restProps
  } = props;

  const sizeValue = getSizeValue(size);
  const numericSize = parseInt(sizeValue);
  const containerHeight = Math.max(numericSize * 0.4, 10); // Minimum height of 10px
  const animationDuration = getAnimationDuration(1500, speed);

  const containerStyle = useFullscreen({
    fullscreen,
    screenWidth,
    screenHeight,
    loaderCenter,
    screenBackground,
    style,
  });

  if (!loading) return null;

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

    const x1 = Math.min(numericSize * 0.1, 10);
    const x2 = Math.min(numericSize * 0.5, numericSize * 0.7);
    const x3 = Math.min(numericSize * 0.9, numericSize - 10);
    const x4 = numericSize;

    const amp = amplitude ?? Math.min(5, containerHeight / 4);
    const y1 = Math.sin(0.1) * amp;
    const y2 = Math.sin(0.5) * amp;
    const y3 = Math.sin(0.9) * amp;
    const y4 = Math.sin(1) * amp;

    return (
      <div
        key={index}
        style={{
          position: "absolute",
          width: `${particleSize}px`,
          height: `${particleSize}px`,
          borderRadius: "50%",
          background: index % 2 === 0 ? color : secondaryColor || color,
          animation: `react-loadly-flow-particle ${duration}ms ease-in-out infinite`,
          animationDelay: `${delay}s`,
          opacity: 0.8 - index * 0.1,
          left: "0px", // Start at the beginning of the container
          top: `${(containerHeight - particleSize) / 2 + (index % 3) * (containerHeight / (particleCount + 1))}px`, // Distribute vertically
          // Custom properties for keyframe coordinates
          "--loadly-flow-x1": `${x1}px`,
          "--loadly-flow-x2": `${x2}px`,
          "--loadly-flow-x3": `${x3}px`,
          "--loadly-flow-x4": `${x4}px`,
          "--loadly-flow-y1": `${y1}px`,
          "--loadly-flow-y2": `${y2}px`,
          "--loadly-flow-y3": `${y3}px`,
          "--loadly-flow-y4": `${y4}px`,
        } as CSSProperties}
        data-testid={dataTestId ? `${dataTestId}-particle-${index}` : undefined}
      />
    );
  };

  return (
    <div
      className={classNameGen("react-loadly react-loadly-flow", className)}
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
        <div className="react-loadly-text" aria-live="polite">
          {loadingText}
        </div>
      )}
      <span className="react-loadly-sr-only">{ariaLabel}</span>
    </div>
  );
};

FlowLoader.displayName = "FlowLoader";
export default FlowLoader;
