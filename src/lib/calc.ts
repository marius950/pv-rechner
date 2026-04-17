import type { FunnelState, PVCalc } from '@/types';
import { GRUNDBEDARF, PRO_PERSON, STROMPREIS, hausDaten } from './data';

export function calcVerbrauch(persons: number): number {
  return GRUNDBEDARF + persons * PRO_PERSON;
}

export function calcDachflaeche(wohnflaeche: number, geschosse: number, haustyp: string, faktor: number, nutzPct: number) {
  const gesamt  = Math.round((wohnflaeche / geschosse) * faktor);
  const nutzbar = Math.round(gesamt * 0.80 * (nutzPct / 100));
  const kwp     = Math.round((nutzbar / 5.5) * 10) / 10;
  const module  = Math.round(kwp / 0.42);
  return { gesamt, nutzbar, module, kwp };
}

export function calcPV(state: Partial<FunnelState>): PVCalc {
  const ht       = state.haustyp ?? 'efh';
  const faktor   = hausDaten[ht]?.faktor ?? 1.0;
  const nutzPct  = state.nutzPct ?? 50;
  const persons  = state.persons ?? 3;
  const speicher = state.speicher;
  const wallbox  = state.wallbox;

  const { kwp, module } = calcDachflaeche(
    state.wohnflaeche ?? 120,
    state.geschosse ?? 2,
    ht, faktor, nutzPct
  );

  const erzeugt   = Math.round(kwp * 950 * (state.ertragFaktor ?? 1.0));
  const verbrauch = calcVerbrauch(persons) + (wallbox === 'ja' ? 2000 : 0);
  const evBasis   = speicher === 'ja' ? 0.80 : 0.30;
  const evKwh     = Math.round(Math.min(erzeugt * evBasis, verbrauch));
  const einspKwh  = erzeugt - evKwh;
  const erspaart  = Math.round(evKwh * STROMPREIS);
  const einspEuro = Math.round(einspKwh * 0.082);
  const ersparnis = erspaart + einspEuro;

  let invest = Math.round(kwp * 1400);
  if (speicher === 'ja') invest += Math.round(kwp * 400 + 2000);
  if (wallbox  === 'ja') invest += 1500;

  let kumulativ = 0, breakEvenJahr = 0;
  const yearly: { y: number; ertragJ: number; kumulativ: number }[] = [];
  for (let y = 1; y <= 20; y++) {
    const deg     = Math.pow(0.99, y);
    const preis   = STROMPREIS * Math.pow(1.04, y);
    const evJ     = Math.round(evKwh * deg);
    const einspJ  = Math.round(einspKwh * deg);
    const ertragJ = Math.round(evJ * preis + einspJ * 0.082);
    kumulativ += ertragJ;
    yearly.push({ y, ertragJ, kumulativ });
    if (!breakEvenJahr && kumulativ >= invest) breakEvenJahr = y;
  }

  const netto20  = kumulativ - invest;
  const rendite  = Math.round((netto20 / invest / 20) * 100);
  const co2Jahr  = Math.round(erzeugt * 0.38) / 1000;
  const co2_20   = Math.round(co2Jahr * 20 * 10) / 10;
  const evPct    = erzeugt > 0 ? Math.round(evKwh / erzeugt * 100) : 0;

  return { kwp, module, erzeugt, verbrauch, evKwh, einspKwh, ersparnis, invest, netto20, breakEvenJahr, rendite, co2Jahr, co2_20, yearly, evPct };
}

export function fmtDE(n: number, decimals = 0): string {
  return n.toLocaleString('de', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
}
