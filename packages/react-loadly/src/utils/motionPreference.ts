export function getDefaultColors() {
  if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
    return { baseColor: "#e0e0e0", highlightColor: "#f5f5f5" };
  }

  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

  return prefersDark
    ? { baseColor: "#2a2a2a", highlightColor: "#3a3a3a" }
    : { baseColor: "#e0e0e0", highlightColor: "#f5f5f5" };
}
