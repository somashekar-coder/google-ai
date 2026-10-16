import {
  HotelRoom,
  CustomerReview,
  CustomerLead,
  FestivalCampaign,
  LoyaltyCustomer,
  SiteSettings,
  PickupOrder,
  HotelReservation
} from '../types';

export const initialSiteSettings: SiteSettings = {
  businessName: "TASTE OF Pulao's Shreyas Grand",
  teluguBusinessName: "టేస్ట్ ఆఫ్ పులావ్స్ శ్రేయస్ గ్రాండ్ (హోటల్ & రెస్టారెంట్)",
  address: "13-2-754/756, Opposite Railway Station, Srinivas Nagar, Anantapur, Andhra Pradesh 515001, India",
  primaryPhone: "+91 95535 55847",
  secondaryPhone: "+91 95535 55856",
  primaryWhatsApp: "919553555847",
  openingHours: "10:00 AM to 10:00 PM (Subject to verification)",
  ratingDisplay: "4.3 / 5 (Supplied customer rating · Subject to verification)",
  announcement: "Opposite Anantapur Railway Station · Fast WhatsApp Food Orders & Comfortable Hotel Rooms",
  leadPopupDelaySeconds: 15
};

export const initialHotelRooms: HotelRoom[] = [
  {
    id: 'room-exec-ac',
    name: 'Executive AC Room',
    tagline: 'Ideal for Business & Transit Travellers',
    description: 'Spacious air-conditioned room with premium queen-size mattress, workstation, high-speed Wi-Fi, and 24-hour hot water right opposite Anantapur Railway Station.',
    occupancy: '2 Adults · 1 Child',
    bedType: '1 Queen Bed',
    pricePerNight: 1699,
    amenities: [
      'Split Air Conditioning',
      'Free High-Speed Wi-Fi',
      '24/7 Hot Water Geyser',
      'Room Service from Restaurant',
      'Flat-screen LED TV',
      'Work Desk & Chair',
      'Opposite Railway Station'
    ],
    isAvailable: true,
    image: '/src/assets/images/hotel_room_executive_1792134326951.jpg',
    isAdminConfigured: true
  },
  {
    id: 'room-deluxe-ac',
    name: 'Deluxe AC Room',
    tagline: 'Comfortable & Elegantly Appointed',
    description: 'Refined comfort featuring contemporary furnishings, sound-damped windows, tea/coffee kettle, and prompt in-room dining from our restaurant kitchen.',
    occupancy: '2 Adults · 2 Children',
    bedType: '1 King Bed or 2 Twin Beds',
    pricePerNight: 1999,
    amenities: [
      'Split Air Conditioning',
      'King Size Mattress',
      'Complimentary Bottled Water',
      'Room Dining Priority',
      'Wardrobe & Luggage Rack',
      'Daily Housekeeping',
      'Attached Sanitized Bathroom'
    ],
    isAvailable: true,
    image: '/src/assets/images/hotel_room_executive_1792134326951.jpg',
    isAdminConfigured: true
  },
  {
    id: 'room-std-nonac',
    name: 'Standard Non-AC Room',
    tagline: 'Budget-Friendly Transit Stays',
    description: 'Clean, well-ventilated economical room designed specifically for railway passengers, overnight transit guests, and budget-conscious solo travellers.',
    occupancy: '2 Adults',
    bedType: '1 Double Bed',
    pricePerNight: 999,
    amenities: [
      'Ceiling Fan & Large Windows',
      'Attached Clean Bathroom',
      '24/7 Running Water',
      'Luggage Storage Assistance',
      'Direct Dial to Front Desk',
      'Steps to Railway Platform'
    ],
    isAvailable: true,
    image: '/src/assets/images/hotel_room_executive_1792134326951.jpg',
    isAdminConfigured: true
  },
  {
    id: 'room-family-suite',
    name: 'Family Suite AC',
    tagline: 'Generous Space for Families & Groups',
    description: 'Two interconnected bedroom spaces with multiple double beds, seating lounge, and dedicated hospitality assistance for families visiting Anantapur.',
    occupancy: '4 Adults · 2 Children',
    bedType: '2 Double Beds',
    pricePerNight: 2899,
    amenities: [
      'Dual Air Conditioning',
      'Spacious Seating Area',
      '2 Clean Bathrooms',
      'LED TV with Cable Channels',
      'Family Dining Room Service',
      'Complimentary Wi-Fi',
      'Express Check-in & Luggage Care'
    ],
    isAvailable: true,
    image: '/src/assets/images/hotel_room_executive_1792134326951.jpg',
    isAdminConfigured: true
  }
];

export const initialTodaysSpecial = {
  dishId: 'top-nv-1',
  dishName: 'Special Shreyas Chicken Pulao',
  category: "Taste of Pulao's (Spl)",
  price: 290,
  description: 'Signature fragrant Rayalaseema basmati pulao tossed with tender farm chicken, roasted cashews, fried onions, and served with spicy salan and chilled raita.',
  image: '/src/assets/images/hero_pulao_spread_1792134326469.jpg',
  isAvailable: true,
  validUntil: 'Today 10:00 PM',
  discountNote: 'House Chef Recommendation'
};

