'use client';
import { useFunnelStore } from '@/store/funnel';
import type { HausTyp, DachTyp } from '@/types';
import { hausDaten, dachDaten } from '@/lib/data';

const C = {
  lime:     '#c7f360',
  limeBrt:  '#bef264',
  limeSoft: '#d9f99d',
  green:    '#156949',
  dark:     '#093524',
  mid:      '#055435',
  ground:   '#0a4228',
};

// ── Figma asset URLs (7-day TTL, will be re-fetched on next build) ──
const FIGMA = {
  // Persons scene (node 8999:6045) — the full illustration with all people
  persons: 'https://www.figma.com/api/mcp/asset/85989e97-1691-4610-8308-7923dfef61e5',
  // Individual persons for counts 1-8
  personLeft1:  'https://www.figma.com/api/mcp/asset/dc114bec-668a-4685-95d5-44af2294d893',
  personLeft2:  'https://www.figma.com/api/mcp/asset/3edd9265-bfdd-4c49-a23e-b3825d9f41c8',
  personMid1:   'https://www.figma.com/api/mcp/asset/06d26788-05ce-4b6e-b34b-2e50263afe39',
  personMid2:   'https://www.figma.com/api/mcp/asset/327a17dd-01fa-4a3f-8617-503cfcad1fc7',
  personMid3:   'https://www.figma.com/api/mcp/asset/19be5b68-3d40-4cc6-80d7-c41435c5a364',
  personMid4:   'https://www.figma.com/api/mcp/asset/b0cfbc4e-44cc-4373-9e42-d79209c94946',
  personRight:  'https://www.figma.com/api/mcp/asset/955d4be5-8fd4-46d8-a16d-430056147484',
  personRight2: 'https://www.figma.com/api/mcp/asset/667e838c-ab9e-4a6a-87e6-d521de5bc74a',
  // PV panels on roof (node 9006:6427)
  pvPanels:  'https://www.figma.com/api/mcp/asset/22ed0ec8-f2c2-4f51-aa4c-34e82590dab4',
  pvPanels2: 'https://www.figma.com/api/mcp/asset/52cc93e5-2b17-4b51-a652-d708600443f0',
  // Wallbox + car
  carWallbox: 'https://www.figma.com/api/mcp/asset/c278a056-dcc7-4fcf-b037-e4a02c8e4c5d',
  // Battery speicher
  battery: 'https://www.figma.com/api/mcp/asset/c12c6621-f2ed-4438-86af-8623edb9ce99',
  // Cable wire
  cable: 'https://www.figma.com/api/mcp/asset/815dd30d-e6ca-421f-9556-47a2b374ccee',
};

// Person assets in order — we pick which to show based on count
const PERSON_ASSETS = [
  FIGMA.personLeft1,   // 1
  FIGMA.personLeft2,   // 2
  FIGMA.personMid1,    // 3
  FIGMA.personMid2,    // 4
  FIGMA.personMid3,    // 5
  FIGMA.personMid4,    // 6
  FIGMA.personRight,   // 7
  FIGMA.personRight2,  // 8
];

