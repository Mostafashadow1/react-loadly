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
export declare const ShapeGroup: React.FC<ShapeGroupProps>;
//# sourceMappingURL=ShapeGroup.d.ts.map