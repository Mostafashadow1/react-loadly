import { useRef } from "react";
import { useLoaderState } from "./useLoaderState";
import { IUseLoaderStateOptions, IUseLoaderStateReturn } from "../@types";

/**
 * Hook for managing multiple loader states with shared options.
 * Useful when you need to control multiple loaders with the same configuration.
 *
 * @param keys - Array of string keys representing each loader state
 * @param options - Shared configuration options for all loader states
 * @returns Record mapping each key to its corresponding loader state methods
 *
 * @deprecated This hook violates React Rules of Hooks under the hood by dynamically calling hooks in a loop.
 * For v3, it is guarded against keys length changes at runtime. It will be removed in v4.
 */
export const useMultipleLoaderStates = (
  keys: string[],
  options: IUseLoaderStateOptions = {}
): Record<string, IUseLoaderStateReturn> => {
  const initialKeysLength = useRef(keys.length);

  if (keys.length !== initialKeysLength.current) {
    throw new Error(
      `[react-loadly] useMultipleLoaderStates: The number of keys passed to useMultipleLoaderStates must not change between renders. ` +
        `Initial count: ${initialKeysLength.current}, current count: ${keys.length}.`
    );
  }

  return keys.reduce((acc, key) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    acc[key] = useLoaderState(options);
    return acc;
  }, {} as Record<string, IUseLoaderStateReturn>);
};