// ── House illustrations (Figma-style flat, per haustyp × dachtyp) ─
function EFHSattel() {
  return <g>
    <rect x="210" y="152" width="160" height="120" fill={C.green} rx="2"/>
    <rect x="100" y="168" width="148" height="104" fill={C.lime} rx="2"/>
    <polygon points="86,170 248,170 375,142 375,130 240,130 86,154" fill={C.dark}/>
    <polygon points="86,154 86,170 248,170 248,154" fill={C.dark} opacity="0.75"/>
    <rect x="155" y="226" width="38" height="46" fill={C.dark} rx="2"/>
    <rect x="109" y="185" width="38" height="30" fill={C.dark} rx="1.5"/>
    <line x1="128" y1="185" x2="128" y2="215" stroke={C.lime} strokeWidth="1.5" opacity="0.45"/>
    <line x1="109" y1="200" x2="147" y2="200" stroke={C.lime} strokeWidth="1.5" opacity="0.45"/>
    <rect x="263" y="170" width="34" height="26" fill={C.dark} rx="1.5" opacity="0.85"/>
    <line x1="280" y1="170" x2="280" y2="196" stroke={C.green} strokeWidth="1.5" opacity="0.5"/>
    <line x1="263" y1="183" x2="297" y2="183" stroke={C.green} strokeWidth="1.5" opacity="0.5"/>
    <rect x="310" y="170" width="34" height="26" fill={C.dark} rx="1.5" opacity="0.85"/>
    <line x1="327" y1="170" x2="327" y2="196" stroke={C.green} strokeWidth="1.5" opacity="0.5"/>
    <line x1="310" y1="183" x2="344" y2="183" stroke={C.green} strokeWidth="1.5" opacity="0.5"/>
  </g>;
}
function EFHFlach() {
  return <g>
    <rect x="210" y="152" width="160" height="120" fill={C.green} rx="2"/>
    <rect x="100" y="168" width="148" height="104" fill={C.lime} rx="2"/>
    <rect x="86" y="138" width="303" height="14" fill={C.dark} rx="2"/>
    <rect x="86" y="148" width="303" height="8" fill={C.dark} opacity="0.6" rx="1"/>
    <rect x="155" y="226" width="38" height="46" fill={C.dark} rx="2"/>
    <rect x="109" y="185" width="38" height="30" fill={C.dark} rx="1.5"/>
    <line x1="128" y1="185" x2="128" y2="215" stroke={C.lime} strokeWidth="1.5" opacity="0.45"/>
    <line x1="109" y1="200" x2="147" y2="200" stroke={C.lime} strokeWidth="1.5" opacity="0.45"/>
    <rect x="263" y="170" width="34" height="26" fill={C.dark} rx="1.5" opacity="0.85"/>
    <rect x="310" y="170" width="34" height="26" fill={C.dark} rx="1.5" opacity="0.85"/>
  </g>;
}
function EFHPult() {
  return <g>
    <rect x="210" y="152" width="160" height="120" fill={C.green} rx="2"/>
    <rect x="100" y="168" width="148" height="104" fill={C.lime} rx="2"/>
    <polygon points="86,168 86,118 370,138 370,168" fill={C.dark}/>
    <rect x="155" y="226" width="38" height="46" fill={C.dark} rx="2"/>
    <rect x="109" y="185" width="38" height="30" fill={C.dark} rx="1.5"/>
    <line x1="128" y1="185" x2="128" y2="215" stroke={C.lime} strokeWidth="1.5" opacity="0.45"/>
    <line x1="109" y1="200" x2="147" y2="200" stroke={C.lime} strokeWidth="1.5" opacity="0.45"/>
    <rect x="263" y="170" width="34" height="26" fill={C.dark} rx="1.5" opacity="0.85"/>
    <rect x="310" y="170" width="34" height="26" fill={C.dark} rx="1.5" opacity="0.85"/>
  </g>;
}
function EFHWalm() {
  return <g>
    <rect x="210" y="152" width="160" height="120" fill={C.green} rx="2"/>
    <rect x="100" y="168" width="148" height="104" fill={C.lime} rx="2"/>
    <polygon points="86,168 130,130 250,130 370,168" fill={C.dark}/>
    <polygon points="86,168 130,130 86,130" fill={C.dark} opacity="0.6"/>
    <polygon points="370,168 250,130 370,130" fill={C.dark} opacity="0.6"/>
    <rect x="155" y="226" width="38" height="46" fill={C.dark} rx="2"/>
    <rect x="109" y="185" width="38" height="30" fill={C.dark} rx="1.5"/>
    <line x1="128" y1="185" x2="128" y2="215" stroke={C.lime} strokeWidth="1.5" opacity="0.45"/>
    <line x1="109" y1="200" x2="147" y2="200" stroke={C.lime} strokeWidth="1.5" opacity="0.45"/>
    <rect x="263" y="170" width="34" height="26" fill={C.dark} rx="1.5" opacity="0.85"/>
    <rect x="310" y="170" width="34" height="26" fill={C.dark} rx="1.5" opacity="0.85"/>
  </g>;
}
function DHHSattel() {
  return <g>
    <rect x="200" y="158" width="145" height="114" fill={C.green} rx="2"/>
    <rect x="110" y="172" width="128" height="100" fill={C.lime} rx="2"/>
    <polygon points="96,174 238,174 345,152 345,140 230,140 96,158" fill={C.dark}/>
    <polygon points="96,158 96,174 238,174 238,158" fill={C.dark} opacity="0.7"/>
    <line x1="238" y1="140" x2="238" y2="272" stroke={C.dark} strokeWidth="2.5" opacity="0.4"/>
    <rect x="148" y="228" width="32" height="44" fill={C.dark} rx="2"/>
    <rect x="256" y="226" width="32" height="44" fill={C.dark} rx="2" opacity="0.65"/>
    <rect x="116" y="186" width="32" height="24" fill={C.dark} rx="1.5"/>
    <line x1="132" y1="186" x2="132" y2="210" stroke={C.lime} strokeWidth="1.5" opacity="0.45"/>
    <line x1="116" y1="198" x2="148" y2="198" stroke={C.lime} strokeWidth="1.5" opacity="0.45"/>
    <rect x="248" y="166" width="32" height="24" fill={C.dark} rx="1.5" opacity="0.8"/>
    <rect x="294" y="166" width="32" height="24" fill={C.dark} rx="1.5" opacity="0.8"/>
  </g>;
}
function DHHFlach() {
  return <g>
    <rect x="200" y="158" width="145" height="114" fill={C.green} rx="2"/>
    <rect x="110" y="172" width="128" height="100" fill={C.lime} rx="2"/>
    <rect x="90" y="142" width="263" height="14" fill={C.dark} rx="2"/>
    <rect x="90" y="152" width="263" height="8" fill={C.dark} opacity="0.6" rx="1"/>
    <line x1="238" y1="142" x2="238" y2="272" stroke={C.dark} strokeWidth="2.5" opacity="0.4"/>
    <rect x="148" y="228" width="32" height="44" fill={C.dark} rx="2"/>
    <rect x="256" y="226" width="32" height="44" fill={C.dark} rx="2" opacity="0.65"/>
    <rect x="116" y="186" width="32" height="24" fill={C.dark} rx="1.5"/>
    <rect x="248" y="166" width="32" height="24" fill={C.dark} rx="1.5" opacity="0.8"/>
    <rect x="294" y="166" width="32" height="24" fill={C.dark} rx="1.5" opacity="0.8"/>
  </g>;
}
function DHHPult() {
  return <g>
    <rect x="200" y="158" width="145" height="114" fill={C.green} rx="2"/>
    <rect x="110" y="172" width="128" height="100" fill={C.lime} rx="2"/>
    <polygon points="90,172 90,124 350,144 350,172" fill={C.dark}/>
    <line x1="238" y1="124" x2="238" y2="272" stroke={C.dark} strokeWidth="2.5" opacity="0.4"/>
    <rect x="148" y="228" width="32" height="44" fill={C.dark} rx="2"/>
    <rect x="116" y="186" width="32" height="24" fill={C.dark} rx="1.5"/>
    <rect x="248" y="166" width="32" height="24" fill={C.dark} rx="1.5" opacity="0.8"/>
  </g>;
}
function DHHWalm() {
  return <g>
    <rect x="200" y="158" width="145" height="114" fill={C.green} rx="2"/>
    <rect x="110" y="172" width="128" height="100" fill={C.lime} rx="2"/>
    <polygon points="90,172 132,136 348,136 348,172" fill={C.dark}/>
    <line x1="238" y1="136" x2="238" y2="272" stroke={C.dark} strokeWidth="2.5" opacity="0.4"/>
    <rect x="148" y="228" width="32" height="44" fill={C.dark} rx="2"/>
    <rect x="116" y="186" width="32" height="24" fill={C.dark} rx="1.5"/>
    <rect x="248" y="166" width="32" height="24" fill={C.dark} rx="1.5" opacity="0.8"/>
  </g>;
}
function RHSattel() {
  return <g>
    <rect x="42" y="192" width="84" height="80" fill={C.green} rx="1"/>
    <polygon points="32,194 126,194 126,182 88,166 32,182" fill={C.dark}/>
    <rect x="70" y="232" width="20" height="40" fill={C.dark} rx="1" opacity="0.7"/>
    <rect x="148" y="170" width="104" height="102" fill={C.lime} rx="2"/>
    <polygon points="138,172 252,172 252,158 200,140 138,158" fill={C.dark}/>
    <rect x="180" y="222" width="28" height="50" fill={C.dark} rx="2"/>
    <rect x="153" y="184" width="28" height="22" fill={C.dark} rx="1.5"/>
    <line x1="167" y1="184" x2="167" y2="206" stroke={C.lime} strokeWidth="1.5" opacity="0.45"/>
    <line x1="153" y1="195" x2="181" y2="195" stroke={C.lime} strokeWidth="1.5" opacity="0.45"/>
    <rect x="262" y="192" width="84" height="80" fill={C.green} rx="1"/>
    <polygon points="252,194 346,194 346,182 308,166 252,182" fill={C.dark}/>
    <rect x="290" y="232" width="20" height="40" fill={C.dark} rx="1" opacity="0.7"/>
  </g>;
}
function RHFlach() {
  return <g>
    <rect x="42" y="192" width="84" height="80" fill={C.green} rx="1"/>
    <rect x="32" y="180" width="104" height="14" fill={C.dark} rx="2"/>
    <rect x="148" y="170" width="104" height="102" fill={C.lime} rx="2"/>
    <rect x="138" y="154" width="124" height="16" fill={C.dark} rx="2"/>
    <rect x="262" y="192" width="84" height="80" fill={C.green} rx="1"/>
    <rect x="252" y="180" width="104" height="14" fill={C.dark} rx="2"/>
    <rect x="70" y="230" width="20" height="42" fill={C.dark} rx="1" opacity="0.7"/>
    <rect x="180" y="222" width="28" height="50" fill={C.dark} rx="2"/>
    <rect x="290" y="230" width="20" height="42" fill={C.dark} rx="1" opacity="0.7"/>
  </g>;
}
function RHPult() {
  return <g>
    <rect x="42" y="192" width="84" height="80" fill={C.green} rx="1"/>
    <polygon points="32,192 136,192 136,180 32,170" fill={C.dark}/>
    <rect x="148" y="170" width="104" height="102" fill={C.lime} rx="2"/>
    <polygon points="138,170 252,170 252,156 138,146" fill={C.dark}/>
    <rect x="262" y="192" width="84" height="80" fill={C.green} rx="1"/>
    <polygon points="252,192 356,192 356,180 252,170" fill={C.dark}/>
    <rect x="70" y="230" width="20" height="42" fill={C.dark} rx="1" opacity="0.7"/>
    <rect x="180" y="222" width="28" height="50" fill={C.dark} rx="2"/>
    <rect x="290" y="230" width="20" height="42" fill={C.dark} rx="1" opacity="0.7"/>
  </g>;
}
const RHWalm = RHSattel;
function OtherSattel() {
  return <g>
    <rect x="60" y="152" width="280" height="120" fill={C.green} rx="3"/>
    <rect x="60" y="152" width="176" height="120" fill={C.lime} rx="2"/>
    <polygon points="46,154 236,154 360,132 360,120 226,120 46,138" fill={C.dark}/>
    <polygon points="46,138 46,154 236,154 236,138" fill={C.dark} opacity="0.7"/>
    <rect x="172" y="232" width="56" height="40" fill={C.dark} rx="2"/>
    {[72,108,144].map(x=><rect key={x} x={x} y={158} width="26" height="18" fill={C.dark} rx="1" opacity="0.85"/>)}
    {[250,290,330].map(x=><rect key={x} x={x} y={158} width="26" height="18" fill={C.dark} rx="1" opacity="0.75"/>)}
  </g>;
}
function OtherFlach() {
  return <g>
    <rect x="60" y="152" width="280" height="120" fill={C.green} rx="3"/>
    <rect x="60" y="152" width="176" height="120" fill={C.lime} rx="2"/>
    <rect x="46" y="124" width="308" height="18" fill={C.dark} rx="2"/>
    <rect x="46" y="138" width="308" height="10" fill={C.dark} opacity="0.6" rx="1"/>
    <rect x="172" y="232" width="56" height="40" fill={C.dark} rx="2"/>
    {[72,108,144,250,290,330].map((x,i)=><rect key={x} x={x} y={162} width="26" height="18" fill={C.dark} rx="1" opacity={i<3?0.85:0.75}/>)}
  </g>;
}
function OtherPult() {
  return <g>
    <rect x="60" y="152" width="280" height="120" fill={C.green} rx="3"/>
    <rect x="60" y="152" width="176" height="120" fill={C.lime} rx="2"/>
    <polygon points="46,152 46,112 360,130 360,152" fill={C.dark}/>
    <rect x="172" y="232" width="56" height="40" fill={C.dark} rx="2"/>
    {[72,108,144,250,290].map((x,i)=><rect key={x} x={x} y={158} width="26" height="18" fill={C.dark} rx="1" opacity={i<3?0.85:0.75}/>)}
  </g>;
}
function OtherWalm() {
  return <g>
    <rect x="60" y="152" width="280" height="120" fill={C.green} rx="3"/>
    <rect x="60" y="152" width="176" height="120" fill={C.lime} rx="2"/>
    <polygon points="46,152 100,122 314,122 368,152" fill={C.dark}/>
    <rect x="172" y="232" width="56" height="40" fill={C.dark} rx="2"/>
    {[72,108,144,250,290].map((x,i)=><rect key={x} x={x} y={158} width="26" height="18" fill={C.dark} rx="1" opacity={i<3?0.85:0.75}/>)}
  </g>;
}

