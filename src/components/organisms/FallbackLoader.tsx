import { IFallbackLoaderProps } from "@types";
import React, { FC } from "react";
import { CSSProperties } from "react";

const ErrorIcon: FC<{ className?: string }> = ({ className = "" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path
      clipRule="evenodd"
      fillRule="evenodd"
      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
    />
  </svg>
);

const NetworkIcon: FC<{ className?: string }> = ({ className = "" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path
      fillRule="evenodd"
      d="M9.243 3.03a1 1 0 01.727 1.213L9.53 6h2.94l.56-2.243a1 1 0 111.94.486L14.53 6H16a1 1 0 110 2h-1.97l-1 4H15a1 1 0 110 2h-2.47l-.56 2.242a1 1 0 11-1.94-.485L10.47 14H7.53l-.56 2.242a1 1 0 11-1.94-.485L5.47 14H4a1 1 0 110-2h1.97l1-4H5a1 1 0 110-2h2.47l.56-2.243a1 1 0 011.213-.727zM9.03 8l-1 4h2.94l1-4H9.03z"
      clipRule="evenodd"
    />
  </svg>
);

const TimeoutIcon: FC<{ className?: string }> = ({ className = "" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path
      fillRule="evenodd"
      d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
      clipRule="evenodd"
    />
  </svg>
);

export const FallbackLoader: FC<IFallbackLoaderProps> = ({ 
  error = "Something went wrong", 
  onRetry, 
  showRetry = true, 
  children, 
  type = "error",
  className = "",
  style = {},
  fullscreen,
  screenWidth,
  screenHeight,
  loaderCenter,
  screenBackground,
  ...restProps
}) => {
  const getIcon = () => {
    switch (type) {
      case "network":
        return <NetworkIcon className="react-loadly-error-icon" />;
      case "timeout":
        return <TimeoutIcon className="react-loadly-error-icon" />;
      default:
        return <ErrorIcon className="react-loadly-error-icon" />;
    }
  };

  const getMessage = () => {
    switch (type) {
      case "network":
        return error || "Network connection failed. Please check your internet connection.";
      case "timeout":
        return error || "Loading timeout. The operation took too long to complete.";
      default:
        return error || "Something went wrong. Please try again.";
    }
  };

  const containerStyle: CSSProperties = {
    ...style,
    ...(fullscreen && {
      position: "fixed",
      top: 0,
      left: 0,
      width: screenWidth || "100vw",
      height: screenHeight || "100vh",
      backgroundColor: screenBackground || "var(--react-loadly-error-background)",
      zIndex: 9999,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: loaderCenter ? "center" : (style.justifyContent as React.CSSProperties["justifyContent"]),
    }),
  };

  if (children) {
    return <div className={`react-loadly-fallback ${className}`.trim()} style={containerStyle} {...restProps}>{children}</div>;
  }

  return (
    <div className={`react-loadly-error ${className}`.trim()} style={containerStyle} role="alert" aria-live="polite" {...restProps}>
      {getIcon()}
      <p className="react-loadly-error-message">{getMessage()}</p>
      {showRetry && onRetry && (
        <button className="react-loadly-retry-button" onClick={onRetry} type="button" aria-label="Retry loading">
          Try Again
        </button>
      )}
    </div>
  );
};