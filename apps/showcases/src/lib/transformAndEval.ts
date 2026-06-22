// transformAndEval.ts
import * as Babel from "@babel/standalone";
import React from "react";

/**
 * Transform JSX string into a ReactNode by:
 * 1. Transpiling JSX to JS with @babel/standalone (preset-react).
 * 2. Creating a Function whose args = scope keys, plus React.
 * 3. Returning the evaluated React element.
 *
 * @param jsxCode - the user-provided JSX (e.g. "<div>Hello <Button /></div>")
 * @param scope - object mapping identifier -> value (e.g. { React, Button, Badge })
 * @returns { node?: React.ReactNode, error?: Error }
 */
export function transformAndEval(
    jsxCode: string,
    scope: Record<string, any>
): { node?: React.ReactNode; error?: Error } {
    try {
        // Wrap code in an expression returning a fragment (so multi-line JSX works)
        // If user already provided a single expression like "<div/>" this is still fine.
        const wrapped = `(()=>{ return (${jsxCode}); })()`;

        // Transform JSX with babel standalone using preset-react.
        // We ask babel to output an IIFE returning the expression.
        const transformed = Babel.transform(wrapped, {
            presets: ["react"],
            plugins: [],
            // Don't minify, keep readable for debugging.
            sourceMaps: false,
        }).code;

        if (!transformed) {
            return { error: new Error("Babel returned empty code") };
        }

        // Prepare args and values for the sandboxed function.
        const scopeKeys = Object.keys(scope || {});
        const scopeValues = scopeKeys.map((k) => scope[k]);

        // Always expose React (required for createElement) to the evaluated code.
        // If user forgot to include React in scope, add it but ensure no override.
        const finalKeys = ["React", ...scopeKeys];
        const finalValues = [React, ...scopeValues];

        // Build function: arguments are scope names, body is transformed code.
        // The transformed code already contains a top-level return inside the IIFE.
        // We evaluate it and get the React element back.
        const evaluator = new Function(...finalKeys, transformed) as (...args: any[]) => any;

        // Execute
        const result = evaluator(...finalValues);

        return { node: result };
    } catch (err: any) {
        return { error: err instanceof Error ? err : new Error(String(err)) };
    }
}
