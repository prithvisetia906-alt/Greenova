'use client';

import { motion } from 'framer-motion';
import { useKitBuilder, getProductsByCategory } from './KitBuilderContext';
import { Product } from '@/types';
import { Check, Minus, Leaf, Droplets, Shield, Sun, Sparkles } from 'lucide-react';
import { clsx } from 'clsx';
import { getProductById, getKitSizeMultiplier, formatINR } from '@/data/products';

const categoryIcons = {
  seeds: Leaf,
  soil: Droplets,
  fertilizer: Sun,
  'pest-protection': Shield,
  accessories: Sparkles,
};

const categoryEyebrow: Record<Product['category'], string> = {
  seeds: 'Seeds',
  soil: 'Soil · Growing Medium',
  fertilizer: 'Nutrition · Fertilizer',
  'pest-protection': 'Plant Protection',
  accessories: 'Accessory',
};

const categoryTile: Record<Product['category'], string> = {
  seeds: 'from-green-500 to-green-600',
  soil: 'from-amber-500 to-amber-600',
  fertilizer: 'from-emerald-500 to-emerald-600',
  'pest-protection': 'from-lime-500 to-lime-600',
  accessories: 'from-teal-500 to-teal-600',
};

const categoryLabels = {
  seeds: 'What do you want to grow?',
  soil: 'Choose your soil',
  fertilizer: 'Choose nutrition',
  'pest-protection': 'Choose natural pest protection',
  accessories: 'Add helpful accessories',
};

const categoryDescriptions = {
  seeds: 'Select the seeds you\u2019d like to grow. You can choose multiple varieties.',
  soil: 'Pick the growing medium that suits your plants and space.',
  fertilizer: 'Add organic nutrients for healthy, productive plants.',
  'pest-protection': 'Protect your plants naturally with botanical solutions.',
  accessories: 'Optional tools that make growing easier. Add as many as you like.',
};

const EASE: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];

interface KitProductCardProps {
  product: Product;
  isSelected: boolean;
  onClick: () => void;
  /** Position in the grid, used for staggered entrance. */
  index?: number;
  /** Show the kit-size-adjusted price instead of the unit price. */
  effectivePrice?: number | null;
  quantityNote?: string | null;
}

function KitProductCard({ product, isSelected, onClick, index = 0, effectivePrice = null, quantityNote = null }: KitProductCardProps) {
  const Icon = categoryIcons[product.category as keyof typeof categoryIcons] || Leaf;

  return (
    <motion.button
      onClick={onClick}
      initial={{ opacity: 0, y: 18, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: Math.min(index * 0.05, 0.35), duration: 0.4, ease: EASE }}
      whileHover={{ y: -3 }}
      whileTap={{ scale: 0.98 }}
      aria-pressed={isSelected}
      className={clsx(
        'group relative w-full rounded-2xl border-2 p-4 text-left transition-colors duration-200',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2',
        isSelected
          ? 'border-green-500 bg-green-50 shadow-md'
          : 'border-green-100 bg-white hover:border-green-300 hover:shadow-lg'
      )}
    >
      {/* Category eyebrow */}
      <p className="text-[11px] font-semibold uppercase tracking-widest text-green-500">
        {categoryEyebrow[product.category]}
      </p>

      <div className="mt-2 flex items-start gap-3">
        <motion.span
          animate={isSelected ? { scale: [1, 1.12, 1] } : { scale: 1 }}
          transition={{ duration: 0.35 }}
          className={clsx(
            'flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br text-white shadow-sm',
            categoryTile[product.category]
          )}
          aria-hidden="true"
        >
          <Icon className="h-6 w-6" />
        </motion.span>
        <div className="min-w-0 flex-1">
          <h4 className="font-semibold leading-snug text-green-950">{product.name}</h4>
          <p className="mt-1 text-sm leading-relaxed text-green-600 line-clamp-2">{product.description}</p>
        </div>
        {/* Animated checkmark */}
        <motion.span
          initial={false}
          animate={isSelected ? { scale: 1, opacity: 1 } : { scale: 0.5, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 420, damping: 20 }}
          className={clsx(
            'flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2',
            isSelected ? 'border-green-500 bg-green-500 text-white' : 'border-green-200 text-transparent'
          )}
          aria-hidden="true"
        >
          <Check className="h-3.5 w-3.5" />
        </motion.span>
      </div>

      <div className="mt-3 flex flex-wrap gap-1.5">
        {product.tags.slice(0, 3).map((tag) => (
          <span
            key={tag}
            className={clsx(
              'rounded-full px-2 py-0.5 text-xs',
              isSelected ? 'bg-green-100 text-green-700' : 'bg-green-50 text-green-600'
            )}
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Size + price footer */}
      <div className="mt-3 flex items-center justify-between border-t border-green-100 pt-3">
        <span className="text-xs text-green-500">{product.size}</span>
        <span className="text-right">
          <span className={clsx('text-base font-bold', isSelected ? 'text-green-700' : 'text-green-800')}>
            {formatINR(effectivePrice ?? product.price)}
          </span>
          {quantityNote && (
            <span className="ml-1.5 text-xs font-normal text-green-500">{quantityNote}</span>
          )}
        </span>
      </div>

      {isSelected && (
        <motion.span
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', stiffness: 400, damping: 16 }}
          className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-green-500 shadow text-white"
          aria-hidden="true"
        >
          <Check className="h-3.5 w-3.5" />
        </motion.span>
      )}
    </motion.button>
  );
}

function StepShell({ title, description, children, aside }: { title: string; description: string; children: React.ReactNode; aside?: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: EASE }}
      className="space-y-6"
    >
      <div>
        <h3 className="text-2xl font-semibold text-green-950">{title}</h3>
        <p className="mt-1 text-green-600">{description}</p>
        {aside}
      </div>
      {children}
    </motion.div>
  );
}

