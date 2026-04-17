'use client';
import type { ReactNode } from 'react';
import { useFunnelStore } from '@/store/funnel';
import type { HausTyp } from '@/types';
import { hausDaten, dachDaten } from '@/lib/data';

// ─── Scene ground variants per Haustyp ────────────────────────────
function EFHScene() {
  return (
    <>
      <ellipse cx="62" cy="269" rx="58" ry="5" fill="rgba(190,242,100,0.07)"/>
      <ellipse cx="330" cy="269" rx="55" ry="5" fill="rgba(190,242,100,0.07)"/>
      <rect x="182" y="268" width="36" height="32" fill="rgba(255,255,255,0.025)" rx="1"/>
      {/* Grass L */}
      <g className="grass-l">
        {[24,31,38,46,54,62,70,78,86].map((x,i) => (
          <line key={i} x1={x} y1="268" x2={x+[-3,2,-2,3,-2,3,-2,2,-3][i]} y2={[260,259,262,260,263,260,259,261,259][i]} stroke="rgba(190,242,100,0.4)" strokeWidth="1.2" strokeLinecap="round"/>
        ))}
      </g>
      {/* Grass R */}
      <g className="grass-r">
        {[312,320,328,336,344,352,360,368].map((x,i) => (
          <line key={i} x1={x} y1="268" x2={x+[-2,2,-2,3,-2,3,-2,2][i]} y2={[261,259,262,260,263,260,259,261][i]} stroke="rgba(190,242,100,0.4)" strokeWidth="1.2" strokeLinecap="round"/>
        ))}
      </g>
      {/* Flowers */}
      <g><line x1="50" y1="268" x2="50" y2="258" stroke="rgba(190,242,100,0.5)" strokeWidth="1.2"/><circle cx="50" cy="256" r="3" fill="rgba(190,242,100,0.6)"/><circle cx="47" cy="257" r="1.8" fill="rgba(255,255,255,0.3)"/><circle cx="53" cy="257" r="1.8" fill="rgba(255,255,255,0.3)"/></g>
      <g><line x1="340" y1="268" x2="340" y2="258" stroke="rgba(190,242,100,0.5)" strokeWidth="1.2"/><circle cx="340" cy="256" r="3" fill="rgba(190,242,100,0.6)"/><circle cx="337" cy="257" r="1.8" fill="rgba(255,255,255,0.3)"/><circle cx="343" cy="257" r="1.8" fill="rgba(255,255,255,0.3)"/></g>
      {/* Swing */}
      <line x1="22" y1="235" x2="30" y2="268" stroke="rgba(255,255,255,0.28)" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="58" y1="235" x2="50" y2="268" stroke="rgba(255,255,255,0.28)" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="22" y1="235" x2="58" y2="235" stroke="rgba(255,255,255,0.22)" strokeWidth="1.2"/>
      <g className="swing-pendulum">
        <line x1="30" y1="235" x2="30" y2="256" stroke="rgba(255,255,255,0.2)" strokeWidth="1" strokeDasharray="2 2"/>
        <line x1="50" y1="235" x2="50" y2="256" stroke="rgba(255,255,255,0.2)" strokeWidth="1" strokeDasharray="2 2"/>
        <rect x="25" y="255" width="30" height="5" fill="rgba(255,255,255,0.12)" stroke="rgba(255,255,255,0.25)" strokeWidth="1" rx="2"/>
        <circle cx="40" cy="248" r="5" fill="rgba(255,255,255,0.15)" stroke="rgba(255,255,255,0.28)" strokeWidth="1"/>
      </g>
      {/* Tree */}
      <rect x="358" y="242" width="7" height="26" fill="rgba(255,255,255,0.18)" rx="3"/>
      <g className="tree-leaves" style={{ transformOrigin: '361px 238px' }}>
        <ellipse cx="361" cy="228" rx="22" ry="20" fill="rgba(190,242,100,0.16)" stroke="rgba(190,242,100,0.26)" strokeWidth="1"/>
        <ellipse cx="351" cy="235" rx="14" ry="12" fill="rgba(190,242,100,0.1)"/>
        <ellipse cx="372" cy="234" rx="12" ry="11" fill="rgba(190,242,100,0.09)"/>
      </g>
      {/* Garage */}
      <rect x="296" y="232" width="70" height="36" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.17)" strokeWidth="1.2" rx="2"/>
      <rect x="292" y="226" width="78" height="8" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.2)" strokeWidth="1" rx="2"/>
      <rect x="309" y="244" width="44" height="24" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.14)" strokeWidth="1" rx="1"/>
      <line x1="309" y1="252" x2="353" y2="252" stroke="rgba(255,255,255,0.07)" strokeWidth="0.75"/>
      <line x1="309" y1="260" x2="353" y2="260" stroke="rgba(255,255,255,0.07)" strokeWidth="0.75"/>
      <line x1="331" y1="244" x2="331" y2="268" stroke="rgba(255,255,255,0.07)" strokeWidth="0.75"/>
    </>
  );
}

