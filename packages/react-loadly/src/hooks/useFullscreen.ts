import { CSSProperties } from "react";

export interface UseFullscreenProps {
  fullscreen?: boolean;
  screenWidth?: string | number;
  screenHeight?: string | number;
  loaderCenter?: boolean;
  screenBackground?: string;
  style?: CSSProperties;
}

/**
 * Computes container styles with support for fullscreen mode.
 * Centralizes fullscreen logic across all loader components.
 *
 * NOTE: This is intentionally a plain utility function (not a React hook)
 * so it can be called safely after conditional logic inside components.
 */
export function useFullscreen(props: UseFullscreenProps): CSSProperties {
  const {
    fullscreen,
    screenWidth,
    screenHeight,
    loaderCenter,
    screenBackground,
    style = {},
  } = props;

  return {
    display: "inline-flex",
    flexDirection: "column",
    alignItems: "center",
    ...style,
    ...(fullscreen && {
      position: "fixed",
      top: 0,
      left: 0,
      width: screenWidth || "100vw",
      height: screenHeight || "100vh",
      backgroundColor: screenBackground || "var(--react-loadly-background)",
      zIndex: 9999,
      justifyContent: loaderCenter ? "center" : style.justifyContent,
    }),
  };
}

/**
 * Alias for useFullscreen — plain utility to compute loader container styles.
 * Prefer this name when calling outside of hook-order constraints.
 */
export const getContainerStyle = useFullscreen;
