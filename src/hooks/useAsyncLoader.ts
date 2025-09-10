import { useCallback, useEffect, useState } from "react";
import { IUseLoaderStateOptions, IUseLoaderStateReturn } from "../@types";
import { useLoaderState } from "./useLoaderState";

/**
 * Hook for tracking async operations with automatic loading state management
 * Automatically handles loading states during async operations and provides error handling
 *
 * @param asyncFn - Async function to execute and track
 * @param dependencies - Dependency array to trigger re-execution (similar to useEffect)
 * @param options - Configuration options for the loader state
 * @returns Object containing loader state, data result, and execution method
 */
export const useAsyncLoader = <T>(
  asyncFn: () => Promise<T>,
  dependencies: React.DependencyList = [],
  options: IUseLoaderStateOptions = {},
): IUseLoaderStateReturn & {
  data: T | null;
  execute: () => Promise<T | null>;
} => {
  const loaderState = useLoaderState(options);
  const [data, setData] = useState<T | null>(null);

  const execute = useCallback(async (): Promise<T | null> => {
    try {
      loaderState.setLoading(true);
      loaderState.setError(null);

      const result = await asyncFn();
      setData(result);
      loaderState.setProgress(100);

      return result;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
      loaderState.setError(errorMessage);
      return null;
    }
  }, [asyncFn, loaderState]);

  // Auto-execute on dependency changes
  useEffect(() => {
    execute();
  }, dependencies);

  return {
    ...loaderState,
    data,
    execute,
  };
};
