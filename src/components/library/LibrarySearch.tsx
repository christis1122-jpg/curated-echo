import { Search, SlidersHorizontal, X } from "lucide-react";
import { useState } from "react";
import { ALL_TAGS } from "@/data/library";

interface LibrarySearchProps {
  query: string;
  onQueryChange: (q: string) => void;
  activeTag: string | null;
  onTagChange: (tag: string | null) => void;
}

const LibrarySearch = ({ query, onQueryChange, activeTag, onTagChange }: LibrarySearchProps) => {
  const [showFilters, setShowFilters] = useState(false);

  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        <div className="flex-1 relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            placeholder="Search notes, highlights, articles..."
            className="w-full pl-9 pr-3 py-2.5 bg-secondary/50 border border-border rounded-xl text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 font-sans"
          />
          {query && (
            <button onClick={() => onQueryChange("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
              <X size={14} />
            </button>
          )}
        </div>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`p-2.5 rounded-xl border transition-colors ${showFilters ? "bg-primary text-primary-foreground border-primary" : "bg-secondary/50 border-border text-muted-foreground hover:text-foreground"}`}
        >
          <SlidersHorizontal size={16} />
        </button>
      </div>

      {showFilters && (
        <div className="flex flex-wrap gap-1.5">
          {ALL_TAGS.slice(0, 12).map((tag) => (
            <button
              key={tag}
              onClick={() => onTagChange(activeTag === tag ? null : tag)}
              className={`text-xs px-2.5 py-1 rounded-full border transition-all ${
                activeTag === tag
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-card border-border text-muted-foreground hover:border-primary/40"
              }`}
            >
              #{tag}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LibrarySearch;
