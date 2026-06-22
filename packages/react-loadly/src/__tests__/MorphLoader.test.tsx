import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MorphLoader } from "../components/organisms/MorphLoader";

describe("MorphLoader", () => {
  beforeEach(() => {
    // Reset all mocks before each test
    jest.clearAllMocks();
  });

  it("renders correctly with default props", () => {
    render(<MorphLoader />);

    // Check if the loader is in the document
    expect(screen.getByRole("status")).toBeInTheDocument();

    // Check if SVG is rendered
    expect(screen.getByTestId("morph-loader-svg")).toBeInTheDocument();

    // Check if aria-label is set
    expect(screen.getByRole("status")).toHaveAttribute("aria-label", "Loading...");
  });

  it("does not render when loading is false", () => {
    render(<MorphLoader loading={false} />);

    // Should not find the loader
    expect(screen.queryByRole("status")).not.toBeInTheDocument();
  });

  it("renders with custom size and color", () => {
    render(<MorphLoader size={50} color="#ff0000" />);

    const svg = screen.getByTestId("morph-loader-svg");
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveStyle("width: 50px");
  });

  it("renders different variants", () => {
    const { rerender } = render(<MorphLoader variant="blob" />);
    expect(screen.getByTestId("morph-loader-svg")).toBeInTheDocument();

    rerender(<MorphLoader variant="soft" />);
    expect(screen.getByTestId("morph-loader-svg")).toBeInTheDocument();

    rerender(<MorphLoader variant="sharp" />);
    expect(screen.getByTestId("morph-loader-svg")).toBeInTheDocument();
  });

  it("shows loading text when showText is true", () => {
    render(<MorphLoader showText={true} loadingText="Custom loading text" />);

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

    render(<MorphLoader />);

    const shape = screen.getByTestId("morph-loader-shape");
    expect(shape).toBeInTheDocument();
  });

  it("applies custom className", () => {
    render(<MorphLoader className="custom-class" />);

    expect(screen.getByRole("status")).toHaveClass("custom-class");
  });

  it("passes data-testid to elements", () => {
    render(<MorphLoader data-testid="test-loader" />);

    expect(screen.getByTestId("test-loader")).toBeInTheDocument();
    expect(screen.getByTestId("test-loader-svg")).toBeInTheDocument();
    expect(screen.getByTestId("test-loader-shape")).toBeInTheDocument();
  });
});
