import { useState } from 'react';
import type { CorrectionItem } from '../../types/correction.types';
import { Badge } from '../ui/Badge';
import { getSeverityStyles, getTypeStyles, capitalizeFirst } from '../../utils/formatters';

interface CorrectionRowProps {
  correction: CorrectionItem;
}

export function CorrectionRow({ correction }: CorrectionRowProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(correction.corrected);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="bg-white border border-gray-100 rounded-xl p-4 space-y-3 hover:border-gray-200 hover:shadow-sm transition-all">
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <div className="flex items-center gap-2">
          <Badge label={capitalizeFirst(correction.type)} className={getTypeStyles(correction.type)} />
          <Badge label={capitalizeFirst(correction.severity)} className={getSeverityStyles(correction.severity)} />
          <span className="text-xs text-gray-400">Page {correction.pageNumber}</span>
        </div>
        <button
          onClick={handleCopy}
          className="text-xs text-gray-400 hover:text-indigo-600 flex items-center gap-1 transition-colors"
        >
          {copied ? (
            <><svg className="w-3.5 h-3.5 text-green-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg><span className="text-green-500">Copied</span></>
          ) : (
            <><svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>Copy</>
          )}
        </button>
      </div>

      <div className="flex items-center gap-3 flex-wrap">
        <span className="text-sm text-red-600 line-through bg-red-50 px-2 py-0.5 rounded-md font-mono">
          {correction.original}
        </span>
        <svg className="w-4 h-4 text-gray-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
        </svg>
        <span className="text-sm text-green-700 bg-green-50 px-2 py-0.5 rounded-md font-mono font-semibold">
          {correction.corrected}
        </span>
      </div>

      <p className="text-xs text-gray-500 leading-relaxed">{correction.explanation}</p>

      <div className="text-xs text-gray-400 italic border-t border-gray-50 pt-2">
        <span className="text-gray-300">Context: </span>
        <span dangerouslySetInnerHTML={{
          __html: correction.context.replace(
            correction.original,
            `<mark class="bg-red-100 text-red-700 not-italic rounded px-0.5">${correction.original}</mark>`
          )
        }} />
      </div>
    </div>
  );
}
