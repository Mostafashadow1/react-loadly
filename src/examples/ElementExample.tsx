import React, { useState } from "react";
import { ElementLoader } from "@/components/organisms";

export const ElementExample = () => {
  const [loading, setLoading] = useState(true);
  const [animationType, setAnimationType] = useState<"spin" | "pulse" | "glow" | "bounce" | "flip">("spin");
  const size = 60;

  return (
    <div style={{ padding: "40px" }}>
      <h2 style={{ marginBottom: "20px" }}>Element Loader Examples</h2>

      <div style={{ marginBottom: "30px" }}>
        <button onClick={() => setLoading(!loading)}>{loading ? "Stop Loading" : "Start Loading"}</button>
      </div>

      {/* Basic Element Loader */}
      <div style={{ marginBottom: "40px" }}>
        <h3>Basic Element dd</h3>
        <ElementLoader loading={loading} size={size}>
          <div
            style={{
              width: "100%",
              height: "100%",
              backgroundColor: "#3b82f6",
              borderRadius: "8px",
            }}
          >
            <span style={{ color: "white", display: "flex", alignItems: "center", justifyContent: "center", height: "100%" }}>LG</span>
          </div>
        </ElementLoader>
      </div>

      {/* Animation Types */}
      <div style={{ marginBottom: "40px" }}>
        <h3>Animation Types</h3>
        <div style={{ marginBottom: "10px" }}>
          <select value={animationType} onChange={(e) => setAnimationType(e.target.value as any)}>
            <option value="spin">Spin</option>
            <option value="pulse">Pulse</option>
            <option value="glow">Glow</option>
            <option value="bounce">Bounce</option>
            <option value="flip">Flip</option>
          </select>
        </div>
        <ElementLoader loading={loading} size={size} animationType={animationType}>
          <div
            style={{
              width: "100%",
              height: "100%",
              backgroundColor: "#10b981",
              borderRadius: "8px",
            }}
          >
            <span style={{ color: "white", display: "flex", alignItems: "center", justifyContent: "center", height: "100%" }}>
              {animationType.toUpperCase()}
            </span>
          </div>
        </ElementLoader>
      </div>

      {/* Custom Children */}
      <div style={{ marginBottom: "40px" }}>
        <h3>Custom Children - Logo</h3>
        <ElementLoader loading={loading} size={80} animationType="spin">
          <svg width="80" height="80" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="40" fill="#8b5cf6" />
            <text x="50" y="55" textAnchor="middle" fill="white" fontSize="24" fontWeight="bold">
              R
            </text>
          </svg>
        </ElementLoader>
      </div>

      {/* Icon Example */}
      <div style={{ marginBottom: "40px" }}>
        <h3>With Icon</h3>
        <ElementLoader loading={loading} size={size} animationType="pulse">
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "32px",
            }}
          >
            ⚡
          </div>
        </ElementLoader>
      </div>

      {/* Different Sizes */}
      <div style={{ marginBottom: "40px" }}>
        <h3>Different Sizes</h3>
        <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
          <ElementLoader loading={loading} size={40}>
            <div style={{ width: "100%", height: "100%", backgroundColor: "#ef4444", borderRadius: "50%" }} />
          </ElementLoader>
          <ElementLoader loading={loading} size={60}>
            <div style={{ width: "100%", height: "100%", backgroundColor: "#3b82f6", borderRadius: "50%" }} />
          </ElementLoader>
          <ElementLoader loading={loading} size={80}>
            <div style={{ width: "100%", height: "100%", backgroundColor: "#10b981", borderRadius: "50%" }} />
          </ElementLoader>
        </div>
      </div>

      {/* With Glow */}
      <div style={{ marginBottom: "40px" }}>
        <h3>With Glow Effect</h3>
        <ElementLoader loading={loading} size={size} animationType="spin" glowIntensity={0.6}>
          <div
            style={{
              width: "100%",
              height: "100%",
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              borderRadius: "8px",
              boxShadow: "0 4px 15px rgba(102, 126, 234, 0.4)",
            }}
          >
            <span style={{ color: "white", display: "flex", alignItems: "center", justifyContent: "center", height: "100%" }}>GLOW</span>
          </div>
        </ElementLoader>
      </div>

      {/* With Text */}
      <div style={{ marginBottom: "40px" }}>
        <h3>With Text</h3>
        <ElementLoader loading={loading} size={size} showText loadingText="Loading content...">
          <div
            style={{
              width: "100%",
              height: "100%",
              backgroundColor: "#f59e0b",
              borderRadius: "8px",
            }}
          >
            <span style={{ color: "white", display: "flex", alignItems: "center", justifyContent: "center", height: "100%" }}>TEXT</span>
          </div>
        </ElementLoader>
      </div>

      {/* Different Speeds */}
      <div style={{ marginBottom: "40px" }}>
        <h3>Different Speeds</h3>
        <div style={{ display: "flex", gap: "30px", alignItems: "center" }}>
          <div>
            <p>Slow (0.5x)</p>
            <ElementLoader loading={loading} size={size} speed={0.5}>
              <div style={{ width: "100%", height: "100%", backgroundColor: "#8b5cf6", borderRadius: "8px" }} />
            </ElementLoader>
          </div>
          <div>
            <p>Normal (1x)</p>
            <ElementLoader loading={loading} size={size} speed={1}>
              <div style={{ width: "100%", height: "100%", backgroundColor: "#8b5cf6", borderRadius: "8px" }} />
            </ElementLoader>
          </div>
          <div>
            <p>Fast (2x)</p>
            <ElementLoader loading={loading} size={size} speed={2}>
              <div style={{ width: "100%", height: "100%", backgroundColor: "#8b5cf6", borderRadius: "8px" }} />
            </ElementLoader>
          </div>
        </div>
      </div>
    </div>
  );
};
