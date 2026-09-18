'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Card, Button } from '@/components/ui';
import { ChevronDown, Check } from 'lucide-react';
import { clsx } from 'clsx';

const faqs = [
  {
    question: 'Who are these kits for?',
    answer: 'Our kits are designed for anyone who wants to grow their own food — whether you\'re a complete beginner with a sunny windowsill, an apartment dweller with a balcony, a homeowner with a terrace garden, or a small-scale farmer. We customize each kit based on your space, experience level, and what you want to grow.',
  },
  {
    question: 'What can I customize in my kit?',
    answer: 'You can choose: the seeds you want to grow (vegetables, herbs, fruits, flowers, microgreens), your growing medium (organic potting mix, cocopeat, compost-rich soil, seed starting mix, or custom blend), organic nutrition (compost, vermicompost, neem cake, balanced nutrition mix, or custom blend), natural pest protection (neem oil, botanical spray, fungal protection, or preventive care kit), optional accessories (grow bags, tools, watering can, etc.), and your kit size (Starter, Balcony, Terrace, or Small Farm).',
  },
  {
    question: 'Can beginners use the kits?',
    answer: 'Absolutely. Our kits are designed with beginners in mind. Each kit includes a personalized growing guide with step-by-step instructions tailored to your specific selections. We also offer "easy" difficulty seeds and the Starter kit size perfect for learning.',
  },
  {
    question: 'Can I create a kit for balcony gardening?',
    answer: 'Yes! Our Balcony kit size (6-8 pots) is specifically designed for balcony spaces. We offer compact and container-friendly seed varieties, and the kit includes appropriately sized grow bags and tools for railing or floor placement.',
  },
  {
    question: 'Can I order larger quantities for a small farm?',
    answer: 'Yes. Our Small Farm kit size provides 12x base quantities suitable for 25+ beds or row planting. You can also contact us for custom bulk orders beyond the standard kit sizes.',
  },
  {
    question: 'Can I choose specific seeds?',
    answer: 'Yes. Our interactive kit builder lets you select from 10+ seed varieties including tomatoes, spinach, coriander, lettuce, carrots, radish, chillies, mint, basil, cucumber, microgreens, and marigolds. You can choose multiple varieties for the same kit.',
  },
  {
    question: 'How does prebooking work?',
    answer: 'Prebooking reserves your customized kit before our official launch. You provide your details and kit preferences — no payment is required at prebooking. We\'ll contact you to confirm your kit specifications and arrange payment before shipping. Prebook customers get priority access and early-bird pricing.',
  },
  {
    question: 'What happens after I prebook?',
    answer: 'After prebooking, you\'ll receive a confirmation email. Our team will review your selections and may reach out with suggestions. When kits are ready to ship, we\'ll contact you to confirm the final configuration, process payment, and arrange delivery. You\'ll receive tracking information once your kit ships.',
  },
  {
    question: 'Are the products organic?',
    answer: 'We prioritize organic-certified and naturally derived inputs. Each product listing includes its specific certification status and sourcing details. We don\'t make blanket claims about the entire kit being "100% organic" — instead, we provide transparent information so you can make informed choices. Look for organic certification badges on individual product pages.',
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" ref={ref} className="section bg-white">
      <div className="container-main">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-100 text-green-700 text-sm font-medium mb-4">
            <Check className="w-4 h-4" aria-hidden="true" />
            Frequently Asked Questions
          </span>
          <h2 className="section-title">Questions? We've Got Answers</h2>
          <p className="section-subtitle mx-auto">
            Everything you need to know about our kits, customization, and prebooking.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <AnimatePresence>
            {faqs.map((faq, index) => (
              <motion.div
                key={faq.question}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: isInView ? 0.05 + index * 0.05 : 0, duration: 0.4 }}
                className="mb-4"
              >
                <FAQItem
                  question={faq.question}
                  answer={faq.answer}
                  isOpen={openIndex === index}
                  onClick={() => toggleFAQ(index)}
                  index={index}
                />
              </motion.div>
            ))}
          </AnimatePresence>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: isInView ? 0.6 : 0, duration: 0.5 }}
            className="mt-12 text-center"
          >
            <p className="text-green-600 mb-4">Didn't find your answer?</p>
            <Button variant="outline" size="lg">
              Contact Us
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function FAQItem({ question, answer, isOpen, onClick, index }: { question: string; answer: string; isOpen: boolean; onClick: () => void; index: number }) {
  return (
    <Card variant="outlined" padding="none" className="overflow-hidden border-green-100">
      <button
        onClick={onClick}
        className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
        aria-expanded={isOpen}
        aria-controls={`faq-answer-${index}`}
      >
        <span className="font-medium text-green-950 pr-4">{question}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          className="flex-shrink-0 text-green-500"
          aria-hidden="true"
        >
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id={`faq-answer-${index}`}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="px-6 pb-6 border-t border-green-100"
          >
            <p className="text-green-600 leading-relaxed">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  );
}