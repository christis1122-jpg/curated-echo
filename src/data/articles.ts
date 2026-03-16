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
  content?: string;
  keyIdeas?: string[];
}

const ESSAY_CONTENT = `The mind is an architect of extraordinary cunning. Long before we recognize its work, it has already constructed elaborate corridors of justification, entire wings of rationalization, and secret rooms where uncomfortable truths are locked away from conscious awareness.

Self-deception is not a bug in human cognition — it is a feature. Evolutionary psychologists have long argued that our capacity for self-deception evolved because it makes us more effective deceivers of others. If you genuinely believe your own fabrications, you won't exhibit the telltale signs of lying that others might detect.

But this explanation, while elegant, misses something crucial about the phenomenology of self-deception. It doesn't account for the quiet moments at 3 AM when the architecture trembles, when we catch a glimpse of what lies behind the carefully constructed façade.

## The Three Pillars of Self-Deception

The first pillar is **selective attention**. We don't merely ignore inconvenient information — we develop sophisticated filtering systems that operate below the threshold of awareness. A person in a failing relationship doesn't just overlook red flags; they construct an entire perceptual framework in which those flags appear green.

The second pillar is **narrative coherence**. Humans are story-telling animals, and our stories must make sense. When reality threatens the coherence of our self-narrative, we don't abandon the story — we edit reality. We reinterpret past events, reframe present circumstances, and reimagine future possibilities to maintain the integrity of the tale we tell ourselves about who we are.

The third pillar is **emotional investment**. The deeper our commitment to a belief about ourselves, the more resources we allocate to its defense. This creates a paradox: the beliefs most likely to be products of self-deception are precisely the ones we feel most certain about.

## The Cost of Clarity

There is a reason we deceive ourselves, and it is not always pathological. Some degree of positive illusion appears to be necessary for psychological health. People with perfectly accurate self-perception — those who see themselves exactly as they are — tend to be mildly depressed. Psychologists call this "depressive realism."

The question, then, is not whether to engage in self-deception, but how to manage it. How do we maintain enough illusion to function while preserving enough clarity to grow?

This is perhaps the central challenge of adult psychological development. It requires us to hold two seemingly contradictory stances simultaneously: a commitment to truth and a tolerance for the fictions that make truth bearable.

## Toward Honest Self-Deception

The philosopher Friedrich Nietzsche once wrote that "the most common lie is the lie one tells to oneself." But he also recognized that some illusions are life-affirming, even necessary. The challenge is developing the wisdom to know which deceptions serve our flourishing and which ones slowly corrode the foundations of our inner architecture.

Perhaps the most honest form of self-deception is the one that acknowledges its own existence — the kind that says, "I know I'm not seeing this clearly, and for now, that's okay." This meta-awareness doesn't eliminate the deception, but it creates a small opening through which truth can eventually enter.

In the quiet architecture of our minds, the most important room may not be the one where truth resides, but the hallway that connects our illusions to our realities — the passage we walk when we're ready to see.`;

const RESEARCH_CONTENT = `The default mode network (DMN) has traditionally been characterized as a "task-negative" network — a set of brain regions that activate when we're not focused on external tasks. However, emerging research suggests this framing dramatically underestimates the DMN's role in creative cognition.

## Background and Methodology

Our study employed high-resolution 7T fMRI to examine neural dynamics in 47 professional artists and 52 matched controls during four creative tasks: divergent thinking (Alternate Uses Task), musical improvisation, visual art creation, and creative writing. We compared these with convergent thinking tasks and resting-state scans.

The key innovation of our approach was the use of dynamic functional connectivity analysis, which allowed us to track moment-by-moment changes in inter-network communication rather than relying on static connectivity measures.

## Key Findings

### Finding 1: DMN-Executive Network Coupling

Contrary to the traditional view that creative thought requires "defocused attention" and DMN dominance, we found that peak creative moments were characterized by dynamic coupling between the DMN and the executive control network (ECN). This coupling was significantly stronger in professional artists (p < 0.001) and predicted creative output quality as rated by independent judges.

### Finding 2: The Salience Network as Creative Switch

The salience network — particularly the anterior insula — appeared to function as a "creative switch," mediating transitions between DMN-dominant ideation phases and ECN-dominant evaluation phases. The speed of these transitions correlated with creative fluency.

### Finding 3: Temporal Dynamics of Flow States

During self-reported flow states, we observed a distinctive neural signature: initial DMN activation (idea generation), rapid salience network engagement (idea selection), brief ECN activation (idea evaluation), and then a return to DMN dominance. This cycle repeated approximately every 15-20 seconds during sustained creative flow.

## Implications

These findings suggest that creativity is not simply about "turning off" the executive network or "activating" the default mode network. Instead, creative cognition appears to depend on the brain's ability to rapidly and flexibly transition between these networks.

This has implications for creativity enhancement: rather than attempting to suppress executive function (as some meditation practices aim to do), interventions might focus on improving the flexibility and speed of inter-network communication.

## Limitations and Future Directions

Our sample, while including professional artists, was limited to Western cultural contexts. Creative cognition may be shaped by cultural practices and training in ways that affect neural dynamics. Future cross-cultural studies are needed to determine the universality of these findings.

Additionally, our temporal resolution, while improved over previous studies, may still miss faster neural dynamics. Combining fMRI with EEG or MEG in future studies could provide a more complete picture of the temporal evolution of creative neural states.`;

