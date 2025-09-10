/**
 * Converts hex color to RGB values
 * @param hex - The hex color string
 * @returns Object with r, g, b values or null if invalid
 */
export declare function hexToRgb(hex: string): {
    r: number;
    g: number;
    b: number;
} | null;
/**
 * Generates rgba color with opacity
 * @param color - The hex color string
 * @param opacity - The opacity value (0-1)
 * @returns RGBA color string
 */
export declare function rgba(color: string, opacity: number): string;
//# sourceMappingURL=colorUtils.d.ts.map