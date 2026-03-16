import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { decode, type DecodedGystUuid } from "@/lib/gyst-uuid";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { cn } from "@/lib/utils";

interface UUIDViewerProps {
  uuid: string;
  compact?: boolean;
  className?: string;
  showLabel?: boolean;
  animate?: boolean;
}

const SEGMENT_LABELS = [
  "Timestamp",
  "Time-Low",
  "Ver·Arch·Dom",
  "Var·Fractal·Kx",
  "Ky·Kz·Entropy",
];

const SEGMENT_COLORS = [
  "text-[hsl(var(--tag-article))]",
  "text-[hsl(var(--tag-article))]",
  "text-[hsl(var(--tag-essay))]",
  "text-[hsl(var(--tag-research))]",
  "text-[hsl(var(--tag-oped))]",
];

export function UUIDViewer({
  uuid,
  compact = false,
  className,
  showLabel = true,
  animate = true,
}: UUIDViewerProps) {
  const [hoveredSegment, setHoveredSegment] = useState<number | null>(null);

  const decoded = useMemo<DecodedGystUuid | null>(() => {
    try {
      return decode(uuid);
    } catch {
      return null;
    }
  }, [uuid]);

  const segments = uuid.split("-");

  if (!decoded) {
    return <span className={cn("font-mono text-xs text-muted-foreground", className)}>{uuid}</span>;
  }

  const content = (
    <div className={cn("inline-flex flex-col gap-1", className)}>
      {showLabel && (
        <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-sans">
          GYST UUIDv8
        </span>
      )}
      <div className="flex items-center gap-0.5 font-mono text-xs">
        {segments.map((seg, i) => (
          <span key={i} className="flex items-center">
            {i > 0 && <span className="text-muted-foreground/40 mx-px">-</span>}
            <motion.span
              className={cn(
                "cursor-pointer rounded px-0.5 transition-colors",
                hoveredSegment === i
                  ? `${SEGMENT_COLORS[i]} bg-muted`
                  : "text-muted-foreground hover:text-foreground"
              )}
              onMouseEnter={() => setHoveredSegment(i)}
              onMouseLeave={() => setHoveredSegment(null)}
              animate={
                animate && hoveredSegment === i
                  ? { scale: 1.05 }
                  : { scale: 1 }
              }
            >
              {seg}
            </motion.span>
          </span>
        ))}
      </div>

      <AnimatePresence>
        {hoveredSegment !== null && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="text-[10px] text-muted-foreground font-sans"
          >
            <span className={SEGMENT_COLORS[hoveredSegment]}>
              {SEGMENT_LABELS[hoveredSegment]}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  if (compact) {
    return (
      <HoverCard openDelay={200}>
        <HoverCardTrigger asChild>
          <span
            className={cn(
              "font-mono text-[10px] text-muted-foreground cursor-pointer hover:text-foreground transition-colors truncate max-w-[120px] inline-block",
              className
            )}
          >
            {uuid.slice(0, 8)}…
          </span>
        </HoverCardTrigger>
        <HoverCardContent className="w-auto p-3" side="top">
          <UUIDDecodedPanel decoded={decoded} uuid={uuid} />
        </HoverCardContent>
      </HoverCard>
    );
  }

  return content;
}

interface UUIDDecodedPanelProps {
  decoded: DecodedGystUuid;
  uuid: string;
}

export function UUIDDecodedPanel({ decoded, uuid }: UUIDDecodedPanelProps) {
  return (
    <div className="space-y-3 text-xs min-w-[240px]">
      <div>
        <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-1 font-sans">
          GYST UUIDv8
        </p>
        <p className="font-mono text-[10px] text-muted-foreground break-all">
          {uuid}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <Field label="Archetype" value={decoded.archetype} color="text-[hsl(var(--tag-essay))]" />
        <Field label="Domain" value={decoded.domain} color="text-[hsl(var(--tag-article))]" />
        <Field label="Fractal" value={`${decoded.fractalLevel}:${decoded.fractalSublevel}`} color="text-[hsl(var(--tag-research))]" />
        <Field label="Version" value={`v${decoded.version}`} color="text-muted-foreground" />
      </div>

      <div>
        <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-1.5 font-sans">
          Knowledge Coords
        </p>
        <div className="flex gap-3">
          <CoordBar label="X" value={decoded.knowledgeCoords.x} axis="Curiosity" color="var(--tag-essay)" />
          <CoordBar label="Y" value={decoded.knowledgeCoords.y} axis="Depth" color="var(--tag-article)" />
          <CoordBar label="Z" value={decoded.knowledgeCoords.z} axis="Synthesis" color="var(--tag-research)" />
        </div>
      </div>

      <div className="text-[10px] text-muted-foreground">
        {decoded.timestamp.toLocaleString()}
      </div>
    </div>
  );
}

function Field({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div>
      <p className="text-[10px] text-muted-foreground font-sans">{label}</p>
      <p className={cn("font-medium capitalize", color)}>{value}</p>
    </div>
  );
}

function CoordBar({ label, value, axis, color }: { label: string; value: number; axis: string; color: string }) {
  const pct = (value / 255) * 100;
  return (
    <div className="flex-1">
      <div className="flex justify-between text-[10px] text-muted-foreground mb-0.5">
        <span>{label}</span>
        <span>{value}</span>
      </div>
      <div className="h-1.5 rounded-full bg-muted overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="h-full rounded-full"
          style={{ background: `hsl(${color})` }}
        />
      </div>
      <p className="text-[9px] text-muted-foreground mt-0.5">{axis}</p>
    </div>
  );
}

export default UUIDViewer;