function DHHScene() {
  return (
    <>
      <ellipse cx="75" cy="269" rx="42" ry="4" fill="rgba(190,242,100,0.06)"/>
      <ellipse cx="325" cy="269" rx="42" ry="4" fill="rgba(190,242,100,0.06)"/>
      <rect x="182" y="250" width="36" height="18" fill="rgba(190,242,100,0.1)" stroke="rgba(190,242,100,0.22)" strokeWidth="1" rx="3"/>
      <ellipse cx="188" cy="250" rx="7" ry="6" fill="rgba(190,242,100,0.14)"/>
      <ellipse cx="200" cy="248" rx="6" ry="5" fill="rgba(190,242,100,0.17)"/>
      <ellipse cx="212" cy="250" rx="7" ry="6" fill="rgba(190,242,100,0.14)"/>
      <rect x="44" y="252" width="5" height="16" fill="rgba(255,255,255,0.16)" rx="2"/>
      <ellipse cx="46" cy="244" rx="14" ry="12" fill="rgba(190,242,100,0.13)" stroke="rgba(190,242,100,0.2)" strokeWidth="1"/>
      <rect x="326" y="257" width="10" height="11" fill="rgba(255,255,255,0.07)" stroke="rgba(255,255,255,0.18)" strokeWidth="1" rx="1"/>
    </>
  );
}

function RHScene() {
  return (
    <>
      <rect x="34" y="265" width="82" height="6" fill="rgba(190,242,100,0.05)" rx="1"/>
      <rect x="140" y="263" width="80" height="8" fill="rgba(190,242,100,0.07)" rx="1"/>
      <rect x="242" y="265" width="82" height="6" fill="rgba(190,242,100,0.05)" rx="1"/>
      <line x1="138" y1="250" x2="138" y2="300" stroke="rgba(255,255,255,0.1)" strokeWidth="1.2" strokeDasharray="3 2"/>
      <line x1="242" y1="250" x2="242" y2="300" stroke="rgba(255,255,255,0.1)" strokeWidth="1.2" strokeDasharray="3 2"/>
      {[56,98,164,210,264,306].map((cx, i) => (
        <ellipse key={i} cx={cx} cy={i < 2 ? 265 : i < 4 ? 263 : 265} rx={i % 2 === 0 ? 10 : 9} ry={i < 2 || i >= 4 ? 6 : 7} fill={i % 3 === 0 ? 'rgba(190,242,100,0.14)' : 'rgba(190,242,100,0.1)'} stroke={i % 3 === 0 ? 'rgba(190,242,100,0.2)' : 'none'} strokeWidth="1"/>
      ))}
    </>
  );
}

function OtherScene() {
  return (
    <>
      <rect x="0" y="268" width="400" height="32" fill="rgba(255,255,255,0.015)"/>
      <g stroke="rgba(255,255,255,0.1)" strokeWidth="1">
        {[18,44,70,96,308,334,360,386].map(x => <line key={x} x1={x} y1="268" x2={x} y2="300"/>)}
      </g>
      {[31,57,321,347].map(x => <text key={x} x={x} y="288" textAnchor="middle" fontSize="9" fontFamily="Geist,sans-serif" fill="rgba(255,255,255,0.12)">P</text>)}
      <g stroke="rgba(255,255,255,0.15)" strokeWidth="1.2" strokeLinecap="round">
        {[4,12,112,120,280,288,388,380].map((x,i) => <line key={i} x1={x} y1="268" x2={x} y2={i%2===0?279:277}/>)}
      </g>
      <rect x="4" y="246" width="22" height="14" fill="rgba(190,242,100,0.11)" stroke="rgba(190,242,100,0.28)" strokeWidth="1" rx="2"/>
      <line x1="15" y1="260" x2="15" y2="268" stroke="rgba(255,255,255,0.18)" strokeWidth="1.2"/>
      <text x="15" y="255.5" textAnchor="middle" fontSize="5.5" fontFamily="Geist,sans-serif" fontWeight="600" fill="rgba(190,242,100,0.7)">PV</text>
      <rect x="370" y="250" width="5" height="18" fill="rgba(255,255,255,0.16)" rx="2"/>
      <ellipse cx="372" cy="242" rx="13" ry="11" fill="rgba(190,242,100,0.11)" stroke="rgba(190,242,100,0.18)" strokeWidth="1"/>
    </>
  );
}

