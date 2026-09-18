'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Card } from '@/components/ui';
import { clsx } from 'clsx';

const kitComponents = [
  {
    id: 'seeds',
    label: 'Seed Packets',
    emoji: '🌰',
    description: 'Curated seed varieties chosen for your space and season. High germination rates, non-GMO.',
    color: 'from-green-500 to-green-600',
  },
  {
    id: 'soil',
    label: 'Growing Medium',
    emoji: '🌱',
    description: 'Premium organic potting mixes, cocopeat, or custom blends tailored to your plant selections.',
    color: 'from-amber-500 to-amber-600',
  },
  {
    id: 'fertilizer',
    label: 'Organic Nutrition',
    emoji: '💚',
    description: 'Balanced organic fertilizers — vermicompost, neem cake, or custom NPK blends for your crops.',
    color: 'from-emerald-500 to-emerald-600',
  },
  {
    id: 'protection',
    label: 'Plant Protection',
    emoji: '🛡️',
    description: 'Natural pest management: neem oil, botanical sprays, and preventive care kits.',
    color: 'from-lime-500 to-lime-600',
  },
  {
    id: 'accessories',
    label: 'Growing Accessories',
    emoji: '🔧',
    description: 'Essential tools: grow bags, trowel, pruning shears, watering can, markers, and more.',
    color: 'from-teal-500 to-teal-600',
  },
];

export function WhatsInside() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const { scrollY } = useScroll({ target: ref, offset: ['start start', 'end start'] });

  return (
    <section id="whats-inside" ref={ref} className="section bg-white relative overflow-hidden">
      <div className="absolute inset-0" aria-hidden="true">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-green-100/50 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-100/50 rounded-full blur-3xl" />
      </div>

      <div className="relative container-main">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-100 text-green-700 text-sm font-medium mb-4">
            What's Inside
          </span>
          <h2 className="section-title">What's Inside Your Kit</h2>
          <p className="section-subtitle mx-auto">
            Every component carefully selected to work together for successful growing.
          </p>
        </div>

        <div className="space-y-8 max-w-3xl mx-auto">
          {kitComponents.map((component, index) => {
            const y = useTransform(scrollY, [0, 500 * (index + 1)], [100, 0]);
            const opacity = useTransform(scrollY, [0, 300 * (index + 1)], [0, 1]);
            const scale = useTransform(scrollY, [0, 400 * (index + 1)], [0.8, 1]);

            return (
              <motion.div
                key={component.id}
                style={{ y, opacity, scale }}
                className="relative"
              >
                <motion.div
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: isInView ? 0.1 + index * 0.15 : 0, duration: 0.6 }}
                  className="flex items-start gap-6"
                >
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: isInView ? 0.3 + index * 0.1 : 0, type: 'spring', stiffness: 200, damping: 15 }}
                    className="w-20 h-20 rounded-2xl flex items-center justify-center flex-shrink-0"
                    style={{ background: component.color }}
                  >
                    <span className="text-4xl" aria-hidden="true">{component.emoji}</span>
                  </motion.div>

                  <div className="flex-1 pt-2">
                    <h3 className="text-xl font-semibold text-green-950">{component.label}</h3>
                    <p className="mt-2 text-green-600">{component.description}</p>
                  </div>
                </motion.div>

                {index < kitComponents.length - 1 && (
                  <motion.div
                    className="absolute left-9 top-28 bottom-0 w-px bg-gradient-to-b from-green-200 to-transparent"
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: 1 }}
                    transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
                    style={{ transformOrigin: 'top center' }}
                    aria-hidden="true"
                  />
                )}
              </motion.div>
            );
          })}

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: isInView ? 0.6 : 0, duration: 0.5 }}
            className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-green-50 to-amber-50 border border-green-100 text-center"
          >
            <h3 className="text-xl font-semibold text-green-950 mb-2">Complete Kit, Ready to Grow</h3>
            <p className="text-green-600">
              All components arrive together in eco-friendly packaging with a personalized growing guide.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}