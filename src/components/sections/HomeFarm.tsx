'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Card } from '@/components/ui';
import { clsx } from 'clsx';

const useCases = [
  {
    id: 'balcony',
    title: 'BALCONY',
    subtitle: 'Start growing fresh herbs and vegetables in small spaces.',
    description: 'Perfect for apartment dwellers. Our balcony kits fit railings, small floors, and vertical spaces. Grow herbs, leafy greens, and compact vegetables.',
    emoji: '🌿',
    color: 'from-green-400 to-green-500',
    bgColor: 'bg-green-50',
    features: ['Railing planters', 'Vertical growing', 'Compact varieties', '6-8 pots'],
  },
  {
    id: 'terrace',
    title: 'TERRACE',
    subtitle: 'Build a productive home garden with a customized kit.',
    description: 'More space means more variety. Terrace kits support larger containers, trellises, and diverse crops including fruiting vegetables.',
    emoji: '🏡',
    color: 'from-amber-400 to-amber-500',
    bgColor: 'bg-amber-50',
    features: ['Large containers', 'Trellis systems', 'Fruiting vegetables', '12-15 pots'],
  },
  {
    id: 'small-farm',
    title: 'SMALL FARM',
    subtitle: 'Choose larger quantities and inputs for small-scale cultivation.',
    description: 'Scale up with confidence. Small farm kits provide bulk quantities of soil, nutrients, and protection for beds and row planting.',
    emoji: '🚜',
    color: 'from-emerald-400 to-emerald-500',
    bgColor: 'bg-emerald-50',
    features: ['Bulk quantities', 'Bed preparation', 'Row planting', '25+ beds'],
  },
];

export function HomeFarm() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="home-farm" ref={ref} className="section bg-bg-primary">
      <div className="container-main">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-100 text-green-700 text-sm font-medium mb-4">
            From Balcony to Farm
          </span>
          <h2 className="section-title">From Balcony Pots to Small Farms</h2>
          <p className="section-subtitle mx-auto">
            Whether you have a sunny windowsill or acres of land, we have a kit that fits your growing space.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {useCases.map((useCase, index) => (
            <motion.div
              key={useCase.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: isInView ? 0.1 + index * 0.1 : 0, duration: 0.5 }}
            >
              <Card
                variant="elevated"
                padding="none"
                hover
                className={clsx('h-full overflow-hidden relative', useCase.bgColor)}
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <div className="absolute inset-0" style={{ background: useCase.color }} aria-hidden="true">
                    <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/10 to-transparent" />
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
                    <span className="text-8xl opacity-20">{useCase.emoji}</span>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <span className="text-xs font-medium tracking-wider uppercase opacity-90">{useCase.title}</span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-semibold text-green-950 mb-2">{useCase.subtitle}</h3>
                  <p className="text-green-600 mb-4">{useCase.description}</p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {useCase.features.map((feature) => (
                      <span
                        key={feature}
                        className="px-3 py-1 text-xs font-medium bg-white/80 backdrop-blur-sm rounded-full text-green-700 border border-green-100"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-3 px-4 rounded-xl font-medium text-green-700 bg-white border border-green-200 hover:bg-green-50 transition-colors"
                  >
                    Build {useCase.title} Kit →
                  </motion.button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}