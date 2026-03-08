import { useRef } from "react";
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
          <button
            key={filter}
            onClick={() => onFilterChange(filter)}
            className={`filter-pill ${
              activeFilter === filter ? "filter-pill-active" : "filter-pill-inactive"
            }`}
          >
            {filter}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FilterPills;
