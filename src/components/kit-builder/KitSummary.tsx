'use client';

import { useRouter } from 'next/navigation';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { useKitBuilder } from './KitBuilderContext';
import { Card, Button } from '@/components/ui';
import { Check, X, Leaf, Droplets, Sun, Shield, Sparkles, ShoppingBag, ArrowRight } from 'lucide-react';
import { clsx } from 'clsx';
import { getKitLineItems, formatINR } from '@/data/products';
import { Product } from '@/types';

const categoryMeta: Record<Product['category'], { icon: typeof Leaf; label: string; tile: string }> = {
  seeds: { icon: Leaf, label: 'Seeds', tile: 'from-green-500 to-green-600' },
  soil: { icon: Droplets, label: 'Soil', tile: 'from-amber-500 to-amber-600' },
  fertilizer: { icon: Sun, label: 'Nutrition', tile: 'from-emerald-500 to-emerald-600' },
  'pest-protection': { icon: Shield, label: 'Protection', tile: 'from-lime-500 to-lime-600' },
  accessories: { icon: Sparkles, label: 'Accessory', tile: 'from-teal-500 to-teal-600' },
};

const EASE: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];

function removeItem(
  product: Product,
  actions: {
    toggleSeed: (id: string) => void;
    setSoil: (id: string | null) => void;
    setFertilizer: (id: string | null) => void;
    setPestProtection: (id: string | null) => void;
    toggleAccessory: (id: string) => void;
  }
) {
  switch (product.category) {
    case 'seeds':
      actions.toggleSeed(product.id);
      break;
    case 'soil':
      actions.setSoil(null);
      break;
    case 'fertilizer':
      actions.setFertilizer(null);
      break;
    case 'pest-protection':
      actions.setPestProtection(null);
      break;
    case 'accessories':
      actions.toggleAccessory(product.id);
      break;
  }
}

