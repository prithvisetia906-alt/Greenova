'use client';

import { motion } from 'framer-motion';
import { useKitBuilder, getProductsByCategory } from './KitBuilderContext';
import { Product } from '@/types';
import { Card } from '@/components/ui';
import { Check, Plus, Minus, Leaf, Droplets, Shield, Sun, Sparkles } from 'lucide-react';
import { clsx } from 'clsx';
import Image from 'next/image';
import { getProductById } from '@/data/products';

const categoryIcons = {
  seeds: Leaf,
  soil: Droplets,
  fertilizer: Sun,
  'pest-protection': Shield,
  accessories: Sparkles,
};

const categoryLabels = {
  seeds: 'What do you want to grow?',
  soil: 'Choose your soil',
  fertilizer: 'Choose nutrition',
  'pest-protection': 'Choose natural pest protection',
  accessories: 'Add accessories (optional)',
};

const categoryDescriptions = {
  seeds: 'Select the seeds you\'d like to grow. You can choose multiple varieties.',
  soil: 'Pick the growing medium that suits your plants and space.',
  fertilizer: 'Add organic nutrients for healthy, productive plants.',
  'pest-protection': 'Protect your plants naturally with botanical solutions.',
  accessories: 'Helpful tools to make growing easier and more enjoyable.',
};

interface ProductCardProps {
  product: Product;
  isSelected: boolean;
  onClick: () => void;
  multiple?: boolean;
  showPrice?: boolean;
}

function ProductCard({ product, isSelected, onClick, multiple = false, showPrice = true }: ProductCardProps) {
  const Icon = categoryIcons[product.category as keyof typeof categoryIcons] || Leaf;

  return (
    <motion.button
      onClick={onClick}
      className={clsx(
        'relative w-full p-4 rounded-xl border-2 transition-all duration-300',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500',
        isSelected
          ? 'border-green-500 bg-green-50 shadow-md'
          : 'border-green-100 bg-white hover:border-green-300 hover:shadow-lg'
      )}
      whileHover={{ y: -2, scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      aria-pressed={isSelected}
    >
      <div className="flex items-start gap-4">
        <div className={clsx(
          'w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0',
          isSelected ? 'bg-green-100' : 'bg-green-50'
        )}>
          <Icon className={clsx('w-7 h-7', isSelected ? 'text-green-600' : 'text-green-400')} aria-hidden="true" />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-medium text-green-900 truncate">{product.name}</h4>
          <p className="mt-1 text-sm text-green-600 line-clamp-2">{product.description}</p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {product.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className={clsx(
                  'px-2 py-0.5 text-xs rounded-full',
                  isSelected ? 'bg-green-100 text-green-700' : 'bg-green-50 text-green-600'
                )}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-3">
          {showPrice && (
            <span className={clsx('font-semibold text-green-800', isSelected && 'text-green-600')}>
              ₹{product.price}
            </span>
          )}
          <motion.div
            className={clsx(
              'w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all',
              isSelected ? 'bg-green-500 border-green-500' : 'border-green-300 bg-white'
            )}
            animate={{ scale: isSelected ? 1 : 0 }}
            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
          >
            <Check className="w-3.5 h-3.5 text-white" aria-hidden="true" />
          </motion.div>
        </div>
      </div>
      {isSelected && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-green-500 flex items-center justify-center"
        >
          <Check className="w-3.5 h-3.5 text-white" aria-hidden="true" />
        </motion.div>
      )}
    </motion.button>
  );
}

export function Step1Seeds() {
  const { config, toggleSeed, updateSeeds, selectedItems } = useKitBuilder();
  const seeds = getProductsByCategory('seeds');

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      <div>
        <h3 className="text-2xl font-semibold text-green-950">{categoryLabels.seeds}</h3>
        <p className="mt-1 text-green-600">{categoryDescriptions.seeds}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {seeds.map((seed) => (
          <ProductCard
            key={seed.id}
            product={seed}
            isSelected={config.seeds.includes(seed.id)}
            onClick={() => toggleSeed(seed.id)}
            multiple
          />
        ))}
      </div>

      {config.seeds.length > 0 && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="p-4 rounded-xl bg-green-50 border border-green-200"
        >
          <h4 className="font-medium text-green-800 mb-3 flex items-center gap-2">
            <Leaf className="w-5 h-5" aria-hidden="true" />
            Selected Seeds ({config.seeds.length})
          </h4>
          <div className="flex flex-wrap gap-2">
            {selectedItems.seeds.map((seed) => (
              <motion.span
                key={seed.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-green-200 rounded-full text-sm text-green-700"
              >
                {seed.name}
                <button
                  onClick={() => toggleSeed(seed.id)}
                  className="p-0.5 rounded-full hover:bg-green-100 text-green-500"
                  aria-label={`Remove ${seed.name}`}
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
              </motion.span>
            ))}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}

export function Step2Soil() {
  const { config, setSoil } = useKitBuilder();
  const soils = getProductsByCategory('soil');

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      <div>
        <h3 className="text-2xl font-semibold text-green-950">{categoryLabels.soil}</h3>
        <p className="mt-1 text-green-600">{categoryDescriptions.soil}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {soils.map((soil) => (
          <ProductCard
            key={soil.id}
            product={soil}
            isSelected={config.soil === soil.id}
            onClick={() => setSoil(config.soil === soil.id ? null : soil.id)}
            showPrice
          />
        ))}
      </div>

      {config.soil && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="p-4 rounded-xl bg-green-50 border border-green-200"
        >
          <h4 className="font-medium text-green-800 mb-2 flex items-center gap-2">
            <Droplets className="w-5 h-5" aria-hidden="true" />
            Selected Soil
          </h4>
          <p className="text-green-700">
            {getProductById(config.soil)?.name}
          </p>
        </motion.div>
      )}
    </motion.div>
  );
}

export function Step3Fertilizer() {
  const { config, setFertilizer } = useKitBuilder();
  const fertilizers = getProductsByCategory('fertilizer');

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      <div>
        <h3 className="text-2xl font-semibold text-green-950">{categoryLabels.fertilizer}</h3>
        <p className="mt-1 text-green-600">{categoryDescriptions.fertilizer}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {fertilizers.map((fert) => (
          <ProductCard
            key={fert.id}
            product={fert}
            isSelected={config.fertilizer === fert.id}
            onClick={() => setFertilizer(config.fertilizer === fert.id ? null : fert.id)}
            showPrice
          />
        ))}
      </div>

      {config.fertilizer && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="p-4 rounded-xl bg-green-50 border border-green-200"
        >
          <h4 className="font-medium text-green-800 mb-2 flex items-center gap-2">
            <Sun className="w-5 h-5" aria-hidden="true" />
            Selected Nutrition
          </h4>
          <p className="text-green-700">
            {getProductById(config.fertilizer)?.name}
          </p>
        </motion.div>
      )}
    </motion.div>
  );
}

