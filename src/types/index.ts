export type DishCategory =
  | 'taste_of_pulao'
  | 'special_combos'
  | 'biryani'
  | 'south_indian_starters'
  | 'tandoori_starters'
  | 'chinese_starters'
  | 'chinese_soups'
  | 'main_course'
  | 'rice_and_noodles'
  | 'indian_breads'
  | 'desserts_and_icecreams'
  | 'beverages_and_shakes'
  | 'salads_and_raita';

export interface PortionOption {
  name: string; // e.g. 'Single', 'Full', 'Half', '2 Pcs'
  price: number;
}

export interface MenuItem {
  id: string;
  name: string;
  teluguName?: string;
  category: DishCategory;
  categoryName: string;
  subCategory?: 'VEG' | 'NON-VEG';
  price: number;
  portions?: PortionOption[];
  description?: string;
  isVegetarian: boolean;
  isSpecial?: boolean;
  isSpicy?: boolean;
  isAvailable: boolean;
  image?: string;
  verifiedFromPhoto: boolean;
  photoSourceNotes?: string;
}

export interface CartItem {
  id: string; // unique item instance id
  menuItemId: string;
  name: string;
  portionName?: string;
  price: number;
  quantity: number;
  isVegetarian: boolean;
}

export type OrderStatus =
  | 'New'
  | 'Confirmed'
  | 'Preparing'
  | 'Ready for Pickup'
  | 'Completed'
  | 'Cancelled';

export interface PickupOrder {
  orderId: string;
  createdAt: string;
  customerName: string;
  customerPhone: string;
  pickupDate: string;
  pickupTime: string;
  specialInstructions?: string;
  items: CartItem[];
  subtotal: number;
  total: number;
  status: OrderStatus;
  paymentMethod: 'Pay at Pickup' | 'Online / UPI';
  isPaid: boolean;
}

export interface HotelRoom {
  id: string;
  name: string;
  tagline: string;
  description: string;
  occupancy: string;
  bedType: string;
  pricePerNight: number;
  amenities: string[];
  isAvailable: boolean;
  image: string;
  isAdminConfigured: boolean;
}

export type ReservationStatus = 'Pending' | 'Confirmed' | 'Checked-In' | 'Completed' | 'Cancelled';

export interface HotelReservation {
  reservationId: string;
  createdAt: string;
  guestName: string;
  guestPhone: string;
  guestEmail?: string;
  roomTypeId: string;
  roomTypeName: string;
  checkInDate: string;
  checkOutDate: string;
  numGuests: number;
  numRooms: number;
  totalNights: number;
  estimatedTotal: number;
  specialRequests?: string;
  status: ReservationStatus;
  isVerifiedByStaff: boolean;
}

export interface CustomerReview {
  id: string;
  customerName: string;
  rating: number; // 1-5
  date: string;
  reviewType: 'Restaurant' | 'Hotel' | 'Both';
  foodRating: number;
  serviceRating: number;
  hotelRating?: number;
  cleanlinessRating: number;
  comment: string;
  isApproved: boolean;
  verifiedGuest: boolean;
}

export interface CustomerLead {
  id: string;
  firstName?: string;
  mobileNumber: string;
  whatsappConsent: boolean;
  signedUpAt: string;
  source: string;
  status: 'Active' | 'Unsubscribed';
}

export interface FestivalCampaign {
  id: string;
  festivalName: string;
  occasion: string;
  defaultMessage: string;
  offerText: string;
  targetAudience: 'All Leads' | 'Loyalty Members' | 'Hotel Guests';
  isActive: boolean;
}

export interface LoyaltyCustomer {
  phone: string;
  name: string;
  totalCompletedMeals: number;
  qualifyingPunchCount: number; // 0-10
  freeMealsEarned: number;
  freeMealsRedeemed: number;
  birthday?: string;
  joinedDate: string;
  history: {
    date: string;
    action: string;
    orderId?: string;
  }[];
}

export interface SiteSettings {
  businessName: string;
  teluguBusinessName: string;
  address: string;
  primaryPhone: string; // +91 95535 55847
  secondaryPhone: string; // +91 95535 55856
  primaryWhatsApp: string; // 919553555847
  openingHours: string; // 10:00 AM - 10:00 PM
  ratingDisplay: string; // 4.3 / 5 (Supplied pending verification)
  announcement: string;
  leadPopupDelaySeconds: number;
}
