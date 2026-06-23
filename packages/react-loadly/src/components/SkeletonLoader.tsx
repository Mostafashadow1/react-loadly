import React from "react";
import {
  defaultSkeletonLoaderTheme,
  SkeletonLoaderAnimation,
  SkeletonGroupLoaderContext,
  SkeletonLoaderVariant,
} from "../context/SkeletonGroupLoaderContext";

type SizeValue = number | string;
const STYLE_ID = "react-loadly-skeleton-keyframes";
const useStyleInsertionEffect =
  typeof document === "undefined" ? React.useEffect : React.useInsertionEffect ?? React.useLayoutEffect;

export interface SkeletonLoaderProps extends Omit<React.HTMLAttributes<HTMLElement>, "children"> {
  variant?: SkeletonLoaderVariant;
  animation?: SkeletonLoaderAnimation;
  width?: SizeValue;
  height?: SizeValue;
  count?: number;
  baseColor?: string;
  highlightColor?: string;
  speed?: number;
  borderRadius?: SizeValue;
  inline?: boolean;
  as?: React.ElementType;
}

const toCssSize = (value: SizeValue | undefined): string | undefined =>
  typeof value === "number" ? `${value}px` : value;

const getVariantDefaults = (variant: SkeletonLoaderVariant) => {
  switch (variant) {
    case "rectangular":
      return { width: "100%", height: 140, borderRadius: 0 };
    case "circular":
      return { width: 40, height: 40, borderRadius: "50%" };
    case "rounded":
      return { width: "100%", height: 36, borderRadius: 8 };
    case "text":
    default:
      return { width: "100%", height: "1em", borderRadius: 4 };
  }
};

const injectSkeletonStyles = () => {
  if (typeof document === "undefined" || document.getElementById(STYLE_ID)) return;

  const style = document.createElement("style");
  style.id = STYLE_ID;
  style.textContent = `
    @keyframes skshimmer {
      0% { background-position: -400px 0; }
      100% { background-position: 400px 0; }
    }

    @keyframes skwave {
      0% { clip-path: inset(0 100% 0 0); }
      50% { clip-path: inset(0 0 0 0); }
      100% { clip-path: inset(0 0 0 100%); }
    }

    @keyframes skpulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.4; }
    }

    @media (prefers-reduced-motion: reduce) {
      .react-loadly-skeleton--shimmer,
      .react-loadly-skeleton--wave {
        animation-name: skpulse !important;
      }
    }
  `;
  document.head.appendChild(style);
};

const getAnimationStyle = ({
  animation,
  baseColor,
  highlightColor,
  speed,
  direction,
}: {
  animation: SkeletonLoaderAnimation;
  baseColor: string;
  highlightColor: string;
  speed: number;
  direction: "ltr" | "rtl";
}): React.CSSProperties => {
  const angle = direction === "rtl" ? "270deg" : "90deg";

  if (animation === "none") {
    return {
      backgroundColor: baseColor,
      animation: "none",
    };
  }

  if (animation === "pulse") {
    return {
      backgroundColor: baseColor,
      animation: `skpulse ${speed}s ease-in-out infinite`,
    };
  }

  return {
    backgroundImage: `linear-gradient(${angle}, ${baseColor} 25%, ${highlightColor} 50%, ${baseColor} 75%)`,
    backgroundSize: "400px 100%",
    animation: `${animation === "wave" ? "skwave" : "skshimmer"} ${speed}s linear infinite`,
  };
};

export function SkeletonLoader({
  variant = "text",
  animation,
  width,
  height,
  count = 1,
  baseColor,
  highlightColor,
  speed,
  borderRadius,
  inline = false,
  as,
  className,
  style,
  role = "status",
  "aria-label": ariaLabel = "Loading",
  ...rest
}: SkeletonLoaderProps) {
  useStyleInsertionEffect(injectSkeletonStyles, []);

  const context = React.useContext(SkeletonGroupLoaderContext);
  const defaults = getVariantDefaults(variant);
  const Component = as ?? "span";

  const resolvedAnimation = animation ?? context.animation ?? defaultSkeletonLoaderTheme.animation;
  const resolvedSpeed = speed ?? context.speed ?? defaultSkeletonLoaderTheme.speed;
  const resolvedBaseColor = baseColor ?? context.baseColor ?? defaultSkeletonLoaderTheme.baseColor;
  const resolvedHighlightColor =
    highlightColor ?? context.highlightColor ?? defaultSkeletonLoaderTheme.highlightColor;
  const resolvedDirection = context.direction ?? defaultSkeletonLoaderTheme.direction;
  const itemCount = Math.max(1, Math.floor(count));

  const baseStyle: React.CSSProperties = {
    ["--rl-sk-base" as string]: resolvedBaseColor,
    ["--rl-sk-highlight" as string]: resolvedHighlightColor,
    ["--rl-sk-speed" as string]: `${resolvedSpeed}s`,
    ...getAnimationStyle({
      animation: resolvedAnimation,
      baseColor: resolvedBaseColor,
      highlightColor: resolvedHighlightColor,
      speed: resolvedSpeed,
      direction: resolvedDirection,
    }),
    width: toCssSize(width ?? defaults.width),
    height: toCssSize(height ?? defaults.height),
    borderRadius: toCssSize(borderRadius ?? defaults.borderRadius),
    display: inline ? "inline-block" : "block",
    ...style,
  };

  const classNames = [
    "react-loadly-skeleton",
    `react-loadly-skeleton--${variant}`,
    `react-loadly-skeleton--${resolvedAnimation}`,
    `react-loadly-skeleton--${resolvedDirection}`,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  if (itemCount === 1) {
    return (
      <Component
        className={classNames}
        style={baseStyle}
        role={role}
        aria-label={ariaLabel}
        aria-busy="true"
        {...rest}
      />
    );
  }

  return (
    <>
      {Array.from({ length: itemCount }).map((_, index) => {
        const isLast = index === itemCount - 1;
        return (
          <Component
            key={index}
            className={classNames}
            style={{
              ...baseStyle,
              width: isLast && width == null ? "83%" : baseStyle.width,
              marginBottom: isLast ? undefined : "0.3em",
            }}
            role={role}
            aria-label={ariaLabel}
            aria-busy="true"
            {...rest}
          />
        );
      })}
    </>
  );
}

export default SkeletonLoader;
