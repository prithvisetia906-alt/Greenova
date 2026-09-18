/**
 * Prebook data + backend-ready submission adapter.
 *
 * The reservation is currently captured locally only (no remote storage).
 * To connect a backend later, implement `submitPrebooking` with one of:
 *   - Supabase: supabase.from('prebookings').insert([payload])
 *   - Firebase: addDoc(collection(db, 'prebookings'), payload)
 *   - Formspree: fetch(`https://formspree.io/f/${id}`, { method: 'POST', ... })
 *   - Custom backend: fetch('/api/prebook', { method: 'POST', body: JSON.stringify(payload) })
 * and return `{ ok: true, reference }` on success.
 */

export type GrowingSpaceId = 'balcony' | 'terrace' | 'home-garden' | 'small-farm' | 'other';
export type GrowCategoryId = 'vegetables' | 'herbs' | 'fruits' | 'flowers' | 'microgreens' | 'custom';
export type KitPreferenceId = 'starter' | 'balcony' | 'terrace' | 'small-farm' | 'custom';

export interface PrebookOption {
  id: string;
  label: string;
  description: string;
  icon: string;
}

export interface PrebookDetails {
  name: string;
  email: string;
  phone: string;
  city: string;
  additionalRequirements: string;
  agreeToContact: boolean;
}

export interface PrebookState {
  growingSpace: GrowingSpaceId | '';
  growCategories: GrowCategoryId[];
  kitPreference: KitPreferenceId | '';
  details: PrebookDetails;
}

export interface PrebookPayload extends PrebookDetails {
  growingSpace: GrowingSpaceId;
  growingSpaceLabel: string;
  growCategories: GrowCategoryId[];
  growCategoryLabels: string[];
  kitPreference: KitPreferenceId;
  kitPreferenceLabel: string;
  submittedAt: string;
}

export const TOTAL_STEPS = 5;

export const STEP_META = [
  { id: 1, title: 'Space', hint: 'Where will you grow?' },
  { id: 2, title: 'Plants', hint: 'What will you grow?' },
  { id: 3, title: 'Kit', hint: 'Pick your kit size' },
  { id: 4, title: 'Details', hint: 'Where do we reach you?' },
  { id: 5, title: 'Review', hint: 'Confirm your reservation' },
] as const;

export const growingSpaceOptions: PrebookOption[] = [
  { id: 'balcony', label: 'Balcony', description: 'Railings, small floors and vertical corners', icon: 'building' },
  { id: 'terrace', label: 'Terrace', description: 'Rooftops and open terraces with full sun', icon: 'sun' },
  { id: 'home-garden', label: 'Home Garden', description: 'Backyard beds and kitchen-garden plots', icon: 'home' },
  { id: 'small-farm', label: 'Small Farm', description: 'Larger plots and small-scale cultivation', icon: 'tractor' },
  { id: 'other', label: 'Other', description: 'Windowsill, community plot or something else', icon: 'sprout' },
];

export const growCategoryOptions: PrebookOption[] = [
  { id: 'vegetables', label: 'Vegetables', description: 'Tomato, spinach, carrot and more', icon: 'carrot' },
  { id: 'herbs', label: 'Herbs', description: 'Basil, mint, coriander and more', icon: 'leaf' },
  { id: 'fruits', label: 'Fruits', description: 'Strawberry, dwarf citrus and more', icon: 'apple' },
  { id: 'flowers', label: 'Flowers', description: 'Marigold, companions and pollinators', icon: 'flower' },
  { id: 'microgreens', label: 'Microgreens', description: 'Fast 7–14 day countertop harvests', icon: 'sprout' },
  { id: 'custom', label: 'Custom', description: 'A mix — we will help you choose', icon: 'sparkles' },
];

