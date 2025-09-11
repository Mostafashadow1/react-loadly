import React, { type CSSProperties } from "react";
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
export declare const Line: React.FC<LineProps>;
//# sourceMappingURL=Line.d.ts.map