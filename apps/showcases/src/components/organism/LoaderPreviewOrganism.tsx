import { useMemo } from "react";
import type { ComponentType, CSSProperties } from "react";
import { SkeletonGroupLoader, SkeletonLoader } from "react-loadly";
import type { ISkeletonPatternLoaderProps } from "react-loadly";
import type {
  AnyLoaderConfig,
  LoaderKind,
  LoaderPropsMap,
} from "@/types/ILoaderConfig";
import { transformJSXToNode } from "@/lib/transformToNode";

interface LoaderPreviewProps {
  activeLoaderData: AnyLoaderConfig;
  currentProps: Partial<LoaderPropsMap[LoaderKind]>;
}

const space = {
  sm: 6,
  xl: 16,
} as const;

const isSkeletonConfig = (
  config: AnyLoaderConfig,
): config is Extract<AnyLoaderConfig, { interface: "ISkeletonPatternLoaderProps" }> =>
  config.interface === "ISkeletonPatternLoaderProps";

const isTypingConfig = (
  config: AnyLoaderConfig,
): config is Extract<AnyLoaderConfig, { interface: "ITextLoaderProps" }> =>
  config.interface === "ITextLoaderProps";

const isElementConfig = (
  config: AnyLoaderConfig,
): config is Extract<AnyLoaderConfig, { interface: "IElementLoaderProps" }> =>
  config.interface === "IElementLoaderProps";

export function LoaderPreview({
  activeLoaderData,
  currentProps,
}: LoaderPreviewProps) {
  const ActiveLoaderComponent = activeLoaderData.component as ComponentType<
    Record<string, unknown>
  >;

  // Filter props to only include those relevant to the current loader
  const relevantProps = useMemo(() => {
    const props: Record<string, unknown> = {};
    const currentPropRecord = currentProps as Record<string, unknown>;
    const commonProps = activeLoaderData.commonProps as readonly string[];
    const uniqueProps = activeLoaderData.uniqueProps as readonly string[];

    // Add common props
    commonProps.forEach((prop) => {
      if (currentPropRecord[prop] !== undefined) {
        props[prop] = currentPropRecord[prop];
      }
    });

    // Add unique props
    uniqueProps.forEach((prop) => {
      if (currentPropRecord[prop] !== undefined) {
        props[prop] = currentPropRecord[prop];
      }
    });

    delete props["fullscreen"];

    // Handle special cases for specific loaders
    if (isSkeletonConfig(activeLoaderData)) {
      const skeletonProps = currentProps as Partial<LoaderPropsMap["skeleton"]>;
      props.shimmer =
        skeletonProps.shimmer !== undefined ? skeletonProps.shimmer : true;
      props.lines = skeletonProps.lines || 3;
      props.variant = skeletonProps.variant || "text";
    }

    if (isTypingConfig(activeLoaderData)) {
      const textProps = currentProps as Partial<LoaderPropsMap["typing"]>;
      props.loop = textProps.loop !== undefined ? textProps.loop : true;
    }
    if (isElementConfig(activeLoaderData)) {
      const elementProps = currentProps as Partial<LoaderPropsMap["element"]>;
      if (typeof elementProps.children === "string") {
        try {
          props.children = transformJSXToNode(elementProps.children);
        } catch (_) {
          props.children = elementProps.children;
        }
      } else {
        props.children = elementProps.children;
      }
    }
    return props;
  }, [activeLoaderData, currentProps]);

  return (
    <div className="flex h-full w-full items-center justify-center p-4">
      {isSkeletonConfig(activeLoaderData) ? (
        <SkeletonPreviewPattern props={relevantProps as ISkeletonPatternLoaderProps} />
      ) : (
        <ActiveLoaderComponent {...relevantProps} />
      )}
    </div>
  );
}

function SkeletonPreviewPattern({ props }: { props: ISkeletonPatternLoaderProps }) {
  const {
    variant = "text",
    lines = 3,
    width = "100%",
    height,
    size,
    borderRadius,
    spacing,
    shimmer,
    shimmerColor,
    highlightColor,
    color,
    speed,
    loading,
    "aria-label": ariaLabel,
  } = props;
  const skeletonAnimation = shimmer === false ? "none" : "shimmer";
  const primitiveVariant =
    variant === "avatar"
      ? "circular"
      : variant === "card" || variant === "custom"
        ? "rectangular"
        : "text";
  const resolvedHighlightColor = highlightColor ?? shimmerColor;
  const lineCount = Math.max(1, Math.floor(lines));
  const lineSpacing = spacing ?? space.sm;
  const lineHeight = height || (variant === "card" ? 120 : 14);
  const lineWidth = variant === "avatar" ? size || 52 : width;

  if (loading === false) {
    return null;
  }

  return (
    <div className="w-full max-w-md rounded-lg border border-zinc-800/90 bg-zinc-950/80 p-4 shadow-xl shadow-black/20">
      <div className="mb-4 flex items-center justify-between gap-3 border-b border-zinc-800/80 pb-3">
        <div className="min-w-0">
          <div className="h-2.5 w-20 rounded-full bg-zinc-800" />
          <div className="mt-2 h-2 w-32 rounded-full bg-zinc-900" />
        </div>
        <div className="h-7 w-16 rounded-md bg-zinc-900" />
      </div>

      <SkeletonGroupLoader
        shimmerSync
        stagger={0.07}
        baseColor={color}
        highlightColor={resolvedHighlightColor}
      >
        <div>
          <div className="flex items-center gap-4">
            <div className="shrink-0">
              <SkeletonLoader
                variant="circular"
                width={size || 52}
                height={size || 52}
                baseColor={color}
                highlightColor={resolvedHighlightColor}
                animation={skeletonAnimation}
                speed={speed}
                aria-label={ariaLabel}
              />
            </div>
            <div className="min-w-0 flex-1">
              <SkeletonLoader
                width="72%"
                height={height || 16}
                borderRadius={borderRadius}
                baseColor={color}
                highlightColor={resolvedHighlightColor}
                animation={skeletonAnimation}
                speed={speed}
                aria-label={ariaLabel}
                style={{ marginBottom: space.sm }}
              />
              <SkeletonLoader
                width="46%"
                height={12}
                borderRadius={borderRadius}
                baseColor={color}
                highlightColor={resolvedHighlightColor}
                animation={skeletonAnimation}
                speed={speed}
                aria-label={ariaLabel}
              />
            </div>
          </div>
          <div
            className="rounded-lg border border-zinc-800/80 bg-zinc-950/60 p-4"
            style={{ marginTop: space.xl }}
          >
            {Array.from({ length: lineCount }).map((_, index) => {
              const isLast = index === lineCount - 1;
              const itemStyle: CSSProperties = {
                marginBottom: isLast ? undefined : lineSpacing,
              };

              return (
                <SkeletonLoader
                  key={index}
                  variant={primitiveVariant}
                  width={isLast && variant === "text" ? "72%" : lineWidth}
                  height={lineHeight}
                  borderRadius={borderRadius}
                  baseColor={color}
                  highlightColor={resolvedHighlightColor}
                  animation={skeletonAnimation}
                  speed={speed}
                  aria-label={ariaLabel}
                  style={itemStyle}
                />
              );
            })}
          </div>
        </div>
      </SkeletonGroupLoader>
    </div>
  );
}
