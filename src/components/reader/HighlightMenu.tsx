import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Highlighter, MessageSquare, BookOpen, Share2, X } from "lucide-react";

interface HighlightMenuProps {
  position: { x: number; y: number };
  selectedText: string;
  onHighlight: (color: "yellow" | "blue" | "pink") => void;
  onNote: () => void;
  onDefine: () => void;
  onShare: () => void;
  onClose: () => void;
}

const highlightColors = [
  { color: "yellow" as const, label: "Review", bg: "bg-[hsl(45,95%,55%)]" },
  { color: "blue" as const, label: "Insight", bg: "bg-[hsl(210,70%,50%)]" },
  { color: "pink" as const, label: "Question", bg: "bg-[hsl(330,70%,60%)]" },
];

const HighlightMenu = ({ position, onHighlight, onNote, onDefine, onShare, onClose }: HighlightMenuProps) => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 5 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 5 }}
        className="fixed z-[100] bg-card border border-border rounded-xl shadow-xl p-2"
        style={{ left: Math.min(position.x - 100, window.innerWidth - 220), top: position.y - 70 }}
      >
        <div className="flex items-center gap-1">
          {/* Color pills */}
          {highlightColors.map(({ color, label, bg }) => (
            <button
              key={color}
              onClick={() => onHighlight(color)}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg hover:bg-secondary transition-colors"
              title={label}
            >
              <span className={`w-4 h-4 rounded-full ${bg}`} />
              <span className="text-xs text-muted-foreground">{label}</span>
            </button>
          ))}

          <div className="w-px h-6 bg-border mx-1" />

          <button onClick={onNote} className="p-1.5 rounded-lg hover:bg-secondary transition-colors text-muted-foreground" title="Add Note">
            <MessageSquare size={16} />
          </button>
          <button onClick={onDefine} className="p-1.5 rounded-lg hover:bg-secondary transition-colors text-muted-foreground" title="Define">
            <BookOpen size={16} />
          </button>
          <button onClick={onShare} className="p-1.5 rounded-lg hover:bg-secondary transition-colors text-muted-foreground" title="Share">
            <Share2 size={16} />
          </button>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-secondary transition-colors text-muted-foreground">
            <X size={14} />
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default HighlightMenu;

// Note modal component
export const NoteModal = ({
  open,
  onClose,
  onSave,
  selectedText,
}: {
  open: boolean;
  onClose: () => void;
  onSave: (content: string, tags: string[]) => void;
  selectedText: string;
}) => {
  const [content, setContent] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState<string[]>([]);

  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const handleSave = () => {
    onSave(content, tags);
    setContent("");
    setTags([]);
    onClose();
  };

  if (!open) return null;

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
          <h3 className="font-serif text-lg font-semibold text-foreground">Add Note</h3>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-secondary transition-colors text-muted-foreground">
            <X size={18} />
          </button>
        </div>

        {selectedText && (
          <div className="p-3 bg-accent/50 border-l-2 border-primary rounded-r-lg text-sm text-muted-foreground italic leading-relaxed">
            "{selectedText.slice(0, 120)}{selectedText.length > 120 ? "..." : ""}"
          </div>
        )}

        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write your note... (Markdown supported)"
          className="w-full h-32 p-3 bg-secondary/50 border border-border rounded-xl text-sm text-foreground placeholder:text-muted-foreground resize-none focus:outline-none focus:ring-2 focus:ring-primary/50 font-sans"
        />

        <div>
          <div className="flex flex-wrap gap-1.5 mb-2">
            {tags.map((tag) => (
              <span key={tag} className="text-xs bg-accent text-accent-foreground px-2 py-0.5 rounded-full flex items-center gap-1">
                #{tag}
                <button onClick={() => setTags(tags.filter((t) => t !== tag))} className="hover:text-destructive">
                  <X size={10} />
                </button>
              </span>
            ))}
          </div>
          <div className="flex gap-2">
            <input
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAddTag()}
              placeholder="Add tag..."
              className="flex-1 px-3 py-1.5 bg-secondary/50 border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
            <button
              onClick={handleSave}
              disabled={!content.trim()}
              className="px-4 py-1.5 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors disabled:opacity-50"
            >
              Save
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// Definition popup
export const DefinitionPopup = ({
  word,
  position,
  onClose,
}: {
  word: string;
  position: { x: number; y: number };
  onClose: () => void;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="fixed z-[100] bg-card border border-border rounded-xl shadow-xl p-4 w-72"
      style={{ left: Math.min(position.x - 136, window.innerWidth - 290), top: position.y + 10 }}
    >
      <div className="flex items-center justify-between mb-2">
        <h4 className="font-serif font-semibold text-foreground">{word}</h4>
        <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
          <X size={14} />
        </button>
      </div>
      <p className="text-xs text-muted-foreground italic mb-1">noun / verb</p>
      <p className="text-sm text-foreground leading-relaxed">
        Tap to define any word. Connect a dictionary API for live definitions.
      </p>
    </motion.div>
  );
};
