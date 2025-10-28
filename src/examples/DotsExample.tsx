import React, { useState } from "react";
import { DotsLoader } from "@/components/organisms";

export const DotsExample = () => {
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(3);
  const size = 12;

  return (
    <div style={{ padding: "40px" }}>
      <h2 style={{ marginBottom: "20px" }}>Dots Loader Examples</h2>

      <div style={{ marginBottom: "30px" }}>
        <button onClick={() => setLoading(!loading)}>{loading ? "Stop Loading" : "Start Loading"}</button>
      </div>

      {/* Basic Dots Loader */}
      <div style={{ marginBottom: "40px" }}>
        <h3>Basic Dots Loader</h3>
        <DotsLoader loading={loading} size={size} />
      </div>

      {/* Dots with Text */}
      <div style={{ marginBottom: "40px" }}>
        <h3>Dots with Text</h3>
        <DotsLoader loading={loading} size={size} showText loadingText="Loading..." />
      </div>

      {/* Custom Count */}
      <div style={{ marginBottom: "40px" }}>
        <h3>Custom Dots Count</h3>
        <div style={{ marginBottom: "10px" }}>
          <label>
            Count: <input type="number" value={count} onChange={(e) => setCount(parseInt(e.target.value) || 3)} min="1" max="10" />
          </label>
        </div>
        <DotsLoader loading={loading} size={size} count={count} />
      </div>

      {/* Secondary Color */}
      <div style={{ marginBottom: "40px" }}>
        <h3>With Secondary Color</h3>
        <DotsLoader loading={loading} size={size} color="#10b981" secondaryColor="#3b82f6" count={count} />
      </div>

      {/* Different Sizes */}
      <div style={{ marginBottom: "40px" }}>
        <h3>Different Sizes</h3>
        <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
          <DotsLoader loading={loading} size={8} />
          <DotsLoader loading={loading} size={12} />
          <DotsLoader loading={loading} size={20} />
        </div>
      </div>

      {/* Custom Speed */}
      <div style={{ marginBottom: "40px" }}>
        <h3>Different Speeds</h3>
        <div style={{ display: "flex", gap: "30px", alignItems: "center" }}>
          <div>
            <p>Slow (0.5x)</p>
            <DotsLoader loading={loading} size={size} speed={0.5} />
          </div>
          <div>
            <p>Normal (1x)</p>
            <DotsLoader loading={loading} size={size} speed={1} />
          </div>
          <div>
            <p>Fast (2x)</p>
            <DotsLoader loading={loading} size={size} speed={2} />
          </div>
        </div>
      </div>

      {/* Different Colors */}
      <div style={{ marginBottom: "40px" }}>
        <h3>Different Colors</h3>
        <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
          <DotsLoader loading={loading} size={size} color="#ef4444" />
          <DotsLoader loading={loading} size={size} color="#8b5cf6" />
          <DotsLoader loading={loading} size={size} color="#10b981" />
          <DotsLoader loading={loading} size={size} color="#f59e0b" />
        </div>
      </div>
    </div>
  );
};
