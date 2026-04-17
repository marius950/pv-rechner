'use client';
import { useFunnelStore } from '@/store/funnel';
import { calcPV } from '@/lib/calc';
import OptionCard from '@/components/ui/OptionCard';
import CTAButton from '@/components/ui/CTAButton';
import BackButton from '@/components/ui/BackButton';

export default function Step5Speicher() {
  const { speicher, wallbox, setSpeicher, setWallbox, setStep, ...state } = useFunnelStore();
  const canProceed = !!speicher && !!wallbox;
  const pv = canProceed ? calcPV({ speicher, wallbox, ...state } as any) : null;

  return (
    <div>
      <BackButton onClick={() => setStep(4)} />
      <p className="step-eyebrow">Schritt 5 von 6</p>
      <h1 className="step-title">Planst Du Speicher oder Wallbox?</h1>
      <p className="step-sub">Beides erhöht Deinen Eigenverbrauch und damit die Ersparnis deutlich.</p>

      <p style={{ fontSize: 12, fontWeight: 500, letterSpacing: '0.07em', textTransform: 'uppercase', color: 'var(--text-subtle)', marginBottom: 8 }}>Batteriespeicher</p>
      <div className="cards-grid" style={{ marginBottom: '1.5rem' }}>
        <OptionCard
          selected={speicher === 'ja'}
          onClick={() => setSpeicher('ja')}
          icon={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}><rect x="6" y="4" width="12" height="16" rx="2"/><line x1="9" y1="4" x2="9" y2="2"/><line x1="15" y1="4" x2="15" y2="2"/><line x1="9" y1="12" x2="15" y2="12"/><line x1="12" y1="9" x2="12" y2="15"/></svg>}
          label="Ja, mit Speicher"
          sub="Bis zu 80 % Eigenverbrauch"
        />
        <OptionCard
          selected={speicher === 'nein'}
          onClick={() => setSpeicher('nein')}
          icon={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}><path d="M13 2L4.09 12.26c-.28.35-.42.52-.42.74 0 .5.41.91.91.91h7.42l-1 6.09 8.91-10.26c.28-.35.42-.52.42-.74 0-.5-.41-.91-.91-.91H12l1-6Z"/></svg>}
          label="Nein, ohne Speicher"
          sub="Ca. 30 % Eigenverbrauch"
        />
      </div>

      <p style={{ fontSize: 12, fontWeight: 500, letterSpacing: '0.07em', textTransform: 'uppercase', color: 'var(--text-subtle)', marginBottom: 8 }}>Wallbox / E-Auto</p>
      <div className="cards-grid" style={{ marginBottom: '1.5rem' }}>
        <OptionCard
          selected={wallbox === 'ja'}
          onClick={() => setWallbox('ja')}
          icon={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}><rect x="3" y="11" width="18" height="10" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/><circle cx="12" cy="16" r="1.5"/></svg>}
          label="Ja, Wallbox geplant"
          sub="+1.500–3.000 kWh Bedarf"
        />
        <OptionCard
          selected={wallbox === 'nein'}
          onClick={() => setWallbox('nein')}
          icon={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}><circle cx="12" cy="12" r="10"/><path d="M15 9l-6 6M9 9l6 6"/></svg>}
          label="Nein, kein E-Auto"
          sub="Nur Haushaltsstrom"
        />
      </div>

      {pv && (
        <div style={{ background: 'var(--bg-card-sel)', border: '1.5px solid var(--border-sel)', borderRadius: 'var(--radius-lg)', padding: '1rem 1.25rem', marginBottom: '1.5rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
            {[
              { label: 'Ersparnis/Jahr', val: `${pv.ersparnis.toLocaleString('de')} €`, accent: true },
              { label: 'Eigenverbrauch', val: `${pv.evPct} %`, accent: false },
              { label: 'Investition',    val: `ca. ${pv.invest.toLocaleString('de')} €`, accent: false },
            ].map(item => (
              <div key={item.label}>
                <div style={{ fontSize: 9, color: 'var(--text-subtle)', textTransform: 'uppercase', letterSpacing: '.05em', marginBottom: 3 }}>{item.label}</div>
                <div style={{ fontSize: 13, fontWeight: 600, color: item.accent ? 'var(--accent)' : 'var(--text-primary)' }}>{item.val}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      <CTAButton enabled={canProceed} onClick={() => setStep(6)}>Zur Auswertung</CTAButton>
    </div>
  );
}
