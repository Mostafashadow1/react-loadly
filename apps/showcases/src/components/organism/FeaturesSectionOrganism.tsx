import React from "react";
import { Zap, Layers, Shield, Cpu, Clock, Sparkles, Accessibility } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  desc: string;
  badge?: string;
  className?: string;
  glowColor: string;
  iconBg: string;
  iconColor: string;
}

function FeatureCard({
  icon: Icon,
  title,
  desc,
  badge,
  className = "",
  glowColor,
  iconBg,
  iconColor,
}: FeatureCardProps) {
  return (
    <div
      className={`relative rounded-2xl border border-border/30 bg-card/40 backdrop-blur-md p-6 overflow-hidden group hover:border-white/10 transition-all duration-300 ${className}`}
    >
      {/* Background glow hover effect */}
      <div className={`absolute -inset-px bg-gradient-to-r ${glowColor} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl`} />
      
      <div className="relative z-10 flex flex-col h-full justify-between">
        <div>
          {/* Top Row: Icon + Optional Badge */}
          <div className="flex items-center justify-between mb-4">
            <div className={`size-12 rounded-xl flex items-center justify-center ${iconBg} ${iconColor} transition-transform duration-300 group-hover:scale-110`}>
              <Icon className="size-6" />
            </div>
            {badge && (
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 uppercase tracking-wider animate-shimmer-badge">
                {badge}
              </span>
            )}
          </div>

          <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-white transition-colors">
            {title}
          </h3>
          <p className="text-sm leading-relaxed text-muted-foreground group-hover:text-muted-foreground/90">
            {desc}
          </p>
        </div>
      </div>
    </div>
  );
}

export function FeaturesSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section id="features" className="relative py-24 bg-background overflow-hidden border-t border-border/20">
      <div className="absolute inset-0 dot-grid-bg opacity-30 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
              Powerful Core Features
            </h2>
            <p className="mt-4 text-base sm:text-lg text-muted-foreground">
              Redesigned from the ground up for maximum speed, type-safety, and smooth animations.
            </p>
          </motion.div>
        </div>

        {/* Bento Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {/* Card 1: Skeleton patterns (Large) */}
          <motion.div variants={itemVariants} className="col-span-1 md:col-span-2">
            <FeatureCard
              icon={Sparkles}
              badge="Production"
              title="Skeleton-First Loading Patterns"
              desc="Build intentional loading states with SkeletonLoader and SkeletonGroup. These patterns are predictable, accessible, SSR-friendly, and recommended for production-critical screens."
              glowColor="from-indigo-500/10 via-purple-500/10 to-transparent"
              iconBg="bg-indigo-500/10"
              iconColor="text-indigo-400"
              className="h-full"
            />
          </motion.div>

          {/* Card 2: TypeScript Guards (Small) */}
          <motion.div variants={itemVariants} className="col-span-1">
            <FeatureCard
              icon={Shield}
              badge="Guaranteed"
              title="TypeScript Type Guards"
              desc="Deep compile-time safety. Ships with dedicated interfaces (IBaseLoaderProps, IGeometricLoaderProps) and type-checking functions for zero prop bugs."
              glowColor="from-emerald-500/10 via-teal-500/10 to-transparent"
              iconBg="bg-emerald-500/10"
              iconColor="text-emerald-400"
              className="h-full"
            />
          </motion.div>

          {/* Card 3: LoadlyProvider (Small) */}
          <motion.div variants={itemVariants} className="col-span-1">
            <FeatureCard
              icon={Layers}
              badge="Global"
              title="Modern Loader System"
              desc="Use premium spinners, rings, dots, signals, equalizers, and content loaders with consistent size, color, speed, fullscreen, and loading controls."
              glowColor="from-pink-500/10 via-purple-500/10 to-transparent"
              iconBg="bg-pink-500/10"
              iconColor="text-pink-400"
              className="h-full"
            />
          </motion.div>

          {/* Card 4: SkeletonGroup (Small) */}
          <motion.div variants={itemVariants} className="col-span-1">
            <FeatureCard
              icon={Cpu}
              badge="Sync"
              title="SkeletonGroup"
              desc="Coordinate multiple skeleton placeholders with synchronized shimmer timing and clean staggered motion."
              glowColor="from-amber-500/10 via-orange-500/10 to-transparent"
              iconBg="bg-amber-500/10"
              iconColor="text-amber-400"
              className="h-full"
            />
          </motion.div>

          {/* Card 5: useSkeletonState (Small) */}
          <motion.div variants={itemVariants} className="col-span-1">
            <FeatureCard
              icon={Clock}
              badge="Hook"
              title="useSkeletonState"
              desc="Manage complex loading, error, and success flows. Features built-in minimum display time (minDisplayTime) to avoid visual flicker during quick API hits."
              glowColor="from-blue-500/10 via-indigo-500/10 to-transparent"
              iconBg="bg-blue-500/10"
              iconColor="text-blue-400"
              className="h-full"
            />
          </motion.div>

          {/* Card 6: Performance (Large) */}
          <motion.div variants={itemVariants} className="col-span-1 md:col-span-2">
            <FeatureCard
              icon={Zap}
              badge="Optimized"
              title="Hardware-Accelerated Performance"
              desc="Each component is designed around CSS-driven animation, reduced-motion support, and tree-shakeable subpath exports so production apps ship only what they use."
              glowColor="from-purple-500/10 via-indigo-500/10 to-transparent"
              iconBg="bg-purple-500/10"
              iconColor="text-purple-400"
              className="h-full"
            />
          </motion.div>

          {/* Card 7: Accessibility (Large - centering) */}
          <motion.div variants={itemVariants} className="col-span-1 md:col-span-3">
            <div className="relative rounded-2xl border border-border/30 bg-card/40 backdrop-blur-md p-6 overflow-hidden group hover:border-white/10 transition-all duration-300">
              <div className="absolute -inset-px bg-gradient-to-r from-emerald-500/5 via-indigo-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl" />
              <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <div className="size-12 rounded-xl flex items-center justify-center bg-emerald-500/10 text-emerald-400 shrink-0">
                    <Accessibility className="size-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground">WCAG 2.1 Compliant Accessibility</h3>
                    <p className="text-sm text-muted-foreground mt-1 max-w-2xl">
                      Every loading indicator is designed with correct ARIA attributes (role="progressbar", aria-valuemin, etc.) and hidden text fallback, ensuring screen readers explain status changes to all users.
                    </p>
                  </div>
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 whitespace-nowrap">
                  Aria Ready
                </span>
              </div>
            </div>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}
