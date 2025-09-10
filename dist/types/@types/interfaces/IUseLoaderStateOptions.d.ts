export interface IUseLoaderStateOptions {
    initialLoading?: boolean;
    timeout?: number;
    maxRetries?: number;
    onLoadingChange?: (isLoading: boolean) => void;
    onError?: (error: string) => void;
    onProgress?: (progress: number) => void;
}
//# sourceMappingURL=IUseLoaderStateOptions.d.ts.map