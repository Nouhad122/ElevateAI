import { getScoreColor, getScoreRingColor } from '../../utils/formatters';

interface ScoreCardProps {
  score: number;
  totalMistakes: number;
}

export function ScoreCard({ score, totalMistakes }: ScoreCardProps) {
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference - (score / 100) * circumference;
  const ringColor = getScoreRingColor(score);
  const textColor = getScoreColor(score);

  const label = score >= 85 ? 'Excellent' : score >= 65 ? 'Good' : 'Needs Work';

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 flex flex-col items-center gap-4">
      <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Document Score</h2>

      <div className="relative w-36 h-36">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 140 140">
          <circle cx="70" cy="70" r={radius} fill="none" stroke="#f3f4f6" strokeWidth="10" />
          <circle
            cx="70" cy="70" r={radius}
            fill="none"
            stroke={ringColor}
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={dashOffset}
            style={{ transition: 'stroke-dashoffset 1s ease-in-out' }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={`text-4xl font-bold ${textColor}`}>{score}</span>
          <span className="text-xs text-gray-400">/100</span>
        </div>
      </div>

      <span className={`text-sm font-semibold ${textColor}`}>{label}</span>

      <div className="w-full grid grid-cols-2 gap-2 pt-2 border-t border-gray-100 text-center">
        <div>
          <p className="text-lg font-bold text-red-500">{totalMistakes}</p>
          <p className="text-xs text-gray-500">Mistakes</p>
        </div>
        <div>
          <p className={`text-lg font-bold ${textColor}`}>{score}/100</p>
          <p className="text-xs text-gray-500">Score</p>
        </div>
      </div>
    </div>
  );
}
