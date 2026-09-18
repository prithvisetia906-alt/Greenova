'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { useKitBuilder } from './KitBuilderContext';
import { Step1Seeds, Step2Soil, Step3Fertilizer, Step4PestProtection, Step5Accessories, Step6KitSize } from './KitBuilderSteps';
import { Step7Review } from './Step7Review';
import { KitSummary } from './KitSummary';
import { Button } from '@/components/ui';
import { ArrowLeft, ArrowRight, Check, Sparkles } from 'lucide-react';
import { clsx } from 'clsx';

const steps = [
  { id: 1, title: 'Seeds' },
  { id: 2, title: 'Soil' },
  { id: 3, title: 'Nutrition' },
  { id: 4, title: 'Protection' },
  { id: 5, title: 'Extras' },
  { id: 6, title: 'Size' },
  { id: 7, title: 'Review' },
];

const stepComponents = {
  1: Step1Seeds,
  2: Step2Soil,
  3: Step3Fertilizer,
  4: Step4PestProtection,
  5: Step5Accessories,
  6: Step6KitSize,
  7: Step7Review,
};

const EASE: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];

export function KitBuilder() {
  const { step, setStep, nextStep, prevStep, canProceed, resetConfig } = useKitBuilder();
  const [mounted, setMounted] = useState(false);
  const prevStepRef = useRef(1);
  const reduce = useReducedMotion();

  useEffect(() => {
    setMounted(true);
  }, []);

  const direction = step >= prevStepRef.current ? 1 : -1;

  const goToStep = (id: number) => {
    prevStepRef.current = step;
    setStep(id);
  };

  if (!mounted) {
    return (
      <div className="flex min-h-[500px] items-center justify-center">
        <div className="animate-pulse text-green-400">Loading kit builder...</div>
      </div>
    );
  }

  const CurrentStepComponent = stepComponents[step as keyof typeof stepComponents];

  return (
    <div className="w-full">
      {/* Progress rail */}
      <div className="mb-8 overflow-x-auto pb-4 -mx-4 px-4" role="navigation" aria-label="Kit builder progress">
        <div className="flex min-w-max items-center gap-2 sm:gap-3">
          {steps.map((s, index) => (
            <motion.div
              key={s.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.04, duration: 0.35, ease: EASE }}
              className="flex items-center gap-2 sm:gap-3"
            >
              <motion.button
                onClick={() => goToStep(s.id)}
                disabled={s.id > step && !canProceed}
                className={clsx(
                  'relative flex h-10 w-10 items-center justify-center rounded-full transition-all duration-300 sm:h-12 sm:w-12',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2',
                  s.id < step
                    ? 'bg-green-600 text-white shadow-md'
                    : s.id === step
                    ? 'bg-green-100 text-green-700 ring-4 ring-green-100'
                    : 'bg-green-50 text-green-400'
                )}
                whileHover={s.id <= step ? { scale: 1.08 } : undefined}
                whileTap={s.id <= step ? { scale: 0.95 } : undefined}
                aria-current={s.id === step ? 'step' : undefined}
                aria-label={`Step ${s.id}: ${s.title}`}
              >
                {s.id < step ? (
                  <Check className="h-5 w-5" aria-hidden="true" />
                ) : (
                  <span className="text-lg font-semibold">{s.id}</span>
                )}
              </motion.button>
              <span className={clsx(
                'hidden font-medium text-sm md:block',
                s.id <= step ? 'text-green-700' : 'text-green-400'
              )}>
                {s.title}
              </span>
              {index < steps.length - 1 && (
                <div
                  className={clsx(
                    'hidden h-1 w-10 rounded-full transition-colors duration-500 md:block lg:w-14',
                    s.id < step ? 'bg-green-500' : 'bg-green-100'
                  )}
                  aria-hidden="true"
                />
              )}
            </motion.div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
        {/* LEFT: configuration controls */}
        <div className="lg:col-span-3">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={step}
              custom={direction}
              initial={reduce ? { opacity: 0 } : { opacity: 0, x: 32 * direction }}
              animate={{ opacity: 1, x: 0 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, x: -32 * direction }}
              transition={{ duration: 0.3, ease: EASE }}
              className="w-full"
              onAnimationComplete={() => { prevStepRef.current = step; }}
            >
              <CurrentStepComponent />
            </motion.div>
          </AnimatePresence>

          <div className="mt-6 flex items-center justify-between gap-4">
            <Button
              variant="outline"
              size="lg"
              onClick={() => { prevStepRef.current = step; prevStep(); }}
              disabled={step === 1}
              leftIcon={<ArrowLeft className="h-4 w-4" />}
            >
              Back
            </Button>
            <div className="flex-1" />
            {step < 7 ? (
              <Button
                variant="primary"
                size="lg"
                onClick={() => { prevStepRef.current = step; nextStep(); }}
                disabled={!canProceed}
                rightIcon={<ArrowRight className="h-4 w-4" />}
              >
                Next Step
              </Button>
            ) : (
              <Button
                variant="ghost"
                size="lg"
                onClick={() => { resetConfig(); prevStepRef.current = 7; setStep(1); }}
              >
                Start Over
              </Button>
            )}
          </div>

          {/* Mobile live summary underneath controls */}
          <div className="mt-8 lg:hidden">
            <KitSummary />
          </div>
        </div>

        {/* RIGHT: live kit preview (desktop) */}
        <div className="hidden lg:col-span-2 lg:block">
          <div className="sticky top-24">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: EASE }}
              className="w-full"
            >
              <KitSummary />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function KitBuilderSection() {
  return (
    <section id="build-your-kit" className="section bg-bg-primary">
      <div className="container-main">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-green-100 px-4 py-1.5 text-sm font-medium text-green-700">
            <Sparkles className="h-4 w-4" aria-hidden="true" />
            Interactive Kit Builder
          </span>
          <h2 className="section-title">Build Your Perfect Farming Kit</h2>
          <p className="section-subtitle mx-auto">
            Choose what you want to grow, and we&apos;ll assemble everything you need — from seeds and soil to nutrition and natural plant protection.
          </p>
        </div>

        <KitBuilder />
      </div>
    </section>
  );
}
