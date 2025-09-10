import { ITextLoaderProps } from "@/@types";
import { mergeProps } from "@/utils";
import { type CSSProperties, FC, useEffect, useRef, useState } from "react";

const defaultProps: Partial<ITextLoaderProps> = {
  text: "Loading...",
  speed: 1,
  loading: true,
  charDelay: 100,
  "aria-label": "Loading...",
};

export const TypingLoader: FC<ITextLoaderProps> = (userProps) => {
  const props = mergeProps(defaultProps, userProps);
  const {
    text,
    speed,
    loading,
    charDelay,
    className = "",
    style = {},
    color = "var(--react-loadly-text-color)",
    fontFamily,
    fontWeight = 500,
    "aria-label": ariaLabel,
    "data-testid": dataTestId,
    ...restProps
  } = props;

  const [displayText, setDisplayText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    if (!loading || !text) {
      setDisplayText("");
      return;
    }

    setIsTyping(true);
    setDisplayText("");
    let currentIndex = 0;

    const typeChar = () => {
      if (currentIndex < text.length) {
        setDisplayText(text.slice(0, currentIndex + 1));
        currentIndex++;
        timeoutRef.current = setTimeout(typeChar, (charDelay ?? 100) / (speed ?? 1));
      } else {
        setIsTyping(false);
        // Reset and start over
        timeoutRef.current = setTimeout(() => {
          currentIndex = 0;
          setDisplayText("");
          if (loading) typeChar();
        }, 1000 / (speed ?? 1));
      }
    };

    typeChar();

    return () => {
      setIsTyping(false);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, [text, loading, charDelay, speed]);

  if (!loading) return null;

  const containerStyle: CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    fontFamily: fontFamily || "var(--react-loadly-font-family)",
    fontSize: "var(--react-loadly-font-size)",
    fontWeight,
    color,
    ...style,
  };

  const cursorStyle: CSSProperties = {
    marginLeft: "2px",
    animation: isTyping ? "none" : "react-loadly-fade 1s infinite",
    opacity: isTyping ? 1 : 0.5,
  };

  return (
    <div
      className={`react-loadly react-loadly-typing  ${className}`.trim()}
      style={containerStyle}
      role="status"
      aria-label={ariaLabel}
      aria-live="polite"
      aria-busy={loading}
      data-testid={dataTestId}
      {...restProps}
    >
      <span>{displayText}</span>
      <span style={cursorStyle}>|</span>
      <span className="react-loadly-sr-only">{ariaLabel}</span>
    </div>
  );
};
