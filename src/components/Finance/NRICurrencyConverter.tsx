import { useState } from 'react';

interface CurrencyConfig {
  code: string;
  symbol: string;
  name: string;
  rateToINR: number; // 1 Foreign Unit = X INR
  locale: string;
}

const currencies: CurrencyConfig[] = [
  { code: 'USD', symbol: '$', name: 'US Dollar', rateToINR: 87.5, locale: 'en-US' },
  { code: 'AED', symbol: 'AED ', name: 'UAE Dirham', rateToINR: 23.8, locale: 'en-AE' },
  { code: 'SGD', symbol: 'S$', name: 'Singapore Dollar', rateToINR: 65.5, locale: 'en-SG' },
  { code: 'GBP', symbol: '£', name: 'British Pound', rateToINR: 111.5, locale: 'en-GB' },
  { code: 'EUR', symbol: '€', name: 'Euro', rateToINR: 95.0, locale: 'en-DE' }
];

const investmentTiers = [
  { name: '2 BHK Contemporary', inrPrice: 12900000, carpet: '815 sq.ft.', annualRentalINR: 480000 },
  { name: '3 BHK Riverside', inrPrice: 17500000, carpet: '1,180 sq.ft.', annualRentalINR: 650000 },
  { name: '3 BHK Sky Duplex', inrPrice: 22500000, carpet: '1,660 sq.ft.', annualRentalINR: 950000 },
  { name: '4 BHK Grand Estate', inrPrice: 28500000, carpet: '2,050 sq.ft.', annualRentalINR: 1250000 }
];

