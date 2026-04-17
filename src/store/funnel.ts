'use client';
import { create } from 'zustand';
import type { FunnelState, Step, HausTyp, DachTyp, Ausrichtung } from '@/types';

type Actions = {
  setStep: (s: Step) => void;
  setHaustyp: (h: HausTyp) => void;
  setDachtyp: (d: DachTyp) => void;
  setAusrichtung: (a: Ausrichtung, faktor: number, nutzPct: number) => void;
  setWohnflaeche: (n: number) => void;
  setGeschosse: (n: number) => void;
  setPersons: (n: number) => void;
  setSpeicher: (v: 'ja' | 'nein') => void;
  setWallbox: (v: 'ja' | 'nein') => void;
  setEigentuemer: (v: 'ja' | 'nein') => void;
  setZeitplan: (v: string) => void;
  setLead: (name: string, email: string, phone: string) => void;
  setTheme: (t: 'dark' | 'light') => void;
  reset: () => void;
};

const defaults: FunnelState = {
  step: 0,
  haustyp: null,
  dachtyp: null,
  ausrichtung: null,
  nutzPct: 50,
  ertragFaktor: 1.0,
  wohnflaeche: 120,
  geschosse: 2,
  persons: 3,
  speicher: null,
  wallbox: null,
  eigentuemer: null,
  zeitplan: null,
  leadName: '',
  leadEmail: '',
  leadPhone: '',
  theme: 'dark',
};

export const useFunnelStore = create<FunnelState & Actions>((set) => ({
  ...defaults,

  setStep:        (step)           => set({ step }),
  setHaustyp:     (haustyp)        => set({ haustyp, dachtyp: null, ausrichtung: null }),
  setDachtyp:     (dachtyp)        => set({ dachtyp, ausrichtung: null }),
  setAusrichtung: (ausrichtung, ertragFaktor, nutzPct) => set({ ausrichtung, ertragFaktor, nutzPct }),
  setWohnflaeche: (wohnflaeche)    => set({ wohnflaeche }),
  setGeschosse:   (geschosse)      => set({ geschosse }),
  setPersons:     (persons)        => set({ persons }),
  setSpeicher:    (speicher)       => set({ speicher }),
  setWallbox:     (wallbox)        => set({ wallbox }),
  setEigentuemer: (eigentuemer)    => set({ eigentuemer }),
  setZeitplan:    (zeitplan)       => set({ zeitplan }),
  setLead:        (leadName, leadEmail, leadPhone) => set({ leadName, leadEmail, leadPhone }),
  setTheme:       (theme)          => set({ theme }),
  reset:          ()               => set({ ...defaults }),
}));
