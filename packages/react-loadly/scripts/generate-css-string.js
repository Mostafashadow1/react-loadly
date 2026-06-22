import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const cssPath = path.resolve(__dirname, "../src/styles/base.css");
const outputPath = path.resolve(__dirname, "../src/styles/cssString.ts");

try {
  const cssContent = fs.readFileSync(cssPath, "utf8");
  // Clean up carriage returns and escape backticks and dollar signs
  const escapedCss = cssContent
    .replace(/\\/g, "\\\\")
    .replace(/`/g, "\\`")
    .replace(/\$/g, "\\$");

  const tsContent = `// Automatically generated from base.css. Do not edit directly.
export const baseCSSString = \`${escapedCss}\`;
`;

  fs.writeFileSync(outputPath, tsContent, "utf8");
  console.log("CSS string generated successfully at src/styles/cssString.ts");
} catch (error) {
  console.error("Error generating CSS string:", error);
  process.exit(1);
}
