import React, { useState } from 'react';
import { Activity, AlertTriangle, Wrench, ShieldAlert, CheckCircle2, Sparkles, Loader2, ArrowRight } from 'lucide-react';
import { DiagnosticResult } from '../types';

interface AIDiagnosticsProps {
  onOpenBookingWithService: (serviceName: string, estimatedPriceINR: number) => void;
}

export const AIDiagnostics: React.FC<AIDiagnosticsProps> = ({ onOpenBookingWithService }) => {
  const [carBrand, setCarBrand] = useState('Mahindra');
  const [carModel, setCarModel] = useState('Thar');
  const [fuelType, setFuelType] = useState('Diesel');
  const [odometer, setOdometer] = useState('28500');
  const [symptoms, setSymptoms] = useState('');
  const [loading, setLoading] = useState(false);
  const [diagnosticResult, setDiagnosticResult] = useState<DiagnosticResult | null>(null);

  const sampleSymptoms = [
    'Squeaking metallic noise when applying brakes at low speeds',
    'Engine temperature indicator rising during heavy traffic stop-and-go in summer',
    'Steering wheel shuddering/vibrating above 80 km/h on highway',
    'AC blowing warm air when idling, but cools slightly while driving'
  ];

  const handleRunDiagnosis = async (symptomText?: string) => {
    const textToSubmit = symptomText || symptoms;
    if (!textToSubmit.trim()) return;

    setLoading(true);
    setDiagnosticResult(null);

    try {
      const response = await fetch('/api/ai/diagnose', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          carBrand,
          carModel,
          fuelType,
          odometer,
          symptoms: textToSubmit
        })
      });

      const data = await response.json();
      if (data.diagnosis) {
        setDiagnosticResult(data);
      }
    } catch (err) {
      console.error('Diagnosis Error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="ai-diagnostics" className="py-16 bg-slate-950 text-white border-b border-amber-500/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <span className="bg-amber-500/10 text-amber-400 border border-amber-500/30 text-xs px-3 py-1 rounded-full font-bold uppercase tracking-widest flex items-center justify-center gap-1.5 w-max mx-auto">
            <Activity className="w-3.5 h-3.5 text-amber-400" />
            AI Pitmaster Fault Finder
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-white mt-3">
            AI-Powered Car Diagnostic & Repair Estimator
          </h2>
          <p className="mt-2 text-sm text-slate-400">
            Describe any sound, vibration, warning light, or performance drop. Gemini AI evaluates root causes tailored for Indian monsoon & pothole driving conditions.
          </p>
        </div>

        {/* Input & Diagnostic Form */}
        <div className="mt-10 bg-slate-900 border border-slate-800 rounded-2xl p-6 lg:p-8 max-w-4xl mx-auto shadow-2xl">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            <div>
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">Car Brand</label>
              <input
                type="text"
                value={carBrand}
                onChange={(e) => setCarBrand(e.target.value)}
                placeholder="e.g. Mahindra / Tata"
                className="w-full bg-slate-950 border border-slate-800 focus:border-amber-500 rounded-xl px-3 py-2 text-xs text-white outline-none"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">Car Model</label>
              <input
                type="text"
                value={carModel}
                onChange={(e) => setCarModel(e.target.value)}
                placeholder="e.g. Thar / Virtus"
                className="w-full bg-slate-950 border border-slate-800 focus:border-amber-500 rounded-xl px-3 py-2 text-xs text-white outline-none"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">Fuel Type</label>
              <select
                value={fuelType}
                onChange={(e) => setFuelType(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 focus:border-amber-500 rounded-xl px-3 py-2 text-xs text-white outline-none"
              >
                <option value="Petrol">Petrol</option>
                <option value="Diesel">Diesel</option>
                <option value="CNG">CNG</option>
                <option value="Electric">Electric (EV)</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">Odometer (KM)</label>
              <input
                type="text"
                value={odometer}
                onChange={(e) => setOdometer(e.target.value)}
                placeholder="e.g. 35000"
                className="w-full bg-slate-950 border border-slate-800 focus:border-amber-500 rounded-xl px-3 py-2 text-xs text-white outline-none"
              />
            </div>
          </div>

          {/* Symptoms Input */}
          <div className="mb-4">
            <label className="text-xs font-bold text-amber-400 uppercase tracking-wider block mb-1">
              Describe Issue / Odd Sounds / Symptoms:
            </label>
            <textarea
              rows={3}
              value={symptoms}
              onChange={(e) => setSymptoms(e.target.value)}
              placeholder="e.g. Metallic squeaking when pressing brake pedal, or thudding sound from front right suspension when hitting potholes..."
              className="w-full bg-slate-950 border border-slate-800 focus:border-amber-500 rounded-xl p-3 text-xs text-white placeholder-slate-500 outline-none transition-all resize-none"
            ></textarea>
          </div>

          {/* Sample Prompts Chips */}
          <div className="mb-6">
            <span className="text-[11px] font-bold text-slate-400 block mb-2">Or click a sample symptom:</span>
            <div className="flex flex-wrap gap-2">
              {sampleSymptoms.map((sample, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setSymptoms(sample);
                    handleRunDiagnosis(sample);
                  }}
                  className="bg-slate-950 border border-slate-800 hover:border-amber-500/50 text-slate-300 text-[11px] px-3 py-1.5 rounded-lg transition-all text-left cursor-pointer"
                >
                  "{sample}"
                </button>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <button
            onClick={() => handleRunDiagnosis()}
            disabled={loading || !symptoms.trim()}
            className="w-full bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-400 hover:to-orange-500 text-slate-950 font-black text-sm py-3.5 rounded-xl shadow-xl shadow-amber-500/20 transition-all cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 text-slate-950 animate-spin" />
                <span>AI Master Mechanic Inspecting Issue...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-slate-950" />
                <span>Run AI Diagnostic Inspection</span>
              </>
            )}
          </button>

        </div>

        {/* AI Diagnostic Output Card */}
        {diagnosticResult && (
          <div className="mt-8 bg-slate-900 border border-amber-500/40 rounded-2xl p-6 lg:p-8 max-w-4xl mx-auto shadow-2xl relative overflow-hidden">
            
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between border-b border-slate-800 pb-4 mb-6 gap-4">
              <div>
                <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest bg-amber-500/10 border border-amber-500/30 px-2.5 py-0.5 rounded">
                  AI Diagnostic Report
                </span>
                <h3 className="text-xl font-black text-white mt-1">
                  Fault Diagnosis for {carBrand} {carModel}
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400">Urgency:</span>
                <span className={`text-xs font-black uppercase px-2.5 py-1 rounded-md border ${
                  diagnosticResult.urgencyLevel === 'Critical' || diagnosticResult.urgencyLevel === 'High'
                    ? 'bg-red-500/20 text-red-400 border-red-500/40'
                    : 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                }`}>
                  {diagnosticResult.urgencyLevel}
                </span>
              </div>
            </div>

            <div className="space-y-6 text-sm">
              
              {/* Summary */}
              <div>
                <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-1">Diagnosis Summary</h4>
                <p className="text-slate-200 leading-relaxed bg-slate-950 p-3.5 rounded-xl border border-slate-800">
                  {diagnosticResult.diagnosis}
                </p>
              </div>

              {/* Causes & Affected Parts */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                  <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-2">Possible Causes</h4>
                  <ul className="space-y-1.5 text-xs text-slate-300">
                    {diagnosticResult.possibleCauses?.map((cause, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <AlertTriangle className="w-3.5 h-3.5 text-amber-400 mt-0.5 flex-shrink-0" />
                        <span>{cause}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                  <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-2">Affected Components</h4>
                  <ul className="space-y-1.5 text-xs text-slate-300">
                    {diagnosticResult.affectedParts?.map((part, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Wrench className="w-3.5 h-3.5 text-amber-400 mt-0.5 flex-shrink-0" />
                        <span>{part}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Cost & Driving Advice */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-slate-950 p-4 rounded-xl border border-amber-500/30">
                  <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-1">Estimated Repair Cost in INR</h4>
                  <div className="text-2xl font-black text-amber-300 mt-1">
                    {diagnosticResult.estimatedCostINR?.formatted || `₹${diagnosticResult.estimatedCostMinINR?.toLocaleString('en-IN')} - ₹${diagnosticResult.estimatedCostMaxINR?.toLocaleString('en-IN')}`}
                  </div>
                  <span className="text-[10px] text-slate-400 block mt-1">Includes OEM parts & labor at PitStop Garage</span>
                </div>

                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                  <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-1">Road & Driving Safety Advice</h4>
                  <p className="text-xs text-slate-300 leading-relaxed mt-1">
                    {diagnosticResult.drivingAdvice}
                  </p>
                </div>
              </div>

              {/* Booking CTA */}
              <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-xs text-slate-400">
                  Recommended Service: <strong className="text-white">{diagnosticResult.recommendedServices?.[0] || 'Overhaul Service'}</strong>
                </div>
                <button
                  onClick={() => onOpenBookingWithService(
                    `${carBrand} ${carModel} - ${diagnosticResult.recommendedServices?.[0] || 'Repair Inspection'}`,
                    diagnosticResult.estimatedCostMinINR || 3500
                  )}
                  className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs px-6 py-3 rounded-xl transition-all cursor-pointer flex items-center gap-2"
                >
                  <span>Book Pitstop Diagnostic Inspection</span>
                  <ArrowRight className="w-4 h-4 text-slate-950" />
                </button>
              </div>

            </div>

          </div>
        )}

      </div>
    </section>
  );
};
