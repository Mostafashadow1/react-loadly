import { useState } from "react";
import { Shield, Code, ChevronRight, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

interface InterfaceDetail {
  name: string;
  description: string;
  code: string;
  extendsFrom?: string;
}

export function TypeGuardsSection() {
  const [selectedInterface, setSelectedInterface] = useState("IBaseLoaderProps");
  const [copied, setCopied] = useState(false);

  const interfaces: Record<string, InterfaceDetail> = {
    IBaseLoaderProps: {
      name: "IBaseLoaderProps",
      description: "The foundation interface inherited by all loaders in react-loadly. Configures default variables.",
      code: `interface IBaseLoaderProps {
  size?: number | string;      // Height/width of the loader (default: 40)
  color?: string;            // Primary hex or RGB color (default: currentColor)
  speed?: number;            // Animation speed multiplier (default: 1)
  className?: string;        // Optional wrapper CSS classes
  style?: React.CSSProperties; // Optional inline styles
  "aria-label"?: string;     // Accessibility text (default: "loading...")
}`,
    },
    IGeometricLoaderProps: {
      name: "IGeometricLoaderProps",
      extendsFrom: "IBaseLoaderProps",
      description: "Used by geometric loaders (e.g. Ring, Grid, Stair) supporting additional structural nodes.",
      code: `interface IGeometricLoaderProps extends IBaseLoaderProps {
  count?: number;            // Number of geometric items/nodes in animation
  borderWidth?: number;      // Stroke/border width of nodes (default: 2)
  secondaryColor?: string;   // Secondary track/background color
}`,
    },
    ISkeletonLoaderProps: {
      name: "ISkeletonLoaderProps",
      extendsFrom: "IBaseLoaderProps",
      description: "Controls customization of custom skeleton lines and shimmer waves.",
      code: `interface ISkeletonLoaderProps extends IBaseLoaderProps {
  variant?: "text" | "avatar" | "image" | "rect" | "circle";
  shimmer?: boolean;         // Enable shimmer gradient wave
  shimmerColor?: string;     // Shimmer light/wave hex color
  highlightColor?: string;   // Background highlight hex color
  spacing?: number | string; // Gap spacing between lines
  borderRadius?: string;     // Border-radius override
  lines?: number;            // Number of skeleton text rows (default: 1)
  waveDirection?: "ltr" | "rtl"; // Shimmer flow direction
  waveWidth?: number;        // Shimmer gradient wave width
}`,
    },
    IUseLoaderStateReturn: {
      name: "IUseLoaderStateReturn",
      description: "The type signature returned by the useLoaderState hook, assisting stable loading state flows.",
      code: `interface IUseLoaderStateReturn {
  isLoading: boolean;        // Active loading state
  error: Error | null;       // Operation error description if failed
  retryCount: number;        // Running total of retries completed
  retry: () => void;         // Handler to trigger operation retry manually
  reset: () => void;         // Reset loading and error indicators
}`,
    },
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(interfaces[selectedInterface].code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <section id="type-guards" className="relative py-24 bg-background overflow-hidden border-t border-border/20">
      <div className="absolute inset-0 dot-grid-bg opacity-30 pointer-events-none" />
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[350px] h-[350px] bg-emerald-500/10 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full border border-emerald-500/20 bg-emerald-500/5 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <Shield className="size-3.5" />
            <span>Type Safe by Design</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            TypeScript Types & Interfaces
          </h2>
          <p className="mt-4 text-muted-foreground">
            No more guess-work. Every loader is compiled with strong types and clean interfaces that seamlessly match your editor autocomplete.
          </p>
        </div>

        {/* Interface Explorer Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Selector */}
          <div className="space-y-2 lg:col-span-1">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4 px-2">
              Select Interface
            </p>
            {Object.keys(interfaces).map((key) => {
              const item = interfaces[key];
              const isSelected = selectedInterface === key;
              return (
                <button
                  key={key}
                  onClick={() => {
                    setSelectedInterface(key);
                    setCopied(false);
                  }}
                  className={`w-full flex items-center justify-between p-4 rounded-xl border text-left transition-all duration-200 ${
                    isSelected
                      ? "bg-emerald-500/5 border-emerald-500/30 text-white font-medium shadow-md shadow-emerald-500/5"
                      : "bg-card/40 border-border/30 text-muted-foreground hover:bg-zinc-900/60 hover:text-foreground"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Code className={`size-4.5 ${isSelected ? "text-emerald-400" : "text-zinc-500"}`} />
                    <div>
                      <span className="block text-sm font-semibold">{item.name}</span>
                      {item.extendsFrom && (
                        <span className="text-[10px] text-zinc-500 font-mono">
                          extends {item.extendsFrom}
                        </span>
                      )}
                    </div>
                  </div>
                  <ChevronRight className={`size-4 transition-transform duration-200 ${isSelected ? "text-emerald-400 translate-x-1" : "text-zinc-600"}`} />
                </button>
              );
            })}
          </div>

          {/* Right Column: Code Display */}
          <div className="lg:col-span-2">
            <div className="bg-zinc-950/80 border border-zinc-800 rounded-2xl shadow-xl overflow-hidden h-full flex flex-col justify-between">
              
              {/* Card Header */}
              <div>
                <div className="flex items-center justify-between px-5 py-3 bg-zinc-900 border-b border-zinc-800">
                  <div className="flex items-center space-x-2">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 uppercase tracking-wider font-mono">
                      TS Interface
                    </span>
                    <span className="text-xs text-zinc-400 font-mono">
                      {interfaces[selectedInterface].name}.ts
                    </span>
                  </div>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleCopy}
                    className="h-8 hover:bg-white/5 text-zinc-400 hover:text-white"
                  >
                    {copied ? (
                      <>
                        <Check className="size-3.5 text-emerald-400 mr-1.5" />
                        <span className="text-xs font-semibold text-emerald-400">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="size-3.5 mr-1.5" />
                        <span className="text-xs font-semibold">Copy snippet</span>
                      </>
                    )}
                  </Button>
                </div>
                
                {/* Description bar */}
                <div className="px-6 py-4 bg-zinc-900/30 border-b border-zinc-800/40">
                  <p className="text-sm text-zinc-400">
                    {interfaces[selectedInterface].description}
                  </p>
                </div>
              </div>

              {/* Code Area */}
              <div className="p-6 font-mono text-sm leading-relaxed text-zinc-300 overflow-x-auto h-full flex items-center">
                <pre className="w-full text-zinc-200">
                  {interfaces[selectedInterface].code.split("\n").map((line, i) => {
                    // Let's do some light syntax color highlight simulation
                    const isComment = line.trim().startsWith("//");
                    if (isComment) {
                      return (
                        <div key={i} className="text-zinc-500 italic">
                          {line}
                        </div>
                      );
                    }
                    
                    // Simple replacement highlighter
                    let rendered = line;
                    
                    // Highlight typescript modifiers
                    rendered = rendered.replace(/\b(interface|extends)\b/g, '<span class="text-purple-400 font-semibold">$1</span>');
                    // Highlight properties
                    rendered = rendered.replace(/(\w+\??)(?=:)/g, '<span class="text-indigo-300">$1</span>');
                    // Highlight types
                    rendered = rendered.replace(/(:\s*)(\w+|"[^"]+"( \| "[^"]+")*|React\.CSSProperties)/g, '$1<span class="text-pink-400 font-medium">$2</span>');

                    return (
                      <div
                        key={i}
                        dangerouslySetInnerHTML={{ __html: rendered }}
                      />
                    );
                  })}
                </pre>
              </div>

              {/* Footer text */}
              <div className="px-6 py-3 bg-zinc-900/10 border-t border-zinc-800/40 text-center">
                <p className="text-[11px] text-zinc-500 font-mono">
                  Guaranteed safe tree-shaking with modern bundlers (Webpack, Vite, Rollup, Turbo)
                </p>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
