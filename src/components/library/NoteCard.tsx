import { motion } from "framer-motion";
import { Star, MoreHorizontal, Clock, Tag } from "lucide-react";
import type { LibraryNote } from "@/data/library";

const colorIndicator: Record<string, string> = {
  yellow: "bg-[hsl(45,95%,55%)]",
  blue: "bg-[hsl(210,70%,50%)]",
  pink: "bg-[hsl(330,70%,60%)]",
};

const colorLabel: Record<string, string> = {
  yellow: "Review",
  blue: "Insight",
  pink: "Question",
};

interface NoteCardProps {
  note: LibraryNote;
  index: number;
  onToggleStar: (id: string) => void;
}

const NoteCard = ({ note, index, onToggleStar }: NoteCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="bg-card border border-border rounded-xl p-4 space-y-3"
    >
      {/* Source */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <p className="text-xs text-muted-foreground font-medium truncate">
            {note.articleAuthor} · {note.articleDomain}
          </p>
          <p className="text-sm font-serif font-semibold text-foreground truncate leading-snug mt-0.5">
            {note.articleTitle}
          </p>
        </div>
        <div className="flex items-center gap-1 shrink-0">
          <button
            onClick={() => onToggleStar(note.id)}
            className="p-1 rounded-lg hover:bg-secondary transition-colors"
          >
            <Star size={14} className={note.starred ? "fill-streak text-streak" : "text-muted-foreground"} />
          </button>
          <button className="p-1 rounded-lg hover:bg-secondary transition-colors text-muted-foreground">
            <MoreHorizontal size={14} />
          </button>
        </div>
      </div>

      {/* Highlighted Excerpt */}
      {note.highlightColor && (
        <div className="flex gap-2.5">
          <div className={`w-1 shrink-0 rounded-full ${colorIndicator[note.highlightColor]}`} />
          <div>
            <p className="text-[10px] uppercase tracking-wider font-semibold text-muted-foreground mb-1">
              {colorLabel[note.highlightColor]}
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed italic line-clamp-3">
              "{note.excerpt}"
            </p>
          </div>
        </div>
      )}

      {/* User's Note */}
      {note.noteContent && (
        <p className="text-sm text-foreground leading-relaxed">
          {note.noteContent}
        </p>
      )}

      {/* Tags */}
      {note.tags.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {note.tags.map((tag) => (
            <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full bg-accent text-accent-foreground font-medium">
              #{tag}
            </span>
          ))}
        </div>
      )}

      {/* Meta */}
      <div className="flex items-center gap-3 text-[11px] text-muted-foreground pt-1 border-t border-border">
        <span className="inline-flex items-center gap-1">
          <Clock size={11} />
          {note.timestamp}
        </span>
        <span>{note.sessionContext}</span>
        {note.collection && (
          <span className="ml-auto inline-flex items-center gap-1">
            <Tag size={11} />
            {note.collection}
          </span>
        )}
      </div>
    </motion.div>
  );
};

export default NoteCard;
