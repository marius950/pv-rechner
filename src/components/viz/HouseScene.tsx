'use client';
import { useEffect, useRef, useState } from 'react';
import { useFunnelStore } from '@/store/funnel';
import type { HausTyp, DachTyp } from '@/types';
import { hausDaten, dachDaten } from '@/lib/data';

const C = {
  lime: '#c7f360', limeSoft: '#d9f99d', limeBrt: '#bef264',
  green: '#156949', dark: '#093524', mid: '#055435', ground: '#0a4228',
};

// ── SVG selection per haustyp × dachtyp × state ──────────────────
function getHouseSVG(
  ht: HausTyp | null,
  dt: DachTyp | null,
  hasPV: boolean,
  hasBat: boolean,
  hasCar: boolean,
): string {
  if (!ht) return '/house/base.svg';

  // ── EFH — lime C7F360 front wall ──
  if (ht === 'efh') {
    if (!hasPV) return '/house/efh-sattel-base.svg';
    if (dt === 'flach') {
      if (hasCar) return '/house/efh-flach-car.svg';
      return '/house/efh-flach-new.svg';
    }
    if (dt === 'pult') {
      if (hasBat && hasCar) return '/house/pult-bat-car.svg';
      if (hasBat)           return '/house/pult-bat.svg';
      if (hasCar)           return '/house/sattel-car.svg';
      return '/house/pult.svg';
    }
    if (dt === 'walm') {
      if (hasBat && hasCar) return '/house/walm-bat-car.svg';
      if (hasBat)           return '/house/walm-bat.svg';
      if (hasCar)           return '/house/walm-car.svg';
      return '/house/walm.svg';
    }
    // sattel (default EFH)
    if (hasBat && hasCar) return '/house/sattel-bat-car.svg';
    if (hasBat)           return '/house/sattel-bat.svg';
    if (hasCar)           return '/house/sattel-car.svg';
    return '/house/efh-sattel-pv.svg';
  }

  // ── DHH — Doppelhaushälfte (single half, lime + dark side) ──
  if (ht === 'dhh') {
    if (!hasPV) return '/house/dhh-nopv.svg';
    if (dt === 'flach') {
      if (hasCar) return '/house/efh-flach-car.svg';
      return '/house/efh-flach-new.svg';
    }
    if (dt === 'pult') {
      if (hasBat && hasCar) return '/house/pult-bat-car.svg';
      if (hasBat)           return '/house/pult-bat.svg';
      return '/house/pult.svg';
    }
    if (dt === 'walm') {
      if (hasCar) return '/house/dhh-pv-car.svg';
      return '/house/dhh-pv.svg';
    }
    // sattel
    if (hasCar) return '/house/dhh-pv-car.svg';
    return '/house/dhh-pv.svg';
  }

  // ── RH — Reihenhaus: 3 units side-by-side ──
  if (ht === 'rh') {
    if (!hasPV) return '/house/rh-3units.svg';
    return '/house/rh-3units-pv.svg';
  }

  // ── Other/Gewerbe — two separate buildings ──
  if (ht === 'other') {
    if (!hasPV) return '/house/other-sattel.svg';
    if (hasBat && hasCar) return '/house/other-sattel-bat-car.svg';
    if (hasBat)           return '/house/other-sattel-bat.svg';
    return '/house/other-sattel.svg';
  }

  return '/house/base.svg';
}

// ── Build-up animation hook ───────────────────────────────────────
function useHouseReveal(svgSrc: string | null) {
  const [visible, setVisible] = useState(false);
  const [currentSrc, setCurrentSrc] = useState<string | null>(null);
  const prevSrc = useRef<string | null>(null);

  useEffect(() => {
    if (!svgSrc) { setVisible(false); setCurrentSrc(null); prevSrc.current = null; return; }
    if (svgSrc === prevSrc.current) return;
    // New house selected — fade out then in
    setVisible(false);
    const t = setTimeout(() => {
      setCurrentSrc(svgSrc);
      prevSrc.current = svgSrc;
      // Small delay then reveal
      setTimeout(() => setVisible(true), 60);
    }, svgSrc === null || prevSrc.current === null ? 0 : 180);
    return () => clearTimeout(t);
  }, [svgSrc]);

  return { visible, currentSrc };
}

