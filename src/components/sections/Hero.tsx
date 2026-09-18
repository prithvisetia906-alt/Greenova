'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui';
import { ArrowRight, Sparkles, Leaf, Droplets, Sun, Shield, CheckCircle } from 'lucide-react';
import Image from 'next/image';

const floatingLabels = [
  { text: 'Organic Seeds', x: 15, y: 20, delay: 0.2 },
  { text: 'Healthy Soil', x: 75, y: 15, delay: 0.4 },
  { text: 'Natural Nutrition', x: 85, y: 65, delay: 0.6 },
  { text: 'Plant Protection', x: 10, y: 70, delay: 0.8 },
];

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-green-50 via-white to-green-50/50">
      <div className="absolute inset-0" aria-hidden="true">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-green-200/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-200/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-green-300/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="relative container-main py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center"
        >
          <div className="text-center lg:text-left">
            <motion.span
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200, damping: 15 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-100 text-green-700 text-sm font-medium mb-6"
            >
              <Sparkles className="w-4 h-4" aria-hidden="true" />
              New: Custom Organic Farming Kits
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-display font-medium text-green-950 leading-tight tracking-tight"
            >
              Grow Your Own.<br />
              <span className="gradient-text">Your Way.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="mt-6 text-lg sm:text-xl text-green-600 max-w-xl mx-auto lg:mx-0"
            >
              Custom organic farming kits built around what you want to grow — from your first balcony garden to your own small farm.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="mt-10 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
            >
              <Button size="xl" rightIcon={<ArrowRight className="w-5 h-5" />}>
                Build Your Kit
              </Button>
              <Button variant="outline" size="xl">
                Prebook Now
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="mt-12 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-sm text-green-500"
            >
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" aria-hidden="true" />
                <span>100% Organic Inputs</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" aria-hidden="true" />
                <span>Beginner Friendly</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" aria-hidden="true" />
                <span>Small Space Ready</span>
              </div>
            </motion.div>
          </div>

          <div className="relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.8, type: 'spring', stiffness: 150, damping: 15 }}
              className="relative aspect-square max-w-lg mx-auto"
            >
              <div className="relative w-full h-full">
                <div className="absolute inset-0 bg-gradient-to-br from-green-100/50 to-amber-100/50 rounded-3xl" />
                
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-3/4 h-3 bg-green-200/50 rounded-full blur-md" />
                
                <motion.div
                  className="absolute bottom-12 left-1/2 -translate-x-1/2 w-48 h-32 bg-gradient-to-t from-green-700 to-green-500 rounded-t-xl border-4 border-green-800"
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: 1 }}
                  transition={{ delay: 0.6, duration: 0.6, type: 'spring', stiffness: 200, damping: 15 }}
                  style={{ transformOrigin: 'bottom center' }}
                >
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-6 bg-green-200/40 rounded-t" />
                </motion.div>

                <motion.div
                  className="absolute bottom-40 left-1/2 -translate-x-1/2 w-56 h-28 bg-gradient-to-b from-green-400 to-green-600 rounded-t-xl border-4 border-green-700"
                  initial={{ scale: 0, rotate: -5 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.7, duration: 0.6, type: 'spring', stiffness: 200, damping: 15 }}
                >
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-8 bg-green-200/40 rounded-t" />
                </motion.div>

                <motion.div
                  className="absolute bottom-60 left-1/2 -translate-x-1/2 w-6 h-6 bg-amber-500 rounded-full"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.8, duration: 0.4, type: 'spring', stiffness: 300, damping: 15 }}
                />

                <motion.div
                  className="absolute bottom-58 left-1/2 -translate-x-1/2 w-8 h-8 bg-green-400 rounded-full"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.9, duration: 0.4, type: 'spring', stiffness: 300, damping: 15 }}
                />

                <motion.div
                  className="absolute bottom-62 right-1/4 w-5 h-5 bg-green-300 rounded-full"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 1.0, duration: 0.4, type: 'spring', stiffness: 300, damping: 15 }}
                />

                <motion.div
                  className="absolute bottom-55 left-1/4 w-4 h-4 bg-amber-400 rounded-full"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 1.1, duration: 0.4, type: 'spring', stiffness: 300, damping: 15 }}
                />

                <motion.div
                  className="absolute bottom-48 right-1/3 w-6 h-6 bg-green-500 rounded-full"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 1.2, duration: 0.4, type: 'spring', stiffness: 300, damping: 15 }}
                />

                <motion.div
                  className="absolute bottom-70 left-1/2 -translate-x-1/2 w-72 h-72 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full opacity-20 blur-2xl"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 1.3, duration: 1, type: 'spring', stiffness: 100, damping: 15 }}
                />

                {floatingLabels.map((label, index) => (
                  <motion.div
                    key={label.text}
                    className="absolute px-3 py-1.5 bg-white/90 backdrop-blur-sm rounded-full text-xs font-medium text-green-700 shadow-lg border border-green-100 whitespace-nowrap"
                    style={{
                      left: `${label.x}%`,
                      top: `${label.y}%`,
                    }}
                    initial={{ opacity: 0, scale: 0.8, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ delay: label.delay + 1.4, duration: 0.4, type: 'spring', stiffness: 300, damping: 20 }}
                  >
                    {label.text}
                  </motion.div>
                ))}

                <motion.div
                  className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.5 }}
                >
                  {[1, 2, 3, 4].map((i) => (
                    <motion.div
                      key={i}
                      className="w-2 h-2 rounded-full bg-green-300"
                      animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
                    />
                  ))}
                </motion.div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce"
        aria-hidden="true"
      >
        <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </motion.div>
    </section>
  );
}