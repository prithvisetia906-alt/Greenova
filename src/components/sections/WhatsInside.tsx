'use client';

import { useRef } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  type MotionValue,
} from 'framer-motion';
import { Card, OrganicBackdrop, ScrollReveal, StaggerContainer, StaggerItem } from '@/components/ui';
import { Plus, Check, Box, Equal } from 'lucide-react';

const kitComponents = [
  {
    id: 'seeds',
    label: 'Seeds',
    emoji: '🌰',
    description: 'Curated seed varieties chosen for your space and season.',
  },
  {
    id: 'soil',
    label: 'Soil',
    emoji: '🌱',
    description: 'Premium organic mixes or custom blends for your plants.',
  },
  {
    id: 'nutrition',
    label: 'Nutrition',
    emoji: '💚',
    description: 'Balanced organic fertilizers for steady growth.',
  },
  {
    id: 'protection',
    label: 'Plant Protection',
    emoji: '🛡️',
    description: 'Natural, preventive plant-care essentials.',
  },
  {
    id: 'accessories',
    label: 'Accessories',
    emoji: '🔧',
    description: 'Grow bags, tools and helpers (optional).',
  },
];

export function WhatsInside() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  // 0 → scattered ingredients, 1 → assembled kit
  const assembly = useTransform(scrollYProgress, [0.25, 0.72], [0, 1]);
  const barScale = useTransform(assembly, [0, 1], [0.05, 1]);
  const kitScale = useTransform(assembly, [0.55, 1], [0.94, 1]);
  const kitGlow = useTransform(assembly, [0.55, 1], [0, 0.5]);

  return (
    <section id="whats-inside" ref={ref} className="section bg-white relative overflow-hidden">
      <OrganicBackdrop density="low" tone="green" />

      <div className="relative container-main">
        <ScrollReveal className="text-center max-w-3xl mx-auto mb-10">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-pale text-green-primary text-sm font-medium mb-4">
            <Box className="w-4 h-4" aria-hidden="true" />
            What&apos;s Inside Your Kit
          </span>
          <h2 className="section-title">Five Parts. One Living Kit.</h2>
          <p className="section-subtitle mx-auto">
            Scroll to watch the ingredients come together into your custom Greenova kit.
          </p>
        </ScrollReveal>

        {/* Assembly progress */}
        <ScrollReveal delay={0.1} className="max-w-3xl mx-auto mb-8">
          <div className="flex items-center gap-3" aria-hidden="true">
            <span className="text-xs font-medium uppercase tracking-widest text-green-600">Ingredients</span>
            <div className="relative flex-1 h-1.5 rounded-full bg-green-100 overflow-hidden">
              <motion.div className="absolute inset-0 origin-left rounded-full bg-gradient-to-r from-green-emerald to-amber-warm" style={reduce ? { scaleX: 1 } : { scaleX: barScale }} />
            </div>
            <span className="text-xs font-medium uppercase tracking-widest text-green-600">Your Kit</span>
          </div>
        </ScrollReveal>

        {/* Assembly stage */}
        <div className="relative max-w-4xl mx-auto rounded-3xl border border-green-100 bg-gradient-to-b from-green-paler/60 via-white to-amber-pale/40 p-6 sm:p-10 shadow-sm overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(61,168,74,0.08),transparent_65%)]" aria-hidden="true" />

          <div className="relative flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-2">
            {kitComponents.map((component, index) => (
              <AssemblyStep
                key={component.id}
                item={component}
                index={index}
                isLast={index === kitComponents.length - 1}
                assembly={assembly}
                reduce={!!reduce}
              />
            ))}
          </div>

          {/* Equals divider */}
          <div className="relative flex items-center justify-center gap-3 my-8" aria-hidden="true">
            <span className="h-px w-16 sm:w-28 bg-green-200" />
            <motion.span
              className="flex items-center justify-center w-10 h-10 rounded-full bg-green-deep text-white shadow-lg"
              style={reduce ? undefined : { scale: kitScale }}
            >
              <Equal className="w-5 h-5" />
            </motion.span>
            <span className="h-px w-16 sm:w-28 bg-green-200" />
          </div>

          {/* Final kit */}
          <motion.div style={reduce ? undefined : { scale: kitScale }} className="relative">
            <motion.div
              className="absolute -inset-3 rounded-3xl bg-green-leaf/20 blur-2xl"
              style={reduce ? { opacity: 0.25 } : { opacity: kitGlow }}
              aria-hidden="true"
            />
            <Card className="relative text-center border-2 border-green-200 bg-white/95 backdrop-blur-sm p-6 sm:p-8">
              <StaggerContainer className="flex flex-wrap items-center justify-center gap-2 mb-4" staggerDelay={0.05}>
                {kitComponents.map((c) => (
                  <StaggerItem key={c.id}>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-green-pale text-green-800 text-xs font-medium">
                      <span aria-hidden="true">{c.emoji}</span> {c.label}
                    </span>
                  </StaggerItem>
                ))}
              </StaggerContainer>
              <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-green-primary to-amber-warm text-3xl shadow-lg" aria-hidden="true">
                📦
              </div>
              <h3 className="text-xl sm:text-2xl font-semibold text-green-deep">Your Custom Greenova Kit</h3>
              <p className="mt-2 text-sm sm:text-base text-green-600 max-w-xl mx-auto">
                All components arrive together in eco-friendly packaging with a personalized growing guide.
              </p>
            </Card>
          </motion.div>
        </div>

        <ScrollReveal delay={0.15} className="mt-8 text-center">
          <p className="text-sm text-green-600">
            Seeds + Soil + Nutrition + Plant Protection + Accessories = everything you need to start.
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}

