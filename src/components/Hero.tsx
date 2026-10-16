import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Utensils, Bed, MapPin, Phone, MessageCircle, ArrowRight, ShieldCheck, Clock, Calendar, Users, Search } from 'lucide-react';

export const Hero: React.FC = () => {
  const { settings, setActiveTab, hotelRooms, language } = useApp();

  // Desktop quick reservation bar state
  const [quickCheckIn, setQuickCheckIn] = useState(() => new Date().toISOString().split('T')[0]);
  const [quickGuests, setQuickGuests] = useState('2');
  const [quickRoomType, setQuickRoomType] = useState('room-exec-ac');

  const handleQuickEnquiry = (e: React.FormEvent) => {
    e.preventDefault();
    setActiveTab('hotel');
    const el = document.getElementById('reservation-form');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative bg-gradient-to-b from-amber-50/70 via-stone-50 to-white pt-8 pb-16 lg:py-20 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Split Hero: Content Left, Visual Showcase Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Heading & Value Proposition */}
          <div className="lg:col-span-7 space-y-6">
            {/* Location & Trust Tagline */}
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-100/80 border border-amber-300/80 rounded-full text-xs font-semibold text-amber-800 uppercase tracking-wider">
              <MapPin className="w-3.5 h-3.5 text-amber-700 shrink-0" />
              <span>Opposite Anantapur Railway Station · Srinivas Nagar</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold text-stone-900 tracking-tight leading-[1.12]">
              {language === 'en' ? (
                <>
                  Welcome to <span className="text-amber-600">TASTE OF Pulao&apos;s</span> Shreyas Grand
                </>
              ) : (
                <>
                  <span className="text-amber-600">టేస్ట్ ఆఫ్ పులావ్స్</span> శ్రేయస్ గ్రాండ్‌కు స్వాగతం
                </>
              )}
            </h1>

            {/* Supporting Headline */}
            <p className="text-lg sm:text-xl lg:text-2xl font-medium text-stone-800">
              {language === 'en'
                ? 'Comfortable Stays. Delicious Food. Memorable Experiences.'
                : 'సౌకర్యవంతమైన బస. రుచికరమైన ఆహారం. మరపురాని ఆతిథ్యం.'}
            </p>

            {/* Detailed Description */}
            <p className="text-stone-600 text-sm sm:text-base leading-relaxed max-w-2xl">
              {language === 'en'
                ? 'Discover welcoming hospitality and delicious dining at TASTE OF Pulao’s Shreyas Grand, conveniently located opposite Anantapur Railway Station. Serving authentic Rayalaseema pulaos, slow-dum biryanis, tandoori starters, and offering clean AC/Non-AC rooms for railway commuters, tourists, and families.'
                : 'అనంతపురం రైల్వే స్టేషన్ ఎదురుగా ఉన్న టేస్ట్ ఆఫ్ పులావ్స్ శ్రేయస్ గ్రాండ్‌లో రుచికరమైన రాయలసీమ పులావ్‌లు, దమ్ బిర్యానీలు, తందూరి స్టార్టర్లు మరియు అత్యుత్తమ ఏసీ/నాన్-ఏసీ హోటల్ గదులను ఆస్వాదించండి.'}
            </p>

            {/* Three Prominent Required Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-3.5">
              <button
                onClick={() => {
                  setActiveTab('menu');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded-xl shadow-sm hover:shadow transition-all whitespace-nowrap text-sm cursor-pointer"
              >
                <Utensils className="w-4 h-4" />
                <span>{language === 'en' ? 'Explore Our Menu' : 'మా మెనూ చూడండి'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => {
                  setActiveTab('hotel');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-stone-900 hover:bg-stone-800 text-white font-semibold rounded-xl shadow-sm hover:shadow transition-all whitespace-nowrap text-sm cursor-pointer"
              >
                <Bed className="w-4 h-4" />
                <span>{language === 'en' ? 'Explore Hotel Rooms' : 'హోటల్ రూమ్స్ చూడండి'}</span>
              </button>

              <a
                href="https://www.google.com/maps/search/?api=1&query=13-2-754%2F756%2C+Opposite+Railway+Station%2C+Srinivas+Nagar%2C+Anantapur%2C+Andhra+Pradesh+515001"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3.5 bg-white border border-stone-300 hover:border-stone-400 text-stone-800 font-semibold rounded-xl shadow-2xs hover:bg-stone-50 transition-all whitespace-nowrap text-sm"
              >
                <MapPin className="w-4 h-4 text-amber-600" />
                <span>{language === 'en' ? 'Get Directions' : 'దారి మార్గం'}</span>
              </a>
            </div>

            {/* Direct Contact & WhatsApp Ordering Action Strip */}
            <div className="pt-4 border-t border-stone-200/80 flex flex-wrap items-center gap-6 text-sm text-stone-600">
              <a
                href={`https://wa.me/${settings.primaryWhatsApp}?text=Hello%20TASTE%20OF%20Pulao's%20Shreyas%20Grand,%20I%20would%20like%20to%20place%20an%20order`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-semibold text-emerald-700 hover:text-emerald-800"
              >
                <MessageCircle className="w-4 h-4 text-emerald-600" />
                <span>WhatsApp Order: +91 95535 55847</span>
              </a>

              <a
                href={`tel:${settings.secondaryPhone.replace(/\s+/g, '')}`}
                className="inline-flex items-center gap-2 text-stone-700 hover:text-stone-900"
              >
                <Phone className="w-4 h-4 text-amber-600" />
                <span>Call Front Desk: +91 95535 55856</span>
              </a>
            </div>
          </div>

          {/* Right Column: Hero Visual Asset Showcase (Desktop Balanced Presentation) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="relative rounded-2xl overflow-hidden shadow-xl border border-amber-200/60 bg-stone-100 group">
              <img
                src="/src/assets/images/hero_pulao_spread_1792134326469.jpg"
                alt="Signature Andhra Chicken Pulao spread at TASTE OF Pulao's Shreyas Grand"
                className="w-full h-80 sm:h-96 lg:h-[420px] object-cover transform group-hover:scale-102 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-stone-950/25 to-transparent flex flex-col justify-end p-6 text-white">
                <span className="text-amber-400 text-xs font-bold uppercase tracking-wider">
                  Signature Specialty
                </span>
                <h3 className="font-serif text-2xl font-bold mt-1 text-white">
                  Special Shreyas Chicken Pulao
                </h3>
                <p className="text-stone-200 text-xs mt-1">
                  Cooked with desi ghee, fragrant basmati, succulent marinated chicken &amp; roasted cashews.
                </p>
                <div className="mt-3 flex items-center justify-between text-xs pt-3 border-t border-white/20">
                  <span className="font-semibold text-amber-300">Exact Menu Price: ₹290</span>
                  <span className="text-stone-300">Open 10:00 AM – 10:00 PM</span>
                </div>
              </div>
            </div>

            {/* Quick Dual Highlight Card: Restaurant & Hotel */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div
                onClick={() => setActiveTab('menu')}
                className="p-4 bg-amber-50/80 hover:bg-amber-100/80 rounded-xl border border-amber-200 cursor-pointer transition-colors shadow-2xs"
              >
                <div className="flex items-center gap-2 font-bold text-amber-900">
                  <Utensils className="w-4 h-4 text-amber-600" />
                  <span>Restaurant Dining</span>
                </div>
                <p className="text-stone-600 text-[11px] mt-1 leading-snug">
                  130+ authentic dishes from real printed menu. Takeaway &amp; dine-in.
                </p>
              </div>

              <div
                onClick={() => setActiveTab('hotel')}
                className="p-4 bg-stone-100 hover:bg-stone-200/80 rounded-xl border border-stone-200 cursor-pointer transition-colors shadow-2xs"
              >
                <div className="flex items-center gap-2 font-bold text-stone-900">
                  <Bed className="w-4 h-4 text-amber-600" />
                  <span>Hotel Stay</span>
                </div>
                <p className="text-stone-600 text-[11px] mt-1 leading-snug">
                  AC &amp; Non-AC rooms right opposite Railway Platform. 24/7 front desk.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop Quick Booking & Room Check Strip */}
        <div className="mt-12 bg-white rounded-2xl border border-stone-200 p-4 sm:p-5 shadow-sm">
          <form onSubmit={handleQuickEnquiry} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end text-xs">
            <div>
              <label className="block font-semibold text-stone-700 mb-1 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-amber-600" />
                <span>Check-in Date</span>
              </label>
              <input
                type="date"
                value={quickCheckIn}
                onChange={(e) => setQuickCheckIn(e.target.value)}
                className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg text-xs focus:bg-white focus:outline-none focus:ring-1 focus:ring-amber-500"
              />
            </div>

            <div>
              <label className="block font-semibold text-stone-700 mb-1 flex items-center gap-1.5">
                <Bed className="w-3.5 h-3.5 text-amber-600" />
                <span>Preferred Room</span>
              </label>
              <select
                value={quickRoomType}
                onChange={(e) => setQuickRoomType(e.target.value)}
                className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg text-xs focus:bg-white focus:outline-none focus:ring-1 focus:ring-amber-500"
              >
                {hotelRooms.map(r => (
                  <option key={r.id} value={r.id}>
                    {r.name} (from ₹{r.pricePerNight}/night)
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-semibold text-stone-700 mb-1 flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-amber-600" />
                <span>Guests</span>
              </label>
              <select
                value={quickGuests}
                onChange={(e) => setQuickGuests(e.target.value)}
                className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg text-xs focus:bg-white focus:outline-none focus:ring-1 focus:ring-amber-500"
              >
                <option value="1">1 Adult (Solo Transit)</option>
                <option value="2">2 Adults (Couple / Double)</option>
                <option value="3">3 Guests (Triple Occupancy)</option>
                <option value="4">4+ Guests (Family)</option>
              </select>
            </div>

            <div>
              <button
                type="submit"
                className="w-full py-2.5 bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded-lg shadow-xs transition-colors cursor-pointer flex items-center justify-center gap-2"
              >
                <Search className="w-3.5 h-3.5" />
                <span>Check Rates &amp; Availability</span>
              </button>
            </div>
          </form>
        </div>

        {/* 4-Item Proof & Highlights Strip */}
        <div className="mt-10 pt-8 border-t border-stone-200 grid grid-cols-2 md:grid-cols-4 gap-6 text-stone-700">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-stone-900 font-bold text-sm">
              <MapPin className="w-4 h-4 text-amber-600" />
              <span>Prime Railway Location</span>
            </div>
            <p className="text-xs text-stone-500">
              Steps away from Anantapur Railway Station main exit.
            </p>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2 text-stone-900 font-bold text-sm">
              <Utensils className="w-4 h-4 text-amber-600" />
              <span>130+ Verified Dishes</span>
            </div>
            <p className="text-xs text-stone-500">
              Extracted directly from the printed menu with exact prices.
            </p>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2 text-stone-900 font-bold text-sm">
              <Clock className="w-4 h-4 text-amber-600" />
              <span>10:00 AM – 10:00 PM</span>
            </div>
            <p className="text-xs text-stone-500">
              Fresh hot food, quick parcel service for train passengers.
            </p>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2 text-stone-900 font-bold text-sm">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>4.3 / 5 Rating</span>
            </div>
            <p className="text-xs text-stone-500">
              Supplied customer rating (subject to ongoing verification).
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
