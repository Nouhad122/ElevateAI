export interface DocumentMeta {
  originalFileName: string;
  pageCount: number;
  wordCount: number;
  characterCount: number;
}

export interface DocumentScore {
  overall: number;
  grammar: number;
  spelling: number;
  punctuation: number;
  wording: number;
}

export interface DocumentSummary {
  totalMistakes: number;
  grammarErrors: number;
  spellingErrors: number;
  punctuationErrors: number;
  wordingIssues: number;
}

export interface CorrectedDocument {
  downloadUrl: string | null;
  base64Pdf: string | null;
  expiresAt: string | null;
}
