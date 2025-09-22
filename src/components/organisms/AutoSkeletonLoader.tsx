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

  const estimateDimensions = (element: ReactElement): CSSProperties => {
    const { type, props: elementProps } = element;
    const defaults: CSSProperties = {
      width: "100%",
      height: "16px",
      borderRadius: "6px",
    };

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
          if (typeof elementProps.children === "string") {
            const textLength = elementProps.children.length;
            return {
              width: `${Math.max(80, textLength * 8)}px`,
              height: "40px",
              borderRadius: elementProps.style?.borderRadius || "8px",
            };
          }
          return { width: "120px", height: "40px", borderRadius: "8px" };
        default:
          return {
            width: elementProps.style?.width || defaults.width,
            height: elementProps.style?.height || defaults.height,
            borderRadius: elementProps.style?.borderRadius || defaults.borderRadius,
          };
      }
    }

    return {
      width: element.props?.style?.width || defaults.width,
      height: element.props?.style?.height || defaults.height,
      borderRadius: element.props?.style?.borderRadius || defaults.borderRadius,
    };
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

    return `linear-gradient(${gradientDirection}, ${color} 0%, ${highlightColor} 50%, ${color} 100%)`;
  };
  const createSkeletonBlock = (baseStyle: CSSProperties, key: string | number): ReactElement => {
    const isBlock = baseStyle.display ? baseStyle.display !== "inline" : true;
    const gradient = shimmer
      ? {
          background: getShimmerGradient(),
          backgroundSize: `${waveWidthValue} 100%`,
          animation: `react-loadly-shimmer ${1.5 / (speed || 1)}s ease-in-out infinite`,
        }
      : { backgroundColor: color };

    const style: CSSProperties = {
      display: isBlock ? "block" : "inline-block",
      width: baseStyle.width,
      height: baseStyle.height,
      borderRadius: baseStyle.borderRadius,
      margin: baseStyle.margin || "6px 0",
      ...gradient,
      position: "relative",
      overflow: "hidden",
    };

    return <div key={String(key)} style={style} aria-hidden="true" className="react-loadly-skeleton-block" />;
  };

  const mapElementToSkeleton = (el: ReactElement | string | number | null | undefined, idx = 0): ReactElement | null => {
    if (el == null || typeof el === "string" || typeof el === "number") return null;

    if (Array.isArray(el)) {
      return <>{el.map((c, i) => mapElementToSkeleton(c as ReactElement, i))}</>;
    }

    if ((el as ReactElement).type === React.Fragment) {
      const frag = el as ReactElement;
      return (
        <React.Fragment key={idx}>
          {React.Children.map(frag.props.children, (child, i) => mapElementToSkeleton(child as ReactElement, i))}
        </React.Fragment>
      );
    }

    const typed = el as ReactElement;
    const { type, props: elProps } = typed;

    if (typeof type === "string") {
      const containerTags = ["div", "section", "article", "header", "footer", "nav", "main", "ul", "ol", "li", "figure"];
      if (containerTags.includes(type)) {
        const containerStyle: CSSProperties = inheritStyles && elProps.style ? { ...elProps.style } : {};
        return React.createElement(
          type,
          { key: idx, ...elProps, style: containerStyle },
          React.Children.map(elProps.children, (child, i) => mapElementToSkeleton(child as ReactElement, i)),
        );
      }

      let elStyle: CSSProperties = { ...estimateDimensions(typed) };
      if (inheritStyles && elProps.style) elStyle = { ...elStyle, ...elProps.style };
      if (styless[type as string]) elStyle = { ...elStyle, ...styless[type as string] };

      // check if the container has display:flex , added in parent width 100%

      return createSkeletonBlock(elStyle, `${idx}-${type}`);
    }

    if (typeof type === "function") {
      try {
        const rendered = (type as any)(elProps);
        if (React.isValidElement(rendered) || Array.isArray(rendered)) {
          return mapElementToSkeleton(rendered as ReactElement, idx);
        }
      } catch (err) {
        console.log(err);
      }
    }

    if (elProps && elProps.children) {
      return (
        <React.Fragment key={idx}>{React.Children.map(elProps.children, (child: any, i: number) => mapElementToSkeleton(child, i))}</React.Fragment>
      );
    }

    const fallbackStyle = estimateDimensions(typed);
    return createSkeletonBlock(fallbackStyle, `${idx}-fallback`);
  };

  const processed = useMemo(
    () => mapElementToSkeleton(component),
    [component, styless, inheritStyles, shimmer, highlightColor, waveWidthValue, waveDirection, color],
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
