import { Home, Compass, Library, BarChart3, User, Plus } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

const tabs = [
  { icon: Home, label: "Home", path: "/" },
  { icon: Compass, label: "Explore", path: "/explore" },
  { icon: Library, label: "Library", path: "/library" },
  { icon: BarChart3, label: "Analytics", path: "/analytics" },
  { icon: User, label: "Profile", path: "/profile" },
];

const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <>
      {/* Floating + button */}
      <motion.button
        onClick={() => navigate("/create")}
        className="fixed bottom-20 right-4 z-50 flex items-center justify-center w-12 h-12 rounded-full bg-primary text-primary-foreground shadow-lg"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9, rotate: 90 }}
        animate={{
          boxShadow: [
            "0 4px 14px 0 hsl(var(--primary) / 0.3)",
            "0 4px 24px 0 hsl(var(--primary) / 0.5)",
            "0 4px 14px 0 hsl(var(--primary) / 0.3)",
          ],
        }}
        transition={{
          boxShadow: { duration: 2, repeat: Infinity, ease: "easeInOut" },
        }}
      >
        <Plus size={24} strokeWidth={2.5} />
      </motion.button>

      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card/90 backdrop-blur-xl border-t border-border">
        <div className="flex items-center justify-around max-w-2xl mx-auto py-2 px-4">
          {tabs.map(({ icon: Icon, label, path }) => {
            const active = location.pathname === path;
            return (
              <motion.button
                key={label}
                onClick={() => navigate(path)}
                whileTap={{ scale: 0.85 }}
                className={`relative flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-lg transition-colors ${
                  active ? "text-primary" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <motion.div
                  animate={active ? { y: [0, -2, 0] } : {}}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  <Icon size={22} strokeWidth={active ? 2.2 : 1.8} />
                </motion.div>
                <span className="text-[10px] font-medium">{label}</span>
                {active && (
                  <motion.div
                    layoutId="bottomNavIndicator"
                    className="absolute -top-1 left-1/2 -translate-x-1/2 w-5 h-0.5 rounded-full bg-primary"
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </motion.button>
            );
          })}
        </div>
      </nav>
    </>
  );
};

export default BottomNav;