export const initialReviews: CustomerReview[] = [
  {
    id: 'rev-1',
    customerName: 'Ramesh Reddy',
    rating: 5,
    date: '2026-09-28',
    reviewType: 'Restaurant',
    foodRating: 5,
    serviceRating: 4,
    cleanlinessRating: 5,
    comment: 'The Special Shreyas Chicken Pulao is unmatched in Anantapur! Rich ghee aroma and perfectly spiced chicken. Located right opposite the railway station, so it was super convenient before catching our evening train.',
    isApproved: true,
    verifiedGuest: true
  },
  {
    id: 'rev-2',
    customerName: 'K. Venkatesh Rao',
    rating: 4,
    date: '2026-10-04',
    reviewType: 'Both',
    foodRating: 4,
    serviceRating: 4,
    hotelRating: 4,
    cleanlinessRating: 4,
    comment: 'Stayed overnight in the Executive AC room and dined at the restaurant. Clean beds, fast check-in, and the Kodi Vepudu starter was crisp and fiery. Great hospitality for railway commuters.',
    isApproved: true,
    verifiedGuest: true
  },
  {
    id: 'rev-3',
    customerName: 'Dr. Priya Sundaram',
    rating: 5,
    date: '2026-10-10',
    reviewType: 'Restaurant',
    foodRating: 5,
    serviceRating: 5,
    cleanlinessRating: 5,
    comment: 'Tried the Kaju Paneer Pulao and Tandoori Platter with my family. Portions were generous and food came piping hot. Very neat family dining ambience.',
    isApproved: true,
    verifiedGuest: true
  }
];

export const initialLeads: CustomerLead[] = [
  {
    id: 'lead-1',
    firstName: 'Srinivas',
    mobileNumber: '9848022334',
    whatsappConsent: true,
    signedUpAt: '2026-10-01 14:20',
    source: 'Website Food & Stay Club Popup',
    status: 'Active'
  },
  {
    id: 'lead-2',
    firstName: 'Ananya',
    mobileNumber: '9440155678',
    whatsappConsent: true,
    signedUpAt: '2026-10-08 19:15',
    source: 'Restaurant Pickup Pre-order',
    status: 'Active'
  }
];

export const initialFestivalCampaigns: FestivalCampaign[] = [
  {
    id: 'fest-sankranti',
    festivalName: 'Makar Sankranti & Pongal',
    occasion: 'Harvest Festival',
    defaultMessage: '🌾 Happy Sankranti from TASTE OF Pulao’s Shreyas Grand! Celebrate the festival of harvest with our festive Special Veg & Non-Veg Pulao feasts. Call or WhatsApp +91 95535 55847 for takeaway pre-orders opposite Anantapur Railway Station!',
    offerText: 'Festive Family Combos & Special Sweet Treat on Dining',
    targetAudience: 'All Leads',
    isActive: true
  },
  {
    id: 'fest-ugadi',
    festivalName: 'Ugadi (Telugu New Year)',
    occasion: 'Telugu New Year',
    defaultMessage: '🌸 శ్రీ శోభకృత్ నామ ఉగాది శుభాకాంక్షలు! Happy Ugadi from Shreyas Grand! Relish authentic Andhra flavors, rich biryanis, and traditional hospitality in Anantapur. Pre-order your family lunch feast now at +91 95535 55847.',
    offerText: 'Special Ugadi Pulao & Rayalaseema Starters Platter',
    targetAudience: 'All Leads',
    isActive: true
  },
  {
    id: 'fest-diwali',
    festivalName: 'Diwali',
    occasion: 'Festival of Lights',
    defaultMessage: '🪔 Shubh Deepavali from TASTE OF Pulao’s Shreyas Grand! Light up your celebrations with our Royal Thali & Tandoori Specials. Room bookings & restaurant takeaway available opposite Anantapur Railway Station: +91 95535 55847.',
    offerText: 'Complimentary Sweet with Every Pulao Order',
    targetAudience: 'All Leads',
    isActive: true
  },
  {
    id: 'fest-dussehra',
    festivalName: 'Dussehra / Vijayadashami',
    occasion: 'Victory of Goodness',
    defaultMessage: '🏹 Happy Dussehra! Treat your loved ones to grand Rayalaseema feast at Shreyas Grand. Hot food, authentic spices, and swift takeaway service. WhatsApp +91 95535 55847.',
    offerText: '10% Off on Pre-ordered Party Buckets',
    targetAudience: 'All Leads',
    isActive: true
  },
  {
    id: 'fest-eid',
    festivalName: 'Eid-ul-Fitr',
    occasion: 'Eid Celebrations',
    defaultMessage: '🌙 Eid Mubarak from Shreyas Grand! Celebrate with our signature Chicken Dum Biryani, Mutton Rogan Josh, and Double Ka Meetha. Reserve tables or takeaway: +91 95535 55847.',
    offerText: 'Special Mutton & Dum Biryani Feast',
    targetAudience: 'All Leads',
    isActive: true
  },
  {
    id: 'fest-christmas',
    festivalName: 'Christmas & New Year',
    occasion: 'Year End Festive Season',
    defaultMessage: '🎄 Merry Christmas & Happy New Year from TASTE OF Pulao’s Shreyas Grand! Visiting Anantapur for the holidays? Enjoy cozy hotel rooms and mouthwatering dining opposite Railway Station: +91 95535 55847.',
    offerText: 'Holiday Stay & Dining Packages',
    targetAudience: 'All Leads',
    isActive: true
  },
  {
    id: 'fest-birthday',
    festivalName: 'Member Birthday Special',
    occasion: 'Personal Celebrations',
    defaultMessage: '🎂 Happy Birthday from the Shreyas Grand family! To make your day special, enjoy a complimentary dessert or birthday treat on your next dining or room booking. Show this message at counter!',
    offerText: 'Complimentary Dessert on Your Birthday',
    targetAudience: 'Loyalty Members',
    isActive: true
  }
];

