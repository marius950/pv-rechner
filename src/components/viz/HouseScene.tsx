'use client';
import { useFunnelStore } from '@/store/funnel';
import type { HausTyp, DachTyp } from '@/types';
import { hausDaten, dachDaten } from '@/lib/data';

const C = {
  lime:      '#c7f360',
  limeBrt:   '#bef264',
  limeSoft:  '#d9f99d',
  green:     '#156949',
  dark:      '#093524',
  mid:       '#055435',
  ground:    '#0a4228',
  darkGround:'#082e1c',
};

// ─── PV Panel Icon (cool solar panel on roof) ─────────────────────
function PVPanelIcon({ x, y, w = 22, h = 14 }: { x: number; y: number; w?: number; h?: number }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} fill="#071e2e" stroke={C.limeBrt} strokeWidth="0.9" rx="0.8"/>
      {/* Cell columns */}
      <line x1={x+w/3} y1={y+0.6} x2={x+w/3} y2={y+h-0.6} stroke={C.limeBrt} strokeWidth="0.4" opacity="0.55"/>
      <line x1={x+w*2/3} y1={y+0.6} x2={x+w*2/3} y2={y+h-0.6} stroke={C.limeBrt} strokeWidth="0.4" opacity="0.55"/>
      {/* Cell rows */}
      <line x1={x+0.6} y1={y+h/2} x2={x+w-0.6} y2={y+h/2} stroke={C.limeBrt} strokeWidth="0.4" opacity="0.55"/>
      {/* Cells */}
      {[[x+0.8,y+0.8],[x+w/3+0.5,y+0.8],[x+w*2/3+0.5,y+0.8],
        [x+0.8,y+h/2+0.5],[x+w/3+0.5,y+h/2+0.5],[x+w*2/3+0.5,y+h/2+0.5]].map(([cx,cy],i) => (
        <rect key={i} x={cx} y={cy} width={w/3-1.3} height={h/2-1.3} fill="rgba(30,100,200,0.55)" rx="0.2"/>
      ))}
      {/* Diagonal reflection */}
      <line x1={x+2} y1={y+1.5} x2={x+w-3} y2={y+1.5} stroke="rgba(255,255,255,0.12)" strokeWidth="1.5" strokeLinecap="round"/>
      {/* Lime glow border */}
      <rect x={x} y={y} width={w} height={h} fill="none" stroke={C.lime} strokeWidth="0.5" rx="0.8" opacity="0.5"/>
    </g>
  );
}

// ─── Roof panels per dachtyp ──────────────────────────────────────
function PVPanelOverlay({ dachtyp }: { dachtyp: DachTyp | null }) {
  if (!dachtyp) return null;
  if (dachtyp === 'sattel') {
    return (
      <g>
        {/* Two rows on south slope */}
        {[{x:145,y:142},{x:168,y:136},{x:191,y:136},{x:214,y:142}].map((p,i) => <PVPanelIcon key={i} {...p}/>)}
        {[{x:157,y:157},{x:180,y:151},{x:203,y:157}].map((p,i) => <PVPanelIcon key={i+4} {...p}/>)}
        <rect x="138" y="132" width="102" height="32" fill={C.lime} opacity="0.035" rx="2"/>
      </g>
    );
  }
  if (dachtyp === 'flach') {
    return (
      <g>
        {/* Grid on flat roof */}
        {[{x:94,y:140},{x:118,y:140},{x:142,y:140},{x:166,y:140},{x:190,y:140},{x:214,y:140},
          {x:94,y:156},{x:118,y:156},{x:142,y:156},{x:166,y:156},{x:190,y:156},{x:214,y:156}].map((p,i) => (
          <PVPanelIcon key={i} x={p.x} y={p.y} w={20} h={13}/>
        ))}
      </g>
    );
  }
  if (dachtyp === 'pult') {
    return (
      <g>
        {[{x:100,y:136},{x:124,y:130},{x:148,y:125},{x:172,y:120},{x:196,y:126},{x:220,y:132}].map((p,i) => <PVPanelIcon key={i} {...p}/>)}
        {[{x:112,y:150},{x:136,y:144},{x:160,y:139},{x:184,y:144},{x:208,y:150}].map((p,i) => <PVPanelIcon key={i+6} {...p}/>)}
      </g>
    );
  }
  if (dachtyp === 'walm') {
    return (
      <g>
        {[{x:148,y:138},{x:170,y:133},{x:192,y:133},{x:214,y:138}].map((p,i) => <PVPanelIcon key={i} {...p}/>)}
        {[{x:160,y:152},{x:182,y:147},{x:204,y:152}].map((p,i) => <PVPanelIcon key={i+4} {...p}/>)}
      </g>
    );
  }
  return null;
}

