import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Clock, BookOpen, PenLine, Highlighter, CheckCircle2 } from "lucide-react";
import type { ArchivedRead } from "@/data/library";

const typeTagClass: Record<string, string> = {
  Essay: "type-tag type-tag-essay",
  Article: "type-tag type-tag-article",
  Research: "type-tag type-tag-research",
  "Op-Ed": "type-tag type-tag-oped",
};

interface ArchivedReadCardProps {
  read: ArchivedRead;
  index: number;
}

const ArchivedReadCard = ({ read, index }: ArchivedReadCardProps) => {
  const navigate = useNavigate();
  const isComplete = read.progress === 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      onClick={() => navigate(`/read/${read.articleId}`)}
      className="bg-card border border-border rounded-xl p-4 cursor-pointer hover:shadow-md transition-shadow"
    >
      <div className="flex items-start gap-3">
        <div className="flex-1 min-w-0">
          {/* Tags */}
          <div className="flex items-center gap-2 mb-2">
            <span className={typeTagClass[read.type]}>{read.type}</span>
            <span className="text-xs text-muted-foreground font-medium">{read.domain}</span>
            {isComplete && (
              <CheckCircle2 size={14} className="text-accent-foreground ml-auto" />
            )}
          </div>

          {/* Title & Author */}
          <h3 className="font-serif text-sm font-semibold text-foreground leading-snug mb-0.5">
            {read.title}
          </h3>
          <p className="text-xs text-muted-foreground">{read.author}</p>

          {/* Progress bar */}
          {!isComplete && (
            <div className="mt-2.5 flex items-center gap-2">
              <div className="flex-1 h-1 bg-secondary rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full"
                  style={{ width: `${read.progress}%` }}
                />
              </div>
              <span className="text-[10px] text-muted-foreground font-medium">{read.progress}%</span>
            </div>
          )}

          {/* Meta */}
          <div className="flex items-center gap-3 text-[11px] text-muted-foreground mt-2.5">
            <span className="inline-flex items-center gap-1">
              <Clock size={11} />
              {read.completedAt}
            </span>
            <span className="inline-flex items-center gap-1">
              <BookOpen size={11} />
              {read.readTime}
            </span>
            {read.notesCount > 0 && (
              <span className="inline-flex items-center gap-1">
                <PenLine size={11} />
                {read.notesCount}
              </span>
            )}
            {read.highlightsCount > 0 && (
              <span className="inline-flex items-center gap-1">
                <Highlighter size={11} />
                {read.highlightsCount}
              </span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ArchivedReadCard;
