import { useState } from "react";
import { Type, Sun, Moon, Volume2, Minus, Plus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ReaderBottomBarProps {
  fontSize: number;
  lineHeight: number;
  theme: "light" | "sepia" | "dark";
  onFontSizeChange: (size: number) => void;
  onLineHeightChange: (lh: number) => void;
  onThemeChange: (theme: "light" | "sepia" | "dark") => void;
}

const themeOptions: { value: "light" | "sepia" | "dark"; label: string; icon: React.ReactNode; bg: string }[] = [
  { value: "light", label: "Light", icon: <Sun size={14} />, bg: "bg-card border-border" },
  { value: "sepia", label: "Sepia", icon: <Sun size={14} />, bg: "bg-[hsl(35,40%,92%)] border-[hsl(30,20%,80%)]" },
  { value: "dark", label: "Dark", icon: <Moon size={14} />, bg: "bg-[hsl(20,10%,12%)] border-[hsl(20,8%,22%)]" },
];

const ReaderBottomBar = ({
  fontSize, lineHeight, theme,
  onFontSizeChange, onLineHeightChange, onThemeChange,
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
            className="fixed bottom-16 left-0 right-0 z-50 px-4"
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

      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card/90 backdrop-blur-xl border-t border-border">
        <div className="flex items-center justify-around max-w-md mx-auto py-2.5 px-4">
          <button
            onClick={() => setShowSettings(!showSettings)}
            className={`flex flex-col items-center gap-0.5 px-4 py-1.5 rounded-lg transition-colors ${
              showSettings ? "text-primary" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Type size={20} />
            <span className="text-[10px] font-medium">Font</span>
          </button>

          <button className="flex flex-col items-center gap-0.5 px-4 py-1.5 rounded-lg text-muted-foreground hover:text-foreground transition-colors">
            <Volume2 size={20} />
            <span className="text-[10px] font-medium">Listen</span>
          </button>
        </div>
      </nav>
    </>
  );
};

export default ReaderBottomBar;