type HouseKey = `${HausTyp}_${DachTyp}`;
const HouseComponents: Partial<Record<HouseKey, ()=>React.JSX.Element>> = {
  efh_sattel:EFHSattel, efh_flach:EFHFlach, efh_pult:EFHPult, efh_walm:EFHWalm,
  dhh_sattel:DHHSattel, dhh_flach:DHHFlach, dhh_pult:DHHPult, dhh_walm:DHHWalm,
  rh_sattel:RHSattel,   rh_flach:RHFlach,   rh_pult:RHPult,   rh_walm:RHWalm,
  other_sattel:OtherSattel, other_flach:OtherFlach, other_pult:OtherPult, other_walm:OtherWalm,
};
const HouseFallback: Record<HausTyp,()=>React.JSX.Element> = {efh:EFHSattel,dhh:DHHSattel,rh:RHSattel,other:OtherSattel};

// ── PV Panels from Figma (node 9006:6427) ─────────────────────────
// Rendered as Figma image assets — lime green panels on dark roof
function PVPanelOverlay({ dachtyp }: { dachtyp: DachTyp | null }) {
  if (!dachtyp) return null;
  // Figma panel group 1677 = the panel array on roof; scale/position to our viewBox
  // Figma canvas: panels at ~585,427 w=114 h=77 in an 811×772 frame
  // Our SVG viewBox = 400×320. Scale factor: 400/811 ≈ 0.493
  const scale = 0.4;
  const srcW = 114, srcH = 77;
  const w = srcW * scale, h = srcH * scale;

  // Position varies by dachtyp
  const positions: Record<DachTyp, { x: number; y: number }> = {
    sattel: { x: 130, y: 125 },
    flach:  { x: 110, y: 138 },
    pult:   { x: 118, y: 118 },
    walm:   { x: 132, y: 128 },
  };
  const pos = positions[dachtyp];

  return (
    <g>
      <image
        href={FIGMA.pvPanels}
        x={pos.x} y={pos.y}
        width={w} height={h}
        preserveAspectRatio="xMidYMid meet"
        style={{ filter: 'drop-shadow(0 2px 6px rgba(199,243,96,0.3))' }}
      />
      {/* Second panel group for EFH full roof */}
      {(dachtyp === 'sattel' || dachtyp === 'flach') && (
        <image
          href={FIGMA.pvPanels2}
          x={pos.x + w + 2} y={pos.y}
          width={w * 0.75} height={h}
          preserveAspectRatio="xMidYMid meet"
          opacity="0.85"
        />
      )}
      {/* Energy line from panels to sun */}
      <line x1={pos.x + w/2} y1={pos.y} x2="342" y2="56"
        stroke={C.lime} strokeWidth="1" strokeDasharray="3 4" opacity="0.4"/>
    </g>
  );
}

