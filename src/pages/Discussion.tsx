import { useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowUpDown, Users, PenLine } from "lucide-react";
import { MOCK_ARTICLES } from "@/data/articles";
import { MOCK_DISCUSSIONS, type DiscussionTab } from "@/data/discussions";
import DiscussionTabs from "@/components/discussion/DiscussionTabs";
import ThreadCard from "@/components/discussion/ThreadCard";
import ReplyComposer from "@/components/discussion/ReplyComposer";
import { toast } from "sonner";

type SortMode = "top" | "newest" | "author";

const Discussion = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const baseId = id?.split("-")[0] || "";
  const article = MOCK_ARTICLES.find((a) => a.id === baseId);
  const threads = MOCK_DISCUSSIONS[baseId] || [];

  const [activeTab, setActiveTab] = useState<DiscussionTab>("debate");
  const [sort, setSort] = useState<SortMode>("top");
  const [showSort, setShowSort] = useState(false);
  const [replyState, setReplyState] = useState<{
    open: boolean;
    threadId?: string;
    quotedText?: string;
    threadAuthor?: string;
  }>({ open: false });

  const tabCounts = useMemo(() => ({
    debate: threads.filter((t) => t.tab === "debate").length,
    takeaways: threads.filter((t) => t.tab === "takeaways").length,
    questions: threads.filter((t) => t.tab === "questions").length,
    resources: threads.filter((t) => t.tab === "resources").length,
  }), [threads]);

  const filteredThreads = useMemo(() => {
    let result = threads.filter((t) => t.tab === activeTab);
    if (sort === "top") result.sort((a, b) => b.upvotes - a.upvotes);
    if (sort === "newest") result.sort((a, b) => a.timestamp.localeCompare(b.timestamp));
    if (sort === "author") result = result.filter((t) => t.replies.some((r) => r.isAuthorResponse) || t.isAuthorResponse);
    return result;
  }, [threads, activeTab, sort]);

  const totalParticipants = new Set(threads.flatMap((t) => [t.user.name, ...t.replies.map((r) => r.user.name)])).size;

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="font-serif text-2xl font-semibold text-foreground mb-2">Discussion not found</h1>
          <button onClick={() => navigate("/")} className="text-primary hover:underline text-sm">Back to feed</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/90 backdrop-blur-xl border-b border-border">
        <div className="flex items-center gap-3 px-4 py-3 max-w-2xl mx-auto">
          <button onClick={() => navigate(-1)} className="p-1.5 -ml-1.5 rounded-lg hover:bg-secondary transition-colors text-foreground">
            <ArrowLeft size={20} />
          </button>
          <div className="flex-1 min-w-0">
            <h1 className="font-serif text-sm font-semibold text-foreground truncate">Discussion</h1>
            <p className="text-[11px] text-muted-foreground truncate">{article.title}</p>
          </div>
          <div className="flex items-center gap-1 text-xs text-muted-foreground shrink-0">
            <Users size={13} />
            {totalParticipants}
          </div>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-5 pt-4 space-y-4">
        {/* Article context */}
        <div className="p-3 bg-secondary/30 border border-border rounded-xl">
          <p className="font-serif text-sm font-semibold text-foreground leading-snug">{article.title}</p>
          <p className="text-xs text-muted-foreground mt-0.5">{article.author.name} · {article.domain} · {threads.length} threads</p>
        </div>

        {/* Tabs */}
        <DiscussionTabs active={activeTab} onChange={setActiveTab} counts={tabCounts} />

        {/* Sort + New post */}
        <div className="flex items-center justify-between">
          <div className="relative">
            <button
              onClick={() => setShowSort(!showSort)}
              className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowUpDown size={13} />
              {sort === "top" ? "Top" : sort === "newest" ? "Newest" : "Author Favorites"}
            </button>
            {showSort && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute top-7 left-0 bg-card border border-border rounded-lg shadow-lg py-1 z-10 w-40"
              >
                {(["top", "newest", "author"] as SortMode[]).map((s) => (
                  <button
                    key={s}
                    onClick={() => { setSort(s); setShowSort(false); }}
                    className={`w-full text-left px-3 py-1.5 text-xs transition-colors ${
                      sort === s ? "text-primary font-medium bg-accent" : "text-foreground hover:bg-secondary"
                    }`}
                  >
                    {s === "top" ? "Top" : s === "newest" ? "Newest" : "Author Favorites"}
                  </button>
                ))}
              </motion.div>
            )}
          </div>

          <button
            onClick={() => setReplyState({ open: true })}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary text-primary-foreground text-xs font-medium hover:bg-primary/90 transition-colors"
          >
            <PenLine size={12} />
            New Post
          </button>
        </div>

        {/* Threads */}
        <div className="space-y-3">
          {filteredThreads.length > 0 ? (
            filteredThreads.map((thread, i) => (
              <ThreadCard
                key={thread.id}
                thread={thread}
                index={i}
                onReply={(threadId, quoted) => {
                  const t = threads.find((th) => th.id === threadId);
                  setReplyState({
                    open: true,
                    threadId,
                    quotedText: quoted,
                    threadAuthor: t?.user.name,
                  });
                }}
              />
            ))
          ) : (
            <div className="text-center py-16 space-y-3">
              <div className="w-14 h-14 rounded-2xl bg-accent/50 flex items-center justify-center mx-auto">
                <PenLine size={24} className="text-primary" />
              </div>
              <h3 className="font-serif text-lg font-semibold text-foreground">Start the conversation</h3>
              <p className="text-sm text-muted-foreground max-w-xs mx-auto">
                {activeTab === "debate" && "Share your perspective on the author's arguments. Thoughtful disagreement is welcome."}
                {activeTab === "takeaways" && "What were the most important ideas? Summarize what resonated with you."}
                {activeTab === "questions" && "What questions did this piece raise for you? What's left unanswered?"}
                {activeTab === "resources" && "Share related books, papers, podcasts, or links that extend the conversation."}
              </p>
              <button
                onClick={() => setReplyState({ open: true })}
                className="px-5 py-2 bg-primary text-primary-foreground rounded-xl text-sm font-medium hover:bg-primary/90 transition-colors"
              >
                Be the first to post
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Reply Composer */}
      <ReplyComposer
        open={replyState.open}
        onClose={() => setReplyState({ open: false })}
        onSend={(content) => {
          toast("Posted! Your contribution is live.");
        }}
        quotedText={replyState.quotedText}
        threadAuthor={replyState.threadAuthor}
      />
    </div>
  );
};

export default Discussion;
