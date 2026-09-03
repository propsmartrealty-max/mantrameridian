import { useState, useMemo } from 'react';

interface PresetConfig {
  label: string;
  price: number;
}

const PRESETS: PresetConfig[] = [
  { label: '2 BHK (₹85L)', price: 8500000 },
  { label: '3 BHK (₹1.28 Cr)', price: 12800000 },
  { label: '3 BHK Duplex (₹1.85 Cr)', price: 18500000 },
  { label: '4 BHK (₹2.40 Cr)', price: 24000000 },
];

export default function EMICalculator() {
  const [propertyPrice, setPropertyPrice] = useState<number>(12800000); // 1.28 Cr default
  const [downPaymentPct, setDownPaymentPct] = useState<number>(20); // 20%
  const [tenureYears, setTenureYears] = useState<number>(20); // 20 years
  const [interestRate, setInterestRate] = useState<number>(8.5); // 8.5%

  const calculations = useMemo(() => {
    const downPayment = Math.round(propertyPrice * (downPaymentPct / 100));
    const loanPrincipal = Math.max(0, propertyPrice - downPayment);
    const monthlyRate = (interestRate / 12) / 100;
    const totalMonths = tenureYears * 12;

    let monthlyEmi = 0;
    if (loanPrincipal > 0 && monthlyRate > 0) {
      const emiFactor = Math.pow(1 + monthlyRate, totalMonths);
      monthlyEmi = Math.round((loanPrincipal * monthlyRate * emiFactor) / (emiFactor - 1));
    }

    const totalPayment = monthlyEmi * totalMonths;
    const totalInterest = Math.max(0, totalPayment - loanPrincipal);
    const principalRatio = totalPayment > 0 ? (loanPrincipal / totalPayment) * 100 : 50;

    return {
      downPayment,
      loanPrincipal,
      monthlyEmi,
      totalPayment,
      totalInterest,
      principalRatio,
    };
  }, [propertyPrice, downPaymentPct, tenureYears, interestRate]);

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(val);
  };

  const handleLoanEnquiry = () => {
    window.dispatchEvent(
      new CustomEvent('open-private-presentation', {
        detail: {
          config: `EMI Query: ${formatCurrency(propertyPrice)} (EMI: ${formatCurrency(calculations.monthlyEmi)}/mo)`,
          intent: 'HOME LOAN PRE-APPROVAL ASSISTANCE',
        },
      })
    );
  };

  return (
    <div className="w-full glass-card-luxury p-6 sm:p-10 border border-champagne/30 shadow-luxury-gold relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-champagne/5 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="flex flex-col lg:flex-row gap-10 items-start justify-between">
        
        {/* Left: Interactive Controls */}
        <div className="w-full lg:w-3/5 space-y-7">
          
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-champagne animate-pulse" />
              <span className="text-xs font-mono uppercase tracking-[0.16em] text-champagne font-semibold">
                FINANCIAL PRECISION &amp; HOME LOAN PLANNER
              </span>
            </div>
            <h3 className="font-display text-2xl sm:text-3xl text-gradient-pearl font-normal">
              Mortgage &amp; Investment Estimator
            </h3>
            <p className="text-xs text-concrete mt-1">
              Simulate monthly EMIs, down payments, and bank interest across all residence formats at Mantra Meridian Riverside.
            </p>
          </div>

          {/* Configuration Presets */}
          <div className="space-y-2">
            <span className="text-[11px] font-mono uppercase tracking-wider text-concrete/70 block">
              Quick Configuration Presets
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {PRESETS.map((p) => (
                <button
                  key={p.label}
                  type="button"
                  onClick={() => setPropertyPrice(p.price)}
                  className={`px-3 py-2 text-xs font-mono text-center border transition-all duration-300 min-h-[44px] flex items-center justify-center ${
                    propertyPrice === p.price
                      ? 'border-champagne bg-champagne/15 text-champagne font-semibold shadow-glow'
                      : 'border-white/10 bg-obsidian-surface/60 text-concrete hover:border-champagne/40'
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          {/* Slider 1: Property Value */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <label className="text-concrete font-mono uppercase tracking-wider">Property Value</label>
              <span className="text-champagne font-mono font-semibold text-sm">
                {formatCurrency(propertyPrice)}
              </span>
            </div>
            <input
              type="range"
              min={7500000}
              max={30000000}
              step={250000}
              value={propertyPrice}
              onChange={(e) => setPropertyPrice(Number(e.target.value))}
              className="w-full h-2 bg-obsidian-border rounded-lg appearance-none cursor-pointer accent-champagne"
            />
            <div className="flex justify-between text-[10px] text-concrete/60 font-mono">
              <span>₹75 Lakhs</span>
              <span>₹1.85 Cr</span>
              <span>₹3.00 Cr</span>
            </div>
          </div>

          {/* Slider 2: Down Payment */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <label className="text-concrete font-mono uppercase tracking-wider">Down Payment ({downPaymentPct}%)</label>
              <span className="text-architectural-white font-mono font-medium">
                {formatCurrency(calculations.downPayment)}
              </span>
            </div>
            <input
              type="range"
              min={10}
              max={50}
              step={5}
              value={downPaymentPct}
              onChange={(e) => setDownPaymentPct(Number(e.target.value))}
              className="w-full h-2 bg-obsidian-border rounded-lg appearance-none cursor-pointer accent-champagne"
            />
            <div className="flex justify-between text-[10px] text-concrete/60 font-mono">
              <span>10% (₹{((propertyPrice * 0.1) / 100000).toFixed(1)}L)</span>
              <span>30%</span>
              <span>50%</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Slider 3: Loan Tenure */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <label className="text-concrete font-mono uppercase tracking-wider">Loan Tenure</label>
                <span className="text-architectural-white font-mono font-medium">{tenureYears} Years</span>
              </div>
              <input
                type="range"
                min={5}
                max={30}
                step={1}
                value={tenureYears}
                onChange={(e) => setTenureYears(Number(e.target.value))}
                className="w-full h-2 bg-obsidian-border rounded-lg appearance-none cursor-pointer accent-champagne"
              />
              <div className="flex justify-between text-[10px] text-concrete/60 font-mono">
                <span>5 Yrs</span>
                <span>20 Yrs</span>
                <span>30 Yrs</span>
              </div>
            </div>

            {/* Slider 4: Interest Rate */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <label className="text-concrete font-mono uppercase tracking-wider">Interest Rate</label>
                <span className="text-champagne font-mono font-semibold">{interestRate.toFixed(1)}% p.a.</span>
              </div>
              <input
                type="range"
                min={7.5}
                max={11.0}
                step={0.1}
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                className="w-full h-2 bg-obsidian-border rounded-lg appearance-none cursor-pointer accent-champagne"
              />
              <div className="flex justify-between text-[10px] text-concrete/60 font-mono">
                <span>7.5% (SBI/HDFC)</span>
                <span>9.0%</span>
                <span>11.0%</span>
              </div>
            </div>
          </div>

        </div>

        {/* Right: Summary Panel & Conversion Card */}
        <div className="w-full lg:w-2/5 p-6 sm:p-8 bg-obsidian-surface/90 border border-champagne/35 rounded-none flex flex-col justify-between space-y-6">
          
          <div className="space-y-4">
            <span className="text-[10px] font-mono tracking-[0.2em] text-champagne uppercase block">
              ESTIMATED MONTHLY COMMITMENT
            </span>

            <div>
              <span className="font-display text-3xl sm:text-4xl lg:text-5xl text-gradient-pearl font-medium block">
                {formatCurrency(calculations.monthlyEmi)}
              </span>
              <span className="text-xs text-concrete/70 font-mono mt-1 block">
                per month for {tenureYears} years
              </span>
            </div>

            {/* Visual Ratio Bar */}
            <div className="space-y-1.5 pt-2">
              <div className="h-2 w-full bg-obsidian-card rounded-full overflow-hidden flex">
                <div
                  style={{ width: `${calculations.principalRatio}%` }}
                  className="h-full bg-champagne transition-all duration-300"
                />
                <div
                  style={{ width: `${100 - calculations.principalRatio}%` }}
                  className="h-full bg-landscape-emerald transition-all duration-300"
                />
              </div>
              <div className="flex justify-between text-[10px] font-mono text-concrete">
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-champagne inline-block" />
                  Principal ({calculations.principalRatio.toFixed(0)}%)
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-landscape-emerald inline-block" />
                  Interest ({(100 - calculations.principalRatio).toFixed(0)}%)
                </span>
              </div>
            </div>

            {/* Breakdown Grid */}
            <div className="pt-3 border-t border-white/10 space-y-2 text-xs font-mono">
              <div className="flex justify-between text-concrete">
                <span>Principal Loan Amount:</span>
                <span className="text-architectural-white font-medium">{formatCurrency(calculations.loanPrincipal)}</span>
              </div>
              <div className="flex justify-between text-concrete">
                <span>Total Interest Payable:</span>
                <span className="text-champagne">{formatCurrency(calculations.totalInterest)}</span>
              </div>
              <div className="flex justify-between text-concrete">
                <span>Total Amount Payable:</span>
                <span className="text-architectural-white font-semibold">{formatCurrency(calculations.totalPayment)}</span>
              </div>
            </div>

            {/* Bank Approvals Badge */}
            <div className="p-3 bg-obsidian-card border border-white/5 text-[11px] text-concrete/80 font-mono flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>Approved by SBI, HDFC, ICICI, Axis Bank &amp; Bank of Baroda</span>
            </div>
          </div>

          <div className="space-y-2 pt-2">
            <button
              type="button"
              onClick={handleLoanEnquiry}
              className="btn-luxury w-full text-xs min-h-[48px] glass-sheen"
            >
              <span>APPLY FOR PRE-APPROVED LOAN</span>
              <span>↗</span>
            </button>
            <p className="text-[10px] text-concrete/50 text-center font-mono">
              *Calculations are indicative. Actual rates subject to bank underwriting &amp; CIBIL score.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}
