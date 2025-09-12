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
 * @param respectReducedMotion - Whether to respect reduced motion preference (default: true)
 * @returns Object with optimized animation settings
 */
export declare function getOptimizedAnimationSettings(speed?: number, respectReducedMotion?: boolean): {
    duration: string;
    playState: string;
    iterationCount: string | number;
};
/**
 * Get animation direction CSS value
 * @param direction - The animation direction
 * @returns CSS direction value
 */
export declare function getAnimationDirection(direction?: "normal" | "reverse" | "alternate" | "alternate-reverse"): string;
/**
 * Get animation easing CSS value
 * @param easing - The animation easing function
 * @returns CSS easing value
 */
export declare function getAnimationEasing(easing?: "linear" | "ease" | "ease-in" | "ease-out" | "ease-in-out" | "cubic-bezier"): string;
/**
 * Create a complete animation string
 * @param name - The animation name
 * @param duration - The animation duration
 * @param easing - The animation easing
 * @param direction - The animation direction
 * @param iterationCount - The iteration count
 * @returns Complete animation string
 */
export declare function createAnimationString(name: string, duration: string, easing?: string, direction?: string, iterationCount?: string | number): string;
//# sourceMappingURL=animationUtils.d.ts.map