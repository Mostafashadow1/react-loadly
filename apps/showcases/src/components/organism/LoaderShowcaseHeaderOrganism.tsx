import PropsHighlight from '../molecules/PropsHighlightMolecule'
import { motion } from "framer-motion";

interface LoaderShowcaseHeaderProps {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  totalCount: number;
}

const LoaderShowcaseHeader = ({
  selectedCategory,
  setSelectedCategory,
  totalCount,
}: LoaderShowcaseHeaderProps) => {
  const categories = ["All", "Geometric", "Skeleton", "Organic", "Flexible", "New ✨"];

  return (
    <div className="text-center mb-12">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
          Explore Loader Collection
        </h2>
        <p className="mt-4 text-base text-muted-foreground max-w-3xl mx-auto mb-8">
          Interactive catalog of lightweight, customizable, and accessible loading components. 
          Click on any loader card to tweak props and generate custom JSX snippets.
        </p>
      </motion.div>

      {/* Common Props Highlight */}
      <PropsHighlight />

      {/* Filter Tabs & Count */}
      <div className="mt-10 flex flex-col md:flex-row items-center justify-between gap-4 max-w-5xl mx-auto bg-zinc-950/40 border border-zinc-800 p-2.5 rounded-2xl">
        <div className="flex flex-wrap items-center justify-center gap-1.5 w-full md:w-auto">
          {categories.map((category) => {
            const isSelected = selectedCategory === category;
            return (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 text-xs font-semibold rounded-xl border transition-all duration-200 ${
                  isSelected
                    ? "bg-indigo-600 border-indigo-500 text-white shadow-md shadow-indigo-500/10"
                    : "bg-transparent border-transparent text-muted-foreground hover:text-foreground hover:bg-zinc-900/50"
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>

        <div className="px-4 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs font-mono text-indigo-300 shrink-0">
          Showing <span className="font-bold text-white">{totalCount}</span> loaders
        </div>
      </div>
    </div>
  );
};

export default LoaderShowcaseHeader;