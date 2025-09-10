import { render, screen } from "@testing-library/react";
import { Circle } from "../components/atoms/Circle";

describe("Circle Atom", () => {
  it("renders with default props", () => {
    render(<Circle data-testid="circle" />);

    const circle = screen.getByTestId("circle");
    expect(circle).toBeInTheDocument();
    expect(circle).toHaveClass("react-loadly-circle");
  });

  it("applies custom size and color", () => {
    render(<Circle size={30} color="#ff0000" data-testid="circle" />);

    const circle = screen.getByTestId("circle");
    expect(circle).toHaveStyle({
      width: "30px",
      height: "30px",
      backgroundColor: "#ff0000",
    });
  });

  it("renders with border when borderColor is provided", () => {
    render(<Circle borderColor="#00ff00" borderWidth={2} data-testid="circle" />);

    const circle = screen.getByTestId("circle");
    expect(circle).toHaveStyle({
      backgroundColor: "transparent",
      border: "2px solid #00ff00",
    });
  });
});
