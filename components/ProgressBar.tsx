export function ProgressBar({ value, max = 100, label }: { value: number; max?: number; label?: string }) {
  const percent = Math.max(0, Math.min(100, (value / max) * 100));
  return (
    <div className="progress-wrap" aria-label={label || `${Math.round(percent)}%`}>
      <div className="progress-track"><i style={{ width: `${percent}%` }} /></div>
    </div>
  );
}
