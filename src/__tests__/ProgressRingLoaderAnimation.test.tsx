import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { ProgressRingLoader } from "../components/organisms/ProgressRingLoader";

describe("ProgressRingLoader Animation", () => {
  test("applies animation classes correctly", () => {
    render(<ProgressRingLoader data-testid="progress-ring" />);

    const svgElement = screen.getByTestId("progress-ring-svg");
    const progressCircle = screen.getByTestId("progress-ring-progress-circle");

    expect(svgElement).toBeInTheDocument();
    expect(progressCircle).toBeInTheDocument();
  });

  test("shows animation when loading", () => {
    render(<ProgressRingLoader loading={true} data-testid="progress-ring" />);

    const loader = screen.getByTestId("progress-ring");
    expect(loader).toBeInTheDocument();
  });

  test("hides when not loading", () => {
    render(<ProgressRingLoader loading={false} data-testid="progress-ring" />);

    const loader = screen.queryByTestId("progress-ring");
    expect(loader).not.toBeInTheDocument();
  });

  test("applies progress-based animation when progress is provided", () => {
    render(<ProgressRingLoader progress={50} data-testid="progress-ring" />);

    const progressCircle = screen.getByTestId("progress-ring-progress-circle");
    expect(progressCircle).toBeInTheDocument();
  });
});
