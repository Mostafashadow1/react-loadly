import { Github, Package, ExternalLink, Heart } from "lucide-react";

export function FooterSection() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-zinc-950 text-zinc-400 border-t border-border/20 pt-20 pb-10 overflow-hidden">
      <div className="absolute inset-0 dot-grid-bg opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top Section: Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 pb-16 border-b border-border/20">
          {/* Column 1: Brand & Info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center space-x-2.5">
              <span className="text-xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                ⚛ react-loadly
              </span>
              <span className="px-2 py-0.5 text-[9px] font-bold bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 rounded-full uppercase tracking-wider">
                v3.0.1
              </span>
            </div>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed max-w-sm">
              A premium, high-performance loading state and skeleton framework
              for the modern React ecosystem. Designed for speed, accessibility,
              and zero-configuration setups.
            </p>
            <div className="flex items-center space-x-3 pt-2">
              <a
                href="https://github.com/Mostafashadow1/react-loadly"
                target="_blank"
                rel="noopener noreferrer"
                className="size-9 rounded-xl border border-zinc-800 bg-zinc-900/60 hover:bg-zinc-800 text-zinc-300 hover:text-white flex items-center justify-center transition-all"
              >
                <Github className="size-4.5" />
              </a>
              <a
                href="https://www.npmjs.com/package/react-loadly"
                target="_blank"
                rel="noopener noreferrer"
                className="size-9 rounded-xl border border-zinc-800 bg-zinc-900/60 hover:bg-zinc-800 text-zinc-300 hover:text-white flex items-center justify-center transition-all"
              >
                <Package className="size-4.5" />
              </a>
            </div>
          </div>

          {/* Column 2: Navigation */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <a
                  href="#overview"
                  className="hover:text-white transition-colors"
                >
                  Overview
                </a>
              </li>
              <li>
                <a
                  href="#installation"
                  className="hover:text-white transition-colors"
                >
                  Installation
                </a>
              </li>
              <li>
                <a
                  href="#features"
                  className="hover:text-white transition-colors"
                >
                  Features
                </a>
              </li>
              <li>
                <a
                  href="#skeleton-library"
                  className="hover:text-white transition-colors"
                >
                  Skeleton Showcase
                </a>
              </li>
              <li>
                <a
                  href="#loaders"
                  className="hover:text-white transition-colors"
                >
                  Loaders Showcase
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Resources */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Resources
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <a
                  href="https://github.com/Mostafashadow1/react-loadly"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 hover:text-white transition-colors"
                >
                  <span>GitHub Repository</span>
                  <ExternalLink className="size-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.npmjs.com/package/react-loadly"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 hover:text-white transition-colors"
                >
                  <span>NPM Registry</span>
                  <ExternalLink className="size-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/Mostafashadow1/react-loadly/blob/main/LICENSE"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  MIT License
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/Mostafashadow1/react-loadly/issues"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Submit Issue / Feedback
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div>© {currentYear} react-loadly. All rights reserved.</div>
          <div className="flex items-center gap-1 text-zinc-500 font-medium">
            <span>Made with</span>
            <Heart className="size-3.5 text-rose-500 fill-rose-500" />
            <span>by</span>
            <a
              href="https://github.com/Mostafashadow1"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-300 hover:text-white font-semibold underline underline-offset-4"
            >
              Mostafashadow1
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
