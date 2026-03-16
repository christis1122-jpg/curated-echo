import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, FileJson, Hash, ChevronDown } from "lucide-react";
import { toPayloadComparison } from "@/lib/gyst-uuid";
import { cn } from "@/lib/utils";

interface TokenSavingsPanelProps {
  entity?: Record<string, any>;
  className?: string;
}

const DEMO_ENTITY = {
  id: "n1",
  articleTitle: "The Quiet Architecture of Self-Deception",
  articleAuthor: "Elena Voss",
  articleDomain: "Psychology",
  excerpt:
    "Self-deception is not a bug in human cognition — it is a feature.",
  highlightColor: "blue",
  noteContent:
    "This reframing of self-deception as adaptive rather than pathological changes everything.",
  tags: ["cognition", "evolution", "identity"],
  starred: true,
  collection: "Mind & Self",
  timestamp: "2 hours ago",
  sessionContext: "Morning read · 12 min session",
  archetype: "polymath",
  domain: "psychology",
  knowledgeX: 180,
  knowledgeY: 120,
  knowledgeZ: 200,
};

export function TokenSavingsPanel({ entity, className }: TokenSavingsPanelProps) {
  const [expanded, setExpanded] = useState(false);
  const data = entity ?? DEMO_ENTITY;

  const comparison = useMemo(() => toPayloadComparison(data), [data]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "bg-card rounded-xl border border-border overflow-hidden",
        className
      )}
    >
      {/* Header */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full p-4 flex items-center justify-between hover:bg-muted/30 transition-colors"
      >
        <div className="flex items-center gap-2">
          <Zap size={14} className="text-[hsl(var(--highlight))]" />
          <span className="text-xs font-semibold text-foreground">
            Token Savings Demo
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono text-[hsl(var(--tag-research))]">
            {comparison.savingsPercent}% smaller
          </span>
          <motion.div animate={{ rotate: expanded ? 180 : 0 }}>
            <ChevronDown size={14} className="text-muted-foreground" />
          </motion.div>
        </div>
      </button>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 space-y-3">
              {/* Comparison bars */}
              <div className="space-y-2">
                <ComparisonRow
                  icon={<FileJson size={12} />}
                  label="JSON payload"
                  size={`${(comparison.jsonSize / 1024).toFixed(1)} KB`}
                  chars={`${comparison.jsonPayload.length} chars`}
                  percentage={100}
                  color="var(--tag-oped)"
                />
                <ComparisonRow
                  icon={<Hash size={12} />}
                  label="GYST UUID"
                  size="36 B"
                  chars="36 chars"
                  percentage={(36 / comparison.jsonSize) * 100}
                  color="var(--tag-research)"
                />
              </div>

              {/* UUID display */}
              <div className="bg-muted/50 rounded-lg p-3 space-y-1.5">
                <p className="text-[10px] uppercase tracking-widest text-muted-foreground">
                  Compressed to
                </p>
                <p className="font-mono text-[11px] text-foreground break-all leading-relaxed">
                  {comparison.uuidPayload}
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-2 text-center">
                <Stat label="JSON" value={`${comparison.jsonSize}B`} />
                <Stat label="UUID" value="36B" />
                <Stat
                  label="Saved"
                  value={`${comparison.savingsPercent}%`}
                  highlight
                />
              </div>

              <p className="text-[10px] text-muted-foreground leading-relaxed">
                For AI agents, GYST UUIDs encode the essential identity signal
                of any entity in 36 characters — archetype, domain, fractal
                position, and knowledge coordinates — replacing kilobytes of
                redundant JSON context.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function ComparisonRow({
  icon,
  label,
  size,
  chars,
  percentage,
  color,
}: {
  icon: React.ReactNode;
  label: string;
  size: string;
  chars: string;
  percentage: number;
  color: string;
}) {
  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between text-[10px]">
        <div className="flex items-center gap-1.5 text-muted-foreground">
          {icon}
          <span>{label}</span>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <span>{chars}</span>
          <span className="font-medium text-foreground">{size}</span>
        </div>
      </div>
      <div className="h-1.5 rounded-full bg-muted overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${Math.max(percentage, 2)}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="h-full rounded-full"
          style={{ background: `hsl(${color})` }}
        />
      </div>
    </div>
  );
}

function Stat({
  label,
  value,
  highlight,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div>
      <p
        className={cn(
          "text-sm font-bold font-serif",
          highlight ? "text-[hsl(var(--tag-research))]" : "text-foreground"
        )}
      >
        {value}
      </p>
      <p className="text-[10px] text-muted-foreground">{label}</p>
    </div>
  );
}

export default TokenSavingsPanel;
