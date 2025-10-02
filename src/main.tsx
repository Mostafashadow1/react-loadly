import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/base.css";

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
  <React.StrictMode>
    <div style={{ padding: "20px" }}>
      <h1>React Loadly AutoSkeleton Example</h1>
    </div>
  </React.StrictMode>,
);
