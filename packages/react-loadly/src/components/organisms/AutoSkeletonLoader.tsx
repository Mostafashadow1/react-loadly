import React, { type CSSProperties, FC, ReactElement, cloneElement, useMemo } from "react";
import { mergeProps } from "@/utils";
import { IAutoSkeletonProps } from "@/@types/interfaces/IAutoSkeletonProps";
import { classNameGen } from "@/utils/classNameGen";

const defaultProps: Partial<IAutoSkeletonProps> = {
  loading: true,
  inheritStyles: false,
  shimmer: true,
  color: "#e2e8f0",
  highlightColor: "#f1f5f9",
  shimmerColor: "#f1f5f9",
  waveWidthValue: "200px",
  waveDirection: "left-to-right",
  "aria-label": "Loading content...",
  speed: 1,
  maxDepth: 30,
};

const failedComponentTypes = new WeakSet<object>();
const warnedComponentTypes = new WeakSet<object>();

const riskySourceTokens = [
  "useState",
  "useReducer",
  "useEffect",
  "useLayoutEffect",
  "useInsertionEffect",
  "useContext",
  "useMemo",
  "useCallback",
  "useRef",
  "useQuery",
  "useInfiniteQuery",
  "useMutation",
  "useTranslation",
  "useRouter",
  "useNavigate",
  "useParams",
  "useSearchParams",
  "useForm",
  "useController",
  "useWatch",
];

const isDev = () => typeof process !== "undefined" && process.env?.NODE_ENV !== "production";

const getComponentName = (Component: any): string => Component?.displayName || Component?.name || "component";

const warnFallbackOnce = (Component: any, reason: string) => {
  if (!isDev() || (typeof Component !== "function" && typeof Component !== "object") || Component === null || warnedComponentTypes.has(Component))
    return;

  warnedComponentTypes.add(Component);
  console.warn(
    `[AutoSkeletonLoader] Falling back for ${getComponentName(Component)}: ${reason}. ` +
      "Best-effort structural inference only inspects simple presentational components.",
  );
};

const isThenable = (value: unknown): value is PromiseLike<unknown> =>
  typeof value === "object" && value !== null && "then" in value && typeof (value as { then?: unknown }).then === "function";

const isReactLazyType = (type: any): boolean => Boolean(type?.$$typeof && String(type.$$typeof) === "Symbol(react.lazy)");

const isClassComponent = (Component: any): boolean => Boolean(Component?.prototype?.isReactComponent);

const isAsyncFunction = (Component: any): boolean => Component?.constructor?.name === "AsyncFunction";

