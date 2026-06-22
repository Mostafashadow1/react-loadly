import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import {
  CardFlipLoader,
  EqualizerLoader,
  GradientRingLoader,
  OrbitDotsLoader,
  SignalLoader,
} from "../components/organisms";

describe("new premium loaders", () => {
  const loaders = [
    { name: "GradientRingLoader", Component: GradientRingLoader, childTestId: "loader-ring" },
    { name: "SignalLoader", Component: SignalLoader, childTestId: "loader-bar-0" },
    { name: "CardFlipLoader", Component: CardFlipLoader, childTestId: "loader-card" },
    { name: "OrbitDotsLoader", Component: OrbitDotsLoader, childTestId: "loader-dot-0" },
    { name: "EqualizerLoader", Component: EqualizerLoader, childTestId: "loader-bar-0" },
  ];

  loaders.forEach(({ name, Component, childTestId }) => {
    test(`${name} renders`, () => {
      render(<Component data-testid="loader" />);
      expect(screen.getByRole("status")).toBeInTheDocument();
      expect(screen.getByTestId(childTestId)).toBeInTheDocument();
    });

    test(`${name} returns null when loading is false`, () => {
      const { container } = render(<Component loading={false} />);
      expect(container.firstChild).toBeNull();
    });

    test(`${name} accepts color, size, and aria-label`, () => {
      render(<Component data-testid="loader" color="#123456" size={64} aria-label={`${name} busy`} />);
      expect(screen.getByLabelText(`${name} busy`)).toBeInTheDocument();
    });
  });
});
