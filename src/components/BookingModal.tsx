import React, { useState } from 'react';
import { ServiceItem } from '../types';
import { INDIAN_CAR_BRANDS, GARAGE_BRANCHES } from '../data/cars';
import { ALL_SERVICES } from '../data/services';
import { X, Calendar, Clock, Car, MapPin, Phone, User, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedServices: ServiceItem[];
  customServiceTitle?: string;
  customEstimatedPriceINR?: number;
  initialCity?: string;
  onBookingSuccess: (bookingId: string) => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  selectedServices,
  customServiceTitle,
  customEstimatedPriceINR,
  initialCity = 'Mumbai',
  onBookingSuccess
}) => {
  if (!isOpen) return null;

  const [step, setStep] = useState<1 | 2>(1);

  // Form State
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState(initialCity);
  const [selectedBrand, setSelectedBrand] = useState(INDIAN_CAR_BRANDS[0].name);
  const [selectedModel, setSelectedModel] = useState(INDIAN_CAR_BRANDS[0].models[0].name);
  const [fuelType, setFuelType] = useState('Petrol');
  const [vehicleNumber, setVehicleNumber] = useState('');
  const [bookingDate, setBookingDate] = useState('2026-07-26');
  const [timeSlot, setTimeSlot] = useState('10:00 AM - 12:00 PM');
  const [pickupRequired, setPickupRequired] = useState(true);
  const [customNote, setCustomNote] = useState('');

  const [loading, setLoading] = useState(false);
  const [confirmedBookingId, setConfirmedBookingId] = useState('');

  // Calculate Price
  const baseServicePrice = selectedServices.reduce((sum, s) => sum + s.priceINR, 0);
  const finalEstimateINR = (customEstimatedPriceINR || baseServicePrice) + (pickupRequired ? 299 : 0);

  const timeSlots = [
    '08:00 AM - 10:00 AM',
    '10:00 AM - 12:00 PM',
    '01:00 PM - 03:00 PM',
    '03:00 PM - 05:00 PM',
    '05:00 PM - 07:00 PM'
  ];

  const handleSubmitBooking = async () => {
    if (!customerName.trim() || !phone.trim() || !vehicleNumber.trim()) {
      alert('Please fill in your Name, Phone Number, and Vehicle Registration Number.');
      return;
    }

    setLoading(true);

    const serviceList = customServiceTitle
      ? [customServiceTitle]
      : selectedServices.length > 0
      ? selectedServices.map(s => s.name)
      : ['General Diagnostic & Pitstop Wash'];

    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName,
          phone,
          city: `${city} Pit Center`,
          carBrand: selectedBrand,
          carModel: selectedModel,
          fuelType,
          vehicleNumber,
          services: serviceList,
          customNote,
          bookingDate,
          timeSlot,
          pickupRequired,
          totalEstimateINR: finalEstimateINR
        })
      });

      const data = await response.json();
      if (data.success && data.booking) {
        setConfirmedBookingId(data.booking.id);
        onBookingSuccess(data.booking.id);
      }
    } catch (err) {
      console.error('Booking submission error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="bg-slate-900 border border-amber-500/30 rounded-2xl max-w-2xl w-full p-6 sm:p-8 text-white shadow-2xl relative my-8">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-2 rounded-xl bg-slate-800 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {!confirmedBookingId ? (
          <div>
            {/* Header */}
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[10px] px-2.5 py-0.5 rounded font-bold uppercase tracking-wider">
                PitStop Reservation
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              Book Your Car Pitstop Slot
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Select time slot, garage branch & doorstep pickup preference across India.
            </p>

            {/* Step 1: Car & Service Info */}
            <div className="mt-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">Select City Pit</label>
                  <select
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 focus:border-amber-500 rounded-xl px-3 py-2.5 text-xs text-white outline-none"
                  >
                    {GARAGE_BRANCHES.map(b => (
                      <option key={b.id} value={b.city}>{b.name} ({b.city})</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">Car Brand & Model</label>
                  <div className="grid grid-cols-2 gap-2">
                    <select
                      value={selectedBrand}
                      onChange={(e) => {
                        setSelectedBrand(e.target.value);
                        const b = INDIAN_CAR_BRANDS.find(brand => brand.name === e.target.value);
                        if (b) setSelectedModel(b.models[0].name);
                      }}
                      className="w-full bg-slate-950 border border-slate-800 focus:border-amber-500 rounded-xl px-2 py-2.5 text-xs text-white outline-none"
                    >
                      {INDIAN_CAR_BRANDS.map(b => (
                        <option key={b.id} value={b.name}>{b.name}</option>
                      ))}
                    </select>

                    <select
                      value={selectedModel}
                      onChange={(e) => setSelectedModel(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 focus:border-amber-500 rounded-xl px-2 py-2.5 text-xs text-white outline-none"
                    >
                      {INDIAN_CAR_BRANDS.find(b => b.name === selectedBrand)?.models.map(m => (
                        <option key={m.id} value={m.name}>{m.name}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">Vehicle Reg Number (MH/KA/DL/HR)</label>
                  <input
                    type="text"
                    value={vehicleNumber}
                    onChange={(e) => setVehicleNumber(e.target.value.toUpperCase())}
                    placeholder="e.g. MH 02 ER 4589"
                    className="w-full bg-slate-950 border border-slate-800 focus:border-amber-500 rounded-xl px-3 py-2.5 text-xs text-white uppercase outline-none font-mono font-bold"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">Fuel Type</label>
                  <select
                    value={fuelType}
                    onChange={(e) => setFuelType(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 focus:border-amber-500 rounded-xl px-3 py-2.5 text-xs text-white outline-none"
                  >
                    <option value="Petrol">Petrol</option>
                    <option value="Diesel">Diesel</option>
                    <option value="CNG">CNG</option>
                    <option value="EV">Electric (EV)</option>
                  </select>
                </div>
              </div>

              {/* Date & Time Slot */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">Preferred Date</label>
                  <input
                    type="date"
                    value={bookingDate}
                    onChange={(e) => setBookingDate(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 focus:border-amber-500 rounded-xl px-3 py-2.5 text-xs text-white outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">Time Slot</label>
                  <select
                    value={timeSlot}
                    onChange={(e) => setTimeSlot(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 focus:border-amber-500 rounded-xl px-3 py-2.5 text-xs text-white outline-none"
                  >
                    {timeSlots.map(ts => (
                      <option key={ts} value={ts}>{ts}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Customer Contact */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">Customer Name</label>
                  <input
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="e.g. Rajesh Kumar"
                    className="w-full bg-slate-950 border border-slate-800 focus:border-amber-500 rounded-xl px-3 py-2.5 text-xs text-white outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">WhatsApp / Phone Number</label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. +91 98765 43210"
                    className="w-full bg-slate-950 border border-slate-800 focus:border-amber-500 rounded-xl px-3 py-2.5 text-xs text-white outline-none"
                  />
                </div>
              </div>

              {/* Doorstep Pickup Checkbox */}
              <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-amber-300">Doorstep Car Pickup & Drop (+₹299)</div>
                  <div className="text-[10px] text-slate-400">Driver picks up your car, takes it to Pitstop, and delivers back.</div>
                </div>
                <input
                  type="checkbox"
                  checked={pickupRequired}
                  onChange={(e) => setPickupRequired(e.target.checked)}
                  className="w-4 h-4 accent-amber-500 cursor-pointer"
                />
              </div>

              {/* Price Breakdown */}
              <div className="bg-slate-950 border border-amber-500/30 p-4 rounded-xl flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-400 block">Total Estimated Amount:</span>
                  <span className="text-2xl font-black text-amber-400">
                    ₹{finalEstimateINR.toLocaleString('en-IN')}
                  </span>
                  <span className="text-[10px] text-slate-400 block">Pay at garage after inspection</span>
                </div>
                <button
                  onClick={handleSubmitBooking}
                  disabled={loading}
                  className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs px-6 py-3 rounded-xl shadow-lg shadow-amber-500/20 transition-all cursor-pointer"
                >
                  {loading ? 'Confirming...' : 'Confirm Pitstop Slot →'}
                </button>
              </div>

            </div>
          </div>
        ) : (
          /* Confirmation State */
          <div className="text-center py-6">
            <div className="w-16 h-16 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <span className="bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs px-3 py-1 rounded-full font-bold uppercase tracking-widest">
              Booking Confirmed
            </span>
            <h3 className="text-2xl font-black text-white mt-2">
              Job Card Generated: <span className="text-amber-400 font-mono">{confirmedBookingId}</span>
            </h3>
            <p className="text-xs text-slate-300 mt-2 max-w-md mx-auto">
              Your pitstop reservation for <strong>{selectedBrand} {selectedModel}</strong> ({vehicleNumber}) has been confirmed for <strong>{bookingDate}</strong> during <strong>{timeSlot}</strong>.
            </p>

            <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={() => {
                  onClose();
                  setConfirmedBookingId('');
                }}
                className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs px-6 py-3 rounded-xl transition-all cursor-pointer"
              >
                Track Live Job Card Progress →
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
