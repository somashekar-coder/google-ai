import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { MenuItem, DishCategory } from '../types';
import { CATEGORIES_LIST } from '../data/initialMenu';
import { getDishImage } from '../utils/dishImages';
import {
  Search,
  Check,
  Plus,
  MessageCircle,
  ShoppingBag,
  Info,
  Flame,
  ArrowUpDown,
  Utensils,
  LayoutGrid,
  List,
  Sparkles,
  X,
  ExternalLink,
  ChevronRight,
  Eye
} from 'lucide-react';

export const DigitalMenu: React.FC = () => {
  const { menuItems, addToCart, cart, cartCount, cartSubtotal, settings, language, setIsCartOpen } = useApp();

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [vegFilter, setVegFilter] = useState<'all' | 'veg' | 'non-veg'>('all');
  const [priceRange, setPriceRange] = useState<'all' | 'under150' | '150-250' | 'above250'>('all');
  const [specialsOnly, setSpecialsOnly] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid'); // Desktop view toggle
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'default' | 'price-asc' | 'price-desc' | 'name-asc'>('default');
  const [selectedPortions, setSelectedPortions] = useState<Record<string, string>>({});
  const [addedItemEffect, setAddedItemEffect] = useState<string | null>(null);

  // Selected dish for popup preview modal
  const [previewDish, setPreviewDish] = useState<MenuItem | null>(null);

  // Compute category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    menuItems.forEach(item => {
      counts[item.category] = (counts[item.category] || 0) + 1;
    });
    return counts;
  }, [menuItems]);

  // Filtered and sorted menu items
  const filteredItems = useMemo(() => {
    let result = menuItems.filter((item) => {
      // Category filter
      if (selectedCategory !== 'all' && item.category !== selectedCategory) {
        return false;
      }
      // Veg/Non-Veg filter
      if (vegFilter === 'veg' && !item.isVegetarian) return false;
      if (vegFilter === 'non-veg' && item.isVegetarian) return false;

      // Specials only
      if (specialsOnly && !item.isSpecial) return false;

      // Price range filter
      if (priceRange === 'under150' && item.price >= 150) return false;
      if (priceRange === '150-250' && (item.price < 150 || item.price > 250)) return false;
      if (priceRange === 'above250' && item.price <= 250) return false;

      // Search query filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(query);
        const matchesTelugu = item.teluguName?.toLowerCase().includes(query);
        const matchesCat = item.categoryName.toLowerCase().includes(query);
        const matchesDesc = item.description?.toLowerCase().includes(query);
        return matchesName || matchesTelugu || matchesCat || matchesDesc;
      }
      return true;
    });

    if (sortBy === 'price-asc') {
      result = [...result].sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      result = [...result].sort((a, b) => b.price - a.price);
    } else if (sortBy === 'name-asc') {
      result = [...result].sort((a, b) => a.name.localeCompare(b.name));
    }

    return result;
  }, [menuItems, selectedCategory, vegFilter, specialsOnly, priceRange, searchQuery, sortBy]);

  const handlePortionSelect = (dishId: string, portionName: string) => {
    setSelectedPortions(prev => ({ ...prev, [dishId]: portionName }));
  };

  const handleAddToCart = (item: MenuItem) => {
    const chosenPortion = selectedPortions[item.id] || (item.portions ? item.portions[0].name : undefined);
    addToCart(item, chosenPortion);

    setAddedItemEffect(item.id);
    setTimeout(() => setAddedItemEffect(null), 1200);
  };

  const getItemPrice = (item: MenuItem) => {
    if (item.portions && item.portions.length > 0) {
      const selectedPortionName = selectedPortions[item.id] || item.portions[0].name;
      const matched = item.portions.find(p => p.name.toLowerCase() === selectedPortionName.toLowerCase());
      if (matched) return matched.price;
    }
    return item.price;
  };

  const getDirectWhatsAppUrl = (item: MenuItem) => {
    const chosenPortion = selectedPortions[item.id] || (item.portions ? item.portions[0].name : undefined);
    const price = getItemPrice(item);
    const text = `Hello TASTE OF Pulao's Shreyas Grand, I would like to order: ${item.name}${chosenPortion ? ` (${chosenPortion})` : ''} - ₹${price}. Please prepare for takeaway opposite Anantapur Railway Station.`;
    return `https://wa.me/${settings.primaryWhatsApp}?text=${encodeURIComponent(text)}`;
  };

  return (
    <section id="restaurant-menu" className="py-12 lg:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Section Header */}
        <div className="space-y-4 pb-6 border-b border-stone-200">
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-700 uppercase tracking-wider">
            <Utensils className="w-4 h-4 text-amber-600" />
            <span>TASTE OF PULAO&apos;S RESTAURANT</span>
            <span aria-hidden="true">·</span>
            <span>Opposite Anantapur Railway Station</span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
            <div>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900">
                {language === 'en' ? 'Digital Restaurant Menu' : 'డిజిటల్ రెస్టారెంట్ మెనూ'}
              </h2>
              <p className="text-stone-600 text-sm mt-1 max-w-2xl">
                Extracted faithfully from our printed menu · {menuItems.length} authentic dishes · High-definition food photos for every dish · Exact printed prices verified · Takeaway parcel &amp; dine-in available
              </p>
            </div>

            {/* Quick Action: Open Cart & View Mode Switcher (Desktop) */}
            <div className="flex flex-wrap items-center gap-3">
              {/* Desktop View Mode Toggle (Grid vs Compact List) */}
              <div className="hidden sm:flex items-center bg-stone-100 p-1 rounded-xl border border-stone-200">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    viewMode === 'grid'
                      ? 'bg-white text-stone-900 shadow-2xs'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                  title="Grid View (Cards with Photos)"
                >
                  <LayoutGrid className="w-3.5 h-3.5" />
                  <span>Grid</span>
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    viewMode === 'list'
                      ? 'bg-white text-stone-900 shadow-2xs'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                  title="List View (Compact Desktop Table)"
                >
                  <List className="w-3.5 h-3.5" />
                  <span>Compact List</span>
                </button>
              </div>

              {/* View Pickup Cart button */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold rounded-xl shadow-xs transition-colors cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>
                  {language === 'en' ? 'Pickup Cart' : 'ఆర్డర్ కార్ట్'}
                  {cartCount > 0 ? ` (${cartCount} items · ₹${cartSubtotal})` : ''}
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Horizontal Category Bar (shown on mobile / tablet) */}
        <div className="lg:hidden mt-6 space-y-3">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-colors shrink-0 ${
                selectedCategory === 'all'
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
              }`}
            >
              All Categories ({menuItems.length})
            </button>
            {CATEGORIES_LIST.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-colors shrink-0 ${
                  selectedCategory === cat.id
                    ? 'bg-amber-600 text-white shadow-xs'
                    : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                }`}
              >
                {cat.name} ({categoryCounts[cat.id] || 0})
              </button>
            ))}
          </div>
        </div>

        {/* Main Desktop Layout: Sidebar + Dishes Catalog */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Desktop Left Sidebar: Sticky Filters and Categories */}
          <aside className="hidden lg:block lg:col-span-3 space-y-6 sticky top-24 self-start max-h-[calc(100vh-7rem)] overflow-y-auto pr-1">
            {/* Category Navigation Card */}
            <div className="bg-stone-50 rounded-2xl border border-stone-200 p-4 space-y-3 shadow-2xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-stone-900 text-xs uppercase tracking-wider">
                  Menu Categories
                </span>
                <span className="text-[11px] font-mono text-stone-500">{menuItems.length} items</span>
              </div>

              <div className="space-y-1">
                <button
                  onClick={() => setSelectedCategory('all')}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-colors cursor-pointer text-left ${
                    selectedCategory === 'all'
                      ? 'bg-amber-600 text-white font-semibold shadow-xs'
                      : 'text-stone-700 hover:bg-stone-200/70'
                  }`}
                >
                  <span>All Dishes</span>
                  <span className={`text-[11px] px-1.5 py-0.2 rounded font-mono shrink-0 ${
                    selectedCategory === 'all' ? 'bg-amber-700 text-white' : 'text-stone-400'
                  }`}>
                    {menuItems.length}
                  </span>
                </button>

                {CATEGORIES_LIST.map((cat) => {
                  const count = categoryCounts[cat.id] || 0;
                  const isSelected = selectedCategory === cat.id;

                  return (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-colors cursor-pointer text-left ${
                        isSelected
                          ? 'bg-amber-600 text-white font-semibold shadow-xs'
                          : 'text-stone-700 hover:bg-stone-200/70'
                      }`}
                    >
                      <span className="truncate pr-2">{cat.name}</span>
                      <span className={`text-[11px] px-1.5 py-0.2 rounded font-mono shrink-0 ${
                        isSelected ? 'bg-amber-700 text-white' : 'text-stone-400'
                      }`}>
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Desktop Dietary Preference Card */}
            <div className="bg-stone-50 rounded-2xl border border-stone-200 p-4 space-y-2 text-xs shadow-2xs">
              <span className="font-bold text-stone-900 block uppercase tracking-wider text-[11px]">
                Dietary Filter
              </span>
              <div className="space-y-1">
                <button
                  onClick={() => setVegFilter('all')}
                  className={`w-full text-left px-3 py-2 rounded-lg transition-colors cursor-pointer flex items-center justify-between ${
                    vegFilter === 'all' ? 'bg-white font-bold text-stone-900 shadow-2xs' : 'text-stone-600 hover:bg-stone-200/60'
                  }`}
                >
                  <span>All Dishes</span>
                  <span className="text-[11px] font-mono text-stone-400">{menuItems.length}</span>
                </button>

                <button
                  onClick={() => setVegFilter('veg')}
                  className={`w-full text-left px-3 py-2 rounded-lg transition-colors cursor-pointer flex items-center justify-between ${
                    vegFilter === 'veg' ? 'bg-white font-bold text-emerald-800 shadow-2xs' : 'text-stone-600 hover:bg-stone-200/60'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-600" />
                    <span>Pure Vegetarian</span>
                  </span>
                  <span className="text-[11px] font-mono text-stone-400">
                    {menuItems.filter(m => m.isVegetarian).length}
                  </span>
                </button>

                <button
                  onClick={() => setVegFilter('non-veg')}
                  className={`w-full text-left px-3 py-2 rounded-lg transition-colors cursor-pointer flex items-center justify-between ${
                    vegFilter === 'non-veg' ? 'bg-white font-bold text-red-800 shadow-2xs' : 'text-stone-600 hover:bg-stone-200/60'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-red-600" />
                    <span>Non-Vegetarian</span>
                  </span>
                  <span className="text-[11px] font-mono text-stone-400">
                    {menuItems.filter(m => !m.isVegetarian).length}
                  </span>
                </button>
              </div>
            </div>

            {/* Desktop Price Range Filter */}
            <div className="bg-stone-50 rounded-2xl border border-stone-200 p-4 space-y-2 text-xs shadow-2xs">
              <span className="font-bold text-stone-900 block uppercase tracking-wider text-[11px]">
                Budget Filter
              </span>
              <div className="space-y-1">
                <button
                  onClick={() => setPriceRange('all')}
                  className={`w-full text-left px-3 py-1.5 rounded-lg transition-colors cursor-pointer flex items-center justify-between ${
                    priceRange === 'all' ? 'bg-white font-bold text-amber-900 shadow-2xs' : 'text-stone-600 hover:bg-stone-200/60'
                  }`}
                >
                  <span>Any Price</span>
                  <span className="text-[10px] text-stone-400">All</span>
                </button>
                <button
                  onClick={() => setPriceRange('under150')}
                  className={`w-full text-left px-3 py-1.5 rounded-lg transition-colors cursor-pointer flex items-center justify-between ${
                    priceRange === 'under150' ? 'bg-white font-bold text-amber-900 shadow-2xs' : 'text-stone-600 hover:bg-stone-200/60'
                  }`}
                >
                  <span>Under ₹150</span>
                  <span className="text-[10px] text-stone-400">Budget friendly</span>
                </button>
                <button
                  onClick={() => setPriceRange('150-250')}
                  className={`w-full text-left px-3 py-1.5 rounded-lg transition-colors cursor-pointer flex items-center justify-between ${
                    priceRange === '150-250' ? 'bg-white font-bold text-amber-900 shadow-2xs' : 'text-stone-600 hover:bg-stone-200/60'
                  }`}
                >
                  <span>₹150 – ₹250</span>
                  <span className="text-[10px] text-stone-400">Popular</span>
                </button>
                <button
                  onClick={() => setPriceRange('above250')}
                  className={`w-full text-left px-3 py-1.5 rounded-lg transition-colors cursor-pointer flex items-center justify-between ${
                    priceRange === 'above250' ? 'bg-white font-bold text-amber-900 shadow-2xs' : 'text-stone-600 hover:bg-stone-200/60'
                  }`}
                >
                  <span>Above ₹250</span>
                  <span className="text-[10px] text-stone-400">Premium / Combos</span>
                </button>
              </div>
            </div>

            {/* Desktop Active Cart Preview Widget (if cart has items) */}
            {cart.length > 0 && (
              <div className="bg-amber-50/90 rounded-2xl border border-amber-300 p-4 space-y-3 shadow-xs">
                <div className="flex items-center justify-between text-xs font-bold text-amber-950">
                  <span className="flex items-center gap-1.5">
                    <ShoppingBag className="w-4 h-4 text-amber-700" />
                    <span>Pickup Cart Active</span>
                  </span>
                  <span className="font-mono">{cartCount} items</span>
                </div>

                <div className="space-y-1.5 max-h-36 overflow-y-auto divide-y divide-amber-200/60 text-xs">
                  {cart.map(c => (
                    <div key={c.id} className="pt-1.5 first:pt-0 flex justify-between text-[11px] text-stone-700">
                      <span className="truncate pr-2">{c.name} x{c.quantity}</span>
                      <span className="font-bold text-stone-900 tabular-nums">₹{c.price * c.quantity}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-2 border-t border-amber-200 flex justify-between text-xs font-bold text-stone-900">
                  <span>Subtotal:</span>
                  <span className="tabular-nums text-amber-900">₹{cartSubtotal}</span>
                </div>

                <button
                  onClick={() => setIsCartOpen(true)}
                  className="w-full py-2 bg-amber-600 hover:bg-amber-700 text-white font-semibold text-xs rounded-lg transition-colors cursor-pointer shadow-xs"
                >
                  Proceed to Pickup Details
                </button>
              </div>
            )}
          </aside>

          {/* Catalog Right Column */}
          <div className="lg:col-span-9 space-y-6">
            {/* Desktop Search & Sort Filter Bar */}
            <div className="bg-stone-50 rounded-2xl border border-stone-200 p-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 shadow-2xs">
              {/* Search input */}
              <div className="relative flex-1">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                <input
                  type="text"
                  placeholder={language === 'en' ? 'Search dishes (e.g. Special Pulao, Kodi Vepudu, Dum Biryani)...' : 'డిష్ పేరుతో వెతకండి...'}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-16 py-2 bg-white border border-stone-200 rounded-lg text-xs text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500/30"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-stone-400 hover:text-stone-600 px-1"
                  >
                    Clear
                  </button>
                )}
              </div>

              {/* Chef's Special Toggle */}
              <button
                onClick={() => setSpecialsOnly(!specialsOnly)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold border transition-all cursor-pointer shrink-0 ${
                  specialsOnly
                    ? 'bg-amber-500 text-stone-950 border-amber-500 shadow-2xs'
                    : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-100'
                }`}
                title="Filter by Chef's Specials"
              >
                <Flame className={`w-3.5 h-3.5 ${specialsOnly ? 'fill-stone-950 text-stone-950' : 'text-amber-600'}`} />
                <span>Chef Specials</span>
              </button>

              {/* Sort Selector */}
              <div className="flex items-center gap-2 shrink-0">
                <ArrowUpDown className="w-3.5 h-3.5 text-stone-400" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="px-3 py-2 bg-white border border-stone-200 rounded-lg text-xs font-medium text-stone-700 focus:outline-none focus:ring-2 focus:ring-amber-500/20"
                >
                  <option value="default">Default Order</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="name-asc">Name: A to Z</option>
                </select>
              </div>
            </div>

            {/* Results Counter & Active Filter Pills */}
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-stone-500 px-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-semibold text-stone-800">
                  {selectedCategory === 'all'
                    ? 'All Menu Categories'
                    : CATEGORIES_LIST.find(c => c.id === selectedCategory)?.name || selectedCategory}
                </span>
                <span>·</span>
                <span className="font-mono text-stone-700 font-medium">{filteredItems.length} dishes available</span>

                {vegFilter !== 'all' && (
                  <span className="px-2 py-0.5 rounded-full bg-stone-200 text-stone-800 text-[11px] font-medium">
                    {vegFilter === 'veg' ? 'Pure Veg' : 'Non-Veg'}
                  </span>
                )}
                {specialsOnly && (
                  <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[11px] font-semibold">
                    Specials Only
                  </span>
                )}
                {priceRange !== 'all' && (
                  <span className="px-2 py-0.5 rounded-full bg-stone-200 text-stone-800 text-[11px]">
                    {priceRange === 'under150' ? '< ₹150' : priceRange === '150-250' ? '₹150-₹250' : '> ₹250'}
                  </span>
                )}
              </div>

              <span className="hidden sm:inline text-stone-400">
                Printed menu verified · Freshly cooked on order
              </span>
            </div>

            {/* Menu Items Rendering */}
            {filteredItems.length === 0 ? (
              <div className="py-16 text-center bg-stone-50 rounded-2xl border border-stone-200 space-y-3">
                <Utensils className="w-10 h-10 text-stone-300 mx-auto" />
                <p className="text-stone-700 font-medium text-sm">No dishes matched your filter criteria.</p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('all');
                    setVegFilter('all');
                    setPriceRange('all');
                    setSpecialsOnly(false);
                  }}
                  className="px-4 py-2 bg-amber-600 text-white text-xs font-semibold rounded-lg hover:bg-amber-700 transition-colors"
                >
                  Reset All Filters
                </button>
              </div>
            ) : viewMode === 'grid' ? (
              /* GRID VIEW: Responsive 1, 2, 3 or 4 columns with large food photos */
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5">
                {filteredItems.map((item) => {
                  const currentPrice = getItemPrice(item);
                  const selectedPortion = selectedPortions[item.id] || (item.portions ? item.portions[0].name : undefined);
                  const isAddedJustNow = addedItemEffect === item.id;
                  const dishPhoto = getDishImage(item);

                  return (
                    <div
                      key={item.id}
                      className={`bg-white rounded-2xl border overflow-hidden flex flex-col justify-between transition-all duration-300 shadow-xs group ${
                        item.isAvailable
                          ? 'border-stone-200 hover:border-amber-400 hover:shadow-lg'
                          : 'border-stone-200 bg-stone-50/60 opacity-60'
                      }`}
                    >
                      <div>
                        {/* Food Photograph on Each Card */}
                        <div
                          onClick={() => setPreviewDish(item)}
                          className="relative h-44 sm:h-48 overflow-hidden bg-stone-100 cursor-pointer"
                          title="Click to view full photo and details"
                        >
                          <img
                            src={dishPhoto}
                            alt={item.name}
                            loading="lazy"
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-500"
                            onError={(e) => {
                              e.currentTarget.src = getDishImage(item);
                            }}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-stone-950/15 to-transparent pointer-events-none" />

                          {/* Quick Zoom Preview Icon on Hover */}
                          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-stone-900/30 backdrop-blur-2xs">
                            <span className="p-2 bg-white/90 rounded-full text-stone-900 shadow-md">
                              <Eye className="w-4 h-4 text-amber-700" />
                            </span>
                          </div>

                          {/* Overlaid Badges on Image */}
                          <div className="absolute top-3 left-3 flex items-center gap-1.5 pointer-events-none">
                            {item.isVegetarian ? (
                              <span
                                className="w-5 h-5 bg-white/95 rounded-sm border-2 border-emerald-600 flex items-center justify-center shadow-xs"
                                title="Pure Vegetarian"
                              >
                                <span className="w-2.5 h-2.5 rounded-full bg-emerald-600" />
                              </span>
                            ) : (
                              <span
                                className="w-5 h-5 bg-white/95 rounded-sm border-2 border-red-600 flex items-center justify-center shadow-xs"
                                title="Non-Vegetarian"
                              >
                                <span className="w-2.5 h-2.5 rounded-full bg-red-600" />
                              </span>
                            )}
                            <span className="text-[10px] font-bold text-white bg-stone-900/80 px-2 py-0.5 rounded backdrop-blur-xs uppercase tracking-wider">
                              {item.categoryName}
                            </span>
                          </div>

                          <div className="absolute top-3 right-3 flex items-center gap-1 pointer-events-none">
                            {item.isSpecial && (
                              <span className="text-[10px] font-bold text-amber-950 bg-amber-400 px-2 py-0.5 rounded shadow-xs flex items-center gap-1">
                                <Flame className="w-3 h-3 text-amber-900 fill-amber-900" />
                                <span>Special</span>
                              </span>
                            )}
                            {item.isSpicy && (
                              <span className="text-[10px] font-bold text-white bg-red-600/90 px-1.5 py-0.5 rounded shadow-xs backdrop-blur-xs">
                                Spicy
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Dish Details Body */}
                        <div className="p-4 sm:p-5 pb-0 space-y-2">
                          <div>
                            <h3
                              onClick={() => setPreviewDish(item)}
                              className="font-serif font-bold text-stone-900 text-base sm:text-lg leading-snug hover:text-amber-700 transition-colors cursor-pointer"
                            >
                              {item.name}
                            </h3>
                            {language === 'te' && item.teluguName && (
                              <p className="text-amber-700 text-xs mt-0.5 font-medium">
                                {item.teluguName}
                              </p>
                            )}
                          </div>

                          {item.description && (
                            <p className="text-xs text-stone-500 line-clamp-2 leading-relaxed">
                              {item.description}
                            </p>
                          )}

                          {/* Portion Variation Selector (if available) */}
                          {item.portions && item.portions.length > 0 && (
                            <div className="pt-2 border-t border-stone-100 flex flex-wrap items-center gap-1.5 text-xs">
                              <span className="text-stone-500 text-[11px] font-medium">Portion:</span>
                              <div className="flex flex-wrap items-center gap-1">
                                {item.portions.map((portion) => (
                                  <button
                                    key={portion.name}
                                    onClick={() => handlePortionSelect(item.id, portion.name)}
                                    className={`px-2 py-0.5 rounded text-[11px] font-medium transition-colors cursor-pointer ${
                                      selectedPortion === portion.name
                                        ? 'bg-amber-600 text-white font-semibold shadow-2xs'
                                        : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                                    }`}
                                  >
                                    {portion.name} · ₹{portion.price}
                                  </button>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Card Bottom: Exact Price & Order Buttons */}
                      <div className="p-4 sm:p-5 pt-3 mt-3 border-t border-stone-100 flex items-center justify-between gap-3 bg-stone-50/50">
                        <div>
                          <span className="block text-xl font-bold text-stone-900 tabular-nums">
                            ₹{currentPrice}
                          </span>
                          <span className="text-[10px] text-stone-400">Verified Printed Price</span>
                        </div>

                        <div className="flex items-center gap-2">
                          {/* WhatsApp Direct Order Button */}
                          <a
                            href={getDirectWhatsAppUrl(item)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 text-emerald-700 hover:bg-emerald-50 rounded-lg border border-emerald-200 transition-colors"
                            title="Order this dish directly on WhatsApp"
                          >
                            <MessageCircle className="w-4 h-4" />
                          </a>

                          {/* Add to Cart Button */}
                          <button
                            onClick={() => handleAddToCart(item)}
                            disabled={!item.isAvailable}
                            className={`inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                              isAddedJustNow
                                ? 'bg-emerald-600 text-white'
                                : 'bg-amber-600 hover:bg-amber-700 text-white shadow-xs'
                            }`}
                          >
                            {isAddedJustNow ? (
                              <>
                                <Check className="w-3.5 h-3.5" />
                                <span>Added</span>
                              </>
                            ) : (
                              <>
                                <Plus className="w-3.5 h-3.5" />
                                <span>Add</span>
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              /* COMPACT LIST / TABLE VIEW: Highly efficient for desktop browsing */
              <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs divide-y divide-stone-100">
                {filteredItems.map((item) => {
                  const currentPrice = getItemPrice(item);
                  const selectedPortion = selectedPortions[item.id] || (item.portions ? item.portions[0].name : undefined);
                  const isAddedJustNow = addedItemEffect === item.id;
                  const dishPhoto = getDishImage(item);

                  return (
                    <div
                      key={item.id}
                      className="p-4 sm:px-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-stone-50/80 transition-colors"
                    >
                      {/* Left: Thumbnail & Dish Info */}
                      <div className="flex items-start sm:items-center gap-4 flex-1 min-w-0">
                        {/* Food Thumbnail with Veg Indicator */}
                        <div
                          onClick={() => setPreviewDish(item)}
                          className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden shrink-0 bg-stone-100 border border-stone-200 cursor-pointer group"
                        >
                          <img
                            src={dishPhoto}
                            alt={item.name}
                            loading="lazy"
                            className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-300"
                          />
                          <div className="absolute top-1.5 left-1.5">
                            {item.isVegetarian ? (
                              <span className="w-4 h-4 bg-white/95 rounded-xs border-2 border-emerald-600 flex items-center justify-center">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                              </span>
                            ) : (
                              <span className="w-4 h-4 bg-white/95 rounded-xs border-2 border-red-600 flex items-center justify-center">
                                <span className="w-1.5 h-1.5 rounded-full bg-red-600" />
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Text info */}
                        <div className="space-y-1 min-w-0 flex-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <h3
                              onClick={() => setPreviewDish(item)}
                              className="font-serif font-bold text-stone-900 text-base sm:text-lg hover:text-amber-700 transition-colors cursor-pointer truncate"
                            >
                              {item.name}
                            </h3>
                            <span className="text-[10px] font-semibold text-stone-500 bg-stone-100 px-2 py-0.5 rounded">
                              {item.categoryName}
                            </span>
                            {item.isSpecial && (
                              <span className="text-[10px] font-bold text-amber-950 bg-amber-400 px-2 py-0.5 rounded flex items-center gap-1">
                                <Flame className="w-2.5 h-2.5 text-amber-900 fill-amber-900" />
                                <span>Special</span>
                              </span>
                            )}
                          </div>

                          {language === 'te' && item.teluguName && (
                            <p className="text-amber-700 text-xs font-medium">
                              {item.teluguName}
                            </p>
                          )}

                          {item.description && (
                            <p className="text-xs text-stone-500 line-clamp-1">
                              {item.description}
                            </p>
                          )}

                          {/* Portions */}
                          {item.portions && item.portions.length > 0 && (
                            <div className="pt-1 flex flex-wrap items-center gap-1.5">
                              {item.portions.map((p) => (
                                <button
                                  key={p.name}
                                  onClick={() => handlePortionSelect(item.id, p.name)}
                                  className={`px-2 py-0.5 rounded text-[10px] font-medium transition-colors cursor-pointer ${
                                    selectedPortion === p.name
                                      ? 'bg-amber-600 text-white font-bold'
                                      : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                                  }`}
                                >
                                  {p.name} · ₹{p.price}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Right: Price & Quick Order Actions */}
                      <div className="flex items-center justify-between sm:justify-end gap-5 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-stone-100">
                        <div className="text-left sm:text-right">
                          <span className="block font-bold text-lg sm:text-xl text-stone-900 tabular-nums">
                            ₹{currentPrice}
                          </span>
                          <span className="text-[10px] text-stone-400">Printed price</span>
                        </div>

                        <div className="flex items-center gap-2">
                          <a
                            href={getDirectWhatsAppUrl(item)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 text-emerald-700 hover:bg-emerald-50 rounded-lg border border-emerald-200 transition-colors"
                            title="Order via WhatsApp"
                          >
                            <MessageCircle className="w-4 h-4" />
                          </a>

                          <button
                            onClick={() => handleAddToCart(item)}
                            disabled={!item.isAvailable}
                            className={`inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                              isAddedJustNow
                                ? 'bg-emerald-600 text-white'
                                : 'bg-amber-600 hover:bg-amber-700 text-white shadow-xs'
                            }`}
                          >
                            {isAddedJustNow ? (
                              <>
                                <Check className="w-3.5 h-3.5" />
                                <span>Added</span>
                              </>
                            ) : (
                              <>
                                <Plus className="w-3.5 h-3.5" />
                                <span>Add to Cart</span>
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* DISH DETAIL LIGHTBOX MODAL (Large Desktop Popup View) */}
      {previewDish && (
        <div
          className="fixed inset-0 z-50 bg-stone-950/70 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setPreviewDish(null)}
        >
          <div
            className="bg-white rounded-3xl overflow-hidden max-w-2xl w-full border border-stone-200 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setPreviewDish(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-stone-900/60 hover:bg-stone-900 text-white transition-colors"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>

            {/* High-definition Food Image */}
            <div className="relative h-72 sm:h-80 bg-stone-100">
              <img
                src={getDishImage(previewDish)}
                alt={previewDish.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent" />

              <div className="absolute bottom-4 left-6 right-6 text-white space-y-1">
                <div className="flex items-center gap-2">
                  {previewDish.isVegetarian ? (
                    <span className="w-5 h-5 bg-white rounded-sm border-2 border-emerald-600 flex items-center justify-center">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-600" />
                    </span>
                  ) : (
                    <span className="w-5 h-5 bg-white rounded-sm border-2 border-red-600 flex items-center justify-center">
                      <span className="w-2.5 h-2.5 rounded-full bg-red-600" />
                    </span>
                  )}
                  <span className="text-xs font-semibold uppercase tracking-wider bg-stone-900/80 px-2.5 py-0.5 rounded backdrop-blur-xs">
                    {previewDish.categoryName}
                  </span>
                  {previewDish.isSpecial && (
                    <span className="text-xs font-bold bg-amber-400 text-stone-950 px-2.5 py-0.5 rounded flex items-center gap-1">
                      <Flame className="w-3 h-3 text-amber-900 fill-amber-900" />
                      <span>Chef's Special</span>
                    </span>
                  )}
                </div>

                <h3 className="font-serif text-2xl sm:text-3xl font-bold">
                  {previewDish.name}
                </h3>
                {language === 'te' && previewDish.teluguName && (
                  <p className="text-amber-300 text-sm">{previewDish.teluguName}</p>
                )}
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6 sm:p-8 space-y-6">
              {previewDish.description && (
                <p className="text-stone-600 text-sm leading-relaxed">
                  {previewDish.description}
                </p>
              )}

              {/* Portion Selector if available */}
              {previewDish.portions && previewDish.portions.length > 0 && (
                <div className="space-y-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-stone-700 block">
                    Choose Portion Size:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {previewDish.portions.map((p) => {
                      const isSelected = (selectedPortions[previewDish.id] || previewDish.portions![0].name) === p.name;
                      return (
                        <button
                          key={p.name}
                          onClick={() => handlePortionSelect(previewDish.id, p.name)}
                          className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-amber-600 text-white shadow-xs'
                              : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                          }`}
                        >
                          {p.name} · ₹{p.price}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 text-xs text-stone-500 space-y-1">
                <div className="flex items-center gap-1.5 text-stone-700 font-semibold">
                  <Info className="w-3.5 h-3.5 text-amber-600" />
                  <span>Printed Menu Source Verified</span>
                </div>
                <p>
                  Dish extracted from actual printed menu opposite Anantapur Railway Station. Clean kitchen preparation with genuine spices.
                </p>
              </div>

              {/* Modal Actions */}
              <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-stone-200">
                <div>
                  <span className="block text-2xl font-bold text-stone-900 tabular-nums">
                    ₹{getItemPrice(previewDish)}
                  </span>
                  <span className="text-[11px] text-stone-400">All taxes included</span>
                </div>

                <div className="flex items-center gap-3">
                  <a
                    href={getDirectWhatsAppUrl(previewDish)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs rounded-xl shadow-xs transition-colors"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Order on WhatsApp</span>
                  </a>

                  <button
                    onClick={() => {
                      handleAddToCart(previewDish);
                      setPreviewDish(null);
                    }}
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-amber-600 hover:bg-amber-700 text-white font-semibold text-xs rounded-xl shadow-xs transition-colors cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add to Cart</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