export function Step1Seeds() {
  const { config, toggleSeed, selectedItems } = useKitBuilder();
  const seeds = getProductsByCategory('seeds');
  const multiplier = getKitSizeMultiplier(config.kitSize);

  return (
    <StepShell title={categoryLabels.seeds} description={categoryDescriptions.seeds}>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {seeds.map((seed, i) => (
          <KitProductCard
            key={seed.id}
            product={seed}
            index={i}
            isSelected={config.seeds.includes(seed.id)}
            onClick={() => toggleSeed(seed.id)}
            effectivePrice={Math.round(seed.price * multiplier)}
            quantityNote={multiplier !== 1 ? `×${multiplier}` : null}
          />
        ))}
      </div>

      {config.seeds.length > 0 && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="rounded-xl border border-green-200 bg-green-50 p-4 overflow-hidden"
        >
          <h4 className="mb-3 flex items-center gap-2 font-medium text-green-800">
            <Leaf className="h-5 w-5" aria-hidden="true" />
            Selected Seeds ({config.seeds.length})
          </h4>
          <div className="flex flex-wrap gap-2">
            {selectedItems.seeds.map((seed) => (
              <motion.span
                key={seed.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="inline-flex items-center gap-1.5 rounded-full border border-green-200 bg-white px-3 py-1.5 text-sm text-green-700"
              >
                {seed.name}
                <button
                  onClick={() => toggleSeed(seed.id)}
                  className="rounded-full p-0.5 text-green-500 hover:bg-green-100"
                  aria-label={`Remove ${seed.name}`}
                >
                  <Minus className="h-3.5 w-3.5" />
                </button>
              </motion.span>
            ))}
          </div>
        </motion.div>
      )}
    </StepShell>
  );
}

export function Step2Soil() {
  const { config, setSoil } = useKitBuilder();
  const soils = getProductsByCategory('soil');
  const multiplier = getKitSizeMultiplier(config.kitSize);

  return (
    <StepShell title={categoryLabels.soil} description={categoryDescriptions.soil}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4" role="radiogroup" aria-label="Choose your soil">
        {soils.map((soil, i) => (
          <KitProductCard
            key={soil.id}
            product={soil}
            index={i}
            isSelected={config.soil === soil.id}
            onClick={() => setSoil(config.soil === soil.id ? null : soil.id)}
            effectivePrice={Math.round(soil.price * multiplier)}
            quantityNote={multiplier !== 1 ? `×${multiplier}` : null}
          />
        ))}
      </div>

      {config.soil && (
        <SelectionNote icon={<Droplets className="h-5 w-5" aria-hidden="true" />} title="Selected Soil" value={getProductById(config.soil)?.name} />
      )}
    </StepShell>
  );
}

export function Step3Fertilizer() {
  const { config, setFertilizer } = useKitBuilder();
  const fertilizers = getProductsByCategory('fertilizer');
  const multiplier = getKitSizeMultiplier(config.kitSize);

  return (
    <StepShell title={categoryLabels.fertilizer} description={categoryDescriptions.fertilizer}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4" role="radiogroup" aria-label="Choose nutrition">
        {fertilizers.map((fert, i) => (
          <KitProductCard
            key={fert.id}
            product={fert}
            index={i}
            isSelected={config.fertilizer === fert.id}
            onClick={() => setFertilizer(config.fertilizer === fert.id ? null : fert.id)}
            effectivePrice={Math.round(fert.price * multiplier)}
            quantityNote={multiplier !== 1 ? `×${multiplier}` : null}
          />
        ))}
      </div>

      {config.fertilizer && (
        <SelectionNote icon={<Sun className="h-5 w-5" aria-hidden="true" />} title="Selected Nutrition" value={getProductById(config.fertilizer)?.name} />
      )}
    </StepShell>
  );
}

