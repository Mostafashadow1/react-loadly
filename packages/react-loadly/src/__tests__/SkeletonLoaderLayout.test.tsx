import React from "react";
import { renderToStaticMarkup } from "react-dom/server.node";
import { SkeletonGroupLoader } from "../components/organisms/SkeletonGroupLoader";
import { SkeletonPatternLoader } from "../components/organisms/SkeletonPatternLoader";

const getTagByTestId = (markup: string, testId: string): string => {
  const match = markup.match(new RegExp(`<div[^>]*data-testid="${testId}"[^>]*>`));

  if (!match) {
    throw new Error(`Unable to find test id "${testId}" in markup: ${markup}`);
  }

  return match[0];
};

const getStyleByTestId = (markup: string, testId: string): string => {
  const tag = getTagByTestId(markup, testId);
  const style = tag.match(/style="([^"]*)"/)?.[1];

  if (!style) {
    throw new Error(`Unable to find style for test id "${testId}" in markup: ${markup}`);
  }

  return style;
};

describe("SkeletonPatternLoader layout sizing", () => {
  test("renders fixed width and height", () => {
    const markup = renderToStaticMarkup(<SkeletonPatternLoader width={200} height={40} data-testid="fixed" />);

    expect(getStyleByTestId(markup, "fixed")).toContain("width:200px");
    expect(getStyleByTestId(markup, "fixed-skeleton")).toContain("width:200px");
    expect(getStyleByTestId(markup, "fixed-skeleton")).toContain("height:40px");
  });

  test("renders percentage width on the container and skeleton", () => {
    const markup = renderToStaticMarkup(<SkeletonPatternLoader width="100%" height={40} data-testid="full" />);

    expect(getStyleByTestId(markup, "full")).toContain("width:100%");
    expect(getStyleByTestId(markup, "full-skeleton")).toContain("width:100%");
    expect(getStyleByTestId(markup, "full-skeleton")).toContain("height:40px");
  });

  test("preserves text variant width for a single line", () => {
    const markup = renderToStaticMarkup(
      <SkeletonPatternLoader variant="text" width="62%" height={18} data-testid="text" />
    );

    expect(getStyleByTestId(markup, "text")).toContain("width:62%");
    expect(getStyleByTestId(markup, "text-skeleton-0")).toContain("width:62%");
    expect(getStyleByTestId(markup, "text-skeleton-0")).toContain("height:18px");
  });

  test("preserves line variant width for a single line", () => {
    const markup = renderToStaticMarkup(
      <SkeletonPatternLoader variant="line" width="70%" height={16} data-testid="line" />
    );

    expect(getStyleByTestId(markup, "line")).toContain("width:70%");
    expect(getStyleByTestId(markup, "line-skeleton-0")).toContain("width:70%");
    expect(getStyleByTestId(markup, "line-skeleton-0")).toContain("height:16px");
  });

  test("uses card defaults when size is not explicitly provided", () => {
    const markup = renderToStaticMarkup(<SkeletonPatternLoader variant="card" data-testid="card" />);
    const style = getStyleByTestId(markup, "card-skeleton");

    expect(style).toContain("width:300px");
    expect(style).toContain("height:200px");
  });

  test("respects full-width card sizing", () => {
    const markup = renderToStaticMarkup(
      <SkeletonPatternLoader variant="card" width="100%" height={180} data-testid="card-full" />
    );

    expect(getStyleByTestId(markup, "card-full")).toContain("width:100%");
    expect(getStyleByTestId(markup, "card-full-skeleton")).toContain("width:100%");
    expect(getStyleByTestId(markup, "card-full-skeleton")).toContain("height:180px");
  });

  test("preserves percentage widths inside SkeletonGroupLoader", () => {
    const markup = renderToStaticMarkup(
      <SkeletonGroupLoader>
        <SkeletonPatternLoader width="100%" height={40} data-testid="group-full" />
        <SkeletonPatternLoader variant="text" width="60%" height={18} data-testid="group-text" />
      </SkeletonGroupLoader>
    );

    expect(getStyleByTestId(markup, "group-full")).toContain("width:100%");
    expect(getStyleByTestId(markup, "group-full-skeleton")).toContain("width:100%");
    expect(getStyleByTestId(markup, "group-text")).toContain("width:60%");
    expect(getStyleByTestId(markup, "group-text-skeleton-0")).toContain("width:60%");
  });
});
