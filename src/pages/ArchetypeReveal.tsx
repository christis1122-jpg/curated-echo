import { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import { Sparkles, ChevronRight, Share2 } from "lucide-react";
import {
  ResponsiveContainer, RadarChart, Radar, PolarGrid, PolarAngleAxis,
} from "recharts";
import { toast } from "sonner";
import { ARCHETYPES, type Archetype } from "@/data/assessment";

/* Particle component */
const Particle = ({ delay, x, y, color }: { delay: number; x: number; y: number; color: string }) => (
  <motion.div
    className="absolute w-2 h-2 rounded-full"
    style={{ backgroundColor: color, left: `${x}%`, top: `${y}%` }}
    initial={{ opacity: 0, scale: 0 }}
    animate={{
      opacity: [0, 1, 1, 0],
      scale: [0, 1.5, 1, 0],
      y: [0, -40 - Math.random() * 60],
      x: [0, (Math.random() - 0.5) * 80],
    }}
    transition={{ duration: 2.5, delay, repeat: Infinity, repeatDelay: Math.random() * 3 }}
  />
);

/* Confetti piece */
const Confetti = ({ delay, color }: { delay: number; color: string }) => (
  <motion.div
    className="absolute w-3 h-3"
    style={{
      backgroundColor: color,
      left: `${10 + Math.random() * 80}%`,
      top: "-10px",
      borderRadius: Math.random() > 0.5 ? "50%" : "2px",
    }}
    initial={{ opacity: 0, y: -20, rotate: 0 }}
    animate={{
      opacity: [0, 1, 1, 0],
      y: [0, window.innerHeight + 100],
      x: [(Math.random() - 0.5) * 200],
      rotate: [0, 360 * (Math.random() > 0.5 ? 1 : -1)],
    }}
    transition={{ duration: 2.5 + Math.random() * 1.5, delay, ease: "easeIn" }}
  />
);

const ArchetypeReveal = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as { archetype?: Archetype; skippedCount?: number } | null;

  const archetype = state?.archetype ?? ARCHETYPES[0];

  const [phase, setPhase] = useState<"loading" | "reveal" | "details">("loading");

  // Particles
  const particles = useMemo(
    () =>
      Array.from({ length: 24 }, (_, i) => ({
        id: i,
        delay: Math.random() * 2,
        x: 20 + Math.random() * 60,
        y: 30 + Math.random() * 40,
        color: i % 2 === 0 ? archetype.gradient[0] : archetype.gradient[1],
      })),
    [archetype]
  );

  const confetti = useMemo(
    () =>
      Array.from({ length: 40 }, (_, i) => ({
        id: i,
        delay: 0.5 + Math.random() * 1.2,
        color: ["hsl(24 80% 52%)", "hsl(280 55% 50%)", "hsl(210 70% 50%)", "hsl(45 95% 55%)", "hsl(160 60% 40%)"][
          i % 5
        ],
      })),
    []
  );

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("reveal"), 2000);
    const t2 = setTimeout(() => setPhase("details"), 3800);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  const handleShare = () => {
    toast("Shareable card coming soon!");
  };

  return (
    <div
      className="min-h-screen relative overflow-hidden flex flex-col items-center justify-center"
      style={{ background: "hsl(20 10% 6%)" }}
    >
      {/* Particles */}
      {(phase === "reveal" || phase === "details") &&
        particles.map((p) => <Particle key={p.id} {...p} />)}

      {/* Confetti */}
      {phase === "reveal" && confetti.map((c) => <Confetti key={c.id} {...c} />)}

      {/* Spotlight */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 50% 60% at 50% 45%, ${archetype.gradient[0]}15, transparent 70%)`,
        }}
      />

      <AnimatePresence mode="wait">
        {/* Loading phase */}
        {phase === "loading" && (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center space-y-4"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles size={32} style={{ color: archetype.gradient[0] }} />
            </motion.div>
            <p className="text-sm font-medium" style={{ color: "hsl(40 20% 70%)" }}>
              Analyzing your intellectual fingerprint...
            </p>
            <motion.div
              className="w-48 h-1 rounded-full mx-auto overflow-hidden"
              style={{ backgroundColor: "hsl(20 8% 15%)" }}
            >
              <motion.div
                className="h-full rounded-full"
                style={{ background: `linear-gradient(90deg, ${archetype.gradient[0]}, ${archetype.gradient[1]})` }}
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 1.8, ease: "easeInOut" }}
              />
            </motion.div>
          </motion.div>
        )}

        {/* Reveal phase */}
        {(phase === "reveal" || phase === "details") && (
          <motion.div
            key="reveal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-full max-w-md mx-auto px-6 pb-32 space-y-8"
          >
            {/* Card */}
            <motion.div
              initial={{ rotateY: 90, scale: 0.8, opacity: 0 }}
              animate={{ rotateY: 0, scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.2 }}
              style={{ perspective: 1000 }}
            >
              <div
                className="rounded-2xl p-8 text-center border relative overflow-hidden"
                style={{
                  background: `linear-gradient(145deg, hsl(20 10% 10%), hsl(20 10% 14%))`,
                  borderColor: `${archetype.gradient[0]}30`,
                }}
              >
                {/* Glow ring */}
                <motion.div
                  className="absolute inset-0 rounded-2xl pointer-events-none"
                  style={{
                    boxShadow: `0 0 60px 10px ${archetype.gradient[0]}20, inset 0 0 60px 10px ${archetype.gradient[0]}05`,
                  }}
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 3, repeat: Infinity }}
                />

                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.6 }}
                  className="text-7xl mb-4"
                >
                  {archetype.emoji}
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 }}
                >
                  <p
                    className="text-xs font-bold uppercase tracking-[0.3em] mb-2"
                    style={{ color: archetype.gradient[1] }}
                  >
                    Your archetype is
                  </p>
                  <h1
                    className="text-3xl font-serif font-bold mb-1"
                    style={{ color: archetype.gradient[0] }}
                  >
                    {archetype.name}
                  </h1>
                  <p className="text-sm italic" style={{ color: "hsl(40 20% 60%)" }}>
                    {archetype.title}
                  </p>
                </motion.div>

                {/* Share button */}
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.5 }}
                  onClick={handleShare}
                  className="absolute top-4 right-4 p-2 rounded-lg transition-colors"
                  style={{ color: "hsl(40 20% 50%)" }}
                >
                  <Share2 size={16} />
                </motion.button>
              </div>
            </motion.div>

            {/* Details */}
            <AnimatePresence>
              {phase === "details" && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-6"
                >
                  {/* Description */}
                  <p className="text-sm leading-relaxed text-center" style={{ color: "hsl(40 20% 70%)" }}>
                    {archetype.description}
                  </p>

                  {/* Radar chart */}
                  <div
                    className="rounded-xl p-4 border"
                    style={{
                      background: "hsl(20 10% 10%)",
                      borderColor: "hsl(20 8% 18%)",
                    }}
                  >
                    <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: "hsl(40 20% 55%)" }}>
                      Cognitive Profile
                    </p>
                    <ResponsiveContainer width="100%" height={200}>
                      <RadarChart data={archetype.dimensions}>
                        <PolarGrid stroke="hsl(20 8% 22%)" />
                        <PolarAngleAxis dataKey="trait" tick={{ fill: "hsl(40 20% 55%)", fontSize: 10 }} />
                        <Radar
                          dataKey="value"
                          stroke={archetype.gradient[0]}
                          fill={archetype.gradient[0]}
                          fillOpacity={0.2}
                          strokeWidth={2}
                        />
                      </RadarChart>
                    </ResponsiveContainer>
                  </div>

                  {/* Strengths */}
                  <div className="flex flex-wrap gap-2 justify-center">
                    {archetype.strengths.map((s) => (
                      <span
                        key={s}
                        className="px-3 py-1 rounded-full text-xs font-medium"
                        style={{
                          backgroundColor: `${archetype.gradient[0]}15`,
                          color: archetype.gradient[0],
                        }}
                      >
                        {s}
                      </span>
                    ))}
                  </div>

                  {/* Educational moment */}
                  <div
                    className="rounded-xl p-4 border text-center"
                    style={{
                      background: `${archetype.gradient[0]}08`,
                      borderColor: `${archetype.gradient[0]}20`,
                    }}
                  >
                    <Sparkles size={16} style={{ color: archetype.gradient[0] }} className="mx-auto mb-2" />
                    <p className="text-xs font-semibold" style={{ color: "hsl(40 20% 80%)" }}>
                      This shapes your Polymath experience
                    </p>
                    <p className="text-[11px] mt-1" style={{ color: "hsl(40 20% 55%)" }}>
                      {archetype.readingStyle}
                    </p>
                  </div>

                  {state?.skippedCount && state.skippedCount > 0 ? (
                    <p className="text-[11px] text-center" style={{ color: "hsl(40 20% 40%)" }}>
                      You skipped {state.skippedCount} question{state.skippedCount > 1 ? "s" : ""} — retake for higher accuracy.
                    </p>
                  ) : null}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CTA */}
      {phase === "details" && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="fixed bottom-0 inset-x-0 p-5"
          style={{ background: "linear-gradient(to top, hsl(20 10% 6%), transparent)" }}
        >
          <div className="max-w-md mx-auto">
            <motion.button
              onClick={() => navigate("/")}
              animate={{ boxShadow: [`0 0 20px 4px ${archetype.gradient[0]}30`, `0 0 30px 8px ${archetype.gradient[0]}50`, `0 0 20px 4px ${archetype.gradient[0]}30`] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-full py-4 rounded-xl text-sm font-bold flex items-center justify-center gap-2"
              style={{
                background: `linear-gradient(135deg, ${archetype.gradient[0]}, ${archetype.gradient[1]})`,
                color: "white",
              }}
            >
              Explore My Feed <ChevronRight size={16} />
            </motion.button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default ArchetypeReveal;
