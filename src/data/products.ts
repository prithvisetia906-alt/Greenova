import { Product, ProductCategory, Seed, Soil, Fertilizer, PestProtection, Accessory, KitSizeOption } from '@/types';

export type { ProductCategory } from '@/types';

export const kitSizes: KitSizeOption[] = [
  {
    id: 'starter',
    name: 'Starter',
    description: 'Perfect for beginners with 2-3 pots',
    multiplier: 1,
    suitableFor: ['Windowsill', 'Small balcony', 'Kitchen counter'],
  },
  {
    id: 'balcony',
    name: 'Balcony',
    description: 'Ideal for balcony gardens with 6-8 pots',
    multiplier: 2.5,
    suitableFor: ['Balcony', 'Small terrace', 'Railing planters'],
  },
  {
    id: 'terrace',
    name: 'Terrace',
    description: 'Full terrace setup with 12-15 pots',
    multiplier: 5,
    suitableFor: ['Terrace', 'Rooftop garden', 'Large balcony'],
  },
  {
    id: 'small-farm',
    name: 'Small Farm',
    description: 'Small-scale cultivation with 25+ beds',
    multiplier: 12,
    suitableFor: ['Small farm', 'Community garden', 'Large terrace'],
  },
];

export const products: Product[] = [
  // SEEDS
  {
    id: 'seed-tomato',
    name: 'Tomato Seeds (Cherry)',
    category: 'seeds',
    description: 'Sweet cherry tomatoes perfect for snacking and salads. High-yield variety suitable for containers.',
    price: 149,
    image: '/images/seeds/tomato-cherry.jpg',
    size: '50 seeds',
    suitablePlants: ['Tomato'],
    tags: ['vegetable', 'container-friendly', 'high-yield', 'summer'],
    available: true,
  } as Seed,
  {
    id: 'seed-spinach',
    name: 'Spinach Seeds (Baby Leaf)',
    category: 'seeds',
    description: 'Tender baby spinach leaves ready in 30 days. Cold-tolerant and perfect for year-round growing.',
    price: 129,
    image: '/images/seeds/spinach.jpg',
    size: '100 seeds',
    suitablePlants: ['Spinach'],
    tags: ['vegetable', 'fast-growing', 'cool-season', 'nutrient-dense'],
    available: true,
  } as Seed,
  {
    id: 'seed-coriander',
    name: 'Coriander Seeds (Slow Bolt)',
    category: 'seeds',
    description: 'Slow-bolting variety for extended harvest. Essential herb for Indian and Asian cuisine.',
    price: 99,
    image: '/images/seeds/coriander.jpg',
    size: '100 seeds',
    suitablePlants: ['Coriander'],
    tags: ['herb', 'slow-bolt', 'year-round', 'culinary'],
    available: true,
  } as Seed,
  {
    id: 'seed-lettuce',
    name: 'Lettuce Seeds (Butterhead Mix)',
    category: 'seeds',
    description: 'Buttery soft leaves in green and red varieties. Cut-and-come-again harvest for weeks.',
    price: 119,
    image: '/images/seeds/lettuce.jpg',
    size: '200 seeds',
    suitablePlants: ['Lettuce'],
    tags: ['vegetable', 'cut-and-come-again', 'cool-season', 'salad'],
    available: true,
  } as Seed,
  {
    id: 'seed-carrot',
    name: 'Carrot Seeds (Nantes)',
    category: 'seeds',
    description: 'Sweet, cylindrical carrots perfect for container growing. 70-day maturity.',
    price: 109,
    image: '/images/seeds/carrot.jpg',
    size: '200 seeds',
    suitablePlants: ['Carrot'],
    tags: ['vegetable', 'root-crop', 'container-friendly', 'sweet'],
    available: true,
  } as Seed,
  {
    id: 'seed-radish',
    name: 'Radish Seeds (Cherry Belle)',
    category: 'seeds',
    description: 'Crisp, mild radishes ready in just 25 days. Perfect for beginners and kids.',
    price: 89,
    image: '/images/seeds/radish.jpg',
    size: '200 seeds',
    suitablePlants: ['Radish'],
    tags: ['vegetable', 'fastest-growing', 'beginner-friendly', 'spring'],
    available: true,
  } as Seed,
  {
    id: 'seed-chilli',
    name: 'Chilli Seeds (Bird\'s Eye)',
    category: 'seeds',
    description: 'Small but fiery chillies. Compact plants ideal for pots and indoor growing.',
    price: 139,
    image: '/images/seeds/chilli.jpg',
    size: '30 seeds',
    suitablePlants: ['Chilli'],
    tags: ['vegetable', 'spicy', 'compact', 'perennial'],
    available: true,
  } as Seed,
  {
    id: 'seed-mint',
    name: 'Mint Seeds (Spearmint)',
    category: 'seeds',
    description: 'Classic spearmint for teas, cocktails, and cooking. Vigorous grower — best in containers.',
    price: 119,
    image: '/images/seeds/mint.jpg',
    size: '50 seeds',
    suitablePlants: ['Mint'],
    tags: ['herb', 'perennial', 'tea', 'invasive-root'],
    available: true,
  } as Seed,
  {
    id: 'seed-basil',
    name: 'Basil Seeds (Genovese)',
    category: 'seeds',
    description: 'Classic Italian basil with large aromatic leaves. Essential for pesto and pasta.',
    price: 129,
    image: '/images/seeds/basil.jpg',
    size: '100 seeds',
    suitablePlants: ['Basil'],
    tags: ['herb', 'culinary', 'warm-season', 'aromatic'],
    available: true,
  } as Seed,
  {
    id: 'seed-cucumber',
    name: 'Cucumber Seeds (Bush Pickle)',
    category: 'seeds',
    description: 'Compact bush variety for small spaces. Produces crisp pickling cucumbers.',
    price: 149,
    image: '/images/seeds/cucumber.jpg',
    size: '25 seeds',
    suitablePlants: ['Cucumber'],
    tags: ['vegetable', 'bush-variety', 'pickling', 'compact'],
    available: true,
  } as Seed,
  {
    id: 'seed-microgreens',
    name: 'Microgreens Mix (Sunflower, Pea, Radish)',
    category: 'seeds',
    description: 'Nutrient-dense microgreens ready in 7-14 days. Grow on your kitchen counter.',
    price: 199,
    image: '/images/seeds/microgreens.jpg',
    size: '50g mix',
    suitablePlants: ['Microgreens'],
    tags: ['microgreens', 'fastest', 'indoor', 'nutrient-dense'],
    available: true,
  } as Seed,
  {
    id: 'seed-marigold',
    name: 'Marigold Seeds (French Dwarf)',
    category: 'seeds',
    description: 'Bright orange and yellow flowers that naturally deter garden pests. Companion plant.',
    price: 99,
    image: '/images/seeds/marigold.jpg',
    size: '50 seeds',
    suitablePlants: ['Marigold'],
    tags: ['flower', 'companion-plant', 'pest-deterrent', 'easy'],
    available: true,
  } as Seed,

  // SOIL
  {
    id: 'soil-potting-mix',
    name: 'Organic Potting Mix',
    category: 'soil',
    description: 'Premium blend of coconut coir, compost, and perlite. Ready to use for all container plants.',
    price: 449,
    image: '/images/soil/potting-mix.jpg',
    size: '25 L bag',
    suitablePlants: ['All vegetables', 'Herbs', 'Flowers', 'Microgreens'],
    tags: ['organic', 'all-purpose', 'well-draining', 'peat-free'],
    available: true,
  } as Soil,
  {
    id: 'soil-cocopeat',
    name: 'Cocopeat Block (5kg expands to 75L)',
    category: 'soil',
    description: 'Compressed coconut coir block. Expands with water. Excellent water retention and aeration.',
    price: 399,
    image: '/images/soil/cocopeat.jpg',
    size: '5 kg block',
    suitablePlants: ['Seed starting', 'Hydroponics', 'Soil amendment', 'Container gardening'],
    tags: ['coconut-coir', 'peat-free', 'high-water-retention', 'expandable'],
    available: true,
  } as Soil,
  {
    id: 'soil-compost-rich',
    name: 'Compost-Rich Garden Soil',
    category: 'soil',
    description: 'Living soil enriched with aged compost and beneficial microbes. Feeds plants for months.',
    price: 549,
    image: '/images/soil/compost-rich.jpg',
    size: '25 L bag',
    suitablePlants: ['Heavy feeders', 'Tomatoes', 'Peppers', 'Squash', 'Fruit trees'],
    tags: ['living-soil', 'microbe-rich', 'slow-release', 'nutrient-dense'],
    available: true,
  } as Soil,
  {
    id: 'soil-seed-starting',
    name: 'Seed Starting Mix',
    category: 'soil',
    description: 'Fine, sterile mix for optimal germination. Light texture allows delicate roots to establish.',
    price: 299,
    image: '/images/soil/seed-starting.jpg',
    size: '10 L bag',
    suitablePlants: ['All seeds', 'Microgreens', 'Cuttings', 'Seedlings'],
    tags: ['sterile', 'fine-texture', 'high-germination', 'damping-off-prevention'],
    available: true,
  } as Soil,
  {
    id: 'soil-custom-blend',
    name: 'Custom Soil Blend (Made to Order)',
    category: 'soil',
    description: 'Tailored blend based on your selected plants. We mix the perfect ratio for your kit.',
    price: 649,
    image: '/images/soil/custom-blend.jpg',
    size: '25 L bag',
    suitablePlants: ['Customized per kit'],
    tags: ['customized', 'plant-specific', 'optimized', 'premium'],
    available: true,
  } as Soil,

  // FERTILIZERS
  {
    id: 'fert-compost',
    name: 'Organic Compost (Vermicompost Enriched)',
    category: 'fertilizer',
    description: 'Rich, dark compost with worm castings. Improves soil structure and feeds beneficial microbes.',
    price: 349,
    image: '/images/fertilizers/compost.jpg',
    size: '5 kg bag',
    suitablePlants: ['All plants', 'Soil amendment', 'Top dressing', 'Seed starting mix'],
    tags: ['vermicompost', 'microbe-rich', 'soil-builder', 'slow-release'],
    available: true,
  } as Fertilizer,
  {
    id: 'fert-vermicompost',
    name: 'Pure Vermicompost',
    category: 'fertilizer',
    description: 'Pure earthworm castings. Nature\'s most potent organic fertilizer. Gentle enough for seedlings.',
    price: 449,
    image: '/images/fertilizers/vermicompost.jpg',
    size: '3 kg bag',
    suitablePlants: ['Seedlings', 'Container plants', 'Herbs', 'Leafy greens', 'Houseplants'],
    tags: ['worm-castings', 'gentle', 'high-nutrient', 'water-soluble'],
    available: true,
  } as Fertilizer,
  {
    id: 'fert-neem-cake',
    name: 'Neem Cake Fertilizer',
    category: 'fertilizer',
    description: 'Byproduct of neem oil extraction. Slow-release nitrogen with natural pest-deterrent properties.',
    price: 299,
    image: '/images/fertilizers/neem-cake.jpg',
    size: '5 kg bag',
    suitablePlants: ['Vegetables', 'Fruit trees', 'Roses', 'Lawns', 'Pest-prone plants'],
    tags: ['neem', 'slow-release', 'pest-deterrent', 'nitrogen-rich'],
    available: true,
  } as Fertilizer,
  {
    id: 'fert-nutrition-mix',
    name: 'Plant Nutrition Mix (Balanced NPK)',
    category: 'fertilizer',
    description: 'Balanced organic fertilizer with rock phosphate, kelp, and bone meal. Complete nutrition.',
    price: 399,
    image: '/images/fertilizers/nutrition-mix.jpg',
    size: '2 kg jar',
    suitablePlants: ['Fruiting vegetables', 'Flowering plants', 'Container gardens', 'Raised beds'],
    tags: ['balanced-npk', 'kelp', 'rock-phosphate', 'bone-meal', 'complete'],
    available: true,
  } as Fertilizer,
  {
    id: 'fert-custom',
    name: 'Custom Organic Fertilizer Blend',
    category: 'fertilizer',
    description: 'Formulated for your specific plant selections. Optimized nutrient ratios for your kit.',
    price: 549,
    image: '/images/fertilizers/custom-fertilizer.jpg',
    size: '2 kg jar',
    suitablePlants: ['Customized per kit'],
    tags: ['customized', 'plant-specific', 'optimized', 'premium'],
    available: true,
  } as Fertilizer,

  // PEST PROTECTION
  {
    id: 'pest-neem-oil',
    name: 'Neem Oil Concentrate (Cold-Pressed)',
    category: 'pest-protection',
    description: 'Cold-pressed neem oil for natural pest management. Dilute and spray. Affects feeding and breeding cycles.',
    price: 349,
    image: '/images/pest-protection/neem-oil.jpg',
    size: '250 ml bottle',
    suitablePlants: ['All plants', 'Vegetables', 'Fruit trees', 'Ornamentals', 'Herbs'],
    tags: ['neem-oil', 'broad-spectrum', 'biodegradable', 'ipm-compatible'],
    available: true,
  } as PestProtection,
  {
    id: 'pest-botanical',
    name: 'Botanical Pest Control Spray (Ready-to-Use)',
    category: 'pest-protection',
    description: 'Blend of plant extracts (pyrethrum, neem, garlic). Ready-to-spray for common garden pests.',
    price: 399,
    image: '/images/pest-protection/botanical-spray.jpg',
    size: '500 ml spray',
    suitablePlants: ['Vegetables', 'Herbs', 'Flowers', 'Indoor plants', 'Edible crops'],
    tags: ['ready-to-use', 'botanical', 'pyrethrum', 'garlic', 'contact-action'],
    available: true,
  } as PestProtection,
  {
    id: 'pest-fungal',
    name: 'Natural Fungal Protection (Copper + Sulfur)',
    category: 'pest-protection',
    description: 'Organic-approved copper and sulfur blend for fungal disease prevention. Use preventively.',
    price: 449,
    image: '/images/pest-protection/fungal-protection.jpg',
    size: '200 g powder',
    suitablePlants: ['Tomatoes', 'Potatoes', 'Grapes', 'Roses', 'Cucurbits', 'Humid climates'],
    tags: ['copper', 'sulfur', 'fungal-prevention', 'organic-approved', 'preventive'],
    available: true,
  } as PestProtection,
  {
    id: 'pest-preventive-kit',
    name: 'Preventive Plant Care Kit',
    category: 'pest-protection',
    description: 'Complete kit: neem oil, sticky traps, seaweed extract, and application guide. Build plant immunity.',
    price: 799,
    image: '/images/pest-protection/preventive-kit.jpg',
    size: 'Kit (4 items)',
    suitablePlants: ['All garden plants', 'Beginners', 'Organic gardens', 'Seasonal protection'],
    tags: ['kit', 'complete', 'sticky-traps', 'seaweed', 'immunity-building'],
    available: true,
  } as PestProtection,

  // ACCESSORIES
  {
    id: 'acc-grow-bags',
    name: 'Fabric Grow Bags (Set of 5)',
    category: 'accessories',
    description: 'Breathable fabric pots promote air pruning and healthy roots. 12L capacity each.',
    price: 499,
    image: '/images/accessories/grow-bags.jpg',
    size: '5 x 12L',
    suitablePlants: ['Tomatoes', 'Peppers', 'Potatoes', 'Herbs', 'Flowers', 'Root vegetables'],
    tags: ['fabric-pots', 'air-pruning', 'reusable', 'breathable', 'root-health'],
    available: true,
  } as Accessory,
  {
    id: 'acc-hand-trowel',
    name: 'Ergonomic Hand Trowel',
    category: 'accessories',
    description: 'Stainless steel with comfortable grip. Depth markings for precise planting.',
    price: 299,
    image: '/images/accessories/hand-trowel.jpg',
    size: '1 piece',
    suitablePlants: ['All planting tasks'],
    tags: ['stainless-steel', 'ergonomic', 'depth-markings', 'durable'],
    available: true,
  } as Accessory,
  {
    id: 'acc-pruning-shears',
    name: 'Bypass Pruning Shears',
    category: 'accessories',
    description: 'Sharp bypass blades for clean cuts. Sap groove prevents sticking. Spring-loaded.',
    price: 599,
    image: '/images/accessories/pruning-shears.jpg',
    size: '1 piece',
    suitablePlants: ['Tomatoes', 'Herbs', 'Flowers', 'Fruit trees', 'Vines'],
    tags: ['bypass', 'clean-cut', 'spring-loaded', 'sap-groove', 'sharp'],
    available: true,
  } as Accessory,
  {
    id: 'acc-watering-can',
    name: 'Long-Spout Watering Can (5L)',
    category: 'accessories',
    description: 'Precision long spout for targeted watering. Removable rose for gentle seedling shower.',
    price: 449,
    image: '/images/accessories/watering-can.jpg',
    size: '5 L',
    suitablePlants: ['Seedlings', 'Container plants', 'Indoor plants', 'Herbs'],
    tags: ['long-spout', 'removable-rose', 'precision', '5-liter', 'balanced'],
    available: true,
  } as Accessory,
  {
    id: 'acc-plant-markers',
    name: 'Bamboo Plant Markers (Set of 20)',
    category: 'accessories',
    description: 'Natural bamboo markers with waterproof writable surface. Biodegradable.',
    price: 149,
    image: '/images/accessories/plant-markers.jpg',
    size: '20 pieces',
    suitablePlants: ['Seed starting', 'Multiple varieties', 'Garden organization'],
    tags: ['bamboo', 'biodegradable', 'waterproof', 'reusable', 'eco-friendly'],
    available: true,
  } as Accessory,
  {
    id: 'acc-garden-gloves',
    name: 'Breathable Garden Gloves (Pair)',
    category: 'accessories',
    description: 'Nitrile-coated palms with breathable back. Excellent grip wet or dry. Machine washable.',
    price: 249,
    image: '/images/accessories/garden-gloves.jpg',
    size: '1 pair (M/L/XL)',
    suitablePlants: ['All gardening tasks'],
    tags: ['nitrile-coated', 'breathable', 'grip', 'washable', 'sizes-available'],
    available: true,
  } as Accessory,
  {
    id: 'acc-moisture-meter',
    name: 'Soil Moisture Meter',
    category: 'accessories',
    description: 'No batteries needed. Instantly shows moisture level. Prevents over/under watering.',
    price: 349,
    image: '/images/accessories/moisture-meter.jpg',
    size: '1 piece',
    suitablePlants: ['Container plants', 'Indoor plants', 'Beginners', 'Succulents', 'Herbs'],
    tags: ['no-battery', 'instant-read', 'prevents-overwatering', 'simple'],
    available: true,
  } as Accessory,
  {
    id: 'acc-trellis',
    name: 'Expandable Plant Trellis (Set of 2)',
    category: 'accessories',
    description: 'Adjustable fan trellis for climbing plants. Powder-coated steel. 1.5m height.',
    price: 499,
    image: '/images/accessories/trellis.jpg',
    size: '2 pieces',
    suitablePlants: ['Tomatoes', 'Cucumbers', 'Beans', 'Peas', 'Vining flowers'],
    tags: ['expandable', 'climbing-support', 'powder-coated', 'adjustable', 'durable'],
    available: true,
  } as Accessory,
];

