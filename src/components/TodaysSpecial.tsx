import React from 'react';
import { useApp } from '../context/AppContext';
import { Flame, ShoppingBag, MessageCircle, Clock, Sparkles } from 'lucide-react';
import { getDishImage } from '../utils/dishImages';

export const TodaysSpecial: React.FC = () => {
  const { todaysSpecial, addToCart, menuItems, settings, language } = useApp();

  if (!todaysSpecial.isAvailable) return null;

  const matchedDish = menuItems.find(m => m.id === todaysSpecial.dishId);
  const specialPhoto = todaysSpecial.image || (matchedDish ? getDishImage(matchedDish) : getDishImage({ name: todaysSpecial.dishName, category: todaysSpecial.category }));

  const handleOrderSpecial = () => {
    if (matchedDish) {
      addToCart(matchedDish);
    } else {
      addToCart({
        id: todaysSpecial.dishId,
        name: todaysSpecial.dishName,
        category: 'taste_of_pulao',
        categoryName: "Taste of Pulao's (Spl)",
        price: todaysSpecial.price,
        isVegetarian: false,
        isAvailable: true,
        verifiedFromPhoto: true
      });
    }
  };

  const whatsappSpecialUrl = `https://wa.me/${settings.primaryWhatsApp}?text=Hello%20TASTE%20OF%20Pulao's%20Shreyas%20Grand,%20I%20would%20like%20to%20order%20Today's%20Special:%20${encodeURIComponent(todaysSpecial.dishName)}%20(₹${todaysSpecial.price})`;

  return (
    <section className="py-12 bg-amber-50/70 border-b border-amber-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="bg-white rounded-2xl border border-amber-200 overflow-hidden shadow-md">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-0 items-center">
            {/* Visual Left */}
            <div className="md:col-span-5 relative h-64 md:h-full min-h-[260px] bg-stone-100">
              <img
                src={specialPhoto}
                alt={todaysSpecial.dishName}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-4 left-4 bg-amber-600 text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow-sm flex items-center gap-1.5">
                <Flame className="w-3.5 h-3.5" />
                <span>{language === 'en' ? "Today's Chef Special" : "నేటి స్పెషల్ డిష్"}</span>
              </div>
            </div>

            {/* Content Right */}
            <div className="md:col-span-7 p-6 sm:p-8 space-y-4">
              <div className="flex items-center justify-between gap-4 text-xs">
                <span className="font-semibold text-amber-700 uppercase tracking-wider">
                  {todaysSpecial.category}
                </span>
                <span className="inline-flex items-center gap-1 text-stone-500">
                  <Clock className="w-3.5 h-3.5 text-stone-400" />
                  <span>Available until 10:00 PM</span>
                </span>
              </div>

              <div>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
                  {todaysSpecial.dishName}
                </h3>
                <p className="text-stone-600 text-sm mt-2 leading-relaxed">
                  {todaysSpecial.description}
                </p>
              </div>

              <div className="flex flex-wrap items-baseline gap-3 pt-2">
                <span className="text-2xl sm:text-3xl font-bold text-stone-900 tabular-nums">
                  ₹{todaysSpecial.price}
                </span>
                <span className="text-xs text-stone-500 font-medium">
                  Inclusive of all taxes · Verified Printed Menu Price
                </span>
              </div>

              <div className="pt-2 flex flex-wrap items-center gap-3">
                <button
                  onClick={handleOrderSpecial}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-amber-600 hover:bg-amber-700 text-white text-sm font-semibold rounded-lg shadow-xs transition-colors cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>{language === 'en' ? 'Add to Pickup Cart' : 'కార్ట్‌లో చేర్చండి'}</span>
                </button>

                <a
                  href={whatsappSpecialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold rounded-lg shadow-xs transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>{language === 'en' ? 'Order via WhatsApp' : 'వాట్సాప్ ఆర్డర్'}</span>
                </a>

                <div className="text-xs text-stone-500 italic flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  <span>{todaysSpecial.discountNote || 'House Special'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
