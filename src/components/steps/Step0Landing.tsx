'use client';
import { motion } from 'framer-motion';
import { useFunnelStore } from '@/store/funnel';
import CTAButton from '@/components/ui/CTAButton';

const usps = [
  {
    icon: <svg viewBox="0 0 24 24"><path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Z" strokeWidth={1.5}/><path d="M12 6v6l4 2" strokeWidth={1.5} strokeLinecap="round"/></svg>,
    title: 'In 3 Minuten fertig',
    sub: '6 Fragen — keine Anmeldung, kein Stress',
  },
  {
    icon: <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="3" strokeWidth={1.5}/><path d="M12 1v3M12 20v3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M1 12h3M20 12h3M4.22 19.78l2.12-2.12M17.66 6.34l2.12-2.12" strokeWidth={1.5} strokeLinecap="round"/></svg>,
    title: 'Echte kWp-Berechnung',
    sub: 'Basierend auf Deinem Dach — keine Pauschalwerte',
  },
  {
    icon: <svg viewBox="0 0 24 24"><path d="M3 3v18h18" strokeWidth={1.5} strokeLinecap="round"/><path d="M7 16l4-4 3 3 5-5" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round"/></svg>,
    title: '20-Jahre-Gewinnprognose',
    sub: 'Break-Even, Rendite & CO₂-Einsparung',
  },
  {
    icon: <svg viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" strokeWidth={1.5} strokeLinejoin="round"/><path d="M9 12l2 2 4-4" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round"/></svg>,
    title: 'Geprüfte Installationsbetriebe',
    sub: 'Zertifizierte Partner aus Deiner Region',
  },
];

export default function Step0Landing() {
  const { setStep } = useFunnelStore();

  return (
    <div>
      <div className="lp-kicker">
        <span className="lp-kicker-dot" />
        Kostenlose Potenzialanalyse · effi
      </div>

      <h1 className="lp-headline">
        Wie viel lässt Du<br />gerade <em>liegen?</em>
      </h1>
      <p className="lp-sub">
        Berechne in 3 Minuten, wie viel Du mit einer PV-Anlage wirklich sparen kannst — personalisiert auf Dein Dach, Deinen Verbrauch, Deine Situation.
      </p>

      <div className="lp-usps">
        {usps.map((u, i) => (
          <motion.div
            key={i}
            className="lp-usp"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.18 + i * 0.13, duration: 0.38, ease: [0, 0, 0.2, 1] }}
          >
            <div className="lp-usp-icon">{u.icon}</div>
            <div>
              <div className="lp-usp-title">{u.title}</div>
              <div className="lp-usp-sub">{u.sub}</div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Social proof with real photos */}
      <div className="lp-proof">
        <div style={{ display: 'flex' }}>
          {['/avatars/user4.jpg', '/avatars/user3.jpg', '/avatars/user1.jpg'].map((src, i) => (
            <img
              key={i}
              src={src}
              alt=""
              width={30} height={30}
              style={{
                borderRadius: '50%',
                marginLeft: i > 0 ? -9 : 0,
                border: '2px solid var(--bg)',
                objectFit: 'cover',
                objectPosition: 'center top',
              }}
            />
          ))}
          <div style={{ width: 30, height: 30, borderRadius: '50%', background: 'var(--tagline-bg)', border: '2px solid var(--bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginLeft: -9, fontSize: 10, color: 'var(--accent)', fontWeight: 700 }}>+</div>
        </div>
        <div>
          <div className="lp-stars">{'★★★★★'.split('').map((s, i) => <span key={i}>{s}</span>)}</div>
          <div style={{ fontSize: 12, color: 'var(--text-subtle)', marginTop: 2 }}>
            <strong style={{ color: 'var(--text-secondary)', fontWeight: 500 }}>1.200+ Haushalte</strong> haben bereits ihr PV-Potenzial berechnet
          </div>
        </div>
      </div>

      <CTAButton variant="lp" enabled onClick={() => setStep(1)}>
        Jetzt kostenlos berechnen
      </CTAButton>
      <p className="lp-disclaimer">Keine Anmeldung · Keine Kosten · Unverbindlich</p>
    </div>
  );
}
