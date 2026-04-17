'use client';
import { useFunnelStore } from '@/store/funnel';
import type { HausTyp } from '@/types';
import OptionCard from '@/components/ui/OptionCard';
import CTAButton from '@/components/ui/CTAButton';
import BackButton from '@/components/ui/BackButton';

const options: { type: HausTyp; label: string; sub: string; icon: React.ReactNode }[] = [
  {
    type: 'efh',
    label: 'Einfamilienhaus',
    sub: 'Freistehendes Haus, volle Dachfläche',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}><path d="M3 10.5L12 3l9 7.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-9.5Z"/><path d="M9 21V13h6v8"/></svg>,
  },
  {
    type: 'dhh',
    label: 'Doppelhaushälfte',
    sub: 'Ca. halbe Dachfläche nutzbar',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}><path d="M1 11L7 5l6 6V20H1V11Z"/><path d="M13 11l4-4 6 6V20h-10V11Z"/><path d="M5 20v-5h3v5M15 20v-5h3v5"/></svg>,
  },
  {
    type: 'rh',
    label: 'Reihenhaus',
    sub: 'Schmales Dach, eine Seite',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}><path d="M1 13l3-3 3 3v7H1v-7Z"/><path d="M7 13l3-3 3 3v7H7v-7Z"/><path d="M13 12l4-4 4 4v8h-8v-8Z"/></svg>,
  },
  {
    type: 'other',
    label: 'Anderes',
    sub: 'Mehrfamilienhaus, Gewerbe',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}><rect x="2" y="7" width="20" height="14" rx="1.5"/><path d="M2 11h20"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>,
  },
];

export default function Step1Haustyp() {
  const { haustyp, setHaustyp, setStep } = useFunnelStore();

  return (
    <div>
      <BackButton onClick={() => setStep(0)} />
      <p className="step-eyebrow">Schritt 1 von 6</p>
      <h1 className="step-title">Was für ein Gebäude möchtest Du ausstatten?</h1>
      <p className="step-sub">Die Gebäudeart bestimmt Dachfläche, Ausrichtung und typischen Energiebedarf.</p>

      <div className="cards-grid">
        {options.map(o => (
          <OptionCard
            key={o.type}
            selected={haustyp === o.type}
            onClick={() => setHaustyp(o.type)}
            icon={o.icon}
            label={o.label}
            sub={o.sub}
          />
        ))}
      </div>

      <CTAButton enabled={!!haustyp} onClick={() => setStep(2)}>
        Weiter
      </CTAButton>
    </div>
  );
}