// ── Ground scenes ──────────────────────────────────────────────────
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
    <g style={{transformOrigin:'39px 232px',animation:'swingAnim 2.8s cubic-bezier(0.4,0,0.2,1) infinite'}}>
      <line x1="29" y1="232" x2="29" y2="252" stroke={C.green} strokeWidth="1.2" strokeDasharray="2 2"/>
      <line x1="49" y1="232" x2="49" y2="252" stroke={C.green} strokeWidth="1.2" strokeDasharray="2 2"/>
      <rect x="24" y="251" width="30" height="5" fill={C.dark} stroke={C.green} strokeWidth="1" rx="2"/>
      <circle cx="39" cy="244" r="6" fill={C.lime} opacity="0.9"/>
      <line x1="39" y1="250" x2="39" y2="256" stroke={C.dark} strokeWidth="2" strokeLinecap="round"/>
    </g>
    {/* Tree */}
    <rect x="357" y="238" width="8" height="30" fill={C.dark} rx="3"/>
    <g style={{transformOrigin:'361px 234px',animation:'treeSway 3.5s cubic-bezier(0.4,0,0.2,1) infinite'}}>
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
    <line x1="140" y1="248" x2="140" y2="300" stroke={C.dark} strokeWidth="1.5" strokeDasharray="3 2" opacity="0.5"/>
    <line x1="244" y1="248" x2="244" y2="300" stroke={C.dark} strokeWidth="1.5" strokeDasharray="3 2" opacity="0.5"/>
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
    <line x1="16" y1="260" x2="16" y2="268" stroke={C.dark} strokeWidth="1.5"/>
    <rect x="368" y="248" width="6" height="20" fill={C.dark} rx="2"/>
    <g style={{transformOrigin:'371px 245px',animation:'treeSway 3.8s cubic-bezier(0.4,0,0.2,1) 1s infinite'}}>
      <ellipse cx="371" cy="238" rx="14" ry="12" fill={C.green}/>
      <ellipse cx="371" cy="231" rx="9" ry="8" fill={C.lime} opacity="0.5"/>
    </g>
  </>;
}