// ─── House illustrations per Haustyp + Dachtyp ───────────────────
function EFHSattel() {
  return (
    <g>
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
    </g>
  );
}

function EFHFlach() {
  return (
    <g>
      <rect x="210" y="152" width="160" height="120" fill={C.green} rx="2"/>
      <rect x="100" y="168" width="148" height="104" fill={C.lime} rx="2"/>
      {/* Flat roof parapet */}
      <rect x="86" y="138" width="303" height="14" fill={C.dark} rx="2"/>
      <rect x="86" y="148" width="303" height="8" fill={C.dark} opacity="0.6" rx="1"/>
      <rect x="155" y="226" width="38" height="46" fill={C.dark} rx="2"/>
      <rect x="109" y="185" width="38" height="30" fill={C.dark} rx="1.5"/>
      <line x1="128" y1="185" x2="128" y2="215" stroke={C.lime} strokeWidth="1.5" opacity="0.45"/>
      <line x1="109" y1="200" x2="147" y2="200" stroke={C.lime} strokeWidth="1.5" opacity="0.45"/>
      <rect x="263" y="170" width="34" height="26" fill={C.dark} rx="1.5" opacity="0.85"/>
      <rect x="310" y="170" width="34" height="26" fill={C.dark} rx="1.5" opacity="0.85"/>
    </g>
  );
}

function EFHPult() {
  return (
    <g>
      <rect x="210" y="152" width="160" height="120" fill={C.green} rx="2"/>
      <rect x="100" y="168" width="148" height="104" fill={C.lime} rx="2"/>
      {/* Pult roof — slopes from left high to right low */}
      <polygon points="86,168 86,118 370,138 370,168" fill={C.dark}/>
      <rect x="155" y="226" width="38" height="46" fill={C.dark} rx="2"/>
      <rect x="109" y="185" width="38" height="30" fill={C.dark} rx="1.5"/>
      <line x1="128" y1="185" x2="128" y2="215" stroke={C.lime} strokeWidth="1.5" opacity="0.45"/>
      <line x1="109" y1="200" x2="147" y2="200" stroke={C.lime} strokeWidth="1.5" opacity="0.45"/>
      <rect x="263" y="170" width="34" height="26" fill={C.dark} rx="1.5" opacity="0.85"/>
      <rect x="310" y="170" width="34" height="26" fill={C.dark} rx="1.5" opacity="0.85"/>
    </g>
  );
}

function EFHWalm() {
  return (
    <g>
      <rect x="210" y="152" width="160" height="120" fill={C.green} rx="2"/>
      <rect x="100" y="168" width="148" height="104" fill={C.lime} rx="2"/>
      {/* Walm — hip roof with trapezoid front + triangles on sides */}
      <polygon points="86,168 130,130 250,130 370,168" fill={C.dark}/>
      <polygon points="86,168 130,130 86,130" fill={C.dark} opacity="0.6"/>
      <polygon points="370,168 250,130 370,130" fill={C.dark} opacity="0.6"/>
      <rect x="155" y="226" width="38" height="46" fill={C.dark} rx="2"/>
      <rect x="109" y="185" width="38" height="30" fill={C.dark} rx="1.5"/>
      <line x1="128" y1="185" x2="128" y2="215" stroke={C.lime} strokeWidth="1.5" opacity="0.45"/>
      <line x1="109" y1="200" x2="147" y2="200" stroke={C.lime} strokeWidth="1.5" opacity="0.45"/>
      <rect x="263" y="170" width="34" height="26" fill={C.dark} rx="1.5" opacity="0.85"/>
      <rect x="310" y="170" width="34" height="26" fill={C.dark} rx="1.5" opacity="0.85"/>
    </g>
  );
}

