import { useState, useEffect, useRef, type MouseEvent, type WheelEvent, type TouchEvent } from 'react';
import { residencesData, type ResidenceConfig, type RoomDetail, type OfficialFloorPlan } from '../../data/residences';
import { 
  Layers, Download, Compass, Info, ArrowUpRight, Eye, CheckCircle2,
  Maximize2, ZoomIn, ZoomOut, RotateCcw, X, ChevronLeft, ChevronRight
} from 'lucide-react';

interface FloorPlanViewerProps {
  defaultResidenceId?: string;
}

export default function FloorPlanViewer({ defaultResidenceId = '3bhk' }: FloorPlanViewerProps) {
  const [selectedConfigId, setSelectedConfigId] = useState<string>(defaultResidenceId);
  const [viewMode, setViewMode] = useState<'official' | '2d' | '3d'>('official');
  const [selectedOfficialIndex, setSelectedOfficialIndex] = useState<number>(0);
  const [activeRoomId, setActiveRoomId] = useState<string | null>(null);

  // Fullscreen Interactive Lightbox State
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [panPosition, setPanPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const touchStartRef = useRef<{ dist: number }>({ dist: 0 });

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

  const openLightbox = () => {
    setIsLightboxOpen(true);
    setZoomLevel(1);
    setPanPosition({ x: 0, y: 0 });
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
    setZoomLevel(1);
    setPanPosition({ x: 0, y: 0 });
    document.body.style.overflow = '';
  };

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(Number((prev + 0.35).toFixed(2)), 3.5));
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => {
      const next = Math.max(Number((prev - 0.35).toFixed(2)), 1);
      if (next === 1) setPanPosition({ x: 0, y: 0 });
      return next;
    });
  };

  const handleResetZoom = () => {
    setZoomLevel(1);
    setPanPosition({ x: 0, y: 0 });
  };

  const handleToggleZoom = () => {
    if (zoomLevel > 1) {
      handleResetZoom();
    } else {
      setZoomLevel(2);
    }
  };

  const handleMouseDown = (e: MouseEvent) => {
    if (zoomLevel <= 1) return;
    setIsDragging(true);
    dragStartRef.current = { x: e.clientX - panPosition.x, y: e.clientY - panPosition.y };
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging || zoomLevel <= 1) return;
    setPanPosition({
      x: e.clientX - dragStartRef.current.x,
      y: e.clientY - dragStartRef.current.y
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleWheel = (e: WheelEvent) => {
    e.preventDefault();
    if (e.deltaY < 0) {
      handleZoomIn();
    } else {
      handleZoomOut();
    }
  };

  const handleTouchStart = (e: TouchEvent) => {
    if (e.touches.length === 1 && zoomLevel > 1) {
      const touch = e.touches[0];
      dragStartRef.current = { x: touch.clientX - panPosition.x, y: touch.clientY - panPosition.y };
      setIsDragging(true);
    } else if (e.touches.length === 2) {
      const dist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      touchStartRef.current = { dist };
    }
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (e.touches.length === 1 && isDragging && zoomLevel > 1) {
      const touch = e.touches[0];
      setPanPosition({
        x: touch.clientX - dragStartRef.current.x,
        y: touch.clientY - dragStartRef.current.y
      });
    } else if (e.touches.length === 2) {
      const dist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      const factor = dist / (touchStartRef.current.dist || dist);
      if (factor > 1.08) {
        handleZoomIn();
        touchStartRef.current.dist = dist;
      } else if (factor < 0.92) {
        handleZoomOut();
        touchStartRef.current.dist = dist;
      }
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  const handleNextPlan = () => {
    if (selectedOfficialIndex < currentConfig.officialFloorPlans.length - 1) {
      setSelectedOfficialIndex(prev => prev + 1);
    } else {
      const currentIdx = residencesData.findIndex(r => r.id === selectedConfigId);
      const nextIdx = (currentIdx + 1) % residencesData.length;
      setSelectedConfigId(residencesData[nextIdx].id);
      setSelectedOfficialIndex(0);
    }
    handleResetZoom();
  };

  const handlePrevPlan = () => {
    if (selectedOfficialIndex > 0) {
      setSelectedOfficialIndex(prev => prev - 1);
    } else {
      const currentIdx = residencesData.findIndex(r => r.id === selectedConfigId);
      const prevIdx = (currentIdx - 1 + residencesData.length) % residencesData.length;
      setSelectedConfigId(residencesData[prevIdx].id);
      setSelectedOfficialIndex(residencesData[prevIdx].officialFloorPlans.length - 1);
    }
    handleResetZoom();
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isLightboxOpen) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === '+' || e.key === '=') handleZoomIn();
      if (e.key === '-' || e.key === '_') handleZoomOut();
      if (e.key === '0') handleResetZoom();
      if (e.key === 'ArrowRight') handleNextPlan();
      if (e.key === 'ArrowLeft') handlePrevPlan();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isLightboxOpen, selectedOfficialIndex, selectedConfigId, currentConfig]);

  return (
    <div className="w-full glass-card-luxury glass-spotlight border border-champagne/30 overflow-hidden shadow-2xl">
      
      {/* Top Bar: Configuration Switcher & View Mode */}
      <div className="border-b border-champagne/20 p-4 md:p-6 bg-obsidian-deep/90 backdrop-blur-xl flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        
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
              className={`px-4 py-2 text-xs font-semibold tracking-wider transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] uppercase rounded-full active:scale-95 ${
                selectedConfigId === res.id
                  ? 'bg-champagne text-white shadow-[0_4px_16px_rgba(160,122,37,0.35)] scale-[1.02]'
                  : 'bg-white/80 text-[#524C44] border border-[#DDD2C2] hover:border-champagne/60 hover:text-[#161412] hover:bg-white'
              }`}
            >
              {res.type}
            </button>
          ))}
        </div>

        {/* View Mode & Metrics (Apple Segmented Control) */}
        <div className="flex items-center gap-3 self-end lg:self-auto">
          <div className="flex bg-white/85 backdrop-blur-2xl border border-[#DDD2C2] p-1 rounded-full shadow-[inset_0_1px_1px_#FFFFFF,0_4px_15px_rgba(40,30,20,0.06)]">
            <button
              onClick={() => setViewMode('official')}
              className={`px-3.5 py-1.5 text-xs tracking-wider uppercase transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] rounded-full active:scale-95 ${
                viewMode === 'official' ? 'bg-white text-[#161412] font-bold shadow-[0_2px_8px_rgba(40,30,20,0.12),inset_0_1px_0_#FFFFFF]' : 'text-[#6B6155] hover:text-[#161412]'
              }`}
            >
              Official RERA Layout
            </button>
            <button
              onClick={() => setViewMode('2d')}
              className={`px-3.5 py-1.5 text-xs tracking-wider uppercase transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] rounded-full active:scale-95 ${
                viewMode === '2d' ? 'bg-white text-[#161412] font-bold shadow-[0_2px_8px_rgba(40,30,20,0.12),inset_0_1px_0_#FFFFFF]' : 'text-[#6B6155] hover:text-[#161412]'
              }`}
            >
              Interactive 2D
            </button>
            <button
              onClick={() => setViewMode('3d')}
              className={`px-3.5 py-1.5 text-xs tracking-wider uppercase transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] rounded-full active:scale-95 ${
                viewMode === '3d' ? 'bg-white text-[#161412] font-bold shadow-[0_2px_8px_rgba(40,30,20,0.12),inset_0_1px_0_#FFFFFF]' : 'text-[#6B6155] hover:text-[#161412]'
              }`}
            >
              3D Spatial
            </button>
          </div>

          <button
            onClick={() => handleOpenConcierge('DOWNLOAD VERIFIED PLAN')}
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 border border-champagne/40 text-champagne bg-white/80 hover:bg-champagne hover:text-white transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] active:scale-95 text-xs tracking-wider uppercase rounded-full font-medium shadow-sm"
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
        <div className="lg:col-span-8 p-6 md:p-10 bg-[#F5F0EB] relative flex flex-col items-center justify-center min-h-[480px] md:min-h-[580px] border-b lg:border-b-0 lg:border-r border-white/10">
          
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
              <div 
                onClick={openLightbox}
                className="relative group overflow-hidden border border-[#DDD2C2] bg-white p-4 rounded-xl cursor-zoom-in shadow-xl hover:border-champagne/80 hover:shadow-2xl transition-all duration-300"
              >
                <img
                  src={activeOfficialPlan.imageUrl}
                  alt={`${currentConfig.name} - ${activeOfficialPlan.title}`}
                  className="max-h-[500px] w-auto object-contain filter contrast-105 group-hover:scale-[1.03] transition-transform duration-500"
                />

                {/* Floating Fullscreen Action Trigger */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    openLightbox();
                  }}
                  className="absolute top-4 right-4 z-10 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#161412]/85 hover:bg-champagne hover:text-[#161412] text-white border border-champagne/40 text-xs font-mono tracking-wider transition-all duration-300 backdrop-blur-md shadow-lg group-hover:scale-105"
                  title="Inspect Fullscreen (Zoom & Pan)"
                >
                  <Maximize2 className="w-3.5 h-3.5 text-champagne group-hover:text-[#161412]" />
                  <span>FULLSCREEN ZOOM</span>
                </button>
                
                {/* Floating Unit Plan Code Stamp */}
                <div className="absolute bottom-4 left-4 bg-[#161412]/85 backdrop-blur-md px-3 py-1.5 border border-champagne/40 text-xs font-mono text-champagne rounded">
                  {activeOfficialPlan.unitPlanCode}
                </div>
              </div>

              <div 
                className="flex items-center gap-2 text-[11px] text-[#6B6155] mt-4 cursor-pointer hover:text-champagne transition-colors"
                onClick={openLightbox}
              >
                <Eye className="w-3.5 h-3.5 text-champagne" />
                <span>Click image to open interactive full-screen zoom &amp; pan lightbox (MahaRERA: P52100045688).</span>
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
              <h3 className="font-serif text-2xl text-architectural-white mb-2">3D Spatial Volume Model</h3>
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
              <h2 className="font-serif text-2xl text-architectural-white mt-1">{currentConfig.name}</h2>
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
                <h3 className="font-serif text-lg text-architectural-white">{activeRoom.name}</h3>
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

      {/* Fullscreen Interactive Architectural Lightbox Modal */}
      {isLightboxOpen && (
        <div 
          className="fixed inset-0 z-[150] bg-[#0E0F13]/98 backdrop-blur-3xl flex flex-col select-none text-white animate-in fade-in duration-200"
          role="dialog"
          aria-modal="true"
          aria-label="Fullscreen Floor Plan Viewer"
        >
          {/* Top Header Bar */}
          <header className="h-16 px-4 md:px-8 border-b border-white/10 flex items-center justify-between shrink-0 bg-[#161412]/90">
            <div className="flex items-center gap-3">
              <div className="hidden sm:block">
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-champagne font-semibold block">
                  MANTRA MERIDIAN RIVERSIDE • BALEWADI
                </span>
                <span className="text-xs text-concrete/70 font-sans">
                  MahaRERA Reg. P52100045688
                </span>
              </div>
              <div className="h-6 w-[1px] bg-white/15 hidden sm:block" />
              <div>
                <h3 className="font-serif text-sm sm:text-base text-architectural-white font-medium flex items-center gap-2">
                  <span>{currentConfig.name}</span>
                  <span className="text-champagne font-mono text-xs font-normal">({activeOfficialPlan.title})</span>
                </h3>
                <span className="text-[11px] font-mono text-champagne/80 block sm:hidden">
                  {activeOfficialPlan.unitPlanCode}
                </span>
              </div>
            </div>

            {/* Toolbar Controls */}
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="flex items-center bg-white/10 border border-white/15 rounded-full p-1 backdrop-blur-md">
                <button
                  type="button"
                  onClick={handleZoomOut}
                  disabled={zoomLevel <= 1}
                  className="p-1.5 rounded-full hover:bg-white/15 text-white disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
                  title="Zoom Out (-)"
                  aria-label="Zoom Out"
                >
                  <ZoomOut className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={handleToggleZoom}
                  className="px-2.5 py-1 text-xs font-mono font-medium text-champagne hover:text-white transition-colors"
                  title="Toggle Zoom (Double Click)"
                >
                  {Math.round(zoomLevel * 100)}%
                </button>
                <button
                  type="button"
                  onClick={handleZoomIn}
                  disabled={zoomLevel >= 3.5}
                  className="p-1.5 rounded-full hover:bg-white/15 text-white disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
                  title="Zoom In (+)"
                  aria-label="Zoom In"
                >
                  <ZoomIn className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={handleResetZoom}
                  className="p-1.5 rounded-full hover:bg-white/15 text-white/80 hover:text-white transition-colors ml-0.5"
                  title="Reset Zoom (0)"
                  aria-label="Reset Zoom"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              </div>

              <button
                type="button"
                onClick={closeLightbox}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-champagne hover:text-obsidian border border-white/20 text-xs font-mono transition-all ml-1"
                title="Close Lightbox (Esc)"
              >
                <X className="w-4 h-4" />
                <span className="hidden sm:inline">ESC</span>
              </button>
            </div>
          </header>

          {/* Central Interactive Blueprint Canvas */}
          <main 
            className={`flex-1 relative overflow-hidden flex items-center justify-center p-4 md:p-8 ${
              zoomLevel > 1 ? (isDragging ? 'cursor-grabbing' : 'cursor-grab') : 'cursor-zoom-in'
            }`}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onDoubleClick={handleToggleZoom}
            onWheel={handleWheel}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* Compass Orientation Indicator */}
            <div className="absolute top-4 left-4 z-20 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 border border-white/10 text-[10px] font-mono text-concrete/80 tracking-widest backdrop-blur-md">
              <Compass className="w-3.5 h-3.5 text-champagne animate-spin-slow" />
              <span>MULA RIVER ORIENTATION</span>
            </div>

            {/* Hint Chip */}
            <div className="hidden md:flex absolute top-4 right-4 z-20 items-center gap-2 px-3 py-1 rounded-full bg-black/50 border border-white/10 text-[10px] font-mono text-concrete/60 backdrop-blur-md">
              <span>Scroll / Pinch to zoom • Drag to pan</span>
            </div>

            {/* Left Nav Arrow */}
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); handlePrevPlan(); }}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-black/70 hover:bg-champagne hover:text-obsidian text-white border border-white/20 flex items-center justify-center transition-all backdrop-blur-md shadow-2xl active:scale-95"
              title="Previous Floor Plan (←)"
              aria-label="Previous Floor Plan"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Right Nav Arrow */}
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); handleNextPlan(); }}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-black/70 hover:bg-champagne hover:text-obsidian text-white border border-white/20 flex items-center justify-center transition-all backdrop-blur-md shadow-2xl active:scale-95"
              title="Next Floor Plan (→)"
              aria-label="Next Floor Plan"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Transformed Blueprint Image */}
            <div
              className="relative max-w-full max-h-full transition-transform"
              style={{
                transform: `translate(${panPosition.x}px, ${panPosition.y}px) scale(${zoomLevel})`,
                transformOrigin: 'center center',
                transition: isDragging ? 'none' : 'transform 0.2s cubic-bezier(0.16, 1, 0.3, 1)'
              }}
            >
              <img
                src={activeOfficialPlan.imageUrl}
                alt={`${currentConfig.name} - ${activeOfficialPlan.title}`}
                className="max-h-[75vh] w-auto object-contain filter contrast-105 drop-shadow-[0_25px_60px_rgba(0,0,0,0.95)] pointer-events-none"
                draggable={false}
              />
            </div>
          </main>

          {/* Bottom Control & Quick Action Bar */}
          <footer className="px-4 md:px-8 py-3.5 border-t border-white/10 bg-[#161412]/95 shrink-0 flex flex-col md:flex-row items-center justify-between gap-3">
            {/* Quick Residence Selector Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto max-w-full py-1">
              {residencesData.map((res) => (
                <button
                  key={res.id}
                  type="button"
                  onClick={() => {
                    setSelectedConfigId(res.id);
                    setSelectedOfficialIndex(0);
                    handleResetZoom();
                  }}
                  className={`px-3 py-1 text-xs font-mono uppercase tracking-wider rounded-full transition-all shrink-0 ${
                    selectedConfigId === res.id
                      ? 'bg-champagne text-obsidian font-bold shadow-md'
                      : 'bg-white/10 text-concrete hover:text-white hover:bg-white/20'
                  }`}
                >
                  {res.type}
                </button>
              ))}
            </div>

            {/* Spec strip */}
            <div className="hidden lg:flex items-center gap-4 text-xs font-mono text-concrete/80">
              <span>Carpet: <strong className="text-white">{currentConfig.carpetAreaRange}</strong></span>
              <span>•</span>
              <span>Bathrooms: <strong className="text-white">{currentConfig.bathrooms} Ensuites</strong></span>
              <span>•</span>
              <span className="text-champagne font-medium">{activeOfficialPlan.unitPlanCode}</span>
            </div>

            {/* High-Intent CTAs */}
            <div className="flex items-center gap-2.5 w-full md:w-auto justify-end">
              <a
                href={`https://wa.me/917387747807?text=${encodeURIComponent(
                  `Hello Mantra Meridian Concierge, I am inspecting the ${currentConfig.name} (${activeOfficialPlan.title} - ${activeOfficialPlan.unitPlanCode}) in the high-res floor plan viewer. Please share sanctioned floor-wise availability and payment schedule.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 md:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full text-xs font-mono font-semibold tracking-wider transition-all shadow-md active:scale-95"
              >
                <svg className="w-3.5 h-3.5 fill-current shrink-0" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z"/>
                </svg>
                <span>ENQUIRE ON WHATSAPP</span>
              </a>

              <button
                type="button"
                onClick={() => {
                  closeLightbox();
                  handleOpenConcierge('REQUEST SANCTIONED CAD / PDF');
                }}
                className="flex-1 md:flex-initial inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-champagne hover:bg-[#B38E3F] text-obsidian rounded-full text-xs font-mono font-bold tracking-wider transition-all shadow-md active:scale-95"
              >
                <Download className="w-3.5 h-3.5" />
                <span>DOWNLOAD PDF</span>
              </button>
            </div>
          </footer>
        </div>
      )}
    </div>
  );
}
