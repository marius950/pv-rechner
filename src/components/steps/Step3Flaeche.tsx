'use client';
import { useFunnelStore } from '@/store/funnel';
import { calcDachflaeche } from '@/lib/calc';
import { hausDaten } from '@/lib/data';
import CTAButton from '@/components/ui/CTAButton';
import BackButton from '@/components/ui/BackButton';

export default function Step3Flaeche() {
  const { wohnflaeche, geschosse, haustyp, nutzPct, setWohnflaeche, setGeschosse, setStep } = useFunnelStore();

  const faktor = hausDaten[haustyp ?? 'efh']?.faktor ?? 1.0;
  const { gesamt, nutzbar, module, kwp } = calcDachflaeche(wohnflaeche, geschosse, haustyp ?? 'efh', faktor, nutzPct);

  return (
    <div>
      <BackButton onClick={() => setStep(2)} />
      <p className="step-eyebrow">Schritt 3 von 6</p>
      <h1 className="step-title">Wie groß ist Dein Haus?</h1>
      <p className="step-sub">Daraus berechnen wir Deine nutzbare Dachfläche für die PV-Anlage.</p>

      <div className="slider-block">
        <div className="slider-header">
          <span className="slider-label">Wohnfläche</span>
          <div className="slider-val">{wohnflaeche}<span>m²</span></div>
        </div>
        <input type="range" min={40} max={400} step={5} value={wohnflaeche} onChange={e => setWohnflaeche(Number(e.target.value))} />
        <div className="slider-range"><span>40 m²</span><span>400 m²</span></div>
      </div>

      <div className="slider-block">
        <div className="slider-header">
          <span className="slider-label">Anzahl Geschosse</span>
          <div className="slider-val">{geschosse}<span>OG</span></div>
        </div>
        <input type="range" min={1} max={4} step={1} value={geschosse} onChange={e => setGeschosse(Number(e.target.value))} />
        <div className="slider-range"><span>1</span><span>4</span></div>
      </div>

      <div className="result-preview">
        <div className="result-preview-label">Berechnete Dachfläche</div>
        <div className="result-preview-val">
          {nutzbar}<span>m²</span>
        </div>
        <div className="result-preview-sub">
          {gesamt} m² Dach × 80 % nutzbar × {nutzPct} % PV-sinnvoll → {module} Module → {kwp} kWp
        </div>
      </div>

      <CTAButton enabled onClick={() => setStep(4)}>Weiter</CTAButton>
    </div>
  );
}
