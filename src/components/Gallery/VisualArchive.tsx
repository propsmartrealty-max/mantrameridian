import { useState } from 'react';
import { galleryImages, galleryCategories, type GalleryImage } from '../../data/gallery';
import { Maximize2, X, ChevronLeft, ChevronRight, Compass } from 'lucide-react';

export default function VisualArchive() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(null);

  const filteredImages = selectedCategory === 'all'
    ? galleryImages
    : galleryImages.filter(img => img.category === selectedCategory);

  const activeImage: GalleryImage | null = 
    activeLightboxIndex !== null ? filteredImages[activeLightboxIndex] : null;

  const handleNext = () => {
    if (activeLightboxIndex !== null) {
      setActiveLightboxIndex((activeLightboxIndex + 1) % filteredImages.length);
    }
  };

  const handlePrev = () => {
    if (activeLightboxIndex !== null) {
      setActiveLightboxIndex((activeLightboxIndex - 1 + filteredImages.length) % filteredImages.length);
    }
  };

  return (
    <div className="w-full space-y-8">
      
      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {galleryCategories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => {
              setSelectedCategory(cat.id);
              setActiveLightboxIndex(null);
            }}
            className={`px-4 py-2 text-xs uppercase tracking-widest transition-all border ${
              selectedCategory === cat.id
                ? 'bg-champagne text-obsidian border-champagne font-semibold shadow-glow'
                : 'bg-obsidian-card text-concrete border-white/10 hover:border-white/30 hover:text-white'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Masonry / Grid Archive */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredImages.map((img, index) => (
          <div
            key={img.id}
            onClick={() => setActiveLightboxIndex(index)}
            className="group relative cursor-pointer overflow-hidden border border-white/10 bg-obsidian-card aspect-[4/3]"
          >
            <img
              src={img.url}
              alt={img.title}
              loading="lazy"
              className="w-full h-full object-cover object-center filter brightness-90 group-hover:scale-105 group-hover:brightness-100 transition-all duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

            {/* Hover overlay content */}
            <div className="absolute inset-0 p-6 flex flex-col justify-between opacity-90 group-hover:opacity-100 transition-opacity">
              <div className="flex justify-between items-start">
                <span className="label-architectural text-[9px] text-champagne px-2 py-0.5 bg-black/60 border border-champagne/20">
                  {img.categoryLabel}
                </span>
                <div className="w-8 h-8 rounded-full bg-black/60 border border-white/20 flex items-center justify-center text-concrete group-hover:text-champagne group-hover:border-champagne transition-colors">
                  <Maximize2 className="w-3.5 h-3.5" />
                </div>
              </div>

              <div>
                <h4 className="font-serif text-lg text-architectural-white group-hover:text-champagne-light transition-colors">
                  {img.title}
                </h4>
                <div className="flex items-center gap-1.5 text-[10px] text-concrete/70 font-mono mt-1">
                  <Compass className="w-3 h-3 text-champagne/60" />
                  <span>{img.locationContext}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Fullscreen Lightbox Modal */}
      {activeImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-xl p-4 md:p-8">
          
          {/* Close button */}
          <button
            onClick={() => setActiveLightboxIndex(null)}
            className="absolute top-6 right-6 z-20 p-3 rounded-full bg-obsidian border border-white/20 text-concrete hover:text-white hover:border-champagne transition-colors"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Nav arrows */}
          <button
            onClick={handlePrev}
            className="absolute left-4 md:left-8 z-20 p-3 rounded-full bg-obsidian/80 border border-white/20 text-concrete hover:text-white hover:border-champagne transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={handleNext}
            className="absolute right-4 md:right-8 z-20 p-3 rounded-full bg-obsidian/80 border border-white/20 text-concrete hover:text-white hover:border-champagne transition-colors"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Lightbox content */}
          <div className="max-w-5xl w-full max-h-[90vh] flex flex-col items-center">
            <div className="relative w-full max-h-[70vh] flex items-center justify-center overflow-hidden">
              <img
                src={activeImage.url}
                alt={activeImage.title}
                className="max-h-[70vh] max-w-full object-contain border border-white/10"
              />
            </div>

            {/* Caption bar */}
            <div className="w-full mt-4 p-4 bg-obsidian border border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <span className="label-architectural text-[10px] text-champagne block">{activeImage.categoryLabel}</span>
                <h3 className="font-serif text-xl text-architectural-white mt-0.5">{activeImage.title}</h3>
                <p className="text-xs text-concrete mt-1">{activeImage.caption}</p>
              </div>

              <div className="shrink-0">
                <button
                  onClick={() => {
                    setActiveLightboxIndex(null);
                    window.dispatchEvent(
                      new CustomEvent('open-private-presentation', {
                        detail: { config: activeImage.title, intent: 'VISUAL ARCHIVE CONSULTATION' }
                      })
                    );
                  }}
                  className="btn-luxury text-xs"
                >
                  REQUEST ARCHIVE DOSSIER
                </button>
              </div>
            </div>
          </div>

        </div>
      )}

    </div>
  );
}
