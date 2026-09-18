'use client';

import { useRef, useState } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  useMotionValueEvent,
  type MotionValue,
} from 'framer-motion';
import { Card, OrganicBackdrop, ScrollReveal } from '@/components/ui';
import { Sprout } from 'lucide-react';
import { clsx } from 'clsx';

const stages = [
  {
    id: 'seed',
    label: 'SEED',
    emoji: '🌰',
    description: 'Your journey begins with a tiny seed full of potential.',
    details: 'High-quality, non-GMO seeds with strong germination rates.',
    duration: 'Day 0',
  },
  {
    id: 'sprout',
    label: 'SPROUT',
    emoji: '🌱',
    description: 'The first signs of life emerge from the soil.',
    details: 'Keep soil moist and give gentle light.',
    duration: 'Days 3–10',
  },
  {
    id: 'plant',
    label: 'PLANT',
    emoji: '🌿',
    description: 'True leaves develop and the plant grows stronger.',
    details: 'Light feeding begins. Support vines as needed.',
    duration: 'Days 14–45',
  },
  {
    id: 'harvest',
    label: 'HARVEST',
    emoji: '🍅',
    description: 'Enjoy the fruits of your labor — fresh, homegrown produce.',
    details: 'Pick at peak ripeness for the best flavour.',
    duration: 'Days 30–120+',
  },
];

export function GrowingJourney() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [activeStage, setActiveStage] = useState(0);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  // Overall growth driven by scroll through this section
  const growth = useTransform(scrollYProgress, [0.22, 0.78], [0, 1]);

  useMotionValueEvent(growth, 'change', (v) => {
    const idx = Math.min(3, Math.max(0, Math.floor(v * 4)));
    setActiveStage(idx);
  });

  return (
    <section id="growing-journey" ref={ref} className="section bg-bg-primary relative overflow-hidden">
      <OrganicBackdrop density="low" tone="green" />

      <div className="relative container-main">
        <ScrollReveal className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-pale text-green-primary text-sm font-medium mb-4">
            <Sprout className="w-4 h-4" aria-hidden="true" />
            Growing Journey
          </span>
          <h2 className="section-title">From Seed to Harvest</h2>
          <p className="section-subtitle mx-auto">
            Keep scrolling — the plant grows with you, from a single seed to harvest day.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-start max-w-6xl mx-auto">
          {/* Sticky signature visualization */}
          <div className="lg:sticky lg:top-28 self-start">
            <ScrollReveal direction="none" scale={0.96} className="relative">
              <div className="relative mx-auto w-full max-w-sm rounded-3xl border border-green-100 bg-white/90 backdrop-blur-sm p-4 sm:p-6 shadow-sm">
                <PlantCanvas growth={growth} reduce={!!reduce} />
                {/* Stage dots */}
                <div className="mt-4 flex items-center justify-center gap-2" aria-hidden="true">
                  {stages.map((s, i) => (
                    <StageDot key={s.id} index={i} activeStage={activeStage} growth={growth} reduce={!!reduce} />
                  ))}
                </div>
                <p className="mt-3 text-center text-xs font-medium uppercase tracking-widest text-green-600">
                  {stages[activeStage].label} · {stages[activeStage].duration}
                </p>
              </div>
            </ScrollReveal>
          </div>

          {/* Steps */}
          <div className="relative">
            <div className="absolute left-5 sm:left-6 top-4 bottom-4 w-px bg-green-100" aria-hidden="true">
              <GrowthLine growth={growth} reduce={!!reduce} />
            </div>
            <div className="space-y-4 sm:space-y-5">
              {stages.map((stage, index) => (
                <ScrollReveal key={stage.id} delay={Math.min(index * 0.06, 0.18)}>
                  <StageCard stage={stage} index={index} active={reduce ? true : activeStage === index} done={reduce ? false : activeStage > index} />
                </ScrollReveal>
              ))}
            </div>

            <ScrollReveal delay={0.1} className="mt-8 text-center lg:text-left">
              <p className="text-green-600 mb-4 text-sm sm:text-base">Every stage is a milestone. Your kit supports you through all of them.</p>
              <a
                href="#build-your-kit"
                className="inline-flex items-center justify-center px-6 py-3 rounded-xl font-medium text-green-700 bg-white border border-green-200 hover:bg-green-50 hover:border-green-300 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2 active:scale-[0.98]"
              >
                Build My Kit →
              </a>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}

