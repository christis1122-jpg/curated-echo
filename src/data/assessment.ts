export type QuestionType = "slider" | "card_select" | "binary";

export interface SliderQuestion {
  id: string;
  type: "slider";
  question: string;
  leftLabel: string;
  rightLabel: string;
  dimension: string;
}

export interface CardSelectQuestion {
  id: string;
  type: "card_select";
  question: string;
  subtitle: string;
  minSelect: number;
  maxSelect: number;
  options: { id: string; label: string; emoji: string; description: string }[];
  dimension: string;
}

export interface BinaryQuestion {
  id: string;
  type: "binary";
  question: string;
  optionA: { label: string; emoji: string; description: string };
  optionB: { label: string; emoji: string; description: string };
  dimension: string;
}

export type AssessmentQuestion = SliderQuestion | CardSelectQuestion | BinaryQuestion;

export interface Archetype {
  id: string;
  name: string;
  title: string;
  emoji: string;
  color: string;
  gradient: [string, string];
  description: string;
  strengths: string[];
  readingStyle: string;
  dimensions: { trait: string; value: number }[];
}

export const ASSESSMENT_QUESTIONS: AssessmentQuestion[] = [
  {
    id: "q1",
    type: "binary",
    question: "How do you approach a new topic?",
    optionA: { label: "Deep Dive", emoji: "🤿", description: "I go all-in on one subject until I've exhausted every angle" },
    optionB: { label: "Wide Scan", emoji: "🔭", description: "I skim across many sources to build a broad mental map" },
    dimension: "depth",
  },
  {
    id: "q2",
    type: "slider",
    question: "Where do you fall on the thinking spectrum?",
    leftLabel: "Analytical",
    rightLabel: "Intuitive",
    dimension: "cognition",
  },
  {
    id: "q3",
    type: "card_select",
    question: "Which domains captivate you most?",
    subtitle: "Pick 3 that light up your curiosity",
    minSelect: 3,
    maxSelect: 3,
    options: [
      { id: "psychology", label: "Psychology", emoji: "🧠", description: "The human mind" },
      { id: "philosophy", label: "Philosophy", emoji: "💭", description: "Big questions" },
      { id: "neuroscience", label: "Neuroscience", emoji: "⚡", description: "Brain science" },
      { id: "history", label: "History", emoji: "📜", description: "Past lessons" },
      { id: "technology", label: "Technology", emoji: "💻", description: "Innovation" },
      { id: "economics", label: "Economics", emoji: "📊", description: "Markets & systems" },
      { id: "literature", label: "Literature", emoji: "📚", description: "Stories & craft" },
      { id: "science", label: "Science", emoji: "🔬", description: "Discovery" },
    ],
    dimension: "breadth",
  },
  {
    id: "q4",
    type: "binary",
    question: "After reading something fascinating, you usually…",
    optionA: { label: "Reflect Solo", emoji: "🧘", description: "Process it internally through quiet contemplation" },
    optionB: { label: "Discuss It", emoji: "💬", description: "Talk about it with someone or share your take" },
    dimension: "social",
  },
  {
    id: "q5",
    type: "slider",
    question: "How important is practical application?",
    leftLabel: "Theory First",
    rightLabel: "Practice First",
    dimension: "application",
  },
  {
    id: "q6",
    type: "binary",
    question: "Your ideal reading session looks like…",
    optionA: { label: "Long Form", emoji: "📖", description: "A 2-hour deep session with a single long essay" },
    optionB: { label: "Micro Reads", emoji: "⚡", description: "Several short pieces covering different angles" },
    dimension: "format",
  },
  {
    id: "q7",
    type: "slider",
    question: "How much do you challenge your own views?",
    leftLabel: "Confirm & Deepen",
    rightLabel: "Seek Contrarians",
    dimension: "openness",
  },
  {
    id: "q8",
    type: "card_select",
    question: "What motivates your reading?",
    subtitle: "Select up to 2",
    minSelect: 1,
    maxSelect: 2,
    options: [
      { id: "growth", label: "Personal Growth", emoji: "🌱", description: "Becoming a better person" },
      { id: "career", label: "Career Edge", emoji: "🚀", description: "Professional advantage" },
      { id: "curiosity", label: "Pure Curiosity", emoji: "✨", description: "The joy of knowing" },
      { id: "connection", label: "Connection", emoji: "🤝", description: "Understanding others" },
    ],
    dimension: "motivation",
  },
  {
    id: "q9",
    type: "slider",
    question: "How much structure do you want in your learning?",
    leftLabel: "Serendipitous",
    rightLabel: "Structured",
    dimension: "structure",
  },
  {
    id: "q10",
    type: "binary",
    question: "The ultimate sign of understanding is…",
    optionA: { label: "Explaining Simply", emoji: "🎯", description: "Being able to explain it to a 10-year-old" },
    optionB: { label: "Creating Something", emoji: "🎨", description: "Using the idea to build or create something new" },
    dimension: "synthesis",
  },
];

