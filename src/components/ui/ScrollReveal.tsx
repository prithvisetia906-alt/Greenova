'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { useRef, ReactNode } from 'react';

interface ScrollRevealProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  distance?: number;
  once?: boolean;
  margin?: any;
  className?: string;
  scale?: number;
  triggerOnce?: boolean;
}

const EASE: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];

export function ScrollReveal({
  children,
  delay = 0,
  duration = 0.55,
  direction = 'up',
  distance = 28,
  once = true,
  margin = '-80px',
  className = '',
  scale,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  if (reduce) {
    return <div ref={ref} className={className}>{children}</div>;
  }

  const getInitial = () => {
    const base: Record<string, number> = { opacity: 0 };
    switch (direction) {
      case 'up': return { ...base, y: distance };
      case 'down': return { ...base, y: -distance };
      case 'left': return { ...base, x: distance };
      case 'right': return { ...base, x: -distance };
      case 'none': return scale ? { ...base, scale } : base;
    }
  };

  return (
    <motion.div
      ref={ref}
      initial={getInitial()}
      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
      viewport={{ once, margin }}
      transition={{ duration, delay, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface StaggerContainerProps {
  children: ReactNode;
  delayChildren?: number;
  staggerDelay?: number;
  className?: string;
  direction?: 'vertical' | 'horizontal';
}

export function StaggerContainer({
  children,
  delayChildren = 0.05,
  staggerDelay = 0.07,
  className = '',
}: StaggerContainerProps) {
  const reduce = useReducedMotion();

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: { staggerChildren: staggerDelay, delayChildren },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface StaggerItemProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  variants?: Record<string, any>;
}

export function StaggerItem({
  children,
  delay = 0,
  className = '',
  variants,
}: StaggerItemProps) {
  const reduce = useReducedMotion();

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: 18, scale: 0.99 },
        visible: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: { duration: 0.45, delay, ease: EASE },
        },
        ...variants,
      }}
    >
      {children}
    </motion.div>
  );
}
