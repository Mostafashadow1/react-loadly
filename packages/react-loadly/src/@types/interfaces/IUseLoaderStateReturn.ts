import { ILoaderState } from "./ILoaderState";

export interface IUseLoaderStateReturn {
  state: ILoaderState;
  setLoading: (loading: boolean) => void;
  setProgress: (progress: number) => void;
  setError: (error: string | null) => void;
  retry: () => void;
  reset: () => void;
}
