import { ReactNode } from "react";
export interface IFallbackLoaderProps {
    /** Error message to display */
    error?: string;
    /** Retry function */
    onRetry?: () => void;
    /** Show retry button */
    showRetry?: boolean;
    /** Custom fallback content */
    children?: ReactNode;
    /** Fallback type */
    type?: "error" | "timeout" | "network";
}
//# sourceMappingURL=IFallbackLoaderProps.d.ts.map