import { useState, useMemo, useRef } from "react";
import { motion, AnimatePresence, PanInfo } from "framer-motion";
import {
  ArrowLeft, Search, Check, CheckCheck, Bell, BellOff, Clock,
  Flame, Trophy, MessageCircle, FileText, TrendingUp, Zap,
  Moon, Sparkles, Bookmark, AtSign, AlertTriangle, Award,
  X, ChevronRight, Settings, Trash2,
} from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import {
  MOCK_NOTIFICATIONS,
  SMART_PROMPTS,
  NOTIFICATION_TYPE_META,
  type Notification,
  type NotificationType,
} from "@/data/notifications";

const ICON_MAP: Record<string, React.ElementType> = {
  flame: Flame, clock: Clock, trophy: Trophy, "file-text": FileText,
  "trending-up": TrendingUp, "message-circle": MessageCircle,
  "at-sign": AtSign, "alert-triangle": AlertTriangle, bookmark: Bookmark,
  award: Award, zap: Zap, moon: Moon, sparkles: Sparkles,
};

interface Props {
  open: boolean;
  onClose: () => void;
}

const NotificationCenter = ({ open, onClose }: Props) => {
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [activeTab, setActiveTab] = useState<"all" | "settings">("all");
  const [typeFilters, setTypeFilters] = useState<Set<NotificationType>>(new Set());

  // DND & per-type settings
  const [dndEnabled, setDndEnabled] = useState(false);
  const [typeSettings, setTypeSettings] = useState<Record<NotificationType, boolean>>({
    reading_reminder: true, new_content: true, community: true, streak: true, achievement: true,
  });

  const unreadCount = useMemo(() => notifications.filter((n) => !n.read).length, [notifications]);

  const filtered = useMemo(() => {
    let list = notifications;
    if (typeFilters.size > 0) list = list.filter((n) => typeFilters.has(n.type));
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      list = list.filter((n) => n.title.toLowerCase().includes(q) || n.description.toLowerCase().includes(q));
    }
    return list;
  }, [notifications, typeFilters, searchQuery]);

  const grouped = useMemo(() => {
    const map = new Map<string, Notification[]>();
    for (const n of filtered) {
      const key = NOTIFICATION_TYPE_META[n.type].label;
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(n);
    }
    return map;
  }, [filtered]);

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    toast("All notifications marked as read");
  };

  const dismissNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
    toast("Dismissed", {
      action: { label: "Undo", onClick: () => setNotifications(MOCK_NOTIFICATIONS) },
    });
  };

  const remindLater = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
    toast("Will remind you later");
  };

  const toggleTypeFilter = (type: NotificationType) => {
    setTypeFilters((prev) => {
      const next = new Set(prev);
      if (next.has(type)) next.delete(type); else next.add(type);
      return next;
    });
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="fixed inset-0 z-[60] bg-background"
        >
          {/* Header */}
          <div className="sticky top-0 z-10 bg-background/90 backdrop-blur-xl border-b border-border">
            <div className="max-w-2xl mx-auto px-5 py-4 flex items-center justify-between">
              <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-muted transition-colors">
                <ArrowLeft size={20} className="text-foreground" />
              </button>
              <h1 className="text-base font-semibold font-serif text-foreground">
                Notifications {unreadCount > 0 && <span className="text-xs text-primary font-sans">({unreadCount})</span>}
              </h1>
              <div className="flex items-center gap-2">
                <button onClick={() => setShowSearch(!showSearch)} className="p-1.5 rounded-lg hover:bg-muted transition-colors">
                  <Search size={18} className="text-muted-foreground" />
                </button>
                <button onClick={() => setActiveTab(activeTab === "settings" ? "all" : "settings")} className="p-1.5 rounded-lg hover:bg-muted transition-colors">
                  <Settings size={18} className="text-muted-foreground" />
                </button>
              </div>
            </div>

            {/* Search bar */}
            <AnimatePresence>
              {showSearch && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="max-w-2xl mx-auto px-5 pb-3">
                    <div className="relative">
                      <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search notifications..."
                        className="w-full pl-9 pr-8 py-2.5 bg-muted rounded-xl text-sm text-foreground placeholder:text-muted-foreground border border-border focus:outline-none focus:ring-2 focus:ring-ring"
                        autoFocus
                      />
                      {searchQuery && (
                        <button onClick={() => setSearchQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2">
                          <X size={14} className="text-muted-foreground" />
                        </button>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Tabs: type filter pills */}
            {activeTab === "all" && (
              <div className="max-w-2xl mx-auto px-5 pb-3 flex gap-2 overflow-x-auto scrollbar-hide">
                {(Object.entries(NOTIFICATION_TYPE_META) as [NotificationType, { label: string; color: string }][]).map(
                  ([type, meta]) => (
                    <button
                      key={type}
                      onClick={() => toggleTypeFilter(type)}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap border transition-all ${
                        typeFilters.has(type)
                          ? "bg-primary/10 text-primary border-primary/30"
                          : "bg-muted text-muted-foreground border-border"
                      }`}
                    >
                      {meta.label}
                    </button>
                  )
                )}
              </div>
            )}
          </div>

          <div className="max-w-2xl mx-auto px-5 pb-24 pt-4 space-y-6 overflow-y-auto" style={{ maxHeight: "calc(100vh - 140px)" }}>
            {activeTab === "all" ? (
              <>
                {/* Smart Prompts */}
                <div className="space-y-3">
                  <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Smart Prompts</h2>
                  {SMART_PROMPTS.map((prompt, i) => {
                    const Icon = ICON_MAP[prompt.icon] || Zap;
                    return (
                      <motion.div
                        key={prompt.id}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className="rounded-xl border border-border p-4 relative overflow-hidden"
                        style={{
                          background: `linear-gradient(135deg, ${prompt.gradient[0]}10, ${prompt.gradient[1]}10)`,
                        }}
                      >
                        <div className="flex items-start gap-3">
                          <div
                            className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                            style={{ background: `linear-gradient(135deg, ${prompt.gradient[0]}, ${prompt.gradient[1]})` }}
                          >
                            <Icon size={16} className="text-white" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-foreground">{prompt.message}</p>
                            <p className="text-xs text-muted-foreground mt-0.5">{prompt.subtext}</p>
                            <button className="mt-2 text-xs font-semibold text-primary flex items-center gap-1">
                              {prompt.actionLabel} <ChevronRight size={12} />
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Bulk actions */}
                {unreadCount > 0 && (
                  <button onClick={markAllRead} className="flex items-center gap-2 text-xs font-medium text-primary hover:underline">
                    <CheckCheck size={14} /> Mark all as read
                  </button>
                )}

                {/* Grouped notifications */}
                {Array.from(grouped.entries()).map(([group, items]) => (
                  <div key={group} className="space-y-2">
                    <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{group}</h2>
                    <AnimatePresence mode="popLayout">
                      {items.map((n, i) => (
                        <NotificationItem
                          key={n.id}
                          notification={n}
                          index={i}
                          onDismiss={dismissNotification}
                          onRemindLater={remindLater}
                          onRead={(id) =>
                            setNotifications((prev) =>
                              prev.map((x) => (x.id === id ? { ...x, read: true } : x))
                            )
                          }
                        />
                      ))}
                    </AnimatePresence>
                  </div>
                ))}

                {filtered.length === 0 && (
                  <div className="text-center py-16">
                    <Bell size={32} className="mx-auto text-muted-foreground/30 mb-3" />
                    <p className="text-sm text-muted-foreground">No notifications</p>
                  </div>
                )}
              </>
            ) : (
              /* Settings tab */
              <div className="space-y-6">
                {/* DND */}
                <div className="bg-card rounded-xl border border-border p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <BellOff size={16} className="text-muted-foreground" />
                      <div>
                        <p className="text-sm font-semibold text-foreground">Do Not Disturb</p>
                        <p className="text-[11px] text-muted-foreground">Pause all notifications during reading</p>
                      </div>
                    </div>
                    <Switch checked={dndEnabled} onCheckedChange={setDndEnabled} />
                  </div>
                  {dndEnabled && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="flex items-center gap-3 text-xs text-muted-foreground pl-9"
                    >
                      <Clock size={12} />
                      <span>Active during reading sessions</span>
                    </motion.div>
                  )}
                </div>

                {/* Per-type settings */}
                <div className="bg-card rounded-xl border border-border p-4 space-y-4">
                  <h3 className="text-sm font-semibold text-foreground">Notification Types</h3>
                  {(Object.entries(NOTIFICATION_TYPE_META) as [NotificationType, { label: string; color: string }][]).map(
                    ([type, meta]) => (
                      <div key={type} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: meta.color }}
                          />
                          <div>
                            <p className="text-sm text-foreground">{meta.label}</p>
                            <p className="text-[10px] text-muted-foreground">
                              {notifications.filter((n) => n.type === type).length} recent
                            </p>
                          </div>
                        </div>
                        <Switch
                          checked={typeSettings[type]}
                          onCheckedChange={(val) => {
                            setTypeSettings((prev) => ({ ...prev, [type]: val }));
                            toast(`${meta.label} ${val ? "enabled" : "disabled"}`);
                          }}
                        />
                      </div>
                    )
                  )}
                </div>

                {/* Clear all */}
                <button
                  onClick={() => {
                    setNotifications([]);
                    toast("All notifications cleared");
                  }}
                  className="flex items-center gap-2 text-sm text-destructive hover:underline"
                >
                  <Trash2 size={14} /> Clear all notifications
                </button>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

/* Single notification item with swipe */
const NotificationItem = ({
  notification: n,
  index,
  onDismiss,
  onRemindLater,
  onRead,
}: {
  notification: Notification;
  index: number;
  onDismiss: (id: string) => void;
  onRemindLater: (id: string) => void;
  onRead: (id: string) => void;
}) => {
  const Icon = ICON_MAP[n.icon] || Bell;
  const constraintsRef = useRef<HTMLDivElement>(null);

  const handleDragEnd = (_: any, info: PanInfo) => {
    if (info.offset.x < -100) onDismiss(n.id);
    else if (info.offset.x > 100) onRemindLater(n.id);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -200, transition: { duration: 0.2 } }}
      transition={{ delay: index * 0.03 }}
      ref={constraintsRef}
      className="relative"
    >
      {/* Swipe hints */}
      <div className="absolute inset-y-0 left-0 w-20 flex items-center justify-center rounded-l-xl bg-primary/10">
        <Clock size={16} className="text-primary" />
      </div>
      <div className="absolute inset-y-0 right-0 w-20 flex items-center justify-center rounded-r-xl bg-destructive/10">
        <X size={16} className="text-destructive" />
      </div>

      <motion.div
        drag="x"
        dragConstraints={{ left: -120, right: 120 }}
        dragElastic={0.1}
        onDragEnd={handleDragEnd}
        className={`relative rounded-xl border p-3.5 cursor-grab active:cursor-grabbing transition-colors ${
          n.read
            ? "bg-card border-border"
            : "bg-primary/[0.03] border-primary/20"
        }`}
        onClick={() => !n.read && onRead(n.id)}
      >
        <div className="flex items-start gap-3">
          <div
            className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
              n.read ? "bg-muted" : "bg-primary/10"
            }`}
          >
            <Icon size={14} className={n.read ? "text-muted-foreground" : "text-primary"} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <p className={`text-sm ${n.read ? "text-foreground" : "font-semibold text-foreground"}`}>
                {n.title}
              </p>
              {!n.read && <div className="w-2 h-2 rounded-full bg-primary shrink-0 mt-1.5" />}
            </div>
            <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">{n.description}</p>
            <div className="flex items-center justify-between mt-2">
              <span className="text-[10px] text-muted-foreground">{n.time}</span>
              {n.actionLabel && (
                <button className="text-[11px] font-semibold text-primary flex items-center gap-0.5">
                  {n.actionLabel} <ChevronRight size={10} />
                </button>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default NotificationCenter;
