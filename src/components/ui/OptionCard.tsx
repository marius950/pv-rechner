import type { ReactNode } from 'react';

interface Props {
  selected: boolean;
  onClick: () => void;
  icon: ReactNode;
  label: string;
  sub: string;
}

export default function OptionCard({ selected, onClick, icon, label, sub }: Props) {
  return (
    <div className={`option-card ${selected ? 'selected' : ''}`} onClick={onClick}>
      <div className="card-check">
        <svg viewBox="0 0 12 12"><polyline points="2,6 5,9 10,3" /></svg>
      </div>
      <div className="card-icon">{icon}</div>
      <div className="card-label">{label}</div>
      <div className="card-sub">{sub}</div>
    </div>
  );
}
