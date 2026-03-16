import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  ResponsiveContainer,
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  ZAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { decode, type DecodedGystUuid } from "@/lib/gyst-uuid";
import { cn } from "@/lib/utils";

interface KnowledgePointCloudProps {
  uuids: string[];
  className?: string;
  height?: number;
  showAxes?: boolean;
  projections?: ("xy" | "xz" | "yz")[];
}

const ARCHETYPE_COLORS: Record<string, string> = {
  synthesizer: "hsl(280 55% 50%)",
  "deep-diver": "hsl(210 70% 50%)",
  explorer: "hsl(160 60% 40%)",
  practitioner: "hsl(24 80% 52%)",
  polymath: "hsl(24 80% 52%)",
  scholar: "hsl(210 70% 50%)",
  philosopher: "hsl(280 55% 50%)",
  curator: "hsl(160 60% 40%)",
  contrarian: "hsl(0 72% 51%)",
  critic: "hsl(0 72% 51%)",
  unknown: "hsl(20 5% 50%)",
};

const PROJECTION_LABELS: Record<string, { x: string; y: string }> = {
  xy: { x: "Curiosity (X)", y: "Depth (Y)" },
  xz: { x: "Curiosity (X)", y: "Synthesis (Z)" },
  yz: { x: "Depth (Y)", y: "Synthesis (Z)" },
};

interface PointData {
  x: number;
  y: number;
  z: number;
  archetype: string;
  domain: string;
  fill: string;
  uuid: string;
  fractalLevel: string;
}

export function KnowledgePointCloud({
  uuids,
  className,
  height = 260,
  showAxes = true,
  projections = ["xy"],
}: KnowledgePointCloudProps) {
  const [activeProjection, setActiveProjection] = useState(projections[0]);

  const decoded = useMemo<DecodedGystUuid[]>(() => {
    return uuids
      .map((u) => {
        try {
          return decode(u);
        } catch {
          return null;
        }
      })
      .filter(Boolean) as DecodedGystUuid[];
  }, [uuids]);

  const points = useMemo<PointData[]>(() => {
    return decoded.map((d) => ({
      x: activeProjection === "yz" ? d.knowledgeCoords.y : d.knowledgeCoords.x,
      y: activeProjection === "xy" ? d.knowledgeCoords.y : d.knowledgeCoords.z,
      z: d.knowledgeCoords.z,
      archetype: d.archetype,
      domain: d.domain,
      fill: ARCHETYPE_COLORS[d.archetype] ?? ARCHETYPE_COLORS.unknown,
      uuid: d.raw,
      fractalLevel: d.fractalLevel,
    }));
  }, [decoded, activeProjection]);

  // Group by archetype for colored scatter layers
  const groups = useMemo(() => {
    const map = new Map<string, PointData[]>();
    points.forEach((p) => {
      if (!map.has(p.archetype)) map.set(p.archetype, []);
      map.get(p.archetype)!.push(p);
    });
    return Array.from(map.entries());
  }, [points]);

  const labels = PROJECTION_LABELS[activeProjection];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={cn("bg-card rounded-xl border border-border p-4", className)}
    >
      <div className="flex items-center justify-between mb-3">
        <div>
          <h3 className="text-sm font-semibold text-foreground font-serif">
            Knowledge Space
          </h3>
          <p className="text-[10px] text-muted-foreground">
            {decoded.length} entities mapped
          </p>
        </div>
        {projections.length > 1 && (
          <div className="flex gap-1">
            {projections.map((proj) => (
              <button
                key={proj}
                onClick={() => setActiveProjection(proj)}
                className={cn(
                  "px-2 py-0.5 rounded-full text-[10px] font-medium transition-all",
                  activeProjection === proj
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:text-foreground"
                )}
              >
                {proj.toUpperCase()}
              </button>
            ))}
          </div>
        )}
      </div>

      <ResponsiveContainer width="100%" height={height}>
        <ScatterChart margin={{ top: 10, right: 10, bottom: 20, left: 0 }}>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="hsl(var(--border))"
            strokeOpacity={0.5}
          />
          {showAxes && (
            <>
              <XAxis
                type="number"
                dataKey="x"
                domain={[0, 255]}
                tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 10 }}
                axisLine={false}
                label={{
                  value: labels.x,
                  position: "insideBottom",
                  offset: -10,
                  fill: "hsl(var(--muted-foreground))",
                  fontSize: 10,
                }}
              />
              <YAxis
                type="number"
                dataKey="y"
                domain={[0, 255]}
                tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 10 }}
                axisLine={false}
                label={{
                  value: labels.y,
                  angle: -90,
                  position: "insideLeft",
                  fill: "hsl(var(--muted-foreground))",
                  fontSize: 10,
                }}
              />
            </>
          )}
          <ZAxis type="number" dataKey="z" range={[30, 120]} />
          <Tooltip
            content={({ payload }) => {
              if (!payload?.length) return null;
              const d = payload[0].payload as PointData;
              return (
                <div className="bg-card border border-border rounded-lg p-2.5 shadow-lg text-xs space-y-1">
                  <p className="font-medium text-foreground capitalize">{d.archetype}</p>
                  <p className="text-muted-foreground capitalize">{d.domain}</p>
                  <div className="flex gap-3 text-[10px] text-muted-foreground">
                    <span>X:{d.x}</span>
                    <span>Y:{d.y}</span>
                    <span>Z:{d.z}</span>
                  </div>
                  <p className="font-mono text-[9px] text-muted-foreground/70 break-all">
                    {d.uuid.slice(0, 18)}…
                  </p>
                </div>
              );
            }}
          />
          {groups.map(([archetype, data]) => (
            <Scatter
              key={archetype}
              name={archetype}
              data={data}
              fill={ARCHETYPE_COLORS[archetype] ?? ARCHETYPE_COLORS.unknown}
              fillOpacity={0.7}
              strokeWidth={1}
              stroke={ARCHETYPE_COLORS[archetype] ?? ARCHETYPE_COLORS.unknown}
            />
          ))}
        </ScatterChart>
      </ResponsiveContainer>

      {/* Legend */}
      <div className="flex flex-wrap gap-2 mt-2">
        {groups.map(([archetype]) => (
          <div key={archetype} className="flex items-center gap-1">
            <div
              className="w-2 h-2 rounded-full"
              style={{ background: ARCHETYPE_COLORS[archetype] }}
            />
            <span className="text-[10px] text-muted-foreground capitalize">
              {archetype}
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export default KnowledgePointCloud;
