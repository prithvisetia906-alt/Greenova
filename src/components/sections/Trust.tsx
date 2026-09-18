'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Card } from '@/components/ui';
import { Shield, Leaf, Sparkles, Sun, Truck, Heart, Check } from 'lucide-react';
import { clsx } from 'clsx';

const trustPoints = [
  {
    icon: Shield,
    title: 'Thoughtfully Selected Inputs',
    description: 'Every product in our kits is chosen for quality, effectiveness, and compatibility with organic growing practices.',
    color: 'from-green-500 to-green-600',
  },
  {
    icon: Leaf,
    title: 'Clear Product Information',
    description: 'We provide detailed specifications, ingredients, and usage guidance so you know exactly what you\'re using.',
    color: 'from-amber-500 to-amber-600',
  },
  {
    icon: Sparkles,
    title: 'Flexible Customization',
    description: 'Build a kit that matches your space, experience level, and what you actually want to grow — no preset bundles.',
    color: 'from-emerald-500 to-emerald-600',
  },
  {
    icon: Sun,
    title: 'Designed for Home Growers',
    description: 'Kits scaled for balconies, terraces, and small farms — not industrial operations. Right-sized quantities, no waste.',
    color: 'from-lime-500 to-lime-600',
  },
  {
    icon: Truck,
    title: 'Beginner-Friendly Kits',
    description: 'Each kit includes a personalized growing guide with step-by-step instructions tailored to your selections.',
    color: 'from-teal-500 to-teal-600',
  },
  {
    icon: Heart,
    title: 'Transparent Practices',
    description: 'No hidden fees, no mystery ingredients. What you see is what you get — with clear pricing at every step.',
    color: 'from-cyan-500 to-cyan-600',
  },
];

export function Trust() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="trust" ref={ref} className="section bg-white">
      <div className="container-main">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-100 text-green-700 text-sm font-medium mb-4">
            <Check className="w-4 h-4" aria-hidden="true" />
            Our Commitment
          </span>
          <h2 className="section-title">Why Growers Trust Greenova</h2>
          <p className="section-subtitle mx-auto">
            We're building a brand on transparency, quality, and making growing accessible to everyone.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trustPoints.map((point, index) => (
            <motion.div
              key={point.title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: isInView ? 0.1 + index * 0.1 : 0, duration: 0.5 }}
            >
              <Card variant="outlined" padding="lg" hover className="h-full border-green-100">
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: isInView ? 0.3 + index * 0.1 : 0, type: 'spring', stiffness: 200, damping: 15 }}
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5"
                  style={{ background: point.color }}
                >
                  <point.icon className="w-7 h-7 text-white" aria-hidden="true" />
                </motion.div>
                <h3 className="text-xl font-semibold text-green-950 mb-3">{point.title}</h3>
                <p className="text-green-600 leading-relaxed">{point.description}</p>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: isInView ? 0.7 : 0, duration: 0.5 }}
          className="mt-16 p-8 rounded-2xl bg-gradient-to-r from-green-50 to-amber-50 border border-green-100 text-center"
        >
          <h3 className="text-xl font-semibold text-green-950 mb-3">A Note on Our Products</h3>
          <p className="text-green-600 max-w-2xl mx-auto">
            We prioritize organic-certified and naturally derived inputs. Product certifications and sourcing details are listed on each product page. 
            We don't make blanket claims about "100% organic" or "chemical-free" — we let the product specifications speak for themselves.
          </p>
        </motion.div>
      </div>
    </section>
  );
}