export function Step4PestProtection() {
  const { config, setPestProtection } = useKitBuilder();
  const pestProtections = getProductsByCategory('pest-protection');

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      <div>
        <h3 className="text-2xl font-semibold text-green-950">{categoryLabels['pest-protection']}</h3>
        <p className="mt-1 text-green-600">{categoryDescriptions['pest-protection']}</p>
        <p className="mt-2 text-sm text-green-500">
          These products help manage pests naturally. They work best when used preventively and as part of integrated plant care.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {pestProtections.map((pest) => (
          <ProductCard
            key={pest.id}
            product={pest}
            isSelected={config.pestProtection === pest.id}
            onClick={() => setPestProtection(config.pestProtection === pest.id ? null : pest.id)}
            showPrice
          />
        ))}
      </div>

      {config.pestProtection && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="p-4 rounded-xl bg-green-50 border border-green-200"
        >
          <h4 className="font-medium text-green-800 mb-2 flex items-center gap-2">
            <Shield className="w-5 h-5" aria-hidden="true" />
            Selected Protection
          </h4>
          <p className="text-green-700">
            {getProductById(config.pestProtection)?.name}
          </p>
        </motion.div>
      )}
    </motion.div>
  );
}

export function Step5KitSize() {
  const { config, setKitSize, kitSizeOption, kitSizes } = useKitBuilder();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      <div>
        <h3 className="text-2xl font-semibold text-green-950">Choose kit size</h3>
        <p className="mt-1 text-green-600">Select the size that matches your growing space and ambitions.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kitSizes.map((size) => (
          <motion.button
            key={size.id}
            onClick={() => setKitSize(size.id)}
            className={clsx(
              'relative p-5 rounded-xl border-2 transition-all duration-300 text-left',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500',
              config.kitSize === size.id
                ? 'border-green-500 bg-green-50 shadow-md'
                : 'border-green-100 bg-white hover:border-green-300 hover:shadow-lg'
            )}
            whileHover={{ y: -2, scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className={clsx(
                'w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0',
                config.kitSize === size.id ? 'bg-green-100' : 'bg-green-50'
              )}>
                <span className={clsx('text-2xl font-bold', config.kitSize === size.id ? 'text-green-600' : 'text-green-400')}>
                  {size.multiplier === 1 ? 'S' : size.multiplier === 2.5 ? 'B' : size.multiplier === 5 ? 'T' : 'F'}
                </span>
              </div>
              <div>
                <h4 className="font-semibold text-green-900">{size.name}</h4>
                <p className="text-sm text-green-600">{size.multiplier}x base quantity</p>
              </div>
            </div>
            <p className="text-sm text-green-600 mb-3">{size.description}</p>
            <div className="flex flex-wrap gap-1.5">
              {size.suitableFor.map((space) => (
                <span
                  key={space}
                  className={clsx(
                    'px-2 py-0.5 text-xs rounded-full',
                    config.kitSize === size.id ? 'bg-green-100 text-green-700' : 'bg-green-50 text-green-600'
                  )}
                >
                  {space}
                </span>
              ))}
            </div>
            {config.kitSize === size.id && (
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-green-500 flex items-center justify-center"
              >
                <Check className="w-3.5 h-3.5 text-white" aria-hidden="true" />
              </motion.div>
            )}
          </motion.button>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: 'auto' }}
        className="p-4 rounded-xl bg-amber-50 border border-amber-200"
      >
        <h4 className="font-medium text-amber-800 mb-2 flex items-center gap-2">
          <Sparkles className="w-5 h-5" aria-hidden="true" />
          Your Selection: {kitSizeOption.name}
        </h4>
        <p className="text-amber-700">
          {kitSizeOption.description}. Suitable for: {kitSizeOption.suitableFor.join(', ')}
        </p>
      </motion.div>
    </motion.div>
  );
}

