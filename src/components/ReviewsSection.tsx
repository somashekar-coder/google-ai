import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Star, MessageSquare, CheckCircle, Info } from 'lucide-react';

export const ReviewsSection: React.FC = () => {
  const { reviews, submitReview, language } = useApp();

  const [customerName, setCustomerName] = useState('');
  const [reviewType, setReviewType] = useState<'Restaurant' | 'Hotel' | 'Both'>('Restaurant');
  const [foodRating, setFoodRating] = useState(5);
  const [serviceRating, setServiceRating] = useState(5);
  const [hotelRating, setHotelRating] = useState(4);
  const [cleanlinessRating, setCleanlinessRating] = useState(5);
  const [comment, setComment] = useState('');
  const [submittedMessage, setSubmittedMessage] = useState(false);

  // Filter approved reviews for display
  const approvedReviews = reviews.filter(r => r.isApproved);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !comment.trim()) return;

    const overallRating = Math.round(
      reviewType === 'Hotel'
        ? (hotelRating + serviceRating + cleanlinessRating) / 3
        : (foodRating + serviceRating + cleanlinessRating) / 3
    );

    submitReview({
      customerName: customerName.trim(),
      rating: overallRating,
      reviewType,
      foodRating,
      serviceRating,
      hotelRating: reviewType !== 'Restaurant' ? hotelRating : undefined,
      cleanlinessRating,
      comment: comment.trim(),
      verifiedGuest: false
    });

    setSubmittedMessage(true);
    setCustomerName('');
    setComment('');
    setTimeout(() => setSubmittedMessage(false), 5000);
  };

  return (
    <section id="reviews" className="py-16 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Section Header */}
        <div className="max-w-3xl space-y-3">
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-700 uppercase tracking-wider">
            <Star className="w-4 h-4 text-amber-600 fill-amber-500" />
            <span>GUEST REVIEWS &amp; RATINGS</span>
          </div>

          <h2 className="font-serif text-3xl font-bold text-stone-900">
            {language === 'en' ? 'Customer Reviews & Feedback' : 'కస్టమర్ రివ్యూలు & ఫీడ్‌బ్యాక్'}
          </h2>

          {/* Supplied Rating Banner with Explicit Verification Notice */}
          <div className="p-4 bg-amber-50 rounded-xl border border-amber-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="text-3xl sm:text-4xl font-extrabold text-stone-900 font-serif tabular-nums">
                4.3
              </div>
              <div>
                <div className="flex items-center gap-1 text-amber-500">
                  {[1, 2, 3, 4].map(i => (
                    <Star key={i} className="w-4 h-4 fill-amber-500" />
                  ))}
                  <Star className="w-4 h-4 fill-amber-300 text-amber-400" />
                </div>
                <p className="text-xs font-semibold text-stone-800 mt-0.5">
                  Supplied Customer Rating
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1.5 text-xs text-amber-900 bg-white/80 px-3 py-1.5 rounded-lg border border-amber-200/80">
              <Info className="w-4 h-4 text-amber-600 shrink-0" />
              <span>Pending formal independent platform audit · Based on verified dining feedback</span>
            </div>
          </div>
        </div>

        {/* Rating Category Breakdown */}
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
          <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200">
            <span className="text-stone-500">Food Quality</span>
            <div className="text-lg font-bold text-stone-900 mt-1 tabular-nums">4.4 / 5</div>
            <div className="w-full bg-stone-200 h-1.5 rounded-full mt-2 overflow-hidden">
              <div className="bg-amber-600 h-full w-[88%]" />
            </div>
          </div>

          <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200">
            <span className="text-stone-500">Hospitality &amp; Service</span>
            <div className="text-lg font-bold text-stone-900 mt-1 tabular-nums">4.2 / 5</div>
            <div className="w-full bg-stone-200 h-1.5 rounded-full mt-2 overflow-hidden">
              <div className="bg-amber-600 h-full w-[84%]" />
            </div>
          </div>

          <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200">
            <span className="text-stone-500">Cleanliness &amp; Hygiene</span>
            <div className="text-lg font-bold text-stone-900 mt-1 tabular-nums">4.3 / 5</div>
            <div className="w-full bg-stone-200 h-1.5 rounded-full mt-2 overflow-hidden">
              <div className="bg-amber-600 h-full w-[86%]" />
            </div>
          </div>

          <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200">
            <span className="text-stone-500">Railway Proximity</span>
            <div className="text-lg font-bold text-stone-900 mt-1 tabular-nums">4.8 / 5</div>
            <div className="w-full bg-stone-200 h-1.5 rounded-full mt-2 overflow-hidden">
              <div className="bg-emerald-600 h-full w-[96%]" />
            </div>
          </div>
        </div>

        {/* Reviews Grid & Submission Form Split */}
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Approved Reviews List Left */}
          <div className="lg:col-span-7 space-y-4">
            <h3 className="font-serif text-xl font-bold text-stone-900">
              Verified Guest Experiences ({approvedReviews.length})
            </h3>

            <div className="space-y-4">
              {approvedReviews.map((rev) => (
                <div
                  key={rev.id}
                  className="p-5 bg-stone-50 rounded-xl border border-stone-200 space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-stone-900 text-sm">
                        {rev.customerName}
                      </h4>
                      <span className="text-[11px] text-stone-500">
                        {rev.date} · {rev.reviewType} Guest
                      </span>
                    </div>

                    <div className="flex items-center gap-1 text-amber-500">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3.5 h-3.5 ${
                            i < rev.rating ? 'fill-amber-500' : 'text-stone-300'
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  <p className="text-xs text-stone-700 leading-relaxed">
                    &quot;{rev.comment}&quot;
                  </p>

                  <div className="flex items-center gap-3 pt-2 border-t border-stone-200/80 text-[11px] text-stone-500">
                    <span>Food: {rev.foodRating}/5</span>
                    <span>·</span>
                    <span>Service: {rev.serviceRating}/5</span>
                    <span>·</span>
                    <span>Cleanliness: {rev.cleanlinessRating}/5</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Feedback Submission Form Right */}
          <div className="lg:col-span-5 bg-white rounded-2xl border border-stone-200 p-6 shadow-xs space-y-4">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-amber-600" />
              <h3 className="font-serif text-lg font-bold text-stone-900">
                Share Your Experience
              </h3>
            </div>
            <p className="text-xs text-stone-500">
              Dined at our restaurant or stayed in our rooms? Your feedback helps us maintain the highest standard.
            </p>

            {submittedMessage ? (
              <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-800 space-y-2 text-center">
                <CheckCircle className="w-7 h-7 text-emerald-600 mx-auto" />
                <p className="font-bold text-sm">Thank You For Your Review!</p>
                <p>
                  Your feedback has been submitted to authorized hotel administrators for review and publication.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
                <div>
                  <label className="block font-medium text-stone-700 mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Suresh Kumar"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg focus:bg-white focus:outline-none focus:ring-1 focus:ring-amber-500"
                  />
                </div>

                <div>
                  <label className="block font-medium text-stone-700 mb-1">
                    Experience Type
                  </label>
                  <select
                    value={reviewType}
                    onChange={(e) => setReviewType(e.target.value as any)}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg focus:bg-white focus:outline-none focus:ring-1 focus:ring-amber-500"
                  >
                    <option value="Restaurant">Restaurant Dining / Takeaway</option>
                    <option value="Hotel">Hotel Room Stay</option>
                    <option value="Both">Both Hotel &amp; Restaurant</option>
                  </select>
                </div>

                {/* Star Ratings Grid */}
                <div className="grid grid-cols-2 gap-3 pt-1">
                  <div>
                    <label className="block font-medium text-stone-700 mb-1">
                      Food Quality (1-5)
                    </label>
                    <select
                      value={foodRating}
                      onChange={(e) => setFoodRating(Number(e.target.value))}
                      className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg"
                    >
                      <option value={5}>5 - Excellent</option>
                      <option value={4}>4 - Good</option>
                      <option value={3}>3 - Average</option>
                      <option value={2}>2 - Poor</option>
                      <option value={1}>1 - Bad</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-medium text-stone-700 mb-1">
                      Service (1-5)
                    </label>
                    <select
                      value={serviceRating}
                      onChange={(e) => setServiceRating(Number(e.target.value))}
                      className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg"
                    >
                      <option value={5}>5 - Fast &amp; Courteous</option>
                      <option value={4}>4 - Good</option>
                      <option value={3}>3 - Acceptable</option>
                      <option value={2}>2 - Slow</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-medium text-stone-700 mb-1">
                      Cleanliness (1-5)
                    </label>
                    <select
                      value={cleanlinessRating}
                      onChange={(e) => setCleanlinessRating(Number(e.target.value))}
                      className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg"
                    >
                      <option value={5}>5 - Spotless</option>
                      <option value={4}>4 - Very Clean</option>
                      <option value={3}>3 - Normal</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-medium text-stone-700 mb-1">
                      Hotel Room Stay (1-5)
                    </label>
                    <select
                      value={hotelRating}
                      onChange={(e) => setHotelRating(Number(e.target.value))}
                      className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg"
                    >
                      <option value={5}>5 - Highly Comfortable</option>
                      <option value={4}>4 - Good Stay</option>
                      <option value={3}>3 - Fair</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-medium text-stone-700 mb-1">
                    Your Honest Feedback *
                  </label>
                  <textarea
                    rows={3}
                    required
                    placeholder="Tell us what dish you tried or how your stay went..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg focus:bg-white focus:outline-none focus:ring-1 focus:ring-amber-500 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded-lg shadow-2xs transition-colors cursor-pointer"
                >
                  Submit Review for Moderation
                </button>

                <p className="text-[10px] text-stone-400 text-center">
                  All reviews are moderated by management before appearing publicly.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
