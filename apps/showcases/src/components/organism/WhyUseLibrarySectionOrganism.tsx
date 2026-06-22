"use client";

import { motion } from "framer-motion";
import { Zap, Palette, Heart, Sparkles } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export function WhyUseLibrarySection() {
  const metrics = [
    {
      icon: Zap,
      title: "Boost Development Velocity",
      desc: "Implement modern loading indicators in seconds rather than hours of CSS tinkering. Get standard configurations out of the box.",
      iconBg: "bg-indigo-500/10 text-indigo-400 border border-indigo-500/20",
    },
    {
      icon: Palette,
      title: "Pixel-Perfect UX Consistency",
      desc: "Ensure all loaders adapt to your theme palette seamlessly. Supports custom size multipliers and animations that run at 60 FPS.",
      iconBg: "bg-purple-500/10 text-purple-400 border border-purple-500/20",
    },
    {
      icon: Heart,
      title: "Optimize Perceived Latency",
      desc: "Leverage useSkeletonState stabilizer hooks to enforce minimum visible state displays, preventing annoying layout flickers.",
      iconBg: "bg-pink-500/10 text-pink-400 border border-pink-500/20",
    },
  ];

  return (
    <section className="relative py-24 bg-background overflow-hidden border-t border-border/20">
      <div className="absolute inset-0 dot-grid-bg opacity-30 pointer-events-none" />
      <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-purple-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full border border-indigo-500/20 bg-indigo-500/5 text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <Sparkles className="size-3.5" />
            <span>Developer Experience First</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Why Choose React Loadly?
          </h2>
          <p className="mt-4 text-base text-muted-foreground">
            A comprehensive solution built to improve both developer productivity and user satisfaction.
          </p>
        </motion.div>

        {/* Metric Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {metrics.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="group"
            >
              <Card className="h-full border border-border/30 bg-card/40 backdrop-blur-md rounded-2xl p-6 transition-all duration-300 hover:border-white/10 hover:shadow-xl hover:shadow-indigo-500/5 flex flex-col items-center text-center">
                <CardContent className="p-0 flex flex-col items-center">
                  <div className={`size-14 rounded-2xl flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110 ${item.iconBg}`}>
                    <item.icon className="size-7" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-3">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    {item.desc}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
