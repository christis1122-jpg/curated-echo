import { useState, useCallback } from "react";

export interface Highlight {
  id: string;
  text: string;
  color: "yellow" | "blue" | "pink";
  note?: string;
  tags?: string[];
  startOffset: number;
  endOffset: number;
}

export interface ReaderNote {
  id: string;
  highlightId?: string;
  content: string;
  tags: string[];
  createdAt: Date;
}

export function useReaderState() {
  const [highlights, setHighlights] = useState<Highlight[]>([]);
  const [notes, setNotes] = useState<ReaderNote[]>([]);
  const [bookmarked, setBookmarked] = useState(false);
  const [fontSize, setFontSize] = useState(18);
  const [lineHeight, setLineHeight] = useState(1.8);
  const [theme, setTheme] = useState<"light" | "sepia" | "dark">("light");
  const [showKeyIdeas, setShowKeyIdeas] = useState(false);

  const addHighlight = useCallback((highlight: Omit<Highlight, "id">) => {
    setHighlights((prev) => [...prev, { ...highlight, id: crypto.randomUUID() }]);
  }, []);

  const removeHighlight = useCallback((id: string) => {
    setHighlights((prev) => prev.filter((h) => h.id !== id));
  }, []);

  const addNote = useCallback((note: Omit<ReaderNote, "id" | "createdAt">) => {
    setNotes((prev) => [...prev, { ...note, id: crypto.randomUUID(), createdAt: new Date() }]);
  }, []);

  const toggleBookmark = useCallback(() => setBookmarked((b) => !b), []);

  return {
    highlights, addHighlight, removeHighlight,
    notes, addNote,
    bookmarked, toggleBookmark,
    fontSize, setFontSize,
    lineHeight, setLineHeight,
    theme, setTheme,
    showKeyIdeas, setShowKeyIdeas,
  };
}
