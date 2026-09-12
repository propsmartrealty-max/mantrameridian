import { useState } from 'react';

interface TourTab {
  id: string;
  title: string;
  badge: string;
  description: string;
  type: 'matterport' | 'youtube';
  src: string;
}

const tours: TourTab[] = [
  {
    id: '3bhk-3d',
    title: '3 BHK 3D Virtual Tour',
    badge: 'MATTERPORT 3D IMMERSION',
    description: 'Explore the fully rendered 3-dimensional digital twin of the 3 BHK Riverside Residence. Navigate chamber by chamber with 360-degree spatial freedom.',
    type: 'matterport',
    src: 'https://my.matterport.com/show/?m=GBTsK9FFEvJ'
  },
  {
    id: 'project-walkthrough',
    title: 'Estate Project Walkthrough',
    badge: 'CINEMATIC 4K MONOGRAPH',
    description: 'Architectural aerials and masterplan walkthrough exploring the 8-acre sanctuary, riverside podiums, and the Mula river corridor.',
    type: 'youtube',
    src: 'https://www.youtube.com/embed/6hsoYHelVXg?si=HBbZ9of8vVROszQx&rel=0'
  },
  {
    id: 'duplex-tour',
    title: '3 BHK Duplex Video Tour',
    badge: 'SIGNATURE SKY DUPLEX',
    description: 'Exclusive walk-through of the two-tier 3 BHK Sky Duplex showcasing the 20-foot double-height salon void and riverfront balcony.',
    type: 'youtube',
    src: 'https://www.youtube.com/embed/6VhVRl7ycds?si=PpcHSihidvFD07g7&rel=0'
  }
];

export default function VirtualWalkthrough() {
  const [activeTab, setActiveTab] = useState(tours[0].id);
  const currentTour = tours.find((t) => t.id === activeTab) || tours[0];

  return (
    <div className="w-full glass-card-luxury glass-spotlight border border-champagne/30 overflow-hidden shadow-2xl">
      {/* Tab Navigation */}
      <div className="border-b border-champagne/20 bg-obsidian-deep/90 backdrop-blur-xl px-4 sm:px-8 py-3 flex flex-wrap gap-2 sm:gap-3">
        {tours.map((tour) => {
          const isActive = tour.id === activeTab;
          return (
            <button
              key={tour.id}
              onClick={() => setActiveTab(tour.id)}
              className={`px-4 sm:px-5 py-2 text-xs tracking-wider transition-all duration-300 font-mono relative flex items-center gap-2 rounded ${
                isActive
                  ? 'text-champagne font-semibold border border-champagne bg-champagne/15 shadow-[0_0_15px_rgba(223,183,90,0.3)] scale-[1.02]'
                  : 'text-concrete hover:text-architectural-white border border-white/10 bg-obsidian-card/60 hover:border-champagne/40'
              }`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-champagne animate-pulse' : 'bg-concrete/40'}`} />
              <span>{tour.title}</span>
            </button>
          );
        })}
      </div>

      {/* Media Player Container */}
      <div className="relative w-full aspect-[16/9] sm:aspect-[21/9] min-h-[380px] sm:min-h-[500px] bg-black">
        <iframe
          key={currentTour.src}
          src={currentTour.src}
          title={currentTour.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; xr-spatial-tracking"
          allowFullScreen
          className="w-full h-full border-0"
        />
      </div>

      {/* Information Strip */}
      <div className="p-6 sm:p-8 bg-obsidian-deep/90 backdrop-blur-xl border-t border-champagne/20 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 border border-champagne/30 text-[9px] font-mono tracking-widest text-champagne uppercase rounded-none">
            {currentTour.badge}
          </div>
          <h3 className="font-serif text-xl sm:text-2xl text-architectural-white font-normal">
            {currentTour.title}
          </h3>
          <p className="text-xs text-concrete/80 leading-relaxed">
            {currentTour.description}
          </p>
        </div>

        <div className="shrink-0 flex items-center gap-3">
          <a
            href={currentTour.src}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-luxury-outline text-xs whitespace-nowrap"
          >
            <span>EXPAND FULLSCREEN</span>
            <span>↗</span>
          </a>
        </div>
      </div>
    </div>
  );
}
