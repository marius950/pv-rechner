'use client';
import type { ReactNode } from 'react';
import { useFunnelStore } from '@/store/funnel';
import type { HausTyp, DachTyp } from '@/types';
import { hausDaten, dachDaten } from '@/lib/data';

// ─── effi Brand Colors (from Figma node 8975:4901) ───────────────
const C = {
  lime:     '#c7f360',   // front wall / lime accent (Figma #c7f360)
  green:    '#156949',   // back wall / shadow green
  dark:     '#093524',   // roof / door / window
  mid:      '#055435',   // bg / medium green
  limeSoft: '#d9f99d',   // lime/200
  limeBright:'#bef264',  // lime/300
  ground:   '#0a4228',   // ground strip
};

// ─── House Illustration (Figma-style flat SVG) ───────────────────
function EFHIllustration() {
  return (
    <g>
      {/* Shadow/back volume */}
      <rect x="230" y="142" width="150" height="130" fill={C.green} rx="2"/>
      {/* Front wall - lime */}
      <rect x="100" y="168" width="148" height="104" fill={C.lime} rx="2"/>
      {/* Roof - dark (trapezoid) */}
      <polygon points="86,170 248,170 375,142 375,130 240,130 86,154" fill={C.dark}/>
      {/* Roof front face */}
      <polygon points="86,154 86,170 248,170 248,154" fill={C.dark} opacity="0.7"/>
      {/* Door */}
      <rect x="155" y="226" width="38" height="46" fill={C.dark} rx="2"/>
      {/* Front window */}
      <rect x="109" y="185" width="38" height="32" fill={C.dark} rx="1.5"/>
      <line x1="128" y1="185" x2="128" y2="217" stroke={C.lime} strokeWidth="1.5" opacity="0.5"/>
      <line x1="109" y1="201" x2="147" y2="201" stroke={C.lime} strokeWidth="1.5" opacity="0.5"/>
      {/* Side windows */}
      <rect x="265" y="170" width="36" height="28" fill={C.dark} rx="1.5" opacity="0.9"/>
      <line x1="283" y1="170" x2="283" y2="198" stroke={C.green} strokeWidth="1.5" opacity="0.6"/>
      <line x1="265" y1="184" x2="301" y2="184" stroke={C.green} strokeWidth="1.5" opacity="0.6"/>
      <rect x="315" y="170" width="36" height="28" fill={C.dark} rx="1.5" opacity="0.9"/>
      <line x1="333" y1="170" x2="333" y2="198" stroke={C.green} strokeWidth="1.5" opacity="0.6"/>
      <line x1="315" y1="184" x2="351" y2="184" stroke={C.green} strokeWidth="1.5" opacity="0.6"/>
    </g>
  );
}

function DHHIllustration() {
  return (
    <g>
      <rect x="210" y="150" width="140" height="122" fill={C.green} rx="2"/>
      <rect x="110" y="172" width="128" height="100" fill={C.lime} rx="2"/>
      <polygon points="96,174 238,174 345,150 345,138 230,138 96,158" fill={C.dark}/>
      <polygon points="96,158 96,174 238,174 238,158" fill={C.dark} opacity="0.7"/>
      {/* Divider line */}
      <line x1="238" y1="138" x2="238" y2="272" stroke={C.dark} strokeWidth="2" opacity="0.5"/>
      {/* Doors */}
      <rect x="148" y="228" width="32" height="44" fill={C.dark} rx="2"/>
      <rect x="256" y="228" width="32" height="44" fill={C.dark} rx="2" opacity="0.7"/>
      {/* Windows */}
      <rect x="116" y="186" width="34" height="26" fill={C.dark} rx="1.5"/>
      <line x1="133" y1="186" x2="133" y2="212" stroke={C.lime} strokeWidth="1.5" opacity="0.5"/>
      <line x1="116" y1="199" x2="150" y2="199" stroke={C.lime} strokeWidth="1.5" opacity="0.5"/>
      <rect x="248" y="168" width="34" height="26" fill={C.dark} rx="1.5" opacity="0.85"/>
      <rect x="296" y="168" width="34" height="26" fill={C.dark} rx="1.5" opacity="0.85"/>
    </g>
  );
}

