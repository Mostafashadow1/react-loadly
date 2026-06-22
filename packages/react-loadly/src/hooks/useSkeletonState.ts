import { useState, useEffect, useCallback, DependencyList } from "react";

export interface UseSkeletonStateOptions<T> {
  fetch: () => Promise<T>;
  deps?: DependencyList;
  minDisplayTime?: number; // Minimum time in ms to show the loading skeleton
}

export interface UseSkeletonStateReturn<T> {
  loading: boolean;
  data: T | null;
  error: Error | null;
  retry: () => void;
  skeleton: {
    loading: boolean;
  };
}

/**
 * Hook for managing loading, data, and skeleton orchestration.
 * Employs a minDisplayTime stabilizer to prevent rapid layout flashing.
 */
export function useSkeletonState<T>({
  fetch,
  deps = [],
  minDisplayTime = 300,
}: UseSkeletonStateOptions<T>): UseSkeletonStateReturn<T> {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [refreshCount, setRefreshCount] = useState(0);

  const retry = useCallback(() => {
    setRefreshCount((prev) => prev + 1);
  }, []);

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError(null);

    const startTime = Date.now();

    fetch()
      .then((result) => {
        if (!active) return;
        const elapsedTime = Date.now() - startTime;
        const remainingTime = Math.max(0, minDisplayTime - elapsedTime);

        if (remainingTime > 0) {
          setTimeout(() => {
            if (active) {
              setData(result);
              setLoading(false);
            }
          }, remainingTime);
        } else {
          setData(result);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (!active) return;
        setData(null);
        setError(err instanceof Error ? err : new Error(String(err)));
        setLoading(false);
      });

    return () => {
      active = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refreshCount, ...deps]);

  return {
    loading,
    data,
    error,
    retry,
    skeleton: {
      loading,
    },
  };
}
