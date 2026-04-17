interface Props { currentStep: number; total?: number; }

export default function ProgressBar({ currentStep, total = 6 }: Props) {
  return (
    <div className="progress-track">
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className={`progress-dot ${i < currentStep ? 'done' : i === currentStep ? 'active' : ''}`}
        />
      ))}
    </div>
  );
}
