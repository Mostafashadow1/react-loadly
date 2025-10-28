import React, { useState } from "react";
import { SquaresLoader } from "@/components/organisms";

export const SquaresExample = () => {
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(4);

  return (
    <div style={{ padding: "40px" }}>
      <h2 style={{ marginBottom: "20px" }}>Squares Loader Examples</h2>

      <div style={{ marginBottom: "30px" }}>
        <button onClick={() => setLoading(!loading)}>{loading ? "Stop Loading" : "Start Loading"}</button>
      </div>

      {/* Basic Squares Loader */}
      <div style={{ marginBottom: "40px" }}>
        <h3>Basic Squares Loader</h3>
        <SquaresLoader loading={loading} size={40} />
      </div>

      {/* Squares with Text */}
      <div style={{ marginBottom: "40px" }}>
        <h3>Squares with Text</h3>
        <SquaresLoader loading={loading} size={40} showText loadingText="Processing..." />
      </div>

      {/* Custom Count */}
      <div style={{ marginBottom: "40px" }}>
        <h3>Custom Square Count</h3>
        <div style={{ marginBottom: "10px" }}>
          <label>
            Count: <input type="number" value={count} onChange={(e) => setCount(parseInt(e.target.value) || 4)} min="2" max="9" />
          </label>
        </div>
        <SquaresLoader loading={loading} size={40} count={count} />
      </div>

      {/* Secondary Color */}
      <div style={{ marginBottom: "40px" }}>
        <h3>With Secondary Color</h3>
        <SquaresLoader loading={loading} size={40} color="#3b82f6" secondaryColor="#8b5cf6" count={count} />
      </div>

      {/* Different Sizes */}
      <div style={{ marginBottom: "40px" }}>
        <h3>Different Sizes</h3>
        <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
          <SquaresLoader loading={loading} size={25} color="#ef4444" secondaryColor="#8b5cf6" />
          <SquaresLoader loading={loading} size={45} />
          <SquaresLoader loading={loading} size={65} />
        </div>
      </div>

      {/* Custom Speed */}
      <div style={{ marginBottom: "40px" }}>
        <h3>Different Speeds</h3>
        <div style={{ display: "flex", gap: "30px", alignItems: "center" }}>
          <div>
            <p>Slow (0.5x)</p>
            <SquaresLoader loading={loading} size={40} speed={0.5} />
          </div>
          <div>
            <p>Normal (1x)</p>
            <SquaresLoader loading={loading} size={40} speed={1} />
          </div>
          <div>
            <p>Fast (2x)</p>
            <SquaresLoader loading={loading} size={40} speed={2} />
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
        {loading && <SquaresLoader loading={true} size={40} fullscreen loaderCenter screenBackground="rgba(0,0,0,0.85)" />}
      </div>
    </div>
  );
};
