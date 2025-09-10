import { useLoaderState } from "./useLoaderState";
import { IUseLoaderStateOptions, IUseLoaderStateReturn } from "../@types";

/**
 * Hook for managing multiple loader states with shared options
 * Useful when you need to control multiple loaders with the same configuration
 *
 * @param keys - Array of string keys representing each loader state
 * @param options - Shared configuration options for all loader states
 * @returns Record mapping each key to its corresponding loader state methods
 */
export const useMultipleLoaderStates = (
  keys: string[],
  options: IUseLoaderStateOptions = {}
): Record<string, IUseLoaderStateReturn> => {
  return keys.reduce((acc, key) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    acc[key] = useLoaderState(options);
    return acc;
  }, {} as Record<string, IUseLoaderStateReturn>);
};
