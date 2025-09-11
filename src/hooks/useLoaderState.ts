import { useState, useEffect, useCallback, useRef } from "react";
import { ILoaderState, IUseLoaderStateOptions, IUseLoaderStateReturn } from "../@types";

/**
 * Custom React hook for managing loader state with advanced features
 * Provides centralized loading state management with timeout, retry, and progress tracking
 *
 * @param options - Configuration options for the loader state
 * @returns Object containing state and methods to control the loader
 */
export const useLoaderState = (options: IUseLoaderStateOptions = {}): IUseLoaderStateReturn => {
  const { initialLoading = false, timeout, maxRetries = 3, onLoadingChange, onError, onProgress } = options;

  const [state, setState] = useState<ILoaderState>({
    isLoading: initialLoading,
    progress: 0,
    error: null,
    retryCount: 0,
  });

  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const retryTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Clear timeouts on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      if (retryTimeoutRef.current) {
        clearTimeout(retryTimeoutRef.current);
      }
    };
  }, []);

  // Handle timeout
  useEffect(() => {
    if (state.isLoading && timeout) {
      timeoutRef.current = setTimeout(() => {
        setState((prev) => ({
          ...prev,
          isLoading: false,
          error: "Loading timeout exceeded",
        }));
        onError?.("Loading timeout exceeded");
      }, timeout);
    } else if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [state.isLoading, timeout, onError]);

  // Call onLoadingChange when loading state changes
  useEffect(() => {
    onLoadingChange?.(state.isLoading);
  }, [state.isLoading, onLoadingChange]);

  // Call onProgress when progress changes
  useEffect(() => {
    if (state.progress !== undefined) {
      onProgress?.(state.progress);
    }
  }, [state.progress, onProgress]);

  const setLoading = useCallback((loading: boolean) => {
    setState((prev) => ({
      ...prev,
      isLoading: loading,
      error: loading ? null : prev.error, // Clear error when starting new loading
      progress: loading ? 0 : prev.progress, // Reset progress when starting
    }));
  }, []);

  const setProgress = useCallback((progress: number) => {
    const clampedProgress = Math.min(Math.max(progress, 0), 100);
    setState((prev) => ({
      ...prev,
      progress: clampedProgress,
      // Auto-complete when progress reaches 100%
      isLoading: clampedProgress >= 100 ? false : prev.isLoading,
    }));
  }, []);

  const setError = useCallback(
    (error: string | null) => {
      setState((prev) => ({
        ...prev,
        error,
        isLoading: false,
      }));
      if (error) {
        onError?.(error);
      }
    },
    [onError],
  );

  const retry = useCallback(() => {
    setState((prev) => {
      const newRetryCount = (prev.retryCount || 0) + 1;

      if (newRetryCount > maxRetries) {
        onError?.("Maximum retry attempts exceeded");
        return {
          ...prev,
          error: "Maximum retry attempts exceeded",
          isLoading: false,
        };
      }

      return {
        ...prev,
        retryCount: newRetryCount,
        isLoading: true,
        error: null,
        progress: 0,
      };
    });

    // Add exponential backoff for retries
    const backoffDelay = Math.min(1000 * Math.pow(2, state.retryCount || 0), 30000);
    retryTimeoutRef.current = setTimeout(() => {
      setState((prev) => ({ ...prev, isLoading: true }));
    }, backoffDelay);
  }, [state.retryCount, maxRetries, onError]);

  const reset = useCallback(() => {
    setState({
      isLoading: false,
      progress: 0,
      error: null,
      retryCount: 0,
    });

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    if (retryTimeoutRef.current) {
      clearTimeout(retryTimeoutRef.current);
    }
  }, []);

  return {
    state,
    setLoading,
    setProgress,
    setError,
    retry,
    reset,
  };
};
