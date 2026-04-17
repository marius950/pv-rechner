'use client';
import { useFunnelStore } from '@/store/funnel';
import { calcVerbrauch } from '@/lib/calc';
import { STROMPREIS } from '@/lib/data';
import CTAButton from '@/components/ui/CTAButton';
import BackButton from '@/components/ui/BackButton';

const personContexts: Record<number, string> = {
  1: 'Single-Haushalt, geringe Grundlast',
  2: 'Paar, moderate Nutzung',
  3: 'Familie mit einem Kind, durchschnittlich',
  4: 'Vierköpfige Familie, typisch für EFH',
  5: 'Großfamilie, erhöhter Verbrauch',
  6: 'Großer Haushalt, oft mit Wärmepumpe',
  7: 'Sehr großer Haushalt',
  8: 'Mehrgenerationenhaus',
};

export default function Step4Persons() {
  const { persons, setPersons, setStep } = useFunnelStore();
  const total = calcVerbrauch(persons);
  const cost  = Math.round(total * STROMPREIS);

  return (
    <div>
      <BackButton onClick={() => setStep(3)} />
      <p className="step-eyebrow">Schritt 4 von 6</p>
      <h1 className="step-title">Wie viele Personen wohnen bei Dir?</h1>
      <p className="step-sub">Der Jahresverbrauch bestimmt, wie viel PV-Strom Du selbst nutzen kannst.</p>

      <div className="person-picker">
        <div>
          <div style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 4 }}>Personen im Haushalt</div>
          <div style={{ fontSize: 12, color: 'var(--text-subtle)' }}>{personContexts[persons]}</div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <button className="person-btn" onClick={() => setPersons(Math.max(1, persons - 1))}>−</button>
          <span className="person-count">{persons}</span>
          <button className="person-btn" onClick={() => setPersons(Math.min(8, persons + 1))}>+</button>
        </div>
      </div>

      <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '1rem 1.25rem', marginBottom: '1.5rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <div>
            <div style={{ fontSize: 10, color: 'var(--text-subtle)', textTransform: 'uppercase', letterSpacing: '.05em', marginBottom: 4 }}>Jahresverbrauch</div>
            <div style={{ fontSize: 22, fontWeight: 600, color: 'var(--accent)', letterSpacing: '-.02em' }}>{total.toLocaleString('de')} kWh</div>
          </div>
          <div>
            <div style={{ fontSize: 10, color: 'var(--text-subtle)', textTransform: 'uppercase', letterSpacing: '.05em', marginBottom: 4 }}>Stromkosten/Jahr</div>
            <div style={{ fontSize: 22, fontWeight: 600, color: 'var(--text-primary)', letterSpacing: '-.02em' }}>{cost.toLocaleString('de')} €</div>
          </div>
        </div>
      </div>

      <CTAButton enabled onClick={() => setStep(5)}>Weiter</CTAButton>
    </div>
  );
}
