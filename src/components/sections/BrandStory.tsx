'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Button } from '@/components/ui';
import { Leaf, Sparkles, Check } from 'lucide-react';
import { clsx } from 'clsx';

const problems = [
  'Which seeds to choose for your space and season',
  'Which soil or growing medium to use',
  'What nutrients your plants actually need',
  'How to protect plants naturally without harsh chemicals',
  'How much of each product you actually need for your space',
];

const solutions = [
  'Curated seed selections matched to your space',
  'Right soil for your chosen plants and containers',
  'Organic fertilizers tailored to your crop needs',
  'Natural pest management that works preventively',
  'Pre-measured quantities — no waste, no guessing',
];

export function BrandStory() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="brand-story" ref={ref} className="section bg-gradient-to-b from-green-50 via-white to-amber-50 relative overflow-hidden">
      <div className="absolute inset-0" aria-hidden="true">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-green-100/50 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-100/50 rounded-full blur-3xl" />
      </div>

      <div className="relative container-main">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: isInView ? 0.1 : 0, duration: 0.6 }}
            className="relative"
          >
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-green-400/20 via-green-200/20 to-amber-200/20" />
              <div className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
                <span className="text-12xl opacity-10">🌱</span>
              </div>
              <div className="absolute bottom-8 left-8 right-8 p-6 bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl">
                <h4 className="font-semibold text-green-950 mb-2">"Growing food shouldn't feel complicated."</h4>
                <p className="text-green-600 text-sm">
                  We started Greenova because we wanted to grow our own food but didn't know where to start. 
                  Now we're making it simple for everyone.
                </p>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: isInView ? 0.4 : 0, duration: 0.5 }}
              className="mt-8 flex flex-wrap items-center justify-center lg:justify-start gap-4"
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/80 backdrop-blur-sm border border-green-100 text-green-700">
                <Leaf className="w-4 h-4" aria-hidden="true" />
                100% Organic Inputs
              </span>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/80 backdrop-blur-sm border border-green-100 text-green-700">
                <Sparkles className="w-4 h-4" aria-hidden="true" />
                Custom Kits
              </span>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/80 backdrop-blur-sm border border-green-100 text-green-700">
                <Check className="w-4 h-4" aria-hidden="true" />
                Beginner Friendly
              </span>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: isInView ? 0.2 : 0, duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-100 text-green-700 text-sm font-medium mb-4">
              <Sparkles className="w-4 h-4" aria-hidden="true" />
              Our Story
            </span>
            <h2 className="section-title mb-6">Growing Food Shouldn't Feel Complicated.</h2>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: isInView ? 0.3 : 0, duration: 0.5 }}
              className="space-y-4 text-green-600 leading-relaxed"
            >
              <p>
                Many of us want to grow our own food — for freshness, for flavor, for the satisfaction of it. 
                But when you actually try to start, the questions pile up:
              </p>
              <ul className="space-y-3 ml-4">
                {problems.map((problem, index) => (
                  <motion.li
                    key={problem}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: isInView ? 0.4 + index * 0.08 : 0 }}
                    className="flex items-start gap-3"
                  >
                    <span className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-green-600" aria-hidden="true" />
                    </span>
                    <span>{problem}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: isInView ? 0.6 : 0, duration: 0.5 }}
              className="mt-6 p-6 rounded-2xl bg-white/80 backdrop-blur-sm border border-green-100"
            >
              <h3 className="text-lg font-semibold text-green-950 mb-4">Our Solution: A Kit That Makes Sense</h3>
              <p className="text-green-600 mb-4">
                We bring the essential components together in one simple experience — customized for what you want to grow.
              </p>
              <ul className="space-y-2">
                {solutions.map((solution, index) => (
                  <motion.li
                    key={solution}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: isInView ? 0.7 + index * 0.08 : 0 }}
                    className="flex items-start gap-3 text-green-600"
                  >
                    <span className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-green-600" aria-hidden="true" />
                    </span>
                    <span>{solution}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: isInView ? 0.9 : 0, duration: 0.5 }}
              className="mt-8"
            >
              <Button size="lg" rightIcon={<Leaf className="w-4 h-4" />}>
                Build My Kit
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}