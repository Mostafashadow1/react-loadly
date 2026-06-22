import React from "react";
import { render, screen, act } from "@testing-library/react";
import { useSkeletonState } from "../hooks/useSkeletonState";

describe("useSkeletonState", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  const TestComponent = ({ mockFetch, minDisplayTime }: { mockFetch: any; minDisplayTime: number }) => {
    const { loading, data, error, retry } = useSkeletonState({ fetch: mockFetch, minDisplayTime });
    return (
      <div data-testid="hook-state">
        <div data-testid="loading">{String(loading)}</div>
        <div data-testid="data">{data ? String(data.name || data) : ""}</div>
        <div data-testid="error">{error ? error.message : ""}</div>
        <button data-testid="retry-btn" onClick={retry}>Retry</button>
      </div>
    );
  };

  test("manages loading state and fetches data successfully", async () => {
    const mockData = { id: 1, name: "Test" };
    const mockFetch = jest.fn().mockResolvedValue(mockData);

    render(<TestComponent mockFetch={mockFetch} minDisplayTime={200} />);

    // Initial state
    expect(screen.getByTestId("loading").textContent).toBe("true");
    expect(screen.getByTestId("data").textContent).toBe("");
    expect(screen.getByTestId("error").textContent).toBe("");

    // Fast-forward fetch resolution
    await act(async () => {
      jest.advanceTimersByTime(200);
    });

    expect(screen.getByTestId("loading").textContent).toBe("false");
    expect(screen.getByTestId("data").textContent).toBe("Test");
    expect(screen.getByTestId("error").textContent).toBe("");
  });

  test("stabilizes loading time based on minDisplayTime", async () => {
    const mockFetch = jest.fn().mockResolvedValue("done");

    render(<TestComponent mockFetch={mockFetch} minDisplayTime={500} />);

    expect(screen.getByTestId("loading").textContent).toBe("true");

    // After 100ms, data isn't loaded yet even if promise resolves
    await act(async () => {
      jest.advanceTimersByTime(100);
    });
    expect(screen.getByTestId("loading").textContent).toBe("true");

    // Wait until full minDisplayTime has passed
    await act(async () => {
      jest.advanceTimersByTime(400);
    });
    expect(screen.getByTestId("loading").textContent).toBe("false");
    expect(screen.getByTestId("data").textContent).toBe("done");
  });

  test("handles error state correctly", async () => {
    const mockError = new Error("Failed to fetch");
    const mockFetch = jest.fn().mockRejectedValue(mockError);

    render(<TestComponent mockFetch={mockFetch} minDisplayTime={100} />);

    expect(screen.getByTestId("loading").textContent).toBe("true");

    await act(async () => {
      jest.advanceTimersByTime(100);
    });

    expect(screen.getByTestId("loading").textContent).toBe("false");
    expect(screen.getByTestId("data").textContent).toBe("");
    expect(screen.getByTestId("error").textContent).toBe("Failed to fetch");
  });
});
