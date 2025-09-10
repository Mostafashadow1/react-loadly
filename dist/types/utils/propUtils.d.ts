import { ILoaderCSSVariables } from "@/@types";
/**
 * Merges default props with user props, handling undefined values gracefully
 * @param defaultProps - The default props to merge
 * @param userProps - The user provided props
 * @returns Merged props object
 */
export declare function mergeProps<T extends object, U extends object>(defaultProps: T, userProps: U): T & U;
/**
 * Converts size prop to CSS value
 * @param size - The size value (number or string)
 * @param fallback - The fallback value if size is undefined
 * @returns CSS size value as string
 */
export declare function getSizeValue(size: number | string | undefined, fallback?: string): string;
/**
 * Generates CSS custom properties object from loader variables
 * @param variables - The loader CSS variables object
 * @returns React CSS properties object
 */
export declare function generateCSSVariables(variables: ILoaderCSSVariables): React.CSSProperties;
//# sourceMappingURL=propUtils.d.ts.map