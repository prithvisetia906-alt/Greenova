'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Button } from '@/components/ui';
import { Input, Textarea, Select, Checkbox, Card } from '@/components/ui';
import { CheckCircle, Sparkles, Mail, Phone, MapPin, Leaf } from 'lucide-react';
import { clsx } from 'clsx';
import { toast } from '@/components/ui/Toast';

const growingSpaces = [
  { value: 'windowsill', label: 'Windowsill / Kitchen Counter' },
  { value: 'balcony', label: 'Balcony' },
  { value: 'terrace', label: 'Terrace / Rooftop' },
  { value: 'small-farm', label: 'Small Farm / Community Garden' },
  { value: 'indoor', label: 'Indoor / Grow Lights' },
];

const kitOptions = [
  { value: 'starter', label: 'Starter Kit (2-3 pots)' },
  { value: 'balcony', label: 'Balcony Kit (6-8 pots)' },
  { value: 'terrace', label: 'Terrace Kit (12-15 pots)' },
  { value: 'small-farm', label: 'Small Farm Kit (25+ beds)' },
];

export function Prebooking() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    city: '',
    growingSpace: '',
    whatToGrow: '',
    preferredKit: '',
    additionalRequirements: '',
    agreeToContact: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Please enter a valid email';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    else if (!/^[\d\s\-\+\(\)]{10,}$/.test(formData.phone)) newErrors.phone = 'Please enter a valid phone number';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.growingSpace) newErrors.growingSpace = 'Please select your growing space';
    if (!formData.whatToGrow.trim()) newErrors.whatToGrow = 'Tell us what you want to grow';
    if (!formData.preferredKit) newErrors.preferredKit = 'Please select a kit size';
    if (!formData.agreeToContact) newErrors.agreeToContact = 'You must agree to be contacted';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitStatus('idle');

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // In production, connect to your backend:
    // await fetch('/api/prebook', { method: 'POST', body: JSON.stringify(formData) })

    setIsSubmitting(false);
    setSubmitStatus('success');
    toast({
      type: 'success',
      title: 'Prebooking Confirmed!',
      message: 'You\'re on the list 🌱 We\'ll be in touch soon.',
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  if (submitStatus === 'success') {
    return (
      <section id="prebook" ref={ref} className="section bg-white">
        <div className="container-main">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6, type: 'spring', stiffness: 200, damping: 20 }}
            className="max-w-2xl mx-auto text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200, damping: 15 }}
              className="w-24 h-24 mx-auto mb-6 rounded-full bg-green-100 flex items-center justify-center"
            >
              <CheckCircle className="w-12 h-12 text-green-500" />
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-3xl sm:text-4xl font-display font-medium text-green-950 mb-4"
            >
              You're on the List 🌱
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-lg text-green-600 mb-8"
            >
              Your farming journey starts here. We'll be in touch soon with your personalized kit details and launch updates.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Button variant="primary" size="lg" onClick={() => { setSubmitStatus('idle'); setFormData({ name: '', email: '', phone: '', city: '', growingSpace: '', whatToGrow: '', preferredKit: '', additionalRequirements: '', agreeToContact: false }); }}>
                Build Another Kit
              </Button>
              <Button variant="outline" size="lg">
                Explore Products
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="prebook" ref={ref} className="section bg-gradient-to-b from-amber-50 via-white to-green-50">
      <div className="container-main">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: isInView ? 0.1 : 0, duration: 0.6 }}
            className="lg:pr-8"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-100 text-green-700 text-sm font-medium mb-4">
              <Sparkles className="w-4 h-4" aria-hidden="true" />
              Early Access
            </span>
            <h2 className="section-title">Be Among the First to Grow</h2>
            <p className="section-subtitle">
              Reserve your customized farming kit before launch. Limited early-bird kits available.
            </p>

            <div className="mt-10 space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center flex-shrink-0">
                  <Leaf className="w-6 h-6 text-green-600" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="font-semibold text-green-950">Personalized for You</h3>
                  <p className="mt-1 text-green-600">Your kit is built around what you want to grow and your space.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-6 h-6 text-amber-600" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="font-semibold text-green-950">Early Bird Pricing</h3>
                  <p className="mt-1 text-green-600">Lock in special pre-launch pricing for your customized kit.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-emerald-600" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="font-semibold text-green-950">Priority Shipping</h3>
                  <p className="mt-1 text-green-600">Be first in line when we start shipping kits.</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: isInView ? 0.2 : 0, duration: 0.6 }}
          >
            <Card variant="elevated" padding="lg" className="sticky top-24">
              <h3 className="text-2xl font-semibold text-green-950 mb-2">Reserve Your Kit</h3>
              <p className="text-green-600 mb-6">Fill in your details and we'll prepare your personalized kit.</p>

              <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <Input
                    label="Full Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    error={errors.name}
                    placeholder="Your name"
                    required
                    autoComplete="name"
                  />
                  <Input
                    label="Email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    error={errors.email}
                    placeholder="you@example.com"
                    required
                    autoComplete="email"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <Input
                    label="Phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    error={errors.phone}
                    placeholder="+91 98765 43210"
                    required
                    autoComplete="tel"
                  />
                  <Input
                    label="City"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    error={errors.city}
                    placeholder="Your city"
                    required
                    autoComplete="address-level2"
                  />
                </div>

                <Select
                  label="Growing Space"
                  name="growingSpace"
                  value={formData.growingSpace}
                  onChange={handleChange}
                  error={errors.growingSpace}
                  placeholder="Select your space"
                  options={growingSpaces}
                  required
                />

                <Textarea
                  label="What Do You Want to Grow?"
                  name="whatToGrow"
                  value={formData.whatToGrow}
                  onChange={handleChange}
                  error={errors.whatToGrow}
                  placeholder="e.g., Tomatoes, basil, spinach, microgreens..."
                  minRows={3}
                  required
                />

                <Select
                  label="Preferred Kit Size"
                  name="preferredKit"
                  value={formData.preferredKit}
                  onChange={handleChange}
                  error={errors.preferredKit}
                  placeholder="Select kit size"
                  options={kitOptions}
                  required
                />

                <Textarea
                  label="Additional Requirements (Optional)"
                  name="additionalRequirements"
                  value={formData.additionalRequirements}
                  onChange={handleChange}
                  placeholder="Any specific needs, allergies, or questions?"
                  minRows={3}
                />

                <Checkbox
                  label="I agree to be contacted about my prebooking"
                  description="We'll only contact you regarding your prebooking and kit delivery."
                  name="agreeToContact"
                  checked={formData.agreeToContact}
                  onChange={handleChange}
                  required
                />
                {errors.agreeToContact && (
                  <p className="text-sm text-red-600 flex items-center gap-1" role="alert">
                    <span className="w-4 h-4 flex-shrink-0">⚠</span>
                    {errors.agreeToContact}
                  </p>
                )}

                <Button
                  type="submit"
                  variant="prebook"
                  size="xl"
                  fullWidth
                  isLoading={isSubmitting}
                  className="mt-2"
                >
                  Reserve My Kit
                </Button>

                <p className="text-center text-sm text-green-500">
                  No payment required now. We'll confirm details before charging.
                </p>
              </form>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}