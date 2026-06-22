import { clamp } from "./mathUtils";

/**
 * Converts hex color to RGB values
 * @param hex - The hex color string
 * @returns Object with r, g, b values or null if invalid
 */
export function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

/**
 * Generates rgba color with opacity
 * @param color - The hex color string
 * @param opacity - The opacity value (0-1)
 * @returns RGBA color string
 */
export function rgba(color: string, opacity: number): string {
  const rgb = hexToRgb(color);
  if (!rgb) return color;
  return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${clamp(opacity, 0, 1)})`;
}