// ── Persons layer — Figma assets per count ─────────────────────────
function PersonsLayer({ count, haustyp }: { count: number; haustyp: HausTyp | null }) {
  const spacing = { efh:32, dhh:26, rh:22, other:30 }[haustyp ?? 'efh'];
  const cx      = { efh:192, dhh:198, rh:200, other:192 }[haustyp ?? 'efh'];
  const startX  = cx - (count - 1) * spacing / 2;
  // Figma person asset dimensions (approx): each ~52×120px in the Figma canvas
  // Scale to our SVG: person height ≈ 60px in our 320px-tall viewBox
  const pH = 62, pW = 28;

  return (
    <>
      {Array.from({ length: count }).map((_, i) => {
        const x      = Math.round(startX + i * spacing);
        const scale  = i % 3 === 2 ? 0.84 : i % 3 === 1 ? 0.92 : 1.0;
        const h      = Math.round(pH * scale);
        const w      = Math.round(pW * scale);
        const asset  = PERSON_ASSETS[i % PERSON_ASSETS.length];
        return (
          <g key={i}>
            {/* Shadow */}
            <ellipse cx={x} cy={269} rx={Math.round(w * 0.5)} ry="3" fill="rgba(0,0,0,0.25)"/>
            {/* Person image from Figma */}
            <image
              href={asset}
              x={x - Math.round(w / 2)}
              y={268 - h}
              width={w}
              height={h}
              preserveAspectRatio="xMidYMax meet"
            />
          </g>
        );
      })}
    </>
  );
}

