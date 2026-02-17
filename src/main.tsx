import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/base.css";
import { BarsExample } from "./examples/BarsExample";
import { BounceExample } from "./examples/BounceExample";
import { DotsExample } from "./examples/DotsExample";
import { ElementExample } from "./examples/ElementExample";
import { ProgressRingExample } from "./examples/ProgressRingExample";
import { RotateExample } from "./examples/RotateExample";
import { AutoSkeletonExample } from "./examples/AutoSkeletonExample";
import { AutoSkeletonAPIExample } from "./examples/AutoSkeletonAPIExample";
import { SquaresExample } from "./examples/SquaresExample";
import { RippleExample } from "./examples/RippleExample";
import { StairExample } from "./examples/StairExample";
import { OrbitExample } from "./examples/OrbitExample";
import { PlaneExample } from "./examples/PlaneExample";
import { HashtagExample } from "./examples/HashtagExample";
import { SnakeExample } from "./examples/SnakeExample";
import { AutoSkeletonV2Example } from "./examples/AutoSkeletonV2Example";
// Navigation Component
const Navigation = () => {
  const [activeTab, setActiveTab] = React.useState("auto-skeleton-v2");

  const tabs = [
    { id: "auto-skeleton-v2", label: "🎉 Auto Skeleton v2.4.0" },
    { id: "auto-skeleton", label: "Auto Skeleton" },
    { id: "auto-skeleton-api", label: "Auto Skeleton API" },
    { id: "bars", label: "Bars Loader" },
    { id: "bounce", label: "Bounce Loader" },
    { id: "dots", label: "Dots Loader" },
    { id: "element", label: "Element Loader" },
    { id: "progress-ring", label: "Progress Ring" },
    { id: "rotate", label: "Rotate Loader" },
    { id: "squares", label: "Squares Loader" },
    { id: "ripple", label: "Ripple Loader" },
    { id: "stair", label: "Stair Loader" },
    { id: "orbit", label: "Orbit Loader" },
    { id: "plane", label: "Plane Loader" },
    { id: "hashtag", label: "Hashtag Loader" },
    { id: "flower", label: "Flower Loader" },
    { id: "snake", label: "Snake Loader" },
  ];

  return (
    <div>
      <nav
        style={{
          position: "sticky",
          top: 0,
          zIndex: 100,
          backgroundColor: "white",
          borderBottom: "2px solid #e5e7eb",
          padding: "0 20px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            maxWidth: "1400px",
            margin: "0 auto",
          }}
        >
          <h1 style={{ fontSize: "24px", fontWeight: "bold", margin: "0" }}>React Loadly Examples</h1>
          <div style={{ display: "flex", gap: "10px" }}>
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  padding: "10px 15px",
                  border: "none",
                  backgroundColor: activeTab === tab.id ? "#3b82f6" : "transparent",
                  color: activeTab === tab.id ? "white" : "#6b7280",
                  cursor: "pointer",
                  borderRadius: "6px",
                  fontWeight: activeTab === tab.id ? "bold" : "normal",
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
        {activeTab === "auto-skeleton-v2" && <AutoSkeletonV2Example />}
        {activeTab === "auto-skeleton" && <AutoSkeletonExample />}
        {activeTab === "auto-skeleton-api" && <AutoSkeletonAPIExample />}
        {activeTab === "bars" && <BarsExample />}
        {activeTab === "bounce" && <BounceExample />}
        {activeTab === "dots" && <DotsExample />}
        {activeTab === "element" && <ElementExample />}
        {activeTab === "progress-ring" && <ProgressRingExample />}
        {activeTab === "rotate" && <RotateExample />}
        {activeTab === "squares" && <SquaresExample />}
        {activeTab === "ripple" && <RippleExample />}
        {activeTab === "stair" && <StairExample />}
        {activeTab === "orbit" && <OrbitExample />}
        {activeTab === "plane" && <PlaneExample />}
        {activeTab === "hashtag" && <HashtagExample />}
        {activeTab === "snake" && <SnakeExample />}
      </div>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
  <React.StrictMode>
    <Navigation />
  </React.StrictMode>,
);
