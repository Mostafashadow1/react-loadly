import { getAnimationDuration, getSizeValue } from "@/utils";
import React, { type CSSProperties } from "react";
import { Dot } from "../atoms/Dot";

export interface DotClusterProps {
  /** Number of dots in the cluster */
  count?: number;
  /** Size of each dot */
  dotSize?: number | string;
  /** Color of the dots */
  color?: string;
  /** Secondary color for alternating dots */
  secondaryColor?: string;
  /** Spacing between dots */
  spacing?: number | string;
  /** Animation speed multiplier */
  speed?: number;
  /** Cluster arrangement */
  arrangement?: "linear" | "circular" | "grid";
  /** Custom CSS class */
  className?: string;
  /** Custom styles */
  style?: React.CSSProperties;
  /** Animation type */
  animationType?: "wave" | "pulse" | "fade" | "bounce";
  /** Data test id */
  "data-testid"?: string;
}

export const DotCluster: React.FC<DotClusterProps> = ({
  count = 3,
  dotSize = 8,
  color = "var(--react-loadly-color)",
  secondaryColor,
  spacing = 8,
  speed = 1,
  arrangement = "linear",
  className = "",
  style = {},
  animationType = "wave",
  "data-testid": dataTestId,
  ...props
}) => {
  const spacingValue = getSizeValue(spacing);
  const animationDuration = getAnimationDuration(1200, speed);

  const getArrangementStyle = (): CSSProperties => {
    switch (arrangement) {
      case "circular":
        return {
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          width: `${(parseInt(getSizeValue(dotSize)) + parseInt(spacingValue)) * 2}px`,
          height: `${(parseInt(getSizeValue(dotSize)) + parseInt(spacingValue)) * 2}px`,
        };
      case "grid": {
        const gridSize = Math.ceil(Math.sqrt(count));
        return {
          display: "grid",
          gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
          gap: spacingValue,
        };
      }
      default: // linear
        return {
          display: "flex",
          alignItems: "center",
          gap: spacingValue,
        };
    }
  };

  const getDotPosition = (index: number): React.CSSProperties => {
    if (arrangement === "circular") {
      const angle = (index / count) * 2 * Math.PI;
      const radius = parseInt(spacingValue);
      return {
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: `translate(-50%, -50%) translate(${Math.cos(angle) * radius}px, ${Math.sin(angle) * radius}px)`,
      };
    }
    return {};
  };

  const getDotAnimationDelay = (index: number): string => {
    return `${(index * 0.1) / speed}s`;
  };

  const containerStyle: React.CSSProperties = {
    ...getArrangementStyle(),
    ...style,
  };

  return (
    <div
      className={`react-loadly-dot-cluster react-loadly-dot-cluster-${arrangement} ${className}`.trim()}
      style={containerStyle}
      data-testid={dataTestId}
      {...props}
    >
      {Array.from({ length: count }, (_, index) => (
        <Dot
          key={index}
          size={dotSize}
          color={secondaryColor && index % 2 === 1 ? secondaryColor : color}
          animation={`react-loadly-${animationType}`}
          animationDuration={animationDuration}
          animationDelay={getDotAnimationDelay(index)}
          style={getDotPosition(index)}
          data-testid={dataTestId ? `${dataTestId}-dot-${index}` : undefined}
        />
      ))}
    </div>
  );
};
