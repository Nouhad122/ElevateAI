import { useState, useMemo } from 'react';
import type { CorrectionItem, CorrectionSeverity, CorrectionType } from '../types/correction.types';

const PAGE_SIZE = 10;

export function useCorrectionsFilter(corrections: CorrectionItem[]) {
  const [typeFilter, setTypeFilter] = useState<CorrectionType | 'all'>('all');
  const [severityFilter, setSeverityFilter] = useState<CorrectionSeverity | 'all'>('all');
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    return corrections.filter((c) => {
      const matchType = typeFilter === 'all' || c.type === typeFilter;
      const matchSeverity = severityFilter === 'all' || c.severity === severityFilter;
      return matchType && matchSeverity;
    });
  }, [corrections, typeFilter, severityFilter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handleTypeFilter = (value: CorrectionType | 'all') => {
    setTypeFilter(value);
    setPage(1);
  };

  const handleSeverityFilter = (value: CorrectionSeverity | 'all') => {
    setSeverityFilter(value);
    setPage(1);
  };

  return {
    typeFilter,
    severityFilter,
    page,
    totalPages,
    filteredCount: filtered.length,
    paginated,
    setTypeFilter: handleTypeFilter,
    setSeverityFilter: handleSeverityFilter,
    setPage,
  };
}
