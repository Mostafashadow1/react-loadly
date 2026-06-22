import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { TypingLoader } from "../components/organisms/TypingLoader";

describe("TypingLoader", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  test("renders with default props", () => {
    render(<TypingLoader loadingText="Loading" />);
    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  const getLoaderText = () => {
    const status = screen.getByRole("status");
    const textDiv = status.querySelector("div");
    return textDiv ? textDiv.textContent?.replace(/\s+/g, "").trim() || "" : "";
  };

  test("types text character by character", () => {
    render(<TypingLoader loadingText="Loading" charDelay={100} />);

    expect(getLoaderText()).toBe("|");

    // Advance timers to type first character
    jest.advanceTimersByTime(100);
    expect(getLoaderText()).toBe("L|");

    // Advance timers to type all characters
    jest.advanceTimersByTime(600);
    expect(getLoaderText()).toBe("Loading|");
  });

  test("loops typing animation when loop prop is true", () => {
    render(<TypingLoader loadingText="Loading" charDelay={100} loop={true} />);

    // Type all characters
    jest.advanceTimersByTime(700);
    expect(getLoaderText()).toBe("Loading|");

    // Wait for reset and type again (loop)
    jest.advanceTimersByTime(300);
    expect(getLoaderText()).toBe("|");

    jest.advanceTimersByTime(100);
    expect(getLoaderText()).toBe("L|");
  });

  test("stops typing animation when loop prop is false", () => {
    render(<TypingLoader loadingText="Loading" charDelay={100} loop={false} />);

    // Type all characters
    jest.advanceTimersByTime(700);
    expect(getLoaderText()).toBe("Loading|");

    // Wait for reset - should not type again since loop is false
    jest.advanceTimersByTime(1000);
    expect(getLoaderText()).toBe("Loading|");
    expect(getLoaderText()).not.toBe("|"); // Cursor should still be visible but not restarting
  });

  test("respects speed prop", () => {
    render(<TypingLoader loadingText="Loading" charDelay={100} speed={2} />);

    // With speed 2, it should type twice as fast
    jest.advanceTimersByTime(50);
    expect(getLoaderText()).toBe("L|");

    jest.advanceTimersByTime(300);
    expect(getLoaderText()).toBe("Loading|");
  });

  test("clears text when loading becomes false", () => {
    const { rerender } = render(<TypingLoader loadingText="Loading" loading={true} />);
    jest.advanceTimersByTime(700);
    expect(getLoaderText()).toBe("Loading|");

    rerender(<TypingLoader loadingText="Loading" loading={false} />);
    expect(screen.queryByRole("status")).not.toBeInTheDocument();
  });
});
