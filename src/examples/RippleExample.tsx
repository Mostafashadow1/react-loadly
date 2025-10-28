import React, { useState } from "react";
import { RippleLoader } from "@/components/organisms";

export const RippleExample = () => {
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(3);

  return (
    <div style={{ padding: "40px" }}>
      <h2 style={{ marginBottom: "20px" }}>Ripple Loader Examples</h2>

      <div style={{ marginBottom: "30px" }}>
        <button onClick={() => setLoading(!loading)}>{loading ? "Stop Loading" : "Start Loading"}</button>
      </div>

      {/* Basic Ripple Loader */}
      <div style={{ marginBottom: "40px" }}>
        <h3>Basic Ripple Loader</h3>
        <RippleLoader loading={loading} size={50} />
      </div>

      {/* Ripple with Text */}
      <div style={{ marginBottom: "40px" }}>
        <h3>Ripple with Text</h3>
        <RippleLoader loading={loading} size={50} showText loadingText="Loading content..." />
      </div>

      {/* Custom Count */}
      <div style={{ marginBottom: "40px" }}>
        <h3>Custom Ripple Count</h3>
        <div style={{ marginBottom: "10px" }}>
          <label>
            Count: <input type="number" value={count} onChange={(e) => setCount(parseInt(e.target.value) || 3)} min="2" max="5" />
          </label>
        </div>
        <RippleLoader loading={loading} size={50} count={count} />
      </div>

      {/* Secondary Color */}
      <div style={{ marginBottom: "40px" }}>
        <h3>With Secondary Color</h3>
        <RippleLoader loading={loading} size={50} color="#3b82f6" secondaryColor="#8b5cf6" count={count} />
      </div>

      {/* Different Sizes */}
      <div style={{ marginBottom: "40px" }}>
        <h3>Different Sizes</h3>
        <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
          <RippleLoader loading={loading} size={35} color="#ef4444" secondaryColor="#8b5cf6" />
          <RippleLoader loading={loading} size={60} />
          <RippleLoader loading={loading} size={80} />
        </div>
      </div>

      {/* Custom Speed */}
      <div style={{ marginBottom: "40px" }}>
        <h3>Different Speeds</h3>
        <div style={{ display: "flex", gap: "30px", alignItems: "center" }}>
          <div>
            <p>Slow (0.5x)</p>
            <RippleLoader loading={loading} size={50} speed={0.5} />
          </div>
          <div>
            <p>Normal (1x)</p>
            <RippleLoader loading={loading} size={50} speed={1} />
          </div>
          <div>
            <p>Fast (2x)</p>
            <RippleLoader loading={loading} size={50} speed={2} />
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
        {loading && <RippleLoader loading={true} size={60} fullscreen loaderCenter screenBackground="rgba(0,0,0,0.85)" />}
      </div>
    </div>
  );
};
