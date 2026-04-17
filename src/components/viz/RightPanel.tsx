'use client';
import { useFunnelStore } from '@/store/funnel';
import { calcPV, fmtDE } from '@/lib/calc';
import HouseScene from './HouseScene';
import Viz2Compass from './Viz2Compass';
import LandingRight from './LandingRight';

export default function RightPanel() {
  const { step, haustyp } = useFunnelStore();

  // Landing page: show example result
  if (step === 0) return <LandingRight />;

  // Step 2: house thumbnail (minimized) + compass viz side by side
  if (step === 2) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', maxWidth: 400, position: 'relative', gap: 12 }}>
        {/* Mini house in top-right */}
        {haustyp && (
          <div style={{ position: 'absolute', top: 0, right: 0, width: 110, zIndex: 2 }}>
            <HouseScene />
          </div>
        )}
        {/* Compass viz takes up main space */}
        <div style={{ width: '100%', marginTop: haustyp ? 8 : 0 }}>
          <Viz2Compass />
        </div>
      </div>
    );
  }

  // Step 3: canvas viz (simplified inline)
  if (step === 3) {
    return (
      <div style={{ width: '100%', maxWidth: 400 }}>
        <HouseScene />
      </div>
    );
  }

  // Steps 1, 4, 5, 6: house scene
  if (step === 1 || step === 4 || step === 5 || step === 6) {
    return (
      <div style={{ width: '100%', maxWidth: 400 }}>
        <HouseScene />
      </div>
    );
  }

  // Result: result chart
  if (step === 'result') {
    return <ResultViz />;
  }

  // Empty state
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, opacity: 0.2, textAlign: 'center' }}>
      <svg viewBox="0 0 48 48" style={{ width: 44, height: 44, stroke: 'var(--text-muted)', fill: 'none' }}>
        <path d="M6 20L24 6l18 14v22a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V20Z" strokeDasharray="4 3"/>
        <path d="M18 42V28h12v14"/>
      </svg>
      <p style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.5 }}>Wähle Deinen Gebäudetyp<br/>um die Visualisierung zu starten</p>
    </div>
  );
}

