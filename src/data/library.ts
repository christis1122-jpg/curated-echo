export interface LibraryNote {
  id: string;
  articleTitle: string;
  articleAuthor: string;
  articleDomain: string;
  excerpt: string;
  highlightColor: "yellow" | "blue" | "pink" | null;
  noteContent: string;
  tags: string[];
  starred: boolean;
  collection?: string;
  timestamp: string;
  sessionContext: string;
}

export interface InsightThread {
  id: string;
  title: string;
  summary: string;
  noteIds: string[];
  connections: { from: string; to: string; label: string }[];
  createdAt: string;
}

import { NOTE_IDS, THREAD_IDS, ARTICLE_IDS, ARCHIVED_READ_IDS } from "@/data/gyst-ids";

export const MOCK_NOTES: LibraryNote[] = [
  {
    id: NOTE_IDS.n1,
    articleTitle: "The Quiet Architecture of Self-Deception",
    articleAuthor: "Elena Voss",
    articleDomain: "Psychology",
    excerpt: "Self-deception is not a bug in human cognition — it is a feature. Evolutionary psychologists have long argued that our capacity for self-deception evolved because it makes us more effective deceivers of others.",
    highlightColor: "blue",
    noteContent: "This reframing of self-deception as adaptive rather than pathological changes everything. What if our 'flaws' are actually survival mechanisms?",
    tags: ["cognition", "evolution", "identity"],
    starred: true,
    collection: "Mind & Self",
    timestamp: "2 hours ago",
    sessionContext: "Morning read · 12 min session",
  },
  {
    id: NOTE_IDS.n2,
    articleTitle: "The Quiet Architecture of Self-Deception",
    articleAuthor: "Elena Voss",
    articleDomain: "Psychology",
    excerpt: "People with perfectly accurate self-perception — those who see themselves exactly as they are — tend to be mildly depressed. Psychologists call this 'depressive realism.'",
    highlightColor: "yellow",
    noteContent: "Depressive realism — the idea that accurate self-knowledge leads to depression. Need to explore this further. Is there a healthy middle ground?",
    tags: ["psychology", "depression", "self-knowledge"],
    starred: false,
    collection: "Mind & Self",
    timestamp: "2 hours ago",
    sessionContext: "Morning read · 12 min session",
  },
  {
    id: NOTE_IDS.n3,
    articleTitle: "Mapping the Default Mode Network in Creative States",
    articleAuthor: "Dr. James Chen",
    articleDomain: "Neuroscience",
    excerpt: "Peak creative moments were characterized by dynamic coupling between the DMN and the executive control network (ECN).",
    highlightColor: "blue",
    noteContent: "Creativity isn't about 'turning off' the analytical mind — it's about rapid switching between divergent and convergent thinking. This maps to my experience with brainstorming sessions.",
    tags: ["creativity", "neuroscience", "flow"],
    starred: true,
    collection: "Creative Process",
    timestamp: "Yesterday",
    sessionContext: "Evening deep read · 22 min session",
  },
  {
    id: NOTE_IDS.n4,
    articleTitle: "Why We Should Abandon the Trolley Problem",
    articleAuthor: "Marcus Webb",
    articleDomain: "Philosophy",
    excerpt: "The trolley problem trains us to think about ethics as a kind of arithmetic: five lives versus one life, a simple calculation.",
    highlightColor: "pink",
    noteContent: "Question: If moral philosophy shouldn't start with hypotheticals, where should it start? Murdoch says 'attention' — but is that too vague to be actionable?",
    tags: ["ethics", "philosophy", "questions"],
    starred: false,
    timestamp: "2 days ago",
    sessionContext: "Lunch break · 8 min session",
  },
  {
    id: NOTE_IDS.n5,
    articleTitle: "The Unintended Consequences of Attention Engineering",
    articleAuthor: "Sarah Kim",
    articleDomain: "Technology",
    excerpt: "The mere presence of a smartphone — even when turned off — reduces available cognitive capacity.",
    highlightColor: "yellow",
    noteContent: "This has profound implications for workspace design. If even the presence of a phone drains cognitive resources, what does that mean for open offices full of screens?",
    tags: ["attention", "technology", "productivity"],
    starred: true,
    collection: "Tech & Mind",
    timestamp: "3 days ago",
    sessionContext: "Night reading · 15 min session",
  },
  {
    id: "n6",
    articleTitle: "The Unintended Consequences of Attention Engineering",
    articleAuthor: "Sarah Kim",
    articleDomain: "Technology",
    excerpt: "Attention is the fundamental resource of conscious experience. How we allocate it determines what we perceive, what we think, what we feel, and ultimately, who we become.",
    highlightColor: "blue",
    noteContent: "Attention as identity-shaping force. This connects to the self-deception essay — we choose what to attend to, and that shapes who we become.",
    tags: ["attention", "identity", "philosophy"],
    starred: false,
    collection: "Tech & Mind",
    timestamp: "3 days ago",
    sessionContext: "Night reading · 15 min session",
  },
];

