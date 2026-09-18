'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Card } from '@/components/ui';
import { Leaf, Box, Truck, Sun, Check } from 'lucide-react';
import { clsx } from 'clsx';

const steps = [
  {
    number: '01',
    title: 'Choose What You Grow',
    description: 'Select the plants you want to grow from our curated selection of vegetables, herbs, fruits, and flowers.',
    icon: Leaf,
    color: 'from-green-500 to-green-600',
    bgColor: 'bg-green-50',
    borderColor: 'border-green-100',
  },
  {
    number: '02',
    title: 'Customize Your Kit',
    description: 'Choose your soil, nutrition, and plant protection. We help you pick the right products for your selections.',
    icon: Box,
    color: 'from-amber-500 to-amber-600',
    bgColor: 'bg-amber-50',
    borderColor: 'border-amber-100',
  },
  {
    number: '03',
    title: 'Prebook Your Kit',
    description: 'Reserve your customized kit before launch. Be among the first to receive your personalized farming kit.',
    icon: Truck,
    color: 'from-emerald-500 to-emerald-600',
    bgColor: 'bg-emerald-50',
    borderColor: 'border-emerald-100',
  },
  {
    number: '04',
    title: 'Start Growing',
    description: 'Receive your kit and start your growing journey. We provide guidance every step of the way.',
    icon: Sun,
    color: 'from-lime-500 to-lime-600',
    bgColor: 'bg-lime-50',
    borderColor: 'border-lime-100',
  },
];

export function HowItWorks() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="how-it-works" ref={ref} className="section bg-white">
      <div className="container-main">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-100 text-green-700 text-sm font-medium mb-4">
            <Check className="w-4 h-4" aria-hidden="true" />
            How It Works
          </span>
          <h2 className="section-title">Four Steps to Your Harvest</h2>
          <p className="section-subtitle mx-auto">
            We've made it simple to start growing. Follow these four steps and you'll be harvesting your own food in no time.
          </p>
        </div>

        <div className="relative">
          <div className="hidden lg:block absolute left-1/2 top-16 bottom-16 w-px bg-gradient-to-b from-green-200 via-green-300 to-green-200" aria-hidden="true">
            <motion.div
              initial={{ scaleY: 0 }}
              animate={{ scaleY: isInView ? 1 : 0 }}
              transition={{ duration: 1.5, delay: 0.5, ease: 'easeOut' }}
              style={{ transformOrigin: 'top center' }}
              className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-green-500 via-green-400 to-amber-500"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: isInView ? 0.2 + index * 0.15 : 0, duration: 0.5 }}
                className="relative"
              >
                <Card
                  variant="outlined"
                  padding="lg"
                  hover
                  className={clsx('h-full relative', step.bgColor, step.borderColor)}
                >
                  <div className="relative">
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ delay: 0.3 + index * 0.1, type: 'spring', stiffness: 200, damping: 15 }}
                      className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6"
                      style={{ background: step.color }}
                    >
                      <step.icon className="w-8 h-8 text-white" aria-hidden="true" />
                    </motion.div>

                    <div className="mb-4">
                      <span className="text-3xl font-display font-bold text-green-950">{step.number}</span>
                      <span className="ml-2 text-lg font-medium text-green-600">/04</span>
                    </div>

                    <h3 className="text-xl font-semibold text-green-950 mb-3">{step.title}</h3>
                    <p className="text-green-600 leading-relaxed">{step.description}</p>
                  </div>
                </Card>

                {index < steps.length - 1 && (
                  <motion.div
                    className="hidden lg:block absolute right-[-8%] top-20 w-16 h-px bg-green-100"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: isInView ? 1 : 0 }}
                    transition={{ delay: 0.6 + index * 0.15, duration: 0.5 }}
                    style={{ transformOrigin: 'left center' }}
                  />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}