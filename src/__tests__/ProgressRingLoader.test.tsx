import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { ProgressRingLoader } from "../components/organisms/ProgressRingLoader";

describe("ProgressRingLoader", () => {
  beforeEach(() => {
    // Reset all mocks before each test
    jest.clearAllMocks();
  });

  it("renders correctly with default props", () => {
    render(<ProgressRingLoader />);

    // Check if the loader is in the document
    expect(screen.getByRole("status")).toBeInTheDocument();

    // Check if SVG is rendered
    expect(screen.getByTestId("progress-ring-loader-svg")).toBeInTheDocument();

    // Check if aria-label is set
    expect(screen.getByRole("status")).toHaveAttribute("aria-label", "Loading...");
  });

  it("does not render when loading is false", () => {
    render(<ProgressRingLoader loading={false} />);

    // Should not find the loader
    expect(screen.queryByRole("status")).not.toBeInTheDocument();
  });

  it("renders with custom size and color", () => {
    render(<ProgressRingLoader size={50} color="#ff0000" />);

    const svg = screen.getByTestId("progress-ring-loader-svg");
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveStyle("width: 50px");
  });

  it("renders with determinate progress", () => {
    render(<ProgressRingLoader progress={75} />);

    const loader = screen.getByRole("status");
    expect(loader).toHaveAttribute("aria-valuemin", "0");
    expect(loader).toHaveAttribute("aria-valuemax", "100");
    expect(loader).toHaveAttribute("aria-valuenow", "75");
  });

  it("renders with indeterminate progress", () => {
    render(<ProgressRingLoader progress={null} />);

    const loader = screen.getByRole("status");
    expect(loader).not.toHaveAttribute("aria-valuemin");
    expect(loader).not.toHaveAttribute("aria-valuemax");
    expect(loader).not.toHaveAttribute("aria-valuenow");
  });

  it("shows loading text when showText is true", () => {
    render(<ProgressRingLoader showText={true} loadingText="Custom loading text" />);

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

    render(<ProgressRingLoader />);

    const progressCircle = screen.getByTestId("progress-ring-loader-progress-circle");
    expect(progressCircle).toBeInTheDocument();
  });

  it("applies custom className", () => {
    render(<ProgressRingLoader className="custom-class" />);

    expect(screen.getByRole("status")).toHaveClass("custom-class");
  });

  it("passes data-testid to elements", () => {
    render(<ProgressRingLoader data-testid="test-loader" />);

    expect(screen.getByTestId("test-loader")).toBeInTheDocument();
    expect(screen.getByTestId("test-loader-svg")).toBeInTheDocument();
    expect(screen.getByTestId("test-loader-background-circle")).toBeInTheDocument();
    expect(screen.getByTestId("test-loader-progress-circle")).toBeInTheDocument();
  });
});
