import { useState, useCallback, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { RefreshCw } from "lucide-react";
import TopNav from "@/components/TopNav";
import FilterPills from "@/components/FilterPills";
import ContentCard from "@/components/ContentCard";
import SkeletonCard from "@/components/SkeletonCard";
import BottomNav from "@/components/BottomNav";
import { MOCK_ARTICLES } from "@/data/articles";
import { toast } from "sonner";

const Index = () => {
  const [activeFilter, setActiveFilter] = useState("For You");
  const [articles, setArticles] = useState(MOCK_ARTICLES);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  // Simulate initial load
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(t);
  }, []);

  // Infinite scroll
  useEffect(() => {
    const handleScroll = () => {
      if (loadingMore || loading) return;
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
      if (scrollHeight - scrollTop - clientHeight < 300) {
        setLoadingMore(true);
        setTimeout(() => {
          setArticles((prev) => [
            ...prev,
            ...MOCK_ARTICLES.map((a) => ({ ...a, id: `${a.id}-${Date.now()}-${Math.random()}` })),
          ]);
          setLoadingMore(false);
        }, 800);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loadingMore, loading]);

  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setArticles(
        [...MOCK_ARTICLES].sort(() => Math.random() - 0.5).map((a) => ({
          ...a,
          id: `${a.id}-${Date.now()}`,
        }))
      );
      setRefreshing(false);
      toast("Feed refreshed", { description: "Showing latest content" });
    }, 1000);
  }, []);

  const handleSave = useCallback((id: string) => {
    setArticles((prev) => prev.filter((a) => a.id !== id));
    toast("Saved to Library", {
      action: {
        label: "Undo",
        onClick: () => setArticles((prev) => {
          const saved = MOCK_ARTICLES.find((a) => id.startsWith(a.id));
          return saved ? [saved, ...prev] : prev;
        }),
      },
    });
  }, []);

  const handleDismiss = useCallback((id: string) => {
    setArticles((prev) => prev.filter((a) => a.id !== id));
    toast("Dismissed", {
      action: {
        label: "Undo",
        onClick: () => setArticles((prev) => {
          const dismissed = MOCK_ARTICLES.find((a) => id.startsWith(a.id));
          return dismissed ? [dismissed, ...prev] : prev;
        }),
      },
    });
  }, []);

  return (
    <div className="min-h-screen bg-background pb-20">
      <TopNav />
      <FilterPills activeFilter={activeFilter} onFilterChange={setActiveFilter} />

      {/* Refresh Button */}
      <div className="max-w-2xl mx-auto px-5 pt-4">
        <button
          onClick={handleRefresh}
          disabled={refreshing}
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-4"
        >
          <RefreshCw size={14} className={refreshing ? "animate-spin-slow" : ""} />
          {refreshing ? "Refreshing..." : "Pull to refresh"}
        </button>
      </div>

      {/* Feed */}
      <div className="max-w-2xl mx-auto px-5 space-y-4">
        {loading ? (
          Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)
        ) : (
          <AnimatePresence mode="popLayout">
            {articles.map((article, i) => (
              <ContentCard
                key={article.id}
                article={article}
                index={i}
                onSave={handleSave}
                onDismiss={handleDismiss}
              />
            ))}
          </AnimatePresence>
        )}

        {loadingMore && (
          <div className="space-y-4">
            <SkeletonCard />
            <SkeletonCard />
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
};

export default Index;