function DHHSattel() {
  return (
    <g>
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
    </g>
  );
}

function DHHFlach() {
  return (
    <g>
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
    </g>
  );
}

function DHHPult() {
  return (
    <g>
      <rect x="200" y="158" width="145" height="114" fill={C.green} rx="2"/>
      <rect x="110" y="172" width="128" height="100" fill={C.lime} rx="2"/>
      <polygon points="90,172 90,124 350,144 350,172" fill={C.dark}/>
      <line x1="238" y1="124" x2="238" y2="272" stroke={C.dark} strokeWidth="2.5" opacity="0.4"/>
      <rect x="148" y="228" width="32" height="44" fill={C.dark} rx="2"/>
      <rect x="116" y="186" width="32" height="24" fill={C.dark} rx="1.5"/>
      <rect x="248" y="166" width="32" height="24" fill={C.dark} rx="1.5" opacity="0.8"/>
    </g>
  );
}

function DHHWalm() {
  return (
    <g>
      <rect x="200" y="158" width="145" height="114" fill={C.green} rx="2"/>
      <rect x="110" y="172" width="128" height="100" fill={C.lime} rx="2"/>
      <polygon points="90,172 132,136 348,136 348,172" fill={C.dark}/>
      <line x1="238" y1="136" x2="238" y2="272" stroke={C.dark} strokeWidth="2.5" opacity="0.4"/>
      <rect x="148" y="228" width="32" height="44" fill={C.dark} rx="2"/>
      <rect x="116" y="186" width="32" height="24" fill={C.dark} rx="1.5"/>
      <rect x="248" y="166" width="32" height="24" fill={C.dark} rx="1.5" opacity="0.8"/>
    </g>
  );
}

function RHSattel() {
  return (
    <g>
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
    </g>
  );
}

function RHFlach() {
  return (
    <g>
      <rect x="42" y="192" width="84" height="80" fill={C.green} rx="1"/>
      <rect x="32" y="180" width="104" height="14" fill={C.dark} rx="2"/>
      <rect x="148" y="170" width="104" height="102" fill={C.lime} rx="2"/>
      <rect x="138" y="154" width="124" height="16" fill={C.dark} rx="2"/>
      <rect x="262" y="192" width="84" height="80" fill={C.green} rx="1"/>
      <rect x="252" y="180" width="104" height="14" fill={C.dark} rx="2"/>
      <rect x="70" y="230" width="20" height="42" fill={C.dark} rx="1" opacity="0.7"/>
      <rect x="180" y="222" width="28" height="50" fill={C.dark} rx="2"/>
      <rect x="290" y="230" width="20" height="42" fill={C.dark} rx="1" opacity="0.7"/>
    </g>
  );
}

function RHPult() {
  return (
    <g>
      <rect x="42" y="192" width="84" height="80" fill={C.green} rx="1"/>
      <polygon points="32,192 136,192 136,180 32,170" fill={C.dark}/>
      <rect x="148" y="170" width="104" height="102" fill={C.lime} rx="2"/>
      <polygon points="138,170 252,170 252,156 138,146" fill={C.dark}/>
      <rect x="262" y="192" width="84" height="80" fill={C.green} rx="1"/>
      <polygon points="252,192 356,192 356,180 252,170" fill={C.dark}/>
      <rect x="70" y="230" width="20" height="42" fill={C.dark} rx="1" opacity="0.7"/>
      <rect x="180" y="222" width="28" height="50" fill={C.dark} rx="2"/>
      <rect x="290" y="230" width="20" height="42" fill={C.dark} rx="1" opacity="0.7"/>
    </g>
  );
}

function RHWalm() {
  // Row houses don't typically have walm — fallback to sattel-style
  return <RHSattel />;
}

