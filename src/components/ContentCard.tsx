import { Star, Clock, BookOpen, Eye, Highlighter, Lock, DollarSign, Bookmark, X } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import type { Article } from "@/data/articles";

const typeTagClass: Record<string, string> = {
  Essay: "type-tag type-tag-essay",
  Article: "type-tag type-tag-article",
  Research: "type-tag type-tag-research",
  "Op-Ed": "type-tag type-tag-oped",
};

const accessIcon: Record<string, React.ReactNode> = {
  Free: null,
  Subscription: <Lock size={12} />,
  Purchase: <DollarSign size={12} />,
};

const accessStyle: Record<string, string> = {
  Free: "bg-accent text-accent-foreground",
  Subscription: "bg-primary/10 text-primary",
  Purchase: "bg-highlight/20 text-foreground",
};

interface ContentCardProps {
  article: Article;
  index: number;
  onSave: (id: string) => void;
  onDismiss: (id: string) => void;
}

const ContentCard = ({ article, index, onSave, onDismiss }: ContentCardProps) => {
  const navigate = useNavigate();
  const [dragX, setDragX] = useState(0);

  const handleClick = () => {
    if (Math.abs(dragX) < 10) {
      navigate(`/read/${article.id}`);
    }
  };

  const swipeThreshold = 100;
  const saveProgress = Math.min(1, Math.max(0, dragX / swipeThreshold));
  const dismissProgress = Math.min(1, Math.max(0, -dragX / swipeThreshold));

  return (
    <div className="relative">
      {/* Swipe action indicators */}
      <div className="absolute inset-0 rounded-xl flex items-center justify-between px-6 pointer-events-none">
        <motion.div
          className="flex items-center gap-2 text-primary"
          animate={{ opacity: saveProgress, scale: 0.8 + saveProgress * 0.2 }}
        >
          <Bookmark size={20} />
          <span className="text-sm font-semibold">Save</span>
        </motion.div>
        <motion.div
          className="flex items-center gap-2 text-destructive"
          animate={{ opacity: dismissProgress, scale: 0.8 + dismissProgress * 0.2 }}
        >
          <span className="text-sm font-semibold">Dismiss</span>
          <X size={20} />
        </motion.div>
      </div>

      <motion.article
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, x: dragX > 50 ? 200 : dragX < -50 ? -200 : 0, transition: { duration: 0.25 } }}
        transition={{ duration: 0.35, delay: index * 0.06, ease: "easeOut" }}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.3}
        onDrag={(_, info) => setDragX(info.offset.x)}
        onDragEnd={(_, info) => {
          setDragX(0);
          if (info.offset.x > swipeThreshold) onSave(article.id);
          else if (info.offset.x < -swipeThreshold) onDismiss(article.id);
        }}
        onClick={handleClick}
        whileHover={{ y: -3, boxShadow: "0 8px 30px -8px hsl(var(--primary) / 0.12)" }}
        whileTap={{ scale: 0.985 }}
        className="bg-card rounded-xl border border-border p-5 cursor-pointer transition-shadow relative"
      >
        {/* Tags Row */}
        <div className="flex items-center gap-2 mb-3">
          <span className={typeTagClass[article.type]}>{article.type}</span>
          <span className="text-xs text-muted-foreground font-medium">{article.domain}</span>
          <div className="ml-auto">
            <span className={`text-xs font-medium px-2 py-0.5 rounded-full inline-flex items-center gap-1 ${accessStyle[article.access]}`}>
              {accessIcon[article.access]}
              {article.access}
            </span>
          </div>
        </div>

        {/* Title & Subtitle */}
        <h2 className="font-serif text-lg font-semibold leading-snug text-foreground mb-1.5">
          {article.title}
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2 mb-4">
          {article.subtitle}
        </p>

        {/* Author */}
        <div className="flex items-center gap-3 mb-3">
          <motion.div
            className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-secondary-foreground text-xs font-semibold"
            whileHover={{ scale: 1.15, rotate: 5 }}
          >
            {article.author.avatar}
          </motion.div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-foreground truncate">{article.author.name}</p>
            <p className="text-xs text-muted-foreground">{article.author.subscribers} subscribers</p>
          </div>
          <div className="flex items-center gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.06 + 0.3 + i * 0.05 }}
              >
                <Star
                  size={12}
                  className={i < Math.floor(article.author.rating) ? "fill-streak text-streak" : "text-border"}
                />
              </motion.div>
            ))}
            <span className="text-xs text-muted-foreground ml-1">{article.author.rating}</span>
          </div>
        </div>

        {/* Meta Row */}
        <div className="flex items-center gap-4 text-xs text-muted-foreground pt-3 border-t border-border">
          <span className="inline-flex items-center gap-1">
            <Clock size={13} />
            {article.readTime}
          </span>
          <span className="inline-flex items-center gap-1">
            <BookOpen size={13} />
            {article.wordCount} words
          </span>
          <span className="ml-auto inline-flex items-center gap-3">
            <span className="inline-flex items-center gap-1">
              <Eye size={13} />
              {article.reads} reads
            </span>
            <span className="inline-flex items-center gap-1">
              <Highlighter size={13} />
              {article.highlights}
            </span>
          </span>
        </div>
      </motion.article>
    </div>
  );
};

export default ContentCard;