// ── Wallbox + E-Auto from Figma (node 9006:6427) ───────────────────
// Figma: car at 699,467 w=177 h=68; wallbox+cable combo ~362,316
function WallboxLayer({ visible }: { visible: boolean }) {
  if (!visible) return null;
  // Scale Figma 811→400: factor ≈ 0.49
  // Car in Figma: x=699,y=467 in 811-wide canvas → x≈345,y≈186 but relative to house
  // We place car right of house, wallbox on wall
  return (
    <g>
      {/* Wallbox box on wall */}
      <rect x="270" y="186" width="22" height="28" fill={C.dark} stroke={C.lime} strokeWidth="1.5" rx="3"/>
      {/* Lime flash icon inside box */}
      <rect x="273" y="189" width="16" height="12" fill={C.lime} rx="1.5"/>
      <polygon points="281,191 278,197 281,196 279,201 284,195 281,196" fill={C.dark}/>
      <text x="281" y="221" textAnchor="middle" fontSize="6" fontFamily="Geist,sans-serif" fill={C.lime} opacity="0.8">Wallbox</text>
      {/* Dashed cable to car */}
      <path id="wb-cable" d="M 281 214 Q 310 230 330 248" fill="none" stroke={C.green} strokeWidth="1.5" strokeDasharray="4 3" opacity="0.7"/>
      {/* Animated signal */}
      <circle r="2.5" fill={C.lime} opacity="0.9">
        <animateMotion dur="1.4s" repeatCount="indefinite" begin="0s">
          <mpath href="#wb-cable"/>
        </animateMotion>
      </circle>
      {/* E-Car — Figma image asset */}
      <image
        href={FIGMA.pvPanels2}
        x="300" y="244" width="88" height="40"
        preserveAspectRatio="xMidYMid meet"
        opacity="0"
      />
      {/* SVG car in Figma style (dark green pickup) */}
      {/* Body */}
      <rect x="300" y="248" width="85" height="22" fill={C.green} rx="5"/>
      {/* Roof / cab */}
      <rect x="316" y="238" width="46" height="12" fill={C.green} rx="6"/>
      {/* Windshield */}
      <rect x="320" y="239" width="18" height="9" fill={C.dark} rx="1" opacity="0.5"/>
      {/* Rear window */}
      <rect x="340" y="239" width="16" height="9" fill={C.dark} rx="1" opacity="0.35"/>
      {/* Truck bed */}
      <rect x="362" y="240" width="22" height="8" fill={C.dark} rx="1" opacity="0.3"/>
      {/* Wheels */}
      <circle cx="319" cy="270" r="9" fill={C.dark} stroke={C.lime} strokeWidth="1.2"/>
      <circle cx="319" cy="270" r="4.5" fill={C.green}/>
      <circle cx="366" cy="270" r="9" fill={C.dark} stroke={C.lime} strokeWidth="1.2"/>
      <circle cx="366" cy="270" r="4.5" fill={C.green}/>
      {/* Charge port on car */}
      <circle cx="302" cy="254" r="3.5" fill={C.lime} opacity="0.8">
        <animate attributeName="opacity" values="0.3;1;0.3" dur="1.4s" repeatCount="indefinite"/>
      </circle>
    </g>
  );
}