function ResultViz() {
  const state = useFunnelStore();

  const pv = calcPV(state);

  return (
    <div style={{ width: '100%', maxWidth: 400, display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div style={{ background: 'var(--bg-card-sel)', border: '1.5px solid var(--border-sel)', borderRadius: 'var(--radius-lg)', padding: '1.25rem', textAlign: 'center' }}>
        <div style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '.08em', color: 'var(--accent)', opacity: .75, marginBottom: 6 }}>20-Jahre-Nettogewinn</div>
        <div style={{ fontSize: 42, fontWeight: 700, letterSpacing: '-0.04em', color: 'var(--accent)', lineHeight: 1 }}>{pv.netto20 > 0 ? '+' : ''}{fmtDE(pv.netto20)} €</div>
        <div style={{ fontSize: 12, color: 'var(--text-subtle)', marginTop: 6 }}>Break-Even in Jahr {pv.breakEvenJahr || '> 20'}</div>
      </div>

      {/* 20y chart */}
      <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '1rem 1.1rem' }}>
        <div style={{ fontSize: 10, color: 'var(--text-subtle)', textTransform: 'uppercase', letterSpacing: '.06em', marginBottom: 10 }}>Kumulative Ersparnis — 20 Jahre</div>
        <ResultChart pv={pv}/>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
        {[
          ['Jährliche Erzeugung', `${fmtDE(pv.erzeugt)} kWh`, false],
          ['Eigenverbrauch',      `${pv.evPct} %`,             true],
          ['Einspeisung',        `${fmtDE(pv.einspKwh)} kWh`, false],
          ['Rendite p.a.',       `${pv.rendite} %`,            false],
        ].map(([label, val, accent]) => (
          <div key={String(label)} style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', padding: '10px 12px' }}>
            <div style={{ fontSize: 9, color: 'var(--text-subtle)', textTransform: 'uppercase', letterSpacing: '.04em', marginBottom: 4 }}>{label}</div>
            <div style={{ fontSize: 16, fontWeight: 600, color: accent ? 'var(--accent)' : 'var(--text-primary)' }}>{val}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ResultChart({ pv }: { pv: any }) {
  const W = 360, H = 200;
  const pad = { t: 20, r: 16, b: 32, l: 56 };
  const cw = W - pad.l - pad.r;
  const ch = H - pad.t - pad.b;
  const maxVal = Math.max(...pv.yearly.map((y: any) => y.kumulativ));
  const minVal = Math.min(-pv.invest, 0);
  const range = maxVal - minVal;
  const yPos = (v: number) => pad.t + ch - ((v - minVal) / range * ch);
  const xPos = (i: number) => pad.l + (i / 19) * cw;
  const zy = yPos(0);

  const linePath = pv.yearly.map((y: any, i: number) => `${i === 0 ? 'M' : 'L'}${xPos(i)},${yPos(y.kumulativ)}`).join(' ');
  const areaPath = linePath + ` L${xPos(19)},${zy} L${xPos(0)},${zy} Z`;

  const bex = pv.breakEvenJahr > 0 ? pv.breakEvenJahr - 1 : null;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} width="100%">
      <defs>
        <linearGradient id="rc-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(190,242,100,0.25)"/>
          <stop offset="100%" stopColor="rgba(190,242,100,0.02)"/>
        </linearGradient>
      </defs>
      {/* grid */}
      {[0, 0.25, 0.5, 0.75, 1].map(f => {
        const y = pad.t + ch * f;
        return <line key={f} x1={pad.l} y1={y} x2={W - pad.r} y2={y} stroke="rgba(255,255,255,0.06)" strokeWidth="1"/>;
      })}
      {/* zero line */}
      <line x1={pad.l} y1={zy} x2={W - pad.r} y2={zy} stroke="rgba(255,255,255,0.12)" strokeWidth="1" strokeDasharray="4 3"/>
      <text x={pad.l - 4} y={zy + 4} textAnchor="end" fontSize="9" fontFamily="Geist,sans-serif" fill="rgba(255,255,255,0.3)">0 €</text>
      {/* invest line */}
      <line x1={pad.l} y1={yPos(-pv.invest)} x2={W - pad.r} y2={yPos(-pv.invest)} stroke="rgba(255,100,100,0.25)" strokeWidth="1" strokeDasharray="4 3"/>
      {/* area */}
      <path d={areaPath} fill="url(#rc-grad)"/>
      {/* line */}
      <path d={linePath} fill="none" stroke="rgba(190,242,100,0.9)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      {/* break-even dot */}
      {bex !== null && (
        <>
          <line x1={xPos(bex)} y1={zy} x2={xPos(bex)} y2={pad.t} stroke="rgba(190,242,100,0.2)" strokeWidth="1" strokeDasharray="3 2"/>
          <circle cx={xPos(bex)} cy={zy} r="5" fill="rgba(190,242,100,0.9)" stroke="rgba(0,0,0,0.3)" strokeWidth="1.5"/>
        </>
      )}
      {/* axis labels */}
      <text x={pad.l} y={H - 4} fontSize="9" fontFamily="Geist,sans-serif" fill="rgba(255,255,255,0.2)">Jahr 1</text>
      <text x={W - pad.r} y={H - 4} textAnchor="end" fontSize="9" fontFamily="Geist,sans-serif" fill="rgba(255,255,255,0.2)">Jahr 20</text>
      <text x={W - pad.r} y={yPos(maxVal) - 4} textAnchor="end" fontSize="9" fontFamily="Geist,sans-serif" fill="rgba(190,242,100,0.9)" fontWeight="600">+{Math.round(maxVal / 1000)}k €</text>
    </svg>
  );
}