function RHIllustration() {
  // Three row houses
  return (
    <g>
      {/* Left unit */}
      <rect x="48" y="190" width="86" height="82" fill={C.green} rx="1"/>
      <polygon points="38,192 134,192 134,180 90,168 38,180" fill={C.dark}/>
      <rect x="78" y="228" width="20" height="44" fill={C.dark} rx="1" opacity="0.8"/>
      {/* Center unit - main, slightly taller */}
      <rect x="148" y="168" width="104" height="104" fill={C.lime} rx="2"/>
      <polygon points="138,170 252,170 252,156 200,140 138,156" fill={C.dark}/>
      <rect x="180" y="218" width="28" height="54" fill={C.dark} rx="2"/>
      <rect x="153" y="182" width="28" height="22" fill={C.dark} rx="1.5"/>
      <line x1="167" y1="182" x2="167" y2="204" stroke={C.lime} strokeWidth="1.5" opacity="0.5"/>
      <line x1="153" y1="193" x2="181" y2="193" stroke={C.lime} strokeWidth="1.5" opacity="0.5"/>
      {/* Right unit */}
      <rect x="266" y="190" width="86" height="82" fill={C.green} rx="1"/>
      <polygon points="256,192 352,192 352,180 310,168 256,180" fill={C.dark}/>
      <rect x="296" y="228" width="20" height="44" fill={C.dark} rx="1" opacity="0.8"/>
      {/* Fence dividers */}
      <line x1="148" y1="250" x2="148" y2="272" stroke={C.dark} strokeWidth="2" opacity="0.4"/>
      <line x1="252" y1="250" x2="252" y2="272" stroke={C.dark} strokeWidth="2" opacity="0.4"/>
    </g>
  );
}

function OtherIllustration() {
  return (
    <g>
      {/* Large commercial building */}
      <rect x="58" y="148" width="285" height="124" fill={C.green} rx="3"/>
      <rect x="58" y="148" width="180" height="124" fill={C.lime} rx="2"/>
      {/* Flat roof */}
      <rect x="50" y="136" width="301" height="16" fill={C.dark} rx="2"/>
      {/* Floor line */}
      <line x1="58" y1="200" x2="343" y2="200" stroke={C.dark} strokeWidth="2" opacity="0.3"/>
      {/* Ground floor windows */}
      {[72, 116, 160].map(x => (
        <rect key={x} x={x} y="210" width="28" height="18" fill={C.dark} rx="1.5" opacity="0.8"/>
      ))}
      {/* Upper floor windows */}
      {[72, 116, 160, 215, 259, 303].map(x => (
        <rect key={x} x={x} y="154" width="26" height="18" fill={C.dark} rx="1" opacity={x < 200 ? 0.8 : 0.65}/>
      ))}
      {/* Door */}
      <rect x="182" y="232" width="44" height="40" fill={C.dark} rx="2"/>
    </g>
  );
}

