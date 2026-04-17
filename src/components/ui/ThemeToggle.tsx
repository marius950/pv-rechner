'use client';
import { useFunnelStore } from '@/store/funnel';

export default function ThemeToggle() {
  const { theme, setTheme } = useFunnelStore();
  const toggle = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    localStorage.setItem('effi-theme', next);
  };
  return (
    <div className="theme-toggle">
      <span className="theme-toggle-icon moon" style={{ opacity: theme === 'dark' ? 0.6 : 0.3 }}>🌙</span>
      <button className="theme-toggle-btn" onClick={toggle} aria-label="Farbschema wechseln" />
      <span className="theme-toggle-icon sun" style={{ opacity: theme === 'light' ? 1 : 0.35 }}>☀️</span>
    </div>
  );
}
