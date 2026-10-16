import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  MenuItem,
  CartItem,
  PickupOrder,
  OrderStatus,
  HotelRoom,
  HotelReservation,
  ReservationStatus,
  CustomerReview,
  CustomerLead,
  FestivalCampaign,
  LoyaltyCustomer,
  SiteSettings
} from '../types';
import { initialMenuItems, getDishImage } from '../data/initialMenu';
import {
  initialHotelRooms,
  initialSiteSettings,
  initialTodaysSpecial,
  initialReviews,
  initialLeads,
  initialFestivalCampaigns,
  initialLoyaltyMembers,
  initialPickupOrders,
  initialReservations
} from '../data/initialHotelAndSite';

interface AppContextType {
  // Menu
  menuItems: MenuItem[];
  updateMenuItemPrice: (id: string, newPrice: number) => void;
  toggleItemAvailability: (id: string) => void;
  addMenuItem: (item: MenuItem) => void;
  deleteMenuItem: (id: string) => void;
  resetMenuToOriginal: () => void;

  // Cart
  cart: CartItem[];
  addToCart: (item: MenuItem, portionName?: string, quantity?: number) => void;
  removeFromCart: (instanceId: string) => void;
  updateCartQuantity: (instanceId: string, delta: number) => void;
  clearCart: () => void;
  cartSubtotal: number;
  cartCount: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;

  // Orders
  orders: PickupOrder[];
  createPickupOrder: (orderData: {
    customerName: string;
    customerPhone: string;
    pickupDate: string;
    pickupTime: string;
    specialInstructions?: string;
  }) => PickupOrder;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  copyOrderToClipboard: (order: PickupOrder) => Promise<boolean>;

  // Hotel
  hotelRooms: HotelRoom[];
  updateHotelRoom: (updatedRoom: HotelRoom) => void;
  reservations: HotelReservation[];
  createHotelReservation: (reservationData: {
    guestName: string;
    guestPhone: string;
    guestEmail?: string;
    roomTypeId: string;
    checkInDate: string;
    checkOutDate: string;
    numGuests: number;
    numRooms: number;
    specialRequests?: string;
  }) => HotelReservation;
  updateReservationStatus: (reservationId: string, status: ReservationStatus) => void;

  // Reviews
  reviews: CustomerReview[];
  submitReview: (review: Omit<CustomerReview, 'id' | 'date' | 'isApproved'>) => void;
  toggleReviewApproval: (id: string) => void;

  // Leads
  leads: CustomerLead[];
  addCustomerLead: (mobileNumber: string, firstName?: string, consent?: boolean) => { success: boolean; message: string };
  unsubscribeLead: (mobileNumber: string) => void;
  isLeadPopupOpen: boolean;
  setIsLeadPopupOpen: (open: boolean) => void;

  // Festival campaigns
  campaigns: FestivalCampaign[];
  updateCampaign: (campaign: FestivalCampaign) => void;

  // Loyalty
  loyaltyMembers: LoyaltyCustomer[];
  getLoyaltyByPhone: (phone: string) => LoyaltyCustomer | undefined;
  addLoyaltyPunch: (phone: string, customerName?: string, orderId?: string) => { success: boolean; punches: number; freeMealsEarned: number };
  redeemFreeMeal: (phone: string) => { success: boolean; message: string };

  // Today's special
  todaysSpecial: typeof initialTodaysSpecial;
  updateTodaysSpecial: (special: typeof initialTodaysSpecial) => void;

  // Settings & Language
  settings: SiteSettings;
  updateSettings: (newSettings: SiteSettings) => void;
  language: 'en' | 'te';
  toggleLanguage: () => void;

  // Modals & UI
  isQRModalOpen: boolean;
  setIsQRModalOpen: (open: boolean) => void;
  activeTab: 'home' | 'menu' | 'hotel' | 'reviews' | 'gallery' | 'loyalty' | 'contact' | 'admin';
  setActiveTab: (tab: 'home' | 'menu' | 'hotel' | 'reviews' | 'gallery' | 'loyalty' | 'contact' | 'admin') => void;

