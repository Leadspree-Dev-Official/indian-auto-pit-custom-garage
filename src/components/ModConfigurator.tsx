import React, { useState } from 'react';
import { INDIAN_CAR_BRANDS } from '../data/cars';
import { ConfiguratorState, CarModel } from '../types';
import { Sliders, Sparkles, Check, Download, ShoppingBag, ShieldCheck, Zap, Activity, Info, ChevronRight } from 'lucide-react';

interface ModConfiguratorProps {
  onOpenBookingWithMods: (modSummary: string, totalPriceINR: number) => void;
}

export const ModConfigurator: React.FC<ModConfiguratorProps> = ({ onOpenBookingWithMods }) => {
  // Initial car: Mahindra Thar 4x4
  const defaultBrand = INDIAN_CAR_BRANDS[0];
  const defaultModel = defaultBrand.models[0];

  const [selectedBrandId, setSelectedBrandId] = useState(defaultBrand.id);
  const [selectedModelId, setSelectedModelId] = useState(defaultModel.id);

  const currentBrand = INDIAN_CAR_BRANDS.find(b => b.id === selectedBrandId) || defaultBrand;
  const currentModel = currentBrand.models.find(m => m.id === selectedModelId) || currentBrand.models[0];

  // Customization State
  const [wrapColor, setWrapColor] = useState(currentModel.wrapColors[0]);
  const [alloyStyle, setAlloyStyle] = useState('Stock Rims');
  const [alloyPriceINR, setAlloyPriceINR] = useState(0);

  const [suspension, setSuspension] = useState('Stock Suspension');
  const [suspensionPriceINR, setSuspensionPriceINR] = useState(0);

  const [exhaust, setExhaust] = useState('Stock Exhaust');
  const [exhaustPriceINR, setExhaustPriceINR] = useState(0);

  const [lighting, setLighting] = useState('Stock Interior');
  const [lightingPriceINR, setLightingPriceINR] = useState(0);

  const [stage1Remap, setStage1Remap] = useState(false);
  const remapPriceINR = 24000;

  const wrapBasePriceINR = 38000;

  // Total Customization Price
  const totalModPriceINR = wrapBasePriceINR + alloyPriceINR + suspensionPriceINR + exhaustPriceINR + lightingPriceINR + (stage1Remap ? remapPriceINR : 0);

  // Handle Model Change
  const handleModelChange = (model: CarModel) => {
    setSelectedModelId(model.id);
    setWrapColor(model.wrapColors[0]);
  };

  const handleBookBuild = () => {
    const summary = `${currentBrand.name} ${currentModel.name} [Wrap: ${wrapColor.name}, Alloys: ${alloyStyle}, Exhaust: ${exhaust}, Remap: ${stage1Remap ? 'Stage 1 (+30HP)' : 'No'}]`;
    onOpenBookingWithMods(summary, totalModPriceINR);
  };

  return (
    <section id="configurator" className="py-16 bg-slate-950 text-white border-b border-amber-500/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <span className="bg-amber-500/10 text-amber-400 border border-amber-500/30 text-xs px-3 py-1 rounded-full font-bold uppercase tracking-widest flex items-center justify-center gap-1.5 w-max mx-auto">
            <Sliders className="w-3.5 h-3.5 text-amber-400" />
            PitStop Customization Studio 3D
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-white mt-3">
            Build & Cost-Configure Your Dream Car
          </h2>
          <p className="mt-2 text-sm text-slate-400">
            Select your Indian car model, try custom vinyl wraps, forged alloys, performance exhausts & stage 1 ECU remaps with live price calculation in ₹ INR.
          </p>
        </div>

        {/* Brand & Car Selector Tabs */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
          {INDIAN_CAR_BRANDS.map((brand) => (
            <button
              key={brand.id}
              onClick={() => {
                setSelectedBrandId(brand.id);
                handleModelChange(brand.models[0]);
              }}
              className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
                selectedBrandId === brand.id
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                  : 'bg-slate-900 text-slate-300 hover:text-white border border-slate-800'
              }`}
            >
              {brand.name}
            </button>
          ))}
        </div>

        {/* Models under selected brand */}
        <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
          {currentBrand.models.map((model) => (
            <button
              key={model.id}
              onClick={() => handleModelChange(model)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                selectedModelId === model.id
                  ? 'bg-slate-800 text-amber-400 border border-amber-500/50 font-bold'
                  : 'bg-slate-900/60 text-slate-400 border border-slate-800 hover:text-slate-200'
              }`}
            >
              {model.name} ({model.type})
            </button>
          ))}
        </div>

        {/* Main Configurator Grid */}
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Visual Preview Canvas (7 Cols) */}
          <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-2xl p-6 relative overflow-hidden shadow-2xl">
            
            {/* Top Car Label & Badges */}
            <div className="flex items-center justify-between mb-4">
              <div>
                <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider">{currentBrand.name}</span>
                <h3 className="text-2xl font-black text-white">{currentModel.name}</h3>
              </div>
              <div className="text-right">
                <span className="text-xs text-slate-400 block">Wrap Selection:</span>
                <span className="text-xs font-bold text-amber-300">{wrapColor.name}</span>
              </div>
            </div>

            {/* Interactive Car Canvas Preview Container */}
            <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center border border-slate-800">
              
              {/* Dynamic Color Overlay Effect */}
              <div
                className="absolute inset-0 opacity-20 transition-all duration-500 pointer-events-none mix-blend-color"
                style={{ backgroundColor: wrapColor.hex }}
              ></div>

              {/* Car Image */}
              <img
                src={currentModel.image}
                alt={currentModel.name}
                className="w-full h-full object-cover relative z-10 transition-transform duration-500 hover:scale-105"
                referrerPolicy="no-referrer"
              />

              {/* Active Mod Badges Overlay */}
              <div className="absolute bottom-3 left-3 z-20 flex flex-wrap gap-1.5">
                <span className="bg-black/70 backdrop-blur-md border border-amber-500/40 text-amber-300 text-[10px] px-2.5 py-1 rounded-md font-bold">
                  Wrap: {wrapColor.name}
                </span>
                {alloyStyle !== 'Stock Rims' && (
                  <span className="bg-black/70 backdrop-blur-md border border-slate-700 text-slate-200 text-[10px] px-2.5 py-1 rounded-md font-bold">
                    Alloys: {alloyStyle}
                  </span>
                )}
                {exhaust !== 'Stock Exhaust' && (
                  <span className="bg-black/70 backdrop-blur-md border border-red-500/40 text-red-300 text-[10px] px-2.5 py-1 rounded-md font-bold">
                    Exhaust: {exhaust}
                  </span>
                )}
                {stage1Remap && (
                  <span className="bg-black/70 backdrop-blur-md border border-yellow-500/50 text-yellow-300 text-[10px] px-2.5 py-1 rounded-md font-bold flex items-center gap-1">
                    <Zap className="w-3 h-3 text-yellow-400" />
                    Stage 1 ECU (+30 HP)
                  </span>
                )}
              </div>
            </div>

            {/* Price Summary Bar */}
            <div className="mt-6 bg-slate-950 border border-slate-800 p-4 rounded-xl flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-400 block font-medium">Estimated Mod Package Price:</span>
                <span className="text-2xl font-black text-amber-400">
                  ₹{totalModPriceINR.toLocaleString('en-IN')}
                </span>
              </div>
              <button
                onClick={handleBookBuild}
                className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-slate-950 font-black text-xs px-5 py-3 rounded-xl shadow-lg shadow-amber-500/20 transition-all cursor-pointer flex items-center gap-1.5"
              >
                <ShoppingBag className="w-4 h-4 text-slate-950" />
                <span>Book This Build Package</span>
              </button>
            </div>

          </div>

          {/* Customization Options Controls (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* 1. Vinyl Wrap Color Options */}
            <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
              <div className="flex items-center justify-between mb-3">
                <label className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                  1. Premium Vinyl Wrap Finish
                </label>
                <span className="text-xs text-slate-400">Included (₹38,000)</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {currentModel.wrapColors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setWrapColor(color)}
                    className={`flex items-center gap-2 p-2 rounded-xl border text-xs font-medium transition-all text-left cursor-pointer ${
                      wrapColor.name === color.name
                        ? 'bg-slate-800 border-amber-500 text-amber-300 font-bold'
                        : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <span
                      className="w-4 h-4 rounded-full border border-white/20 flex-shrink-0"
                      style={{ backgroundColor: color.hex }}
                    ></span>
                    <span className="truncate">{color.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Forged Alloy Rims Options */}
            <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
              <label className="text-xs font-bold text-amber-400 uppercase tracking-wider block mb-3">
                2. Alloy Wheels & Offroad Rims
              </label>
              <div className="space-y-2">
                {[
                  { name: 'Stock Factory Rims', price: 0 },
                  { name: '17" Custom Offroad Beadlock Alloys (Set of 4)', price: 48000 },
                  { name: '18" Lightweight Forged Concave Rims (Set of 4)', price: 58000 }
                ].map((item) => (
                  <button
                    key={item.name}
                    onClick={() => { setAlloyStyle(item.name); setAlloyPriceINR(item.price); }}
                    className={`w-full flex items-center justify-between p-2.5 rounded-xl border text-xs font-medium transition-all cursor-pointer ${
                      alloyStyle === item.name
                        ? 'bg-slate-800 border-amber-500 text-amber-300 font-bold'
                        : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <span>{item.name}</span>
                    <span className="text-amber-400 font-bold">
                      {item.price === 0 ? 'Included' : `+₹${item.price.toLocaleString('en-IN')}`}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Exhaust System Options */}
            <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
              <label className="text-xs font-bold text-amber-400 uppercase tracking-wider block mb-3">
                3. Performance Exhaust & Sound
              </label>
              <div className="space-y-2">
                {[
                  { name: 'Stock Factory Exhaust', price: 0 },
                  { name: 'Valvetronic Dual Sound Exhaust (Remote Control)', price: 32000 },
                  { name: 'Quad Tip Carbon Fiber Performance Exhaust', price: 38000 }
                ].map((item) => (
                  <button
                    key={item.name}
                    onClick={() => { setExhaust(item.name); setExhaustPriceINR(item.price); }}
                    className={`w-full flex items-center justify-between p-2.5 rounded-xl border text-xs font-medium transition-all cursor-pointer ${
                      exhaust === item.name
                        ? 'bg-slate-800 border-amber-500 text-amber-300 font-bold'
                        : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <span>{item.name}</span>
                    <span className="text-amber-400 font-bold">
                      {item.price === 0 ? 'Included' : `+₹${item.price.toLocaleString('en-IN')}`}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* 4. Stage 1 Remap Toggle */}
            <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl flex items-center justify-between">
              <div>
                <div className="flex items-center gap-1.5 text-xs font-bold text-amber-400 uppercase tracking-wider">
                  <Zap className="w-4 h-4 text-amber-400" />
                  <span>Stage 1 Custom ECU Remap</span>
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  Safely unlocks +30 HP & +50 Nm Torque with zero engine strain.
                </p>
              </div>
              <button
                onClick={() => setStage1Remap(!stage1Remap)}
                className={`px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
                  stage1Remap
                    ? 'bg-amber-500 text-slate-950'
                    : 'bg-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                {stage1Remap ? 'Added (+₹24,000)' : '+ Add (₹24,000)'}
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
