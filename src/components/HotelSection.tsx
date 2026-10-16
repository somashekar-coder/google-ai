import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Bed, Users, Wifi, Wind, Coffee, Clock, ShieldCheck, MessageCircle, Phone, CheckCircle, Info } from 'lucide-react';

export const HotelSection: React.FC = () => {
  const {
    hotelRooms,
    createHotelReservation,
    generateWhatsAppReservationUrl,
    settings,
    language
  } = useApp();

  const [selectedRoomId, setSelectedRoomId] = useState<string>(hotelRooms[0]?.id || 'room-exec-ac');
  const [guestName, setGuestName] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [checkInDate, setCheckInDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  });
  const [checkOutDate, setCheckOutDate] = useState(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  });
  const [numGuests, setNumGuests] = useState(2);
  const [numRooms, setNumRooms] = useState(1);
  const [specialRequests, setSpecialRequests] = useState('');
  const [reservationSuccess, setReservationSuccess] = useState<any>(null);
  const [formError, setFormError] = useState('');

  // Calculate nights
  const checkIn = new Date(checkInDate);
  const checkOut = new Date(checkOutDate);
  const diffTime = checkOut.getTime() - checkIn.getTime();
  const calculatedNights = Math.max(1, Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 1);

  const selectedRoom = hotelRooms.find(r => r.id === selectedRoomId) || hotelRooms[0];
  const estimatedCost = selectedRoom ? selectedRoom.pricePerNight * calculatedNights * numRooms : 0;

  const handleSubmitReservation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName.trim()) {
      setFormError('Please enter your full name.');
      return;
    }
    const cleanPhone = guestPhone.replace(/\D/g, '').slice(-10);
    if (cleanPhone.length !== 10) {
      setFormError('Please enter a valid 10-digit Indian mobile number.');
      return;
    }

    setFormError('');
    const res = createHotelReservation({
      guestName: guestName.trim(),
      guestPhone: cleanPhone,
      guestEmail: guestEmail.trim() || undefined,
      roomTypeId: selectedRoomId,
      checkInDate,
      checkOutDate,
      numGuests,
      numRooms,
      specialRequests: specialRequests.trim() || undefined
    });

    setReservationSuccess(res);
  };

  return (
    <section id="hotel-rooms" className="py-16 bg-stone-50 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Section Header */}
        <div className="max-w-3xl space-y-3">
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-700 uppercase tracking-wider">
            <Bed className="w-4 h-4 text-amber-600" />
            <span>SHREYAS GRAND HOTEL ACCOMMODATION</span>
            <span aria-hidden="true">·</span>
            <span>Opposite Railway Station</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900">
            {language === 'en'
              ? 'Comfortable Stays Opposite Anantapur Railway Station'
              : 'అనంతపురం రైల్వే స్టేషన్ ఎదురుగా సౌకర్యవంతమైన బస'}
          </h2>

          <p className="text-stone-600 text-sm leading-relaxed">
            Whether arriving on late night trains, waiting for morning transit connections, or visiting Anantapur for family events, enjoy sanitized rooms, fast check-ins, high-speed Wi-Fi, and hot room service dining from our restaurant.
          </p>

          {/* Admin Configuration Notice Requirement */}
          <div className="p-3.5 bg-amber-50/90 border border-amber-200 rounded-xl text-xs text-amber-900 flex items-start gap-2.5">
            <Info className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold">Administrator Notice:</span> Room rates and amenities are pre-configured for customer preview and are fully editable by hotel managers via the <span className="font-semibold underline cursor-pointer" onClick={() => window.location.hash = '#admin'}>Admin Console</span>. Stays are confirmed by hotel front desk staff.
            </div>
          </div>
        </div>

        {/* Room Types Showcase Cards */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {hotelRooms.map((room) => {
            const isSelected = selectedRoomId === room.id;
            return (
              <div
                key={room.id}
                className={`bg-white rounded-2xl border overflow-hidden shadow-xs flex flex-col justify-between transition-all duration-200 ${
                  isSelected ? 'border-amber-500 ring-2 ring-amber-500/20 shadow-md' : 'border-stone-200 hover:border-stone-300'
                }`}
              >
                <div>
                  {/* Room Image */}
                  <div className="relative h-44 bg-stone-100 overflow-hidden">
                    <img
                      src={room.image || '/src/assets/images/hotel_room_executive_1792134326951.jpg'}
                      alt={room.name}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-3 right-3 bg-stone-900/80 text-white text-[11px] font-semibold px-2.5 py-1 rounded-md backdrop-blur-xs">
                      {room.bedType}
                    </div>
                  </div>

                  {/* Room Details */}
                  <div className="p-5 space-y-3">
                    <div>
                      <h3 className="font-serif text-lg font-bold text-stone-900">
                        {room.name}
                      </h3>
                      <p className="text-xs text-amber-700 font-medium">
                        {room.tagline}
                      </p>
                    </div>

                    <p className="text-xs text-stone-500 line-clamp-2 leading-relaxed">
                      {room.description}
                    </p>

                    <div className="pt-2 border-t border-stone-100 flex items-center gap-2 text-xs text-stone-600">
                      <Users className="w-3.5 h-3.5 text-stone-400" />
                      <span>{room.occupancy}</span>
                    </div>

                    {/* Amenities list */}
                    <div className="space-y-1.5 pt-1 text-xs text-stone-600">
                      {room.amenities.slice(0, 4).map((amenity, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-[11px]">
                          <CheckCircle className="w-3 h-3 text-emerald-600 shrink-0" />
                          <span>{amenity}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Price & Selection */}
                <div className="p-5 pt-0">
                  <div className="pt-3 border-t border-stone-100 flex items-baseline justify-between mb-3">
                    <div>
                      <span className="text-xs text-stone-400">Starting from</span>
                      <div className="text-xl font-bold text-stone-900 tabular-nums">
                        ₹{room.pricePerNight}
                        <span className="text-xs font-normal text-stone-500"> / night</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setSelectedRoomId(room.id);
                      const el = document.getElementById('reservation-form');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className={`w-full py-2.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                      isSelected
                        ? 'bg-amber-600 text-white'
                        : 'bg-stone-100 hover:bg-stone-200 text-stone-800'
                    }`}
                  >
                    {isSelected ? 'Selected for Enquiry' : 'Select Room'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Desktop Room Comparison Matrix (shown on lg/xl screens) */}
        <div className="hidden lg:block mt-12 bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs">
          <div className="p-4 bg-stone-50 border-b border-stone-200 flex items-center justify-between">
            <h4 className="font-serif font-bold text-stone-900 text-sm">
              Room Category Comparison &amp; Amenities Matrix
            </h4>
            <span className="text-xs text-stone-500">
              Opposite Anantapur Railway Station · 24/7 Front Desk
            </span>
          </div>
          <table className="w-full text-left text-xs">
            <thead className="bg-stone-50/50 border-b border-stone-200 text-stone-500 uppercase tracking-wider text-[11px]">
              <tr>
                <th className="p-4">Feature / Specification</th>
                {hotelRooms.map(r => (
                  <th key={r.id} className="p-4 font-bold text-stone-900">
                    {r.name}
                    <span className="block text-amber-700 text-xs font-semibold normal-case mt-0.5">
                      ₹{r.pricePerNight} / night
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 text-stone-700">
              <tr>
                <td className="p-4 font-medium text-stone-900">Air Conditioning</td>
                <td className="p-4 text-emerald-700 font-semibold">Split AC</td>
                <td className="p-4 text-emerald-700 font-semibold">Split AC</td>
                <td className="p-4 text-stone-500">Ceiling Fan &amp; Cross Ventilation</td>
                <td className="p-4 text-emerald-700 font-semibold">Dual Split AC</td>
              </tr>
              <tr>
                <td className="p-4 font-medium text-stone-900">Bed Configuration</td>
                <td className="p-4">1 Queen Size Bed</td>
                <td className="p-4">1 King or 2 Twin Beds</td>
                <td className="p-4">1 Double Bed</td>
                <td className="p-4">2 Double Beds</td>
              </tr>
              <tr>
                <td className="p-4 font-medium text-stone-900">Ideal Occupancy</td>
                <td className="p-4">2 Adults · 1 Child</td>
                <td className="p-4">2 Adults · 2 Children</td>
                <td className="p-4">2 Adults</td>
                <td className="p-4 font-semibold text-amber-900">4 Adults · 2 Children</td>
              </tr>
              <tr>
                <td className="p-4 font-medium text-stone-900">High-Speed Wi-Fi</td>
                <td className="p-4 text-emerald-700">Included (Free)</td>
                <td className="p-4 text-emerald-700">Included (Free)</td>
                <td className="p-4 text-stone-600">Lobby &amp; Corridor</td>
                <td className="p-4 text-emerald-700">High-Speed Priority</td>
              </tr>
              <tr>
                <td className="p-4 font-medium text-stone-900">In-Room Dining Service</td>
                <td className="p-4 text-emerald-700">Full Menu Access</td>
                <td className="p-4 text-emerald-700">Priority Express</td>
                <td className="p-4 text-stone-600">Standard Room Service</td>
                <td className="p-4 text-emerald-700">Full Family Dining</td>
              </tr>
              <tr>
                <td className="p-4 font-medium text-stone-900">Select for Booking</td>
                {hotelRooms.map(r => (
                  <td key={r.id} className="p-4">
                    <button
                      onClick={() => {
                        setSelectedRoomId(r.id);
                        const el = document.getElementById('reservation-form');
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className={`px-3 py-1.5 rounded-lg font-semibold text-xs transition-colors cursor-pointer ${
                        selectedRoomId === r.id
                          ? 'bg-amber-600 text-white shadow-xs'
                          : 'bg-stone-100 hover:bg-stone-200 text-stone-800'
                      }`}
                    >
                      {selectedRoomId === r.id ? 'Selected' : 'Select'}
                    </button>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>

        {/* Room Reservation & Availability Request Section */}
        <div id="reservation-form" className="mt-14 bg-white rounded-2xl border border-stone-200 p-6 sm:p-10 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Form Left */}
            <div className="lg:col-span-7 space-y-5">
              <div>
                <span className="text-xs font-semibold text-amber-700 uppercase tracking-wider">
                  Hotel Reservation Request
                </span>
                <h3 className="font-serif text-2xl font-bold text-stone-900 mt-1">
                  Book or Enquire Room Stay
                </h3>
                <p className="text-xs text-stone-500 mt-1">
                  Submit your dates and requirements. Our front desk staff opposite Anantapur Railway Station will verify availability and confirm your booking.
                </p>
              </div>

              {reservationSuccess ? (
                /* Success Screen */
                <div className="p-6 bg-emerald-50 rounded-xl border border-emerald-200 space-y-4">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-8 h-8 text-emerald-600" />
                    <div>
                      <h4 className="font-serif text-lg font-bold text-emerald-950">
                        Enquiry Received · Ref #{reservationSuccess.reservationId}
                      </h4>
                      <p className="text-xs text-emerald-800">
                        Thank you, {reservationSuccess.guestName}! We have recorded your request.
                      </p>
                    </div>
                  </div>

                  {/* Explicit Mandatory Disclaimer */}
                  <div className="p-3 bg-white rounded-lg border border-amber-300 text-xs text-amber-900">
                    <p className="font-bold">Reservation Notice:</p>
                    <p className="text-stone-700 mt-0.5">
                      This enquiry is a preliminary reservation request and not a confirmed booking until verified by authorized Shreyas Grand front desk staff. Please verify with our desk or send via WhatsApp.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs bg-white p-4 rounded-lg border border-stone-200">
                    <div>
                      <span className="text-stone-500">Room:</span>
                      <p className="font-semibold text-stone-900">{reservationSuccess.roomTypeName}</p>
                    </div>
                    <div>
                      <span className="text-stone-500">Stay Duration:</span>
                      <p className="font-semibold text-stone-900">{reservationSuccess.totalNights} Night(s)</p>
                    </div>
                    <div>
                      <span className="text-stone-500">Check-In:</span>
                      <p className="font-semibold text-stone-900">{reservationSuccess.checkInDate}</p>
                    </div>
                    <div>
                      <span className="text-stone-500">Estimated Cost:</span>
                      <p className="font-semibold text-stone-900 tabular-nums">₹{reservationSuccess.estimatedTotal}</p>
                    </div>
                  </div>

                  {/* WhatsApp Enquiry Button */}
                  <a
                    href={generateWhatsAppReservationUrl(reservationSuccess)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 py-3 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-lg shadow-sm transition-colors"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Send Booking Enquiry via WhatsApp (+91 95535 55847)</span>
                  </a>

                  <button
                    onClick={() => setReservationSuccess(null)}
                    className="w-full py-2 text-xs font-medium text-stone-600 hover:text-stone-900"
                  >
                    Submit Another Room Enquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmitReservation} className="space-y-4 text-xs">
                  {formError && (
                    <div className="p-2.5 bg-red-50 border border-red-200 text-red-700 rounded-lg">
                      {formError}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-medium text-stone-700 mb-1">
                        Primary Guest Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Ramesh Kumar"
                        value={guestName}
                        onChange={(e) => setGuestName(e.target.value)}
                        className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg focus:bg-white focus:outline-none focus:ring-1 focus:ring-amber-500"
                      />
                    </div>

                    <div>
                      <label className="block font-medium text-stone-700 mb-1">
                        10-Digit Mobile Number *
                      </label>
                      <div className="flex">
                        <span className="inline-flex items-center px-2.5 bg-stone-100 border border-r-0 border-stone-200 rounded-l-lg text-stone-500 font-mono">
                          +91
                        </span>
                        <input
                          type="tel"
                          required
                          maxLength={10}
                          placeholder="9849012345"
                          value={guestPhone}
                          onChange={(e) => setGuestPhone(e.target.value)}
                          className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-r-lg focus:bg-white focus:outline-none focus:ring-1 focus:ring-amber-500 font-mono"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block font-medium text-stone-700 mb-1">
                        Room Type
                      </label>
                      <select
                        value={selectedRoomId}
                        onChange={(e) => setSelectedRoomId(e.target.value)}
                        className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg focus:bg-white focus:outline-none focus:ring-1 focus:ring-amber-500"
                      >
                        {hotelRooms.map(r => (
                          <option key={r.id} value={r.id}>
                            {r.name} (₹{r.pricePerNight}/night)
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block font-medium text-stone-700 mb-1">
                        Check-in Date
                      </label>
                      <input
                        type="date"
                        required
                        value={checkInDate}
                        onChange={(e) => setCheckInDate(e.target.value)}
                        className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg focus:bg-white focus:outline-none focus:ring-1 focus:ring-amber-500"
                      />
                    </div>

                    <div>
                      <label className="block font-medium text-stone-700 mb-1">
                        Check-out Date
                      </label>
                      <input
                        type="date"
                        required
                        value={checkOutDate}
                        onChange={(e) => setCheckOutDate(e.target.value)}
                        className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg focus:bg-white focus:outline-none focus:ring-1 focus:ring-amber-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-medium text-stone-700 mb-1">
                        Number of Guests
                      </label>
                      <select
                        value={numGuests}
                        onChange={(e) => setNumGuests(Number(e.target.value))}
                        className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg focus:bg-white focus:outline-none focus:ring-1 focus:ring-amber-500"
                      >
                        <option value={1}>1 Guest</option>
                        <option value={2}>2 Guests</option>
                        <option value={3}>3 Guests</option>
                        <option value={4}>4 Guests</option>
                        <option value={5}>5+ Guests (Family)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block font-medium text-stone-700 mb-1">
                        Number of Rooms
                      </label>
                      <select
                        value={numRooms}
                        onChange={(e) => setNumRooms(Number(e.target.value))}
                        className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg focus:bg-white focus:outline-none focus:ring-1 focus:ring-amber-500"
                      >
                        <option value={1}>1 Room</option>
                        <option value={2}>2 Rooms</option>
                        <option value={3}>3 Rooms</option>
                        <option value={4}>4+ Rooms</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block font-medium text-stone-700 mb-1">
                      Additional Requirements / Train Arrival Details
                    </label>
                    <textarea
                      rows={2}
                      placeholder="e.g. Arriving on Venkatadri Express around 5:30 AM, need ground floor room..."
                      value={specialRequests}
                      onChange={(e) => setSpecialRequests(e.target.value)}
                      className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg focus:bg-white focus:outline-none focus:ring-1 focus:ring-amber-500 resize-none"
                    />
                  </div>

                  <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                    <button
                      type="submit"
                      className="w-full sm:w-auto px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded-lg shadow-xs transition-colors cursor-pointer"
                    >
                      Submit Room Enquiry (Est. ₹{estimatedCost})
                    </button>

                    <a
                      href={`https://wa.me/${settings.primaryWhatsApp}?text=Hello%20Shreyas%20Grand,%20I%20would%20like%20to%20enquire%20about%20hotel%20room%20availability%20opposite%20Anantapur%20Railway%20Station.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg transition-colors"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>WhatsApp Desk Now</span>
                    </a>
                  </div>

                  <p className="text-[11px] text-stone-500 pt-1">
                    * Clear Notice: Submitting an enquiry generates a reservation request. Final room allocation is confirmed by authorized hotel front desk staff upon phone or WhatsApp verification.
                  </p>
                </form>
              )}
            </div>

            {/* Price Preview & Policy Right */}
            <div className="lg:col-span-5 bg-stone-50 rounded-xl p-6 border border-stone-200 space-y-4">
              <h4 className="font-serif text-lg font-bold text-stone-900">
                Reservation Summary
              </h4>

              <div className="space-y-2.5 text-xs text-stone-600 divide-y divide-stone-200">
                <div className="flex justify-between pt-2 first:pt-0">
                  <span>Selected Room Type:</span>
                  <span className="font-semibold text-stone-900">{selectedRoom.name}</span>
                </div>
                <div className="flex justify-between pt-2">
                  <span>Tariff per Night:</span>
                  <span className="font-semibold text-stone-900 tabular-nums">₹{selectedRoom.pricePerNight}</span>
                </div>
                <div className="flex justify-between pt-2">
                  <span>Duration:</span>
                  <span className="font-semibold text-stone-900">{calculatedNights} Night(s)</span>
                </div>
                <div className="flex justify-between pt-2">
                  <span>Rooms Count:</span>
                  <span className="font-semibold text-stone-900">{numRooms} Room(s)</span>
                </div>
                <div className="flex justify-between pt-2 text-sm font-bold text-stone-900">
                  <span>Estimated Total:</span>
                  <span className="text-amber-800 text-base tabular-nums">₹{estimatedCost}</span>
                </div>
              </div>

              {/* Policy & Features */}
              <div className="pt-3 border-t border-stone-200 space-y-2 text-[11px] text-stone-600">
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                  <span>Check-in: 12:00 PM · Check-out: 11:00 AM (24-hr transit assist)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Coffee className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                  <span>Direct room service ordering from Taste of Pulao&apos;s restaurant</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Government ID required at check-in (Aadhaar / Voter ID / Passport)</span>
                </div>
              </div>

              <div className="p-3 bg-white rounded-lg border border-stone-200 text-xs">
                <p className="font-semibold text-stone-800">Direct Hotel Front Desk Contacts:</p>
                <div className="mt-1 space-y-0.5 text-stone-600">
                  <p>Primary WhatsApp: <a href={`https://wa.me/${settings.primaryWhatsApp}`} className="font-semibold text-emerald-700 hover:underline">{settings.primaryPhone}</a></p>
                  <p>Secondary Phone: <a href={`tel:${settings.secondaryPhone.replace(/\s+/g, '')}`} className="font-semibold text-amber-700 hover:underline">{settings.secondaryPhone}</a></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