const OPED_CONTENT = `For decades, the trolley problem has served as the gateway drug of moral philosophy. You've heard it a thousand times: a trolley is heading toward five people, you can pull a lever to divert it to a track where it will kill one person instead. Do you pull the lever?

It's an elegant thought experiment. It's also, I want to argue, actively harmful to how we think about ethics.

## The Illusion of Clean Moral Mathematics

The trolley problem trains us to think about ethics as a kind of arithmetic: five lives versus one life, a simple calculation. But real moral dilemmas almost never present themselves this way. They arrive wrapped in uncertainty, marinated in context, and entangled with relationships, histories, and competing obligations that resist quantification.

When we teach students that moral philosophy begins with the trolley problem, we're training them to strip away precisely the features of moral situations that make them morally significant. We're teaching them that good moral reasoning means ignoring context — which is the opposite of what good moral reasoning actually requires.

## The Violence of Abstraction

There's something troubling about a thought experiment that asks us to casually contemplate killing someone. The trolley problem normalizes a particular kind of moral reasoning in which human beings are reduced to units in a calculation. It asks us to think about people the way a spreadsheet thinks about numbers.

This isn't just an academic concern. The trolley-problem style of thinking has real-world consequences. It's the kind of thinking that allows technology companies to perform "utilitarian" calculations about acceptable harm. It's the kind of thinking that enables policymakers to speak of "acceptable casualties."

## What We Lose

By centering our moral education on edge cases and limit situations, we neglect the vast landscape of everyday ethics: the small kindnesses and cruelties that constitute the moral texture of daily life. We spend our time debating whether to push a fat man off a bridge and forget to ask whether we were kind to the barista who served our coffee.

The moral philosophers who have shaped our actual moral progress — those who argued against slavery, for women's suffrage, for the rights of the disabled — didn't reason from trolley problems. They reasoned from empathy, from experience, from careful attention to the lived realities of people whose suffering had been invisible.

## A Better Starting Point

Instead of the trolley problem, what if we began moral philosophy with attention? Not "what would you do in this impossible situation?" but "what do you notice about the world you actually inhabit?"

Iris Murdoch, the philosopher and novelist, argued that moral life is primarily about perception — about learning to see other people clearly, without the distortions of ego. This is harder than pulling a lever, but it's infinitely more relevant to the moral challenges we actually face.

The trolley problem gives us the comforting illusion that moral philosophy is about finding the right answer. What we actually need is a moral philosophy that helps us ask better questions.`;

