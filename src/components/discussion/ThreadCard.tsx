import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowBigUp, MessageSquare, Share2, Bookmark, BookmarkCheck,
  BadgeCheck, Flame, Award, MoreHorizontal, Flag, ChevronDown, ChevronUp,
  Radio,
} from "lucide-react";
import { ARCHETYPE_COLORS, type DiscussionThread, type DiscussionReply } from "@/data/discussions";
import { toast } from "sonner";

interface ThreadCardProps {
  thread: DiscussionThread;
  index: number;
  onReply: (threadId: string, quotedText?: string) => void;
}

const ReplyItem = ({ reply }: { reply: DiscussionReply }) => (
  <div className="flex gap-2.5 pl-2 border-l-2 border-border">
    <div className="w-7 h-7 rounded-full bg-secondary flex items-center justify-center text-secondary-foreground text-[10px] font-semibold shrink-0">
      {reply.user.avatar}
    </div>
    <div className="flex-1 min-w-0">
      <div className="flex items-center gap-1.5 mb-0.5">
        <span className="text-xs font-medium text-foreground">{reply.user.name}</span>
        <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-medium ${ARCHETYPE_COLORS[reply.user.archetype]}`}>
          {reply.user.archetype}
        </span>
        {reply.isAuthorResponse && (
          <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-primary/10 text-primary font-medium inline-flex items-center gap-0.5">
            <BadgeCheck size={9} /> Author
          </span>
        )}
      </div>
      <p className="text-xs text-foreground leading-relaxed">{reply.content}</p>
      <div className="flex items-center gap-3 mt-1.5 text-[10px] text-muted-foreground">
        <button className="inline-flex items-center gap-0.5 hover:text-foreground transition-colors">
          <ArrowBigUp size={12} /> {reply.upvotes}
        </button>
        <span>{reply.timestamp}</span>
      </div>
    </div>
  </div>
);

const ThreadCard = ({ thread, index, onReply }: ThreadCardProps) => {
  const [bookmarked, setBookmarked] = useState(thread.bookmarked);
  const [upvotes, setUpvotes] = useState(thread.upvotes);
  const [upvoted, setUpvoted] = useState(false);
  const [showReplies, setShowReplies] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const handleUpvote = (e: React.MouseEvent) => {
    e.stopPropagation();
    setUpvoted(!upvoted);
    setUpvotes(upvoted ? upvotes - 1 : upvotes + 1);
  };

  // Render content with bold markdown
  const renderContent = (text: string) => {
    return text.split("\n").map((line, i) => {
      const parts = line.split(/(\*\*[^*]+\*\*)/g);
      return (
        <span key={i}>
          {parts.map((part, j) => {
            if (part.startsWith("**") && part.endsWith("**")) {
              return <strong key={j} className="font-semibold">{part.slice(2, -2)}</strong>;
            }
            if (part.startsWith("@")) {
              return <span key={j} className="text-primary font-medium">{part}</span>;
            }
            return <span key={j}>{part}</span>;
          })}
          {i < text.split("\n").length - 1 && <br />}
        </span>
      );
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, delay: index * 0.04 }}
      className="bg-card border border-border rounded-xl p-4 space-y-3"
    >
      {/* Live indicator */}
      {thread.isLiveDeepDive && (
        <div className="flex items-center gap-1.5 text-[10px] text-primary font-semibold">
          <Radio size={12} className="animate-pulse" />
          Live Deep Dive
        </div>
      )}

      {/* User Header */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-secondary-foreground text-xs font-semibold">
            {thread.user.avatar}
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-sm font-medium text-foreground">{thread.user.name}</span>
              {thread.user.isTopContributor && (
                <Award size={12} className="text-streak" />
              )}
              {thread.user.discussionStreak && thread.user.discussionStreak >= 7 && (
                <span className="inline-flex items-center gap-0.5 text-[9px] text-streak font-medium">
                  <Flame size={10} className="fill-streak" />{thread.user.discussionStreak}
                </span>
              )}
            </div>
            <div className="flex items-center gap-1.5">
              <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-medium ${ARCHETYPE_COLORS[thread.user.archetype]}`}>
                {thread.user.archetype}
              </span>
              <span className="text-[10px] text-muted-foreground">⚡{thread.user.credibility}</span>
              <span className="text-[10px] text-muted-foreground">· {thread.timestamp}</span>
            </div>
          </div>
        </div>

        <div className="relative">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="p-1 rounded-lg hover:bg-secondary transition-colors text-muted-foreground"
          >
            <MoreHorizontal size={14} />
          </button>
          {showMenu && (
            <div className="absolute right-0 top-8 bg-card border border-border rounded-lg shadow-lg py-1 z-10 w-36">
              <button
                onClick={() => { toast("Reported. Thank you."); setShowMenu(false); }}
                className="w-full flex items-center gap-2 px-3 py-1.5 text-xs text-muted-foreground hover:bg-secondary transition-colors"
              >
                <Flag size={12} /> Report
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Author badge */}
      {thread.isAuthorResponse && (
        <span className="text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium inline-flex items-center gap-1">
          <BadgeCheck size={11} /> Author responded
        </span>
      )}

      {/* Quoted text */}
      {thread.quotedText && (
        <div className="pl-3 border-l-2 border-primary/30 text-xs text-muted-foreground italic">
          "{thread.quotedText}"
        </div>
      )}

      {/* Content */}
      <div className="text-sm text-foreground leading-relaxed">
        {renderContent(thread.content)}
      </div>

      {/* Engagement */}
      <div className="flex items-center gap-1 pt-1">
        <button
          onClick={handleUpvote}
          className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs transition-colors ${
            upvoted ? "bg-primary/10 text-primary font-medium" : "text-muted-foreground hover:bg-secondary"
          }`}
        >
          <ArrowBigUp size={15} className={upvoted ? "fill-primary" : ""} />
          {upvotes}
        </button>
        <button
          onClick={() => onReply(thread.id)}
          className="inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs text-muted-foreground hover:bg-secondary transition-colors"
        >
          <MessageSquare size={13} />
          {thread.replyCount}
        </button>
        <button
          onClick={() => { navigator.clipboard.writeText(thread.content); toast("Copied!"); }}
          className="inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs text-muted-foreground hover:bg-secondary transition-colors"
        >
          <Share2 size={13} />
          {thread.shares}
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); setBookmarked(!bookmarked); }}
          className="ml-auto p-1 rounded-lg hover:bg-secondary transition-colors"
        >
          {bookmarked ? (
            <BookmarkCheck size={14} className="text-primary fill-primary" />
          ) : (
            <Bookmark size={14} className="text-muted-foreground" />
          )}
        </button>
      </div>

      {/* Replies */}
      {thread.replies.length > 0 && (
        <div>
          <button
            onClick={() => setShowReplies(!showReplies)}
            className="flex items-center gap-1 text-xs text-primary font-medium hover:underline"
          >
            {showReplies ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
            {showReplies ? "Hide" : "Show"} {thread.replies.length} {thread.replies.length === 1 ? "reply" : "replies"}
            {thread.replies.some((r) => r.isAuthorResponse) && " (incl. author)"}
          </button>

          <AnimatePresence>
            {showReplies && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden mt-3 space-y-3"
              >
                {thread.replies.map((reply) => (
                  <ReplyItem key={reply.id} reply={reply} />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </motion.div>
  );
};

export default ThreadCard;
