'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { clsx } from 'clsx';

const stages = [
  {
    id: 'seed',
    label: 'SEED',
    emoji: '🌰',
    description: 'Your journey begins with a tiny seed full of potential.',
    details: 'High-quality, non-GMO seeds with strong germination rates. Stored properly for viability.',
    color: 'from-amber-500 to-amber-600',
    bgColor: 'bg-amber-50',
    duration: 'Day 0',
  },
  {
    id: 'sprout',
    label: 'SPROUT',
    emoji: '🌱',
    description: 'The first signs of life emerge from the soil.',
    details: 'Cotyledons (seed leaves) appear. Keep soil moist and provide gentle light.',
    color: 'from-lime-500 to-lime-600',
    bgColor: 'bg-lime-50',
    duration: 'Days 3-10',
  },
  {
    id: 'plant',
    label: 'PLANT',
    emoji: '🌿',
    description: 'True leaves develop and the plant grows stronger.',
    details: 'True leaves appear. Begin light feeding. Transplant if needed. Provide support for vining plants.',
    color: 'from-green-500 to-green-600',
    bgColor: 'bg-green-50',
    duration: 'Days 14-45',
  },
  {
    id: 'harvest',
    label: 'HARVEST',
    emoji: '🍅',
    description: 'Enjoy the fruits of your labor — fresh, homegrown produce.',
    details: 'Harvest at peak ripeness for best flavor. Continuous harvest for many varieties.',
    color: 'from-emerald-500 to-emerald-600',
    bgColor: 'bg-emerald-50',
    duration: 'Days 30-120+',
  },
];

export function GrowingJourney() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const { scrollY } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const [activeStage, setActiveStage] = useState(0);

  return (
    <section id="growing-journey" ref={ref} className="section bg-bg-primary relative overflow-hidden">
      <div className="absolute inset-0" aria-hidden="true">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-green-100/50 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-100/50 rounded-full blur-3xl" />
      </div>

      <div className="relative container-main">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-100 text-green-700 text-sm font-medium mb-4">
            Growing Journey
          </span>
          <h2 className="section-title">From Seed to Harvest</h2>
          <p className="section-subtitle mx-auto">
            Watch your plants grow through each stage. Scroll to see the journey unfold.
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 bg-gradient-to-b from-green-200 via-green-300 to-green-200" aria-hidden="true">
            <motion.div
              initial={{ scaleY: 0 }}
              animate={{ scaleY: isInView ? 1 : 0 }}
              transition={{ duration: 1.5, delay: 0.5, ease: 'easeOut' }}
              style={{ transformOrigin: 'top center' }}
              className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-green-500 via-green-400 to-emerald-500"
            />
          </div>

          <div className="space-y-16 relative z-10">
            {stages.map((stage, index) => {
              const y = useTransform(scrollY, [index * 400, index * 400 + 300], [50, -50]);
              const opacity = useTransform(scrollY, [index * 400, index * 400 + 200], [0.3, 1]);
              const scale = useTransform(scrollY, [index * 400, index * 400 + 200], [0.9, 1]);

              return (
                <motion.div
                  key={stage.id}
                  style={{ y, opacity, scale }}
                  className={clsx('relative flex items-start gap-8', index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse')}
                >
                  <motion.div
                    className={clsx('flex-1 lg:w-1/2', index % 2 === 0 ? 'lg:pr-8' : 'lg:pl-8')}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: isInView ? 0.1 + index * 0.15 : 0, duration: 0.6 }}
                  >
                    <div className={clsx('p-6 rounded-2xl text-center lg:text-left', stage.bgColor, 'border', `border-${stage.color.split('-')[1]}-100`)}>
                      <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ delay: isInView ? 0.3 + index * 0.1 : 0, type: 'spring', stiffness: 200, damping: 15 }}
                        className="w-20 h-20 rounded-2xl flex items-center justify-center mb-4 mx-auto lg:mx-0"
                        style={{ background: stage.color }}
                      >
                        <span className="text-4xl" aria-hidden="true">{stage.emoji}</span>
                      </motion.div>
                      <h3 className="text-2xl font-display font-medium text-green-950 mb-2">{stage.label}</h3>
                      <p className="text-green-600 mb-4">{stage.description}</p>
                      <p className="text-sm text-green-500 mb-4"><strong>Timeline:</strong> {stage.duration}</p>
                      <p className="text-sm text-green-500">{stage.details}</p>
                    </div>
                  </motion.div>

                  <motion.div
                    className={clsx('flex-1 lg:w-1/2 flex items-center justify-center', index % 2 === 0 ? 'lg:pl-8' : 'lg:pr-8')}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: isInView ? 0.2 + index * 0.15 : 0, duration: 0.6 }}
                  >
                    <div className="relative w-full max-w-sm aspect-square">
                      <StageVisualization stage={stage} index={index} />
                    </div>
                  </motion.div>

                  <motion.div
                    className="absolute left-1/2 top-20 w-4 h-4 rounded-full -translate-x-1/2"
                    style={{ background: stage.color }}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: isInView ? 0.4 + index * 0.1 : 0, type: 'spring', stiffness: 200, damping: 15 }}
                    aria-hidden="true"
                  />
                </motion.div>
              );
            })}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: isInView ? 0.8 : 0, duration: 0.5 }}
            className="mt-16 text-center"
          >
            <p className="text-green-600 mb-4">Every stage is a milestone. Your kit supports you through all of them.</p>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-6 py-3 rounded-xl font-medium text-green-700 bg-white border border-green-200 hover:bg-green-50 transition-colors"
            >
              Build My Kit →
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function StageVisualization({ stage, index }: { stage: typeof stages[0]; index: number }) {
  const colors = {
    seed: 'from-amber-400 to-amber-600',
    sprout: 'from-lime-400 to-lime-600',
    plant: 'from-green-400 to-green-600',
    harvest: 'from-emerald-400 to-emerald-600',
  };

  return (
    <div className="relative w-full h-full rounded-2xl overflow-hidden" style={{ background: colors[stage.id as keyof typeof colors] }}>
      <div className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
        <span className="text-8xl opacity-30">{stage.emoji}</span>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-white/20 to-transparent" />
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-sm font-medium">
        {stage.label}
      </div>
    </div>
  );
}