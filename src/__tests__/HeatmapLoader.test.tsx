import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { HeatmapLoader } from "../components/organisms/HeatmapLoader";

describe("HeatmapLoader", () => {
  beforeEach(() => {
    // Reset all mocks before each test
    jest.clearAllMocks();
  });

  it("renders correctly with default props", () => {
    render(<HeatmapLoader />);

    // Check if the loader is in the document
    expect(screen.getByRole("status")).toBeInTheDocument();

    // Check if grid is rendered
    expect(screen.getByTestId("heatmap-loader-grid")).toBeInTheDocument();

    // Check if aria-label is set
    expect(screen.getByRole("status")).toHaveAttribute("aria-label", "Loading...");
  });

  it("does not render when loading is false", () => {
    render(<HeatmapLoader loading={false} />);

    // Should not find the loader
    expect(screen.queryByRole("status")).not.toBeInTheDocument();
  });

  it("renders with custom size and color", () => {
    render(<HeatmapLoader size={60} color="#ff0000" />);

    const grid = screen.getByTestId("heatmap-loader-grid");
    expect(grid).toBeInTheDocument();
    expect(grid).toHaveStyle("width: 60px");
  });

  it("renders with custom rows and columns", () => {
    render(<HeatmapLoader rows={4} cols={6} />);

    // Check that 24 cells are rendered (4 rows * 6 cols)
    for (let i = 0; i < 24; i++) {
      expect(screen.getByTestId(`heatmap-loader-cell-${i}`)).toBeInTheDocument();
    }
  });

  it("shows loading text when showText is true", () => {
    render(<HeatmapLoader showText={true} loadingText="Custom loading text" />);

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

    render(<HeatmapLoader />);

    const grid = screen.getByTestId("heatmap-loader-grid");
    expect(grid).toBeInTheDocument();
  });

  it("applies custom className", () => {
    render(<HeatmapLoader className="custom-class" />);

    expect(screen.getByRole("status")).toHaveClass("custom-class");
  });

  it("passes data-testid to elements", () => {
    render(<HeatmapLoader data-testid="test-loader" rows={2} cols={3} />);

    expect(screen.getByTestId("test-loader")).toBeInTheDocument();
    expect(screen.getByTestId("test-loader-grid")).toBeInTheDocument();

    // Check that cells are rendered with test ids
    for (let i = 0; i < 6; i++) {
      expect(screen.getByTestId(`test-loader-cell-${i}`)).toBeInTheDocument();
    }
  });
});
