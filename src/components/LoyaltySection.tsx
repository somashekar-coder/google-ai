import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Award, Gift, Check, Search, Sparkles, AlertCircle } from 'lucide-react';

export const LoyaltySection: React.FC = () => {
  const { getLoyaltyByPhone, redeemFreeMeal, language } = useApp();

  const [phoneQuery, setPhoneQuery] = useState('');
  const [memberResult, setMemberResult] = useState<any>(null);
  const [searched, setSearched] = useState(false);
  const [redeemStatus, setRedeemStatus] = useState<string | null>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = phoneQuery.replace(/\D/g, '').slice(-10);
    if (clean.length !== 10) return;

    const res = getLoyaltyByPhone(clean);
    setMemberResult(res || null);
    setSearched(true);
    setRedeemStatus(null);
  };

  const handleRedeem = () => {
    if (!memberResult) return;
    const res = redeemFreeMeal(memberResult.phone);
    if (res.success) {
      setRedeemStatus(res.message);
      // Refresh
      const updated = getLoyaltyByPhone(memberResult.phone);
      setMemberResult(updated);
    } else {
      setRedeemStatus(res.message);
    }
  };

  return (
    <section id="loyalty" className="py-16 bg-gradient-to-b from-white via-amber-50/40 to-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="max-w-3xl space-y-3">
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-700 uppercase tracking-wider">
            <Award className="w-4 h-4 text-amber-600" />
            <span>SHREYAS GRAND REWARDS</span>
          </div>

          <h2 className="font-serif text-3xl font-bold text-stone-900">
            {language === 'en' ? 'Shreyas Grand Food Club' : 'శ్రేయస్ గ్రాండ్ ఫుడ్ క్లబ్'}
          </h2>

          <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
            Every qualifying meal you complete and pay for counts towards rewarding loyalty. Enjoy 1 free meal voucher after every 10 completed meals, plus special birthday discounts and festival treats.
          </p>
        </div>

        {/* 3 Loyalty Highlights */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div className="p-5 bg-white rounded-xl border border-amber-200 shadow-xs space-y-2">
            <div className="w-9 h-9 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-base">
              10
            </div>
            <h4 className="font-serif font-bold text-stone-900 text-base">
              10 Meals = 1 Free Meal
            </h4>
            <p className="text-xs text-stone-600">
              Each qualifying restaurant order punches your virtual loyalty card. Complete 10 meals to receive a free meal reward.
            </p>
          </div>

          <div className="p-5 bg-white rounded-xl border border-amber-200 shadow-xs space-y-2">
            <div className="w-9 h-9 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center">
              <Gift className="w-5 h-5 text-amber-700" />
            </div>
            <h4 className="font-serif font-bold text-stone-900 text-base">
              Birthday Special Treat
            </h4>
            <p className="text-xs text-stone-600">
              Registered Food Club members receive a complimentary sweet treat or dessert during their birthday week.
            </p>
          </div>

          <div className="p-5 bg-white rounded-xl border border-amber-200 shadow-xs space-y-2">
            <div className="w-9 h-9 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-amber-700" />
            </div>
            <h4 className="font-serif font-bold text-stone-900 text-base">
              Festival WhatsApp Passes
            </h4>
            <p className="text-xs text-stone-600">
              Direct WhatsApp invitations to seasonal Rayalaseema food festivals, Sankranti thalis, and Ugadi feasts.
            </p>
          </div>
        </div>

        {/* Loyalty Lookup Card */}
        <div className="mt-10 bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 shadow-xs max-w-2xl">
          <h3 className="font-serif text-lg font-bold text-stone-900">
            Check Your Meal Progress &amp; Rewards
          </h3>
          <p className="text-xs text-stone-500 mt-0.5">
            Enter your 10-digit mobile number used when ordering or placing room enquiries.
          </p>

          <form onSubmit={handleSearch} className="mt-4 flex flex-col sm:flex-row gap-3">
            <div className="flex flex-1">
              <span className="inline-flex items-center px-3 bg-stone-100 border border-r-0 border-stone-200 rounded-l-lg text-xs font-mono text-stone-500">
                +91
              </span>
              <input
                type="tel"
                maxLength={10}
                required
                placeholder="e.g. 9553555847"
                value={phoneQuery}
                onChange={(e) => setPhoneQuery(e.target.value)}
                className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-r-lg text-xs font-mono focus:bg-white focus:outline-none focus:ring-1 focus:ring-amber-500"
              />
            </div>
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold rounded-lg shadow-2xs transition-colors cursor-pointer"
            >
              <Search className="w-3.5 h-3.5" />
              <span>Check Status</span>
            </button>
          </form>

          {/* Result Card */}
          {searched && (
            <div className="mt-6 pt-6 border-t border-stone-200">
              {memberResult ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-stone-900 text-sm">
                        {memberResult.name}
                      </h4>
                      <p className="text-xs text-stone-500 font-mono">
                        Mobile: +91 {memberResult.phone} · Member since {memberResult.joinedDate}
                      </p>
                    </div>

                    <div className="text-right">
                      <span className="text-xs text-stone-500 block">Total Completed:</span>
                      <span className="font-bold text-stone-900 text-sm tabular-nums">
                        {memberResult.totalCompletedMeals} Meals
                      </span>
                    </div>
                  </div>

                  {/* Punch Card Visualization */}
                  <div className="p-4 bg-amber-50 rounded-xl border border-amber-200 space-y-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-amber-900">
                        Current Punch Card Progress ({memberResult.qualifyingPunchCount}/10)
                      </span>
                      <span className="text-stone-600">
                        {10 - memberResult.qualifyingPunchCount} more for next free meal!
                      </span>
                    </div>

                    <div className="grid grid-cols-5 sm:grid-cols-10 gap-2">
                      {Array.from({ length: 10 }).map((_, idx) => {
                        const isPunched = idx < memberResult.qualifyingPunchCount;
                        return (
                          <div
                            key={idx}
                            className={`h-9 rounded-lg flex items-center justify-center text-xs font-bold transition-all ${
                              isPunched
                                ? 'bg-amber-600 text-white shadow-xs'
                                : 'bg-white border border-dashed border-amber-300 text-stone-300'
                            }`}
                          >
                            {isPunched ? <Check className="w-4 h-4" /> : idx + 1}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Rewards Status */}
                  <div className="flex items-center justify-between p-3.5 bg-stone-50 rounded-xl border border-stone-200 text-xs">
                    <div>
                      <span className="text-stone-600">Available Free Meals:</span>
                      <div className="text-base font-bold text-stone-900 tabular-nums">
                        {memberResult.freeMealsEarned - memberResult.freeMealsRedeemed} Voucher(s)
                      </div>
                    </div>

                    {memberResult.freeMealsEarned - memberResult.freeMealsRedeemed > 0 ? (
                      <button
                        onClick={handleRedeem}
                        className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-lg shadow-xs transition-colors cursor-pointer"
                      >
                        Redeem Free Meal at Counter
                      </button>
                    ) : (
                      <span className="text-xs text-stone-400 italic">
                        Keep dining to earn rewards
                      </span>
                    )}
                  </div>

                  {redeemStatus && (
                    <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-800 text-xs font-medium">
                      {redeemStatus}
                    </div>
                  )}

                  {/* Ledger History */}
                  {memberResult.history && memberResult.history.length > 0 && (
                    <div className="text-xs space-y-1.5 pt-2">
                      <span className="font-semibold text-stone-700 block">Recent Activity Log:</span>
                      {memberResult.history.slice(0, 3).map((h: any, i: number) => (
                        <div key={i} className="flex justify-between text-stone-500 text-[11px]">
                          <span>{h.action}</span>
                          <span className="text-stone-400 font-mono">{h.date}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-6 space-y-2 text-stone-600 text-xs">
                  <AlertCircle className="w-8 h-8 text-stone-400 mx-auto" />
                  <p className="font-medium text-sm text-stone-800">No Member Record Found</p>
                  <p className="max-w-xs mx-auto">
                    Place a pickup pre-order or join our Food &amp; Stay Club to start earning reward punches!
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