export function getProductsByCategory(category: ProductCategory): Product[] {
  return products.filter(p => p.category === category && p.available);
}

export function getProductById(id: string): Product | undefined {
  return products.find(p => p.id === id);
}

export interface KitLineItem {
  product: Product;
  /** Effective quantity applied from the kit-size multiplier (1 for accessories). */
  quantity: number;
  /** Unit price before the kit-size multiplier. */
  unitPrice: number;
  /** Final line total (unitPrice * quantity, rounded). */
  lineTotal: number;
}

export function getKitSizeMultiplier(kitSize: string): number {
  return kitSizes.find(k => k.id === kitSize)?.multiplier || 1;
}

/**
 * Single source of truth for kit pricing.
 * Seeds, soil, fertilizer and pest protection scale with the kit-size
 * multiplier; accessories are one-time additions at unit price.
 * Unknown product ids are ignored so totals can never become NaN.
 */
export function getKitLineItems(config: {
  seeds: string[];
  soil: string | null;
  fertilizer: string | null;
  pestProtection: string | null;
  accessories: string[];
  kitSize: string;
}): KitLineItem[] {
  const multiplier = getKitSizeMultiplier(config.kitSize);
  const items: KitLineItem[] = [];

  const pushScaled = (id: string | null) => {
    if (!id) return;
    const product = getProductById(id);
    if (product) items.push({
      product,
      quantity: multiplier,
      unitPrice: product.price,
      lineTotal: Math.round(product.price * multiplier),
    });
  };

  config.seeds.forEach(id => pushScaled(id));
  pushScaled(config.soil);
  pushScaled(config.fertilizer);
  pushScaled(config.pestProtection);

  config.accessories.forEach(id => {
    const product = getProductById(id);
    if (product) items.push({
      product,
      quantity: 1,
      unitPrice: product.price,
      lineTotal: product.price,
    });
  });

  return items;
}

export function calculateKitPrice(config: {
  seeds: string[];
  soil: string | null;
  fertilizer: string | null;
  pestProtection: string | null;
  accessories: string[];
  kitSize: string;
}): number {
  return getKitLineItems(config).reduce((sum, item) => sum + item.lineTotal, 0);
}

export function formatINR(amount: number): string {
  return `₹${Math.round(amount).toLocaleString('en-IN')}`;
}