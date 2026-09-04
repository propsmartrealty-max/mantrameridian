import { useState } from 'react';
import { masterplanZones, type MasterplanZone } from '../../data/masterplan';
import { ArrowUpRight } from 'lucide-react';

export default function MasterplanExplorer() {
  const [selectedZoneId, setSelectedZoneId] = useState<string>(masterplanZones[0].id);
  const [activeFilter, setActiveFilter] = useState<'all' | 'residential' | 'amenity' | 'landscape' | 'access'>('all');

  const selectedZone: MasterplanZone = masterplanZones.find(z => z.id === selectedZoneId) || masterplanZones[0];

  const handleOpenConcierge = (intent = 'MASTERPLAN EXPLORATION') => {
    window.dispatchEvent(
      new CustomEvent('open-private-presentation', {
        detail: { config: selectedZone.name, intent }
      })
    );
  };

  return (
    <div className="w-full bg-obsidian border border-white/10 rounded-none overflow-hidden">
      
      {/* Top Filter Bar */}
      <div className="border-b border-white/10 p-4 md:p-6 bg-obsidian-deep/80 flex flex-col md:flex-row md:items-center justify-between gap-4">
        
        <div>
          <span className="label-architectural text-xs text-champagne">8-ACRE RIVERSIDE ESTATE</span>
          <h2 className="font-serif text-2xl text-architectural-white mt-1">Interactive Masterplan</h2>
        </div>

        {/* Filter Badges */}
        <div className="flex flex-wrap gap-2">
          {(['all', 'residential', 'amenity', 'landscape', 'access'] as const).map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-3.5 py-1.5 text-xs uppercase tracking-wider transition-all border ${
                activeFilter === filter
                  ? 'bg-champagne text-obsidian border-champagne font-semibold shadow-glow'
                  : 'bg-obsidian-card text-concrete border-white/10 hover:border-white/30 hover:text-architectural-white'
              }`}
            >
              {filter === 'all' ? 'All Zones' : filter}
            </button>
          ))}
        </div>
      </div>

      {/* Main Masterplan Canvas Split View */}
      <div className="grid grid-cols-1 lg:grid-cols-12">
        
        {/* SVG Masterplan Blueprint Canvas (Cols 1-8) */}
        <div className="lg:col-span-8 p-6 md:p-10 bg-[#090b09] relative flex flex-col items-center justify-center min-h-[460px] md:min-h-[560px] border-b lg:border-b-0 lg:border-r border-white/10">
          
          {/* River Buffer Direction Indicator at Top */}
          <div className="w-full max-w-2xl bg-gradient-to-r from-blue-950/30 via-emerald-950/40 to-blue-950/30 border border-champagne/20 py-2.5 px-4 mb-4 flex items-center justify-between text-xs text-champagne tracking-widest font-mono">
            <span>← FLOW OF MULA RIVER &amp; PERMANENT RIPARIAN GREEN BUFFER →</span>
            <span className="hidden sm:inline-block text-concrete/60">NORTH ELEVATION</span>
          </div>

          {/* SVG Map Layout */}
          <div className="w-full max-w-2xl aspect-[16/10] relative select-none">
            <svg
              viewBox="0 0 700 440"
              className="w-full h-full filter drop-shadow-[0_20px_40px_rgba(0,0,0,0.9)]"
            >
              <defs>
                {/* Masterplan Grass Texture */}
                <pattern id="lawn" width="30" height="30" patternUnits="userSpaceOnUse">
                  <rect width="30" height="30" fill="#131713" />
                  <circle cx="15" cy="15" r="1.5" fill="#1f281f" />
                </pattern>
                <linearGradient id="riverGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#12252a" />
                  <stop offset="50%" stopColor="#1a343b" />
                  <stop offset="100%" stopColor="#12252a" />
                </linearGradient>
              </defs>

              {/* Estate Perimeter / Ground */}
              <polygon
                points="40,120 660,120 660,400 40,400"
                fill="url(#lawn)"
                stroke="#2a3328"
                strokeWidth="2"
              />

              {/* Water Edge on Top */}
              <rect x="40" y="30" width="620" height="80" fill="url(#riverGrad)" opacity="0.8" />
              <text x="350" y="75" fill="#7ba3a8" fontSize="11" letterSpacing="4" textAnchor="middle" fontFamily="monospace">
                MULA RIVER CORRIDOR
              </text>

              {/* 500m Boardwalk Strip */}
              <rect x="40" y="110" width="620" height="15" fill="#3d372e" stroke="#665b4c" strokeWidth="1" />
              <text x="350" y="121" fill="#C8B89F" fontSize="8" letterSpacing="3" textAnchor="middle" fontFamily="monospace">
                500-METRE RIVERFRONT PROMENADE
              </text>

              {/* Internal Boulevards & Courtyards */}
              <circle cx="350" cy="270" r="110" fill="#101410" stroke="#252d24" strokeWidth="2" />
              <line x1="40" y1="360" x2="660" y2="360" stroke="#2a2926" strokeWidth="6" strokeDasharray="10 6" />

              {/* Masterplan Hotspot Pins */}
              {masterplanZones.map((zone) => {
                const isSelected = zone.id === selectedZoneId;
                const isDimmed = activeFilter !== 'all' && zone.category !== activeFilter;

                let fillColor = '#C8B89F';
                if (zone.category === 'residential') fillColor = '#E6DCBA';
                if (zone.category === 'amenity') fillColor = '#938166';
                if (zone.category === 'landscape') fillColor = '#4A6245';
                if (zone.category === 'access') fillColor = '#B8B4AA';

                return (
                  <g
                    key={zone.id}
                    onClick={() => setSelectedZoneId(zone.id)}
                    className={`cursor-pointer transition-all duration-300 ${
                      isDimmed ? 'opacity-20 pointer-events-none' : 'opacity-100'
                    }`}
                  >
                    {/* Pulsing ring on selected */}
                    {isSelected && (
                      <circle
                        cx={zone.coordinates.cx}
                        cy={zone.coordinates.cy}
                        r={zone.coordinates.r + 10}
                        fill="none"
                        stroke="#C8B89F"
                        strokeWidth="1.5"
                        strokeDasharray="4 3"
                        className="animate-spin-slow"
                      />
                    )}

                    {/* Base circle node */}
                    <circle
                      cx={zone.coordinates.cx}
                      cy={zone.coordinates.cy}
                      r={zone.coordinates.r}
                      fill={isSelected ? '#C8B89F' : '#1b1c1b'}
                      stroke={fillColor}
                      strokeWidth={isSelected ? '3' : '1.5'}
                      className="transition-all hover:scale-110"
                    />

                    {/* Zone Node Abbreviation */}
                    <text
                      x={zone.coordinates.cx}
                      y={zone.coordinates.cy + 4}
                      textAnchor="middle"
                      fill={isSelected ? '#0A0A0A' : '#F5F3EE'}
                      fontSize="10"
                      fontWeight="bold"
                      fontFamily="monospace"
                      className="pointer-events-none"
                    >
                      {zone.name.includes('Tower A') ? 'T-A' :
                       zone.name.includes('Tower B') ? 'T-B' :
                       zone.name.includes('Tower C') ? 'T-C' :
                       zone.name.includes('Tower D') ? 'T-D' :
                       zone.name.includes('Pavilion') ? 'CLUB' :
                       zone.name.includes('Boardwalk') ? 'RIVER' :
                       zone.name.includes('Sports') ? 'SPORT' : 'GATE'}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          <div className="text-concrete/50 text-[11px] font-mono tracking-widest mt-4">
            CLICK ON ANY TOWER OR AMENITY NODE TO INSPECT ARCHITECTURAL ZONING
          </div>
        </div>

        {/* Zone Details Panel (Cols 9-12) */}
        <div className="lg:col-span-4 p-6 md:p-8 bg-obsidian-card flex flex-col justify-between">
          
          <div className="space-y-6">
            
            <div>
              <span className="label-architectural text-xs text-champagne">{selectedZone.category.toUpperCase()} ZONE</span>
              <h3 className="font-serif text-2xl text-architectural-white mt-1">{selectedZone.name}</h3>
              <p className="text-xs text-champagne font-mono mt-1">{selectedZone.tagline}</p>
            </div>

            <p className="text-xs text-concrete leading-relaxed">{selectedZone.description}</p>

            {/* Zone highlights list */}
            <div className="space-y-2">
              <span className="text-[10px] uppercase tracking-widest text-concrete/70 block font-mono">Zone Attributes</span>
              <div className="space-y-2">
                {selectedZone.highlights.map((h, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-concrete">
                    <div className="w-1.5 h-1.5 rounded-full bg-champagne mt-1.5 shrink-0" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Metadata specs */}
            <div className="p-4 bg-obsidian-surface border border-white/10 space-y-2 text-xs">
              {selectedZone.details.availableUnits && (
                <div className="flex justify-between">
                  <span className="text-concrete/70">Configuration:</span>
                  <span className="text-architectural-white font-medium">{selectedZone.details.availableUnits}</span>
                </div>
              )}
              {selectedZone.details.views && (
                <div className="flex justify-between">
                  <span className="text-concrete/70">View Horizon:</span>
                  <span className="text-champagne font-medium">{selectedZone.details.views}</span>
                </div>
              )}
              {selectedZone.details.levels && (
                <div className="flex justify-between">
                  <span className="text-concrete/70">Elevation:</span>
                  <span className="text-architectural-white font-medium">{selectedZone.details.levels}</span>
                </div>
              )}
            </div>

          </div>

          {/* CTAs */}
          <div className="pt-6 border-t border-white/10 mt-6 space-y-2.5">
            <button
              onClick={() => handleOpenConcierge(`INSPECT ${selectedZone.name.toUpperCase()}`)}
              className="btn-luxury w-full text-xs"
            >
              <span>INQUIRE ABOUT THIS ZONE</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}
