import { BookOpen, Highlighter, Sparkles, Archive } from "lucide-react";

type LibraryView = "reads" | "notes" | "highlights" | "threads";

interface ViewToggleProps {
  active: LibraryView;
  onChange: (view: LibraryView) => void;
  counts: { reads: number; notes: number; highlights: number; threads: number };
}

const views: { key: LibraryView; label: string; icon: React.ElementType }[] = [
  { key: "reads", label: "Reads", icon: Archive },
  { key: "notes", label: "Notes", icon: BookOpen },
  { key: "highlights", label: "Highlights", icon: Highlighter },
  { key: "threads", label: "Threads", icon: Sparkles },
];

const ViewToggle = ({ active, onChange, counts }: ViewToggleProps) => {
  return (
    <div className="flex bg-secondary/50 rounded-xl p-1 border border-border">
      {views.map(({ key, label, icon: Icon }) => (
        <button
          key={key}
          onClick={() => onChange(key)}
          className={`flex-1 flex items-center justify-center gap-1 py-2 rounded-lg text-[11px] font-medium transition-all ${
            active === key
              ? "bg-card text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <Icon size={13} />
          {label}
          <span className={`text-[9px] px-1 py-0.5 rounded-full ${
            active === key ? "bg-primary/10 text-primary" : "bg-secondary text-muted-foreground"
          }`}>
            {counts[key]}
          </span>
        </button>
      ))}
    </div>
  );
};

export default ViewToggle;
