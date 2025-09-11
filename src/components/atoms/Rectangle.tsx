import { getSizeValue, sanitizeCSSValue } from "@/utils";
import React, { type CSSProperties } from "react";

export interface RectangleProps {
  /** Width of the rectangle */
  width?: number | string;
  /** Height of the rectangle */
  height?: number | string;
  /** Fill color */
  color?: string;
  /** Border color */
  borderColor?: string;
  /** Border width */
  borderWidth?: number | string;
  /** Border radius */
  borderRadius?: number | string;
  /** Opacity */
  opacity?: number;
  /** Custom CSS class */
  className?: string;
  /** Custom styles */
  style?: React.CSSProperties;
  /** Animation name if any */
  animation?: string;
  /** Animation duration */
  animationDuration?: string;
  /** Animation delay */
  animationDelay?: string;
  /** Data test id */
  "data-testid"?: string;
}

export const Rectangle: React.FC<RectangleProps> = ({
  width = 20,
  height = 20,
  color = "var(--react-loadly-color)",
  borderColor,
  borderWidth = 0,
  borderRadius = 0,
  opacity = 1,
  className = "",
  style = {},
  animation,
  animationDuration,
  animationDelay,
  "data-testid": dataTestId,
  ...props
}) => {
  const widthValue = getSizeValue(width);
  const heightValue = getSizeValue(height);
  const borderWidthValue = sanitizeCSSValue(borderWidth);
  const borderRadiusValue = sanitizeCSSValue(borderRadius);

  const rectangleStyle: CSSProperties = {
    width: widthValue,
    height: heightValue,
    backgroundColor: borderColor ? "transparent" : color,
    border: borderColor ? `${borderWidthValue} solid ${borderColor}` : undefined,
    borderRadius: borderRadiusValue,
    opacity,
    animation: animation ? `${animation} ${animationDuration || "1s"} infinite` : undefined,
    animationDelay,
    display: "inline-block",
    ...style,
  };

  return <div className={`react-loadly-rectangle ${className}`.trim()} style={rectangleStyle} data-testid={dataTestId} {...props} />;
};
