import { useState, useEffect, useCallback, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { MOCK_ARTICLES, ARTICLE_CONTENTS } from "@/data/articles";
import { useReaderState } from "@/hooks/useReaderState";
import ReaderTopBar from "@/components/reader/ReaderTopBar";
import ReaderBottomBar from "@/components/reader/ReaderBottomBar";
import KeyIdeas from "@/components/reader/KeyIdeas";
import HighlightMenu, { NoteModal, DefinitionPopup } from "@/components/reader/HighlightMenu";
import { toast } from "sonner";

const themeStyles = {
  light: "bg-background text-foreground",
  sepia: "bg-[hsl(35,40%,92%)] text-[hsl(20,10%,15%)]",
  dark: "bg-[hsl(20,10%,8%)] text-[hsl(40,20%,88%)]",
};

const Reader = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const contentRef = useRef<HTMLDivElement>(null);

  // Find article (handle duplicated IDs from infinite scroll)
  const baseId = id?.split("-")[0] || "";
  const article = MOCK_ARTICLES.find((a) => a.id === baseId);
  const articleContent = ARTICLE_CONTENTS[baseId];

  const {
    bookmarked, toggleBookmark,
    fontSize, setFontSize,
    lineHeight, setLineHeight,
    theme, setTheme,
    showKeyIdeas, setShowKeyIdeas,
    addHighlight, addNote,
  } = useReaderState();

  const [progress, setProgress] = useState(0);
  const [menuState, setMenuState] = useState<{
    show: boolean;
    position: { x: number; y: number };
    text: string;
  }>({ show: false, position: { x: 0, y: 0 }, text: "" });
  const [noteModal, setNoteModal] = useState(false);
  const [defPopup, setDefPopup] = useState<{ word: string; position: { x: number; y: number } } | null>(null);

  // Scroll progress tracking
  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
      const prog = (scrollTop / (scrollHeight - clientHeight)) * 100;
      setProgress(Math.min(100, Math.max(0, prog)));
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Text selection handler
  const handleTextSelect = useCallback(() => {
    const selection = window.getSelection();
    if (!selection || selection.isCollapsed || !selection.toString().trim()) {
      return;
    }

    const text = selection.toString().trim();
    const range = selection.getRangeAt(0);
    const rect = range.getBoundingClientRect();

    setMenuState({
      show: true,
      position: { x: rect.left + rect.width / 2, y: rect.top + window.scrollY },
      text,
    });
  }, []);

  // Double-tap bookmark
  const lastTap = useRef(0);
  const handleDoubleTap = useCallback(() => {
    const now = Date.now();
    if (now - lastTap.current < 300) {
      toggleBookmark();
      toast(bookmarked ? "Bookmark removed" : "Bookmarked!");
    }
    lastTap.current = now;
  }, [toggleBookmark, bookmarked]);

  // Prevent print/export
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && (e.key === "p" || e.key === "s")) {
        e.preventDefault();
        toast("Export is disabled to protect creator content.");
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  if (!article || !articleContent) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="font-serif text-2xl font-semibold text-foreground mb-2">Article not found</h1>
          <button onClick={() => navigate("/")} className="text-primary hover:underline text-sm">
            Back to feed
          </button>
        </div>
      </div>
    );
  }

  const totalMinutes = parseInt(article.readTime);
  const minutesRemaining = Math.max(1, Math.round(totalMinutes * (1 - progress / 100)));

  // Render markdown-ish content
  const renderContent = (text: string) => {
    return text.split("\n\n").map((paragraph, i) => {
      if (paragraph.startsWith("## ")) {
        return (
          <h2 key={i} className="font-serif text-xl font-semibold text-foreground mt-10 mb-4">
            {paragraph.replace("## ", "")}
          </h2>
        );
      }
      if (paragraph.startsWith("### ")) {
        return (
          <h3 key={i} className="font-serif text-lg font-semibold text-foreground mt-8 mb-3">
            {paragraph.replace("### ", "")}
          </h3>
        );
      }

      // Handle bold text
      const parts = paragraph.split(/(\*\*[^*]+\*\*)/g);
      return (
        <p key={i} className="mb-5">
          {parts.map((part, j) => {
            if (part.startsWith("**") && part.endsWith("**")) {
              return <strong key={j} className="font-semibold text-foreground">{part.slice(2, -2)}</strong>;
            }
            return <span key={j}>{part}</span>;
          })}
        </p>
      );
    });
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${themeStyles[theme]}`}>
      <ReaderTopBar
        progress={progress}
        timeRemaining={`${minutesRemaining} min`}
        bookmarked={bookmarked}
        onToggleBookmark={() => {
          toggleBookmark();
          toast(bookmarked ? "Bookmark removed" : "Bookmarked!");
        }}
      />

      {/* Article Content */}
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="max-w-2xl mx-auto px-6 pt-24 pb-24"
        onClick={handleDoubleTap}
      >
        {/* Article Header */}
        <header className="mb-10">
          <div className="flex items-center gap-2 mb-4">
            <span className={`type-tag ${
              article.type === "Essay" ? "type-tag-essay" :
              article.type === "Article" ? "type-tag-article" :
              article.type === "Research" ? "type-tag-research" : "type-tag-oped"
            }`}>
              {article.type}
            </span>
            <span className="text-xs text-muted-foreground font-medium">{article.domain}</span>
          </div>

          <h1 className="font-serif text-3xl md:text-4xl font-bold leading-tight text-foreground mb-3">
            {article.title}
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed mb-6">
            {article.subtitle}
          </p>

          <div className="flex items-center gap-3 pb-6 border-b border-border">
            <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-secondary-foreground text-sm font-semibold">
              {article.author.avatar}
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">{article.author.name}</p>
              <p className="text-xs text-muted-foreground">
                {article.readTime} · {article.wordCount} words · {article.reads} reads
              </p>
            </div>
          </div>
        </header>

        {/* Key Ideas */}
        {articleContent.keyIdeas && (
          <KeyIdeas
            ideas={articleContent.keyIdeas}
            open={showKeyIdeas}
            onToggle={() => setShowKeyIdeas(!showKeyIdeas)}
          />
        )}

        {/* Article Body */}
        <div
          ref={contentRef}
          onMouseUp={handleTextSelect}
          onTouchEnd={handleTextSelect}
          className="font-serif selection:bg-[hsl(45,95%,55%,0.3)]"
          style={{
            fontSize: `${fontSize}px`,
            lineHeight: lineHeight,
          }}
        >
          {renderContent(articleContent.content)}
        </div>

        {/* End marker */}
        <div className="mt-16 pt-8 border-t border-border text-center">
          <p className="text-sm text-muted-foreground">End of article</p>
          <button
            onClick={() => navigate("/")}
            className="mt-3 text-sm text-primary hover:underline"
          >
            Back to feed
          </button>
        </div>
      </motion.main>

      {/* Highlight Context Menu */}
      {menuState.show && (
        <HighlightMenu
          position={menuState.position}
          selectedText={menuState.text}
          onHighlight={(color) => {
            addHighlight({ text: menuState.text, color, startOffset: 0, endOffset: 0 });
            toast(`Highlighted as ${color === "yellow" ? "Review" : color === "blue" ? "Insight" : "Question"}`);
            setMenuState({ show: false, position: { x: 0, y: 0 }, text: "" });
            window.getSelection()?.removeAllRanges();
          }}
          onNote={() => {
            setNoteModal(true);
            setMenuState((s) => ({ ...s, show: false }));
          }}
          onDefine={() => {
            const word = menuState.text.split(" ")[0];
            setDefPopup({ word, position: menuState.position });
            setMenuState((s) => ({ ...s, show: false }));
          }}
          onShare={() => {
            navigator.clipboard.writeText(`"${menuState.text}" — ${article.author.name}`);
            toast("Quote copied to clipboard");
            setMenuState({ show: false, position: { x: 0, y: 0 }, text: "" });
          }}
          onClose={() => {
            setMenuState({ show: false, position: { x: 0, y: 0 }, text: "" });
            window.getSelection()?.removeAllRanges();
          }}
        />
      )}

      {/* Note Modal */}
      <NoteModal
        open={noteModal}
        onClose={() => setNoteModal(false)}
        onSave={(content, tags) => {
          addNote({ content, tags, highlightId: undefined });
          toast("Note saved!");
        }}
        selectedText={menuState.text}
      />

      {/* Definition Popup */}
      {defPopup && (
        <DefinitionPopup
          word={defPopup.word}
          position={defPopup.position}
          onClose={() => setDefPopup(null)}
        />
      )}

      <ReaderBottomBar
        fontSize={fontSize}
        lineHeight={lineHeight}
        theme={theme}
        onFontSizeChange={setFontSize}
        onLineHeightChange={setLineHeight}
        onThemeChange={setTheme}
        onTakeNote={() => setNoteModal(true)}
        onJoinDiscussion={() => toast("Discussion coming soon!")}
      />
    </div>
  );
};

export default Reader;