function GrowthLine({ growth, reduce }: { growth: MotionValue<number>; reduce: boolean }) {
  const scaleY = useTransform(growth, [0, 1], [0.05, 1]);
  if (reduce) return <div className="absolute inset-0 bg-green-200" />;
  return (
    <motion.div className="absolute inset-0 origin-top bg-gradient-to-b from-green-emerald via-green-leaf to-amber-warm" style={{ scaleY }} />
  );
}

function StageDot({ index, activeStage, growth, reduce }: { index: number; activeStage: number; growth: MotionValue<number>; reduce: boolean }) {
  const threshold = (index + 1) / 4;
  const fill = useTransform(growth, [threshold - 0.12, threshold], [0.25, 1]);
  const scale = useTransform(growth, [threshold - 0.12, threshold], [0.9, 1.15]);
  const isActive = reduce ? index === 0 : activeStage === index;
  return (
    <motion.span
      style={reduce ? undefined : { opacity: fill, scale }}
      className={clsx(
        'h-2.5 w-2.5 rounded-full transition-colors',
        isActive ? 'bg-green-primary' : 'bg-green-200'
      )}
    />
  );
}

function StageCard({ stage, index, active, done }: { stage: (typeof stages)[number]; index: number; active: boolean; done: boolean }) {
  return (
    <div
      className={clsx(
        'relative ml-12 sm:ml-14 rounded-2xl border-2 p-5 sm:p-6 transition-all duration-300',
        active
          ? 'border-green-300 bg-white shadow-lg'
          : 'border-green-100 bg-white/70'
      )}
    >
      <span
        className={clsx(
          'absolute -left-12 sm:-left-14 top-5 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full border-2 text-lg transition-all duration-300',
          active ? 'border-green-primary bg-green-primary text-white shadow-md scale-110' : done ? 'border-green-300 bg-green-pale' : 'border-green-100 bg-white'
        )}
        aria-hidden="true"
      >
        {stage.emoji}
      </span>
      <div className="flex items-baseline gap-3 flex-wrap">
        <h3 className="text-lg sm:text-xl font-display font-medium text-green-950">{stage.label}</h3>
        <span className="text-xs font-medium uppercase tracking-widest text-green-500">{stage.duration}</span>
        <span className="ml-auto text-xs font-semibold text-green-400">0{index + 1} / 04</span>
      </div>
      <p className="mt-2 text-sm sm:text-base text-green-700">{stage.description}</p>
      <p className="mt-1 text-xs sm:text-sm text-green-600">{stage.details}</p>
      <span className="mt-3 block text-xs text-green-500">↓</span>
    </div>
  );
}

