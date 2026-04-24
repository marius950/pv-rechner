import type { FunnelState, PVCalc } from '@/types';
import {
  hausDaten, DACH_FAKTOREN, VERBRAUCH_PRO_PERSONEN,
  WAERMEPUMPE_KWH, WALLBOX_KWH, STROMPREIS, STROMPREIS_STEIG,
  EINSPEISUNG_CT, EV_QUOTE,
} from './data';

// ── Haushaltsstrom nach Personenzahl ──────────────────────────────
export function calcVerbrauch(
  persons: number,
  waermepumpe: 'ja' | 'nein' | null,
  wallbox: 'ja' | 'nein' | null,
): number {
  // Basis: Mittelwert aus den Ranges im Dokument; cap bei 5+
  const basis = VERBRAUCH_PRO_PERSONEN[Math.min(persons, 5)] ?? 3750;
  const wp    = waermepumpe === 'ja' ? WAERMEPUMPE_KWH : 0;
  const wb    = wallbox === 'ja'     ? WALLBOX_KWH     : 0;
  return basis + wp + wb;
}

// ── Dachfläche nach Dachtyp + Haustyp-Faktor ─────────────────────
export function calcDachflaeche(
  wohnflaeche: number,
  geschosse: number,
  haustyp: string,
  dachtyp: string,
  nutzPct: number,
) {
  // Dachfläche = (Wohnfläche / Geschosse) * Dachform-Faktor * Haustyp-Skalierung
  const dachFaktor  = DACH_FAKTOREN[dachtyp] ?? DACH_FAKTOREN['sattel'];
  const hausFaktor  = hausDaten[haustyp as keyof typeof hausDaten]?.faktor ?? 1.0;
  const gesamt      = Math.round((wohnflaeche / geschosse) * dachFaktor * hausFaktor);
  const nutzbar     = Math.round(gesamt * 0.80 * (nutzPct / 100));
  const kwp         = Math.round((nutzbar / 5.5) * 10) / 10;
  const module      = Math.round(kwp / 0.42);
  return { gesamt, nutzbar, module, kwp };
}

// ── Eigenverbrauchsquote nach Gerätekombination ───────────────────
export function calcEVQuote(
  speicher:     'ja' | 'nein' | null,
  waermepumpe:  'ja' | 'nein' | null,
  wallbox:      'ja' | 'nein' | null,
): number {
  const key = `${speicher ?? 'nein'}|${waermepumpe ?? 'nein'}|${wallbox ?? 'nein'}`;
  return EV_QUOTE[key] ?? 0.30;
}

// ── Hauptberechnung ───────────────────────────────────────────────
export function calcPV(state: Partial<FunnelState>): PVCalc {
  const ht          = state.haustyp    ?? 'efh';
  const dt          = state.dachtyp    ?? 'sattel';
  const nutzPct     = state.nutzPct    ?? 50;
  const persons     = state.persons    ?? 3;
  const speicher    = state.speicher   ?? 'nein';
  const wallbox     = state.wallbox    ?? 'nein';
  const waermepumpe = state.waermepumpe ?? 'nein';

  const { kwp, module } = calcDachflaeche(
    state.wohnflaeche ?? 120,
    state.geschosse   ?? 2,
    ht, dt, nutzPct,
  );

  const erzeugt   = Math.round(kwp * 950 * (state.ertragFaktor ?? 1.0));
  const verbrauch = calcVerbrauch(persons, waermepumpe, wallbox);
  const evQuote   = calcEVQuote(speicher, waermepumpe, wallbox);
  const evKwh     = Math.round(Math.min(erzeugt * evQuote, verbrauch));
  const einspKwh  = Math.max(0, erzeugt - evKwh);
  const erspaart  = Math.round(evKwh * STROMPREIS);
  const einspEuro = Math.round(einspKwh * EINSPEISUNG_CT);
  const ersparnis = erspaart + einspEuro;

  // Investitionskosten
  let invest = Math.round(kwp * 1100);  // PV-Anlage: 1100 €/kWp
  if (speicher    === 'ja') invest += Math.round(kwp * 325 + 2000);  // Speicher
  if (wallbox     === 'ja') invest += 1000;                           // Wallbox
  if (waermepumpe === 'ja') invest += 0;                              // WP gehört nicht zur PV-Investition

  // 20-Jahres-Projektion
  let kumulativ = 0, breakEvenJahr = 0;
  const yearly: { y: number; ertragJ: number; kumulativ: number }[] = [];
  for (let y = 1; y <= 20; y++) {
    const deg     = Math.pow(0.99, y);              // 1% Degradation/Jahr
    const preis   = STROMPREIS * Math.pow(1 + STROMPREIS_STEIG, y);
    const evJ     = Math.round(evKwh    * deg);
    const einspJ  = Math.round(einspKwh * deg);
    const ertragJ = Math.round(evJ * preis + einspJ * EINSPEISUNG_CT);
    kumulativ += ertragJ;
    yearly.push({ y, ertragJ, kumulativ });
    if (!breakEvenJahr && kumulativ >= invest) breakEvenJahr = y;
  }

  const netto20 = kumulativ - invest;
  const rendite = Math.round((netto20 / invest / 20) * 100);
  const co2Jahr = Math.round(erzeugt * 0.38) / 1000;
  const co2_20  = Math.round(co2Jahr * 20 * 10) / 10;
  const evPct   = erzeugt > 0 ? Math.round(evKwh / erzeugt * 100) : 0;

  return { kwp, module, erzeugt, verbrauch, evKwh, einspKwh, ersparnis, invest, netto20, breakEvenJahr, rendite, co2Jahr, co2_20, yearly, evPct };
}

export function fmtDE(n: number, decimals = 0): string {
  return n.toLocaleString('de', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
}
