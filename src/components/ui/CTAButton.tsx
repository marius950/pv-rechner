import type { ReactNode } from 'react';

interface Props {
  enabled: boolean;
  onClick: () => void;
  children: ReactNode;
  variant?: 'default' | 'lp';
}

const ArrowIcon = () => (
  <svg viewBox="0 0 16 16">
    <path d="M3 8h10M9 4l4 4-4 4" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function CTAButton({ enabled, onClick, children, variant = 'default' }: Props) {
  if (variant === 'lp') {
    return (
      <button className="btn-cta-lp" onClick={onClick}>
        {children}
        <ArrowIcon />
      </button>
    );
  }
  return (
    <button className={`btn-cta ${enabled ? 'enabled' : ''}`} onClick={enabled ? onClick : undefined}>
      {children}
      <ArrowIcon />
    </button>
  );
}
