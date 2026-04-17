'use client';
import { useFunnelStore } from '@/store/funnel';
import type { DachTyp, Ausrichtung } from '@/types';
import { dachDaten, orientDaten, orientByDach } from '@/lib/data';
import OptionCard from '@/components/ui/OptionCard';
import CTAButton from '@/components/ui/CTAButton';
import BackButton from '@/components/ui/BackButton';

const dachOptions: { type: DachTyp; icon: React.ReactNode }[] = [
  { type: 'sattel', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}><path d="M2 12L12 4l10 8"/><path d="M4 12v8h16v-8"/></svg> },
  { type: 'flach',  icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}><rect x="2" y="9" width="20" height="11" rx="1"/><line x1="2" y1="9" x2="22" y2="9"/></svg> },
  { type: 'pult',   icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}><path d="M2 16L22 8"/><path d="M2 16v4h20V8"/></svg> },
  { type: 'walm',   icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}><path d="M12 4L2 10h20L12 4Z"/><path d="M4 10v10h16V10"/></svg> },
];

const orientConfigs: Record<Ausrichtung, { label: string; sub: string; warn?: boolean }> = {
  s:    { label: 'Süd',        sub: 'Optimal · 100 %' },
  ow:   { label: 'Ost / West', sub: 'Beide Seiten · 85 %' },
  o:    { label: 'Ost',        sub: '75 % Ertrag' },
  w:    { label: 'West',       sub: '75 % Ertrag' },
  n:    { label: 'Nord',       sub: 'Nicht empfohlen', warn: true },
  best: { label: 'Beste Seite', sub: 'Automatisch optimal' },
};

export default function Step2Dach() {
  const { dachtyp, ausrichtung, setDachtyp, setAusrichtung, setStep } = useFunnelStore();

  const isFlach = dachtyp === 'flach';
  const orientOptions = dachtyp ? orientByDach[dachtyp] : [];

  const handleDach = (type: DachTyp) => {
    setDachtyp(type);
    if (type === 'flach') setAusrichtung('s', 1.0, 100);
    if (type === 'walm')  setAusrichtung('best', 1.0, 75);
  };

  const handleOrient = (key: Ausrichtung) => {
    const od = orientDaten[key];
    let nutzPct = 50;
    if (dachtyp === 'flach') nutzPct = 100;
    else if (dachtyp === 'sattel') nutzPct = od.nutzSattel.filter(Boolean).length === 2 ? 100 : 50;
    else if (dachtyp === 'pult') nutzPct = od.nutzPult ? 100 : 5;
    else if (dachtyp === 'walm') nutzPct = key === 'best' ? 75 : Math.round(od.nutzWalm.length / 4 * 100);
    setAusrichtung(key, od.faktor, nutzPct);
  };

  const canProceed = !!dachtyp && (isFlach || !!ausrichtung);
  const ertragPct = ausrichtung ? Math.round(orientDaten[ausrichtung].faktor * 100) : null;
  const ertragColor = ertragPct && ertragPct >= 90 ? 'var(--accent)' : ertragPct && ertragPct >= 70 ? '#EF9F27' : '#E24B4A';

  return (
    <div>
      <BackButton onClick={() => setStep(1)} />
      <p className="step-eyebrow">Schritt 2 von 6</p>
      <h1 className="step-title">Wie ist Dein Dach beschaffen?</h1>
      <p className="step-sub">Dachtyp und Ausrichtung bestimmen, welche Fläche sich für PV lohnt.</p>

      <p style={{ fontSize: 12, fontWeight: 500, letterSpacing: '0.07em', textTransform: 'uppercase', color: 'var(--text-subtle)', marginBottom: 8 }}>Dachtyp</p>
      <div className="cards-grid" style={{ marginBottom: '1.25rem' }}>
        {dachOptions.map(o => (
          <OptionCard
            key={o.type}
            selected={dachtyp === o.type}
            onClick={() => handleDach(o.type)}
            icon={o.icon}
            label={dachDaten[o.type].label}
            sub={dachDaten[o.type].neigung}
          />
        ))}
      </div>

      {/* Ausrichtung */}
      {dachtyp && !isFlach && orientOptions.length > 0 && (
        <>
          <p style={{ fontSize: 12, fontWeight: 500, letterSpacing: '0.07em', textTransform: 'uppercase', color: 'var(--text-subtle)', marginBottom: 8 }}>Dachausrichtung</p>
          <div className={`orient-buttons ${orientOptions.length <= 1 ? 'single-col' : ''}`}>
            {orientOptions.map(key => {
              const cfg = orientConfigs[key];
              return (
                <button
                  key={key}
                  className={`orient-btn orient-btn-card ${ausrichtung === key ? 'selected' : ''} ${cfg.warn ? 'orient-warn' : ''}`}
                  onClick={() => handleOrient(key)}
                >
                  <span className="obc-label">{cfg.label}</span>
                  <span className="obc-sub">{cfg.sub}</span>
                </button>
              );
            })}
          </div>

          {ausrichtung && (
            <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 8, padding: '12px 14px', marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>Solarer Ertragsfaktor</span>
                <span style={{ fontSize: 15, fontWeight: 600, color: ertragColor }}>{ertragPct} %</span>
              </div>
              <div style={{ height: 5, background: 'var(--slider-track)', borderRadius: 3, overflow: 'hidden' }}>
                <div style={{ height: '100%', background: ertragColor, borderRadius: 3, width: `${ertragPct}%`, transition: 'width 0.4s, background 0.3s' }} />
              </div>
              <div style={{ fontSize: 11.5, color: 'var(--text-subtle)', marginTop: 6 }}>
                {orientDaten[ausrichtung].desc}
              </div>
            </div>
          )}
        </>
      )}

      {isFlach && (
        <div style={{ background: 'var(--bg-card-sel)', border: '1px solid var(--border-sel)', borderRadius: 8, padding: '12px 14px', marginBottom: '1.25rem', fontSize: 13, color: 'var(--text-secondary)' }}>
          Flachdächer ermöglichen freie Modulausrichtung — wir rechnen mit optimaler Südausrichtung.
        </div>
      )}

      <CTAButton enabled={canProceed} onClick={() => setStep(3)}>Weiter</CTAButton>
    </div>
  );
}
