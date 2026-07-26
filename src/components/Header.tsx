import React, { useState } from 'react';
import { Wrench, Phone, MapPin, Calendar, Car, ShieldAlert, Sparkles, Sliders, Search, Activity, ChevronDown } from 'lucide-react';
import { GARAGE_BRANCHES } from '../data/cars';

interface HeaderProps {
  selectedCity: string;
  onSelectCity: (city: string) => void;
  activeSection: string;
  onNavigate: (section: string) => void;
  onOpenBooking: (initialServiceId?: string) => void;
  cartCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  selectedCity,
  onSelectCity,
  activeSection,
  onNavigate,
  onOpenBooking,
  cartCount
}) => {
  const [cityDropdownOpen, setCityDropdownOpen] = useState(false);

  const navItems = [
    { id: 'services', label: 'Services & Pitstop', icon: Wrench },
    { id: 'configurator', label: 'Mod Studio 3D', icon: Sliders, badge: 'Hot' },
    { id: 'ai-diagnostics', label: 'AI Fault Diagnostic', icon: Activity, badge: 'AI' },
    { id: 'job-tracker', label: 'Live Job Card', icon: Search },
    { id: 'branches', label: 'Pit Centers', icon: MapPin },
  ];

  return (
    <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-amber-500/20 text-white">
      {/* Emergency Roadside Assistance Ticker */}
      <div className="bg-gradient-to-r from-red-600 via-amber-600 to-red-600 text-white text-xs py-1 px-4 flex items-center justify-between font-medium">
        <div className="flex items-center gap-2 overflow-hidden whitespace-nowrap">
          <span className="inline-flex items-center gap-1 bg-black/40 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider text-amber-300 animate-pulse">
            <ShieldAlert className="w-3 h-3 text-red-400" />
            24/7 Roadside Pit Assist
          </span>
          <span className="hidden md:inline">Flat Tyre, Battery Jumpstart & Towing across Mumbai, Delhi NCR, Bengaluru, Pune & Hyderabad!</span>
          <span className="md:hidden">Towing & Emergency Assist Across India</span>
        </div>
        <a href="tel:+9118007487867" className="flex items-center gap-1 bg-white/20 hover:bg-white/30 text-white px-2.5 py-0.5 rounded text-xs font-semibold transition-all">
          <Phone className="w-3 h-3 text-amber-300" />
          <span>Toll Free: 1800-PIT-STOP</span>
        </a>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo & Name */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => onNavigate('hero')}>
            <div className="relative flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 via-orange-600 to-red-600 p-0.5 shadow-lg shadow-amber-500/20">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Wrench className="w-6 h-6 text-amber-400 transform -rotate-12" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-xl sm:text-2xl tracking-tight bg-gradient-to-r from-amber-400 via-orange-300 to-yellow-200 bg-clip-text text-transparent" data-brand-text="business-name" data-brand-default="INDIAN AUTO PIT">
                  INDIAN AUTO PIT
                </span>
                <span className="bg-amber-500/20 text-amber-400 border border-amber-500/30 text-[10px] px-1.5 py-0.5 rounded font-bold uppercase tracking-widest">
                  INDIA
                </span>
              </div>
              <p className="text-xs text-slate-400 font-medium" data-brand-text="contact-name">Washing • Repair • Custom Modifications</p>
            </div>
          </div>

          {/* City / Branch Selector */}
          <div className="relative hidden md:block">
            <button
              onClick={() => setCityDropdownOpen(!cityDropdownOpen)}
              className="flex items-center gap-2 bg-slate-900 border border-slate-800 hover:border-amber-500/50 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-200 transition-all"
            >
              <MapPin className="w-3.5 h-3.5 text-amber-400" />
              <span>Location: <strong className="text-amber-300">{selectedCity}</strong></span>
              <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${cityDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {cityDropdownOpen && (
              <div className="absolute left-0 mt-2 w-64 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl py-2 z-50">
                <div className="px-3 py-1.5 text-[11px] font-bold uppercase text-slate-400 tracking-wider">Select Your City Pit</div>
                {GARAGE_BRANCHES.map((branch) => (
                  <button
                    key={branch.id}
                    onClick={() => {
                      onSelectCity(branch.city);
                      setCityDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-amber-500/10 transition-colors ${selectedCity === branch.city ? 'bg-amber-500/20 text-amber-300 font-bold' : 'text-slate-300'}`}
                  >
                    <div>
                      <div>{branch.name}</div>
                      <div className="text-[10px] text-slate-400">{branch.city}</div>
                    </div>
                    <span className="text-[10px] text-amber-400 font-semibold">4.9★</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Nav Links (Desktop) */}
          <nav className="hidden lg:flex items-center gap-1 bg-slate-900/80 border border-slate-800 p-1 rounded-xl">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`relative flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-slate-950 shadow-md shadow-amber-500/25 font-bold'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-slate-950' : 'text-amber-400'}`} />
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className={`text-[9px] px-1.5 py-0.2 rounded font-black tracking-wider uppercase ${
                      isActive ? 'bg-slate-950 text-amber-300' : 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Book Slot CTA Button */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => onOpenBooking()}
              className="relative inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-400 hover:to-orange-500 text-slate-950 font-extrabold text-xs sm:text-sm px-4 py-2.5 rounded-xl shadow-lg shadow-amber-500/20 hover:shadow-amber-500/40 transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
            >
              <Calendar className="w-4 h-4 text-slate-950" />
              <span>Book Pitstop Slot</span>
              {cartCount > 0 && (
                <span className="ml-1 bg-slate-950 text-amber-400 font-bold text-[10px] px-2 py-0.5 rounded-full border border-amber-400/50">
                  {cartCount}
                </span>
              )}
            </button>
          </div>

        </div>

        {/* Mobile Navigation Bar */}
        <div className="lg:hidden flex items-center justify-between overflow-x-auto py-2.5 border-t border-slate-800 scrollbar-none gap-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-amber-500 text-slate-950 font-bold'
                    : 'bg-slate-900 text-slate-300 border border-slate-800'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
