import { useState } from 'react';
import { residencesData, type ResidenceConfig, type RoomDetail, type OfficialFloorPlan } from '../../data/residences';
import { Layers, Download, Compass, Info, ArrowUpRight, Eye, CheckCircle2 } from 'lucide-react';

interface FloorPlanViewerProps {
  defaultResidenceId?: string;
}

export default function FloorPlanViewer({ defaultResidenceId = '3bhk' }: FloorPlanViewerProps) {
  const [selectedConfigId, setSelectedConfigId] = useState<string>(defaultResidenceId);
  const [viewMode, setViewMode] = useState<'official' | '2d' | '3d'>('official');
  const [selectedOfficialIndex, setSelectedOfficialIndex] = useState<number>(0);
  const [activeRoomId, setActiveRoomId] = useState<string | null>(null);

  const currentConfig: ResidenceConfig = residencesData.find(r => r.id === selectedConfigId) || residencesData[1];
  const activeRoom: RoomDetail | undefined = currentConfig.rooms.find(r => r.id === activeRoomId) || currentConfig.rooms[1];
  const activeOfficialPlan: OfficialFloorPlan = currentConfig.officialFloorPlans[selectedOfficialIndex] || currentConfig.officialFloorPlans[0];

  const handleOpenConcierge = (intent = 'FLOOR PLANS') => {
    window.dispatchEvent(
      new CustomEvent('open-private-presentation', {
        detail: { config: `${currentConfig.type} - ${activeOfficialPlan.title}`, intent }
      })
    );
  };

  return (
    <div className="w-full bg-obsidian border border-white/10 rounded-none overflow-hidden">
      
      {/* Top Bar: Configuration Switcher & View Mode */}
      <div className="border-b border-white/10 p-4 md:p-6 bg-obsidian-deep/80 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        
        {/* Residence Tabs */}
        <div className="flex flex-wrap gap-2">
          {residencesData.map((res) => (
            <button
              key={res.id}
              onClick={() => {
                setSelectedConfigId(res.id);
                setSelectedOfficialIndex(0);
                setActiveRoomId(null);
              }}
              className={`px-4 py-2.5 text-xs font-medium tracking-wider transition-all uppercase border ${
                selectedConfigId === res.id
                  ? 'bg-champagne text-obsidian border-champagne shadow-glow'
                  : 'bg-obsidian-card/60 text-concrete border-white/10 hover:border-white/30 hover:text-architectural-white'
              }`}
            >
              {res.type}
            </button>
          ))}
        </div>

        {/* View Mode & Metrics */}
        <div className="flex items-center gap-3 self-end lg:self-auto">
          <div className="flex bg-obsidian-card border border-white/10 p-0.5">
            <button
              onClick={() => setViewMode('official')}
              className={`px-3 py-1.5 text-xs tracking-wider uppercase transition-colors ${
                viewMode === 'official' ? 'bg-champagne text-obsidian font-medium' : 'text-concrete hover:text-white'
              }`}
            >
              Official RERA Layout
            </button>
            <button
              onClick={() => setViewMode('2d')}
              className={`px-3 py-1.5 text-xs tracking-wider uppercase transition-colors ${
                viewMode === '2d' ? 'bg-white/10 text-architectural-white' : 'text-concrete hover:text-white'
              }`}
            >
              Interactive 2D
            </button>
            <button
              onClick={() => setViewMode('3d')}
              className={`px-3 py-1.5 text-xs tracking-wider uppercase transition-colors ${
                viewMode === '3d' ? 'bg-champagne/20 text-champagne' : 'text-concrete hover:text-white'
              }`}
            >
              3D Spatial
            </button>
          </div>

          <button
            onClick={() => handleOpenConcierge('DOWNLOAD VERIFIED PLAN')}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 border border-champagne/30 text-champagne hover:bg-champagne hover:text-obsidian transition-colors text-xs tracking-wider uppercase"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download Plan</span>
          </button>
        </div>
      </div>

      {/* Variant Selector Bar (for Official Layouts) */}
      {viewMode === 'official' && currentConfig.officialFloorPlans.length > 1 && (
        <div className="px-6 py-3 bg-obsidian-surface border-b border-white/10 flex flex-wrap items-center gap-2">
          <span className="text-[10px] uppercase font-mono text-concrete/60 tracking-widest mr-2">
            Unit Variants:
          </span>
          {currentConfig.officialFloorPlans.map((fp, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedOfficialIndex(idx)}
              className={`px-3 py-1 text-xs border transition-all ${
                selectedOfficialIndex === idx
                  ? 'border-champagne bg-champagne/20 text-architectural-white font-medium'
                  : 'border-white/10 text-concrete/70 hover:text-white hover:border-white/30'
              }`}
            >
              {fp.title} ({fp.unitPlanCode.split(' - ')[0]})
            </button>
          ))}
        </div>
      )}

      {/* Main Floor Plan Canvas and Details Split View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
        
        {/* Blueprint/Image Canvas (Cols 1-8) */}
        <div className="lg:col-span-8 p-6 md:p-10 bg-[#090a09] relative flex flex-col items-center justify-center min-h-[480px] md:min-h-[580px] border-b lg:border-b-0 lg:border-r border-white/10">
          
          {/* Compass and Watermark */}
          <div className="absolute top-6 left-6 flex items-center gap-2 text-concrete/50 text-xs tracking-widest font-mono uppercase">
            <Compass className="w-4 h-4 text-champagne/60 animate-spin-slow" />
            <span>RIVERSIDE ORIENTATION • SANCTIONED RERA PLAN</span>
          </div>

          <div className="absolute top-6 right-6 text-xs text-concrete/60 font-mono tracking-wider">
            {currentConfig.carpetAreaRange} CARPET
          </div>

          {/* VIEW MODE 1: Official Sanctioned Image */}
          {viewMode === 'official' && (
            <div className="w-full max-w-2xl relative my-6 flex flex-col items-center justify-center">
              <div className="relative group overflow-hidden border border-white/10 bg-white/5 p-4 rounded-none">
                <img
                  src={activeOfficialPlan.imageUrl}
                  alt={`${currentConfig.name} - ${activeOfficialPlan.title}`}
                  className="max-h-[500px] w-auto object-contain filter contrast-105 group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* Floating Unit Plan Code Stamp */}
                <div className="absolute bottom-4 left-4 glass-dark px-3 py-1.5 border border-champagne/30 text-xs font-mono text-champagne">
                  {activeOfficialPlan.unitPlanCode}
                </div>
              </div>

              <div className="flex items-center gap-2 text-[11px] text-concrete/60 mt-4">
                <Eye className="w-3.5 h-3.5 text-champagne" />
                <span>Official sanctioned unit plan for Mantra Meridian Riverside Balewadi (MahaRERA: P52100045688).</span>
              </div>
            </div>
          )}

          {/* VIEW MODE 2: Interactive 2D Blueprint */}
          {viewMode === '2d' && (
            <div className="w-full max-w-xl aspect-[5/4] relative my-4 flex items-center justify-center">
              <svg
                viewBox={currentConfig.svgFloorplan.viewBox}
                className="w-full h-full select-none filter drop-shadow-[0_15px_35px_rgba(0,0,0,0.9)]"
              >
                <defs>
                  <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                    <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" />
                  </pattern>
                  <linearGradient id="activeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#C8B89F" stopOpacity="0.45" />
                    <stop offset="100%" stopColor="#8C7A5E" stopOpacity="0.2" />
                  </linearGradient>
                </defs>

                <rect width="100%" height="100%" fill="url(#grid)" />

                <path
                  d={currentConfig.svgFloorplan.backgroundOutline}
                  fill="#111211"
                  stroke="#383835"
                  strokeWidth="3"
                />

                <line x1="40" y1="105" x2="460" y2="105" stroke="#C8B89F" strokeWidth="1" strokeDasharray="4 4" />
                <text x="250" y="95" fill="#C8B89F" fontSize="9" letterSpacing="3" textAnchor="middle" fontFamily="monospace">
                  ← MULA RIVER PROMENADE &amp; RIPARIAN CANOPY →
                </text>

                {currentConfig.rooms.map((room) => {
                  const isSelected = (activeRoomId || currentConfig.rooms[1].id) === room.id;

                  return (
                    <g
                      key={room.id}
                      onClick={() => setActiveRoomId(room.id)}
                      onMouseEnter={() => setActiveRoomId(room.id)}
                      className="cursor-pointer transition-all duration-300"
                    >
                      <rect
                        x={room.coords.x}
                        y={room.coords.y}
                        width={room.coords.width}
                        height={room.coords.height}
                        fill={isSelected ? 'url(#activeGrad)' : '#161816'}
                        stroke={isSelected ? '#C8B89F' : '#2A2B29'}
                        strokeWidth={isSelected ? '2' : '1'}
                        className="transition-all duration-300"
                      />

                      <text
                        x={room.coords.x + room.coords.width / 2}
                        y={room.coords.y + room.coords.height / 2 - 4}
                        textAnchor="middle"
                        fill={isSelected ? '#F5F3EE' : '#9E9C95'}
                        fontSize="9"
                        fontWeight={isSelected ? '600' : '400'}
                        className="pointer-events-none tracking-wide"
                      >
                        {room.name.split(' ')[0]} {room.name.split(' ')[1] || ''}
                      </text>

                      <text
                        x={room.coords.x + room.coords.width / 2}
                        y={room.coords.y + room.coords.height / 2 + 12}
                        textAnchor="middle"
                        fill={isSelected ? '#C8B89F' : '#686660'}
                        fontSize="7.5"
                        fontFamily="monospace"
                        className="pointer-events-none"
                      >
                        {room.dimensions}
                      </text>

                      {isSelected && (
                        <circle
                          cx={room.coords.x + 12}
                          cy={room.coords.y + 12}
                          r="3"
                          fill="#C8B89F"
                          className="animate-pulse"
                        />
                      )}
                    </g>
                  );
                })}
              </svg>
            </div>
          )}

          {/* VIEW MODE 3: 3D Spatial Model Simulation */}
          {viewMode === '3d' && (
            <div className="relative w-full h-full flex flex-col items-center justify-center p-8 text-center bg-obsidian-card/40 border border-white/10">
              <div className="w-20 h-20 rounded-full bg-champagne/10 border border-champagne/30 flex items-center justify-center mb-4 text-champagne">
                <Layers className="w-8 h-8" />
              </div>
              <h4 className="font-serif text-2xl text-architectural-white mb-2">3D Spatial Volume Model</h4>
              <p className="text-xs text-concrete max-w-sm leading-relaxed mb-6">
                Experience full 3D spatial volumes, ceiling heights (up to 20ft in duplexes), and acoustic light penetration.
              </p>
              <button
                onClick={() => handleOpenConcierge('3D SPATIAL PRESENTATION')}
                className="btn-luxury text-xs"
              >
                <span>LAUNCH 3D WALKTHROUGH</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Prompt below blueprint */}
          <div className="text-[11px] text-concrete/60 flex items-center gap-2 mt-2">
            <Info className="w-3.5 h-3.5 text-champagne" />
            <span>Select between Official RERA Layout, 2D Interactive Blueprint, and 3D Spatial Walkthrough.</span>
          </div>
        </div>

        {/* Room Intelligence Panel & Specifications (Cols 9-12) */}
        <div className="lg:col-span-4 p-6 md:p-8 bg-obsidian-card flex flex-col justify-between">
          
          <div className="space-y-6">
            
            {/* Header info */}
            <div>
              <span className="label-architectural text-xs text-champagne">SPACE SPECIFICATIONS</span>
              <h3 className="font-serif text-2xl text-architectural-white mt-1">{currentConfig.name}</h3>
              <p className="text-xs text-concrete mt-1.5 leading-relaxed">{currentConfig.subtitle}</p>
            </div>

            {/* Active Layout Metadata */}
            <div className="p-4 bg-obsidian-surface border border-champagne/25 space-y-2">
              <span className="text-[10px] uppercase tracking-widest text-champagne font-mono block font-semibold">
                ACTIVE UNIT PLAN
              </span>
              <div className="text-sm font-serif text-architectural-white">{activeOfficialPlan.title}</div>
              <div className="text-xs text-champagne font-mono">{activeOfficialPlan.unitPlanCode}</div>
              <p className="text-xs text-concrete leading-relaxed pt-1">{activeOfficialPlan.description}</p>
            </div>

            {/* Key stats row */}
            <div className="grid grid-cols-2 gap-3 py-3 border-y border-white/10">
              <div>
                <span className="text-[10px] uppercase tracking-wider text-concrete/70 block">Carpet Area</span>
                <span className="text-sm font-semibold text-architectural-white">{currentConfig.carpetAreaRange}</span>
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-wider text-concrete/70 block">Bathrooms</span>
                <span className="text-sm font-semibold text-architectural-white">{currentConfig.bathrooms} Ensuites</span>
              </div>
              <div className="col-span-2">
                <span className="text-[10px] uppercase tracking-wider text-concrete/70 block">Aspect &amp; Orientation</span>
                <span className="text-xs text-champagne font-medium">{currentConfig.aspect}</span>
              </div>
            </div>

            {/* Chamber List */}
            {viewMode === '2d' && activeRoom && (
              <div className="p-4 bg-obsidian-surface border border-champagne/30 space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase tracking-widest text-champagne font-semibold">SELECTED CHAMBER</span>
                  <span className="text-xs font-mono text-architectural-white">{activeRoom.areaSqFt} SQ.FT.</span>
                </div>
                <h4 className="font-serif text-lg text-architectural-white">{activeRoom.name}</h4>
                <div className="text-xs text-champagne font-mono">Dimensions: {activeRoom.dimensions}</div>
                <p className="text-xs text-concrete leading-relaxed pt-1">{activeRoom.description}</p>
              </div>
            )}

            {/* Architectural Highlights checklist */}
            <div className="space-y-2">
              <span className="text-[10px] uppercase tracking-wider text-concrete/80 block font-medium">Design Highlights</span>
              <div className="space-y-1.5">
                {currentConfig.architecturalHighlights.slice(0, 3).map((h, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-concrete">
                    <CheckCircle2 className="w-3.5 h-3.5 text-champagne shrink-0 mt-0.5" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Action CTAs */}
          <div className="pt-6 border-t border-white/10 space-y-2.5 mt-6">
            <button
              onClick={() => handleOpenConcierge('DETAILED FLOOR PLAN & PRICING')}
              className="btn-luxury w-full text-xs"
            >
              <span>REQUEST VERIFIED PRICING</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleOpenConcierge('SITE TOUR')}
              className="btn-luxury-outline w-full text-xs"
            >
              SCHEDULE ON-SITE EXPERIENCE
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}
