'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Card } from '@/components/ui';
import { Sparkles, Leaf, Sun, Shield, Truck, Heart, Check } from 'lucide-react';
import { clsx } from 'clsx';

const benefits = [
  {
    icon: Sparkles,
    title: 'Customized for You',
    description: 'Every kit is built around what you want to grow, your space, and your experience level.',
    color: 'from-green-500 to-green-600',
    bgColor: 'bg-green-50',
  },
  {
    icon: Leaf,
    title: 'Organic-Focused Inputs',
    description: 'We prioritize organic-certified and naturally derived products for healthier growing.',
    color: 'from-amber-500 to-amber-600',
    bgColor: 'bg-amber-50',
  },
  {
    icon: Sun,
    title: 'Beginner Friendly',
    description: 'No gardening experience needed. Each kit includes clear guidance for success.',
    color: 'from-emerald-500 to-emerald-600',
    bgColor: 'bg-emerald-50',
  },
  {
    icon: Shield,
    title: 'Small-Space Friendly',
    description: 'Kits designed for balconies, terraces, windowsills, and small farms alike.',
    color: 'from-lime-500 to-lime-600',
    bgColor: 'bg-lime-50',
  },
  {
    icon: Truck,
    title: 'Transparent Selection',
    description: 'See exactly what you\'re getting with detailed product info and clear pricing.',
    color: 'from-teal-500 to-teal-600',
    bgColor: 'bg-teal-50',
  },
  {
    icon: Heart,
    title: 'Designed for Better Growing',
    description: 'Products chosen to work together for healthier plants and better harvests.',
    color: 'from-cyan-500 to-cyan-600',
    bgColor: 'bg-cyan-50',
  },
];

export function WhyChooseUs() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="why-choose-us" ref={ref} className="section bg-white">
      <div className="container-main">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-100 text-green-700 text-sm font-medium mb-4">
            <Check className="w-4 h-4" aria-hidden="true" />
            Why Choose Greenova
          </span>
          <h2 className="section-title">Growing Made Simple</h2>
          <p className="section-subtitle mx-auto">
            We believe everyone should be able to grow their own food. Here's how we make it easier.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: isInView ? 0.1 + index * 0.1 : 0, duration: 0.5 }}
            >
              <Card
                variant="outlined"
                padding="lg"
                hover
                className={clsx('h-full', benefit.bgColor, 'border-green-100')}
              >
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: isInView ? 0.3 + index * 0.1 : 0, type: 'spring', stiffness: 200, damping: 15 }}
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5"
                  style={{ background: benefit.color }}
                >
                  <benefit.icon className="w-7 h-7 text-white" aria-hidden="true" />
                </motion.div>
                <h3 className="text-xl font-semibold text-green-950 mb-3">{benefit.title}</h3>
                <p className="text-green-600 leading-relaxed">{benefit.description}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}