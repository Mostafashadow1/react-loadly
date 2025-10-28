import React, { useState } from "react";
import { PlaneLoader } from "@/components/organisms";

export const PlaneExample = () => {
  const [loading, setLoading] = useState(true);

  return (
    <div style={{ padding: "40px" }}>
      <h2 style={{ marginBottom: "20px" }}>Plane Loader Examples</h2>

      <div style={{ marginBottom: "30px" }}>
        <button onClick={() => setLoading(!loading)}>{loading ? "Stop Loading" : "Start Loading"}</button>
      </div>

      {/* Basic Plane Loader */}
      <div style={{ marginBottom: "40px" }}>
        <h3>Basic Plane Loader (3D Cube)</h3>
        <PlaneLoader loading={loading} size={50} />
      </div>

      {/* Plane with Text */}
      <div style={{ marginBottom: "40px" }}>
        <h3>Plane with Text</h3>
        <PlaneLoader loading={loading} size={50} showText loadingText="Rotating..." />
      </div>

      {/* Secondary Color */}
      <div style={{ marginBottom: "40px" }}>
        <h3>With Secondary Color</h3>
        <PlaneLoader loading={loading} size={50} color="#3b82f6" secondaryColor="#8b5cf6" />
      </div>

      {/* Different Sizes */}
      <div style={{ marginBottom: "40px" }}>
        <h3>Different Sizes</h3>
        <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
          <PlaneLoader loading={loading} size={35} color="#ef4444" secondaryColor="#10b981" />
          <PlaneLoader loading={loading} size={60} />
          <PlaneLoader loading={loading} size={85} />
        </div>
      </div>

      {/* Custom Speed */}
      <div style={{ marginBottom: "40px" }}>
        <h3>Different Speeds</h3>
        <div style={{ display: "flex", gap: "30px", alignItems: "center" }}>
          <div>
            <p>Slow (0.5x)</p>
            <PlaneLoader loading={loading} size={50} speed={0.5} />
          </div>
          <div>
            <p>Normal (1x)</p>
            <PlaneLoader loading={loading} size={50} speed={1} />
          </div>
          <div>
            <p>Fast (2x)</p>
            <PlaneLoader loading={loading} size={50} speed={2} />
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
        {loading && <PlaneLoader loading={true} size={70} fullscreen loaderCenter screenBackground="rgba(0,0,0,0.85)" />}
      </div>
    </div>
  );
};
