export interface Article {
  id: string;
  type: "Essay" | "Article" | "Research" | "Op-Ed";
  domain: string;
  title: string;
  subtitle: string;
  author: {
    name: string;
    avatar: string;
    subscribers: string;
    rating: number;
  };
  readTime: string;
  wordCount: string;
  access: "Free" | "Subscription" | "Purchase";
  reads: string;
  highlights: string;
  coverGradient?: string;
}

export const MOCK_ARTICLES: Article[] = [
  {
    id: "1",
    type: "Essay",
    domain: "Psychology",
    title: "The Quiet Architecture of Self-Deception",
    subtitle: "How we build elaborate internal narratives to protect ourselves from uncomfortable truths about identity and purpose.",
    author: { name: "Elena Voss", avatar: "EV", subscribers: "34.2k", rating: 4.8 },
    readTime: "12 min", wordCount: "3,200",
    access: "Free",
    reads: "2.3k", highlights: "847",
  },
  {
    id: "2",
    type: "Research",
    domain: "Neuroscience",
    title: "Mapping the Default Mode Network in Creative States",
    subtitle: "New fMRI data reveals surprising patterns of brain connectivity during divergent thinking and artistic flow.",
    author: { name: "Dr. James Chen", avatar: "JC", subscribers: "18.7k", rating: 4.9 },
    readTime: "22 min", wordCount: "6,800",
    access: "Subscription",
    reads: "5.1k", highlights: "1.2k",
  },
  {
    id: "3",
    type: "Op-Ed",
    domain: "Philosophy",
    title: "Why We Should Abandon the Trolley Problem",
    subtitle: "Moral philosophy's most famous thought experiment may be doing more harm than good to ethical reasoning.",
    author: { name: "Marcus Webb", avatar: "MW", subscribers: "12.4k", rating: 4.5 },
    readTime: "8 min", wordCount: "2,100",
    access: "Free",
    reads: "8.9k", highlights: "2.1k",
  },
  {
    id: "4",
    type: "Article",
    domain: "Technology",
    title: "The Unintended Consequences of Attention Engineering",
    subtitle: "Inside the design choices that turned smartphones into the most powerful behavioral modification tools ever built.",
    author: { name: "Sarah Kim", avatar: "SK", subscribers: "52.1k", rating: 4.7 },
    readTime: "15 min", wordCount: "4,500",
    access: "Free",
    reads: "12.4k", highlights: "3.6k",
  },
  {
    id: "5",
    type: "Essay",
    domain: "Literature",
    title: "On the Pleasure of Difficult Books",
    subtitle: "A defense of reading that resists you — and why the struggle is the point, not an obstacle to overcome.",
    author: { name: "Thomas Reed", avatar: "TR", subscribers: "8.9k", rating: 4.6 },
    readTime: "10 min", wordCount: "2,800",
    access: "Purchase",
    reads: "1.8k", highlights: "623",
  },
  {
    id: "6",
    type: "Research",
    domain: "Economics",
    title: "Post-Growth Economies: Evidence from Nordic Experiments",
    subtitle: "How three Scandinavian cities are testing degrowth-aligned economic models with surprising results.",
    author: { name: "Dr. Anya Larsen", avatar: "AL", subscribers: "22.3k", rating: 4.8 },
    readTime: "28 min", wordCount: "8,200",
    access: "Subscription",
    reads: "3.7k", highlights: "1.5k",
  },
  {
    id: "7",
    type: "Op-Ed",
    domain: "Culture",
    title: "The Myth of Digital Minimalism",
    subtitle: "Why reducing screen time misses the real problem with our relationship to technology.",
    author: { name: "Priya Sharma", avatar: "PS", subscribers: "41.6k", rating: 4.4 },
    readTime: "7 min", wordCount: "1,900",
    access: "Free",
    reads: "15.2k", highlights: "4.1k",
  },
];

export const FILTERS = [
  "For You",
  "Trending",
  "New Voices",
  "Deep Reads",
  "Psychology",
  "Philosophy",
  "Technology",
  "Neuroscience",
  "Economics",
  "Literature",
  "Culture",
];
