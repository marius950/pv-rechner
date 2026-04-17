'use client';
import { useEffect, useRef, useState } from 'react';

export default function LandingRight() {
  const [ticker, setTicker] = useState(0);
  const [chartReady, setChartReady] = useState(false);
  const ran = useRef(false);

  useEffect(() => {
    if (ran.current) return;
    ran.current = true;
    // Chart animation
    setTimeout(() => setChartReady(true), 500);
    // Number ticker
    const target = 27400;
    const dur = 2000;
    const start = performance.now();
    const step = (now: number) => {
      const p = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setTicker(Math.round(target * eased));
      if (p < 1) requestAnimationFrame(step);
    };
    setTimeout(() => requestAnimationFrame(step), 400);
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', maxWidth: 360, gap: 10 }}>
      <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 2 }}>
        <div style={{ fontSize: 11, color: 'var(--text-subtle)', letterSpacing: '.04em' }}>Beispielrechnung</div>
        <div style={{ fontSize: 11, color: 'var(--text-faint)', background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 100, padding: '2px 9px' }}>EFH · 150 m² · Südsatteldach</div>
      </div>

      {/* Hero ticker */}
      <div style={{ width: '100%', background: 'var(--bg-card-sel)', border: '1.5px solid var(--border-sel)', borderRadius: 'var(--radius-lg)', padding: '1.1rem 1.3rem', textAlign: 'center' }}>
        <div style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '.08em', color: 'var(--accent)', opacity: .75, marginBottom: 5 }}>20-Jahre-Nettogewinn</div>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: 4 }}>
          <div style={{ fontSize: 44, fontWeight: 700, letterSpacing: '-0.04em', color: 'var(--accent)', lineHeight: 1, fontVariantNumeric: 'tabular-nums' }}>{ticker.toLocaleString('de')}</div>
          <div style={{ fontSize: 20, fontWeight: 600, color: 'var(--accent)', opacity: .8 }}> €</div>
        </div>
        <div style={{ fontSize: 12, color: 'var(--text-subtle)', marginTop: 5 }}>nach Abzug aller Kosten</div>
      </div>

      {/* KPI row */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 7, width: '100%' }}>
        {[['Anlage','8,4 kWp',false],['Ersparnis','1.380 €/J',true],['Break-Even','9 Jahre',false]].map(([label,val,lime]) => (
          <div key={String(label)} style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', padding: '9px 8px', textAlign: 'center' }}>
            <div style={{ fontSize: 9, color: 'var(--text-subtle)', textTransform: 'uppercase', letterSpacing: '.04em', marginBottom: 3 }}>{label}</div>
            <div style={{ fontSize: 15, fontWeight: 600, color: lime ? 'var(--accent)' : 'var(--text-primary)', letterSpacing: '-.02em' }}>{val}</div>
          </div>
        ))}
      </div>

      {/* Chart */}
      <div style={{ width: '100%', background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '13px 15px' }}>
        <div style={{ fontSize: 10, color: 'var(--text-subtle)', textTransform: 'uppercase', letterSpacing: '.06em', marginBottom: 10 }}>Kumulative Ersparnis — 20 Jahre</div>
        <svg viewBox="0 0 330 88" width="100%" style={{ overflow: 'visible' }}>
          <defs>
            <linearGradient id="lp-grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgba(190,242,100,0.22)"/>
              <stop offset="100%" stopColor="rgba(190,242,100,0)"/>
            </linearGradient>
          </defs>
          {[65,44,22].map(y => <line key={y} x1="0" y1={y} x2="330" y2={y} stroke="rgba(255,255,255,0.05)" strokeWidth="1"/>)}
          <line x1="0" y1="52" x2="330" y2="52" stroke="rgba(255,255,255,0.1)" strokeWidth="1" strokeDasharray="4 3"/>
          <path
            d="M0,78 C28,74 58,67 90,57 C122,47 160,33 200,20 C235,9 275,3 330,0"
            fill="none" stroke="rgba(190,242,100,0.9)" strokeWidth="2.5" strokeLinecap="round"
            style={{ strokeDasharray: 580, strokeDashoffset: chartReady ? 0 : 580, transition: 'stroke-dashoffset 2.4s cubic-bezier(0.4,0,0.2,1) 0.4s' }}
          />
          <path
            d="M0,78 C28,74 58,67 90,57 C122,47 160,33 200,20 C235,9 275,3 330,0 L330,78 Z"
            fill="url(#lp-grad)"
            style={{ opacity: chartReady ? 1 : 0, transition: 'opacity 0.7s ease 1.4s' }}
          />
          <g style={{ opacity: chartReady ? 1 : 0, transition: 'opacity 0.4s ease 2s' }}>
            <line x1="137" y1="52" x2="137" y2="78" stroke="rgba(190,242,100,0.3)" strokeWidth="1" strokeDasharray="3 2"/>
            <circle cx="137" cy="52" r="4.5" fill="var(--accent)" stroke="rgba(0,0,0,0.3)" strokeWidth="1.5"/>
            <text x="143" y="49" fontSize="8.5" fontFamily="Geist,sans-serif" fill="rgba(190,242,100,0.85)" fontWeight="500">Break-Even ~J.9</text>
          </g>
          <text x="326" y="6" textAnchor="end" fontSize="8.5" fontFamily="Geist,sans-serif" fill="rgba(190,242,100,0.9)" fontWeight="600" style={{ opacity: chartReady ? 1 : 0, transition: 'opacity 0.4s ease 2.2s' }}>+27.400 €</text>
          <text x="2" y="86" fontSize="8" fontFamily="Geist,sans-serif" fill="rgba(255,255,255,0.18)">Jahr 1</text>
          <text x="165" y="86" textAnchor="middle" fontSize="8" fontFamily="Geist,sans-serif" fill="rgba(255,255,255,0.18)">Jahr 10</text>
          <text x="328" y="86" textAnchor="end" fontSize="8" fontFamily="Geist,sans-serif" fill="rgba(255,255,255,0.18)">Jahr 20</text>
        </svg>
      </div>

      {/* Förderungen */}
      <div style={{ width: '100%', display: 'flex', gap: 7 }}>
        {[['KfW 270','Zinsgünstig'],['Einspeisung','8,2 ct/kWh']].map(([label,val]) => (
          <div key={label} style={{ flex: 1, background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', padding: '9px 11px', display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 26, height: 26, borderRadius: 7, background: 'rgba(190,242,100,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="rgba(190,242,100,0.8)" strokeWidth="1.8">
                {label === 'KfW 270' ? <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/> : <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8Z"/>}
              </svg>
            </div>
            <div>
              <div style={{ fontSize: 9, color: 'var(--text-subtle)', textTransform: 'uppercase', letterSpacing: '.04em' }}>{label}</div>
              <div style={{ fontSize: 12, fontWeight: 500, color: 'var(--text-primary)', marginTop: 1 }}>{val}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
