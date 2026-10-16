import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Image, X } from 'lucide-react';

interface GalleryItem {
  id: string;
  title: string;
  category: 'food' | 'exterior' | 'rooms' | 'ambience' | 'dining';
  categoryLabel: string;
  image: string;
  caption: string;
}

export const GallerySection: React.FC = () => {
  const { language } = useApp();
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [zoomItem, setZoomItem] = useState<GalleryItem | null>(null);

  const galleryItems: GalleryItem[] = [
    {
      id: 'gal-1',
      title: 'Traditional Andhra Chicken Pulao Spread',
      category: 'food',
      categoryLabel: 'Restaurant Food',
      image: '/src/assets/images/hero_pulao_spread_1792134326469.jpg',
      caption: 'Aromatic basmati pulao tossed with whole spices, tender chicken, golden cashews, and traditional accompaniments.'
    },
    {
      id: 'gal-2',
      title: 'Hotel Exterior & Entrance',
      category: 'exterior',
      categoryLabel: 'Hotel Exterior',
      image: '/src/assets/images/hotel_exterior_shreyas_1792134326415.jpg',
      caption: 'Welcoming multi-storey facade located conveniently opposite Anantapur Railway Station.'
    },
    {
      id: 'gal-3',
      title: 'Executive AC Room Interior',
      category: 'rooms',
      categoryLabel: 'Hotel Rooms',
      image: '/src/assets/images/hotel_room_executive_1792134326951.jpg',
      caption: 'Pristine air-conditioned bedroom with queen bed, crisp linens, and modern transit traveller amenities.'
    },
    {
      id: 'gal-4',
      title: 'Family Dining Restaurant Ambience',
      category: 'dining',
      categoryLabel: 'Dining Area',
      image: '/src/assets/images/restaurant_ambience_dining_1792134327553.jpg',
      caption: 'Warm, hospitable dining hall welcoming families, groups, and travellers.'
    }
  ];

  const categories = [
    { id: 'all', label: 'All Photos' },
    { id: 'food', label: 'Restaurant Food' },
    { id: 'exterior', label: 'Hotel Exterior' },
    { id: 'rooms', label: 'Hotel Rooms' },
    { id: 'dining', label: 'Dining Area' }
  ];

  const filteredItems = selectedFilter === 'all'
    ? galleryItems
    : galleryItems.filter(item => item.category === selectedFilter);

  return (
    <section id="gallery" className="py-16 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-700 uppercase tracking-wider">
              <Image className="w-4 h-4 text-amber-600" />
              <span>PROPERTY &amp; DINING SHOWCASE</span>
            </div>
            <h2 className="font-serif text-3xl font-bold text-stone-900 mt-1">
              {language === 'en' ? 'Photo Gallery' : 'ఫోటో గ్యాలరీ'}
            </h2>
            <p className="text-stone-600 text-xs sm:text-sm mt-1">
              Authentic glimpses of our restaurant dishes, hotel accommodation, and dining hospitality.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-stone-100 rounded-lg shrink-0 overflow-x-auto no-scrollbar">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedFilter(cat.id)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                  selectedFilter === cat.id
                    ? 'bg-white text-stone-900 shadow-xs font-semibold'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredItems.map(item => (
            <div
              key={item.id}
              onClick={() => setZoomItem(item)}
              className="group bg-stone-50 rounded-xl overflow-hidden border border-stone-200 shadow-xs hover:shadow-md transition-all duration-300 cursor-pointer flex flex-col"
            >
              <div className="relative h-60 overflow-hidden bg-stone-200">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-3 left-3 bg-stone-900/80 text-white text-[10px] font-semibold px-2 py-0.5 rounded backdrop-blur-xs">
                  {item.categoryLabel}
                </div>
              </div>

              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif text-base font-bold text-stone-900 leading-snug group-hover:text-amber-700 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-stone-500 mt-1 line-clamp-2 leading-relaxed">
                    {item.caption}
                  </p>
                </div>
                <span className="text-[11px] font-medium text-amber-700 mt-3 block">
                  Click to enlarge &rarr;
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Zoom Modal */}
      {zoomItem && (
        <div
          onClick={() => setZoomItem(null)}
          className="fixed inset-0 z-50 bg-stone-950/85 backdrop-blur-xs flex items-center justify-center p-4 sm:p-8"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl overflow-hidden max-w-4xl w-full shadow-2xl border border-stone-200 relative"
          >
            <button
              onClick={() => setZoomItem(null)}
              className="absolute top-4 right-4 z-10 p-2 bg-stone-900/70 hover:bg-stone-900 text-white rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="max-h-[70vh] bg-stone-950 flex items-center justify-center overflow-hidden">
              <img
                src={zoomItem.image}
                alt={zoomItem.title}
                className="max-h-[70vh] w-auto object-contain"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="p-6 bg-white space-y-1">
              <span className="text-xs font-semibold text-amber-700 uppercase tracking-wider">
                {zoomItem.categoryLabel}
              </span>
              <h3 className="font-serif text-xl font-bold text-stone-900">
                {zoomItem.title}
              </h3>
              <p className="text-xs text-stone-600">
                {zoomItem.caption}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