// ─── Roof overlays (PV panels shown on roof) ─────────────────────
function PVPanelOverlay({ dachtyp }: { dachtyp: DachTyp | null }) {
  if (!dachtyp) return null;
  // Small solar panel rects on roof area
  const panels = [
    { x: 148, y: 136 }, { x: 170, y: 130 }, { x: 192, y: 130 },
    { x: 214, y: 136 }, { x: 159, y: 150 }, { x: 181, y: 144 }, { x: 203, y: 150 },
  ];
  return (
    <g>
      {panels.map((p, i) => (
        <g key={i}>
          <rect x={p.x} y={p.y} width="20" height="12" fill="#0a2a4a" stroke={C.limeBright} strokeWidth="0.8" rx="0.5" opacity="0.92"/>
          {/* Cell lines */}
          <line x1={p.x+6.6} y1={p.y+0.5} x2={p.x+6.6} y2={p.y+11.5} stroke={C.limeBright} strokeWidth="0.35" opacity="0.5"/>
          <line x1={p.x+13.2} y1={p.y+0.5} x2={p.x+13.2} y2={p.y+11.5} stroke={C.limeBright} strokeWidth="0.35" opacity="0.5"/>
          <line x1={p.x+0.5} y1={p.y+6} x2={p.x+19.5} y2={p.y+6} stroke={C.limeBright} strokeWidth="0.35" opacity="0.5"/>
          {/* Cell fill */}
          {[[p.x+0.8,p.y+0.8],[p.x+7.4,p.y+0.8],[p.x+14,p.y+0.8],[p.x+0.8,p.y+6.8],[p.x+7.4,p.y+6.8],[p.x+14,p.y+6.8]].map(([cx,cy],j) => (
            <rect key={j} x={cx} y={cy} width="5.8" height="4.8" fill="rgba(30,80,150,0.55)" rx="0.2"/>
          ))}
        </g>
      ))}
      {/* Glow */}
      <rect x="140" y="126" width="100" height="40" fill={C.limeBright} opacity="0.04" rx="2"/>
    </g>
  );
}

