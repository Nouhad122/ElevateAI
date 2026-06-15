interface ProgressBarProps {
  value: number;
  className?: string;
  color?: string;
}

export function ProgressBar({ value, className = '', color = 'bg-blue-600' }: ProgressBarProps) {
  const clamped = Math.min(100, Math.max(0, value));
  return (
    <div className={`w-full bg-gray-100 rounded-full h-2 overflow-hidden ${className}`}>
      <div
        className={`h-2 rounded-full transition-all duration-300 ${color}`}
        style={{ width: `${clamped}%` }}
      />
    </div>
  );
}