function OtherSattel() {
  return (
    <g>
      <rect x="60" y="152" width="280" height="120" fill={C.green} rx="3"/>
      <rect x="60" y="152" width="176" height="120" fill={C.lime} rx="2"/>
      <polygon points="46,154 236,154 360,132 360,120 226,120 46,138" fill={C.dark}/>
      <polygon points="46,138 46,154 236,154 236,138" fill={C.dark} opacity="0.7"/>
      <rect x="172" y="232" width="56" height="40" fill={C.dark} rx="2"/>
      {[[72,158],[108,158],[144,158]].map(([x,y],i) => (
        <rect key={i} x={x} y={y} width="26" height="18" fill={C.dark} rx="1" opacity="0.85"/>
      ))}
      {[[250,158],[290,158],[330,158],[250,188],[290,188],[330,188]].map(([x,y],i) => (
        <rect key={i} x={x} y={y} width="26" height="18" fill={C.dark} rx="1" opacity={i<3?0.75:0.6}/>
      ))}
    </g>
  );
}

function OtherFlach() {
  return (
    <g>
      <rect x="60" y="152" width="280" height="120" fill={C.green} rx="3"/>
      <rect x="60" y="152" width="176" height="120" fill={C.lime} rx="2"/>
      <rect x="46" y="124" width="308" height="18" fill={C.dark} rx="2"/>
      <rect x="46" y="138" width="308" height="10" fill={C.dark} opacity="0.6" rx="1"/>
      <rect x="172" y="232" width="56" height="40" fill={C.dark} rx="2"/>
      {[[72,162],[108,162],[144,162],[250,162],[290,162],[330,162]].map(([x,y],i) => (
        <rect key={i} x={x} y={y} width="26" height="18" fill={C.dark} rx="1" opacity={i<3?0.85:0.75}/>
      ))}
    </g>
  );
}

function OtherPult() {
  return (
    <g>
      <rect x="60" y="152" width="280" height="120" fill={C.green} rx="3"/>
      <rect x="60" y="152" width="176" height="120" fill={C.lime} rx="2"/>
      <polygon points="46,152 46,112 360,130 360,152" fill={C.dark}/>
      <rect x="172" y="232" width="56" height="40" fill={C.dark} rx="2"/>
      {[[72,158],[108,158],[144,158],[250,158],[290,158]].map(([x,y],i) => (
        <rect key={i} x={x} y={y} width="26" height="18" fill={C.dark} rx="1" opacity={i<3?0.85:0.75}/>
      ))}
    </g>
  );
}

function OtherWalm() {
  return (
    <g>
      <rect x="60" y="152" width="280" height="120" fill={C.green} rx="3"/>
      <rect x="60" y="152" width="176" height="120" fill={C.lime} rx="2"/>
      <polygon points="46,152 100,122 314,122 368,152" fill={C.dark}/>
      <rect x="172" y="232" width="56" height="40" fill={C.dark} rx="2"/>
      {[[72,158],[108,158],[144,158],[250,158],[290,158]].map(([x,y],i) => (
        <rect key={i} x={x} y={y} width="26" height="18" fill={C.dark} rx="1" opacity={i<3?0.85:0.75}/>
      ))}
    </g>
  );
}

type HouseKey = `${HausTyp}_${DachTyp}`;
const HouseComponents: Partial<Record<HouseKey, () => React.JSX.Element>> = {
  efh_sattel: EFHSattel, efh_flach: EFHFlach, efh_pult: EFHPult, efh_walm: EFHWalm,
  dhh_sattel: DHHSattel, dhh_flach: DHHFlach, dhh_pult: DHHPult, dhh_walm: DHHWalm,
  rh_sattel:  RHSattel,  rh_flach:  RHFlach,  rh_pult:  RHPult,  rh_walm:  RHWalm,
  other_sattel: OtherSattel, other_flach: OtherFlach, other_pult: OtherPult, other_walm: OtherWalm,
};

// Fallback per haustyp if dachtyp not chosen yet
const HouseFallback: Record<HausTyp, () => React.JSX.Element> = {
  efh: EFHSattel, dhh: DHHSattel, rh: RHSattel, other: OtherSattel,
};

