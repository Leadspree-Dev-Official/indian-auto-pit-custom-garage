import React, { useState } from 'react';
import { ALL_SERVICES } from '../data/services';
import { ServiceItem, ServiceCategory } from '../types';
import { Wrench, Sparkles, Sliders, Search, Check, Plus, Clock, ShieldCheck, Award, Zap, ChevronRight, Info } from 'lucide-react';

interface ServicesSectionProps {
  selectedServices: ServiceItem[];
  onToggleService: (service: ServiceItem) => void;
  onOpenBooking: () => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  selectedServices,
  onToggleService,
  onOpenBooking
}) => {
  const [activeTab, setActiveTab] = useState<ServiceCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedServiceDetail, setSelectedServiceDetail] = useState<ServiceItem | null>(null);

  const filteredServices = ALL_SERVICES.filter((item) => {
    const matchesTab = activeTab === 'all' || item.category === activeTab;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.features.some(f => f.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesTab && matchesSearch;
  });

  const isSelected = (id: string) => selectedServices.some(s => s.id === id);

  return (
    <section id="services-section" className="py-16 bg-slate-950 text-white border-b border-amber-500/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <span className="bg-amber-500/10 text-amber-400 border border-amber-500/30 text-xs px-3 py-1 rounded-full font-bold uppercase tracking-widest">
            Indian Pitstop Catalog
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-white mt-3">
            Car Washing, Repairs & Modification Packages
          </h2>
          <p className="mt-2 text-sm text-slate-400">
            Pick individual services or build your custom Pitstop Package. All services backed by official PitStop warranty and performed by master mechanics.
          </p>
        </div>

        {/* Filter Controls & Search */}
        <div className="mt-10 flex flex-col md:flex-row items-center justify-between gap-4 bg-slate-900/90 border border-slate-800 p-3 rounded-2xl">
          
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto scrollbar-none">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                activeTab === 'all'
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              All Pit Packages ({ALL_SERVICES.length})
            </button>
            <button
              onClick={() => setActiveTab('washing')}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                activeTab === 'washing'
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Washing & Detailing</span>
            </button>
            <button
              onClick={() => setActiveTab('repair')}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                activeTab === 'repair'
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Wrench className="w-3.5 h-3.5 text-amber-400" />
              <span>Mechanics & Repairs</span>
            </button>
            <button
              onClick={() => setActiveTab('modification')}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                activeTab === 'modification'
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Sliders className="w-3.5 h-3.5 text-amber-400" />
              <span>Custom Modifications</span>
            </button>
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search service (e.g. PPF, Oil, Wrap)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 focus:border-amber-500 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 outline-none transition-all"
            />
          </div>

        </div>

        {/* Selected Services Counter Bar */}
        {selectedServices.length > 0 && (
          <div className="mt-6 bg-gradient-to-r from-amber-500/20 via-orange-500/20 to-amber-500/20 border border-amber-500/40 p-4 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 backdrop-blur-md">
            <div>
              <span className="text-xs text-amber-300 font-bold uppercase tracking-wider">Custom Pit Package Built:</span>
              <div className="text-lg font-black text-white mt-0.5">
                {selectedServices.length} Service{selectedServices.length > 1 ? 's' : ''} Selected • Total:{' '}
                <span className="text-amber-400">
                  ₹{selectedServices.reduce((sum, s) => sum + s.priceINR, 0).toLocaleString('en-IN')}
                </span>
              </div>
            </div>
            <button
              onClick={onOpenBooking}
              className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs px-5 py-2.5 rounded-xl shadow-lg shadow-amber-500/30 transition-all cursor-pointer whitespace-nowrap"
            >
              Proceed to Book Time Slot →
            </button>
          </div>
        )}

        {/* Service Cards Grid */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => {
            const active = isSelected(service.id);
            return (
              <div
                key={service.id}
                className={`relative flex flex-col justify-between bg-slate-900/90 border rounded-2xl p-6 transition-all hover:bg-slate-900 ${
                  active ? 'border-amber-500 bg-slate-900 ring-2 ring-amber-500/30' : 'border-slate-800 hover:border-slate-700'
                }`}
              >
                <div>
                  {/* Badge & Category Header */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-bold tracking-widest text-slate-400 uppercase flex items-center gap-1">
                      {service.category === 'washing' && <Sparkles className="w-3 h-3 text-amber-400" />}
                      {service.category === 'repair' && <Wrench className="w-3 h-3 text-amber-400" />}
                      {service.category === 'modification' && <Sliders className="w-3 h-3 text-amber-400" />}
                      {service.category}
                    </span>
                    {service.badge && (
                      <span className="bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[10px] px-2 py-0.5 rounded font-bold uppercase tracking-wider">
                        {service.badge}
                      </span>
                    )}
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-lg font-extrabold text-white leading-snug">
                    {service.name}
                  </h3>
                  <p className="text-xs text-slate-400 mt-2 line-clamp-2">
                    {service.description}
                  </p>

                  {/* Features List */}
                  <div className="mt-4 space-y-1.5">
                    {service.features.slice(0, 3).map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                        <Check className="w-3.5 h-3.5 text-amber-400 mt-0.5 flex-shrink-0" />
                        <span className="line-clamp-1">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer Price & Add Button */}
                <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between">
                  <div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-xl font-black text-amber-400">
                        ₹{service.priceINR.toLocaleString('en-IN')}
                      </span>
                      {service.originalPriceINR && (
                        <span className="text-xs text-slate-500 line-through">
                          ₹{service.originalPriceINR.toLocaleString('en-IN')}
                        </span>
                      )}
                    </div>
                    <div className="text-[10px] text-slate-400 flex items-center gap-1 mt-0.5">
                      <Clock className="w-3 h-3 text-amber-400" />
                      <span>{service.duration}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setSelectedServiceDetail(service)}
                      className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
                      title="View Full Details"
                    >
                      <Info className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => onToggleService(service)}
                      className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        active
                          ? 'bg-amber-500 text-slate-950 font-black'
                          : 'bg-slate-800 hover:bg-amber-500/20 hover:text-amber-300 text-white border border-slate-700'
                      }`}
                    >
                      {active ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Added</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-3.5 h-3.5" />
                          <span>Add to Package</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {filteredServices.length === 0 && (
          <div className="text-center py-12 bg-slate-900/50 rounded-2xl border border-slate-800">
            <p className="text-slate-400 text-sm">No services found matching "{searchQuery}".</p>
            <button
              onClick={() => { setActiveTab('all'); setSearchQuery(''); }}
              className="mt-3 text-xs text-amber-400 hover:underline font-bold"
            >
              Clear filters
            </button>
          </div>
        )}

      </div>

      {/* Service Detail Modal */}
      {selectedServiceDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-lg w-full p-6 text-white shadow-2xl relative">
            <button
              onClick={() => setSelectedServiceDetail(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-1"
            >
              ✕
            </button>
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-amber-500/20 text-amber-300 text-[10px] px-2 py-0.5 rounded font-bold uppercase">
                {selectedServiceDetail.category}
              </span>
              {selectedServiceDetail.badge && (
                <span className="bg-slate-800 text-slate-300 text-[10px] px-2 py-0.5 rounded font-bold">
                  {selectedServiceDetail.badge}
                </span>
              )}
            </div>
            <h3 className="text-2xl font-black text-white">{selectedServiceDetail.name}</h3>
            <p className="text-xs text-slate-300 mt-2">{selectedServiceDetail.description}</p>
            
            <div className="mt-4 bg-slate-950 border border-slate-800 p-4 rounded-xl space-y-2">
              <div className="text-xs font-bold text-amber-400 uppercase tracking-wider">Package Checklist:</div>
              {selectedServiceDetail.features.map((f, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs text-slate-200">
                  <Check className="w-3.5 h-3.5 text-amber-400" />
                  <span>{f}</span>
                </div>
              ))}
            </div>

            <div className="mt-6 flex items-center justify-between pt-4 border-t border-slate-800">
              <div>
                <span className="text-2xl font-black text-amber-400">
                  ₹{selectedServiceDetail.priceINR.toLocaleString('en-IN')}
                </span>
                <span className="text-xs text-slate-400 block">Est. Duration: {selectedServiceDetail.duration}</span>
              </div>
              <button
                onClick={() => {
                  onToggleService(selectedServiceDetail);
                  setSelectedServiceDetail(null);
                }}
                className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs px-5 py-2.5 rounded-xl cursor-pointer"
              >
                {isSelected(selectedServiceDetail.id) ? 'Remove from Package' : 'Add to Package'}
              </button>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};
