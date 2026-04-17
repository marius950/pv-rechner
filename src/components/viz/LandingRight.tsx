'use client';
import { useEffect, useRef, useState } from 'react';

const C = {
  lime:    '#c7f360',
  limeBrt: '#bef264',
  limeSoft:'#d9f99d',
  green:   '#156949',
  dark:    '#093524',
  mid:     '#055435',
};

// Realistic example: EFH, 150m², Süd-Satteldach, 3 Personen, mit Speicher
const EXAMPLE = {
  kwp: 8.4,
  module: 20,
  invest: 14200,
  ersparnis: 1380,
  breakEven: 9,
  netto20: 27400,
  evPct: 78,
  co2: 3.2,
};

// Generate 20-year cumulative data
function makeYearlyData(invest: number, ersparnis: number) {
  const data: { y: number; kum: number }[] = [];
  let kum = -invest;
  for (let y = 1; y <= 20; y++) {
    const preis = 1 + y * 0.04;
    kum += Math.round(ersparnis * preis * Math.pow(0.99, y));
    data.push({ y, kum });
  }
  return data;
}

function BreakEvenChart({ animated }: { animated: boolean }) {
  const data = makeYearlyData(EXAMPLE.invest, EXAMPLE.ersparnis);
  const invest = EXAMPLE.invest;
  const W = 340, H = 160;
  const pad = { t: 16, r: 12, b: 28, l: 48 };
  const cw = W - pad.l - pad.r;
  const ch = H - pad.t - pad.b;

  const allVals = data.map(d => d.kum);
  const minV = Math.min(-invest, ...allVals);
  const maxV = Math.max(...allVals);
  const range = maxV - minV;

  const yPos = (v: number) => pad.t + ch - ((v - minV) / range * ch);
  const xPos = (i: number) => pad.l + (i / 19) * cw;
  const zy = yPos(0);

  const bex = EXAMPLE.breakEven - 1; // 0-indexed

  const linePath = data.map((d, i) => `${i === 0 ? 'M' : 'L'}${xPos(i).toFixed(1)},${yPos(d.kum).toFixed(1)}`).join(' ');
  const areaAbove = data.filter(d => d.kum >= 0);
  const firstPos = data.findIndex(d => d.kum >= 0);

  // Interpolated x at zero crossing
  const bxRaw = firstPos > 0
    ? xPos(firstPos - 1) + (xPos(firstPos) - xPos(firstPos - 1)) * (Math.abs(data[firstPos - 1].kum) / (Math.abs(data[firstPos - 1].kum) + data[firstPos].kum))
    : xPos(bex);

  return (
    <svg viewBox={`0 0 ${W} ${H}`} width="100%">
      <defs>
        <linearGradient id="pos-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={C.lime} stopOpacity="0.3"/>
          <stop offset="100%" stopColor={C.lime} stopOpacity="0.03"/>
        </linearGradient>
        <linearGradient id="neg-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(239,99,39,0.04)"/>
          <stop offset="100%" stopColor="rgba(239,99,39,0.18)"/>
        </linearGradient>
        <clipPath id="above-zero"><rect x={pad.l} y={pad.t} width={cw} height={zy - pad.t}/></clipPath>
        <clipPath id="below-zero"><rect x={pad.l} y={zy} width={cw} height={pad.t + ch - zy}/></clipPath>
      </defs>

      {/* Grid lines */}
      {[0, 0.25, 0.5, 0.75, 1].map(f => {
        const yg = pad.t + ch * f;
        const v = maxV - f * range;
        return (
          <g key={f}>
            <line x1={pad.l} y1={yg} x2={W - pad.r} y2={yg} stroke="rgba(255,255,255,0.05)" strokeWidth="1"/>
            {Math.abs(v) < range * 0.15 ? null : (
              <text x={pad.l - 4} y={yg + 4} textAnchor="end" fontSize="8" fontFamily="Geist,sans-serif"
                fill={v > 0 ? 'rgba(199,243,96,0.5)' : 'rgba(255,255,255,0.2)'}>
                {v > 0 ? `+${Math.round(v/1000)}k` : `${Math.round(v/1000)}k`}
              </text>
            )}
          </g>
        );
      })}

      {/* Zero line */}
      <line x1={pad.l} y1={zy} x2={W - pad.r} y2={zy} stroke="rgba(255,255,255,0.18)" strokeWidth="1.5" strokeDasharray="5 3"/>
      <text x={pad.l - 4} y={zy + 4} textAnchor="end" fontSize="8" fontFamily="Geist,sans-serif" fill="rgba(255,255,255,0.35)" fontWeight="600">0</text>

      {/* Invest start dot */}
      <circle cx={pad.l} cy={yPos(-invest)} r="3.5" fill="rgba(239,99,39,0.8)"/>

      {/* Area fills */}
      <path d={`${linePath} L${xPos(19)},${zy} L${xPos(0)},${zy} Z`}
        fill="url(#pos-grad)" clipPath="url(#above-zero)" opacity={animated ? 1 : 0}
        style={{ transition: 'opacity 0.6s ease 1.8s' }}/>
      <path d={`${linePath} L${xPos(19)},${zy} L${xPos(0)},${zy} Z`}
        fill="url(#neg-grad)" clipPath="url(#below-zero)" opacity={animated ? 1 : 0}
        style={{ transition: 'opacity 0.6s ease 1.8s' }}/>

      {/* Main line */}
      <path d={linePath} fill="none" stroke={C.lime} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
        style={{
          strokeDasharray: 800,
          strokeDashoffset: animated ? 0 : 800,
          transition: 'stroke-dashoffset 2.2s cubic-bezier(0.4,0,0.2,1) 0.3s',
        }}/>

      {/* Break-even vertical */}
      {animated && (
        <g style={{ opacity: animated ? 1 : 0, transition: 'opacity 0.4s ease 2.2s' }}>
          <line x1={bxRaw} y1={pad.t} x2={bxRaw} y2={pad.t + ch}
            stroke={C.lime} strokeWidth="1" strokeDasharray="4 3" opacity="0.5"/>
          {/* Break-even dot on line */}
          <circle cx={bxRaw} cy={zy} r="5.5" fill={C.lime} stroke={C.dark} strokeWidth="1.5"/>
          {/* Label */}
          <rect x={bxRaw - 28} y={zy - 22} width="56" height="16" fill={C.dark} stroke={C.lime} strokeWidth="0.8" rx="4"/>
          <text x={bxRaw} y={zy - 11} textAnchor="middle" fontSize="9" fontFamily="Geist,sans-serif"
            fill={C.lime} fontWeight="600">Break-Even J.{EXAMPLE.breakEven}</text>
        </g>
      )}

      {/* End value */}
      {animated && (
        <g style={{ opacity: 1, transition: 'opacity 0.4s ease 2.4s' }}>
          <text x={W - pad.r} y={yPos(data[19].kum) - 6} textAnchor="end"
            fontSize="10" fontFamily="Geist,sans-serif" fill={C.lime} fontWeight="700">
            +{Math.round(data[19].kum / 1000)}k €
          </text>
        </g>
      )}

      {/* X axis labels */}
      <text x={pad.l} y={H - 4} fontSize="8" fontFamily="Geist,sans-serif" fill="rgba(255,255,255,0.2)">Jahr 1</text>
      <text x={W - pad.r} y={H - 4} textAnchor="end" fontSize="8" fontFamily="Geist,sans-serif" fill="rgba(255,255,255,0.2)">Jahr 20</text>
    </svg>
  );
}

