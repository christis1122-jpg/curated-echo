/**
 * GYST UUIDv8 — A semantic identity layer encoding Reader Status archetype,
 * domain, timestamp, fractal hierarchy, and knowledge coordinates into a
 * spec-compliant UUIDv8 (RFC 9562) 128-bit identifier.
 *
 * Bit layout (128 bits):
 * ┌──────────────────────────────────────────────────────────────────┐
 * │ Bits 0-47   : Timestamp (ms since 2025-01-01, ~8.9 years range)│
 * │ Bits 48-51  : Version (0x8 = UUIDv8)                           │
 * │ Bits 52-55  : Archetype code (4 bits, 0-15)                    │
 * │ Bits 56-63  : Domain code (8 bits, 0-255)                      │
 * │ Bits 64-65  : Variant (0b10 = RFC 4122)                        │
 * │ Bits 66-69  : Fractal level (4 bits, 0-15)                     │
 * │ Bits 70-73  : Fractal sublevel (4 bits, 0-15)                  │
 * │ Bits 74-81  : Knowledge X coord (8 bits, 0-255)                │
 * │ Bits 82-89  : Knowledge Y coord (8 bits, 0-255)                │
 * │ Bits 90-97  : Knowledge Z coord (8 bits, 0-255)                │
 * │ Bits 98-127 : Entropy (30 bits of randomness)                  │
 * └──────────────────────────────────────────────────────────────────┘
 */

// Epoch: 2025-01-01T00:00:00Z
const GYST_EPOCH = 1735689600000;

// Archetype registry
export const ARCHETYPE_CODES: Record<string, number> = {
  synthesizer: 0,
  "deep-diver": 1,
  explorer: 2,
  practitioner: 3,
  polymath: 4,
  scholar: 5,
  philosopher: 6,
  curator: 7,
  contrarian: 8,
  critic: 9,
  unknown: 15,
};

export const ARCHETYPE_NAMES: Record<number, string> = Object.fromEntries(
  Object.entries(ARCHETYPE_CODES).map(([k, v]) => [v, k])
);

// Domain registry
export const DOMAIN_CODES: Record<string, number> = {
  psychology: 0,
  philosophy: 1,
  neuroscience: 2,
  technology: 3,
  history: 4,
  economics: 5,
  literature: 6,
  politics: 7,
  science: 8,
  culture: 9,
  ethics: 10,
  education: 11,
  // Content types
  note: 32,
  highlight: 33,
  thread: 34,
  article: 35,
  profile: 36,
  discussion: 37,
  notification: 38,
  collection: 39,
  achievement: 40,
  general: 255,
};

export const DOMAIN_NAMES: Record<number, string> = Object.fromEntries(
  Object.entries(DOMAIN_CODES).map(([k, v]) => [v, k])
);

// Fractal hierarchy levels
export const FRACTAL_LEVELS: Record<string, number> = {
  root: 0,       // App-level entity
  collection: 1, // Collection / category
  item: 2,       // Article / thread
  fragment: 3,   // Note / highlight / reply
  atom: 4,       // Individual coord / tag
};

export const FRACTAL_NAMES: Record<number, string> = Object.fromEntries(
  Object.entries(FRACTAL_LEVELS).map(([k, v]) => [v, k])
);

export interface GystUuidParams {
  archetype?: string;
  domain?: string;
  fractalLevel?: string;
  fractalSublevel?: number;
  knowledgeX?: number; // 0-255 curiosity / breadth axis
  knowledgeY?: number; // 0-255 depth / rigor axis
  knowledgeZ?: number; // 0-255 synthesis / connection axis
  timestamp?: number;  // ms since unix epoch
}

export interface DecodedGystUuid {
  raw: string;
  timestamp: Date;
  archetype: string;
  archetypeCode: number;
  domain: string;
  domainCode: number;
  fractalLevel: string;
  fractalLevelCode: number;
  fractalSublevel: number;
  knowledgeCoords: { x: number; y: number; z: number };
  entropy: number;
  version: number;
}