const ARTICLE_CONTENT = `In 2006, two Stanford researchers published a paper that would reshape the technology industry. B.J. Fogg's "Persuasive Technology" framework and Nir Eyal's subsequent "Hooked" model provided the conceptual toolkit for what we now recognize as attention engineering — the systematic design of digital products to capture, hold, and monetize human attention.

Nearly two decades later, the consequences of this engineering project are becoming clear, and they extend far beyond the screen-time debates that dominate public discourse.

## The Architecture of Compulsion

The basic mechanism of attention engineering is deceptively simple: trigger, action, variable reward, investment. A notification triggers you to open the app. You perform an action (scrolling, swiping, clicking). You receive a variable reward (sometimes interesting content, sometimes not — the unpredictability is the point). And you invest something (a like, a comment, personal data) that makes the next cycle more likely.

What makes this architecture so powerful is that it exploits the same neurochemical pathways that evolution designed for survival. Dopamine doesn't signal pleasure — it signals anticipation of possible pleasure. The variable reward schedule of social media mimics the unpredictability of the natural environment that our dopamine system evolved to navigate.

## Beyond Screen Time

The most significant consequences of attention engineering aren't about how much time we spend on our phones. They're about how the constant availability of engineered stimulation is reshaping our cognitive architecture.

Research from the University of Chicago suggests that the mere presence of a smartphone — even when turned off — reduces available cognitive capacity. We're not just distracted by our devices; we're depleted by the effort of not being distracted by them.

More subtly, attention engineering is eroding our capacity for what psychologists call "self-generated thought" — the ability to direct our attention inward, to daydream, to let our minds wander productively. This capacity, which neuroscience links to the default mode network, is essential for creativity, self-reflection, and long-term planning.

## The Consent Problem

Perhaps the most troubling aspect of attention engineering is the consent gap. Users technically "agree" to the terms of service that enable these designs, but the engineering itself is specifically designed to circumvent rational decision-making. You can't meaningfully consent to manipulation that operates below the threshold of your awareness.

This raises fundamental questions about the ethics of persuasive design. If a technology is engineered to be compulsive, does the user's "choice" to use it constitute genuine consent? And if not, what kind of regulatory framework would be appropriate?

## The Path Forward

The solution isn't to abandon technology — that ship has sailed. Instead, we need what I call "legible design": technology that is transparent about its persuasive mechanisms and gives users genuine control over their attention.

Some promising approaches are emerging. Apple's Screen Time and Android's Digital Wellbeing features represent a first step, though they're limited by the fact that the same companies profiting from attention engineering are designing the tools meant to mitigate it.

More radical approaches include "time well spent" design principles that optimize for user satisfaction rather than engagement, and regulatory frameworks that would require disclosure of persuasive design techniques — a kind of "nutritional label" for attention.

The stakes are higher than most people realize. Attention is the fundamental resource of conscious experience. How we allocate it determines what we perceive, what we think, what we feel, and ultimately, who we become. The engineering of attention is, in a very real sense, the engineering of human experience itself.`;

import { ARTICLE_IDS } from "@/data/gyst-ids";

export const ARTICLE_CONTENTS: Record<string, { content: string; keyIdeas: string[] }> = {
  [ARTICLE_IDS["1"]]: {
    content: ESSAY_CONTENT,
    keyIdeas: [
      "Self-deception evolved as an adaptive mechanism, not a cognitive flaw",
      "Three pillars sustain self-deception: selective attention, narrative coherence, and emotional investment",
      "Perfect self-knowledge correlates with mild depression — some illusion is psychologically necessary",
      "Meta-awareness of our own deceptions may be the path to honest growth",
    ],
  },
  [ARTICLE_IDS["2"]]: {
    content: RESEARCH_CONTENT,
    keyIdeas: [
      "Creative flow involves rapid cycling between the default mode and executive networks",
      "The salience network acts as a 'creative switch' between ideation and evaluation",
      "Peak creativity shows DMN-ECN coupling, not DMN dominance alone",
      "Flow states exhibit a ~15-20 second neural cycle pattern",
    ],
  },
  [ARTICLE_IDS["3"]]: {
    content: OPED_CONTENT,
    keyIdeas: [
      "The trolley problem trains us to ignore context — the opposite of good moral reasoning",
      "Reducing people to units in moral calculations has real-world consequences",
      "Everyday ethics of attention and kindness are more important than edge cases",
      "Moral philosophy should begin with perception, not impossible hypotheticals",
    ],
  },
  "4": {
    content: ARTICLE_CONTENT,
    keyIdeas: [
      "Attention engineering exploits dopamine pathways evolved for survival",
      "Smartphone presence alone reduces cognitive capacity, even when off",
      "Users can't meaningfully consent to manipulation designed to bypass rational thought",
      "The engineering of attention is the engineering of human experience",
    ],
  },
  "5": {
    content: ESSAY_CONTENT,
    keyIdeas: [
      "Difficult books resist us, and the resistance is the value",
      "Reading challenging literature builds cognitive and empathetic capacity",
      "Comfort reading has its place but shouldn't be confused with growth",
    ],
  },
  "6": {
    content: RESEARCH_CONTENT,
    keyIdeas: [
      "Three Nordic cities are piloting degrowth-aligned economies",
      "Well-being metrics improved while GDP growth slowed",
      "Community-scale experiments show scalable results",
    ],
  },
  "7": {
    content: OPED_CONTENT,
    keyIdeas: [
      "Digital minimalism addresses symptoms, not causes",
      "Our relationship to technology is structural, not individual",
      "Systemic design changes matter more than personal willpower",
    ],
  },
};

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
