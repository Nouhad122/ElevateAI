import type { CorrectionSeverity, CorrectionType } from '../types/correction.types';

export function getScoreColor(score: number): string {
  if (score >= 85) return 'text-green-500';
  if (score >= 65) return 'text-yellow-500';
  return 'text-red-500';
}

export function getScoreRingColor(score: number): string {
  if (score >= 85) return '#22c55e';
  if (score >= 65) return '#eab308';
  return '#ef4444';
}

export function getSeverityStyles(severity: CorrectionSeverity): string {
  const map: Record<CorrectionSeverity, string> = {
    high: 'bg-red-100 text-red-700 border border-red-200',
    medium: 'bg-orange-100 text-orange-700 border border-orange-200',
    low: 'bg-blue-100 text-blue-700 border border-blue-200',
  };
  return map[severity];
}

export function getTypeStyles(type: CorrectionType): string {
  const map: Record<CorrectionType, string> = {
    grammar: 'bg-purple-100 text-purple-700 border border-purple-200',
    spelling: 'bg-pink-100 text-pink-700 border border-pink-200',
    punctuation: 'bg-cyan-100 text-cyan-700 border border-cyan-200',
    wording: 'bg-teal-100 text-teal-700 border border-teal-200',
  };
  return map[type];
}

export function capitalizeFirst(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
