'use client';

import { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import Link from 'next/link';
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Pencil,
  Leaf,
  Sun,
  Home,
  Tractor,
  Sprout,
  Carrot,
  Apple,
  Flower2,
  Sparkles,
  Building2,
  CheckCircle2,
} from 'lucide-react';
import { Button, Card, Input, Textarea, Checkbox } from '@/components/ui';
import { useToast } from '@/components/ui/Toast';
import { clsx } from 'clsx';
import {
  TOTAL_STEPS,
  STEP_META,
  growingSpaceOptions,
  growCategoryOptions,
  kitPreferenceOptions,
  initialPrebookState,
  validateStep,
  submitPrebooking,
  type GrowCategoryId,
  type PrebookOption,
  type PrebookState,
} from './prebook-data';

const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  building: Building2,
  sun: Sun,
  home: Home,
  tractor: Tractor,
  sprout: Sprout,
  carrot: Carrot,
  leaf: Leaf,
  apple: Apple,
  flower: Flower2,
  sparkles: Sparkles,
  seedling: Sprout,
};

const EASE: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];

export function PrebookFlow() {
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(1);
  const [state, setState] = useState<PrebookState>(initialPrebookState);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [reference, setReference] = useState<string | null>(null);
  const reduce = useReducedMotion();
  const { addToast } = useToast();

  const goTo = (next: number) => {
    setDirection(next > step ? 1 : -1);
    setStep(next);
    setErrors({});
    if (typeof window !== 'undefined') {
      document.getElementById('prebook-step-heading')?.focus();
      window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
    }
  };

  const handleContinue = () => {
    const stepErrors = validateStep(step, state);
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      return;
    }
    if (step < TOTAL_STEPS) goTo(step + 1);
  };

  const handleReserve = async () => {
    const stepErrors = validateStep(4, state);
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      goTo(4);
      return;
    }
    setIsSubmitting(true);
    try {
      const result = await submitPrebooking(state);
      setReference(result.reference);
      addToast({
        type: 'success',
        title: "You're on the list 🌱",
        message: 'Your reservation request was recorded locally.',
      });
    } catch {
      addToast({
        type: 'error',
        title: 'Something went wrong',
        message: 'Please try again in a moment.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const updateDetails = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setState((prev) => ({
      ...prev,
      details: {
        ...prev.details,
        [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
      },
    }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const toggleGrow = (id: GrowCategoryId) => {
    setState((prev) => ({
      ...prev,
      growCategories: prev.growCategories.includes(id)
        ? prev.growCategories.filter((c) => c !== id)
        : [...prev.growCategories, id],
    }));
    if (errors.growCategories) setErrors((prev) => ({ ...prev, growCategories: '' }));
  };

  if (reference) {
    return (
      <Card variant="elevated" padding="lg" className="text-center">
        <motion.div
          initial={reduce ? { opacity: 1 } : { scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 220, damping: 16 }}
          className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-pale"
        >
          <CheckCircle2 className="h-10 w-10 text-green-primary" aria-hidden="true" />
        </motion.div>
        <h2 className="text-3xl sm:text-4xl font-display font-medium text-green-950">You&apos;re on the list.</h2>
        <p className="mt-3 text-lg text-green-600">Your growing journey starts with Greenova.</p>
        <p className="mt-4 inline-block rounded-full bg-green-pale px-4 py-1.5 font-mono text-sm text-green-800">
          Request reference: {reference}
        </p>
        <p className="mt-3 text-sm text-green-500">
          This reservation is saved on this device only for now — no payment needed. We&apos;ll confirm details before launch.
        </p>
        <div className="mt-8">
          <Link href="/">
            <Button variant="primary" size="lg" rightIcon={<ArrowRight className="h-4 w-4" />}>
              Back to Greenova
            </Button>
          </Link>
        </div>
      </Card>
    );
  }

  const meta = STEP_META[step - 1];

  return (
    <div>
      {/* Progress indicator */}
      <nav aria-label="Prebooking progress" className="mb-8">
        <ol className="flex items-start gap-1 sm:gap-2">
          {STEP_META.map((s, i) => {
            const n = i + 1;
            const done = n < step;
            const current = n === step;
            return (
              <li key={s.id} className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <motion.span
                    initial={false}
                    animate={done || current ? { scale: 1 } : { scale: 0.95 }}
                    className={clsx(
                      'flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-full text-sm font-semibold transition-colors',
                      done
                        ? 'bg-green-primary text-white'
                        : current
                          ? 'bg-green-deep text-white ring-4 ring-green-pale'
                          : 'bg-green-100 text-green-500'
                    )}
                    aria-current={current ? 'step' : undefined}
                  >
                    {done ? <Check className="h-4 w-4" aria-hidden="true" /> : <span>0{n}</span>}
                  </motion.span>
                  <div className="hidden sm:block min-w-0">
                    <p className={clsx('truncate text-sm font-medium', current || done ? 'text-green-900' : 'text-green-400')}>
                      {s.title}
                    </p>
                  </div>
                </div>
                <div className="mt-2 h-1 overflow-hidden rounded-full bg-green-100" aria-hidden="true">
                  <motion.div
                    className={clsx('h-full rounded-full', done || current ? 'bg-green-primary' : 'bg-transparent')}
                    initial={false}
                    animate={{ scaleX: done ? 1 : current ? 0.5 : 0 }}
                    style={{ transformOrigin: 'left center' }}
                    transition={{ duration: 0.4, ease: EASE }}
                  />
                </div>
              </li>
            );
          })}
        </ol>
        <p className="mt-3 text-center text-xs font-medium uppercase tracking-widest text-green-500 sm:hidden">
          Step {step} of {TOTAL_STEPS} · {meta.title}
        </p>
      </nav>

      {/* Step panel */}
      <Card variant="elevated" padding="lg">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={step}
            custom={direction}
            initial={reduce ? { opacity: 0 } : { opacity: 0, x: 48 * direction }}
            animate={{ opacity: 1, x: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, x: -48 * direction }}
            transition={{ duration: 0.32, ease: EASE }}
          >
            <p className="text-xs font-semibold uppercase tracking-widest text-green-500">
              Step 0{step} of 0{TOTAL_STEPS} · {meta.hint}
            </p>
            <h2 id="prebook-step-heading" tabIndex={-1} className="mt-1 text-2xl sm:text-3xl font-display font-medium text-green-950 focus:outline-none">
              {step === 1 && 'Where will you grow?'}
              {step === 2 && 'What do you want to grow?'}
              {step === 3 && 'Choose your kit preference'}
              {step === 4 && 'Your details'}
              {step === 5 && 'Review your reservation'}
            </h2>

            <div className="mt-6">
              {step === 1 && (
                <fieldset>
                  <legend className="sr-only">Growing space</legend>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3" role="radiogroup" aria-label="Growing space">
                    {growingSpaceOptions.map((opt, i) => (
                      <OptionCard
                        key={opt.id}
                        option={opt}
                        selected={state.growingSpace === opt.id}
                        onSelect={() => {
                          setState((p) => ({ ...p, growingSpace: opt.id as PrebookState['growingSpace'] }));
                          setErrors({});
                        }}
                        index={i}
                        multi={false}
                      />
                    ))}
                  </div>
                  {errors.growingSpace && <StepError message={errors.growingSpace} />}
                </fieldset>
              )}

              {step === 2 && (
                <fieldset>
                  <legend className="sr-only">What do you want to grow</legend>
                  <p className="mb-4 text-sm text-green-600">Pick as many as you like — we&apos;ll match seeds to your space.</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {growCategoryOptions.map((opt, i) => (
                      <OptionCard
                        key={opt.id}
                        option={opt}
                        selected={state.growCategories.includes(opt.id as GrowCategoryId)}
                        onSelect={() => toggleGrow(opt.id as GrowCategoryId)}
                        index={i}
                        multi
                      />
                    ))}
                  </div>
                  {errors.growCategories && <StepError message={errors.growCategories} />}
                </fieldset>
              )}

              {step === 3 && (
                <fieldset>
                  <legend className="sr-only">Kit preference</legend>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3" role="radiogroup" aria-label="Kit preference">
                    {kitPreferenceOptions.map((opt, i) => (
                      <OptionCard
                        key={opt.id}
                        option={opt}
                        selected={state.kitPreference === opt.id}
                        onSelect={() => {
                          setState((p) => ({ ...p, kitPreference: opt.id as PrebookState['kitPreference'] }));
                          setErrors({});
                        }}
                        index={i}
                        multi={false}
                      />
                    ))}
                  </div>
                  {errors.kitPreference && <StepError message={errors.kitPreference} />}
                </fieldset>
              )}

              {step === 4 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <Input label="Full Name" name="name" value={state.details.name} onChange={updateDetails} error={errors.name} placeholder="Your name" required autoComplete="name" />
                  <Input label="Email" name="email" type="email" value={state.details.email} onChange={updateDetails} error={errors.email} placeholder="you@example.com" required autoComplete="email" />
                  <Input label="Phone" name="phone" type="tel" value={state.details.phone} onChange={updateDetails} error={errors.phone} placeholder="+91 98765 43210" required autoComplete="tel" />
                  <Input label="City" name="city" value={state.details.city} onChange={updateDetails} error={errors.city} placeholder="Your city" required autoComplete="address-level2" />
                  <div className="sm:col-span-2">
                    <Textarea label="Additional Requirements (Optional)" name="additionalRequirements" value={state.details.additionalRequirements} onChange={updateDetails} placeholder="Space size, sunlight, crops you love…" minRows={3} />
                  </div>
                  <div className="sm:col-span-2">
                    <Checkbox
                      label="I agree to be contacted about my prebooking"
                      description="We'll only contact you regarding your reservation and kit delivery."
                      name="agreeToContact"
                      checked={state.details.agreeToContact}
                      onChange={updateDetails}
                      required
                    />
                    {errors.agreeToContact && <StepError message={errors.agreeToContact} />}
                  </div>
                </div>
              )}

              {step === 5 && (
                <ReviewSummary state={state} onEdit={goTo} />
              )}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Nav */}
        <div className="mt-8 flex items-center gap-3 border-t border-green-100 pt-6">
          <Button variant="ghost" size="lg" onClick={() => goTo(Math.max(1, step - 1))} disabled={step === 1 || isSubmitting} leftIcon={<ArrowLeft className="h-4 w-4" />}>
            Back
          </Button>
          <div className="flex-1" />
          {step < TOTAL_STEPS ? (
            <Button variant="primary" size="lg" onClick={handleContinue} rightIcon={<ArrowRight className="h-4 w-4" />}>
              Continue
            </Button>
          ) : (
            <Button variant="prebook" size="lg" onClick={handleReserve} isLoading={isSubmitting}>
              Reserve My Kit
            </Button>
          )}
        </div>
        {step === 5 && (
          <p className="mt-3 text-center text-sm text-green-500">
            No payment now — we confirm details before launch.
          </p>
        )}
      </Card>
    </div>
  );
}

