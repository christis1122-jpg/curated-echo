import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, SkipForward, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Slider } from "@/components/ui/slider";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import {
  ASSESSMENT_QUESTIONS,
  calculateArchetype,
  type AssessmentQuestion,
} from "@/data/assessment";

const Assessment = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [skipped, setSkipped] = useState<Set<string>>(new Set());
  const [direction, setDirection] = useState(1);

  const total = ASSESSMENT_QUESTIONS.length;
  const current = ASSESSMENT_QUESTIONS[step];
  const progress = ((step + 1) / total) * 100;

  const setAnswer = useCallback(
    (qId: string, value: any) => {
      setAnswers((prev) => ({ ...prev, [qId]: value }));
    },
    []
  );

  const goNext = useCallback(() => {
    if (step < total - 1) {
      setDirection(1);
      setStep((s) => s + 1);
    } else {
      const archetype = calculateArchetype(answers);
      navigate("/archetype-reveal", { state: { archetype, answers, skippedCount: skipped.size } });
    }
  }, [step, total, answers, navigate, skipped]);

  const goBack = useCallback(() => {
    if (step > 0) {
      setDirection(-1);
      setStep((s) => s - 1);
    }
  }, [step]);

  const skip = useCallback(() => {
    setSkipped((prev) => new Set(prev).add(current.id));
    toast("Skipped — your archetype may be less accurate", { duration: 2000 });
    goNext();
  }, [current, goNext]);

  const canProceed = () => {
    const a = answers[current.id];
    if (current.type === "slider") return a !== undefined;
    if (current.type === "binary") return a !== undefined;
    if (current.type === "card_select") {
      return Array.isArray(a) && a.length >= current.minSelect;
    }
    return false;
  };

  const variants = {
    enter: (d: number) => ({ x: d > 0 ? 300 : -300, opacity: 0, scale: 0.95 }),
    center: { x: 0, opacity: 1, scale: 1 },
    exit: (d: number) => ({ x: d > 0 ? -300 : 300, opacity: 0, scale: 0.95 }),
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Top bar */}
      <div className="sticky top-0 z-40 bg-background/90 backdrop-blur-xl border-b border-border">
        <div className="max-w-2xl mx-auto px-5 py-3 flex items-center gap-4">
          <button onClick={step === 0 ? () => navigate(-1) : goBack} className="p-1.5 rounded-lg hover:bg-muted transition-colors">
            <ArrowLeft size={20} className="text-foreground" />
          </button>
          <div className="flex-1">
            <Progress value={progress} className="h-2" />
          </div>
          <span className="text-xs text-muted-foreground font-medium tabular-nums">
            {step + 1}/{total}
          </span>
        </div>
      </div>

      {/* Question area */}
      <div className="flex-1 flex flex-col max-w-2xl mx-auto w-full px-5 pt-8 pb-32">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={current.id}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="flex-1"
          >
            <QuestionRenderer
              question={current}
              value={answers[current.id]}
              onChange={(v) => setAnswer(current.id, v)}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom actions */}
      <div className="fixed bottom-0 inset-x-0 bg-background/90 backdrop-blur-xl border-t border-border">
        <div className="max-w-2xl mx-auto px-5 py-4 flex items-center justify-between">
          <button onClick={skip} className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <SkipForward size={14} /> Skip
          </button>
          <button
            onClick={goNext}
            disabled={!canProceed()}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold transition-all ${
              canProceed()
                ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25 hover:shadow-primary/40"
                : "bg-muted text-muted-foreground cursor-not-allowed"
            }`}
          >
            {step === total - 1 ? "Reveal My Archetype" : "Continue"}
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

/* Question renderers */
const QuestionRenderer = ({
  question: q,
  value,
  onChange,
}: {
  question: AssessmentQuestion;
  value: any;
  onChange: (v: any) => void;
}) => {
  if (q.type === "slider") return <SliderQ q={q} value={value} onChange={onChange} />;
  if (q.type === "card_select") return <CardSelectQ q={q} value={value} onChange={onChange} />;
  return <BinaryQ q={q} value={value} onChange={onChange} />;
};

const SliderQ = ({ q, value, onChange }: { q: any; value: any; onChange: (v: any) => void }) => (
  <div className="space-y-8">
    <h2 className="text-2xl font-serif font-bold text-foreground leading-snug">{q.question}</h2>
    <div className="space-y-6 pt-4">
      <Slider
        value={[value ?? 5]}
        onValueChange={([v]) => onChange(v)}
        min={1}
        max={10}
        step={1}
        className="w-full"
      />
      <div className="flex justify-between">
        <div className="text-center">
          <p className="text-sm font-semibold text-foreground">{q.leftLabel}</p>
          <p className="text-[10px] text-muted-foreground mt-0.5">1</p>
        </div>
        <div className="flex items-center">
          <span className="text-3xl font-bold text-primary tabular-nums">{value ?? 5}</span>
        </div>
        <div className="text-center">
          <p className="text-sm font-semibold text-foreground">{q.rightLabel}</p>
          <p className="text-[10px] text-muted-foreground mt-0.5">10</p>
        </div>
      </div>
    </div>
  </div>
);

const CardSelectQ = ({ q, value, onChange }: { q: any; value: any; onChange: (v: any) => void }) => {
  const selected: string[] = value ?? [];
  const toggle = (id: string) => {
    if (selected.includes(id)) {
      onChange(selected.filter((s: string) => s !== id));
    } else if (selected.length < q.maxSelect) {
      onChange([...selected, id]);
    }
  };

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-2xl font-serif font-bold text-foreground leading-snug">{q.question}</h2>
        <p className="text-sm text-muted-foreground mt-1">{q.subtitle}</p>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {q.options.map((opt: any) => {
          const active = selected.includes(opt.id);
          return (
            <motion.button
              key={opt.id}
              whileTap={{ scale: 0.96 }}
              onClick={() => toggle(opt.id)}
              className={`p-4 rounded-xl border-2 text-left transition-all ${
                active
                  ? "border-primary bg-primary/5 shadow-sm"
                  : "border-border bg-card hover:border-primary/30"
              }`}
            >
              <span className="text-2xl block mb-2">{opt.emoji}</span>
              <p className={`text-sm font-semibold ${active ? "text-primary" : "text-foreground"}`}>
                {opt.label}
              </p>
              <p className="text-[11px] text-muted-foreground mt-0.5">{opt.description}</p>
            </motion.button>
          );
        })}
      </div>
      <p className="text-xs text-muted-foreground text-center">
        {selected.length}/{q.maxSelect} selected
      </p>
    </div>
  );
};

const BinaryQ = ({ q, value, onChange }: { q: any; value: any; onChange: (v: any) => void }) => (
  <div className="space-y-6">
    <h2 className="text-2xl font-serif font-bold text-foreground leading-snug">{q.question}</h2>
    <div className="space-y-3">
      {[
        { key: "a", opt: q.optionA },
        { key: "b", opt: q.optionB },
      ].map(({ key, opt }) => {
        const active = value === key;
        return (
          <motion.button
            key={key}
            whileTap={{ scale: 0.97 }}
            onClick={() => onChange(key)}
            className={`w-full p-5 rounded-xl border-2 text-left transition-all ${
              active
                ? "border-primary bg-primary/5 shadow-sm"
                : "border-border bg-card hover:border-primary/30"
            }`}
          >
            <div className="flex items-start gap-4">
              <span className="text-3xl">{opt.emoji}</span>
              <div>
                <p className={`text-base font-semibold ${active ? "text-primary" : "text-foreground"}`}>
                  {opt.label}
                </p>
                <p className="text-sm text-muted-foreground mt-0.5">{opt.description}</p>
              </div>
            </div>
          </motion.button>
        );
      })}
    </div>
  </div>
);

export default Assessment;
