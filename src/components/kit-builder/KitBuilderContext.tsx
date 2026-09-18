'use client';

import { createContext, useContext, useState, useCallback, useMemo, ReactNode } from 'react';
import { KitConfiguration, KitSize, Product, KitSizeOption } from '@/types';
import { products, kitSizes, calculateKitPrice, getProductById } from '@/data/products';

interface KitBuilderContextValue {
  config: KitConfiguration;
  updateSeeds: (seeds: string[]) => void;
  toggleSeed: (seedId: string) => void;
  setSoil: (soilId: string | null) => void;
  setFertilizer: (fertilizerId: string | null) => void;
  setPestProtection: (pestProtectionId: string | null) => void;
  toggleAccessory: (accessoryId: string) => void;
  setKitSize: (kitSize: KitSize) => void;
  resetConfig: () => void;
  totalPrice: number;
  selectedItems: {
    seeds: Product[];
    soil: Product | null;
    fertilizer: Product | null;
    pestProtection: Product | null;
    accessories: Product[];
  };
  kitSizeOption: KitSizeOption;
  kitSizes: KitSizeOption[];
  step: number;
  setStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  canProceed: boolean;
}

const defaultConfig: KitConfiguration = {
  seeds: [],
  soil: null,
  fertilizer: null,
  pestProtection: null,
  accessories: [],
  kitSize: 'starter',
};

const KitBuilderContext = createContext<KitBuilderContextValue | null>(null);

export function KitBuilderProvider({ children }: { children: ReactNode }) {
  const [config, setConfig] = useState<KitConfiguration>(defaultConfig);
  const [step, setStep] = useState(1);

  const updateSeeds = useCallback((seeds: string[]) => {
    setConfig((prev) => ({ ...prev, seeds }));
  }, []);

  const toggleSeed = useCallback((seedId: string) => {
    setConfig((prev) => ({
      ...prev,
      seeds: prev.seeds.includes(seedId)
        ? prev.seeds.filter((id) => id !== seedId)
        : [...prev.seeds, seedId],
    }));
  }, []);

  const setSoil = useCallback((soilId: string | null) => {
    setConfig((prev) => ({ ...prev, soil: soilId }));
  }, []);

  const setFertilizer = useCallback((fertilizerId: string | null) => {
    setConfig((prev) => ({ ...prev, fertilizer: fertilizerId }));
  }, []);

  const setPestProtection = useCallback((pestProtectionId: string | null) => {
    setConfig((prev) => ({ ...prev, pestProtection: pestProtectionId }));
  }, []);

  const toggleAccessory = useCallback((accessoryId: string) => {
    setConfig((prev) => ({
      ...prev,
      accessories: prev.accessories.includes(accessoryId)
        ? prev.accessories.filter((id) => id !== accessoryId)
        : [...prev.accessories, accessoryId],
    }));
  }, []);

  const setKitSize = useCallback((kitSize: KitSize) => {
    setConfig((prev) => ({ ...prev, kitSize }));
  }, []);

  const resetConfig = useCallback(() => {
    setConfig(defaultConfig);
    setStep(1);
  }, []);

  const totalPrice = useMemo(() => calculateKitPrice(config), [config]);

  const selectedItems = useMemo(() => ({
    seeds: config.seeds.map((id) => getProductById(id)).filter(Boolean) as Product[],
    soil: config.soil ? getProductById(config.soil) || null : null,
    fertilizer: config.fertilizer ? getProductById(config.fertilizer) || null : null,
    pestProtection: config.pestProtection ? getProductById(config.pestProtection) || null : null,
    accessories: config.accessories.map((id) => getProductById(id)).filter(Boolean) as Product[],
  }), [config]);

  const kitSizeOption = useMemo(() => 
    kitSizes.find((k) => k.id === config.kitSize) || kitSizes[0], 
    [config.kitSize]
  );

  const canProceed = useMemo(() => {
    switch (step) {
      case 1:
        return config.seeds.length > 0;
      case 2:
        return config.soil !== null;
      case 3:
        return config.fertilizer !== null;
      case 4:
        return config.pestProtection !== null;
      case 5:
        return true;
      default:
        return true;
    }
  }, [step, config]);

  const nextStep = useCallback(() => {
    if (canProceed && step < 6) {
      setStep((prev) => prev + 1);
    }
  }, [canProceed, step]);

  const prevStep = useCallback(() => {
    setStep((prev) => Math.max(1, prev - 1));
  }, []);

  const value = useMemo(() => ({
    config,
    updateSeeds,
    toggleSeed,
    setSoil,
    setFertilizer,
    setPestProtection,
    toggleAccessory,
    setKitSize,
    resetConfig,
    totalPrice,
    selectedItems,
    kitSizeOption,
    kitSizes,
    step,
    setStep,
    nextStep,
    prevStep,
    canProceed,
  }), [
    config,
    updateSeeds,
    toggleSeed,
    setSoil,
    setFertilizer,
    setPestProtection,
    toggleAccessory,
    setKitSize,
    resetConfig,
    totalPrice,
    selectedItems,
    kitSizeOption,
    step,
    nextStep,
    prevStep,
    canProceed,
  ]);

  return (
    <KitBuilderContext.Provider value={value}>
      {children}
    </KitBuilderContext.Provider>
  );
}

export function useKitBuilder() {
  const context = useContext(KitBuilderContext);
  if (!context) {
    throw new Error('useKitBuilder must be used within a KitBuilderProvider');
  }
  return context;
}

export function getProductsByCategory(category: Product['category']): Product[] {
  return products.filter((p) => p.category === category && p.available);
}