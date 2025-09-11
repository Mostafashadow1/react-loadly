/**
 * ElementLoader Component
 *
 * A flexible loader component that can display any React element with various animation effects.
 *
 * @example
 * ```tsx
 * // Basic usage with a div element
 * <ElementLoader>
 *   <div style={{ width: '100%', height: '100%', backgroundColor: 'blue' }} />
 * </ElementLoader>
 *
 * // With different animation types
 * <ElementLoader animationType="pulse">
 *   <div>Your custom element here</div>
 * </ElementLoader>
 *
 * // With loading text
 * <ElementLoader showText loadingText="Loading...">
 *   <YourIconComponent />
 * </ElementLoader>
 * ```
 */
import { IElementLoaderProps } from "@/@types/interfaces/IElementLoaderProps";
import { FC } from "react";
export declare const ElementLoader: FC<IElementLoaderProps>;
//# sourceMappingURL=ElementLoader.d.ts.map