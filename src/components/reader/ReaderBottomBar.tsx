import { useState } from "react";
import { Type, Sun, Moon, Volume2, Minus, Plus, PenLine, MessagesSquare } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ReaderBottomBarProps {
  fontSize: number;
  lineHeight: number;
  theme: "light" | "sepia" | "dark";
  onFontSizeChange: (size: number) => void;
  onLineHeightChange: (lh: number) => void;
  onThemeChange: (theme: "light" | "sepia" | "dark") => void;
  onTakeNote: () => void;
  onJoinDiscussion: () => void;
}

const themeOptions: { value: "light" | "sepia" | "dark"; label: string; icon: React.ReactNode; bg: string }[] = [
  { value: "light", label: "Light", icon: <Sun size={14} />, bg: "bg-card border-border" },
  { value: "sepia", label: "Sepia", icon: <Sun size={14} />, bg: "bg-[hsl(35,40%,92%)] border-[hsl(30,20%,80%)]" },
  { value: "dark", label: "Dark", icon: <Moon size={14} />, bg: "bg-[hsl(20,10%,12%)] border-[hsl(20,8%,22%)]" },
];

const ReaderBottomBar = ({
  fontSize, lineHeight, theme,
  onFontSizeChange, onLineHeightChange, onThemeChange,
  onTakeNote, onJoinDiscussion,
}: ReaderBottomBarProps) => {
  const [showSettings, setShowSettings] = useState(false);

  return (
    <>
      <AnimatePresence>
        {showSettings && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-20 left-0 right-0 z-50 px-4"
          >
            <div className="max-w-md mx-auto bg-card border border-border rounded-xl p-4 shadow-lg space-y-4">
              {/* Font Size */}
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground font-medium">Font Size</span>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => onFontSizeChange(Math.max(14, fontSize - 1))}
                    className="p-1.5 rounded-lg bg-secondary text-secondary-foreground hover:bg-accent transition-colors"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="text-sm font-medium text-foreground w-8 text-center">{fontSize}</span>
                  <button
                    onClick={() => onFontSizeChange(Math.min(28, fontSize + 1))}
                    className="p-1.5 rounded-lg bg-secondary text-secondary-foreground hover:bg-accent transition-colors"
                  >
                    <Plus size={14} />
                  </button>
                </div>
              </div>

              {/* Line Height */}
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground font-medium">Line Height</span>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => onLineHeightChange(Math.max(1.4, lineHeight - 0.1))}
                    className="p-1.5 rounded-lg bg-secondary text-secondary-foreground hover:bg-accent transition-colors"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="text-sm font-medium text-foreground w-8 text-center">{lineHeight.toFixed(1)}</span>
                  <button
                    onClick={() => onLineHeightChange(Math.min(2.4, lineHeight + 0.1))}
                    className="p-1.5 rounded-lg bg-secondary text-secondary-foreground hover:bg-accent transition-colors"
                  >
                    <Plus size={14} />
                  </button>
                </div>
              </div>

              {/* Theme */}
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground font-medium">Theme</span>
                <div className="flex gap-2">
                  {themeOptions.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => onThemeChange(opt.value)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${opt.bg} ${
                        theme === opt.value ? "ring-2 ring-primary" : ""
                      }`}
                    >
                      {opt.icon}
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating action buttons */}
      <div className="fixed bottom-5 left-0 right-0 z-50 flex justify-center">
        <div className="flex items-center gap-1.5 bg-card/80 backdrop-blur-xl border border-border rounded-full px-1.5 py-1.5 shadow-lg">
          <button
            onClick={onTakeNote}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full hover:bg-secondary transition-colors text-foreground"
          >
            <PenLine size={15} />
            <span className="text-[11px] font-medium">Note</span>
          </button>

          <button
            onClick={onJoinDiscussion}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full hover:bg-secondary transition-colors text-foreground"
          >
            <MessagesSquare size={15} />
            <span className="text-[11px] font-medium">Discuss</span>
          </button>

          <button
            onClick={() => setShowSettings(!showSettings)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-colors ${
              showSettings ? "bg-primary text-primary-foreground" : "hover:bg-secondary text-foreground"
            }`}
          >
            <Type size={15} />
            <span className="text-[11px] font-medium">Font</span>
          </button>

          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-full hover:bg-secondary transition-colors text-foreground">
            <Volume2 size={15} />
            <span className="text-[11px] font-medium">Listen</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default ReaderBottomBar;
