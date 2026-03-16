import { ARTICLE_IDS, NOTIFICATION_IDS } from "@/data/gyst-ids";

export type NotificationType =
  | "reading_reminder"
  | "new_content"
  | "community"
  | "streak"
  | "achievement";

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  description: string;
  time: string;
  read: boolean;
  icon: string;
  actionLabel?: string;
  actionRoute?: string;
}

export interface SmartPrompt {
  id: string;
  message: string;
  subtext: string;
  icon: string;
  actionLabel: string;
  actionRoute?: string;
  gradient: [string, string];
}

export interface DndSchedule {
  enabled: boolean;
  startHour: number;
  endHour: number;
}

export const NOTIFICATION_TYPE_META: Record<NotificationType, { label: string; color: string }> = {
  reading_reminder: { label: "Reading Reminders", color: "hsl(24 80% 52%)" },
  new_content: { label: "New Content", color: "hsl(210 70% 50%)" },
  community: { label: "Community", color: "hsl(160 60% 40%)" },
  streak: { label: "Streak Alerts", color: "hsl(45 95% 55%)" },
  achievement: { label: "Achievements", color: "hsl(280 55% 50%)" },
};

export const MOCK_NOTIFICATIONS: Notification[] = [
  // Streak
  {
    id: NOTIFICATION_IDS.n1,
    type: "streak",
    title: "🔥 12-Day Streak!",
    description: "You're on fire! Keep it going — only 2 more days to beat your personal best.",
    time: "Just now",
    read: false,
    icon: "flame",
  },
  // Smart reading reminder
  {
    id: NOTIFICATION_IDS.n2,
    type: "reading_reminder",
    title: "Your evening window is open",
    description: "Based on your pattern, the next 45 minutes are your peak reading time.",
    time: "5 min ago",
    read: false,
    icon: "clock",
    actionLabel: "Start Reading",
    actionRoute: `/read/${ARTICLE_IDS["1"]}`,
  },
  // Achievement
  {
    id: NOTIFICATION_IDS.n3,
    type: "achievement",
    title: "🏆 Achievement Unlocked: Polymath Explorer",
    description: "You've read across 6 different domains this month. Impressive breadth!",
    time: "1h ago",
    read: false,
    icon: "trophy",
  },
  // New content
  {
    id: NOTIFICATION_IDS.n4,
    type: "new_content",
    title: "New from Dr. Sarah Chen",
    description: '"The Neuroscience of Decision Fatigue" — matches your cognitive science interests.',
    time: "2h ago",
    read: false,
    icon: "file-text",
    actionLabel: "Read Now",
    actionRoute: `/read/${ARTICLE_IDS["2"]}`,
  },
  {
    id: "n5",
    type: "new_content",
    title: "Trending in Philosophy",
    description: '"Beyond Rationality" by Marcus Webb is gaining traction among Synthesizers.',
    time: "3h ago",
    read: true,
    icon: "trending-up",
    actionLabel: "Preview",
    actionRoute: "/reader/3",
  },
  // Community
  {
    id: "n6",
    type: "community",
    title: "Reply from @elena_k",
    description: '"Great insight on the attention economy thread! I think the key point is..."',
    time: "4h ago",
    read: true,
    icon: "message-circle",
    actionLabel: "View Thread",
    actionRoute: "/discussion",
  },
  {
    id: "n7",
    type: "community",
    title: "Mentioned in discussion",
    description: "@james_r mentioned you in 'Future of Deep Reading' — 12 new replies.",
    time: "6h ago",
    read: true,
    icon: "at-sign",
    actionLabel: "View",
    actionRoute: "/discussion",
  },
  // Streak warning
  {
    id: "n8",
    type: "streak",
    title: "⚡ Streak at risk!",
    description: "Read one article before midnight to keep your 12-day streak alive.",
    time: "Yesterday",
    read: true,
    icon: "alert-triangle",
    actionLabel: "Quick Read",
    actionRoute: "/reader/1",
  },
  // Reading reminder
  {
    id: "n9",
    type: "reading_reminder",
    title: "Continue where you left off",
    description: '"The Paradox of Choice" — you were 68% through. Pick it back up?',
    time: "Yesterday",
    read: true,
    icon: "bookmark",
    actionLabel: "Continue",
    actionRoute: "/reader/1",
  },
  {
    id: "n10",
    type: "achievement",
    title: "🎯 7-Day Streak earned!",
    description: "Consistent reading is the foundation of deep thinking. Badge added to your profile.",
    time: "3 days ago",
    read: true,
    icon: "award",
  },
];

export const SMART_PROMPTS: SmartPrompt[] = [
  {
    id: "sp1",
    message: "You have 15 minutes — perfect for a Micro-Read",
    subtext: '"Why We Sleep Badly" by Dr. A. Walker • 4 min read',
    icon: "zap",
    actionLabel: "Start Reading",
    actionRoute: "/reader/1",
    gradient: ["hsl(24 80% 52%)", "hsl(45 95% 55%)"],
  },
  {
    id: "sp2",
    message: "Your evening reading window is open",
    subtext: "You typically read 2-3 articles between 8-10 PM. Ready to dive in?",
    icon: "moon",
    actionLabel: "Browse Feed",
    actionRoute: "/",
    gradient: ["hsl(240 50% 50%)", "hsl(280 55% 50%)"],
  },
  {
    id: "sp3",
    message: "Reconnect with Dr. Sarah Chen",
    subtext: "New essay matches your interests in neuroscience and decision-making.",
    icon: "sparkles",
    actionLabel: "Read Essay",
    actionRoute: "/reader/2",
    gradient: ["hsl(160 60% 40%)", "hsl(210 70% 50%)"],
  },
];
