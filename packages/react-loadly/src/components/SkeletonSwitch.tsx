import React from "react";

export interface SkeletonSwitchProps {
  loading: boolean;
  error?: Error | null;
  empty?: boolean;
  skeleton: React.ReactNode;
  errorFallback?: React.ReactNode | ((error: Error) => React.ReactNode);
  emptyFallback?: React.ReactNode;
  transition?: "fade" | "none";
  children?: React.ReactNode;
}

export function SkeletonSwitch({
  loading,
  error = null,
  empty = false,
  skeleton,
  errorFallback = null,
  emptyFallback = null,
  transition = "fade",
  children,
}: SkeletonSwitchProps) {
  if (error) {
    return <>{typeof errorFallback === "function" ? errorFallback(error) : errorFallback}</>;
  }

  if (transition === "none") {
    if (loading) return <>{skeleton}</>;
    if (empty) return <>{emptyFallback}</>;
    return <>{children}</>;
  }

  if (empty && !loading) {
    return <>{emptyFallback}</>;
  }

  return (
    <div className="react-loadly-skeleton-switch" style={{ position: "relative" }} aria-busy={loading}>
      <div
        className="react-loadly-skeleton-switch__skeleton"
        style={{
          opacity: loading ? 1 : 0,
          transition: "opacity 300ms ease",
          pointerEvents: loading ? "auto" : "none",
        }}
      >
        {skeleton}
      </div>
      <div
        className="react-loadly-skeleton-switch__content"
        style={{
          opacity: loading ? 0 : 1,
          transition: "opacity 300ms ease",
          position: loading ? "absolute" : "relative",
          top: 0,
          left: 0,
          right: 0,
        }}
      >
        {children}
      </div>
    </div>
  );
}

export default SkeletonSwitch;
