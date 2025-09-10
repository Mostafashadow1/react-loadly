import { getAnimationDuration, getSizeValue } from "@/utils";
import type { CSSProperties } from "react";
import { Line } from "../atoms/Line";

export interface LineGroupProps {
  /** Number of lines in the group */
  count?: number;
  /** Width of each line */
  lineWidth?: number | string;
  /** Height/thickness of each line */
  lineHeight?: number | string;
  /** Color of the lines */
  color?: string;
  /** Secondary color for alternating lines */
  secondaryColor?: string;
  /** Spacing between lines */
  spacing?: number | string;
  /** Animation speed multiplier */
  speed?: number;
  /** Group arrangement */
  arrangement?: "parallel" | "radial" | "staggered";
  /** Orientation of lines */
  orientation?: "horizontal" | "vertical";
  /** Custom CSS class */
  className?: string;
  /** Custom styles */
  style?: React.CSSProperties;
  /** Animation type */
  animationType?: "wave" | "pulse" | "scale" | "rotate";
  /** Data test id */
  "data-testid"?: string;
}

export const LineGroup: React.FC<LineGroupProps> = ({
  count = 5,
  lineWidth = 4,
  lineHeight = 35,
  color = "var(--react-loadly-color)",
  secondaryColor,
  spacing = 6,
  speed = 1,
  arrangement = "parallel",
  orientation = "vertical",
  className = "",
  style = {},
  animationType = "wave",
  "data-testid": dataTestId,
  ...props
}) => {
  const spacingValue = getSizeValue(spacing);
  const animationDuration = getAnimationDuration(1000, speed);

  const getArrangementStyle = (): CSSProperties => {
    switch (arrangement) {
      case "radial":
        return {
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          width: `${parseInt(getSizeValue(lineHeight)) * 1.5}px`,
          height: `${parseInt(getSizeValue(lineHeight)) * 1.5}px`,
        };
      case "staggered":
        return {
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "center",
          gap: spacingValue,
        };
      default: // parallel
        return {
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: spacingValue,
        };
    }
  };

  const getLinePosition = (index: number): CSSProperties => {
    if (arrangement === "radial") {
      const angle = (index / count) * 2 * Math.PI;
      return {
        position: "absolute",
        left: "50%",
        top: "50%",
        transformOrigin: "center",
        transform: `translate(-50%, -50%) rotate(${angle}rad)`,
      };
    }
    if (arrangement === "staggered") {
      const heightMultiplier = 0.3 + 0.7 * Math.sin((index / count) * Math.PI);
      return {
        height: orientation === "vertical" ? `${parseInt(getSizeValue(lineHeight)) * heightMultiplier}px` : getSizeValue(lineHeight),
      };
    }
    return {};
  };

  const getLineAnimationDelay = (index: number): string => {
    return `${(index * 0.1) / speed}s`;
  };

  const containerStyle: CSSProperties = {
    ...getArrangementStyle(),
    ...style,
  };

  return (
    <div
      className={`react-loadly-line-group react-loadly-line-group-${arrangement} ${className}`.trim()}
      style={containerStyle}
      data-testid={dataTestId}
      {...props}
    >
      {Array.from({ length: count }, (_, index) => (
        <Line
          key={index}
          width={orientation === "horizontal" ? lineWidth : lineHeight}
          height={orientation === "horizontal" ? lineHeight : lineWidth}
          color={secondaryColor && index % 2 === 1 ? secondaryColor : color}
          orientation={orientation}
          animation={`react-loadly-${animationType}`}
          animationDuration={animationDuration}
          animationDelay={getLineAnimationDelay(index)}
          style={getLinePosition(index)}
          data-testid={dataTestId ? `${dataTestId}-line-${index}` : undefined}
        />
      ))}
    </div>
  );
};
