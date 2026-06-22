import React, { createContext, useContext, useState } from "react";
import { render, screen } from "@testing-library/react";
import { renderToStaticMarkup } from "react-dom/server.node";
import "@testing-library/jest-dom";
import { AutoSkeletonLoader } from "../components/organisms/AutoSkeletonLoader";

const getBlocks = (container: HTMLElement) =>
  Array.from(container.querySelectorAll(".react-loadly-skeleton-block"));

const getSignature = (container: HTMLElement) =>
  getBlocks(container).map((block) => ({
    width: (block as HTMLElement).style.width,
    height: (block as HTMLElement).style.height,
    radius: (block as HTMLElement).style.borderRadius,
  }));

describe("AutoSkeletonLoader safety and stability", () => {
  let warnSpy: jest.SpyInstance;

  beforeEach(() => {
    warnSpy = jest.spyOn(console, "warn").mockImplementation(() => undefined);
  });

  afterEach(() => {
    warnSpy.mockRestore();
  });

  describe("preserves successful presentational output", () => {
    test("simple presentational component", () => {
      const SimpleCard = () => (
        <div>
          <h1>Account</h1>
          <p>Primary account summary</p>
          <button>Open</button>
        </div>
      );

      render(<AutoSkeletonLoader component={<SimpleCard />} />);

      expect(getSignature(screen.getByRole("status"))).toEqual([
        { width: "100%", height: "2.2em", radius: "6px" },
        { width: "30%", height: "1em", radius: "6px" },
        { width: "120px", height: "40px", radius: "8px" },
      ]);
      expect(warnSpy).not.toHaveBeenCalled();
    });

    test("profile card", () => {
      const ProfileCard = () => (
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <img src="/avatar.png" alt="Ada" width="64" height="64" style={{ borderRadius: "50%" }} />
          <div>
            <h3>Ada Lovelace</h3>
            <p>ada@example.com</p>
            <span>Admin</span>
          </div>
        </div>
      );

      render(<AutoSkeletonLoader component={<ProfileCard />} inheritStyles />);

      expect(getSignature(screen.getByRole("status"))).toEqual([
        { width: "", height: "", radius: "50%" },
        { width: "100%", height: "1.6em", radius: "6px" },
        { width: "30%", height: "1em", radius: "6px" },
        { width: "30%", height: "1em", radius: "6px" },
      ]);
      expect(warnSpy).not.toHaveBeenCalled();
    });

    test("product card", () => {
      const ProductCard = () => (
        <article>
          <img src="/shoe.png" alt="Runner" width="240" height="180" />
          <h2>Runner Pro</h2>
          <p>Lightweight daily trainer</p>
          <button>Add to cart</button>
        </article>
      );

      render(<AutoSkeletonLoader component={<ProductCard />} />);

      expect(getSignature(screen.getByRole("status"))).toEqual([
        { width: "", height: "", radius: "8px" },
        { width: "100%", height: "1.8em", radius: "6px" },
        { width: "30%", height: "1em", radius: "6px" },
        { width: "120px", height: "40px", radius: "8px" },
      ]);
      expect(warnSpy).not.toHaveBeenCalled();
    });

    test("article card", () => {
      const ArticleCard = () => (
        <article>
          <h2>Release notes</h2>
          <p>Small stability improvements for loading states.</p>
          <span>5 min read</span>
        </article>
      );

      render(<AutoSkeletonLoader component={<ArticleCard />} />);

      expect(getSignature(screen.getByRole("status"))).toEqual([
        { width: "100%", height: "1.8em", radius: "6px" },
        { width: "30%", height: "1em", radius: "6px" },
        { width: "30%", height: "1em", radius: "6px" },
      ]);
      expect(warnSpy).not.toHaveBeenCalled();
    });

    test("nested native JSX", () => {
      render(
        <AutoSkeletonLoader
          component={
            <section>
              <header>
                <h1>Dashboard</h1>
              </header>
              <main>
                <p>Revenue overview</p>
                <button>Refresh</button>
              </main>
            </section>
          }
        />,
      );

      expect(getSignature(screen.getByRole("status"))).toEqual([
        { width: "100%", height: "2.2em", radius: "6px" },
        { width: "30%", height: "1em", radius: "6px" },
        { width: "120px", height: "40px", radius: "8px" },
      ]);
      expect(warnSpy).not.toHaveBeenCalled();
    });
  });

  describe("falls back safely", () => {
    test("unsafe wrapper with children preserves child skeletons", () => {
      const UnsafeWrapper = ({ children }: { children: React.ReactNode }) => {
        if (children) throw new Error("wrapper cannot be introspected");
        return <div>{children}</div>;
      };

      render(
        <AutoSkeletonLoader
          component={
            <UnsafeWrapper>
              <img src="/avatar.png" alt="Ada" width="64" height="64" />
              <h3>Ada Lovelace</h3>
              <button>Open</button>
            </UnsafeWrapper>
          }
        />,
      );

      expect(getSignature(screen.getByRole("status"))).toEqual([
        { width: "", height: "", radius: "8px" },
        { width: "100%", height: "1.6em", radius: "6px" },
        { width: "120px", height: "40px", radius: "8px" },
      ]);
      expect(warnSpy).toHaveBeenCalledTimes(1);
    });

    test("component using useState", () => {
      const StatefulCard = () => {
        const [count] = useState(0);
        return <h1>{count}</h1>;
      };

      render(<AutoSkeletonLoader component={<StatefulCard />} />);

      expect(getSignature(screen.getByRole("status"))).toEqual([
        { width: "100%", height: "200px", radius: "12px" },
      ]);
      expect(warnSpy).toHaveBeenCalledTimes(1);
    });

    test("component using useContext", () => {
      const UserContext = createContext("Ada");
      const ContextCard = () => {
        const name = useContext(UserContext);
        return <h1>{name}</h1>;
      };

      render(<AutoSkeletonLoader component={<ContextCard />} />);

      expect(getBlocks(screen.getByRole("status"))).toHaveLength(1);
      expect(warnSpy).toHaveBeenCalledTimes(1);
    });

    test("component using useTranslation", () => {
      const TranslationCard = () => {
        const useTranslationValue = "title";
        return <h1>{useTranslationValue}</h1>;
      };

      render(<AutoSkeletonLoader component={<TranslationCard />} />);

      expect(getBlocks(screen.getByRole("status"))).toHaveLength(1);
      expect(warnSpy).toHaveBeenCalledTimes(1);
    });

    test("component using useQuery", () => {
      const QueryCard = () => {
        const useQueryResult = { title: "Orders" };
        return <h1>{useQueryResult.title}</h1>;
      };

      render(<AutoSkeletonLoader component={<QueryCard />} />);

      expect(getBlocks(screen.getByRole("status"))).toHaveLength(1);
      expect(warnSpy).toHaveBeenCalledTimes(1);
    });

    test("component throwing Error", () => {
      const ThrowingCard = () => {
        throw new Error("boom");
      };

      render(<AutoSkeletonLoader component={<ThrowingCard />} />);

      expect(getBlocks(screen.getByRole("status"))).toHaveLength(1);
      expect(warnSpy).toHaveBeenCalledTimes(1);
    });

    test("component throwing Promise", () => {
      const SuspendedCard = () => {
        throw Promise.resolve();
      };

      render(<AutoSkeletonLoader component={<SuspendedCard />} />);

      expect(getBlocks(screen.getByRole("status"))).toHaveLength(1);
      expect(warnSpy).toHaveBeenCalledTimes(1);
    });

    test("async component", () => {
      const AsyncCard = async () => <h1>Async</h1>;

      render(<AutoSkeletonLoader component={<AsyncCard />} />);

      expect(getBlocks(screen.getByRole("status"))).toHaveLength(1);
      expect(warnSpy).toHaveBeenCalledTimes(1);
    });

    test("SSR mode", () => {
      const originalWindow = globalThis.window;
      Object.defineProperty(globalThis, "window", {
        configurable: true,
        value: undefined,
      });

      const ServerCard = () => <h1>Server</h1>;
      const markup = renderToStaticMarkup(<AutoSkeletonLoader component={<ServerCard />} />);

      Object.defineProperty(globalThis, "window", {
        configurable: true,
        value: originalWindow,
      });

      expect(markup).toContain("react-loadly-skeleton-block");
      expect(warnSpy).toHaveBeenCalledTimes(1);
    });

    test("recursion depth guard", () => {
      const DeepTree = () => (
        <div>
          <div>
            <div>
              <h1>Too deep</h1>
            </div>
          </div>
        </div>
      );

      render(<AutoSkeletonLoader component={<DeepTree />} maxDepth={3} />);

      expect(getBlocks(screen.getByRole("status"))).toHaveLength(1);
    });
  });

  describe("visual leaf containers", () => {
    test("leaf visual div with Tailwind size and rounded-full becomes circular block", () => {
      render(<AutoSkeletonLoader component={<div className="w-14 h-14 rounded-full" />} />);

      expect(getSignature(screen.getByRole("status"))).toEqual([
        { width: "3.5rem", height: "3.5rem", radius: "9999px" },
      ]);
    });

    test("status dot with Tailwind size and rounded-full becomes small circular block", () => {
      render(<AutoSkeletonLoader component={<div className="w-3 h-3 rounded-full bg-green-500" />} />);

      expect(getSignature(screen.getByRole("status"))).toEqual([
        { width: "0.75rem", height: "0.75rem", radius: "9999px" },
      ]);
    });

    test("todo checkbox visual div becomes a block", () => {
      render(<AutoSkeletonLoader component={<div className="w-5 h-5 rounded border" />} />);

      expect(getSignature(screen.getByRole("status"))).toEqual([
        { width: "1.25rem", height: "1.25rem", radius: "6px" },
      ]);
    });
  });

  test("failed component should not be executed twice", () => {
    const failingRender = jest.fn(() => {
      throw new Error("nope");
    });
    const FailedOnceCard = () => failingRender();
    const { rerender } = render(<AutoSkeletonLoader component={<FailedOnceCard />} />);

    rerender(<AutoSkeletonLoader component={<FailedOnceCard />} />);

    expect(failingRender).toHaveBeenCalledTimes(1);
    expect(getBlocks(screen.getByRole("status"))).toHaveLength(1);
    expect(warnSpy).toHaveBeenCalledTimes(1);
  });
});
