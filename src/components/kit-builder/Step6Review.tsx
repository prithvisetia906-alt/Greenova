'use client';

import { motion } from 'framer-motion';
import { useKitBuilder } from './KitBuilderContext';
import { Card } from '@/components/ui';
import { Check, X, Leaf, Droplets, Sun, Shield, Sparkles, ArrowLeft, ArrowRight, ShoppingBag } from 'lucide-react';
import { clsx } from 'clsx';
import { Button } from '@/components/ui';
import { getProductById } from '@/data/products';

const categoryIcons = {
  seeds: Leaf,
  soil: Droplets,
  fertilizer: Sun,
  'pest-protection': Shield,
  accessories: Sparkles,
};

const categoryLabels = {
  seeds: 'Seeds',
  soil: 'Soil',
  fertilizer: 'Nutrition',
  'pest-protection': 'Pest Protection',
  accessories: 'Accessories',
};

export function Step6Review() {
  const { config, selectedItems, totalPrice, kitSizeOption, resetConfig, setStep } = useKitBuilder();

  const allItems = [
    ...selectedItems.seeds.map((p) => ({ product: p, category: 'seeds' as const })),
    ...(selectedItems.soil ? [{ product: selectedItems.soil, category: 'soil' as const }] : []),
    ...(selectedItems.fertilizer ? [{ product: selectedItems.fertilizer, category: 'fertilizer' as const }] : []),
    ...(selectedItems.pestProtection ? [{ product: selectedItems.pestProtection, category: 'pest-protection' as const }] : []),
    ...selectedItems.accessories.map((p) => ({ product: p, category: 'accessories' as const })),
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      <div>
        <h3 className="text-2xl font-semibold text-green-950">Review Your Kit</h3>
        <p className="mt-1 text-green-600">Everything looks great! Here's what's included in your customized kit.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          {allItems.length > 0 ? (
            allItems.map(({ product, category }) => {
              const Icon = categoryIcons[category];
              return (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                  className="flex items-center gap-4 p-4 rounded-xl bg-white border border-green-100 hover:border-green-200 transition-colors"
                >
                  <div className={clsx('w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0', 'bg-green-50')}>
                    <Icon className="w-6 h-6 text-green-600" aria-hidden="true" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <h4 className="font-medium text-green-900 truncate">{product.name}</h4>
                      <span className="font-semibold text-green-700 whitespace-nowrap">₹{product.price}</span>
                    </div>
                    <p className="text-sm text-green-500 truncate">{categoryLabels[category]}</p>
                  </div>
                  <span className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                    <Check className="w-3.5 h-3.5" aria-hidden="true" />
                  </span>
                </motion.div>
              );
            })
          ) : (
            <div className="text-center py-8 text-green-500">
              <ShoppingBag className="w-12 h-12 mx-auto mb-3 opacity-50" aria-hidden="true" />
              <p>Your kit is empty. Go back and add items.</p>
            </div>
          )}
        </div>

        <Card variant="elevated" padding="lg" className="sticky top-24">
          <h4 className="text-lg font-semibold text-green-950 mb-4 flex items-center gap-2">
            <ShoppingBag className="w-5 h-5" aria-hidden="true" />
            Kit Summary
          </h4>
          
          <div className="space-y-3 mb-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-green-600">Kit Size</span>
              <span className="font-medium text-green-900">{kitSizeOption.name} ({kitSizeOption.multiplier}x)</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-green-600">Seeds</span>
              <span className="font-medium text-green-900">{selectedItems.seeds.length} selected</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-green-600">Soil</span>
              <span className="font-medium text-green-900">{selectedItems.soil ? 'Included' : 'Not selected'}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-green-600">Nutrition</span>
              <span className="font-medium text-green-900">{selectedItems.fertilizer ? 'Included' : 'Not selected'}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-green-600">Pest Protection</span>
              <span className="font-medium text-green-900">{selectedItems.pestProtection ? 'Included' : 'Not selected'}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-green-600">Accessories</span>
              <span className="font-medium text-green-900">{selectedItems.accessories.length} items</span>
            </div>
          </div>

          <div className="border-t border-green-100 pt-4 mb-4">
            <div className="flex items-center justify-between text-lg">
              <span className="font-semibold text-green-950">Estimated Total</span>
              <motion.span
                className="text-2xl font-bold text-green-700"
                key={totalPrice}
              >
                ₹{totalPrice.toLocaleString()}
              </motion.span>
            </div>
            <p className="text-sm text-green-500 mt-1">Includes {kitSizeOption.multiplier}x quantity for {kitSizeOption.name.toLowerCase()} size</p>
          </div>

          <div className="space-y-3">
            <Button
              variant="secondary"
              size="lg"
              fullWidth
              onClick={() => setStep(5)}
              leftIcon={<ArrowLeft className="w-4 h-4" />}
            >
              Customize Again
            </Button>
            <Button
              variant="prebook"
              size="lg"
              fullWidth
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              Prebook This Kit
            </Button>
          </div>

          <p className="mt-4 text-center text-sm text-green-500">
            By prebooking, you'll be among the first to receive your kit when we launch.
          </p>
        </Card>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="p-4 rounded-xl bg-green-50 border border-green-200 text-center"
      >
        <p className="text-green-700">
          <strong>Ready to grow?</strong> Your personalized kit will be prepared with care and shipped to you.
          Need changes? Click "Customize Again" to modify your selection.
        </p>
      </motion.div>
    </motion.div>
  );
}