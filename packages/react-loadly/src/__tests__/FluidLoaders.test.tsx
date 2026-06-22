import React from "react";
import { render, screen } from "@testing-library/react";
import { LiquidLoader, FlowLoader, BlobLoader } from "../components/organisms";

describe("Fluid Loaders", () => {
  describe("LiquidLoader", () => {
    it("renders with default props", () => {
      render(<LiquidLoader data-testid="liquid-loader" />);

      const loader = screen.getByTestId("liquid-loader");
      expect(loader).toBeInTheDocument();
      expect(loader).toHaveAttribute("role", "status");
      expect(loader).toHaveAttribute("aria-busy", "true");
    });

    it("does not render when loading is false", () => {
      render(<LiquidLoader loading={false} data-testid="liquid-loader" />);

      const loader = screen.queryByTestId("liquid-loader");
      expect(loader).not.toBeInTheDocument();
    });

    it("renders with custom props", () => {
      render(
        <LiquidLoader
          size={80}
          color="#00ff00"
          showText
          loadingText="Flowing..."
          data-testid="liquid-loader"
        />
      );

      const loader = screen.getByTestId("liquid-loader");
      expect(loader).toBeInTheDocument();

      const text = screen.getByText("Flowing...");
      expect(text).toBeInTheDocument();
    });
  });

  describe("FlowLoader", () => {
    it("renders with default props", () => {
      render(<FlowLoader data-testid="flow-loader" />);

      const loader = screen.getByTestId("flow-loader");
      expect(loader).toBeInTheDocument();
    });

    it("creates correct number of particles", () => {
      render(<FlowLoader size={60} data-testid="flow-loader" />);

      const loader = screen.getByTestId("flow-loader");
      expect(loader).toBeInTheDocument();

      // Should have at least 3 particles
      const particles = screen.getAllByTestId(/flow-loader-particle-/);
      expect(particles.length).toBeGreaterThanOrEqual(3);
    });

    it("renders correctly with small size", () => {
      render(<FlowLoader size={20} data-testid="flow-loader-small" />);

      const loader = screen.getByTestId("flow-loader-small");
      expect(loader).toBeInTheDocument();

      // Should still have particles even with small size
      const particles = screen.getAllByTestId(/flow-loader-small-particle-/);
      expect(particles.length).toBeGreaterThanOrEqual(3);
    });
  });

  describe("BlobLoader", () => {
    it("renders with default props", () => {
      render(<BlobLoader data-testid="blob-loader" />);

      const loader = screen.getByTestId("blob-loader");
      expect(loader).toBeInTheDocument();
    });

    it("renders blob with correct structure", () => {
      render(<BlobLoader data-testid="blob-loader" />);

      const blob = screen.getByTestId("blob-loader-blob");
      expect(blob).toBeInTheDocument();
    });
  });
});