export const MOCK_THREADS: InsightThread[] = [
  {
    id: "t1",
    title: "The Self as Constructed Narrative",
    summary: "Your notes reveal a recurring theme: identity isn't discovered but built through selective attention, self-deception, and the stories we tell ourselves. Elena Voss's essay on self-deception connects directly to Sarah Kim's argument that attention shapes who we become.",
    noteIds: ["n1", "n2", "n6"],
    connections: [
      { from: "n1", to: "n6", label: "Self-deception ↔ Attention as identity" },
      { from: "n2", to: "n1", label: "Depressive realism ↔ Adaptive deception" },
    ],
    createdAt: "1 hour ago",
  },
  {
    id: "t2",
    title: "Creativity Requires Cognitive Flexibility",
    summary: "The DMN-ECN coupling in creative states mirrors the broader theme across your reading: the best thinking doesn't suppress any mode but switches fluidly between them. This connects to questions about whether moral reasoning needs both abstract and embodied thinking.",
    noteIds: ["n3", "n4"],
    connections: [
      { from: "n3", to: "n4", label: "Cognitive switching ↔ Ethical reasoning modes" },
    ],
    createdAt: "Yesterday",
  },
  {
    id: "t3",
    title: "Technology as Cognitive Architecture",
    summary: "Sarah Kim's work on attention engineering and your observations about workspace design suggest that our cognitive environment is as important as our cognitive habits. The tools we surround ourselves with shape our thinking capacity.",
    noteIds: ["n5", "n6", "n3"],
    connections: [
      { from: "n5", to: "n3", label: "Cognitive depletion ↔ Creative capacity" },
      { from: "n5", to: "n6", label: "Phone presence ↔ Attention allocation" },
    ],
    createdAt: "2 days ago",
  },
];

export interface ArchivedRead {
  id: string;
  articleId: string;
  title: string;
  author: string;
  domain: string;
  type: "Essay" | "Article" | "Research" | "Op-Ed";
  readTime: string;
  wordCount: string;
  completedAt: string;
  progress: number; // 0-100
  notesCount: number;
  highlightsCount: number;
}

export const MOCK_ARCHIVED_READS: ArchivedRead[] = [
  {
    id: "ar1",
    articleId: "1",
    title: "The Quiet Architecture of Self-Deception",
    author: "Elena Voss",
    domain: "Psychology",
    type: "Essay",
    readTime: "12 min",
    wordCount: "3,200",
    completedAt: "2 hours ago",
    progress: 100,
    notesCount: 2,
    highlightsCount: 3,
  },
  {
    id: "ar2",
    articleId: "2",
    title: "Mapping the Default Mode Network in Creative States",
    author: "Dr. James Chen",
    domain: "Neuroscience",
    type: "Research",
    readTime: "22 min",
    wordCount: "6,800",
    completedAt: "Yesterday",
    progress: 100,
    notesCount: 1,
    highlightsCount: 2,
  },
  {
    id: "ar3",
    articleId: "4",
    title: "The Unintended Consequences of Attention Engineering",
    author: "Sarah Kim",
    domain: "Technology",
    type: "Article",
    readTime: "15 min",
    wordCount: "4,500",
    completedAt: "3 days ago",
    progress: 100,
    notesCount: 2,
    highlightsCount: 4,
  },
  {
    id: "ar4",
    articleId: "3",
    title: "Why We Should Abandon the Trolley Problem",
    author: "Marcus Webb",
    domain: "Philosophy",
    type: "Op-Ed",
    readTime: "8 min",
    wordCount: "2,100",
    completedAt: "5 days ago",
    progress: 72,
    notesCount: 1,
    highlightsCount: 1,
  },
  {
    id: "ar5",
    articleId: "7",
    title: "The Myth of Digital Minimalism",
    author: "Priya Sharma",
    domain: "Culture",
    type: "Op-Ed",
    readTime: "7 min",
    wordCount: "1,900",
    completedAt: "1 week ago",
    progress: 45,
    notesCount: 0,
    highlightsCount: 0,
  },
];

export const COLLECTIONS = ["Mind & Self", "Creative Process", "Tech & Mind", "Ethics & Society"];

export const ALL_TAGS = [
  "cognition", "evolution", "identity", "psychology", "depression",
  "self-knowledge", "creativity", "neuroscience", "flow", "ethics",
  "philosophy", "questions", "attention", "technology", "productivity",
];