// ── Persons layer — Figma SVG assets ─────────────────────────────
const PERSON_SRCS = [
  '/persons/p1.svg', '/persons/p2.svg', '/persons/p3.svg',
  '/persons/p4.svg', '/persons/p5.svg', '/persons/p6.svg',
  '/persons/p7.svg', '/persons/p8.svg',
];
// Figma person viewBoxes (w×h): p1=67×118, p2=52×119, p3=54×119, p4=47×119
// p5=53×121, p6=61×121, p7=56×96, p8=94×136
const PERSON_DIMS = [
  [67,118],[52,119],[54,119],[47,119],[53,121],[61,121],[56,96],[94,136],
];

function PersonsLayer({ count, haustyp }: { count: number; haustyp: HausTyp | null }) {
  const spacing = {efh:36, dhh:28, rh:24, other:32}[haustyp??'efh'];
  const cx      = {efh:186, dhh:196, rh:200, other:188}[haustyp??'efh'];
  const startX  = cx - (count-1)*spacing/2;
  const targetH = 72; // height in SVG units to stand on ground

  return (
    <>
      {Array.from({length:count}).map((_,i) => {
        const x     = Math.round(startX + i*spacing);
        const scale = i%3===2 ? 0.82 : i%3===1 ? 0.90 : 1.0;
        const pidx  = i % PERSON_SRCS.length;
        const [pw, ph] = PERSON_DIMS[pidx];
        const drawH = Math.round(targetH * scale);
        const drawW = Math.round((pw/ph) * drawH);
        return (
          <g key={i} style={{
            opacity: 1,
            animation: `personSlideUp 0.4s cubic-bezier(0,0,0.2,1) ${i*80}ms both`,
          }}>
            <ellipse cx={x} cy={269} rx={Math.round(drawW*0.38)} ry="2.5" fill="rgba(0,0,0,0.22)"/>
            <image
              href={PERSON_SRCS[pidx]}
              x={x - Math.round(drawW/2)}
              y={268 - drawH}
              width={drawW}
              height={drawH}
              preserveAspectRatio="xMidYMax meet"
            />
          </g>
        );
      })}
    </>
  );
}

