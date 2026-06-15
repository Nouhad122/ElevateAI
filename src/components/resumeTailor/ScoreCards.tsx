function scoreColor(score: number): string {
  if (score >= 75) return '#10b981';
  if (score >= 50) return '#f59e0b';
  return '#ef4444';
}

function scoreLabel(score: number): string {
  if (score >= 75) return 'Excellent';
  if (score >= 50) return 'Moderate';
  return 'Needs Work';
}

function ScoreRing({ score }: { score: number }) {
  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - score / 100);
  const color = scoreColor(score);

  return (
    <svg width="110" height="110" viewBox="0 0 100 100">
      <circle cx="50" cy="50" r={radius} fill="none" stroke="#e5e7eb" strokeWidth="8" />
      <circle
        cx="50"
        cy="50"
        r={radius}
        fill="none"
        stroke={color}
        strokeWidth="8"
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        transform="rotate(-90 50 50)"
        style={{ transition: 'stroke-dashoffset 0.8s ease' }}
      />
      <text
        x="50"
        y="46"
        textAnchor="middle"
        dominantBaseline="middle"
        style={{ fontSize: '20px', fontWeight: '800', fill: '#111827' }}
      >
        {score}%
      </text>
      <text
        x="50"
        y="63"
        textAnchor="middle"
        dominantBaseline="middle"
        style={{ fontSize: '10px', fill: color, fontWeight: '600' }}
      >
        {scoreLabel(score)}
      </text>
    </svg>
  );
}

interface ScoreCardsProps {
  matchScore: number;
  atsScore: number;
}

export function ScoreCards({ matchScore, atsScore }: ScoreCardsProps) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="bg-white rounded-2xl border border-gray-100 p-6 flex flex-col items-center gap-3">
        <ScoreRing score={matchScore} />
        <div className="text-center">
          <p className="text-sm font-semibold text-gray-900">Job Match Score</p>
          <p className="text-xs text-gray-500 mt-0.5">Resume vs. job description</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 p-6 flex flex-col items-center gap-3">
        <ScoreRing score={atsScore} />
        <div className="text-center">
          <p className="text-sm font-semibold text-gray-900">ATS Score</p>
          <p className="text-xs text-gray-500 mt-0.5">Applicant tracking system</p>
        </div>
      </div>
    </div>
  );
}