// ─── Scene elements per Haustyp ───────────────────────────────────
function EFHScene() {
  return (
    <>
      {/* Ground strip */}
      <rect x="0" y="268" width="400" height="32" fill={C.ground}/>
      {/* Lawn patches */}
      <ellipse cx="65" cy="268" rx="62" ry="6" fill="#0d5030"/>
      <ellipse cx="335" cy="268" rx="58" ry="6" fill="#0d5030"/>
      {/* Path from door */}
      <rect x="181" y="268" width="38" height="30" fill="#0a3d22" opacity="0.6" rx="1"/>
      {/* Grass blades L */}
      <g style={{ transformOrigin: '55px 268px', animation: 'grassWave 2.5s cubic-bezier(0.4,0,0.2,1) infinite' }}>
        {[[22,260],[30,259],[38,262],[46,260],[54,263],[62,259],[70,261],[78,259],[86,262]].map(([tx,ty],i) => (
          <line key={i} x1={20+i*8} y1="268" x2={tx} y2={ty} stroke={C.lime} strokeWidth="1.3" strokeLinecap="round" opacity="0.7"/>
        ))}
      </g>
      {/* Grass blades R */}
      <g style={{ transformOrigin: '338px 268px', animation: 'grassWave 2.5s cubic-bezier(0.4,0,0.2,1) 0.4s infinite' }}>
        {[[308,260],[316,259],[324,262],[332,260],[340,263],[348,259],[356,261],[364,259],[372,262]].map(([tx,ty],i) => (
          <line key={i} x1={306+i*8} y1="268" x2={tx} y2={ty} stroke={C.lime} strokeWidth="1.3" strokeLinecap="round" opacity="0.7"/>
        ))}
      </g>
      {/* Flowers */}
      <line x1="48" y1="268" x2="48" y2="257" stroke={C.lime} strokeWidth="1.5"/>
      <circle cx="48" cy="255" r="4" fill={C.lime} opacity="0.9"/>
      <circle cx="44" cy="257" r="2.5" fill={C.limeSoft} opacity="0.7"/>
      <circle cx="52" cy="257" r="2.5" fill={C.limeSoft} opacity="0.7"/>
      <line x1="338" y1="268" x2="338" y2="257" stroke={C.lime} strokeWidth="1.5"/>
      <circle cx="338" cy="255" r="4" fill={C.lime} opacity="0.9"/>
      <circle cx="334" cy="257" r="2.5" fill={C.limeSoft} opacity="0.7"/>
      <circle cx="342" cy="257" r="2.5" fill={C.limeSoft} opacity="0.7"/>
      {/* Swing */}
      <line x1="20" y1="232" x2="29" y2="268" stroke={C.dark} strokeWidth="2" strokeLinecap="round"/>
      <line x1="58" y1="232" x2="49" y2="268" stroke={C.dark} strokeWidth="2" strokeLinecap="round"/>
      <line x1="20" y1="232" x2="58" y2="232" stroke={C.dark} strokeWidth="1.5"/>
      <g style={{ transformOrigin: '39px 232px', animation: 'swingAnim 2.8s cubic-bezier(0.4,0,0.2,1) infinite' }}>
        <line x1="29" y1="232" x2="29" y2="252" stroke={C.green} strokeWidth="1.2" strokeDasharray="2 2"/>
        <line x1="49" y1="232" x2="49" y2="252" stroke={C.green} strokeWidth="1.2" strokeDasharray="2 2"/>
        <rect x="24" y="251" width="30" height="5" fill={C.dark} stroke={C.green} strokeWidth="1" rx="2"/>
        <circle cx="39" cy="244" r="6" fill={C.lime} opacity="0.9"/>
        <line x1="39" y1="250" x2="39" y2="256" stroke={C.dark} strokeWidth="2" strokeLinecap="round"/>
      </g>
      {/* Tree */}
      <rect x="357" y="238" width="8" height="30" fill={C.dark} rx="3"/>
      <g style={{ transformOrigin: '361px 234px', animation: 'treeSway 3.5s cubic-bezier(0.4,0,0.2,1) infinite' }}>
        <ellipse cx="361" cy="222" rx="22" ry="20" fill={C.green}/>
        <ellipse cx="350" cy="230" rx="14" ry="12" fill="#0d5030"/>
        <ellipse cx="372" cy="229" rx="12" ry="11" fill="#0d5030"/>
        <ellipse cx="361" cy="210" rx="14" ry="12" fill={C.lime} opacity="0.6"/>
      </g>
      {/* Garage */}
      <rect x="295" y="228" width="72" height="40" fill={C.green} rx="2"/>
      <rect x="291" y="222" width="80" height="9" fill={C.dark} rx="2"/>
      <rect x="308" y="240" width="46" height="28" fill={C.dark} rx="1" opacity="0.7"/>
      <line x1="308" y1="248" x2="354" y2="248" stroke={C.green} strokeWidth="0.8" opacity="0.5"/>
      <line x1="308" y1="256" x2="354" y2="256" stroke={C.green} strokeWidth="0.8" opacity="0.5"/>
      <line x1="331" y1="240" x2="331" y2="268" stroke={C.green} strokeWidth="0.8" opacity="0.5"/>
    </>
  );
}

