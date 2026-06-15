export interface CorrectionApiResponse {
  score: number;
  totalMistakes: number;
  correctedDocumentHtml: string;
  emailHtml?: string;
  pdfBase64?: string;
}

export interface ApiError {
  message: string;
  code?: string;
}

export type UploadStatus =
  | 'idle'
  | 'file_selected'
  | 'uploading'
  | 'processing'
  | 'success'
  | 'error';