function OptionCard({ option, selected, onSelect, index, multi }: { option: PrebookOption; selected: boolean; onSelect: () => void; index: number; multi: boolean }) {
  const Icon = ICONS[option.icon] ?? Leaf;
  return (
    <motion.button
      type="button"
      onClick={onSelect}
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: Math.min(index * 0.05, 0.25), duration: 0.35, ease: EASE }}
      whileTap={{ scale: 0.98 }}
      aria-pressed={selected}
      className={clsx(
        'relative flex min-h-[76px] items-center gap-4 rounded-2xl border-2 p-4 text-left transition-all duration-200',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2',
        selected
          ? 'border-green-primary bg-green-paler shadow-md'
          : 'border-green-100 bg-white hover:border-green-300 hover:shadow-sm'
      )}
    >
      <span className={clsx('flex h-12 w-12 shrink-0 items-center justify-center rounded-xl transition-colors', selected ? 'bg-green-primary text-white' : 'bg-green-pale text-green-700')}>
        <Icon className="h-6 w-6" aria-hidden="true" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block font-medium text-green-950">{option.label}</span>
        <span className="mt-0.5 block truncate text-sm text-green-600 sm:whitespace-normal">{option.description}</span>
      </span>
      <motion.span
        initial={false}
        animate={selected ? { scale: 1, opacity: 1 } : { scale: 0.6, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 400, damping: 20 }}
        className={clsx(
          'flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2',
          selected ? 'border-green-primary bg-green-primary text-white' : 'border-green-200 text-transparent',
          multi ? 'rounded-lg' : 'rounded-full'
        )}
        aria-hidden="true"
      >
        <Check className="h-3.5 w-3.5" />
      </motion.span>
    </motion.button>
  );
}

