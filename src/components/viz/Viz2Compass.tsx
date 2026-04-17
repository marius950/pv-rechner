'use client';
import { useFunnelStore } from '@/store/funnel';
import { orientDaten, dachDaten } from '@/lib/data';

const C = {
  lime:    '#c7f360',
  limeBrt: '#bef264',
  green:   '#156949',
  dark:    '#093524',
};

export default function Viz2Compass() {
  const { ausrichtung, dachtyp } = useFunnelStore();
  const od   = ausrichtung ? orientDaten[ausrichtung] : null;
  const pct  = od ? Math.round(od.faktor * 100) : null;
  const color = pct && pct >= 90 ? C.lime : pct && pct >= 70 ? '#EF9F27' : pct ? '#E24B4A' : C.lime;
  const dName = dachtyp ? dachDaten[dachtyp]?.label : '';
  const oName = od?.label ?? '';

  const isSouthLeft = ausrichtung === 'ow' || ausrichtung === 'w';
  const isSouthRight = ausrichtung === 's' || ausrichtung === 'ow' || ausrichtung === 'o';
  const isFullFlach  = dachtyp === 'flach';
  const isWalm       = dachtyp === 'walm';
  const isPult       = dachtyp === 'pult';
  const fillL = isSouthLeft || isFullFlach || isWalm ? 'rgba(199,243,96,0.32)' : 'rgba(255,255,255,0.04)';
  const fillR = isSouthRight || isFullFlach || isWalm ? 'rgba(199,243,96,0.32)' : 'rgba(255,255,255,0.04)';
  const fillPult = ausrichtung || isFullFlach ? 'rgba(199,243,96,0.32)' : 'rgba(255,255,255,0.04)';

  return (
    <div style={{ width: '100%', maxWidth: 400, display: 'flex', flexDirection: 'column', gap: 10 }}>
      {/* Badge */}
      {(dName || oName) && (
        <div className="house-badge show" style={{ alignSelf: 'flex-start' }}>
          <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 5L6 1l5 4v5.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V5Z"/></svg>
          {dName}{oName ? ` · ${oName}` : ''}
        </div>
      )}

      {/* Ertrag bar */}
      {pct !== null && (
        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '12px 16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>Solarer Ertragsfaktor</span>
            <span style={{ fontSize: 18, fontWeight: 700, color, letterSpacing: '-0.02em' }}>{pct} %</span>
          </div>
          <div style={{ height: 6, background: 'var(--slider-track)', borderRadius: 3, overflow: 'hidden' }}>
            <div style={{ height: '100%', background: color, borderRadius: 3, width: `${pct}%`, transition: 'width 0.4s, background 0.3s' }}/>
          </div>
          <div style={{ fontSize: 11.5, color: 'var(--text-subtle)', marginTop: 6 }}>{od?.desc}</div>
        </div>
      )}

      {/* Roof plan */}
      <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '14px 16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
          <span style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '.06em', color: 'var(--text-subtle)' }}>Draufsicht Dach</span>
          <div style={{ display: 'flex', gap: 10, fontSize: 10, color: 'var(--text-faint)', alignItems: 'center' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <span style={{ width: 10, height: 10, background: 'rgba(199,243,96,0.35)', borderRadius: 2, display: 'inline-block' }}/>
              PV-Fläche
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <span style={{ width: 10, height: 10, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 2, display: 'inline-block' }}/>
              Dach
            </span>
          </div>
        </div>
        <svg viewBox="-115 -80 390 175" width="100%">
          <defs>
            <pattern id="hatch" patternUnits="userSpaceOnUse" width="6" height="6" patternTransform="rotate(45)">
              <line x1="0" y1="0" x2="0" y2="6" stroke="rgba(199,243,96,0.25)" strokeWidth="2"/>
            </pattern>
          </defs>

          {/* N arrow */}
          <g transform="translate(226,-68)">
            <line x1="0" y1="10" x2="0" y2="-2" stroke="rgba(255,255,255,0.35)" strokeWidth="1" strokeLinecap="round"/>
            <polygon points="0,-6 -3,2 3,2" fill="rgba(255,255,255,0.35)"/>
            <text x="0" y="20" textAnchor="middle" fontSize="8" fontFamily="Geist,sans-serif" fill="rgba(255,255,255,0.3)">N</text>
          </g>

          {/* Satteldach */}
          {(!dachtyp || dachtyp === 'sattel') && (
            <g>
              <rect x="-82" y="-58" width="82" height="116" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.18)" strokeWidth="1.5" rx="2"/>
              <rect x="0"   y="-58" width="82" height="116" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.18)" strokeWidth="1.5" rx="2"/>
              {/* PV zones */}
              <rect x="-82" y="-58" width="82" height="116" fill={fillL} rx="2" style={{ transition: 'fill 0.4s' }}/>
              <rect x="0"   y="-58" width="82" height="116" fill={fillR} rx="2" style={{ transition: 'fill 0.4s' }}/>
              {(isSouthLeft || isFullFlach) && <rect x="-82" y="-58" width="82" height="116" fill="url(#hatch)" opacity="0.6"/>}
              {(isSouthRight || isFullFlach) && <rect x="0" y="-58" width="82" height="116" fill="url(#hatch)" opacity="0.6"/>}
              <line x1="0" y1="-58" x2="0" y2="58" stroke="rgba(255,255,255,0.22)" strokeWidth="1.5" strokeDasharray="4 3"/>
              <text x="-41" y="4" textAnchor="middle" fontSize="10" fontFamily="Geist,sans-serif" fontWeight="600" fill={isSouthLeft ? C.lime : 'rgba(255,255,255,0.3)'}>{isSouthLeft ? '✓' : '–'}</text>
              <text x="41"  y="4" textAnchor="middle" fontSize="10" fontFamily="Geist,sans-serif" fontWeight="600" fill={isSouthRight ? C.lime : 'rgba(255,255,255,0.3)'}>{isSouthRight ? '✓' : '–'}</text>
              <text x="0" y="74" textAnchor="middle" fontSize="8" fontFamily="Geist,sans-serif" fill={C.lime} opacity="0.6">→ Süd</text>
            </g>
          )}

          {/* Flachdach */}
          {dachtyp === 'flach' && (
            <g>
              <rect x="-82" y="-58" width="164" height="116" fill="rgba(199,243,96,0.22)" stroke={C.lime} strokeWidth="1.5" rx="2" opacity="0.8"/>
              <rect x="-82" y="-58" width="164" height="116" fill="url(#hatch)" opacity="0.7"/>
              {/* Module grid on flat roof */}
              <g opacity="0.7">
                {[-70,-36,-2,32].map(x => (
                  [-46,-20,6].map(y => (
                    <rect key={`${x}-${y}`} x={x} y={y} width="28" height="18" fill="rgba(199,243,96,0.3)" rx="1"/>
                  ))
                ))}
              </g>
              <text x="0" y="74" textAnchor="middle" fontSize="10" fontFamily="Geist,sans-serif" fill={C.lime} fontWeight="500">100 % nutzbar · frei ausrichtbar</text>
            </g>
          )}

          {/* Pultdach */}
          {dachtyp === 'pult' && (
            <g>
              <polygon points="-82,-58 82,-58 72,58 -72,58" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.18)" strokeWidth="1.5"/>
              <polygon points="-82,-58 82,-58 72,58 -72,58" fill={fillPult} style={{ transition: 'fill 0.4s' }}/>
              {(ausrichtung) && <polygon points="-82,-58 82,-58 72,58 -72,58" fill="url(#hatch)" opacity="0.6"/>}
              <line x1="-82" y1="-58" x2="-94" y2="-72" stroke="rgba(255,255,255,0.18)" strokeWidth="1"/>
              <line x1="82"  y1="-58" x2="94"  y2="-72" stroke="rgba(255,255,255,0.18)" strokeWidth="1"/>
              <line x1="-94" y1="-72" x2="94"  y2="-72" stroke="rgba(255,255,255,0.18)" strokeWidth="1"/>
              <text x="0" y="74" textAnchor="middle" fontSize="8" fontFamily="Geist,sans-serif" fill={C.lime} opacity="0.6">→ Süd</text>
            </g>
          )}

          {/* Walmdach */}
          {dachtyp === 'walm' && (
            <g>
              <polygon points="0,-68 82,0 0,68 -82,0" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.18)" strokeWidth="1.5"/>
              {/* All faces highlighted for "best" */}
              <polygon points="0,0 82,0 0,68"   fill="rgba(199,243,96,0.28)" style={{ transition: 'fill 0.4s' }}/>
              <polygon points="0,0 82,0 0,-68"  fill="rgba(199,243,96,0.18)" style={{ transition: 'fill 0.4s' }}/>
              <polygon points="0,0 -82,0 0,68"  fill="rgba(199,243,96,0.14)" style={{ transition: 'fill 0.4s' }}/>
              <polygon points="0,0 -82,0 0,-68" fill="rgba(199,243,96,0.08)" style={{ transition: 'fill 0.4s' }}/>
              <line x1="0" y1="-68" x2="0" y2="68" stroke="rgba(255,255,255,0.1)" strokeWidth="0.75" strokeDasharray="3 3"/>
              <line x1="-82" y1="0" x2="82" y2="0" stroke="rgba(255,255,255,0.1)" strokeWidth="0.75" strokeDasharray="3 3"/>
              <text x="0"   y="82" textAnchor="middle" fontSize="10" fontFamily="Geist,sans-serif" fill={C.lime} fontWeight="700">S</text>
              <text x="0"   y="-76" textAnchor="middle" fontSize="9" fontFamily="Geist,sans-serif" fill="rgba(255,255,255,0.25)">N</text>
              <text x="96"  y="4"   textAnchor="middle" fontSize="9" fontFamily="Geist,sans-serif" fill="rgba(255,255,255,0.25)">O</text>
              <text x="-96" y="4"   textAnchor="middle" fontSize="9" fontFamily="Geist,sans-serif" fill="rgba(255,255,255,0.25)">W</text>
            </g>
          )}
        </svg>
      </div>
    </div>
  );
}
