import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { SpinDotsLoader } from "../components/organisms/SpinDotsLoader";

describe("SpinDotsLoader", () => {
  beforeEach(() => {
    // Reset all mocks before each test
    jest.clearAllMocks();
  });

  it("renders correctly with default props", () => {
    render(<SpinDotsLoader />);

    // Check if the loader is in the document
    expect(screen.getByRole("status")).toBeInTheDocument();

    // Check if spinner is rendered
    expect(screen.getByTestId("spin-dots-loader-spinner")).toBeInTheDocument();

    // Check if aria-label is set
    expect(screen.getByRole("status")).toHaveAttribute("aria-label", "Loading...");
  });

  it("does not render when loading is false", () => {
    render(<SpinDotsLoader loading={false} />);

    // Should not find the loader
    expect(screen.queryByRole("status")).not.toBeInTheDocument();
  });

  it("renders with custom size and color", () => {
    render(<SpinDotsLoader size={50} color="#ff0000" />);

    const spinner = screen.getByTestId("spin-dots-loader-spinner");
    expect(spinner).toBeInTheDocument();
    expect(spinner).toHaveStyle("width: 50px");
  });

  it("renders with custom number of dots", () => {
    render(<SpinDotsLoader dots={5} />);

    // Check that 5 dots are rendered
    for (let i = 0; i < 5; i++) {
      expect(screen.getByTestId(`spin-dots-loader-dot-${i}`)).toBeInTheDocument();
    }
  });

  it("shows loading text when showText is true", () => {
    render(<SpinDotsLoader showText={true} loadingText="Custom loading text" />);

    expect(screen.getByText("Custom loading text")).toBeInTheDocument();
  });

  it("respects prefers-reduced-motion", () => {
    // Mock window.matchMedia to simulate prefers-reduced-motion
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches: query === "(prefers-reduced-motion: reduce)",
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });

    render(<SpinDotsLoader />);

    const spinner = screen.getByTestId("spin-dots-loader-spinner");
    expect(spinner).toBeInTheDocument();
  });

  it("applies custom className", () => {
    render(<SpinDotsLoader className="custom-class" />);

    expect(screen.getByRole("status")).toHaveClass("custom-class");
  });

  it("passes data-testid to elements", () => {
    render(<SpinDotsLoader data-testid="test-loader" dots={3} />);

    expect(screen.getByTestId("test-loader")).toBeInTheDocument();
    expect(screen.getByTestId("test-loader-spinner")).toBeInTheDocument();

    // Check that dots are rendered with test ids
    for (let i = 0; i < 3; i++) {
      expect(screen.getByTestId(`test-loader-dot-${i}`)).toBeInTheDocument();
    }
  });
});