function StepError({ message }: { message: string }) {
  return (
    <p className="mt-3 text-sm text-red-600 flex items-center gap-1.5" role="alert">
      <span className="font-bold" aria-hidden="true">!</span> {message}
    </p>
  );
}

function ReviewSummary({ state, onEdit }: { state: PrebookState; onEdit: (step: number) => void }) {
  const rows: { label: string; value: string; editStep: number }[] = [
    {
      label: 'Growing space',
      value: growingSpaceOptions.find((o) => o.id === state.growingSpace)?.label ?? '—',
      editStep: 1,
    },
    {
      label: 'Growing',
      value: state.growCategories.map((id) => growCategoryOptions.find((o) => o.id === id)?.label).filter(Boolean).join(', ') || '—',
      editStep: 2,
    },
    {
      label: 'Kit preference',
      value: kitPreferenceOptions.find((o) => o.id === state.kitPreference)?.label ?? '—',
      editStep: 3,
    },
  ];
  return (
    <div className="space-y-3">
      {rows.map((row) => (
        <motion.div
          key={row.label}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: EASE }}
          className="flex items-center gap-4 rounded-2xl border border-green-100 bg-green-paler/50 p-4"
        >
          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold uppercase tracking-widest text-green-500">{row.label}</p>
            <p className="mt-0.5 font-medium text-green-950">{row.value}</p>
          </div>
          <Button variant="ghost" size="sm" onClick={() => onEdit(row.editStep)} leftIcon={<Pencil className="h-3.5 w-3.5" />} aria-label={`Edit ${row.label}`}>
            Edit
          </Button>
        </motion.div>
      ))}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1, ease: EASE }}
        className="rounded-2xl border border-green-100 bg-white p-4"
      >
        <div className="flex items-center gap-4">
          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold uppercase tracking-widest text-green-500">Contact</p>
            <p className="mt-0.5 font-medium text-green-950">{state.details.name || '—'} · {state.details.city || '—'}</p>
            <p className="text-sm text-green-600">{state.details.email || '—'} · {state.details.phone || '—'}</p>
            {state.details.additionalRequirements.trim() && (
              <p className="mt-1 text-sm text-green-600">“{state.details.additionalRequirements.trim()}”</p>
            )}
          </div>
          <Button variant="ghost" size="sm" onClick={() => onEdit(4)} leftIcon={<Pencil className="h-3.5 w-3.5" />} aria-label="Edit contact details">
            Edit
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