function toHex(n: number, digits: number): string {
  return n.toString(16).padStart(digits, "0");
}

/**
 * Generate a GYST UUIDv8 string.
 */
export function generate(params: GystUuidParams = {}): string {
  const {
    archetype = "unknown",
    domain = "general",
    fractalLevel = "item",
    fractalSublevel = 0,
    knowledgeX = Math.floor(Math.random() * 256),
    knowledgeY = Math.floor(Math.random() * 256),
    knowledgeZ = Math.floor(Math.random() * 256),
    timestamp = Date.now(),
  } = params;

  const ts = timestamp - GYST_EPOCH;
  const archCode = ARCHETYPE_CODES[archetype.toLowerCase()] ?? 15;
  const domCode = DOMAIN_CODES[domain.toLowerCase()] ?? 255;
  const fracLevel = FRACTAL_LEVELS[fractalLevel.toLowerCase()] ?? 2;
  const fracSub = Math.min(fractalSublevel, 15);
  const kx = Math.min(knowledgeX, 255);
  const ky = Math.min(knowledgeY, 255);
  const kz = Math.min(knowledgeZ, 255);
  const entropy = Math.floor(Math.random() * 0x3FFFFFFF); // 30 bits

  // Build 128 bits as two 64-bit halves using numbers
  // High 64 bits: timestamp(48) | version(4) | archetype(4) | domain(8)
  // We'll work with hex strings directly

  // Segment 1: bits 0-31 (timestamp high 32 bits)
  const tsHigh = Math.floor(ts / 0x10000) & 0xFFFF;
  const tsMid = ts & 0xFFFF;

  // time_high (32 bits) = ts bits 16-47
  const seg1 = toHex((tsHigh << 16) | tsMid, 8);

  // Segment 2: bits 32-47 (timestamp low 16) - but we only have 48 bits of ts
  // Let's re-do: 48-bit timestamp
  const ts48 = ts & 0xFFFFFFFFFFFF;
  const timePart1 = Math.floor(ts48 / 0x10000) & 0xFFFFFFFF;
  const timePart2 = ts48 & 0xFFFF;

  const block1 = toHex(timePart1 >>> 0, 8); // 8 hex chars = 32 bits

  // block2: timePart2(16) | version(4) | archetype(4) | domain high 4 bits
  // Wait, we need 16 bits here. Format: xxxx-8xxx
  // So block2 = timePart2(16 bits) = 4 hex chars
  const block2 = toHex(timePart2, 4);

  // block3: version(4) | archetype(4) | domain(8) = 16 bits = 4 hex chars
  const block3val = (0x8 << 12) | (archCode << 8) | domCode;
  const block3 = toHex(block3val, 4);

  // block4: variant(2=10) | fracLevel(4) | fracSub(4) | kx high 6 bits = 16 bits
  // variant is top 2 bits = 10, so top byte is 10xxxxxx
  const block4val = (0b10 << 14) | (fracLevel << 10) | (fracSub << 6) | (kx >> 2);
  const block4 = toHex(block4val, 4);

  // block5: kx low 2 | ky(8) | kz(8) | entropy(30) = 48 bits = 12 hex chars
  const block5High = ((kx & 0x3) << 16) | (ky << 8) | kz;
  const block5Low = entropy;
  const block5 = toHex(block5High, 5) + toHex(block5Low, 7);

  return `${block1}-${block2}-${block3}-${block4}-${block5}`;
}

/**
 * Decode a GYST UUIDv8 string back into its components.
 */
