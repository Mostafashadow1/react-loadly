import React, { useMemo, useRef, useState, useEffect, useCallback } from 'react';

/**
 * Merges default props with user props, handling undefined values gracefully
 * @param defaultProps - The default props to merge
 * @param userProps - The user provided props
 * @returns Merged props object
 */
function mergeProps(defaultProps, userProps) {
    return { ...defaultProps, ...userProps };
}
/**
 * Converts size prop to CSS value
 * @param size - The size value (number or string)
 * @param fallback - The fallback value if size is undefined
 * @returns CSS size value as string
 */
function getSizeValue(size, fallback = "40px") {
    if (size === undefined)
        return fallback;
    if (typeof size === "number")
        return `${size}px`;
    return size;
}
/**
 * Generates CSS custom properties object from loader variables
 * @param variables - The loader CSS variables object
 * @returns React CSS properties object
 */
function generateCSSVariables(variables) {
    const cssProps = {};
    Object.entries(variables).forEach(([key, value]) => {
        if (value !== undefined) {
            cssProps[key] = value;
        }
    });
    return cssProps;
}

/**
 * Calculates animation duration based on speed multiplier
 * @param baseMs - The base duration in milliseconds
 * @param speed - The speed multiplier (default: 1)
 * @returns Formatted duration string
 */
function getAnimationDuration(baseMs, speed = 1) {
    const duration = baseMs / Math.max(speed, 0.1); // Prevent division by zero
    return `${duration}ms`;
}
/**
 * Creates a CSS animation name with prefix
 * @param name - The base name for the animation
 * @returns Prefixed animation name
 */
function createAnimationName(name) {
    return `react-loadly-${name}`;
}
/**
 * Check if reduced motion is preferred
 * @returns Boolean indicating if reduced motion is preferred
 */
function prefersReducedMotion() {
    // Check if we're in a browser environment
    if (typeof window === "undefined" || !window.matchMedia)
        return false;
    try {
        return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    }
    catch (e) {
        return false;
    }
}
/**
 * Get optimized animation settings based on user preferences
 * @param speed - The animation speed multiplier (default: 1)
 * @returns Object with optimized animation settings
 */
function getOptimizedAnimationSettings(speed = 1) {
    // In test environments, disable animations to prevent test failures
    if (typeof process !== "undefined" && process.env.NODE_ENV === "test") {
        return {
            duration: "0ms",
            playState: "paused",
            iterationCount: 1,
        };
    }
    const reducedMotion = prefersReducedMotion();
    return {
        duration: reducedMotion ? "0ms" : getAnimationDuration(1000, speed),
        playState: reducedMotion ? "paused" : "running",
        iterationCount: reducedMotion ? 1 : "infinite",
    };
}

/**
 * Converts hex color to RGB values
 * @param hex - The hex color string
 * @returns Object with r, g, b values or null if invalid
 */
function hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
        ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16),
        }
        : null;
}
/**
 * Generates rgba color with opacity
 * @param color - The hex color string
 * @param opacity - The opacity value (0-1)
 * @returns RGBA color string
 */
function rgba(color, opacity) {
    const rgb = hexToRgb(color);
    if (!rgb)
        return color;
    return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${clamp(opacity, 0, 1)})`;
}

/**
 * Clamps a value between min and max
 * @param value - The value to clamp
 * @param min - The minimum value
 * @param max - The maximum value
 * @returns The clamped value
 */
function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
}

/**
 * Generates unique IDs for accessibility
 * @param prefix - The prefix for the ID (default: "loader")
 * @returns A unique ID string
 */
function generateId(prefix = "loader") {
    return `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
}
/**
 * Validates and sanitizes CSS values
 * @param value - The CSS value to sanitize
 * @returns Sanitized CSS value or undefined
 */
