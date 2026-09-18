'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui';
import { Input } from '@/components/ui';
import { Mail, Phone, MapPin, MessageSquare, Camera, Tv, Leaf, Sparkles, Check, ChevronRight, Globe } from 'lucide-react';
import { clsx } from 'clsx';
import { useToast } from '@/components/ui/Toast';

const footerLinks = {
  navigation: [
    { label: 'Home', href: '/#hero' },
    { label: 'Build Your Kit', href: '/#build-your-kit' },
    { label: 'Products', href: '/#products' },
    { label: 'Prebook', href: '/prebook' },
    { label: 'FAQ', href: '/#faq' },
  ],
  company: [
    { label: 'Our Story', href: '/#brand-story' },
    { label: 'How It Works', href: '/#how-it-works' },
    { label: 'Why Choose Us', href: '/#why-choose-us' },
    { label: 'Growing Guide', href: '/#growing-journey' },
  ],
  support: [
    { label: 'Contact Us', href: '#contact' },
    { label: 'Shipping Policy', href: '/shipping' },
    { label: 'Refund Policy', href: '/refunds' },
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
  ],
};

const socialLinks = [
  { icon: MessageSquare, href: 'https://facebook.com', label: 'Facebook' },
  { icon: Camera, href: 'https://instagram.com', label: 'Instagram' },
  { icon: Globe, href: 'https://twitter.com', label: 'Twitter' },
  { icon: Tv, href: 'https://youtube.com', label: 'YouTube' },
];

export function Footer() {
  const { addToast } = useToast();
  const [email, setEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      addToast({ type: 'error', title: 'Invalid email', message: 'Please enter a valid email address' });
      return;
    }
    addToast({ type: 'success', title: 'Subscribed!', message: 'Thanks for joining our growing community 🌱' });
    setEmail('');
  };

  return (
    <footer className="bg-green-deep text-green-50 relative overflow-hidden">
      <div className="absolute inset-0" aria-hidden="true">
        <div className="absolute top-1/4 left-1/4 w-[384px] h-[384px] bg-green-emerald/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-[384px] h-[384px] bg-amber-warm/15 rounded-full blur-3xl" />
      </div>

      <div className="relative container-main py-16 lg:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-16 mb-16"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-primary to-green-emerald flex items-center justify-center">
                <Leaf className="w-7 h-7 text-white" aria-hidden="true" />
              </div>
              <span className="text-2xl font-display font-medium text-white">Greenova</span>
            </div>
            <p className="text-green-300 mb-6 max-w-xs">
              Custom organic farming kits built around what you want to grow — from your first balcony garden to your own small farm.
            </p>
            <div className="flex flex-wrap gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-10 h-10 rounded-xl bg-green-800/50 flex items-center justify-center text-green-300 hover:bg-green-700 hover:text-white transition-colors"
                >
                  <social.icon className="w-5 h-5" aria-hidden="true" />
                </a>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h4 className="font-semibold text-white mb-4">Navigation</h4>
            <nav aria-label="Main navigation">
              <ul className="space-y-3">
                {footerLinks.navigation.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-green-300 hover:text-white transition-colors flex items-center gap-2"
                    >
                      <ChevronRight className="w-4 h-4 opacity-50" aria-hidden="true" />
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h4 className="font-semibold text-white mb-4">Company</h4>
            <nav aria-label="Company links">
              <ul className="space-y-3">
                {footerLinks.company.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-green-300 hover:text-white transition-colors flex items-center gap-2"
                    >
                      <ChevronRight className="w-4 h-4 opacity-50" aria-hidden="true" />
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h4 className="font-semibold text-white mb-4">Support</h4>
            <nav aria-label="Support links">
              <ul className="space-y-3">
                {footerLinks.support.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-green-300 hover:text-white transition-colors flex items-center gap-2"
                    >
                      <ChevronRight className="w-4 h-4 opacity-50" aria-hidden="true" />
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="border-t border-green-800 pt-8"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-6 text-green-400 text-sm">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" aria-hidden="true" />
                <a href="mailto:hello@greenova.in" className="hover:text-white transition-colors">hello@greenova.in</a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" aria-hidden="true" />
                <a href="tel:+919876543210" className="hover:text-white transition-colors">+91 98765 43210</a>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" aria-hidden="true" />
                <span>Bengaluru, India</span>
              </div>
            </div>

            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                label=""
                className="flex-1"
                aria-label="Email for newsletter"
              />
              <Button type="submit" variant="prebook" size="md">
                Subscribe
              </Button>
            </form>
          </div>

          <div className="mt-8 pt-8 border-t border-green-800 text-center text-green-500 text-sm">
            <p>© {new Date().getFullYear()} Greenova. All rights reserved.</p>
            <p className="mt-1">Grow your own. Your way. 🌱</p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}