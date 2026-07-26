import React, { useState } from 'react';
import { Sliders, Sparkles, Loader2, ArrowRight, ShieldCheck, CheckCircle2, Zap, DollarSign } from 'lucide-react';
import { ModAdvisorResult } from '../types';

interface AIModAdvisorProps {
  onOpenBookingWithMods: (summary: string, priceINR: number) => void;
}

export const AIModAdvisor: React.FC<AIModAdvisorProps> = ({ onOpenBookingWithMods }) => {
  const [carBrand, setCarBrand] = useState('Volkswagen');
  const [carModel, setCarModel] = useState('Virtus GT 1.5 TSI');
  const [styleGoal, setStyleGoal] = useState('Stealth Performance');
  const [budgetINR, setBudgetINR] = useState('150000');
  const [priority, setPriority] = useState('Performance & Exhaust Sound');
  const [loading, setLoading] = useState(false);
  const [modResult, setModResult] = useState<ModAdvisorResult | null>(null);

  const styleGoals = [
    'Stealth Performance (Nardo Wrap + Remap + Exhaust)',
    '4x4 Offroad Beast (Lift Kit + Steel Bumpers + Winch + Offroad Rims)',
    'VIP Luxury Lounge (Starry Roof + Ambient Light + Leatherette)',
    'Track Edition GT (Lowering Springs + Forged Alloys + Remap + Spoiler)'
  ];

  const handleGeneratePackage = async () => {
    setLoading(true);
    setModResult(null);

    try {
      const response = await fetch('/api/ai/mod-advisor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          carBrand,
          carModel,
          styleGoal,
          budgetINR,
          priority
        })
      });

      const data = await response.json();
      if (data.packageTitle) {
        setModResult(data);
      }
    } catch (err) {
      console.error('Mod Advisor Error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-16 bg-slate-950 text-white border-b border-amber-500/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <span className="bg-amber-500/10 text-amber-400 border border-amber-500/30 text-xs px-3 py-1 rounded-full font-bold uppercase tracking-widest flex items-center justify-center gap-1.5 w-max mx-auto">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            AI Custom Package Architect
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-white mt-3">
            AI Modification Package Advisor & RTO Checker
          </h2>
          <p className="mt-2 text-sm text-slate-400">
            Tell AI your car model and budget in ₹ INR. It architects an optimized modification package while ensuring compliance with Indian RTO regulations.
          </p>
        </div>

        {/* Input Form */}
        <div className="mt-10 bg-slate-900 border border-slate-800 rounded-2xl p-6 lg:p-8 max-w-4xl mx-auto shadow-2xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">Car Brand & Model</label>
              <input
                type="text"
                value={`${carBrand} ${carModel}`}
                onChange={(e) => {
                  const parts = e.target.value.split(' ');
                  setCarBrand(parts[0] || 'Car');
                  setCarModel(parts.slice(1).join(' ') || 'Model');
                }}
                className="w-full bg-slate-950 border border-slate-800 focus:border-amber-500 rounded-xl px-3 py-2 text-xs text-white outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">Target Budget in ₹ INR</label>
              <input
                type="text"
                value={budgetINR}
                onChange={(e) => setBudgetINR(e.target.value)}
                placeholder="e.g. 150000"
                className="w-full bg-slate-950 border border-slate-800 focus:border-amber-500 rounded-xl px-3 py-2 text-xs text-white outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">Priority Focus</label>
              <input
                type="text"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                placeholder="e.g. Sound & Power / Visual Stance"
                className="w-full bg-slate-950 border border-slate-800 focus:border-amber-500 rounded-xl px-3 py-2 text-xs text-white outline-none"
              />
            </div>
          </div>

          {/* Style Goal Chips */}
          <div className="mb-6">
            <label className="text-xs font-bold text-amber-400 uppercase tracking-wider block mb-2">Select Theme Concept Goal:</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {styleGoals.map((goal, idx) => (
                <button
                  key={idx}
                  onClick={() => setStyleGoal(goal)}
                  className={`p-3 rounded-xl border text-xs font-semibold text-left transition-all cursor-pointer ${
                    styleGoal === goal
                      ? 'bg-slate-800 border-amber-500 text-amber-300 font-bold'
                      : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  {goal}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleGeneratePackage}
            disabled={loading}
            className="w-full bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-400 hover:to-orange-500 text-slate-950 font-black text-sm py-3.5 rounded-xl shadow-xl shadow-amber-500/20 transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 text-slate-950 animate-spin" />
                <span>AI Architecting Mod Package & Checking RTO Laws...</span>
              </>
            ) : (
              <>
                <Sliders className="w-4 h-4 text-slate-950" />
                <span>Generate AI Mod Package</span>
              </>
            )}
          </button>
        </div>

        {/* Output Package Card */}
        {modResult && (
          <div className="mt-8 bg-slate-900 border border-amber-500/40 rounded-2xl p-6 lg:p-8 max-w-4xl mx-auto shadow-2xl">
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-slate-800 pb-4 mb-6 gap-2">
              <div>
                <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest bg-amber-500/10 border border-amber-500/30 px-2.5 py-0.5 rounded">
                  AI Custom Build Concept
                </span>
                <h3 className="text-2xl font-black text-white mt-1">{modResult.packageTitle}</h3>
              </div>
              <div className="text-right">
                <span className="text-xs text-slate-400 block">Package Price:</span>
                <span className="text-2xl font-black text-amber-400">
                  ₹{modResult.totalBudgetEstimatedINR?.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-300 mb-6 bg-slate-950 p-3.5 rounded-xl border border-slate-800 leading-relaxed">
              {modResult.overview}
            </p>

            {/* Recommended Mods Table */}
            <div className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden mb-6">
              <div className="px-4 py-2 bg-slate-900 text-xs font-bold text-amber-400 uppercase tracking-wider flex justify-between border-b border-slate-800">
                <span>Mod Item & Category</span>
                <span>Estimated Cost (₹)</span>
              </div>
              <div className="divide-y divide-slate-800/60">
                {modResult.recommendedMods?.map((mod, idx) => (
                  <div key={idx} className="px-4 py-3 flex items-center justify-between text-xs">
                    <div>
                      <div className="font-bold text-white">{mod.item}</div>
                      <div className="text-[10px] text-slate-400">{mod.category}</div>
                    </div>
                    <div className="font-extrabold text-amber-300">
                      ₹{mod.estPriceINR?.toLocaleString('en-IN')}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Performance Gain & RTO Guidance */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                <div className="flex items-center gap-1.5 text-xs font-bold text-amber-400 uppercase tracking-wider mb-1">
                  <Zap className="w-4 h-4 text-amber-400" />
                  <span>Performance Gain & Upgrades</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed mt-1">{modResult.performanceGain}</p>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                <div className="flex items-center gap-1.5 text-xs font-bold text-amber-400 uppercase tracking-wider mb-1">
                  <ShieldCheck className="w-4 h-4 text-amber-400" />
                  <span>RTO Legality & ARAI Guidance</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed mt-1">{modResult.rtoComplianceAdvice}</p>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => onOpenBookingWithMods(
                  modResult.packageTitle,
                  modResult.totalBudgetEstimatedINR || 150000
                )}
                className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs px-6 py-3 rounded-xl transition-all cursor-pointer flex items-center gap-2"
              >
                <span>Book This Custom Mod Package</span>
                <ArrowRight className="w-4 h-4 text-slate-950" />
              </button>
            </div>

          </div>
        )}

      </div>
    </section>
  );
};
