import React, { useState } from "react";
import { act, fireEvent, render, screen } from "@testing-library/react";
import { renderToStaticMarkup } from "react-dom/server.node";
import "@testing-library/jest-dom";
import { Skeletonize } from "../components/Skeletonize";
import { SkeletonGroupLoader } from "../components/SkeletonGroupLoader";
import * as root from "../index";
import * as skeletonEntry from "../skeleton";

const UserCard = ({ name }: { name: string }) => (
  <article data-testid="card">
    <img src="/avatar.png" alt={name} width={48} height={48} />
    <h3>{name}</h3>
    <p>Frontend engineer</p>
    <button type="button">Follow</button>
  </article>
);

const getRoot = (container: HTMLElement) => container.querySelector(".react-loadly-skeletonize") as HTMLElement;

describe("Skeletonize", () => {
  afterEach(() => {
    document.getElementById("react-loadly-skeletonize-styles")?.remove();
  });

  test("renders children normally when not loading", () => {
    const { container } = render(
      <Skeletonize loading={false}>
        <UserCard name="Ada" />
      </Skeletonize>,
    );
    const el = getRoot(container);

    expect(screen.getByText("Ada")).toBeVisible();
    expect(el).not.toHaveAttribute("data-loading");
    expect(el).not.toHaveAttribute("aria-busy");
    expect(el).not.toHaveAttribute("aria-hidden");
    expect(el).not.toHaveAttribute("inert");
    expect(screen.queryByRole("status")).not.toBeInTheDocument();
    expect(document.getElementById("react-loadly-skeletonize-styles")).toBeNull();
  });

  test("keeps the real markup and marks it as a skeleton while loading", () => {
    const { container } = render(
      <Skeletonize loading>
        <UserCard name="Placeholder name" />
      </Skeletonize>,
    );
    const el = getRoot(container);

    expect(el).toHaveAttribute("data-loading");
    expect(el).toHaveAttribute("data-animation", "shimmer");
    expect(el).toHaveAttribute("aria-busy", "true");
    expect(el).toHaveAttribute("aria-hidden", "true");
    expect(el).toHaveAttribute("inert");
    expect(el.querySelector("img")).toBeInTheDocument();
    expect(el.querySelector("h3")).toHaveTextContent("Placeholder name");
    expect(el.querySelector("button")).toBeInTheDocument();
  });

  test("announces loading to screen readers outside the hidden content", () => {
    const { container } = render(
      <Skeletonize loading loadingLabel="Loading profile">
        <UserCard name="Ada" />
      </Skeletonize>,
    );

    const status = screen.getByRole("status");
    expect(status).toHaveTextContent("Loading profile");
    expect(getRoot(container).contains(status)).toBe(false);
  });

  test("injects its stylesheet once for many instances", () => {
    render(
      <>
        <Skeletonize loading>
          <p>One</p>
        </Skeletonize>
        <Skeletonize loading>
          <p>Two</p>
        </Skeletonize>
      </>,
    );

    const styles = document.querySelectorAll("#react-loadly-skeletonize-styles");
    expect(styles).toHaveLength(1);
    expect(styles[0].textContent).toContain(".react-loadly-skeletonize[data-loading]");
    expect(styles[0].textContent).toContain("prefers-reduced-motion");
  });

  test("does not remount children when loading toggles", () => {
    const renders = jest.fn();
    const Counter = () => {
      const [count, setCount] = useState(0);
      renders();
      return (
        <button type="button" onClick={() => setCount((c) => c + 1)}>
          Count {count}
        </button>
      );
    };
    const Harness = () => {
      const [loading, setLoading] = useState(false);
      return (
        <>
          <button type="button" onClick={() => setLoading((l) => !l)}>
            toggle
          </button>
          <Skeletonize loading={loading}>
            <Counter />
          </Skeletonize>
        </>
      );
    };

    const { container } = render(<Harness />);
    fireEvent.click(screen.getByText("Count 0"));
    expect(screen.getByText("Count 1")).toBeInTheDocument();

    fireEvent.click(screen.getByText("toggle"));
    expect(getRoot(container)).toHaveAttribute("inert");
    expect(getRoot(container)).toHaveTextContent("Count 1");

    fireEvent.click(screen.getByText("toggle"));
    expect(getRoot(container)).not.toHaveAttribute("inert");
    expect(screen.getByText("Count 1")).toBeInTheDocument();
  });

  test("applies custom colors and speed as CSS variables", () => {
    const { container } = render(
      <Skeletonize loading baseColor="#111111" highlightColor="#222222" speed={2}>
        <p>Text</p>
      </Skeletonize>,
    );
    const el = getRoot(container);

    expect(el.style.getPropertyValue("--rl-skz-base")).toBe("#111111");
    expect(el.style.getPropertyValue("--rl-skz-highlight")).toBe("#222222");
    expect(el.style.getPropertyValue("--rl-skz-speed")).toBe("2s");
    expect(el.style.getPropertyValue("--rl-skz-angle")).toBe("90deg");
  });

  test("does not set skeleton variables when not loading", () => {
    const { container } = render(
      <Skeletonize loading={false} style={{ padding: 8 }}>
        <p>Text</p>
      </Skeletonize>,
    );
    const el = getRoot(container);

    expect(el.style.getPropertyValue("--rl-skz-base")).toBe("");
    expect(el.style.padding).toBe("8px");
  });

  test("inherits the theme from SkeletonGroupLoader", () => {
    const { container } = render(
      <SkeletonGroupLoader animation="pulse" baseColor="#abcdef" speed={3} direction="rtl">
        <Skeletonize loading>
          <p>Text</p>
        </Skeletonize>
      </SkeletonGroupLoader>,
    );
    const el = getRoot(container);

    expect(el).toHaveAttribute("data-animation", "pulse");
    expect(el.style.getPropertyValue("--rl-skz-base")).toBe("#abcdef");
    expect(el.style.getPropertyValue("--rl-skz-speed")).toBe("3s");
    expect(el.style.getPropertyValue("--rl-skz-angle")).toBe("270deg");
    expect(el.style.getPropertyValue("--rl-skz-direction")).toBe("reverse");
  });

  test("props override the group theme", () => {
    const { container } = render(
      <SkeletonGroupLoader animation="pulse" baseColor="#abcdef">
        <Skeletonize loading animation="none" baseColor="#000000">
          <p>Text</p>
        </Skeletonize>
      </SkeletonGroupLoader>,
    );
    const el = getRoot(container);

    expect(el).toHaveAttribute("data-animation", "none");
    expect(el.style.getPropertyValue("--rl-skz-base")).toBe("#000000");
  });

  test("supports the as prop, className and extra attributes", () => {
    const { container } = render(
      <ul>
        <Skeletonize loading as="li" className="row" data-testid="row" id="first">
          <span>Item</span>
        </Skeletonize>
      </ul>,
    );
    const el = screen.getByTestId("row");

    expect(el.tagName).toBe("LI");
    expect(el).toHaveClass("react-loadly-skeletonize", "row");
    expect(el).toHaveAttribute("id", "first");
    expect(container.querySelector("ul > li")).toBe(el);
  });

  test("blocks interaction with the placeholder content while loading", () => {
    const onClick = jest.fn();
    const { container } = render(
      <Skeletonize loading>
        <button type="button" onClick={onClick}>
          Buy
        </button>
      </Skeletonize>,
    );

    expect(getRoot(container)).toHaveAttribute("inert");
    expect(document.getElementById("react-loadly-skeletonize-styles")?.textContent).toContain("pointer-events: none");
  });

  test("works with components that use hooks, context and effects", () => {
    const NameContext = React.createContext("Ada");
    const effect = jest.fn();
    const Stateful = () => {
      const name = React.useContext(NameContext);
      const [title] = useState("Engineer");
      React.useEffect(() => {
        effect();
      }, []);
      return (
        <div>
          <h3>{name}</h3>
          <p>{title}</p>
        </div>
      );
    };

    render(
      <NameContext.Provider value="Grace">
        <Skeletonize loading>
          <Stateful />
        </Skeletonize>
      </NameContext.Provider>,
    );

    expect(screen.getByText("Grace")).toBeInTheDocument();
    expect(screen.getByText("Engineer")).toBeInTheDocument();
    expect(effect).toHaveBeenCalledTimes(1);
  });

  test("renders on the server without touching document", () => {
    const markup = renderToStaticMarkup(
      <Skeletonize loading loadingLabel="Loading card">
        <UserCard name="Ada" />
      </Skeletonize>,
    );

    expect(markup).toContain('role="status"');
    expect(markup).toContain("Loading card");
    expect(markup).toContain('class="react-loadly-skeletonize"');
    expect(markup).toContain("data-loading");
    expect(markup).toContain('aria-busy="true"');
    expect(markup).toContain('aria-hidden="true"');
    expect(markup).toContain("<h3>Ada</h3>");
  });

  test("server markup without loading is just the wrapper and children", () => {
    const markup = renderToStaticMarkup(
      <Skeletonize loading={false}>
        <p>Ready</p>
      </Skeletonize>,
    );

    expect(markup).toBe('<div class="react-loadly-skeletonize"><p>Ready</p></div>');
  });

  test("removes inert after loading finishes inside act", () => {
    const { container, rerender } = render(
      <Skeletonize loading>
        <p>Text</p>
      </Skeletonize>,
    );
    expect(getRoot(container)).toHaveAttribute("inert");

    act(() => {
      rerender(
        <Skeletonize loading={false}>
          <p>Text</p>
        </Skeletonize>,
      );
    });

    expect(getRoot(container)).not.toHaveAttribute("inert");
    expect(screen.queryByRole("status")).not.toBeInTheDocument();
  });

  test("is exported from the root and skeleton entry points", () => {
    expect(root.Skeletonize).toBe(Skeletonize);
    expect(skeletonEntry.Skeletonize).toBe(Skeletonize);
  });
});
