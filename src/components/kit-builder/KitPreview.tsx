'use client';

import { motion } from 'framer-motion';
import { useKitBuilder } from './KitBuilderContext';
import { clsx } from 'clsx';
import Image from 'next/image';

const kitItems = [
  { id: 'pot', label: 'Growing Pots', icon: '🪴', baseY: 60, baseX: 50 },
  { id: 'soil', label: 'Soil', icon: '🌱', baseY: 45, baseX: 35 },
  { id: 'seeds', label: 'Seeds', icon: '🌰', baseY: 30, baseX: 65 },
  { id: 'fertilizer', label: 'Fertilizer', icon: '💚', baseY: 25, baseX: 30 },
  { id: 'pest', label: 'Pest Control', icon: '🛡️', baseY: 20, baseX: 70 },
  { id: 'tools', label: 'Tools', icon: '🔧', baseY: 15, baseX: 40 },
];

export function KitPreview() {
  const { config, selectedItems, kitSizeOption, step } = useKitBuilder();

  const hasSeeds = config.seeds.length > 0;
  const hasSoil = !!config.soil;
  const hasFertilizer = !!config.fertilizer;
  const hasPest = !!config.pestProtection;
  const hasAccessories = config.accessories.length > 0;

  const items = [
    { ...kitItems[0], visible: true },
    { ...kitItems[1], visible: hasSoil },
    { ...kitItems[2], visible: hasSeeds },
    { ...kitItems[3], visible: hasFertilizer },
    { ...kitItems[4], visible: hasPest },
    { ...kitItems[5], visible: hasAccessories },
  ];

  return (
    <motion.div
      className="relative w-full aspect-square max-w-xs mx-auto"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, type: 'spring', stiffness: 200, damping: 20 }}
    >
      <div className="relative w-full h-full">
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-3/4 h-2 bg-green-200/50 rounded-full blur-md" aria-hidden="true" />
        
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 w-24 h-16 bg-gradient-to-t from-green-700 to-green-500 rounded-t-lg border-4 border-green-800"
          initial={{ scaleY: 0, opacity: 0 }}
          animate={{ scaleY: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.4, type: 'spring', stiffness: 200, damping: 20 }}
          style={{ transformOrigin: 'bottom center' }}
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-4 bg-green-100/30 rounded-t" />
        </motion.div>

        <motion.div
          className="absolute bottom-20 left-1/2 -translate-x-1/2 w-28 h-24 bg-gradient-to-b from-green-400 to-green-600 rounded-t-lg border-4 border-green-700"
          initial={{ scale: 0, opacity: 0, rotate: -10 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          transition={{ delay: 0.3, duration: 0.5, type: 'spring', stiffness: 200, damping: 15 }}
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-6 bg-green-200/40 rounded-t" />
        </motion.div>

        {items.map((item, index) => (
          <motion.div
            key={item.id}
            className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-center"
            style={{
              bottom: `${item.baseY}%`,
              left: `${item.baseX}%`,
            }}
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={item.visible ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.5, y: 20 }}
            transition={{ delay: 0.4 + index * 0.1, duration: 0.4, type: 'spring', stiffness: 200, damping: 15 }}
          >
            <span className="text-3xl sm:text-4xl drop-shadow-lg" aria-hidden="true">
              {item.icon}
            </span>
            <span className="text-xs font-medium text-green-800 whitespace-nowrap bg-white/80 backdrop-blur-sm px-2 py-0.5 rounded">
              {item.label}
            </span>
          </motion.div>
        ))}

        <motion.div
          className="absolute bottom-36 left-1/2 -translate-x-1/2 w-32 h-32 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full opacity-20 blur-2xl"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.6, duration: 0.8, type: 'spring', stiffness: 100, damping: 15 }}
        />

        <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-green-800 to-transparent" aria-hidden="true" />
      </div>

      <motion.div
        className="mt-6 text-center"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <h3 className="text-xl font-semibold text-green-950">Your {kitSizeOption.name} Kit</h3>
        <p className="mt-1 text-green-600">
          {config.seeds.length} seed variety{config.seeds.length !== 1 ? 'ies' : ''}{hasSoil ? ' • Soil' : ''}{hasFertilizer ? ' • Nutrition' : ''}{hasPest ? ' • Protection' : ''}{hasAccessories ? ' • Tools' : ''}
        </p>
        <p className="mt-2 text-sm text-green-500">
          Step {step} of 7 • {kitSizeOption.multiplier}x quantities
        </p>
      </motion.div>
    </motion.div>
  );
}

