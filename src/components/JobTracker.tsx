import React, { useState, useEffect } from 'react';
import { Search, Car, Wrench, CheckCircle2, Clock, MapPin, Phone, ShieldCheck, RefreshCw } from 'lucide-react';
import { Booking } from '../types';

export const JobTracker: React.FC = () => {
  const [jobIdInput, setJobIdInput] = useState('PIT-IND-1001');
  const [activeBooking, setActiveBooking] = useState<Booking | null>(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [recentBookings, setRecentBookings] = useState<Booking[]>([]);

  const fetchBooking = async (idToSearch: string) => {
    setLoading(true);
    setErrorMsg('');

    try {
      const response = await fetch(`/api/bookings/${idToSearch}`);
      if (!response.ok) {
        throw new Error('Job Card ID not found.');
      }
      const data = await response.json();
      setActiveBooking(data.booking);
    } catch (err: any) {
      setErrorMsg('No active Job Card found for this ID. Please check your Booking ID or create a new booking.');
      setActiveBooking(null);
    } finally {
      setLoading(false);
    }
  };

  const fetchRecentList = async () => {
    try {
      const response = await fetch('/api/bookings');
      const data = await response.json();
      if (data.bookings) {
        setRecentBookings(data.bookings);
      }
    } catch (err) {
      console.error('Fetch bookings list error:', err);
    }
  };

  useEffect(() => {
    fetchBooking('PIT-IND-1001');
    fetchRecentList();
  }, []);

  const statusSteps = [
    'Booked',
    'Vehicle Received',
    'In Inspection',
    'In Progress',
    'Quality Check',
    'Ready for Delivery',
    'Completed'
  ];

  const getStepIndex = (status: string) => {
    const idx = statusSteps.indexOf(status);
    return idx === -1 ? 3 : idx;
  };

  return (
    <section id="job-tracker" className="py-16 bg-slate-950 text-white border-b border-amber-500/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <span className="bg-amber-500/10 text-amber-400 border border-amber-500/30 text-xs px-3 py-1 rounded-full font-bold uppercase tracking-widest flex items-center justify-center gap-1.5 w-max mx-auto">
            <Search className="w-3.5 h-3.5 text-amber-400" />
            Live Garage Pit Tracker
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-white mt-3">
            Track Your Car's Live Job Card Status
          </h2>
          <p className="mt-2 text-sm text-slate-400">
            Enter your Job Card or Booking ID (e.g. <strong className="text-amber-300">PIT-IND-1001</strong>) to view real-time stage progress, mechanic notes & estimate.
          </p>
        </div>

        {/* Search Bar Container */}
        <div className="mt-8 max-w-2xl mx-auto bg-slate-900 border border-slate-800 p-3 rounded-2xl flex items-center gap-3 shadow-xl">
          <Search className="w-5 h-5 text-slate-400 ml-2" />
          <input
            type="text"
            value={jobIdInput}
            onChange={(e) => setJobIdInput(e.target.value.toUpperCase())}
            placeholder="Enter Job Card ID (e.g. PIT-IND-1001)..."
            className="w-full bg-transparent text-sm text-white font-bold outline-none uppercase placeholder-slate-500"
          />
          <button
            onClick={() => fetchBooking(jobIdInput)}
            disabled={loading || !jobIdInput.trim()}
            className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs px-5 py-2.5 rounded-xl cursor-pointer transition-all whitespace-nowrap"
          >
            {loading ? 'Searching...' : 'Track Job Card'}
          </button>
        </div>

        {/* Quick Recent Job Cards Badges */}
        {recentBookings.length > 0 && (
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
            <span className="text-[11px] text-slate-400 font-semibold">Active Garage Job Cards:</span>
            {recentBookings.map((b) => (
              <button
                key={b.id}
                onClick={() => {
                  setJobIdInput(b.id);
                  fetchBooking(b.id);
                }}
                className={`text-xs px-3 py-1 rounded-lg border font-mono font-bold transition-all ${
                  activeBooking?.id === b.id
                    ? 'bg-amber-500 text-slate-950 border-amber-400'
                    : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-700'
                }`}
              >
                {b.id} ({b.carBrand} {b.carModel})
              </button>
            ))}
          </div>
        )}

        {/* Error Message */}
        {errorMsg && (
          <div className="mt-6 max-w-2xl mx-auto bg-red-500/10 border border-red-500/30 text-red-300 p-4 rounded-xl text-xs text-center">
            {errorMsg}
          </div>
        )}

        {/* Live Tracking Card Result */}
        {activeBooking && (
          <div className="mt-8 bg-slate-900 border border-slate-800 rounded-2xl p-6 lg:p-8 max-w-4xl mx-auto shadow-2xl">
            
            {/* Header Info */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-slate-800 pb-6 gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[10px] px-2.5 py-0.5 rounded font-bold font-mono">
                    {activeBooking.id}
                  </span>
                  <span className="text-xs text-slate-400">• {activeBooking.city}</span>
                </div>
                <h3 className="text-2xl font-black text-white mt-1">
                  {activeBooking.carBrand} {activeBooking.carModel} ({activeBooking.fuelType})
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Vehicle Reg: <strong className="text-slate-200 font-mono">{activeBooking.vehicleNumber}</strong> • Owner: {activeBooking.customerName}
                </p>
              </div>

              <div className="text-right">
                <span className="text-xs text-slate-400 block">Total Est. Cost:</span>
                <span className="text-2xl font-black text-amber-400">
                  ₹{activeBooking.totalEstimateINR.toLocaleString('en-IN')}
                </span>
                <span className="text-[10px] text-slate-400 block mt-0.5">Slot: {activeBooking.bookingDate} ({activeBooking.timeSlot})</span>
              </div>
            </div>

            {/* Stepper Progress Bar */}
            <div className="mt-8">
              <div className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-4">
                Live Workshop Progress: <span className="text-white font-extrabold">{activeBooking.status}</span>
              </div>

              <div className="relative flex items-center justify-between">
                {/* Connecting Line */}
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-slate-800 z-0"></div>
                <div
                  className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-gradient-to-r from-amber-500 to-orange-500 transition-all duration-500 z-0"
                  style={{
                    width: `${(getStepIndex(activeBooking.status) / (statusSteps.length - 1)) * 100}%`
                  }}
                ></div>

                {statusSteps.map((step, idx) => {
                  const currentIdx = getStepIndex(activeBooking.status);
                  const isCompleted = idx < currentIdx;
                  const isCurrent = idx === currentIdx;

                  return (
                    <div key={step} className="relative z-10 flex flex-col items-center">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                          isCompleted
                            ? 'bg-amber-500 text-slate-950 font-black'
                            : isCurrent
                            ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-black ring-4 ring-amber-500/30 animate-pulse'
                            : 'bg-slate-950 border border-slate-700 text-slate-500'
                        }`}
                      >
                        {isCompleted ? '✓' : idx + 1}
                      </div>
                      <span className={`text-[10px] mt-2 text-center font-bold max-w-[70px] ${
                        isCurrent ? 'text-amber-300' : isCompleted ? 'text-slate-300' : 'text-slate-600'
                      }`}>
                        {step}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Services Checklist */}
            <div className="mt-8 pt-6 border-t border-slate-800 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-2">
                  Requested Pitstop Services ({activeBooking.services.length})
                </h4>
                <ul className="space-y-2 text-xs text-slate-300">
                  {activeBooking.services.map((srv, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
                      <span>{srv}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col justify-between">
                <div>
                  <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-2">
                    Pitstop Notes & Doorstep Option
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {activeBooking.customNote || 'No special custom notes provided.'}
                  </p>
                  <div className="mt-2 text-xs text-slate-400">
                    Doorstep Pickup & Drop:{' '}
                    <strong className={activeBooking.pickupRequired ? 'text-amber-300' : 'text-slate-500'}>
                      {activeBooking.pickupRequired ? 'Requested (+₹299)' : 'Self Drive to Pitstop'}
                    </strong>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                  <span>Helpline: +91 98200 PITSTOP</span>
                  <button
                    onClick={() => fetchBooking(activeBooking.id)}
                    className="text-amber-400 hover:underline flex items-center gap-1 font-bold"
                  >
                    <RefreshCw className="w-3 h-3" />
                    Refresh Status
                  </button>
                </div>
              </div>
            </div>

          </div>
        )}

      </div>
    </section>
  );
};
