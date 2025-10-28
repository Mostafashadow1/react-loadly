import React, { useState } from "react";
import { StairLoader } from "@/components/organisms";

export const StairExample = () => {
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(5);

  return (
    <div style={{ padding: "40px" }}>
      <h2 style={{ marginBottom: "20px" }}>Stair Loader Examples</h2>

      <div style={{ marginBottom: "30px" }}>
        <button onClick={() => setLoading(!loading)}>{loading ? "Stop Loading" : "Start Loading"}</button>
      </div>

      {/* Basic Stair Loader */}
      <div style={{ marginBottom: "40px" }}>
        <h3>Basic Stair Loader</h3>
        <StairLoader loading={loading} size={35} />
      </div>

      {/* Stair with Text */}
      <div style={{ marginBottom: "40px" }}>
        <h3>Stair with Text</h3>
        <StairLoader loading={loading} size={35} showText loadingText="Building..." />
      </div>

      {/* Custom Count */}
      <div style={{ marginBottom: "40px" }}>
        <h3>Custom Stair Count</h3>
        <div style={{ marginBottom: "10px" }}>
          <label>
            Count: <input type="number" value={count} onChange={(e) => setCount(parseInt(e.target.value) || 5)} min="3" max="8" />
          </label>
        </div>
        <StairLoader loading={loading} size={35} count={count} />
      </div>

      {/* Secondary Color */}
      <div style={{ marginBottom: "40px" }}>
        <h3>With Secondary Color</h3>
        <StairLoader loading={loading} size={35} color="#3b82f6" secondaryColor="#8b5cf6" count={count} />
      </div>

      {/* Different Sizes */}
      <div style={{ marginBottom: "40px" }}>
        <h3>Different Sizes</h3>
        <div style={{ display: "flex", gap: "20px", alignItems: "flex-end" }}>
          <StairLoader loading={loading} size={25} color="#ef4444" secondaryColor="#8b5cf6" />
          <StairLoader loading={loading} size={45} />
          <StairLoader loading={loading} size={60} />
        </div>
      </div>

      {/* Custom Speed */}
      <div style={{ marginBottom: "40px" }}>
        <h3>Different Speeds</h3>
        <div style={{ display: "flex", gap: "30px", alignItems: "flex-end" }}>
          <div>
            <p>Slow (0.5x)</p>
            <StairLoader loading={loading} size={35} speed={0.5} />
          </div>
          <div>
            <p>Normal (1x)</p>
            <StairLoader loading={loading} size={35} speed={1} />
          </div>
          <div>
            <p>Fast (2x)</p>
            <StairLoader loading={loading} size={35} speed={2} />
          </div>
        </div>
      </div>

      {/* Fullscreen Mode */}
      <div style={{ marginBottom: "40px" }}>
        <h3>Fullscreen Mode</h3>
        <button
          onClick={() => {
            setLoading(true);
            setTimeout(() => setLoading(false), 3000);
          }}
        >
          Show Fullscreen Loader (3s)
        </button>
        {loading && <StairLoader loading={true} size={40} fullscreen loaderCenter screenBackground="rgba(0,0,0,0.85)" />}
      </div>
    </div>
  );
};
