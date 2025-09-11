import React from "react";
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
export declare const Circle: ({ size, color, borderColor, borderWidth, opacity, className, style, animation, animationDuration, animationDelay, "data-testid": dataTestId, ...props }: CircleProps) => React.JSX.Element;
//# sourceMappingURL=Circle.d.ts.map