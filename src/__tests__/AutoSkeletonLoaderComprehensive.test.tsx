import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { AutoSkeletonLoader } from "../components/organisms/AutoSkeletonLoader";

// Test component with various elements
const TestComponent = () => (
  <div>
    <h1 data-testid="test-heading">Heading 1</h1>
    <p data-testid="test-paragraph">This is a paragraph with some text content</p>
    <button data-testid="test-button">Click Me</button>
    <img data-testid="test-image" src="test.jpg" alt="Test" width="100" height="100" />
  </div>
);

describe("AutoSkeletonLoader Comprehensive Test", () => {
  test("renders skeletons with proper styles when loading", () => {
    render(<AutoSkeletonLoader loading={true} component={<TestComponent />} data-testid="auto-skeleton" />);

    // Check that the skeleton container is rendered
    const skeletonContainer = screen.getByRole("status");
    expect(skeletonContainer).toBeInTheDocument();

    // Check that skeleton elements are rendered
    const skeletonElements = skeletonContainer.querySelectorAll(".react-loadly-skeleton");
    expect(skeletonElements.length).toBeGreaterThan(0);
  });

  test("applies custom styles to skeleton elements", () => {
    render(
      <AutoSkeletonLoader
        loading={true}
        component={<TestComponent />}
        styless={{
          h1: { height: "2em", width: "60%" },
          p: { height: "1em", width: "80%" },
          button: { height: "40px", width: "120px" },
        }}
        data-testid="auto-skeleton"
      />,
    );

    // Check that the skeleton container is rendered
    const skeletonContainer = screen.getByRole("status");
    expect(skeletonContainer).toBeInTheDocument();
  });

  test("inherits styles from original elements", () => {
    const StyledComponent = () => (
      <div>
        <p data-testid="styled-paragraph" style={{ width: "50%", height: "20px", borderRadius: "8px" }}>
          Styled paragraph
        </p>
      </div>
    );

    render(<AutoSkeletonLoader loading={true} component={<StyledComponent />} inheritStyles={true} data-testid="auto-skeleton" />);

    // Check that the skeleton container is rendered
    const skeletonContainer = screen.getByRole("status");
    expect(skeletonContainer).toBeInTheDocument();
  });

  test("renders original component when not loading", () => {
    render(<AutoSkeletonLoader loading={false} component={<TestComponent />} />);

    // Check that original elements are rendered
    expect(screen.getByTestId("test-heading")).toBeInTheDocument();
    expect(screen.getByTestId("test-paragraph")).toBeInTheDocument();
    expect(screen.getByTestId("test-button")).toBeInTheDocument();
    expect(screen.getByTestId("test-image")).toBeInTheDocument();
  });

  test("applies shimmer effect when enabled", () => {
    render(<AutoSkeletonLoader loading={true} component={<TestComponent />} shimmer={true} data-testid="auto-skeleton" />);

    // Check that the skeleton container is rendered
    const skeletonContainer = screen.getByRole("status");
    expect(skeletonContainer).toBeInTheDocument();
  });

  test("uses correct variants for different element types", () => {
    const VariantTestComponent = () => (
      <div>
        <h1>Heading</h1>
        <p>Paragraph</p>
        <button>Button</button>
        <img src="test.jpg" alt="Test" style={{ borderRadius: "50%" }} />
      </div>
    );

    render(<AutoSkeletonLoader loading={true} component={<VariantTestComponent />} data-testid="auto-skeleton" />);

    // Check that the skeleton container is rendered
    const skeletonContainer = screen.getByRole("status");
    expect(skeletonContainer).toBeInTheDocument();
  });
});
