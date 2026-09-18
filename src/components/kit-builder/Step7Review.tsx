'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useKitBuilder } from './KitBuilderContext';
import { Card, Button } from '@/components/ui';
import { Check, Leaf, Droplets, Sun, Shield, Sparkles, ArrowLeft, ArrowRight, ShoppingBag } from 'lucide-react';
import { clsx } from 'clsx';
import { getKitLineItems, formatINR } from '@/data/products';
import { Product } from '@/types';

const categoryIcons = {
  seeds: Leaf,
  soil: Droplets,
  fertilizer: Sun,
  'pest-protection': Shield,
  accessories: Sparkles,
};

const categoryLabels: Record<Product['category'], string> = {
  seeds: 'Seeds',
  soil: 'Soil',
  fertilizer: 'Nutrition',
  'pest-protection': 'Pest Protection',
  accessories: 'Accessories',
};

const EASE: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];

export function Step7Review() {
  const router = useRouter();
  const { config, totalPrice, kitSizeOption, resetConfig, setStep } = useKitBuilder();
  const lineItems = getKitLineItems(config);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: EASE }}
      className="space-y-6"
    >
      <div>
        <h3 className="text-2xl font-semibold text-green-950">Review Your Kit</h3>
        <p className="mt-1 text-green-600">Everything looks great! Here&apos;s what&apos;s included in your customized kit.</p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <div className="space-y-3">
          {lineItems.length > 0 ? (
            lineItems.map(({ product, quantity, lineTotal }, i) => {
              const Icon = categoryIcons[product.category];
              return (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: Math.min(i * 0.05, 0.3), duration: 0.35, ease: EASE }}
                  className="flex items-center gap-4 rounded-xl border border-green-100 bg-white p-4 transition-colors hover:border-green-200"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-green-50">
                    <Icon className="h-6 w-6 text-green-600" aria-hidden="true" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <h4 className="truncate font-medium text-green-900">{product.name}</h4>
                      <span className="whitespace-nowrap font-semibold text-green-700">{formatINR(lineTotal)}</span>
                    </div>
                    <p className="truncate text-sm text-green-500">
                      {categoryLabels[product.category]} · {product.size}
                      {quantity !== 1 ? ` · ×${quantity}` : ''}
                    </p>
                  </div>
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-green-100 text-green-600" aria-hidden="true">
                    <Check className="h-3.5 w-3.5" />
                  </span>
                </motion.div>
              );
            })
          ) : (
            <div className="py-8 text-center text-green-500">
              <ShoppingBag className="mx-auto mb-3 h-12 w-12 opacity-50" aria-hidden="true" />
              <p>Your kit is empty. Go back and add items.</p>
            </div>
          )}
        </div>

        <Card variant="elevated" padding="lg">
          <h4 className="mb-4 flex items-center gap-2 text-lg font-semibold text-green-950">
            <ShoppingBag className="h-5 w-5" aria-hidden="true" />
            Kit Summary
          </h4>

          <div className="mb-4 space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-green-600">Kit Size</span>
              <span className="font-medium text-green-900">{kitSizeOption.name} ({kitSizeOption.multiplier}x)</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-green-600">Seed varieties</span>
              <span className="font-medium text-green-900">{config.seeds.length}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-green-600">Soil</span>
              <span className="font-medium text-green-900">{config.soil ? 'Included' : 'Not selected'}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-green-600">Nutrition</span>
              <span className="font-medium text-green-900">{config.fertilizer ? 'Included' : 'Not selected'}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-green-600">Pest Protection</span>
              <span className="font-medium text-green-900">{config.pestProtection ? 'Included' : 'Not selected'}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-green-600">Accessories</span>
              <span className="font-medium text-green-900">{config.accessories.length} item{config.accessories.length === 1 ? '' : 's'}</span>
            </div>
          </div>

          <div className="mb-4 border-t border-green-100 pt-4">
            <div className="flex items-center justify-between text-lg">
              <span className="font-semibold text-green-950">Estimated Total</span>
              <motion.span
                key={totalPrice}
                initial={{ opacity: 0.4, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={clsx('text-2xl font-bold text-green-700')}
              >
                {formatINR(totalPrice)}
              </motion.span>
            </div>
            <p className="mt-1 text-sm text-green-500">Includes {kitSizeOption.multiplier}x quantity for {kitSizeOption.name.toLowerCase()} size; accessories at unit price.</p>
          </div>

          <div className="space-y-3">
            <Button
              variant="secondary"
              size="lg"
              fullWidth
              onClick={() => setStep(6)}
              leftIcon={<ArrowLeft className="h-4 w-4" />}
            >
              Customize Again
            </Button>
            <Button
              variant="prebook"
              size="lg"
              fullWidth
              disabled={lineItems.length === 0}
              rightIcon={<ArrowRight className="h-4 w-4" />}
              onClick={() => router.push('/prebook')}
            >
              Prebook This Kit
            </Button>
          </div>

          <p className="mt-4 text-center text-sm text-green-500">
            By prebooking, you&apos;ll be among the first to receive your kit when we launch.
          </p>
        </Card>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="rounded-xl border border-green-200 bg-green-50 p-4 text-center"
      >
        <p className="text-green-700">
          <strong>Ready to grow?</strong> Your personalized kit will be prepared with care and shipped to you.
          Need changes? Click &quot;Customize Again&quot; to modify your selection.
        </p>
      </motion.div>
    </motion.div>
  );
}
