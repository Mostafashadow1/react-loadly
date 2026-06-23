import { Button } from "@/components/ui/button";
import { Github, Package, Play, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import {
  OrbitLoader,
  ProgressRingLoader,
  GradientRingLoader,
  SignalLoader,
  EqualizerLoader,
  CardFlipLoader,
} from "react-loadly";

export function HeroSection() {
  const previewLoaders = [
    {
      component: GradientRingLoader,
      name: "Gradient Ring",
      color: "#6366f1",
      props: { secondaryColor: "#ec4899" },
    },
    {
      component: OrbitLoader,
      name: "Orbit",
      color: "#22c55e",
      props: { secondaryColor: "#a3e635" },
    },
    {
      component: ProgressRingLoader,
      name: "Progress Ring",
      color: "#f59e0b",
      props: { progress: 65 },
    },
    {
      component: SignalLoader,
      name: "Signal",
      color: "#38bdf8",
      props: { secondaryColor: "#818cf8" },
    },
    {
      component: EqualizerLoader,
      name: "Equalizer",
      color: "#a855f7",
      props: { secondaryColor: "#ec4899" },
    },
    {
      component: CardFlipLoader,
      name: "Card Flip",
      color: "#14b8a6",
      props: { secondaryColor: "#6366f1" },
    },
  ];

  return (
    <section
      id="overview"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-background pt-28 pb-16"
    >
      {/* Background patterns and glowing effects */}
      <div className="absolute inset-0 dot-grid-bg opacity-70 pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-primary/20 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[300px] h-[300px] bg-indigo-500/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="flex flex-col items-center text-center">
          {/* Version badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full border border-primary/25 bg-primary/5 text-primary text-xs font-semibold uppercase tracking-wider animate-shimmer-badge"
          >
            <Sparkles className="size-3.5 text-indigo-400 animate-pulse" />
            <span>Reliable React Loading Experience Toolkit</span>
            <span className="h-1.5 w-1.5 rounded-full bg-indigo-500 animate-ping" />
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-6 text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight max-w-5xl leading-tight sm:leading-none"
          >
            Reliable React Loading
            <span className="block mt-2 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Experience Toolkit
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 max-w-3xl text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed"
          >
            Modern loaders, SkeletonLoader, SkeletonGroupLoader, loading state hooks,
            accessibility, SSR support, and production-ready loading patterns for
            React 17, React 18, React 19, Next.js 14, Next.js 15, and Next.js 16.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-10 flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
          >
            <Button
              onClick={() =>
                document
                  .getElementById("loaders")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              size="lg"
              className="px-8 py-6 rounded-xl font-bold bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
            >
              <Play className="mr-2 size-4 fill-current" />
              Explore Loaders
            </Button>

            <a
              href="https://www.npmjs.com/package/react-loadly"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-3 rounded-xl font-bold bg-indigo-600 text-white hover:bg-indigo-500 hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              <Package className="mr-2 size-4" />
              npm Package
            </a>

            <a
              href="https://github.com/Mostafashadow1/react-loadly"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-3 rounded-xl font-bold bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white hover:bg-zinc-800 hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              <Github className="mr-2 size-4" />
              Star on GitHub
            </a>
          </motion.div>

          {/* Stats Bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-16 w-full max-w-5xl border border-border/30 bg-card/30 backdrop-blur-md rounded-2xl p-4 sm:p-6 grid grid-cols-2 md:grid-cols-6 gap-4 divide-y md:divide-y-0 md:divide-x divide-border/20 text-center"
          >
            <div className="flex flex-col justify-center p-2">
              <span className="text-xl sm:text-2xl font-bold text-foreground">
                35+
              </span>
              <span className="text-xs text-muted-foreground mt-1">
                Loaders
              </span>
            </div>
            <div className="flex flex-col justify-center p-2 pt-4 md:pt-2">
              <span className="text-xl sm:text-2xl font-bold text-foreground">
                100%
              </span>
              <span className="text-xs text-muted-foreground mt-1">
                Type safe
              </span>
            </div>
            <div className="flex flex-col justify-center p-2 pt-4 md:pt-2">
              <span className="text-xl sm:text-2xl font-bold text-foreground">
                SSR
              </span>
              <span className="text-xs text-muted-foreground mt-1">
                SSR ready
              </span>
            </div>
            <div className="flex flex-col justify-center p-2 pt-4 md:pt-2">
              <span className="text-xl sm:text-2xl font-bold text-foreground">
                ARIA
              </span>
              <span className="text-xs text-muted-foreground mt-1">
                Accessible
              </span>
            </div>
            <div className="flex flex-col justify-center p-2 pt-4 md:pt-2">
              <span className="text-xl sm:text-2xl font-bold text-foreground">
                R17-19
              </span>
              <span className="text-xs text-muted-foreground mt-1">
                React support
              </span>
            </div>
            <div className="flex flex-col justify-center p-2 pt-4 md:pt-2">
              <span className="text-xl sm:text-2xl font-bold text-foreground">
                N14-16
              </span>
              <span className="text-xs text-muted-foreground mt-1">
                Next.js support
              </span>
            </div>
          </motion.div>

          {/* Live Loader Preview Strip */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-20 w-full max-w-5xl"
          >
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/60 mb-6">
              Live Preview
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {previewLoaders.map((loader, idx) => {
                const Component = loader.component;
                return (
                  <div
                    key={idx}
                    className="flex flex-col items-center justify-center p-6 rounded-2xl glass-card relative group hover:-translate-y-1 transition-all duration-300"
                  >
                    <div className="absolute -inset-px rounded-2xl bg-gradient-to-b from-indigo-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                    <div className="h-16 flex items-center justify-center mb-4">
                      <Component
                        size={40}
                        color={loader.color}
                        {...(loader.props || {})}
                      />
                    </div>

                    <span className="text-xs font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                      {loader.name}
                    </span>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
