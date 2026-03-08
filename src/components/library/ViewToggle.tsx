import { BookOpen, Highlighter, Sparkles } from "lucide-react";

type LibraryView = "notes" | "highlights" | "threads";

interface ViewToggleProps {
  active: LibraryView;
  onChange: (view: LibraryView) => void;
  counts: { notes: number; highlights: number; threads: number };
}

const views: { key: LibraryView; label: string; icon: React.ElementType }[] = [
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
          className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-medium transition-all ${
            active === key
              ? "bg-card text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <Icon size={14} />
          {label}
          <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
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
