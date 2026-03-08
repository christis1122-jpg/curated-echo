import { useState } from "react";
import { Flame, Bell, Sparkles } from "lucide-react";
import NotificationCenter from "@/components/NotificationCenter";

const TopNav = () => {
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
        <div className="flex items-center justify-between px-5 py-3 max-w-2xl mx-auto">
          <div className="flex items-center gap-2">
            <Sparkles size={20} className="text-primary" />
            <h1 className="font-serif text-lg font-semibold tracking-tight text-foreground">
              The Polymath
            </h1>
          </div>

          <div className="flex items-center gap-4">
            {/* Streak */}
            <div className="flex items-center gap-1.5 text-streak">
              <Flame size={18} className="fill-streak" />
              <span className="text-sm font-semibold">12</span>
            </div>

            {/* Notifications */}
            <button
              onClick={() => setNotificationsOpen(true)}
              className="relative p-1.5 rounded-full hover:bg-secondary transition-colors"
            >
              <Bell size={20} className="text-muted-foreground" />
              <span className="absolute top-0.5 right-0.5 w-2 h-2 bg-primary rounded-full" />
            </button>

            {/* Profile Avatar */}
            <button className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-secondary-foreground font-sans text-xs font-semibold">
              AK
            </button>
          </div>
        </div>
      </header>

      <NotificationCenter open={notificationsOpen} onClose={() => setNotificationsOpen(false)} />
    </>
  );
};

export default TopNav;
