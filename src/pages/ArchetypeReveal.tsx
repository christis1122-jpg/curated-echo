import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import { Sparkles, ChevronRight } from "lucide-react";
import { toast } from "sonner";
import { ARCHETYPES, type Archetype } from "@/data/assessment";
import RevealCard from "@/components/reveal/RevealCard";
import RevealDetails from "@/components/reveal/RevealDetails";
import { useParticles, ParticleField, ConfettiField } from "@/components/reveal/RevealParticles";

const ArchetypeReveal = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as { archetype?: Archetype; skippedCount?: number } | null;
  const archetype = state?.archetype ?? ARCHETYPES[0];

  const [phase, setPhase] = useState<"loading" | "reveal" | "details">("loading");
  const { particles, confetti } = useParticles(archetype.gradient);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("reveal"), 2000);
    const t2 = setTimeout(() => setPhase("details"), 3800);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  const handleShare = () => toast("Shareable card coming soon!");

  return (
    <div className="min-h-screen relative overflow-hidden flex flex-col items-center justify-center bg-background">
      {/* Particles */}
      {(phase === "reveal" || phase === "details") && <ParticleField particles={particles} />}
      {phase === "reveal" && <ConfettiField confetti={confetti} />}

      {/* Soft spotlight */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 60% 50% at 50% 40%, ${archetype.gradient[0]}10, transparent 70%)`,
        }}
      />

      <AnimatePresence mode="wait">
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
              <Sparkles size={32} className="text-primary mx-auto" />
            </motion.div>
            <p className="text-sm font-medium text-muted-foreground">
              Analyzing your intellectual fingerprint...
            </p>
            <motion.div className="w-48 h-1 rounded-full mx-auto overflow-hidden bg-muted">
              <motion.div
                className="h-full rounded-full bg-primary"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 1.8, ease: "easeInOut" }}
              />
            </motion.div>
          </motion.div>
        )}

        {(phase === "reveal" || phase === "details") && (
          <motion.div
            key="reveal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-full max-w-md mx-auto px-6 pb-32 space-y-8"
          >
            <RevealCard archetype={archetype} onShare={handleShare} />

            <AnimatePresence>
              {phase === "details" && (
                <RevealDetails archetype={archetype} skippedCount={state?.skippedCount} />
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
          className="fixed bottom-0 inset-x-0 p-5 bg-gradient-to-t from-background to-transparent"
        >
          <div className="max-w-md mx-auto">
            <motion.button
              onClick={() => navigate("/")}
              whileTap={{ scale: 0.97 }}
              className="w-full py-4 rounded-xl text-sm font-bold flex items-center justify-center gap-2 text-primary-foreground shadow-lg"
              style={{
                background: `linear-gradient(135deg, ${archetype.gradient[0]}, ${archetype.gradient[1]})`,
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
