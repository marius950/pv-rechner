interface Props { onClick: () => void; label?: string; }

export default function BackButton({ onClick, label = 'Zurück' }: Props) {
  return (
    <button className="btn-back" onClick={onClick}>
      <svg viewBox="0 0 16 16"><path d="M13 8H3M7 4l-4 4 4 4" /></svg>
      {label}
    </button>
  );
}
