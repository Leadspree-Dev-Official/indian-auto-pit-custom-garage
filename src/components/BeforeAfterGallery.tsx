import React from 'react';
import { TRANSFORMATION_STORIES } from '../data/services';
import { Sparkles, MapPin, Clock, CheckCircle2, Star, ShieldCheck } from 'lucide-react';

export const BeforeAfterGallery: React.FC = () => {
  return (
    <section className="py-16 bg-slate-950 text-white border-b border-amber-500/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <span className="bg-amber-500/10 text-amber-400 border border-amber-500/30 text-xs px-3 py-1 rounded-full font-bold uppercase tracking-widest">
            Hall of Transformations
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-white mt-3">
            Real Customer Car Builds & Detailing Results
          </h2>
          <p className="mt-2 text-sm text-slate-400">
            Check out real transformations crafted in our Pitstop Garages across Mumbai, Delhi NCR, Bengaluru, and Pune.
          </p>
        </div>

        {/* Stories Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          {TRANSFORMATION_STORIES.map((story) => (
            <div
              key={story.id}
              className="bg-slate-900 border border-slate-800 hover:border-amber-500/50 rounded-2xl overflow-hidden transition-all shadow-xl group flex flex-col justify-between"
            >
              <div>
                {/* Image Showcase Container */}
                <div className="relative aspect-video w-full overflow-hidden bg-slate-950">
                  <img
                    src={story.afterImg}
                    alt={story.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-md border border-amber-500/40 text-amber-300 text-[10px] px-2.5 py-1 rounded font-bold uppercase">
                    Custom Build Result
                  </div>
                  <div className="absolute bottom-3 right-3 bg-black/80 backdrop-blur-md text-white text-[10px] px-2.5 py-1 rounded font-bold flex items-center gap-1">
                    <Clock className="w-3 h-3 text-amber-400" />
                    <span>Time: {story.timeTaken}</span>
                  </div>
                </div>

                {/* Content Details */}
                <div className="p-6">
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                    <span className="flex items-center gap-1 font-semibold text-amber-400">
                      <MapPin className="w-3.5 h-3.5" />
                      {story.location}
                    </span>
                    <span>Owner: <strong>{story.owner}</strong></span>
                  </div>

                  <h3 className="text-xl font-black text-white group-hover:text-amber-300 transition-colors">
                    {story.title}
                  </h3>

                  <p className="text-xs text-slate-300 mt-2 line-clamp-3 leading-relaxed">
                    "{story.summary}"
                  </p>

                  {/* Mods Tags */}
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {story.modList.map((mod, idx) => (
                      <span
                        key={idx}
                        className="bg-slate-950 border border-slate-800 text-slate-300 text-[10px] px-2 py-0.5 rounded font-medium"
                      >
                        {mod}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Footer */}
              <div className="p-6 pt-0 border-t border-slate-800/80 mt-4 flex items-center justify-between">
                <div className="text-xs text-slate-400">Total Investment:</div>
                <div className="text-lg font-black text-amber-400">
                  ₹{story.costINR.toLocaleString('en-IN')}
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
