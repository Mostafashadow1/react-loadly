/**
 * Calculates animation duration based on speed multiplier
 * @param baseMs - The base duration in milliseconds
 * @param speed - The speed multiplier (default: 1)
 * @returns Formatted duration string
 */
export declare function getAnimationDuration(baseMs: number, speed?: number): string;
/**
 * Creates a CSS animation name with prefix
 * @param name - The base name for the animation
 * @returns Prefixed animation name
 */
export declare function createAnimationName(name: string): string;
/**
 * Check if reduced motion is preferred
 * @returns Boolean indicating if reduced motion is preferred
 */
export declare function prefersReducedMotion(): boolean;
/**
 * Get optimized animation settings based on user preferences
 * @param speed - The animation speed multiplier (default: 1)
 * @returns Object with optimized animation settings
 */
export declare function getOptimizedAnimationSettings(speed?: number): {
    duration: string;
    playState: string;
    iterationCount: string | number;
};
//# sourceMappingURL=animationUtils.d.ts.map