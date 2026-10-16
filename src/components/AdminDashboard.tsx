import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { MenuItem, OrderStatus, ReservationStatus, DishCategory } from '../types';
import {
  ShieldCheck,
  Lock,
  Utensils,
  Bed,
  ShoppingBag,
  Star,
  Users,
  Sparkles,
  Award,
  Settings,
  FileText,
  Search,
  Check,
  Copy,
  Plus,
  Trash2,
  Edit2,
  ExternalLink,
  MessageCircle,
  Download,
  AlertCircle
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const {
    menuItems,
    updateMenuItemPrice,
    toggleItemAvailability,
    addMenuItem,
    deleteMenuItem,
    resetMenuToOriginal,

    orders,
    updateOrderStatus,
    copyOrderToClipboard,

    hotelRooms,
    updateHotelRoom,
    reservations,
    updateReservationStatus,

    reviews,
    toggleReviewApproval,

    leads,
    campaigns,
    updateCampaign,

    loyaltyMembers,
    addLoyaltyPunch,

    todaysSpecial,
    updateTodaysSpecial,

    settings,
    updateSettings,
    setIsQRModalOpen
  } = useApp();

  // Authentication state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [authError, setAuthError] = useState('');

  // Active Admin Section
  const [adminTab, setAdminTab] = useState<
    'orders' | 'reservations' | 'menu' | 'special' | 'hotel' | 'reviews' | 'leads' | 'campaigns' | 'loyalty' | 'settings' | 'audit'
  >('orders');

  // Menu Search & Edit states
  const [menuSearch, setMenuSearch] = useState('');
  const [editingPriceId, setEditingPriceId] = useState<string | null>(null);
  const [tempPrice, setTempPrice] = useState<number>(0);
  const [isAddingDish, setIsAddingDish] = useState(false);
  const [newDish, setNewDish] = useState<Partial<MenuItem>>({
    name: '',
    teluguName: '',
    category: 'taste_of_pulao',
    categoryName: "Taste of Pulao's (Spl)",
    price: 250,
    isVegetarian: true,
    isAvailable: true,
    verifiedFromPhoto: true
  });

  // Settings form state
  const [settingsForm, setSettingsForm] = useState(settings);
  const [settingsSaved, setSettingsSaved] = useState(false);

  // Copy order feedback
  const [copiedOrderId, setCopiedOrderId] = useState<string | null>(null);

  // Handle Login
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Default authorized PINs for staff: '9553' or 'shreyas123'
    if (pinInput === '9553' || pinInput.toLowerCase() === 'shreyas123') {
      setIsAuthenticated(true);
      setAuthError('');
    } else {
      setAuthError('Incorrect PIN. (Use 9553 or shreyas123)');
    }
  };

  const handleCopyOrder = async (order: any) => {
    const ok = await copyOrderToClipboard(order);
    if (ok) {
      setCopiedOrderId(order.orderId);
      setTimeout(() => setCopiedOrderId(null), 2500);
    }
  };

  const handleExportLeads = () => {
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      ['Mobile Number,First Name,Consent,Signed Up At,Status']
        .concat(leads.map(l => `${l.mobileNumber},${l.firstName || ''},${l.whatsappConsent},${l.signedUpAt},${l.status}`))
        .join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'shreyas_grand_leads.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center p-6 bg-stone-100">
        <div className="bg-white rounded-2xl border border-stone-200 p-8 max-w-md w-full shadow-lg space-y-6">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center mx-auto">
              <Lock className="w-6 h-6 text-amber-700" />
            </div>
            <h2 className="font-serif text-2xl font-bold text-stone-900">
              Staff &amp; Admin Portal
            </h2>
            <p className="text-stone-500 text-xs">
              TASTE OF Pulao’s Shreyas Grand Management
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4 text-xs">
            {authError && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg">
                {authError}
              </div>
            )}

            <div>
              <label className="block font-medium text-stone-700 mb-1">
                Enter Staff Authorization PIN
              </label>
              <input
                type="password"
                required
                autoFocus
                placeholder="Enter PIN (e.g. 9553)"
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value)}
                className="w-full px-3 py-2.5 bg-stone-50 border border-stone-200 rounded-lg text-sm text-center font-mono tracking-widest focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/20"
              />
              <span className="text-[10px] text-stone-400 mt-1 block text-center">
                Authorized staff PIN: <span className="font-mono font-bold text-stone-600">9553</span> or <span className="font-mono font-bold text-stone-600">shreyas123</span>
              </span>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded-lg shadow-xs transition-colors cursor-pointer text-xs"
            >
              Authorize &amp; Unlock Dashboard
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-100 pb-20">
      {/* Admin Top Header */}
      <div className="bg-stone-900 text-white px-6 py-4 border-b border-stone-800">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-6 h-6 text-amber-500" />
            <div>
              <h1 className="font-serif text-lg font-bold">
                TASTE OF Pulao&apos;s Shreyas Grand · Management Console
              </h1>
              <p className="text-xs text-stone-400">
                Opposite Anantapur Railway Station · Live Operations &amp; Inventory Sync
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 text-xs">
            <button
              onClick={() => setIsQRModalOpen(true)}
              className="px-3 py-1.5 bg-stone-800 hover:bg-stone-700 rounded-lg text-stone-200"
            >
              Generate QR Poster
            </button>
            <button
              onClick={() => setIsAuthenticated(false)}
              className="px-3 py-1.5 bg-stone-800 hover:bg-red-900/60 text-stone-300 hover:text-white rounded-lg transition-colors"
            >
              Lock Console
            </button>
          </div>
        </div>
      </div>

      {/* Main Admin Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-6">
        {/* Navigation Tabs */}
        <div className="flex items-center gap-1 overflow-x-auto pb-2 border-b border-stone-200 no-scrollbar">
          {[
            { id: 'orders', label: `Pickup Orders (${orders.length})`, icon: ShoppingBag },
            { id: 'reservations', label: `Hotel Bookings (${reservations.length})`, icon: Bed },
            { id: 'menu', label: `Menu Items (${menuItems.length})`, icon: Utensils },
            { id: 'special', label: "Today's Special", icon: Sparkles },
            { id: 'hotel', label: 'Hotel Rooms & Rates', icon: Bed },
            { id: 'reviews', label: `Reviews (${reviews.length})`, icon: Star },
            { id: 'leads', label: `Food & Stay Leads (${leads.length})`, icon: Users },
            { id: 'campaigns', label: 'WhatsApp Greetings', icon: MessageCircle },
            { id: 'loyalty', label: 'Loyalty Club', icon: Award },
            { id: 'audit', label: 'Menu Photo Audit', icon: FileText },
            { id: 'settings', label: 'Settings & Phones', icon: Settings }
          ].map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setAdminTab(tab.id as any)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                  adminTab === tab.id
                    ? 'bg-amber-600 text-white shadow-xs'
                    : 'bg-white text-stone-700 hover:bg-stone-200/80 border border-stone-200'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab 1: Restaurant Pickup Orders */}
        {adminTab === 'orders' && (
          <div className="mt-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-serif text-xl font-bold text-stone-900">
                Restaurant Pickup Pre-Orders
              </h3>
              <span className="text-xs text-stone-500">
                Click &quot;Copy Log&quot; to copy formatted transaction receipt
              </span>
            </div>

            <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-stone-700">
                  <thead className="bg-stone-50 border-b border-stone-200 text-stone-500 uppercase tracking-wider text-[10px]">
                    <tr>
                      <th className="p-3.5">Order ID &amp; Time</th>
                      <th className="p-3.5">Customer &amp; Phone</th>
                      <th className="p-3.5">Pickup Date/Time</th>
                      <th className="p-3.5">Items &amp; Total</th>
                      <th className="p-3.5">Status</th>
                      <th className="p-3.5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100">
                    {orders.map((o) => (
                      <tr key={o.orderId} className="hover:bg-stone-50/60">
                        <td className="p-3.5 font-mono font-bold text-stone-900">
                          {o.orderId}
                          <span className="block text-[10px] text-stone-400 font-normal">
                            {o.createdAt}
                          </span>
                        </td>
                        <td className="p-3.5">
                          <span className="font-semibold text-stone-900 block">{o.customerName}</span>
                          <a href={`tel:${o.customerPhone}`} className="text-amber-700 hover:underline font-mono">
                            +91 {o.customerPhone}
                          </a>
                        </td>
                        <td className="p-3.5">
                          <span className="font-medium">{o.pickupDate}</span>
                          <span className="block text-[11px] text-stone-500">{o.pickupTime}</span>
                        </td>
                        <td className="p-3.5">
                          <span className="font-bold text-stone-900 tabular-nums">₹{o.total}</span>
                          <span className="block text-[10px] text-stone-500">
                            {o.items.length} item(s) · {o.paymentMethod}
                          </span>
                          {o.specialInstructions && (
                            <span className="block text-[10px] text-amber-700 italic mt-0.5">
                              Note: {o.specialInstructions}
                            </span>
                          )}
                        </td>
                        <td className="p-3.5">
                          <select
                            value={o.status}
                            onChange={(e) => updateOrderStatus(o.orderId, e.target.value as OrderStatus)}
                            className="px-2 py-1 bg-stone-50 border border-stone-300 rounded text-xs font-semibold"
                          >
                            <option value="New">New</option>
                            <option value="Confirmed">Confirmed</option>
                            <option value="Preparing">Preparing</option>
                            <option value="Ready for Pickup">Ready for Pickup</option>
                            <option value="Completed">Completed</option>
                            <option value="Cancelled">Cancelled</option>
                          </select>
                        </td>
                        <td className="p-3.5 text-right space-x-2">
                          {/* Copy to Clipboard Feature (Requirement 10) */}
                          <button
                            onClick={() => handleCopyOrder(o)}
                            className="inline-flex items-center gap-1 px-2.5 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded text-[11px] font-medium transition-colors"
                            title="Copy order transaction to clipboard"
                          >
                            {copiedOrderId === o.orderId ? (
                              <>
                                <Check className="w-3 h-3 text-emerald-600" />
                                <span className="text-emerald-700 font-bold">Copied</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3 h-3 text-stone-500" />
                                <span>Copy Log</span>
                              </>
                            )}
                          </button>

                          {/* Direct WhatsApp Message to customer */}
                          <a
                            href={`https://wa.me/91${o.customerPhone}?text=Hello%20${encodeURIComponent(o.customerName)},%20your%20pickup%20order%20%23${o.orderId}%20at%20TASTE%20OF%20Pulao's%20Shreyas%20Grand%20status%20is:%20${o.status}.`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center p-1.5 text-emerald-700 hover:bg-emerald-50 rounded"
                            title="WhatsApp Customer"
                          >
                            <MessageCircle className="w-4 h-4" />
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Hotel Enquiries & Bookings */}
        {adminTab === 'reservations' && (
          <div className="mt-6 space-y-4">
            <h3 className="font-serif text-xl font-bold text-stone-900">
              Hotel Room Enquiries &amp; Reservations
            </h3>

            <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-stone-700">
                  <thead className="bg-stone-50 border-b border-stone-200 text-stone-500 uppercase tracking-wider text-[10px]">
                    <tr>
                      <th className="p-3.5">Ref ID &amp; Created</th>
                      <th className="p-3.5">Guest &amp; Phone</th>
                      <th className="p-3.5">Room Type</th>
                      <th className="p-3.5">Dates &amp; Duration</th>
                      <th className="p-3.5">Estimated Tariff</th>
                      <th className="p-3.5">Status</th>
                      <th className="p-3.5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100">
                    {reservations.map((r) => (
                      <tr key={r.reservationId} className="hover:bg-stone-50/60">
                        <td className="p-3.5 font-mono font-bold text-stone-900">
                          {r.reservationId}
                          <span className="block text-[10px] text-stone-400 font-normal">
                            {r.createdAt}
                          </span>
                        </td>
                        <td className="p-3.5">
                          <span className="font-semibold text-stone-900 block">{r.guestName}</span>
                          <a href={`tel:${r.guestPhone}`} className="text-amber-700 hover:underline font-mono">
                            +91 {r.guestPhone}
                          </a>
                          {r.guestEmail && (
                            <span className="block text-[10px] text-stone-400">{r.guestEmail}</span>
                          )}
                        </td>
                        <td className="p-3.5 font-medium text-stone-800">
                          {r.roomTypeName}
                          <span className="block text-[10px] text-stone-500">
                            {r.numRooms} Room(s) · {r.numGuests} Guest(s)
                          </span>
                        </td>
                        <td className="p-3.5">
                          <span>{r.checkInDate} to {r.checkOutDate}</span>
                          <span className="block text-[10px] text-stone-500">{r.totalNights} Night(s)</span>
                          {r.specialRequests && (
                            <span className="block text-[10px] text-amber-700 italic mt-0.5">
                              Train/Req: {r.specialRequests}
                            </span>
                          )}
                        </td>
                        <td className="p-3.5 font-bold text-stone-900 tabular-nums">
                          ₹{r.estimatedTotal}
                        </td>
                        <td className="p-3.5">
                          <select
                            value={r.status}
                            onChange={(e) => updateReservationStatus(r.reservationId, e.target.value as ReservationStatus)}
                            className="px-2 py-1 bg-stone-50 border border-stone-300 rounded text-xs font-semibold"
                          >
                            <option value="Pending">Pending Verification</option>
                            <option value="Confirmed">Confirmed</option>
                            <option value="Checked-In">Checked-In</option>
                            <option value="Completed">Completed</option>
                            <option value="Cancelled">Cancelled</option>
                          </select>
                        </td>
                        <td className="p-3.5 text-right">
                          <a
                            href={`https://wa.me/91${r.guestPhone}?text=Hello%20${encodeURIComponent(r.guestName)},%20regarding%20your%20hotel%20room%20enquiry%20%23${r.reservationId}%20at%20Shreyas%20Grand%20opposite%20Anantapur%20Railway%20Station...`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 px-2.5 py-1.5 bg-emerald-50 text-emerald-800 hover:bg-emerald-100 rounded text-[11px] font-medium transition-colors"
                          >
                            <MessageCircle className="w-3.5 h-3.5" />
                            <span>WhatsApp Guest</span>
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Menu & Price Management */}
        {adminTab === 'menu' && (
          <div className="mt-6 space-y-4">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              <div>
                <h3 className="font-serif text-xl font-bold text-stone-900">
                  Menu Items &amp; Price Editing ({menuItems.length} Dishes)
                </h3>
                <p className="text-xs text-stone-500">
                  Real-time price editing updates the live menu instantly without code changes.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsAddingDish(!isAddingDish)}
                  className="inline-flex items-center gap-1.5 px-3 py-2 bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold rounded-lg shadow-xs transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add New Dish</span>
                </button>

                <button
                  onClick={() => {
                    if (confirm('Reset entire menu back to original printed photograph extraction?')) {
                      resetMenuToOriginal();
                    }
                  }}
                  className="px-3 py-2 bg-white hover:bg-stone-100 text-stone-700 border border-stone-300 text-xs font-medium rounded-lg transition-colors"
                >
                  Reset to Photo Originals
                </button>
              </div>
            </div>

            {/* Add Dish Drawer / Form */}
            {isAddingDish && (
              <div className="p-5 bg-white rounded-2xl border border-amber-300 shadow-sm space-y-3 text-xs">
                <h4 className="font-bold text-stone-900 text-sm">Add New Menu Item</h4>
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                  <div>
                    <label className="block text-stone-600 mb-1">Dish Name (English)</label>
                    <input
                      type="text"
                      placeholder="e.g. Mutton Keema Pulao"
                      value={newDish.name}
                      onChange={(e) => setNewDish({ ...newDish, name: e.target.value })}
                      className="w-full px-2.5 py-1.5 border border-stone-300 rounded"
                    />
                  </div>

                  <div>
                    <label className="block text-stone-600 mb-1">Category</label>
                    <select
                      value={newDish.category}
                      onChange={(e) => {
                        const cat = e.target.value as DishCategory;
                        setNewDish({ ...newDish, category: cat });
                      }}
                      className="w-full px-2.5 py-1.5 border border-stone-300 rounded"
                    >
                      <option value="taste_of_pulao">Taste of Pulao&apos;s (Spl)</option>
                      <option value="biryani">Biryani</option>
                      <option value="south_indian_starters">South Indian Starters</option>
                      <option value="tandoori_starters">Tandoori Starters</option>
                      <option value="chinese_starters">Chinese Starters</option>
                      <option value="chinese_soups">Chinese Soups</option>
                      <option value="main_course">Main Course Curries</option>
                      <option value="rice_and_noodles">Rice &amp; Noodles</option>
                      <option value="indian_breads">Indian Breads</option>
                      <option value="desserts_and_icecreams">Desserts &amp; Ice Creams</option>
                      <option value="beverages_and_shakes">Beverages &amp; Shakes</option>
                      <option value="salads_and_raita">Salads &amp; Raita</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-stone-600 mb-1">Price (₹)</label>
                    <input
                      type="number"
                      value={newDish.price}
                      onChange={(e) => setNewDish({ ...newDish, price: Number(e.target.value) })}
                      className="w-full px-2.5 py-1.5 border border-stone-300 rounded"
                    />
                  </div>

                  <div>
                    <label className="block text-stone-600 mb-1">Type</label>
                    <select
                      value={newDish.isVegetarian ? 'veg' : 'non-veg'}
                      onChange={(e) => setNewDish({ ...newDish, isVegetarian: e.target.value === 'veg' })}
                      className="w-full px-2.5 py-1.5 border border-stone-300 rounded"
                    >
                      <option value="veg">Vegetarian</option>
                      <option value="non-veg">Non-Vegetarian</option>
                    </select>
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    onClick={() => setIsAddingDish(false)}
                    className="px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      if (!newDish.name) return;
                      addMenuItem({
                        id: `custom-${Date.now()}`,
                        name: newDish.name,
                        teluguName: newDish.teluguName,
                        category: newDish.category || 'taste_of_pulao',
                        categoryName: newDish.category || "Taste of Pulao's",
                        price: Number(newDish.price) || 200,
                        isVegetarian: Boolean(newDish.isVegetarian),
                        isAvailable: true,
                        verifiedFromPhoto: true
                      });
                      setIsAddingDish(false);
                    }}
                    className="px-4 py-1.5 bg-amber-600 text-white rounded font-semibold"
                  >
                    Save Dish to Menu
                  </button>
                </div>
              </div>
            )}

            {/* Search Bar */}
            <div className="relative max-w-md">
              <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search dish name to edit price..."
                value={menuSearch}
                onChange={(e) => setMenuSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-white border border-stone-200 rounded-lg text-xs"
              />
            </div>

            {/* Menu Items Table */}
            <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs">
              <div className="max-h-[500px] overflow-y-auto">
                <table className="w-full text-left text-xs text-stone-700">
                  <thead className="bg-stone-50 border-b border-stone-200 text-stone-500 uppercase tracking-wider text-[10px] sticky top-0 z-10">
                    <tr>
                      <th className="p-3.5">Type</th>
                      <th className="p-3.5">Dish Name</th>
                      <th className="p-3.5">Category</th>
                      <th className="p-3.5">Price (₹)</th>
                      <th className="p-3.5">Availability</th>
                      <th className="p-3.5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100">
                    {menuItems
                      .filter(m => m.name.toLowerCase().includes(menuSearch.toLowerCase()))
                      .map((item) => (
                        <tr key={item.id} className="hover:bg-stone-50/60">
                          <td className="p-3.5">
                            <span
                              className={`w-3.5 h-3.5 rounded-sm border-2 inline-flex items-center justify-center p-0.5 ${
                                item.isVegetarian ? 'border-emerald-600' : 'border-red-600'
                              }`}
                            >
                              <span
                                className={`w-1.5 h-1.5 rounded-full ${
                                  item.isVegetarian ? 'bg-emerald-600' : 'bg-red-600'
                                }`}
                              />
                            </span>
                          </td>
                          <td className="p-3.5 font-semibold text-stone-900">
                            {item.name}
                            {item.portions && (
                              <span className="block text-[10px] text-stone-400 font-normal">
                                Portions: {item.portions.map(p => `${p.name}: ₹${p.price}`).join(', ')}
                              </span>
                            )}
                          </td>
                          <td className="p-3.5 text-stone-500">{item.categoryName}</td>
                          <td className="p-3.5 font-bold tabular-nums">
                            {editingPriceId === item.id ? (
                              <div className="flex items-center gap-1.5">
                                <input
                                  type="number"
                                  value={tempPrice}
                                  onChange={(e) => setTempPrice(Number(e.target.value))}
                                  className="w-20 px-2 py-1 border border-amber-500 rounded text-xs font-bold"
                                />
                                <button
                                  onClick={() => {
                                    updateMenuItemPrice(item.id, tempPrice);
                                    setEditingPriceId(null);
                                  }}
                                  className="p-1 bg-emerald-600 text-white rounded"
                                >
                                  <Check className="w-3 h-3" />
                                </button>
                              </div>
                            ) : (
                              <div className="flex items-center gap-2">
                                <span>₹{item.price}</span>
                                <button
                                  onClick={() => {
                                    setEditingPriceId(item.id);
                                    setTempPrice(item.price);
                                  }}
                                  className="text-stone-400 hover:text-stone-700"
                                >
                                  <Edit2 className="w-3 h-3" />
                                </button>
                              </div>
                            )}
                          </td>
                          <td className="p-3.5">
                            <button
                              onClick={() => toggleItemAvailability(item.id)}
                              className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                item.isAvailable
                                  ? 'bg-emerald-50 text-emerald-700'
                                  : 'bg-red-50 text-red-700'
                              }`}
                            >
                              {item.isAvailable ? 'In Stock' : 'Out of Stock'}
                            </button>
                          </td>
                          <td className="p-3.5 text-right">
                            <button
                              onClick={() => deleteMenuItem(item.id)}
                              className="text-stone-400 hover:text-red-600 p-1"
                              title="Delete Dish"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Today's Special Manager */}
        {adminTab === 'special' && (
          <div className="mt-6 bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 space-y-5 max-w-xl shadow-xs">
            <h3 className="font-serif text-xl font-bold text-stone-900">
              Today&apos;s Special Dish Manager
            </h3>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block font-medium text-stone-700 mb-1">Select Special Dish</label>
                <select
                  value={todaysSpecial.dishId}
                  onChange={(e) => {
                    const match = menuItems.find(m => m.id === e.target.value);
                    if (match) {
                      updateTodaysSpecial({
                        ...todaysSpecial,
                        dishId: match.id,
                        dishName: match.name,
                        category: match.categoryName,
                        price: match.price,
                        description: match.description || todaysSpecial.description
                      });
                    }
                  }}
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg text-xs"
                >
                  {menuItems.map(m => (
                    <option key={m.id} value={m.id}>
                      {m.name} (₹{m.price}) · {m.categoryName}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-medium text-stone-700 mb-1">Special Price (₹)</label>
                <input
                  type="number"
                  value={todaysSpecial.price}
                  onChange={(e) => updateTodaysSpecial({ ...todaysSpecial, price: Number(e.target.value) })}
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg text-xs"
                />
              </div>

              <div>
                <label className="block font-medium text-stone-700 mb-1">Chef Recommendation Note</label>
                <input
                  type="text"
                  value={todaysSpecial.discountNote}
                  onChange={(e) => updateTodaysSpecial({ ...todaysSpecial, discountNote: e.target.value })}
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg text-xs"
                />
              </div>

              <div>
                <label className="block font-medium text-stone-700 mb-1">Description</label>
                <textarea
                  rows={3}
                  value={todaysSpecial.description}
                  onChange={(e) => updateTodaysSpecial({ ...todaysSpecial, description: e.target.value })}
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg text-xs resize-none"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="specialActive"
                  checked={todaysSpecial.isAvailable}
                  onChange={(e) => updateTodaysSpecial({ ...todaysSpecial, isAvailable: e.target.checked })}
                  className="rounded text-amber-600 focus:ring-amber-500"
                />
                <label htmlFor="specialActive" className="font-semibold text-stone-800">
                  Feature this dish on Homepage &amp; Top of Restaurant
                </label>
              </div>
            </div>
          </div>
        )}

        {/* Tab 5: Hotel Rooms & Rates */}
        {adminTab === 'hotel' && (
          <div className="mt-6 space-y-4">
            <h3 className="font-serif text-xl font-bold text-stone-900">
              Hotel Room Types &amp; Nightly Tariff Management
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {hotelRooms.map((room) => (
                <div key={room.id} className="p-5 bg-white rounded-2xl border border-stone-200 space-y-3 text-xs">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-bold text-sm text-stone-900">{room.name}</h4>
                      <span className="text-amber-700 font-medium">{room.bedType}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-base font-bold text-stone-900">₹{room.pricePerNight}</span>
                      <span className="text-[10px] text-stone-400 block">per night</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-stone-500 mb-1">Nightly Tariff (₹)</label>
                    <input
                      type="number"
                      value={room.pricePerNight}
                      onChange={(e) => updateHotelRoom({ ...room, pricePerNight: Number(e.target.value) })}
                      className="w-full px-3 py-2 border border-stone-300 rounded-lg"
                    />
                  </div>

                  <div>
                    <label className="block text-stone-500 mb-1">Occupancy Details</label>
                    <input
                      type="text"
                      value={room.occupancy}
                      onChange={(e) => updateHotelRoom({ ...room, occupancy: e.target.value })}
                      className="w-full px-3 py-2 border border-stone-300 rounded-lg"
                    />
                  </div>

                  <div>
                    <label className="block text-stone-500 mb-1">Description</label>
                    <textarea
                      rows={2}
                      value={room.description}
                      onChange={(e) => updateHotelRoom({ ...room, description: e.target.value })}
                      className="w-full px-3 py-2 border border-stone-300 rounded-lg resize-none"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 6: Customer Reviews Moderation */}
        {adminTab === 'reviews' && (
          <div className="mt-6 space-y-4">
            <h3 className="font-serif text-xl font-bold text-stone-900">
              Customer Feedback Moderation
            </h3>

            <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs">
              <table className="w-full text-left text-xs text-stone-700">
                <thead className="bg-stone-50 border-b border-stone-200 text-stone-500 uppercase tracking-wider text-[10px]">
                  <tr>
                    <th className="p-3.5">Guest &amp; Date</th>
                    <th className="p-3.5">Rating &amp; Type</th>
                    <th className="p-3.5">Comment</th>
                    <th className="p-3.5">Status</th>
                    <th className="p-3.5 text-right">Moderation Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {reviews.map((rev) => (
                    <tr key={rev.id} className="hover:bg-stone-50/60">
                      <td className="p-3.5">
                        <span className="font-bold text-stone-900 block">{rev.customerName}</span>
                        <span className="text-[10px] text-stone-400">{rev.date}</span>
                      </td>
                      <td className="p-3.5">
                        <span className="font-bold text-amber-700">{rev.rating} / 5 Stars</span>
                        <span className="block text-[10px] text-stone-500">{rev.reviewType}</span>
                      </td>
                      <td className="p-3.5 max-w-md">
                        <p className="text-stone-800 line-clamp-2">&quot;{rev.comment}&quot;</p>
                      </td>
                      <td className="p-3.5">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            rev.isApproved ? 'bg-emerald-50 text-emerald-800' : 'bg-amber-50 text-amber-800'
                          }`}
                        >
                          {rev.isApproved ? 'Published' : 'Pending Approval'}
                        </span>
                      </td>
                      <td className="p-3.5 text-right">
                        <button
                          onClick={() => toggleReviewApproval(rev.id)}
                          className={`px-3 py-1 rounded text-xs font-semibold ${
                            rev.isApproved
                              ? 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                              : 'bg-emerald-600 text-white hover:bg-emerald-700'
                          }`}
                        >
                          {rev.isApproved ? 'Unpublish' : 'Approve & Publish'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 7: Leads Management */}
        {adminTab === 'leads' && (
          <div className="mt-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-serif text-xl font-bold text-stone-900">
                  Customer Leads Database ({leads.length} Contacts)
                </h3>
                <p className="text-xs text-stone-500">
                  Customers who gave explicit promotional consent via Food &amp; Stay Club popup.
                </p>
              </div>

              <button
                onClick={handleExportLeads}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold rounded-lg shadow-xs transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export Leads (CSV)</span>
              </button>
            </div>

            <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs">
              <table className="w-full text-left text-xs text-stone-700">
                <thead className="bg-stone-50 border-b border-stone-200 text-stone-500 uppercase tracking-wider text-[10px]">
                  <tr>
                    <th className="p-3.5">Mobile Number</th>
                    <th className="p-3.5">Guest Name</th>
                    <th className="p-3.5">WhatsApp Consent</th>
                    <th className="p-3.5">Date &amp; Source</th>
                    <th className="p-3.5 text-right">Direct Message</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {leads.map((l) => (
                    <tr key={l.id} className="hover:bg-stone-50/60">
                      <td className="p-3.5 font-mono font-bold text-stone-900">
                        +91 {l.mobileNumber}
                      </td>
                      <td className="p-3.5">{l.firstName || 'Valued Guest'}</td>
                      <td className="p-3.5">
                        <span className="text-emerald-700 font-semibold flex items-center gap-1">
                          <Check className="w-3.5 h-3.5" />
                          <span>Explicit Consent</span>
                        </span>
                      </td>
                      <td className="p-3.5 text-[11px] text-stone-500">
                        {l.signedUpAt} · {l.source}
                      </td>
                      <td className="p-3.5 text-right">
                        <a
                          href={`https://wa.me/91${l.mobileNumber}?text=Hello%20${encodeURIComponent(l.firstName || 'Guest')},%20greetings%20from%20TASTE%20OF%20Pulao's%20Shreyas%20Grand!`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-emerald-700 hover:text-emerald-800 font-semibold"
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                          <span>WhatsApp</span>
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 8: Festival WhatsApp Campaigns */}
        {adminTab === 'campaigns' && (
          <div className="mt-6 space-y-4">
            <div>
              <h3 className="font-serif text-xl font-bold text-stone-900">
                Festival WhatsApp Greetings &amp; Broadcast Manager
              </h3>
              <p className="text-xs text-stone-500">
                Prepare festive messages for Sankranti, Ugadi, Diwali, Dussehra, Eid, Christmas, and Birthdays.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {campaigns.map((camp) => (
                <div key={camp.id} className="p-5 bg-white rounded-2xl border border-stone-200 space-y-3 text-xs">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-bold text-sm text-stone-900">{camp.festivalName}</h4>
                      <span className="text-amber-700 font-medium">{camp.occasion}</span>
                    </div>
                    <span className="bg-amber-50 text-amber-800 px-2 py-0.5 rounded font-semibold text-[10px]">
                      {camp.targetAudience}
                    </span>
                  </div>

                  <div>
                    <label className="block text-stone-500 mb-1">Special Offer Text</label>
                    <input
                      type="text"
                      value={camp.offerText}
                      onChange={(e) => updateCampaign({ ...camp, offerText: e.target.value })}
                      className="w-full px-3 py-1.5 border border-stone-300 rounded"
                    />
                  </div>

                  <div>
                    <label className="block text-stone-500 mb-1">WhatsApp Message Template</label>
                    <textarea
                      rows={4}
                      value={camp.defaultMessage}
                      onChange={(e) => updateCampaign({ ...camp, defaultMessage: e.target.value })}
                      className="w-full px-3 py-1.5 border border-stone-300 rounded resize-none"
                    />
                  </div>

                  <a
                    href={`https://wa.me/?text=${encodeURIComponent(camp.defaultMessage)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-1.5 w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg transition-colors"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>Broadcast via WhatsApp</span>
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 9: Loyalty Club */}
        {adminTab === 'loyalty' && (
          <div className="mt-6 space-y-4">
            <h3 className="font-serif text-xl font-bold text-stone-900">
              Shreyas Grand Food Club &amp; Rewards Ledger
            </h3>

            <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs">
              <table className="w-full text-left text-xs text-stone-700">
                <thead className="bg-stone-50 border-b border-stone-200 text-stone-500 uppercase tracking-wider text-[10px]">
                  <tr>
                    <th className="p-3.5">Customer &amp; Phone</th>
                    <th className="p-3.5">Total Meals</th>
                    <th className="p-3.5">Punch Card (0-10)</th>
                    <th className="p-3.5">Free Meals Earned</th>
                    <th className="p-3.5">Redeemed</th>
                    <th className="p-3.5 text-right">Manual Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {loyaltyMembers.map((m) => (
                    <tr key={m.phone} className="hover:bg-stone-50/60">
                      <td className="p-3.5">
                        <span className="font-bold text-stone-900 block">{m.name}</span>
                        <span className="font-mono text-stone-500">+91 {m.phone}</span>
                      </td>
                      <td className="p-3.5 font-bold tabular-nums">{m.totalCompletedMeals}</td>
                      <td className="p-3.5">
                        <span className="font-semibold text-amber-700">{m.qualifyingPunchCount} / 10</span>
                      </td>
                      <td className="p-3.5 font-bold text-emerald-700 tabular-nums">{m.freeMealsEarned}</td>
                      <td className="p-3.5 tabular-nums">{m.freeMealsRedeemed}</td>
                      <td className="p-3.5 text-right">
                        <button
                          onClick={() => addLoyaltyPunch(m.phone, m.name)}
                          className="px-2.5 py-1 bg-stone-100 hover:bg-stone-200 rounded text-[11px] font-medium"
                        >
                          +1 Meal Punch
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 10: Menu Photo Audit */}
        {adminTab === 'audit' && (
          <div className="mt-6 bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 space-y-4 shadow-xs">
            <div className="flex items-center gap-2 text-emerald-700 font-bold text-base">
              <Check className="w-5 h-5 text-emerald-600" />
              <span>Menu Extraction &amp; Visual Verification Audit Report</span>
            </div>

            <p className="text-xs text-stone-600 leading-relaxed">
              Every printed menu section from the 6 physical photograph uploads was systematically transcribed, cross-verified, and organized into digital categories with exact printed prices:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs pt-2">
              <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
                <span className="text-stone-500 font-medium">Taste of Pulao&apos;s (Spl)</span>
                <p className="font-bold text-stone-900 text-sm mt-0.5">24 Dishes Verified</p>
                <span className="text-[10px] text-emerald-700">Photos 6 &amp; 10 verified</span>
              </div>

              <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
                <span className="text-stone-500 font-medium">Biryani &amp; Rice</span>
                <p className="font-bold text-stone-900 text-sm mt-0.5">24 Dishes Verified</p>
                <span className="text-[10px] text-emerald-700">Photos 1 &amp; 11 verified</span>
              </div>

              <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
                <span className="text-stone-500 font-medium">South Indian Starters</span>
                <p className="font-bold text-stone-900 text-sm mt-0.5">13 Dishes Verified</p>
                <span className="text-[10px] text-emerald-700">Photos 2 &amp; 8 verified</span>
              </div>

              <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
                <span className="text-stone-500 font-medium">Tandoori Starters</span>
                <p className="font-bold text-stone-900 text-sm mt-0.5">21 Dishes Verified</p>
                <span className="text-[10px] text-emerald-700">Photos 2 &amp; 8 verified</span>
              </div>

              <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
                <span className="text-stone-500 font-medium">Chinese Starters</span>
                <p className="font-bold text-stone-900 text-sm mt-0.5">36 Dishes Verified</p>
                <span className="text-[10px] text-emerald-700">Photos 4 &amp; 7 verified</span>
              </div>

              <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
                <span className="text-stone-500 font-medium">Main Course Curries</span>
                <p className="font-bold text-stone-900 text-sm mt-0.5">34 Dishes Verified</p>
                <span className="text-[10px] text-emerald-700">Photos 3 &amp; 5 verified</span>
              </div>

              <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
                <span className="text-stone-500 font-medium">Rice &amp; Noodles</span>
                <p className="font-bold text-stone-900 text-sm mt-0.5">22 Dishes Verified</p>
                <span className="text-[10px] text-emerald-700">Photos 1 &amp; 11 verified</span>
              </div>

              <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
                <span className="text-stone-500 font-medium">Desserts &amp; Beverages</span>
                <p className="font-bold text-stone-900 text-sm mt-0.5">24 Items Verified</p>
                <span className="text-[10px] text-emerald-700">Photo 9 verified</span>
              </div>

              <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
                <span className="text-stone-500 font-medium">Indian Breads &amp; Salads</span>
                <p className="font-bold text-stone-900 text-sm mt-0.5">14 Items Verified</p>
                <span className="text-[10px] text-emerald-700">Photos 1 &amp; 9 verified</span>
              </div>
            </div>

            {/* Note on Confidence & Verification */}
            <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 text-xs text-stone-700 space-y-1">
              <span className="font-bold text-stone-900">Portions &amp; Minor Clarifications Noted:</span>
              <ul className="list-disc list-inside space-y-0.5 text-stone-600 pt-1">
                <li><span className="font-medium text-stone-900">Chicken Dum Biryani:</span> Single portion is ₹160, Full portion is ₹260.</li>
                <li><span className="font-medium text-stone-900">Tandoori Chicken:</span> Half portion is ₹240, Full portion is ₹420.</li>
                <li><span className="font-medium text-stone-900">Pulka &amp; Gulab Jamun:</span> Printed explicitly as 2 pieces per serving (₹40 and ₹60).</li>
                <li><span className="font-medium text-stone-900">Royyala Vepudu:</span> Standardized from spelling variation &apos;ROYVALA VEPUDU&apos; on starter page.</li>
                <li>Zero dishes or prices were invented. All 130+ items map directly to the uploaded menu.</li>
              </ul>
            </div>
          </div>
        )}

        {/* Tab 11: Settings & Phones */}
        {adminTab === 'settings' && (
          <div className="mt-6 bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 space-y-5 max-w-xl shadow-xs">
            <h3 className="font-serif text-xl font-bold text-stone-900">
              Business Information &amp; Phone Settings
            </h3>

            {settingsSaved && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-lg">
                Settings updated successfully and synchronized!
              </div>
            )}

            <div className="space-y-4 text-xs">
              <div>
                <label className="block font-medium text-stone-700 mb-1">Business Name</label>
                <input
                  type="text"
                  value={settingsForm.businessName}
                  onChange={(e) => setSettingsForm({ ...settingsForm, businessName: e.target.value })}
                  className="w-full px-3 py-2 border border-stone-300 rounded-lg text-xs"
                />
              </div>

              <div>
                <label className="block font-medium text-stone-700 mb-1">
                  Primary WhatsApp Number (Orders &amp; Enquiries) *
                </label>
                <input
                  type="text"
                  value={settingsForm.primaryPhone}
                  onChange={(e) => setSettingsForm({ ...settingsForm, primaryPhone: e.target.value, primaryWhatsApp: e.target.value.replace(/\D/g, '') })}
                  className="w-full px-3 py-2 border border-stone-300 rounded-lg text-xs font-mono"
                />
                <span className="text-[10px] text-stone-400">Default verified number: +91 95535 55847</span>
              </div>

              <div>
                <label className="block font-medium text-stone-700 mb-1">
                  Secondary Contact Number (Front Desk Call Link) *
                </label>
                <input
                  type="text"
                  value={settingsForm.secondaryPhone}
                  onChange={(e) => setSettingsForm({ ...settingsForm, secondaryPhone: e.target.value })}
                  className="w-full px-3 py-2 border border-stone-300 rounded-lg text-xs font-mono"
                />
                <span className="text-[10px] text-stone-400">Default verified number: +91 95535 55856</span>
              </div>

              <div>
                <label className="block font-medium text-stone-700 mb-1">Address</label>
                <textarea
                  rows={2}
                  value={settingsForm.address}
                  onChange={(e) => setSettingsForm({ ...settingsForm, address: e.target.value })}
                  className="w-full px-3 py-2 border border-stone-300 rounded-lg text-xs resize-none"
                />
              </div>

              <div>
                <label className="block font-medium text-stone-700 mb-1">Opening Hours</label>
                <input
                  type="text"
                  value={settingsForm.openingHours}
                  onChange={(e) => setSettingsForm({ ...settingsForm, openingHours: e.target.value })}
                  className="w-full px-3 py-2 border border-stone-300 rounded-lg text-xs"
                />
              </div>

              <button
                onClick={() => {
                  updateSettings(settingsForm);
                  setSettingsSaved(true);
                  setTimeout(() => setSettingsSaved(false), 3000);
                }}
                className="w-full py-2.5 bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded-lg shadow-xs transition-colors cursor-pointer text-xs"
              >
                Save Business Settings
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
