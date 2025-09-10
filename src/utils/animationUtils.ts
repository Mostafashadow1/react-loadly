/**
 * Calculates animation duration based on speed multiplier
 * @param baseMs - The base duration in milliseconds
 * @param speed - The speed multiplier (default: 1)
 * @returns Formatted duration string
 */
export function getAnimationDuration(baseMs: number, speed = 1): string {
  const duration = baseMs / Math.max(speed, 0.1); // Prevent division by zero
  return `${duration}ms`;
}

/**
 * Creates a CSS animation name with prefix
 * @param name - The base name for the animation
 * @returns Prefixed animation name
 */
export function createAnimationName(name: string): string {
  return `react-loadly-${name}`;
}

/**
 * Check if reduced motion is preferred
 * @returns Boolean indicating if reduced motion is preferred
 */
export function prefersReducedMotion(): boolean {
  // Check if we're in a browser environment
  if (typeof window === "undefined" || !window.matchMedia) return false;
  try {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  } catch (e) {
    return false;
  }
}

/**
 * Get optimized animation settings based on user preferences
 * @param speed - The animation speed multiplier (default: 1)
 * @returns Object with optimized animation settings
 */
export function getOptimizedAnimationSettings(speed = 1) {
  // In test environments, disable animations to prevent test failures
  if (typeof process !== "undefined" && process.env.NODE_ENV === "test") {
    return {
      duration: "0ms",
      playState: "paused",
      iterationCount: 1,
    };
  }

  const reducedMotion = prefersReducedMotion();

  return {
    duration: reducedMotion ? "0ms" : getAnimationDuration(1000, speed),
    playState: reducedMotion ? "paused" : "running",
    iterationCount: reducedMotion ? 1 : "infinite",
  };
}
