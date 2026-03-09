import { useRef } from "react";
import { motion } from "framer-motion";
import { FILTERS } from "@/data/articles";

interface FilterPillsProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

const FilterPills = ({ activeFilter, onFilterChange }: FilterPillsProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <div className="sticky top-[57px] z-40 bg-background/80 backdrop-blur-xl border-b border-border">
      <div
        ref={scrollRef}
        className="flex gap-2 px-5 py-3 overflow-x-auto scrollbar-hide max-w-2xl mx-auto"
      >
        {FILTERS.map((filter) => (
          <motion.button
            key={filter}
            onClick={() => onFilterChange(filter)}
            whileTap={{ scale: 0.92 }}
            className={`relative filter-pill ${
              activeFilter === filter ? "filter-pill-active" : "filter-pill-inactive"
            }`}
          >
            {filter}
            {activeFilter === filter && (
              <motion.div
                layoutId="filterPillIndicator"
                className="absolute inset-0 rounded-full bg-primary/10 border border-primary/20"
                transition={{ type: "spring", stiffness: 400, damping: 28 }}
              />
            )}
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default FilterPills;
