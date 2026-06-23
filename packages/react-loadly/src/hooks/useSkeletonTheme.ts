import React from "react";
import { SkeletonGroupLoaderContext, SkeletonLoaderTheme } from "../context/SkeletonGroupLoaderContext";

export function useSkeletonTheme(): SkeletonLoaderTheme {
  return React.useContext(SkeletonGroupLoaderContext);
}

export default useSkeletonTheme;
