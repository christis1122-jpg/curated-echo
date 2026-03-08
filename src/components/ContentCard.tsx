import { Star, Clock, BookOpen, Eye, Highlighter, Lock, DollarSign } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
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

  const handleClick = () => {
    navigate(`/read/${article.id}`);
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.06, ease: "easeOut" }}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.3}
      onDragEnd={(_, info) => {
        if (info.offset.x > 100) onSave(article.id);
        else if (info.offset.x < -100) onDismiss(article.id);
      }}
      onClick={handleClick}
      whileHover={{ y: -2 }}
      className="bg-card rounded-xl border border-border p-5 cursor-pointer transition-shadow hover:shadow-md"
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
        <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-secondary-foreground text-xs font-semibold">
          {article.author.avatar}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-foreground truncate">{article.author.name}</p>
          <p className="text-xs text-muted-foreground">{article.author.subscribers} subscribers</p>
        </div>
        <div className="flex items-center gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              size={12}
              className={i < Math.floor(article.author.rating) ? "fill-streak text-streak" : "text-border"}
            />
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
  );
};

export default ContentCard;
