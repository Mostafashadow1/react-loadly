import { IUseLoaderStateOptions, IUseLoaderStateReturn } from "../@types";
/**
 * Hook for tracking async operations with automatic loading state management
 * Automatically handles loading states during async operations and provides error handling
 *
 * @param asyncFn - Async function to execute and track
 * @param dependencies - Dependency array to trigger re-execution (similar to useEffect)
 * @param options - Configuration options for the loader state
 * @returns Object containing loader state, data result, and execution method
 */
export declare const useAsyncLoader: <T>(asyncFn: () => Promise<T>, dependencies?: React.DependencyList, options?: IUseLoaderStateOptions) => IUseLoaderStateReturn & {
    data: T | null;
    execute: () => Promise<T | null>;
};
//# sourceMappingURL=useAsyncLoader.d.ts.map