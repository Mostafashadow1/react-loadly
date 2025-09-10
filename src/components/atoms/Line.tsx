import { getSizeValue, sanitizeCSSValue } from "@/utils";
import type { CSSProperties } from "react";

export interface LineProps {
  /** Width of the line */
  width?: number | string;
  /** Height/thickness of the line */
  height?: number | string;
  /** Color of the line */
  color?: string;
  /** Opacity */
  opacity?: number;
  /** Border radius for rounded lines */
  borderRadius?: number | string;
  /** Custom CSS class */
  className?: string;
  /** Custom styles */
  style?: CSSProperties;
  /** Animation name if any */
  animation?: string;
  /** Animation duration */
  animationDuration?: string;
  /** Animation delay */
  animationDelay?: string;
  /** Orientation of the line */
  orientation?: "horizontal" | "vertical";
  /** Data test id */
  "data-testid"?: string;
}

export const Line: React.FC<LineProps> = ({
  width = 30,
  height = 4,
  color = "var(--react-loadly-color)",
  opacity = 1,
  borderRadius = 2,
  className = "",
  style = {},
  animation,
  animationDuration,
  animationDelay,
  orientation = "horizontal",
  "data-testid": dataTestId,
  ...props
}) => {
  const widthValue = getSizeValue(width);
  const heightValue = getSizeValue(height);
  const borderRadiusValue = sanitizeCSSValue(borderRadius);

  const lineStyle: React.CSSProperties = {
    width: orientation === "vertical" ? heightValue : widthValue,
    height: orientation === "vertical" ? widthValue : heightValue,
    backgroundColor: color,
    opacity,
    borderRadius: borderRadiusValue,
    animation: animation ? `${animation} ${animationDuration || "1s"} infinite` : undefined,
    animationDelay,
    display: "inline-block",
    ...style,
  };

  return (
    <div className={`react-loadly-line react-loadly-line-${orientation} ${className}`.trim()} style={lineStyle} data-testid={dataTestId} {...props} />
  );
};
