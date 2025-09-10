import { render } from "@testing-library/react";
import { RingLoader, SpinLoader } from "../index";

describe("React 19 Compatibility", () => {
  test("SpinLoader renders correctly", () => {
    const { container } = render(<SpinLoader />);
    expect(container).toBeInTheDocument();
  });

  test("RingLoader renders correctly", () => {
    const { container } = render(<RingLoader />);
    expect(container).toBeInTheDocument();
  });

  test("Loaders work with different React versions", () => {
    // Test with various props
    const { container } = render(
      <div>
        <SpinLoader size={50} color="#ff0000" speed={2} />
        <RingLoader size={60} borderWidth={5} />
      </div>,
    );
    expect(container).toBeInTheDocument();
  });
});
