'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui';
import { ArrowRight, Sparkles, Leaf, Droplets, Sun, Shield, CheckCircle } from 'lucide-react';

const floatingLabels = [
  { text: 'Organic Seeds', x: 12, y: 18, delay: 0.3 },
  { text: 'Living Soil', x: 78, y: 12, delay: 0.5 },
  { text: 'Natural Nutrition', x: 85, y: 68, delay: 0.7 },
  { text: 'Plant Protection', x: 8, y: 72, delay: 0.9 },
];

const floatingElements = [
  { type: 'seed', x: 5, y: 30, size: 12, delay: 0 },
  { type: 'leaf', x: 92, y: 25, size: 16, delay: 1 },
  { type: 'sprout', x: 3, y: 65, size: 14, delay: 2 },
  { type: 'seed', x: 88, y: 55, size: 10, delay: 1.5 },
  { type: 'leaf', x: 15, y: 82, size: 18, delay: 2.5 },
  { type: 'sprout', x: 95, y: 75, size: 13, delay: 0.5 },
];

function FloatingElement({ type, x, y, size, delay }: { type: string; x: number; y: number; size: number; delay: number }) {
  const emoji = type === 'seed' ? '🌰' : type === 'leaf' ? '🌿' : '🌱';
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{ left: `${x}%`, top: `${y}%` }}
      initial={{ opacity: 0, scale: 0.5, rotate: -15 }}
      animate={{ 
        opacity: [0.4, 0.7, 0.4], 
        scale: [1, 1.1, 1], 
        rotate: [-15, 10, -15],
        y: [0, -20, 0]
      }}
      transition={{ 
        duration: 8, 
        repeat: Infinity, 
        delay,
        ease: 'easeInOut'
      }}
      aria-hidden="true"
    >
      <span style={{ fontSize: `${size}px` }}>{emoji}</span>
    </motion.div>
  );
}

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-green-pale/50 via-white to-green-pale/30">
      {/* Ambient background glow */}
      <div className="absolute inset-0" aria-hidden="true">
        <div className="absolute top-1/4 left-1/4 w-[384px] h-[384px] bg-green-leaf/15 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-[384px] h-[384px] bg-amber-warm/15 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[288px] h-[288px] bg-green-emerald/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '4s' }} />
      </div>

      {/* Floating organic elements */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {floatingElements.map((el, i) => (
          <FloatingElement key={i} {...el} />
        ))}
      </div>

      <div className="relative container-main py-20 lg:py-28">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center"
        >
          {/* Left: Content */}
          <div className="text-center lg:text-left">
            <motion.span
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200, damping: 15 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-pale text-green-primary text-sm font-medium mb-6"
            >
              <Sparkles className="w-4 h-4" aria-hidden="true" />
              New: Custom Organic Farming Kits
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-display font-medium text-green-deep leading-[1.1] tracking-tight"
            >
              Grow Your Own.<br />
              <span className="gradient-text">Your Way.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="mt-6 text-lg sm:text-xl text-green-600 max-w-xl mx-auto lg:mx-0 leading-relaxed"
            >
              Custom organic farming kits built around what you want to grow — from your first balcony garden to your own small farm.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
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
              transition={{ delay: 0.6, duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="mt-12 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-sm text-green-600"
            >
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-emerald" aria-hidden="true" />
                <span>100% Organic Inputs</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-emerald" aria-hidden="true" />
                <span>Beginner Friendly</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-emerald" aria-hidden="true" />
                <span>Small Space Ready</span>
              </div>
            </motion.div>
          </div>

          {/* Right: Visual */}
          <div className="relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 1, type: 'spring', stiffness: 120, damping: 18 }}
              className="relative aspect-square max-w-lg mx-auto"
            >
              <div className="relative w-full h-full">
                {/* Base surface */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-3/4 h-2 bg-green-200/40 rounded-full blur-md" aria-hidden="true" />
                
                {/* Pot base */}
                <motion.div
                  className="absolute bottom-10 left-1/2 -translate-x-1/2 w-48 h-32 bg-gradient-to-t from-green-700 to-green-500 rounded-t-xl border-4 border-green-800"
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: 1 }}
                  transition={{ delay: 0.6, duration: 0.7, type: 'spring', stiffness: 200, damping: 15 }}
                  style={{ transformOrigin: 'bottom center' }}
                >
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-6 bg-green-200/30 rounded-t" />
                </motion.div>

                {/* Soil layer */}
                <motion.div
                  className="absolute bottom-38 left-1/2 -translate-x-1/2 w-56 h-28 bg-gradient-to-b from-amber-700 to-amber-600 rounded-t-xl border-4 border-amber-800"
                  initial={{ scale: 0, rotate: -3 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.7, duration: 0.7, type: 'spring', stiffness: 200, damping: 15 }}
                >
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-8 bg-amber-300/30 rounded-t" />
                </motion.div>

                {/* Plants */}
                <motion.div
                  className="absolute bottom-56 left-1/2 -translate-x-1/2 w-6 h-6 bg-amber-500 rounded-full"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.8, duration: 0.5, type: 'spring', stiffness: 300, damping: 15 }}
                />

                <motion.div
                  className="absolute bottom-54 left-1/2 -translate-x-1/2 w-8 h-8 bg-green-leaf rounded-full"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.9, duration: 0.5, type: 'spring', stiffness: 300, damping: 15 }}
                />

                <motion.div
                  className="absolute bottom-58 right-1/4 w-5 h-5 bg-green-mint rounded-full"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 1.0, duration: 0.5, type: 'spring', stiffness: 300, damping: 15 }}
                />

                <motion.div
                  className="absolute bottom-52 left-1/4 w-4 h-4 bg-amber-400 rounded-full"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 1.1, duration: 0.5, type: 'spring', stiffness: 300, damping: 15 }}
                />

                <motion.div
                  className="absolute bottom-46 right-1/3 w-6 h-6 bg-green-emerald rounded-full"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 1.2, duration: 0.5, type: 'spring', stiffness: 300, damping: 15 }}
                />

                {/* Glow */}
                <motion.div
                  className="absolute bottom-64 left-1/2 -translate-x-1/2 w-[288px] h-[288px] bg-gradient-to-br from-amber-warm/20 to-green-leaf/20 rounded-full opacity-30 blur-2xl"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 1.3, duration: 1.2, type: 'spring', stiffness: 80, damping: 15 }}
                />

                {/* Floating labels */}
                {floatingLabels.map((label, index) => (
                  <motion.div
                    key={label.text}
                    className="absolute px-3 py-1.5 bg-white/95 backdrop-blur-sm rounded-full text-xs font-medium text-green-700 shadow-lg border border-green-100 whitespace-nowrap"
                    style={{
                      left: `${label.x}%`,
                      top: `${label.y}%`,
                    }}
                    initial={{ opacity: 0, scale: 0.8, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ delay: label.delay + 1.4, duration: 0.5, type: 'spring', stiffness: 300, damping: 20 }}
                  >
                    {label.text}
                  </motion.div>
                ))}

                {/* Scroll indicator dots */}
                <motion.div
                  className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.8 }}
                >
                  {[1, 2, 3, 4].map((i) => (
                    <motion.div
                      key={i}
                      className="w-2 h-2 rounded-full bg-green-300"
                      animate={{ scale: [1, 1.2, 1], opacity: [0.4, 1, 0.4] }}
                      transition={{ duration: 1.8, repeat: Infinity, delay: i * 0.2 }}
                    />
                  ))}
                </motion.div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 0.5 }}
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