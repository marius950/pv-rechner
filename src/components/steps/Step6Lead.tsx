'use client';
import { useState } from 'react';
import { useFunnelStore } from '@/store/funnel';
import CTAButton from '@/components/ui/CTAButton';
import BackButton from '@/components/ui/BackButton';

export default function Step6Lead() {
  const { setLead, setEigentuemer, setZeitplan, eigentuemer, zeitplan, setStep } = useFunnelStore();
  const [name, setName]   = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [errors, setErrors] = useState<Record<string, boolean>>({});

  const canProceed = name.trim() && email.includes('@') && phone.trim() && !!eigentuemer && !!zeitplan;

  const submit = () => {
    const e: Record<string, boolean> = {};
    if (!name.trim())          e.name  = true;
    if (!email.includes('@'))  e.email = true;
    if (!phone.trim())         e.phone = true;
    if (Object.keys(e).length) { setErrors(e); return; }
    setLead(name.trim(), email.trim(), phone.trim());
    setStep('result');
  };

  const zeitplanOptions = ['So schnell wie möglich', 'In den nächsten 6 Monaten', 'Im nächsten Jahr', 'Nur Informationen sammeln'];

  return (
    <div>
      <BackButton onClick={() => setStep(5)} />
      <p className="step-eyebrow">Schritt 6 von 6</p>
      <h1 className="step-title">Dein persönlicher Ergebnisbericht</h1>
      <p className="step-sub">Erhalte Deine vollständige Analyse kostenlos — und wir vermitteln Dir geprüfte Installationsbetriebe aus Deiner Region.</p>

      <div style={{ background: 'var(--bg-card-sel)', border: '1px solid var(--border-sel)', borderRadius: 'var(--radius-lg)', padding: '1rem 1.25rem', marginBottom: '1.5rem' }}>
        <p style={{ fontSize: 12, fontWeight: 500, letterSpacing: '.06em', textTransform: 'uppercase', color: 'var(--accent)', opacity: .7, marginBottom: 10 }}>Im Bericht enthalten</p>
        {['Persönliche kWp-Berechnung', '20-Jahres-Gewinnprognose', 'Amortisationsrechnung', 'CO₂-Einsparung', 'Fördermittel-Übersicht'].map(item => (
          <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="6.5" stroke="var(--accent)" strokeOpacity=".4"/><path d="M4 7l2 2 4-4" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{item}</span>
          </div>
        ))}
      </div>

      <div className="form-group">
        <label className="form-label">Vorname *</label>
        <input className={`form-input ${errors.name ? 'error' : ''}`} placeholder="Max" value={name} onChange={e => { setName(e.target.value); setErrors(p => ({ ...p, name: false })); }} />
      </div>
      <div className="form-group">
        <label className="form-label">E-Mail *</label>
        <input className={`form-input ${errors.email ? 'error' : ''}`} type="email" placeholder="max@beispiel.de" value={email} onChange={e => { setEmail(e.target.value); setErrors(p => ({ ...p, email: false })); }} />
      </div>
      <div className="form-group">
        <label className="form-label">Telefon *</label>
        <input className={`form-input ${errors.phone ? 'error' : ''}`} type="tel" placeholder="+49 151 12345678" value={phone} onChange={e => { setPhone(e.target.value); setErrors(p => ({ ...p, phone: false })); }} />
      </div>

      <p style={{ fontSize: 12, fontWeight: 500, letterSpacing: '.07em', textTransform: 'uppercase', color: 'var(--text-subtle)', margin: '1.25rem 0 8px' }}>Bist Du Eigentümer?</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: '1.25rem' }}>
        {(['ja', 'nein'] as const).map(v => (
          <label key={v} className={`radio-row ${eigentuemer === v ? 'checked' : ''}`}>
            <input type="radio" name="eigen" checked={eigentuemer === v} onChange={() => setEigentuemer(v)} />
            {v === 'ja' ? 'Ja, ich bin Eigentümer' : 'Nein, ich bin Mieter / Sonstiges'}
          </label>
        ))}
      </div>

      <p style={{ fontSize: 12, fontWeight: 500, letterSpacing: '.07em', textTransform: 'uppercase', color: 'var(--text-subtle)', marginBottom: 8 }}>Zeitplan</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: '1.5rem' }}>
        {zeitplanOptions.map(v => (
          <label key={v} className={`radio-row ${zeitplan === v ? 'checked' : ''}`}>
            <input type="radio" name="zeit" checked={zeitplan === v} onChange={() => setZeitplan(v)} />
            {v}
          </label>
        ))}
      </div>

      <CTAButton enabled={!!canProceed} onClick={submit}>Mein Ergebnis anzeigen</CTAButton>
    </div>
  );
}