function PlantCanvas({ growth, reduce }: { growth: MotionValue<number>; reduce: boolean }) {
  // Signature SVG growth — transform/opacity/pathLength only
  const stemDraw = useTransform(growth, [0.05, 0.65], [0, 1]);
  const seedFade = useTransform(growth, [0, 0.18], [1, 0]);
  const seedScale = useTransform(growth, [0, 0.18], [1, 0.6]);
  const leafLeft = useTransform(growth, [0.35, 0.58], [0, 1]);
  const leafRight = useTransform(growth, [0.5, 0.72], [0, 1]);
  const fruitScale = useTransform(growth, [0.74, 0.95], [0, 1]);
  const fruitOpacity = useTransform(growth, [0.74, 0.85], [0, 1]);
  const glow = useTransform(growth, [0.6, 1], [0, 0.45]);
  const rootsDraw = useTransform(growth, [0, 0.25], [0, 1]);
  const budOpacity = useTransform(growth, [0.55, 0.68, 0.8], [0, 1, 0]);

  const staticStyle = reduce
    ? { pathLength: 1 as const, opacity: 1 as const, scale: 1 as const }
    : undefined;

  return (
    <div className="relative w-full aspect-[4/5] max-h-[420px]">
      <motion.div className="absolute inset-x-8 bottom-16 top-8 rounded-full bg-green-leaf/20 blur-2xl" style={reduce ? { opacity: 0.3 } : { opacity: glow }} aria-hidden="true" />
      <svg viewBox="0 0 320 420" className="relative h-full w-full" role="img" aria-label="Animation of a plant growing from seed to harvest as you scroll">
        {/* Sun hint */}
        <circle cx="252" cy="64" r="26" fill="#E8C56D" opacity="0.35" />
        <circle cx="252" cy="64" r="16" fill="#E8C56D" opacity="0.5" />

        {/* Soil */}
        <ellipse cx="160" cy="368" rx="118" ry="22" fill="#8B7355" opacity="0.22" />
        <ellipse cx="160" cy="362" rx="92" ry="14" fill="#7A6548" opacity="0.35" />

        {/* Roots */}
        <motion.path
          d="M160 366 C150 376 142 380 132 384 M160 366 C168 378 178 382 188 386 M160 366 L160 388"
          fill="none"
          stroke="#8B7355"
          strokeWidth="4"
          strokeLinecap="round"
          opacity="0.6"
          style={reduce ? staticStyle : { pathLength: rootsDraw }}
        />

        {/* Stem */}
        <motion.path
          d="M160 366 C158 300 162 240 160 168"
          fill="none"
          stroke="#1E5D2E"
          strokeWidth="7"
          strokeLinecap="round"
          style={reduce ? staticStyle : { pathLength: stemDraw }}
        />

        {/* Left leaf */}
        <motion.g
          style={
            reduce
              ? { scale: 1, opacity: 1, transformOrigin: '160px 282px' }
              : { scale: leafLeft, opacity: leafLeft, transformOrigin: '160px 282px' }
          }
        >
          <path d="M160 282 C130 270 112 248 108 224 C134 228 154 246 160 282 Z" fill="#3DA84A" />
          <path d="M158 278 C140 264 126 250 116 232" fill="none" stroke="#144224" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
        </motion.g>

        {/* Right leaf */}
        <motion.g
          style={
            reduce
              ? { scale: 1, opacity: 1, transformOrigin: '160px 248px' }
              : { scale: leafRight, opacity: leafRight, transformOrigin: '160px 248px' }
          }
        >
          <path d="M160 248 C190 238 206 218 210 196 C184 200 164 216 160 248 Z" fill="#2A7F3A" />
          <path d="M162 244 C180 232 194 218 202 202" fill="none" stroke="#FAFAF8" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
        </motion.g>

        {/* Seed that fades as sprout takes over */}
        <motion.g style={reduce ? { opacity: 0 } : { opacity: seedFade, scale: seedScale, transformOrigin: '160px 356px' }}>
          <ellipse cx="160" cy="356" rx="13" ry="10" fill="#C4963A" />
          <ellipse cx="156" cy="353" rx="4" ry="3" fill="#FCEFD3" opacity="0.8" />
        </motion.g>

        {/* Fruit / harvest */}
        <motion.g
          style={
            reduce
              ? { scale: 1, opacity: 1, transformOrigin: '160px 148px' }
              : { scale: fruitScale, opacity: fruitOpacity, transformOrigin: '160px 148px' }
          }
        >
          <circle cx="160" cy="148" r="17" fill="#C0392B" />
          <circle cx="154" cy="142" r="5" fill="#fff" opacity="0.45" />
          <path d="M160 131 C160 124 165 120 171 120" fill="none" stroke="#1E5D2E" strokeWidth="4" strokeLinecap="round" />
          <path d="M171 120 C178 116 186 117 190 122 C184 127 176 127 171 120 Z" fill="#3DA84A" />
        </motion.g>

        {/* Bud before fruit */}
        <motion.circle
          cx="160"
          cy="162"
          r="7"
          fill="#5FC46E"
          style={reduce ? { opacity: 0 } : { opacity: budOpacity }}
        />
      </svg>
    </div>
  );
}
