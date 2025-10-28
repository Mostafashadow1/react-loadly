import React, { useState, useEffect } from "react";
import { ProgressRingLoader } from "@/components/organisms";

export const ProgressRingExample = () => {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState<number | null>(null);
  const size = 80;

  // Simulate progress
  useEffect(() => {
    if (progress !== null) {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev === null) return 0;
          if (prev >= 100) return 100;
          return prev + 1;
        });
      }, 100);
      return () => clearInterval(interval);
    }
  }, [progress]);

  return (
    <div style={{ padding: "40px" }}>
      <h2 style={{ marginBottom: "20px" }}>Progress Ring Loader Examples</h2>

      <div style={{ marginBottom: "30px" }}>
        <button onClick={() => setLoading(!loading)}>{loading ? "Stop Loading" : "Start Loading"}</button>
        <button style={{ marginLeft: "10px" }} onClick={() => setProgress(0)}>
          Start Progress (0%)
        </button>
        <button style={{ marginLeft: "10px" }} onClick={() => setProgress(null)}>
          Reset to Indeterminate
        </button>
      </div>

      {/* Basic Progress Ring Loader */}
      <div style={{ marginBottom: "40px" }}>
        <h3>Basic Indeterminate Ring</h3>
        <ProgressRingLoader loading={loading} size={size} />
      </div>

      {/* Progress Ring with Progress */}
      <div style={{ marginBottom: "40px" }}>
        <h3>Determinate Progress Ring</h3>
        <ProgressRingLoader loading={loading} size={size} progress={progress} />
        {progress !== null && <p style={{ marginTop: "10px" }}>Progress: {progress}%</p>}
      </div>

      {/* Different Sizes */}
      <div style={{ marginBottom: "40px" }}>
        <h3>Different Sizes</h3>
        <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
          <ProgressRingLoader loading={loading} size={40} color="red" />
          <ProgressRingLoader loading={loading} size={60} />
          <ProgressRingLoader loading={loading} size={80} />
        </div>
      </div>

      {/* Custom Thickness */}
      <div style={{ marginBottom: "40px" }}>
        <h3>Custom Thickness</h3>
        <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
          <div style={{ textAlign: "center" }}>
            <p>Thin (2px)</p>
            <ProgressRingLoader loading={loading} size={size} thickness={2} />
          </div>
          <div style={{ textAlign: "center" }}>
            <p>Normal (4px)</p>
            <ProgressRingLoader loading={loading} size={size} thickness={4} />
          </div>
          <div style={{ textAlign: "center" }}>
            <p>Thick (8px)</p>
            <ProgressRingLoader loading={loading} size={size} thickness={8} />
          </div>
        </div>
      </div>

      {/* With Secondary Color */}
      <div style={{ marginBottom: "40px" }}>
        <h3>With Secondary Color</h3>
        <ProgressRingLoader loading={loading} size={size} color="#3b82f6" secondaryColor="#e0e7ff" />
      </div>

      {/* Different Colors */}
      <div style={{ marginBottom: "40px" }}>
        <h3>Different Colors</h3>
        <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
          <ProgressRingLoader loading={loading} size={size} color="#ef4444" />
          <ProgressRingLoader loading={loading} size={size} color="#10b981" />
          <ProgressRingLoader loading={loading} size={size} color="#f59e0b" />
        </div>
      </div>

      {/* With Text */}
      <div style={{ marginBottom: "40px" }}>
        <h3>With Text</h3>
        <ProgressRingLoader loading={loading} size={size} showText loadingText="Loading data..." progress={progress} />
      </div>

      {/* Different Speeds */}
      <div style={{ marginBottom: "40px" }}>
        <h3>Different Speeds</h3>
        <div style={{ display: "flex", gap: "30px", alignItems: "center" }}>
          <div>
            <p>Slow (0.5x)</p>
            <ProgressRingLoader loading={loading} size={size} speed={0.5} color="#f00" secondaryColor="blue" />
          </div>
          <div>
            <p>Normal (1x)</p>
            <ProgressRingLoader loading={loading} size={size} speed={1} />
          </div>
          <div>
            <p>Fast (2x)</p>
            <ProgressRingLoader loading={loading} size={size} speed={2} />
          </div>
        </div>
      </div>

      {/* Progress Values */}
      <div style={{ marginBottom: "40px" }}>
        <h3>Different Progress Values</h3>
        <div style={{ display: "flex", gap: "20px", alignItems: "center", marginBottom: "20px" }}>
          <ProgressRingLoader loading={loading} size={size} progress={25} color="#f00" secondaryColor="#f00" />
          <ProgressRingLoader loading={loading} size={size} progress={50} color="#0f0" secondaryColor="yellow" />
          <ProgressRingLoader loading={loading} size={size} progress={75} />
          <ProgressRingLoader loading={loading} size={size} progress={100} color="#00f" secondaryColor="red" />
        </div>
      </div>
    </div>
  );
};
