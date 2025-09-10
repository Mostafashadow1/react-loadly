import { IGeometricLoaderProps } from "@/@types";
import { generateId, getSizeValue, mergeProps } from "@/utils";
import { CSSProperties, FC, useMemo } from "react";

const defaultProps: Partial<IGeometricLoaderProps> = {
  size: 40,
  color: "var(--react-loadly-color)",
  speed: 1,
  loading: true,
  count: 4,
  "aria-label": "Loading...",
};

export const GridLoader: FC<IGeometricLoaderProps> = (userProps) => {
  const props = mergeProps(defaultProps, userProps);
  const {
    size,
    color,
    secondaryColor,
    speed,
    loading,
    count,
    className = "",
    style = {},
    showText,
    loadingText = "Loading...",
    "aria-label": ariaLabel,
    "data-testid": dataTestId,
    ...restProps
  } = props;

  const id = useMemo(() => generateId("grid-loader"), []);
  const shapeSize = useMemo(() => {
    const sizeNum = typeof size === "number" ? size : parseInt(getSizeValue(size));
    const gridSize = Math.ceil(Math.sqrt(count || 4));
    return Math.max(sizeNum / (gridSize * 1.5), 8);
  }, [size, count]);

  if (!loading) return null;

  const containerStyle: CSSProperties = {
    display: "inline-flex",
    flexDirection: "column",
    alignItems: "center",
    ...style,
  };

  return (
    <div
      className={`react-loadly react-loadly-grid  ${className}`.trim()}
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
          display: "grid",
          gridTemplateColumns: `repeat(${Math.ceil(Math.sqrt(count || 4))}, 1fr)`,
          gap: `${shapeSize / 4}px`,
        }}
      >
        {Array.from({ length: count || 4 }, (_, index) => (
          <div
            key={index}
            style={{
              width: shapeSize,
              height: shapeSize,
              backgroundColor: index % 2 === 0 ? color : secondaryColor || color,
              borderRadius: "2px",
              animation: `react-loadly-scale ${1.2 / (speed || 1)}s ease-in-out infinite`,
              animationDelay: `${(index * 0.1) / (speed || 1)}s`,
            }}
            data-testid={dataTestId ? `${dataTestId}-shape-${index}` : undefined}
          />
        ))}
      </div>
      {showText && (
        <div className="react-loadly-text" id={`${id}-text`} aria-live="polite">
          {loadingText}
        </div>
      )}
      <span className="react-loadly-sr-only">{ariaLabel}</span>
    </div>
  );
};
