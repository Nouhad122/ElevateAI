export const N8N_WEBHOOK_URL = import.meta.env.VITE_N8N_WEBHOOK_URL as string;
export const RESUME_TAILOR_WEBHOOK_URL = import.meta.env.VITE_RESUME_TAILOR_WEBHOOK_URL as string;

export const MAX_FILE_SIZE_MB = 10;
export const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;
export const ACCEPTED_FILE_TYPES = ['application/pdf'];

export const PROCESSING_MESSAGES = [
  'Extracting text from your document...',
  'Analyzing grammar and spelling...',
  'Detecting punctuation errors...',
  'Reviewing wording and clarity...',
  'Generating correction report...',
  'Building corrected document...',
  'Almost done...',
];

export const RESUME_TAILOR_PROCESSING_MESSAGES = [
  'Uploading Resume...',
  'Extracting Resume...',
  'Analyzing ATS Match...',
  'Optimizing Resume...',
  'Generating PDF...',
];
