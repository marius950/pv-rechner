'use client';
import { useFunnelStore } from '@/store/funnel';
import { orientDaten, dachDaten } from '@/lib/data';
import type { Ausrichtung } from '@/types';

const degMap: Record<Ausrichtung, number> = { s: 0, ow: 0, o: -90, w: 90, n: 180, best: 0 };

export default function Viz2() {
  const { ausrichtung, dachtyp, haustyp } = useFunnelStore();
  const od = ausrichtung ? orientDaten[ausrichtung] : null;
  const pct = od ? Math.round(od.faktor * 100) : null;
  const deg = ausrichtung ? degMap[ausrichtung] : 0;
  const color = pct && pct >= 90 ? 'var(--accent)' : pct && pct >= 70 ? '#EF9F27' : pct ? '#E24B4A' : 'var(--accent)';
  const dName = dachtyp ? dachDaten[dachtyp]?.label : '';
  const oName = od?.label ?? '';

  return (
    <div style={{ width: '100%', maxWidth: 400, display: 'flex', flexDirection: 'column', gap: 12 }}>
      {/* Badge */}
      <div className="house-badge show" style={{ alignSelf: 'flex-start' }}>
        <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 5L6 1l5 4v5.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V5Z"/></svg>
        {dName}{oName ? ` · ${oName}` : ''}
      </div>

      {/* Compass + ertrag row */}
      <div style={{ display: 'grid', gridTemplateColumns: '160px 1fr', gap: 12, alignItems: 'center' }}>
        <svg viewBox="-100 -100 200 200" width="160" height="160" style={{ overflow: 'visible', flexShrink: 0 }}>
          <defs>
            <radialGradient id="cgrad2" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgba(190,242,100,0.08)"/>
              <stop offset="100%" stopColor="rgba(0,0,0,0)"/>
            </radialGradient>
            <filter id="nglow2"><feGaussianBlur stdDeviation="3" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
          </defs>
          <circle r="88" fill="url(#cgrad2)"/>
          <path d="M0,0 L62,-62 A88,88,0,0,1,88,0 Z" fill="rgba(190,242,100,0.17)"/>
          <path d="M0,0 L88,0 A88,88,0,0,1,62,62 Z" fill="rgba(190,242,100,0.17)"/>
          <path d="M0,0 L62,-62 A88,88,0,0,0,0,-88 Z" fill="rgba(190,242,100,0.08)"/>
          <path d="M0,0 L62,62 A88,88,0,0,0,0,88 Z" fill="rgba(190,242,100,0.08)"/>
          <path d="M0,0 L0,-88 A88,88,0,0,0,-88,0 Z" fill="rgba(255,255,255,0.025)"/>
          <path d="M0,0 L-88,0 A88,88,0,0,0,0,88 Z" fill="rgba(255,255,255,0.018)"/>
          <circle r="88" fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="1"/>
          <circle r="74" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="1"/>
          <g stroke="rgba(255,255,255,0.16)" strokeLinecap="round">
            {[[0,-88,0,-80,1.5],[44,-76,40,-70,1],[76,-44,70,-40,1],[88,0,80,0,1.5],[76,44,70,40,1],[44,76,40,70,1],[0,88,0,80,1.5],[-44,76,-40,70,1],[-76,44,-70,40,1],[-88,0,-80,0,1.5],[-76,-44,-70,-40,1],[-44,-76,-40,-70,1]].map(([x1,y1,x2,y2,w],i) => (
              <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} strokeWidth={w}/>
            ))}
          </g>
          <text x="0" y="-95" textAnchor="middle" dominantBaseline="middle" fontSize="11" fontFamily="Geist,sans-serif" fontWeight="500" fill="rgba(255,255,255,0.3)">N</text>
          <text x="0" y="99" textAnchor="middle" dominantBaseline="middle" fontSize="13" fontFamily="Geist,sans-serif" fontWeight="700" fill="rgba(190,242,100,1)">S</text>
          <text x="-98" y="0" textAnchor="middle" dominantBaseline="middle" fontSize="11" fontFamily="Geist,sans-serif" fill="rgba(255,255,255,0.28)">W</text>
          <text x="98" y="0" textAnchor="middle" dominantBaseline="middle" fontSize="11" fontFamily="Geist,sans-serif" fill="rgba(255,255,255,0.28)">O</text>
          <text x="0" y="68" textAnchor="middle" dominantBaseline="middle" fontSize="7.5" fontFamily="Geist,sans-serif" fill="rgba(190,242,100,0.45)">optimal</text>
          <circle r="26" fill="rgba(0,0,0,0.3)" stroke="rgba(255,255,255,0.1)" strokeWidth="1"/>
          <g style={{ transformOrigin: '0px 0px', transform: `rotate(${deg}deg)`, transition: 'transform 0.7s cubic-bezier(0.34,1.2,0.64,1)' }}>
            <polygon points="0,60 -7,12 7,12" fill={color} filter="url(#nglow2)"/>
            <polygon points="0,-60 -7,-12 7,-12" fill="rgba(255,255,255,0.2)"/>
            <circle r="7.5" fill="rgba(0,0,0,0.4)" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5"/>
            <circle r="3" fill={color}/>
          </g>
          <text x="0" y="4" textAnchor="middle" dominantBaseline="middle" fontSize="12" fontFamily="Geist,sans-serif" fontWeight="700" fill={color}>{pct !== null ? `${pct} %` : '–'}</text>
        </svg>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', padding: '10px 12px', boxShadow: 'var(--shadow)' }}>
            <div style={{ fontSize: 9, textTransform: 'uppercase', letterSpacing: '.06em', color: 'var(--text-subtle)', marginBottom: 5 }}>Solarer Ertrag</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ flex: 1, height: 4, background: 'var(--slider-track)', borderRadius: 2, overflow: 'hidden' }}>
                <div style={{ height: '100%', background: color, borderRadius: 2, width: `${pct ?? 0}%`, transition: 'width 0.4s, background 0.3s' }}/>
              </div>
              <span style={{ fontSize: 15, fontWeight: 700, color, minWidth: 40, textAlign: 'right', letterSpacing: '-.02em' }}>{pct !== null ? `${pct} %` : '–'}</span>
            </div>
            <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 4, lineHeight: 1.4 }}>{od?.desc ?? 'Ausrichtung wählen'}</div>
          </div>
          <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', padding: '10px 12px', boxShadow: 'var(--shadow)' }}>
            <div style={{ fontSize: 9, textTransform: 'uppercase', letterSpacing: '.06em', color: 'var(--text-subtle)', marginBottom: 3 }}>Ausrichtung</div>
            <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)', letterSpacing: '-.01em' }}>{oName || '–'}</div>
          </div>
        </div>
      </div>

      {/* Roof plan */}
      <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '14px 16px', boxShadow: 'var(--shadow)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
          <span style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '.06em', color: 'var(--text-subtle)' }}>Draufsicht Dach</span>
        </div>
        <svg viewBox="-110 -75 380 170" width="100%">
          <defs>
            <pattern id="hatch2" patternUnits="userSpaceOnUse" width="6" height="6" patternTransform="rotate(45)">
              <line x1="0" y1="0" x2="0" y2="6" stroke="rgba(255,255,255,0.1)" strokeWidth="2"/>
            </pattern>
          </defs>
          <g transform="translate(220,-60)">
            <line x1="0" y1="10" x2="0" y2="-2" stroke="rgba(255,255,255,0.3)" strokeWidth="1" strokeLinecap="round"/>
            <polygon points="0,-6 -3,2 3,2" fill="rgba(255,255,255,0.3)"/>
            <text x="0" y="20" textAnchor="middle" fontSize="8" fontFamily="Geist,sans-serif" fill="rgba(255,255,255,0.25)">N</text>
          </g>
          {/* Default: Satteldach EFH plan */}
          {(!dachtyp || dachtyp === 'sattel') && (
            <g>
              <rect x="-80" y="-55" width="160" height="110" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" rx="2"/>
              <rect x="-80" y="-55" width="80" height="110" fill={ausrichtung === 'ow' || ausrichtung === 'w' || ausrichtung === 's' ? 'rgba(190,242,100,0.25)' : 'rgba(190,242,100,0)'} rx="2" style={{ transition: 'fill 0.4s' }}/>
              <rect x="0" y="-55" width="80" height="110" fill={ausrichtung === 'ow' || ausrichtung === 'o' || ausrichtung === 's' ? 'rgba(190,242,100,0.25)' : 'rgba(190,242,100,0)'} rx="2" style={{ transition: 'fill 0.4s' }}/>
              <line x1="0" y1="-55" x2="0" y2="55" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" strokeDasharray="4 3"/>
              <text x="0" y="70" textAnchor="middle" fontSize="8" fontFamily="Geist,sans-serif" fill="rgba(190,242,100,0.5)">→ Süd</text>
            </g>
          )}
          {dachtyp === 'flach' && (
            <g>
              <rect x="-80" y="-55" width="160" height="110" fill="rgba(190,242,100,0.18)" stroke="rgba(190,242,100,0.5)" strokeWidth="1.5" rx="2"/>
              <text x="0" y="70" textAnchor="middle" fontSize="10" fontFamily="Geist,sans-serif" fill="rgba(190,242,100,0.9)" fontWeight="500">100 % nutzbar · frei ausrichtbar</text>
            </g>
          )}
          {dachtyp === 'walm' && (
            <g>
              <polygon points="0,-65 80,0 0,65 -80,0" fill="rgba(190,242,100,0.18)" stroke="rgba(190,242,100,0.5)" strokeWidth="1.5"/>
              <text x="0" y="82" textAnchor="middle" fontSize="9" fontFamily="Geist,sans-serif" fill="rgba(190,242,100,0.7)" fontWeight="600">Optimale Seite automatisch</text>
            </g>
          )}
          {dachtyp === 'pult' && (
            <g>
              <polygon points="-80,-55 80,-55 70,55 -70,55" fill={ausrichtung ? 'rgba(190,242,100,0.22)' : 'rgba(255,255,255,0.04)'} stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" style={{ transition: 'fill 0.4s' }}/>
              <text x="0" y="70" textAnchor="middle" fontSize="8" fontFamily="Geist,sans-serif" fill="rgba(190,242,100,0.5)">→ Süd</text>
            </g>
          )}
        </svg>
      </div>
    </div>
  );
}