// ── Ground scenes ─────────────────────────────────────────────────
function EFHScene() {
  return <>
    <rect x="0" y="268" width="400" height="52" fill={C.ground}/>
    <ellipse cx="65" cy="268" rx="62" ry="6" fill="#0d5030"/>
    <ellipse cx="335" cy="268" rx="58" ry="6" fill="#0d5030"/>
    <rect x="181" y="268" width="38" height="30" fill="#0a3d22" opacity="0.6" rx="1"/>
    <g style={{transformOrigin:'55px 268px',animation:'grassWave 2.5s cubic-bezier(0.4,0,0.2,1) infinite'}}>
      {[[22,260],[30,259],[38,262],[46,260],[54,263],[62,259],[70,261],[78,259],[86,262]].map(([tx,ty],i)=>(
        <line key={i} x1={20+i*8} y1="268" x2={tx} y2={ty} stroke={C.lime} strokeWidth="1.3" strokeLinecap="round" opacity="0.7"/>
      ))}
    </g>
    <g style={{transformOrigin:'338px 268px',animation:'grassWave 2.5s cubic-bezier(0.4,0,0.2,1) 0.4s infinite'}}>
      {[[308,260],[316,259],[324,262],[332,260],[340,263],[348,259],[356,261],[364,259],[372,262]].map(([tx,ty],i)=>(
        <line key={i} x1={306+i*8} y1="268" x2={tx} y2={ty} stroke={C.lime} strokeWidth="1.3" strokeLinecap="round" opacity="0.7"/>
      ))}
    </g>
    <line x1="48" y1="268" x2="48" y2="257" stroke={C.lime} strokeWidth="1.5"/>
    <circle cx="48" cy="255" r="4" fill={C.lime} opacity="0.9"/>
    <circle cx="44" cy="257" r="2.5" fill={C.limeSoft} opacity="0.7"/>
    <circle cx="52" cy="257" r="2.5" fill={C.limeSoft} opacity="0.7"/>
    <line x1="338" y1="268" x2="338" y2="257" stroke={C.lime} strokeWidth="1.5"/>
    <circle cx="338" cy="255" r="4" fill={C.lime} opacity="0.9"/>
    <circle cx="334" cy="257" r="2.5" fill={C.limeSoft} opacity="0.7"/>
    <circle cx="342" cy="257" r="2.5" fill={C.limeSoft} opacity="0.7"/>
    <line x1="20" y1="232" x2="29" y2="268" stroke={C.dark} strokeWidth="2" strokeLinecap="round"/>
    <line x1="58" y1="232" x2="49" y2="268" stroke={C.dark} strokeWidth="2" strokeLinecap="round"/>
    <line x1="20" y1="232" x2="58" y2="232" stroke={C.dark} strokeWidth="1.5"/>
    <g style={{transformOrigin:'39px 232px',animation:'swingAnim 2.8s cubic-bezier(0.4,0,0.2,1) infinite'}}>
      <line x1="29" y1="232" x2="29" y2="252" stroke={C.green} strokeWidth="1.2" strokeDasharray="2 2"/>
      <line x1="49" y1="232" x2="49" y2="252" stroke={C.green} strokeWidth="1.2" strokeDasharray="2 2"/>
      <rect x="24" y="251" width="30" height="5" fill={C.dark} stroke={C.green} strokeWidth="1" rx="2"/>
      <circle cx="39" cy="244" r="6" fill={C.lime} opacity="0.9"/>
    </g>
    <rect x="357" y="238" width="8" height="30" fill={C.dark} rx="3"/>
    <g style={{transformOrigin:'361px 234px',animation:'treeSway 3.5s cubic-bezier(0.4,0,0.2,1) infinite'}}>
      <ellipse cx="361" cy="222" rx="22" ry="20" fill={C.green}/>
      <ellipse cx="350" cy="230" rx="14" ry="12" fill="#0d5030"/>
      <ellipse cx="372" cy="229" rx="12" ry="11" fill="#0d5030"/>
      <ellipse cx="361" cy="210" rx="14" ry="12" fill={C.lime} opacity="0.6"/>
    </g>
  </>;
}
function DHHScene() {
  return <>
    <rect x="0" y="268" width="400" height="52" fill={C.ground}/>
    <ellipse cx="78" cy="268" rx="48" ry="5" fill="#0d5030"/>
    <ellipse cx="322" cy="268" rx="48" ry="5" fill="#0d5030"/>
    <rect x="180" y="246" width="40" height="22" fill={C.green} rx="4"/>
    <ellipse cx="186" cy="246" rx="8" ry="7" fill="#0d5030"/>
    <ellipse cx="200" cy="243" rx="7" ry="6" fill={C.green}/>
    <ellipse cx="214" cy="246" rx="8" ry="7" fill="#0d5030"/>
    <rect x="48" y="249" width="6" height="19" fill={C.dark} rx="2"/>
    <ellipse cx="51" cy="240" rx="16" ry="14" fill={C.green}/>
    <ellipse cx="51" cy="233" rx="10" ry="9" fill={C.lime} opacity="0.5"/>
    <g style={{transformOrigin:'78px 268px',animation:'grassWave 2.5s cubic-bezier(0.4,0,0.2,1) infinite'}}>
      {[40,48,56,64,72,80,88,96].map((x,i)=>(
        <line key={i} x1={x} y1="268" x2={x+[-2,2,-2,3,-2,3,-2,2][i]} y2={[261,260,262,260,263,260,261,260][i]} stroke={C.lime} strokeWidth="1.2" strokeLinecap="round" opacity="0.65"/>
      ))}
    </g>
    <g style={{transformOrigin:'322px 268px',animation:'grassWave 2.5s cubic-bezier(0.4,0,0.2,1) 0.4s infinite'}}>
      {[300,308,316,324,332,340,348,356].map((x,i)=>(
        <line key={i} x1={x} y1="268" x2={x+[-2,2,-2,3,-2,3,-2,2][i]} y2={[261,260,262,260,263,260,261,260][i]} stroke={C.lime} strokeWidth="1.2" strokeLinecap="round" opacity="0.65"/>
      ))}
    </g>
  </>;
}
function RHScene() {
  return <>
    <rect x="0" y="268" width="400" height="52" fill={C.ground}/>
    <rect x="34" y="265" width="82" height="8" fill="#0d5030" rx="1"/>
    <rect x="140" y="262" width="80" height="10" fill="#0d5030" rx="1"/>
    <rect x="242" y="265" width="82" height="8" fill="#0d5030" rx="1"/>
    {[54,96,162,208,262,306].map((cx,i)=>(
      <ellipse key={i} cx={cx} cy={i<2||i>=4?265:263} rx={i%2===0?11:9} ry={i<2||i>=4?7:8} fill={i%3===0?C.green:'#0d5030'} opacity="0.9"/>
    ))}
  </>;
}
function OtherScene() {
  return <>
    <rect x="0" y="268" width="400" height="52" fill="#082e1c"/>
    {[16,42,68,94,308,334,360,386].map((x,i)=>(
      <line key={i} x1={x} y1="268" x2={x} y2="300" stroke={C.dark} strokeWidth="1" opacity="0.6"/>
    ))}
    <rect x="4" y="244" width="24" height="16" fill={C.green} stroke={C.lime} strokeWidth="1" rx="2"/>
    <text x="16" y="255" textAnchor="middle" fontSize="6" fontFamily="Geist,sans-serif" fontWeight="600" fill={C.lime}>PV</text>
  </>;
}

