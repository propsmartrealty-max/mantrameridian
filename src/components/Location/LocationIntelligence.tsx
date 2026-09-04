import { useState } from 'react';
import { locationCategories, locationDestinations, lifestyleTimeline, type LocationDestination } from '../../data/location';
import { Navigation, Clock, ShieldCheck, ArrowRight } from 'lucide-react';

export default function LocationIntelligence() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedDestId, setSelectedDestId] = useState<string>(locationDestinations[0].id);
  const [activeTab, setActiveTab] = useState<'map' | 'lifestyle'>('map');

  const selectedDestination: LocationDestination = 
    locationDestinations.find(d => d.id === selectedDestId) || locationDestinations[0];

  const filteredDestinations = selectedCategory === 'all'
    ? locationDestinations
    : locationDestinations.filter(d => d.category === selectedCategory);

  const handleOpenConcierge = () => {
    window.dispatchEvent(
      new CustomEvent('open-private-presentation', {
        detail: { config: 'Location Intelligence', intent: 'LOCATION & CONNECTIVITY' }
      })
    );
  };

  return (
    <div className="w-full bg-obsidian border border-white/10 overflow-hidden">
      
      {/* View Mode Toggle & Category Filters */}
      <div className="border-b border-white/10 p-4 md:p-6 bg-obsidian-deep/80 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        
        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveTab('map')}
            className={`px-4 py-2 text-xs uppercase tracking-wider transition-colors border ${
              activeTab === 'map'
                ? 'bg-champagne text-obsidian border-champagne font-semibold'
                : 'bg-obsidian-card text-concrete border-white/10 hover:text-white'
            }`}
          >
            Location Intelligence Map
          </button>
          <button
            onClick={() => setActiveTab('lifestyle')}
            className={`px-4 py-2 text-xs uppercase tracking-wider transition-colors border ${
              activeTab === 'lifestyle'
                ? 'bg-champagne text-obsidian border-champagne font-semibold'
                : 'bg-obsidian-card text-concrete border-white/10 hover:text-white'
            }`}
          >
            A Day at Meridian (Lifestyle)
          </button>
        </div>

        {/* Categories (active only in map mode) */}
        {activeTab === 'map' && (
          <div className="flex flex-wrap gap-1.5">
            {locationCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 text-[11px] uppercase tracking-wider transition-all border ${
                  selectedCategory === cat.id
                    ? 'border-champagne/60 text-champagne bg-champagne/10'
                    : 'border-white/5 text-concrete/70 hover:border-white/20 hover:text-concrete'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        )}

      </div>

      {activeTab === 'map' ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[560px]">
          
          {/* Dark Schematic Radar Map (Cols 1-7) */}
          <div className="lg:col-span-7 p-6 md:p-8 bg-[#090a09] relative flex flex-col items-center justify-center border-b lg:border-b-0 lg:border-r border-white/10">
            
            {/* Compass / Watermark */}
            <div className="absolute top-6 left-6 text-[10px] text-concrete/50 font-mono tracking-widest uppercase">
              WEST PUNE METROPOLITAN RADAR (BALEWADI • BANER • HINJEWADI)
            </div>

            {/* SVG Schematic Map Canvas */}
            <div className="w-full max-w-lg aspect-square relative select-none my-4">
              <svg viewBox="0 0 400 400" className="w-full h-full">
                <defs>
                  {/* Concentric distance circles */}
                  <linearGradient id="meridianGlow" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#C8B89F" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#938166" stopOpacity="0.2" />
                  </linearGradient>
                </defs>

                {/* Concentric rings: 2km, 5km, 8km */}
                <circle cx="200" cy="200" r="60" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1" strokeDasharray="3 3" />
                <circle cx="200" cy="200" r="120" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1" strokeDasharray="3 3" />
                <circle cx="200" cy="200" r="170" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1" strokeDasharray="3 3" />

                <text x="200" y="135" fill="rgba(255,255,255,0.15)" fontSize="8" textAnchor="middle" fontFamily="monospace">2 KM RADIUS</text>
                <text x="200" y="75" fill="rgba(255,255,255,0.15)" fontSize="8" textAnchor="middle" fontFamily="monospace">5 KM RADIUS</text>

                {/* River path (curves across upper part) */}
                <path
                  d="M 20,180 Q 150,150 200,200 T 380,210"
                  fill="none"
                  stroke="#1c373b"
                  strokeWidth="14"
                  opacity="0.6"
                />
                <path
                  d="M 20,180 Q 150,150 200,200 T 380,210"
                  fill="none"
                  stroke="#2d5258"
                  strokeWidth="2"
                  opacity="0.7"
                />
                <text x="70" y="165" fill="#3f6d73" fontSize="8" fontFamily="monospace">MULA RIVER</text>

                {/* Ray line from Meridian to selected destination */}
                {selectedDestination && (
                  <line
                    x1="200"
                    y1="200"
                    x2={selectedDestination.coordinates.relativeX * 3.8 + 10}
                    y2={selectedDestination.coordinates.relativeY * 3.8 + 10}
                    stroke="#C8B89F"
                    strokeWidth="1.5"
                    strokeDasharray="4 2"
                    className="animate-pulse"
                  />
                )}

                {/* Destination Nodes */}
                {filteredDestinations.map((dest) => {
                  const isSelected = dest.id === selectedDestId;
                  const posX = dest.coordinates.relativeX * 3.8 + 10;
                  const posY = dest.coordinates.relativeY * 3.8 + 10;

                  return (
                    <g
                      key={dest.id}
                      onClick={() => setSelectedDestId(dest.id)}
                      className="cursor-pointer transition-all duration-300"
                    >
                      {isSelected && (
                        <circle
                          cx={posX}
                          cy={posY}
                          r="14"
                          fill="none"
                          stroke="#C8B89F"
                          strokeWidth="1.5"
                          strokeDasharray="2 2"
                          className="animate-spin-slow"
                        />
                      )}
                      <circle
                        cx={posX}
                        cy={posY}
                        r={isSelected ? 6 : 4}
                        fill={isSelected ? '#C8B89F' : '#3d3d3a'}
                        stroke={isSelected ? '#FFFFFF' : '#686660'}
                        strokeWidth="1.5"
                      />
                      <text
                        x={posX}
                        y={posY - 9}
                        textAnchor="middle"
                        fill={isSelected ? '#F5F3EE' : '#88857d'}
                        fontSize="8"
                        fontWeight={isSelected ? 'bold' : 'normal'}
                        fontFamily="sans-serif"
                      >
                        {dest.name.split(' ')[0]}
                      </text>
                    </g>
                  );
                })}

                {/* Meridian Center Epicentre Pin */}
                <g className="cursor-default">
                  <circle cx="200" cy="200" r="18" fill="url(#meridianGlow)" opacity="0.4" className="animate-pulse" />
                  <circle cx="200" cy="200" r="7" fill="#C8B89F" stroke="#FFFFFF" strokeWidth="2" />
                  <text x="200" y="222" textAnchor="middle" fill="#C8B89F" fontSize="9" fontWeight="bold" fontFamily="monospace">
                    MERIDIAN
                  </text>
                </g>
              </svg>
            </div>

            <div className="text-[11px] text-concrete/50 font-mono tracking-widest text-center mt-2">
              CLICK ANY NODE TO REVEAL TRANSIT VECTORS &amp; DRIVE TIMES
            </div>
          </div>

          {/* Destination Details (Cols 8-12) */}
          <div className="lg:col-span-5 p-6 md:p-8 bg-obsidian-card flex flex-col justify-between">
            
            <div className="space-y-6">
              
              <div>
                <span className="label-architectural text-xs text-champagne">{selectedDestination.categoryLabel}</span>
                <h2 className="font-serif text-2xl md:text-3xl text-architectural-white mt-1">{selectedDestination.name}</h2>
              </div>

              {/* Transit Metrics Card */}
              <div className="grid grid-cols-2 gap-3 p-4 bg-obsidian-surface border border-champagne/25">
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-champagne shrink-0" />
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-concrete/70 block">Estimated Commute</span>
                    <span className="text-base font-semibold text-architectural-white">{selectedDestination.driveTimeMins}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Navigation className="w-5 h-5 text-champagne shrink-0" />
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-concrete/70 block">Radial Distance</span>
                    <span className="text-base font-semibold text-architectural-white">{selectedDestination.distanceKm}</span>
                  </div>
                </div>
              </div>

              <p className="text-xs text-concrete leading-relaxed">{selectedDestination.description}</p>

              {/* Quick Destination Switcher */}
              <div>
                <span className="text-[10px] uppercase tracking-widest text-concrete/70 block font-mono mb-2">Destinations In This Category</span>
                <div className="space-y-1.5 max-h-44 overflow-y-auto pr-1">
                  {filteredDestinations.map((dest) => (
                    <button
                      key={dest.id}
                      onClick={() => setSelectedDestId(dest.id)}
                      className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between border transition-all ${
                        selectedDestId === dest.id
                          ? 'border-champagne bg-champagne/10 text-architectural-white font-medium'
                          : 'border-white/5 bg-obsidian/40 text-concrete hover:border-white/20'
                      }`}
                    >
                      <span className="truncate pr-2">{dest.name}</span>
                      <span className="font-mono text-champagne shrink-0">{dest.driveTimeMins}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Verification watermark */}
              <div className="flex items-center gap-2 text-[10px] text-concrete/60 font-mono">
                <ShieldCheck className="w-3.5 h-3.5 text-champagne shrink-0" />
                <span>Source: {selectedDestination.verifiedSource} ({selectedDestination.lastUpdated})</span>
              </div>
            </div>

            {/* CTA */}
            <div className="pt-6 border-t border-white/10 mt-6 space-y-3">
              <a
                href="https://www.google.com/maps/dir/?api=1&destination=18.5839181,73.7747366"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full text-xs py-3 px-4 border border-champagne/40 bg-champagne/10 hover:bg-champagne/20 text-champagne font-mono flex items-center justify-center gap-2 transition-colors uppercase tracking-wider group"
              >
                <Navigation className="w-3.5 h-3.5 transition-transform group-hover:scale-110" />
                <span>Navigate via Google Maps</span>
              </a>

              <button
                onClick={handleOpenConcierge}
                className="btn-luxury w-full text-xs"
              >
                <span>REQUEST COMPLETE LOCATION DOSSIER</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>
      ) : (
        /* Lifestyle Timeline View */
        <div className="p-6 md:p-12 bg-obsidian-deep">
          <div className="max-w-3xl mx-auto space-y-8">
            <div>
              <span className="label-architectural text-xs text-champagne">LIFESTYLE PROPOSITION</span>
              <h2 className="font-serif text-3xl text-architectural-white mt-1">A Curated Day at Meridian</h2>
              <p className="text-xs text-concrete mt-2">Balewadi is not merely an address; it is a fluid rhythm of nature, executive productivity, and evening celebration.</p>
            </div>

            <div className="space-y-6">
              {lifestyleTimeline.map((item, index) => (
                <div key={index} className="p-6 bg-obsidian-card border border-white/10 hover:border-champagne/30 transition-all">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-3 mb-3">
                    <span className="font-serif text-xl text-architectural-white">{item.title}</span>
                    <span className="text-xs font-mono text-champagne px-2.5 py-1 bg-obsidian border border-champagne/20">{item.time}</span>
                  </div>
                  <p className="text-xs text-concrete leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
