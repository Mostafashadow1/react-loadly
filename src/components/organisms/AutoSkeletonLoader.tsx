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
  shimmerColor: "rgba(255, 255, 255, 0.6)",
  waveWidthValue: "200px",
  waveDirection: "left-to-right",
  "aria-label": "Loading content...",
  speed: 1,
};

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
    "aria-label": ariaLabel,
    className = "",
    style = {},
    speed,
    ...restProps
  } = props;

  /**
   * Extract the actual component function from React wrappers
   * Handles React.memo, forwardRef, lazy, and other HOCs
   */
  const getComponentType = (type: any): any => {
    if (typeof type === "function") return type;
    if (typeof type === "object" && type?.$$typeof) {
      if (type.type) return getComponentType(type.type);
      if (type.render) return getComponentType(type.render);
    }
    return type;
  };

  /**
   * Safely execute a component function
   */
  const safeRender = (Component: any, props: any): ReactElement | null => {
    try {
      const result = Component(props);
      return React.isValidElement(result) ? result : null;
    } catch (error) {
      console.debug("[AutoSkeletonLoader] Safe render failed:", (error as Error).message);
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
      if (lowerName.includes("image") || lowerName.includes("avatar") || lowerName.includes("photo")) return { width: "56px", height: "56px", borderRadius: "8px" };
      if (lowerName.includes("card")) return { width: "100%", height: "200px", borderRadius: "12px" };
    }

    if (typeof type === "string") {
      switch (type) {
        case "h1": return { width: "100%", height: "2.2em", borderRadius: "6px" };
        case "h2": return { width: "100%", height: "1.8em", borderRadius: "6px" };
        case "h3": return { width: "100%", height: "1.6em", borderRadius: "6px" };
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
    const gradientDirection = waveDirection === "left-to-right" ? "90deg" : waveDirection === "right-to-left" ? "270deg" : waveDirection === "top-to-bottom" ? "180deg" : "0deg";
    return `linear-gradient(${gradientDirection}, ${color} 0%, ${highlightColor} 50%, ${color} 100%)`;
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

  /**
   * Advanced Virtual Traversal v2.5.0
   * Handles alignment inheritance and root style cloning
   */
  const mapElementToSkeleton = (
    el: ReactElement | string | number | null | undefined,
    path: string[] = ["0"],
    parentIsCentered = false
  ): ReactElement | null => {
    if (el == null || typeof el === "string" || typeof el === "number") return null;

    if (Array.isArray(el)) {
      return <>{el.map((c, i) => mapElementToSkeleton(c as ReactElement, [...path, String(i)], parentIsCentered))}</>;
    }

    if ((el as ReactElement).type === React.Fragment) {
      const frag = el as ReactElement;
      return (
        <React.Fragment key={generateStableKey(path, "fragment")}>
          {React.Children.map(frag.props.children, (child, i) =>
            mapElementToSkeleton(child as ReactElement, [...path, "frag", String(i)], parentIsCentered)
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
        // Layout Context Awareness: Keep alignment and layout styles
        const containerStyle: CSSProperties = inheritStyles ? { ...elStyle } : {};

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
            style: containerStyle
          },
          React.Children.map(elProps.children, (child, i) =>
            mapElementToSkeleton(child as ReactElement, [...path, type, String(i)], isCentered)
          )
        );
      }

      let blockDims: CSSProperties = { ...estimateDimensions(typed) };
      if (inheritStyles) blockDims = { ...blockDims, ...elStyle };
      if (styless[type as string]) blockDims = { ...blockDims, ...styless[type as string] };

      // Ensure block matches display property exactly
      if (elStyle.display) blockDims.display = elStyle.display;

      return createSkeletonBlock(blockDims, generateStableKey(path, type), isCentered);
    }

    // Handle React components
    const actualType = getComponentType(type);

    if (typeof actualType === "function") {
      const rendered = safeRender(actualType, elProps);

      if (rendered) {
        // ROOT STYLE CLONING: If the component returns a root element, we merge its styles
        const componentName = actualType.displayName || actualType.name || "comp";
        return mapElementToSkeleton(rendered, [...path, componentName], isCentered);
      }

      const componentName = actualType.displayName || actualType.name || "component";
      const fallbackStyle = estimateDimensions(typed, componentName);
      return createSkeletonBlock(fallbackStyle, generateStableKey(path, actualType, componentName), isCentered);
    }

    if (elProps && elProps.children) {
      return (
        <React.Fragment key={generateStableKey(path, "children")}>
          {React.Children.map(elProps.children, (child: any, i: number) =>
            mapElementToSkeleton(child, [...path, "child", String(i)], isCentered)
          )}
        </React.Fragment>
      );
    }

    return createSkeletonBlock(estimateDimensions(typed), generateStableKey(path, "fallback"), isCentered);
  };

  const processed = useMemo(
    () => mapElementToSkeleton(component),
    [component, component?.type, styless, inheritStyles, shimmer, highlightColor, waveWidthValue, waveDirection, color, speed],
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
