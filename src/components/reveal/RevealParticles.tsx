import { motion } from "framer-motion";
import { useMemo } from "react";

interface RevealParticlesProps {
  colors: [string, string];
}

const Particle = ({ delay, x, y, color }: { delay: number; x: number; y: number; color: string }) => (
  <motion.div
    className="absolute w-2 h-2 rounded-full"
    style={{ backgroundColor: color, left: `${x}%`, top: `${y}%` }}
    initial={{ opacity: 0, scale: 0 }}
    animate={{
      opacity: [0, 0.6, 0.6, 0],
      scale: [0, 1.5, 1, 0],
      y: [0, -40 - Math.random() * 60],
      x: [0, (Math.random() - 0.5) * 80],
    }}
    transition={{ duration: 2.5, delay, repeat: Infinity, repeatDelay: Math.random() * 3 }}
  />
);

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

export const useParticles = (colors: [string, string]) => {
  const particles = useMemo(
    () =>
      Array.from({ length: 24 }, (_, i) => ({
        id: i,
        delay: Math.random() * 2,
        x: 20 + Math.random() * 60,
        y: 30 + Math.random() * 40,
        color: i % 2 === 0 ? colors[0] : colors[1],
      })),
    [colors]
  );

  const confetti = useMemo(
    () =>
      Array.from({ length: 40 }, (_, i) => ({
        id: i,
        delay: 0.5 + Math.random() * 1.2,
        color: [
          "hsl(24 80% 52%)",
          "hsl(280 55% 50%)",
          "hsl(210 70% 50%)",
          "hsl(45 95% 55%)",
          "hsl(160 60% 40%)",
        ][i % 5],
      })),
    []
  );

  return { particles, confetti };
};

export const ParticleField = ({ particles }: { particles: { id: number; delay: number; x: number; y: number; color: string }[] }) => (
  <>
    {particles.map((p) => (
      <Particle key={p.id} {...p} />
    ))}
  </>
);

export const ConfettiField = ({ confetti }: { confetti: { id: number; delay: number; color: string }[] }) => (
  <>
    {confetti.map((c) => (
      <Confetti key={c.id} {...c} />
    ))}
  </>
);
