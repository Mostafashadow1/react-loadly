import React from "react";
import {
  defaultSkeletonLoaderTheme,
  SkeletonGroupLoaderContext,
  SkeletonLoaderAnimation,
} from "../context/SkeletonGroupLoaderContext";

const STYLE_ID = "react-loadly-skeletonize-styles";
const useIsomorphicLayoutEffect = typeof document === "undefined" ? React.useEffect : React.useLayoutEffect;

export interface SkeletonizeProps extends React.HTMLAttributes<HTMLElement> {
  /** While true, the children render as a skeleton of themselves. */
  loading: boolean;
  animation?: SkeletonLoaderAnimation;
  baseColor?: string;
  highlightColor?: string;
  /** Animation duration in seconds. */
  speed?: number;
  /** Text announced to screen readers while loading. */
  loadingLabel?: string;
  as?: React.ElementType;
}

const TEXT = [
  "h1", "h2", "h3", "h4", "h5", "h6", "p", "span", "a", "label", "small", "strong", "b", "em", "i",
  "code", "time", "figcaption", "blockquote",
  // Containers only become a block when they hold text directly, not other elements.
  "div:not(:has(*))", "li:not(:has(*))", "td:not(:has(*))", "th:not(:has(*))",
  "dt:not(:has(*))", "dd:not(:has(*))",
].join(",");

// Text, media and controls get the skeleton fill; containers keep their own background and borders.
const FILLED = [TEXT, "button", "input", "select", "textarea", "img", "svg", "video", "picture", "[data-skeleton]"].join(",");

const ROOT = ".react-loadly-skeletonize[data-loading]";

const SKELETONIZE_CSS = `
.react-loadly-skeletonize-status {
  position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px;
  overflow: hidden; clip: rect(0, 0, 0, 0); white-space: nowrap; border: 0;
}
${ROOT} { cursor: progress; user-select: none; pointer-events: none; }
${ROOT} *, ${ROOT} *::placeholder {
  color: transparent !important; text-shadow: none !important; caret-color: transparent !important;
}
${ROOT} :where(${FILLED}) {
  background: var(--rl-skz-base) !important;
  border-color: transparent !important;
  box-shadow: none !important;
  outline: none !important;
}
${ROOT} :where(${TEXT}) {
  border-radius: 4px;
  /* Trim the line-height leading so stacked text lines read as separate bars. */
  -webkit-mask-image: linear-gradient(transparent 12%, #000 12%, #000 88%, transparent 88%);
  mask-image: linear-gradient(transparent 12%, #000 12%, #000 88%, transparent 88%);
}
${ROOT} :where(img, video) { object-position: -99999px -99999px; }
/* Placeholder images often have no src yet; cover the browser's broken-image icon. */
${ROOT} img { position: relative; }
${ROOT} img::after { content: ""; position: absolute; inset: 0; background: inherit; border-radius: inherit; }
${ROOT} svg * { fill: transparent !important; stroke: transparent !important; }
${ROOT}[data-animation="shimmer"] :where(${FILLED}),
${ROOT}[data-animation="wave"] :where(${FILLED}) {
  background-image: linear-gradient(var(--rl-skz-angle), var(--rl-skz-base) 25%, var(--rl-skz-highlight) 50%, var(--rl-skz-base) 75%) !important;
  background-size: 400px 100% !important;
  background-attachment: fixed !important;
  animation: react-loadly-skeletonize-shimmer var(--rl-skz-speed) linear infinite;
  animation-direction: var(--rl-skz-direction);
}
${ROOT}[data-animation="pulse"] { animation: react-loadly-skeletonize-pulse var(--rl-skz-speed) ease-in-out infinite; }
@keyframes react-loadly-skeletonize-shimmer {
  0% { background-position: -400px 0; }
  100% { background-position: 0 0; }
}
@keyframes react-loadly-skeletonize-pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}
@media (prefers-reduced-motion: reduce) {
  ${ROOT}, ${ROOT} :where(${FILLED}) { animation: none !important; }
}
`;

const injectSkeletonizeStyles = () => {
  if (typeof document === "undefined" || document.getElementById(STYLE_ID)) return;

  const style = document.createElement("style");
  style.id = STYLE_ID;
  style.textContent = SKELETONIZE_CSS;
  document.head.appendChild(style);
};

/**
 * Renders its children as a skeleton of themselves while `loading` is true.
 *
 * Pass the real component with placeholder data; text, images, icons and form controls
 * become skeleton blocks with the exact size and position of the real UI.
 */
export function Skeletonize({
  loading,
  animation,
  baseColor,
  highlightColor,
  speed,
  loadingLabel = "Loading",
  as,
  className,
  style,
  children,
  ...rest
}: SkeletonizeProps) {
  const ref = React.useRef<HTMLElement | null>(null);
  const context = React.useContext(SkeletonGroupLoaderContext);
  const Component = as ?? "div";

  useIsomorphicLayoutEffect(() => {
    if (loading) injectSkeletonizeStyles();
    // React 18 has no `inert` prop, so it is set on the DOM node.
    ref.current?.toggleAttribute("inert", loading);
  }, [loading]);

  const resolvedAnimation = animation ?? context.animation ?? defaultSkeletonLoaderTheme.animation;
  const direction = context.direction ?? defaultSkeletonLoaderTheme.direction;

  const loadingStyle: React.CSSProperties | undefined = loading
    ? {
        ["--rl-skz-base" as string]: baseColor ?? context.baseColor ?? defaultSkeletonLoaderTheme.baseColor,
        ["--rl-skz-highlight" as string]:
          highlightColor ?? context.highlightColor ?? defaultSkeletonLoaderTheme.highlightColor,
        ["--rl-skz-speed" as string]: `${speed ?? context.speed ?? defaultSkeletonLoaderTheme.speed}s`,
        ["--rl-skz-angle" as string]: direction === "rtl" ? "270deg" : "90deg",
        ["--rl-skz-direction" as string]: direction === "rtl" ? "reverse" : "normal",
      }
    : undefined;

  return (
    <>
      {loading && (
        <span className="react-loadly-skeletonize-status" role="status">
          {loadingLabel}
        </span>
      )}
      <Component
        ref={ref}
        className={["react-loadly-skeletonize", className].filter(Boolean).join(" ")}
        style={loadingStyle ? { ...loadingStyle, ...style } : style}
        data-loading={loading ? "" : undefined}
        data-animation={loading ? resolvedAnimation : undefined}
        aria-busy={loading || undefined}
        aria-hidden={loading || undefined}
        {...rest}
      >
        {children}
      </Component>
    </>
  );
}
