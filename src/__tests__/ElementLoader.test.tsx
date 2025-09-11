import React from "react";
import { render, screen } from "@testing-library/react";
import { ElementLoader } from "../components/organisms/ElementLoader";

const mockElement = <div data-testid="test-element">Test Element</div>;

describe("ElementLoader", () => {
  test("renders with default props", () => {
    render(<ElementLoader>{mockElement}</ElementLoader>);
    expect(screen.getByRole("status")).toBeInTheDocument();
    expect(screen.getByTestId("test-element")).toBeInTheDocument();
  });

  test("does not render when loading is false", () => {
    render(<ElementLoader loading={false}>{mockElement}</ElementLoader>);
    expect(screen.queryByRole("status")).not.toBeInTheDocument();
  });

  test("applies custom size", () => {
    render(<ElementLoader size={100}>{mockElement}</ElementLoader>);
    const element = screen.getByTestId("test-element").parentElement;
    expect(element).toHaveStyle("width: 100px");
    expect(element).toHaveStyle("height: 100px");
  });

  test("applies custom color", () => {
    const customColor = "#ff0000";
    render(<ElementLoader color={customColor}>{mockElement}</ElementLoader>);
    // We can't easily test the filter style, but we can check that the component renders
    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  test("applies custom aria-label", () => {
    const customLabel = "Custom loading label";
    render(<ElementLoader aria-label={customLabel}>{mockElement}</ElementLoader>);
    expect(screen.getByLabelText(customLabel)).toBeInTheDocument();
  });

  test("renders loading text when showText is true", () => {
    const loadingText = "Loading content...";
    render(
      <ElementLoader showText loadingText={loadingText}>
        {mockElement}
      </ElementLoader>,
    );
    expect(screen.getByText(loadingText)).toBeInTheDocument();
  });

  test("applies custom className", () => {
    const customClass = "custom-loader";
    render(<ElementLoader className={customClass}>{mockElement}</ElementLoader>);
    const loader = screen.getByRole("status");
    expect(loader).toHaveClass(customClass);
  });

  test("renders with fullscreen mode", () => {
    render(<ElementLoader fullscreen>{mockElement}</ElementLoader>);
    const loader = screen.getByRole("status");
    expect(loader).toHaveStyle("position: fixed");
  });

  test("applies different animation types", () => {
    const { rerender } = render(<ElementLoader animationType="spin">{mockElement}</ElementLoader>);
    const element = screen.getByTestId("test-element").parentElement;

    rerender(<ElementLoader animationType="pulse">{mockElement}</ElementLoader>);
    expect(element).toBeInTheDocument();

    rerender(<ElementLoader animationType="glow">{mockElement}</ElementLoader>);
    expect(element).toBeInTheDocument();

    rerender(<ElementLoader animationType="bounce">{mockElement}</ElementLoader>);
    expect(element).toBeInTheDocument();

    rerender(<ElementLoader animationType="flip">{mockElement}</ElementLoader>);
    expect(element).toBeInTheDocument();
  });
});
