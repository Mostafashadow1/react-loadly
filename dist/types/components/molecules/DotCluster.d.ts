export interface DotClusterProps {
    /** Number of dots in the cluster */
    count?: number;
    /** Size of each dot */
    dotSize?: number | string;
    /** Color of the dots */
    color?: string;
    /** Secondary color for alternating dots */
    secondaryColor?: string;
    /** Spacing between dots */
    spacing?: number | string;
    /** Animation speed multiplier */
    speed?: number;
    /** Cluster arrangement */
    arrangement?: "linear" | "circular" | "grid";
    /** Custom CSS class */
    className?: string;
    /** Custom styles */
    style?: React.CSSProperties;
    /** Animation type */
    animationType?: "wave" | "pulse" | "fade" | "bounce";
    /** Data test id */
    "data-testid"?: string;
}
export declare const DotCluster: React.FC<DotClusterProps>;
//# sourceMappingURL=DotCluster.d.ts.map