export const ARCHETYPES: Archetype[] = [
  {
    id: "synthesizer",
    name: "The Synthesizer",
    title: "Weaver of Ideas",
    emoji: "🧬",
    color: "hsl(280 55% 50%)",
    gradient: ["hsl(280 55% 50%)", "hsl(320 60% 55%)"],
    description:
      "You see connections where others see boundaries. Your mind naturally weaves disparate ideas into unified frameworks, making you a rare intellectual architect who builds bridges between disciplines.",
    strengths: ["Cross-domain thinking", "Pattern recognition", "Framework building", "Intellectual empathy"],
    readingStyle: "You thrive on diverse reading that lets you connect dots across fields.",
    dimensions: [
      { trait: "Curiosity", value: 92 },
      { trait: "Depth", value: 78 },
      { trait: "Synthesis", value: 95 },
      { trait: "Application", value: 70 },
      { trait: "Openness", value: 88 },
    ],
  },
  {
    id: "deep-diver",
    name: "The Deep Diver",
    title: "Master of Depth",
    emoji: "🤿",
    color: "hsl(210 70% 50%)",
    gradient: ["hsl(210 70% 50%)", "hsl(240 60% 55%)"],
    description:
      "You don't skim — you excavate. When a topic captures your attention, you pursue it with relentless focus, extracting insights that surface-level readers never find. You're the expert others turn to.",
    strengths: ["Focused expertise", "Critical analysis", "Detail orientation", "Thorough understanding"],
    readingStyle: "You prefer long-form deep dives that exhaustively cover a single subject.",
    dimensions: [
      { trait: "Curiosity", value: 75 },
      { trait: "Depth", value: 97 },
      { trait: "Synthesis", value: 65 },
      { trait: "Application", value: 82 },
      { trait: "Openness", value: 70 },
    ],
  },
  {
    id: "explorer",
    name: "The Explorer",
    title: "Seeker of Horizons",
    emoji: "🧭",
    color: "hsl(160 60% 40%)",
    gradient: ["hsl(160 60% 40%)", "hsl(180 55% 45%)"],
    description:
      "Driven by insatiable curiosity, you range across the entire intellectual landscape. Every article is a doorway, every idea a new trail. You bring fresh perspectives because you've seen more territory than most.",
    strengths: ["Broad knowledge", "Adaptability", "Creative connections", "Intellectual agility"],
    readingStyle: "You love discovering new topics and following surprising intellectual trails.",
    dimensions: [
      { trait: "Curiosity", value: 98 },
      { trait: "Depth", value: 60 },
      { trait: "Synthesis", value: 80 },
      { trait: "Application", value: 65 },
      { trait: "Openness", value: 95 },
    ],
  },
  {
    id: "practitioner",
    name: "The Practitioner",
    title: "Builder of Bridges",
    emoji: "⚒️",
    color: "hsl(24 80% 52%)",
    gradient: ["hsl(24 80% 52%)", "hsl(40 85% 55%)"],
    description:
      "For you, knowledge without action is incomplete. You read to build, to apply, to transform ideas into real-world impact. Your bookshelf is a toolkit, and every article is a potential blueprint.",
    strengths: ["Practical application", "Action bias", "Real-world impact", "Solution design"],
    readingStyle: "You gravitate toward actionable content with clear takeaways you can implement.",
    dimensions: [
      { trait: "Curiosity", value: 72 },
      { trait: "Depth", value: 75 },
      { trait: "Synthesis", value: 70 },
      { trait: "Application", value: 96 },
      { trait: "Openness", value: 68 },
    ],
  },
];

export function calculateArchetype(answers: Record<string, any>): Archetype {
  let depthScore = 0;
  let breadthScore = 0;
  let applicationScore = 0;
  let synthesisScore = 0;

  // q1: binary depth
  if (answers.q1 === "a") depthScore += 2; else breadthScore += 2;
  // q2: slider cognition (1-10)
  const q2 = answers.q2 ?? 5;
  if (q2 > 6) synthesisScore += 1; else depthScore += 1;
  // q3: card select breadth (number of domains)
  breadthScore += 1;
  // q4: binary social
  if (answers.q4 === "b") synthesisScore += 1;
  // q5: slider application
  const q5 = answers.q5 ?? 5;
  if (q5 > 6) applicationScore += 2; else depthScore += 1;
  // q6: binary format
  if (answers.q6 === "a") depthScore += 1; else breadthScore += 1;
  // q7: slider openness
  const q7 = answers.q7 ?? 5;
  if (q7 > 6) breadthScore += 1; else depthScore += 1;
  // q8: motivation
  const q8 = answers.q8 as string[] | undefined;
  if (q8?.includes("curiosity")) breadthScore += 1;
  if (q8?.includes("career")) applicationScore += 1;
  if (q8?.includes("growth")) synthesisScore += 1;
  // q9: slider structure
  const q9 = answers.q9 ?? 5;
  if (q9 > 6) applicationScore += 1; else breadthScore += 1;
  // q10: binary synthesis
  if (answers.q10 === "b") synthesisScore += 2; else applicationScore += 1;

  const scores = [
    { id: "synthesizer", score: synthesisScore },
    { id: "deep-diver", score: depthScore },
    { id: "explorer", score: breadthScore },
    { id: "practitioner", score: applicationScore },
  ];

  scores.sort((a, b) => b.score - a.score);
  return ARCHETYPES.find((a) => a.id === scores[0].id) || ARCHETYPES[0];
}
