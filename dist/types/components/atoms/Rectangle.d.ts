import React from "react";
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
export declare const Rectangle: React.FC<RectangleProps>;
//# sourceMappingURL=Rectangle.d.ts.map