export function decode(uuid: string): DecodedGystUuid {
  const parts = uuid.replace(/-/g, "");
  if (parts.length !== 32) {
    throw new Error(`Invalid GYST UUID length: ${parts.length}`);
  }

  // block1: 8 hex = 32 bits (timestamp high)
  const timePart1 = parseInt(parts.slice(0, 8), 16);
  // block2: 4 hex = 16 bits (timestamp low)
  const timePart2 = parseInt(parts.slice(8, 12), 16);
  // block3: 4 hex = 16 bits (version | archetype | domain)
  const block3 = parseInt(parts.slice(12, 16), 16);
  // block4: 4 hex = 16 bits (variant | fracLevel | fracSub | kx high)
  const block4 = parseInt(parts.slice(16, 20), 16);
  // block5: 12 hex = 48 bits
  const block5High = parseInt(parts.slice(20, 25), 16);
  const block5Low = parseInt(parts.slice(25, 32), 16);

  // Reconstruct timestamp
  const ts48 = timePart1 * 0x10000 + timePart2;
  const timestamp = new Date(ts48 + GYST_EPOCH);

  // Version
  const version = (block3 >> 12) & 0xF;

  // Archetype
  const archetypeCode = (block3 >> 8) & 0xF;
  const archetype = ARCHETYPE_NAMES[archetypeCode] ?? "unknown";

  // Domain
  const domainCode = block3 & 0xFF;
  const domain = DOMAIN_NAMES[domainCode] ?? "general";

  // Fractal
  const fractalLevelCode = (block4 >> 10) & 0xF;
  const fractalLevel = FRACTAL_NAMES[fractalLevelCode] ?? "item";
  const fractalSublevel = (block4 >> 6) & 0xF;

  // Knowledge X high 6 bits
  const kxHigh = block4 & 0x3F;
  const kxLow = (block5High >> 16) & 0x3;
  const kx = (kxHigh << 2) | kxLow;

  const ky = (block5High >> 8) & 0xFF;
  const kz = block5High & 0xFF;

  const entropy = block5Low;

  return {
    raw: uuid,
    timestamp,
    archetype,
    archetypeCode,
    domain,
    domainCode,
    fractalLevel,
    fractalLevelCode,
    fractalSublevel,
    knowledgeCoords: { x: kx, y: ky, z: kz },
    entropy,
    version,
  };
}

/**
 * Generate a deterministic GYST UUID for mock data (uses fixed timestamp + entropy seed).
 */
export function generateDeterministic(
  seed: string,
  params: GystUuidParams = {}
): string {
  // Simple hash for deterministic entropy
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = ((hash << 5) - hash + seed.charCodeAt(i)) | 0;
  }
  const deterministicEntropy = Math.abs(hash) % 0x3FFFFFFF;

  const result = generate({
    ...params,
    timestamp: params.timestamp ?? GYST_EPOCH + 86400000 * 30, // 30 days after epoch
  });

  // Replace entropy portion with deterministic value
  const parts = result.split("-");
  const block5 = parts[4];
  const prefix = block5.slice(0, 5);
  const newEntropy = deterministicEntropy.toString(16).padStart(7, "0");
  parts[4] = prefix + newEntropy;

  return parts.join("-");
}

/**
 * Compact representation of a full entity payload as a GYST UUID.
 * Used for the token-savings demo.
 */
export function toPayloadComparison(entity: Record<string, any>): {
  jsonPayload: string;
  jsonSize: number;
  uuidPayload: string;
  uuidSize: number;
  savingsPercent: number;
} {
  const jsonPayload = JSON.stringify(entity, null, 2);
  const jsonSize = new Blob([jsonPayload]).size;
  const uuidPayload = generate({
    archetype: entity.archetype ?? entity.type ?? "unknown",
    domain: entity.domain ?? entity.articleDomain ?? "general",
    fractalLevel: entity.fractalLevel ?? "item",
    knowledgeX: entity.knowledgeX ?? Math.floor(Math.random() * 256),
    knowledgeY: entity.knowledgeY ?? Math.floor(Math.random() * 256),
    knowledgeZ: entity.knowledgeZ ?? Math.floor(Math.random() * 256),
  });
  const uuidSize = 36; // Always 36 chars

  return {
    jsonPayload,
    jsonSize,
    uuidPayload,
    uuidSize,
    savingsPercent: Math.round((1 - uuidSize / jsonSize) * 100),
  };
}
