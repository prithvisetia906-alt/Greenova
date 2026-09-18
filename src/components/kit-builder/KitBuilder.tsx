'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useKitBuilder } from './KitBuilderContext';
import { Step1Seeds, Step2Soil, Step3Fertilizer, Step4PestProtection, Step5KitSize } from './KitBuilderSteps';
import { Step6Review } from './Step6Review';
import { KitPreview, KitPreviewDesktop } from './KitPreview';
import { Button } from '@/components/ui';
import { ArrowLeft, ArrowRight, Check, X, Sparkles } from 'lucide-react';
import { clsx } from 'clsx';

const steps = [
  { id: 1, title: 'Seeds', icon: Sparkles },
  { id: 2, title: 'Soil', icon: Sparkles },
  { id: 3, title: 'Nutrition', icon: Sparkles },
  { id: 4, title: 'Protection', icon: Sparkles },
  { id: 5, title: 'Size', icon: Sparkles },
  { id: 6, title: 'Review', icon: Sparkles },
];

const stepComponents = {
  1: Step1Seeds,
  2: Step2Soil,
  3: Step3Fertilizer,
  4: Step4PestProtection,
  5: Step5KitSize,
  6: Step6Review,
};

export function KitBuilder() {
  const { step, setStep, nextStep, prevStep, canProceed, config, resetConfig, totalPrice } = useKitBuilder();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-[500px] flex items-center justify-center">
        <div className="animate-pulse text-green-400">Loading kit builder...</div>
      </div>
    );
  }

  const CurrentStepComponent = stepComponents[step as keyof typeof stepComponents];

  return (
    <div className="w-full">
      <div className="mb-8 overflow-x-auto pb-4 -mx-4 px-4" role="navigation" aria-label="Kit builder progress">
        <div className="flex items-center min-w-max gap-2 sm:gap-4">
          {steps.map((s, index) => (
            <motion.div
              key={s.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="flex items-center gap-2 sm:gap-3"
            >
              <motion.button
                onClick={() => setStep(s.id)}
                disabled={s.id > step && !canProceed}
                className={clsx(
                  'relative flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full transition-all duration-300',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2',
                  s.id < step
                    ? 'bg-green-500 text-white shadow-md'
                    : s.id === step
                    ? 'bg-green-100 text-green-700 ring-4 ring-green-100'
                    : 'bg-green-50 text-green-400'
                )}
                whileHover={s.id <= step ? { scale: 1.1 } : undefined}
                whileTap={s.id <= step ? { scale: 0.95 } : undefined}
                aria-current={s.id === step ? 'step' : undefined}
                aria-label={`Step ${s.id}: ${s.title}`}
              >
                {s.id < step ? (
                  <Check className="w-5 h-5" aria-hidden="true" />
                ) : (
                  <span className="font-semibold text-lg">{s.id}</span>
                )}
              </motion.button>
              <span className={clsx(
                'hidden sm:block font-medium text-sm',
                s.id <= step ? 'text-green-700' : 'text-green-400'
              )}>
                {s.title}
              </span>
              {index < steps.length - 1 && (
                <motion.div
                  className={clsx(
                    'hidden sm:block h-1 w-16 sm:w-24 rounded-full',
                    s.id < step ? 'bg-green-500' : 'bg-green-100'
                  )}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: s.id < step ? 1 : 0 }}
                  transition={{ delay: 0.3 + index * 0.1, type: 'spring', stiffness: 200, damping: 20 }}
                  style={{ transformOrigin: 'left center' }}
                />
              )}
            </motion.div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: step > (steps[step - 2]?.id || 0) ? 30 : -30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: step > (steps[step - 2]?.id || 0) ? -30 : 30 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="w-full"
            >
              <CurrentStepComponent />
            </motion.div>
          </AnimatePresence>

          <div className="mt-6 flex items-center justify-between gap-4">
            <Button
              variant="outline"
              size="lg"
              onClick={prevStep}
              disabled={step === 1}
              leftIcon={<ArrowLeft className="w-4 h-4" />}
            >
              Back
            </Button>
            <div className="flex-1" />
            {step < 6 ? (
              <Button
                variant="primary"
                size="lg"
                onClick={nextStep}
                disabled={!canProceed}
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                Next Step
              </Button>
            ) : (
              <Button
                variant="ghost"
                size="lg"
                onClick={() => { resetConfig(); setStep(1); }}
              >
                Start Over
              </Button>
            )}
          </div>
        </div>

        <div className="hidden lg:block">
          <div className="sticky top-24">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-full"
            >
              <KitPreviewDesktop />
            </motion.div>
          </div>
        </div>
      </div>

      <div className="lg:hidden mt-6">
        <KitPreview />
      </div>
    </div>
  );
}

export function KitBuilderSection() {
  return (
    <section id="build-your-kit" className="section bg-bg-primary">
      <div className="container-main">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-100 text-green-700 text-sm font-medium mb-4">
            <Sparkles className="w-4 h-4" aria-hidden="true" />
            Interactive Kit Builder
          </span>
          <h2 className="section-title">Build Your Perfect Farming Kit</h2>
          <p className="section-subtitle mx-auto">
            Choose what you want to grow, and we'll assemble everything you need — from seeds and soil to nutrition and natural plant protection.
          </p>
        </div>

        <KitBuilderProvider>
          <KitBuilder />
        </KitBuilderProvider>
      </div>
    </section>
  );
}

import { KitBuilderProvider } from './KitBuilderContext';