export function KitPreviewDesktop() {
  const { config, selectedItems, kitSizeOption, step } = useKitBuilder();

  const hasSeeds = config.seeds.length > 0;
  const hasSoil = !!config.soil;
  const hasFertilizer = !!config.fertilizer;
  const hasPest = !!config.pestProtection;
  const hasAccessories = config.accessories.length > 0;

  const items = [
    { id: 'pot', label: 'Growing Pots', emoji: '🪴', visible: true },
    { id: 'soil', label: 'Soil', emoji: '🌱', visible: hasSoil },
    { id: 'seeds', label: 'Seeds', emoji: '🌰', visible: hasSeeds },
    { id: 'fertilizer', label: 'Fertilizer', emoji: '💚', visible: hasFertilizer },
    { id: 'pest', label: 'Pest Control', emoji: '🛡️', visible: hasPest },
    { id: 'tools', label: 'Tools', emoji: '🔧', visible: hasAccessories },
  ];

  return (
    <motion.div
      className="relative w-full aspect-[4/3] max-w-md mx-auto"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, type: 'spring', stiffness: 200, damping: 20 }}
    >
      <div className="relative w-full h-full bg-gradient-to-b from-green-50/50 to-transparent rounded-2xl border border-green-100 p-6">
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-1/2 h-2 bg-green-200/50 rounded-full blur-md" aria-hidden="true" />
        
        <motion.div
          className="absolute bottom-6 left-1/2 -translate-x-1/2 w-28 h-14 bg-gradient-to-t from-green-700 to-green-500 rounded-t-lg border-4 border-green-800"
          initial={{ scaleY: 0, opacity: 0 }}
          animate={{ scaleY: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.4, type: 'spring', stiffness: 200, damping: 20 }}
          style={{ transformOrigin: 'bottom center' }}
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-4 bg-green-100/30 rounded-t" />
        </motion.div>

        <motion.div
          className="absolute bottom-18 left-1/2 -translate-x-1/2 w-32 h-20 bg-gradient-to-b from-green-400 to-green-600 rounded-t-lg border-4 border-green-700"
          initial={{ scale: 0, opacity: 0, rotate: -5 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          transition={{ delay: 0.3, duration: 0.5, type: 'spring', stiffness: 200, damping: 15 }}
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-6 bg-green-200/40 rounded-t" />
        </motion.div>

        {items.map((item, index) => (
          <motion.div
            key={item.id}
            className="absolute flex flex-col items-center gap-1 text-center"
            style={{
              bottom: `${25 + index * 12}%`,
              left: `${20 + (index % 3) * 25}%`,
            }}
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={item.visible ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.5, y: 20 }}
            transition={{ delay: 0.4 + index * 0.08, duration: 0.4, type: 'spring', stiffness: 200, damping: 15 }}
          >
            <span className="text-4xl drop-shadow-lg" aria-hidden="true">{item.emoji}</span>
            <span className="text-xs font-medium text-green-800 whitespace-nowrap bg-white/90 backdrop-blur-sm px-2 py-0.5 rounded shadow-sm">
              {item.label}
            </span>
          </motion.div>
        ))}

        <motion.div
          className="absolute bottom-30 left-1/2 -translate-x-1/2 w-36 h-36 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full opacity-20 blur-2xl"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.6, duration: 0.8, type: 'spring', stiffness: 100, damping: 15 }}
        />

        <div className="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-green-800 to-transparent rounded-b-2xl" aria-hidden="true" />
      </div>

      <motion.div
        className="mt-6 text-center"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <h3 className="text-xl font-semibold text-green-950">Your {kitSizeOption.name} Kit</h3>
        <p className="mt-1 text-green-600">
          {config.seeds.length} seed variety{config.seeds.length !== 1 ? 'ies' : ''}{hasSoil ? ' • Soil' : ''}{hasFertilizer ? ' • Nutrition' : ''}{hasPest ? ' • Protection' : ''}{hasAccessories ? ' • Tools' : ''}
        </p>
        <p className="mt-2 text-sm text-green-500">
          Step {step} of 7 • {kitSizeOption.multiplier}x quantities
        </p>
      </motion.div>
    </motion.div>
  );
}