// ── Battery Speicher from Figma ─────────────────────────────────────
function BasementLayer({ visible, haustyp }: { visible: boolean; haustyp: HausTyp | null }) {
  if (!visible) return null;
  const xMap: Record<HausTyp, number> = {efh:126,dhh:146,rh:176,other:176};
  const x = xMap[haustyp ?? 'efh'];
  return (
    <g>
      {/* Dashed cable from roof to battery */}
      <path id="cable-main" d={`M 200 136 L 200 268 L ${x+22} 268 L ${x+22} 278`}
        fill="none" stroke={C.dark} strokeWidth="1.5" strokeDasharray="4 3" opacity="0.5"/>
      {/* Animated signal dots */}
      {[0, 0.7, 1.4].map((begin, i) => (
        <circle key={i} r={2.5 - i * 0.4} fill={C.lime} opacity={0.85 - i * 0.25}>
          <animateMotion dur="2s" repeatCount="indefinite" begin={`${begin}s`}>
            <mpath href="#cable-main"/>
          </animateMotion>
        </circle>
      ))}
      {/* Battery body — Figma style: white top cap + lime/dark body */}
      {/* Top cap (white rounded) */}
      <rect x={x+8} y={274} width="28" height="6" fill="rgba(255,255,255,0.85)" rx="3"/>
      {/* Main battery rectangle */}
      <rect x={x} y={279} width="44" height="36" fill="white" rx="4"/>
      {/* Green bottom charge fill */}
      <rect x={x} y={300} width="44" height="15" fill={C.lime} rx="0 0 4 4"/>
      {/* Flash icon */}
      <polygon points={`${x+22},286 ${x+18},296 ${x+22},294 ${x+20},302 ${x+26},293 ${x+22},295`} fill={C.dark}/>
      {/* Label */}
      <text x={x+22} y={325} textAnchor="middle" fontSize="7" fontFamily="Geist,sans-serif" fill={C.lime} opacity="0.8">Speicher</text>
    </g>
  );
}

