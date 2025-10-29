import React, { useState } from "react";
import { SnakeLoader } from "@/components/organisms";

export const SnakeExample = () => {
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(6);

  return (
    <div style={{ padding: "40px" }}>
      <h2 style={{ marginBottom: "20px" }}>Snake Loader Examples</h2>

      <div style={{ marginBottom: "30px" }}>
        <button onClick={() => setLoading(!loading)}>{loading ? "Stop Loading" : "Start Loading"}</button>
      </div>

      {/* Basic Snake Loader */}
      <div style={{ marginBottom: "40px" }}>
        <h3>Basic Snake Loader</h3>
        <SnakeLoader loading={loading} size={60} />
      </div>

      {/* Snake with Text */}
      <div style={{ marginBottom: "40px" }}>
        <h3>Snake with Text</h3>
        <SnakeLoader loading={loading} size={60} showText loadingText="Slithering..." />
      </div>

      {/* Custom Count */}
      <div style={{ marginBottom: "40px" }}>
        <h3>Custom Segment Count</h3>
        <div style={{ marginBottom: "10px" }}>
          <label>
            Count: <input type="number" value={count} onChange={(e) => setCount(parseInt(e.target.value) || 6)} min="4" max="10" />
          </label>
        </div>
        <SnakeLoader loading={loading} size={60} count={count} />
      </div>

      {/* Secondary Color */}
      <div style={{ marginBottom: "40px" }}>
        <h3>With Secondary Color</h3>
        <SnakeLoader loading={loading} size={60} color="#3b82f6" secondaryColor="#10b981" count={count} />
      </div>

      {/* Different Sizes */}
      <div style={{ marginBottom: "40px" }}>
        <h3>Different Sizes</h3>
        <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
          <SnakeLoader loading={loading} size={40} color="#ef4444" secondaryColor="#f59e0b" />
          <SnakeLoader loading={loading} size={70} />
          <SnakeLoader loading={loading} size={100} />
        </div>
      </div>

      {/* Custom Speed */}
      <div style={{ marginBottom: "40px" }}>
        <h3>Different Speeds</h3>
        <div style={{ display: "flex", gap: "30px", alignItems: "center" }}>
          <div>
            <p>Slow (0.5x)</p>
            <SnakeLoader loading={loading} size={60} speed={0.5} />
          </div>
          <div>
            <p>Normal (1x)</p>
            <SnakeLoader loading={loading} size={60} speed={1} />
          </div>
          <div>
            <p>Fast (2x)</p>
            <SnakeLoader loading={loading} size={60} speed={2} />
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
        {loading && <SnakeLoader loading={true} size={80} fullscreen loaderCenter screenBackground="rgba(0,0,0,0.85)" />}
      </div>
    </div>
  );
};
