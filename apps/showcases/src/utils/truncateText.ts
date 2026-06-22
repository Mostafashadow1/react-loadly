export function truncateText(text: unknown, maxLength: number): string {
  if (text == null) return "";

  const str = String(text).trim();
  if (str.length <= maxLength) return str;

  return str.slice(0, maxLength) + "...";
}