// ── Main HouseScene ───────────────────────────────────────────────
export default function HouseScene() {
  const { step, haustyp, dachtyp, speicher, wallbox, persons } = useFunnelStore();

  const showRoof    = step !== 1 && !!dachtyp && !!haustyp;
  const showPersons = step === 4;
  // Only show battery/car in SVG from step 5 onwards (when user has actually selected them)
  const showExtras  = typeof step === 'number' && step >= 5;
  const hasBat      = showExtras && speicher === 'ja';
  const hasCar      = showExtras && wallbox === 'ja';
  const ht          = haustyp ?? 'efh';

  const svgSrc = haustyp ? getHouseSVG(haustyp, showRoof ? dachtyp : null, showRoof, hasBat, hasCar) : null;
  const { visible: houseVisible, currentSrc } = useHouseReveal(svgSrc);

  // Also animate scene in when haustyp first selected
  const [sceneVisible, setSceneVisible] = useState(false);
  const prevHt = useRef<string | null>(null);
  useEffect(() => {
    if (haustyp && haustyp !== prevHt.current) {
      setSceneVisible(false);
      prevHt.current = haustyp;
      const t = setTimeout(() => setSceneVisible(true), 80);
      return () => clearTimeout(t);
    }
    if (!haustyp) setSceneVisible(false);
  }, [haustyp]);

  return (
    <div className="house-viz">
      <style>{`
        @keyframes personSlideUp {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes houseReveal {
          from { opacity: 0; transform: translateY(18px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes sceneRise {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <svg viewBox="0 0 400 320" width="100%" style={{overflow:'visible'}}>
        <defs>
          <radialGradient id="sky-grad" cx="50%" cy="25%" r="65%">
            <stop offset="0%" stopColor="#0f5c3a"/>
            <stop offset="100%" stopColor={C.mid}/>
          </radialGradient>
        </defs>

        {/* Sky */}
        <rect x="0" y="0" width="400" height="320" fill="url(#sky-grad)"/>

        {/* Sun */}
        <circle cx="342" cy="52" r="28" fill={C.lime} opacity="0.12"/>
        <circle cx="342" cy="52" r="19" fill={C.lime} opacity="0.22"/>
        <circle cx="342" cy="52" r="12" fill={C.lime} opacity="0.85"/>
        {([[342,18,342,10],[342,86,342,94],[308,52,300,52],[376,52,384,52],[319,29,313,23],[365,75,371,81],[365,29,371,23],[319,75,313,81]] as number[][]).map(([x1,y1,x2,y2],i)=>(
          <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={C.lime} strokeWidth="2" strokeLinecap="round" opacity="0.7"/>
        ))}

        {/* Clouds */}
        <g className="cloud1" opacity="0.25">
          <ellipse cx="60" cy="42" rx="26" ry="12" fill={C.limeSoft}/>
          <ellipse cx="80" cy="38" rx="20" ry="11" fill="white"/>
        </g>
        <g className="cloud2" opacity="0.2">
          <ellipse cx="252" cy="30" rx="22" ry="10" fill="white"/>
          <ellipse cx="268" cy="27" rx="15" ry="8" fill={C.limeSoft}/>
        </g>

        {/* BG trees */}
        <rect x="374" y="212" width="7" height="24" fill={C.dark} rx="2" opacity="0.5"/>
        <ellipse cx="377" cy="207" rx="16" ry="14" fill={C.dark} opacity="0.45"/>

        {/* Ground scene — animated in when haustyp selected */}
        {haustyp && (
          <g style={{
            opacity: sceneVisible ? 1 : 0,
            transform: sceneVisible ? 'translateY(0)' : 'translateY(10px)',
            transition: 'opacity 0.5s ease, transform 0.5s cubic-bezier(0,0,0.2,1)',
          }}>
            {ht==='efh'   && <EFHScene/>}
            {ht==='dhh'   && <DHHScene/>}
            {ht==='rh'    && <RHScene/>}
            {ht==='other' && <OtherScene/>}
          </g>
        )}

        {/* Empty ground strip before selection */}
        {!haustyp && <rect x="0" y="268" width="400" height="52" fill={C.ground} opacity="0.4"/>}

        {/* Figma house SVG — animates in when selected/changed */}
        {currentSrc && (
          <g style={{
            opacity: houseVisible ? 1 : 0,
            transform: houseVisible ? 'translateY(0) scale(1)' : 'translateY(18px) scale(0.97)',
            transition: 'opacity 0.45s cubic-bezier(0,0,0.2,1), transform 0.45s cubic-bezier(0,0,0.2,1)',
            transformOrigin: '200px 200px',
          }}>
            {/* Different crops per haustyp to fill our 400px wide viewBox */}
            {ht === 'rh' ? (
              <image href={currentSrc} x="-50" y="42" width="500" height="240"
                preserveAspectRatio="xMidYMid meet"/>
            ) : ht === 'dhh' ? (
              <image href={currentSrc} x="-20" y="42" width="440" height="240"
                preserveAspectRatio="xMidYMid meet"/>
            ) : ht === 'other' ? (
              <image href={currentSrc} x="-100" y="42" width="600" height="240"
                preserveAspectRatio="xMidYMid meet"/>
            ) : (
              <image href={currentSrc} x="0" y="42" width="400" height="240"
                preserveAspectRatio="xMidYMid meet"/>
            )}
          </g>
        )}

        {/* Placeholder ghost house */}
        {!haustyp && (
          <g opacity="0.08">
            <rect x="100" y="148" width="200" height="120" fill="white" rx="4"/>
            <polygon points="80,150 200,82 320,150" fill="white"/>
          </g>
        )}

        {/* Energy line to sun */}
        {showRoof && houseVisible && (
          <line x1="200" y1="140" x2="342" y2="56" stroke={C.lime} strokeWidth="1" strokeDasharray="3 4" opacity="0.4"
            style={{opacity: houseVisible ? 0.4 : 0, transition: 'opacity 0.6s ease 0.3s'}}/>
        )}

        {/* Battery cable signal */}
        {hasBat && (
          <g>
            <path id="cable-signal" d="M 200 140 L 200 268 L 162 268 L 162 280" fill="none" stroke="none"/>
            {[0, 0.7, 1.4].map((begin,i)=>(
              <circle key={i} r={2.5-i*0.4} fill={C.lime} opacity={0.85-i*0.25}>
                <animateMotion dur="2s" repeatCount="indefinite" begin={`${begin}s`}>
                  <mpath href="#cable-signal"/>
                </animateMotion>
              </circle>
            ))}
          </g>
        )}

        {/* Wallbox signal */}
        {hasCar && (
          <g>
            <path id="car-signal" d="M 270 200 Q 305 230 330 250" fill="none" stroke="none"/>
            <circle r="2.5" fill={C.lime} opacity="0.9">
              <animateMotion dur="1.4s" repeatCount="indefinite">
                <mpath href="#car-signal"/>
              </animateMotion>
            </circle>
          </g>
        )}

        {/* Persons */}
        {showPersons && <PersonsLayer count={persons} haustyp={haustyp}/>}
      </svg>

      {/* Info tags */}
      {haustyp && (
        <div className="info-tags">
          <div className="info-tag show">
            <div className="itdot" style={{background:C.lime}}/>
            <div className="itlabel">Gebäudetyp</div>
            <div className="itval">{hausDaten[ht]?.label??'–'}</div>
          </div>
          {showPersons && <>
            <div className="info-tag show">
              <div className="itdot" style={{background:'var(--text-subtle)'}}/>
              <div className="itlabel">Personen</div>
              <div className="itval">{persons}</div>
            </div>
            <div className="info-tag show">
              <div className="itdot" style={{background:C.lime}}/>
              <div className="itlabel">Jahresverbrauch</div>
              <div className="itval">{(1500+persons*700).toLocaleString('de')} kWh</div>
            </div>
          </>}
          {showRoof && !showPersons && dachtyp && (
            <div className="info-tag show">
              <div className="itdot" style={{background:'var(--text-subtle)'}}/>
              <div className="itlabel">Dachtyp</div>
              <div className="itval">{dachDaten[dachtyp]?.label}</div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
