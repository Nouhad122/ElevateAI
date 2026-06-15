interface MistakeSummaryProps {
  totalMistakes: number;
}

export function MistakeSummary({ totalMistakes }: MistakeSummaryProps) {
  const label =
    totalMistakes === 0
      ? 'No issues found'
      : totalMistakes === 1
      ? '1 issue found'
      : `${totalMistakes} issues found`;

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Mistakes Found</h2>
        <span className={`text-2xl font-bold ${totalMistakes === 0 ? 'text-green-500' : 'text-red-500'}`}>
          {totalMistakes}
        </span>
      </div>
      <p className="mt-2 text-sm text-gray-500">{label} in your document.</p>
    </div>
  );
}