export default function LandingRight() {
  const [ticker, setTicker]     = useState(0);
  const [animated, setAnimated] = useState(false);
  const ran = useRef(false);

  useEffect(() => {
    if (ran.current) return;
    ran.current = true;
    setTimeout(() => setAnimated(true), 300);
    const target = EXAMPLE.netto20;
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
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%', maxWidth: 380, gap: 9 }}>
      {/* Label with real user avatars */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ display: 'flex' }}>
            {['/avatars/user2.jpg', '/avatars/user4.jpg'].map((src, i) => (
              <img key={i} src={src} alt="" width={22} height={22}
                style={{ borderRadius: '50%', marginLeft: i > 0 ? -7 : 0, border: '1.5px solid var(--bg)', objectFit: 'cover', objectPosition: 'center top' }}/>
            ))}
          </div>
          <span style={{ fontSize: 11, color: 'var(--text-subtle)' }}>Beispielrechnung</span>
        </div>
        <span style={{ fontSize: 11, color: 'var(--text-faint)', background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 100, padding: '2px 9px' }}>
          EFH · 150 m² · Süd
        </span>
      </div>

      {/* Break-Even Chart — main hero */}
      <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '14px 14px 10px', position: 'relative', overflow: 'hidden' }}>
        {/* Glow */}
        <div style={{ position: 'absolute', top: -30, right: -30, width: 120, height: 120, background: `radial-gradient(circle, ${C.lime}18 0%, transparent 70%)`, pointerEvents: 'none' }}/>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
          <div>
            <div style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '.07em', color: 'var(--text-subtle)', marginBottom: 3 }}>20-Jahre-Nettogewinn</div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 3 }}>
              <span style={{ fontSize: 36, fontWeight: 700, letterSpacing: '-0.04em', color: C.lime, lineHeight: 1, fontVariantNumeric: 'tabular-nums' }}>
                +{ticker.toLocaleString('de')}
              </span>
              <span style={{ fontSize: 18, fontWeight: 600, color: C.lime, opacity: .8 }}> €</span>
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '.07em', color: 'var(--text-subtle)', marginBottom: 3 }}>Break-Even</div>
            <div style={{ fontSize: 24, fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.03em', lineHeight: 1 }}>J. {EXAMPLE.breakEven}</div>
          </div>
        </div>
        <BreakEvenChart animated={animated}/>
        {/* Chart legend */}
        <div style={{ display: 'flex', gap: 14, marginTop: 6, fontSize: 10, color: 'var(--text-faint)' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <span style={{ width: 14, height: 3, background: C.lime, borderRadius: 2, display: 'inline-block' }}/>
            Kumulative Ersparnis
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: C.lime, display: 'inline-block' }}/>
            Break-Even
          </span>
        </div>
      </div>

      {/* KPI row */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 7 }}>
        {[
          { label: 'Anlage',       val: `${EXAMPLE.kwp} kWp`,       lime: false },
          { label: 'Ersparnis/J.', val: `${EXAMPLE.ersparnis.toLocaleString('de')} €`, lime: true },
          { label: 'Eigenverbrauch',val: `${EXAMPLE.evPct} %`,      lime: false },
        ].map(({ label, val, lime }) => (
          <div key={label} style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', padding: '9px 8px', textAlign: 'center' }}>
            <div style={{ fontSize: 9, color: 'var(--text-subtle)', textTransform: 'uppercase', letterSpacing: '.04em', marginBottom: 3 }}>{label}</div>
            <div style={{ fontSize: 14, fontWeight: 600, color: lime ? C.lime : 'var(--text-primary)', letterSpacing: '-.02em' }}>{val}</div>
          </div>
        ))}
      </div>

      {/* Invest vs. return */}
      <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '12px 14px' }}>
        <div style={{ fontSize: 10, color: 'var(--text-subtle)', textTransform: 'uppercase', letterSpacing: '.06em', marginBottom: 10 }}>Investition vs. Ertrag</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {[
            { label: 'Investition',     val: EXAMPLE.invest,               max: 30000, color: 'rgba(239,99,39,0.6)', showPlus: false },
            { label: 'Ertrag 20 Jahre', val: EXAMPLE.invest + EXAMPLE.netto20, max: 30000, color: C.lime, showPlus: false },
          ].map(({ label, val, max, color, showPlus }) => (
            <div key={label}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4, fontSize: 11, color: 'var(--text-muted)' }}>
                <span>{label}</span>
                <span style={{ fontWeight: 600, color }}>{showPlus && '+'}{val.toLocaleString('de')} €</span>
              </div>
              <div style={{ height: 5, background: 'var(--slider-track)', borderRadius: 3, overflow: 'hidden' }}>
                <div style={{ height: '100%', background: color, borderRadius: 3, width: `${Math.min(val / max * 100, 100)}%`, transition: 'width 1s cubic-bezier(0.4,0,0.2,1) 0.5s' }}/>
              </div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 8, fontSize: 11, color: 'var(--text-subtle)', display: 'flex', gap: 6, alignItems: 'center' }}>
          <span style={{ background: `${C.lime}22`, border: `1px solid ${C.lime}44`, borderRadius: 100, padding: '2px 8px', color: C.lime, fontSize: 10, fontWeight: 600 }}>
            +{Math.round(EXAMPLE.netto20 / EXAMPLE.invest * 100)} % Netto-Rendite
          </span>
          <span style={{ color: 'var(--text-faint)' }}>über 20 Jahre</span>
        </div>
      </div>
    </div>
  );
}
