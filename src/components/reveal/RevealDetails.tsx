import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import {
  ResponsiveContainer, RadarChart, Radar, PolarGrid, PolarAngleAxis,
} from "recharts";
import type { Archetype } from "@/data/assessment";
import { generate } from "@/lib/gyst-uuid";
import { KnowledgePointCloud } from "@/components/ui/knowledge-point-cloud";
import { TokenSavingsPanel } from "@/components/ui/token-savings-panel";
import { useMemo } from "react";

interface RevealDetailsProps {
  archetype: Archetype;
  skippedCount?: number;
}

const RevealDetails = ({ archetype, skippedCount }: RevealDetailsProps) => {
  // Generate sample UUIDs representing the user's knowledge space
  const sampleUuids = useMemo(() => {
    const domains = ["psychology", "philosophy", "neuroscience", "technology", "literature", "economics"];
    return domains.flatMap((domain) =>
      Array.from({ length: 3 }, () =>
        generate({
          archetype: archetype.id,
          domain,
          fractalLevel: "item",
          knowledgeX: Math.floor(Math.random() * 256),
          knowledgeY: Math.floor(Math.random() * 256),
          knowledgeZ: Math.floor(Math.random() * 256),
        })
      )
    );
  }, [archetype]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      {/* Description */}
      <p className="text-sm leading-relaxed text-center text-muted-foreground">
        {archetype.description}
      </p>

      {/* Dimension icons row */}
      <div className="flex justify-center gap-6">
        {archetype.dimensions.slice(0, 3).map((dim, i) => {
          const pastelBgs = [
            `${archetype.gradient[0]}18`,
            `${archetype.gradient[1]}18`,
            `${archetype.gradient[0]}10`,
          ];
          return (
            <motion.div
              key={dim.trait}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i }}
              className="flex flex-col items-center gap-1.5"
            >
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center text-lg font-bold border border-border"
                style={{ backgroundColor: pastelBgs[i], color: archetype.gradient[i % 2] }}
              >
                {dim.value}%
              </div>
              <span className="text-[11px] font-medium text-muted-foreground text-center leading-tight w-16">
                {dim.trait}
              </span>
            </motion.div>
          );
        })}
      </div>

      {/* Radar chart */}
      <div className="rounded-xl p-4 border border-border bg-card">
        <p className="text-xs font-semibold uppercase tracking-wider mb-2 text-muted-foreground">
          Cognitive Profile
        </p>
        <ResponsiveContainer width="100%" height={200}>
          <RadarChart data={archetype.dimensions}>
            <PolarGrid stroke="hsl(var(--border))" />
            <PolarAngleAxis
              dataKey="trait"
              tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 10 }}
            />
            <Radar
              dataKey="value"
              stroke={archetype.gradient[0]}
              fill={archetype.gradient[0]}
              fillOpacity={0.15}
              strokeWidth={2}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      {/* Knowledge Point Cloud */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <KnowledgePointCloud
          uuids={sampleUuids}
          height={220}
          projections={["xy", "xz", "yz"]}
        />
      </motion.div>

      {/* Strengths */}
      <div className="flex flex-wrap gap-2 justify-center">
        {archetype.strengths.map((s) => (
          <span
            key={s}
            className="px-3 py-1.5 rounded-full text-xs font-medium border border-border bg-card"
            style={{ color: archetype.gradient[0] }}
          >
            {s}
          </span>
        ))}
      </div>

      {/* Educational moment */}
      <div className="rounded-xl p-4 border border-border bg-accent text-center">
        <Sparkles size={16} style={{ color: archetype.gradient[0] }} className="mx-auto mb-2" />
        <p className="text-xs font-semibold text-foreground">
          This shapes your Polymath experience
        </p>
        <p className="text-[11px] mt-1 text-muted-foreground">
          {archetype.readingStyle}
        </p>
      </div>

      {/* Token savings demo */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <TokenSavingsPanel />
      </motion.div>

      {skippedCount && skippedCount > 0 ? (
        <p className="text-[11px] text-center text-muted-foreground">
          You skipped {skippedCount} question{skippedCount > 1 ? "s" : ""} — retake for higher accuracy.
        </p>
      ) : null}
    </motion.div>
  );
};

export default RevealDetails;
