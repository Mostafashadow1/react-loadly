import { IBaseLoaderProps } from "../@types/interfaces/IBaseLoaderProps";

// Global default props for all loaders
export const LIB_DEFAULTS: IBaseLoaderProps = {
  size: 40,
  color: "var(--react-loadly-color)",
  speed: 1,
  loading: true,
  "aria-label": "Loading...",
  showText: false,
  loadingText: "Loading...",
  fullscreen: false,
};

// Global hook for accessing and overriding defaults
let globalDefaults = { ...LIB_DEFAULTS };

/**
 * Get the current global default props
 * @returns Current global defaults
 */
export function getGlobalDefaults(): IBaseLoaderProps {
  return { ...globalDefaults };
}

/**
 * Set new global default props
 * @param newDefaults - Partial object with new default values
 */
export function setGlobalDefaults(newDefaults: Partial<IBaseLoaderProps>): void {
  globalDefaults = { ...globalDefaults, ...newDefaults };
}

/**
 * Reset global defaults to library defaults
 */
export function resetGlobalDefaults(): void {
  globalDefaults = { ...LIB_DEFAULTS };
}
