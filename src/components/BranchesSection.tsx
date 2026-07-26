import React from 'react';
import { GARAGE_BRANCHES } from '../data/cars';
import { MapPin, Phone, Clock, Star, CheckCircle2, Wrench } from 'lucide-react';

export const BranchesSection: React.FC = () => {
  return (
    <section id="branches" className="py-16 bg-slate-950 text-white border-b border-amber-500/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <span className="bg-amber-500/10 text-amber-400 border border-amber-500/30 text-xs px-3 py-1 rounded-full font-bold uppercase tracking-widest">
            Indian Pitstop Network
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-white mt-3">
            Our Certified Auto Pit Garages Across India
          </h2>
          <p className="mt-2 text-sm text-slate-400">
            Equipped with laser wheel alignment, high-pressure foam tunnels, dyno tuning bays & 3M steam detailing facilities.
          </p>
        </div>

        {/* Branches Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {GARAGE_BRANCHES.map((branch) => (
            <div
              key={branch.id}
              className="bg-slate-900 border border-slate-800 hover:border-amber-500/50 p-6 rounded-2xl transition-all shadow-xl flex flex-col justify-between"
            >
              <div>
                {/* City & Rating Header */}
                <div className="flex items-center justify-between mb-3">
                  <span className="bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[10px] px-2.5 py-0.5 rounded font-bold uppercase">
                    {branch.city}
                  </span>
                  <div className="flex items-center gap-1 text-amber-400 text-xs font-bold">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>{branch.rating} ({branch.reviewsCount} Reviews)</span>
                  </div>
                </div>

                <h3 className="text-xl font-black text-white">{branch.name}</h3>

                {/* Address & Contact */}
                <div className="mt-3 space-y-2 text-xs text-slate-300">
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                    <span>{branch.address}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-amber-400 flex-shrink-0" />
                    <a href={`tel:${branch.phone}`} className="hover:text-amber-300 font-bold">{branch.phone}</a>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-amber-400 flex-shrink-0" />
                    <span>{branch.hours}</span>
                  </div>
                </div>

                {/* Specialties */}
                <div className="mt-4 pt-4 border-t border-slate-800">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
                    Garage Facilities & Specialties:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {branch.specialties.map((spec, idx) => (
                      <span
                        key={idx}
                        className="bg-slate-950 border border-slate-800 text-slate-300 text-[10px] px-2 py-0.5 rounded font-medium flex items-center gap-1"
                      >
                        <CheckCircle2 className="w-2.5 h-2.5 text-amber-400" />
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between">
                <a
                  href={branch.googleMapUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs font-bold text-amber-400 hover:underline flex items-center gap-1"
                >
                  <span>Open Google Maps Directions</span>
                  <span>→</span>
                </a>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
