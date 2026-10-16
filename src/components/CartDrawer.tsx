import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, Trash2, Plus, Minus, MessageCircle, Clock, ShoppingBag, CheckCircle, Copy } from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateCartQuantity,
    cartSubtotal,
    cartCount,
    createPickupOrder,
    generateWhatsAppOrderUrl,
    copyOrderToClipboard,
    settings,
    language
  } = useApp();

  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [pickupDate, setPickupDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [pickupTime, setPickupTime] = useState('13:30');
  const [instructions, setInstructions] = useState('');
  const [orderSuccess, setOrderSuccess] = useState<any>(null);
  const [copyStatus, setCopyStatus] = useState(false);
  const [validationError, setValidationError] = useState('');

  if (!isCartOpen) return null;

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim()) {
      setValidationError('Please enter your name.');
      return;
    }
    const cleanPhone = customerPhone.replace(/\D/g, '').slice(-10);
    if (cleanPhone.length !== 10) {
      setValidationError('Please provide a valid 10-digit Indian mobile number.');
      return;
    }

    setValidationError('');
    const newOrder = createPickupOrder({
      customerName: customerName.trim(),
      customerPhone: cleanPhone,
      pickupDate,
      pickupTime,
      specialInstructions: instructions.trim() || undefined
    });

    setOrderSuccess(newOrder);
  };

  const handleCopyTransaction = async () => {
    if (orderSuccess) {
      const ok = await copyOrderToClipboard(orderSuccess);
      if (ok) {
        setCopyStatus(true);
        setTimeout(() => setCopyStatus(false), 2500);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0 bg-stone-950/50 backdrop-blur-xs transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          {/* Header */}
          <div className="p-5 border-b border-stone-200 flex items-center justify-between bg-stone-50">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-amber-600" />
              <h2 className="font-serif text-lg font-bold text-stone-900">
                {language === 'en' ? 'Restaurant Pickup Cart' : 'రెస్టారెంట్ పికప్ కార్ట్'}
              </h2>
              {cartCount > 0 && (
                <span className="text-xs bg-amber-100 text-amber-800 font-semibold px-2 py-0.5 rounded-full">
                  {cartCount} items
                </span>
              )}
            </div>

            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 text-stone-500 hover:text-stone-800 hover:bg-stone-200/60 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-5">
            {orderSuccess ? (
              /* Order Confirmation Screen */
              <div className="text-center py-6 space-y-4">
                <div className="w-14 h-14 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle className="w-8 h-8" />
                </div>

                <div>
                  <span className="text-xs font-semibold text-emerald-700 uppercase tracking-wider">
                    Pickup Pre-Order Placed
                  </span>
                  <h3 className="font-serif text-2xl font-bold text-stone-900 mt-1">
                    Order #{orderSuccess.orderId}
                  </h3>
                  <p className="text-stone-600 text-xs mt-1">
                    Scheduled for {orderSuccess.pickupDate} at {orderSuccess.pickupTime}
                  </p>
                </div>

                <div className="bg-amber-50 rounded-xl p-4 text-left border border-amber-200 text-xs space-y-2">
                  <div className="flex justify-between text-stone-700 font-medium">
                    <span>Customer:</span>
                    <span className="text-stone-900 font-bold">{orderSuccess.customerName}</span>
                  </div>
                  <div className="flex justify-between text-stone-700 font-medium">
                    <span>Mobile:</span>
                    <span className="text-stone-900 font-bold">{orderSuccess.customerPhone}</span>
                  </div>
                  <div className="flex justify-between text-stone-700 font-medium">
                    <span>Total Amount:</span>
                    <span className="text-stone-900 font-bold text-sm">₹{orderSuccess.total}</span>
                  </div>
                  <div className="flex justify-between text-stone-700 font-medium">
                    <span>Payment:</span>
                    <span className="text-amber-800 font-semibold">Pay at Pickup Counter</span>
                  </div>
                  <p className="text-[11px] text-stone-500 pt-2 border-t border-amber-200">
                    Location: Opposite Railway Station, Srinivas Nagar, Anantapur.
                  </p>
                </div>

                {/* WhatsApp Order Send */}
                <a
                  href={generateWhatsAppOrderUrl(orderSuccess)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm rounded-lg shadow-sm transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Send Order to WhatsApp (+91 95535 55847)</span>
                </a>

                {/* Copy to Clipboard Feature */}
                <button
                  onClick={handleCopyTransaction}
                  className="w-full inline-flex items-center justify-center gap-2 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-800 font-medium text-xs rounded-lg transition-colors cursor-pointer"
                >
                  <Copy className="w-4 h-4 text-stone-500" />
                  <span>{copyStatus ? 'Order Details Copied!' : 'Copy Transaction Receipt to Clipboard'}</span>
                </button>

                <button
                  onClick={() => {
                    setOrderSuccess(null);
                    setIsCartOpen(false);
                  }}
                  className="w-full py-2 text-stone-600 hover:text-stone-900 text-xs font-semibold"
                >
                  Close &amp; Back to Restaurant
                </button>
              </div>
            ) : cart.length === 0 ? (
              /* Empty Cart */
              <div className="text-center py-16 space-y-3">
                <ShoppingBag className="w-12 h-12 text-stone-300 mx-auto" />
                <p className="text-stone-700 font-medium text-base">Your cart is empty</p>
                <p className="text-stone-500 text-xs max-w-xs mx-auto">
                  Explore our authentic Rayalaseema pulaos, dum biryanis, and tandoori starters from the menu.
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="mt-2 px-5 py-2.5 bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                >
                  Browse Menu Items
                </button>
              </div>
            ) : (
              /* Active Cart Items & Checkout Form */
              <div className="space-y-6">
                {/* Item List */}
                <div className="space-y-3 divide-y divide-stone-100">
                  {cart.map((item) => (
                    <div key={item.id} className="pt-3 first:pt-0 flex items-center justify-between gap-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-1.5">
                          <span className={`w-2.5 h-2.5 rounded-full shrink-0 ${item.isVegetarian ? 'bg-emerald-600' : 'bg-red-600'}`} />
                          <h4 className="font-semibold text-stone-900 text-sm leading-snug">
                            {item.name}
                          </h4>
                        </div>
                        {item.portionName && (
                          <span className="text-xs text-amber-700 font-medium ml-4">
                            Portion: {item.portionName}
                          </span>
                        )}
                        <span className="block text-xs font-medium text-stone-600 ml-4 tabular-nums mt-0.5">
                          ₹{item.price} each
                        </span>
                      </div>

                      {/* Quantity Stepper */}
                      <div className="flex items-center gap-2 shrink-0">
                        <div className="flex items-center border border-stone-200 rounded-lg overflow-hidden bg-stone-50">
                          <button
                            onClick={() => updateCartQuantity(item.id, -1)}
                            className="p-1.5 hover:bg-stone-200 text-stone-600 transition-colors"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2.5 text-xs font-bold text-stone-800 tabular-nums">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateCartQuantity(item.id, 1)}
                            className="p-1.5 hover:bg-stone-200 text-stone-600 transition-colors"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <span className="text-sm font-bold text-stone-900 w-14 text-right tabular-nums">
                          ₹{item.price * item.quantity}
                        </span>

                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="p-1.5 text-stone-400 hover:text-red-600 rounded transition-colors"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Subtotal Calculation */}
                <div className="bg-stone-50 rounded-xl p-4 border border-stone-200 space-y-2 text-xs">
                  <div className="flex justify-between text-stone-600">
                    <span>Items Subtotal:</span>
                    <span className="font-semibold text-stone-900 tabular-nums">₹{cartSubtotal}</span>
                  </div>
                  <div className="flex justify-between text-stone-600">
                    <span>Packaging &amp; Parcel:</span>
                    <span className="font-medium text-emerald-700">Complimentary</span>
                  </div>
                  <div className="flex justify-between text-sm font-bold text-stone-900 pt-2 border-t border-stone-200">
                    <span>Total Amount:</span>
                    <span className="text-amber-800 text-base tabular-nums">₹{cartSubtotal}</span>
                  </div>
                </div>

                {/* Pre-order Details Form */}
                <form onSubmit={handleSubmitOrder} className="space-y-3 pt-2">
                  <h4 className="font-semibold text-stone-900 text-xs uppercase tracking-wider">
                    Pickup Pre-Order Details
                  </h4>

                  {validationError && (
                    <div className="p-2.5 bg-red-50 border border-red-200 text-red-700 text-xs rounded-lg">
                      {validationError}
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-medium text-stone-700 mb-1">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Anand Varma"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg text-xs focus:bg-white focus:outline-none focus:ring-1 focus:ring-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-stone-700 mb-1">
                      10-Digit Mobile Number *
                    </label>
                    <div className="flex">
                      <span className="inline-flex items-center px-2.5 bg-stone-100 border border-r-0 border-stone-200 rounded-l-lg text-xs text-stone-500 font-mono">
                        +91
                      </span>
                      <input
                        type="tel"
                        required
                        maxLength={10}
                        placeholder="9848012345"
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                        className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-r-lg text-xs focus:bg-white focus:outline-none focus:ring-1 focus:ring-amber-500 font-mono"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-stone-700 mb-1">
                        Pickup Date
                      </label>
                      <input
                        type="date"
                        value={pickupDate}
                        onChange={(e) => setPickupDate(e.target.value)}
                        className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg text-xs focus:bg-white focus:outline-none focus:ring-1 focus:ring-amber-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-stone-700 mb-1">
                        Pickup Time
                      </label>
                      <input
                        type="time"
                        value={pickupTime}
                        onChange={(e) => setPickupTime(e.target.value)}
                        className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg text-xs focus:bg-white focus:outline-none focus:ring-1 focus:ring-amber-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-stone-700 mb-1">
                      Special Cooking / Packing Instructions (Optional)
                    </label>
                    <textarea
                      rows={2}
                      placeholder="e.g. Medium spice level, pack for train journey..."
                      value={instructions}
                      onChange={(e) => setInstructions(e.target.value)}
                      className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg text-xs focus:bg-white focus:outline-none focus:ring-1 focus:ring-amber-500 resize-none"
                    />
                  </div>

                  {/* Submission Buttons */}
                  <div className="pt-2 space-y-2">
                    <button
                      type="submit"
                      className="w-full py-3 bg-amber-600 hover:bg-amber-700 text-white font-semibold text-xs rounded-lg shadow-sm transition-colors cursor-pointer"
                    >
                      Place Pickup Pre-Order (Pay at Pickup · ₹{cartSubtotal})
                    </button>

                    {/* Direct WhatsApp Ordering */}
                    <button
                      type="button"
                      onClick={(e) => {
                        handleSubmitOrder(e);
                        // Open WhatsApp directly
                        const cleanPhone = customerPhone.replace(/\D/g, '').slice(-10);
                        if (cleanPhone.length === 10 && customerName.trim()) {
                          const tempOrder = {
                            orderId: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
                            createdAt: new Date().toISOString(),
                            customerName,
                            customerPhone: cleanPhone,
                            pickupDate,
                            pickupTime,
                            items: cart,
                            subtotal: cartSubtotal,
                            total: cartSubtotal,
                            status: 'New' as const,
                            paymentMethod: 'Pay at Pickup' as const,
                            isPaid: false
                          };
                          window.open(generateWhatsAppOrderUrl(tempOrder), '_blank');
                        }
                      }}
                      className="w-full inline-flex items-center justify-center gap-2 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs rounded-lg transition-colors cursor-pointer"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Order Directly via WhatsApp</span>
                    </button>
                  </div>

                  <p className="text-[11px] text-stone-500 text-center pt-1">
                    Verified restaurant contact: <span className="font-semibold text-stone-700">{settings.primaryPhone}</span>
                  </p>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