// ─── House bodies ────────────────────────────────────────────────
function EFHBody() {
  return (
    <g id="body-efh">
      <rect x="82" y="148" width="196" height="120" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" rx="3"/>
      <rect x="163" y="200" width="36" height="68" fill="rgba(255,255,255,0.07)" stroke="rgba(255,255,255,0.25)" strokeWidth="1" rx="2"/>
      <circle cx="195" cy="234" r="2.5" fill="rgba(255,255,255,0.4)"/>
      <rect x="97" y="163" width="42" height="30" fill="rgba(190,242,100,0.07)" stroke="rgba(255,255,255,0.22)" strokeWidth="1" rx="2"/>
      <line x1="118" y1="163" x2="118" y2="193" stroke="rgba(255,255,255,0.12)" strokeWidth="0.75"/>
      <line x1="97" y1="178" x2="139" y2="178" stroke="rgba(255,255,255,0.12)" strokeWidth="0.75"/>
      <rect x="221" y="163" width="42" height="30" fill="rgba(190,242,100,0.07)" stroke="rgba(255,255,255,0.22)" strokeWidth="1" rx="2"/>
      <line x1="242" y1="163" x2="242" y2="193" stroke="rgba(255,255,255,0.12)" strokeWidth="0.75"/>
      <line x1="221" y1="178" x2="263" y2="178" stroke="rgba(255,255,255,0.12)" strokeWidth="0.75"/>
    </g>
  );
}

function DHHBody() {
  return (
    <g id="body-dhh">
      <rect x="112" y="148" width="158" height="120" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" rx="2"/>
      <line x1="191" y1="148" x2="191" y2="268" stroke="rgba(255,255,255,0.12)" strokeWidth="1" strokeDasharray="3 3"/>
      <rect x="166" y="202" width="32" height="66" fill="rgba(255,255,255,0.07)" stroke="rgba(255,255,255,0.25)" strokeWidth="1" rx="2"/>
      <rect x="122" y="163" width="34" height="26" fill="rgba(190,242,100,0.06)" stroke="rgba(255,255,255,0.2)" strokeWidth="1" rx="2"/>
      <rect x="208" y="163" width="34" height="26" fill="rgba(190,242,100,0.06)" stroke="rgba(255,255,255,0.2)" strokeWidth="1" rx="2"/>
    </g>
  );
}

function RHBody() {
  return (
    <g id="body-rh">
      <rect x="50" y="172" width="88" height="96" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.18)" strokeWidth="1" rx="2"/>
      <rect x="156" y="148" width="84" height="120" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.32)" strokeWidth="1.5" rx="2"/>
      <rect x="258" y="172" width="88" height="96" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.18)" strokeWidth="1" rx="2"/>
      <rect x="79" y="216" width="22" height="52" fill="rgba(255,255,255,0.06)" rx="1"/>
      <rect x="181" y="200" width="22" height="68" fill="rgba(255,255,255,0.08)" rx="1"/>
      <rect x="281" y="216" width="22" height="52" fill="rgba(255,255,255,0.06)" rx="1"/>
    </g>
  );
}

function OtherBody() {
  return (
    <g id="body-other">
      <rect x="58" y="126" width="284" height="142" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5" rx="3"/>
      <line x1="58" y1="182" x2="342" y2="182" stroke="rgba(255,255,255,0.1)" strokeWidth="1"/>
      {[[78,138],[122,138],[240,138],[284,138]].map(([x,y],i) => (
        <rect key={i} x={x} y={y} width="30" height="20" fill="rgba(190,242,100,0.07)" stroke="rgba(255,255,255,0.18)" strokeWidth="1" rx="1"/>
      ))}
      <rect x="168" y="198" width="58" height="70" fill="rgba(255,255,255,0.07)" stroke="rgba(255,255,255,0.25)" strokeWidth="1" rx="2"/>
    </g>
  );
}