export const kitPreferenceOptions: PrebookOption[] = [
  { id: 'starter', label: 'Starter', description: '2–3 pots · first-time growers', icon: 'seedling' },
  { id: 'balcony', label: 'Balcony', description: '6–8 pots · compact spaces', icon: 'building' },
  { id: 'terrace', label: 'Terrace', description: '12–15 pots · productive home garden', icon: 'sun' },
  { id: 'small-farm', label: 'Small Farm', description: '25+ beds · bulk quantities', icon: 'tractor' },
  { id: 'custom', label: 'Custom', description: 'Not sure yet — advise me', icon: 'sparkles' },
];

export const initialPrebookState: PrebookState = {
  growingSpace: '',
  growCategories: [],
  kitPreference: '',
  details: {
    name: '',
    email: '',
    phone: '',
    city: '',
    additionalRequirements: '',
    agreeToContact: false,
  },
};

function labelFor(options: PrebookOption[], id: string): string {
  return options.find((o) => o.id === id)?.label ?? id;
}

export function validateStep(step: number, state: PrebookState): Record<string, string> {
  const errors: Record<string, string> = {};
  if (step === 1 && !state.growingSpace) {
    errors.growingSpace = 'Please choose your growing space to continue.';
  }
  if (step === 2 && state.growCategories.length === 0) {
    errors.growCategories = 'Select at least one category — you can pick several.';
  }
  if (step === 3 && !state.kitPreference) {
    errors.kitPreference = 'Please choose a kit preference to continue.';
  }
  if (step === 4) {
    const d = state.details;
    if (!d.name.trim()) errors.name = 'Name is required';
    if (!d.email.trim()) errors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.email)) errors.email = 'Please enter a valid email';
    if (!d.phone.trim()) errors.phone = 'Phone number is required';
    else if (!/^[\d\s\-+()]{10,}$/.test(d.phone)) errors.phone = 'Please enter a valid phone number';
    if (!d.city.trim()) errors.city = 'City is required';
    if (!d.agreeToContact) errors.agreeToContact = 'Please agree so we can contact you about your reservation.';
  }
  return errors;
}

export function buildPayload(state: PrebookState): PrebookPayload {
  return {
    ...state.details,
    name: state.details.name.trim(),
    email: state.details.email.trim(),
    phone: state.details.phone.trim(),
    city: state.details.city.trim(),
    additionalRequirements: state.details.additionalRequirements.trim(),
    growingSpace: state.growingSpace as GrowingSpaceId,
    growingSpaceLabel: labelFor(growingSpaceOptions, state.growingSpace),
    growCategories: state.growCategories,
    growCategoryLabels: state.growCategories.map((id) => labelFor(growCategoryOptions, id)),
    kitPreference: state.kitPreference as KitPreferenceId,
    kitPreferenceLabel: labelFor(kitPreferenceOptions, state.kitPreference),
    submittedAt: new Date().toISOString(),
  };
}

export interface SubmitResult {
  ok: boolean;
  reference: string;
  payload: PrebookPayload;
}

/**
 * Local-only submission. Simulates latency and returns a request reference.
 * Replace the body with a real backend call when one exists — keep the
 * `{ ok, reference, payload }` shape so the UI needs no changes.
 */
export async function submitPrebooking(state: PrebookState): Promise<SubmitResult> {
  const payload = buildPayload(state);

  // BACKEND INTEGRATION POINT — e.g.:
  // const res = await fetch('/api/prebook', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(payload),
  // });
  // if (!res.ok) throw new Error('Submission failed');
  // const { reference } = await res.json();
  // return { ok: true, reference, payload };

  await new Promise((resolve) => setTimeout(resolve, 1400));

  const reference = `GRN-${new Date().getFullYear()}-${Math.random()
    .toString(36)
    .slice(2, 7)
    .toUpperCase()}`;

  if (process.env.NODE_ENV === 'development') {
    // eslint-disable-next-line no-console
    console.info('[Greenova] prebooking captured locally (no backend configured):', payload);
  }

  return { ok: true, reference, payload };
}
