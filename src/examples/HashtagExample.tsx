import React, { useState } from "react";
import { HashtagLoader } from "@/components/organisms";

export const HashtagExample = () => {
  const [loading, setLoading] = useState(true);

  return (
    <div style={{ padding: "40px" }}>
      <h2 style={{ marginBottom: "20px" }}>Hashtag Loader Examples</h2>

      <div style={{ marginBottom: "30px" }}>
        <button onClick={() => setLoading(!loading)}>{loading ? "Stop Loading" : "Start Loading"}</button>
      </div>

      {/* Basic Hashtag Loader */}
      <div style={{ marginBottom: "40px" }}>
        <h3>Basic Hashtag Loader</h3>
        <HashtagLoader loading={loading} size={50} />
      </div>

      {/* Hashtag with Text */}
      <div style={{ marginBottom: "40px" }}>
        <h3>Hashtag with Text</h3>
        <HashtagLoader loading={loading} size={50} showText loadingText="Loading posts..." />
      </div>

      {/* Secondary Color */}
      <div style={{ marginBottom: "40px" }}>
        <h3>With Secondary Color</h3>
        <HashtagLoader loading={loading} size={50} color="#3b82f6" secondaryColor="#8b5cf6" />
      </div>

      {/* Different Sizes */}
      <div style={{ marginBottom: "40px" }}>
        <h3>Different Sizes</h3>
        <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
          <HashtagLoader loading={loading} size={35} color="#ef4444" secondaryColor="#10b981" />
          <HashtagLoader loading={loading} size={60} />
          <HashtagLoader loading={loading} size={80} />
        </div>
      </div>

      {/* Custom Speed */}
      <div style={{ marginBottom: "40px" }}>
        <h3>Different Speeds</h3>
        <div style={{ display: "flex", gap: "30px", alignItems: "center" }}>
          <div>
            <p>Slow (0.5x)</p>
            <HashtagLoader loading={loading} size={50} speed={0.5} />
          </div>
          <div>
            <p>Normal (1x)</p>
            <HashtagLoader loading={loading} size={50} speed={1} />
          </div>
          <div>
            <p>Fast (2x)</p>
            <HashtagLoader loading={loading} size={50} speed={2} />
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
        {loading && <HashtagLoader loading={true} size={60} fullscreen loaderCenter screenBackground="rgba(0,0,0,0.85)" />}
      </div>
    </div>
  );
};
