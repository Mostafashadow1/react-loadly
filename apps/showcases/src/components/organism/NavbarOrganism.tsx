import React, { useState, useEffect } from "react";
import { Github, Menu, X, Layers, Code, Play, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/react-loadly-logo.png";
export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Overview", href: "#overview", icon: Layers },
    { name: "Installation", href: "#installation", icon: Code },
    { name: "Features", href: "#features", icon: CpuIcon },
    {
      name: "Skeleton Showcase",
      href: "#skeleton-library",
      icon: Play,
    },
    { name: "AutoSkeleton", href: "#playground", icon: ShieldIcon },
    { name: "Loaders", href: "#loaders", icon: GridIcon },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/80 backdrop-blur-md border-b border-border/40 py-3 shadow-lg"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center  group">
            <img
              src={logo}
              alt="React Loadly"
              className="h-10 w-auto max-w-[150px] object-contain transition-opacity duration-300 group-hover:opacity-90 sm:h-12 sm:max-w-[180px] scale-105"
            />
            <span className="px-2 py-0.5 text-md font-semibold tracking-wider text-indigo-300 bg-indigo-500/10 border border-indigo-500/20 rounded-full uppercase">
              React Loadly
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="px-3.5 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-white/5 rounded-lg transition-all duration-200"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-3">
            <a
              href="https://github.com/Mostafashadow1/react-loadly"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 text-xs font-semibold text-zinc-300 bg-zinc-900 border border-zinc-800 rounded-lg hover:bg-zinc-800 hover:text-white transition-all"
            >
              <Github className="size-3.5" />
              <span>Star</span>
              <span className="h-3 w-px bg-zinc-700 mx-1" />
              <Star className="size-3 text-amber-400 fill-amber-400" />
            </a>

            <a
              href="https://www.npmjs.com/package/react-loadly"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 text-xs font-semibold text-zinc-300 bg-zinc-900 border border-zinc-800 rounded-lg hover:bg-zinc-800 hover:text-white transition-all"
            >
              <span className="text-red-400 font-bold font-mono">npm</span>
              <span>v3.0.1</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              className="text-muted-foreground hover:text-foreground"
            >
              {isOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-background/95 backdrop-blur-lg border-b border-border/40 py-4 px-6 space-y-3 animate-in fade-in slide-in-from-top-5 duration-200">
          <nav className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="flex items-center space-x-3 px-3 py-2.5 text-base font-medium text-muted-foreground hover:text-foreground hover:bg-white/5 rounded-lg transition-all"
              >
                <link.icon className="size-4 text-indigo-400" />
                <span>{link.name}</span>
              </a>
            ))}
          </nav>

          <div className="h-px bg-border/40 my-3" />

          <div className="grid grid-cols-2 gap-3 pt-1">
            <a
              href="https://github.com/Mostafashadow1/react-loadly"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center space-x-2 py-2 px-3 text-sm font-semibold text-zinc-300 bg-zinc-900 border border-zinc-800 rounded-lg hover:bg-zinc-800 hover:text-white transition-all"
            >
              <Github className="size-4" />
              <span>GitHub</span>
            </a>
            <a
              href="https://www.npmjs.com/package/react-loadly"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center space-x-2 py-2 px-3 text-sm font-semibold text-zinc-300 bg-zinc-900 border border-zinc-800 rounded-lg hover:bg-zinc-800 hover:text-white transition-all"
            >
              <span className="text-red-400 font-bold font-mono">npm</span>
              <span>v3.0.1</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

// Simple icons for replacement if Cpu or Grid are not standard in current lucide-react version
function CpuIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <rect x="9" y="9" width="6" height="6" rx="1" />
      <path d="M9 1v3" />
      <path d="M15 1v3" />
      <path d="M9 20v3" />
      <path d="M15 20v3" />
      <path d="M20 9h3" />
      <path d="M20 15h3" />
      <path d="M1 9h3" />
      <path d="M1 15h3" />
    </svg>
  );
}

function GridIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <rect x="3" y="3" width="7" height="7" />
      <rect x="14" y="3" width="7" height="7" />
      <rect x="14" y="14" width="7" height="7" />
      <rect x="3" y="14" width="7" height="7" />
    </svg>
  );
}

function ShieldIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.68 0C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
    </svg>
  );
}
