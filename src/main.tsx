import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/base.css";
import { AutoSkeletonExample } from "./AutoSkeletonExample";

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
  <React.StrictMode>
    <div style={{ padding: "20px" }}>
      <h1>React Loadly AutoSkeleton Example</h1>
      <AutoSkeletonExample />
    </div>
  </React.StrictMode>,
);
