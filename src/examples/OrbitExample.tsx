import React, { useState } from "react";
import { OrbitLoader } from "@/components/organisms";

export const OrbitExample = () => {
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(3);

  return (
    <div style={{ padding: "40px" }}>
      <h2 style={{ marginBottom: "20px" }}>Orbit Loader Examples</h2>

      <div style={{ marginBottom: "30px" }}>
        <button onClick={() => setLoading(!loading)}>{loading ? "Stop Loading" : "Start Loading"}</button>
      </div>

      {/* Basic Orbit Loader */}
      <div style={{ marginBottom: "40px" }}>
        <h3>Basic Orbit Loader</h3>
        <OrbitLoader loading={loading} size={60} />
      </div>

      {/* Orbit with Text */}
      <div style={{ marginBottom: "40px" }}>
        <h3>Orbit with Text</h3>
        <OrbitLoader loading={loading} size={60} showText loadingText="Orbiting..." />
      </div>

      {/* Custom Count */}
      <div style={{ marginBottom: "40px" }}>
        <h3>Custom Planet Count</h3>
        <div style={{ marginBottom: "10px" }}>
          <label>
            Count: <input type="number" value={count} onChange={(e) => setCount(parseInt(e.target.value) || 3)} min="2" max="5" />
          </label>
        </div>
        <OrbitLoader loading={loading} size={60} count={count} />
      </div>

      {/* Secondary Color */}
      <div style={{ marginBottom: "40px" }}>
        <h3>With Secondary Color</h3>
        <OrbitLoader loading={loading} size={60} color="#3b82f6" secondaryColor="#8b5cf6" count={count} />
      </div>

      {/* Different Sizes */}
      <div style={{ marginBottom: "40px" }}>
        <h3>Different Sizes</h3>
        <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
          <OrbitLoader loading={loading} size={40} color="#ef4444" secondaryColor="#8b5cf6" />
          <OrbitLoader loading={loading} size={70} />
          <OrbitLoader loading={loading} size={90} />
        </div>
      </div>

      {/* Custom Speed */}
      <div style={{ marginBottom: "40px" }}>
        <h3>Different Speeds</h3>
        <div style={{ display: "flex", gap: "30px", alignItems: "center" }}>
          <div>
            <p>Slow (0.5x)</p>
            <OrbitLoader loading={loading} size={60} speed={0.5} />
          </div>
          <div>
            <p>Normal (1x)</p>
            <OrbitLoader loading={loading} size={60} speed={1} />
          </div>
          <div>
            <p>Fast (2x)</p>
            <OrbitLoader loading={loading} size={60} speed={2} />
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
        {loading && <OrbitLoader loading={true} size={70} fullscreen loaderCenter screenBackground="rgba(0,0,0,0.85)" />}
      </div>
    </div>
  );
};
