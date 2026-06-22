import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Cpu, Zap, Box, Check } from "lucide-react";
import { motion } from "framer-motion";

export function PerformanceBestPracticesSection() {
  const performanceFeatures = [
    {
      icon: Cpu,
      title: "CSS Containment",
      desc: "Each loader is isolated using the CSS containment property (contain: layout style paint). This restricts layout/paint changes to the loader block, preventing full page reflows.",
      highlight: "Reflow shield: contain: layout style paint",
      bgClass: "bg-indigo-500/5 border-indigo-500/20 text-indigo-300",
      iconBg: "bg-indigo-500/10 text-indigo-400",
    },
    {
      icon: Zap,
      title: "WeakMap Cache",
      desc: "Our AutoSkeletonLoader utilizes React Ref mapping cache structures back-stopped by WeakMap. DOM clones are cached and garbage collected automatically, ensuring 0ms overhead.",
      highlight: "WeakMap Caching: 0ms garbage collection",
      bgClass: "bg-emerald-500/5 border-emerald-500/20 text-emerald-400",
      iconBg: "bg-emerald-500/10 text-emerald-400",
    },
    {
      icon: Box,
      title: "Subpath Tree-Shaking",
      desc: "V3 exports loaders, hooks, and skeletons as individual ESM subpath modules. Your bundler easily excludes unused components, leaving a production bundle size under 1KB.",
      highlight: "Shaked Bundle size: < 1KB per import",
      bgClass: "bg-purple-500/5 border-purple-500/20 text-purple-400",
      iconBg: "bg-purple-500/10 text-purple-400",
    },
  ];

  return (
    <section id="performance" className="relative py-24 bg-background overflow-hidden border-t border-border/20">
      <div className="absolute inset-0 dot-grid-bg opacity-30 pointer-events-none" />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Performance & Best Practices
          </h2>
          <p className="mt-4 text-base text-muted-foreground">
            Engineered for high performance, layout stability, and minimal production bundle size.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {performanceFeatures.map((feat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full relative border border-border/30 bg-card/40 backdrop-blur-md rounded-2xl overflow-hidden hover:border-white/10 transition-all duration-300">
                <CardHeader className="pb-3">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${feat.iconBg}`}>
                    <feat.icon className="size-6" />
                  </div>
                  <CardTitle className="text-lg font-bold text-white">
                    {feat.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <CardDescription className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    {feat.desc}
                  </CardDescription>
                  <div className={`p-3 rounded-xl border text-[11px] font-mono ${feat.bgClass}`}>
                    {feat.highlight}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Best Practices checklist */}
        <div className="mt-16 max-w-4xl mx-auto">
          <Card className="border border-border/30 bg-card/40 backdrop-blur-md rounded-2xl overflow-hidden">
            <CardHeader className="p-6 border-b border-border/20">
              <CardTitle className="text-xl font-bold">
                Standards-Compliant Architecture
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  {
                    bold: "Strict TypeScript Compliance",
                    text: "Guarantees complete safety with type guards and exported compiler typings.",
                  },
                  {
                    bold: "Next.js & SSR Ready",
                    text: "Fully compatible with Server Component hydration models without hydration mismatches.",
                  },
                  {
                    bold: "Aria progressbar support",
                    text: "Conforms to W3C ARIA standard specifications to enhance assistive readers.",
                  },
                  {
                    bold: "Layout Shift Shields",
                    text: "CSS containment properties shield against cumulative layout shift (CLS) penalties.",
                  },
                ].map((item, i) => (
                  <li key={i} className="flex items-start space-x-3 text-sm">
                    <div className="flex-shrink-0 size-5 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mt-0.5">
                      <Check className="size-3 text-emerald-400" />
                    </div>
                    <div>
                      <span className="font-semibold text-foreground block">{item.bold}</span>
                      <span className="text-muted-foreground text-xs leading-relaxed mt-0.5 block">{item.text}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

      </div>
    </section>
  );
}
