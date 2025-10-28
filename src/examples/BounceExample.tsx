import React, { useState } from "react";
import { BounceLoader } from "@/components/organisms";

export const BounceExample = () => {
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(3);
  const size = 20;

  return (
    <div style={{ padding: "40px" }}>
      <h2 style={{ marginBottom: "20px" }}>Bounce Loader Examples</h2>

      <div style={{ marginBottom: "30px" }}>
        <button onClick={() => setLoading(!loading)}>{loading ? "Stop Loading" : "Start Loading"}</button>
      </div>

      {/* Basic Bounce Loader */}
      <div style={{ marginBottom: "40px" }}>
        <h3>Basic Bounce Loader</h3>
        <BounceLoader loading={loading} size={size} />
      </div>

      {/* Bounce with Text */}
      <div style={{ marginBottom: "40px" }}>
        <h3>Bounce with Text</h3>
        <BounceLoader loading={loading} size={size} showText loadingText="Bouncing..." />
      </div>

      {/* Custom Count */}
      <div style={{ marginBottom: "40px" }}>
        <h3>Custom Ball Count</h3>
        <div style={{ marginBottom: "10px" }}>
          <label>
            Count: <input type="number" value={count} onChange={(e) => setCount(parseInt(e.target.value) || 3)} min="1" max="10" />
          </label>
        </div>
        <BounceLoader loading={loading} size={size} count={count} />
      </div>

      {/* Secondary Color */}
      <div style={{ marginBottom: "40px" }}>
        <h3>With Secondary Color</h3>
        <BounceLoader loading={loading} size={size} color="#ef4444" secondaryColor="#3b82f6" count={count} />
      </div>

      {/* Different Sizes */}
      <div style={{ marginBottom: "40px" }}>
        <h3>Different Sizes</h3>
        <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
          <BounceLoader loading={loading} size={10} />
          <BounceLoader loading={loading} size={20} />
          <BounceLoader loading={loading} size={40} />
        </div>
      </div>

      {/* Custom Speed */}
      <div style={{ marginBottom: "40px" }}>
        <h3>Different Speeds</h3>
        <div style={{ display: "flex", gap: "30px", alignItems: "center" }}>
          <div>
            <p>Slow (0.5x)</p>
            <BounceLoader loading={loading} size={size} speed={0.5} />
          </div>
          <div>
            <p>Normal (1x)</p>
            <BounceLoader loading={loading} size={size} speed={1} />
          </div>
          <div>
            <p>Fast (2x)</p>
            <BounceLoader loading={loading} size={size} speed={2} />
          </div>
        </div>
      </div>

      {/* Different Colors */}
      <div style={{ marginBottom: "40px" }}>
        <h3>Different Colors</h3>
        <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
          <BounceLoader loading={loading} size={size} color="#ef4444" />
          <BounceLoader loading={loading} size={size} color="#3b82f6" />
          <BounceLoader loading={loading} size={size} color="#10b981" />
          <BounceLoader loading={loading} size={size} color="#f59e0b" />
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
      </div>
    </div>
  );
};
