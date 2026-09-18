'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { plants } from '@/data/plants';
import { Card } from '@/components/ui';
import { clsx } from 'clsx';
import { Sun, Droplets, Calendar, Leaf, Check } from 'lucide-react';

const plantCards = [
  { id: 'tomato', name: 'Tomato', emoji: '🍅', category: 'Vegetable' },
  { id: 'spinach', name: 'Spinach', emoji: '🥬', category: 'Vegetable' },
  { id: 'coriander', name: 'Coriander', emoji: '🌿', category: 'Herb' },
  { id: 'lettuce', name: 'Lettuce', emoji: '🥗', category: 'Vegetable' },
  { id: 'chilli', name: 'Chilli', emoji: '🌶️', category: 'Vegetable' },
  { id: 'carrot', name: 'Carrot', emoji: '🥕', category: 'Vegetable' },
  { id: 'radish', name: 'Radish', emoji: '🌰', category: 'Vegetable' },
  { id: 'basil', name: 'Basil', emoji: '🌿', category: 'Herb' },
  { id: 'mint', name: 'Mint', emoji: '🍃', category: 'Herb' },
  { id: 'cucumber', name: 'Cucumber', emoji: '🥒', category: 'Vegetable' },
];

export function PlantSelector() {
  const [selectedPlant, setSelectedPlant] = useState<string | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const plant = selectedPlant ? plants.find(p => p.id === selectedPlant) : null;

  return (
    <section id="plant-selector" ref={ref} className="section bg-white">
      <div className="container-main">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-100 text-green-700 text-sm font-medium mb-4">
            <Leaf className="w-4 h-4" aria-hidden="true" />
            Plant Selector
          </span>
          <h2 className="section-title">What Do You Want to Grow?</h2>
          <p className="section-subtitle mx-auto">
            Explore our curated selection. Click any plant to see growing details and recommended kit components.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mb-12">
          {plantCards.map((plantCard, index) => (
            <motion.button
              key={plantCard.id}
              onClick={() => setSelectedPlant(plantCard.id)}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: isInView ? 0.05 + index * 0.03 : 0, duration: 0.3 }}
              whileHover={{ y: -4, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={clsx(
                'p-4 rounded-xl border-2 text-center transition-all duration-300',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500',
                selectedPlant === plantCard.id
                  ? 'border-green-500 bg-green-50 shadow-md'
                  : 'border-green-100 bg-white hover:border-green-300 hover:shadow-lg'
              )}
              aria-pressed={selectedPlant === plantCard.id}
            >
              <span className="text-3xl mb-2 block" aria-hidden="true">{plantCard.emoji}</span>
              <span className="font-medium text-green-900 block">{plantCard.name}</span>
              <span className="text-xs text-green-500 mt-1 block">{plantCard.category}</span>
              {selectedPlant === plantCard.id && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="mt-2 w-5 h-5 mx-auto rounded-full bg-green-500 flex items-center justify-center"
                >
                  <Check className="w-3 h-3 text-white" aria-hidden="true" />
                </motion.div>
              )}
            </motion.button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {plant && (
            <motion.div
              key={plant.id}
              initial={{ opacity: 0, y: 20, height: 0 }}
              animate={{ opacity: 1, y: 0, height: 'auto' }}
              exit={{ opacity: 0, y: -20, height: 0 }}
              transition={{ duration: 0.3 }}
              className="max-w-3xl mx-auto"
            >
              <Card variant="elevated" padding="lg">
                <div className="flex items-start gap-6">
                  <div className="w-24 h-24 rounded-2xl bg-green-100 flex items-center justify-center flex-shrink-0">
                    <span className="text-5xl" aria-hidden="true">{plantCards.find(p => p.id === plant.id)?.emoji}</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-semibold text-green-950">{plant.name}</h3>
                    <p className="mt-2 text-green-600">{plant.description}</p>

                    <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
                      <InfoItem icon={Leaf} label="Difficulty" value={plant.difficulty.charAt(0).toUpperCase() + plant.difficulty.slice(1)} color="green" />
                      <InfoItem icon={Calendar} label="Growing Time" value={plant.growingDuration} color="amber" />
                      <InfoItem icon={Sun} label="Sun Needs" value={plant.sunRequirements} color="emerald" />
                      <InfoItem icon={Droplets} label="Water Needs" value={plant.waterRequirements} color="teal" />
                    </div>

                    <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="p-4 rounded-xl bg-green-50 border border-green-100">
                        <h4 className="font-medium text-green-900 mb-2 flex items-center gap-2">
                          <Leaf className="w-4 h-4" aria-hidden="true" />
                          Suggested Soil
                        </h4>
                        <ul className="text-sm text-green-600 space-y-1">
                          {plant.suggestedSoil.map((id, i) => (
                            <li key={i} className="flex items-center gap-1">
                              <Check className="w-3.5 h-3.5 text-green-500 flex-shrink-0" />
                              {id.replace('soil-', '').replace('-', ' ')}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="p-4 rounded-xl bg-amber-50 border border-amber-100">
                        <h4 className="font-medium text-green-900 mb-2 flex items-center gap-2">
                          <Sun className="w-4 h-4" aria-hidden="true" />
                          Suggested Nutrition
                        </h4>
                        <ul className="text-sm text-green-600 space-y-1">
                          {plant.suggestedFertilizer.map((id, i) => (
                            <li key={i} className="flex items-center gap-1">
                              <Check className="w-3.5 h-3.5 text-green-500 flex-shrink-0" />
                              {id.replace('fert-', '').replace('-', ' ')}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-100">
                        <h4 className="font-medium text-green-900 mb-2 flex items-center gap-2">
                          <Calendar className="w-4 h-4" aria-hidden="true" />
                          Suggested Kit Size
                        </h4>
                        <ul className="text-sm text-green-600 space-y-1">
                          {plant.suggestedKitSize.map((size, i) => (
                            <li key={i} className="flex items-center gap-1">
                              <Check className="w-3.5 h-3.5 text-green-500 flex-shrink-0" />
                              {size.charAt(0).toUpperCase() + size.slice(1)}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="mt-4 p-3 rounded-lg bg-green-50 border border-green-100 text-sm text-green-600">
                      <strong>Note:</strong> Growing times and requirements are approximate and may vary based on your local climate, season, and growing conditions.
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {!plant && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12 text-green-500"
          >
            <Leaf className="w-12 h-12 mx-auto mb-4 opacity-50" aria-hidden="true" />
            <p>Click a plant above to see detailed growing information.</p>
          </motion.div>
        )}
      </div>
    </section>
  );
}

function InfoItem({ icon: Icon, label, value, color }: { icon: React.ElementType; label: string; value: string; color: string }) {
  return (
    <div className="p-3 rounded-xl bg-white border border-green-100">
      <div className="flex items-center gap-2 mb-1">
        <Icon className={clsx('w-4 h-4', `text-${color}-500`)} aria-hidden="true" />
        <span className="text-xs font-medium text-green-500 uppercase tracking-wider">{label}</span>
      </div>
      <p className="text-sm text-green-800 font-medium">{value}</p>
    </div>
  );
}