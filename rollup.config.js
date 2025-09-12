import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import { readFileSync } from "fs";
import dts from "rollup-plugin-dts";
import postcss from "rollup-plugin-postcss";
import { typescriptPaths } from "rollup-plugin-typescript-paths";
import { terser } from "rollup-plugin-terser";
import { visualizer } from "rollup-plugin-visualizer";

const pkg = JSON.parse(readFileSync("./package.json", "utf8"));
const isAnalyze = process.argv.includes("--config-option") && process.argv.includes("analyze=true");

export default [
  // --- JS Build ---
  {
    input: "src/index.ts",
    external: ["react", "react-dom", "react/jsx-runtime", "react/jsx-dev-runtime"],
    output: [
      {
        file: pkg.main, // dist/index.cjs.js
        format: "cjs",
        sourcemap: true,
        exports: "named",
      },
      {
        file: pkg.module, // dist/index.esm.js
        format: "esm",
        sourcemap: true,
      },
    ],
    plugins: [
      typescriptPaths({
        preserveExtensions: true,
      }),
      resolve({
        browser: true,
        preferBuiltins: false,
        extensions: [".js", ".jsx", ".ts", ".tsx"],
      }),
      commonjs(),
      typescript({
        tsconfig: "./tsconfig.json",
        declaration: true,
        declarationDir: "dist/types",
        emitDeclarationOnly: false,
      }),
      postcss({
        extract: false, // Don't extract CSS in main build
        inject: false, // Don't inject CSS
        minimize: false, // Don't minimize in main build
      }),
      terser({
        compress: {
          drop_console: true,
          drop_debugger: true,
          pure_funcs: ["console.log", "console.info", "console.debug", "console.warn"],
        },
        mangle: {
          safari10: true,
        },
        format: {
          comments: false,
        },
      }),
      ...(isAnalyze
        ? [
            visualizer({
              filename: "dist/bundle-analysis.html",
              open: true,
              gzipSize: true,
              brotliSize: true,
            }),
          ]
        : []),
    ],
  },

  // --- CSS Build ---
  {
    input: "src/styles.ts",
    output: [
      {
        file: "dist/styles.js",
        format: "esm",
      },
    ],
    plugins: [
      resolve({
        browser: true,
        preferBuiltins: false,
        extensions: [".js", ".jsx", ".ts", ".tsx"],
      }),
      postcss({
        extract: "styles.css",
        minimize: true,
        sourceMap: true,
      }),
    ],
  },

  // --- DTS Build (for autocomplete) ---
  {
    input: "dist/types/index.d.ts",
    output: [{ file: "dist/index.d.ts", format: "es" }],
    plugins: [typescriptPaths({ preserveExtensions: true }), dts()],
    external: [/\.css$/],
  },
];
