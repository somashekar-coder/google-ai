import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { MapPin, Copy, Check, ExternalLink, Navigation, Phone, MessageCircle, Clock, Train } from 'lucide-react';

export const LocationSection: React.FC = () => {
  const { settings, language } = useApp();
  const [copied, setCopied] = useState(false);

  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(settings.address)}`;
  const googleMapsEmbedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(settings.address)}&t=&z=16&ie=UTF8&iwloc=&output=embed`;

  const handleCopyAddress = async () => {
    try {
      await navigator.clipboard.writeText(settings.address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <section id="location" className="py-16 bg-stone-50 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Section Header */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-700 uppercase tracking-wider">
            <MapPin className="w-4 h-4 text-amber-600" />
            <span>FIND US IN ANANTAPUR</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h2 className="font-serif text-3xl font-bold text-stone-900">
                {language === 'en' ? 'Google Maps & Location' : 'లొకేషన్ మరియు చిరునామా'}
              </h2>
              <p className="text-stone-600 text-xs sm:text-sm mt-1">
                Prime central hospitality hub located directly opposite Anantapur Railway Station.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleCopyAddress}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium bg-white hover:bg-stone-100 text-stone-800 border border-stone-300 rounded-lg shadow-2xs transition-colors cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-stone-500" />}
                <span>{copied ? 'Address Copied!' : 'Copy Full Address'}</span>
              </button>

              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold bg-amber-600 hover:bg-amber-700 text-white rounded-lg shadow-xs transition-colors"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>Get Directions</span>
              </a>
            </div>
          </div>
        </div>

        {/* Location Content Grid */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Details Card */}
          <div className="lg:col-span-5 bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 space-y-6 flex flex-col justify-between shadow-xs">
            <div className="space-y-5">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
                  <Train className="w-5 h-5 text-amber-700" />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-bold text-stone-900">
                    Opposite Railway Station
                  </h3>
                  <p className="text-xs text-stone-500 mt-0.5">
                    1-minute walk from Platform 1 exit. Ideal for transit travellers, luggage storage, and fast parcel food.
                  </p>
                </div>
              </div>

              {/* Exact Address */}
              <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 text-xs space-y-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-stone-500">
                  Official Business Address
                </span>
                <p className="font-medium text-stone-900 leading-relaxed text-sm">
                  {settings.address}
                </p>
              </div>

              {/* Operating Hours */}
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-stone-100 text-stone-800 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5 text-stone-600" />
                </div>
                <div>
                  <h4 className="font-bold text-stone-900 text-sm">Restaurant Dining Hours</h4>
                  <p className="text-xs text-stone-600 mt-0.5">
                    10:00 AM to 10:00 PM Daily (subject to verification)
                  </p>
                  <p className="text-[11px] text-amber-700 font-medium mt-0.5">
                    Hotel check-in assistance operates 24/7 for railway commuters.
                  </p>
                </div>
              </div>

              {/* Verified Contact Numbers */}
              <div className="pt-2 border-t border-stone-100 space-y-2 text-xs">
                <span className="font-bold text-stone-900 block">Contact &amp; Reservations:</span>
                <div className="flex flex-col gap-2">
                  <a
                    href={`https://wa.me/${settings.primaryWhatsApp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-emerald-700 hover:text-emerald-800 font-semibold"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Primary WhatsApp: {settings.primaryPhone}</span>
                  </a>

                  <a
                    href={`tel:${settings.secondaryPhone.replace(/\s+/g, '')}`}
                    className="inline-flex items-center gap-2 text-stone-700 hover:text-stone-900 font-medium"
                  >
                    <Phone className="w-4 h-4 text-amber-600" />
                    <span>Secondary Telephone: {settings.secondaryPhone}</span>
                  </a>
                </div>
              </div>
            </div>

            <a
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 w-full py-2.5 bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold rounded-lg transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Open in Google Maps App</span>
            </a>
          </div>

          {/* Right Map Embed / Representation */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs min-h-[360px] flex flex-col">
            <div className="flex-1 w-full relative">
              <iframe
                title="TASTE OF Pulao's Shreyas Grand Location Map"
                src={googleMapsEmbedUrl}
                className="w-full h-full min-h-[380px] border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <div className="p-3 bg-stone-50 border-t border-stone-200 text-[11px] text-stone-500 flex items-center justify-between">
              <span>Verified coordinates: Srinivas Nagar, Opposite Railway Station, Anantapur</span>
              <a href={googleMapsUrl} target="_blank" rel="noopener noreferrer" className="text-amber-700 hover:underline font-medium">
                View Full Map
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
