import React from 'react';
import { useApp } from '../context/AppContext';
import { MapPin, Phone, MessageCircle, Clock, QrCode, Shield, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  const { settings, setActiveTab, setIsQRModalOpen, setIsLeadPopupOpen } = useApp();

  return (
    <footer className="bg-stone-950 text-stone-300 pt-16 pb-12 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-stone-800">
          {/* Brand Col Left */}
          <div className="lg:col-span-5 space-y-4">
            <div>
              <span className="font-serif text-2xl font-bold tracking-tight text-white block">
                TASTE OF Pulao&apos;s
              </span>
              <span className="text-amber-500 font-sans text-xs uppercase tracking-widest font-semibold block mt-0.5">
                Shreyas Grand · Hotel &amp; Restaurant
              </span>
            </div>

            <p className="text-stone-400 text-xs leading-relaxed max-w-sm">
              Discover welcoming hospitality and delicious dining at TASTE OF Pulao&apos;s Shreyas Grand, conveniently located opposite Anantapur Railway Station. Serving authentic Rayalaseema pulaos, slow-dum biryanis, and comfortable AC/Non-AC rooms.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={() => setIsQRModalOpen(true)}
                className="inline-flex items-center gap-1.5 px-3 py-2 bg-stone-900 hover:bg-stone-800 text-stone-200 border border-stone-700 rounded-lg text-xs font-medium transition-colors"
              >
                <QrCode className="w-3.5 h-3.5 text-amber-400" />
                <span>QR Code Menu</span>
              </button>

              <button
                onClick={() => setIsLeadPopupOpen(true)}
                className="inline-flex items-center gap-1.5 px-3 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-xs font-semibold transition-colors"
              >
                <span>Join Food &amp; Stay Club</span>
              </button>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="lg:col-span-3 space-y-3 text-xs">
            <h4 className="font-serif font-bold text-white uppercase tracking-wider text-sm">
              Navigation
            </h4>
            <ul className="space-y-2 text-stone-400">
              <li>
                <button
                  onClick={() => { setActiveTab('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-amber-400 transition-colors"
                >
                  Home &amp; Highlights
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setActiveTab('menu'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-amber-400 transition-colors"
                >
                  130+ Digital Menu Dishes
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setActiveTab('hotel'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-amber-400 transition-colors"
                >
                  Hotel Rooms &amp; Rates
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setActiveTab('loyalty'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-amber-400 transition-colors"
                >
                  Shreyas Grand Food Club
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setActiveTab('reviews'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-amber-400 transition-colors"
                >
                  Guest Reviews (4.3 / 5)
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setActiveTab('contact'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-amber-400 transition-colors"
                >
                  Location &amp; Map Directions
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setActiveTab('admin'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="text-stone-500 hover:text-stone-300 transition-colors flex items-center gap-1"
                >
                  <Shield className="w-3 h-3" />
                  <span>Staff &amp; Admin Console</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Contact & Hours Column Right */}
          <div className="lg:col-span-4 space-y-3 text-xs">
            <h4 className="font-serif font-bold text-white uppercase tracking-wider text-sm">
              Contact &amp; Location
            </h4>

            <div className="space-y-2.5 text-stone-400">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <span className="leading-relaxed">{settings.address}</span>
              </div>

              {/* Requirement: Both contact numbers clearly displayed with clickable links */}
              <div className="flex items-center gap-2.5 pt-1">
                <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <a
                  href={`https://wa.me/${settings.primaryWhatsApp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-emerald-300 font-semibold"
                >
                  Primary WhatsApp: {settings.primaryPhone}
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <a
                  href={`tel:${settings.secondaryPhone.replace(/\s+/g, '')}`}
                  className="text-white hover:text-amber-300 font-medium"
                >
                  Secondary Desk: {settings.secondaryPhone}
                </a>
              </div>

              <div className="flex items-center gap-2.5 pt-1 text-stone-400">
                <Clock className="w-4 h-4 text-stone-500 shrink-0" />
                <span>Restaurant Hours: {settings.openingHours}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom Strip */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <p>
            &copy; {new Date().getFullYear()} TASTE OF Pulao&apos;s Shreyas Grand. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-stone-400">
            <span>Opposite Anantapur Railway Station</span>
            <span>·</span>
            <span>Andhra Pradesh 515001</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
