import { motion } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";
import type { InsightThread } from "@/data/library";
import { MOCK_NOTES } from "@/data/library";

interface ThreadCardProps {
  thread: InsightThread;
  index: number;
}

const ThreadCard = ({ thread, index }: ThreadCardProps) => {
  const linkedNotes = MOCK_NOTES.filter((n) => thread.noteIds.includes(n.id));

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.08 }}
      className="bg-card border border-border rounded-xl overflow-hidden"
    >
      {/* Header */}
      <div className="p-4 pb-3 flex items-start gap-3">
        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
          <Sparkles size={16} className="text-primary" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-serif text-base font-semibold text-foreground leading-snug">
            {thread.title}
          </h3>
          <p className="text-[11px] text-muted-foreground mt-0.5">
            AI-synthesized · {thread.createdAt} · {thread.noteIds.length} notes
          </p>
        </div>
      </div>

      {/* Summary */}
      <div className="px-4 pb-3">
        <p className="text-sm text-muted-foreground leading-relaxed">
          {thread.summary}
        </p>
      </div>

      {/* Connection Graph (simplified visual) */}
      <div className="px-4 pb-3">
        <div className="space-y-2">
          {thread.connections.map((conn, i) => {
            const fromNote = MOCK_NOTES.find((n) => n.id === conn.from);
            const toNote = MOCK_NOTES.find((n) => n.id === conn.to);
            return (
              <div key={i} className="flex items-center gap-2 text-xs">
                <span className="px-2 py-1 bg-secondary rounded-md text-secondary-foreground truncate max-w-[120px]">
                  {fromNote?.articleTitle.split(" ").slice(0, 3).join(" ")}…
                </span>
                <div className="flex items-center gap-1 text-muted-foreground shrink-0">
                  <div className="w-4 h-px bg-border" />
                  <ArrowRight size={10} />
                  <div className="w-4 h-px bg-border" />
                </div>
                <span className="px-2 py-1 bg-secondary rounded-md text-secondary-foreground truncate max-w-[120px]">
                  {toNote?.articleTitle.split(" ").slice(0, 3).join(" ")}…
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Linked Notes */}
      <div className="px-4 pb-4 flex items-center gap-1.5">
        <span className="text-[11px] text-muted-foreground mr-1">Sources:</span>
        {linkedNotes.map((note) => (
          <span
            key={note.id}
            className="text-[10px] px-2 py-0.5 rounded-full bg-accent text-accent-foreground font-medium truncate max-w-[100px]"
          >
            {note.articleAuthor}
          </span>
        ))}
      </div>
    </motion.div>
  );
};

export default ThreadCard;
