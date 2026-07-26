import React from 'react';
import { Wrench, Phone, MapPin, Mail, ShieldAlert, Sparkles, Sliders } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 text-white border-t border-amber-500/20 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-12 border-b border-slate-800">
          
          {/* Brand Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 p-0.5 shadow-lg shadow-amber-500/20">
                <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                  <Wrench className="w-5 h-5 text-amber-400" />
                </div>
              </div>
              <span className="font-black text-2xl tracking-tight bg-gradient-to-r from-amber-400 to-orange-300 bg-clip-text text-transparent" data-brand-text="business-name">
                INDIAN AUTO PIT
              </span>
            </div>
            <p className="mt-3 text-xs text-slate-400 leading-relaxed max-w-sm">
              India's premier certified car care garage & custom modification pit. Offering snow foam washes, 9H graphene ceramic coatings, OEM mechanical repairs, valvetronic exhausts & Stage 1 ECU remaps.
            </p>

            <div className="mt-4 flex items-center gap-2 text-xs font-bold text-amber-400">
              <Phone className="w-4 h-4" />
              <span data-brand-text="phone">Toll Free Emergency Helpline: 1800-PIT-STOP (+91 1800 748 7867)</span>
            </div>
          </div>

          {/* Pit Services */}
          <div>
            <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-3">Pit Divisions</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><a href="#services-section" className="hover:text-amber-300">Snow Foam & Underbody Wash</a></li>
              <li><a href="#services-section" className="hover:text-amber-300">Graphene Ceramic Coating (9H)</a></li>
              <li><a href="#services-section" className="hover:text-amber-300">TPU Self-Healing PPF</a></li>
              <li><a href="#services-section" className="hover:text-amber-300">Clutch & Gearbox Overhaul</a></li>
              <li><a href="#services-section" className="hover:text-amber-300">AC Chill-Max Gas Leak Service</a></li>
            </ul>
          </div>

          {/* Modifications & Tech */}
          <div>
            <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-3">Custom Studio</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><a href="#configurator" className="hover:text-amber-300">3D Vinyl Wrap Configurator</a></li>
              <li><a href="#configurator" className="hover:text-amber-300">Valvetronic Performance Exhaust</a></li>
              <li><a href="#configurator" className="hover:text-amber-300">Stage 1 ECU Performance Remap</a></li>
              <li><a href="#ai-diagnostics" className="hover:text-amber-300">AI Fault Diagnostic Tool</a></li>
              <li><a href="#job-tracker" className="hover:text-amber-300">Live Job Card Tracking</a></li>
            </ul>
          </div>

          {/* Cities */}
          <div>
            <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-3">Indian Garage Network</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>Mumbai (Andheri Link Rd & Thane)</li>
              <li>Delhi NCR (Gurugram Sec 29 & Noida)</li>
              <li>Bengaluru (Koramangala & Whitefield)</li>
              <li>Pune (Baner Road)</li>
              <li>Hyderabad (Gachibowli)</li>
            </ul>
          </div>

        </div>

        {/* Copyright & Disclaimer */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <div data-brand-text="address">
            © 2026 Indian Auto Pit & Custom Garage India Pvt. Ltd. All Rights Reserved.
          </div>
          <div className="text-[11px] text-slate-500 max-w-md text-center sm:text-right">
            All modifications adhere strictly to Indian Motor Vehicle Act guidelines. Wrap colors, exhaust valves, and lift kits supplied with RTO compliance advice.
          </div>
        </div>

        <div className="mt-4 text-center text-xs text-slate-500">
          <p>
            Developer: <span className="font-semibold">Aniruddha Das</span> | Developed by{" "}
            <a href="https://leadspree.in" target="_blank" rel="noopener noreferrer" className="font-semibold hover:underline">
              LeadSpree Business Solutions
            </a>
          </p>
        </div>

      </div>
    </footer>
  );
};