  // WhatsApp Helpers
  generateWhatsAppOrderUrl: (order: PickupOrder) => string;
  generateWhatsAppReservationUrl: (res: HotelReservation) => string;
  generateWhatsAppDirectMessageUrl: (text: string) => string;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Menu items state
  const [menuItems, setMenuItems] = useState<MenuItem[]>(() => {
    const saved = localStorage.getItem('shreyas_menu');
    if (saved) {
      try {
        const parsed: MenuItem[] = JSON.parse(saved);
        return parsed.map(item => ({
          ...item,
          image: item.image || getDishImage(item)
        }));
      } catch (e) {
        console.error(e);
      }
    }
    return initialMenuItems;
  });

  // Cart state
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('shreyas_cart');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return [];
  });
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Orders state
  const [orders, setOrders] = useState<PickupOrder[]>(() => {
    const saved = localStorage.getItem('shreyas_orders');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return initialPickupOrders;
  });

  // Hotel rooms state
  const [hotelRooms, setHotelRooms] = useState<HotelRoom[]>(() => {
    const saved = localStorage.getItem('shreyas_rooms');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return initialHotelRooms;
  });

  // Reservations state
  const [reservations, setReservations] = useState<HotelReservation[]>(() => {
    const saved = localStorage.getItem('shreyas_reservations');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return initialReservations;
  });

  // Reviews state
  const [reviews, setReviews] = useState<CustomerReview[]>(() => {
    const saved = localStorage.getItem('shreyas_reviews');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return initialReviews;
  });

  // Leads state
  const [leads, setLeads] = useState<CustomerLead[]>(() => {
    const saved = localStorage.getItem('shreyas_leads');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return initialLeads;
  });
  const [isLeadPopupOpen, setIsLeadPopupOpen] = useState(false);

  // Campaigns state
  const [campaigns, setCampaigns] = useState<FestivalCampaign[]>(() => {
    const saved = localStorage.getItem('shreyas_campaigns');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return initialFestivalCampaigns;
  });

  // Loyalty members state
  const [loyaltyMembers, setLoyaltyMembers] = useState<LoyaltyCustomer[]>(() => {
    const saved = localStorage.getItem('shreyas_loyalty');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return initialLoyaltyMembers;
  });

  // Today's special state
  const [todaysSpecial, setTodaysSpecial] = useState<typeof initialTodaysSpecial>(() => {
    const saved = localStorage.getItem('shreyas_special');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return initialTodaysSpecial;
  });

  // Settings state
  const [settings, setSettings] = useState<SiteSettings>(() => {
    const saved = localStorage.getItem('shreyas_settings');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return initialSiteSettings;
  });

  // Language state: 'en' | 'te'
  const [language, setLanguage] = useState<'en' | 'te'>('en');

  // Modals & Navigation
  const [isQRModalOpen, setIsQRModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'home' | 'menu' | 'hotel' | 'reviews' | 'gallery' | 'loyalty' | 'contact' | 'admin'>('home');

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('shreyas_menu', JSON.stringify(menuItems));
  }, [menuItems]);

  useEffect(() => {
    localStorage.setItem('shreyas_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('shreyas_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('shreyas_rooms', JSON.stringify(hotelRooms));
  }, [hotelRooms]);

  useEffect(() => {
    localStorage.setItem('shreyas_reservations', JSON.stringify(reservations));
  }, [reservations]);

  useEffect(() => {
    localStorage.setItem('shreyas_reviews', JSON.stringify(reviews));
  }, [reviews]);

  useEffect(() => {
    localStorage.setItem('shreyas_leads', JSON.stringify(leads));
  }, [leads]);

  useEffect(() => {
    localStorage.setItem('shreyas_campaigns', JSON.stringify(campaigns));
  }, [campaigns]);

  useEffect(() => {
    localStorage.setItem('shreyas_loyalty', JSON.stringify(loyaltyMembers));
  }, [loyaltyMembers]);

  useEffect(() => {
    localStorage.setItem('shreyas_special', JSON.stringify(todaysSpecial));
  }, [todaysSpecial]);

  useEffect(() => {
    localStorage.setItem('shreyas_settings', JSON.stringify(settings));
  }, [settings]);

  // Lead popup timer (dwell time)
  useEffect(() => {
    const seen = sessionStorage.getItem('shreyas_lead_seen');
    if (!seen) {
      const timer = setTimeout(() => {
        setIsLeadPopupOpen(true);
        sessionStorage.setItem('shreyas_lead_seen', 'true');
      }, (settings.leadPopupDelaySeconds || 15) * 1000);
      return () => clearTimeout(timer);
    }
  }, [settings.leadPopupDelaySeconds]);

  // Menu functions
  const updateMenuItemPrice = (id: string, newPrice: number) => {
    setMenuItems(prev => prev.map(item => item.id === id ? { ...item, price: newPrice } : item));
  };

  const toggleItemAvailability = (id: string) => {
    setMenuItems(prev => prev.map(item => item.id === id ? { ...item, isAvailable: !item.isAvailable } : item));
  };

  const addMenuItem = (item: MenuItem) => {
    setMenuItems(prev => [item, ...prev]);
  };

  const deleteMenuItem = (id: string) => {
    setMenuItems(prev => prev.filter(item => item.id !== id));
  };

  const resetMenuToOriginal = () => {
    setMenuItems(initialMenuItems);
    localStorage.removeItem('shreyas_menu');
  };

  // Cart functions
  const addToCart = (item: MenuItem, portionName?: string, quantity: number = 1) => {
    let effectivePrice = item.price;
    if (portionName && item.portions) {
      const match = item.portions.find(p => p.name.toLowerCase() === portionName.toLowerCase());
      if (match) effectivePrice = match.price;
    }

    const instanceId = portionName ? `${item.id}-${portionName}` : item.id;

    setCart(prev => {
      const existing = prev.find(ci => ci.id === instanceId);
      if (existing) {
        return prev.map(ci => ci.id === instanceId ? { ...ci, quantity: ci.quantity + quantity } : ci);
      }
      return [
        ...prev,
        {
          id: instanceId,
          menuItemId: item.id,
          name: item.name,
          portionName: portionName || undefined,
          price: effectivePrice,
          quantity,
          isVegetarian: item.isVegetarian
        }
      ];
    });
  };

  const removeFromCart = (instanceId: string) => {
    setCart(prev => prev.filter(ci => ci.id !== instanceId));
  };

  const updateCartQuantity = (instanceId: string, delta: number) => {
    setCart(prev =>
      prev
        .map(ci => {
          if (ci.id === instanceId) {
            const newQty = ci.quantity + delta;
            return newQty > 0 ? { ...ci, quantity: newQty } : null;
          }
          return ci;
        })
        .filter((ci): ci is CartItem => ci !== null)
    );
  };

  const clearCart = () => setCart([]);

  const cartSubtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Orders functions
  const createPickupOrder = (orderData: {
    customerName: string;
    customerPhone: string;
    pickupDate: string;
    pickupTime: string;
    specialInstructions?: string;
  }): PickupOrder => {
    const orderId = `ORD-${Math.floor(1000 + Math.random() * 9000)}`;
    const newOrder: PickupOrder = {
      orderId,
      createdAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
      customerName: orderData.customerName,
      customerPhone: orderData.customerPhone,
      pickupDate: orderData.pickupDate,
      pickupTime: orderData.pickupTime,
      specialInstructions: orderData.specialInstructions,
      items: [...cart],
      subtotal: cartSubtotal,
      total: cartSubtotal,
      status: 'New',
      paymentMethod: 'Pay at Pickup',
      isPaid: false
    };

    setOrders(prev => [newOrder, ...prev]);
    clearCart();

    // Auto add lead if phone is provided
    addCustomerLead(orderData.customerPhone, orderData.customerName, true);

    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    setOrders(prev => {
      const updated = prev.map(o => o.orderId === orderId ? { ...o, status } : o);
      // If completed, update loyalty
      const matched = updated.find(o => o.orderId === orderId);
      if (matched && status === 'Completed') {
        addLoyaltyPunch(matched.customerPhone, matched.customerName, matched.orderId);
      }
      return updated;
    });
  };

  const copyOrderToClipboard = async (order: PickupOrder): Promise<boolean> => {
    const itemsList = order.items
      .map(i => `  • ${i.name} ${i.portionName ? `(${i.portionName})` : ''} x${i.quantity} = ₹${i.price * i.quantity}`)
      .join('\n');

    const text = `====================================
TASTE OF PULAO'S SHREYAS GRAND
RESTAURANT PICKUP ORDER #${order.orderId}
====================================
Date: ${order.createdAt}
Customer: ${order.customerName}
Phone: ${order.customerPhone}
Pickup Time: ${order.pickupDate} at ${order.pickupTime}
Status: ${order.status}
Payment: ${order.paymentMethod} (${order.isPaid ? 'PAID' : 'DUE AT COUNTER'})

ITEMS:
${itemsList}

SUBTOTAL: ₹${order.subtotal}
TOTAL AMOUNT: ₹${order.total}
${order.specialInstructions ? `Notes: ${order.specialInstructions}` : ''}
Address: Opposite Railway Station, Srinivas Nagar, Anantapur
Primary WhatsApp: +91 95535 55847
====================================`;

    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (e) {
      console.error('Clipboard copy failed:', e);
      return false;
    }
  };

  // Hotel functions
  const updateHotelRoom = (updatedRoom: HotelRoom) => {
    setHotelRooms(prev => prev.map(r => r.id === updatedRoom.id ? updatedRoom : r));
  };

  const createHotelReservation = (reservationData: {
    guestName: string;
    guestPhone: string;
    guestEmail?: string;
    roomTypeId: string;
    checkInDate: string;
    checkOutDate: string;
    numGuests: number;
    numRooms: number;
    specialRequests?: string;
  }): HotelReservation => {
    const room = hotelRooms.find(r => r.id === reservationData.roomTypeId) || hotelRooms[0];
    const checkIn = new Date(reservationData.checkInDate);
    const checkOut = new Date(reservationData.checkOutDate);
    const diffTime = Math.abs(checkOut.getTime() - checkIn.getTime());
    const nights = Math.max(1, Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 1);
    const estimatedTotal = room.pricePerNight * nights * reservationData.numRooms;

    const resId = `RES-${Math.floor(100 + Math.random() * 900)}`;
    const newReservation: HotelReservation = {
      reservationId: resId,
      createdAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
      guestName: reservationData.guestName,
      guestPhone: reservationData.guestPhone,
      guestEmail: reservationData.guestEmail,
      roomTypeId: room.id,
      roomTypeName: room.name,
      checkInDate: reservationData.checkInDate,
      checkOutDate: reservationData.checkOutDate,
      numGuests: reservationData.numGuests,
      numRooms: reservationData.numRooms,
      totalNights: nights,
      estimatedTotal,
      specialRequests: reservationData.specialRequests,
      status: 'Pending',
      isVerifiedByStaff: false
    };

    setReservations(prev => [newReservation, ...prev]);

    // Record lead
    addCustomerLead(reservationData.guestPhone, reservationData.guestName, true);

    return newReservation;
  };

  const updateReservationStatus = (reservationId: string, status: ReservationStatus) => {
    setReservations(prev =>
      prev.map(r => r.reservationId === reservationId ? { ...r, status, isVerifiedByStaff: status === 'Confirmed' || status === 'Checked-In' } : r)
    );
  };

  // Reviews functions
  const submitReview = (reviewData: Omit<CustomerReview, 'id' | 'date' | 'isApproved'>) => {
    const newReview: CustomerReview = {
      ...reviewData,
      id: `rev-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      isApproved: false // requires admin approval as per requirement 12
    };
    setReviews(prev => [newReview, ...prev]);
  };

  const toggleReviewApproval = (id: string) => {
    setReviews(prev => prev.map(r => r.id === id ? { ...r, isApproved: !r.isApproved } : r));
  };

  // Leads functions
  const addCustomerLead = (mobileNumber: string, firstName?: string, consent: boolean = true) => {
    const cleanNumber = mobileNumber.replace(/\D/g, '').slice(-10);
    if (cleanNumber.length !== 10) {
      return { success: false, message: 'Please enter a valid 10-digit Indian mobile number.' };
    }

    const existing = leads.find(l => l.mobileNumber === cleanNumber);
    if (existing) {
      return { success: true, message: 'You are already registered with our Food & Stay Club!' };
    }

    const newLead: CustomerLead = {
      id: `lead-${Date.now()}`,
      firstName: firstName || 'Valued Guest',
      mobileNumber: cleanNumber,
      whatsappConsent: consent,
      signedUpAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
      source: 'Website Food & Stay Club',
      status: 'Active'
    };

    setLeads(prev => [newLead, ...prev]);
    return { success: true, message: 'Welcome to our Food & Stay Club! You will receive exclusive festival offers.' };
  };

  const unsubscribeLead = (mobileNumber: string) => {
    setLeads(prev => prev.map(l => l.mobileNumber === mobileNumber ? { ...l, status: 'Unsubscribed' } : l));
  };

  // Campaigns
  const updateCampaign = (campaign: FestivalCampaign) => {
    setCampaigns(prev => prev.map(c => c.id === campaign.id ? campaign : c));
  };

  // Loyalty functions
  const getLoyaltyByPhone = (phone: string) => {
    const clean = phone.replace(/\D/g, '').slice(-10);
    return loyaltyMembers.find(m => m.phone === clean);
  };

  const addLoyaltyPunch = (phone: string, customerName?: string, orderId?: string) => {
    const clean = phone.replace(/\D/g, '').slice(-10);
    let member = loyaltyMembers.find(m => m.phone === clean);

    if (!member) {
      member = {
        phone: clean,
        name: customerName || 'Valued Guest',
        totalCompletedMeals: 1,
        qualifyingPunchCount: 1,
        freeMealsEarned: 0,
        freeMealsRedeemed: 0,
        joinedDate: new Date().toISOString().split('T')[0],
        history: [{
          date: new Date().toISOString().split('T')[0],
          action: `Completed meal ${orderId ? `#${orderId}` : ''} (+1 punch)`,
          orderId
        }]
      };
      setLoyaltyMembers(prev => [member!, ...prev]);
      return { success: true, punches: 1, freeMealsEarned: 0 };
    } else {
      const newTotal = member.totalCompletedMeals + 1;
      let newPunches = member.qualifyingPunchCount + 1;
      let earned = member.freeMealsEarned;

      if (newPunches >= 10) {
        earned += 1;
        newPunches = newPunches - 10;
      }

      const updatedHistory = [
        {
          date: new Date().toISOString().split('T')[0],
          action: `Completed meal ${orderId ? `#${orderId}` : ''} (+1 punch). ${newPunches === 0 ? 'Earned 1 Free Meal Voucher!' : ''}`,
          orderId
        },
        ...member.history
      ];

      const updatedMember: LoyaltyCustomer = {
        ...member,
        name: customerName || member.name,
        totalCompletedMeals: newTotal,
        qualifyingPunchCount: newPunches,
        freeMealsEarned: earned,
        history: updatedHistory
      };

      setLoyaltyMembers(prev => prev.map(m => m.phone === clean ? updatedMember : m));
      return { success: true, punches: newPunches, freeMealsEarned: earned };
    }
  };

  const redeemFreeMeal = (phone: string) => {
    const clean = phone.replace(/\D/g, '').slice(-10);
    const member = loyaltyMembers.find(m => m.phone === clean);
    if (!member) return { success: false, message: 'Member not found.' };

    const available = member.freeMealsEarned - member.freeMealsRedeemed;
    if (available <= 0) {
      return { success: false, message: 'No available free meals to redeem.' };
    }

    const updated: LoyaltyCustomer = {
      ...member,
      freeMealsRedeemed: member.freeMealsRedeemed + 1,
      history: [
        {
          date: new Date().toISOString().split('T')[0],
          action: 'Redeemed 1 Free Meal Reward at Restaurant Counter'
        },
        ...member.history
      ]
    };

    setLoyaltyMembers(prev => prev.map(m => m.phone === clean ? updated : m));
    return { success: true, message: 'Free meal successfully redeemed and recorded in ledger!' };
  };

  // Today's special
  const updateTodaysSpecial = (special: typeof initialTodaysSpecial) => {
    setTodaysSpecial(special);
  };

  // Settings
  const updateSettings = (newSettings: SiteSettings) => {
    setSettings(newSettings);
  };

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'te' : 'en');
  };

  // WhatsApp Helpers
  const generateWhatsAppOrderUrl = (order: PickupOrder) => {
    const itemsList = order.items
      .map(i => `• ${i.name} ${i.portionName ? `(${i.portionName})` : ''} x${i.quantity} (₹${i.price * i.quantity})`)
      .join('%0A');

    const msg = `*NEW RESTAURANT ORDER — TASTE OF PULAO'S*%0A%0A` +
      `*Order ID:* ${order.orderId}%0A` +
      `*Customer Name:* ${order.customerName}%0A` +
      `*Mobile:* ${order.customerPhone}%0A` +
      `*Pickup Date & Time:* ${order.pickupDate} at ${order.pickupTime}%0A%0A` +
      `*Ordered Items:*%0A${itemsList}%0A%0A` +
      `*Order Total:* ₹${order.total}%0A` +
      `*Payment:* Pay at Pickup%0A` +
      `${order.specialInstructions ? `*Special Request:* ${order.specialInstructions}%0A%0A` : '%0A'}` +
      `Please confirm my pickup order. Thank you!`;

    const phone = settings.primaryWhatsApp.replace(/\D/g, '');
    return `https://wa.me/${phone}?text=${msg}`;
  };

  const generateWhatsAppReservationUrl = (res: HotelReservation) => {
    const msg = `*HOTEL ROOM ENQUIRY & RESERVATION REQUEST*%0A` +
      `*Shreyas Grand Hotel, Anantapur*%0A%0A` +
      `*Enquiry Ref:* ${res.reservationId}%0A` +
      `*Guest Name:* ${res.guestName}%0A` +
      `*Mobile:* ${res.guestPhone}%0A` +
      `*Room Type:* ${res.roomTypeName}%0A` +
      `*Check-in Date:* ${res.checkInDate}%0A` +
      `*Check-out Date:* ${res.checkOutDate}%0A` +
      `*Nights:* ${res.totalNights}%0A` +
      `*Rooms:* ${res.numRooms}%0A` +
      `*Guests:* ${res.numGuests}%0A` +
      `*Estimated Cost:* ₹${res.estimatedTotal}%0A` +
      `${res.specialRequests ? `*Special Request:* ${res.specialRequests}%0A%0A` : '%0A'}` +
      `Please confirm room availability and tariff. Thank you!`;

    const phone = settings.primaryWhatsApp.replace(/\D/g, '');
    return `https://wa.me/${phone}?text=${msg}`;
  };

  const generateWhatsAppDirectMessageUrl = (text: string) => {
    const phone = settings.primaryWhatsApp.replace(/\D/g, '');
    return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
  };

  return (
    <AppContext.Provider
      value={{
        menuItems,
        updateMenuItemPrice,
        toggleItemAvailability,
        addMenuItem,
        deleteMenuItem,
        resetMenuToOriginal,

        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        cartSubtotal,
        cartCount,
        isCartOpen,
        setIsCartOpen,

        orders,
        createPickupOrder,
        updateOrderStatus,
        copyOrderToClipboard,

        hotelRooms,
        updateHotelRoom,
        reservations,
        createHotelReservation,
        updateReservationStatus,

        reviews,
        submitReview,
        toggleReviewApproval,

        leads,
        addCustomerLead,
        unsubscribeLead,
        isLeadPopupOpen,
        setIsLeadPopupOpen,

        campaigns,
        updateCampaign,

        loyaltyMembers,
        getLoyaltyByPhone,
        addLoyaltyPunch,
        redeemFreeMeal,

        todaysSpecial,
        updateTodaysSpecial,

        settings,
        updateSettings,
        language,
        toggleLanguage,

        isQRModalOpen,
        setIsQRModalOpen,
        activeTab,
        setActiveTab,

        generateWhatsAppOrderUrl,
        generateWhatsAppReservationUrl,
        generateWhatsAppDirectMessageUrl
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within an AppProvider');
  return context;
};
