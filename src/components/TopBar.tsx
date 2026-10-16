import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Phone, MessageCircle, ShoppingBag, QrCode, Globe, Menu, X, ShieldAlert } from 'lucide-react';

export const TopBar: React.FC = () => {
  const {
    settings,
    cartCount,
    setIsCartOpen,
    language,
    toggleLanguage,
    activeTab,
    setActiveTab,
    setIsQRModalOpen
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: language === 'en' ? 'Home' : 'హోమ్' },
    { id: 'menu', label: language === 'en' ? 'Restaurant Menu' : 'మెనూ' },
    { id: 'hotel', label: language === 'en' ? 'Hotel Rooms' : 'హోటల్ రూమ్స్' },
    { id: 'loyalty', label: language === 'en' ? 'Food Club' : 'ఫుడ్ క్లబ్' },
    { id: 'reviews', label: language === 'en' ? 'Reviews' : 'రివ్యూలు' },
    { id: 'contact', label: language === 'en' ? 'Location' : 'లొకేషన్' },
    { id: 'admin', label: 'Admin', icon: ShieldAlert }
  ] as const;

  const handleNavClick = (tabId: typeof activeTab) => {
    setActiveTab(tabId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200">
      {/* Top Utility Contact Bar */}
      <div className="bg-stone-900 text-stone-300 text-xs py-1.5 px-4 sm:px-8 border-b border-stone-800">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-4 text-stone-300">
            <span className="hidden sm:inline text-amber-400 font-medium">Opposite Railway Station, Anantapur</span>
            <span className="hidden md:inline text-stone-500">|</span>
            <span className="hidden md:inline">Open: 10:00 AM – 10:00 PM</span>
          </div>

          <div className="flex items-center gap-4 ml-auto">
            {/* Primary WhatsApp */}
            <a
              href={`https://wa.me/${settings.primaryWhatsApp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 transition-colors font-medium whitespace-nowrap"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp: {settings.primaryPhone}</span>
            </a>

            {/* Secondary Contact Number */}
            <a
              href={`tel:${settings.secondaryPhone.replace(/\s+/g, '')}`}
              className="inline-flex items-center gap-1.5 text-stone-300 hover:text-amber-400 transition-colors whitespace-nowrap"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Tel: {settings.secondaryPhone}</span>
            </a>

            {/* Language Switcher */}
            <button
              onClick={toggleLanguage}
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs bg-stone-800 hover:bg-stone-700 text-amber-300 transition-colors ml-2"
              title="Toggle Telugu / English"
            >
              <Globe className="w-3 h-3" />
              <span>{language === 'en' ? 'తెలుగు' : 'English'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Top Navigation Bar (Top Bar Contract: 3 Zones) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3.5 flex items-center justify-between gap-6">
        {/* Zone 1: Brand Wordmark */}
        <button
          onClick={() => handleNavClick('home')}
          className="text-left whitespace-nowrap shrink-0 group focus:outline-none"
        >
          <span className="block font-serif text-xl sm:text-2xl font-bold tracking-tight text-stone-900 group-hover:text-amber-700 transition-colors">
            TASTE OF Pulao&apos;s
          </span>
          <span className="block text-xs font-sans uppercase tracking-widest text-amber-600 font-semibold">
            Shreyas Grand · Hotel &amp; Restaurant
          </span>
        </button>

        {/* Zone 2: Navigation Links (Single-line, quiet hover) */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-stone-700">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`transition-colors whitespace-nowrap py-1 relative ${
                activeTab === item.id
                  ? 'text-amber-700 font-semibold'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              {item.label}
              {activeTab === item.id && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-amber-600 rounded-full" />
              )}
            </button>
          ))}
        </nav>

        {/* Zone 3: Primary Action & Controls */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Printable QR Code Menu Button */}
          <button
            onClick={() => setIsQRModalOpen(true)}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors whitespace-nowrap"
            title="Scan or print QR code menu"
          >
            <QrCode className="w-4 h-4 text-stone-600" />
            <span>QR Menu</span>
          </button>

          {/* Quick WhatsApp Order */}
          <a
            href={`https://wa.me/${settings.primaryWhatsApp}?text=Hello%20TASTE%20OF%20Pulao's%20Shreyas%20Grand,%20I%20would%20like%20to%20order%20food`}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-sm transition-colors whitespace-nowrap"
          >
            <MessageCircle className="w-4 h-4" />
            <span>WhatsApp Order</span>
          </a>

          {/* Cart Trigger */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-white bg-amber-600 hover:bg-amber-700 rounded-lg shadow-sm transition-colors whitespace-nowrap"
            aria-label="View shopping cart"
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="hidden sm:inline">{language === 'en' ? 'Cart' : 'కార్ట్'}</span>
            {cartCount > 0 && (
              <span className="inline-flex items-center justify-center bg-stone-900 text-white text-[10px] font-bold rounded-full h-4 min-w-[16px] px-1 tabular-nums">
                {cartCount}
              </span>
            )}
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-stone-700 hover:text-stone-900 rounded-lg hover:bg-stone-100 focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-stone-200 bg-white px-4 py-4 space-y-2 shadow-lg">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                activeTab === item.id
                  ? 'bg-amber-50 text-amber-800 font-semibold'
                  : 'text-stone-700 hover:bg-stone-50'
              }`}
            >
              {item.label}
            </button>
          ))}

          <div className="pt-3 border-t border-stone-100 flex flex-col gap-2">
            <button
              onClick={() => {
                setIsQRModalOpen(true);
                setMobileMenuOpen(false);
              }}
              className="flex items-center justify-center gap-2 w-full py-2.5 bg-stone-100 text-stone-800 text-xs font-semibold rounded-lg"
            >
              <QrCode className="w-4 h-4" />
              <span>Printable QR Code Menu</span>
            </button>

            <a
              href={`https://wa.me/${settings.primaryWhatsApp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-2.5 bg-emerald-600 text-white text-xs font-semibold rounded-lg"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Order via WhatsApp (+91 95535 55847)</span>
            </a>

            <a
              href={`tel:${settings.primaryPhone.replace(/\s+/g, '')}`}
              className="flex items-center justify-center gap-2 w-full py-2.5 bg-amber-600 text-white text-xs font-semibold rounded-lg"
            >
              <Phone className="w-4 h-4" />
              <span>Call Front Desk ({settings.primaryPhone})</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
