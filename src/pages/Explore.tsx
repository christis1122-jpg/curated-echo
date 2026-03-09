import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search, X, Mic, Clock, TrendingUp, ArrowUpRight, Sparkles,
  ChevronRight, Plus, Users, BookOpen, Hash, Star,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import BottomNav from "@/components/BottomNav";
import { toast } from "sonner";
import {
  CATEGORIES, FEATURED_COLLECTIONS, TRENDING_TOPICS, NEW_VOICES,
  CURATED_LISTS, RECOMMENDATIONS, FORMAT_FILTERS, RECENT_SEARCHES,
} from "@/data/explore";

const Explore = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);
  const [activeFormat, setActiveFormat] = useState("All");
  const [followedTopics, setFollowedTopics] = useState<Set<string>>(new Set());
  const [followedVoices, setFollowedVoices] = useState<Set<string>>(new Set());
  const searchRef = useRef<HTMLInputElement>(null);

  const toggleFollowTopic = (id: string) => {
    setFollowedTopics((prev) => {
      const next = new Set(prev);
      if (next.has(id)) { next.delete(id); toast("Unfollowed topic"); }
      else { next.add(id); toast("Following topic — updates in your feed"); }
      return next;
    });
  };

  const toggleFollowVoice = (id: string) => {
    setFollowedVoices((prev) => {
      const next = new Set(prev);
      if (next.has(id)) { next.delete(id); toast("Unfollowed"); }
      else { next.add(id); toast("Following — their new posts will appear in your feed"); }
      return next;
    });
  };

  const trendingIcon = (t: "up" | "stable" | "new") => {
    if (t === "up") return <TrendingUp size={10} className="text-[hsl(var(--tag-research))]" />;
    if (t === "new") return <Sparkles size={10} className="text-primary" />;
    return null;
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Sticky Header */}
      <div className="sticky top-0 z-40 bg-background/90 backdrop-blur-xl border-b border-border">
        <div className="max-w-2xl mx-auto px-5 py-3">
          <div className="relative flex items-center gap-2">
            <div className="relative flex-1">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                ref={searchRef}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setTimeout(() => setSearchFocused(false), 200)}
                placeholder="Search topics, authors, articles..."
                className="w-full pl-9 pr-16 py-2.5 rounded-xl bg-muted border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all"
              />
              <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                {searchQuery && (
                  <button onClick={() => setSearchQuery("")} className="p-1 rounded-md hover:bg-secondary transition-colors">
                    <X size={14} className="text-muted-foreground" />
                  </button>
                )}
                <button onClick={() => toast("Voice search coming soon")} className="p-1.5 rounded-lg bg-primary/10 hover:bg-primary/20 transition-colors">
                  <Mic size={14} className="text-primary" />
                </button>
              </div>
            </div>
          </div>

          {/* Recent Searches Dropdown */}
          <AnimatePresence>
            {searchFocused && !searchQuery && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden mt-2"
              >
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold mb-2">Recent</p>
                <div className="flex flex-wrap gap-2">
                  {RECENT_SEARCHES.map((s) => (
                    <button
                      key={s}
                      onClick={() => { setSearchQuery(s); searchRef.current?.blur(); }}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-muted text-xs text-muted-foreground hover:text-foreground transition-colors border border-border"
                    >
                      <Clock size={10} /> {s}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-5 space-y-7 pt-5">
        {/* Featured Carousel */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold text-foreground">Featured</h2>
            <button className="text-xs text-primary font-medium">See all</button>
          </div>
          <div className="flex gap-3 overflow-x-auto scrollbar-hide snap-x snap-mandatory -mx-5 px-5">
             {FEATURED_COLLECTIONS.map((c, i) => (
              <motion.div
                key={c.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className={`shrink-0 w-[280px] snap-start rounded-2xl p-5 bg-gradient-to-br ${c.gradient} relative overflow-hidden cursor-pointer group`}
                onClick={() => toast(`Opening "${c.title}"...`)}
              >
                <span className="text-[10px] uppercase tracking-wider font-bold text-primary-foreground/80 bg-primary-foreground/20 px-2 py-0.5 rounded-full">{c.tag}</span>
                <h3 className="text-lg font-serif font-bold text-primary-foreground mt-3">{c.title}</h3>
                <p className="text-xs text-primary-foreground/70 mt-1">{c.subtitle}</p>
                <div className="flex items-center gap-1 mt-3 text-xs text-primary-foreground/60">
                  <BookOpen size={12} /> {c.articleCount} articles
                </div>
                <motion.div
                  className="absolute -bottom-4 -right-4 w-24 h-24 rounded-full bg-primary-foreground/5"
                  whileHover={{ scale: 1.5 }}
                  transition={{ duration: 0.5 }}
                />
              </motion.div>
            ))}
          </div>
        </section>

        {/* Category Grid */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold text-foreground">Browse by Domain</h2>
          </div>
          <div className="flex gap-2.5 overflow-x-auto scrollbar-hide snap-x snap-mandatory -mx-5 px-5 pb-1">
           {CATEGORIES.map((cat, i) => (
              <motion.button
                key={cat.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.03 }}
                whileHover={{ y: -4 }}
                whileTap={{ scale: 0.9 }}
                className="shrink-0 snap-start flex flex-col items-center gap-1.5 w-[72px] group"
                onClick={() => toast(`Browsing ${cat.name}`)}
              >
                <motion.div
                  className="w-14 h-14 rounded-2xl bg-muted border border-border flex items-center justify-center text-2xl group-hover:border-primary/40 group-hover:bg-accent transition-all"
                  whileHover={{ rotate: [0, -5, 5, 0] }}
                  transition={{ duration: 0.4 }}
                >
                  {cat.emoji}
                </motion.div>
                <span className="text-[10px] font-medium text-muted-foreground group-hover:text-foreground transition-colors truncate w-full text-center">{cat.name}</span>
              </motion.button>
            ))}
          </div>
        </section>

        {/* Format Filters */}
        <section>
          <h2 className="text-sm font-semibold text-foreground mb-3">Browse by Format</h2>
          <div className="flex gap-2 overflow-x-auto scrollbar-hide -mx-5 px-5">
            {FORMAT_FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setActiveFormat(f)}
                className={`shrink-0 px-4 py-2 rounded-full text-xs font-medium border transition-all ${
                  activeFormat === f
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-card text-muted-foreground border-border hover:border-primary/40 hover:text-foreground"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </section>

        {/* Trending Topics */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Hash size={14} className="text-primary" />
              <h2 className="text-sm font-semibold text-foreground">Trending Topics</h2>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {TRENDING_TOPICS.map((topic) => {
              const isFollowed = followedTopics.has(topic.id);
              return (
                <button
                  key={topic.id}
                  onClick={() => toggleFollowTopic(topic.id)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-medium border transition-all ${
                    isFollowed
                      ? "bg-primary/10 text-primary border-primary/30"
                      : "bg-card text-foreground border-border hover:border-primary/40"
                  }`}
                >
                  {trendingIcon(topic.trending)}
                  <span>{topic.name}</span>
                  <span className="text-muted-foreground text-[10px]">{topic.posts > 999 ? `${(topic.posts / 1000).toFixed(1)}K` : topic.posts}</span>
                  {isFollowed ? (
                    <span className="text-[9px] bg-primary/20 text-primary px-1 rounded">✓</span>
                  ) : (
                    <Plus size={10} className="text-muted-foreground" />
                  )}
                </button>
              );
            })}
          </div>
        </section>

        {/* New Voices */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Star size={14} className="text-[hsl(var(--highlight))]" />
              <h2 className="text-sm font-semibold text-foreground">New Voices</h2>
            </div>
            <button className="text-xs text-primary font-medium">See all</button>
          </div>
          <div className="flex gap-3 overflow-x-auto scrollbar-hide snap-x snap-mandatory -mx-5 px-5">
            {NEW_VOICES.map((voice, i) => {
              const isFollowed = followedVoices.has(voice.id);
              return (
                <motion.div
                  key={voice.id}
                  initial={{ opacity: 0, x: 15 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                  className="shrink-0 w-[200px] snap-start bg-card rounded-xl border border-border p-4 flex flex-col items-center text-center"
                >
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold text-primary-foreground mb-2"
                    style={{ backgroundColor: voice.archetypeColor }}
                  >
                    {voice.avatar}
                  </div>
                  <p className="text-sm font-semibold text-foreground">{voice.name}</p>
                  <span
                    className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full mt-1"
                    style={{ backgroundColor: `${voice.archetypeColor}20`, color: voice.archetypeColor }}
                  >
                    {voice.archetype}
                  </span>
                  <p className="text-[11px] text-muted-foreground mt-2 line-clamp-2">{voice.bio}</p>
                  <div className="flex items-center gap-3 mt-2 text-[10px] text-muted-foreground">
                    <span className="flex items-center gap-0.5"><Users size={9} /> {voice.followers > 999 ? `${(voice.followers / 1000).toFixed(1)}K` : voice.followers}</span>
                    <span className="flex items-center gap-0.5"><BookOpen size={9} /> {voice.articles}</span>
                  </div>
                  <motion.button
                    onClick={() => toggleFollowVoice(voice.id)}
                    whileTap={{ scale: 0.92 }}
                    className={`mt-3 w-full py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      isFollowed
                        ? "bg-muted text-muted-foreground border border-border"
                        : "bg-primary text-primary-foreground"
                    }`}
                  >
                    {isFollowed ? "Following" : "Follow"}
                  </motion.button>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* Curated Collections */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold text-foreground">Collections</h2>
            <button className="text-xs text-primary font-medium">See all</button>
          </div>
          <div className="space-y-3">
            {CURATED_LISTS.map((list, i) => (
              <motion.div
                key={list.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="bg-card rounded-xl border border-border p-4 flex items-start gap-3 cursor-pointer hover:border-primary/30 transition-colors"
                onClick={() => toast(`Opening "${list.title}"`)}
              >
                <div className="text-2xl mt-0.5">{list.emoji}</div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-foreground">{list.title}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{list.description}</p>
                  <div className="flex items-center gap-3 mt-2 text-[10px] text-muted-foreground">
                    <span>{list.articleCount} articles</span>
                    <span className="flex items-center gap-0.5"><Users size={9} /> {(list.followers / 1000).toFixed(1)}K followers</span>
                  </div>
                </div>
                <ChevronRight size={16} className="text-muted-foreground mt-1 shrink-0" />
              </motion.div>
            ))}
          </div>
        </section>

        {/* Because You Read */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Sparkles size={14} className="text-primary" />
              <h2 className="text-sm font-semibold text-foreground">Because You Read...</h2>
            </div>
          </div>
          <div className="space-y-3">
            {RECOMMENDATIONS.map((rec, i) => (
              <motion.div
                key={rec.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="bg-card rounded-xl border border-border p-4 cursor-pointer hover:border-primary/30 transition-colors group"
                onClick={() => navigate(`/read/${rec.id}`)}
              >
                <p className="text-[10px] text-primary font-medium italic mb-1">{rec.reason}</p>
                <p className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">{rec.title}</p>
                <div className="flex items-center gap-2 mt-2 text-[11px] text-muted-foreground">
                  <span>{rec.source}</span>
                  <span>·</span>
                  <span>{rec.readTime}</span>
                  <span className={`type-tag type-tag-${rec.type.toLowerCase()}`}>{rec.type}</span>
                </div>
                <ArrowUpRight size={14} className="absolute top-4 right-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.div>
            ))}
          </div>
        </section>
      </div>

      <BottomNav />
    </div>
  );
};

export default Explore;
