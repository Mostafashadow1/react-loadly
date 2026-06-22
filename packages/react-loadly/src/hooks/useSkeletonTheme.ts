import React from "react";
import { SkeletonGroupContext, SkeletonTheme } from "../context/SkeletonGroupContext";

export function useSkeletonTheme(): SkeletonTheme {
  return React.useContext(SkeletonGroupContext);
}

export default useSkeletonTheme;