function DHHScene() {
  return (
    <>
      <rect x="0" y="268" width="400" height="32" fill={C.ground}/>
      <ellipse cx="78" cy="268" rx="48" ry="5" fill="#0d5030"/>
      <ellipse cx="322" cy="268" rx="48" ry="5" fill="#0d5030"/>
      {/* Hedge center divider */}
      <rect x="180" y="246" width="40" height="22" fill={C.green} rx="4"/>
      <ellipse cx="186" cy="246" rx="8" ry="7" fill="#0d5030"/>
      <ellipse cx="200" cy="243" rx="7" ry="6" fill={C.green}/>
      <ellipse cx="214" cy="246" rx="8" ry="7" fill="#0d5030"/>
      {/* Small tree left */}
      <rect x="48" y="249" width="6" height="19" fill={C.dark} rx="2"/>
      <ellipse cx="51" cy="240" rx="16" ry="14" fill={C.green}/>
      <ellipse cx="51" cy="233" rx="10" ry="9" fill={C.lime} opacity="0.5"/>
      {/* Mailbox right */}
      <rect x="325" y="256" width="12" height="12" fill={C.green} stroke={C.dark} strokeWidth="1" rx="1"/>
      <rect x="327" y="258" width="8" height="4" fill={C.dark} rx="0.5"/>
      <line x1="331" y1="268" x2="331" y2="259" stroke={C.dark} strokeWidth="1.2"/>
      {/* Grass */}
      <g style={{ transformOrigin: '78px 268px', animation: 'grassWave 2.5s cubic-bezier(0.4,0,0.2,1) infinite' }}>
        {[40,48,56,64,72,80,88,96].map((x,i) => (
          <line key={i} x1={x} y1="268" x2={x+[-2,2,-2,3,-2,3,-2,2][i]} y2={[261,260,262,260,263,260,261,260][i]} stroke={C.lime} strokeWidth="1.2" strokeLinecap="round" opacity="0.65"/>
        ))}
      </g>
      <g style={{ transformOrigin: '322px 268px', animation: 'grassWave 2.5s cubic-bezier(0.4,0,0.2,1) 0.4s infinite' }}>
        {[300,308,316,324,332,340,348,356].map((x,i) => (
          <line key={i} x1={x} y1="268" x2={x+[-2,2,-2,3,-2,3,-2,2][i]} y2={[261,260,262,260,263,260,261,260][i]} stroke={C.lime} strokeWidth="1.2" strokeLinecap="round" opacity="0.65"/>
        ))}
      </g>
    </>
  );
}

function RHScene() {
  return (
    <>
      <rect x="0" y="268" width="400" height="32" fill={C.ground}/>
      <rect x="34" y="265" width="82" height="8" fill="#0d5030" rx="1"/>
      <rect x="140" y="262" width="80" height="10" fill="#0d5030" rx="1"/>
      <rect x="242" y="265" width="82" height="8" fill="#0d5030" rx="1"/>
      <line x1="140" y1="248" x2="140" y2="300" stroke={C.dark} strokeWidth="1.5" strokeDasharray="3 2" opacity="0.5"/>
      <line x1="244" y1="248" x2="244" y2="300" stroke={C.dark} strokeWidth="1.5" strokeDasharray="3 2" opacity="0.5"/>
      {/* Bushes per unit */}
      {[54,96,162,208,262,306].map((cx,i) => (
        <ellipse key={i} cx={cx} cy={i<2||i>=4?265:263} rx={i%2===0?11:9} ry={i<2||i>=4?7:8} fill={i%3===0?C.green:'#0d5030'} opacity="0.9"/>
      ))}
      <g style={{ animation: 'grassWave 2.5s cubic-bezier(0.4,0,0.2,1) infinite' }}>
        {[36,44,144,152,248,256].map((x,i) => (
          <line key={i} x1={x} y1="268" x2={x+[-2,2,-2,2,-2,2][i]} y2="262" stroke={C.lime} strokeWidth="1.1" strokeLinecap="round" opacity="0.6"/>
        ))}
      </g>
    </>
  );
}

