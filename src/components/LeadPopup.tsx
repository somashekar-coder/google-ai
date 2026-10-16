import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, Gift, ShieldCheck, Sparkles, CheckCircle } from 'lucide-react';

export const LeadPopup: React.FC = () => {
  const { isLeadPopupOpen, setIsLeadPopupOpen, addCustomerLead } = useApp();
  const [firstName, setFirstName] = useState('');
  const [phone, setPhone] = useState('');
  const [consent, setConsent] = useState(true);
  const [statusMessage, setStatusMessage] = useState<{ success: boolean; text: string } | null>(null);

  if (!isLeadPopupOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = addCustomerLead(phone, firstName, consent);
    setStatusMessage({ success: result.success, text: result.message });
    if (result.success) {
      setTimeout(() => {
        setIsLeadPopupOpen(false);
      }, 2500);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/60 backdrop-blur-xs">
      <div className="relative bg-white rounded-2xl max-w-md w-full shadow-2xl border border-amber-200 overflow-hidden">
        {/* Close Button */}
        <button
          onClick={() => setIsLeadPopupOpen(false)}
          className="absolute top-4 right-4 z-10 p-1.5 text-stone-400 hover:text-stone-700 hover:bg-stone-100 rounded-lg transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Banner */}
        <div className="bg-gradient-to-r from-amber-600 to-amber-700 text-white p-6 space-y-2">
          <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-xs flex items-center justify-center">
            <Gift className="w-6 h-6 text-white" />
          </div>
          <h3 className="font-serif text-2xl font-bold tracking-tight">
            Join Our Food &amp; Stay Club!
          </h3>
          <p className="text-amber-100 text-xs leading-relaxed">
            Get exclusive festival deals, secret chef specials, birthday treats, and room booking discounts at TASTE OF Pulao’s Shreyas Grand.
          </p>
        </div>

        {/* Content Body */}
        <div className="p-6">
          {statusMessage ? (
            <div
              className={`p-4 rounded-xl text-xs space-y-2 text-center ${
                statusMessage.success
                  ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                  : 'bg-red-50 text-red-800 border border-red-200'
              }`}
            >
              {statusMessage.success && <CheckCircle className="w-8 h-8 text-emerald-600 mx-auto" />}
              <p className="font-semibold text-sm">{statusMessage.text}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-medium text-stone-700 mb-1">
                  First Name (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Ramesh"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg text-xs focus:bg-white focus:outline-none focus:ring-1 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block font-medium text-stone-700 mb-1">
                  10-Digit Mobile Number *
                </label>
                <div className="flex">
                  <span className="inline-flex items-center px-3 bg-stone-100 border border-r-0 border-stone-200 rounded-l-lg text-xs font-mono text-stone-500">
                    +91
                  </span>
                  <input
                    type="tel"
                    required
                    maxLength={10}
                    placeholder="9553555847"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-r-lg text-xs font-mono focus:bg-white focus:outline-none focus:ring-1 focus:ring-amber-500"
                  />
                </div>
              </div>

              {/* Explicit WhatsApp promotional consent */}
              <label className="flex items-start gap-2.5 cursor-pointer text-stone-600 text-[11px] leading-snug">
                <input
                  type="checkbox"
                  required
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  className="mt-0.5 rounded text-amber-600 focus:ring-amber-500"
                />
                <span>
                  I give explicit consent to receive festive WhatsApp greetings, seasonal menu offers, and hotel discounts from TASTE OF Pulao’s Shreyas Grand.
                </span>
              </label>

              <button
                type="submit"
                className="w-full py-3 bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded-lg shadow-sm transition-colors cursor-pointer text-xs flex items-center justify-center gap-1.5"
              >
                <Sparkles className="w-4 h-4" />
                <span>Join Food &amp; Stay Club Free</span>
              </button>

              <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-[10px] text-stone-400">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-stone-400" />
                  <span>Privacy protected · No spam</span>
                </span>
                <span>Unsubscribe anytime via WhatsApp</span>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
