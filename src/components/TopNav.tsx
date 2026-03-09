import { useState } from "react";
import { Flame, Bell, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import NotificationCenter from "@/components/NotificationCenter";

const TopNav = () => {
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
        <div className="flex items-center justify-between px-5 py-3 max-w-2xl mx-auto">
          <motion.div
            className="flex items-center gap-2"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            <motion.div
              animate={{ rotate: [0, 15, -15, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 5, ease: "easeInOut" }}
            >
              <Sparkles size={20} className="text-primary" />
            </motion.div>
            <h1 className="font-serif text-lg font-semibold tracking-tight text-foreground">
              The Polymath
            </h1>
          </motion.div>

          <div className="flex items-center gap-4">
            {/* Streak */}
            <motion.div
              className="flex items-center gap-1.5 text-streak"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                animate={{
                  scale: [1, 1.15, 1],
                  filter: [
                    "drop-shadow(0 0 0px hsl(var(--streak)))",
                    "drop-shadow(0 0 6px hsl(var(--streak)))",
                    "drop-shadow(0 0 0px hsl(var(--streak)))",
                  ],
                }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              >
                <Flame size={18} className="fill-streak" />
              </motion.div>
              <span className="text-sm font-semibold">12</span>
            </motion.div>

            {/* Notifications */}
            <motion.button
              onClick={() => setNotificationsOpen(true)}
              className="relative p-1.5 rounded-full hover:bg-secondary transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <motion.div
                animate={{ rotate: [0, 10, -10, 8, -8, 0] }}
                transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 4 }}
              >
                <Bell size={20} className="text-muted-foreground" />
              </motion.div>
              <motion.span
                className="absolute top-0.5 right-0.5 w-2 h-2 bg-primary rounded-full"
                animate={{ scale: [1, 1.4, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            </motion.button>

            {/* Profile Avatar */}
            <motion.button
              className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-secondary-foreground font-sans text-xs font-semibold"
              whileHover={{ scale: 1.08, boxShadow: "0 0 0 2px hsl(var(--primary) / 0.3)" }}
              whileTap={{ scale: 0.95 }}
            >
              AK
            </motion.button>
          </div>
        </div>
      </header>

      <NotificationCenter open={notificationsOpen} onClose={() => setNotificationsOpen(false)} />
    </>
  );
};

export default TopNav;
