import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Flame, BookOpen, Type, Target, Download, Share2, TrendingUp, Lock, ChevronRight, Lightbulb } from "lucide-react";
import { useNavigate } from "react-router-dom";
import BottomNav from "@/components/BottomNav";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import {
  KEY_STATS, HEATMAP_DATA, DOMAIN_DATA, TREND_DATA,
  ACHIEVEMENTS, ARCHETYPE_EVOLUTION, COMPARISON_INSIGHTS,
} from "@/data/analytics";
import {
  ResponsiveContainer, RadarChart, Radar, PolarGrid, PolarAngleAxis,
  LineChart, Line, XAxis, YAxis, Tooltip, AreaChart, Area, CartesianGrid,
} from "recharts";

const DATE_RANGES = ["7D", "30D", "3M", "6M", "All"];

const intensityColors = [
  "bg-muted",
  "bg-primary/20",
  "bg-primary/40",
  "bg-primary/70",
  "bg-primary",
];

const Analytics = () => {
  const navigate = useNavigate();
  const [dateRange, setDateRange] = useState("3M");

  const handleExport = () => {
    const data = { stats: KEY_STATS, domains: DOMAIN_DATA, trends: TREND_DATA, achievements: ACHIEVEMENTS };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "reading-analytics.json";
    a.click();
    URL.revokeObjectURL(url);
    toast("Data exported successfully");
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-background/90 backdrop-blur-xl border-b border-border">
        <div className="max-w-2xl mx-auto px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate(-1)} className="p-1.5 rounded-lg hover:bg-muted transition-colors">
              <ArrowLeft size={20} className="text-foreground" />
            </button>
            <div>
              <h1 className="text-lg font-semibold font-serif text-foreground">Your Reading Journey</h1>
              <p className="text-xs text-muted-foreground">Track your intellectual growth</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button onClick={handleExport} className="p-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground">
              <Download size={18} />
            </button>
            <button onClick={() => toast("Share feature coming soon")} className="p-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground">
              <Share2 size={18} />
            </button>
          </div>
        </div>

        {/* Date Range */}
        <div className="max-w-2xl mx-auto px-5 pb-3 flex gap-2">
          {DATE_RANGES.map((r) => (
            <button
              key={r}
              onClick={() => setDateRange(r)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                dateRange === r
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:text-foreground"
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-5 space-y-6 pt-5">
        {/* Key Stats */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-2 gap-3">
          {[
            { icon: Flame, label: "Current Streak", value: `${KEY_STATS.currentStreak} days`, color: "text-[hsl(var(--streak))]" },
            { icon: BookOpen, label: "This Week", value: `${KEY_STATS.articlesThisWeek} articles`, color: "text-[hsl(var(--tag-article))]" },
            { icon: Type, label: "Total Words", value: `${(KEY_STATS.totalWords / 1000).toFixed(0)}K`, color: "text-[hsl(var(--tag-research))]" },
            { icon: Target, label: "Completion", value: `${KEY_STATS.completionRate}%`, color: "text-[hsl(var(--tag-oped))]" },
          ].map(({ icon: Icon, label, value, color }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-card rounded-xl border border-border p-4"
            >
              <Icon size={18} className={color} />
              <p className="text-xl font-bold font-serif text-foreground mt-2">{value}</p>
              <p className="text-xs text-muted-foreground">{label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Activity Heatmap */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-card rounded-xl border border-border p-4">
          <h2 className="text-sm font-semibold text-foreground mb-3">Reading Activity</h2>
          <div className="overflow-x-auto scrollbar-hide">
            <div className="flex gap-[3px]" style={{ minWidth: 26 * 14 + 25 * 3 }}>
              {Array.from({ length: 26 }, (_, week) => (
                <div key={week} className="flex flex-col gap-[3px]">
                  {Array.from({ length: 7 }, (_, day) => {
                    const cell = HEATMAP_DATA[week * 7 + day];
                    return (
                      <div
                        key={day}
                        className={`w-[13px] h-[13px] rounded-[2px] ${intensityColors[cell?.intensity ?? 0]} transition-colors cursor-pointer hover:ring-1 hover:ring-primary/50`}
                        title={`${cell?.day}, Week ${week + 1}: ${cell?.intensity ?? 0} articles`}
                      />
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-1.5 mt-3 text-[10px] text-muted-foreground">
            <span>Less</span>
            {intensityColors.map((c, i) => (
              <div key={i} className={`w-[10px] h-[10px] rounded-[2px] ${c}`} />
            ))}
            <span>More</span>
          </div>
        </motion.div>

        {/* Intellectual Breadth Map */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="bg-card rounded-xl border border-border p-4">
          <h2 className="text-sm font-semibold text-foreground mb-1">Intellectual Breadth Map</h2>
          <p className="text-xs text-muted-foreground mb-3">Domains you've explored</p>
          <ResponsiveContainer width="100%" height={260}>
            <RadarChart data={DOMAIN_DATA}>
              <PolarGrid stroke="hsl(var(--border))" />
              <PolarAngleAxis dataKey="domain" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} />
              <Radar dataKey="value" stroke="hsl(var(--primary))" fill="hsl(var(--primary))" fillOpacity={0.2} strokeWidth={2} />
            </RadarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Depth vs Breadth */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-card rounded-xl border border-border p-4">
          <h2 className="text-sm font-semibold text-foreground mb-1">Depth vs. Breadth Index</h2>
          <p className="text-xs text-muted-foreground mb-3">Your reading balance over time</p>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={TREND_DATA}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="month" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} axisLine={false} />
              <YAxis tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} axisLine={false} />
              <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 12 }} />
              <Line type="monotone" dataKey="depth" stroke="hsl(var(--primary))" strokeWidth={2} dot={{ fill: "hsl(var(--primary))", r: 3 }} name="Depth" />
              <Line type="monotone" dataKey="breadth" stroke="hsl(var(--tag-article))" strokeWidth={2} dot={{ fill: "hsl(var(--tag-article))", r: 3 }} name="Breadth" />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Reading Pace Trends */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="bg-card rounded-xl border border-border p-4">
          <h2 className="text-sm font-semibold text-foreground mb-1">Reading Pace</h2>
          <p className="text-xs text-muted-foreground mb-3">Words per minute over time</p>
          <ResponsiveContainer width="100%" height={180}>
            <AreaChart data={TREND_DATA}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="month" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} axisLine={false} />
              <YAxis tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} axisLine={false} />
              <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 12 }} />
              <Area type="monotone" dataKey="pace" stroke="hsl(var(--tag-research))" fill="hsl(var(--tag-research))" fillOpacity={0.15} strokeWidth={2} name="WPM" />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Archetype Evolution */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-card rounded-xl border border-border p-4">
          <div className="flex items-center gap-2 mb-1">
            <TrendingUp size={16} className="text-primary" />
            <h2 className="text-sm font-semibold text-foreground">Archetype Evolution</h2>
          </div>
          <p className="text-xs text-muted-foreground mb-3">How your reader profile shifted</p>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={ARCHETYPE_EVOLUTION}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="month" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} axisLine={false} />
              <YAxis tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} axisLine={false} />
              <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 12 }} />
              <Area type="monotone" dataKey="polymath" stackId="1" stroke="hsl(var(--primary))" fill="hsl(var(--primary))" fillOpacity={0.3} name="Polymath" />
              <Area type="monotone" dataKey="scholar" stackId="1" stroke="hsl(var(--tag-article))" fill="hsl(var(--tag-article))" fillOpacity={0.3} name="Scholar" />
              <Area type="monotone" dataKey="synthesizer" stackId="1" stroke="hsl(var(--tag-research))" fill="hsl(var(--tag-research))" fillOpacity={0.3} name="Synthesizer" />
              <Area type="monotone" dataKey="critic" stackId="1" stroke="hsl(var(--tag-oped))" fill="hsl(var(--tag-oped))" fillOpacity={0.3} name="Critic" />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Achievements */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} className="space-y-3">
          <h2 className="text-sm font-semibold text-foreground">Achievements</h2>
          <div className="grid gap-3">
            {ACHIEVEMENTS.map((a) => (
              <div
                key={a.id}
                className={`bg-card rounded-xl border border-border p-4 flex items-start gap-3 ${!a.unlocked ? "opacity-60" : ""}`}
              >
                <div className="text-2xl">{a.unlocked ? a.icon : "🔒"}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold text-foreground">{a.title}</p>
                    {a.unlocked && <span className="text-[10px] bg-primary/10 text-primary px-1.5 py-0.5 rounded-full font-medium">{a.unlockedDate}</span>}
                    {!a.unlocked && <Lock size={12} className="text-muted-foreground" />}
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">{a.description}</p>
                  {!a.unlocked && (
                    <div className="mt-2">
                      <Progress value={(a.progress / a.maxProgress) * 100} className="h-1.5" />
                      <p className="text-[10px] text-muted-foreground mt-1">{a.progress}/{a.maxProgress}</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Comparison Insights */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="space-y-3">
          <div className="flex items-center gap-2">
            <Lightbulb size={16} className="text-[hsl(var(--highlight))]" />
            <h2 className="text-sm font-semibold text-foreground">Insights</h2>
          </div>
          {COMPARISON_INSIGHTS.map((insight, i) => (
            <div key={i} className="bg-card rounded-xl border border-border p-4 flex items-center gap-3">
              <div className="flex-1">
                <p className="text-sm text-foreground">{insight.text}</p>
              </div>
              <ChevronRight size={16} className="text-muted-foreground shrink-0" />
            </div>
          ))}
        </motion.div>

        {/* Set Goals CTA */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}>
          <button
            onClick={() => toast("Goal setting coming soon!", { description: "Set daily reading targets and track progress" })}
            className="w-full bg-primary text-primary-foreground rounded-xl p-4 text-sm font-semibold hover:opacity-90 transition-opacity"
          >
            Set New Reading Goals →
          </button>
        </motion.div>
      </div>

      <BottomNav />
    </div>
  );
};

export default Analytics;
