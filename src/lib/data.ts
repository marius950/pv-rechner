import type { HausTyp, DachTyp, Ausrichtung, HausDaten, DachDaten, OrientDaten } from '@/types';

export const hausDaten: Record<HausTyp, HausDaten> = {
  efh:   { label: 'Einfamilienhaus',           dach: '60–120 m²',  kwp: 'bis 20 kWp',   faktor: 1.15 },
  dhh:   { label: 'Doppelhaushälfte',           dach: '30–60 m²',   kwp: 'bis 12 kWp',   faktor: 0.60 },
  rh:    { label: 'Reihenhaus',                 dach: '20–50 m²',   kwp: 'bis 8 kWp',    faktor: 0.50 },
  other: { label: 'Mehrfamilienhaus / Gewerbe', dach: '80–400 m²',  kwp: 'bis 100 kWp',  faktor: 1.20 },
};

export const dachDaten: Record<DachTyp, DachDaten> = {
  sattel: { label: 'Satteldach', neigung: '25–45°',          ertrag: 'bis 100 %' },
  flach:  { label: 'Flachdach',  neigung: '0–5° (aufgest.)', ertrag: 'bis 100 %' },
  pult:   { label: 'Pultdach',   neigung: '15–35°',          ertrag: 'bis 95 %'  },
  walm:   { label: 'Walmdach',   neigung: '30–45°',          ertrag: 'bis 85 %'  },
};

export const orientDaten: Record<Ausrichtung, OrientDaten> = {
  s:    { label: 'Süd',         desc: 'Optimal — max. Ertrag',                     deg: 0,   faktor: 1.00, nutzSattel: [false, true],  nutzPult: true,  nutzWalm: ['s']           },
  ow:   { label: 'Ost/West',    desc: 'Beide Seiten nutzbar',                      deg: 0,   faktor: 0.82, nutzSattel: [true, true],   nutzPult: false, nutzWalm: ['o', 'w']      },
  o:    { label: 'Ost',         desc: '75 % Ertrag',                               deg: -90, faktor: 0.75, nutzSattel: [false, true],  nutzPult: true,  nutzWalm: ['o']           },
  w:    { label: 'West',        desc: '75 % Ertrag',                               deg: 90,  faktor: 0.75, nutzSattel: [true, false],  nutzPult: true,  nutzWalm: ['w']           },
  n:    { label: 'Nord',        desc: 'Nicht empfohlen — 50 % Ertrag',             deg: 180, faktor: 0.50, nutzSattel: [false, false], nutzPult: false, nutzWalm: []              },
  best: { label: 'Beste Seite', desc: 'Automatisch optimal ausgerichtet',          deg: 0,   faktor: 1.00, nutzSattel: [false, true],  nutzPult: true,  nutzWalm: ['s', 'o', 'w'] },
};

export const orientByDach: Record<DachTyp, Ausrichtung[]> = {
  sattel: ['s', 'ow', 'o', 'w', 'n'],
  flach:  [],
  pult:   ['s', 'o', 'w', 'n'],
  walm:   ['best'],
};

// ── Stromverbrauch nach Personenzahl (Mittelwert aus den Ranges) ───
// 1P: 1650, 2P: 3000, 3P: 3750, 4P: 5250, 5P+: 6500
export const VERBRAUCH_PRO_PERSONEN: Record<number, number> = {
  1: 1650,
  2: 3000,
  3: 3750,
  4: 5250,
  5: 6500,
};

// ── Wärmepumpe Zusatzverbrauch ────────────────────────────────────
export const WAERMEPUMPE_KWH = 5000;

// ── Wallbox Zusatzverbrauch ───────────────────────────────────────
export const WALLBOX_KWH = 2500;

// ── Einspeisevergütung (aktualisiert) ────────────────────────────
export const EINSPEISUNG_CT = 0.0778; // 7,78 ct/kWh

// ── Strompreis (inkl. Entwicklung) ───────────────────────────────
export const STROMPREIS       = 0.372;   // 37,2 ct/kWh Basis
export const STROMPREIS_STEIG = 0.04;    // 4 % p.a.

// ── Dach-Flächenfaktoren nach Dachtyp ────────────────────────────
// Satteldach: (Wohnfläche/Geschosse) * 1.305 * 0.5
// Flachdach:  (Wohnfläche/Geschosse)
// Walmdach:   (Wohnfläche/Geschosse) * 1.6 * 0.7
// Pultdach:   (Wohnfläche/Geschosse) * 1.1
export const DACH_FAKTOREN: Record<string, number> = {
  sattel: 1.305 * 0.5,   // = 0.6525
  flach:  1.0,
  walm:   1.6 * 0.7,     // = 1.12
  pult:   1.1,
};

// ── Eigenverbrauchsquoten nach Gerätekombination ──────────────────
// speicher | wp | wallbox → Quote
export const EV_QUOTE: Record<string, number> = {
  'ja|ja|ja':    0.85,  // Mit Speicher + WP + Wallbox
  'ja|ja|nein':  0.80,  // Mit Speicher + WP
  'ja|nein|ja':  0.70,  // Mit Speicher + Wallbox
  'ja|nein|nein':0.70,  // Mit Speicher
  'nein|ja|ja':  0.70,  // Ohne Speicher + WP + Wallbox
  'nein|ja|nein':0.50,  // Ohne Speicher + WP (korrigiert auf 50%)
  'nein|nein|ja':0.50,  // Ohne Speicher + Wallbox
  'nein|nein|nein':0.30,// Nur PV, kein Extras
};

export const AVATAR_SEEDS = ['felix', 'sophie', 'maria', 'jonas', 'anna', 'max', 'lea', 'tom'];
