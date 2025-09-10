export interface ILoaderState {
  isLoading: boolean;
  progress?: number;
  error?: string | null;
  retryCount?: number;
}
