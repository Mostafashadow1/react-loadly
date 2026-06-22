import { useMemo } from "react";
import { SkeletonGroup, SkeletonLoader } from "react-loadly";
import type { ISkeletonLoaderProps } from "react-loadly";
import type { LoaderKind, LoaderPropsMap } from "@/types/ILoaderConfig";
import { transformJSXToNode } from "@/lib/transformToNode";

interface LoaderPreviewProps {
  activeLoaderData: any;
  currentProps: Partial<LoaderPropsMap[LoaderKind]>;
}

export function LoaderPreview({
  activeLoaderData,
  currentProps,
}: LoaderPreviewProps) {
  const ActiveLoaderComponent = activeLoaderData.component;

  // Filter props to only include those relevant to the current loader
  const relevantProps = useMemo(() => {
    const props: Record<string, unknown> = {};

    // Add common props
    activeLoaderData.commonProps.forEach(
      (prop: keyof LoaderPropsMap[LoaderKind]) => {
        if (currentProps[prop] !== undefined) {
          props[prop] = currentProps[prop];
        }
      },
    );

    // Add unique props
    activeLoaderData.uniqueProps.forEach(
      (prop: keyof LoaderPropsMap[LoaderKind]) => {
        if (currentProps[prop] !== undefined) {
          props[prop] = currentProps[prop];
        }
      },
    );

    delete props["fullscreen"];

    // Handle special cases for specific loaders
    if (activeLoaderData.title === "Skeleton Loader") {
      const skeletonProps = currentProps as Partial<LoaderPropsMap["skeleton"]>;
      props.shimmer =
        skeletonProps.shimmer !== undefined ? skeletonProps.shimmer : true;
      props.lines = skeletonProps.lines || 3;
      props.variant = skeletonProps.variant || "text";
    }

    if (activeLoaderData.title === "Typing Loader") {
      const textProps = currentProps as Partial<LoaderPropsMap["typing"]>;
      props.loop = textProps.loop !== undefined ? textProps.loop : true;
    }
    if (activeLoaderData.title === "Element Loader") {
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
      {activeLoaderData.title === "Skeleton Loader" ? (
        <SkeletonPreviewPattern props={relevantProps as ISkeletonLoaderProps} />
      ) : (
        <ActiveLoaderComponent
          {...(relevantProps as LoaderPropsMap[LoaderKind])}
        />
      )}
    </div>
  );
}

function SkeletonPreviewPattern({ props }: { props: ISkeletonLoaderProps }) {
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
    waveDirection,
    waveWidth,
    speed,
    loading,
    "aria-label": ariaLabel,
  } = props;

  return (
    <div className="w-full max-w-md rounded-lg border border-zinc-800/90 bg-zinc-950/80 p-4 shadow-xl shadow-black/20">
      <div className="mb-4 flex items-center justify-between gap-3 border-b border-zinc-800/80 pb-3">
        <div className="min-w-0">
          <div className="h-2.5 w-20 rounded-full bg-zinc-800" />
          <div className="mt-2 h-2 w-32 rounded-full bg-zinc-900" />
        </div>
        <div className="h-7 w-16 rounded-md bg-zinc-900" />
      </div>

      <SkeletonGroup shimmerSync stagger={0.07}>
        <div className="space-y-5">
          <div className="flex items-center gap-4">
            <div className="shrink-0">
              <SkeletonLoader
                variant="avatar"
                size={size || 52}
                borderRadius={variant === "card" ? borderRadius : undefined}
                color={color}
                highlightColor={highlightColor}
                shimmerColor={shimmerColor}
                shimmer={shimmer}
                waveDirection={waveDirection}
                waveWidth={waveWidth}
                speed={speed}
                loading={loading}
                aria-label={ariaLabel}
              />
            </div>
            <div className="min-w-0 flex-1 space-y-2">
              <SkeletonLoader
                variant="text"
                width="72%"
                height={height || 16}
                borderRadius={borderRadius}
                spacing={spacing}
                color={color}
                highlightColor={highlightColor}
                shimmerColor={shimmerColor}
                shimmer={shimmer}
                waveDirection={waveDirection}
                waveWidth={waveWidth}
                speed={speed}
                loading={loading}
                aria-label={ariaLabel}
              />
              <SkeletonLoader
                variant="text"
                width="46%"
                height={12}
                borderRadius={borderRadius}
                color={color}
                highlightColor={highlightColor}
                shimmerColor={shimmerColor}
                shimmer={shimmer}
                waveDirection={waveDirection}
                waveWidth={waveWidth}
                speed={speed}
                loading={loading}
                aria-label={ariaLabel}
              />
            </div>
          </div>
          <div className="rounded-lg border border-zinc-800/80 bg-zinc-950/60 p-4">
            <SkeletonLoader
              variant={variant}
              lines={lines}
              width={width}
              height={height || (variant === "card" ? 120 : 14)}
              borderRadius={borderRadius}
              spacing={spacing}
              color={color}
              highlightColor={highlightColor}
              shimmerColor={shimmerColor}
              shimmer={shimmer}
              waveDirection={waveDirection}
              waveWidth={waveWidth}
              speed={speed}
              loading={loading}
              aria-label={ariaLabel}
            />
          </div>
        </div>
      </SkeletonGroup>
    </div>
  );
}
