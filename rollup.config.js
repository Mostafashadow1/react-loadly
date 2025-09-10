import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import { readFileSync } from "fs";
import dts from "rollup-plugin-dts";
import postcss from "rollup-plugin-postcss";
import { typescriptPaths } from "rollup-plugin-typescript-paths";

const pkg = JSON.parse(readFileSync("./package.json", "utf8"));

export default [
  // --- JS & CSS Build ---
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
        emitDeclarationOnly: false, // build JS + DTS in one pass
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
    external: [/\.css$/], // ignore CSS imports in DTS bundle
  },
];
