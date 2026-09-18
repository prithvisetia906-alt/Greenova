'use client';

import { useRouter } from 'next/navigation';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Sparkles, Leaf, Truck, BadgePercent } from 'lucide-react';
import { Button } from '@/components/ui';
import { OrganicBackdrop, ScrollReveal, StaggerContainer, StaggerItem } from '@/components/ui';

const previewSteps = ['Space', 'Plants', 'Kit', 'Details', 'Review'];

const perks = [
  { icon: Leaf, title: 'Personalized for you', text: 'Built around your space and crops.' },
  { icon: BadgePercent, title: 'Early-bird pricing', text: 'Lock launch pricing today.' },
  { icon: Truck, title: 'Priority shipping', text: 'First in line when kits ship.' },
];

export function PrebookCTA() {
  const router = useRouter();
  const reduce = useReducedMotion();

  return (
    <section id="prebook" className="section relative overflow-hidden bg-gradient-to-b from-amber-pale/60 via-white to-green-paler/60">
      <OrganicBackdrop density="low" tone="warm" />
      <div className="relative container-main">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <ScrollReveal>
            <span className="inline-flex items-center gap-2 rounded-full bg-green-pale px-4 py-1.5 text-sm font-medium text-green-primary">
              <Sparkles className="h-4 w-4" aria-hidden="true" />
              Early Access
            </span>
            <h2 className="section-title mt-4">Be Among the First to Grow</h2>
            <p className="section-subtitle">
              Build your custom kit and reserve it before launch.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button
                variant="prebook"
                size="xl"
                rightIcon={<ArrowRight className="h-5 w-5" />}
                onClick={() => router.push('/prebook')}
              >
                Prebook Your Kit
              </Button>
              <Button variant="outline" size="xl" onClick={() => router.push('/prebook')}>
                How reserving works
              </Button>
            </div>
            <p className="mt-4 text-sm text-green-500">Takes ~2 minutes · No payment now</p>
          </ScrollReveal>

          <ScrollReveal delay={0.12} direction="none" scale={0.97}>
            <div className="rounded-3xl border border-green-100 bg-white/90 p-6 shadow-lg backdrop-blur-sm sm:p-8">
              <p className="text-xs font-semibold uppercase tracking-widest text-green-500">Your 5-step reservation</p>
              <StaggerContainer className="mt-4 space-y-2.5" staggerDelay={0.06}>
                {previewSteps.map((label, i) => (
                  <StaggerItem key={label}>
                    <div className="flex items-center gap-3 rounded-2xl border border-green-100 bg-green-paler/50 px-4 py-3">
                      <motion.span
                        initial={false}
                        animate={reduce ? {} : { scale: [1, 1.06, 1] }}
                        transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.3 }}
                        className="flex h-8 w-8 items-center justify-center rounded-full bg-green-primary text-xs font-bold text-white"
                        aria-hidden="true"
                      >
                        0{i + 1}
                      </motion.span>
                      <span className="text-sm font-medium text-green-900">{label}</span>
                      {i < previewSteps.length - 1 && <span className="ml-auto text-green-300" aria-hidden="true">→</span>}
                    </div>
                  </StaggerItem>
                ))}
              </StaggerContainer>
              <div className="mt-5 space-y-3 border-t border-green-100 pt-5">
                {perks.map((perk) => (
                  <div key={perk.title} className="flex items-start gap-3">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-green-pale text-green-700">
                      <perk.icon className="h-4 w-4" aria-hidden="true" />
                    </span>
                    <span>
                      <span className="block text-sm font-semibold text-green-950">{perk.title}</span>
                      <span className="block text-sm text-green-600">{perk.text}</span>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
