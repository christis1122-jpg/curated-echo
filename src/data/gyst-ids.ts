/**
 * Pre-generated GYST UUIDs for all mock entities.
 * This centralizes ID generation so all data files reference consistent IDs.
 */
import { generateDeterministic } from "@/lib/gyst-uuid";

// ─── Articles ────────────────────────────────────────────────────
export const ARTICLE_IDS = {
  "1": generateDeterministic("article-1", { archetype: "polymath", domain: "psychology", fractalLevel: "item", knowledgeX: 180, knowledgeY: 160, knowledgeZ: 200 }),
  "2": generateDeterministic("article-2", { archetype: "scholar", domain: "neuroscience", fractalLevel: "item", knowledgeX: 120, knowledgeY: 220, knowledgeZ: 150 }),
  "3": generateDeterministic("article-3", { archetype: "philosopher", domain: "philosophy", fractalLevel: "item", knowledgeX: 200, knowledgeY: 180, knowledgeZ: 190 }),
  "4": generateDeterministic("article-4", { archetype: "critic", domain: "technology", fractalLevel: "item", knowledgeX: 140, knowledgeY: 200, knowledgeZ: 170 }),
  "5": generateDeterministic("article-5", { archetype: "explorer", domain: "literature", fractalLevel: "item", knowledgeX: 210, knowledgeY: 130, knowledgeZ: 180 }),
  "6": generateDeterministic("article-6", { archetype: "scholar", domain: "economics", fractalLevel: "item", knowledgeX: 100, knowledgeY: 240, knowledgeZ: 120 }),
  "7": generateDeterministic("article-7", { archetype: "contrarian", domain: "culture", fractalLevel: "item", knowledgeX: 170, knowledgeY: 150, knowledgeZ: 160 }),
} as const;

// ─── Library Notes ───────────────────────────────────────────────
export const NOTE_IDS = {
  n1: generateDeterministic("note-n1", { archetype: "polymath", domain: "note", fractalLevel: "fragment", knowledgeX: 180, knowledgeY: 150, knowledgeZ: 210 }),
  n2: generateDeterministic("note-n2", { archetype: "polymath", domain: "note", fractalLevel: "fragment", knowledgeX: 160, knowledgeY: 170, knowledgeZ: 190 }),
  n3: generateDeterministic("note-n3", { archetype: "synthesizer", domain: "note", fractalLevel: "fragment", knowledgeX: 200, knowledgeY: 200, knowledgeZ: 230 }),
  n4: generateDeterministic("note-n4", { archetype: "philosopher", domain: "note", fractalLevel: "fragment", knowledgeX: 190, knowledgeY: 180, knowledgeZ: 140 }),
  n5: generateDeterministic("note-n5", { archetype: "critic", domain: "note", fractalLevel: "fragment", knowledgeX: 150, knowledgeY: 210, knowledgeZ: 180 }),
  n6: generateDeterministic("note-n6", { archetype: "explorer", domain: "note", fractalLevel: "fragment", knowledgeX: 170, knowledgeY: 160, knowledgeZ: 200 }),
} as const;

// ─── Insight Threads ─────────────────────────────────────────────
export const THREAD_IDS = {
  t1: generateDeterministic("thread-t1", { archetype: "polymath", domain: "thread", fractalLevel: "collection", knowledgeX: 185, knowledgeY: 165, knowledgeZ: 205 }),
  t2: generateDeterministic("thread-t2", { archetype: "synthesizer", domain: "thread", fractalLevel: "collection", knowledgeX: 195, knowledgeY: 190, knowledgeZ: 195 }),
  t3: generateDeterministic("thread-t3", { archetype: "critic", domain: "thread", fractalLevel: "collection", knowledgeX: 160, knowledgeY: 195, knowledgeZ: 185 }),
} as const;

// ─── User Profile ────────────────────────────────────────────────
export const PROFILE_ID = generateDeterministic("profile-alex-rivera", { archetype: "polymath", domain: "profile", fractalLevel: "root", knowledgeX: 220, knowledgeY: 170, knowledgeZ: 210 });

// ─── Notifications ───────────────────────────────────────────────
export const NOTIFICATION_IDS = Object.fromEntries(
  Array.from({ length: 10 }, (_, i) => [
    `n${i + 1}`,
    generateDeterministic(`notification-n${i + 1}`, { archetype: "unknown", domain: "notification", fractalLevel: "atom", knowledgeX: Math.floor(Math.random() * 256), knowledgeY: Math.floor(Math.random() * 256), knowledgeZ: Math.floor(Math.random() * 256) }),
  ])
);

// ─── Explore ─────────────────────────────────────────────────────
export const CATEGORY_IDS = Object.fromEntries(
  Array.from({ length: 10 }, (_, i) => [
    `${i + 1}`,
    generateDeterministic(`category-${i + 1}`, { domain: "general", fractalLevel: "collection" }),
  ])
);

// ─── Archived Reads ──────────────────────────────────────────────
export const ARCHIVED_READ_IDS = Object.fromEntries(
  ["ar1", "ar2", "ar3", "ar4", "ar5"].map((id) => [
    id,
    generateDeterministic(`archived-${id}`, { archetype: "polymath", domain: "article", fractalLevel: "item" }),
  ])
);

// ─── Achievements ────────────────────────────────────────────────
export const ACHIEVEMENT_IDS = Object.fromEntries(
  Array.from({ length: 6 }, (_, i) => [
    `${i + 1}`,
    generateDeterministic(`achievement-${i + 1}`, { domain: "achievement", fractalLevel: "atom" }),
  ])
);

// ─── Discussion IDs ──────────────────────────────────────────────
export const DISCUSSION_IDS = Object.fromEntries(
  ["d1", "d2", "d3", "d4", "d5", "d6", "d7", "d8"].map((id) => [
    id,
    generateDeterministic(`discussion-${id}`, { domain: "discussion", fractalLevel: "fragment" }),
  ])
);

export const REPLY_IDS = Object.fromEntries(
  ["r1", "r2", "r3", "r4", "r5", "r6"].map((id) => [
    id,
    generateDeterministic(`reply-${id}`, { domain: "discussion", fractalLevel: "atom" }),
  ])
);

/** Convenience: get all UUIDs as a flat array for visualization */
export function getAllUuids(): string[] {
  return [
    ...Object.values(ARTICLE_IDS),
    ...Object.values(NOTE_IDS),
    ...Object.values(THREAD_IDS),
    PROFILE_ID,
    ...Object.values(ARCHIVED_READ_IDS),
  ];
}
