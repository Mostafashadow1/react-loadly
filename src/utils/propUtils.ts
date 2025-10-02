import { ILoaderCSSVariables } from "@/@types";

/**
 * Merges default props with user props, handling undefined values gracefully
 * This utility ensures that all default values from IBaseLoaderProps are applied
 * while allowing user props to override them.
 *
 * @param defaultProps - The default props to merge
 * @param userProps - The user provided props
 * @returns Merged props object with defaults applied
 */

export function mergeProps<T extends object, U extends object>(defaultProps: T, userProps: U): T & U {
  const merged = { ...defaultProps } as T & U;

  for (const key in userProps) {
    const value = userProps[key];
    if (value !== undefined) {
      merged[key as keyof (T & U)] = value as any;
    }
  }

  return merged;
}

/**
 * Converts size prop to CSS value
 * @param size - The size value (number or string)
 * @param fallback - The fallback value if size is undefined
 * @returns CSS size value as string
 */
export function getSizeValue(size: number | string | undefined, fallback = "40px"): string {
  if (size === undefined) return fallback;
  if (typeof size === "number") return `${size}px`;
  return size;
}

/**
 * Generates CSS custom properties object from loader variables
 * @param variables - The loader CSS variables object
 * @returns React CSS properties object
 */
export function generateCSSVariables(variables: ILoaderCSSVariables): React.CSSProperties {
  const cssProps: React.CSSProperties = {};

  Object.entries(variables).forEach(([key, value]) => {
    if (value !== undefined) {
      cssProps[key as keyof React.CSSProperties] = value;
    }
  });

  return cssProps;
}
