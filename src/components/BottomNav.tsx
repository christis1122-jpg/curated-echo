import { Home, Compass, Library, BarChart3, User } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

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
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card/90 backdrop-blur-xl border-t border-border">
      <div className="flex items-center justify-around max-w-2xl mx-auto py-2 px-4">
        {tabs.map(({ icon: Icon, label, path }) => {
          const active = location.pathname === path;
          return (
            <button
              key={label}
              onClick={() => navigate(path)}
              className={`flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-lg transition-colors ${
                active ? "text-primary" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Icon size={22} strokeWidth={active ? 2.2 : 1.8} />
              <span className="text-[10px] font-medium">{label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
