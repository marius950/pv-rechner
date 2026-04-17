export type HausTyp = 'efh' | 'dhh' | 'rh' | 'other';
export type DachTyp = 'sattel' | 'flach' | 'pult' | 'walm';
export type Ausrichtung = 's' | 'ow' | 'o' | 'w' | 'n' | 'best';
export type Step = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 'result';

export interface FunnelState {
  step: Step;
  haustyp: HausTyp | null;
  dachtyp: DachTyp | null;
  ausrichtung: Ausrichtung | null;
  nutzPct: number;
  ertragFaktor: number;
  wohnflaeche: number;
  geschosse: number;
  persons: number;
  speicher: 'ja' | 'nein' | null;
  wallbox: 'ja' | 'nein' | null;
  eigentuemer: 'ja' | 'nein' | null;
  zeitplan: string | null;
  leadName: string;
  leadEmail: string;
  leadPhone: string;
  theme: 'dark' | 'light';
}

export interface HausDaten {
  label: string;
  dach: string;
  kwp: string;
  faktor: number;
}

export interface DachDaten {
  label: string;
  neigung: string;
  ertrag: string;
}

export interface OrientDaten {
  label: string;
  desc: string;
  deg: number;
  faktor: number;
  nutzSattel: [boolean, boolean];
  nutzPult: boolean;
  nutzWalm: string[];
}

export interface PVCalc {
  kwp: number;
  module: number;
  erzeugt: number;
  verbrauch: number;
  evKwh: number;
  einspKwh: number;
  ersparnis: number;
  invest: number;
  netto20: number;
  breakEvenJahr: number;
  rendite: number;
  co2Jahr: number;
  co2_20: number;
  yearly: { y: number; ertragJ: number; kumulativ: number }[];
  evPct: number;
}