function AssemblyStep({
  item,
  index,
  isLast,
  assembly,
  reduce,
}: {
  item: (typeof kitComponents)[number];
  index: number;
  isLast: boolean;
  assembly: MotionValue<number>;
  reduce: boolean;
}) {
  // Spread chips apart at start, converge to center as assembly → 1
  const spread = (index - 2) * 46;
  const x = useTransform(assembly, [0, 1], reduce ? [0, 0] : [spread, 0]);
  const chipScale = useTransform(assembly, [0, 1], reduce ? [1, 1] : [0.96, 1]);
  const plusOpacity = useTransform(assembly, [0, 0.65], [1, 0]);
  const plusScale = useTransform(assembly, [0, 0.65], [1, 0.6]);
  const checkOpacity = useTransform(assembly, [0.35 + index * 0.1, 0.55 + index * 0.1], [0, 1]);

  return (
    <>
      <motion.div style={reduce ? undefined : { x, scale: chipScale }} className="flex-1 min-w-[140px] sm:min-w-0">
        <div className="relative rounded-2xl border border-green-100 bg-white p-4 text-center shadow-sm transition-shadow hover:shadow-md">
          <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-xl bg-green-pale text-2xl" aria-hidden="true">
            {item.emoji}
          </div>
          <p className="text-sm font-semibold text-green-900">{item.label}</p>
          <p className="mt-1 hidden text-xs leading-relaxed text-green-600 sm:block">{item.description}</p>
          <motion.span
            className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-green-primary text-white shadow"
            style={reduce ? { opacity: 1 } : { opacity: checkOpacity }}
            aria-hidden="true"
          >
            <Check className="h-3.5 w-3.5" />
          </motion.span>
        </div>
      </motion.div>

      {!isLast && (
        <motion.span
          className="flex items-center justify-center text-green-400"
          style={reduce ? undefined : { opacity: plusOpacity, scale: plusScale }}
          aria-hidden="true"
        >
          <Plus className="h-5 w-5 rotate-90 sm:rotate-0" />
        </motion.span>
      )}
    </>
  );
}
