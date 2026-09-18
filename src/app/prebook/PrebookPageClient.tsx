'use client';

import { motion, useReducedMotion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, Leaf, ShieldCheck, Truck, BadgePercent } from 'lucide-react';
import { ToastProvider } from '@/components/ui/Toast';
import { Navbar } from '@/components/sections/Navbar';
import { Footer } from '@/components/sections/Footer';
import { OrganicBackdrop, ScrollReveal } from '@/components/ui';
import { Button } from '@/components/ui';
import { PrebookFlow } from '@/components/prebook/PrebookFlow';

const assurances = [
  { icon: BadgePercent, title: 'Early-bird pricing', text: 'Lock launch pricing when you reserve.' },
  { icon: Truck, title: 'Priority shipping', text: 'First in line when kits ship.' },
  { icon: ShieldCheck, title: 'No payment now', text: 'We confirm details before charging.' },
];

export function PrebookPageClient() {
  const reduce = useReducedMotion();

  return (
    <ToastProvider>
      <Navbar />
      <main id="main-content" className="flex-1 pt-16 lg:pt-20">
        {/* Hero */}
        <section className="relative overflow-hidden bg-gradient-to-b from-green-paler/70 via-white to-white">
          <OrganicBackdrop density="low" tone="green" />
          <div className="relative container-main py-14 sm:py-20">
            <motion.div
              initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="mx-auto max-w-3xl text-center"
            >
              <Link
                href="/"
                className="mb-6 inline-flex items-center gap-2 rounded-full border border-green-200 bg-white px-4 py-2 text-sm font-medium text-green-700 transition-colors hover:bg-green-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2"
              >
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                Back to Greenova
              </Link>
              <span className="mx-auto flex w-fit items-center gap-2 rounded-full bg-green-pale px-4 py-1.5 text-sm font-medium text-green-primary">
                <Leaf className="h-4 w-4" aria-hidden="true" />
                Early access · Limited launch kits
              </span>
              <h1 className="mt-5 text-4xl sm:text-5xl lg:text-6xl font-display font-medium text-green-deep leading-[1.08] tracking-tight">
                Your Garden <span className="gradient-text">Starts Here.</span>
              </h1>
              <p className="mx-auto mt-5 max-w-xl text-lg sm:text-xl text-green-600 leading-relaxed">
                Reserve your customized Greenova farming kit before launch.
              </p>
            </motion.div>

            <div className="mx-auto mt-10 grid max-w-3xl grid-cols-1 gap-3 sm:grid-cols-3">
              {assurances.map((a, i) => (
                <ScrollReveal key={a.title} delay={Math.min(i * 0.07, 0.2)}>
                  <div className="flex items-start gap-3 rounded-2xl border border-green-100 bg-white p-4 shadow-sm">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-green-pale text-green-700">
                      <a.icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <span>
                      <span className="block text-sm font-semibold text-green-950">{a.title}</span>
                      <span className="mt-0.5 block text-sm text-green-600">{a.text}</span>
                    </span>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* Flow */}
        <section className="section bg-bg-primary relative overflow-hidden !pt-10 sm:!pt-14">
          <div className="container-main">
            <div className="mx-auto max-w-3xl">
              <PrebookFlow />
              <p className="mt-6 text-center text-xs text-green-500">
                Prefer to explore first?{' '}
                <Link href="/#build-your-kit" className="font-medium text-green-700 underline underline-offset-2 hover:text-green-900">
                  Build your kit on the homepage
                </Link>
              </p>
            </div>
          </div>
        </section>

        {/* Bottom reassurance */}
        <section className="pb-16 sm:pb-24 bg-bg-primary">
          <div className="container-main">
            <ScrollReveal className="mx-auto max-w-3xl rounded-3xl border border-green-100 bg-white p-6 sm:p-8 text-center shadow-sm">
              <h2 className="text-xl sm:text-2xl font-display font-medium text-green-950">Not ready to reserve?</h2>
              <p className="mt-2 text-green-600">See how it works, then come back — your garden will wait.</p>
              <div className="mt-5 flex flex-col sm:flex-row items-center justify-center gap-3">
                <Link href="/#how-it-works">
                  <Button variant="outline" size="lg">How it works</Button>
                </Link>
                <Link href="/">
                  <Button variant="ghost" size="lg">Back to Greenova</Button>
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </section>
      </main>
      <Footer />
    </ToastProvider>
  );
}
