import React from "react";
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
export declare const LineGroup: React.FC<LineGroupProps>;
//# sourceMappingURL=LineGroup.d.ts.map