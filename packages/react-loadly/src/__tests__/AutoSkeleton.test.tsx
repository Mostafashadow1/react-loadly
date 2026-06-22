import React from "react";
import { render, screen } from "@testing-library/react";
import { AutoSkeletonLoader } from "../components/organisms/AutoSkeletonLoader";

// Mock component for testing
const TestComponent = () => (
  <div>
    <h1 data-testid="test-heading">Title</h1>
    <p data-testid="test-paragraph">This is a paragraph</p>
    <img 
      data-testid="test-image" 
      src="test.jpg" 
      alt="Test" 
      width="100" 
      height="100" 
    />
    <button data-testid="test-button">Click me</button>
  </div>
);

describe("AutoSkeletonLoader", () => {
  test("renders skeleton when loading is true", () => {
    render(
      <AutoSkeletonLoader
        loading={true}
        component={<TestComponent />}
        data-testid="auto-skeleton"
      />
    );

    // Check that skeleton elements are rendered
    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  test("renders original component when loading is false", () => {
    render(
      <AutoSkeletonLoader
        loading={false}
        component={<TestComponent />}
      />
    );

    // Check that original elements are rendered
    expect(screen.getByTestId("test-heading")).toBeInTheDocument();
    expect(screen.getByTestId("test-paragraph")).toBeInTheDocument();
    expect(screen.getByTestId("test-image")).toBeInTheDocument();
    expect(screen.getByTestId("test-button")).toBeInTheDocument();
  });

  test("applies custom styless", () => {
    render(
      <AutoSkeletonLoader
        loading={true}
        component={<TestComponent />}
        styless={{
          h1: { height: "2em", width: "60%" },
          p: { height: "1em", width: "80%" }
        }}
        data-testid="auto-skeleton"
      />
    );

    // Check that the skeleton container is rendered
    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  test("inherits styles when inheritStyles is true", () => {
    const StyledComponent = () => (
      <div>
        <p 
          data-testid="styled-paragraph"
          style={{ width: "50%", height: "20px", borderRadius: "8px" }}
        >
          Styled paragraph
        </p>
      </div>
    );

    render(
      <AutoSkeletonLoader
        loading={true}
        component={<StyledComponent />}
        inheritStyles={true}
        data-testid="auto-skeleton"
      />
    );

    // Check that the skeleton container is rendered
    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  test("shows shimmer effect when enabled", () => {
    render(
      <AutoSkeletonLoader
        loading={true}
        component={<TestComponent />}
        shimmer={true}
        data-testid="auto-skeleton"
      />
    );

    // Check that the skeleton container is rendered
    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  test("applies custom className and style", () => {
    const customStyle = { marginTop: "20px" };
    render(
      <AutoSkeletonLoader
        loading={true}
        component={<TestComponent />}
        className="custom-auto-skeleton"
        style={customStyle}
        data-testid="auto-skeleton"
      />
    );

    const loader = screen.getByRole("status");
    expect(loader).toHaveClass("custom-auto-skeleton");
    expect(loader).toHaveStyle("margin-top: 20px");
  });

  test("applies custom aria-label", () => {
    const customLabel = "Custom loading label";
    render(
      <AutoSkeletonLoader
        loading={true}
        component={<TestComponent />}
        aria-label={customLabel}
        data-testid="auto-skeleton"
      />
    );
    
    expect(screen.getByLabelText(customLabel)).toBeInTheDocument();
  });
});