import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft, Edit3, Calendar, BookOpen, Flame, Users, ChevronRight,
  Bell, Moon, Sun, Eye, EyeOff, Shield, CreditCard, Trash2,
  Type, Wifi, WifiOff, Globe, Lock, Sparkles, Target, Minus, Plus,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import BottomNav from "@/components/BottomNav";
import { Switch } from "@/components/ui/switch";
import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";
import { toast } from "sonner";
import { USER_PROFILE, ARCHETYPE_RADAR, READING_GOALS, INTEREST_TAGS } from "@/data/profile";
import {
  ResponsiveContainer, RadarChart, Radar, PolarGrid, PolarAngleAxis,
} from "recharts";

const section = (delay: number) => ({ initial: { opacity: 0, y: 12 }, animate: { opacity: 1, y: 0 }, transition: { delay } });

const Profile = () => {
  const navigate = useNavigate();
  const p = USER_PROFILE;

  const [selectedInterests, setSelectedInterests] = useState<Set<string>>(new Set(p.favoriteDomains));
  const [goals, setGoals] = useState(READING_GOALS);

  // Settings state
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [fontSize, setFontSize] = useState([16]);
  const [offlineMode, setOfflineMode] = useState(false);
  const [publicProfile, setPublicProfile] = useState(true);
  const [activityVisible, setActivityVisible] = useState(true);
  const [dailyDigest, setDailyDigest] = useState(true);
  const [smartPrompts, setSmartPrompts] = useState(true);
  const [creatorMode, setCreatorMode] = useState(false);

  const toggleInterest = (tag: string) => {
    setSelectedInterests((prev) => {
      const next = new Set(prev);
      if (next.has(tag)) next.delete(tag); else next.add(tag);
      return next;
    });
    toast("Preferences updated");
  };

  const adjustGoal = (id: string, delta: number) => {
    setGoals((prev) => prev.map((g) => g.id === id ? { ...g, target: Math.max(1, g.target + delta) } : g));
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-background/90 backdrop-blur-xl border-b border-border">
        <div className="max-w-2xl mx-auto px-5 py-4 flex items-center justify-between">
          <button onClick={() => navigate(-1)} className="p-1.5 rounded-lg hover:bg-muted transition-colors">
            <ArrowLeft size={20} className="text-foreground" />
          </button>
          <h1 className="text-base font-semibold font-serif text-foreground">Profile</h1>
          <button onClick={() => toast("Edit profile coming soon")} className="p-1.5 rounded-lg hover:bg-muted transition-colors">
            <Edit3 size={18} className="text-muted-foreground" />
          </button>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-5 space-y-6 pt-5">
        {/* Profile Header */}
        <motion.div {...section(0)} className="flex flex-col items-center text-center">
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center text-2xl font-bold text-primary-foreground mb-3"
            style={{ backgroundColor: p.archetypeColor }}
          >
            {p.avatar}
          </div>
          <h2 className="text-xl font-serif font-bold text-foreground">{p.displayName}</h2>
          <button
            onClick={() => toast("Retake archetype assessment")}
            className="mt-1 flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider"
            style={{ backgroundColor: `${p.archetypeColor}20`, color: p.archetypeColor }}
          >
            <Sparkles size={10} /> {p.archetype}
          </button>
          <p className="text-sm text-muted-foreground mt-2 max-w-xs">{p.bio}</p>
          <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
            <Calendar size={12} /> Joined {p.joinDate}
          </div>

          {/* Stats Row */}
          <div className="flex items-center gap-6 mt-4">
            {[
              { icon: Flame, value: p.daysRead, label: "Days" },
              { icon: BookOpen, value: p.articlesCompleted, label: "Articles" },
              { icon: Users, value: p.followers, label: "Followers" },
              { icon: Users, value: p.following, label: "Following" },
            ].map(({ icon: Icon, value, label }) => (
              <div key={label} className="flex flex-col items-center">
                <Icon size={14} className="text-muted-foreground mb-0.5" />
                <span className="text-sm font-bold text-foreground">{value}</span>
                <span className="text-[10px] text-muted-foreground">{label}</span>
              </div>
            ))}
          </div>

          {/* Favorite Domains */}
          <div className="flex gap-1.5 mt-3">
            {p.favoriteDomains.map((d) => (
              <span key={d} className="px-2 py-0.5 rounded-full bg-accent text-accent-foreground text-[10px] font-medium">{d}</span>
            ))}
          </div>
        </motion.div>

        {/* My Archetype */}
        <motion.div {...section(0.05)} className="bg-card rounded-xl border border-border p-4">
          <div className="flex items-center justify-between mb-1">
            <h3 className="text-sm font-semibold text-foreground">My Archetype</h3>
            <button onClick={() => toast("Retake assessment")} className="text-xs text-primary font-medium">Retake</button>
          </div>
          <p className="text-xs text-muted-foreground mb-3">{p.archetypeDescription}</p>
          <ResponsiveContainer width="100%" height={220}>
            <RadarChart data={ARCHETYPE_RADAR}>
              <PolarGrid stroke="hsl(var(--border))" />
              <PolarAngleAxis dataKey="trait" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 10 }} />
              <Radar dataKey="value" stroke={p.archetypeColor} fill={p.archetypeColor} fillOpacity={0.2} strokeWidth={2} />
            </RadarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Reading Interests */}
        <motion.div {...section(0.1)} className="bg-card rounded-xl border border-border p-4">
          <h3 className="text-sm font-semibold text-foreground mb-3">Reading Interests</h3>
          <div className="flex flex-wrap gap-2">
            {INTEREST_TAGS.map((tag) => {
              const active = selectedInterests.has(tag);
              return (
                <button
                  key={tag}
                  onClick={() => toggleInterest(tag)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                    active
                      ? "bg-primary/10 text-primary border-primary/30"
                      : "bg-muted text-muted-foreground border-border hover:border-primary/30"
                  }`}
                >
                  {tag}
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Reading Goals */}
        <motion.div {...section(0.15)} className="bg-card rounded-xl border border-border p-4">
          <div className="flex items-center gap-2 mb-3">
            <Target size={14} className="text-primary" />
            <h3 className="text-sm font-semibold text-foreground">Reading Goals</h3>
          </div>
          <div className="space-y-4">
            {goals.map((g) => (
              <div key={g.id}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-medium text-foreground">{g.label}</span>
                  <div className="flex items-center gap-2">
                    <button onClick={() => adjustGoal(g.id, -1)} className="p-0.5 rounded hover:bg-muted transition-colors"><Minus size={12} className="text-muted-foreground" /></button>
                    <span className="text-xs font-bold text-foreground w-12 text-center">{g.target} {g.unit}</span>
                    <button onClick={() => adjustGoal(g.id, 1)} className="p-0.5 rounded hover:bg-muted transition-colors"><Plus size={12} className="text-muted-foreground" /></button>
                  </div>
                </div>
                <Progress value={(g.current / g.target) * 100} className="h-1.5" />
                <p className="text-[10px] text-muted-foreground mt-0.5">{g.current}/{g.target} {g.unit} today</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Notifications */}
        <motion.div {...section(0.2)} className="bg-card rounded-xl border border-border p-4 space-y-4">
          <h3 className="text-sm font-semibold text-foreground">Notifications</h3>
          <SettingRow icon={Bell} label="Daily Digest" desc="Morning reading recommendations" value={dailyDigest} onChange={setDailyDigest} />
          <SettingRow icon={Sparkles} label="Smart Prompts" desc="AI-powered reading nudges" value={smartPrompts} onChange={setSmartPrompts} />
        </motion.div>

        {/* Reading Settings */}
        <motion.div {...section(0.25)} className="bg-card rounded-xl border border-border p-4 space-y-4">
          <h3 className="text-sm font-semibold text-foreground">Reading</h3>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {theme === "light" ? <Sun size={16} className="text-muted-foreground" /> : <Moon size={16} className="text-muted-foreground" />}
              <div>
                <p className="text-sm text-foreground">Theme</p>
                <p className="text-[11px] text-muted-foreground">{theme === "light" ? "Light mode" : "Dark mode"}</p>
              </div>
            </div>
            <button
              onClick={() => setTheme((t) => t === "light" ? "dark" : "light")}
              className="px-3 py-1.5 rounded-lg bg-muted text-xs font-medium text-foreground border border-border"
            >
              {theme === "light" ? "Light" : "Dark"}
            </button>
          </div>
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Type size={16} className="text-muted-foreground" />
              <p className="text-sm text-foreground">Font Size</p>
              <span className="text-xs text-muted-foreground ml-auto">{fontSize[0]}px</span>
            </div>
            <Slider value={fontSize} onValueChange={setFontSize} min={12} max={24} step={1} className="w-full" />
          </div>
          <SettingRow icon={offlineMode ? WifiOff : Wifi} label="Offline Mode" desc="Download articles for offline reading" value={offlineMode} onChange={setOfflineMode} />
        </motion.div>

        {/* Privacy */}
        <motion.div {...section(0.3)} className="bg-card rounded-xl border border-border p-4 space-y-4">
          <h3 className="text-sm font-semibold text-foreground">Privacy</h3>
          <SettingRow icon={Globe} label="Public Profile" desc="Others can see your profile" value={publicProfile} onChange={setPublicProfile} />
          <SettingRow icon={activityVisible ? Eye : EyeOff} label="Reading Activity" desc="Show what you're reading" value={activityVisible} onChange={setActivityVisible} />
        </motion.div>

        {/* Account */}
        <motion.div {...section(0.35)} className="bg-card rounded-xl border border-border p-4 space-y-1">
          <h3 className="text-sm font-semibold text-foreground mb-2">Account</h3>
          <NavRow icon={Shield} label="Email & Password" onClick={() => toast("Account settings")} />
          <NavRow icon={Globe} label="Connected Accounts" onClick={() => toast("Connected accounts")} />
          <NavRow icon={CreditCard} label="Subscription" badge="Free" onClick={() => toast("Upgrade to Aragno Plus")} />
          <SettingRow icon={Edit3} label="Creator Mode" desc="Enable writing and publishing" value={creatorMode} onChange={setCreatorMode} />
        </motion.div>

        {/* Danger Zone */}
        <motion.div {...section(0.4)} className="border border-destructive/30 rounded-xl p-4">
          <h3 className="text-sm font-semibold text-destructive mb-2">Danger Zone</h3>
          <button
            onClick={() => toast.error("This action cannot be undone", { description: "Please contact support to delete your account" })}
            className="flex items-center gap-2 text-sm text-destructive hover:underline"
          >
            <Trash2 size={14} /> Delete Account
          </button>
        </motion.div>
      </div>

      <BottomNav />
    </div>
  );
};

// Reusable toggle row
const SettingRow = ({ icon: Icon, label, desc, value, onChange }: {
  icon: React.ElementType; label: string; desc: string; value: boolean; onChange: (v: boolean) => void;
}) => (
  <div className="flex items-center justify-between">
    <div className="flex items-center gap-3">
      <Icon size={16} className="text-muted-foreground" />
      <div>
        <p className="text-sm text-foreground">{label}</p>
        <p className="text-[11px] text-muted-foreground">{desc}</p>
      </div>
    </div>
    <Switch checked={value} onCheckedChange={onChange} />
  </div>
);

// Reusable nav row
const NavRow = ({ icon: Icon, label, badge, onClick }: {
  icon: React.ElementType; label: string; badge?: string; onClick: () => void;
}) => (
  <button onClick={onClick} className="w-full flex items-center justify-between py-2.5 hover:bg-muted/50 rounded-lg px-1 transition-colors">
    <div className="flex items-center gap-3">
      <Icon size={16} className="text-muted-foreground" />
      <span className="text-sm text-foreground">{label}</span>
    </div>
    <div className="flex items-center gap-2">
      {badge && <span className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full font-medium">{badge}</span>}
      <ChevronRight size={14} className="text-muted-foreground" />
    </div>
  </button>
);

export default Profile;