function OtherScene() {
  return (
    <>
      <rect x="0" y="268" width="400" height="32" fill={C.ground}/>
      {/* Parking lot */}
      <rect x="0" y="268" width="400" height="32" fill="#082e1c" opacity="0.5"/>
      {[16,42,68,94,308,334,360,386].map((x,i) => (
        <line key={i} x1={x} y1="268" x2={x} y2="300" stroke={C.dark} strokeWidth="1" opacity="0.6"/>
      ))}
      {[29,55,321,347].map((x,i) => (
        <text key={i} x={x} y="288" textAnchor="middle" fontSize="9" fontFamily="Geist,sans-serif" fill={C.dark} opacity="0.5">P</text>
      ))}
      {/* Fence */}
      <line x1="4" y1="268" x2="120" y2="268" stroke={C.dark} strokeWidth="2" opacity="0.8"/>
      <line x1="280" y1="268" x2="396" y2="268" stroke={C.dark} strokeWidth="2" opacity="0.8"/>
      {[4,18,32,46,60,74,88,102,116,280,294,308,322,336,350,364,378,392].map((x,i) => (
        <line key={i} x1={x} y1="262" x2={x} y2="274" stroke={C.dark} strokeWidth="1.5" opacity="0.7"/>
      ))}
      {/* PV sign */}
      <rect x="4" y="244" width="24" height="16" fill={C.green} stroke={C.lime} strokeWidth="1" rx="2"/>
      <text x="16" y="255" textAnchor="middle" fontSize="6" fontFamily="Geist,sans-serif" fontWeight="600" fill={C.lime}>PV</text>
      <line x1="16" y1="260" x2="16" y2="268" stroke={C.dark} strokeWidth="1.5"/>
      {/* Tree */}
      <rect x="368" y="248" width="6" height="20" fill={C.dark} rx="2"/>
      <g style={{ transformOrigin: '371px 245px', animation: 'treeSway 3.8s cubic-bezier(0.4,0,0.2,1) 1s infinite' }}>
        <ellipse cx="371" cy="238" rx="14" ry="12" fill={C.green}/>
        <ellipse cx="371" cy="231" rx="9" ry="8" fill={C.lime} opacity="0.5"/>
      </g>
    </>
  );
}

// ─── Persons (DiceBear) ───────────────────────────────────────────
function PersonsLayer({ count, haustyp }: { count: number; haustyp: HausTyp | null }) {
  const spacings = { efh: 30, dhh: 24, rh: 20, other: 28 };
  const centers  = { efh: 182, dhh: 192, rh: 200, other: 186 };
  const spacing  = spacings[haustyp ?? 'efh'];
  const cx       = centers[haustyp ?? 'efh'];
  const seeds    = ['felix','sophie','maria','jonas','anna','max','lea','tom'];
  const startX   = cx - (count - 1) * spacing / 2;
  return (
    <>
      {Array.from({ length: count }).map((_, i) => {
        const x = Math.round(startX + i * spacing);
        const scale = i % 3 === 2 ? 0.88 : i % 3 === 1 ? 0.94 : 1.0;
        const h = Math.round(52 * scale), w = Math.round(34 * scale);
        return (
          <g key={i}>
            <ellipse cx={x} cy={269} rx={Math.round(w * 0.4)} ry={2.5} fill="rgba(0,0,0,0.25)"/>
            <image
              href={`https://api.dicebear.com/9.x/personas/svg?seed=${seeds[i % 8]}&backgroundColor=transparent`}
              x={x - Math.round(w / 2)} y={268 - h}
              width={w} height={h}
              preserveAspectRatio="xMidYMax meet"
            />
          </g>
        );
      })}
    </>
  );
}

// ─── Speicher & Wallbox ───────────────────────────────────────────
function BasementLayer({ visible, haustyp }: { visible: boolean; haustyp: HausTyp | null }) {
  if (!visible) return null;
  const xMap: Record<HausTyp, number> = { efh: 128, dhh: 148, rh: 178, other: 178 };
  const x = xMap[haustyp ?? 'efh'];
  return (
    <g>
      <rect x={x} y={272} width="44" height="32" fill={C.dark} stroke={C.lime} strokeWidth="1.5" rx="3"/>
      <rect x={x+6} y={277} width="32" height="5" fill={C.lime} rx="1" opacity="0.8"/>
      <rect x={x+6} y={284} width="32" height="5" fill={C.lime} rx="1" opacity="0.5"/>
      <rect x={x+6} y={291} width="32" height="5" fill={C.lime} rx="1" opacity="0.3"/>
      <text x={x+22} y={313} textAnchor="middle" fontSize="7" fontFamily="Geist,sans-serif" fill={C.lime} opacity="0.8">Speicher</text>
    </g>
  );
}

