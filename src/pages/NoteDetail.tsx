import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Star, Clock, Tag, BookOpen, Share2, Trash2 } from "lucide-react";
import { MOCK_NOTES } from "@/data/library";

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

const NoteDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const note = MOCK_NOTES.find((n) => n.id === id);

  if (!note) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="font-serif text-2xl font-semibold text-foreground mb-2">Note not found</h1>
          <button onClick={() => navigate("/library")} className="text-primary hover:underline text-sm">
            Back to Library
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/90 backdrop-blur-xl border-b border-border">
        <div className="flex items-center justify-between px-4 py-3 max-w-2xl mx-auto">
          <button
            onClick={() => navigate(-1)}
            className="p-2 -ml-2 rounded-lg hover:bg-secondary transition-colors text-foreground"
          >
            <ArrowLeft size={20} />
          </button>
          <span className="text-sm font-medium text-muted-foreground">Note</span>
          <div className="flex items-center gap-1">
            <button className="p-2 rounded-lg hover:bg-secondary transition-colors text-muted-foreground">
              <Share2 size={18} />
            </button>
            <button className="p-2 rounded-lg hover:bg-secondary transition-colors text-muted-foreground">
              <Star size={18} className={note.starred ? "fill-streak text-streak" : ""} />
            </button>
          </div>
        </div>
      </header>

      <motion.main
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="max-w-2xl mx-auto px-5 py-6 space-y-6"
      >
        {/* Source Article */}
        <div
          className="p-4 bg-secondary/30 border border-border rounded-xl cursor-pointer hover:bg-secondary/50 transition-colors"
          onClick={() => {
            const articleId = MOCK_NOTES.find((n) => n.id === id)?.id;
            if (articleId) navigate(`/`);
          }}
        >
          <div className="flex items-center gap-2 mb-1">
            <BookOpen size={14} className="text-muted-foreground" />
            <span className="text-xs text-muted-foreground font-medium">Source</span>
          </div>
          <p className="font-serif text-base font-semibold text-foreground leading-snug">
            {note.articleTitle}
          </p>
          <p className="text-xs text-muted-foreground mt-0.5">
            {note.articleAuthor} · {note.articleDomain}
          </p>
        </div>

        {/* Highlighted Excerpt */}
        {note.highlightColor && (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className={`w-3 h-3 rounded-full ${colorIndicator[note.highlightColor]}`} />
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {colorLabel[note.highlightColor]} Highlight
              </span>
            </div>
            <div className="flex gap-3">
              <div className={`w-1 shrink-0 rounded-full ${colorIndicator[note.highlightColor]}`} />
              <blockquote className="font-serif text-base text-muted-foreground leading-relaxed italic">
                "{note.excerpt}"
              </blockquote>
            </div>
          </div>
        )}

        {/* User's Note */}
        <div>
          <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
            Your Note
          </h2>
          <div className="font-serif text-lg text-foreground leading-relaxed whitespace-pre-wrap">
            {note.noteContent}
          </div>
        </div>

        {/* Tags */}
        {note.tags.length > 0 && (
          <div>
            <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
              Tags
            </h2>
            <div className="flex flex-wrap gap-1.5">
              {note.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-3 py-1 rounded-full bg-accent text-accent-foreground font-medium"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Meta */}
        <div className="pt-4 border-t border-border space-y-2">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Clock size={13} />
            <span>{note.timestamp}</span>
            <span>·</span>
            <span>{note.sessionContext}</span>
          </div>
          {note.collection && (
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Tag size={13} />
              <span>{note.collection}</span>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="pt-4 flex gap-3">
          <button className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-secondary text-secondary-foreground text-sm font-medium hover:bg-accent transition-colors">
            <Share2 size={16} />
            Share as Image
          </button>
          <button className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-border text-destructive text-sm font-medium hover:bg-destructive/10 transition-colors">
            <Trash2 size={16} />
          </button>
        </div>
      </motion.main>
    </div>
  );
};

export default NoteDetail;
