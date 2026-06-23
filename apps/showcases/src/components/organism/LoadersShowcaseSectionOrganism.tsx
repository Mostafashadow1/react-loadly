import { useState, useMemo, useCallback, type ReactNode } from "react";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Code, Pause, Play, RotateCcw, Sliders } from "lucide-react";
import { LOADER_CONFIGS } from "@/utils/LoaderConfig";
import { LoaderPreview } from "@/components/organism/LoaderPreviewOrganism";
import { LoaderControls } from "@/components/organism/LoaderControlsOrganism";
import { CodeSnippet } from "@/components/organism/CodeSnippetOrganism";
import {
  COMMON_CONTROLS,
  UNIQUE_CONTROLS,
  DEFAULT_PROPS,
} from "@/utils/loaderPropsConfig";
import type { LoaderKind } from "@/types/ILoaderConfig";
import type { PropControls } from "@/utils/loaderPropsConfig";
import LoaderShowcaseHeader from "./LoaderShowcaseHeaderOrganism";
import LoaderShowcaseCardContent from "./LoaderShowcaseCardContentOrganism";
import { cn } from "@/lib/utils";

export type PropValues = Record<
  string,
  string | number | boolean | ReactNode | undefined
>;

export function LoadersShowcaseSection() {
  const [activeLoader, setActiveLoader] = useState<LoaderKind>("spin");
  const [isPlaying, setIsPlaying] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Creating props for each loader
  const [loaderConfigs, setLoaderConfigs] = useState<
    Record<LoaderKind, PropValues>
  >(() => {
    const initial = {} as Record<LoaderKind, PropValues>;

    Object.keys(LOADER_CONFIGS).forEach((loaderKey) => {
      const loader = LOADER_CONFIGS[loaderKey as LoaderKind];
      const props: PropValues = {};

      // Combine default + unique + common props for this loader
      [...loader.commonProps, ...loader.uniqueProps].forEach((prop) => {
        if (prop in DEFAULT_PROPS) {
          // Special case: squares loader should have count: 1
          if (loaderKey === "squares" && prop === "count") {
            props[prop] = 1;
          } else {
            props[prop] = DEFAULT_PROPS[prop];
          }
        }
      });
      initial[loaderKey as LoaderKind] = props;
    });

    return initial;
  });

  // Active loader data created when loader chosen
  const activeLoaderData = useMemo(() => {
    return LOADER_CONFIGS[activeLoader] || Object.values(LOADER_CONFIGS)[0];
  }, [activeLoader]);

  // Current props to pass to preview and code snippet
  const currentProps = useMemo(() => {
    const props = loaderConfigs[activeLoader] || {};
    return isPlaying ? props : { ...props, speed: 0 };
  }, [activeLoader, loaderConfigs, isPlaying]);

  const propControls = useMemo((): PropControls => {
    const controls: PropControls = {};
    const { commonProps, uniqueProps, interface: iface } = activeLoaderData;
    [...commonProps, ...uniqueProps].forEach((prop) => {
      if (prop in DEFAULT_PROPS) {
        if (prop === "variant") {
          controls[prop] =
            iface === "IMorphLoaderProps"
              ? UNIQUE_CONTROLS.morphVariant
              : iface === "ISkeletonPatternLoaderProps"
              ? UNIQUE_CONTROLS.skeletonVariant
              : UNIQUE_CONTROLS.variant;
          return;
        }

        controls[prop] =
          COMMON_CONTROLS[prop as keyof typeof COMMON_CONTROLS] ??
          UNIQUE_CONTROLS[prop as keyof typeof UNIQUE_CONTROLS];
      }
    });
    return controls;
  }, [activeLoaderData]);

  // Handle prop value changes
  const handlePropChange = useCallback(
    (propName: string, value: string | number | boolean | ReactNode) => {
      setLoaderConfigs((prev) => ({
        ...prev,
        [activeLoader]: {
          ...prev[activeLoader],
          [propName]: value,
        },
      }));
    },
    [activeLoader]
  );

  // Reset all props to default values
  const resetProps = useCallback(() => {
    const resetValues: PropValues = {};
    const activeConfig = LOADER_CONFIGS[activeLoader];
    [...activeConfig.commonProps, ...activeConfig.uniqueProps].forEach(
      (prop) => {
        if (prop in DEFAULT_PROPS) {
          // Special case: squares loader should have count: 1
          if (activeLoader === "squares" && prop === "count") {
            resetValues[prop] = 1;
          } else {
            resetValues[prop] = DEFAULT_PROPS[prop];
          }
        }
      }
    );

    setLoaderConfigs((prev) => ({
      ...prev,
      [activeLoader]: resetValues,
    }));
  }, [activeLoader]);

  // Filtered loaders calculation
  const filteredLoaders = useMemo(() => {
    return Object.entries(LOADER_CONFIGS).filter(([key, loader]) => {
      if (key === "skeleton") return false;
      if (selectedCategory === "All") return true;
      if (selectedCategory === "New ✨") return loader.isNew;
      
      const geometricKeys = [
        "spin", "pulse", "grid", "bars", "dots", "ring", "rotate", "bounce", 
        "stair", "squares", "ripple", "orbit", "plane", "hashtag", "snake", "wave"
      ];
      const organicKeys = ["blob", "typing", "flow"];
      
      if (selectedCategory === "Geometric") return geometricKeys.includes(key);
      if (selectedCategory === "Organic") return organicKeys.includes(key);
      if (selectedCategory === "Flexible") {
        return !geometricKeys.includes(key) && 
               !organicKeys.includes(key);
      }
      return true;
    });
  }, [selectedCategory]);

  return (
    <section
      id="loaders"
      className="relative py-24 bg-background overflow-hidden border-t border-border/20"
    >
      <div className="absolute inset-0 dot-grid-bg opacity-30 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header containing Filters */}
        <LoaderShowcaseHeader
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          totalCount={filteredLoaders.length}
        />

        {/* Loader Grid */}
        <div className="mt-12">
          <motion.div
            layout
            className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
          >
            <AnimatePresence mode="popLayout">
              {filteredLoaders.map(([key, loader]) => (
                <Dialog key={key}>
                  <DialogTrigger asChild>
                    <motion.div
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.2 }}
                      className="group h-full cursor-pointer"
                      onClick={() => {
                        setActiveLoader(key as LoaderKind);
                      }}
                    >
                      <Card className="relative h-full overflow-hidden rounded-lg border border-zinc-800/80 bg-zinc-950/55 p-3 shadow-lg shadow-black/10 transition-all duration-300 hover:-translate-y-1 hover:border-indigo-400/50 hover:bg-zinc-950/80 hover:shadow-indigo-500/10">
                        
                        {/* New indicator pill with pulsing border */}
                        {loader.isNew && (
                          <div className="absolute top-3 right-3 z-20">
                            <span className="relative flex h-2 w-2">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                            </span>
                            <Badge className="absolute top-0 right-3 bg-emerald-500/10 border-emerald-500/20 text-emerald-400 font-bold text-[9px] px-1.5 py-0.5 rounded-full uppercase tracking-wider scale-90 -translate-y-2">
                              New
                            </Badge>
                          </div>
                        )}
                        
                        <LoaderShowcaseCardContent
                          loader={loader}
                          propValues={loaderConfigs[key as LoaderKind]}
                        />
                      </Card>
                    </motion.div>
                  </DialogTrigger>

                  <DialogContent className="max-w-7xl h-dvh sm:h-[95vh] md:h-[90vh] lg:h-[85vh] w-full sm:w-[98vw] md:w-[95vw] lg:w-[90vw] xl:w-[85vw] overflow-hidden bg-zinc-950 border-zinc-800 rounded-none sm:rounded-2xl shadow-2xl text-white p-0 flex flex-col !left-0 !top-0 sm:!left-[50%] sm:!top-[50%] !translate-x-0 !translate-y-0 sm:!translate-x-[-50%] sm:!translate-y-[-50%]">
                    <div className="flex shrink-0 items-center justify-between gap-4 border-b border-white/[0.07] px-4 py-3 sm:px-6 sm:py-4">
                      <div className="flex min-w-0 flex-col gap-1.5">
                        <h2 className="truncate text-lg font-medium tracking-tight text-zinc-100 sm:text-xl">
                          {loader.title}
                        </h2>
                        <div className="flex min-w-0 flex-wrap items-center gap-2">
                          <span className="inline-flex max-w-full items-center gap-1 rounded-md border border-indigo-500/25 bg-indigo-500/10 px-2.5 py-0.5 text-[11px] font-medium text-indigo-300">
                            <Code className="h-3 w-3 shrink-0" />
                            <span className="truncate">{loader.interface}</span>
                          </span>
                          <span className="inline-flex items-center rounded-md border border-white/10 bg-white/[0.04] px-2.5 py-0.5 text-[11px] text-zinc-500">
                            {loader.commonProps.length + loader.uniqueProps.length} props
                          </span>
                        </div>
                      </div>
                      <div className="flex shrink-0 items-center gap-2">
                        <button
                          onClick={() => setIsPlaying(!isPlaying)}
                          className={cn(
                            "inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-[12px] font-medium transition-all sm:px-3",
                            isPlaying
                              ? "border-indigo-500/40 bg-indigo-500/15 text-indigo-300"
                              : "border-white/10 bg-white/[0.04] text-zinc-400 hover:text-zinc-200"
                          )}
                        >
                          {isPlaying ? (
                            <Pause className="h-3.5 w-3.5" />
                          ) : (
                            <Play className="h-3.5 w-3.5" />
                          )}
                          <span className="hidden sm:inline">
                            {isPlaying ? "Pause" : "Play"}
                          </span>
                        </button>
                        <button
                          onClick={resetProps}
                          className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 px-2.5 py-1.5 text-[12px] font-medium text-zinc-400 transition-all hover:bg-white/[0.04] hover:text-zinc-200 sm:px-3"
                        >
                          <RotateCcw className="h-3.5 w-3.5" />
                          <span className="hidden sm:inline">Reset</span>
                        </button>
                      </div>
                    </div>

                    <div className="grid flex-1 grid-cols-1 overflow-y-auto lg:grid-cols-[minmax(0,1fr)_360px] lg:divide-x lg:divide-white/[0.07] lg:overflow-hidden">
                      <div className="flex min-h-[680px] flex-col lg:min-h-0">
                        <div className="shrink-0 border-b border-white/[0.07]">
                          <div className="flex items-start justify-between gap-3 px-5 pb-2.5 pt-3">
                            <div className="min-w-0">
                              <p className="mb-0.5 text-[10px] font-semibold uppercase tracking-widest text-indigo-400">
                                Live preview
                              </p>
                              <h4 className="truncate text-sm font-medium text-zinc-100">
                                {loader.title}
                              </h4>
                            </div>
                            <span className="max-w-[45%] truncate rounded-md border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[11px] text-zinc-400">
                              {loader.interface}
                            </span>
                          </div>
                          <div className="relative mx-5 mb-4 flex h-[200px] items-center justify-center overflow-hidden rounded-xl border border-white/[0.06] bg-zinc-950/80">
                            <div className="absolute inset-0 checkerboard-bg pointer-events-none" />
                            <div className="pointer-events-none absolute h-40 w-40 rounded-full bg-indigo-500/10 blur-[50px]" />
                            <div className="relative z-10 flex h-full w-full items-center justify-center">
                              <LoaderPreview
                                activeLoaderData={activeLoaderData}
                                currentProps={currentProps}
                              />
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-1 flex-col min-h-0 px-5 py-4">
                          <div className="flex-1 min-h-0 overflow-y-auto scrollbar-beauty">
                            <CodeSnippet
                              activeLoaderData={activeLoaderData}
                              currentProps={currentProps}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="flex min-h-[480px] flex-col overflow-hidden border-t border-white/[0.07] lg:min-h-0 lg:border-t-0">
                        <div className="shrink-0 border-b border-white/[0.07] px-5 pb-3 pt-4">
                          <div className="mb-3 flex items-center gap-2">
                            <span className="h-1.5 w-1.5 rounded-full bg-indigo-500" />
                            <span className="text-sm font-medium text-zinc-200">
                              Customize Properties
                            </span>
                          </div>
                          <div className="flex items-center gap-2 rounded-lg bg-white/[0.04] px-3 py-2 text-[11px] text-zinc-500">
                            <Sliders className="h-3.5 w-3.5 text-indigo-300" />
                            Tune the available property groups below
                          </div>
                        </div>

                        <div className="flex-1 min-h-0 overflow-y-auto px-5 py-4 scrollbar-beauty">
                          <LoaderControls
                            controls={propControls}
                            values={loaderConfigs[activeLoader]}
                            onChange={handlePropChange}
                          />
                        </div>

                        <div className="flex shrink-0 items-center justify-between border-t border-white/[0.07] px-5 py-3">
                          <span className="text-[11px] text-zinc-600">
                            <span className="text-zinc-500">
                              {Object.keys(propControls).length}
                            </span>{" "}
                            of {loader.commonProps.length + loader.uniqueProps.length} props
                          </span>
                          <button
                            onClick={resetProps}
                            className="rounded-md border border-white/10 px-3 py-1 text-[11px] text-zinc-500 transition-all hover:border-white/20 hover:text-zinc-200"
                          >
                            Reset all
                          </button>
                        </div>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
