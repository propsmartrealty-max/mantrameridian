import { useState } from 'react';
import { amenityChapters, type AmenityChapter, type AmenityItem } from '../../data/amenities';
import { Compass, CheckCircle2, ArrowRight } from 'lucide-react';

export default function AmenityAtlas() {
  const [activeChapterId, setActiveChapterId] = useState<string>(amenityChapters[0].id);
  const [activeItemIndex, setActiveItemIndex] = useState<number>(0);

  const activeChapter: AmenityChapter = amenityChapters.find(c => c.id === activeChapterId) || amenityChapters[0];
  const activeItem: AmenityItem = activeChapter.items[activeItemIndex] || activeChapter.items[0];

  // Curated imagery mapping for amenity chapters using authentic project renders
  const chapterImages: Record<string, string> = {
    wellness: "https://www.mantraproperties.in/assets/images/properties/mantra-meridian-gallery-533930309.webp",
    social: "https://www.mantraproperties.in/assets/images/properties/mantra-meridian-gallery-636694877.webp",
    recreation: "https://www.mantraproperties.in/assets/images/properties/mantra-meridian-gallery-911472749.webp",
    landscape: "https://www.mantraproperties.in/assets/images/properties/mantra-meridian-gallery-683039693.webp",
    children: "https://www.mantraproperties.in/assets/images/properties/mantra-meridian-gallery-815277701.webp",
    everyday: "https://www.mantraproperties.in/assets/images/properties/mantra-meridian-gallery-319534698.webp"
  };

  const handleOpenConcierge = () => {
    window.dispatchEvent(
      new CustomEvent('open-private-presentation', {
        detail: { config: '3 BHK', intent: 'AMENITY PRESENTATION' }
      })
    );
  };

  return (
    <div className="w-full bg-obsidian border border-white/10 overflow-hidden">
      
      {/* Chapter Selection Bar */}
      <div className="border-b border-white/10 bg-obsidian-deep/90 p-4 md:p-6 overflow-x-auto">
        <div className="flex items-center gap-2 min-w-max">
          {amenityChapters.map((chapter) => {
            const isSelected = chapter.id === activeChapterId;
            return (
              <button
                key={chapter.id}
                onClick={() => {
                  setActiveChapterId(chapter.id);
                  setActiveItemIndex(0);
                }}
                className={`px-5 py-3 text-xs uppercase tracking-widest transition-all border ${
                  isSelected
                    ? 'bg-champagne text-obsidian border-champagne font-semibold shadow-glow'
                    : 'bg-obsidian-card/70 text-concrete border-white/10 hover:border-white/30 hover:text-architectural-white'
                }`}
              >
                {chapter.title}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Chapter Experience */}
      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[600px]">
        
        {/* Left: Atmospheric Visual Scene (Cols 1-7) */}
        <div className="lg:col-span-7 relative min-h-[380px] lg:min-h-full overflow-hidden bg-obsidian-deep">
          <img
            src={chapterImages[activeChapter.id] || chapterImages.wellness}
            alt={activeItem.name}
            className="w-full h-full object-cover object-center filter brightness-90 contrast-105 transition-all duration-700 transform scale-100 hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/30 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-obsidian/40 via-transparent to-obsidian" />

          {/* Floating Chapter Tag */}
          <div className="absolute top-6 left-6 z-10 glass-dark px-4 py-2 border border-champagne/30">
            <span className="label-architectural text-[10px] text-champagne block">AMENITY CHAPTER</span>
            <span className="font-serif text-lg text-architectural-white">{activeChapter.title}</span>
          </div>

          {/* Bottom Location Indicator */}
          {activeItem.locationOnSite && (
            <div className="absolute bottom-6 left-6 z-10 flex items-center gap-2 text-xs text-architectural-white/80 glass-dark px-3 py-1.5 border border-white/10">
              <Compass className="w-3.5 h-3.5 text-champagne" />
              <span>Location: {activeItem.locationOnSite}</span>
            </div>
          )}
        </div>

        {/* Right: Curated Specifications & Spaces (Cols 8-12) */}
        <div className="lg:col-span-5 p-6 md:p-10 bg-obsidian-card flex flex-col justify-between">
          
          <div className="space-y-6">
            <div>
              <p className="label-architectural text-xs text-champagne">CHAPTER OVERVIEW</p>
              <h3 className="font-serif text-3xl text-architectural-white mt-1">{activeChapter.title}</h3>
              <p className="text-xs text-concrete mt-2 leading-relaxed">{activeChapter.description}</p>
            </div>

            {/* Amenity Sub-spaces Selector */}
            <div className="space-y-2">
              <span className="text-[10px] uppercase tracking-widest text-concrete/70 block font-mono">Curated Enclaves</span>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2">
                {activeChapter.items.map((item, idx) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveItemIndex(idx)}
                    className={`text-left p-3 border transition-all text-xs flex items-center justify-between ${
                      activeItemIndex === idx
                        ? 'border-champagne bg-champagne/10 text-architectural-white'
                        : 'border-white/10 bg-obsidian/40 text-concrete hover:border-white/20'
                    }`}
                  >
                    <span className="font-medium">{item.name}</span>
                    {activeItemIndex === idx && <div className="w-1.5 h-1.5 rounded-full bg-champagne" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Active Item Deep Dive */}
            <div className="p-5 bg-obsidian-surface border border-white/10 space-y-3">
              <div>
                <span className="label-architectural text-[10px] text-champagne">FEATURED AMENITY</span>
                <h4 className="font-serif text-xl text-architectural-white mt-0.5">{activeItem.name}</h4>
                <p className="text-xs text-concrete/80 italic mt-0.5">{activeItem.tagline}</p>
              </div>

              <p className="text-xs text-concrete leading-relaxed">{activeItem.description}</p>

              {/* Feature Bullet Points */}
              <div className="pt-2 border-t border-white/10 space-y-2">
                {activeItem.features.map((feat, fidx) => (
                  <div key={fidx} className="flex items-start gap-2 text-xs text-concrete">
                    <CheckCircle2 className="w-3.5 h-3.5 text-champagne shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Action trigger */}
          <div className="pt-6 border-t border-white/10 mt-6">
            <button
              onClick={handleOpenConcierge}
              className="btn-luxury w-full text-xs"
            >
              <span>REQUEST COMPLETE AMENITIES DOSSIER</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}
