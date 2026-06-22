/**
 * Generates unique IDs for accessibility
 * @param prefix - The prefix for the ID (default: "loader")
 * @returns A unique ID string
 */
export function generateId(prefix = "loader"): string {
  return `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Validates and sanitizes CSS values
 * @param value - The CSS value to sanitize
 * @returns Sanitized CSS value or undefined
 */
export function sanitizeCSSValue(value: string | number | undefined): string | undefined {
  if (value === undefined || value === null) return undefined;
  if (typeof value === "number") return `${value}px`;
  if (typeof value === "string") {
    // Basic sanitization - remove potentially dangerous CSS
    return value.replace(/[<>'"]/g, "");
  }
  return undefined;
}
