import type { CorrectionItem, CorrectionSeverity, CorrectionType } from '../../types/correction.types';
import { useCorrectionsFilter } from '../../hooks/useCorrectionsFilter';
import { CorrectionRow } from './CorrectionRow';
import { Button } from '../ui/Button';

interface CorrectionsTableProps {
  corrections: CorrectionItem[];
}

const typeOptions: { value: CorrectionType | 'all'; label: string }[] = [
  { value: 'all', label: 'All Types' },
  { value: 'grammar', label: 'Grammar' },
  { value: 'spelling', label: 'Spelling' },
  { value: 'punctuation', label: 'Punctuation' },
  { value: 'wording', label: 'Wording' },
];

const severityOptions: { value: CorrectionSeverity | 'all'; label: string }[] = [
  { value: 'all', label: 'All Severity' },
  { value: 'high', label: 'High' },
  { value: 'medium', label: 'Medium' },
  { value: 'low', label: 'Low' },
];

export function CorrectionsTable({ corrections }: CorrectionsTableProps) {
  const {
    typeFilter, severityFilter, page, totalPages, filteredCount,
    paginated, setTypeFilter, setSeverityFilter, setPage,
  } = useCorrectionsFilter(corrections);

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <h2 className="text-lg font-semibold text-gray-900">
          Corrections
          <span className="ml-2 text-sm font-normal text-gray-400">({filteredCount} shown)</span>
        </h2>
        <div className="flex gap-2">
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value as CorrectionType | 'all')}
            className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          >
            {typeOptions.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
          <select
            value={severityFilter}
            onChange={(e) => setSeverityFilter(e.target.value as CorrectionSeverity | 'all')}
            className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          >
            {severityOptions.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
        </div>
      </div>

      {paginated.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <p className="text-lg font-medium">No corrections match the filters.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {paginated.map((c) => <CorrectionRow key={c.id} correction={c} />)}
        </div>
      )}

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 pt-2">
          <Button variant="secondary" size="sm" disabled={page === 1} onClick={() => setPage(page - 1)}>
            Previous
          </Button>
          <span className="text-sm text-gray-500">Page {page} of {totalPages}</span>
          <Button variant="secondary" size="sm" disabled={page === totalPages} onClick={() => setPage(page + 1)}>
            Next
          </Button>
        </div>
      )}
    </div>
  );
}
