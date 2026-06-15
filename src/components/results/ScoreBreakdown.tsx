import type { DocumentScore } from '../../types/document.types';
import { getScoreRingColor } from '../../utils/formatters';

interface ScoreBreakdownProps {
  score: DocumentScore;
}

const categories: { key: keyof Omit<DocumentScore, 'overall'>; label: string }[] = [
  { key: 'grammar', label: 'Grammar' },
  { key: 'spelling', label: 'Spelling' },
  { key: 'punctuation', label: 'Punctuation' },
  { key: 'wording', label: 'Wording' },
];

export function ScoreBreakdown({ score }: ScoreBreakdownProps) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6">
      <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">Score Breakdown</h2>
      <div className="space-y-4">
        {categories.map(({ key, label }) => {
          const value = score[key];
          const color = getScoreRingColor(value);
          return (
            <div key={key}>
              <div className="flex justify-between items-center mb-1.5">
                <span className="text-sm font-medium text-gray-700">{label}</span>
                <span className="text-sm font-bold" style={{ color }}>{value}</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                <div
                  className="h-2 rounded-full transition-all duration-700"
                  style={{ width: `${value}%`, backgroundColor: color }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
