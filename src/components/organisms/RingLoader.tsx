import { type CSSProperties, FC, useRef } from "react";
import { IGeometricLoaderProps } from "../../@types";
import { generateId, getOptimizedAnimationSettings, getSizeValue, mergeProps } from "../../utils";

const defaultProps: Partial<IGeometricLoaderProps> = {
  size: 60,
  color: "var(--react-loadly-color)",
  speed: 1,
  loading: true,
  borderWidth: 4,
  "aria-label": "Loading...",
};

export const RingLoader: FC<IGeometricLoaderProps> = (userProps) => {
  const props = mergeProps(defaultProps, userProps);
  const {
    size,
    color,
    speed,
    loading,
    className = "",
    style = {},
    borderWidth,
    showText,
    loadingText = "Loading...",
    "aria-label": ariaLabel,
    "data-testid": dataTestId,
    ...restProps
  } = props;

  // Use useRef instead of useMemo for better compatibility
  const idRef = useRef<string>(generateId("ring-loader"));
  const sizeValue = getSizeValue(size);
  const animationSettings = getOptimizedAnimationSettings(speed);

  // Don't render anything if not loading
  if (!loading) return null;

  const containerStyle: CSSProperties = {
    display: "inline-flex",
    flexDirection: "column",
    alignItems: "center",
    ...style,
  };

  const ringStyle: CSSProperties = {
    position: "relative",
    width: sizeValue,
    height: sizeValue,
  };

  const ringSegmentStyle: CSSProperties = {
    boxSizing: "border-box",
    display: "block",
    position: "absolute",
    width: sizeValue,
    height: sizeValue,
    border: `${borderWidth}px solid transparent`,
    borderTop: `${borderWidth}px solid ${color}`,
    borderBottom: `${borderWidth}px solid ${color}`,
    borderRadius: "50%",
    animation: `react-loadly-ring ${animationSettings.duration} cubic-bezier(0.5, 0, 0.5, 1) infinite`,
    animationPlayState: animationSettings.playState,
  };

  // Create the 4 ring segments with their specific styles
  const segments = Array.from({ length: 4 }).map((_, index) => {
    const rotation = `${index * 90}deg`;
    const delay = `${index * -0.15}s`;
    return (
      <div
        key={index}
        style={{
          ...ringSegmentStyle,
          transform: `rotate(${rotation})`,
          animationDelay: delay,
        }}
        data-testid={dataTestId ? `${dataTestId}-segment-${index}` : undefined}
      />
    );
  });

  return (
    <div
      className={`react-loadly react-loadly-ring  ${className}`.trim()}
      style={containerStyle}
      role="status"
      aria-label={ariaLabel}
      aria-live="polite"
      aria-busy={loading}
      data-testid={dataTestId}
      {...restProps}
    >
      <div style={ringStyle}>{segments}</div>
      {showText && (
        <div className="react-loadly-text" id={`${idRef.current}-text`} aria-live="polite">
          {loadingText}
        </div>
      )}
      <span className="react-loadly-sr-only">{ariaLabel}</span>
    </div>
  );
};
