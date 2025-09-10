import { getAnimationDuration, getSizeValue } from "@/utils";
import type { CSSProperties } from "react";
import { Circle, Rectangle } from "../atoms";

export interface ShapeGroupProps {
  /** Number of shapes in the group */
  count?: number;
  /** Size of each shape */
  shapeSize?: number | string;
  /** Color of the shapes */
  color?: string;
  /** Secondary color for alternating shapes */
  secondaryColor?: string;
  /** Spacing between shapes */
  spacing?: number | string;
  /** Animation speed multiplier */
  speed?: number;
  /** Group arrangement */
  arrangement?: "linear" | "circular" | "spiral";
  /** Shape types to use */
  shapeTypes?: ("circle" | "rectangle")[];
  /** Custom CSS class */
  className?: string;
  /** Custom styles */
  style?: React.CSSProperties;
  /** Animation type */
  animationType?: "pulse" | "rotate" | "scale" | "bounce";
  /** Border width for outlined shapes */
  borderWidth?: number;
  /** Data test id */
  "data-testid"?: string;
}

export const ShapeGroup: React.FC<ShapeGroupProps> = ({
  count = 4,
  shapeSize = 16,
  color = "var(--react-loadly-color)",
  secondaryColor,
  spacing = 8,
  speed = 1,
  arrangement = "linear",
  shapeTypes = ["circle", "rectangle"],
  className = "",
  style = {},
  animationType = "pulse",
  borderWidth = 0,
  "data-testid": dataTestId,
  ...props
}) => {
  const spacingValue = getSizeValue(spacing);
  const animationDuration = getAnimationDuration(800, speed);

  const getArrangementStyle = (): CSSProperties => {
    switch (arrangement) {
      case "circular":
        return {
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          width: `${(parseInt(getSizeValue(shapeSize)) + parseInt(spacingValue)) * 2.5}px`,
          height: `${(parseInt(getSizeValue(shapeSize)) + parseInt(spacingValue)) * 2.5}px`,
        };
      case "spiral":
        return {
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          width: `${(parseInt(getSizeValue(shapeSize)) + parseInt(spacingValue)) * 3}px`,
          height: `${(parseInt(getSizeValue(shapeSize)) + parseInt(spacingValue)) * 3}px`,
        };
      default: // linear
        return {
          display: "flex",
          alignItems: "center",
          gap: spacingValue,
        };
    }
  };

  const getShapePosition = (index: number): CSSProperties => {
    if (arrangement === "circular") {
      const angle = (index / count) * 2 * Math.PI;
      const radius = parseInt(spacingValue) * 2;
      return {
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: `translate(-50%, -50%) translate(${Math.cos(angle) * radius}px, ${Math.sin(angle) * radius}px)`,
      };
    }
    if (arrangement === "spiral") {
      const angle = (index / count) * 4 * Math.PI;
      const radius = ((index + 1) * parseInt(spacingValue)) / 2;
      return {
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: `translate(-50%, -50%) translate(${Math.cos(angle) * radius}px, ${Math.sin(angle) * radius}px)`,
      };
    }
    return {};
  };

  const getShapeAnimationDelay = (index: number): string => {
    return `${(index * 0.15) / speed}s`;
  };

  const getShapeType = (index: number): "circle" | "rectangle" => {
    return shapeTypes[index % shapeTypes.length];
  };

  const containerStyle: React.CSSProperties = {
    ...getArrangementStyle(),
    ...style,
  };

  const renderShape = (index: number) => {
    const shapeType = getShapeType(index);
    const shapeColor = secondaryColor && index % 2 === 1 ? secondaryColor : color;
    const commonProps = {
      key: index,
      color: borderWidth > 0 ? undefined : shapeColor,
      borderColor: borderWidth > 0 ? shapeColor : undefined,
      borderWidth: borderWidth > 0 ? borderWidth : undefined,
      animation: `react-loadly-${animationType}`,
      animationDuration,
      animationDelay: getShapeAnimationDelay(index),
      style: getShapePosition(index),
      "data-testid": dataTestId ? `${dataTestId}-shape-${index}` : undefined,
    };

    if (shapeType === "circle") {
      return <Circle {...commonProps} size={shapeSize} />;
    } else {
      return <Rectangle {...commonProps} width={shapeSize} height={shapeSize} />;
    }
  };

  return (
    <div
      className={`react-loadly-shape-group react-loadly-shape-group-${arrangement} ${className}`.trim()}
      style={containerStyle}
      data-testid={dataTestId}
      {...props}
    >
      {Array.from({ length: count }, (_, index) => renderShape(index))}
    </div>
  );
};
