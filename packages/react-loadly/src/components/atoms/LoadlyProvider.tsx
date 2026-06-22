import React, { createContext, useContext, useEffect, FC, ReactNode } from "react";
import { IBaseLoaderProps } from "@/@types/interfaces/IBaseLoaderProps";
import { baseCSSString } from "@/styles/cssString";

export type CenteringHeuristic = (className: string) => boolean;

export interface LoadlyContextType {
  defaults?: Partial<IBaseLoaderProps>;
  theme?: "light" | "dark";
  heuristics?: CenteringHeuristic[];
}

export interface LoadlyProviderProps extends LoadlyContextType {
  children: ReactNode;
  injectStyles?: boolean;
}

const LoadlyContext = createContext<LoadlyContextType>({});

export const useLoadly = () => useContext(LoadlyContext);

export const LoadlyProvider: FC<LoadlyProviderProps> = ({
  children,
  defaults = {},
  theme,
  heuristics = [],
  injectStyles = true,
}) => {
  // Inject CSS styles dynamically
  useEffect(() => {
    if (!injectStyles || typeof document === "undefined") return;

    let styleElement = document.getElementById("react-loadly-styles") as HTMLStyleElement | null;
    if (!styleElement) {
      styleElement = document.createElement("style");
      styleElement.id = "react-loadly-styles";
      styleElement.innerHTML = baseCSSString;
      document.head.appendChild(styleElement);
    }
  }, [injectStyles]);

  // Premium dark mode colors
  const themeStyles = theme === "dark" ? {
    "--react-loadly-color": "#818cf8",
    "--react-loadly-secondary-color": "#a78bfa",
    "--react-loadly-background": "#0f172a",
    "--react-loadly-text-color": "#94a3b8",
    "--react-loadly-error-color": "#f87171",
    "--react-loadly-error-color-hover": "#ef4444",
    "--react-loadly-error-background": "#1e1b4b",
    "--react-loadly-error-border": "#312e81",
  } as React.CSSProperties : {};

  return (
    <LoadlyContext.Provider value={{ defaults, theme, heuristics }}>
      <div style={themeStyles} className={theme ? `react-loadly-theme-${theme}` : undefined}>
        {children}
      </div>
    </LoadlyContext.Provider>
  );
};

LoadlyProvider.displayName = "LoadlyProvider";
export { LoadlyContext };
