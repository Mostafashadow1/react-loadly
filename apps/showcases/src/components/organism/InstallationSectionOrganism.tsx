import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Check, Copy } from "lucide-react";
import { useState } from "react";

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleCopy}
      className="hover:bg-white/10 text-muted-foreground hover:text-foreground"
    >
      {copied ? (
        <Check className="size-4 text-emerald-400" />
      ) : (
        <Copy className="size-4" />
      )}
    </Button>
  );
}

export function InstallationSection() {
  const packageManagers = [
    { id: "npm", label: "npm", command: "npm install react-loadly" },
    { id: "pnpm", label: "pnpm", command: "pnpm add react-loadly" },
    { id: "yarn", label: "yarn", command: "yarn add react-loadly" },
    { id: "bun", label: "bun", command: "bun add react-loadly" },
  ];

  return (
    <section
      id="installation"
      className="relative py-24 bg-background overflow-hidden border-t border-border/20"
    >
      <div className="absolute inset-0 dot-grid-bg opacity-40 pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Quick Start Installation
          </h2>
          <p className="mt-4 text-muted-foreground">
            Get up and running in under a minute. Follow these simple steps to
            integrate react-loadly into your application.
          </p>
        </div>

        {/* Steps Container */}
        <div className="space-y-12">
          {/* Step 1: Installation */}
          <div className="relative pl-8 sm:pl-12 border-l border-indigo-500/30">
            <div className="absolute left-0 top-0 -translate-x-1/2 flex items-center justify-center size-8 sm:size-10 rounded-xl bg-indigo-500 text-white font-bold text-sm shadow-lg shadow-indigo-500/20">
              1
            </div>

            <div className="mb-6">
              <h3 className="text-xl font-bold flex items-center gap-2">
                Install Package
                <span className="text-xs font-normal text-muted-foreground">
                  (choose your manager)
                </span>
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                Install react-loadly dependency using your preferred package
                manager.
              </p>
            </div>

            <Tabs defaultValue="npm" className="w-full">
              <TabsList className="flex space-x-1.5 p-1 bg-zinc-950/60 border border-zinc-800 rounded-xl max-w-sm mb-4">
                {packageManagers.map((pm) => (
                  <TabsTrigger
                    key={pm.id}
                    value={pm.id}
                    className="flex-1 text-xs py-2 rounded-lg data-[state=active]:bg-zinc-900 data-[state=active]:text-white data-[state=active]:border data-[state=active]:border-zinc-800 transition-all text-muted-foreground hover:text-foreground"
                  >
                    {pm.label}
                  </TabsTrigger>
                ))}
              </TabsList>

              {packageManagers.map((pm) => (
                <TabsContent key={pm.id} value={pm.id} className="mt-0">
                  <div className="relative group">
                    <div className="absolute -inset-px rounded-xl bg-gradient-to-r from-indigo-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                    <div className="flex items-center justify-between bg-zinc-950/80 border border-zinc-800 rounded-xl pl-4 pr-2 py-3 shadow-lg">
                      <div className="flex items-center space-x-3 font-mono text-sm overflow-x-auto scrollbar-none whitespace-nowrap">
                        <span className="text-zinc-600 select-none">$</span>
                        <span className="text-indigo-300">{pm.command}</span>
                      </div>
                      <CopyButton text={pm.command} />
                    </div>
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </div>

          {/* Step 2: Import Styles */}
          <div className="relative pl-8 sm:pl-12 border-l border-indigo-500/30">
            <div className="absolute left-0 top-0 -translate-x-1/2 flex items-center justify-center size-8 sm:size-10 rounded-xl bg-indigo-500 text-white font-bold text-sm shadow-lg shadow-indigo-500/20">
              2
            </div>

            <div className="mb-6">
              <h3 className="text-xl font-bold">Import Global CSS</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Import the styles in your main entry file (e.g.,{" "}
                <code className="text-indigo-400 bg-indigo-400/5 px-1 rounded">
                  main.tsx
                </code>{" "}
                or{" "}
                <code className="text-indigo-400 bg-indigo-400/5 px-1 rounded">
                  _app.tsx
                </code>
                ).
              </p>
            </div>

            <div className="relative group">
              <div className="absolute -inset-px rounded-xl bg-gradient-to-r from-indigo-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

              <div className="flex items-center justify-between bg-zinc-950/80 border border-zinc-800 rounded-xl pl-4 pr-2 py-3 shadow-lg">
                <div className="flex items-center space-x-3 font-mono text-sm overflow-x-auto scrollbar-none whitespace-nowrap">
                  <span className="text-emerald-400">import</span>
                  <span className="text-zinc-300">
                    "react-loadly/styles.css"
                  </span>
                </div>
                <CopyButton text='import "react-loadly/styles.css"' />
              </div>
            </div>
          </div>

          {/* Step 3: Tree-shaking subpaths */}
          <div className="relative pl-8 sm:pl-12">
            <div className="absolute left-0 top-0 -translate-x-1/2 flex items-center justify-center size-8 sm:size-10 rounded-xl bg-indigo-500 text-white font-bold text-sm shadow-lg shadow-indigo-500/20">
              3
            </div>

            <div className="mb-6">
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-bold">Tree-Shakeable Subpaths</h3>
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                Optimized for production. Import hook, loader, and skeleton
                modules directly from their subpaths.
              </p>
            </div>

            <div className="relative group">
              <div className="absolute -inset-px rounded-xl bg-gradient-to-r from-indigo-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

              <div className="bg-zinc-950/80 border border-zinc-800 rounded-xl shadow-lg overflow-hidden">
                {/* Header/Title Bar */}
                <div className="flex items-center justify-between px-4 py-2 bg-zinc-900 border-b border-zinc-800">
                  <div className="flex items-center space-x-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
                    <span className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
                    <span className="text-xs text-zinc-500 font-mono pl-2">
                      App.tsx
                    </span>
                  </div>
                  <CopyButton
                    text={`import { OrbitLoader } from "react-loadly/loaders";\nimport { useLoaderState } from "react-loadly/hooks";\nimport { SkeletonGroup } from "react-loadly/skeleton";`}
                  />
                </div>

                {/* Code Block */}
                <div className="p-4 font-mono text-sm text-zinc-300 leading-relaxed overflow-x-auto scrollbar-none">
                  <div>
                    <span className="text-purple-400">import</span>{" "}
                    <span className="text-zinc-100">{"{ OrbitLoader }"}</span>{" "}
                    <span className="text-purple-400">from</span>{" "}
                    <span className="text-emerald-300">
                      "react-loadly/loaders"
                    </span>
                    <span className="text-zinc-400">;</span>
                  </div>
                  <div>
                    <span className="text-purple-400">import</span>{" "}
                    <span className="text-zinc-100">
                      {"{ useLoaderState }"}
                    </span>{" "}
                    <span className="text-purple-400">from</span>{" "}
                    <span className="text-emerald-300">
                      "react-loadly/hooks"
                    </span>
                    <span className="text-zinc-400">;</span>
                  </div>
                  <div>
                    <span className="text-purple-400">import</span>{" "}
                    <span className="text-zinc-100">{"{ SkeletonGroup }"}</span>{" "}
                    <span className="text-purple-400">from</span>{" "}
                    <span className="text-emerald-300">
                      "react-loadly/skeleton"
                    </span>
                    <span className="text-zinc-400">;</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
