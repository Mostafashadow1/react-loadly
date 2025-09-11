import React from "react";
import { ElementLoader } from "../components/organisms/ElementLoader";

// Example usage of ElementLoader component
const ExampleElementLoader = () => {
  return (
    <div>
      {/* Basic usage with a div element */}
      <ElementLoader>
        <div style={{ width: "100%", height: "100%", backgroundColor: "blue" }} />
      </ElementLoader>

      {/* With custom size and speed */}
      <ElementLoader size={100} speed={1.5}>
        <div style={{ width: "100%", height: "100%", backgroundColor: "red" }} />
      </ElementLoader>

      {/* With different animation types */}
      <ElementLoader animationType="pulse">
        <div style={{ width: "100%", height: "100%", backgroundColor: "green" }} />
      </ElementLoader>

      <ElementLoader animationType="glow">
        <div style={{ width: "100%", height: "100%", backgroundColor: "purple" }} />
      </ElementLoader>

      <ElementLoader animationType="bounce">
        <div style={{ width: "100%", height: "100%", backgroundColor: "orange" }} />
      </ElementLoader>

      <ElementLoader animationType="flip">
        <div style={{ width: "100%", height: "100%", backgroundColor: "pink" }} />
      </ElementLoader>

      {/* With a paragraph element */}
      <ElementLoader>
        <p style={{ fontSize: "24px", fontWeight: "bold" }}>Loading...</p>
      </ElementLoader>

      {/* With loading text */}
      <ElementLoader showText loadingText="Loading content...">
        <div style={{ width: "100%", height: "100%", backgroundColor: "teal" }} />
      </ElementLoader>

      {/* Fullscreen mode */}
      <ElementLoader fullscreen>
        <div style={{ width: "100%", height: "100%", backgroundColor: "black" }} />
      </ElementLoader>
    </div>
  );
};

export default ExampleElementLoader;
