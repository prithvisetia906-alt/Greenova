import type { Metadata } from 'next';
import { PrebookPageClient } from './PrebookPageClient';

export const metadata: Metadata = {
  title: 'Prebook Your Farming Kit',
  description:
    'Reserve your customized Greenova farming kit before launch. Choose your space, pick what to grow, and confirm your reservation in under two minutes.',
  openGraph: {
    title: 'Prebook Your Farming Kit | Greenova',
    description:
      'Reserve your customized Greenova farming kit before launch. Choose your space, pick what to grow, and confirm your reservation.',
    url: 'https://greenova.in/prebook',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Prebook Your Farming Kit | Greenova',
    description:
      'Reserve your customized Greenova farming kit before launch.',
  },
};

export default function PrebookPage() {
  return <PrebookPageClient />;
}
