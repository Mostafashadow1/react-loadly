import { getSizeValue, sanitizeCSSValue } from "@/utils";
import React, { type CSSProperties } from "react";

export interface CircleProps {
  size?: number | string;
  color?: string;
  borderColor?: string;
  borderWidth?: number | string;
  opacity?: number;
  className?: string;
  style?: React.CSSProperties;
  animation?: string;
  animationDuration?: string;
  animationDelay?: string;
  "data-testid"?: string;
}

export const Circle = ({
  size = 20,
  color = "var(--react-loadly-color)",
  borderColor,
  borderWidth = 0,
  opacity = 1,
  className = "",
  style = {},
  animation,
  animationDuration,
  animationDelay,
  "data-testid": dataTestId,
  ...props
}: CircleProps) => {
  const sizeValue = getSizeValue(size);
  const borderWidthValue = sanitizeCSSValue(borderWidth);

  const circleStyle: CSSProperties = {
    width: sizeValue,
    height: sizeValue,
    borderRadius: "50%",
    backgroundColor: borderColor ? "transparent" : color,
    border: borderColor ? `${borderWidthValue} solid ${borderColor}` : undefined,
    opacity,
    animation: animation ? `${animation} ${animationDuration || "1s"} infinite` : undefined,
    animationDelay,
    display: "inline-block",
    ...style,
  };

  return <div className={`react-loadly-circle ${className}`.trim()} style={circleStyle} data-testid={dataTestId} {...props} />;
};
