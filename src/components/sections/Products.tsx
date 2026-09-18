'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { products, getProductsByCategory, ProductCategory } from '@/data/products';
import { useKitBuilder } from '@/components/kit-builder/KitBuilderContext';
import { useToast } from '@/components/ui/Toast';
import { Card } from '@/components/ui';
import { Button } from '@/components/ui';
import { Plus, Check, ShoppingBag, Search, X, ArrowRight } from 'lucide-react';
import { clsx } from 'clsx';

const categories: { id: ProductCategory; label: string; icon: string }[] = [
  { id: 'seeds', label: 'Seeds', icon: '🌱' },
  { id: 'soil', label: 'Soil', icon: '🌿' },
  { id: 'fertilizer', label: 'Fertilizers', icon: '💚' },
  { id: 'pest-protection', label: 'Plant Protection', icon: '🛡️' },
  { id: 'accessories', label: 'Accessories', icon: '🔧' },
];

export function Products() {
  const [activeCategory, setActiveCategory] = useState<ProductCategory>('seeds');
  const [searchQuery, setSearchQuery] = useState('');
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const filteredProducts = products.filter((p) => {
    if (p.category !== activeCategory) return false;
    if (!p.available) return false;
    if (searchQuery && !p.name.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !p.description.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !p.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))) {
      return false;
    }
    return true;
  });

  return (
    <section id="products" ref={ref} className="section bg-bg-primary">
      <div className="container-main">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: isInView ? 0.1 : 0 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-pale text-green-primary text-sm font-medium mb-4">
            <ShoppingBag className="w-4 h-4" aria-hidden="true" />
            Our Products
          </span>
          <h2 className="section-title">Everything You Need to Grow</h2>
          <p className="section-subtitle mx-auto">
            Curated organic inputs for every stage of your growing journey. Each product is selected for quality and effectiveness.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: isInView ? 0.2 : 0 }}
          className="mb-8 flex flex-wrap items-center justify-center gap-2"
          role="tablist"
          aria-label="Product categories"
        >
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              role="tab"
              aria-selected={activeCategory === cat.id}
              aria-controls={`panel-${cat.id}`}
              id={`tab-${cat.id}`}
              className={clsx(
                'px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 active:scale-95',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2',
                activeCategory === cat.id
                  ? 'bg-green-primary text-white shadow-md'
                  : 'bg-white text-green-700 border border-green-200 hover:border-green-300 hover:shadow-sm hover:bg-green-50 hover:-translate-y-0.5'
              )}
            >
              <span className="flex items-center gap-2">
                <span aria-hidden="true">{cat.icon}</span>
                {cat.label}
              </span>
            </button>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: isInView ? 0.3 : 0 }}
          className="mb-8 max-w-xl mx-auto"
        >
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-green-400" aria-hidden="true" />
            <input
              type="search"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-green-200 bg-white text-green-900 placeholder-green-400 focus:outline-none focus:ring-2 focus:ring-green-600/20 focus:border-green-600"
              aria-label="Search products"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded-lg text-green-400 hover:text-green-600 hover:bg-green-100"
                aria-label="Clear search"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            role="tabpanel"
            id={`panel-${activeCategory}`}
            aria-labelledby={`tab-${activeCategory}`}
          >
            {filteredProducts.map((product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                index={index}
                isInView={isInView}
              />
            ))}
            {filteredProducts.length === 0 && (
              <motion.div
                className="col-span-full text-center py-16"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <Search className="w-12 h-12 mx-auto text-green-300 mb-4" aria-hidden="true" />
                <p className="text-green-500">No products found matching your search.</p>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: isInView ? 0.5 : 0 }}
          className="mt-12 text-center"
        >
          <Button variant="outline" size="lg" rightIcon={<ArrowRight className="w-4 h-4" />}>
            View All Products
          </Button>
        </motion.div>
      </div>
    </section>
  );
}

interface ProductCardProps {
  product: ReturnType<typeof getProductsByCategory>[0];
  index: number;
  isInView: boolean;
}