function sanitizeCSSValue(value) {
    if (value === undefined || value === null)
        return undefined;
    if (typeof value === "number")
        return `${value}px`;
    if (typeof value === "string") {
        // Basic sanitization - remove potentially dangerous CSS
        return value.replace(/[<>'"]/g, "");
    }
    return undefined;
}

const Dot = ({ size = 8, color = "var(--react-loadly-color)", opacity = 1, className = "", style = {}, animation, animationDuration, animationDelay, glowIntensity = 0, "data-testid": dataTestId, ...props }) => {
    const sizeValue = getSizeValue(size);
    const dotStyle = {
        width: sizeValue,
        height: sizeValue,
        borderRadius: "50%",
        backgroundColor: color,
        opacity,
        animation: animation ? `${animation} ${animationDuration || "1s"} infinite` : undefined,
        animationDelay,
        display: "inline-block",
        boxShadow: glowIntensity > 0 ? `0 0 ${glowIntensity * 10}px ${color}` : undefined,
        ...style,
    };
    return React.createElement("div", { className: `react-loadly-dot ${className}`.trim(), style: dotStyle, "data-testid": dataTestId, ...props });
};

const Line = ({ width = 30, height = 4, color = "var(--react-loadly-color)", opacity = 1, borderRadius = 2, className = "", style = {}, animation, animationDuration, animationDelay, orientation = "horizontal", "data-testid": dataTestId, ...props }) => {
    const widthValue = getSizeValue(width);
    const heightValue = getSizeValue(height);
    const borderRadiusValue = sanitizeCSSValue(borderRadius);
    const lineStyle = {
        width: orientation === "vertical" ? heightValue : widthValue,
        height: orientation === "vertical" ? widthValue : heightValue,
        backgroundColor: color,
        opacity,
        borderRadius: borderRadiusValue,
        animation: animation ? `${animation} ${animationDuration || "1s"} infinite` : undefined,
        animationDelay,
        display: "inline-block",
        ...style,
    };
    return (React.createElement("div", { className: `react-loadly-line react-loadly-line-${orientation} ${className}`.trim(), style: lineStyle, "data-testid": dataTestId, ...props }));
};

const Rectangle = ({ width = 20, height = 20, color = "var(--react-loadly-color)", borderColor, borderWidth = 0, borderRadius = 0, opacity = 1, className = "", style = {}, animation, animationDuration, animationDelay, "data-testid": dataTestId, ...props }) => {
    const widthValue = getSizeValue(width);
    const heightValue = getSizeValue(height);
    const borderWidthValue = sanitizeCSSValue(borderWidth);
    const borderRadiusValue = sanitizeCSSValue(borderRadius);
    const rectangleStyle = {
        width: widthValue,
        height: heightValue,
        backgroundColor: borderColor ? "transparent" : color,
        border: borderColor ? `${borderWidthValue} solid ${borderColor}` : undefined,
        borderRadius: borderRadiusValue,
        opacity,
        animation: animation ? `${animation} ${animationDuration || "1s"} infinite` : undefined,
        animationDelay,
        display: "inline-block",
        ...style,
    };
    return React.createElement("div", { className: `react-loadly-rectangle ${className}`.trim(), style: rectangleStyle, "data-testid": dataTestId, ...props });
};

const Circle = ({ size = 20, color = "var(--react-loadly-color)", borderColor, borderWidth = 0, opacity = 1, className = "", style = {}, animation, animationDuration, animationDelay, "data-testid": dataTestId, ...props }) => {
    const sizeValue = getSizeValue(size);
    const borderWidthValue = sanitizeCSSValue(borderWidth);
    const circleStyle = {
        width: sizeValue,
        height: sizeValue,
        borderRadius: "50%",
        backgroundColor: borderColor ? "transparent" : color,
        border: borderColor ? `${borderWidthValue} solid ${borderColor}` : undefined,
        opacity,
        animation: animation ? `${animation} ${animationDuration || "1s"} infinite` : undefined,
        animationDelay,
        display: "inline-block",
        ...style,
    };
    return React.createElement("div", { className: `react-loadly-circle ${className}`.trim(), style: circleStyle, "data-testid": dataTestId, ...props });
};

const DotCluster = ({ count = 3, dotSize = 8, color = "var(--react-loadly-color)", secondaryColor, spacing = 8, speed = 1, arrangement = "linear", className = "", style = {}, animationType = "wave", "data-testid": dataTestId, ...props }) => {
    const spacingValue = getSizeValue(spacing);
    const animationDuration = getAnimationDuration(1200, speed);
    const getArrangementStyle = () => {
        switch (arrangement) {
            case "circular":
                return {
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "relative",
                    width: `${(parseInt(getSizeValue(dotSize)) + parseInt(spacingValue)) * 2}px`,
                    height: `${(parseInt(getSizeValue(dotSize)) + parseInt(spacingValue)) * 2}px`,
                };
            case "grid": {
                const gridSize = Math.ceil(Math.sqrt(count));
                return {
                    display: "grid",
                    gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
                    gap: spacingValue,
                };
            }
            default: // linear
                return {
                    display: "flex",
                    alignItems: "center",
                    gap: spacingValue,
                };
        }
    };
    const getDotPosition = (index) => {
        if (arrangement === "circular") {
            const angle = (index / count) * 2 * Math.PI;
            const radius = parseInt(spacingValue);
            return {
                position: "absolute",
                left: "50%",
                top: "50%",
                transform: `translate(-50%, -50%) translate(${Math.cos(angle) * radius}px, ${Math.sin(angle) * radius}px)`,
            };
        }
        return {};
    };
    const getDotAnimationDelay = (index) => {
        return `${(index * 0.1) / speed}s`;
    };
    const containerStyle = {
        ...getArrangementStyle(),
        ...style,
    };
    return (React.createElement("div", { className: `react-loadly-dot-cluster react-loadly-dot-cluster-${arrangement} ${className}`.trim(), style: containerStyle, "data-testid": dataTestId, ...props }, Array.from({ length: count }, (_, index) => (React.createElement(Dot, { key: index, size: dotSize, color: secondaryColor && index % 2 === 1 ? secondaryColor : color, animation: `react-loadly-${animationType}`, animationDuration: animationDuration, animationDelay: getDotAnimationDelay(index), style: getDotPosition(index), "data-testid": dataTestId ? `${dataTestId}-dot-${index}` : undefined })))));
};

const LineGroup = ({ count = 5, lineWidth = 4, lineHeight = 35, color = "var(--react-loadly-color)", secondaryColor, spacing = 6, speed = 1, arrangement = "parallel", orientation = "vertical", className = "", style = {}, animationType = "wave", "data-testid": dataTestId, ...props }) => {
    const spacingValue = getSizeValue(spacing);
    const animationDuration = getAnimationDuration(1000, speed);
    const getArrangementStyle = () => {
        switch (arrangement) {
            case "radial":
                return {
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "relative",
                    width: `${parseInt(getSizeValue(lineHeight)) * 1.5}px`,
                    height: `${parseInt(getSizeValue(lineHeight)) * 1.5}px`,
                };
            case "staggered":
                return {
                    display: "flex",
                    alignItems: "flex-end",
                    justifyContent: "center",
                    gap: spacingValue,
                };
            default: // parallel
                return {
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: spacingValue,
                };
        }
    };
    const getLinePosition = (index) => {
        if (arrangement === "radial") {
            const angle = (index / count) * 2 * Math.PI;
            return {
                position: "absolute",
                left: "50%",
                top: "50%",
                transformOrigin: "center",
                transform: `translate(-50%, -50%) rotate(${angle}rad)`,
            };
        }
        if (arrangement === "staggered") {
            const heightMultiplier = 0.3 + 0.7 * Math.sin((index / count) * Math.PI);
            return {
                height: orientation === "vertical" ? `${parseInt(getSizeValue(lineHeight)) * heightMultiplier}px` : getSizeValue(lineHeight),
            };
        }
        return {};
    };
    const getLineAnimationDelay = (index) => {
        return `${(index * 0.1) / speed}s`;
    };
    const containerStyle = {
        ...getArrangementStyle(),
        ...style,
    };
    return (React.createElement("div", { className: `react-loadly-line-group react-loadly-line-group-${arrangement} ${className}`.trim(), style: containerStyle, "data-testid": dataTestId, ...props }, Array.from({ length: count }, (_, index) => (React.createElement(Line, { key: index, width: orientation === "horizontal" ? lineWidth : lineHeight, height: orientation === "horizontal" ? lineHeight : lineWidth, color: secondaryColor && index % 2 === 1 ? secondaryColor : color, orientation: orientation, animation: `react-loadly-${animationType}`, animationDuration: animationDuration, animationDelay: getLineAnimationDelay(index), style: getLinePosition(index), "data-testid": dataTestId ? `${dataTestId}-line-${index}` : undefined })))));
};

const ShapeGroup = ({ count = 4, shapeSize = 16, color = "var(--react-loadly-color)", secondaryColor, spacing = 8, speed = 1, arrangement = "linear", shapeTypes = ["circle", "rectangle"], className = "", style = {}, animationType = "pulse", borderWidth = 0, "data-testid": dataTestId, ...props }) => {
    const spacingValue = getSizeValue(spacing);
    const animationDuration = getAnimationDuration(800, speed);
    const getArrangementStyle = () => {
        switch (arrangement) {
            case "circular":
                return {
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "relative",
                    width: `${(parseInt(getSizeValue(shapeSize)) + parseInt(spacingValue)) * 2.5}px`,
                    height: `${(parseInt(getSizeValue(shapeSize)) + parseInt(spacingValue)) * 2.5}px`,
                };
            case "spiral":
                return {
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "relative",
                    width: `${(parseInt(getSizeValue(shapeSize)) + parseInt(spacingValue)) * 3}px`,
                    height: `${(parseInt(getSizeValue(shapeSize)) + parseInt(spacingValue)) * 3}px`,
                };
            default: // linear
                return {
                    display: "flex",
                    alignItems: "center",
                    gap: spacingValue,
                };
        }
    };
    const getShapePosition = (index) => {
        if (arrangement === "circular") {
            const angle = (index / count) * 2 * Math.PI;
            const radius = parseInt(spacingValue) * 2;
            return {
                position: "absolute",
                left: "50%",
                top: "50%",
                transform: `translate(-50%, -50%) translate(${Math.cos(angle) * radius}px, ${Math.sin(angle) * radius}px)`,
            };
        }
        if (arrangement === "spiral") {
            const angle = (index / count) * 4 * Math.PI;
            const radius = ((index + 1) * parseInt(spacingValue)) / 2;
            return {
                position: "absolute",
                left: "50%",
                top: "50%",
                transform: `translate(-50%, -50%) translate(${Math.cos(angle) * radius}px, ${Math.sin(angle) * radius}px)`,
            };
        }
        return {};
    };
    const getShapeAnimationDelay = (index) => {
        return `${(index * 0.15) / speed}s`;
    };
    const getShapeType = (index) => {
        return shapeTypes[index % shapeTypes.length];
    };
    const containerStyle = {
        ...getArrangementStyle(),
        ...style,
    };
    const renderShape = (index) => {
        const shapeType = getShapeType(index);
        const shapeColor = secondaryColor && index % 2 === 1 ? secondaryColor : color;
        const commonProps = {
            key: index,
            color: borderWidth > 0 ? undefined : shapeColor,
            borderColor: borderWidth > 0 ? shapeColor : undefined,
            borderWidth: borderWidth > 0 ? borderWidth : undefined,
            animation: `react-loadly-${animationType}`,
            animationDuration,
            animationDelay: getShapeAnimationDelay(index),
            style: getShapePosition(index),
            "data-testid": dataTestId ? `${dataTestId}-shape-${index}` : undefined,
        };
        if (shapeType === "circle") {
            return React.createElement(Circle, { ...commonProps, size: shapeSize });
        }
        else {
            return React.createElement(Rectangle, { ...commonProps, width: shapeSize, height: shapeSize });
        }
    };
    return (React.createElement("div", { className: `react-loadly-shape-group react-loadly-shape-group-${arrangement} ${className}`.trim(), style: containerStyle, "data-testid": dataTestId, ...props }, Array.from({ length: count }, (_, index) => renderShape(index))));
};

const defaultProps$e = {
    size: 20,
    color: "var(--react-loadly-color)",
    speed: 1,
    loading: true,
    count: 5,
    "aria-label": "Loading...",
};
const BarsLoader = (userProps) => {
    const props = mergeProps(defaultProps$e, userProps);
    const { size, color, speed, loading, className = "", style = {}, count = 5, showText, loadingText = "Loading...", "aria-label": ariaLabel, "data-testid": dataTestId, fullscreen, screenWidth, screenHeight, loaderCenter, screenBackground, ...restProps } = props;
    const id = useMemo(() => generateId("bars-loader"), []);
    const sizeValue = getSizeValue(size);
    const animationSettings = getOptimizedAnimationSettings(speed);
    if (!loading)
        return null;
    const containerStyle = {
        display: "inline-flex",
        flexDirection: "column",
        alignItems: "center",
        ...style,
        ...(fullscreen && {
            position: "fixed",
            top: 0,
            left: 0,
            width: screenWidth || "100vw",
            height: screenHeight || "100vh",
            backgroundColor: screenBackground || "var(--react-loadly-background)",
            zIndex: 9999,
            justifyContent: loaderCenter ? "center" : style.justifyContent,
        }),
    };
    const barsContainerStyle = {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "4px",
    };
    const barStyle = {
        width: "4px",
        height: sizeValue,
        backgroundColor: color,
        borderRadius: "2px",
        animation: `react-loadly-bars ${animationSettings.duration} ease-in-out infinite`,
        animationPlayState: animationSettings.playState,
    };
    // Create bars with different animation delays
    const bars = Array.from({ length: count }).map((_, index) => {
        const delay = `${index * 0.1}s`;
        const heightFactor = 0.5 + (index % 3) * 0.25; // Vary heights for visual interest
        return (React.createElement("div", { key: index, style: {
                ...barStyle,
                animationDelay: delay,
                height: `${parseFloat(sizeValue) * heightFactor}px`,
            }, "data-testid": dataTestId ? `${dataTestId}-bar-${index}` : undefined }));
    });
    return (React.createElement("div", { className: `react-loadly react-loadly-bars  ${className}`.trim(), style: containerStyle, role: "status", "aria-label": ariaLabel, "aria-live": "polite", "aria-busy": loading, "data-testid": dataTestId, ...restProps },
        React.createElement("div", { style: barsContainerStyle }, bars),
        showText && (React.createElement("div", { className: "react-loadly-text", id: `${id}-text`, "aria-live": "polite" }, loadingText)),
        React.createElement("span", { className: "react-loadly-sr-only" }, ariaLabel)));
};

const defaultProps$d = {
    size: 60,
    color: "var(--react-loadly-color)",
    speed: 1,
    loading: true,
    fluidity: 1,
    amplitude: 1,
    "aria-label": "Loading...",
};
const BlobLoader = (userProps) => {
    const props = mergeProps(defaultProps$d, userProps);
    const { size, color, secondaryColor, speed, loading, fluidity, amplitude, className = "", style = {}, showText, loadingText = "Loading...", "aria-label": ariaLabel, "data-testid": dataTestId, ...restProps } = props;
    const id = useMemo(() => generateId("blob-loader"), []);
    const sizeValue = getSizeValue(size);
    const animationDuration = getAnimationDuration(2500, speed);
    if (!loading)
        return null;
    const containerStyle = {
        display: "inline-flex",
        flexDirection: "column",
        alignItems: "center",
        ...style,
    };
    const blobStyle = {
        width: sizeValue,
        height: sizeValue,
        background: `linear-gradient(45deg, ${color}, ${secondaryColor || color})`,
        borderRadius: "30% 70% 70% 30% / 30% 30% 70% 70%",
        animation: `blob-morph ${animationDuration} ease-in-out infinite`,
        filter: "blur(1px)",
        position: "relative",
    };
    const innerBlobStyle = {
        position: "absolute",
        top: "20%",
        left: "20%",
        width: "60%",
        height: "60%",
        background: `radial-gradient(circle, ${secondaryColor || color}, transparent)`,
        borderRadius: "40% 60% 60% 40% / 40% 40% 60% 60%",
        animation: `blob-inner ${animationDuration} ease-in-out infinite reverse`,
        opacity: 0.7,
    };
    return (React.createElement(React.Fragment, null,
        React.createElement("style", null, `
        @keyframes blob-morph {
          0%, 100% {
            border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
            transform: scale(1) rotate(0deg);
          }
          25% {
            border-radius: 58% 42% 75% 25% / 76% 46% 54% 24%;
            transform: scale(${1 + (amplitude ?? 1) * 0.1}) rotate(90deg);
          }
          50% {
            border-radius: 50% 50% 33% 67% / 55% 27% 73% 45%;
            transform: scale(${1 - (amplitude ?? 1) * 0.05}) rotate(180deg);
          }
          75% {
            border-radius: 33% 67% 58% 42% / 63% 68% 32% 37%;
            transform: scale(${1 + (amplitude ?? 1) * 0.08}) rotate(270deg);
          }
        }
        
        @keyframes blob-inner {
          0%, 100% {
            border-radius: 40% 60% 60% 40% / 40% 40% 60% 60%;
            transform: scale(1) rotate(0deg);
          }
          33% {
            border-radius: 70% 30% 50% 50% / 30% 70% 30% 70%;
            transform: scale(${1.1 + (fluidity ?? 1) * 0.1}) rotate(-120deg);
          }
          66% {
            border-radius: 30% 70% 40% 60% / 70% 30% 70% 30%;
            transform: scale(${0.9 + (fluidity ?? 1) * 0.05}) rotate(-240deg);
          }
        }
      `),
        React.createElement("div", { className: `react-loadly react-loadly-blob  ${className}`.trim(), style: containerStyle, role: "status", "aria-label": ariaLabel, "aria-live": "polite", "aria-busy": loading, "data-testid": dataTestId, ...restProps },
            React.createElement("div", { style: blobStyle, "data-testid": dataTestId ? `${dataTestId}-blob` : undefined },
                React.createElement("div", { style: innerBlobStyle })),
            showText && (React.createElement("div", { className: "react-loadly-text", id: `${id}-text`, "aria-live": "polite" }, loadingText)),
            React.createElement("span", { className: "react-loadly-sr-only" }, ariaLabel))));
};

const defaultProps$c = {
    size: 15,
    color: "var(--react-loadly-color)",
    speed: 1,
    loading: true,
    count: 3,
    "aria-label": "Loading...",
};
const BounceLoader = (userProps) => {
    const props = mergeProps(defaultProps$c, userProps);
    const { size, color, speed, loading, className = "", style = {}, count = 3, showText, loadingText = "Loading...", "aria-label": ariaLabel, "data-testid": dataTestId, fullscreen, screenWidth, screenHeight, loaderCenter, screenBackground, ...restProps } = props;
    const id = useMemo(() => generateId("bounce-loader"), []);
    const sizeValue = getSizeValue(size);
    const animationSettings = getOptimizedAnimationSettings(speed);
    if (!loading)
        return null;
    const containerStyle = {
        display: "inline-flex",
        flexDirection: "column",
        alignItems: "center",
        ...style,
        ...(fullscreen && {
            position: "fixed",
            top: 0,
            left: 0,
            width: screenWidth || "100vw",
            height: screenHeight || "100vh",
            backgroundColor: screenBackground || "var(--react-loadly-background)",
            zIndex: 9999,
            justifyContent: loaderCenter ? "center" : style.justifyContent,
        }),
    };
    const bounceContainerStyle = {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "8px",
    };
    const bounceBallStyle = {
        width: sizeValue,
        height: sizeValue,
        borderRadius: "50%",
        backgroundColor: color,
        animation: `react-loadly-bounce ${animationSettings.duration} ease-in-out infinite`,
        animationPlayState: animationSettings.playState,
    };
    // Create bounce animation delays for each ball
    const balls = Array.from({ length: count }).map((_, index) => {
        const delay = `${index * 0.1}s`;
        return (React.createElement("div", { key: index, style: {
                ...bounceBallStyle,
                animationDelay: delay,
            }, "data-testid": dataTestId ? `${dataTestId}-ball-${index}` : undefined }));
    });
    return (React.createElement("div", { className: `react-loadly react-loadly-bounce ${className}`.trim(), style: containerStyle, role: "status", "aria-label": ariaLabel, "aria-live": "polite", "aria-busy": loading, "data-testid": dataTestId, ...restProps },
        React.createElement("div", { style: bounceContainerStyle }, balls),
        showText && (React.createElement("div", { className: "react-loadly-text", id: `${id}-text`, "aria-live": "polite" }, loadingText)),
        React.createElement("span", { className: "react-loadly-sr-only" }, ariaLabel)));
};

const defaultProps$b = {
    size: 12,
    color: "var(--react-loadly-color)",
    speed: 1,
    loading: true,
    count: 3,
    "aria-label": "Loading...",
};
const DotsLoader = (userProps) => {
    const props = mergeProps(defaultProps$b, userProps);
    const { size, color, speed, loading, className = "", style = {}, count = 3, showText, loadingText = "Loading...", "aria-label": ariaLabel, "data-testid": dataTestId, fullscreen, screenWidth, screenHeight, loaderCenter, screenBackground, ...restProps } = props;
    const id = useMemo(() => generateId("dots-loader"), []);
    const sizeValue = getSizeValue(size);
    const animationSettings = getOptimizedAnimationSettings(speed);
    if (!loading)
        return null;
    const containerStyle = {
        display: "inline-flex",
        flexDirection: "column",
        alignItems: "center",
        ...style,
        ...(fullscreen && {
            position: "fixed",
            top: 0,
            left: 0,
            width: screenWidth || "100vw",
            height: screenHeight || "100vh",
            backgroundColor: screenBackground || "var(--react-loadly-background)",
            zIndex: 9999,
            justifyContent: loaderCenter ? "center" : style.justifyContent,
        }),
    };
    const dotsContainerStyle = {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "6px",
    };
    const dotStyle = {
        width: sizeValue,
        height: sizeValue,
        borderRadius: "50%",
        backgroundColor: color,
        animation: `react-loadly-dots ${animationSettings.duration} ease-in-out infinite`,
        animationPlayState: animationSettings.playState,
    };
    // Create dots with different animation delays
    const dots = Array.from({ length: count }).map((_, index) => {
        const delay = `${index * 0.2}s`;
        return (React.createElement("div", { key: index, style: {
                ...dotStyle,
                animationDelay: delay,
            }, "data-testid": dataTestId ? `${dataTestId}-dot-${index}` : undefined }));
    });
    return (React.createElement("div", { className: `react-loadly react-loadly-dots  ${className}`.trim(), style: containerStyle, role: "status", "aria-label": ariaLabel, "aria-live": "polite", "aria-busy": loading, "data-testid": dataTestId, ...restProps },
        React.createElement("div", { style: dotsContainerStyle }, dots),
        showText && (React.createElement("div", { className: "react-loadly-text", id: `${id}-text`, "aria-live": "polite" }, loadingText)),
        React.createElement("span", { className: "react-loadly-sr-only" }, ariaLabel)));
};

const defaultProps$a = {
    size: 60,
    speed: 1,
    loading: true,
    animationType: "spin",
    glowIntensity: 0.3,
    "aria-label": "Loading...",
};
const ElementLoader = (userProps) => {
    const props = mergeProps(defaultProps$a, userProps);
    const { size, width, height, speed = 1, loading, animationType, glowIntensity, className = "", style = {}, color = "var(--react-loadly-color)", "aria-label": ariaLabel, loadingText, showText, "data-testid": dataTestId, fullscreen, screenWidth, screenHeight, loaderCenter, screenBackground, children, ...restProps } = props;
    if (!loading)
        return null;
    const containerStyle = {
        display: "inline-flex",
        flexDirection: "column",
        alignItems: "center",
        ...style,
        ...(fullscreen && {
            position: "fixed",
            top: 0,
            left: 0,
            width: screenWidth || "100vw",
            height: screenHeight || "100vh",
            backgroundColor: screenBackground || "var(--react-loadly-background)",
            zIndex: 9999,
            justifyContent: loaderCenter ? "center" : style.justifyContent,
        }),
    };
    // Enhanced animation variants for ElementLoader
    const getAnimation = () => {
        switch (animationType) {
            case "pulse":
                return `react-loadly-pulse ${getAnimationDuration(2000, speed)} infinite`;
            case "glow":
                return `react-loadly-glow ${getAnimationDuration(2000, speed)} infinite`;
            case "bounce":
                return `react-loadly-bounce ${getAnimationDuration(2000, speed)} infinite`;
            case "flip":
                return `react-loadly-flip ${getAnimationDuration(2000, speed)} infinite`;
            case "spin":
            default:
                return `react-loadly-spin ${getAnimationDuration(2000, speed)} infinite`;
        }
    };
    // Calculate dimensions, prioritizing width/height props over size
    const elementWidth = width || size;
    const elementHeight = height || size;
    const elementStyle = {
        width: typeof elementWidth === "number" ? `${elementWidth}px` : elementWidth,
        height: typeof elementHeight === "number" ? `${elementHeight}px` : elementHeight,
        animation: getAnimation(),
        filter: (glowIntensity ?? 0) > 0 ? `drop-shadow(0 0 ${(glowIntensity ?? 0) * 20}px ${color})` : undefined,
        transformStyle: "preserve-3d",
        willChange: "transform",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    };
    // Add additional animated elements for enhanced visual effect
    const innerElementStyle = {
        position: "absolute",
        top: "50%",
        left: "50%",
        width: "60%",
        height: "60%",
        borderRadius: "50%",
        backgroundColor: color,
        opacity: 0.3,
        transform: "translate(-50%, -50%)",
        animation: `react-loadly-pulse ${getAnimationDuration(1500, speed * 1.5)} infinite`,
        zIndex: -1,
    };
    const outerElementStyle = {
        position: "absolute",
        top: "50%",
        left: "50%",
        width: "120%",
        height: "120%",
        borderRadius: "50%",
        border: `2px solid ${color}`,
        opacity: 0.2,
        transform: "translate(-50%, -50%)",
        animation: `react-loadly-spin ${getAnimationDuration(3000, speed * 0.8)} infinite reverse`,
        zIndex: -2,
    };
    return (React.createElement("div", { className: `react-loadly react-loadly-element-loader ${className}`.trim(), style: containerStyle, role: "status", "aria-label": ariaLabel, "aria-live": "polite", "aria-busy": loading, "data-testid": dataTestId, ...restProps },
        React.createElement("div", { style: { position: "relative", display: "flex", alignItems: "center", justifyContent: "center" } },
            React.createElement("div", { style: outerElementStyle }),
            React.createElement("div", { style: innerElementStyle }),
            React.createElement("div", { style: elementStyle, className: "react-loadly-element", "data-testid": dataTestId ? `${dataTestId}-element` : undefined }, children)),
        showText && (React.createElement("div", { className: "react-loadly-text", "aria-live": "polite" }, loadingText || ariaLabel)),
        React.createElement("span", { className: "react-loadly-sr-only" }, ariaLabel)));
};

const ErrorIcon = ({ className = "" }) => (React.createElement("svg", { className: className, fill: "currentColor", viewBox: "0 0 20 20", xmlns: "http://www.w3.org/2000/svg", "aria-hidden": "true" },
    React.createElement("path", { clipRule: "evenodd", fillRule: "evenodd", d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" })));
const NetworkIcon = ({ className = "" }) => (React.createElement("svg", { className: className, fill: "currentColor", viewBox: "0 0 20 20", xmlns: "http://www.w3.org/2000/svg", "aria-hidden": "true" },
    React.createElement("path", { fillRule: "evenodd", d: "M9.243 3.03a1 1 0 01.727 1.213L9.53 6h2.94l.56-2.243a1 1 0 111.94.486L14.53 6H16a1 1 0 110 2h-1.97l-1 4H15a1 1 0 110 2h-2.47l-.56 2.242a1 1 0 11-1.94-.485L10.47 14H7.53l-.56 2.242a1 1 0 11-1.94-.485L5.47 14H4a1 1 0 110-2h1.97l1-4H5a1 1 0 110-2h2.47l.56-2.243a1 1 0 011.213-.727zM9.03 8l-1 4h2.94l1-4H9.03z", clipRule: "evenodd" })));
const TimeoutIcon = ({ className = "" }) => (React.createElement("svg", { className: className, fill: "currentColor", viewBox: "0 0 20 20", xmlns: "http://www.w3.org/2000/svg", "aria-hidden": "true" },
    React.createElement("path", { fillRule: "evenodd", d: "M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z", clipRule: "evenodd" })));
const FallbackLoader = ({ error = "Something went wrong", onRetry, showRetry = true, children, type = "error", className = "", style = {}, fullscreen, screenWidth, screenHeight, loaderCenter, screenBackground, ...restProps }) => {
    const getIcon = () => {
        switch (type) {
            case "network":
                return React.createElement(NetworkIcon, { className: "react-loadly-error-icon" });
            case "timeout":
                return React.createElement(TimeoutIcon, { className: "react-loadly-error-icon" });
            default:
                return React.createElement(ErrorIcon, { className: "react-loadly-error-icon" });
        }
    };
    const getMessage = () => {
        switch (type) {
            case "network":
                return error || "Network connection failed. Please check your internet connection.";
            case "timeout":
                return error || "Loading timeout. The operation took too long to complete.";
            default:
                return error || "Something went wrong. Please try again.";
        }
    };
    const containerStyle = {
        ...style,
        ...(fullscreen && {
            position: "fixed",
            top: 0,
            left: 0,
            width: screenWidth || "100vw",
            height: screenHeight || "100vh",
            backgroundColor: screenBackground || "var(--react-loadly-error-background)",
            zIndex: 9999,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: loaderCenter ? "center" : style.justifyContent,
        }),
    };
    if (children) {
        return React.createElement("div", { className: `react-loadly-fallback ${className}`.trim(), style: containerStyle, ...restProps }, children);
    }
    return (React.createElement("div", { className: `react-loadly-error ${className}`.trim(), style: containerStyle, role: "alert", "aria-live": "polite", ...restProps },
        getIcon(),
        React.createElement("p", { className: "react-loadly-error-message" }, getMessage()),
        showRetry && onRetry && (React.createElement("button", { className: "react-loadly-retry-button", onClick: onRetry, type: "button", "aria-label": "Retry loading" }, "Try Again"))));
};

const defaultProps$9 = {
    size: 60,
    color: "var(--react-loadly-color)",
    speed: 1,
    loading: true,
    fluidity: 1,
    amplitude: 1,
    "aria-label": "Loading...",
};
const FlowLoader = (userProps) => {
    const props = mergeProps(defaultProps$9, userProps);
    const { size, color, secondaryColor, speed, loading, amplitude, className = "", style = {}, showText, loadingText = "Loading...", "aria-label": ariaLabel, "data-testid": dataTestId, fullscreen, screenWidth, screenHeight, loaderCenter, screenBackground, ...restProps } = props;
    const id = useMemo(() => generateId("flow-loader"), []);
    const sizeValue = getSizeValue(size);
    const numericSize = parseInt(sizeValue);
    const containerHeight = Math.max(numericSize * 0.4, 10); // Minimum height of 10px
    const animationDuration = getAnimationDuration(1500, speed);
    if (!loading)
        return null;
    const containerStyle = {
        display: "inline-flex",
        flexDirection: "column",
        alignItems: "center",
        ...style,
        ...(fullscreen && {
            position: "fixed",
            top: 0,
            left: 0,
            width: screenWidth || "100vw",
            height: screenHeight || "100vh",
            backgroundColor: screenBackground || "var(--react-loadly-background)",
            zIndex: 9999,
            justifyContent: loaderCenter ? "center" : style.justifyContent,
        }),
    };
    const flowContainerStyle = {
        width: sizeValue,
        height: `${containerHeight}px`,
        position: "relative",
        overflow: "hidden",
        borderRadius: `${Math.max(numericSize * 0.2, 4)}px`, // Minimum radius of 4px
        backgroundColor: "rgba(0, 0, 0, 0.1)",
    };
    // Ensure minimum particle count even for small sizes
    const particleCount = Math.max(Math.floor(numericSize / 15), 3);
    const createParticle = (index) => {
        const delay = (index * 0.2) / (speed ?? 1);
        const duration = parseFloat(animationDuration) + index * 100;
        // Scale particle size based on container size
        const minParticleSize = Math.max(numericSize / 10, 4); // Minimum 4px
        const particleSize = minParticleSize + (index % 3) * (minParticleSize / 2);
        return (React.createElement("div", { key: index, style: {
                position: "absolute",
                width: `${particleSize}px`,
                height: `${particleSize}px`,
                borderRadius: "50%",
                background: index % 2 === 0 ? color : secondaryColor || color,
                animation: `flow-particle-${id} ${duration}ms ease-in-out infinite`,
                animationDelay: `${delay}s`,
                opacity: 0.8 - index * 0.1,
                left: "0px", // Start at the beginning of the container
                top: `${(containerHeight - particleSize) / 2 + (index % 3) * (containerHeight / (particleCount + 1))}px`, // Distribute vertically
            }, "data-testid": dataTestId ? `${dataTestId}-particle-${index}` : undefined }));
    };
    return (React.createElement(React.Fragment, null,
        React.createElement("style", null, `
        @keyframes flow-particle-${id} {
          0% {
            transform: translateX(0) translateY(0) scale(0);
            opacity: 0;
          }
          10% {
            transform: translateX(${Math.min(numericSize * 0.1, 10)}px) translateY(${Math.sin(0.1) * (amplitude ?? Math.min(5, containerHeight / 4))}px) scale(1);
            opacity: 0.8;
          }
          50% {
            transform: translateX(${Math.min(numericSize * 0.5, numericSize * 0.7)}px) translateY(${Math.sin(0.5) * (amplitude ?? Math.min(5, containerHeight / 4))}px) scale(1);
            opacity: 0.8;
          }
          90% {
            transform: translateX(${Math.min(numericSize * 0.9, numericSize - 10)}px) translateY(${Math.sin(0.9) * (amplitude ?? Math.min(5, containerHeight / 4))}px) scale(1);
            opacity: 0.8;
          }
          100% {
            transform: translateX(${numericSize}px) translateY(${Math.sin(1) * (amplitude ?? Math.min(5, containerHeight / 4))}px) scale(0);
            opacity: 0;
          }
        }
      `),
        React.createElement("div", { className: `react-loadly react-loadly-flow  ${className}`.trim(), style: containerStyle, role: "status", "aria-label": ariaLabel, "aria-live": "polite", "aria-busy": loading, "data-testid": dataTestId, ...restProps },
            React.createElement("div", { style: flowContainerStyle, "data-testid": dataTestId ? `${dataTestId}-container` : undefined }, Array.from({ length: particleCount }, (_, index) => createParticle(index))),
            showText && (React.createElement("div", { className: "react-loadly-text", id: `${id}-text`, "aria-live": "polite" }, loadingText)),
            React.createElement("span", { className: "react-loadly-sr-only" }, ariaLabel))));
};

const defaultProps$8 = {
    size: 40,
    color: "var(--react-loadly-color)",
    speed: 1,
    loading: true,
    count: 4,
    "aria-label": "Loading...",
};
const GridLoader = (userProps) => {
    const props = mergeProps(defaultProps$8, userProps);
    const { size, color, secondaryColor, speed = 1, loading, count, className = "", style = {}, showText, loadingText = "Loading...", "aria-label": ariaLabel, "data-testid": dataTestId, fullscreen, screenWidth, screenHeight, loaderCenter, screenBackground, ...restProps } = props;
    const id = useMemo(() => generateId("grid-loader"), []);
    const shapeSize = useMemo(() => {
        const sizeNum = typeof size === "number" ? size : parseInt(getSizeValue(size));
        const gridSize = Math.ceil(Math.sqrt(count || 4));
        return Math.max(sizeNum / (gridSize * 1.5), 8);
    }, [size, count]);
    if (!loading)
        return null;
    const containerStyle = {
        display: "inline-flex",
        flexDirection: "column",
        alignItems: "center",
        ...style,
        ...(fullscreen && {
            position: "fixed",
            top: 0,
            left: 0,
            width: screenWidth || "100vw",
            height: screenHeight || "100vh",
            backgroundColor: screenBackground || "var(--react-loadly-background)",
            zIndex: 9999,
            justifyContent: loaderCenter ? "center" : style.justifyContent,
        }),
    };
    return (React.createElement("div", { className: `react-loadly react-loadly-grid  ${className}`.trim(), style: containerStyle, role: "status", "aria-label": ariaLabel, "aria-live": "polite", "aria-busy": loading, "data-testid": dataTestId, ...restProps },
        React.createElement("div", { className: "react-loadly-grid-container", style: {
                display: "grid",
                gridTemplateColumns: `repeat(${Math.ceil(Math.sqrt(count || 4))}, 1fr)`,
                gap: `${shapeSize / 3}px`,
            }, "data-testid": dataTestId ? `${dataTestId}-grid` : undefined }, Array.from({ length: count || 4 }).map((_, index) => (React.createElement("div", { key: index, className: "react-loadly-grid-item", style: {
                width: `${shapeSize}px`,
                height: `${shapeSize}px`,
                backgroundColor: index % 2 === 0 ? color : secondaryColor || color,
                borderRadius: "20%",
                animation: `react-loadly-scale ${1.2 / (speed || 1)}s ease-in-out infinite`,
                animationDelay: `${(index * 0.1) / (speed || 1)}s`,
            } })))),
        showText && (React.createElement("div", { className: "react-loadly-text", id: `${id}-text`, "aria-live": "polite" }, loadingText)),
        React.createElement("span", { className: "react-loadly-sr-only" }, ariaLabel)));
};

const defaultProps$7 = {
    size: 60,
    color: "var(--react-loadly-color)",
    speed: 1,
    loading: true,
    fluidity: 1,
    amplitude: 1,
    "aria-label": "Loading...",
};
const LiquidLoader = (userProps) => {
    const props = mergeProps(defaultProps$7, userProps);
    const { size, color, secondaryColor, speed, loading, amplitude, className = "", style = {}, showText, loadingText = "Loading...", "aria-label": ariaLabel, "data-testid": dataTestId, fullscreen, screenWidth, screenHeight, loaderCenter, screenBackground, ...restProps } = props;
    const id = useMemo(() => generateId("liquid-loader"), []);
    const sizeValue = getSizeValue(size);
    const animationDuration = getAnimationDuration(2000, speed);
    if (!loading)
        return null;
    const containerStyle = {
        display: "inline-flex",
        flexDirection: "column",
        alignItems: "center",
        ...style,
        ...(fullscreen && {
            position: "fixed",
            top: 0,
            left: 0,
            width: screenWidth || "100vw",
            height: screenHeight || "100vh",
            backgroundColor: screenBackground || "var(--react-loadly-background)",
            zIndex: 9999,
            justifyContent: loaderCenter ? "center" : style.justifyContent,
        }),
    };
    const liquidStyle = {
        width: sizeValue,
        height: sizeValue,
        position: "relative",
        overflow: "hidden",
        borderRadius: "50%",
        backgroundColor: "rgba(0, 0, 0, 0.1)",
    };
    // Calculate the translateY value based on amplitude
    const translateY = 50 - (amplitude ?? 1) * 10;
    const waveStyle = {
        position: "absolute",
        bottom: 0,
        left: 0,
        width: "200%",
        height: "200%",
        background: `linear-gradient(180deg, ${color} 0%, ${secondaryColor || color} 100%)`,
        borderRadius: "40%",
        animation: `react-loadly-liquid-wave ${animationDuration} ease-in-out infinite`,
        transform: "translate(-25%, 50%) rotate(0deg)",
        animationTimingFunction: `cubic-bezier(0.36, 0.45, 0.63, 0.53)`,
    };
    const wave2Style = {
        ...waveStyle,
        background: `linear-gradient(180deg, ${secondaryColor || color} 0%, ${color} 100%)`,
        animation: `react-loadly-liquid-wave ${animationDuration} ease-in-out infinite reverse`,
        animationDelay: `${ -0.5 / (speed ?? 1)}s`,
        opacity: 0.8,
    };
    return (React.createElement(React.Fragment, null,
        React.createElement("style", null, `
        @keyframes react-loadly-liquid-wave {
          0%, 100% {
            transform: translate(-25%, 50%) rotate(0deg);
          }
          50% {
            transform: translate(-25%, ${translateY}%) rotate(180deg);
          }
        }
      `),
        React.createElement("div", { className: `react-loadly react-loadly-liquid  ${className}`.trim(), style: containerStyle, role: "status", "aria-label": ariaLabel, "aria-live": "polite", "aria-busy": loading, "data-testid": dataTestId, ...restProps },
            React.createElement("div", { style: liquidStyle, "data-testid": dataTestId ? `${dataTestId}-container` : undefined },
                React.createElement("div", { style: waveStyle }),
                React.createElement("div", { style: wave2Style })),
            showText && (React.createElement("div", { className: "react-loadly-text", id: `${id}-text`, "aria-live": "polite" }, loadingText)),
            React.createElement("span", { className: "react-loadly-sr-only" }, ariaLabel))));
};

const defaultProps$6 = {
    size: 60,
    speed: 1,
    loading: true,
    animationType: "spin",
    glowIntensity: 0.3,
    "aria-label": "Loading...",
    alt: "Loading",
};
const LogoSpinLoader = (userProps) => {
    const props = mergeProps(defaultProps$6, userProps);
    const { src, alt, size, speed, loading, animationType, glowIntensity, className = "", style = {}, color = "var(--react-loadly-color)", "aria-label": ariaLabel, loadingText, showText, "data-testid": dataTestId, fullscreen, screenWidth, screenHeight, loaderCenter, screenBackground, ...restProps } = props;
    if (!loading)
        return null;
    const containerStyle = {
        display: "inline-flex",
        flexDirection: "column",
        alignItems: "center",
        ...style,
        ...(fullscreen && {
            position: "fixed",
            top: 0,
            left: 0,
            width: screenWidth || "100vw",
            height: screenHeight || "100vh",
            backgroundColor: screenBackground || "var(--react-loadly-background)",
            zIndex: 9999,
            justifyContent: loaderCenter ? "center" : style.justifyContent,
        }),
    };
    const logoStyle = {
        width: typeof size === "number" ? `${size}px` : size,
        height: typeof size === "number" ? `${size}px` : size,
        animation: `react-loadly-${animationType} ${getAnimationDuration(2000, speed)} infinite`,
        filter: (glowIntensity ?? 0) > 0 ? `drop-shadow(0 0 ${(glowIntensity ?? 0) * 20}px ${color})` : undefined,
    };
    return (React.createElement("div", { className: `react-loadly react-loadly-logo-spin  ${className}`.trim(), style: containerStyle, role: "status", "aria-label": ariaLabel, "aria-live": "polite", "aria-busy": loading, "data-testid": dataTestId, ...restProps },
        React.createElement("img", { src: src, alt: alt, style: logoStyle, className: "react-loadly-logo", "data-testid": dataTestId ? `${dataTestId}-logo` : undefined }),
        showText && (React.createElement("div", { className: "react-loadly-text", "aria-live": "polite" }, loadingText || ariaLabel)),
        React.createElement("span", { className: "react-loadly-sr-only" }, ariaLabel)));
};

const defaultProps$5 = {
    size: 40,
    color: "var(--react-loadly-color)",
    speed: 1,
    loading: true,
    count: 3,
    "aria-label": "Loading...",
};
const PulseLoader = (userProps) => {
    const props = mergeProps(defaultProps$5, userProps);
    const { size, color, secondaryColor, speed, loading, count, className = "", style = {}, showText, loadingText = "Loading...", "aria-label": ariaLabel, "data-testid": dataTestId, fullscreen, screenWidth, screenHeight, loaderCenter, screenBackground, ...restProps } = props;
    const id = useMemo(() => generateId("pulse-loader"), []);
    const dotSize = useMemo(() => {
        const sizeNum = typeof size === "number" ? size : parseInt(getSizeValue(size));
        return Math.max(sizeNum / 5, 6); // Ensure minimum dot size
    }, [size]);
    if (!loading)
        return null;
    const containerStyle = {
        display: "inline-flex",
        flexDirection: "column",
        alignItems: "center",
        ...style,
        ...(fullscreen && {
            position: "fixed",
            top: 0,
            left: 0,
            width: screenWidth || "100vw",
            height: screenHeight || "100vh",
            backgroundColor: screenBackground || "var(--react-loadly-background)",
            zIndex: 9999,
            justifyContent: loaderCenter ? "center" : style.justifyContent,
        }),
    };
    return (React.createElement("div", { className: `react-loadly react-loadly-pulse  ${className}`.trim(), style: containerStyle, role: "status", "aria-label": ariaLabel, "aria-live": "polite", "aria-busy": loading, "data-testid": dataTestId, ...restProps },
        React.createElement(DotCluster, { count: count, dotSize: dotSize, color: color, secondaryColor: secondaryColor, speed: speed, arrangement: "linear", animationType: "pulse", spacing: dotSize / 2, "data-testid": dataTestId ? `${dataTestId}-dots` : undefined }),
        showText && (React.createElement("div", { className: "react-loadly-text", id: `${id}-text`, "aria-live": "polite" }, loadingText)),
        React.createElement("span", { className: "react-loadly-sr-only" }, ariaLabel)));
};

const defaultProps$4 = {
    size: 60,
    color: "var(--react-loadly-color)",
    speed: 1,
    loading: true,
    borderWidth: 4,
    "aria-label": "Loading...",
};
const RingLoader = (userProps) => {
    const props = mergeProps(defaultProps$4, userProps);
    const { size, color, speed, loading, className = "", style = {}, borderWidth, showText, loadingText = "Loading...", "aria-label": ariaLabel, "data-testid": dataTestId, fullscreen, screenWidth, screenHeight, loaderCenter, screenBackground, ...restProps } = props;
    // Use useRef instead of useMemo for better compatibility
    const idRef = useRef(generateId("ring-loader"));
    const sizeValue = getSizeValue(size);
    const animationSettings = getOptimizedAnimationSettings(speed);
    // Don't render anything if not loading
    if (!loading)
        return null;
    const containerStyle = {
        display: "inline-flex",
        flexDirection: "column",
        alignItems: "center",
        ...style,
        ...(fullscreen && {
            position: "fixed",
            top: 0,
            left: 0,
            width: screenWidth || "100vw",
            height: screenHeight || "100vh",
            backgroundColor: screenBackground || "var(--react-loadly-background)",
            zIndex: 9999,
            justifyContent: loaderCenter ? "center" : style.justifyContent,
        }),
    };
    const ringStyle = {
        position: "relative",
        width: sizeValue,
        height: sizeValue,
    };
    const ringSegmentStyle = {
        boxSizing: "border-box",
        display: "block",
        position: "absolute",
        width: sizeValue,
        height: sizeValue,
        border: `${borderWidth}px solid transparent`,
        borderTop: `${borderWidth}px solid ${color}`,
        borderBottom: `${borderWidth}px solid ${color}`,
        borderRadius: "50%",
        animation: `react-loadly-ring ${animationSettings.duration} cubic-bezier(0.5, 0, 0.5, 1) infinite`,
        animationPlayState: animationSettings.playState,
    };
    // Create the 4 ring segments with their specific styles
    const segments = Array.from({ length: 4 }).map((_, index) => {
        const rotation = `${index * 90}deg`;
        const delay = `${index * -0.15}s`;
        return (React.createElement("div", { key: index, style: {
                ...ringSegmentStyle,
                transform: `rotate(${rotation})`,
                animationDelay: delay,
            }, "data-testid": dataTestId ? `${dataTestId}-segment-${index}` : undefined }));
    });
    return (React.createElement("div", { className: `react-loadly react-loadly-ring  ${className}`.trim(), style: containerStyle, role: "status", "aria-label": ariaLabel, "aria-live": "polite", "aria-busy": loading, "data-testid": dataTestId, ...restProps },
        React.createElement("div", { style: ringStyle }, segments),
        showText && (React.createElement("div", { className: "react-loadly-text", id: `${idRef.current}-text`, "aria-live": "polite" }, loadingText)),
        React.createElement("span", { className: "react-loadly-sr-only" }, ariaLabel)));
};

const defaultProps$3 = {
    size: 15,
    color: "var(--react-loadly-color)",
    speed: 1,
    loading: true,
    count: 2,
    "aria-label": "Loading...",
};
const RotateLoader = (userProps) => {
    const props = mergeProps(defaultProps$3, userProps);
    const { size, color, speed, loading, className = "", style = {}, count = 2, showText, loadingText = "Loading...", "aria-label": ariaLabel, "data-testid": dataTestId, fullscreen, screenWidth, screenHeight, loaderCenter, screenBackground, ...restProps } = props;
    const id = useMemo(() => generateId("rotate-loader"), []);
    const sizeValue = getSizeValue(size);
    const animationSettings = getOptimizedAnimationSettings(speed);
    if (!loading)
        return null;
    const containerStyle = {
        display: "inline-flex",
        flexDirection: "column",
        alignItems: "center",
        ...style,
        ...(fullscreen && {
            position: "fixed",
            top: 0,
            left: 0,
            width: screenWidth || "100vw",
            height: screenHeight || "100vh",
            backgroundColor: screenBackground || "var(--react-loadly-background)",
            zIndex: 9999,
            justifyContent: loaderCenter ? "center" : style.justifyContent,
        }),
    };
    const rotateContainerStyle = {
        position: "relative",
        width: sizeValue,
        height: sizeValue,
    };
    const rotateElementStyle = {
        position: "absolute",
        width: sizeValue,
        height: sizeValue,
        border: "2px solid transparent",
        borderTopColor: color,
        borderBottomColor: color,
        borderRadius: "50%",
        animation: `react-loadly-ring ${animationSettings.duration} cubic-bezier(0.5, 0, 0.5, 1) infinite`,
        animationPlayState: animationSettings.playState,
        transform: "rotate(0deg)",
    };
    // Create rotating elements
    const elements = Array.from({ length: count }).map((_, index) => {
        const sizeFactor = 1 - index * 0.2;
        const borderWidth = 2 + index;
        const delay = `${index * -0.15}s`;
        return (React.createElement("div", { key: index, style: {
                ...rotateElementStyle,
                width: `${parseFloat(sizeValue) * sizeFactor}px`,
                height: `${parseFloat(sizeValue) * sizeFactor}px`,
                borderWidth: `${borderWidth}px`,
                animationDuration: `${parseFloat(animationSettings.duration) * (1 + index * 0.5)}ms`,
                animationDelay: delay,
            }, "data-testid": dataTestId ? `${dataTestId}-element-${index}` : undefined }));
    });
    return (React.createElement("div", { className: `react-loadly react-loadly-ring  ${className}`.trim(), style: containerStyle, role: "status", "aria-label": ariaLabel, "aria-live": "polite", "aria-busy": loading, "data-testid": dataTestId, ...restProps },
        React.createElement("div", { style: rotateContainerStyle }, elements),
        showText && (React.createElement("div", { className: "react-loadly-text", id: `${id}-text`, "aria-live": "polite" }, loadingText)),
        React.createElement("span", { className: "react-loadly-sr-only" }, ariaLabel)));
};

const defaultProps$2 = {
    size: 40,
    color: "var(--react-loadly-color)",
    speed: 1,
    loading: true,
    borderWidth: 4,
    "aria-label": "Loading...",
};
const SpinLoader = (userProps) => {
    const props = mergeProps(defaultProps$2, userProps);
    const { size, color, speed, loading, className = "", style = {}, borderWidth, showText, loadingText = "Loading...", "aria-label": ariaLabel, "data-testid": dataTestId, fullscreen, screenWidth, screenHeight, loaderCenter, screenBackground, ...restProps } = props;
    // Use useRef instead of useMemo for better compatibility
    const idRef = useRef(generateId("spin-loader"));
    const sizeValue = getSizeValue(size);
    const animationSettings = getOptimizedAnimationSettings(speed);
    if (!loading)
        return null;
    const containerStyle = {
        display: "inline-flex",
        flexDirection: "column",
        alignItems: "center",
        ...style,
        ...(fullscreen && {
            position: "fixed",
            top: 0,
            left: 0,
            width: screenWidth || "100vw",
            height: screenHeight || "100vh",
            backgroundColor: screenBackground || "var(--react-loadly-background)",
            zIndex: 9999,
            justifyContent: loaderCenter ? "center" : style.justifyContent,
        }),
    };
    const spinnerStyle = {
        width: sizeValue,
        height: sizeValue,
        border: `${borderWidth}px solid transparent`,
        borderTop: `${borderWidth}px solid ${color}`,
        borderRadius: "50%",
        animation: `react-loadly-spin ${animationSettings.duration} linear infinite`,
        animationPlayState: animationSettings.playState,
    };
    return (React.createElement("div", { className: `react-loadly react-loadly-spin  ${className}`.trim(), style: containerStyle, role: "status", "aria-label": ariaLabel, "aria-live": "polite", "aria-busy": loading, "data-testid": dataTestId, ...restProps },
        React.createElement("div", { style: spinnerStyle, "data-testid": dataTestId ? `${dataTestId}-spinner` : undefined }),
        showText && (React.createElement("div", { className: "react-loadly-text", id: `${idRef.current}-text`, "aria-live": "polite" }, loadingText)),
        React.createElement("span", { className: "react-loadly-sr-only" }, ariaLabel)));
};

const defaultProps$1 = {
    speed: 1,
    loading: true,
    charDelay: 100,
    "aria-label": "Loading...",
    loop: true,
};
const TypingLoader = (userProps) => {
    const props = mergeProps(defaultProps$1, userProps);
    const { loadingText, speed = 1, loading, charDelay = 100, loop, className = "", style = {}, color = "var(--react-loadly-text-color)", fontFamily, fontWeight = 500, "aria-label": ariaLabel, "data-testid": dataTestId, showText, fullscreen, screenWidth, screenHeight, loaderCenter, screenBackground, ...restProps } = props;
    const [displayText, setDisplayText] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const timeoutRef = useRef(null);
    useEffect(() => {
        // Clear any existing timeout
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
        }
        if (!loading || !loadingText) {
            setDisplayText("");
            return;
        }
        setIsTyping(true);
        setDisplayText("");
        const typeText = (index = 0) => {
            if (index < loadingText.length) {
                setDisplayText(loadingText.substring(0, index + 1));
                timeoutRef.current = setTimeout(() => typeText(index + 1), charDelay / speed);
            }
            else if (loop) {
                // Reset and start over if looping
                timeoutRef.current = setTimeout(() => {
                    setDisplayText("");
                    typeText(0);
                }, charDelay * 2);
            }
            else {
                setIsTyping(false);
            }
        };
        typeText(0);
        // Cleanup timeouts on unmount or when dependencies change
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, [loading, loadingText, charDelay, speed, loop]);
    if (!loading)
        return null;
    const containerStyle = {
        display: "inline-flex",
        flexDirection: "column",
        alignItems: "center",
        ...style,
        ...(fullscreen && {
            position: "fixed",
            top: 0,
            left: 0,
            width: screenWidth || "100vw",
            height: screenHeight || "100vh",
            backgroundColor: screenBackground || "var(--react-loadly-background)",
            zIndex: 9999,
            justifyContent: loaderCenter ? "center" : style.justifyContent,
        }),
    };
    const textStyle = {
        color,
        fontFamily,
        fontWeight,
        fontSize: "1.2em",
        whiteSpace: "pre",
    };
    return (React.createElement("div", { className: `react-loadly react-loadly-typing  ${className}`.trim(), style: containerStyle, role: "status", "aria-label": ariaLabel, "aria-live": "polite", "aria-busy": loading, "data-testid": dataTestId, ...restProps },
        React.createElement("div", { style: textStyle, "data-testid": dataTestId ? `${dataTestId}-text` : undefined },
            displayText,
            React.createElement("span", { className: "react-loadly-typing-cursor", style: {
                    display: isTyping ? "inline-block" : "none",
                    animation: `react-loadly-blink ${1 / speed}s step-end infinite`,
                    marginLeft: "2px",
                    verticalAlign: "baseline",
                } }, "|")),
        showText && (React.createElement("div", { className: "react-loadly-text", "aria-live": "polite" }, loadingText)),
        React.createElement("span", { className: "react-loadly-sr-only" }, ariaLabel)));
};

const defaultProps = {
    size: 40,
    color: "var(--react-loadly-color)",
    speed: 1,
    loading: true,
    count: 5,
    "aria-label": "Loading...",
};
const WaveLoader = (userProps) => {
    const props = mergeProps(defaultProps, userProps);
    const { size, color, secondaryColor, speed, loading, count, className = "", style = {}, showText, loadingText = "Loading...", "aria-label": ariaLabel, "data-testid": dataTestId, fullscreen, screenWidth, screenHeight, loaderCenter, screenBackground, ...restProps } = props;
    const id = useMemo(() => generateId("wave-loader"), []);
    const lineSpecs = useMemo(() => {
        const sizeNum = typeof size === "number" ? size : parseInt(getSizeValue(size));
        return {
            width: Math.max(sizeNum / 10, 3), // Line thickness
            height: sizeNum, // Line height
            spacing: Math.max(sizeNum / 8, 4), // Spacing between lines
        };
    }, [size]);
    if (!loading)
        return null;
    const containerStyle = {
        display: "inline-flex",
        flexDirection: "column",
        alignItems: "center",
        ...style,
        ...(fullscreen && {
            position: "fixed",
            top: 0,
            left: 0,
            width: screenWidth || "100vw",
            height: screenHeight || "100vh",
            backgroundColor: screenBackground || "var(--react-loadly-background)",
            zIndex: 9999,
            justifyContent: loaderCenter ? "center" : style.justifyContent,
        }),
    };
    return (React.createElement("div", { className: `react-loadly react-loadly-wave  ${className}`.trim(), style: containerStyle, role: "status", "aria-label": ariaLabel, "aria-live": "polite", "aria-busy": loading, "data-testid": dataTestId, ...restProps },
        React.createElement(LineGroup, { count: count, lineWidth: lineSpecs.width, lineHeight: lineSpecs.height, color: color, secondaryColor: secondaryColor, speed: speed, arrangement: "staggered", orientation: "vertical", animationType: "wave", spacing: lineSpecs.spacing, "data-testid": dataTestId ? `${dataTestId}-lines` : undefined }),
        showText && (React.createElement("div", { className: "react-loadly-text", id: `${id}-text`, "aria-live": "polite" }, loadingText)),
        React.createElement("span", { className: "react-loadly-sr-only" }, ariaLabel)));
};

/**
 * Custom React hook for managing loader state with advanced features
 * Provides centralized loading state management with timeout, retry, and progress tracking
 *
 * @param options - Configuration options for the loader state
 * @returns Object containing state and methods to control the loader
 */
const useLoaderState = (options = {}) => {
    const { initialLoading = false, timeout, maxRetries = 3, onLoadingChange, onError, onProgress } = options;
    const [state, setState] = useState({
        isLoading: initialLoading,
        progress: 0,
        error: null,
        retryCount: 0,
    });
    const timeoutRef = useRef(null);
    const retryTimeoutRef = useRef(null);
    // Clear timeouts on unmount
    useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
            if (retryTimeoutRef.current) {
                clearTimeout(retryTimeoutRef.current);
            }
        };
    }, []);
    // Handle timeout
    useEffect(() => {
        if (state.isLoading && timeout) {
            timeoutRef.current = setTimeout(() => {
                setState((prev) => ({
                    ...prev,
                    isLoading: false,
                    error: "Loading timeout exceeded",
                }));
                onError?.("Loading timeout exceeded");
            }, timeout);
        }
        else if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, [state.isLoading, timeout, onError]);
    // Call onLoadingChange when loading state changes
    useEffect(() => {
        onLoadingChange?.(state.isLoading);
    }, [state.isLoading, onLoadingChange]);
    // Call onProgress when progress changes
    useEffect(() => {
        if (state.progress !== undefined) {
            onProgress?.(state.progress);
        }
    }, [state.progress, onProgress]);
    const setLoading = useCallback((loading) => {
        setState((prev) => ({
            ...prev,
            isLoading: loading,
            error: loading ? null : prev.error, // Clear error when starting new loading
            progress: loading ? 0 : prev.progress, // Reset progress when starting
        }));
    }, []);
    const setProgress = useCallback((progress) => {
        const clampedProgress = Math.min(Math.max(progress, 0), 100);
        setState((prev) => ({
            ...prev,
            progress: clampedProgress,
            // Auto-complete when progress reaches 100%
            isLoading: clampedProgress >= 100 ? false : prev.isLoading,
        }));
    }, []);
    const setError = useCallback((error) => {
        setState((prev) => ({
            ...prev,
            error,
            isLoading: false,
        }));
        if (error) {
            onError?.(error);
        }
    }, [onError]);
    const retry = useCallback(() => {
        setState((prev) => {
            const newRetryCount = (prev.retryCount || 0) + 1;
            if (newRetryCount > maxRetries) {
                onError?.("Maximum retry attempts exceeded");
                return {
                    ...prev,
                    error: "Maximum retry attempts exceeded",
                    isLoading: false,
                };
            }
            return {
                ...prev,
                retryCount: newRetryCount,
                isLoading: true,
                error: null,
                progress: 0,
            };
        });
        // Add exponential backoff for retries
        const backoffDelay = Math.min(1000 * Math.pow(2, state.retryCount || 0), 30000);
        retryTimeoutRef.current = setTimeout(() => {
            setState((prev) => ({ ...prev, isLoading: true }));
        }, backoffDelay);
    }, [state.retryCount, maxRetries, onError]);
    const reset = useCallback(() => {
        setState({
            isLoading: false,
            progress: 0,
            error: null,
            retryCount: 0,
        });
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        if (retryTimeoutRef.current) {
            clearTimeout(retryTimeoutRef.current);
        }
    }, []);
    return {
        state,
        setLoading,
        setProgress,
        setError,
        retry,
        reset,
    };
};

/**
 * Hook for managing multiple loader states with shared options
 * Useful when you need to control multiple loaders with the same configuration
 *
 * @param keys - Array of string keys representing each loader state
 * @param options - Shared configuration options for all loader states
 * @returns Record mapping each key to its corresponding loader state methods
 */
const useMultipleLoaderStates = (keys, options = {}) => {
    return keys.reduce((acc, key) => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        acc[key] = useLoaderState(options);
        return acc;
    }, {});
};

/**
 * Hook for tracking async operations with automatic loading state management
 * Automatically handles loading states during async operations and provides error handling
 *
 * @param asyncFn - Async function to execute and track
 * @param dependencies - Dependency array to trigger re-execution (similar to useEffect)
 * @param options - Configuration options for the loader state
 * @returns Object containing loader state, data result, and execution method
 */
const useAsyncLoader = (asyncFn, dependencies = [], options = {}) => {
    const loaderState = useLoaderState(options);
    const [data, setData] = useState(null);
    const execute = useCallback(async () => {
        try {
            loaderState.setLoading(true);
            loaderState.setError(null);
            const result = await asyncFn();
            setData(result);
            loaderState.setProgress(100);
            return result;
        }
        catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
            loaderState.setError(errorMessage);
            return null;
        }
    }, [asyncFn, loaderState]);
    // Auto-execute on dependency changes
    useEffect(() => {
        execute();
    }, dependencies);
    return {
        ...loaderState,
        data,
        execute,
    };
};

export { BarsLoader, BlobLoader, BounceLoader, Circle, Dot, DotCluster, DotsLoader, ElementLoader, FallbackLoader, FlowLoader, GridLoader, Line, LineGroup, LiquidLoader, LogoSpinLoader, PulseLoader, Rectangle, RingLoader, RotateLoader, ShapeGroup, SpinLoader, TypingLoader, WaveLoader, clamp, createAnimationName, generateCSSVariables, generateId, getAnimationDuration, getOptimizedAnimationSettings, getSizeValue, hexToRgb, mergeProps, prefersReducedMotion, rgba, sanitizeCSSValue, useAsyncLoader, useLoaderState, useMultipleLoaderStates };
//# sourceMappingURL=index.esm.js.map
