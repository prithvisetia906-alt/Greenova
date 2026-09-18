'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui';
import { Menu, X, Leaf, Sparkles } from 'lucide-react';
import { clsx } from 'clsx';

const navItems = [
  { label: 'Home', href: '#hero' },
  { label: 'Build Your Kit', href: '#build-your-kit' },
  { label: 'Products', href: '#products' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Our Story', href: '#brand-story' },
  { label: 'FAQ', href: '#faq' },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('#hero');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const sections = navItems.map((item) => document.querySelector(item.href)).filter(Boolean);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection('#' + entry.target.id);
          }
        });
      },
      { rootMargin: '-20% 0px -60% 0px', threshold: 0.1 }
    );
    sections.forEach((section) => section && observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={clsx(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-green-100'
          : 'bg-transparent'
      )}
    >
      <nav className="container-main" aria-label="Main navigation">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <motion.a
            href="#hero"
            onClick={(e) => { e.preventDefault(); scrollToSection('#hero'); }}
            className="flex items-center gap-2 text-green-deep font-display font-medium text-xl"
            aria-label="Greenova Home"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-green-primary to-green-emerald flex items-center justify-center shadow-lg">
              <Leaf className="w-5 h-5 text-white" aria-hidden="true" />
            </div>
            <span className="hidden sm:block">Greenova</span>
          </motion.a>

          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <motion.button
                key={item.label}
                onClick={(e) => { e.preventDefault(); scrollToSection(item.href); }}
                className={clsx(
                  'relative px-4 py-2 text-sm font-medium transition-colors',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2 rounded-lg',
                  activeSection === item.href
                    ? 'text-green-primary bg-green-pale'
                    : 'text-green-600 hover:text-green-900 hover:bg-green-50'
                )}
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.98 }}
              >
                {item.label}
                {activeSection === item.href && (
                  <motion.div
                    layoutId="active-indicator"
                    transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-green-primary"
                    aria-hidden="true"
                  />
                )}
              </motion.button>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-3">
            <Button
              variant="ghost"
              size="md"
              onClick={(e) => { e.preventDefault(); scrollToSection('#build-your-kit'); }}
              className="text-green-700 hover:text-green-900 hover:bg-green-50"
            >
              Build Your Kit
            </Button>
            <Button
              variant="prebook"
              size="md"
              onClick={(e) => { e.preventDefault(); scrollToSection('#prebook'); }}
              rightIcon={<Sparkles className="w-4 h-4" />}
            >
              Prebook
            </Button>
          </div>

          <button
            className="lg:hidden p-2 rounded-lg text-green-600 hover:text-green-900 hover:bg-green-100"
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Open menu"
            aria-expanded={isMobileMenuOpen}
          >
            <Menu className="w-6 h-6" aria-hidden="true" />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-white lg:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
          >
            <div className="flex items-center justify-between h-16 px-4 border-b border-green-100">
              <div className="flex items-center gap-2 text-green-deep font-display font-medium text-xl">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-green-primary to-green-emerald flex items-center justify-center">
                  <Leaf className="w-5 h-5 text-white" aria-hidden="true" />
                </div>
                <span>Greenova</span>
              </div>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 rounded-lg text-green-600 hover:text-green-900 hover:bg-green-100"
                aria-label="Close menu"
              >
                <X className="w-6 h-6" aria-hidden="true" />
              </button>
            </div>
            <div className="p-4 space-y-2">
              {navItems.map((item) => (
                <motion.button
                  key={item.label}
                  onClick={() => scrollToSection(item.href)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 }}
                  className="w-full px-4 py-4 text-left text-lg font-medium text-green-700 rounded-xl hover:bg-green-50 transition-colors"
                >
                  {item.label}
                </motion.button>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="pt-4 space-y-3"
              >
                <Button
                  variant="secondary"
                  size="lg"
                  fullWidth
                  onClick={() => scrollToSection('#build-your-kit')}
                  className="w-full"
                >
                  Build Your Kit
                </Button>
                <Button
                  variant="prebook"
                  size="lg"
                  fullWidth
                  rightIcon={<Sparkles className="w-4 h-4" />}
                  onClick={() => scrollToSection('#prebook')}
                  className="w-full"
                >
                  Prebook Now
                </Button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}