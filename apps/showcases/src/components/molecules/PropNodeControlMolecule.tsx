"use client";

import React, { useMemo } from "react";
import { LiveProvider, LiveEditor } from "react-live";
import type { PropControlConfig } from "@/utils/loaderPropsConfig";

interface PropNodeControlProps {
  propName: string;
  value?: React.ReactNode;
  onChange: (propName: string, value: React.ReactNode) => void;
  propConfig: PropControlConfig;
  scope?: Record<string, any>;
}

export default function PropNodeControl({
  propName,
  onChange,
  value,
  propConfig,
  scope = {},
}: PropNodeControlProps) {



  const combinedScope = useMemo(
    () => ({ React, ...scope }),
    [scope]
  );

  return (
    <div className="space-y-3">
      <label className="text-sm text-zinc-300 font-medium">{propName}</label>

      <LiveProvider
        scope={combinedScope}
        language="jsx"
        noInline={true}
        code={typeof value === "string" ? value : propConfig.placeholder?.toString() || ""}
      >
        <div className="rounded border border-gray-700">
          <LiveEditor
            onChange={(next) => onChange(propName, next)}
            className="text-sm font-mono bg-transparent p-3"
          />
        </div>
      </LiveProvider>
    </div>
  );
}