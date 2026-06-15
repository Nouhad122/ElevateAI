interface KeywordChipsProps {
  keywords: string[];
}

export function KeywordChips({ keywords }: KeywordChipsProps) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5 h-full">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-6 h-6 rounded-lg bg-red-50 flex items-center justify-center">
          <svg className="w-3.5 h-3.5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
          </svg>
        </div>
        <div>
          <h3 className="text-sm font-semibold text-gray-900">Missing Keywords</h3>
          <p className="text-xs text-gray-500">{keywords.length} not found in your resume</p>
        </div>
      </div>

      {keywords.length === 0 ? (
        <p className="text-xs text-gray-400 italic">No missing keywords — great coverage!</p>
      ) : (
        <div className="flex flex-wrap gap-2">
          {keywords.map((kw) => (
            <span
              key={kw}
              className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-red-50 text-red-700 border border-red-100"
            >
              {kw}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
