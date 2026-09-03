import { useState, useEffect, type SyntheticEvent } from 'react';
import { X, ArrowRight, ShieldCheck, Phone, Calendar, Sparkles } from 'lucide-react';

interface PrivatePresentationDrawerProps {
  initialConfig?: string;
}

export default function PrivatePresentationDrawer({ initialConfig }: PrivatePresentationDrawerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [selectedResidence, setSelectedResidence] = useState<string>(initialConfig || '3 BHK');
  const [selectedIntent, setSelectedIntent] = useState<string>('PRICE & INVENTORY');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [preferredSlot, setPreferredSlot] = useState('Morning (10am – 1pm)');
  const [honeypot, setHoneypot] = useState(''); // Anti-spam
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const handleOpen = (e: CustomEvent<{ config?: string; intent?: string }>) => {
      if (e.detail?.config) setSelectedResidence(e.detail.config);
      if (e.detail?.intent) setSelectedIntent(e.detail.intent);
      setStep(1);
      setIsSuccess(false);
      setErrorMessage('');
      setIsOpen(true);
      document.body.style.overflow = 'hidden';
    };

    window.addEventListener('open-private-presentation' as any, handleOpen);
    return () => {
      window.removeEventListener('open-private-presentation' as any, handleOpen);
    };
  }, []);

  const closeDrawer = () => {
    setIsOpen(false);
    document.body.style.overflow = 'auto';
  };

  const residencesOptions = [
    { label: '2 BEDROOM', sub: '785 – 845 sq.ft. Contemporary' },
    { label: '3 BEDROOM', sub: '1,120 – 1,240 sq.ft. Riverside' },
    { label: '3 BEDROOM DUPLEX', sub: '1,580 – 1,740 sq.ft. Two-Level' },
    { label: '4 BEDROOM', sub: '1,920 – 2,180 sq.ft. Grand Estate' },
    { label: 'NOT SURE YET', sub: 'Explore all configurations' }
  ];

  const intentOptions = [
    { label: 'PRICE & INVENTORY', desc: 'Detailed pricing breakdowns & current availability' },
    { label: 'FLOOR PLANS', desc: 'Architectural layout portfolio & dimensions' },
    { label: 'PRIVATE SITE VISIT', desc: 'Experience the 8-acre riverside estate firsthand' },
    { label: 'DIGITAL BROCHURE', desc: 'Download 48-page architectural monograph' },
    { label: 'DIRECT CONSULTATION', desc: 'Speak with our senior residence advisor' }
  ];

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    if (!fullName || !phone) {
      setErrorMessage('Please provide your name and phone number.');
      return;
    }

    // Honeypot spam protection check
    if (honeypot) {
      setIsSuccess(true);
      return;
    }

    setIsSubmitting(true);
    setErrorMessage('');

    try {
      const response = await fetch('/api/enquiry', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          fullName,
          phone,
          email,
          selectedResidence,
          selectedIntent,
          preferredSlot,
          landingPage: window.location.pathname,
          referrer: document.referrer || 'direct',
          timestamp: new Date().toISOString()
        })
      });

      const result = await response.json();
      if (response.ok && result.success) {
        setIsSuccess(true);
      } else {
        setErrorMessage(result.error || 'Unable to register enquiry. Please try again.');
      }
    } catch (err) {
      // In case offline / worker local dev
      setIsSuccess(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end">
      {/* Dimmed backdrop with blur */}
      <div 
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity duration-500"
        onClick={closeDrawer}
      />

      {/* Slide-in luxury drawer panel */}
      <div className="relative z-10 h-full w-full max-w-lg bg-obsidian-deep border-l border-champagne/20 p-5 md:p-8 overflow-y-auto flex flex-col justify-between shadow-luxury">
        
        {/* Header */}
        <div>
          <div className="flex items-center justify-between pb-4 border-b border-white/10">
            <div>
              <span className="label-architectural text-[10px] tracking-luxury text-champagne">PRIVATE CONCIERGE</span>
              <h2 className="font-serif text-xl md:text-2xl text-architectural-white mt-1">Request a Presentation</h2>
            </div>
            <button 
              onClick={closeDrawer}
              className="p-2 rounded-full border border-white/10 text-concrete hover:text-architectural-white hover:border-champagne/40 transition-colors"
              aria-label="Close presentation drawer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Progress Indicators */}
          {!isSuccess && (
            <div className="flex items-center gap-2 my-4">
              {[1, 2, 3].map((idx) => (
                <div 
                  key={idx} 
                  className={`h-0.5 flex-1 transition-all duration-500 ${
                    step >= idx ? 'bg-champagne' : 'bg-white/10'
                  }`}
                />
              ))}
            </div>
          )}

          {/* Step 1: Residence Selection */}
          {!isSuccess && step === 1 && (
            <div className="space-y-4 pt-1">
              <div>
                <p className="label-architectural text-[9.5px] text-concrete">STEP 01 OF 03</p>
                <h3 className="font-serif text-lg md:text-xl text-architectural-white mt-0.5">Which residence interests you?</h3>
                <p className="text-xs text-concrete/80 mt-0.5">Select the configuration you would like to explore today.</p>
              </div>

              <div className="space-y-2">
                {residencesOptions.map((res) => (
                  <button
                    key={res.label}
                    type="button"
                    onClick={() => setSelectedResidence(res.label)}
                    className={`w-full text-left py-2.5 px-3.5 rounded-none border transition-all flex items-center justify-between ${
                      selectedResidence === res.label
                        ? 'border-champagne bg-champagne/10 text-architectural-white shadow-glow'
                        : 'border-white/10 bg-obsidian-card/40 text-concrete hover:border-white/30 hover:text-architectural-white'
                    }`}
                  >
                    <div>
                      <div className="font-medium text-xs sm:text-sm tracking-wider">{res.label}</div>
                      <div className="text-[11px] text-concrete/70 mt-0.5">{res.sub}</div>
                    </div>
                    {selectedResidence === res.label && (
                      <div className="w-2 h-2 rounded-full bg-champagne shrink-0" />
                    )}
                  </button>
                ))}
              </div>

              <button
                type="button"
                onClick={() => setStep(2)}
                className="w-full mt-3 py-2.5 px-4 text-xs font-medium tracking-[0.16em] uppercase bg-architectural-white text-obsidian hover:bg-champagne transition-all duration-300 flex items-center justify-center gap-2 shadow-sm"
              >
                <span>CONTINUE TO INTENT</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {/* Step 2: Intent Selection */}
          {!isSuccess && step === 2 && (
            <div className="space-y-4 pt-1">
              <div>
                <div className="flex items-center justify-between">
                  <p className="label-architectural text-[9.5px] text-concrete">STEP 02 OF 03</p>
                  <button 
                    type="button" 
                    onClick={() => setStep(1)} 
                    className="text-xs text-champagne hover:underline tracking-widest uppercase font-mono"
                  >
                    ← Back
                  </button>
                </div>
                <h3 className="font-serif text-lg md:text-xl text-architectural-white mt-0.5">What would you like to explore?</h3>
                <p className="text-xs text-concrete/80 mt-0.5">We tailor the documentation specifically to your preferences.</p>
              </div>

              <div className="space-y-2">
                {intentOptions.map((intent) => (
                  <button
                    key={intent.label}
                    type="button"
                    onClick={() => setSelectedIntent(intent.label)}
                    className={`w-full text-left py-2.5 px-3.5 rounded-none border transition-all flex items-center justify-between ${
                      selectedIntent === intent.label
                        ? 'border-champagne bg-champagne/10 text-architectural-white shadow-glow'
                        : 'border-white/10 bg-obsidian-card/40 text-concrete hover:border-white/30 hover:text-architectural-white'
                    }`}
                  >
                    <div>
                      <div className="font-medium text-xs sm:text-sm tracking-wider">{intent.label}</div>
                      <div className="text-[11px] text-concrete/70 mt-0.5">{intent.desc}</div>
                    </div>
                    {selectedIntent === intent.label && (
                      <div className="w-2 h-2 rounded-full bg-champagne shrink-0" />
                    )}
                  </button>
                ))}
              </div>

              <div className="flex gap-2.5 pt-1">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="py-2.5 px-4 text-xs tracking-wider uppercase font-medium border border-champagne/40 text-architectural-white hover:bg-champagne/10 flex-1 transition-colors"
                >
                  PREVIOUS
                </button>
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="py-2.5 px-4 text-xs tracking-[0.14em] uppercase font-medium bg-architectural-white text-obsidian hover:bg-champagne flex-1 flex items-center justify-center gap-2 transition-colors shadow-sm"
                >
                  <span>SCHEDULE PRESENTATION</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Contact & Concierge Dispatch */}
          {!isSuccess && step === 3 && (
            <form onSubmit={handleSubmit} className="space-y-5 pt-2">
              <div>
                <div className="flex items-center justify-between">
                  <p className="label-architectural text-xs text-concrete">STEP 03 OF 03</p>
                  <button 
                    type="button" 
                    onClick={() => setStep(2)} 
                    className="text-xs text-champagne hover:underline tracking-widest uppercase"
                  >
                    Back
                  </button>
                </div>
                <h3 className="font-serif text-xl md:text-2xl text-architectural-white mt-1">Confidential Information</h3>
                <p className="text-xs text-concrete mt-1">
                  Selected: <span className="text-champagne font-medium">{selectedResidence}</span> • <span className="text-champagne font-medium">{selectedIntent}</span>
                </p>
              </div>

              {/* Honeypot field for anti-bot mitigation */}
              <input 
                type="text" 
                name="website_url_check" 
                value={honeypot} 
                onChange={(e) => setHoneypot(e.target.value)} 
                className="hidden" 
                tabIndex={-1} 
                autoComplete="off"
              />

              <div className="space-y-3">
                <div>
                  <label className="block text-[11px] uppercase tracking-widest text-concrete mb-1 font-medium">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Vikram Malhotra"
                    className="w-full bg-obsidian-surface border border-white/10 px-3.5 py-2 text-architectural-white text-xs focus:outline-none focus:border-champagne transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-widest text-concrete mb-1 font-medium">
                    Mobile Number *
                  </label>
                  <div className="flex">
                    <span className="inline-flex items-center px-2.5 border border-r-0 border-white/10 bg-obsidian text-concrete text-xs font-mono">
                      +91
                    </span>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="98230 12345"
                      className="w-full bg-obsidian-surface border border-white/10 px-3.5 py-2 text-architectural-white text-xs focus:outline-none focus:border-champagne transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-widest text-concrete mb-1 font-medium">
                    Email Address (Optional)
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="vikram@example.com"
                    className="w-full bg-obsidian-surface border border-white/10 px-3.5 py-2 text-architectural-white text-xs focus:outline-none focus:border-champagne transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-widest text-concrete mb-1 font-medium">
                    Preferred Time For Consultation
                  </label>
                  <select
                    value={preferredSlot}
                    onChange={(e) => setPreferredSlot(e.target.value)}
                    className="w-full bg-obsidian-surface border border-white/10 px-3.5 py-2 text-architectural-white text-xs focus:outline-none focus:border-champagne transition-colors"
                  >
                    <option value="Morning (10am – 1pm)">Morning (10:00 AM – 01:00 PM)</option>
                    <option value="Afternoon (1pm – 5pm)">Afternoon (01:00 PM – 05:00 PM)</option>
                    <option value="Evening (5pm – 8pm)">Evening (05:00 PM – 08:00 PM)</option>
                    <option value="Weekend Priority">Weekend Priority Visit</option>
                  </select>
                </div>
              </div>

              {errorMessage && (
                <div className="p-2.5 bg-red-950/40 border border-red-800 text-xs text-red-200">
                  {errorMessage}
                </div>
              )}

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-2.5 px-4 text-xs font-medium tracking-[0.14em] uppercase bg-architectural-white text-obsidian hover:bg-champagne transition-all duration-300 flex items-center justify-center gap-2 relative shadow-glow"
                >
                  {isSubmitting ? (
                    <span>DISPATCHING CONCIERGE...</span>
                  ) : (
                    <>
                      <span>CONFIRM PRIVATE PRESENTATION</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </div>

              <div className="flex items-center gap-2 text-[11px] text-concrete/70 pt-2">
                <ShieldCheck className="w-4 h-4 text-champagne shrink-0" />
                <span>Zero spam guarantee. Your contact details remain confidential and managed exclusively by Mantra Properties.</span>
              </div>
            </form>
          )}

          {/* Success State */}
          {isSuccess && (
            <div className="text-center py-12 space-y-6">
              <div className="w-16 h-16 rounded-full bg-champagne/10 border border-champagne flex items-center justify-center mx-auto text-champagne">
                <Sparkles className="w-8 h-8" />
              </div>

              <div>
                <span className="label-architectural text-xs text-champagne">RESERVATION CONFIRMED</span>
                <h3 className="font-serif text-3xl text-architectural-white mt-2">We’ll take it from here.</h3>
                <p className="text-sm text-concrete max-w-md mx-auto mt-3 leading-relaxed">
                  Thank you, <span className="text-architectural-white font-medium">{fullName || 'Esteemed Guest'}</span>. Your request for <span className="text-champagne font-medium">{selectedResidence}</span> ({selectedIntent}) has been transmitted to the Senior Meridian Concierge.
                </p>
              </div>

              <div className="bg-obsidian-surface border border-champagne/20 p-5 max-w-md mx-auto text-left space-y-2">
                <div className="flex items-center gap-3 text-xs text-concrete">
                  <Phone className="w-4 h-4 text-champagne" />
                  <span>A dedicated relationship director will contact you shortly.</span>
                </div>
                <div className="flex items-center gap-3 text-xs text-concrete">
                  <Calendar className="w-4 h-4 text-champagne" />
                  <span>Selected Window: {preferredSlot}</span>
                </div>
              </div>

              <button
                type="button"
                onClick={closeDrawer}
                className="btn-luxury-outline text-xs"
              >
                RETURN TO PROPERTY EXPERIENCE
              </button>
            </div>
          )}
        </div>

        {/* Footer info strip */}
        <div className="pt-6 mt-8 border-t border-white/10 flex items-center justify-between text-[11px] text-concrete/60">
          <span>MAHARERA: P52100045688</span>
          <span>BALEWADI, PUNE</span>
        </div>
      </div>
    </div>
  );
}
