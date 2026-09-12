import { useState } from 'react';

interface TypologyOption {
  id: string;
  name: string;
  carpetArea: string;
  basePrice: number;
  maintenanceDeposit: number;
  slug: string;
}

const typologies: TypologyOption[] = [
  {
    id: '2bhk',
    name: '2 BHK Contemporary',
    carpetArea: '815 sq.ft.',
    basePrice: 12900000,
    maintenanceDeposit: 225000,
    slug: '2-bhk'
  },
  {
    id: '3bhk',
    name: '3 BHK Riverside',
    carpetArea: '1,180 sq.ft.',
    basePrice: 17500000,
    maintenanceDeposit: 285000,
    slug: '3-bhk'
  },
  {
    id: '3bhk-duplex',
    name: '3 BHK Sky Duplex',
    carpetArea: '1,660 sq.ft.',
    basePrice: 22500000,
    maintenanceDeposit: 350000,
    slug: '3-bhk-duplex'
  },
  {
    id: '4bhk',
    name: '4 BHK Grand Estate',
    carpetArea: '2,050 sq.ft.',
    basePrice: 28500000,
    maintenanceDeposit: 425000,
    slug: '4-bhk'
  }
];

const floorBands = [
  { id: 'lower', name: 'Levels 1 – 5 (Podium & Garden)', premium: 0 },
  { id: 'mid', name: 'Levels 6 – 15 (Canopy Panorama)', premium: 150000 },
  { id: 'upper', name: 'Levels 16 – 22 (Horizon Vistas)', premium: 300000 },
  { id: 'sky', name: 'Levels 23 – 30 (Sky Tier)', premium: 500000 }
];

const orientations = [
  { id: 'river', name: 'Riparian Mula Riverfront View', premium: 250000 },
  { id: 'amenity', name: 'Central Botanic & Lagoon View', premium: 0 }
];

function formatINR(val: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(val);
}

