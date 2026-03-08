import { Lightbulb, ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface KeyIdeasProps {
  ideas: string[];
  open: boolean;
  onToggle: () => void;
}

const KeyIdeas = ({ ideas, open, onToggle }: KeyIdeasProps) => {
  return (
    <div className="mb-8 border border-border rounded-xl overflow-hidden bg-accent/30">
      <button
        onClick={onToggle}
        className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-accent/50 transition-colors"
      >
        <Lightbulb size={18} className="text-primary shrink-0" />
        <span className="text-sm font-semibold text-foreground flex-1">AI Key Ideas</span>
        <span className="text-xs text-muted-foreground mr-1">{ideas.length} ideas</span>
        {open ? <ChevronUp size={16} className="text-muted-foreground" /> : <ChevronDown size={16} className="text-muted-foreground" />}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <ul className="px-4 pb-4 space-y-2.5">
              {ideas.map((idea, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className="flex gap-3 text-sm text-foreground leading-relaxed"
                >
                  <span className="shrink-0 w-5 h-5 rounded-full bg-primary/10 text-primary text-xs flex items-center justify-center font-semibold mt-0.5">
                    {i + 1}
                  </span>
                  {idea}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default KeyIdeas;
