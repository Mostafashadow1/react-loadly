import { ITextLoaderProps } from "@/@types";
import { mergeProps } from "@/utils";
import { classNameGen } from "@/utils/classNameGen";
import React, { type CSSProperties, FC, useEffect, useRef, useState } from "react";

const defaultProps: Partial<ITextLoaderProps> = {
  speed: 1,
  loading: true,
  charDelay: 100,
  "aria-label": "Loading...",
  loop: true,
};

export const TypingLoader: FC<ITextLoaderProps> = (userProps) => {
  const props = mergeProps(defaultProps, userProps);
  const {
    loadingText,
    speed = 1,
    loading,
    charDelay = 100,
    loop,
    className = "",
    style = {},
    color = "var(--react-loadly-text-color)",
    fontFamily,
    fontWeight = 500,
    "aria-label": ariaLabel,
    "data-testid": dataTestId,
    showText,
    fullscreen,
    screenWidth,
    screenHeight,
    loaderCenter,
    screenBackground,
    size = 18,
    ...restProps
  } = props;

  const [displayText, setDisplayText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

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

    const typeText = (index: number = 0) => {
      if (index < loadingText.length) {
        setDisplayText(loadingText.substring(0, index + 1));
        timeoutRef.current = setTimeout(() => typeText(index + 1), charDelay / speed);
      } else if (loop) {
        // Reset and start over if looping
        timeoutRef.current = setTimeout(() => {
          setDisplayText("");
          typeText(0);
        }, charDelay * 2);
      } else {
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

  if (!loading) return null;

  const containerStyle: CSSProperties = {
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

  const textStyle: CSSProperties = {
    color,
    fontFamily,
    fontWeight,
    fontSize: size,
    whiteSpace: "pre",
  };

  return (
    <div
      className={classNameGen("react-loadly react-loadly-typing", className)}
      style={containerStyle}
      role="status"
      aria-label={ariaLabel}
      aria-live="polite"
      aria-busy={loading}
      data-testid={dataTestId}
      {...restProps}
    >
      <div style={textStyle} data-testid={dataTestId ? `${dataTestId}-text` : undefined}>
        {displayText}
        <span
          className="react-loadly-typing-cursor"
          style={{
            display: isTyping ? "inline-block" : "none",
            animation: `react-loadly-blink ${1 / speed}s step-end infinite`,
            marginLeft: "2px",
            verticalAlign: "baseline",
          }}
        >
          |
        </span>
      </div>
      {showText && (
        <div className="react-loadly-text" aria-live="polite">
          {loadingText}
        </div>
      )}
      <span className="react-loadly-sr-only">{ariaLabel}</span>
    </div>
  );
};