function WallboxLayer({ visible }: { visible: boolean }) {
  if (!visible) return null;
  return (
    <g>
      <rect x="270" y="186" width="22" height="30" fill={C.dark} stroke={C.lime} strokeWidth="1.5" rx="3"/>
      <rect x="274" y="191" width="14" height="8" fill={C.lime} rx="1" opacity="0.7"/>
      <circle cx="281" cy="206" r="3.5" fill={C.lime} opacity="0.8"/>
      <text x="281" y="224" textAnchor="middle" fontSize="6.5" fontFamily="Geist,sans-serif" fill={C.lime} opacity="0.8">Wallbox</text>
      {/* Car */}
      <rect x="290" y="244" width="90" height="26" fill={C.green} stroke={C.lime} strokeWidth="0.8" rx="4" opacity="0.9"/>
      <rect x="305" y="234" width="58" height="12" fill={C.green} stroke={C.lime} strokeWidth="0.8" rx="6" opacity="0.9"/>
      <rect x="309" y="235" width="22" height="9" fill={C.dark} rx="1" opacity="0.5"/>
      <rect x="334" y="235" width="20" height="9" fill={C.dark} rx="1" opacity="0.5"/>
      <circle cx="308" cy="270" r="8" fill={C.dark} stroke={C.lime} strokeWidth="1.2"/>
      <circle cx="308" cy="270" r="4" fill={C.green}/>
      <circle cx="360" cy="270" r="8" fill={C.dark} stroke={C.lime} strokeWidth="1.2"/>
      <circle cx="360" cy="270" r="4" fill={C.green}/>
      <rect x="328" y="249" width="22" height="10" fill={C.lime} rx="2" opacity="0.9"/>
      <text x="339" y="257" textAnchor="middle" fontSize="6" fontFamily="Geist,sans-serif" fontWeight="700" fill={C.dark}>EV</text>
    </g>
  );
}

// ─── Energy cable ─────────────────────────────────────────────────
function EnergyCable({ visible }: { visible: boolean }) {
  if (!visible) return null;
  return (
    <g>
      <path id="cable-main" d="M 200 136 L 200 268 L 150 268 L 150 278" fill="none" stroke={C.lime} strokeWidth="1.5" strokeDasharray="4 3" opacity="0.5"/>
      {[0, 0.6, 1.2].map((begin, i) => (
        <circle key={i} r={3 - i * 0.5} fill={C.lime} opacity={0.9 - i * 0.2}>
          <animateMotion dur="1.8s" repeatCount="indefinite" begin={`${begin}s`}>
            <mpath href="#cable-main"/>
          </animateMotion>
        </circle>
      ))}
    </g>
  );
}

