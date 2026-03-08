export interface WeeklyActivity {
  day: string;
  week: number;
  intensity: number; // 0-4
}

export interface DomainData {
  domain: string;
  value: number;
  fullMark: number;
}

export interface TrendPoint {
  month: string;
  depth: number;
  breadth: number;
  pace: number; // words per minute
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  progress: number;
  maxProgress: number;
  category: "streak" | "explorer" | "depth";
  unlockedDate?: string;
}

export interface ArchetypeSnapshot {
  month: string;
  polymath: number;
  scholar: number;
  synthesizer: number;
  critic: number;
}

export const KEY_STATS = {
  currentStreak: 12,
  articlesThisWeek: 8,
  totalWords: 142500,
  completionRate: 78,
};

// Generate heatmap data (26 weeks × 7 days)
export const HEATMAP_DATA: WeeklyActivity[] = Array.from({ length: 26 * 7 }, (_, i) => ({
  day: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][i % 7],
  week: Math.floor(i / 7),
  intensity: Math.random() > 0.3 ? Math.floor(Math.random() * 5) : 0,
}));

export const DOMAIN_DATA: DomainData[] = [
  { domain: "Philosophy", value: 85, fullMark: 100 },
  { domain: "Technology", value: 72, fullMark: 100 },
  { domain: "Science", value: 60, fullMark: 100 },
  { domain: "Politics", value: 45, fullMark: 100 },
  { domain: "Economics", value: 55, fullMark: 100 },
  { domain: "Psychology", value: 68, fullMark: 100 },
  { domain: "History", value: 40, fullMark: 100 },
  { domain: "Literature", value: 52, fullMark: 100 },
];

export const TREND_DATA: TrendPoint[] = [
  { month: "Sep", depth: 45, breadth: 60, pace: 220 },
  { month: "Oct", depth: 52, breadth: 55, pace: 235 },
  { month: "Nov", depth: 60, breadth: 62, pace: 248 },
  { month: "Dec", depth: 55, breadth: 70, pace: 240 },
  { month: "Jan", depth: 68, breadth: 72, pace: 260 },
  { month: "Feb", depth: 75, breadth: 68, pace: 275 },
  { month: "Mar", depth: 80, breadth: 75, pace: 290 },
];

export const ACHIEVEMENTS: Achievement[] = [
  { id: "1", title: "7-Day Streak", description: "Read every day for a week", icon: "🔥", unlocked: true, progress: 7, maxProgress: 7, category: "streak", unlockedDate: "Feb 15" },
  { id: "2", title: "Polymath Explorer", description: "Read from 6+ domains in a month", icon: "🧭", unlocked: true, progress: 8, maxProgress: 6, category: "explorer", unlockedDate: "Mar 1" },
  { id: "3", title: "Deep Diver", description: "Complete 10 research papers", icon: "🤿", unlocked: true, progress: 10, maxProgress: 10, category: "depth", unlockedDate: "Feb 28" },
  { id: "4", title: "30-Day Streak", description: "Read every day for a month", icon: "⚡", unlocked: false, progress: 12, maxProgress: 30, category: "streak" },
  { id: "5", title: "Century Reader", description: "Complete 100 articles", icon: "📚", unlocked: false, progress: 67, maxProgress: 100, category: "explorer" },
  { id: "6", title: "Night Owl", description: "Read 20 articles after midnight", icon: "🦉", unlocked: false, progress: 8, maxProgress: 20, category: "depth" },
];

export const ARCHETYPE_EVOLUTION: ArchetypeSnapshot[] = [
  { month: "Sep", polymath: 30, scholar: 45, synthesizer: 15, critic: 10 },
  { month: "Oct", polymath: 35, scholar: 40, synthesizer: 18, critic: 7 },
  { month: "Nov", polymath: 40, scholar: 35, synthesizer: 20, critic: 5 },
  { month: "Dec", polymath: 42, scholar: 30, synthesizer: 22, critic: 6 },
  { month: "Jan", polymath: 45, scholar: 28, synthesizer: 20, critic: 7 },
  { month: "Feb", polymath: 48, scholar: 25, synthesizer: 18, critic: 9 },
  { month: "Mar", polymath: 50, scholar: 22, synthesizer: 20, critic: 8 },
];

export const COMPARISON_INSIGHTS = [
  { text: "You read 40% more philosophy than average Synthesizers", highlight: "40% more philosophy" },
  { text: "Your completion rate is in the top 15% of all readers", highlight: "top 15%" },
  { text: "You explore 2.3× more domains than typical Scholars", highlight: "2.3× more domains" },
];
