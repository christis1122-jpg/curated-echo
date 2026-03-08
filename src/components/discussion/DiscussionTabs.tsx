import { MessageSquare, Lightbulb, HelpCircle, BookMarked } from "lucide-react";
import type { DiscussionTab } from "@/data/discussions";

interface DiscussionTabsProps {
  active: DiscussionTab;
  onChange: (tab: DiscussionTab) => void;
  counts: Record<DiscussionTab, number>;
}

const tabs: { key: DiscussionTab; label: string; icon: React.ElementType }[] = [
  { key: "debate", label: "Debate", icon: MessageSquare },
  { key: "takeaways", label: "Takeaways", icon: Lightbulb },
  { key: "questions", label: "Questions", icon: HelpCircle },
  { key: "resources", label: "Resources", icon: BookMarked },
];

const DiscussionTabs = ({ active, onChange, counts }: DiscussionTabsProps) => {
  return (
    <div className="flex bg-secondary/50 rounded-xl p-1 border border-border">
      {tabs.map(({ key, label, icon: Icon }) => (
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
          {counts[key] > 0 && (
            <span className={`text-[9px] px-1 py-0.5 rounded-full ${
              active === key ? "bg-primary/10 text-primary" : "bg-secondary text-muted-foreground"
            }`}>
              {counts[key]}
            </span>
          )}
        </button>
      ))}
    </div>
  );
};

export default DiscussionTabs;
