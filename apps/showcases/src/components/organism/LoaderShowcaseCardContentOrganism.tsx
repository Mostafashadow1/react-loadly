import { LOADER_CONFIGS } from "@/utils/LoaderConfig";
import { Badge } from "../ui/badge";
import type { PropValues } from "../sections";
import { transformJSXToNode } from "@/lib/transformToNode";
import type { ComponentType } from "react";

type Props = {
  loader: (typeof LOADER_CONFIGS)[keyof typeof LOADER_CONFIGS];
  propValues: PropValues;
};
const LoaderShowcaseCardContent = ({ loader, propValues }: Props) => {
  const processedProps: Record<string, unknown> = { ...propValues };
  const LoaderComponent = loader.component as ComponentType<Record<string, unknown>>;

  //  Transform string children into real React nodes
  Object.entries(processedProps).forEach(([propName, value]) => {
    if (propName === "children" && typeof value === "string") {
      try {
        processedProps[propName] = transformJSXToNode(value);
      } catch (err) {
        console.warn(`Failed to transform children:`, err);
      }
    }
  });
  return (
    <div className="flex h-full flex-col overflow-hidden">
      <div className="relative flex h-32 items-center justify-center rounded-lg border border-zinc-800/80 bg-zinc-950/70 p-4">
        <div className="absolute inset-0 checkerboard-bg opacity-35" />
        <div className="absolute size-24 rounded-full bg-indigo-500/10 blur-2xl" />
        <div className="relative z-10 flex size-full items-center justify-center">
          <LoaderComponent {...processedProps} />
        </div>
      </div>

      <div className="flex flex-1 flex-col justify-between gap-4 px-1 pt-4">
        <div className="space-y-1.5">
          <h3 className="line-clamp-1 text-center text-sm font-semibold text-white">
            {loader.title}
          </h3>
          <p className="text-center text-xs text-muted-foreground">
            Click to tune props and copy JSX
          </p>
        </div>

        <div className="flex justify-center">
          <Badge
            variant="outline"
            className="max-w-full truncate rounded-md border-zinc-700/80 bg-zinc-900/60 px-2.5 py-1 text-[11px] text-zinc-300"
          >
            {loader.interface}
          </Badge>
        </div>
      </div>
    </div>
  );
};

export default LoaderShowcaseCardContent;