function ProductCard({ product, index, isInView }: ProductCardProps) {
  const [hovered, setHovered] = useState(false);
  const { config, toggleSeed, setSoil, setFertilizer, setPestProtection, toggleAccessory } = useKitBuilder();
  const { addToast } = useToast();

  const isInKit =
    product.category === 'seeds' ? config.seeds.includes(product.id)
    : product.category === 'soil' ? config.soil === product.id
    : product.category === 'fertilizer' ? config.fertilizer === product.id
    : product.category === 'pest-protection' ? config.pestProtection === product.id
    : config.accessories.includes(product.id);

  const scrollToBuilder = () => {
    document.querySelector('#build-your-kit')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleAdd = () => {
    switch (product.category) {
      case 'seeds':
        toggleSeed(product.id);
        break;
      case 'soil':
        setSoil(config.soil === product.id ? null : product.id);
        break;
      case 'fertilizer':
        setFertilizer(config.fertilizer === product.id ? null : product.id);
        break;
      case 'pest-protection':
        setPestProtection(config.pestProtection === product.id ? null : product.id);
        break;
      case 'accessories':
        toggleAccessory(product.id);
        break;
    }
    if (isInKit) {
      addToast({ type: 'info', title: 'Removed from kit', message: product.name });
    } else {
      addToast({ type: 'success', title: 'Added to your kit', message: product.name });
      scrollToBuilder();
    }
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 22, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ delay: Math.min(index * 0.05, 0.3), duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
      whileHover={{ y: -6 }}
      whileTap={{ scale: 0.99 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="group will-change-transform"
    >
      <Card variant="product" padding="none" className="h-full flex flex-col overflow-hidden transition-shadow duration-300 group-hover:shadow-[0_24px_48px_-12px_rgb(0_0_0/0.14)] group-hover:border-green-200">
        <div className="relative aspect-square overflow-hidden bg-green-pale">
          <div
            className="absolute inset-0 bg-gradient-to-br from-green-100/50 to-amber-100/50 transition-transform duration-500 ease-out group-hover:scale-110"
            aria-hidden="true"
          />
          <motion.div
            className="relative z-10 h-full flex items-center justify-center p-6"
            animate={hovered ? { y: -8, rotate: -4, scale: 1.1 } : { y: 0, rotate: 0, scale: 1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 18 }}
          >
            <span className="text-6xl drop-shadow-sm" aria-hidden="true" role="img" aria-label={product.name}>
              {getProductEmoji(product.category)}
            </span>
          </motion.div>
          <div className="absolute top-3 right-3">
            <span className={clsx(
              'px-2 py-1 rounded-full text-xs font-medium transition-all duration-300',
              'opacity-0 group-hover:opacity-100 -translate-y-1 group-hover:translate-y-0',
              getCategoryBadgeStyle(product.category)
            )}>
              {getCategoryLabel(product.category)}
            </span>
          </div>
        </div>

        <div className="p-5 flex-1 flex flex-col">
          <p className="text-[11px] font-semibold uppercase tracking-widest text-green-500">
            {getCategoryLabel(product.category)}
          </p>
          <h3 className="mt-1 font-semibold text-green-deep group-hover:text-green-primary transition-colors">
            {product.name}
          </h3>
          <p className="mt-2 text-sm text-green-600 line-clamp-2 flex-1">{product.description}</p>

          <div className="mt-3 flex flex-wrap gap-1.5">
            {product.tags.slice(0, 3).map((tag) => (
              <span key={tag} className="px-2 py-0.5 text-xs bg-green-pale text-green-700 rounded-full">
                {tag}
              </span>
            ))}
          </div>

          <div className="mt-4 pt-4 border-t border-green-100 flex items-center justify-between">
            <div>
              <span className="text-lg font-bold text-green-800">₹{product.price}</span>
              <span className="ml-2 text-sm text-green-500">/ {product.size}</span>
            </div>
            <Button
              size="sm"
              variant={isInKit ? 'primary' : 'outline'}
              onClick={handleAdd}
              leftIcon={isInKit
                ? <Check className="w-4 h-4" />
                : <Plus className="w-4 h-4 transition-transform duration-300 group-hover:rotate-90" />}
              className="opacity-100 sm:opacity-0 sm:group-hover:opacity-100 sm:group-focus-within:opacity-100 focus-visible:opacity-100 transition-all duration-300 sm:translate-x-2 sm:group-hover:translate-x-0"
              aria-label={isInKit ? `Remove ${product.name} from kit` : `Add ${product.name} to kit`}
              aria-pressed={isInKit}
            >
              {isInKit ? 'In Kit' : 'Add'}
            </Button>
          </div>
        </div>
      </Card>
    </motion.article>
  );
}

function getProductEmoji(category: ProductCategory): string {
  switch (category) {
    case 'seeds': return '🌱';
    case 'soil': return '🌿';
    case 'fertilizer': return '💚';
    case 'pest-protection': return '🛡️';
    case 'accessories': return '🔧';
    default: return '🌱';
  }
}

function getCategoryLabel(category: ProductCategory): string {
  switch (category) {
    case 'seeds': return 'Seeds';
    case 'soil': return 'Soil';
    case 'fertilizer': return 'Fertilizer';
    case 'pest-protection': return 'Protection';
    case 'accessories': return 'Accessory';
    default: return 'Product';
  }
}

function getCategoryBadgeStyle(category: ProductCategory): string {
  switch (category) {
    case 'seeds': return 'bg-green-100 text-green-700';
    case 'soil': return 'bg-amber-100 text-amber-700';
    case 'fertilizer': return 'bg-emerald-100 text-emerald-700';
    case 'pest-protection': return 'bg-lime-100 text-lime-700';
    case 'accessories': return 'bg-gray-100 text-gray-700';
    default: return 'bg-green-100 text-green-700';
  }
}