import { useMemo } from 'react';

interface Correction {
  incorrect: string;
  correct: string;
  explanation: string;
}

function parseCorrections(html: string): Correction[] {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');
  const rows = Array.from(doc.querySelectorAll('table tr')).slice(1); // skip header

  return rows.reduce<Correction[]>((acc, row) => {
    const cells = row.querySelectorAll('td');
    if (cells.length >= 3) {
      acc.push({
        incorrect: (cells[0].textContent ?? '').replace(/❌/g, '').trim(),
        correct: (cells[1].textContent ?? '').trim(),
        explanation: (cells[2].textContent ?? '').trim(),
      });
    }
    return acc;
  }, []);
}

interface CorrectionsReportProps {
  emailHtml: string;
  totalMistakes: number;
}

export function CorrectionsReport({ emailHtml, totalMistakes }: CorrectionsReportProps) {
  const corrections = useMemo(() => parseCorrections(emailHtml), [emailHtml]);

  if (!corrections.length) return null;

  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
        <div>
          <h2 className="text-sm font-semibold text-gray-900">Corrections Found</h2>
          <p className="text-xs text-gray-500 mt-0.5">{corrections.length} issues identified by AI</p>
        </div>
        <span className="px-2.5 py-1 bg-red-50 text-red-600 text-xs font-bold rounded-full">
          {totalMistakes} errors
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide w-1/4">
                ❌ Incorrect
              </th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide w-1/4">
                ✅ Correct
              </th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                Explanation
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {corrections.map((item, i) => (
              <tr key={i} className="hover:bg-gray-50/60 transition-colors">
                <td className="px-5 py-3.5 text-red-600 font-medium align-top">{item.incorrect}</td>
                <td className="px-5 py-3.5 text-green-600 font-medium align-top">{item.correct}</td>
                <td className="px-5 py-3.5 text-gray-600 align-top">{item.explanation}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
