import { ILoaderCSSVariables } from "@/@types";

/**
 * Merges default props with user props, handling undefined values gracefully
 * @param defaultProps - The default props to merge
 * @param userProps - The user provided props
 * @returns Merged props object
 */
export function mergeProps<T extends object, U extends object>(defaultProps: T, userProps: U): T & U {
  return { ...defaultProps, ...userProps } as T & U;
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
