import axios from 'axios';
import { N8N_WEBHOOK_URL } from '../constants/config';
import type { CorrectionApiResponse } from '../types/api.types';


const MOCK_RESPONSE: CorrectionApiResponse = {
  score: 72,
  totalMistakes: 8,
  correctedDocumentHtml: `
    <h2>The Importance of Remote Work</h2>
    <p>Remote work has become an increasingly important part of the modern workplace.
    Many companies have adopted flexible working arrangements that allow employees to
    work from home or other locations outside the traditional office.</p>
    <p>The team <strong>has decided</strong> to proceed with the project on schedule.
    Please <strong>receive</strong> the attached report for further details.</p>
    <p><strong>However,</strong> the results were inconclusive and require further analysis.
    We delayed the launch <strong>because</strong> the testing was incomplete.</p>
    <p>There were <strong>fewer people</strong> than expected at the meeting.
    Please keep these in <strong>separate</strong> folders going forward.</p>
    <p>We believe <strong>it's</strong> important to address this issue early in the process.
    We revised the proposal <strong>to</strong> meet the deadline set by the client.</p>
  `,
  emailHtml: '',
  pdfBase64: '',
};

// Simulates upload + processing with realistic progress steps
export async function submitDocumentMock(
  _file: File,
  onUploadProgress: (percent: number) => void
): Promise<CorrectionApiResponse> {
  await new Promise<void>((resolve) => {
    let percent = 0;
    const interval = setInterval(() => {
      percent = Math.min(100, percent + Math.random() * 18 + 6);
      onUploadProgress(Math.round(percent));
      if (percent >= 100) {
        clearInterval(interval);
        resolve();
      }
    }, 150);
  });

  // Simulate AI processing time
  await new Promise((resolve) => setTimeout(resolve, 4000));

  return { ...MOCK_RESPONSE };
}

// Production function — swap to this when the n8n webhook is ready
export async function submitDocumentForCorrection(
  file: File,
  onUploadProgress: (percent: number) => void
): Promise<CorrectionApiResponse> {
  const formData = new FormData();
  formData.append('file', file);

  const response = await axios.post<CorrectionApiResponse | CorrectionApiResponse[]>(
    N8N_WEBHOOK_URL,
    formData,
    {
      headers: { 'Content-Type': 'multipart/form-data' },
      timeout: 120_000,
      onUploadProgress: (event) => {
        if (event.total) {
          onUploadProgress(Math.round((event.loaded * 100) / event.total));
        }
      },
    }
  );

  // n8n wraps workflow output in an array — unwrap if needed
  return Array.isArray(response.data) ? response.data[0] : response.data;
}
