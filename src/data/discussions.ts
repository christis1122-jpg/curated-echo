export type Archetype = "Polymath" | "Scholar" | "Philosopher" | "Curator" | "Contrarian" | "Synthesizer";

export const ARCHETYPE_COLORS: Record<Archetype, string> = {
  Polymath: "bg-[hsl(24,80%,52%)] text-[hsl(0,0%,100%)]",
  Scholar: "bg-[hsl(210,70%,50%)] text-[hsl(0,0%,100%)]",
  Philosopher: "bg-[hsl(280,55%,50%)] text-[hsl(0,0%,100%)]",
  Curator: "bg-[hsl(160,60%,40%)] text-[hsl(0,0%,100%)]",
  Contrarian: "bg-[hsl(0,72%,51%)] text-[hsl(0,0%,100%)]",
  Synthesizer: "bg-[hsl(45,95%,50%)] text-[hsl(20,10%,12%)]",
};

export type DiscussionTab = "debate" | "takeaways" | "questions" | "resources";

export interface DiscussionUser {
  name: string;
  avatar: string;
  archetype: Archetype;
  credibility: number;
  isTopContributor?: boolean;
  discussionStreak?: number;
}

export interface DiscussionReply {
  id: string;
  user: DiscussionUser;
  content: string;
  upvotes: number;
  timestamp: string;
  isAuthorResponse?: boolean;
}

export interface DiscussionThread {
  id: string;
  tab: DiscussionTab;
  user: DiscussionUser;
  content: string;
  quotedText?: string;
  upvotes: number;
  replyCount: number;
  shares: number;
  bookmarked: boolean;
  timestamp: string;
  isAuthorResponse?: boolean;
  replies: DiscussionReply[];
  isLiveDeepDive?: boolean;
}

const USERS: Record<string, DiscussionUser> = {
  maya: { name: "Maya Chen", avatar: "MC", archetype: "Polymath", credibility: 94, isTopContributor: true, discussionStreak: 7 },
  alex: { name: "Alex Rivera", avatar: "AR", archetype: "Scholar", credibility: 88 },
  jordan: { name: "Jordan Park", avatar: "JP", archetype: "Philosopher", credibility: 91, discussionStreak: 12 },
  sam: { name: "Sam Okafor", avatar: "SO", archetype: "Contrarian", credibility: 85 },
  nina: { name: "Nina Petrova", avatar: "NP", archetype: "Curator", credibility: 92, isTopContributor: true },
  kai: { name: "Kai Tanaka", avatar: "KT", archetype: "Synthesizer", credibility: 87 },
  elena: { name: "Elena Voss", avatar: "EV", archetype: "Scholar", credibility: 99 },
};

