import { motion } from "framer-motion";
import { Share2 } from "lucide-react";
import type { Archetype } from "@/data/assessment";
import { generate } from "@/lib/gyst-uuid";
import { UUIDViewer } from "@/components/ui/uuid-viewer";
import { useMemo } from "react";

interface RevealCardProps {
  archetype: Archetype;
  onShare: () => void;
}

const RevealCard = ({ archetype, onShare }: RevealCardProps) => {
  const archetypeUuid = useMemo(
    () =>
      generate({
        archetype: archetype.id,
        domain: "profile",
        fractalLevel: "root",
        knowledgeX: archetype.dimensions[0]?.value ?? 128,
        knowledgeY: archetype.dimensions[1]?.value ?? 128,
        knowledgeZ: archetype.dimensions[2]?.value ?? 128,
      }),
    [archetype]
  );

  return (
    <motion.div
      initial={{ rotateY: 90, scale: 0.8, opacity: 0 }}
      animate={{ rotateY: 0, scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.2 }}
      style={{ perspective: 1000 }}
    >
      <div className="rounded-2xl p-8 text-center border border-border bg-card relative overflow-hidden shadow-lg">
        {/* Soft glow */}
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{
            boxShadow: `0 0 80px 20px ${archetype.gradient[0]}15, inset 0 0 60px 10px ${archetype.gradient[0]}05`,
          }}
          animate={{ opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 3, repeat: Infinity }}
        />

        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.6 }}
          className="w-24 h-24 rounded-full mx-auto mb-4 flex items-center justify-center text-5xl"
          style={{ backgroundColor: `${archetype.gradient[0]}15` }}
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
          <p className="text-sm italic text-muted-foreground">
            {archetype.title}
          </p>
        </motion.div>

        {/* GYST UUID fingerprint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-4 pt-4 border-t border-border"
        >
          <p className="text-[9px] uppercase tracking-widest text-muted-foreground mb-1.5">
            Intellectual Fingerprint
          </p>
          <div className="flex justify-center">
            <UUIDViewer uuid={archetypeUuid} showLabel={false} />
          </div>
        </motion.div>

        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          onClick={onShare}
          className="absolute top-4 right-4 p-2 rounded-lg text-muted-foreground hover:text-foreground transition-colors"
        >
          <Share2 size={16} />
        </motion.button>
      </div>
    </motion.div>
  );
};

export default RevealCard;