// ─── Ground scenes ────────────────────────────────────────────────
function EFHScene() {
  return (
    <>
      <rect x="0" y="268" width="400" height="52" fill={C.ground}/>
      <ellipse cx="65" cy="268" rx="62" ry="6" fill="#0d5030"/>
      <ellipse cx="335" cy="268" rx="58" ry="6" fill="#0d5030"/>
      <rect x="181" y="268" width="38" height="30" fill="#0a3d22" opacity="0.6" rx="1"/>
      <g style={{ transformOrigin:'55px 268px', animation:'grassWave 2.5s cubic-bezier(0.4,0,0.2,1) infinite' }}>
        {[[22,260],[30,259],[38,262],[46,260],[54,263],[62,259],[70,261],[78,259],[86,262]].map(([tx,ty],i) => (
          <line key={i} x1={20+i*8} y1="268" x2={tx} y2={ty} stroke={C.lime} strokeWidth="1.3" strokeLinecap="round" opacity="0.7"/>
        ))}
      </g>
      <g style={{ transformOrigin:'338px 268px', animation:'grassWave 2.5s cubic-bezier(0.4,0,0.2,1) 0.4s infinite' }}>
        {[[308,260],[316,259],[324,262],[332,260],[340,263],[348,259],[356,261],[364,259],[372,262]].map(([tx,ty],i) => (
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
      {/* Swing */}
      <line x1="20" y1="232" x2="29" y2="268" stroke={C.dark} strokeWidth="2" strokeLinecap="round"/>
      <line x1="58" y1="232" x2="49" y2="268" stroke={C.dark} strokeWidth="2" strokeLinecap="round"/>
      <line x1="20" y1="232" x2="58" y2="232" stroke={C.dark} strokeWidth="1.5"/>
      <g style={{ transformOrigin:'39px 232px', animation:'swingAnim 2.8s cubic-bezier(0.4,0,0.2,1) infinite' }}>
        <line x1="29" y1="232" x2="29" y2="252" stroke={C.green} strokeWidth="1.2" strokeDasharray="2 2"/>
        <line x1="49" y1="232" x2="49" y2="252" stroke={C.green} strokeWidth="1.2" strokeDasharray="2 2"/>
        <rect x="24" y="251" width="30" height="5" fill={C.dark} stroke={C.green} strokeWidth="1" rx="2"/>
        <circle cx="39" cy="244" r="6" fill={C.lime} opacity="0.9"/>
        <line x1="39" y1="250" x2="39" y2="256" stroke={C.dark} strokeWidth="2" strokeLinecap="round"/>
      </g>
      {/* Tree */}
      <rect x="357" y="238" width="8" height="30" fill={C.dark} rx="3"/>
      <g style={{ transformOrigin:'361px 234px', animation:'treeSway 3.5s cubic-bezier(0.4,0,0.2,1) infinite' }}>
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
      <rect x="325" y="256" width="12" height="12" fill={C.green} stroke={C.dark} strokeWidth="1" rx="1"/>
      <rect x="327" y="258" width="8" height="4" fill={C.dark} rx="0.5"/>
      <line x1="331" y1="268" x2="331" y2="259" stroke={C.dark} strokeWidth="1.2"/>
      <g style={{ transformOrigin:'78px 268px', animation:'grassWave 2.5s cubic-bezier(0.4,0,0.2,1) infinite' }}>
        {[40,48,56,64,72,80,88,96].map((x,i) => (
          <line key={i} x1={x} y1="268" x2={x+[-2,2,-2,3,-2,3,-2,2][i]} y2={[261,260,262,260,263,260,261,260][i]} stroke={C.lime} strokeWidth="1.2" strokeLinecap="round" opacity="0.65"/>
        ))}
      </g>
      <g style={{ transformOrigin:'322px 268px', animation:'grassWave 2.5s cubic-bezier(0.4,0,0.2,1) 0.4s infinite' }}>
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
      <rect x="0" y="268" width="400" height="52" fill={C.ground}/>
      <rect x="34" y="265" width="82" height="8" fill="#0d5030" rx="1"/>
      <rect x="140" y="262" width="80" height="10" fill="#0d5030" rx="1"/>
      <rect x="242" y="265" width="82" height="8" fill="#0d5030" rx="1"/>
      <line x1="140" y1="248" x2="140" y2="300" stroke={C.dark} strokeWidth="1.5" strokeDasharray="3 2" opacity="0.5"/>
      <line x1="244" y1="248" x2="244" y2="300" stroke={C.dark} strokeWidth="1.5" strokeDasharray="3 2" opacity="0.5"/>
      {[54,96,162,208,262,306].map((cx,i) => (
        <ellipse key={i} cx={cx} cy={i<2||i>=4?265:263} rx={i%2===0?11:9} ry={i<2||i>=4?7:8} fill={i%3===0?C.green:'#0d5030'} opacity="0.9"/>
      ))}
      <g style={{ animation:'grassWave 2.5s cubic-bezier(0.4,0,0.2,1) infinite' }}>
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
      <rect x="0" y="268" width="400" height="52" fill={C.darkGround}/>
      {[16,42,68,94,308,334,360,386].map((x,i) => (
        <line key={i} x1={x} y1="268" x2={x} y2="300" stroke={C.dark} strokeWidth="1" opacity="0.6"/>
      ))}
      {[29,55,321,347].map((x) => (
        <text key={x} x={x} y="288" textAnchor="middle" fontSize="9" fontFamily="Geist,sans-serif" fill={C.dark} opacity="0.5">P</text>
      ))}
      <line x1="4" y1="268" x2="120" y2="268" stroke={C.dark} strokeWidth="2" opacity="0.8"/>
      <line x1="280" y1="268" x2="396" y2="268" stroke={C.dark} strokeWidth="2" opacity="0.8"/>
      <rect x="4" y="244" width="24" height="16" fill={C.green} stroke={C.lime} strokeWidth="1" rx="2"/>
      <text x="16" y="255" textAnchor="middle" fontSize="6" fontFamily="Geist,sans-serif" fontWeight="600" fill={C.lime}>PV</text>
      <line x1="16" y1="260" x2="16" y2="268" stroke={C.dark} strokeWidth="1.5"/>
      <rect x="368" y="248" width="6" height="20" fill={C.dark} rx="2"/>
      <g style={{ transformOrigin:'371px 245px', animation:'treeSway 3.8s cubic-bezier(0.4,0,0.2,1) 1s infinite' }}>
        <ellipse cx="371" cy="238" rx="14" ry="12" fill={C.green}/>
        <ellipse cx="371" cy="231" rx="9" ry="8" fill={C.lime} opacity="0.5"/>
      </g>
    </>
  );
}

// ─── Persons — 8 distinct effi flat-design illustrations ─────────
// Each person is unique: different hair, clothes, skin, pose
type PersonDef = { skin: string; hair: string; shirt: string; pants: string; hairStyle: 'short'|'long'|'curly'|'bun'; };

const PERSONS: PersonDef[] = [
  { skin:'#e8c49a', hair:C.dark,    shirt:C.lime,    pants:C.dark,    hairStyle:'short'  }, // adult man, lime shirt
  { skin:'#c68642', hair:'#1a0a00', shirt:C.green,   pants:C.limeSoft,hairStyle:'long'   }, // woman, long dark hair
  { skin:'#d4956a', hair:'#3d1f00', shirt:C.limeSoft,pants:C.dark,    hairStyle:'curly'  }, // man, curly hair
  { skin:'#e8c49a', hair:C.dark,    shirt:C.mid,     pants:C.lime,    hairStyle:'bun'    }, // woman, bun
  { skin:'#a0714f', hair:'#1a0a00', shirt:C.limeBrt, pants:C.mid,     hairStyle:'short'  }, // man
  { skin:'#e8c49a', hair:'#8B4513', shirt:C.dark,    pants:C.green,   hairStyle:'long'   }, // woman, brown hair
  { skin:'#c68642', hair:C.dark,    shirt:C.green,   pants:C.limeSoft,hairStyle:'curly'  }, // man
  { skin:'#d4956a', hair:'#2d1500', shirt:C.lime,    pants:C.dark,    hairStyle:'bun'    }, // woman
];

function PersonFigure({ x, y, scale, idx }: { x: number; y: number; scale: number; idx: number }) {
  const p = PERSONS[idx % PERSONS.length];
  return (
    <g transform={`translate(${x},${y}) scale(${scale})`}>
      {/* Shadow */}
      <ellipse cx="0" cy="1" rx="11" ry="3.5" fill="rgba(0,0,0,0.25)"/>
      {/* Shoes */}
      <ellipse cx="-4" cy="-1" rx="5" ry="3" fill="#1a1a1a"/>
      <ellipse cx="4" cy="-1" rx="5" ry="3" fill="#1a1a1a" opacity="0.85"/>
      {/* Legs */}
      <rect x="-7" y="-24" width="6" height="24" fill={p.pants} rx="3"/>
      <rect x="1" y="-24" width="6" height="24" fill={p.pants} rx="3" opacity="0.88"/>
      {/* Body / shirt */}
      <rect x="-10" y="-48" width="20" height="26" fill={p.shirt} rx="5"/>
      {/* Collar detail */}
      <path d="M-3,-48 L0,-43 L3,-48" fill={p.skin} opacity="0.6"/>
      {/* Arms */}
      <rect x="-15" y="-47" width="6" height="20" fill={p.shirt} rx="3" opacity="0.9"/>
      <rect x="9" y="-47" width="6" height="20" fill={p.shirt} rx="3" opacity="0.9"/>
      {/* Hands */}
      <circle cx="-12" cy="-27" r="3.5" fill={p.skin}/>
      <circle cx="12" cy="-27" r="3.5" fill={p.skin}/>
      {/* Neck */}
      <rect x="-3.5" y="-54" width="7" height="8" fill={p.skin} rx="2.5"/>
      {/* Head */}
      <circle cx="0" cy="-63" r="13" fill={p.skin}/>
      {/* Face features */}
      <circle cx="-4" cy="-64" r="1.5" fill={C.dark} opacity="0.6"/>
      <circle cx="4" cy="-64" r="1.5" fill={C.dark} opacity="0.6"/>
      <path d="M-3,-59 Q0,-57 3,-59" fill="none" stroke={C.dark} strokeWidth="1.2" strokeLinecap="round" opacity="0.5"/>
      {/* Hair by style */}
      {p.hairStyle === 'short' && (
        <>
          <ellipse cx="0" cy="-73" rx="12" ry="7" fill={p.hair}/>
          <rect x="-12" y="-75" width="24" height="10" fill={p.hair} rx="5"/>
        </>
      )}
      {p.hairStyle === 'long' && (
        <>
          <ellipse cx="0" cy="-73" rx="12" ry="7" fill={p.hair}/>
          <rect x="-12" y="-73" width="24" height="10" fill={p.hair} rx="5"/>
          <rect x="-12" y="-68" width="5" height="22" fill={p.hair} rx="3"/>
          <rect x="7" y="-68" width="5" height="22" fill={p.hair} rx="3"/>
        </>
      )}
      {p.hairStyle === 'curly' && (
        <>
          <circle cx="0" cy="-76" r="10" fill={p.hair}/>
          <circle cx="-8" cy="-70" r="6" fill={p.hair}/>
          <circle cx="8" cy="-70" r="6" fill={p.hair}/>
          <circle cx="-4" cy="-78" r="5" fill={p.hair}/>
          <circle cx="4" cy="-78" r="5" fill={p.hair}/>
        </>
      )}
      {p.hairStyle === 'bun' && (
        <>
          <ellipse cx="0" cy="-73" rx="12" ry="7" fill={p.hair}/>
          <rect x="-12" y="-75" width="24" height="9" fill={p.hair} rx="5"/>
          <circle cx="0" cy="-80" r="7" fill={p.hair}/>
          <circle cx="0" cy="-80" r="4" fill={p.hair} opacity="0.7"/>
        </>
      )}
    </g>
  );
}

function PersonsLayer({ count, haustyp }: { count: number; haustyp: HausTyp | null }) {
  const spacings = { efh: 32, dhh: 26, rh: 22, other: 30 };
  const centers  = { efh: 182, dhh: 192, rh: 200, other: 186 };
  const spacing  = spacings[haustyp ?? 'efh'];
  const cx       = centers[haustyp ?? 'efh'];
  const startX   = cx - (count - 1) * spacing / 2;

  return (
    <>
      {Array.from({ length: count }).map((_, i) => {
        const x     = Math.round(startX + i * spacing);
        const scale = i % 3 === 2 ? 0.62 : i % 3 === 1 ? 0.68 : 0.74;
        return (
          <PersonFigure key={i} x={x} y={268} scale={scale} idx={i}/>
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

// ─── Main ─────────────────────────────────────────────────────────
export default function HouseScene() {
  const { step, haustyp, dachtyp, speicher, wallbox, persons } = useFunnelStore();

  const showRoof    = step !== 1 && !!dachtyp && !!haustyp;
  const showPersons = step === 4;
  const ht          = haustyp ?? 'efh';
  const dt          = dachtyp ?? 'sattel';

  // Pick house component: key = "efh_sattel" etc; fallback to haustyp default
  const houseKey: HouseKey = `${ht}_${dt}`;
  const HouseComp = (showRoof ? HouseComponents[houseKey] : null) ?? HouseFallback[ht];

  return (
    <div className="house-viz">
      <svg viewBox="0 0 400 320" width="100%" style={{ overflow: 'visible' }}>
        <defs>
          <radialGradient id="sky-grad" cx="50%" cy="25%" r="65%">
            <stop offset="0%" stopColor="#0f5c3a"/>
            <stop offset="100%" stopColor={C.mid}/>
          </radialGradient>
        </defs>
        <rect x="0" y="0" width="400" height="320" fill="url(#sky-grad)"/>

        {/* Sun */}
        <g>
          <circle cx="342" cy="52" r="28" fill={C.lime} opacity="0.12"/>
          <circle cx="342" cy="52" r="19" fill={C.lime} opacity="0.22"/>
          <circle cx="342" cy="52" r="12" fill={C.lime} opacity="0.85"/>
          {([[342,18,342,10],[342,86,342,94],[308,52,300,52],[376,52,384,52],[319,29,313,23],[365,75,371,81],[365,29,371,23],[319,75,313,81]] as number[][]).map(([x1,y1,x2,y2],i) => (
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

        {/* Background trees */}
        <rect x="22" y="208" width="7" height="28" fill={C.dark} rx="2" opacity="0.6"/>
        <ellipse cx="25" cy="202" rx="18" ry="16" fill={C.dark} opacity="0.5"/>
        <rect x="374" y="212" width="7" height="24" fill={C.dark} rx="2" opacity="0.5"/>
        <ellipse cx="377" cy="207" rx="16" ry="14" fill={C.dark} opacity="0.45"/>

        {/* Scene */}
        {haustyp && (
          <>
            {ht === 'efh'   && <EFHScene />}
            {ht === 'dhh'   && <DHHScene />}
            {ht === 'rh'    && <RHScene />}
            {ht === 'other' && <OtherScene />}
          </>
        )}

        {/* House */}
        {haustyp && <HouseComp />}

        {/* Basement */}
        <BasementLayer visible={speicher === 'ja'} haustyp={haustyp}/>

        {/* PV panels */}
        {showRoof && <PVPanelOverlay dachtyp={dachtyp}/>}

        {/* Energy line to sun */}
        {showRoof && (
          <line x1="200" y1="136" x2="342" y2="56" stroke={C.lime} strokeWidth="1" strokeDasharray="3 4" opacity="0.4"/>
        )}

        <EnergyCable visible={speicher === 'ja'}/>
        {showPersons && <PersonsLayer count={persons} haustyp={haustyp}/>}
        <WallboxLayer visible={wallbox === 'ja'}/>
      </svg>

      {/* Info tags */}
      {haustyp && (
        <div className="info-tags">
          <div className="info-tag show">
            <div className="itdot" style={{ background: C.lime }}/>
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
              <div className="itdot" style={{ background: C.lime }}/>
              <div className="itlabel">Jahresverbrauch</div>
              <div className="itval">{(1500 + persons * 700).toLocaleString('de')} kWh</div>
            </div>
          </>}
          {showRoof && !showPersons && dachtyp && (
            <div className="info-tag show">
              <div className="itdot" style={{ background: 'var(--text-subtle)' }}/>
              <div className="itlabel">Dachtyp</div>
              <div className="itval">{dachDaten[dachtyp]?.label}</div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
