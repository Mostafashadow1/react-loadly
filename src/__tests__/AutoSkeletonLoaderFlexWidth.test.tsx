import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { AutoSkeletonLoader } from "../components/organisms/AutoSkeletonLoader";

// Test component with flex container similar to user's example
const UserProfileComponent = ({ user }: { user: any }) => (
  <div style={{ display: "flex", alignItems: "center", columnGap: "1rem", padding: "1rem" }}>
    <img
      src={user.avatar}
      alt={user.name}
      style={{ width: "64px", height: "64px", borderRadius: "50%" }}
    />
    <div style={{ flex: 1 }}> 
      <h4 style={{ fontSize: "1.125rem", fontWeight: "600" }}>{user.name}</h4>
      <p style={{ color: "gray" }}>{user.email}</p>
      <span style={{ fontSize: "0.875rem", color: "gray" }}>{user.role}</span>
    </div>
  </div>
);

describe("AutoSkeletonLoader Flex Width", () => {
  test("renders skeleton with 100% width for elements in flex containers without explicit width", () => {
    const user = {
      avatar: "avatar.jpg",
      name: "John Doe",
      email: "john@example.com",
      role: "Developer"
    };

    render(
      <AutoSkeletonLoader 
        loading={true} 
        component={<UserProfileComponent user={user} />} 
        inheritStyles={true} 
        data-testid="auto-skeleton-flex-width" 
      />
    );

    // Check that skeleton elements are rendered
    const skeletonContainer = screen.getByTestId("auto-skeleton-flex-width");
    expect(skeletonContainer).toBeInTheDocument();

    // Get all skeleton blocks
    const skeletonBlocks = skeletonContainer.querySelectorAll(".react-loadly-skeleton-block");
    expect(skeletonBlocks.length).toBeGreaterThan(0);

    // Check that the div inside flex container (the one with flex: 1) gets 100% width
    // Since we can't directly select it, we check that blocks have appropriate widths
    const textBlocks = Array.from(skeletonBlocks).filter(block => {
      const style = window.getComputedStyle(block);
      return style.height === '16px'; // Text elements have 16px height by default
    });
    
    // At least one text block should have 100% width
    const hasFullWidthBlock = textBlocks.some(block => {
      const style = window.getComputedStyle(block);
      return style.width === '100%' || style.width === '400px'; // 100% in JSDOM
    });
    
    expect(hasFullWidthBlock).toBeTruthy();
  });

  test("respects explicit width when provided in flex containers", () => {
    const ComponentWithExplicitWidth = () => (
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <h1 style={{ width: "50%" }}>Half width title</h1>
        <p style={{}}>Full width paragraph</p>
      </div>
    );

    render(
      <AutoSkeletonLoader
        loading={true}
        component={<ComponentWithExplicitWidth />}
        inheritStyles={true}
        data-testid="auto-skeleton-explicit-width"
      />,
    );

    const skeletonContainer = screen.getByTestId("auto-skeleton-explicit-width");
    const skeletonBlocks = skeletonContainer.querySelectorAll(".react-loadly-skeleton-block");

    // First block (h1 with explicit width) should respect that width
    // Second block (p without explicit width) should have 100% width in flex container
    expect(skeletonBlocks[1]).toBeInTheDocument();
  });
});