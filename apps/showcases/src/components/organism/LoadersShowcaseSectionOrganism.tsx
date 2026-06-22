import { useState, useMemo, useCallback, type ReactNode } from "react";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
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
import { LoaderDialogHeader } from "./LoaderDialogHeaderOrganism";

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
    const initial: Record<LoaderKind, PropValues> = {} as any;

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
              : iface === "ISkeletonLoaderProps"
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
      if (selectedCategory === "All") return true;
      if (selectedCategory === "New ✨") return loader.isNew;
      
      const geometricKeys = [
        "spin", "pulse", "grid", "bars", "dots", "ring", "rotate", "bounce", 
        "stair", "squares", "ripple", "orbit", "plane", "hashtag", "snake", "wave"
      ];
      const skeletonKeys = ["skeleton"];
      const organicKeys = ["blob", "typing", "flow"];
      
      if (selectedCategory === "Geometric") return geometricKeys.includes(key);
      if (selectedCategory === "Skeleton") return skeletonKeys.includes(key);
      if (selectedCategory === "Organic") return organicKeys.includes(key);
      if (selectedCategory === "Flexible") {
        return !geometricKeys.includes(key) && 
               !skeletonKeys.includes(key) && 
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

                  {/* Responsive Dialog Content */}
                  <DialogContent className="max-w-7xl h-dvh sm:h-[95vh] md:h-[90vh] lg:h-[85vh] w-full sm:w-[98vw] md:w-[95vw] lg:w-[90vw] xl:w-[85vw] max-h-dvh sm:max-h-[95vh] md:max-h-[90vh] overflow-hidden bg-zinc-950 border-zinc-800 rounded-none sm:rounded-2xl shadow-2xl text-white p-0 sm:p-4 flex flex-col !left-0 !top-0 sm:!left-[50%] sm:!top-[50%] !translate-x-0 !translate-y-0 sm:!translate-x-[-50%] sm:!translate-y-[-50%]">
                    
                    {/* Header Section */}
                    <div className="shrink-0 mb-2 px-4 sm:px-0">
                      <LoaderDialogHeader
                        title={loader.title}
                        interfaceName={loader.interface}
                        totalProps={
                          loader.commonProps.length + loader.uniqueProps.length
                        }
                        isPlaying={isPlaying}
                        onTogglePlay={() => setIsPlaying(!isPlaying)}
                        onReset={resetProps}
                      />
                    </div>

                    {/* Dialog Grid Layout */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 flex-1 min-h-0 overflow-y-auto lg:overflow-hidden px-4 sm:px-6 pb-6 sm:pb-4">
                      
                      {/* Left: Visual Canvas + Code Snippet (col-span-7) */}
                      <div className="lg:col-span-7 flex flex-col gap-4 min-h-0 overflow-visible lg:overflow-hidden">
                        
                        {/* Visual Canvas Container */}
                        <div className="h-[300px] lg:h-[46%] min-h-[240px] rounded-lg border border-zinc-800/80 bg-zinc-950/80 p-4 shadow-inner shrink-0">
                          <div className="mb-3 flex items-center justify-between gap-3">
                            <div>
                              <p className="text-[11px] font-semibold uppercase tracking-wider text-indigo-300">
                                Live preview
                              </p>
                              <h4 className="text-sm font-semibold text-zinc-100">{loader.title}</h4>
                            </div>
                            <Badge
                              variant="outline"
                              className="rounded-md border-zinc-700/80 bg-zinc-900/60 px-2 py-1 text-[11px] text-zinc-300"
                            >
                              {loader.interface}
                            </Badge>
                          </div>
                          <div className="relative flex h-[calc(100%-48px)] items-center justify-center overflow-hidden rounded-lg border border-zinc-900 bg-zinc-950/70">
                          {/* Checkerboard Pattern overlay */}
                          <div className="absolute inset-0 checkerboard-bg pointer-events-none" />
                          {/* Radiant Glow behind Loader */}
                          <div className="absolute w-[180px] h-[180px] bg-indigo-500/10 blur-[50px] rounded-full pointer-events-none" />
                          
                          <div className="relative z-10 flex items-center justify-center w-full h-full">
                            <LoaderPreview
                              activeLoaderData={activeLoaderData}
                              currentProps={currentProps}
                            />
                          </div>
                          </div>
                        </div>

                        {/* Implementation Code Container */}
                        <div className="h-[300px] lg:h-[54%] bg-zinc-900/40 border border-zinc-800/60 rounded-lg p-4 flex flex-col min-h-0 overflow-hidden">
                          <div className="flex-1 min-h-0">
                            <CodeSnippet
                              activeLoaderData={activeLoaderData}
                              currentProps={currentProps}
                            />
                          </div>
                        </div>

                      </div>

                      {/* Right: Customizing controls list (col-span-5) */}
                      <div className="lg:col-span-5 p-4 bg-zinc-900/40 border border-zinc-800/60 rounded-lg flex flex-col min-h-0 overflow-hidden">
                        <h4 className="font-semibold text-zinc-300 text-sm flex items-center gap-2 mb-3 shrink-0">
                          <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full"></span>
                          <span>Customize Properties</span>
                        </h4>
                        <div className="flex-1 overflow-y-auto scrollbar-beauty min-h-0">
                          <LoaderControls
                            controls={propControls}
                            values={loaderConfigs[activeLoader]}
                            onChange={handlePropChange}
                          />
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
