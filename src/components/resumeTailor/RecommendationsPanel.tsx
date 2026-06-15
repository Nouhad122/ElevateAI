interface RecommendationsPanelProps {
  recommendations: string[];
}

export function RecommendationsPanel({ recommendations }: RecommendationsPanelProps) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-6 h-6 rounded-lg bg-blue-50 flex items-center justify-center">
          <svg className="w-3.5 h-3.5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
          </svg>
        </div>
        <div>
          <h3 className="text-sm font-semibold text-gray-900">Recommendations</h3>
          <p className="text-xs text-gray-500">{recommendations.length} actionable improvements</p>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-2.5">
        {recommendations.map((item, i) => (
          <div
            key={i}
            className="flex items-start gap-3 p-3 rounded-xl bg-blue-50 border border-blue-100"
          >
            <span className="shrink-0 w-5 h-5 rounded-full bg-blue-600 text-white text-[10px] font-bold flex items-center justify-center mt-0.5">
              {i + 1}
            </span>
            <p className="text-xs text-blue-900 leading-relaxed">{item}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
