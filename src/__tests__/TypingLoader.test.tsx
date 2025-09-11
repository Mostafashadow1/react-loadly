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

  test("types text character by character", () => {
    render(<TypingLoader loadingText="Loading" charDelay={100} />);

    expect(screen.getByText("|")).toBeInTheDocument();
    expect(screen.queryByText("L")).not.toBeInTheDocument();

    // Advance timers to type first character
    jest.advanceTimersByTime(100);
    expect(screen.getByText("L|")).toBeInTheDocument();

    // Advance timers to type all characters
    jest.advanceTimersByTime(600);
    expect(screen.getByText("Loading|")).toBeInTheDocument();
  });

  test("loops typing animation when loop prop is true", () => {
    render(<TypingLoader loadingText="Loading" charDelay={100} loop={true} />);

    // Type all characters
    jest.advanceTimersByTime(700);
    expect(screen.getByText("Loading|")).toBeInTheDocument();

    // Wait for reset and type again (loop)
    jest.advanceTimersByTime(1000);
    expect(screen.getByText("|")).toBeInTheDocument();

    jest.advanceTimersByTime(100);
    expect(screen.getByText("L|")).toBeInTheDocument();
  });

  test("stops typing animation when loop prop is false", () => {
    render(<TypingLoader loadingText="Loading" charDelay={100} loop={false} />);

    // Type all characters
    jest.advanceTimersByTime(700);
    expect(screen.getByText("Loading|")).toBeInTheDocument();

    // Wait for reset - should not type again since loop is false
    jest.advanceTimersByTime(1000);
    expect(screen.getByText("Loading|")).toBeInTheDocument();
    expect(screen.queryByText("|")).not.toBeInTheDocument(); // Cursor should still be visible but not restarting
  });

  test("respects speed prop", () => {
    render(<TypingLoader loadingText="Loading" charDelay={100} speed={2} />);

    // With speed 2, it should type twice as fast
    jest.advanceTimersByTime(50);
    expect(screen.getByText("L|")).toBeInTheDocument();

    jest.advanceTimersByTime(300);
    expect(screen.getByText("Loading|")).toBeInTheDocument();
  });

  test("clears text when loading becomes false", () => {
    const { rerender } = render(<TypingLoader loadingText="Loading" loading={true} />);
    jest.advanceTimersByTime(700);
    expect(screen.getByText("Loading|")).toBeInTheDocument();

    rerender(<TypingLoader loadingText="Loading" loading={false} />);
    expect(screen.queryByText("Loading|")).not.toBeInTheDocument();
  });
});