export default function NRICurrencyConverter() {
  const [selectedCurrencyCode, setSelectedCurrencyCode] = useState('USD');
  const [selectedTierIdx, setSelectedTierIdx] = useState(1); // default 3 BHK

  const currentCurrency = currencies.find((c) => c.code === selectedCurrencyCode) || currencies[0];
  const currentTier = investmentTiers[selectedTierIdx];

  // Calculations in Foreign Currency
  const priceInForeign = Math.round(currentTier.inrPrice / currentCurrency.rateToINR);
  const annualRentalInForeign = Math.round(currentTier.annualRentalINR / currentCurrency.rateToINR);
  const monthlyRentalInForeign = Math.round(annualRentalInForeign / 12);
  
  // 5-Year Capital Appreciation at ~12% CAGR
  const fiveYearProjectedINR = Math.round(currentTier.inrPrice * Math.pow(1.12, 5));
  const fiveYearProjectedForeign = Math.round(fiveYearProjectedINR / currentCurrency.rateToINR);
  const projectedCapitalGainForeign = fiveYearProjectedForeign - priceInForeign;

  function formatForeign(val: number): string {
    return `${currentCurrency.symbol}${val.toLocaleString(currentCurrency.locale)}`;
  }

  function formatINR(val: number): string {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(val);
  }

  const whatsappText = encodeURIComponent(
    `Hello Mantra Meridian NRI Desk, I am inquiring from overseas about ${currentTier.name} (${currentTier.carpet}). Price: ${formatINR(currentTier.inrPrice)} (~${formatForeign(priceInForeign)}). Please share FEMA guidelines, NRE/NRO payment details, and schedule a virtual walkthrough.`
  );

  return (
    <div className="w-full bg-obsidian-card/90 border border-champagne/30 p-6 md:p-10 space-y-8 backdrop-blur-xl shadow-2xl relative overflow-hidden">
      {/* Glow Effect */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-champagne/5 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Header */}
      <div className="border-b border-white/10 pb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="label-architectural text-xs text-champagne">GLOBAL NRI WEALTH ADVISORY</span>
          <h3 className="font-serif text-2xl md:text-3xl text-architectural-white mt-1">
            Foreign Currency Purchasing Power &amp; Yield Radar
          </h3>
          <p className="text-xs text-concrete/80 mt-1 max-w-xl">
            Evaluate rupee asset acquisition costs, gross rental earnings, and 5-year capital appreciation in your home currency.
          </p>
        </div>

        {/* Currency Switcher */}
        <div className="flex flex-wrap items-center gap-2">
          {currencies.map((c) => (
            <button
              key={c.code}
              type="button"
              onClick={() => setSelectedCurrencyCode(c.code)}
              className={`px-3.5 py-1.5 text-xs font-mono tracking-wider transition-all duration-300 rounded border ${
                selectedCurrencyCode === c.code
                  ? 'border-champagne bg-champagne text-obsidian font-semibold shadow-[0_0_12px_rgba(223,183,90,0.3)]'
                  : 'border-white/10 bg-obsidian-surface/60 text-concrete hover:border-champagne/40'
              }`}
            >
              {c.code}
            </button>
          ))}
        </div>
      </div>

      {/* Residence Selection Pills */}
      <div className="space-y-3">
        <label className="text-xs font-mono uppercase tracking-wider text-architectural-white font-medium block">
          Select Property Format:
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {investmentTiers.map((t, idx) => (
            <button
              key={t.name}
              type="button"
              onClick={() => setSelectedTierIdx(idx)}
              className={`p-4 text-left border rounded transition-all duration-300 ${
                selectedTierIdx === idx
                  ? 'border-champagne bg-champagne/15 text-architectural-white shadow-[0_0_15px_rgba(223,183,90,0.15)]'
                  : 'border-white/10 bg-obsidian-surface/60 text-concrete/80 hover:border-champagne/40'
              }`}
            >
              <div className="text-xs font-medium text-architectural-white">{t.name}</div>
              <div className="text-[11px] font-mono text-concrete/60">{t.carpet}</div>
              <div className="text-xs font-mono text-champagne font-semibold mt-2">
                {formatINR(t.inrPrice)}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Live Financial Metrics Matrix */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-6 bg-obsidian-deep/90 border border-champagne/20 rounded-lg">
        
        <div className="space-y-1">
          <span className="text-[10px] font-mono uppercase text-concrete/60 block">Asset Value ({currentCurrency.code})</span>
          <span className="font-serif text-3xl text-architectural-white font-medium">{formatForeign(priceInForeign)}</span>
          <span className="text-[10px] text-concrete/50 block">Equivalent to {formatINR(currentTier.inrPrice)}</span>
        </div>

        <div className="space-y-1">
          <span className="text-[10px] font-mono uppercase text-concrete/60 block">Est. Monthly Rental</span>
          <span className="font-serif text-3xl text-champagne font-medium">{formatForeign(monthlyRentalInForeign)}</span>
          <span className="text-[10px] text-concrete/50 block">~4.3% Gross Annual Yield</span>
        </div>

        <div className="space-y-1">
          <span className="text-[10px] font-mono uppercase text-concrete/60 block">5-Year Projected Value</span>
          <span className="font-serif text-3xl text-emerald-400 font-medium">{formatForeign(fiveYearProjectedForeign)}</span>
          <span className="text-[10px] text-concrete/50 block">At 12% Projected West Pune CAGR</span>
        </div>

        <div className="space-y-1">
          <span className="text-[10px] font-mono uppercase text-concrete/60 block">Projected Capital Gain</span>
          <span className="font-serif text-3xl text-emerald-400 font-medium">+{formatForeign(projectedCapitalGainForeign)}</span>
          <span className="text-[10px] text-concrete/50 block">Cumulative 5-Year Equity Upside</span>
        </div>

      </div>

      {/* Regulatory Compliance Guidance Strip */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-concrete/70 leading-relaxed pt-2">
        <div className="p-4 bg-obsidian-surface/60 border border-white/5 space-y-1">
          <span className="text-[10px] font-mono text-champagne uppercase block">FEMA &amp; RBI Compliance</span>
          <p className="text-[11px]">NRIs and OCIs can freely acquire residential properties in India with zero prior RBI permission required under general permission.</p>
        </div>
        <div className="p-4 bg-obsidian-surface/60 border border-white/5 space-y-1">
          <span className="text-[10px] font-mono text-champagne uppercase block">NRE / NRO Banking Channels</span>
          <p className="text-[11px]">Funds can be channeled directly via outward remittances or from NRE/NRO accounts through authorized Indian banking partners.</p>
        </div>
        <div className="p-4 bg-obsidian-surface/60 border border-white/5 space-y-1">
          <span className="text-[10px] font-mono text-champagne uppercase block">100% Repatriation Security</span>
          <p className="text-[11px]">Capital investment equivalent to foreign exchange remitted is 100% repatriable under standard FEMA regulations.</p>
        </div>
      </div>

      {/* CTA Footer */}
      <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-[11px] text-concrete/60 leading-tight">
          Exchange rates applied: 1 {currentCurrency.code} = ₹{currentCurrency.rateToINR}. Indicative forecasts for strategic advisory.
        </div>
        <a
          href={`https://wa.me/917744009295?text=${whatsappText}`}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-luxury text-xs px-6 py-3 whitespace-nowrap w-full sm:w-auto text-center flex items-center justify-center gap-2"
        >
          <span>CONNECT WITH NRI DESK ON WHATSAPP</span>
          <span>↗</span>
        </a>
      </div>

    </div>
  );
}
