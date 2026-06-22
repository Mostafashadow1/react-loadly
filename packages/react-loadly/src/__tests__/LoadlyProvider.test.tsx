import React from "react";
import { render, screen } from "@testing-library/react";
import { LoadlyProvider, useLoadly } from "../components/atoms/LoadlyProvider";

const TestComponent = () => {
  const context = useLoadly();
  return (
    <div data-testid="context-value">
      {JSON.stringify(context)}
    </div>
  );
};

describe("LoadlyProvider", () => {
  test("provides context defaults to children", () => {
    const defaults = { color: "#ff0000", speed: 2 };
    render(
      <LoadlyProvider defaults={defaults}>
        <TestComponent />
      </LoadlyProvider>
    );

    const contextEl = screen.getByTestId("context-value");
    expect(contextEl).toBeInTheDocument();
    expect(contextEl.textContent).toContain("#ff0000");
    expect(contextEl.textContent).toContain("speed\":2");
  });

  test("injects dark mode theme styles when theme is dark", () => {
    const { container } = render(
      <LoadlyProvider theme="dark">
        <div>Child</div>
      </LoadlyProvider>
    );

    const themeContainer = container.firstChild as HTMLElement;
    expect(themeContainer).toHaveStyle("--react-loadly-color: #818cf8");
  });

  test("does not crash without theme or defaults", () => {
    render(
      <LoadlyProvider>
        <TestComponent />
      </LoadlyProvider>
    );

    expect(screen.getByTestId("context-value")).toBeInTheDocument();
  });
});
