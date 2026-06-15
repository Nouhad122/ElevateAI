interface StrengthsPanelProps {
  strengths: string[];
}

export function StrengthsPanel({ strengths }: StrengthsPanelProps) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5 h-full">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-6 h-6 rounded-lg bg-emerald-50 flex items-center justify-center">
          <svg className="w-3.5 h-3.5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div>
          <h3 className="text-sm font-semibold text-gray-900">Strengths</h3>
          <p className="text-xs text-gray-500">{strengths.length} positive signals</p>
        </div>
      </div>

      <div className="space-y-2">
        {strengths.map((item, i) => (
          <div
            key={i}
            className="flex items-start gap-2.5 p-2.5 rounded-xl bg-emerald-50 border border-emerald-100"
          >
            <svg className="w-3.5 h-3.5 text-emerald-500 mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
            </svg>
            <p className="text-xs text-emerald-800 leading-relaxed">{item}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
