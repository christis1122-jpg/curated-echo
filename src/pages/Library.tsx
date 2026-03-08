import { useState, useMemo } from "react";
import { AnimatePresence } from "framer-motion";
import { ArrowLeft, FolderOpen } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { MOCK_NOTES, MOCK_THREADS, COLLECTIONS } from "@/data/library";
import ViewToggle from "@/components/library/ViewToggle";
import LibrarySearch from "@/components/library/LibrarySearch";
import NoteCard from "@/components/library/NoteCard";
import ThreadCard from "@/components/library/ThreadCard";
import BottomNav from "@/components/BottomNav";

type LibraryView = "notes" | "highlights" | "threads";

const LibraryPage = () => {
  const navigate = useNavigate();
  const [view, setView] = useState<LibraryView>("notes");
  const [query, setQuery] = useState("");
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [activeCollection, setActiveCollection] = useState<string | null>(null);
  const [notes, setNotes] = useState(MOCK_NOTES);

  const toggleStar = (id: string) => {
    setNotes((prev) => prev.map((n) => (n.id === id ? { ...n, starred: !n.starred } : n)));
  };

  // Filter notes
  const filteredNotes = useMemo(() => {
    let result = notes;
    if (query) {
      const q = query.toLowerCase();
      result = result.filter(
        (n) =>
          n.noteContent.toLowerCase().includes(q) ||
          n.excerpt.toLowerCase().includes(q) ||
          n.articleTitle.toLowerCase().includes(q) ||
          n.articleAuthor.toLowerCase().includes(q)
      );
    }
    if (activeTag) {
      result = result.filter((n) => n.tags.includes(activeTag));
    }
    if (activeCollection) {
      result = result.filter((n) => n.collection === activeCollection);
    }
    return result;
  }, [notes, query, activeTag, activeCollection]);

  // Group highlights by color
  const highlightsByColor = useMemo(() => {
    const colored = filteredNotes.filter((n) => n.highlightColor);
    return {
      yellow: colored.filter((n) => n.highlightColor === "yellow"),
      blue: colored.filter((n) => n.highlightColor === "blue"),
      pink: colored.filter((n) => n.highlightColor === "pink"),
    };
  }, [filteredNotes]);

  const counts = {
    notes: filteredNotes.length,
    highlights: filteredNotes.filter((n) => n.highlightColor).length,
    threads: MOCK_THREADS.length,
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
        <div className="flex items-center gap-3 px-5 py-3 max-w-2xl mx-auto">
          <button onClick={() => navigate("/")} className="p-1.5 -ml-1.5 rounded-lg hover:bg-secondary transition-colors text-foreground">
            <ArrowLeft size={20} />
          </button>
          <h1 className="font-serif text-xl font-semibold text-foreground flex-1">Library</h1>
          <span className="text-xs text-muted-foreground font-medium">{notes.length} notes</span>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-5 pt-4 space-y-4">
        {/* View Toggle */}
        <ViewToggle active={view} onChange={setView} counts={counts} />

        {/* Search */}
        <LibrarySearch query={query} onQueryChange={setQuery} activeTag={activeTag} onTagChange={setActiveTag} />

        {/* Collections */}
        <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
          <button
            onClick={() => setActiveCollection(null)}
            className={`filter-pill shrink-0 ${!activeCollection ? "filter-pill-active" : "filter-pill-inactive"}`}
          >
            All
          </button>
          {COLLECTIONS.map((col) => (
            <button
              key={col}
              onClick={() => setActiveCollection(activeCollection === col ? null : col)}
              className={`filter-pill shrink-0 inline-flex items-center gap-1.5 ${
                activeCollection === col ? "filter-pill-active" : "filter-pill-inactive"
              }`}
            >
              <FolderOpen size={12} />
              {col}
            </button>
          ))}
        </div>

        {/* Content */}
        {view === "notes" && (
          <div className="space-y-3">
            <AnimatePresence mode="popLayout">
              {filteredNotes.map((note, i) => (
                <NoteCard key={note.id} note={note} index={i} onToggleStar={toggleStar} />
              ))}
            </AnimatePresence>
            {filteredNotes.length === 0 && (
              <div className="text-center py-12">
                <p className="text-sm text-muted-foreground">No notes match your search.</p>
              </div>
            )}
          </div>
        )}

        {view === "highlights" && (
          <div className="space-y-6">
            {(["yellow", "blue", "pink"] as const).map((color) => {
              const colorNotes = highlightsByColor[color];
              if (colorNotes.length === 0) return null;
              const labels = { yellow: "Review", blue: "Insight", pink: "Question" };
              const dots = { yellow: "bg-[hsl(45,95%,55%)]", blue: "bg-[hsl(210,70%,50%)]", pink: "bg-[hsl(330,70%,60%)]" };
              return (
                <div key={color}>
                  <div className="flex items-center gap-2 mb-3">
                    <span className={`w-3 h-3 rounded-full ${dots[color]}`} />
                    <h3 className="text-sm font-semibold text-foreground">{labels[color]}</h3>
                    <span className="text-xs text-muted-foreground">{colorNotes.length}</span>
                  </div>
                  <div className="space-y-3">
                    {colorNotes.map((note, i) => (
                      <NoteCard key={note.id} note={note} index={i} onToggleStar={toggleStar} />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {view === "threads" && (
          <div className="space-y-4">
            <p className="text-xs text-muted-foreground leading-relaxed">
              AI-synthesized connections across your reading. Updated as you add new notes.
            </p>
            {MOCK_THREADS.map((thread, i) => (
              <ThreadCard key={thread.id} thread={thread} index={i} />
            ))}
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
};

export default LibraryPage;