export function KitSummary() {
  const router = useRouter();
  const reduce = useReducedMotion();
  const {
    config,
    toggleSeed,
    setSoil,
    setFertilizer,
    setPestProtection,
    toggleAccessory,
    resetConfig,
    totalPrice,
    kitSizeOption,
    step,
    setStep,
  } = useKitBuilder();

  const lineItems = getKitLineItems(config);
  const itemCount = lineItems.length;
  const filledSlots = [
    config.seeds.length > 0,
    config.soil !== null,
    config.fertilizer !== null,
    config.pestProtection !== null,
    true, // accessories optional
    true, // size always set
  ];
  const progress = filledSlots.filter(Boolean).length / 7;

  return (
    <Card variant="elevated" padding="lg" className="overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between gap-3">
        <h3 className="flex items-center gap-2 text-lg font-semibold text-green-950">
          <ShoppingBag className="h-5 w-5 text-green-600" aria-hidden="true" />
          Your Greenova Kit
        </h3>
        <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
          {kitSizeOption.name} · {kitSizeOption.multiplier}x
        </span>
      </div>

      {/* Compact kit visual — icons pop in as categories are filled */}
      <div className="relative mt-4 overflow-hidden rounded-2xl border border-green-100 bg-gradient-to-b from-green-50/70 to-transparent p-4" aria-hidden="true">
        <div className="flex items-end justify-center gap-2 sm:gap-3">
          {(['seeds', 'soil', 'fertilizer', 'pest-protection', 'accessories'] as const).map((cat) => {
            const meta = categoryMeta[cat];
            const filled =
              cat === 'seeds' ? config.seeds.length > 0
              : cat === 'soil' ? config.soil !== null
              : cat === 'fertilizer' ? config.fertilizer !== null
              : cat === 'pest-protection' ? config.pestProtection !== null
              : config.accessories.length > 0;
            return (
              <motion.div
                key={cat}
                initial={false}
                animate={filled ? { scale: 1, opacity: 1, y: 0 } : { scale: 0.85, opacity: 0.35, y: 6 }}
                transition={{ type: 'spring', stiffness: 320, damping: 20 }}
                className={clsx(
                  'flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br text-white shadow-sm',
                  meta.tile,
                  !filled && 'grayscale'
                )}
                title={meta.label}
              >
                <meta.icon className="h-5 w-5" />
              </motion.div>
            );
          })}
        </div>
        {/* Progress bar */}
        <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-green-100">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-green-500 to-amber-500"
            initial={false}
            animate={{ scaleX: progress }}
            style={{ transformOrigin: 'left center' }}
            transition={{ duration: 0.4, ease: EASE }}
          />
        </div>
        <p className="mt-2 text-center text-xs text-green-500">
          Step {Math.min(step, 7)} of 7 · {itemCount} item{itemCount === 1 ? '' : 's'} in your kit
        </p>
      </div>

      {/* Line items */}
      <div className="mt-4 max-h-64 space-y-2 overflow-y-auto pr-1" aria-live="polite">
        <AnimatePresence initial={false}>
          {lineItems.length === 0 && (
            <motion.p
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="rounded-xl border border-dashed border-green-200 bg-green-50/50 p-4 text-center text-sm text-green-600"
            >
              Nothing selected yet. Pick seeds to start building your kit.
            </motion.p>
          )}
          {lineItems.map(({ product, quantity, lineTotal }) => {
            const meta = categoryMeta[product.category];
            return (
              <motion.div
                key={product.id}
                layout={!reduce}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 12 }}
                transition={{ duration: 0.25, ease: EASE }}
                className="flex items-center gap-3 rounded-xl border border-green-100 bg-white p-2.5"
              >
                <span className={clsx('flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br text-white', meta.tile)} aria-hidden="true">
                  <meta.icon className="h-4 w-4" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-green-900">{product.name}</p>
                  <p className="text-xs text-green-500">
                    {meta.label}
                    {quantity !== 1 ? ` · ×${quantity}` : ''}
                  </p>
                </div>
                <span className="whitespace-nowrap text-sm font-semibold text-green-800">{formatINR(lineTotal)}</span>
                <button
                  onClick={() => removeItem(product, { toggleSeed, setSoil, setFertilizer, setPestProtection, toggleAccessory })}
                  className="rounded-lg p-1.5 text-green-400 transition-colors hover:bg-red-50 hover:text-red-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600"
                  aria-label={`Remove ${product.name} from kit`}
                >
                  <X className="h-4 w-4" aria-hidden="true" />
                </button>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Total */}
      <div className="mt-4 border-t border-green-100 pt-4">
        <div className="flex items-center justify-between">
          <span className="font-semibold text-green-950">Estimated Total</span>
          <motion.span
            key={totalPrice}
            initial={reduce ? { opacity: 1 } : { opacity: 0.4, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="text-2xl font-bold text-green-700"
            aria-live="polite"
          >
            {formatINR(totalPrice)}
          </motion.span>
        </div>
        <p className="mt-1 text-xs text-green-500">
          Seeds, soil, nutrition & protection scale ×{kitSizeOption.multiplier} ({kitSizeOption.name}); accessories at unit price.
        </p>
      </div>

      {/* Actions */}
      <div className="mt-4 space-y-2.5">
        <Button
          variant="prebook"
          size="lg"
          fullWidth
          disabled={itemCount === 0}
          rightIcon={<ArrowRight className="h-4 w-4" />}
          onClick={() => router.push('/prebook')}
        >
          Prebook This Kit
        </Button>
        <div className="flex items-center justify-between">
          <button
            onClick={() => setStep(7)}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-green-600 transition-colors hover:text-green-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2 rounded-lg px-1 py-1"
          >
            <Check className="h-4 w-4" aria-hidden="true" />
            Review kit
          </button>
          <button
            onClick={resetConfig}
            className="text-sm font-medium text-green-400 transition-colors hover:text-red-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2 rounded-lg px-1 py-1"
          >
            Start over
          </button>
        </div>
      </div>
    </Card>
  );
}