// ─── PV Panels ────────────────────────────────────────────────────
function PVPanels({ visible }: { visible: boolean }) {
  if (!visible) return null;
  const positions = [{ x: 140, y: 98 }, { x: 171, y: 90 }, { x: 202, y: 90 }, { x: 232, y: 98 }, { x: 156, y: 117 }, { x: 187, y: 109 }, { x: 217, y: 117 }];
  return (
    <g opacity="1" style={{ transition: 'opacity 0.6s' }}>
      <defs>
        <g id="pv-module">
          <rect width="28" height="17" fill="rgba(15,25,40,0.82)" stroke="rgba(190,242,100,0.65)" strokeWidth="0.8" rx="0.5"/>
          <line x1="9.3" y1="0.5" x2="9.3" y2="16.5" stroke="rgba(190,242,100,0.22)" strokeWidth="0.4"/>
          <line x1="18.6" y1="0.5" x2="18.6" y2="16.5" stroke="rgba(190,242,100,0.22)" strokeWidth="0.4"/>
          <line x1="0.5" y1="8.5" x2="27.5" y2="8.5" stroke="rgba(190,242,100,0.22)" strokeWidth="0.4"/>
          {[[0.8,0.8],[10.1,0.8],[19.4,0.8],[0.8,9.3],[10.1,9.3],[19.4,9.3]].map(([x,y],i) => (
            <rect key={i} x={x} y={y} width="7.7" height="7" fill="rgba(40,90,160,0.45)" rx="0.2"/>
          ))}
          <rect x="0.8" y="0.8" width="26.4" height="3" fill="rgba(190,242,100,0.06)" rx="0.2"/>
        </g>
      </defs>
      {positions.map((pos, i) => (
        <use key={i} href="#pv-module" transform={`translate(${pos.x}, ${pos.y})`} />
      ))}
      <rect x="138" y="88" width="124" height="50" fill="rgba(190,242,100,0.04)" rx="2"/>
    </g>
  );
}

// ─── Roof shapes ──────────────────────────────────────────────────
const roofPaths: Record<string, Record<string, React.ReactNode>> = {
  sattel: {
    efh:   <><polygon points="62,150 180,72 298,150" fill="rgba(190,242,100,0.08)"/><polyline points="62,150 180,72 298,150" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="2"/></>,
    dhh:   <><polygon points="92,150 191,82 290,150" fill="rgba(190,242,100,0.08)"/><polyline points="92,150 191,82 290,150" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="2"/></>,
    rh:    <><polyline points="40,172 94,124 148,172" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5"/><polyline points="146,150 198,98 250,150" fill="none" stroke="rgba(255,255,255,0.62)" strokeWidth="2"/><polyline points="248,172 302,124 356,172" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5"/></>,
    other: <><polygon points="58,126 200,60 342,126" fill="rgba(190,242,100,0.06)"/><polyline points="58,126 200,60 342,126" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5"/></>,
  },
  flach: {
    efh:   <><rect x="76" y="138" width="208" height="14" fill="rgba(190,242,100,0.1)"/><rect x="76" y="138" width="208" height="14" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" rx="2"/></>,
    dhh:   <><rect x="106" y="138" width="170" height="14" fill="rgba(190,242,100,0.1)"/><rect x="106" y="138" width="170" height="14" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" rx="2"/></>,
    rh:    <><rect x="44" y="160" width="312" height="12" fill="rgba(190,242,100,0.1)"/><rect x="44" y="160" width="312" height="12" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" rx="2"/></>,
    other: <><rect x="52" y="114" width="296" height="14" fill="rgba(190,242,100,0.1)"/><rect x="52" y="114" width="296" height="14" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" rx="2"/></>,
  },
  pult: {
    efh:   <><polygon points="82,148 82,88 278,128 278,148" fill="rgba(190,242,100,0.08)"/><polyline points="82,148 82,88 278,128 278,148" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="2"/></>,
    dhh:   <><polygon points="112,148 112,90 270,124 270,148" fill="rgba(190,242,100,0.08)"/><polyline points="112,148 112,90 270,124 270,148" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="2"/></>,
    rh:    <><polygon points="50,172 50,118 346,150 346,172" fill="rgba(190,242,100,0.08)"/><polyline points="50,172 50,118 346,150 346,172" fill="none" stroke="rgba(255,255,255,0.55)" strokeWidth="1.5"/></>,
    other: <><polygon points="58,126 58,78 342,108 342,126" fill="rgba(190,242,100,0.07)"/><polyline points="58,126 58,78 342,108 342,126" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5"/></>,
  },
  walm: {
    efh:   <><polygon points="82,148 130,92 250,92 278,148" fill="rgba(190,242,100,0.08)"/><polyline points="82,148 130,92 250,92 278,148" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="2"/><line x1="130" y1="92" x2="180" y2="66" stroke="rgba(255,255,255,0.45)" strokeWidth="1.5"/><line x1="250" y1="92" x2="180" y2="66" stroke="rgba(255,255,255,0.45)" strokeWidth="1.5"/></>,
    dhh:   <><polygon points="112,148 148,92 234,92 270,148" fill="rgba(190,242,100,0.08)"/><polyline points="112,148 148,92 234,92 270,148" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="2"/><line x1="148" y1="92" x2="191" y2="68" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5"/><line x1="234" y1="92" x2="191" y2="68" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5"/></>,
    rh:    <><polygon points="50,172 90,118 310,118 350,172" fill="rgba(190,242,100,0.07)"/><polyline points="50,172 90,118 310,118 350,172" fill="none" stroke="rgba(255,255,255,0.55)" strokeWidth="1.5"/><line x1="90" y1="118" x2="200" y2="88" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5"/><line x1="310" y1="118" x2="200" y2="88" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5"/></>,
    other: <><polygon points="58,126 108,76 292,76 342,126" fill="rgba(190,242,100,0.06)"/><polyline points="58,126 108,76 292,76 342,126" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5"/><line x1="108" y1="76" x2="200" y2="52" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5"/><line x1="292" y1="76" x2="200" y2="52" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5"/></>,
  },
};

