import React, { useState } from "react";
import { RotateLoader } from "@/components/organisms";

export const RotateExample = () => {
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(2);
  const size = 40;

  return (
    <div style={{ padding: "40px" }}>
      <h2 style={{ marginBottom: "20px" }}>Rotate Loader Examples</h2>

      <div style={{ marginBottom: "30px" }}>
        <button onClick={() => setLoading(!loading)}>{loading ? "Stop Loading" : "Start Loading"}</button>
      </div>

      {/* Basic Rotate Loader */}
      <div style={{ marginBottom: "40px" }}>
        <h3>Basic Rotate Loader</h3>
        <RotateLoader loading={loading} size={size} />
      </div>

      {/* Rotate with Text */}
      <div style={{ marginBottom: "40px" }}>
        <h3>Rotate with Text</h3>
        <RotateLoader loading={loading} size={size} showText loadingText="Loading..." />
      </div>

      {/* Custom Count */}
      <div style={{ marginBottom: "40px" }}>
        <h3>Custom Ring Count</h3>
        <div style={{ marginBottom: "10px" }}>
          <label>
            Count: <input type="number" value={count} onChange={(e) => setCount(parseInt(e.target.value) || 2)} min="1" max="4" />
          </label>
        </div>
        <RotateLoader loading={loading} size={size} count={count} />
      </div>

      {/* Secondary Color */}
      <div style={{ marginBottom: "40px" }}>
        <h3>With Secondary Color</h3>
        <RotateLoader loading={loading} size={size} color="#ef4444" secondaryColor="#3b82f6" count={count} />
      </div>

      {/* Different Sizes */}
      <div style={{ marginBottom: "40px" }}>
        <h3>Different Sizes</h3>
        <div style={{ display: "flex", gap: "30px", alignItems: "center" }}>
          <RotateLoader loading={loading} size={30} />
          <RotateLoader loading={loading} size={50} />
          <RotateLoader loading={loading} size={70} />
        </div>
      </div>

      {/* Different Colors */}
      <div style={{ marginBottom: "40px" }}>
        <h3>Different Colors</h3>
        <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
          <RotateLoader loading={loading} size={size} color="#ef4444" />
          <RotateLoader loading={loading} size={size} color="#3b82f6" />
          <RotateLoader loading={loading} size={size} color="#10b981" />
          <RotateLoader loading={loading} size={size} color="#f59e0b" />
        </div>
      </div>

      {/* Custom Speed */}
      <div style={{ marginBottom: "40px" }}>
        <h3>Different Speeds</h3>
        <div style={{ display: "flex", gap: "30px", alignItems: "center" }}>
          <div>
            <p>Slow (0.5x)</p>
            <RotateLoader loading={loading} size={size} speed={0.5} />
          </div>
          <div>
            <p>Normal (1x)</p>
            <RotateLoader loading={loading} size={size} speed={1} />
          </div>
          <div>
            <p>Fast (2x)</p>
            <RotateLoader loading={loading} size={size} speed={2} />
          </div>
        </div>
      </div>

      {/* Multiple Rings */}
      <div style={{ marginBottom: "40px" }}>
        <h3>Multiple Rings (count=3)</h3>
        <RotateLoader loading={loading} size={size} count={3} color="#8b5cf6" secondaryColor="#3b82f6" />
      </div>

      {/* Nested Rings */}
      <div style={{ marginBottom: "40px" }}>
        <h3>Nested Rings (count=4)</h3>
        <RotateLoader loading={loading} size={size} count={4} color="#10b981" secondaryColor="#3b82f6" />
      </div>

      {/* Custom Styling */}
      <div style={{ marginBottom: "40px" }}>
        <h3>Custom Styling</h3>
        <RotateLoader
          loading={loading}
          size={size}
          style={{ border: "2px solid #8b5cf6", padding: "20px", borderRadius: "8px" }}
          className="custom-rotate-loader"
        />
      </div>
    </div>
  );
};
