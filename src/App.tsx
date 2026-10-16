import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { TopBar } from './components/TopBar';
import { Hero } from './components/Hero';
import { TodaysSpecial } from './components/TodaysSpecial';
import { DigitalMenu } from './components/DigitalMenu';
import { HotelSection } from './components/HotelSection';
import { GallerySection } from './components/GallerySection';
import { LocationSection } from './components/LocationSection';
import { ReviewsSection } from './components/ReviewsSection';
import { LoyaltySection } from './components/LoyaltySection';
import { CartDrawer } from './components/CartDrawer';
import { LeadPopup } from './components/LeadPopup';
import { QRCodeModal } from './components/QRCodeModal';
import { AdminDashboard } from './components/AdminDashboard';
import { Footer } from './components/Footer';
import { MessageCircle, Phone, ArrowUp } from 'lucide-react';

const MainLayout: React.FC = () => {
  const { activeTab, settings } = useApp();

  return (
    <div className="min-h-screen flex flex-col bg-stone-50 text-stone-900 font-sans selection:bg-amber-200">
      {/* Top Bar with 3-zone contract, contact numbers & language switcher */}
      <TopBar />

      {/* Main Views */}
      <main className="flex-1">
        {activeTab === 'admin' ? (
          <AdminDashboard />
        ) : activeTab === 'menu' ? (
          <div className="pt-2">
            <TodaysSpecial />
            <DigitalMenu />
          </div>
        ) : activeTab === 'hotel' ? (
          <div className="pt-2">
            <HotelSection />
            <LocationSection />
          </div>
        ) : activeTab === 'reviews' ? (
          <div className="pt-6">
            <ReviewsSection />
          </div>
        ) : activeTab === 'gallery' ? (
          <div className="pt-6">
            <GallerySection />
          </div>
        ) : activeTab === 'loyalty' ? (
          <div className="pt-6">
            <LoyaltySection />
          </div>
        ) : activeTab === 'contact' ? (
          <div className="pt-6">
            <LocationSection />
          </div>
        ) : (
          /* Default Full Home View */
          <>
            <Hero />
            <TodaysSpecial />
            <DigitalMenu />
            <HotelSection />
            <GallerySection />
            <ReviewsSection />
            <LoyaltySection />
            <LocationSection />
          </>
        )}
      </main>

      {/* Modals & Overlays */}
      <CartDrawer />
      <LeadPopup />
      <QRCodeModal />

      {/* Persistent Floating WhatsApp & Call Buttons (Mobile & Desktop) */}
      {activeTab !== 'admin' && (
        <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-2.5">
          {/* Quick Call Button */}
          <a
            href={`tel:${settings.primaryPhone.replace(/\s+/g, '')}`}
            className="p-3 bg-stone-900 hover:bg-stone-800 text-white rounded-full shadow-lg hover:shadow-xl transition-all"
            title="Call Front Desk"
          >
            <Phone className="w-5 h-5 text-amber-400" />
          </a>

          {/* WhatsApp Order Now Button */}
          <a
            href={`https://wa.me/${settings.primaryWhatsApp}?text=Hello%20TASTE%20OF%20Pulao's%20Shreyas%20Grand,%20I%20would%20like%20to%20order%20food`}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2.5 px-4 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-full shadow-xl hover:shadow-2xl transition-all hover:scale-102"
            title="Order via WhatsApp"
          >
            <MessageCircle className="w-5 h-5 fill-white text-emerald-600" />
            <span className="hidden sm:inline">WhatsApp Order Now</span>
          </a>
        </div>
      )}

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}
