import React from "react";

export interface UseSkeletonResult<T> {
  data: T | null;
  isLoading: boolean;
  error: Error | null;
  refetch: () => void;
}

export function useSkeleton<T>(fetcher: () => Promise<T>, deps: React.DependencyList): UseSkeletonResult<T> {
  const [data, setData] = React.useState<T | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<Error | null>(null);
  const [refetchIndex, setRefetchIndex] = React.useState(0);

  React.useEffect(() => {
    let cancelled = false;

    setIsLoading(true);
    setError(null);

    fetcher()
      .then((result) => {
        if (cancelled) return;
        setData(result);
        setIsLoading(false);
        setError(null);
      })
      .catch((caught: unknown) => {
        if (cancelled) return;
        setData(null);
        setIsLoading(false);
        setError(caught instanceof Error ? caught : new Error(String(caught)));
      });

    return () => {
      cancelled = true;
    };
  }, [...deps, refetchIndex]);

  const refetch = React.useCallback(() => {
    setRefetchIndex((current) => current + 1);
  }, []);

  return { data, isLoading, error, refetch };
}

export default useSkeleton;