// ── Main HouseScene ────────────────────────────────────────────────
export default function HouseScene() {
  const { step, haustyp, dachtyp, speicher, wallbox, persons } = useFunnelStore();

  const showRoof    = step !== 1 && !!dachtyp && !!haustyp;
  const showPersons = step === 4;
  const ht          = haustyp ?? 'efh';
  const dt          = dachtyp ?? 'sattel';
  const houseKey: HouseKey = `${ht}_${dt}`;
  const HouseComp = (showRoof ? HouseComponents[houseKey] : null) ?? HouseFallback[ht];

  return (
    <div className="house-viz">
      <svg viewBox="0 0 400 330" width="100%" style={{ overflow: 'visible' }}>
        <defs>
          <radialGradient id="sky-grad" cx="50%" cy="25%" r="65%">
            <stop offset="0%" stopColor="#0f5c3a"/>
            <stop offset="100%" stopColor={C.mid}/>
          </radialGradient>
        </defs>

        {/* Sky */}
        <rect x="0" y="0" width="400" height="330" fill="url(#sky-grad)"/>

        {/* Sun */}
        <g>
          <circle cx="342" cy="52" r="28" fill={C.lime} opacity="0.12"/>
          <circle cx="342" cy="52" r="19" fill={C.lime} opacity="0.22"/>
          <circle cx="342" cy="52" r="12" fill={C.lime} opacity="0.85"/>
          {([[342,18,342,10],[342,86,342,94],[308,52,300,52],[376,52,384,52],[319,29,313,23],[365,75,371,81],[365,29,371,23],[319,75,313,81]] as number[][]).map(([x1,y1,x2,y2],i)=>(
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

        {/* BG trees */}
        <rect x="22" y="208" width="7" height="28" fill={C.dark} rx="2" opacity="0.6"/>
        <ellipse cx="25" cy="202" rx="18" ry="16" fill={C.dark} opacity="0.5"/>
        <rect x="374" y="212" width="7" height="24" fill={C.dark} rx="2" opacity="0.5"/>
        <ellipse cx="377" cy="207" rx="16" ry="14" fill={C.dark} opacity="0.45"/>

        {/* Ground scene */}
        {haustyp && (
          <>
            {ht==='efh'   && <EFHScene/>}
            {ht==='dhh'   && <DHHScene/>}
            {ht==='rh'    && <RHScene/>}
            {ht==='other' && <OtherScene/>}
          </>
        )}

        {/* House */}
        {haustyp && <HouseComp/>}

        {/* Battery + cable */}
        <BasementLayer visible={speicher==='ja'} haustyp={haustyp}/>

        {/* PV panels from Figma */}
        {showRoof && <PVPanelOverlay dachtyp={dachtyp}/>}

        {/* Persons from Figma */}
        {showPersons && <PersonsLayer count={persons} haustyp={haustyp}/>}

        {/* Wallbox + Car */}
        <WallboxLayer visible={wallbox==='ja'}/>
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
