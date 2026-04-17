'use client';
import { useFunnelStore } from '@/store/funnel';
import { calcPV, fmtDE } from '@/lib/calc';
import { hausDaten, dachDaten } from '@/lib/data';
import CTAButton from '@/components/ui/CTAButton';

export default function StepResult() {
  const state = useFunnelStore();
  const pv = calcPV(state as any);
  const ht = hausDaten[state.haustyp ?? 'efh'];
  const dt = state.dachtyp ? dachDaten[state.dachtyp] : null;

  const foerder = [
    { label: 'KfW 270 – Erneuerbare Energien', sub: 'Zinsgünstiger Kredit bis 150.000 €', color: 'var(--accent)' },
    { label: 'KfW 442 – Solarstrom für Elektroautos', sub: state.wallbox === 'ja' ? 'Bis zu 10.200 € Zuschuss' : 'Relevant wenn Du ein E-Auto planst', color: state.wallbox === 'ja' ? 'var(--accent)' : 'var(--text-subtle)' },
    { label: `Einspeisevergütung ${fmtDE(Math.round(pv.einspKwh * 0.082))} €/Jahr`, sub: `${fmtDE(pv.einspKwh)} kWh × 8,2 ct/kWh`, color: 'var(--text-secondary)' },
  ];

  const config = [
    ['Gebäude',       ht.label],
    ['Dachtyp',       dt?.label ?? '–'],
    ['Anlage',        `${pv.kwp} kWp · ${pv.module} Module`],
    ['Speicher',      state.speicher === 'ja' ? 'Ja' : 'Nein'],
    ['Wallbox',       state.wallbox === 'ja' ? 'Ja' : 'Nein'],
    ['Verbrauch',     `${fmtDE(pv.verbrauch)} kWh/Jahr`],
  ];

  return (
    <div>
      {/* Success header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: '1.5rem' }}>
        <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--accent-text)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
        </div>
        <div>
          <h1 className="step-title" style={{ marginBottom: 2 }}>Dein PV-Potenzial</h1>
          <p style={{ fontSize: 12, color: 'var(--text-muted)' }}>Ein Partner aus Deiner Region meldet sich in Kürze</p>
        </div>
      </div>

      {/* KPI grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 9, marginBottom: '1.25rem' }}>
        <div className="result-kpi-card r-primary">
          <div className="rkc-label">Anlage</div>
          <div className="rkc-val">{pv.kwp} kWp</div>
          <div className="rkc-sub">{pv.module} Module</div>
        </div>
        <div className="result-kpi-card">
          <div className="rkc-label">Jährliche Ersparnis</div>
          <div className="rkc-val lime">{fmtDE(pv.ersparnis)} €</div>
          <div className="rkc-sub">inkl. Einspeisung</div>
        </div>
        <div className="result-kpi-card">
          <div className="rkc-label">Amortisation</div>
          <div className="rkc-val">{pv.breakEvenJahr || '> 20'} Jahre</div>
          <div className="rkc-sub">Investition ca. {fmtDE(pv.invest)} €</div>
        </div>
        <div className="result-kpi-card">
          <div className="rkc-label">CO₂ Einsparung</div>
          <div className="rkc-val">{pv.co2Jahr} t/Jahr</div>
          <div className="rkc-sub">= {Math.round(pv.co2Jahr * 50)} Bäume</div>
        </div>
      </div>

      {/* 20-year hero */}
      <div className="result-kpi-card r-hero" style={{ marginBottom: '1.25rem' }}>
        <div className="rkc-label">Nettogewinn über 20 Jahre</div>
        <div className="rkc-val lime" style={{ fontSize: 26 }}>{pv.netto20 > 0 ? '+' : ''}{fmtDE(pv.netto20)} €</div>
        <div className="rkc-sub">Break-Even in Jahr {pv.breakEvenJahr || '> 20'}</div>
      </div>

      {/* Förderungen */}
      <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '1rem 1.25rem', marginBottom: '1.25rem' }}>
        <p style={{ fontSize: 12, fontWeight: 500, letterSpacing: '.06em', textTransform: 'uppercase', color: 'var(--text-subtle)', marginBottom: 8 }}>Mögliche Förderungen</p>
        {foerder.map(f => (
          <div key={f.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', padding: '6px 0', borderBottom: '1px solid var(--border)' }}>
            <div>
              <div style={{ fontSize: 13, color: f.color, fontWeight: 500 }}>{f.label}</div>
              <div style={{ fontSize: 11.5, color: 'var(--text-subtle)', marginTop: 2 }}>{f.sub}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Config summary */}
      <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '1rem 1.25rem' }}>
        <p style={{ fontSize: 12, fontWeight: 500, letterSpacing: '.06em', textTransform: 'uppercase', color: 'var(--text-subtle)', marginBottom: 10 }}>Deine Konfiguration</p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6, fontSize: 12, color: 'var(--text-subtle)' }}>
          {config.map(([k, v]) => (
            <div key={k}><span style={{ color: 'var(--text-faint)' }}>{k}:</span> <span style={{ color: 'var(--text-muted)' }}>{v}</span></div>
          ))}
        </div>
      </div>
    </div>
  );
}
