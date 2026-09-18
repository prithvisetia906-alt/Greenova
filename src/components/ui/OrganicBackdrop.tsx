'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { clsx } from 'clsx';

interface OrganicBackdropProps {
  className?: string;
  density?: 'low' | 'medium';
  tone?: 'green' | 'warm';
}

function LeafShape({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M12 2C7 7 4 11 4 15a8 8 0 0 0 16 0c0-4-3-8-8-13Z"
        fill="currentColor"
        opacity="0.5"
      />
      <path
        d="M12 6v13"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        opacity="0.7"
      />
    </svg>
  );
}

const LEAVES = [
  { left: '6%', top: '18%', size: 18, color: 'text-green-leaf/40', duration: 9, delay: 0, drift: 14, desktopOnly: false },
  { left: '88%', top: '22%', size: 22, color: 'text-green-emerald/30', duration: 11, delay: 1.2, drift: 18, desktopOnly: false },
  { left: '12%', top: '72%', size: 14, color: 'text-amber-warm/40', duration: 8, delay: 0.6, drift: 12, desktopOnly: true },
  { left: '82%', top: '68%', size: 26, color: 'text-green-mint/30', duration: 12, delay: 2, drift: 20, desktopOnly: true },
  { left: '48%', top: '8%', size: 12, color: 'text-green-leaf/30', duration: 10, delay: 1.6, drift: 10, desktopOnly: true },
  { left: '68%', top: '85%', size: 16, color: 'text-earth-light/50', duration: 9, delay: 0.3, drift: 14, desktopOnly: true },
];

export function OrganicBackdrop({ className, density = 'low', tone = 'green' }: OrganicBackdropProps) {
  const reduce = useReducedMotion();
  const leaves = density === 'low' ? LEAVES.slice(0, 3) : LEAVES;

  return (
    <div className={clsx('absolute inset-0 overflow-hidden pointer-events-none', className)} aria-hidden="true">
      {/* Soft gradient blobs — pure CSS, GPU cheap */}
      <div
        className={clsx(
          'absolute -top-24 -left-24 w-[320px] h-[320px] rounded-full blur-3xl animate-pulse-slow',
          tone === 'green' ? 'bg-green-leaf/10' : 'bg-amber-warm/10'
        )}
      />
      <div
        className="absolute -bottom-28 -right-24 w-[360px] h-[360px] rounded-full blur-3xl animate-pulse-slow bg-green-emerald/10"
        style={{ animationDelay: '2s' }}
      />

      {/* Floating leaves — transform/opacity only */}
      {leaves.map((leaf, i) => (
        <motion.div
          key={i}
          className={clsx('absolute', leaf.desktopOnly && 'hidden sm:block')}
          style={{ left: leaf.left, top: leaf.top, width: leaf.size, height: leaf.size }}
          initial={reduce ? { opacity: 0.4 } : { opacity: 0 }}
          animate={
            reduce
              ? { opacity: 0.4 }
              : { opacity: [0.35, 0.7, 0.35], y: [0, -leaf.drift, 0], rotate: [-8, 8, -8] }
          }
          transition={
            reduce
              ? { duration: 0.3 }
              : { duration: leaf.duration, repeat: Infinity, delay: leaf.delay, ease: 'easeInOut' }
          }
        >
          <LeafShape className={clsx('w-full h-full', leaf.color)} />
        </motion.div>
      ))}
    </div>
  );
}