export default function CostSheetEstimator() {
  const [selectedTypologyId, setSelectedTypologyId] = useState('3bhk');
  const [selectedFloorId, setSelectedFloorId] = useState('mid');
  const [selectedOrientationId, setSelectedOrientationId] = useState('river');

  const selectedTypo = typologies.find((t) => t.id === selectedTypologyId) || typologies[1];
  const selectedFloor = floorBands.find((f) => f.id === selectedFloorId) || floorBands[1];
  const selectedOrient = orientations.find((o) => o.id === selectedOrientationId) || orientations[0];

  // Agreement Value = Base + Floor Rise + Facing Premium
  const agreementValue = selectedTypo.basePrice + selectedFloor.premium + selectedOrient.premium;

  // Statutory Calculations (Maharashtra / PMC / PMRDA)
  const stampDutyRate = 0.07; // 6% Stamp Duty + 1% Local Body Tax
  const stampDuty = Math.round(agreementValue * stampDutyRate);
  const registrationFee = 30000; // Capped at ₹30,000 in Maharashtra
  const gst = Math.round(agreementValue * 0.05); // 5% GST for ongoing residential
  const maintenance = selectedTypo.maintenanceDeposit;

  // Total Estimated Investment
  const totalEstimatedCost = agreementValue + stampDuty + registrationFee + gst + maintenance;

  const whatsappMessage = encodeURIComponent(
    `Hello Mantra Meridian Concierge, I generated an indicative cost sheet on your portal for ${selectedTypo.name} (${selectedTypo.carpetArea}) on ${selectedFloor.name} with ${selectedOrient.name}. Estimated Agreement Value: ${formatINR(agreementValue)}, Total All-Inclusive: ${formatINR(totalEstimatedCost)}. Please share official sanctioned floor plans and arrange a VIP presentation.`
  );

  return (
    <div className="w-full bg-obsidian-card/80 border border-champagne/30 p-6 md:p-10 space-y-8 backdrop-blur-xl shadow-2xl relative overflow-hidden">
      {/* Subtle Ambient Glow */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-champagne/5 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Header */}
      <div className="border-b border-white/10 pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="label-architectural text-xs text-champagne">ESTIMATE YOUR RESIDENCE</span>
          <h3 className="font-serif text-2xl md:text-3xl text-architectural-white mt-1">
            Interactive Cost Sheet &amp; Tax Estimator
          </h3>
          <p className="text-xs text-concrete/80 mt-1 max-w-xl">
            Configure carpet area, vertical elevation band, and view orientation to calculate accurate agreement value and statutory Maharashtra dues.
          </p>
        </div>
        <div className="shrink-0 text-right">
          <span className="text-[10px] font-mono text-concrete/50 block">MAHARERA: P52100045688</span>
          <span className="text-xs font-mono text-emerald-400 font-medium">● LIVE STATUTORY CALCULATOR</span>
        </div>
      </div>

      {/* Selection Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* 1. Typology Selection */}
        <div className="space-y-3">
          <label className="text-xs font-mono uppercase tracking-wider text-architectural-white font-medium block">
            1. Residence Format
          </label>
          <div className="grid grid-cols-1 gap-2">
            {typologies.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setSelectedTypologyId(t.id)}
                className={`p-3 text-left border transition-all duration-300 rounded flex items-center justify-between ${
                  selectedTypologyId === t.id
                    ? 'border-champagne bg-champagne/15 text-architectural-white shadow-[0_0_15px_rgba(223,183,90,0.15)]'
                    : 'border-white/10 bg-obsidian-surface/60 text-concrete/80 hover:border-champagne/40'
                }`}
              >
                <div>
                  <div className="text-xs font-medium text-architectural-white">{t.name}</div>
                  <div className="text-[11px] font-mono text-concrete/60">{t.carpetArea} Carpet</div>
                </div>
                <div className="text-xs font-mono text-champagne font-semibold">
                  From {formatINR(t.basePrice)}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* 2. Floor Band Selection */}
        <div className="space-y-3">
          <label className="text-xs font-mono uppercase tracking-wider text-architectural-white font-medium block">
            2. Vertical Elevation Band
          </label>
          <div className="grid grid-cols-1 gap-2">
            {floorBands.map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => setSelectedFloorId(f.id)}
                className={`p-3 text-left border transition-all duration-300 rounded flex items-center justify-between ${
                  selectedFloorId === f.id
                    ? 'border-champagne bg-champagne/15 text-architectural-white shadow-[0_0_15px_rgba(223,183,90,0.15)]'
                    : 'border-white/10 bg-obsidian-surface/60 text-concrete/80 hover:border-champagne/40'
                }`}
              >
                <div>
                  <div className="text-xs font-medium text-architectural-white">{f.name}</div>
                  <div className="text-[11px] text-concrete/60">Floor Rise Adjustment</div>
                </div>
                <div className="text-xs font-mono text-concrete/70">
                  {f.premium === 0 ? 'Standard' : `+ ${formatINR(f.premium)}`}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* 3. Orientation Selection */}
        <div className="space-y-3">
          <label className="text-xs font-mono uppercase tracking-wider text-architectural-white font-medium block">
            3. Balcony Orientation
          </label>
          <div className="grid grid-cols-1 gap-2">
            {orientations.map((o) => (
              <button
                key={o.id}
                type="button"
                onClick={() => setSelectedOrientationId(o.id)}
                className={`p-3 text-left border transition-all duration-300 rounded flex items-center justify-between ${
                  selectedOrientationId === o.id
                    ? 'border-champagne bg-champagne/15 text-architectural-white shadow-[0_0_15px_rgba(223,183,90,0.15)]'
                    : 'border-white/10 bg-obsidian-surface/60 text-concrete/80 hover:border-champagne/40'
                }`}
              >
                <div>
                  <div className="text-xs font-medium text-architectural-white">{o.name}</div>
                  <div className="text-[11px] text-concrete/60">View Premium</div>
                </div>
                <div className="text-xs font-mono text-concrete/70">
                  {o.premium === 0 ? 'Standard' : `+ ${formatINR(o.premium)}`}
                </div>
              </button>
            ))}
          </div>

          <div className="p-4 bg-obsidian-surface/80 border border-white/10 rounded space-y-1 mt-2">
            <span className="text-[10px] uppercase font-mono text-champagne block">CONSTRUCTION-LINKED PAYMENT</span>
            <p className="text-[11px] text-concrete/70 leading-relaxed">
              Payments are phased across 6 MahaRERA structural milestones from plinth to possession in June 2028.
            </p>
          </div>
        </div>

      </div>

      {/* Calculated Breakdown Card */}
      <div className="pt-6 border-t border-white/10 bg-obsidian-deep/90 p-6 rounded-lg border border-champagne/20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pb-6 border-b border-white/10">
          <div>
            <span className="text-[10px] font-mono uppercase text-concrete/60 block">Agreement Value</span>
            <span className="font-serif text-2xl text-architectural-white font-medium">{formatINR(agreementValue)}</span>
            <span className="text-[10px] text-concrete/50 block">Base + Floor + Orientation</span>
          </div>
          <div>
            <span className="text-[10px] font-mono uppercase text-concrete/60 block">Govt. Stamp Duty (7%)</span>
            <span className="font-serif text-2xl text-champagne font-medium">{formatINR(stampDuty)}</span>
            <span className="text-[10px] text-concrete/50 block">6% State + 1% Local Body Tax</span>
          </div>
          <div>
            <span className="text-[10px] font-mono uppercase text-concrete/60 block">GST (5%) + Reg.</span>
            <span className="font-serif text-2xl text-champagne font-medium">{formatINR(gst + registrationFee)}</span>
            <span className="text-[10px] text-concrete/50 block">5% GST + ₹30,000 Govt. Fee</span>
          </div>
          <div>
            <span className="text-[10px] font-mono uppercase text-emerald-400 block font-semibold">Total Estimated Investment</span>
            <span className="font-serif text-2xl text-emerald-400 font-semibold">{formatINR(totalEstimatedCost)}</span>
            <span className="text-[10px] text-concrete/50 block">All-Inclusive (Taxes &amp; Deposit)</span>
          </div>
        </div>

        {/* Action Controls */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-[11px] text-concrete/60 leading-tight">
            *Indicative estimates subject to actual floor selection and statutory government taxes at time of registration.
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              type="button"
              onClick={() => window.print()}
              className="px-4 py-2.5 text-xs font-mono uppercase tracking-wider border border-white/20 hover:border-champagne text-concrete hover:text-architectural-white transition-all w-full sm:w-auto text-center"
            >
              Print Estimate
            </button>
            <a
              href={`https://wa.me/917744009295?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-luxury text-xs px-5 py-2.5 whitespace-nowrap w-full sm:w-auto text-center flex items-center justify-center gap-2"
            >
              <span>REQUEST OFFICIAL COST SHEET</span>
              <span>↗</span>
            </a>
          </div>
        </div>
      </div>

    </div>
  );
}
