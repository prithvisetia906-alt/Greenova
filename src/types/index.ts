export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  description: string;
  price: number;
  image: string;
  size: string;
  suitablePlants: string[];
  tags: string[];
  available: boolean;
}

export type ProductCategory = 'seeds' | 'soil' | 'fertilizer' | 'pest-protection' | 'accessories';

export interface Seed extends Product {
  category: 'seeds';
  growingDuration: string;
  difficulty: 'easy' | 'moderate' | 'advanced';
  season: string[];
}

export interface Soil extends Product {
  category: 'soil';
  soilType: string;
  phRange: string;
  waterRetention: string;
}

export interface Fertilizer extends Product {
  category: 'fertilizer';
  fertilizerType: string;
  npkRatio?: string;
  applicationFrequency: string;
}

export interface PestProtection extends Product {
  category: 'pest-protection';
  protectionType: string;
  targetPests: string[];
  applicationMethod: string;
}

export interface Accessory extends Product {
  category: 'accessories';
  accessoryType: string;
  material: string;
}

export interface KitConfiguration {
  seeds: string[];
  soil: string | null;
  fertilizer: string | null;
  pestProtection: string | null;
  accessories: string[];
  kitSize: KitSize;
}

export type KitSize = 'starter' | 'balcony' | 'terrace' | 'small-farm';

export interface KitSizeOption {
  id: KitSize;
  name: string;
  description: string;
  multiplier: number;
  suitableFor: string[];
}

export interface PrebookingFormData {
  name: string;
  email: string;
  phone: string;
  city: string;
  growingSpace: string;
  whatToGrow: string;
  preferredKit: string;
  additionalRequirements: string;
  agreeToContact: boolean;
}

export interface PlantInfo {
  id: string;
  name: string;
  scientificName: string;
  difficulty: 'easy' | 'moderate' | 'advanced';
  growingDuration: string;
  suggestedSoil: string[];
  suggestedFertilizer: string[];
  suggestedKitSize: KitSize[];
  image: string;
  description: string;
  season: string[];
  sunRequirements: string;
  waterRequirements: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface TrustPoint {
  icon: string;
  title: string;
  description: string;
}

export interface Benefit {
  icon: string;
  title: string;
  description: string;
}

export interface NavItem {
  label: string;
  href: string;
}

export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterSection {
  title: string;
  links: FooterLink[];
}