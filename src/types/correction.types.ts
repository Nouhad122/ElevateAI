export type CorrectionType = 'grammar' | 'spelling' | 'punctuation' | 'wording';
export type CorrectionSeverity = 'high' | 'medium' | 'low';

export interface CorrectionItem {
  id: string;
  type: CorrectionType;
  severity: CorrectionSeverity;
  original: string;
  corrected: string;
  explanation: string;
  context: string;
  correctedContext: string;
  pageNumber: number;
}
