import axios from 'axios';
import { RESUME_TAILOR_WEBHOOK_URL } from '../constants/config';
import type { ResumeTailorResult } from '../types/resumeTailor.types';

const MOCK_RESPONSE: ResumeTailorResult = {
  matchScore: 72,
  atsScore: 68,
  missingKeywords: [
    'Docker', 'Kubernetes', 'CI/CD', 'TypeScript',
    'REST API', 'Agile', 'AWS', 'GraphQL',
  ],
  strengths: [
    'Strong project management experience clearly highlighted',
    'Relevant educational background in Computer Science',
    'Quantified achievements with measurable results',
    'Clear and professional formatting throughout',
  ],
  weaknesses: [
    'Missing key technical skills mentioned in the job description',
    'Work experience section lacks specific technology keywords',
    'No mention of team size or leadership scope',
  ],
  recommendations: [
    'Add "TypeScript" to your skills section — it appears 4× in the job description',
    'Mention Docker/Kubernetes experience or certifications if applicable',
    'Replace "deployment process" with "CI/CD pipeline" to match ATS keywords',
    'Add a tailored professional summary at the top targeting this specific role',
    'Quantify your impact in the most recent role (e.g., "reduced load time by 40%")',
    'List AWS services you have used (S3, EC2, Lambda) — the role requires cloud exposure',
  ],
  optimizedResumeHtml: `<!DOCTYPE html><html><head><style>
    body { font-family: Georgia, serif; max-width: 700px; margin: 40px auto; padding: 0 24px; color: #1a1a1a; line-height: 1.6; }
    h1 { font-size: 26px; margin-bottom: 2px; } h2 { font-size: 14px; border-bottom: 1px solid #ccc; padding-bottom: 4px; margin-top: 20px; text-transform: uppercase; letter-spacing: 0.05em; }
    .contact { font-size: 13px; color: #555; margin-bottom: 16px; }
    .entry { margin-bottom: 12px; } .entry-title { font-weight: bold; } .entry-meta { font-size: 12px; color: #666; }
    ul { margin: 6px 0 0 0; padding-left: 18px; } li { font-size: 13px; margin-bottom: 4px; }
    .skills { display: flex; flex-wrap: wrap; gap: 6px; } .skill { background: #f0f4ff; padding: 2px 8px; border-radius: 4px; font-size: 12px; }
  </style></head><body>
    <h1>Jane Doe</h1>
    <div class="contact">jane.doe@email.com · linkedin.com/in/janedoe · github.com/janedoe</div>
    <h2>Professional Summary</h2>
    <p style="font-size:13px">Results-driven Software Engineer with 4+ years of experience building scalable web applications. Seeking to leverage expertise in TypeScript, REST APIs, and Agile methodologies to contribute to your engineering team.</p>
    <h2>Technical Skills</h2>
    <div class="skills"><span class="skill">TypeScript</span><span class="skill">React</span><span class="skill">Node.js</span><span class="skill">Docker</span><span class="skill">AWS (S3, EC2)</span><span class="skill">CI/CD</span><span class="skill">REST API</span><span class="skill">GraphQL</span><span class="skill">Agile/Scrum</span></div>
    <h2>Experience</h2>
    <div class="entry"><div class="entry-title">Senior Frontend Developer — Acme Corp</div><div class="entry-meta">Jan 2022 – Present</div><ul><li>Reduced page load time by 40% by migrating legacy jQuery to React + TypeScript</li><li>Designed and implemented REST API integrations with 3 third-party services</li><li>Led CI/CD pipeline setup with GitHub Actions, cutting deployment time by 60%</li></ul></div>
  </body></html>`,
  pdfBase64: '',
};

export async function submitResumeMock(
  _file: File,
  _jobDescription: string,
  onUploadProgress: (percent: number) => void
): Promise<ResumeTailorResult> {
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

  await new Promise((resolve) => setTimeout(resolve, 5000));

  return { ...MOCK_RESPONSE };
}

export async function submitResumeForTailoring(
  file: File,
  jobDescription: string,
  onUploadProgress: (percent: number) => void
): Promise<ResumeTailorResult> {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('jobDescription', jobDescription);

  const response = await axios.post<ResumeTailorResult | ResumeTailorResult[]>(
    RESUME_TAILOR_WEBHOOK_URL,
    formData,
    {
      headers: { 'Content-Type': 'multipart/form-data' },
      timeout: 180_000,
      onUploadProgress: (event) => {
        if (event.total) {
          onUploadProgress(Math.round((event.loaded * 100) / event.total));
        }
      },
    }
  );

  const data = Array.isArray(response.data) ? response.data[0] : response.data;

  if (!data?.optimizedResumeHtml) {
    throw new Error('The service encountered an error. Please try again.');
  }

  return data;
}