export const MOCK_DISCUSSIONS: Record<string, DiscussionThread[]> = {
  "1": [
    {
      id: "d1", tab: "debate", user: USERS.maya,
      content: "I think the essay undersells the **social dimension** of self-deception. We don't just deceive ourselves in isolation — our self-deceptions are co-constructed with the people around us. Families, organizations, and entire cultures maintain shared fictions.",
      upvotes: 47, replyCount: 8, shares: 12, bookmarked: false, timestamp: "2h ago",
      replies: [
        { id: "r1", user: USERS.elena, content: "This is a wonderful point, Maya. You're right that I focused primarily on individual psychology. The social architecture of self-deception — how groups maintain collective fictions — deserves its own essay. Thank you for pushing this further.", upvotes: 63, timestamp: "1h ago", isAuthorResponse: true },
        { id: "r2", user: USERS.jordan, content: "Building on this — @Maya Chen, have you read Sartre on 'bad faith'? He argues that self-deception is fundamentally an interpersonal phenomenon. We deceive ourselves *about* our freedom precisely because others expect us to play certain roles.", upvotes: 21, timestamp: "45m ago" },
      ],
    },
    {
      id: "d2", tab: "debate", user: USERS.sam,
      content: "Counterpoint: calling self-deception 'adaptive' is itself a form of self-deception. We're rationalizing a cognitive failure by reframing it as a feature. Just because something persisted evolutionarily doesn't make it beneficial in modern contexts.",
      upvotes: 34, replyCount: 5, shares: 8, bookmarked: false, timestamp: "3h ago",
      replies: [
        { id: "r3", user: USERS.alex, content: "This is a valid critique but I think it's more nuanced. The research on depressive realism suggests that *some* self-deception is genuinely protective. The question is where adaptive shading becomes pathological distortion.", upvotes: 18, timestamp: "2h ago" },
      ],
    },
    {
      id: "d3", tab: "takeaways", user: USERS.nina,
      content: "**Key framework from this essay:**\n\n1. Self-deception rests on three pillars: selective attention, narrative coherence, emotional investment\n2. Perfect accuracy ≠ mental health (depressive realism)\n3. Meta-awareness of our deceptions may be the healthiest stance\n\nThis maps beautifully to Buddhist concepts of 'skillful means' — sometimes the indirect path serves truth better than brute confrontation.",
      upvotes: 89, replyCount: 14, shares: 31, bookmarked: true, timestamp: "1h ago", isLiveDeepDive: true,
      replies: [
        { id: "r4", user: USERS.kai, content: "This synthesis is incredible. The Buddhist parallel is spot-on. I'd also connect it to Winnicott's concept of 'transitional space' — the area between illusion and reality where growth happens.", upvotes: 24, timestamp: "30m ago" },
      ],
    },
    {
      id: "d4", tab: "takeaways", user: USERS.kai,
      content: "The most profound insight: \"the most honest form of self-deception is the one that acknowledges its own existence.\" This is essentially what therapy does — it doesn't eliminate our stories, it helps us hold them more lightly.",
      upvotes: 56, replyCount: 6, shares: 19, bookmarked: false, timestamp: "4h ago",
      replies: [],
    },
    {
      id: "d5", tab: "questions", user: USERS.jordan,
      content: "**Open question:** If depressive realism is real, does that mean we should deliberately cultivate certain illusions? And if so, who decides which illusions are 'healthy'? This feels like it has dangerous implications for propaganda and social control.",
      upvotes: 41, replyCount: 11, shares: 7, bookmarked: false, timestamp: "5h ago",
      replies: [
        { id: "r5", user: USERS.elena, content: "This is the question that kept me up at night while writing this piece. I don't have a clean answer. But I think the key distinction is *agency* — chosen illusions that we can revise differ fundamentally from imposed fictions we can't question.", upvotes: 72, timestamp: "4h ago", isAuthorResponse: true },
      ],
    },
    {
      id: "d6", tab: "questions", user: USERS.alex,
      content: "How does this framework apply to collective self-deception? For example, the tech industry's narrative that 'we're making the world better' — is that adaptive for individuals within the system even if it's harmful at scale?",
      upvotes: 28, replyCount: 4, shares: 5, bookmarked: false, timestamp: "6h ago",
      replies: [],
    },
    {
      id: "d7", tab: "resources", user: USERS.nina,
      content: "📚 **Further reading on this topic:**\n\n• Robert Trivers, *The Folly of Fools* — the evolutionary biology of self-deception\n• Daniel Goleman, *Vital Lies, Simple Truths* — how we deceive ourselves\n• Iris Murdoch, *The Sovereignty of Good* — moral attention and seeing clearly\n• Shelley Taylor, *Positive Illusions* — the research on healthy self-deception",
      upvotes: 67, replyCount: 3, shares: 42, bookmarked: true, timestamp: "2h ago",
      replies: [
        { id: "r6", user: USERS.maya, content: "I'd add Erving Goffman's *The Presentation of Self in Everyday Life* — essential for understanding the social performance aspect of self-deception.", upvotes: 19, timestamp: "1h ago" },
      ],
    },
    {
      id: "d8", tab: "resources", user: USERS.kai,
      content: "🎧 Related podcast: *Hidden Brain* episode \"The Mind's Eye\" covers depressive realism and the function of positive illusions. Pairs perfectly with this essay.",
      upvotes: 23, replyCount: 1, shares: 15, bookmarked: false, timestamp: "7h ago",
      replies: [],
    },
  ],
};

// Generate discussions for other articles using article 1 as template
["2", "3", "4", "5", "6", "7"].forEach((id) => {
  MOCK_DISCUSSIONS[id] = MOCK_DISCUSSIONS["1"].map((t) => ({
    ...t,
    id: `${t.id}-${id}`,
    replies: t.replies.map((r) => ({ ...r, id: `${r.id}-${id}` })),
  }));
});
