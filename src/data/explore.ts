export interface Category {
  id: string;
  name: string;
  emoji: string;
  articleCount: number;
  color: string; // HSL CSS variable name
}

export interface FeaturedCollection {
  id: string;
  title: string;
  subtitle: string;
  articleCount: number;
  gradient: string;
  tag: string;
}

export interface TrendingTopic {
  id: string;
  name: string;
  posts: number;
  trending: "up" | "stable" | "new";
}

export interface NewVoice {
  id: string;
  name: string;
  avatar: string;
  archetype: string;
  archetypeColor: string;
  bio: string;
  followers: number;
  articles: number;
}

export interface CuratedList {
  id: string;
  title: string;
  description: string;
  articleCount: number;
  emoji: string;
  followers: number;
}

export interface RecommendedArticle {
  id: string;
  title: string;
  source: string;
  readTime: string;
  type: string;
  reason: string;
}

export const CATEGORIES: Category[] = [
  { id: "1", name: "Psychology", emoji: "🧠", articleCount: 342, color: "--tag-oped" },
  { id: "2", name: "Philosophy", emoji: "💭", articleCount: 278, color: "--tag-essay" },
  { id: "3", name: "Neuroscience", emoji: "⚡", articleCount: 195, color: "--tag-article" },
  { id: "4", name: "History", emoji: "📜", articleCount: 231, color: "--tag-research" },
  { id: "5", name: "Technology", emoji: "🔮", articleCount: 412, color: "--tag-article" },
  { id: "6", name: "Economics", emoji: "📊", articleCount: 187, color: "--tag-research" },
  { id: "7", name: "Literature", emoji: "📖", articleCount: 156, color: "--tag-essay" },
  { id: "8", name: "Politics", emoji: "⚖️", articleCount: 298, color: "--tag-oped" },
  { id: "9", name: "Science", emoji: "🔬", articleCount: 364, color: "--tag-research" },
  { id: "10", name: "Culture", emoji: "🎭", articleCount: 223, color: "--tag-essay" },
];

export const FEATURED_COLLECTIONS: FeaturedCollection[] = [
  { id: "1", title: "Editor's Collection", subtitle: "Handpicked reads for curious minds", articleCount: 12, gradient: "from-primary/80 to-primary/40", tag: "Featured" },
  { id: "2", title: "Deep Dives", subtitle: "Long-form pieces worth your time", articleCount: 8, gradient: "from-[hsl(var(--tag-article))]/80 to-[hsl(var(--tag-article))]/40", tag: "Popular" },
  { id: "3", title: "Trending Now", subtitle: "What the community is reading", articleCount: 15, gradient: "from-[hsl(var(--tag-research))]/80 to-[hsl(var(--tag-research))]/40", tag: "Hot" },
];

export const TRENDING_TOPICS: TrendingTopic[] = [
  { id: "1", name: "Artificial Consciousness", posts: 1240, trending: "up" },
  { id: "2", name: "Attention Economy", posts: 890, trending: "up" },
  { id: "3", name: "Epistemic Humility", posts: 456, trending: "new" },
  { id: "4", name: "Digital Ethics", posts: 2100, trending: "stable" },
  { id: "5", name: "Cognitive Biases", posts: 1560, trending: "up" },
  { id: "6", name: "Post-Growth", posts: 320, trending: "new" },
  { id: "7", name: "Metamodernism", posts: 670, trending: "stable" },
  { id: "8", name: "Longevity Science", posts: 980, trending: "up" },
];

export const NEW_VOICES: NewVoice[] = [
  { id: "1", name: "Aria Chen", avatar: "AC", archetype: "Polymath", archetypeColor: "hsl(var(--tag-essay))", bio: "Connecting philosophy with AI research", followers: 2400, articles: 18 },
  { id: "2", name: "Marcus Webb", avatar: "MW", archetype: "Scholar", archetypeColor: "hsl(var(--tag-article))", bio: "Deep dives into cognitive science", followers: 1800, articles: 24 },
  { id: "3", name: "Lena Okafor", avatar: "LO", archetype: "Critic", archetypeColor: "hsl(var(--tag-oped))", bio: "Sharp takes on tech and society", followers: 3100, articles: 32 },
  { id: "4", name: "Raj Patel", avatar: "RP", archetype: "Synthesizer", archetypeColor: "hsl(var(--tag-research))", bio: "Bridging Eastern and Western thought", followers: 1500, articles: 15 },
];

export const CURATED_LISTS: CuratedList[] = [
  { id: "1", title: "The Attention Crisis", description: "How technology reshapes our capacity to focus", articleCount: 9, emoji: "👁️", followers: 4200 },
  { id: "2", title: "Future of Work", description: "AI, automation, and human purpose", articleCount: 12, emoji: "🏗️", followers: 6800 },
  { id: "3", title: "Minds & Machines", description: "Where consciousness meets computation", articleCount: 7, emoji: "🤖", followers: 3500 },
  { id: "4", title: "The Meaning Crisis", description: "Finding purpose in a secular age", articleCount: 11, emoji: "🧭", followers: 5100 },
];

export const RECOMMENDATIONS: RecommendedArticle[] = [
  { id: "1", title: "The Neuroscience of Decision Fatigue", source: "Aeon", readTime: "12 min", type: "Research", reason: "Because you read 'Thinking, Fast and Slow'" },
  { id: "2", title: "Why We Can't Stop Scrolling", source: "The Atlantic", readTime: "8 min", type: "Essay", reason: "Because you read 'The Attention Crisis'" },
  { id: "3", title: "Consciousness and Quantum Mechanics", source: "Nautilus", readTime: "15 min", type: "Article", reason: "Because you read 'The Hard Problem'" },
];

export const FORMAT_FILTERS = ["All", "Essays", "Research", "Op-Eds", "Interviews", "Micro-Reads"];

export const RECENT_SEARCHES = ["cognitive biases", "philosophy of mind", "attention economy", "AI alignment"];
