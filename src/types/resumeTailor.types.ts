export interface ResumeTailorResult {
  matchScore: number;
  atsScore: number;
  missingKeywords: string[];
  strengths: string[];
  weaknesses: string[];
  recommendations: string[];
  optimizedResumeHtml: string;
  pdfBase64: string;
}

export type ResumeTailorStatus = 'idle' | 'uploading' | 'processing' | 'success' | 'error';