export function Step4PestProtection() {
  const { config, setPestProtection } = useKitBuilder();
  const pestProtections = getProductsByCategory('pest-protection');
  const multiplier = getKitSizeMultiplier(config.kitSize);

  return (
    <StepShell
      title={categoryLabels['pest-protection']}
      description={categoryDescriptions['pest-protection']}
      aside={
        <p className="mt-2 text-sm text-green-500">
          These products help manage pests naturally. They work best when used preventively and as part of integrated plant care.
        </p>
      }
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4" role="radiogroup" aria-label="Choose natural pest protection">
        {pestProtections.map((pest, i) => (
          <KitProductCard
            key={pest.id}
            product={pest}
            index={i}
            isSelected={config.pestProtection === pest.id}
            onClick={() => setPestProtection(config.pestProtection === pest.id ? null : pest.id)}
            effectivePrice={Math.round(pest.price * multiplier)}
            quantityNote={multiplier !== 1 ? `×${multiplier}` : null}
          />
        ))}
      </div>

      {config.pestProtection && (
        <SelectionNote icon={<Shield className="h-5 w-5" aria-hidden="true" />} title="Selected Protection" value={getProductById(config.pestProtection)?.name} />
      )}
    </StepShell>
  );
}

export function Step5Accessories() {
  const { config, toggleAccessory, selectedItems } = useKitBuilder();
  const accessories = getProductsByCategory('accessories');

  return (
    <StepShell
      title={categoryLabels.accessories}
      description={categoryDescriptions.accessories}
      aside={
        <p className="mt-2 text-sm text-green-500">
          {selectedItems.accessories.length === 0
            ? 'Nothing added yet — accessories are charged once, at unit price.'
            : `${selectedItems.accessories.length} added · charged once, at unit price.`}
        </p>
      }
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {accessories.map((acc, i) => (
          <KitProductCard
            key={acc.id}
            product={acc}
            index={i}
            isSelected={config.accessories.includes(acc.id)}
            onClick={() => toggleAccessory(acc.id)}
          />
        ))}
      </div>

      {config.accessories.length > 0 && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="rounded-xl border border-green-200 bg-green-50 p-4 overflow-hidden"
        >
          <h4 className="mb-3 flex items-center gap-2 font-medium text-green-800">
            <Sparkles className="h-5 w-5" aria-hidden="true" />
            Selected Accessories ({config.accessories.length})
          </h4>
          <div className="flex flex-wrap gap-2">
            {selectedItems.accessories.map((acc) => (
              <motion.span
                key={acc.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="inline-flex items-center gap-1.5 rounded-full border border-green-200 bg-white px-3 py-1.5 text-sm text-green-700"
              >
                {acc.name}
                <button
                  onClick={() => toggleAccessory(acc.id)}
                  className="rounded-full p-0.5 text-green-500 hover:bg-green-100"
                  aria-label={`Remove ${acc.name}`}
                >
                  <Minus className="h-3.5 w-3.5" />
                </button>
              </motion.span>
            ))}
          </div>
        </motion.div>
      )}
    </StepShell>
  );
}

export function Step6KitSize() {
  const { config, setKitSize, kitSizeOption, kitSizes } = useKitBuilder();

  return (
    <StepShell title="Choose kit size" description="Select the size that matches your growing space and ambitions.">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4" role="radiogroup" aria-label="Choose kit size">
        {kitSizes.map((size, i) => (
          <motion.button
            key={size.id}
            onClick={() => setKitSize(size.id)}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: Math.min(i * 0.06, 0.24), duration: 0.4, ease: EASE }}
            aria-pressed={config.kitSize === size.id}
            className={clsx(
              'relative rounded-2xl border-2 p-5 text-left transition-colors duration-200',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2',
              config.kitSize === size.id
                ? 'border-green-500 bg-green-50 shadow-md'
                : 'border-green-100 bg-white hover:border-green-300 hover:shadow-lg'
            )}
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.99 }}
          >
            <div className="mb-3 flex items-center gap-3">
              <div className={clsx(
                'flex h-12 w-12 shrink-0 items-center justify-center rounded-xl',
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
            <p className="mb-3 text-sm text-green-600">{size.description}</p>
            <div className="flex flex-wrap gap-1.5">
              {size.suitableFor.map((space) => (
                <span
                  key={space}
                  className={clsx(
                    'rounded-full px-2 py-0.5 text-xs',
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
                transition={{ type: 'spring', stiffness: 400, damping: 16 }}
                className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-green-500 text-white shadow"
                aria-hidden="true"
              >
                <Check className="h-3.5 w-3.5" />
              </motion.div>
            )}
          </motion.button>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: 'auto' }}
        className="overflow-hidden rounded-xl border border-amber-200 bg-amber-50 p-4"
      >
        <h4 className="mb-2 flex items-center gap-2 font-medium text-amber-800">
          <Sparkles className="h-5 w-5" aria-hidden="true" />
          Your Selection: {kitSizeOption.name}
        </h4>
        <p className="text-amber-700">
          {kitSizeOption.description}. Suitable for: {kitSizeOption.suitableFor.join(', ')}
        </p>
      </motion.div>
    </StepShell>
  );
}

function SelectionNote({ icon, title, value }: { icon: React.ReactNode; title: string; value?: string }) {
  if (!value) return null;
  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      className="overflow-hidden rounded-xl border border-green-200 bg-green-50 p-4"
    >
      <h4 className="mb-1 flex items-center gap-2 font-medium text-green-800">
        <span aria-hidden="true">{icon}</span>
        {title}
      </h4>
      <p className="text-green-700">{value}</p>
    </motion.div>
  );
}
