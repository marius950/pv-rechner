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
  s:    { label: 'Süd',        desc: 'Optimal — max. Ertrag',                      deg: 0,   faktor: 1.00, nutzSattel: [false, true],  nutzPult: true,  nutzWalm: ['s']           },
  ow:   { label: 'Ost/West',   desc: 'Beide Seiten nutzbar',                       deg: 0,   faktor: 0.82, nutzSattel: [true, true],   nutzPult: false, nutzWalm: ['o', 'w']      },
  o:    { label: 'Ost',        desc: '75 % Ertrag',                                deg: -90, faktor: 0.75, nutzSattel: [false, true],  nutzPult: true,  nutzWalm: ['o']           },
  w:    { label: 'West',       desc: '75 % Ertrag',                                deg: 90,  faktor: 0.75, nutzSattel: [true, false],  nutzPult: true,  nutzWalm: ['w']           },
  n:    { label: 'Nord',       desc: 'Nicht empfohlen — 50 % Ertrag',              deg: 180, faktor: 0.50, nutzSattel: [false, false], nutzPult: false, nutzWalm: []              },
  best: { label: 'Beste Seite', desc: 'Automatisch optimal ausgerichtet',           deg: 0,   faktor: 1.00, nutzSattel: [false, true],  nutzPult: true,  nutzWalm: ['s', 'o', 'w'] },
};

export const orientByDach: Record<DachTyp, Ausrichtung[]> = {
  sattel: ['s', 'ow', 'o', 'w', 'n'],
  flach:  [],
  pult:   ['s', 'o', 'w', 'n'],
  walm:   ['best'],
};

// Calculation constants
export const GRUNDBEDARF  = 1500;
export const PRO_PERSON   = 700;
export const STROMPREIS   = 0.32;

export const AVATAR_SEEDS = ['felix', 'sophie', 'maria', 'jonas', 'anna', 'max', 'lea', 'tom'];