// ─── Persons Layer ────────────────────────────────────────────────
function PersonsLayer({ count, haustyp }: { count: number; haustyp: HausTyp | null }) {
  const spacings  = { efh: 30, dhh: 24, rh: 20, other: 28 };
  const centers   = { efh: 182, dhh: 192, rh: 200, other: 186 };
  const spacing   = spacings[haustyp ?? 'efh'];
  const cx        = centers[haustyp ?? 'efh'];
  const seeds     = ['felix','sophie','maria','jonas','anna','max','lea','tom'];
  const avatarH   = 52;
  const avatarW   = 34;
  const startX    = cx - (count - 1) * spacing / 2;

  return (
    <>
      {Array.from({ length: count }).map((_, i) => {
        const x     = Math.round(startX + i * spacing);
        const scale = i % 3 === 2 ? 0.88 : i % 3 === 1 ? 0.94 : 1.0;
        const h     = Math.round(avatarH * scale);
        const w     = Math.round(avatarW * scale);
        const yTop  = 268 - h;
        const seed  = seeds[i % seeds.length];
        return (
          <g key={i}>
            <ellipse cx={x} cy={269} rx={Math.round(w * 0.4)} ry={2.5} fill="rgba(0,0,0,0.18)"/>
            <image
              href={`https://api.dicebear.com/9.x/personas/svg?seed=${seed}&backgroundColor=transparent`}
              x={x - Math.round(w / 2)}
              y={yTop}
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

// ─── Speicher basement ────────────────────────────────────────────
function BasementLayer({ visible, haustyp }: { visible: boolean; haustyp: HausTyp | null }) {
  if (!visible) return null;
  const ht = haustyp ?? 'efh';
  const xMap: Record<HausTyp, number> = { efh: 128, dhh: 148, rh: 178, other: 178 };
  const x = xMap[ht];
  return (
    <g>
      <rect x={x} y={272} width="44" height="32" fill="rgba(190,242,100,0.08)" stroke="rgba(190,242,100,0.4)" strokeWidth="1.5" rx="3"/>
      <rect x={x+6} y={277} width="32" height="5" fill="rgba(190,242,100,0.25)" rx="1"/>
      <rect x={x+6} y={284} width="32" height="5" fill="rgba(190,242,100,0.18)" rx="1"/>
      <rect x={x+6} y={291} width="32" height="5" fill="rgba(190,242,100,0.12)" rx="1"/>
      <text x={x+22} y={313} textAnchor="middle" fontSize="7" fontFamily="Geist,sans-serif" fill="rgba(190,242,100,0.6)">Speicher</text>
    </g>
  );
}

// ─── Wallbox scene ────────────────────────────────────────────────
function WallboxLayer({ visible }: { visible: boolean }) {
  if (!visible) return null;
  return (
    <g>
      <rect x="270" y="188" width="22" height="30" fill="rgba(255,255,255,0.06)" stroke="rgba(190,242,100,0.5)" strokeWidth="1.5" rx="3"/>
      <rect x="274" y="193" width="14" height="8" fill="rgba(190,242,100,0.2)" rx="1"/>
      <circle cx="281" cy="207" r="3" fill="rgba(190,242,100,0.4)" stroke="rgba(190,242,100,0.7)" strokeWidth="1"/>
      <text x="281" y="225" textAnchor="middle" fontSize="6.5" fontFamily="Geist,sans-serif" fill="rgba(190,242,100,0.6)">Wallbox</text>
      {/* E-car */}
      <rect x="290" y="244" width="90" height="26" fill="rgba(255,255,255,0.07)" stroke="rgba(255,255,255,0.25)" strokeWidth="1.2" rx="4"/>
      <rect x="305" y="234" width="58" height="12" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.2)" strokeWidth="1" rx="8"/>
      <rect x="309" y="235" width="22" height="9" fill="rgba(190,242,100,0.06)" rx="1"/>
      <rect x="334" y="235" width="20" height="9" fill="rgba(190,242,100,0.06)" rx="1"/>
      <circle cx="308" cy="270" r="8" fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.3)" strokeWidth="1.2"/>
      <circle cx="308" cy="270" r="4" fill="rgba(255,255,255,0.05)"/>
      <circle cx="360" cy="270" r="8" fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.3)" strokeWidth="1.2"/>
      <circle cx="360" cy="270" r="4" fill="rgba(255,255,255,0.05)"/>
      <rect x="330" y="249" width="18" height="10" fill="rgba(190,242,100,0.2)" stroke="rgba(190,242,100,0.5)" strokeWidth="0.75" rx="2"/>
      <text x="339" y="257" textAnchor="middle" fontSize="6" fontFamily="Geist,sans-serif" fontWeight="600" fill="rgba(190,242,100,0.9)">EV</text>
    </g>
  );
}

// ─── Main HouseScene ──────────────────────────────────────────────
export default function HouseScene() {
  const { step, haustyp, dachtyp, speicher, wallbox, persons } = useFunnelStore();

  const showRoof     = step !== 1 && !!dachtyp && !!haustyp;
  const showPV       = showRoof;
  const showPersons  = step === 4;
  const showSpeicher = speicher === 'ja';
  const showWallbox  = wallbox === 'ja';
  const showScene    = !!haustyp;
  const isMinimized  = step === 2 || step === 3;

  const ht = haustyp ?? 'efh';

  return (
    <div className={`house-viz ${isMinimized ? 'house-minimized' : ''}`}>
      <svg viewBox="0 0 400 320" width="100%" style={{ overflow: 'visible' }}>
        <defs>
          <radialGradient id="sky-grad" cx="50%" cy="30%" r="70%">
            <stop offset="0%" stopColor="rgba(190,242,100,0.04)"/>
            <stop offset="100%" stopColor="rgba(0,0,0,0)"/>
          </radialGradient>
          <filter id="elec-glow"><feGaussianBlur stdDeviation="2" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
        </defs>

        <rect x="0" y="0" width="400" height="320" fill="url(#sky-grad)"/>

        {/* Sun */}
        <g>
          <circle cx="340" cy="52" r="26" fill="rgba(190,242,100,0.04)"/>
          <circle cx="340" cy="52" r="18" fill="rgba(190,242,100,0.08)" stroke="rgba(190,242,100,0.2)" strokeWidth="1"/>
          <circle cx="340" cy="52" r="9" fill="rgba(190,242,100,0.35)"/>
          {[[340,26,340,18],[340,78,340,86],[314,52,306,52],[366,52,374,52],[321,33,316,28],[359,71,364,76],[359,33,364,28],[321,71,316,76]].map(([x1,y1,x2,y2],i) => (
            <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#bef264" strokeWidth="1.5" strokeLinecap="round"/>
          ))}
        </g>

        {/* Clouds */}
        <g className="cloud1" opacity="0.45">
          <ellipse cx="60" cy="38" rx="22" ry="10" fill="rgba(255,255,255,0.08)"/>
          <ellipse cx="78" cy="35" rx="16" ry="9" fill="rgba(255,255,255,0.1)"/>
        </g>
        <g className="cloud2" opacity="0.45">
          <ellipse cx="260" cy="28" rx="18" ry="8" fill="rgba(255,255,255,0.06)"/>
          <ellipse cx="274" cy="25" rx="12" ry="7" fill="rgba(255,255,255,0.08)"/>
        </g>

        {/* Ground + scene */}
        <rect x="0" y="268" width="400" height="52" fill="rgba(255,255,255,0.03)"/>
        <line x1="0" y1="268" x2="400" y2="268" stroke="rgba(255,255,255,0.12)" strokeWidth="1.5"/>

        {showScene && (
          <>
            {ht === 'efh'   && <EFHScene />}
            {ht === 'dhh'   && <DHHScene />}
            {ht === 'rh'    && <RHScene />}
            {ht === 'other' && <OtherScene />}
          </>
        )}

        {/* House body */}
        {haustyp && (
          <>
            {ht === 'efh'   && <EFHBody />}
            {ht === 'dhh'   && <DHHBody />}
            {ht === 'rh'    && <RHBody />}
            {ht === 'other' && <OtherBody />}
          </>
        )}

        {/* Basement speicher */}
        <BasementLayer visible={showSpeicher} haustyp={haustyp} />

        {/* Roof */}
        {showRoof && dachtyp && haustyp && (
          <g>{roofPaths[dachtyp]?.[ht]}</g>
        )}

        {/* PV panels */}
        <PVPanels visible={showPV} />

        {/* Energy cable */}
        {showSpeicher && (
          <g>
            <path id="cable-main" d="M 200 148 L 200 268 L 150 268 L 150 278" fill="none" stroke="rgba(190,242,100,0.25)" strokeWidth="1.5" strokeDasharray="4 3"/>
            {[0, 0.6, 1.2].map((begin, i) => (
              <circle key={i} r={3 - i * 0.5} fill="rgba(190,242,100,0.9)" filter="url(#elec-glow)">
                <animateMotion dur="1.8s" repeatCount="indefinite" begin={`${begin}s`}>
                  <mpath href="#cable-main"/>
                </animateMotion>
              </circle>
            ))}
          </g>
        )}

        {/* Energy line (sun) */}
        {showRoof && <line x1="200" y1="148" x2="340" y2="56" stroke="rgba(190,242,100,0.5)" strokeWidth="1" strokeDasharray="3 4" opacity="0.45"/>}

        {/* Persons */}
        {showPersons && <PersonsLayer count={persons} haustyp={haustyp} />}

        {/* Wallbox + car */}
        <WallboxLayer visible={showWallbox} />
      </svg>

      {/* Info tags */}
      {haustyp && (
        <div className="info-tags">
          <InfoTag dot="var(--badge-bg)" label="Gebäudetyp" val={
            (() => {
              
              return hausDaten[ht]?.label ?? '–';
            })()
          } />
          {showPersons && (
            <>
              <InfoTag dot="var(--text-subtle)" label="Personen im Haushalt" val={`${persons} ${persons === 1 ? 'Person' : 'Personen'}`}/>
              <InfoTag dot="var(--accent)" label="Jahresverbrauch" val={`${(1500 + persons * 700).toLocaleString('de')} kWh`}/>
            </>
          )}
          {showRoof && !showPersons && (
            <>
              <InfoTag dot="var(--text-subtle)" label="Dachtyp" val={dachtyp ? dachDaten[dachtyp]?.label : '–'}/>
              {(step === 5 || step === 6) && <InfoTag dot="var(--accent)" label="PV-Anlage" val="konfiguriert"/>}
            </>
          )}
        </div>
      )}
    </div>
  );
}

function InfoTag({ dot, label, val }: { dot: string; label: string; val: string }) {
  return (
    <div className="info-tag show">
      <div className="itdot" style={{ background: dot }}/>
      <div className="itlabel">{label}</div>
      <div className="itval">{val}</div>
    </div>
  );
}
