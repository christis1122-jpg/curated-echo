import { useState } from "react";
import { motion } from "framer-motion";
import { X, Send, Quote } from "lucide-react";

interface ReplyComposerProps {
  open: boolean;
  onClose: () => void;
  onSend: (content: string) => void;
  quotedText?: string;
  threadAuthor?: string;
}

const SUGGESTED_RESPONSES = [
  "I'd push back on this because…",
  "Building on your point…",
  "Have you considered the counterargument that…",
  "This connects to another idea I've been thinking about…",
];

const ReplyComposer = ({ open, onClose, onSend, quotedText, threadAuthor }: ReplyComposerProps) => {
  const [content, setContent] = useState("");

  if (!open) return null;

  const handleSend = () => {
    if (!content.trim()) return;
    onSend(content);
    setContent("");
    onClose();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] bg-foreground/30 backdrop-blur-sm flex items-end justify-center"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="w-full max-w-lg bg-card border-t border-border rounded-t-2xl p-5 space-y-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <h3 className="font-serif text-base font-semibold text-foreground">
            Reply{threadAuthor ? ` to ${threadAuthor}` : ""}
          </h3>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-secondary transition-colors text-muted-foreground">
            <X size={18} />
          </button>
        </div>

        {quotedText && (
          <div className="flex gap-2 items-start p-3 bg-accent/50 rounded-lg">
            <Quote size={14} className="text-muted-foreground shrink-0 mt-0.5" />
            <p className="text-xs text-muted-foreground italic leading-relaxed line-clamp-3">
              "{quotedText}"
            </p>
          </div>
        )}

        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Share your thoughts…"
          autoFocus
          className="w-full h-28 p-3 bg-secondary/50 border border-border rounded-xl text-sm text-foreground placeholder:text-muted-foreground resize-none focus:outline-none focus:ring-2 focus:ring-primary/50 font-sans"
        />

        {/* Suggested responses */}
        <div className="flex flex-wrap gap-1.5">
          {SUGGESTED_RESPONSES.map((s) => (
            <button
              key={s}
              onClick={() => setContent(s)}
              className="text-[10px] px-2.5 py-1 rounded-full border border-border text-muted-foreground hover:border-primary/40 hover:text-foreground transition-all"
            >
              {s}
            </button>
          ))}
        </div>

        <div className="flex justify-end">
          <button
            onClick={handleSend}
            disabled={!content.trim()}
            className="flex items-center gap-2 px-5 py-2 bg-primary text-primary-foreground rounded-xl text-sm font-medium hover:bg-primary/90 transition-colors disabled:opacity-50"
          >
            <Send size={14} />
            Post
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ReplyComposer;
