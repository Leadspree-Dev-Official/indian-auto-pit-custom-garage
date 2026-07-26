import React from 'react';
import { Wrench, Sparkles, Sliders, ShieldCheck, ArrowRight, Zap, CheckCircle2, Car, Activity, Star } from 'lucide-react';
import { INDIAN_CAR_BRANDS } from '../data/cars';

interface HeroProps {
  onNavigate: (section: string) => void;
  onOpenBooking: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigate, onOpenBooking }) => {
  return (
    <div className="relative bg-slate-950 text-white overflow-hidden border-b border-amber-500/10">
      {/* Background Graphic & Light Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(245,158,11,0.15),rgba(255,255,255,0))]"></div>
      
      {/* Background Image with Dark Vignette */}
      <div className="absolute inset-0 opacity-25 mix-blend-luminosity">
        <img
          src="https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1920&q=80"
          alt="Indian Auto Pit Garage"
          className="w-full h-full object-cover object-center"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16 lg:pt-20 lg:pb-24">
        
        {/* Top Tagline Badge */}
        <div className="flex items-center justify-center lg:justify-start">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500/10 via-amber-500/20 to-orange-500/10 border border-amber-500/30 px-3.5 py-1.5 rounded-full text-xs font-semibold text-amber-300 backdrop-blur-sm shadow-inner">
            <Sparkles className="w-4 h-4 text-amber-400 animate-spin-slow" />
            <span>India's #1 Certified Auto Pit & Modification Studio</span>
            <span className="hidden sm:inline-block w-1.5 h-1.5 rounded-full bg-amber-400"></span>
            <span className="hidden sm:inline text-amber-200">ISO 9001:2026 Certified Garage</span>
          </div>
        </div>

        {/* Hero Title & Pitch */}
        <div className="mt-6 text-center lg:text-left max-w-3xl">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-none">
            WHERE INDIAN CARS GET{' '}
            <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-red-500 bg-clip-text text-transparent">
              WASHED, REPAIRED & MODIFIED
            </span>
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-300 font-normal leading-relaxed">
            From deep ceramic foam washes & OEM mechanical repairs to stage 1 remaps, valvetronic exhausts & custom offroad armors. Built specifically for Mahindra, Tata, VW, Maruti, Hyundai & Toyota vehicles on Indian roads.
          </p>

          {/* Core Feature Badges */}
          <div className="mt-6 flex flex-wrap items-center justify-center lg:justify-start gap-3">
            <div className="flex items-center gap-1.5 bg-slate-900/90 border border-slate-800 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-200">
              <CheckCircle2 className="w-4 h-4 text-amber-400" />
              <span>Graphene Ceramic & 190µ PPF</span>
            </div>
            <div className="flex items-center gap-1.5 bg-slate-900/90 border border-slate-800 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-200">
              <CheckCircle2 className="w-4 h-4 text-amber-400" />
              <span>OBD2 Computerized Diagnostics</span>
            </div>
            <div className="flex items-center gap-1.5 bg-slate-900/90 border border-slate-800 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-200">
              <CheckCircle2 className="w-4 h-4 text-amber-400" />
              <span>RTO & ARAI Approved Mods</span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
            <button
              onClick={() => onOpenBooking()}
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 via-orange-500 to-red-600 hover:from-amber-400 hover:to-orange-500 text-slate-950 font-black text-sm px-6 py-3.5 rounded-xl shadow-xl shadow-amber-500/20 hover:shadow-amber-500/40 transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
            >
              <span>Book Service / Wash Pitstop</span>
              <ArrowRight className="w-4 h-4 text-slate-950" />
            </button>

            <button
              onClick={() => onNavigate('configurator')}
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white border border-slate-700 hover:border-amber-500/50 font-bold text-sm px-6 py-3.5 rounded-xl transition-all cursor-pointer"
            >
              <Sliders className="w-4 h-4 text-amber-400" />
              <span>Launch 3D Mod Configurator</span>
            </button>

            <button
              onClick={() => onNavigate('ai-diagnostics')}
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 font-bold text-sm px-5 py-3.5 rounded-xl transition-all cursor-pointer"
            >
              <Activity className="w-4 h-4 text-amber-400" />
              <span>AI Car Fault Finder</span>
            </button>
          </div>
        </div>

        {/* 3 Core Divisions Cards Grid */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Division 1: Washing & Detailing */}
          <div 
            onClick={() => onNavigate('services')}
            className="group relative bg-slate-900/80 border border-slate-800 hover:border-amber-500/60 p-6 rounded-2xl transition-all hover:bg-slate-900 shadow-lg cursor-pointer overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 rounded-bl-full pointer-events-none group-hover:bg-amber-500/10 transition-all"></div>
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Sparkles className="w-6 h-6 text-amber-400" />
            </div>
            <span className="text-[10px] font-bold tracking-widest text-amber-400 uppercase">Division 01</span>
            <h3 className="text-xl font-bold text-white mt-1 group-hover:text-amber-300 transition-colors">
              Car Washing & Detailing
            </h3>
            <p className="mt-2 text-xs text-slate-400 leading-relaxed">
              Snow foam baths, underbody jet clean, 3M steam sanitization, 9H graphene ceramic coating & TPU self-healing PPF.
            </p>
            <div className="mt-4 flex items-center text-xs font-semibold text-amber-400 gap-1 group-hover:translate-x-1 transition-transform">
              <span>View Wash Packages (From ₹799)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Division 2: Repairs & Maintenance */}
          <div 
            onClick={() => onNavigate('services')}
            className="group relative bg-slate-900/80 border border-slate-800 hover:border-amber-500/60 p-6 rounded-2xl transition-all hover:bg-slate-900 shadow-lg cursor-pointer overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 rounded-bl-full pointer-events-none group-hover:bg-amber-500/10 transition-all"></div>
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Wrench className="w-6 h-6 text-amber-400" />
            </div>
            <span className="text-[10px] font-bold tracking-widest text-amber-400 uppercase">Division 02</span>
            <h3 className="text-xl font-bold text-white mt-1 group-hover:text-amber-300 transition-colors">
              Mechanics & Engine Repairs
            </h3>
            <p className="mt-2 text-xs text-slate-400 leading-relaxed">
              Periodic 10k km maintenance, clutch overhaul, AC gas leak repair, suspension tuning, OBD2 diagnostics & brake service.
            </p>
            <div className="mt-4 flex items-center text-xs font-semibold text-amber-400 gap-1 group-hover:translate-x-1 transition-transform">
              <span>View Repair Services (From ₹999)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Division 3: Custom Modifications */}
          <div 
            onClick={() => onNavigate('configurator')}
            className="group relative bg-slate-900/80 border border-slate-800 hover:border-amber-500/60 p-6 rounded-2xl transition-all hover:bg-slate-900 shadow-lg cursor-pointer overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 rounded-bl-full pointer-events-none group-hover:bg-amber-500/10 transition-all"></div>
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Sliders className="w-6 h-6 text-amber-400" />
            </div>
            <span className="text-[10px] font-bold tracking-widest text-amber-400 uppercase">Division 03</span>
            <h3 className="text-xl font-bold text-white mt-1 group-hover:text-amber-300 transition-colors">
              Custom Modifications & Tuning
            </h3>
            <p className="mt-2 text-xs text-slate-400 leading-relaxed">
              Full vinyl wraps, valvetronic exhaust systems, Stage 1 ECU remaps, offroad steel bumpers, forged alloys & starry roofs.
            </p>
            <div className="mt-4 flex items-center text-xs font-semibold text-amber-400 gap-1 group-hover:translate-x-1 transition-transform">
              <span>Try Mod Configurator Studio</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

        </div>

        {/* Live Garage Stats Bar */}
        <div className="mt-12 bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
          <div>
            <div className="text-2xl sm:text-3xl font-black text-amber-400">18,500+</div>
            <div className="text-xs text-slate-400 font-medium mt-1">Indian Cars Serviced</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-black text-amber-400">4,200+</div>
            <div className="text-xs text-slate-400 font-medium mt-1">Custom Modifications Done</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-black text-amber-400">4.9 / 5.0 ★</div>
            <div className="text-xs text-slate-400 font-medium mt-1">Verified Customer Rating</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-black text-amber-400">7 Centers</div>
            <div className="text-xs text-slate-400 font-medium mt-1">Mumbai, NCR, Blr, Pune, Hyd</div>
          </div>
        </div>

      </div>
    </div>
  );
};