// ─── Main HouseScene ──────────────────────────────────────────────
export default function HouseScene() {
  const { step, haustyp, dachtyp, speicher, wallbox, persons } = useFunnelStore();

  const showRoof     = step !== 1 && !!dachtyp && !!haustyp;
  const showPersons  = step === 4;
  const showSpeicher = speicher === 'ja';
  const showWallbox  = wallbox === 'ja';
  const ht           = haustyp ?? 'efh';

  return (
    <div className="house-viz">
      <svg viewBox="0 0 400 320" width="100%" style={{ overflow: 'visible' }}>
        <defs>
          <radialGradient id="sky-grad" cx="50%" cy="25%" r="65%">
            <stop offset="0%" stopColor="#0f5c3a"/>
            <stop offset="100%" stopColor={C.mid}/>
          </radialGradient>
          <filter id="glow-lime"><feGaussianBlur stdDeviation="2" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
        </defs>

        {/* Sky */}
        <rect x="0" y="0" width="400" height="320" fill="url(#sky-grad)"/>

        {/* Sun */}
        <g>
          <circle cx="342" cy="52" r="28" fill={C.lime} opacity="0.12"/>
          <circle cx="342" cy="52" r="19" fill={C.lime} opacity="0.22"/>
          <circle cx="342" cy="52" r="12" fill={C.lime} opacity="0.85"/>
          {/* Rays */}
          {[[342,18,342,10],[342,86,342,94],[308,52,300,52],[376,52,384,52],[319,29,313,23],[365,75,371,81],[365,29,371,23],[319,75,313,81]].map(([x1,y1,x2,y2],i) => (
            <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={C.lime} strokeWidth="2" strokeLinecap="round" opacity="0.7"/>
          ))}
        </g>

        {/* Clouds */}
        <g className="cloud1" opacity="0.25">
          <ellipse cx="60" cy="42" rx="26" ry="12" fill={C.limeSoft}/>
          <ellipse cx="80" cy="38" rx="20" ry="11" fill="white"/>
          <ellipse cx="46" cy="44" rx="18" ry="10" fill={C.limeSoft}/>
        </g>
        <g className="cloud2" opacity="0.2">
          <ellipse cx="252" cy="30" rx="22" ry="10" fill="white"/>
          <ellipse cx="268" cy="27" rx="15" ry="8" fill={C.limeSoft}/>
        </g>

        {/* Background trees (BG depth) */}
        <rect x="22" y="208" width="7" height="28" fill={C.dark} rx="2" opacity="0.6"/>
        <ellipse cx="25" cy="202" rx="18" ry="16" fill={C.dark} opacity="0.5"/>
        <rect x="374" y="212" width="7" height="24" fill={C.dark} rx="2" opacity="0.5"/>
        <ellipse cx="377" cy="207" rx="16" ry="14" fill={C.dark} opacity="0.45"/>

        {/* Scene ground elements */}
        {haustyp && (
          <>
            {ht === 'efh'   && <EFHScene />}
            {ht === 'dhh'   && <DHHScene />}
            {ht === 'rh'    && <RHScene />}
            {ht === 'other' && <OtherScene />}
          </>
        )}

        {/* House illustration */}
        {haustyp && (
          <>
            {ht === 'efh'   && <EFHIllustration />}
            {ht === 'dhh'   && <DHHIllustration />}
            {ht === 'rh'    && <RHIllustration />}
            {ht === 'other' && <OtherIllustration />}
          </>
        )}

        {/* Basement speicher */}
        <BasementLayer visible={showSpeicher} haustyp={haustyp}/>

        {/* PV Panels */}
        {showRoof && <PVPanelOverlay dachtyp={dachtyp}/>}

        {/* Energy line to sun */}
        {showRoof && (
          <line x1="200" y1="136" x2="342" y2="56" stroke={C.lime} strokeWidth="1" strokeDasharray="3 4" opacity="0.4"/>
        )}

        {/* Energy cable */}
        <EnergyCable visible={showSpeicher}/>

        {/* Persons */}
        {showPersons && <PersonsLayer count={persons} haustyp={haustyp}/>}

        {/* Wallbox */}
        <WallboxLayer visible={showWallbox}/>
      </svg>

      {/* Info tags */}
      {haustyp && (
        <div className="info-tags">
          <div className="info-tag show">
            <div className="itdot" style={{ background: 'var(--accent)' }}/>
            <div className="itlabel">Gebäudetyp</div>
            <div className="itval">{hausDaten[ht]?.label ?? '–'}</div>
          </div>
          {showPersons && <>
            <div className="info-tag show">
              <div className="itdot" style={{ background: 'var(--text-subtle)' }}/>
              <div className="itlabel">Personen</div>
              <div className="itval">{persons}</div>
            </div>
            <div className="info-tag show">
              <div className="itdot" style={{ background: 'var(--accent)' }}/>
              <div className="itlabel">Jahresverbrauch</div>
              <div className="itval">{(1500 + persons * 700).toLocaleString('de')} kWh</div>
            </div>
          </>}
          {showRoof && !showPersons && (
            <div className="info-tag show">
              <div className="itdot" style={{ background: 'var(--text-subtle)' }}/>
              <div className="itlabel">Dachtyp</div>
              <div className="itval">{dachtyp ? dachDaten[dachtyp]?.label : '–'}</div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
