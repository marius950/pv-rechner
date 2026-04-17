'use client';
import { useFunnelStore } from '@/store/funnel';
import { orientDaten, dachDaten } from '@/lib/data';

const C = { lime: '#c7f360', limeBrt: '#bef264', green: '#156949', dark: '#093524' };

export default function Viz2Compass() {
  const { ausrichtung, dachtyp } = useFunnelStore();
  const od    = ausrichtung ? orientDaten[ausrichtung] : null;
  const pct   = od ? Math.round(od.faktor * 100) : null;
  const color = pct && pct >= 90 ? C.lime : pct && pct >= 70 ? '#EF9F27' : pct ? '#E24B4A' : C.lime;
  const dName = dachtyp ? dachDaten[dachtyp]?.label : '';
  const oName = od?.label ?? '';

  if (!dachtyp) return null;

  return (
    <div style={{ width: '100%', maxWidth: 400, display: 'flex', flexDirection: 'column', gap: 8 }}>
      {/* Badge */}
      {(dName || oName) && (
        <div className="house-badge show" style={{ alignSelf: 'flex-start' }}>
          <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M1 5L6 1l5 4v5.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V5Z"/>
          </svg>
          {dName}{oName ? ` · ${oName}` : ''}
        </div>
      )}

      {/* Ertrag card */}
      {pct !== null && (
        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '14px 18px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
            <div>
              <div style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '.07em', color: 'var(--text-subtle)', marginBottom: 4 }}>Solarer Ertragsfaktor</div>
              <div style={{ fontSize: 11.5, color: 'var(--text-muted)', lineHeight: 1.5 }}>{od?.desc}</div>
            </div>
            <div style={{ fontSize: 32, fontWeight: 700, color, letterSpacing: '-0.03em', lineHeight: 1 }}>{pct} %</div>
          </div>
          {/* Bar */}
          <div style={{ height: 8, background: 'var(--slider-track)', borderRadius: 4, overflow: 'hidden' }}>
            <div style={{
              height: '100%', borderRadius: 4,
              background: pct >= 90
                ? `linear-gradient(90deg, ${C.green}, ${C.lime})`
                : pct >= 70
                ? `linear-gradient(90deg, #b45309, #EF9F27)`
                : `linear-gradient(90deg, #991b1b, #E24B4A)`,
              width: `${pct}%`,
              transition: 'width 0.5s cubic-bezier(0.4,0,0.2,1)',
              boxShadow: pct >= 90 ? `0 0 8px ${C.lime}55` : 'none',
            }}/>
          </div>
          {/* Ticks */}
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 5, fontSize: 10, color: 'var(--text-faint)' }}>
            <span>0 %</span>
            <span style={{ color: 'var(--text-subtle)' }}>50 %</span>
            <span style={{ color: pct >= 90 ? color : 'var(--text-subtle)' }}>100 %</span>
          </div>
        </div>
      )}

      {/* Orientation chips */}
      {ausrichtung && (
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {[
            { key: 'Ausrichtung', val: oName },
            { key: 'Dachtyp', val: dName },
          ].map(({ key, val }) => (
            <div key={key} style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 100, padding: '4px 12px', fontSize: 11.5, color: 'var(--text-muted)', display: 'flex', gap: 6 }}>
              <span style={{ color: 'var(--text-faint)' }}>{key}:</span>
              <span style={{ color: 'var(--text-primary)', fontWeight: 500 }}>{val}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
