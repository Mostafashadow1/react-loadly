import { transform } from "@babel/standalone";
import React from "react";

export function transformJSXToNode(jsx: string) {
    const { code } = transform(jsx, {
        presets: ["react"],
    });

    const fn = new Function("React", `return ${code}`);
    return fn(React);
}