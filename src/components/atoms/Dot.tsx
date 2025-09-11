import { getSizeValue } from "@/utils";
import React, { type CSSProperties } from "react";

export interface DotProps {
  size?: number | string;
  color?: string;
  opacity?: number;
  className?: string;
  style?: CSSProperties;
  animation?: string;
  animationDuration?: string;
  animationDelay?: string;
  glowIntensity?: number;
  "data-testid"?: string;
}

export const Dot: React.FC<DotProps> = ({
  size = 8,
  color = "var(--react-loadly-color)",
  opacity = 1,
  className = "",
  style = {},
  animation,
  animationDuration,
  animationDelay,
  glowIntensity = 0,
  "data-testid": dataTestId,
  ...props
}) => {
  const sizeValue = getSizeValue(size);

  const dotStyle: CSSProperties = {
    width: sizeValue,
    height: sizeValue,
    borderRadius: "50%",
    backgroundColor: color,
    opacity,
    animation: animation ? `${animation} ${animationDuration || "1s"} infinite` : undefined,
    animationDelay,
    display: "inline-block",
    boxShadow: glowIntensity > 0 ? `0 0 ${glowIntensity * 10}px ${color}` : undefined,
    ...style,
  };

  return <div className={`react-loadly-dot ${className}`.trim()} style={dotStyle} data-testid={dataTestId} {...props} />;
};