const stripNonExecutableSource = (source: string): string =>
  source
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/\/\/.*$/gm, "")
    .replace(/(['"`])(?:\\.|(?!\1)[\s\S])*\1/g, "");

const escapeRegExp = (value: string): string => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const getUnsafeSourceToken = (Component: any): string | null => {
  let source = "";
  try {
    source = stripNonExecutableSource(Function.prototype.toString.call(Component));
  } catch {
    return null;
  }

  return (
    riskySourceTokens.find((token) => {
      const hookCallPattern = new RegExp(`(^|[^\\w$])(?:[A-Za-z_$][\\w$]*\\.)?${escapeRegExp(token)}\\s*\\(`);
      return hookCallPattern.test(source);
    }) || null
  );
};

const tailwindSpacingScale: Record<string, string> = {
  "0": "0rem",
  "1": "0.25rem",
  "2": "0.5rem",
  "3": "0.75rem",
  "4": "1rem",
  "5": "1.25rem",
  "6": "1.5rem",
  "8": "2rem",
  "10": "2.5rem",
  "12": "3rem",
  "14": "3.5rem",
  "16": "4rem",
  "20": "5rem",
  "24": "6rem",
  "32": "8rem",
  "40": "10rem",
  "48": "12rem",
  "56": "14rem",
  "64": "16rem",
};

const tailwindRadiusScale: Record<string, string> = {
  sm: "0.125rem",
  md: "0.375rem",
  lg: "0.5rem",
  xl: "0.75rem",
  "2xl": "1rem",
  "3xl": "1.5rem",
};

const getTailwindStyles = (className = ""): CSSProperties => {
  const classes = className.split(/\s+/).filter(Boolean);
  const styles: CSSProperties = {};

  classes.forEach((classToken) => {
    const width = /^w-(\d+)$/.exec(classToken);
    const height = /^h-(\d+)$/.exec(classToken);
    const minWidth = /^min-w-(\d+)$/.exec(classToken);
    const maxWidth = /^max-w-(\d+)$/.exec(classToken);
    const size = /^size-(\d+)$/.exec(classToken);
    const gap = /^gap-(\d+)$/.exec(classToken);
    const spaceY = /^space-y-(\d+)$/.exec(classToken);
    const spaceX = /^space-x-(\d+)$/.exec(classToken);
    const rounded = /^rounded(?:-(full|\d+|sm|md|lg|xl|2xl|3xl))?$/.exec(classToken);

    if (width?.[1] && tailwindSpacingScale[width[1]]) styles.width = tailwindSpacingScale[width[1]];
    if (height?.[1] && tailwindSpacingScale[height[1]]) styles.height = tailwindSpacingScale[height[1]];
    if (minWidth?.[1] && tailwindSpacingScale[minWidth[1]]) styles.minWidth = tailwindSpacingScale[minWidth[1]];
    if (maxWidth?.[1] && tailwindSpacingScale[maxWidth[1]]) styles.maxWidth = tailwindSpacingScale[maxWidth[1]];
    if (size?.[1] && tailwindSpacingScale[size[1]]) {
      styles.width = tailwindSpacingScale[size[1]];
      styles.height = tailwindSpacingScale[size[1]];
    }
    if (rounded) styles.borderRadius = rounded[1] === "full" ? "9999px" : tailwindRadiusScale[rounded[1] || "md"] || "6px";
    if (classToken === "aspect-square") styles.aspectRatio = "1 / 1";
    if (classToken === "aspect-video") styles.aspectRatio = "16 / 9";
    if (classToken === "flex") styles.display = "flex";
    if (classToken === "grid") styles.display = "grid";
    if (gap?.[1] && tailwindSpacingScale[gap[1]]) styles.gap = tailwindSpacingScale[gap[1]];
    if (spaceY?.[1] && tailwindSpacingScale[spaceY[1]]) styles.rowGap = tailwindSpacingScale[spaceY[1]];
    if (spaceX?.[1] && tailwindSpacingScale[spaceX[1]]) styles.columnGap = tailwindSpacingScale[spaceX[1]];
    if (classToken === "items-center") styles.alignItems = "center";
    if (classToken === "justify-between") styles.justifyContent = "space-between";
    if (classToken === "justify-center") styles.justifyContent = "center";
    if (classToken === "text-center") styles.textAlign = "center";
  });

  return styles;
};

const hasReactElementChild = (children: unknown): boolean =>
  React.Children.toArray(children as React.ReactNode).some((child) => React.isValidElement(child));

export const AutoSkeletonLoader: FC<IAutoSkeletonProps> = (userProps) => {
  const props = mergeProps(defaultProps, userProps);
  const {
    component,
    loading,
    inheritStyles,
    styless = {},
    shimmer,
    highlightColor,
    waveWidthValue,
    waveDirection,
    color,
    shimmerColor,
    "aria-label": ariaLabel,
    className = "",
    style = {},
    speed,
    maxDepth,
    ...restProps
  } = props;

  /**
   * Extract the actual component function from React wrappers
   * Handles React.memo, forwardRef, lazy, and other HOCs
   */
  const getComponentType = (type: any): any => {
    if (typeof type === "function") return type;
    if (isReactLazyType(type)) return type;
    return type;
  };

  const mapChildrenToSkeleton = (children: unknown, path: string[], parentIsCentered: boolean): ReactElement | null => {
    if (!hasReactElementChild(children)) return null;

    return (
      <React.Fragment key={generateStableKey(path, "children")}>
        {React.Children.map(children, (child, i) => mapElementToSkeleton(child as ReactElement, [...path, "child", String(i)], parentIsCentered))}
      </React.Fragment>
    );
  };

  /**
   * Safely execute a component function
   */
  const safeRender = (Component: any, props: any): ReactElement | null => {
    if (typeof window === "undefined") {
      warnFallbackOnce(Component, "introspection is skipped during SSR");
      return null;
    }

    if (failedComponentTypes.has(Component)) {
      warnFallbackOnce(Component, "component previously failed introspection");
      return null;
    }

    if (isReactLazyType(Component)) {
      warnFallbackOnce(Component, "React.lazy components are skipped");
      return null;
    }

    if (isClassComponent(Component)) {
      warnFallbackOnce(Component, "class components are skipped");
      return null;
    }

    if (isAsyncFunction(Component)) {
      warnFallbackOnce(Component, "async components are skipped");
      return null;
    }

    const unsafeToken = getUnsafeSourceToken(Component);
    if (unsafeToken) {
      warnFallbackOnce(Component, `source contains ${unsafeToken}`);
      return null;
    }

    try {
      const result = Component(props);
      if (isThenable(result)) {
        failedComponentTypes.add(Component);
        warnFallbackOnce(Component, "component returned a Promise during introspection");
        return null;
      }
      return React.isValidElement(result) ? result : null;
    } catch (error) {
      failedComponentTypes.add(Component);
      const reason = isThenable(error)
        ? "component suspended during introspection"
        : `introspection failed${error instanceof Error ? ` (${error.message})` : ""}`;
      warnFallbackOnce(Component, reason);
      return null;
    }
  };

  /**
   * Smart dimension estimation with alignment awareness
   */
  const estimateDimensions = (element: ReactElement, componentName?: string): CSSProperties => {
    const { type, props: elementProps } = element;
    const defaults: CSSProperties = {
      width: "100%",
      height: "16px",
      borderRadius: "6px",
    };

    if (componentName) {
      const lowerName = componentName.toLowerCase();
      if (lowerName.includes("button")) return { width: "100px", height: "40px", borderRadius: "8px" };
      if (lowerName.includes("badge")) return { width: "80px", height: "24px", borderRadius: "12px" };
      if (lowerName.includes("text") || lowerName.includes("label")) return { width: "120px", height: "1em", borderRadius: "4px" };
      if (lowerName.includes("image") || lowerName.includes("avatar") || lowerName.includes("photo"))
        return { width: "56px", height: "56px", borderRadius: "8px" };
      if (lowerName.includes("card")) return { width: "100%", height: "200px", borderRadius: "12px" };
    }

    if (typeof type === "string") {
      switch (type) {
        case "h1":
          return { width: "100%", height: "2.2em", borderRadius: "6px" };
        case "h2":
          return { width: "100%", height: "1.8em", borderRadius: "6px" };
        case "h3":
          return { width: "100%", height: "1.6em", borderRadius: "6px" };
        case "p":
        case "span":
          if (typeof elementProps.children === "string") {
            const textLength = elementProps.children.length;
            return {
              width: `${Math.min(100, Math.max(30, textLength * 0.5))}%`,
              height: "1em",
              borderRadius: "6px",
            };
          }
          return { width: "90%", height: "1em", borderRadius: "6px" };
        case "img":
          return {
            width: elementProps.width || "100%",
            height: elementProps.height || "200px",
            borderRadius: elementProps.style?.borderRadius || "8px",
          };
        case "button":
          return { width: "120px", height: "40px", borderRadius: "8px" };
        default:
          return defaults;
      }
    }

    return defaults;
  };

  const getShimmerGradient = () => {
    const gradientDirection =
      waveDirection === "left-to-right"
        ? "90deg"
        : waveDirection === "right-to-left"
          ? "270deg"
          : waveDirection === "top-to-bottom"
            ? "180deg"
            : "0deg";
    return `linear-gradient(${gradientDirection}, ${color} 0%, ${shimmerColor || highlightColor} 50%, ${color} 100%)`;
  };

  /**
   * Creates a skeleton block with layout awareness
   */
  const createSkeletonBlock = (baseStyle: CSSProperties, stableKey: string, isCentered = false): ReactElement => {
    const isBlock = baseStyle.display ? baseStyle.display !== "inline" : true;

    const blockStyle: CSSProperties = {
      display: isBlock ? "block" : "inline-block",
      width: baseStyle.width,
      height: baseStyle.height,
      borderRadius: baseStyle.borderRadius,
      margin: baseStyle.margin || "6px 0",
      backgroundColor: color,
      position: "relative",
      overflow: "hidden",
      ...(isCentered && isBlock ? { marginLeft: "auto", marginRight: "auto" } : {}),
    };

    const shimmerOverlayStyle: CSSProperties = shimmer
      ? {
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: getShimmerGradient(),
          backgroundSize: `${waveWidthValue} 100%`,
          animation: `react-loadly-shimmer ${1.5 / (speed || 1)}s linear infinite`,
          pointerEvents: "none",
        }
      : {};

    return (
      <div key={stableKey} style={blockStyle} aria-hidden="true" className="react-loadly-skeleton-block">
        {shimmer && <div style={shimmerOverlayStyle} className="react-loadly-skeleton-shimmer" />}
      </div>
    );
  };

  const generateStableKey = (path: string[], type: any, componentName?: string): string => {
    const pathStr = path.join("-");
    const typeStr = typeof type === "string" ? type : componentName || "component";
    return `skeleton-${pathStr}-${typeStr}`;
  };

  const createPresetBlock = (style: CSSProperties, key: string) => createSkeletonBlock(style, key);

  const createFallbackPreset = (componentName: string, path: string[], isCentered: boolean): ReactElement => {
    const name = componentName.toLowerCase();
    const block = (style: CSSProperties, suffix: string) =>
      createSkeletonBlock(style, generateStableKey([...path, suffix], "preset"), isCentered);

    if (/(profile|user|account|member)/.test(name)) {
      return (
        <div key={generateStableKey(path, "profile-preset")} style={{ display: "flex", alignItems: "center", gap: "0.75rem", width: "100%" }}>
          {block({ width: "3.5rem", height: "3.5rem", borderRadius: "9999px", margin: 0 }, "avatar")}
          <div style={{ flex: 1 }}>
            {block({ width: "60%", height: "1.1rem", borderRadius: "6px" }, "name")}
            {block({ width: "42%", height: "0.8rem", borderRadius: "6px" }, "meta")}
          </div>
        </div>
      );
    }

    if (/(product|item|shop)/.test(name)) {
      return (
        <div key={generateStableKey(path, "product-preset")} style={{ width: "100%" }}>
          {block({ width: "100%", height: "10rem", borderRadius: "0.75rem" }, "image")}
          {block({ width: "35%", height: "0.8rem", borderRadius: "9999px" }, "badge")}
          {block({ width: "70%", height: "1.2rem", borderRadius: "6px" }, "title")}
          {block({ width: "95%", height: "0.9rem", borderRadius: "6px" }, "desc")}
          {block({ width: "45%", height: "2.25rem", borderRadius: "0.5rem" }, "button")}
        </div>
      );
    }

    if (/(article|blog|post|news)/.test(name)) {
      return (
        <div key={generateStableKey(path, "article-preset")} style={{ width: "100%" }}>
          {block({ width: "100%", height: "8rem", borderRadius: "0.75rem" }, "thumb")}
          {block({ width: "80%", height: "1.2rem", borderRadius: "6px" }, "title")}
          {block({ width: "100%", height: "0.9rem", borderRadius: "6px" }, "row-1")}
          {block({ width: "72%", height: "0.9rem", borderRadius: "6px" }, "row-2")}
          {block({ width: "40%", height: "0.75rem", borderRadius: "6px" }, "meta")}
        </div>
      );
    }

    if (/(todo|task|list)/.test(name)) {
      return (
        <div key={generateStableKey(path, "list-preset")} style={{ width: "100%" }}>
          {[0, 1, 2].map((index) => (
            <div key={index} style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
              {createPresetBlock({ width: "1.25rem", height: "1.25rem", borderRadius: "0.375rem", margin: "0.35rem 0" }, `checkbox-${index}`)}
              {createPresetBlock({ width: `${85 - index * 14}%`, height: "0.95rem", borderRadius: "6px", margin: "0.35rem 0" }, `task-${index}`)}
            </div>
          ))}
        </div>
      );
    }

    if (/(sidebar|navigation|menu|nav)/.test(name)) {
      return (
        <div key={generateStableKey(path, "sidebar-preset")} style={{ width: "100%" }}>
          {block({ width: "55%", height: "1.5rem", borderRadius: "8px" }, "logo")}
          {[0, 1, 2, 3].map((index) => block({ width: `${80 - index * 6}%`, height: "2rem", borderRadius: "0.5rem" }, `nav-${index}`))}
        </div>
      );
    }

    if (/(table|datatable|grid)/.test(name)) {
      return (
        <div key={generateStableKey(path, "table-preset")} style={{ width: "100%" }}>
          {[0, 1, 2, 3].map((row) => (
            <div key={row} style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr 0.8fr", gap: "0.75rem" }}>
              {[0, 1, 2].map((col) => block({ width: "100%", height: row === 0 ? "1rem" : "0.85rem", borderRadius: "6px" }, `${row}-${col}`))}
            </div>
          ))}
        </div>
      );
    }

    if (/(dashboard|analytics|metrics|overview|chart|graph|report)/.test(name)) {
      return (
        <div key={generateStableKey(path, "dashboard-preset")} style={{ width: "100%" }}>
          {block({ width: "45%", height: "0.9rem", borderRadius: "6px" }, "label")}
          {block({ width: "55%", height: "2rem", borderRadius: "8px" }, "value")}
          {block({ width: "100%", height: "7rem", borderRadius: "0.75rem" }, "chart")}
        </div>
      );
    }

    if (/(form|login|register|settings)/.test(name)) {
      return (
        <div key={generateStableKey(path, "form-preset")} style={{ width: "100%" }}>
          {[0, 1].map((index) => (
            <React.Fragment key={index}>
              {block({ width: "30%", height: "0.8rem", borderRadius: "6px" }, `label-${index}`)}
              {block({ width: "100%", height: "2.5rem", borderRadius: "0.5rem" }, `input-${index}`)}
            </React.Fragment>
          ))}
          {block({ width: "45%", height: "2.5rem", borderRadius: "0.5rem" }, "submit")}
        </div>
      );
    }

    return createSkeletonBlock({ ...estimateDimensions({ type: "div", props: {} } as ReactElement, componentName) }, generateStableKey(path, componentName), isCentered);
  };

  /**
   * Advanced Virtual Traversal v2.5.0
   * Handles alignment inheritance and root style cloning
   */
  const mapElementToSkeleton = (
    el: ReactElement | string | number | null | undefined,
    path: string[] = ["0"],
    parentIsCentered = false,
  ): ReactElement | null => {
    if (el == null || typeof el === "string" || typeof el === "number") return null;

    if (path.length > (maxDepth || 30)) {
      const depthType = (el as ReactElement).type;
      const depthComponentName = typeof depthType === "function" ? getComponentName(depthType) : undefined;
      return createSkeletonBlock(
        estimateDimensions(el as ReactElement, depthComponentName),
        generateStableKey(path, depthType, depthComponentName),
        parentIsCentered,
      );
    }

    if (Array.isArray(el)) {
      return <>{el.map((c, i) => mapElementToSkeleton(c as ReactElement, [...path, String(i)], parentIsCentered))}</>;
    }

    if ((el as ReactElement).type === React.Fragment) {
      const frag = el as ReactElement;
      return (
        <React.Fragment key={generateStableKey(path, "fragment")}>
          {React.Children.map(frag.props.children, (child, i) =>
            mapElementToSkeleton(child as ReactElement, [...path, "frag", String(i)], parentIsCentered),
          )}
        </React.Fragment>
      );
    }

    const typed = el as ReactElement;
    const { type, props: elProps } = typed;

    // Detect centering in the current element
    const elClassName = elProps?.className || "";
    const elStyle = elProps?.style || {};
    const isCentered =
      parentIsCentered ||
      elClassName.includes("text-center") ||
      elClassName.includes("items-center") ||
      elClassName.includes("justify-center") ||
      elStyle.textAlign === "center" ||
      elStyle.alignItems === "center" ||
      elStyle.justifyContent === "center";

    // Handle native HTML elements
    if (typeof type === "string") {
      const containerTags = ["div", "section", "article", "header", "footer", "nav", "main", "ul", "ol", "li", "figure"];

      if (containerTags.includes(type)) {
        const tailwindStyles = getTailwindStyles(elClassName);
        const hasElementChildren = hasReactElementChild(elProps.children);

        if (!hasElementChildren) {
          let blockDims: CSSProperties = { ...estimateDimensions(typed), ...tailwindStyles };
          if (inheritStyles) blockDims = { ...blockDims, ...elStyle };
          if (styless[type as string]) blockDims = { ...blockDims, ...styless[type as string] };
          if (elStyle.display) blockDims.display = elStyle.display;

          return createSkeletonBlock(blockDims, generateStableKey(path, type), isCentered);
        }

        // Layout Context Awareness: Keep alignment and layout styles
        const containerStyle: CSSProperties = { ...tailwindStyles, ...(inheritStyles ? elStyle : {}) };

        // Preserve flex/grid layouts if necessary
        if (elStyle.display === "flex" || elStyle.display === "grid") {
          containerStyle.display = elStyle.display;
          containerStyle.flexDirection = elStyle.flexDirection;
          containerStyle.alignItems = elStyle.alignItems;
          containerStyle.justifyContent = elStyle.justifyContent;
          containerStyle.gap = elStyle.gap;
        }

        return React.createElement(
          type,
          {
            key: generateStableKey(path, type),
            className: elClassName, // Root Style Cloning: Inherit original className
            style: containerStyle,
          },
          React.Children.map(elProps.children, (child, i) => mapElementToSkeleton(child as ReactElement, [...path, type, String(i)], isCentered)),
        );
      }

      let blockDims: CSSProperties = { ...estimateDimensions(typed), ...getTailwindStyles(elClassName) };
      if (inheritStyles) blockDims = { ...blockDims, ...elStyle };
      if (styless[type as string]) blockDims = { ...blockDims, ...styless[type as string] };

      // Ensure block matches display property exactly
      if (elStyle.display) blockDims.display = elStyle.display;

      return createSkeletonBlock(blockDims, generateStableKey(path, type), isCentered);
    }

    // Handle React components
    const actualType = getComponentType(type);

    if (isReactLazyType(actualType)) {
      warnFallbackOnce(actualType, "React.lazy components are skipped");
      const componentName = getComponentName(actualType);
      const fallbackStyle = estimateDimensions(typed, componentName);
      return createSkeletonBlock(fallbackStyle, generateStableKey(path, actualType, componentName), isCentered);
    }

    if (typeof actualType === "function") {
      const rendered = safeRender(actualType, elProps);

      if (rendered) {
        // ROOT STYLE CLONING: If the component returns a root element, we merge its styles
        const componentName = actualType.displayName || actualType.name || "comp";
        return mapElementToSkeleton(rendered, [...path, componentName], isCentered);
      }

      const childSkeleton = mapChildrenToSkeleton(elProps?.children, [...path, "fallback-children"], isCentered);
      if (childSkeleton) return childSkeleton;

      const componentName = actualType.displayName || actualType.name || "component";
      return createFallbackPreset(componentName, path, isCentered);
    }

    if (elProps && elProps.children) {
      return (
        <React.Fragment key={generateStableKey(path, "children")}>
          {React.Children.map(elProps.children, (child: any, i: number) => mapElementToSkeleton(child, [...path, "child", String(i)], isCentered))}
        </React.Fragment>
      );
    }

    return createSkeletonBlock(estimateDimensions(typed), generateStableKey(path, "fallback"), isCentered);
  };

  const processed = useMemo(
    () => mapElementToSkeleton(component),
    [
      component,
      component?.type,
      styless,
      inheritStyles,
      shimmer,
      highlightColor,
      shimmerColor,
      waveWidthValue,
      waveDirection,
      color,
      speed,
      maxDepth,
    ],
  );

  if (!loading) {
    try {
      return cloneElement(component);
    } catch {
      return <>{component}</>;
    }
  }

  return (
    <div
      className={classNameGen("react-loadly react-loadly-auto-skeleton", className)}
      style={{ ...style, transition: "opacity 0.2s ease-in-out" }}
      role="status"
      aria-label={ariaLabel}
      aria-live="polite"
      aria-busy={loading}
      {...restProps}
    >
      {processed}
    </div>
  );
};