export const initialLoyaltyMembers: LoyaltyCustomer[] = [
  {
    phone: '9553555847',
    name: 'Sample Member (Staff Test)',
    totalCompletedMeals: 10,
    qualifyingPunchCount: 10,
    freeMealsEarned: 1,
    freeMealsRedeemed: 0,
    birthday: '1990-05-15',
    joinedDate: '2026-08-10',
    history: [
      { date: '2026-09-01', action: 'Order #ORD-101 (+1 punch)', orderId: 'ORD-101' },
      { date: '2026-09-15', action: 'Order #ORD-108 (+1 punch)', orderId: 'ORD-108' },
      { date: '2026-10-10', action: 'Reached 10 qualifying meals! 1 Free Meal Voucher Issued.' }
    ]
  },
  {
    phone: '9848022334',
    name: 'Srinivas R.',
    totalCompletedMeals: 6,
    qualifyingPunchCount: 6,
    freeMealsEarned: 0,
    freeMealsRedeemed: 0,
    joinedDate: '2026-09-12',
    history: [
      { date: '2026-09-15', action: 'Order #ORD-102 (+1 punch)', orderId: 'ORD-102' },
      { date: '2026-09-22', action: 'Order #ORD-105 (+1 punch)', orderId: 'ORD-105' },
      { date: '2026-10-02', action: 'Order #ORD-112 (+1 punch)', orderId: 'ORD-112' }
    ]
  }
];

export const initialPickupOrders: PickupOrder[] = [
  {
    orderId: 'ORD-8491',
    createdAt: '2026-10-15 13:30',
    customerName: 'Mahesh Kumar',
    customerPhone: '9849112233',
    pickupDate: '2026-10-15',
    pickupTime: '14:15',
    specialInstructions: 'Make pulao medium spicy, please pack extra raita.',
    items: [
      {
        id: 'cart-1',
        menuItemId: 'top-nv-1',
        name: 'Special Shreyas Chicken Pulao',
        price: 290,
        quantity: 2,
        isVegetarian: false
      },
      {
        id: 'cart-2',
        menuItemId: 'si-starters-1',
        name: 'Kodi Vepudu',
        price: 260,
        quantity: 1,
        isVegetarian: false
      }
    ],
    subtotal: 840,
    total: 840,
    status: 'Ready for Pickup',
    paymentMethod: 'Pay at Pickup',
    isPaid: false
  },
  {
    orderId: 'ORD-8492',
    createdAt: '2026-10-15 18:45',
    customerName: 'Suresh Babu',
    customerPhone: '9440234567',
    pickupDate: '2026-10-15',
    pickupTime: '19:30',
    specialInstructions: 'Railway train transit takeaway. Pack securely.',
    items: [
      {
        id: 'cart-3',
        menuItemId: 'bir-nv-1',
        name: 'Chicken Dum Biryani (Full)',
        portionName: 'Full',
        price: 260,
        quantity: 1,
        isVegetarian: false
      },
      {
        id: 'cart-4',
        menuItemId: 'des-9',
        name: 'Gulab Jamun (2 Pcs)',
        price: 60,
        quantity: 2,
        isVegetarian: true
      }
    ],
    subtotal: 380,
    total: 380,
    status: 'Preparing',
    paymentMethod: 'Pay at Pickup',
    isPaid: false
  }
];

export const initialReservations: HotelReservation[] = [
  {
    reservationId: 'RES-501',
    createdAt: '2026-10-14 11:20',
    guestName: 'Anand Varma',
    guestPhone: '9848556677',
    guestEmail: 'anand.varma@example.com',
    roomTypeId: 'room-exec-ac',
    roomTypeName: 'Executive AC Room',
    checkInDate: '2026-10-18',
    checkOutDate: '2026-10-20',
    numGuests: 2,
    numRooms: 1,
    totalNights: 2,
    estimatedTotal: 3398,
    specialRequests: 'Arriving on Rayalaseema Express early morning ~6 AM.',
    status: 'Confirmed',
    isVerifiedByStaff: true
  }
];
