export interface UserProfile {
  displayName: string;
  bio: string;
  joinDate: string;
  archetype: string;
  archetypeColor: string;
  archetypeDescription: string;
  avatar: string;
  daysRead: number;
  articlesCompleted: number;
  favoriteDomains: string[];
  following: number;
  followers: number;
}

export interface ArchetypeRadar {
  trait: string;
  value: number;
  fullMark: number;
}

export interface ReadingGoal {
  id: string;
  label: string;
  current: number;
  target: number;
  unit: string;
}

export const USER_PROFILE: UserProfile = {
  displayName: "Alex Rivera",
  bio: "Curious polymath exploring the intersections of philosophy, technology, and consciousness.",
  joinDate: "September 2025",
  archetype: "Polymath",
  archetypeColor: "hsl(var(--tag-essay))",
  archetypeDescription: "You thrive on connecting ideas across domains. Your reading pattern shows a rare breadth of curiosity combined with the ability to synthesize disparate concepts into novel insights.",
  avatar: "AR",
  daysRead: 142,
  articlesCompleted: 67,
  favoriteDomains: ["Philosophy", "Technology", "Neuroscience"],
  following: 48,
  followers: 124,
};

export const ARCHETYPE_RADAR: ArchetypeRadar[] = [
  { trait: "Curiosity", value: 92, fullMark: 100 },
  { trait: "Depth", value: 75, fullMark: 100 },
  { trait: "Breadth", value: 88, fullMark: 100 },
  { trait: "Critical Thinking", value: 70, fullMark: 100 },
  { trait: "Synthesis", value: 85, fullMark: 100 },
  { trait: "Consistency", value: 65, fullMark: 100 },
];

export const READING_GOALS: ReadingGoal[] = [
  { id: "1", label: "Daily Articles", current: 2, target: 3, unit: "articles" },
  { id: "2", label: "Daily Reading Time", current: 25, target: 45, unit: "min" },
  { id: "3", label: "Weekly Deep Dives", current: 1, target: 2, unit: "papers" },
];

export const INTEREST_TAGS = [
  "Philosophy", "Technology", "Neuroscience", "Psychology",
  "Economics", "History", "Literature", "Politics",
  "Science", "Culture", "AI", "Ethics",
];
