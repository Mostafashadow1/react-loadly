import { ReactNode } from "react";
import { IBaseLoaderProps } from "./IBaseLoaderProps";

export interface IFallbackLoaderProps extends IBaseLoaderProps {
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